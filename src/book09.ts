import { assetUrl } from "./assetUrl";
import type { Chapter, ConceptNode, VisualModel } from "./data";
import type { Instrument, Journey, SourceLink, SystemBook, TaxonomyGroup } from "./systemTypes";

type Seed = { id: number; shortTitle: string; formalTitle: string; overview: string; moves: Array<{ title: string; body: string }>; closer: Array<{ title: string; body: string }>; distinction: [string, string, string, string, string]; misreading: string; reflection: string; audit: string[]; nodes: string[]; model: VisualModel };
const bab = (id: number) => (id <= 4 ? "the first chapter, on the excellence of remembrance" : id <= 8 ? "the second chapter, on supplication and its manners" : "the third, fourth, and fifth chapters, the collections");
const makeChapter = (seed: Seed): Chapter => ({
  id: seed.id, shortTitle: seed.shortTitle, formalTitle: seed.formalTitle, overview: seed.overview,
  points: seed.moves.slice(0, 3).map((m) => m.body), reflection: seed.reflection, relatedNodes: seed.nodes, visualModel: seed.model,
  deep: { thesis: seed.moves[0].body, context: seed.overview, moves: seed.moves, closeReading: seed.closer,
    distinction: { title: seed.distinction[0], firstLabel: seed.distinction[1], first: seed.distinction[2], secondLabel: seed.distinction[3], second: seed.distinction[4] },
    misreading: seed.misreading, observation: seed.reflection, selfAudit: seed.audit,
    sourceAnchor: `Book 9, ${bab(seed.id)}, ${seed.formalTitle}.` },
});
const chain = (title: string, caption: string, items: Array<[string, string, "support" | "balance" | "warning"]>): VisualModel => ({ kind: "chain", title, caption, items: items.map(([label, body, role]) => ({ label, body, role })) });
const pair = (title: string, caption: string, items: Array<[string, string, "support" | "balance" | "warning"]>): VisualModel => ({ kind: "pair", title, caption, items: items.map(([label, body, role]) => ({ label, body, role })) });
const spectrum = (title: string, caption: string, items: Array<[string, string, "support" | "balance" | "warning"]>): VisualModel => ({ kind: "spectrum", title, caption, items: items.map(([label, body, role]) => ({ label, body, role })) });

