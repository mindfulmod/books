import { assetUrl } from "./assetUrl";
import type { Chapter, ConceptNode, VisualModel } from "./data";
import type { Instrument, Journey, SourceLink, SystemBook, TaxonomyGroup } from "./systemTypes";

type Seed = { id: number; shortTitle: string; formalTitle: string; overview: string; moves: Array<{ title: string; body: string }>; closer: Array<{ title: string; body: string }>; distinction: [string, string, string, string, string]; misreading: string; reflection: string; audit: string[]; nodes: string[]; model: VisualModel };
const bab = (id: number) => (id <= 3 ? "the first chapter, on the disagreement over audition" : id <= 9 ? "the second chapter, on the states of the listener" : "the second chapter, on ecstasy and its effects");
const makeChapter = (seed: Seed): Chapter => ({
  id: seed.id, shortTitle: seed.shortTitle, formalTitle: seed.formalTitle, overview: seed.overview,
  points: seed.moves.slice(0, 3).map((m) => m.body), reflection: seed.reflection, relatedNodes: seed.nodes, visualModel: seed.model,
  deep: { thesis: seed.moves[0].body, context: seed.overview, moves: seed.moves, closeReading: seed.closer,
    distinction: { title: seed.distinction[0], firstLabel: seed.distinction[1], first: seed.distinction[2], secondLabel: seed.distinction[3], second: seed.distinction[4] },
    misreading: seed.misreading, observation: seed.reflection, selfAudit: seed.audit,
    sourceAnchor: `Book 18, ${bab(seed.id)}, ${seed.formalTitle}.` },
});
const chain = (title: string, caption: string, items: Array<[string, string, "support" | "balance" | "warning"]>): VisualModel => ({ kind: "chain", title, caption, items: items.map(([label, body, role]) => ({ label, body, role })) });
const pair = (title: string, caption: string, items: Array<[string, string, "support" | "balance" | "warning"]>): VisualModel => ({ kind: "pair", title, caption, items: items.map(([label, body, role]) => ({ label, body, role })) });
const spectrum = (title: string, caption: string, items: Array<[string, string, "support" | "balance" | "warning"]>): VisualModel => ({ kind: "spectrum", title, caption, items: items.map(([label, body, role]) => ({ label, body, role })) });

