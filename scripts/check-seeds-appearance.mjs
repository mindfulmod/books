import assert from 'node:assert/strict';
import { readFile, access, mkdtemp, rm } from 'node:fs/promises';
import { join } from 'node:path';
import { tmpdir } from 'node:os';
import { pathToFileURL } from 'node:url';
import vm from 'node:vm';
import { build } from 'esbuild';

const directory = await mkdtemp(join(tmpdir(), 'seeds-appearance-'));
try {
  await build({ entryPoints: ['src/seeds/appearanceState.ts', 'src/seeds/illustrations.ts'], outdir: directory, bundle: true, platform: 'node', format: 'esm', outExtension: { '.js': '.mjs' } });
  const state = await import(pathToFileURL(join(directory, 'appearanceState.mjs')));
  const { seedIllustrations } = await import(pathToFileURL(join(directory, 'illustrations.mjs')));
  const html = await readFile('timeless-seeds.html', 'utf8');
  const bootstrap = html.match(/<script>([\s\S]*?)<\/script>/)[1];
  for (const stored of [null, '', 'device', 'day', 'starlight', 'invalid-old-value']) {
    for (const dark of [false, true]) {
      for (const blocked of [false, true]) {
        const document = { documentElement: { dataset: {}, style: {} }, querySelector: () => meta };
        const meta = {};
        vm.runInNewContext(bootstrap, {
          document,
          localStorage: { getItem: () => { if (blocked) throw new Error('Storage disabled'); return stored; } },
          matchMedia: () => ({ matches: dark }),
        });
        const expected = state.resolveAppearance(state.parsePreference(blocked ? null : stored), dark);
        assert.equal(document.documentElement.dataset.seedAppearance, expected, `First paint: ${stored}, dark=${dark}, blocked=${blocked}`);
        assert.equal(document.documentElement.style.colorScheme, expected === 'starlight' ? 'dark' : 'light');
        assert.equal(meta.content, expected === 'starlight' ? '#252d45' : '#fafbf6');
      }
    }
  }
  assert.equal(state.resolveAppearance('day', true), 'day');
  assert.equal(state.resolveAppearance('starlight', false), 'starlight');
  assert.notEqual(state.APPEARANCE_KEY, 'mindfulmod-timeless-seeds-v1', 'Appearance must never overwrite journals.');
  assert.notEqual(state.PICTURES_KEY, state.APPEARANCE_KEY);
  assert.notEqual(state.PICTURES_KEY, 'mindfulmod-timeless-seeds-v1');
  const previousStorage = globalThis.localStorage;
  try {
    for (const value of [null, 'shown', 'hidden', 'invalid']) {
      globalThis.localStorage = { getItem: key => { assert.equal(key, state.PICTURES_KEY); return value; } };
      assert.equal(state.loadPictures(), value !== 'hidden');
    }
    globalThis.localStorage = { getItem: () => { throw new Error('Blocked'); } };
    assert.equal(state.loadPictures(), true);
  } finally { if (previousStorage === undefined) delete globalThis.localStorage; else globalThis.localStorage = previousStorage; }
  const illustratedAssets = new Set();
  assert.deepEqual(Object.keys(seedIllustrations).map(Number).sort((a,b) => a-b), Array.from({length:111}, (_,i) => i+1), 'Every seed must have reviewed artwork.');
  for (const [seed, frames] of Object.entries(seedIllustrations)) {
    assert(Number(seed) >= 1 && Number(seed) <= 111);
    assert(frames.length > 0);
    for (const frame of frames) {
      assert(frame.alt.length > 20 && frame.caption.length > 20, `Missing accessible context for seed ${seed}`);
      for (const prefix of [frame.day, frame.starlight]) {
        for (const width of [480,960,1440]) {
          const path = state.illustrationPath(prefix,width);
          await access(join('public',path));
          illustratedAssets.add(path);
        }
      }
    }
  }
  for (const frame of seedIllustrations[46]) assert.equal(frame.day,frame.starlight,'Morning and evening carry source meaning and must not turn into midnight.');
  assert.equal(seedIllustrations[46].length,2,'Keep both parts of the birds’ daily journey.');
  for (const seed of [6,7,67,70,73,95]) {
    for (const frame of seedIllustrations[seed]) assert.equal(frame.day,frame.starlight,`Preserve source-critical lighting for seed ${seed}.`);
  }
  assert.deepEqual(seedIllustrations[67].map(frame => frame.label), ['Sun · Its own time','Moon · Its own time']);
  assert.deepEqual(seedIllustrations[95].map(frame => frame.label), ['Morning','Late afternoon','Night']);
  const { queue } = JSON.parse(await readFile('artwork/timeless-seeds/seed-illustrations/production-queue.json','utf8'));
  assert.equal(new Set(queue.map(row => row.seed)).size,105,'The remaining production queue must cover 105 distinct seeds.');
  for (const row of queue) {
    const frames = seedIllustrations[row.seed];
    const keys = row.policy === 'time-sequence' ? row.sequenceKeys : row.policy === 'paired' ? [row.dayKey,`${row.dayKey}-starlight`] : [row.dayKey];
    for (const key of keys) {
      const record = JSON.parse(await readFile(`artwork/timeless-seeds/seed-illustrations/records/${key}.json`,'utf8'));
      assert.equal(record.review,'approved',`${key} must be visually reviewed before publication.`);
      assert(record.alt.length > 20 && record.prompt.length > 20,`${key} needs accessible context and generation provenance.`);
    }
    if (row.policy === 'paired') {
      assert.notEqual(frames[0].day,frames[0].starlight,`Seed ${row.seed} needs its matching night painting.`);
      assert(frames[0].nightAlt.length > 20);
    }
  }
  for (const scene of ['island-sky','coastal-home','prayer-breeze','garden-path','flower-garden','plant-and-bee']) {
    for (const width of [480,960,1440]) {
      for (const appearance of ['day','starlight']) await access(join('public', state.scenePath(scene,width,appearance)));
    }
  }
  const refinement = JSON.parse(await readFile('artwork/timeless-seeds/seed-illustrations/refinements/seed-077-v2-record.json', 'utf8'));
  assert.equal(refinement.review, 'approved');
  assert.equal(refinement.images.length, 2);
  for (const image of refinement.images) {
    assert(image.prompt.length > 100);
    await access(join('artwork/timeless-seeds/seed-illustrations/refinements', image.master));
  }
  assert(seedIllustrations[77][0].day.endsWith('seed-077-v2'));
  const dayBook = await readFile('public/assets/timeless-seeds/open-book-edge.svg','utf8');
  const nightBook = await readFile('public/assets/timeless-seeds/open-book-edge-starlight.svg','utf8');
  const paths = svg => [...svg.matchAll(/ d="([^"]+)"/g)].map(match=>match[1]);
  assert.deepEqual(paths(nightBook),paths(dayBook),'The night palette must preserve the compact book shape.');
  console.log(`PASS: 24 first-paint combinations, explicit overrides, picture preferences/storage fallback, separate journal key, all 111 seeds illustrated, 105 new seeds with approved provenance, 36 shared scene assets, ${illustratedAssets.size} illustration assets, source-critical lighting and time sequences, identical book-bar geometry.`);
} finally { await rm(directory,{recursive:true,force:true}); }
