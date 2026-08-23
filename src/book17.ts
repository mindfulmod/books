import { assetUrl } from "./assetUrl";
import type { Chapter, ConceptNode, VisualModel } from "./data";
import type { Instrument, Journey, SourceLink, SystemBook, TaxonomyGroup } from "./systemTypes";

type Seed = { id: number; shortTitle: string; formalTitle: string; overview: string; thesis?: string; moves: Array<{ title: string; body: string }>; closer: Array<{ title: string; body: string }>; distinction: [string, string, string, string, string]; misreading: string; reflection: string; audit: string[]; nodes: string[]; model: VisualModel };
const bab = (id: number) => (id <= 6 ? "the first chapter, first section, on the kinds of travel" : id <= 9 ? "the first chapter, second section, on the manners of the journey" : "the second chapter, on what a traveller must learn");
const makeChapter = (seed: Seed): Chapter => ({
  id: seed.id, shortTitle: seed.shortTitle, formalTitle: seed.formalTitle, overview: seed.overview,
  points: seed.moves.slice(0, 3).map((m) => m.body), reflection: seed.reflection, relatedNodes: seed.nodes, visualModel: seed.model,
  deep: { thesis: seed.thesis ?? seed.moves[0].body, context: seed.overview, moves: seed.moves, closeReading: seed.closer,
    distinction: { title: seed.distinction[0], firstLabel: seed.distinction[1], first: seed.distinction[2], secondLabel: seed.distinction[3], second: seed.distinction[4] },
    misreading: seed.misreading, observation: seed.reflection, selfAudit: seed.audit,
    sourceAnchor: `Book 17, ${bab(seed.id)}, ${seed.formalTitle}.` },
});
const chain = (title: string, caption: string, items: Array<[string, string, "support" | "balance" | "warning"]>): VisualModel => ({ kind: "chain", title, caption, items: items.map(([label, body, role]) => ({ label, body, role })) });
const pair = (title: string, caption: string, items: Array<[string, string, "support" | "balance" | "warning"]>): VisualModel => ({ kind: "pair", title, caption, items: items.map(([label, body, role]) => ({ label, body, role })) });
const spectrum = (title: string, caption: string, items: Array<[string, string, "support" | "balance" | "warning"]>): VisualModel => ({ kind: "spectrum", title, caption, items: items.map(([label, body, role]) => ({ label, body, role })) });

