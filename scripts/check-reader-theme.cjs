// Check the token contract without coupling to a particular historical revision.
const fs = require('fs');
const postcss = require('postcss');
const files = ['src/system.css', 'src/city-deep.css', 'src/reading/editorial.css', 'src/reading/experiences/studies.css'];
const definitions = new Set();
postcss.parse(fs.readFileSync('src/reading/paint-tokens.css', 'utf8')).walkDecls(d => definitions.add(d.prop));
let references = 0;
for (const file of files) {
  const css = fs.readFileSync(file, 'utf8');
  for (const [, token] of css.matchAll(/var\((--reader-[a-z\d-]+),/g)) {
    references++;
    if (!definitions.has(token)) throw new Error(`${file}: missing ${token}`);
  }
}
console.log(`Verified ${references} reader paint references across ${files.length} stylesheets.`);
