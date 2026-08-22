# Book 11 art manifest

Three journey plates for *The Etiquette of Eating* — the book that opens the Quarter of Customs. The app references these paths already; dropping the files in makes them appear with no code change.

## Specs

| | |
|---|---|
| Serving directory | `public/assets/system/` |
| Master directory | `artwork/system-source/` (full-resolution PNG) |
| Full size | 1600 × 900 JPEG (16:9) |
| Thumbnail | 480 × 270 JPEG |
| Thumbnail path | derived automatically by replacing `.jpg` with `-thumb.jpg` — both files are required |
| Crop safety | the extreme top and bottom are cropped on narrow viewports; keep the load-bearing content out of those bands |

## Files

Alt text is already written into `src/book11.ts` and is what each plate has to depict. It is reproduced here as the brief. This book has three journeys.

**Set note.** No people and no hands anywhere in this set — the three plates are three table arrangements, and the number of settings is what carries the argument each time. Keep the food plain and unidentifiable; nothing here should look like a recipe or a feast.

### 1. `book11-one-place.jpg` + `book11-one-place-thumb.jpg`
- **Journey** 01 — Is there an etiquette of eating alone?
- **Accent colour** `#278d91`
- **Must depict** A single place set at a plain wooden table with a covered dish, a cup of water, and a folded cloth.
- **Argument it carries** There is a full chapter of manners for a meal nobody sees, and it is the longest of the four. The setting must be *properly laid* — cloth folded, cup filled, dish covered — with exactly one place. The care is the point: this is not a hurried solitary meal but a considered one, and nobody is watching.

### 2. `book11-shared-dish.jpg` + `book11-shared-dish-thumb.jpg`
- **Journey** 02 — What changes when someone else is at the table?
- **Accent colour** `#bf7a35`
- **Must depict** One wide dish between two place settings, with a single serving taken from the near side only.
- **Argument it carries** Eat from what is next to you. Every manner company adds is a preference postponed — the first bite, the larger share, the faster pace. The dish must be visibly disturbed on *one side only*, and the far side untouched and even. Two settings, equal in every respect.

### 3. `book11-the-burden.jpg` + `book11-the-burden-thumb.jpg`
- **Journey** 03 — What does hosting actually require?
- **Accent colour** `#c25f50`
- **Must depict** A table laid far more elaborately than its single guest's place requires, with more dishes than the setting can reach.
- **Argument it carries** Do not burden yourselves for the guest, so that you come to dislike him. The excess must read as *effort*, not as wealth — many dishes, carefully arranged, plainly costly in labour. The single place setting against all of it is what makes the plate uncomfortable. Nothing is spoiled or wasted; it is simply far too much.
