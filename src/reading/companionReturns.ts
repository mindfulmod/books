/** Read only the saved location metadata. Reflections stay in their own companions. */
export type CompanionReturn = { id: 'prayer' | 'seeds' | 'names'; book: string; title: string; detail: string; path: string; image: string };
const paths = ['hope','trust','presence','return','gratitude','kindness','after-argument','waiting','starting-again','living-with-loss'];
export function companionReturns(storage: Pick<Storage, 'getItem'>): CompanionReturn[] {
  const read = (key: string) => { try { const value = JSON.parse(storage.getItem(key) ?? 'null'); return value && typeof value === 'object' && !Array.isArray(value) ? value : null; } catch { return null; } };
  const result: CompanionReturn[] = [];
  const prayer = read('idp-bookmark-v2');
  if (prayer && typeof prayer.id === 'string' && /^[a-z][a-z0-9-]{0,120}$/.test(prayer.id) && typeof prayer.title === 'string' && prayer.title.trim()) result.push({
    id:'prayer', book:'Inner Dimensions of the Prayer', title:prayer.title.slice(0,180), detail:prayer.section === 'complete' ? 'Complete companion' : 'Illustrated guide',
    path:`inner-dimensions-of-the-prayer.html#${encodeURIComponent(prayer.id)}`, image:'assets/inner-dimensions/threshold.webp',
  });
  const seeds = read('mindfulmod-timeless-seeds-v1');
  if (seeds && Number.isInteger(seeds.last) && seeds.last >= 1 && seeds.last <= 111) result.push({
    id:'seeds', book:'Timeless Seeds of Advice', title:`Seed ${seeds.last} of 111`, detail:paths.includes(seeds.lastPath) ? 'Continue your four-seed path' : 'Continue in book order',
    path:`timeless-seeds.html#seed-${seeds.last}${paths.includes(seeds.lastPath) ? `?path=${seeds.lastPath}` : ''}`, image:'assets/timeless-seeds/coastal/coastal-home-480.webp',
  });
  const names = read('beautiful-names-library-v1');
  const last = names?.last;
  if (last && typeof last.id === 'string' && /^[a-z][a-z0-9-]{0,70}$/.test(last.id)) result.push({
    id: 'names', book: 'The Beautiful Names', title: typeof last.section === 'string' && last.section.trim() ? last.section.slice(0,180) : 'Continue your reading',
    detail: 'Your last Name', path: `beautiful-names/#read/${encodeURIComponent(last.id)}/${Number.isInteger(last.page) && last.page >= 0 && last.page <= 3 ? last.page : 0}`,
    image: 'assets/beautiful-names/art/cover-day.webp',
  });
  return result;
}
