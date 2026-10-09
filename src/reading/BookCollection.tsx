import { useMemo, useState } from 'react';
import { ArrowRight, CheckCircle, MagnifyingGlass, Books } from '@phosphor-icons/react';
import { ReadingGarden } from '../ReadingGarden';
import type { ReadingTheme } from '../ReadingTheme';
import type { BookNavigation } from './bookNavigation';
import { quarters } from '../data';
import { nextBookSection, sectionKey, type ReadingWorkspace } from './readingWorkspace';
import { ReaderDialog } from './ReaderDialog';

export function BookCollection({ books, theme, workspace, currentBookId, onOpen, imageSizes = '(max-width: 600px) 90vw, (max-width: 1100px) 42vw, 330px' }: { books: BookNavigation[]; theme: ReadingTheme; workspace: ReadingWorkspace; currentBookId?: number; onOpen: (bookId: number, chapterId: number) => void; imageSizes?: string }) {
  const [query,setQuery]=useState('');
  const [quarter,setQuarter]=useState(0);
  const [filter,setFilter]=useState<'all'|'started'|'unread'|'complete'>('all');
  const filtered=useMemo(()=>books.filter(book=>{
    const count=book.chapters.filter(chapter=>workspace.completed.includes(sectionKey(book.id,chapter.id))).length;
    const started=count>0||workspace.visited.some(key=>key.startsWith(`${book.id}:`));
    return (!quarter||Math.ceil(book.id/10)===quarter)&&(`${book.id} ${book.title} ${book.chapters.map(c=>`${c.shortTitle} ${c.formalTitle}`).join(' ')}`.toLowerCase().includes(query.trim().toLowerCase()))&&(filter==='all'||filter==='complete'&&count===book.chapters.length||filter==='started'&&started&&count<book.chapters.length||filter==='unread'&&!started);
  }),[books,query,quarter,filter,workspace.completed,workspace.visited]);
  return <div className="book-collection">
    <div className="collection-controls">
      <div className="collection-search"><MagnifyingGlass size={19}/><input type="search" aria-label="Find a book" placeholder="Find a book or section…" value={query} onChange={event=>setQuery(event.target.value)}/></div>
      <div className="collection-filters" role="group" aria-label="Filter by quarter"><button aria-pressed={!quarter} onClick={()=>setQuarter(0)}>All forty<small className="collection-quarter-range" aria-hidden="true">The complete Ihya</small></button>{quarters.map((item,index)=><button key={item.id} aria-pressed={quarter===index+1} onClick={()=>setQuarter(index+1)}>{item.title.replace('The Quarter of ','')}<small className="collection-quarter-range" aria-hidden="true">Books {String(index*10+1).padStart(2,'0')}–{(index+1)*10}</small></button>)}</div>
      <div className="collection-results"><span role="status">{filtered.length} {filtered.length===1?'book':'books'}{quarter?` · ${quarters[quarter-1].title.replace('The Quarter of ','')}`:''}</span><div className="collection-result-actions">{(query||quarter||filter!=='all')?<button className="collection-reset" onClick={()=>{setQuery('');setQuarter(0);setFilter('all');}}>Reset filters</button>:null}<label>Show<select value={filter} onChange={event=>setFilter(event.target.value as typeof filter)}><option value="all">All readings</option><option value="started">In progress</option><option value="unread">Not started</option><option value="complete">Completed</option></select></label></div></div>
    </div>
    {filtered.length?<div className="collection-grid">{filtered.map(book=>{
      const done=book.chapters.filter(chapter=>workspace.completed.includes(sectionKey(book.id,chapter.id))).length;
      const next=nextBookSection(book,workspace),started=done>0||workspace.visited.some(key=>key.startsWith(`${book.id}:`)),complete=done===book.chapters.length;
      return <button key={book.id} className="collection-book" onClick={()=>onOpen(book.id,next.id)} aria-label={`${book.title}, book ${book.id}. ${complete?'Read again':started?'Continue reading':'Begin reading'}`}>
        <div className="collection-book-art"><ReadingGarden theme={theme} bookId={book.id} thumbnail sizes={imageSizes}/><span>Book {String(book.id).padStart(2,'0')}</span>{currentBookId===book.id&&<small>Open now</small>}</div>
        <div className="collection-book-copy"><span>{quarters[Math.floor((book.id-1)/10)].title.replace('The Quarter of ','')}</span><h3>{book.title}</h3><p>{book.chapters.length} sections · {book.journeys.length} guided journeys</p><div className="collection-book-progress"><span style={{width:`${done/book.chapters.length*100}%`}}/></div><div className="collection-book-action"><span>{complete?<><CheckCircle size={15} weight="fill"/> Completed</>:done?`${done} of ${book.chapters.length} completed`:started?'Reading started':'Begin reading'}</span><ArrowRight size={19}/></div></div>
      </button>;
    })}</div>:<div className="reader-empty-state"><Books size={38} weight="duotone"/><h3>No books in this view.</h3><p>Try another title, quarter, or reading status.</p><button onClick={()=>{setQuery('');setQuarter(0);setFilter('all');}}>Show all forty books</button></div>}
  </div>;
}

export function IllustratedLibrary(props: Parameters<typeof BookCollection>[0] & { onClose: () => void }) {
  return <ReaderDialog title="Forty books, four quarters" eyebrow="The illustrated collection" className="collection-dialog" onClose={props.onClose}><div className="reader-dialog-body"><BookCollection {...props}/></div></ReaderDialog>;
}
