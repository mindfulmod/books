# Book 32 art manifest

Six journey plates for *Patience and Gratitude*. This is the longest book in the edition and the only one so far with six journeys rather than five. The app references these paths already; dropping the files in makes them appear with no code change.

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

Alt text is already written into `src/book32.ts` and is what each plate has to depict. It is reproduced here as the brief.

### 1. `book32-two-motives.jpg` + `book32-two-motives-thumb.jpg`
- **Journey** 01 — What is patience actually made of?
- **Accent colour** `#bf7a35`
- **Must depict** A luminous white-and-gold hall where two brass currents meet along a single inlaid line, neither yet giving way.
- **Argument it carries** Patience is the steadiness of the religious motive against the motive of appetite. The war is unresolved on purpose — the outcome swings, and the battlefield is the heart. Neither current should read as winning.

### 2. `book32-many-names.jpg` + `book32-many-names-thumb.jpg`
- **Journey** 02 — Why do I fail at only some of it?
- **Accent colour** `#278d91`
- **Must depict** A bright marble arcade of identical brass lamps, each set in a differently shaped niche along one continuous wall.
- **Argument it carries** Continence, forbearance, courage, contentment: one capacity named differently by what it meets. The lamps must be identical and the niches must differ — that inversion is the whole point.

### 3. `book32-bow-and-shield.jpg` + `book32-bow-and-shield-thumb.jpg`
- **Journey** 03 — How do I actually hold?
- **Accent colour** `#c25f50`
- **Must depict** A sunlit courtyard where a shuttered lattice, a covered dish, and an open garden gate stand along one turquoise channel.
- **Argument it carries** The three ways of weakening the pull: cut the provocation (the shutter, against the glance), cut the material (the covered dish), and supply the lawful equivalent (the open gate). No weapon imagery — the remedy is arrangement, not combat.

### 4. `book32-right-use.jpg` + `book32-right-use-thumb.jpg`
- **Journey** 04 — What is gratitude, if nothing returns?
- **Accent colour** `#586fa8`
- **Must depict** An ivory workshop sill where a fine tool rests in the exact recess cut for it, beside a second recess left empty.
- **Argument it carries** Since nothing can return to the Giver, gratitude for a thing is using it for what it was given for. The empty recess is what a blessing held without its purpose looks like.

### 5. `book32-uninterrupted.jpg` + `book32-uninterrupted-thumb.jpg`
- **Journey** 05 — Why am I not grateful?
- **Accent colour** `#a97837`
- **Must depict** A bright colonnade where a single unbroken turquoise channel runs the full length, unremarked, past many small attended fountains.
- **Argument it carries** The blessings most reliably unthanked are the ones that have never once been interrupted. The attended fountains must read as receiving all the care while the constant channel receives none.

### 6. `book32-two-duties.jpg` + `book32-two-duties-thumb.jpg`
- **Journey** 06 — Which does this call for?
- **Accent colour** `#bf7a35`
- **Must depict** A luminous court where one turquoise channel divides at a brass sill and both branches continue into the same lit garden.
- **Argument it carries** The book's usable result: on most things both duties are owed at once. Both branches must continue and arrive — this is not a fork where one path is chosen over the other.

## Checklist before serving

- [ ] PNG masters saved to `artwork/system-source/`
- [ ] 1600 × 900 JPEGs saved to `public/assets/system/`
- [ ] 480 × 270 `-thumb.jpg` saved alongside each
- [ ] Filenames match exactly, including the `book32-` prefix
- [ ] Six plates for this book, not five
- [ ] Generation record appended to `artwork/GENERATION.md`
