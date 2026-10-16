# The Beautiful Names · edition 1.3

Public route: https://mindfulmod.github.io/books/beautiful-names/

## Release scope

The selected Garden Folio, Ink & Gold design is a standalone Vite entry. It ships 99 original English companion readings, their Arabic Names and source excerpts, 26 shared garden settings, 99 ornaments, reading paths, search, personal writing, recall, a reading list, and portable backups. Production source lives in `src/names`; development studies remain in the local `review` directory and are not deployment inputs.

The book is an editorial companion to al-Ghazali’s *Al-Maqsad al-Asna*, not a published translation, critical edition, or a substitute for the full source. Independent scholarly review is pending and disclosed in each reading’s source panel and About. Illustrations are AI-generated created landscapes, not representations of Allah or His attributes.

## Build and release

```sh
npm ci
npm run build
npm run check:names
npm run check:seeds
npm run check:theme
npm run preview -- --port 4191
```

Preview the production base at `http://127.0.0.1:4191/books/beautiful-names/`. Push to `main` to run the existing GitHub Pages deployment. The workflow verifies Beautiful Names after the build, alongside Timeless Seeds. The bookshelf entry is in `src/bookshelf.ts`.

Vite fingerprints JavaScript and styles. Runtime artwork paths use `import.meta.env.BASE_URL`. Fonts and their SIL OFL licences are self-hosted. Compressed WebP artwork preserves the approved compositions and colours; offscreen chapter illustrations load on approach. The reader bundle is approximately 110 KB gzip and its CSS 25 KB gzip. All 33 deployed artwork files total 14.6 MB; they are not loaded together. WOFF2 fonts total 409 KB, down from 1.5 MB of TTF masters.

## Personal data

The app uses `beautiful-names-library-v1` in localStorage and migrates the earlier preview key on the same origin without deleting it. Localhost and the public GitHub Pages site have separate storage; use Backup & restore to transfer a library between them. There is no application analytics or remote writing storage. GitHub Pages receives normal hosting requests.

Malformed writing is retained as an exact recovery copy before normalized data can be saved. Storage failures leave the book readable and expose copy/export guidance. An optimistic storage check prevents stale tabs from replacing a more recent library. A tab with conflicting changes asks the reader to keep a copy and reload. Backups validate before merging, retain both versions of conflicting writing, and reject oversized input before mutation.

## Verification

- 52 automated tests: all 99 source enumeration entries and Arabic excerpts, valid readings/artwork/ornaments, Arabic and English search, bounded navigation, paths and pairs, recall, saved data migration/recovery/concurrent writers, backup validation/round trips/conflicts, and contrast tokens.
- Build verification: real output modules, Pages base paths, local fonts and licences, required artwork and size budgets, disclosure and bookshelf entry.
- Existing Timeless Seeds and shared reader-theme checks pass.
- In-app browser: 390 × 844 and 320 × 740, day/night, largest text and open spacing, Quiet page, no horizontal overflow or audited controls below 44px, focus restoration, Arabic-numeral search for Name 99, source notes, and the bottom-to-next-Name reset to scroll zero.
- Backup text preview, validation, idempotent merge, and reload exercised through the UI. The browser reported copy success; its clipboard inspection did not independently confirm copied bytes. The in-app browser did not expose a completed native download event, so native save-dialog behavior is not certified. Selectable backup text remains available independently of those APIs.
- Targeted accessibility checks are not a complete WCAG audit or a native VoiceOver/TalkBack certification. No learning or retention outcome is claimed.

## Asset maintenance

Approved artwork is in `public/assets/beautiful-names/art`. Preserve the paired sprite dimensions and crop coordinates when replacing a picture. Use a new filename when changing an illustration so cached copies cannot mask a release. Keep the font licence text beside redistributed fonts. The original review artwork and TTF masters remain local development material.

## Reading-experience review · 16 October 2026

The review retained the approved Garden Folio, enamel-and-gold illustrations, ink night palette, and gold daylight palette. The representative trial used Al-Malik before extending the pattern to all 99 Names.

