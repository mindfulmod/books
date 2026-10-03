import test from 'node:test';
import assert from 'node:assert/strict';
import {names} from './content.js';
import {readingMinutes,nextSuggestion,revisitSuggestion,toggleFinished} from './reader-journey.js';
import {createBackup,parseBackup,mergeLibrary} from './personal-library.js';

test('every Name has a bounded reading estimate and an available next reading',()=>{
  for(const n of names){
    assert.ok(readingMinutes(n)>=1&&readingMinutes(n)<=6);
    const next=nextSuggestion(names,{},n.id);
    assert.ok(names.includes(next.name));assert.notEqual(next.name.id,n.id);
  }
  assert.equal(nextSuggestion(names,{}).name.id,'allah');
});
test('next reading follows a chosen path before general recommendations, and skips read entries',()=>{
  const saved={activePath:'mercy-and-return',finished:['ar-rahman','ar-rahim'],nextReading:'as-salam'};
  const result=nextSuggestion(names,saved,'ar-rahim');
  assert.equal(result.name.id,'al-ghaffar');assert.equal(result.kind,'path');
  assert.equal(nextSuggestion(names,{nextReading:'as-salam'},'ar-rahim').name.id,'as-salam');
});
test('recommendations connect paired meanings and avoid repeats or invalid saved IDs',()=>{
  assert.equal(nextSuggestion(names,{},'al-qabid').name.id,'al-basit');
  const result=nextSuggestion(names,{finished:['al-basit'],nextReading:'missing'},'al-qabid');
  assert.notEqual(result.name.id,'al-basit');assert.notEqual(result.name.id,'al-qabid');
  const allRead={finished:names.map(n=>n.id),bookmarks:['as-salam']};
  assert.equal(nextSuggestion(names,allRead,'as-sabur').name.id,'as-salam');
  assert.equal(nextSuggestion(names,allRead,'as-sabur').kind,'revisit');
});
test('completion is reversible, consumes only the selected next reading, and never changes reflections',()=>{
  const original={finished:[],nextReading:'as-salam',notes:{'as-salam':'My own words.'}};
  const complete=toggleFinished(original,'as-salam');
  assert.deepEqual(original.finished,[]);assert.deepEqual(complete.finished,['as-salam']);
  assert.equal(complete.nextReading,null);assert.deepEqual(complete.notes,original.notes);
  assert.deepEqual(toggleFinished(complete,'as-salam').finished,[]);
  assert.equal(toggleFinished({...original,nextReading:'al-latif'},'as-salam').nextReading,'al-latif');
});
test('return invitations use the reader’s writing and passages without inventing activity',()=>{
  assert.equal(revisitSuggestion(names,{}),null);
  const saved={last:{id:'as-salam'},notes:{'al-latif':'A thought to return to','ar-rahman':' '},passages:{'ar-rahim:0':{nameId:'ar-rahim'}}};
  assert.equal(revisitSuggestion(names,saved).name.id,'al-latif');
  assert.equal(revisitSuggestion(names,{...saved,notes:{}}).kind,'passage');
  assert.equal(revisitSuggestion(names,{notes:{'as-salam':'my words'},last:{id:'as-salam'}}),null);
});
test('the chosen next reading survives backup and existing choices take precedence when merging',()=>{
  const restored=parseBackup(createBackup({nextReading:'al-latif'},names),names);
  assert.equal(restored.nextReading,'al-latif');
  assert.equal(mergeLibrary({nextReading:'as-salam'},restored,names).data.nextReading,'as-salam');
  assert.equal(mergeLibrary({},restored,names).data.nextReading,'al-latif');
  assert.throws(()=>parseBackup('{"format":"beautiful-names-library","version":1,"library":{"nextReading":"missing"}}',names));
});
