export type RouteStyle = "isfahan" | "world";

export type DeepReading = {
  thesis: string;
  context: string;
  moves: Array<{
    title: string;
    body: string;
  }>;
  closeReading?: Array<{
    title: string;
    body: string;
  }>;
  distinction: {
    title: string;
    firstLabel: string;
    first: string;
    secondLabel: string;
    second: string;
  };
  misreading: string;
  observation: string;
  selfAudit?: string[];
  sourceAnchor: string;
};

export type VisualModel = {
  kind: "spectrum" | "chain" | "pair";
  title: string;
  items: Array<{
    label: string;
    body: string;
    role?: "warning" | "balance" | "support";
  }>;
  caption: string;
};

export type Chapter = {
  id: number;
  shortTitle: string;
  formalTitle: string;
  overview: string;
  points: string[];
  reflection: string;
  relatedNodes: string[];
  deep?: DeepReading;
  visualModel?: VisualModel;
};

export type ConceptNode = {
  id: string;
  label: string;
  kicker: string;
  description: string;
  position: string;
};

export type Book = {
  id: number;
  title: string;
};

export type Quarter = {
  id: string;
  title: string;
  focus: string;
  books: Book[];
};

export const chapters: Chapter[] = [
  {
    id: 1,
    shortTitle: "Four words, several meanings",
    formalTitle: "The meanings of soul, spirit, heart, and intellect",
    overview:
      "Ghazali begins by separating meanings that are often confused. The physical heart is one meaning of heart, but this book is concerned chiefly with the subtle human faculty that knows, perceives, directs, and is morally addressed.",
    points: [
      "The same word may carry a bodily meaning and an inward meaning.",
      "Heart, spirit, soul, and intellect overlap in some uses, but they are not simple synonyms in every use.",
      "The inward heart is related to the bodily heart while remaining distinct from a medical account of the organ.",
    ],
    reflection:
      "Before judging a state of the heart, ask which meaning of the word is actually in view. Ghazali treats clear definition as the first protection against confusion.",
    relatedNodes: ["heart", "intellect"],
  },
  {
    id: 2,
    shortTitle: "The heart's forces",
    formalTitle: "The visible and inward forces that serve the heart",
    overview:
      "The heart governs through forces that can be seen, such as limbs and sense organs, and forces known inwardly, such as impulse, movement, perception, memory, imagination, and thought.",
    points: [
      "Appetite draws what appears beneficial, while anger repels what appears harmful.",
      "Power moves the body toward a chosen end.",
      "Outer senses gather information, while inward faculties retain, combine, recall, and interpret it.",
    ],
    reflection:
      "These forces are not condemned simply for existing. Their value depends on the order in which they serve, or overpower, the heart.",
    relatedNodes: ["appetite", "anger", "senses", "action"],
  },
  {
    id: 3,
    shortTitle: "The city within",
    formalTitle: "Three analogies for the heart and its inward forces",
    overview:
      "Ghazali makes the invisible structure easier to grasp through concrete analogies. In the city analogy, the body is a realm, the governing self is its ruler, reason is a wise adviser, appetite brings provisions, and anger acts as an enforcing officer.",
    points: [
      "A city is just when its functions are ordered under wise rule.",
      "Appetite and anger can help the journey when disciplined, or seize rule when left unchecked.",
      "A second analogy compares reason to a rider, appetite to a horse, and anger to a hunting dog, each useful when trained for its proper task.",
    ],
    reflection:
      "Self-improvement is presented as governance and training, not the destruction of every impulse. The practical question is which faculty is directing which.",
    relatedNodes: ["heart", "intellect", "appetite", "anger"],
  },
  {
    id: 4,
    shortTitle: "Knowledge and will",
    formalTitle: "What distinguishes the human heart",
    overview:
      "Ghazali identifies knowledge and will as distinctive capacities of the human heart. Knowledge reaches beyond isolated sensations to meanings and consequences. Will can pursue what reason recognizes as good even when appetite resists it.",
    points: [
      "Human reason can make judgments that extend beyond the particular things directly sensed.",
      "Will responds to an understood outcome and can oppose immediate appetite.",
      "Knowledge without a capacity to act on judgment would leave judgment ineffective.",
    ],
    reflection:
      "The speed of an impulse is not proof that it deserves command. Ghazali gives considered judgment and chosen action a distinct place in moral life.",
    relatedNodes: ["heart", "intellect", "action"],
  },
  {
    id: 5,
    shortTitle: "Four recurring dispositions",
    formalTitle: "The gathered qualities and images of the heart",
    overview:
      "Ghazali gathers human tendencies under four vivid qualities: predatory anger, bestial appetite, demonic cunning, and a lordly aspiration toward knowledge and mastery. He uses the images of a dog, pig, demon, and sage to make their moral direction visible.",
    points: [
      "Anger can become aggression and contempt when it rules.",
      "Appetite can become greed and excess when it rules.",
      "Intelligence can serve deception, or it can expose deception and restore right order.",
    ],
    reflection:
      "The images name patterns of action, not fixed identities. Ghazali's concern is whether reason and faith establish justice among the powers of the self.",
    relatedNodes: ["intellect", "appetite", "anger"],
  },
  {
    id: 6,
    shortTitle: "Knowing and the mirror",
    formalTitle: "The heart as a mirror in relation to knowledge",
    overview:
      "Knowledge is compared to a form appearing in a mirror. The heart, the reality known, and the presence of its intelligible form in the heart are related but distinct.",
    points: [
      "A mirror may fail through incompleteness, corrosion, wrong direction, an intervening veil, or ignorance of where to turn.",
      "Ghazali maps these failures onto obstacles that prevent knowledge from becoming clear in the heart.",
      "Moral practice is therefore connected to the clarity with which the heart receives truth.",
    ],
    reflection:
      "The mirror is not a claim that every impression is true. It is an argument for preparing, directing, and clearing the faculty by which truth is recognized.",
    relatedNodes: ["heart", "senses", "intellect"],
  },
  {
    id: 7,
    shortTitle: "Kinds of knowledge",
    formalTitle: "Intellectual, religious, worldly, and otherworldly knowledge",
    overview:
      "Ghazali distinguishes knowledge grasped by the native capacity of reason from knowledge received through religious teaching. He also distinguishes necessary knowledge from acquired knowledge, and worldly concerns from otherworldly ones.",
    points: [
      "Some basic judgments are present without a remembered process of instruction.",
      "Other knowledge is acquired through learning and inference.",
      "The heart's capacity resembles sight, while actual knowledge resembles seeing when light and direction are present.",
    ],
    reflection:
      "This is a map of how knowledge is received, not a reason to neglect learning. Acquired knowledge has an explicit and necessary place in the account.",
    relatedNodes: ["heart", "intellect", "senses"],
  },
  {
    id: 8,
    shortTitle: "Learning and inspiration",
    formalTitle: "Different ways knowledge comes to the heart",
    overview:
      "Knowledge may be gained through evidence, reflection, and instruction, or it may arise without a consciously traced chain of reasoning. Ghazali calls the latter inspiration and carefully distinguishes it from prophetic revelation.",
    points: [
      "Ordinary learning proceeds through effort, evidence, and inference.",
      "Inspiration is described as knowledge arriving without the learner tracing the immediate route by which it came.",
      "Revelation with awareness of the angelic messenger is reserved for prophets in Ghazali's classification.",
    ],
    reflection:
      "The distinctions matter. A sudden conviction is not presented as prophetic revelation, and this chapter does not erase the discipline of learning.",
    relatedNodes: ["heart", "intellect", "senses"],
  },
  {
    id: 9,
    shortTitle: "Reservoir and polished wall",
    formalTitle: "Two tangible examples for ways of knowing",
    overview:
      "A reservoir can be filled by streams from above or by clearing down to a spring below. A polished wall can reflect the work painted opposite it. These examples contrast gathering knowledge through the senses with preparing the heart for inward disclosure.",
    points: [
      "The streams stand for the external senses and observation.",
      "Clearing the reservoir stands for removing veils that prevent inward knowledge.",
      "The polished wall emphasizes purification and readiness, while the painted wall emphasizes acquisition and inscription.",
    ],
    reflection:
      "Ghazali does not say that knowledge or purification can be discarded. His conclusion is that happiness depends on knowledge, while people differ in how it is received and in the clarity of their hearts.",
    relatedNodes: ["heart", "senses", "intellect"],
  },
  {
    id: 10,
    shortTitle: "Witness from revelation",
    formalTitle: "Religious testimony for knowledge beyond ordinary instruction",
    overview:
      "Ghazali supports the possibility of inwardly granted knowledge by gathering scriptural reports, accounts of insight, and examples from the lives of prophets and righteous people.",
    points: [
      "The chapter belongs inside his wider account of prophecy, sainthood, learning, and degrees of certainty.",
      "Its examples are evidence within Ghazali's religious framework, not a modern experimental argument.",
      "The text continues to distinguish prophetic revelation from other forms of inward insight.",
    ],
    reflection:
      "Read this section in its own stated register: Ghazali is explaining a religious account of knowledge and its scriptural basis.",
    relatedNodes: ["heart", "intellect"],
  },
  {
    id: 11,
    shortTitle: "Promptings and influence",
    formalTitle: "How destructive suggestions gain influence over the heart",
    overview:
      "The heart is continually visited by thoughts and inclinations. Ghazali examines how destructive suggestions exploit existing desire and anger, and how remembrance, knowledge, and disciplined character oppose them.",
    points: [
      "A passing thought, an inclination, a judgment, and a resolved intention are not treated as one undifferentiated event.",
      "Destructive influence often works by making an impulse appear attractive or reasonable.",
      "A prepared heart recognizes and resists a suggestion more readily than a heart already organized around appetite.",
    ],
    reflection:
      "The useful practice is early recognition. Once an impulse recruits imagination, judgment, and action, it is harder to interrupt.",
    relatedNodes: ["heart", "intellect", "appetite", "anger"],
  },
  {
    id: 12,
    shortTitle: "Guarding the entrances",
    formalTitle: "The principal ways destructive suggestions enter",
    overview:
      "Ghazali compares the heart to a fortress. Guarding it requires knowing its entrances, especially recurring traits through which judgment is clouded and vice is made easy.",
    points: [
      "Anger and appetite are among the largest entrances because they can overwhelm deliberation.",
      "The discussion also treats envy, greed, haste, suspicion, attachment to wealth and status, and other recurring vulnerabilities.",
      "The aim is watchfulness over one's own openings, not preoccupation with diagnosing other people.",
    ],
    reflection:
      "A fortress cannot be guarded by a person who refuses to learn where its gates are. Self-knowledge is part of moral protection.",
    relatedNodes: ["heart", "appetite", "anger", "senses"],
  },
  {
    id: 13,
    shortTitle: "Thought and accountability",
    formalTitle: "Passing thoughts, inclination, resolve, and moral responsibility",
    overview:
      "This section separates what merely occurs to a person from what the person welcomes, decides, resolves, and carries into action. The distinctions allow Ghazali to reconcile texts about pardon for involuntary thoughts with texts about inward intention.",
    points: [
      "An involuntary suggestion is not identical to a chosen act.",
      "Attention, assent, resolve, and action describe increasingly voluntary stages.",
      "Ghazali treats intention as morally significant while preserving pardon for what is not chosen.",
    ],
    reflection:
      "Do not turn the chapter into scrupulous fear of every passing thought. Its structure protects the distinction between what arrives and what is deliberately adopted.",
    relatedNodes: ["heart", "intellect", "action"],
  },
  {
    id: 14,
    shortTitle: "Remembrance and recurrence",
    formalTitle: "Whether destructive suggestions can cease entirely",
    overview:
      "Ghazali records several positions about whether remembrance entirely stops destructive suggestions. He concludes that the positions can each describe different kinds and strengths of prompting.",
    points: [
      "Some suggestions fall silent when their deception is exposed by clear knowledge.",
      "Some remain present but lose their power to move the person.",
      "Ordinary distracting thoughts may alternate rapidly with remembrance or coexist at the edge of attention.",
    ],
    reflection:
      "A recurring thought does not by itself prove that remembrance has failed. The chapter asks whether the thought rules, persuades, or is recognized and refused.",
    relatedNodes: ["heart", "intellect", "appetite"],
  },
  {
    id: 15,
    shortTitle: "Change and steadiness",
    formalTitle: "The heart's rapid change and three broad conditions",
    overview:
      "The book closes with the heart's rapid change. Ghazali describes a heart made steady in good, a heart dominated by appetite and destructive traits, and a heart contested between opposing promptings.",
    points: [
      "Good can lead to further good when the heart is trained and receptive.",
      "Desire can darken judgment when reason has become its servant.",
      "Many hearts remain contested, changing according to which influence receives support.",
    ],
    reflection:
      "The closing image makes vigilance practical. A changing heart requires repeated care, not a single moment of insight followed by neglect.",
    relatedNodes: ["heart", "intellect", "appetite", "anger", "action"],
  },
];