export const book17Chapters: Chapter[] = [
  makeChapter({
    id: 1, shortTitle: "Two chapters", formalTitle: "The shape of the book",
    overview: "A short book with an unusually tidy architecture: one chapter on why and how a person travels, and one on what he has to know before he goes.",
    thesis: "One chapter on why and how you travel, one on what a traveller has to know — a tidier architecture than the subject suggests.",
    moves: [
      { title: "Announce the two", body: "The manners from the first rising to the last return, with the intention of travel and its benefit — in two sections; and what a traveller must learn of the dispensations of travel, the indicators of the direction of prayer, and the times." },
      { title: "Note what the second is", body: "A short technical chapter. A traveller loses the ordinary means of knowing where the prayer direction is and when the times fall, and gains dispensations he must know the limits of." },
      { title: "Note the first section", body: "The benefits of travel, its excellence, and its intention — which is where the book's taxonomy of journeys sits, and where almost all of its thinking is." },
      { title: "Note the second section", body: "The manners from the first rising to the last return: the journey treated as a sequence, in the same way Book 7 treated the pilgrimage and Book 11 treated a meal." },
    ],
    closer: [
      { title: "Why the technical chapter is separate", body: "The dispensations and the indicators are things a person must know before setting out, and they do not vary with why he is going. Keeping them apart from the taxonomy means the second chapter applies to every journey the first chapter sorts." },
      { title: "Where it sits in the quarter", body: "Books 15 and 16 asked what company costs and whether to have it. This book opens by saying travel is a kind of movement and mixing, and refers the reader back to both — so it inherits their weighing rather than repeating it." },
    ],
    distinction: ["Two things a book on travel can settle", "Why and how", "The taxonomy of journeys, and the manners of the road.", "What must be known", "Dispensations, direction, and times, which are the same for every journey."],
    misreading: "Do not skip the second chapter as merely technical. Its subject is what a person is likely to get wrong precisely because he is away from the arrangements that usually settle it for him.",
    reflection: "Notice that the book treats a journey as something with a reason, a sequence, and a set of prerequisites.",
    audit: ["Do I know why I am going?", "Do I know the sequence?", "Do I know what I must know?", "Which chapter answers me?"],
    nodes: ["safar", "structure", "rukhas"],
    model: pair("Two chapters", "The second applies to every journey the first sorts.", [["Why and how", "The kinds of travel, and the manners from rising to return.", "support"], ["What must be known", "Dispensations, the prayer direction, and the times.", "balance"]]),
  }),
  makeChapter({
    id: 2, shortTitle: "Flight or seeking", formalTitle: "The first cut",
    overview: "The book's organising division, and it is exhaustive by construction — every journey is one or the other.",
    thesis: "Every journey is either flight from something or seeking something, and the division is exhaustive by construction.",
    moves: [
      { title: "Place travel", body: "Travel is a kind of movement and mixing, and in it are benefits and it has harms — as we mentioned in the Book of Companionship and the Book of Seclusion." },
      { title: "Give the division", body: "The benefits that impel toward travel are not free of either flight or seeking." },
      { title: "Define the first", body: "For a traveller either has something that unsettles him from his place — and but for it he would have no destination to travel to." },
      { title: "Define the second", body: "Or he has a destination and an object of seeking. The two are distinguished by where the motive lives: behind him, or ahead." },
    ],
    closer: [
      { title: "The clause that does the work", body: "But for it he would have no destination to travel to. Flight is defined as a journey with no forward object — a person who is only leaving. That makes the division a test rather than a label: remove what unsettles him, and ask whether any destination remains." },
      { title: "What it inherits from the two previous books", body: "Travel is named as a kind of mixing, and its benefits and harms referred to those books rather than restated. Whatever was concluded there about company applies here, since a journey is company under different conditions." },
    ],
    distinction: ["Two places a motive can live", "Behind", "Something that unsettles a person from his place, without which he would have no destination.", "Ahead", "A destination and an object of seeking, which would remain if the place were pleasant."],
    misreading: "Do not read flight as a lesser motive. Two of Ghazali's four categories of what is fled are entirely legitimate, and one of them is fleeing what blocks a person from devoting himself to God.",
    reflection: "Take a journey you are considering and remove the thing that unsettles you. Ask whether a destination is left.",
    audit: ["Behind me, or ahead?", "Would a destination remain?", "Am I only leaving?", "What does this inherit from Books 15 and 16?"],
    nodes: ["harab", "talab", "safar"],
    model: pair("The first cut", "Exhaustive by construction.", [["Flight", "Something behind, without which there would be no destination.", "balance"], ["Seeking", "Something ahead, which would remain wherever he was.", "support"]]),
  }),
  makeChapter({
    id: 3, shortTitle: "Plague, and prices", formalTitle: "What is fled: the worldly injuries",
    overview: "The first branch of flight, and the examples are ordinary and unembarrassed.",
    thesis: "The worldly reasons for leaving are listed plainly and none of them is treated as unworthy.",
    moves: [
      { title: "Name the category", body: "What is fled is either a matter with an injury in worldly affairs." },
      { title: "Give the examples", body: "Like plague and epidemic when it appears in a town, or a fear whose cause is strife or a quarrel, or a rise in prices." },
      { title: "Divide it", body: "It is either general, as in those cases, or particular — somebody singled out for harm in a town who gets out." },
      { title: "Note what the list includes", body: "Disease, disorder, a personal quarrel, and the cost of living. None of them is treated as an unworthy reason to move, and the book does not pause to justify any of them." },
    ],
    closer: [
      { title: "Why the ordinariness matters", body: "A book of religious manners could easily have admitted only devotional journeys. Placing epidemics and prices first, without apology, establishes that the taxonomy is a description of why people actually travel rather than a list of permitted reasons." },
      { title: "The general and the particular", body: "The distinction is practical: a general danger is one everyone in a place shares, and a particular one attaches to a person. It matters because a general danger may be a reason for many to move and a particular one is a reason only for him." },
    ],
    distinction: ["Two scopes of a worldly danger", "General", "Epidemic, strife, prices — shared by everyone in the place.", "Particular", "Harm directed at one person, which is a reason for him alone."],
    misreading: "Do not read the inclusion of prices as trivialising. It is a real cause of movement and is named alongside plague without any change of register.",
    reflection: "Ask which of these has ever actually moved you, and whether you framed it to yourself as a reason.",
    audit: ["Which of these applies?", "General, or mine alone?", "Did I frame it as a reason?", "Does the book apologise for any of them?"],
    nodes: ["harab", "dunya", "safar"],
    model: spectrum("Four worldly causes", "Named without apology.", [["Plague", "Appearing in a town.", "warning"], ["Strife", "Fear whose cause is disorder or a quarrel.", "warning"], ["Prices", "A rise in the cost of living.", "balance"], ["Targeted harm", "Directed at one person, which is his reason alone.", "warning"]]),
  }),
  makeChapter({
    id: 4, shortTitle: "Status and wealth", formalTitle: "What is fled: the injuries in religion",
    overview: "The second branch of flight, and it is the one that connects this book to the two before it.",
    thesis: "The second branch of flight is what connects this book to the rest of the quarter.",
    moves: [
      { title: "Name the category", body: "Or a matter with an injury in religion." },
      { title: "Give the first example", body: "Like one afflicted in his town with status and wealth and an abundance of causes that block him from devoting himself to God — so he prefers exile and obscurity, and avoids affluence and status." },
      { title: "Give the second", body: "Or somebody being pushed into some novelty, or into a post he is not allowed to hold, who leaves to get away from it." },
      { title: "Note the word", body: "Afflicted with status and wealth. The vocabulary treats prosperity as a trial rather than as a good, which is the register of Books 26 and 27 and not of ordinary counsel." },
    ],
    closer: [
      { title: "Why this is the same question as seclusion", body: "The person described is fleeing exactly what Book 16 weighed: the demands, the expectations, and the causes that block devotion. Travel here is seclusion achieved by distance rather than by withdrawal, and the weighing of that book applies unchanged." },
      { title: "The compelled office", body: "The second example is not about a person's inner state at all. Being pressed toward an unlawful office or an innovation is a coercion, and flight is named as the response — which makes movement a legitimate answer to pressure that cannot be refused in place." },
    ],
    distinction: ["Two religious injuries", "What binds you", "Status, wealth, and the causes that block devotion — an affliction of prosperity.", "What is pressed on you", "An innovation or an unlawful office, where flight answers a coercion."],
    misreading: "Do not read the first example as recommending poverty. Book 34 treats the comparison of having and not having at length and refuses to rank them in the abstract; here the case is a person specifically blocked by his own abundance.",
    reflection: "Ask what in your situation blocks you, and whether it is something you hold or something pressed on you.",
    audit: ["What blocks me?", "Do I hold it or am I held by it?", "Would distance answer it?", "Which book weighed this?"],
    nodes: ["harab", "jah", "uzla"],
    model: pair("Two religious causes of flight", "One is held and one is imposed.", [["Status and wealth", "An abundance that blocks devotion, called an affliction.", "warning"], ["Coercion", "An innovation or an office it is not lawful to take.", "warning"]]),
  }),
  makeChapter({
    id: 5, shortTitle: "Three knowledges", formalTitle: "What is sought: knowledge",
    overview: "The first branch of seeking, and its three kinds are wider than a reader expects — the third of them is geography.",
    thesis: "Seeking knowledge covers more ground than a reader expects, and it is sorted into three kinds.",
    moves: [
      { title: "Give the division", body: "What is sought is either worldly, like wealth and status, or religious. And the religious is either knowledge or action." },
      { title: "Give the first kind of knowledge", body: "Either a science among the religious sciences." },
      { title: "Give the second", body: "Or learning your own character by experience — the kind of knowledge you only get by being taken out of your usual conditions and seeing what one becomes." },
      { title: "Give the third", body: "Or knowledge of the signs of the earth and its wonders, like the travel of Dhu al-Qarnayn and his going about in the regions of the earth." },
    ],
    closer: [
      { title: "Why self-knowledge by experience is here", body: "It is the one kind of knowledge that cannot be sought by studying. A person's character is only visible under conditions he has not arranged, and travel supplies those — which makes it a method rather than a subject, and connects this book to the whole Quarter of Perils." },
      { title: "The third kind, given a precedent", body: "Knowledge of the earth and its wonders is named as religious knowledge and given a Quranic traveller as its precedent. Book 39 argued that the field of thought is widest in what sight perceives; this is that argument turned into a reason to go somewhere." },
    ],
    distinction: ["Two ways to learn about yourself", "By study", "Reading the descriptions of the traits, which the Quarter of Perils supplies.", "By experience", "Being placed in conditions you did not arrange, and seeing what you become."],
    misreading: "Do not read the worldly objects — wealth and status — as excluded. They are named in the same sentence as the religious ones, as a division of what is sought rather than as a warning.",
    reflection: "Ask what you have learned about your own character that you could not have learned at home.",
    audit: ["Which of the three am I after?", "What have conditions shown me?", "Could I have learned it in place?", "Is my object worldly or religious?"],
    nodes: ["talab", "ilm", "tajriba"],
    model: chain("Seeking, divided", "The third kind of knowledge is the least expected.", [["Worldly", "Wealth and status, named without comment.", "balance"], ["Religious knowledge", "A science, self-knowledge by experience, or the earth's wonders.", "support"], ["Religious action", "Worship or visitation, treated next.", "support"]]),
  }),
  makeChapter({
    id: 6, shortTitle: "Worship, and visiting", formalTitle: "What is sought: action",
    overview: "The second branch of seeking, and its two halves are treated very differently — one is brief and the other is where the difficulties are.",
    thesis: "Seeking through action divides in two, and Ghazali treats the halves very differently.",
    moves: [
      { title: "Divide it", body: "Action is either worship or visitation." },
      { title: "Give the worship", body: "Worship is the pilgrimage, the lesser pilgrimage, and struggle in God's path — three journeys with fixed forms, treated at length elsewhere in the work." },
      { title: "Give the visitation of places", body: "Visitation is also among the acts of nearness. It may aim at a place — such as Mecca, Medina, and Jerusalem; and the frontiers, since stationing at them is an act of nearness." },
      { title: "Give the visitation of people", body: "It may aim at the friends of God and the scholars — who are either dead, so their graves are visited; or living, so that blessing is sought by seeing them, and from looking at their states one gains strength of desire to imitate them." },
    ],
    closer: [
      { title: "The reason given for visiting the living", body: "That from looking at their states one gains strength of desire to imitate them. It is the same mechanism Book 38 named as the most beneficial treatment when the soul will not comply: the companionship of someone who actually strives, observed and imitated rather than argued with." },
      { title: "What the taxonomy has now covered", body: "Flight from worldly injury or religious; seeking of the worldly, of three knowledges, of three worships, and of two kinds of visitation. Any journey a person is contemplating lands somewhere in it, which is what makes it usable as a test rather than as a description." },
    ],
    distinction: ["Two objects of a visit", "A place", "Mecca, Medina, Jerusalem, and the frontiers, where the visiting is itself an act of nearness.", "A person", "Whose grave is visited if dead, and from whose state desire is strengthened if living."],
    misreading: "Do not take the visiting of graves here as settled in every form. Book 40 gives the ruling with its history and its condition, and this passage places the practice within a taxonomy rather than adjudicating it.",
    reflection: "Ask whether you have ever travelled to see how someone lives, and what it changed.",
    audit: ["Place, or person?", "Living, or dead?", "What did seeing change?", "Where is the ruling given?"],
    nodes: ["ziyara", "talab", "suhba"],
    model: spectrum("The whole taxonomy", "Any journey lands somewhere in it.", [["Flight", "From worldly injury or from what blocks religion.", "balance"], ["Worldly seeking", "Wealth and status.", "balance"], ["Knowledge", "A science, self-knowledge, or the earth's wonders.", "support"], ["Action", "Worship, or visitation of a place or a person.", "support"]]),
  }),
  makeChapter({
    id: 7, shortTitle: "Before setting out", formalTitle: "The manners of departure",
    overview: "The second section treats the journey as a sequence, and its first stage is what is settled before anyone leaves.",
    thesis: "The journey is treated as a sequence, and it begins before you have left.",
    moves: [
      { title: "Name the scope", body: "The manners from the first rising to the last return — so the sequence begins before departure and ends after arrival home." },
      { title: "Give the settling", body: "Beginning with what is put right before going: wrongs returned, debts settled, and provision left for those who depend on the traveller." },
      { title: "Give the will", body: "The writing of a will, which Book 7 also placed among the things done before a journey — a traveller and his wealth being at risk, as that book put it." },
      { title: "Give the companion", body: "The choosing of company, since travel is named at the outset as a kind of mixing, and the choice of whom to be mixed with is made before setting out rather than on the road." },
    ],
    closer: [
      { title: "Why the sequence starts before the road", body: "The same reason Book 7's twelve stages of the pilgrimage began three stages before anything was bought. A journey is treated as beginning at the resolve, which is what allows its earlier stages to be examined at all." },
      { title: "What this edition does with the detail", body: "The manners are practical instruction, and many of them concern conditions of travel — mounts, stages, provisions — that have no modern counterpart. This section presents the shape of the sequence rather than reproducing them." },
    ],
    distinction: ["Two points a journey can begin at", "The resolve", "Where the sequence starts, with settling, provision, and a will.", "The departure", "Which would leave everything settled beforehand unexamined."],
    misreading: "Do not read the settling of affairs as pessimism. Book 7 gives the same instruction for the pilgrimage and gives its reason plainly: a traveller and his wealth are exposed.",
    reflection: "Ask what you would have to settle before leaving for a month, and how much of it is already overdue.",
    audit: ["What is unsettled?", "Who depends on me?", "Is anything owed?", "When does my journey begin?"],
    nodes: ["adab-safar", "safar", "wasiyya"],
    model: chain("Before the road", "The sequence starts at the resolve.", [["Settle what is owed", "Wrongs returned and debts discharged.", "support"], ["Provide for dependants", "What is left behind for those who rely on you.", "support"], ["Write the will", "A traveller and his wealth being exposed.", "balance"], ["Choose the company", "Since travel is itself a kind of mixing.", "support"]]),
  }),
  makeChapter({
    id: 8, shortTitle: "On the road", formalTitle: "The manners of the journey itself",
    overview: "The middle of the sequence, and its instructions are mostly about the people a traveller is with rather than about the travelling.",
    thesis: "The middle of the journey is almost entirely about the people you are travelling with.",
    moves: [
      { title: "Name the register", body: "The manners of the road: how the day is arranged, how the party moves, how the animals are treated, and how the travellers conduct themselves toward one another." },
      { title: "Give a representative instruction", body: "Among them, that the backs of mounts are not to be taken as chairs — and that a rider dismount morning and evening, which is a rule about the animal rather than about the traveller." },
      { title: "Note what dominates", body: "Most of the section is about company under strain: the sharing of provision, the pace, the allocation of burdens, and the settling of what arises between people confined together." },
      { title: "Connect it to the opening", body: "Which is what the book's first sentence predicted, in naming travel a kind of mixing. The road is Book 15's rights of companionship under conditions that make them harder to keep." },
    ],
    closer: [
      { title: "The instruction about mounts", body: "It is a small rule and a revealing one. A traveller has a reason for everything he asks of his animal, and the instruction sets a limit that his own convenience would not have set — which is the shape of most of the section." },
      { title: "Why company is the theme", body: "A journey removes the ordinary escapes. People who could avoid each other at home cannot on a road, so the obligations of companionship become both more necessary and harder, and the manners are aimed at exactly that pressure." },
    ],
    distinction: ["Two subjects a travel manual can have", "The travelling", "Routes, provisions, and stages, which change with every age.", "The company", "How people confined together conduct themselves, which does not."],
    misreading: "Do not treat the rules about animals as incidental. They are instructions about what a person does when he has a reason and nobody is watching, which is the section's method throughout.",
    reflection: "Recall a journey with other people and what it revealed about all of you.",
    audit: ["What does travel reveal in me?", "Are the rights harder here?", "What do I ask of others' convenience?", "Who cannot avoid me?"],
    nodes: ["adab-safar", "suhba", "rifq"],
    model: pair("Two kinds of instruction", "One of them outlasts the conditions.", [["About the road", "Stages, provisions, mounts — bound to their age.", "balance"], ["About the company", "Confinement, sharing, and strain, which does not change.", "support"]]),
  }),
  makeChapter({
    id: 9, shortTitle: "Coming back", formalTitle: "The manners of return",
    overview: "The end of the sequence, and the book insists that a journey is not over when the destination is reached.",
    thesis: "A journey is not over when you arrive back, which is the point of giving return its own stage.",
    moves: [
      { title: "Name the scope again", body: "To the last return. The section's own title runs to the traveller's arrival home rather than to his arrival anywhere." },
      { title: "Give the shape", body: "The manners of returning: what is said on approach, how a traveller comes back to his household, and what he brings." },
      { title: "Note the pattern", body: "Book 7 did the same for the pilgrimage, ending its ten groupings with a section on the customs of returning from a journey rather than at the last rite." },
      { title: "Say why it matters", body: "A journey undertaken for a reason has to be brought back to the life it was undertaken from, and a sequence that ended at the destination would leave the return unexamined — which is where most of what was gained is lost." },
    ],
    closer: [
      { title: "The symmetry with the departure", body: "The first stage settled what was left behind; the last returns to it. Between them the taxonomy sorted the reason for going, so the book's structure is that a journey is a loop with a motive rather than a line with an endpoint." },
      { title: "What a return tests", body: "Whether what was sought was actually obtained, and whether what was fled has been left. Neither question can be asked at the destination, which is why the sequence has to include the way back." },
    ],
    distinction: ["Two shapes a journey can have", "A loop", "Ending where it began, so that what was sought can be tested against the life it was sought for.", "A line", "Ending at the destination, which leaves the return unexamined."],
    misreading: "Do not read the return as an appendix. Both this book and Book 7 extend their sequences past the destination, which is a deliberate and repeated choice.",
    reflection: "Ask what you brought back from your last significant journey, and what became of it.",
    audit: ["What did I bring back?", "Did I obtain what I sought?", "Did I leave what I fled?", "Where does my journey end?"],
    nodes: ["adab-safar", "safar", "structure"],
    model: chain("A loop, not a line", "The return is where the motive is tested.", [["The resolve", "Settling, provision, and a will.", "support"], ["The road", "Company under strain.", "balance"], ["The destination", "What was sought.", "balance"], ["The return", "Where whether it was obtained becomes visible.", "support"]]),
  }),
  makeChapter({
    id: 10, shortTitle: "What he must know", formalTitle: "The second chapter",
    overview: "The technical chapter, and its subject is precisely what a traveller stops being able to take for granted.",
    thesis: "The technical chapter covers exactly what changes for a person who is no longer at home.",
    moves: [
      { title: "Name the three", body: "What a traveller must learn of the dispensations of travel, the indicators of the direction of prayer, and the times." },
      { title: "Give the dispensations", body: "Travel gives two dispensations in purification — wiping over footgear, and dry ablution — and two in the obligatory prayer, which are shortening and combining." },
      { title: "Note why the direction needs indicators", body: "At home the direction of prayer is settled by the arrangement of a building. On a road it has to be worked out, which is a skill rather than a fact." },
      { title: "Note why the times do", body: "Likewise the times, which at home are announced and at a distance must be judged — so both are things a traveller must be able to determine for himself." },
    ],
    closer: [
      { title: "Why the dispensations must be learned rather than simply used", body: "Each has conditions and limits, and a person who does not know them will either forgo what he is entitled to or take what he is not. Knowing a concession is as much a matter of knowledge as knowing an obligation." },
      { title: "What this chapter is really about", body: "Self-sufficiency in the things a settled life supplies invisibly. A traveller is someone temporarily without the infrastructure that answers these questions for him, and the chapter is a short list of what he has to carry in his own head." },
    ],
    distinction: ["Two ways to relate to a dispensation", "Knowing its limits", "Which lets a person take exactly what he is entitled to.", "Assuming it", "Which risks both forgoing what is permitted and taking what is not."],
    misreading: "Do not read the dispensations as leniencies to be minimised. They are entitlements with conditions, and the chapter's point is that both the entitlement and the condition have to be known.",
    reflection: "Ask how many of the things your day settles for you would you be able to determine yourself.",
    audit: ["Do I know the limits?", "Could I find the direction?", "Could I judge the times?", "What does my life settle invisibly?"],
    nodes: ["rukhas", "qibla", "safar"],
    model: spectrum("Four dispensations, two domains", "Each with conditions that must be known.", [["Wiping over footgear", "In purification.", "support"], ["Dry ablution", "In purification.", "support"], ["Shortening", "In the obligatory prayer.", "support"], ["Combining", "In the obligatory prayer.", "support"]]),
  }),
];

