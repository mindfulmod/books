import { assetUrl } from "./assetUrl";
import type { Chapter, ConceptNode, VisualModel } from "./data";
import type { Instrument, Journey, SourceLink, SystemBook, TaxonomyGroup } from "./systemTypes";

type Seed = { id: number; shortTitle: string; formalTitle: string; overview: string; moves: Array<{ title: string; body: string }>; closer: Array<{ title: string; body: string }>; distinction: [string, string, string, string, string]; misreading: string; reflection: string; audit: string[]; nodes: string[]; model: VisualModel };
const bab = (id: number) => (id <= 2 ? "the first chapter, on the excellence of the Quran" : id === 3 ? "the second chapter, on the outward manners" : id <= 9 ? "the third chapter, on the inward acts" : "the fourth chapter, on understanding and interpretation");
const makeChapter = (seed: Seed): Chapter => ({
  id: seed.id, shortTitle: seed.shortTitle, formalTitle: seed.formalTitle, overview: seed.overview,
  points: seed.moves.slice(0, 3).map((m) => m.body), reflection: seed.reflection, relatedNodes: seed.nodes, visualModel: seed.model,
  deep: { thesis: seed.moves[0].body, context: seed.overview, moves: seed.moves, closeReading: seed.closer,
    distinction: { title: seed.distinction[0], firstLabel: seed.distinction[1], first: seed.distinction[2], secondLabel: seed.distinction[3], second: seed.distinction[4] },
    misreading: seed.misreading, observation: seed.reflection, selfAudit: seed.audit,
    sourceAnchor: `Book 8, ${bab(seed.id)}, ${seed.formalTitle}.` },
});
const chain = (title: string, caption: string, items: Array<[string, string, "support" | "balance" | "warning"]>): VisualModel => ({ kind: "chain", title, caption, items: items.map(([label, body, role]) => ({ label, body, role })) });
const pair = (title: string, caption: string, items: Array<[string, string, "support" | "balance" | "warning"]>): VisualModel => ({ kind: "pair", title, caption, items: items.map(([label, body, role]) => ({ label, body, role })) });
const spectrum = (title: string, caption: string, items: Array<[string, string, "support" | "balance" | "warning"]>): VisualModel => ({ kind: "spectrum", title, caption, items: items.map(([label, body, role]) => ({ label, body, role })) });

