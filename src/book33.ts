import { assetUrl } from "./assetUrl";
import type { Chapter, ConceptNode, VisualModel } from "./data";
import type { ConceptLab, Instrument, Journey, SourceLink, SystemBook, TaxonomyGroup } from "./systemTypes";

type Seed = {
  id: number; shortTitle: string; formalTitle: string; overview: string; thesis?: string;
  moves: Array<{ title: string; body: string }>;
  closer: Array<{ title: string; body: string }>;
  distinction: [string, string, string, string, string];
  misreading: string; reflection: string; audit: string[]; nodes: string[]; model: VisualModel;
};

const makeChapter = (seed: Seed): Chapter => ({
  id: seed.id, shortTitle: seed.shortTitle, formalTitle: seed.formalTitle, overview: seed.overview,
  reflection: seed.reflection, relatedNodes: seed.nodes, visualModel: seed.model,
  deep: {
    thesis: seed.thesis ?? seed.moves[0].body, context: seed.overview, moves: seed.moves, closeReading: seed.closer,
    distinction: { title: seed.distinction[0], firstLabel: seed.distinction[1], first: seed.distinction[2], secondLabel: seed.distinction[3], second: seed.distinction[4] },
    misreading: seed.misreading, observation: seed.reflection, selfAudit: seed.audit,
    sourceAnchor: `Book 33, ${seed.id <= 5 ? "Part One, on hope" : "Part Two, on fear"}, ${seed.formalTitle}.`,
  },
});

const chain = (title: string, caption: string, items: Array<[string, string, "support" | "balance" | "warning"]>): VisualModel => ({ kind: "chain", title, caption, items: items.map(([label, body, role]) => ({ label, body, role })) });
const pair = (title: string, caption: string, items: Array<[string, string, "support" | "balance" | "warning"]>): VisualModel => ({ kind: "pair", title, caption, items: items.map(([label, body, role]) => ({ label, body, role })) });
const spectrum = (title: string, caption: string, items: Array<[string, string, "support" | "balance" | "warning"]>): VisualModel => ({ kind: "spectrum", title, caption, items: items.map(([label, body, role]) => ({ label, body, role })) });

