import type { BookNavigation } from './bookNavigation';
import type { DeepReading } from '../data';

export type ReadingNote = { body: string; prompt: string; updatedAt: string };
export type ReadingPreferences = { textSize: 18 | 21 | 24; spacing: 'normal' | 'open'; width: 'balanced' | 'focused' };
export type ReadingWorkspace = { completed: string[]; visited: string[]; recent: string[]; notes: Record<string, ReadingNote>; preferences: ReadingPreferences };
export const workspaceKey = 'ihya-reading-workspace-v1';
export const sectionKey = (bookId: number, chapterId: number) => `${bookId}:${chapterId}`;
export const defaultPreferences: ReadingPreferences = { textSize: 18, spacing: 'normal', width: 'balanced' };

export function resolveSection(books: BookNavigation[], key: string) {
  const [bookId, chapterId] = key.split(':').map(Number);
  const book = books.find(item => item.id === bookId);
  const chapter = book?.chapters.find(item => item.id === chapterId);
  return book && chapter && key === sectionKey(book.id, chapter.id) ? { book, chapter } : null;
}

export function normalizeWorkspace(raw: unknown, books: BookNavigation[], legacyLarge = false): ReadingWorkspace {
  const data = raw && typeof raw === 'object' ? raw as Partial<ReadingWorkspace> : {};
  const valid = (keys: unknown) => Array.isArray(keys) ? [...new Set(keys.filter((key): key is string => typeof key === 'string' && !!resolveSection(books, key)))] : [];
  const notes: Record<string, ReadingNote> = {};
  if (data.notes && typeof data.notes === 'object') for (const [key, value] of Object.entries(data.notes)) {
    if (!resolveSection(books, key) || !value || typeof value.body !== 'string' || !value.body.trim()) continue;
    notes[key] = { body: value.body.slice(0, 12000), prompt: typeof value.prompt === 'string' ? value.prompt.slice(0, 1000) : '', updatedAt: typeof value.updatedAt === 'string' && Number.isFinite(Date.parse(value.updatedAt)) ? value.updatedAt : '' };
  }
  const p = data.preferences;
  return { completed: valid(data.completed), visited: valid([...(Array.isArray(data.visited) ? data.visited : []), ...valid(data.recent), ...valid(data.completed)]), recent: valid(data.recent).slice(0, 8), notes, preferences: {
    textSize: p?.textSize === 18 || p?.textSize === 21 || p?.textSize === 24 ? p.textSize : legacyLarge ? 21 : 18,
    spacing: p?.spacing === 'open' ? 'open' : 'normal', width: p?.width === 'focused' ? 'focused' : 'balanced',
  } };
}

export function nextBookSection(book: BookNavigation, data: ReadingWorkspace) {
  const recent = data.recent.map(key => resolveSection([book], key)).find(item => item && !data.completed.includes(sectionKey(book.id, item.chapter.id)));
  return recent?.chapter ?? book.chapters.find(chapter => !data.completed.includes(sectionKey(book.id, chapter.id))) ?? book.chapters[0];
}

export function estimatedReadingMinutes(reading: DeepReading) {
  const text = [reading.thesis, reading.context, ...reading.moves.map(move => `${move.title} ${move.body}`), ...(reading.closeReading ?? []).map(item => `${item.title} ${item.body}`), ...Object.values(reading.distinction), reading.misreading, reading.observation, ...(reading.selfAudit ?? []), reading.sourceAnchor].join(' ');
  return Math.max(1, Math.ceil(text.trim().split(/\s+/).length / 200));
}

export function exportNotebook(notes: Record<string, ReadingNote>, books: BookNavigation[]) {
  return ['# My Ihya reading notebook', '', 'Personal reflections alongside the reading companion.', '', ...Object.entries(notes).filter(([key]) => resolveSection(books, key)).sort((a, b) => a[0].localeCompare(b[0], undefined, { numeric: true })).flatMap(([key, note]) => {
    const { book, chapter } = resolveSection(books, key)!;
    return [`## Book ${book.id} · ${book.title}`, `### ${chapter.id}. ${chapter.formalTitle}`, '', ...(note.prompt ? [`Reflection prompt: ${note.prompt}`, ''] : []), note.body, '', ...(note.updatedAt ? [`Last edited: ${note.updatedAt.slice(0, 10)}`, ''] : []), '---', ''];
  })].join('\n');
}

export function recordReadingVisit(workspace: ReadingWorkspace, key: string): ReadingWorkspace {
  if (workspace.recent[0] === key && workspace.visited.includes(key)) return workspace;
  return { ...workspace, visited: workspace.visited.includes(key) ? workspace.visited : [...workspace.visited, key], recent: [key, ...workspace.recent.filter(item => item !== key)].slice(0, 8) };
}

export function toggleReadingComplete(workspace: ReadingWorkspace, key: string): ReadingWorkspace {
  return { ...workspace, completed: workspace.completed.includes(key) ? workspace.completed.filter(item => item !== key) : [...workspace.completed, key] };
}
