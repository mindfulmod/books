import { assetUrl } from "./assetUrl";
import type { Chapter, ConceptNode, VisualModel } from "./data";
import type { Instrument, Journey, SourceLink, SystemBook, TaxonomyGroup } from "./systemTypes";

type Seed = { id: number; shortTitle: string; formalTitle: string; overview: string; moves: Array<{ title: string; body: string }>; closer: Array<{ title: string; body: string }>; distinction: [string, string, string, string, string]; misreading: string; reflection: string; audit: string[]; nodes: string[]; model: VisualModel };
const part = (id: number) => (id <= 4 ? "the opening, on the ranks of purification" : id <= 8 ? "the first division, purity from filth" : "the remaining divisions of outward purity");
const makeChapter = (seed: Seed): Chapter => ({
  id: seed.id, shortTitle: seed.shortTitle, formalTitle: seed.formalTitle, overview: seed.overview,
  points: seed.moves.slice(0, 3).map((m) => m.body), reflection: seed.reflection, relatedNodes: seed.nodes, visualModel: seed.model,
  deep: { thesis: seed.moves[0].body, context: seed.overview, moves: seed.moves, closeReading: seed.closer,
    distinction: { title: seed.distinction[0], firstLabel: seed.distinction[1], first: seed.distinction[2], secondLabel: seed.distinction[3], second: seed.distinction[4] },
    misreading: seed.misreading, observation: seed.reflection, selfAudit: seed.audit,
    sourceAnchor: `Book 3, ${part(seed.id)}, ${seed.formalTitle}.` },
});
const chain = (title: string, caption: string, items: Array<[string, string, "support" | "balance" | "warning"]>): VisualModel => ({ kind: "chain", title, caption, items: items.map(([label, body, role]) => ({ label, body, role })) });
const pair = (title: string, caption: string, items: Array<[string, string, "support" | "balance" | "warning"]>): VisualModel => ({ kind: "pair", title, caption, items: items.map(([label, body, role]) => ({ label, body, role })) });
const spectrum = (title: string, caption: string, items: Array<[string, string, "support" | "balance" | "warning"]>): VisualModel => ({ kind: "spectrum", title, caption, items: items.map(([label, body, role]) => ({ label, body, role })) });