export const conceptNodes: ConceptNode[] = [
  {
    id: "heart",
    label: "The heart",
    kicker: "Governor",
    description:
      "The subtle faculty that knows, chooses, is addressed, and directs the body. Ghazali distinguishes it from the physical organ without denying their special relation.",
    position: "node-heart",
  },
  {
    id: "intellect",
    label: "Intellect",
    kicker: "Wise adviser",
    description:
      "The capacity for knowledge, foresight, and sound counsel. It restores order when it guides appetite and anger rather than inventing excuses for them.",
    position: "node-intellect",
  },
  {
    id: "appetite",
    label: "Appetite",
    kicker: "Provisioner",
    description:
      "The force that draws nourishment and other desired things. It is necessary in its proper service and destructive when it becomes the ruler.",
    position: "node-appetite",
  },
  {
    id: "anger",
    label: "Anger",
    kicker: "Protective force",
    description:
      "The force that repels harm and supports defense. Courage can arise from its discipline, while aggression arises from its excess and rule.",
    position: "node-anger",
  },
  {
    id: "senses",
    label: "Perception",
    kicker: "Messengers",
    description:
      "Outer senses receive the world. Inward faculties retain, imagine, combine, and recall what they bring, like messengers and keepers serving a city.",
    position: "node-senses",
  },
  {
    id: "action",
    label: "Action",
    kicker: "Workers",
    description:
      "Limbs and organs carry an inward decision into the visible world. The moral quality appearing outside follows the order established within.",
    position: "node-action",
  },
];

