import { assetUrl } from "./assetUrl";
import type { Chapter, ConceptNode, VisualModel } from "./data";
import type { Instrument, Journey, SourceLink, SystemBook, TaxonomyGroup } from "./systemTypes";

type Seed = { id: number; shortTitle: string; formalTitle: string; overview: string; moves: Array<{ title: string; body: string }>; closer: Array<{ title: string; body: string }>; distinction: [string, string, string, string, string]; misreading: string; reflection: string; audit: string[]; nodes: string[]; model: VisualModel };
const bab = (id: number) => (id <= 5 ? "the first chapter, on what the solitary eater needs" : id === 6 ? "the second chapter, on eating in company" : id === 7 ? "the third chapter, on feeding visitors" : "the fourth chapter, on hospitality");
const makeChapter = (seed: Seed): Chapter => ({
  id: seed.id, shortTitle: seed.shortTitle, formalTitle: seed.formalTitle, overview: seed.overview,
  points: seed.moves.slice(0, 3).map((m) => m.body), reflection: seed.reflection, relatedNodes: seed.nodes, visualModel: seed.model,
  deep: { thesis: seed.moves[0].body, context: seed.overview, moves: seed.moves, closeReading: seed.closer,
    distinction: { title: seed.distinction[0], firstLabel: seed.distinction[1], first: seed.distinction[2], secondLabel: seed.distinction[3], second: seed.distinction[4] },
    misreading: seed.misreading, observation: seed.reflection, selfAudit: seed.audit,
    sourceAnchor: `Book 11, ${bab(seed.id)}, ${seed.formalTitle}.` },
});
const chain = (title: string, caption: string, items: Array<[string, string, "support" | "balance" | "warning"]>): VisualModel => ({ kind: "chain", title, caption, items: items.map(([label, body, role]) => ({ label, body, role })) });
const pair = (title: string, caption: string, items: Array<[string, string, "support" | "balance" | "warning"]>): VisualModel => ({ kind: "pair", title, caption, items: items.map(([label, body, role]) => ({ label, body, role })) });
const spectrum = (title: string, caption: string, items: Array<[string, string, "support" | "balance" | "warning"]>): VisualModel => ({ kind: "spectrum", title, caption, items: items.map(([label, body, role]) => ({ label, body, role })) });

