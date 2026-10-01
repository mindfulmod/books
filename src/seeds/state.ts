export const STORAGE_KEY = 'mindfulmod-timeless-seeds-v1';
export type Garden = { saved: number[]; read: number[]; notes: Record<string, string>; intentions: Record<string, string>; last: number | null; large: boolean };
export const emptyGarden = (): Garden => ({ saved: [], read: [], notes: {}, intentions: {}, last: null, large: false });
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
  return { saved: ids(source.saved), read: ids(source.read), notes: entries(source.notes), intentions: entries(source.intentions), last: validId(source.last) ? source.last : null, large: source.large === true };
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
      ...(garden.intentions[s.id]?.trim() ? [`One small action: ${garden.intentions[s.id]}`] : []), '',
    ])].join('\n');
}