export const book09Chapters: Chapter[] = [
  makeChapter({
    id: 1, shortTitle: "Two and three", formalTitle: "The shape of the book",
    overview: "The book has five chapters, and the division between them is unusually clean: two argue, and three are collections.",
    moves: [
      { title: "Announce the five", body: "The excellence of remembrance and its benefit, in summary and in detail; the excellence of supplication and its manners, with seeking forgiveness and blessing on the Messenger; transmitted supplications ascribed to their occasions and their authors; selected supplications with the chains omitted; and the supplications transmitted for particular events." },
      { title: "Note the division", body: "The first two chapters set out what remembrance and supplication are and how they are done. The last three are anthologies, and they are the longest part of the book." },
      { title: "Say how the collections differ", body: "One arranges supplications by their occasions and their authors; one selects and drops the chains of transmission; one gathers what is said when particular events occur. Three different organising principles for the same kind of material." },
      { title: "Note where the argument sits", body: "Two objections are raised in this book and both are answered — why an easy act outweighs hard ones, and what supplication is for given the decree. Both are in the argued chapters, and the second is the last thing in the book." },
    ],
    closer: [
      { title: "Why the collections are so large", body: "Supplication is the one act of worship whose content is words, and words can be given exactly. A book on prayer can describe the acts; a book on supplication can hand over the thing itself, and three quarters of this one does." },
      { title: "What this edition does with them", body: "The collections are what they are: texts to be used. This edition presents their organising principles and treats the argued chapters at length; a reader wanting the supplications should go to the text, where they are given with their occasions and, in one chapter, with their chains." },
    ],
    distinction: ["Two kinds of chapter here", "Argued", "What remembrance and supplication are, how they are done, and the two objections.", "Collected", "The supplications themselves, arranged three different ways."],
    misreading: "Do not treat the collections as an appendix. They are most of the book, and the two argued chapters exist to say how the material in them is to be used.",
    reflection: "Notice that this is the only book in the quarter that can simply hand you the act it describes.",
    audit: ["Which chapter do I need?", "Am I after an argument or a text?", "How are the three collections different?", "Where are the objections raised?"],
    nodes: ["dhikr", "dua", "structure"],
    model: pair("Five chapters, two kinds", "The collections are the longer part.", [["Two argued", "What these acts are, how they are done, and two objections answered.", "support"], ["Three collected", "By occasion and author, selected without chains, and for particular events.", "balance"]]),
  }),
  makeChapter({
    id: 2, shortTitle: "The excellence", formalTitle: "The excellence of remembrance and its benefit",
    overview: "The first chapter gathers what is reported, and the material it gathers is unusually generous — which is what makes the objection in the next section pressing.",
    moves: [
      { title: "Gather the reports", body: "The chapter assembles the verses, reports, and traditions on the excellence of remembrance, in summary and then in detail, treating the assemblies of remembrance, the formula of unity, glorification, praise, and the rest in turn." },
      { title: "Note the scale of the claims", body: "The reports carried here place remembrance very high — among them that the best of deeds is that a man die with his tongue moist with the remembrance of God." },
      { title: "Note the structure of the detail", body: "Each formula is given its own treatment: the excellence of the assemblies, then of the formula of unity, then of glorification and praise and the rest of the invocations." },
      { title: "Say what this sets up", body: "The generosity of the reports is exactly what produces the difficulty. An act that is light on the tongue is being credited above acts that cost a great deal, and Ghazali raises that as an objection rather than letting it pass." },
    ],
    closer: [
      { title: "Why the objection is his own", body: "Nobody forced it on him. He gathers the strongest reports available, states plainly that they credit an easy act above hard ones, and then asks how that can be — which is the same procedure as Book 8's fourth chapter and Book 6's ninth section." },
      { title: "The pattern in this quarter", body: "Every book gathers excellences first. In three of them — this, fasting, and recitation — the excellences produce a difficulty the author then has to answer, and in each case he answers it rather than moving on." },
    ],
    distinction: ["Two ways to leave a set of excellences", "With the difficulty raised", "Noticing what the reports imply and answering for it.", "As encouragement", "Which leaves the reader with a promise he cannot make sense of."],
    misreading: "Do not read the abundance of reports as the chapter's argument. Ghazali's own next move is to ask how they can be true, which means the abundance was the problem and not the answer.",
    reflection: "Notice how much is promised here for how little, and whether that has ever troubled you.",
    audit: ["What do these reports promise?", "For how much effort?", "Has that ever troubled me?", "What does Ghazali do with it?"],
    nodes: ["dhikr", "fadila", "structure"],
    model: chain("The chapter's own trajectory", "The abundance creates the difficulty.", [["Gather generously", "The strongest reports on the excellence of remembrance.", "support"], ["Notice the implication", "An easy act credited above costly ones.", "balance"], ["Raise it as an objection", "Rather than moving on to the next chapter.", "support"]]),
  }),
  makeChapter({
    id: 3, shortTitle: "The light thing", formalTitle: "How an easy act outweighs hard ones",
    overview: "The objection and the answer, and the answer is deflationary in a way that changes what the whole first chapter was promising.",
    moves: [
      { title: "Put the objection", body: "If you say: how is it that the remembrance of God, despite its lightness on the tongue and the fewness of its toil, became better and more beneficial than the whole of the acts of worship, with all the hardships in them?" },
      { title: "Mark the limit", body: "Know that the verification of this is not fitting except for the science of unveiling — and what is permitted to be mentioned in the science of practice is the following." },
      { title: "Give the answer", body: "That what has effect and is beneficial is remembrance continually, together with presence of heart. As for remembrance with the tongue while the heart is heedless, it is of little avail." },
      { title: "Close the second escape", body: "And presence of heart for a moment with the remembrance, and then obliviousness of God while occupied with the world, is also of little avail." },
    ],
    closer: [
      { title: "What the answer actually does", body: "It does not defend the easy act. It says that the act the reports are praising is not the easy one: continual remembrance with a present heart is not light on the tongue in any sense, and the version that is light is described as of little avail — twice, once for the heedless tongue and once for the momentary presence." },
      { title: "The positive claim", body: "Rather presence of heart with God continually, or in most times, is what is put before the acts of worship — indeed by it the rest of the acts of worship are ennobled, and it is the utmost fruit of the practical acts of worship. The claim is not that remembrance beats prayer, but that it is what prayer is for." },
    ],
    distinction: ["Two things called remembrance", "Continual, with presence", "What the reports credit, and what is not light at all.", "On the tongue, or in moments", "Which Ghazali twice describes as of little avail."],
    misreading: "Do not take the second clause as the lesser of two goods. Ghazali says a moment of presence followed by obliviousness while occupied with the world is of little avail — which is the ordinary practice of most readers.",
    reflection: "Ask which of the two things you have been doing, and which of them the reports were about.",
    audit: ["Which one am I doing?", "How long does presence last?", "What follows the moment?", "What is being put before the acts of worship?"],
    nodes: ["hudur", "dhikr", "dawam"],
    model: spectrum("Three conditions", "Two of them are named as of little avail.", [["Tongue, heart heedless", "Of little avail.", "warning"], ["A moment, then the world", "Also of little avail.", "warning"], ["Continually, or in most times", "What is put before the acts of worship.", "support"]]),
  }),
  makeChapter({
    id: 4, shortTitle: "A beginning and an end", formalTitle: "What remembrance produces",
    overview: "A short passage that says where remembrance leads, and it turns out to lead to the subject of Book 36.",
    moves: [
      { title: "State the structure", body: "And remembrance has a beginning and an end." },
      { title: "Give the beginning", body: "Its beginning necessitates intimacy and love of God." },
      { title: "Give the end", body: "And its end necessitates the same intimacy and love, and issues from them — so that what was produced at the start becomes the source at the finish." },
      { title: "Note the reversal", body: "The same two things stand at both ends of the practice, once as its fruit and once as its cause. A remembrance begun in effort ends by being produced by what it produced." },
    ],
    closer: [
      { title: "What the reversal explains", body: "It accounts for a difficulty in the previous section: continual remembrance with presence sounds impossible as an exertion. On this account it is not sustained by exertion at the end, because by then it is issuing from love rather than producing it." },
      { title: "Where this is treated", body: "Intimacy and love are the subject of Book 36, which derives intimacy from where a lover's gaze rests and argues that love follows knowledge. This passage is the practical entry to that book, and it is placed in the middle of a chapter of excellences." },
    ],
    distinction: ["Two positions of one pair", "As the fruit", "Intimacy and love produced by the practice at its beginning.", "As the source", "The same two producing the practice at its end."],
    misreading: "Do not read the end as a state to aim at directly. Book 36 argues at length that love follows knowledge and cannot be summoned, and this passage describes an outcome rather than prescribing one.",
    reflection: "Notice that the practice is described as changing its own cause.",
    audit: ["Which end am I at?", "Is my practice producing or produced?", "What sustains it?", "Where is the other end treated?"],
    nodes: ["uns", "mahabba", "dhikr"],
    model: pair("Both ends of one practice", "The same pair, in two positions.", [["At the beginning", "The practice produces intimacy and love.", "support"], ["At the end", "Intimacy and love produce the practice.", "support"]]),
  }),
  makeChapter({
    id: 5, shortTitle: "The excellence of asking", formalTitle: "The excellence of supplication",
    overview: "The second chapter opens on the verses, and the first of them settles the question of whether asking is wanted before any manner of asking is discussed.",
    moves: [
      { title: "Give the first verse", body: "And when My servants ask you about Me — I am near; I answer the call of the caller when he calls Me, so let them respond to Me." },
      { title: "Give the second", body: "Call upon your Lord humbly and in secret; He does not love the transgressors." },
      { title: "Give the third", body: "And your Lord said: call upon Me and I will answer you — those who are too proud for My worship will enter Hell abased." },
      { title: "Note what the third establishes", body: "Calling is placed inside worship, and declining to call is described as pride. Supplication is not an optional recourse on this reading; it is a form of the thing itself." },
    ],
    closer: [
      { title: "What the verses settle in advance", body: "The chapter's ten manners are about how to ask, and the last section of the book answers what asking accomplishes. Both presuppose that asking is wanted, and the verses are placed first so that neither discussion has to establish it." },
      { title: "The second verse's clause", body: "Humbly and in secret. Two of the ten manners are already contained in a verse gathered under the excellences, which is why the chapter's title runs the excellence and the manners together." },
    ],
    distinction: ["Two ways to place supplication", "Inside worship", "Where declining to ask is described as pride, which the third verse states.", "Beside it", "A recourse in difficulty, which would make the ten manners a matter of technique."],
    misreading: "Do not read the promise of an answer as the chapter's subject. The book's last section takes up what the answer consists in, and it is more careful than this chapter needs to be.",
    reflection: "Notice that not asking is what the verse calls pride.",
    audit: ["Do I ask, or only when pressed?", "Is asking worship for me, or recourse?", "What do the verses promise?", "Where is the promise examined?"],
    nodes: ["dua", "fadila", "ibada"],
    model: chain("What the verses establish", "Before any manner is discussed.", [["He is near", "And answers the call of the caller.", "support"], ["Humbly and in secret", "Two of the ten manners, already in the verse.", "balance"], ["Not asking is pride", "Which places calling inside worship rather than beside it.", "support"]]),
  }),
  makeChapter({
    id: 6, shortTitle: "Times and states", formalTitle: "The first manners: when to ask",
    overview: "The first two of the ten manners concern occasion rather than content, and they are given more space than any others.",
    moves: [
      { title: "Give the first", body: "That he watch for the noble times for his supplication — like the day of Arafa from the year, and Ramadan from the months, and Friday from the week, and the hour before dawn from the hours of the night." },
      { title: "Give the ground", body: "God says: and in the hours before dawn they seek forgiveness. And it is reported that God descends each night to the lowest heaven when the last third of the night remains, and says: who calls upon Me, that I may answer him; who asks Me, that I may give him; who seeks My forgiveness, that I may forgive him." },
      { title: "Give the illustration", body: "It was said that Jacob said he would seek forgiveness for them in order to supplicate at the hour before dawn — and that he rose at that hour supplicating with his sons saying amen behind him, and it was revealed that they were forgiven and made prophets." },
      { title: "Give the second manner", body: "That he seize the noble states. It was said that the gates of heaven are opened at the advance of the ranks in God's path — and the manner extends to the other states at which the reports say the asking is received." },
    ],
    closer: [
      { title: "Why occasion comes before content", body: "Nothing in the first two manners concerns what is asked for. They concern when, which is a variable a person controls entirely and which requires no discernment about the request itself — the same reason Book 5 puts timing among its eight duties." },
      { title: "The four scales", body: "A day from the year, a month from the months, a day from the week, an hour from the night. The first manner names one occasion at each scale of time, so that no unit of a person's calendar is without a marked hour in it." },
    ],
    distinction: ["Two things a supplicant controls", "The occasion", "When it is asked, which requires no discernment about the request.", "The content", "What is asked, which the later manners treat and which is harder."],
    misreading: "Do not read the noble times as the only times. The verses in the previous section place calling inside worship generally, and these manners concern where it is most received rather than where it is permitted.",
    reflection: "Look at the four scales and ask which of them has a marked hour in your week.",
    audit: ["Which of the four scales do I keep?", "Do I ask at a time, or when pressed?", "What state was I in the last time I asked?", "Is when easier for me than what?"],
    nodes: ["adab-dua", "awqat", "dua"],
    model: spectrum("One occasion at each scale", "So that no unit of the calendar is unmarked.", [["From the year", "The day of Arafa.", "support"], ["From the months", "Ramadan.", "support"], ["From the week", "Friday.", "support"], ["From the night", "The hour before dawn.", "support"]]),
  }),
  makeChapter({
    id: 7, shortTitle: "The rest of the ten", formalTitle: "The remaining manners of supplication",
    overview: "The eight manners that follow move from occasion to bearing to content, and several of them constrain what may be asked and how.",
    moves: [
      { title: "Note the movement", body: "Having settled the occasion, the manners turn to the bearing of the supplicant, the manner of the asking, and the content of the request." },
      { title: "Give the register", body: "They cover the direction faced, the lowering of the voice, the avoidance of rhymed elaboration, humility and earnestness, insistence and repetition, opening with the remembrance of God, and the inward conditions that the request be lawful and the heart present." },
      { title: "Name the one Ghazali stresses", body: "The inward condition is where he places the weight: that the heart be present and the request lawful. The outward manners are given briefly and this one is not." },
      { title: "Note the constraint on content", body: "The verse gathered in the excellences already carries it — He does not love the transgressors — and the manners make the limit explicit: what is asked for is itself subject to the same judgement as any other act." },
    ],
    closer: [
      { title: "Why elaboration is discouraged", body: "Rhymed and worked-up phrasing is singled out, and the reason is the one this quarter gives everywhere: a form that can be perfected invites being perfected, and the perfecting displaces the thing it was meant to carry." },
      { title: "The relation to the collections", body: "Three chapters of transmitted supplications follow. A reader who has the manners can use them; a reader who has only the texts has words whose conditions he does not know, which is the reason the manners precede the collections." },
    ],
    distinction: ["Two ways a supplication can fail", "In its manner", "Voice, phrasing, bearing — which the outward manners address.", "In its content or its heart", "An unlawful request or an absent heart, which the manners place the weight on."],
    misreading: "Do not treat the ten as a technique for securing an answer. The last section of the book is careful about what an answer is, and the manners are conditions rather than levers.",
    reflection: "Ask whether your asking has ever been improved in its phrasing at the cost of its earnestness.",
    audit: ["Is my request lawful?", "Is my heart present in it?", "Have I worked on the phrasing?", "Which manner do I fail?"],
    nodes: ["adab-dua", "hudur", "dua"],
    model: chain("Three registers of the manners", "The weight is on the last.", [["The occasion", "When it is asked, which the first two settle.", "balance"], ["The manner", "Voice, phrasing, bearing, insistence.", "balance"], ["The heart and the request", "Present, and lawful — where Ghazali places the weight.", "support"]]),
  }),
  makeChapter({
    id: 8, shortTitle: "Two particular askings", formalTitle: "Seeking forgiveness, and blessing on the Messenger",
    overview: "The chapter's title names two forms of asking specially, and each has an excellence section of its own.",
    moves: [
      { title: "Name them", body: "The chapter is titled to include the excellence of seeking forgiveness and the excellence of blessing on the Messenger, alongside the manners of supplication generally." },
      { title: "Note what distinguishes seeking forgiveness", body: "It is the one supplication whose content is fixed by the state of the one asking rather than by what he wants — it is asked because of what he has done, not for something he lacks." },
      { title: "Note what distinguishes the blessing", body: "It is the one supplication whose benefit is not asked for the one making it. The asking is on behalf of another, and the reports promise a return to the asker precisely because he did not ask for one." },
      { title: "Say why they are separated out", body: "Between them they cover the two cases the general manners do not obviously fit: a request that is not for anything, and a request that is not for oneself." },
    ],
    closer: [
      { title: "The pairing", body: "One looks backward at what the supplicant has done and one looks outward at someone else. Placing them together at the end of the chapter on manners leaves the reader with the two forms of asking that are hardest to turn into a technique for getting things." },
      { title: "Their place in the collections", body: "Both recur throughout the three chapters that follow, and the reports on their excellence gathered here are what tell a reader why those particular formulas appear so often in the anthologies." },
    ],
    distinction: ["Two supplications that break the pattern", "Seeking forgiveness", "Asked because of what you have done rather than for what you lack.", "Blessing on the Messenger", "Asked for another, with the return promised for not asking it for yourself."],
    misreading: "Do not treat these as two more formulas among the collections. They are given their own excellences here because neither fits the shape of a request, which is what the rest of the chapter is about.",
    reflection: "Ask when you last made a request that was not for anything you wanted.",
    audit: ["Do I ask for anything but what I want?", "What is my seeking forgiveness for?", "Whom do I ask on behalf of?", "Why are these two separated out?"],
    nodes: ["istighfar", "salawat", "dua"],
    model: pair("Two askings that are not requests", "Which is why they need their own treatment.", [["Backward", "Seeking forgiveness, for what has been done.", "support"], ["Outward", "Blessing on the Messenger, asked for another.", "support"]]),
  }),
  makeChapter({
    id: 9, shortTitle: "Three collections", formalTitle: "The transmitted supplications and how they are arranged",
    overview: "The last three chapters are anthologies, and each is arranged on a different principle — which is the most useful thing to know about them.",
    moves: [
      { title: "The first collection", body: "Supplications transmitted and ascribed to their occasions and their authors — what it is recommended that a person say morning and evening and after each prayer, given with whose supplication each one was." },
      { title: "The second collection", body: "Selected supplications from the transmitted material, with the chains of transmission omitted, gathered from the Messenger and from his Companions." },
      { title: "The third collection", body: "The supplications transmitted for the occurrence of each event — what is said when a particular thing happens rather than at a particular time." },
      { title: "Note the three principles", body: "By author and daily occasion; by selection without chains; and by event. Between them they cover a person who wants a practice, a person who wants a text, and a person to whom something has happened." },
    ],
    closer: [
      { title: "Why the ascriptions matter in the first", body: "Naming whose supplication each one was — Aisha's, Abraham's, Ali's — makes the collection a record as well as a resource. A reader is not only given words but told who said them, which changes how they are used." },
      { title: "What this edition does with them", body: "These chapters are texts to be used and are given in full in the Arabic, with the graders' notes on the reports throughout. This edition presents their arrangement and does not reproduce them; a reader wanting the supplications should go to the text." },
    ],
    distinction: ["Two things a collection can be", "A record", "Ascribed to occasions and authors, so that a reader knows whose words he has.", "A resource", "Selected with the chains dropped, which is the second collection's principle."],
    misreading: "Do not read the omission of chains in the second collection as carelessness. It is stated in the chapter's own title, which distinguishes it from the first collection precisely on that point.",
    reflection: "Notice that one of the three collections is organised by what happens to you rather than by what you plan.",
    audit: ["Which collection fits my case?", "Do I want a practice, a text, or a response?", "Whose words am I using?", "Where would I find them?"],
    nodes: ["majmua", "dua", "structure"],
    model: spectrum("Three principles of arrangement", "Each fits a different reader.", [["By occasion and author", "Morning, evening, after prayer — and whose it was.", "support"], ["Selected, chains dropped", "A resource rather than a record.", "balance"], ["By event", "What is said when something happens.", "support"]]),
  }),
  makeChapter({
    id: 10, shortTitle: "Supplication is a cause", formalTitle: "What asking is for, given the decree",
    overview: "The last thing in the book, and it answers the objection that would make everything before it pointless — in two sentences.",
    moves: [
      { title: "Put the objection", body: "If you say: what is the benefit of supplication, when the decree has no repelling?" },
      { title: "Give the answer", body: "Know that among the decree is the repelling of affliction by supplication." },
      { title: "Name what supplication is", body: "So supplication is a cause. It is not placed outside the decree and set against it; it is placed inside it, as one of the things by which what is decreed comes about." },
      { title: "Note where the answer sits", body: "It is the closing passage of the book. Three chapters of supplications have already been given, and the question of what they accomplish is answered after them rather than before." },
    ],
    closer: [
      { title: "What the answer dissolves", body: "The objection assumes two things competing: a fixed decree, and a request trying to alter it. Ghazali denies the picture rather than the conclusion — the request is among the things decreed, as a shield is among the things by which an arrow is repelled, so nothing is being altered and nothing is idle." },
      { title: "Where the Ihya says this at length", body: "Book 35 argues that means are not what removes reliance, and that one who guards is relying on the Creator of contrivance rather than on his contrivance. Book 36 devotes a section to showing that supplication does not contradict contentment, and notes that the person at the highest station of contentment prayed constantly." },
    ],
    distinction: ["Two pictures of supplication and the decree", "A cause within it", "The request among the things by which what is decreed comes about.", "A force against it", "An attempt to alter what is fixed, which is the picture the objection assumes."],
    misreading: "Do not read this as making the outcome indifferent. Ghazali's answer is that supplication is a cause, which means it does something — the point of the answer is that causes do not compete with the decree.",
    reflection: "Notice that the objection is answered by changing the picture rather than by adjusting the claim.",
    audit: ["Which picture have I been holding?", "Do I treat asking as a force or a cause?", "Has the objection stopped me asking?", "Where is this argued at length?"],
    nodes: ["qadar", "sabab", "dua"],
    model: pair("Two pictures", "Only one of them makes the objection possible.", [["A cause within the decree", "Among the things by which what is decreed comes about.", "support"], ["A force against it", "Competing with what is fixed, which the answer denies.", "warning"]]),
  }),
];