export const book11Chapters: Chapter[] = [
  makeChapter({
    id: 1, shortTitle: "Four circles", formalTitle: "The shape of the book",
    overview: "The Quarter of Customs opens here, and its first book is organised by how many people are at the table.",
    moves: [
      { title: "Announce the four", body: "What the eater must observe even if he eats alone; what the manners add because of gathering together to eat; what is particular to setting food before visiting brethren; and what is particular to invitation and hospitality." },
      { title: "Note the principle", body: "Each chapter adds to the one before it rather than replacing it. The solitary eater's manners still hold in company; company adds seven more; hosting adds further; and a formal invitation adds a sequence of six." },
      { title: "Divide the first chapter", body: "It is three parts: what comes before eating, what belongs with the eating, and what belongs after finishing it. A meal is treated as having a beginning, a middle, and an end even when nobody else is present." },
      { title: "Note where the quarter has arrived", body: "Ten books of worship have just been arranged into a day. This quarter takes up what fills the rest of that day, and it begins with the most ordinary and most frequent thing a person does." },
    ],
    closer: [
      { title: "Why the ordering is by company", body: "It could have been by meal, or by food, or by time of day. Sorting by how many people are present makes every added manner a matter of what is owed to someone else, which is what the Quarter of Customs is about." },
      { title: "What the first chapter establishes", body: "That there is an etiquette of eating alone at all. Everything in the following three chapters is social, and placing a full chapter before them prevents the whole subject from collapsing into how to behave in front of others." },
    ],
    distinction: ["Two ways to organise an etiquette of eating", "By company", "Alone, together, hosting, invited — so that each addition is something owed to someone.", "By occasion", "Meals, foods, or times, which would leave the solitary case unexamined."],
    misreading: "Do not read the first chapter as a lesser case. It is the longest of the four and everything in it continues to apply in the other three.",
    reflection: "Notice that a quarter about ordinary life begins with the thing you do most often.",
    audit: ["Which circle am I usually in?", "Do I have manners when alone?", "What does each circle add?", "Why start the quarter here?"],
    nodes: ["akl", "structure", "adat"],
    model: chain("Four concentric circles", "Each adds to the one before it.", [["Alone", "Three parts: before, during, after.", "support"], ["In company", "Seven manners added by the gathering.", "support"], ["Feeding visitors", "What is owed to brethren who have come.", "support"], ["Hospitality", "Six places, from the invitation to the departure.", "support"]]),
  }),
  makeChapter({
    id: 2, shortTitle: "The root", formalTitle: "That the food be wholesome",
    overview: "The first manner of the first chapter, and it is not a manner at all — it is a condition on the food, stated as an obligation.",
    moves: [
      { title: "State it", body: "That the food, after being lawful in itself, be wholesome in the direction of its earning, agreeing with the practice and with scrupulousness — not acquired by a cause disliked in the Law, nor by the ruling of whim or of dissembling in religion." },
      { title: "Note the two conditions", body: "Lawful in itself, and wholesome in how it was got. The second is the one that requires looking backward past the food to the transaction that brought it, and it is where the manner does its work." },
      { title: "Give the argument from order", body: "God commanded the eating of the wholesome, which is the lawful — and He placed the prohibition of consuming wealth wrongfully before the prohibition of killing, to magnify the matter of the forbidden and to exalt the blessing of the lawful." },
      { title: "State the rank", body: "So the root in food is its being wholesome, and that is among the obligations and the foundations of religion." },
    ],
    closer: [
      { title: "The verse order as an argument", body: "Do not consume your wealth among yourselves wrongfully — and then, do not kill yourselves. Ghazali reads the sequence itself as carrying weight, which is an argument from arrangement rather than from statement, and he uses it to place a matter of diet among the foundations." },
      { title: "Why it opens a book of manners", body: "Everything else in the book concerns conduct at a table. This concerns what is on it, and placing it first means that no amount of correct conduct settles the question the first manner asks." },
    ],
    distinction: ["Two conditions on food", "Lawful in itself", "What the thing is, which is the ordinary question.", "Wholesome in its earning", "How it came to be yours, which requires looking past the food."],
    misreading: "Do not treat this as the strictest item on a list of manners. Ghazali places it among the obligations and the foundations of religion, which puts it in a different category from everything after it.",
    reflection: "Ask where your last meal came from, one step further back than you usually go.",
    audit: ["Is it lawful in itself?", "How was it earned?", "Have I looked past the food?", "Which category is this in?"],
    nodes: ["tayyib", "halal", "akl"],
    model: pair("Two questions about one plate", "Only the second requires looking backward.", [["What it is", "Lawful in itself, which is the ordinary question.", "balance"], ["How it came", "Wholesome in its earning, which is among the foundations.", "support"]]),
  }),
  makeChapter({
    id: 3, shortTitle: "Before", formalTitle: "The manners that come before eating",
    overview: "The remaining manners of the first part, and they are practical and brief — with a reason given for each rather than an instruction alone.",
    moves: [
      { title: "Give the second", body: "Washing the hand. Ablution before food removes poverty, and after it removes ailment." },
      { title: "Give the reason", body: "Because the hand is not free of soiling in the handling of work. A report and a practical reason are given together, which is the pattern of this chapter." },
      { title: "Note what else the part covers", body: "How the food is laid out, how you sit down to it, what you intend by it, and being content with what is there instead of wanting more." },
      { title: "Note the register", body: "These are ordinary instructions with ordinary reasons. The chapter does not moralise them, and its one weighty item was the first, which was about the food rather than the eater." },
    ],
    closer: [
      { title: "Why reasons are given", body: "A manner with a reason attached can be applied to a case the manner did not anticipate. The hand is not free of soiling in the handling of work — that reason survives changes in what work is and what a table looks like, and the instruction follows from it rather than standing alone." },
      { title: "What this edition does with the detail", body: "The manners are practical and complete in themselves, and some of them concern customs of a particular place and time. This section presents the shape of the part and its method; the instructions belong to the text." },
    ],
    distinction: ["Two ways to give a manner", "With its reason", "Which lets it be applied to cases it did not anticipate.", "As an instruction", "Which holds only for the case as described."],
    misreading: "Do not read the modesty of these items as meaning they are optional. They are manners rather than obligations, and the book is explicit that only the first item of the chapter belongs among the foundations.",
    reflection: "Notice that the reasons given are practical, and that this does not weaken them.",
    audit: ["Do I know the reason, or only the rule?", "Which of these do I keep?", "What has changed since these were written?", "Does the reason still hold?"],
    nodes: ["adab-akl", "akl", "structure"],
    model: pair("Two components of each manner", "The second is what makes it portable.", [["The instruction", "What to do, as described.", "balance"], ["The reason", "Why, which survives changes in the case.", "support"]]),
  }),
  makeChapter({
    id: 4, shortTitle: "During", formalTitle: "The manners of the eating itself",
    overview: "The second part, and among its small practical items are two that are unexpectedly wide.",
    moves: [
      { title: "Give the frame", body: "That he begin with the name of God at the start and praise at the end — and if he says the name with each morsel that is good, so that greed does not distract him from the remembrance of God." },
      { title: "Give the manner of taking", body: "That he eat with the right hand, make the morsel small, chew it well, and not extend his hand to another until he has swallowed — for that is haste in eating. And that he eat from what is nearest him, except fruit, in which he may range his hand." },
      { title: "Give the first wide one", body: "That he not disparage anything eaten. The Messenger did not fault any food: if it pleased him he ate it, and otherwise he left it." },
      { title: "Give the second", body: "That he say the name aloud, so that others are reminded — an instruction about the eater's effect on the table rather than about his own eating." },
    ],
    closer: [
      { title: "Why not disparaging is wide", body: "It is the one item in the part that concerns someone else entirely. Food was prepared by a person, and faulting it reaches them; the practice given is not praise but silence and a choice — if it pleased him he ate it, and otherwise he left it, which leaves nothing to be said either way." },
      { title: "The reason given for the name", body: "So that greed does not distract him from the remembrance of God. The instruction is not about marking a boundary at the start of a meal but about interrupting an absorption that the eating itself produces, which is why it is repeated with the morsels." },
    ],
    distinction: ["Two ways to receive a dish you dislike", "Leave it", "Which is the practice reported, and which says nothing about the food or the cook.", "Fault it", "Which the manner forbids, and which reaches the person who made it."],
    misreading: "Do not read the small morsel and the slow chewing as fastidiousness. The reason given is haste, and haste is what the whole part is arranged against.",
    reflection: "Notice how often a comment on food is really a comment on a person.",
    audit: ["Do I fault food?", "Am I hasty at a table?", "What does greed do to my attention?", "Whom does my comment reach?"],
    nodes: ["adab-akl", "dhikr", "akl"],
    model: chain("What the part is arranged against", "Every item slows something down.", [["The name", "Repeated, so that greed does not take the attention.", "support"], ["The small morsel", "Chewed, and swallowed before the hand moves again.", "support"], ["What is nearest", "Rather than ranging over the dish.", "balance"], ["No fault found", "Eaten if it pleased him, and otherwise left.", "support"]]),
  }),
  makeChapter({
    id: 5, shortTitle: "After", formalTitle: "What is recommended when the eating is done",
    overview: "The third part, and it opens on the item that the whole Quarter of Perils will later build on.",
    moves: [
      { title: "Give the first", body: "That he stop before satiety." },
      { title: "Give the practical items", body: "That he lick his fingers, then wipe them, then wash them; and that he pick up the crumbs of the food. Whoever eats what falls from the table lives in plenty and is kept well in his children." },
      { title: "Give the bowl", body: "That he clean the bowl and drink its water — with the reports gathered on what that is worth, and on the gathering of crumbs." },
      { title: "Give the last", body: "That he thank God in his heart for what He has fed him, so that he sees the food as a blessing from Him: eat of the good things We have provided you, and be thankful to God." },
    ],
    closer: [
      { title: "Where stopping before satiety leads", body: "It is one line here and it is the subject of a book: Book 23 on breaking the two desires treats the stomach at length, and Book 6 on fasting makes the reduction of food the mechanism of the whole practice. The manner in this chapter is the ordinary daily form of both." },
      { title: "The two ends of the part", body: "It begins with restraint and ends with thanks — stopping short of what is available, and then seeing what was taken as a gift. Neither is possible while a person is still eating, which is why they are the frame of the part rather than items within it." },
    ],
    distinction: ["Two things done at the end of a meal", "Stopping short", "Before satiety, which is where the fast and the discipline of the stomach both begin.", "Giving thanks", "Seeing what was taken as a blessing, which the eating itself makes hard."],
    misreading: "Do not read the gathering of crumbs as a rule about frugality alone. The reports attached to it concern provision and household, and the manner sits among items about care rather than among items about restraint.",
    reflection: "Ask when you last stopped eating while you still wanted more, and what you did in the minute after.",
    audit: ["Do I stop before satiety?", "What is the minute after a meal like?", "Do I see food as a blessing or as a fact?", "Where is this treated at length?"],
    nodes: ["shaba", "shukr", "adab-akl"],
    model: pair("The frame of the part", "Neither is possible while eating.", [["Stopping short", "Before satiety, which the Quarter of Perils builds on.", "support"], ["Thanks", "Seeing the food as a blessing from Him.", "support"]]),
  }),
  makeChapter({
    id: 6, shortTitle: "Seven more", formalTitle: "What eating in company adds",
    overview: "The second chapter, and everything in it is about deferring to someone else at a table.",
    moves: [
      { title: "Give the number", body: "What is added because of gathering and sharing in the eating is seven." },
      { title: "Give the first", body: "Do not start eating while somebody present has a better claim to start — by age, by learning, or by having provided the food." },
      { title: "Note what the seven concern", body: "Order, portion, pace, attention, and speech: who begins, how much is taken, how fast, what is looked at, and what is said. Each is a way of accounting for someone else being present." },
      { title: "Note what they do not add", body: "Nothing about the food, and nothing about the eater's own state. Both were settled in the first chapter, and this chapter adds only what the presence of another person requires." },
    ],
    closer: [
      { title: "Why the additions are all deferrals", body: "Every one of the seven gives something up: the first bite, the larger share, the faster pace, the free glance. A shared table is treated as a place where a person's own preferences are systematically postponed, and the manner is the postponement rather than any positive act." },
      { title: "The pace item", body: "Not extending the hand until the last morsel is swallowed was already a manner when alone, given for haste. In company it acquires a second reason, since pace at a shared dish determines what is left for others — the same instruction with an added ground." },
    ],
    distinction: ["Two ways company changes a meal", "By deferral", "Order, portion, pace, glance — each a preference postponed for someone present.", "By display", "Behaving well because one is seen, which no item in the seven concerns."],
    misreading: "Do not read the seven as replacing the first chapter's manners. They are additions, and the first chapter is explicit that its own manners hold whether or not anyone else is there.",
    reflection: "Notice that every one of the seven costs you something small and immediate.",
    audit: ["Who has the better claim to begin?", "What do I give up at a shared table?", "Am I deferring, or performing?", "Which of the seven do I fail?"],
    nodes: ["jamaa", "adab-akl", "ithar"],
    model: spectrum("Five things the seven govern", "Each is a preference postponed.", [["Order", "Who begins, by age, learning, or provision.", "support"], ["Portion", "What is taken from a shared dish.", "support"], ["Pace", "Which decides what is left for others.", "support"], ["Attention", "Where the eyes go at a shared table.", "balance"], ["Speech", "What is said, and about what.", "balance"]]),
  }),
  makeChapter({
    id: 7, shortTitle: "Setting it before them", formalTitle: "Feeding visiting brethren",
    overview: "The third chapter, and it treats the case that falls between eating together and formal hospitality: someone has come, and there is food.",
    moves: [
      { title: "Give the excellence", body: "Setting food before brethren has great merit, and the chapter gathers what is reported on it before giving the manners." },
      { title: "Name the case", body: "It is not an invitation. Someone has come and is present, and the food is what the household has — which is a different situation from one arranged in advance." },
      { title: "Give the governing manner", body: "That what is present be brought without delay and without apology, and that the host not withhold what he has while waiting for something better to be prepared." },
      { title: "Note what the chapter protects", body: "The visit. Everything that would improve the meal at the cost of the visit — the delay, the preparation, the excusing — is what the manners are arranged against." },
    ],
    closer: [
      { title: "Why this needs its own chapter", body: "Formal hospitality has a sequence and can be planned. An unannounced visit has no sequence, and the pressure it produces is entirely toward making the food better than it is — which is the pressure the next chapter names and forbids by name." },
      { title: "Its relation to the fourth chapter", body: "This chapter and the next treat the same virtue under different conditions, and both arrive at the same warning: what is brought should be what there is, and the effort spent improving it is charged against the guest." },
    ],
    distinction: ["Two responses to someone arriving", "Bring what is there", "Without delay and without apology, which the manners require.", "Improve it first", "Which delays the visit and makes the guest the occasion of trouble."],
    misreading: "Do not read the simplicity as indifference. The chapter opens on the great merit of setting food before brethren, and what it restrains is the improvement rather than the offering.",
    reflection: "Ask what you have apologised for while serving it.",
    audit: ["Do I bring what is there?", "How long do I make them wait?", "What do I apologise for?", "Is the visit or the meal the point?"],
    nodes: ["ikhwan", "diyafa", "adab-akl"],
    model: pair("Two things that can be served", "Only one of them keeps the visit.", [["What is present", "Brought at once, without apology.", "support"], ["What could be prepared", "Which costs the visit the time it takes.", "warning"]]),
  }),
  makeChapter({
    id: 8, shortTitle: "Six places", formalTitle: "The sequence of hospitality",
    overview: "The fourth chapter, and it sorts a social occasion into six moments, each with its own manners — including two that belong to the guest.",
    moves: [
      { title: "Give the six", body: "The places of the manners in hospitality are six: the invitation first, then the acceptance, then the attendance, then the presenting of the food, then the eating, then the departure." },
      { title: "Note whose they are", body: "The first and the fourth belong to the host; the second, third, and sixth belong to the guest; and the fifth belongs to both. The chapter divides the duties between the two parties by moment." },
      { title: "Note what the sixth adds", body: "Departure is given manners of its own. An occasion is not treated as finished when the eating stops, and how a guest leaves is part of what he owes." },
      { title: "Give the excellence", body: "“There is no good in someone who does not show hospitality.” The chapter gathers the reports on what it is worth before working through the six." },
    ],
    closer: [
      { title: "The two who did not and did", body: "The Messenger passed a man with many camels and cattle who did not host him, and passed a woman with a few sheep who slaughtered for him — and said: look at those two; these traits are in God's hand, and whoever He wishes to grant a good character, He does." },
      { title: "What the pairing establishes", body: "Hospitality is not a function of means. The one with much gave nothing and the one with little gave what she had, and the comment does not praise her thrift or blame his wealth — it locates the difference in a character that is given." },
    ],
    distinction: ["Two ways to divide the duties of an occasion", "By moment", "Six places, with the host and the guest each owing something at different points.", "By party", "Host duties and guest duties listed separately, which would lose the sequence."],
    misreading: "Do not read hospitality here as the host's business alone. Three of the six places belong to the guest, and one of them is how he leaves.",
    reflection: "Notice that the woman with a few sheep is the one held up, and that her means are not the reason.",
    audit: ["Which of the six am I bad at?", "Do I owe anything as a guest?", "How do I leave?", "Do I treat this as a function of means?"],
    nodes: ["diyafa", "dayf", "adab-akl"],
    model: chain("Six moments", "The duties alternate between the two parties.", [["The invitation", "The host's.", "support"], ["The acceptance", "The guest's.", "support"], ["The attendance", "The guest's.", "balance"], ["The presenting", "The host's.", "support"], ["The eating", "Both.", "balance"], ["The departure", "The guest's, and given manners of its own.", "support"]]),
  }),
  makeChapter({
    id: 9, shortTitle: "Do not burden yourselves", formalTitle: "The warning attached to hospitality",
    overview: "The hardest and most surprising thing in the book, and it is aimed at hosts who are trying too hard.",
    moves: [
      { title: "Give the instruction", body: "Do not burden yourselves for the guest, so that you come to dislike him." },
      { title: "Give the consequence", body: "Because anyone who resents the guest has resented God — and God resents whoever resents Him." },
      { title: "Trace the chain", body: "Excessive preparation produces resentment; resentment of a guest is resentment of God; and that is answered in kind. Three steps from an over-elaborate table to the severest thing in the book." },
      { title: "Note what is being protected", body: "Not the host's resources and not the guest's comfort. What the instruction protects is the host's feeling toward the person in his house, which the effort of hosting is capable of destroying." },
    ],
    closer: [
      { title: "Why the mechanism is worth naming", body: "Nobody sets out to resent a guest. The report identifies a specific and ordinary route by which it happens — the burden a host takes on himself — and locates the fault at the point where the burden is assumed rather than at the point where the feeling appears." },
      { title: "How it changes the whole chapter", body: "The other manners of hospitality tell a host what to do. This one tells him what not to add, and it is the only item in the book whose reason is a state of the host's heart rather than the guest's welfare or the food's quality." },
    ],
    distinction: ["Two ways to fail a guest", "By giving too little", "The plain failure, which the chapter's other reports address.", "By burdening yourself", "Which produces dislike, and which the report traces to its end."],
    misreading: "Do not read this as permission to be tight-fisted. It sits in a chapter that opens by saying there is no good in somebody who will not show hospitality. What it rules out is the strain, not the giving.",
    reflection: "Recall a time you were relieved when a guest left, and ask what you had taken on beforehand.",
    audit: ["What do I take on when someone comes?", "Have I been relieved when they left?", "Where does the fault sit, on this account?", "What am I protecting?"],
    nodes: ["takalluf", "diyafa", "dayf"],
    model: chain("Three steps", "The fault is at the first, not the third.", [["The burden", "Taken on by the host, and where the instruction intervenes.", "warning"], ["The dislike", "Of the guest, which the burden produces.", "warning"], ["The consequence", "Stated in the severest terms in the book.", "warning"]]),
  }),
  makeChapter({
    id: 10, shortTitle: "The quarter opens", formalTitle: "What this book begins",
    overview: "The first book of the Quarter of Customs closes, and what it has established governs the nine books that follow it.",
    moves: [
      { title: "Note where the quarter starts", body: "Not with an unusual case but with the most frequent act in a life, treated at the four levels of company at which it happens." },
      { title: "Note the method", body: "A condition on the thing itself, placed first and marked as belonging among the obligations; then manners with reasons attached; then additions for each degree of company; then a sequence for a formal occasion." },
      { title: "Note what recurs", body: "Two themes run through all four chapters: that what is present is enough, and that the presence of another person is what generates the additional duties. Both will govern the books on marriage, companionship, earning, and travel that follow." },
      { title: "Note the register", body: "The book moralises very little. Most of it is practical, with reasons given, and its two heaviest moments are a condition on the food and a warning to hosts about their own hearts." },
    ],
    closer: [
      { title: "The hinge from the previous quarter", body: "Book 10 arranged the acts of worship into the divisions of a day. This quarter takes up what fills the rest of it, and the transition is deliberate: the last book of one quarter builds a schedule, and the first book of the next begins filling the hours it did not claim." },
      { title: "What the quarter is for", body: "The books that follow treat eating, marriage, earning, companionship, travel, and the rest. None of them is an act of worship, and the claim of the quarter is that all of them have an inside — which is the same claim the Quarter of Worship made about acts that obviously did." },
    ],
    distinction: ["Two ways to treat ordinary life", "As having an inside", "Manners with reasons, conditions on the thing itself, and duties generated by company.", "As neutral", "Time between acts of worship, which would leave nine books of this quarter without a subject."],
    misreading: "Do not read the Quarter of Customs as a relaxation after the Quarter of Worship. Its first book places a condition on food among the obligations and the foundations of religion.",
    reflection: "Look at the hours Book 10's schedule did not claim, and ask what this quarter says about them.",
    audit: ["What fills my unclaimed hours?", "Do those hours have an inside?", "Which two themes will recur?", "What did this book place among the foundations?"],
    nodes: ["adat", "akl", "structure"],
    model: pair("Two quarters, one day", "The second begins where the first stopped claiming.", [["Worship", "Ten books, arranged into the divisions of a day.", "support"], ["Customs", "Ten books, filling the hours the schedule did not claim.", "support"]]),
  }),
];

