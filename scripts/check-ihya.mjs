import assert from 'node:assert/strict';
import { existsSync, readFileSync, statSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { build } from 'esbuild';

const root = fileURLToPath(new URL('..', import.meta.url));
const numbers = Array.from({ length: 40 }, (_, i) => String(i + 1).padStart(2, '0'));
const imports = numbers.map(n => `import {book${n}} from './src/book${n}';`).join('\n');
const entry = `${imports}
import React from 'react';
import {renderToStaticMarkup} from 'react-dom/server';
import {DeepReadingSections,ReadingThesis} from './src/reading/DeepReadingSections';
import {VisualReading} from './src/reading/VisualReading';
import {getDeepExperience,reviewedExplorations} from './src/reading/deepExperiences';
import {ReadingDepthSelector} from './src/reading/ReadingDepthSelector';
import {readReaderLocation,readerSearch} from './src/reading/readerLocation';
import {resolveSavedReading,savedReadingGroups} from './src/reading/bookmarkState';
import {readBook,loadAllBooks} from './src/reading/bookLoader';
export const books=[${numbers.map(n => `book${n}`).join(',')}];
export {getDeepExperience,reviewedExplorations,readReaderLocation,readerSearch,resolveSavedReading,savedReadingGroups,readBook,loadAllBooks};
export const renderSection=(book,chapter)=>renderToStaticMarkup(<><ReadingThesis reading={chapter.deep}/><DeepReadingSections reading={chapter.deep} sources={book.sources} exploration={<VisualReading model={chapter.visualModel}/>}/></>);
export const renderText=text=>renderToStaticMarkup(<span>{text}</span>).slice(6,-7);
export const renderDepth=depth=>renderToStaticMarkup(<ReadingDepthSelector value={depth} onChange={()=>{}}/>);
`;
try {
  const output = await build({ stdin: { contents: entry, resolveDir: root, loader: 'tsx' }, bundle: true, loader: { '.css': 'empty' }, jsx: 'automatic', platform: 'node', format: 'esm', write: false, define: { 'import.meta.env.BASE_URL': '"/books/"', 'process.env.NODE_ENV': '"production"' }, external: ['node:*'], banner: { js: `import {createRequire as makeRequire} from 'node:module'; const require=makeRequire(${JSON.stringify(path.join(root, 'package.json'))});` } });
  const api = await import(`data:text/javascript;base64,${Buffer.from(output.outputFiles[0].text).toString('base64')}`);
  const { books, readReaderLocation, readerSearch, resolveSavedReading, savedReadingGroups } = api;
  const navigation = books.map(({id,title,defaultJourneyId,chapters,journeys}) => ({
    id, title, defaultJourneyId,
    chapters: chapters.map(({id,shortTitle,formalTitle}) => ({id,shortTitle,formalTitle})),
    journeys: journeys.map(({id,nodes}) => ({id,nodes:nodes.map(({id,chapterId}) => ({id,chapterId}))})),
  }));
  assert.deepEqual(JSON.parse(readFileSync(path.join(root, 'src/reading/book-navigation.json'), 'utf8')), navigation, 'Book navigation is stale. Run npm run sync:catalog.');
  let pending;
  try { api.readBook(1); } catch (value) { pending = value; }
  assert(pending instanceof Promise, 'A new book should load on demand');
  await pending;
  assert.equal(api.readBook(1).id, 1);
  assert.equal((await api.loadAllBooks()).length, 40);
  for (const [key, title] of Object.entries(api.reviewedExplorations)) {
    const [bookId, sectionId] = key.split(':').map(Number);
    const book = books.find(book => book.id === bookId);
    assert.equal(book.chapters.find(chapter => chapter.id === sectionId)?.shortTitle, title, `Study attached to the wrong passage: ${key}`);
    assert(api.getDeepExperience(book, sectionId), `Reviewed study is unreachable: ${key}`);
    const changed = { ...book, chapters: book.chapters.map(chapter => ({ ...chapter, shortTitle: 'A different passage' })) };
    assert.equal(api.getDeepExperience(changed, sectionId), undefined, 'A changed passage must not inherit an unrelated study');
  }
  let sections = 0, journeys = 0, links = 0;
  const assets = new Set();
  const checkAsset = url => {
    assert(url.startsWith('/books/'), `Asset must honor production base: ${url}`);
    const file = path.join(root, 'public', url.slice('/books/'.length));
    assert(existsSync(file) && statSync(file).size > 0, `Missing asset: ${url}`);
    assets.add(url);
  };
  assert.deepEqual(books.map(book => book.id), Array.from({ length: 40 }, (_, i) => i + 1));
  for (const book of books) {
    const ids = new Set(book.chapters.map(chapter => chapter.id));
    assert.equal(ids.size, book.chapters.length, `Duplicate sections in book ${book.id}`);
    const groups = book.taxonomy?.groups ?? book.process?.stages;
    if (groups) for (const id of ids) assert(groups.some(group => group.chapterIds.includes(id)), `Section ${book.id}:${id} is missing from contents`);
    for (const journey of book.journeys) {
      journeys++;
      assert(journey.nodes.length > 0, `Empty journey: ${book.id}:${journey.id}`);
      assert.equal(new Set(journey.nodes.map(node => node.id)).size, journey.nodes.length, `Duplicate journey nodes: ${book.id}:${journey.id}`);
      checkAsset(journey.image);
      checkAsset(journey.image.replace('.jpg', '-thumb.jpg').replace('-1200.webp', '-320.webp'));
      for (const node of journey.nodes) {
        assert(ids.has(node.chapterId), `Broken journey section: ${book.id}:${node.id}`);
        const position = { bookId: book.id, journeyId: journey.id, nodeId: node.id, readingMode: 'journey', depth: 'deep' };
        assert.deepEqual(readReaderLocation(books, readerSearch(position, node.chapterId)), position);
        assert.equal(resolveSavedReading(books, `${book.id}:${journey.id}:${node.id}`)?.chapter.id, node.chapterId);
        links++;
      }
    }
    for (const chapter of book.chapters) {
      sections++;
      assert(chapter.deep?.moves.length && chapter.visualModel?.items.length, `Incomplete reading ${book.id}:${chapter.id}`);
      const html = api.renderSection(book, chapter);
      // Preserve every shared reading field, not only the argument paragraphs.
      const reading = chapter.deep;
      const expectedText = [reading.thesis, reading.context,
        ...reading.moves.flatMap(move => [move.title, move.body]),
        ...(reading.closeReading ?? []).flatMap(item => [item.title, item.body]),
        ...Object.values(reading.distinction), reading.misreading, reading.observation,
        ...(reading.selfAudit ?? []), reading.sourceAnchor,
        ...book.sources.flatMap(source => [source.label, source.note]),
        chapter.visualModel.title, chapter.visualModel.caption,
        ...chapter.visualModel.items.flatMap(item => [item.label, item.body]),
      ];
      for (const text of expectedText) assert(html.includes(api.renderText(text)), `Lost reading text in ${book.id}:${chapter.id}: ${text.slice(0, 80)}`);
      const renderedIds = [...html.matchAll(/\sid="([^"]+)"/g)].map(match => match[1]);
      assert.equal(new Set(renderedIds).size, renderedIds.length, `Duplicate reading anchors in ${book.id}:${chapter.id}`);
      if (chapter.deep.visualAlongside) {
        assert(chapter.deep.moves.some(move => move.id === chapter.deep.visualAlongside), `Visual placement must name an authored passage in ${book.id}:${chapter.id}`);
        assert.equal((html.match(/id="visual-reading-map"/g) ?? []).length, 1, 'An editorial spread must render its diagram exactly once');
        for (const item of chapter.visualModel.items) {
          assert(item.passageId && renderedIds.includes(item.passageId), `Missing passage destination for ${item.label}`);
        }
      }
      for (const depth of ['glance', 'deep', 'sources']) {
        const parsed = readReaderLocation(books, `?book=${book.id}&section=${chapter.id}&depth=${depth}`);
        assert(parsed && parsed.depth === depth);
        const roundtrip = readReaderLocation(books, readerSearch(parsed, chapter.id));
        assert.deepEqual(roundtrip, parsed);
        links++;
      }
      const key = `${book.id}:section:${chapter.id}`;
      assert.equal(resolveSavedReading(books, key)?.chapter.id, chapter.id);
      assert.equal(savedReadingGroups(books, [key, key]).length, 1);
    }
    for (const theme of ['day', 'evening']) for (const width of [320, 640, 1200, 1600]) checkAsset(`/books/assets/ihya-garden/books/book-${String(book.id).padStart(2, '0')}-${theme}-${width}.webp`);
  }
  for (const invalid of ['', '?book=99&section=1', '?book=1&section=999', '?book=1&journey=bad&node=bad']) assert.equal(readReaderLocation(books, invalid), null);
  assert.equal(resolveSavedReading(books, '99:section:1'), null);
  assert.equal(resolveSavedReading(books, '1:section:999'), null);
  for (const depth of ['glance', 'deep', 'sources']) assert.equal((api.renderDepth(depth).match(/aria-pressed="true"/g) ?? []).length, 1);
  const art = JSON.parse(readFileSync(path.join(root, 'src/reading/book-art.json'), 'utf8'));
  assert.equal(Object.keys(art).length, 40);
  console.log(JSON.stringify({ books: books.length, sections, journeys, validatedReadingLinks: links, verifiedAssets: assets.size, fullArgumentRendering: 'passed', closerReadingsDistinctionsReflectionsSourcesAndDiagrams: 'passed', savedReadingResolution: 'passed', depthChoices: 'passed', onDemandBookLoading: 'passed' }, null, 2));
} catch (error) {
  console.error(error.message);
  process.exitCode = 1;
}