export const book17ConceptNodes: ConceptNode[] = [
  ["safar", "Travel", "A kind of mixing", "Named so at the outset, and its benefits referred to Books 15 and 16."],
  ["structure", "Two chapters", "Why, how, and what to know", "The second applies to every journey the first sorts."],
  ["harab", "Flight", "The motive behind", "A journey with no forward object once what unsettles him is removed."],
  ["talab", "Seeking", "The motive ahead", "A destination that would remain wherever the traveller was."],
  ["dunya", "Worldly causes", "Named without apology", "Plague, strife, prices, and harm directed at one person."],
  ["jah", "Status and wealth", "Called an affliction", "An abundance that blocks devotion, fled by exile and obscurity."],
  ["uzla", "Seclusion", "The same question", "Travel as withdrawal achieved by distance, weighed in Book 16."],
  ["ilm", "Knowledge sought", "Three kinds", "A religious science, self-knowledge by experience, and the earth's wonders."],
  ["tajriba", "Experience", "What study cannot give", "Character visible only under conditions a person did not arrange."],
  ["ziyara", "Visitation", "Places and people", "The living visited so that desire to imitate them is strengthened."],
  ["suhba", "Company", "Harder on a road", "Book 15's rights under conditions that remove the ordinary escapes."],
  ["adab-safar", "The sequence", "Resolve to return", "A loop rather than a line, so the motive can be tested at the end."],
  ["wasiyya", "The will", "Written before going", "As Book 7 also instructs, on the ground that a traveller is exposed."],
  ["rifq", "Gentleness", "Toward the animal", "A limit set where the traveller's own convenience would not set one."],
  ["rukhas", "Dispensations", "Entitlements with limits", "Two in purification and two in the prayer, both needing to be known."],
  ["qibla", "The direction", "A skill, not a fact", "Settled at home by a building, and on a road by working it out."],
].map(([id, label, kicker, description], index) => ({ id, label, kicker, description, position: ["left", "right", "top", "bottom"][index % 4] }));

