import { assetUrl } from "./assetUrl";
import type { Chapter, ConceptNode, VisualModel } from "./data";
import type { Instrument, Journey, SourceLink, SystemBook, TaxonomyGroup } from "./systemTypes";

type Seed = { id: number; shortTitle: string; formalTitle: string; overview: string; moves: Array<{ title: string; body: string }>; closer: Array<{ title: string; body: string }>; distinction: [string, string, string, string, string]; misreading: string; reflection: string; audit: string[]; nodes: string[]; model: VisualModel };
const fasl = (id: number) => (id === 1 ? "the first section, on the outward requirements" : id <= 10 ? "the second section, on the mysteries of the fast" : "the third section, on voluntary fasting");
const makeChapter = (seed: Seed): Chapter => ({
  id: seed.id, shortTitle: seed.shortTitle, formalTitle: seed.formalTitle, overview: seed.overview,
  points: seed.moves.slice(0, 3).map((m) => m.body), reflection: seed.reflection, relatedNodes: seed.nodes, visualModel: seed.model,
  deep: { thesis: seed.moves[0].body, context: seed.overview, moves: seed.moves, closeReading: seed.closer,
    distinction: { title: seed.distinction[0], firstLabel: seed.distinction[1], first: seed.distinction[2], secondLabel: seed.distinction[3], second: seed.distinction[4] },
    misreading: seed.misreading, observation: seed.reflection, selfAudit: seed.audit,
    sourceAnchor: `Book 6, ${fasl(seed.id)}, ${seed.formalTitle}.` },
});
const chain = (title: string, caption: string, items: Array<[string, string, "support" | "balance" | "warning"]>): VisualModel => ({ kind: "chain", title, caption, items: items.map(([label, body, role]) => ({ label, body, role })) });
const pair = (title: string, caption: string, items: Array<[string, string, "support" | "balance" | "warning"]>): VisualModel => ({ kind: "pair", title, caption, items: items.map(([label, body, role]) => ({ label, body, role })) });
const spectrum = (title: string, caption: string, items: Array<[string, string, "support" | "balance" | "warning"]>): VisualModel => ({ kind: "spectrum", title, caption, items: items.map(([label, body, role]) => ({ label, body, role })) });

