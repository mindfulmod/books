import { useRef, useState } from 'react';
import { ReadingOrientation } from './ReadingOrientation';
import { companionBooks } from './bookshelf';
import type { Depth } from './systemTypes';
import { ArrowRight, MagnifyingGlass } from '@phosphor-icons/react';
import { quarters } from './data';
import type { SystemBook } from './systemTypes';
import './reading-home.css';

type Props = {
  books: SystemBook[];
  resume?: { title: string; section: string };
  onResume: () => void;
  onSelect: (id: number, depth?: Depth) => void;
  onSearch: () => void;
};

export function ReadingHome({ books, resume, onResume, onSelect, onSearch }: Props) {
  const [showGuide, setShowGuide] = useState(() => { try { return localStorage.getItem('reading-orientation-v1') !== 'seen'; } catch { return true; } });
  const guideTrigger = useRef<HTMLButtonElement>(null);
  const closeGuide = () => { try { localStorage.setItem('reading-orientation-v1', 'seen'); } catch { /* This session still works without storage. */ } setShowGuide(false); requestAnimationFrame(()=>guideTrigger.current?.focus()); };
  return <div className="reading-home">
    <header className="home-masthead"><span>The reading room <small>A bookshelf for inward life</small></span><button onClick={onSearch}><MagnifyingGlass size={18}/> Search the Ihya</button></header>
    <main id="home-main">
      <section className="home-introduction">
        <span className="home-eyebrow">Your bookshelf</span>
        <h1>A life of practice.<br/>An inward journey.</h1>
        <p>A growing library of reading companions. Explore the Ihya’s forty books, or spend time with a standalone work. Begin with one idea.</p>
        <div className="home-entry-links"><a className="home-browse" href="#bookshelf-title">Browse the bookshelf ↓</a><button ref={guideTrigger} className="home-guide-trigger" aria-expanded={showGuide} onClick={()=>setShowGuide(value=>!value)}>How to read here</button></div>
      </section>
      {showGuide && <ReadingOrientation onClose={closeGuide} onStart={depth=>{closeGuide();onSelect(21,depth);}}/>}
      {resume && <button className="home-resume" onClick={onResume}><span><small>Continue reading</small><strong>{resume.title}</strong><span>{resume.section}</span></span><ArrowRight size={22}/></button>}
      <section className="home-bookshelf" aria-labelledby="bookshelf-title">
        <h2 id="bookshelf-title">On the shelf</h2>
        <div className="shelf-titles">
          <a className="shelf-book" href="#home-library-title"><span className="shelf-cover shelf-cover-ihya" aria-hidden="true"><small>Al-Ghazali</small><strong>Ihya</strong><span>Forty books<br/>Four quarters</span></span><span className="shelf-book-info"><small>Collection · 40 books</small><h3>The Revival of the Religious Sciences</h3><p>Al-Ghazali</p><span>Explore worship, daily life, and the cultivation of the heart.</span><em>Browse the collection →</em></span></a>
          {companionBooks.map(item=><a key={item.id} className="shelf-book" href={`${import.meta.env.BASE_URL}${item.path}`}><span className="shelf-cover shelf-cover-companion" aria-hidden="true"><small>{item.author}</small><strong>{item.coverLabel}</strong><span>Inner dimensions</span></span><span className="shelf-book-info"><small>Standalone companion</small><h3>{item.title}</h3><p>{item.author}</p><span>{item.description}</span><em>Open the book →</em></span></a>)}
        </div>
      </section>
      <section className="home-start" aria-labelledby="start-title">
        <div><span className="home-eyebrow">A place to begin · Book 21</span><h2 id="start-title">The Wonders<br/>of the Heart</h2><p>What do we mean by the heart? Explore the forces that shape what we notice, desire, and do.</p><button className="home-primary" onClick={()=>onSelect(21)}>Explore the heart <ArrowRight size={19}/></button></div>
        <div className="home-start-note"><span>Read at your own depth</span><p>Get the central idea in brief. Go deeper with the argument and interactive readings. Open the sources when you want to trace a passage.</p><button onClick={()=>onSelect(1)}>Prefer to read in order?<strong>Begin with the Book of Knowledge <ArrowRight size={17}/></strong></button></div>
      </section>
      <section className="home-library" aria-labelledby="home-library-title">
        <div className="home-library-heading"><h2 id="home-library-title">The Ihya · forty books</h2><p>Four quarters, from outward practice to inward life.</p></div>
        {quarters.map((quarter,index)=><details key={quarter.id} className="home-quarter"><summary><span className="home-quarter-number">0{index+1}</span><span><strong>{quarter.title.replace('The Quarter of ', '')}</strong><small>Books {index*10+1}–{index*10+10}</small></span><span className="home-quarter-toggle" aria-hidden="true">+</span></summary><p>{quarter.focus}</p><ol start={index*10+1}>{quarter.books.map(entry=>{const book=books.find(item=>item.id===entry.id);return book && <li key={book.id}><button onClick={()=>onSelect(book.id)}><span>{String(book.id).padStart(2,'0')}</span><strong>{book.title}</strong><ArrowRight size={16}/></button></li>;})}</ol></details>)}
      </section>
      <footer className="home-colophon">An interactive reading companion. The English explanations are editorial syntheses, not a translation of the Ihya. Sources and reading notes accompany each book.</footer>
    </main>
  </div>;
}