const node = (id: string, label: string, micro: string, summary: string, guardrail: string, chapterId: number, glyph: Journey["nodes"][number]["glyph"]): Journey["nodes"][number] => ({ id, label, micro, summary, guardrail, chapterId, glyph });

export const book17Journeys: Journey[] = [
  {
    id: "why-go", number: "01", question: "Why am I actually going?", title: "Sort the journey",
    description: "Take the division that covers every journey by construction, follow both branches down to their kinds, and meet the one test that tells you which branch you are on.",
    payoff: "You get a taxonomy any journey lands somewhere in, and a question that can be answered before booking anything.",
    image: assetUrl("assets/system/book17-fork.jpg"), imageAlt: "A road forking at a plain waymarker on open ground, both branches equally worn.", minutes: 12, color: "#278d91",
    nodes: [
      node("a-kind-of-mixing", "Note the placing", "Movement and mixing", "Its benefits and harms referred to the two books before it.", "So a journey inherits their weighing rather than restating it.", 2, "know"),
      node("the-cut", "Take the first cut", "Flight or seeking", "Either something unsettles him, or he has an object ahead.", "Exhaustive by construction.", 2, "order"),
      node("the-test", "Take the test", "Remove what unsettles you", "But for it he would have no destination to travel to.", "Which turns the division into something checkable.", 2, "diagnose"),
      node("unapologetic", "Note the register", "Plague, strife, prices", "Named without any change of tone or apology.", "A description of why people travel, not a list of permitted reasons.", 3, "witness"),
      node("afflicted", "Take the word", "Afflicted with status", "Prosperity as a trial, and exile preferred to it.", "The vocabulary of Books 26 and 27, not of ordinary counsel.", 4, "clear"),
      node("three-knowledges", "Take the three", "Including the earth", "A science, self-knowledge by experience, and the earth's wonders.", "The second cannot be sought by studying at all.", 5, "pattern"),
    ],
  },
  {
    id: "the-journey-itself", number: "02", question: "What does the road ask of me?", title: "Follow the loop",
    description: "Take a sequence that begins at the resolve and ends at home, notice what dominates its middle, and end on the short list of things a traveller has to carry in his own head.",
    payoff: "You see why the return is part of the journey, and what a settled life had been answering for you.",
    image: assetUrl("assets/system/book17-the-return.jpg"), imageAlt: "A travelling bag set down inside a doorway, still fastened, with the door open behind it.", minutes: 11, color: "#bf7a35",
    nodes: [
      node("before-the-road", "Start at the resolve", "Settle, provide, write", "The sequence begins before anyone leaves.", "Book 7 begins its stages three steps before anything is bought.", 7, "order"),
      node("company-again", "Note what dominates", "The people, not the road", "Sharing, pace, burdens, and what arises between people confined together.", "Which the book's first sentence predicted.", 8, "diagnose"),
      node("the-mount", "Take the small rule", "Not chairs", "A limit on what a traveller asks of his animal.", "Set where his own convenience would not have set one.", 8, "witness"),
      node("a-loop", "See the shape", "To the last return", "A journey is a loop with a motive, not a line with an endpoint.", "Both this book and Book 7 extend past the destination.", 9, "pattern"),
      node("what-it-tests", "Find what the return tests", "Sought, and fled", "Whether what was sought was obtained and what was fled was left.", "Neither can be asked at the destination.", 9, "steady"),
      node("carry-it-yourself", "Take the short list", "Dispensations, direction, times", "What a settled life supplies invisibly.", "Entitlements have limits, and both must be known.", 10, "know"),
    ],
  },
];

