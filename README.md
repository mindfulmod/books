# The Revival interactive reading app

Published site: <https://mindfulmod.github.io/books/>

An expanding interactive reading edition of *The Revival of the Religious Sciences*. The project retains two architectural routes for comparison:

- `/isfahan`: a coherent system based on the Friday Mosque of Isfahan.
- `/world`: a global system led by the current Grand Mosque of Makkah expansion, with supporting spatial ideas from the Great Mosque of Cordoba and Selimiye Mosque.
- `/system`: a clean-slate, question-led concept edition with no architectural framing. It presents Book 21 as causal maps that can be viewed at four resolutions, from a 30-second distinction to source grounding.

Both routes use the same Book 21 content, interactions, and saved state so the architectural comparison remains fair.

The Global route is the selected development direction and now carries the fuller visual reading system.

The System route is deliberately independent from that direction. It tests a different learning model: enter through a human question, manipulate the underlying mechanism, then return to the text's own sequence whenever context is needed.

Its current visual direction is a contemporary illuminated instrument: warm paper, mineral-pigment colour, brass-like details, editorial typography, and four symbolic journey illustrations. The illustrations remain secondary to the causal maps and avoid people, sacred inscriptions, and depictions of unseen beings.

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

- Inline library of all 40 books and four quarters, with honest source-preparation states
- All 15 sections of Book 21 in concise English paraphrase
- Six-part visual atlas covering the book's definitions, city, mirror, reservoir, fortress, and closing heart conditions
- Chapter-aware explanatory illustrations with interactive labels
- Interactive explanation of the four reading depths: orient, explore, read, and verify
- Visual argument paths beside the concise reading copy
- Previous and next section navigation
- Progressive disclosure for detailed reading
- Bookmarks and read progress saved in the browser
- Light and dark appearance
- Desktop and mobile layouts
- Content and architectural source ledger

The current Book 21 reading copy is a sourced working edition, not a critical edition or a newly licensed translation. The source ledger in the interface records the primary Arabic text, chapter cross-checks, architecture sources, and image credits. Books without reviewed interactive content remain visibly closed rather than displaying generated filler.

## Visual asset note

The four concept plates in `public/assets/` are optimized display copies of interpretive illustrations generated for this prototype. Full-resolution PNG masters are preserved in `artwork/source/`. They do not claim to reproduce real mosques or depict unseen realities. All architectural forms used as built references are named and linked inside the source ledger.
