import test from 'node:test';
import assert from 'node:assert/strict';
import {pageOfNames, readingPlace} from './name-navigation.js';

test('a 99-name edition stays reachable in groups of eight, with no skipped or repeated entries',()=>{
  const edition=Array.from({length:99},(_,i)=>({id:`name-${i+1}`}));
  const visited=[];
  for(let page=0;page<13;page++){
    const group=pageOfNames(edition,page);
    assert.ok(group.items.length<=8);
    assert.equal(group.pages,13);
    visited.push(...group.items);
  }
  assert.deepEqual(visited,edition);
  assert.deepEqual(pageOfNames(edition,12).items,edition.slice(96));
  assert.equal(pageOfNames(edition,100).page,12);
  assert.equal(pageOfNames(edition,-4).page,0);
});

test('filtering from a later index page clamps to the available results, including empty results',()=>{
  assert.equal(pageOfNames(['one','two'],12).page,0);
  assert.deepEqual(pageOfNames([],12),{page:0,pages:1,items:[],start:0,end:0});
});

test('returning to a name uses its own place and does not borrow another name or layout position',()=>{
  const saved={last:{id:'b',design:'folio',scroll:200},positions:{a:{id:'a',design:'folio',scroll:900,page:0,reflectionOpen:true}}};
  assert.equal(readingPlace(saved,'a','folio').scroll,900);
  assert.equal(readingPlace(saved,'a','folio').reflectionOpen,true);
  assert.equal(readingPlace(saved,'b','folio').scroll,200);
  assert.equal(readingPlace(saved,'c','folio'),null);
  assert.equal(readingPlace(saved,'a','book'),null);
  assert.equal(readingPlace({last:{id:'a',design:'folio',scroll:-10}},'a','folio').scroll,0);
});
