import { assetUrl } from "./assetUrl";
import type { Chapter, ConceptNode, VisualModel } from "./data";
import type { Instrument, Journey, SourceLink, SystemBook, TaxonomyGroup } from "./systemTypes";

type Seed = { id: number; shortTitle: string; formalTitle: string; overview: string; thesis?: string; moves: Array<{ title: string; body: string }>; closer: Array<{ title: string; body: string }>; distinction: [string, string, string, string, string]; misreading: string; reflection: string; audit: string[]; nodes: string[]; model: VisualModel };
const bab = (id: number) => (id === 2 ? "the first chapter, on the excellence of earning" : id === 3 ? "the second chapter, on the law of transactions" : id <= 6 ? "the third chapter, on justice in dealing" : id <= 8 ? "the fourth chapter, on excellence in dealing" : "the fifth chapter, on the merchant's compassion for his religion");
const makeChapter = (seed: Seed): Chapter => ({
  id: seed.id, shortTitle: seed.shortTitle, formalTitle: seed.formalTitle, overview: seed.overview,
  points: seed.moves.slice(0, 3).map((m) => m.body), reflection: seed.reflection, relatedNodes: seed.nodes, visualModel: seed.model,
  deep: { thesis: seed.thesis ?? seed.moves[0].body, context: seed.overview, moves: seed.moves, closeReading: seed.closer,
    distinction: { title: seed.distinction[0], firstLabel: seed.distinction[1], first: seed.distinction[2], secondLabel: seed.distinction[3], second: seed.distinction[4] },
    misreading: seed.misreading, observation: seed.reflection, selfAudit: seed.audit,
    sourceAnchor: `Book 13, ${bab(seed.id)}, ${seed.formalTitle}.` },
});
const chain = (title: string, caption: string, items: Array<[string, string, "support" | "balance" | "warning"]>): VisualModel => ({ kind: "chain", title, caption, items: items.map(([label, body, role]) => ({ label, body, role })) });
const pair = (title: string, caption: string, items: Array<[string, string, "support" | "balance" | "warning"]>): VisualModel => ({ kind: "pair", title, caption, items: items.map(([label, body, role]) => ({ label, body, role })) });
const spectrum = (title: string, caption: string, items: Array<[string, string, "support" | "balance" | "warning"]>): VisualModel => ({ kind: "spectrum", title, caption, items: items.map(([label, body, role]) => ({ label, body, role })) });

