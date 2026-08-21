import { assetUrl } from "./assetUrl";
import type { Journey } from "./systemTypes";

export const book21Journeys: Journey[] = [
  {
    id: "identity",
    number: "01",
    question: "What is the heart?",
    title: "Build the inner model",
    description:
      "Separate Ghazali's key terms, then see how perception, desire, anger, reason, and action are ordered around the governing heart.",
    payoff: "You leave with a working map of the human interior.",
    image: assetUrl("assets/system/journey-heart.jpg"),
    imageAlt: "Symbolic painted compass surrounded by four balanced coloured medallions and flowering plants.",
    minutes: 6,
    color: "#3567a6",
    nodes: [
      {
        id: "name-the-faculty",
        label: "Name the faculty",
        micro: "Meaning before metaphor",
        summary:
          "Ghazali's main subject is the subtle human faculty that knows, perceives, directs, and is morally addressed, not merely the bodily organ.",
        guardrail: "One word can carry bodily and inward meanings.",
        chapterId: 1,
        glyph: "name",
      },
      {
        id: "map-the-forces",
        label: "Map its forces",
        micro: "Perception, impulse, movement",
        summary:
          "The heart governs through visible powers such as limbs and senses, and inward powers such as memory, imagination, thought, appetite, and anger.",
        guardrail: "A force is not blameworthy simply because it exists.",
        chapterId: 2,
        glyph: "forces",
      },
      {
        id: "see-the-order",
        label: "See the order",
        micro: "Governor, adviser, provisioner",
        summary:
          "Ghazali's city and rider analogies ask which faculty is directing which: reason should advise, while appetite and anger should serve disciplined ends.",
        guardrail: "Reform means right order, not erasing every impulse.",
        chapterId: 3,
        glyph: "order",
      },
      {
        id: "add-knowledge-will",
        label: "Add knowledge & will",
        micro: "See the good; choose it",
        summary:
          "Knowledge can grasp meanings and consequences; will can pursue what judgment recognizes as good even when immediate appetite resists.",
        guardrail: "The speed of an impulse does not give it authority.",
        chapterId: 4,
        glyph: "know",
      },
      {
        id: "watch-character-form",
        label: "Watch character form",
        micro: "Repeated rule becomes disposition",
        summary:
          "Anger, appetite, and intelligence take different moral directions according to what rules the self and what each faculty is trained to serve.",
        guardrail: "The animal images name patterns, not fixed human identities.",
        chapterId: 5,
        glyph: "pattern",
      },
    ],
  },
  {
    id: "knowing",
    number: "02",
    question: "How does knowing happen?",
    title: "Trace knowledge into the heart",
    description:
      "Follow Ghazali's mirror, reservoir, and polished-wall models while preserving his distinctions between learning, inspiration, and revelation.",
    payoff: "You see why knowledge needs both acquisition and preparation.",
    image: assetUrl("assets/system/journey-knowing.jpg"),
    imageAlt: "Symbolic painted reservoir receiving clear water beside a polished brass mirror reflecting light.",
    minutes: 7,
    color: "#21867e",
    nodes: [
      {
        id: "receive-the-form",
        label: "Receive the form",
        micro: "The heart as mirror",
        summary:
          "Knowledge is likened to an intelligible form appearing in a mirror: the heart, the reality known, and its presence in the heart remain distinct.",
        guardrail: "The mirror analogy does not make every impression true.",
        chapterId: 6,
        glyph: "receive",
      },
      {
        id: "clear-obstructions",
        label: "Clear obstructions",
        micro: "Corrosion, veil, direction",
        summary:
          "Like a mirror, the heart may fail to receive clearly through incompleteness, corrosion, wrong direction, an intervening veil, or not knowing where to turn.",
        guardrail: "Clarity requires preparation and correct direction.",
        chapterId: 6,
        glyph: "clear",
      },
      {
        id: "distinguish-knowledge",
        label: "Distinguish kinds",
        micro: "Native, learned, religious",
        summary:
          "Ghazali distinguishes basic judgments from acquired knowledge, and knowledge grasped through reason from knowledge received through religious teaching.",
        guardrail: "The classification gives acquired learning a necessary place.",
        chapterId: 7,
        glyph: "know",
      },
      {
        id: "learn-by-evidence",
        label: "Learn by evidence",
        micro: "Instruction, reflection, inference",
        summary:
          "Ordinary learning proceeds through effort, instruction, evidence, reflection, and inference, a route whose steps the learner can trace.",
        guardrail: "The account never licenses neglect of disciplined learning.",
        chapterId: 8,
        glyph: "learn",
      },
      {
        id: "prepare-for-disclosure",
        label: "Prepare for disclosure",
        micro: "Reservoir and polished wall",
        summary:
          "The reservoir and polished wall compare gathering through the senses with removing veils and preparing the heart for inward disclosure.",
        guardrail: "Ghazali does not discard either knowledge or purification.",
        chapterId: 9,
        glyph: "prepare",
      },
      {
        id: "read-in-register",
        label: "Read in its register",
        micro: "Religious testimony",
        summary:
          "Ghazali supports inwardly granted knowledge from scripture and religious reports, within a framework that distinguishes prophecy, sainthood, and learning.",
        guardrail: "Inspiration is not presented as prophetic revelation.",
        chapterId: 10,
        glyph: "witness",
      },
    ],
  },
  {
    id: "action",
    number: "03",
    question: "How does a thought become an action?",
    title: "Slow down the moral moment",
    description:
      "Pull apart the stages that feel instantaneous. The point is not fear of every thought, but seeing where influence becomes increasingly voluntary.",
    payoff: "You gain earlier, more precise places to intervene.",
    image: assetUrl("assets/system/journey-action.jpg"),
    imageAlt: "A luminous seed travelling through six coloured brass gates before becoming a clear outward footprint.",
    minutes: 5,
    color: "#c85b42",
    nodes: [
      {
        id: "prompting-arrives",
        label: "A prompting arrives",
        micro: "Something occurs to the heart",
        summary:
          "The heart is continually visited by thoughts and inclinations. A passing suggestion is the beginning of the analysis, not yet a chosen act.",
        guardrail: "Occurrence is not the same as adoption.",
        chapterId: 11,
        glyph: "arrive",
      },
      {
        id: "impulse-gains-leverage",
        label: "It gains leverage",
        micro: "Desire and anger make a case",
        summary:
          "A destructive suggestion often exploits existing desire or anger and makes an impulse appear attractive or reasonable.",
        guardrail: "Influence works through the heart's existing organization.",
        chapterId: 11,
        glyph: "leverage",
      },
      {
        id: "attention-holds",
        label: "Attention holds it",
        micro: "The thought is entertained",
        summary:
          "Ghazali separates the first involuntary occurrence from later stages in which attention and inclination give the thought a more settled place.",
        guardrail: "The stages clarify responsibility; they are not a stopwatch.",
        chapterId: 13,
        glyph: "attend",
      },
      {
        id: "judgment-assents",
        label: "Judgment assents",
        micro: "The proposal is welcomed",
        summary:
          "Assent marks a deeper adoption than merely noticing a thought: judgment has begun to receive the proposal as one to follow.",
        guardrail: "A thought can be noticed and refused without being endorsed.",
        chapterId: 13,
        glyph: "assent",
      },
      {
        id: "resolve-commits",
        label: "Resolve commits",
        micro: "Intention points toward doing",
        summary:
          "Resolve is increasingly voluntary and morally significant: the person commits inwardly toward carrying the adopted intention out.",
        guardrail: "Ghazali still preserves pardon for what is not chosen.",
        chapterId: 13,
        glyph: "resolve",
      },
      {
        id: "action-follows",
        label: "Action follows",
        micro: "The inward order becomes visible",
        summary:
          "Action is the outward execution of the inwardly adopted direction. Limbs carry into the world the order established within.",
        guardrail: "The chapter distinguishes stages; it does not collapse them.",
        chapterId: 13,
        glyph: "act",
      },
    ],
  },
  {
    id: "change",
    number: "04",
    question: "What makes change last?",
    title: "Turn insight into repeated care",
    description:
      "Move from naming the pattern to guarding its entrances, recognizing it early, and supporting the better influence when the heart is contested.",
    payoff: "You replace one dramatic fix with an honest practice of vigilance.",
    image: assetUrl("assets/system/journey-change.jpg"),
    imageAlt: "A painted brass compass encircled by blue and coral currents and a flowering pomegranate branch.",
    minutes: 6,
    color: "#86577f",
    nodes: [
      {
        id: "name-ruling-pattern",
        label: "Name the pattern",
        micro: "What repeatedly takes rule?",
        summary:
          "Ghazali's images of anger, appetite, cunning, and wisdom make recurring directions visible so that they can be governed rather than mistaken for identity.",
        guardrail: "A recurring pattern is not an unchangeable essence.",
        chapterId: 5,
        glyph: "pattern",
      },
      {
        id: "find-entrances",
        label: "Find the entrances",
        micro: "Know the vulnerable gates",
        summary:
          "Anger, appetite, envy, greed, haste, suspicion, and attachment to wealth or status are among the recurring entrances that cloud judgment.",
        guardrail: "The work is self-watchfulness, not diagnosing other people.",
        chapterId: 12,
        glyph: "guard",
      },
      {
        id: "interrupt-earlier",
        label: "Interrupt earlier",
        micro: "Recognition before recruitment",
        summary:
          "A prepared heart can recognize and resist a suggestion before it recruits imagination, judgment, resolve, and action.",
        guardrail: "Early recognition is easier than late interruption.",
        chapterId: 11,
        glyph: "attend",
      },
      {
        id: "remember-without-panic",
        label: "Remember without panic",
        micro: "Presence is not dominion",
        summary:
          "Some promptings cease when exposed; others remain but lose power. A recurring thought does not itself prove that remembrance has failed.",
        guardrail: "Ask whether the thought rules, persuades, or is refused.",
        chapterId: 14,
        glyph: "remember",
      },
      {
        id: "support-better-influence",
        label: "Support the better influence",
        micro: "Contested hearts can turn",
        summary:
          "Many hearts remain contested and change according to which influence receives support; trained receptivity lets good lead toward further good.",
        guardrail: "Neither one lapse nor one insight ends the contest.",
        chapterId: 15,
        glyph: "steady",
      },
      {
        id: "repeat-care",
        label: "Repeat the care",
        micro: "Steadiness is maintained",
        summary:
          "Because the heart changes rapidly, Ghazali's closing model calls for repeated care rather than a single moment of insight followed by neglect.",
        guardrail: "Lasting change is vigilance made regular.",
        chapterId: 15,
        glyph: "act",
      },
    ],
  },
];
