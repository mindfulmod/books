import {readingPaths} from './reading-paths.js';
import {pairFor} from './name-pairs.js';

export function readingMinutes(name) {
  const text=[name.introduction,...name.sections.flatMap(s=>s.paragraphs),name.practice,name.reflection].join(' ');
  return Math.max(1,Math.ceil(text.trim().split(/\s+/).length/180));
}

// A deliberate next step, chosen from the reader's path and the book's connections.
export function nextSuggestion(names,saved={},fromId=saved.last?.id) {
  const from=names.find(n=>n.id===fromId),finished=new Set(saved.finished||[]);
  const find=id=>names.find(n=>n.id===id&&n.id!==fromId);
  const unread=id=>!finished.has(id)&&find(id);
  const path=readingPaths.find(p=>p.id===saved.activePath&&p.ids.includes(fromId));
  if(path){
    const remaining=[...path.ids.slice(path.ids.indexOf(fromId)+1),...path.ids.slice(0,path.ids.indexOf(fromId))];
    const name=remaining.map(unread).find(Boolean);
    if(name)return {name,kind:'path',reason:`Continue your ${path.title} path.`};
  }
  const queued=[saved.nextReading,...(saved.readingList||[])].map(find).find(Boolean);
  if(queued)return {name:queued,kind:'chosen',reason:'You chose this Name for your next visit.'};
  const pair=from&&pairFor(from.id),paired=pair?.ids.map(unread).find(Boolean);
  if(paired)return {name:paired,kind:'paired',reason:`Read alongside ${from.name} to understand their connected meanings.`};
  const related=from?.related?.map(unread).find(Boolean);
  if(related)return {name:related,kind:'related',reason:`A connected Name to explore after ${from.name}.`};
  const index=names.findIndex(n=>n.id===fromId);
  const name=[...names.slice(index+1),...names.slice(0,index+1)].find(n=>n.id!==fromId&&!finished.has(n.id));
  if(name)return {name,kind:'book',reason:from?'Continue discovering the Names in book order.':'Begin by knowing the One these Names describe.'};
  const revisit=(saved.bookmarks||[]).map(find).find(Boolean)||names.find(n=>n.id!==fromId);
  return revisit?{name:revisit,kind:'revisit',reason:'Return to a familiar Name and notice what you understand more deeply.'}:null;
}

export function revisitSuggestion(names,saved={}) {
  const others=names.filter(n=>n.id!==saved.last?.id);
  const note=others.find(n=>typeof saved.notes?.[n.id]==='string'&&saved.notes[n.id].trim());
  if(note)return {name:note,kind:'reflection',reason:'Return to your words in the light of what you are learning.'};
  const passage=others.find(n=>Object.values(saved.passages||{}).some(p=>p?.nameId===n.id));
  if(passage)return {name:passage,kind:'passage',reason:'A passage you kept is here to read again.'};
  return null;
}

export function toggleFinished(saved,id) {
  const finished=new Set(saved.finished||[]),wasFinished=finished.has(id);
  if(wasFinished)finished.delete(id);else finished.add(id);
  const list=[...new Set([saved.nextReading,...(saved.readingList||[])].filter(Boolean))].filter(value=>wasFinished||value!==id);
  return {...saved,finished:[...finished],readingList:list,nextReading:list[0]||null};
}