export const book03Chapters: Chapter[] = [
  makeChapter({
    id: 1, shortTitle: "How far-fetched", formalTitle: "The texts on cleanliness and what they are taken to mean",
    overview: "The book opens by stacking up the plainest possible texts about outward cleanliness and then drawing a conclusion about the inward, in a single sentence that sets the whole book's direction.",
    moves: [
      { title: "Stack the texts", body: "Religion was built on cleanliness. The key of prayer is purification. Purification is half of faith. In it are men who love to purify themselves, and God loves those who purify. God does not intend to place hardship on you, but intends to purify you." },
      { title: "Draw the conclusion", body: "So those of insight perceive, from these outward texts, that the most important of matters is the purification of the inmost." },
      { title: "State the alternative", body: "Since it is far-fetched that what is meant by his saying that purification is half of faith should be the cultivating of the outward by cleansing, by pouring water and casting it, while ruining the inward and leaving it stuffed with filths and impurities." },
      { title: "Give the word", body: "How far-fetched. The exclamation is the pivot of the book, and everything that follows is the working out of a scheme in which the outward is one rank among four." },
    ],
    closer: [
      { title: "Why the texts are stacked first", body: "The argument would be weak if the texts about water were downplayed. Ghazali does the opposite: he gathers the strongest outward statements he can find and then asks what reading of them a person of insight would arrive at, which makes the conclusion an inference from the texts rather than a qualification of them." },
      { title: "The image in the opening praise", body: "He praises God for having appointed water, distinguished by its fineness and subtlety, for the purifying of outward things, and having poured His lights upon hearts for the purifying of inmost things. The two purifications are given two agents from the first paragraph." },
    ],
    distinction: ["Two readings of one report", "The whole scheme", "Purification is half of the work at every rank, from the body to the inmost.", "The outward only", "Water and cleansing, with the inward left as it is, which Ghazali calls far-fetched."],
    misreading: "Do not read the opening as belittling outward purity. The book that follows is almost entirely about outward purity in technical detail, and the opening is establishing where it sits, not that it is unimportant.",
    reflection: "Notice that the strongest texts about water are gathered by someone about to argue that they are not only about water.",
    audit: ["What have I taken these texts to mean?", "Which purification do I actually attend to?", "Is my inward stuffed while my outward is washed?", "Does the outward matter less on this reading, or differently?"],
    nodes: ["tahara", "nazafa", "sirr"],
    model: pair("Two purifications, two agents", "Named together in the book's first paragraph.", [["Water", "Distinguished by fineness, appointed for the outward.", "support"], ["Lights", "Poured upon hearts, for the purifying of the inmost.", "support"]]),
  }),
  makeChapter({
    id: 2, shortTitle: "Four ranks", formalTitle: "The four ranks of purification",
    overview: "The passage the book is remembered for. Four ranks are given in a line each, and the last of them is named for who reaches it.",
    moves: [
      { title: "The first rank", body: "Purifying the outward from ritual impurity, from filth, and from the body's excesses. This is the rank the rest of the book treats in technical detail." },
      { title: "The second rank", body: "Purifying the limbs from crimes and sins." },
      { title: "The third rank", body: "Purifying the heart from blameworthy character traits and detested vices." },
      { title: "The fourth rank", body: "Purifying the inmost from everything other than God — and that is the purity of the prophets and of the truthful." },
    ],
    closer: [
      { title: "How the ranks map onto the Ihya", body: "The four are a table of contents for the whole work. The first is this book and the Quarter of Worship; the second is the Quarter of Custom; the third is the Quarter of Perils; and the fourth is where the Quarter of Deliverance arrives. The scheme is announced in the third book of forty." },
      { title: "Why the fourth is named by its holders", body: "The other three are named by what is removed. The fourth is named by whose purity it is, which marks it as a rank rather than a task — the same move Book 35 makes when it names the highest degree of unity and declines to detail its practice." },
    ],
    distinction: ["Two ways to describe a scale", "By what is removed", "Impurity, sins, vices — the first three ranks, each with a task attached.", "By who holds it", "The purity of the prophets and the truthful, which names a station rather than an exercise."],
    misreading: "Do not read the ranks as sequential stages to be completed in order. Ghazali's next chapter says each rank has its own halves, which means work at several ranks proceeds at once.",
    reflection: "Locate where your own attention to purity actually sits among the four.",
    audit: ["Which rank do I attend to?", "Which have I never considered a purity?", "What is being removed at my rank?", "Where does the Ihya put each of them?"],
    nodes: ["maratib", "tahara", "sirr"],
    model: spectrum("Four ranks", "The first three name what is removed; the fourth names who holds it.", [["The outward", "Ritual impurity, filth, and the body's excesses.", "balance"], ["The limbs", "Crimes and sins.", "balance"], ["The heart", "Blameworthy traits and detested vices.", "support"], ["The inmost", "Everything other than God; the purity of the prophets and the truthful.", "support"]]),
  }),
  makeChapter({
    id: 3, shortTitle: "Half at every rank", formalTitle: "Why purification is half of the work",
    overview: "The structural principle, and it is what turns a list of four ranks into a system. One report is read as holding at all four levels in the same way.",
    moves: [
      { title: "State the principle", body: "And purification at every rank is half of the work that belongs to that rank. The report about half of faith is read as a general structure rather than as a statement about ablution." },
      { title: "Apply it to the heart", body: "The utmost end in the work of the heart is its cultivation with praiseworthy traits and sound beliefs — and it will not be characterised by them until it has been cleaned of their contraries, of corrupt beliefs and detested vices." },
      { title: "Name the relation", body: "So its purification is one of the two halves, and it is the first half, which is a condition of the second. Purification is half of faith in this sense." },
      { title: "Apply it to the limbs and the inmost", body: "Likewise purifying the limbs from what is forbidden is the first half and cultivating them with acts of obedience is the second. And the knowledge of God will never settle in the inmost so long as what is other than God has not departed from it, for the two do not gather in one heart." },
    ],
    closer: [
      { title: "Why condition rather than sequence", body: "Ghazali's word is that the first half is a condition of the second, not that it must be finished before the second begins. A condition can be worked at alongside what it conditions, which is why the ranks do not have to be completed in order." },
      { title: "The verse he uses for the fourth", body: "Say: God — then leave them in their plunging, playing. And: God has not made for a man two hearts in his interior. At the highest rank the principle stops being about priority and becomes about capacity: there is only one place, and two things cannot occupy it." },
    ],
    distinction: ["Two halves at every rank", "Clearing", "Removing what should not be there, which is a condition of the other half.", "Filling", "Cultivating what should be there, which cannot take hold while the contrary is present."],
    misreading: "Do not conclude that nothing may be cultivated until everything is cleared. A condition is not a sequence, and the Ihya prescribes acts of obedience to people whose hearts it also says need work.",
    reflection: "Take one rank and ask which half you have been spending your effort on.",
    audit: ["Am I clearing or filling?", "At which rank?", "What contrary is occupying the place?", "Have I read a condition as a sequence?"],
    nodes: ["shatran", "maratib", "qalb"],
    model: pair("The structure at every rank", "The first is a condition of the second, at all four.", [["The first half", "Clearing away the contrary, which conditions what follows.", "support"], ["The second half", "Cultivating what belongs there, which cannot hold while the contrary remains.", "support"]]),
  }),
  makeChapter({
    id: 4, shortTitle: "A declared limit", formalTitle: "What this book will and will not treat",
    overview: "One of the frankest authorial statements in the Ihya. Having set out four ranks, Ghazali says which one he is about to spend the book on, and why.",
    moves: [
      { title: "Declare the scope", body: "Know that in this book we do not speak except of the rank that is the cleanliness of the outward." },
      { title: "Give the reason", body: "Because in the first half of the work we do not deliberately address ourselves to anything but outward things. The limitation is a property of where the book sits in the Ihya rather than a judgement about the subject." },
      { title: "Divide what remains", body: "So we say: purity of the outward is three divisions — purity from filth, purity from ritual impurity, and purity from the body's excesses, which is obtained by paring, shaving, the use of depilatory, circumcision, and the like." },
      { title: "Note the effect of the declaration", body: "The reader has been given a scheme in which this book's subject is the lowest of four ranks, and then told that this book treats only that. Everything technical that follows is read inside that frame." },
    ],
    closer: [
      { title: "Why saying so matters", body: "A book of ritual detail that opened with four ranks and then simply proceeded would leave the reader to guess whether the higher ranks had been forgotten. Naming the limit converts the technical remainder from an omission into a deliberate scope, and points forward to the quarters where the other three are treated." },
      { title: "The third division", body: "Purity from the body's excesses is the least discussed of the three and is where the book ends, covering nails, hair, and the rest. It is included because the first rank was defined to include it, which is a small instance of the whole book's method: the scheme is set first and then honoured." },
    ],
    distinction: ["Two ways a book can be narrow", "Declared", "The scope named, with the reason and the location of what is excluded.", "Undeclared", "The same content, leaving the reader to infer whether anything was forgotten."],
    misreading: "Do not read the declaration as an apology. Ghazali treats the first rank at length and with care, and the point of naming it is to place it, not to excuse it.",
    reflection: "Notice how differently technical material reads once you have been told exactly what it is a part of.",
    audit: ["Do I know what part of the scheme I am in?", "What has been deliberately excluded?", "Where is the rest treated?", "Have I read a scope as an apology?"],
    nodes: ["maratib", "zahir", "structure"],
    model: chain("Three divisions of the first rank", "Set out after the scope is declared.", [["From filth", "The substances, what removes them, and how.", "support"], ["From ritual impurity", "Ablution and bathing.", "support"], ["From the body's excesses", "Paring, shaving, and the rest.", "balance"]]),
  }),
  makeChapter({
    id: 5, shortTitle: "What is removed", formalTitle: "The substances that purity is from",
    overview: "The technical treatment begins, and it is organised by three questions: what is removed, what removes it, and how the removal is done.",
    moves: [
      { title: "Set the three questions", body: "Inquiry into purity from filth concerns the thing removed, the thing it is removed by, and the removal itself. Every technical question in the division falls under one of the three." },
      { title: "Sort the substances", body: "The thing removed is impurity, and the substances are three: inanimate things, animals, and parts of animals. Each is then treated in turn." },
      { title: "Note the method", body: "The sorting is by kind of substance rather than by degree of severity, which keeps the rulings general and prevents the treatment from becoming a list of cases." },
      { title: "Place the section", body: "This is the most purely juristic material in the Ihya's opening quarter, and Ghazali gives it plainly, without the analysis of inward states that characterises the rest of the work." },
    ],
    closer: [
      { title: "Why three questions rather than a list", body: "A list of impure things and their remedies grows without limit and answers only the cases it contains. Three questions — what, by what, how — cover any case, including ones not anticipated, which is why the structure is set before any substance is named." },
      { title: "What this edition does with the detail", body: "The rulings themselves are the substance of a legal manual and are given fully in the text. This section presents how the division is organised rather than reproducing its cases, and a reader wanting the rulings should go to the text or to a work of law." },
    ],
    distinction: ["Two ways to treat purity from filth", "By three questions", "What, by what, and how — which covers unanticipated cases.", "By a list of cases", "Which answers only what it contains and grows without limit."],
    misreading: "Do not take this edition's brevity here as a judgement on the material. It is technical law, treated fully in the text, and the reason it is summarised here is that summarising is all a reading edition can honestly do with it.",
    reflection: "Notice that the structure is fixed before any particular ruling is given.",
    audit: ["Which of the three is my question?", "Am I looking for a case or a rule?", "Where would I go for the detail?", "What does the structure cover that a list would not?"],
    nodes: ["khabath", "fiqh", "zahir"],
    model: chain("Three questions", "Set before any substance is named.", [["What is removed", "Impurity: inanimate things, animals, and parts of animals.", "support"], ["What removes it", "Solid and liquid, treated in the next section.", "support"], ["How it is removed", "The manner, treated in the one after.", "support"]]),
  }),
  makeChapter({
    id: 6, shortTitle: "Mecca and Medina", formalTitle: "Against strictness about water",
    overview: "The sharpest argument in the book, and it is a historical one. Ghazali argues that a strict standard for water cannot be right, and gives four independent reasons.",
    moves: [
      { title: "Give the reductio", body: "What I do not doubt is that if that were a condition, the places most liable to difficulty in purification would be Mecca and Medina — since neither running waters nor large standing waters are abundant in them." },
      { title: "The first evidence", body: "From the first age of the Messenger to the end of the age of his Companions, not one incident concerning purification is reported, nor any question about how water is to be guarded from impurities. And their water vessels were handled by children and servants who did not guard against impurities." },
      { title: "The second evidence", body: "Umar performed ablution with water in a Christian woman's jar. This is virtually explicit that he relied on nothing but the water's not having changed — otherwise the impurity of the woman and of her vessel would be predominant and known by a near probability." },
      { title: "The third and fourth", body: "The Messenger tilted the vessel for the cat and did not cover vessels against it, after seeing that it eats mice. And al-Shafi'i held that the washing-water of an impurity is pure if it has not changed and impure if it has — so what difference is there between water meeting an impurity and an impurity meeting water?" },
    ],
    closer: [
      { title: "The argument from silence", body: "The first evidence is the strongest and the most unusual: an entire generation living in the conditions being legislated for, and no record of the question ever arising. Ghazali treats the absence of a recorded controversy as evidence that no controversy existed, which is a genuinely historical form of argument." },
      { title: "The criterion that survives", body: "What all four evidences converge on is a single test: whether the water has changed. Everything else — the source, the vessel, who handled it, what may have touched it — falls away, which is what makes this a treatment of scrupulosity and not only a ruling about water." },
    ],
    distinction: ["Two tests for water", "Has it changed", "One observable property, which is what all four evidences converge on.", "What has touched it", "A question about history that has no end, and that the first evidence says was never asked."],
    misreading: "Do not read this as indifference to purity. It is an argument about which test is the right one, made by someone writing a technical treatise on the subject, and the test he defends is a real test that some water fails.",
    reflection: "Notice that the argument's strongest evidence is that nobody in the first generation ever asked the question.",
    audit: ["What test am I applying?", "Is it observable, or historical?", "Did anyone ask this in the first age?", "Where does my scruple actually end?"],
    nodes: ["waswas", "ma", "khabath"],
    model: chain("Four evidences, one criterion", "They converge on a single observable test.", [["No question was asked", "Not one incident reported in the first two ages.", "support"], ["Umar's ablution", "Water from a Christian woman's jar.", "support"], ["The cat", "The vessel tilted for it, and vessels left uncovered.", "support"], ["The washing-water", "Pure if unchanged, impure if changed — so direction cannot matter.", "support"]]),
  }),
  makeChapter({
    id: 7, shortTitle: "By what, and how", formalTitle: "What removes impurity and the manner of removal",
    overview: "The second and third of the three questions, and the second contains a distinction that keeps the whole division workable.",
    moves: [
      { title: "Sort the removers", body: "What impurity is removed by is either solid or liquid. Of the solid, there is the stone used in cleansing, which purifies in a particular way; of the liquid, water is the general case." },
      { title: "Divide the impurity for the third question", body: "If the impurity is one of ruling — meaning it has no perceptible substance — then pouring water over it suffices." },
      { title: "Note what the distinction does", body: "It separates an impurity that is present as a legal attribute from one present as a physical thing, and gives each its own remedy. Without the distinction, every case would need a physical removal that in many cases has nothing to remove." },
      { title: "Place it in the book", body: "This is the last of the three questions of the first division, after which the book turns to the etiquette of the body and then to ablution and bathing." },
    ],
    closer: [
      { title: "Why the distinction matters practically", body: "A great deal of scrupulosity consists in scrubbing at what is not there. Separating an impurity of ruling from one of substance means that in the first case the question of whether it has been fully removed does not arise, because there was never a body to remove." },
      { title: "Its relation to the previous chapter", body: "The argument against strictness about water and this distinction do the same work by different routes: one removes an unanswerable historical question, the other removes an unanswerable physical one. Both leave a test that can actually be completed." },
    ],
    distinction: ["Two kinds of impurity", "Of ruling", "No perceptible substance; pouring water over it suffices and the question of residue does not arise.", "Of substance", "A physical thing present, whose removal can be checked."],
    misreading: "Do not treat the lighter treatment of the first kind as leniency. It follows from what the impurity is, and applying the second kind's standard to it is a category error rather than extra care.",
    reflection: "Ask whether the thing you are trying to remove is a substance or a ruling.",
    audit: ["Which kind am I dealing with?", "Is there anything physically there?", "Can my test be completed?", "Am I scrubbing at a ruling?"],
    nodes: ["khabath", "waswas", "fiqh"],
    model: pair("Two kinds, two remedies", "Applying the wrong one produces an endless task.", [["Of ruling", "No body to remove; pouring water suffices.", "support"], ["Of substance", "A physical thing, whose removal can be verified.", "balance"]]),
  }),
  makeChapter({
    id: 8, shortTitle: "Out of sight", formalTitle: "The etiquette of relieving oneself",
    overview: "A short chapter of practical manners, and its opening instruction sets the register for the whole: the concern is other people before it is anything else.",
    moves: [
      { title: "The first instruction", body: "He should go far from the eyes of those who might look, when in open country, and should screen himself with something if he finds it." },
      { title: "Note what comes first", body: "The chapter's opening concern is being seen, which places the etiquette in the domain of how a person is among others rather than in the domain of ritual validity." },
      { title: "What the chapter covers", body: "It runs through the manners of the occasion in practical detail — where to go, how to be screened, what to say, and how to conduct oneself — and none of it is ritually required in the way the preceding material is." },
      { title: "Why it is in a book on purification", body: "Because the first rank was defined as the outward, and the outward includes how a body is conducted and not only whether it is clean. The scope declared in Chapter 4 is being honoured." },
    ],
    closer: [
      { title: "The register of the Quarter of Worship", body: "Books in this quarter routinely mix what is legally required with what is merely well-mannered, and Ghazali does not always separate them. Reading them as though everything carried the same weight is the commonest mistake with this quarter." },
      { title: "Why this edition keeps it short", body: "The material is practical instruction, complete in itself and not argued. Presenting what it is and where it sits is what a reading edition can add; the instructions themselves belong to the text." },
    ],
    distinction: ["Two kinds of instruction in this quarter", "Required", "What bears on the validity of an act, and which the preceding chapters treat.", "Well-mannered", "What is fitting, which this chapter treats, and which Ghazali does not always mark off."],
    misreading: "Do not read everything in the Quarter of Worship as carrying equal weight. Much of it is manners, and treating manners as requirements is what produces the scrupulosity the sixth chapter argues against.",
    reflection: "Notice that the first concern named is other people's eyes.",
    audit: ["Am I treating manners as requirements?", "What does this chapter's first line concern?", "Where would I check the weight of a rule?", "Which of my practices are which?"],
    nodes: ["adab", "zahir", "waswas"],
    model: pair("Two weights in one quarter", "Ghazali does not always mark the difference.", [["Required", "Bearing on validity, and treated by the preceding division.", "balance"], ["Fitting", "Manners, which this chapter gives, and which are not the same thing.", "support"]]),
  }),
  makeChapter({
    id: 9, shortTitle: "Ablution", formalTitle: "The manner of ablution and its excellence",
    overview: "The second of the three outward purities, treated first as a procedure and then for what is reported of its worth.",
    moves: [
      { title: "Give the procedure", body: "The chapter sets out the manner of ablution in order, part by part, including the reaching of water to the roots of the hair at the four places — the eyebrows, the moustache, the eyelashes, and the rest." },
      { title: "Note the level of detail", body: "The detail is finer than anything in the book so far, down to the corner of the forehead, which is a mark of how much of the first rank's technical weight sits here." },
      { title: "Give the excellence", body: "A separate section gathers what is reported on the excellence of ablution, after the procedure rather than before it." },
      { title: "Note the order", body: "Procedure first and merit second is the reverse of the order used everywhere else in the Ihya, where the excellence of a thing is gathered before it is defined." },
    ],
    closer: [
      { title: "Why the order is reversed here", body: "Elsewhere the testimony establishes that something is worth examining. Here nobody doubts it, and what a reader needs is the act itself; the merit is added afterward as encouragement to do properly what he now knows how to do." },
      { title: "How this connects to the opening", body: "Ablution is the clearest case of the thing the opening chapter warned about — an outward act, precisely specified, easy to perfect, and capable of being done exactly while the third rank is untouched. The book's frame is doing its work most where the detail is finest." },
    ],
    distinction: ["Two orders of presentation", "Procedure, then merit", "Used here, where nobody doubts the act's worth and needs to know how it is done.", "Merit, then definition", "Used throughout the rest of the Ihya, where the testimony has to establish that the subject repays study."],
    misreading: "Do not read the fineness of the detail as the book contradicting its own opening. The opening said the outward is one rank of four, not that it should be done carelessly.",
    reflection: "Notice that this is the easiest rank to perfect, and ask what that does to a person who perfects it.",
    audit: ["Which rank am I most exact about?", "Why that one?", "Does exactness here reach anywhere else?", "What does the opening say about this?"],
    nodes: ["wudu", "zahir", "maratib"],
    model: pair("The order in this chapter", "Reversed from the rest of the Ihya, and for a reason.", [["Procedure", "Given first, in the finest detail in the book.", "support"], ["Excellence", "Gathered after, as encouragement rather than as justification.", "balance"]]),
  }),
  makeChapter({
    id: 10, shortTitle: "Bathing", formalTitle: "The manner of the full washing",
    overview: "The completion of the second outward purity, treated in the same procedural register as the chapter before it.",
    moves: [
      { title: "Give the procedure", body: "The chapter sets out the manner of the full washing, in the same order-by-part method used for ablution." },
      { title: "Note its place", body: "It completes purity from ritual impurity, which is the second of the three divisions of outward purity named when the scope was declared." },
      { title: "Note what remains", body: "One division remains after it — purity from the body's excesses — which is the third and shortest, and which closes the book." },
      { title: "Observe the shape", body: "The book therefore descends steadily: four ranks, then one rank, then three divisions of that rank, then the parts of each. It is the most tightly nested structure in the opening quarter." },
    ],
    closer: [
      { title: "What the nesting achieves", body: "Every technical instruction in the book can be traced upward through three levels to a place in a scheme that ends at the purity of the prophets. Nothing is free-floating, which is the difference between this book and a manual covering the same ground." },
      { title: "The register throughout", body: "Ghazali gives none of this material grudgingly. The frame set in the opening chapters places the outward without diminishing it, and the care in the procedural chapters is the practical evidence that placing is not the same as belittling." },
    ],
    distinction: ["Two ways to give ritual detail", "Nested in a scheme", "Every instruction traceable upward to a rank and a purpose.", "Free-standing", "The same instructions, complete and correct, with nothing above them."],
    misreading: "Do not conclude that the nesting makes the detail optional. The scheme places the first rank and the book then treats it in full, which is the opposite of making it dispensable.",
    reflection: "Trace one instruction from this chapter upward through the levels to the fourth rank.",
    audit: ["Can I trace this instruction upward?", "What rank is it serving?", "Which half of that rank?", "Does the scheme change how I do it?"],
    nodes: ["ghusl", "hadath", "maratib"],
    model: chain("Four levels of nesting", "Every instruction sits at the bottom of this.", [["Four ranks", "Outward, limbs, heart, inmost.", "support"], ["One rank", "The outward, declared as this book's scope.", "support"], ["Three divisions", "Filth, ritual impurity, and the body's excesses.", "support"], ["The parts", "The procedural detail, traceable all the way up.", "balance"]]),
  }),
  makeChapter({
    id: 11, shortTitle: "The body's excesses", formalTitle: "Cleaning from what the body produces",
    overview: "The third division and the book's close: nails, hair, and the rest, sorted by whether they are secreted or grown.",
    moves: [
      { title: "Name the division", body: "The third division of cleanliness is cleaning from the outward excesses — that which is obtained by paring, shaving, the use of depilatory, circumcision, and the like." },
      { title: "The first kind", body: "Dirt and the moistures that are secreted, which the body produces continuously and which are removed by washing." },
      { title: "The second kind", body: "What arises in the body as parts of it — hair and nails — which are removed by cutting rather than by washing." },
      { title: "Note the sorting", body: "The two kinds are separated by how they arise, which determines how they are dealt with; the same method as the distinction between impurity of ruling and of substance." },
    ],
    closer: [
      { title: "Why this closes the book", body: "It is the least ritually weighty of the three divisions and the most continuous: the body produces these things without pause, and the attention they require has no end point. Closing here leaves the reader with the most ordinary and most repetitive form of the first rank." },
      { title: "The whole book in one line", body: "A work that opened by declaring the purification of the inmost to be the most important of matters ends on the paring of nails, having said exactly why both belong in it. That juxtaposition is the book's argument rather than an awkwardness in it." },
    ],
    distinction: ["Two kinds of bodily excess", "Secreted", "Dirt and moisture produced continuously, removed by washing.", "Grown", "Hair and nails, which are parts of the body and are removed by cutting."],
    misreading: "Do not read the book's ending on this material as anticlimax. Ghazali declared in Chapter 4 that the whole book would treat only the outward, and finishing at the most ordinary end of it is consistent rather than deflating.",
    reflection: "Read the book's first sentence and its last subject together. Both are deliberate.",
    audit: ["Do the two ends of this book sit together for me?", "Which kind of excess is this?", "Has my attention here an end point?", "What did the opening chapter say this rank was?"],
    nodes: ["fadalat", "zahir", "tahara"],
    model: pair("Sorted by how they arise", "Which determines how they are dealt with.", [["Secreted", "Continuous, and removed by washing.", "balance"], ["Grown", "Parts of the body, and removed by cutting.", "balance"]]),
  }),
];

