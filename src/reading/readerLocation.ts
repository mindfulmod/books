import type { Depth } from '../systemTypes';
import type { BookNavigation } from './bookNavigation';

export type ReadingPosition = { bookId: number; journeyId: string; nodeId: string; chapterId?: number; readingMode: 'journey' | 'sections'; depth: Depth };

/** Validate public reading links against the actual collection. */
export function readReaderLocation(books: BookNavigation[], search: string): ReadingPosition | null {
  const params = new URLSearchParams(search);
  const book = books.find(item => item.id === Number(params.get('book')));
  if (!book) return null;
  const value = params.get('depth');
  const depth: Depth = value === 'glance' || value === 'sources' ? value : 'deep';
  if (params.has('journey')) {
    const journey = book.journeys.find(item => item.id === params.get('journey'));
    const node = journey?.nodes.find(item => item.id === params.get('node'));
    return journey && node ? { bookId: book.id, journeyId: journey.id, nodeId: node.id, readingMode: 'journey', depth } : null;
  }
  const chapter = book.chapters.find(item => item.id === Number(params.get('section')));
  if (!chapter) return null;
  const journey = book.journeys.find(item => item.nodes.some(node => node.chapterId === chapter.id)) ?? book.journeys[0];
  const node = journey.nodes.find(item => item.chapterId === chapter.id);
  return { bookId: book.id, journeyId: journey.id, nodeId: (node ?? journey.nodes[0]).id, chapterId: node ? undefined : chapter.id, readingMode: 'sections', depth };
}

export function readerSearch(position: ReadingPosition, chapterId: number) {
  const params = new URLSearchParams({ book: String(position.bookId) });
  if (position.readingMode === 'journey') { params.set('journey', position.journeyId); params.set('node', position.nodeId); }
  else params.set('section', String(chapterId));
  params.set('depth', position.depth);
  return `?${params}`;
}