export const book33Chapters: Chapter[] = [
  makeChapter({
    id: 1, shortTitle: "Hope has a definition", formalTitle: "The reality of hope",
    overview: "Ghazali first separates a lasting quality of the heart from a passing state. Then he sorts everything a person meets by time: past, present, or still to come. That gives him a definition of hope. The definition carries a condition, and that condition decides everything else in the book.",
    thesis: "First Ghazali separates a settled level of the heart from a passing state. Then he pins hope down so exactly that it can be told apart from wishing.",
    moves: [
      { title: "Separate station from state", body: "A quality of the heart is called a settled level when it stays and lasts. It is called a state when it passes and leaves quickly. Think of yellowness. In gold it is fixed. In a frightened face it passes quickly. In a sick man it sits somewhere in between. The qualities of the heart divide in the same way." },
      { title: "Sort by time", body: "Whatever meets you is either past, present, or still to come. When something past comes to mind, that is memory. When something is present, you find it and taste it. When something is still to come and fills the heart, that is anticipation." },
      { title: "Divide the anticipated", body: "If the thing you are waiting for is something you dislike, the heart feels pain. That pain is fear. If it is something you love, the heart feels ease and delight at the thought of it. That ease is hope." },
      { title: "Attach the condition", body: "The good you are waiting for must have causes. If you expect it because most of its causes are in place, it is truly called hope. If you expect it while its causes are broken and in disorder, it is better called delusion and foolishness. If you do not know whether the causes are there or not, it is better called wishing. Wishing is expecting something with no cause behind it." },
      { title: "Note the sorting by time", body: "Ghazali begins by sorting whatever reaches a person by time: past, present, or still to come. The past gives memory, the present gives tasting, and what is to come gives anticipation. This puts hope and fear in the same box before he tells them apart. Both are anticipation, so both are about something that has not happened yet. That is why the warning about the ending in chapter 12 makes sense. Nothing that is still to come is ever settled." },
      { title: "Take the condition on the name", body: "The condition is where the whole book turns. Expecting a good whose causes are mostly in place is hope, and the name is true. Expecting it while the causes are broken is more truly called delusion. Expecting it when you do not know whether the causes are there is wishing. These are three words for the same feeling. The only thing that sorts them is the state of the ground. So a person cannot tell which one he has by checking how he feels." },
    ],
    closer: [
      { title: "Where doubt is required", body: "Nobody uses hope or fear about something certain. At sunrise you do not say, “I hope the sun will rise.” At sunset you do not say, “I fear it will set.” Both words belong to things that are truly open." },
      { title: "What this settles", body: "Book 30 defined delusion and left the full account of hope for this book. The condition about causes is that account. What separates hope from delusion is not how strongly you expect something. It is whether the causes are really in place." },
    ],
    distinction: ["Three anticipations of the same good", "Hope", "Most of its causes are present, so the anticipation has a ground.", "Delusion or wishing", "The causes are broken, or are simply unknown, and the expectation floats free of them."],
    misreading: "Do not conclude that hope requires certainty of the outcome. It requires that the causes be in place, which is a different and checkable thing.",
    reflection: "Take something you say you hope for and list its causes. The list is the whole test.",
    audit: ["What am I hoping for?", "Which of its causes are actually present?", "Have I confused wanting it badly with having grounds?", "If a friend described this to me, would I call it hope?"],
    nodes: ["raja", "causes", "tamanni"],
    model: chain("Sorting an anticipation", "The name follows the causes, not the feeling.", [["Anticipated and loved", "The expectation produces ease in the heart.", "balance"], ["Causes present", "The anticipation has a ground, and the name hope is truthful.", "support"], ["Causes broken", "The name delusion is truer, however strong the expectation.", "warning"], ["Causes unknown", "The name wishing is truer, since there is no cause at all.", "warning"]]),
  }),
  makeChapter({
    id: 2, shortTitle: "The farmer's measure", formalTitle: "Measuring a hope by the sower's",
    overview: "This chapter gives the picture that makes the talk of causes usable. Measure your hope for forgiveness exactly as a farmer measures his hope for a crop.",
    thesis: "Measure your hope for forgiveness the way a farmer measures his hope for a crop — by what you actually did to the ground.",
    moves: [
      { title: "Set the terms", body: "This world is the farmland of the next. The heart is the ground and faith is the seed. Acts of obedience are the work of the farm: turning and clearing the soil, digging channels, and bringing water to it." },
      { title: "Name the failure case", body: "A heart swallowed up by the world is like salty ground, where seed does not grow. Faith does not grow in a corrupt heart with bad character, just as seed does not grow in salty ground." },
      { title: "Set the harvest", body: "The Day of Rising is the harvest. No one reaps anything but what he sowed, and no crop grows without a seed." },
      { title: "Give the measure", body: "Compare hoping for forgiveness with hoping for a crop. Suppose you found good ground and sowed good seed that was not rotten or eaten through. You watered it when it needed water and cleared out the thorns. Then you sat down to wait. You are hoping. Anyone else is wishing." },
      { title: "Take the four acts of the sower", body: "The measure is four things a farmer does. They are worth listing, because they are the test. Find ground that will take a crop. Sow seed that is not rotten or eaten. Water it when it needs water. Clear out the thorns. Then sit down and wait. A man who has done all four and expects a harvest is hoping. A man who skipped one and expects the same is wishing. From the inside, the two feel exactly the same." },
      { title: "Note where the ground comes in", body: "The sharpest part of the picture is where the failure happens. It is in the ground, not the seed. Faith is the seed, and it is sound. The heart is the ground, and it has gone salty from being swallowed up by the world. So the seed does not fail, but it does not grow either. This is an exact picture of a person who believes everything correctly and produces nothing. It also explains why this book has to come after the whole Quarter of Perils." },
    ],
    closer: [
      { title: "Why an agricultural image", body: "Farming is the classic case of a fair expectation about something not yet in hand. The farmer does not control the outcome, but he is not just wishing either. That is exactly where the reader of this book stands." },
      { title: "What it lets a reader do", body: "The picture turns a question nobody can answer into one a person can. Instead of asking whether he will be forgiven, he can ask which of the farmer's tasks he has actually done." },
    ],
    distinction: ["Two people awaiting a harvest", "The sower", "Ground prepared, seed cast, water brought, thorns cleared, and then waiting.", "The onlooker", "Nothing was done to the ground, and the waiting is identical from outside."],
    misreading: "Do not read the picture as making forgiveness an automatic payment for effort. Ghazali's farmer still has no guarantee. That is why the word all through the book is hope, not certainty.",
    reflection: "Ask which of the four acts you have done with respect to the thing you are hoping for.",
    audit: ["What ground have I prepared?", "What seed did I actually cast?", "When did I last water it?", "What thorns have I left standing?"],
    nodes: ["raja", "causes", "tillage"],
    model: chain("The sower's four acts", "Each is checkable, which is what makes the hope checkable.", [["Good ground", "A heart not so absorbed that nothing grows in it.", "support"], ["Sound seed", "Faith that is neither rotten nor worm-eaten.", "support"], ["Water in season", "Acts of obedience supplied at their times.", "support"], ["Thorns cleared", "What would otherwise choke the crop is removed.", "support"]]),
  }),
  makeChapter({
    id: 3, shortTitle: "Why hope is praised", formalTitle: "The excellence of hope and the encouragement toward it",
    overview: "Hope has now been defined and given limits. Only then does Ghazali gather what is said in its praise. The order matters: he set the limit before he offered the encouragement.",
    thesis: "Once hope is defined and limited, its praise can be gathered safely. It will not encourage the wishing he has just ruled out.",
    moves: [
      { title: "Gather the testimony", body: "He gathers the verses and reports about how wide God's mercy is, and there are a great many of them." },
      { title: "Note the placement", body: "They come after the definition, not before it. So a reader meets them already knowing the difference between hope and wishing." },
      { title: "Keep the office of hope in view", body: "Hope is praised for what it does. It moves a person toward the ground and the seed. It does not excuse him from them." },
      { title: "Mark the danger", body: "Read without the definition, the same material produces exactly the delusion described in Book 30. That is why the order of the chapters is itself an argument." },
      { title: "Note why the order of the sections is the argument", body: "There are many reports about how wide mercy is, and they come after the definition, not before it. That order does real work. A reader who already knows the difference between hope and wishing takes them as encouragement to sow. A reader who meets them first takes them as a reason he need not bother. The material is the same; the order decides how it lands." },
      { title: "Take the connection to the book on delusion", body: "Ghazali states the danger openly, and it is a warning about his own material. Read without the definition, this same praise produces exactly the state described in the book on delusion. It is like the hired man who smashes the vessels, then sits down to wait for his wages because the employer is generous. Hope is praised only for what it moves a person to do." },
    ],
    closer: [
      { title: "The two offices of hope", body: "Book 30 named them. Hope pushes back the despair that blocks repentance. It also wakes up energy that has slackened to the bare minimum. Everything gathered here serves one of those two jobs." },
      { title: "Why the encouragement is so strong", body: "Because despair is truly destructive, and this half of the book exists to treat it. The language is as strong as that danger calls for. It is not written with the opposite danger in mind." },
    ],
    distinction: ["Two ways to receive an encouragement", "As a summons", "It moves the person toward the acts the previous section listed.", "As a permission", "It relieves him of them, which the previous section was written to prevent."],
    misreading: "Do not take the size of what is promised as making the conditions optional. Ghazali has just spent two chapters showing that hope without causes has a different name.",
    reflection: "Notice whether this material moves you to act or lets you settle down. That one question holds the whole of Book 30.",
    audit: ["Did this move me or relieve me?", "Which practice quietly lapsed once I stopped worrying?", "Am I in danger of despair or of security?", "Which of hope's two offices do I need?"],
    nodes: ["raja", "despair"],
    model: pair("One body of reports, two readings", "The definition decides which reading a person gives it.", [["Read as a summons", "It rouses effort and defeats despair, which are hope's two offices.", "support"], ["Read as a permission", "It produces slackness, which is delusion rather than hope.", "warning"]]),
  }),
  makeChapter({
    id: 4, shortTitle: "How hope is produced", formalTitle: "The remedy of hope and the way its state is obtained",
    overview: "Hope is a state, and you cannot call up a state just by wanting it. So Ghazali treats hope as something you produce by working on its cause. He treated regret the same way in Book 31.",
    thesis: "Hope is a state and cannot be called up at will. So the remedy works on what produces it, not on the state itself.",
    moves: [
      { title: "State the method", body: "A state follows from knowledge. So the way to get hope is to supply the knowledge that produces it, not to order yourself to feel it." },
      { title: "Identify who needs it", body: "The treatment is for the person overcome by despair, or the one whose effort has collapsed. It is not for the person who already tends to feel safe." },
      { title: "Work on the causes", body: "Hope was defined by its causes being in place. So part of producing hope is actually putting the causes in place. That sends the reader back to the farmer's four tasks." },
      { title: "Keep the dosage in view", body: "Hope is a medicine, not a good in itself. So how much of it a person needs depends on his illness. The second half of the book takes up that question directly." },
      { title: "Follow the method", body: "The method follows from what the previous book taught: states come from knowledge. So the way to get hope is to supply the knowledge that yields it, not to order up the feeling. The treatment is about what a person pays attention to, and how often. It is not about resolving to be more hopeful. Such a resolution has nothing to work on." },
      { title: "Take the two-sided nature of the remedy", body: "There is a second half that most treatments of hope leave out. Hope was defined by its causes being in place. So producing it partly means actually putting the causes in place, going back to the ground and the seed. The remedy is not only a new way of looking at things. It also changes the facts you are looking at. A man whose field is unsown cannot be cured by being shown the reports." },
      { title: "Note that it is a remedy with a dose", body: "Hope is a medicine, not a good in itself, so the right amount depends on what is wrong with the person taking it. Given to someone in despair, it restores his effort. Given to someone who already feels safe, it makes his illness worse. Chapter 10 takes up exactly this question. It is also why the book treats hope and fear together instead of simply praising either one." },
    ],
    closer: [
      { title: "Why despair is treated as the disease", body: "Despair ends the effort that everything depends on. That is why Book 30 paired it with delusion: both stop a person moving. Hope's whole job is to defeat despair." },
      { title: "The remedy is not reassurance", body: "Giving someone grounds is different from giving them comfort. By Ghazali's definition, telling a person his causes are in place when they are not produces delusion, not hope." },
    ],
    distinction: ["Two ways to raise someone's hope", "By supplying grounds", "The causes are established or pointed out, and the state follows the knowledge.", "By supplying comfort", "The feeling is encouraged directly, which produces the state without its ground."],
    misreading: "Do not conclude that a person in despair should just be told to hope. Hope is an effect, and the work has to be done on its cause.",
    reflection: "If you need hope, ask whether you need grounds or reassurance. They are not the same request.",
    audit: ["Am I short of grounds or short of comfort?", "What cause could I actually establish this week?", "Whom do I ask for reassurance instead of help?", "Has my despair stopped me acting?"],
    nodes: ["raja", "despair", "causes"],
    model: chain("Producing a state", "The same method as regret in Book 31.", [["Work at the knowledge", "The state follows what is known, and cannot be summoned directly.", "support"], ["Establish the causes", "Hope was defined by their presence, so supplying them is part of the cure.", "support"], ["The state follows", "Ease at an anticipation that now has a ground.", "balance"]]),
  }),
  makeChapter({
    id: 5, shortTitle: "Above both", formalTitle: "The condition in which neither fear nor hope remains",
    overview: "Before turning to fear, Ghazali records a view that would make his whole subject temporary. He answers it by saying where on the path he is writing.",
    thesis: "Ghazali reports a view that would do away with both fear and hope. He does this before turning to fear.",
    moves: [
      { title: "State the position", body: "Some people have grown close to God. Their hearts are taken up with Him, and they live wholly in the present moment. Nothing in them is turned toward the future. So they have neither fear nor hope." },
      { title: "Give the reason", body: "Fear and hope are both about time. Both concern what is still to come, and both hold the self back from its excesses. When the future has dropped out of sight, neither has anything to hold on to." },
      { title: "Report the strongest form", body: "Al-Wasiti said that fear is a screen between God and a person. When God shows Himself in the deepest part of the heart, there is no room left there for hope or fear." },
      { title: "Answer it by location", body: "Ghazali does not argue with this description. He says: we are now speaking of the first levels of the path. The book is written for the road, not for its end." },
      { title: "Take the position seriously", body: "The view is a real one, and Ghazali does not make fun of it. A person wholly taken up with God, living in the present moment, has nothing turned toward the future. Fear and hope are both about what is still to come, so neither has anything to hold on to. Al-Wasiti puts it even more strongly. He says fear is itself a screen, and when God shows Himself there is no room left for either." },
      { title: "Note how the objection is answered", body: "Ghazali answers without disputing the description or softening the report. He says this discussion is about the first levels of the path. So the whole book is guidance for the road, not a picture of its highest end. A reader who has not reached that end cannot treat its conditions as instructions for the journey. Doing so would turn a description of arrival into permission to drop the fear and hope still needed on the way." },
    ],
    closer: [
      { title: "Why he includes it at all", body: "Ghazali includes a view that seems to make his subject unnecessary. He answers it by placing it on the path, not by refuting it. This is typical of him, and it tells the reader what kind of book this is." },
      { title: "The lover's case", body: "The reason given is this. Suppose a lover's heart is taken up with watching the beloved, but fear of separation keeps it busy. That is a flaw in the watching. Unbroken watching of the beloved is the highest level of all. Book 36 takes this up." },
    ],
    distinction: ["Two reasons for having no fear", "Beyond it", "The future has dropped from view because something present has wholly occupied the heart.", "Short of it", "The future has dropped from view because nothing is being attended to at all."],
    misreading: "Do not use this chapter to excuse yourself from fear or hope. Ghazali quotes the view and at once says he is writing about the first levels. That is where the reader is.",
    reflection: "Notice how attractive it is to picture yourself in the state that needs neither. Ask what that attraction is made of.",
    audit: ["Where on the road am I actually standing?", "Do I claim a station I have not travelled to?", "Is my lack of fear from fullness or from inattention?", "What would honest location look like here?"],
    nodes: ["stations", "raja", "khawf"],
    model: pair("Two absences of fear", "They look identical from outside and are opposite conditions.", [["From fullness", "Continuous witnessing leaves no room for either, which is the end of the road.", "support"], ["From inattention", "Nothing is being attended to, which is where most such claims come from.", "warning"]]),
  }),
  makeChapter({
    id: 6, shortTitle: "Fear has a cause", formalTitle: "The reality of fear",
    overview: "Part Two builds fear the same way hope was built, and pins down the knowledge behind it. Fear follows what a person knows about the causes that lead to what he dislikes.",
    thesis: "Fear is built the same way as hope, and it sits in the same place.",
    moves: [
      { title: "Give the three parts", body: "Fear has three parts: knowledge, a state, and an act. The knowledge is knowing the cause that leads to the outcome you dislike. The burning in the heart that follows is fear itself." },
      { title: "Give the analogy", body: "Picture someone who offended a king and was caught. He fears execution, even though a pardon is still possible. How strongly he fears depends on the details. How serious was the offence? How much does the king tend toward revenge? How much pull do the people demanding punishment have? Does the offender have someone to speak for him, or any good record that might count in his favor?" },
      { title: "Add the other source", body: "Fear can also come from nothing you did, simply from what you are facing. Someone who falls into a lion's claws fears it because it is a lion. In the same way, water is feared because it flows and fire because it burns." },
      { title: "Apply it", body: "So fear of God comes from three places. Sometimes it comes from knowing God and His attributes: if He destroyed all the worlds He would not mind, and nothing could stop Him. Sometimes it comes from how many wrongs a person has done. Sometimes it comes from both together." },
      { title: "Take the analogy of the offender", body: "The comparison is unusually detailed, because each detail changes the fear. Someone caught after offending a king may still hope for a pardon. But his fear will vary with how serious the offence was and how much the king tends toward revenge. It will also vary with the pull of the people demanding punishment, and with whether he has someone to speak for him or any good record. Fear is not one fixed amount. Several conditions shape it, and each can be checked." },
      { title: "Note the second source of fear", body: "Then Ghazali names a completely different source: fear that has nothing to do with anything you did. A man in a lion's claws fears it because it is a lion, as water is feared because it flows and fire because it burns. So fear of God can come from His attributes alone, with no reference to the person's record at all. If He destroyed the worlds He would not mind, and nothing could stop Him. The two sources produce very different kinds of fear." },
    ],
    closer: [
      { title: "The consequence Ghazali draws", body: "The person who fears God most is the one who knows himself and God best. That is why the Prophet said, “I am the most fearful of you toward God.” It is also why the verse says that it is only those who know who fear Him." },
      { title: "Why this makes fear a knowledge problem", body: "If fear follows knowledge of the causes, a person with little fear knows little about himself or little about his Lord. That is a diagnosis, not a scolding." },
    ],
    distinction: ["Two sources of the same fear", "From one's own record", "The offences are many and the causes leading to the disliked outcome are correspondingly strong.", "From the One feared", "Nothing prevents Him and He is not questioned, which produces fear without reference to any particular offence."],
    misreading: "Do not think of fear as a mood some people just happen to have. Here it is a result of knowledge. That is why having no fear tells you something.",
    reflection: "Ask where your fear, such as it is, comes from: your own record, or what you know of the One you fear. Most people have only the first.",
    audit: ["Which of the two sources is mine?", "What does my level of fear say about my knowledge?", "Do I have any intercessor or merit in view?", "Am I fearing consequences or fearing Him?"],
    nodes: ["khawf", "knowledge", "causes"],
    model: chain("What the fear tracks", "Each factor in the analogy raises or lowers it.", [["The offence", "Its gravity, which the person alone can weigh.", "warning"], ["The One offended", "His attributes, and that nothing prevents Him.", "warning"], ["Any intercessor", "Whether anything stands between the offence and its consequence.", "balance"], ["Any merit", "Whether anything effaces the mark of what was done.", "balance"]]),
  }),
  makeChapter({
    id: 7, shortTitle: "The whip", formalTitle: "The degrees of fear and its variation in strength and weakness",
    overview: "This is the most immediately useful chapter in the book. Fear is praiseworthy, so you might think more is always better. Ghazali says plainly that this is a mistake, and he gives a test.",
    thesis: "Fear comes in degrees. The most useful lesson in the book is that too much fear counts as a failure, not as extra devotion.",
    moves: [
      { title: "Give the image", body: "Fear is God's whip. With it He drives people to keep going in knowledge and action, so that they may come near to Him. It is best that an animal not be without a whip, and a child too. But that does not show that beating harder is praiseworthy." },
      { title: "Name the three degrees", body: "Fear can be too little, too much, or balanced. The praiseworthy one is the balance, the middle." },
      { title: "Describe the deficient", body: "Too little fear is a tenderness that comes when you hear a verse. It brings weeping and flowing tears. But once the cause is out of sight, the heart goes back to not paying attention. It is like a thin switch used on a strong animal: it does not hurt enough to drive it anywhere. Ghazali says this is the fear of everyone except those who truly know God." },
      { title: "Give the test", body: "Fudayl said that if you are asked whether you fear God, you should stay silent. If you say no, you have disbelieved. If you say yes, you have lied. He meant that fear is what holds the limbs back from sins and ties them to obedience. Whatever does not reach the limbs is just the self talking, a passing thought. It does not deserve the name fear." },
      { title: "Note the whip image and its limit", body: "The picture is a whip, which is not a flattering thing to be compared to. Fear drives a person to keep going in knowledge and action so that he may come near to God. It is better that an animal not be without a whip, and a child too. Then, in the same breath, comes the limit: none of that shows that beating harder is better. That is why the chapter is about degrees, not about how intense fear is." },
      { title: "Take the description of deficient fear", body: "Ghazali's description of too little fear is uncomfortably familiar. A tenderness comes when you hear a verse. It brings weeping and flowing tears, and it is gone as soon as the cause is out of sight. He compares it to a thin switch on a strong animal, which does not hurt enough to move it anywhere. He says plainly that this is the fear of everyone except those who truly know God. The tears are real, but they are not the thing itself." },
      { title: "Follow Fudayl's test", body: "Fudayl's saying supplies the test. If you are asked whether you fear God, you should stay silent. Saying no is disbelief, and saying yes is a lie. His meaning is stated directly. Fear is what holds the limbs back from sins and ties them to obedience. Whatever does not reach the limbs is just the self talking, a passing movement that does not deserve the name. This turns an inner state into something you can check from the outside." },
    ],
    closer: [
      { title: "The excessive degree", body: "Fear that goes past the balance turns into despair, and despair ends the effort fear was meant to produce. So too little fear and too much fear end in the same place, by opposite roads." },
      { title: "The aside about scholars", body: "By those who truly know God, Ghazali says, he does not mean people wearing the marks and titles of scholars. They are the furthest of all people from fear. The remark belongs with Book 30's first group of the deluded." },
    ],
    distinction: ["Two things that feel like fear", "Fear that drives", "It reaches the limbs, restraining them from sins and binding them to obedience.", "Fear that moves nothing", "It produces tears at the moment and heedlessness afterwards, and does not deserve the name."],
    misreading: "Do not conclude that being moved to tears is worthless. Ghazali's point is that it is not yet fear in the sense that matters. He does not say it is a fault.",
    reflection: "Ask what your fear changed this week. If nothing, the section has told you which degree you are at.",
    audit: ["What did my fear stop me doing?", "What did it make me do?", "Does it survive the verse being over?", "Has it passed into despair anywhere?"],
    nodes: ["khawf", "degrees", "limbs"],
    model: spectrum("Three degrees of the whip", "Both extremes end the striving, by opposite routes.", [["Deficient", "Tears at the moment, heedlessness after; it reaches no limb.", "warning"], ["Balanced", "It restrains the limbs from sins and binds them to obedience.", "support"], ["Excessive", "It passes into despair, which ends the effort it was to produce.", "warning"]]),
  }),
  makeChapter({
    id: 8, shortTitle: "What is feared", formalTitle: "The kinds of fear according to what is feared",
    overview: "Ghazali sorts fear by what is feared. This matters, because the different objects should lead to very different results.",
    thesis: "Sorting fear by what is feared matters. The same feeling aimed at different things becomes a different thing.",
    moves: [
      { title: "Sort by object", body: "Fear takes its character from what is feared. The one word covers states that have almost nothing else in common." },
      { title: "Distinguish fearing consequences from fearing Him", body: "Fear of punishment and fear of God Himself are different in kind, and Ghazali places them at different levels." },
      { title: "Name the fear of the end", body: "Fear about how your life will end is treated as a separate object. It is the fear that fills the stories of the early Muslims at the close of the book." },
      { title: "Include the fear of the veil", body: "The highest object is separation from God itself. It is feared with no thought of any punishment, and it links this book to Book 36." },
      { title: "Note why sorting by object matters", body: "Sorted by what is feared, fear turns out to be several states that share a name and almost nothing else. Fearing punishment and fearing God Himself differ in kind, not just in amount, and Ghazali places them at different levels. So a person cannot judge his own fear by how strong it is. He has to ask what it is fear of. The answer to that, not the amount, shows where he stands." },
      { title: "Take the two highest objects", body: "The two highest objects have no self-interest in them. Fear about how you will end concerns nothing present at all. That is why it fills the stories of the early Muslims at the close of the book. Fear of the veil is the highest. It is fear of separation itself, with no thought of punishment. It connects this book to the book on love, because you can only fear separation if there is someone you would be separated from." },
    ],
    closer: [
      { title: "Why the sorting is practical", body: "A person may find that his fear, which he thought was religious, is entirely fear of consequences. That discovery shows what he knows and what he does not." },
      { title: "The link to what follows", body: "Once the objects are separated, the question of which is more beneficial, fear or hope, can be asked properly. The answer differs depending on what a person is actually afraid of." },
    ],
    distinction: ["Two objects of one word", "Fearing an outcome", "What is feared is a punishment, and the fear would end if the punishment were lifted.", "Fearing the One", "What is feared is separation and His majesty, and the lifting of a punishment would not touch it."],
    misreading: "Do not treat fear of consequences as wrong. Ghazali puts the objects in order but dismisses none of them. The whip works on those who feel the lash.",
    reflection: "Ask what would have to be guaranteed for your fear to disappear. The answer names its object.",
    audit: ["What exactly am I afraid of?", "Would a guarantee of safety end it?", "Do I fear an outcome or a separation?", "Which object have I never once feared?"],
    nodes: ["khawf", "objects"],
    model: chain("Objects of fear, ascending", "The word covers conditions that differ in kind.", [["Punishment", "The outcome is feared, and safety would end the fear.", "balance"], ["The end", "How one will finish, which no present condition settles.", "balance"], ["Separation", "The veil itself, feared without reference to any punishment.", "support"]]),
  }),
  makeChapter({
    id: 9, shortTitle: "Why fear is praised", formalTitle: "The excellence of fear and the encouragement toward it",
    overview: "This chapter matches the one on hope's excellence. Ghazali gathers a large body of material in praise of fear, and it sets up the comparison that follows.",
    thesis: "This is the counterpart to hope's excellence. It comes after the analysis, so it cannot be misread.",
    moves: [
      { title: "Gather the testimony", body: "He gathers the verses and reports praising fear, and notes that there are many. That fact becomes part of the argument in chapter 10, on which is more beneficial." },
      { title: "Keep the office in view", body: "Fear is praised for what it produces: keeping going in knowledge and action, and holding the limbs back. The praise goes to the whip that works, not to the feeling." },
      { title: "Connect it to knowledge", body: "The reports that link fear to knowledge are given special weight, because chapter 6 made fear a result of knowing." },
      { title: "Prepare the comparison", body: "Now both states have been praised at length. So the obvious question, which one is higher, can no longer be avoided. The next chapter takes it up." },
      { title: "Note what the praise attaches to", body: "There are many reports on fear, and Ghazali points this out. It will matter in chapter 10, when he says fear is more beneficial for most people. But he reads the praise carefully. It goes to what fear produces, keeping going in knowledge and action and holding the limbs back, not to the feeling itself. He read the reports on hope the same way. This keeps both from being taken as advice to feel something." },
      { title: "See why fear is tied to knowledge", body: "The reports linking fear to knowledge get special weight. Chapter 6 made fear a result of knowing, not a matter of temperament. That has a consequence people resist. You cannot increase fear by trying harder to be afraid. You can increase it by learning more about the two things it is fear of. That is what makes it treatable at all." },
    ],
    closer: [
      { title: "Why both were praised so strongly", body: "Because both illnesses are real and common. The praise of fear is aimed at people who feel safe. The praise of hope is aimed at people in despair. A reader who takes either as a general ranking has misunderstood what both are for." },
      { title: "The problem this creates", body: "The reader has now read strong praise of both, and honestly does not know which to seek. The next chapter opens by naming exactly that confusion." },
    ],
    distinction: ["Two ways to read strong praise", "As a prescription", "It is aimed at a disease, and applies to the person who has that disease.", "As a ranking", "It settles which state is higher in general, which the next section calls a corrupt question."],
    misreading: "Do not read the amount of material on fear as proof that fear is the higher state. Ghazali takes up that conclusion directly and qualifies it with care.",
    reflection: "Notice which of the two bodies of material you find more comfortable. Consider that this may show which one you need.",
    audit: ["Which praise do I enjoy hearing?", "Which do I skip over?", "What does that preference indicate?", "Am I collecting reassurance or treatment?"],
    nodes: ["khawf", "raja"],
    model: pair("Two bodies of praise", "Each is aimed at a different disease.", [["Praise of fear", "Aimed at security and delusion, which are the commoner failure.", "balance"], ["Praise of hope", "Aimed at despair, which ends striving just as surely.", "balance"]]),
  }),
  makeChapter({
    id: 10, shortTitle: "A corrupt question", formalTitle: "Whether the better is the dominance of fear, of hope, or their balance",
    overview: "This chapter is the turning point of the whole book. Ghazali refuses the question as it is asked and puts a better one in its place. That new question is the most useful thing in either half, and you can carry it into the rest of life.",
    thesis: "Ghazali refuses the question as it is asked and replaces it with one that can actually be answered.",
    moves: [
      { title: "Refuse the question", body: "Asking whether fear is better than hope is a broken question. It is like asking whether bread is better than water. Bread is better for the hungry and water for the thirsty. If a person is both, look at which need is stronger. If the needs are equal, the two are equal." },
      { title: "Give the reason", body: "When something is wanted for a purpose, its worth shows up in relation to that purpose, not in itself. Fear and hope are two medicines for treating hearts. So their worth depends on the illness present." },
      { title: "Apply it", body: "If what fills the heart is feeling safe from God's devising, fear is better. If despair fills it, hope is better. If disobedience fills it, fear is better." },
      { title: "Correct the vocabulary", body: "For anything wanted for the sake of something else, the right words are “more beneficial,” not “better.” Ghazali says that for most people fear is more beneficial than hope, because sins are so common." },
      { title: "Take the refusal of the question", body: "The refusal is the sharpest point in the book, and it is made by comparison. Asking whether fear is better than hope is like asking whether bread is better than water. Bread is better for a hungry man and water for a thirsty one. When he is both, look at which need is stronger. When the needs are equal, so are the two. The question was never about the things themselves. It was about the person asking." },
      { title: "Follow the principle behind it", body: "The principle underneath is general. When something is wanted for a purpose, its worth is measured by that purpose, not by itself. Fear and hope are medicines for hearts, so their level is set by the illness. That is why Ghazali can give three verdicts without contradicting himself. Feeling safe calls for fear. Despair calls for hope. Disobedience that has taken over calls for fear." },
      { title: "Note the correction of vocabulary", body: "The chapter closes by correcting a word, which is typical of Ghazali. For anything wanted for the sake of something else, the right term is “more beneficial,” not “better.” That lets him say what he actually thinks. Fear is more beneficial for most people, given how much they sin. But this does not place one state above the other in itself." },
    ],
    closer: [
      { title: "The one general ranking he allows", body: "If you look at where they come from rather than what they are used for, hope is better. Hope is drawn from the sea of mercy, and fear from the sea of wrath. Whoever keeps his eyes on the attributes that call for gentleness is filled with love. Beyond love, Ghazali says, there is no higher level." },
      { title: "The balanced case", body: "Take the God-fearing person who has left sin behind, both outward and inward. For him the more beneficial thing is that fear and hope be balanced. It was said that if the believer's fear and hope were weighed, they would balance." },
    ],
    distinction: ["Two questions about a remedy", "Which is better", "A question about the things themselves, which Ghazali calls corrupt for anything wanted for a purpose.", "Which is more beneficial", "A question about this person's present disease, which is answerable."],
    misreading: "Do not draw a general rule that fear should dominate. Ghazali says it is more beneficial for most people because sins are common. That is a claim about the patients, not about the medicines.",
    reflection: "Diagnose yourself before you choose: do you feel safe, are you in despair, or has disobedience taken over? The prescription follows from the diagnosis, not from what you prefer.",
    audit: ["Which disease actually dominates me?", "Have I been seeking the remedy for someone else's condition?", "Do I use better where I should use more beneficial?", "If both are balanced in me, is that true or is it inattention?"],
    nodes: ["balance", "khawf", "raja", "remedy"],
    model: chain("Diagnose, then prescribe", "The prescription follows the disease, not the preference.", [["Security dominates", "Feeling safe from His devising; fear is the more beneficial.", "warning"], ["Despair dominates", "The striving has ended; hope is the more beneficial.", "warning"], ["Disobedience dominates", "Fear again, since it is what reaches the limbs.", "warning"], ["Nothing dominates", "For the one who has left sin, the balance of both.", "support"]]),
  }),
  makeChapter({
    id: 11, shortTitle: "How fear is produced", formalTitle: "The remedy by which the state of fear is obtained",
    overview: "Like hope, fear is a state and cannot be ordered up. Ghazali explains how it is produced. This follows from his having made it a result of knowledge.",
    thesis: "Fear cannot be ordered up either, so its remedy also works on the causes.",
    moves: [
      { title: "State the method", body: "Fear follows from knowing the causes that lead to what you dislike. So the way to get it is to supply that knowledge, not to demand the feeling." },
      { title: "Work on both sources", body: "Chapter 6 named two sources of fear, and they give two lines of work. One is knowing your own record. The other is knowing the One you fear. Most people can reach the first and neglect the second." },
      { title: "Aim it correctly", body: "The treatment is for the person who feels too safe. Giving it to someone already in despair would make the illness worse, not cure it." },
      { title: "Watch the measure", body: "Too much fear turns into despair, so the remedy has a dose. Chapter 7, on the degrees of fear, tells a person when to stop." },
      { title: "Take the two lines of work", body: "The two sources of fear give two separate lines of work, and Ghazali notes that most people take only the first. Anyone willing to look can know his own record, and that produces the ordinary kind of fear. The other line is knowing the One feared. It produces a fear that does not depend on what a person has done. That is why it lasts even in prophets and angels, as chapter 13 shows." },
      { title: "Note the two-sided warning about aim", body: "The treatment is aimed, not general. It is for the person who feels too safe. Giving it to someone already in despair would deepen the illness instead of curing it. Chapter 4 gave the same warning about hope, from the other side. Together the two warnings show that chapter 10's refusal to put one state above the other is not a dodge. It is the only position that makes sense." },
    ],
    closer: [
      { title: "Why this is short", body: "The substance of the remedy was already given in chapter 6. What is left here is how to apply it. So this chapter is a set of instructions, not an argument." },
      { title: "The check that goes with it", body: "The test is still the one Fudayl gave: does it reach the limbs? A treatment that produces feeling but does not change behaviour has not produced fear." },
    ],
    distinction: ["Two ways to raise fear", "By supplying knowledge", "The causes are made clear, and the state follows what is known.", "By supplying alarm", "The feeling is provoked directly, which produces the deficient degree rather than the balanced one."],
    misreading: "Do not read this as permission to frighten people, or yourself, without thought. The chapter says clearly that the remedy is aimed at an illness and has a dose.",
    reflection: "Ask which of the two sources of fear you have never worked on, and spend an hour there.",
    audit: ["Which source have I neglected?", "Am I applying this to the right disease?", "Where has alarm substituted for knowledge?", "Do I know when to stop?"],
    nodes: ["khawf", "remedy", "knowledge"],
    model: pair("Two lines of work", "Both were named when fear was defined.", [["Knowing yourself", "The record and its causes, which most people have some access to.", "balance"], ["Knowing the One feared", "His attributes, which Ghazali says produces the stronger fear.", "support"]]),
  }),
  makeChapter({
    id: 12, shortTitle: "A bad end", formalTitle: "The meaning of a bad ending",
    overview: "Most of the fear in this book comes back to fear about how a person's life will end. So Ghazali explains what that means, and separates two levels of it.",
    thesis: "Most of the fear in this book returns to one thing: how a life ends.",
    moves: [
      { title: "Give the graver rank", body: "The graver kind is this. At the pains of death, when its terrors appear, doubt or denial takes over the heart. The soul is taken in that state. What took over then becomes a veil between the person and God forever." },
      { title: "Give the lesser rank", body: "The lesser kind is this. At death, love of some worldly thing, or a craving for it, takes over the heart. It fills the heart and absorbs the person, until there is no room in that moment for anything else." },
      { title: "Explain why it is feared", body: "It is feared because neither kind is a verdict on a whole life. Each is a condition at one moment. Nothing about how a person is now guarantees what that moment will hold." },
      { title: "Draw the practical consequence", body: "What a person can work on is not the moment itself. It is what he is usually full of, because what fills the heart at the end is what filled it before." },
      { title: "Note the two ranks and what separates them", body: "The two levels are separated by what takes over at the moment of death, and the lesser one is the more disturbing. In the graver one, doubt or denial takes over as the terrors appear. In the lesser one, love of some worldly thing or a craving for it takes over instead. It fills the moment and leaves no room for anything else. The second needs no unbelief at all, only being preoccupied. Most people are in that condition most days." },
      { title: "Take the practical conclusion", body: "No one can rehearse the final moment, but Ghazali identifies one practical principle: what dominates at the end is ordinarily what dominated beforehand. The work therefore concerns what habitually fills the person, not an unreachable future instant. That is the subject of the ten books preceding this one. Fear of a bad ending should direct a person toward that work rather than toward helpless anxiety." },
    ],
    closer: [
      { title: "Why the second rank is the practical one", body: "People imagine the first as rare and catastrophic. The second is part of ordinary life. It means being full of something at the end because you were full of it all along." },
      { title: "The link to the closing sections", body: "The stories that follow, of the prophets, the Companions and the early Muslims, are all about people who feared exactly this. That is why Ghazali puts this explanation right before them." },
    ],
    distinction: ["Two ranks of the same fear", "Doubt at the end", "Denial or doubt dominates at the throes and becomes a permanent veil.", "Absorption at the end", "A worldly love dominates and fills the moment, which is continuous with ordinary life."],
    misreading: "Do not treat fear of a bad end as a reason to despair. Ghazali points to what a person is usually full of, which he can work on. He does not point to the final moment itself, which no one can reach.",
    reflection: "Ask what you are most often full of. On this account that is the honest forecast.",
    audit: ["What occupies me most?", "What would fill the moment if it came now?", "Am I working on the moment or on the habit?", "Has this fear ever changed anything I did?"],
    nodes: ["khatima", "khawf"],
    model: pair("Two ranks of a bad ending", "The second is the one continuous with ordinary life.", [["Doubt or denial", "Dominates at the throes and becomes a permanent veil.", "warning"], ["Worldly absorption", "Fills the moment because it filled the years before it.", "warning"]]),
  }),
  makeChapter({
    id: 13, shortTitle: "Those who feared most", formalTitle: "The fear of the prophets and the angels",
    overview: "Ghazali closes with two long collections of stories. The first is about prophets and angels, whose standing would seem to free them from fear. That is exactly why he gathers it.",
    thesis: "The stories of prophets and angels are gathered to show that fear grows with knowledge. It does not shrink as knowledge grows.",
    moves: [
      { title: "Choose the hardest cases", body: "The stories are about prophets and angels. Their position would seem to remove any reason to fear, yet they are reported as fearing most." },
      { title: "Draw the inference", body: "If fear follows knowledge of yourself and of the One you fear, then those who know most will fear most. The collection is gathered to show exactly that." },
      { title: "Refuse the comfortable reading", body: "The stories are not offered as amazing feats to admire from far away. They are evidence for the claim made in chapter 6, that fear comes from knowledge." },
      { title: "Set up the second collection", body: "The next chapter moves from prophets and angels to the Companions and the early Muslims. That brings the same argument within the reader's reach." },
      { title: "Note why prophets and angels are the test case", body: "The choice of cases is an argument, not just a collection. Prophets and angels are exactly the beings whose position seems to remove any reason for fear. Yet they are reported as fearing most. Either their fear makes no sense, or it proves the claim of chapter 6. Fear follows knowledge of oneself and of the One feared, so those who know most fear most." },
      { title: "Take the refusal of the admiring reading", body: "Ghazali makes clear that these stories are not amazing feats to admire from a safe distance, which is how such collections are usually read. They are evidence for a claim. That is why the next chapter at once brings the same argument down to the Companions and the early Muslims. Their lives are ones a reader can recognise. So he cannot keep the lesson locked away among beings unlike himself." },
    ],
    closer: [
      { title: "Why this is the right placement", body: "Right after explaining the bad ending, Ghazali turns to those who feared it most. This makes their fear understandable instead of gloomy. It is what knowledge produces in those who have it." },
      { title: "The material is reported, not graded", body: "As everywhere else, the stories are given as Ghazali gathered them. This summary reports his collection without judging the reliability of each report on its own." },
    ],
    distinction: ["Two ways of reading these accounts", "As evidence", "They confirm that fear tracks knowledge, since those who knew most feared most.", "As spectacle", "They are admired as extraordinary and used to excuse the reader from the ordinary case."],
    misreading: "Do not measure yourself against the intensity of these stories and despair. Ghazali has already said the praiseworthy degree is the balance, and that too much fear ends in despair.",
    reflection: "Ask what it would mean if fear really did follow knowledge. Then ask what your own level of fear shows.",
    audit: ["What does my fear indicate about my knowledge?", "Do I read these as evidence or as spectacle?", "What would I have to know to fear more?", "Have I used others' intensity to excuse my own inattention?"],
    nodes: ["khawf", "knowledge"],
    model: pair("What the collection is for", "The reading decides whether it does any work.", [["Evidence", "Those who knew most feared most, confirming the account of fear's cause.", "support"], ["Spectacle", "An extraordinary standard, admired and set aside.", "warning"]]),
  }),
  makeChapter({
    id: 14, shortTitle: "Within reach", formalTitle: "The fear of the companions and the early community",
    overview: "The book ends with stories of people the reader can more easily imagine being. It ends there on purpose.",
    thesis: "The book ends with people the reader can more easily imagine being.",
    moves: [
      { title: "Bring the argument closer", body: "Ghazali has shown the claim in prophets and angels. Now he gathers the same evidence from people whose lives a reader can recognise." },
      { title: "Show fear reaching the limbs", body: "The stories are chosen for what fear produced in these people, not for how it felt. That is the test chapter 7 gave." },
      { title: "Keep the measure", body: "The lives gathered here are not lives of despair. They are lives of steady action, which is what the balanced degree of fear is meant to produce." },
      { title: "Close the book", body: "A book on fear and hope ends with examples of people in whom both were at work. That is the practical answer to the question the book refused to settle in the abstract." },
      { title: "Note the test being applied to the accounts", body: "The stories are chosen for what fear produced, not for how it felt. That is the test chapter 7 set out through Fudayl's saying. So these are not stories of strong feeling. They are stories of fear reaching the limbs. The collection shows the balanced degree at work; it is not a display of piety." },
      { title: "See why the book ends this way", body: "It matters that these are lives of steady action, not of paralysis. The book refused to put fear above hope, or hope above fear, in the abstract. It closes by showing both at work in the same people at once. That is the practical answer to the question chapter 10 declined to settle. The examples do what an argument could not. They show what the balance looks like when someone is living it." },
    ],
    closer: [
      { title: "Why the two collections are ordered this way", body: "If the prophets came last, the reader could set the whole subject at a height he could never reach. Ending with the Companions takes away that way out." },
      { title: "What the reader is left holding", body: "Not a ranking of fear over hope. The reader is left with a diagnosis, a prescription that depends on it, a test of whether the remedy is working, and examples of it working." },
    ],
    distinction: ["Two things these lives display", "Fear that drove", "It reached the limbs and produced sustained action over years.", "Fear that consumed", "It would have ended in despair, which the book has already excluded."],
    misreading: "Do not conclude that the early Muslims were miserable people. Ghazali's own measure is that fear is the whip that drives toward knowledge and action. These are the lives it drove.",
    reflection: "Take the diagnosis from chapter 10, on which is more beneficial. Then pick one thing to do this week because of it.",
    audit: ["What is my prescription, on my own diagnosis?", "What will I do differently this week?", "Is my fear producing action or paralysis?", "Would my life read as evidence of either state?"],
    nodes: ["khawf", "raja", "balance"],
    model: chain("What the book leaves you with", "A procedure rather than a ranking.", [["Diagnose", "Security, despair, disobedience, or none dominant.", "support"], ["Prescribe", "Fear, hope, or the balance of both, by the disease.", "support"], ["Test", "Whether it reaches the limbs, which is the only check offered.", "balance"], ["Adjust", "Since excess in either direction ends the striving.", "balance"]]),
  }),
];