export const book06Chapters: Chapter[] = [
  makeChapter({
    id: 1, shortTitle: "The outward", formalTitle: "The obligations, the customs, and what breaking it requires",
    overview: "The shortest book in the Quarter of Worship opens with its legal apparatus, and disposes of it quickly to reach a chapter that is almost entirely argument.",
    moves: [
      { title: "Give the outward obligations", body: "The first section sets out the obligations of the fast, which Ghazali numbers, together with the outward customs and what is required when a fast is invalidated." },
      { title: "Give the requirements on breaking", body: "The requirements attaching to breaking the fast are four, treated in turn. This is the technical part of the book, and it is complete." },
      { title: "Announce the three sections", body: "The obligations and outward customs with what breaking requires; the mysteries of the fast and its inward conditions; and voluntary fasting with the arrangement of litanies in it." },
      { title: "Note the proportion", body: "The second section is the book. It contains the three degrees, six duties, and an explicit reconciliation of two ways of calling a fast valid — and it is where every argument in the book sits." },
    ],
    closer: [
      { title: "The pattern of the quarter, again", body: "Purification declared four ranks and treated the lowest. Prayer fixed the outward acts and then argued about the heart. Alms gave the law in one section and eight duties in the next. Here the law is one section and the mysteries are the rest." },
      { title: "What makes this book different", body: "Book 4 argued that presence of heart is a condition and left the tension with the ordinary rulings standing. This book faces the same question — what about someone who keeps only the outward — and answers it directly. That answer is the ninth section here." },
    ],
    distinction: ["Two things a book on fasting can settle", "What is required", "The obligations, the customs, and what invalidation entails, which is one section.", "What it is for", "The three degrees and the six duties, which are the rest of the book."],
    misreading: "Do not treat the first section as replaceable by the second. Ghazali's ninth section argues that both notions of a valid fast are legitimate, which requires the outward requirements to be real.",
    reflection: "Notice that the shortest book in the quarter is the one that most directly answers what the quarter is for.",
    audit: ["What did I expect this book to be?", "Which section do I need?", "Do I know the outward requirements?", "What is the fast for?"],
    nodes: ["sawm", "structure", "fiqh"],
    model: chain("Three sections", "The middle one is the book.", [["The outward", "Obligations, customs, and the four requirements on breaking.", "balance"], ["The mysteries", "Three degrees, six duties, and the reconciliation.", "support"], ["Voluntary fasting", "And the arrangement of litanies within it.", "balance"]]),
  }),
  makeChapter({
    id: 2, shortTitle: "Three degrees", formalTitle: "The degrees of the fast",
    overview: "The passage this book is known for. Three fasts of the same day, distinguished by what is being restrained rather than by how strictly.",
    moves: [
      { title: "Give the first", body: "The fast of the generality is restraining the stomach and the genitals from satisfying appetite. This is the fast the first section legislated, in full." },
      { title: "Give the second", body: "The fast of the select is restraining the hearing, the sight, the tongue, the hand, the foot, and the rest of the limbs from sins." },
      { title: "Give the third", body: "The fast of the select of the select is the fast of the heart from base concerns and worldly thoughts, and restraining it from everything other than God entirely." },
      { title: "Note what distinguishes them", body: "Not effort and not duration. Each degree names a different organ and a different thing withheld from it, which is what makes them three fasts rather than three intensities of one." },
    ],
    closer: [
      { title: "Why the scheme is by organ", body: "A scale of intensity would let a person place himself by how hard the day felt. A scale by organ cannot be flattered: either the tongue was restrained or it was not, and the answer does not depend on how difficult the abstaining was." },
      { title: "The relation to Book 3", body: "Purification also ran a scale from the body through the limbs to the heart and named the top rank for the prophets and the truthful. This is the same architecture applied to a different act, and Ghazali does not point it out — the quarters are built to be noticed." },
    ],
    distinction: ["Two ways to grade an act", "By what is restrained", "Stomach, limbs, heart — which cannot be flattered by how hard the day felt.", "By intensity", "How strictly and how long, which measures difficulty rather than degree."],
    misreading: "Do not read the degrees as three levels of merit within one fast. Ghazali describes three different restraints, and the second and third do not make the first more strenuous.",
    reflection: "Ask which organ your last fast actually restrained.",
    audit: ["Which organ did I restrain?", "Did I grade myself by difficulty?", "What was left unrestrained?", "Where else does this architecture appear?"],
    nodes: ["daraja", "sawm", "jawarih"],
    model: spectrum("Three degrees", "Each names a different organ.", [["The generality", "The stomach and the genitals, from satisfying appetite.", "balance"], ["The select", "The hearing, sight, tongue, hand, foot, and the rest, from sins.", "support"], ["The select of the select", "The heart, from base concerns and everything other than God.", "support"]]),
  }),
  makeChapter({
    id: 3, shortTitle: "What breaks the third", formalTitle: "The fast of the heart, and how it is broken",
    overview: "The third degree is given a page and then a startling test — one that would break the fast of almost every person who has ever kept one.",
    moves: [
      { title: "Say how it breaks", body: "Breaking the fast in this fast occurs by thinking of what is other than God and the Last Day, and by thinking of the world." },
      { title: "Give the exception", body: "Except a world wanted for religion — for that is provision for the hereafter and is not of the world. The exception is stated at once, and it is doing real work." },
      { title: "Give the sharpest test", body: "Until the masters of hearts said: whoever's aspiration moves during his day toward arranging what he will break his fast with, a fault is written against him." },
      { title: "Give the reason", body: "Because that is from little trust in God's bounty and little certainty in His promised provision. The fault is located in a belief rather than in an indulgence." },
    ],
    closer: [
      { title: "How he marks the rank", body: "And this is the rank of the prophets and the truthful and the near ones. And one should not lengthen the examination of its detail in words, but in realising it in act. He names the degree, gives its test, marks whose it is, and declines to elaborate — the same restraint Book 35 shows at the highest degree of unity." },
      { title: "What it consists in", body: "A turning with the whole of one's aspiration toward God and a turning away from other than Him, clothed in the meaning of the verse: say God, then leave them in their plunging. The same verse Book 3 uses for the fourth rank of purification, on the ground that two things do not gather in one heart." },
    ],
    distinction: ["Two things that break a fast", "Eating", "Which breaks the first degree, and is what the law legislates.", "Planning the meal", "Which breaks the third, and which Ghazali traces to little trust rather than to appetite."],
    misreading: "Do not take the test about the evening meal as a rule for everyone. Ghazali attributes it to the masters of hearts and names the degree it belongs to as the rank of the prophets and the truthful.",
    reflection: "Notice that the fault named is a shortage of trust, and where else in the Ihya that is treated.",
    audit: ["What occupied me today?", "Was any of it wanted for religion?", "Is my planning trust or its absence?", "Whose rank is this?"],
    nodes: ["daraja", "qalb", "tawakkul"],
    model: pair("Where the fault is located", "Which decides what would repair it.", [["In the appetite", "An indulgence, treated by restraint.", "balance"], ["In the trust", "Little certainty in the promised provision, which restraint does not reach.", "warning"]]),
  }),
  makeChapter({
    id: 4, shortTitle: "The poisoned arrow", formalTitle: "The first duty: lowering the gaze",
    overview: "The fast of the select is completed by six things, and the first of them is given a wider scope than the obvious one.",
    moves: [
      { title: "Give the duty", body: "Lowering the gaze and restraining it from ranging over everything that is blamed and disliked." },
      { title: "Give the wider clause", body: "And over everything that occupies the heart and distracts from the remembrance of God. The second half of the instruction reaches things that are not blamed at all." },
      { title: "Give the report", body: "The glance is a poisoned arrow among the arrows of Iblis. Whoever leaves it out of fear of God, God gives him a faith whose sweetness he finds in his heart." },
      { title: "Note the exchange", body: "Something is given in return, and it is described as a taste rather than a reward. The instruction is not framed as a deprivation with a payment attached later." },
    ],
    closer: [
      { title: "Why the wider clause matters", body: "A rule about what is blamed can be satisfied and finished. A rule about what occupies the heart and distracts from remembrance has no fixed list and is settled case by case, which is what makes it belong to a chapter on inward conditions rather than to the first section." },
      { title: "The same instruction elsewhere", body: "Book 4 treats the eye as the commonest external cause of a wandering prayer and prescribes removing what is looked at rather than resisting it. The two books give the same organ the same treatment for the same reason." },
    ],
    distinction: ["Two scopes for one instruction", "What is blamed", "A list that can be completed, and which the law already reaches.", "What occupies", "Anything that draws the heart away, which has no list and must be judged."],
    misreading: "Do not narrow the duty to what is forbidden to look at. The clause about what occupies the heart is the half that makes this an inward condition.",
    reflection: "Name one thing you looked at today that was not blamed and that occupied you for an hour afterward.",
    audit: ["What occupied me that was not forbidden?", "Do I read this narrowly?", "What is given in exchange?", "Where else is the eye treated this way?"],
    nodes: ["basar", "sitta", "jawarih"],
    model: pair("Two halves of the duty", "Only the second requires judgement.", [["What is blamed", "Reached by the law, and completable.", "balance"], ["What occupies", "No list, judged case by case, and the reason this is an inward condition.", "support"]]),
  }),
  makeChapter({
    id: 5, shortTitle: "Five that break it", formalTitle: "The second duty: guarding the tongue",
    overview: "The longest of the six duties, and the one where Ghazali's language stops being careful about the difference between spoiling a fast and breaking it.",
    moves: [
      { title: "Give the duty", body: "Guarding the tongue from babble, lying, backbiting, tale-bearing, obscenity, harshness, quarrelling, and disputation — and binding it to silence, and occupying it with the remembrance of God and the recitation of the Quran. This is the fast of the tongue." },
      { title: "Give the list", body: "Five things break the faster's fast: lying, backbiting, tale-bearing, false swearing, and looking with desire." },
      { title: "Give the authorities", body: "Sufyan said that backbiting spoils the fast. And Mujahid: two traits spoil the fast — backbiting and lying." },
      { title: "Give the instruction for provocation", body: "The fast is only a shield. When one of you is fasting, let him not be obscene or ignorant; and if a man fights him or abuses him, let him say: I am fasting, I am fasting." },
    ],
    closer: [
      { title: "The two women", body: "Two women fasted and were so exhausted by hunger and thirst by the end of the day that they nearly perished, and sent asking permission to break the fast. A cup was sent to them with an instruction — and what they brought up was flesh and blood, because they had fasted from what God permitted them and broken their fast on what He forbade them." },
      { title: "What the report is doing", body: "It is the sharpest possible statement of the chapter's thesis, and its force is in the detail that the two women were genuinely suffering. Their fast of the first degree was exemplary; it is the second degree that the report says they had not kept at all." },
    ],
    distinction: ["Two ways a fast can end", "Broken", "By what the law names, which is the first degree and is settled by the first section.", "Broken on the forbidden", "Fasting from the permitted while consuming what is not, which is what the report describes."],
    misreading: "Do not conclude that backbiting nullifies the fast in law. Ghazali reports what Sufyan and Mujahid said, and his ninth section explains precisely how the jurists' account and this one differ.",
    reflection: "Notice that the report's force depends on the two women having kept the outward fast perfectly.",
    audit: ["Which of the five did I do today?", "Did I answer provocation, or say what I was told to say?", "Is my tongue bound to silence or merely to the permitted?", "What did I break my fast on?"],
    nodes: ["lisan", "sitta", "ghiba"],
    model: spectrum("Five that break it", "Four of them are the tongue.", [["Lying", "The first named.", "warning"], ["Backbiting", "Which Sufyan and Mujahid both single out.", "warning"], ["Tale-bearing", "Carrying speech between people.", "warning"], ["False swearing", "The fourth.", "warning"], ["Looking with desire", "The one that is not the tongue.", "warning"]]),
  }),
  makeChapter({
    id: 6, shortTitle: "The rest of them", formalTitle: "The third and fourth duties: hearing and the limbs",
    overview: "Two duties that extend the same principle outward, and one of them makes a listener a partner.",
    moves: [
      { title: "Give the third duty", body: "Restraining the hearing from what it is disliked to listen to — since everything forbidden to say is forbidden to listen to." },
      { title: "Give the principle", body: "Ghazali carries the report that the one who backbites and the one who listens are partners in the sin. The duty is derived rather than added: the ear is bound by the same rule as the tongue." },
      { title: "Give the fourth duty", body: "Restraining the rest of the limbs from sins — the hand and the foot among them — and restraining the stomach at the breaking of the fast from what is doubtful." },
      { title: "Note the completeness", body: "With these the second degree is fully specified: the eye, the tongue, the ear, and the remaining limbs. The fast of the select is an ordinary fast performed by the whole body." },
    ],
    closer: [
      { title: "Why the listener is a partner", body: "Backbiting requires an audience, and an audience that will not receive it ends it. Making the listener a partner locates the offence in the exchange rather than in the speaker alone, which is the same move the Ihya makes throughout when it treats speech as an act with two ends." },
      { title: "The stomach at the breaking", body: "Restraining it from the doubtful at sunset is placed here rather than with the fifth duty about quantity, because it concerns what is eaten rather than how much. It is of no use, Ghazali will argue, to fast from what is permitted and break the fast on what is not." },
    ],
    distinction: ["Two ends of one offence", "Speaking", "The tongue, which the second duty binds.", "Listening", "The ear, which is made a partner in the sin rather than an innocent bystander."],
    misreading: "Do not read the fourth duty as a general instruction to avoid sin. Its point is that the fast is not a suspension of the ordinary obligations but an intensification of them across the whole body.",
    reflection: "Ask whether you have ever ended a conversation that was going somewhere you would not have gone yourself.",
    audit: ["Have I listened to what I would not say?", "Which limb did I leave out?", "What did I break my fast on?", "Am I a partner in something?"],
    nodes: ["sam", "sitta", "ghiba"],
    model: chain("The second degree, fully specified", "An ordinary fast performed by the whole body.", [["The eye", "Lowered from the blamed and from what occupies.", "support"], ["The tongue", "Bound to silence and to remembrance.", "support"], ["The ear", "Bound by the same rule, and made a partner.", "support"], ["The limbs", "Hand, foot, and the stomach at the breaking.", "support"]]),
  }),
  makeChapter({
    id: 7, shortTitle: "The feedbag", formalTitle: "The fifth duty: not filling what the day emptied",
    overview: "The duty that names the mechanism of the whole fast, and the one most commonly defeated — in a way that Ghazali says voids the benefit entirely.",
    moves: [
      { title: "Name the mechanism", body: "The spirit of the fast and its secret is the weakening of the powers that are the devil's means for returning to evils. And that will not be obtained except by reducing." },
      { title: "Give the measure", body: "Namely, that he eat the meal he would have eaten each night had he not fasted." },
      { title: "Name the defeat", body: "But if he gathers what he used to eat in the forenoon to what he used to eat at night, he has not benefited from his fast." },
      { title: "Give the accompanying manners", body: "And of the manners is that he not sleep much by day, so that he feels hunger and thirst and senses the weakening of the powers — and at that his heart becomes clear. And that he maintain each night a measure of weakness, so that his night vigil and his litanies are light for him." },
    ],
    closer: [
      { title: "The Night of Power", body: "So perhaps the devil will not hover about his heart, and he will look upon the kingdom of heaven — and the Night of Power is an expression for the night in which something of the Kingdom is disclosed. Ghazali connects the reduction of food directly to what the month is for." },
      { title: "The two clauses that follow", body: "Whoever makes between his heart and his breast a feedbag of food is veiled from it. And whoever empties his stomach — that is not enough to lift the veil, so long as he has not emptied his aspiration of what is other than God. And that is the whole matter. The first clause makes eating a veil; the second refuses to let emptiness be a technique." },
    ],
    distinction: ["Two ways to complete a day of fasting", "At the ordinary meal", "Eating what the night would have held anyway, which preserves the weakening.", "By gathering both", "The forenoon's meal added to the night's, which Ghazali says leaves no benefit at all."],
    misreading: "Do not conclude that an empty stomach is the aim. Ghazali says explicitly that emptying the stomach is not enough to lift the veil so long as the aspiration is not emptied — and that the aspiration is the whole matter.",
    reflection: "Compare what you ate on a day of fasting with what you eat on a day without one.",
    audit: ["Did I eat more, or the same?", "Do I sleep through the hunger?", "Is my night vigil lighter or heavier?", "Have I made emptiness a technique?"],
    nodes: ["taqlil", "sitta", "qadr"],
    model: chain("Why reduction is the mechanism", "Each step is required for the next.", [["Reduce the food", "Which weakens the powers the devil works through.", "support"], ["Feel the weakness", "Which is why not sleeping through the day is a manner.", "balance"], ["The heart clears", "And the night vigil becomes light.", "support"], ["Something is disclosed", "Which is what the Night of Power is named for.", "support"]]),
  }),
  makeChapter({
    id: 8, shortTitle: "After it ends", formalTitle: "The sixth duty: suspended between fear and hope",
    overview: "The last of the six, and it applies not to the fast but to the moment after it — and then Ghazali extends it to everything.",
    moves: [
      { title: "Give the duty", body: "That his heart after breaking the fast be suspended and wavering between fear and hope." },
      { title: "Give the reason", body: "Since he does not know whether his fast is accepted, so that he is among the near; or rejected, so that he is among the detested." },
      { title: "Extend it", body: "And let him be so at the end of every act of worship he finishes. The instruction leaves the subject of fasting in its last clause." },
      { title: "Note what it rules out", body: "Both settled outcomes. The relief of having completed something and the despair of having done it badly are equally excluded, and what is prescribed is the unsettled state between them." },
    ],
    closer: [
      { title: "Why the end rather than the middle", body: "During the fast there is something to do, and attention has an object. At the end there is nothing left but an assessment, and an assessment is exactly what this duty forbids settling. It is the one duty that cannot be performed by acting." },
      { title: "The relation to Book 33", body: "Fear and hope are given a book of their own, which argues that neither is superior in itself and that the question is which a person needs now. Here both are required at once, at a specific moment — which is the one place in the Ihya where the answer to that question is fixed in advance." },
    ],
    distinction: ["Two ways to finish an act of worship", "Suspended", "Between fear and hope, with the outcome genuinely unknown.", "Settled", "Relieved or disappointed, both of which assume an answer that is not available."],
    misreading: "Do not read the fear as a demand for anxiety. Ghazali pairs it with hope in the same clause, and what is prescribed is the suspension rather than either of its poles.",
    reflection: "Notice what you actually feel when a fast ends, and whether it is one of the two things this duty rules out.",
    audit: ["What do I feel when it ends?", "Is that a settled verdict?", "Do I extend this to other acts?", "Which pole do I default to?"],
    nodes: ["khawf-raja", "sitta", "qabul"],
    model: pair("What is ruled out", "Both are settlements of a question that is open.", [["Relief", "Having completed it, which assumes acceptance.", "warning"], ["Disappointment", "Having done it badly, which assumes rejection.", "warning"]]),
  }),
  makeChapter({
    id: 9, shortTitle: "Valid, or accepted", formalTitle: "What the jurists mean and what the scholars of the hereafter mean",
    overview: "The most important passage in the book, and one of the clearest statements anywhere in the Ihya of what Ghazali thinks he is doing.",
    moves: [
      { title: "Put the objection", body: "If you say: one who confines himself to restraining the appetite of the stomach and the genitals, and abandons these meanings — the jurists have said his fast is valid. So what does that mean?" },
      { title: "Concede the evidence point", body: "Know that the jurists of the outward establish the conditions of the outward with evidences weaker than these evidences we have brought for these inward conditions, especially backbiting and the like." },
      { title: "Explain the jurists' position", body: "But the jurists of the outward have nothing to do with obligations except what is easy for the generality of the heedless, who are turned toward the world, to come under. The limitation is described as belonging to their office rather than to their competence." },
      { title: "Give the other sense", body: "As for the scholars of the hereafter, they mean by validity acceptance; and by acceptance, arrival at the aim. And they understand that the aim of the fast is to be characterised by a trait among the traits of God — self-sufficiency — and to imitate the angels in restraining from appetites as far as possible." },
    ],
    closer: [
      { title: "Why this resolves what Book 4 left standing", body: "Book 4 argued that presence of heart is a condition of the prayer and let the tension with the ordinary rulings sit unresolved. Here the same question is answered by distinguishing two senses of one word: the jurists are not wrong about validity, and the hereafter-scholars are not talking about it. Both offices are legitimate and neither is the other's." },
      { title: "The remark about the evidences", body: "The concession is sharper than it looks. He is saying that his inward conditions rest on stronger evidence than some outward conditions do, and that the jurists nonetheless rightly decline to impose them — because an obligation is a thing the generality must be able to come under." },
    ],
    distinction: ["Two senses of a valid fast", "Discharged", "The obligation met, which is what the jurists rule on and what most people need.", "Accepted", "Arrival at the aim, which is what the scholars of the hereafter mean by the same word."],
    misreading: "Do not read this as dismissing the jurists. Ghazali gives their limitation a principled ground — that obligations must be within reach of the heedless generality — and it is a defence rather than a complaint.",
    reflection: "Notice that the same word was doing two jobs, and that the whole difficulty was in that.",
    audit: ["Which sense have I been using?", "Whose question am I asking?", "Is my fast discharged, or arrived?", "What would the other office say?"],
    nodes: ["sihha", "qabul", "fiqh"],
    model: pair("One word, two offices", "Neither is the other's business.", [["The jurists", "Validity as discharge, pitched at what the generality can come under.", "support"], ["The hereafter-scholars", "Validity as acceptance, meaning arrival at the aim.", "support"]]),
  }),
  makeChapter({
    id: 10, shortTitle: "Nearness by qualities", formalTitle: "The rank between the beasts and the angels",
    overview: "The argument that says what fasting is for, and it ends with a definition of nearness that reaches well past this book.",
    moves: [
      { title: "Place the human rank", body: "The human being's rank is above the rank of the beasts, by his power through the light of the intellect to break his appetite; and below the rank of the angels, because the appetites dominate him and he is tried with striving against them." },
      { title: "Give the movement", body: "So the more he plunges into appetites, the more he sinks to the lowest of the low and joins the throng of the beasts. And the more he suppresses them, the more he rises to the highest, and joins the horizon of the angels." },
      { title: "Give the conclusion", body: "And the angels are near to God; and whoever imitates them and resembles them in traits draws near to God as they are near — for the like of the near is near." },
      { title: "Define the nearness", body: "And nearness there is not by place but by qualities. The sentence settles what kind of thing the whole scheme has been describing." },
    ],
    closer: [
      { title: "Why the human rank is defined by a capacity", body: "Not by what a person is but by what he can do: break an appetite by the light of the intellect. That makes the position on the scale unfixed by nature, which is what allows the movement in both directions that the next sentence describes." },
      { title: "The trait being imitated", body: "The aim of the fast is to be characterised by a trait among the traits of God — self-sufficiency — and to imitate the angels, who are free of appetites. Fasting is therefore not a suppression aimed at nothing; it is the nearest a body can come to a quality that has no body in it." },
    ],
    distinction: ["Two ways to be near", "By qualities", "Resemblance in traits, which is what Ghazali says nearness consists in.", "By place", "Which the sentence explicitly denies, and which the imagery would otherwise suggest."],
    misreading: "Do not read the ladder as fixing anyone's position. It is defined by a capacity and describes movement in both directions, which is why it can be a scale at all.",
    reflection: "Ask what quality your fasting has actually been imitating.",
    audit: ["Which direction am I moving?", "What quality am I imitating?", "Do I think of nearness as place?", "What is my capacity for here?"],
    nodes: ["qurb", "malaika", "sawm"],
    model: spectrum("One scale, two directions", "The human position is a capacity, not a fixture.", [["The beasts", "Where plunging into appetites leads, and the lowest of the low.", "warning"], ["The human", "Able to break an appetite by the light of the intellect, and tried by them.", "balance"], ["The angels", "Free of appetites, near to God, and what imitation approaches.", "support"]]),
  }),
  makeChapter({
    id: 11, shortTitle: "Beyond Ramadan", formalTitle: "Voluntary fasting and its arrangement",
    overview: "The closing section, which sorts voluntary fasting by its cycles and closes the book on what is not required.",
    moves: [
      { title: "Give the principle", body: "The recommendation of fasting is confirmed at particular times, and the section sorts them rather than listing them." },
      { title: "Give the cycles", body: "Days that recur within the week, days that recur within the month, and days that recur within the year — the same cyclical sorting Book 4 uses for the supererogatory prayers." },
      { title: "Give the arrangement", body: "And the arrangement of litanies within the fast, so that a fasted day is shaped rather than merely endured." },
      { title: "Note the closing", body: "The book ends outside the obligation, as Book 4 does. A treatment that spent its length on three degrees and six duties finishes with days nobody has to keep at all." },
    ],
    closer: [
      { title: "Why the cycles matter here", body: "A voluntary fast with no cycle is an occasional exertion. Placed on a recurring rhythm it becomes a practice, and the whole of the second section — which is about what the day does to a person — presupposes that the day comes round again." },
      { title: "How this book ends", body: "Having argued that the aim of the fast is the imitation of a quality, closing on voluntary days is consistent: a quality is not acquired in a month once a year, and the section that follows the argument is the one that makes the argument practicable." },
    ],
    distinction: ["Two ways to fast beyond the obligation", "On a cycle", "Recurring within the week, the month, or the year, which makes it a practice.", "Occasionally", "An exertion when the impulse arrives, which nothing in the second section can act on."],
    misreading: "Do not read the closing section as an appendix. The argument of the second section is about the formation of a quality, which requires a recurrence that only this section supplies.",
    reflection: "Ask whether any of your fasting recurs, or whether all of it is annual.",
    audit: ["Which cycles do I keep?", "Is my fasting a practice or an exertion?", "Are my days shaped or endured?", "What does a quality require?"],
    nodes: ["tatawwu", "sawm", "structure"],
    model: chain("Three cycles", "What turns an exertion into a practice.", [["The week", "Days recurring within it.", "support"], ["The month", "Days recurring within it.", "support"], ["The year", "Days recurring within it, including the month itself.", "support"]]),
  }),
];

