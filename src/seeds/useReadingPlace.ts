import { useLayoutEffect } from 'react';
import { scrollToReadingPart } from './BookPassage';
import { loadPlaceForEntry, placeScrollTop, savePlace, type ReadingPlace } from './readingPlace';
import { BEFORE_SEED_NAVIGATION, type ReadingEntry } from './navigation';

export default function useReadingPlace(seedId: number, entry: ReadingEntry, target?: string) {
  useLayoutEffect(() => {
    let frame = 0;
    let active = true;
    let ready = false;
    let writeTimer = 0;
    let latest: ReadingPlace | null = null;
    const persist = () => { window.clearTimeout(writeTimer); writeTimer = 0; if (latest) savePlace(seedId, latest); };
    // Map stable semantic sections and their paragraphs, including folded notes.
    const anchors = Array.from(document.querySelectorAll<HTMLElement>(
      '.reader-article h1, #seed-illustration, #seed-explanation, #seed-explanation .reader-prose, #seed-book, [data-source-body]>p, #seed-source-notes, .book-endnote, .book-note-content p, #seed-reflection, #seed-writing, .reader-activity, .reader-completion'
    ));
    anchors.forEach((element, index) => { element.dataset.place = `reading-${index}`; });
    const capture = () => {
      frame = 0;
      if (!ready) return;
      const visible = anchors.filter(element => element.getClientRects().length > 0);
      const element = visible.filter(element => element.getBoundingClientRect().top <= 100).at(-1) || visible[0];
      if (!element) return;
      const box = element.getBoundingClientRect();
      const place: ReadingPlace = {
        anchor: window.scrollY < 10 ? 'top' : element.dataset.place!,
        fraction: Math.min(1, Math.max(0, (100 - box.top) / Math.max(1, box.height))),
        open: Array.from(document.querySelectorAll<HTMLDetailsElement>('.reader-article details[open][id]')).map(detail => detail.id),
      };
      latest = place;
      if (!writeTimer) writeTimer = window.setTimeout(persist, 200);
    };
    const onScroll = () => { if (ready && !frame) frame = requestAnimationFrame(capture); };
    const onLeave = () => { capture(); persist(); };
    const onHide = () => { if (document.visibilityState === 'hidden') onLeave(); };
    const enter = () => {
      if (!active) return;
      const place = !target ? loadPlaceForEntry(seedId, entry) : null;
      if (target) scrollToReadingPart(target);
      else if (place && place.anchor !== 'top') {
        place.open.forEach(id => { const detail = document.getElementById(id); if (detail instanceof HTMLDetailsElement) detail.open = true; });
        const anchor = anchors.find(element => element.dataset.place === place.anchor);
        window.scrollTo({ top: anchor ? placeScrollTop(window.scrollY + anchor.getBoundingClientRect().top, anchor.offsetHeight, place.fraction) : 0, behavior: 'instant' });
      } else window.scrollTo({ top: 0, behavior: 'instant' });
      if (!target) document.querySelector<HTMLElement>('[data-route-heading]')?.focus({ preventScroll: true });
      frame = requestAnimationFrame(() => { if (active) { ready = true; capture(); } });
    };
    if (entry === 'start' && !target) {
      // Reset before paint, including visited seeds. A pending font load must
      // never leave the next reading showing the previous reading's bottom.
      enter();
    } else {
      // Images reserve their aspect ratio. Wait for fonts only when restoring
      // a paragraph or jumping to a specific section.
      void document.fonts.ready.then(() => { if (active) frame = requestAnimationFrame(enter); });
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('pagehide', onLeave);
    window.addEventListener(BEFORE_SEED_NAVIGATION, onLeave);
    document.addEventListener('visibilitychange', onHide);
    document.addEventListener('toggle', onScroll, true);
    return () => {
      active = false;
      cancelAnimationFrame(frame);
      persist();
      // Do not measure on unmount: the next route may already occupy the DOM.
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('pagehide', onLeave);
      window.removeEventListener(BEFORE_SEED_NAVIGATION, onLeave);
      document.removeEventListener('visibilitychange', onHide);
      document.removeEventListener('toggle', onScroll, true);
    };
  }, [seedId, entry, target]);
}