export const book18Chapters: Chapter[] = [
  makeChapter({
    id: 1, shortTitle: "Two chapters", formalTitle: "The shape of the book",
    overview: "The most contested book of the quarter, and its structure is a declaration of method: the ruling first, and only then what listening does to a person.",
    moves: [
      { title: "Announce the two", body: "The permissibility of audition; and the manners of audition and its effects — in the heart by ecstasy, and in the limbs by dancing, crying out, and the tearing of garments." },
      { title: "Give the order of the first chapter", body: "The statements expressing the schools; then the evidence for permissibility; then the answer to what those who hold it forbidden relied upon. The opposing case is transmitted before the argument for the position he will take." },
      { title: "Note what that commits him to", body: "He states the prohibiting view from named authorities, at length and without softening it, before offering a word of his own. A reader meets the strongest case against the position before meeting the position." },
      { title: "Note the second chapter's subject", body: "Not whether but what: the effects of listening, which is where the four states of the listener sit, and where the book's most useful material is." },
    ],
    closer: [
      { title: "Why this book is placed here", body: "It follows companionship, seclusion, and travel — books about arrangements of a life — and precedes enjoining right. It is the point at which the quarter takes up a genuinely disputed practice rather than a settled one." },
      { title: "What this edition presents", body: "The structure of the dispute, the reasoning on both sides as Ghazali reports it, and the second chapter's account of what listening does. It does not present his conclusion as a ruling, and the editorial note says why." },
    ],
    distinction: ["Two ways to argue a contested question", "Opposition first", "The prohibiting view transmitted at length before any argument for the other side.", "Conclusion first", "Which lets a reader adopt a position before meeting the case against it."],
    misreading: "Do not take the length of the permitting argument as the measure of the question. Ghazali reports the prohibiting authorities by name, and they are not minor ones.",
    reflection: "Notice how rare it is for an author to give the opposing case the opening chapter.",
    audit: ["Which case did I meet first?", "Whose names are on the other side?", "Is this settled or disputed?", "What is the second chapter about?"],
    nodes: ["sama", "khilaf", "structure"],
    model: chain("The first chapter's order", "The opposing case comes first.", [["The schools", "Transmitted, by name, including those forbidding it.", "balance"], ["The evidence", "For permissibility.", "support"], ["The answer", "To what the prohibiting side relied on.", "balance"]]),
  }),
  makeChapter({
    id: 2, shortTitle: "The other side", formalTitle: "The prohibiting authorities, stated first",
    overview: "The opening of the first chapter, and what it transmits is not a caricature — it is the position of major jurists, in their own words.",
    moves: [
      { title: "Name the source", body: "Al-Qadi Abu al-Tayyib al-Tabari related from al-Shafi'i, Malik, Abu Hanifa, Sufyan, and a group of the scholars words from which it is inferred that they held it forbidden." },
      { title: "Give al-Shafi'i's words", body: "Al-Shafi'i said, in the Book of the Manners of Judging, that singing is a frivolity, disliked, resembling the false — and that whoever does much of it is a fool whose testimony is rejected." },
      { title: "Give a further restriction", body: "Al-Qadi Abu al-Tayyib said that listening to it from a woman who is not a close relative is not permitted at all among al-Shafi'i's companions, whether unveiled or from behind a screen." },
      { title: "Note what the transmission establishes", body: "That the question is genuinely disputed among the founders of the schools, and that a reader who arrives with a settled view is holding one side of a real disagreement." },
    ],
    closer: [
      { title: "Why he transmits it in full", body: "A position stated weakly is easy to answer and the answer proves nothing. By giving the prohibiting view its strongest form and its most authoritative names, Ghazali makes his own argument have to be worth something — and leaves a reader able to hold the other side after reading him." },
      { title: "The consequence al-Shafi'i attaches", body: "Whose testimony is rejected. The prohibiting view is not a matter of taste but carries a legal consequence for a person's standing, which is what makes the dispute substantive rather than devotional." },
    ],
    distinction: ["Two ways to report an opposing view", "In its strongest form", "Named authorities, exact words, and the consequences they attached.", "As an obstacle", "Summarised weakly, so that answering it settles nothing."],
    misreading: "Do not read this chapter as Ghazali's own position. It is the case he undertakes to answer, and he answers it — but the answer is his, within a dispute that remains a dispute.",
    reflection: "Ask whether you knew this was contested among the founders of the schools.",
    audit: ["Did I know it was disputed?", "Whose position is this?", "What consequence is attached?", "Can I state the other side?"],
    nodes: ["khilaf", "sama", "fiqh"],
    model: pair("Two sides of a real dispute", "Both held by people the reader is expected to respect.", [["Forbidding", "Al-Shafi'i, Malik, Abu Hanifa, Sufyan, and others.", "balance"], ["Permitting", "The position Ghazali will argue for, after reporting the above.", "balance"]]),
  }),
  makeChapter({
    id: 3, shortTitle: "Three steps", formalTitle: "The chain the book is built on",
    overview: "One sentence at the head of the first chapter sets the architecture of the whole book, and it separates three things usually run together.",
    moves: [
      { title: "Give the first term", body: "Know that audition is the first matter." },
      { title: "Give the second", body: "Audition fruits a state in the heart called ecstasy." },
      { title: "Give the third", body: "Ecstasy fruits the moving of the limbs — either by an unmeasured movement, which is called agitation, or a measured one, which is called clapping and dancing." },
      { title: "Note what the chain permits", body: "Three separate rulings. What is heard, what it produces inwardly, and what the body does are three different acts with three different questions, and the book treats them in that order." },
    ],
    closer: [
      { title: "Why the separation matters for the dispute", body: "Much of the argument about audition conflates them: an objection to what people do while listening becomes an objection to listening. Splitting the chain means a person can hold that one link is permitted and another is not, which is where most of the reasonable positions actually sit." },
      { title: "The same structure as the quarter's other chains", body: "Book 39 gave thought, knowledge, state, act; Book 38 gave knowledge, state, acts. Here it is audition, ecstasy, movement — the Ihya's recurring move of separating what produces from what is produced, so that the right thing is treated at the right link." },
    ],
    distinction: ["Two ways to argue about a practice", "Link by link", "Three separate questions about hearing, the state it produces, and what the body does.", "As one thing", "Which lets an objection to the third become an objection to the first."],
    misreading: "Do not assume a ruling on one link settles another. The book's whole architecture depends on their being three, and its second chapter treats them as three stations.",
    reflection: "Ask which of the three links your own view is actually about.",
    audit: ["Which link is my objection about?", "Have I run them together?", "Which link is disputed?", "What does the separation allow?"],
    nodes: ["sama", "wajd", "haraka"],
    model: chain("Three links", "Three questions, treated in order.", [["Audition", "What is heard — the first matter.", "support"], ["Ecstasy", "A state in the heart, which the hearing fruits.", "balance"], ["Movement", "Agitation if unmeasured; clapping and dancing if measured.", "balance"]]),
  }),
  makeChapter({
    id: 4, shortTitle: "Four listeners", formalTitle: "The first station: understanding",
    overview: "The second chapter's opening, and the most useful thing in the book: the same sound, four listeners, four different acts.",
    moves: [
      { title: "Give the first station", body: "Know that the first degree of audition is the understanding of what is heard, and the applying of it to a meaning that occurs to the listener." },
      { title: "Give the chain again", body: "Then the understanding fruits ecstasy, and the ecstasy fruits movement in the limbs. So consider these three stations." },
      { title: "Give the variable", body: "The first station is understanding, and it differs according to the states of the listener." },
      { title: "Give the number", body: "The listener has four states. Everything else in the book's practical half depends on which of the four a person is in." },
    ],
    closer: [
      { title: "Why the ruling follows the listener", body: "Nothing in the four states concerns what is heard. The same words and the same melody run through all four, and what changes is what the hearer applies them to — which means the question of permissibility, on this account, cannot be settled by examining the sound alone." },
      { title: "What that costs the argument", body: "It makes the answer unavailable to an outside observer. Two people at the same gathering may be doing entirely different things, and no rule about the gathering can distinguish them — which is both the strength and the difficulty of Ghazali's position." },
    ],
    distinction: ["Two places a ruling could sit", "In the listener", "What he applies the hearing to, which no observer can see.", "In the sound", "What is played and sung, which could be regulated but which the four states make irrelevant."],
    misreading: "Do not read the four states as degrees of enjoyment. They are four different objects of application, and one of them is condemned outright.",
    reflection: "Before reading them, guess which of the four your own listening is.",
    audit: ["What do I apply it to?", "Could anyone else tell?", "Is my question about the sound or the listener?", "Which of the four am I?"],
    nodes: ["fahm", "sama", "ahwal"],
    model: chain("Three stations", "The first has four states.", [["Understanding", "What the hearing is applied to — four states.", "support"], ["Ecstasy", "Which the understanding fruits.", "balance"], ["Movement", "Which the ecstasy fruits.", "balance"]]),
  }),
  makeChapter({
    id: 5, shortTitle: "The camel shares it", formalTitle: "The first state",
    overview: "The lowest of the four, and Ghazali's judgement on it is two things at once — permitted, and the meanest rank there is.",
    moves: [
      { title: "Give the state", body: "That his listening be by mere nature — that is, he has no share in the audition but the enjoyment of the melodies and the notes." },
      { title: "Give the ruling", body: "This is permitted." },
      { title: "Give the rank", body: "It is the meanest of the ranks of audition, since the camel shares it with him — and so do the rest of the beasts." },
      { title: "Give the reason", body: "Indeed this taste requires nothing but life, for every animal has a kind of pleasure in good sounds." },
    ],
    closer: [
      { title: "Why permitted and mean at once", body: "The two judgements are independent and both are stated. Something can be entirely lawful and also be the lowest thing available, and Ghazali says both in consecutive sentences rather than letting either crowd out the other." },
      { title: "The argument in the camel", body: "It is a ranking by what the capacity requires. Pleasure in sound requires only life, which is why it cannot be a high rank — the same reasoning Book 36 used when it argued from the five senses to a sixth, and Book 6 used to place the human between the beasts and the angels." },
    ],
    distinction: ["Two judgements on one act", "Permitted", "Lawful, and stated without qualification.", "The meanest rank", "Because the capacity it requires is nothing more than being alive."],
    misreading: "Do not collapse the two judgements into one. Saying a thing is the lowest available is not saying it is forbidden, and Ghazali is careful to say both.",
    reflection: "Ask what your listening would require of you if a camel could do it too.",
    audit: ["Is this all my listening is?", "Permitted, or high?", "What capacity does it require?", "Have I confused lawful with good?"],
    nodes: ["ahwal", "tab", "sama"],
    model: pair("Two independent judgements", "Both stated, neither crowding out the other.", [["Permitted", "Stated flatly, with no qualification.", "support"], ["The meanest rank", "Requiring nothing but life, which the beasts have.", "balance"]]),
  }),
  makeChapter({
    id: 6, shortTitle: "The one he refuses", formalTitle: "The second state",
    overview: "The only one of the four Ghazali condemns, and he declines to discuss it beyond saying so.",
    moves: [
      { title: "Give the state", body: "That he listen with understanding, but applies it to a created form — either a specific one or an unspecified one." },
      { title: "Name whose it is", body: "This is the audition of the young and of the people of appetites, and their application of what is heard is according to their appetites and the demand of their states." },
      { title: "Give the judgement", body: "This state is too base for us to speak about, except by declaring its baseness and forbidding it." },
      { title: "Note the refusal", body: "He gives it no analysis and no treatment. A book that treats every other case at length declines to take this one up at all, which is itself the verdict." },
    ],
    closer: [
      { title: "Where the condemnation actually falls", body: "Not on the sound and not on the gathering, but on what the hearing is being applied to. The same words in the third state's mouth are unobjectionable; the offence is entirely in the application, which is consistent with the whole chapter's method." },
      { title: "Why it is placed second", body: "Between the permitted-but-lowest and the aspirant's. That ordering says that understanding is not itself an improvement — the second state understands what it hears, and is worse than the first, which does not." },
    ],
    distinction: ["Two states with understanding", "Applied to a created form", "According to appetite, which is the state he refuses to discuss.", "Applied to one's own dealings with God", "The same understanding, differently directed, which is the third state."],
    misreading: "Do not read this as condemning the music. Every one of the four states can involve the same sound, and what is condemned here is what a particular hearer does with it.",
    reflection: "Notice that the state with understanding ranks below the state without it, and why.",
    audit: ["What do I apply it to?", "Is understanding an improvement here?", "Where does the offence sit?", "Would anyone else see the difference?"],
    nodes: ["ahwal", "shahwa", "sama"],
    model: spectrum("The first two states", "Understanding is not itself an improvement.", [["By mere nature", "Permitted, and the meanest rank.", "balance"], ["Applied to a created form", "Understood, and worse — too base to discuss.", "warning"]]),
  }),
  makeChapter({
    id: 7, shortTitle: "His own dealings", formalTitle: "The third state",
    overview: "The state of the aspirant, and it is the one this book's practical half is actually written for.",
    moves: [
      { title: "Give the state", body: "That he applies what he hears to the states of his own soul in its dealing with God — and to the turning of his states, between enablement at one time and hindrance at another." },
      { title: "Name whose it is", body: "This is the audition of the aspirants, especially the beginners." },
      { title: "Give the reason it works", body: "For the aspirant inevitably has an object that is his aim, and his aim is the knowledge of God — so what he hears finds something in him already directed, and attaches to it." },
      { title: "Note the two poles", body: "Enablement and hindrance. What is applied is not a settled condition but an alternation, which is why an aspirant hears the same words differently on different days." },
    ],
    closer: [
      { title: "Why beginners especially", body: "A beginner has an aim and is unevenly able to hold it, which is exactly the material the third state applies. Someone with no aim has nothing for the hearing to attach to, and someone settled has no alternation to recognise — the state depends on the instability." },
      { title: "How it differs from the second", body: "Both understand and both apply. The second applies to a created form and the third to the listener's own relation to God, and nothing else separates them — which is why the chapter insists that the ruling follows the listener." },
    ],
    distinction: ["Two things an aspirant can hear in the same words", "His own alternation", "Enablement and hindrance in his dealing with God, which is the third state.", "A settled condition", "Which he does not have, and which is why the state belongs to beginners."],
    misreading: "Do not read the third state as inferior because it is the beginner's. It is the state the practical chapter is written for, and the fourth is described as rarely lasting.",
    reflection: "Ask what your own alternation is between, and whether you would recognise it in something you heard.",
    audit: ["Do I have an aim?", "What is my alternation between?", "Is there something for it to attach to?", "Which of the two applications is mine?"],
    nodes: ["ahwal", "murid", "sama"],
    model: pair("Two applications of one understanding", "Nothing else separates the second state from the third.", [["To a created form", "According to appetite, which is refused.", "warning"], ["To his own dealing with God", "The alternation of enablement and hindrance.", "support"]]),
  }),
  makeChapter({
    id: 8, shortTitle: "The drunk has no report", formalTitle: "The fourth state",
    overview: "The highest of the four, described in a passage of unusual precision — and immediately qualified.",
    moves: [
      { title: "Give the state", body: "The audition of one who has passed beyond the states and the stations, so that understanding anything other than God has departed from him — until he has departed from himself, and from his own states and dealings." },
      { title: "Give the image", body: "He is like one astonished, plunged into the sea of the very eye of witnessing — whose state resembles the state of the women who cut their hands at the sight of Joseph's beauty, until they were astonished and their sensation fell away." },
      { title: "Give the further step", body: "He has passed away also from the witnessing — since if the heart turns toward the witnessing, and toward itself as witnessing, it has become heedless of the Witnessed." },
      { title: "Give the argument", body: "For one enraptured by what is seen has no attention, in his absorption, to his seeing, nor to his eye by which he sees, nor to his heart by which he takes pleasure. The drunk has no report of his drunkenness, and the one taking pleasure has no report of his pleasure — his report is only of what is taken pleasure in." },
    ],
    closer: [
      { title: "The qualification he attaches", body: "But in most cases this is like a snatching lightning that does not hold and does not last — and if it lasted, human strength would not bear it, so that a person might be agitated under its burdens with an agitation that destroys him. The state is described and then immediately bounded." },
      { title: "What the argument rules out", body: "Any report of the state from inside it. If attending to the pleasure is already a departure from it, then a person describing his own absorption was not absorbed — which makes the fourth state something nobody can claim while in it, and the sharpest available guard against pretending to it." },
    ],
    distinction: ["Two things a person can attend to", "The Witnessed", "Which is the state, and admits no attention to anything else.", "His own witnessing", "Which is a departure from it, however elevated it feels."],
    misreading: "Do not treat this as a rank to aim for. Ghazali says it is mostly a snatching lightning that does not last, and that lasting it would exceed what human strength bears.",
    reflection: "Notice that the argument makes describing this state evidence of not being in it.",
    audit: ["Have I attended to my own state?", "Could this be claimed from inside?", "What does the drunk know?", "Is this something to aim at?"],
    nodes: ["fana", "ahwal", "wajd"],
    model: chain("Why it cannot be claimed", "Each step removes an observer.", [["Passed from himself", "His own states and dealings departed.", "support"], ["Passed from the witnessing", "Since attending to it is heedlessness of the Witnessed.", "support"], ["No report of it", "As the drunk has no report of his drunkenness.", "balance"]]),
  }),
  makeChapter({
    id: 9, shortTitle: "By the Real, or by the self", formalTitle: "The second station: ecstasy",
    overview: "The middle link of the chain, and the definition Ghazali quotes for it contains the sharpest sentence in the book.",
    moves: [
      { title: "Note the difficulty", body: "People have long discussion about the reality of ecstasy — the Sufis, and those who examine the way audition suits the spirits. So he transmits their words and then discloses the reality." },
      { title: "Give Dhu al-Nun's definition", body: "Dhu al-Nun al-Misri said of audition that it is a true incoming that comes to unsettle hearts toward the Real." },
      { title: "Give the sentence", body: "So whoever inclines to it by the Real is verified — and whoever inclines to it by the self becomes a heretic." },
      { title: "Note what it does", body: "One incoming, two hearers, opposite outcomes — determined entirely by what each brought to it. It is the four states compressed into a single line, and from an authority rather than from Ghazali." },
    ],
    closer: [
      { title: "How Ghazali reads it", body: "As expressing ecstasy by the unsettling of hearts toward the Real — which is what a person finds when the incoming of audition arrives, since audition was called a true incoming. The reading takes the definition apart into the arriving and what it produces." },
      { title: "Why the sentence is the book's centre", body: "It states, from a source both sides respect, that the same audition can verify and can corrupt, and that the difference is in the listener. Everything in the second chapter's four states is an unpacking of that, and the first chapter's whole dispute is an argument about whether a ruling can be made without it." },
    ],
    distinction: ["Two hearers of one incoming", "By the Real", "Verified — and the same words produced it.", "By the self", "Corrupted, from the same incoming, by what he brought to it."],
    misreading: "Do not read the sentence as making the practice safe. Half of it is a description of ruin, and the point is precisely that the outcome is not determined by the occasion.",
    reflection: "Ask what you bring to something before it has begun.",
    audit: ["What do I bring to it?", "Could the same thing ruin someone?", "Is the outcome in the occasion?", "Which half of the sentence is mine?"],
    nodes: ["wajd", "sama", "khilaf"],
    model: pair("One incoming, two outcomes", "The difference is entirely in the hearer.", [["By the Real", "Verified.", "support"], ["By the self", "Corrupted, from exactly the same thing.", "warning"]]),
  }),
  makeChapter({
    id: 10, shortTitle: "What the limbs do", formalTitle: "The third station: movement",
    overview: "The last link, and the one that produces most of the objection — treated last and separately, which is the point of the chain.",
    moves: [
      { title: "Name the subject", body: "The effects of audition in the limbs — by dancing, by crying out, and by the tearing of garments, as the book's own second chapter title puts it." },
      { title: "Recall the division", body: "Movement is either unmeasured, which is called agitation, or measured, which is called clapping and dancing — the distinction drawn at the head of the first chapter." },
      { title: "Note the position of the link", body: "It is third: produced by ecstasy, which is produced by understanding, which depends on the state of the listener. Nothing at this link can be assessed without the two before it." },
      { title: "Note where objection concentrates", body: "This is the visible link, and the one an observer can see. Most of what is objected to in the practice happens here — which is exactly why Ghazali separates it from the hearing at the outset." },
    ],
    closer: [
      { title: "Why the visible link is the least decisive", body: "The chain runs one way: the state of the listener determines the understanding, which determines the ecstasy, which determines the movement. What is visible is the furthest downstream, and therefore the least informative about what is actually happening in a person." },
      { title: "What this edition does with the material", body: "Ghazali treats the manners of gatherings, the conditions under which movement is permitted or blameworthy, and the question of feigned ecstasy at length, and his conclusions are positions within a live dispute. This section presents the link's place in the chain, and the editorial note states what is not carried and why." },
    ],
    distinction: ["Two things an observer can assess", "The movement", "Visible, furthest downstream, and least informative about the listener.", "The state", "Which determines everything upstream of it, and which no observer can see."],
    misreading: "Do not take the visibility of this link as making it the substance of the question. On Ghazali's own chain it is the last effect of three, and the first is invisible.",
    reflection: "Ask how much of your view of this practice is a view about what it looks like.",
    audit: ["Is my view about the visible link?", "What can an observer assess?", "Which link determines which?", "What is furthest downstream?"],
    nodes: ["haraka", "wajd", "sama"],
    model: chain("Downstream", "The visible link is the last of three.", [["The listener's state", "Invisible, and determines everything.", "support"], ["Understanding", "What the hearing is applied to.", "support"], ["Ecstasy", "The state in the heart.", "balance"], ["Movement", "Visible, and least informative.", "warning"]]),
  }),
  makeChapter({
    id: 11, shortTitle: "What is settled", formalTitle: "What the book does and does not decide",
    overview: "The book closes, and what a reader is left with is a method for sorting a case rather than a verdict on a practice.",
    moves: [
      { title: "Say what is established", body: "That the question was disputed among the founders of the schools; that audition, ecstasy, and movement are three links with three questions; and that the first link's ruling depends on the state of the listener." },
      { title: "Say what follows from that", body: "That no assessment of the sound, the gathering, or the movement settles the case by itself — which is Ghazali's position and the reason his argument takes the shape it does." },
      { title: "Say what it costs", body: "That the assessment is unavailable to anyone but the listener. Two people at the same gathering may be in the first state and the second, and nothing observable distinguishes them." },
      { title: "Name what is not settled", body: "The dispute itself. Ghazali argues a position within it and answers the other side; he does not claim to have ended a disagreement he opened the book by transmitting from named authorities." },
    ],
    closer: [
      { title: "Why the four states are the durable part", body: "The legal argument belongs to a particular school and a particular set of texts. The four states are a description of what different people are doing when they hear the same thing, and that description can be used by someone who does not accept the ruling at all." },
      { title: "Where the quarter goes next", body: "Enjoining right and forbidding wrong follows, and the juxtaposition is pointed: a book whose whole argument is that the decisive fact is invisible to observers is placed immediately before a book about intervening in what other people do." },
    ],
    distinction: ["Two things this book can leave a reader", "A method", "Three links and four states, usable by someone who rejects the ruling.", "A verdict", "Which the opening chapter's transmission of the other side makes unavailable."],
    misreading: "Do not take Ghazali's position as the settled view of the tradition. He opens by transmitting the contrary view from al-Shafi'i, Malik, Abu Hanifa, and Sufyan, and that disagreement outlived him.",
    reflection: "Notice which is more useful to you: the ruling, or the account of four listeners.",
    audit: ["Which did I come for?", "Which can I actually use?", "Whose position is this?", "What did the book not settle?"],
    nodes: ["khilaf", "ahwal", "structure"],
    model: pair("Two takeaways", "One of them survives disagreeing with him.", [["The four states", "A description of what different hearers are doing.", "support"], ["The ruling", "A position within a dispute he transmits from both sides.", "balance"]]),
  }),
];