export const book33ConceptNodes: ConceptNode[] = [
  ["raja", "Hope", "Ease at an expected good", "The heart's ease at anticipating what it loves, when the causes are actually present."],
  ["causes", "The causes", "What decides the name", "Present causes make it hope; broken causes make it delusion; absent causes make it wishing."],
  ["tamanni", "Wishing", "Anticipation with no cause", "Expectation that floats free of any ground, which Ghazali refuses to call hope."],
  ["tillage", "The tillage", "Ground, seed, water, thorns", "Hope for forgiveness is measured exactly as a farmer measures his hope for a crop."],
  ["despair", "Despair", "The disease hope treats", "It ends the striving on which everything depends, which is why hope is praised so strongly."],
  ["stations", "Station and state", "Settled or passing", "A quality is a station when it abides and a state when it is quick to depart."],
  ["khawf", "Fear", "The burning that follows knowing", "Knowledge of the causes leading to what is disliked, and the pain that arises from it."],
  ["knowledge", "Knowledge", "What fear tracks", "The most fearful is the one who knows himself and his Lord best."],
  ["degrees", "Three degrees", "Deficient, balanced, excessive", "Both extremes end the striving, by opposite routes."],
  ["limbs", "The limbs", "The only test offered", "What does not restrain the limbs is a talk of the soul and does not deserve the name."],
  ["objects", "Objects of fear", "Punishment, the end, separation", "The same word covers conditions that differ in kind."],
  ["balance", "More beneficial", "Not which is better", "For what is wanted for a purpose, the question is which the present disease requires."],
  ["remedy", "Remedies", "Bread and water", "Fear and hope are treatments, and their merit is according to the disease present."],
  ["khatima", "The ending", "Two ranks", "Doubt at the throes, or absorption in a worldly love that filled the years before."],
].map(([id, label, kicker, description], index) => ({ id, label, kicker, description, position: ["left", "right", "top", "bottom"][index % 4] }));

