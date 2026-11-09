import { useEffect, useMemo, useRef, useState, type Dispatch, type SetStateAction } from 'react';
import { ArrowLeft, ArrowRight, ArrowUpRight, BookmarkSimple, CaretDown, Check, DownloadSimple, Lamp, MagnifyingGlass, Moon, Sun, X } from '@phosphor-icons/react';
import { assetUrl } from '../assetUrl';
import { book, entries, entryById, forms, glossary, languageLabel, lensOrder, lenses, levels, loadPoem, minutes, pageLabel, scriptLang, startHere, totalCouplets, type Couplet, type Entry, type Lens, type Level, type Poem } from './data';
import { formatNotebook, layers, loadAppearance, loadNotebook, parseRoute, poemsUrl, poemUrl, saveAppearance, saveNotebook, type Appearance, type Layer, type Notebook, type Route } from './state';

const known = new Set(entries.map(e => e.id));
const toggle = (list: string[], id: string) => list.includes(id) ? list.filter(v => v !== id) : [...list, id];
const levelOrder: Level[] = ['explicit', 'sufi', 'thread', 'none'];
const countLevel = (l: Level) => entries.filter(e => e.level === l).length;
const countLens = (l: Lens) => entries.filter(e => e.lenses.includes(l)).length;
const layerLabels: Record<Layer, { label: string; hint: string }> = {
  story: { label: 'Story', hint: 'Each couplet told in plain English' },
  english: { label: 'English', hint: 'A faithful line-by-line translation' },
  original: { label: 'Original', hint: 'The poem as printed, in Shahmukhi script' },
  aloud: { label: 'Read aloud', hint: 'The sounds, written in English letters' },
};

function useRoute(): Route {
  const [route, setRoute] = useState(() => parseRoute(location.hash));
  useEffect(() => {
    const onHash = () => setRoute(parseRoute(location.hash));
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);
  return route;
}

function useAppearance(): [Appearance, 'day' | 'night', () => void] {
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
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', shown === 'night' ? '#191726' : '#f7f0e3');
  }, [shown]);
  const flip = () => { const next = shown === 'night' ? 'day' : 'night'; setChoice(next); saveAppearance(next); };
  return [choice, shown, flip];
}

function Shahmukhi({ text, language, className = '' }: { text: string; language: 'pa' | 'ur'; className?: string }) {
  return <span className={`zulf-script ${className}`} lang={scriptLang(language)} dir="rtl">{text}</span>;
}

function Header({ route, shown, flip, saved }: { route: Route; shown: 'day' | 'night'; flip: () => void; saved: number }) {
  const current = (v: Route['view']) => route.view === v ? 'page' : undefined;
  return <header className="zulf-header">
    <a className="zulf-brand" href="#"><Lamp size={26} weight="light" aria-hidden="true"/><span>Ajj Zulf<small>Sanwari Jani Ae</small></span></a>
    <nav aria-label="Main">
      <a href="#" aria-current={current('home')}>Home</a>
      <a href="#poems" aria-current={current('poems')}>Poems</a>
      <a href="#notebook" aria-current={current('notebook')}><BookmarkSimple size={16} aria-hidden="true"/>Notebook{saved > 0 && <span className="zulf-count">{saved}</span>}</a>
      <a href="#about" aria-current={current('about')}>About</a>
    </nav>
    <button className="zulf-icon-button" onClick={flip} aria-label={shown === 'night' ? 'Switch to day reading' : 'Switch to night reading'}>{shown === 'night' ? <Sun size={20}/> : <Moon size={20}/>}</button>
  </header>;
}

function PoemCard({ entry, notebook }: { entry: Entry; notebook: Notebook }) {
  return <li className={`zulf-card level-${entry.level}`}>
    <a href={poemUrl(entry.id)}>
      <span className="zulf-card-meta"><span>{pageLabel(entry.pages)}</span><span>{forms[entry.form]?.label ?? entry.form}</span>{entry.language === 'ur' && <span>Urdu</span>}{notebook.read.includes(entry.id) && <span className="zulf-read"><Check size={12} aria-hidden="true"/>Read</span>}</span>
      <h3>{entry.title}</h3>
      {entry.titleOriginal && <Shahmukhi text={entry.titleOriginal} language={entry.language} className="zulf-card-original"/>}
      <p>{entry.takeaway}</p>
      <span className="zulf-card-foot"><span className={`zulf-level-dot level-${entry.level}`} aria-hidden="true"/>{levels[entry.level].short}{entry.author && <span className="zulf-card-author">by {entry.author}</span>}{notebook.saved.includes(entry.id) && <BookmarkSimple size={15} weight="fill" aria-label="Saved"/>}</span>
    </a>
  </li>;
}