export const book18ConceptNodes: ConceptNode[] = [
  ["sama", "Audition", "The first link", "What is heard, treated separately from what it produces."],
  ["khilaf", "The disagreement", "Among the founders", "Transmitted from named authorities before any argument is offered."],
  ["structure", "Two chapters", "Ruling, then effects", "The opposing case given the opening, and the states given the second."],
  ["fiqh", "The legal question", "With consequences", "Al-Shafi'i attaches the rejection of testimony, not merely dislike."],
  ["wajd", "Ecstasy", "The middle link", "A state in the heart, which the hearing fruits and which fruits movement."],
  ["haraka", "Movement", "The visible link", "Furthest downstream, and least informative about the listener."],
  ["fahm", "Understanding", "The first station", "What the hearing is applied to, which differs by the hearer."],
  ["ahwal", "Four states", "Of the listener", "The same sound in all four; what changes is the application."],
  ["tab", "Mere nature", "Permitted, and lowest", "Requiring nothing but life, which the beasts have."],
  ["shahwa", "Appetite", "The refused state", "Applied to a created form, and too base to be discussed."],
  ["murid", "The aspirant", "The third state", "Applying what is heard to his own alternation before God."],
  ["fana", "Passing away", "Cannot be claimed", "Attending to the state is already a departure from it."],
].map(([id, label, kicker, description], index) => ({ id, label, kicker, description, position: ["left", "right", "top", "bottom"][index % 4] }));

