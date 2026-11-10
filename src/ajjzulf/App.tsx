import { useEffect, useMemo, useRef, useState, type Dispatch, type SetStateAction } from 'react';
import { ArrowRight, ArrowUpRight, BookmarkSimple, Check, DownloadSimple, Lamp, MagnifyingGlass, Moon, Sun, X } from '@phosphor-icons/react';
import { book, entries, entryById, forms, lensOrder, lenses, levels, pageLabel, startHere, totalCouplets, type Entry, type Lens, type Level } from './data';
import { formatNotebook, layers, loadAppearance, loadNotebook, parseRoute, poemsUrl, poemUrl, saveAppearance, saveNotebook, type Appearance, type Notebook, type Route } from './state';
import Reader, { layerLabels } from './Reader';
import Scene, { sceneFor } from './Scene';

const known = new Set(entries.map(e => e.id));
const levelOrder: Level[] = ['explicit', 'sufi', 'thread', 'none'];
const countLevel = (l: Level) => entries.filter(e => e.level === l).length;
const countLens = (l: Lens) => entries.filter(e => e.lenses.includes(l)).length;
// The book's own shape, used to give the long contents list some landmarks.
const parts = [
  { title: 'Before the poems', note: 'A friend’s poem for the daughter who gathered this book.', from: 1, to: 8 },
  { title: 'The ghazals', note: 'Love, longing and God, couplet by couplet.', from: 9, to: 65 },
  { title: 'Friends, teachers and guides', note: 'Tributes and farewells for the people he loved.', from: 66, to: 80 },
  { title: 'Family', note: 'Blessings for weddings, journeys and a school, and grief for those he lost.', from: 81, to: 87 },
  { title: 'Country, conscience and last verses', note: 'Pakistan, its troubles, and the poems that close the book.', from: 88, to: 109 },
];

