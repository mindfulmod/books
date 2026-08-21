# Book 29 art manifest

Five journey plates for *The Censure of Pride and Conceit*. The app references these paths already; dropping the files in makes them appear with no code change.

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

Alt text is already written into `src/book29.ts` and is what each plate has to depict. It is reproduced here as the brief.

### 1. `book29-three-beliefs.jpg` + `book29-three-beliefs-thumb.jpg`
- **Journey** 01 — Why does pride block everything?
- **Accent colour** `#bf7a35`
- **Must depict** A luminous white-and-gold courtyard where three measured plinths of unequal height stand before a closed colonnade of virtue gates.
- **Argument it carries** Pride needs three beliefs — a rank for me, a rank for you, mine above yours — and the state that follows closes every other virtue at once.

### 2. `book29-seven-grounds.jpg` + `book29-seven-grounds-thumb.jpg`
- **Journey** 02 — What am I actually proud of?
- **Accent colour** `#278d91`
- **Must depict** Seven measured niches in a bright marble arcade, two set apart beneath a lamp and five ranged along a garden wall.
- **Argument it carries** Every case of pride reduces to seven grounds; the two religious ones (knowledge and works) are set apart because they are the most dangerous, not the exempt ones.

### 3. `book29-four-motives.jpg` + `book29-four-motives-thumb.jpg`
- **Journey** 03 — Where does pride actually come from?
- **Accent colour** `#c25f50`
- **Must depict** Four brass channels converging on a single gate, one continuing into an empty courtyard where the others fall away.
- **Argument it carries** Four drivers produce identical proud behaviour, and only one of them — ostentation — stops when the observers leave. The empty courtyard is the solitude test.

### 4. `book29-two-stations.jpg` + `book29-two-stations-thumb.jpg`
- **Journey** 04 — How is pride actually treated?
- **Accent colour** `#586fa8`
- **Must depict** A bright cutaway garden court showing a root being lifted from the soil beside five graduated thresholds leading to a level bench.
- **Argument it carries** Two stations of treatment: uprooting the disposition, then five ordinary trials. The bench is level on purpose — sitting conspicuously low is the trap Ghazali names.

### 5. `book29-keys-treasury.jpg` + `book29-keys-treasury-thumb.jpg`
- **Journey** 05 — Why is my good work not mine?
- **Accent colour** `#a97837`
- **Must depict** A sunlit vaulted treasury whose brass keys rest in an open hand at the threshold while the chamber beyond stands full and quiet.
- **Argument it carries** Acts of worship are treasuries; their keys are power, will, and knowledge, and those arrive from elsewhere. The wonder belongs at the handing of the key, not at the movement of the hand.

## Checklist before serving

- [ ] PNG masters saved to `artwork/system-source/`
- [ ] 1600 × 900 JPEGs saved to `public/assets/system/`
- [ ] 480 × 270 `-thumb.jpg` saved alongside each
- [ ] Filenames match exactly, including the `book29-` prefix
- [ ] Generation record appended to `artwork/GENERATION.md`