export const book08Chapters: Chapter[] = [
  makeChapter({
    id: 1, shortTitle: "Four chapters", formalTitle: "The excellence of the Quran and its people",
    overview: "The book opens with the excellences and then announces a structure that moves steadily inward and ends in a controversy.",
    moves: [
      { title: "Announce the four", body: "The excellence of the Quran and its people; the manners of recitation in the outward; the inward acts at recitation; and understanding the Quran and interpreting it by opinion and otherwise." },
      { title: "Note the shape", body: "Outward manners, then inward acts, then the question of what a reader may take the text to mean. Each chapter is further in than the last, and the fourth is a dispute rather than an instruction." },
      { title: "Give the first chapter's other half", body: "It treats the excellence of the Quran and its people, and the blame of those who fall short in reciting it. The praise and the reproach are given together." },
      { title: "Say what the fourth chapter is for", body: "The third chapter recommends drawing meanings out of the text, and a well-known report threatens whoever interprets the Quran by his opinion. The fourth exists because Ghazali knows the third has raised that objection." },
    ],
    closer: [
      { title: "Why the objection is faced rather than avoided", body: "He could have described the inward acts and left the reader to reconcile them. Instead he opens the fourth chapter by putting the objection in the reader's mouth — perhaps you will say — and answers it at length, which is the same procedure Book 6 uses with the jurists' verdict on a bare fast." },
      { title: "Where the book's weight sits", body: "The third and fourth chapters together are more than half of it, and both are about what happens in a reader rather than what he does. The outward manners are one chapter of four and are given without argument." },
    ],
    distinction: ["Two ways to write about recitation", "Ending in the dispute", "The inward acts recommended, and then the objection they raise faced directly.", "Ending in the manners", "Which would leave the reader with a recommendation and a threat, unreconciled."],
    misreading: "Do not read the fourth chapter as an appendix on a technical controversy. It is the chapter that makes the third one usable, and it was written because the third one needed it.",
    reflection: "Notice that a book on how to read closes on the question of how much a reader may find.",
    audit: ["What did I expect this book to cover?", "Which chapter do I need?", "What objection does the third raise?", "Where is the book's weight?"],
    nodes: ["quran", "structure", "tafsir"],
    model: chain("Four chapters, moving inward", "The last is a dispute, not an instruction.", [["The excellence", "Of the Quran and its people, with the blame of those falling short.", "balance"], ["Outward manners", "Ten, given without argument.", "balance"], ["Inward acts", "Ten, and the reason the fourth chapter exists.", "support"], ["Interpretation", "The objection faced directly, and answered.", "support"]]),
  }),
  makeChapter({
    id: 2, shortTitle: "And those who fall short", formalTitle: "The blame attached to falling short",
    overview: "The first chapter gathers praise and reproach in the same breath, which sets a tone the whole book keeps.",
    moves: [
      { title: "Give the excellence", body: "The chapter assembles what is reported on the excellence of the Quran, of learning it, of teaching it, and of the standing of its people." },
      { title: "Give the reproach", body: "And the blame of those who fall short in reciting it, which is part of the same chapter's stated title rather than a separate section." },
      { title: "Note the pairing", body: "A subject whose excellence is beyond dispute is given its warning in the same place as its praise, so that no reader can take the first without meeting the second." },
      { title: "Say what it prepares", body: "The whole book turns on a distinction between reciting the Quran and reading it, and the reproach in this chapter is the first statement of that distinction." },
    ],
    closer: [
      { title: "Why the two belong together", body: "The excellences of the Quran are the most quoted material in this part of the tradition, and quoting them is a way of participating in the excellence without doing anything. Attaching the reproach to the praise closes that route at the first opportunity." },
      { title: "The pattern of the quarter", body: "Every book in this quarter begins with excellences. This is the only one whose opening chapter is titled to include the blame of those who fall short in the very act being praised." },
    ],
    distinction: ["Two ways to open with excellences", "With the reproach attached", "So that the praise cannot be received without the warning.", "Alone", "Which lets a reader take the excellence of the act as an excellence of himself."],
    misreading: "Do not read the reproach as aimed at those who recite little. The book's whole account is about how recitation is done, and the third chapter says what falling short consists of.",
    reflection: "Ask whether you have ever felt improved by hearing the excellences of something you were not doing.",
    audit: ["What do I take from the excellences?", "Have I substituted praise for practice?", "What does falling short mean here?", "Why are the two in one chapter?"],
    nodes: ["quran", "taqsir", "structure"],
    model: pair("One chapter, two halves", "Neither is available without the other.", [["The excellence", "Of the Quran, its learning, its teaching, and its people.", "support"], ["The blame", "Of those falling short in reciting it, in the same chapter.", "warning"]]),
  }),
  makeChapter({
    id: 3, shortTitle: "Ten outward", formalTitle: "The outward manners of recitation",
    overview: "The second chapter, and the first of its ten manners concerns the state of the reader before anything is opened.",
    moves: [
      { title: "Give the first", body: "The first concerns the state of the reciter: that he be in a state of purity, in a posture of composure and stillness." },
      { title: "Note the ordering", body: "The manners begin with the person and move outward to the act — the state, then the quantity, then the divisions, then the manner of reciting, and so on through the ten." },
      { title: "Give the register", body: "The chapter is practical and is given without argument. It concerns how the act is conducted rather than what it does to the one conducting it." },
      { title: "Say what it makes possible", body: "As with the outward acts of prayer and the rites of the pilgrimage, the outward has to be fixed before an inward account of it can be given. The next chapter presupposes a reader who is doing this." },
    ],
    closer: [
      { title: "Why purity comes first", body: "It is the same instinct as Book 1's first duty of the student — that purification precedes the acquiring of knowledge as ritual purity precedes prayer. Here the act is the reception of speech, and the condition is placed before it in the same way." },
      { title: "What this edition does with the ten", body: "They are practical instructions, complete in themselves and not argued, and several of them concern matters that vary by school and custom. This section presents their ordering and function; the instructions belong to the text." },
    ],
    distinction: ["Two things the outward chapter settles", "The conduct", "How the act is performed, which the next chapter presupposes.", "Not the reception", "What happens in the reader, which the ten manners do not reach."],
    misreading: "Do not treat the outward manners as the whole etiquette. The book's title covers both chapters, and the longer of the two is the inward one.",
    reflection: "Notice that the first instruction is about the reader and not about the book.",
    audit: ["What is my state before I open it?", "Do I have a practice, or only an intention?", "Which of the ten do I keep?", "What do these not reach?"],
    nodes: ["adab-tilawa", "zahir", "quran"],
    model: chain("From the reader outward", "The ten begin with the person.", [["The state", "Purity, composure, stillness.", "support"], ["The measure", "How much, and how it is divided.", "balance"], ["The manner", "How it is recited aloud and in order.", "balance"]]),
  }),
  makeChapter({
    id: 4, shortTitle: "Ten inward", formalTitle: "The inward acts at recitation",
    overview: "The third chapter, and Ghazali lists its ten in a single line before treating them — a sequence that runs from the source of the words to the reader's disavowal of himself.",
    moves: [
      { title: "Give the list", body: "Understanding the origin of the speech; then magnification; then presence of heart; then pondering; then seeking understanding; then clearing away the impediments to understanding; then specification; then being affected; then ascending; then disavowal." },
      { title: "Note the shape", body: "The first two concern what the text is and whose it is. The middle five concern the reader's attention and equipment. The last three concern what happens to him." },
      { title: "Note what is not in the list", body: "Nothing about quantity, speed, memorisation, or voice. Every item is a state or an operation, and none of them can be observed from outside." },
      { title: "Say what the list is for", body: "As with the six meanings of prayer and the eight duties of alms, ten separable items make diagnosis possible: a reader whose recitation is flat can ask which of the ten is missing rather than concluding that he lacks reverence." },
    ],
    closer: [
      { title: "The sixth item", body: "Clearing away the impediments to understanding is the only one of the ten that is stated negatively, and it is placed in the middle. Pondering and seeking understanding come before it, which implies that a reader discovers his impediments by attempting the work rather than before it." },
      { title: "Why disavowal is last", body: "The sequence ends by having the reader disclaim the state he has just reached. Nothing is left standing as an achievement, which is the same move Book 5 makes with counting a gift small and Book 37 with al-Susi's saying about a sincerity that needs a sincerity." },
    ],
    distinction: ["Two ways to describe what reading requires", "Ten separable items", "Each with its own account, so a failure can be located.", "Reverence in general", "A single quality that can be lamented but not diagnosed."],
    misreading: "Do not treat the ten as stages to be completed in order. They are listed in an order and treated in it, but the sixth presupposes the fourth and fifth, so the sequence is not a ladder.",
    reflection: "Before reading further, guess which of the ten fails first for you.",
    audit: ["Which of the ten do I have?", "Which fails first?", "Have I diagnosed generally?", "Which of them could anyone observe?"],
    nodes: ["ashara", "quran", "tadabbur"],
    model: chain("Ten, in three groups", "The last three are not done but undergone.", [["What it is", "Its origin, and the magnification of its speaker.", "support"], ["The reader's part", "Presence, pondering, understanding, clearing impediments, specification.", "support"], ["What follows", "Being affected, ascending, and disavowal.", "balance"]]),
  }),
  makeChapter({
    id: 5, shortTitle: "Clothed in letters", formalTitle: "The first act: where the speech came from",
    overview: "The first inward act, and it is a piece of doctrine rather than an instruction — an account of what a reader is holding.",
    moves: [
      { title: "State the act", body: "Understanding the greatness of the speech and its loftiness, and God's favour and kindness to His creation in its descending from the throne of His majesty to the level of His creatures' understanding." },
      { title: "Give the difficulty", body: "Let him consider how He was kind to His creatures in conveying the meanings of His speech — which is a pre-eternal attribute subsisting in His essence — to the understandings of His creatures." },
      { title: "Give the solution", body: "And how that attribute was disclosed to them within the folds of letters and sounds, which are attributes of human beings — since a human being is unable to reach the understanding of God's attributes except by the means of his own attributes." },
      { title: "Say what the clothing is for", body: "And had the very reality of the majesty of His speech not been veiled with the clothing of letters, no throne or earth would have withstood the hearing of it, and what is between them would have been annihilated by the greatness of His authority and the effulgences of His light." },
    ],
    closer: [
      { title: "The example he reaches for", body: "And had God not steadied Moses, he would not have borne it. The instance is chosen because it is the one case in which the clothing was partly removed, and the recorded result was that a mountain and a man could not sustain it." },
      { title: "What the doctrine does to the reader", body: "It inverts the ordinary sense of the letters as a limitation. On this account the alphabet is not what the speech had to be reduced to but what makes it survivable — which changes what a reader takes himself to be handling when he opens it." },
    ],
    distinction: ["Two ways to see the letters", "A mercy", "A clothing without which the speech could not be borne, which is Ghazali's account.", "A limitation", "A reduction of something greater to what words can carry, which the passage inverts."],
    misreading: "Do not treat this as an ornament before the practical items. It is the first of the ten because everything after it depends on what a reader takes the text to be.",
    reflection: "Notice that the argument makes the ordinariness of the words the difficult thing to explain, not the meanings.",
    audit: ["What do I take this to be?", "Are the letters a limit or a mercy?", "Could a human reach it otherwise?", "What does the first act change?"],
    nodes: ["kalam", "ashara", "quran"],
    model: pair("Two accounts of the same words", "The first inverts the second.", [["A clothing", "Without which no throne or earth would have withstood the hearing.", "support"], ["A reduction", "Something great made small enough for words, which the passage denies.", "warning"]]),
  }),
  makeChapter({
    id: 6, shortTitle: "Magnify, and be present", formalTitle: "The second and third acts",
    overview: "The two acts that follow from the first, and both of them are conditions of attention rather than achievements of it.",
    moves: [
      { title: "Give the second", body: "Magnifying the speaker. The reciter, at the beginning of reciting, should bring into his heart the greatness of the one speaking." },
      { title: "Note what it follows from", body: "It follows from the first act rather than being commanded independently. A reader who has understood where the speech came from has the second act available to him; one who has not, does not." },
      { title: "Give the third", body: "Presence of heart, which Book 4 defined as the heart being emptied of what it is not engaged in, so that thought does not roam elsewhere." },
      { title: "Note the cross-reference", body: "The definition is not restated here. Ghazali treats presence of heart as settled by the Book of Prayer and imports it, which is how the quarter is built to be read." },
    ],
    closer: [
      { title: "Why magnification cannot be commanded directly", body: "Book 4 showed with a single example that a man may address his servant attentively and comprehendingly with no reverence in it at all. Reverence is not produced by attention, which is why the first act — about what the text is — has to come before the second." },
      { title: "What the ordering implies", body: "Three acts in, nothing has been asked of the reader that concerns the text's content. The first three are about what he takes himself to be holding and whether he is present to it, and only the fourth turns to the words." },
    ],
    distinction: ["Two ways to arrive at magnification", "From understanding", "Knowing what the speech is, from which the magnification follows.", "By resolving", "Deciding to revere, which Book 4 showed attention does not produce."],
    misreading: "Do not read presence of heart here as a higher bar than in Book 4. Ghazali imports the definition, and there the threshold was that thought is not roaming, not that a reader is absorbed.",
    reflection: "Notice that three acts pass before anything is asked about what the words say.",
    audit: ["Have I understood before trying to revere?", "Is my thought roaming?", "Where is presence of heart defined?", "What has been asked of me so far?"],
    nodes: ["tazim", "hudur", "ashara"],
    model: chain("The first three, in order", "Each makes the next available.", [["Its origin", "What the speech is, and how it came to be in letters.", "support"], ["Magnification", "Which follows from the first rather than being commanded.", "support"], ["Presence", "Thought not roaming, as the Book of Prayer defined it.", "support"]]),
  }),
  makeChapter({
    id: 7, shortTitle: "And what blocks it", formalTitle: "Pondering, understanding, and the impediments",
    overview: "The middle three acts, and the third of them is the only item in the list stated as a removal.",
    moves: [
      { title: "Give the fourth", body: "Pondering, which is beyond presence of heart — for a reader may be present with the words without turning them over, and pondering is the turning." },
      { title: "Give the fifth", body: "Seeking understanding, which is the deliberate pursuit of what is meant. Ghazali separates it from pondering as Book 4 separates understanding the meaning from presence with the utterance." },
      { title: "Give the sixth", body: "Clearing away the impediments to understanding. The item is stated negatively, and it assumes that a reader who has attempted the fourth and fifth will have met something in the way." },
      { title: "Note the discovery", body: "The impediments are placed after the attempt rather than before it. A reader finds out what blocks his understanding by trying to understand, which is why this item could not have come earlier in the list." },
    ],
    closer: [
      { title: "What the impediments are", body: "Ghazali treats them as things in the reader rather than in the text — among them attachment to a school, a settled opinion, a sin persisted in, and a conviction that the outward exegesis is all there is. The last of these is what the fourth chapter takes up at length." },
      { title: "Why removal is a separate act", body: "The first five items add something. This one takes something away, and it is placed where it is because addition does not work while the impediment is in place. It is the same structure as Book 3's principle that clearing is the first half and a condition of the second." },
    ],
    distinction: ["Two ways to find an impediment", "By attempting", "Meeting the obstruction in the course of the work, which is where the list places it.", "By inventory", "Listing possible obstructions in advance, which would put the sixth item before the fourth."],
    misreading: "Do not read the impediments as difficulties in the text. Every one of them is in the reader, which is why removing them is his act and not a matter of better sources.",
    reflection: "Try the fourth and fifth acts on one verse and notice what you meet.",
    audit: ["What did I meet when I tried?", "Is the obstruction in me or in the text?", "Have I added while something was in the way?", "Which impediment is mine?"],
    nodes: ["tadabbur", "mawani", "ashara"],
    model: chain("Attempt, then remove", "The order is the point.", [["Ponder", "Turning the words over, beyond being present with them.", "support"], ["Seek the meaning", "The deliberate pursuit of what is meant.", "support"], ["Meet the obstruction", "Which is discovered by attempting, not listed in advance.", "balance"], ["Clear it", "The one item stated as a removal.", "support"]]),
  }),
  makeChapter({
    id: 8, shortTitle: "Addressed to you", formalTitle: "The seventh act: specification",
    overview: "The item that changes what reading is, and it is stated as a stance the reader takes toward every sentence.",
    moves: [
      { title: "State the act", body: "Specification — that the reader take himself to be the one meant by every address in the Quran, so that a command is a command to him and a warning is a warning to him." },
      { title: "Note what it displaces", body: "The default stance is that a text describes people, and that a reader may locate himself among them or not. This act removes that option in advance." },
      { title: "Say what it produces", body: "The three acts that follow — being affected, ascending, and disavowal — are all responses, and none of them is available to a reader who has taken the address to be about somebody else." },
      { title: "Note where it sits", body: "It is placed after the equipment and before the responses, which is exactly where a stance would have to go: after a reader can understand what is said, and before anything can happen to him because of it." },
    ],
    closer: [
      { title: "Why it is an act and not a feeling", body: "Ghazali lists it among things a reader does. Taking oneself to be addressed is a decision about how to read, available to anyone at any point in a text, and it is not the same as being moved — which is the item after it." },
      { title: "The relation to the fourth chapter", body: "A reader who takes every address personally is doing something the fourth chapter will have to distinguish carefully from reading his own concerns into the text. The difference is the direction: specification asks what this says to me, and the forbidden thing supplies what I already hold." },
    ],
    distinction: ["Two stances toward an address", "Specified", "Every command is to me and every warning is of me, decided in advance.", "Described", "The text speaks of people, among whom I may or may not be, which is the default."],
    misreading: "Do not confuse this with finding your own views in the text. Specification is about who is addressed and changes nothing about what is said, which is precisely what the fourth chapter forbids changing.",
    reflection: "Read one verse of warning and notice whether you place yourself inside or outside it.",
    audit: ["Am I addressed, or described?", "Where do I place myself in a warning?", "Is this a stance or a feeling?", "How does it differ from finding my views?"],
    nodes: ["takhsis", "ashara", "tafsir"],
    model: pair("Two readings of one sentence", "Nothing about the sentence changes.", [["Addressed to me", "A command to me and a warning of me, decided before reading.", "support"], ["About people", "Among whom I may locate myself, which leaves the responses unavailable.", "balance"]]),
  }),
  makeChapter({
    id: 9, shortTitle: "And then disavow it", formalTitle: "The last three acts",
    overview: "The three items that are undergone rather than performed, and the last of them takes back what the other two produced.",
    moves: [
      { title: "Give the eighth", body: "Being affected — that the reader's state change with what he reads, so that he grieves at what warns and expands at what promises." },
      { title: "Give the ninth", body: "Ascending — that he rise from hearing the speech from himself, to hearing it from the one who spoke it, which is the highest of the states of reading." },
      { title: "Give the tenth", body: "Disavowal — that he disavow his own power and strength, and not look upon himself with satisfaction or purity." },
      { title: "Note what the tenth does", body: "It is placed immediately after the ninth, which is the peak of the sequence. Whatever the ninth produced is disclaimed by the tenth, so the list cannot terminate in a state the reader owns." },
    ],
    closer: [
      { title: "Why the ninth is described as hearing", body: "The whole sequence has been converting a reader into a hearer: the first act says the words are speech, the seventh says they address him, and the ninth removes the last trace of his being the source. Reading ends by not being reading." },
      { title: "The pattern across the quarter", body: "Alms ends its duties by having the giver count the gift small. Fasting ends its six by suspending the faster between fear and hope. This ends its ten by disavowal. No book in the quarter lets its own sequence finish in an attainment." },
    ],
    distinction: ["Two ways a sequence can end", "In disavowal", "The state reached, and then disclaimed, so that nothing is owned.", "In attainment", "The peak held as a result, which none of this quarter's sequences permits."],
    misreading: "Do not read disavowal as undoing the ninth act. What is disclaimed is the reader's power and his satisfaction in it, not the state itself.",
    reflection: "Notice what happens in you when a reading goes well, and where the tenth item is aimed.",
    audit: ["Does my state change with what I read?", "From whom am I hearing it?", "What do I do with a good reading?", "What exactly is disclaimed?"],
    nodes: ["taathur", "taraqqi", "tabarri"],
    model: chain("The last three", "The peak is immediately disclaimed.", [["Affected", "The state changing with what is read.", "support"], ["Ascending", "Hearing it from the speaker rather than from oneself.", "support"], ["Disavowal", "Of one's own power, and of satisfaction in the state.", "balance"]]),
  }),
  makeChapter({
    id: 10, shortTitle: "The objection", formalTitle: "But what about interpreting by opinion?",
    overview: "The fourth chapter opens by putting the reader's objection in his mouth, and it is a serious one that had produced real accusations.",
    moves: [
      { title: "Put the objection", body: "Perhaps you will say: you have made much in what preceded of understanding the secrets of the Quran and what is disclosed to the possessors of pure hearts of its meanings. How is that recommended, when he said: whoever interprets the Quran by his opinion, let him take his seat in the Fire?" },
      { title: "Give the live controversy", body: "And on this account the people of the outward exegesis denounced the deficient ones ascribed to Sufism, for interpreting words of the Quran contrary to what is transmitted from Ibn Abbas and the rest of the exegetes — and held it to be unbelief." },
      { title: "State the dilemma", body: "So if what the people of exegesis said is sound, what is the meaning of understanding the Quran beyond memorising its exegesis? And if that is not sound, what is the meaning of the report threatening whoever interprets by his opinion?" },
      { title: "Note that he takes both horns seriously", body: "Neither side is dismissed. The report is not weakened and the exegetes' concern is not belittled, which is what makes the chapter an argument rather than a defence." },
    ],
    closer: [
      { title: "Why the objection had force", body: "The charge was not of error but of unbelief, and it was being made by named authorities against a named group. Ghazali was writing as someone who could be placed on either side of it, and the third chapter of this book had just given the accusers their material." },
      { title: "How the chapter proceeds", body: "First he shows that the strict position cannot be right, from reports the exegetes themselves accept. Then he says what the prohibition does forbid. The order matters: the licence is established before the limits are drawn." },
    ],
    distinction: ["Two ways to face a threatening report", "Determine its scope", "Asking what it forbids, which leaves it in full force where it applies.", "Weaken it", "Which Ghazali does not do, and which would have been the easier route."],
    misreading: "Do not read the chapter as a defence of the Sufis. Ghazali calls the ones being denounced deficient, and the second half of the chapter forbids a practice he says preachers use for sound aims.",
    reflection: "Notice that the objection is one the previous chapter genuinely raises, and that Ghazali raises it himself.",
    audit: ["Did the third chapter raise this for me?", "Which horn had I taken?", "Is the report being weakened?", "Who is being defended here?"],
    nodes: ["tafsir", "ray", "quran"],
    model: pair("Two horns of one dilemma", "Both are taken seriously.", [["The exegetes are right", "Then understanding is memorising, and the third chapter is empty.", "warning"], ["They are not", "Then the threatening report has no application, which he will not accept.", "warning"]]),
  }),
  makeChapter({
    id: 11, shortTitle: "The limit of himself", formalTitle: "That the transmitted sense is not the only sense",
    overview: "The answer's first half, and its opening sentence is one of the sharpest things Ghazali writes about anyone.",
    moves: [
      { title: "Give the sentence", body: "Whoever claims that the Quran has no meaning except what the outward exegesis translates is informing about the limit of himself." },
      { title: "Give the concession", body: "He is right in informing about himself — but wrong in ruling that all creation be reduced to his degree, which is his limit and his stopping-place." },
      { title: "Give the evidence", body: "Ali said: except that God gives a servant an understanding in the Quran — and if there were nothing but the transmitted translation, what is that understanding? And it was said: the Quran has an outward and an inward, a limit and a place of ascent." },
      { title: "Give the rest", body: "Ali said that if he wished he could load seventy camels with the exegesis of the Opening of the Book — and the exegesis of its outward is extremely brief. And Abu al-Darda' said: a man does not become deeply learned until he assigns to the Quran several faces." },
    ],
    closer: [
      { title: "Why the evidence is chosen as it is", body: "Every one of these authorities is accepted by the people of the outward exegesis. Ghazali argues from Ali, from Ibn Mas'ud, and from Abu al-Darda' rather than from the Sufis, so the strict position is refuted on its own sources." },
      { title: "The conclusion he draws", body: "So it is invalid that transmission be a condition of interpretation, and it is permitted for everyone to draw out from the Quran according to the measure of his understanding and the limit of his intellect. The licence is general and is stated before any restriction." },
    ],
    distinction: ["Two claims about the transmitted exegesis", "It is what I can reach", "True, and a report about the speaker, which Ghazali grants.", "It is all there is", "A ruling about everyone, which the reports from the exegetes' own authorities refute."],
    misreading: "Do not take the licence as a licence to disregard the transmitted exegesis. The second half of the chapter makes ignorance of it one of the two things the prohibition forbids.",
    reflection: "Notice that the argument is made entirely from sources the opposing side accepts.",
    audit: ["Have I made my limit a rule?", "Whose sources would persuade my opponent?", "What is the licence, exactly?", "What has not yet been said?"],
    nodes: ["fahm", "tafsir", "batin"],
    model: pair("One claim, two scopes", "The first is granted and the second refuted.", [["About himself", "An accurate report of what he can reach.", "balance"], ["About everyone", "A ruling reducing all readers to his stopping-place.", "warning"]]),
  }),
  makeChapter({
    id: 12, shortTitle: "Two things forbidden", formalTitle: "What the prohibition actually forbids",
    overview: "The answer's second half, and it is exact: the report is given a definite scope, and one of the practices it catches is a respectable one.",
    moves: [
      { title: "Give the first aspect", body: "That he has an opinion in a matter, and an inclination toward it from his nature and his whim, so he interprets the Quran in agreement with his opinion in order to argue for his aim — and had he not had that opinion, that meaning would not have appeared to him from the Quran." },
      { title: "Give its varieties", body: "Sometimes with knowledge, as one who argues from a verse to validate his innovation while knowing the verse does not mean it. And sometimes with ignorance: when a verse admits several senses, his understanding inclines to the one that agrees with his aim, and he prefers that side by his opinion." },
      { title: "Give the third variety", body: "And sometimes he has a sound aim and seeks an evidence for it from the Quran, arguing from what he knows was not intended — like one who calls to seeking forgiveness before dawn and argues from the report about the pre-dawn meal, claiming a meal of remembrance is meant while knowing that eating is meant." },
      { title: "Give the second aspect", body: "That he hastens to interpret the Quran by the outward of the Arabic, without seeking support from transmission in what relates to the strange words of the Quran and the like." },
    ],
    closer: [
      { title: "The line that implicates the preachers", body: "This kind is sometimes used by preachers for sound aims, to beautify the speech and encourage the hearer — and it is forbidden. He names an ordinary and well-meant practice, gives its motive as sound, and forbids it anyway." },
      { title: "The test the two aspects supply", body: "Together they make a checkable question. Did the reading come from the text, or from something you already held that then went looking? And do you have the transmitted equipment for the words in front of you? Neither question asks whether the conclusion is true." },
    ],
    distinction: ["Two things that can produce a reading", "The text", "The words leading somewhere, which is what the licence permits.", "A prior opinion", "Something already held that then found support, which is what the report forbids."],
    misreading: "Do not conclude that a true conclusion is safe. Ghazali's third variety is a person with a sound aim arguing from a verse he knows was not meant for it, and he forbids that explicitly.",
    reflection: "Take a reading you find striking and ask honestly whether you held the view before you found it there.",
    audit: ["Did the text lead me, or did I lead it?", "Would I have seen this without the view?", "Do I have the transmitted equipment?", "Have I done this for a sound aim?"],
    nodes: ["ray", "hawa", "tafsir"],
    model: pair("Two aspects of one prohibition", "Neither asks whether the conclusion is true.", [["A prior opinion", "The reading produced by what was already held, in three varieties.", "warning"], ["Without the equipment", "Hastening to the Arabic without the transmitted knowledge.", "warning"]]),
  }),
];