export const book17Movements: TaxonomyGroup[] = [
  ["fasl1", "1a. The kinds of travel and its intention", "Flight or seeking, and every branch of each.", [1, 2, 3, 4, 5, 6]],
  ["fasl2", "1b. The manners of the journey", "From the first rising to the last return.", [7, 8, 9]],
  ["bab2", "2. What a traveller must learn", "The dispensations, the direction of prayer, and the times.", [10]],
].map(([id, label, description, chapterIds], index) => ({ id, label, description, chapterIds, color: ["#bf7a35", "#278d91", "#c25f50"][index % 3] })) as TaxonomyGroup[];

export const book17Instrument: Instrument = {
  title: "Flight, or seeking",
  note: "Ghazali divides every journey in two: either something unsettles a person from his place — and but for it he would have no destination to travel to — or he has a destination and an object of seeking. The division is exhaustive by construction, and it comes with a test. Take a journey you are actually considering or have recently made.",
  items: [
    {
      id: "journey", label: "One journey", lede: "Real, and either taken or contemplated",
      note: "The first question is his taxonomy, compressed to its four main branches. The second is his own test for the difference between flight and seeking: remove what unsettles you, and see whether a destination remains. Note that one answer to the second question changes the reading whatever branch you are on.",
      axes: [
        {
          id: "branch", kicker: "The taxonomy", question: "Which branch is this journey on?",
          options: [
            { id: "flee-dunya", label: "Leaving a danger, a quarrel, or a cost", note: "His first branch of flight: plague, strife, prices, or harm directed at you." },
            { id: "flee-din", label: "Leaving what blocks me, or is pressed on me", note: "His second: status and wealth that block devotion, or a coercion." },
            { id: "seek-ilm", label: "After knowledge of some kind", note: "A religious science, self-knowledge by experience, or the earth's wonders." },
            { id: "seek-amal", label: "After an act — worship, or seeing someone", note: "Pilgrimage and its kin, or the visiting of a place or a person." },
          ],
        },
        {
          id: "moves", kicker: "The test", question: "Would the thing change by your moving?",
          options: [
            { id: "in-place", label: "Yes — it is in the place, not in me", note: "Which is what makes flight a real remedy rather than a change of scene." },
            { id: "comes", label: "No — it would come with me", note: "The answer that redirects the question whatever branch you named." },
            { id: "partly", label: "Partly", note: "The commonest honest answer, and the one his test is designed to split." },
            { id: "unasked", label: "I have not asked", note: "Which on his method is the step before the taxonomy can be used at all." },
          ],
        },
      ],
      verdicts: [
        { key: "*|comes", name: "Then the motive is not in the place", role: "warning", chapterId: 2, body: "His definition of flight is precise and it is the whole test: the traveller has something that unsettles him from his place, and but for it he would have no destination to travel to. If what unsettles you would arrive with you, the journey has neither a motive behind it that moving addresses nor an object ahead of it.", action: "That does not make the journey wrong — it makes it unsorted. Ask what object would remain if the difficulty were gone, and take the answer as the real branch. His one category that survives this test is the second kind of knowledge: character seen under conditions you did not arrange, which is precisely a thing you take with you and learn about by going." },
        { key: "*|unasked", name: "Ask it before the taxonomy", role: "balance", chapterId: 2, body: "The division into flight and seeking runs on where the motive lives — behind or ahead — and his test settles that in one question: remove what unsettles you, and see whether a destination remains. Until that is answered the branches cannot be told apart from the inside.", action: "It is worth asking honestly, because both answers are respectable in his scheme. Flight has two entirely legitimate branches, one of which is fleeing what blocks a person from devoting himself to God — and travel undertaken as flight is not a lesser thing in this book. What it is not is a substitute for having asked." },
        { key: "flee-dunya|*", name: "Named without apology", role: "support", chapterId: 3, body: "Plague and epidemic when they appear in a town; fear whose cause is strife or a quarrel; a rise in prices; and harm directed at one person in particular. Ghazali lists these first among the causes of travel and does not pause to justify any of them.", action: "The one distinction he draws is between the general and the particular — a danger everyone in a place shares, and one attached to you alone — and it matters because the second is a reason for you and not for anyone else. Beyond that, the register of the passage is the useful thing: this is a description of why people move, not a list of permitted excuses." },
        { key: "flee-din|*", name: "The question Book 16 weighed", role: "balance", chapterId: 4, body: "His example is exact: one afflicted in his town with status and wealth and an abundance of causes that block him from devoting himself to God — so he prefers exile and obscurity. Note the word afflicted; prosperity is being treated as a trial. His second case is different: an innovation or an unlawful office pressed on a person, where flight answers a coercion.", action: "If it is the first, this is Book 16's weighing arriving by another route — seclusion achieved by distance — and the six benefits and seven goods there apply unchanged, including the ruling that one who has not learned what is obligatory is disobedient by withdrawing. If it is the second, it is a coercion rather than a disposition, and the reasoning is different." },
        { key: "seek-ilm|*", name: "Three kinds, and one that must be travelled for", role: "support", chapterId: 5, body: "He divides knowledge sought into three: a religious science, knowledge of one's own character and attributes by way of experience, and knowledge of the signs of the earth and its wonders — this last given Dhu al-Qarnayn as its precedent.", action: "The middle one is worth naming if it is yours, because it is the only kind that cannot be obtained by studying: character is visible under conditions a person did not arrange, and travel supplies those. If it is the first, Book 16's ruling is the relevant one — travel for obligatory knowledge is obligatory, and it sorts the same way." },
        { key: "seek-amal|*", name: "An act, or a person", role: "support", chapterId: 6, body: "Action divides into worship — the pilgrimage, the lesser pilgrimage, and struggle — and visitation, which he counts among the acts of nearness. Visitation aims either at a place, such as Mecca, Medina, Jerusalem, and the frontiers, or at the friends of God and the scholars.", action: "If it is a living person, note the reason he gives: that from looking at their states one gains strength of desire to imitate them. That is the same mechanism Book 38 names as the most beneficial treatment when the soul will not comply — observed and imitated rather than argued with, which means the value is in the seeing rather than in the conversation." },
        { key: "*|*", name: "Read the branch with the test", role: "balance", chapterId: 2, body: "A branch of the taxonomy, and whether moving would change the thing. His division is exhaustive by construction, so every journey lands somewhere in it — and the test is what tells you whether you have landed in the right place.", action: "Take the test first, since it can move you from one branch to another. Then read the sequence: the journey begins at the resolve, with what is settled and provided for before leaving, and ends at the return home rather than at the destination — which is where whether you obtained what you sought becomes visible." },
      ],
    },
  ],
};

