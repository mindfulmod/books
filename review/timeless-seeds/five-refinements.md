# Five refinements after the feeling-first release

Implemented against 2494b4e in the release checkout. These changes are local; production has not been updated in this turn.

1. Added specific reflection questions, visual captions, activities, transitions and closing reflections for all 24 readings in the six introductory paths. Kept the existing plant activity for Seed 48 and ten-practice explorer for Seed 108. The shared question now also appears consistently in search and the daily reading.
2. Identified Islamic foundations on Home. Keep source credits and the unchanged complete entry clearly identified. Explain the companion’s additions in About, without repeating “for this app” labels throughout each reading. Shared image cards identify their text as app-written.
3. Kept the helpful short takeaway beneath each title, styled as a subtitle rather than a quotation, and moved sharing to the end. Preserved full illustrations, the original entry, expandable source notes and the open-book mobile controls.
4. Moved Garden content ahead of progress. Saved, Reflections and Actions lead; progress and finished readings sit behind a disclosure. Actions can be marked done or undone. Export remains available and moves focus to its preview.
5. Replaced automatic read marking with an explicit Finish reading control and undo. Scrolling, jumping to Reflect and writing no longer finish a reading. Saved paragraph-relative positions survive reload, including open disclosures. Resume remembers the selected path rather than inferring one from the seed number. A completed path returns to the feeling choices.

## Verification

- `npm run build`: passed. The existing large shared bookshelf chunk warning remains.
- `npm run check:seeds`: passed, including new completion, path context/end, reading-place validation and 24-entry guidance coverage checks.
- Original 111 entries, all 117 notes, source page hashes and PDF hash unchanged.
- Appearance checks passed for all illustrations and day/Starlight assets.
- `git diff --check`: passed.
- Mobile UI checked at 390×844 and 320×740; no horizontal overflow in the reader with enlarged text.
- First-visit Home keeps all six choices and the fallback reading visible at 390×844.
- Reflect + saved note/action leave Seed 15 unfinished; Home returns to Seed 15. Finish reading advances to Seed 50 in the hope path. Completing the four readings produces the path closing and a Home link to choose a need.
- Reload from the middle of Seed 15 preserved the same paragraph and exact scroll position (1934px). Open journal and writing recovered on reload. A resized Seed 46 stayed in the same source paragraph.
- My Garden tabs moved from approximately 1141px in the audited baseline to 304px; the first personal item starts at 382px. Progress starts collapsed. An action completion survives reload and appears in export.
- Interaction checks used a separate local preview origin on port 4189, keeping test writing out of the user's existing preview and live site.


## Navigation regression fix — October 2, 2026

Reproduced the reported bug on an isolated preview: visit Seed 50's reflection, return to Seed 15, then tap Next. Seed 50 reopened at 2141px, with its title above the viewport.

Fresh in-app navigation now starts a seed at the top before paint. Resume, reload and browser history use the saved paragraph position. Navigation captures the outgoing position before changing the page. Ordinary navigation no longer waits for fonts before resetting the scroll. The final path arrow now returns to the same Home path choices as the end-of-reading link, and no longer says it finishes the path merely by navigating away.

Verified on the local production build:

- Next to a previously visited Seed 50: 0px, title visible at 119px.
- Previous to a previously visited Seed 15: 0px.
- Next card to Seed 103: 0px, heading focused.
- Browser Back to Seed 15: 3432px, reflection restored.
- Browser Forward to Seed 50: 2141px, reflection restored.
- Home Resume and reload of Seed 15: 3711.5px retained.
- Reflection deep link: writing disclosure open at 24px, test writing intact, reading still unfinished.
- Book-order navigation from Seed 50 to 51: 0px.
- Last path arrow: Home feeling choices visible.
- 320px viewport, Starlight and larger text: next seed at 0px, no horizontal overflow.
- Search and browser error log checked; no runtime errors observed.
- Build, original-source checks, appearance checks, route/position regression checks and diff whitespace checks pass.

Testing used port 4190; the user's preview remains on 4184. No production deployment was performed.