export const book03ConceptNodes: ConceptNode[] = [
  ["tahara", "Purification", "Four ranks", "One word covering the body, the limbs, the heart, and the inmost."],
  ["nazafa", "Cleanliness", "The texts", "Gathered at their strongest, and then read as pointing past the outward."],
  ["sirr", "The inmost", "The fourth rank", "Purified of all but God; named as the purity of the prophets and the truthful."],
  ["maratib", "The ranks", "A table of contents", "The four map onto the four quarters of the Ihya."],
  ["shatran", "Two halves", "At every rank", "Clearing is the first half and a condition of the second."],
  ["qalb", "The heart", "The third rank", "Cultivated with praiseworthy traits only after its contraries are cleaned out."],
  ["zahir", "The outward", "The declared scope", "The only rank this book treats, and Ghazali says so explicitly."],
  ["structure", "The nesting", "Four levels deep", "Ranks, then a rank, then divisions, then parts."],
  ["khabath", "Filth", "The first division", "Treated by three questions: what, by what, and how."],
  ["fiqh", "Legal detail", "Given plainly", "The most purely juristic material in the opening quarter."],
  ["ma", "Water", "One criterion", "Whether it has changed, and nothing about what may have touched it."],
  ["waswas", "Scrupulosity", "What the arguments dissolve", "Tests that cannot be completed, replaced by one that can."],
  ["adab", "Manners", "Not requirements", "Much of this quarter is fitting rather than required, and is not always marked."],
  ["wudu", "Ablution", "The finest detail", "The easiest rank to perfect, which is what the opening chapter warned about."],
  ["ghusl", "The full washing", "Completing the second", "The second of the three divisions of outward purity."],
  ["hadath", "Ritual impurity", "A state, not a substance", "Removed by ablution and washing rather than by cleaning."],
  ["fadalat", "The body's excesses", "The third division", "Secreted or grown, and dealt with accordingly."],
].map(([id, label, kicker, description], index) => ({ id, label, kicker, description, position: ["left", "right", "top", "bottom"][index % 4] }));

