import { assetUrl } from "./assetUrl";
import type { Chapter, ConceptNode, VisualModel } from "./data";
import type { Instrument, Journey, SourceLink, SystemBook, TaxonomyGroup } from "./systemTypes";

type Seed = { id: number; shortTitle: string; formalTitle: string; overview: string; moves: Array<{ title: string; body: string }>; closer: Array<{ title: string; body: string }>; distinction: [string, string, string, string, string]; misreading: string; reflection: string; audit: string[]; nodes: string[]; model: VisualModel };
const bab = (id: number) => (id <= 3 ? "the first chapter, on the lawful and its degrees" : id <= 7 ? "the second chapter, on the ranks of the doubtful" : id <= 11 ? "the third chapter, on investigating and asking" : "the fourth to seventh chapters");
const makeChapter = (seed: Seed): Chapter => ({
  id: seed.id, shortTitle: seed.shortTitle, formalTitle: seed.formalTitle, overview: seed.overview,
  points: seed.moves.slice(0, 3).map((m) => m.body), reflection: seed.reflection, relatedNodes: seed.nodes, visualModel: seed.model,
  deep: { thesis: seed.moves[0].body, context: seed.overview, moves: seed.moves, closeReading: seed.closer,
    distinction: { title: seed.distinction[0], firstLabel: seed.distinction[1], first: seed.distinction[2], secondLabel: seed.distinction[3], second: seed.distinction[4] },
    misreading: seed.misreading, observation: seed.reflection, selfAudit: seed.audit,
    sourceAnchor: `Book 14, ${bab(seed.id)}, ${seed.formalTitle}.` },
});
const chain = (title: string, caption: string, items: Array<[string, string, "support" | "balance" | "warning"]>): VisualModel => ({ kind: "chain", title, caption, items: items.map(([label, body, role]) => ({ label, body, role })) });
const pair = (title: string, caption: string, items: Array<[string, string, "support" | "balance" | "warning"]>): VisualModel => ({ kind: "pair", title, caption, items: items.map(([label, body, role]) => ({ label, body, role })) });
const spectrum = (title: string, caption: string, items: Array<[string, string, "support" | "balance" | "warning"]>): VisualModel => ({ kind: "spectrum", title, caption, items: items.map(([label, body, role]) => ({ label, body, role })) });

