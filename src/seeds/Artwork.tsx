import { useCallback, useRef, useState } from 'react';
import { ArrowsOutSimple, X } from '@phosphor-icons/react';
import { assetUrl } from '../assetUrl';
import { useAppearance } from './Appearance';
import { illustrationPath, scenePath } from './appearanceState';
import { seedIllustrations, type IllustrationFrame } from './illustrations';
import type { ThemeId } from './content';
import { pathGuidance } from './pathGuidance';
import { artworkCaptions } from './artworkCaptions';

export type Scene = 'coastal-home' | 'island-sky' | 'prayer-breeze' | 'plant-and-bee' | 'flower-garden' | 'garden-path';
export const themeScene: Record<ThemeId, Scene> = {
  hope: 'garden-path', trust: 'island-sky', presence: 'prayer-breeze',
  return: 'plant-and-bee', gratitude: 'flower-garden', kindness: 'coastal-home',
};


// Paintings fade in over a painted placeholder instead of appearing as an empty box.
// A failed load also counts as done so the frame never stays hidden.
function useLoaded() {
  const [loaded, setLoaded] = useState(false);
  const ref = useCallback((img: HTMLImageElement | null) => { if (img?.complete && img.naturalWidth) setLoaded(true); }, []);
  const done = () => setLoaded(true);
  return { ref, 'data-loaded': loaded || undefined, onLoad: done, onError: done };
}

export function SceneImage({ scene, alt = '', nightAlt, sizes = '(max-width: 760px) 100vw, 50vw', eager = false, priority = false }: {
  scene: Scene; alt?: string; nightAlt?: string; sizes?: string; eager?: boolean; priority?: boolean;
}) {
  const { appearance } = useAppearance();
  const source = (scene: Scene, width: number) => assetUrl(scenePath(scene, width, appearance));
  const loading = useLoaded();
  return <img {...loading} data-coastal-scene={scene} className="coastal-scene" src={source(scene, 960)}
    srcSet={[480, 960, 1440].map(width => `${source(scene, width)} ${width}w`).join(', ')}
    sizes={sizes} width={1440} height={scene === 'island-sky' ? 480 : 960}
    alt={appearance === 'starlight' && nightAlt ? nightAlt : alt} loading={eager ? 'eager' : 'lazy'} decoding="async" fetchPriority={priority ? 'high' : 'auto'}/>;
}

export function IllustrationImage({ frame, enlarged = false, eager = false }: { frame: IllustrationFrame; enlarged?: boolean; eager?: boolean }) {
  const { appearance } = useAppearance();
  const prefix = appearance === 'starlight' ? frame.starlight : frame.day;
  const loading = useLoaded();
  return <img {...loading} className="coastal-scene" data-seed-art-day={frame.day} data-seed-art-starlight={frame.starlight}
    src={assetUrl(illustrationPath(prefix, 960))}
    srcSet={[480, 960, 1440].map(width => `${assetUrl(illustrationPath(prefix, width))} ${width}w`).join(', ')}
    sizes={enlarged ? '(max-width: 960px) 95vw, 1000px' : '(max-width: 760px) 85vw, 640px'}
    width={1440} height={960} loading={enlarged || eager ? 'eager' : 'lazy'} fetchPriority={eager ? 'high' : 'auto'} decoding="async"
    alt={appearance === 'starlight' && frame.nightAlt ? frame.nightAlt : frame.alt}/>;
}

export function SeedIllustration({ seedId, leading = false }: { seedId: number; leading?: boolean }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const [enlarged, setEnlarged] = useState(false);
  const [panel, setPanel] = useState(0);
  const { pictures, choosePictures } = useAppearance();
  const frames = seedIllustrations[seedId];
  if (!frames) return null;
  const art = frames[panel] || frames[0];
  const caption = (panel === 0 ? artworkCaptions[seedId] : undefined) || pathGuidance[seedId]?.captions[panel] || art.caption;
  return <figure className={`seed-illustration${leading ? ' seed-illustration-leading' : ''}`} id="seed-illustration" tabIndex={-1} aria-label={`Visual reminder for seed ${seedId}`}>
    {frames.length > 1 && <div className="seed-art-panels" data-panels={frames.length} role="group" aria-label="Choose a moment in the illustration">{frames.map((frame, index) =>
      <button key={frame.day} aria-pressed={panel === index} onClick={() => setPanel(index)}>{frame.label}</button>
    )}</div>}
    {pictures ? <button ref={trigger} className="seed-illustration-open" aria-label={`Enlarge the illustration for seed ${seedId}`} aria-haspopup="dialog" onClick={() => { setEnlarged(true); dialog.current?.showModal(); }}>
      <IllustrationImage frame={art} eager={leading}/>
      <span><ArrowsOutSimple size={17}/><span className={leading ? 'seed-sr-only' : undefined}>Take a closer look</span></span>
    </button> : <button className="seed-art-show" onClick={() => choosePictures(true)}>Show seed pictures</button>}
    <figcaption><p aria-live={frames.length > 1 ? 'polite' : undefined}>{caption}</p></figcaption>
    <dialog ref={dialog} className="seed-art-dialog" aria-label={`Illustration for seed ${seedId}`} onClose={() => { setEnlarged(false); trigger.current?.focus({ preventScroll: true }); }} onClick={event => { if (event.target === dialog.current) dialog.current.close(); }}>
      {enlarged && <div><button autoFocus className="seed-icon-button" aria-label="Close illustration" onClick={() => dialog.current?.close()}><X size={23}/></button><IllustrationImage frame={art} enlarged/><p>{caption}</p></div>}
    </dialog>
  </figure>;
}

export function SeedThumbnail({ seedId, eager = false }: { seedId: number; eager?: boolean }) {
  const { appearance, pictures } = useAppearance();
  const frame = seedIllustrations[seedId]?.[0];
  if (!frame || !pictures) return <span className="seed-thumbnail is-hidden" aria-hidden="true">{String(seedId).padStart(3, '0')}</span>;
  const prefix = appearance === 'starlight' ? frame.starlight : frame.day;
  return <img className="seed-thumbnail" data-seed-art-day={frame.day} data-seed-art-starlight={frame.starlight} src={assetUrl(illustrationPath(prefix, 480))} width={1440} height={960} alt="" loading={eager ? 'eager' : 'lazy'} decoding="async"/>;
}