export const book09ConceptNodes: ConceptNode[] = [
  ["dhikr", "Remembrance", "Not the light version", "What the reports credit is continual, with presence, and is not light at all."],
  ["dua", "Supplication", "Inside worship", "Declining to call is described as pride, which places asking within worship."],
  ["structure", "Five chapters", "Two argue, three collect", "The collections are the longer part, arranged three different ways."],
  ["fadila", "The excellences", "Producing the difficulty", "The generosity of the reports is what makes the objection pressing."],
  ["hudur", "Presence of heart", "The condition", "Without it, remembrance is twice described as of little avail."],
  ["dawam", "Continuity", "The other condition", "A moment of presence followed by the world is also of little avail."],
  ["uns", "Intimacy", "Both ends", "Produced by remembrance at its beginning and producing it at its end."],
  ["mahabba", "Love", "Book 36's subject", "Which follows knowledge and cannot be summoned, as that book argues."],
  ["ibada", "Worship", "Where calling sits", "Not a recourse beside worship but a form of it."],
  ["adab-dua", "Ten manners", "Occasion, manner, heart", "The weight is placed on the last of the three registers."],
  ["awqat", "The noble times", "One at each scale", "A day from the year, a month, a day from the week, an hour from the night."],
  ["istighfar", "Seeking forgiveness", "Not for anything", "Asked because of what has been done rather than for what is lacked."],
  ["salawat", "Blessing on the Messenger", "Not for oneself", "The return promised precisely because the asking was for another."],
  ["majmua", "The collections", "Three principles", "By occasion and author; selected without chains; and by event."],
  ["qadar", "The decree", "Not a competitor", "The objection assumes a picture the answer denies rather than adjusts."],
  ["sabab", "A cause", "What supplication is", "Among the things by which what is decreed comes about."],
].map(([id, label, kicker, description], index) => ({ id, label, kicker, description, position: ["left", "right", "top", "bottom"][index % 4] }));