export const book14Chapters: Chapter[] = [
  makeChapter({
    id: 1, shortTitle: "Seven chapters", formalTitle: "The shape of the book",
    overview: "The book Book 13 was pointing at, and its seven chapters run from a definition through a practical procedure to some very specific difficulties.",
    moves: [
      { title: "Announce the seven", body: "The excellence of seeking the lawful and the blame of the unlawful, with the degrees of each; the ranks of the doubtful and their sources; investigation, asking, plunging in, and neglecting, and where each belongs; how a repentant man gets out from under financial wrongs; the stipends and gifts of rulers; entering upon rulers and mixing with them; and scattered questions." },
      { title: "Note the middle", body: "The second and third chapters are the heart of it. One defines the doubtful and ranks it; the other says what a person is actually supposed to do when he meets it." },
      { title: "Note what the third chapter is really about", body: "Not how to investigate but when not to. Its governing claim is that asking is itself a harm, which has to be weighed against the harm of eating what is doubtful." },
      { title: "Note the last four", body: "They are specific and difficult: restitution, government money, and proximity to power. They are the practical residue of a doctrine of scruple meeting a real society." },
    ],
    closer: [
      { title: "Why this book follows earning", body: "Book 13 ended by telling a trader not to look to the legal opinions but to seek the verdict of his own heart, and to guard against the places of doubt. This book is the working out of exactly that instruction, including its limits." },
      { title: "The two directions it has to guard", body: "A book on scruple can fail in two ways: by licensing carelessness and by producing obsession. Ghazali marks both boundaries explicitly — the second chapter names where scruple becomes illness, and the third names where investigation becomes a wrong against someone." },
    ],
    distinction: ["Two failures a book on scruple can produce", "Carelessness", "Taking whatever is not certainly forbidden, which the third chapter forbids by name.", "Obsession", "Scruple past the point the sources support, which the second chapter marks and names."],
    misreading: "Do not read a book about the doubtful as a book about being strict. Its longest practical chapter is largely about when asking is forbidden.",
    reflection: "Notice which of the two failures you would be more likely to produce in yourself.",
    audit: ["Which failure is mine?", "What did Book 13 send me here for?", "Which chapter answers my question?", "Is asking always good?"],
    nodes: ["halal", "shubha", "structure"],
    model: chain("Where the book goes", "Definition, then procedure, then the hard residue.", [["The degrees", "Of the lawful and the unlawful, and of scruple.", "support"], ["The doubtful", "Ranked, with the boundary where scruple becomes illness.", "support"], ["What to do", "Investigate, ask, take, or leave — and when each.", "support"], ["The residue", "Restitution, government money, and proximity to power.", "balance"]]),
  }),
  makeChapter({
    id: 2, shortTitle: "Degrees of foulness", formalTitle: "That the unlawful is not one thing",
    overview: "The first chapter grades what is forbidden, and the grading turns on something other than the act.",
    moves: [
      { title: "Give the first distinction", body: "What is taken by a defective contract is unlawful, but it is not at the degree of what is seized by force — the seized is graver, since in it there is both the abandoning of the Law's route in acquiring and the harming of another." },
      { title: "Name what the lighter case lacks", body: "In the defective contract there is no harming; there is only the abandoning of the route of compliance. The severity tracks whether anyone was hurt." },
      { title: "Grade by the one harmed", body: "What is taken wrongfully from a poor man, or a righteous man, or an orphan, is fouler and greater than what is taken from a strong or rich or corrupt one — because the degrees of harm differ with the degrees of the one harmed." },
      { title: "Give the evidence", body: "Were the degrees of the disobedient not different, the degrees of the Fire would not be different. The grading of the punishment is offered as proof that the grading of the wrong is real." },
    ],
    closer: [
      { title: "Why the victim decides the grade", body: "The same act — taking what is not yours — is placed at different depths according to who loses by it. That makes the seriousness of a wrong a fact about its effect rather than about its category, which is the same move the previous book made when it defined wrongdoing as harm." },
      { title: "Where the fine gradations lead", body: "He refers the full treatment of the difference between a grave sin and a light one to the Book of Repentance, and treats the material here only as far as a person needs it to know what he is handling." },
    ],
    distinction: ["Two things that make a wrong grave", "Whom it harmed", "A poor man, a righteous man, or an orphan — which raises the degree.", "What category it fell in", "Which alone would make every instance of a wrong equivalent."],
    misreading: "Do not read the grading as making light wrongs acceptable. It establishes that they differ, in a chapter whose purpose is to make a reader able to tell what he is dealing with.",
    reflection: "Ask whether you have ever weighed a wrong by its category rather than by who bore it.",
    audit: ["Who bore this?", "Have I graded by category?", "Was anyone harmed at all?", "Where is the full treatment?"],
    nodes: ["haram", "darajat", "zulm"],
    model: spectrum("What raises the degree", "The severity tracks the harm, not the label.", [["No harm to anyone", "A defective contract: the route abandoned, nobody hurt.", "balance"], ["Harm to the strong", "Taken from one able to bear it.", "warning"], ["Harm to the weak", "From a poor man, a righteous man, or an orphan — fouler and greater.", "warning"]]),
  }),
  makeChapter({
    id: 3, shortTitle: "No fixed number", formalTitle: "Why he refuses to count the degrees",
    overview: "A short methodological remark, and it is unusual enough to be worth its own section.",
    moves: [
      { title: "Give the refusal", body: "Once you know the sources of the intensifying, there is no need to confine it to three degrees or four." },
      { title: "Give the reason", body: "For that would run as arbitrariness and caprice, and it is seeking an enumeration of what has no enumerator." },
      { title: "Note what is offered instead", body: "The sources of the intensifying — harm, the state of the one harmed, the route abandoned. Give a reader the variables and he can grade a case the author never met." },
      { title: "Note how unusual this is", body: "The Ihya is full of numbered lists: six meanings, eight duties, ten manners, four ranks. Here Ghazali stops to say that a number would be false, which shows that the numbering elsewhere is a claim rather than a habit." },
    ],
    closer: [
      { title: "What it tells you about the lists", body: "If he will refuse a number when the material does not support one, then the numbers he does give are load-bearing. The six inward meanings of prayer and the eight duties of alms are not conveniences; they are assertions that the material divides that way." },
      { title: "The alternative he supplies", body: "Not a scale but a set of causes. The degrees of harm differ with the degrees of the one harmed, and the abandoning of the route differs by what was abandoned — two variables that generate a grade for any case rather than a list that covers some." },
    ],
    distinction: ["Two ways to present a gradation", "By its causes", "The variables that raise or lower a case, which generalise to cases not listed.", "By a fixed count", "Three degrees or four, which he calls arbitrary where the material does not support it."],
    misreading: "Do not conclude that gradations are unreal. He says the sources of intensification are knowable and gives them; what he denies is that they resolve into a fixed number of steps.",
    reflection: "Notice how much easier a numbered list is to remember, and what that convenience costs.",
    audit: ["Do I want a number or the causes?", "What would generalise?", "Are the other lists load-bearing?", "What has no enumerator?"],
    nodes: ["darajat", "manhaj", "haram"],
    model: pair("Two ways to grade", "One of them he refuses here.", [["By causes", "Variables that generate a grade for any case.", "support"], ["By a count", "Three or four, which is arbitrary where nothing fixes it.", "warning"]]),
  }),
  makeChapter({
    id: 4, shortTitle: "Three divisions", formalTitle: "The report the second chapter rests on",
    overview: "The second chapter opens on the report that establishes the doubtful as a category at all, and then says which part of it is the problem.",
    moves: [
      { title: "Give the report", body: "The lawful is clear and the unlawful is clear, and between them are doubtful matters which many people do not know. Whoever guards against the doubtful has protected his honour and his religion, and whoever falls into the doubtful falls into the unlawful — like a shepherd grazing around a preserve, who is likely to fall into it." },
      { title: "State what it establishes", body: "This report is explicit in establishing the three divisions. The middle category is not a gap between two others; it is named and given a status of its own." },
      { title: "Name the difficulty", body: "The difficult one of them is the middle division, which many people do not know — and it is the doubtful. So it must be explained, and its covering lifted." },
      { title: "Give the hope in the clause", body: "Since what many do not know, a few may know. The whole chapter is licensed by that clause: the report says many are ignorant of it, not that it is unknowable." },
    ],
    closer: [
      { title: "The shepherd", body: "The image is not that the doubtful is forbidden but that it is adjacent. A shepherd grazing at the boundary has not trespassed and is likely to; the warning is about position rather than about an act already committed." },
      { title: "Why the category needs defining at all", body: "Without it, everything not certainly forbidden is permitted, and everything not certainly permitted is forbidden. Both collapses are available to a reader, and the chapter exists to prevent them by giving the middle term real content." },
    ],
    distinction: ["Two ways to read the middle category", "As adjacency", "Near the boundary, where falling in becomes likely — which the shepherd describes.", "As a third verdict", "A ruling of its own, which would make guarding against it a legal obligation rather than a protection."],
    misreading: "Do not read the report as making the doubtful forbidden. What it promises the one who guards against it is the protection of his honour and his religion, which is a different thing from obedience to a prohibition.",
    reflection: "Notice that the report says many people do not know this category, and that Ghazali takes that as a task rather than an excuse.",
    audit: ["Do I have a middle category?", "Or does everything collapse to one side?", "Am I near a boundary?", "What is promised to one who guards?"],
    nodes: ["shubha", "hima", "halal"],
    model: chain("The three divisions", "The middle is the chapter's whole subject.", [["Clear lawful", "Free in itself and in its causes.", "support"], ["The doubtful", "Which many do not know, and a few may.", "balance"], ["Clear unlawful", "The other boundary.", "warning"]]),
  }),
  makeChapter({
    id: 5, shortTitle: "Rain, before it lands", formalTitle: "The absolutely lawful",
    overview: "A definition and a single example, and the example is chosen to be almost unattainable — which is the point of it.",
    moves: [
      { title: "Give the definition", body: "The absolutely lawful is what is free, in itself, of the attributes requiring prohibition — and whose causes are free of anything to which a prohibition or a dislike attaches." },
      { title: "Note the two conditions", body: "The thing, and its history. Both have to be clear, which means the definition reaches backward through every hand the thing has passed through." },
      { title: "Give the example", body: "Water that a person takes from the rain before it has fallen on anyone's property — standing at its gathering and taking it from the air, on his own property or on unowned ground." },
      { title: "Note what the example shows", body: "It is the only case with no history at all. Every clause in it exists to remove a possible claim, and what remains is a limiting case rather than a normal one." },
    ],
    closer: [
      { title: "Why an extreme example clarifies", body: "By constructing the one case with a perfectly clean history, the definition shows how much of ordinary life sits at some distance from it. That distance is what the doubtful is, and it is measured rather than deplored." },
      { title: "What it prevents", body: "It prevents the reader from treating the absolutely lawful as the ordinary case and everything short of it as failure. If rainwater caught in the air is the standard, then living at some remove from it is the normal human condition and not a scandal." },
    ],
    distinction: ["Two things the definition requires", "The thing itself", "Free of the attributes that would forbid it.", "Its whole history", "Every cause free of any prohibition or dislike, which reaches back through every hand."],
    misreading: "Do not treat the example as a recommendation. It is a limiting case constructed to define a term, and the chapter's business is with everything that falls short of it.",
    reflection: "Trace one thing you own back as far as you can, and notice where you lose the thread.",
    audit: ["Where do I lose the history?", "Is my standard the limiting case?", "Is distance from it a scandal?", "What does the definition measure?"],
    nodes: ["halal", "shubha", "structure"],
    model: pair("Two conditions on the absolutely lawful", "The second is what makes it rare.", [["The thing", "Free of what would forbid it in itself.", "support"], ["The history", "Every cause clean, reaching back through every hand.", "balance"]]),
  }),
  makeChapter({
    id: 6, shortTitle: "Degrees of scruple", formalTitle: "How far a person may take it",
    overview: "Scruple is graded like everything else in the chapter, and the lowest degree is the one that carries a legal consequence.",
    moves: [
      { title: "Give the first degree", body: "The first degree is that whose avoidance is a condition of being reckoned upright, and of casting off the mark of corruption. It is the scruple of those whose testimony is accepted." },
      { title: "Note that it is not optional", body: "This degree has a legal consequence attached: a person who does not observe it is not a person whose word stands in court. Everything above it is voluntary." },
      { title: "Note the ascent", body: "Above it are further degrees, avoiding what is not forbidden out of fear of what it may lead to — including, he notes, avoiding adornment because it may call to something else, though adornment is permitted." },
      { title: "Give the report that governs the ascent", body: "A servant does not reach the degree of the godfearing until he leaves what is harmless out of fear of what is harmful." },
    ],
    closer: [
      { title: "Why the first degree is the important one", body: "It is the only one with a public consequence. The higher degrees are between a person and his own conscience; this one determines whether the community can rely on him, which is why the chapter starts there rather than at the top." },
      { title: "The shape of the ascent", body: "Each degree leaves something permitted, for a reason that is one step further from the thing itself. That gives the ascent a direction and also, eventually, a limit — which the next section is entirely about." },
    ],
    distinction: ["Two kinds of scruple", "With a consequence", "The first degree, whose absence disqualifies a person's testimony.", "Voluntary", "Everything above it, which is between a person and his own conscience."],
    misreading: "Do not read the ascent as an unlimited good. The next section marks the point at which further scruple stops being scruple, and Ghazali names it without hedging.",
    reflection: "Ask which degree you are at, and whether the answer would be visible to anyone else.",
    audit: ["Which degree is mine?", "Does it have a consequence?", "What am I leaving, and for what reason?", "Where does the ascent stop?"],
    nodes: ["wara", "darajat", "shubha"],
    model: chain("The ascent", "Each step is one remove further from the thing.", [["The first degree", "Required for uprightness; its absence disqualifies testimony.", "support"], ["Leaving the harmless", "Out of fear of the harmful, which is the godfearing's degree.", "balance"], ["Further still", "Leaving what is permitted because it may call to something else.", "balance"]]),
  }),
  makeChapter({
    id: 7, shortTitle: "Where it becomes illness", formalTitle: "The boundary Ghazali draws",
    overview: "The most useful section in the book for a scrupulous reader, and it names the exact point at which caution stops being a virtue.",
    moves: [
      { title: "Name the rank", body: "The second rank, which crowds upon the degree of obsessive scruple, is that a person be scrupulous about eating the foetus found in the belly of a slaughtered animal, and about the lizard." },
      { title: "Give the reason it is over the line", body: "It is established in the sound collections that the slaughter of the foetus is the slaughter of its mother — with a soundness admitting no doubt in its text nor weakness in its chain. And likewise it is established that the lizard was eaten at the Messenger's table." },
      { title: "Give the third rank", body: "That no disagreement is known in a question at all, but the permission is known by a single-chain report — and a man says: people differed about the single report and some do not accept it, so I am being scrupulous, since transmitters may err and even an upright man may be mistaken." },
      { title: "Give the test", body: "This is a scruple the like of which is not transmitted from the Companions, in what they used to hear from an upright person their souls were at rest with." },
    ],
    closer: [
      { title: "Why the test is historical", body: "It does not ask whether the reasoning is sound — the reasoning about transmitters is not absurd. It asks whether anyone in the first generation, who had every reason to be careful, ever behaved this way. The answer is no, and that is the whole argument." },
      { title: "The remark about Abu Hanifa", body: "Ghazali supposes that the reports had not reached him, and that had they reached him he would have held by them if he were fair — and adds that a disagreement resting on not having heard a sound report does not generate a doubt. Scruple has to rest on a real disagreement, not on the bare fact that someone once held otherwise." },
    ],
    distinction: ["Two grounds for scruple", "A real doubt", "A genuine disagreement, or a specific reason to distrust a particular report.", "The fallibility of transmission", "That an upright man might in principle err — which would make every report doubtful and none actionable."],
    misreading: "Do not read this as dismissing caution. Ghazali spends most of the book building a doctrine of scruple; this section exists to keep it from consuming itself.",
    reflection: "Ask whether your own caution rests on a doubt about this case, or on a doubt about knowing anything.",
    audit: ["Is my doubt about this case?", "Or about the possibility of knowledge?", "Did anyone in the first generation do this?", "Would this rule out everything?"],
    nodes: ["waswas", "wara", "shubha"],
    model: pair("Two doubts", "Only one of them can be acted on.", [["About this case", "A real disagreement or a specific reason to distrust a report.", "support"], ["About knowing at all", "Transmission is fallible in principle, which would forbid everything.", "warning"]]),
  }),
  makeChapter({
    id: 8, shortTitle: "Four rulings", formalTitle: "When to ask, and when not to",
    overview: "The third chapter's governing statement, and it refuses both of the two obvious answers in a single sentence.",
    moves: [
      { title: "Refuse the first answer", body: "Everyone who presents you with food or a gift, or from whom you wish to buy — it is not for you to search into it and ask, and to say: this is something whose lawfulness I have not verified, so I will not take it until I investigate." },
      { title: "Refuse the second", body: "It is also not for you to abandon investigation and take everything you are not certain is forbidden." },
      { title: "Give the four rulings", body: "Rather, asking is obligatory sometimes, forbidden sometimes, recommended sometimes, and disliked sometimes — so it must be worked out in detail." },
      { title: "Give the criterion", body: "The occasion for asking is the places of misgiving; and the source of misgiving is either something connected with the property or something connected with its owner." },
    ],
    closer: [
      { title: "What makes this unusual", body: "Most treatments of scruple grade how careful to be. This one grades an act — asking — and finds it forbidden in some cases, which means a scrupulous person can be committing a wrong precisely by being scrupulous in the wrong way." },
      { title: "The two sources of misgiving", body: "The property, or its owner. Everything in the rest of the chapter is a working out of these two, and the owner is treated first and at greater length — with three states relative to what you know of him: unknown, doubted, or known by some indication." },
    ],
    distinction: ["Two obvious answers, both refused", "Always investigate", "Which the chapter forbids in its first sentence.", "Never investigate", "Which it forbids in its second."],
    misreading: "Do not read the four rulings as a spectrum of enthusiasm. They are four distinct verdicts, one of which is that asking is forbidden, and they are determined by the case rather than by temperament.",
    reflection: "Notice that you probably have a general policy here, and that the chapter's first move is to say a policy is the wrong shape of answer.",
    audit: ["Do I have a policy?", "Is my policy one of the two refused?", "What is the source of my misgiving?", "Property, or owner?"],
    nodes: ["sual", "riba", "shubha"],
    model: spectrum("Four rulings on one act", "Determined by the case, not by disposition.", [["Obligatory", "Where the misgiving has a real source.", "support"], ["Recommended", "Where asking would resolve without harming.", "support"], ["Disliked", "Where the ground is thin.", "balance"], ["Forbidden", "Where asking is itself a harm to someone.", "warning"]]),
  }),
  makeChapter({
    id: 9, shortTitle: "The unknown man", formalTitle: "What you owe someone you know nothing about",
    overview: "The chapter's central case, and Ghazali's answer is more permissive than almost any reader expects.",
    moves: [
      { title: "Define the unknown", body: "The unknown is the one with whom there is no circumstantial sign indicating his corruption and wrongdoing — nor anything indicating his righteousness, like the clothing of particular groups and other such marks." },
      { title: "Give the historical argument", body: "The Companions in their campaigns and journeys stayed in villages and did not refuse them, and entered towns and did not guard against the markets — and the unlawful existed in their time too. And no asking is reported from them except upon a misgiving." },
      { title: "Give the counter-examples that prove the rule", body: "The Messenger asked, on first arriving in Medina, whether what was brought was charity or a gift — because the circumstance indicated it. Abu Bakr asked his servant about his earning when something gave him misgiving. Umar asked about milk when its taste was not what he was used to. These are the causes of misgiving." },
      { title: "Give the ruling", body: "Everyone who finds hospitality with an unknown man is not disobedient by accepting it without investigation." },
    ],
    closer: [
      { title: "The case of visible wealth", body: "Even if he saw in his house adornment and much wealth, it is not for him to say: the lawful is scarce and this is much, so from where could this be gathered lawfully? No — this particular person may have inherited wealth or earned it, and he himself deserves a good opinion." },
      { title: "How the counter-examples work", body: "Each of the three recorded askings has a specific trigger: a circumstance making charity probable, something in a servant's conduct, an unfamiliar taste. They are not evidence that asking is normal; they are evidence that it requires a cause, and the causes are named." },
    ],
    distinction: ["Two ways to treat an unknown person", "A good opinion", "He may have inherited or earned it, and deserves the presumption.", "A general inference", "The lawful is scarce and this is much — which reasons from the age to the man."],
    misreading: "Do not read the permission as indifference to the source of wealth. The same book grades the unlawful minutely; what it refuses is inferring a particular man's guilt from a general observation about the times.",
    reflection: "Notice that the argument against suspicion is that it reasons from a population to a person.",
    audit: ["Am I reasoning from the age to the man?", "What is my actual trigger?", "Did the Companions guard against markets?", "What does he deserve?"],
    nodes: ["majhul", "husn-zann", "sual"],
    model: pair("Two inferences", "One of them is about a person and one is not.", [["From the man", "Something in his conduct or his circumstance, which is a cause.", "support"], ["From the age", "The lawful is scarce, therefore this is suspect — which reaches no particular person.", "warning"]]),
  }),
  makeChapter({
    id: 10, shortTitle: "Asking is a harm", formalTitle: "Why investigation can be forbidden",
    overview: "The claim that makes the chapter's structure work, and it puts a harm on the side of the investigator.",
    moves: [
      { title: "Give the addition", body: "I add to this and say: it is not for him to ask." },
      { title: "Give the scrupulous alternative", body: "Rather, if he is scrupulous, then let nothing enter his belly but what he knows the source of — that is good. So he should be gentle in declining. And if he must eat, he should eat without asking." },
      { title: "Give the reason", body: "Since asking is harm, and a tearing of a covering, and an estranging — and it is forbidden without doubt." },
      { title: "Note what has changed", body: "The doubtful property was one harm on the scales. Now the asking is another, on the other side — and the chapter's four rulings are the result of weighing two harms rather than of measuring one." },
    ],
    closer: [
      { title: "What the scrupulous person is told", body: "Not to stop being scrupulous but to move the scruple: decline gently rather than interrogate. The option preserves everything he was trying to protect and costs the other person nothing, which is why it is offered before the permission to eat." },
      { title: "Asking a third party", body: "It is not permitted to ask someone else where the man knows of it, because the harm in that is greater. And if he asks where the man does not know, there is in it thinking ill, tearing a covering, spying, and a grasping at backbiting. Both routes around the difficulty are closed, and the second is closed with four names." },
    ],
    distinction: ["Two harms on the scales", "Eating the doubtful", "The harm the scrupulous person is guarding against.", "Asking", "A harm to someone else, which the chapter says is forbidden without doubt."],
    misreading: "Do not read this as saying scruple is misplaced. The scrupulous option is preserved and recommended — what is forbidden is discharging it at another person's expense.",
    reflection: "Ask what your last careful question cost the person you asked it of.",
    audit: ["What did my asking cost?", "Could I have declined gently?", "Have I asked behind someone's back?", "How many harms am I weighing?"],
    nodes: ["sual", "sitr", "wara"],
    model: chain("Three routes, two closed", "The open one costs the other person nothing.", [["Ask him", "Harm, a tearing of a covering, and estranging.", "warning"], ["Ask another", "Greater harm if he knows; spying and backbiting if he does not.", "warning"], ["Decline gently", "Preserves the scruple and costs nobody.", "support"]]),
  }),
  makeChapter({
    id: 11, shortTitle: "Perhaps, and perhaps", formalTitle: "The symmetry argument",
    overview: "The chapter's sharpest passage, and it turns a scrupulous person's own reasoning back on him in two sentences.",
    moves: [
      { title: "Give the objection", body: "If you say: perhaps he will not be hurt by the asking —" },
      { title: "Give the reply", body: "I say: perhaps he will be hurt." },
      { title: "Name the move", body: "So you are asking out of caution against a perhaps. And if that satisfies you, then perhaps his wealth is lawful." },
      { title: "Give the weight", body: "The sin to be avoided in harming a Muslim is not less than the sin in eating the doubtful and the unlawful. And most people are estranged by investigation." },
    ],
    closer: [
      { title: "Why the symmetry is decisive", body: "Scruple proceeds by acting on possibilities. Once it is pointed out that the possibility of harming someone has exactly the same logical standing as the possibility that the wealth is unlawful, the scrupulous person cannot prefer one without abandoning the principle that got him there." },
      { title: "The empirical clause", body: "Most people are estranged by investigation. Having established the symmetry in principle, he breaks the tie with an observation about what actually happens — which makes the ordinary case fall on the side of not asking." },
    ],
    distinction: ["Two possibilities of equal standing", "That the wealth is unlawful", "Which is what the scruple acts on.", "That the asking will wound", "Which has exactly the same standing, and which the tie-breaker resolves against."],
    misreading: "Do not read this as a proof that one should never ask. It settles the case where both sides are bare possibilities; where there is a real cause of misgiving, the symmetry is broken and asking becomes warranted.",
    reflection: "Notice how the argument works by taking your own principle seriously rather than by opposing it.",
    audit: ["Am I acting on a bare possibility?", "Does the other one have the same standing?", "What breaks my tie?", "Do I have a real cause?"],
    nodes: ["riba", "sual", "husn-zann"],
    model: pair("Two bare possibilities", "The tie is broken by what actually happens.", [["It may be unlawful", "The possibility scruple acts on.", "balance"], ["He may be wounded", "The same standing, and most people are estranged by investigation.", "balance"]]),
  }),
  makeChapter({
    id: 12, shortTitle: "The hard residue", formalTitle: "The last four chapters",
    overview: "Four chapters of specific difficulty, and their subjects are what a doctrine of scruple runs into when it meets an actual society.",
    moves: [
      { title: "The fourth", body: "How a repentant man gets out from under financial wrongs — what must be returned, to whom, and what is to be done when the person wronged cannot be found." },
      { title: "The fifth", body: "The stipends and gifts of rulers: what of them is lawful and what is forbidden. A question about the source of public money and about who may receive it." },
      { title: "The sixth", body: "Entering upon rulers and mixing with them — not about money at all, but about proximity and what it does to a person." },
      { title: "The seventh", body: "Scattered questions, selected as before by how often the difficulty arises rather than by where they belong in a scheme." },
    ],
    closer: [
      { title: "Why these four and not others", body: "Each is a case where a private doctrine of scruple collides with something a person does not control: a wrong already done, an income whose origin is a state's, or a relationship with power. The abstract chapters could be worked out alone; these could not." },
      { title: "What this edition does with them", body: "They are heavily circumstantial — the fifth and sixth concern a specific political order, and the fourth is a matter of law with real consequences for real claims. This section presents their subjects and why they are here, and reproduces none of their rulings." },
    ],
    distinction: ["Two kinds of chapter in this book", "Worked out alone", "The definitions and the degrees, which a reader can apply anywhere.", "Collisions", "Restitution, state money, and proximity to power, where the doctrine meets what a person does not control."],
    misreading: "Do not take anything in these chapters as guidance about restitution or about public money. They are legal and circumstantial, and the questions they treat have real claimants.",
    reflection: "Notice that the book's last four chapters are all about situations a person cannot solve privately.",
    audit: ["Which of these is my case?", "Can I solve it privately?", "Who has a claim here?", "Where would I take this?"],
    nodes: ["mazalim", "sultan", "structure"],
    model: pair("Two halves of the book", "The second is where the first meets a society.", [["The doctrine", "Degrees, the doubtful, and when to ask.", "support"], ["The collisions", "Restitution, state money, and proximity to power.", "balance"]]),
  }),
];