export const book17Sources: SourceLink[] = [
  { label: "Primary Arabic text", note: "The complete public Arabic of Book 17 was read and used to establish the two chapters, the taxonomy of journeys, the manners of the sequence, and the technical requirements on a traveller.", url: "https://shamela.ws/book/9472/604" },
  { label: "The kinds of travel", note: "The passage naming travel a kind of movement and mixing, dividing every journey into flight or seeking, and setting out the branches of each.", url: "https://shamela.ws/book/9472/605" },
  { label: "Travel in seeking knowledge", note: "The passage treating the first division of seeking, and its being obligatory or supererogatory according to the knowledge sought.", url: "https://shamela.ws/book/9472/605" },
  { label: "The manners of the journey", note: "The section giving the manners from the first rising to the last return, including the conduct of a travelling party.", url: "https://shamela.ws/book/9472/613" },
  { label: "What a traveller must learn", note: "The second chapter, on the dispensations of travel, the indicators of the direction of prayer, and the determining of the times.", url: "https://shamela.ws/book/9472/617" },
  { label: "The dispensations", note: "The passage naming two dispensations in purification and two in the obligatory prayer, each with the conditions attaching to it.", url: "https://shamela.ws/book/9472/618" },
  { label: "Forty-book structure", note: "Ghazali.org's listing places Book 17 as the seventh book of the Quarter of Customs and confirms its title.", url: "https://www.ghazali.org/listing-the-forty-books/" },
];