| Finding | Change | Verification |
| --- | --- | --- |
| The movement from an abstract explanation to personal practice could feel abrupt. | Each second section now ends with a distinct, short “Pause and notice” observation. It points from an everyday gift or a created limit toward Allah. | Coverage, distinctness and length checked across all 99; representative readings reviewed on mobile. |
| Some reflection questions were too general to begin pondering immediately. | Every Name has a specific question following its meaning, before the optional practical response. | Questions are at most 32 words; all readings remain at most four estimated minutes. |
| Two separate tools links added a row of friction above the prose. | One “In this reading” control opens the section outline. Additional tools and the reader’s guide remain available there. | Section jumps, focus, and guide dismissal exercised through the browser. |
| Scroll padding and margins combined to leave about 200 pixels before a selected section. | Reduced the combined offset to 44 pixels. | Reflection and search-result targets measured at 44 pixels; next-name navigation measured at scroll zero. |
| The ending repeated an oversized invitation before identifying the next Name. | The connected Name itself is now the heading. Reading-list management appears only when the list contains a reading. | Mobile ending reviewed without adding a required completion step. |
| Full-book search omitted questions and practices. | Both are searchable and lead directly to the reflection. | Automated coverage of all Names; “entirely mine” exercised through search and opened Al-Malik’s reflection. |
| Changing appearance replaced the focused control. | Focus returns to the appearance button after rendering. | Keyboard control reviewed; dialog Escape restores the original opener. |
| Editing a saved reflection could focus a field below the viewport. | The writing field is scrolled into view when opened for editing. | The same field remains within the existing saving and backup model. |

New observations and questions are original companion writing, identified as such in Reading notes. They preserve the existing God-first explanations and source excerpts. They do not equate created gifts with the divine reality, assign a hidden purpose to a specific hardship, promise a desired outcome, or treat personal effort as divine perfection. Independent scholarly review remains pending.

Existing paragraph anchors and three section indices are preserved. Newly kept passages include the observation; earlier saved passage snapshots retain their original wording. Automated backup tests cover both cases. No personal writing is migrated or rewritten by this edition.

Manual review included a fresh-reader home, guide, Al-Malik in both themes, Al-Quddus, and the long Dhu’l-Jalal wa’l-Ikram title at 320 × 740 with largest text and open line spacing. No horizontal overflow was found in those views. These are targeted design and accessibility checks, not a guarantee of a reader’s comprehension or a substitute for observed user testing.

## Editorial distinctness review · edition 1.2

Reviewed all 99 readings for repeated examples and reflection patterns, revising 55 observations and 93 questions. The revisions draw attention to the particular attribute of Allah before asking for a personal response. Related Names remain related; their observations offer different points of attention without inventing separate meanings. Al-Mu’akhkhir’s example now follows the explanation of Allah-given rank and nearness, rather than centring delayed personal plans.

The [complete editorial record](beautiful-names-editorial-review.md) identifies the focus considered for each Name and the distinctions between neighbouring meanings. No navigation, saved-writing format, source excerpts, or artwork changes accompany this pass.

Validation for this pass: production build, 52 Beautiful Names tests, and all shared library checks passed. Representative revised questions were reviewed in daylight at 390 × 844 and at night at 320 × 740, without horizontal overflow.

## Practical-response review · edition 1.3

Reviewed all 99 “A way to respond” passages with their readings, revising 93 and retaining six. Each now offers a focused response through worship, praise, learning, or ordinary conduct, with a clear connection to Allah through the particular Name. More specific occasions and actions replace repeated generic instructions to do a good deed or attend to a neglected duty. Every response is at most 39 words.

The [complete response review](beautiful-names-response-review.md) records the intended practical direction of every Name and the distinctions considered across neighbouring meanings. Changes live in the existing practice fields; divine explanations, source excerpts, observations, reflection questions, and saved-writing formats remain intact. The About panel identifies edition 1.3.

Validation for this pass: production build, all 52 Beautiful Names tests, and shared library checks passed. Mobile previews covered night at 390 × 844 and daylight at 320 × 740, including the full longest response without horizontal overflow or text clipping.