export const book14ConceptNodes: ConceptNode[] = [
  ["halal", "The lawful", "Two conditions", "Free in itself, and free in its whole history — which makes it rare."],
  ["haram", "The unlawful", "Graded by harm", "The same act at different depths according to who bore it."],
  ["darajat", "Degrees", "Without a fixed count", "Causes given instead of steps, since the material has no enumerator."],
  ["manhaj", "The method", "A refusal to number", "Which shows the numbered lists elsewhere are claims, not habits."],
  ["zulm", "Harm", "What raises a grade", "Taking from a poor man or an orphan is fouler than from one able to bear it."],
  ["shubha", "The doubtful", "A real third category", "Established by the report, and the chapter's whole subject."],
  ["hima", "The preserve", "Adjacency, not trespass", "The shepherd has not entered, and is likely to."],
  ["wara", "Scruple", "Graded, and bounded", "Its first degree carries a public consequence; its top has a limit."],
  ["waswas", "Obsessive scruple", "A named boundary", "Doubting what a sound report permits, on the fallibility of transmission."],
  ["sual", "Asking", "Four rulings", "Obligatory, forbidden, recommended, or disliked — decided by the case."],
  ["riba", "Misgiving", "The trigger", "From the property or from its owner, and required before asking."],
  ["majhul", "The unknown", "No sign either way", "Owed a good opinion, and no investigation."],
  ["husn-zann", "Good opinion", "About a person", "Refused only by reasoning from the age rather than from the man."],
  ["sitr", "The covering", "Torn by asking", "Which is why investigation appears on the other side of the scales."],
  ["mazalim", "Restitution", "A collision", "Where the doctrine meets a wrong already done and a real claimant."],
  ["sultan", "Power", "The last collisions", "State money, and what proximity does to a person."],
  ["structure", "Seven chapters", "Doctrine, then residue", "The abstract can be worked out alone; the last four cannot."],
].map(([id, label, kicker, description], index) => ({ id, label, kicker, description, position: ["left", "right", "top", "bottom"][index % 4] }));