const node = (id: string, label: string, micro: string, summary: string, guardrail: string, chapterId: number, glyph: Journey["nodes"][number]["glyph"]): Journey["nodes"][number] => ({ id, label, micro, summary, guardrail, chapterId, glyph });

export const book18Journeys: Journey[] = [
  {
    id: "a-real-dispute", number: "01", question: "Is this actually settled?", title: "Meet the other side first",
    description: "Watch a contested question opened by transmitting the case against, and take the three-link chain that lets the argument be conducted at all.",
    payoff: "You learn which link your own view is about, and whose names are on the other side.",
    image: assetUrl("assets/system/book18-three-links.jpg"), imageAlt: "Three plain iron rings laid in a row on cloth, touching but not joined.", minutes: 11, color: "#278d91",
    nodes: [
      node("other-side-first", "Note the order", "Opposition first", "The schools transmitted, then the evidence, then the answer.", "A reader meets the case against before the position.", 1, "order"),
      node("the-names", "Read the names", "Not minor ones", "Al-Shafi'i, Malik, Abu Hanifa, Sufyan, and a group of the scholars.", "Given in their own words, with the consequences attached.", 2, "witness"),
      node("a-consequence", "Note the stakes", "Testimony rejected", "The prohibiting view carries a legal consequence, not a preference.", "Which makes the dispute substantive.", 2, "clear"),
      node("three-links", "Take the chain", "Audition, ecstasy, movement", "Three separate acts with three separate questions.", "Which is what lets one link be permitted and another not.", 3, "pattern"),
      node("which-link", "Locate your view", "Which link is it about?", "Most objections to the practice are about the third.", "Running them together is what makes the argument unresolvable.", 3, "diagnose"),
    ],
  },
  {
    id: "four-listeners", number: "02", question: "What is the listener actually doing?", title: "Take the four states",
    description: "Follow the four states of the listener from the one a camel shares to the one that cannot be claimed, and end on the sentence that compresses all four into a line.",
    payoff: "You get an account of why the same sound is four different acts, and a guard against pretending to the highest of them.",
    image: assetUrl("assets/system/book18-one-sound.jpg"), imageAlt: "A single struck bell in an empty room, with four doorways opening off it at equal distances.", minutes: 13, color: "#bf7a35",
    nodes: [
      node("in-the-listener", "Note where the ruling sits", "Not in the sound", "The same words and melody run through all four states.", "Which makes it unavailable to an outside observer.", 4, "know"),
      node("the-camel", "Take the first", "Permitted, and lowest", "Requiring nothing but life, which the beasts have.", "Two independent judgements, both stated.", 5, "balance"),
      node("the-refused", "Take the second", "Too base to discuss", "Understood, applied to a created form, and worse than the first.", "Understanding is not itself an improvement.", 6, "clear"),
      node("the-aspirant", "Take the third", "His own alternation", "Enablement at one time and hindrance at another.", "The state the practical chapter is written for.", 7, "steady"),
      node("no-report", "Take the fourth", "The drunk has no report", "Attending to the state is already a departure from it.", "Which makes it unclaimable from inside.", 8, "witness"),
      node("dhu-l-nun", "Take the sentence", "By the Real, or by the self", "One incoming; verified in one hearer and ruinous in another.", "Half of it is a description of ruin.", 9, "diagnose"),
    ],
  },
];

