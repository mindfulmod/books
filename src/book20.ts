import { assetUrl } from "./assetUrl";
import type { Chapter, ConceptNode, VisualModel } from "./data";
import type { Instrument, Journey, SourceLink, SystemBook, TaxonomyGroup } from "./systemTypes";

type Seed = { id: number; shortTitle: string; formalTitle: string; overview: string; moves: Array<{ title: string; body: string }>; closer: Array<{ title: string; body: string }>; distinction: [string, string, string, string, string]; misreading: string; reflection: string; audit: string[]; nodes: string[]; model: VisualModel };
const bab = (id: number) => (id <= 4 ? "the preamble and the announced order" : id === 13 ? "the concluding exposition, on the signs of his truthfulness" : "the expositions of his character and manners");
const makeChapter = (seed: Seed): Chapter => ({
  id: seed.id, shortTitle: seed.shortTitle, formalTitle: seed.formalTitle, overview: seed.overview,
  points: seed.moves.slice(0, 3).map((m) => m.body), reflection: seed.reflection, relatedNodes: seed.nodes, visualModel: seed.model,
  deep: { thesis: seed.moves[0].body, context: seed.overview, moves: seed.moves, closeReading: seed.closer,
    distinction: { title: seed.distinction[0], firstLabel: seed.distinction[1], first: seed.distinction[2], secondLabel: seed.distinction[3], second: seed.distinction[4] },
    misreading: seed.misreading, observation: seed.reflection, selfAudit: seed.audit,
    sourceAnchor: `Book 20, ${bab(seed.id)}, ${seed.formalTitle}.` },
});
const chain = (title: string, caption: string, items: Array<[string, string, "support" | "balance" | "warning"]>): VisualModel => ({ kind: "chain", title, caption, items: items.map(([label, body, role]) => ({ label, body, role })) });
const pair = (title: string, caption: string, items: Array<[string, string, "support" | "balance" | "warning"]>): VisualModel => ({ kind: "pair", title, caption, items: items.map(([label, body, role]) => ({ label, body, role })) });
const spectrum = (title: string, caption: string, items: Array<[string, string, "support" | "balance" | "warning"]>): VisualModel => ({ kind: "spectrum", title, caption, items: items.map(([label, body, role]) => ({ label, body, role })) });

