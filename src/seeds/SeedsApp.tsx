import { useEffect, useMemo, useRef, useState, type Dispatch, type SetStateAction } from 'react';
import { ArrowLeft, ArrowRight, ArrowUpRight, BookmarkSimple, BookOpen, CaretDown, Export, Check, CheckCircle, DownloadSimple, Flower, HandHeart, Leaf, MagnifyingGlass, PencilSimple, Plant, Shuffle, Sparkle, Sun, Waves, X } from '@phosphor-icons/react';
import { assetUrl } from '../assetUrl';
import { getTheme, seeds, sourcePlainText, themes, type Seed, type ThemeId } from './content';
import BookPassage, { scrollToReadingPart } from './BookPassage';
import { dailySeedId, followUpFor, formatGarden, gardenTabFor, loadGarden, localDay, resumeFor, saveGarden, type FollowUp, type Garden } from './state';
import { shareSeed } from './share';
import PracticeLab from './PracticeLab';
import { SceneImage, SeedIllustration, themeScene } from './Artwork';
import { seedIllustrations } from './illustrations';
import SourceCredit from './SourceCredit';
import Journal from './Journal';
import { AppearanceControl, useAppearance } from './Appearance';

const pdf = assetUrl('assets/timeless-seeds/source.pdf');
const icons = { hope: Sun, trust: Waves, presence: Leaf, return: Plant, gratitude: Flower, kindness: HandHeart };
type ReadingPart = 'journal' | 'practice' | 'illustration';
const seedUrl = (id: number, path?: ThemeId, part?: ReadingPart) => {
  const params = new URLSearchParams();
  if (path) params.set('path', path);
  if (part) params.set('part', part);
  return `#seed-${id}${params.size ? `?${params}` : ''}`;
};
const toggle = (list: number[], id: number) => list.includes(id) ? list.filter(v => v !== id) : [...list, id];
const themeIsValid = (value: string | null): value is ThemeId => themes.some(t => t.id === value);

function routeFromHash() {
  const [route, search = ''] = window.location.hash.slice(1).split('?');
  const params = new URLSearchParams(search);
  const path = params.get('path');
  const theme = params.get('theme');
  const requestedPart = params.get('part');
  const part: ReadingPart | undefined = requestedPart === 'journal' || requestedPart === 'practice' || requestedPart === 'illustration' ? requestedPart : undefined;
  const match = /^seed-(\d+)$/.exec(route);
  return { view: match ? 'reader' : route || 'today', id: match ? Number(match[1]) : null, path: themeIsValid(path) ? path : undefined, theme: themeIsValid(theme) ? theme : undefined, part, gardenTab: params.get('tab') };
}

// One-time hints live outside the garden so they never touch a reader's saved writing.
const INTRO_KEY = 'mindfulmod-seeds-intro-v1';
const SAVE_HINT_KEY = 'mindfulmod-seeds-save-hint-v1';
const hintSeen = (key: string) => { try { return localStorage.getItem(key) !== null; } catch { return false; } };
const rememberHint = (key: string) => { try { localStorage.setItem(key, 'seen'); } catch { /* shown once per visit instead */ } };

function ThemeIcon({ theme, size = 24 }: { theme: ThemeId; size?: number }) {
  const Icon = icons[theme];
  return <Icon size={size} weight="light" aria-hidden="true"/>;
}

function SeedCard({ seed, garden, onSave }: { seed: Seed; garden: Garden; onSave: (id: number) => void }) {
  const saved = garden.saved.includes(seed.id);
  return <article className={`seed-card tone-${seed.theme}`}>
    <div className="seed-card-top"><span className="seed-tag"><ThemeIcon theme={seed.theme} size={17}/>{getTheme(seed.theme).short}</span><button className="seed-icon-button" aria-label={`${saved ? 'Unsave' : 'Save'} seed ${seed.id}`} aria-pressed={saved} onClick={() => onSave(seed.id)}><BookmarkSimple size={20} weight={saved ? 'fill' : 'regular'}/></button></div>
    <a className="seed-card-link" href={seedUrl(seed.id)}><span className="seed-number">Seed {String(seed.id).padStart(3, '0')}</span><h3>{seed.title}</h3><p>{seed.reading.split('. ')[0]}.</p><span className="seed-card-bottom"><span>{garden.read.includes(seed.id) ? <><Check size={14}/> Read</> : 'Read & reflect'}</span><ArrowUpRight size={20}/></span></a>
  </article>;
}

