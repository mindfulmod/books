import test from 'node:test';
import assert from 'node:assert/strict';
import {keptEntries,noteExcerpt} from './kept-collection.js';
const names=[{id:'a',name:'Al-Ghaffar',arabic:'الْغَفَّار',meaning:'The Ever-Forgiving'},{id:'b',name:'Ar-Razzaq',arabic:'الرَّزَّاق',meaning:'The Provider'},{id:'c',name:'Al-Wahhab',arabic:'الْوَهَّاب',meaning:'The Bestower'}];
const ids=entries=>entries.map(n=>n.id);
test('Kept combines bookmarks and reflections once, preserving notes when a bookmark is removed',()=>{
 const saved={bookmarks:['a','a'],notes:{a:'A thought',b:'A meal to share',c:'  '}};
 assert.deepEqual(ids(keptEntries(names,saved)),['a','b']);
 assert.deepEqual(ids(keptEntries(names,saved,{type:'names'})),['a']);
 assert.deepEqual(ids(keptEntries(names,saved,{type:'reflections'})),['a','b']);
 assert.deepEqual(ids(keptEntries(names,{...saved,bookmarks:[]})),['a','b']);
 assert.deepEqual(ids(keptEntries(names,{bookmarks:null,notes:{a:false,c:42}})),[]);
});
test('Kept searches only kept names and their writing, across Arabic marks and phrases',()=>{
 const saved={bookmarks:['a'],notes:{b:'I will bring a meal to share.'}};
 assert.deepEqual(ids(keptEntries(names,saved,{query:'الغفار'})),['a']);
 assert.deepEqual(ids(keptEntries(names,saved,{query:'meal to share'})),['b']);
 assert.deepEqual(ids(keptEntries(names,saved,{query:'Provider',type:'names'})),[]);
 assert.deepEqual(ids(keptEntries(names,saved,{query:'Bestower'})),[]);
});
test('reflection previews leave the original writing intact and do not split Unicode code points',()=>{
 const note='  One\nquiet  thought 🌿🌿🌿 ';
 assert.equal(noteExcerpt(note),'One quiet thought 🌿🌿🌿');
 assert.equal(noteExcerpt('🌿'.repeat(10),6),'🌿🌿🌿🌿🌿…');
 assert.equal(note,'  One\nquiet  thought 🌿🌿🌿 ');
});