export const book20Chapters: Chapter[] = [
  makeChapter({
    id: 1, shortTitle: "The index", formalTitle: "The manners of the outward, and what they are a title to",
    overview: "The preamble of the last book of the quarter, and it states in four clauses what the whole quarter has been doing.",
    moves: [
      { title: "Give the thesis", body: "The manners of the outward are the title of the manners of the inward." },
      { title: "Give the direction of causation", body: "And the movements of the limbs are the fruits of thoughts; and acts are the result of character; and manners are the seepage of knowledge; and the secrets of hearts are the planting-grounds of actions and their springs." },
      { title: "Give the mechanism", body: "And the lights of the innermost are what shine upon the outward, so that they adorn it and burnish it, and exchange its ugliness and its faults for excellences." },
      { title: "Give the two consequences", body: "And whoever's heart is not humbled, his limbs are not humbled. And whoever's breast is not a niche for the divine lights, the beauty of the prophetic manners does not overflow onto his outward." },
    ],
    closer: [
      { title: "Why the word is title", body: "An 'unwan is the inscription on the outside of a letter that tells you what is inside. The claim is not that the outward causes the inward or that the two are the same, but that the outward is legible — that a person's manners can be read the way an address can, because they came from somewhere." },
      { title: "What it does to the quarter behind it", body: "Nine books of outward arrangements — eating, marriage, earning, the lawful, companionship, seclusion, travel, listening, enjoining right — are retroactively reframed as legible surfaces rather than as rules. And it prepares the handover: the next quarter is about the inside, and this sentence is the reason the order runs that way." },
    ],
    distinction: ["Two things the outward can be", "A title", "Legible, because it came from an inside that produced it.", "A veneer", "Which the second consequence rules out: an unhumbled heart does not yield humbled limbs."],
    misreading: "Do not read the thesis backwards. It runs from inward to outward — the lights shine out, the fruits come from the thought — and the whole book depends on that direction.",
    reflection: "Ask what someone would read off your manners, and whether it would be accurate.",
    audit: ["Which direction am I working in?", "Would my outward be a true title?", "Is my heart humbled?", "What produced my last act?"],
    nodes: ["unwan", "batin", "zahir"],
    model: chain("The direction of the claim", "Inward to outward, in every clause.", [["The secrets of hearts", "The planting-grounds of actions and their springs.", "support"], ["Thoughts and character", "Whose fruits and results the acts are.", "support"], ["The outward", "Adorned and burnished by the lights of the innermost.", "balance"]]),
  }),
  makeChapter({
    id: 2, shortTitle: "Sealing the quarter", formalTitle: "Why the book is placed last",
    overview: "Ghazali states the plan for this book in the first person, and the reason is practical before it is devotional.",
    moves: [
      { title: "Give the resolve", body: "And I had resolved to seal the Quarter of Customs of this book with a book comprehending the manners of living — so that it should not be hard for one seeking them to extract them." },
      { title: "Note what a portrait does that rules cannot", body: "Nine books have given arrangements piece by piece. One life described whole shows how the pieces sit together in a single person, which no amount of separate treatment supplies." },
      { title: "Give the aim named in the opening praise", body: "God disciplined His prophet Muhammad and perfected his disciplining, and purified his descriptions and his character; then took him as His chosen and His beloved; and granted success in following him to whoever He willed to refine." },
      { title: "Note the handover", body: "The quarter of outward customs ends with a portrait whose stated premise is that the outward is a title to the inward — which is the hinge onto the third quarter, on the destroying faults of the heart." },
    ],
    closer: [
      { title: "The stated reason, and its modesty", body: "So that it should not be hard for one seeking them to extract them. The book exists to save a reader the work of assembling a picture from scattered reports — which places it as a work of arrangement, and explains why so much of it is compiled material rather than argument." },
      { title: "Where the argument is instead", body: "In the preamble, in the first exposition, and in the last. Those three carry the book's reasoning; the eleven between them are the portrait itself, and are meant to be read as evidence rather than as instruction." },
    ],
    distinction: ["Two ways to end a quarter on outward life", "A portrait", "One life shown whole, from which the arrangements can be read together.", "A summary of rules", "Which would repeat the nine books without showing how they cohere."],
    misreading: "Do not treat this as an appendix of edifying stories. The last exposition argues that the portrait is itself the evidence, which makes the compilation the argument rather than an ornament on one.",
    reflection: "Ask what a person would have to see, rather than be told, to learn a way of living.",
    audit: ["Have I read the pieces or the whole?", "What does a portrait show that rules do not?", "Why is this book last?", "What comes next in the Ihya?"],
    nodes: ["structure", "unwan", "iqtida"],
    model: pair("Two things the quarter could have ended with", "Only one of them shows coherence.", [["A portrait", "One life whole, from which the pieces can be read.", "support"], ["A summary", "Repeating nine books without joining them.", "balance"]]),
  }),
  makeChapter({
    id: 3, shortTitle: "He asked for it", formalTitle: "The disciplining by the Qur'an",
    overview: "The first exposition, and its opening sentence quietly settles the question of whether any of this is imitable.",
    moves: [
      { title: "Give the state described", body: "The Messenger of God was much given to humble entreaty and to imploring, constant in asking of God that He adorn him with the excellences of manners and the noblenesses of character." },
      { title: "Give the two supplications", body: "So he would say in his supplication: O God, make my character good, and my form. And he would say: O God, keep me far from reprehensible characters." },
      { title: "Give the answer", body: "And God answered his supplication, in fulfilment of His saying: Call upon Me, and I shall answer you." },
      { title: "Note what the framing establishes", body: "That the character described in the rest of the book is presented as something asked for and given, not as a native endowment. The heading is the disciplining of him by God — the whole portrait is of a person being formed." },
    ],
    closer: [
      { title: "Why this had to come first", body: "A portrait of a perfect character that was simply possessed would be a display and not an example. Opening with the asking makes the entire remainder legible as the answer to a request — which is the only shape in which it could serve the stated purpose of the quarter, which is imitation." },
      { title: "The one detail worth noticing in the supplication", body: "Make my character good, and my form. Both were asked for together, in one clause. The book's twelfth exposition describes his physical constitution, and this sentence is why that is not a digression — the outward is part of what was asked for, which is the preamble's thesis in the mouth of the subject." },
    ],
    distinction: ["Two ways to hold a perfect character", "Asked for and given", "Which the first exposition establishes, and which makes the portrait an example.", "Simply possessed", "Which would make the rest of the book a display and not a model."],
    misreading: "Do not read the answered supplication as making the asking unnecessary for anyone else. The point of putting it first is that it is the part a reader can begin with.",
    reflection: "Notice what he asked for, and whether you have ever asked for the same thing.",
    audit: ["Have I asked for character?", "Do I treat mine as fixed?", "Given, or possessed?", "Why does this come first?"],
    nodes: ["tadib", "iqtida", "dua"],
    model: chain("The frame of the whole portrait", "The character described is an answer.", [["He asked", "Constantly, that God adorn him with good character.", "support"], ["It was given", "In fulfilment of: call upon Me, and I shall answer you.", "support"], ["It is described", "For eleven expositions, as the answer to that asking.", "balance"]]),
  }),
  makeChapter({
    id: 4, shortTitle: "Thirteen headings", formalTitle: "The announced order",
    overview: "Ghazali lists the book's expositions in advance, and the sequence is not arbitrary.",
    moves: [
      { title: "Give the opening three", body: "The disciplining of him by the Qur'an; then a gathering of the excellences of his character; then a further collection of his manners and character." },
      { title: "Give the ordinary registers", body: "Then his speech and his laughter; then his character and manners in food; then his character and manners in dress." },
      { title: "Give the registers under pressure", body: "Then his pardon despite capability; then his overlooking of what he disliked; then his generosity and his liberality; then his courage and his valour; then his humility." },
      { title: "Give the last two", body: "Then his form and his physical constitution; then a gathering of his miracles and his signs — which is where the book's argument returns." },
    ],
    closer: [
      { title: "The shape of the sequence", body: "It moves from what a person is like at rest — speech, food, dress — to what a person is like when something is at stake: insulted, wronged, asked for money, in danger, in a position of power. Character at rest is describable by anyone; the middle registers are where a portrait becomes evidence." },
      { title: "Why form comes second to last", body: "Because the preamble's thesis is that the outward is a title to the inward, and the twelfth exposition is that thesis applied literally. It is placed immediately before the argument that the portrait is the proof, and the passage about the pure Arab who said this is not the face of a liar is what connects them." },
    ],
    distinction: ["Two halves of the sequence", "At rest", "Speech, laughter, food, dress — describable of anyone.", "Under pressure", "Insult, provocation, being asked for, danger, power — where character becomes evidence."],
    misreading: "Do not read the list as a miscellany. The order runs from the unremarkable to the tested to the physical to the argument, and the last exposition depends on all of them.",
    reflection: "Ask which half of this list you would come off better in.",
    audit: ["At rest, or under pressure?", "Which register is mine?", "Where does the sequence turn?", "Why is form near the end?"],
    nodes: ["structure", "shamail", "unwan"],
    model: spectrum("The sequence, in four movements", "From the unremarkable to the argument.", [["The framing", "Disciplined by the Qur'an; the gathered excellences.", "support"], ["At rest", "Speech and laughter, food, dress.", "balance"], ["Under pressure", "Pardon, overlooking, generosity, courage, humility.", "support"], ["Form, and the proof", "The outward as a title, and the argument it carries.", "warning"]]),
  }),
  makeChapter({
    id: 5, shortTitle: "The gathered list", formalTitle: "The excellences, as someone else assembled them",
    overview: "The second exposition, and Ghazali is careful to say it is not his own compilation.",
    moves: [
      { title: "Give the attribution", body: "A collection of the excellences of his character, which one of the scholars gathered and picked out from the reports." },
      { title: "Give its form", body: "It runs as a chain of superlatives — he was the most forbearing of people, and so on through a long sequence — which is a recognisable genre rather than an argument." },
      { title: "Note why it is placed second", body: "Immediately after the framing and before the detailed expositions. It gives the shape of the whole at once, so that the particular registers that follow are read as instances of something already sketched." },
      { title: "Note the honesty of the attribution", body: "Ghazali does not present the list as his own finding. He names it as gathered by another and picked out from the reports, which marks the difference between the compiled portions of the book and the argued ones." },
    ],
    closer: [
      { title: "What a list of superlatives can and cannot do", body: "It can establish a direction and a consistency across many domains at once, which is what the last exposition will need. It cannot show anyone how to act, which is why eleven detailed expositions follow it rather than the book resting here." },
      { title: "What this edition carries", body: "The structure and the method, not the catalogue. The lists in this book run to many pages of transmitted material of varying grades, and reproducing them wholesale in an English synthesis would misrepresent both their status and their weight; the editorial note says so." },
    ],
    distinction: ["Two kinds of material in this book", "Compiled", "Gathered lists and reports, attributed and marked as such.", "Argued", "The preamble, the first exposition, and the last — where the reasoning is."],
    misreading: "Do not read a chain of superlatives as the book's substance. Ghazali marks it as someone else's gathering and then spends the book on particulars.",
    reflection: "Notice how little a list of superlatives tells you about what to do tomorrow.",
    audit: ["Compiled, or argued?", "Whose gathering is this?", "What can a list establish?", "What must follow it?"],
    nodes: ["shamail", "structure", "riwaya"],
    model: pair("Two registers in the book", "Marked apart, deliberately.", [["Compiled", "Attributed lists, picked out from the reports.", "balance"], ["Argued", "The preamble, the first exposition, and the last.", "support"]]),
  }),
  makeChapter({
    id: 6, shortTitle: "Beads strung", formalTitle: "His speech and his laughter",
    overview: "The fourth exposition, and its most quoted line is about restraint rather than eloquence.",
    moves: [
      { title: "Give the superlative", body: "He was the most eloquent of people in utterance and the sweetest of them in speech." },
      { title: "Give the qualification that follows it", body: "And he was sparing of speech, generous in utterance; when he spoke he was no chatterer. And his speech was like beads strung in order." },
      { title: "Give 'A'isha's observation", body: "'A'isha said: he did not pour out speech as you pour it out — his speech was sparing." },
      { title: "Give the laughter", body: "And to a small brother of Anas he said: O Abu 'Umayr, what did the little bird do? The exposition on his speech includes his joking with a child by name, and is titled for his speech and his laughter together." },
    ],
    closer: [
      { title: "Why the two are one heading", body: "Both are what a person does with his mouth when nothing is at stake, and both are unguarded in most people. Putting eloquence and laughter under one exposition treats them as a single register — what someone is like in ordinary conversation — which is where the sequence begins for a reason." },
      { title: "The image of strung beads", body: "Beads on a thread are separate, ordered, and countable. The simile is about discreteness rather than beauty: speech that can be told apart from itself, as opposed to speech poured out in a stream — which is exactly the contrast 'A'isha draws." },
    ],
    distinction: ["Two ways to be good with words", "Sparing and ordered", "Beads strung, told apart from one another, not poured out.", "Fluent", "Which the exposition grants and then immediately qualifies."],
    misreading: "Do not read sparingness as coldness. The same exposition carries his joking with a small child by name, and the two are given under one heading.",
    reflection: "Listen to yourself in the next conversation and ask whether it is beads or a stream.",
    audit: ["Do I pour it out?", "Could my sentences be told apart?", "Am I sparing or curt?", "What am I like when nothing is at stake?"],
    nodes: ["kalam", "shamail", "zahir"],
    model: pair("Two ways speech can come out", "The simile is about discreteness.", [["Beads strung", "Separate, ordered, sparing.", "support"], ["Poured out", "As you pour it out — 'A'isha's contrast.", "balance"]]),
  }),
  makeChapter({
    id: 7, shortTitle: "What was found", formalTitle: "His manners in food and in dress",
    overview: "Two expositions on the most ordinary registers there are, and both turn on the same disposition.",
    moves: [
      { title: "Give the principle in food", body: "He would eat what was found." },
      { title: "Note what the phrase excludes", body: "Both directions at once. It is not the refusal of good food and it is not the seeking of it — it is the removal of the question, which is what makes it a disposition rather than a rule." },
      { title: "Note the length of the treatment", body: "The exposition on food is the longest in the book by a wide margin, running through what he ate, how, with whom, and what he said over it — because it is the register in which a life is most continuously visible." },
      { title: "Note the pairing with dress", body: "Dress follows food directly, and the two are the announced sequence's clearest case of the preamble's thesis: the most ordinary outward things are treated as a title to something, and are given the space that implies." },
    ],
    closer: [
      { title: "Why the ordinary registers get the most room", body: "Because they are the ones that recur. Pardon under insult may be tested a few times in a life; eating happens daily, and a disposition that holds there is a disposition rather than a performance — which is the same reasoning that gave Book 11 an entire book on eating." },
      { title: "What this edition does with the detail", body: "The expositions on food and dress consist largely of transmitted particulars of varying grades. This edition presents the governing disposition and the reason for the length rather than reproducing the catalogue; the editorial note explains the decision." },
    ],
    distinction: ["Two ways to be free of food", "He ate what was found", "Which removes the question rather than answering it in either direction.", "Refusing or seeking", "Both of which keep the question live and make eating a subject."],
    misreading: "Do not read the length of these expositions as trivia. They are long because these registers recur daily, which is precisely what makes them evidence.",
    reflection: "Ask what you did the last time what was found was not what you wanted.",
    audit: ["Do I eat what is found?", "Is the question live for me?", "Which register recurs most in my life?", "Disposition, or performance?"],
    nodes: ["taam", "libas", "zahir"],
    model: pair("Two positions on what is served", "One of them is not a position at all.", [["What was found", "The question removed.", "support"], ["Sought or refused", "The question kept live in either direction.", "balance"]]),
  }),
  makeChapter({
    id: 8, shortTitle: "Who would be just", formalTitle: "His pardon despite capability",
    overview: "The seventh exposition, and one report in it carries the whole heading.",
    moves: [
      { title: "Give the description", body: "He was the most forbearing of people, and the most desirous of pardon when he had the capacity to do otherwise." },
      { title: "Give the occasion", body: "Until necklaces of gold and silver were brought to him and he divided them among his companions — and a man of the desert people stood up and said: O Muhammad, by God, if God commanded you to be just, I do not see that you are being just." },
      { title: "Give the answer", body: "And he said: Woe to you — then who would be just to you after me?" },
      { title: "Give what he did next", body: "And when the man turned away, he said: bring him back to me, gently." },
    ],
    closer: [
      { title: "Why the qualification is in the heading", body: "Pardon despite capability. Forbearance from someone unable to retaliate is not the subject; the exposition is specifically about restraint that had every option open to it, which is why the report is set at the moment of distributing wealth to a crowd." },
      { title: "The last clause is the exposition", body: "Bring him back to me, gently. The answer alone would read as a rebuke that ended the exchange. The instruction to fetch the man back — and the word gently attached to it — is what makes this a report about pardon rather than about having the better line." },
    ],
    distinction: ["Two things that can follow an insult", "The man is brought back, gently", "Which is what the exposition is about.", "The reply lands", "Which the report also contains, and which is not the point of including it."],
    misreading: "Do not take the sharp answer as the model here. The exposition is titled for pardon, and the sentence that earns the title is the one after the man has already walked away.",
    reflection: "Recall the last time you had the better answer, and what you did after it landed.",
    audit: ["Did I have the capacity?", "What did I do after the reply?", "Would I have called him back?", "Gently?"],
    nodes: ["afw", "hilm", "shidda"],
    model: chain("What the report actually shows", "The heading is earned by the last step.", [["The accusation", "Made publicly, at a distribution.", "balance"], ["The answer", "Woe to you — then who would be just to you after me?", "balance"], ["Bring him back", "Gently — and this is the sentence the heading rests on.", "support"]]),
  }),
  makeChapter({
    id: 9, shortTitle: "Not to his face", formalTitle: "His overlooking of what he disliked",
    overview: "The eighth exposition, and its mechanism is not silence — which is the detail that makes it usable.",
    moves: [
      { title: "Give the physical description first", body: "The Messenger of God was of fine skin, subtle in the outward and the inward. His anger and his pleasure were known in his face — and when his feeling grew intense he would often touch his noble beard." },
      { title: "Give the rule", body: "And he would not confront anyone face to face with what he disliked in him." },
      { title: "Give the instance", body: "A man came in to him wearing a yellow dye, which he disliked. And he said nothing to him until he had left." },
      { title: "Give what happened after", body: "Then he said to some of the people: if you were to tell this man to leave off this — meaning the yellow." },
    ],
    closer: [
      { title: "What the heading does not mean", body: "The man is told. Overlooking here is not letting it pass and it is not concealing the objection — it is the removal of the confrontation, with the correction still delivered through someone else, after the person has gone. Silence and correction are separated, and only the first is given up." },
      { title: "How it sits against the book before it", body: "Book 19 argued that a ruling must be conveyed to someone who does not know it, and set out a ladder beginning at informing. This exposition shows the same conveying done without the encounter — which is not an exception to the ladder but a description of what its lowest rung can look like when someone is unwilling to make another person face him." },
    ],
    distinction: ["Two things overlooking could mean", "The confrontation removed", "The correction still sent, after he has gone, through someone else.", "The correction dropped", "Which is not what the report describes, and would be a different disposition."],
    misreading: "Do not read this as a licence for indirectness in general. The report has a specific shape — a minor matter, a correction that still arrives, and no audience for the person's embarrassment.",
    reflection: "Ask whether your last correction needed to happen in front of the person, or in front of anyone.",
    audit: ["Did the correction still arrive?", "Did I need to be the one delivering it?", "Was there an audience?", "Silence, or no confrontation?"],
    nodes: ["ighda", "hilm", "batin"],
    model: pair("Two things separated in one report", "Only one of them is given up.", [["The confrontation", "Removed — nothing said while he was there.", "support"], ["The correction", "Still delivered, through others, after he left.", "support"]]),
  }),
  makeChapter({
    id: 10, shortTitle: "Like the loosed wind", formalTitle: "His generosity and his courage",
    overview: "Two expositions on the registers that cost most, and both are described by comparison rather than by measure.",
    moves: [
      { title: "Give the generosity", body: "He was the most generous of people and the most liberal of them — and in the month of Ramadan he was like the loosed wind." },
      { title: "Note the shape of the image", body: "A wind that has been let go has no direction of its own and no reserve held back. The comparison describes a manner of giving rather than an amount, which is what makes it a description of character." },
      { title: "Give the courage", body: "He was the most valiant of people and the bravest of them. 'Ali said: when the fighting grew hot and eyes reddened, we would shelter behind the Messenger of God, and none of us was closer to the enemy than he was." },
      { title: "Note why the testimony is 'Ali's", body: "The report is put in the mouth of the person least likely to need to say it, describing a position on a battlefield that could be checked by everyone present. It is the exposition's strongest form of evidence rather than its most vivid." },
    ],
    closer: [
      { title: "Why these two are adjacent", body: "They are the registers where a disposition costs property and costs safety. The sequence has moved from what a person is like at rest to what he is like when something is at stake, and these two are where the stakes are most measurable." },
      { title: "The seasonal detail in the first", body: "In the month of Ramadan he was like the loosed wind. The description is of an increase — the generosity has a season in which it rises, which makes it a practice with a rhythm rather than a constant temperament, and therefore something a reader could adopt the shape of." },
    ],
    distinction: ["Two ways to describe generosity", "Like the loosed wind", "A manner of giving — nothing held in reserve, no direction of its own.", "By amount", "Which would make it a fact about wealth rather than about character."],
    misreading: "Do not read the wind as recklessness. The same book describes careful arrangements in every other register; the image is about reserve, not about judgement.",
    reflection: "Ask whether your giving has a season, and what it is like in that season.",
    audit: ["Do I hold a reserve?", "Does my giving have a rhythm?", "Who would testify to my courage?", "Could it be checked?"],
    nodes: ["sakhawa", "shajaa", "shidda"],
    model: pair("Two costly registers", "Both described by comparison, not by measure.", [["Generosity", "Like the loosed wind, in its season.", "support"], ["Courage", "Attested by those who sheltered behind him.", "support"]]),
  }),
  makeChapter({
    id: 11, shortTitle: "I am not a king", formalTitle: "His humility at the height of his station",
    overview: "The eleventh exposition, and its heading contains the only condition that makes humility mean anything.",
    moves: [
      { title: "Give the heading in full", body: "He was the most severe of people in humility — in the height of his station." },
      { title: "Give the first instance", body: "Ibn 'Amir said: I saw him throwing the pebbles at the jamra on a grey she-camel — no striking, and no driving away, and no calling out, back, back." },
      { title: "Give the second", body: "And he would ride a donkey with a saddle-cloth on it, and would take someone up behind him; and he would visit the sick." },
      { title: "Give the sentence", body: "A man was brought to him and trembled from awe of him, and he said to him: ease up on yourself — I am not a king. I am only the son of a woman who used to eat dried meat." },
    ],
    closer: [
      { title: "Why the crowd detail matters", body: "No striking, no driving away, no calling out. The three negations describe what an entourage normally does to clear a path for someone important, and their absence is the observation. Humility is registered here by what did not happen around him, which is harder to perform than anything he could have said." },
      { title: "The shape of the last sentence", body: "It is addressed to the other person's discomfort rather than to his own standing. He does not deny the station — the heading insists on it — he removes the effect it is having on the man in front of him, which is a different act from self-deprecation and the reason the report is remembered." },
    ],
    distinction: ["Two things humility can address", "The other person's discomfort", "Ease up on yourself — which is what the sentence does.", "One's own standing", "Which the heading refuses to diminish: humility in the height of his station."],
    misreading: "Do not read this as a denial of rank. Ghazali titles the exposition for humility at the height of his station, and the report only works because the station is real.",
    reflection: "Notice what happens around you, rather than what you say, when you have some standing.",
    audit: ["What happens around me?", "Am I addressing their discomfort or my image?", "Would the heading's condition apply?", "Who clears my path?"],
    nodes: ["tawadu", "shidda", "unwan"],
    model: chain("Where humility is registered", "By what did not happen.", [["The station", "Real, and not denied — the heading insists on it.", "balance"], ["No striking, no driving away", "What an entourage normally does, absent.", "support"], ["Ease up on yourself", "Addressed to the other man's discomfort.", "support"]]),
  }),
  makeChapter({
    id: 12, shortTitle: "Neither tall nor short", formalTitle: "His form and his constitution",
    overview: "The twelfth exposition describes a physical appearance, and its presence in a book of character is the preamble's thesis taken literally.",
    moves: [
      { title: "Give the opening", body: "And of the description of the Messenger of God: that he was not conspicuously tall, nor short." },
      { title: "Note the form of the description", body: "It proceeds largely by such balanced negations — not this and not that — which is a recognisable convention of the genre, and which describes proportion rather than distinctiveness." },
      { title: "Note where it sits", body: "Second to last, immediately before the argument that the portrait is the evidence. Nothing in the announced order is between them." },
      { title: "Give the reason it is not a digression", body: "The book opened by saying the manners of the outward are the title of the manners of the inward, and the first exposition had him ask God to make good his character and his form together, in one clause. The twelfth exposition is that thesis and that supplication taken at their word." },
    ],
    closer: [
      { title: "What proportion is doing here", body: "A description built from balanced negations is a description of nothing being in excess. Read against the preamble it is the outward reporting an inward in which nothing is in excess either — which is the same argument the Ihya makes about character throughout, from Book 22 onward, in a different register." },
      { title: "What this edition does not reproduce", body: "The physical descriptions in this exposition are transmitted material of varying grades and long-standing devotional significance, and this edition presents the convention and the structural reason for the exposition's placement rather than rendering the descriptions themselves. The editorial note states the decision." },
    ],
    distinction: ["Two things a physical description can be", "A title", "The outward reporting an inward, which is why the book contains one at all.", "A curiosity", "Which is how it reads if the preamble has been skipped."],
    misreading: "Do not treat this exposition as separable from the argument. Its placement immediately before the last one is the connection, and the following section makes the link explicit.",
    reflection: "Ask what the preamble's thesis would predict about a description of anyone's appearance.",
    audit: ["Why is this here?", "What does proportion describe?", "Did I read the preamble?", "Title, or curiosity?"],
    nodes: ["sura", "unwan", "zahir"],
    model: pair("Two readings of one exposition", "The preamble decides which.", [["A title to the inward", "Consistent with the book's opening thesis and the first supplication.", "support"], ["An unrelated description", "Which is what it becomes if the preamble is skipped.", "balance"]]),
  }),
  makeChapter({
    id: 13, shortTitle: "Not the face of a liar", formalTitle: "Why the portrait is the proof",
    overview: "The last exposition of the last book of the quarter, and it turns two hundred pages of description into an argument.",
    moves: [
      { title: "Give the premise", body: "Know that whoever witnessed his states, and gave ear to the hearing of his reports — comprising his character, his acts, his states, his customs, his natural dispositions, his ordering of the classes of creation, his guidance toward holding them together, his winning them over and his leading them to obedience." },
      { title: "Extend it", body: "Together with what is related of the wonders of his answers in the tight places of questions, and the marvels of his arrangements in the interests of creation, and the excellences of his indications in the detail of the outward law — which the jurists and the intelligent are unable to grasp the first of its subtleties in the length of their lives." },
      { title: "Give the conclusion", body: "There remains for him no doubt and no uncertainty that this was not acquired by any device that human power could accomplish — rather it cannot be conceived except by drawing on a heavenly reinforcement and a divine strength; and that none of this can be conceived for a liar or a deceiver." },
      { title: "Give the evidence in its smallest form", body: "Rather his traits and his states were decisive witnesses to his truthfulness — until the pure Arab would see him and say: by God, this is not the face of a liar. So he would testify to his truthfulness by his traits alone; then how of one who witnessed his character and practised his states?" },
    ],
    closer: [
      { title: "What the argument does to the book behind it", body: "The eleven expositions of character stop being edification and become the evidence in a case. The exposition is titled for miracles and signs, and it opens by arguing that the character was the sign — which is why the book could be a compilation and still be an argument, and why it is placed where it is." },
      { title: "The move in the last sentence", body: "It runs from the least informed observer to the most: if a man who saw only a face could tell, then someone who has read this book has more, not less, to go on. The a fortiori is addressed to the reader directly, and it is the last thing the Quarter of Customs says before turning inward for the second half of the Ihya." },
      { title: "How it closes the preamble", body: "The book opened by saying the manners of the outward are the title of the manners of the inward — that the outside is legible because it came from an inside. The last exposition reads the title: an outward that no device could produce reports an inward that no person could construct. The first sentence and the last are one argument." },
    ],
    distinction: ["Two ways to read a life", "As a title", "Legible evidence of what produced it, which the first and last sections together argue.", "As a set of anecdotes", "Which is what the eleven expositions become without the two that frame them."],
    misreading: "Do not read the last exposition as changing the subject to miracles. Its argument is that the character already described is the sign, and it is written to be read against everything before it.",
    reflection: "Ask what your own life would be evidence of, on this way of reading one.",
    audit: ["What is my life a title to?", "Have I read the frame or only the middle?", "Anecdotes, or evidence?", "What comes next in the Ihya?"],
    nodes: ["shamail", "unwan", "sidq"],
    model: chain("The book's closing argument", "The first sentence and the last are one.", [["The outward is a title", "Legible, because it came from an inside.", "support"], ["This outward", "Not acquirable by any device human power could accomplish.", "support"], ["Therefore", "Not conceivable for a liar or a deceiver.", "support"], ["And by a face alone", "By God, this is not the face of a liar.", "balance"]]),
  }),
];

