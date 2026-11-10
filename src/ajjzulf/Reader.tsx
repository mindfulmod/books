import { useEffect, useRef, useState, type Dispatch, type KeyboardEvent, type PointerEvent, type SetStateAction } from 'react';
import { ArrowLeft, ArrowRight, BookmarkSimple, CaretDown, Check, Lamp, ListBullets, Moon, PencilSimple, Sun } from '@phosphor-icons/react';
import { entries, entryById, forms, glossary, languageLabel, lenses, levels, loadPoem, minutes, pageLabel, scriptLang, type Couplet, type Poem } from './data';
import { layers, poemsUrl, poemUrl, type Layer, type Notebook } from './state';
import Scene, { sceneFor } from './Scene';

const toggle = (list: string[], id: string) => list.includes(id) ? list.filter(v => v !== id) : [...list, id];
export const layerLabels: Record<Layer, { label: string; hint: string }> = {
  story: { label: 'Story', hint: 'Each couplet told in plain English' },
  english: { label: 'English', hint: 'A faithful line-by-line translation' },
  original: { label: 'Original', hint: 'The poem as printed, in Shahmukhi script' },
  aloud: { label: 'Read aloud', hint: 'The sounds, written in English letters' },
};
const scrollToId = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'start' });

function Script({ lines, language, className }: { lines: string[]; language: 'pa' | 'ur'; className: string }) {
  return <div className={className} lang={scriptLang(language)} dir="rtl">{lines.map((line, i) => <span key={i}>{line}</span>)}</div>;
}
function Verse({ lines, className }: { lines: string[]; className: string }) {
  return <div className={className}>{lines.map((line, i) => <span key={i}>{line}</span>)}</div>;
}

// One couplet, in the reader's chosen layer, with the others a tap away.
function CoupletBody({ couplet, layer, language }: { couplet: Couplet; layer: Layer; language: 'pa' | 'ur' }) {
  const lang = couplet.language ?? language;
  const original = (cls: string) => <Script lines={couplet.original} language={lang} className={cls}/>;
  const english = (cls: string) => <Verse lines={couplet.translation} className={cls}/>;
  const aloud = (cls: string) => <div className={cls} lang={`${lang}-Latn`}>{couplet.transliteration.map((l, i) => <span key={i}>{l}</span>)}</div>;
  const more = (label: string, body: React.ReactNode) => <details className="zr-more-lines"><summary>{label}<CaretDown size={13} aria-hidden="true"/></summary><div>{body}</div></details>;
  return <div className={`zr-couplet-body layer-${layer}`}>
    {lang !== language && <span className="zr-lang">{languageLabel(lang)}</span>}
    {layer === 'story' && <>{original('zr-ghost-script')}<p className="zr-story">{couplet.story}</p>{more('Line by line', <>{english('zr-small-verse')}{aloud('zr-small-aloud')}</>)}</>}
    {layer === 'english' && <>{original('zr-ghost-script')}{english('zr-verse')}{more('In plain words', <p className="zr-small-story">{couplet.story}</p>)}</>}
    {layer === 'original' && <>{original('zr-big-script')}{aloud('zr-ghost-aloud')}{more('Meaning', <>{english('zr-small-verse')}<p className="zr-small-story">{couplet.story}</p></>)}</>}
    {layer === 'aloud' && <>{aloud('zr-big-aloud')}{english('zr-ghost-verse')}{more('In plain words', <>{original('zr-small-script')}<p className="zr-small-story">{couplet.story}</p></>)}</>}
  </div>;
}