const node = (id: string, label: string, micro: string, summary: string, guardrail: string, chapterId: number, glyph: Journey["nodes"][number]["glyph"]): Journey["nodes"][number] => ({ id, label, micro, summary, guardrail, chapterId, glyph });

export const book03Journeys: Journey[] = [
  {
    id: "four-ranks", number: "01", question: "Purity of what, exactly?", title: "Climb the four ranks",
    description: "Watch the strongest texts about water produce a conclusion about the inmost, take the four ranks, and get the structural principle that makes them a system rather than a list.",
    payoff: "You get a scheme that turns out to be a table of contents for the whole Ihya.",
    image: assetUrl("assets/system/book03-four-ranks.jpg"), imageAlt: "Four shallow stone basins set at rising heights on a plain wall, the lowest holding clear water and the highest empty and dry.", minutes: 12, color: "#278d91",
    nodes: [
      node("stack-texts", "Stack the texts", "At their strongest", "Religion built on cleanliness; purification half of faith.", "The argument would be weak if these were downplayed.", 1, "know"),
      node("how-farfetched", "Take the pivot", "How far-fetched", "That this should mean washing while the inward is left stuffed.", "Not a claim that outward purity is unimportant.", 1, "clear"),
      node("the-four", "Take the four ranks", "Body, limbs, heart, inmost", "The last is named as the purity of the prophets and the truthful.", "Not sequential stages to be completed in order.", 2, "order"),
      node("half-at-each", "Take the principle", "Half at every rank", "Clearing is the first half and a condition of the second.", "A condition is not a sequence.", 3, "pattern"),
      node("two-hearts", "Reach the fourth", "One place only", "God has not made for a man two hearts in his interior.", "At the top the principle becomes about capacity.", 3, "witness"),
      node("the-map", "See the map", "Four quarters", "The ranks correspond to the four quarters of the Ihya.", "Announced in the third book of forty.", 2, "steady"),
    ],
  },
  {
    id: "why-so-technical", number: "02", question: "Why is the rest of this book so technical?", title: "Read the declared scope",
    description: "Find Ghazali stating exactly which rank this book treats and why, then follow the three divisions of it and the three questions that organise the first.",
    payoff: "You learn how to read the whole Quarter of Worship: as one declared rank, treated in full, with the rest located elsewhere.",
    image: assetUrl("assets/system/book03-declared-scope.jpg"), imageAlt: "A plain stone tablet leaning against a wall with a single horizontal line scored across its lower third.", minutes: 11, color: "#bf7a35",
    nodes: [
      node("the-scope", "Take the declaration", "Only the outward", "Because the first half of the work addresses outward things.", "A statement of location, not an apology.", 4, "order"),
      node("three-divisions", "Take the three", "Filth, impurity, excesses", "The divisions of the one rank this book treats.", "Set out immediately after the scope is named.", 4, "pattern"),
      node("three-questions", "Take the three questions", "What, by what, how", "Which covers cases a list of rulings would not.", "The structure is fixed before any substance is named.", 5, "know"),
      node("nested", "See the nesting", "Four levels", "Every instruction traceable upward to a rank and a purpose.", "The difference between this and a manual.", 10, "steady"),
      node("weights", "Watch the weights", "Required or fitting", "Much of this quarter is manners, and it is not always marked.", "Treating manners as requirements produces scrupulosity.", 8, "guard"),
    ],
  },
  {
    id: "how-strict", number: "03", question: "How strict does this actually have to be?", title: "Take four evidences against scruple",
    description: "Follow the sharpest argument in the book — a historical one — to a single observable test, and take the distinction that stops a person scrubbing at what is not there.",
    payoff: "You get a test that can actually be completed, and the reasoning that gets you there.",
    image: assetUrl("assets/system/book03-unchanged-water.jpg"), imageAlt: "A plain earthenware jar of clear water on a doorstep in strong daylight, entirely still and unattended.", minutes: 12, color: "#c25f50",
    nodes: [
      node("the-reductio", "Take the reductio", "Mecca and Medina", "The strict standard would make purity hardest exactly there.", "Ghazali says he does not doubt this.", 6, "clear"),
      node("no-question", "Take the silence", "Nobody asked", "Not one incident or question reported in the first two ages.", "A genuinely historical form of argument.", 6, "witness"),
      node("umars-jar", "Take Umar's jar", "A Christian woman's vessel", "Virtually explicit that he relied on the water not having changed.", "The alternative would have made it obviously unusable.", 6, "know"),
      node("one-test", "Take the criterion", "Has it changed", "Everything about what may have touched it falls away.", "A real test, which some water fails.", 6, "diagnose"),
      node("ruling-or-substance", "Separate the kinds", "A ruling or a body", "Where there is no substance, there is nothing to check for residue.", "Applying the wrong standard is a category error.", 7, "pattern"),
      node("completable", "See what both do", "End the endless", "One removes an unanswerable history, the other an unanswerable physics.", "Both leave a test that can be finished.", 7, "steady"),
    ],
  },
  {
    id: "the-easiest-rank", number: "04", question: "What happens to someone who perfects the outward?", title: "Watch the frame do its work",
    description: "Read the most finely detailed chapters in the book alongside the warning that opened it, and see why Ghazali gives the detail generously rather than grudgingly.",
    payoff: "You see the difference between placing something and belittling it.",
    image: assetUrl("assets/system/book03-the-parings.jpg"), imageAlt: "A washed pale bowl upturned on a cloth beside a small pair of shears and a folded towel, everything spotless.", minutes: 11, color: "#586fa8",
    nodes: [
      node("the-detail", "Note the detail", "Down to the eyelashes", "The finest technical instruction in the book is here.", "A mark of where the first rank's weight sits.", 9, "witness"),
      node("reversed-order", "Note the order", "Procedure, then merit", "The reverse of the rest of the Ihya, and for a reason.", "Nobody doubts this act is worth doing.", 9, "pattern"),
      node("easiest", "Ask the question", "Easiest to perfect", "An outward act, precisely specified, capable of being done exactly.", "And capable of being done exactly while the third rank is untouched.", 9, "diagnose"),
      node("generously", "Note the register", "Given generously", "Nothing here is grudging; placing is not belittling.", "The care in these chapters is the practical evidence.", 10, "balance"),
      node("the-ending", "Read the ending", "Nails and hair", "A book that began on the inmost ends on paring.", "Consistent with the scope declared in Chapter 4.", 11, "steady"),
    ],
  },
];