function useRoute(): Route {
  const [route, setRoute] = useState(() => parseRoute(location.hash));
  useEffect(() => {
    const onHash = () => setRoute(parseRoute(location.hash));
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);
  return route;
}

function useAppearance(): ['day' | 'night', () => void] {
  const [choice, setChoice] = useState<Appearance>(loadAppearance);
  const [device, setDevice] = useState(() => matchMedia('(prefers-color-scheme: dark)').matches);
  useEffect(() => {
    const media = matchMedia('(prefers-color-scheme: dark)');
    const onChange = () => setDevice(media.matches);
    media.addEventListener('change', onChange);
    return () => media.removeEventListener('change', onChange);
  }, []);
  const shown = choice === 'device' ? (device ? 'night' : 'day') : choice;
  useEffect(() => {
    document.documentElement.dataset.zulfTheme = shown;
    document.documentElement.style.colorScheme = shown === 'night' ? 'dark' : 'light';
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', shown === 'night' ? '#17152b' : '#f4e7d4');
  }, [shown]);
  const flip = () => { const next = shown === 'night' ? 'day' : 'night'; setChoice(next); saveAppearance(next); };
  return [shown, flip];
}

function Header({ route, shown, flip, saved }: { route: Route; shown: 'day' | 'night'; flip: () => void; saved: number }) {
  const current = (v: Route['view']) => route.view === v ? 'page' : undefined;
  return <header className="zulf-header">
    <a className="zulf-brand" href="#" aria-label="Ajj Zulf home"><span className="zulf-brand-mark"><Lamp size={22} weight="light" aria-hidden="true"/></span><span>Ajj Zulf<small>Sanwari Jani Ae</small></span></a>
    <nav className="zulf-nav" aria-label="Main">
      <a href="#" aria-current={current('home')}>Home</a>
      <a href="#poems" aria-current={current('poems')}>Poems</a>
      <a href="#notebook" aria-current={current('notebook')}>Notebook{saved > 0 && <span className="zulf-count">{saved}</span>}</a>
      <a href="#about" aria-current={current('about')}>About</a>
    </nav>
    <button className="zulf-glass-pill is-icon" onClick={flip} aria-label={shown === 'night' ? 'Switch to day reading' : 'Switch to night reading'}>{shown === 'night' ? <Sun size={19}/> : <Moon size={19}/>}</button>
  </header>;
}

function PoemRow({ entry, notebook }: { entry: Entry; notebook: Notebook }) {
  return <li className="zulf-row">
    <a href={poemUrl(entry.id)}>
      <span className="zulf-row-art"><Scene scene={sceneFor(entry)} label={false} lite/></span>
      <span className="zulf-row-copy">
        <span className="zulf-row-meta">{pageLabel(entry.pages)} · {forms[entry.form]?.label ?? entry.form}{entry.language === 'ur' ? ' · Urdu' : ''}</span>
        <strong>{entry.title}</strong>
        <span className="zulf-row-takeaway">{entry.takeaway}</span>
        <span className="zulf-row-foot"><span className={`zulf-level-dot level-${entry.level}`} aria-hidden="true"/>{levels[entry.level].short}{entry.author && <em>by {entry.author}</em>}</span>
      </span>
      <span className="zulf-row-state">{notebook.saved.includes(entry.id) && <BookmarkSimple size={16} weight="fill" aria-label="Saved"/>}{notebook.read.includes(entry.id) && <Check size={16} aria-label="Read"/>}</span>
    </a>
  </li>;
}

function Home({ notebook }: { notebook: Notebook }) {
  const last = entryById(notebook.last ?? undefined);
  const spiritual = entries.filter(e => e.level === 'explicit' || e.level === 'sufi').length;
  return <main id="zulf-main" className="zulf-home">
    <section className="zulf-hero">
      <div className="zulf-hero-art" aria-hidden="true"><Scene scene="river" label={false}/></div>
      <div className="zulf-hero-copy">
        <p className="zulf-hero-script" lang="pnb" dir="rtl">{book.titleOriginal}</p>
        <h1 tabIndex={-1} data-route-heading>Today the tresses <em>will be combed</em></h1>
        <p className="zulf-hero-lead">Punjabi poems about love, longing and God by Dr. Muhammad Ahmad Tabassum, retold in plain English, one couplet at a time.</p>
        <div className="zulf-actions">
          {last ? <a className="zulf-primary" href={poemUrl(last.id)}>Continue · {last.title}<ArrowRight size={18} aria-hidden="true"/></a>
            : <a className="zulf-primary" href={poemUrl('013-ajj-zulf')}>Read the title poem<ArrowRight size={18} aria-hidden="true"/></a>}
          <a className="zulf-glass-pill is-large" href="#poems">All {entries.length} poems</a>
        </div>
      </div>
    </section>

    <div className="zulf-page zulf-home-body">
      <section className="zulf-block" aria-labelledby="start-title">
        <p className="zulf-eyebrow">Not sure where to begin?</p>
        <h2 id="start-title">Six poems to start with</h2>
        <ol className="zulf-start">{startHere.map(id => { const e = entryById(id)!; return <li key={id}><a href={poemUrl(id)}>
          <span className="zulf-start-art"><Scene scene={sceneFor(e)} label={false} lite/></span>
          <span className="zulf-start-copy"><small>{pageLabel(e.pages)}{notebook.read.includes(id) && <> · <Check size={12} aria-hidden="true"/> Read</>}</small><strong>{e.title}</strong><span>{e.takeaway}</span></span>
        </a></li>; })}</ol>
      </section>

      <section className="zulf-block zulf-how" aria-labelledby="how-title">
        <div>
          <p className="zulf-eyebrow">How it works</p>
          <h2 id="how-title">Read it your way</h2>
          <p>Every poem opens with a picture and a few words about what’s happening. Then you read it one couplet at a time, in whichever layer suits you. Switch whenever you like.</p>
        </div>
        <ul>{layers.map((l, i) => <li key={l}><span>{i + 1}</span><strong>{layerLabels[l].label}</strong><small>{layerLabels[l].hint}</small></li>)}</ul>
      </section>

      <section className="zulf-block" aria-labelledby="god-title">
        <p className="zulf-eyebrow">A question worth asking</p>
        <h2 id="god-title">Is this book about God?</h2>
        <p className="zulf-block-lead">Often, but not always. {spiritual} of the {entries.length} poems are about God, either openly or in the Sufi way, where a love poem can also be about the soul and its Maker. Every poem tells you which kind it is.</p>
        <ul className="zulf-levels">{levelOrder.map(l => <li key={l}><a href={poemsUrl({ level: l })}><span className={`zulf-level-dot level-${l}`} aria-hidden="true"/><strong>{levels[l].label}</strong><small>{countLevel(l)}</small></a></li>)}</ul>
      </section>

      <section className="zulf-block" aria-labelledby="lens-title">
        <p className="zulf-eyebrow">Ways in</p>
        <h2 id="lens-title">Read by what you’re looking for</h2>
        <ul className="zulf-lenses">{lensOrder.map(l => <li key={l}><a href={poemsUrl({ lens: l })}><strong>{lenses[l].label}</strong><span>{lenses[l].description}</span><small>{countLens(l)} poems</small></a></li>)}</ul>
      </section>

      <section className="zulf-price">
        <div className="zulf-price-art" aria-hidden="true"><Scene scene="lamp" label={false} lite/></div>
        <div><p>This book was never sold. Where the price should be, it says:</p>
          <blockquote>A prayer for the author’s soul.</blockquote>
          <a href="#about">About the poet and this book<ArrowRight size={16} aria-hidden="true"/></a></div>
      </section>
    </div>
  </main>;
}

function Poems({ route, notebook }: { route: Extract<Route, { view: 'poems' }>; notebook: Notebook }) {
  const [query, setQuery] = useState(route.q ?? '');
  const level = levelOrder.includes(route.level as Level) ? route.level as Level : undefined;
  const lens = lensOrder.includes(route.lens as Lens) ? route.lens as Lens : undefined;
  const needle = query.trim().toLocaleLowerCase();
  const filtered = Boolean(level || lens || needle);
  const shown = entries.filter(e => (!level || e.level === level) && (!lens || e.lenses.includes(lens))
    && (!needle || [e.title, e.takeaway, e.scene, e.titleOriginal ?? '', e.firstLine, String(e.pages[0])].some(t => t.toLocaleLowerCase().includes(needle))));
  const setLens = (value: string) => { location.hash = poemsUrl({ level, lens: value || undefined }).slice(1); };
  return <main id="zulf-main" className="zulf-page zulf-poems">
    <header className="zulf-page-head">
      <p className="zulf-eyebrow">{entries.length} poems · {totalCouplets} couplets</p>
      <h1 tabIndex={-1} data-route-heading>{lens ? lenses[lens].label : level ? levels[level].label : 'The poems'}</h1>
      <p>{lens ? lenses[lens].description : level ? levels[level].description : 'In the order the book prints them. Search, or choose what you’re looking for.'}</p>
    </header>
    <div className="zulf-tools">
      <label className="zulf-search"><MagnifyingGlass size={19} aria-hidden="true"/><input type="search" value={query} onChange={e => setQuery(e.target.value)} placeholder="Search love, Eid, mother, page 26…" aria-label="Search the poems"/>{query && <button className="zulf-clear" onClick={() => setQuery('')} aria-label="Clear search"><X size={15}/></button>}</label>
      <label className="zulf-select"><span className="zulf-sr">Theme</span><select value={lens ?? ''} onChange={e => setLens(e.target.value)}><option value="">Every theme</option>{lensOrder.map(l => <option key={l} value={l}>{lenses[l].label} ({countLens(l)})</option>)}</select></label>
    </div>
    <div className="zulf-filters" aria-label="Filter by kind of poem">
      <a href={poemsUrl({ lens })} aria-current={!level ? 'true' : undefined}>All</a>
      {levelOrder.map(l => <a key={l} href={poemsUrl({ level: l, lens })} aria-current={level === l ? 'true' : undefined}><span className={`zulf-level-dot level-${l}`} aria-hidden="true"/>{levels[l].short}</a>)}
    </div>
    <p className="zulf-result-count" role="status">{filtered ? `${shown.length} ${shown.length === 1 ? 'poem' : 'poems'}${needle ? ` matching “${query.trim()}”` : ''}` : ''}</p>
    {!shown.length ? <div className="zulf-empty"><p>No poems match that. Try a broader word, or clear the filters.</p><a className="zulf-glass-pill is-large" href="#poems" onClick={() => setQuery('')}>Show every poem</a></div>
      : filtered ? <ol className="zulf-rows">{shown.map(e => <PoemRow key={e.id} entry={e} notebook={notebook}/>)}</ol>
      : parts.map(part => { const inPart = shown.filter(e => e.pages[0] >= part.from && e.pages[0] <= part.to); return inPart.length > 0 && <section key={part.title} className="zulf-part"><header><h2>{part.title}</h2><p>{part.note} <span>{inPart.length} {inPart.length === 1 ? 'poem' : 'poems'} · pages {part.from}–{part.to}</span></p></header><ol className="zulf-rows">{inPart.map(e => <PoemRow key={e.id} entry={e} notebook={notebook}/>)}</ol></section>; })}
  </main>;
}

function NotebookView({ notebook, setNotebook }: { notebook: Notebook; setNotebook: Dispatch<SetStateAction<Notebook>> }) {
  const [exported, setExported] = useState<string | null>(null);
  const savedEntries = entries.filter(e => notebook.saved.includes(e.id));
  const noted = entries.filter(e => notebook.notes[e.id]?.trim());
  const download = () => {
    const text = exported ?? formatNotebook(notebook, entries);
    const url = URL.createObjectURL(new Blob([text], { type: 'text/plain;charset=utf-8' }));
    const link = document.createElement('a'); link.href = url; link.download = 'my-ajj-zulf-notebook.txt'; document.body.appendChild(link); link.click(); link.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  };
  return <main id="zulf-main" className="zulf-page zulf-notebook">
    <header className="zulf-page-head"><p className="zulf-eyebrow">Kept in this browser only</p><h1 tabIndex={-1} data-route-heading>My notebook</h1>
      <p>{notebook.read.length} of {entries.length} poems finished · {savedEntries.length} saved · {noted.length} with your thoughts</p>
      <div className="zulf-progress" aria-hidden="true"><span style={{ width: `${Math.max(1, notebook.read.length / entries.length * 100)}%` }}/></div></header>
    <section className="zulf-card-section" aria-labelledby="saved-title"><h2 id="saved-title">Saved poems</h2>
      {savedEntries.length ? <ol className="zulf-rows">{savedEntries.map(e => <PoemRow key={e.id} entry={e} notebook={notebook}/>)}</ol> : <p className="zulf-quiet">Use Save at the bottom of any poem to keep it here.</p>}</section>
    <section className="zulf-card-section" aria-labelledby="thoughts-title"><h2 id="thoughts-title">Your thoughts</h2>
      {noted.length ? <ul className="zulf-thoughts">{noted.map(e => <li key={e.id}><a href={poemUrl(e.id)}><strong>{e.title}</strong><ArrowUpRight size={16} aria-hidden="true"/></a><p>{notebook.notes[e.id]}</p></li>)}</ul> : <p className="zulf-quiet">Every poem ends with a question. What you write there appears here.</p>}</section>
    <section className="zulf-card-section zulf-export">
      <p>Clearing your browser data removes this notebook. Download a copy to keep it.</p>
      <div className="zulf-actions"><button className="zulf-glass-pill is-large" onClick={() => setExported(formatNotebook(notebook, entries))} disabled={!savedEntries.length && !noted.length}>Preview a copy</button><button className="zulf-glass-pill is-large" onClick={download} disabled={!savedEntries.length && !noted.length}><DownloadSimple size={17} aria-hidden="true"/>Download as text</button>
        {notebook.read.length > 0 && <button className="zulf-text-button" onClick={() => { if (confirm('Clear your reading progress? Saved poems and your thoughts stay.')) setNotebook(n => ({ ...n, read: [] })); }}>Clear reading progress</button>}</div>
      {exported !== null && <textarea readOnly rows={8} value={exported} aria-label="Notebook copy"/>}
    </section>
  </main>;
}

function About() {
  return <main id="zulf-main" className="zulf-page zulf-about">
    <header className="zulf-page-head"><p className="zulf-eyebrow">The poet, the book, and this companion</p><h1 tabIndex={-1} data-route-heading>About this book</h1></header>
    <div className="zulf-about-grid">
      <div className="zulf-card-section zulf-prose">
        <h2>The poet</h2><p>{book.about}</p>
        <h2>The opening note</h2>
        <blockquote className="zulf-dedication" lang="pnb" dir="rtl">{book.dedication.original}</blockquote>
        <p>{book.dedication.translation}</p><p className="zulf-quiet">{book.dedication.by}</p>
        <h2>How this companion reads the poems</h2>
        <p>The book is written in Punjabi in the Shahmukhi script, with a few poems in Urdu. Its words are old and rich, and it leans on stories many young readers haven’t heard. So each poem comes in layers. <strong>The story</strong> retells each couplet in plain English without changing what the poet meant. <strong>The English</strong> is a faithful line-by-line translation. <strong>The original</strong> is the text as printed, and <strong>read aloud</strong> spells out its sounds.</p>
        <p>The explanations, questions, glossary, pictures and “deeper meaning” notes are additions for this app. They are never mixed into the poem itself.</p>
        <h2>Is every poem about God?</h2>
        <p>We asked that of every poem and only gave an answer the poem itself supports. Some name God outright. Many are love poems in the Sufi tradition, where the Beloved can be a person and God at once, and a few read naturally as praise of the Prophet ﷺ. Some have one line of faith, and some are simply about this world. Each poem says which, so you can always tell the poet’s words from a reader’s interpretation.</p>
        <h2>Poems of their time</h2>
        <p>A few poems come from Pakistan’s political history, and two give a father’s traditional wedding advice. They are translated faithfully and marked as poems of their time.</p>
        <h2>Pictures and uncertain readings</h2>
        <p>The pictures were drawn for this companion as quiet settings for reading. They don’t show anyone in the poems. Some words in the printed book are hard to read or have more than one meaning; the translator’s notes on each poem say where. Corrections from Punjabi speakers are welcome.</p>
      </div>
      <aside className="zulf-about-book">
        <div className="zulf-about-art"><Scene scene="lamp" label={false}/></div>
        <p className="zulf-about-title" lang="pnb" dir="rtl">{book.titleOriginal}</p>
        <strong>{book.titleEnglish}</strong>
        <span>{book.author}</span>
        <dl>
          <div><dt>Arranged by</dt><dd>M.A. Azad Khokhar</dd></div>
          <div><dt>Published</dt><dd>{book.published}, {book.printRun} copies</dd></div>
          <div><dt>From</dt><dd>Gojra, Punjab, Pakistan</dd></div>
          <div><dt>Price</dt><dd>A prayer for the author’s soul</dd></div>
          <div><dt>In this companion</dt><dd>All {book.pages} pages · {entries.length} poems</dd></div>
        </dl>
        <p className="zulf-quiet">Shared with permission.</p>
      </aside>
    </div>
  </main>;
}

export default function App() {
  const route = useRoute();
  const [shown, flip] = useAppearance();
  const [initial] = useState(() => loadNotebook(known));
  const [notebook, setNotebook] = useState<Notebook>(initial.notebook);
  const [storageError, setStorageError] = useState(initial.error);
  const firstRender = useRef(true);
  useEffect(() => { if (firstRender.current) { firstRender.current = false; return; } setStorageError(!saveNotebook(notebook, !initial.error)); }, [notebook, initial.error]);
  const poemId = route.view === 'poem' ? route.id : null;
  useEffect(() => {
    const entry = entryById(poemId ?? undefined);
    document.title = `${entry ? `${entry.title} · ` : ''}Ajj Zulf Sanwari Jani Ae · MindfulMod`;
    if (entry) setNotebook(n => n.last === entry.id ? n : { ...n, last: entry.id });
    window.scrollTo({ top: 0, behavior: 'instant' });
    if (route.view === 'poem') return;
    const frame = requestAnimationFrame(() => document.querySelector<HTMLElement>('[data-route-heading]')?.focus({ preventScroll: true }));
    return () => cancelAnimationFrame(frame);
  }, [route, poemId]);
  const reading = route.view === 'poem';
  const view = useMemo(() => route.view === 'poem' ? <Reader key={route.id} id={route.id} notebook={notebook} setNotebook={setNotebook} storageError={storageError} shown={shown} flip={flip}/>
    : route.view === 'poems' ? <Poems key={`${route.level}-${route.lens}`} route={route} notebook={notebook}/>
    : route.view === 'notebook' ? <NotebookView notebook={notebook} setNotebook={setNotebook}/>
    : route.view === 'about' ? <About/>
    : <Home notebook={notebook}/>, [route, notebook, storageError, shown]);
  return <div className={`zulf-app${reading ? ' is-reading' : ''} view-${route.view}`}>
    <div className="zulf-atmosphere" aria-hidden="true"/>
    <a className="zulf-skip" href="#zulf-main" onClick={e => { e.preventDefault(); document.getElementById('zulf-main')?.setAttribute('tabindex', '-1'); document.getElementById('zulf-main')?.focus(); }}>Skip to content</a>
    {!reading && <Header route={route} shown={shown} flip={flip} saved={notebook.saved.length}/>}
    {view}
    {!reading && <footer className="zulf-footer">
      <p><Lamp size={16} aria-hidden="true"/> All poems from <em>Ajj Zulf Sanwari Jani Ae</em> by Dr. Muhammad Ahmad Tabassum (2016).</p>
      <nav aria-label="More"><a href="#poems">All poems</a><a href="#about">About</a><a href={`${import.meta.env.BASE_URL}${import.meta.env.DEV ? 'system' : ''}`}>The MindfulMod bookshelf <ArrowUpRight size={14} aria-hidden="true"/></a></nav>
    </footer>}
  </div>;
}
