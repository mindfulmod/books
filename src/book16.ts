import { assetUrl } from "./assetUrl";
import type { Chapter, ConceptNode, VisualModel } from "./data";
import type { Instrument, Journey, SourceLink, SystemBook, TaxonomyGroup } from "./systemTypes";

type Seed = { id: number; shortTitle: string; formalTitle: string; overview: string; moves: Array<{ title: string; body: string }>; closer: Array<{ title: string; body: string }>; distinction: [string, string, string, string, string]; misreading: string; reflection: string; audit: string[]; nodes: string[]; model: VisualModel };
const bab = (id: number) => (id <= 2 ? "the first chapter, on the disagreement" : id <= 6 ? "the second chapter, on the benefits of seclusion" : "the second chapter, on the harms of seclusion");
const makeChapter = (seed: Seed): Chapter => ({
  id: seed.id, shortTitle: seed.shortTitle, formalTitle: seed.formalTitle, overview: seed.overview,
  points: seed.moves.slice(0, 3).map((m) => m.body), reflection: seed.reflection, relatedNodes: seed.nodes, visualModel: seed.model,
  deep: { thesis: seed.moves[0].body, context: seed.overview, moves: seed.moves, closeReading: seed.closer,
    distinction: { title: seed.distinction[0], firstLabel: seed.distinction[1], first: seed.distinction[2], secondLabel: seed.distinction[3], second: seed.distinction[4] },
    misreading: seed.misreading, observation: seed.reflection, selfAudit: seed.audit,
    sourceAnchor: `Book 16, ${bab(seed.id)}, ${seed.formalTitle}.` },
});
const chain = (title: string, caption: string, items: Array<[string, string, "support" | "balance" | "warning"]>): VisualModel => ({ kind: "chain", title, caption, items: items.map(([label, body, role]) => ({ label, body, role })) });
const pair = (title: string, caption: string, items: Array<[string, string, "support" | "balance" | "warning"]>): VisualModel => ({ kind: "pair", title, caption, items: items.map(([label, body, role]) => ({ label, body, role })) });
const spectrum = (title: string, caption: string, items: Array<[string, string, "support" | "balance" | "warning"]>): VisualModel => ({ kind: "spectrum", title, caption, items: items.map(([label, body, role]) => ({ label, body, role })) });

