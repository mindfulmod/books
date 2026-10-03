export const READING_KEY = 'mindfulmod-seeds-reading-v1';
export type ReadingPreferences = { size: number; spacing: 'comfortable' | 'open'; contrast: boolean };
export const defaultReading: ReadingPreferences = { size: 1, spacing: 'comfortable', contrast: false };
export function validateReading(value: unknown): ReadingPreferences {
  const v = value && typeof value === 'object' ? value as Record<string, unknown> : {};
  return { size: Number.isInteger(v.size) && Number(v.size) >= 0 && Number(v.size) <= 3 ? Number(v.size) : 1, spacing: v.spacing === 'open' ? 'open' : 'comfortable', contrast: v.contrast === true };
}
export function loadReading(): ReadingPreferences {
  try {
    const raw = localStorage.getItem(READING_KEY);
    if (raw) return validateReading(JSON.parse(raw));
    // Preserve the earlier larger-text choice without changing any writing.
    const old = JSON.parse(localStorage.getItem('mindfulmod-timeless-seeds-v1') || '{}');
    return { ...defaultReading, size: old.large === true ? 2 : 1 };
  } catch { return { ...defaultReading }; }
}