export const book11ConceptNodes: ConceptNode[] = [
  ["akl", "Eating", "The most frequent act", "Treated at four levels of company, from alone to formal hospitality."],
  ["structure", "Four chapters", "Concentric", "Each adds to the one before rather than replacing it."],
  ["adat", "Customs", "A quarter with an inside", "Ordinary life treated as having manners, conditions, and duties."],
  ["tayyib", "Wholesome", "Among the foundations", "Not only lawful in itself but sound in how it was earned."],
  ["halal", "The lawful", "The ordinary question", "What the thing is, which the first manner asks past."],
  ["adab-akl", "The manners", "With reasons attached", "Which lets them be applied to cases they did not anticipate."],
  ["dhikr", "The name", "Repeated on purpose", "So that greed does not distract from the remembrance of God."],
  ["shaba", "Satiety", "Stopped short of", "One line here, and the subject of Books 6 and 23."],
  ["shukr", "Thanks", "The end of the meal", "Seeing what was taken as a blessing, which eating makes hard."],
  ["jamaa", "Company", "Seven additions", "Order, portion, pace, attention, and speech — each a deferral."],
  ["ithar", "Deferral", "What the seven are", "Every one gives up something small and immediate."],
  ["ikhwan", "Visiting brethren", "No sequence", "An unannounced visit, whose pressure is toward improving the food."],
  ["diyafa", "Hospitality", "Six places", "From the invitation to the departure, alternating between the parties."],
  ["dayf", "The guest", "Owes three of six", "Acceptance, attendance, and how he leaves."],
  ["takalluf", "Burdening yourself", "The named danger", "The route by which a host comes to dislike the person in his house."],
].map(([id, label, kicker, description], index) => ({ id, label, kicker, description, position: ["left", "right", "top", "bottom"][index % 4] }));