export const book16Chapters: Chapter[] = [
  makeChapter({
    id: 1, shortTitle: "An old disagreement", formalTitle: "That the question is open",
    overview: "The book opens the way Book 12 opened, on a dispute among people whose seriousness nobody questions — and it names them.",
    moves: [
      { title: "Report the split", body: "The disagreement appeared among the Successors: some went to choosing seclusion and preferring it over mixing, and others to the opposite." },
      { title: "Name a side", body: "Among those who chose seclusion and preferred it was Sufyan al-Thawri, and the chapter names others on both sides rather than leaving the dispute anonymous." },
      { title: "Note what naming does", body: "A disagreement between named authorities cannot be settled by finding the position obviously right. Both sides were held by people the reader is expected to respect." },
      { title: "Weigh an argument on the way", body: "One argument for mixing is drawn from the verse about God having joined their hearts, since it counts the uniting cause a favour — and Ghazali marks that as weak, since what is meant by it is something narrower." },
    ],
    closer: [
      { title: "Why the arguments are weighed rather than counted", body: "The chapter does not tally verses for each side. It examines what each is actually about, and rejects one of the pro-mixing arguments on the ground that the verse is doing a different job — which is the method the whole book uses." },
      { title: "Where the book sits in the quarter", body: "Book 15 spent twelve sections on what a friendship owes. This one asks whether to have friendships at all, and the ordering is deliberate: the cost of company has to be established before the case for avoiding it can be weighed." },
    ],
    distinction: ["Two ways to open a contested question", "By naming the sides", "Which makes it clear the question cannot be settled by obviousness.", "By stating a conclusion", "Which would leave the reader with no way to see what the dispute was about."],
    misreading: "Do not read the naming of Sufyan al-Thawri as an endorsement. The chapter names authorities on both sides, which is what establishes that the question is genuinely open.",
    reflection: "Notice which side you assumed a book with this title would take.",
    audit: ["Which side did I assume?", "Whom do I respect on the other?", "Can this be settled by obviousness?", "Why does this follow companionship?"],
    nodes: ["uzla", "khilaf", "structure"],
    model: pair("Two sides, both named", "Which is what makes the question open.", [["Seclusion preferred", "Sufyan al-Thawri among them.", "balance"], ["Mixing preferred", "Held by others of the same generation.", "balance"]]),
  }),
  makeChapter({
    id: 2, shortTitle: "The same method", formalTitle: "How the question will be settled",
    overview: "The second chapter opens by pointing at another book of the Ihya and saying that this question has the same shape as that one.",
    moves: [
      { title: "Name the parallel", body: "People's disagreement in this resembles their disagreement about the merit of marriage." },
      { title: "Recall what was done there", body: "He refers to the harms of marriage and its benefits, treated in the book on marriage — where the answer came out differently for different people according to which harms they faced." },
      { title: "Apply it", body: "So likewise the statement in what we are in. So let us first mention the benefits of seclusion." },
      { title: "Sort the benefits", body: "They divide into religious benefits and worldly ones, and the religious into what makes acts of obedience possible in solitude and what preserves a person from what mixing exposes him to." },
    ],
    closer: [
      { title: "What the parallel commits him to", body: "No general verdict. Book 12 produced two worked cases that came out on opposite sides, and by invoking it here Ghazali is announcing in advance that this book will do the same — which is why the chapter is a weighing rather than an argument." },
      { title: "The shape of the weighing", body: "Six benefits of seclusion against seven benefits of mixing, which are its harms. The second set is stated as what mixing gives rather than as what seclusion costs, and the difference matters: what is lost is nameable and specific." },
    ],
    distinction: ["Two ways to state the cost of seclusion", "As what mixing gives", "Seven definite goods, each of which can be checked against a particular life.", "As a general loss", "Isolation as an abstract deficiency, which nothing could weigh."],
    misreading: "Do not expect a verdict. The method is borrowed from a book that ended in two cases pointing opposite ways, and it is borrowed deliberately.",
    reflection: "Ask which of the two questions — marriage or solitude — you would have expected to have a general answer.",
    audit: ["Am I looking for a verdict?", "Which harms do I face?", "What would mixing give me?", "Is my loss nameable?"],
    nodes: ["mizan", "uzla", "khilaf"],
    model: pair("Six against seven", "Weighed for a person, not in general.", [["Benefits of seclusion", "Six, religious and worldly.", "support"], ["Benefits of mixing", "Seven, and their loss is what seclusion costs.", "balance"]]),
  }),
  makeChapter({
    id: 3, shortTitle: "Room, and safety", formalTitle: "The first two benefits",
    overview: "The first two benefits of seclusion, and they are of two different kinds: one makes something possible and the other prevents something.",
    moves: [
      { title: "Give the first", body: "Freeing oneself for worship and for thought, and finding intimacy in intimate converse with God rather than in converse with people." },
      { title: "Note what it is", body: "A benefit of capacity: it does not remove a danger but creates room. It is the benefit that connects this book to the Quarter of Worship, where the whole practice was arranged around continuity." },
      { title: "Give the second", body: "Escaping, by seclusion, the sins a person is generally exposed to by mixing, and being safe from them in solitude." },
      { title: "Name the chief of them", body: "Chiefly the blights of the tongue, treated in the Quarter of Perils — where, he says, guarding against them while mixing is a great matter, and none escapes them but the truthful." },
    ],
    closer: [
      { title: "The weight of that last clause", body: "None escapes them but the truthful. It is a very strong claim: on Ghazali's own account of the tongue, mixing reliably produces sins that almost nobody avoids. That is the strongest thing said for seclusion anywhere in the book." },
      { title: "Why the two kinds matter for the weighing", body: "A benefit of capacity can sometimes be got another way; a benefit of safety cannot, if the danger is where the people are. Knowing which kind is drawing a person tells him whether seclusion is the only route to what he wants." },
    ],
    distinction: ["Two kinds of benefit", "Capacity", "Room made for worship and thought, which might be found by other arrangements.", "Safety", "Escape from what mixing reliably produces, which only distance reaches."],
    misreading: "Do not read the second benefit as misanthropy. Its subject is what a person does with his own tongue in company, not what others do to him — that is the fourth benefit and is treated separately.",
    reflection: "Ask which of the two you actually want, and whether anything but distance would supply it.",
    audit: ["Room, or safety?", "Could I get it another way?", "What does my tongue do in company?", "Who escapes those, on his account?"],
    nodes: ["ibada", "lisan", "fawaid"],
    model: pair("Two kinds of benefit", "Only one of them requires distance.", [["Room", "Freed for worship, thought, and converse with God.", "support"], ["Safety", "From the tongue's blights, which none escapes but the truthful.", "support"]]),
  }),
  makeChapter({
    id: 4, shortTitle: "Trials, and people", formalTitle: "The third and fourth benefits",
    overview: "Two benefits about what other people do, and the second of them is an unusually frank list.",
    moves: [
      { title: "Give the third", body: "Escaping from trials and disputes, and preserving religion and self from plunging into them and being exposed to their dangers." },
      { title: "Note its scope", body: "It is about being drawn into conflicts that are not yours — the quarrels of a place, which reach a person because he is present rather than because he chose them." },
      { title: "Give the fourth", body: "Escaping from the evil of people — for they harm you sometimes by backbiting, and sometimes by ill opinion and accusation, and by demands and expectations." },
      { title: "Note what it names", body: "Three distinct injuries, and the second and third require nothing to have happened: being thought ill of, and being expected of, are harms a person suffers without any event." },
    ],
    closer: [
      { title: "Why demands are counted as harm", body: "Expectation is included alongside backbiting, which is unusual. A person surrounded by people acquires obligations he did not undertake, and the fifth benefit follows directly from this one by cutting the flow in both directions." },
      { title: "The difference between the second and fourth benefits", body: "The second is about what mixing does to you; the fourth is about what it does through others. A person may need one and not the other, and the weighing only works if he can tell which." },
    ],
    distinction: ["Two sources of harm in company", "What you do", "The tongue's blights, which is the second benefit.", "What is done to you", "Backbiting, ill opinion, and expectation, which is the fourth."],
    misreading: "Do not read the fourth as licensing a low opinion of people. It is a list of ordinary and mostly unintended injuries, and one of them is simply being expected of.",
    reflection: "Ask which of the three named injuries you have actually suffered in the last month.",
    audit: ["Which injury is real for me?", "Am I in disputes I did not choose?", "What is expected of me?", "Does this need me to think ill of anyone?"],
    nodes: ["fitna", "fawaid", "uzla"],
    model: spectrum("Three injuries in one benefit", "Two of them require no event.", [["Backbiting", "Something said about you.", "warning"], ["Ill opinion", "Something thought, which you may never learn.", "warning"], ["Expectation", "Obligations acquired without undertaking them.", "balance"]]),
  }),
  makeChapter({
    id: 5, shortTitle: "Both directions", formalTitle: "The fifth benefit",
    overview: "The benefit that cuts a flow rather than removing a danger, and it is stated symmetrically on purpose.",
    moves: [
      { title: "Give the benefit", body: "That people's greed for you is cut off, and your greed for people is cut off." },
      { title: "Note the symmetry", body: "Both halves are named, and the order puts theirs first. The benefit is not primarily about being left alone; it is about a two-way traffic in expectation stopping." },
      { title: "Give what follows from the first half", body: "For in the cutting off of people's greed for you there are benefits — chief among them that a person is no longer measured against what others hope to get from him." },
      { title: "Note the excuses", body: "He observes that obstacles prevent a person from some of what is expected, and that excuses are met with, and not every excuse can be made public — so people say: he undertook the right of so-and-so and did not undertake mine." },
    ],
    closer: [
      { title: "Why the excuses passage is the sharpest part", body: "It describes an ordinary and inescapable position: a person cannot meet every claim, cannot explain why, and is therefore permanently in the wrong with someone. Seclusion is offered here as an escape from a bookkeeping that cannot be balanced." },
      { title: "The half that is easy to overlook", body: "Your greed for people. The benefit is not only relief from being wanted but relief from wanting — and that half is the one a person can do something about without going anywhere." },
    ],
    distinction: ["Two flows that stop", "Theirs toward you", "Expectations you cannot all meet, and cannot explain failing.", "Yours toward them", "Which is the half that does not require distance to address."],
    misreading: "Do not read this as a benefit of being unavailable. What is described is the end of a two-way traffic, and the second direction is entirely within a person's own control.",
    reflection: "Ask whom you are currently in the wrong with for a reason you cannot explain.",
    audit: ["Whose expectation cannot I meet?", "Can I explain why?", "What do I want from people?", "Which half is in my control?"],
    nodes: ["tama", "fawaid", "uzla"],
    model: pair("Two directions", "Only one of them needs distance.", [["Their greed for you", "Claims you cannot all meet, and cannot explain.", "warning"], ["Your greed for them", "Which stopping requires no seclusion at all.", "support"]]),
  }),
  makeChapter({
    id: 6, shortTitle: "The tiresome", formalTitle: "The sixth benefit",
    overview: "The last benefit, and it is the most human and the least elevated in the list — which is presumably why it is last.",
    moves: [
      { title: "Give the benefit", body: "Escaping from the sight of the tiresome and the foolish, and from enduring their folly and their manners." },
      { title: "Give the phrase", body: "For the sight of a tiresome person is, he says, the blinding affliction — and the chapter's language here is notably unguarded." },
      { title: "Note where it leads", body: "He adds that all of that draws toward the corruption of religion, and that in seclusion there is safety from all of it — which is how a complaint about tedium is connected to the rest of the book." },
      { title: "Note the honesty of including it", body: "It is not an argument anyone would invent to dignify a preference. Its presence in a list of six suggests the list is a description of what actually drives people to solitude rather than a set of justifications." },
    ],
    closer: [
      { title: "Why it is last", body: "The six run from the loftiest to the plainest: converse with God, then safety from one's own tongue, then trials, then others' harm, then expectation, and finally the sheer wearing effect of tiresome company. Ordering them this way makes the list read as honest rather than as advocacy." },
      { title: "The link he draws", body: "That enduring folly draws toward the corruption of religion. It is a claim about attrition rather than about any single event, and it is the only ground on which so ordinary a complaint could belong in this book at all." },
    ],
    distinction: ["Two ways to justify avoiding company", "By attrition", "That enduring it wears at religion over time, which is the ground given.", "By dislike", "Which would be a preference rather than a reason, and would not belong in the list."],
    misreading: "Do not take this benefit as permission to avoid people you find dull. It is one of six weighed against seven, and the seven include several things that only tiresome company can supply.",
    reflection: "Notice that the most relatable item on the list is the one placed last.",
    audit: ["Is this the real reason?", "Attrition, or dislike?", "What would I lose by avoiding them?", "Why is it last?"],
    nodes: ["thuqala", "fawaid", "uzla"],
    model: chain("Six benefits, in order", "From the loftiest to the plainest.", [["Converse with God", "Room for worship and thought.", "support"], ["Safety from your tongue", "What none escapes but the truthful.", "support"], ["Trials and others' harm", "Disputes, backbiting, ill opinion, expectation.", "balance"], ["Tiresome company", "The plainest, and placed last.", "balance"]]),
  }),
  makeChapter({
    id: 7, shortTitle: "Seven things lost", formalTitle: "The harms of seclusion",
    overview: "The other side of the scales, and Ghazali states it in a way that makes the loss specific rather than general.",
    moves: [
      { title: "Give the principle", body: "Among the religious and worldly aims are those obtained by seeking help from another, and that is not obtained except by mixing." },
      { title: "Draw the consequence", body: "So everything gained from mixing is missed by seclusion — and its being missed is among the harms of seclusion." },
      { title: "Name them", body: "Teaching and learning; benefiting and being benefited; disciplining and being disciplined; giving intimacy and receiving it; attaining reward and giving it in fulfilling rights; habituating humility; and gaining experience from witnessing conditions and taking lessons from them." },
      { title: "Give the number", body: "Seven benefits of mixing. And each of them is stated as a pair — you do it and it is done to you — which is what makes them impossible in solitude by definition rather than by difficulty." },
    ],
    closer: [
      { title: "Why the pairing matters", body: "Teaching and learning, benefiting and being benefited, disciplining and being disciplined, giving intimacy and receiving it. Each names both directions, which is why no arrangement short of company supplies them: half of each requires someone else present." },
      { title: "The one that is easiest to forget", body: "Habituating humility. It is not a thing done to a person or by him but a disposition that only friction produces, and a solitary person has nothing to practise it against." },
    ],
    distinction: ["Two ways a good can be unavailable alone", "By difficulty", "Harder without company, but achievable with effort.", "By definition", "Requiring another person, as every one of the seven does."],
    misreading: "Do not read the seven as reasons a solitary person is worse. They are goods he does not have, weighed against six he does — which is what a weighing is.",
    reflection: "Take the seven and ask honestly how many you currently receive.",
    audit: ["How many of the seven do I get?", "Which do I give?", "What produces humility in me?", "Which of these could I get alone?"],
    nodes: ["mukhalata", "afat", "taallum"],
    model: spectrum("Seven, each a pair", "Half of each requires another person.", [["Teaching and learning", "The greatest acts of worship in this world.", "support"], ["Benefiting and being benefited", "In both directions.", "support"], ["Disciplining and being disciplined", "Which friction supplies.", "support"], ["Intimacy, reward, humility, experience", "The remaining four.", "balance"]]),
  }),
  makeChapter({
    id: 8, shortTitle: "Learn first", formalTitle: "The one case he decides outright",
    overview: "The book's sharpest ruling, and it is the only place where seclusion is not weighed but simply refused.",
    moves: [
      { title: "Give the ground", body: "Teaching and learning are the greatest acts of worship in this world — as the Book of Knowledge argued — and that is inconceivable except by mixing." },
      { title: "Give the ruling", body: "So one who needs to learn what is obligatory upon him is disobedient by seclusion." },
      { title: "Note the word", body: "Disobedient. Not unwise, not premature — the withdrawal is itself a wrong, because it makes an obligation impossible to discharge." },
      { title: "Give the saying", body: "Hence al-Nakha'i and others said: become learned, then withdraw." },
    ],
    closer: [
      { title: "What he says happens instead", body: "For one who withdraws before learning is, in most cases, wasting his time in sleep or in thinking about nonsense — and the most he achieves is to fill his hours with litanies. It is a description of failure rather than a warning about it." },
      { title: "Why this case is decided and the others weighed", body: "Because it is not a question of what a person would gain or lose but of an obligation he cannot meet where he is going. Nothing on the other side of the scales can outweigh a duty that becomes impossible, so the weighing never begins." },
    ],
    distinction: ["Two kinds of case in this book", "Weighed", "Six benefits against seven, coming out differently for different people.", "Decided", "Where seclusion makes an obligation impossible, and no weighing is needed."],
    misreading: "Do not read this as requiring scholarship of everyone. What is obligatory is the knowledge Book 1 defined — the act in front of you and the time it falls due — and the ruling is about that.",
    reflection: "Ask whether you know what you are obliged to know, before asking whether you would be better off alone.",
    audit: ["Do I know the obligatory?", "Where would I learn it?", "Am I withdrawing before or after?", "What would I actually do with the hours?"],
    nodes: ["taallum", "fard-ayn", "afat"],
    model: chain("Why this one is not weighed", "An impossible duty ends the calculation.", [["An obligation stands", "The knowledge of what falls due, per Book 1.", "support"], ["Learning needs company", "Which seclusion removes.", "balance"], ["So it is refused", "Disobedient by seclusion — no weighing begins.", "warning"]]),
  }),
  makeChapter({
    id: 9, shortTitle: "Three cases", formalTitle: "How the ruling is qualified",
    overview: "Having refused one case outright, Ghazali immediately sorts the rest — and the third of them is the one most likely to apply to a serious reader.",
    moves: [
      { title: "The first case", body: "One who needs to learn what is obligatory on him: disobedient by seclusion, and the case is closed." },
      { title: "The second case", body: "If he has learned the obligatory, and plunging into the sciences is not within him, and he sees fit to occupy himself with worship — then he should withdraw." },
      { title: "The third case", body: "If he is capable of excelling in the sciences of Law and of reason, then seclusion for him, before learning, is the utmost loss." },
      { title: "Note what separates the second from the third", body: "Capacity. The same person's duty differs according to what he could become, which makes the ruling depend on an honest estimate of one's own ability." },
    ],
    closer: [
      { title: "Why the third case is the hard one", body: "It is aimed at exactly the reader most drawn to seclusion: someone capable, serious, and inclined to withdraw for worship. Ghazali calls that the utmost loss — and it is the only phrase of its kind in the book." },
      { title: "The estimate the ruling requires", body: "Whether plunging into the sciences is within a person is not something the book can settle for him. The three cases are a procedure that terminates in a judgement he has to make about himself, which is why the saying attached to it is so short: become learned, then withdraw." },
    ],
    distinction: ["Two people who have learned the obligatory", "Not capable of more", "For whom withdrawal to worship is permitted outright.", "Capable of excelling", "For whom withdrawal before learning is called the utmost loss."],
    misreading: "Do not use the second case to excuse yourself from the third. The difference is capacity, and a person inclined to withdraw has an interest in underestimating his own.",
    reflection: "Ask which of the three cases you are in, and whether you would like the answer to be the second.",
    audit: ["Which case am I in?", "Do I want it to be the second?", "What could I become?", "Who decides that?"],
    nodes: ["taallum", "darajat", "uzla"],
    model: spectrum("Three cases", "Separated by capacity, not by inclination.", [["Has not learned", "Disobedient by seclusion.", "warning"], ["Learned, not capable of more", "Let him withdraw.", "support"], ["Capable of excelling", "Seclusion before learning is the utmost loss.", "warning"]]),
  }),
  makeChapter({
    id: 10, shortTitle: "What the weighing gives", formalTitle: "How the book ends",
    overview: "The book closes as Book 12 closed — with a procedure rather than a verdict, and the procedure is the same one.",
    moves: [
      { title: "Restate the shape", body: "Six benefits of seclusion, seven benefits of mixing whose loss is its harm, and an answer that comes out differently according to which of them apply to a person." },
      { title: "Note the one exception", body: "One case is not weighed at all: where seclusion makes an obligation impossible. Everything else is a comparison." },
      { title: "Note what makes the comparison usable", body: "Both lists are specific. Nothing on either side is a general disposition — each item is something a person either receives, suffers, or fails to obtain, and can therefore be checked." },
      { title: "Give the closing sense", body: "So the question is not whether solitude is better, but what this person would gain and what he would stop being able to do." },
    ],
    closer: [
      { title: "The pair of books", body: "Book 15 established what companionship costs and what it owes; this one asks whether to have it. Read alone, either would be one-sided — the first can look like an impossible standard, and the second like a case against people." },
      { title: "Where the quarter goes next", body: "Travel follows, and then listening, and then enjoining right — each of them a different way of being among people or apart from them. This pair is the hinge, and the books after it assume the weighing has been done." },
    ],
    distinction: ["Two questions about solitude", "Is it better for me", "Answered by two specific lists checked against a particular life.", "Is it better", "Which produced a disagreement among the Successors and cannot be settled."],
    misreading: "Do not read the book as favouring either side. It names authorities on both, borrows its method from a book that ended in two opposite cases, and decides only where an obligation is at stake.",
    reflection: "Do the count honestly: six on one side, seven on the other, and only the ones that actually apply.",
    audit: ["How many of the six apply?", "How many of the seven do I get?", "Is an obligation at stake?", "Did I want a verdict?"],
    nodes: ["mizan", "uzla", "mukhalata"],
    model: pair("What the book supplies", "Which is what its method commits it to.", [["A procedure", "Two specific lists, checked against a particular life.", "support"], ["Not a verdict", "Which the disagreement among the Successors already showed unavailable.", "balance"]]),
  }),
];

