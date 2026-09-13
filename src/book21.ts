import { conceptNodes } from "./data";
import type { Chapter, ConceptNode, VisualModel } from "./data";
import type { ConceptLab, MirrorSubject, SourceLink, SystemBook, TaxonomyGroup } from "./systemTypes";
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

const set = (title: string, caption: string, items: Array<[string, string, "support" | "balance" | "warning"]>): VisualModel => ({
  kind: "set", title, caption, items: items.map(([label, body, role]) => ({ label, body, role })),
});

export const book21Chapters: Chapter[] = [
  makeChapter({
    id: 1, shortTitle: "Four words, five meanings", formalTitle: "The meanings of soul, spirit, heart, and intellect",
    overview: "Ghazali opens this book by clearing up a confusion he says causes most mistakes about the inner life: four common words each have more than one meaning, and few people keep them straight.",
    thesis: "Heart, spirit, self and mind are four words with five meanings between them, and most errors in this subject come from mixing them up.",
    moves: [
      { title: "Start with a warning about words", body: "Four words come up constantly in this subject: heart, spirit, self and mind. Ghazali says even great scholars rarely keep their meanings apart. Most mistakes about the inner life, he says, come from not noticing that each word means more than one thing." },
      { title: "Heart: an organ, and something more", body: "The first meaning of “heart” is the cone-shaped organ on the left side of your chest. Animals have one, and so does a dead body. That is a doctor's subject, not this book's. The second meaning is a subtle, God-given reality connected to that organ. That is the real you: the part that understands, knows, is spoken to by God, and is held responsible." },
      { title: "Spirit: two meanings", body: "Doctors use “spirit” for a fine vapour that rises from the heart and spreads through the blood vessels, carrying life and the senses. Ghazali compares it to a lamp carried around a room, lighting every corner it reaches. The second meaning is the same knowing reality described above — what the Quran calls something “from the command of my Lord”." },
      { title: "Self: the one you fight, and the one you are", body: "Sufis use “self” (nafs) for the part of you that gathers up anger and desire — the self you have to struggle against. But “self” also means the real you. And the real you gets different names depending on its state. When it is calm and obedient, it is “the self at peace”. When it keeps protesting against your desires and blaming you, it is “the self that blames”. When it gives in to them, it is “the self that urges evil”." },
      { title: "Mind: knowledge, or the knower", body: "“Mind” ('aql) can mean knowledge of how things really are — something that lives in the heart. Or it can mean the one who does the knowing, which is the heart itself." },
      { title: "Count them up", body: "So there are four words and five meanings. Four are separate: the physical heart, the physical spirit, the desiring self, and knowledge. The fifth is the knowing reality that all four words can point to. When the Quran and hadith speak of the heart, they mean this fifth one: the part of you that understands." },
      { title: "Notice the hope in the three names", body: "The three names for the self describe one person in different states, not three different selves. That matters. When your conscience blames you after you do something wrong, that isn't failure. It is the second state, the self that blames — already a step up from simply giving in." },
    ],
    closer: [
      { title: "Where Ghazali stops", body: "He refuses to explain exactly how this knowing reality is connected to the physical heart, for two reasons. It belongs to a deeper kind of knowledge than this practical book is about. And it would mean revealing the secret of the spirit, which the Prophet himself did not speak about. So the book describes what the heart does and how it changes — not what it ultimately is." },
      { title: "Why the physical heart still matters", body: "Ghazali says the knowing reality uses the whole body, but its first connection is to the physical heart — as if the heart were its home and its kingdom. That is why the Quran can speak of “hearts in the chest”." },
    ],
    distinction: ["Which “heart” is meant", "The organ", "A piece of flesh that animals and dead bodies also have — a doctor's subject.", "The real you", "The part that understands and is responsible, which is what this whole book is about."],
    misreading: "Don't conclude that the two meanings have nothing to do with each other. Ghazali says they have a special connection. He only refuses to explain exactly what it is.",
    reflection: "Next time someone says “heart”, “spirit”, “self” or “mind”, ask which of the five meanings they actually mean.",
    audit: ["Which meaning did I just assume?", "Have I argued with someone who meant a different thing by the same word?", "When I say I'm fighting myself, which “self” do I mean?", "Does my conscience still blame me when I do wrong?"],
    nodes: ["heart", "intellect"],
    model: pair("One word, two senses", "Ghazali's first protection is a definition, not an exhortation.", [["The bodily meaning", "Present in animals and in the dead; the physician's subject.", "balance"], ["The inward meaning", "Perceives, knows, is addressed and held responsible; this book's subject.", "support"]]),
  }),
  makeChapter({
    id: 2, shortTitle: "The heart's armies", formalTitle: "The visible and inward forces that serve the heart",
    overview: "The heart rules the body through “armies”. Ghazali sorts them into the ones you can see and the ones you can only notice inside, and explains why the heart needs them at all: it was made for a journey.",
    thesis: "The heart needs its armies because it was made for a journey to God, and every journey needs something to ride and supplies to carry.",
    moves: [
      { title: "Name the army you can see", body: "Your hands, feet, eyes, ears, tongue and every other organ serve the heart. When it tells the eye to open, the eye opens. When it tells the foot to move, the foot moves. Ghazali compares this to angels obeying God, with one difference: angels know they are obeying, but your eyelids have no idea." },
      { title: "Explain why it needs an army", body: "Why does the heart need servants? Because it was created for a journey — the journey to God. A journey needs something to ride and supplies to carry. The body is what the heart rides. Knowledge is its supply. Good deeds are how it gathers that supply. This world is a stop along the road, which is why Ghazali calls it the farm for the next life." },
      { title: "Keep the ride alive", body: "To finish the journey, the body has to stay alive. So it needs to bring in what helps it, like food, and push away what harms it. For that, God created two inner forces. Desire reaches for what the body needs. Anger defends it from danger. Hands and feet carry out what they want." },
      { title: "Add the scouts", body: "Wanting food is useless if you can't recognise food. So God also gave the heart ways of knowing: the five outer senses — sight, hearing, smell, taste and touch — and five inner powers in the brain." },
      { title: "List the inner powers", body: "Close your eyes after looking at something, and you can still see it inside: that is imagination. Something keeps that picture stored: memory. You can combine and work with what's stored: thinking. You can bring back something you forgot: recollection. And something gathers what all the senses report into one picture: common sense." },
      { title: "Sort everything into three", body: "All the heart's armies fit into three groups. One pushes you toward something or away from it — Ghazali calls this will. One moves the body to act — power. One notices things and reports back, like spies — knowledge. Everything that goes wrong in a person goes wrong in one of these three: what you want, what you are able to do, or what you tell yourself about the situation." },
    ],
    closer: [
      { title: "Why this map matters", body: "The books that follow deal with anger, greed, pride and other faults. Each one is working on one of these three: what you want, what you can do, or what you know. This section is the map they all use." },
      { title: "The body is a ride, not the goal", body: "In Ghazali's picture, desire and anger aren't enemies in themselves. They are equipment for a journey. The next section asks what happens when the equipment takes over." },
    ],
    distinction: ["Two kinds of army", "Seen with the eyes", "The limbs and sense organs.", "Seen only from inside", "Desire, anger, will, and the inner powers of the mind."],
    misreading: "Don't read “armies” as “enemies”. Here Ghazali's point is that these forces are supplies for a journey. Whether they serve you or rebel is the next section's question.",
    reflection: "Take one ordinary thing you did today and name which of the three — will, power or knowledge — started it, carried it out, and informed it.",
    audit: ["What is my body mostly being used for?", "Am I treating the ride as if it were the destination?", "What supplies for the journey am I actually gathering?", "Which of my senses most needs guarding?"],
    nodes: ["appetite", "anger", "senses", "action"],
    model: set("Three classes of the heart's armies", "Ghazali reduces a long inventory to a working structure.", [["The urging", "Appetite draws the suitable and anger repels the harmful; this is will.", "balance"], ["The moving", "Faculties spread through the limbs carry out the aim; this is power.", "balance"], ["The perceiving", "The senses gather and report like spies; this is knowledge.", "support"]]),
  }),
  makeChapter({
    id: 3, shortTitle: "A kingdom, a fort, and a hunt", formalTitle: "Three analogies for the heart and its inward forces",
    overview: "Desire and anger can serve the heart completely, or they can rebel until they take over. Ghazali gives three pictures of the same situation, and each one shows something the others don't.",
    thesis: "Three pictures — a kingdom, a border fort and a hunt — show how desire and anger can either serve the heart or rule it.",
    moves: [
      { title: "Picture a kingdom", body: "Your body is a kingdom, and the real you is its king. Your limbs are its workers. Your thinking mind is a wise adviser. Desire is the servant who brings food into the city — but he is a liar and a schemer, who gives poisonous advice that sounds helpful. Anger is the chief of police." },
      { title: "Rule it well", body: "The kingdom runs well when the king listens to his adviser, ignores the lying servant — or even does the opposite of what he suggests — and puts the police chief in charge of him. Then the servant is managed instead of managing. You do this, Ghazali says, by letting your mind lead, and using anger and desire to check each other." },
      { title: "See how desire lies", body: "The detail to hold onto is that desire doesn't announce itself. It arrives looking like good advice, with reasons attached: “You deserve this.” “Everyone does it.” That is why the answer isn't simply saying no. It is putting something in charge that can tell the difference." },
      { title: "Picture a border fort", body: "In the second picture, your body is a fort on a border. The self that urges evil is an enemy trying to take it. You are the guard stationed there. Fight and win, and you are praised when you return home. Neglect your post, and you will hear the words of a report: “Bad shepherd! You ate the meat and drank the milk, but you didn't bring back the lost sheep or bandage the injured one.”" },
      { title: "Picture a hunter", body: "In the third picture, your mind is a hunter on horseback. Desire is the horse, and anger is the hunting dog. A skilled rider on a trained horse, with a well-trained dog, will catch something. A clumsy rider on a bolting horse, with a dog that bites, won't catch anything. He is more likely to get himself killed." },
      { title: "Name the three ways it fails", body: "Ghazali explains each part. The clumsy rider is ignorance and poor judgement. The bolting horse is desire taking over — especially the cravings of the stomach and sexual desire. The biting dog is anger taking over. Any one of the three can wreck the hunt on its own." },
      { title: "Notice the upside-down world", body: "Ghazali says most people live with this picture turned upside down. Their minds have become servants of their desires, busy inventing clever ways to get what they want. It should be the other way round: desire serving the mind." },
    ],
    closer: [
      { title: "What each picture adds", body: "The kingdom is about who is in charge. The fort is about responsibility — you were trusted with a post. The hunt is about training: desire and anger aren't the enemy, they're equipment, and untrained equipment is dangerous." },
      { title: "The goal is balance", body: "Ghazali says that when the mind uses anger to curb desire, and uses desire to cool anger, a person's inner forces come into balance, and their character becomes good." },
    ],
    distinction: ["Two ways the same forces can stand", "Under the mind's lead", "Desire and anger serve the journey and keep each other in check.", "Leading the mind", "The mind becomes a servant, inventing ways to get what desire wants."],
    misreading: "Don't read these pictures as calls to destroy desire or anger. In every picture they stay. The question is who is directing whom.",
    reflection: "Ask which of the three pictures fits your last hard day, and who was giving the orders.",
    audit: ["Who is in charge of my kingdom right now?", "When did desire last give me “good advice”?", "What is my anger being used against?", "Is my horse trained, or does it bolt?"],
    nodes: ["heart", "intellect", "appetite", "anger"],
    model: set("The realm analogy", "Each part has a role, and misrule has a specific shape.", [["The ruler", "The governing self, for whose journey the realm exists.", "support"], ["The vizier", "Reflective intellect, whose counsel is to be preferred.", "support"], ["The police chief", "Anger, useful when set under the counsellor's direction.", "balance"], ["The scheming servant", "Appetite, which fetches supplies and disguises harm as advice.", "warning"]]),
  }),
  makeChapter({
    id: 4, shortTitle: "What only humans have", formalTitle: "What distinguishes the human heart",
    overview: "Animals have desire, anger and senses too — a sheep sees a wolf and knows to run. So what belongs to the human heart alone? Ghazali's answer is two things.",
    thesis: "What sets the human heart apart is knowledge that goes beyond the senses, and a will that can choose what is good even when it hurts.",
    moves: [
      { title: "Grant what animals share", body: "A sheep sees a wolf and knows inside that it is dangerous, so it runs. That is real inner knowing. So desire, anger and even inner perception are not what make humans special." },
      { title: "First: knowledge beyond the senses", body: "Humans can know things no sense could show them. You know that one thing can't be in two places at the same time — and you know it about every thing, even though your eyes have only ever seen a few. That kind of general truth belongs to the mind alone." },
      { title: "Second: a will that sees the outcome", body: "When your mind sees where something leads, a wish for that good outcome rises in you. This isn't the same as desire. It is often desire's opposite. Desire shrinks from a painful medical treatment; the mind wants it, and even pays for it. Desire wants rich food when you're ill; something else in you holds you back." },
      { title: "See why both were needed", body: "Suppose God had given people a mind that sees consequences, but no drive to act on what it sees. Then the mind's judgement would be wasted. Knowing the right thing doesn't move your hands by itself. So God created this second power too." },
      { title: "Watch it grow", body: "A young child has desire, anger and senses, but not yet this knowledge and will. They grow in stages. First, a child knows obvious truths — like someone learning to write who knows the pen, the ink and single letters, but can't yet join them. Later they gain knowledge through experience and thought, and are called a writer even when they aren't writing." },
      { title: "Know where you stand", body: "A human stands between animals and angels. In eating and growing, you are like a plant. In feeling and moving by choice, you are like an animal. In your outward shape, you are like a picture painted on a wall. What is truly yours is knowing things as they really are. Use every part of yourself for knowledge and good deeds, and you become like the angels." },
      { title: "See what happens otherwise", body: "Chase only bodily pleasures, and you sink below that. Ghazali lists what a person can become: dull like an ox, greedy like a pig, snapping like a dog, holding grudges like a camel, proud like a leopard, sly like a fox — or all of these at once, like a devil." },
    ],
    closer: [
      { title: "The kingdom inside, in detail", body: "Ghazali pictures the real you as a king in the middle of his kingdom. Imagination is his messenger, collecting news. Memory is his treasurer. The tongue is his translator. The limbs are his clerks. The five senses are his spies, each sent to its own region: the eyes to colours, the ears to sounds. When the king is good, as one report puts it, his soldiers are good." },
      { title: "Breezes of mercy", body: "Growth in knowledge has no limit, and God doesn't hold His mercy back from anyone. But it shows up in hearts that put themselves in its way. The Prophet said, “Your Lord sends breezes of mercy through the days of your life — so put yourselves in their path.”" },
    ],
    distinction: ["Two things that both feel like wanting", "Desire", "Follows what feels good now, and runs from what hurts now.", "The mind's will", "Follows the outcome it can see, and will accept pain now for its sake."],
    misreading: "Don't read these two gifts as a reason to feel superior. Ghazali immediately measures people against them and finds that most live at the level of what they share with animals.",
    reflection: "Find one thing you did this week that desire didn't want, and one thing desire chose that your mind had already judged against.",
    audit: ["What did I choose this week against my own comfort?", "When did knowing the outcome fail to move me?", "Which animal in Ghazali's list have I acted like?", "Am I putting myself in the path of the breezes?"],
    nodes: ["intellect", "action"],
    model: pair("The two properties", "Neither alone would be enough.", [["Knowledge", "The intellect grasps outcomes and universals beyond the reach of sense.", "support"], ["Will", "A drive arises on that judgment and moves the limbs, without which the judgment is wasted.", "support"]]),
  }),
  makeChapter({
    id: 5, shortTitle: "A pig, a dog, a devil, and a sage", formalTitle: "The gathered qualities and images of the heart",
    overview: "Ghazali gathers all the heart's qualities under four sources inside every person, and then gives the picture this book is famous for: four creatures living inside one skin.",
    thesis: "Every person carries four sources of behaviour — like a pig, a dog, a devil and a wise sage in one skin — and the sage's job is to keep the others in order.",
    moves: [
      { title: "Name the four", body: "Because of anger, people act like predators: hating, attacking, insulting. Because of desire, they act like grazing animals: greedy and always hungry for more. Because the real self comes from God, it can wrongly want to be like a lord — in control of everything, above everyone, knowing everything. And because humans can think while also having anger and desire, they can act like devils: scheming, tricking, and dressing up evil as good." },
      { title: "Picture the four in one skin", body: "It is as if inside every person there were a pig, a dog, a devil and a sage. The pig is desire. A pig isn't bad because of its colour or its shape, but because of its greed. The dog is anger — fierce not because of how it looks, but because it attacks." },
      { title: "Watch the devil work", body: "The devil doesn't fight you head-on. He works on the other two. He keeps stirring up the pig's greed and the dog's rage, sets them against each other, and makes whatever they already want look good." },
      { title: "Give the sage his job", body: "The sage is your mind. Its job is to see through the devil's tricks with clear insight. Then it uses the animals against each other. It sets the dog on the pig to break its greed, and uses the pig to calm the dog's rage. When the sage manages this, there is justice in the kingdom of the body." },
      { title: "See the hidden worship", body: "Here is Ghazali's sharpest point. Such a person may look down on people who worship stone idols. But if the veil were lifted, he would see himself bowing before a pig, waiting for its signal, and obeying a biting dog. And by serving those two, he is serving the devil who drives them." },
      { title: "List what grows from each master", body: "Obey the pig of desire, and you grow shameless, wasteful or stingy, greedy, flattering, envious, and glad when others suffer. Obey the dog of anger, and you grow reckless, arrogant, mocking and scornful of people. Obey the devil through both, and you grow deceitful, sneaky and two-faced." },
      { title: "List what grows when the sage rules", body: "But if the sage takes charge, desire brought into balance gives you self-control, contentment, calm, modesty and generosity. Anger brought into balance gives you courage, patience, forgiveness and steadiness. The same forces that ruin a person can build good character." },
    ],
    closer: [
      { title: "The mirror and the smoke", body: "The heart is like a mirror. Every good trait polishes it, until the truth shines in it. Every bad trait is like dark smoke rising onto the glass, layer after layer, until it turns black. The Quran calls this the rust that covers hearts." },
      { title: "The black dot", body: "An early scholar, Maymun ibn Mihran, said that when a person sins, a black dot is marked on their heart. If they stop and repent, it is polished away. If they go back to the sin, the dot spreads until it covers the heart. Faith in the heart, a report says, is like a green plant fed by clean water, and hypocrisy is like a sore fed by pus. Whichever is fed more wins." },
    ],
    distinction: ["Two directions the same forces can run", "Led by the sage", "Desire becomes self-control and contentment; anger becomes courage and patience.", "Leading the sage", "Desire becomes greed and shamelessness; anger becomes recklessness and contempt."],
    misreading: "Don't use “pig” and “dog” as insults for other people. They are Ghazali's names for what every person's own behaviour is made of — starting with yours.",
    reflection: "Read the two lists — what grows from obeying and what grows from ruling — and honestly find yourself on both.",
    audit: ["Which of the four gave the orders today?", "What have I served without noticing?", "Which good trait on the second list is truly mine?", "Is my heart's mirror getting cleaner or darker?"],
    nodes: ["appetite", "anger", "intellect"],
    model: set("Four in one skin", "The middle two are driven, the last is charged with governing them.", [["The pig", "Appetite, blamed for greed rather than for its form.", "warning"], ["The dog", "Anger, ferocious in savagery rather than in shape.", "warning"], ["The devil", "Inflames both and sets each upon the other.", "warning"], ["The sage", "The intellect, charged with exposing the deception and governing the rest.", "support"]]),
  }),
  makeChapter({
    id: 6, shortTitle: "The heart as a mirror", formalTitle: "The heart as a mirror in relation to knowledge",
    overview: "Ghazali explains what knowing actually is, then gives five reasons a mirror can fail to show something — and applies each one to the heart. This is the centre of the book.",
    thesis: "Knowledge is like an image appearing in a mirror, and a heart fails to know things for the same five reasons a mirror fails to show them.",
    moves: [
      { title: "Count three things, not two", body: "Ghazali says there are three things here, not two. There is the heart. There are things as they really are. And there is the picture of those things arriving in the heart. Knowledge is that third thing: the arrival. The heart and the truth can both exist, with no knowledge yet." },
      { title: "Choose a mirror, not a hand", body: "He first tries another picture: a hand grabbing a sword. The hand and the sword can both exist before any grabbing happens. But he drops it. When you grab a sword, the sword itself is in your hand. When you know what fire is, fire doesn't enter your heart — only its description does. A mirror fits better, because you don't go into a mirror either. Only your image does." },
      { title: "Give five reasons a mirror shows nothing", body: "A mirror fails to show something for five reasons. (1) It isn't finished — it's still rough iron, not yet shaped and polished. (2) It is rusty or dirty. (3) It is turned the wrong way, with the object behind it. (4) Something is blocking the way between them. (5) Whoever holds it doesn't know where the object is, so can't point it the right way." },
      { title: "Apply the first two to the heart", body: "A heart fails for the same five reasons. The first is not being finished yet, like a young child's heart. The second is the dirt of sins, piled up from giving in to desires again and again. Ghazali quotes a report that whoever commits a sin loses a little understanding that never comes back." },
      { title: "See how the third catches good people", body: "The third reason is the surprising one. A pure, obedient heart can still see nothing of deep truths, because it isn't pointed at them. It may be completely busy with the details of worship, or with earning a living, so it only sees what it is thinking about. And Ghazali asks: if being busy with good deeds can turn the mirror away, what does being busy with desires do?" },
      { title: "Name the fourth: a belief that blocks", body: "Even someone obedient and focused can be blocked by a belief they accepted in childhood, simply because they trusted the people who taught it. Ghazali says this blocks most theologians and people who are fiercely loyal to their school of thought — and many pious people too." },
      { title: "Name the fifth: not knowing where to look", body: "New knowledge usually comes from putting two things you already know together in the right way. It is like breeding animals: you can't get a horse from a donkey and a camel. Or like trying to see the back of your own head: you need two mirrors, angled exactly right. Very few people know how to find those angles." },
    ],
    closer: [
      { title: "Every heart can see", body: "Every heart is naturally able to know the truth. The Quran says the heavens, the earth and the mountains refused to carry God's trust, but humans took it on — and Ghazali says that trust is knowing God. The Prophet said every child is born in a natural state of faith, and that if devils were not circling human hearts, people would see the unseen kingdom of heaven." },
      { title: "Three levels of certainty", body: "Ghazali describes three levels of faith using a man named Zayd. First, someone honest tells you Zayd is in the house, and you believe them — like most people, who believe what their parents and teachers told them. Second, you hear Zayd's voice through the wall — faith mixed with reasoning. Third, you walk in and see him yourself — the certainty of people who truly know God, where there is no room for mistake." },
    ],
    distinction: ["Two reasons a heart may not see", "Something wrong with the glass", "It is unfinished or dirty, so nothing shows clearly.", "Something wrong with the aim", "The glass is fine, but it is turned away, blocked, or pointed the wrong way."],
    misreading: "Don't use the five reasons to rank people. Ghazali applies the third to obedient people and the fourth to the pious and learned — which is exactly why he lists them.",
    reflection: "Think of something you have long wanted to understand, and ask which of the five reasons is actually in the way.",
    audit: ["Is my mirror dirty, or just pointed the wrong way?", "What did I accept as a child without ever examining it?", "Am I looking where the answer would be?", "Which of Ghazali's three levels is my faith at?"],
    nodes: ["mirror", "knowledge"],
    model: set("Five reasons a mirror shows nothing", "Ghazali's list is exhaustive by his own claim.", [["Unformed", "The substance is not yet finished, as in a child's heart.", "warning"], ["Rusted", "Sins and appetites cloud the surface.", "warning"], ["Turned away", "Sound and clear, but aimed at something else.", "warning"], ["Veiled", "An inherited conviction hangs between the glass and the truth.", "warning"], ["Misdirected", "The bearer does not know where the object lies.", "warning"]]),
  }),
  makeChapter({
    id: 7, shortTitle: "Reason and revelation together", formalTitle: "Intellectual, religious, worldly, and otherworldly knowledge",
    overview: "Ghazali sorts the knowledge a heart can hold into what comes from reason and what comes from religion — and refuses both of the extreme positions people usually take.",
    thesis: "Reason and revelation need each other, like food and medicine, and whoever throws out either one goes wrong.",
    moves: [
      { title: "Split knowledge by where it comes from", body: "The knowledge in a heart comes either from reason or from religion. Knowledge from reason is what your natural mind reaches without simply being told." },
      { title: "Split reason's knowledge again", body: "Some of it is obvious, and you can't say when you learned it: that one thing can't be in two places at once, or that something can't both exist and not exist. Some is gained by study and thinking. Ali put it in a poem: there is the mind you are born with and the mind you learn, and the learned kind is useless without the natural kind — just as sunlight is useless to an eye that can't see." },
      { title: "See the heart's eye", body: "The heart is like an eye. The natural mind is like the power of sight. Knowledge is like actually seeing things. A child's knowledge comes later, like sight waiting for the sun to rise. The Quran calls what the heart perceives “seeing”: “It is not the eyes that go blind, but the hearts in the chests.” And a blind rider is in far worse trouble than a blind horse." },
      { title: "Add religious knowledge", body: "Religious knowledge comes from the prophets: learning the Quran and the Sunna and understanding them. It is what keeps the heart healthy. Reason alone isn't enough, just as reason alone can't tell you which medicines cure which illnesses — you have to learn that from doctors. But you still need your mind to understand what you learn." },
      { title: "Refuse both extremes", body: "Ghazali's instruction is direct. Someone who calls for blind following and throws the mind away completely is ignorant. Someone who relies on the mind alone, without the light of the Quran and the Sunna, is fooling themselves. “Don't be either,” he says. “Bring the two together.”" },
      { title: "Use food and medicine", body: "Knowledge from reason is like food. Religious knowledge is like medicine. A sick person can be harmed by food if they skip their medicine. In the same way, the illnesses of the heart can only be treated with the medicines religion provides — the acts of worship the prophets set out to heal hearts." },
      { title: "Picture the blind man and the pots", body: "Some people think reason and religion contradict each other. Ghazali compares them to a blind man who walks into a house, trips over the pots, and demands to know why they weren't put away. He is told the pots are exactly where they belong — he just can't see. The strange thing is that he blames other people's carelessness instead of his own blindness." },
    ],
    closer: [
      { title: "Two kinds of reason-knowledge compete for attention", body: "Knowledge from reason splits again: worldly subjects like medicine, arithmetic and crafts, and next-life subjects like the states of the heart and knowing God. Going deep into one usually leaves you short in the other. Ali compared this world and the next to two pans of a scale, to east and west, and to two wives married to one man: please one, and you upset the other." },
      { title: "Don't be fooled by clever people", body: "So people brilliant in worldly subjects are often unaware of the next life. If they deny a religious truth, don't let that fool you — someone walking east won't find what lies in the west. Al-Hasan al-Basri said of the early Muslims: “If you saw them, you'd say they were mad. If they saw you, they'd say you were devils.”" },
    ],
    distinction: ["Two ways to go wrong", "Following only", "Throwing out the mind entirely, which Ghazali calls ignorance.", "Reasoning only", "Doing without the light of revelation, which he calls being fooled."],
    misreading: "Don't read the contest between worldly and next-life knowledge as contempt for medicine, arithmetic or crafts. Ghazali treats them as real subjects. He is describing how far one person's attention can stretch.",
    reflection: "Ask which of the two you lean on more — reason or revelation — and what you have asked it to do alone.",
    audit: ["Which of the two am I short of?", "Have I blamed religion for something I simply couldn't see?", "Where has my attention gone, and what did that cost?", "Do I take my medicine, or only my food?"],
    nodes: ["knowledge", "intellect"],
    model: pair("Foods and medicines", "The comparison sets the relation, not a ranking.", [["Rational knowledge", "Like food: necessary, nourishing, and not sufficient for a sick heart.", "balance"], ["Revealed knowledge", "Like medicine: what actually treats the diseases the heart has.", "support"]]),
  }),
  makeChapter({
    id: 8, shortTitle: "Learning and inspiration", formalTitle: "Different ways knowledge comes to the heart",
    overview: "Some knowledge is worked for, and some seems to arrive on its own. Ghazali explains both, describes the Sufi path of waiting for inspiration — and reports the scholars' serious warning about it.",
    thesis: "Inspired knowledge is the same knowledge as learned knowledge; the only difference is how the curtain was removed — and the scholars warn that study should come first.",
    moves: [
      { title: "Name two ways knowledge arrives", body: "Knowledge that isn't obvious reaches the heart in two ways. Sometimes it rushes in, as if dropped there, and you don't know how it came. Sometimes it is earned, through reasoning and study." },
      { title: "Give three names", body: "Knowledge earned by reasoning belongs to scholars. Knowledge that drops into the heart without the person knowing its source is called inspiration, and belongs to the friends of God. Knowledge that comes while the person sees the angel bringing it is revelation, and belongs only to prophets." },
      { title: "Picture two mirrors and a curtain", body: "The heart is like a mirror facing another mirror: the Preserved Tablet, where everything God has decreed until the Day of Judgement is written. The five obstacles from the last section hang between them like a curtain. Sometimes the curtain is pulled back by hand; sometimes the wind blows it aside. It can open a little in sleep, in dreams about the future. It opens fully at death. And sometimes, awake, something flashes into the heart like lightning — though it rarely lasts." },
      { title: "State the only difference", body: "Inspiration is no different from learned knowledge in what is known, where it sits, or what causes it. The only difference is how the curtain was removed — and that is not in the person's control. Revelation differs from inspiration only in one way: the prophet sees the angel." },
      { title: "Describe the Sufi way", body: "The Sufis preferred inspiration to study. They weren't keen on books and arguments. Their path was to struggle against the ego, clear out bad traits, cut worldly ties, and turn completely to God. Sit alone, keep up the required prayers, and say “Allah, Allah” with full attention until the tongue falls silent and only the meaning stays in the heart. Then wait. You can't force God's mercy; you can only put yourself in its way." },
      { title: "Hear the scholars' warning", body: "The scholars, Ghazali reports, don't deny this path. But they call it steep and slow. Cutting every tie is almost impossible, and even a small distraction unsettles the heart. Along the way the body can fall ill and the mind can become confused. False ideas can take hold for years. Many a Sufi stayed stuck in one fantasy for twenty years — if he had studied first, he would have seen through it straight away." },
      { title: "Take the sensible order", body: "The scholars compare skipping study to giving up farming in the hope of stumbling on buried treasure. It could happen, but it is very unlikely. So, they say, first learn what scholars have learned and understand it. After that, there is no harm in waiting for whatever else effort and purity may open up." },
    ],
    closer: [
      { title: "Not a shortcut", body: "The path of cleaning the heart is not a way around learning. Even the people who value it most say learning should come first." },
      { title: "What is in your hands", body: "You can clean the mirror, and you can turn it toward God. You can't pull the curtain back yourself. That is why Ghazali calls all of this “putting yourself in the way of mercy” rather than a technique." },
    ],
    distinction: ["Two routes to the same knowledge", "By study", "Working at the obstacles from your side, through learning and reasoning.", "By inspiration", "The curtain being removed from the other side — which you cannot arrange."],
    misreading: "Don't read this as permission to skip studying, or to treat every idea that pops into your head as inspiration. Ghazali makes the curtain the one thing you can't control, and he reports the warning that study should come first.",
    reflection: "Remember something you suddenly understood, and ask what had been cleared out of the way beforehand for it to land.",
    audit: ["What have I understood without working for it?", "What did I clear away before that happened?", "Am I treating my own ideas as if they were given to me?", "What am I skipping that I should study first?"],
    nodes: ["knowledge", "mirror"],
    model: set("One knowledge, two routes", "The difference Ghazali specifies is narrow and exact.", [["The realities", "Inscribed on the Preserved Tablet, the same in either case.", "support"], ["The veil", "Hangs between the two mirrors and is the only thing at issue.", "balance"], ["Lifted by effort", "Study and inference work at the obstruction from this side.", "balance"], ["Lifted otherwise", "The winds of kindness move it, which is not the servant's choice.", "support"]]),
  }),
  makeChapter({
    id: 9, shortTitle: "The pool and the painted wall", formalTitle: "Two tangible examples for ways of knowing",
    overview: "Ghazali gives two pictures to make the last section concrete: a pool that can fill from outside or from below, and a painting contest where one team never touched paint.",
    thesis: "Knowledge can pour into the heart through the senses or rise up from within once the heart is cleaned — and both are shown by a pool and by a painting contest.",
    moves: [
      { title: "Picture a pool", body: "Imagine a pool dug in the ground. You can fill it by digging channels to bring water in from outside. Or you can dig out the earth at its bottom until clean water springs up from below. That water is purer, lasts longer, and is sometimes even more plentiful." },
      { title: "Read the picture", body: "The heart is the pool. Knowledge is the water. The five senses are the channels. Knowledge can flow in through the senses and through what you observe, until the heart is full. Or the channels can be shut — through solitude and lowering your gaze — while the heart's depths are cleaned, until springs of knowledge break open inside." },
      { title: "Answer how a heart can spring with knowledge", body: "How can knowledge come from an empty heart? Ghazali says the full answer is a secret beyond this book, but he gives a hint. An architect draws a plan, then builds from it. God wrote the plan of the whole world on the Preserved Tablet, then created the world to match. The world then makes a picture in your senses, then in your imagination, then in your heart. Your tiny eye can hold the whole sky — and you only ever know what reaches you." },
      { title: "Name the heart's two doors", body: "So the heart has two doors. One opens to the senses. The other opens to the unseen. You can tell the inner door is real from true dreams, which show things the senses never delivered. But while the heart is busy with images from the senses, the inner door is blocked — like water gathered in channels stopping the spring from rising, or like looking at the sun's reflection in water instead of at the sun." },
      { title: "Tell the painting contest", body: "The Chinese and the Byzantines once argued in front of a king about who painted better. He gave each team one side of a hall, with a curtain between them. The Byzantines gathered more colours than anyone could count and painted. The Chinese used no paint at all — they only polished their wall. When the curtain was lifted, the Byzantines' whole painting appeared on the Chinese wall, even brighter, because the wall had become a mirror." },
      { title: "Read the contest", body: "Scholars work like the painters: they bring knowledge in and set it down in the heart. The friends of God work like the polishers: they clean the heart until the truth shines in it. Both walls end up carrying the picture." },
      { title: "See that everyone's light is different", body: "Whichever way it comes, there is no happiness without knowledge, and people differ in how much they have. The Prophet described people crossing the Bridge on the Day of Judgement by their own light. Some have light like a mountain; some less; the last has only a flicker on his big toe, and crawls. Ghazali compares ordinary believers' light to a lamp, the most truthful to the moon and stars, and the prophets' to the sun." },
    ],
    closer: [
      { title: "Notice the limit of the contest", body: "The polishers only got a picture because there was a painted wall opposite them. Polishing with nothing to reflect gives you nothing. Cleaning the heart prepares it; it doesn't replace what revelation brings." },
      { title: "A believer's heart doesn't die", body: "Ghazali adds that a believer's heart does not die, and its knowledge is not wiped out at death. Al-Hasan al-Basri said, “The earth does not eat the place where faith lived.”" },
    ],
    distinction: ["Two ways to fill the same pool", "Through the channels", "Knowledge brought in through the senses and what you observe.", "From below", "The obstacles dug out, and the water rising from the pool's own floor."],
    misreading: "Don't read the second route as advice to stop studying, or the contest as a verdict against the painters. Both walls carried the picture — and the polished wall needed the painted one.",
    reflection: "Ask which kind of work your week was made of — bringing things in, or clearing things out — and whether anything at all was cleared.",
    audit: ["Am I filling channels, or clearing the floor?", "What have I taken in that I haven't made room for?", "Which images from my screens stand where the light would fall?", "When did I last stop taking anything in?"],
    nodes: ["mirror", "knowledge"],
    model: pair("Two labours", "The images separate where the work is done, not which work is real.", [["Painting the wall", "Knowledge is acquired and brought to the heart from outside.", "balance"], ["Polishing the wall", "Nothing is added; the obstruction is removed and the same thing appears.", "balance"]]),
  }),
  makeChapter({
    id: 10, shortTitle: "The evidence for inner insight", formalTitle: "Religious testimony for knowledge beyond ordinary instruction",
    overview: "Having described knowledge that doesn't come through study, Ghazali answers the question a careful reader will ask: what is the evidence? He gathers it from the Quran, the Prophet, the Companions, and two proofs anyone can check.",
    thesis: "The Quran, the Prophet's words, the lives of the Companions, true dreams and prophecy all show that the heart has a way of knowing beyond ordinary study.",
    moves: [
      { title: "Say what is being claimed", body: "Ghazali says anyone who has had even a small insight arrive this way knows the path is real, and anyone who hasn't should believe in it. He isn't saying every impression is true. He is saying the heart has a door to knowledge that doesn't only run through the senses and teachers." },
      { title: "Gather verses from the Quran", body: "The Quran says, “Those who strive for Us, We will surely guide them to Our ways.” It says that whoever is mindful of God, God will make a way out for them and provide for them from where they don't expect — which Ghazali explains as teaching them knowledge without study. And it says, “If you are mindful of God, He will give you a criterion” — a light to tell truth from falsehood." },
      { title: "Add the Prophet's words", body: "The Prophet said, “Whoever acts on what they know, God teaches them what they didn't know.” He said, “Beware the insight of a believer, for they see by the light of God.” He said that earlier nations had people who were inspired, and that if his community had one, it was Umar. And he often prayed for light: in his heart, his hearing, his sight, and every part of him." },
      { title: "Add scenes from the Companions", body: "On his deathbed, Abu Bakr told Aisha to share his wealth with her “two brothers and two sisters”. His wife was pregnant at the time, and later gave birth to a girl. During a sermon in Medina, Umar suddenly called out, “Sariya — the mountain, the mountain!”, warning a commander far away, whose army the enemy was about to overwhelm, to take to the mountain. Uthman told Anas, who had stared at a woman on his way in, that the look showed in his eyes. It wasn't revelation, Uthman said, but true insight." },
      { title: "Give two proofs anyone can check", body: "Stories won't persuade someone set on denying, so Ghazali offers two proofs. First, true dreams: they show hidden things. If that can happen asleep, it isn't impossible awake, since sleep only differs in the senses being quiet. Second, the Prophet told of unseen and future things. If God can show a prophet the truth, He can show truths to someone who isn't given a prophet's mission — a friend of God." },
      { title: "Explain why hearts don't receive it", body: "The light of knowledge was never held back because God is unwilling to give — God doesn't withhold. Hearts miss it because of dirt, cloudiness and being busy. A jug full of water has no room for air." },
      { title: "Put the doors in order", body: "Ghazali gives the order clearly. Being mindful of God is the door to remembering Him. Remembrance is the door to insight. Insight is the door to the great success: meeting God. You can't walk in through the second door." },
    ],
    closer: [
      { title: "Why the first door matters", body: "The first door is about how you live — avoiding what is wrong and doing what is right. That is why nothing in this section is a trick or a technique. The whole Quarter of Perils is about getting through that first door." },
      { title: "Keep it in proportion", body: "Nothing here makes a passing thought trustworthy. The conditions come first, and they can be checked: mindfulness of God, obedience, and turning away from desires." },
    ],
    distinction: ["Two things unusual insight could be", "A cleared view", "The heart's natural power working once the obstacles are removed.", "A private authority", "A claim that whatever occurs to me must be true — which nothing here supports."],
    misreading: "Don't conclude that you can act on hunches or skip learning. Ghazali's conditions — mindfulness of God, obedience and struggle against the ego — all come first, and all can be checked.",
    reflection: "Think of something you say you are certain of, and ask which door of Ghazali's order your certainty actually came through.",
    audit: ["What is my certainty resting on?", "Have I met the first condition?", "What is filling my jug?", "Could I tell the difference between insight and what I simply want to be true?"],
    nodes: ["knowledge", "mirror"],
    model: chain("The stated order", "Ghazali makes each stage conditional on the one before.", [["Purity", "Turning from appetite and holding to obedience.", "support"], ["Remembrance", "The heart becomes occupied with God rather than with what filled it.", "balance"], ["Unveiling", "What was always there becomes visible as the obstruction lifts.", "balance"], ["The triumph", "The meeting toward which the whole sequence was ordered.", "support"]]),
  }),
  makeChapter({
    id: 11, shortTitle: "Where thoughts come from", formalTitle: "How destructive suggestions gain influence over the heart",
    overview: "Ghazali moves from knowing to the stream of thoughts running through the heart. He traces the chain that turns a passing thought into an action, and explains where good and bad thoughts come from.",
    thesis: "Every action starts as a passing thought, and thoughts that call to good and thoughts that call to evil point to two different sources: an angel and a devil.",
    moves: [
      { title: "See the heart as a target", body: "The heart is like a target hit by arrows from every side, or a mirror with image after image passing across it. Things reach it from outside, through the senses, and from inside, through imagination, desire, anger and habit. So it is always changing." },
      { title: "Name passing thoughts", body: "The most direct effects on the heart are passing thoughts: ideas and memories that pop up. Ghazali calls them “passing” because they arrive when the heart wasn't thinking about them." },
      { title: "Follow the chain to action", body: "Every action starts with a passing thought. The thought stirs a wish. The wish stirs resolve. Resolve becomes an intention. And the intention moves the body. You can't intend something that has never crossed your mind." },
      { title: "Give two kinds of thought two names", body: "Some thoughts call you toward what harms you in the end. Others call you toward what helps you in the next life. Different things need different names. The good kind is called inspiration. The bad kind is called whispering." },
      { title: "Reason back to two causes", body: "Every event has a cause, and different events point to different causes. If the walls of a room glow with firelight while the ceiling turns black with smoke, you know the light and the black come from different things. So the source of good thoughts is called an angel, and the source of evil thoughts a devil." },
      { title: "Hear the Prophet on two touches", body: "The Prophet said the heart feels two touches. One is from the angel: it promises good and confirms the truth, and whoever feels it should thank God. The other is from the enemy: it promises evil, denies the truth and discourages good, and whoever feels it should ask God's protection from Satan." },
      { title: "Start equal, tip by habit", body: "Ghazali is careful here. By nature, the heart is equally open to both, and nothing tips it either way at the start. It tips toward the devil by following desire and anger — desire is where the devil grazes. It tips toward the angels by resisting them. And since no heart is free of desire, no heart is free of whispering. The Prophet said everyone has a devil — even he did, except that God helped him and it submitted, so it only told him good." },
    ],
    closer: [
      { title: "Don't study the snake", body: "Some people want to know what devils are made of. Ghazali says that is like finding a snake inside your clothes and stopping to study its colour and length. Deal with the danger. What you need to know is the devil's weapons — desires — not his family history. When someone asked al-Hasan whether the devil ever sleeps, he smiled and said, “If he slept, we could rest.”" },
      { title: "The hardest tricks look good", body: "The dangerous thoughts aren't the obviously evil ones. They are the ones where the devil dresses evil as good. He tells a scholar, “People are lost — how can you stay silent?” Then he pushes him to preach, then to polish his words so people will like him, until he is preaching for fame while believing he preaches for God. Once, the story goes, the devil told Jesus to say “There is no god but God.” Jesus replied, “That is true — but I won't say it because you told me to.”" },
    ],
    distinction: ["Two things a thought's arrival can mean", "It simply arrived", "A thought came, which by itself says nothing about you.", "It found a home", "The heart has been made welcoming to one kind by what it keeps following."],
    misreading: "An evil thought is not proof of an evil heart. Ghazali has just said every heart starts equally open to both, and a later section shows that thoughts which simply arrive are not held against you.",
    reflection: "Watch one passing thought today all the way along the chain, and notice where you could still have stopped it.",
    audit: ["Where along the chain do I usually notice?", "What is my desire feeding?", "Has a bad idea ever come to me dressed as a good one?", "Which of the two touches did I feel most today?"],
    nodes: ["thought", "resolve", "action"],
    model: chain("From prompting to limb", "Ghazali's chain runs one way and can be interrupted at any link.", [["Prompting", "A thought occurs after the heart had been heedless of it.", "balance"], ["Desire", "The thought moves inclination in the nature.", "warning"], ["Resolve", "Inclination hardens into a settled aim.", "warning"], ["Intention", "The aim becomes a determination to act.", "warning"], ["The limbs", "The body carries out what the heart has settled.", "warning"]]),
  }),
  makeChapter({
    id: 12, shortTitle: "The gates of the heart", formalTitle: "The principal ways destructive suggestions enter",
    overview: "Ghazali pictures the heart as a fort and turns the picture into a duty: guarding your heart is required, you can't guard gates you don't know, so knowing the gates is required too. Then he names the widest ones.",
    thesis: "The devil gets into the heart through your own traits, so knowing those traits — anger, greed, envy, love of money and the rest — is part of guarding your heart.",
    moves: [
      { title: "Turn a picture into a duty", body: "The heart is a fort, and the devil is an enemy trying to get in and take over. You can only protect a fort by guarding its gates and weak spots — and you can't guard gates you don't know about. Protecting your heart is a duty for every person. So knowing its gates is a duty too." },
      { title: "Find the gates inside you", body: "Here is the sting: the gates are your own traits. Not outside temptations, not other people, but the qualities you already have. There are many, so Ghazali names the great ones. He says they are as wide as main roads, so no army of devils is too big to march through them." },
      { title: "Gates one and two: anger and desire", body: "Anger swallows up the mind, and when the mind's army is weak, the devil charges. Whenever a person gets angry, the devil plays with them the way a child plays with a ball. In one story, the devil tells Moses to beware of him at three moments: when angry; in battle, when he reminds a soldier of his family until he runs away; and when alone with a woman who isn't a close relative." },
      { title: "Gate three: envy and greed", body: "In a story set on Noah's ark, the devil admits his two most reliable weapons: envy and greed. Envy is what got him cursed, when he refused to bow to Adam. Greed is what he used on Adam, who was allowed everything in the Garden except one tree. “Love of a thing makes you blind and deaf,” says a report — and a greedy person can't see the devil coming." },
      { title: "Gate four: a full stomach", body: "Eating until you are stuffed, even with lawful food, strengthens desires, and desires are the devil's weapons. Ghazali lists what overeating does. It drives out fear of God. It drives out pity for others, because you assume everyone is as full as you. It makes worship heavy. It stops wise words from touching you. And it brings illness." },
      { title: "Gates five and six: showing off, and wanting from people", body: "When love of decorating your home, clothes and things takes over, the devil settles in and multiplies. He keeps you busy improving the house, then the furniture, then the clothes, one thing leading to the next, until your life is over. And when you want something from someone, he gets you performing for them, flattering them, and keeping quiet when you should tell them what is right." },
      { title: "Gates seven and eight: haste, and more than you need", body: "The Prophet said, “Haste is from the devil; taking your time is from God.” Good action needs thought, and thought needs time. Money beyond what you need is another gate. Find a hundred gold coins in the road, and suddenly you “need” nine hundred more — for a better house, better clothes, better furniture. Before, you were content. Now you are poor." },
      { title: "Gate nine: taking sides", body: "Fanatical loyalty to a group, and looking down on its rivals, is a huge gate. Ghazali describes someone loudly devoted to Abu Bakr while lying and eating what's forbidden, and someone devoted to Ali while wearing silk bought with dishonest money. Abu Bakr and Ali would be their first opponents on the Day of Judgement. The Prophet told his own daughter, Fatima, “Work — for I can't save you from God at all.”" },
      { title: "Gates ten and eleven: questions beyond you, and suspicion", body: "The devil gets ordinary people thinking about God's essence until they doubt or imagine false things. The Prophet said that if the devil asks, “Who created God?”, you should say, “I believe in God and His Messenger,” and it will leave. The last gate is thinking badly of other Muslims. The Quran says some suspicion is sin. Ghazali's test: someone always hunting for other people's faults is showing their own heart. “A believer looks for excuses; a hypocrite looks for faults.”" },
    ],
    closer: [
      { title: "Why remembering God isn't enough by itself", body: "The cure, Ghazali says, is closing the gates by clearing out these traits. Remembering God then drives the devil away. Otherwise it is like a hungry dog: if there is no meat in front of you, shouting “Go away!” works. If you are holding meat, it won't leave. Prayer is where you find out — notice how your mind drifts to shopping and arguments the moment you start." },
      { title: "Every bad trait is a gate", body: "These are only some of the gates. Every bad trait in a person is one of the devil's weapons. The whole Quarter of Perils is about closing them, one book at a time." },
    ],
    distinction: ["Two ways to try to guard a heart", "Gate by gate", "Know the traits the devil uses on you, and watch them.", "Good intentions in general", "Wanting to be better while the actual gates stay open and unchecked."],
    misreading: "Don't treat this list as complete, or as a list for judging others. Ghazali says there are many more gates, and every one is found by looking at yourself.",
    reflection: "Name your own widest gate — not the one you'd prefer to have — and watch it for a day.",
    audit: ["Which gate is widest in me?", "What does the devil usually bring through it?", "When did I last notice I was angry while it was happening?", "Whom do I flatter because I want something from them?"],
    nodes: ["guard", "anger", "appetite"],
    model: chain("Why knowing the gates is obligatory", "Ghazali builds the duty as an argument rather than an exhortation.", [["Guard the heart", "Protecting it from suggestion is required of every responsible person.", "support"], ["Guard the gates", "A fort is kept only by holding its entrances.", "balance"], ["Know the gates", "Gates that are not known cannot be held.", "balance"], ["So knowing is required", "What the duty cannot be discharged without is itself a duty.", "support"]]),
  }),
  makeChapter({
    id: 13, shortTitle: "Are you blamed for your thoughts?", formalTitle: "Passing thoughts, inclination, resolve, and moral responsibility",
    overview: "Will you be held responsible for bad thoughts? Ghazali says the question can't be answered until you lay out the heart's steps in order, from a thought first appearing to the body acting. Then he answers, step by step.",
    thesis: "A passing thought and a pull of desire aren't held against you; a firm decision is — and a bad decision you drop for God's sake becomes a good deed.",
    moves: [
      { title: "Face two sets of texts", body: "Some texts suggest thoughts are forgiven: the Prophet said his community is forgiven for what their selves whisper to them, as long as they don't say it or act on it. Others suggest you are accountable: the Quran says God will call you to account for what is inside you, whether you show it or hide it. Ghazali says the way to join them is to see the heart's steps in order." },
      { title: "Step one: a thought appears", body: "A picture simply occurs to the heart. Ghazali's example: a man walking along thinks of a woman behind him, and that he would see her if he turned. Nothing is wanted or decided yet. This is what the hadith calls what “the self whispers”." },
      { title: "Step two: desire stirs", body: "Next, a pull toward looking stirs. It grows out of the first step on its own. Still, nothing has been chosen." },
      { title: "Step three: the heart judges", body: "Then the heart judges that it should do it. Even with desire pulling, a person may not act — shame or fear can hold them back. This judgement comes after the thought and the pull." },
      { title: "Step four: a firm decision", body: "Finally, the heart firmly decides. The decision may start weak, but if the heart keeps listening to that first thought, arguing with itself long enough, it hardens. Even after deciding, a person might regret it and not act, get distracted, or be prevented." },
      { title: "Give the answer", body: "The first two steps aren't held against you, because you didn't choose them. That is what “what the self whispers” means. But a firm decision is held against you. Ghazali's decisive proof: the Prophet said that when two Muslims fight with swords, both the killer and the killed are in the Fire. Asked why the one who was killed, he said, “He wanted to kill his companion.”" },
      { title: "See the good news", body: "There is good news too. The Prophet said God tells the angels: if My servant means to do a bad deed, don't write it down; if he does it, write it as one bad deed. If he means to do a good deed and doesn't, write it as a good deed. And another report adds that when someone drops a bad deed for God's sake, it is written as a good deed." },
    ],
    closer: [
      { title: "The heart is the root", body: "How could the heart not be accountable, when pride, showing off, envy and hypocrisy are all things the heart does? A first glance that falls on something by accident isn't held against you. A second look, chosen, is. The Prophet pointed to his chest and said, “God-consciousness is here.”" },
      { title: "The relief that came", body: "When the verse about being called to account for what is inside you was revealed, the Companions said it was more than they could bear. Later, God revealed: “God does not burden a soul beyond what it can bear.” That shows, Ghazali says, that what isn't within your power in the heart is not held against you." },
    ],
    distinction: ["Two things inside one “bad thought”", "What simply arrives", "The passing thought and the pull of desire — not chosen, and not held against you.", "What you decide", "The firm decision — chosen, and so counted, for good or for bad."],
    misreading: "Don't stretch the forgiveness to cover everything, or the blame back to cover mere thoughts. The whole point of the four steps is to keep those apart.",
    reflection: "Take one thought you felt ashamed of, and honestly find which of the four steps you actually reached.",
    audit: ["Did I stop at the thought, or reach a decision?", "What held me back last time — shame, fear, or God?", "How long did I listen before it became a decision?", "Am I blaming myself for something I never chose?"],
    nodes: ["thought", "resolve"],
    model: chain("Four states before a limb moves", "Accountability is answered separately at each.", [["Prompting", "A form occurs; outside choice, and pardoned.", "support"], ["Inclination", "Appetite stirs in the nature; also outside choice.", "support"], ["Conviction", "The heart judges that it should be done; Ghazali distinguishes voluntary and involuntary judgment.", "warning"], ["Resolve", "The aim settles into a decided will; this is not the speech of the soul.", "warning"]]),
  }),
  makeChapter({
    id: 14, shortTitle: "Can the whispering ever stop?", formalTitle: "Whether destructive suggestions can cease entirely",
    overview: "Does remembering God make the devil's whispering stop completely? Ghazali reports five different answers — and then says all five are right, because the whispering comes in different kinds.",
    thesis: "Whispering comes in three kinds, and remembering God affects each one differently — which is why five competing answers were each right about something.",
    moves: [
      { title: "Hear five answers", body: "One group says remembering God stops the whispering completely, since the Prophet said the devil pulls back when God is remembered. A second says it keeps going but has no effect, like a voice you hear while absorbed but don't take in. A third says it keeps working but loses control, whispering weakly from far away. A fourth says whispering and remembrance take turns so fast they seem to happen together, like dots on a spinning ball. A fifth says both run at the same time, as two eyes can see two things." },
      { title: "Say they are all right", body: "Ghazali's verdict: all five are correct, but none of them covers every kind of whispering. Each group noticed one kind, and described it." },
      { title: "Kind one: evil dressed as truth", body: "Sometimes the devil argues. “Life is long — giving up pleasures all that time is too painful.” Remember God's promise and warning — “Patience with desires is hard, but enduring the Fire is harder” — and the whisper runs off, because it can't claim the Fire is easier. Or it whispers, “Who knows God like you do? How special you must be!” Remember that your knowledge, heart and body were all created by God, and it has nothing left to say. This kind can stop completely." },
      { title: "Kind two: stirring up desire", body: "Sometimes the devil simply stirs desire. If you know for certain something is a sin, the stirring loses its grip, even if it doesn't stop. If you only think it is probably wrong, the pull may keep working, and you have to push back. The whispering is still there, but it doesn't win." },
      { title: "Kind three: stray thoughts", body: "Sometimes it is just wandering thoughts and memories — like thinking about other things during prayer. When you turn back to remembering God, they may leave and return, take turns with your prayer, or run alongside it. Stopping them completely is rare, but not impossible: the Prophet promised forgiveness to anyone who prays two units without their mind drifting to worldly things. It happens to a heart overwhelmed by love — just as someone furious at an enemy can think of nothing else for the length of a prayer." },
      { title: "A moment, not a lifetime", body: "Being free of the devil for a moment, or an hour, is possible. For a whole lifetime, it isn't. Even the Prophet, noticing the pattern on a cloak during prayer, sent the cloak away, saying it had distracted him. Hold on to anything beyond what you need — even one coin — and the devil will whisper about it in your prayer. Wanting the world and expecting no whispering, Ghazali says, is like diving into honey and expecting no flies." },
      { title: "Climb the devil's staircase", body: "A wise man described the devil's steps. First he comes through sins. Refuse, and he comes as “good advice”, pushing you into a practice invented in religion. Refuse that, and he makes you over-strict, forbidding what God didn't forbid. Then he fills you with doubts about your wudu and your prayer. And if that fails, he makes good deeds feel easy, so people admire you and you admire yourself. That is his last step — and he pushes hardest there, because if you get past it, you have escaped him." },
    ],
    closer: [
      { title: "What this means for you", body: "Don't measure yourself against one description of what remembering God should feel like. Finding stray thoughts while you remember God doesn't mean the remembering has failed." },
      { title: "Why all five were right", body: "The argument ended not by picking a winner, but by seeing that “whispering” isn't one thing. Each answer was a true report about one kind of it." },
    ],
    distinction: ["Two ways to settle a disagreement", "Pick a winner", "Treat one answer as right and the rest as mistakes about the same thing.", "Divide the subject", "Find that the subject has kinds, and match each answer to the kind it described."],
    misreading: "Don't read “all five are right” as Ghazali shrugging. He is making a definite claim: each answer is true of one kind, and wrong to claim it covers them all.",
    reflection: "Notice what you expected remembering God to feel like, and where that expectation came from.",
    audit: ["Which kind of whisper am I dealing with?", "Have I judged myself by one description of remembrance?", "What am I holding on to that the devil can whisper about?", "Which step of the staircase am I standing on?"],
    nodes: ["remember", "guard"],
    model: set("Five accounts of remembrance", "Ghazali's verdict is that the range is describing different things.", [["Cessation", "One account holds that suggestion ceases during remembrance.", "support"], ["Root remains, no effect", "The heart is screened while wholly occupied.", "balance"], ["Dominance falls only", "It whispers from a distance and weakly.", "balance"], ["Rapid alternation", "Each vanishes by turns too quickly to separate.", "balance"], ["Both run together", "Two channels at once, as with two eyes.", "balance"]]),
  }),
  makeChapter({
    id: 15, shortTitle: "Three kinds of heart", formalTitle: "The heart's rapid change and three broad conditions",
    overview: "The book ends on movement. The heart, Ghazali says, is always turning. He sorts hearts into three kinds by where the turning settles — and describes the inner argument that decides the middle kind.",
    thesis: "The heart is always turning, and hearts are sorted by whether that turning has settled toward good, settled toward evil, or is still being fought over.",
    moves: [
      { title: "See a heart under fire", body: "The heart is like a target hit from every side. When one thing pulls it one way, something else pulls it back. An angel pulls it away from desire, and a devil pulls it back. One devil drags it toward one wrong, another toward another. It is never left alone." },
      { title: "Hear the Prophet on the turning heart", body: "The Prophet often prayed, “O Turner of hearts, keep my heart firm on Your religion.” Asked whether he was afraid, he said the heart is between two of the fingers of the Most Merciful, who turns it as He wills — meaning, Ghazali explains, God's power to turn it quickly, not fingers like ours. He compared the heart to a sparrow flipping about every moment, to a pot at a rolling boil, and to a feather in the desert, turned over by the wind." },
      { title: "The first heart: at peace", body: "The first heart is built up with mindfulness of God and cleaned of bad character. Good thoughts come into it. The mind thinks them through and sees their good. The angel finds it a good place to stay and brings more good, and good draws on good. It notices even the hidden ways of putting something beside God, which are “subtler than a black ant crawling on a dark night”. It fills with gratitude, patience, hope, love and trust. This is “the heart at peace”." },
      { title: "The second heart: abandoned", body: "The second heart is stuffed with desire and dirty with bad traits. Its gates are open to devils and shut to angels. A desire flickers, and the heart asks the mind for a ruling — but the mind is long used to serving desire, and skilled at finding excuses. Smoke from desire fills the heart until its light goes out, like smoke filling someone's eyes. Even if someone gives it good advice, it can't hear." },
      { title: "Notice it can be about one thing", body: "Many hearts are like the second only in one area. Someone careful about most things may lose all control at the sight of a beautiful face, or when status is within reach, or when someone mentions one of their faults, or when money is on the table." },
      { title: "The third heart: fought over", body: "In the third heart, a desire calls to evil, and faith calls to good. The ego sides with desire; the mind sides with good and calls the desire foolish. Then the devil charges: “Why are you so uptight? Does anyone your age hold back? Will you miss out while everyone enjoys themselves and laughs at you? Look — even that well-known scholar does it. If it were bad, he'd stop.”" },
      { title: "Hear the angel answer", body: "Then the angel charges back: “Will you trade a small pleasure now for the joy of Paradise forever? Other people's wrongs won't make the Fire any cooler for you. Picture a scorching summer day. Everyone is standing in the sun, and you have a cool house. Would you stand outside with them? Then why follow them into the heat of the Fire?” The heart swings between the two armies until whichever it is more like wins." },
    ],
    closer: [
      { title: "You pass between the three", body: "The three hearts aren't fixed types of people. Because the heart turns so fast, you can be in a different one tomorrow. Knowing which one you are in today takes the honest self-checking that Book 38 is about." },
      { title: "Where the book hands over", body: "Ghazali lists what fills the first heart once it is cleaned: gratitude, patience, fear, hope, doing without, love, contentment, longing, trust, reflection and self-examination. Those are the titles of the books of the last quarter. The rest of the Ihya is written for the heart still being fought over." },
    ],
    distinction: ["Two hearts receiving the same thought", "The heart at peace", "The mind examines the thought, sees its good, and more good follows.", "The abandoned heart", "The mind is consulted — but it already serves desire, so it supplies the excuses."],
    misreading: "Don't read the three hearts as fixed labels for people. The whole section is about how fast hearts turn, so any label only describes today.",
    reflection: "Ask which of the three hearts describes you today — not in general — and notice that the question has to be asked that way.",
    audit: ["Which way is my heart turning today?", "What does my mind usually get asked to do?", "Where do I lose control, even though I'm careful elsewhere?", "Which voice won my last inner argument?"],
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

const book21ConceptLab: ConceptLab = {
  kind: "courtyard",
  title: "Who governs the inner city?",
  note: "Hold every faculty in view while changing only the chain of command. The parts do not become good or bad by disappearing; their order changes what the whole person becomes.",
  prompt: "Compare the same inner city under three governments",
  architecture: {
    form: "Four-iwan courtyard",
    reference: "Masjed-e Jāme’ of Isfahan",
    note: "The four-iwan plan is borrowed as a spatial memory aid. The diagram is editorial and is not an analogy found in Ghazali's text.",
    url: "https://whc.unesco.org/en/list/1397",
  },
  scenes: [
    {
      id: "ordered", label: "Ordered city", chapterId: 3,
      setup: "The heart governs, reflective intellect advises, and appetite and anger perform the limited work for which they were given.",
      takeaway: "Discipline is not the destruction of appetite or anger. It is the restoration of a proper government in which both remain useful and neither rules.",
      steps: [
        { id: "heart", label: "Heart", micro: "The governor", body: "The knowing, responsible self receives counsel and directs the other forces toward the journey for which the person was made.", role: "support", position: "center" },
        { id: "intellect", label: "Intellect", micro: "The wise adviser", body: "Reflective intellect sees outcomes and advises the heart. Good order begins when this counsel is preferred over appetite's disguised advice.", role: "support", position: "north" },
        { id: "appetite", label: "Appetite", micro: "Draws what benefits", body: "Appetite draws provision toward the body. It is needed, but its claim about what is beneficial must be judged rather than simply obeyed.", role: "balance", position: "east" },
        { id: "anger", label: "Anger", micro: "Repels what harms", body: "Anger guards and repels harm. In a sound order it is directed by judgment and can be used to restrain appetite rather than enforce it.", role: "balance", position: "west" },
        { id: "limbs", label: "Senses and limbs", micro: "Report and carry out", body: "The senses bring reports inward like scouts, and the limbs carry decisions outward. They serve the direction established above them.", role: "support", position: "south" },
      ],
    },
    {
      id: "appetite-rules", label: "Appetite rules", chapterId: 5,
      setup: "The visible person may remain capable and intelligent, but intellect is recruited to devise better ways of satisfying a want.",
      takeaway: "Intelligence does not prove good government. A highly capable intellect can become appetite's strategist, making an inverted order more effective.",
      steps: [
        { id: "heart", label: "Heart", micro: "A ruler in name", body: "The heart retains responsibility but has yielded practical command. It approves what appetite wants after the reasons have been supplied.", role: "warning", position: "center" },
        { id: "intellect", label: "Intellect", micro: "Recruited strategist", body: "Reasoning is not absent. It is busy devising means, justifications, and routes to the object appetite already selected.", role: "warning", position: "north" },
        { id: "appetite", label: "Appetite", micro: "Sets the destination", body: "What should have fetched provision now decides what the whole city is for. Its wants arrive in the form of advice rather than announcing themselves as appetite.", role: "warning", position: "east" },
        { id: "anger", label: "Anger", micro: "Enforces the want", body: "The guarding force is turned against whatever blocks satisfaction, so resistance feels like an injury that must be overcome.", role: "warning", position: "west" },
        { id: "limbs", label: "Senses and limbs", micro: "Search and serve", body: "Attention searches for opportunities and the limbs carry out the plan. The machinery works; the government is what has failed.", role: "balance", position: "south" },
      ],
    },
    {
      id: "anger-rules", label: "Anger rules", chapterId: 5,
      setup: "The guard becomes the ruler. Perception scans for offence, reasoning proves the need to prevail, and action follows before judgment can recover its place.",
      takeaway: "Anger is not condemned merely for being forceful. The danger is a guarding power becoming the source of judgment and making every faculty serve retaliation.",
      steps: [
        { id: "heart", label: "Heart", micro: "Carried by the guard", body: "The responsible self is moved by the force that was meant to serve it, so urgency is mistaken for authority.", role: "warning", position: "center" },
        { id: "intellect", label: "Intellect", micro: "Builds the case", body: "Reasoning collects evidence for injury and victory. Its skill remains, but its conclusion has effectively been chosen before inquiry begins.", role: "warning", position: "north" },
        { id: "appetite", label: "Appetite", micro: "Supplies the reward", body: "Appetite can support anger with the imagined satisfaction of winning, status, or relief after retaliation.", role: "balance", position: "east" },
        { id: "anger", label: "Anger", micro: "Commands the city", body: "The power made to repel harm now defines what counts as harm and orders the response. Guard and governor have exchanged places.", role: "warning", position: "west" },
        { id: "limbs", label: "Senses and limbs", micro: "Scan and strike", body: "The senses notice confirming signs of offence and the limbs enact the answer, often before a wider account can enter.", role: "warning", position: "south" },
      ],
    },
  ],
};

const book21Sources: SourceLink[] = [
  { label: "Primary Arabic text", note: "The complete public Arabic of Book 21 was read and used to establish the four senses of heart, spirit, soul and intellect, the armies that serve the heart, the mirror and its five obstructions, the chain from passing thought to act, and the three conditions of the heart.", url: "https://shamela.ws/book/9472/748" },
  { label: "The armies of the heart", note: "The passage deriving the inward and outward forces from what the heart's journey requires, and reducing them to will, power, and knowledge.", url: "https://shamela.ws/book/9472/751" },
  { label: "Three analogies", note: "The passage giving the realm with its ministers, the frontier post, and the rider with horse and hound, in which appetite and anger are equipment rather than enemies.", url: "https://shamela.ws/book/9472/753" },
  { label: "The mirror and its obstructions", note: "The passage comparing the heart to a mirror and naming the five reasons a heart lacks what it lacks, including the clear mirror turned the wrong way.", url: "https://shamela.ws/book/9472/759" },
  { label: "The reservoir and the two walls", note: "The passage giving the two tangible examples: channels dug from outside against springs opened from within, and the painters set against the polishers.", url: "https://shamela.ws/book/9472/766" },
  { label: "How suggestions gain influence", note: "The passage on the promptings of the heart, the argument from smoke and light that unlike effects indicate unlike causes, and the naming of angel and devil.", url: "https://shamela.ws/book/9472/772" },
  { label: "The chain and what is held against a person", note: "The passage running from passing thought to desire, resolve, intention and act, and settling which links a person answers for.", url: "https://shamela.ws/book/9472/787" },
  { label: "The three conditions of the heart", note: "The passage on the heart's rapid change and its three broad states, which the book's closing section presents.", url: "https://shamela.ws/book/9472/791" },
  { label: "Published Book 21 edition", note: "Walter James Skellie translation, edited by T. J. Winter. Used for title and chapter cross-checking, not copied as page text.", url: "https://fonsvitae.com/product/al-ghazali-the-marvels-of-the-heart-science-of-the-spirit-book-xxi-of-the-revival-of-the-religious-sciences/" },
  { label: "Forty-book structure", note: "Ghazali.org's listing confirms the book's title and its place among the forty.", url: "https://www.ghazali.org/listing-the-forty-books/" },
];

export const book21: SystemBook = {
  id: 21,
  title: "The Wonders of the Heart",
  shortTitle: "Wonders of the Heart",
  defaultJourneyId: "action",
  chapters: book21Chapters,
  conceptNodes: book21ConceptNodes,
  journeys: book21Journeys,
  sources: book21Sources,
  taxonomy: {
    title: "The book's three movements",
    note: "Ghazali announces no numbered contents for this book, so these follow the turn of his own argument: the heart and its forces, the heart and knowing, and the traffic of thoughts.",
    groups: book21Movements,
  },
  conceptLab: book21ConceptLab,
  mirrorObstructions: {
    title: "The five obstructions",
    note: "Ghazali gives five reasons a mirror fails to show a form and states that hearts lack the knowledge they lack for these reasons and no others. Choose something you are trying to see clearly and work the five in order. This locates an obstruction so that the fitting treatment can begin; it settles nothing about the matter you were trying to see.",
    items: book21MirrorSubjects,
  },
  editorialNote: "The journeys, fifteen reading sections, visual models, and five obstructions are editorial learning aids. The fifteen sections preserve the fifteen expositions Ghazali gives in his own order; he announces no numbered contents list for this book, so the sequence follows his headings. The English is an original synthesis made from a complete reading of the public Arabic text, not a translation and not a substitute for one. Reports and inherited anecdotes are presented as material Ghazali transmitted; this edition does not independently grade every narration. Ghazali declines to explain the connection between the knowing subtlety and the bodily heart, and declines to discuss the reality of the spirit; where he stops, this synthesis stops. The five obstructions cannot pronounce on what is true in the matter examined. Complex personal cases require the complete Arabic, a reliable full edition, and qualified scholarly guidance.",
};
