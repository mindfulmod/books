import { assetUrl } from "./assetUrl";
import type { Chapter, ConceptNode, VisualModel } from "./data";
import type { Instrument, Journey, SourceLink, SystemBook, TaxonomyGroup } from "./systemTypes";

type Seed = { id: number; shortTitle: string; formalTitle: string; overview: string; moves: Array<{ title: string; body: string }>; closer: Array<{ title: string; body: string }>; distinction: [string, string, string, string, string]; misreading: string; reflection: string; audit: string[]; nodes: string[]; model: VisualModel };
const bab = (id: number) => (id <= 2 ? "the first chapter, on the excellence of brotherhood" : id <= 11 ? "the second chapter, on the rights of companionship" : "the third chapter, on the wider ties");
const makeChapter = (seed: Seed): Chapter => ({
  id: seed.id, shortTitle: seed.shortTitle, formalTitle: seed.formalTitle, overview: seed.overview,
  points: seed.moves.slice(0, 3).map((m) => m.body), reflection: seed.reflection, relatedNodes: seed.nodes, visualModel: seed.model,
  deep: { thesis: seed.moves[0].body, context: seed.overview, moves: seed.moves, closeReading: seed.closer,
    distinction: { title: seed.distinction[0], firstLabel: seed.distinction[1], first: seed.distinction[2], secondLabel: seed.distinction[3], second: seed.distinction[4] },
    misreading: seed.misreading, observation: seed.reflection, selfAudit: seed.audit,
    sourceAnchor: `Book 15, ${bab(seed.id)}, ${seed.formalTitle}.` },
});
const chain = (title: string, caption: string, items: Array<[string, string, "support" | "balance" | "warning"]>): VisualModel => ({ kind: "chain", title, caption, items: items.map(([label, body, role]) => ({ label, body, role })) });
const pair = (title: string, caption: string, items: Array<[string, string, "support" | "balance" | "warning"]>): VisualModel => ({ kind: "pair", title, caption, items: items.map(([label, body, role]) => ({ label, body, role })) });
const spectrum = (title: string, caption: string, items: Array<[string, string, "support" | "balance" | "warning"]>): VisualModel => ({ kind: "spectrum", title, caption, items: items.map(([label, body, role]) => ({ label, body, role })) });

