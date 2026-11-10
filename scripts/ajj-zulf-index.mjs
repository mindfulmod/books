// Builds the small contents index for Ajj Zulf from the poem files, and checks
// every poem. `node scripts/ajj-zulf-index.mjs --write` regenerates the index;
// without --write it only verifies that the committed index is current.
import assert from 'node:assert/strict';
import { readdirSync, readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';

const root = 'src/ajjzulf/content';
const glossary = JSON.parse(readFileSync(path.join(root, 'glossary.json'), 'utf8'));
const levels = ['explicit', 'sufi', 'thread', 'none'];
const lenses = ['longing', 'nearness', 'prophet', 'self', 'awake', 'passing', 'trust', 'service', 'justice', 'prayer'];

const files = readdirSync(path.join(root, 'poems')).filter(f => f.endsWith('.json')).sort();
const poems = files.map(file => {
  const poem = JSON.parse(readFileSync(path.join(root, 'poems', file), 'utf8'));
  const where = `${file}:`;
  assert.equal(`${poem.id}.json`, file, `${where} id must match file name`);
  for (const key of ['title', 'form', 'takeaway', 'scene', 'why', 'prompt']) assert(typeof poem[key] === 'string' && poem[key].trim(), `${where} missing ${key}`);
  assert(['pa', 'ur'].includes(poem.language), `${where} language`);
  assert(Array.isArray(poem.pages) && poem.pages.length, `${where} pages`);
  assert(levels.includes(poem.reading?.level), `${where} reading level`);
  for (const lens of poem.reading.lenses) assert(lenses.includes(lens), `${where} unknown lens ${lens}`);
  assert(poem.reading.level === 'none' ? !poem.deeper : poem.deeper.trim(), `${where} deeper text must match reading level`);
  const couplets = [...poem.couplets, ...(poem.variant?.extraCouplets ?? [])];
  assert(poem.couplets.length, `${where} no couplets`);
  for (const [i, c] of couplets.entries()) {
    assert(c.original.length === c.translation.length && c.original.length === c.transliteration.length, `${where} couplet ${i + 1} line counts differ`);
    assert(c.story?.trim(), `${where} couplet ${i + 1} story`);
  }
  for (const a of poem.reading.anchors) assert(a >= 1 && a <= poem.couplets.length, `${where} anchor ${a}`);
  for (const id of poem.glossary) assert(glossary[id], `${where} unknown glossary id ${id}`);
  return {
    id: poem.id, pages: poem.pages, form: poem.form, language: poem.language, title: poem.title,
    ...(poem.titleOriginal ? { titleOriginal: poem.titleOriginal } : {}),
    ...(poem.author ? { author: poem.author } : {}),
    takeaway: poem.takeaway, scene: poem.scene, themes: poem.themes,
    level: poem.reading.level, lenses: poem.reading.lenses, couplets: poem.couplets.length,
    firstLine: poem.couplets[0].original[0],
    words: couplets.reduce((n, c) => n + c.story.split(/\s+/).length, 0) + (poem.deeper ? poem.deeper.split(/\s+/).length : 0),
  };
});
assert.equal(new Set(poems.map(p => p.id)).size, poems.length);
const index = JSON.stringify(poems, null, 1) + '\n';
const target = path.join(root, 'index.json');
if (process.argv.includes('--write')) writeFileSync(target, index);
else assert.equal(readFileSync(target, 'utf8'), index, 'Ajj Zulf index is stale: run node scripts/ajj-zulf-index.mjs --write');
console.log(`Verified ${poems.length} Ajj Zulf poems, ${Object.keys(glossary).length} glossary terms, and the contents index.`);