export const book08ConceptNodes: ConceptNode[] = [
  ["quran", "The Quran", "Speech, clothed", "A pre-eternal attribute conveyed within letters, which is what makes it bearable."],
  ["structure", "Four chapters", "Moving inward", "Excellence, outward manners, inward acts, and then a dispute."],
  ["taqsir", "Falling short", "Named in the praise", "The only book in the quarter whose opening chapter includes the reproach."],
  ["adab-tilawa", "Outward manners", "Ten", "Beginning with the state of the reader before anything is opened."],
  ["zahir", "The outward", "Fixed first", "As with prayer and pilgrimage, the inward account presupposes it."],
  ["ashara", "Ten inward acts", "Separable", "So that a flat reading can be diagnosed rather than lamented."],
  ["kalam", "The speech", "Its origin", "Veiled in letters, without which no throne or earth would have withstood it."],
  ["tazim", "Magnification", "Not commanded", "It follows from understanding what the speech is, and attention will not make it."],
  ["hudur", "Presence of heart", "Imported", "Defined in the Book of Prayer and carried here without restating."],
  ["tadabbur", "Pondering", "Beyond presence", "Turning the words over, which being present with them does not do."],
  ["mawani", "The impediments", "Found by attempting", "In the reader, not the text, and discovered in the course of the work."],
  ["takhsis", "Specification", "A stance", "Taking every address to be to you, decided before reading rather than felt."],
  ["taathur", "Being affected", "The eighth", "The state changing with what is read."],
  ["taraqqi", "Ascending", "Hearing from Him", "The reader ceasing to be the source of the words."],
  ["tabarri", "Disavowal", "The tenth", "The peak disclaimed, so that nothing is owned."],
  ["tafsir", "Interpretation", "The fourth chapter", "Raised because the third chapter makes the objection unavoidable."],
  ["ray", "Opinion", "Given a scope", "The report is not weakened; it is told exactly what it forbids."],
  ["fahm", "Understanding", "Permitted to all", "Each may draw out according to the measure of his understanding."],
  ["batin", "The inward sense", "On their own sources", "Argued from Ali, Ibn Mas'ud, and Abu al-Darda', whom the exegetes accept."],
  ["hawa", "Whim", "The first aspect", "A reading produced by what was already held, in three varieties."],
].map(([id, label, kicker, description], index) => ({ id, label, kicker, description, position: ["left", "right", "top", "bottom"][index % 4] }));

