# Deep reader rollout and visual direction

2026-09-06. This is an editorial/development priority, not a ranking of the books' importance. No reader analytics or measured learning results are available. Order is based on the existing content, reusable teaching patterns, daily-life relevance, and the need to test contrasting arguments before scaling.

## Priority order

| Order | Book | First Deep pass | Reason for this position |
|---|---|---|---|
| 1 | 21 · Wonders of the Heart | Finish mirror/obstructions and thought/accountability after the city and definitions pilots | Establish the baseline and test boundaries as well as relationships. The book is not complete just because two sections have diagrams. |
| 2 | 31 · Repentance | Knowledge → regret → action; present, future, past | Existing Concept Lab and repentance check provide material to develop a genuinely causal sequence. |
| 3 | 4 · Prayer | Outward procedure and inward requirements | Test a different quarter and a familiar practice; preserve distinctions between the text's legal discussion and the edition's synthesis. |
| 4 | 22 · Disciplining the Soul | Character, training, and recognising faults | Extends Book 21's government model into change over time; existing lab and four mirrors are useful starting points. |
| 5 | 24 · Banes of the Tongue | Speech categories and their boundaries | Long book where finding the right distinction matters; validates navigation and conditional comparisons. |
| 6 | 37 · Intention, Sincerity, Truthfulness | Same outward act, differing motives | Tests comparison without pretending an interface can judge a person's sincerity. |
| 7 | 38 · Vigilance and Self-Examination | Before, during, and after action; three registers | Reuses sequence and reflection patterns while checking that moral accounting is not represented as a score. |
| 8 | 32 · Patience and Gratitude | Competing motives; knowledge, joy, and action | Reuses relationship/sequence patterns in a long two-part book. |
| 9 | 35 · Unity and Trust | Taking means and the heart's dependence | Existing paired lab; good test of preserving two simultaneous truths. |
| 10 | 1 · Knowledge | Individual obligation in context; kinds and purposes of knowledge | Improves the library's opening book after the teaching primitives have survived contrasting uses. |
| 11 | 6 · Fasting | Degrees and what each requires | Compact application of layered distinctions. |
| 12 | 8 · Quran Recitation | Outward and inward reading | Carries the Prayer pattern into another regular practice. |
| 13 | 10 · Arrangement of Litanies | Continuity, changing circumstances, and practice | A practical sequence/maintenance pattern. |
| 14 | 25 · Anger, Rancour, Envy | Distinguish states and transitions | Develops the Heart/Character family with careful boundaries. |
| 15 | 28 · Status and Ostentation | Audience and motive | Existing audience activity; transfer the intention comparison method. |
| 16 | 30 · Delusion | What is substituted for what | Repeated diagnostic distinctions need variety and restraint. |
| 17 | 33 · Fear and Hope | Conditions and fitting balance | Existing lab; avoid reducing the relation to an arbitrary numeric slider. |
| 18 | 3 · Purification | Ranks and outward/inward distinctions | Reuse the worship family, preserving the source's distinctions. |
| 19 | 5 · Almsgiving | Giving, receiving, and inward considerations | Contextual comparison with multiple perspectives. |
| 20 | 13 · Earning | Validity, justice, excellence | Three standards that should remain distinct. |
| 21 | 15 · Companionship | Rights and responsibilities | Test relational content with several duties. |
| 22 | 23 · Breaking the Two Desires | Measures and their conditions | Existing food-measures interaction; avoid turning textual counsel into universal prescriptions. |
| 23 | 27 · Wealth and Miserliness | Acquisition, keeping, spending | Extend the contextual standards from Earning and Almsgiving. |
| 24 | 29 · Pride and Conceit | Comparison and self-estimation | Builds on intention and status without diagnostic labels. |
| 25 | 34 · Poverty and Abstinence | Distinct conditions and aims | Comparison pattern with careful definitions. |
| 26 | 36 · Love, Longing, Intimacy, Contentment | Related states and their differences | Existing lab; preserve subtle distinctions before attempting dynamic diagrams. |
| 27 | 39 · Reflection | How known things yield further understanding | Reasoning sequence; a useful later test of the argument component. |
| 28 | 40 · Death and the Afterlife | Preparation and the book's progression | Visual restraint; no speculative depiction of unseen realities. |
| 29 | 9 · Invocations and Supplications | Asking and remembrance | Worship family, preserving different functions. |
| 30 | 11 · Eating | Circles of etiquette | Everyday action with contextual duties. |
| 31 | 14 · Lawful and Unlawful | Certainty, doubt, and inquiry | Requires careful source checks; do not turn examples into a ruling engine. |
| 32 | 16 · Seclusion | Benefits and harms in context | Comparative reasoning without a universal preferred outcome. |
| 33 | 12 · Marriage | Benefits, harms, and duties | Context-sensitive material; fuller editorial review before scenarios. |
| 34 | 17 · Travel | Purpose and conduct | Transfer the established contextual sequence. |
| 35 | 19 · Enjoining Right and Forbidding Wrong | Conditions and limits | Higher risk of misleading simplification; review boundaries before interaction. |
| 36 | 20 · Prophetic Character | Conduct and transmitted examples | Narrative reading needs a different rhythm from diagnostic tools. |
| 37 | 2 · Creed | Degrees of explanation and argument | Preserve doctrinal context and limits; resist oversimplified simulations. |
| 38 | 7 · Pilgrimage | Outward journey and inward meaning | Seasonally useful; retains the source's procedural context. |
| 39 | 18 · Listening and Ecstasy | Listener, context, and response | Particularly context-sensitive distinctions. |
| 40 | 26 · This World | Definition, necessary means, and attachment | Existing relation lens provides coverage; a later polish can reuse the tested comparison system. |