export const book16ConceptNodes: ConceptNode[] = [
  ["uzla", "Seclusion", "An open question", "Disputed among the Successors, with named authorities on both sides."],
  ["khilaf", "The disagreement", "Not settled by obviousness", "Which is why the arguments are weighed rather than counted."],
  ["structure", "Two chapters", "Dispute, then weighing", "The method borrowed openly from the book on marriage."],
  ["mizan", "The weighing", "Six against seven", "Answered for a person, and only one case decided outright."],
  ["ibada", "Worship", "A benefit of capacity", "Room made rather than a danger removed."],
  ["lisan", "The tongue", "A benefit of safety", "Its blights, which none escapes in company but the truthful."],
  ["fawaid", "Six benefits", "Loftiest to plainest", "Ending on the sheer wearing effect of tiresome company."],
  ["fitna", "Trials", "Not yours", "Disputes that reach a person because he is present."],
  ["tama", "Greed", "Both directions", "Theirs for you, and yours for them — only one needs distance."],
  ["thuqala", "The tiresome", "Placed last", "Included because the list describes what drives people, not what dignifies them."],
  ["mukhalata", "Mixing", "Seven goods", "Each stated as a pair, so half of each needs another person."],
  ["afat", "The harms", "Stated as losses", "What mixing gives, so that the cost of solitude is nameable."],
  ["taallum", "Learning", "The decided case", "One who needs to learn the obligatory is disobedient by seclusion."],
  ["fard-ayn", "The obligatory", "As Book 1 defined it", "The act in front of you and the time it falls due."],
  ["darajat", "Capacity", "What separates the cases", "The same person's duty differs by what he could become."],
].map(([id, label, kicker, description], index) => ({ id, label, kicker, description, position: ["left", "right", "top", "bottom"][index % 4] }));