export const book06ConceptNodes: ConceptNode[] = [
  ["sawm", "The fast", "Three of them", "Distinguished by which organ is restrained, not by how strictly."],
  ["structure", "Three sections", "The middle one is the book", "The law is one section; the mysteries are the rest."],
  ["fiqh", "The jurists", "A principled limit", "Obligations must be within reach of the heedless generality."],
  ["daraja", "Degrees", "By organ", "Stomach, limbs, heart — a scale that cannot be flattered by difficulty."],
  ["jawarih", "The limbs", "The second degree", "Eye, tongue, ear, hand, foot: an ordinary fast by the whole body."],
  ["qalb", "The heart", "The third degree", "Restrained from everything other than God, and broken by planning a meal."],
  ["tawakkul", "Trust", "Where the fault sits", "Little certainty in the promised provision, which restraint does not reach."],
  ["basar", "The gaze", "Two scopes", "What is blamed, and what merely occupies — only the second requires judgement."],
  ["lisan", "The tongue", "Four of the five", "Lying, backbiting, tale-bearing, false swearing, and one that is not speech."],
  ["ghiba", "Backbiting", "Two ends", "The speaker and the listener are made partners in it."],
  ["sam", "The hearing", "Bound by the same rule", "Everything forbidden to say is forbidden to listen to."],
  ["sitta", "Six duties", "Completing the second degree", "Gaze, tongue, hearing, limbs, quantity, and the state after."],
  ["taqlil", "Reduction", "The mechanism", "Weakening the powers the devil works through, which gathering both meals defeats."],
  ["qadr", "The Night of Power", "Something disclosed", "Named for the night in which something of the Kingdom is unveiled."],
  ["khawf-raja", "Fear and hope", "Both, at the end", "The one place the Ihya fixes the answer in advance."],
  ["qabul", "Acceptance", "Arrival at the aim", "What the scholars of the hereafter mean when they say valid."],
  ["sihha", "Validity", "One word, two offices", "Discharge and acceptance, and neither is the other's business."],
  ["qurb", "Nearness", "By qualities", "Not by place — the sentence that settles what the scheme describes."],
  ["malaika", "The angels", "Free of appetites", "What the fast imitates, and why the aim is self-sufficiency."],
  ["tatawwu", "Voluntary fasting", "On cycles", "Week, month, and year, which turns an exertion into a practice."],
].map(([id, label, kicker, description], index) => ({ id, label, kicker, description, position: ["left", "right", "top", "bottom"][index % 4] }));