export const book13Chapters: Chapter[] = [
  makeChapter({
    id: 1, shortTitle: "Five chapters", formalTitle: "The shape of the book",
    overview: "The book on earning has five chapters, and the middle three are a single ascending argument: what the law allows, what justice requires beyond it, and what excellence adds beyond that.",
    thesis: "Five chapters, of which the middle three are one continuous argument about what a trader owes the person opposite him.",
    moves: [
      { title: "Announce the five", body: "The excellence of earning and the urging toward it; the knowledge of sound selling, buying, and dealings; justice in dealing; excellence in it; and the merchant's compassion for himself and his religion." },
      { title: "Note the ascent", body: "The second chapter gives what makes a transaction valid. The third gives what makes it free of wrongdoing, which is not the same thing. The fourth gives what goes beyond both." },
      { title: "Note the fifth", body: "The last turns from the transaction to the trader — from what he owes others to what his trade is doing to him, which is where the book ends." },
      { title: "Say where the weight is", body: "The second chapter is technical law. The three that follow it are the book, and each of them begins by saying what the previous one does not settle." },
    ],
    closer: [
      { title: "The structure this repeats", body: "Book 6 separated the jurists' validity from the hereafter-scholars' acceptance and gave each office its ground. This book does the same for commerce and adds a third level: valid, just, and excellent are three distinct standards, and the book has a chapter for each." },
      { title: "Why earning follows marriage", body: "Book 12 named the inability to seek the lawful as the strongest harm of marriage. This book and the next are about exactly that, and the order of the quarter is deliberate." },
    ],
    distinction: ["Two ways to write about commerce", "In three standards", "Valid, free of wrongdoing, and excellent — each with its own chapter.", "In one", "The law of contracts, which the third chapter opens by saying does not settle the question."],
    misreading: "Do not read the second chapter as the substance and the rest as exhortation. Ghazali's third chapter states plainly that a transaction can pass the second and still expose its maker to God's wrath.",
    reflection: "Notice that three of the five chapters exist to say what the law of contracts leaves open.",
    audit: ["Which standard am I applying?", "Which chapter answers my question?", "What does validity settle?", "Why does this book follow marriage?"],
    nodes: ["kasb", "structure", "adl"],
    model: chain("Three standards, three chapters", "Each begins where the last stops.", [["Valid", "What the law of contracts settles.", "balance"], ["Just", "Free of wrongdoing, which validity does not guarantee.", "support"], ["Excellent", "Beyond what is owed, which justice does not require.", "support"]]),
  }),
  makeChapter({
    id: 2, shortTitle: "The excellence of earning", formalTitle: "The urging toward work",
    overview: "The first chapter, and its opening verse establishes that earning is not a concession but a design.",
    thesis: "Earning is placed among the things religion requires rather than tolerated as a distraction from it.",
    moves: [
      { title: "Give the verse", body: "We made the day for livelihood. Ghazali notes that it is mentioned in the course of enumerating blessings, which is what settles the register of the whole chapter." },
      { title: "Note what that establishes", body: "Working for a living is placed among the things given rather than among the things permitted. A day made for livelihood is a provision, not an allowance." },
      { title: "Gather the rest", body: "The chapter assembles the verses and reports urging toward earning, including those on the merit of the truthful and trustworthy merchant." },
      { title: "Note the placement", body: "The excellences come first, as in every book of the Ihya — and here they are doing particular work, since the three chapters that follow are almost entirely restrictions." },
    ],
    closer: [
      { title: "Why the excellences matter here", body: "A book whose middle chapters catalogue the wrongs available in trade could easily read as a case against trade. Opening on a verse that lists livelihood among blessings fixes the direction: what follows restricts a good thing rather than tolerating a bad one." },
      { title: "The link to Book 1", body: "Book 1 classified the foundations of the crafts — farming, weaving, tailoring, cupping — as communal obligations, and the fifth chapter of this book will tell a trader to intend his work as the discharge of one. The two books are the same argument at two scales." },
    ],
    distinction: ["Two ways to place earning", "Among the blessings", "A day made for livelihood, mentioned in a list of things given.", "Among the concessions", "Permitted because people must eat, which the verse's placement rules out."],
    misreading: "Do not read the restrictions in the later chapters as a suspicion of commerce. They are restrictions on something the first chapter establishes as good.",
    reflection: "Notice which category your own work sits in, in your own mind.",
    audit: ["Blessing, or concession?", "What does the verse's placement do?", "Why open with excellences here?", "What is being restricted?"],
    nodes: ["kasb", "fadila", "kifaya"],
    model: pair("Two placements", "The verse settles which one.", [["A blessing", "The day made for livelihood, named among what is given.", "support"], ["A concession", "Tolerated because it is necessary, which the placement denies.", "warning"]]),
  }),
  makeChapter({
    id: 3, shortTitle: "The law of it", formalTitle: "The second chapter: what makes a transaction valid",
    overview: "The technical chapter, and it is the longest single stretch of law in the Quarter of Customs.",
    thesis: "The legal chapter is the longest stretch of law in the quarter, and this edition gives its shape rather than its rulings.",
    moves: [
      { title: "Name the subject", body: "What you need to know about earning through sale, usury, forward sales, hire, silent partnership and ordinary partnership — and the conditions the law puts on each." },
      { title: "Note what it settles", body: "Whether a transaction is concluded, and on what terms. It is a chapter of contract law and it is given in the ordinary manner of such chapters." },
      { title: "Note what it does not settle", body: "Whether the transaction was right. That question is opened by the very first sentence of the chapter that follows, which says that a valid contract can still be a wrong." },
      { title: "Note the register", body: "Given plainly and without argument, as the legal chapters of the Quarter of Worship were. Its content follows the school Ghazali wrote within." },
    ],
    closer: [
      { title: "Why the law comes first anyway", body: "The third chapter's whole argument depends on there being a settled standard for it to exceed. Without a chapter establishing what validity is, the claim that something can be valid and still wrong would have nothing to attach to." },
      { title: "What this edition does with it", body: "The rulings vary between the schools of law and have changed with the instruments of commerce. This section presents what the chapter settles and what it leaves open; the rulings belong to a work of law." },
    ],
    distinction: ["Two questions about a transaction", "Is it concluded", "What the second chapter answers, in the ordinary way of contract law.", "Is it right", "Which the third chapter opens by saying the second does not answer."],
    misreading: "Do not treat this chapter as dispensable because the ones after it are more interesting. The later argument requires a definite standard of validity to exceed, and this is where it is set.",
    reflection: "Ask whether you have ever settled a question of conscience by establishing that something was permitted.",
    audit: ["Which question was I asking?", "Have I stopped at validity?", "Where do the rulings come from?", "What does this chapter make possible?"],
    nodes: ["fiqh", "kasb", "structure"],
    model: pair("What a legal chapter does", "The second is what the next chapter is for.", [["Settles validity", "Whether the contract is concluded and on what terms.", "support"], ["Leaves the other question", "Whether the transaction was a wrong, which validity does not decide.", "balance"]]),
  }),
  makeChapter({
    id: 4, shortTitle: "Valid, and still wrong", formalTitle: "The sentence the third chapter opens on",
    overview: "One of the sharpest openings in the Ihya, and it states a principle of law that most readers do not know.",
    thesis: "Wrongdoing in trade is defined by a principle wide enough to catch things no list of prohibited practices would.",
    moves: [
      { title: "Give the sentence", body: "A dealing may proceed in a way that the jurist rules valid and concluded — and yet it contains a wrongdoing by which the dealer exposes himself to God's wrath." },
      { title: "Give the reason", body: "Since not every prohibition entails the invalidity of the contract. The gap between the two standards is not a moral observation but a technical fact about how prohibitions work." },
      { title: "Define the wrong", body: "By this wrongdoing is meant what harms another. The standard for the third chapter is harm, not permission." },
      { title: "Divide it", body: "It divides into what harms generally and what harms the particular party dealt with. Two kinds of harm, and the chapter treats them in that order." },
    ],
    closer: [
      { title: "Why the technical reason matters", body: "If the gap were only that jurists are lenient, a reader could close it by finding a stricter jurist. Ghazali's ground is that a prohibited act can produce a binding contract — so no amount of legal opinion will make the second standard collapse into the first." },
      { title: "The same structure elsewhere", body: "Book 6 answered the objection that the jurists call a bare fast valid by separating discharge from acceptance and giving each office its ground. This is the commercial form of the same move, and it is stated even more plainly." },
    ],
    distinction: ["Two ways a transaction can fail", "By being invalid", "The contract does not hold, which the law of the second chapter determines.", "By being a wrong", "The contract holds and harm was done, which validity does not touch."],
    misreading: "Do not read this as saying the jurists are wrong. Ghazali's point is that they are answering a different question, and that not every prohibition is a prohibition of the kind that voids a contract.",
    reflection: "Ask what you would say to someone who defended a transaction by saying it was permitted.",
    audit: ["Have I defended something by its permissibility?", "Was anyone harmed?", "Which standard settles that?", "Can a stricter opinion close this gap?"],
    nodes: ["adl", "zulm", "fiqh"],
    model: chain("Why the gap cannot close", "The reason is technical, not moral.", [["A prohibition", "Something the Law forbids.", "warning"], ["A valid contract", "Which it may nonetheless produce, since not every prohibition voids.", "balance"], ["A standing wrong", "Which is what the third chapter is about.", "warning"]]),
  }),
  makeChapter({
    id: 5, shortTitle: "Harms that spread", formalTitle: "The wrongs whose harm is general",
    overview: "The first division of wrongdoing, and its two named kinds are a matter of markets rather than of individuals.",
    thesis: "Some wrongs damage people who were never party to the transaction, which is why they are treated first.",
    moves: [
      { title: "Give the first kind", body: "Hoarding. The seller of food stores it, waiting with it for prices to rise — and it is a general wrongdoing, and its doer is blamed in the Law." },
      { title: "Give the reports", body: "Whoever hoards food for forty days and then gives it in charity, his charity is no expiation for his hoarding. And: whoever hoards food for forty days has quit God and God has quit him." },
      { title: "Give the second kind", body: "Passing debased coin into circulation in the course of payment. It is a wrongdoing, since the party dealt with is harmed by it if he does not know — and if he does know, he will pass it on to another." },
      { title: "Trace the chain", body: "The harm does not stop at the person paid. A debased coin knowingly accepted is taken only to be passed on, which is what makes both kinds general: the damage propagates past the transaction that caused it." },
    ],
    closer: [
      { title: "The inversion about learning", body: "It is obligatory on the merchant to learn the currency — not so that he may be exacting for himself, but so that he does not hand a Muslim a debased coin without knowing, and become a sinner. The competence is required for the other party's protection rather than for his own." },
      { title: "The fourth of the coin rules", body: "That he take the debased coin himself, acting on the report: God have mercy on a man easy in selling, easy in buying, easy in demanding, and easy in repaying. Where the rest of the section forbids passing harm on, this one has him absorb it." },
    ],
    distinction: ["Two reasons to learn your trade", "So as not to harm", "Which is the ground Ghazali gives for the obligation to know the currency.", "So as not to be cheated", "Which he explicitly sets aside as the reason."],
    misreading: "Do not read the charity clause as a general rule that good deeds cannot expiate wrongs. The report is about hoarding specifically, and it is cited to establish how serious that particular harm is.",
    reflection: "Ask what in your trade you have learned for your own protection and not for anyone else's.",
    audit: ["Does my harm stop with me?", "Have I passed something on?", "Why did I learn what I know?", "Would I absorb a loss to end a chain?"],
    nodes: ["ihtikar", "zulm", "adl"],
    model: pair("Two kinds of general harm", "Both propagate past the transaction.", [["Hoarding", "Withholding food to wait for a price, which harms a market.", "warning"], ["Debased coin", "Passed on, and passed on again by whoever receives it.", "warning"]]),
  }),
  makeChapter({
    id: 6, shortTitle: "Tell them everything", formalTitle: "The wrongs that harm the other party",
    overview: "The second division, and its rule is stated as broadly as a rule can be — followed by an obligation of disclosure that admits no exception.",
    thesis: "The rule about harming the other party is stated as broadly as a rule can be, and deliberately so.",
    moves: [
      { title: "Give the rule", body: "Everything by which the party dealt with is harmed is a wrongdoing — and justice is that a man not harm his Muslim brother." },
      { title: "Give the disclosure obligation", body: "That he make plain all the defects of the goods, the hidden and the apparent, and conceal nothing of them. That is obligatory." },
      { title: "Give the consequence", body: "If he conceals it, he is a wrongdoer and a deceiver — and deceit is forbidden. Two names are attached rather than one, and the second reaches past the transaction into what the man is." },
      { title: "Give the price rule", body: "That he be truthful about the current price and conceal nothing of it — and the Messenger forbade meeting the caravans, which is the practice of buying from arrivals before they have learned what the market is paying." },
    ],
    closer: [
      { title: "Why hidden and apparent are both named", body: "Apparent defects need no disclosure to be discovered, so naming them looks redundant. It is not: the obligation is to make them plain rather than to leave them discoverable, which forbids the common practice of relying on a buyer to notice." },
      { title: "The forbidding of meeting the caravans", body: "Nothing about the transaction is unfair on its face — a price is offered and accepted. What makes it a wrong is that one party knows the market and the other does not, which locates the offence in an asymmetry rather than in a term." },
    ],
    distinction: ["Two ways to handle a defect", "Make it plain", "Disclosed, hidden and apparent alike, which is obligatory.", "Leave it discoverable", "Available to a careful buyer, which the obligation to make plain forecloses."],
    misreading: "Do not limit this to concealment. The rule given is that anything by which the other party is harmed is a wrong, and the examples include cases where nothing was concealed and no term was unfair.",
    reflection: "Ask what you have let someone discover for themselves.",
    audit: ["What did I leave discoverable?", "Do I know something they do not?", "Is the asymmetry doing the work?", "Which name applies to me?"],
    nodes: ["ghish", "adl", "zulm"],
    model: chain("Three forms of the same offence", "None of them requires an unfair term.", [["Concealing a defect", "Which makes a man a wrongdoer and a deceiver.", "warning"], ["Withholding the price", "Not being truthful about what the market is.", "warning"], ["Meeting the caravan", "Trading on an asymmetry the other party has not had time to close.", "warning"]]),
  }),
  makeChapter({
    id: 7, shortTitle: "Capital and profit", formalTitle: "Justice is not the whole of it",
    overview: "The fourth chapter opens with an accounting metaphor that reframes the whole book, and it is the passage the book is remembered for.",
    thesis: "Being fair is where the accounting starts, not where it finishes — because nobody in business settles for getting his capital back.",
    moves: [
      { title: "Note the pairing", body: "God commanded justice and excellence together — indeed God commands justice and excellence." },
      { title: "Give the first half", body: "Justice is a cause of deliverance only, and it runs in trade as capital runs." },
      { title: "Give the second", body: "Excellence is a cause of winning and of attaining happiness, and it runs in trade as profit runs." },
      { title: "Draw the conclusion", body: "So it does not suit a religious person to stop at being fair and not cheating anyone, leaving the doors of decency shut — because nobody in business settles for getting his capital back." },
    ],
    closer: [
      { title: "Why the metaphor lands", body: "It is addressed to merchants in their own terms. Nobody in trade regards preserving capital as a successful year, and the argument simply asks why the same person would regard the equivalent in his dealings with God as sufficient." },
      { title: "The definition that follows", body: "By excellence we mean doing what benefits the other party when it is not obligatory on him but is a favour from him — for the obligatory falls under justice and the leaving of wrongdoing. The line between the two chapters is drawn at what is owed." },
    ],
    distinction: ["Two standards, two returns", "Justice", "Deliverance only, and it runs as capital runs.", "Excellence", "Winning and happiness, and it runs as profit runs."],
    misreading: "Do not read excellence as optional in the sense of unimportant. Ghazali's own metaphor makes it the entire return, and justice merely the preservation of the stake.",
    reflection: "Ask what you would think of a merchant who came out of a year having exactly recovered his capital.",
    audit: ["Am I preserving capital only?", "What is my return?", "Where is the line between the two?", "Would I accept this in my own trade?"],
    nodes: ["ihsan", "adl", "kasb"],
    model: pair("The metaphor", "Addressed to merchants in their own terms.", [["Justice as capital", "Preserved, and a cause of deliverance only.", "balance"], ["Excellence as profit", "The return, and a cause of winning.", "support"]]),
  }),
  makeChapter({
    id: 8, shortTitle: "Six doors", formalTitle: "The ways excellence is attained",
    overview: "Six things, each of which gives the other party something not owed to them — and two of them are unusually concrete.",
    thesis: "Six ways of giving the other party something they were not owed, which is what excellence in trade actually consists of.",
    moves: [
      { title: "The first", body: "In the margin taken: that he not take from his counterpart a margin beyond what is customarily overlooked. The taking of a margin itself is permitted; the excellence is in its size." },
      { title: "The second", body: "In bearing the loss: if he buys food from a weak person, or something from a poor one, there is no harm in his bearing the disadvantage and being lenient." },
      { title: "The fifth", body: "Let somebody cancel if they ask to — because nobody asks to undo a sale unless he regrets it and it is costing him, and it does not suit a man to be comfortable being the reason somebody is out of pocket." },
      { title: "The sixth", body: "That he deliberately deal with a group of the poor on credit, resolving at the time not to demand payment from them if no means appear for them." },
    ],
    closer: [
      { title: "Why the fifth is the sharpest", body: "It gives up a completed and valid transaction on nothing but the other party's regret, and the reason given is not generosity but reluctance: it does not befit a man to be content to be the cause of someone's harm. The excellence is framed as an unwillingness rather than as a gift." },
      { title: "The sixth as a decision in advance", body: "The resolve not to demand payment is formed at the time of the sale, not later when the debtor fails. That makes it a different act from forgiving a debt — the risk is accepted before it is known, which is why it counts as excellence rather than as mercy after the fact." },
    ],
    distinction: ["Two ways to be generous in a trade", "Decided in advance", "The sixth: the resolve formed at the sale, before any failure to pay.", "Decided after", "Forgiving what has already gone wrong, which is a different and later act."],
    misreading: "Do not read the first as forbidding profit. Ghazali says the taking of a margin is permitted and locates the excellence in its size, not in its absence.",
    reflection: "Take the fifth and ask whether you have ever refused to undo something you were entitled to keep.",
    audit: ["Have I refused a rescission?", "Do I decide leniency in advance?", "What margin do I take?", "Which of the six is available to me?"],
    nodes: ["ihsan", "iqala", "kasb"],
    model: spectrum("Four of the six", "Each gives what is not owed.", [["The margin", "Kept within what is customarily overlooked.", "support"], ["Bearing the loss", "From a weak or poor counterparty.", "support"], ["Accepting rescission", "Because the asker regrets and is harmed.", "support"], ["Credit without demand", "Resolved at the sale, before any failure.", "support"]]),
  }),
  makeChapter({
    id: 9, shortTitle: "His capital is his religion", formalTitle: "The fifth chapter turns to the trader",
    overview: "The book's last chapter changes subject: from what a man owes his counterparties to what his trade is doing to him.",
    thesis: "The last chapter changes subject entirely: from what you owe your customer to what you owe your own religion while trading.",
    moves: [
      { title: "State the danger", body: "The merchant should not let his livelihood occupy him from his return, so that his life is wasted and his bargain a loss — for what escapes him of profit in the hereafter is not made up by what he attains here." },
      { title: "Name the transaction", body: "So he would have bought the life of this world with the hereafter. The whole chapter is framed as a trade a man makes without noticing it." },
      { title: "Give the instruction", body: "Rather the intelligent man should have compassion on himself. And his compassion on himself is the preserving of his capital — and his capital is his religion, and his trade is in it." },
      { title: "Give the ordering", body: "Mu'adh said: you must have your share of this world, and you are more in need of your share of the hereafter — so begin with your share of the hereafter and take it, for you will pass by your share of this world and arrange it." },
    ],
    closer: [
      { title: "The verse he re-reads", body: "Do not forget your share of this world — which he reads as: do not forget, while in this world, your share of it for the hereafter. For it is the sowing-field of the hereafter, and in it good deeds are earned. The world is not the thing to be remembered but the place the remembering is done." },
      { title: "The metaphor completing itself", body: "The fourth chapter made justice capital and excellence profit. This one makes religion the capital and the whole of a life the trade. The same accounting is applied at three levels, and at the last one the trader is the merchandise." },
    ],
    distinction: ["Two things a trader can preserve", "His capital", "Which the chapter identifies as his religion, and the preserving of it as compassion for himself.", "His stock", "Which is what the word ordinarily means, and which the chapter is not about."],
    misreading: "Do not read Mu'adh's counsel as telling a person to neglect his livelihood. He says explicitly that a share of this world is necessary, and only that the order of attention should be reversed.",
    reflection: "Ask which of the two shares you begin your day with, and whether the other one gets arranged anyway.",
    audit: ["Which share do I begin with?", "What am I buying with what?", "What is my capital?", "Does the other one get arranged?"],
    nodes: ["shafaqa", "din", "kasb"],
    model: chain("The same accounting, three times", "At the last level the trader is the merchandise.", [["In a transaction", "Justice is capital, excellence is profit.", "support"], ["In a trade", "The stock preserved and the return sought.", "balance"], ["In a life", "Religion is capital, and the trade is in it.", "support"]]),
  }),
  makeChapter({
    id: 10, shortTitle: "Seven things", formalTitle: "What the trader's compassion requires",
    overview: "Seven observances, and they run from why a person trades to what he does while standing in the market.",
    thesis: "Seven observances, running from why a person trades at all to what he does at the end of a day.",
    moves: [
      { title: "The first", body: "Good intention and belief at the beginning of the trade: he should intend by it abstention from asking, and the sufficing of his household." },
      { title: "The second", body: "That he intend, by standing in his craft or his trade, the discharge of one of the communal obligations — for the crafts and the trades, if they were abandoned, livelihoods would collapse." },
      { title: "The third and fourth", body: "That the market of this world not prevent him from the market of the hereafter — and the markets of the hereafter are the mosques. And that he not confine himself to that, but keep to the remembrance of God in the market itself." },
      { title: "The fifth", body: "That he not be intensely greedy for the market and the trade — such as being the first to enter it and the last to leave it, and putting to sea for the sake of trade." },
    ],
    closer: [
      { title: "The second observance and Book 1", body: "Book 1 argued that the foundations of the crafts — farming, weaving, governance, cupping, tailoring — are communal obligations, on the ground that a town would be in difficulty without them. Here that classification becomes an intention a particular tradesman is told to form about his own work." },
      { title: "The test in the fifth", body: "First to enter and last to leave. It is a description of behaviour rather than of feeling, which makes it checkable — and it is a description that most people would have offered as evidence of diligence." },
    ],
    distinction: ["Two ways to hold a trade", "As a communal obligation", "Intended as the discharge of something a town cannot do without.", "As a private necessity", "Undertaken to meet one's own needs, which the first observance also permits."],
    misreading: "Do not read the fifth as forbidding hard work. What is described is a particular pattern — always first, always last — offered as a symptom of greed rather than of effort.",
    reflection: "Notice that one of the seven would be produced, by most people, as evidence of being good at their job.",
    audit: ["What do I intend by my work?", "Whose obligation am I discharging?", "Am I first in and last out?", "What do I do while standing there?"],
    nodes: ["shafaqa", "kifaya", "niyya"],
    model: spectrum("Five of the seven", "From why a person trades to what he does there.", [["Good intention", "Abstention from asking, and sufficing a household.", "support"], ["A communal obligation", "What a town cannot do without.", "support"], ["The other market", "The mosques, which this one must not prevent.", "balance"], ["Remembrance in this one", "Not confined to leaving the market to do it.", "support"], ["Not first and last", "A behaviour offered as a symptom of greed.", "warning"]]),
  }),
  makeChapter({
    id: 11, shortTitle: "Consult your heart", formalTitle: "The sixth observance",
    overview: "The last substantial thing in the book, and the most quoted sentence in it — a direct instruction to go past the legal opinion.",
    thesis: "The most quoted sentence in the book: do not go by the legal opinions — ask your own heart.",
    moves: [
      { title: "State it", body: "That he not confine himself to avoiding the forbidden, but guard against the places of doubt and the occasions of suspicion." },
      { title: "Give the instruction", body: "He should not look to the legal opinions — but he should seek the verdict of his own heart." },
      { title: "Note what it presupposes", body: "It comes after four chapters of law, justice, and excellence. It is addressed to a reader who knows what is permitted, and it tells him that knowing is not the end of the inquiry." },
      { title: "Note its limits", body: "It is the sixth of seven observances by which a trader guards his own religion. It is counsel for a man deciding about himself, and nothing in it authorises anyone to judge another by it." },
    ],
    closer: [
      { title: "Why it is not lawlessness", body: "The sentence follows a book that spends its second chapter on contract law and its third on establishing that harm is wrong even where the law permits. It tells a man to go beyond the opinion in the direction of caution, never to go around it in the direction of licence." },
      { title: "Where the Ihya treats this at length", body: "Book 14, on the lawful and the unlawful, follows immediately and is largely about the doubtful — how much scruple is required, where scruple becomes excess, and what to do when the sources conflict. This sentence is the entry to that book." },
    ],
    distinction: ["Two directions a person can go past an opinion", "Toward caution", "Guarding against the doubtful, which is what the instruction means.", "Toward licence", "Setting aside an opinion that constrains, which nothing in the book supports."],
    misreading: "Do not take this as permission to disregard legal rulings you find inconvenient. It appears in a chapter about a man's compassion for his own religion, and every application of it in the book is more restrictive than the opinion, never less.",
    reflection: "Notice that the sentence only ever costs the person saying it something.",
    audit: ["Which direction do I go past an opinion?", "Has this ever cost me anything?", "Am I judging myself or someone else?", "Where is the doubtful treated?"],
    nodes: ["shubuhat", "wara", "din"],
    model: pair("Two ways past an opinion", "Only one of them is what the sentence means.", [["Toward caution", "Guarding the doubtful, which always costs the one applying it.", "support"], ["Toward licence", "Setting aside a constraint, which nothing here supports.", "warning"]]),
  }),
];

