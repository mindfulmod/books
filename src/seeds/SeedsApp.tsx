import { useEffect, useMemo, useRef, useState, type Dispatch, type SetStateAction } from 'react';
import { ArrowLeft, ArrowRight, ArrowUpRight, BookmarkSimple, CaretDown, Export, Check, CheckCircle, DownloadSimple, Flower, HandHeart, Leaf, MagnifyingGlass, PencilSimple, Plant, Shuffle, Sparkle, Sun, Waves, X } from '@phosphor-icons/react';
import { assetUrl } from '../assetUrl';
import { getTheme, seeds, themes, type Seed, type ThemeId } from './content';
import BookPassage, { scrollToReadingPart } from './BookPassage';
import { dailySeedId, finishReading, formatGarden, gardenTabFor, loadGarden, localDay, saveGarden, type FollowUp, type Garden } from './state';
import { shareSeed } from './share';
import PracticeLab from './PracticeLab';
import { SceneImage, SeedIllustration, SeedThumbnail, themeScene } from './Artwork';
import { seedIllustrations } from './illustrations';
import SourceCredit from './SourceCredit';
import Journal from './Journal';
import { AppearanceControl, useAppearance } from './Appearance';
import { pathGuidance } from './pathGuidance';
import SeedHome from './SeedHome';
import ReadingContents from './ReadingContents';
import PathCollection from './PathCollection';
import VisualStory from './VisualStory';
import { visualStories } from './visualStories';
import { getPath, readingPaths, type PathId } from './paths';
import { matchesSeed, excerptFor, readingMinutes, searchNeedle } from './discovery';
import useReadingPlace from './useReadingPlace';
import useSeedRoute from './useSeedRoute';
import { seedUrl, type ReadingPart, type ReadingEntry } from './navigation';

const pdf = assetUrl('assets/timeless-seeds/source.pdf');
const icons = { hope: Sun, trust: Waves, presence: Leaf, return: Plant, gratitude: Flower, kindness: HandHeart };
const toggle = (list: number[], id: number) => list.includes(id) ? list.filter(v => v !== id) : [...list, id];

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
  const pathsDone = readingPaths.filter(t => t.route.every(id => read.has(id))).length;
  const actionsDone = Object.values(garden.followUps).filter(value => value === 'done').length;
  const reflections = `${reflected.size} ${reflected.size === 1 ? 'reflection' : 'reflections'}`;
  const paths = `${pathsDone} of ${readingPaths.length} paths complete${actionsDone ? ` · ${actionsDone} small ${actionsDone === 1 ? 'action' : 'actions'} done` : ''}`;
  if (compact) return <a className="garden-growth is-compact" href="#garden">
    <span className="growth-compact-copy"><span className="seed-eyebrow">Your garden</span><strong>{read.size} of {seeds.length} seeds read</strong><small>{reflections} · {paths}</small></span>
    <span className="growth-meter" aria-hidden="true"><span style={{ width: `${Math.max(2, read.size / seeds.length * 100)}%` }}/></span>
    <ArrowRight size={19}/>
  </a>;
  return <section className="garden-growth" aria-labelledby="growth-title">
    <div className="growth-summary"><span className="seed-eyebrow">Your progress</span><h2 id="growth-title"><strong>{read.size}</strong> of {seeds.length} seeds read</h2><p>{reflections} · {paths}</p></div>
    <div className="growth-bed" aria-hidden="true">{seeds.map(s => <a key={s.id} href={seedUrl(s.id)} tabIndex={-1} title={`Seed ${s.id}: ${s.title}`} className={`growth-plot tone-${s.theme}${reflected.has(s.id) ? ' is-flowering' : read.has(s.id) ? ' is-sprouted' : ''}`}/>)}</div>
    <ul className="growth-legend" aria-hidden="true"><li><span className="growth-plot"/>Not read yet</li><li><span className="growth-plot is-sprouted tone-kindness"/>Read</li><li><span className="growth-plot is-flowering tone-kindness"/>Reflected on</li></ul>
    <ol className="growth-paths" aria-label="Your paths">{readingPaths.map(t => {
      const done = t.route.filter(id => read.has(id)).length;
      const next = t.route.find(id => !read.has(id)) ?? t.route[0];
      return <li key={t.id} className={`tone-${t.theme}`}><a href={seedUrl(next, t.id)}><ThemeIcon theme={t.theme} size={20}/><span className="growth-path-title">{t.title}</span><span className="growth-path-dots" aria-hidden="true">{t.route.map(id => <span key={id} className={read.has(id) ? 'is-read' : undefined}/>)}</span><span className="growth-path-count">{done === t.route.length ? 'Complete' : `${done} of ${t.route.length}`}</span></a></li>;
    })}</ol>
  </section>;
}