export const book03Movements: TaxonomyGroup[] = [
  ["muqaddima", "The opening: the ranks of purification", "The texts, the four ranks, the halves, and the declared scope.", [1, 2, 3, 4]],
  ["khabath", "The first division: purity from filth", "What is removed, by what, and how — with the argument against strictness.", [5, 6, 7]],
  ["adab", "The etiquette of the body", "Manners rather than requirements, and the difference.", [8]],
  ["hadath", "The second division: purity from ritual impurity", "Ablution and the full washing.", [9, 10]],
  ["fadalat", "The third division: the body's excesses", "Secreted and grown, and how each is dealt with.", [11]],
].map(([id, label, description, chapterIds], index) => ({ id, label, description, chapterIds, color: ["#bf7a35", "#278d91", "#c25f50", "#586fa8", "#a97837"][index % 5] })) as TaxonomyGroup[];

export const book03Instrument: Instrument = {
  title: "Which rank, and which half",
  note: "Ghazali gives four ranks of purification — the body, the limbs, the heart, and the inmost — and says that at every one of them, clearing away what does not belong is half the work and is a condition of the other half. Answer for where your attention actually goes, not for where you think it should.",
  items: [
    {
      id: "rank", label: "Where your attention actually is", lede: "Over the last month, not in principle",
      note: "Both questions are Ghazali's. The four ranks are his, in his order, and the two halves are his reading of the report that purification is half of faith — a reading he applies identically at all four levels. One combination is the one this book was written to catch.",
      axes: [
        {
          id: "rank", kicker: "The four ranks", question: "Which purity have you actually been attending to?",
          options: [
            { id: "outward", label: "The body — cleanliness and ritual purity", note: "The first rank, and the only one this book treats." },
            { id: "limbs", label: "My acts — what I do and avoid doing", note: "The second rank: purifying the limbs from crimes and sins." },
            { id: "heart", label: "My character — traits and dispositions", note: "The third rank, and the subject of the Quarter of Perils." },
            { id: "inmost", label: "What occupies me — what I am full of", note: "The fourth rank, which he names as the purity of the prophets and the truthful." },
          ],
        },
        {
          id: "half", kicker: "The two halves", question: "And which half of the work have you been doing?",
          options: [
            { id: "clear", label: "Clearing away what should not be there", note: "The first half, which Ghazali says is a condition of the second." },
            { id: "fill", label: "Cultivating what should be there", note: "The second half, which cannot take hold while the contrary is present." },
            { id: "both", label: "Both, more or less together", note: "Which his own wording permits: a condition need not be finished first." },
            { id: "maintain", label: "Neither — I am just keeping things as they are", note: "The honest answer for most settled practice." },
          ],
        },
      ],
      verdicts: [
        { key: "inmost|*", name: "The rank he names by its holders", role: "support", chapterId: 2, body: "Three of Ghazali's ranks are named by what is removed from them. The fourth he names differently: purifying the inmost of everything other than God, and that is the purity of the prophets and of the truthful. It is described as a station rather than set as a task.", action: "His principle at this rank stops being about priority and becomes about capacity: the knowledge of God will not settle in the inmost while what is other than God has not departed, because the two do not gather in one heart. If your attention is genuinely here, the question is not what to add but what is currently occupying the one place." },
        { key: "outward|clear", name: "The rank this book is limited to", role: "balance", chapterId: 4, body: "This is where the whole technical body of the book sits, and Ghazali is unusually frank about it: in this book we do not speak except of the cleanliness of the outward, because in the first half of the work we address ourselves deliberately only to outward things.", action: "Take the argument in Chapter 6 with it, because attention concentrated here tends toward a test that cannot be completed. His four evidences converge on one observable criterion — whether the water has changed — and he notes that in the first two generations the question of guarding water from impurity is never once recorded as having been asked." },
        { key: "outward|*", name: "One rank of four", role: "balance", chapterId: 1, body: "Ghazali gathers the strongest texts about outward cleanliness he can find and then says it would be far-fetched to read them as meaning the cultivating of the outward by pouring water while the inward is left stuffed with filths. He is not diminishing this rank; he is placing it.", action: "The practical test is whether exactness here reaches anywhere else. This is the easiest of the four ranks to perfect — an outward act, precisely specified, and capable of being done exactly while the third rank is untouched — and the book gives it in the finest detail precisely so the frame around it can do its work." },
        { key: "heart|clear", name: "This is the Quarter of Perils", role: "support", chapterId: 3, body: "The third rank, and the first half of it. Ghazali's principle is exact here: the utmost end in the work of the heart is its cultivation with praiseworthy traits, and it will not be characterised by them until it has been cleaned of their contraries. So what you are doing is the condition of everything else at this rank.", action: "Book 1 of the Ihya makes the sharper claim about this same work: that removing the blamed states of the heart is an individual obligation, that it cannot be done without knowing their causes and signs, and that most people have abandoned it. Ten books of the Ihya are the treatment; this is the rank they belong to." },
        { key: "limbs|clear", name: "The first half at the second rank", role: "support", chapterId: 3, body: "Ghazali applies the same structure here: purifying the limbs from what is forbidden is the first half, and cultivating them with acts of obedience is the second. Clearing is not preliminary work before the real thing — on his reading of the report, it is half of it.", action: "Since the first half is a condition rather than a sequence, nothing here says to stop doing the second. What it says is that an act of obedience built on top of an uncleared limb is the half that cannot hold, which is a claim about why effort at the second half sometimes produces nothing." },
        { key: "*|fill", name: "Clearing is the condition", role: "balance", chapterId: 3, body: "Whichever rank you are at, Ghazali's structure puts the half you have chosen second. Its wording is precise: purification is the first half, and it is a condition of the second — cultivation will not take hold while the contrary is still occupying the place.", action: "Do not read a condition as a sequence: he does not say to stop cultivating until everything is cleared, and the Ihya prescribes acts of obedience to people whose hearts it also says need work. But if the filling is not holding, his diagnosis is that something is still in the way, and the question is what." },
        { key: "*|maintain", name: "Neither half is being worked", role: "warning", chapterId: 3, body: "Ghazali's scheme has exactly two halves at every rank, and maintenance is not one of them. That is not a condemnation — settled practice is most of anyone's life — but on his account nothing at that rank is currently moving.", action: "The useful question is which half would move it, and his structure answers it: if the practice is not producing anything, look for what is still occupying the place, since he holds that the second half cannot take hold while the contrary remains. Chapter 3 is where that is argued." },
        { key: "*|*", name: "Read the rank with the half", role: "balance", chapterId: 2, body: "A rank, and a half of the work at it. Ghazali's four ranks turn out to be a table of contents for the whole Ihya: the outward is this quarter, the limbs are the Quarter of Custom, the heart is the Quarter of Perils, and the inmost is where the Quarter of Deliverance arrives.", action: "So the reading is also a direction: your rank names which quarter of the work is yours at the moment, and your half names whether what you need there is a clearing or a cultivation. Both are answered book by book." },
      ],
    },
  ],
};

