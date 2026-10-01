export type Appearance = 'day' | 'starlight';
export type AppearancePreference = Appearance | 'device';
export const APPEARANCE_KEY = 'mindfulmod-seeds-appearance-v1';
export const PICTURES_KEY = 'mindfulmod-seeds-pictures-v1';
export function loadPictures(): boolean {
  try { return localStorage.getItem(PICTURES_KEY) !== 'hidden'; }
  catch { return true; }
}
export const parsePreference = (value: string | null): AppearancePreference =>
  value === 'day' || value === 'starlight' ? value : 'device';
export const resolveAppearance = (preference: AppearancePreference, dark: boolean): Appearance =>
  preference === 'device' ? (dark ? 'starlight' : 'day') : preference;
export function loadPreference(): AppearancePreference {
  try { return parsePreference(localStorage.getItem(APPEARANCE_KEY)); }
  catch { return 'device'; }
}
export const scenePath = (scene: string, width: number, appearance: Appearance) =>
  `assets/timeless-seeds/coastal/${appearance === 'starlight' ? 'starlight/' : ''}${scene}-${width}.webp`;
export const illustrationPath = (prefix: string, width: number) => `${prefix}-${width}.webp`;