// Progress across the whole book, drawn as a garden bed: one plot per seed.
// Unread plots are bare soil, read seeds have sprouted, and reflected-on seeds have flowered.
function GardenGrowth({ garden, compact = false }: { garden: Garden; compact?: boolean }) {
  const read = new Set(garden.read);
  const reflected = new Set(seeds.filter(s => garden.notes[s.id]?.trim() || garden.intentions[s.id]?.trim()).map(s => s.id));
  const pathsDone = themes.filter(t => t.route.every(id => read.has(id))).length;
  const actionsDone = Object.values(garden.followUps).filter(value => value === 'done').length;
  const reflections = `${reflected.size} ${reflected.size === 1 ? 'reflection' : 'reflections'}`;
  const paths = `${pathsDone} of ${themes.length} paths complete${actionsDone ? ` · ${actionsDone} small ${actionsDone === 1 ? 'action' : 'actions'} done` : ''}`;
  if (compact) return <a className="garden-growth is-compact" href="#garden">
    <span className="growth-compact-copy"><span className="seed-eyebrow">Your garden</span><strong>{read.size} of {seeds.length} seeds read</strong><small>{reflections} · {paths}</small></span>
    <span className="growth-meter" aria-hidden="true"><span style={{ width: `${Math.max(2, read.size / seeds.length * 100)}%` }}/></span>
    <ArrowRight size={19}/>
  </a>;
  return <section className="garden-growth" aria-labelledby="growth-title">
    <div className="growth-summary"><span className="seed-eyebrow">Your progress</span><h2 id="growth-title"><strong>{read.size}</strong> of {seeds.length} seeds read</h2><p>{reflections} · {paths}</p></div>
    <div className="growth-bed" aria-hidden="true">{seeds.map(s => <a key={s.id} href={seedUrl(s.id)} tabIndex={-1} title={`Seed ${s.id}: ${s.title}`} className={`growth-plot tone-${s.theme}${reflected.has(s.id) ? ' is-flowering' : read.has(s.id) ? ' is-sprouted' : ''}`}/>)}</div>
    <ul className="growth-legend" aria-hidden="true"><li><span className="growth-plot"/>Not read yet</li><li><span className="growth-plot is-sprouted tone-kindness"/>Read</li><li><span className="growth-plot is-flowering tone-kindness"/>Reflected on</li></ul>
    <ol className="growth-paths" aria-label="Your paths">{themes.map(t => {
      const done = t.route.filter(id => read.has(id)).length;
      const next = t.route.find(id => !read.has(id)) ?? t.route[0];
      return <li key={t.id} className={`tone-${t.id}`}><a href={seedUrl(next, t.id)}><ThemeIcon theme={t.id} size={20}/><span className="growth-path-title">{t.title}</span><span className="growth-path-dots" aria-hidden="true">{t.route.map(id => <span key={id} className={read.has(id) ? 'is-read' : undefined}/>)}</span><span className="growth-path-count">{done === t.route.length ? 'Complete' : `${done} of ${t.route.length}`}</span></a></li>;
    })}</ol>
  </section>;
}

function SeedIndex({ entries, garden, onSave }: { entries: Seed[]; garden: Garden; onSave: (id: number) => void }) {
  return <ol className="seed-index" aria-label="Seeds in book order">{entries.map(seed => <li key={seed.id} className={`tone-${seed.theme}`}>
    <a href={seedUrl(seed.id)}><span className="index-number">{String(seed.id).padStart(3, '0')}</span><span className="index-entry"><h2>{seed.title}</h2><span className="index-theme"><ThemeIcon theme={seed.theme} size={14}/>{getTheme(seed.theme).short}{garden.read.includes(seed.id) && <span><Check size={13}/> Read</span>}</span></span></a>
    <button className="seed-icon-button" aria-label={`${garden.saved.includes(seed.id) ? 'Unsave' : 'Save'} seed ${seed.id}`} aria-pressed={garden.saved.includes(seed.id)} onClick={() => onSave(seed.id)}><BookmarkSimple size={20} weight={garden.saved.includes(seed.id) ? 'fill' : 'regular'}/></button>
  </li>)}</ol>;
}