export const book15Chapters: Chapter[] = [
  makeChapter({
    id: 1, shortTitle: "Three chapters", formalTitle: "The shape of the book",
    overview: "The book on friendship has three chapters, and they move outward from the closest tie to the widest.",
    moves: [
      { title: "Announce the three", body: "The excellence of affection and brotherhood in God, with its conditions, degrees, and benefits; the rights of companionship, its manners, its reality, and what it entails; and the right of the Muslim, of kin, of the neighbour, and of ownership — and how to live with those connected by these ties." },
      { title: "Note the movement", body: "From a chosen bond, to what that bond obliges, to the ties nobody chooses. The third chapter is about people you are connected to whether or not you would have selected them." },
      { title: "Note where the weight is", body: "The second chapter enumerates eight rights, and it is the longest. The book's distinctive move is that friendship has a determinate content that can be listed." },
      { title: "Note what the first chapter contains", body: "Conditions and degrees — so that brotherhood is not one thing, and the second chapter's rights fall differently at different degrees." },
    ],
    closer: [
      { title: "Why the widest circle comes last", body: "The rights owed to a chosen brother are the fullest, and the rights of a neighbour or a kinsman are established by comparison with them. Working outward means each ring is defined by what it keeps of the one inside it." },
      { title: "Its place in the quarter", body: "Eating, marriage, earning, and the lawful have all concerned what a person does. This is the first book of the quarter about a relationship chosen for its own sake, and the one after it is about having none." },
    ],
    distinction: ["Two ways to arrange a book on human ties", "Outward from the chosen", "The fullest bond first, and the wider ties defined by what they keep of it.", "By category", "Friends, relatives, neighbours as parallel subjects, which would lose the gradation."],
    misreading: "Do not read the third chapter as an afterthought. It covers every relationship a person has not chosen, which is most of them.",
    reflection: "Notice that the book on friendship is followed immediately by the book on seclusion.",
    audit: ["Which circle is my question in?", "Chosen, or given?", "What do the wider ties keep?", "Why is seclusion next?"],
    nodes: ["ukhuwwa", "structure", "suhba"],
    model: chain("Three rings", "Each defined by what it keeps of the one inside.", [["Brotherhood", "Chosen, with conditions and degrees.", "support"], ["Its rights", "Eight of them, enumerated.", "support"], ["The given ties", "Muslim, kin, neighbour, ownership — unchosen.", "balance"]]),
  }),
  makeChapter({
    id: 2, shortTitle: "Conditions and degrees", formalTitle: "The first chapter",
    overview: "Before any rights are listed, the bond itself is given conditions and grades — which is what stops the eight rights from being a uniform demand.",
    moves: [
      { title: "Name the subject", body: "The excellence of affection and of brotherhood in God, and its conditions, its degrees, and its benefits — four things, of which two are qualifications." },
      { title: "Note the conditions", body: "Brotherhood in God is a bond entered on a basis, and the chapter sets out what has to be true of the person and of the ground on which the tie is formed." },
      { title: "Note the degrees", body: "It is graded, which means that two people can both truly be brothers and owe each other different amounts." },
      { title: "Say why the grading matters", body: "The eight rights of the next chapter are stated in full. Without the degrees, they would read as a single standard that almost no friendship meets — and the chapter on property makes the grading explicit by dividing that right into three ranks." },
    ],
    closer: [
      { title: "The benefits", body: "The chapter treats them alongside the conditions, which is the Ihya's usual order: establish that the thing repays what is about to be asked of it, and only then say what it requires." },
      { title: "What conditions do to a claim", body: "A bond with conditions can be examined. Someone who claims brotherhood can be asked on what ground, and the story in the chapter on property turns on exactly that — a man is told he was not ashamed to claim brotherhood in God and then behave as he did." },
    ],
    distinction: ["Two ways to hold a friendship", "Graded", "With degrees, so that the rights fall differently on different ties.", "Uniform", "One standard for every friendship, which almost none would meet."],
    misreading: "Do not read the degrees as excuses. They determine what is owed, and the chapter on property shows the lowest rank being told that what he offered was not brotherhood at all.",
    reflection: "Ask on what ground your closest friendships were actually formed.",
    audit: ["On what ground was this formed?", "What degree is it?", "Would it meet a condition?", "What does the grading decide?"],
    nodes: ["ukhuwwa", "darajat", "shurut"],
    model: pair("Why the first chapter comes first", "It qualifies everything in the second.", [["Conditions", "On what ground the bond is formed, which can be examined.", "support"], ["Degrees", "So that two true brotherhoods can owe different amounts.", "support"]]),
  }),
  makeChapter({
    id: 3, shortTitle: "A contract", formalTitle: "What kind of thing brotherhood is",
    overview: "The sentence that opens the second chapter, and it changes the category of the whole subject.",
    moves: [
      { title: "Give the claim", body: "Know that the contract of brotherhood is a bond between two persons, like the contract of marriage between two spouses." },
      { title: "Draw the parallel", body: "As marriage entails rights that must be fulfilled in discharge of the right of marriage, so does the contract of brotherhood." },
      { title: "Give the map", body: "So your brother has upon you a right in property, and in person, and in the tongue, and in the heart — by pardon and by supplication, by sincerity and fidelity, and by lightening and the leaving of affectation and imposition." },
      { title: "Give the number", body: "That gathers into eight rights. A friendship is thereby made into something with a determinate content, which can be enumerated and audited." },
    ],
    closer: [
      { title: "What the parallel to marriage does", body: "Marriage is the paradigm of a relationship with enforceable content. Placing friendship beside it says that affection is not the whole of the tie, and that a person can be failing a friend in a specific and nameable way while feeling perfectly warm toward him." },
      { title: "The four registers", body: "Property, person, tongue, heart. The eight rights distribute across them unevenly — two on the tongue alone, in opposite directions — which is where the chapter's most interesting material sits." },
    ],
    distinction: ["Two things a friendship can be", "A contract", "With rights that can be listed, discharged, or failed.", "An affection", "A feeling, which cannot be audited and which can coexist with failing someone."],
    misreading: "Do not read the contract language as cold. Its effect is to make specific demands available where warmth alone would leave a person free to feel well of himself while doing nothing.",
    reflection: "Ask whether you would rather be owed something by a friend or felt warmly toward.",
    audit: ["Do I treat friendship as owed?", "Which register do I fail in?", "Could my failure be named?", "What does the marriage parallel add?"],
    nodes: ["aqd", "ukhuwwa", "huquq"],
    model: spectrum("Four registers, eight rights", "Distributed unevenly on purpose.", [["Property", "The first right, in three ranks.", "support"], ["Person", "Help, before being asked.", "support"], ["The tongue", "Two rights, pulling in opposite directions.", "balance"], ["The heart", "Pardon, supplication, fidelity, and lightening.", "support"]]),
  }),
  makeChapter({
    id: 4, shortTitle: "Two hands", formalTitle: "The first right: property",
    overview: "The first right, and its opening image is chosen with unusual care — Ghazali explains why it is the image it is.",
    moves: [
      { title: "Give the image", body: "The likeness of two brothers is the likeness of two hands, one of which washes the other." },
      { title: "Explain the choice", body: "He likened them to two hands and not to a hand and a foot, because the two hands cooperate toward a single purpose." },
      { title: "Apply it", body: "So two brothers: their brotherhood is complete only when they accompany one another toward a single aim — so that they are, in one respect, like a single person." },
      { title: "Draw the consequence", body: "This requires sharing in ease and in hardship, partnership in outcome and in circumstance, and the lifting of exclusive possession and of self-preference." },
    ],
    closer: [
      { title: "Why the image is argued rather than asserted", body: "Two hands and a hand and a foot are both pairs that work together. What separates them is that the hands do the same work toward the same end, and Ghazali spends a sentence on the difference — which turns a familiar simile into a claim about what a friendship is for." },
      { title: "The condition it smuggles in", body: "Brotherhood is complete only when the two accompany one another toward a single aim. That is a condition on the bond, not a description of it, and it means a friendship with no shared direction is incomplete by definition." },
    ],
    distinction: ["Two pairs that work together", "Two hands", "Doing the same work toward the same end, which is the likeness chosen.", "A hand and a foot", "Cooperating, but not toward one purpose — which is why it was not chosen."],
    misreading: "Do not take the sharing as merely generous. What the image requires is the lifting of exclusive possession, which is a stronger claim than generosity with what remains yours.",
    reflection: "Ask what single aim you and your closest friend are actually accompanying each other toward.",
    audit: ["Do we share an aim?", "Or only company?", "Is possession lifted, or shared?", "Which pair are we?"],
    nodes: ["mal", "huquq", "ukhuwwa"],
    model: pair("Why two hands", "The difference is the argument.", [["Same end", "Which makes the two in one respect a single person.", "support"], ["Merely cooperating", "A hand and a foot, which was available and not chosen.", "balance"]]),
  }),
  makeChapter({
    id: 5, shortTitle: "Three ranks", formalTitle: "How far the sharing goes",
    overview: "The right of property is graded into three, and the anecdote attached to the lowest of them is one of the sharpest in the Ihya.",
    moves: [
      { title: "Give the lowest", body: "The lowest rank is that you place your brother in the rank of your servant, meeting his need out of your surplus." },
      { title: "Give the counsel attached to it", body: "Abu Hazim said: if you have a brother in God, do not deal with him in your worldly affairs — and Ghazali says he meant one who is at this rank." },
      { title: "Give the anecdote", body: "A man came to the house of one he had made a brother and said: I need four thousand of your wealth. The man said: take two thousand." },
      { title: "Give the response", body: "He turned away from him and said: you preferred the world to God. Were you not ashamed to claim brotherhood in God and then say this?" },
    ],
    closer: [
      { title: "What the anecdote actually charges", body: "Not meanness — half of what was asked was given. The charge is that the claim of brotherhood in God had been made, and that the offer measured what the friendship was worth against something else. The refusal is of the accounting rather than of the amount." },
      { title: "How the grading protects the reader", body: "Ghazali attaches Abu Hazim's counsel to the lowest rank, which means the advice not to mix a friendship with worldly dealings is aimed at a specific case rather than offered as a general rule. Knowing which rank a friendship is at is what makes the advice usable." },
    ],
    distinction: ["Two ways to refuse a request", "By what is left over", "Meeting a need out of surplus, which is the lowest rank of the three.", "By an accounting", "Weighing the friendship against the sum, which is what the anecdote refuses."],
    misreading: "Do not read the anecdote as requiring anyone to hand over four thousand. What is being judged is a claim that had already been made about the relationship, not the sum itself.",
    reflection: "Ask what rank your friendships would be at if the ranks were assessed by what has actually been asked and given.",
    audit: ["Which rank is this?", "Have I met a need from surplus only?", "What claim have I made about it?", "Am I refusing an amount or an accounting?"],
    nodes: ["mal", "darajat", "ithar"],
    model: spectrum("Three ranks of sharing", "The lowest carries its own counsel.", [["Out of surplus", "The brother placed at the rank of a servant.", "balance"], ["As an equal", "Sharing rather than supplying.", "support"], ["Undivided", "Which the next section describes.", "support"]]),
  }),
  makeChapter({
    id: 6, shortTitle: "My shoe", formalTitle: "The highest rank",
    overview: "The top of the three ranks, given by a verse and then by a detail of speech that is more demanding than the verse.",
    moves: [
      { title: "Give the verse", body: "The highest rank is what God described the believers with: and their affair is consultation among themselves, and of what We have provided them they spend." },
      { title: "Give the reading", body: "Meaning that they were mixed together in their properties, none of them distinguishing his own baggage from another's." },
      { title: "Give the detail", body: "Among them was one who would not keep company with anyone who said: my shoe." },
      { title: "Note what the detail tests", body: "Not generosity but grammar. The possessive is the last place a division survives after everything has been shared, and the test reaches it." },
    ],
    closer: [
      { title: "Why the shoe rather than something valuable", body: "Nobody would notice a claim over a shoe, which is exactly why it is the test. A person who has genuinely stopped dividing does not produce the word, and one who has divided in principle will produce it over something trivial before he produces it over anything else." },
      { title: "The relation to the anecdote before it", body: "The man who offered two thousand had done arithmetic. The one who says my shoe has done grammar. Both reveal the same division, and the second is harder to notice and harder to fake." },
    ],
    distinction: ["Two places a division shows", "In an amount", "Refusing part of what was asked, which is visible and can be argued about.", "In a word", "The possessive over something worthless, which nobody notices and which nobody can fake."],
    misreading: "Do not treat this as a rule about speech. The point is diagnostic: the word is evidence of a division, and removing the word without removing the division would be an affectation the eighth right forbids.",
    reflection: "Listen to yourself for an hour and count the possessives.",
    audit: ["What do I say my about?", "Would I notice?", "Is the division real or verbal?", "Which is harder to fake?"],
    nodes: ["ithar", "mal", "ukhuwwa"],
    model: pair("Two tests of one division", "The second cannot be performed.", [["The amount", "Visible, arguable, and easy to justify.", "balance"], ["The word", "Over a shoe, unnoticed, and not fakeable.", "support"]]),
  }),
  makeChapter({
    id: 7, shortTitle: "Before being asked", formalTitle: "The second right: the person",
    overview: "The right of the person, and its distinctive clause is about timing rather than about effort.",
    moves: [
      { title: "Give the right", body: "Help with the person, in the fulfilling of needs and the undertaking of them." },
      { title: "Give the clause", body: "The undertaking of them before being asked." },
      { title: "Say why that matters", body: "A need met on request is a favour granted; a need met before the request is a burden never taken up. The second spares the friend the asking, which is the part that costs him." },
      { title: "Give the ordering", body: "The giving of them precedence over one's own needs, which is what places this right above ordinary helpfulness." },
    ],
    closer: [
      { title: "The cost the clause removes", body: "Book 14 argued at length that asking a person about his affairs is itself a harm — a tearing of a covering. This right removes the parallel cost from the other side: a friend who does not have to ask is spared the exposure that asking involves." },
      { title: "Why anticipation rather than generosity", body: "Generosity is measured by what is given. This right is measured by when, and the earlier it happens the less the friend has had to reveal about his own need — which makes it a right about dignity as much as about help." },
    ],
    distinction: ["Two ways to meet a need", "Before the asking", "Which spares the friend the exposure of having to ask.", "On request", "Which meets the need and leaves the cost of the asking with him."],
    misreading: "Do not read this as requiring omniscience. It requires attention — noticing what a friend has not said — which is a different demand from guessing.",
    reflection: "Ask when you last had to ask a friend for something, and what the asking cost you.",
    audit: ["Do I wait to be asked?", "What have I noticed and not acted on?", "What does asking cost them?", "Whose needs come first?"],
    nodes: ["nafs", "huquq", "sitr"],
    model: chain("Three levels of help", "The right is at the third.", [["When asked", "The need met, and the asking already paid for.", "balance"], ["Before asking", "Which spares the friend the exposure.", "support"], ["Before your own", "Given precedence, which is what makes it a right.", "support"]]),
  }),
  makeChapter({
    id: 8, shortTitle: "Silence", formalTitle: "The third right: the tongue, by keeping still",
    overview: "The longest of the eight, and it is a catalogue of things not said — including several that would be said out of interest rather than malice.",
    moves: [
      { title: "Give the first item", body: "That he be silent about mentioning his faults, in his absence and in his presence — rather that he feign ignorance of them." },
      { title: "Give the second", body: "That he be silent about contradicting him in what he says, and not dispute with him or argue him down." },
      { title: "Give the third", body: "That he be silent about spying and about asking after his circumstances." },
      { title: "Give the fourth", body: "If he sees him on a road or on an errand, that he not open with him by asking his purpose — where he has come from and where he is going — and not ask him about it; for perhaps mentioning it is heavy on him, or he would need to lie about it." },
    ],
    closer: [
      { title: "The reason attached to the fourth", body: "Or he would need to lie about it. The instruction is not only that the question is intrusive but that it manufactures an occasion for a friend to be untruthful — so the harm of the question includes what it does to the person answering." },
      { title: "How it connects to the previous book", body: "Book 14 argued that asking about a person's affairs is a tearing of a covering, and forbidden without doubt in the ordinary case. This right applies the same principle inside a friendship, where the temptation to ask is warmest and the excuse of concern is readiest." },
    ],
    distinction: ["Two reasons a question is wrong", "It intrudes", "The covering torn, which is the harm to the one asked.", "It manufactures a lie", "Putting a friend in a position where the easy answer is untrue."],
    misreading: "Do not read the silence about faults as dishonesty. The next right requires speech, and the two are stated as one right in two directions — what is forbidden is exposure, not truthfulness.",
    reflection: "Recall the last time you asked a friend where he had been, and why you asked.",
    audit: ["What do I ask out of interest?", "Have I put someone in a position to lie?", "Do I contradict as a habit?", "Which of the four do I fail?"],
    nodes: ["lisan", "sitr", "huquq"],
    model: spectrum("Four silences", "Each is something a friend would notice.", [["About faults", "In his absence and his presence, feigning ignorance.", "support"], ["About contradicting", "Not disputing or arguing him down.", "support"], ["About his affairs", "No spying and no asking after his circumstances.", "support"], ["About his errand", "Which he may find heavy, or need to lie about.", "warning"]]),
  }),
  makeChapter({
    id: 9, shortTitle: "And speech", formalTitle: "The fourth right: the tongue, by speaking",
    overview: "The same organ, the opposite instruction — and the pairing is what makes the two rights more than a rule about tact.",
    moves: [
      { title: "State the pairing", body: "For brotherhood, as it requires silence about what is disliked, requires also speech about what is loved." },
      { title: "Note what that rules out", body: "A friend who is merely discreet has satisfied one right and failed the other. Withholding is not the whole of what the tongue owes." },
      { title: "Give the content", body: "The right covers the saying of what pleases him, the acknowledging of what is good in him, and the speaking of it in his absence as in his presence." },
      { title: "Note the symmetry", body: "The third right forbids mentioning faults behind his back. The fourth requires mentioning virtues behind his back. Both are about what is said when he cannot hear it." },
    ],
    closer: [
      { title: "Why two rights and not one", body: "Stated as a single rule about the tongue, it would collapse into being careful. Split in two, it becomes two separate failures, and most people fail the second — a person who never speaks ill of a friend and never speaks well of him has kept half of what he owes." },
      { title: "The test the pairing supplies", body: "What is said about him when he is absent, in both directions. That is one observable behaviour answering two rights, and it is not available to self-report — other people know the answer better than you do." },
    ],
    distinction: ["Two duties of one organ", "Silence", "About faults, disputes, and his affairs.", "Speech", "About what is good in him, said where he cannot hear it."],
    misreading: "Do not read the fourth as flattery. It concerns what is true and good and would otherwise go unsaid, and it is owed in his absence, where flattery has no purchase.",
    reflection: "Ask what you have said about your closest friend in the last month when he was not there.",
    audit: ["What do I say in his absence?", "Have I kept only the silence?", "Is anything good going unsaid?", "Who knows the answer better than I do?"],
    nodes: ["lisan", "huquq", "ukhuwwa"],
    model: pair("The same organ, both directions", "Most people keep only the first.", [["Silence", "About what is disliked, in absence and presence.", "support"], ["Speech", "About what is loved, in absence as in presence.", "support"]]),
  }),
  makeChapter({
    id: 10, shortTitle: "Slips, and fidelity", formalTitle: "The fifth, sixth, and seventh rights",
    overview: "Three rights of the heart, and the first of them is sorted before it is prescribed.",
    moves: [
      { title: "Give the fifth", body: "Pardoning slips and lapses. And a friend's lapse is either in his religion, or in what concerns you — and the two are treated differently." },
      { title: "Give the sixth", body: "Supplication for the brother in his life and after his death, with everything he loves for himself and for his family and for everything connected to him." },
      { title: "Note what the sixth extends", body: "After his death, and to his family. The right does not end with the person and does not stop at him, which is what distinguishes it from goodwill." },
      { title: "Give the seventh", body: "Fidelity and sincerity. And the meaning of fidelity is constancy in love and its continuance until death — and after death, with those he leaves behind." },
    ],
    closer: [
      { title: "Why the sixth and seventh both reach past death", body: "A tie that ends when a person does was a convenience. Both of these rights are defined by what continues when nothing further can be received, which is the sharpest available test of whether the bond was for his sake." },
      { title: "The sorting in the fifth", body: "A lapse in religion and a lapse against you are different failures needing different responses, and Ghazali separates them before saying anything about pardon. It is the same method as everywhere in the Ihya: sort the case, then prescribe." },
    ],
    distinction: ["Two kinds of lapse", "In his religion", "Which concerns him and is not an offence against you.", "Against you", "Which is what pardon in the ordinary sense addresses."],
    misreading: "Do not read fidelity as mere persistence. It is defined as constancy in love, which is a state rather than a habit of contact, and it is required to continue where contact cannot.",
    reflection: "Ask what you still owe someone who has died.",
    audit: ["Which kind of lapse am I holding?", "Do I pray for anyone who cannot know?", "What continues after death?", "Was the tie for his sake?"],
    nodes: ["afw", "dua", "wafa"],
    model: chain("Three rights of the heart", "Two of them reach past death.", [["Pardon", "Sorted first: a lapse in religion, or against you.", "support"], ["Supplication", "In life and after death, and for his family.", "support"], ["Fidelity", "Constancy in love, and with those he leaves behind.", "support"]]),
  }),
  makeChapter({
    id: 11, shortTitle: "Lightening", formalTitle: "The eighth right",
    overview: "The last of the eight, and it is the only one that consists entirely in not doing something to a friend.",
    moves: [
      { title: "Give the right", body: "Lightening, and the leaving of affectation and imposition — that he not burden his brother with what is hard on him." },
      { title: "Note the two halves", body: "Affectation is what you do to yourself on his behalf; imposition is what you ask of him. The right forbids both, and they are the two ways a friendship becomes expensive." },
      { title: "Say what it protects", body: "The ease of the tie. A friendship that costs either party effort to maintain will be maintained until it is not, and the eighth right is aimed at the maintenance cost rather than at the affection." },
      { title: "Note the pattern", body: "It is Book 11's instruction about guests — do not burden yourselves for the guest, so that you come to dislike him — applied to a standing relationship rather than to an occasion." },
    ],
    closer: [
      { title: "Why it comes last", body: "The seven rights before it are demands. Ending on a right that forbids making demands is what keeps the list from producing the very burden it would otherwise create, and it is placed where a reader has just finished reading seven things he owes." },
      { title: "The mechanism it shares with Book 11", body: "There, effort undertaken for a guest produces dislike of the guest. Here, effort undertaken for a friend does the same. In both cases the fault is located where the burden is assumed, not where the feeling appears." },
    ],
    distinction: ["Two ways a friendship becomes expensive", "Affectation", "What you take on for his sake, which produces resentment of him.", "Imposition", "What you ask of him, which produces the same in the other direction."],
    misreading: "Do not read this as licensing indifference. It comes after seven rights that are demanding, and what it forbids is the ceremony around them rather than the substance of them.",
    reflection: "Ask which of your friendships costs you effort to maintain, and what the effort is spent on.",
    audit: ["What do I take on for them?", "What do I ask of them?", "Which friendship is expensive?", "Where does the burden get assumed?"],
    nodes: ["takalluf", "huquq", "ukhuwwa"],
    model: pair("Two halves of the eighth right", "Both make a friendship expensive.", [["Affectation", "What you do to yourself on his behalf.", "warning"], ["Imposition", "What you require of him.", "warning"]]),
  }),
  makeChapter({
    id: 12, shortTitle: "The unchosen", formalTitle: "The third chapter: the wider ties",
    overview: "The last chapter turns to relationships nobody selected, and the question it asks is how to live with people you are simply connected to.",
    moves: [
      { title: "Name the ties", body: "The right of the Muslim, of kin, of the neighbour, and of ownership — and how to live with those who are connected by these causes." },
      { title: "Note what they share", body: "None of them is chosen. A person acquires them by being born somewhere, living somewhere, or belonging to something, and the rights follow from the connection rather than from any decision." },
      { title: "Note how they are defined", body: "By comparison with the eight. What a neighbour or a kinsman is owed is established against what a chosen brother is owed, so the second chapter has to come first." },
      { title: "Note the phrase", body: "How to live with those connected by these causes. The chapter is about coexistence rather than about intimacy, which is a different subject and gets a different treatment." },
    ],
    closer: [
      { title: "Why the unchosen ties need their own chapter", body: "The eight rights presuppose a bond formed on a ground and accompanied toward an aim. None of that is available with a neighbour, and yet something is owed — so the content has to be derived rather than transferred." },
      { title: "Where the quarter goes next", body: "Book 16 treats seclusion: whether to have these ties at all. Having spent a book establishing what companionship costs and what it is worth, the natural next question is whether a person is better off without it — and Ghazali answers it the way he answered marriage." },
    ],
    distinction: ["Two kinds of tie", "Chosen", "Formed on a ground, accompanied toward an aim, and owed eight rights.", "Given", "Acquired by living somewhere or being born to someone, and owed something derived."],
    misreading: "Do not assume the unchosen ties owe less because they are unchosen. The chapter exists to establish what they do owe, and proximity generates real claims in it.",
    reflection: "Count the people you are connected to and did not choose, and notice how many of them you have never thought of as owed anything.",
    audit: ["Whom have I not chosen?", "What do they claim?", "Is this coexistence or intimacy?", "What comes next in the quarter?"],
    nodes: ["jiwar", "rahim", "suhba"],
    model: spectrum("Four unchosen ties", "Each generates a claim without a decision.", [["The Muslim", "The widest, owed by the connection itself.", "balance"], ["Kin", "By birth, and not revocable.", "support"], ["The neighbour", "By proximity alone.", "support"], ["Ownership", "By what a person holds and who is held by it.", "balance"]]),
  }),
];

