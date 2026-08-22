import { assetUrl } from "./assetUrl";
import type { Chapter, ConceptNode, VisualModel } from "./data";
import type { Instrument, Journey, SourceLink, SystemBook, TaxonomyGroup } from "./systemTypes";

type Seed = { id: number; shortTitle: string; formalTitle: string; overview: string; moves: Array<{ title: string; body: string }>; closer: Array<{ title: string; body: string }>; distinction: [string, string, string, string, string]; misreading: string; reflection: string; audit: string[]; nodes: string[]; model: VisualModel };
const part = (id: number) => (id <= 7 ? "the opening, on the levels of purity" : id <= 11 ? "the first division, purity from filth" : "the remaining divisions of outward purity");
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
    id: 1, shortTitle: "A stretch", formalTitle: "What the texts on cleanliness actually claim",
    overview: "The book opens by piling up the strongest statements about washing the body it can find — and then uses them to argue about something else entirely.",
    moves: [
      { title: "Start with the texts", body: "Religion is built on cleanliness. The key to prayer is purification. Purification is half of faith. In it are men who love to purify themselves, and God loves those who purify themselves. God does not want to make things hard for you, but wants to purify you." },
      { title: "Draw the conclusion", body: "Anyone paying attention, Ghazali says, reads all that and concludes that the thing that matters most is cleaning the inside." },
      { title: "Say why", body: "Because it would be a stretch to think \"purification is half of faith\" means tidying up your outside by pouring water over it while the inside stays wrecked and packed with filth." },
      { title: "Notice what he just did", body: "He did not soften the texts to make room for his point. He collected them at full strength first, then asked what a careful reader would actually take them to mean. The conclusion arrives as a reading of the evidence rather than an exception to it." },
    ],
    closer: [
      { title: "Why he stacks them first", body: "If you want to argue that washing is not the whole of purity, the weak move is to play down the texts about washing. Ghazali does the opposite. He makes the outward case as strong as it can be made, and only then points out that the same texts, read carefully, do not stop at the body." },
      { title: "Two kinds of cleaning, from the first paragraph", body: "His opening praise gives each one its own agent: God appointed water — light, fine, subtle — for washing the outside, and poured His own light into hearts for cleaning the inside. Two jobs, two tools, named before the argument even starts." },
    ],
    distinction: ["Two ways to read \"half of faith\"", "The whole system", "Clearing is half the work at every level, from the body up to the innermost self.", "Water only", "Wash the body and leave the rest — which Ghazali calls a stretch."],
    misreading: "This is not a put-down of physical cleanliness. Almost the entire book that follows is about physical cleanliness in fine detail. The opening is deciding where it sits, not whether it counts.",
    reflection: "Notice that the person gathering the strongest texts about water is about to argue they were never only about water.",
    audit: ["What have I assumed these texts meant?", "Which kind of cleaning do I actually work at?", "Is my inside packed while my outside is spotless?", "Does the body matter less here, or just differently?"],
    nodes: ["tahara", "nazafa", "sirr"],
    model: pair("Two kinds of cleaning, two tools", "Both named in the book's opening lines.", [["Water", "Fine and subtle; given for the outside.", "support"], ["Light", "Poured into hearts; given for the inside.", "support"]]),
  }),
  makeChapter({
    id: 2, shortTitle: "Four levels", formalTitle: "The four levels of purity",
    overview: "The passage this book is remembered for. Four levels, each one cleaning something different, and the last one named for the people who reach it rather than for the job.",
    moves: [
      { title: "First: the body", body: "Cleaning the body — of ritual impurity, of filth, and of what the body itself produces. This is the level the rest of the book covers in technical detail, and it is the only one it covers." },
      { title: "Second: what you do", body: "Cleaning your limbs of wrongdoing and sin. Not what your body has on it, but what your hands, tongue, eyes and feet have been doing with themselves." },
      { title: "Third: what you are like", body: "Cleaning the heart of bad character and the traits that make a person hard to be near — the anger, envy, pride and greed that the Quarter of Perils spends ten books on." },
      { title: "Fourth: what you are full of", body: "Clearing the innermost self of everything that is not God. Ghazali does not describe this one as a task. He describes it as \"the purity of the prophets and of the truthful\" — naming who has it rather than telling you how to get it." },
    ],
    closer: [
      { title: "This is the table of contents for the Ihya", body: "The four levels are the whole forty-book work in miniature. The body is this quarter. What you do is the Quarter of Customs. What you are like is the Quarter of Perils. What fills you is where the Quarter of Deliverance arrives. He lays out the plan in book three of forty and then spends the other thirty-seven executing it." },
      { title: "Why the fourth is described differently", body: "The first three are named by what gets removed, and each comes with something to do. The fourth is named by who has it. That shift is deliberate — it marks the difference between work you can be set and a condition you arrive at." },
    ],
    distinction: ["Two ways to describe a scale", "By what you remove", "Impurity, sin, bad character — the first three, each with a job attached.", "By who has it", "The prophets and the truthful — a description of people, not an exercise."],
    misreading: "Do not read the four as stages you finish one at a time. The next two sections show they are nested, not sequential — you work at several of them at once.",
    reflection: "Work out honestly which of the four your own idea of \"being clean\" actually refers to.",
    audit: ["Which level do I mean when I say clean?", "Which of the four had I never thought of as purity?", "What is being removed at my level?", "Where does the Ihya deal with each one?"],
    nodes: ["maratib", "tahara", "sirr"],
    model: spectrum("Four levels", "The first three name what comes off; the fourth names who has it.", [["The body", "Ritual impurity, filth, what the body produces.", "balance"], ["What you do", "Wrongdoing and sin.", "balance"], ["What you are like", "Bad character and the traits that spoil a person.", "support"], ["What fills you", "Everything that is not God; the purity of prophets.", "support"]]),
  }),
  makeChapter({
    id: 3, shortTitle: "No shortcuts", formalTitle: "Why you cannot skip a level",
    overview: "Having listed the four, Ghazali immediately says they are stacked — and that people who want the top one without the ones underneath have misunderstood what they are asking for.",
    moves: [
      { title: "Give the chain, top down", body: "Nobody reaches the fourth level while the heart is still full of bad character and empty of good. And nobody reaches that while the limbs are still doing what they were told not to and skipping what they were told to do. Each level rests on the one below it." },
      { title: "State the cost", body: "\"The more valuable and noble the goal, the harder the path to it, the longer the road, and the more obstacles there are.\" So, he says, do not imagine this gets picked up casually." },
      { title: "Name who gets it wrong", body: "Someone whose sight cannot make out the difference between these levels understands nothing of purity except the last one — the outer rind, compared with the kernel that was actually wanted." },
      { title: "Show what that person does", body: "So he burrows into it. He works through every detail of it, and spends all his time on washing, laundering, scrubbing the outside and hunting for plentiful running water, convinced that this is the whole of what was being asked for." },
    ],
    closer: [
      { title: "Rind and kernel", body: "The image does the argument's work in three words. A rind is not a fake or a waste — you cannot have the fruit without it, and Ghazali spends most of this book on it. But someone who eats only rind and thinks he has had the fruit has made a specific, identifiable mistake, and it is not laziness. It is misidentification." },
      { title: "Why the effort is not the point", body: "Notice that the person he describes is working extremely hard. He is not slack; he is meticulous. That is what makes the diagnosis uncomfortable, and it is why the next section treats obsessiveness about washing as evidence of a problem rather than evidence of seriousness." },
    ],
    distinction: ["Two reasons someone stops at the body", "He cannot see the levels", "So the outermost one looks like the whole of it, and he pours all his effort in.", "He knows and is starting there", "Which is what this book is for, and Ghazali gives it in fine detail."],
    misreading: "The point is not that the outer level is worthless. It is that mistaking it for the whole thing is a failure of sight, and no amount of extra care at that level corrects it.",
    reflection: "Ask what you would still be doing about cleanliness if nobody could see you and nothing showed.",
    audit: ["Can I tell the four apart in my own life?", "Which level absorbs most of my effort?", "Am I meticulous about the easiest one?", "Rind or kernel?"],
    nodes: ["maratib", "waswas", "zahir"],
    model: chain("Each level rests on the one below", "Ghazali runs it downward from the top.", [["Clearing the innermost", "Impossible while the heart is uncleaned.", "balance"], ["Cleaning the heart", "Impossible while the limbs are still misused.", "balance"], ["Cleaning what you do", "The level the Quarter of Customs works on.", "support"], ["Cleaning the body", "The rind — necessary, and not the fruit.", "support"]]),
  }),
  makeChapter({
    id: 4, shortTitle: "Half of it", formalTitle: "Why clearing is half the work at every level",
    overview: "This is the idea that turns a list of four into a working system. One well-known line about faith is read as describing the same shape at all four levels.",
    moves: [
      { title: "State it", body: "Clearing away what should not be there is half the work at every level — not just at the level of water and ablution. That is how Ghazali reads \"purification is half of faith.\"" },
      { title: "Try it on the heart", body: "The most you can do for a heart is fill it with good character and sound belief. But it will not take on those things until the opposites have been cleaned out — the corrupt beliefs, the traits people find repellent. So clearing is one half, and it is the half that comes first." },
      { title: "Say what kind of first", body: "First as in required for the other, not first as in finish this before you start that. It is a condition, not a queue. That distinction is why the four levels do not have to be completed in order." },
      { title: "Try it on the top level", body: "At the fourth, the principle stops being about order and becomes about room. Knowledge of God will not settle into the innermost self while something else is still sitting there, \"because the two do not gather in one heart.\" There is one space, and it is occupied or it is not." },
    ],
    closer: [
      { title: "Why this matters practically", body: "It explains a common experience: doing more good things and feeling no different. On Ghazali's account that is not a reason to try harder at the filling. It is a signal that something is still occupying the space, and the useful question becomes what." },
      { title: "The two verses he reaches for", body: "\"Say: God — then leave them to their games.\" And \"God has not put two hearts inside any man.\" He is not being poetic. He is making a claim about capacity: the reason clearing is required is that there is nowhere for the second thing to go until the first has moved." },
    ],
    distinction: ["Two halves at every level", "Clearing out", "Removing what should not be there. Required before the other half can hold.", "Filling up", "Building what should be there. Will not take while the opposite is still in place."],
    misreading: "This does not mean stop doing good until you are clean. A condition is not a sequence, and the Ihya prescribes practice to people it also says have work to do inside.",
    reflection: "Pick one level and ask which half your effort has actually been going into.",
    audit: ["Am I clearing or filling?", "At which level?", "What is still occupying the space?", "Have I read a condition as a queue?"],
    nodes: ["shatran", "maratib", "qalb"],
    model: pair("The same shape at all four levels", "The first half is what makes the second possible.", [["Clear it out", "Remove what should not be there.", "support"], ["Fill it up", "Build what should be — but not while the opposite sits there.", "support"]]),
  }),
  makeChapter({
    id: 5, shortTitle: "Calling fussiness cleanliness", formalTitle: "When being clean becomes the problem",
    overview: "The sharpest passage in the book, and the one most likely to sting. Ghazali describes people who are scrupulous about washing and rotten inside — and says nobody around them finds this strange.",
    moves: [
      { title: "Give the line", body: "\"The turn has now come to a group who call fussiness cleanliness,\" he writes, \"and say it is the foundation of religion.\"" },
      { title: "Describe what they do", body: "Most of their time goes on decorating their outsides — he compares it to a hairdresser working on a bride — \"while the inside is a ruin, stuffed with the filth of pride, self-satisfaction, ignorance, showing off and hypocrisy.\"" },
      { title: "Deliver the sting", body: "\"And they do not find that strange, and it does not astonish them.\" The problem is not only the imbalance. It is that the imbalance has stopped being visible to anyone involved." },
      { title: "Show the double standard", body: "But let someone use only stones to clean himself, or walk barefoot, or pray on bare ground or on the mosque matting without his own prayer rug — and that will be found strange immediately. The scrutiny is entirely one-directional." },
    ],
    closer: [
      { title: "What makes this different from ordinary moralising", body: "Ghazali is not telling anyone to be dirty, and he is not saying cleanliness is a vice. He is pointing at a specific social mechanism: one kind of failure has become highly visible and slightly shameful, and another kind has become invisible — and the second kind is the one his four levels rank as far more serious." },
      { title: "Why obsessiveness is a symptom here", body: "Earlier he traced excessive washing to a specific cause: scruple, plus a mind that has convinced itself this is the whole of what was asked. That makes fastidiousness diagnostic rather than admirable. It is evidence that the levels have collapsed into one, and the one left standing is the outermost." },
    ],
    distinction: ["Two things that get noticed", "Someone relaxed about washing", "Noticed at once, and quietly judged.", "Someone full of pride and hypocrisy", "Not noticed, not thought strange, not remarked on."],
    misreading: "This is not permission to be careless. Ghazali wrote a whole book of detailed washing instructions and meant them. He is attacking a ranking, not a practice.",
    reflection: "Ask which of your habits would draw comment if you dropped them, and whether those are the ones that matter most.",
    audit: ["What would people notice if I stopped?", "What would nobody notice?", "Which list is longer?", "Do I find the imbalance strange?"],
    nodes: ["waswas", "riya", "nazafa"],
    model: pair("One kind of failure is visible", "Ghazali's complaint is about which one gets remarked on.", [["Relaxed about washing", "Noticed immediately; found strange.", "warning"], ["Full of pride and showing off", "Not noticed; nobody is astonished.", "warning"]]),
  }),
  makeChapter({
    id: 6, shortTitle: "How they actually lived", formalTitle: "The early generations, and when cleanliness counts for you",
    overview: "Ghazali backs the previous section with specifics about how the first Muslims behaved, then gives a three-way test for when attention to cleanliness is good, neutral, or actually a fault.",
    moves: [
      { title: "Give the examples", body: "Umar, for all his standing, made ablution from water in a Christian woman's jar. They did not wash grease off their hands — they wiped their fingers on the soles of their feet. Abu Hurayra: \"We would be eating roast meat, the prayer would be called, so we would dig our fingers into the gravel, rub them in the dirt, and say the takbir.\"" },
      { title: "Give the striking one", body: "\"It was never once recorded that any of them asked a question about the fine points of impurity.\" Not that they answered such questions leniently — that the questions do not appear at all." },
      { title: "Give the three-way test", body: "Taken on its own, attention to cleanliness is simply permitted: you are dealing with your own body, clothes and property, so long as there is no waste. What changes it is what attaches to it." },
      { title: "Name the two things that spoil it", body: "It becomes a fault if you make it the foundation of religion and start looking down on people who are relaxed about it — the way the early generations were. And it becomes a fault if the point is to look good to other people, which is simply showing off." },
    ],
    closer: [
      { title: "And when it counts in your favour", body: "It becomes genuinely good, he says, when the intention is the good of the thing rather than appearance; when you do not condemn anyone who skips it; when you do not let it push the prayer past the start of its time; and when it does not take you away from something better, or from learning. Meet those and an ordinary act of washing becomes an act of worship." },
      { title: "Note the shape of the test", body: "Every one of the four conditions is about something other than the washing itself — your opinion of other people, your timing, your priorities, your motive. That is consistent with the whole book: the physical act is settled and easy, and everything difficult about it is attached to it rather than in it." },
    ],
    distinction: ["The same act, three verdicts", "Good", "Done for its own sake, without contempt for others, without crowding out prayer or learning.", "A fault", "Treated as the foundation of religion, or done to be seen."],
    misreading: "Do not turn the examples into a rule that being casual is holier. Ghazali reports them to show the early community's sense of proportion, not to prescribe gravel.",
    reflection: "Run your own habits through his four conditions and see which one is the first to fail.",
    audit: ["Do I look down on people looser than me?", "Has this ever delayed a prayer?", "Is any of it for other people to see?", "What is it taking time away from?"],
    nodes: ["salaf", "riya", "nazafa"],
    model: chain("Four conditions that make it count", "All four are about something other than the washing.", [["For its own sake", "Not to be seen by anyone.", "support"], ["No contempt", "You do not condemn people who skip it.", "support"], ["Not delaying prayer", "It never pushes the prayer late.", "balance"], ["Not crowding out better", "It does not displace learning or anything worthier.", "balance"]]),
  }),
  makeChapter({
    id: 7, shortTitle: "What this book covers", formalTitle: "The scope Ghazali declares, and why",
    overview: "One of the franker authorial asides in the Ihya. Having set out four levels, he tells you which one this book is about and why the others are missing.",
    moves: [
      { title: "Declare it", body: "This book deals only with the first level — physical cleanliness. He says so directly rather than letting you work it out." },
      { title: "Give the reason", body: "Because the first half of the Ihya is deliberately about outward things. The limit comes from where the book sits in the larger work, not from a judgement that the other levels matter less." },
      { title: "Split what remains", body: "Physical purity then divides three ways: from filth, from ritual impurity, and from what the body itself produces — nails, hair and the rest." },
      { title: "Note what the declaration buys", body: "You have just been told this book's subject is the lowest of four levels, and that it is the only one here. Everything technical after this point gets read inside that frame instead of standing on its own." },
    ],
    closer: [
      { title: "Why saying it out loud matters", body: "A book that laid out four levels and then quietly spent two hundred pages on the first would leave you wondering whether the other three had been forgotten. Naming the limit turns the remainder from an omission into a deliberate choice, and tells you where to find the rest." },
      { title: "The third division", body: "Cleaning what the body produces gets the least space and closes the book — nails, hair, and so on. It is there because the first level was defined to include it. Small thing, but it shows the method: the scheme is set first, then honoured even where it is dull." },
    ],
    distinction: ["Two ways a book can be narrow", "Declared", "The limit named, with the reason, and the rest located elsewhere.", "Undeclared", "The same pages, leaving you to guess whether something was dropped."],
    misreading: "This is not an apology. Ghazali treats the first level at length and with real care, and naming it is about placing it, not excusing it.",
    reflection: "Notice how differently technical instructions read once you know exactly what they are a part of.",
    audit: ["Do I know which part of the scheme I am in?", "What has been deliberately left out?", "Where is the rest handled?", "Have I mistaken a scope note for an apology?"],
    nodes: ["maratib", "zahir", "structure"],
    model: chain("Three divisions of the first level", "Set out immediately after the scope is named.", [["From filth", "What it is, what removes it, and how.", "support"], ["From ritual impurity", "Ablution and the full wash.", "support"], ["From the body's own products", "Nails, hair, and the rest.", "balance"]]),
  }),
  makeChapter({
    id: 8, shortTitle: "What is removed", formalTitle: "The substances that purity is from",
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
    id: 9, shortTitle: "Mecca and Medina", formalTitle: "Against strictness about water",
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
    id: 10, shortTitle: "By what, and how", formalTitle: "What removes impurity and the manner of removal",
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
    id: 11, shortTitle: "Out of sight", formalTitle: "The etiquette of relieving oneself",
    overview: "A short chapter of practical manners, and its opening instruction sets the register for the whole: the concern is other people before it is anything else.",
    moves: [
      { title: "The first instruction", body: "He should go far from the eyes of those who might look, when in open country, and should screen himself with something if he finds it." },
      { title: "Note what comes first", body: "The chapter's opening concern is being seen, which places the etiquette in the domain of how a person is among others rather than in the domain of ritual validity." },
      { title: "What the chapter covers", body: "It runs through the manners of the occasion in practical detail — where to go, how to be screened, what to say, and how to conduct oneself — and none of it is ritually required in the way the preceding material is." },
      { title: "Why it is in a book on purification", body: "Because the first level was defined as the body, and that covers how a body is handled, not just whether it ends up clean. The scope he declared in section 7 is being honoured." },
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
    id: 12, shortTitle: "Ablution", formalTitle: "The manner of ablution and its excellence",
    overview: "The second of the three outward purities, treated first as a procedure and then for what is reported of its worth.",
    moves: [
      { title: "Give the procedure", body: "The chapter sets out the manner of ablution in order, part by part, including the reaching of water to the roots of the hair at the four places — the eyebrows, the moustache, the eyelashes, and the rest." },
      { title: "Note the level of detail", body: "The detail here is finer than anything else in the book, down to the corner of the forehead. That is a fair measure of how much of this level's technical weight sits in ablution." },
      { title: "Give the excellence", body: "A separate section gathers what is reported on the excellence of ablution, after the procedure rather than before it." },
      { title: "Note the order", body: "Procedure first and merit second is the reverse of the order used everywhere else in the Ihya, where the excellence of a thing is gathered before it is defined." },
    ],
    closer: [
      { title: "Why the order is reversed here", body: "Elsewhere the testimony establishes that something is worth examining. Here nobody doubts it, and what a reader needs is the act itself; the merit is added afterward as encouragement to do properly what he now knows how to do." },
      { title: "How this connects to the opening", body: "Ablution is the clearest case of what the opening warned about: a physical act, exactly specified, easy to get right — and perfectly possible to perform flawlessly while your character is untouched. The frame set in sections 1 to 7 earns its keep most where the detail is finest." },
    ],
    distinction: ["Two orders of presentation", "Procedure, then merit", "Used here, where nobody doubts the act's worth and needs to know how it is done.", "Merit, then definition", "Used throughout the rest of the Ihya, where the testimony has to establish that the subject repays study."],
    misreading: "Do not read the fineness of the detail as the book contradicting its own opening. The opening said the outward is one rank of four, not that it should be done carelessly.",
    reflection: "Notice that this is the easiest rank to perfect, and ask what that does to a person who perfects it.",
    audit: ["Which rank am I most exact about?", "Why that one?", "Does exactness here reach anywhere else?", "What does the opening say about this?"],
    nodes: ["wudu", "zahir", "maratib"],
    model: pair("The order in this chapter", "Reversed from the rest of the Ihya, and for a reason.", [["Procedure", "Given first, in the finest detail in the book.", "support"], ["Excellence", "Gathered after, as encouragement rather than as justification.", "balance"]]),
  }),
  makeChapter({
    id: 13, shortTitle: "Bathing", formalTitle: "The manner of the full washing",
    overview: "The completion of the second outward purity, treated in the same procedural register as the chapter before it.",
    moves: [
      { title: "Give the procedure", body: "The chapter sets out the manner of the full washing, in the same order-by-part method used for ablution." },
      { title: "Note its place", body: "It completes purity from ritual impurity, which is the second of the three divisions of outward purity named when the scope was declared." },
      { title: "Note what remains", body: "One division remains after it — purity from the body's excesses — which is the third and shortest, and which closes the book." },
      { title: "Observe the shape", body: "So the book narrows steadily: four levels, then one level, then three divisions of it, then the parts of each. Nothing else in the Quarter of Worship is nested this tightly." },
    ],
    closer: [
      { title: "What the nesting achieves", body: "Every technical instruction in the book can be traced upward through three levels to a place in a scheme that ends at the purity of the prophets. Nothing is free-floating, which is the difference between this book and a manual covering the same ground." },
      { title: "The register throughout", body: "None of this is given grudgingly. The opening put physical cleanliness in its place without running it down, and the care taken over these procedures is the proof — placing something is not the same as belittling it." },
    ],
    distinction: ["Two ways to give ritual detail", "Nested in a scheme", "Every instruction traceable upward to a rank and a purpose.", "Free-standing", "The same instructions, complete and correct, with nothing above them."],
    misreading: "Do not conclude that the nesting makes the detail optional. The scheme places the first rank and the book then treats it in full, which is the opposite of making it dispensable.",
    reflection: "Trace one instruction from this chapter upward through the levels to the fourth rank.",
    audit: ["Can I trace this instruction upward?", "What rank is it serving?", "Which half of that rank?", "Does the scheme change how I do it?"],
    nodes: ["ghusl", "hadath", "maratib"],
    model: chain("Four levels of nesting", "Every instruction sits at the bottom of this.", [["Four ranks", "Outward, limbs, heart, inmost.", "support"], ["One rank", "The outward, declared as this book's scope.", "support"], ["Three divisions", "Filth, ritual impurity, and the body's excesses.", "support"], ["The parts", "The procedural detail, traceable all the way up.", "balance"]]),
  }),
  makeChapter({
    id: 14, shortTitle: "The body's excesses", formalTitle: "Cleaning from what the body produces",
    overview: "The third division and the book's close: nails, hair, and the rest, sorted by whether they are secreted or grown.",
    moves: [
      { title: "Name the division", body: "The third division is cleaning off what the body itself produces — handled by trimming, shaving, hair removal, circumcision and the like." },
      { title: "The first kind", body: "Dirt and the moistures that are secreted, which the body produces continuously and which are removed by washing." },
      { title: "The second kind", body: "What arises in the body as parts of it — hair and nails — which are removed by cutting rather than by washing." },
      { title: "Note the sorting", body: "The two kinds are separated by how they arise, which determines how they are dealt with; the same method as the distinction between impurity of ruling and of substance." },
    ],
    closer: [
      { title: "Why this closes the book", body: "It carries the least ritual weight of the three and never stops: the body keeps producing these things, so the attention involved has no finish line. Ending here leaves you with the most ordinary and most repetitive version of the first level." },
      { title: "The whole book in one line", body: "A book that opened by saying the most important thing of all is cleaning the innermost self ends on trimming your nails — having explained exactly why both belong. That jump is the argument, not an awkwardness in it." },
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
    id: "four-ranks", number: "01", question: "Clean in what sense?", title: "Take the four levels",
    description: "Watch the strongest texts about washing turn into an argument about something else, take the four levels of purity, and get the idea that makes them a system instead of a list.",
    payoff: "You end up with the table of contents for the entire Ihya, laid out in its third book.",
    image: assetUrl("assets/system/book03-four-ranks.jpg"), imageAlt: "Four shallow stone basins set at rising heights on a plain wall, the lowest holding clear water and the highest empty and dry.", minutes: 12, color: "#278d91",
    nodes: [
      node("stack-texts", "Start with the texts", "At full strength", "Religion is built on cleanliness. Purification is half of faith.", "He does not weaken them to make room for his point.", 1, "know"),
      node("how-farfetched", "Take the turn", "That would be a stretch", "Washing your outside while the inside stays packed with filth.", "Not a claim that physical cleanliness is unimportant.", 1, "clear"),
      node("the-four", "Take the four levels", "Body, acts, character, what fills you", "The last he names by who has it, not by what to do.", "Not stages you finish one at a time.", 2, "order"),
      node("no-shortcuts", "See the stack", "You cannot skip one", "Each level rests on the one below it — rind and kernel.", "The person he describes is meticulous, not lazy.", 3, "pattern"),
      node("half-at-each", "Take the principle", "Clearing is half of it", "And it is the half the other one needs.", "A condition, not a queue.", 4, "balance"),
      node("two-hearts", "Reach the top", "There is one space", "God has not put two hearts inside any man.", "At the top it stops being about order and becomes about room.", 4, "witness"),
    ],
  },
  {
    id: "why-so-technical", number: "02", question: "Why is the rest of this book so technical?", title: "Read the declared scope",
    description: "Find Ghazali stating exactly which rank this book treats and why, then follow the three divisions of it and the three questions that organise the first.",
    payoff: "You learn how to read the whole Quarter of Worship: as one declared rank, treated in full, with the rest located elsewhere.",
    image: assetUrl("assets/system/book03-declared-scope.jpg"), imageAlt: "A plain stone tablet leaning against a wall with a single horizontal line scored across its lower third.", minutes: 11, color: "#bf7a35",
    nodes: [
      node("the-scope", "Take the declaration", "Only the outward", "Because the first half of the work addresses outward things.", "A statement of location, not an apology.", 7, "order"),
      node("three-divisions", "Take the three", "Filth, impurity, excesses", "The divisions of the one rank this book treats.", "Set out immediately after the scope is named.", 7, "pattern"),
      node("three-questions", "Take the three questions", "What, by what, how", "Which covers cases a list of rulings would not.", "The structure is fixed before any substance is named.", 8, "know"),
      node("nested", "See the nesting", "Four levels", "Every instruction traceable upward to a rank and a purpose.", "The difference between this and a manual.", 13, "steady"),
      node("weights", "Watch the weights", "Required or fitting", "Much of this quarter is manners, and it is not always marked.", "Treating manners as requirements produces scrupulosity.", 11, "guard"),
    ],
  },
  {
    id: "how-strict", number: "03", question: "How strict does this actually have to be?", title: "Take four evidences against scruple",
    description: "Follow the sharpest argument in the book — a historical one — to a single observable test, and take the distinction that stops a person scrubbing at what is not there.",
    payoff: "You get a test that can actually be completed, and the reasoning that gets you there.",
    image: assetUrl("assets/system/book03-unchanged-water.jpg"), imageAlt: "A plain earthenware jar of clear water on a doorstep in strong daylight, entirely still and unattended.", minutes: 12, color: "#c25f50",
    nodes: [
      node("the-reductio", "Take the reductio", "Mecca and Medina", "The strict standard would make purity hardest exactly there.", "Ghazali says he does not doubt this.", 9, "clear"),
      node("no-question", "Take the silence", "Nobody asked", "Not one incident or question reported in the first two ages.", "A genuinely historical form of argument.", 9, "witness"),
      node("umars-jar", "Take Umar's jar", "A Christian woman's vessel", "Virtually explicit that he relied on the water not having changed.", "The alternative would have made it obviously unusable.", 9, "know"),
      node("one-test", "Take the criterion", "Has it changed", "Everything about what may have touched it falls away.", "A real test, which some water fails.", 9, "diagnose"),
      node("ruling-or-substance", "Separate the kinds", "A ruling or a body", "Where there is no substance, there is nothing to check for residue.", "Applying the wrong standard is a category error.", 10, "pattern"),
      node("completable", "See what both do", "End the endless", "One removes an unanswerable history, the other an unanswerable physics.", "Both leave a test that can be finished.", 10, "steady"),
    ],
  },
  {
    id: "the-easiest-rank", number: "04", question: "What happens to someone who perfects the outward?", title: "Watch the frame do its work",
    description: "Read the most finely detailed chapters in the book alongside the warning that opened it, and see why Ghazali gives the detail generously rather than grudgingly.",
    payoff: "You see the difference between placing something and belittling it.",
    image: assetUrl("assets/system/book03-the-parings.jpg"), imageAlt: "A washed pale bowl upturned on a cloth beside a small pair of shears and a folded towel, everything spotless.", minutes: 11, color: "#586fa8",
    nodes: [
      node("the-detail", "Note the detail", "Down to the eyelashes", "The finest technical instruction in the book is here.", "A mark of where the first rank's weight sits.", 12, "witness"),
      node("reversed-order", "Note the order", "Procedure, then merit", "The reverse of the rest of the Ihya, and for a reason.", "Nobody doubts this act is worth doing.", 12, "pattern"),
      node("easiest", "Ask the question", "Easiest to perfect", "An outward act, precisely specified, capable of being done exactly.", "And capable of being done exactly while the third rank is untouched.", 12, "diagnose"),
      node("generously", "Note the register", "Given generously", "Nothing here is grudging; placing is not belittling.", "The care in these chapters is the practical evidence.", 13, "balance"),
      node("the-ending", "Read the ending", "Nails and hair", "A book that began on the inmost ends on paring.", "Consistent with the scope declared in Chapter 4.", 14, "steady"),
    ],
  },
  {
    id: "fussiness", number: "05", question: "Can being clean become the problem?", title: "The sharpest pages in the book",
    description: "Ghazali describes people scrupulous about washing and wrecked inside, says nobody finds it strange, and then gives a test for when care about cleanliness counts for you and when it counts against you.",
    payoff: "A four-part test you can run on your own habits, and the reason obsessiveness is a symptom rather than a virtue.",
    image: assetUrl("assets/system/book03-unchanged-water.jpg"), imageAlt: "A plain earthenware jar of clear water on a doorstep in strong daylight, entirely still and unattended.", minutes: 11, color: "#a97837",
    nodes: [
      node("rind-kernel", "Take the image", "Rind and kernel", "Someone who cannot see the levels takes the outermost for the whole.", "He is working hard. That is what makes it uncomfortable.", 3, "diagnose"),
      node("fussiness", "Take the line", "They call fussiness cleanliness", "Outsides decorated like a bride; insides a ruin.", "And nobody involved finds that strange.", 5, "clear"),
      node("one-way", "Note the asymmetry", "Only one gets noticed", "Skip the washing and it is remarked on at once. Be full of pride and it is not.", "He is attacking a ranking, not a practice.", 5, "witness"),
      node("how-they-lived", "Take the evidence", "Nobody even asked", "Not one question about the fine points of impurity is recorded from them.", "Not lenient answers — the questions are absent.", 6, "know"),
      node("four-conditions", "Take the test", "Four conditions", "Own sake, no contempt, no delayed prayer, nothing better displaced.", "All four are about something other than the washing.", 6, "balance"),
    ],
  },
];

export const book03Movements: TaxonomyGroup[] = [
  ["muqaddima", "The opening: four levels of purity", "The texts, the four levels, why you cannot skip one, the halves, the polemic against fussiness, and the declared scope.", [1, 2, 3, 4, 5, 6, 7]],
  ["khabath", "The first division: purity from filth", "What is removed, by what, and how — with the argument against strictness.", [8, 9, 10]],
  ["adab", "The etiquette of the body", "Manners rather than requirements, and the difference.", [11]],
  ["hadath", "The second division: purity from ritual impurity", "Ablution and the full washing.", [12, 13]],
  ["fadalat", "The third division: the body's excesses", "Secreted and grown, and how each is dealt with.", [14]],
].map(([id, label, description, chapterIds], index) => ({ id, label, description, chapterIds, color: ["#bf7a35", "#278d91", "#c25f50", "#586fa8", "#a97837"][index % 5] })) as TaxonomyGroup[];

export const book03Instrument: Instrument = {
  title: "Which level, and which half",
  note: "Ghazali gives four levels of purity — the body, what you do, what you are like, and what fills you — and says that at every one, clearing out what should not be there is half the work, and the half that makes the other half possible. Answer for where your attention actually goes, not where you think it ought to.",
  items: [
    {
      id: "rank", label: "Where your attention actually is", lede: "Over the last month, not in principle",
      note: "Both questions are his. The four levels are his, in his order, and the two halves are how he reads “purification is half of faith” — the same shape at all four. One combination is the one this book was written to catch.",
      axes: [
        {
          id: "rank", kicker: "The four ranks", question: "Which purity have you actually been attending to?",
          options: [
            { id: "outward", label: "The body — cleanliness and ritual purity", note: "The first level, and the only one this book covers." },
            { id: "limbs", label: "My acts — what I do and avoid doing", note: "The second level: cleaning your limbs of wrongdoing." },
            { id: "heart", label: "My character — traits and dispositions", note: "The third level, and what the Quarter of Perils is about." },
            { id: "inmost", label: "What occupies me — what I am full of", note: "The fourth, which he calls the purity of the prophets and the truthful." },
          ],
        },
        {
          id: "half", kicker: "The two halves", question: "And which half of the work have you been doing?",
          options: [
            { id: "clear", label: "Clearing away what should not be there", note: "The first half, which he says the second one needs." },
            { id: "fill", label: "Cultivating what should be there", note: "The second half, which will not take while the opposite is still there." },
            { id: "both", label: "Both, more or less together", note: "Which he allows: a condition does not have to be finished first." },
            { id: "maintain", label: "Neither — I am just keeping things as they are", note: "The honest answer for most settled practice." },
          ],
        },
      ],
      verdicts: [
        { key: "inmost|*", name: "The rank he names by its holders", role: "support", chapterId: 2, body: "Three of his levels are named by what comes off them. The fourth he names differently — clearing the innermost self of everything that is not God, which he calls the purity of the prophets and the truthful. He describes who has it rather than setting it as a job.", action: "At this level his principle stops being about order and becomes about room: knowledge of God will not settle in while something else is sitting there, “because the two do not gather in one heart.” So if your attention really is here, the question is not what to add. It is what is already occupying the space." },
        { key: "outward|clear", name: "The rank this book is limited to", role: "balance", chapterId: 7, body: "This is where almost the whole book sits, and Ghazali says so plainly: this book covers only physical cleanliness, because the first half of the Ihya is deliberately about outward things.", action: "Read section 9 alongside it, because effort concentrated here slides toward a test you can never finish. His four arguments all land on one thing you can actually check — whether the water has changed — and he points out that nobody in the first two generations is recorded asking about the fine points of impurity at all." },
        { key: "outward|*", name: "One rank of four", role: "balance", chapterId: 1, body: "Ghazali collects the strongest texts about physical cleanliness he can find, then says it would be a stretch to read them as meaning you pour water over your outside while the inside stays packed with filth. He is not running this level down. He is placing it.", action: "The practical test is whether care here reaches anything else. This is the easiest of the four to get right — a physical act, exactly specified, and perfectly doable while your character is untouched. Section 5 is blunter about it: he describes people meticulous about washing whose insides are “a ruin,” and says nobody around them finds that strange." },
        { key: "heart|clear", name: "This is the Quarter of Perils", role: "support", chapterId: 4, body: "The third level, and the first half of it. His wording is exact: the most you can do for a heart is fill it with good character, and it will not take those on until the opposites have been cleaned out. So what you are doing is the precondition for everything else here.", action: "Book 1 of the Ihya makes the sharper claim about this same work: that removing the blamed states of the heart is an individual obligation, that it cannot be done without knowing their causes and signs, and that most people have abandoned it. Ten books of the Ihya are the treatment; this is the rank they belong to." },
        { key: "limbs|clear", name: "The first half at the second rank", role: "support", chapterId: 4, body: "Same shape here: stopping what you were told not to do is the first half, and doing what you were told to do is the second. Clearing is not warm-up before the real thing. On his reading it is half of the thing.", action: "Because the first half is a condition and not a queue, none of this says to stop doing good. What it says is that good built on top of something uncleared is the half that will not hold — which is his explanation for why effort sometimes produces nothing." },
        { key: "*|fill", name: "Clearing is the condition", role: "balance", chapterId: 4, body: "Whichever level you are on, the half you picked is the second one. His wording is precise: clearing comes first and the other needs it, because the filling will not take while the opposite is still in the space.", action: "Do not read a condition as a sequence — he never says stop until you are clean, and the Ihya prescribes practice to people it also says have inner work to do. But if the filling is not holding, his diagnosis is that something is still in the way, and the useful question is what." },
        { key: "*|maintain", name: "Neither half is being worked", role: "warning", chapterId: 4, body: "His scheme has exactly two halves at every level, and holding steady is not one of them. That is not a criticism — settled practice is most of anyone's life — but on his account nothing at that level is currently moving.", action: "The useful question is which half would move it, and he answers it: if the practice is producing nothing, look for what is still occupying the space, because the second half cannot take while the opposite is there. Section 4 is where he argues it." },
        { key: "*|*", name: "Read the rank with the half", role: "balance", chapterId: 2, body: "A level, and one half of the work at it. His four levels turn out to be the table of contents for the whole Ihya: the body is this quarter, what you do is the Quarter of Customs, what you are like is the Quarter of Perils, and what fills you is where the Quarter of Deliverance arrives.", action: "So the answer is also a direction. Your level says which quarter of the work is yours right now; your half says whether what you need there is a clear-out or a build-up. Both get answered book by book." },
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