type ReaderProps = { seed: Seed; garden: Garden; savedGarden: Garden | null; setGarden: Dispatch<SetStateAction<Garden>>; path?: ThemeId; initialPart?: ReadingPart; storageError: boolean; intro: boolean; onIntroDone: () => void; onSaved: (wasSaved: boolean) => void; onShareSaved: () => void };
function Reader({ seed, garden, savedGarden, setGarden, path, initialPart, storageError, intro, onIntroDone, onSaved, onShareSaved }: ReaderProps) {
  const { appearance } = useAppearance();
  const [status, setStatus] = useState('');
  const contents = useRef<HTMLDialogElement>(null);
  const [contentsOpen, setContentsOpen] = useState(false);
  const theme = getTheme(seed.theme);
  const pathTheme = path ? getTheme(path) : undefined;
  const sequence = pathTheme?.route.includes(seed.id) ? pathTheme.route : seeds.map(s => s.id);
  const index = sequence.indexOf(seed.id);
  const nextId = index < sequence.length - 1 ? sequence[index + 1] : null;
  const minutes = Math.max(1, Math.round(`${seed.reading} ${sourcePlainText(seed.source.blocks)} ${seed.prompt}`.split(/\s+/).length / 200));
  const isSaved = garden.saved.includes(seed.id);
  const isRead = garden.read.includes(seed.id);
  const labId = `practice-${seed.id}`;
  const jump = (id: string) => {
    contents.current?.close();
    requestAnimationFrame(() => scrollToReadingPart(id));
  };
  const save = () => { setGarden(old => ({ ...old, saved: toggle(old.saved, seed.id) })); setStatus(isSaved ? 'Removed from your saved seeds.' : 'Saved to your garden.'); onSaved(isSaved); };
  // Reaching the end of a seed, or keeping a reflection, counts as reading it.
  // "Mark unread" stops this for the rest of the visit so it doesn't undo the reader's choice.
  const completion = useRef<HTMLDivElement>(null);
  const keptUnread = useRef(false);
  const readNow = useRef(isRead);
  readNow.current = isRead;
  const markRead = (old: Garden) => keptUnread.current || old.read.includes(seed.id) ? old : { ...old, read: [...old.read, seed.id] };
  const setNote = (value: string) => setGarden(old => { const next = { ...old, notes: { ...old.notes, [seed.id]: value } }; return value.trim() ? markRead(next) : next; });
  const setIntention = (value: string) => setGarden(old => {
    // A new or changed plan is dated today, so a later visit can ask how it went.
    const { [seed.id]: _answered, ...followUps } = old.followUps;
    const { [seed.id]: _day, ...planned } = old.planned;
    const next = { ...old, intentions: { ...old.intentions, [seed.id]: value }, followUps, planned: value.trim() ? { ...planned, [seed.id]: localDay() } : planned };
    return value.trim() ? markRead(next) : next;
  });
  const [sharing, setSharing] = useState(false);
  const share = async () => {
    setSharing(true);
    try {
      const result = await shareSeed(seed, themeScene[seed.theme], appearance, `${location.origin}${location.pathname}${seedUrl(seed.id)}`);
      setStatus(result === 'saved' ? 'Picture saved. Share it from your downloads.' : result === 'shared' ? 'Shared.' : '');
      if (result === 'saved') onShareSaved();
    } catch { setStatus('Sharing isn’t available here.'); }
    finally { setSharing(false); }
  };
  const markUnread = () => { keptUnread.current = true; setGarden(old => ({ ...old, read: old.read.filter(id => id !== seed.id) })); setStatus('Marked unread.'); };
  useEffect(() => {
    const end = completion.current;
    if (!end || !('IntersectionObserver' in window)) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting || keptUnread.current || window.scrollY < 1 || readNow.current) return;
      setGarden(markRead);
      setStatus('Marked as read.');
    }, { threshold: 0.6 });
    observer.observe(end);
    return () => observer.disconnect();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [seed.id, setGarden]);
  // How far through this seed's sheet the reader is. It fills the progress line
  // and lets the room drift a little (the drift is switched off in CSS for reduced motion).
  const sheet = useRef<HTMLElement>(null);
  useEffect(() => {
    const root = document.documentElement;
    let frame = 0;
    const update = () => {
      frame = 0;
      const box = sheet.current?.getBoundingClientRect();
      if (!box) return;
      const travel = box.height - window.innerHeight * 0.6;
      const progress = travel > 0 ? Math.min(1, Math.max(0, -box.top / travel)) : 1;
      root.style.setProperty('--reading-progress', progress.toFixed(3));
    };
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(update); };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => { cancelAnimationFrame(frame); window.removeEventListener('scroll', onScroll); window.removeEventListener('resize', onScroll); root.style.removeProperty('--reading-progress'); };
  }, [seed.id]);
  useEffect(() => {
    if (!initialPart) return;
    const target = initialPart === 'journal' ? 'seed-writing' : initialPart === 'illustration' ? seedIllustrations[seed.id] ? 'seed-illustration' : 'seed-explanation' : labId;
    const frame = requestAnimationFrame(() => scrollToReadingPart(target));
    return () => cancelAnimationFrame(frame);
  }, [initialPart, labId, seed.id]);
  const sections = [
    ...(seedIllustrations[seed.id] ? [{ id: 'seed-illustration', title: 'The illustration', detail: 'A picture to remember it by' }] : []),
    { id: 'seed-explanation', title: 'A simple explanation', detail: 'Reading help for this seed' },
    { id: 'seed-book', title: 'In the original words', detail: 'The passage, word for word' },
    ...(seed.source.notes.length ? [{ id: 'seed-source-notes', title: 'Source notes', detail: `${seed.source.notes.length} ${seed.source.notes.length === 1 ? 'note' : 'notes'} from the book` }] : []),
    { id: 'seed-reflection', title: 'A moment to reflect', detail: 'Think about a question, or write if you wish' },
    { id: labId, title: 'Try an activity', detail: 'An optional way to put advice into practice' },
  ];
  return <main id="seeds-main" className={`seed-reader tone-${seed.theme} ${garden.large ? 'large-reading' : ''}`}>
    <div className="reader-progress" aria-hidden="true"><span/></div>
    <div className="reader-topbar"><a href="#today"><ArrowLeft size={17}/>Home</a><AppearanceControl large={garden.large} onLarge={() => setGarden(old => ({ ...old, large: !old.large }))}/></div>
    <div className="reader-layout"><aside className="reader-aside"><span className="seed-eyebrow">A seed of {theme.short.toLowerCase()}</span><h2>{theme.title}</h2><p>{theme.description}</p><div className="reader-path-label">{pathTheme ? 'Along this path' : 'A path to explore'}</div><ol>{(pathTheme || theme).route.map((id, i) => <li key={id}><a aria-current={id === seed.id ? 'page' : undefined} href={seedUrl(id, path || seed.theme)}><span>{garden.read.includes(id) ? <Check size={13}/> : `0${i + 1}`}</span>{seeds[id - 1].title}</a></li>)}</ol><a className="reader-other-paths" href="#explore">Browse the collection <ArrowRight size={15}/></a></aside>
    <article className="reader-article" ref={sheet}>{intro && <aside className="reader-welcome" aria-labelledby="reader-welcome-title"><span className="seed-eyebrow" id="reader-welcome-title"><Plant size={16} weight="light"/>New here?</span><p><strong>Timeless Seeds</strong> offers short readings of timeless advice for everyday life. Each seed starts with a simple explanation, then the original words, then a question to carry into your day.</p><div className="reader-welcome-actions"><button className="seed-primary" onClick={onIntroDone}>Got it, start reading</button><a className="seed-text-link" href="#today">See the home page <ArrowRight size={16}/></a></div></aside>}<div className="reader-meta"><div className="reader-location"><span className="seed-eyebrow">Seed {seed.id} of {seeds.length}</span><span className="reader-minutes">About {minutes} min</span>{pathTheme && <span className="reader-path-progress">{pathTheme.title} · {index + 1} of {sequence.length}</span>}</div><div className="reader-meta-actions"><button className="seed-icon-button reader-share" onClick={share} disabled={sharing} aria-label="Share this seed as a picture"><Export size={21}/></button><button className="seed-icon-button reader-desktop-save" onClick={save} aria-label={isSaved ? 'Unsave this seed' : 'Save this seed'} aria-pressed={isSaved}><BookmarkSimple size={22} weight={isSaved ? 'fill' : 'regular'}/></button></div></div>
      <h1 tabIndex={-1} data-route-heading>{seed.title}</h1>
      <p className="reader-takeaway">{seed.takeaway}</p>
      <SourceCredit credit={seed.credit} jump={jump}/>
      <SeedIllustration seedId={seed.id} leading/>
      <div className="reader-reading">
        <section className="seed-explanation" id="seed-explanation" tabIndex={-1} aria-labelledby="seed-explanation-heading"><h2 id="seed-explanation-heading">A simple explanation</h2>{seed.reading.split('\n\n').map((paragraph, i) => <p key={i} className="reader-prose">{paragraph}</p>)}</section>
        <BookPassage seed={seed}/>
        <Journal seed={seed} garden={garden} savedGarden={savedGarden} storageError={storageError} onNote={setNote} onIntention={setIntention}/>
        <details className="reader-disclosure reader-activity" id={labId}><summary><Sparkle size={18}/><span>Try a reflection activity <small>Optional · A few minutes</small></span><CaretDown size={17}/></summary><div className="reader-activity-body"><PracticeLab theme={seed.theme} seedId={seed.id}/></div></details>
      </div>
      <div className="reader-completion" ref={completion}><p>You can stop here. Take what helps into your day.</p>
        {nextId ? <a className="reader-next" href={seedUrl(nextId, path)}><span><small>{pathTheme ? `Next on this path · ${index + 2} of ${sequence.length}` : `Next seed · ${nextId} of ${seeds.length}`}</small>{seeds[nextId - 1].title}</span><ArrowRight size={20}/></a>
          : <a className="reader-next" href={path ? '#explore' : '#garden'}><span><small>{path ? 'You’ve finished this path' : 'You’ve reached the final seed'}</small>{path ? 'Choose another path' : 'Return to your garden'}</span><ArrowRight size={20}/></a>}
        <div className="reader-completion-meta"><span className={`reader-read-state${isRead ? ' is-read' : ''}`}>{isRead ? <><CheckCircle size={17} weight="fill"/>Marked as read</> : <><CheckCircle size={17}/>Marked as read when you reach this point</>}</span>{isRead && <button className="reader-unmark" onClick={markUnread}>Mark unread</button>}<button className="reader-unmark" onClick={share} disabled={sharing}>Share this seed</button><a className="seed-text-link" href="#today">Back home <ArrowRight size={16}/></a></div>
        <span className="seed-sr-only" role="status">{status}</span></div>
      {index > 0 && <nav className="reader-pagination" aria-label="Previous reading"><a href={seedUrl(sequence[index - 1], path)}><ArrowLeft size={18}/><span><small>Previous seed</small>{seeds[sequence[index - 1] - 1].title}</span></a><span/></nav>}
    </article></div>
    <nav className="reader-thumbbar" aria-label="Quick reading controls">
      <img className="reader-book-surface" src={assetUrl(`assets/timeless-seeds/open-book-edge${appearance === 'starlight' ? '-starlight' : ''}.svg`)} alt="" aria-hidden="true"/>
      {index > 0 ? <a href={seedUrl(sequence[index - 1], path)} aria-label="Previous seed"><ArrowLeft size={21}/><span>Previous</span></a> : <button disabled aria-label="Previous seed"><ArrowLeft size={21}/><span>Previous</span></button>}
      <button className="reader-book-save" onClick={save} aria-label={isSaved ? 'Unsave this seed' : 'Save this seed'} aria-pressed={isSaved}><BookmarkSimple size={21} weight={isSaved ? 'fill' : 'regular'}/><span>{isSaved ? 'Saved' : 'Save'}</span></button>
      <button className="reader-book-contents" aria-label={`Seed ${seed.id} · On this seed`} aria-haspopup="dialog" aria-controls="seed-contents" aria-expanded={contentsOpen} onClick={() => { contents.current?.showModal(); setContentsOpen(true); }}><span className="reader-book-position">Seed {seed.id}</span><span className="reader-book-menu-label">Contents<CaretDown size={11} aria-hidden="true"/></span></button>
      <button className="reader-book-journal" aria-label="Reflect on this seed" onClick={() => jump('seed-reflection')}><PencilSimple size={21}/><span>Reflect</span></button>
      <a href={index < sequence.length - 1 ? seedUrl(sequence[index + 1], path) : path ? '#explore' : '#garden'} aria-label={index < sequence.length - 1 ? 'Next seed' : 'Finish this path'}><ArrowRight size={21}/><span>{index < sequence.length - 1 ? 'Next' : 'Done'}</span></a>
    </nav>
    <dialog ref={contents} id="seed-contents" className="reader-contents" aria-labelledby="seed-contents-title" onClose={() => setContentsOpen(false)} onClick={event => { if (event.target === contents.current) contents.current.close(); }}>
      <div className="reader-contents-inner"><div className="reader-contents-heading"><div><span className="seed-eyebrow">Seed {seed.id}</span><h2 id="seed-contents-title">On this seed</h2></div><button className="seed-icon-button" aria-label="Close reading contents" onClick={() => contents.current?.close()}><X size={22}/></button></div>
        {sections.map((section, i) => <button key={section.id} onClick={() => jump(section.id)}><span className="contents-number">{String(i + 1).padStart(2, '0')}</span><span>{section.title}<small>{section.detail}</small></span><ArrowRight size={18}/></button>)}
      </div>
    </dialog>
  </main>;
}