function Home({ notebook }: { notebook: Notebook }) {
  const last = entryById(notebook.last ?? undefined);
  const spiritual = entries.filter(e => e.level === 'explicit' || e.level === 'sufi').length;
  return <main id="zulf-main" className="zulf-home">
    <section className="zulf-hero">
      <div className="zulf-hero-copy">
        <span className="zulf-eyebrow">Punjabi poems, made easy to read</span>
        <h1 tabIndex={-1} data-route-heading>Today the tresses <em>will be combed</em></h1>
        <p className="zulf-hero-original"><Shahmukhi text={book.titleOriginal} language="pa"/></p>
        <p className="zulf-lead">Ghazals about love, longing and God by Dr. Muhammad Ahmad Tabassum of Gojra. Every poem is retold in plain English, with the original lines one tap away.</p>
        <div className="zulf-actions">
          {last ? <a className="zulf-primary" href={poemUrl(last.id)}>Continue: {last.title}<ArrowRight size={18} aria-hidden="true"/></a>
            : <a className="zulf-primary" href={poemUrl('013-ajj-zulf')}>Read the title poem<ArrowRight size={18} aria-hidden="true"/></a>}
          <a className="zulf-secondary" href="#poems">Browse all {entries.length} poems</a>
        </div>
      </div>
      <div className="zulf-hero-art" aria-hidden="true"><img src={assetUrl('assets/ajj-zulf/lamp.svg')} alt="" width={420} height={420}/></div>
    </section>

    <section className="zulf-section" aria-labelledby="start-title">
      <div className="zulf-section-head"><span className="zulf-eyebrow">Not sure where to begin?</span><h2 id="start-title">Start with these six</h2><p>A short way into the book: the title poem, two of its deepest ghazals, and three short poems: on what lasts, on a mother’s love, and on asking forgiveness.</p></div>
      <ol className="zulf-start">{startHere.map((id, i) => { const e = entryById(id)!; return <li key={id}><a href={poemUrl(id)}><span className="zulf-start-number">{i + 1}</span><span><strong>{e.title}</strong><small>{e.takeaway}</small></span>{notebook.read.includes(id) ? <Check size={18} aria-label="Read"/> : <ArrowRight size={18} aria-hidden="true"/>}</a></li>; })}</ol>
    </section>

    <section className="zulf-section" aria-labelledby="layers-title">
      <div className="zulf-section-head"><span className="zulf-eyebrow">How it works</span><h2 id="layers-title">Four ways to read every poem</h2><p>Start with the story. When a couplet catches you, open the lines underneath.</p></div>
      <ul className="zulf-layers">{layers.map(l => <li key={l}><strong>{layerLabels[l].label}</strong><span>{layerLabels[l].hint}</span></li>)}</ul>
    </section>

    <section className="zulf-section" aria-labelledby="god-title">
      <div className="zulf-section-head"><span className="zulf-eyebrow">A question worth asking</span><h2 id="god-title">Is this book about God?</h2><p>Often, but not always. {spiritual} of the {entries.length} poems are about God, either openly or in the Sufi way, where a love poem can also be a poem about the soul and its Maker. Others are about family, country and friends. Each poem tells you which kind it is, so you can tell what the poet wrote from what a reader might add.</p></div>
      <ul className="zulf-levels">{levelOrder.map(l => <li key={l}><a href={poemsUrl({ level: l })} className={`level-${l}`}><span className={`zulf-level-dot level-${l}`} aria-hidden="true"/><strong>{levels[l].label}</strong><span>{levels[l].description}</span><small>{countLevel(l)} poems</small></a></li>)}</ul>
    </section>

    <section className="zulf-section" aria-labelledby="lens-title">
      <div className="zulf-section-head"><span className="zulf-eyebrow">Ways in</span><h2 id="lens-title">Read by what you’re looking for</h2></div>
      <ul className="zulf-lenses">{lensOrder.map(l => <li key={l}><a href={poemsUrl({ lens: l })}><strong>{lenses[l].label}</strong><span>{lenses[l].description}</span><small>{countLens(l)} poems</small></a></li>)}</ul>
    </section>

    <section className="zulf-price">
      <p>This book was never sold. Where the price should be, it says:</p>
      <blockquote>A prayer for the author’s soul.</blockquote>
      <a href="#about">About the poet and this book<ArrowRight size={16} aria-hidden="true"/></a>
    </section>
  </main>;
}