const node = (id: string, label: string, micro: string, summary: string, guardrail: string, chapterId: number, glyph: Journey["nodes"][number]["glyph"]): Journey["nodes"][number] => ({ id, label, micro, summary, guardrail, chapterId, glyph });

export const book14Journeys: Journey[] = [
  {
    id: "what-is-doubtful", number: "01", question: "What counts as doubtful?", title: "Give the middle category content",
    description: "Take the report that establishes three divisions, the definition of the absolutely lawful with its almost unreachable example, and the grading that refuses to be a list.",
    payoff: "You get a real middle term, and a measure of how far ordinary life sits from the clean case.",
    image: assetUrl("assets/system/book14-rain-in-air.jpg"), imageAlt: "A wide shallow bowl held out in falling rain on open ground, with no roof or wall anywhere in the frame.", minutes: 12, color: "#278d91",
    nodes: [
      node("three-divisions", "Take the report", "Clear, clear, and between", "The middle is named, and many people do not know it.", "What many do not know, a few may.", 4, "know"),
      node("the-shepherd", "Take the image", "Grazing at the boundary", "He has not trespassed, and is likely to.", "Adjacency, not a third prohibition.", 4, "pattern"),
      node("two-conditions", "Define the clean case", "The thing and its history", "Free in itself, and free in every cause behind it.", "Which reaches back through every hand.", 5, "order"),
      node("the-rain", "Take the example", "Before it lands", "Caught from the air, on unowned ground.", "A limiting case, not a recommendation.", 5, "witness"),
      node("by-the-victim", "Grade the wrong", "By who bore it", "From a poor man or an orphan, fouler than from one who can bear it.", "Severity tracks the harm, not the label.", 2, "diagnose"),
      node("no-number", "Note the refusal", "No three or four", "A count would be arbitrary where nothing fixes one.", "Which shows the other lists are claims.", 3, "clear"),
    ],
  },
  {
    id: "how-careful", number: "02", question: "How careful should I be?", title: "Find the top of the ladder",
    description: "Take the degrees of scruple from the one with a legal consequence upward, and then the point at which Ghazali says caution has stopped being caution.",
    payoff: "You get a boundary marked from the inside, by someone building the doctrine rather than attacking it.",
    image: assetUrl("assets/system/book14-the-boundary.jpg"), imageAlt: "A low stone wall running across open pasture, with grazed grass on the near side and untouched grass beyond it.", minutes: 11, color: "#bf7a35",
    nodes: [
      node("first-degree", "Take the first degree", "It has a consequence", "Its absence disqualifies a person's testimony.", "Everything above it is between him and his conscience.", 6, "know"),
      node("the-harmless", "Take the ascent", "Leaving the harmless", "Out of fear of the harmful, which is the degree of the godfearing.", "Each step is one remove further from the thing.", 6, "order"),
      node("the-boundary", "Find the boundary", "Sound and still refused", "Being scrupulous about what a sound report establishes.", "Named as crowding on obsessive scruple.", 7, "diagnose"),
      node("the-test", "Take the test", "Did they do this?", "Not whether the reasoning is sound, but whether the Companions ever behaved so.", "They had every reason to be careful.", 7, "witness"),
      node("which-doubt", "Separate two doubts", "This case, or knowing at all", "A doubt about transmission in general forbids everything.", "Only one of the two can be acted on.", 7, "clear"),
    ],
  },
  {
    id: "should-i-ask", number: "03", question: "Should I ask where it came from?", title: "Put a harm on the other side",
    description: "Watch both obvious answers refused in two sentences, meet the unknown man, and take the argument that turns a scrupulous person's own reasoning back on him.",
    payoff: "You leave with four rulings instead of a policy, and one option that costs nobody anything.",
    image: assetUrl("assets/system/book14-the-question.jpg"), imageAlt: "A covered dish set on a table before an empty chair, the cover not yet lifted.", minutes: 13, color: "#c25f50",
    nodes: [
      node("both-refused", "Watch both refused", "Neither policy", "Not always investigate, and not take whatever is not certainly forbidden.", "A policy is the wrong shape of answer.", 8, "clear"),
      node("four-rulings", "Take the four", "One of them forbidden", "Asking is obligatory, forbidden, recommended, or disliked.", "Decided by the case, not by temperament.", 8, "order"),
      node("the-companions", "Take the history", "They did not guard the markets", "And the unlawful existed in their time too.", "No asking reported except upon a misgiving.", 9, "witness"),
      node("visible-wealth", "Refuse the inference", "From the age to the man", "He may have inherited it, and deserves a good opinion.", "The scarcity of the lawful reaches no particular person.", 9, "diagnose"),
      node("asking-is-harm", "Weigh the other harm", "A tearing of a covering", "Asking is harm and estranging, and is forbidden without doubt.", "Two harms on the scales, not one.", 10, "guard"),
      node("perhaps", "Take the symmetry", "Perhaps, and perhaps", "If a bare possibility satisfies you, perhaps his wealth is lawful.", "Broken only by an actual cause of misgiving.", 11, "steady"),
    ],
  },
];