export const quarters: Quarter[] = [
  {
    id: "worship",
    title: "The Quarter of Worship",
    focus: "Knowledge, belief, purification, prayer, charity, fasting, pilgrimage, recitation, remembrance, and nightly devotion.",
    books: [
      { id: 1, title: "The Book of Knowledge" },
      { id: 2, title: "The Principles of the Creed" },
      { id: 3, title: "The Mysteries of Purification" },
      { id: 4, title: "The Mysteries of Prayer" },
      { id: 5, title: "The Mysteries of Charity" },
      { id: 6, title: "The Mysteries of Fasting" },
      { id: 7, title: "The Mysteries of Pilgrimage" },
      { id: 8, title: "The Etiquette of Reciting the Quran" },
      { id: 9, title: "Invocations and Supplications" },
      { id: 10, title: "Litanies and Night Vigil" },
    ],
  },
  {
    id: "customs",
    title: "The Quarter of Customs",
    focus: "Daily life and relationships, including food, marriage, work, friendship, retreat, travel, listening, public duty, and prophetic character.",
    books: [
      { id: 11, title: "The Proprieties of Eating" },
      { id: 12, title: "The Proprieties of Marriage" },
      { id: 13, title: "Earning a Living" },
      { id: 14, title: "The Lawful and the Unlawful" },
      { id: 15, title: "Friendship and Brotherhood" },
      { id: 16, title: "The Proprieties of Retreat" },
      { id: 17, title: "The Proprieties of Travel" },
      { id: 18, title: "Listening and Ecstasy" },
      { id: 19, title: "Commanding Right and Forbidding Wrong" },
      { id: 20, title: "Prophetic Character and Daily Living" },
    ],
  },
  {
    id: "perils",
    title: "The Quarter of Perils",
    focus: "The heart, character, desire, speech, anger, envy, worldliness, wealth, reputation, pride, and self-deception.",
    books: [
      { id: 21, title: "The Wonders of the Heart" },
      { id: 22, title: "Training the Soul and Refining Character" },
      { id: 23, title: "Overcoming the Two Desires" },
      { id: 24, title: "The Bane of the Tongue" },
      { id: 25, title: "Anger, Malice, and Envy" },
      { id: 26, title: "The Censure of This World" },
      { id: 27, title: "The Censure of Wealth and Greed" },
      { id: 28, title: "The Censure of Fame and Ostentation" },
      { id: 29, title: "The Censure of Pride and Vanity" },
      { id: 30, title: "The Censure of Deceit" },
    ],
  },
  {
    id: "deliverance",
    title: "The Quarter of Deliverance",
    focus: "Repentance, patience, gratitude, fear, hope, simplicity, trust, love, sincerity, vigilance, contemplation, and remembering death.",
    books: [
      { id: 31, title: "Repentance" },
      { id: 32, title: "Patience and Thankfulness" },
      { id: 33, title: "Fear and Hope" },
      { id: 34, title: "Poverty and Abstinence" },
      { id: 35, title: "Unity and Trust" },
      { id: 36, title: "Love, Longing, Intimacy, and Contentment" },
      { id: 37, title: "Intention, Sincerity, and Truthfulness" },
      { id: 38, title: "Vigilance and Accounting" },
      { id: 39, title: "Contemplation" },
      { id: 40, title: "Remembering Death and the Hereafter" },
    ],
  },
];

