import { useRef } from 'react';
import { ArrowRight, BookmarkSimple, X } from '@phosphor-icons/react';
import type { BookNavigation } from './bookNavigation';
import { savedReadingGroups } from './bookmarkState';
import { useModalFocus } from './useModalFocus';

export function SavedReadings({ books, bookmarks, onOpen, onClose }: { books: BookNavigation[]; bookmarks: string[]; onOpen: (bookId: number, chapterId: number) => void; onClose: () => void }) {
  const dialog = useRef<HTMLElement>(null);
  useModalFocus(dialog, onClose);
  const readings = savedReadingGroups(books, bookmarks);
  return <div className="saved-readings-backdrop" onClick={event => { if (event.target === event.currentTarget) onClose(); }}>
    <section ref={dialog} className="saved-readings-dialog" role="dialog" aria-modal="true" aria-labelledby="saved-readings-title" tabIndex={-1}>
      <header><div><span>Your return list</span><h2 id="saved-readings-title">Saved readings</h2><p>{readings.length ? `${readings.length} ${readings.length === 1 ? 'section' : 'sections'} to return to, saved in this browser.` : 'Keep the sections you would like to return to.'}</p></div><button onClick={onClose} aria-label="Close saved readings"><X size={20}/></button></header>
      {readings.length ? <ul>{readings.map(({book, chapter}) => <li key={`${book.id}:${chapter.id}`}><button onClick={() => onOpen(book.id, chapter.id)}><BookmarkSimple size={21} weight="duotone"/><span><small>Book {book.id} · {book.title}</small><strong>{chapter.shortTitle}</strong><span>{chapter.formalTitle}</span></span><ArrowRight size={19}/></button></li>)}</ul> : <div className="saved-readings-empty"><BookmarkSimple size={42} weight="duotone"/><p>Use <strong>Save reading</strong> in any section. It will appear here next time.</p><button onClick={onClose}>Return to reading</button></div>}
    </section>
  </div>;
}
