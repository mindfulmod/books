import assert from 'node:assert/strict';
import {readFile,stat,readdir} from 'node:fs/promises';
import {resolve,dirname,join} from 'node:path';
import {names} from '../src/names/content.js';
import {chapterArt,endingArt} from '../src/names/chapter-art.js';

const root=resolve('dist'),base='/books/';
const read=path=>readFile(path,'utf8');
const entry=join(root,'beautiful-names/index.html'),html=await read(entry);
assert.match(html,/<html lang="en">/);
assert.match(html,/name="description"/);
assert.match(html,/rel="canonical"/);
assert.match(html,/<noscript>/);
assert.doesNotMatch(html,/study-bar|palette-switch|review\/beautiful-names/);
const visited=new Set();
async function asset(url,from=entry){
  if(/^(?:https?:|data:|blob:|#)/.test(url))return;
  const path=url.startsWith(base)?join(root,url.slice(base.length)):resolve(dirname(from),url.split(/[?#]/)[0]);
  assert.ok(path.startsWith(root+'/'),`asset escapes build: ${url}`);
  assert.ok((await stat(path)).isFile(),`missing asset ${url}`);
  return path;
}
for(const match of html.matchAll(/(?:href|src)="([^"]+)"/g)){
  if(match[1]==='./'||match[1]==='../')continue;
  const path=await asset(match[1]);if(path&&/\.(js|css)$/.test(path))visited.add(path);
}
// Check the boot module's imported app and the bundled CSS URLs.
for(const path of visited){
  const source=await read(path);
  for(const m of source.matchAll(/(?:from\s*|import\()?["'](\.\.?\/[^"']+\.(?:js|css))["']/g)){
    const found=await asset(m[1],path);if(found)visited.add(found);
  }
  for(const m of source.matchAll(/url\(["']?([^)'"\s]+)["']?\)/g))await asset(m[1],path);
}
const artwork=new Set([...Object.values(chapterArt),...Object.values(endingArt)].map(a=>a.file));
for(const file of ['garden.webp','courtyard-v1.webp','olive-edge-v1.webp','cover-day.webp','cover-night.webp'])artwork.add(file);
let artworkBytes=0;
for(const file of artwork){const s=await stat(join(root,'assets/beautiful-names/art',file));assert.ok(s.size<750000,`${file}: artwork budget exceeded`);artworkBytes+=s.size;}
const fontDir=join(root,'assets/beautiful-names/fonts');
const fonts=await read(join(fontDir,'fonts.css'));
for(const m of fonts.matchAll(/url\(\.\/([^)]*)\)/g))await stat(join(fontDir,m[1]));
for(const family of ['amiri','cormorantgaramond','manrope'])assert.match(await read(join(fontDir,`${family}-OFL.txt`)),/OPEN FONT LICENSE/i);
const chunks=await readdir(join(root,'assets'));
const appFile=chunks.find(n=>/^app-.*\.js$/.test(n));assert.ok(appFile,'missing Beautiful Names app bundle');
assert.ok((await stat(join(root,'assets',appFile))).size<400000,'reader JavaScript budget exceeded');
const app=await read(join(root,'assets',appFile));
assert.doesNotMatch(app,/review\/beautiful-names|art-directions\/|courtyard-v1-prompt/);
assert.match(app,/Independent scholarly review/);
assert.match(app,/original companion|original reading companion/);
const shelf=await read('src/bookshelf.ts');assert.match(shelf,/path: 'beautiful-names\/'/);
assert.equal(names.length,99);
console.log(`Beautiful Names release verified: ${names.length} readings, ${artwork.size} artwork files (${(artworkBytes/1048576).toFixed(1)} MB), bundled modules, local fonts and licences, GitHub Pages paths, source disclosure, and bookshelf entry.`);
