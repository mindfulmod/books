import { assetUrl } from "./assetUrl";
import type { Chapter, ConceptNode, VisualModel } from "./data";
import type { Instrument, Journey, SourceLink, SystemBook, TaxonomyGroup } from "./systemTypes";

type Seed = { id: number; shortTitle: string; formalTitle: string; overview: string; thesis?: string; moves: Array<{ title: string; body: string }>; closer: Array<{ title: string; body: string }>; distinction: [string, string, string, string, string]; misreading: string; reflection: string; audit: string[]; nodes: string[]; model: VisualModel };
const bab = (id: number) => (id <= 8 ? "the first chapter, on the encouragement toward marriage and away from it" : id === 9 ? "the second chapter, on the contract" : "the third chapter, on living together");
const makeChapter = (seed: Seed): Chapter => ({
  id: seed.id, shortTitle: seed.shortTitle, formalTitle: seed.formalTitle, overview: seed.overview,
  points: seed.moves.slice(0, 3).map((m) => m.body), reflection: seed.reflection, relatedNodes: seed.nodes, visualModel: seed.model,
  deep: { thesis: seed.thesis ?? seed.moves[0].body, context: seed.overview, moves: seed.moves, closeReading: seed.closer,
    distinction: { title: seed.distinction[0], firstLabel: seed.distinction[1], first: seed.distinction[2], secondLabel: seed.distinction[3], second: seed.distinction[4] },
    misreading: seed.misreading, observation: seed.reflection, selfAudit: seed.audit,
    sourceAnchor: `Book 12, ${bab(seed.id)}, ${seed.formalTitle}.` },
});
const chain = (title: string, caption: string, items: Array<[string, string, "support" | "balance" | "warning"]>): VisualModel => ({ kind: "chain", title, caption, items: items.map(([label, body, role]) => ({ label, body, role })) });
const pair = (title: string, caption: string, items: Array<[string, string, "support" | "balance" | "warning"]>): VisualModel => ({ kind: "pair", title, caption, items: items.map(([label, body, role]) => ({ label, body, role })) });
const spectrum = (title: string, caption: string, items: Array<[string, string, "support" | "balance" | "warning"]>): VisualModel => ({ kind: "spectrum", title, caption, items: items.map(([label, body, role]) => ({ label, body, role })) });