const node = (id: string, label: string, micro: string, summary: string, guardrail: string, chapterId: number, glyph: Journey["nodes"][number]["glyph"]): Journey["nodes"][number] => ({ id, label, micro, summary, guardrail, chapterId, glyph });

export const book33Journeys: Journey[] = [
  {
    id: "hope-or-wishing", number: "01", question: "Is this hope or am I wishing?", title: "Measure an expectation by its causes",
    description: "Define hope by sorting what you meet by time. Add the condition that separates it from delusion and from wishing. Then learn to measure your own expectation the way a farmer measures his crop.",
    payoff: "You gain the criterion Book 30 promised and deferred to this book.",
    image: assetUrl("assets/system/book33-tillage.jpg"), imageAlt: "A sunlit terraced field where one plot is tilled, watered, and cleared while an identical untended plot waits beside it.", minutes: 12, color: "#278d91",
    nodes: [
      node("sort-by-time", "Sort by time", "Past, present, awaited", "Memory, tasting, and anticipation; and the anticipated divides by whether it is loved or disliked.", "Neither word is used of what is certain.", 1, "order"),
      node("define-hope", "Define hope", "Ease at an expected good", "The heart's ease at anticipating what it loves.", "The definition is not finished until the condition is attached.", 1, "name"),
      node("attach-causes", "Attach the causes", "Present, broken, or unknown", "Present causes make it hope; broken causes delusion; absent causes wishing.", "The test is the causes, not the strength of the feeling.", 1, "diagnose"),
      node("measure-farmer", "Measure it as a farmer", "Ground, seed, water, thorns", "Whoever did the sower's four acts and then waited is hoping; anyone else is wishing.", "The farmer still has no guarantee, which is why it is hope.", 2, "cultivate"),
      node("read-the-praise", "Read the praise rightly", "Summons or permission", "The same reports move one reader and settle another, and the definition decides which.", "Breadth of mercy does not make the conditions optional.", 3, "mirror"),
    ],
  },
  {
    id: "what-is-fear", number: "02", question: "What is fear actually made of?", title: "Trace fear back to what you know",
    description: "Build fear from knowledge of the causes and find its two sources. Sort it by what is actually feared. Then see why having no fear tells you something, instead of being a matter of temperament.",
    payoff: "Your level of fear becomes a reading on your knowledge rather than a fact about your personality.",
    image: assetUrl("assets/system/book33-before-the-king.jpg"), imageAlt: "A luminous audience hall where a single figure's empty place stands before a raised seat, with no intercessor's bench beside it.", minutes: 13, color: "#c25f50",
    nodes: [
      node("three-parts-fear", "Take the three parts", "Knowledge, state, act", "Knowledge of the cause leading to the disliked outcome, and the burning that follows it.", "The same architecture as hope, patience, and repentance.", 6, "order"),
      node("king-analogy", "Weigh the causes", "The offence and the offended", "Gravity of the offence, the disposition of the One offended, any intercessor, any merit.", "Each factor raises or lowers the fear.", 6, "balance"),
      node("two-sources", "Find the two sources", "Your record, or Him", "Fear arises from the multitude of offences, from the attributes of the One feared, or both.", "Most people have only the first.", 6, "know"),
      node("most-fearful", "Read the consequence", "Knowing most, fearing most", "The most fearful is the one who knows himself and his Lord best.", "Low fear is a diagnosis rather than a reproach.", 6, "mirror"),
      node("sort-objects", "Sort the objects", "Punishment, end, separation", "Ask what would have to be guaranteed for the fear to disappear.", "Fear of consequences is not illegitimate for that reason.", 8, "pattern"),
    ],
  },
  {
    id: "is-mine-working", number: "03", question: "Is my fear doing anything?", title: "Test the whip against the limbs",
    description: "Take Ghazali's picture of fear as a whip and learn its three degrees. Then apply the one test he gives: does it reach the limbs, or stop at feeling?",
    payoff: "You can tell working fear from the tears that change nothing.",
    image: assetUrl("assets/system/book33-the-whip.jpg"), imageAlt: "A bright stable court where a slender switch hangs beside a heavy harness, with a worn path leading out through an open arch.", minutes: 11, color: "#586fa8",
    nodes: [
      node("take-the-image", "Take the image", "God's whip", "Fear drives the servant to persevere in knowledge and action.", "That a beast needs a whip does not praise excess in beating.", 7, "name"),
      node("three-degrees", "Learn the three degrees", "Deficient, balanced, excessive", "The praiseworthy is the middle, and both extremes end the striving.", "Being moved to tears is not a fault, only not yet fear.", 7, "pattern"),
      node("apply-the-test", "Apply the test", "Does it reach the limbs?", "What does not restrain the limbs is a talk of the soul that does not deserve the name.", "Fudayl's answer was silence, not yes or no.", 7, "diagnose"),
      node("watch-for-despair", "Watch for despair", "Excess ends the effort", "Fear beyond the balance goes out into despair, producing the same paralysis as its absence.", "Both failures have one result by opposite routes.", 7, "guard"),
      node("produce-it", "Produce it properly", "Knowledge, not alarm", "The state follows knowing, so the work is at the two sources rather than at the feeling.", "The remedy has a dose and is aimed at a disease.", 11, "learn"),
    ],
  },
  {
    id: "which-do-i-need", number: "04", question: "Which of the two do I need?", title: "Diagnose before you prescribe",
    description: "Watch Ghazali refuse to say which is better, fear or hope. He replaces that question with one about the illness you have now. Then he corrects the word that made the first question seem answerable.",
    payoff: "You stop seeking the remedy for someone else's condition.",
    image: assetUrl("assets/system/book33-bread-and-water.jpg"), imageAlt: "An ivory refectory sill where a loaf and a water jug stand side by side under even light, neither raised above the other.", minutes: 13, color: "#bf7a35",
    nodes: [
      node("refuse-question", "Refuse the question", "Bread or water", "Asking which is better resembles asking whether bread is better than water.", "The refusal is not evasion; a replacement follows.", 10, "clear"),
      node("give-reason", "Give the reason", "Merit by purpose", "What is wanted for a purpose has its merit by reference to that purpose, not to itself.", "This applies to anything instrumental, not only to these two.", 10, "know"),
      node("diagnose-first", "Diagnose first", "Security, despair, sin", "Fear for security and for disobedience, hope for despair, balance for the one who has left sin.", "The claim is about patients, not about medicines.", 10, "diagnose"),
      node("fix-vocabulary", "Fix the vocabulary", "More beneficial", "For instrumental things the right word is more beneficial rather than better.", "Ghazali still allows one general ranking, by their sources.", 10, "name"),
      node("hear-the-exception", "Hear the exception", "Hope from mercy", "By source, hope is better, being drawn from the sea of mercy; and beyond love there is no station.", "This is a ranking of sources, not of uses.", 10, "receive"),
    ],
  },
  {
    id: "how-will-i-end", number: "05", question: "What are they all afraid of?", title: "Follow the fear of the ending",
    description: "Find what most of the fear in this book is really about. Learn the two levels of a bad ending. Then see what the stories of those who feared most are gathered to prove.",
    payoff: "A fear that could be morbid becomes a question about what you are habitually full of.",
    image: assetUrl("assets/system/book33-what-fills-it.jpg"), imageAlt: "A quiet lamplit chamber at dusk where a single vessel stands filled to the brim, its contents unnamed and steady.", minutes: 13, color: "#a97837",
    nodes: [
      node("graver-rank", "See the graver rank", "Doubt at the throes", "Denial or doubt dominating at the end and becoming a permanent veil.", "This is not a verdict on a life but a condition at a moment.", 12, "witness"),
      node("lesser-rank", "See the lesser rank", "Absorbed in something else", "A worldly love filling the moment so that no room remains in it.", "This one is continuous with ordinary life.", 12, "attend"),
      node("workable-part", "Find the workable part", "What fills you now", "What dominates at the end is what dominated before it, and that can be worked on.", "The moment itself cannot be arranged.", 12, "practice"),
      node("read-the-accounts", "Read the accounts rightly", "Evidence, not spectacle", "Those who knew most feared most, which is what the collections are gathered to show.", "Their intensity is not a standard for despair.", 13, "mirror"),
      node("end-within-reach", "End within reach", "Lives that were driven", "The book closes with fear that produced sustained action rather than paralysis.", "The balanced degree is what these lives display.", 14, "steady"),
    ],
  },
];

