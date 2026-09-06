# Visual logic pass — 6 September 2026

## Scope

Reviewed Heart's fifteen visual-model definitions against their accompanying explanations, plus the shared ConceptModel renderer. This is an internal coherence and usability review, not a new scholarly verification of every source. The existing dedicated Heart studies were inspected in the preceding contrast pass; the current changes target the generic visual logic used across the library.

A structural check loaded the forty book modules (replacing only the build-specific asset URL helper for the check): 566 models, 263 chains, 216 pairs, 81 spectra, and six newly classified sets. No empty models, blank labels/explanations, or duplicate labels were found. Maximum choice count: seven. These counts do not establish semantic accuracy for the remaining books.

## Findings and changes

- All models previously said “Step” and used a connected track. Six Heart lists of roles, causes, routes, or accounts now use `set`. Genuine argument sequences retain numbering. Pairs use comparison language; other non-sequences use “View”.
- Removed the implication that the five accounts of remembrance form a scale, and the inaccurate visual title equating five accounts with five classes.
- Mobile choices were hidden in a horizontally scrolling strip. All choices now appear in a wrapping two-column grid with full labels and visible pressed state.
- The explanation shared a narrow row with its counter and arrow buttons. It now has its own full-width panel, selected heading, and separate 44px navigation controls.
- Replaced incomplete tab semantics with native toggle buttons and an explicitly associated live explanation.
- Retained the interpretive caption in compact mode. Captions and instructions are readable text rather than tiny annotations.
- Added complete dark surfaces for the shared model explanation and controls.

## Verification

Production build and whitespace checks pass. Browser checks cover Heart §7 comparison, §14 five-account set at 320px, and §12 argument sequence on desktop, with keyboard selection, first/last bounds, label changes, and light/dark text and surfaces. The mobile model does not overflow the viewport; all five labels are available and the selected explanation remains readable.

## Remaining review

Other books may also have classifications that imply an order where none is intended. Review these against each passage before changing their model types. Do not bulk reclassify by label or item count. Actual reader comprehension testing remains outstanding.
