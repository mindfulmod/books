import test from 'node:test';
import assert from 'node:assert/strict';
import {names} from './content.js';
import {readingPaths,pathById,pathPlace,pathNeighbours} from './reading-paths.js';
import {namePairs,pairFor} from './name-pairs.js';
import {capturePassage,passageKey,createBackup,parseBackup,mergeLibrary,backupLimit} from './personal-library.js';
import {keptEntries} from './kept-collection.js';
import {keptExport} from './kept-export.js';

const name=names.find(n=>n.id==='ar-rahman');
const position={id:name.id,design:'folio',page:0,scroll:600,section:'His mercy',reflectionOpen:true,anchor:{key:'paragraph-0-0',offset:150}};
const empty=()=>({bookmarks:[],finished:[],notes:{},passages:{},positions:{},pathPlaces:{},activePath:null,last:null,nextReading:null,readingList:[],reviewNames:[],recalledNames:[],questions:{}});
const payload=library=>JSON.stringify({format:'beautiful-names-library',version:1,library});

test('all six paths use real Names, have bounded navigation, and retain individual places',()=>{
  assert.equal(readingPaths.length,6);
  assert.equal(new Set(readingPaths.map(p=>p.id)).size,6);
  for(const path of readingPaths){
    assert.ok(path.ids.length>=4&&path.ids.length<=5);
    assert.equal(new Set(path.ids).size,path.ids.length);
    assert.ok(path.ids.every(id=>names.some(n=>n.id===id)));
    assert.equal(pathNeighbours(path,path.ids[0]).previous,null);
    assert.equal(pathNeighbours(path,path.ids.at(-1)).next,null);
    assert.equal(pathPlace(path,{pathPlaces:{[path.id]:path.ids[2]}}),path.ids[2]);
    assert.equal(pathPlace(path,{pathPlaces:{[path.id]:'missing'},finished:[path.ids[0]]}),path.ids[1]);
    assert.equal(pathPlace(path,{finished:path.ids}),path.ids[0]);
  }
  assert.equal(pathNeighbours(pathById('mercy-and-return'),'ar-rahim').next,'al-ghaffar');
  assert.equal(pathNeighbours(readingPaths[0],'al-quddus'),null);
  assert.equal(pathNeighbours(undefined,name.id),null);
});

test('twelve distinct pairings resolve from either reading without changing edition order',()=>{
  const before=names.map(n=>n.id);
  assert.equal(namePairs.length,12);
  assert.equal(new Set(namePairs.flatMap(p=>p.ids)).size,24);
  for(const pair of namePairs){
    assert.equal(pair.ids.length,2);
    assert.ok(pair.connection.length>70);
    for(const id of pair.ids){assert.ok(names.some(n=>n.id===id));assert.equal(pairFor(id).id,pair.id);}
  }
  assert.equal(pairFor('missing'),undefined);
  assert.deepEqual(names.map(n=>n.id),before);
});

test('kept passages preserve their original wording and join search, filters, and text export',()=>{
  const snapshot=capturePassage(name,0),key=passageKey(name.id,0);
  const saved={...empty(),bookmarks:[name.id],notes:{[name.id]:'الحمد لله 🌿'},passages:{[key]:snapshot}};
  assert.equal(snapshot.text,name.sections[0].paragraphs.join('\n\n'));
  const revised={...name,sections:[{title:'A revised heading',paragraphs:['A revised paragraph']}]};
  assert.notEqual(capturePassage(revised,0).text,snapshot.text);
  assert.equal(capturePassage(name,99),null);
  assert.equal(keptEntries(names,saved).length,1);
  assert.equal(keptEntries(names,saved,{type:'passages',query:snapshot.text.slice(0,30)})[0].id,name.id);
  const copy=keptExport(names,saved);
  assert.ok(copy.includes(snapshot.text));assert.ok(copy.includes('الحمد لله 🌿'));
  assert.ok(copy.includes('Companion passage'));
});

test('backup round-trip preserves writing, passage snapshots, per-Name anchors, and path places',()=>{
  const saved={...empty(),bookmarks:[name.id],finished:[name.id],notes:{[name.id]:'  My words.\n\nالحمد لله 🌿 <a>  '},passages:{[passageKey(name.id,0)]:capturePassage(name,0)},positions:{[name.id]:position},last:position,pathPlaces:{'mercy-and-return':name.id},activePath:'mercy-and-return',reading:{size:'largest',spacing:'open',focus:'quiet'}};
  const before=structuredClone(saved),copy=createBackup(saved,names,new Date('2026-10-02T12:00:00Z'));
  assert.deepEqual(parseBackup(copy,names),saved);
  assert.deepEqual(saved,before);
  assert.equal(JSON.parse(copy).exportedAt,'2026-10-02T12:00:00.000Z');
  assert.deepEqual(parseBackup('\uFEFF'+copy,names),saved);
});