export const book12Chapters: Chapter[] = [
  makeChapter({
    id: 1, shortTitle: "A disagreement", formalTitle: "That the scholars differed",
    overview: "The book opens not on a recommendation but on a dispute, and Ghazali sets out three standing positions before taking any of them.",
    thesis: "The book opens on a disagreement rather than a recommendation, and Ghazali reports both sides at strength.",
    moves: [
      { title: "Give the first position", body: "The scholars have differed about the merit of marriage. Some went so far as to claim that it is better than devoting oneself to the worship of God." },
      { title: "Give the second", body: "Others acknowledged its merit but placed devoting oneself to worship above it — so long as the soul does not long for marriage with a longing that disturbs the state and calls to intercourse." },
      { title: "Give the third", body: "Others said: the better thing in this time of ours is leaving it. It had a merit before, when earnings were not restricted and women's characters were not blamed." },
      { title: "Note what the opening does", body: "A book on the etiquette of marriage begins by reporting that serious people held that not marrying is better, and does not dismiss the position. Everything that follows is an attempt to adjudicate rather than to advocate." },
    ],
    closer: [
      { title: "The third position is of its moment", body: "It is explicitly a claim about a time — earnings restricted, characters declined — rather than about marriage. Ghazali reports it as an argument about circumstances, which is how the book handles it and how it should be read." },
      { title: "Why the disagreement matters for the method", body: "A settled question would be answered by rulings. An open one has to be answered by weighing, and the next section says exactly what will be weighed and for whom." },
    ],
    distinction: ["Two ways to open a book on marriage", "With the dispute", "Three positions reported, including that leaving it is better, and none dismissed.", "With the encouragement", "Which would make the chapter's weighing of harms an awkward afterthought."],
    misreading: "Do not read the third position as Ghazali's own. He reports it among three and then supplies a method for deciding, and his method's answers depend on the person rather than on the age.",
    reflection: "Notice that the disagreement is reported without embarrassment, and that one side of it is the one nobody expects.",
    audit: ["Which position did I assume was held?", "Is the third about marriage or about a time?", "What would settle this?", "Is the question open or closed?"],
    nodes: ["nikah", "khilaf", "structure"],
    model: spectrum("Three positions", "Reported, and none dismissed.", [["Better than devotion", "Some went to that length.", "balance"], ["Below devotion", "Unless the soul's longing disturbs the state.", "balance"], ["Better left, now", "A claim about a time rather than about marriage.", "balance"]]),
  }),
  makeChapter({
    id: 2, shortTitle: "For whom", formalTitle: "The method the chapter announces",
    overview: "The sentence that governs the whole book, and it makes the answer depend on the person asking rather than on the subject.",
    thesis: "One sentence governs the whole book: the answer differs from person to person, so the question is never simply whether marriage is good.",
    moves: [
      { title: "State the order of business", body: "The truth in it is not disclosed except by our first presenting what has come in the reports encouraging toward it and away from it — then explaining the benefits of marriage and its harms." },
      { title: "Give the purpose", body: "So that from them the merit of marriage, and of leaving it, becomes clear in the case of everyone who is safe from its harms or is not safe from them." },
      { title: "Note what that commits him to", body: "There will be no single answer. The chapter will produce a weighing, and the weighing will come out differently for different people according to which harms they are exposed to." },
      { title: "Note the symmetry", body: "Reports are gathered on both sides — encouraging toward it and away from it — and benefits and harms are both enumerated. The chapter is built so that either conclusion can come out of it." },
    ],
    closer: [
      { title: "Why per-person rather than general", body: "The three positions in the previous section are all general claims, and the disagreement between them is what a general claim produces. Ghazali does not adjudicate between them; he replaces the general question with a personal one, which is why the chapter ends in worked cases rather than in a ruling." },
      { title: "The pattern in the Ihya", body: "Book 33 does the same with fear and hope: neither is superior in itself, and the question is which a person needs now. Book 34 does it with poverty and wealth, comparing only matched cases. This chapter applies the method to marriage." },
    ],
    distinction: ["Two questions that can be asked", "Is it better for me", "Answered by weighing benefits against the harms a particular person faces.", "Is it better", "A general question, which produced three incompatible answers among the scholars."],
    misreading: "Do not look for a verdict in this chapter. It says in advance that it is producing a method, and its conclusions are stated for cases rather than for everyone.",
    reflection: "Notice that the chapter promises to make both answers available, and ask which one you expected.",
    audit: ["Which question am I asking?", "Which harms am I exposed to?", "Did I want a verdict?", "Where else does the Ihya do this?"],
    nodes: ["mizan", "nikah", "khilaf"],
    model: pair("Two questions", "The chapter replaces one with the other.", [["Is it better", "General, and what produced three incompatible positions.", "warning"], ["Is it better for me", "Weighed against the harms this person faces.", "support"]]),
  }),
  makeChapter({
    id: 3, shortTitle: "The root", formalTitle: "The first benefit: the child",
    overview: "The first of five benefits, and Ghazali gives it a status the other four do not have.",
    thesis: "The first benefit is given a standing the other four do not have, which is why it is treated alone.",
    moves: [
      { title: "Name it", body: "The first benefit is the child." },
      { title: "Give its status", body: "It is the root, and for it marriage was instituted." },
      { title: "Give the aim", body: "The aim is the preservation of the lineage, and that the world not be empty of the human kind." },
      { title: "Note what follows from the status", body: "Being the root means it is the benefit against which the harms are weighed first, and the closing case of the chapter is exactly that weighing — a person whose only benefit is this one, against a person who faces the strongest harm." },
    ],
    closer: [
      { title: "Why the aim is stated at the level of the world", body: "Not the continuation of a family or a name but that the world not be empty of the human kind. The benefit is described at the widest possible scope, which is what makes it the root — and which is also what makes it vulnerable in the weighing, since a general good is a weak counterweight to a particular harm." },
      { title: "How the chapter later handles it", body: "In the closing case Ghazali will say that marriage for the sake of a child is an effort in seeking a life for a child that is only supposed, against a deficiency in religion that is immediate. The root benefit does not automatically win, and he says why." },
    ],
    distinction: ["Two scopes for one benefit", "The world", "That the human kind not fail, which is how the aim is stated.", "A household", "A family continued, which is not the level at which Ghazali pitches it."],
    misreading: "Do not read the status of root as making it decisive. Ghazali gives it that status and then, in the same chapter, weighs it against a harm and finds it insufficient in a specific case.",
    reflection: "Notice that the reason given is about the world rather than about a person's own life.",
    audit: ["At what scope is this a benefit?", "Is it the root for me?", "What would it be weighed against?", "Does root mean decisive?"],
    nodes: ["walad", "fawaid", "nikah"],
    model: pair("Two ways to hold the first benefit", "The chapter uses the first and tests it.", [["As the root", "The purpose for which marriage was instituted.", "support"], ["As decisive", "Which the closing case explicitly denies.", "warning"]]),
  }),
  makeChapter({
    id: 4, shortTitle: "Fortification, and rest", formalTitle: "The second and third benefits",
    overview: "Two benefits that concern the person rather than the world, and the second of them is unexpectedly warm.",
    thesis: "The second and third benefits concern what marriage does to the person rather than what it produces.",
    moves: [
      { title: "Give the second", body: "Fortification against the devil, breaking the urge, repelling the harms of appetite, lowering the gaze, and guarding the private parts." },
      { title: "Note its structure", body: "It is stated as a set of five effects rather than one, and it is the benefit that will decide the chapter's second worked case — where a person who fears for himself is told that marriage is better." },
      { title: "Give the third", body: "Refreshing the soul and giving it comfort, by sitting together, by looking, and by playing." },
      { title: "Give its reason", body: "As a rest for the heart and a strengthening of it for worship. The comfort is not defended as a permitted indulgence but as something that makes the rest of the practice possible." },
    ],
    closer: [
      { title: "Why the third benefit is placed as it is", body: "It is the same principle as Book 10's account of the litanies: the soul was created with weariness in it and will not endure one pattern, so of the necessity of kindness toward it is that it be given rest. The third benefit is that principle applied to a marriage." },
      { title: "What separates the second from the third", body: "The second removes a danger and the third supplies a good. A reader weighing his own case needs to know which he is claiming, because only the second carries the weight that overturns the strongest harm in the chapter's second worked case." },
    ],
    distinction: ["Two benefits to the person", "Fortification", "Removing a danger — the one that decides a worked case later in the chapter.", "Rest", "Supplying a good, so that the heart is strengthened for worship."],
    misreading: "Do not treat the third benefit as a concession. Ghazali gives it a reason of its own — that it strengthens the heart for worship — which places it among the things that serve the practice rather than among the things it tolerates.",
    reflection: "Ask which of these two you would actually be claiming, if you claimed either.",
    audit: ["Which of the two applies to me?", "Am I removing a danger or supplying a good?", "Does my heart need rest?", "Which one carries weight in the weighing?"],
    nodes: ["fawaid", "shahwa", "rawh"],
    model: pair("Two benefits, two functions", "Only one of them overturns a harm later.", [["Fortification", "Removing a danger: the urge, the gaze, the harms of appetite.", "support"], ["Rest", "Supplying a good, and strengthening the heart for worship.", "support"]]),
  }),
  makeChapter({
    id: 5, shortTitle: "And two more", formalTitle: "The fourth and fifth benefits",
    overview: "The last two benefits, and the fifth is the one that reverses the direction of everything before it.",
    thesis: "The fifth benefit reverses the direction of the argument: what looks like a burden is counted as the gain.",
    moves: [
      { title: "Give the fourth", body: "Freeing the heart from the managing of the house, and from taking on the work of cooking, sweeping, spreading, cleaning the vessels, and preparing what is needed." },
      { title: "Note what it assumes", body: "It describes an arrangement in which that work is done by someone else, and it counts the freeing of one person from it as a benefit to him. It is a description of a household of Ghazali's time and place." },
      { title: "Give the fifth", body: "Striving against the soul and training it — by care and guardianship, by fulfilling the rights of the household, by patience with their character, by bearing their harm, and by working for their welfare." },
      { title: "Note the reversal", body: "The first four benefits are things a person receives. The fifth is a difficulty, counted as a benefit because of what it trains — which is the only item in the list that is good by being hard." },
    ],
    closer: [
      { title: "Why the fifth matters to the weighing", body: "It is the same material as the second harm. Falling short of fulfilling their rights and patience with their character appears among the harms; bearing it appears among the benefits. The identical circumstance is a benefit to one who can carry it and a harm to one who cannot, which is the clearest instance of the chapter's per-person method." },
      { title: "The fourth benefit and this edition", body: "The fourth describes a division of household labour that was assumed in its setting and is stated from one side only. This edition reports it as Ghazali's, notes what it assumes, and does not present it as an account of what a household should be." },
    ],
    distinction: ["Two ways one circumstance appears", "As the fifth benefit", "Bearing the rights and the character of a household, which trains the soul.", "As the second harm", "Falling short of exactly those things, for one who cannot carry them."],
    misreading: "Do not read the fifth benefit as recommending difficulty. It is counted a benefit for what it produces in one who can sustain it, and the same circumstance is listed as a harm two sections later for one who cannot.",
    reflection: "Notice that one of the five benefits is identical to one of the three harms, and that the difference is the person.",
    audit: ["Could I carry the fifth?", "Is that a benefit or a harm for me?", "What does the fourth assume?", "Which items am I receiving and which am I bearing?"],
    nodes: ["fawaid", "mujahada", "bayt"],
    model: pair("The fifth benefit and the second harm", "The same circumstance, sorted by the person.", [["A benefit", "Borne, and training the soul by the bearing.", "support"], ["A harm", "Fallen short of, for one who cannot sustain it.", "warning"]]),
  }),
  makeChapter({
    id: 6, shortTitle: "The strongest", formalTitle: "The first harm",
    overview: "Three harms are given, and the first is named as the strongest of them — and it is entirely economic.",
    thesis: "Three harms, and the first is named the strongest — which sets up the weighing rather than settling it.",
    moves: [
      { title: "Name it", body: "The first, and it is the strongest of them, is the inability to seek the lawful." },
      { title: "Give the reason", body: "For that is not easy for everyone, especially in these times with the disturbance of livelihoods. So marriage becomes a cause for expanding the seeking and for feeding from the unlawful — and in that is his destruction and the destruction of his household." },
      { title: "Contrast the two states", body: "The celibate is safe from that. As for the married man, in most cases he enters into evil entrances, follows his wife's desire, and sells his hereafter for his world." },
      { title: "Give the report", body: "A servant is stopped at the Balance with good deeds like mountains, and is asked about the care of his household and about his wealth — where he earned it and in what he spent it — until those demands consume all his deeds and no good deed remains." },
    ],
    closer: [
      { title: "Why the strongest harm is economic", body: "Not temperament, not distraction, not the difficulty of another person — but the pressure that a household puts on how a man earns. Ghazali locates the greatest danger of marriage in what it does to the lawfulness of income, which connects this book directly to Book 14 on the lawful and the unlawful." },
      { title: "The clause about the times", body: "Especially in these times with the disturbance of livelihoods. The harm is stated as general and its severity as circumstantial, which is the same structure as the third scholarly position in the opening section." },
    ],
    distinction: ["Two things a household can cost", "The lawfulness of the earning", "Which Ghazali names the strongest harm and grounds in a pressure on income.", "Time and attention", "Which is his third harm, and which he ranks below this one."],
    misreading: "Do not read the report about the Balance as blaming a family. Its subject is the man's own answering for what he earned and how he spent it, and the harm named is a pressure on him rather than a fault in them.",
    reflection: "Ask what pressure your obligations put on how you earn, and whether you have ever noticed it acting.",
    audit: ["What pressure am I under?", "Has it changed how I earn?", "Whose desire am I following?", "Where is this treated at length?"],
    nodes: ["afat", "halal", "kasb"],
    model: chain("How the strongest harm works", "The pressure is on the earning.", [["A household to keep", "Which expands what must be sought.", "balance"], ["Seeking expands", "Especially where livelihoods are disturbed.", "warning"], ["The lawful gives way", "And in that is his destruction and his household's.", "warning"]]),
  }),
  makeChapter({
    id: 7, shortTitle: "And two more", formalTitle: "The second and third harms",
    overview: "The remaining two harms, ranked below the first, and the third has a further stage that Ghazali adds separately.",
    thesis: "The remaining harms are ranked below the first, and the third carries a further condition of its own.",
    moves: [
      { title: "Give the second", body: "Falling short of fulfilling their rights, and patience with their character, and bearing harm from them — and this is below the first in strength." },
      { title: "Note the symmetry again", body: "It is the fifth benefit stated as a failure. What trains a person who can carry it damages a person who cannot, and the ranking below the first harm reflects that it depends on the person rather than on circumstances." },
      { title: "Give the third", body: "That the household and the child become an occupier from God and a puller toward the world — and this is below the first and the second." },
      { title: "Give the further stage", body: "Beyond that, that it call him to the enjoyment of the permitted, and then to excess in playing with women and keeping their company — so that the harm is not the forbidden but the permitted taken past its measure." },
    ],
    closer: [
      { title: "Why the third harm is ranked lowest", body: "Because what it names is not a fault but a pull, and because its object is permitted. Ghazali ranks the harms by how far each carries a person from what is lawful, and this one begins inside the lawful and only becomes a harm at excess." },
      { title: "The measure principle again", body: "Book 1 sorted knowledge into three classes, one of which is praised only to a measure of sufficiency, on the analogy of giving that becomes extravagance. The third harm is that class applied to a marriage, and it is the same argument." },
    ],
    distinction: ["Two ways a permitted thing becomes a harm", "By excess", "Taken past its measure, which is the third harm's further stage.", "By being forbidden", "Which is the first harm, and which is why that one is ranked strongest."],
    misreading: "Do not read the third harm as suspicion of ordinary affection. What is named is excess, and Ghazali counts the same affection among the benefits two sections earlier as a rest for the heart.",
    reflection: "Notice that the same thing appears as the third benefit and as the third harm, separated only by measure.",
    audit: ["Which of the three am I exposed to?", "Is my case about excess or about the forbidden?", "Can I carry the second?", "Where is measure treated?"],
    nodes: ["afat", "huquq", "measure"],
    model: spectrum("Three harms, ranked", "By how far each carries a person from the lawful.", [["The unlawful earning", "The strongest, and the only one that leaves the lawful outright.", "warning"], ["Falling short of rights", "Below it, and dependent on the person.", "warning"], ["The pull, and then excess", "Lowest, and beginning inside the permitted.", "balance"]]),
  }),
  makeChapter({
    id: 8, shortTitle: "Profit and capital", formalTitle: "The weighing, in worked cases",
    overview: "The chapter's conclusion, and it is not a verdict but two worked cases — the first of which comes out against marriage.",
    thesis: "The chapter ends in two worked cases that come out differently, which is the method rather than a failure to decide.",
    moves: [
      { title: "Set the first case", body: "Whoever is not in distress from appetite, and the benefit of his marriage would be the effort to obtain a child, and the harm is the need to earn the unlawful and the occupation from God — then celibacy is better for him." },
      { title: "Give the reason", body: "There is no good in anything that takes you away from God, and none in earning unlawfully — and having a child does not make up for either." },
      { title: "Give the accounting", body: "Marriage for the sake of a child is an effort in seeking a life for a child that is only supposed, and this is a deficiency in religion that is immediate. So his preserving of his own life and guarding it from destruction is more important than the effort for a child — and that is profit, and religion is capital." },
      { title: "Set the second case", body: "But if wanting a child is joined to a real need to break appetite, because the desire is strong — then it has to be weighed. If the bridle of godfearing is not strong in his head and he fears fornication for himself, then marriage is better for him." },
    ],
    closer: [
      { title: "The accounting metaphor", body: "That is profit, and religion is capital. A supposed future good weighed against an immediate deficiency, and the deficiency touches the capital rather than the return — which is why the arithmetic comes out as it does even though the benefit at stake was called the root." },
      { title: "What the two cases establish", body: "That both answers are available, and that what moves a case from one to the other is a fact about the person: whether he is in distress from appetite, and whether he fears for himself. The chapter's promise in its second section is kept exactly." },
    ],
    distinction: ["Two things the weighing compares", "A supposed good", "The life of a child not yet existing, sought by effort.", "An immediate deficiency", "In religion, which is capital rather than profit."],
    misreading: "Do not generalise the first case. It is stated for a person with no distress from appetite who faces the strongest harm, and Ghazali immediately gives a second case that comes out the other way.",
    reflection: "Notice that a book on the etiquette of marriage contains a worked case concluding that celibacy is better.",
    audit: ["Which case is mine?", "Am I in distress from appetite?", "Is my strong harm present?", "Profit or capital — which is at stake?"],
    nodes: ["mizan", "uzuba", "afat"],
    model: pair("Two worked cases", "What moves between them is a fact about the person.", [["No distress, strongest harm", "Celibacy is better for him.", "balance"], ["Distress, and fear for himself", "Marriage is better for him.", "balance"]]),
  }),
  makeChapter({
    id: 9, shortTitle: "The contract", formalTitle: "What the second chapter covers",
    overview: "Having decided whether, the book turns to how — and the second chapter is legal where the first was deliberative.",
    thesis: "Having settled whether, the book turns to how — and that chapter is legal in a way this edition presents in outline only.",
    moves: [
      { title: "Name the subject", body: "The manners observed in the contract and in the two contracting parties — the elements and conditions by which a contract is concluded, and what is observed of the woman's circumstances." },
      { title: "Note the two halves", body: "One half is the law of the contract: what makes it valid, who may conclude it, and what must be present. The other is the qualities Ghazali recommends looking for, which are counsel rather than conditions." },
      { title: "Note the difference in force", body: "The first half binds and the second does not. Reading a recommendation as a condition of validity is the standing error with this kind of material, and the chapter's own division marks the line." },
      { title: "Note what this edition does", body: "The legal content varies between the schools of law, and the recommendations are addressed to circumstances very unlike a modern reader's. This section presents the division and its force, and reproduces neither." },
    ],
    closer: [
      { title: "The pattern in the quarter", body: "Book 11 placed a condition on the food before giving manners for eating it. This chapter places the law of the contract before the manners of a marriage. In both cases what binds comes first and is marked off from what is advised." },
      { title: "Why the recommendations are not carried here", body: "They are lists of qualities to prefer, written for a society whose arrangements differ from the reader's at nearly every point. Presenting them as guidance would misrepresent both them and their setting, and this edition says so rather than quietly omitting them." },
    ],
    distinction: ["Two kinds of content in one chapter", "What binds", "The elements and conditions of a valid contract, which are law.", "What is advised", "Qualities recommended, which are counsel and which are of their setting."],
    misreading: "Do not take any recommendation in this chapter as a condition of a valid marriage. The chapter itself separates the two, and the legal questions belong to a work of law and to qualified guidance.",
    reflection: "Notice how easily advice hardens into a requirement when the two are printed together.",
    audit: ["Am I reading law or counsel?", "Which of these binds?", "Whose circumstances is this addressed to?", "Where would the legal answer come from?"],
    nodes: ["aqd", "fiqh", "nikah"],
    model: pair("Two halves, two forces", "The chapter's own division marks the line.", [["The contract", "Elements and conditions; law, and binding.", "support"], ["The qualities", "Counsel, addressed to a particular setting.", "balance"]]),
  }),
  makeChapter({
    id: 10, shortTitle: "Both sides", formalTitle: "What the third chapter covers",
    overview: "The longest chapter of the book treats the marriage itself, and its structure is the most important thing about it: it examines both parties.",
    thesis: "The longest chapter treats the marriage itself, and much of it addresses an eleventh-century world directly.",
    moves: [
      { title: "Name the subject", body: "The manners of living together, and what runs through the duration of the marriage — and the examination of what is upon the husband and what is upon the wife." },
      { title: "Note the division", body: "Duties are set out on both sides, in order, rather than the obligations of one party being treated as the subject and the other as its object." },
      { title: "Note the length", body: "It is the longest chapter in the book, longer than the deliberation and the contract together, which reflects that most of a marriage is its duration rather than its beginning." },
      { title: "Note what it includes", body: "Provision, conduct, the division of attention, the handling of disagreement, and the circumstances of separation — the whole span the chapter's title names, from the contract to the parting." },
    ],
    closer: [
      { title: "The setting the chapter is written in", body: "Its detailed counsel assumes the household arrangements, legal framework, and social expectations of eleventh-century Khurasan, and a good deal of what it says about the conduct of a marriage — including about the treatment of women — reflects those assumptions and would be harmful if taken as guidance now. This edition presents the chapter's structure and does not reproduce its counsel." },
      { title: "What is worth carrying from its structure", body: "That the duties are enumerated on both sides. Whatever is thought of the content, the chapter is built on the premise that a marriage places obligations on each party toward the other, and that both sets have to be set out." },
    ],
    distinction: ["Two ways to treat a marriage", "Duties on both sides", "Each party examined in turn, which is how the chapter is built.", "One party's obligations", "With the other as their object, which the chapter's own structure refuses."],
    misreading: "Do not take this chapter's counsel as guidance for a marriage. It is addressed to a society very unlike a modern reader's, parts of it concern the treatment of women in ways that reflect its time and would do harm if followed, and this edition presents its shape rather than its instructions.",
    reflection: "Notice that the structure — duties on both sides — is separable from the content, and outlasts it.",
    audit: ["What is the chapter's structure?", "Whose setting is its counsel written for?", "What is separable from what?", "Where would guidance come from now?"],
    nodes: ["muashara", "huquq", "nikah"],
    model: pair("Structure and content", "The first is separable from the second.", [["Duties on both sides", "The premise the chapter is built on.", "support"], ["The counsel itself", "Addressed to a particular society, and not carried here.", "warning"]]),
  }),
  makeChapter({
    id: 11, shortTitle: "What is left open", formalTitle: "What the book does and does not settle",
    overview: "The book closes, and what it has established is a method rather than an answer — which is what its opening promised.",
    thesis: "What the book actually establishes is a method for a personal question, not an answer to a general one.",
    moves: [
      { title: "Say what it settled", body: "That the question is open among the scholars; that it is answered by weighing five benefits against three harms; and that the answer differs by person, since the same circumstance appears in both lists." },
      { title: "Say what it did not", body: "It gives no general verdict. Its two worked cases come out on opposite sides, and the fact that moves between them is a fact about the person rather than about marriage." },
      { title: "Note the honesty of the first case", body: "A book on the etiquette of marriage contains a case concluding that celibacy is better, argued in the same accounting the rest of the chapter uses. That is not a rhetorical concession; it is the method producing an answer." },
      { title: "Note where the reader is left", body: "With a list to apply to himself, a ranking of the harms, and an accounting metaphor for weighing a supposed good against an immediate loss." },
    ],
    closer: [
      { title: "Why the method outlasts the counsel", body: "The detailed advice in the second and third chapters is bound to its setting. The weighing in the first is not: five benefits, three harms ranked by how far each carries a person from the lawful, and an answer that depends on the person is a procedure that survives the circumstances it was written in." },
      { title: "Where the quarter goes next", body: "Earning follows, and then the lawful and the unlawful — which is where the strongest harm of this book is treated at length. The order is deliberate: the greatest danger Ghazali names in marriage is a pressure on income, and the next books are about income." },
    ],
    distinction: ["Two things a book like this can leave", "A method", "A weighing that can be applied by a reader to his own case, and that outlasts its setting.", "A verdict", "An answer for everyone, which the opening disagreement shows cannot be given."],
    misreading: "Do not take the absence of a verdict as evasion. The second section states in advance that the chapter is producing a per-person answer, and the worked cases deliver exactly that.",
    reflection: "Ask which of the five benefits and which of the three harms are actually yours, and let the arithmetic be as uncomfortable as it is.",
    audit: ["Which benefits are mine?", "Which harms?", "Which case do I resemble?", "What did I want the book to say?"],
    nodes: ["mizan", "structure", "kasb"],
    model: chain("What the reader is left with", "A procedure rather than a conclusion.", [["Five benefits", "Applied to his own case.", "support"], ["Three harms", "Ranked by distance from the lawful.", "support"], ["An accounting", "A supposed good against an immediate deficiency.", "balance"], ["No verdict", "Which the opening promised and the worked cases deliver.", "support"]]),
  }),
];

