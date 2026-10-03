import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {names} from './content.js';
import {normalizeSearch,filterNames} from './discovery.js';
import {chapterArt} from './chapter-art.js';

test('all 99 entries follow the source enumeration, with the documented Muhyi transcription correction',async()=>{
 const evidence=JSON.parse(await readFile(new URL('./source-excerpt-evidence.json',import.meta.url)));
 const source=evidence.lines['130'].split('هو الله الذي')[1].replace(/^ لا إله هو /,'الله ').replace('المحي المميت','المحيي المميت');
 assert.equal(names.length,99);
 assert.equal(normalizeSearch(names.map(n=>n.arabic).join(' ')),normalizeSearch(source));
 assert.deepEqual(names.map(n=>n.number),Array.from({length:99},(_,i)=>i+1));
 assert.equal(names[0].id,'allah');assert.equal(names.at(-1).id,'as-sabur');
});
test('all 99 source excerpts occur in the retrieved Arabic evidence',async()=>{
 const evidence=JSON.parse(await readFile(new URL('./source-excerpt-evidence.json',import.meta.url)));
 const text=Object.values(evidence.lines).join(' ');
 const unvocalized=s=>s.normalize('NFC').replace(/[\u064B-\u065F\u0670\u0640]/g,'');
 for(const n of names)assert.ok(text.includes(unvocalized(n.arabicExcerpt)),`${n.id}: excerpt not found`);
});
test('similar Names keep distinct routes and number search reaches the full edition',()=>{
 for(const [query,id] of [['المجيد','al-majid'],['الماجد','al-maajid'],['الولي','al-wali'],['الوالي','al-waali'],['1','allah'],['99','as-sabur'],['٩٩','as-sabur'],['۸۵','dhul-jalali-wal-ikram']]) {
   assert.deepEqual(filterNames(names,{query}).map(n=>n.id),[id],query);
 }
 assert.deepEqual(filterNames(names,{query:'100'}),[]);
 assert.equal(new Set(names.map(n=>chapterArt[n.id].file)).size,26);
});