const node = (id: string, label: string, micro: string, summary: string, guardrail: string, chapterId: number, glyph: Journey["nodes"][number]["glyph"]): Journey["nodes"][number] => ({ id, label, micro, summary, guardrail, chapterId, glyph });

export const book09Journeys: Journey[] = [
  {
    id: "why-so-easy", number: "01", question: "Why would something this easy count for so much?", title: "Watch the answer take the ease away",
    description: "Take the objection Ghazali raises against his own first chapter, and the answer that says the act the reports are praising is not the light one.",
    payoff: "You learn which of two things you have been doing, and which one the promises were about.",
    image: assetUrl("assets/system/book09-the-light-thing.jpg"), imageAlt: "A single small brass weight on one pan of a balance, outweighing a heaped pan of larger stones opposite.", minutes: 11, color: "#278d91",
    nodes: [
      node("the-generosity", "Note the generosity", "Very high claims", "Among them, that the best of deeds is to die with the tongue moist with it.", "The abundance is what produces the difficulty.", 2, "know"),
      node("the-objection", "Take the objection", "Light on the tongue", "How does it outweigh acts full of hardship?", "Raised by Ghazali against his own chapter.", 3, "diagnose"),
      node("the-limit", "Note the limit", "Not fitting here", "The verification belongs to the science of unveiling.", "What follows is what practice permits saying.", 3, "clear"),
      node("twice-little", "Take both refusals", "Of little avail, twice", "The heedless tongue, and the moment followed by the world.", "The second is the ordinary practice of most readers.", 3, "witness"),
      node("what-it-is", "Find the real claim", "By it the others are ennobled", "Presence continually is what is put before the acts of worship.", "Not that remembrance beats prayer, but that it is what prayer is for.", 3, "steady"),
      node("both-ends", "Note the reversal", "Fruit, then source", "Intimacy and love are produced by it and then produce it.", "Which is why the end is not sustained by exertion.", 4, "pattern"),
    ],
  },
  {
    id: "how-to-ask", number: "02", question: "How is asking actually done?", title: "Take the occasion before the words",
    description: "Find where the verses place supplication, work through manners that begin with when rather than what, and meet the two forms of asking that are not requests.",
    payoff: "You get four marked hours in your calendar and a check on what you are actually asking for.",
    image: assetUrl("assets/system/book09-before-dawn.jpg"), imageAlt: "A window in a plain wall showing the first grey of dawn, with an unlit lamp on the sill beneath it.", minutes: 12, color: "#bf7a35",
    nodes: [
      node("not-asking", "Note where it sits", "Not asking is pride", "The verse places calling inside worship rather than beside it.", "Which settles the question before the manners begin.", 5, "know"),
      node("four-scales", "Take the four scales", "Year, month, week, night", "One marked occasion at every scale of time.", "So that no unit of a calendar is unmarked.", 6, "order"),
      node("before-dawn", "Note the hour", "The last third", "Who calls upon Me, that I may answer him.", "The one occasion available every day.", 6, "receive"),
      node("occasion-first", "See why when comes first", "It needs no discernment", "The occasion is entirely controlled and requires no judgement about the request.", "The same reason Book 5 puts timing among its duties.", 6, "clear"),
      node("the-weight", "Find where the weight is", "Lawful, and present", "The outward manners are brief; the inward condition is not.", "The manners are conditions, not levers.", 7, "diagnose"),
      node("two-that-differ", "Take the two", "Neither is a request", "Seeking forgiveness, and blessing asked for another.", "The two forms hardest to turn into a technique.", 8, "balance"),
    ],
  },
  {
    id: "does-it-do-anything", number: "03", question: "Does asking actually do anything?", title: "Change the picture, not the claim",
    description: "Take the objection that would make the whole book pointless, and the two-sentence answer Ghazali closes it with — then see where the Ihya argues it at length.",
    payoff: "You get the reason a fixed decree and a real request are not competitors.",
    image: assetUrl("assets/system/book09-the-shield.jpg"), imageAlt: "A plain round shield propped against a wall beside an arrow lying on the ground, neither of them damaged.", minutes: 10, color: "#c25f50",
    nodes: [
      node("the-objection", "Take the objection", "No repelling", "What is the benefit of asking, when the decree has no repelling?", "It would make three chapters of supplications pointless.", 10, "know"),
      node("among-it", "Take the answer", "Among the decree", "The repelling of affliction by supplication is itself decreed.", "Two sentences, at the very end of the book.", 10, "clear"),
      node("a-cause", "Name what it is", "A cause", "Placed inside the decree rather than set against it.", "Nothing is altered, and nothing is idle.", 10, "pattern"),
      node("the-picture", "See what dissolves", "The competition", "The objection assumed two things competing; the answer denies the picture.", "The conclusion is not adjusted, the picture is.", 10, "diagnose"),
      node("elsewhere", "Follow it out", "Books 35 and 36", "Means do not remove reliance; supplication does not contradict contentment.", "And the one at the highest station prayed constantly.", 10, "steady"),
    ],
  },
];