const node = (id: string, label: string, micro: string, summary: string, guardrail: string, chapterId: number, glyph: Journey["nodes"][number]["glyph"]): Journey["nodes"][number] => ({ id, label, micro, summary, guardrail, chapterId, glyph });

export const book06Journeys: Journey[] = [
  {
    id: "which-fast", number: "01", question: "Which fast am I actually keeping?", title: "Sort three fasts by organ",
    description: "Take the three degrees, find why grading by organ cannot be flattered, and meet the test that breaks the third — which turns out to be about trust rather than appetite.",
    payoff: "You can place your own fast on a scale that does not measure how hard the day felt.",
    image: assetUrl("assets/system/book06-three-degrees.jpg"), imageAlt: "Three plain earthenware bowls of the same size set in a row, the first empty, the second empty and covered, the third empty and turned face down.", minutes: 11, color: "#278d91",
    nodes: [
      node("by-organ", "Take the scheme", "Stomach, limbs, heart", "Each degree names a different organ and a different restraint.", "Not three intensities of one fast.", 2, "order"),
      node("cannot-flatter", "Note why it holds", "Difficulty is not the measure", "Either the tongue was restrained or it was not.", "A scale by intensity would let you place yourself by effort.", 2, "diagnose"),
      node("the-third", "Enter the third", "From all but God", "Broken by thinking of the world, except a world wanted for religion.", "Named as the rank of the prophets and the truthful.", 3, "know"),
      node("the-meal", "Take the sharp test", "Planning the evening meal", "A fault written, and traced to little trust in the promised provision.", "Attributed to the masters of hearts, at a named rank.", 3, "witness"),
      node("same-verse", "Note the verse", "Say God, then leave them", "The same verse Book 3 uses for the fourth rank of purification.", "Two things do not gather in one heart.", 3, "pattern"),
    ],
  },
  {
    id: "six-duties", number: "02", question: "What does the second degree require?", title: "Complete the fast of the limbs",
    description: "Work through six duties that specify an ordinary fast performed by the whole body, including the one that names the mechanism of the whole thing and the one that applies after it ends.",
    payoff: "You get a checkable specification, and the report that makes it unforgettable.",
    image: assetUrl("assets/system/book06-the-feedbag.jpg"), imageAlt: "A laden supper table set for one at dusk, every dish full and untouched, with a single empty plate at the near edge.", minutes: 13, color: "#bf7a35",
    nodes: [
      node("the-gaze", "Lower the gaze", "Two scopes", "What is blamed, and what merely occupies the heart.", "Only the second half makes this an inward condition.", 4, "clear"),
      node("the-five", "Take the five", "Four of them speech", "Lying, backbiting, tale-bearing, false swearing, and looking with desire.", "Reported as breaking the faster's fast.", 5, "know"),
      node("two-women", "Take the report", "Flesh and blood", "They fasted from the permitted and broke their fast on the forbidden.", "Its force is that their outward fast was exemplary.", 5, "witness"),
      node("the-listener", "Note the partner", "Both ends", "Everything forbidden to say is forbidden to listen to.", "An audience that will not receive it ends it.", 6, "balance"),
      node("the-gathering", "Catch the defeat", "Both meals in one", "Gathering the forenoon's meal to the night's leaves no benefit.", "The mechanism is weakening, and this restores the strength.", 7, "diagnose"),
      node("suspended", "End suspended", "Between fear and hope", "Relief and disappointment are both ruled out.", "And extended to the end of every act of worship.", 8, "steady"),
    ],
  },
  {
    id: "valid-or-accepted", number: "03", question: "So is a bare fast a real fast?", title: "Find the word doing two jobs",
    description: "Put the objection the whole quarter has been raising, and watch Ghazali answer it by distinguishing two offices — then follow the argument that says what the fast is for.",
    payoff: "You get the resolution Book 4 declined to give, and a definition of nearness that reaches past this book.",
    image: assetUrl("assets/system/book06-two-offices.jpg"), imageAlt: "Two identical ledgers open side by side on a desk, ruled differently, each with a single entry in a different hand.", minutes: 12, color: "#c25f50",
    nodes: [
      node("the-objection", "Put the objection", "The jurists say valid", "One who keeps only the stomach and abandons these meanings.", "Ghazali raises it himself rather than leaving it to the reader.", 9, "know"),
      node("the-concession", "Note the concession", "Weaker evidences", "The outward conditions rest on weaker evidence than these inward ones.", "Sharper than it looks, and offered before the defence.", 9, "witness"),
      node("the-defence", "Take the defence", "What the generality can bear", "Obligations must be within reach of the heedless who are turned to the world.", "A principled ground, not a complaint.", 9, "balance"),
      node("two-senses", "Separate the senses", "Discharge and arrival", "The jurists rule on one and the hereafter-scholars mean the other.", "Neither office is the other's business.", 9, "clear"),
      node("the-ladder", "Take the ladder", "Beasts, human, angels", "The human rank is a capacity, so movement runs both ways.", "Defined by what a person can do, not what he is.", 10, "pattern"),
      node("not-by-place", "Take the definition", "Nearness by qualities", "The like of the near is near, and nearness is not by place.", "Which settles what the whole scheme has been describing.", 10, "steady"),
    ],
  },
];