export const book18Movements: TaxonomyGroup[] = [
  ["bab1", "1. The disagreement over audition", "The schools transmitted, and the three-link chain the argument runs on.", [1, 2, 3]],
  ["bab2a", "2a. The states of the listener", "Four states, from what a camel shares to what cannot be claimed.", [4, 5, 6, 7, 8]],
  ["bab2b", "2b. Ecstasy and its effects", "The middle and last links, and what the book leaves unsettled.", [9, 10, 11]],
].map(([id, label, description, chapterIds], index) => ({ id, label, description, chapterIds, color: ["#bf7a35", "#278d91", "#c25f50"][index % 3] })) as TaxonomyGroup[];

export const book18Instrument: Instrument = {
  title: "Four listeners, one sound",
  note: "Ghazali separates audition, ecstasy, and movement into three links, and says the first differs entirely by the state of the listener — four states, with the same words and melody running through all of them. This applies his description to your own listening. It is not a ruling: the legal question is disputed among the founders of the schools, and this book transmits both sides.",
  items: [
    {
      id: "listening", label: "Something you actually listen to", lede: "Anything — and answer for how you hear it, not for what it is",
      note: "The first question is his four states, which are distinguished by what the hearing is applied to rather than by what is heard. The second is his chain of three stations. One combination he refuses to discuss at all; another he describes as unclaimable from inside.",
      axes: [
        {
          id: "state", kicker: "The four states", question: "What are you applying it to?",
          options: [
            { id: "nature", label: "Nothing — I just enjoy the sound", note: "His first state: listening by mere nature, which he calls permitted and the meanest rank." },
            { id: "shahwa", label: "A person, or something I want", note: "His second: applied to a created form, according to appetite." },
            { id: "murid", label: "My own standing with God, as it shifts", note: "His third: the alternation of enablement and hindrance, which he calls the aspirants'." },
            { id: "fana", label: "Nothing of myself is left in it", note: "His fourth, which he describes as a snatching lightning that mostly does not last." },
          ],
        },
        {
          id: "reaches", kicker: "The three stations", question: "How far does it get?",
          options: [
            { id: "fahm", label: "I understand it, and that is all", note: "The first station only: understanding and application, with nothing following." },
            { id: "wajd", label: "It produces something in me", note: "The second station: a state in the heart, which the understanding fruits." },
            { id: "body", label: "It shows — I move, or cannot sit still", note: "The third: the visible link, and the one most objection concentrates on." },
            { id: "nothing", label: "Honestly, nothing happens", note: "Which the chain makes diagnosable rather than disappointing." },
          ],
        },
      ],
      verdicts: [
        { key: "shahwa|*", name: "The state he refuses to treat", role: "warning", chapterId: 6, body: "This is the one of his four that Ghazali condemns, and he does it by declining to discuss it: this state is too base for us to speak about, except by declaring its baseness and forbidding it. A book that analyses every other case at length gives this one nothing.", action: "Note exactly where the fault sits, because it is not where readers usually put it. The same sound in the third state's hearing is unobjectionable — what is condemned is the application, to a created form and according to appetite. And note the ordering: this state *understands* what it hears and ranks below the state that does not, which means understanding is not itself an improvement." },
        { key: "*|nothing", name: "Then the chain has not started", role: "balance", chapterId: 4, body: "His three stations run in order: understanding fruits ecstasy, and ecstasy fruits movement in the limbs. If nothing happens, the question is at the first station — what the hearing is being applied to — since nothing downstream can occur without it.", action: "That is a more useful answer than it sounds, because it means the absence is not a deficiency of feeling but of application. Dhu al-Nun's line is the test: audition is a true incoming that comes to unsettle hearts toward the Real — and what a person brings to it determines what it does. Ask what you bring before it starts." },
        { key: "fana|*", name: "The state that cannot be claimed", role: "balance", chapterId: 8, body: "His argument here forecloses the answer you have given. If the heart turns toward the witnessing, and toward itself as witnessing, it has become heedless of the Witnessed — for the drunk has no report of his drunkenness, and the one taking pleasure has no report of his pleasure. A person able to describe his own absorption was not absorbed.", action: "And he bounds the state immediately: in most cases it is like a snatching lightning that does not hold, and if it lasted, human strength would not bear it. It is described in the book as something that happens to a few and passes, not as a rank to aim at — which makes reaching for it the one thing his account rules out." },
        { key: "nature|*", name: "Permitted, and the meanest rank", role: "balance", chapterId: 5, body: "Ghazali gives two judgements on this state in consecutive sentences and lets neither crowd out the other: this is permitted — and it is the meanest of the ranks of audition, since the camel shares it with him, and so do the rest of the beasts.", action: "His reason is a ranking by capacity: this taste requires nothing but life, for every animal has a kind of pleasure in good sounds. So the useful question is not whether it is allowed but what else is available. The third state is the same sound applied to your own alternation before God, and it is the state the second chapter is actually written for." },
        { key: "murid|body", name: "The link everyone can see", role: "balance", chapterId: 10, body: "You are in the state his practical chapter is written for, and it has reached the third station. His chain runs one way — the listener's state determines the understanding, which determines the ecstasy, which determines the movement — so what is visible is the furthest downstream and the least informative about what is happening in you.", action: "Which cuts both ways. It means an observer cannot read your state from the movement; it also means you cannot. The book treats the manners of such gatherings and the question of feigned ecstasy at length, and those are contested positions this edition does not carry — but the structural point stands on its own: the visible link is an effect, and effects can be produced by other causes." },
        { key: "murid|*", name: "The audition of the aspirants", role: "support", chapterId: 7, body: "His third state, and the one he says belongs to the aspirants and especially the beginners: applying what is heard to the states of one's own soul in its dealing with God, and to the turning of those states between enablement at one time and hindrance at another.", action: "The reason it works is worth having: the aspirant inevitably has an object that is his aim, and his aim is the knowledge of God — so what he hears finds something in him already directed and attaches to it. That also explains why the same words land differently on different days: what is being applied is an alternation, not a settled condition." },
        { key: "*|*", name: "Read the state with the station", role: "balance", chapterId: 4, body: "What you apply it to, and how far it gets. His whole account puts the decisive fact in the listener rather than in the sound — the same words and melody run through all four states — which is why no examination of what is played settles the question on his view.", action: "Take the state first, since it determines everything downstream. And hold the book's own frame: the legal question was disputed among the founders of the schools, Ghazali transmits their words before arguing his own position, and the four states are usable as a description by someone who does not accept his ruling at all." },
      ],
    },
  ],
};