export default function SeedsApp() {
  const [route, setRoute] = useState(routeFromHash);
  const [initial] = useState(loadGarden);
  const [garden, setGarden] = useState<Garden>(initial.garden);
  const [storageError, setStorageError] = useState(initial.error);
  const [savedGarden, setSavedGarden] = useState<Garden | null>(initial.error ? null : initial.garden);
  const [query, setQuery] = useState('');
  const [exportText, setExportText] = useState<string | null>(null);
  const gardenTab = gardenTabFor(garden, route.gardenTab);
  const firstRender = useRef(true);
  const [today, setToday] = useState(() => dailySeedId());
  const todaySeed = seeds[today - 1];
  const selected = seeds.find(s => s.id === route.id);
  // Someone who lands straight on a seed (a shared link) gets a short welcome there, once.
  const [introSeed, setIntroSeed] = useState<number | null>(() => route.view === 'reader' && !initial.garden.last && !initial.garden.read.length && !hintSeen(INTRO_KEY) ? route.id : null);
  const finishIntro = () => { rememberHint(INTRO_KEY); setIntroSeed(null); };
  useEffect(() => { if (introSeed !== null && route.id !== introSeed) finishIntro(); }, [route.id, introSeed]);
  // The first save explains where saved seeds go.
  const [saveNotice, setSaveNotice] = useState(false);
  const [shareNotice, setShareNotice] = useState(false);
  useEffect(() => { if (!shareNotice) return; const timer = setTimeout(() => setShareNotice(false), 6000); return () => clearTimeout(timer); }, [shareNotice]);
  const saveHintShown = useRef(hintSeen(SAVE_HINT_KEY));
  const noteSave = (wasSaved: boolean) => {
    if (wasSaved || saveHintShown.current) return;
    saveHintShown.current = true;
    rememberHint(SAVE_HINT_KEY);
    setSaveNotice(true);
  };
  useEffect(() => {
    if (!saveNotice) return;
    const timer = setTimeout(() => setSaveNotice(false), 7000);
    return () => clearTimeout(timer);
  }, [saveNotice]);
  const onSave = (id: number) => { noteSave(garden.saved.includes(id)); setGarden(old => ({ ...old, saved: toggle(old.saved, id) })); };
  // Navigation appears once it means something: after a first reading, or away from the home page.
  const showNav = Boolean(garden.last || garden.read.length || garden.saved.length) || route.view !== 'today';
  const resume = resumeFor(garden, themes);
  // Ask once, on a later day, whether a planned small action happened.
  const pending = followUpFor(garden);
  const [answered, setAnswered] = useState<{ id: number; value: FollowUp } | null>(null);
  const answer = (id: number, value: FollowUp) => { setAnswered({ id, value }); setGarden(old => ({ ...old, followUps: { ...old.followUps, [id]: value } })); };
  const nextOnPath = (theme: typeof themes[number]) => theme.route.find(id => !garden.read.includes(id)) ?? theme.route[0];
  useEffect(() => {
    const change = () => { setRoute(routeFromHash()); };
    window.addEventListener('hashchange', change);
    const refreshDay = () => setToday(dailySeedId());
    document.addEventListener('visibilitychange', refreshDay);
    return () => { window.removeEventListener('hashchange', change); document.removeEventListener('visibilitychange', refreshDay); };
  }, []);
  useEffect(() => {
    const saved = saveGarden(garden, !initial.error);
    if (saved) setSavedGarden(garden);
    setStorageError(!saved);
  }, [garden, initial.error]);
  useEffect(() => {
    document.title = `${selected ? `${selected.title} · ` : ''}Timeless Seeds of Advice · MindfulMod`;
    if (selected) setGarden(old => old.last === selected.id ? old : { ...old, last: selected.id });
    if (firstRender.current) { firstRender.current = false; return; }
    // Reader owns part links, including opening the relevant disclosure. Do not
    // reset its scroll or focus while the destination is being revealed.
    if (selected && route.part) return;
    window.scrollTo({ top: 0, behavior: 'instant' });
    const frame = requestAnimationFrame(() => document.querySelector<HTMLElement>('[data-route-heading]')?.focus({ preventScroll: true }));
    return () => cancelAnimationFrame(frame);
  }, [route.view, route.id, route.part, selected]);

  const filtered = useMemo(() => {
    const needle = query.toLocaleLowerCase().trim().replace(/^#/, '');
    return seeds.filter(s => (!route.theme || s.theme === route.theme) && (!needle || `${s.id} ${s.title} ${sourcePlainText(s.source.blocks)} ${s.reading} ${s.prompt} ${getTheme(s.theme).title}`.toLocaleLowerCase().includes(needle)));
  }, [query, route.theme]);
  const reflectedIds = seeds.filter(s => garden.notes[s.id]?.trim() || garden.intentions[s.id]?.trim()).map(s => s.id);
  const gardenSeeds = seeds.filter(s => (gardenTab === 'saved' ? garden.saved : gardenTab === 'read' ? garden.read : reflectedIds).includes(s.id));

  const exportGarden = () => setExportText(formatGarden(garden, seeds));
  const downloadGarden = () => {
    const text = exportText || formatGarden(garden, seeds);
    const link = document.createElement('a');
    const url = URL.createObjectURL(new Blob([text], { type: 'text/plain;charset=utf-8' }));
    link.href = url; link.download = 'my-timeless-seeds-garden.txt'; document.body.appendChild(link); link.click(); link.remove(); setTimeout(() => URL.revokeObjectURL(url), 1000);
  };
  const surprise = () => {
    const candidates = seeds.filter(s => !garden.read.includes(s.id));
    const pool = candidates.length ? candidates : seeds;
    window.location.hash = seedUrl(pool[Math.floor(Math.random() * pool.length)].id);
  };
  return <div className={`seeds-app${route.view === 'reader' && selected ? ' is-reading' : ''}`}>
    <div className="seed-atmosphere" aria-hidden="true"><SceneImage scene="island-sky" sizes="(max-width: 760px) 1500px, 2000px" eager/></div>
    <a className="seed-skip" href="#seeds-main" onClick={e => { e.preventDefault(); const main = document.getElementById('seeds-main'); main?.setAttribute('tabindex', '-1'); main?.focus(); }}>Skip to content</a>
    {!(route.view === 'reader' && selected) && <header className={`seed-header${showNav ? '' : ' is-first-visit'}`}><a href="#today" className="seed-brand" aria-label="Timeless Seeds of Advice home"><span className="seed-brand-icon"><Plant size={29} weight="light"/></span><span>Timeless Seeds<small>OF ADVICE</small></span></a>{showNav && <nav aria-label="Main navigation"><a href="#today" aria-current={route.view === 'today' ? 'page' : undefined}>Today</a><a href="#explore" aria-current={route.view === 'explore' ? 'page' : undefined}>All seeds</a><a className="garden-nav" href="#garden" aria-current={route.view === 'garden' ? 'page' : undefined}><BookmarkSimple size={17}/>My garden{garden.saved.length > 0 && <span>{garden.saved.length}</span>}</a></nav>}<AppearanceControl iconOnly/></header>}
    {storageError && <p className="storage-warning" role="status">Saving in this browser is unavailable. You can still read and write here; export your garden before leaving.</p>}
    {route.view === 'reader' && selected ? <Reader key={`${selected.id}-${route.path}-${route.part}`} seed={selected} garden={garden} savedGarden={savedGarden} initialPart={route.part} setGarden={setGarden} path={route.path && getTheme(route.path).route.includes(selected.id) ? route.path : undefined} storageError={storageError} intro={introSeed === selected.id} onIntroDone={finishIntro} onSaved={noteSave} onShareSaved={() => setShareNotice(true)}/> : route.view === 'today' ? <main id="seeds-main" className="seed-home">
      <section className={`seed-hero${garden.last ? ' has-resume' : ''}`}>
        <div className="seed-hero-copy"><h1 tabIndex={-1} data-route-heading>Small seeds.<br/><em>Lasting hope.</em></h1><p className="seed-hero-line">Short readings of timeless advice, a few minutes each.</p>
          {answered ? <section className="seed-followup is-answered" aria-live="polite"><p>{answered.value === 'done' ? 'Well done. That’s a seed taking root.' : 'That’s okay. There’s still today.'}</p><a className="seed-text-link" href={answered.value === 'done' ? seedUrl(answered.id, undefined, 'journal') : seedUrl(answered.id)}>{answered.value === 'done' ? 'Write how it went' : 'Revisit the seed'} <ArrowRight size={16}/></a></section>
            : pending ? <section className="seed-followup" aria-labelledby="followup-title"><span className="seed-eyebrow" id="followup-title">{pending.daysAgo === 1 ? 'Yesterday' : `${pending.daysAgo} days ago`} you planned to</span><p className="followup-plan">“{garden.intentions[pending.id].trim()}”</p><span className="followup-seed">From <a href={seedUrl(pending.id)}>{seeds[pending.id - 1].title}</a></span><div className="followup-actions"><button className="seed-primary" onClick={() => answer(pending.id, 'done')}><CheckCircle size={18}/>Yes, I did it</button><button className="seed-secondary" onClick={() => answer(pending.id, 'later')}>Not yet</button></div></section> : null}
          {resume ? <a className="hero-continue" href={seedUrl(resume.id, resume.path as ThemeId | undefined)}><span><BookOpen size={17}/>{resume.kind === 'continue' ? `Continue ${getTheme(resume.path as ThemeId).title} · ${resume.step} of ${resume.total}`
            : resume.kind === 'next' ? `${resume.finishedPath ? `You finished ${getTheme(resume.finishedPath as ThemeId).title} · ` : ''}Next in the book · Seed ${resume.id}`
            : resume.kind === 'done' ? `You’ve read every seed · Return to Seed ${resume.id}`
            : `Return to your last reading · Seed ${resume.id}`}</span><strong>{seeds[resume.id - 1].title}</strong><ArrowRight size={19}/></a> : null}
          <div className="seed-feelings"><h2 id="feelings-title">{garden.last ? 'Or choose what you need today' : 'What do you need today?'}</h2><ul aria-labelledby="feelings-title">{themes.map(theme => <li key={theme.id}><a className={`seed-feeling tone-${theme.id}`} href={seedUrl(nextOnPath(theme), theme.id)}><ThemeIcon theme={theme.id} size={20}/><span>{theme.invitation}</span></a></li>)}</ul></div>
          {!garden.last && <div className="hero-actions"><a className="seed-text-link" href={seedUrl(12, 'kindness')}>Not sure? Start with one reading <ArrowRight size={16}/></a></div>}
        </div>
        <figure className="seed-hero-art"><SceneImage scene="coastal-home" alt="A cozy sunlit veranda opens onto turquoise water and pink clouds. A linen curtain catches the breeze beside an empty reading chair." nightAlt="A warmly lit veranda opens onto a starry blue sky, pink clouds and the sea. A linen curtain catches the breeze beside an empty reading chair." sizes="(max-width: 760px) 100vw, 65vw" eager priority/><figcaption><span className="art-caption-symbol"><Sun size={25} weight="light"/></span><span>There is room<br/><em>to begin again.</em></span></figcaption></figure>
      </section>
      {garden.read.length > 0 && <GardenGrowth garden={garden} compact/>}
      {garden.last && <section className="seed-daily" aria-labelledby="daily-title"><div className="daily-side"><span className="seed-eyebrow"><Sun size={16}/> A seed for today</span><span>{new Date().toLocaleDateString(undefined, { month: 'long', day: 'numeric' })}</span><div className="daily-ornament" aria-hidden="true"><SceneImage scene={themeScene[todaySeed.theme]} sizes="130px"/></div></div><a className="daily-reading" href={seedUrl(today)}><span className="seed-number">Seed {String(today).padStart(3, '0')} · {getTheme(todaySeed.theme).title}</span><h2 id="daily-title">{todaySeed.title}</h2><p>{todaySeed.prompt}</p><span className="seed-text-link">Spend a moment with this <ArrowRight size={17}/></span></a><button className="daily-save seed-icon-button" onClick={() => onSave(today)} aria-label={garden.saved.includes(today) ? 'Unsave today’s seed' : 'Save today’s seed'} aria-pressed={garden.saved.includes(today)}><BookmarkSimple size={23} weight={garden.saved.includes(today) ? 'fill' : 'regular'}/></button></section>}

    </main> : route.view === 'explore' ? <main id="seeds-main" className="seed-explore"><div className="explore-intro"><div className="explore-intro-art" aria-hidden="true"><SceneImage scene="garden-path" sizes="200px" eager/></div><div className="explore-intro-copy"><span className="seed-eyebrow">The collection</span><h1 tabIndex={-1} data-route-heading>A seed for every season.</h1><p>Wander by theme, follow a question, or read in the book’s own order.</p></div><button className="seed-secondary" onClick={surprise}><Shuffle size={18}/>Find me a seed</button></div><div className="explore-tools"><label className="seed-search"><MagnifyingGlass size={21}/><input type="search" value={query} onChange={e => setQuery(e.target.value)} placeholder="Search hope, prayer, patience…" aria-label="Search the book and explanations"/>{query && <button className="seed-icon-button" aria-label="Clear search" onClick={() => setQuery('')}><X size={16}/></button>}</label><div className="theme-filters" aria-label="Filter by theme"><a href="#explore" aria-current={!route.theme ? 'true' : undefined}>All seeds</a>{themes.map(t => <a className={`tone-${t.id}`} key={t.id} href={`#explore?theme=${t.id}`} aria-current={route.theme === t.id ? 'true' : undefined}><ThemeIcon theme={t.id} size={17}/>{t.short}</a>)}</div></div>{route.theme && <div className={`explore-path-callout tone-${route.theme}`}><ThemeIcon theme={route.theme} size={28}/><div><strong>{getTheme(route.theme).title}</strong><p>{getTheme(route.theme).description}</p></div><a href={seedUrl(getTheme(route.theme).route[0], route.theme)}>Try the four-seed path <ArrowRight size={18}/></a></div>}<div className="explore-count"><span role="status">{filtered.length} {filtered.length === 1 ? 'seed' : 'seeds'}{query ? ` matching “${query}”` : ''}</span><span>In the book’s original order</span></div>{filtered.length ? <SeedIndex entries={filtered} garden={garden} onSave={onSave}/> : <div className="seed-empty"><Leaf size={42} weight="light"/><h2>No seeds found this time.</h2><p>Try a broader word, a seed number, or another theme.</p><button className="seed-secondary" onClick={() => { setQuery(''); window.location.hash = 'explore'; }}>Show all seeds</button></div>}</main> : route.view === 'garden' ? <main id="seeds-main" className="seed-garden"><div className="garden-intro"><span className="garden-illustration" aria-hidden="true"><SceneImage scene="flower-garden" sizes="(max-width: 760px) 120px, 200px" eager/></span><div><span className="seed-eyebrow">A place to return to</span><h1 tabIndex={-1} data-route-heading>My garden.</h1><p>The seeds you keep. The thoughts you make your own.</p></div><button className="seed-secondary" onClick={exportGarden} disabled={!garden.saved.length && !reflectedIds.length && !garden.read.length}><DownloadSimple size={18}/>Export my garden</button></div>{exportText !== null && <section className="garden-export" aria-label="Export preview"><div><h2>A copy of your garden</h2><button className="seed-icon-button" aria-label="Close export preview" onClick={() => setExportText(null)}><X size={19}/></button></div><label htmlFor="garden-export-text">Copy the text below, or download it as a file.</label><textarea id="garden-export-text" readOnly rows={8} value={exportText}/><button className="seed-secondary" onClick={downloadGarden}><DownloadSimple size={17}/>Download text file</button></section>}<GardenGrowth garden={garden}/><p className="garden-privacy">Your writing stays in this browser. Export a copy to keep it elsewhere; clearing browser data removes the local copy.</p><div className="garden-tabs" aria-label="Garden collection">{([{ id: 'saved', label: 'Saved seeds', count: garden.saved.length }, { id: 'notes', label: 'Reflections', count: reflectedIds.length }, { id: 'read', label: 'Read', count: garden.read.length }] as const).map(t => <button key={t.id} aria-pressed={gardenTab === t.id} onClick={() => { window.location.hash = `garden?tab=${t.id}`; }}>{t.label}<span>{t.count}</span></button>)}</div>{gardenSeeds.length ? gardenTab === 'notes' ? <div className="garden-notes">{gardenSeeds.map(s => <article key={s.id} className={`garden-note tone-${s.theme}`}><span className="seed-number">Seed {s.id} · {getTheme(s.theme).short}</span><a href={seedUrl(s.id, undefined, 'journal')}><h2>{s.title}</h2><ArrowUpRight size={20}/></a>{garden.notes[s.id]?.trim() && <p>{garden.notes[s.id]}</p>}{garden.intentions[s.id]?.trim() && <div><span>One small action{garden.followUps[s.id] === 'done' && <b className="garden-done"><Check size={13}/> Done</b>}</span><p>{garden.intentions[s.id]}</p></div>}<a className="seed-text-link" href={seedUrl(s.id, undefined, 'journal')}>Return to this reflection <ArrowRight size={15}/></a></article>)}</div> : <div className="seeds-grid">{gardenSeeds.map(s => <SeedCard key={s.id} seed={s} garden={garden} onSave={onSave}/>)}</div> : <div className="seed-empty"><Flower size={52} weight="light"/><h2>{gardenTab === 'saved' ? 'A little space, ready to grow.' : gardenTab === 'notes' ? 'Your own words belong here.' : 'Take it one seed at a time.'}</h2><p>{gardenTab === 'saved' ? 'Use the bookmark on any seed to keep it here.' : gardenTab === 'notes' ? 'Choose Reflect on any seed to write a thought or a small action.' : 'Mark a seed as read when you have spent time with it. There is no deadline.'}</p><a className="seed-primary" href={seedUrl(today)}>Begin with one seed <ArrowRight size={18}/></a></div>}</main> : route.view === 'about' ? <main id="seeds-main" className="seed-about"><span className="seed-eyebrow">The book & the companion</span><h1 tabIndex={-1} data-route-heading>Wisdom, with its roots intact.</h1><p className="about-lead"><em>Timeless Seeds of Advice</em>, compiled by B. B. Abdulla, brings together Quranic passages, Prophetic reports, sayings attributed to scholars, and contemporary reflections.</p><div className="about-layout"><div><h2>111 entries. Your own way through.</h2><p>All 111 numbered entries from the 2019 edition are here in full, with all 117 of the book’s source notes. You can read in order or choose one of six paths through related entries. The paths are added for this app.</p><h2>Know which voice you are reading.</h2><p>Each reading has an illustration and a simple explanation, followed by the complete book passage. Its Qur’an and hadith quotations, the compiler’s commentary, names, and source notes keep the wording printed in the PDF. Spelling and punctuation are kept too; only spacing and line wrapping change to fit the screen. The reading title, simple explanation, questions, and activities are separate additions for this app. They do not replace any quotation or offer a new translation.</p><h2>Read without needing another book open.</h2><p>The explanation introduces the people and stories involved, explains comparisons, and defines harder words. The source notes are copied from the book, rather than replaced with new attributions. A note’s presence does not mean this app has independently checked the report’s authenticity. Source notes start folded away; tap a note to open it. You can open the exact PDF page at any time.</p><h2>Space to reflect, without a score.</h2><p>Your bookmarks, read markers, reflections and intentions stay in your browser. There is no account, tracking service, streak or spiritual score. “My garden” is a collection you can return to, and you can export it as a text file.</p></div><aside><div className="about-book"><SceneImage scene="coastal-home" sizes="270px"/><span>B. B. Abdulla</span><strong>Timeless<br/>Seeds<br/><em>of Advice</em></strong><small>A reading companion</small></div><a className="seed-source-link" href={pdf} target="_blank" rel="noreferrer">Open the complete source PDF <ArrowUpRight size={17}/></a><p className="about-source-note">2019 title page · 252 PDF pages<br/>111 entries · Notes on pages 136–252</p></aside></div><details className="about-edition"><summary>Edition, source and illustration notes</summary><p>The PDF supplied for this companion carries a 2019 title page and a 2018 copyright notice. It permits sharing for personal, non-commercial purposes. The supplied PDF is retained unchanged. The same original text and notes are also available within each reading. Printing errors in the source have not been silently corrected.</p><p>Source page links use PDF page numbers, not the numbering of a different print or scanned edition. The earlier 108-page public scan was not used for final page references.</p><p>The gouache illustrations were created for this companion using image generation. The coastal homes, pink skies, and gardens are ordinary artistic settings for reading. They do not depict Paradise or an unseen reality. Illustrations are also additions for this app.</p><a href="https://kalamullah.com/Books/Timeless%20Seeds%20of%20Advice.pdf" target="_blank" rel="noreferrer">Original web location <ArrowUpRight size={14}/></a></details><a className="seed-primary" href="#explore">Explore the seeds <ArrowRight size={18}/></a></main> : <main id="seeds-main" className="seed-empty"><Plant size={50}/><h1 tabIndex={-1} data-route-heading>Let’s find your next seed.</h1><p>That reading could not be found. All 111 entries are in the collection.</p><a className="seed-primary" href="#explore">Open the collection <ArrowRight size={18}/></a></main>}
    <div className="seed-toast-region" role="status" aria-live="polite">{shareNotice && <div className="seed-toast"><Export size={20} aria-hidden="true"/><p><strong>Picture saved</strong>Find it in your downloads to share.</p><button className="seed-icon-button" aria-label="Dismiss" onClick={() => setShareNotice(false)}><X size={18}/></button></div>}{saveNotice && <div className="seed-toast"><BookmarkSimple size={20} weight="fill" aria-hidden="true"/><p><strong>Saved to My garden</strong>Kept on this device, ready when you come back.</p><a href="#garden?tab=saved" onClick={() => setSaveNotice(false)}>Open</a><button className="seed-icon-button" aria-label="Dismiss" onClick={() => setSaveNotice(false)}><X size={18}/></button></div>}</div>
    <footer className="seed-footer"><nav className="footer-links" aria-label="More"><a href="#explore">Browse all 111 seeds <ArrowRight size={14}/></a><a href="#about">About & sources <ArrowUpRight size={14}/></a><a href={`${import.meta.env.BASE_URL}${import.meta.env.DEV ? 'system' : ''}`}>The MindfulMod bookshelf <ArrowUpRight size={14}/></a></nav><p className="footer-credit"><Plant size={17} aria-hidden="true"/>All 111 readings come from <em>Timeless Seeds of Advice</em> by B. B. Abdulla.</p></footer>
  </div>;
}