function SearchExcerpt({ text, query }: { text: string; query: string }) {
  const needle = searchNeedle(query);
  const at = needle ? text.toLocaleLowerCase().indexOf(needle) : -1;
  return <>{at < 0 ? text : <>{text.slice(0, at)}<mark>{text.slice(at, at + needle.length)}</mark>{text.slice(at + needle.length)}</>}</>;
}
function SeedIndex({ entries, garden, onSave, query = '' }: { entries: Seed[]; garden: Garden; onSave: (id: number) => void; query?: string }) {
  return <ol className="seed-index visual-index" aria-label="Seeds in book order">{entries.map(seed => { const excerpt = excerptFor(seed, query); return <li key={seed.id} className={`tone-${seed.theme}`}>
    <a href={seedUrl(seed.id)}><SeedThumbnail seedId={seed.id}/><span className="index-entry"><span className="index-kicker">Seed {seed.id} · {readingMinutes(seed)} min</span><h2>{seed.title}</h2><span className="index-excerpt">{excerpt.from && <small>{excerpt.from}: </small>}<SearchExcerpt text={excerpt.text} query={query}/></span><span className="index-theme"><ThemeIcon theme={seed.theme} size={14}/>{getTheme(seed.theme).short}{garden.read.includes(seed.id) && <span><Check size={13}/> Read</span>}</span></span></a>
    <button className="seed-icon-button" aria-label={`${garden.saved.includes(seed.id) ? 'Unsave' : 'Save'} seed ${seed.id}`} aria-pressed={garden.saved.includes(seed.id)} onClick={() => onSave(seed.id)}><BookmarkSimple size={20} weight={garden.saved.includes(seed.id) ? 'fill' : 'regular'}/></button>
  </li>; })}</ol>;
}

