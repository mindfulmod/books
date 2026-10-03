import {readingList} from './reading-room-data.js';
import {readingPaths} from './reading-paths.js';
import {readingPreferences} from './reading-preferences.js';
const format='beautiful-names-library';
export const backupLimit=2*1024*1024;
const object=value=>Boolean(value)&&typeof value==='object'&&!Array.isArray(value);
const own=(value,key)=>object(value)&&Object.hasOwn(value,key)?value[key]:undefined;
const validText=(value,limit)=>typeof value==='string'&&value.length<=limit;

export function passageKey(id,section){return `${id}:${section}`;}
export function capturePassage(name,section){
  if(!Number.isInteger(section)||!name.sections[section])return null;
  const {title,paragraphs}=name.sections[section];
  return {nameId:name.id,section,title,text:paragraphs.join('\n\n')};
}
export function passagesFor(saved,id){
  return Object.values(saved.passages||{}).filter(p=>p?.nameId===id&&typeof p.text==='string'&&typeof p.title==='string').sort((a,b)=>a.section-b.section);
}
export function libraryData(value,names){
  const ids=new Set(names.map(n=>n.id)),data=object(value)?value:{};
  const list=key=>[...new Set((Array.isArray(data[key])?data[key]:[]).filter(id=>ids.has(id)))];
  const notes={},questions={},passages={},positions={},pathPlaces={};
  for(const n of names){
    const question=own(data.questions,n.id);if(validText(question,50000)&&question.trim())questions[n.id]=question;
    const note=own(data.notes,n.id);if(validText(note,50000)&&note.trim())notes[n.id]=note;
    for(let section=0;section<n.sections.length;section++){
      const key=passageKey(n.id,section),p=own(data.passages,key);
      if(object(p)&&p.nameId===n.id&&p.section===section&&validText(p.title,300)&&p.title.trim()&&validText(p.text,12000)&&p.text.trim())passages[key]={nameId:n.id,section,title:p.title,text:p.text};
    }
    const pos=own(data.positions,n.id);if(object(pos)&&pos.id===n.id&&['folio','book','window'].includes(pos.design)){
      const clean={id:n.id,design:pos.design,page:Number.isInteger(pos.page)&&pos.page>=0&&pos.page<=3?pos.page:0,scroll:Number.isFinite(pos.scroll)?Math.max(0,Math.min(pos.scroll,100000)):0,section:validText(pos.section,300)?pos.section:'The opening',reflectionOpen:pos.reflectionOpen===true};
      if(object(pos.anchor)&&/^(introduction|heading-[0-2]|paragraph-[0-2]-\d+|reflection)$/.test(pos.anchor.key)&&Number.isFinite(pos.anchor.offset))clean.anchor={key:pos.anchor.key,offset:Math.max(-10000,Math.min(pos.anchor.offset,10000))};
      positions[n.id]=clean;
    }
  }
  for(const p of readingPaths){const id=own(data.pathPlaces,p.id);if(p.ids.includes(id))pathPlaces[p.id]=id;}
  const queue=readingList(data,names);
  return {bookmarks:list('bookmarks'),finished:list('finished'),questions,readingList:queue,reviewNames:list('reviewNames'),recalledNames:list('recalledNames'),notes,passages,positions,pathPlaces,activePath:readingPaths.some(p=>p.id===data.activePath)?data.activePath:null,last:positions[data.last?.id]||null,nextReading:queue[0]||null,reading:readingPreferences(data.reading)};
}
function checkedLibrary(value,names) {
  const data=libraryData(value,names);
  if(value.nextReading!=null&&!names.some(n=>n.id===value.nextReading))throw new Error('The next reading is not recognised. Nothing was changed.');
  // Never silently discard personal writing during export or import.
  for(const key of ['notes','questions','passages','positions','pathPlaces']){
    if(value[key]!==undefined&&!object(value[key]))throw new Error(`The library has an invalid ${key} section. Nothing was changed.`);
    if(Object.keys(value[key]||{}).length!==Object.keys(data[key]).length)throw new Error(`The library contains an unrecognised or invalid ${key} entry. Keep a text copy of your writing. Nothing was changed.`);
  }
  for(const key of ['bookmarks','finished','readingList','reviewNames','recalledNames'])if(value[key]!==undefined&&(!Array.isArray(value[key])||value[key].some(id=>!names.some(n=>n.id===id))))throw new Error('The library contains an unrecognised Name. Nothing was changed.');
  return data;
}
export function createBackup(saved,names,date=new Date()) {
  const copy=JSON.stringify({format,version:1,exportedAt:date.toISOString(),library:checkedLibrary(saved,names)},null,2);
  if(new TextEncoder().encode(copy).length>backupLimit)throw new Error('This library is too large for a restorable backup. Save a text copy to keep all your writing. Nothing was changed.');
  return copy;
}
export function parseBackup(text,names) {
  if(typeof text!=='string'||new TextEncoder().encode(text).length>backupLimit)throw new Error('This file is too large. Choose a Beautiful Names backup under 2 MB.');
  let value;try{value=JSON.parse(text.replace(/^\uFEFF/,''));}catch{throw new Error('This file is not valid JSON. Choose a Beautiful Names backup.');}
  if(!object(value)||value.format!==format||value.version!==1||!object(value.library))throw new Error('This is not a supported Beautiful Names backup.');
  return checkedLibrary(value.library,names);
}
export function mergeLibrary(current,incoming,names,{useReadingPreferences=false}={}) {
  const before=checkedLibrary(current,names),after=checkedLibrary(incoming,names);
  const notes={...before.notes};let conflicts=0;
  for(const [id,note] of Object.entries(after.notes)){
    if(notes[id]&&notes[id]!==note&&!notes[id].includes(`\n\n— Imported reflection —\n\n${note}`)){
      conflicts++;notes[id]+=`\n\n— Imported reflection —\n\n${note}`;
      if(notes[id].length>50000)throw new Error('Combining these reflections would exceed the space available. Save a text copy before importing. Nothing was changed.');
    }else if(!notes[id])notes[id]=note;
  }
  const questions={...before.questions};let questionConflicts=0;
  for(const [id,question] of Object.entries(after.questions)){
    if(questions[id]&&questions[id]!==question&&!questions[id].includes(`\n\n— Imported question —\n\n${question}`)){
      questionConflicts++;questions[id]+=`\n\n— Imported question —\n\n${question}`;
      if(questions[id].length>50000)throw new Error('Combining these questions would exceed the space available. Save a text copy before importing. Nothing was changed.');
    }else if(!questions[id])questions[id]=question;
  }
  const queue=[...new Set([...before.readingList,...after.readingList])];
  const data={...current,questions,readingList:queue,recalledNames:[...after.recalledNames.filter(id=>!before.recalledNames.includes(id)),...before.recalledNames],reviewNames:[...new Set([...before.reviewNames,...after.reviewNames])],bookmarks:[...new Set([...before.bookmarks,...after.bookmarks])],finished:[...new Set([...before.finished,...after.finished])],notes,passages:{...after.passages,...before.passages},positions:{...after.positions,...before.positions},pathPlaces:{...after.pathPlaces,...before.pathPlaces},activePath:before.activePath||after.activePath,nextReading:queue[0]||null,last:current.last||after.last,reading:useReadingPreferences?after.reading:current.reading||after.reading};
  return {data,conflicts,questionConflicts,addedQuestions:Object.keys(questions).length-Object.keys(before.questions).length,addedNames:data.bookmarks.length-before.bookmarks.length,addedNotes:Object.keys(notes).length-Object.keys(before.notes).length,addedPassages:Object.keys(data.passages).length-Object.keys(before.passages).length,addedFinished:data.finished.length-before.finished.length};
}
