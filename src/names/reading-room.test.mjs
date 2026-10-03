import test from 'node:test';
import assert from 'node:assert/strict';
import {names,themes,sourceUrl} from './content.js';
import {chapterArt} from './chapter-art.js';
import {readingList,toggleReadingList,moveReadingList,recallNames,nameConnections,searchReadings,readingStats,keyIdeas,readingCardText,gardenSettings,searchExcerpt} from './reading-room-data.js';
import {createBackup,parseBackup,mergeLibrary,libraryData} from './personal-library.js';
import {keptExport} from './kept-export.js';
import {nextSuggestion,toggleFinished} from './reader-journey.js';

test('reading list migrates the old choice, preserves order, rejects unknown Names and supports bounded reordering',()=>{
  const saved={nextReading:'as-salam',notes:{allah:'Preserve me'}};
  const one=toggleReadingList(saved,'al-latif',names),two=toggleReadingList(one,'ar-rahman',names);
  assert.deepEqual(readingList(two,names),['as-salam','al-latif','ar-rahman']);
  const moved=moveReadingList(two,'ar-rahman',-1,names);
  assert.deepEqual(moved.readingList,['as-salam','ar-rahman','al-latif']);
  assert.equal(moveReadingList(moved,'as-salam',-1,names),moved);
  assert.equal(moveReadingList(moved,'missing',1,names),moved);
  assert.deepEqual(toggleReadingList(moved,'as-salam',names).readingList,['ar-rahman','al-latif']);
  assert.deepEqual(toggleReadingList(moved,'missing',names).readingList,moved.readingList);
  assert.deepEqual(saved,{nextReading:'as-salam',notes:{allah:'Preserve me'}});
  assert.deepEqual(readingList({readingList:{}},names),[]);
});
test('completion consumes only its queued Name and advances suggestions without skipping the rest',()=>{
  const saved={readingList:['as-salam','al-latif','ar-rahman'],nextReading:'as-salam',finished:[]};
  const done=toggleFinished(saved,'as-salam');
  assert.deepEqual(done.readingList,['al-latif','ar-rahman']);assert.equal(done.nextReading,'al-latif');
  assert.equal(nextSuggestion(names,done,'as-salam').name.id,'al-latif');
  assert.deepEqual(toggleFinished(done,'as-salam').readingList,done.readingList);
  assert.equal(nextSuggestion(names,saved,'as-salam').name.id,'al-latif');
});
test('recall offers honest starter sets, respects explicit sources and prioritises reader-selected revisits',()=>{
  assert.deepEqual(recallNames(names).map(n=>n.id),['allah','ar-rahman','as-salam']);
  assert.deepEqual(recallNames(names,{},'saved'),[]);
  const saved={reviewNames:['al-latif','missing'],finished:['as-salam','al-latif'],bookmarks:['ar-rahman']};
  assert.deepEqual(recallNames(names,saved).map(n=>n.id),['al-latif','as-salam','ar-rahman']);
  assert.deepEqual(recallNames(names,saved,'saved').map(n=>n.id),['ar-rahman']);
  assert.deepEqual(recallNames(names,saved,'revisit').map(n=>n.id),['al-latif']);
});
test('full-book search reaches exact source sections and normalises Arabic and punctuation',()=>{
  const hits=searchReadings(names,'no creature stands outside');
  const hit=hits.find(r=>r.name.id==='al-jabbar');
  assert.equal(hit.section,0);assert.equal(hit.snippet,hit.name.sections[0].paragraphs[0]);
  assert.equal(searchReadings(names,'الرحمن')[0].name.id,'ar-rahman');
  assert.equal(searchReadings(names,'٩٩')[0].name.number,99);
  assert.deepEqual(searchReadings(names,'unmatchedphrasefortesting'),[]);
  assert.deepEqual(searchReadings(names,' '),[]);
  for(const n of names)assert.ok(searchReadings(names,n.name).some(r=>r.name.id===n.id));
});
test('every Name has valid distinct connections and exactly one atlas attribute group',()=>{
  for(const n of names){const links=nameConnections(n,names);assert.ok(links.length);assert.equal(new Set(links.map(c=>c.name.id)).size,links.length);assert.ok(links.every(c=>c.name.id!==n.id));assert.equal(themes.filter(t=>t.id===n.theme).length,1);}
  assert.equal(nameConnections(names.find(n=>n.id==='al-qabid'),names)[0].name.id,'al-basit');
});
test('key ideas and portable cards use the existing attribute explanations with source attribution',()=>{
  assert.equal(keyIdeas.length,10);
  for(const k of keyIdeas)assert.ok(names.find(n=>n.id===k.id)?.sections[k.section].paragraphs.length);
  for(const n of names){const text=readingCardText(n,sourceUrl);assert.ok(text.includes(n.arabic));assert.ok(text.includes(n.sections[0].paragraphs[0]));assert.ok(text.includes(sourceUrl));assert.ok(text.includes('Original companion adaptation'));}
});
test('garden discovery covers all 99 Names once across 26 actual illustration files',()=>{
  const settings=gardenSettings(names,chapterArt);
  assert.equal(settings.length,26);assert.equal(new Set(settings.map(a=>a.file)).size,26);
  assert.deepEqual(settings.flatMap(a=>a.names.map(n=>n.id)).sort(),names.map(n=>n.id).sort());
});
test('room counts use only genuine known activity',()=>{
  assert.deepEqual(readingStats(names,{}),{read:0,saved:0,questions:0,queued:0,revisit:0});
  assert.deepEqual(readingStats(names,{finished:['allah','allah','missing'],questions:{allah:'A question',missing:'Unknown','ar-rahman':' '},reviewNames:['as-salam'],nextReading:'al-latif'}),{read:1,saved:0,questions:1,queued:1,revisit:1});
});
test('questions, recall choices and reading order survive old and new backups without replacing personal writing',()=>{
  const saved={questions:{allah:'Why this distinction?\nالحمد لله'},readingList:['as-salam','al-latif'],nextReading:'as-salam',reviewNames:['ar-rahman']};
  const parsed=parseBackup(createBackup(saved,names),names);
  assert.deepEqual(parsed.questions,saved.questions);assert.deepEqual(parsed.readingList,saved.readingList);assert.deepEqual(parsed.reviewNames,saved.reviewNames);
  const old=parseBackup('{"format":"beautiful-names-library","version":1,"library":{"nextReading":"al-latif"}}',names);
  assert.deepEqual(old.readingList,['al-latif']);assert.deepEqual(old.questions,{});
  const incoming={questions:{allah:'Another question','ar-rahman':'A new question'},readingList:['ar-rahman','al-latif'],reviewNames:['as-salam']};
  const merged=mergeLibrary(saved,incoming,names);
  assert.equal(merged.questionConflicts,1);assert.equal(merged.addedQuestions,1);
  assert.ok(merged.data.questions.allah.includes(saved.questions.allah));assert.ok(merged.data.questions.allah.includes('Another question'));
  assert.deepEqual(merged.data.readingList,['as-salam','al-latif','ar-rahman']);
  assert.deepEqual(mergeLibrary(merged.data,incoming,names).data,merged.data);
  assert.deepEqual(saved.questions,{allah:'Why this distinction?\nالحمد لله'});
});
test('invalid and oversized question data are rejected, never silently discarded',()=>{
  for(const value of [{questions:{missing:'Keep me'}},{questions:{allah:'x'.repeat(50001)}},{questions:[]},{reviewNames:['missing']},{readingList:['missing']}])assert.throws(()=>createBackup(value,names));
  assert.throws(()=>mergeLibrary({questions:{allah:'a'.repeat(30000)}},{questions:{allah:'b'.repeat(30000)}},names),/Nothing was changed/);
  assert.deepEqual(libraryData({},names).readingList,[]);
});

test('recall rotates through familiar Names and search excerpts retain late matches',()=>{
  const known=names.slice(0,8).map(n=>n.id),recalled=known.slice(0,5);
  assert.deepEqual(recallNames(names,{finished:known,recalledNames:recalled}).map(n=>n.id),[...known.slice(5),...known.slice(0,2)]);
  const text='An opening sentence. '.repeat(25)+'His knowledge encompasses the hidden. '+'More explanation. '.repeat(10);
  const excerpt=searchExcerpt(text,'knowledge encompasses');
  assert.ok(excerpt.includes('knowledge encompasses'));assert.ok(excerpt.length<=202);assert.ok(excerpt.startsWith('…'));
  const saved={recalledNames:['allah','as-salam']};assert.deepEqual(parseBackup(createBackup(saved,names),names).recalledNames,saved.recalledNames);
});

test('a text copy preserves questions even when no Name or passage has been saved',()=>{
  const question='  A question to preserve.\nالحمد لله  ';
  const text=keptExport(names,{questions:{'al-jabbar':question}});
  assert.ok(text.includes(question));assert.ok(text.includes('My question'));assert.ok(text.includes('Al-Jabbar'));
});