const node = (id: string, label: string, micro: string, summary: string, guardrail: string, chapterId: number, glyph: Journey["nodes"][number]["glyph"]): Journey["nodes"][number] => ({ id, label, micro, summary, guardrail, chapterId, glyph });

export const book16Journeys: Journey[] = [
  {
    id: "why-withdraw", number: "01", question: "What is actually gained by being alone?", title: "Take the six honestly",
    description: "Watch the question opened as a dispute among named authorities, the method borrowed from the book on marriage, and six benefits running from the loftiest to the plainest.",
    payoff: "You get a list specific enough to check against your own life, including the item nobody would invent.",
    image: assetUrl("assets/system/book16-one-lamp.jpg"), imageAlt: "A single lit window in a long wall of dark ones, seen from an empty street at night.", minutes: 12, color: "#278d91",
    nodes: [
      node("both-named", "Note the naming", "Sufyan on one side", "Authorities named on both, which is what opens the question.", "It cannot be settled by finding one side obvious.", 1, "know"),
      node("like-marriage", "Take the method", "The same as marriage", "Which ended in two worked cases pointing opposite ways.", "Announced in advance, so no verdict is coming.", 2, "order"),
      node("two-kinds", "Separate the first two", "Room, and safety", "One creates capacity; the other removes a danger.", "Only the second necessarily requires distance.", 3, "diagnose"),
      node("none-escape", "Weigh the strongest", "None but the truthful", "On his own account of the tongue, company reliably produces sins.", "The strongest thing said for seclusion in the book.", 3, "witness"),
      node("expectation", "Note the third injury", "Being expected of", "Counted as a harm alongside backbiting and ill opinion.", "Obligations acquired without undertaking them.", 4, "pattern"),
      node("the-tiresome", "Note what is last", "The plainest one", "Escaping the tiresome, and the wear of enduring folly.", "Its presence suggests the list is honest, not advocacy.", 6, "steady"),
    ],
  },
  {
    id: "what-is-lost", number: "02", question: "What would I stop being able to do?", title: "Count the seven",
    description: "Take the other side of the scales, notice why every item is stated as a pair, and meet the one case in the book that Ghazali refuses to weigh at all.",
    payoff: "You get the cost of solitude stated specifically, and a ruling that ends a calculation before it starts.",
    image: assetUrl("assets/system/book16-two-doors.jpg"), imageAlt: "A study with a desk and books, its door standing open onto a courtyard where other doors face inward.", minutes: 12, color: "#bf7a35",
    nodes: [
      node("as-losses", "Note the framing", "What mixing gives", "So the cost of solitude is nameable rather than general.", "A general loss could not be weighed at all.", 7, "clear"),
      node("each-a-pair", "Note the pairing", "Both directions", "Teaching and learning; benefiting and being benefited.", "Half of each requires someone else present.", 7, "pattern"),
      node("humility", "Find the easy one to miss", "Habituating humility", "Which only friction produces, and solitude offers none.", "Not something done to you or by you.", 7, "diagnose"),
      node("disobedient", "Take the ruling", "Disobedient by seclusion", "For one who still needs to learn what is obligatory.", "Not unwise — a wrong, because a duty becomes impossible.", 8, "guard"),
      node("then-withdraw", "Take the saying", "Become learned, then withdraw", "Al-Nakha'i, and the description of what happens otherwise.", "Sleep, or nonsense, or hours filled with litanies.", 8, "know"),
      node("utmost-loss", "Take the third case", "The utmost loss", "For one capable of excelling who withdraws before learning.", "Aimed at exactly the reader most drawn to withdraw.", 9, "witness"),
    ],
  },
];

