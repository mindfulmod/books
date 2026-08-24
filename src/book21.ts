import { conceptNodes, contentSources } from "./data";
import type { Chapter, ConceptNode, VisualModel } from "./data";
import type { MirrorSubject, SystemBook, TaxonomyGroup } from "./systemTypes";
import { book21Journeys } from "./book21journeys";

type Seed = {
  id: number;
  shortTitle: string;
  formalTitle: string;
  overview: string;
  thesis?: string;
  moves: Array<{ title: string; body: string }>;
  closer: Array<{ title: string; body: string }>;
  distinction: [string, string, string, string, string];
  misreading: string;
  reflection: string;
  audit: string[];
  nodes: string[];
  model: VisualModel;
};

const makeChapter = (seed: Seed): Chapter => ({
  id: seed.id,
  shortTitle: seed.shortTitle,
  formalTitle: seed.formalTitle,
  overview: seed.overview,
  points: seed.moves.slice(0, 3).map((move) => move.body),
  reflection: seed.reflection,
  relatedNodes: seed.nodes,
  visualModel: seed.model,
  deep: {
    thesis: seed.thesis ?? seed.moves[0].body,
    context: seed.overview,
    moves: seed.moves,
    closeReading: seed.closer,
    distinction: {
      title: seed.distinction[0], firstLabel: seed.distinction[1], first: seed.distinction[2],
      secondLabel: seed.distinction[3], second: seed.distinction[4],
    },
    misreading: seed.misreading,
    observation: seed.reflection,
    selfAudit: seed.audit,
    sourceAnchor: `Book 21, ${seed.formalTitle}.`,
  },
});

const chain = (title: string, caption: string, items: Array<[string, string, "support" | "balance" | "warning"]>): VisualModel => ({
  kind: "chain", title, caption, items: items.map(([label, body, role]) => ({ label, body, role })),
});

const pair = (title: string, caption: string, items: Array<[string, string, "support" | "balance" | "warning"]>): VisualModel => ({
  kind: "pair", title, caption, items: items.map(([label, body, role]) => ({ label, body, role })),
});

const spectrum = (title: string, caption: string, items: Array<[string, string, "support" | "balance" | "warning"]>): VisualModel => ({
  kind: "spectrum", title, caption, items: items.map(([label, body, role]) => ({ label, body, role })),
});

