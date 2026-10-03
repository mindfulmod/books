# The Beautiful Names · edition 1.0

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

Vite fingerprints JavaScript and styles. Runtime artwork paths use `import.meta.env.BASE_URL`. Fonts and their SIL OFL licences are self-hosted. Compressed WebP artwork preserves the approved compositions and colours; offscreen chapter illustrations load on approach. The reader bundle is approximately 97 KB gzip and its CSS 25 KB gzip. All 33 deployed artwork files total 14.6 MB; they are not loaded together. WOFF2 fonts total 409 KB, down from 1.5 MB of TTF masters.

## Personal data

The app uses `beautiful-names-library-v1` in localStorage and migrates the earlier preview key on the same origin without deleting it. Localhost and the public GitHub Pages site have separate storage; use Backup & restore to transfer a library between them. There is no application analytics or remote writing storage. GitHub Pages receives normal hosting requests.

Malformed writing is retained as an exact recovery copy before normalized data can be saved. Storage failures leave the book readable and expose copy/export guidance. An optimistic storage check prevents stale tabs from replacing a more recent library. A tab with conflicting changes asks the reader to keep a copy and reload. Backups validate before merging, retain both versions of conflicting writing, and reject oversized input before mutation.

## Verification

- 49 automated tests: all 99 source enumeration entries and Arabic excerpts, valid readings/artwork/ornaments, Arabic and English search, bounded navigation, paths and pairs, recall, saved data migration/recovery/concurrent writers, backup validation/round trips/conflicts, and contrast tokens.
- Build verification: real output modules, Pages base paths, local fonts and licences, required artwork and size budgets, disclosure and bookshelf entry.
- Existing Timeless Seeds and shared reader-theme checks pass.
- In-app browser: 390 × 844 and 320 × 740, day/night, largest text and open spacing, Quiet page, no horizontal overflow or audited controls below 44px, focus restoration, Arabic-numeral search for Name 99, source notes, and the bottom-to-next-Name reset to scroll zero.
- Backup text preview, validation, idempotent merge, and reload exercised through the UI. The browser reported copy success; its clipboard inspection did not independently confirm copied bytes. The in-app browser did not expose a completed native download event, so native save-dialog behavior is not certified. Selectable backup text remains available independently of those APIs.
- Targeted accessibility checks are not a complete WCAG audit or a native VoiceOver/TalkBack certification. No learning or retention outcome is claimed.

## Asset maintenance

Approved artwork is in `public/assets/beautiful-names/art`. Preserve the paired sprite dimensions and crop coordinates when replacing a picture. Use a new filename when changing an illustration so cached copies cannot mask a release. Keep the font licence text beside redistributed fonts. The original review artwork and TTF masters remain local development material.
