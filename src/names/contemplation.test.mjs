import test from 'node:test';
import assert from 'node:assert/strict';
import {names} from './content.js';
import {contemplations} from './contemplation.js';
import {searchReadings} from './reading-room-data.js';
import {capturePassage,createBackup,parseBackup} from './personal-library.js';
import {readingMinutes} from './reader-journey.js';

test('every Name has one distinct, brief observation inside its existing explanation',()=>{
  assert.deepEqual(Object.keys(contemplations).sort(),names.map(n=>n.id).sort());
  assert.equal(new Set(Object.values(contemplations).map(c=>c.notice)).size,99);
  assert.equal(new Set(Object.values(contemplations).map(c=>c.question)).size,99);
  for(const n of names){
    const c=contemplations[n.id],section=n.sections[1];
    assert.equal(section.paragraphs[section.noticeIndex],c.notice,n.id);
    assert.ok(section.noticeIndex>0,`${n.id}: divine meaning must precede the observation`);
    assert.equal(n.reflection,c.question);
    assert.ok(c.notice.split(/\s+/).length<=75,`${n.id}: observation too long`);
    assert.ok(c.question.split(/\s+/).length<=32,`${n.id}: reflection too long`);
    assert.ok(readingMinutes(n)<=4,`${n.id}: reading too long`);
  }
});

test('search reaches observations, practices and reflection questions at the right reading location',()=>{
  for(const n of names){
    const notice=searchReadings(names,contemplations[n.id].notice).find(r=>r.name.id===n.id);
    assert.equal(notice?.section,1,n.id);
    const question=searchReadings(names,n.reflection).find(r=>r.name.id===n.id);
    assert.equal(question?.target,'reflection',n.id);
    const practice=searchReadings(names,n.practice).find(r=>r.name.id===n.id);
    assert.ok(practice,`${n.id}: practice not found`);
  }
});

test('new observations can be kept while existing passage snapshots and reading positions survive',()=>{
  const n=names.find(n=>n.id==='al-malik');
  const passage=capturePassage(n,1);
  assert.ok(passage.text.includes(contemplations[n.id].notice));
  const original={...passage,text:n.sections[1].paragraphs[0]};
  const saved={passages:{'al-malik:1':original},notes:{'al-malik':'My own words stay exactly as written.'},positions:{'al-malik':{id:'al-malik',design:'folio',page:0,anchor:{key:'paragraph-1-1',offset:12},scroll:200,section:n.sections[1].title}}};
  const restored=parseBackup(createBackup(saved,names),names);
  assert.deepEqual(restored.passages['al-malik:1'].text,original.text);
  assert.deepEqual(restored.notes,saved.notes);
  assert.deepEqual(restored.positions['al-malik'].anchor,saved.positions['al-malik'].anchor);
});