export const book13ConceptNodes: ConceptNode[] = [
  ["kasb", "Earning", "Among the blessings", "A day made for livelihood, named in a list of things given."],
  ["structure", "Five chapters", "Three standards", "Valid, just, excellent — and then the trader himself."],
  ["fadila", "The excellence", "Placed first", "So that the restrictions read as restricting a good thing."],
  ["kifaya", "Communal obligation", "Book 1's category", "Which a tradesman is told to intend about his own work."],
  ["fiqh", "The law of contracts", "Settles validity", "And is what the third chapter opens by saying is not enough."],
  ["adl", "Justice", "Freedom from harm", "The second standard, which validity does not guarantee."],
  ["zulm", "Wrongdoing", "Defined as harm", "General or particular, and not every instance voids a contract."],
  ["ihtikar", "Hoarding", "A general harm", "Withholding food while waiting for a price to rise."],
  ["ghish", "Deceit", "Two names attached", "Concealing a defect makes a man a wrongdoer and a deceiver."],
  ["ihsan", "Excellence", "The profit", "Doing what benefits the other party when it is not owed."],
  ["iqala", "Rescission", "The fifth door", "Accepted because the one asking regrets and is harmed."],
  ["shafaqa", "Compassion", "For himself", "The last chapter's subject: what the trade is doing to the trader."],
  ["din", "Religion", "The capital", "The metaphor applied at the level of a whole life."],
  ["niyya", "Intention", "The first observance", "Abstention from asking, and the sufficing of a household."],
  ["shubuhat", "The doubtful", "Beyond the forbidden", "Guarded against, and the subject of the book that follows."],
  ["wara", "Scruple", "Seek your heart's verdict", "Counsel for a man about himself, and always more restrictive."],
].map(([id, label, kicker, description], index) => ({ id, label, kicker, description, position: ["left", "right", "top", "bottom"][index % 4] }));

