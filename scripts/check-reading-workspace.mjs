import assert from 'node:assert/strict';
import { build } from 'esbuild';
import { fileURLToPath } from 'node:url';
const root = fileURLToPath(new URL('..', import.meta.url));
const output = await build({ stdin: { contents: "export * from './src/reading/readingWorkspace'; export {companionReturns} from './src/reading/companionReturns'; export {bookNavigation} from './src/reading/bookNavigation';", resolveDir: root, loader: 'ts' }, bundle: true, platform: 'node', format: 'esm', write: false });
const { companionReturns, normalizeWorkspace, recordReadingVisit, toggleReadingComplete, nextBookSection, exportNotebook, resolveSection, estimatedReadingMinutes, bookNavigation: books } = await import(`data:text/javascript;base64,${Buffer.from(output.outputFiles[0].text).toString('base64')}`);
let workspace = normalizeWorkspace(null, books);
const initial = workspace;
workspace = recordReadingVisit(workspace, '1:2');
assert.deepEqual(workspace.completed, [], 'Opening a section must not mark it complete');
assert.deepEqual(initial.recent, [], 'State updates must preserve the previous snapshot');
assert.equal(nextBookSection(books[0], workspace).id, 2, 'Resume the last unfinished section');
assert.equal(recordReadingVisit(workspace, '1:2'), workspace, 'Repeated active-section effects must be a no-op');
workspace = toggleReadingComplete(workspace, '1:2');
assert.equal(nextBookSection(books[0], workspace).id, 1, 'A completed recent section must not displace the next unread section');
workspace = toggleReadingComplete(workspace, '1:2');
assert.deepEqual(workspace.completed, [], 'Completion is reversible');
for (let id = 1; id <= 12; id++) workspace = recordReadingVisit(workspace, `2:${id}`);
assert.equal(workspace.recent.length, 8);
assert(workspace.visited.includes('1:2'), 'Old reading activity must survive eviction from the recent list');
assert.equal(new Set(workspace.recent).size, workspace.recent.length);
const normalized = normalizeWorkspace({ completed:['1:2','1:2','99:1','1:2:3'],recent:['1:2','1:999'],visited:['2:1'],notes:{ '1:2':{body:'A private reflection.',prompt:'What stays?',updatedAt:'2026-10-02T12:00:00.000Z'}, '1:3':{body:' '.repeat(10)}, '99:1':{body:'invalid'},'1:4':{body:'x'.repeat(13000),updatedAt:'invalid'}},preferences:{textSize:90,spacing:'unknown',width:'unknown'} }, books);
assert.deepEqual(normalized.completed,['1:2']);
assert.deepEqual(normalized.recent,['1:2']);
assert.deepEqual(normalized.visited,['2:1','1:2']);
assert.equal(normalized.notes['1:4'].body.length,12000);
assert.equal(normalized.notes['1:4'].updatedAt,'');
assert.equal(Object.keys(normalized.notes).length,2);
assert.deepEqual(normalized.preferences,{textSize:18,spacing:'normal',width:'balanced'});
assert.equal(normalizeWorkspace(null,books,true).preferences.textSize,21,'Migrate the existing large-text preference');
assert.equal(normalizeWorkspace({preferences:{textSize:24,spacing:'open',width:'focused'}},books).preferences.textSize,24);
assert.equal(resolveSection(books,'01:2'),null);
assert.equal(resolveSection(books,'1:2:extra'),null);
assert.equal(resolveSection(books,'40:999'),null);
const markdown=exportNotebook(normalized.notes,books);
assert(markdown.includes('## Book 1 · Knowledge'));
assert(markdown.includes('Reflection prompt: What stays?\n\nA private reflection.'));
assert(markdown.includes('Last edited: 2026-10-02'));
assert(!markdown.includes('invalid'));
assert.equal(estimatedReadingMinutes({thesis:'one '.repeat(401),context:'',moves:[],distinction:{},misreading:'',observation:'',sourceAnchor:''}),3);
assert.equal(estimatedReadingMinutes({thesis:'',context:'',moves:[],distinction:{},misreading:'',observation:'',sourceAnchor:''}),1);
for (const book of books) {
  const done = normalizeWorkspace({completed:book.chapters.map(chapter=>`${book.id}:${chapter.id}`)}, books);
  assert.equal(nextBookSection(book, done).id,book.chapters[0].id,'A finished book can be read again');
}
console.log('Reading workspace passed: separate visit/completion, resume order, history retention, corrupt-storage recovery, preference migration, notebook export, estimates, and all 40 completed-book fallbacks.');

const returnStorage = (values) => ({getItem:key => values[key] ?? null});
assert.deepEqual(companionReturns(returnStorage({})), []);
assert.deepEqual(companionReturns({getItem:()=>{throw new Error('blocked');}}), []);
assert.deepEqual(companionReturns(returnStorage({'idp-bookmark-v2':'bad json','mindfulmod-timeless-seeds-v1':'[]'})), []);
const returns=companionReturns(returnStorage({
 'idp-bookmark-v2':JSON.stringify({id:'passage-12',section:'complete',title:'A saved passage'}),
 'mindfulmod-timeless-seeds-v1':JSON.stringify({last:50,lastPath:'hope',notes:{50:'Private reflection'}}),
}));
assert.equal(returns[0].path,'inner-dimensions-of-the-prayer.html#passage-12');
assert.equal(returns[0].detail,'Complete companion');
assert.equal(returns[1].path,'timeless-seeds.html#seed-50?path=hope');
assert(!JSON.stringify(returns).includes('Private reflection'));
assert.equal(companionReturns(returnStorage({'mindfulmod-timeless-seeds-v1':JSON.stringify({last:83})}))[0].path,'timeless-seeds.html#seed-83');
assert.deepEqual(companionReturns(returnStorage({'idp-bookmark-v2':JSON.stringify({id:'javascript:alert(1)',title:'Bad'}),'mindfulmod-timeless-seeds-v1':JSON.stringify({last:999})})),[]);
console.log('Library returns passed: legacy locations, guided paths, malformed and blocked storage, safe local anchors, and no reflection content copied.');

assert.equal(companionReturns(returnStorage({'mindfulmod-timeless-seeds-v1':JSON.stringify({last:77,lastPath:'after-argument'})}))[0].path,'timeless-seeds.html#seed-77?path=after-argument');
const namesReturn = companionReturns(returnStorage({'beautiful-names-library-v1':JSON.stringify({last:{id:'ar-rahman',page:2,section:'Mercy'},notes:{'ar-rahman':'Private writing'}})}));
assert.equal(namesReturn[0].path,'beautiful-names/#read/ar-rahman/2');
assert(!JSON.stringify(namesReturn).includes('Private writing'));
assert.deepEqual(companionReturns(returnStorage({'beautiful-names-library-v1':JSON.stringify({last:{id:'../../outside'}})})),[]);
