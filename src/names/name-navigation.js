// Keep the full index available without putting 99 rows into the first view.
export function pageOfNames(entries, requestedPage = 0, size = 8) {
  const pages = Math.max(1, Math.ceil(entries.length / size));
  const page = Math.max(0, Math.min(pages - 1, Math.floor(Number(requestedPage) || 0)));
  return {page, pages, items:entries.slice(page * size, (page + 1) * size),
    start:entries.length ? page * size + 1 : 0, end:Math.min((page + 1) * size, entries.length)};
}

// Migration fallback preserves a bookmark made before per-name places existed.
export function readingPlace(saved, id, design) {
  const place = saved.positions?.[id] || (saved.last?.id === id ? saved.last : null);
  if (!place || place.design !== design) return null;
  return {...place, page:Math.max(0, Math.min(3, Number(place.page) || 0)),
    scroll:Number.isFinite(place.scroll) ? Math.max(0, place.scroll) : 0};
}