export const book12ConceptNodes: ConceptNode[] = [
  ["nikah", "Marriage", "An open question", "Three scholarly positions reported, including that leaving it is better."],
  ["khilaf", "The disagreement", "Not dismissed", "A general question that produced incompatible general answers."],
  ["structure", "Three chapters", "Deliberate, legal, practical", "Whether, then how it is contracted, then how it is lived."],
  ["mizan", "The weighing", "Per person", "Five benefits against three harms, answered differently for different people."],
  ["fawaid", "Five benefits", "One of them is a difficulty", "The child, fortification, rest, the household, and striving."],
  ["walad", "The child", "The root", "Stated at the scope of the world, and not decisive in the weighing."],
  ["shahwa", "Appetite", "The deciding fact", "Whether a person is in distress from it moves the case between the two conclusions."],
  ["rawh", "Rest", "A benefit with a reason", "Strengthening the heart for worship, on Book 10's principle about weariness."],
  ["mujahada", "Striving", "The fifth benefit", "Good by being hard, and identical to the second harm."],
  ["bayt", "The household", "An assumption", "The fourth benefit describes an arrangement of its own time and place."],
  ["afat", "Three harms", "Ranked", "By how far each carries a person from what is lawful."],
  ["halal", "The lawful", "Where the danger is", "The strongest harm is a pressure on how a man earns."],
  ["kasb", "Earning", "Treated next", "The books that follow this one are about income, and the order is deliberate."],
  ["huquq", "Rights", "On both sides", "The second harm, the fifth benefit, and the premise of the third chapter."],
  ["measure", "Measure", "The third harm", "A permitted thing becoming a harm by excess, as in Book 1's third class."],
  ["uzuba", "Celibacy", "Better, in one case", "A worked case in a book on marriage, argued in the same accounting."],
  ["aqd", "The contract", "Law and counsel", "Two halves in one chapter, with different force."],
  ["fiqh", "The legal content", "Varies by school", "Not reproduced here, and not to be taken from a reading edition."],
  ["muashara", "Living together", "Duties on both sides", "The structure of the third chapter, which is separable from its counsel."],
].map(([id, label, kicker, description], index) => ({ id, label, kicker, description, position: ["left", "right", "top", "bottom"][index % 4] }));