export const book06Movements: TaxonomyGroup[] = [
  ["fasl1", "1. The outward requirements", "The obligations, the customs, and what breaking the fast entails.", [1]],
  ["fasl2", "2. The mysteries of the fast", "Three degrees, six duties, the reconciliation of two senses of validity, and the ladder.", [2, 3, 4, 5, 6, 7, 8, 9, 10]],
  ["fasl3", "3. Voluntary fasting", "Sorted by cycle, and the arrangement of litanies within it.", [11]],
].map(([id, label, description, chapterIds], index) => ({ id, label, description, chapterIds, color: ["#bf7a35", "#278d91", "#c25f50"][index % 3] })) as TaxonomyGroup[];

export const book06Instrument: Instrument = {
  title: "Which degree, and what ended it",
  note: "Ghazali sorts fasting into three degrees by which organ is restrained, and gives a list of things reported to break the faster's fast that the first section's law says nothing about. Answer for a real day you fasted, not for the best one you remember.",
  items: [
    {
      id: "day", label: "One day you actually fasted", lede: "A recent one, obligatory or voluntary",
      note: "The first question is Ghazali's three degrees, which are graded by organ rather than by effort — so the answer does not depend on how hard the day was. The second is drawn from the six duties: the five things reported to break the fast, and the fifth duty about what happens at sunset.",
      axes: [
        {
          id: "degree", kicker: "The three degrees", question: "How far did the restraint reach?",
          options: [
            { id: "stomach", label: "The stomach and no further", note: "The fast of the generality, which is what the first section legislates in full." },
            { id: "limbs", label: "The limbs too — I watched what I did and said", note: "The fast of the select: eye, tongue, ear, hand, and foot restrained from sins." },
            { id: "heart", label: "My attention as well, most of the day", note: "The third degree, which Ghazali names as the rank of the prophets and the truthful." },
            { id: "broke", label: "I did not hold even the first", note: "In which case the first section, not the second, is what the day needs." },
          ],
        },
        {
          id: "what", kicker: "What ended it", question: "What, if anything, undid the day?",
          options: [
            { id: "tongue", label: "Something I said", note: "Four of the five reported to break the faster's fast are the tongue." },
            { id: "gaze", label: "Something I looked at", note: "The fifth of them, and the first of the six duties." },
            { id: "feast", label: "I ate at night what I had saved by day", note: "The fifth duty: gathering the forenoon's meal to the night's." },
            { id: "nothing", label: "Nothing I can name", note: "Which is a real answer, and the ninth section is what it needs." },
          ],
        },
      ],
      verdicts: [
        { key: "broke|*", name: "The first section, not the second", role: "balance", chapterId: 1, body: "The three degrees describe restraints, and the first of them was not kept. Nothing in the second section applies to a day that did not hold the fast of the generality, because each higher degree adds an organ rather than replacing one.", action: "The first section is the one that answers this: the obligations, and the four requirements attaching to a fast that has been broken. Whether anything is owed and what depends on how it was broken, which is a legal question and not one this edition can settle." },
        { key: "*|feast", name: "The mechanism was undone", role: "warning", chapterId: 7, body: "Ghazali names the mechanism plainly: the spirit of the fast and its secret is the weakening of the powers that are the devil's means for returning to evils, and that is obtained only by reducing. And he is blunt about this case — if he gathers what he used to eat in the forenoon to what he used to eat at night, he has not benefited from his fast.", action: "His measure is exact and modest: eat the meal you would have eaten that night had you not fasted. He adds two manners with it — do not sleep much through the day, so that the weakness is actually felt, and keep a measure of it each night so that the vigil and the litanies stay light." },
        { key: "*|tongue", name: "Four of the five", role: "warning", chapterId: 5, body: "Of the five things reported to break the faster's fast — lying, backbiting, tale-bearing, false swearing, and looking with desire — four are the tongue. Sufyan said backbiting spoils the fast, and Mujahid named backbiting and lying together.", action: "Read the report of the two women with this, because its force is precisely that their outward fast was exemplary: they were near collapse from hunger and thirst, and what they brought up was flesh and blood, because they had fasted from what God permitted and broken their fast on what He forbade. And note the instruction for provocation — say, I am fasting, I am fasting." },
        { key: "*|gaze", name: "The wider half of the duty", role: "balance", chapterId: 4, body: "The first of the six duties is lowering the gaze from everything blamed — and Ghazali adds a second clause that most readers skip: and from everything that occupies the heart and distracts from the remembrance of God. That half reaches things which are not blamed at all.", action: "The report he attaches gives an exchange rather than a deprivation: the glance is a poisoned arrow, and whoever leaves it out of fear of God is given a faith whose sweetness he finds in his heart. Book 4 treats the same organ the same way, and prescribes removing what is looked at rather than resisting it." },
        { key: "stomach|nothing", name: "Discharged, and the other question", role: "balance", chapterId: 9, body: "This is the case Ghazali raises himself: one who confines himself to the stomach and abandons these meanings — the jurists say his fast is valid. His answer is that the word is doing two jobs. The jurists rule on discharge, and rightly pitch obligations at what the heedless generality can come under.", action: "The other sense is the one this book is about: the scholars of the hereafter mean by validity acceptance, and by acceptance arrival at the aim. Nothing was owed beyond what you did — and the second degree is what the aim requires, which is a different question and not a rebuke." },
        { key: "heart|*", name: "The rank he declines to elaborate", role: "support", chapterId: 3, body: "The third degree is the fast of the heart from base concerns and worldly thoughts, and from everything other than God. Ghazali names it as the rank of the prophets and the truthful and says explicitly that its detail should not be lengthened in words but realised in act.", action: "The test he reports is the sharpest thing in the book, and it is worth holding rather than acting on: that whoever's aspiration moves during the day toward arranging what he will break his fast with has a fault written against him — not for indulgence but for little certainty in the promised provision. Note also his exception: a world wanted for religion is provision for the hereafter and is not of the world." },
        { key: "limbs|*", name: "The fast of the righteous", role: "support", chapterId: 6, body: "This is the second degree, which Ghazali calls the fast of the righteous — restraining the hearing, the sight, the tongue, the hand, the foot, and the rest of the limbs from sins. Its six duties specify it completely, and it is an ordinary fast performed by the whole body.", action: "Check the two that are easiest to miss. The ear is bound by the same rule as the tongue, since the one who backbites and the one who listens are partners; and the sixth duty is not about the day at all but about the moment after it, where both relief and disappointment are ruled out." },
        { key: "*|*", name: "Read the degree with what ended it", role: "balance", chapterId: 2, body: "A degree of restraint, and something that undid it. Ghazali's scheme grades by organ rather than by effort, which means the answer does not depend on how difficult the day was — and the six duties specify what the second degree actually requires.", action: "Take the degree as the placement and the cause as the work. And keep the ninth section in view whichever way it came out: the jurists' word for a fast and the hereafter-scholars' word for it are the same word doing two different jobs, and most of the distress about this question comes from running them together." },
      ],
    },
  ],
};