export const book15ConceptNodes: ConceptNode[] = [
  ["ukhuwwa", "Brotherhood", "A contract", "A bond between two persons, like the contract of marriage between spouses."],
  ["structure", "Three chapters", "Outward from the chosen", "The fullest bond first, and the wider ties defined against it."],
  ["suhba", "Companionship", "Its rights enumerated", "Eight, distributed across property, person, tongue, and heart."],
  ["shurut", "Conditions", "A bond can be examined", "Formed on a ground, which someone claiming it can be asked about."],
  ["darajat", "Degrees", "Not one standard", "Two true brotherhoods can owe different amounts."],
  ["aqd", "The contract", "Makes failure nameable", "Warmth alone leaves a person free to feel well of himself while doing nothing."],
  ["huquq", "Eight rights", "Determinate content", "Which is what makes a friendship auditable at all."],
  ["mal", "Property", "Two hands", "Cooperating toward one purpose, which is why the image was chosen."],
  ["ithar", "Self-preference lifted", "Tested by a word", "One who would not keep company with anyone who said: my shoe."],
  ["nafs", "The person", "Before being asked", "Which spares a friend the exposure that asking involves."],
  ["sitr", "The covering", "Torn by asking", "The same principle as Book 14, applied inside a friendship."],
  ["lisan", "The tongue", "Two rights, opposed", "Silence about faults, and speech about what is good — both in absence."],
  ["afw", "Pardon", "Sorted first", "A lapse in his religion and a lapse against you are different failures."],
  ["dua", "Supplication", "Past death", "For him and for his family, where nothing further can be received."],
  ["wafa", "Fidelity", "Constancy in love", "Continuing to death, and after it with those he leaves behind."],
  ["takalluf", "Affectation", "The eighth right", "What you take on for his sake, which produces resentment of him."],
  ["jiwar", "The neighbour", "Owed without a choice", "Proximity generating a claim that no decision created."],
  ["rahim", "Kin", "By birth", "A tie acquired rather than formed, and not revocable."],
].map(([id, label, kicker, description], index) => ({ id, label, kicker, description, position: ["left", "right", "top", "bottom"][index % 4] }));

