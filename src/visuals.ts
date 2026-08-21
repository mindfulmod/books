import { conceptNodes } from "./data";
import { assetUrl } from "./assetUrl";

export type VisualStoryId =
  | "lexicon"
  | "city"
  | "mirror"
  | "reservoir"
  | "fortress"
  | "conditions";

export type VisualNode = {
  id: string;
  label: string;
  kicker: string;
  description: string;
  x?: number;
  y?: number;
};

export type VisualStory = {
  id: VisualStoryId;
  title: string;
  navLabel: string;
  scope: string;
  chapterIds: number[];
  asset?: string;
  thumbnail?: string;
  alt?: string;
  caption: string;
  nodes: VisualNode[];
};

export const visualStories: VisualStory[] = [
  {
    id: "lexicon",
    title: "Four words, careful distinctions",
    navLabel: "Meanings",
    scope: "Section 1",
    chapterIds: [1],
    caption:
      "A navigable glossary of the several meanings Ghazali distinguishes before beginning his account of the heart.",
    nodes: [
      {
        id: "heart-term",
        label: "Heart",
        kicker: "Bodily and inward uses",
        description:
          "The word can name the bodily organ. In this book it chiefly names the subtle human faculty that knows, perceives, directs, and is morally addressed.",
      },
      {
        id: "spirit-term",
        label: "Spirit",
        kicker: "More than one use",
        description:
          "Ghazali distinguishes a bodily use connected with the heart from a higher use for the subtle human reality. The terms overlap in some contexts without becoming simple synonyms in every context.",
      },
      {
        id: "soul-term",
        label: "Soul",
        kicker: "Impulse and human self",
        description:
          "The word can refer to the gathered powers of appetite and anger. It can also refer to the human self that is capable of knowledge and moral formation.",
      },
      {
        id: "intellect-term",
        label: "Intellect",
        kicker: "Knowledge and the knower",
        description:
          "The term can name knowledge itself or the subtle knowing faculty. Ghazali begins with these distinctions so later claims are not confused by one word carrying several meanings.",
      },
    ],
  },
  {
    id: "city",
    title: "The city within",
    navLabel: "Inner city",
    scope: "Sections 2-5",
    chapterIds: [2, 3, 4, 5],
    asset: assetUrl("assets/heart-city-concept-luminous.jpg"),
    thumbnail: assetUrl("assets/heart-city-concept-luminous-thumb.jpg"),
    alt: "Luminous interpretive city model in white stone and gold, with a polished amber heart at the center, a study, provisions, watch post, workshops, gardens, and gates for bodily faculties",
    caption:
      "Interpretive model of Ghazali's city analogy. The bodily and inward forces are shown as roles within a governed realm.",
    nodes: conceptNodes.map((node) => ({
      id: node.id,
      label: node.label,
      kicker: node.kicker,
      description: node.description,
      x:
        node.id === "heart"
          ? 50
          : node.id === "intellect"
            ? 31
            : node.id === "appetite"
              ? 69
              : node.id === "anger"
                ? 28
                : node.id === "action"
                  ? 72
                  : 50,
      y:
        node.id === "heart"
          ? 58
          : node.id === "intellect" || node.id === "appetite"
            ? 27
            : node.id === "anger" || node.id === "action"
              ? 61
              : 12,
    })),
  },
  {
    id: "mirror",
    title: "Why a mirror fails",
    navLabel: "Mirror",
    scope: "Sections 6-7",
    chapterIds: [6, 7],
    asset: assetUrl("assets/heart-mirror-obstructions-luminous.jpg"),
    thumbnail: assetUrl("assets/heart-mirror-obstructions-luminous-thumb.jpg"),
    alt: "Sunlit white-and-gold octagonal study with mirrors that are incomplete, corroded, misdirected, veiled, or without a known target",
    caption:
      "Interpretive illustration based on Ghazali's five mirror obstructions. The image explains the analogy; it does not add a claim to the text.",
    nodes: [
      {
        id: "incomplete",
        label: "Incomplete",
        kicker: "The surface is not ready",
        description:
          "A mirror cannot receive a complete form before it is finished. Ghazali uses this physical failure as one way to understand an undeveloped capacity for knowledge.",
        x: 50,
        y: 22,
      },
      {
        id: "corroded",
        label: "Corroded",
        kicker: "The surface has been obscured",
        description:
          "Even a finished mirror loses clarity when corrosion covers it. Ghazali connects this obstruction to moral states that cloud the heart.",
        x: 73,
        y: 37,
      },
      {
        id: "veiled",
        label: "Veiled",
        kicker: "Something stands between",
        description:
          "A polished mirror still receives nothing when a veil blocks the relation between it and what it should reflect.",
        x: 73,
        y: 70,
      },
      {
        id: "misdirected",
        label: "Misdirected",
        kicker: "The surface faces elsewhere",
        description:
          "A clear mirror may be turned away from the object. Capacity alone is not enough; direction is part of receiving a true form.",
        x: 26,
        y: 36,
      },
      {
        id: "unknown-target",
        label: "No known target",
        kicker: "The bearer does not know where to turn",
        description:
          "A person may possess a usable mirror yet not know where the desired object is. Ghazali includes not knowing the right direction among the obstructions.",
        x: 28,
        y: 70,
      },
    ],
  },
  {
    id: "reservoir",
    title: "Two routes to the reservoir",
    navLabel: "Reservoir",
    scope: "Sections 8-10",
    chapterIds: [8, 9, 10],
    asset: assetUrl("assets/reservoir-knowledge-luminous.jpg"),
    thumbnail: assetUrl("assets/reservoir-knowledge-luminous-thumb.jpg"),
    alt: "Lush, sunlit interpretive cutaway reservoir filled by turquoise streams from above and an underground spring revealed by clearing below",
    caption:
      "Interpretive illustration of Ghazali's reservoir analogy: streams enter from outside, while clearing below reveals an inward spring.",
    nodes: [
      {
        id: "streams",
        label: "Streams",
        kicker: "Learning through the senses",
        description:
          "Water arriving from surrounding streams represents knowledge gathered through the outer senses, observation, instruction, and the work of inference.",
        x: 25,
        y: 27,
      },
      {
        id: "reservoir-heart",
        label: "Reservoir",
        kicker: "The receiving heart",
        description:
          "The reservoir gathers what reaches it. Ghazali uses the image to compare the heart's reception of knowledge through different routes.",
        x: 50,
        y: 42,
      },
      {
        id: "clearing",
        label: "Clearing",
        kicker: "Removing what covers",
        description:
          "Digging away the earth represents removing veils and attachments that prevent inward disclosure. The image emphasizes preparation, not passivity.",
        x: 28,
        y: 73,
      },
      {
        id: "spring",
        label: "Spring",
        kicker: "Knowledge disclosed within",
        description:
          "When the covering is removed, water rises from a spring below. Ghazali contrasts this route with gathering water only from streams above.",
        x: 63,
        y: 75,
      },
    ],
  },
  {
    id: "fortress",
    title: "Guard the entrances",
    navLabel: "Fortress",
    scope: "Sections 11-14",
    chapterIds: [11, 12, 13, 14],
    asset: assetUrl("assets/heart-fortress-gates-luminous.jpg"),
    thumbnail: assetUrl("assets/heart-fortress-gates-luminous-thumb.jpg"),
    alt: "Luminous white-and-gold interpretive heart fortress with garden courts, multiple approach paths, and small physical motifs for recurring vulnerabilities",
    caption:
      "Interpretive fortress model. The interface identifies recurring vulnerabilities named by Ghazali; the illustration is not a depiction of the unseen.",
    nodes: [
      {
        id: "anger-gate",
        label: "Anger",
        kicker: "A large entrance",
        description:
          "Anger can overwhelm deliberation and make destructive action appear justified. Ghazali treats knowledge of this entrance as part of guarding the heart.",
        x: 13,
        y: 25,
      },
      {
        id: "appetite-gate",
        label: "Appetite",
        kicker: "A large entrance",
        description:
          "Appetite draws the person toward what is desired. When it rules instead of serving, it supplies destructive suggestions with an easy route.",
        x: 87,
        y: 25,
      },
      {
        id: "wealth-gate",
        label: "Wealth",
        kicker: "Attachment becomes an opening",
        description:
          "The discussion includes attachment to wealth among recurring vulnerabilities. The danger lies in the attachment that clouds judgment, not in diagnosing possessions from a distance.",
        x: 13,
        y: 69,
      },
      {
        id: "status-gate",
        label: "Status",
        kicker: "Reputation can recruit judgment",
        description:
          "Attachment to standing and reputation can make a suggestion attractive because it promises recognition rather than truth or right action.",
        x: 86,
        y: 61,
      },
      {
        id: "haste-gate",
        label: "Haste",
        kicker: "Speed narrows reflection",
        description:
          "Haste shortens the interval in which knowledge and remembrance could expose a suggestion before it becomes resolve and action.",
        x: 31,
        y: 84,
      },
      {
        id: "suspicion-gate",
        label: "Suspicion",
        kicker: "A clouded reading of others",
        description:
          "Suspicion is listed among the entrances that can distort judgment. Ghazali's practical emphasis is watchfulness over one's own openings.",
        x: 72,
        y: 84,
      },
    ],
  },
  {
    id: "conditions",
    title: "Three conditions of the heart",
    navLabel: "Conditions",
    scope: "Section 15",
    chapterIds: [15],
    caption:
      "A simplified comparison of the three broad conditions described at the close of the book. It is a reading aid, not a ranking of people.",
    nodes: [
      {
        id: "steady",
        label: "Steady in good",
        kicker: "Good prepares the way for good",
        description:
          "A heart trained and receptive to good can be made steady in it, so one good response supports another.",
      },
      {
        id: "dominated",
        label: "Dominated",
        kicker: "Reason serves appetite",
        description:
          "A heart can become dominated by appetite and destructive traits until judgment itself is recruited to their service.",
      },
      {
        id: "contested",
        label: "Contested",
        kicker: "Opposing promptings compete",
        description:
          "Many hearts remain contested and rapidly changing, becoming steadier in the direction that repeatedly receives support.",
      },
    ],
  },
];

export const visualStoryForChapter = (chapterId: number) =>
  visualStories.find((story) => story.chapterIds.includes(chapterId)) ?? visualStories[0];
