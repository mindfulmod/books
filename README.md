# The Revival interactive reading app

Published site: <https://mindfulmod.github.io/books/>

A reading library with four companions:

- **The Ihya** at `/system`: all forty books, with Brief, Deep, and Sources reading depths, visual explanations, guided journeys, and a local notebook.
- **Inner Dimensions of the Prayer** at `/inner-dimensions-of-the-prayer.html`: an illustrated guide, fourteen movements, and a complete companion with 59 English and Arabic passages.
- **Timeless Seeds of Advice** at `/timeless-seeds.html`: 111 original readings, separate explanations, feeling and situation paths, and Day/Starlight artwork.
- **The Beautiful Names** at `/beautiful-names/`: 99 illustrated readings with source notes, paths, and a personal reading room.

The bookshelf opens at the published root. The original `/isfahan` and `/world` architectural studies remain available as legacy routes.

Fonts are served locally with their licenses. Islamic geometric ornament provenance is recorded in `public/assets/reading-geometry/provenance.json`. Reading preferences and private writing remain in the reader's browser.

## Run locally

```bash
npm ci
npm run dev
```

Create a production build with:

```bash
npm run check
npm run build
```

Pushes to `main` automatically run the release checks, build, and publish the library through GitHub Pages. The production build uses `/books/` as its asset base and includes a single-page fallback for direct links.

## Current build

The System edition carries **all forty books** — the complete Ihya': the Quarter of Worship, books 1 to 10; the Quarter of Customs, books 11 to 20; the Quarter of Perils, books 21 to 30; and the Quarter of Deliverance, books 31 to 40.

| Book | Title | Sections | Journeys | Instrument |
|---|---|---|---|---|
| 1 | Knowledge | 48 | 8 | What is obligatory on you now |
| 2 | The Principles of the Creed | 20 | 5 | How much argument does this call for? |
| 3 | The Mysteries of Purification | 20 | 5 | Which rank, and which half |
| 4 | The Mysteries of Prayer | 30 | 6 | Where the prayer is failing |
| 5 | The Mysteries of Almsgiving | 32 | 5 | Three considerations, not two |
| 6 | The Mysteries of Fasting | 11 | 3 | Which degree, and what ended it |
| 7 | The Mysteries of Pilgrimage | 22 | 5 | Which journey are you provisioned for |
| 8 | The Etiquette of Quran Recitation | 25 | 4 | Where did that reading come from |
| 9 | Invocations and Supplications | 16 | 4 | What asking is, and what remembrance is |
| 10 | The Arrangement of Litanies | 30 | 4 | Why the practice stopped |
| 11 | The Etiquette of Eating | 28 | 4 | Which circle, and where it goes wrong |
| 12 | The Etiquette of Marriage | 17 | 3 | Five against three |
| 13 | The Etiquette of Earning | 28 | 4 | Valid, just, or excellent |
| 14 | The Lawful and the Unlawful | 23 | 3 | Should you ask |
| 15 | The Etiquette of Companionship | 24 | 3 | Eight rights, and one friendship |
| 16 | The Etiquette of Seclusion | 22 | 3 | Six against seven |
| 17 | The Etiquette of Travel | 19 | 3 | Flight, or seeking |
| 18 | Listening and Ecstasy | 24 | 3 | Four listeners, one sound |
| 19 | Enjoining Right and Forbidding Wrong | 23 | 4 | How far up the ladder |
| 20 | The Manners of Living and the Character of Prophecy | 26 | 4 | Which end are you working from |
| 21 | The Wonders of the Heart | 21 | 5 | Five obstructions |
| 22 | Disciplining the Soul and Refining Character | 28 | 5 | Four mirrors |
| 23 | Breaking the Two Desires | 10 | 4 | Four measures |
| 24 | The Banes of the Tongue | 39 | 7 | Speech atlas |
| 25 | The Condemnation of Anger, Rancour, and Envy | 25 | 5 | Moral-state path |
| 26 | The Censure of This World | 28 | 6 | World lens |
| 27 | The Censure of Wealth and Miserliness | 29 | 5 | Five-gate wealth ledger |
| 28 | The Censure of Status and Ostentation | 37 | 5 | Audience chamber |
| 29 | The Censure of Pride and Conceit | 25 | 5 | Solitude test |
| 30 | The Censure of Delusion | 31 | 6 | Substitution test |
| 31 | Repentance | 36 | 6 | Three-part check |
| 32 | Patience and Gratitude | 32 | 6 | Duty finder |
| 33 | Fear and Hope | 26 | 6 | Fear and hope diagnostic |
| 34 | Poverty and Abstinence | 38 | 6 | Two ladders |
| 35 | Unity and Trust | 26 | 6 | The advocate's conditions |
| 36 | Love, Longing, Closeness and Contentment | 37 | 6 | Where the gaze rests |
| 37 | Intention, Sincerity, and Truthfulness | 32 | 6 | Weighing the motive |
| 38 | Vigilance and Self-Examination | 27 | 6 | The three registers |
| 39 | Reflection | 17 | 5 | Two knowledges, or someone's word |
| 40 | Remembrance of Death and the Afterlife | 35 | 5 | How far ahead have you provisioned? |

Every book now carries the same layers, so the quarter reads at one depth throughout.

Shared across every book:

- Four reading depths per section: a 30-second distinction, the core reading, a full argument analysis, and source grounding
- Question-led journeys with an interactive mechanism map
- Named distinctions, misreading guards, reflections, and a self-audit per section
- Visual argument models beside the reading copy
- Editorial navigation filters that preserve each book's own source order
- A four-quarter library showing all forty books, with honest closed states and per-book progress
- Bookmarks and read progress saved in the browser
- Desktop and mobile layouts
- A per-book source ledger and an editorial note stating what the synthesis is and is not

Each book's reading copy is an original English synthesis made from a complete reading of the public Arabic text. It is not a translation, not a critical edition, and not a substitute for either. The source ledger in the interface records the primary Arabic used and the bibliographic status of any published English edition. Books without reviewed interactive content are absent rather than filled with generated placeholder text.

## Visual asset note

Books 29 through 32 ship without their journey plates. The manifests in `artwork/` list the exact filenames, dimensions, and the argument each plate has to carry; the app already references those paths, so dropping the files in requires no code change.

The four concept plates in `public/assets/` are optimized display copies of interpretive illustrations generated for this prototype. Full-resolution PNG masters are preserved in `artwork/source/`. They do not claim to reproduce real mosques or depict unseen realities. All architectural forms used as built references are named and linked inside the source ledger.

## Release checks

`npm run check` validates all 40 books, 1,067 sections, journey links, illustrations, reviewed study placements, reading depth routes, saved locations, palette contrast, and the protected Prayer and Seeds content. `npm run build` also checks production assets, local fonts, the 500 kB JavaScript chunk budget, and all Beautiful Names release tests.

After changing Ihya chapter or journey navigation, run `npm run sync:catalog`. When moving an interactive study, update its reviewed section heading in `src/reading/deepExperiences.tsx`; a mismatched heading fails the release check.