export const book09Movements: TaxonomyGroup[] = [
  ["bab1", "1. The excellence of remembrance", "The reports, the objection they raise, and what remembrance produces.", [1, 2, 3, 4]],
  ["bab2", "2. Supplication and its manners", "The verses, ten manners, and the two askings that are not requests.", [5, 6, 7, 8]],
  ["bab345", "3–5. The collections", "Three anthologies on three principles, and the closing answer about the decree.", [9, 10]],
].map(([id, label, description, chapterIds], index) => ({ id, label, description, chapterIds, color: ["#bf7a35", "#278d91", "#c25f50"][index % 3] })) as TaxonomyGroup[];

export const book09Instrument: Instrument = {
  title: "What asking is, and what remembrance is",
  note: "Ghazali raises two objections in this book and answers both: how an act light on the tongue outweighs hard ones, and what supplication accomplishes given the decree. Answer for your own practice as it is, not for what you intend.",
  items: [
    {
      id: "practice", label: "Your own practice", lede: "As it actually is this month",
      note: "The first question is the one his closing passage answers; the second is the one his third section answers, and its two middle options are both described by him as of little avail. Note that neither answer is an encouragement — one changes a picture and the other takes back an ease.",
      axes: [
        {
          id: "asking", kicker: "Supplication", question: "When you ask, what do you take yourself to be doing?",
          options: [
            { id: "changing", label: "Trying to change what will happen", note: "Which his answer neither affirms nor denies in the way the question expects." },
            { id: "accepting", label: "Expressing acceptance, not expecting change", note: "A position Book 36 devotes a section to correcting." },
            { id: "commanded", label: "Doing what I was told to do", note: "Which the verses support: declining to call is described as pride." },
            { id: "unsure", label: "I do not know, and it stops me asking", note: "The case the last passage of the book was written for." },
          ],
        },
        {
          id: "dhikr", kicker: "Remembrance", question: "And your remembrance — what is it actually like?",
          options: [
            { id: "tongue", label: "On the tongue, heart elsewhere", note: "Which Ghazali describes as of little avail." },
            { id: "moments", label: "Present for a moment, then back to the day", note: "Which he describes as of little avail also — the surprising one." },
            { id: "most", label: "Present through most of the day", note: "What he says is put before the acts of worship." },
            { id: "none", label: "I do not have a practice of it", note: "Which is a starting point rather than a failure." },
          ],
        },
      ],
      verdicts: [
        { key: "unsure|*", name: "Supplication is a cause", role: "support", chapterId: 10, body: "This is the case the last passage of the book was written for, and the answer is two sentences: among the decree is the repelling of affliction by supplication — so supplication is a cause. It is not placed outside the decree and set against it.", action: "Notice what the answer does. Your objection assumed two things competing: something fixed, and a request trying to alter it. Ghazali denies the picture rather than the conclusion — the request is among the things by which what is decreed comes about, so nothing is altered and nothing is idle. Book 36 makes the same point about contentment, and observes that the person at the highest station of it prayed constantly." },
        { key: "accepting|*", name: "The position Book 36 corrects", role: "balance", chapterId: 10, body: "Ghazali devotes a section elsewhere to exactly this. Supplication does not contradict contentment and does not take its owner out of that station — and he is unusually sharp about the error, calling it ignorance of interpretation to suppose that acceptance rules out asking.", action: "His evidence is the strongest available: the abundance of the Prophet's supplications, and that he was at the highest of the stations of contentment. And the verse praising servants who call upon Him in hope and fear. Acceptance is a state toward what has come; asking is an act commanded within it." },
        { key: "*|moments", name: "The one that surprises people", role: "warning", chapterId: 3, body: "Ghazali names this case specifically and gives it the same verdict as the heedless tongue: presence of heart for a moment with the remembrance, and then obliviousness of God while occupied with the world, is also of little avail. Most readers assume this is the good version.", action: "What he puts before the acts of worship is presence of heart with God continually, or in most times — and he says that by it the rest of the acts of worship are ennobled and that it is their utmost fruit. That is a different practice, not a longer one, and the passage on remembrance having a beginning and an end is where he says how it becomes sustainable." },
        { key: "*|tongue", name: "Of little avail", role: "warning", chapterId: 3, body: "His words exactly: as for remembrance with the tongue while the heart is heedless, it is of little avail. This is the answer to the objection his own first chapter raises — the reports credit an act that is not the light one, and the light one is named and set aside.", action: "The repair is not more of it. He identifies what the reports are about as continual remembrance with presence, so the question is where any presence at all is available to you — and the four marked occasions of the second chapter are where the book suggests starting, because timing requires no discernment." },
        { key: "*|none", name: "A starting point", role: "balance", chapterId: 6, body: "There is nothing in the book that treats this as a failure, and its second chapter is built for it. The first two of the ten manners concern occasion rather than content, and occasion is the one variable a person controls entirely without needing any judgement about what he is asking for.", action: "Take the four scales: a day from the year, a month from the months, a day from the week, and the hour before dawn from the night. One occasion at every scale, so that no unit of a calendar is unmarked — and the last of them is available every day. The three collections in the book supply the words." },
        { key: "commanded|most", name: "Both as he describes them", role: "support", chapterId: 3, body: "Asking placed inside worship, which is where the verse puts it — those too proud for My worship will enter Hell abased. And remembrance present through most of the day, which is what he says is put before the acts of worship and by which the rest of them are ennobled.", action: "The passage to sit with is the short one about remembrance having a beginning and an end: its beginning necessitates intimacy and love of God, and its end issues from them. If the practice is holding, that reversal is why — and Book 36 is where the far end of it is treated." },
        { key: "changing|*", name: "A cause does something", role: "balance", chapterId: 10, body: "Ghazali's answer does not correct you so much as reframe you. Supplication is a cause — which means it does something, and the point of calling it a cause is that causes do not compete with the decree but belong to it.", action: "Where this can go wrong is in treating the manners as levers. His ten are conditions rather than techniques, and the weight in them falls on the request being lawful and the heart present, not on the phrasing — which he specifically warns against elaborating. Book 35's treatment of means is the fuller version of the same point." },
        { key: "*|*", name: "Read the two together", role: "balance", chapterId: 1, body: "What you take asking to do, and what your remembrance is like. This book raises exactly two objections and answers both, and between them they cover the two things that stop people practising: not knowing what asking accomplishes, and not believing that something so light could matter.", action: "Take them in the book's own order. The answer about remembrance takes the ease away — the act being credited is continual and present, not light. The answer about the decree gives the ease back — asking is a cause, and causes are not idle. Neither answer is an encouragement, which is why both are worth having." },
      ],
    },
  ],
};

