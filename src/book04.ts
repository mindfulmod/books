import { assetUrl } from "./assetUrl";
import type { Chapter, ConceptNode, VisualModel } from "./data";
import type { Instrument, Journey, SourceLink, SystemBook, TaxonomyGroup } from "./systemTypes";

type Seed = { id: number; shortTitle: string; formalTitle: string; overview: string; moves: Array<{ title: string; body: string }>; closer: Array<{ title: string; body: string }>; distinction: [string, string, string, string, string]; misreading: string; reflection: string; audit: string[]; nodes: string[]; model: VisualModel };
const bab = (id: number) => (id === 1 ? "the first chapter, on the excellences" : id === 2 ? "the second chapter, on the outward acts" : id <= 10 ? "the third chapter, on the inward conditions" : id === 11 ? "the fourth chapter, on leading the prayer" : id === 12 ? "the fifth chapter, on the Friday prayer" : id === 13 ? "the sixth chapter, on scattered questions" : "the seventh chapter, on the supererogatory prayers");
const makeChapter = (seed: Seed): Chapter => ({
  id: seed.id, shortTitle: seed.shortTitle, formalTitle: seed.formalTitle, overview: seed.overview,
  points: seed.moves.slice(0, 3).map((m) => m.body), reflection: seed.reflection, relatedNodes: seed.nodes, visualModel: seed.model,
  deep: { thesis: seed.moves[0].body, context: seed.overview, moves: seed.moves, closeReading: seed.closer,
    distinction: { title: seed.distinction[0], firstLabel: seed.distinction[1], first: seed.distinction[2], secondLabel: seed.distinction[3], second: seed.distinction[4] },
    misreading: seed.misreading, observation: seed.reflection, selfAudit: seed.audit,
    sourceAnchor: `Book 4, ${bab(seed.id)}, ${seed.formalTitle}.` },
});
const chain = (title: string, caption: string, items: Array<[string, string, "support" | "balance" | "warning"]>): VisualModel => ({ kind: "chain", title, caption, items: items.map(([label, body, role]) => ({ label, body, role })) });
const pair = (title: string, caption: string, items: Array<[string, string, "support" | "balance" | "warning"]>): VisualModel => ({ kind: "pair", title, caption, items: items.map(([label, body, role]) => ({ label, body, role })) });
const spectrum = (title: string, caption: string, items: Array<[string, string, "support" | "balance" | "warning"]>): VisualModel => ({ kind: "spectrum", title, caption, items: items.map(([label, body, role]) => ({ label, body, role })) });

