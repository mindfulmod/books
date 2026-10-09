import type { SystemBook } from '../systemTypes';

const loaders: Record<number, () => Promise<SystemBook>> = {
  1: () => import('../book01').then(module => module.book01),
  2: () => import('../book02').then(module => module.book02),
  3: () => import('../book03').then(module => module.book03),
  4: () => import('../book04').then(module => module.book04),
  5: () => import('../book05').then(module => module.book05),
  6: () => import('../book06').then(module => module.book06),
  7: () => import('../book07').then(module => module.book07),
  8: () => import('../book08').then(module => module.book08),
  9: () => import('../book09').then(module => module.book09),
  10: () => import('../book10').then(module => module.book10),
  11: () => import('../book11').then(module => module.book11),
  12: () => import('../book12').then(module => module.book12),
  13: () => import('../book13').then(module => module.book13),
  14: () => import('../book14').then(module => module.book14),
  15: () => import('../book15').then(module => module.book15),
  16: () => import('../book16').then(module => module.book16),
  17: () => import('../book17').then(module => module.book17),
  18: () => import('../book18').then(module => module.book18),
  19: () => import('../book19').then(module => module.book19),
  20: () => import('../book20').then(module => module.book20),
  21: () => import('../book21').then(module => module.book21),
  22: () => import('../book22').then(module => module.book22),
  23: () => import('../book23').then(module => module.book23),
  24: () => import('../book24').then(module => module.book24),
  25: () => import('../book25').then(module => module.book25),
  26: () => import('../book26').then(module => module.book26),
  27: () => import('../book27').then(module => module.book27),
  28: () => import('../book28').then(module => module.book28),
  29: () => import('../book29').then(module => module.book29),
  30: () => import('../book30').then(module => module.book30),
  31: () => import('../book31').then(module => module.book31),
  32: () => import('../book32').then(module => module.book32),
  33: () => import('../book33').then(module => module.book33),
  34: () => import('../book34').then(module => module.book34),
  35: () => import('../book35').then(module => module.book35),
  36: () => import('../book36').then(module => module.book36),
  37: () => import('../book37').then(module => module.book37),
  38: () => import('../book38').then(module => module.book38),
  39: () => import('../book39').then(module => module.book39),
  40: () => import('../book40').then(module => module.book40),
};
type Resource = { promise: Promise<SystemBook>; value?: SystemBook; error?: unknown };
const resources = new Map<number, Resource>();
function resourceFor(id: number) {
  const existing = resources.get(id);
  if (existing) return existing;
  if (!loaders[id]) throw new Error('This book is not in the collection.');
  const resource: Resource = { promise: loaders[id]() };
  resource.promise = resource.promise.then(book => { resource.value = book; return book; }, error => { resource.error = error; throw error; });
  resources.set(id, resource);
  return resource;
}
export function readBook(id: number): SystemBook {
  const resource = resourceFor(id);
  if (resource.value) return resource.value;
  if (resource.error) throw resource.error;
  throw resource.promise;
}
export function loadAllBooks() { return Promise.all(Object.keys(loaders).map(id => resourceFor(Number(id)).promise)); }