function Poems({ route, notebook }: { route: Extract<Route, { view: 'poems' }>; notebook: Notebook }) {
  const [query, setQuery] = useState(route.q ?? '');
  const level = levelOrder.includes(route.level as Level) ? route.level as Level : undefined;
  const lens = lensOrder.includes(route.lens as Lens) ? route.lens as Lens : undefined;
  const needle = query.trim().toLocaleLowerCase();
  const shown = entries.filter(e => (!level || e.level === level) && (!lens || e.lenses.includes(lens))
    && (!needle || [e.title, e.takeaway, e.scene, e.titleOriginal ?? '', e.firstLine, String(e.pages[0])].some(t => t.toLocaleLowerCase().includes(needle))));
  return <main id="zulf-main" className="zulf-poems">
    <div className="zulf-section-head">
      <span className="zulf-eyebrow">{entries.length} poems · {totalCouplets} couplets · in the book’s order</span>
      <h1 tabIndex={-1} data-route-heading>{lens ? lenses[lens].label : level ? levels[level].label : 'All the poems'}</h1>
      <p>{lens ? lenses[lens].description : level ? levels[level].description : 'Search for a word, or filter by what you’re looking for.'}</p>
    </div>
    <div className="zulf-tools">
      <label className="zulf-search"><MagnifyingGlass size={19} aria-hidden="true"/><input type="search" value={query} onChange={e => setQuery(e.target.value)} placeholder="Search love, Eid, mother, page 26…" aria-label="Search the poems"/>{query && <button className="zulf-icon-button" onClick={() => setQuery('')} aria-label="Clear search"><X size={15}/></button>}</label>
      <div className="zulf-filters" aria-label="Filter by kind of poem">
        <a href={poemsUrl({ lens })} aria-current={!level ? 'true' : undefined}>All kinds</a>
        {levelOrder.map(l => <a key={l} href={poemsUrl({ level: l, lens })} aria-current={level === l ? 'true' : undefined}><span className={`zulf-level-dot level-${l}`} aria-hidden="true"/>{levels[l].short}</a>)}
      </div>
      <div className="zulf-filters zulf-filters-lens" aria-label="Filter by theme">
        <a href={poemsUrl({ level })} aria-current={!lens ? 'true' : undefined}>Every theme</a>
        {lensOrder.map(l => <a key={l} href={poemsUrl({ level, lens: l })} aria-current={lens === l ? 'true' : undefined}>{lenses[l].label}</a>)}
      </div>
    </div>
    <p className="zulf-result-count" role="status">{shown.length} {shown.length === 1 ? 'poem' : 'poems'}{needle ? ` matching “${query.trim()}”` : ''}</p>
    {shown.length ? <ol className="zulf-grid">{shown.map(e => <PoemCard key={e.id} entry={e} notebook={notebook}/>)}</ol>
      : <div className="zulf-empty"><p>No poems match that. Try a broader word, or clear the filters.</p><a className="zulf-secondary" href="#poems" onClick={() => setQuery('')}>Show every poem</a></div>}
  </main>;
}