export const book04Chapters: Chapter[] = [
  makeChapter({
    id: 1, shortTitle: "Seven chapters", formalTitle: "The excellences of prayer",
    overview: "The largest book of the Quarter of Worship opens with its excellences and announces seven chapters, one of which is unlike all the others.",
    moves: [
      { title: "Gather the excellences", body: "The first chapter assembles what is reported on the excellence of prayer, of prostration, of the congregation, of the call, and of the place of prayer, each treated in turn." },
      { title: "Announce the seven", body: "The excellences; the outward acts and how they are performed; the inward conditions, which are the acts of the heart; leading the prayer and following; the Friday prayer; scattered questions that arise generally; and the supererogatory prayers." },
      { title: "Note which one is different", body: "Six of the seven are procedural, jurisprudential, or devotional. The third is an argument, and it is where nearly all of this book's thinking is." },
      { title: "Place it in the quarter", body: "Book 3 declared that the Quarter of Worship treats only the outward rank of purification. This book is where that declaration is most tested, because its third chapter is about the heart and comes in the middle of a procedural manual." },
    ],
    closer: [
      { title: "Why the third chapter is remarkable", body: "It argues that presence of heart is a condition of the prayer, not an adornment of it. That is a position with legal consequences, made inside a book that elsewhere gives the ordinary rulings, and Ghazali does not disguise the tension." },
      { title: "What the first chapter is doing", body: "The same as the opening of most books in the Ihya: establishing that the subject repays the length about to be spent on it. Here nobody doubts that, so the chapter is comparatively brief and the book moves quickly to the acts." },
    ],
    distinction: ["Two kinds of chapter in this book", "Procedural", "How the act is performed, who leads it, when it falls, and what is supererogatory.", "Argumentative", "The third chapter, which argues about what the act requires inwardly and has legal consequences."],
    misreading: "Do not read the six procedural chapters and the one argumentative chapter as equally weighted. Ghazali gives the third chapter the most sustained reasoning in the quarter.",
    reflection: "Notice where a manual of ritual suddenly starts arguing, and about what.",
    audit: ["Which chapter am I in?", "Is this procedure or argument?", "What does the third chapter cost the others?", "Where is this book's thinking?"],
    nodes: ["salat", "structure", "khushu"],
    model: pair("Two registers in one book", "Six chapters of one kind and one of the other.", [["Procedure", "How, when, who, and what is optional.", "balance"], ["Argument", "What the act requires inwardly, argued with legal consequences.", "support"]]),
  }),
  makeChapter({
    id: 2, shortTitle: "The outward acts", formalTitle: "How the visible parts of the prayer are performed",
    overview: "The second chapter, and the longest procedural stretch in the book: the acts in order, from before the opening magnification to the closing salutation.",
    moves: [
      { title: "Give the order", body: "The chapter proceeds through the prayer in sequence — what comes before the opening magnification, then the recitation, then the bowing and what attaches to it, then the testimony, and so on to the end." },
      { title: "Separate the obligatory from the customary", body: "A section is given to distinguishing the obligatory parts from the customary ones, which is the single most useful thing in the chapter for a reader trying to know what carries what weight." },
      { title: "Note the register", body: "This is a manual. The instructions are given plainly and are not argued for, and they follow the school of law Ghazali wrote within." },
      { title: "Say what it establishes", body: "It fixes the outward act completely, which is what allows the next chapter to ask a question that could not otherwise be asked: whether performing all of this correctly is sufficient." },
    ],
    closer: [
      { title: "Why the separation of obligatory and customary matters here", body: "It is the same concern as Book 3's warning that manners and requirements are not always marked in this quarter. A reader who cannot tell them apart will either treat customs as binding, which produces scruple, or treat obligations as optional." },
      { title: "What this edition does with the detail", body: "The rulings are the substance of a legal manual and vary between the schools. This section presents how the chapter is organised and what it settles, rather than reproducing the instructions, and the editorial note records that decision." },
    ],
    distinction: ["Two things this chapter fixes", "The sequence", "What is done, in what order, from before the opening to the close.", "The weight", "Which parts are obligatory and which are customary, given its own section."],
    misreading: "Do not take a full account of the outward acts as a full account of the prayer. The chapter that follows exists precisely because Ghazali thought that reading was available and wrong.",
    reflection: "Ask whether you could say which parts of your prayer are obligatory and which are custom.",
    audit: ["Do I know which parts are obligatory?", "Where would I check?", "Have I treated a custom as binding?", "What does this chapter leave open?"],
    nodes: ["salat", "fiqh", "zahir"],
    model: chain("What the chapter settles", "And what it deliberately leaves for the next one.", [["The sequence", "Every visible part, in order.", "support"], ["The weights", "Obligatory separated from customary.", "support"], ["Not sufficiency", "Whether doing all of it correctly is enough, which the next chapter takes up.", "warning"]]),
  }),
  makeChapter({
    id: 3, shortTitle: "A condition, not an ornament", formalTitle: "That humility and presence of heart are required",
    overview: "The most consequential argument in the Quarter of Worship. Ghazali argues that presence of heart is a condition of the prayer, and marshals evidence like a jurist rather than like a preacher.",
    moves: [
      { title: "The first evidence", body: "Establish the prayer for My remembrance. The apparent sense of a command is obligation, and heedlessness is the contrary of remembrance — so one heedless throughout his prayer, how is he establishing the prayer for His remembrance?" },
      { title: "The second and third", body: "And do not be among the heedless: a prohibition, whose apparent sense is forbiddance. And: until you know what you are saying — a rationale given for the prohibition on the drunk, which applies equally to a heedless man whose concern is absorbed in whispering and thoughts of the world." },
      { title: "The fourth", body: "Prayer is only humility and lowliness. A restriction, by the definite article and by the word only, which is for verification and emphasis — and the jurists took restriction, affirmation, and negation from a parallel construction elsewhere." },
      { title: "The fifth and sixth", body: "Whoever's prayer does not restrain him from indecency and wrong increases only in distance from God — and a heedless man's prayer does not restrain him. And: how many a one stands whose portion of his prayer is fatigue and weariness — by which nothing was meant but the heedless." },
    ],
    closer: [
      { title: "How he argues", body: "Every step is a legal move: the apparent sense of a command, the apparent sense of a prohibition, a stated rationale extended to a parallel case, a restriction inferred from a grammatical construction with a cited precedent. He is arguing on the jurists' ground with the jurists' tools." },
      { title: "The tension he leaves standing", body: "The position has consequences the surrounding chapters do not draw, and Ghazali does not pretend otherwise. He argues that this is what the evidence requires, gives the ordinary procedural rulings elsewhere in the book, and lets the reader hold both." },
    ],
    distinction: ["Two ways to value presence of heart", "As a condition", "Argued from commands, prohibitions, rationales, and a restriction, with consequences.", "As a perfection", "Highly recommended and not required, which is the position the evidences are marshalled against."],
    misreading: "Do not read this as devotional encouragement. It is a legal argument, made with legal instruments, and Ghazali knew what position he was taking within his own school's discussions.",
    reflection: "Read the six evidences in order and notice that none of them appeals to how much better a present prayer feels.",
    audit: ["Have I treated presence as optional?", "What kind of argument is this?", "Which evidence is strongest to me?", "What follows if he is right?"],
    nodes: ["khushu", "hudur", "fiqh"],
    model: spectrum("Six evidences, all legal", "None of them appeals to experience.", [["A command", "Establish the prayer for My remembrance; heedlessness contradicts remembrance.", "support"], ["A prohibition", "And do not be among the heedless.", "support"], ["A rationale", "Until you know what you are saying, extended from the drunk to the heedless.", "support"], ["A restriction", "Prayer is only humility and lowliness.", "support"], ["A consequence", "A prayer that does not restrain increases only in distance.", "warning"]]),
  }),
  makeChapter({
    id: 4, shortTitle: "Six meanings", formalTitle: "The inward meanings by which the prayer's life is completed",
    overview: "The framework the rest of the chapter runs on. Ghazali says the many expressions used for this reduce to six, and then promises a three-part treatment of each.",
    moves: [
      { title: "Give the six", body: "The expressions for these meanings are many, but six sentences gather them: presence of heart, understanding, reverence, awe, hope, and shame." },
      { title: "Announce the method", body: "So let us mention their details, then their causes, then the treatment for acquiring them. Details, causes, treatment — the same three-part structure the Ihya uses for the diseases of the heart." },
      { title: "Note what the method implies", body: "If each of the six has causes and a treatment, then each can be worked at separately, and a prayer can fail at one while succeeding at the others. That is what the following chapters spend their length establishing." },
      { title: "Name what is at stake", body: "These are what completes the life of the prayer. The outward acts are the body of it, and this chapter is about whether that body is alive." },
    ],
    closer: [
      { title: "Why six and not one", body: "It would have been easy to say that the prayer requires presence of heart and leave it there. Six separable requirements make a diagnosis possible: a person who finds his prayer flat can ask which of the six is absent instead of concluding that he lacks devotion in general." },
      { title: "The order they are given in", body: "Presence, understanding, reverence, awe, hope, shame. The first two are conditions of attention and the last four are states, and the sequence runs from what is most under a person's control to what is least." },
    ],
    distinction: ["Two ways to describe what prayer needs inwardly", "Six separable meanings", "Each with its own causes and treatment, so that failure can be located.", "One quality", "Devotion in general, which can be lamented but not diagnosed."],
    misreading: "Do not treat the six as a checklist to be satisfied simultaneously. Ghazali says they differ between people and within one person, and the next chapters treat their absence as ordinary.",
    reflection: "Before reading further, guess which of the six fails first in your own prayer.",
    audit: ["Which of the six do I have?", "Which fails first?", "Have I diagnosed generally instead of specifically?", "What are its causes?"],
    nodes: ["sitta", "khushu", "hudur"],
    model: spectrum("Six meanings", "Ordered from most under control to least.", [["Presence", "The heart emptied of what it is not engaged with.", "support"], ["Understanding", "The meaning of the words, not only the words.", "support"], ["Reverence", "Beyond both, and not produced by either.", "balance"], ["Awe, hope, shame", "The three states that complete the life of the act.", "balance"]]),
  }),
  makeChapter({
    id: 5, shortTitle: "Present but not understanding", formalTitle: "Presence of heart and understanding are two things",
    overview: "The distinction that does the most practical work in the book, drawn with care because the two are constantly run together.",
    moves: [
      { title: "Define presence", body: "By presence of heart we mean that the heart be emptied of anything other than what it is engaged in and speaking, so that the knowledge of the act and of the word accompanies them, and thought does not roam elsewhere." },
      { title: "Give its threshold", body: "Whenever thought turns from what is other than what he is in, and there is in his heart a remembrance of what he is in, and no heedlessness of it — presence of heart has been obtained. The bar is not ecstasy; it is not being elsewhere." },
      { title: "Separate understanding", body: "But understanding the meaning of the words is a matter beyond presence of heart. For the heart may be present with the utterance and not present with the meaning of the utterance, and what we mean by understanding is the heart's containing knowledge of the meaning." },
      { title: "Say why it varies", body: "This is a station in which people differ, since people do not share equally in understanding the meanings of the Quran and the glorifications. It is the one of the six that depends on what a person knows." },
    ],
    closer: [
      { title: "The observation about new meanings", body: "How many subtle meanings does one praying understand in the midst of the prayer that had never occurred to his heart before it. Ghazali treats the prayer as a place where understanding is produced and not merely applied." },
      { title: "How this explains a famous verse", body: "And it is from this aspect that the prayer restrains from indecency and wrong — because it makes a person understand matters that inevitably prevent indecency. The restraining power is located in the understanding rather than in the performance, which is a substantive reading of the verse." },
    ],
    distinction: ["Two ways a heart can be with a prayer", "With the words", "Not elsewhere, and following what is said — which is presence, and is the threshold.", "With the meanings", "Containing knowledge of what the words mean, which varies with what a person knows."],
    misreading: "Do not set the bar for presence at absorption. Ghazali's threshold is that thought is not roaming elsewhere and there is remembrance of what one is in, which is attainable rather than exalted.",
    reflection: "In your next prayer, notice whether you are absent, present with the words, or present with the meanings. The three are distinguishable from the inside.",
    audit: ["Which of the three am I in?", "Do I know what the words mean?", "Have I set the bar at absorption?", "What did I understand mid-prayer that I had not before?"],
    nodes: ["hudur", "tafahhum", "sitta"],
    model: chain("Three positions", "Distinguishable from the inside.", [["Elsewhere", "Thought roaming; presence has not been obtained.", "warning"], ["With the words", "Not elsewhere, and following what is said.", "balance"], ["With the meanings", "The heart containing knowledge of what is being said.", "support"]]),
  }),
  makeChapter({
    id: 6, shortTitle: "Beyond attention", formalTitle: "Reverence, awe, hope, and shame",
    overview: "The four remaining meanings, and Ghazali distinguishes the first of them from the two before it with a single ordinary example.",
    moves: [
      { title: "Separate reverence", body: "Reverence is a matter beyond presence of heart and understanding — for a man addresses his servant with speech while his heart is present and he understands what he says, and there is no reverence in it." },
      { title: "Note what the example proves", body: "Attention and comprehension are fully compatible with the absence of reverence. So no amount of concentration or of learning the meanings will by itself produce the third meaning, which is why it needed a separate treatment." },
      { title: "Name the remaining three", body: "Awe, hope, and shame. Each is a state rather than an act of attention, and each is treated with its causes and its remedies in turn." },
      { title: "Say what they complete", body: "These are what the chapter calls the meanings by which the life of the prayer is completed. The outward act can be perfect and the first two meanings present, and the act still be, on this account, without life." },
    ],
    closer: [
      { title: "Why the servant example is well chosen", body: "It uses a case every reader has: speaking attentively and comprehendingly to someone beneath you. Nobody would call that reverence, and nobody has to be persuaded of it — which settles the separation without argument." },
      { title: "The relation to Books 33 and 36", body: "Awe and hope are the subject of Book 33, and shame belongs with the states Book 36 derives from love. This chapter is where they are asked for inside a single act, which is why it does not treat them at length: the quarter that treats them is elsewhere." },
    ],
    distinction: ["Two things attention does not supply", "Reverence", "A man attends and comprehends while speaking to his servant, and there is none of it.", "Concentration", "Which is presence, and is a different meaning entirely."],
    misreading: "Do not conclude that the last four meanings can be manufactured by trying harder at the first two. The example is given precisely to show that they are not produced that way.",
    reflection: "Recall speaking carefully and attentively to someone you did not revere. That is the gap the chapter is naming.",
    audit: ["Do I have attention without reverence?", "Which of the four is furthest from me?", "Where are these treated at length?", "Am I trying to produce a state by concentrating?"],
    nodes: ["tazim", "sitta", "khawf-raja"],
    model: pair("What the servant example settles", "No argument is needed once it is seen.", [["Present and understanding", "Fully available while addressing someone beneath you.", "balance"], ["Reverence", "Absent in exactly that case, so it is not produced by the other two.", "support"]]),
  }),
  makeChapter({
    id: 7, shortTitle: "Repel the cause", formalTitle: "The remedy that works for presence of heart",
    overview: "The book's central practical argument, and its form is diagnostic: find the cause, and treat that instead of the symptom.",
    moves: [
      { title: "Establish that the states are already there", body: "The believer must be one who reveres God, fears Him, hopes in Him, and is ashamed of his shortcoming. He is not detached from these states after his faith, though their strength is proportional to the strength of his certainty." },
      { title: "Locate the failure", body: "So his being detached from them in the prayer has no cause but the scattering of thought, the dividing of the passing notions, the absence of the heart from the intimate address, and heedlessness of the prayer." },
      { title: "Name the mechanism", body: "And nothing distracts from the prayer except the incoming thoughts that occupy it." },
      { title: "Give the rule", body: "So the remedy for making the heart present is to repel those thoughts. And a thing is not repelled except by repelling its cause. So know its cause." },
    ],
    closer: [
      { title: "Why the first move is the important one", body: "By establishing that reverence and fear and hope are already present in any believer, Ghazali removes the obvious diagnosis — that a distracted prayer means a deficient faith. What is missing in the prayer is not the states but access to them, and the obstruction is thoughts." },
      { title: "The sentence that generalises", body: "A thing is not repelled except by repelling its cause. It is stated as a general principle and then applied, and it is the same principle Book 39 uses for the treatment of the heart's diseases: meet a cause with its opposite, which requires knowing the cause." },
    ],
    distinction: ["Two diagnoses of a distracted prayer", "The states are missing", "A deficiency of faith, which offers nothing to do but resolve harder.", "The access is blocked", "The states are present and thoughts are occupying the heart, which has a cause and therefore a treatment."],
    misreading: "Do not read the first move as flattery. Ghazali says the strength of these states is proportional to the strength of a person's certainty, so the claim is that they are present in some measure, not that they are strong.",
    reflection: "Notice what you usually conclude about yourself after a distracted prayer, and what this chapter concludes instead.",
    audit: ["What do I conclude after a distracted prayer?", "Is the state missing or blocked?", "What is the cause of the thoughts?", "Have I tried to repel a thought without its cause?"],
    nodes: ["hudur", "khawatir", "ilaj"],
    model: chain("The diagnostic chain", "Each step is required before the next.", [["The states are present", "In any believer, in proportion to his certainty.", "support"], ["Thoughts obstruct them", "Incoming and occupying, which is the only cause named.", "warning"], ["Repel the thoughts", "Which cannot be done directly.", "balance"], ["By repelling their cause", "So the cause must first be known.", "support"]]),
  }),
  makeChapter({
    id: 8, shortTitle: "Take it off", formalTitle: "External causes, and what was done about them",
    overview: "The first of the two kinds of cause, and Ghazali's treatment of it is entirely concrete — as are the examples, which are startling.",
    moves: [
      { title: "Name the cause", body: "The external cause is what strikes the hearing or appears to the sight. That may snatch the concern until he follows it and turns in it, and then the thought is drawn from it to something else, and it goes on in a chain." },
      { title: "Describe the chaining", body: "Seeing becomes a cause of thinking, and then some of those thoughts become causes of others. The damage is not the glance but the sequence it starts." },
      { title: "Note who is exempt", body: "Whoever's intention is strong and whose resolve is high is not distracted by what passes over his senses — but the weak must be. The remedy that follows is for the second kind of person, which Ghazali assumes is most of them." },
      { title: "Give the remedy", body: "Remove the object. The examples are the Messenger's: a marked cloak sent back with the words that it had just now distracted him from his prayer, and a plain one asked for in its place; a new sandal-strap ordered removed and the old one restored after he had looked at it in prayer." },
    ],
    closer: [
      { title: "How far the examples go", body: "A sandal whose beauty pleased him, given away to the first beggar he met and replaced with plain ones. A gold ring thrown from the pulpit with the words that it had occupied him — a look at it and a look at you. And two Companions who lost count of their prayers, one over a bird in the trees and one over fruiting palms, and each gave the whole garden away in charity." },
      { title: "What the examples license and what they do not", body: "They license removing an object rather than resisting it, which is the chapter's whole prescription. What they show is that this was not thought excessive by people whose prayer was not in doubt; the Companions' disposals are their own acts, reported here, not a scale of penalties." },
    ],
    distinction: ["Two responses to something that distracts", "Remove it", "Which is what every example in the chapter does, and what is prescribed.", "Resist it", "Working against the pull while leaving the cause in place, which the principle rules out."],
    misreading: "Do not take the Companions' giving away of gardens as a required response. They are reported as what particular people did; the chapter's instruction is that the cause is removed rather than resisted.",
    reflection: "Look around the place you pray and name the three things most likely to start a chain.",
    audit: ["What starts the chain for me?", "Have I removed it or resisted it?", "Is my resolve strong, honestly?", "What could I simply take away?"],
    nodes: ["khawatir", "ilaj", "zahir"],
    model: pair("Two kinds of response", "The chapter's examples are all of one kind.", [["Removing", "The cloak sent back, the strap restored, the ring thrown, the sandals given away.", "support"], ["Resisting", "Leaving the cause and fighting the effect, which the principle forbids.", "warning"]]),
  }),
  makeChapter({
    id: 9, shortTitle: "Nothing to take away", formalTitle: "Internal causes, and why they are harder",
    overview: "The second kind of cause, and Ghazali is honest that the remedy which works for the first does not transfer.",
    moves: [
      { title: "Name the cause", body: "The second cause is a matter inward in the person himself — a concern he carries into the prayer, which needs nothing external to set it going." },
      { title: "Say why the first remedy fails", body: "Removing the object works because there is an object. Where the cause is a concern already in the heart, there is nothing in the room to take away, and the same instruction has nothing to attach to." },
      { title: "Give what does work", body: "The treatment moves to what the concern is about: a matter genuinely settled stops generating thoughts, and a heart with a single dominant concern is not divided. Both are slow, and neither happens during the prayer." },
      { title: "Note the honesty of the section", body: "Ghazali does not offer a technique for the internal case equal to the one for the external. The asymmetry is left standing, which is consistent with his general refusal to promise that a state can be produced on demand." },
    ],
    closer: [
      { title: "How this connects to the rest of the Ihya", body: "A heart divided among many concerns is the subject of Book 35 on trust, Book 36 on love, and the whole Quarter of Perils. The internal cause of a distracted prayer is not a prayer problem, which is why this book cannot finish treating it." },
      { title: "Why the two causes are worth separating anyway", body: "Because the external ones are the tractable half and are usually ignored. A person who concludes that his distraction is a deep spiritual condition, when three quarters of it starts with what he can see, has misdiagnosed something he could have fixed in an afternoon." },
    ],
    distinction: ["Two causes of the same distraction", "External", "Something in the room, removable, and the tractable half.", "Internal", "A concern carried in, with nothing to remove and no quick treatment."],
    misreading: "Do not use the difficulty of the internal case as a reason to skip the external one. The chapter's structure is that the removable causes are removed first, and only what remains is the harder problem.",
    reflection: "Separate one distracted prayer into what came from the room and what you brought with you.",
    audit: ["How much came from the room?", "What did I bring in with me?", "Have I called a fixable thing deep?", "Where is the internal cause actually treated?"],
    nodes: ["khawatir", "ilaj", "qalb"],
    model: pair("Two causes, one tractable", "The tractable one is usually the one ignored.", [["From the room", "Removable, and where the chapter's examples all sit.", "support"], ["Brought in", "No object to remove; treated by books outside this quarter.", "warning"]]),
  }),
  makeChapter({
    id: 10, shortTitle: "Element by element", formalTitle: "What should be present in the heart at each part",
    overview: "The chapter's practical culmination: the prayer walked through from the call onward, with something specific named for each part rather than a general instruction to concentrate.",
    moves: [
      { title: "Set the task", body: "Your right, if you are among those desiring the hereafter, is that you not be heedless of the alerts contained in the conditions and elements of the prayer. The preceding conditions are the call, purification, covering, facing, standing, and the intention." },
      { title: "The call", body: "When you hear the caller's call, bring to your heart the terror of the call on the Day of Resurrection, and gird yourself outwardly and inwardly for the response and the hastening — for those who hasten to this call are the ones called with kindness on the day of the greatest presentation." },
      { title: "Give the self-test", body: "So present your heart to this call: if you find it filled with joy and gladness, laden with the desire to hurry, know that the call will come to you with good news on the day of judgement. And so he said: give us rest, Bilal — meaning, give us rest by it." },
      { title: "Purification", body: "When you perform it in your place, which is your furthest container; then in your clothes, which are your nearer covering; then in your skin, which is your nearest rind — do not be heedless of your kernel, which is your self, which is your heart." },
    ],
    closer: [
      { title: "Why naming a content for each part works", body: "An instruction to concentrate gives the mind nothing to hold, and a mind holding nothing wanders. Naming a specific thing at each moment gives presence something to be present to, which is the practical answer to the problem the chapter opened with." },
      { title: "The image of the four layers", body: "Place, clothes, skin, heart — container, covering, rind, kernel. It is Book 3's four ranks of purification restated inside a single act, so that the same movement from the outward to the inmost happens every time a person washes." },
    ],
    distinction: ["Two ways to attempt presence", "With a content", "Something specific named for each element, which attention can hold.", "By resolving to concentrate", "An instruction with no object, which leaves the mind free to wander."],
    misreading: "Do not treat the named contents as a script to be recited inwardly. They are what the parts of the prayer are said to alert a person to, and the section's own test is what a heart is found to be full of, not what it has rehearsed.",
    reflection: "Take the call to prayer alone and try the test given for it: present your heart to it and see what it is full of.",
    audit: ["What is my heart full of at the call?", "Do I give attention an object?", "Which element is emptiest for me?", "What is my kernel, on this account?"],
    nodes: ["tafsil", "hudur", "tahara"],
    model: chain("Four layers at the purification", "Book 3's ranks restated inside a single act.", [["The place", "Your furthest container.", "balance"], ["The clothes", "Your nearer covering.", "balance"], ["The skin", "Your nearest rind.", "balance"], ["The heart", "Your kernel, which is yourself, and which is not to be neglected.", "support"]]),
  }),
  makeChapter({
    id: 11, shortTitle: "Leading", formalTitle: "The imam and those who follow",
    overview: "The fourth chapter, which returns to the procedural register and sorts an office by its moments.",
    moves: [
      { title: "Sort by moment", body: "The imam has duties before the prayer, duties in the recitation, duties in the elements of the prayer, and duties after the closing salutation. The chapter is organised by when rather than by kind." },
      { title: "Note what the sorting achieves", body: "An office described as a list of qualities cannot be checked. Described as duties attaching to four moments, it can be, which is the same move the Ihya makes throughout when it turns a disposition into something locatable." },
      { title: "Give the register", body: "The material is practical: how to conduct the congregation, what to observe in leading, and what falls to the one following. It is given plainly and not argued." },
      { title: "Connect it to the third chapter", body: "An imam's presence of heart is not only his own affair, since a congregation follows his pace and his manner. The chapter is procedural, but it inherits a subject from the one before it." },
    ],
    closer: [
      { title: "The concern that runs under it", body: "Leading is a position of standing before others, which the Ihya treats with suspicion everywhere else — Book 28 on status and Book 1 on the scholars of this world both bear on it. The chapter itself does not raise that, and a reader coming from those books will hear it anyway." },
      { title: "What this edition does with it", body: "The duties are practical instruction. This section presents the organising principle and what it inherits, rather than reproducing the instructions, which belong to the text." },
    ],
    distinction: ["Two ways to describe an office", "By moments", "Duties attaching to before, during, and after, which can be checked.", "By qualities", "A description of the sort of person who should hold it, which cannot."],
    misreading: "Do not read the chapter's plainness as meaning the office is uncomplicated. The Ihya's treatment of standing before people is severe elsewhere, and this chapter simply does not take that up.",
    reflection: "Ask what a congregation actually receives from the person in front of it, beyond a pace to follow.",
    audit: ["Which moment am I asking about?", "What does the congregation take from me?", "What do Books 1 and 28 say about this position?", "Is this chapter's silence significant?"],
    nodes: ["imama", "salat", "jah"],
    model: chain("Four moments", "An office made checkable by when rather than by what.", [["Before", "What is due before the prayer begins.", "support"], ["In the recitation", "What is due while reciting.", "support"], ["In the elements", "What is due through the acts themselves.", "support"], ["After", "What is due after the closing salutation.", "support"]]),
  }),
  makeChapter({
    id: 12, shortTitle: "The Friday", formalTitle: "The Friday prayer, its excellence and its etiquette",
    overview: "The fifth chapter, and the longest procedural stretch in the book after the second: a day treated as a whole rather than an hour treated as an act.",
    moves: [
      { title: "Give the excellence", body: "The chapter opens with what is reported on the day's excellence, and Ghazali's framing is that this is a day rather than an appointment within one." },
      { title: "Give the conditions", body: "A section sets out the conditions of the Friday prayer — what must hold for it to be the Friday prayer at all, as distinct from what is merely fitting." },
      { title: "Give the etiquette in order", body: "The manners are then given on the order of the day, in ten groupings, running through the sequence a person actually passes through." },
      { title: "And then out of order", body: "A further section gives the manners and customs that fall outside that sequence and that apply across the whole day, which is what makes the treatment a day rather than an event." },
    ],
    closer: [
      { title: "Why the two orderings", body: "Some duties belong to a moment and some to a span. Giving them in one list would make the second kind look like steps to be completed, and a reader would finish them and be done — which is exactly what a treatment covering a whole day is trying to prevent." },
      { title: "The place of the excellence section", body: "It comes first, as in most books of the Ihya, and here it is doing real work: the ten groupings of etiquette are demanding, and a reader has to have been given a reason before being given a programme." },
    ],
    distinction: ["Two ways to treat a day", "As a span", "Manners that apply across it, given separately from the sequence.", "As a sequence", "Steps to be worked through, which a person completes and then has finished."],
    misreading: "Do not read the ten groupings as a checklist for a morning. Ghazali deliberately adds a section for what does not fit the sequence, because the subject is a day.",
    reflection: "Notice how differently a day reads when its manners are not all arranged as steps.",
    audit: ["Do I treat this as an event or a day?", "Which of my practices are sequence and which are span?", "What did I finish and consider done?", "Why is the excellence placed first?"],
    nodes: ["jumua", "adab", "salat"],
    model: pair("Two orderings", "The second is what makes it a day.", [["In sequence", "Ten groupings on the order a person passes through.", "support"], ["Across the day", "Manners that belong to no moment and are given separately.", "support"]]),
  }),
  makeChapter({
    id: 13, shortTitle: "What comes up", formalTitle: "Scattered questions that arise generally",
    overview: "The sixth chapter, and its title is unusually candid: questions that trouble everyone and that the aspirant needs to know.",
    moves: [
      { title: "Give the selection principle", body: "The chapter gathers scattered questions by which the trial is general and which the aspirant needs to know. Selection is by how often the difficulty arises rather than by where the questions belong in a legal scheme." },
      { title: "Note what that produces", body: "A chapter organised by the reader's practical situation, which is why it sits between the Friday prayer and the supererogatory prayers rather than being distributed through the earlier material." },
      { title: "Note the register", body: "The answers are legal and are given plainly, as elsewhere in the book, without the argument that characterises the third chapter." },
      { title: "Say why the chapter exists at all", body: "A manual organised strictly by topic leaves the commonest difficulties scattered across it. Gathering them separately is a concession to how the book is actually used." },
    ],
    closer: [
      { title: "The word for the aspirant", body: "The chapter names its reader: the one travelling the path, not the jurist and not the layman. That is the audience of the Ihya as a whole, and it is unusual for a book to say so in a chapter heading." },
      { title: "What this edition does with it", body: "The questions are technical and their answers vary between the schools of law. This section presents the chapter's selection principle and why it exists, rather than reproducing its rulings." },
    ],
    distinction: ["Two ways to organise a manual", "By topic", "Complete and systematic, with the common difficulties scattered through it.", "By what comes up", "A chapter gathered by frequency of difficulty, which is a concession to use."],
    misreading: "Do not treat this chapter as miscellaneous leftovers. Its selection principle is stated and deliberate, and it names its reader.",
    reflection: "Notice that a systematic writer added an unsystematic chapter, and why.",
    audit: ["What actually comes up for me?", "Would I find it in a systematic manual?", "Who is this chapter's reader?", "Where do I take technical questions?"],
    nodes: ["fiqh", "murid", "salat"],
    model: pair("Two organising principles", "The second exists because of how the book is used.", [["By topic", "Systematic, with difficulties scattered.", "balance"], ["By frequency", "Gathered where the trial is general, for the aspirant.", "support"]]),
  }),
  makeChapter({
    id: 14, shortTitle: "Beyond the obligatory", formalTitle: "The supererogatory prayers",
    overview: "The closing chapter, and it sorts everything beyond the obligatory by what occasions it — which turns out to be a claim about how a life is shaped.",
    moves: [
      { title: "Give the division", body: "What is beyond the obligatory prayers divides by its occasion, and the first division is what recurs with the recurrence of the days and the nights." },
      { title: "The second and third", body: "What recurs with the recurrence of the weeks. And what recurs with the recurrence of the years." },
      { title: "The fourth", body: "And what attaches to occasioning causes and is not tied to fixed times at all — the prayers that answer an event rather than a calendar." },
      { title: "Note what the sorting describes", body: "Four cycles: the day, the week, the year, and the unscheduled. Between them they cover every rhythm a life has, which is what makes this a description of a shape rather than a list of optional acts." },
    ],
    closer: [
      { title: "Why the fourth division matters", body: "Three of the four are calendars and can be planned. The fourth is occasioned — by need, by fear, by something arriving — and it is the one that keeps the scheme from being a timetable. A life with only the first three has no way to answer what happens to it." },
      { title: "How the book ends", body: "On what is optional. A book that argued in its third chapter that presence of heart is a condition of the obligatory prayer closes with the acts nobody is required to do, which places the whole demanding middle inside something voluntary." },
    ],
    distinction: ["Two ways to sort optional acts", "By occasion", "Day, week, year, and event — which describes the shape of a life.", "By merit", "A ranking of which are most worth doing, which would say nothing about rhythm."],
    misreading: "Do not read the fourth division as a residue. It is the one that lets the scheme answer events, and without it the other three are only a timetable.",
    reflection: "Ask which of the four cycles is empty for you, and what that says about how your practice is shaped.",
    audit: ["Which cycles do I actually keep?", "Is my fourth division empty?", "Do I have a way to answer events?", "What shape does my practice have?"],
    nodes: ["nawafil", "salat", "structure"],
    model: spectrum("Four cycles", "The fourth is what keeps it from being a timetable.", [["The day", "Recurring with the days and nights.", "support"], ["The week", "Recurring with the weeks.", "support"], ["The year", "Recurring with the years.", "support"], ["The occasion", "Attached to causes and to no fixed time.", "balance"]]),
  }),
];

