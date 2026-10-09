import {build} from 'esbuild';
import {execFileSync} from 'node:child_process';
import {readFileSync,writeFileSync} from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {createHash} from 'node:crypto';
const root=fileURLToPath(new URL('../',import.meta.url));
const reference='2fbbb49';
const ref=execFileSync('git',['rev-parse',reference],{cwd:root,encoding:'utf8'}).trim();
const tracked=new Set(execFileSync('git',['ls-tree','-r','--name-only',ref,'src'],{cwd:root,encoding:'utf8'}).trim().split('\n'));
const numbers=Array.from({length:40},(_,i)=>String(i+1).padStart(2,'0'));
const entry=numbers.map(n=>`import {book${n}} from './src/book${n}';`).join('\n')+`\nexport const books=[${numbers.map(n=>'book'+n).join(',')}];`;
async function corpus(historical){
 const result=await build({stdin:{contents:entry,resolveDir:root,loader:'ts'},bundle:true,platform:'node',format:'esm',write:false,define:{'import.meta.env.BASE_URL':'"/books/"'},plugins:historical?[{name:'saved-source',setup(api){api.onLoad({filter:/\.[jt]sx?$/},args=>{const relative=path.relative(root,args.path);if(!tracked.has(relative))return;return{contents:execFileSync('git',['show',`${ref}:${relative}`],{cwd:root,encoding:'utf8',maxBuffer:20*1024*1024}),loader:relative.endsWith('tsx')?'tsx':'ts'};});}}]:[]});
 return (await import(`data:text/javascript;base64,${Buffer.from(result.outputFiles[0].text).toString('base64')}`)).books;
}
const before=await corpus(true),after=await corpus(false),changes=[];
function compare(a,b,where){
 if(Array.isArray(a)){if(!Array.isArray(b)||a.length!==b.length)changes.push({path:where,beforeLength:a.length,afterLength:b?.length});for(let i=0;i<a.length;i++)compare(a[i],b?.[i],`${where}[${i}]`);return;}
 if(a&&typeof a==='object'){for(const key of Object.keys(a))compare(a[key],b?.[key],`${where}.${key}`);return;}
 if(a!==b)changes.push({path:where,before:a,after:b});
}
compare(before,after,'books');
const lesson=chapter=>({id:chapter.id,shortTitle:chapter.shortTitle,formalTitle:chapter.formalTitle,overview:chapter.overview,reflection:chapter.reflection,relatedNodes:chapter.relatedNodes,deep:{...chapter.deep,moves:chapter.deep.moves.map(({id,...move})=>move),visualAlongside:undefined}});
const hash=value=>createHash('sha256').update(JSON.stringify(value)).digest('hex');
const perBook=before.map((book,i)=>({book:book.id,title:book.title,sections:book.chapters.length,authoredTextUnchanged:hash(book.chapters.map(lesson))===hash(after[i].chapters.map(lesson)),sourceReferencesUnchanged:hash(book.sources)===hash(after[i].sources)}));
const unexpected=changes.filter(change=>!(/\.journeys\[\d+\]\.image(?:Alt)?$/.test(change.path)||change.path==='books[0].chapters[1].visualModel.kind'||change.path==='books[0].chapters[1].visualModel.caption'));
const report={comparison:ref,books:after.length,sections:after.reduce((n,b)=>n+b.chapters.length,0),argumentMoves:after.reduce((n,b)=>n+b.chapters.reduce((n,c)=>n+c.deep.moves.length,0),0),closeReadings:after.reduce((n,b)=>n+b.chapters.reduce((n,c)=>n+(c.deep.closeReading?.length??0),0),0),perBook,existingDataChanges:changes,unexpectedChanges:unexpected,pass:perBook.every(b=>b.authoredTextUnchanged&&b.sourceReferencesUnchanged)&&!unexpected.length};

console.log(JSON.stringify({comparison:ref,books:report.books,sections:report.sections,argumentMoves:report.argumentMoves,closeReadings:report.closeReadings,unchangedAuthoredBooks:perBook.filter(b=>b.authoredTextUnchanged).length,unchangedSourceBooks:perBook.filter(b=>b.sourceReferencesUnchanged).length,artworkChanges:changes.length,unexpectedChanges:unexpected,pass:report.pass},null,2));
if(!report.pass)process.exitCode=1;
