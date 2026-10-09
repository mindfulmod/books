import type { BookNavigation } from './bookNavigation';

export function resolveSavedReading(books: BookNavigation[], key: string) {
  const [bookId, journeyId, nodeId] = key.split(':');
  const book = books.find(item => item.id === Number(bookId));
  if (!book) return null;
  const chapterId = journeyId === 'section' ? Number(nodeId) : book.journeys.find(item => item.id === journeyId)?.nodes.find(item => item.id === nodeId)?.chapterId;
  const chapter = book.chapters.find(item => item.id === chapterId);
  return chapter ? { key, book, chapter } : null;
}

export function savedReadingGroups(books: BookNavigation[], keys: string[]) {
  const readings = new Map<string, NonNullable<ReturnType<typeof resolveSavedReading>> & { keys: string[] }>();
  for (const key of keys) {
    const reading = resolveSavedReading(books, key);
    if (!reading) continue;
    const id = `${reading.book.id}:${reading.chapter.id}`;
    const existing = readings.get(id);
    if (existing) existing.keys.push(key);
    else readings.set(id, { ...reading, keys: [key] });
  }
  return [...readings.values()].reverse();
}
