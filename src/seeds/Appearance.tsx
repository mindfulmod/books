import { createContext, useCallback, useContext, useEffect, useId, useRef, useState, type ReactNode } from 'react';
import { flushSync } from 'react-dom';
import { Check, DeviceMobile, MoonStars, Sun, X } from '@phosphor-icons/react';
import { assetUrl } from '../assetUrl';
import { READING_KEY, loadReading, validateReading, type ReadingPreferences } from './readingPreferences';
import { APPEARANCE_KEY, PICTURES_KEY, illustrationPath, loadPictures, loadPreference, parsePreference, resolveAppearance, scenePath, type Appearance, type AppearancePreference } from './appearanceState';

const AppearanceContext = createContext<{
  appearance: Appearance; preference: AppearancePreference; pending: boolean; message: string;
  choose: (preference: AppearancePreference) => void;
  reading: ReadingPreferences; readingMessage: string; changeReading: (change: Partial<ReadingPreferences>) => void;
  pictures: boolean; pictureMessage: string; choosePictures: (visible: boolean) => void;
}>({ appearance: 'day', preference: 'device', pending: false, message: '', choose: () => {}, reading: { size: 1, spacing: 'comfortable', contrast: false }, readingMessage: '', changeReading: () => {}, pictures: true, pictureMessage: '', choosePictures: () => {} });
export const useAppearance = () => useContext(AppearanceContext);

async function prepareVisibleArtwork(appearance: Appearance) {
  const images = [...document.querySelectorAll<HTMLImageElement>('img[data-coastal-scene], img[data-seed-art-day]')];
  const requests = new Map<string, Promise<void>>();
  for (const current of images) {
    const rect = current.getBoundingClientRect();
    if (!rect.width || !rect.height || rect.bottom < 0 || rect.top > innerHeight) continue;
    const prefix = appearance === 'starlight' ? current.dataset.seedArtStarlight : current.dataset.seedArtDay;
    const source = (width: number) => assetUrl(prefix ? illustrationPath(prefix, width) : scenePath(current.dataset.coastalScene!, width, appearance));
    const key = `${source(960)}:${current.sizes}`;
    if (requests.has(key)) continue;
    const image = new Image();
    image.sizes = current.sizes;
    image.srcset = [480, 960, 1440].map(width => `${source(width)} ${width}w`).join(', ');
    image.src = source(960);
    requests.set(key, image.decode());
  }
  let timeout: ReturnType<typeof setTimeout> | undefined;
  try {
    await Promise.race([Promise.all(requests.values()), new Promise((_, reject) => {
      timeout = setTimeout(() => reject(new Error('Artwork took too long to load.')), 12000);
    })]);
  } finally { clearTimeout(timeout); }
}

export function AppearanceProvider({ children }: { children: ReactNode }) {
  const [preference, setPreference] = useState(loadPreference);
  const [appearance, setAppearance] = useState<Appearance>(() =>
    document.documentElement.dataset.seedAppearance === 'starlight' ? 'starlight' : 'day');
  const [pending, setPending] = useState(false);
  const [message, setMessage] = useState('');
  const [pictures, setPictures] = useState(loadPictures);
  const [reading, setReading] = useState(loadReading);
  const [readingMessage, setReadingMessage] = useState('');
  const changeReading = (change: Partial<ReadingPreferences>) => {
    const next = validateReading({ ...reading, ...change });
    try { localStorage.setItem(READING_KEY, JSON.stringify(next)); setReadingMessage(''); }
    catch { setReadingMessage('Reading settings changed for this visit. This browser could not save them.'); }
    setReading(next);
  };
  useEffect(() => {
    const root = document.documentElement;
    root.dataset.readingSize = String(reading.size);
    root.dataset.readingSpacing = reading.spacing;
    root.dataset.readingContrast = reading.contrast ? 'strong' : 'normal';
  }, [reading]);
  const [pictureMessage, setPictureMessage] = useState('');
  const choosePictures = (visible: boolean) => {
    setPictures(visible);
    setPictureMessage('');
    try { localStorage.setItem(PICTURES_KEY, visible ? 'shown' : 'hidden'); }
    catch { setPictureMessage('Picture preference changed for this visit. This browser could not save it.'); }
  };
  const selected = useRef(preference);
  const applied = useRef(appearance);
  const generation = useRef(0);
  const apply = useCallback(async (next: AppearancePreference, persist: boolean) => {
    selected.current = next;
    setPreference(next);
    const ticket = ++generation.current;
    const resolved = resolveAppearance(next, matchMedia('(prefers-color-scheme: dark)').matches);
    setMessage('');
    setPending(resolved !== applied.current);
    try {
      if (resolved !== applied.current) await prepareVisibleArtwork(resolved);
      if (ticket !== generation.current) return;
      const root = document.documentElement;
      root.dataset.seedAppearance = resolved;
      root.style.colorScheme = resolved === 'starlight' ? 'dark' : 'light';
      document.querySelector('meta[name="theme-color"]')?.setAttribute('content', resolved === 'starlight' ? '#252d45' : '#fafbf6');
      applied.current = resolved;
      flushSync(() => { setAppearance(resolved); setPending(false); });
      if (persist) {
        try { localStorage.setItem(APPEARANCE_KEY, next); }
        catch { setMessage('Appearance changed for now. This browser could not save your choice.'); }
      }
    } catch {
      if (ticket !== generation.current) return;
      setPending(false);
      setMessage('The new scenery could not load. Check your connection, then try again.');
    }
  }, []);
  useEffect(() => {
    const media = matchMedia('(prefers-color-scheme: dark)');
    const onDevice = () => { if (selected.current === 'device') void apply('device', false); };
    const onStorage = (event: StorageEvent) => {
      if (event.key === APPEARANCE_KEY || event.key === null) void apply(parsePreference(event.newValue), false);
      if (event.key === PICTURES_KEY || event.key === null) setPictures(loadPictures());
      if (event.key === READING_KEY || event.key === null) setReading(loadReading());
    };
    media.addEventListener('change', onDevice);
    window.addEventListener('storage', onStorage);
    return () => { ++generation.current; media.removeEventListener('change', onDevice); window.removeEventListener('storage', onStorage); };
  }, [apply]);
  return <AppearanceContext.Provider value={{ appearance, preference, pending, message, choose: next => void apply(next, true), pictures, pictureMessage, choosePictures, reading, readingMessage, changeReading }}>{children}</AppearanceContext.Provider>;
}

