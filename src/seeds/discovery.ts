import { getTheme, sourcePlainText, type Seed } from './content';

export const readingMinutes = (seed: Seed) => Math.max(1, Math.ceil(`${seed.reading} ${sourcePlainText(seed.source.blocks)}`.split(/\s+/).length / 200));
export const searchNeedle = (query: string) => query.toLocaleLowerCase().trim().replace(/^#/, '');
export function matchesSeed(seed: Seed, query: string) {
  const needle = searchNeedle(query);
  if (!needle) return true;
  if (/^\d+$/.test(needle)) return seed.id === Number(needle);
  return [seed.title, seed.takeaway, seed.reading, sourcePlainText(seed.source.blocks), seed.prompt, getTheme(seed.theme).title].some(text => text.toLocaleLowerCase().includes(needle));
}
export function excerptFor(seed: Seed, query: string): { text: string; from?: string } {
  const needle = searchNeedle(query);
  if (!needle || /^\d+$/.test(needle)) return { text: seed.takeaway };
  const fields = [{ text: seed.takeaway }, { text: seed.reading, from: 'Explanation' }, { text: sourcePlainText(seed.source.blocks), from: 'Original words' }, { text: seed.prompt, from: 'Reflection' }, { text: getTheme(seed.theme).title, from: 'Theme' }];
  const match = fields.find(field => field.text.toLocaleLowerCase().includes(needle));
  if (!match) return { text: seed.takeaway };
  const text = match.text.replace(/\s+/g, ' ');
  const at = text.toLocaleLowerCase().indexOf(needle);
  const start = at > 65 ? text.lastIndexOf(' ', at - 45) + 1 : 0;
  const desired = Math.max(start + 180, at + needle.length);
  const space = text.indexOf(' ', desired);
  const end = text.length <= desired || space === -1 ? text.length : space;
  return { text: `${start ? '…' : ''}${text.slice(start, end)}${end < text.length ? '…' : ''}`, from: match.from };
}