const node = (id: string, label: string, micro: string, summary: string, guardrail: string, chapterId: number, glyph: Journey["nodes"][number]["glyph"]): Journey["nodes"][number] => ({ id, label, micro, summary, guardrail, chapterId, glyph });

export const book12Journeys: Journey[] = [
  {
    id: "an-open-question", number: "01", question: "Is marrying better, or not?", title: "Find out that the question is open",
    description: "Take three scholarly positions reported without embarrassment, and the sentence that replaces a general question with a personal one.",
    payoff: "You learn what kind of question this is, and why the book cannot end in a verdict.",
    image: assetUrl("assets/system/book12-two-pans.jpg"), imageAlt: "A balance with five small stones in one pan and three larger ones in the other, the beam very slightly tipped.", minutes: 10, color: "#278d91",
    nodes: [
      node("three-positions", "Take the three", "Including the unexpected one", "Better than devotion; below it; and better left in this time.", "Reported, and none of them dismissed.", 1, "know"),
      node("of-its-moment", "Note the third", "About a time", "Earnings restricted, characters declined — a claim about circumstances.", "Not Ghazali's own position, and not about marriage.", 1, "clear"),
      node("the-method", "Take the method", "Benefits and harms", "So the merit of marriage and of leaving it becomes clear for each person.", "The chapter is built so either answer can come out.", 2, "order"),
      node("for-whom", "Note the shift", "Is it better for me", "A general question replaced by a personal one.", "Which is why the chapter ends in cases, not a ruling.", 2, "diagnose"),
      node("elsewhere", "See the pattern", "Fear and hope, poverty and wealth", "Books 33 and 34 do the same with their own pairs.", "Neither is superior in itself; the question is which you need.", 2, "pattern"),
    ],
  },
  {
    id: "the-five-and-three", number: "02", question: "What is actually being weighed?", title: "Count five against three",
    description: "Work through the benefits and the harms, notice that one item appears in both lists, and find where the greatest danger of marriage is located.",
    payoff: "You get a list you can apply to yourself, and a ranking of the harms by how far each takes you from the lawful.",
    image: assetUrl("assets/system/book12-same-stone.jpg"), imageAlt: "One stone resting exactly on the pivot of a balance, touching neither pan.", minutes: 13, color: "#bf7a35",
    nodes: [
      node("the-root", "Take the first benefit", "At the scope of the world", "That the world not be empty of the human kind.", "Called the root, and not therefore decisive.", 3, "know"),
      node("two-functions", "Separate two benefits", "Danger, or good", "Fortification removes a danger; rest supplies one.", "Only the first overturns a harm later.", 4, "clear"),
      node("the-same-thing", "Find the overlap", "Benefit five, harm two", "Bearing a household's rights, and falling short of them.", "The identical circumstance, sorted by the person.", 5, "diagnose"),
      node("the-strongest", "Take the strongest harm", "The earning", "Not temperament or distraction — a pressure on how a man earns.", "Which is why the next books of the quarter are about income.", 6, "witness"),
      node("the-ranking", "Note the ranking", "By distance from the lawful", "The unlawful earning, then falling short, then the pull and excess.", "The lowest begins inside the permitted.", 7, "order"),
      node("measure-again", "Note the third harm", "Excess, not the thing", "The same affection counted as the third benefit two sections earlier.", "Book 1's third class, applied to a marriage.", 7, "balance"),
    ],
  },
  {
    id: "the-arithmetic", number: "03", question: "How does the weighing come out?", title: "Take two cases that disagree",
    description: "Follow Ghazali's own accounting to a conclusion nobody expects from this book, and then to the case that comes out the other way.",
    payoff: "You leave with a procedure that outlasts the setting it was written in, and an honest look at your own case.",
    image: assetUrl("assets/system/book12-two-ledgers.jpg"), imageAlt: "Two account books open side by side, ruled identically, with different entries and different totals.", minutes: 12, color: "#c25f50",
    nodes: [
      node("first-case", "Take the first case", "Celibacy is better", "No distress from appetite, the child the only benefit, the strongest harm present.", "In a book on the etiquette of marriage.", 8, "witness"),
      node("the-accounting", "Take the accounting", "Profit and capital", "A supposed future good against an immediate deficiency in religion.", "Which is why the root benefit does not automatically win.", 8, "pattern"),
      node("second-case", "Take the second", "Marriage is better", "If the bridle of godfearing is not strong and he fears for himself.", "One fact about the person moves the whole verdict.", 8, "balance"),
      node("law-and-counsel", "Separate the chapters", "What binds, what advises", "The contract is law; the qualities are counsel of their setting.", "Advice hardens into requirement when printed together.", 9, "guard"),
      node("both-sides", "Note the structure", "Duties on both parties", "The third chapter examines what is on each toward the other.", "Separable from counsel this edition does not carry.", 10, "clear"),
      node("what-outlasts", "See what survives", "The method", "Five, three, a ranking, and an answer that depends on the person.", "A procedure outlasts the circumstances it was written in.", 11, "steady"),
    ],
  },
];