export const book04ConceptNodes: ConceptNode[] = [
  ["salat", "Prayer", "Body and life", "The outward acts are the body; six inward meanings are what makes it alive."],
  ["structure", "Seven chapters", "One of them argues", "Six are procedural; the third is the sustained argument of the quarter."],
  ["khushu", "Humility", "Argued as a condition", "Established from commands, prohibitions, a rationale, and a restriction."],
  ["hudur", "Presence of heart", "Not absorption", "The threshold is that thought is not roaming and there is remembrance of what one is in."],
  ["tafahhum", "Understanding", "A further thing", "The heart may be present with the utterance and absent from its meaning."],
  ["tazim", "Reverence", "Not made by attention", "A man attends and comprehends while addressing his servant, without any of it."],
  ["sitta", "Six meanings", "Separable", "Each with its own causes and treatment, so failure can be located."],
  ["khawatir", "Passing thoughts", "The only obstruction", "What distracts is the incoming thoughts, and they are repelled by their causes."],
  ["ilaj", "The remedy", "Treat the cause", "A thing is not repelled except by repelling its cause, so the cause must be known."],
  ["qalb", "The heart", "Divided or single", "The internal cause of distraction is a concern carried in, treated in other quarters."],
  ["tafsil", "Element by element", "Attention needs an object", "Something specific named at each part, rather than an instruction to concentrate."],
  ["tahara", "Purification", "Four layers again", "Place, clothes, skin, heart — Book 3's ranks inside a single act."],
  ["fiqh", "Legal detail", "Given plainly", "Most of this book is a manual, and it is not argued."],
  ["zahir", "The outward acts", "Fixed completely", "Which is what lets the third chapter ask whether they are sufficient."],
  ["imama", "Leading", "Sorted by moment", "Duties before, in the recitation, in the elements, and after."],
  ["jah", "Standing before people", "Treated elsewhere", "Books 1 and 28 are severe about it; this chapter does not raise it."],
  ["jumua", "The Friday", "A day, not an hour", "Manners given both in sequence and across the whole span."],
  ["adab", "Etiquette", "Sequence and span", "Two orderings, because some duties belong to a moment and some do not."],
  ["murid", "The aspirant", "The named reader", "The sixth chapter says whom it is for, which is unusual for a chapter heading."],
  ["nawafil", "The supererogatory", "Four cycles", "Day, week, year, and occasion — the shape of a life rather than a list."],
  ["khawf-raja", "Fear and hope", "Two of the six", "Asked for inside a single act here; treated at length in Book 33."],
].map(([id, label, kicker, description], index) => ({ id, label, kicker, description, position: ["left", "right", "top", "bottom"][index % 4] }));