export const book20ConceptNodes: ConceptNode[] = [
  ["unwan", "A title", "The book's thesis", "The manners of the outward are the inscription that tells what is inside."],
  ["batin", "The inward", "The source", "The secrets of hearts are the planting-grounds of actions and their springs."],
  ["zahir", "The outward", "Legible", "Adorned and burnished by the lights of the innermost, and readable because of it."],
  ["structure", "Thirteen expositions", "An announced order", "From framing, through the ordinary registers, to the tested ones, to the argument."],
  ["iqtida", "Following", "The stated aim", "Success in following him granted to whoever God wills to refine."],
  ["tadib", "Disciplining", "By the Qur'an", "The heading of the first exposition, and the frame for the whole portrait."],
  ["dua", "Asking", "What came first", "O God, make my character good, and my form — and it was answered."],
  ["shamail", "Traits", "The evidence", "Decisive witnesses to his truthfulness, on the last exposition's argument."],
  ["riwaya", "Transmitted material", "Marked as such", "Gathered lists, attributed to their compilers and of varying grades."],
  ["kalam", "Speech", "Beads strung", "Sparing, ordered, told apart — not poured out."],
  ["taam", "Food", "What was found", "The longest exposition, on the register that recurs daily."],
  ["libas", "Dress", "The ordinary outward", "Paired with food, and treated as a title like everything else."],
  ["afw", "Pardon", "Despite capability", "Which is the condition in the heading, and the whole of its interest."],
  ["hilm", "Forbearance", "Under provocation", "The disposition the tested registers are all describing."],
  ["ighda", "Overlooking", "Not silence", "The confrontation removed; the correction still delivered, after he had gone."],
  ["sakhawa", "Generosity", "Like the loosed wind", "Nothing held in reserve, and rising in its season."],
  ["shajaa", "Courage", "Attested", "By those who sheltered behind him, and could be checked."],
  ["tawadu", "Humility", "At the height of station", "Registered by what did not happen around him."],
  ["shidda", "Under pressure", "Where it counts", "The half of the sequence in which character becomes evidence."],
  ["sura", "Form", "Taken at its word", "A physical description, placed where the thesis makes it necessary."],
  ["sidq", "Truthfulness", "The conclusion", "Not conceivable for a liar or a deceiver — which the portrait establishes."],
].map(([id, label, kicker, description], index) => ({ id, label, kicker, description, position: ["left", "right", "top", "bottom"][index % 4] }));