const node = (id: string, label: string, micro: string, summary: string, guardrail: string, chapterId: number, glyph: Journey["nodes"][number]["glyph"]): Journey["nodes"][number] => ({ id, label, micro, summary, guardrail, chapterId, glyph });

export const book13Journeys: Journey[] = [
  {
    id: "valid-is-not-enough", number: "01", question: "Is permitted the same as right?", title: "Find the gap the law leaves",
    description: "Take the sentence the third chapter opens on, the technical reason the gap cannot be closed, and the two kinds of harm it opens onto.",
    payoff: "You get a standard that no legal opinion can satisfy for you, and the reason why.",
    image: assetUrl("assets/system/book13-two-standards.jpg"), imageAlt: "A signed and sealed contract lying on a counter beside a small set of unequal weights.", minutes: 12, color: "#278d91",
    nodes: [
      node("three-standards", "See the three", "Valid, just, excellent", "Three chapters, each beginning where the last stops.", "The law of contracts is one of them, not all.", 1, "order"),
      node("the-sentence", "Take the sentence", "Valid, and still a wrong", "A dealing the jurist rules concluded may expose its maker to God's wrath.", "Stated at the opening of the third chapter.", 4, "know"),
      node("the-reason", "Take the reason", "Not every prohibition voids", "A technical fact about contracts, not a complaint about jurists.", "Which is why no stricter opinion closes the gap.", 4, "diagnose"),
      node("defined-as-harm", "Note the standard", "What harms another", "The third chapter's measure is harm, not permission.", "Which makes it checkable against the other party.", 4, "clear"),
      node("hoarding", "Take the first kind", "Waiting for the price", "Withholding food, named a general wrongdoing.", "The harm propagates past the transaction.", 5, "witness"),
      node("learn-the-coin", "Note the inversion", "Not to protect yourself", "Learn the currency so you do not hand someone a debased coin unknowing.", "Competence required for the other party's sake.", 5, "pattern"),
    ],
  },
  {
    id: "capital-and-profit", number: "02", question: "Is being fair the whole of it?", title: "Take the accounting metaphor",
    description: "Follow the obligations of disclosure to their edge, then meet the sentence that reframes the book — and six concrete ways of going past what is owed.",
    payoff: "You get an argument addressed to traders in their own terms, and four doors you can actually walk through.",
    image: assetUrl("assets/system/book13-capital-profit.jpg"), imageAlt: "An open ledger with a column of figures and a second column beside it, only the first column totalled.", minutes: 13, color: "#bf7a35",
    nodes: [
      node("make-it-plain", "Take the obligation", "Hidden and apparent", "Made plain, not merely left discoverable.", "Which forecloses relying on a buyer to notice.", 6, "clear"),
      node("the-caravan", "Note the asymmetry", "Meeting the caravans", "Nothing unfair on the face of it; one party simply knows the market.", "The offence is in the asymmetry, not the terms.", 6, "diagnose"),
      node("the-metaphor", "Take the metaphor", "Capital and profit", "Justice is a cause of deliverance only; excellence is the return.", "Addressed to merchants in their own terms.", 7, "know"),
      node("the-line", "Find the line", "What is owed", "The obligatory falls under justice; excellence is what is not owed.", "Which is where the two chapters divide.", 7, "order"),
      node("rescission", "Take the sharpest door", "Undo a valid sale", "Because the asker regrets it and is harmed by it.", "Framed as an unwillingness rather than a gift.", 8, "witness"),
      node("in-advance", "Note the sixth", "Resolved at the sale", "The risk accepted before it is known, not forgiven after.", "Which is what makes it excellence and not mercy.", 8, "steady"),
    ],
  },
  {
    id: "what-it-does-to-you", number: "03", question: "What is my trade doing to me?", title: "Turn the accounting on the trader",
    description: "Watch the last chapter change subject from counterparties to the trader himself, take seven observances, and end on the most quoted sentence in the book.",
    payoff: "You leave with one behavioural test most people would offer as evidence of diligence, and an instruction that only ever costs you.",
    image: assetUrl("assets/system/book13-two-markets.jpg"), imageAlt: "A shuttered market stall at midday with the street beyond it empty, and an open doorway further down the same street.", minutes: 12, color: "#c25f50",
    nodes: [
      node("the-unnoticed-trade", "Name the transaction", "Bought this world with the next", "A trade a man makes without noticing he has made it.", "The chapter's whole frame.", 9, "diagnose"),
      node("your-capital", "Identify the capital", "His religion", "And compassion for himself is the preserving of it.", "The same accounting, one level up.", 9, "know"),
      node("the-order", "Take the ordering", "Begin with the other share", "You will pass by your share of this world and arrange it.", "Not neglect — a reversal of order.", 9, "order"),
      node("a-fard-kifaya", "Take the second observance", "A town cannot do without it", "Book 1's classification, formed as an intention about your own work.", "Which changes what standing in a shop is.", 10, "pattern"),
      node("first-and-last", "Take the test", "First in, last out", "A behaviour, and therefore checkable.", "Most people would offer it as evidence of diligence.", 10, "witness"),
      node("your-heart", "Take the sentence", "Do not look to the opinions", "Seek the verdict of your own heart.", "Always toward caution, and always at your own cost.", 11, "guard"),
    ],
  },
];