const node = (id: string, label: string, micro: string, summary: string, guardrail: string, chapterId: number, glyph: Journey["nodes"][number]["glyph"]): Journey["nodes"][number] => ({ id, label, micro, summary, guardrail, chapterId, glyph });

export const book04Journeys: Journey[] = [
  {
    id: "is-it-required", number: "01", question: "Is a distracted prayer a real prayer?", title: "Read the argument, not the sermon",
    description: "Find the one chapter in this book that argues, watch Ghazali marshal six legal evidences that presence of heart is a condition, and see what it costs the procedural chapters around it.",
    payoff: "You see a devotional claim made with legal instruments, and understand what position is being taken.",
    image: assetUrl("assets/system/book04-empty-room.jpg"), imageAlt: "A bare prayer room with a single mat laid straight on the floor, swept clean and lit from one high window.", minutes: 12, color: "#278d91",
    nodes: [
      node("two-registers", "Separate the registers", "Six manuals, one argument", "Only the third chapter reasons; the rest instruct.", "The weighting is not equal and is not marked in the text.", 1, "order"),
      node("what-it-fixes", "See what is fixed first", "The whole outward act", "Sequence and weights, obligatory separated from customary.", "Which is what lets the next chapter ask about sufficiency.", 2, "know"),
      node("the-command", "Take the first evidence", "For My remembrance", "The apparent sense of a command is obligation, and heedlessness contradicts remembrance.", "A legal move, not an appeal to how prayer feels.", 3, "clear"),
      node("the-restriction", "Take the restriction", "Prayer is only humility", "Restriction by the article and by the word only, with a cited precedent.", "He argues on the jurists' ground with their tools.", 3, "pattern"),
      node("the-tension", "Note what is left standing", "Two positions, one book", "The argument has consequences the procedural chapters do not draw.", "Ghazali does not disguise it and does not resolve it.", 3, "witness"),
    ],
  },
  {
    id: "six-meanings", number: "02", question: "What is actually missing from my prayer?", title: "Separate six things people run together",
    description: "Take the six inward meanings, learn the difference between being present with the words and present with their meaning, and meet the ordinary example that proves attention does not make reverence.",
    payoff: "You can name which of six things fails, instead of concluding that you lack devotion.",
    image: assetUrl("assets/system/book04-six-lamps.jpg"), imageAlt: "Six identical lamps in a row along a stone shelf, four of them lit and two dark, with no other light in the room.", minutes: 13, color: "#bf7a35",
    nodes: [
      node("the-six", "Take the six", "And the method", "Details, then causes, then treatment — the Ihya's structure for diseases.", "If each has a treatment, each can fail separately.", 4, "order"),
      node("the-threshold", "Find the threshold", "Not absorption", "Thought not roaming, and remembrance of what one is in.", "Setting the bar at ecstasy makes the whole thing unreachable.", 5, "know"),
      node("words-or-meaning", "Separate two", "Present with which?", "The heart may be with the utterance and absent from its meaning.", "This is the one of the six that depends on what you know.", 5, "diagnose"),
      node("new-meanings", "Note what prayer produces", "Understood mid-prayer", "Meanings that had never occurred to the heart before it.", "Which is how the prayer restrains from indecency.", 5, "witness"),
      node("the-servant", "Take the example", "Speaking to a servant", "Present, comprehending, and no reverence in it at all.", "Settles the separation without needing an argument.", 6, "clear"),
      node("not-by-trying", "Draw the consequence", "Concentration will not do it", "The last four meanings are not produced by the first two.", "Which is why they are treated separately.", 6, "steady"),
    ],
  },
  {
    id: "the-remedy", number: "03", question: "What actually fixes a wandering mind?", title: "Repel the cause, not the thought",
    description: "Take the diagnostic move that removes the obvious self-diagnosis, follow the rule that a thing is repelled only by its cause, and see what was actually done about it — including by the Prophet.",
    payoff: "You get a treatment for the tractable half of the problem, and an honest account of the other half.",
    image: assetUrl("assets/system/book04-the-cloak.jpg"), imageAlt: "A folded patterned cloak set aside on a bench with a plain undyed one laid out beside it, ready to be worn.", minutes: 13, color: "#c25f50",
    nodes: [
      node("already-there", "Take the first move", "The states are present", "Any believer reveres, fears, hopes, and is ashamed, in some measure.", "Which removes the diagnosis of deficient faith.", 7, "know"),
      node("only-thoughts", "Locate the obstruction", "Nothing else distracts", "The incoming thoughts are the only cause named.", "So the problem is access, not absence.", 7, "diagnose"),
      node("the-rule", "Take the rule", "Repel the cause", "A thing is not repelled except by repelling its cause.", "Which means the cause has to be identified first.", 7, "order"),
      node("the-chain", "Watch the chaining", "Seeing causes thinking", "And then some thoughts become causes of others.", "The damage is the sequence, not the glance.", 8, "pattern"),
      node("take-it-off", "Take the remedy", "Remove the object", "The cloak sent back, the strap restored, the ring thrown from the pulpit.", "Removing rather than resisting is the whole prescription.", 8, "clear"),
      node("the-other-half", "Face the harder half", "Nothing to remove", "A concern carried in has no object in the room.", "Ghazali leaves the asymmetry standing rather than promising a technique.", 9, "guard"),
    ],
  },
  {
    id: "give-it-an-object", number: "04", question: "What should I be thinking about, exactly?", title: "Give attention something to hold",
    description: "Follow the prayer from the call onward with something specific named at each part, take the self-test Ghazali gives for the call, and find Book 3's four ranks restated inside a single washing.",
    payoff: "You leave with a content for each element rather than an instruction to concentrate.",
    image: assetUrl("assets/system/book04-four-layers.jpg"), imageAlt: "A walnut set on a stone sill in four stages beside a folded cloth and a shallow basin of water.", minutes: 12, color: "#586fa8",
    nodes: [
      node("why-content", "See why content", "An instruction with no object", "A mind told to concentrate on nothing wanders.", "This is the practical answer to the whole chapter's problem.", 10, "know"),
      node("the-call", "Start at the call", "The terror of that call", "Gird yourself outwardly and inwardly for the response.", "Those who hasten to this are called with kindness.", 10, "receive"),
      node("the-test", "Take the test", "What is it full of?", "Present your heart to the call and see what you find.", "A test of what is there, not of what has been rehearsed.", 10, "diagnose"),
      node("give-us-rest", "Note the phrase", "Give us rest, Bilal", "Meaning give us rest by it, since his eye's coolness was in it.", "The register of the whole section is set by that word.", 10, "witness"),
      node("four-layers", "Take the layers", "Container, covering, rind, kernel", "Place, clothes, skin, and then the heart.", "Book 3's four ranks, inside a single act.", 10, "pattern"),
    ],
  },
  {
    id: "the-rest-of-it", number: "05", question: "How does the rest of the book work?", title: "Read the procedural chapters properly",
    description: "See how an office is made checkable, why a day needs two orderings, why a systematic writer added an unsystematic chapter, and what four cycles of optional prayer describe.",
    payoff: "You get the organising principle of each remaining chapter, which is what a reading edition can add to a manual.",
    image: assetUrl("assets/system/book04-four-cycles.jpg"), imageAlt: "Four concentric rings scored into a stone floor, the outermost broken by a single gap.", minutes: 11, color: "#a97837",
    nodes: [
      node("by-moment", "Sort the office", "Before, during, after", "Duties attached to moments can be checked; qualities cannot.", "The chapter does not raise what Books 1 and 28 would.", 11, "order"),
      node("two-orderings", "Note the two orderings", "Sequence and span", "Some duties belong to a moment and some to a whole day.", "One list would make the second kind look finishable.", 12, "pattern"),
      node("by-frequency", "Note the concession", "What actually comes up", "A chapter gathered by frequency of difficulty, naming its reader.", "A systematic writer conceding to how the book is used.", 13, "balance"),
      node("four-cycles", "Take the four cycles", "Day, week, year, event", "Which between them cover every rhythm a life has.", "The fourth is what keeps it from being a timetable.", 14, "steady"),
      node("ends-optional", "Note the ending", "On what is not required", "A book that argued for a condition closes with the voluntary.", "Which places the demanding middle inside something freely done.", 14, "witness"),
    ],
  },
];

