# Reader theme review · 6 September 2026

The reported Brief card exposed a systemic mismatch: light-only backgrounds in component styles inherited pale text from blanket dark-mode selectors. Fixing individual diagrams left other reading surfaces exposed.

## Changes

- Introduced shared dark paint roles in `src/reading/paint-tokens.css`, matching the Inner Dimensions charcoal, ivory, and gold palette.
- Migrated surface, gradient, foreground, and border declarations in the reader, city diagrams, editorial components, and study experiences. Original colors remain as light-mode fallbacks.
- Removed blanket dark text and button overrides. Filled gold controls and selected markers explicitly pair with dark foregrounds; metadata uses readable muted colors.
- Removed negative mobile practice-carousel margins that produced horizontal page overflow.
- Added `npm run check:theme` to detect missing paint-token definitions. This is a contract check, not an automatic visual accessibility certification.

## Verification

- Production TypeScript/Vite build passes (existing bundle-size warning remains).
- All 1,429 paint references resolve across four migrated stylesheets.
- Before the intentional carousel-margin correction, stripping token wrappers reproduced all original declarations in those four stylesheets exactly. Light colors retain those fallbacks.
- Browser inspection covered Heart Brief, Deep, Sources, settings, visual map, practice, library and search; Character Brief and practice; mobile and desktop layouts.
- The reported Heart Brief card, selected map markers, and practice layout were checked again against the rebuilt preview. Map layout fits 320px and 390px; practice fits 390px without page overflow.
- DOM contrast diagnostics found no bright opaque panel backgrounds or low-contrast direct text in these checked states after correction. These diagnostics exclude SVG text and do not fully composite gradients; screenshots were also reviewed.

This is a shared-style migration, not a claim that every state of all forty books has been visually inspected. Physical iPhone Safari verification remains separate from browser viewport checks. Changes are local and have not been published.
