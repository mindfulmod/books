import test from 'node:test';
import assert from 'node:assert/strict';
import {names} from './content.js';
import {loadReader,saveReader,storageKey,legacyKey} from './reader-storage.js';
function memory(values={}){const data=new Map(Object.entries(values));return {getItem:k=>data.get(k)??null,setItem:(k,v)=>data.set(k,v)};}
test('fresh readers and denied storage can both open all readings',()=>{
  assert.equal(loadReader(memory(),names).saved.theme,'night');
  const unavailable=loadReader(undefined,names);
  assert.equal(unavailable.available,false);assert.equal(unavailable.writable,false);
  assert.deepEqual(unavailable.saved.notes,{});
  assert.equal(saveReader(undefined,unavailable.saved),false);
});
test('migration preserves preview writing and leaves the original key unchanged',()=>{
  const raw=JSON.stringify({notes:{allah:'A private thought.'},questions:{'al-latif':'A question.'},bookmarks:['allah'],theme:'day',nextReading:'as-salam'});
  const storage=memory({[legacyKey]:raw}),loaded=loadReader(storage,names);
  assert.equal(loaded.saved.notes.allah,'A private thought.');assert.equal(loaded.saved.theme,'day');
  assert.deepEqual(loaded.saved.readingList,['as-salam']);assert.equal(loaded.recovery,null);
  assert.ok(saveReader(storage,loaded.saved));assert.equal(storage.getItem(legacyKey),raw);
  assert.equal(loadReader(storage,names).saved.questions['al-latif'],'A question.');
});
test('corrupt JSON and malformed personal writing are retained exactly for recovery',()=>{
  for(const raw of ['{broken',JSON.stringify({notes:{allah:37},bookmarks:['unknown','allah'],finished:'wrong'})]){
    const storage=memory({[storageKey]:raw}),loaded=loadReader(storage,names);
    assert.equal(loaded.recovery,raw);assert.equal(typeof loaded.saved.notes.allah,'undefined');
    assert.ok(saveReader(storage,loaded.saved,loaded.writable));
    assert.equal(loadReader(storage,names).recovery,raw);
  }
});
test('full storage cannot overwrite corrupt data before a recovery copy is secured',()=>{
  const raw='{my original writing';let writes=0;
  const storage={getItem:k=>k===storageKey?raw:null,setItem:()=>{writes++;throw new Error('QuotaExceededError');}};
  const loaded=loadReader(storage,names);assert.equal(loaded.recovery,raw);assert.equal(loaded.writable,false);
  assert.equal(saveReader(storage,loaded.saved,loaded.writable),false);assert.equal(writes,1);
  assert.equal(storage.getItem(storageKey),raw);
});
test('valid writing containing HTML stays data and survives reload without transformation',()=>{
  const value='<img src=x onerror=alert(1)> & my own words';
  const storage=memory({[storageKey]:JSON.stringify({notes:{allah:value}})});
  const loaded=loadReader(storage,names);assert.equal(loaded.saved.notes.allah,value);assert.equal(loaded.recovery,null);
});
test('a stale tab cannot overwrite a newer library from another tab',()=>{
  const storage=memory(),first=loadReader(storage,names).saved;
  assert.ok(saveReader(storage,{...first,notes:{allah:'New writing in another tab'}},true,null));
  assert.equal(saveReader(storage,first,true,null),false);
  assert.equal(loadReader(storage,names).saved.notes.allah,'New writing in another tab');
});