const node = (id: string, label: string, micro: string, summary: string, guardrail: string, chapterId: number, glyph: Journey["nodes"][number]["glyph"]): Journey["nodes"][number] => ({ id, label, micro, summary, guardrail, chapterId, glyph });

export const book11Journeys: Journey[] = [
  {
    id: "eating-alone", number: "01", question: "Is there an etiquette of eating alone?", title: "Take the chapter nobody watches",
    description: "Find the condition placed on the food before any manner of eating it, then work through a meal with a beginning, a middle, and an end — with nobody present.",
    payoff: "You get one item that belongs among the foundations, and two that the Quarter of Perils later builds on.",
    image: assetUrl("assets/system/book11-one-place.jpg"), imageAlt: "A single place set at a plain wooden table with a covered dish, a cup of water, and a folded cloth.", minutes: 11, color: "#278d91",
    nodes: [
      node("four-circles", "See the four circles", "Alone, together, visiting, invited", "Each chapter adds to the one before rather than replacing it.", "The first is the longest and holds throughout the rest.", 1, "order"),
      node("the-root", "Take the root", "Wholesome, not only lawful", "Sound in how it was earned, which requires looking past the food.", "Placed among the obligations and the foundations of religion.", 2, "know"),
      node("the-order", "Note the argument", "From an arrangement", "The prohibition on wrongful wealth placed before the prohibition on killing.", "An argument from sequence rather than from statement.", 2, "witness"),
      node("no-haste", "See what is resisted", "Haste", "Small morsel, chewed, swallowed before the hand moves again.", "Not fastidiousness — the reason given is haste.", 4, "clear"),
      node("no-fault", "Take the wide one", "Faulting nothing", "If it pleased him he ate it, and otherwise he left it.", "The one item in the part that reaches another person.", 4, "balance"),
      node("stop-short", "Note where it leads", "Before satiety", "One line here, and the subject of two later books.", "The frame of the part is restraint, then thanks.", 5, "steady"),
    ],
  },
  {
    id: "when-others-are-there", number: "02", question: "What changes when someone else is at the table?", title: "Count what you give up",
    description: "Take the seven manners company adds, find what they all have in common, and meet the case that falls between eating together and hosting.",
    payoff: "You see that every added duty is a preference postponed, and what an unannounced visit is actually for.",
    image: assetUrl("assets/system/book11-shared-dish.jpg"), imageAlt: "One wide dish between two place settings, with a single serving taken from the near side only.", minutes: 11, color: "#bf7a35",
    nodes: [
      node("seven", "Take the seven", "Order, portion, pace, glance, speech", "Each accounts for someone else being present.", "Additions, not replacements.", 6, "order"),
      node("who-begins", "Take the first", "A better claim", "By age, by learning, or by having provided it.", "The first bite is the first thing given up.", 6, "know"),
      node("all-deferrals", "Find what they share", "Every one costs something", "The first bite, the larger share, the faster pace, the free glance.", "Deferral, not display — none of them is about being seen.", 6, "diagnose"),
      node("the-visit", "Take the middle case", "Someone has come", "No invitation, no sequence, and food already in the house.", "The pressure is entirely toward improving it.", 7, "witness"),
      node("what-is-there", "Take the rule", "Bring what is present", "Without delay and without apology.", "What is being protected is the visit, not the meal.", 7, "clear"),
    ],
  },
  {
    id: "hosting", number: "03", question: "What does hosting actually require?", title: "Six moments, and one warning",
    description: "Divide an occasion into six places with duties on both sides, then meet the hardest thing in the book — which is aimed at hosts who are trying too hard.",
    payoff: "You leave with a warning whose mechanism you will recognise, and its fault located earlier than you expect.",
    image: assetUrl("assets/system/book11-the-burden.jpg"), imageAlt: "A table laid far more elaborately than its single guest's place requires, with more dishes than the setting can reach.", minutes: 11, color: "#c25f50",
    nodes: [
      node("six-places", "Take the six", "Invitation to departure", "The duties alternate between the host and the guest.", "Three of the six belong to the guest.", 8, "order"),
      node("the-departure", "Note the sixth", "Leaving has manners", "An occasion is not over when the eating stops.", "Which is part of what a guest owes.", 8, "balance"),
      node("two-hosts", "Take the pairing", "Many cattle, a few sheep", "The one with much gave nothing; the one with little slaughtered.", "The comment locates the difference in character, not means.", 8, "witness"),
      node("the-warning", "Take the warning", "Do not burden yourselves", "So that you come to dislike him.", "Aimed at hosts trying too hard, not at mean ones.", 9, "guard"),
      node("where-the-fault", "Locate the fault", "At the first step", "The burden is assumed before the feeling appears.", "Which is why the instruction intervenes there.", 9, "diagnose"),
      node("the-quarter", "See what opens", "A quarter with an inside", "Ordinary life given manners, conditions, and duties.", "Not a relaxation after the Quarter of Worship.", 10, "steady"),
    ],
  },
];