export const book16Movements: TaxonomyGroup[] = [
  ["bab1", "1. The disagreement", "Named authorities on both sides, and the arguments weighed rather than counted.", [1]],
  ["bab2a", "2a. The benefits of seclusion", "Six, from converse with God to escaping tiresome company.", [2, 3, 4, 5, 6]],
  ["bab2b", "2b. The harms of seclusion", "Seven goods of mixing, and the one case decided outright.", [7, 8, 9, 10]],
].map(([id, label, description, chapterIds], index) => ({ id, label, description, chapterIds, color: ["#bf7a35", "#278d91", "#c25f50"][index % 3] })) as TaxonomyGroup[];

export const book16Instrument: Instrument = {
  title: "Six against seven",
  note: "Ghazali says the disagreement about seclusion resembles the disagreement about marriage, and settles it the same way: six benefits of solitude weighed against seven goods of company, with the answer coming out differently for different people. One case he refuses to weigh. Answer for your own circumstances.",
  items: [
    {
      id: "case", label: "Your own situation", lede: "As it is, not as you would arrange it",
      note: "The first question is his six benefits, grouped. The second is his seven goods of mixing, grouped — each of which is stated as a pair in the original, so that half of it requires another person. Note that one combination is not a weighing at all on his account.",
      axes: [
        {
          id: "draw", kicker: "The benefits of seclusion", question: "What actually draws you toward solitude?",
          options: [
            { id: "room", label: "Room for worship and thought", note: "His first: freed for converse with God rather than with people." },
            { id: "tongue", label: "What I become in company", note: "His second: the blights of the tongue, which he says none escapes but the truthful." },
            { id: "others", label: "What others do — and expect", note: "His third and fourth: trials not mine, backbiting, ill opinion, and demands." },
            { id: "weary", label: "The sheer wear of tiresome company", note: "His sixth, placed last, and the one nobody would invent to dignify a preference." },
          ],
        },
        {
          id: "lose", kicker: "The goods of mixing", question: "And what would you stop being able to do?",
          options: [
            { id: "learn", label: "Learn what I am obliged to know", note: "His first, and the case he refuses to weigh." },
            { id: "teach", label: "Teach, or be of use to anyone", note: "Also his first, in the other direction, and his second." },
            { id: "adab", label: "Be corrected, and learn humility", note: "His third and sixth: what only friction supplies." },
            { id: "nothing", label: "Nothing I can name", note: "Which the seven exist to test, since each names something specific." },
          ],
        },
      ],
      verdicts: [
        { key: "*|learn", name: "This one he does not weigh", role: "warning", chapterId: 8, body: "His ruling here is flat and it is the only one of its kind in the book: teaching and learning are the greatest acts of worship in this world, that is inconceivable except by mixing, and so one who needs to learn what is obligatory upon him is disobedient by seclusion. Not unwise — disobedient, because a duty becomes impossible where he is going.", action: "Al-Nakha'i's saying is the whole prescription: become learned, then withdraw. And Ghazali describes what happens to those who invert it — in most cases wasting the time in sleep or in thinking about nonsense, and at best filling the hours with litanies. What is obligatory here is the knowledge Book 1 defined: the act in front of you and the time it falls due, not scholarship." },
        { key: "room|*", name: "A benefit of capacity", role: "support", chapterId: 3, body: "His first benefit makes room rather than removing a danger — freed for worship and thought, and finding intimacy in converse with God rather than with people. That distinction matters for the weighing, because a benefit of capacity can sometimes be obtained by other arrangements.", action: "So the question before the weighing is whether anything short of solitude would supply it. Book 10's whole argument is that a practice is sustained by variation and by the arrangement of a day rather than by circumstances — which is worth trying before concluding that only distance will do." },
        { key: "weary|*", name: "The plainest of the six", role: "balance", chapterId: 6, body: "He includes this and puts it last: escaping the sight of the tiresome and the foolish and the enduring of their folly. The ground he gives is attrition — that all of it draws toward the corruption of religion — which is the only basis on which so ordinary a complaint could belong in the book at all.", action: "Its position in the list is worth taking seriously. The six run from converse with God down to this, and a weighing that rests on the sixth alone is resting on the lightest of them against seven goods of company. Ask whether one of the other five is also true, or whether this is the whole of it." },
        { key: "tongue|nothing", name: "His strongest argument, unopposed", role: "support", chapterId: 3, body: "The second benefit is the strongest thing said for seclusion anywhere in the book, and it is about you rather than about anyone else: escaping the sins a person is generally exposed to by mixing — chiefly the blights of the tongue, of which he says that guarding against them in company is a great matter, and none escapes them but the truthful.", action: "And if none of the seven applies, the weighing has nothing on the other side. Test that answer against the list one at a time, since the seven exist precisely to make a general 'nothing' hard to sustain — particularly the two that are not experienced as losses: being corrected, and having something to practise humility against." },
        { key: "*|adab", name: "What only friction supplies", role: "balance", chapterId: 7, body: "Two of his seven are exactly this: disciplining and being disciplined, and the habituating of humility. Both are stated as things that happen to a person rather than things he does, and neither has any occasion in solitude — a solitary person has nothing to practise humility against.", action: "This is the half of the ledger that is hardest to notice missing, because nobody experiences the absence of correction as a loss. If it is what you would give up, the honest question is where else it would come from — and his third case is worth reading, since it is aimed at precisely the capable and serious reader who is drawn to withdraw." },
        { key: "*|teach", name: "The pairing is the point", role: "balance", chapterId: 7, body: "Every one of his seven names both directions: teaching and learning, benefiting and being benefited, disciplining and being disciplined, giving intimacy and receiving it. That is why none of them survives solitude — half of each requires another person present, so they are unavailable by definition rather than by difficulty.", action: "If what you would lose is the giving half, weigh it as he does rather than as a duty: it sits among seven goods against six, and the six are real. But note that his one decided case is in this same group, so check first whether anyone depends on you for something obligatory." },
        { key: "*|nothing", name: "Then test the seven one by one", role: "balance", chapterId: 7, body: "His seven are stated specifically so that this answer can be checked rather than felt. Teaching and learning; benefiting and being benefited; disciplining and being disciplined; giving intimacy and receiving it; attaining reward and giving it in fulfilling rights; habituating humility; and gaining experience from witnessing conditions.", action: "Two of them are almost never experienced as absences, which is why a general 'nothing' usually survives: correction, and the friction that produces humility. And check the first against his decided case — if there is anything you are still obliged to learn, the calculation does not begin." },
        { key: "*|*", name: "Run the count honestly", role: "balance", chapterId: 10, body: "Six on one side, seven on the other, weighed for a person rather than in general — the method he borrows openly from the book on marriage, which ended in two worked cases pointing opposite ways.", action: "Count only the items that actually apply, in both directions, and check the decided case first: if you still need to learn what is obligatory, nothing else enters the calculation. Beyond that, the question is not whether solitude is better but what you would gain and what you would stop being able to do." },
      ],
    },
  ],
};