export const book33Movements: TaxonomyGroup[] = [
  ["reality-hope", "1. The reality of hope", "Station and state, the temporal sort, and the condition of causes.", [1]],
  ["tillage", "2. The farmer's measure", "Ground, seed, water, and thorns as the test of a hope.", [2]],
  ["excellence-hope", "3. The excellence of hope", "The testimony, placed after the definition on purpose.", [3]],
  ["remedy-hope", "4. Producing hope", "Supplying grounds rather than comfort.", [4]],
  ["above-both", "5. Above fear and hope", "The station in which neither remains, and where this book is written.", [5]],
  ["reality-fear", "6. The reality of fear", "Knowledge of the causes, and the two sources.", [6]],
  ["degrees", "7. The degrees of fear", "The whip, the three degrees, and the test of the limbs.", [7]],
  ["objects", "8. Kinds of fear", "Punishment, the ending, and separation.", [8]],
  ["excellence-fear", "9. The excellence of fear", "The testimony, and the problem it creates.", [9]],
  ["comparison", "10. Which is more beneficial", "The corrupt question, and the diagnosis that replaces it.", [10]],
  ["remedy-fear", "11. Producing fear", "Knowledge rather than alarm, with a dose.", [11]],
  ["khatima", "12. A bad ending", "Two ranks, and the part that can be worked on.", [12]],
  ["prophets", "13. The prophets and angels", "The hardest cases, gathered as evidence.", [13]],
  ["companions", "14. The early community", "The same argument brought within reach.", [14]],
].map(([id, label, description, chapterIds], index) => ({ id, label, description, chapterIds, color: ["#bf7a35", "#278d91", "#c25f50", "#586fa8", "#a97837"][index % 5] })) as TaxonomyGroup[];