function CoupletView({ couplet, number, layer, language, anchor }: { couplet: Couplet; number: number | string; layer: Layer; language: 'pa' | 'ur'; anchor: boolean }) {
  const lang = couplet.language ?? language;
  const original = <div className="zulf-original">{couplet.original.map((line, i) => <Shahmukhi key={i} text={line} language={lang}/>)}</div>;
  const aloud = <div className="zulf-aloud" lang={`${lang}-Latn`}>{couplet.transliteration.map((line, i) => <span key={i}>{line}</span>)}</div>;
  const english = <div className="zulf-english">{couplet.translation.map((line, i) => <span key={i}>{line}</span>)}</div>;
  return <li className={`zulf-couplet${anchor ? ' is-anchor' : ''}`}>
    <span className="zulf-couplet-number" aria-hidden="true">{number}</span>
    {anchor && <span className="zulf-anchor" title="A key line for the deeper meaning"><Lamp size={15} weight="fill" aria-hidden="true"/><span className="zulf-sr">A key line for the deeper meaning.</span></span>}
    {lang !== language && <span className="zulf-lang-tag">{languageLabel(lang)}</span>}
    {layer === 'story' && <>
      <p className="zulf-story">{couplet.story}</p>
      <details className="zulf-lines"><summary>See the lines<CaretDown size={14} aria-hidden="true"/></summary><div className="zulf-lines-body">{english}{original}{aloud}</div></details>
    </>}
    {layer === 'english' && <>{english}<details className="zulf-lines"><summary>Original<CaretDown size={14} aria-hidden="true"/></summary><div className="zulf-lines-body">{original}{aloud}</div></details></>}
    {layer === 'original' && <>{original}<details className="zulf-lines"><summary>Meaning<CaretDown size={14} aria-hidden="true"/></summary><div className="zulf-lines-body">{english}<p className="zulf-story">{couplet.story}</p></div></details></>}
    {layer === 'aloud' && <>{aloud}<details className="zulf-lines"><summary>Meaning<CaretDown size={14} aria-hidden="true"/></summary><div className="zulf-lines-body">{english}{original}</div></details></>}
  </li>;
}

