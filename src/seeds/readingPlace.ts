// Keep paragraph-relative positions, so a font or viewport change does not
// send someone to an unrelated part of a long passage.
import type { ReadingEntry } from './navigation';
export type ReadingPlace = { anchor: string; fraction: number; open: string[] };
const key = (id: number) => `mindfulmod-seeds-place-v1-${id}`;
const anchorIsValid = (value: unknown): value is string => typeof value === 'string' && /^[a-z0-9-]{1,64}$/.test(value);
export function validatePlace(value: unknown): ReadingPlace | null {
  if (!value || typeof value !== 'object') return null;
  const place = value as Record<string, unknown>;
  if (!anchorIsValid(place.anchor) || typeof place.fraction !== 'number' || !Number.isFinite(place.fraction)) return null;
  return { anchor: place.anchor, fraction: Math.min(1, Math.max(0, place.fraction)), open: Array.isArray(place.open) ? place.open.filter(anchorIsValid).slice(0, 120) : [] };
}
export function loadPlace(id: number): ReadingPlace | null {
  try { return validatePlace(JSON.parse(localStorage.getItem(key(id)) || 'null')); } catch { return null; }
}
export function loadPlaceForEntry(id: number, entry: ReadingEntry): ReadingPlace | null {
  // Saved positions belong to Resume, reload and history traversal, never Next.
  return entry === 'resume' ? loadPlace(id) : null;
}
export function savePlace(id: number, place: ReadingPlace): void {
  try { localStorage.setItem(key(id), JSON.stringify(place)); } catch { /* Reading still works without storage. */ }
}
export function placeScrollTop(anchorTop: number, height: number, fraction: number, inset = 100): number {
  return Math.max(0, anchorTop + height * fraction - inset);
}
