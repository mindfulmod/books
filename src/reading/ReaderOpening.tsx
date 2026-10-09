import { ReadingOrnament } from './ReadingOrnament';
import type { ReactNode } from 'react';
import type { ReadingTheme } from '../ReadingTheme';
import type { Depth } from '../systemTypes';
import { ReadingGarden } from '../ReadingGarden';
import { ReadingDepthSelector } from './ReadingDepthSelector';

/** The same opening composition at every reading depth. */
export function ReaderOpening({ bookId, bookTitle, title, subtitle, position, theme, depth, onDepthChange, tools, illustrated, primary, titleId }: {
  bookId: number; bookTitle: string; title: string; subtitle: string; position: string;
  theme: ReadingTheme; depth: Depth; onDepthChange: (depth: Depth) => void;
  tools: ReactNode; illustrated: boolean; primary: boolean; titleId?: string;
}) {
  const Heading = primary ? 'h1' : 'h2';
  return <>
    {illustrated && <ReadingGarden theme={theme} bookId={bookId} className="garden-reader-opening" />}
    <ReadingOrnament />
    <header className="publication-opening" data-reading-anchor="opening">
      <div className="publication-opening-meta">
        <div><span>{bookTitle} · Book {bookId}</span><small>{position}</small></div>
        {tools}
      </div>
      <Heading id={titleId}>{title}</Heading>
      {subtitle !== title && <p className="publication-opening-subtitle">{subtitle}</p>}
      <ReadingDepthSelector value={depth} onChange={onDepthChange} />
    </header>
  </>;
}