function Reader({ id, notebook, setNotebook, storageError }: { id: string; notebook: Notebook; setNotebook: Dispatch<SetStateAction<Notebook>>; storageError: boolean }) {
  const entry = entryById(id);
  const [poem, setPoem] = useState<Poem | null | undefined>(undefined);
  const [status, setStatus] = useState('');
  useEffect(() => {
    let live = true;
    setPoem(undefined);
    loadPoem(id).then(p => { if (live) setPoem(p); }).catch(() => { if (live) setPoem(null); });
    return () => { live = false; };
  }, [id]);
  useEffect(() => {
    if (!poem) return;
    const frame = requestAnimationFrame(() => document.querySelector<HTMLElement>('[data-route-heading]')?.focus({ preventScroll: true }));
    return () => cancelAnimationFrame(frame);
  }, [poem]);
  if (!entry || poem === null) return <main id="zulf-main" className="zulf-empty"><h1 tabIndex={-1} data-route-heading>We couldn’t find that poem.</h1><p>It may have moved. All {entries.length} poems are in the contents.</p><a className="zulf-primary" href="#poems">Open the contents</a></main>;
  const at = entries.indexOf(entry);
  const prev = entries[at - 1];
  const next = entries[at + 1];
  const layer = notebook.layer;
  const saved = notebook.saved.includes(id);
  const read = notebook.read.includes(id);
  const setLayer = (l: Layer) => setNotebook(n => ({ ...n, layer: l }));
  const save = () => { setNotebook(n => ({ ...n, saved: toggle(n.saved, id) })); setStatus(saved ? 'Removed from your notebook.' : 'Saved to your notebook.'); };
  const finish = () => { setNotebook(n => ({ ...n, read: toggle(n.read, id) })); setStatus(read ? 'Marked as not read yet.' : 'Marked as read.'); };
  const anchors = new Set(poem && poem.reading.level !== 'none' ? poem.reading.anchors : []);
  return <main id="zulf-main" className={`zulf-reader level-${entry.level}`}>
    <nav className="zulf-reader-top" aria-label="Poem navigation"><a href="#poems"><ArrowLeft size={16} aria-hidden="true"/>All poems</a><span>{at + 1} of {entries.length}</span></nav>
    <article className="zulf-sheet">
      <header className="zulf-poem-head">
        <span className="zulf-eyebrow">{pageLabel(entry.pages)} · {forms[entry.form]?.label ?? entry.form} · {languageLabel(entry.language)} · About {minutes(entry)} min</span>
        <h1 tabIndex={-1} data-route-heading>{entry.title}</h1>
        {entry.titleOriginal && <p className="zulf-poem-original-title"><Shahmukhi text={entry.titleOriginal} language={entry.language}/></p>}
        {entry.author && <p className="zulf-guest">A poem by <strong>{entry.author}</strong>, not Dr. Ahmad.</p>}
        <p className="zulf-takeaway">{entry.takeaway}</p>
        <button className="zulf-save" onClick={save} aria-pressed={saved}><BookmarkSimple size={19} weight={saved ? 'fill' : 'regular'} aria-hidden="true"/>{saved ? 'Saved' : 'Save'}</button>
      </header>
      {poem === undefined ? <p className="zulf-loading" role="status">Opening the poem…</p> : <>
        <section className="zulf-scene" aria-label="What’s happening"><h2>What’s happening</h2><p>{poem.scene}</p></section>
        {poem.context && <aside className="zulf-context"><strong>{poem.context.split('. ')[0]}.</strong> {poem.context.split('. ').slice(1).join('. ')}</aside>}
        <section aria-labelledby="poem-title">
          <div className="zulf-poem-bar">
            <h2 id="poem-title">The poem</h2>
            <div className="zulf-layer-switch" role="radiogroup" aria-label="Choose how to read">{layers.map(l => <button key={l} role="radio" aria-checked={layer === l} onClick={() => setLayer(l)} title={layerLabels[l].hint}>{layerLabels[l].label}</button>)}</div>
          </div>
          <p className="zulf-layer-hint">{layerLabels[layer].hint}.{form(entry.form)}</p>
          <ol className="zulf-couplets">{poem.couplets.map((c, i) => <CoupletView key={i} couplet={c} number={i + 1} layer={layer} language={poem.language} anchor={anchors.has(i + 1)}/>)}</ol>
          {poem.variant && <details className="zulf-variant"><summary>{pageLabel(poem.variant.pages)}: printed again in the book<CaretDown size={14} aria-hidden="true"/></summary><p>{poem.variant.summary}</p>{poem.variant.extraCouplets.length > 0 && <ol className="zulf-couplets">{poem.variant.extraCouplets.map((c, i) => <CoupletView key={i} couplet={c} number={`+${i + 1}`} layer={layer} language={poem.language} anchor={false}/>)}</ol>}</details>}
        </section>
        <section className={`zulf-deeper level-${poem.reading.level}`} aria-labelledby="deeper-title">
          <span className="zulf-eyebrow"><span className={`zulf-level-dot level-${poem.reading.level}`} aria-hidden="true"/>{levels[poem.reading.level].label}</span>
          <h2 id="deeper-title">{poem.reading.level === 'none' ? 'Is it about God?' : 'The deeper meaning'}</h2>
          {poem.reading.level === 'none' ? <p>{levels.none.description}</p> : <>
            <p className="zulf-level-note">{levels[poem.reading.level].description}{anchors.size > 0 && ' The key lines are marked with a small lamp.'}</p>
            {poem.deeper.split('\n\n').map((p, i) => <p key={i}>{p}</p>)}
            {poem.reading.lenses.length > 0 && <div className="zulf-lens-chips">{poem.reading.lenses.map(l => <a key={l} href={poemsUrl({ lens: l })}>{lenses[l].label}</a>)}</div>}
          </>}
        </section>
        <section className="zulf-why"><h2>Why it matters</h2><p>{poem.why}</p></section>
        {poem.glossary.length > 0 && <section className="zulf-words" aria-labelledby="words-title"><h2 id="words-title">Words to know</h2><dl>{poem.glossary.filter(g => glossary[g]).map(g => <div key={g}><dt>{glossary[g].term}</dt><dd>{glossary[g].meaning}</dd></div>)}</dl></section>}
        <section className="zulf-reflect" aria-labelledby="reflect-title">
          <h2 id="reflect-title">Think about it</h2>
          <p>{poem.prompt}</p>
          <label htmlFor={`note-${id}`}>Write if you want to. It stays in this browser.</label>
          <textarea id={`note-${id}`} rows={4} value={notebook.notes[id] ?? ''} onChange={e => { const text = e.target.value; setNotebook(n => ({ ...n, notes: { ...n.notes, [id]: text } })); }}/>
          {storageError && <p className="zulf-warning">Saving isn’t available in this browser. Export your notebook before you leave.</p>}
        </section>
        {(poem.notes.length > 0 || poem.editorNote) && <details className="zulf-translator"><summary>Translator’s notes<CaretDown size={14} aria-hidden="true"/></summary><ul>{poem.editorNote && <li>{poem.editorNote}</li>}{poem.notes.map((n, i) => <li key={i}>{n}</li>)}</ul></details>}
        <div className="zulf-finish">
          <button className={read ? 'zulf-secondary' : 'zulf-primary'} onClick={finish}><Check size={17} aria-hidden="true"/>{read ? 'Read · mark as unread' : 'Mark as read'}</button>
          <span className="zulf-sr" role="status">{status}</span>
        </div>
      </>}
      <nav className="zulf-pager" aria-label="Previous and next poems">
        {prev ? <a href={poemUrl(prev.id)}><ArrowLeft size={18} aria-hidden="true"/><span><small>Previous · {pageLabel(prev.pages)}</small>{prev.title}</span></a> : <span/>}
        {next ? <a className="is-next" href={poemUrl(next.id)}><span><small>Next · {pageLabel(next.pages)}</small>{next.title}</span><ArrowRight size={18} aria-hidden="true"/></a> : <a className="is-next" href="#notebook"><span><small>You’ve reached the last page</small>Open your notebook</span><ArrowRight size={18} aria-hidden="true"/></a>}
      </nav>
    </article>
  </main>;
}
const form = (id: string) => forms[id] ? ` ${forms[id].label}: ${forms[id].meaning}` : '';

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
  return <main id="zulf-main" className="zulf-notebook">
    <div className="zulf-section-head"><span className="zulf-eyebrow">Kept in this browser only</span><h1 tabIndex={-1} data-route-heading>My notebook</h1><p>{notebook.read.length} of {entries.length} poems read · {savedEntries.length} saved · {noted.length} with your thoughts</p>
      <div className="zulf-progress" aria-hidden="true"><span style={{ width: `${Math.max(1, notebook.read.length / entries.length * 100)}%` }}/></div></div>
    <section aria-labelledby="saved-title"><h2 id="saved-title">Saved poems</h2>
      {savedEntries.length ? <ol className="zulf-grid">{savedEntries.map(e => <PoemCard key={e.id} entry={e} notebook={notebook}/>)}</ol> : <p className="zulf-empty-line">Use Save on any poem to keep it here.</p>}</section>
    <section aria-labelledby="thoughts-title"><h2 id="thoughts-title">Your thoughts</h2>
      {noted.length ? <ul className="zulf-thoughts">{noted.map(e => <li key={e.id}><a href={poemUrl(e.id)}><strong>{e.title}</strong><ArrowUpRight size={16} aria-hidden="true"/></a><p>{notebook.notes[e.id]}</p></li>)}</ul> : <p className="zulf-empty-line">Each poem ends with a question. What you write there appears here.</p>}</section>
    <section className="zulf-export">
      <p>Clearing your browser data removes this notebook. Export a copy to keep it.</p>
      <div className="zulf-actions"><button className="zulf-secondary" onClick={() => setExported(formatNotebook(notebook, entries))} disabled={!savedEntries.length && !noted.length}>Preview a copy</button><button className="zulf-secondary" onClick={download} disabled={!savedEntries.length && !noted.length}><DownloadSimple size={17} aria-hidden="true"/>Download as text</button>
        {notebook.read.length > 0 && <button className="zulf-text-button" onClick={() => { if (confirm('Clear your reading progress? Saved poems and your thoughts stay.')) setNotebook(n => ({ ...n, read: [] })); }}>Clear reading progress</button>}</div>
      {exported !== null && <textarea readOnly rows={8} value={exported} aria-label="Notebook copy"/>}
    </section>
  </main>;
}

