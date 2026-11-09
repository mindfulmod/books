import indexData from './content/index.json';
import glossaryData from './content/glossary.json';
import bookData from './content/book.json';

export type Level = 'explicit' | 'sufi' | 'thread' | 'none';
export type Lens = 'longing' | 'nearness' | 'self' | 'awake' | 'passing' | 'trust' | 'service' | 'justice' | 'prayer';
export type Couplet = { original: string[]; transliteration: string[]; translation: string[]; story: string; language?: 'pa' | 'ur' };
export type Poem = {
  id: string; pages: number[]; form: string; language: 'pa' | 'ur'; title: string; titleOriginal?: string; author?: string;
  themes: string[]; reading: { level: Level; lenses: Lens[]; anchors: number[] };
  takeaway: string; scene: string; context?: string; couplets: Couplet[]; deeper: string; why: string; prompt: string;
  glossary: string[]; notes: string[]; variant?: { pages: number[]; summary: string; extraCouplets: Couplet[] }; editorNote?: string;
};
export type Entry = {
  id: string; pages: number[]; form: string; language: 'pa' | 'ur'; title: string; titleOriginal?: string; author?: string;
  takeaway: string; scene: string; themes: string[]; level: Level; lenses: Lens[]; couplets: number; firstLine: string; words: number;
};

export const entries = indexData as Entry[];
export const glossary = glossaryData as Record<string, { term: string; meaning: string }>;
export const book = bookData as typeof bookData;
export const entryById = (id: string | undefined) => entries.find(e => e.id === id);

// Each poem is its own small chunk, loaded when it is opened.
const loaders = import.meta.glob<{ default: Poem }>('./content/poems/*.json');
export async function loadPoem(id: string): Promise<Poem | null> {
  const load = loaders[`./content/poems/${id}.json`];
  return load ? (await load()).default : null;
}

export const levels: Record<Level, { label: string; short: string; description: string }> = {
  explicit: { label: 'The poem says so', short: 'Names God', description: 'This poem names God, the Prophet or faith directly, so the spiritual meaning is in the text itself.' },
  sufi: { label: 'Read the Sufi way', short: 'Sufi reading', description: 'A love poem in the Sufi style. It works as a poem about a person and as a poem about God. Both readings are fair.' },
  thread: { label: 'A line of faith', short: 'Line of faith', description: 'Mainly about something else, like family, country or society, with a line or two of faith.' },
  none: { label: 'About this world', short: 'This world', description: 'A poem about people, country or everyday life. No spiritual reading is added, because the poem doesn’t point to one.' },
};

export const lenses: Record<Lens, { label: string; description: string }> = {
  longing: { label: 'Longing for God', description: 'The ache of being apart, and what it teaches.' },
  nearness: { label: 'God close by', description: 'Moments when the Beloved feels present everywhere.' },
  self: { label: 'Losing the ego', description: 'Letting the proud self go, and finding the true one.' },
  awake: { label: 'The awake heart', description: 'Waking up: the heart, the conscience, the way you see.' },
  passing: { label: 'Only God remains', description: 'The world passes. What lasts?' },
  trust: { label: 'Trust and patience', description: 'Handing the boat of your heart to the river.' },
  service: { label: 'Serving people', description: 'Love for God that shows up as care for others.' },
  justice: { label: 'Standing for what’s right', description: 'Naming cruelty and corruption, and refusing to look away.' },
  prayer: { label: 'Talking to God', description: 'Prayers, blessings and thanks.' },
};
export const lensOrder: Lens[] = ['awake', 'longing', 'nearness', 'self', 'passing', 'trust', 'service', 'justice', 'prayer'];

export const forms: Record<string, { label: string; meaning: string }> = {
  ghazal: { label: 'Ghazal', meaning: 'Rhyming couplets, each complete in itself, usually about love and longing. The poet names himself in the last one.' },
  qita: { label: 'Qita', meaning: 'A short poem of a few couplets that make one point together.' },
  nazm: { label: 'Nazm', meaning: 'A poem on one subject, like a tribute, a farewell or a song for the country.' },
  chaumisra: { label: 'Chaumisra', meaning: 'A four-line verse.' },
  mukhammas: { label: 'Mukhammas', meaning: 'A poem in five-line stanzas.' },
  rubai: { label: 'Rubai', meaning: 'A four-line verse, often with a twist at the end.' },
  song: { label: 'Song', meaning: 'A poem written to be sung, with a repeated refrain.' },
  verses: { label: 'Verses', meaning: 'A few separate couplets.' },
};
export const languageLabel = (l: 'pa' | 'ur') => l === 'ur' ? 'Urdu' : 'Punjabi';
// Shahmukhi Punjabi is tagged pnb; Urdu is ur.
export const scriptLang = (l: 'pa' | 'ur') => l === 'ur' ? 'ur' : 'pnb';
export const pageLabel = (pages: number[]) => pages.length > 1 ? `Pages ${pages[0]}–${pages[pages.length - 1]}` : `Page ${pages[0]}`;
export const minutes = (e: Entry) => Math.max(1, Math.round(e.words / 180));

export const startHere = ['013-ajj-zulf', '026-every-breath', '014-everywhere-i-look', '087-seasons-change', '085-mother', '107-confession'];
export const totalCouplets = entries.reduce((n, e) => n + e.couplets, 0);