export const book13Movements: TaxonomyGroup[] = [
  ["bab1", "1. The excellence of earning", "Livelihood placed among the blessings rather than the concessions.", [1, 2]],
  ["bab2", "2. The law of transactions", "What makes a contract valid, and what it leaves open.", [3]],
  ["bab3", "3. Justice in dealing", "Valid and still wrong; harms that spread and harms to the other party.", [4, 5, 6]],
  ["bab4", "4. Excellence in dealing", "Capital and profit, and six ways of giving what is not owed.", [7, 8]],
  ["bab5", "5. The trader's compassion for his religion", "Seven observances, ending in the verdict of the heart.", [9, 10, 11]],
].map(([id, label, description, chapterIds], index) => ({ id, label, description, chapterIds, color: ["#bf7a35", "#278d91", "#c25f50", "#586fa8", "#a97837"][index % 5] })) as TaxonomyGroup[];

export const book13Instrument: Instrument = {
  title: "Valid, just, or excellent",
  note: "Ghazali gives three standards and a chapter for each. A transaction the jurist rules concluded may still be a wrong, since not every prohibition voids a contract; justice is freedom from harm, and it runs in trade as capital runs; excellence is what benefits the other party when it is not owed, and it runs as profit runs. Take one real transaction of yours and answer for it.",
  items: [
    {
      id: "deal", label: "One transaction of yours", lede: "A real one, recently, of any size",
      note: "Both questions are his. The first uses his own division of wrongdoing into harm that spreads and harm to the party dealt with; the second uses his six doors of excellence. Note that the first question is not whether the transaction was permitted — his third chapter opens by saying that is a different question.",
      axes: [
        {
          id: "harm", kicker: "Justice", question: "Was anyone harmed by it?",
          options: [
            { id: "none", label: "No — nobody was worse off", note: "Which is what his second standard requires: that a man not harm his brother." },
            { id: "spread", label: "It pushed a cost onto people generally", note: "His first division: hoarding, and the passing on of debased coin." },
            { id: "party", label: "The other party came off worse than they knew", note: "His second division, which includes cases with no unfair term at all." },
            { id: "unsure", label: "It was permitted, and I am uneasy anyway", note: "The exact case his sixth observance addresses." },
          ],
        },
        {
          id: "beyond", kicker: "Excellence", question: "Was there anything in it beyond what was owed?",
          options: [
            { id: "door", label: "Yes — I gave something not owed", note: "One of his six doors: the margin, bearing a loss, a rescission, credit without demand." },
            { id: "fair", label: "No — it was straightforwardly fair", note: "Justice, which he says runs in trade as capital runs." },
            { id: "max", label: "I took everything the terms allowed", note: "Which the law permits, and which the first of his six doors addresses." },
            { id: "never", label: "I had not thought of that as a category", note: "Which is what the fourth chapter exists to introduce." },
          ],
        },
      ],
      verdicts: [
        { key: "unsure|*", name: "Seek the verdict of your heart", role: "balance", chapterId: 11, body: "This is the case his sixth observance is written for: that a man not confine himself to avoiding the forbidden, but guard against the places of doubt and the occasions of suspicion — and let him not look to the legal opinions, but seek the verdict of his own heart.", action: "Note which direction the instruction runs. It appears among the things by which a trader guards his own religion, and every application of it in the book is more restrictive than the opinion, never less — so it costs the person applying it and licenses nothing. Book 14 follows immediately and is largely about how much scruple the doubtful actually requires, and where scruple itself becomes excess." },
        { key: "spread|*", name: "The harm that does not stop", role: "warning", chapterId: 5, body: "His first division is the wrongs whose harm is general, and both his examples work the same way: hoarding food while waiting for the price to rise, and passing debased coin, which the person paid will only pass on again. The damage propagates past the transaction that caused it.", action: "The obligation he attaches is worth taking in his own terms: it is incumbent on a merchant to learn the currency — not so that he may be exacting for himself, but so that he does not hand someone a bad coin unknowing. Competence is required for the other party's protection. And his fourth rule on coin has the trader absorb the bad one himself, to end the chain rather than extend it." },
        { key: "party|*", name: "Justice is defined as harm", role: "warning", chapterId: 6, body: "His rule is as broad as a rule can be: everything by which the party dealt with is harmed is a wrongdoing, and justice is that a man not harm his brother. And the disclosure obligation admits no exception — that he make plain all the defects, the hidden and the apparent, and conceal nothing.", action: "Notice that his examples include cases with no unfair term and nothing concealed. Meeting the caravans is forbidden because one party knows the market and the other has not had time to learn it, which locates the offence in an asymmetry. The question is not whether you misled anyone but whether they came off worse for something you knew." },
        { key: "none|door", name: "Capital and profit both", role: "support", chapterId: 7, body: "You have his second standard and his third. Justice, he says, is a cause of deliverance only, and it runs in trade as capital runs; excellence is a cause of winning, and it runs as profit runs. A transaction with both is the only kind that returns anything on his accounting.", action: "The doors are worth knowing as a set, since most people use one and never notice the others: the margin kept within what is customarily overlooked, bearing a loss from a weak or poor counterparty, accepting a rescission from anyone who asks it, and selling on credit to the poor while resolving at the time not to demand payment." },
        { key: "none|fair", name: "Capital preserved, and nothing more", role: "balance", chapterId: 7, body: "His argument here is addressed to traders in their own terms, and it is the sentence the book is remembered for. Justice runs in trade as capital runs — and nobody who trades regards recovering his capital as a successful year. So it does not befit a religious man to confine himself to justice and leave the doors of excellence.", action: "The line between the two chapters is drawn at what is owed: excellence is doing what benefits the other party when it is not obligatory but is a favour. Six doors are given, and the fifth is the sharpest — accepting a rescission from whoever asks it, because no one asks except one who regrets and is harmed, and it does not befit a man to be content to be the cause of someone's harm." },
        { key: "none|max", name: "Permitted, and the first door", role: "balance", chapterId: 8, body: "Taking what the terms allow is not a wrong on his account — he says plainly that the taking of a margin is permitted, and locates the excellence in its size rather than in its absence. The first of his six doors is exactly this: that a man not take from his counterpart a margin beyond what is customarily overlooked.", action: "So the question his chapter puts is not whether you were entitled but what the entitlement cost the other party. And if the margin was within what is ordinarily overlooked, the other five doors are still open — bearing a loss, accepting a rescission, and the rest are all available on a transaction where nothing was taken unfairly." },
        { key: "none|never", name: "The category the fourth chapter adds", role: "support", chapterId: 7, body: "Which is what the chapter exists for. Most treatments of commerce stop at what is permitted and what is fair, and Ghazali's fourth chapter argues that stopping there is like a merchant who ends his year having exactly recovered his stake — technically no worse off, and nobody would call it a good year.", action: "Start with the two most concrete doors, since both are decisions rather than dispositions. Accept a rescission from anyone who asks for one; and where you extend credit to someone poor, decide at the time of the sale whether you will pursue it — the resolve formed in advance is what makes it excellence rather than mercy after a failure." },
        { key: "*|*", name: "Read the two standards together", role: "balance", chapterId: 1, body: "Harm, and what went beyond what was owed. Ghazali's three chapters are three standards, and each begins by saying what the one before it does not settle: validity does not settle justice, and justice does not settle excellence.", action: "Take them in that order, since each is a condition of the next being worth asking. And keep his fifth chapter in view, because it turns the same accounting on you: the trader's capital is his religion, and the danger is buying the life of this world with the hereafter in a transaction he never notices making." },
      ],
    },
  ],
};