const node = (id: string, label: string, micro: string, summary: string, guardrail: string, chapterId: number, glyph: Journey["nodes"][number]["glyph"]): Journey["nodes"][number] => ({ id, label, micro, summary, guardrail, chapterId, glyph });

export const book08Journeys: Journey[] = [
  {
    id: "what-am-i-holding", number: "01", question: "What am I actually holding?", title: "Start where the ten start",
    description: "Take the first three inward acts, find why the letters are described as a mercy rather than a limitation, and see why magnification cannot be commanded.",
    payoff: "You get the doctrine the other seven acts depend on, and an inversion of how the words are usually seen.",
    image: assetUrl("assets/system/book08-clothed-letters.jpg"), imageAlt: "A closed book on a plain lectern with a folded cloth laid over it, the cloth thin enough to show the shape beneath.", minutes: 11, color: "#278d91",
    nodes: [
      node("four-chapters", "See the shape", "Ending in a dispute", "Outward manners, inward acts, and then the objection they raise.", "The fourth chapter is what makes the third usable.", 1, "order"),
      node("praise-and-blame", "Note the pairing", "Both in one chapter", "The excellence and the blame of falling short, given together.", "Which closes the route of praising instead of practising.", 2, "clear"),
      node("the-clothing", "Take the doctrine", "Veiled in letters", "Without which no throne or earth would have withstood the hearing.", "The ordinariness of the words is what needs explaining.", 5, "know"),
      node("moses", "Note the instance", "Had God not steadied him", "The one case where the clothing was partly removed.", "A mountain and a man could not sustain it.", 5, "witness"),
      node("not-commanded", "See why order matters", "Magnification follows", "It comes from understanding, and attention will not produce it.", "Book 4 settled that with the servant example.", 6, "pattern"),
    ],
  },
  {
    id: "how-to-read", number: "02", question: "What does reading actually require?", title: "Work the middle of the list",
    description: "Take pondering and understanding apart, find the one item stated as a removal and why it comes after the attempt, and meet the stance that changes what every sentence is.",
    payoff: "You get a diagnosis for a flat reading, and a decision you can make before opening anything.",
    image: assetUrl("assets/system/book08-addressed.jpg"), imageAlt: "An opened letter lying on a table with its envelope beside it, the name on the envelope turned away from view.", minutes: 12, color: "#bf7a35",
    nodes: [
      node("the-ten", "Take the list", "Ten separable items", "None of them about quantity, speed, or voice.", "Separable, so a failure can be located.", 4, "order"),
      node("ponder", "Separate two", "Present, or turning it over", "Pondering is beyond being present with the words.", "The same separation Book 4 makes for prayer.", 7, "diagnose"),
      node("the-obstruction", "Find the impediment", "By attempting", "Placed after the fourth and fifth, not before them.", "Which is why it could not come earlier in the list.", 7, "clear"),
      node("in-the-reader", "Locate it", "Not in the text", "Attachment to a school, a settled opinion, a sin persisted in.", "Which is why removing it is the reader's act.", 7, "witness"),
      node("specified", "Take the stance", "Addressed to you", "Every command to me and every warning of me, decided in advance.", "A decision about how to read, not a feeling.", 8, "steady"),
      node("then-disavow", "Note the ending", "Disclaimed", "The peak reached and then disavowed, so nothing is owned.", "No sequence in this quarter ends in an attainment.", 9, "balance"),
    ],
  },
  {
    id: "how-much-may-i-find", number: "03", question: "How much am I allowed to find in it?", title: "Give the prohibition a scope",
    description: "Put the objection the third chapter raises, watch Ghazali refute the strict position from its own sources, and take the two things the threatening report actually forbids.",
    payoff: "You leave with a licence and two checkable tests, neither of which asks whether your conclusion is true.",
    image: assetUrl("assets/system/book08-two-lamps.jpg"), imageAlt: "A single lamp on a desk lighting an open book, and a second lamp behind the reader's chair casting a shadow across the page.", minutes: 13, color: "#c25f50",
    nodes: [
      node("the-objection", "Put the objection", "A seat in the Fire", "The third chapter recommends what a famous report appears to forbid.", "Raised by Ghazali himself, in the reader's voice.", 10, "know"),
      node("both-horns", "Take both horns", "Neither dismissed", "The report is not weakened and the exegetes are not belittled.", "Which is what makes it an argument, not a defence.", 10, "balance"),
      node("the-limit", "Take the sentence", "The limit of himself", "Right about himself, wrong to rule all creation to his stopping-place.", "The sharpest thing in the book.", 11, "clear"),
      node("their-sources", "Note the sources", "Ali and Abu al-Darda'", "Refuted from authorities the strict side accepts.", "Not from the Sufis, deliberately.", 11, "pattern"),
      node("the-licence", "Take the licence", "By the measure of his understanding", "Permitted to everyone, and stated before any restriction.", "Transmission is not a condition of interpretation.", 11, "receive"),
      node("two-aspects", "Take the two tests", "Where did it come from", "A prior opinion that went looking; or the Arabic without the equipment.", "Neither test asks whether the conclusion is true.", 12, "guard"),
    ],
  },
];