export const book14Movements: TaxonomyGroup[] = [
  ["bab1", "1. The lawful, the unlawful, and the degrees", "Grading by harm, and a refusal to fix the number of degrees.", [1, 2, 3]],
  ["bab2", "2. The ranks of the doubtful", "Three divisions, the clean case, the degrees of scruple, and where scruple becomes illness.", [4, 5, 6, 7]],
  ["bab3", "3. Investigating and asking", "Four rulings, the unknown man, and the harm on the other side of the scales.", [8, 9, 10, 11]],
  ["bab4", "4–7. Restitution, rulers, and the rest", "Where a private doctrine of scruple meets what a person does not control.", [12]],
].map(([id, label, description, chapterIds], index) => ({ id, label, description, chapterIds, color: ["#bf7a35", "#278d91", "#c25f50", "#586fa8"][index % 4] })) as TaxonomyGroup[];

export const book14Instrument: Instrument = {
  title: "Should you ask",
  note: "Ghazali refuses both obvious policies in a single sentence — you may not investigate everything, and you may not take whatever is not certainly forbidden — and rules that asking is obligatory sometimes, forbidden sometimes, recommended sometimes, and disliked sometimes. What decides it is whether there is a real cause of misgiving, and what the asking would cost. Take a real case.",
  items: [
    {
      id: "case", label: "Something offered to you", lede: "A gift, a meal, a payment, a purchase",
      note: "The first question is his: the source of misgiving is either the property or its owner, and an owner is unknown, doubted, or known by an indication. The second is what you did or want to do. Remember that on his account asking is itself a harm — so one of these four responses is one he calls forbidden without doubt.",
      axes: [
        {
          id: "know", kicker: "The source of misgiving", question: "What do you actually have to go on?",
          options: [
            { id: "nothing", label: "Nothing — no sign either way", note: "His unknown man: no mark of corruption and none of righteousness." },
            { id: "wealth", label: "More wealth than I can account for", note: "The case he addresses directly, and refuses as a ground." },
            { id: "cause", label: "Something specific gave me pause", note: "His trigger: the causes of misgiving, of which he gives three worked examples." },
            { id: "sign", label: "A clear sign of wrongdoing about them", note: "The state where an indication points one way rather than none." },
          ],
        },
        {
          id: "did", kicker: "The response", question: "What did you do, or want to do?",
          options: [
            { id: "ask", label: "Ask them where it came from", note: "Which he calls harm, a tearing of a covering, and estranging." },
            { id: "third", label: "Ask someone else about them", note: "Greater harm if they know; spying and backbiting if they do not." },
            { id: "take", label: "Take it without asking", note: "What the Companions did in villages and markets, absent a misgiving." },
            { id: "decline", label: "Decline, without saying why", note: "The scrupulous option he recommends before the permission to eat." },
          ],
        },
      ],
      verdicts: [
        { key: "*|third", name: "Both routes are closed", role: "warning", chapterId: 10, body: "Ghazali closes this one twice over. It is not permitted to ask someone else where the man knows of it, because the harm in that is greater than asking him directly — and if you ask where he does not know, there is in it thinking ill, tearing a covering, spying, and a grasping at backbiting. Four names for the second route.", action: "If the misgiving is real, the question goes to the person himself and nowhere else. If it is not real, the scrupulous option is to decline gently and say nothing — which protects everything you were trying to protect and costs him nothing." },
        { key: "cause|ask", name: "This is the warranted case", role: "support", chapterId: 9, body: "Asking requires a cause, and you have named one. His three worked examples are all of this shape: the Messenger asked whether what was brought was charity or a gift, because the circumstance made it probable; Abu Bakr asked his servant when something about his conduct gave him misgiving; Umar asked about milk whose taste was not what he was used to.", action: "Note what those three have in common — each is a specific feature of this case rather than a general worry about the times. Since asking is a harm on his account, keep it proportionate to the cause: ask the person, not a third party, and only about what actually gave you pause." },
        { key: "wealth|*", name: "The inference he refuses", role: "warning", chapterId: 9, body: "He addresses this case directly and rejects it: even if he saw in his house adornment and much wealth, it is not for him to say — the lawful is scarce and this is much, so from where could this be gathered lawfully. No; this particular person may have inherited wealth or earned it, and he himself deserves a good opinion.", action: "The fault is in the shape of the inference, which reasons from an observation about the age to a conclusion about a man. It reaches no particular person, and it would convict everyone prosperous. If there is a real cause specific to him, that is a different case; visible wealth is not one." },
        { key: "nothing|ask", name: "Forbidden without doubt", role: "warning", chapterId: 10, body: "His words on this case are unusually flat: it is not for him to ask — since asking is harm, and a tearing of a covering, and an estranging, and it is forbidden without doubt. And the historical argument behind it is that the Companions stayed in villages and entered markets without guarding against them, and no asking is reported from them except upon a misgiving.", action: "If the scruple matters to you, he gives the option before he gives the permission: let nothing enter your belly but what you know the source of — that is good — so be gentle in declining. What is forbidden is not the caution but discharging it at the other person's expense." },
        { key: "nothing|decline", name: "The option he recommends", role: "support", chapterId: 10, body: "This is exactly what he offers the scrupulous person: if he is scrupulous, then let nothing enter his belly but what he knows the source of — that is good. So let him be gentle in declining. It preserves the whole of the caution and costs the other person nothing.", action: "The one word carrying weight is gentle. A refusal that communicates suspicion does the same damage as the question would — it tears the same covering by another route. What the option requires is declining in a way that leaves no accusation behind it." },
        { key: "nothing|take", name: "What the Companions did", role: "support", chapterId: 9, body: "Not disobedient in the slightest, on his account: everyone who finds hospitality with an unknown man is not disobedient by accepting it without investigation. His evidence is historical — they entered towns and did not guard against the markets, and the unlawful existed in their time too.", action: "And his symmetry argument closes it. If you say perhaps he will not be hurt by the asking, he answers: perhaps he will be hurt. You would be asking out of caution against a perhaps — and if a bare possibility satisfies you, then perhaps his wealth is lawful. The sin in harming a Muslim is not less than the sin in eating the doubtful." },
        { key: "sign|*", name: "An indication is not nothing", role: "balance", chapterId: 8, body: "His scheme has three states of an owner relative to what you know: unknown, doubted, or known by a kind of probability resting on an indication. Yours is the third, and it is the one his framework treats as having real content — the unknown man is defined precisely as the one with no such sign either way.", action: "That gives you a cause, so the question moves from whether to ask to what asking would cost. Weigh it as he does: the harm of the doubtful against the harm of the asking, with the reminder that most people are estranged by investigation. Where a sign is clear enough, declining quietly may settle the matter without either." },
        { key: "*|*", name: "Read the cause with the response", role: "balance", chapterId: 8, body: "What you have to go on, and what you did about it. His four rulings on asking are decided by the case rather than by disposition, and the pivot is whether there is a real cause of misgiving — which is why the framework begins by sorting what you know rather than how careful you are.", action: "Take the cause first. If there is none, asking is the one response he rules out and declining gently is the one he recommends. If there is one, the question becomes proportion: to whom, about what, and at what cost — and never to a third party, which he closes with four names." },
      ],
    },
  ],
};

