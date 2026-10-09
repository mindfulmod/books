import { build } from 'esbuild';
import { writeFileSync } from 'node:fs';
const numbers = Array.from({length:40}, (_,i) => String(i + 1).padStart(2, '0'));
const contents = numbers.map(n => `import {book${n}} from './src/book${n}';`).join('\n') + `\nexport default [${numbers.map(n => `book${n}`).join(',')}];`;
try {
  const result = await build({stdin:{contents,resolveDir:process.cwd(),loader:'ts'},bundle:true,platform:'node',format:'esm',write:false,define:{'import.meta.env.BASE_URL':'"/"'}});
  const {default:books} = await import(`data:text/javascript;base64,${Buffer.from(result.outputFiles[0].text).toString('base64')}`);
  const navigation = books.map(({id,title,defaultJourneyId,chapters,journeys}) => ({
    id, title, defaultJourneyId,
    chapters: chapters.map(({id,shortTitle,formalTitle}) => ({id,shortTitle,formalTitle})),
    journeys: journeys.map(({id,nodes}) => ({id, nodes: nodes.map(({id,chapterId}) => ({id,chapterId}))})),
  }));
  writeFileSync('src/reading/book-navigation.json',JSON.stringify(navigation) + '\n');
  console.log(`Updated navigation for ${navigation.length} books.`);
} catch (error) { console.error(error.message); process.exitCode = 1; }