export const book08Movements: TaxonomyGroup[] = [
  ["bab1", "1. The excellence of the Quran and its people", "The praise, and the blame of those falling short, in one chapter.", [1, 2]],
  ["bab2", "2. The outward manners of recitation", "Ten, beginning with the state of the reader.", [3]],
  ["bab3", "3. The inward acts at recitation", "Ten, from the origin of the speech to the disavowal of the reader.", [4, 5, 6, 7, 8, 9]],
  ["bab4", "4. Understanding and interpretation", "The objection, the refutation of the strict position, and the scope of the prohibition.", [10, 11, 12]],
].map(([id, label, description, chapterIds], index) => ({ id, label, description, chapterIds, color: ["#bf7a35", "#278d91", "#c25f50", "#586fa8"][index % 4] })) as TaxonomyGroup[];

export const book08Instrument: Instrument = {
  title: "Where did that reading come from",
  note: "Ghazali permits everyone to draw meanings from the Quran according to the measure of his understanding, and then gives the prohibition on interpreting by opinion an exact scope: two things, neither of which is inference. Take one interpretation you actually hold, or one you have heard and repeated, and answer honestly.",
  items: [
    {
      id: "reading", label: "One interpretation you hold", lede: "A specific reading of a specific verse",
      note: "Both questions are Ghazali's own tests. Notice what neither of them asks: whether the conclusion is true. His third variety of the forbidden case is a person with an entirely sound aim arguing from a verse he knows was not meant for it, and he forbids that in the same breath as he forbids the dishonest kind.",
      axes: [
        {
          id: "source", kicker: "The first aspect", question: "Where did the reading come from?",
          options: [
            { id: "text", label: "The words led me there", note: "The case his licence covers: drawing out by the measure of one's understanding." },
            { id: "opinion", label: "I held the view first, then found it there", note: "His first aspect: had he not had that opinion, that meaning would not have appeared to him." },
            { id: "aim", label: "I wanted to make a point and looked for support", note: "His third variety, which he forbids even where the aim is sound." },
            { id: "heard", label: "Someone I trust told me it means that", note: "Which is transmission of a sort, and the second question decides what kind." },
          ],
        },
        {
          id: "equipment", kicker: "The second aspect", question: "What stands behind it?",
          options: [
            { id: "naql", label: "The transmitted exegesis supports it", note: "The equipment whose absence is his second forbidden aspect." },
            { id: "arabic", label: "The Arabic supports it; I checked nothing else", note: "Hastening to the outward of the Arabic without seeking support from transmission." },
            { id: "neither", label: "Neither — it simply struck me", note: "Which the licence may still cover, depending on the first answer." },
            { id: "contrary", label: "I know the transmitted sense is something else", note: "The case he illustrates with the pre-dawn meal and with Pharaoh." },
          ],
        },
      ],
      verdicts: [
        { key: "*|contrary", name: "The variety he illustrates twice", role: "warning", chapterId: 12, body: "Ghazali gives two examples of exactly this and both are well-meant: one who calls to seeking forgiveness before dawn and argues from the report about the pre-dawn meal, claiming a meal of remembrance is meant while knowing that eating is meant; and one who calls to striving against a hard heart by pointing at his own chest and saying, go to Pharaoh, he has transgressed.", action: "His judgement on it is the uncomfortable part: this kind is sometimes used by preachers for sound aims, to beautify the speech and encourage the hearer — and it is forbidden. A true point and a good motive do not license it, because what is being misused is the claim that this is what the verse says." },
        { key: "opinion|*", name: "The first aspect exactly", role: "warning", chapterId: 12, body: "Ghazali's test is counterfactual and you have just answered it: had he not had that opinion and that inclination, that meaning would not have appeared to him from the Quran. He notes that this happens with knowledge and also with ignorance — where a verse admits several senses and the understanding simply inclines to the one that suits.", action: "The remedy is not to abandon the view but to stop resting it here. Ask what the words would have led someone to who did not hold it, and whether the verse admits other senses that you passed over. If the reading survives that, it has a different source than the one you named." },
        { key: "aim|*", name: "A sound aim is not the question", role: "warning", chapterId: 12, body: "This is the third of his varieties: a person with a sound aim who seeks an evidence for it from the Quran and argues from what he knows was not intended by it. Ghazali places it alongside the dishonest cases rather than excusing it.", action: "Make the point on its own ground. What is forbidden is not the aim and not the conclusion but the claim that the text says it — and Ghazali is explicit that preachers do this for good ends and that it remains forbidden. Note also that he says the Batinites use the same device for corrupt ends, which is why the form of the move matters." },
        { key: "*|arabic", name: "The second aspect", role: "warning", chapterId: 12, body: "His second forbidden case: that a person hastens to interpret the Quran by the outward of the Arabic, without seeking support from transmission in what relates to the strange words of the Quran and the like. This is a charge of insufficient equipment rather than of bad faith.", action: "It is also the most repairable. The transmitted exegesis is where the vocabulary, the occasions, and the settled senses are held, and Ghazali makes ignorance of it one of only two things the report forbids — which means consulting it is not a restriction on understanding but a condition of it." },
        { key: "text|naql", name: "Squarely inside the licence", role: "support", chapterId: 11, body: "Ghazali's conclusion, stated before any restriction: it is invalid that transmission be a condition of interpretation, and it is permitted for everyone to draw out from the Quran according to the measure of his understanding and the limit of his intellect. You have the text leading and the transmitted sense behind it.", action: "Hold the licence with its scale. He carries the sayings that every verse has many understandings and that a man is not deeply learned until he assigns the Quran several faces — so a reading that fits the transmitted sense is not the last word on the verse, and finding more is what the third chapter's ten acts are for." },
        { key: "text|neither", name: "The case the licence was written for", role: "support", chapterId: 11, body: "The words led you and there is nothing behind it but your reading. This is precisely what the strict position would forbid, and Ghazali's answer is that whoever claims the Quran has no meaning but what the outward exegesis translates is informing about the limit of himself — right about himself, wrong to rule everyone to his stopping-place.", action: "One caution stands, and it is his second aspect rather than his first: check that the words in question are not among those needing transmitted knowledge to be read at all. That is not a restriction on what you may find; it is about having the equipment for the sentence in front of you." },
        { key: "heard|*", name: "Whose reading is it", role: "balance", chapterId: 12, body: "A reading received rather than reached. Ghazali's two tests are about how an interpretation came to be held, so a received one passes them only if the person you received it from would pass them — which you may not be able to establish.", action: "The useful move is to make it yours or set it down. Take the verse and the ten acts of the third chapter and see whether the words lead you there; and check the second aspect independently, since the transmitted exegesis is public and does not depend on who told you." },
        { key: "*|*", name: "Read the source with the equipment", role: "balance", chapterId: 12, body: "Where the reading came from, and what stands behind it. Ghazali's two aspects are independent — one is about motive and one about equipment — and a reading can fail either without failing the other.", action: "Take them in his order. The first asks whether the text led you or you led it, which is a counterfactual question and answerable honestly. The second asks whether you have what the sentence requires. Neither asks whether you are right, which is the thing to notice about both of them." },
      ],
    },
  ],
};

