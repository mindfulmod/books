# Book 17 art manifest

Two journey plates for *The Etiquette of Travel*. The app references these paths already; dropping the files in makes them appear with no code change.

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

Alt text is already written into `src/book17.ts` and is what each plate has to depict. It is reproduced here as the brief. This book has two journeys.

**Set note.** No travellers, no caravans, no romance of the road. The book's argument is that a journey is a loop with a motive, and both plates are about the motive rather than the travelling — one at the moment of choosing, one at the moment of return.

### 1. `book17-fork.jpg` + `book17-fork-thumb.jpg`
- **Journey** 01 — Why am I actually going?
- **Accent colour** `#278d91`
- **Must depict** A road forking at a plain waymarker on open ground, both branches equally worn.
- **Argument it carries** Every journey is either flight or seeking — the motive lives behind or ahead. The two branches must be *equally worn*: the book takes no side, and a plate that made one path look more travelled would answer a question it leaves open. The waymarker should be unlettered. Level daylight, no weather.

### 2. `book17-the-return.jpg` + `book17-the-return-thumb.jpg`
- **Journey** 02 — What does the road ask of me?
- **Accent colour** `#bf7a35`
- **Must depict** A travelling bag set down inside a doorway, still fastened, with the door open behind it.
- **Argument it carries** The sequence runs to the last return, not to the destination — because whether what was sought was obtained only becomes visible at home. The bag must be *inside* the threshold and still closed: arrived, not yet unpacked. The open door behind it is the journey still visible. Warm interior light against ordinary daylight outside.