const node = (id: string, label: string, micro: string, summary: string, guardrail: string, chapterId: number, glyph: Journey["nodes"][number]["glyph"]): Journey["nodes"][number] => ({ id, label, micro, summary, guardrail, chapterId, glyph });

export const book15Journeys: Journey[] = [
  {
    id: "what-is-owed", number: "01", question: "Is a friendship something you can fail?", title: "Make it a contract",
    description: "Take the sentence that places brotherhood beside marriage, the map of eight rights it produces, and the image Ghazali argues for rather than asserts.",
    payoff: "You get a friendship with determinate content, and a condition most friendships do not meet.",
    image: assetUrl("assets/system/book15-two-hands.jpg"), imageAlt: "Two identical work gloves laid side by side on a bench, both worn in the same places.", minutes: 12, color: "#278d91",
    nodes: [
      node("three-rings", "See the three rings", "Outward from the chosen", "The fullest bond first; the wider ties defined against it.", "The last covers everyone you did not choose.", 1, "order"),
      node("graded", "Note the grading", "Not one standard", "Conditions and degrees come before any rights are listed.", "Which is what stops the eight being a uniform demand.", 2, "balance"),
      node("a-contract", "Take the sentence", "Like the contract of marriage", "A bond with rights that must be fulfilled.", "Which makes failing a friend nameable.", 3, "know"),
      node("eight", "Take the map", "Four registers", "Property, person, tongue, heart — eight rights across them.", "Distributed unevenly on purpose.", 3, "pattern"),
      node("why-hands", "Note the argument", "Not a hand and a foot", "Two hands, because they work toward the same end.", "A familiar simile turned into a claim.", 4, "clear"),
      node("one-aim", "Take the condition", "Toward a single aim", "Brotherhood is complete only when the two accompany each other so.", "A condition, not a description.", 4, "diagnose"),
    ],
  },
  {
    id: "how-far", number: "02", question: "How far does this actually go?", title: "Follow one right to the top",
    description: "Take the three ranks of sharing, the anecdote that refuses an accounting rather than an amount, and the test that cannot be performed.",
    payoff: "You get a way of placing your own friendships that does not depend on what you feel about them.",
    image: assetUrl("assets/system/book15-my-shoe.jpg"), imageAlt: "A single pair of worn sandals set at a doorway among several other pairs, indistinguishable from them.", minutes: 11, color: "#bf7a35",
    nodes: [
      node("lowest", "Take the lowest rank", "Out of surplus", "The brother placed at the rank of a servant.", "Abu Hazim's counsel is attached to this rank only.", 5, "know"),
      node("the-four-thousand", "Take the anecdote", "Take two thousand", "And he turned away: you preferred the world to God.", "Half was given; the charge is not meanness.", 5, "witness"),
      node("the-accounting", "Find the charge", "An accounting, not an amount", "The friendship was weighed against a sum.", "The refusal is of the weighing.", 5, "diagnose"),
      node("the-verse", "Take the highest", "None distinguishing his baggage", "Mixed together in their properties.", "Described of the believers, not prescribed.", 6, "receive"),
      node("the-word", "Take the test", "My shoe", "One who would not keep company with anyone who said it.", "Grammar rather than generosity.", 6, "clear"),
      node("cannot-fake", "Note why it works", "Nobody notices it", "Which is exactly why it cannot be performed.", "Removing the word without the division is affectation.", 6, "steady"),
    ],
  },
  {
    id: "tongue-and-burden", number: "03", question: "What do I owe when nothing is happening?", title: "Take the quiet rights",
    description: "Follow the two rights of the tongue pulling in opposite directions, the rights that reach past death, and the one that forbids making demands.",
    payoff: "You leave with one observable test that answers two rights, and a diagnosis for the friendships that feel like work.",
    image: assetUrl("assets/system/book15-empty-chair.jpg"), imageAlt: "Two chairs at a table with one occupied place setting and one empty, the empty place still laid.", minutes: 12, color: "#c25f50",
    nodes: [
      node("four-silences", "Take the silences", "Including the interested ones", "Faults, contradiction, spying, and where he has been.", "Not only the malicious questions.", 8, "clear"),
      node("or-lie", "Note the reason", "Or he would need to lie", "The question manufactures an occasion for untruth.", "The harm includes what it does to the one answering.", 8, "diagnose"),
      node("and-speech", "Take the other half", "Speech about what is loved", "The same organ, the opposite instruction.", "Most people keep only the silence.", 9, "balance"),
      node("in-absence", "Find the test", "What is said when he is out", "One behaviour answering both rights.", "Not available to self-report.", 9, "witness"),
      node("past-death", "Note what continues", "And with those he leaves", "Supplication and fidelity both reach past death.", "The sharpest test of whom the bond was for.", 10, "steady"),
      node("lightening", "Take the last right", "Do not make it expensive", "Affectation on your side, imposition on his.", "Placed last, after seven demands.", 11, "guard"),
    ],
  },
];

