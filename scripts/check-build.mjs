import assert from 'node:assert/strict';
import { readdirSync, readFileSync, statSync, existsSync } from 'node:fs';
import path from 'node:path';

const files = readdirSync('dist/assets');
const scripts = files.filter(file => file.endsWith('.js'));
const bookChunks = scripts.filter(file => /^book\d{2}-/.test(file));
assert.equal(bookChunks.length, 40, 'Every book must be split into its own on-demand chunk.');
for (const file of files.filter(file => file.endsWith('.css'))) {
  const stylesheet = readFileSync(path.join('dist/assets', file), 'utf8');
  assert(!/fonts\.(googleapis|gstatic)\.com/.test(stylesheet), `Remote font dependency in ${file}`);
  for (const [, url] of stylesheet.matchAll(/url\(["']?(\/books\/[^)"']+)/g)) assert(existsSync(path.join('dist', url.slice('/books/'.length).split(/[?#]/)[0])), `Missing stylesheet asset ${url}`);
}
for (const file of scripts) assert(statSync(path.join('dist/assets', file)).size < 500_000, `${file} exceeds the 500 kB JavaScript chunk budget.`);
const html = readFileSync('dist/index.html', 'utf8');
for (const route of ['dist/system/index.html', 'dist/404.html']) assert.equal(readFileSync(route, 'utf8'), html, `Reading route does not match this release: ${route}`);
for (const [, url] of html.matchAll(/(?:src|href)="(\/books\/assets\/[^"\s]+)"/g)) assert(existsSync(path.join('dist', url.slice('/books/'.length))), `Missing built asset ${url}`);
const cssUrls = [...html.matchAll(/href="(\/books\/assets\/[^"\s]+\.css)"/g)].map(match => match[1]);
assert(cssUrls.length, 'The entry page must link its reader styles directly.');
const css = cssUrls.map(url => readFileSync(path.join('dist', url.slice('/books/'.length)), 'utf8')).join('\n');
for (const selector of ['reading-theme-toggle', 'reading-depth-choices', 'reading-page-tools', 'saved-readings-dialog', 'mobile-reader-bar', 'garden-backdrop']) assert(css.includes(selector), `Missing initial reader styling: ${selector}`);
console.log(`Verified production entry assets, shared reader styles, ${bookChunks.length} book chunks, and the 500 kB chunk budget.`);

const inner = 'inner-dimensions-of-the-prayer.html';
assert.equal(readFileSync(path.join('dist',inner),'utf8'),readFileSync(path.join('public',inner),'utf8'),'The shipped prayer companion must match the checked source.');
const seedsHtml=readFileSync('dist/timeless-seeds.html','utf8');
for (const [,url] of seedsHtml.matchAll(/(?:src|href)="(\/books\/assets\/[^"\s]+)"/g)) assert(existsSync(path.join('dist',url.slice('/books/'.length))),`Missing Seeds asset ${url}`);
console.log('Verified the Inner Dimensions delivery and Timeless Seeds entry assets.');

const fontRoot = 'dist/assets/reading-fonts';
const fontCss = readFileSync(path.join(fontRoot, 'fonts.css'), 'utf8');
for (const family of ['DM Sans', 'Instrument Serif', 'Noto Naskh Arabic']) assert(fontCss.includes(`font-family: '${family}'`), `Missing local font ${family}`);
for (const [, file] of fontCss.matchAll(/url\(\.\/([^\)]+)\)/g)) {
  const bytes = readFileSync(path.join(fontRoot, file));
  assert.equal(bytes.subarray(0, 4).toString(), 'wOF2', `Invalid font ${file}`);
}
for (const family of ['dmsans', 'instrumentserif', 'notonaskharabic']) assert(readFileSync(path.join(fontRoot, `${family}-OFL.txt`), 'utf8').includes('SIL OPEN FONT LICENSE'), `Missing license for ${family}`);
for (const page of [html, seedsHtml, readFileSync(path.join('dist', inner), 'utf8')]) {
  assert(page.includes('assets/reading-fonts/fonts.css'), 'Every reader must load the local font stylesheet.');
  assert(!/fonts\.(googleapis|gstatic)\.com/.test(page), 'Reader entry still depends on a remote font request.');
}
for (const file of ['rosette.svg', 'eightfold-border.svg', 'provenance.json']) assert(existsSync(path.join('dist/assets/reading-geometry', file)), `Missing reading ornament ${file}`);
console.log('Verified local font files, licenses, all three font entry points, and geometric ornament assets.');
