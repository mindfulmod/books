# Book 5 art manifest

Four journey plates for *The Mysteries of Almsgiving*. The app references these paths already; dropping the files in makes them appear with no code change.

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

Alt text is already written into `src/book05.ts` and is what each plate has to depict. It is reproduced here as the brief. This book has four journeys rather than five.

**Set note.** No hands, no figures, and no transaction shown in progress. Half this book is about the person receiving, and any image of one person handing something to another puts the viewer on the giver's side — which is exactly the asymmetry the third section exists to correct.

### 1. `book05-the-test.jpg` + `book05-the-test-thumb.jpg`
- **Journey** 01 — Why is paying money a pillar of Islam?
- **Accent colour** `#278d91`
- **Must depict** A balance scale on a table with a single coin in one pan and the other pan empty and level with it.
- **Argument it carries** Alms is a test of the claim the testimony makes: love admits no partner, and a lover is tested only by parting. The beam must be *level* with only one pan loaded — the plate is about a claim being checked, not a debt being weighed out. One coin, plainly ordinary, and nothing else on the table.

### 2. `book05-two-hands.jpg` + `book05-two-hands-thumb.jpg`
- **Journey** 02 — Should anyone know I gave it?
- **Accent colour** `#bf7a35`
- **Must depict** A folded cloth on a threshold with a small purse set beneath its edge, half covered and half visible.
- **Argument it carries** Concealment is a three-point scale, not a rule: secret, made public, and spoken of afterward. The purse must be genuinely *half* covered — the plate sits at the point where the scale is undecided, which is where the giver's judgement actually happens. Despite the plate's name, no hands are visible.

### 3. `book05-the-fraction.jpg` + `book05-the-fraction-thumb.jpg`
- **Journey** 03 — What can spoil a gift already given?
- **Accent colour** `#c25f50`
- **Must depict** A heaped measure of grain on a table beside a single small scoop, the scoop plainly a fraction of the heap.
- **Argument it carries** A tenth, or a quarter of a tenth, is little out of much — the meanest degree of giving, and fit to be ashamed of rather than counted great. The disproportion must be obvious at a glance and slightly uncomfortable. The scoop must be full and neatly levelled: nothing is being done wrong here, which is what makes the proportion the point.

### 4. `book05-the-yield.jpg` + `book05-the-yield-thumb.jpg`
- **Journey** 04 — What about the person receiving?
- **Accent colour** `#586fa8`
- **Must depict** A granary door standing open with sacks stacked inside and a single filled basket set outside on the step.
- **Argument it carries** The toil of gathering and guarding falls on the rich while the benefit flows past them to the poor. The stacked sacks are the labour and the basket on the step is the yield, and the door standing *open* and unattended is what makes the direction read. Nobody in the frame; the arrangement carries the whole argument.