function Stepper({ poem, layer, anchors }: { poem: Poem; layer: Layer; anchors: Set<number> }) {
  const [at, setAt] = useState(0);
  const total = poem.couplets.length;
  const start = useRef<number | null>(null);
  const go = (to: number) => setAt(Math.max(0, Math.min(total - 1, to)));
  const onKey = (e: KeyboardEvent) => {
    if (e.target instanceof HTMLTextAreaElement) return;
    if (e.key === 'ArrowRight') { e.preventDefault(); go(at + 1); }
    if (e.key === 'ArrowLeft') { e.preventDefault(); go(at - 1); }
  };
  const down = (e: PointerEvent) => { if (e.pointerType !== 'mouse') start.current = e.clientX; };
  const up = (e: PointerEvent) => {
    if (start.current === null) return;
    const dx = e.clientX - start.current; start.current = null;
    if (Math.abs(dx) > 60) go(at + (dx < 0 ? 1 : -1));
  };
  const last = at === total - 1;
  return <div className="zr-stepper" onKeyDown={onKey}>
    <div className="zr-step-card" onPointerDown={down} onPointerUp={up} aria-live="polite">
      <div className="zr-step-meta"><span>Couplet {at + 1} <small>of {total}</small></span>{anchors.has(at + 1) && <span className="zr-key"><Lamp size={14} weight="fill" aria-hidden="true"/>A key line</span>}</div>
      <div key={at} className="zr-step-enter"><CoupletBody couplet={poem.couplets[at]} layer={layer} language={poem.language}/></div>
    </div>
    <div className="zr-step-nav">
      <button className="zr-round" onClick={() => go(at - 1)} disabled={at === 0} aria-label="Previous couplet"><ArrowLeft size={20}/></button>
      <div className="zr-dots" role="group" aria-label="Go to a couplet">{poem.couplets.map((_, i) => <button key={i} aria-label={`Couplet ${i + 1}${anchors.has(i + 1) ? ', a key line' : ''}`} aria-current={i === at ? 'step' : undefined} className={anchors.has(i + 1) ? 'is-key' : undefined} onClick={() => go(i)}/>)}</div>
      {last ? <button className="zr-round is-wide" onClick={() => scrollToId('zr-after')}>Finish<ArrowRight size={18} aria-hidden="true"/></button>
        : <button className="zr-round" onClick={() => go(at + 1)} aria-label="Next couplet"><ArrowRight size={20}/></button>}
    </div>
  </div>;
}

