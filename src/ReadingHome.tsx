import { useState, type ReactNode } from 'react';
import { ArrowDown, ArrowRight, BookmarkSimple, BookOpenText, Books, MagnifyingGlass, Notebook, Question, Stack } from '@phosphor-icons/react';
import { ThemeButton, type ReadingTheme } from './ReadingTheme';
import { ReadingOrientation } from './ReadingOrientation';
import { companionBooks } from './bookshelf';
import { assetUrl } from './assetUrl';
import { ReadingGarden } from './ReadingGarden';
import { ReaderDialog } from './reading/ReaderDialog';
import type { Depth } from './systemTypes';
import type { BookNavigation } from './reading/bookNavigation';
import './reading-home.css';

type Props = {
  theme: ReadingTheme;
  onToggleTheme: () => void;
  books: BookNavigation[];
  resume?: { title: string; section: string };
  onResume: () => void;
  onSelect: (id: number, depth?: Depth) => void;
  onSearch: () => void;
  onSavedReadings: () => void;
  savedCount: number;
  onNotebook: () => void;
  activity?: ReactNode;
  collection: ReactNode;
};

export function ReadingHome({ books, resume, onResume, onSelect, onSearch, onSavedReadings, savedCount, theme, onToggleTheme, onNotebook, activity, collection }: Props) {
  const [showGuide, setShowGuide] = useState(false);
  const closeGuide = () => setShowGuide(false);
  return <div className="reading-home library-home">
    <a className="library-skip" href="#home-main">Skip to the books</a>
    <aside className="library-rail" aria-label="Reading room">
      <a className="library-brand" href="#bookshelf-title"><span className="library-rosette" aria-hidden="true"/><span>The reading <br/>room<small>A bookshelf for inward life</small></span></a>
      <nav className="library-nav" aria-label="Library navigation">
        <a className="library-nav-primary" href="#bookshelf-title"><Books size={20} aria-hidden="true"/> Bookshelf <span>{companionBooks.length + 1}</span></a>
        <a href="#home-library-title"><Stack size={20} aria-hidden="true"/> The Ihya <span>{books.length}</span></a>
        <button onClick={onSavedReadings}><BookmarkSimple size={20} aria-hidden="true"/> Ihya saved readings{savedCount > 0 && <span>{savedCount}</span>}</button>
        <button onClick={onNotebook}><Notebook size={20} aria-hidden="true"/> Ihya notebook</button>
      </nav>
      <div className="library-rail-bottom">
        <div className="library-rail-pattern" aria-hidden="true"/>
        <p>Make room for<br/><em>one good thought.</em></p>
        <button onClick={()=>setShowGuide(true)} aria-haspopup="dialog"><Question size={19} aria-hidden="true"/> Reading guide</button>
        <ThemeButton theme={theme} onToggle={onToggleTheme}/>
      </div>
    </aside>
    <main id="home-main" tabIndex={-1}>
      <header className="library-heading">
        <div><span className="library-eyebrow">Read · Reflect · Return</span><h1>Your library</h1><p>A little reading. A little reflection. A place to return.</p></div>
        <button className="library-search-trigger" onClick={onSearch}><MagnifyingGlass size={20} aria-hidden="true"/><span>Search the Ihya</span></button>
      </header>
      {activity}
      <section className="library-shelf" aria-labelledby="bookshelf-title">
        <div className="library-section-heading"><h2 id="bookshelf-title">On the bookshelf</h2><span>Four companions for inward life</span></div>
        <div className="library-volumes">
          <a className="library-volume library-volume-ihya" href="#home-library-title">
            <div className="library-cover-stage" aria-hidden="true"><div className="library-cover">
              <span className="library-cover-author">Al-Ghazali</span><strong className="library-cover-title">Ihya</strong><span className="library-cover-subtitle">The Revival of the <br/>Religious Sciences</span>
              <div className="library-cover-window"><ReadingGarden theme={theme} sizes="240px"/></div><span className="library-cover-caption">Forty books · Four quarters</span>
            </div></div>
            <div className="library-volume-info"><span className="library-eyebrow">The complete collection</span><h3>The Revival of the <br/>Religious Sciences</h3><p>Al-Ghazali</p><span className="library-volume-description">For sustained study: arguments, visual explanations, and source notes across forty books.</span><span className="library-volume-action">Explore {books.length} books <ArrowDown size={18} aria-hidden="true"/></span></div>
          </a>
          {companionBooks.map(item=><a key={item.id} className={`library-volume library-volume-${item.coverStyle}`} href={`${import.meta.env.BASE_URL}${item.path}`}>
            <div className="library-cover-stage" aria-hidden="true"><div className="library-cover">
              <span className="library-cover-author">{item.author}</span><strong className="library-cover-title">{item.coverTitle}<br/><em>{item.coverSecondLine}</em></strong>
              <span className="library-cover-rosette"/>
              <div className="library-cover-window"><img src={assetUrl(theme === 'dark' && item.coverNightImage ? item.coverNightImage : item.coverImage)} alt="" width={480} height={320} decoding="async"/></div><span className="library-cover-caption">{item.coverCaption}</span>
            </div></div>
            <div className="library-volume-info"><span className="library-eyebrow">{item.category}</span><h3>{item.title}</h3><p>{item.author}</p><span className="library-volume-description">{item.readerDescription}</span><span className="library-volume-action">Open companion <ArrowRight size={18} aria-hidden="true"/></span></div>
          </a>)}
        </div>
      </section>
      {!activity && resume && <button className="library-resume" onClick={onResume}><BookOpenText size={24} aria-hidden="true"/><span><small>Continue reading · {resume.title}</small><strong>{resume.section}</strong></span><ArrowRight size={21} aria-hidden="true"/></button>}
      <section className="library-invitation" aria-labelledby="library-invitation-title">
        <span className="library-rosette" aria-hidden="true"/><div><span className="library-eyebrow">At your own pace</span><h2 id="library-invitation-title">One idea is a good beginning.</h2><p>The Ihya offers a brief introduction, a deeper reading with visuals, and source notes for every section.</p></div>
        <button onClick={()=>setShowGuide(true)} aria-haspopup="dialog">How reading works <ArrowRight size={18} aria-hidden="true"/></button>
      </section>
      <section className="library-collection" aria-labelledby="home-library-title">
        <header className="library-collection-heading"><div><span className="library-eyebrow">Al-Ghazali’s masterwork</span><h2 id="home-library-title">The Ihya collection</h2><p>Forty books. Four quarters. Many ways to begin.</p></div><button onClick={()=>onSelect(1)}>Begin with Knowledge <ArrowRight size={18} aria-hidden="true"/></button></header>
        {collection}
        <div className="library-heart-note"><span>Looking for a place to start?</span><button onClick={()=>onSelect(21)}>Explore The Wonders of the Heart <ArrowRight size={18} aria-hidden="true"/></button></div>
      </section>
      <footer className="library-colophon"><span className="library-rosette" aria-hidden="true"/><p>The Ihya presents editorial explanations, with references for each section. Inner Dimensions pairs an illustrated guide with a complete reading companion. Timeless Seeds preserves the book’s original entries alongside separately labelled explanations. The Beautiful Names offers a reading companion to al-Ghazali’s work, with source notes and reflections.</p><a href="#bookshelf-title">Back to the bookshelf ↑</a></footer>
    </main>
    {showGuide && <ReaderDialog title="How reading works" eyebrow="The reading room" className="library-guide-dialog" onClose={closeGuide}><ReadingOrientation onClose={closeGuide} onStart={depth=>{closeGuide();onSelect(21,depth);}}/></ReaderDialog>}
  </div>;
}
