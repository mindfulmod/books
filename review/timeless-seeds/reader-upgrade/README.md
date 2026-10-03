# Reader, discovery, and artwork upgrade — October 2, 2026

Implemented the eight approved items: 1, 2, 3, 4, 5, 6, 7, and 9. This is a local preview update; nothing was pushed or published.

## What changed

1. **Reader:** a more consistent paragraph measure and rhythm, gentle distinction for longer entries, four text sizes, two line spacings, and stronger text contrast. The former larger-text preference migrates without touching journal data. Titles and takeaways remain.
2. **Navigation:** the compact book bar opens a drawer for This seed, This path, or Whole book. Paths show all four readings, the current place, read markers, and their sequence. Whole book supports search and exact seed-number lookup. The drawer is portaled outside the bar so mobile writing controls cannot hide its search field.
3. **Artwork:** all 111 subjects and their paired lighting variants reviewed in contact sheets, including the additional time-sequence frames. Retained the coherent existing collection. Refined 69 captions to connect visible objects to the advice. Seed 77 received a closer Day/Starlight composition so its face-down phone reads at mobile size. Existing assets remain available; replacements use versioned filenames.
4. **Environment:** unified paper, edge, shadow, and lighting tokens across the reader, collection, return card, and dialogs. Kept the coastal backdrop, pink/blue colors, existing fade, and book-bar shape.
5. **Discovery:** artwork thumbnails, takeaways, approximate reading times, source-aware matching excerpts, and highlights. Numeric searches identify the exact seed. Theme-only matches explain their category.
6. **Returning home:** the next useful reading is the primary card, with feeling choices in an easily opened disclosure. First-time visitors still see the six feeling choices and a clear description. Follow-up questions stay secondary.
7. **Situation paths:** After an argument [77,57,74,12], While you’re waiting for news [33,92,55,46], After making a mistake [50,10,74,70], and When you’re living with loss [15,103,109,110]. Each has an introduction, a coherent sequence, and a closing thought. Resume and Garden progress understand all ten paths.
9. **Visual stories:** optional, manually advanced three-moment explorations for seeds 4, 30, 46, 48, 55, 77, and 109. These use the reviewed paintings with closer views or meaningful time frames; no autoplay. Pictures-off and reduced-motion preferences remain supported.

## Evidence and checks

- Production build and `npm run check:seeds` passed. Original 111 entries, 117 notes, PDF hash, original page text hashes, and sacred quotations remain unchanged.
- Added checks for situation-path navigation/resume, exact numeric search and original-word excerpts, reading-preference migration/storage fallback, and visual-story asset references.
- Mobile browser: 320px largest text / open spacing / stronger contrast / Starlight did not overflow. A long original passage remained readable.
- Completed all four After an argument readings. Every Next opened at scroll position 0. The final control returned home; Choose a new path opened the six feeling choices and focused their heading.
- Whole book search accepted 110 and 77 inside the mobile drawer and opened the selected seed at the top.
- A journal entry on the isolated test origin survived Next, Back, and restoration. Back restored the earlier position with the writing disclosure open.
- Search for “hungry and return” exposed the matching original words in Seed 46.
- Tested image hiding, including visual stories. The returning card removes the image space when pictures are hidden.
- Day and Starlight mobile views and a 1280px desktop reader visually reviewed. No browser runtime errors reported in the production test tab.
- Build retains the existing warning about the separate bookshelf bundle size; the Timeless Seeds bundle is about 442 KB before compression.

## Artwork provenance

Built-in image generation was used for the refined Seed 77 pair, with no image-model override claimed. The full prompts, input/output paths, and visual approval are recorded in:

- `artwork/timeless-seeds/seed-illustrations/refinements/seed-077-v2-record.json`
- Masters: `seed-077-v2.png` and `seed-077-v2-starlight.png` in that same folder.
- Production exports: `public/assets/timeless-seeds/illustrations/seed-077-v2[-starlight]-{480,960,1440}.webp`.

`art-review.json` contains the per-seed decisions. `art-audit-1.jpg` through `art-audit-6.jpg` and `art-audit-sequences.jpg` show the retained collection. Reader, drawer, search, and home screenshots are saved alongside this note.