test('merge retains both reflections, current snapshots, positions, and appearance; reimport is idempotent',()=>{
  const key=passageKey(name.id,0),snapshot=capturePassage(name,0);
  const current={...empty(),notes:{[name.id]:'My existing words.'},passages:{[key]:snapshot},positions:{[name.id]:position},last:position,reading:{size:'standard',spacing:'standard',focus:'garden'},theme:'night',unrelatedSetting:'keep'};
  const incoming={...empty(),bookmarks:[name.id,'ar-rahim'],finished:['ar-rahim'],notes:{[name.id]:'Imported words.','ar-rahim':'Another reflection.'},passages:{[key]:{...snapshot,text:'An earlier saved version.'}},positions:{[name.id]:{...position,scroll:12}},pathPlaces:{'mercy-and-return':'ar-rahim'},activePath:'mercy-and-return',reading:{size:'largest',spacing:'open',focus:'quiet'}};
  const original=structuredClone(current),foreign=structuredClone(incoming),result=mergeLibrary(current,incoming,names);
  assert.equal(result.conflicts,1);assert.equal(result.addedNotes,1);assert.equal(result.addedNames,2);assert.equal(result.addedFinished,1);
  assert.equal(result.data.notes[name.id],'My existing words.\n\n— Imported reflection —\n\nImported words.');
  assert.deepEqual(result.data.passages[key],snapshot);
  assert.deepEqual(result.data.positions[name.id],position);
  assert.deepEqual(result.data.reading,current.reading);
  assert.deepEqual(mergeLibrary(current,incoming,names,{useReadingPreferences:true}).data.reading,incoming.reading);
  assert.equal(result.data.unrelatedSetting,'keep');
  assert.equal(result.data.activePath,'mercy-and-return');
  const again=mergeLibrary(result.data,incoming,names);
  assert.deepEqual(again.data,result.data);assert.equal(again.conflicts,0);
  assert.deepEqual(current,original);assert.deepEqual(incoming,foreign);
});

test('invalid or oversized backups are rejected without dropping personal entries',()=>{
  const malformed=[
    'not JSON',JSON.stringify({format:'different',version:1,library:{}}),
    JSON.stringify({format:'beautiful-names-library',version:2,library:{}}),
    payload({notes:{missing:'Never discard this'}}),payload({notes:{[name.id]:'x'.repeat(50001)}}),
    payload({passages:{'ar-rahman:0':{nameId:name.id,section:0,title:'Missing text'}}}),
    payload({positions:{missing:position}}),payload({pathPlaces:{'mercy-and-return':'al-quddus'}}),
    payload({bookmarks:['missing']}),payload({finished:'not a list'}),
    '{"format":"beautiful-names-library","version":1,"library":{"notes":{"__proto__":"unsafe"}}}',
    ' '.repeat(backupLimit+1)
  ];
  for(const copy of malformed)assert.throws(()=>parseBackup(copy,names));
  assert.equal({}.unsafe,undefined);
  const oversized={...empty(),notes:{[name.id]:'x'.repeat(50001)}};
  const before=structuredClone(oversized);
  assert.throws(()=>createBackup(oversized,names),/notes/);
  assert.throws(()=>mergeLibrary(oversized,empty(),names),/notes/);
  assert.deepEqual(oversized,before);
});

test('combined notes that exceed the limit fail before modifying either library',()=>{
  const current={...empty(),notes:{[name.id]:'a'.repeat(30000)}},incoming={...empty(),notes:{[name.id]:'b'.repeat(30000)}};
  assert.throws(()=>mergeLibrary(current,incoming,names),/Nothing was changed/);
  assert.equal(current.notes[name.id],'a'.repeat(30000));
  assert.equal(incoming.notes[name.id],'b'.repeat(30000));
});

test('export refuses a backup larger than its own import limit',()=>{
  const saved={...empty(),notes:Object.fromEntries(names.map(n=>[n.id,'ع'.repeat(20000)]))};
  assert.throws(()=>createBackup(saved,names),/too large/);
  assert.equal(Object.keys(saved.notes).length,99);
});