export const book13Sources: SourceLink[] = [
  { label: "Primary Arabic text", note: "The complete public Arabic of Book 13 was read and used to establish the five chapters, the distinction between validity and justice, the accounting of justice and excellence, and the seven observances of the last chapter.", url: "https://shamela.ws/book/9472/420" },
  { label: "The excellence of earning", note: "The chapter gathering the verses and reports urging toward earning, opening on the verse that names the day as made for livelihood.", url: "https://shamela.ws/book/9472/421" },
  { label: "The law of transactions", note: "The chapter on sale, usury, the forward sale, hire, silent partnership, and partnership, with the conditions the Law lays on each.", url: "https://shamela.ws/book/9472/424" },
  { label: "Justice in dealing", note: "The passage stating that a valid contract may still contain a wrong, since not every prohibition voids a contract, and dividing wrongdoing into general and particular harm.", url: "https://shamela.ws/book/9472/432" },
  { label: "Excellence in dealing", note: "The passage making justice run in trade as capital runs and excellence as profit runs, and giving the six ways excellence is attained.", url: "https://shamela.ws/book/9472/439" },
  { label: "The trader's compassion", note: "The chapter turning to what the trade does to the trader, with the seven observances and the instruction to seek the verdict of one's own heart.", url: "https://shamela.ws/book/9472/443" },
  { label: "Forty-book structure", note: "Ghazali.org's listing places Book 13 as the third book of the Quarter of Customs and confirms its title.", url: "https://www.ghazali.org/listing-the-forty-books/" },
];