export const book09Sources: SourceLink[] = [
  { label: "Primary Arabic text", note: "The complete public Arabic of Book 9 was read and used to establish the five chapters, the objection about the lightness of remembrance, the manners of supplication, and the closing answer on the decree.", url: "https://shamela.ws/book/9472/293" },
  { label: "The excellence of remembrance", note: "The chapter gathering the verses, reports, and traditions on remembrance in summary and in detail, treating each formula in turn.", url: "https://shamela.ws/book/9472/294" },
  { label: "How an easy act outweighs", note: "The passage raising the objection about the lightness of remembrance and answering that what is credited is continual remembrance with presence of heart.", url: "https://shamela.ws/book/9472/301" },
  { label: "The excellence of supplication", note: "The passage gathering the verses on calling upon God, including the one describing those too proud for His worship.", url: "https://shamela.ws/book/9472/303" },
  { label: "The manners of supplication", note: "The passage giving the ten manners, beginning with the noble times at each scale of the calendar.", url: "https://shamela.ws/book/9472/304" },
  { label: "Supplication and the decree", note: "The closing passage of the book, answering that among the decree is the repelling of affliction by supplication, so that supplication is a cause.", url: "https://shamela.ws/book/9472/328" },
  { label: "Forty-book structure", note: "Ghazali.org's listing places Book 9 as the ninth book of the Quarter of Worship and confirms its title.", url: "https://www.ghazali.org/listing-the-forty-books/" },
];

