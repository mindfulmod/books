# First five books — initial passage interactions

Built 6 September 2026. This starts the first five book passes; it does not mark every Deep section in those books reviewed or complete. Each new entry replaces the generic introductory visual in its section and retains the complete argument below. Existing practice remains available from the book's Practice surface.

| Book / section | New exploration | Source checked | Editorial boundary |
| --- | --- | --- | --- |
| 21 / 6 | Five mirror obstructions; compare with a receiving mirror | [III, 13](https://shamela.ws/book/9472/759) | Diamond, ray, material changes and rotation are teaching illustrations, not a model of optics or an assessment of the reader. The passage names all five. The next page could not be retrieved; no new detailed application of its fourth/fifth obstruction was added. |
| 21 / 13 | Prompting, inclination, judgment, resolve | [III, 41](https://shamela.ws/book/9472/787), [III, 42](https://shamela.ws/book/9472/788) | The third state can be voluntary or involuntary. Corrected the existing distinction, brief visual caption and journey guardrail accordingly. No judgment about the user's own thoughts. |
| 31 / 1 | Knowledge → regret → action; present/future/past | [IV, 3](https://shamela.ws/book/9472/1162), [IV, 4](https://shamela.ws/book/9472/1163) | Causal structure, not an emotional intensity scale or acceptance verdict. The action's three directions are aspects of the same return. |
| 4 / 12 | Outward act and inward reminder for call, purification, covering | [I, 165](https://shamela.ws/book/9472/165), [I, 166](https://shamela.ws/book/9472/166) | Three preparations only; not the whole prayer, a replacement for its outward requirements, or an extra recitation. Arches are decorative. |
| 22 / 4 | Action forms disposition; disposition supports action | [III, 58](https://shamela.ws/book/9472/804), [III, 59](https://shamela.ws/book/9472/805) | The three views are editorial organization. Generosity, humility, and the writing analogy are in the passage. No fixed training duration, progress percentage, or moral score. |
| 24 / 16 | Same disclosure through speech, writing, imitation; truth/falsehood | [III, 143](https://shamela.ws/book/9472/889), [III, 144](https://shamela.ws/book/9472/890), [III, 152](https://shamela.ws/book/9472/898) | Gathering and group message are invented contemporary examples. Scope is visible: amusement without a need for justice, counsel, or protection. Permitted disclosure requires separate context; there is no personalized ruling tool. |

All English is editorial synthesis. Each exploration has its own passage links and a reflective question with an optional explanation. No external model calls, personal inputs, or new persistence were introduced.

## Implementation

`src/reading/experiences/Study.tsx` shares the title/intro, native source and question disclosures, pressed-state choices, and live explanation regions. Individual components own their interaction state and visual forms. `deepExperiences.tsx` registers the six sections. The replacement flag now suppresses duplicate legacy practice on desktop as well as contextual practice on mobile. Styles use a unique mirror prefix to avoid the older mirror exercise's class names.

## Validation

Production TypeScript/Vite build passed. Browser checks exercised all six experiences: mirror comparison and reversal, thought-sequence judgment selection, repentance action and past direction, prayer inward/outward reversal and reset on preparation change, character direction reversal and humility example, and speech medium plus falsehood. Source and question disclosures were exercised. Phone checks included 390px and 320px; inspected views had no horizontal overflow. The corrected mirror was rechecked at 320px through all five obstruction states. Desktop checks at 1365px confirmed a 740px article width, no horizontal overflow, and that the argument follows the Repentance study without the legacy practice panel. Reduced-motion CSS disables study transitions; controls use native buttons/details and visible keyboard focus. No full screen-reader audit or reader comprehension study has yet been performed.

## Remaining work in this wave

- Book 21: audit the remaining Deep sections for repetition, source detail and appropriate visual restraint.
- Book 31: extend the initial definition into persistence, repair and the existing case distinctions.
- Book 4: six inward meanings and the remaining elements; preserve the distinction between attention and understanding.
- Book 22: person-specific treatment and the four routes to seeing faults.
- Book 24: receiver duties, motives and the carefully bounded exceptions.
- Conduct reader testing before marking these books complete or transferring new content patterns to the next five.