export const book21Chapters: Chapter[] = [
  makeChapter({
    id: 1, shortTitle: "Four words, several meanings", formalTitle: "The meanings of soul, spirit, heart, and intellect",
    overview: "Ghazali opens the whole quarter by clearing away a confusion he says is the source of most errors in this field: four words are in circulation, each carries more than one meaning, and few even among senior scholars keep the senses apart.",
    thesis: "Four words carry five meanings between them, and most errors in this field come from not keeping them apart.",
    moves: [
      { title: "Split the word heart", body: "One sense is the pine-cone-shaped flesh in the left of the chest, which animals have and corpses have, and which belongs to the physician's concern rather than the religious one. The other is a subtle lordly reality connected to that flesh, and this is the human being's true self, the one that perceives, knows, is addressed, and is held responsible." },
      { title: "Split the word spirit", body: "One sense is a subtle body rising from the heart's cavity and spreading through the vessels, which is the physicians' usage. The other is the same knowing, perceiving subtlety already described." },
      { title: "Split the word soul", body: "One sense gathers the powers of anger and appetite, and this is the usage prevailing among the Sufis when they speak of struggling against the soul. The other is the person's own reality, which takes different names by its condition: at rest it is the tranquil soul, in protest against appetite the reproachful soul, and in surrender the soul commanding to evil." },
      { title: "Split the word intellect", body: "One sense is knowledge of the realities of things, so it names an attribute residing in the heart. The other is what perceives, so it names the subtlety itself." },
      { title: "Note what the whole section is doing", body: "Four words — heart, spirit, soul, intellect — and each is shown to carry two senses, one physical or technical and one naming the same thing in every case: the perceiving, knowing subtlety that is the person himself. That is not lexicography for its own sake. Every dispute in the rest of the quarter is conducted in these four words, and a book that started using them without this section would produce arguments in which two parties are each correct about a different sense." },
      { title: "See what the soul's three names establish", body: "And the treatment of the soul is the one with the most consequence. It is not that a person has a soul that is good or bad; the same reality takes three names according to its condition — tranquil when at rest, reproachful when protesting against appetite, commanding to evil when it has surrendered. Which means the middle name describes something most people would experience as failure: the self objecting to what it is doing. On this scheme that objection is the second stage, not the first." },
    ],
    closer: [
      { title: "Four words, five meanings", body: "Ghazali sums the count himself: the fleshly heart, the bodily spirit, the appetitive soul, and knowledge are four meanings, and the knowing perceiving subtlety is a fifth. All four words converge on that fifth. So there are five meanings and four words, and each word is used for two." },
      { title: "Why he stops where he does", body: "He declines to explain how the subtlety is connected to the bodily heart, for two stated reasons: it belongs to the science of unveiling rather than to practice, and settling it would require disclosing the secret of the spirit, about which the Prophet did not speak. The book's whole subject is the subtlety's attributes and states, not its essence." },
    ],
    distinction: ["Which meaning is in view", "The bodily organ", "A piece of flesh, shared with animals and present in the dead, belonging to medicine.", "The knowing subtlety", "The perceiving, responsible reality of the person, which is what the book is about throughout."],
    misreading: "Do not conclude that the two senses are unrelated or that the bodily heart is dismissed. Ghazali affirms a special connection between them and declines only to specify its nature.",
    reflection: "Notice the next time you hear one of these four words used about a person, and ask which of the five meanings the speaker actually intended.",
    audit: ["Which meaning did I assume just now?", "Where have I argued past someone because we meant different things?", "Do I treat my responsible self as identical with my body?", "What am I calling my soul when I say I am struggling with myself?"],
    nodes: ["heart", "intellect"],
    model: pair("One word, two senses", "Ghazali's first protection is a definition, not an exhortation.", [["The bodily meaning", "Present in animals and in the dead; the physician's subject.", "balance"], ["The inward meaning", "Perceives, knows, is addressed and held responsible; this book's subject.", "support"]]),
  }),
  makeChapter({
    id: 2, shortTitle: "The heart's forces", formalTitle: "The visible and inward forces that serve the heart",
    overview: "The heart governs through armies. Ghazali divides them into those seen with the eye and those seen only with insight, and explains why a governing faculty needed armies at all: because it was made for a journey, and a journey needs a mount and provision.",
    thesis: "The heart governs through armies, and it needed them because it was made for a journey.",
    moves: [
      { title: "Name the visible army", body: "Hand, foot, eye, ear, tongue and the rest of the organs, inside and out, all work for the heart and do what it says. It tells the eye to open and the eye opens; it tells the foot to move and the foot moves." },
      { title: "Explain the need", body: "The heart needed these because it was made for a journey to God, and the journey requires a mount and provision. Its mount is the body and its provision is knowledge, and what enables it to take on that provision is right action." },
      { title: "Derive the inward armies from the need", body: "Preserving the body requires drawing what suits it and repelling what harms it. So appetite was created inwardly with limbs to serve it outwardly, and anger was created inwardly with limbs to act on it. And because what needs food must recognise food, perception was created: the five senses outwardly and their faculties inwardly." },
      { title: "Reduce them to three classes", body: "All the heart's armies fall into three: what urges, whether toward the beneficial as appetite or away from the harmful as anger, and this is called will; what moves the limbs toward those ends, and this is called power; and what perceives and reports, like spies, and this is called knowledge." },
      { title: "Follow the derivation", body: "The argument is a derivation and it is worth running in order. The heart was made for a journey to God; a journey needs a mount and provision; the mount is the body, and the body has to be kept alive. Keeping it alive requires drawing in what suits it and driving off what harms it — so appetite and anger exist. And drawing in food requires recognising food, so perception exists. Every inward power in the person is arrived at as something the journey required, rather than assumed and then justified." },
      { title: "Note what reducing them to three accomplishes", body: "And collapsing the whole apparatus into three classes — will, power, and knowledge — is what makes the rest of the quarter possible. Whatever is going wrong in a person is going wrong at one of three places: what he is urged toward, what he is able to do, or what he is reporting to himself about the situation. Ten books of treatment follow, and each of them is working on one of these three." },
    ],
    closer: [
      { title: "The five inward chambers", body: "The perceiving group splits again. Some of it sits in the outward posts — the five senses; the rest sits at inward posts in the chambers of the brain, and there are five of those too: common sense, imagination, reflection, recollection and retention. Shut your eyes after looking at something and its shape stays with you: that is imagination." },
      { title: "How the compliance is described", body: "Ghazali compares the senses' subjection to the heart with the angels' subjection to God, then marks the difference precisely: the angels know their own obedience, while the eyelids obey without any knowledge of themselves or of their obedience." },
    ],
    distinction: ["Two kinds of army", "Seen with the eye", "Limbs and sense organs, which belong to the visible world.", "Seen with insight", "Appetite, anger, will, power and the inner perceiving faculties, which do not."],
    misreading: "Do not read the language of armies as a claim that these forces are enemies. Ghazali's point in this section is that they are provisions for a journey; whether they serve or rebel is the next section's question.",
    reflection: "Take one ordinary action you performed today and name which of the three classes started it, which carried it, and which informed it.",
    audit: ["What is my body currently being used to carry?", "Which of my faculties am I treating as the point rather than the mount?", "What provision am I actually gathering?", "Where do my senses report, and who reads the reports?"],
    nodes: ["appetite", "anger", "senses", "action"],
    model: chain("Three classes of the heart's armies", "Ghazali reduces a long inventory to a working structure.", [["The urging", "Appetite draws the suitable and anger repels the harmful; this is will.", "balance"], ["The moving", "Faculties spread through the limbs carry out the aim; this is power.", "balance"], ["The perceiving", "The senses gather and report like spies; this is knowledge.", "support"]]),
  }),
  makeChapter({
    id: 3, shortTitle: "The city within", formalTitle: "Three analogies for the heart and its inward forces",
    overview: "Appetite and anger can follow the heart completely, in which case they help it on its road, or they can rebel until they own it. Ghazali offers three analogies for the same structure, each making a different part of it obvious.",
    thesis: "Three analogies for one arrangement, and each shows a different way the arrangement can fail.",
    moves: [
      { title: "The realm and its ministers", body: "The body is the self's realm. The limbs and faculties are craftsmen and workers; the reflective intellect is a wise counsellor and vizier; appetite is a lying, scheming servant who fetches supplies and disguises poison as advice; and anger is the chief of police." },
      { title: "Show how the realm is governed well", body: "When the ruler takes his adviser's counsel, ignores what that other official wants, and puts his chief of police over him so that he is being managed rather than doing the managing — the kingdom runs properly and justice follows. A person does this by putting the intellect over both and using each against the other." },
      { title: "The frontier post", body: "The body is a city and a frontier fort; the soul commanding to evil is an enemy contesting the realm; the person stationed there is on guard. If he fights and prevails he is praised on returning; if he neglects the post it is said to him: you ate the meat and drank the milk and did not bring back the stray nor bind the broken." },
      { title: "The rider, the horse, and the dog", body: "The intellect is a hunter on horseback; appetite is his horse and anger his hound. When the rider is skilled, the horse trained, and the hound taught, he is fit to succeed. When the rider is clumsy, the horse bolts, and the hound bites, he is fit to perish rather than to catch anything." },
      { title: "Note what the three analogies each supply", body: "Three images, and they are not repetitions. The realm with its ministers gives the structure of government — who advises, who executes, who must be managed rather than obeyed. The frontier fort gives the stakes and the accounting: a man posted somewhere, who will be asked afterwards what he did there. And the rider with horse and hound gives the training problem, which is that all three parties have to be competent for anything to be caught." },
      { title: "Take the description of appetite seriously", body: "And the sharpest detail is in the first image: appetite is not merely a servant with poor judgement but a lying, scheming one who fetches supplies and presents poison as advice. That is a claim about how appetite actually works — it does not announce itself as appetite and ask to be indulged; it arrives in the form of counsel, with reasons attached. Which is why the remedy is not resisting it but putting something over it that can tell the difference." },
      { title: "See what the hunting image adds", body: "And the last image adds the thing the other two miss: that the failure can be in any of the three, independently. A clumsy rider, a bolting horse, a biting hound — and the verdict is that such a man is fit to perish rather than to catch anything. Appetite and anger are not the enemy in this picture. They are the equipment, and untrained equipment kills the person using it." },
    ],
    closer: [
      { title: "What the third analogy adds", body: "It names the failure precisely. The rider's clumsiness is ignorance and dull insight; the horse's bolting is the domination of appetite, particularly of stomach and sex; the hound's biting is the domination of anger. Three different faults produce the same wreck." },
      { title: "The inversion Ghazali warns of", body: "He observes that most people's intellects have become subject to their appetites, employed in devising stratagems to satisfy them, when it should have been appetite that was subject to the intellect in whatever the intellect requires." },
    ],
    distinction: ["Two ways the same forces can stand", "Ordered under counsel", "Appetite and anger serve the journey and are set against each other by a governing intellect.", "Ruling the ruler", "The intellect is enlisted to devise means for appetite, which is the ordinary condition Ghazali describes."],
    misreading: "Do not read the analogies as calls to destroy appetite or anger. Every version of the picture keeps them and asks who is directing whom.",
    reflection: "Ask which of the three pictures fits your last difficult day, and who was giving the orders in it.",
    audit: ["Which faculty is currently directing which?", "Where has my reasoning been recruited to serve a want?", "What is my anger being used against?", "Is my counsellor being consulted at all?"],
    nodes: ["heart", "intellect", "appetite", "anger"],
    model: chain("The realm analogy", "Each part has a role, and misrule has a specific shape.", [["The ruler", "The governing self, for whose journey the realm exists.", "support"], ["The vizier", "Reflective intellect, whose counsel is to be preferred.", "support"], ["The police chief", "Anger, useful when set under the counsellor's direction.", "balance"], ["The scheming servant", "Appetite, which fetches supplies and disguises harm as advice.", "warning"]]),
  }),
  makeChapter({
    id: 4, shortTitle: "Knowledge and will", formalTitle: "What distinguishes the human heart",
    overview: "Animals have appetite, anger, and both outward and inward perception; a sheep sees the wolf and knows to flee. Ghazali therefore asks what is left that belongs to the human heart alone, and answers with two things.",
    thesis: "Animals have appetite, anger and perception too — so what distinguishes a human heart has to be something else.",
    moves: [
      { title: "The first is knowledge", body: "Knowledge of worldly and otherworldly matters and of intelligible realities, which lie beyond the senses. Universal necessary judgments belong to the intellect: a person judges that no single thing can be in two places at once, and that is a judgment about every thing, though the senses reached only some." },
      { title: "The second is will", body: "When the intellect perceives the outcome of a matter and where its good lies, a longing arises toward that good and toward its means. This is not the will of appetite; it is often its opposite." },
      { title: "Prove the difference from ordinary life", body: "Appetite recoils from bloodletting and cupping while the intellect wants them and pays for them. Appetite inclines toward delicious food during illness, and the rational person finds in himself a restrainer that is not the restrainer of appetite." },
      { title: "State why the second was necessary", body: "Had God created the intellect that knows outcomes and not created this motivating drive that moves the limbs on the intellect's judgment, the intellect's judgment would have been wasted." },
      { title: "Note how the difference is proved", body: "The proof that this will is not appetite is drawn entirely from ordinary experience, which is what makes it hard to argue with. Appetite recoils from being cut and bled, and the intellect wants it and pays money for it. Appetite pulls toward good food during an illness, and the person finds in himself something holding him back that is plainly not another appetite. Two forces, pulling opposite ways, in cases everybody has been in." },
      { title: "Follow why the second had to exist", body: "And the argument for why it exists is a piece of design reasoning. Suppose God had made the intellect, which sees where a matter ends and where the good in it lies, and had not made a drive that moves the limbs on the intellect's judgement. Then the judgement would be correct and inert — a person would see exactly what he ought to do and nothing would follow. Knowing is not by itself a cause of acting, and something separate had to be supplied." },
    ],
    closer: [
      { title: "Two degrees in a child", body: "First the heart holds the necessary primary knowledge, while theoretical knowledge is merely near and possible. Ghazali likens this to a writer who knows the inkwell, the pen, and the separate letters but not their joining, so that he has approached writing without reaching it. Then the acquired knowledge is stored, and he is called a writer even when not writing, by his capacity for it." },
      { title: "The rank between beast and angel", body: "A person is a plant so far as he feeds and reproduces, an animal so far as he senses and moves by choice, and like a figure painted on a wall so far as his form goes. His property is the knowledge of the realities of things, and whoever uses every organ to help toward knowledge and action resembles the angels." },
    ],
    distinction: ["Two things that both look like wanting", "The will of appetite", "It follows what is pleasant now and recoils from what is unpleasant now.", "The will of intellect", "It follows the known outcome and will accept present pain for it, which is why it is often appetite's opposite."],
    misreading: "Do not take the two properties as claims to superiority over others. Ghazali immediately measures a person against them and finds most people living at the level of the faculties they share with animals.",
    reflection: "Find one thing you did this week that appetite would have refused, and one thing appetite chose that your intellect had already judged against.",
    audit: ["What did I want against my own comfort?", "Where did knowing the outcome fail to move me?", "Which faculty won the last time they disagreed?", "What am I capable of knowing that I have not tried to know?"],
    nodes: ["intellect", "action"],
    model: pair("The two properties", "Neither alone would be enough.", [["Knowledge", "The intellect grasps outcomes and universals beyond the reach of sense.", "support"], ["Will", "A drive arises on that judgment and moves the limbs, without which the judgment is wasted.", "support"]]),
  }),
  makeChapter({
    id: 5, shortTitle: "Four recurring dispositions", formalTitle: "The gathered qualities and images of the heart",
    overview: "Ghazali gathers the heart's qualities under four admixtures present in every person, then gives the image the book is remembered for: four creatures gathered in one skin.",
    thesis: "Four admixtures are present in every person, and the heart's qualities are gathered under them.",
    moves: [
      { title: "Name the four", body: "The predatory, the bestial, the satanic, and the lordly. From anger come the acts of beasts of prey; from appetite the acts of cattle; from the lordly element a claim to mastery, elevation, and sole authority; and from discernment joined to appetite and anger a satanic capacity to reach ends by scheming and to show evil in the guise of good." },
      { title: "Give the image", body: "It is as if gathered in a person's skin were a pig, a dog, a devil, and a sage. The pig is appetite, blamed not for its colour or shape but for its greed; the dog is anger, ferocious not by form but by savagery." },
      { title: "Describe the devil's part", body: "The devil does not act directly on the person so much as on the other two: he keeps inflaming the pig's appetite and the dog's rage, sets each upon the other, and makes what they are already inclined to seem good to them." },
      { title: "State the sage's task", body: "The intellect is charged to expose the devil's deception by its own insight, to break the pig's greed by setting the dog on it, and to repel the dog's ferocity by setting the pig on it. When it can do that, the realm is just." },
      { title: "Note what the four qualities actually are", body: "The four are not four parts of a person but four sources of behaviour, and the fourth is the surprising one. Predatory acts come from anger, bestial ones from appetite, and satanic ones from discernment joined to appetite and anger — so cunning is not a fifth faculty but intelligence recruited by the other two. And the lordly element produces a claim to mastery and sole authority, which means the highest thing in a person is also the source of one of its worst outputs." },
      { title: "Take the account of the devil's method", body: "And the description of how the devil operates is precise: he does not work on the person directly so much as on the pig and the dog. He inflames the appetite, stirs the rage, sets each on the other, and makes what they were already leaning toward look good. Which means temptation is not the introduction of something foreign. It is the amplification of what was already in the room, presented as the person's own judgement." },
      { title: "See what the sage is actually told to do", body: "And the task assigned to the intellect is not suppression, which is what a reader expects. It is to expose the deception by seeing through it, and then to use each animal against the other — break the pig's greed by setting the dog on it, and repel the dog's ferocity by setting the pig on it. Appetite and anger are treated as instruments to be played off, not enemies to be killed, which is exactly the position the book on disciplining the soul will take up." },
    ],
    closer: [
      { title: "The unnoticed worship", body: "Ghazali's sharpest observation here is that such a person denounces those who worship stone idols, while if the veil were lifted he would see himself standing before a pig, bowing to it and awaiting its signal, and before a biting dog, obeying it; and in serving both he is serving the devil who drives them." },
      { title: "The mirror and the smoke", body: "The heart is a mirror surrounded by these influences. The praiseworthy effects increase its polish and light until the truth shines in it. The blameworthy ones are like dark smoke rising to the glass, gathering time after time until it blackens, and this is what the Quran calls the covering and the rust." },
    ],
    distinction: ["Two directions the same four can run", "Governed", "Restraint of appetite yields continence and contentment, and restraint of anger yields courage and forbearance.", "Governing", "Obedience to appetite yields greed and shamelessness, and obedience to anger yields recklessness and contempt for people."],
    misreading: "Do not read the four as separate parts to be located in yourself, or the pig and dog as terms of abuse for other people. They are Ghazali's names for what every person's own conduct is made of.",
    reflection: "Take the list of traits produced by obeying appetite and the list produced by governing it, and find yourself honestly on both.",
    audit: ["Which of the four gave the orders today?", "What have I served without noticing that I served it?", "Which trait on the governed list is genuinely mine?", "What has been accumulating on the glass?"],
    nodes: ["appetite", "anger", "intellect"],
    model: chain("Four in one skin", "The middle two are driven, the last is charged with governing them.", [["The pig", "Appetite, blamed for greed rather than for its form.", "warning"], ["The dog", "Anger, ferocious in savagery rather than in shape.", "warning"], ["The devil", "Inflames both and sets each upon the other.", "warning"], ["The sage", "The intellect, charged with exposing the deception and governing the rest.", "support"]]),
  }),
  makeChapter({
    id: 6, shortTitle: "Knowing and the mirror", formalTitle: "The heart as a mirror in relation to knowledge",
    overview: "Ghazali defines knowledge with a precision the rest of the book depends on, then gives the five reasons a mirror fails to show a form and applies each to the heart. This is the analytical centre of the book.",
    thesis: "Knowledge is a form appearing in a mirror, and a mirror fails for exactly five reasons.",
    moves: [
      { title: "Separate the three things", body: "Ghazali insists there are three things here and not two, and the whole analysis depends on keeping them apart. There is the heart. There are the realities of things. And there is the coming-to-be of those realities in the heart — their being present in it. Map them across: the knower is the heart in which the likeness of a thing's reality comes to rest; the known is the reality itself; and knowledge is the arrival of that likeness in the mirror. Two of the three can be entirely in place with no knowledge at all, because knowledge is the third of them, and it is a relation rather than a thing." },
      { title: "Correct the obvious picture", body: "He tries a second image first and then discards it, which is worth watching him do. Grasping needs a grasper — a hand; a thing grasped — a sword; and an arrival between them, the sword coming into the hand. That is the right shape for knowing: the reality existed, the heart existed, and knowledge had not happened yet, exactly as a sword and a hand can both exist with no grasping until the sword falls into the hand. But then he rejects it. Grasping is the sword itself arriving in the hand, and the known thing itself never arrives in the heart. Somebody who knows fire does not have fire in his heart; what he has is its definition and its reality, answering to its form. So the mirror is the better image — because a person does not get into a mirror either. Only a likeness answering to him does." },
      { title: "Give the five obstructions", body: "Then the payoff, and it is the reason the mirror was chosen over the hand: a mirror fails for exactly five reasons, and so does a heart. First, its own substance is unfinished — iron before it has been turned, shaped and polished. Second, it is dull, rusted, clouded, even though its shape is complete. Third, it is turned away — aimed at something other than the object. Fourth, something hangs between it and the object. Fifth, whoever holds it does not know which direction the object lies in, so he cannot aim it. Ghazali's claim is that hearts lack what they lack for these five reasons and no others — which is what turns an image into a diagnostic." },
      { title: "Apply them to the heart", body: "And the claim he builds on it: the heart is a mirror fit for the whole truth of things to become clear in it, and hearts lack whatever they lack for exactly these five reasons and no others. That last clause is what turns an image into an instrument. The third is worth sitting with, because it catches people who would never suspect themselves: a heart can be entirely clear and still show nothing of the truth, because it is not pointed at it — its whole concern taken up with the fine detail of religious practice, or with arranging a living. Nothing is disclosed to it except what it is actually thinking about. And Ghazali presses: if letting your concern be filled by acts of obedience is enough to turn the mirror away, what do you suppose filling it with appetites does?" },
    ],
    closer: [
      { title: "The fourth is the one he presses", body: "The veil is a conviction accepted since childhood by imitation and good opinion, which stands between the person and the truth. Ghazali says this veils most of the theologians and the partisans of schools, and even most of the pious who reflect on the kingdom of the heavens, because inherited convictions have hardened in them." },
      { title: "Why the fifth is so hard to see", body: "No sought knowledge that is not innate is caught except by the net of knowledge already held, and every new knowledge arises from two prior ones coupling in a particular way. You cannot breed a mare from a donkey and a camel. To see the back of your own head you need two mirrors set in a particular relation, and finding such angles is the rare skill." },
    ],
    distinction: ["Two reasons a heart may not see", "A fault in the glass", "The heart is unformed or clouded, so nothing shows clearly in it.", "A fault in the aim", "The glass is sound but is turned elsewhere, veiled, or pointed in the wrong direction."],
    misreading: "Do not treat the five as a ranking of people. Ghazali applies the third to the obedient and the fourth to the pious and learned, which is the point of listing them.",
    reflection: "Take one thing you have long wanted to understand and ask which of the five is actually in the way.",
    audit: ["Is the glass clouded, or aimed elsewhere?", "What did I accept before I could examine it?", "Am I looking where the answer would be?", "Which two things do I already know that would have to be joined?"],
    nodes: ["mirror", "knowledge"],
    model: chain("Five reasons a mirror shows nothing", "Ghazali's list is exhaustive by his own claim.", [["Unformed", "The substance is not yet finished, as in a child's heart.", "warning"], ["Rusted", "Sins and appetites cloud the surface.", "warning"], ["Turned away", "Sound and clear, but aimed at something else.", "warning"], ["Veiled", "An inherited conviction hangs between the glass and the truth.", "warning"], ["Misdirected", "The bearer does not know where the object lies.", "warning"]]),
  }),
  makeChapter({
    id: 7, shortTitle: "Kinds of knowledge", formalTitle: "Intellectual, religious, worldly, and otherworldly knowledge",
    overview: "Ghazali sorts knowledge into rational and religious, then divides the rational again, and refuses both of the positions that most readers arrive holding.",
    thesis: "Knowledge sorts into rational and religious, and Ghazali refuses both positions most readers arrive holding.",
    moves: [
      { title: "Divide the rational", body: "The necessary, which a person finds himself made upon since childhood and cannot say when or whence it came, and the acquired, gained by learning and inference. Both are called intellect." },
      { title: "Place the religious", body: "The religious sciences are taken from the prophets, by learning the Book and the practice and understanding their meanings after hearing them. By these the heart's condition is completed and it is kept sound of its diseases." },
      { title: "Refuse both extremes", body: "Whoever calls to pure imitation while setting the intellect wholly aside is ignorant, and whoever is content with bare intellect apart from the lights of the Book and the practice is deluded. Be neither, and join the two roots." },
      { title: "Give the reason", body: "The rational sciences are like foods and the revealed sciences are like medicines. A sick person is harmed by food when the medicine is missing, and the diseases of hearts cannot be treated except by the remedies drawn from the Law." },
      { title: "Note what the double refusal costs each side", body: "The refusal is aimed at two readers, and it is equally unwelcome to both. To the man who calls for pure imitation with the intellect set aside: you are ignorant. To the man content with bare reason apart from the lights of the Book and the practice: you are deluded. Neither is being offered a partial concession — both descriptions are flat — and the instruction is to join the two roots rather than to find a midpoint between them." },
      { title: "Follow the food and medicine argument", body: "And the reason given is a real argument rather than a slogan. Rational sciences are like food and revealed ones like medicine; a sick person is harmed by food when the medicine is missing. Which grants everything the rationalist wants — food is not optional and nobody lives on medicine — while establishing that the order matters when the patient is ill. And the whole quarter that follows is premised on the reader being ill." },
    ],
    closer: [
      { title: "The blind man in the house", body: "To anybody who thinks reason and revelation contradict each other and cannot both be held, he answers with a man who walks into a house, trips over the pots, and demands to know why they were left lying about. He is told they are exactly where they belong — and that the remarkable thing is he blames somebody else's carelessness rather than his own blindness." },
      { title: "Why the two worldly aims exclude each other", body: "Rational knowledge divides again into worldly, such as medicine, arithmetic, geometry, and the crafts, and otherworldly, such as the states of the heart and the knowledge of God. These are mutually exclusive in practice, since whoever gives himself deeply to one falls short in the other. Ali gave three images for it: two pans of a balance, east and west, and two co-wives, where pleasing one angers the other." },
    ],
    distinction: ["Two failures of one-sidedness", "Imitation alone", "The intellect is set aside entirely, which Ghazali calls ignorance.", "Intellect alone", "The lights of revelation are dispensed with, which he calls delusion."],
    misreading: "Do not read the exclusivity of worldly and otherworldly knowledge as contempt for medicine, arithmetic, or the crafts. Ghazali treats them as real sciences and is describing where a finite attention can reach.",
    reflection: "Ask which of the two roots you actually lean on, and what your reasoning has been asked to settle without help.",
    audit: ["Which root am I short of?", "Have I taken a stumble for a contradiction?", "What have I dismissed because I could not join it to the rest?", "Where has my attention gone, and what did that cost?"],
    nodes: ["knowledge", "intellect"],
    model: pair("Foods and medicines", "The comparison sets the relation, not a ranking.", [["Rational knowledge", "Like food: necessary, nourishing, and not sufficient for a sick heart.", "balance"], ["Revealed knowledge", "Like medicine: what actually treats the diseases the heart has.", "support"]]),
  }),
  makeChapter({
    id: 8, shortTitle: "Learning and inspiration", formalTitle: "Different ways knowledge comes to the heart",
    overview: "Knowledge that is not necessary arrives in two ways: it storms the heart as if cast into it, or it is acquired by inference and instruction. Ghazali names each precisely, and then makes a claim about the difference that is easy to miss.",
    thesis: "Knowledge arrives either by being cast in or by being worked for, and the difference is not where most readers put it.",
    moves: [
      { title: "Name the three", body: "What arrives without contrivance and without the person knowing whence is inspiration, a breathing into the heart, and belongs to the friends of God. What arrives with the witnessing of the angel who casts it is revelation, and belongs to the prophets. What is acquired by inference belongs to the scholars." },
      { title: "Give the picture", body: "The heart is a mirror facing the Preserved Tablet, on which is inscribed everything decreed to the Day of Rising, and a veil hangs between the two. The likeness of knowledge passing from one mirror to the other is like a form printing from one facing mirror into another." },
      { title: "Describe how the veil moves", body: "A veil between two mirrors is sometimes lifted by hand and sometimes moved by the blowing of the wind. So the winds of divine kindnesses blow and the coverings lift from the eyes of hearts, sometimes like a flash of lightning and sometimes in succession, and its permanence is exceedingly rare." },
      { title: "State the actual difference", body: "Inspiration is no different from study in the knowledge itself, or in where it sits, or in what causes it. The only difference is that a screen has been taken away — and taking it away is not yours to arrange." },
      { title: "Note where the three ways differ", body: "The three are separated by exactly one variable: what the recipient is aware of. Knowledge arriving with no contrivance and no sense of where it came from is inspiration. The same arriving with the angel who casts it visible is revelation. And knowledge reached by inference is what scholars have. The content is not what distinguishes them, and neither is the source — only what was apparent to the person while it arrived." },
      { title: "Take the claim about the veil seriously", body: "And the concluding claim is more deflationary than it first appears. Inspiration differs from study neither in the knowledge itself, nor in where it sits, nor in what produced it. The only difference is that a screen has been removed — and, he adds, removing it is not yours to arrange. Which strips the whole category of any suggestion of technique, and makes the difference between the scholar and the one inspired a matter of what was in the way rather than of what either of them did." },
    ],
    closer: [
      { title: "The Sufi preference explained", body: "Because they inclined to the inspired rather than the taught, they were not eager for study or for what the compilers had compiled, and said the way is to put struggle first, to erase the blameworthy traits, to sever every attachment, and to turn with the whole of oneself toward God." },
      { title: "The claim that cuts both ways", body: "Because the knowledge, its seat, and its cause are the same in both, Ghazali's distinction refuses to make inspiration a different kind of thing. What differs is who removed the obstacle, and he places that outside the person's choosing." },
    ],
    distinction: ["Two arrivals of the same knowledge", "By acquisition", "The obstruction is worked at from the person's side by study and inference.", "By inspiration", "The obstruction is removed from the other side, which is not yours to arrange."],
    misreading: "Do not read this as a claim that study is unnecessary or that anyone may treat what occurs to him as inspired. Ghazali makes the removal of the veil precisely the part a person cannot arrange.",
    reflection: "Recall something you understood suddenly, and ask what had been cleared away beforehand for it to land.",
    audit: ["What have I understood without working for it?", "What did I clear away before that happened?", "Am I treating my own notions as given to me?", "Which obstruction is mine to work at?"],
    nodes: ["knowledge", "mirror"],
    model: chain("One knowledge, two routes", "The difference Ghazali specifies is narrow and exact.", [["The realities", "Inscribed on the Preserved Tablet, the same in either case.", "support"], ["The veil", "Hangs between the two mirrors and is the only thing at issue.", "balance"], ["Lifted by effort", "Study and inference work at the obstruction from this side.", "balance"], ["Lifted otherwise", "The winds of kindness move it, which is not the servant's choice.", "support"]]),
  }),
  makeChapter({
    id: 9, shortTitle: "Reservoir and polished wall", formalTitle: "Two tangible examples for ways of knowing",
    overview: "Ghazali supplies two images to make the previous section concrete, one for where knowledge enters and one for what the two kinds of work actually do.",
    thesis: "Two images make the previous section concrete: one for where knowledge enters, one for what the two kinds of work do.",
    moves: [
      { title: "Give the reservoir", body: "A pool may be filled by channels dug to it from outside, or the earth beneath it may be cleared away until clear water breaks up from its floor, and that water is purer, more lasting, and sometimes more abundant." },
      { title: "Read the image", body: "The heart is the pool, knowledge is the water, and the five senses are the channels. Knowledge may be driven to the heart along the channels of the senses until it is full, and the channels may instead be stopped by seclusion and lowered gaze while the heart's own depth is cleared, until the springs break open from within." },
      { title: "Name the two doors", body: "The heart has a door open to the world of the unseen and a door open to the five senses. Turning to the images gathered from the senses veils it from the Tablet, as water gathered in the channels prevents it from welling from the ground, and as one who looks at water reflecting the sun is not looking at the sun." },
      { title: "Give the second image", body: "Two groups contended before a king over the art of decoration. He gave them the two sides of one hall with a curtain hung between. One side gathered pigments and painted; the other only polished their wall. When the curtain was drawn the polished side held the same work, brighter." },
      { title: "Follow the reservoir carefully", body: "The reservoir is the more useful of the two images because it makes a claim about where effort goes. Water can be brought in along channels from outside, or the floor can be dug out until springs open from below — and the second water is purer, more lasting and sometimes more plentiful. Which maps onto two entirely different programmes: acquiring, and clearing. Seclusion and the lowered gaze are not devotional extras on this account; they are the digging." },
      { title: "Note what the two doors establish", body: "And the point about the two doors is the one with teeth. The heart has a door to the unseen and a door to the senses, and turning toward the images the senses supply veils it from the other — as water standing in the channels stops the spring from rising, and as a man watching the sun's reflection in water is not looking at the sun. So the two routes are not merely different; the first actively obstructs the second, which is why filling the heart with acquired material is not a neutral preparation for anything else." },
      { title: "Take the contest of the two walls", body: "And the story of the two walls is the sharpest form of the claim. One group gathers pigments and paints; the other only polishes. When the curtain is drawn the polished wall carries the same work, brighter — because it was never producing anything, only becoming able to receive what was already there. The image also states the limit: the polishers got the picture because there was a painted wall opposite. Polishing alone, with nothing to reflect, yields nothing." },
    ],
    closer: [
      { title: "What the second image is for", body: "It marks the difference between the two labours rather than the two doors. The scholars work at acquiring the knowledge itself and drawing it to the heart; the friends of God work only at burnishing, purifying, and clearing." },
      { title: "The four grades of existence", body: "Ghazali sets the reservoir inside a larger frame: the world exists on the Tablet before it exists bodily, then really, then in imagination, then intellectually in the heart. You perceive only what has reached you, so had the whole world not been given a likeness within you, you would have no report of anything outside yourself." },
    ],
    distinction: ["Two ways to fill the same pool", "From the channels", "Knowledge is gathered through the senses and reflection on what is witnessed.", "From beneath", "The obstruction is cleared and the water rises from the pool's own floor."],
    misreading: "Do not read the second route as a recommendation to abandon study, or the contest as a verdict against one of the two crafts. Both walls in the story carried the work.",
    reflection: "Ask which of the two labours your week consisted of, and whether anything at all was cleared.",
    audit: ["Am I filling channels or clearing a floor?", "What have I gathered that I have not made room for?", "Which images from the senses are standing where the light would fall?", "When did I last stop taking anything in?"],
    nodes: ["mirror", "knowledge"],
    model: pair("Two labours", "The images separate where the work is done, not which work is real.", [["Painting the wall", "Knowledge is acquired and brought to the heart from outside.", "balance"], ["Polishing the wall", "Nothing is added; the obstruction is removed and the same thing appears.", "balance"]]),
  }),
  makeChapter({
    id: 10, shortTitle: "Witness from revelation", formalTitle: "Religious testimony for knowledge beyond ordinary instruction",
    overview: "Having described a way of knowing that does not proceed by instruction, Ghazali turns to the question a careful reader will already be asking, and gathers the textual grounds for it.",
    thesis: "Having described a knowing that does not proceed by instruction, Ghazali gathers the textual grounds for it.",
    moves: [
      { title: "State what is being supported", body: "The claim is not that anything may be believed on the strength of an impression, but that the heart has a route to knowledge that does not run through the senses and instruction." },
      { title: "Gather the grounds", body: "The verse that those who struggle in God will be guided to His ways; the report that whoever acts on what he knows is given by God knowledge of what he did not know; and the report that if the devils did not hover over the hearts of the children of Adam they would look upon the kingdom of the heavens." },
      { title: "Read the obstruction backwards", body: "The lights of knowledge were never veiled from hearts by any withholding on the Giver's part, since the Giver is far above withholding. They were veiled by impurity, clouding, and occupation on the hearts' part. Hearts are like vessels: while full of water no air enters them." },
      { title: "Set the condition", body: "Purity is the door of remembrance, remembrance the door of unveiling, and unveiling the door of the greatest triumph. Every stage is conditioned on the one before it, which is why nothing here can be claimed as a shortcut." },
      { title: "Note the careful statement of the claim", body: "The section opens by fencing the claim before defending it: this is not that anything may be believed on the strength of an impression, but that the heart has a route to knowledge not running through the senses and instruction. That distinction is doing all the work. The first would license every private conviction; the second is a claim about how knowledge can arrive, and says nothing about how any particular arrival should be assessed." },
      { title: "Follow the argument about obstruction", body: "And the argument runs backwards from the obstruction, which is its strongest move. The lights were never withheld — the Giver is far above withholding. So if they are not arriving, the explanation is on the receiving end: impurity, clouding, and being occupied. Hearts are like vessels, and while one is full of water no air enters. Which relocates the whole question from whether a person has been granted something to what he is currently full of." },
      { title: "Note why the conditions rule out a shortcut", body: "And the chain at the close is stated as a series of conditions, each on the one before it: purity opens onto remembrance, remembrance onto unveiling, unveiling onto the greatest triumph. Nothing in the sequence can be entered at the second step. Which is why nothing in this section amounts to a technique — the first door is moral, and the whole of the Quarter of Perils is about getting through it." },
    ],
    closer: [
      { title: "The ranks of faith", body: "Ghazali distinguishes three: the faith of the generality, which is pure imitation; the faith of the theologians, mixed with some inference and near the first in degree; and the faith of the knowers, witnessed by the light of certainty. His illustration is a report that a person is in the house, believed on a truthful informant's word, then on hearing his voice from within, then on entering and seeing him." },
      { title: "The proportion he keeps", body: "The higher rank is described without being made available on request. Every account of how the veil lifts in this book is paired with a condition that has to be met first, and the conditions are ordinary: purity, obedience, and turning away from appetite." },
    ],
    distinction: ["Two things an unusual knowledge might be", "A lifted obstruction", "The heart's own capacity operating once what stood in the way has been removed.", "A private authority", "A claim that what occurs to a person is thereby true, which nothing here supports."],
    misreading: "Do not conclude that this licenses acting on impressions or setting aside instruction. Ghazali's own conditions here are purity, obedience, and struggle, all of which are checkable.",
    reflection: "Ask which of the three ranks of faith describes your own assent to something you would say you are certain of.",
    audit: ["What is my certainty actually resting on?", "Have I met any of the stated conditions?", "What is occupying the vessel?", "Would I recognise the difference between clarity and preference?"],
    nodes: ["knowledge", "mirror"],
    model: chain("The stated order", "Ghazali makes each stage conditional on the one before.", [["Purity", "Turning from appetite and holding to obedience.", "support"], ["Remembrance", "The heart becomes occupied with God rather than with what filled it.", "balance"], ["Unveiling", "What was always there becomes visible as the obstruction lifts.", "balance"], ["The triumph", "The meeting toward which the whole sequence was ordered.", "support"]]),
  }),
  makeChapter({
    id: 11, shortTitle: "Promptings and influence", formalTitle: "How destructive suggestions gain influence over the heart",
    overview: "Ghazali turns from knowing to the traffic of thoughts, and builds the causal chain that the rest of the quarter depends on. It begins with something that arrives unbidden and ends with a moving limb.",
    thesis: "A chain that starts with something arriving unbidden and ends with a moving limb.",
    moves: [
      { title: "Define the prompting", body: "The closest effects produced in the heart are its promptings, meaning the thoughts and recollections that occur to it. They are called promptings because they occur after the heart had been heedless of them." },
      { title: "Give the chain", body: "The beginning of actions is the prompting. The prompting moves desire, desire moves resolve, resolve moves intention, and intention moves the limbs. Nothing is intended before it has occurred to the mind." },
      { title: "Split the promptings by their end", body: "What calls toward what harms in the outcome, and what calls toward what benefits in the hereafter. Two different promptings needed two different names: the praised one is inspiration and the blamed one is suggestion." },
      { title: "Argue back to two causes", body: "Every occurrence has a producer, and different occurrences indicate different causes. When the walls of a house are lit by fire while its ceiling darkens with smoke, the cause of the blackness is other than the cause of the light. So the cause of the prompting to good is called an angel and the cause of the prompting to evil a devil." },
      { title: "Take the chain from prompting to act", body: "The chain is the most practically useful thing in the book: prompting, then desire, then resolve, then intention, then the limbs move. Five links, and the first is a thought occurring — which nobody chooses and which arrives, as the name says, after the heart had not been thinking of it. Nothing is ever intended that did not first occur to the mind, so the whole of a person's conduct traces back to a stage he did not initiate." },
      { title: "Follow the argument from smoke", body: "And the argument that two kinds of prompting require two kinds of cause is an inference rather than an assertion. Every occurrence has a producer, and unlike occurrences point to unlike producers — as when the walls of a house are lit by a fire while the ceiling blackens with smoke, and nobody supposes one cause produced both the light and the blackness. From which the cause of the prompting toward good is named an angel and the cause of the prompting toward evil a devil. The naming comes at the end of the reasoning, not before it." },
    ],
    closer: [
      { title: "The equal starting position", body: "Ghazali is careful here. The heart by original disposition is equally fit to receive the effects of the angel and the effects of the devil, with no preponderance either way. The tilt comes only from following caprice or from opposing it, and caprice is the devil's pasture." },
      { title: "The two touches", body: "The report he cites gives a symmetrical pair: a touch from the angel, promising good and confirming the truth, and a touch from the enemy, promising evil and denying the truth. Whoever finds the first should praise God, and whoever finds the second should seek refuge." },
    ],
    distinction: ["Two things a thought's arrival can mean", "A prompting", "It occurred, which by itself indicates nothing about the person who received it.", "A tilt", "The heart has been made hospitable to one kind by what it has been following."],
    misreading: "Do not conclude that an evil thought is evidence of a corrupt heart. Ghazali has just said the original disposition is equally open to both, and the next sections make the arrival explicitly blameless.",
    reflection: "Watch one prompting today all the way along the chain, and notice at which link you could still have stopped.",
    audit: ["Where in the chain do I usually notice?", "What has my caprice been pasturing?", "Which of the two touches do I attribute to myself?", "What did I intend before it ever occurred to me?"],
    nodes: ["thought", "resolve", "action"],
    model: chain("From prompting to limb", "Ghazali's chain runs one way and can be interrupted at any link.", [["Prompting", "A thought occurs after the heart had been heedless of it.", "balance"], ["Desire", "The thought moves inclination in the nature.", "warning"], ["Resolve", "Inclination hardens into a settled aim.", "warning"], ["Intention", "The aim becomes a determination to act.", "warning"], ["The limbs", "The body carries out what the heart has settled.", "warning"]]),
  }),
  makeChapter({
    id: 12, shortTitle: "Guarding the entrances", formalTitle: "The principal ways destructive suggestions enter",
    overview: "Ghazali gives the fortress image and draws an obligation from it: guarding the heart is required of every responsible person, guarding cannot be done without knowing the gates, and so knowing the gates is itself required.",
    thesis: "Guarding the heart is obligatory, guarding needs knowing the gates, so knowing the gates is obligatory too.",
    moves: [
      { title: "Give the image and the duty", body: "The heart is a fortress and the enemy wants in — to hold it and run it. A fortress cannot be kept safe except by guarding its gates, its entrances, and the places where the wall is already breached. And nobody can guard gates he does not know about. Then Ghazali turns that into a legal derivation rather than leaving it as an image. Protecting the heart from this whispering is obligatory, and obligatory on every responsible person individually. Whatever an obligation cannot be discharged without is itself obligatory. Repelling the enemy cannot be done without knowing his entrances. Therefore knowing the entrances is obligatory. Three steps, and the conclusion is that this psychology is not optional reading — it is owed." },
      { title: "Identify what the gates are", body: "And here is the sting in it: the entrances are your own traits. Not external temptations, not situations, not other people — the qualities you already have are the doors. There are many, so he confines himself to the great ones, and his phrase for them is worth keeping: the gates that run like main roads, wide enough that the sheer number of the enemy's troops never narrows them. Which means the diagnosis is never 'what happened to me' but always 'what in me was open'." },
      { title: "Name the first two", body: "The first two great gates are anger and appetite. Anger he calls the ghoul of the intellect — what devours it — and the mechanism is military: when the intellect's troops weaken, the other side charges. Then the image everybody remembers: whenever a person becomes angry, Satan plays with him as a boy plays with a ball. Note what the picture concedes. The angry man is not being fought. He is being handled, and effortlessly, by somebody who finds him easy." },
      { title: "Report the three warnings", body: "In the exchange with Moses, the enemy asks to be remembered at three: at anger, because his spirit is then in the person's heart; at the meeting of the ranks, where he brings wife and children to mind until the person turns away; and at sitting alone with a woman not of one's kin." },
    ],
    closer: [
      { title: "Envy as the widest gate", body: "The same account is read by Ghazali as pointing to appetite, anger, and greed, and he singles out the refusal to bow to Adam's grave as envy, calling it the greatest of the entrances." },
      { title: "Why the inventory is the treatment", body: "The section is unusual in the book for offering no cure beyond identification. Its argument is that the gates are specific and knowable, and that a person who does not know his own is not guarding anything." },
    ],
    distinction: ["Two ways of trying to guard a heart", "By the gates", "The specific traits through which influence enters are identified and watched.", "By general resolve", "A wish to be better is held while the actual entrances stay unexamined and open."],
    misreading: "Do not read the list of gates as a complete catalogue. Ghazali says explicitly that the entrances are many and that he is naming only the great ones.",
    reflection: "Name your own widest gate, not the one you would prefer to have, and watch it for a day.",
    audit: ["Which gate is widest in me?", "What reliably gets in that way?", "When did I last know I was angry while I was angry?", "What am I envious of that I have never named?"],
    nodes: ["guard", "anger", "appetite"],
    model: chain("Why knowing the gates is obligatory", "Ghazali builds the duty as an argument rather than an exhortation.", [["Guard the heart", "Protecting it from suggestion is required of every responsible person.", "support"], ["Guard the gates", "A fort is kept only by holding its entrances.", "balance"], ["Know the gates", "Gates that are not known cannot be held.", "balance"], ["So knowing is required", "What the duty cannot be discharged without is itself a duty.", "support"]]),
  }),
  makeChapter({
    id: 13, shortTitle: "Thought and accountability", formalTitle: "Passing thoughts, inclination, resolve, and moral responsibility",
    overview: "Ghazali says the truth of this question cannot be reached until the heart's acts are set out in order from their first appearance to the moving of a limb. He then sets them out, and answers the question link by link.",
    thesis: "The heart's acts are set out in order so that responsibility can be located link by link rather than asserted.",
    moves: [
      { title: "The first state", body: "Ghazali says the truth of this question cannot be reached until the heart's acts are laid out in order, from their first appearance to a limb moving — so he lays them out, and then answers the question of responsibility link by link. First, the prompting. A form simply occurs to the heart. His example is deliberately ordinary: it occurs to a man walking that there is a woman behind him and that he would see her if he turned. Nothing has been wanted yet and nothing decided. This is what gets called the speech of the soul, and it arrives unbidden." },
      { title: "The second state", body: "Second, desire stirs toward the look — appetite moving in the nature. This is called the inclination of the nature, and Ghazali is precise that it is born of the first: the prompting produced it. So we are already one step from anything chosen, and still nothing has been decided. What has happened is that something arrived, and something in you answered it." },
      { title: "The third state", body: "Third, the heart judges that this should be done. And here Ghazali makes the observation that keeps the whole scheme honest: when the nature inclines, aim and intention still do not arise while the deterrents are holding. Shame may stop the turn; so may fear. So an inclination can be fully present and go nowhere, which is exactly why the inclination cannot be the thing you are answerable for. This judgment is what he calls conviction, and it comes after both the prompting and the inclination." },
      { title: "The fourth state", body: "Fourth, resolve settles on the act — what he calls the aim, the intention, the purpose. And he describes how it hardens: at the start it may be weak, but if the heart keeps listening to that first prompting until it has argued with itself for long enough, the aim firms up and becomes a decided will. That is the whole chain: something arrives, something answers, a judgement forms, a decision sets. Four links, and the reason for setting them out in order is that responsibility does not attach at the same place in all of them — which is the question the next sections take up." },
    ],
    closer: [
      { title: "Where the accounting falls", body: "The prompting is not held against a person, because it does not fall under choice; nor is the inclination and the stirring of appetite, for the same reason. These two are what is meant by the pardon granted to the community for what their souls speak. Aim and resolve are not called the speech of the soul at all." },
      { title: "Why the order had to come first", body: "The question is usually asked as though there were one thing called a bad thought. Ghazali's answer is that there are four things, that they arrive in sequence, and that the answer differs at each, which is why he refused to answer before laying out the sequence." },
    ],
    distinction: ["Two things inside one bad thought", "What arrives", "The prompting and the stirring of appetite, which are outside choice and are pardoned.", "What is settled", "The judgment and the resolve, which are chosen and are not called the speech of the soul."],
    misreading: "Do not take the pardon as covering the whole sequence, or the accountability as reaching back to the arrival. The section exists precisely to keep those apart.",
    reflection: "Take one thought you were ashamed of and locate honestly which of the four states you actually reached.",
    audit: ["Did I stop at the arrival or go on to the aim?", "Which deterrent used to stop me and no longer does?", "How long did I listen before it became resolve?", "Am I blaming myself for what was never chosen?"],
    nodes: ["thought", "resolve"],
    model: chain("Four states before a limb moves", "Accountability is answered separately at each.", [["Prompting", "A form occurs; outside choice, and pardoned.", "support"], ["Inclination", "Appetite stirs in the nature; also outside choice.", "support"], ["Conviction", "The heart judges that it should be done; the deterrents have not held.", "warning"], ["Resolve", "The aim settles into a decided will; this is not the speech of the soul.", "warning"]]),
  }),
  makeChapter({
    id: 14, shortTitle: "Remembrance and recurrence", formalTitle: "Whether destructive suggestions can cease entirely",
    overview: "Ghazali reports five positions on whether suggestion is wholly cut off when a person is occupied with remembrance, and then does something he does very rarely: he accepts all of them.",
    thesis: "Five positions on whether suggestion ever stops, and Ghazali does something rare: he accepts all of them.",
    moves: [
      { title: "Set out the range", body: "One group holds the suggestion's root is not annihilated but runs in the heart without effect, since a heart wholly taken up with remembrance is screened from being affected, as a preoccupied person may hear a voice without understanding it." },
      { title: "Continue the range", body: "Another holds that neither the suggestion nor its effect falls away, only its dominance, so that it whispers from a distance and weakly. Another holds that suggestion and remembrance each vanish for an instant and alternate so rapidly that they seem simultaneous, like scattered points on a ball that run together when it is spun." },
      { title: "Give the last position", body: "Another holds that suggestion and remembrance run together on the heart without interruption, as a person may see two things at once with two eyes, and cites the report that every servant has two eyes in his head for his world and two in his heart for his religion." },
      { title: "Give the verdict", body: "The sound view is that all of these positions are correct, and that each falls short of comprehending the classes of suggestion. Each observer looked at one class and reported it." },
      { title: "Note what the four positions are trying to explain", body: "The four positions are all attempts on one problem: what happens to the suggestion in somebody wholly occupied with remembrance. Does it persist without effect, like a voice heard by a preoccupied man who does not take in the words? Does it lose only its dominance, so it whispers weakly from a distance? Do the two alternate too fast to distinguish, like points on a spinning ball? Or do both run at once, as two eyes see two things?" },
      { title: "Take the verdict seriously", body: "And the verdict is that all four are correct, and that each falls short of covering the classes of suggestion. Which is the same move the book on knowledge made about the word intellect and the book on creed made about faith and submission: a long dispute where each party described one case accurately and generalised it. What is being corrected is not any of the four observations but the assumption that suggestion is one kind of thing." },
    ],
    closer: [
      { title: "What the move accomplishes", body: "The disagreement is dissolved by denying that its subject was single. Once suggestion is admitted to have classes, five incompatible descriptions become five accurate reports of five different things." },
      { title: "How it bears on practice", body: "The practical consequence is that a person should not measure his own state against one account of what remembrance ought to do. Finding that suggestion persists alongside remembrance is not evidence that the remembrance has failed." },
    ],
    distinction: ["Two ways to settle a disagreement", "By choosing", "One account is adopted and the others are treated as errors about the same thing.", "By dividing", "The subject is found to have classes, and each account is assigned to the class it described."],
    misreading: "Do not read the verdict as indifference between the positions. Ghazali holds that each is right about something and wrong to have generalised, which is a definite claim rather than a suspension of judgment.",
    reflection: "Notice what you have assumed remembrance is supposed to feel like, and where that expectation came from.",
    audit: ["What do I expect remembrance to remove?", "Have I judged myself against one account of it?", "Which class of suggestion am I actually dealing with?", "Does its persistence prove anything about my state?"],
    nodes: ["remember", "guard"],
    model: spectrum("Five reports, five classes", "Ghazali's verdict is that the range is describing different things.", [["Root remains, no effect", "The heart is screened while wholly occupied.", "balance"], ["Dominance falls only", "It whispers from a distance and weakly.", "balance"], ["Rapid alternation", "Each vanishes by turns too quickly to separate.", "balance"], ["Both run together", "Two channels at once, as with two eyes.", "balance"]]),
  }),
  makeChapter({
    id: 15, shortTitle: "Change and steadiness", formalTitle: "The heart's rapid change and three broad conditions",
    overview: "The book closes on movement. The heart is called the heart because of its turning, and Ghazali sorts hearts by whether that turning has settled in a direction, ending the book where the quarter's remaining nine books will begin.",
    thesis: "The heart is named for its turning, and hearts are sorted by whether the turning has settled in a direction.",
    moves: [
      { title: "State the condition", body: "The heart is in continual change and being acted upon, and these turnings, which knowledge does not reach on its own, are known only by those who watch and keep account of their states with God." },
      { title: "The first heart", body: "A heart built up with God-consciousness, purified by discipline and cleansed of the filth of character. Promptings of good strike into it from the treasuries of the unseen; the intellect turns to consider what occurred and its use becomes clear; and the angel, finding the heart good in its substance and lit by knowledge, finds it fit to alight in, and reinforces it, so that good draws on good without end." },
      { title: "The second heart", body: "A forsaken heart, stocked with caprice, soiled with blameworthy traits, its devil's gates open and its angel's gates shut. Evil begins in it when a prompting of caprice strikes, and the heart turns to the intellect for a ruling, and finds an intellect long accustomed to serving caprice and practised at devising means for it." },
      { title: "The third heart", body: "The heart between them, in which the two calls contend, which is why the book ends by handing the reader on to the treatment that occupies the rest of the quarter." },
      { title: "Follow the mechanism in the first two hearts", body: "The two hearts are described by the same mechanism running in opposite directions, and that is the point. In both, a prompting arrives and the heart turns to the intellect for a ruling. In the first, the intellect is lit by knowledge and the angel finds the place fit to alight in, so good draws on good without end. In the second, the intellect has spent years serving caprice and is practised at devising means for it — so it rules, competently, for the wrong side. Neither heart is short of intelligence." },
      { title: "Note what the third heart implies", body: "And the third heart, where the two calls are still contending, is where the reader is being placed — which is why the book ends by handing him on rather than concluding. The first heart needs no treatment and the second is described as forsaken. Everything in the remaining nine books of the quarter is addressed to the case that is still undecided, and this book's whole function is to establish the anatomy that treatment will work on." },
      { title: "Take the opening claim about change", body: "And the section opens on something easy to skim: the heart is in continual change and continually acted upon, and these turnings are not reached by knowledge on its own — only by people who watch and keep account of their own states. Which sets a condition on everything that follows. The three hearts are not types a person is assigned to; they are conditions he passes between, and knowing which one he is currently in requires the self-examination that Book 38 is devoted to." },
    ],
    closer: [
      { title: "What the first heart is protected from", body: "In such a heart the lamp shines from the niche of lordship until the hidden association, subtler than the creeping of a black ant on a dark night, is not concealed in it. Nothing of the enemy's devices passes; he stands and casts gilded speech, and the heart does not turn to it." },
      { title: "Where the book hands over", body: "Ghazali names what fills the first heart once it is purified of the destroyers: thankfulness, patience, fear, hope, poverty, detachment, love, contentment, longing, trust, reflection, and self-accounting. Those are the books of the fourth quarter, and the sentence is a table of contents for the rest of the work." },
    ],
    distinction: ["Two hearts receiving the same prompting", "The cultivated heart", "The intellect examines what occurred, its good becomes clear, and reinforcement follows.", "The forsaken heart", "The intellect is consulted and is already in caprice's service, so it supplies the means."],
    misreading: "Do not read the three conditions as fixed types of person. The section's subject is the speed at which hearts turn, which is what makes the classification provisional by its own terms.",
    reflection: "Ask which of the three describes you today rather than in general, and notice that the question had to be asked that way.",
    audit: ["Which way is my turning currently settling?", "What does my intellect get asked to do?", "Which gate has been open longest?", "What would reinforcement look like if it came?"],
    nodes: ["heart", "guard", "steady"],
    model: chain("What happens to one prompting", "The same arrival is processed differently by the two hearts.", [["A prompting strikes", "Good or caprice occurs to the heart.", "balance"], ["The intellect is consulted", "The heart turns to it for a ruling on what occurred.", "balance"], ["Its habit decides", "It either examines and clarifies, or supplies means for what was wanted.", "warning"], ["Reinforcement follows", "Good draws on good, or the gates open wider the other way.", "warning"]]),
  }),
];

