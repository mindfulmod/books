import {keptEntries} from './kept-collection.js';
import {passagesFor} from './personal-library.js';

// A portable personal copy: original writing is preserved as plain text.
export function keptExport(names,saved={}) {
  const keptIds=new Set(keptEntries(names,saved).map(n=>n.id));
  const entries=names.filter(n=>keptIds.has(n.id)||typeof saved.questions?.[n.id]==='string'&&saved.questions[n.id].trim());
  if(!entries.length)return '';
  const sections=entries.map(n=>{
    const note=typeof saved.notes?.[n.id]==='string'?saved.notes[n.id]:'';
    return [n.name,n.arabic,n.meaning,
      saved.bookmarks?.includes(n.id)?'Saved name':'',
      ...passagesFor(saved,n.id).map(p=>`Companion passage — ${p.title}\n${p.text}`),
      note.trim()?`My reflection\n${note}`:'',
      saved.questions?.[n.id]?.trim()?`My question\n${saved.questions[n.id]}`:''].filter(Boolean).join('\n\n');
  });
  return ['THE BEAUTIFUL NAMES — KEPT','Saved names, original companion passages, personal reflections, and questions. Companion passages are adaptations, not quotations from a published translation.',...sections].join('\n\n────────────────────\n\n')+'\n';
}