export const book03Sources: SourceLink[] = [
  { label: "Primary Arabic text", note: "The complete public Arabic of Book 3 was read and used to establish the four ranks of purification, the structural principle of the two halves, the declared scope, and the treatment of the three outward purities.", url: "https://shamela.ws/book/9472/125" },
  { label: "The four ranks", note: "The passage giving the four ranks of purification and the principle that purification is half of the work at every one of them.", url: "https://shamela.ws/book/9472/126" },
  { label: "The declared scope", note: "The passage in which Ghazali states that this book treats only the outward rank, and divides outward purity into its three divisions.", url: "https://shamela.ws/book/9472/128" },
  { label: "Against strictness about water", note: "The passage giving four evidences that the criterion for water is whether it has changed, including the argument that no question about it is recorded from the first two generations.", url: "https://shamela.ws/book/9472/129" },
  { label: "The manner of removal", note: "The passage distinguishing an impurity of ruling, which has no perceptible substance, from one of substance, and giving each its remedy.", url: "https://shamela.ws/book/9472/130" },
  { label: "Forty-book structure", note: "Ghazali.org's listing places Book 3 as the third book of the Quarter of Worship and confirms its title.", url: "https://www.ghazali.org/listing-the-forty-books/" },
];

export const book03: SystemBook = {
  id: 3,
  title: "The Mysteries of Purification",
  shortTitle: "Purification",
  defaultJourneyId: "four-ranks",
  chapters: book03Chapters,
  conceptNodes: book03ConceptNodes,
  journeys: book03Journeys,
  sources: book03Sources,
  taxonomy: {
    title: "An opening and three divisions",
    note: "Ghazali sets out four ranks of purification, declares that this book will treat only the first, and then divides that rank into three. The eleven reading sections are grouped by that structure, which is the most tightly nested in the opening quarter.",
    groups: book03Movements,
  },
  instrument: book03Instrument,
  editorialNote: "The four journeys, eleven reading sections, visual models, and diagnostic are editorial learning aids. The sections follow Ghazali's own structure and his declared scope. The English is an original synthesis made from a reading of the public Arabic text, not a translation and not a substitute for one. Reports and inherited anecdotes are presented as material Ghazali transmitted; this prototype does not independently grade every narration, and the Arabic carries the graders' notes alongside several of the reports used here, including the one about religion being built on cleanliness. One matter of scope should be stated plainly: most of this book is technical law — the substances that count as impure, what removes them, the manner of ablution and of the full washing, and the treatment of the body's excesses. This edition presents how that material is organised, the principles that govern it, and the arguments Ghazali makes within it, rather than reproducing the rulings themselves. Those rulings are the substance of a legal manual, they vary between the schools of law, and nothing here should be used as a source for them; a reader who needs them should go to the text or to a work of law. Ghazali's argument against strictness about water is given as he gives it, with all four of his evidences, and it is an argument about which test is correct rather than an argument for indifference. The diagnostic applies his four ranks and his two halves to answers the reader supplies about his own attention and cannot pronounce on anyone's state.",
};
