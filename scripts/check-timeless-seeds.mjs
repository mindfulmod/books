import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { mkdtemp, readFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { pathToFileURL } from 'node:url';
import { build } from 'esbuild';

const directory = await mkdtemp(join(tmpdir(), 'timeless-seeds-check-'));
try {
  await build({ entryPoints: ['src/seeds/content.ts', 'src/seeds/state.ts'], outdir: directory, bundle: true, platform: 'node', format: 'esm', outExtension: { '.js': '.mjs' } });
  const { seeds, themes, sourceEntries, sourceNotes, sourcePlainText } = await import(pathToFileURL(join(directory, 'content.mjs')));
  const { validateGarden, dailySeedId, formatGarden, emptyGarden, gardenTabFor, loadGarden, saveGarden, resumeFor, STORAGE_KEY } = await import(pathToFileURL(join(directory, 'state.mjs')));
  assert.deepEqual(seeds.map(s => s.id), Array.from({ length: 111 }, (_, i) => i + 1));
  assert.equal(new Set(seeds.map(s => s.title)).size, 111, 'Every entry needs a distinct title.');
  for (const seed of seeds) {
    assert(seed.title && seed.reading.length > 140 && seed.prompt.endsWith('?'), `Incomplete entry ${seed.id}`);
    assert(seed.page >= 7 && seed.page <= seed.lastPage && seed.lastPage <= 135, `Invalid source range ${seed.id}`);
    assert(themes.some(t => t.id === seed.theme), `Unknown theme ${seed.id}`);
    assert.equal(seed.credit.id, seed.id, `Source credit mismatch ${seed.id}`);
    assert(seed.credit.names.length > 0, `Missing source credit ${seed.id}`);
    for (const ref of seed.credit.references) {
      if (ref.note) {
        assert(seed.source.notes.includes(ref.note), `Credit points to another seed’s note: ${seed.id}`);
        assert.equal(ref.target, `book-note-${ref.note}`);
      } else assert.equal(ref.target, 'seed-book');
      if (ref.evidence) {
        const original = sourcePlainText(seed.source.blocks).replace(/\s/g, '');
        assert(original.includes(ref.evidence.replace(/\s/g, '')), `Qur’an reference absent from source: ${seed.id}`);
      }
    }
    assert(!/\b(the author|the reader|this entry|the passage (asks|encourages|invites)|the advice asks|the lesson is|the message is)\b/i.test(seed.reading), `Indirect commentary in explanation ${seed.id}`);
  }
  for (const theme of themes) {
    assert.equal(new Set(theme.route).size, 4);
    assert(theme.route.every(id => seeds[id - 1]?.theme === theme.id), `Path ${theme.id} must contain four readings in that theme.`);
  }
  assert.equal(seeds[0].page, 7);
  assert.equal(seeds[102].page, 120);
  assert.equal(seeds[110].page, 135);
  assert.equal(sourceEntries.length, 111);
  assert.deepEqual(sourceNotes.map(n => n.id), Array.from({ length: 117 }, (_, i) => i + 1));
  const references = new Set();
  for (const seed of seeds) {
    assert(seed.source.blocks.length > 0, `Missing book text for ${seed.id}`);
    assert(sourcePlainText(seed.source.blocks).length > 80, `Empty book entry ${seed.id}`);
    const inText = seed.source.blocks.flatMap(b => b.runs).filter(r => typeof r !== 'string' && 'note' in r).map(r => r.note);
    assert.deepEqual(inText, seed.source.notes, `Reference mismatch ${seed.id}`);
    for (const note of seed.source.notes) { references.add(note); assert(sourceNotes.some(n => n.id === note)); }
    assert(!/the opening (image|reports)|the (shepherd|traveler) metaphor|the passage above,? rather/i.test(seed.reading), `Unexplained dependency in ${seed.id}`);
    assert(seed.reading.split('\n\n').length >= 2, `Reading needs a developed explanation: ${seed.id}`);
  }
  assert.equal(references.size, 117, 'Every original endnote must be reachable from a reading.');
  const first = sourcePlainText(seeds[0].source.blocks);
  assert(first.includes('If the shepherd’s dog ever barks at you attempting to attack you'));
  assert(seeds[0].reading.includes('Seeking refuge means asking for safety and protection.'));
  assert(seeds[24].reading.startsWith('Allah already knows what is on your heart'));
  assert(seeds[25].reading.startsWith('Act while you still have a chance.'));
  assert(seeds[24].credit.references.some(r => r.label === 'Qur’an 20:17'));
  assert(seeds[47].credit.references.some(r => r.label === 'Sahih al-Bukhari 7466' && r.note === 57));
  assert.deepEqual(seeds[68].credit.names, ['Ibn Uthaymin', 'Mufti Menk']);
  assert(sourcePlainText(seeds[2].source.blocks).includes('God will find a way out for those who are mindful of Him'));
  assert(sourcePlainText(seeds[45].source.blocks).includes('They go out early in the morning hungry and return in the evening full.'));
  const tenth = sourcePlainText(seeds[107].source.blocks);
  for (let number = 1; number <= 10; number++) assert(tenth.includes(`${number}) `), `Missing original item ${number}`);
  assert(sourcePlainText(seeds[5].source.blocks).includes('not not complain'), 'Do not silently edit source typos.');
  assert(sourcePlainText(seeds[19].source.blocks).includes('Allah ﷺ'), 'Source honorifics must remain as printed.');
  const reader = await readFile('src/seeds/SeedsApp.tsx', 'utf8');
  assert(reader.indexOf('id="seed-explanation"') < reader.indexOf('<BookPassage seed={seed}/>'));
  assert(reader.includes('sourcePlainText(s.source.blocks)'), 'Search must include the full book text.');
  const auditVerbatim = JSON.parse(await readFile('review/timeless-seeds/verbatim-audit.json', 'utf8'));
  assert.equal(auditVerbatim.pages.length, 245);
  assert.deepEqual(auditVerbatim.blankPages, [63]);
  assert(auditVerbatim.pages.every(p => p.characters > 0 && p.sha256.length === 64));
  const blocksByPage = new Map();
  for (const item of [...sourceEntries, ...sourceNotes]) for (const block of item.blocks) {
    blocksByPage.set(block.page, [...(blocksByPage.get(block.page) || []), ...block.runs]);
  }
  for (const page of auditVerbatim.pages) {
    const runs = blocksByPage.get(page.page);
    assert(runs, `Missing original PDF page ${page.page}`);
    const text = runs.map(r => typeof r === 'string' ? r : 'note' in r ? String(r.note) : '').join('').replace(/\s/g, '');
    assert.equal(text.length, page.characters, `Character count changed on PDF page ${page.page}`);
    assert.equal(createHash('sha256').update(text).digest('hex'), page.sha256, `Original wording changed on PDF page ${page.page}`);
    assert.equal(runs.filter(r => typeof r !== 'string' && 'image' in r).length, page.images, `Missing honorific on PDF page ${page.page}`);
  }
  assert.deepEqual(validateGarden(null), emptyGarden());
  // Returning readers move on from a finished reading instead of being sent back to it.
  const kindness = themes.find(t => t.id === 'kindness');
  assert.equal(resumeFor(emptyGarden(), themes), null);
  assert.deepEqual(resumeFor({ ...emptyGarden(), last: 12 }, themes), { id: 12, kind: 'return', path: 'kindness', step: 1, total: 4 });
  assert.deepEqual(resumeFor({ ...emptyGarden(), last: 12, read: [12] }, themes), { id: kindness.route[1], kind: 'continue', path: 'kindness', step: 2, total: 4 });
  assert.deepEqual(resumeFor({ ...emptyGarden(), last: kindness.route[3], read: [...kindness.route] }, themes), { id: kindness.route[3] % 111 + 1, kind: 'next', finishedPath: 'kindness' });
  const offPath = seeds.find(s => !themes.some(t => t.route.includes(s.id)) && s.id < 111).id;
  assert.deepEqual(resumeFor({ ...emptyGarden(), last: offPath, read: [offPath] }, themes), { id: offPath + 1, kind: 'next' });
  assert.equal(resumeFor({ ...emptyGarden(), last: 5, read: seeds.map(s => s.id) }, themes).kind, 'done');
  // A reflection-only visitor must not arrive at an empty Saved seeds collection.
  const reflectionOnly = { ...emptyGarden(), intentions: { 12: 'Help with a meal.' } };
  assert.equal(gardenTabFor(reflectionOnly), 'notes');
  assert.equal(gardenTabFor({ ...emptyGarden(), notes: { 12: 'A thought.' } }), 'notes');
  assert.equal(gardenTabFor({ ...emptyGarden(), notes: { 12: '  ' }, read: [12] }), 'read');
  assert.equal(gardenTabFor({ ...reflectionOnly, saved: [12] }), 'saved');
  assert.equal(gardenTabFor({ ...reflectionOnly, saved: [12] }, 'notes'), 'notes');
  assert.equal(gardenTabFor(reflectionOnly, 'saved'), 'saved');
  assert.equal(gardenTabFor(reflectionOnly, 'invalid'), 'notes');
  assert.equal(gardenTabFor(emptyGarden()), 'saved');
  const recovered = validateGarden({ saved: [1, 1, 112, '2', -3, 55], read: 'bad', notes: { 1: 'A note', 112: 'bad', 2: 42 }, intentions: { 1: 'One step' }, last: 999, large: 'true' });
  assert.deepEqual(recovered.saved, [1, 55]);
  assert.deepEqual(recovered.read, []);
  assert.deepEqual(recovered.notes, { 1: 'A note' });
  assert.equal(recovered.last, null);
  assert.equal(recovered.large, false);
  for (let day = 1; day < 365; day++) {
    const am = new Date(2026, 0, day, 1);
    const pm = new Date(2026, 0, day, 23);
    assert.equal(dailySeedId(am), dailySeedId(pm), 'A daily seed must remain stable for its local date.');
    assert(dailySeedId(am) >= 1 && dailySeedId(am) <= 111);
  }
  const garden = { ...emptyGarden(), saved: [1], read: [2], notes: { 46: 'A note\nwith a second line.' }, intentions: { 50: 'A new beginning.' } };
  const exported = formatGarden(garden, seeds, new Date(2026, 8, 25));
  for (const id of [1, 2, 46, 50]) assert(exported.includes(`SEED ${id} ·`), `Export missing ${id}`);
  assert(exported.includes('A note\nwith a second line.'));
  assert(exported.includes('One small action: A new beginning.'));
  assert(!exported.includes('SEED 3 ·'));
  const previousStorage = globalThis.localStorage;
  try {
    for (const corrupt of ['{broken json', 'null', '[]', '"unexpected string"']) {
      let stored = corrupt;
      globalThis.localStorage = { getItem: () => stored, setItem: (key, value) => { assert.equal(key, STORAGE_KEY); stored = value; } };
      const initial = loadGarden();
      assert.equal(initial.error, true, 'Unreadable data should enter safe recovery.');
      assert.equal(saveGarden(garden, !initial.error), false);
      assert.equal(stored, corrupt, 'Never replace unreadable saved writing with an empty garden or a new draft.');
    }
    let stored = null;
    globalThis.localStorage = { getItem: () => stored, setItem: (_, value) => { stored = value; } };
    const initial = loadGarden();
    assert.equal(initial.error, false);
    assert.equal(saveGarden(garden, !initial.error), true);
    assert.deepEqual(loadGarden().garden, garden);
    globalThis.localStorage = { getItem: () => { throw new Error('Blocked'); }, setItem: () => { throw new Error('Must not attempt a write'); } };
    assert.equal(saveGarden(garden, !loadGarden().error), false);
  } finally { if (previousStorage === undefined) delete globalThis.localStorage; else globalThis.localStorage = previousStorage; }
  const bookshelf = await readFile('src/bookshelf.ts', 'utf8');
  assert(bookshelf.includes("path: 'timeless-seeds.html'"));
  const source = await readFile('public/assets/timeless-seeds/source.pdf');
  const audit = JSON.parse(await readFile('review/timeless-seeds/source-audit.json', 'utf8'));
  assert.equal(createHash('sha256').update(source).digest('hex'), audit.sha256, 'The source PDF must stay unchanged.');
  console.log('PASS: 111 original entries and separate explanations; all 117 notes reachable; original list, quote and typo preservation; explanation-first reader; full-text search; six paths; local state, safe recovery and export; unchanged PDF.');
} finally {
  await rm(directory, { recursive: true, force: true });
}
