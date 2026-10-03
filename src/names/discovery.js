// Search is independent of display spelling: preserve the source text in the UI.
export function normalizeSearch(value) {
  return String(value ?? '').normalize('NFKD').toLowerCase()
    .replace(/[٠-٩]/g,c=>String(c.charCodeAt(0)-0x660)).replace(/[۰-۹]/g,c=>String(c.charCodeAt(0)-0x6f0))
    .replace(/[\u0300-\u036f\u064b-\u065f\u0670\u06d6-\u06ed\u0640]/g, '')
    .replace(/[أإآٱ]/g, 'ا').replace(/ى/g, 'ي')
    .replace(/[^\p{L}\p{N}]/gu, '');
}

export function filterNames(entries, {query = '', theme = 'all', status = 'all'} = {}, saved = {}) {
  const needle = normalizeSearch(query);
  return entries.filter(n => {
    const haystack = normalizeSearch([n.name, n.arabic, n.meaning, n.theme, ...(n.aliases || [])].join(' '));
    const numberQuery=/^[0-9]+$/.test(needle);
    return (!needle || (numberQuery ? n.number===Number(needle) : haystack.includes(needle)))
      && (theme === 'all' || n.theme === theme)
      && (status !== 'saved' || (saved.bookmarks || []).includes(n.id))
      && (status !== 'finished' || (saved.finished || []).includes(n.id));
  });
}
