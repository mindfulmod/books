import test from 'node:test';
import assert from 'node:assert/strict';
import {access} from 'node:fs/promises';
import {names,themes} from './content.js';
import {chapterArt,endingArt} from './chapter-art.js';
import {nameFrames,nameFrame,nameSeal} from './name-frames.js';
import {pageOfNames} from './name-navigation.js';

test('every live route has a reading, a valid path, related routes, artwork and a distinct ornament',async()=>{
  const ids=new Set(names.map(n=>n.id));
  assert.equal(ids.size,names.length,'duplicate name routes');
  const themeIds=new Set(themes.map(t=>t.id));
  const seals=new Set(),corners=new Set();
  for(const n of names){
    assert.ok(themeIds.has(n.theme),`${n.id}: missing theme`);
    assert.equal(n.sections.length,3,`${n.id}: missing reading page`);
    for(const section of n.sections) assert.ok(section.title&&section.paragraphs.length&&section.paragraphs.every(p=>p.trim()),n.id);
    for(const related of n.related) assert.ok(ids.has(related),`${n.id}: broken related route ${related}`);
    for(const field of ['introduction','practice','reflection','sourceNote','arabicExcerpt']) assert.ok(n[field]?.trim(),`${n.id}: missing ${field}`);
    assert.ok(nameFrames[n.id],`${n.id}: fallback ornament`);
    assert.ok(chapterArt[n.id]?.description,`${n.id}: missing scene description`);
    await access(new URL(`../../public/assets/beautiful-names/art/${chapterArt[n.id].file}`,import.meta.url));
    const focus=chapterArt[n.id].focus??443;
    assert.ok(focus>=0&&focus+888<=1774,`${n.id}: phone crop exceeds panorama`);
    seals.add(nameSeal(n.id)); corners.add(nameFrame(n.id));
  }
  assert.equal(seals.size,names.length,'repeated name seals');
  assert.equal(corners.size,names.length,'repeated name frames');
  for(const [id,art] of Object.entries(endingArt)){
    assert.ok(ids.has(id),`orphan page ending: ${id}`);
    await access(new URL(`../../public/assets/beautiful-names/art/${art.file}`,import.meta.url));
  }
});

test('the growing edition remains reachable across index pages',()=>{
  const pages=pageOfNames(names).pages;
  const found=Array.from({length:pages},(_,page)=>pageOfNames(names,page).items).flat();
  assert.deepEqual(found,names);
  assert.ok(pages>1,'the live edition now exercises pagination');
});