export const book33Instrument: Instrument = {
  title: "Diagnose before you prescribe",
  note: "Ghazali refuses the question of whether fear or hope is better and replaces it with a question about the disease present. Place yourself on both axes: what your hope is actually resting on, and what your fear is actually reaching. The reading names which remedy is more beneficial for you now, in his sense of that word rather than better.",
  items: [
    {
      id: "now", label: "Your present condition", lede: "Where you actually stand today, not in general",
      note: "Both axes are Ghazali's own. The hope axis is the condition of causes from the reality of hope; the fear axis is the three degrees and the test of whether it reaches the limbs.",
      axes: [
        {
          id: "hope", kicker: "The hope axis", question: "What is your expectation of forgiveness actually resting on?",
          options: [
            { id: "despair", label: "Nothing; I have stopped expecting", note: "The striving has ended, which is the disease hope exists to treat." },
            { id: "wishing", label: "Nothing in particular", note: "Anticipation without a cause, which Ghazali names wishing rather than hope." },
            { id: "broken", label: "Grounds I know are not in place", note: "The causes are broken and the expectation continues; the truer name is delusion." },
            { id: "grounded", label: "Causes I could actually name", note: "Ground prepared, seed cast, water brought, thorns cleared; the name hope is truthful." },
          ],
        },
        {
          id: "fear", kicker: "The fear axis", question: "What does your fear actually reach?",
          options: [
            { id: "none", label: "Nothing; I feel secure", note: "Feeling safe from His devising, which Ghazali names as the commonest disease." },
            { id: "feeling", label: "Feeling, and no further", note: "Tears at a verse and heedlessness afterwards; the deficient degree." },
            { id: "limbs", label: "My conduct", note: "It restrains the limbs from sins and binds them to obedience; the balanced degree." },
            { id: "despairing", label: "Past conduct into paralysis", note: "It has passed the balance into despair, which ends the striving it was to produce." },
          ],
        },
      ],
      verdicts: [
        { key: "despair|despairing", name: "Hope, urgently", role: "warning", chapterId: 4, body: "Both axes report the same collapse. On Ghazali's account despair ends the striving on which everything depends, and fear that has passed into despair produces exactly the paralysis its absence would.", action: "Hope is the more beneficial remedy here, and the way to produce it is to supply grounds rather than comfort. Begin with one of the sower's four acts, since establishing a cause is what makes hope truthful rather than merely felt." },
        { key: "despair|*", name: "Hope", role: "balance", chapterId: 4, body: "The expectation has stopped. Whatever your fear is doing, the disease that dominates is the one hope was given to treat.", action: "Work at the causes rather than at the feeling. Doing one of the sower's acts changes the ground of the expectation, which is what the state follows." },
        { key: "*|despairing", name: "Hope, to restore the measure", role: "warning", chapterId: 10, body: "Fear has passed the balance. Ghazali is explicit that excess in fear goes out into despair and ends the effort it was supposed to drive.", action: "The prescription is hope, not more fear. The measure matters as much as the direction, and the section on degrees is where the dose is set." },
        { key: "broken|none", name: "Fear", role: "warning", chapterId: 10, body: "The expectation rests on grounds you know are not in place, and nothing restrains the conduct. This is the pairing Ghazali calls being deluded about God, and it is the case the whole of Book 30 was written against.", action: "Fear is the more beneficial remedy. Produce it by working on the two sources named when fear was defined, and check it by whether it reaches your conduct." },
        { key: "broken|*", name: "Fear", role: "warning", chapterId: 1, body: "Your expectation is continuing while its causes are broken, which is the definition of delusion rather than hope, however strong the feeling.", action: "Either establish the causes or stop calling it hope. Ghazali allows no third option, and the farmer's measure is how the causes are checked." },
        { key: "wishing|*", name: "Establish a cause first", role: "balance", chapterId: 2, body: "Anticipation without any cause is what Ghazali names wishing. It is not condemned so much as misnamed, and misnaming it prevents the work that would make it hope.", action: "Do one of the sower's four acts this week. Hope on this account is not a feeling to be worked up but an expectation with a ground, and grounds are built rather than found." },
        { key: "grounded|none", name: "Fear", role: "balance", chapterId: 10, body: "You can name real causes, and nothing is currently restraining your conduct. Ghazali's diagnosis for security is fear, regardless of how well founded the hope is.", action: "Fear is the more beneficial remedy while security dominates. The check is Fudayl's: whether it reaches the limbs, since what stops at feeling does not yet deserve the name." },
        { key: "grounded|feeling", name: "Fear, in working measure", role: "balance", chapterId: 7, body: "The hope has grounds and the fear has not yet reached the limbs. Ghazali calls this deficient fear and likens it to a weak switch on a strong beast.", action: "Work at the knowledge rather than the feeling, and take the test as the target: what did the fear stop you doing, and what did it make you do?" },
        { key: "grounded|limbs", name: "The balance", role: "support", chapterId: 10, body: "Grounds you can name, and fear that reaches your conduct. Ghazali says that for one who has left the outward and inward of sin, the more beneficial is that fear and hope be balanced, and that if the believer's fear and hope were weighed they would balance.", action: "Hold the result provisionally and keep both working. Note that by their sources Ghazali ranks hope higher, since it is drawn from the sea of mercy, and beyond love there is no station." },
        { key: "*|*", name: "Read both axes together", role: "balance", chapterId: 10, body: "The two readings do not point the same way, which is the ordinary case. Ghazali's rule is to look to which need is stronger, exactly as with hunger and thirst.", action: "Take the more urgent of the two and treat that first. The vocabulary matters: ask which is more beneficial for you now rather than which is better in itself." },
      ],
    },
  ],
};