export const contentSources = [
  {
    label: "Primary Arabic text",
    note: "Public text used to verify the sequence, analogies, and conceptual claims in this edition.",
    url: "https://ar.wikisource.org/wiki/%D8%A5%D8%AD%D9%8A%D8%A7%D8%A1_%D8%B9%D9%84%D9%88%D9%85_%D8%A7%D9%84%D8%AF%D9%8A%D9%86/%D9%83%D8%AA%D8%A7%D8%A8_%D8%B4%D8%B1%D8%AD_%D8%B9%D8%AC%D8%A7%D8%A6%D8%A8_%D8%A7%D9%84%D9%82%D9%84%D8%A8",
  },
  {
    label: "Forty-book structure",
    note: "English book titles and the four-quarter organization.",
    url: "https://www.ghazali.org/listing-the-forty-books/",
  },
  {
    label: "Published Book 21 edition",
    note: "Walter James Skellie translation, edited by T. J. Winter. Used for title and chapter cross-checking, not copied as page text.",
    url: "https://fonsvitae.com/product/al-ghazali-the-marvels-of-the-heart-science-of-the-spirit-book-xxi-of-the-revival-of-the-religious-sciences/",
  },
];

export const architectureSources: Record<RouteStyle, Array<{ label: string; mapping: string; url: string }>> = {
  isfahan: [
    {
      label: "Friday Mosque of Isfahan",
      mapping: "The page grid follows its four courtyard-facing vaulted halls. The pointed portal frame, fired brick, turquoise tile accent, and dome reference all come from this single complex.",
      url: "https://whc.unesco.org/en/list/1397/",
    },
    {
      label: "Taj al-Mulk dome photograph",
      mapping: "The hero canopy uses a real view of the Seljuk north dome, built in 1088 to 1089. Photograph by Skot, licensed CC BY-SA 4.0.",
      url: "https://commons.wikimedia.org/wiki/File:Taj_al-Molk_dome_of_Jameh_Mosque_of_Isfahan,_Iran_02.jpg",
    },
    {
      label: "Courtyard photograph",
      mapping: "The inset preserves the actual courtyard and south portal relationship. Photograph by Alex O. Holcombe, licensed CC BY-SA 2.5.",
      url: "https://commons.wikimedia.org/wiki/File:Jam%C3%A9_Mosque_Esfahan_courtyard.jpg",
    },
  ],
  world: [
    {
      label: "Grand Mosque of Makkah",
      mapping: "The hero canopy and the interface's octagonal image masks, chapter emblems, and diagram frames follow the current expansion's eight-sided coffers, pale carved surfaces, blue-gray linework, and restrained gold lighting.",
      url: "https://spa.gov.sa/en/N2123422",
    },
    {
      label: "Great Mosque of Cordoba",
      mapping: "The paired reading bays use the mosque's documented double-arch logic as a navigation rhythm, without copying a sacred inscription.",
      url: "https://whc.unesco.org/en/list/313/",
    },
    {
      label: "Selimiye Mosque",
      mapping: "The centered focus medallion borrows only the organizing logic of one great dome over an illuminated space.",
      url: "https://whc.unesco.org/en/list/1366/",
    },
    {
      label: "Grand Mosque interior photograph",
      mapping: "The smaller architectural aperture is a 2022 photograph by Richard Mortel, licensed CC BY 2.0.",
      url: "https://commons.wikimedia.org/wiki/File:Interior_of_the_Grand_Mosque_of_Makkah,_Saudi_Arabia_(1)_(52501962248).jpg",
    },
  ],
};
