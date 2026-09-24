# Book 21 art manifest

Five journey plates for *The Wonders of the Heart*. Four already exist and are served; one is new. The app references all five paths already; dropping the new file in makes it appear with no code change.

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

Alt text is already written into `src/book21journeys.ts` and is what each plate has to depict. It is reproduced here as the brief. This book has five journeys; plates 1–4 are existing and unchanged, plate 5 is needed.

**Set note.** The existing four plates are symbolic painted objects — compass, reservoir and mirror, brass gates, pomegranate branch — rather than scenes with people. The new plate should sit with them: an emblem, not an illustration of the devil. Ghazali refuses to describe what the devil is made of and tells the reader to study his ways in instead, so the plate shows the ways in and nothing of the enemy.

### 1. `journey-heart.jpg` + `journey-heart-thumb.jpg` (existing)
- **Journey** 01 — What is the heart?
- **Accent colour** `#3567a6`
- **Must depict** Symbolic painted compass surrounded by four balanced coloured medallions and flowering plants.

### 2. `journey-knowing.jpg` + `journey-knowing-thumb.jpg` (existing)
- **Journey** 02 — How does knowing happen?
- **Accent colour** `#21867e`
- **Must depict** Symbolic painted reservoir receiving clear water beside a polished brass mirror reflecting light.

### 3. `journey-action.jpg` + `journey-action-thumb.jpg` (existing)
- **Journey** 03 — How does a thought become an action?
- **Accent colour** `#c85b42`
- **Must depict** A luminous seed travelling through six coloured brass gates before becoming a clear outward footprint.

### 4. `journey-change.jpg` + `journey-change-thumb.jpg` (existing)
- **Journey** 04 — What makes change last?
- **Accent colour** `#86577f`
- **Must depict** A painted brass compass encircled by blue and coral currents and a flowering pomegranate branch.

### 5. `book21-the-gates.jpg` + `book21-the-gates-thumb.jpg` (NEW)
- **Journey** 05 — How does the devil get in?
- **Accent colour** `#5d6b3a`
- **Must depict** A walled fortress at dusk seen from above, many small gates in its wall standing ajar and a single lit gate facing upward.
- **Argument it carries** Ghazali pictures the heart as a fortress whose gates are the person's own traits — anger, envy, greed, a full stomach, haste, money, partisanship, suspicion — and says the devil's doors are many while the angels' door is one. So: *many* low gates round the wall, all slightly open and unlit; *one* gate, different from the others, open towards the sky and lit from within. No figures, no devil, no horns or smoke-creatures — the enemy is known only by where he gets in. Dusk light, so the lit gate is the brightest point. Keep the lit gate and most of the wall inside the central band.