const node = (id: string, label: string, micro: string, summary: string, guardrail: string, chapterId: number, glyph: Journey["nodes"][number]["glyph"]): Journey["nodes"][number] => ({ id, label, micro, summary, guardrail, chapterId, glyph });

export const book20Journeys: Journey[] = [
  {
    id: "the-title", number: "01", question: "Why does the quarter end with a portrait?", title: "The outward as a title to the inward",
    description: "The preamble that reframes the nine books behind it, the plan Ghazali states in his own voice, and the supplication that makes the portrait an example rather than a display.",
    payoff: "You learn what the Quarter of Customs was doing all along, and why the character described here is presented as something asked for.",
    image: assetUrl("assets/system/book20-title.jpg"), imageAlt: "A folded letter on a plain table, its outer face inscribed and its contents unseen.", minutes: 11, color: "#278d91",
    nodes: [
      node("unwan-thesis", "Take the thesis", "The outward is a title", "The inscription that tells what is inside — and it runs inward to outward.", "Whoever's heart is not humbled, his limbs are not humbled.", 1, "know"),
      node("nine-books-back", "Reread the quarter", "Legible surfaces", "Eating, marriage, earning, companionship, travel — all reframed by one sentence.", "And it is the hinge onto the quarter on the heart.", 2, "pattern"),
      node("he-asked", "Note what came first", "O God, make my character good", "The portrait is framed as an answer to a request.", "Which is what makes it an example and not a display.", 3, "witness"),
      node("the-order", "Take the sequence", "Rest, then pressure", "Speech and food first; pardon, courage and humility after.", "Character at rest is describable of anyone.", 4, "order"),
    ],
  },
  {
    id: "under-pressure", number: "02", question: "What is a person like when something is at stake?", title: "The tested registers",
    description: "Five expositions on what happened when he was insulted, provoked, asked for money, in danger, and in a position of power — and the small clause in each that carries the heading.",
    payoff: "You get five precise pictures of restraint, each turning on a detail that is easy to miss and hard to perform.",
    image: assetUrl("assets/system/book20-pressure.jpg"), imageAlt: "A drawn bow at rest on a wall, string slack, wood unbent.", minutes: 14, color: "#c25f50",
    nodes: [
      node("bring-him-back", "Take the pardon", "Bring him back, gently", "After the accusation, and after the answer had already landed.", "The heading rests on the sentence after the man walked away.", 8, "clear"),
      node("not-to-his-face", "Take the overlooking", "The correction still arrives", "Nothing said while he was there; told through others once he had gone.", "Not silence — the confrontation removed, not the correction.", 9, "balance"),
      node("loosed-wind", "Take the generosity", "Nothing held in reserve", "Like the loosed wind, and rising in its season.", "A manner of giving, not an amount.", 10, "steady"),
      node("who-testifies", "Take the courage", "Attested by those behind him", "'Ali's report, checkable by everyone present.", "The strongest form of evidence, not the most vivid.", 10, "witness"),
      node("i-am-not-a-king", "Take the humility", "At the height of his station", "No striking, no driving away, no calling out.", "Registered by what did not happen around him.", 11, "diagnose"),
    ],
  },
  {
    id: "the-proof", number: "03", question: "What is all this description for?", title: "The portrait as evidence",
    description: "The last exposition of the last book of the Quarter of Customs, where a compilation of character becomes an argument — and closes the sentence the book opened with.",
    payoff: "You see why a book of anecdotes was placed where it was, and what the Ihya turns to next.",
    image: assetUrl("assets/system/book20-proof.jpg"), imageAlt: "A wax seal impressed in a document, the matrix that made it lying beside it.", minutes: 10, color: "#bf7a35",
    nodes: [
      node("form-and-thesis", "Note the placement", "Form, second to last", "A physical description, immediately before the argument.", "Which the preamble and the first supplication together explain.", 12, "order"),
      node("no-device", "Take the premise", "No device could produce it", "Not acquirable by any means human power could accomplish.", "Drawn from the whole range, not from any one report.", 13, "know"),
      node("not-a-liar", "Take the conclusion", "Not the face of a liar", "The pure Arab testified from traits alone.", "Then how of one who has read the whole portrait?", 13, "clear"),
      node("first-and-last", "Close the circle", "One argument", "The outward is a title; this outward reports an inward no one could construct.", "And the quarter turns inward from here.", 13, "pattern"),
    ],
  },
];