export const book15Movements: TaxonomyGroup[] = [
  ["bab1", "1. The excellence of brotherhood", "Its conditions, degrees, and benefits, before any right is named.", [1, 2]],
  ["bab2", "2. The rights of companionship", "A contract with eight rights across property, person, tongue, and heart.", [3, 4, 5, 6, 7, 8, 9, 10, 11]],
  ["bab3", "3. The wider ties", "The Muslim, kin, the neighbour, and ownership — claims nobody chose.", [12]],
].map(([id, label, description, chapterIds], index) => ({ id, label, description, chapterIds, color: ["#bf7a35", "#278d91", "#c25f50"][index % 3] })) as TaxonomyGroup[];

export const book15Instrument: Instrument = {
  title: "Eight rights, and one friendship",
  note: "Ghazali says the contract of brotherhood is a bond like the contract of marriage, and that it carries eight rights across property, person, the tongue, and the heart. Take one friendship you actually have — a real person, not friendship in general — and answer for it.",
  items: [
    {
      id: "friend", label: "One friendship you have", lede: "A particular person, and how things actually stand",
      note: "The first question is the book's own framing, which decides whether failing a friend is even a coherent idea. The second groups his eight rights into four. Note that two of the eight are the same organ pulling in opposite directions, and that the last of them forbids making demands.",
      axes: [
        {
          id: "kind", kicker: "The framing", question: "What do you take this friendship to be?",
          options: [
            { id: "contract", label: "Something with obligations I could fail", note: "The book's own claim: a bond like the contract of marriage." },
            { id: "affection", label: "An affection — we are simply close", note: "Which cannot be audited, and can coexist with failing someone." },
            { id: "aim", label: "We are going somewhere together", note: "His condition on complete brotherhood: accompanying toward a single aim." },
            { id: "unsure", label: "I have never framed it either way", note: "Which is the ordinary case, and what the second chapter is written for." },
          ],
        },
        {
          id: "right", kicker: "The eight rights", question: "Which of them is hardest for you here?",
          options: [
            { id: "mal", label: "Property and help — what it costs me", note: "The first two rights, of which the first is graded into three ranks." },
            { id: "lisan", label: "What I say, and what I do not", note: "The third and fourth: silence about faults, speech about what is good." },
            { id: "qalb", label: "Pardoning, praying, staying constant", note: "The fifth, sixth, and seventh, two of which reach past death." },
            { id: "khafif", label: "Keeping it easy — it has become work", note: "The eighth: affectation on your side, imposition on his." },
          ],
        },
      ],
      verdicts: [
        { key: "affection|*", name: "Then nothing can be failed", role: "warning", chapterId: 3, body: "The book's opening move on this is deliberate: the contract of brotherhood is a bond between two persons, like the contract of marriage between spouses — and as marriage entails rights that must be fulfilled, so does this. Held as an affection, a friendship has no content that can be discharged or failed.", action: "The effect of the contract language is not coldness but specificity. Warmth alone leaves a person free to feel well of himself while doing nothing, and eight enumerated rights make it possible to say exactly where a friend has been let down. Read the eight and see which of them you would not have thought of as owed." },
        { key: "aim|mal", name: "You have named his condition", role: "support", chapterId: 4, body: "This is exactly the condition Ghazali builds into the first right, and he argues for it rather than asserting it: two brothers are likened to two hands and not to a hand and a foot, because the hands cooperate toward a single purpose — so brotherhood is complete only when the two accompany one another toward one aim.", action: "Which means the rights are not a burden added to the friendship but the content of what you are already doing. The one to check is the right of the person: help undertaken before being asked, which spares your friend the exposure that asking involves — and given precedence over your own needs, which is what raises it above ordinary helpfulness." },
        { key: "*|khafif", name: "The right placed last", role: "balance", chapterId: 11, body: "The eighth right is lightening, and the leaving of affectation and imposition — that he not burden his brother with what is hard on him. It has two halves: what you take on for his sake, and what you ask of him, and both are how a friendship becomes expensive.", action: "Ghazali places it after seven demanding rights, and it is Book 11's warning about guests applied to a standing relationship: effort undertaken for someone produces dislike of them, and the fault sits where the burden is assumed rather than where the feeling appears. Ask what specifically you have taken on, and whether he asked for it." },
        { key: "*|lisan", name: "Two rights, not one", role: "balance", chapterId: 9, body: "The third right is silence — about his faults in his absence and his presence, about contradicting him, about spying and asking after his circumstances, and about where he has been, since perhaps mentioning it is heavy on him or he would need to lie about it. The fourth is the opposite: brotherhood requires speech about what is loved as it requires silence about what is disliked.", action: "Most people keep the first and fail the second, and a person who never speaks ill of a friend and never speaks well of him has kept half of what he owes. The test answers both at once and is not available to self-report: what is said about him when he is not there. Other people know your answer better than you do." },
        { key: "*|mal", name: "Which of three ranks", role: "balance", chapterId: 5, body: "The right of property is graded, which is what keeps it usable. The lowest rank is that you place your brother at the rank of a servant, meeting his need out of your surplus — and Abu Hazim's counsel not to deal with a brother in worldly affairs is attached to that rank specifically, not offered as a general rule.", action: "The anecdote is worth sitting with, because the charge in it is not meanness: a man asked for four thousand, was offered two, and turned away saying — were you not ashamed to claim brotherhood in God and then say this. Half was given. What was refused was the accounting, not the amount, and the question it puts is what claim you have already made about the relationship." },
        { key: "*|qalb", name: "Two of these reach past death", role: "support", chapterId: 10, body: "Supplication for the brother in his life and after his death, with everything he loves for himself and his family; and fidelity, which is constancy in love and its continuance until death — and after it, with those he leaves behind. Both are defined by what continues when nothing further can be received.", action: "That is also the sharpest test available of whom the bond was for. And note that pardon is sorted before it is prescribed: a lapse in his religion and a lapse against you are different failures, and only the second is what pardon ordinarily means. Establish which one you are holding before deciding what to do with it." },
        { key: "*|*", name: "Read the framing with the right", role: "balance", chapterId: 3, body: "How you hold the friendship, and where it is hardest. The book's claim is that the two are connected: a friendship held as an affection has no determinate content, so nothing about it can be located, and the difficulty stays a mood.", action: "Take the framing first, since it decides whether the second question has an answer. Then work the eight in his order — property, person, silence, speech, pardon, supplication, fidelity, lightening — and notice which of them you had not previously thought of as something owed." },
      ],
    },
  ],
};