export const book21MirrorSubjects: MirrorSubject[] = [
  {
    id: "religious-truth", label: "A religious truth", subject: "Something in religion you have never been able to see clearly",
    note: "Ghazali applies the third and fourth obstructions to the obedient and to the learned specifically, so a good record elsewhere is not evidence against them here.",
    obstructions: [
      { id: "unformed", label: "Unformed", mirrorImage: "Iron before it is shaped and burnished", question: "Is the difficulty simply that you have not yet been formed enough to hold this, as knowledge does not show in a child's heart?", present: "The glass is not finished. This is not a fault to repent of but a stage to pass through, and the treatment is time under instruction rather than more effort now.", absent: "You have the formation this would require, so the obstruction lies further down the list.", remedy: "Take the matter that is one step below this one and secure it properly, rather than pressing on the thing that will not yet hold.", chapterId: 6 },
      { id: "tarnished", label: "Tarnished", mirrorImage: "A finished mirror clouded with rust", question: "Is the surface clouded by what you have been doing, so that nothing shows clearly in it at present?", present: "Ghazali ties this directly to sins and the accumulation of appetites, and says the resulting clouding prevents the heart's clarity so that the truth cannot appear in it.", absent: "The clouding is not what is standing here, though he notes that a heart is never wholly free of it.", remedy: "Turn from what is clouding it before returning to the question. On his account obedience and the refusal of appetite are what burnish the glass.", chapterId: 6 },
      { id: "turned-away", label: "Turned away", mirrorImage: "A clear mirror facing elsewhere", question: "Is the glass sound, but aimed at something else entirely, including at good things?", present: "This is the obstruction Ghazali assigns to the obedient. A pure heart wholly taken up with the details of bodily obedience or the arrangements of livelihood is not facing the thing it wants to see.", absent: "Your attention is genuinely on this, so what stands between you is not the direction you are facing.", remedy: "Give the matter its own undivided attention rather than expecting it to appear beside everything else you are attending to.", chapterId: 6 },
      { id: "veiled", label: "Veiled", mirrorImage: "A curtain hung between the glass and the object", question: "Is there a conviction you took on before you could examine it, which now stands between you and this?", present: "Ghazali presses this one hardest. He says it veils most of the theologians and partisans of schools, and even the pious who reflect, because convictions accepted in childhood by good opinion have hardened and become the barrier.", absent: "You can identify where your conviction on this came from and when you examined it, so the curtain is not what is hanging here.", remedy: "Name the conviction, say plainly where you got it, and ask whether you have ever tested it or only defended it.", chapterId: 6 },
      { id: "misdirected", label: "Misdirected", mirrorImage: "Not knowing where the object stands", question: "Do you know which two things you already know would have to be joined for this to become clear?", present: "No sought knowledge is caught except by the net of knowledge already held, and each arises from two prior ones coupling in a particular way. Not knowing which two is a distinct obstruction from not having them.", absent: "You can name the route, so what remains is the work of travelling it.", remedy: "Stop pressing on the conclusion and go looking for the two things it would have to be built from.", chapterId: 6 },
    ],
  },
  {
    id: "own-fault", label: "A fault of your own", subject: "Something about yourself you suspect but cannot bring into focus",
    note: "The five apply to self-knowledge as readily as to anything else, and Book 22 will treat the routes by which a person's faults are shown to him.",
    obstructions: [
      { id: "unformed", label: "Unformed", mirrorImage: "Iron before it is shaped and burnished", question: "Have you yet developed the discernment this particular fault would require in order to be seen?", present: "Some faults are invisible until a person has been formed enough to recognise them, which is why Ghazali treats the child's heart as a case of the same obstruction.", absent: "You are capable of seeing this kind of thing in others, so you are capable of seeing it here.", remedy: "Learn the fault's shape from where it is easier to see, in a description or in someone who has named it in himself.", chapterId: 6 },
      { id: "tarnished", label: "Tarnished", mirrorImage: "A finished mirror clouded with rust", question: "Is the very habit you are trying to see also the thing clouding the glass you would see it with?", present: "This is the hardest form of the second obstruction, because the fault is both the object and the obstruction, and each round of it makes the next round less visible.", absent: "The clouding is general rather than caused by this particular thing.", remedy: "Break the habit once before trying to assess it, since Ghazali holds that the clearing precedes the seeing rather than following it.", chapterId: 6 },
      { id: "turned-away", label: "Turned away", mirrorImage: "A clear mirror facing elsewhere", question: "Is your attention fixed on your record of good actions rather than on this?", present: "Ghazali's own example is a heart occupied with the details of obedience. Attention spent on what is going well is attention not aimed at what is not.", absent: "You are looking at this rather than around it.", remedy: "Set the good record aside for the length of the examination. It is not evidence either way about the thing you are trying to see.", chapterId: 6 },
      { id: "veiled", label: "Veiled", mirrorImage: "A curtain hung between the glass and the object", question: "Is there a settled belief about the kind of person you are that this fault would have to pass through?", present: "A conviction about one's own character functions exactly as the fourth obstruction does: it was formed early, was never examined, and now decides in advance what can be seen.", absent: "Your account of yourself is loose enough to admit this.", remedy: "State the belief about yourself out loud, and ask what evidence would be allowed to count against it.", chapterId: 6 },
      { id: "misdirected", label: "Misdirected", mirrorImage: "Not knowing where the object stands", question: "Are you looking for the fault in your actions when it lives in your motives, or the reverse?", present: "Ghazali's image for the fifth is a person trying to see the back of his own head, who needs two mirrors in a particular relation. Looking in the wrong plane is a real obstruction and not a lack of effort.", absent: "You are looking in the right register.", remedy: "Use the arrangement he describes: get a second surface, which in practice means another person who can see the side you cannot.", chapterId: 6 },
    ],
  },
  {
    id: "decision", label: "A decision", subject: "A choice you keep turning over without it resolving",
    note: "This subject is not one Ghazali names, but the five obstructions are stated as exhaustive for anything a heart is trying to see, so the transfer is his rather than an addition.",
    obstructions: [
      { id: "unformed", label: "Unformed", mirrorImage: "Iron before it is shaped and burnished", question: "Is this a decision you are not yet in a position to make, whatever you do with it now?", present: "Some matters do not resolve because the person facing them has not yet become the person who could.", absent: "The capacity is there.", remedy: "Name what would have to be true of you for this to be decidable, and work on that instead of on the decision.", chapterId: 6 },
      { id: "tarnished", label: "Tarnished", mirrorImage: "A finished mirror clouded with rust", question: "Is an appetite attached to one of the outcomes?", present: "Where an appetite is attached, Book 30's account applies directly: the reasoning will find its way to the answer that agrees with the want, and will feel like reasoning throughout.", absent: "No outcome here is one you are hungry for.", remedy: "Decide it as if the appealing option were unavailable, and see what the reasoning says then.", chapterId: 6 },
      { id: "turned-away", label: "Turned away", mirrorImage: "A clear mirror facing elsewhere", question: "Are you actually considering this, or considering how it will look?", present: "The glass is sound and pointed at the wrong object. What is being examined is the reception of the decision rather than the decision.", absent: "You are looking at the matter itself.", remedy: "Settle the question with the audience removed entirely, which is the test Book 29 makes its instrument.", chapterId: 6 },
      { id: "veiled", label: "Veiled", mirrorImage: "A curtain hung between the glass and the object", question: "Did you inherit a rule about this kind of choice that you have never examined?", present: "An unexamined rule about what people like you do is the fourth obstruction in its ordinary form, and it decides before the deliberation begins.", absent: "You can say where your rule came from.", remedy: "Separate the rule from the case, state it as a claim, and ask whether you would defend it if someone else applied it to you.", chapterId: 6 },
      { id: "misdirected", label: "Misdirected", mirrorImage: "Not knowing where the object stands", question: "Are you missing a piece of information that no amount of further thinking will supply?", present: "The fifth obstruction is not a failure of effort. Some things do not become clear by more reflection because reflection is not where they are found.", absent: "You have what you need and the difficulty is elsewhere.", remedy: "Stop deliberating and go and find the missing thing, or accept that it cannot be had and decide under that condition.", chapterId: 6 },
    ],
  },
];