export const book20Movements: TaxonomyGroup[] = [
  ["frame", "The frame", "The preamble's thesis, the stated plan, the supplication, and the announced order.", [1, 2, 3, 4]],
  ["rest", "At rest", "The gathered excellences, speech and laughter, food and dress.", [5, 6, 7]],
  ["tested", "Under pressure", "Pardon, overlooking, generosity, courage, humility, and form.", [8, 9, 10, 11, 12]],
  ["proof", "The argument", "Where the portrait becomes the evidence, and the preamble is closed.", [13]],
].map(([id, label, description, chapterIds], index) => ({ id, label, description, chapterIds, color: ["#278d91", "#bf7a35", "#c25f50", "#7a6ca8"][index % 4] })) as TaxonomyGroup[];

export const book20Instrument: Instrument = {
  title: "Which end are you working from",
  note: "This book's opening claim is that the manners of the outward are the title of the manners of the inward — and that the causation runs one way: whoever's heart is not humbled, his limbs are not humbled. Its first exposition then frames the whole portrait as something asked for and given. This applies both to something you are trying to take on. It describes a direction of work, not a verdict on anyone.",
  items: [
    {
      id: "taking-on", label: "Something you are trying to take on", lede: "Name the thing, then say honestly where it currently comes from",
      note: "The book's expositions run from what a person is like at rest — speech, food, dress — to what he is like when something is at stake: insulted, asked for, in danger, in a position of power. Which register you have picked matters as much as how you are going about it.",
      axes: [
        {
          id: "what", kicker: "The registers", question: "What are you trying to take on?",
          options: [
            { id: "outward", label: "An outward practice — how I eat, dress, speak", note: "The registers his sequence treats first, and at the greatest length." },
            { id: "people", label: "A way of dealing with people", note: "Humility, overlooking, generosity — the middle of his sequence." },
            { id: "reaction", label: "How I come out when I am provoked", note: "Pardon despite capability, and overlooking what he disliked — the tested registers." },
            { id: "whole", label: "The whole thing — I want to be a different person", note: "Which the book's own framing has something specific to say about." },
          ],
        },
        {
          id: "where", kicker: "The direction of the claim", question: "Where does it currently come from?",
          options: [
            { id: "copy", label: "I do it because he did it", note: "Imitation of the outward, which the preamble says is the title rather than the source." },
            { id: "want", label: "I have come to actually want it", note: "Which is the direction the preamble describes: the inward shining out." },
            { id: "resent", label: "I do it, and I resent doing it", note: "The case the preamble's second consequence addresses directly." },
            { id: "none", label: "I don't do it at all yet", note: "Which the first exposition treats as a starting position rather than a failure." },
          ],
        },
      ],
      verdicts: [
        { key: "*|resent", name: "The preamble addresses this exactly", role: "warning", chapterId: 1, body: "Ghazali's opening runs one way and says so twice. The lights of the innermost are what shine upon the outward, so that they adorn it and burnish it — and then: whoever's heart is not humbled, his limbs are not humbled. An outward kept up against an inward that resists it is not the thing the book is describing.", action: "But note what the diagnosis does not say. It does not say stop; the direction of the claim means the outward is the title, and a title over an empty letter is a false report rather than a harmless one. The move it points to is the first exposition's: he was constant in asking of God that He adorn him with the excellences of manners, and said, O God, make my character good. The book puts the asking before the portrait, and this is the case it is there for." },
        { key: "*|none", name: "Which is where the book starts", role: "support", chapterId: 3, body: "The first exposition exists to establish this. Before eleven expositions of character, Ghazali reports that the Messenger of God was much given to humble entreaty, constant in asking of God that He adorn him with the excellences of manners and the noblenesses of character — and that God answered his supplication.", action: "The framing is deliberate: a perfect character simply possessed would be a display and not an example. Presented as something asked for and given, the whole portrait becomes legible as an answer to a request — which means the part a reader can start with is the part that comes first in the book, and not doing the thing yet is the position the opening is written for." },
        { key: "reaction|*", name: "The hardest half of his sequence", role: "balance", chapterId: 8, body: "You have picked the registers where the book stops being describable of anyone. His pardon despite capability, and his overlooking of what he disliked, are both headed by their conditions — forbearance from someone who could not retaliate is not the subject, and neither is silence.", action: "Take the small clauses, since they are where both headings are earned. After the accusation and after the answer had landed, he said: bring him back to me, gently — and the exposition rests on that sentence, not on the reply. And overlooking turns out not to be letting it pass: he said nothing to the man while he was there, then afterwards told others, if you were to tell this man to leave off this. The correction still arrived. What was given up was the confrontation, not the conveying." },
        { key: "whole|*", name: "The book has a specific answer to this", role: "balance", chapterId: 4, body: "Its structure is against you, and deliberately. Thirteen expositions taken one at a time — speech, food, dress, pardon, overlooking, generosity, courage, humility — rather than one account of a character. Ghazali's own stated reason for the book is that it should not be hard for one seeking these things to extract them, which is a reason to have parts.", action: "And the sequence tells you where to enter. It begins with what a person is like at rest, and the exposition on food is the longest in the book by a wide margin — because that is the register that recurs daily, and a disposition that holds where a thing recurs is a disposition rather than a performance. Pick one register, and pick a recurring one." },
        { key: "outward|copy", name: "The title, and what it is a title to", role: "balance", chapterId: 1, body: "The claim in the preamble is that the manners of the outward are the title of the manners of the inward — an 'unwan, the inscription on the outside of a letter that tells you what is in it. The relation is legibility, and its causation runs from inside out: the movements of the limbs are the fruits of thoughts, and acts are the result of character.", action: "So copying the inscription is not nothing — the twelfth exposition describes a physical form, and the first has him ask God to make good his character and his form in one clause, so the outward is genuinely part of what was asked for. But hold what it is: a report. Ask what yours currently reports, and put the asking alongside the copying rather than instead of it." },
        { key: "people|*", name: "Where the reports are most exact", role: "support", chapterId: 11, body: "This is the middle of his sequence, and the reports in it are unusually precise about mechanism. His humility is headed at the height of his station — the station is not denied — and it is registered by what did not happen around him: throwing the pebbles on a grey she-camel, with no striking, and no driving away, and no calling out, back, back.", action: "And the sentence people remember was addressed to someone else's discomfort rather than to his own standing: a man trembled from awe of him, and he said, ease up on yourself — I am not a king; I am only the son of a woman who used to eat dried meat. That is a different act from self-deprecation. Watch what happens around you rather than what you say, since the first is harder to perform than anything you could." },
        { key: "*|*", name: "Working from the right end", role: "support", chapterId: 1, body: "This is the direction the preamble describes: the lights of the innermost shining out onto the outward, adorning it and burnishing it, and exchanging its ugliness for excellences. When the wanting is genuinely there, the outward is a true title rather than an inscription over an empty letter.", action: "The thing to hold is that the book does not stop there. It gives thirteen expositions of particulars, at length, because a disposition still has to take a shape in speech, in food, in what happens when someone accuses you publicly. Wanting it is the condition the preamble sets; the particulars are the book. Take one register and read what it actually describes." },
      ],
    },
  ],
};