export const book04Movements: TaxonomyGroup[] = [
  ["bab1", "1. The excellences of prayer", "The testimony, and the seven chapters announced.", [1]],
  ["bab2", "2. The outward acts", "The sequence, and the obligatory separated from the customary.", [2]],
  ["bab3", "3. The inward conditions", "The argument, the six meanings, the remedy, and what belongs at each element.", [3, 4, 5, 6, 7, 8, 9, 10]],
  ["bab4", "4. Leading and following", "An office sorted by its moments.", [11]],
  ["bab5", "5. The Friday prayer", "A day treated in sequence and across its span.", [12]],
  ["bab6", "6. Scattered questions", "Gathered by frequency of difficulty, for the aspirant.", [13]],
  ["bab7", "7. The supererogatory prayers", "Four cycles: day, week, year, and occasion.", [14]],
].map(([id, label, description, chapterIds], index) => ({ id, label, description, chapterIds, color: ["#bf7a35", "#278d91", "#c25f50", "#586fa8", "#a97837"][index % 5] })) as TaxonomyGroup[];

export const book04Instrument: Instrument = {
  title: "Where the prayer is failing",
  note: "Ghazali says the many expressions for what prayer requires inwardly reduce to six, that they are separable, and that a wandering mind has a cause which must be found before it can be treated. Answer for your prayers as they actually are, not for your best one.",
  items: [
    {
      id: "prayer", label: "Your prayer as it actually is", lede: "The ordinary ones, not the best one you remember",
      note: "The first question uses Ghazali's own distinctions between presence of heart, understanding the meanings, and the states beyond both. The second uses his division of the causes of distraction into the external and the internal — a division that matters because only one of the two has a quick remedy, and it is usually the one that gets ignored.",
      axes: [
        {
          id: "level", kicker: "The six meanings", question: "How far does your prayer usually get?",
          options: [
            { id: "elsewhere", label: "My mind is elsewhere for most of it", note: "Presence of heart has not been obtained, which is the first of the six." },
            { id: "words", label: "I follow the words but not their meaning", note: "Presence without understanding — Ghazali says these are two different things." },
            { id: "meaning", label: "I understand it, and it does not move me", note: "The first two present, and the third — reverence — absent." },
            { id: "reaches", label: "It reaches me", note: "Which the chapter treats as ordinary rather than exceptional, and does not ask you to sustain." },
          ],
        },
        {
          id: "cause", kicker: "The causes", question: "When you are taken away, what takes you?",
          options: [
            { id: "external", label: "Something I can see or hear", note: "The external cause: what strikes the hearing or appears to the sight, and then chains." },
            { id: "internal", label: "Nothing outside — my own concerns", note: "The internal cause, for which the chapter's main remedy has nothing to attach to." },
            { id: "both", label: "Both, and I could not weight them", note: "The commonest honest answer, and it means the tractable half is untested." },
            { id: "unnoticed", label: "I have never actually watched", note: "Which on his method is the step before any treatment is possible." },
          ],
        },
      ],
      verdicts: [
        { key: "*|unnoticed", name: "The step before the treatment", role: "balance", chapterId: 7, body: "Ghazali's rule is that a thing is not repelled except by repelling its cause, and he adds three words that this instrument is built on: so know its cause. Until the cause has been observed there is nothing for any remedy to attach to.", action: "Watch one prayer for the cause rather than for the distraction. His division is the only one you need: did it come from something that struck your hearing or appeared to your sight, or was it a concern you brought in with you? That single observation is what makes the rest of the chapter usable." },
        { key: "*|external", name: "The half you can fix today", role: "support", chapterId: 8, body: "This is the tractable cause, and Ghazali's remedy for it is not to resist but to remove. His examples are startling in how far they go: a marked cloak sent back with the words that it had just now distracted him from his prayer, and a plain one asked for in its place; a new sandal-strap ordered removed and the old one restored.", action: "Note also what he says about the mechanism — seeing becomes a cause of thinking, and then some of those thoughts become causes of others. The damage is the chain, not the glance, which is why removing the first link is worth more than fighting the fifth. Look at where you pray and name what to take away." },
        { key: "*|both", name: "Test the tractable half first", role: "balance", chapterId: 9, body: "Ghazali separates the external causes from the internal ones because only the first have a remedy that works during a prayer. Where both are present, the external ones are the half that can be settled, and until they are, you cannot know how much of the problem is the other kind.", action: "Remove what can be removed for a week and then answer this question again. He is honest that the internal cause is harder and that this book cannot finish treating it — a heart divided among many concerns is the subject of Books 35 and 36 and of the whole Quarter of Perils — but a person who calls a fixable thing deep has misdiagnosed it." },
        { key: "elsewhere|internal", name: "Not a deficiency of faith", role: "balance", chapterId: 7, body: "Ghazali's first move in the treatment removes the diagnosis you have probably reached. The believer, he says, must be one who reveres God, fears Him, hopes in Him, and is ashamed of his shortcoming, and is not detached from these states after his faith. So what fails in the prayer is not the states but access to them.", action: "The obstruction he names is the scattering of thought and the dividing of the passing notions — and where nothing external is doing it, the concern doing the dividing is what to look at. That work is not done during a prayer and is not done quickly, which he does not disguise." },
        { key: "words|*", name: "The second of the six", role: "support", chapterId: 5, body: "Ghazali separates these deliberately: the heart may be present with the utterance and not present with the meaning of the utterance. You have the first, which is the threshold, and what is missing is the one of the six that depends on what a person knows.", action: "This is the most directly repairable of the six, because it is a matter of learning what is being said. And note his observation about what follows: how many subtle meanings a person understands in the midst of the prayer that had never occurred to him before it — which is where he locates the prayer's power to restrain from indecency." },
        { key: "meaning|*", name: "Attention will not produce this", role: "balance", chapterId: 6, body: "You have the first two of the six and the third is absent, and Ghazali settles that case with an example rather than an argument: a man addresses his servant with speech while his heart is present and he understands what he says, and there is no reverence in it at all.", action: "So concentrating harder is the wrong instrument — the example exists to show that reverence is not made by the two meanings you already have. Awe and hope are treated at length in Book 33 and shame among the effects of love in Book 36; this chapter asks for them inside a single act and sends you elsewhere for the work." },
        { key: "reaches|*", name: "Which he treats as ordinary", role: "support", chapterId: 4, body: "Ghazali does not describe the six meanings as a rare attainment. He gives their details, their causes, and their treatment in the manner the Ihya uses for anything workable, and says plainly that people differ in them and that they differ within one person.", action: "Hold it without trying to secure it. The threshold he sets for presence is modest — that thought is not roaming and there is remembrance of what one is in — and the chapters on causes exist because he expects it to be lost regularly. What is worth doing is knowing what takes it away when it goes." },
        { key: "*|*", name: "Read the level with the cause", role: "balance", chapterId: 4, body: "A place your prayer reaches, and something that takes you out of it. Ghazali's two structures answer different questions: the six meanings say what is missing, and the two causes say why.", action: "Take the cause first, because it is the one with a remedy attached, and his instruction there is unambiguous — find it before treating it. Then use the six to say which thing you are trying to restore, since he built them as six precisely so that failure could be located rather than lamented." },
      ],
    },
  ],
};