const book33ConceptLab: ConceptLab = {
  kind: "paired",
  title: "Fear and hope are medicines, not trophies",
  note: "Read both states by what they produce. Ghazali refuses to rank them in isolation because an instrument is measured by the need it treats and the useful work it performs.",
  prompt: "Compare the expectation, the restraint, and the conduct that follows",
  architecture: {
    form: "White-marble Saudi colonnade",
    reference: "The Grand Mosque in Mecca",
    note: "The colonnade provides a shared white-and-gold frame for two inward forces and their result. The comparison is an editorial learning aid.",
    url: "https://saudipedia.com/en/grand-mosque",
  },
  scenes: [
    {
      id: "balanced", label: "Both are working", chapterId: 10,
      setup: "The expectation has real grounds, and fear reaches conduct without passing into paralysis.",
      takeaway: "For one who has left outward and inward sin, Ghazali says the more beneficial condition is balance. Both states continue doing work.",
      steps: [
        { id: "hope", label: "Hope", micro: "Expectation with causes", body: "Like the farmer who prepares ground, casts sound seed, waters it, and clears thorns, the expectation rests on causes that can actually be named.", role: "support" },
        { id: "fear", label: "Fear", micro: "Reaches the limbs", body: "Fear restrains conduct from sin and binds it to obedience. It has reached the balanced degree rather than stopping as feeling or passing into despair.", role: "support" },
        { id: "result", label: "What follows", micro: "Striving continues", body: "Hope draws the person forward and fear guards the path. Neither produces the collapse that its excess or absence would create.", role: "balance" },
      ],
    },
    {
      id: "wishing", label: "Wishing with security", chapterId: 2,
      setup: "Forgiveness is expected while its grounds are absent or broken, and nothing in fear is restraining conduct.",
      takeaway: "Changing the label is part of the treatment. Anticipation without a cause is wishing; expectation on broken causes is delusion, not hope.",
      steps: [
        { id: "hope", label: "The expectation", micro: "No sound ground", body: "The feeling may be strong, but the farmer's measure fails: the ground, seed, watering, or clearing has not been established.", role: "warning" },
        { id: "fear", label: "The restraint", micro: "Nothing reaches conduct", body: "Security has removed fear's practical work. Ghazali treats feeling safe as a disease requiring fear, not as evidence of a higher state.", role: "warning" },
        { id: "result", label: "What follows", micro: "The causes remain broken", body: "Expectation continues without changing conduct. The remedy is to establish a cause and restore a fear that reaches the limbs.", role: "warning" },
      ],
    },
    {
      id: "despair", label: "Fear passes the balance", chapterId: 7,
      setup: "Fear moves beyond useful restraint into despair, so the striving it was meant to produce begins to stop.",
      takeaway: "More fear is not always better. Ghazali's praiseworthy degree is the middle; excess ends in despair just as deficiency ends in security.",
      steps: [
        { id: "hope", label: "Hope", micro: "The needed medicine", body: "Hope becomes more beneficial here because the expectation and effort have collapsed. It is restored through grounds, not reassurance alone.", role: "support" },
        { id: "fear", label: "Fear", micro: "Past its useful dose", body: "The state has exceeded the measure that drives action. A medicine has become harmful through excess rather than through being false in itself.", role: "warning" },
        { id: "result", label: "What follows", micro: "Effort is paralysed", body: "Despair stops the very striving fear was given to produce. The diagnosis therefore calls for the opposite emphasis, not intensification.", role: "warning" },
      ],
    },
    {
      id: "fear-feeling", label: "Fear stops at feeling", chapterId: 7,
      setup: "A verse or reminder causes tears and disturbance, but the same conduct resumes after the moment passes.",
      takeaway: "Intensity of feeling is not the test. Ghazali checks fear by whether it changes what the limbs do.",
      steps: [
        { id: "hope", label: "Hope", micro: "May still be grounded", body: "Nothing about the emotion alone settles whether hope is sound. Its own test remains whether the causes are in place.", role: "balance" },
        { id: "fear", label: "Fear", micro: "A deficient degree", body: "The state is felt but does not reach action. Ghazali likens weak fear to a weak switch used on a strong beast: it cannot direct what it touches.", role: "warning" },
        { id: "result", label: "What follows", micro: "No durable restraint", body: "Because conduct remains unchanged, knowledge must be strengthened until fear performs the work for which it is valued.", role: "balance" },
      ],
    },
  ],
};