export const book20Sources: SourceLink[] = [
  { label: "Primary Arabic text", note: "The complete public Arabic of Book 20 was read and used to establish the preamble's thesis, the announced order of thirteen expositions, and the argument of the concluding exposition.", url: "https://shamela.ws/book/9472/717" },
  { label: "The preamble and the plan", note: "The opening of the book, giving the claim that the manners of the outward are the title of the manners of the inward, and Ghazali's stated resolve to seal the quarter with this book.", url: "https://shamela.ws/book/9472/717" },
  { label: "The disciplining by the Qur'an", note: "The first exposition, framing the portrait as the answer to a supplication for good character.", url: "https://shamela.ws/book/9472/717" },
  { label: "Speech, food, and dress", note: "The expositions on the registers at rest, of which the treatment of food is the longest in the book.", url: "https://shamela.ws/book/9472/728" },
  { label: "Pardon, overlooking, generosity, courage, humility", note: "The tested registers, including the report of the accusation at the distribution and the man told to leave off the yellow dye.", url: "https://shamela.ws/book/9472/739" },
  { label: "Form, and the signs of his truthfulness", note: "The last two expositions, where the description of his physical constitution is followed by the argument that the character itself is the evidence.", url: "https://shamela.ws/book/9472/744" },
  { label: "Forty-book structure", note: "Ghazali.org's listing places Book 20 as the tenth and last book of the Quarter of Customs and confirms its title.", url: "https://www.ghazali.org/listing-the-forty-books/" },
];