export const book12Movements: TaxonomyGroup[] = [
  ["bab1", "1. Toward marriage and away from it", "The disagreement, the method, five benefits, three harms, and two worked cases.", [1, 2, 3, 4, 5, 6, 7, 8]],
  ["bab2", "2. The contract", "What binds and what is advised, and the line between them.", [9]],
  ["bab3", "3. Living together", "Duties set out on both sides, from the contract to the parting.", [10, 11]],
].map(([id, label, description, chapterIds], index) => ({ id, label, description, chapterIds, color: ["#bf7a35", "#278d91", "#c25f50"][index % 3] })) as TaxonomyGroup[];

export const book12Instrument: Instrument = {
  title: "Five against three",
  note: "Ghazali says the question of marriage is open among the scholars, and answers it by weighing five benefits against three harms — with the answer coming out differently for different people. He then works two cases that land on opposite sides. This is his weighing, applied to a case you supply; it is not advice, and no diagnostic can tell anyone what to do about a marriage.",
  items: [
    {
      id: "case", label: "The case as you would state it", lede: "Your own, or one you are thinking through",
      note: "The five benefits are the child, fortification against appetite, rest and company, the household, and the striving that a household trains. The three harms are the inability to seek the lawful, falling short of what is owed, and being pulled away — ranked in that order by how far each carries a person from the lawful. Note that one item appears in both lists.",
      axes: [
        {
          id: "benefit", kicker: "The five benefits", question: "Which of them is actually the live one for you?",
          options: [
            { id: "walad", label: "The child", note: "Which he calls the root, and which the closing case tests." },
            { id: "shahwa", label: "Fortification — I fear for myself", note: "The one benefit that moves a case in his second worked example." },
            { id: "rawh", label: "Rest and company", note: "Which he gives a reason: strengthening the heart for worship." },
            { id: "mujahada", label: "The training of carrying a household", note: "The fifth, which is good by being hard — and is also the second harm." },
          ],
        },
        {
          id: "harm", kicker: "The three harms", question: "And which of them are you actually exposed to?",
          options: [
            { id: "kasb", label: "Pressure on how I would have to earn", note: "The first, which he names the strongest of the three." },
            { id: "huquq", label: "Falling short of what would be owed", note: "The second, below the first, and identical to the fifth benefit." },
            { id: "shughl", label: "Being pulled away, or into excess", note: "The third and lowest, which begins inside the permitted." },
            { id: "none", label: "None of the three, as far as I can tell", note: "In which case the benefits stand without a counterweight." },
          ],
        },
      ],
      verdicts: [
        { key: "shahwa|kasb", name: "His two strongest items, against each other", role: "balance", chapterId: 8, body: "You have named the benefit that decides his second worked case and the harm he calls the strongest of the three. Ghazali does work this case: if to the matter of the child is added the need to break appetite because of the soul's longing, then one looks — and if the bridle of godfearing is not strong in his head and he fears fornication for himself, then marriage is better for him.", action: "But he treats the first harm as the gravest thing in the chapter, and its mechanism is worth facing directly: a household expands what must be sought, and the seeking reaches past the lawful. Where both are present his own method gives no formula. What it gives is the two quantities to weigh, and the accounting he weighs them by — that a supposed good is profit and religion is capital." },
        { key: "shahwa|*", name: "The case he decides for marriage", role: "support", chapterId: 8, body: "This is his second worked example. If the bridle of godfearing is not strong in his head and he fears fornication for himself, then marriage is better for him — because he is wavering between plunging into what is forbidden and the remedy that was instituted for it.", action: "Note how narrow the reasoning is. It turns on fear for oneself, not on the general desirability of marriage, and it is the benefit he lists as fortification — breaking the urge, repelling the harms of appetite, lowering the gaze. Where that is genuinely the live benefit, his weighing comes out one way, and he says so plainly." },
        { key: "walad|kasb", name: "The case that comes out against", role: "warning", chapterId: 8, body: "This is his first worked case, almost exactly: whoever is not in distress from appetite, and the benefit of his marriage would be the effort to obtain a child, and the harm is the need to earn the unlawful and the occupation from God — then celibacy is better for him.", action: "His reasoning is an accounting. Marriage for a child is an effort in seeking a life for a child that is only supposed, while the deficiency in religion is immediate — and that is profit, while religion is capital. He calls the child the root of marriage and still finds it insufficient here, which is the clearest evidence that his weighing is a real one and not a formality." },
        { key: "*|kasb", name: "The strongest harm", role: "warning", chapterId: 6, body: "Ghazali names this the strongest of the three, and its content is entirely economic: the inability to seek the lawful, which is not easy for everyone, especially where livelihoods are disturbed. Marriage becomes a cause for expanding the seeking and feeding from the unlawful — and in that is his destruction and his household's.", action: "The report he attaches is about the man's own answering: a servant stopped at the Balance with good deeds like mountains, asked where he earned his wealth and in what he spent it, until the demands consume everything. Note where the fault is located — in the pressure on him, not in the household — and that the two books following this one in the quarter are about earning." },
        { key: "*|none", name: "Then the benefits stand", role: "support", chapterId: 2, body: "Ghazali's chapter is a weighing, and a weighing with nothing in one pan comes out the obvious way. His three harms are the whole of what he sets against marriage, and a person genuinely exposed to none of them is not the person the chapter's cautions are written for.", action: "Two checks are worth making before accepting it. The second harm is identical to the fifth benefit — bearing what a household is owed — so ask whether you have counted it as a benefit while being unable to carry it. And the third begins inside the permitted and becomes a harm only at excess, which makes it the easiest of the three to be exposed to without noticing." },
        { key: "mujahada|huquq", name: "You have named the same thing twice", role: "balance", chapterId: 5, body: "The fifth benefit is striving against the soul by fulfilling the rights of a household, patience with their character, and bearing harm — and the second harm is falling short of exactly those things. You have claimed both, which is not a contradiction: it is the chapter's method showing itself.", action: "Ghazali's whole approach is that the same circumstance is a benefit to one who can carry it and a harm to one who cannot. So the question is not which of the two this is in general but which it is for you — and that is the one question in this instrument that nothing external can answer." },
        { key: "*|huquq", name: "The second harm", role: "balance", chapterId: 7, body: "Falling short of fulfilling their rights, and patience with their character, and bearing harm from them — which he ranks below the first in strength, because it depends on the person rather than on circumstances.", action: "Read it against the fifth benefit, which is the same material stated as a capacity. Ghazali does not treat the difficulty as a reason against marriage in itself; he treats it as something that trains a person who can sustain it and damages one who cannot, and the ranking below the first harm is his estimate of how much weight it carries." },
        { key: "*|*", name: "Read the five against the three", role: "balance", chapterId: 11, body: "A benefit and a harm, which is what his chapter is built to compare. What it will not give you is a verdict: his two worked cases come out on opposite sides, and what moves between them is a fact about the person rather than about marriage.", action: "Take his ranking of the harms as the frame — the unlawful earning first, falling short second, being pulled away third — and his accounting as the arithmetic: a supposed future good against an immediate deficiency, profit against capital. That procedure is what outlasts the setting the book was written in, and it is the part worth having." },
      ],
    },
  ],
};