export const book06Sources: SourceLink[] = [
  { label: "Primary Arabic text", note: "The complete public Arabic of Book 6 was read and used to establish the three degrees of fasting, the six duties of the second degree, the reconciliation of two senses of validity, and the ladder between the beasts and the angels.", url: "https://shamela.ws/book/9472/230" },
  { label: "The outward requirements", note: "The section giving the obligations of the fast, the outward customs, and the four requirements attaching to breaking it.", url: "https://shamela.ws/book/9472/232" },
  { label: "The three degrees", note: "The passage sorting fasting into the fast of the generality, the fast of the select, and the fast of the select of the select, and saying what breaks each.", url: "https://shamela.ws/book/9472/234" },
  { label: "Validity and acceptance", note: "The passage answering the objection that the jurists call a bare fast valid, by distinguishing discharge from acceptance and giving each office its ground.", url: "https://shamela.ws/book/9472/236" },
  { label: "Voluntary fasting", note: "The section sorting voluntary fasting by its cycles and treating the arrangement of litanies within a fasted day.", url: "https://shamela.ws/book/9472/237" },
  { label: "Forty-book structure", note: "Ghazali.org's listing places Book 6 as the sixth book of the Quarter of Worship and confirms its title.", url: "https://www.ghazali.org/listing-the-forty-books/" },
];