const choices = [
  { value: 'day', title: 'Day', description: 'Sunshine, pink skies and warm paper.', Icon: Sun },
  { value: 'starlight', title: 'Starlight', description: 'The same place, beneath the stars.', Icon: MoonStars },
  { value: 'device', title: 'Device', description: 'Follow your device’s light or dark setting.', Icon: DeviceMobile },
] as const;

export function AppearanceControl({ reader = false, iconOnly = false }: { reader?: boolean; iconOnly?: boolean }) {
  const { appearance, preference, pending, message, choose, pictures, pictureMessage, choosePictures, reading, readingMessage, changeReading } = useAppearance();
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const titleId = useId();
  const Icon = appearance === 'starlight' ? MoonStars : Sun;
  return <div className={`seed-appearance${iconOnly ? ' is-icon-only' : ''}`}>
    <button ref={trigger} className="appearance-trigger" aria-label={reader ? 'Reading settings' : `Appearance: ${appearance === 'starlight' ? 'Starlight' : 'Day'}`} aria-haspopup="dialog" onClick={() => dialog.current?.showModal()}><Icon size={iconOnly ? 20 : 18}/><span className={iconOnly ? 'seed-sr-only' : undefined}>{reader ? 'Reading settings' : 'Appearance'}</span></button>
    <dialog ref={dialog} className="appearance-dialog" aria-labelledby={titleId} onClose={() => trigger.current?.focus({ preventScroll: true })} onClick={event => { if (event.target === dialog.current) dialog.current.close(); }}>
      <div className="appearance-heading"><h2 id={titleId}>{reader ? 'Reading settings' : 'Your light, your pace.'}</h2><button className="seed-icon-button" aria-label="Close appearance" onClick={() => dialog.current?.close()}><X size={20}/></button></div>
      <p>A different light. The same peaceful place.</p>
      <fieldset><legend className="seed-sr-only">Appearance</legend>{choices.map(({ value, title, description, Icon }) => <label key={value} className="appearance-choice">
        <input type="radio" name="seed-appearance" value={value} checked={preference === value} onChange={() => choose(value)}/><Icon size={24}/><span><strong>{title}</strong><small>{description}</small></span><Check size={18} className="appearance-check"/>
      </label>)}</fieldset>
      <p className="appearance-status" role="status">{pending ? 'Preparing your scenery…' : message || (preference === 'device' ? `Your device is using ${appearance === 'starlight' ? 'Starlight' : 'Day'}.` : 'Your choice stays with you in this browser.')}</p>
      {message && <button className="seed-text-button" onClick={() => choose(preference)}>Try again</button>}
      {reader && <div className="reading-preferences">
        <fieldset><legend>Text size</legend><div className="reading-options">{['Small', 'Standard', 'Large', 'Largest'].map((label, size) => <label key={label}><input type="radio" name="reading-size" checked={reading.size === size} onChange={() => changeReading({ size })}/><span>{label}</span></label>)}</div></fieldset>
        <fieldset><legend>Line spacing</legend><div className="reading-options">{(['comfortable', 'open'] as const).map(spacing => <label key={spacing}><input type="radio" name="reading-spacing" checked={reading.spacing === spacing} onChange={() => changeReading({ spacing })}/><span>{spacing === 'open' ? 'More space' : 'Comfortable'}</span></label>)}</div></fieldset>
        <label className="appearance-pictures"><input type="checkbox" checked={reading.contrast} onChange={event => changeReading({ contrast: event.target.checked })}/><span>Stronger text contrast</span></label>
        <p className="reading-type-preview">Take a little time. Let a good thought take root.</p>
        {readingMessage && <p className="appearance-status" role="status">{readingMessage}</p>}
      </div>}
      <label className="appearance-pictures"><input type="checkbox" checked={pictures} onChange={event => choosePictures(event.target.checked)}/><span>Show seed pictures<small>The captions stay when pictures are hidden.</small></span></label>
      {pictureMessage && <p className="appearance-status" role="status">{pictureMessage}</p>}
      <button className="seed-secondary appearance-done" onClick={() => dialog.current?.close()}>Done</button>
    </dialog>
  </div>;
}