export const book16Sources: SourceLink[] = [
  { label: "Primary Arabic text", note: "The complete public Arabic of Book 16 was read and used to establish the disagreement, the six benefits of seclusion, the seven goods of mixing, and the rulings on learning.", url: "https://shamela.ws/book/9472/581" },
  { label: "The disagreement", note: "The passage reporting the split among the Successors, naming authorities on both sides, and weighing the arguments offered for each.", url: "https://shamela.ws/book/9472/582" },
  { label: "The method", note: "The passage stating that the disagreement about seclusion resembles the disagreement about marriage, and sorting the benefits into religious and worldly.", url: "https://shamela.ws/book/9472/586" },
  { label: "The benefits of seclusion", note: "The six benefits, from freeing oneself for worship and thought to escaping the sight of the tiresome.", url: "https://shamela.ws/book/9472/588" },
  { label: "The harms of seclusion", note: "The passage stating the harms as the seven goods of mixing, each named in both directions.", url: "https://shamela.ws/book/9472/596" },
  { label: "Learning and seclusion", note: "The passage ruling that one who needs to learn the obligatory is disobedient by seclusion, and sorting the remaining cases by capacity.", url: "https://shamela.ws/book/9472/596" },
  { label: "Forty-book structure", note: "Ghazali.org's listing places Book 16 as the sixth book of the Quarter of Customs and confirms its title.", url: "https://www.ghazali.org/listing-the-forty-books/" },
];

