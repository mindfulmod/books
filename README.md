# The Revival interactive reading app

Published site: <https://mindfulmod.github.io/books/>

An expanding interactive reading edition of *The Revival of the Religious Sciences*. Three routes exist; only the last is still being developed:

- `/isfahan`: a coherent system based on the Friday Mosque of Isfahan.
- `/world`: a global system led by the current Grand Mosque of Makkah expansion, with supporting spatial ideas from the Great Mosque of Cordoba and Selimiye Mosque.
- `/system`: a clean-slate, question-led concept edition with no architectural framing. It presents each book as causal maps that can be viewed at four resolutions, from a 30-second distinction to source grounding. This is the route that is published and the only one still receiving new books.

The two architectural routes share the same Book 21 content, interactions, and saved state so the comparison between them remains fair. They are frozen at Book 21 and will not receive further books.

The System route is deliberately independent from that direction. It tests a different learning model: enter through a human question, manipulate the underlying mechanism, then return to the text's own sequence whenever context is needed.

The System route's current visual direction is a contemporary illuminated instrument: warm paper, mineral-pigment colour, brass-like details, editorial typography, and a set of symbolic journey illustrations. The illustrations remain secondary to the causal maps and avoid people, sacred inscriptions, and depictions of unseen beings.

## Run locally

```bash
npm install
npm run dev
```

Create a production build with:

```bash
npm run build
```

Pushes to `main` automatically build and publish the System edition through GitHub Pages. The production build uses `/books/` as its asset base and includes a single-page fallback for direct links.

## Current build

The System edition currently carries **ten books, 21 through 30**, which is the complete Quarter of Perils — the first of the *Ihya*'s four quarters finished in this edition.

| Book | Title | Sections | Journeys | Instrument |
|---|---|---|---|---|
| 21 | The Wonders of the Heart | 15 | 4 | Five obstructions |
| 22 | Disciplining the Soul and Refining Character | 11 | 5 | Four mirrors |
| 23 | Breaking the Two Desires | 7 | 4 | Four measures |
| 24 | The Banes of the Tongue | 22 | 7 | Speech atlas |
| 25 | Anger, Rancour, and Envy | 14 | 5 | Moral-state path |
| 26 | The Censure of This World | 15 | 5 | World lens |
| 27 | The Censure of Wealth and Miserliness | 16 | 5 | Five-gate wealth ledger |
| 28 | The Censure of Status and Ostentation | 22 | 5 | Audience chamber |
| 29 | The Censure of Pride and Conceit | 17 | 5 | Solitude test |
| 30 | The Censure of Delusion | 17 | 5 | Substitution test |

Every book now carries the same layers, so the quarter reads at one depth throughout.

Shared across every book:

- Four reading depths per section: a 30-second distinction, the core reading, a full argument analysis, and source grounding
- Question-led journeys with an interactive mechanism map
- Named distinctions, misreading guards, reflections, and a self-audit per section
- Visual argument models beside the reading copy
- Editorial navigation filters that preserve each book's own source order
- Bookmarks and read progress saved in the browser
- Desktop and mobile layouts
- A per-book source ledger and an editorial note stating what the synthesis is and is not

Each book's reading copy is an original English synthesis made from a complete reading of the public Arabic text. It is not a translation, not a critical edition, and not a substitute for either. The source ledger in the interface records the primary Arabic used and the bibliographic status of any published English edition. Books without reviewed interactive content are absent rather than filled with generated placeholder text.

## Visual asset note

Books 29 and 30 ship without their journey plates. `artwork/BOOK29-ART-MANIFEST.md` and `artwork/BOOK30-ART-MANIFEST.md` list the exact filenames, dimensions, and the argument each plate has to carry; the app already references those paths, so dropping the files in requires no code change.

The four concept plates in `public/assets/` are optimized display copies of interpretive illustrations generated for this prototype. Full-resolution PNG masters are preserved in `artwork/source/`. They do not claim to reproduce real mosques or depict unseen realities. All architectural forms used as built references are named and linked inside the source ledger.
