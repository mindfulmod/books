import { useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { ArrowRight, CaretDown, Check, MagnifyingGlass, X } from '@phosphor-icons/react';
import { seeds, type Seed } from './content';
import { SeedThumbnail } from './Artwork';
import { getPath, type PathId } from './paths';
import { seedUrl } from './navigation';
import { scrollToReadingPart } from './BookPassage';
import { matchesSeed, readingMinutes } from './discovery';
import type { Garden } from './state';

type Section = { id: string; title: string; detail: string };
export default function ReadingContents({ seed, path, garden, sections }: { seed: Seed; path?: PathId; garden: Garden; sections: Section[] }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);
  const [view, setView] = useState<'seed' | 'path' | 'book'>(path ? 'path' : 'seed');
  const [query, setQuery] = useState('');
  const journey = getPath(path);
  const index = journey?.route.indexOf(seed.id) ?? -1;
  const close = () => dialog.current?.close();
  const shown = view === 'path' && journey ? journey.route.map(id => seeds[id - 1]) : seeds.filter(s => matchesSeed(s, query));
  return <>
    <button ref={trigger} className="reader-book-contents" aria-label={`Seed ${seed.id} · Reading contents`} aria-haspopup="dialog" aria-controls="seed-contents" aria-expanded={open} onClick={() => { dialog.current?.showModal(); setOpen(true); }}><span className="reader-book-position">Seed {seed.id}</span><span className="reader-book-menu-label">{journey ? `${index + 1} of ${journey.route.length} · Path` : 'Contents'}<CaretDown size={11} aria-hidden="true"/></span></button>
    {createPortal(<dialog ref={dialog} id="seed-contents" className="reader-contents reading-drawer" aria-labelledby="seed-contents-title" onClose={() => { setOpen(false); trigger.current?.focus({ preventScroll: true }); }} onClick={event => { if (event.target === dialog.current) close(); }}>
      <div className="reading-drawer-header"><div><span className="seed-eyebrow">Find your place</span><h2 id="seed-contents-title">Your open book</h2></div><button className="seed-icon-button" aria-label="Close reading contents" onClick={close}><X size={22}/></button></div>
      <div className="contents-views" role="group" aria-label="Contents view">{([{ id: 'seed', title: 'This seed' }, ...(journey ? [{ id: 'path', title: 'This path' }] : []), { id: 'book', title: 'Whole book' }] as { id: typeof view; title: string }[]).map(item => <button key={item.id} aria-pressed={view === item.id} onClick={() => setView(item.id)}>{item.title}</button>)}</div>
      <div className="reading-drawer-body">
        {view === 'seed' ? <><p className="contents-context">Seed {seed.id} · {seed.title}</p><div className="contents-sections">{sections.map((section, i) => <button key={section.id} onClick={() => { close(); requestAnimationFrame(() => scrollToReadingPart(section.id)); }}><span>{String(i + 1).padStart(2, '0')}</span><span>{section.title}<small>{section.detail}</small></span><ArrowRight size={18}/></button>)}</div></> : <>
          {view === 'path' && journey ? <div className="contents-path-intro"><h3>{journey.title}</h3><p>{journey.description}</p><small>{index + 1} of {journey.route.length} on this path · Seeds follow the theme, not book order.</small></div> : <label className="seed-search contents-search"><MagnifyingGlass size={18}/><input aria-label="Find a seed in the whole book" placeholder="Seed number, title, or word" type="search" value={query} onChange={event => setQuery(event.target.value)}/>{query && <button aria-label="Clear contents search" className="seed-icon-button" onClick={() => setQuery('')}><X size={17}/></button>}</label>}
          <ol className="contents-readings" aria-label={view === 'path' ? 'Readings on this path' : 'Readings in book order'}>{shown.map((s, i) => <li key={s.id}><a href={seedUrl(s.id, view === 'path' ? path : undefined)} aria-current={s.id === seed.id ? 'page' : undefined} onClick={close}><SeedThumbnail seedId={s.id}/><span><small>{view === 'path' ? `${i + 1}. ` : ''}Seed {s.id} · {readingMinutes(s)} min{garden.read.includes(s.id) && <span className="contents-read"><Check size={12}/> Read</span>}</small><strong>{s.title}</strong>{view === 'path' && <span className="contents-step">{journey?.steps[i]}</span>}</span>{s.id === seed.id ? <span className="contents-here">Here</span> : <ArrowRight size={16}/>}</a></li>)}</ol>
          {!shown.length && <p role="status">No matching seeds. Try a seed number or a shorter word.</p>}
          {view === 'path' && <a className="seed-text-link contents-other" href="#explore?paths=1" onClick={close}>Choose another path <ArrowRight size={16}/></a>}
        </>}
      </div>
    </dialog>, document.getElementById('root')!)}
  </>;
}