export const book18Sources: SourceLink[] = [
  { label: "Primary Arabic text", note: "The complete public Arabic of Book 18 was read and used to establish the two chapters, the three-link chain, the transmission of the prohibiting positions, and the four states of the listener.", url: "https://shamela.ws/book/9472/628" },
  { label: "The disagreement", note: "The opening of the first chapter, transmitting the statements of the schools on audition, including al-Shafi'i's words and the restrictions reported from his companions.", url: "https://shamela.ws/book/9472/628" },
  { label: "The evidence and the answers", note: "The remainder of the first chapter, giving the argument for permissibility and answering what the prohibiting side relied upon.", url: "https://shamela.ws/book/9472/637" },
  { label: "The states of the listener", note: "The opening of the second chapter, giving the three stations and the four states in which the first of them differs.", url: "https://shamela.ws/book/9472/647" },
  { label: "The fourth state and ecstasy", note: "The passage describing the state of one who has passed beyond the stations, and the treatment of ecstasy with Dhu al-Nun's definition.", url: "https://shamela.ws/book/9472/648" },
  { label: "Forty-book structure", note: "Ghazali.org's listing places Book 18 as the eighth book of the Quarter of Customs and confirms its title.", url: "https://www.ghazali.org/listing-the-forty-books/" },
];