function About() {
  return <main id="zulf-main" className="zulf-about">
    <div className="zulf-section-head"><span className="zulf-eyebrow">The poet, the book, and this companion</span><h1 tabIndex={-1} data-route-heading>About this book</h1></div>
    <div className="zulf-about-grid">
      <div>
        <h2>The poet</h2><p>{book.about}</p>
        <h2>The opening note</h2>
        <blockquote className="zulf-dedication"><Shahmukhi text={book.dedication.original} language="pa"/></blockquote>
        <p>{book.dedication.translation}</p><p className="zulf-small">{book.dedication.by}</p>
        <h2>How this companion reads the poems</h2>
        <p>The book is written in Punjabi in the Shahmukhi script, with a few poems in Urdu. Its vocabulary is old and rich, and it leans on stories that many young readers today haven’t heard. So each poem here comes in layers. <strong>The story</strong> retells each couplet in plain English without changing what the poet meant. <strong>The English</strong> is a faithful line-by-line translation. <strong>The original</strong> is the text as printed, and <strong>read aloud</strong> spells out its sounds.</p>
        <p>The explanations, questions, glossary and “deeper meaning” notes are additions for this app. They are never mixed into the poem itself.</p>
        <h2>Is every poem about God?</h2>
        <p>We asked that question of every poem and only gave an answer the poem itself supports. Some poems name God outright. Many are love poems in the Sufi tradition, where the Beloved can be a person and God at once; for those we show both readings. Some have one line of faith, and some are simply about this world: family, friends, Pakistan, and the corruption the poet saw around him. We say which is which, so you can always tell the poet’s words from a reader’s interpretation.</p>
        <h2>Poems of their time</h2>
        <p>A few poems come from Pakistan’s political history, and two give a father’s traditional wedding advice. They are translated faithfully and marked as poems of their time.</p>
        <h2>Uncertain readings</h2>
        <p>Some words in the printed book are hard to read or have more than one meaning. Where the translation makes a choice, the poem’s translator’s notes say so. Corrections from Punjabi speakers are welcome.</p>
      </div>
      <aside className="zulf-about-book">
        <img src={assetUrl('assets/ajj-zulf/lamp.svg')} alt="" width={220} height={220}/>
        <Shahmukhi text={book.titleOriginal} language="pa" className="zulf-about-title"/>
        <strong>{book.titleEnglish}</strong>
        <span>{book.author}</span>
        <dl>
          <div><dt>Arranged by</dt><dd>M.A. Azad Khokhar</dd></div>
          <div><dt>Published</dt><dd>{book.published}, {book.printRun} copies</dd></div>
          <div><dt>From</dt><dd>Gojra, Punjab, Pakistan</dd></div>
          <div><dt>Price</dt><dd>A prayer for the author’s soul</dd></div>
          <div><dt>In this companion</dt><dd>All {book.pages} pages · {entries.length} poems</dd></div>
        </dl>
        <p className="zulf-small">Shared with permission.</p>
      </aside>
    </div>
  </main>;
}

