import {normalizeSearch} from './discovery.js';
import {passagesFor} from './personal-library.js';

export function keptEntries(names,saved={}, {type='all',query=''}={}) {
  const bookmarks=new Set(Array.isArray(saved.bookmarks)?saved.bookmarks:[]);
  const needle=normalizeSearch(query);
  return names.filter(n=>{
    const note=typeof saved.notes?.[n.id]==='string'?saved.notes[n.id]:'';
    const passages=passagesFor(saved,n.id);
    const hasNote=Boolean(note.trim()),marked=bookmarks.has(n.id),hasPassages=passages.length>0;
    const included=type==='names'?marked:type==='reflections'?hasNote:type==='passages'?hasPassages:marked||hasNote||hasPassages;
    const haystack=normalizeSearch([n.name,n.arabic,n.meaning,...(n.aliases||[]),note,...passages.flatMap(p=>[p.title,p.text])].join(' '));
    return included&&(!needle||haystack.includes(needle));
  });
}

export function noteExcerpt(note,limit=150) {
  const characters=Array.from(String(note).replace(/\s+/g,' ').trim());
  return characters.length>limit?characters.slice(0,limit-1).join('')+'…':characters.join('');
}
