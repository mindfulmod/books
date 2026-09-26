# Book 30 art manifest

Six journey plates for *The Censure of Delusion*. The app references these paths already; dropping the files in makes them appear with no code change.

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

Alt text is already written into `src/book30.ts` and is what each plate has to depict. It is reproduced here as the brief.

### 1. `book30-hidden-argument.jpg` + `book30-hidden-argument-thumb.jpg`
- **Journey** 01 — How does a false belief feel true?
- **Accent colour** `#bf7a35`
- **Must depict** A luminous white-and-gold hall where a brass balance weighs a present coin against a distant one, with a fine inlaid line running beneath both pans.
- **Argument it carries** Every delusion runs an unstated syllogism. The inlaid line is the hidden premise — "the present is better than the deferred" — which holds only when the two are equal.

### 2. `book30-hope-and-wishing.jpg` + `book30-hope-and-wishing-thumb.jpg`
- **Journey** 02 — Is this hope or am I wishing?
- **Accent colour** `#278d91`
- **Must depict** A sunlit courtyard where one turquoise channel runs on toward an open gate and another spreads still and shallow before a closed arcade.
- **Argument it carries** The criterion is what the expectation produces. Hope moves toward repentance or effort; delusion settles into idleness. Two channels, same water, opposite outcomes.

### 3. `book30-remedy-and-residue.jpg` + `book30-remedy-and-residue-thumb.jpg`
- **Journey** 03 — Can knowing be the thing that ruins me?
- **Accent colour** `#c25f50`
- **Must depict** An ivory apothecary arcade where a written prescription lies sealed beside an untouched vessel, and a cultivated bed shows fine roots spreading beneath cleared soil.
- **Argument it carries** Two failures of the learned in one frame: the remedy learned and never taken, and the weeding declared finished while finer roots spread under ground already cleared.

### 4. `book30-review-and-armour.jpg` + `book30-review-and-armour-thumb.jpg`
- **Journey** 04 — Can worship itself go wrong?
- **Accent colour** `#586fa8`
- **Must depict** A bright marble review court where a suit of armour and a patched robe hang empty on a stand beside a plain bench and an open ledger.
- **Argument it carries** Ghazali's review: everything acquired without struggle — the armour, the patched robe, the vocabulary — comes off at the examination, and only what was actually undertaken is weighed. No figure should appear; the stand is empty on purpose.

### 5. `book30-not-yet.jpg` + `book30-not-yet-thumb.jpg`
- **Journey** 05 — What happens once I escape?
- **Accent colour** `#a97837`
- **Must depict** A quiet luminous arcade at dusk where a single lamp burns beside an unmarked foundation stone and an open doorway leads onward.
- **Argument it carries** The book's closing regress. The unmarked stone is the dinar given without an inscription; the open doorway is the outcome left open, and the answer at the last breath is "not yet." This is the quietest plate in the set and should stay so.

## Checklist before serving

- [ ] PNG masters saved to `artwork/system-source/`
- [ ] 1600 × 900 JPEGs saved to `public/assets/system/`
- [ ] 480 × 270 `-thumb.jpg` saved alongside each
- [ ] Filenames match exactly, including the `book30-` prefix
- [ ] Generation record appended to `artwork/GENERATION.md`

### 6. `book30-the-star.jpg` + `book30-the-star-thumb.jpg`
- **Journey** 06 — How far does delusion follow you?
- **Accent colour** `#7d6a4f`
- **Must depict** A single bright star reflected in a still basin of water at night, the real star faint in the dark sky above it.
- **Argument it carries** From the Sufis' section: the Christians looked at the Messiah "like someone who sees a star in a mirror or in water, and thinks the star is in the water, and stretches out his hand to take it"; and Abraham's star, the first of the veils of light that look like arrival. The reflection must be brighter and more inviting than the true star, which should be visible but easy to miss. No hand, no figure — the viewer is the one tempted to reach.