export const book06: SystemBook = {
  id: 6,
  title: "The Mysteries of Fasting",
  shortTitle: "Fasting",
  defaultJourneyId: "which-fast",
  chapters: book06Chapters,
  conceptNodes: book06ConceptNodes,
  journeys: book06Journeys,
  sources: book06Sources,
  taxonomy: {
    title: "Three sections",
    note: "Ghazali's own three, in his order. This is the shortest book in the Quarter of Worship, and nine of its eleven reading sections belong to the middle one — which contains the three degrees, the six duties, and the clearest statement in the quarter of what the Ihya takes itself to be doing.",
    groups: book06Movements,
  },
  instrument: book06Instrument,
  editorialNote: "The three journeys, eleven reading sections, visual models, and diagnostic are editorial learning aids. The sections follow Ghazali's three in his order. The English is an original synthesis made from a reading of the public Arabic text, not a translation and not a substitute for one. Reports and inherited anecdotes are presented as material Ghazali transmitted; this prototype does not independently grade every narration, and the Arabic carries the graders' notes alongside several used here, including the report of the two women and the list of five things said to break the faster's fast. Two things should be stated. The first section is the legal apparatus of fasting — the obligations, the customs, what invalidates it, and what invalidation requires by way of expiation or making up. Those rulings vary between the schools of law and are not reproduced here; a reader who needs them should go to a work of law. And the statements that backbiting and lying break or spoil the fast are reported by Ghazali from Sufyan and Mujahid and from the reports he cites; they are not presented here as legal rulings, and his own ninth section is explicit that the jurists rightly do not treat them as conditions of validity in their sense of that word. That section is the key to the whole book and to much of the quarter: it distinguishes discharge from acceptance, gives each office a principled ground, and declines to subordinate either to the other. The diagnostic applies his three degrees and his own list to a day the reader supplies and cannot pronounce on anyone's state.",
};