export const book13: SystemBook = {
  id: 13,
  title: "The Etiquette of Earning",
  shortTitle: "Earning",
  defaultJourneyId: "valid-is-not-enough",
  chapters: book13Chapters,
  conceptNodes: book13ConceptNodes,
  journeys: book13Journeys,
  sources: book13Sources,
  taxonomy: {
    title: "Five chapters, three standards",
    note: "Ghazali's own five. The middle three are a single ascending argument — what the law allows, what justice requires beyond it, and what excellence adds beyond that — and each of them opens by saying what the previous one does not settle.",
    groups: book13Movements,
  },
  instrument: book13Instrument,
  editorialNote: "The three journeys, eleven reading sections, visual models, and diagnostic are editorial learning aids. The sections follow Ghazali's five chapters in his order and are grouped under them in the movements list. The English is an original synthesis made from a reading of the public Arabic text, not a translation and not a substitute for one. Reports and inherited anecdotes are presented as material Ghazali transmitted; this prototype does not independently grade every narration, and the printed Arabic marks several of those used here — including the reports on hoarding — with the graders' notes. One matter of scope: the second chapter is contract law, covering sale, usury, the forward sale, hire, and the forms of partnership, and its rulings vary between the schools and were framed for the instruments of eleventh-century commerce. This edition presents what that chapter settles and what it deliberately leaves open, and reproduces none of its rulings; nothing here should be used to determine whether any transaction is lawful, which is the business of a work of law and of qualified guidance. Ghazali's instruction to seek the verdict of one's own heart rather than looking to the legal opinions is given with the context that governs it: it appears as the sixth of seven observances by which a trader guards his own religion, every application of it in the book is more restrictive than the opinion rather than less, and it is counsel for a person deciding about himself. It is not a warrant for disregarding rulings, and it gives no one standing to judge another. The diagnostic applies his own two standards to a transaction the reader supplies and cannot pronounce on anyone's dealings.",
};
