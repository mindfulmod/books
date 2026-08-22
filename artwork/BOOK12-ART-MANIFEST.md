# Book 12 art manifest

Three journey plates for *The Etiquette of Marriage*. The app references these paths already; dropping the files in makes them appear with no code change.

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

Alt text is already written into `src/book12.ts` and is what each plate has to depict. It is reproduced here as the brief. This book has three journeys.

**Set note — important.** No people, no couples, no rings, no domestic interiors, and nothing that reads as a wedding. This edition presents only the book's first chapter — a weighing of five benefits against three harms, reaching different answers for different people — and deliberately does not carry the counsel of its second and third chapters. All three plates are therefore instruments of measurement and accounting. Anything romantic or domestic would advertise content the edition does not contain.

### 1. `book12-two-pans.jpg` + `book12-two-pans-thumb.jpg`
- **Journey** 01 — Is marrying better, or not?
- **Accent colour** `#278d91`
- **Must depict** A balance with five small stones in one pan and three larger ones in the other, the beam very slightly tipped.
- **Argument it carries** Five benefits weighed against three harms, with the answer coming out differently for different people. The tip must be *very slight and ambiguous* — a viewer should not be able to say confidently which side is down. Five and three must both be countable at a glance. Plain river stones, no ornament.

### 2. `book12-same-stone.jpg` + `book12-same-stone-thumb.jpg`
- **Journey** 02 — What is actually being weighed?
- **Accent colour** `#bf7a35`
- **Must depict** One stone resting exactly on the pivot of a balance, touching neither pan.
- **Argument it carries** The fifth benefit and the second harm are the same circumstance — bearing what a household is owed — and which one it is depends entirely on the person. The stone must sit *precisely* on the fulcrum, plainly belonging to neither side. It should be the same kind of stone as those in plate 1, so the connection reads.

### 3. `book12-two-ledgers.jpg` + `book12-two-ledgers-thumb.jpg`
- **Journey** 03 — How does the weighing come out?
- **Accent colour** `#c25f50`
- **Must depict** Two account books open side by side, ruled identically, with different entries and different totals.
- **Argument it carries** Ghazali works two cases to opposite conclusions, using an accounting metaphor: a supposed future good is profit, and religion is capital. The ledgers must be *identically ruled* — the same method applied twice — and the totals visibly different. No legible words; columns and figures only, so nothing can be read as a verdict.
