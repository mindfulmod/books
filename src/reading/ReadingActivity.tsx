import { useEffect, useState } from 'react';
import { ArrowRight } from '@phosphor-icons/react';
import { ReadingGarden } from '../ReadingGarden';
import { assetUrl } from '../assetUrl';
import type { ReadingTheme } from '../ReadingTheme';
import type { BookNavigation } from './bookNavigation';
import { resolveSection, type ReadingWorkspace } from './readingWorkspace';
import { companionReturns, type CompanionReturn } from './companionReturns';

export function ReadingActivity({ books, workspace, theme, onOpen, fallback }: {books:BookNavigation[];workspace:ReadingWorkspace;theme:ReadingTheme;onOpen:(bookId:number,chapterId:number)=>void;fallback?:{title:string;section:string;onOpen:()=>void}}) {
  const [companions,setCompanions]=useState<CompanionReturn[]>(()=>{try{return companionReturns(localStorage);}catch{return [];}});
  useEffect(()=>{const refresh=()=>{try{setCompanions(companionReturns(localStorage));}catch{/* Browsing works without storage. */}};window.addEventListener('storage',refresh);window.addEventListener('focus',refresh);return()=>{window.removeEventListener('storage',refresh);window.removeEventListener('focus',refresh);};},[]);
  const recent=workspace.recent.map(key=>resolveSection(books,key)).filter(item=>item!==null).slice(0,3);
  const latest=recent[0];
  if(!latest&&!fallback&&!companions.length)return null;
  return <section className="library-activity" aria-labelledby="reading-activity-title">
    <header className="library-section-heading"><h2 id="reading-activity-title">Continue reading</h2><span>Your place, kept in this browser</span></header>
    <div className="library-recent-list">
      {latest ? <button onClick={()=>onOpen(latest.book.id,latest.chapter.id)}><ReadingGarden theme={theme} bookId={latest.book.id} thumbnail sizes="72px"/><span><small>Ihya · Book {latest.book.id}</small><strong>{latest.chapter.shortTitle}</strong><span>{latest.book.title}</span></span><ArrowRight size={18} aria-hidden="true"/></button> : fallback && <button onClick={fallback.onOpen}><span><small>Ihya · {fallback.title}</small><strong>{fallback.section}</strong></span><ArrowRight size={18} aria-hidden="true"/></button>}
      {companions.map(item=><a key={item.id} href={`${import.meta.env.BASE_URL}${item.path}`}><img src={assetUrl(item.id==='seeds'&&theme==='dark'?'assets/timeless-seeds/coastal/starlight/coastal-home-480.webp':item.image)} alt="" width={48} height={64}/><span><small>{item.book}</small><strong>{item.title}</strong><span>{item.detail}</span></span><ArrowRight size={18} aria-hidden="true"/></a>)}
    </div>
    {recent.length>1&&<details className="library-recent-history"><summary>Earlier Ihya readings</summary><div>{recent.slice(1).map(({book,chapter})=><button key={`${book.id}:${chapter.id}`} onClick={()=>onOpen(book.id,chapter.id)}><span>Book {book.id} · {chapter.shortTitle}</span><ArrowRight size={17} aria-hidden="true"/></button>)}</div></details>}
  </section>;
}
