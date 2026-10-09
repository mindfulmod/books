import { useState } from 'react';
import { ArrowRight, DownloadSimple, Notebook, PencilSimple, Trash, ArrowCounterClockwise } from '@phosphor-icons/react';
import { ReaderDialog } from './ReaderDialog';
import type { BookNavigation } from './bookNavigation';
import { exportNotebook, resolveSection, type ReadingNote } from './readingWorkspace';

export function ReadingNotebook({ books, currentKey, prompts, notes, storageError, initialView = 'write', onChange, onOpenReading, onClose }: {
  books: BookNavigation[]; currentKey: string; prompts: string[]; notes: Record<string, ReadingNote>; storageError: boolean; initialView?: 'write'|'all';
  onChange: (key: string, note: ReadingNote | null) => void; onOpenReading: (bookId: number, chapterId: number) => void; onClose: () => void;
}) {
  const [view, setView] = useState<'write'|'all'>(initialView);
  const [selectedKey, setSelectedKey] = useState(currentKey);
  const [draftPrompt, setDraftPrompt] = useState(notes[currentKey]?.prompt ?? '');
  const [removed, setRemoved] = useState<{key:string;note:ReadingNote}|null>(null);
  const selected = resolveSection(books, selectedKey)!;
  const note = notes[selectedKey];
  const prompt = note?.prompt ?? draftPrompt;
  const edit = (key: string) => { setSelectedKey(key); setDraftPrompt(notes[key]?.prompt ?? ''); setView('write'); };
  const save = (body: string, nextPrompt = prompt) => {
    setRemoved(null);
    onChange(selectedKey, { body, prompt: nextPrompt, updatedAt: new Date().toISOString() });
  };
  const entries = Object.entries(notes).sort((a,b)=>b[1].updatedAt.localeCompare(a[1].updatedAt));
  const download = () => {
    const url = URL.createObjectURL(new Blob([exportNotebook(notes, books)], {type:'text/markdown;charset=utf-8'}));
    const link = document.createElement('a'); link.href=url; link.download='my-ihya-notebook.md'; document.body.appendChild(link); link.click(); link.remove();
    setTimeout(()=>URL.revokeObjectURL(url),1000);
  };
  return <ReaderDialog title="Your notebook" eyebrow="Read, reflect, return" className="reading-notebook-dialog" onClose={onClose}>
    <div className="notebook-toolbar"><div role="group" aria-label="Notebook views"><button aria-pressed={view==='write'} onClick={()=>setView('write')}><PencilSimple size={17}/> Write</button><button aria-pressed={view==='all'} onClick={()=>setView('all')}><Notebook size={17}/> All notes · {entries.length}</button></div><button onClick={download} disabled={!entries.length}><DownloadSimple size={17}/> Export</button></div>
    <div className="reader-dialog-body">
      <p className={`notebook-storage${storageError?' is-warning':''}`} role={storageError?'alert':undefined}>{storageError?'Browser storage is unavailable. Your notes are kept for this session; export them before leaving.':'Notes save automatically in this browser. Export a copy to keep or move them.'}</p>
      {removed && <div className="notebook-undo" role="status">Note removed.<button onClick={()=>{onChange(removed.key,removed.note);setRemoved(null);}}><ArrowCounterClockwise size={16}/> Undo</button></div>}
      {view==='write' ? <>
        <div className="notebook-reading-context"><span>Book {selected.book.id} · {selected.book.title}</span><h3>{selected.chapter.shortTitle}</h3><p>{selected.chapter.formalTitle}</p></div>
        {selectedKey===currentKey && prompts.length>0 && <label className="notebook-prompt-label">A question to begin with<select value={prompt} onChange={event=>{setDraftPrompt(event.target.value); if(note) save(note.body,event.target.value);}}><option value="">A reflection of my own</option>{[...new Set([...prompts,...(prompt&&!prompts.includes(prompt)?[prompt]:[])])].map(question=><option key={question} value={question}>{question}</option>)}</select></label>}
        {selectedKey!==currentKey && prompt && <blockquote className="notebook-prompt">{prompt}</blockquote>}
        <label className="notebook-entry-label" htmlFor="notebook-entry">Your reflection</label>
        <textarea id="notebook-entry" value={note?.body??''} maxLength={12000} placeholder="What stayed with you? What might you notice or practise?" onChange={event=>save(event.target.value)} />
        <div className="notebook-entry-footer"><span>{note?`${note.body.length.toLocaleString()} / 12,000 characters`:'A space for your own words.'}</span><button disabled={!note} onClick={()=>{if(note){setRemoved({key:selectedKey,note});onChange(selectedKey,null);}}}><Trash size={16}/> Remove note</button></div>
        {selectedKey!==currentKey && <button className="notebook-open-reading" onClick={()=>onOpenReading(selected.book.id,selected.chapter.id)}>Open this reading <ArrowRight size={17}/></button>}
      </> : entries.length ? <ul className="notebook-list">{entries.map(([key,entry])=>{const item=resolveSection(books,key);return item&&<li key={key}><button onClick={()=>edit(key)}><small>Book {item.book.id} · {item.book.title}</small><strong>{item.chapter.shortTitle}</strong><p>{entry.body}</p><span>Edit reflection <ArrowRight size={15}/></span></button></li>;})}</ul> : <div className="reader-empty-state"><Notebook size={40} weight="duotone"/><h3>A place to keep what stays with you.</h3><p>Write alongside any section. Your reflections will gather here.</p><button onClick={()=>edit(currentKey)}>Write your first note</button></div>}
    </div>
  </ReaderDialog>;
}