export const book15Sources: SourceLink[] = [
  { label: "Primary Arabic text", note: "The complete public Arabic of Book 15 was read and used to establish the three chapters, the framing of brotherhood as a contract, the eight rights, and the ranks of sharing property.", url: "https://shamela.ws/book/9472/517" },
  { label: "Brotherhood as a contract", note: "The passage opening the second chapter, placing the contract of brotherhood beside the contract of marriage and mapping the eight rights across four registers.", url: "https://shamela.ws/book/9472/533" },
  { label: "The right of property", note: "The passage giving the image of the two hands, the reason it is not a hand and a foot, and the three ranks of sharing.", url: "https://shamela.ws/book/9472/533" },
  { label: "The tongue, by silence", note: "The passage cataloguing what is not said — faults, contradiction, spying, and asking after a friend's errand.", url: "https://shamela.ws/book/9472/536" },
  { label: "The tongue, by speech", note: "The passage requiring speech about what is loved as the previous right requires silence about what is disliked.", url: "https://shamela.ws/book/9472/540" },
  { label: "Fidelity and lightening", note: "The passages on constancy in love continuing past death, and on the leaving of affectation and imposition.", url: "https://shamela.ws/book/9472/547" },
  { label: "The wider ties", note: "The third chapter, on the right of the Muslim, of kin, of the neighbour, and of ownership, and how to live with those connected by them.", url: "https://shamela.ws/book/9472/553" },
  { label: "Forty-book structure", note: "Ghazali.org's listing places Book 15 as the fifth book of the Quarter of Customs and confirms its title.", url: "https://www.ghazali.org/listing-the-forty-books/" },
];