// The six nodes in data.ts cover the heart's forces, which is the first third of this
// book. Sections 6 to 15 turn to knowing and to the traffic of thoughts, and reference
// seven further concepts; they are defined here rather than in data.ts so the frozen
// /isfahan and /world routes keep the vocabulary they were built with.
const book21ExtraNodes: ConceptNode[] = [
  ["mirror", "The mirror", "The governing image", "The heart likened to a mirror, in which knowledge is the appearing of a form. Five failures of a mirror give the five reasons a heart lacks what it lacks."],
  ["knowledge", "Knowledge", "The form appearing", "Defined precisely before the book relies on it, then sorted into rational and religious, and each of those divided again."],
  ["thought", "The passing thought", "What arrives unbidden", "The first link in the chain that ends at a moving limb. It is not chosen, which is why it is not what a person is answerable for."],
  ["resolve", "Resolve", "Where answerability begins", "Inclination hardened into settled intent. Ghazali sets the heart's acts in order to locate accountability link by link."],
  ["guard", "Guarding the gates", "A derived obligation", "Guarding the heart is required; it cannot be done without knowing the entrances; so knowing the entrances is itself required."],
  ["remember", "Remembrance", "The occupying practice", "What the five reported positions disagree about, and which Ghazali accepts them all concerning, each describing a different strength of prompting."],
  ["steady", "Turning and settling", "Why it is called the heart", "The heart is named for its turning. Hearts are sorted by whether that turning has settled in a direction."],
].map(([id, label, kicker, description]) => ({ id, label, kicker, description, position: `node-${id}` }));