The precise order after the first ten is provisional. Usage evidence, seasonal needs, or source-review findings should change it. Finishing one book means reviewing all its Deep sections for argument flow and source fidelity, not adding an elaborate interaction to every section.

## Apply now across all forty

- `src/reading/DeepReadingSections.tsx`: one component renders existing argument moves, closer readings, distinctions, observation, questions, and the book source ledger. No new teaching content is generated by this component.
- `src/reading/ReadingDisclosure.tsx`: native accessible disclosure used for optional overview and sources, including the city pilot's exact passage note.
- `src/reading/editorial.css`: shared paper/ink/type/spacing rules. Reduces nested cards, ornamental numbering, repeated labels, and shadowed tabs. Larger readable prose and plain numbered contents.
- `src/reading/deepExperiences.tsx`: registers section-specific diagrams by book/section, with flags for replacing the introduction or duplicate practice. The full argument remains available.
- Existing journey-aware continuation and resume already operate across the common reader.

## Add a reviewed experience

1. Read the relevant Arabic passage and its surrounding argument. Record exact links, claims, limits, and editorial additions in `review/`.
2. Choose a suitable form: definition map, relationship, causal sequence, comparison, or conditional path. Narrative sections may only need strong prose and an illustration.
3. Build the section component. Keep its data and source record explicit. Use `ReadingDisclosure` for optional material.
4. Register it in `deepExperiences.tsx`. Declare whether it replaces the generic introduction or practice panel. Do not remove the original argument without an explicit editorial rewrite/review.
5. Verify 320px and 390px touch layouts, keyboard input, reduced motion, source scope, saved navigation, and desktop fallback. Compare against the old experience using the same section.
6. Check with readers: can they state the distinction, apply it to a new example, and locate the support? Do not equate clicks, time spent, or completed animations with understanding.

## Visual diagnosis and decisions

Observed: repeated padded cream cards, rounded tab wells, shadowed numbered lozenges, duplicate summary/thesis introductions, and generic instructional labels. The issue is repeated emphasis rather than the mere presence of a serif, an illustration, or an accent colour.

Applied: contents as typographic rows; active navigation marked with a rule; optional overview; larger serif reading copy; simple margin numbers; closer reading as prose; source notes as disclosures. Diagrams retain their distinct spatial forms and stronger colour. The original illustrations and warm/mineral identity are retained.

Remaining: the older generic diagrams still use many small tabbed labels, some illustration captions are overlaid on imagery, and some source syntheses repeat their opening claim in later moves. Those require section-level review, not a global text deletion or a cosmetic reskin. The current large bundle also remains a separate mobile performance concern.

## Validation of the shared pass

Production build and `git diff --check` passed. Browser checks covered Book 21's city interaction and Arabic source disclosure, Book 31's shared Deep reader and source ledger, and Book 4's shared Deep reader and return to contents. At 390px all three fit the viewport; Book 31 also fit at 320px, and its desktop article was constrained to 740px at a 1365px viewport. Overview and source disclosures opened correctly. The final visual check removed inherited decorative question markers and restored ordinary ordered-list numbering. The build still reports the existing large JavaScript bundle warning; this pass does not solve loading performance. No deployment was performed.

## Implementation update — 6 September 2026

The first five passes have begun with six source-checked passage interactions. See [the passage record](first-five-passages.md) for exact sections, sources, validation and remaining work. None of the five books is yet marked wholly reviewed.

## Deeper release — 6 September 2026

Nine further section entries and a bounded disclosure comparison now extend the first five books. Registry-driven discovery opens each directly in Deep. See [release record](second-five-pass.md) for source checks and editorial corrections. Reader comprehension testing remains outstanding.