export const book14Sources: SourceLink[] = [
  { label: "Primary Arabic text", note: "The complete public Arabic of Book 14 was read and used to establish the seven chapters, the grading of the unlawful, the ranks of the doubtful, the boundary of obsessive scruple, and the rulings on asking.", url: "https://shamela.ws/book/9472/448" },
  { label: "The degrees of the unlawful", note: "The passage grading wrongs by whether anyone was harmed and by the state of the one harmed, and refusing to fix the number of degrees.", url: "https://shamela.ws/book/9472/449" },
  { label: "The degrees of scruple", note: "The passage giving the first degree, whose absence disqualifies a person's testimony, and the degrees above it.", url: "https://shamela.ws/book/9472/454" },
  { label: "The ranks of the doubtful", note: "The chapter opening on the report of the three divisions and defining the absolutely lawful by the example of rainwater taken from the air.", url: "https://shamela.ws/book/9472/458" },
  { label: "Where scruple becomes illness", note: "The passage naming the ranks that crowd upon obsessive scruple, and testing them against what the Companions are reported to have done.", url: "https://shamela.ws/book/9472/476" },
  { label: "Investigating and asking", note: "The chapter refusing both general policies, giving four rulings on asking, and treating the unknown owner.", url: "https://shamela.ws/book/9472/478" },
  { label: "That asking is a harm", note: "The passage arguing that asking is a tearing of a covering and forbidden without doubt, with the symmetry of the two possibilities.", url: "https://shamela.ws/book/9472/479" },
  { label: "Forty-book structure", note: "Ghazali.org's listing places Book 14 as the fourth book of the Quarter of Customs and confirms its title.", url: "https://www.ghazali.org/listing-the-forty-books/" },
];