export default function Reader({ id, notebook, setNotebook, storageError, shown, flip }: { id: string; notebook: Notebook; setNotebook: Dispatch<SetStateAction<Notebook>>; storageError: boolean; shown: 'day' | 'night'; flip: () => void }) {
  const entry = entryById(id);
  const [poem, setPoem] = useState<Poem | null | undefined>(undefined);
  const [status, setStatus] = useState('');
  useEffect(() => {
    let live = true;
    loadPoem(id).then(p => { if (live) setPoem(p); }).catch(() => { if (live) setPoem(null); });
    return () => { live = false; };
  }, [id]);
  useEffect(() => {
    if (!poem) return;
    const frame = requestAnimationFrame(() => document.querySelector<HTMLElement>('[data-route-heading]')?.focus({ preventScroll: true }));
    return () => cancelAnimationFrame(frame);
  }, [poem]);
  if (!entry || poem === null) return <main id="zulf-main" className="zulf-page zulf-missing"><h1 tabIndex={-1} data-route-heading>We couldn’t find that poem.</h1><p>All {entries.length} poems are in the contents.</p><a className="zulf-primary" href="#poems">Open the contents</a></main>;
  const at = entries.indexOf(entry);
  const prev = entries[at - 1];
  const next = entries[at + 1];
  const scene = sceneFor(entry);
  const { layer, view } = notebook;
  const saved = notebook.saved.includes(id);
  const read = notebook.read.includes(id);
  const save = () => { setNotebook(n => ({ ...n, saved: toggle(n.saved, id) })); setStatus(saved ? 'Removed from your notebook.' : 'Saved to your notebook.'); };
  const finish = () => { setNotebook(n => ({ ...n, read: toggle(n.read, id) })); setStatus(read ? 'Marked as not read yet.' : 'Marked as read.'); };
  const anchors = new Set(poem && poem.reading.level !== 'none' ? poem.reading.anchors : []);
  const level = poem?.reading.level ?? entry.level;
  const form = forms[entry.form];

  return <main id="zulf-main" className="zr">
    <div className="zr-backdrop" aria-hidden="true"><Scene scene={scene} label={false} lite/></div>
    <div className="zr-top">
      <a className="zulf-glass-pill" href="#poems"><ArrowLeft size={17} aria-hidden="true"/>All poems</a>
      <button className="zulf-glass-pill is-icon" onClick={flip} aria-label={shown === 'night' ? 'Switch to day reading' : 'Switch to night reading'}>{shown === 'night' ? <Sun size={19}/> : <Moon size={19}/>}</button>
    </div>

    <article className="zr-sheet">
      <header className="zr-opening">
        <p className="zr-kicker">Poem {at + 1} of {entries.length}<span aria-hidden="true">·</span>{pageLabel(entry.pages)}<span aria-hidden="true">·</span>About {minutes(entry)} min</p>
        <h1 tabIndex={-1} data-route-heading>{entry.title}</h1>
        {entry.titleOriginal && <p className="zr-title-script" lang={scriptLang(entry.language)} dir="rtl">{entry.titleOriginal}</p>}
        <p className="zr-takeaway">{entry.takeaway}</p>
        {entry.author && <p className="zr-guest">A poem by <strong>{entry.author}</strong>, a friend of the poet.</p>}
      </header>

      <figure className="zr-figure"><Scene scene={scene}/></figure>

      {poem === undefined ? <p className="zr-loading" role="status">Opening the poem…</p> : <>
        <section className="zr-before" aria-label="Before you read">
          <p className="zr-label">Before you read</p>
          <p className="zr-lead">{poem.scene}</p>
          {poem.context && <aside className="zr-context"><strong>{poem.context.split('. ')[0]}.</strong> {poem.context.split('. ').slice(1).join('. ')}</aside>}
        </section>

        <section className="zr-poem" id="zr-poem" aria-labelledby="zr-poem-title">
          <div className="zr-poem-head">
            <div><h2 id="zr-poem-title">The poem</h2><p className="zr-form">{form ? <><strong>{form.label}.</strong> {form.meaning}</> : entry.form} {languageLabel(entry.language)}.</p></div>
            <button className="zr-view-toggle" onClick={() => setNotebook(n => ({ ...n, view: n.view === 'one' ? 'all' : 'one' }))}>{view === 'one' ? <><ListBullets size={16} aria-hidden="true"/>Whole poem</> : <>One at a time</>}</button>
          </div>
          <div className="zr-layers" role="radiogroup" aria-label="Choose how to read">{layers.map(l => <button key={l} role="radio" aria-checked={layer === l} onClick={() => setNotebook(n => ({ ...n, layer: l }))}><span>{layerLabels[l].label}</span></button>)}</div>
          <p className="zr-layer-hint">{layerLabels[layer].hint}</p>
          {view === 'one' ? <Stepper poem={poem} layer={layer} anchors={anchors}/>
            : <ol className="zr-all">{poem.couplets.map((c, i) => <li key={i} className={anchors.has(i + 1) ? 'is-key' : undefined}><span className="zr-all-number" aria-hidden="true">{i + 1}</span>{anchors.has(i + 1) && <span className="zr-key"><Lamp size={13} weight="fill" aria-hidden="true"/>A key line</span>}<CoupletBody couplet={c} layer={layer} language={poem.language}/></li>)}</ol>}
          {poem.variant && <details className="zr-variant"><summary>Printed again on {pageLabel(poem.variant.pages).toLowerCase()}<CaretDown size={14} aria-hidden="true"/></summary><p>{poem.variant.summary}</p>{poem.variant.extraCouplets.length > 0 && <ol className="zr-all">{poem.variant.extraCouplets.map((c, i) => <li key={i}><span className="zr-all-number" aria-hidden="true">+{i + 1}</span><CoupletBody couplet={c} layer={layer} language={poem.language}/></li>)}</ol>}</details>}
        </section>

        <div id="zr-after" className="zr-after">
          <section className={`zr-deeper level-${level}`} aria-labelledby="zr-deeper-title">
            <p className="zr-label"><span className={`zulf-level-dot level-${level}`} aria-hidden="true"/>{levels[level].label}</p>
            <h2 id="zr-deeper-title">{level === 'none' ? 'Is it about God?' : 'The deeper meaning'}</h2>
            {level === 'none' ? <p>{levels.none.description}</p> : <>
              {poem.deeper.split('\n\n').map((p, i) => <p key={i}>{p}</p>)}
              <p className="zr-level-note">{levels[level].description}</p>
              {poem.reading.lenses.length > 0 && <div className="zr-chips">{poem.reading.lenses.map(l => <a key={l} href={poemsUrl({ lens: l })}>{lenses[l].label}</a>)}</div>}
            </>}
          </section>

          <blockquote className="zr-why"><p className="zr-label">Why it matters</p><p>{poem.why}</p></blockquote>

          <section className="zr-reflect" id="zr-reflect" aria-labelledby="zr-reflect-title">
            <p className="zr-label" id="zr-reflect-title">A moment to reflect</p>
            <p className="zr-prompt">{poem.prompt}</p>
            <label htmlFor={`note-${id}`}>Write if you’d like. It stays in this browser.</label>
            <textarea id={`note-${id}`} rows={4} value={notebook.notes[id] ?? ''} onChange={e => { const text = e.target.value; setNotebook(n => ({ ...n, notes: { ...n.notes, [id]: text } })); }} placeholder="A thought, a memory, a line that stayed with you…"/>
            {storageError && <p className="zr-warning">Saving isn’t available in this browser. Export your notebook before you leave.</p>}
          </section>

          <div className="zr-extras">
            {poem.glossary.length > 0 && <details><summary><span>Words to know</span><small>{poem.glossary.length}</small><CaretDown size={15} aria-hidden="true"/></summary><dl>{poem.glossary.filter(g => glossary[g]).map(g => <div key={g}><dt>{glossary[g].term}</dt><dd>{glossary[g].meaning}</dd></div>)}</dl></details>}
            {(poem.notes.length > 0 || poem.editorNote) && <details><summary><span>Translator’s notes</span><small>{poem.notes.length + (poem.editorNote ? 1 : 0)}</small><CaretDown size={15} aria-hidden="true"/></summary><ul>{poem.editorNote && <li>{poem.editorNote}</li>}{poem.notes.map((n, i) => <li key={i}>{n}</li>)}</ul></details>}
          </div>

          <div className="zr-finish">
            <button className={read ? 'zulf-secondary' : 'zulf-primary'} onClick={finish}><Check size={17} aria-hidden="true"/>{read ? 'Finished · mark unread' : 'Finish this poem'}</button>
            <span className="zulf-sr" role="status">{status}</span>
          </div>
          {next ? <a className="zr-next" href={poemUrl(next.id)}><span className="zr-next-art"><Scene scene={sceneFor(next)} label={false} lite/></span><span className="zr-next-copy"><small>Next · {pageLabel(next.pages)}</small><strong>{next.title}</strong><span>{next.takeaway}</span></span><ArrowRight size={20} aria-hidden="true"/></a>
            : <a className="zr-next" href="#notebook"><span className="zr-next-copy"><small>You’ve reached the last page</small><strong>Open your notebook</strong></span><ArrowRight size={20} aria-hidden="true"/></a>}
        </div>
      </>}
    </article>

    <nav className="zr-bar" aria-label="Reading controls">
      {prev ? <a href={poemUrl(prev.id)} aria-label={`Previous poem: ${prev.title}`}><ArrowLeft size={21}/><span>Previous</span></a> : <span className="is-disabled"><ArrowLeft size={21}/><span>Previous</span></span>}
      <button onClick={save} aria-pressed={saved}><BookmarkSimple size={21} weight={saved ? 'fill' : 'regular'}/><span>{saved ? 'Saved' : 'Save'}</span></button>
      <a className="zr-bar-title" href="#poems"><strong>Page {entry.pages[0]}</strong><span>Contents</span></a>
      <button onClick={() => { scrollToId('zr-reflect'); setTimeout(() => document.getElementById(`note-${id}`)?.focus({ preventScroll: true }), 400); }}><PencilSimple size={21}/><span>Reflect</span></button>
      {next ? <a href={poemUrl(next.id)} aria-label={`Next poem: ${next.title}`}><ArrowRight size={21}/><span>Next</span></a> : <a href="#notebook"><ArrowRight size={21}/><span>Notebook</span></a>}
    </nav>
  </main>;
}