export const book33Sources: SourceLink[] = [
  { label: "Primary Arabic text", note: "The complete public Arabic of Book 33 was read in full and used to establish the definition of hope and its condition of causes, the reality and degrees of fear, and the resolution of the comparison between them.", url: "https://shamela.ws/book/9472/1301" },
  { label: "The farmer's measure", note: "The passage in which hope for forgiveness is measured against the sower's: good ground, sound seed, water at its times, and thorns cleared away.", url: "https://shamela.ws/book/9472/1302" },
  { label: "The degrees of fear", note: "The passage giving fear as God's whip, naming its three degrees, and supplying Fudayl's test of whether it reaches the limbs.", url: "https://shamela.ws/book/9472/1316" },
  { label: "Which is more beneficial", note: "The passage refusing the comparison as posed, giving the analogy of bread and water, and correcting better to more beneficial.", url: "https://shamela.ws/book/9472/1323" },
  { label: "Forty-book structure", note: "Ghazali.org's listing places Book 33 as the third book of the Quarter of Deliverance and confirms its title.", url: "https://www.ghazali.org/listing-the-forty-books/" },
];

export const book33: SystemBook = {
  id: 33,
  title: "Fear and Hope",
  shortTitle: "Fear and Hope",
  defaultJourneyId: "hope-or-wishing",
  chapters: book33Chapters,
  conceptNodes: book33ConceptNodes,
  journeys: book33Journeys,
  sources: book33Sources,
  taxonomy: {
    title: "Fourteen source movements",
    note: "Five movements on hope and nine on fear, following Ghazali's own two parts. His long treatments of hope's remedy and of the meaning of a bad ending are each presented as a single reading rather than split, since his text supplies no internal joints there.",
    groups: book33Movements,
  },
  conceptLab: book33ConceptLab,
  instrument: book33Instrument,
  editorialNote: "The five journeys, fourteen reading sections, visual models, and diagnostic are editorial learning aids. The sequence preserves Ghazali's two parts, hope first and then fear. The English is an original synthesis made from a complete reading of the public Arabic text, not a translation and not a substitute for one. Reports and inherited anecdotes are presented as material Ghazali transmitted; this edition does not independently grade every narration. This book treats despair, the fear of dying badly, and states of severe distress. Ghazali is explicit that fear passing beyond the balance goes out into despair and ends the striving it was meant to produce, and that the praiseworthy degree is the middle; nothing here recommends the intensification of fear without measure. The diagnostic locates a condition so that a fitting emphasis can begin. It cannot pronounce on forgiveness, acceptance, or anyone's standing, and it is not a substitute for help where distress is severe.",
};