export const book16: SystemBook = {
  id: 16,
  title: "The Etiquette of Seclusion",
  shortTitle: "Seclusion",
  defaultJourneyId: "why-withdraw",
  chapters: book16Chapters,
  conceptNodes: book16ConceptNodes,
  journeys: book16Journeys,
  sources: book16Sources,
  taxonomy: {
    title: "A dispute, and a weighing",
    note: "Ghazali opens on a disagreement among the Successors with named authorities on both sides, and then borrows his method openly from the book on marriage: six benefits weighed against seven, answered for a person rather than in general.",
    groups: book16Movements,
  },
  instrument: book16Instrument,
  editorialNote: "The two journeys, ten reading sections, visual models, and diagnostic are editorial learning aids. The sections follow Ghazali's own order; the movements list splits his second chapter into its two halves, the benefits and the harms, which is how he himself divides it. The English is an original synthesis made from a reading of the public Arabic text, not a translation and not a substitute for one. Reports and inherited anecdotes are presented as material Ghazali transmitted; this prototype does not independently grade every narration. One matter of scope: much of this book consists of transmitted material on both sides of the question — verses, reports, and a large collection of sayings and stories from the early Muslims about withdrawal and about company — together with treatments of particular circumstances, such as what a person should do about attending congregational prayers and gatherings while withdrawn. This edition presents the structure of the argument, the two lists that the weighing runs on, and the passages where Ghazali's reasoning is distinctive, rather than reproducing that material. His ruling that one who has not learned what is obligatory is disobedient by seclusion is given as he gives it, together with the two cases he sorts after it; what counts as obligatory knowledge is the narrow thing Book 1 defines, and this edition notes that rather than leaving it open. Nothing here is advice about anyone's living arrangements. The diagnostic applies his own six and seven to a situation the reader supplies and cannot pronounce on it.",
};