export const book21Movements: TaxonomyGroup[] = [
  { id: "forces", label: "The heart and its forces", description: "The four words and their meanings, the armies of the heart, the city image, and the recurring dispositions.", color: "#b45f4c", chapterIds: [1, 2, 3, 4, 5] },
  { id: "knowing", label: "The heart and knowing", description: "The mirror as the governing image, the kinds of knowledge, how knowledge arrives, and the testimony for a knowing that does not proceed by instruction.", color: "#2c78b8", chapterIds: [6, 7, 8, 9, 10] },
  { id: "thoughts", label: "The traffic of thoughts", description: "How suggestions gain influence, the gates and the duty to know them, where answerability begins, and why the heart is named for its turning.", color: "#3a9b88", chapterIds: [11, 12, 13, 14, 15] },
];

export const book21ConceptNodes: ConceptNode[] = [...conceptNodes, ...book21ExtraNodes];

export const book21: SystemBook = {
  id: 21,
  title: "The Wonders of the Heart",
  shortTitle: "Wonders of the Heart",
  defaultJourneyId: "action",
  chapters: book21Chapters,
  conceptNodes: book21ConceptNodes,
  journeys: book21Journeys,
  sources: contentSources,
  taxonomy: {
    title: "The book's three movements",
    note: "Ghazali announces no numbered contents for this book, so these follow the turn of his own argument: the heart and its forces, the heart and knowing, and the traffic of thoughts.",
    groups: book21Movements,
  },
  mirrorObstructions: {
    title: "The five obstructions",
    note: "Ghazali gives five reasons a mirror fails to show a form and states that hearts lack the knowledge they lack for these reasons and no others. Choose something you are trying to see clearly and work the five in order. This locates an obstruction so that the fitting treatment can begin; it settles nothing about the matter you were trying to see.",
    items: book21MirrorSubjects,
  },
  editorialNote: "The journeys, fifteen reading sections, visual models, and five obstructions are editorial learning aids. The fifteen sections preserve the fifteen expositions Ghazali gives in his own order; he announces no numbered contents list for this book, so the sequence follows his headings. The English is an original synthesis made from a complete reading of the public Arabic text, not a translation and not a substitute for one. Reports and inherited anecdotes are presented as material Ghazali transmitted; this prototype does not independently grade every narration. Ghazali declines to explain the connection between the knowing subtlety and the bodily heart, and declines to discuss the reality of the spirit; where he stops, this synthesis stops. The five obstructions cannot pronounce on what is true in the matter examined. Complex personal cases require the complete Arabic, a reliable full edition, and qualified scholarly guidance.",
};