export const book11Movements: TaxonomyGroup[] = [
  ["bab1", "1. What the solitary eater needs", "A condition on the food, and then before, during, and after.", [1, 2, 3, 4, 5]],
  ["bab2", "2. What company adds", "Seven manners, each a preference postponed.", [6]],
  ["bab3", "3. Feeding visiting brethren", "The case with no sequence, where what is present is brought.", [7]],
  ["bab4", "4. Hospitality", "Six places, and the warning about burdening yourself.", [8, 9, 10]],
].map(([id, label, description, chapterIds], index) => ({ id, label, description, chapterIds, color: ["#bf7a35", "#278d91", "#c25f50", "#586fa8"][index % 4] })) as TaxonomyGroup[];

export const book11Instrument: Instrument = {
  title: "Which circle, and where it goes wrong",
  note: "Ghazali sorts the etiquette of eating by how many people are present — alone, in company, feeding someone who came, and a formal invitation — with each circle adding to the one before rather than replacing it. Answer for how you actually eat, not for a special occasion.",
  items: [
    {
      id: "meal", label: "How you usually eat", lede: "Ordinary meals, not the ones you would describe to someone",
      note: "The first question is his four chapters. The second is his own division of a meal into what comes before it, what belongs with it, and what belongs after — with a fourth option for the thing he places first and marks as belonging to a different category from everything else in the book.",
      axes: [
        {
          id: "circle", kicker: "The four circles", question: "Which situation are you usually in?",
          options: [
            { id: "alone", label: "Eating alone", note: "The first chapter, which is the longest and holds throughout the other three." },
            { id: "company", label: "At a table with others", note: "The second, which adds seven manners on top of the first." },
            { id: "visitors", label: "Feeding people who have come by", note: "The third: no invitation, no sequence, and food already in the house." },
            { id: "hosting", label: "Hosting an occasion I arranged", note: "The fourth, which has six places from the invitation to the departure." },
          ],
        },
        {
          id: "where", kicker: "The parts of a meal", question: "Where does it go wrong for you?",
          options: [
            { id: "source", label: "I could not say where the food came from", note: "The first manner of the book, and the only item placed among the obligations." },
            { id: "during", label: "The eating itself — pace, attention, what I say", note: "The second part, which is arranged entirely against haste." },
            { id: "after", label: "The end — I eat past full", note: "The third part, whose first item is stopping before satiety." },
            { id: "fine", label: "Nothing obvious goes wrong", note: "In which case the circle you are in decides what to look at." },
          ],
        },
      ],
      verdicts: [
        { key: "*|source", name: "The one item in a different category", role: "warning", chapterId: 2, body: "Ghazali puts this first and marks it apart from everything else in the book: that the food, after being lawful in itself, be wholesome in the direction of its earning. And then — the root in food is its being wholesome, and that is among the obligations and the foundations of religion. Nothing else in four chapters of manners is described that way.", action: "His argument for the weight is from an arrangement rather than a statement: God placed the prohibition on consuming wealth wrongfully before the prohibition on killing, to magnify the matter of the forbidden and exalt the blessing of the lawful. The question is one step further back than the food — not what it is, but how it came to be yours." },
        { key: "hosting|fine", name: "Then check the sixth place, and the warning", role: "balance", chapterId: 9, body: "Hosting is the only circle with a sequence — invitation, acceptance, attendance, presenting, eating, departure — and three of those six belong to the guest rather than to you. But the item most likely to be missed by a host who thinks nothing is going wrong is the warning: do not burden yourselves for the guest, so that you come to dislike him.", action: "Its mechanism is worth checking honestly, because nobody sets out to resent a guest. The report locates the fault at the point the burden is assumed, not at the point the feeling appears — so the test is what you take on beforehand, and whether you have ever been relieved when someone left." },
        { key: "hosting|*", name: "Six places, and two parties", role: "balance", chapterId: 8, body: "Your circle has the most structure of the four. The manners divide by moment rather than by person: the invitation and the presenting are yours, the acceptance and the attendance and the departure are the guest's, and the eating belongs to both.", action: "And hold the pairing the chapter gives: a man with many camels and cattle who did not host, and a woman with a few sheep who slaughtered — with the comment that these traits are in God's hand. Hospitality is not treated as a function of means, which cuts both ways for a host who is measuring his by them." },
        { key: "visitors|*", name: "What is present, without apology", role: "support", chapterId: 7, body: "Your circle is the one with no sequence: someone has come, the food is what the house has, and the whole pressure of the situation is toward making it better than it is. The chapter's manners are arranged against exactly that — bring what is present, without delay and without apology.", action: "What is being protected is the visit rather than the meal. Every improvement costs the time it takes, and the apology tells the guest that what he is receiving is inadequate. Note also that the chapter opens on the great merit of setting food before brethren, so what is restrained is the improving and never the offering." },
        { key: "*|after", name: "Stopping before satiety", role: "warning", chapterId: 5, body: "This is the first item of the third part, given in a single line here — and it is the subject of two other books. Book 23 treats the stomach at length as one of the two desires that have to be broken, and Book 6 makes the reduction of food the mechanism of the entire fast.", action: "The part is framed by two things that are impossible while still eating: stopping short of what is available, and then thanking God in the heart and seeing the food as a blessing. If the end of the meal is where it goes wrong, the second of those is the one that has no chance — the minute after a meal is where it would happen." },
        { key: "*|during", name: "The part arranged against haste", role: "balance", chapterId: 4, body: "Every item in the second part slows something down: the name repeated with the morsels so that greed does not take the attention, the small morsel chewed and swallowed before the hand moves again, and eating from what is nearest rather than ranging over the dish. Ghazali's own word for the fault is haste.", action: "And check the one item that is not about you: that he not disparage anything eaten — the Messenger did not fault any food; if it pleased him he ate it, and otherwise he left it. A comment on food is very often a comment on the person who made it, and the practice reported leaves nothing to be said either way." },
        { key: "company|fine", name: "Then count what you give up", role: "balance", chapterId: 6, body: "Company adds seven manners, and they share a shape that is easy to miss: every one of them is a preference postponed. The first bite goes to whoever has the better claim by age, learning, or having provided the food; the portion, the pace, the glance, and the speech are each governed by someone else being present.", action: "The useful question is not whether you behave well at a shared table but what it costs you. If nothing is being given up, the seven are not being kept — and note that none of them concerns being seen, which is what separates deferral from display." },
        { key: "*|*", name: "Read the circle with the part", role: "balance", chapterId: 1, body: "A situation, and a place where it goes wrong. Ghazali's four chapters are concentric — the solitary manners hold in company, and the company manners hold when hosting — so a fault in the innermost circle travels outward into all the others.", action: "Take the part first, since it is likely to be the same in every circle, and then the circle for what it adds. And note where his own weight falls: two items in the whole book are treated as heavier than manners, and they are the condition on the food and the warning to hosts about their own hearts." },
      ],
    },
  ],
};

