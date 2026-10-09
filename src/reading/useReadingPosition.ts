import { useCallback, useEffect, useRef } from 'react';
import type { Depth } from '../systemTypes';

type Position = { anchor: string; offset: number };
type Positions = Partial<Record<Depth, Position>>;

/** Keep a separate semantic reading position for each depth in this section. */
export function useReadingPosition(enabled: boolean, section: string, depth: Depth) {
  const positions = useRef<Positions>({});
  const restoring = useRef(false);
  const previous = useRef<Position | null>(null);
  const storageKey = `ihya-depth-position-v1:${section}`;
  const inset = () => {
    const nav = document.querySelector<HTMLElement>('.reading-navigator');
    return nav ? (parseFloat(getComputedStyle(nav).top) || 0) + nav.offsetHeight + 20 : 160;
  };
  const capture = useCallback(() => {
    if (!enabled || restoring.current) return;
    const anchors = Array.from(document.querySelectorAll<HTMLElement>('.publication-reader [data-reading-anchor]'))
      .filter(el => el.getClientRects().length);
    const anchor = anchors.filter(el => el.getBoundingClientRect().top <= inset()).at(-1) ?? anchors[0];
    if (!anchor) return;
    const position = { anchor: anchor.dataset.readingAnchor!, offset: anchor.getBoundingClientRect().top };
    positions.current[depth] = position;
    previous.current = position;
    try { sessionStorage.setItem(storageKey, JSON.stringify(positions.current)); } catch { /* Memory still works when storage is unavailable. */ }
  }, [enabled, depth, storageKey]);

  useEffect(() => {
    positions.current = {};
    previous.current = null;
    try {
      const saved = JSON.parse(sessionStorage.getItem(storageKey) ?? '{}');
      for (const mode of ['glance', 'deep', 'sources'] as const) {
        if (typeof saved?.[mode]?.anchor === 'string' && Number.isFinite(saved[mode].offset)) positions.current[mode] = saved[mode];
      }
    } catch { /* Ignore invalid or unavailable storage. */ }
  }, [storageKey]);

  useEffect(() => {
    if (!enabled) return;
    restoring.current = true;
    let frame = requestAnimationFrame(() => {
      frame = requestAnimationFrame(() => {
        const hash = document.getElementById(location.hash.slice(1));
        const position = positions.current[depth];
        const anchors = Array.from(document.querySelectorAll<HTMLElement>('.publication-reader [data-reading-anchor]'));
        const target = anchors.find(el => el.dataset.readingAnchor === position?.anchor && el.getClientRects().length);
        // A passage link takes precedence on a fresh load; later depth changes restore their own position.
        if (!previous.current && hash?.getClientRects().length) {
          window.scrollTo({ top: window.scrollY + hash.getBoundingClientRect().top - inset(), behavior: 'instant' });
        } else if (target && position) {
          window.scrollTo({ top: window.scrollY + target.getBoundingClientRect().top - position.offset, behavior: 'instant' });
        } else if (previous.current && previous.current.anchor !== 'opening') {
          const body = anchors.find(el => el.dataset.readingAnchor !== 'opening');
          if (body) window.scrollTo({ top: window.scrollY + body.getBoundingClientRect().top - inset(), behavior: 'instant' });
        }
        const focused = document.activeElement;
        if (previous.current && focused instanceof HTMLElement && !focused.closest('.reading-depth-dock') && previous.current.anchor !== 'opening') {
          document.querySelector<HTMLSelectElement>('.reading-depth-dock select')?.focus({ preventScroll: true });
        }
        restoring.current = false;
        capture();
      });
    });
    let scrollFrame = 0;
    const onScroll = () => { cancelAnimationFrame(scrollFrame); scrollFrame = requestAnimationFrame(capture); };
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('pagehide', capture);
    return () => {
      cancelAnimationFrame(frame); cancelAnimationFrame(scrollFrame);
      window.removeEventListener('scroll', onScroll); window.removeEventListener('pagehide', capture);
      restoring.current = false;
    };
  }, [enabled, depth, storageKey, capture]);
  return capture;
}