export const book15: SystemBook = {
  id: 15,
  title: "The Etiquette of Companionship",
  shortTitle: "Companionship",
  defaultJourneyId: "what-is-owed",
  chapters: book15Chapters,
  conceptNodes: book15ConceptNodes,
  journeys: book15Journeys,
  sources: book15Sources,
  taxonomy: {
    title: "Three chapters, three rings",
    note: "Ghazali's own three, moving outward from the closest tie to the widest. Nine of the twelve reading sections belong to the second, which enumerates eight rights and is what makes a friendship into something that can be audited.",
    groups: book15Movements,
  },
  instrument: book15Instrument,
  editorialNote: "The three journeys, twelve reading sections, visual models, and diagnostic are editorial learning aids. The sections follow Ghazali's three chapters in his order and are grouped under them in the movements list. The English is an original synthesis made from a reading of the public Arabic text, not a translation and not a substitute for one. Reports and inherited anecdotes are presented as material Ghazali transmitted; this prototype does not independently grade every narration. Two matters of scope. The second chapter treats each of the eight rights at length, with extensive supporting material — reports, verses, and stories of the early Muslims — and this edition presents each right, the arguments Ghazali makes for it, and the passages where his reasoning is distinctive, rather than reproducing that supporting material. The anecdotes carried here, including the exchange over four thousand dirhams and the man who would not keep company with anyone who said 'my shoe', are given as reports of what particular people did and said; they illustrate a rank rather than setting a requirement, and Ghazali's own grading of the right of property into three ranks is what governs how they should be read. The third chapter, on the rights of kin, neighbours, and those connected by ownership, addresses a social order with arrangements — including forms of ownership over persons — that differ fundamentally from a modern reader's; this edition presents what the chapter covers and how its rights are derived, and reproduces none of its counsel. The diagnostic applies his own framing and his own eight rights to a friendship the reader supplies and cannot pronounce on anyone's relationships.",
};