export default function App() {
  const route = useRoute();
  const [, shown, flip] = useAppearance();
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
  const view = useMemo(() => route.view === 'poem' ? <Reader key={route.id} id={route.id} notebook={notebook} setNotebook={setNotebook} storageError={storageError}/>
    : route.view === 'poems' ? <Poems key={`${route.level}-${route.lens}`} route={route} notebook={notebook}/>
    : route.view === 'notebook' ? <NotebookView notebook={notebook} setNotebook={setNotebook}/>
    : route.view === 'about' ? <About/>
    : <Home notebook={notebook}/>, [route, notebook, storageError]);
  return <div className="zulf-app">
    <a className="zulf-skip" href="#zulf-main" onClick={e => { e.preventDefault(); document.getElementById('zulf-main')?.setAttribute('tabindex', '-1'); document.getElementById('zulf-main')?.focus(); }}>Skip to content</a>
    <Header route={route} shown={shown} flip={flip} saved={notebook.saved.length}/>
    {view}
    <footer className="zulf-footer">
      <p><Lamp size={16} aria-hidden="true"/> All poems from <em>Ajj Zulf Sanwari Jani Ae</em> by Dr. Muhammad Ahmad Tabassum (2016).</p>
      <nav aria-label="More"><a href="#poems">All poems</a><a href="#about">About</a><a href={`${import.meta.env.BASE_URL}${import.meta.env.DEV ? 'system' : ''}`}>The MindfulMod bookshelf <ArrowUpRight size={14} aria-hidden="true"/></a></nav>
    </footer>
  </div>;
}
