import test from 'node:test';
import assert from 'node:assert/strict';
import {readingPreferences} from './reading-preferences.js';
import {keptExport} from './kept-export.js';

test('reading preferences recover safe defaults from incomplete or old saved data',()=>{
  for(const value of [undefined,null,{},'large',{size:'gigantic',spacing:-1}])
    assert.deepEqual(readingPreferences(value),{size:'standard',spacing:'standard',focus:'garden'});
  assert.deepEqual(readingPreferences({size:'largest',spacing:'open'}),{size:'largest',spacing:'open',focus:'garden'});
});
test('quiet reading is opt-in and invalid modes recover the garden',()=>{
  assert.equal(readingPreferences({focus:'quiet'}).focus,'quiet');
  assert.equal(readingPreferences({focus:'hidden'}).focus,'garden');
});
test('a personal copy includes bookmarked and written names once and preserves original writing',()=>{
  const names=[{id:'a',name:'Al-Latif',arabic:'اللَّطِيف',meaning:'The Subtly Kind'},
    {id:'b',name:'Ar-Razzaq',arabic:'الرَّزَّاق',meaning:'The Provider'},
    {id:'c',name:'Al-Wahhab',arabic:'الْوَهَّاب',meaning:'The Bestower'}];
  const note='  A quiet detail.\n\nالحمد لله 🌿\n<not HTML>';
  const copy=keptExport(names,{bookmarks:['a','a'],notes:{a:note,b:'A meal to share',c:'  '}});
  assert.equal(copy.split('Al-Latif').length-1,1);
  assert.ok(copy.includes(note));
  assert.ok(copy.includes('Ar-Razzaq'));
  assert.ok(!copy.includes('Al-Wahhab'));
  assert.equal(keptExport(names,{}),'');
});
