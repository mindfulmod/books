import { assetUrl } from './assetUrl';
import type { ReadingTheme } from './ReadingTheme';
import bookArtwork from './reading/book-art.json';

/** A decorative reading place; the same composition in daylight and lantern light. */
export function ReadingGarden({ theme, className = '', backdrop = false, bookId, thumbnail = false, quarterOnly = false, sidebar = false, sizes: imageSizes }: {
  theme: ReadingTheme;
  className?: string;
  backdrop?: boolean;
  bookId?: number;
  thumbnail?: boolean;
  quarterOnly?: boolean;
  sidebar?: boolean;
  sizes?: string;
}) {
  const light = theme === 'dark' ? 'evening' : 'day';
  const quarter = bookId != null && bookId >= 1 && bookId <= 40
    ? (['worship', 'customs', 'perils', 'deliverance'] as const)[Math.floor((bookId - 1) / 10)]
    : undefined;
  const art = !quarterOnly && bookId != null ? bookArtwork[String(bookId) as keyof typeof bookArtwork] : undefined;
  const scene = art ? `books/${art.key}-${light}` : quarter ? `quarters/${quarter}-${light}` : light;
  const widths = art ? [320, 640, 1200, 1600] : quarter ? [320, 640, 1200, 1672] : [640, 1200, 1672];
  const Frame = thumbnail ? 'span' : 'div';
  return <Frame className={`reading-garden ${className}`} data-garden-scene={art?.key ?? quarter ?? 'reading-room'} aria-hidden="true">
    <img
      src={assetUrl(`assets/ihya-garden/${scene}-${thumbnail || sidebar ? 640 : 1200}.webp`)}
      srcSet={widths.map(width => `${assetUrl(`assets/ihya-garden/${scene}-${width}.webp`)} ${width}w`).join(', ')}
      sizes={imageSizes ?? (thumbnail ? '(max-width: 767px) 76px, 124px' : sidebar ? '220px' : backdrop ? '100vw' : '(max-width: 767px) 100vw, (max-width: 1050px) 65vw, 900px')}
      style={art ? { objectPosition: `50% ${art.focusY}%` } : undefined}
      loading={thumbnail ? 'lazy' : 'eager'}
      alt="" width={1672} height={941} decoding="async"
    />
  </Frame>;
}