export const book20: SystemBook = {
  id: 20,
  title: "The Manners of Living and the Character of Prophecy",
  shortTitle: "The Manners of Living",
  defaultJourneyId: "the-title",
  chapters: book20Chapters,
  conceptNodes: book20ConceptNodes,
  journeys: book20Journeys,
  sources: book20Sources,
  taxonomy: {
    title: "A frame, a portrait, an argument",
    note: "Ghazali announces thirteen expositions in order. The first four frame the book, the middle nine are the portrait — grouped here as he sequences them, from the registers at rest to the ones under pressure — and the last turns the whole compilation into an argument.",
    groups: book20Movements,
  },
  instrument: book20Instrument,
  editorialNote: "The three journeys, thirteen reading sections, visual models, and diagnostic are editorial learning aids. The sections follow Ghazali's own announced order of expositions. The English is an original synthesis made from a reading of the public Arabic text, not a translation and not a substitute for one. This book needs a clear note on what it carries. Its substance is a compilation: several hundred pages of transmitted reports about the Prophet's character, manners, appearance and conduct, of widely varying grades, much of it drawn from the established shama'il literature and carrying long-standing devotional significance. Reproducing that catalogue wholesale in an English synthesis would misrepresent both its status and its weight, and would substitute this edition's paraphrase for texts readers should meet in properly edited and graded translations. So this edition presents the book's architecture — the preamble's claim that the manners of the outward are the title of the manners of the inward, the stated reason for placing the book last, the framing of the portrait as an answer to a supplication, the announced sequence and what its ordering is doing, and the concluding argument that the character itself is the evidentiary sign — together with a small number of reports that carry a structural point and could not be described without being given. Reports are presented as material Ghazali transmitted; this prototype does not independently grade any narration, and readers wanting the portrait itself should go to a graded collection rather than to a reading edition. The diagnostic applies the preamble's direction of causation to something a reader is working on, and makes no claim about anyone's character.",
};
