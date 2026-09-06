import { ArrowRight, MagnifyingGlass } from '@phosphor-icons/react';
import { quarters } from './data';
import type { SystemBook } from './systemTypes';
import './reading-home.css';

type Props = {
  books: SystemBook[];
  resume?: { title: string; section: string };
  onResume: () => void;
  onSelect: (id: number) => void;
  onSearch: () => void;
};

export function ReadingHome({ books, resume, onResume, onSelect, onSearch }: Props) {
  return <div className="reading-home">
    <header className="home-masthead"><span>Ihya <small>by al-Ghazali</small></span><button onClick={onSearch}><MagnifyingGlass size={18}/> Search the books</button></header>
    <main id="home-main">
      <section className="home-introduction">
        <span className="home-eyebrow">The Revival of the Religious Sciences</span>
        <h1>A life of practice.<br/>An inward journey.</h1>
        <p>Explore al-Ghazali’s forty books on worship, daily life, the heart, and the work of becoming. Begin with a question, or read in the original order.</p>
        <a className="home-browse" href="#home-library-title">Browse all forty books ↓</a>
      </section>
      {resume && <button className="home-resume" onClick={onResume}><span><small>Continue reading</small><strong>{resume.title}</strong><span>{resume.section}</span></span><ArrowRight size={22}/></button>}
      <section className="home-start" aria-labelledby="start-title">
        <div><span className="home-eyebrow">A place to begin · Book 21</span><h2 id="start-title">The Wonders<br/>of the Heart</h2><p>What do we mean by the heart? Explore the forces that shape what we notice, desire, and do.</p><button className="home-primary" onClick={()=>onSelect(21)}>Explore the heart <ArrowRight size={19}/></button></div>
        <div className="home-start-note"><span>Read at your own depth</span><p>Get the central idea in brief. Go deeper with the argument and interactive readings. Open the sources when you want to trace a passage.</p><button onClick={()=>onSelect(1)}>Prefer to read in order?<strong>Begin with the Book of Knowledge <ArrowRight size={17}/></strong></button></div>
      </section>
      <section className="home-library" aria-labelledby="home-library-title">
        <div className="home-library-heading"><h2 id="home-library-title">The forty books</h2><p>Four quarters, from outward practice to inward life.</p></div>
        {quarters.map((quarter,index)=><details key={quarter.id} className="home-quarter"><summary><span className="home-quarter-number">0{index+1}</span><span><strong>{quarter.title.replace('The Quarter of ', '')}</strong><small>Books {index*10+1}–{index*10+10}</small></span><span className="home-quarter-toggle" aria-hidden="true">+</span></summary><p>{quarter.focus}</p><ol start={index*10+1}>{quarter.books.map(entry=>{const book=books.find(item=>item.id===entry.id);return book && <li key={book.id}><button onClick={()=>onSelect(book.id)}><span>{String(book.id).padStart(2,'0')}</span><strong>{book.title}</strong><ArrowRight size={16}/></button></li>;})}</ol></details>)}
      </section>
      <footer className="home-colophon">An interactive reading companion. The English explanations are editorial syntheses, not a translation of the Ihya. Sources and reading notes accompany each book.</footer>
    </main>
  </div>;
}