export const book04Sources: SourceLink[] = [
  { label: "Primary Arabic text", note: "The complete public Arabic of Book 4 was read and used to establish the seven chapters, the argument for presence of heart, the six inward meanings, the treatment of distraction, and what belongs at each element.", url: "https://shamela.ws/book/9472/145" },
  { label: "That presence of heart is required", note: "The passage marshalling commands, prohibitions, a stated rationale, and a grammatical restriction to argue that humility and presence are conditions of the prayer.", url: "https://shamela.ws/book/9472/159" },
  { label: "The six inward meanings", note: "The passage naming presence of heart, understanding, reverence, awe, hope, and shame, and separating the first three from one another.", url: "https://shamela.ws/book/9472/161" },
  { label: "The remedy for presence of heart", note: "The passage locating the obstruction in incoming thoughts, giving the rule that a thing is repelled only by its cause, and dividing the causes into external and internal.", url: "https://shamela.ws/book/9472/163" },
  { label: "What belongs at each element", note: "The passage walking through the conditions and elements of the prayer and naming what should be present in the heart at each, including the four layers at the purification.", url: "https://shamela.ws/book/9472/165" },
  { label: "Forty-book structure", note: "Ghazali.org's listing places Book 4 as the fourth book of the Quarter of Worship and confirms its title.", url: "https://www.ghazali.org/listing-the-forty-books/" },
];