export const book12Sources: SourceLink[] = [
  { label: "Primary Arabic text", note: "The complete public Arabic of Book 12 was read and used to establish the three chapters, the scholarly disagreement, the five benefits, the three harms, and the two worked cases.", url: "https://shamela.ws/book/9472/381" },
  { label: "The five benefits", note: "The passage enumerating the child, fortification against appetite, the refreshing of the soul, the managing of the household, and the striving that a household trains.", url: "https://shamela.ws/book/9472/384" },
  { label: "The three harms", note: "The passage naming the inability to seek the lawful as the strongest harm, and ranking falling short of rights and being pulled away below it.", url: "https://shamela.ws/book/9472/393" },
  { label: "The weighing", note: "The passage working two cases to opposite conclusions, with the accounting by which a supposed good is profit and religion is capital.", url: "https://shamela.ws/book/9472/394" },
  { label: "The contract", note: "The chapter on what is observed at the contract, separating the elements and conditions of validity from the qualities recommended.", url: "https://shamela.ws/book/9472/396" },
  { label: "Living together", note: "The chapter on the manners of the marriage itself, examining what is upon the husband and what is upon the wife.", url: "https://shamela.ws/book/9472/402" },
  { label: "Forty-book structure", note: "Ghazali.org's listing places Book 12 as the second book of the Quarter of Customs and confirms its title.", url: "https://www.ghazali.org/listing-the-forty-books/" },
];

