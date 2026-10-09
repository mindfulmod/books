// Check the token contract without coupling to a particular historical revision.
const fs = require('fs');
const postcss = require('postcss');
const path = require('path');
const vm = require('vm');
const bootstrap = fs.readFileSync('index.html', 'utf8').match(/<script id="reading-theme-bootstrap">([\s\S]*?)<\/script>/)[1];
for (const saved of [null, 'light', 'dark', 'invalid', 'toString']) for (const deviceDark of [false, true]) for (const blocked of [false, true]) {
  const meta = {};
  const document = { documentElement: { dataset: {}, style: {} }, querySelector: () => meta };
  vm.runInNewContext(bootstrap, { document, localStorage: { getItem: () => { if (blocked) throw new Error('Storage unavailable'); return saved; } }, matchMedia: () => ({ matches: deviceDark }) });
  const expected = !blocked && ['light', 'dark'].includes(saved) ? saved : deviceDark ? 'dark' : 'light';
  if (document.documentElement.dataset.readingTheme !== expected || document.documentElement.style.colorScheme !== expected || meta.content !== (expected === 'dark' ? '#181d1e' : '#e8e4da')) throw new Error('Incorrect first-paint reading theme.');
}
console.log('Verified 40 first-paint theme scenarios, including invalid preferences and blocked storage.');
const cssFiles = dir => fs.readdirSync(dir, {withFileTypes:true}).flatMap(entry => entry.isDirectory() ? cssFiles(path.join(dir, entry.name)) : entry.name.endsWith('.css') ? [path.join(dir, entry.name)] : []);
const files = cssFiles('src');
const definitions = new Set();
for (const file of files) postcss.parse(fs.readFileSync(file, 'utf8')).walkDecls(d => definitions.add(d.prop));
let references = 0;
for (const file of files) {
  const css = fs.readFileSync(file, 'utf8');
  for (const [, token] of css.matchAll(/var\((--(?:reader|publication)-[a-z\d-]+)[,)]/g)) {
    references++;
    if (!definitions.has(token)) throw new Error(`${file}: missing ${token}`);
  }
}
console.log(`Verified ${references} reader and publication token references across ${files.length} stylesheets.`);

// Protect the actual foreground/surface pairings when the shared palette changes.
// This checks opaque semantic colours, not image overlays or the complete rendered UI.
const palettes = {light: {}, dark: {}};
postcss.parse(fs.readFileSync('src/reading/garden.css', 'utf8')).walkRules(rule => {
  const palette = rule.selector === ':root' ? palettes.light : rule.selector === 'html[data-reading-theme=dark]' ? palettes.dark : null;
  if (palette) rule.walkDecls(/^--publication-/, d => { palette[d.prop.slice(14)] = d.value; });
});
const luminance = hex => {
  if (!/^#[0-9a-f]{6}$/i.test(hex)) throw new Error(`Expected an opaque palette colour, received ${hex}`);
  const channels = [1, 3, 5].map(i => parseInt(hex.slice(i, i + 2), 16) / 255).map(v => v <= .04045 ? v / 12.92 : ((v + .055) / 1.055) ** 2.4);
  return channels.reduce((sum, v, i) => sum + v * [.2126, .7152, .0722][i], 0);
};
const pairs = [
  ...['paper', 'panel', 'ground', 'brass-paper'].flatMap(surface => [['ink', surface, 4.5], ['muted', surface, 4.5]]),
  ...['paper', 'panel', 'ground'].flatMap(surface => [['accent', surface, 4.5], ['brass', surface, 4.5]]),
  ['brass', 'brass-paper', 4.5], ['rose', 'rose-paper', 4.5],
  ['on-accent', 'accent', 4.5], ['on-gold', 'gold', 4.5],
  ['control-line', 'paper', 3],
  ['blue', 'blue-paper', 4.5], ['ink', 'blue-paper', 4.5],
  ...['figure-paper', 'figure-panel', 'figure-brass-paper'].flatMap(surface => [['figure-ink', surface, 4.5], ['figure-muted', surface, 4.5], ['figure-accent', surface, 4.5], ['figure-brass', surface, 4.5]]),
  ['figure-on-accent', 'figure-accent', 4.5], ['figure-control-line', 'figure-paper', 3],
];
let lowestTextContrast = Infinity;
for (const [theme, palette] of Object.entries(palettes)) {
  for (const [foreground, background, minimum] of pairs) {
    const values = [luminance(palette[foreground]), luminance(palette[background])].sort((a, b) => a - b);
    const ratio = (values[1] + .05) / (values[0] + .05);
    if (ratio < minimum) throw new Error(`${theme}: ${foreground} on ${background} is ${ratio.toFixed(2)}:1; expected at least ${minimum}:1`);
    if (minimum === 4.5) lowestTextContrast = Math.min(lowestTextContrast, ratio);
  }
}
console.log(`Verified ${pairs.length * 2} palette contrast pairs; minimum text contrast ${lowestTextContrast.toFixed(2)}:1.`);
