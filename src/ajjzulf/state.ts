// The reader's notebook lives only in this browser.
export const STORAGE_KEY = 'mindfulmod-ajjzulf-v1';
export const APPEARANCE_KEY = 'mindfulmod-ajjzulf-appearance-v1';
export type Layer = 'story' | 'english' | 'original' | 'aloud';
export const layers: Layer[] = ['story', 'english', 'original', 'aloud'];
export type View = 'one' | 'all';
export type Notebook = { saved: string[]; read: string[]; notes: Record<string, string>; last: string | null; layer: Layer; view: View };
export const emptyNotebook = (): Notebook => ({ saved: [], read: [], notes: {}, last: null, layer: 'story', view: 'one' });

export function validateNotebook(value: unknown, known: Set<string>): Notebook {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return emptyNotebook();
  const v = value as Record<string, unknown>;
  const ids = (list: unknown) => Array.isArray(list) ? [...new Set(list.filter((id): id is string => typeof id === 'string' && known.has(id)))] : [];
  const notes = v.notes && typeof v.notes === 'object' && !Array.isArray(v.notes)
    ? Object.fromEntries(Object.entries(v.notes).filter(([id, text]) => known.has(id) && typeof text === 'string').map(([id, text]) => [id, (text as string).slice(0, 20000)]))
    : {};
  return {
    saved: ids(v.saved), read: ids(v.read), notes,
    last: typeof v.last === 'string' && known.has(v.last) ? v.last : null,
    layer: layers.includes(v.layer as Layer) ? v.layer as Layer : 'story',
    view: v.view === 'all' ? 'all' : 'one',
  };
}

export function loadNotebook(known: Set<string>): { notebook: Notebook; error: boolean } {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw === null) return { notebook: emptyNotebook(), error: false };
    return { notebook: validateNotebook(JSON.parse(raw), known), error: false };
  } catch { return { notebook: emptyNotebook(), error: true }; }
}

export function saveNotebook(notebook: Notebook, readable: boolean) {
  // Never overwrite a saved copy we could not read.
  if (!readable) return false;
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(notebook)); return true; } catch { return false; }
}

export function formatNotebook(notebook: Notebook, poems: { id: string; title: string; pages: number[] }[], date = new Date()) {
  const lines = ['My notebook · Ajj Zulf Sanwari Jani Ae', `Exported ${date.toLocaleDateString()}`, ''];
  for (const p of poems) {
    const note = notebook.notes[p.id]?.trim();
    if (!note && !notebook.saved.includes(p.id)) continue;
    lines.push(`${p.title} (page ${p.pages[0]})`, `Saved: ${notebook.saved.includes(p.id) ? 'yes' : 'no'} · Read: ${notebook.read.includes(p.id) ? 'yes' : 'no'}`);
    if (note) lines.push(`My thoughts: ${note}`);
    lines.push('');
  }
  return lines.join('\n');
}

export type Appearance = 'day' | 'night' | 'device';
export function loadAppearance(): Appearance {
  try { const v = localStorage.getItem(APPEARANCE_KEY); return v === 'day' || v === 'night' ? v : 'device'; } catch { return 'device'; }
}
export function saveAppearance(value: Appearance) {
  try { if (value === 'device') localStorage.removeItem(APPEARANCE_KEY); else localStorage.setItem(APPEARANCE_KEY, value); } catch { /* this visit only */ }
}

export type Route =
  | { view: 'home' }
  | { view: 'poems'; level?: string; lens?: string; q?: string }
  | { view: 'poem'; id: string }
  | { view: 'notebook' }
  | { view: 'about' };

export function parseRoute(hash: string): Route {
  const [path, query = ''] = hash.replace(/^#\/?/, '').split('?');
  const params = new URLSearchParams(query);
  if (path.startsWith('poem/')) return { view: 'poem', id: decodeURIComponent(path.slice(5)) };
  if (path === 'poems') return { view: 'poems', level: params.get('level') ?? undefined, lens: params.get('lens') ?? undefined, q: params.get('q') ?? undefined };
  if (path === 'notebook') return { view: 'notebook' };
  if (path === 'about') return { view: 'about' };
  return { view: 'home' };
}
export const poemUrl = (id: string) => `#poem/${id}`;
export const poemsUrl = (filter: { level?: string; lens?: string } = {}) => {
  const params = new URLSearchParams(Object.entries(filter).filter(([, v]) => v) as [string, string][]).toString();
  return `#poems${params ? `?${params}` : ''}`;
};