type ReaderProps = { seed: Seed; garden: Garden; savedGarden: Garden | null; setGarden: Dispatch<SetStateAction<Garden>>; path?: PathId; initialPart?: ReadingPart; entry: ReadingEntry; storageError: boolean; intro: boolean; onIntroDone: () => void; onSaved: (wasSaved: boolean) => void; onShareSaved: () => void };
function Reader({ seed, garden, savedGarden, setGarden, path, initialPart, entry, storageError, intro, onIntroDone, onSaved, onShareSaved }: ReaderProps) {
  const { appearance } = useAppearance();
  const [status, setStatus] = useState('');
  const theme = getTheme(seed.theme);
  const pathTheme = getPath(path);
  const sequence = pathTheme?.route.includes(seed.id) ? pathTheme.route : seeds.map(s => s.id);
  const index = sequence.indexOf(seed.id);
  const nextId = index < sequence.length - 1 ? sequence[index + 1] : null;
  const minutes = readingMinutes(seed);
  const isSaved = garden.saved.includes(seed.id);
  const isRead = garden.read.includes(seed.id);
  const labId = `practice-${seed.id}`;
  const jump = (id: string) => {
    requestAnimationFrame(() => scrollToReadingPart(id));
  };
  const save = () => { setGarden(old => ({ ...old, saved: toggle(old.saved, seed.id) })); setStatus(isSaved ? 'Removed from your saved seeds.' : 'Saved to your garden.'); onSaved(isSaved); };
  const setNote = (value: string) => setGarden(old => ({ ...old, notes: { ...old.notes, [seed.id]: value } }));
  const setIntention = (value: string) => setGarden(old => {
    // A new or changed plan is dated today, so a later visit can ask how it went.
    const { [seed.id]: _answered, ...followUps } = old.followUps;
    const { [seed.id]: _day, ...planned } = old.planned;
    const next = { ...old, intentions: { ...old.intentions, [seed.id]: value }, followUps, planned: value.trim() ? { ...planned, [seed.id]: localDay() } : planned };
    return next;
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
  const markUnread = () => { setGarden(old => finishReading(old, seed.id, false)); setStatus('Reading marked unfinished.'); };
  const markFinished = () => { setGarden(old => finishReading(old, seed.id)); setStatus('Reading finished.'); };
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
  useReadingPlace(seed.id, entry, !initialPart ? undefined : initialPart === 'journal' ? 'seed-writing' : initialPart === 'illustration' ? 'seed-illustration' : labId);
  const pathComplete = pathTheme?.route.every(id => garden.read.includes(id));
  const sections = [
    ...(seedIllustrations[seed.id] ? [{ id: 'seed-illustration', title: 'The illustration', detail: 'A picture to remember it by' }] : []),
    ...(visualStories[seed.id] ? [{ id: 'seed-visual-story', title: 'Look a little closer', detail: 'An optional visual story' }] : []),
    { id: 'seed-explanation', title: 'A simple explanation', detail: 'Reading help for this seed' },
    { id: 'seed-book', title: 'In the original words', detail: 'The passage, word for word' },
    ...(seed.source.notes.length ? [{ id: 'seed-source-notes', title: 'Source notes', detail: `${seed.source.notes.length} ${seed.source.notes.length === 1 ? 'note' : 'notes'} from the book` }] : []),
    { id: 'seed-reflection', title: 'A moment to reflect', detail: 'Think about a question, or write if you wish' },
    { id: labId, title: 'Try an activity', detail: 'An optional way to put advice into practice' },
  ];
  return <main id="seeds-main" className={`seed-reader tone-${seed.theme} ${minutes >= 3 ? 'long-reading' : 'short-reading'}`}>
    <div className="reader-progress" aria-hidden="true"><span/></div>
    <div className="reader-topbar"><a href="#today"><ArrowLeft size={17}/>Home</a><AppearanceControl reader/></div>
    <div className="reader-layout"><aside className="reader-aside"><span className="seed-eyebrow">A seed of {theme.short.toLowerCase()}</span><h2>{pathTheme?.title || theme.title}</h2><p>{pathTheme?.description || theme.description}</p><div className="reader-path-label">{pathTheme ? 'Along this path' : 'A path to explore'}</div><ol>{(pathTheme || theme).route.map((id, i) => <li key={id}><a aria-current={id === seed.id ? 'page' : undefined} href={seedUrl(id, path || seed.theme)}><span>{garden.read.includes(id) ? <Check size={13}/> : `0${i + 1}`}</span>{seeds[id - 1].title}</a></li>)}</ol><a className="reader-other-paths" href="#explore">Browse the collection <ArrowRight size={15}/></a></aside>
    <article className="reader-article" ref={sheet}>{intro && <aside className="reader-welcome" aria-labelledby="reader-welcome-title"><span className="seed-eyebrow" id="reader-welcome-title"><Plant size={16} weight="light"/>New here?</span><p><strong>Timeless Seeds</strong> is a reading companion to B. B. Abdulla’s collection of Quranic passages, hadith, and advice from Muslim scholars and writers. Each seed starts with a simple explanation, then the original words, then a question to carry into your day.</p><div className="reader-welcome-actions"><button className="seed-primary" onClick={onIntroDone}>Got it, start reading</button><a className="seed-text-link" href="#today">See the home page <ArrowRight size={16}/></a></div></aside>}<div className="reader-meta"><div className="reader-location"><span className="seed-eyebrow">Seed {seed.id} of {seeds.length}</span><span className="reader-minutes">About {minutes} min</span>{pathTheme && <span className="reader-path-progress">{pathTheme.title} · {index + 1} of {sequence.length}</span>}</div><div className="reader-meta-actions"><button className="seed-icon-button reader-desktop-save" onClick={save} aria-label={isSaved ? 'Unsave this seed' : 'Save this seed'} aria-pressed={isSaved}><BookmarkSimple size={22} weight={isSaved ? 'fill' : 'regular'}/></button></div></div>
      <h1 tabIndex={-1} data-route-heading>{seed.title}</h1>
      <p className="reader-takeaway">{seed.takeaway}</p>
      <SourceCredit credit={seed.credit} jump={jump}/>
      <SeedIllustration seedId={seed.id} leading/>
      <VisualStory seedId={seed.id}/>
      <div className="reader-reading">
        <section className="seed-explanation" id="seed-explanation" tabIndex={-1} aria-labelledby="seed-explanation-heading"><h2 id="seed-explanation-heading">A simple explanation</h2>{seed.reading.split('\n\n').map((paragraph, i) => <p key={i} className="reader-prose">{paragraph}</p>)}</section>
        <BookPassage seed={seed}/>
        <Journal seed={seed} garden={garden} savedGarden={savedGarden} storageError={storageError} onNote={setNote} onIntention={setIntention}/>
        <details className="reader-disclosure reader-activity" id={labId}><summary><Sparkle size={18}/><span>Try a reflection activity <small>Optional · A few minutes</small></span><CaretDown size={17}/></summary><div className="reader-activity-body"><PracticeLab theme={seed.theme} seedId={seed.id}/></div></details>
      </div>
      <div className="reader-completion"><div className="reader-finish"><div><strong>{isRead ? 'You’ve finished this reading.' : 'Ready to finish this reading?'}</strong><p>{isRead ? 'Take what helps into your day.' : 'Mark it finished when you’re ready. Your place is kept as you read.'}</p></div>{isRead ? <button className="reader-unmark" onClick={markUnread}>Mark unfinished</button> : <button className="seed-secondary" onClick={markFinished}><CheckCircle size={18}/>Finish reading</button>}</div>
        {pathTheme && (nextId ? <p className="path-transition">{pathTheme.situation ? pathTheme.steps[index + 1] : pathGuidance[seed.id]?.onward}</p> : <div className="path-ending"><h2>{pathComplete ? 'You’ve finished this path.' : 'A thought to carry with you'}</h2><p>{pathTheme.closing}</p>{!pathComplete && <small>You can return to any unfinished reading whenever you wish.</small>}</div>)}
        {nextId ? <a className="reader-next" href={seedUrl(nextId, path)}><span><small>{pathTheme ? `Next on this path · ${index + 2} of ${sequence.length}` : `Next seed · ${nextId} of ${seeds.length}`}</small>{seeds[nextId - 1].title}</span><ArrowRight size={20}/></a>
          : <a className="reader-next" href={path ? '#today' : '#garden'}><span><small>{path ? 'What do you need next?' : 'You’ve reached the final seed'}</small>{path ? 'Return to the paths' : 'Return to your garden'}</span><ArrowRight size={20}/></a>}
        <div className="reader-completion-meta"><button className="reader-unmark" onClick={share} disabled={sharing}>{sharing ? 'Preparing picture…' : 'Share this seed'}</button><a className="seed-text-link" href="#today">Back home <ArrowRight size={16}/></a></div>
        <span className="seed-sr-only" role="status">{status}</span></div>
      {index > 0 && <nav className="reader-pagination" aria-label="Previous reading"><a href={seedUrl(sequence[index - 1], path)}><ArrowLeft size={18}/><span><small>Previous seed</small>{seeds[sequence[index - 1] - 1].title}</span></a><span/></nav>}
    </article></div>
    <nav className="reader-thumbbar" aria-label="Quick reading controls">
      <img className="reader-book-surface" src={assetUrl(`assets/timeless-seeds/open-book-edge${appearance === 'starlight' ? '-starlight' : ''}.svg`)} alt="" aria-hidden="true"/>
      {index > 0 ? <a href={seedUrl(sequence[index - 1], path)} aria-label="Previous seed"><ArrowLeft size={21}/><span>Previous</span></a> : <button disabled aria-label="Previous seed"><ArrowLeft size={21}/><span>Previous</span></button>}
      <button className="reader-book-save" onClick={save} aria-label={isSaved ? 'Unsave this seed' : 'Save this seed'} aria-pressed={isSaved}><BookmarkSimple size={21} weight={isSaved ? 'fill' : 'regular'}/><span>{isSaved ? 'Saved' : 'Save'}</span></button>
      <ReadingContents seed={seed} path={path} garden={garden} sections={sections}/>
      <button className="reader-book-journal" aria-label="Reflect on this seed" onClick={() => jump('seed-reflection')}><PencilSimple size={21}/><span>Reflect</span></button>
      <a href={index < sequence.length - 1 ? seedUrl(sequence[index + 1], path) : path ? '#today' : '#garden'} aria-label={index < sequence.length - 1 ? 'Next seed' : path ? 'Return to the paths' : 'Return to your garden'}><ArrowRight size={21}/><span>{index < sequence.length - 1 ? 'Next' : path ? 'Paths' : 'Garden'}</span></a>
    </nav>

  </main>;
}

export default function SeedsApp() {
  const { route, navigate, onLinkClick } = useSeedRoute();
  const [initial] = useState(loadGarden);
  const [garden, setGarden] = useState<Garden>(initial.garden);
  const [storageError, setStorageError] = useState(initial.error);
  const [savedGarden, setSavedGarden] = useState<Garden | null>(initial.error ? null : initial.garden);
  const [query, setQuery] = useState('');
  const [exportText, setExportText] = useState<string | null>(null);
  const gardenTab = gardenTabFor(garden, route.gardenTab);
  const [today, setToday] = useState(() => dailySeedId());
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
  // Ask once, on a later day, whether a planned small action happened.
  const [answered, setAnswered] = useState<{ id: number; value: FollowUp } | null>(null);
  const answer = (id: number, value: FollowUp) => { setAnswered({ id, value }); setGarden(old => ({ ...old, followUps: { ...old.followUps, [id]: value } })); };
  useEffect(() => {
    const refreshDay = () => setToday(dailySeedId());
    document.addEventListener('visibilitychange', refreshDay);
    return () => document.removeEventListener('visibilitychange', refreshDay);
  }, []);
  useEffect(() => {
    const saved = saveGarden(garden, !initial.error);
    if (saved) setSavedGarden(garden);
    setStorageError(!saved);
  }, [garden, initial.error]);
  useEffect(() => {
    document.title = `${selected ? `${selected.title} · ` : ''}Timeless Seeds of Advice · MindfulMod`;
    if (selected) {
      const lastPath = route.path && getPath(route.path)?.route.includes(selected.id) ? route.path : null;
      setGarden(old => old.last === selected.id && old.lastPath === lastPath ? old : { ...old, last: selected.id, lastPath });
      return; // Reader restores its own position, including on a full reload.
    }
    window.scrollTo({ top: 0, behavior: 'instant' });
    const frame = requestAnimationFrame(() => document.querySelector<HTMLElement>('[data-route-heading]')?.focus({ preventScroll: true }));
    return () => cancelAnimationFrame(frame);
  }, [route.view, route.id, route.part, route.path, route.visit, selected]);

  const filtered = useMemo(() => {
    return seeds.filter(s => (!route.theme || s.theme === route.theme) && matchesSeed(s, query));
  }, [query, route.theme]);
  const reflectedIds = seeds.filter(s => garden.notes[s.id]?.trim() || garden.intentions[s.id]?.trim()).map(s => s.id);
  const actionIds = seeds.filter(s => garden.intentions[s.id]?.trim()).map(s => s.id);
  const gardenSeeds = seeds.filter(s => (gardenTab === 'actions' ? actionIds : gardenTab === 'saved' ? garden.saved : gardenTab === 'read' ? garden.read : reflectedIds).includes(s.id));

  const exportGarden = () => { setExportText(formatGarden(garden, seeds)); requestAnimationFrame(() => scrollToReadingPart('garden-export')); };
  const downloadGarden = () => {
    const text = exportText || formatGarden(garden, seeds);
    const link = document.createElement('a');
    const url = URL.createObjectURL(new Blob([text], { type: 'text/plain;charset=utf-8' }));
    link.href = url; link.download = 'my-timeless-seeds-garden.txt'; document.body.appendChild(link); link.click(); link.remove(); setTimeout(() => URL.revokeObjectURL(url), 1000);
  };
  const surprise = () => {
    const candidates = seeds.filter(s => !garden.read.includes(s.id));
    const pool = candidates.length ? candidates : seeds;
    navigate(seedUrl(pool[Math.floor(Math.random() * pool.length)].id));
  };
  return <div onClick={onLinkClick} className={`seeds-app${route.view === 'reader' && selected ? ' is-reading' : ''}`}>
    <div className="seed-atmosphere" aria-hidden="true"><SceneImage scene="island-sky" sizes="(max-width: 760px) 1500px, 2000px" eager/></div>
    <a className="seed-skip" href="#seeds-main" onClick={e => { e.preventDefault(); const main = document.getElementById('seeds-main'); main?.setAttribute('tabindex', '-1'); main?.focus(); }}>Skip to content</a>
    {!(route.view === 'reader' && selected) && <header className={`seed-header${showNav ? '' : ' is-first-visit'}`}><a href="#today" className="seed-brand" aria-label="Timeless Seeds of Advice home"><span className="seed-brand-icon"><Plant size={29} weight="light"/></span><span>Timeless Seeds<small>OF ADVICE</small></span></a>{showNav && <nav aria-label="Main navigation"><a href="#today" aria-current={route.view === 'today' ? 'page' : undefined}>Today</a><a href="#explore" aria-current={route.view === 'explore' ? 'page' : undefined}>All seeds</a><a className="garden-nav" href="#garden" aria-current={route.view === 'garden' ? 'page' : undefined}><BookmarkSimple size={17}/>My garden{garden.saved.length > 0 && <span>{garden.saved.length}</span>}</a></nav>}<AppearanceControl iconOnly/></header>}
    {storageError && <p className="storage-warning" role="status">Saving in this browser is unavailable. You can still read and write here; export your garden before leaving.</p>}
    {route.view === 'reader' && selected ? <Reader key={route.visit} seed={selected} garden={garden} savedGarden={savedGarden} initialPart={route.part} entry={route.entry} setGarden={setGarden} path={route.path && getPath(route.path)?.route.includes(selected.id) ? route.path : undefined} storageError={storageError} intro={introSeed === selected.id} onIntroDone={finishIntro} onSaved={noteSave} onShareSaved={() => setShareNotice(true)}/> : route.view === 'today' ? <SeedHome garden={garden} today={today} answered={answered} answer={answer} onSave={onSave}/> : route.view === 'explore' ? <main id="seeds-main" className="seed-explore"><div className="explore-intro"><div className="explore-intro-art" aria-hidden="true"><SceneImage scene="garden-path" sizes="200px" eager/></div><div className="explore-intro-copy"><span className="seed-eyebrow">The collection</span><h1 tabIndex={-1} data-route-heading>A seed for every season.</h1><p>Wander by theme, follow a question, or read in the book’s own order.</p></div><button className="seed-secondary" onClick={surprise}><Shuffle size={18}/>Find me a seed</button></div><PathCollection key={String(route.paths)} garden={garden} expanded={route.paths}/><div className="explore-tools"><label className="seed-search"><MagnifyingGlass size={21}/><input type="search" value={query} onChange={e => setQuery(e.target.value)} placeholder="Search hope, prayer, patience…" aria-label="Search the book and explanations"/>{query && <button className="seed-icon-button" aria-label="Clear search" onClick={() => setQuery('')}><X size={16}/></button>}</label><div className="theme-filters" aria-label="Filter by theme"><a href="#explore" aria-current={!route.theme ? 'true' : undefined}>All seeds</a>{themes.map(t => <a className={`tone-${t.id}`} key={t.id} href={`#explore?theme=${t.id}`} aria-current={route.theme === t.id ? 'true' : undefined}><ThemeIcon theme={t.id} size={17}/>{t.short}</a>)}</div></div>{route.theme && <div className={`explore-path-callout tone-${route.theme}`}><ThemeIcon theme={route.theme} size={28}/><div><strong>{getTheme(route.theme).title}</strong><p>{getTheme(route.theme).description}</p></div><a href={seedUrl(getTheme(route.theme).route[0], route.theme)}>Try the four-seed path <ArrowRight size={18}/></a></div>}<div className="explore-count"><span role="status">{filtered.length} {filtered.length === 1 ? 'seed' : 'seeds'}{query ? ` matching “${query}”` : ''}</span></div>{filtered.length ? <SeedIndex entries={filtered} garden={garden} onSave={onSave} query={query}/> : <div className="seed-empty"><Leaf size={42} weight="light"/><h2>No seeds found this time.</h2><p>Try a broader word, a seed number, or another theme.</p><button className="seed-secondary" onClick={() => { setQuery(''); window.location.hash = 'explore'; }}>Show all seeds</button></div>}</main> : route.view === 'garden' ? <main id="seeds-main" className="seed-garden"><div className="garden-intro"><span className="garden-illustration" aria-hidden="true"><SceneImage scene="flower-garden" sizes="(max-width: 760px) 120px, 200px" eager/></span><div><span className="seed-eyebrow">A place to return to</span><h1 tabIndex={-1} data-route-heading>My garden.</h1><p>The seeds you keep. The thoughts you make your own.</p></div></div>{exportText !== null && <section className="garden-export" id="garden-export" tabIndex={-1} aria-label="Export preview"><div><h2>A copy of your garden</h2><button className="seed-icon-button" aria-label="Close export preview" onClick={() => setExportText(null)}><X size={19}/></button></div><label htmlFor="garden-export-text">Copy the text below, or download it as a file.</label><textarea id="garden-export-text" readOnly rows={8} value={exportText}/><button className="seed-secondary" onClick={downloadGarden}><DownloadSimple size={17}/>Download text file</button></section>}<div className="garden-tabs" aria-label="Garden collection">{([{ id: 'saved', label: 'Saved', count: garden.saved.length }, { id: 'notes', label: 'Reflections', count: reflectedIds.length }, { id: 'actions', label: 'Actions', count: actionIds.length }] as const).map(t => <button key={t.id} aria-pressed={gardenTab === t.id} onClick={() => { window.location.hash = `garden?tab=${t.id}`; }}>{t.label}<span>{t.count}</span></button>)}</div>{gardenTab === 'read' && <h2 className="garden-finished-heading">Finished readings</h2>}{gardenSeeds.length ? gardenTab === 'notes' || gardenTab === 'actions' ? <div className="garden-notes">{gardenSeeds.map(s => <article key={s.id} className={`garden-note tone-${s.theme}`}><span className="seed-number">Seed {s.id} · {getTheme(s.theme).short}</span><a href={seedUrl(s.id, undefined, 'journal')}><h2>{s.title}</h2><ArrowUpRight size={20}/></a>{gardenTab !== 'actions' && garden.notes[s.id]?.trim() && <p>{garden.notes[s.id]}</p>}{garden.intentions[s.id]?.trim() && <div><span>One small action{garden.followUps[s.id] === 'done' && <b className="garden-done"><Check size={13}/> Done</b>}</span><p>{garden.intentions[s.id]}</p><button className="reader-unmark" onClick={() => setGarden(old => ({ ...old, followUps: { ...old.followUps, [s.id]: old.followUps[s.id] === 'done' ? 'later' : 'done' } }))}>{garden.followUps[s.id] === 'done' ? 'Mark not done yet' : 'I did this'}</button></div>}<a className="seed-text-link" href={seedUrl(s.id, undefined, 'journal')}>Return to this reflection <ArrowRight size={15}/></a></article>)}</div> : <div className="seeds-grid">{gardenSeeds.map(s => <SeedCard key={s.id} seed={s} garden={garden} onSave={onSave}/>)}</div> : <div className="seed-empty"><Flower size={52} weight="light"/><h2>{gardenTab === 'saved' ? 'A little space, ready to grow.' : gardenTab === 'notes' ? 'Your own words belong here.' : gardenTab === 'actions' ? 'One small step is enough.' : 'Take it one seed at a time.'}</h2><p>{gardenTab === 'saved' ? 'Use the bookmark on any seed to keep it here.' : gardenTab === 'notes' || gardenTab === 'actions' ? 'Choose Reflect on any seed to write a thought or a small action.' : 'Choose Finish reading at the end of a seed when you’re ready. There is no deadline.'}</p><a className="seed-primary" href={seedUrl(today)}>Begin with one seed <ArrowRight size={18}/></a></div>}<div className="garden-tools"><details className="garden-progress-disclosure"><summary>Reading progress & paths<CaretDown size={17}/></summary><GardenGrowth garden={garden}/><a className="seed-text-link" href="#garden?tab=read">View {garden.read.length} finished readings <ArrowRight size={16}/></a></details><p className="garden-privacy">Your writing stays in this browser. Export a copy to keep it elsewhere; clearing browser data removes the local copy.</p><button className="seed-secondary" onClick={exportGarden} disabled={!garden.saved.length && !reflectedIds.length && !garden.read.length}><DownloadSimple size={18}/>Export my garden</button></div></main> : route.view === 'about' ? <main id="seeds-main" className="seed-about"><span className="seed-eyebrow">The book & the companion</span><h1 tabIndex={-1} data-route-heading>Wisdom, with its roots intact.</h1><p className="about-lead"><em>Timeless Seeds of Advice</em>, compiled by B. B. Abdulla, brings together Quranic passages, Prophetic reports, sayings attributed to scholars, and contemporary reflections.</p><div className="about-layout"><div><h2>111 entries. Your own way through.</h2><p>All 111 numbered entries from the 2019 edition are here in full, with all 117 of the book’s source notes. You can read in order or choose a feeling-based path or a path for a situation you’re going through. The paths are added for this app.</p><h2>Know which voice you are reading.</h2><p>Each reading has an illustration and a simple explanation, followed by the complete book passage. Its Qur’an and hadith quotations, the compiler’s commentary, names, and source notes keep the wording printed in the PDF. Spelling and punctuation are kept too; only spacing and line wrapping change to fit the screen. The reading title, simple explanation, questions, and activities are separate additions for this app. They do not replace any quotation or offer a new translation.</p><h2>Read without needing another book open.</h2><p>The explanation introduces the people and stories involved, explains comparisons, and defines harder words. The source notes are copied from the book, rather than replaced with new attributions. A note’s presence does not mean this app has independently checked the report’s authenticity. Source notes start folded away; tap a note to open it. You can open the exact PDF page at any time.</p><h2>Space to reflect, without a score.</h2><p>Your bookmarks, read markers, reflections and intentions stay in your browser. There is no account, tracking service, streak or spiritual score. “My garden” is a collection you can return to, and you can export it as a text file.</p></div><aside><div className="about-book"><SceneImage scene="coastal-home" sizes="270px"/><span>B. B. Abdulla</span><strong>Timeless<br/>Seeds<br/><em>of Advice</em></strong><small>A reading companion</small></div><a className="seed-source-link" href={pdf} target="_blank" rel="noreferrer">Open the complete source PDF <ArrowUpRight size={17}/></a><p className="about-source-note">2019 title page · 252 PDF pages<br/>111 entries · Notes on pages 136–252</p></aside></div><details className="about-edition"><summary>Edition, source and illustration notes</summary><p>The PDF supplied for this companion carries a 2019 title page and a 2018 copyright notice. It permits sharing for personal, non-commercial purposes. The supplied PDF is retained unchanged. The same original text and notes are also available within each reading. Printing errors in the source have not been silently corrected.</p><p>Source page links use PDF page numbers, not the numbering of a different print or scanned edition. The earlier 108-page public scan was not used for final page references.</p><p>The gouache illustrations were created for this companion using image generation. The coastal homes, pink skies, and gardens are ordinary artistic settings for reading. They do not depict Paradise or an unseen reality. Illustrations are also additions for this app.</p><a href="https://kalamullah.com/Books/Timeless%20Seeds%20of%20Advice.pdf" target="_blank" rel="noreferrer">Original web location <ArrowUpRight size={14}/></a></details><a className="seed-primary" href="#explore">Explore the seeds <ArrowRight size={18}/></a></main> : <main id="seeds-main" className="seed-empty"><Plant size={50}/><h1 tabIndex={-1} data-route-heading>Let’s find your next seed.</h1><p>That reading could not be found. All 111 entries are in the collection.</p><a className="seed-primary" href="#explore">Open the collection <ArrowRight size={18}/></a></main>}
    <div className="seed-toast-region" role="status" aria-live="polite">{shareNotice && <div className="seed-toast"><Export size={20} aria-hidden="true"/><p><strong>Picture saved</strong>Find it in your downloads to share.</p><button className="seed-icon-button" aria-label="Dismiss" onClick={() => setShareNotice(false)}><X size={18}/></button></div>}{saveNotice && <div className="seed-toast"><BookmarkSimple size={20} weight="fill" aria-hidden="true"/><p><strong>Saved to My garden</strong>Kept on this device, ready when you come back.</p><a href="#garden?tab=saved" onClick={() => setSaveNotice(false)}>Open</a><button className="seed-icon-button" aria-label="Dismiss" onClick={() => setSaveNotice(false)}><X size={18}/></button></div>}</div>
    <footer className="seed-footer"><nav className="footer-links" aria-label="More"><a href="#explore">Browse all 111 seeds <ArrowRight size={14}/></a><a href="#about">About & sources <ArrowUpRight size={14}/></a><a href={`${import.meta.env.BASE_URL}${import.meta.env.DEV ? 'system' : ''}`}>The MindfulMod bookshelf <ArrowUpRight size={14}/></a></nav><p className="footer-credit"><Plant size={17} aria-hidden="true"/>All 111 readings come from <em>Timeless Seeds of Advice</em> by B. B. Abdulla.</p></footer>
  </div>;
}