export const book18: SystemBook = {
  id: 18,
  title: "Listening and Ecstasy",
  shortTitle: "Listening",
  defaultJourneyId: "a-real-dispute",
  chapters: book18Chapters,
  conceptNodes: book18ConceptNodes,
  journeys: book18Journeys,
  sources: book18Sources,
  taxonomy: {
    title: "Two chapters, three links",
    note: "Ghazali's own two. The first transmits the disagreement and argues a position within it; the second treats what listening does, through three stations of which the first has four states. The movements list splits the second chapter as he does.",
    groups: book18Movements,
  },
  instrument: book18Instrument,
  editorialNote: "The two journeys, eleven reading sections, visual models, and diagnostic are editorial learning aids. The sections follow Ghazali's own order. The English is an original synthesis made from a reading of the public Arabic text, not a translation and not a substitute for one. Reports and inherited anecdotes are presented as material Ghazali transmitted; this prototype does not independently grade every narration. This book needs a clear note on what it is. The permissibility of audition is a genuinely contested question in Islamic law, and it remains contested; Ghazali opens the book by transmitting the prohibiting position from al-Shafi'i, Malik, Abu Hanifa, Sufyan, and others, in their own words and with the legal consequences they attached, and then argues a position of his own against it. That position is his, within a live disagreement, and this edition presents the structure of the dispute and his reasoning without presenting either side as settled. Nothing here is a ruling, and readers seeking one should go to qualified guidance in their own school rather than to a reading edition. The first chapter's detailed legal argument — the evidences marshalled, the answers to the contrary reports, and the conditions and exceptions attached — is presented in outline rather than reproduced, as are the second chapter's treatments of the manners of gatherings, the circumstances under which movement is blameworthy, and the question of feigned ecstasy; those are contested applications and this edition carries none of them. What it does carry is the part of the book that survives disagreement about the ruling: the separation of audition, ecstasy, and movement into three links, and the four states of the listener, which describe what different people are doing when they hear the same thing. The diagnostic applies that description to a reader's own listening and cannot pronounce on whether anything is permitted.",
};
