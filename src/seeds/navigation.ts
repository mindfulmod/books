import { themes, type ThemeId } from './content';
import { isPathId, type PathId } from './paths';

export type ReadingPart = 'journal' | 'practice' | 'illustration';
export type ReadingEntry = 'start' | 'resume';
export const BEFORE_SEED_NAVIGATION = 'timeless-seeds:before-navigation';

export function seedUrl(id: number, path?: PathId, part?: ReadingPart) {
  const params = new URLSearchParams();
  if (path) params.set('path', path);
  if (part) params.set('part', part);
  return `#seed-${id}${params.size ? `?${params}` : ''}`;
}

const themeIsValid = (value: string | null): value is ThemeId => themes.some(theme => theme.id === value);
export function parseSeedRoute(hash: string, entry: ReadingEntry = 'start', visit = 0) {
  const [route, search = ''] = hash.replace(/^#/, '').split('?');
  const params = new URLSearchParams(search);
  const path = params.get('path');
  const theme = params.get('theme');
  const requestedPart = params.get('part');
  const part: ReadingPart | undefined = requestedPart === 'journal' || requestedPart === 'practice' || requestedPart === 'illustration' ? requestedPart : undefined;
  const match = /^seed-(\d+)$/.exec(route);
  return { view: match ? 'reader' : route || 'today', id: match ? Number(match[1]) : null, path: isPathId(path) ? path : undefined, theme: themeIsValid(theme) ? theme : undefined, part, gardenTab: params.get('tab'), paths: params.get('paths') === '1', entry, visit };
}

export const isSeedRoute = (href: string) => /^#(?:seed-\d+|today|explore|garden|about)(?:\?|$)/.test(href);