export const book04: SystemBook = {
  id: 4,
  title: "The Mysteries of Prayer",
  shortTitle: "Prayer",
  defaultJourneyId: "is-it-required",
  chapters: book04Chapters,
  conceptNodes: book04ConceptNodes,
  journeys: book04Journeys,
  sources: book04Sources,
  taxonomy: {
    title: "Seven chapters",
    note: "Ghazali's own seven, in his order. Six of them are procedural or devotional; the third is the most sustained argument in the Quarter of Worship, and eight of the fourteen reading sections belong to it.",
    groups: book04Movements,
  },
  instrument: book04Instrument,
  editorialNote: "The five journeys, fourteen reading sections, visual models, and diagnostic are editorial learning aids. The sections follow Ghazali's seven chapters in his order and are grouped under them in the movements list. The English is an original synthesis made from a reading of the public Arabic text, not a translation and not a substitute for one. Reports and inherited anecdotes are presented as material Ghazali transmitted; this prototype does not independently grade every narration, and the Arabic carries the graders' notes alongside several of the reports drawn on here. Two matters of scope should be stated. Most of this book is a legal and practical manual — the performance of the outward acts, the duties of the one leading, the conditions and etiquette of the Friday prayer, a chapter of scattered technical questions, and the supererogatory prayers. Those rulings vary between the schools of law; this edition presents how each chapter is organised and what it settles, rather than reproducing the instructions, and nothing here should be used as a source for them. And Ghazali's argument that humility and presence of heart are conditions of the prayer rather than perfections of it is a substantive legal position, not a devotional flourish; it is presented here with his own evidences and in his own register, and the edition notes that it stands in tension with rulings given elsewhere in the same book, which he does not resolve. The section on external causes reports what particular people did about them, including Companions who gave away entire gardens after losing count of a prayer; those are transmitted accounts and not a prescribed scale of responses, and the chapter's own instruction is simply that a cause is removed rather than resisted. The diagnostic applies his six meanings and his two causes to answers the reader supplies about his own prayer and cannot pronounce on anyone's state.",
};
