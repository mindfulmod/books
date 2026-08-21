# Book 31 art manifest

Five journey plates for *Repentance*, the first book of the Quarter of Deliverance. The app references these paths already; dropping the files in makes them appear with no code change.

## Specs

| | |
|---|---|
| Serving directory | `public/assets/system/` |
| Master directory | `artwork/system-source/` (full-resolution PNG) |
| Full size | 1600 × 900 JPEG (16:9) |
| Thumbnail | 480 × 270 JPEG |
| Thumbnail path | derived automatically by replacing `.jpg` with `-thumb.jpg` — both files are required |
| Crop safety | the extreme top and bottom are cropped on narrow viewports; keep the load-bearing content out of those bands |

## A note on the quarter's turn

The Perils quarter's plates carried diagnosis — obstructions, gates, traps. This quarter carries return. If a visual distinction between the two quarters is wanted, this is the natural place to establish it: light entering rather than being blocked, roads continuing rather than closing, thresholds open rather than guarded.

## Files

Alt text is already written into `src/book31.ts` and is what each plate has to depict. It is reproduced here as the brief.

### 1. `book31-three-parts.jpg` + `book31-three-parts-thumb.jpg`
- **Journey** 01 — What actually counts as repentance?
- **Accent colour** `#bf7a35`
- **Must depict** A luminous white-and-gold chamber where a lamp, a still basin, and a threshold opening three ways stand in a single line.
- **Argument it carries** Repentance is three ordered things: knowledge (the lamp), regret (the basin taking its light), and an act facing present, future, and past at once (the threshold's three openings). The single line matters — the order is causal, not a list.

### 2. `book31-open-door.jpg` + `book31-open-door-thumb.jpg`
- **Journey** 02 — Is it too late, or too soon?
- **Accent colour** `#278d91`
- **Must depict** A bright marble arcade of four successive arches, each narrower than the last, opening onto a lit and unbarred doorway.
- **Argument it carries** The first pillar closes exits one after another — it is owed, owed now, owed by everyone, in every state — and what the narrowing leads to is a door that is open. The final doorway must read as unbarred, not as a trap.

### 3. `book31-drops-on-stone.jpg` + `book31-drops-on-stone-thumb.jpg`
- **Journey** 03 — How bad is this, really?
- **Accent colour** `#c25f50`
- **Must depict** A sunlit stone basin where slow water drops have worn a channel in the rim beside a full vessel poured out and leaving no mark.
- **Argument it carries** Ghazali's own image for persistence: drops falling in succession wear the stone, while the same quantity poured at once leaves nothing. Both halves must be legible in one frame or the argument does not land.

### 4. `book31-ledger-and-road.jpg` + `book31-ledger-and-road-thumb.jpg`
- **Journey** 04 — What does it take to make it stick?
- **Accent colour** `#586fa8`
- **Must depict** An ivory courtyard where an open ledger and a small sealed purse rest beside a turquoise channel continuing through an open gate.
- **Argument it carries** A maintained repentance contains work: the wrongs enumerated one by one (the ledger), what is owed to people set aside for return (the purse), and the road continuing past both (permanence to the end of life). No writing on the ledger.

### 5. `book31-two-ingredients.jpg` + `book31-two-ingredients-thumb.jpg`
- **Journey** 05 — Why don't I start?
- **Accent colour** `#a97837`
- **Must depict** A bright apothecary niche where a honey vessel and a vinegar flask stand either side of one shallow mixing bowl on a marble sill.
- **Argument it carries** Persistence has two causes and needs two ingredients: the sweetness of knowledge against heedlessness and the bitterness of patience against appetite, kneaded together as oxymel joins sugar and vinegar. The single bowl is the point — neither vessel alone is the cure.

## Checklist before serving

- [ ] PNG masters saved to `artwork/system-source/`
- [ ] 1600 × 900 JPEGs saved to `public/assets/system/`
- [ ] 480 × 270 `-thumb.jpg` saved alongside each
- [ ] Filenames match exactly, including the `book31-` prefix
- [ ] Generation record appended to `artwork/GENERATION.md`