export const book17: SystemBook = {
  id: 17,
  title: "The Etiquette of Travel",
  shortTitle: "Travel",
  defaultJourneyId: "why-go",
  chapters: book17Chapters,
  conceptNodes: book17ConceptNodes,
  journeys: book17Journeys,
  sources: book17Sources,
  taxonomy: {
    title: "Two chapters, three sections",
    note: "Ghazali's own division. The first chapter's first section carries the taxonomy of journeys and is where the book's thinking is; its second gives the sequence from the first rising to the last return; and the short second chapter gives what a traveller must know before he goes.",
    groups: book17Movements,
  },
  instrument: book17Instrument,
  editorialNote: "The two journeys, ten reading sections, visual models, and diagnostic are editorial learning aids. The sections follow Ghazali's own order, and the movements list splits his first chapter into its two sections, as he does. The English is an original synthesis made from a reading of the public Arabic text, not a translation and not a substitute for one. Reports and inherited anecdotes are presented as material Ghazali transmitted; this prototype does not independently grade every narration. Two matters of scope. The second section of the first chapter is practical instruction for travel as it was conducted in the eleventh century — mounts, stages, provisioning, the conduct of a caravan — and a good deal of it has no modern counterpart; this edition presents the shape of the sequence and the instructions whose reasoning carries across, and reproduces the rest not at all. And the second chapter is technical law: the conditions on wiping over footgear and on dry ablution, and the rules for shortening and combining prayers, together with methods for determining the direction of prayer and the times. Those rulings differ between the schools of law and depend on circumstances this edition cannot assess; nothing here should be used to determine what any traveller may do, which is the business of a work of law. Ghazali's inclusion of the visiting of graves within the kinds of travel is a placement within a taxonomy and not a ruling on the practice; Book 40 gives that ruling with its history and its conditions, and is cross-referenced. The diagnostic applies his own division and his own test to a journey the reader supplies and cannot pronounce on it.",
};