export const book09: SystemBook = {
  id: 9,
  title: "Invocations and Supplications",
  shortTitle: "Invocations",
  defaultJourneyId: "why-so-easy",
  chapters: book09Chapters,
  conceptNodes: book09ConceptNodes,
  journeys: book09Journeys,
  sources: book09Sources,
  taxonomy: {
    title: "Five chapters, two kinds",
    note: "Ghazali's own five, in his order. The first two argue and the last three are anthologies of transmitted supplications arranged on three different principles — and the closing passage of the fifth answers the objection that would make all of them pointless.",
    groups: book09Movements,
  },
  instrument: book09Instrument,
  editorialNote: "The three journeys, ten reading sections, visual models, and diagnostic are editorial learning aids. The sections follow Ghazali's five chapters in his order and are grouped under them in the movements list. The English is an original synthesis made from a reading of the public Arabic text, not a translation and not a substitute for one. Reports and inherited anecdotes are presented as material Ghazali transmitted; this prototype does not independently grade every narration, and the Arabic of this book carries an unusually dense apparatus of graders' notes, several of which mark reports used in these chapters as weak or uncommon. One matter of scope should be stated plainly: three of the five chapters are collections of transmitted supplications, and they are the longer part of the book. This edition presents how each collection is arranged and what distinguishes it from the others, and reproduces none of the supplications themselves. They are texts to be used, they are given in the Arabic with their ascriptions and — in one chapter — with their chains, and a reader who wants them should go to the text or to a reliable collection of transmitted supplications rather than to a reading edition. Ghazali's answer on supplication and the decree is given as he gives it, in his own two sentences, and it is a position within a live theological discussion rather than a neutral summary; the Ihya argues it at more length in Books 35 and 36, which are cross-referenced. The diagnostic applies his own two answers to a practice the reader supplies and cannot pronounce on anyone's state.",
};
