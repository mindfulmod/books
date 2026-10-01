import explanations from './explanations.json';
import sourceText from './source-text.json';
import sourceCredits from './source-credits.json';

export type ThemeId = 'hope' | 'trust' | 'presence' | 'return' | 'gratitude' | 'kindness';
export const themes: { id: ThemeId; title: string; short: string; invitation: string; description: string; route: number[]; practice: string }[] = [
  { id: 'hope', title: 'Hope & mercy', short: 'Hope', invitation: 'I could use a little hope', description: 'Read about Allah’s mercy and keep hope through difficult days.', route: [15, 50, 103, 95], practice: 'Read how the prophets faced sadness, then bring your own need to Allah.' },
  { id: 'trust', title: 'Trust & patience', short: 'Trust', invitation: 'I’m carrying a worry', description: 'Make an effort, be patient, and trust Allah with the result.', route: [46, 33, 55, 48], practice: 'Choose an action you can take, and ask Allah for help with what you cannot control.' },
  { id: 'presence', title: 'Prayer & remembrance', short: 'Presence', invitation: 'I want to feel closer to God', description: 'Give prayer and remembrance more care and attention.', route: [69, 24, 19, 108], practice: 'Choose one familiar moment today and meet it with attention: a prayer, a verse, or a quiet remembrance.' },
  { id: 'return', title: 'Returning & renewal', short: 'Renewal', invitation: 'I want a fresh start after a mistake', description: 'Turn back to Allah and begin to change what you do.', route: [10, 74, 78, 70], practice: 'Name what you did wrong, ask Allah for forgiveness, and put right any harm you caused.' },
  { id: 'gratitude', title: 'Gratitude & contentment', short: 'Gratitude', invitation: 'I want to appreciate what I have', description: 'Notice Allah’s gifts and learn to be thankful for them.', route: [37, 38, 30, 76], practice: 'Notice one particular gift, thank Allah for it, and choose one way to use it well.' },
  { id: 'kindness', title: 'Kindness & sincerity', short: 'Kindness', invitation: 'I want to treat people better', description: 'Put your faith into action through kindness and sincerity.', route: [12, 58, 77, 87], practice: 'Choose one useful act for another person. Make it small enough to do today, without needing recognition.' },
];

// Source text is generated only by scripts/extract-timeless-source.py.
// Explanations are editable app material. Never substitute them for the book.
export type SourceRun = string | { note: number } | { image: string; alt: string; width: number; height: number } | { break: boolean };
export type SourceBlock = { page: number; kind: string; runs: SourceRun[] };
export type SourceEntry = { id: number; page: number; lastPage: number; blocks: SourceBlock[]; notes: number[] };
export type SourceNote = { id: number; page: number; blocks: SourceBlock[] };
export type SourceCredit = { id: number; names: string[]; references: { label: string; target: string; note?: number; evidence?: string }[] };
export type Seed = { id: number; theme: ThemeId; title: string; takeaway: string; reading: string; prompt: string; page: number; lastPage: number; source: SourceEntry; credit: SourceCredit };
export const sourceEntries = sourceText.entries as SourceEntry[];
export const sourceNotes = sourceText.notes as SourceNote[];
export const sourcePlainText = (blocks: SourceBlock[]) => blocks.map(b => b.runs.map(r => typeof r === 'string' ? r : 'image' in r ? r.alt : 'break' in r ? '\n' : '').join('')).join('\n\n');
export const seeds: Seed[] = explanations.map(row => {
  const source = sourceEntries.find(s => s.id === row.id)!;
  const credit = sourceCredits.find(c => c.id === row.id)!;
  return { ...row, theme: row.theme as ThemeId, page: source.page, lastPage: source.lastPage, source, credit };
});
export const getTheme = (id: ThemeId) => themes.find(t => t.id === id)!;
