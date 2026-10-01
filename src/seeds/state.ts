export const STORAGE_KEY = 'mindfulmod-timeless-seeds-v1';
export type FollowUp = 'done' | 'later';
// planned: the local day ("YYYY-MM-DD") a small action was last written, so a later visit can ask how it went.
export type Garden = { saved: number[]; read: number[]; notes: Record<string, string>; intentions: Record<string, string>; planned: Record<string, string>; followUps: Record<string, FollowUp>; last: number | null; large: boolean };
export const emptyGarden = (): Garden => ({ saved: [], read: [], notes: {}, intentions: {}, planned: {}, followUps: {}, last: null, large: false });
export type GardenTab = 'saved' | 'notes' | 'read';
export function gardenTabFor(garden: Garden, requested?: string | null): GardenTab {
  if (requested === 'saved' || requested === 'notes' || requested === 'read') return requested;
  if (garden.saved.length) return 'saved';
  if ([...Object.values(garden.notes), ...Object.values(garden.intentions)].some(value => value.trim())) return 'notes';
  return garden.read.length ? 'read' : 'saved';
}
const validId = (value: unknown): value is number => Number.isInteger(value) && Number(value) >= 1 && Number(value) <= 111;
export function validateGarden(value: unknown): Garden {
  if (!value || typeof value !== 'object') return emptyGarden();
  const source = value as Record<string, unknown>;
  const ids = (value: unknown) => Array.isArray(value) ? [...new Set(value.filter(validId))] : [];
  const entries = (value: unknown): Record<string, string> => value && typeof value === 'object' && !Array.isArray(value)
    ? Object.fromEntries(Object.entries(value).filter(([key, v]) => validId(Number(key)) && typeof v === 'string').map(([k, v]) => [k, (v as string).slice(0, 20000)])) : {};
  const planned = Object.fromEntries(Object.entries(entries(source.planned)).filter(([, day]) => /^\d{4}-\d{2}-\d{2}$/.test(day)));
  const followUps = Object.fromEntries(Object.entries(entries(source.followUps)).filter(([, value]) => value === 'done' || value === 'later')) as Record<string, FollowUp>;
  return { saved: ids(source.saved), read: ids(source.read), notes: entries(source.notes), intentions: entries(source.intentions), planned, followUps, last: validId(source.last) ? source.last : null, large: source.large === true };
}
export function loadGarden(): { garden: Garden; error: boolean } {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw === null) return { garden: emptyGarden(), error: false };
    const value: unknown = JSON.parse(raw);
    if (!value || typeof value !== 'object' || Array.isArray(value)) throw new Error('Unreadable garden');
    return { garden: validateGarden(value), error: false };
  }
  catch { return { garden: emptyGarden(), error: true }; }
}
export function saveGarden(garden: Garden, storageWasReadable: boolean): boolean {
  // Never overwrite a saved copy we could not read. New writing can still be exported.
  if (!storageWasReadable) return false;
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(garden)); return true; }
  catch { return false; }
}
// Where "pick up where you left off" should go. A finished reading never sends
// the reader back to itself: it moves on along that reading's path, then the book.
export type Resume = { id: number; kind: 'return' | 'continue' | 'next' | 'done'; path?: string; step?: number; total?: number; finishedPath?: string };
export function resumeFor(garden: Garden, routes: { id: string; route: number[] }[], count = 111): Resume | null {
  const last = garden.last;
  if (!last) return null;
  const route = routes.find(r => r.route.includes(last));
  const place = (id: number) => route ? { path: route.id, step: route.route.indexOf(id) + 1, total: route.route.length } : {};
  if (!garden.read.includes(last)) return { id: last, kind: 'return', ...place(last) };
  if (route) {
    const at = route.route.indexOf(last);
    const next = [...route.route.slice(at + 1), ...route.route.slice(0, at)].find(id => !garden.read.includes(id));
    if (next) return { id: next, kind: 'continue', ...place(next) };
  }
  for (let offset = 1; offset < count; offset++) {
    const id = (last - 1 + offset) % count + 1;
    if (!garden.read.includes(id)) return { id, kind: 'next', ...(route ? { finishedPath: route.id } : {}) };
  }
  return { id: last, kind: 'done' };
}

export const localDay = (date = new Date()) => `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
const daysBetween = (from: string, to: string) => Math.round((Date.parse(`${to}T12:00:00Z`) - Date.parse(`${from}T12:00:00Z`)) / 86400000);

// The most recent small action written on an earlier day (within two weeks) that
// the reader hasn't told us about yet.
export function followUpFor(garden: Garden, date = new Date()): { id: number; daysAgo: number } | null {
  const today = localDay(date);
  const waiting = Object.entries(garden.planned)
    .map(([id, day]) => ({ id: Number(id), day, daysAgo: daysBetween(day, today) }))
    .filter(item => garden.intentions[item.id]?.trim() && !garden.followUps[item.id] && item.daysAgo >= 1 && item.daysAgo <= 14)
    .sort((a, b) => a.daysAgo - b.daysAgo || b.id - a.id);
  return waiting[0] ? { id: waiting[0].id, daysAgo: waiting[0].daysAgo } : null;
}

export function dailySeedId(date = new Date()) {
  // Local calendar date, stable through the day and independent of daylight saving.
  return Math.floor(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()) / 86400000) % 111 + 1;
}

export function formatGarden(garden: Garden, readings: { id: number; title: string; page: number; lastPage: number }[], date = new Date()) {
  const hasWriting = (id: number) => garden.notes[id]?.trim() || garden.intentions[id]?.trim();
  return ['My garden · Timeless Seeds of Advice', `Exported ${date.toLocaleDateString()}`, '',
    ...readings.filter(s => garden.saved.includes(s.id) || garden.read.includes(s.id) || hasWriting(s.id)).flatMap(s => [
      `SEED ${s.id} · ${s.title}`,
      `Book reference: PDF ${s.page === s.lastPage ? 'page' : 'pages'} ${s.page}${s.page !== s.lastPage ? `–${s.lastPage}` : ''}`,
      `Saved: ${garden.saved.includes(s.id) ? 'yes' : 'no'} · Read: ${garden.read.includes(s.id) ? 'yes' : 'no'}`,
      ...(garden.notes[s.id]?.trim() ? [`Reflection: ${garden.notes[s.id]}`] : []),
      ...(garden.intentions[s.id]?.trim() ? [`One small action: ${garden.intentions[s.id]}${garden.followUps[s.id] === 'done' ? ' (done)' : ''}`] : []), '',
    ])].join('\n');
}
