import { useEffect, useLayoutEffect, useRef, useState, type MouseEvent } from 'react';
import { BEFORE_SEED_NAVIGATION, isSeedRoute, parseSeedRoute, type ReadingEntry } from './navigation';

export default function useSeedRoute() {
  // A reload recovers the last position. Ordinary in-app links begin a reading.
  const [route, setRoute] = useState(() => parseSeedRoute(window.location.hash, 'resume'));
  const visit = useRef(0);
  const handledUrl = useRef(window.location.href);
  useLayoutEffect(() => {
    const previous = history.scrollRestoration;
    history.scrollRestoration = 'manual';
    return () => { history.scrollRestoration = previous; };
  }, []);

  const navigate = (href: string, entry: ReadingEntry = 'start') => {
    // Capture before changing the DOM or resetting the next reader's scroll.
    window.dispatchEvent(new Event(BEFORE_SEED_NAVIGATION));
    if (href !== window.location.hash) history.pushState(null, '', href);
    handledUrl.current = window.location.href;
    setRoute(parseSeedRoute(window.location.hash, entry, ++visit.current));
  };

  useEffect(() => {
    const change = (entry: ReadingEntry) => {
      window.dispatchEvent(new Event(BEFORE_SEED_NAVIGATION));
      handledUrl.current = window.location.href;
      setRoute(parseSeedRoute(window.location.hash, entry, ++visit.current));
    };
    const onHistory = () => change('resume');
    // Traversing fragment history can emit both events. Do not let hashchange
    // replace an already handled Back/Forward restoration with a fresh start.
    const onHash = () => { if (handledUrl.current !== window.location.href) change('start'); };
    window.addEventListener('popstate', onHistory);
    window.addEventListener('hashchange', onHash);
    return () => { window.removeEventListener('popstate', onHistory); window.removeEventListener('hashchange', onHash); };
  }, []);

  const onLinkClick = (event: MouseEvent<HTMLDivElement>) => {
    if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    const link = event.target instanceof Element ? event.target.closest<HTMLAnchorElement>('a[href]') : null;
    const href = link?.getAttribute('href');
    if (!href || !isSeedRoute(href) || link?.target || link?.hasAttribute('download')) return;
    event.preventDefault();
    navigate(href, link?.dataset.resume === 'true' ? 'resume' : 'start');
  };
  return { route, navigate, onLinkClick };
}