export const book12: SystemBook = {
  id: 12,
  title: "The Etiquette of Marriage",
  shortTitle: "Marriage",
  defaultJourneyId: "an-open-question",
  chapters: book12Chapters,
  conceptNodes: book12ConceptNodes,
  journeys: book12Journeys,
  sources: book12Sources,
  taxonomy: {
    title: "Three chapters",
    note: "Ghazali's own three: whether to marry, how the contract is made, and how the marriage is lived. Eight of the eleven reading sections belong to the first, which is a weighing rather than a recommendation and is the part of the book whose method outlasts its setting.",
    groups: book12Movements,
  },
  instrument: book12Instrument,
  editorialNote: "The three journeys, eleven reading sections, visual models, and diagnostic are editorial learning aids. The sections follow Ghazali's three chapters in his order. The English is an original synthesis made from a reading of the public Arabic text, not a translation and not a substitute for one. Reports and inherited anecdotes are presented as material Ghazali transmitted; this prototype does not independently grade every narration. This book needs a fuller note on scope than most. Its first chapter is a deliberation — three scholarly positions, five benefits, three harms, and two worked cases reaching opposite conclusions — and that is what this edition presents at length, because the weighing is a procedure a reader can apply and it survives the circumstances it was composed in. Its second and third chapters are different. The second contains the law of the marriage contract, which varies between the schools of law, alongside recommendations about the qualities to seek in a spouse; the third is the longest chapter in the book and sets out the conduct of a marriage in detail. Both are addressed to the household arrangements, legal framework, and social expectations of eleventh-century Khurasan. A considerable amount of the third chapter concerns the treatment of women and the ordering of a household in terms that reflect those assumptions and that would cause harm if taken as guidance today. This edition presents the structure of those two chapters, the distinction between what binds and what is advised, and the fact that the third sets out duties on both parties — and it reproduces none of their counsel. Nothing here is guidance about marriage, about a spouse, or about anyone's household; the legal questions belong to a work of law and to qualified guidance, and the practical ones to the people in the marriage. The diagnostic applies Ghazali's own five benefits and three harms to a case the reader supplies and reports what his chapter says about that pair. It cannot and does not tell anyone whether to marry, whom to marry, or what to do about a marriage.",
};