export const book08Sources: SourceLink[] = [
  { label: "Primary Arabic text", note: "The complete public Arabic of Book 8 was read and used to establish the four chapters, the ten outward manners, the ten inward acts, and the treatment of interpretation by opinion.", url: "https://shamela.ws/book/9472/272" },
  { label: "The outward manners", note: "The chapter giving ten manners of recitation, beginning with the state of the reciter before anything is opened.", url: "https://shamela.ws/book/9472/275" },
  { label: "The ten inward acts", note: "The passage listing the ten and treating the first, on the greatness of the speech and its descent into the clothing of letters.", url: "https://shamela.ws/book/9472/280" },
  { label: "The objection about opinion", note: "The passage putting the objection that the third chapter appears to recommend what a famous report forbids, and refuting the strict position from the exegetes' own authorities.", url: "https://shamela.ws/book/9472/288" },
  { label: "The scope of the prohibition", note: "The passage giving the two aspects the prohibition falls upon, with the three varieties of the first and the case of the preachers.", url: "https://shamela.ws/book/9472/290" },
  { label: "Forty-book structure", note: "Ghazali.org's listing places Book 8 as the eighth book of the Quarter of Worship and confirms its title.", url: "https://www.ghazali.org/listing-the-forty-books/" },
];

export const book08: SystemBook = {
  id: 8,
  title: "The Etiquette of Quran Recitation",
  shortTitle: "Quran Recitation",
  defaultJourneyId: "what-am-i-holding",
  chapters: book08Chapters,
  conceptNodes: book08ConceptNodes,
  journeys: book08Journeys,
  sources: book08Sources,
  taxonomy: {
    title: "Four chapters",
    note: "Ghazali's own four, in his order, moving steadily inward. The last is a dispute rather than an instruction, and it exists because the third chapter raises an objection that a famous report appears to settle against it.",
    groups: book08Movements,
  },
  instrument: book08Instrument,
  editorialNote: "The three journeys, twelve reading sections, visual models, and diagnostic are editorial learning aids. The sections follow Ghazali's four chapters in his order and are grouped under them in the movements list. The English is an original synthesis made from a reading of the public Arabic text, not a translation and not a substitute for one. Reports and inherited anecdotes are presented as material Ghazali transmitted; this prototype does not independently grade every narration, and the Arabic carries the graders' notes alongside several used here, including the report on interpreting by opinion, which the editor of the printed text marks as uncommon. Two matters should be stated. The second chapter's ten outward manners are practical instruction, and several of them touch matters that vary between schools of law and local custom; this edition presents their ordering and function rather than reproducing them. And the fourth chapter is a substantive and contested position, not a neutral summary: Ghazali argues that the transmitted exegesis is not the only sense of the Quran, that everyone may draw meanings from it according to his understanding, and that the report threatening those who interpret by opinion forbids two specific things — a reading produced by a prior opinion, and interpretation of what requires transmitted knowledge without it. That is his argument and it is presented as his. This edition does not adjudicate it, and nothing here is a warrant for any particular interpretation of any verse; readers wanting the transmitted exegesis should go to works of exegesis. The diagnostic applies his own two tests to a reading the reader supplies. Neither test asks whether an interpretation is correct, and the diagnostic cannot say whether one is.",
};