export const book14: SystemBook = {
  id: 14,
  title: "The Lawful and the Unlawful",
  shortTitle: "Lawful and Unlawful",
  defaultJourneyId: "what-is-doubtful",
  chapters: book14Chapters,
  conceptNodes: book14ConceptNodes,
  journeys: book14Journeys,
  sources: book14Sources,
  taxonomy: {
    title: "Seven chapters",
    note: "Ghazali's own seven. The first three are the doctrine — the degrees, the doubtful, and what to do when you meet it — and eleven of the twelve reading sections belong to them. The last four are where that doctrine collides with things a person does not control.",
    groups: book14Movements,
  },
  instrument: book14Instrument,
  editorialNote: "The three journeys, twelve reading sections, visual models, and diagnostic are editorial learning aids. The sections follow Ghazali's seven chapters in his order and are grouped under them in the movements list; the twelfth section covers the last four chapters together and is marked as such. The English is an original synthesis made from a reading of the public Arabic text, not a translation and not a substitute for one. Reports and inherited anecdotes are presented as material Ghazali transmitted; this prototype does not independently grade every narration. Two matters of scope. The fourth, fifth, sixth, and seventh chapters — on restitution for financial wrongs, on the stipends and gifts of rulers, on entering upon rulers, and on scattered legal questions — are heavily circumstantial and legally consequential. The fifth and sixth address a particular political order and a particular relationship between scholars and rulers; the fourth concerns obligations owed to identifiable people. This edition presents their subjects and why they belong in the book, and reproduces none of their rulings; nothing here should be used to determine what anyone owes or may accept, which is the business of a work of law and of qualified guidance. And Ghazali's remarks on the degrees of scruple, on where scruple becomes obsessive, and on when asking is forbidden are his positions within a live discussion, including a passing judgement about a report not having reached another jurist; they are reported here as his. The diagnostic applies his own criterion — whether there is a real cause of misgiving, and what asking would cost — to a case the reader supplies. It cannot tell anyone whether a particular thing is lawful.",
};