export const book11Sources: SourceLink[] = [
  { label: "Primary Arabic text", note: "The complete public Arabic of Book 11 was read and used to establish the four chapters, the three parts of a solitary meal, the seven additions of company, and the six places of hospitality.", url: "https://shamela.ws/book/9472/362" },
  { label: "What the solitary eater needs", note: "The chapter dividing a meal into before, during, and after, and opening with the condition that the food be wholesome in the direction of its earning.", url: "https://shamela.ws/book/9472/363" },
  { label: "What company adds", note: "The chapter giving the seven manners that the gathering and sharing of a meal add to those of the solitary eater.", url: "https://shamela.ws/book/9472/367" },
  { label: "Feeding visiting brethren", note: "The chapter on setting food before brethren who have come, and the merit reported for it.", url: "https://shamela.ws/book/9472/368" },
  { label: "The manners of hospitality", note: "The chapter dividing hospitality into six places and carrying the warning against burdening oneself for a guest.", url: "https://shamela.ws/book/9472/372" },
  { label: "Forty-book structure", note: "Ghazali.org's listing places Book 11 as the first book of the Quarter of Customs and confirms its title.", url: "https://www.ghazali.org/listing-the-forty-books/" },
];

export const book11: SystemBook = {
  id: 11,
  title: "The Etiquette of Eating",
  shortTitle: "Eating",
  defaultJourneyId: "eating-alone",
  chapters: book11Chapters,
  conceptNodes: book11ConceptNodes,
  journeys: book11Journeys,
  sources: book11Sources,
  taxonomy: {
    title: "Four chapters, four circles",
    note: "Ghazali's own four, sorted by how many people are present. They are concentric rather than parallel: the solitary manners hold in company, the company manners hold when hosting, and each chapter adds only what the new situation requires.",
    groups: book11Movements,
  },
  instrument: book11Instrument,
  editorialNote: "The three journeys, ten reading sections, visual models, and diagnostic are editorial learning aids. The first nine sections follow Ghazali's four chapters in his order; the tenth is editorial and looks at what this book opens for the Quarter of Customs, and the movements list places it with the fourth chapter. The English is an original synthesis made from a reading of the public Arabic text, not a translation and not a substitute for one. Reports and inherited anecdotes are presented as material Ghazali transmitted; this prototype does not independently grade every narration, and the printed Arabic carries the graders' notes alongside several used here. One matter of scope: most of this book is practical instruction — how the hands are washed, how a person sits, what is said, how a dish is shared, and the detail of each of the six places of hospitality — and a good deal of it describes the customs of a particular time and place. This edition presents the structure of each chapter, the reasons Ghazali attaches to the manners, and the two items he marks as weightier than manners; it does not reproduce the instructions themselves. Where a manner is given with a reason, the reason is what carries across circumstances, and that is how these sections treat them. The condition that food be wholesome in the direction of its earning is a substantive matter of law and conscience, not an etiquette, and Ghazali says so; this edition reports his placement of it and refers the question of what makes an earning lawful to Book 14, where he treats it. The diagnostic applies his four circles and his three parts of a meal to how a reader says he actually eats, and cannot pronounce on anyone's state.",
};
