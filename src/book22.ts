import { assetUrl } from "./assetUrl";
import type { Chapter, ConceptNode, VisualModel } from "./data";
import type { ConceptLab, FaultMirror, Journey, SourceLink, SystemBook, TaxonomyGroup } from "./systemTypes";

const book22Base: Chapter[] = [
  {
    id: 1,
    shortTitle: "Why character matters",
    formalTitle: "Why good character is so valuable and bad character is blamed",
    overview: "Ghazali opens with verses, sayings of the Prophet and sayings of early Muslims about good and bad character. The point is that character isn't just polite manners. It is the inner state that your actions keep coming from.",
    reflection: "A single good moment is worth having, but it doesn't prove much yet. Notice what comes out of you when patience, generosity or self-control start to cost something.",
    relatedNodes: ["character", "health", "justice"],
    deep: {
      thesis: "Good character sits near the centre of religion, not at its edges — and bad character is a sickness of the heart that has to be treated.",
      context: "Before explaining what character is or how to change it, Ghazali makes the case that it deserves serious work. He calls bad character a poison and a disease of the heart. That picture — sickness, diagnosis, medicine — runs through the whole book.",
      moves: [
        { title: "Hear how the Prophet is described", body: "The Quran says to the Prophet, “You are of a great character.” When his wife Aisha was asked about his character, she said, “His character was the Quran.” The Prophet also said, “I was sent to perfect good character.” So good character isn't an extra on top of religion. It is part of what the Prophet came to do." },
        { title: "See what good character actually means", body: "A man asked the Prophet what good character is. He recited a verse — “Take what is easily given, urge what is right, and turn away from the ignorant” — and then explained it: “Keep in touch with someone who cuts you off. Give to someone who refuses you. Forgive someone who wrongs you.” Notice that every part of it is about how you treat people who treat you badly." },
        { title: "Ask “what is religion?” four times", body: "A man came to the Prophet from the front and asked, “What is religion?” He said, “Good character.” The man came from the right and asked again, and got the same answer. He came from the left, and got it again. Then he came from behind and asked a fourth time. The Prophet turned and said, “Don't you understand? It is that you don't get angry.”" },
        { title: "Weigh it on the scales", body: "The Prophet said the heaviest thing placed on the scales on the Day of Judgement is fear of God and good character. Asked which believer has the best faith, he said, “The one with the best character.” And a saying Ghazali passes on warns that bad character spoils good deeds the way vinegar spoils honey." },
        { title: "Notice even the Prophet's gentleness", body: "Once some women of Quraysh were talking loudly around the Prophet. When Umar asked to come in, they rushed to cover themselves. Umar said to them, “You are more in awe of me than of the Prophet?” They replied, “Yes — you are harsher and rougher than he is.” The Prophet, far above Umar, was the easier one to be around." },
        { title: "Hear the early Muslims", body: "The early Muslims said the same in their own words. Anas said a person can reach the highest level of Paradise through good character without doing much extra worship — and fall to the lowest level of Hell through bad character while worshipping a great deal. Al-Fudayl said he would rather travel with a sinner who has good character than a worshipper who has bad character. Al-Hasan said, “Whoever has bad character punishes himself.”" },
        { title: "Take the sickness seriously", body: "Ghazali calls bad character a sickness of the heart. A sickness of the body can only take away this life. A sickness of the heart can cost you the life that never ends. So if doctors study the body's diseases carefully, the heart's diseases deserve even more care. And since no heart is completely free of them, Ghazali says this kind of medicine is something every sensible person needs to learn." },
      ],
      distinction: {
        title: "The opening claim is bigger than good manners",
        firstLabel: "A polite moment",
        first: "One kind or generous act can be forced, done for mixed reasons, or only happen when things are easy.",
        secondLabel: "A formed character",
        second: "A settled inner quality that keeps producing the right actions, more and more easily, even when things get hard.",
      },
      misreading: "Don't use this praise and blame to grade other people's personalities. Ghazali is building up the urgency to work on yourself, and the check-up starts with you.",
      observation: "Pick one quality you care about. Compare how easily it shows up when you're comfortable with how easily it shows up when it costs you time, pride or something you want.",
      sourceAnchor: "Book 22, section 1, the excellence of good character and blame of bad character.",
    },
  },
  {
    id: 2,
    shortTitle: "What character is",
    formalTitle: "What good and bad character really are",
    overview: "Ghazali defines character as a settled inner state that actions come from easily, without having to think them through each time. Then he shows how good character depends on four inner powers being in balance.",
    reflection: "Don't only ask what you did. Ask what kind of inner setup made that response feel natural, hard, attractive or off-putting.",
    relatedNodes: ["character", "knowledge", "anger", "appetite", "justice"],
    deep: {
      thesis: "Character is the settled shape of the inner self: four powers — understanding, anger, desire and the justice that orders them — each in its right measure.",
      context: "Ghazali says many people have described good character, but they described its fruits, not what it actually is. So he gives a definition. In Arabic, the word for your body's shape (khalq) and the word for character (khuluq) come from the same root. One is the shape people see with their eyes. The other is the shape of the soul.",
      moves: [
        { title: "Notice the fruits people named", body: "Early Muslims gave many descriptions. Al-Hasan said good character is a cheerful face, giving freely, and not hurting anyone. Ali said it is avoiding what is forbidden, seeking what is lawful, and being generous with your family. Others said it is having no concern except God. Ghazali says all of these are true — but each person named whatever fruit came to mind. None of them said what the tree is." },
        { title: "Give the definition", body: "Character, Ghazali says, is a settled state of the soul that actions come from easily, without needing to stop and think. If the actions are good, it is good character. If they are bad, it is bad character. Someone who gives money once, for a special reason, doesn't have “generosity” as a character. And someone who forces themselves to give, or to stay calm, with a big effort, doesn't have it yet either." },
        { title: "Separate four things", body: "There are four things here: the action, the ability to do it, knowing whether it is good or bad, and the inner state that tilts you one way. Character is only the fourth. A generous person may not give because they have no money. A stingy person may give to show off. Everyone has the ability to give or hold back. And knowing what is good doesn't make you do it." },
        { title: "Meet the four powers", body: "A beautiful face needs good eyes, nose, mouth and cheeks — not just one of them. Good character also needs four parts to be right. Understanding tells true from false, right from wrong. Anger pushes away harm. Desire goes after what you want. And justice keeps anger and desire under the direction of understanding and God's law." },
        { title: "Picture the hunt", body: "Ghazali gives a picture. Understanding is like a wise adviser. Justice is the power that carries out the adviser's orders. Anger is like a hunting dog: it has to be trained so it runs and stops when it is told to, not whenever it gets excited. Desire is like the horse you ride on the hunt: sometimes well trained, sometimes wild and bolting." },
        { title: "Find the good middle", body: "When each power is balanced, it has a name. Balanced understanding is wisdom. Balanced anger is courage. Balanced desire is self-control. Too much or too little is a fault. Anger overdone is recklessness; too weak, it is cowardice. Desire overdone is greed; too weak, it is a dead lack of wanting. Understanding misused becomes cunning; too weak, it is foolishness. Only justice has one opposite instead of two: injustice." },
        { title: "See the branches", body: "All the other good qualities grow from these four. From wisdom come good planning and sharp judgement. From courage come bravery, patience, steadiness, holding in your anger, and calm dignity. From self-control come generosity, modesty, patience, being satisfied with enough, and carefulness about what is doubtful. Ghazali adds that only the Prophet had all four in perfect balance. Everyone else is nearer to him or further away." },
      ],
      distinction: {
        title: "Doing something easily is part of the definition — but it isn't a shortcut",
        firstLabel: "An act you force",
        first: "You push yourself to be generous or patient while the opposite pull is still stronger. It is good training, but it isn't a settled character yet.",
        secondLabel: "A settled character",
        second: "With practice, the right action becomes ready and natural. Character is that readiness, not a label you earn after one good day.",
      },
      misreading: "The “middle” isn't a boring average between every two feelings. It is the right amount, in the right place, decided by sound understanding in that actual situation.",
      observation: "When the same choice comes up again, notice whether you have to argue with yourself from scratch, or whether practice is starting to carry you.",
      sourceAnchor: "Book 22, section 2, the true nature of character and its four foundations.",
    },
  },
  {
    id: 3,
    shortTitle: "Character can change",
    formalTitle: "How character can change through training",
    overview: "Some people claim character can't change. Ghazali answers them. Training doesn't pull out anger and desire by the roots. It brings them back into balance. People differ in how quickly they change, and he explains why.",
    reflection: "Swap the question “Is this just who I am?” for a sharper one: “What has this part of me been trained to do?”",
    relatedNodes: ["character", "anger", "appetite", "habit", "justice"],
    deep: {
      thesis: "Anger and desire can't be pulled out, but they can be trained — and how hard that is depends on how long a habit has run and whether you believe it is good.",
      context: "Ghazali says the claim “people can't change” usually comes from someone who finds the work of changing too heavy. They argue their way out of it. He gives their two arguments, answers both, and then explains honestly why change is quick for some people and very slow for others.",
      moves: [
        { title: "Hear the two objections", body: "The first objection: your inner shape is like your outer shape. A short person can't make themselves tall, so a bad-tempered person can't make themselves calm. The second objection: “We've tried. We struggled for years, and desire and anger never went away. So it's a waste of time.”" },
        { title: "Answer the first: look at animals", body: "If character couldn't change, all advice, teaching and training would be pointless, and the Prophet wouldn't have said, “Make your character good.” Besides, we change the character of animals all the time. A wild falcon is trained to be tame. A greedy dog is trained to hold back and bring the catch to its master. A wild horse is trained to be calm and obey. Why would a person be harder than a dog?" },
        { title: "See the date stone", body: "Some things are finished and can't be changed by us, like the sky or the shape of your body. Other things are made unfinished, with the ability to become more. A date stone isn't an apple or a palm tree. But it is made so that, if you look after it, it becomes a palm. It will never become an apple. Anger and desire are like that. You can't remove them. You can train them." },
        { title: "Answer the second: the aim was wrong", body: "The second objection comes from a mistake. Those people thought the goal was to wipe out desire and anger completely. That was never the goal. Without desire for food, you would die. Without desire for marriage, no children would be born. Without any anger, you couldn't defend yourself from harm. The goal is balance, not removal." },
        { title: "Remember the Prophet got angry", body: "How could the goal be to remove anger, when the Prophet himself said, “I am only human. I get angry as people get angry”? When something displeased him, his face would redden — but he only ever said what was true. His anger never pushed him away from what was right. And he said, “The best of things is the middle.”" },
        { title: "Know why some change slowly", body: "People change at different speeds for two reasons. First, how strong a drive is and how long it has been there. Desire is the hardest to change, because it came first: a baby has desire from birth, anger may come around seven, and good judgement later. Second, how much a habit has been strengthened — by doing it again and again, and by believing it is good." },
        { title: "Find yourself in four levels", body: "So people are at four levels. First, someone who simply doesn't know yet, whose habits haven't set. They change fastest. Second, someone who knows a thing is wrong but has got used to doing it. Their job is double: pull out the old habit, then plant a new one. Third, someone who believes the bad habit is actually good. They are very hard to change. Fourth, someone who is proud of doing harm and thinks it makes them important. That is the hardest of all. As an old saying goes, “Training the old is exhausting; taming a wolf is torture.”" },
      ],
      distinction: {
        title: "Training changes how a power behaves, not what a human is",
        firstLabel: "Trying to remove it",
        first: "Trying to destroy anger or desire mistakes having a power for misusing it — and can create a new problem.",
        secondLabel: "Training it",
        second: "Keeping the power, but changing what it listens to, when it acts, and how strongly.",
      },
      misreading: "“Possible” doesn't mean “equally fast for everyone.” Ghazali leaves room for differences in how strong a drive is, how long a habit has run, and whether you have convinced yourself it's fine.",
      observation: "Find one reaction that comes more easily now than it did a year ago. What repeated situations trained it — for better or for worse?",
      sourceAnchor: "Book 22, section 3, character's receptivity to change through discipline.",
    },
  },
  {
    id: 4,
    shortTitle: "How a quality is gained",
    formalTitle: "The general way good character is gained",
    overview: "Some people are born with good qualities. Everyone else gains them by doing the actions of that quality again and again, and by spending time with people who have it. Actions shape the heart, and the heart then makes the actions easier.",
    reflection: "Look for the small act which, repeated, would teach you the quality you want. Don't wait until you feel ready.",
    relatedNodes: ["character", "habit", "company", "justice"],
    deep: {
      thesis: "You gain a good quality by doing its actions on purpose, again and again, until they become natural — and you know it has settled when doing it becomes a pleasure.",
      context: "Having shown that character can change, Ghazali explains how. There are two routes: a gift from God at birth, or effort. Most of the section is about effort — and about a strange loop between the body and the heart.",
      moves: [
        { title: "See the two routes", body: "Some people are born balanced, as a gift from God. They know without being taught and are well-mannered without being trained. Ghazali names Jesus and Yahya (John), and the prophets in general. A child can also simply be born truthful, generous or brave. Everyone else gets these qualities by effort." },
        { title: "Do the act before you are the person", body: "Effort means making yourself do the actions of the quality you want. If you want to be generous, make yourself give money, and keep doing it, even when you have to push, until it becomes natural and easy. If pride has taken over and you want humility, keep doing what humble people do, for a long time, until humility becomes your nature." },
        { title: "Learn it like handwriting", body: "Ghazali uses handwriting as the model. If you want beautiful writing, there is no shortcut. You copy good writing over and over with your hand, badly at first. Slowly it becomes a skill inside you, and one day your hand writes beautifully without effort. The action went up from the hand into the heart, then came back down from the heart into the hand. Character works the same way." },
        { title: "Know when it has settled", body: "The goal is for the action to become a pleasure. A truly generous person enjoys giving; someone who gives while hating it isn't there yet. The Prophet said, “The coolness of my eyes is in prayer.” If you worship and avoid sins while finding it heavy and unpleasant, something is still missing. But Ghazali is clear: doing it with effort is still far better than not doing it at all." },
        { title: "See how strange habits get", body: "Don't think it impossible that prayer could become a joy. Habit does even stranger things. A gambler can love gambling, even as it takes his money and wrecks his home. A pigeon-keeper can stand all day in the burning sun, not feeling his tired legs, delighted with his birds. If the soul can learn to love what harms it, why couldn't it learn to love what is true?" },
        { title: "Remember the heart's real food", body: "In fact, loving harmful things goes against the heart's nature, like a sick person craving clay. The heart's natural food is wisdom, knowing God and loving Him, just as a healthy stomach wants bread and water. When a heart loves something more than God, it is sick. The only exception is loving something because it helps you love God and practise your religion." },
        { title: "Don't skip one night — and don't expect one night to do it", body: "Someone who wants to master a subject doesn't give up hope because they skipped one night, and doesn't expect to master it after one night. Growth comes little by little, like a child growing taller. The same is true of the soul. One act of worship won't transform you, and one sin won't ruin you. But one lazy day invites another, until you have quit. Small sins pull in bigger ones in just the same way." },
      ],
      distinction: {
        title: "Practice shapes you — but going through the motions can stay shallow",
        firstLabel: "Just repeating",
        first: "Doing the actions with no aim, no attention, and no idea of the quality you are building. It stays on the surface.",
        secondLabel: "Repeating with a purpose",
        second: "Doing the actions as training toward a quality you have named, with attention and good company, until your character starts to match.",
      },
      misreading: "Don't wait until something feels sincere or easy before you start doing it. On Ghazali's account, doing the right thing is one of the ways the inner quality gets built in the first place.",
      observation: "Pick one situation that keeps coming back, like arguing or spending money. What response is that situation training into you each time it happens?",
      sourceAnchor: "Book 22, section 4, the general means of acquiring good character.",
    },
  },
  {
    id: 5,
    shortTitle: "Treatment must fit the person",
    formalTitle: "The detailed path to fixing character",
    overview: "Ghazali compares a spiritual guide to a doctor. First find out what is wrong. Then treat it with its opposite, in a dose the person can take. One treatment for everyone would do more harm than good.",
    reflection: "Before picking a remedy, name the problem exactly: is it too much of something, too little, or the wrong part of you in charge?",
    relatedNodes: ["diagnosis", "health", "justice", "habit"],
    deep: {
      thesis: "The heart is treated like the body: diagnose the sickness, treat it with its opposite, measure the dose to the person, and move in steps when the full cure is too much at once.",
      context: "Balance is health and imbalance is sickness — for the body and for the soul. So Ghazali takes the body's medicine as his model, point by point. Then he shows what a wise guide actually does with a real student.",
      moves: [
        { title: "Born healthy", body: "Most bodies are born healthy, and get sick from bad food, bad air and hard conditions. In the same way, Ghazali says, every child is born balanced and sound. The Prophet said every child is born on the natural way, and it is the parents who turn it. Bad qualities are picked up by habit and teaching. So treatment is a return to health, not building something new." },
        { title: "Keep health, or restore it", body: "A body isn't born complete; it grows strong through food and care. The soul is born incomplete too, able to grow, and it grows through upbringing, good character and the food of knowledge. A doctor does two jobs: keeping a healthy body healthy, and bringing a sick body back to health. So if your soul is in good shape, work to protect it and strengthen it. If it isn't, work to bring it back." },
        { title: "Treat with the opposite", body: "An illness caused by heat is treated with something cooling. One caused by cold is treated with warmth. A sickness of the heart is treated with its opposite too. Ignorance is treated by learning. Stinginess is treated by giving. Pride is treated by humility. Greed for food is treated by holding back, even when it takes effort." },
        { title: "Measure the dose", body: "A cooling medicine only helps in the right amount. Too little does nothing; too much causes a new illness. A doctor first finds out whether the illness is weak or strong, then looks at the patient's body, age, work and the season. The opposite habits used to treat character need a measure too. And just as the bitterness of medicine has to be put up with, so does the bitterness of the effort." },
        { title: "Don't give everyone the same medicine", body: "A doctor who treated every patient with the same medicine would kill most of them. A guide who gave every student the same training would ruin them too. So a guide looks at the student's sickness, situation, age, temperament, and how much they can bear. If the student is a beginner who doesn't know the basics of religion, the guide first teaches them how to purify themselves and pray. If they are living on money gained unlawfully, or doing a clear sin, they must stop that first." },
        { title: "Then look deeper", body: "Only when the outer life is in order does the guide look at the heart. If the student has much more money than they need, the guide has them give it away to good causes, so their heart stops clinging to it. If pride rules them, the guide gives them humbling work. If they are vain about how clean and fine their clothes are, the guide may put them to work cleaning washrooms and helping in the smoky kitchen, until the vanity loosens. Ghazali says caring about clothes beyond being lawful and clean is just being busy with yourself." },
        { title: "Step down gently", body: "Sometimes a student can't drop a bad habit all at once. Then the guide moves them to a lighter fault first — like washing blood off with urine when water alone won't shift it, and then washing the urine off with clean water. A boy is got to school by the fun of games. Later he is drawn on by fine clothes, then by wanting to be respected, and finally by the next life. Someone who can't give up status at once can be moved to a smaller kind of status first." },
      ],
      distinction: {
        title: "A treatment is medicine, not a new extreme to live in",
        firstLabel: "Pushing against a fault",
        first: "A temporary exercise leans hard the other way, so a stuck habit can start to move.",
        secondLabel: "The health you are aiming for",
        second: "The balanced middle, guided by good judgement — not living forever at the opposite extreme.",
      },
      misreading: "The section describes hard exercises from the world Ghazali lived in. They were done under a guide who knew the student well. They aren't instructions to copy on your own, regardless of your age, strength or situation.",
      observation: "When a fix doesn't work, ask whether the problem was named wrongly, the dose was too big, or the exercise created a new extreme instead of bringing balance.",
      sourceAnchor: "Book 22, section 5, the detailed path for refining character.",
    },
  },
  {
    id: 6,
    shortTitle: "Signs of sickness and health",
    formalTitle: "Signs that a heart is sick, and signs it is getting better",
    overview: "A part of the body is sick when it can't do its job. Ghazali applies this to the heart and asks what its job is. Then he gives a simple test for spotting whether a bad quality still rules you — and for knowing when the treatment has gone far enough.",
    reflection: "Don't just ask whether something feels easy now. Ask what that ease has been trained to love.",
    relatedNodes: ["health", "diagnosis", "habit", "justice"],
    deep: {
      thesis: "The heart is sick when it can't do what it was made for — knowing and loving God above everything — and it is healing when it stops leaning to either extreme.",
      context: "Having described treatment, Ghazali needs a way to check it. How do you know you are sick, when this sickness doesn't hurt? And how do you know you are getting better, when too much medicine is a sickness too?",
      moves: [
        { title: "Judge each part by its job", body: "Every part of the body was made for a job. A hand is sick when it can't grip. An eye is sick when it can't see. The heart is sick when it can't do its own job: knowing, wisdom, loving God, worshipping Him, enjoying remembering Him, and preferring that to every other desire. The Quran says, “I did not create jinn and humans except to worship Me.”" },
        { title: "See what makes humans different", body: "People aren't different from animals because they eat, have children or see. Animals do all that. Humans are different because they can know things as they really are. And behind everything is God, who made it all. So if someone knew everything except God, it would be as if they knew nothing." },
        { title: "Use love as the test", body: "The sign that you know God is that you love Him. The sign that you love Him is that you don't prefer anything over Him. The Quran warns people whose parents, children, spouses, wealth, trade or homes are dearer to them than God and His Messenger. So a heart that holds anything dearer than God is sick — just as a stomach is sick when it wants clay more than bread, or has lost its appetite for bread and water altogether." },
        { title: "Understand why the sickness spreads", body: "By this measure, Ghazali says, nearly all hearts are sick. Three things keep them that way. Most people don't know they are sick. If they do know, the medicine is bitter, because it means going against their desires. And if they can bear that, they can't find a skilled doctor — because the doctors are the scholars, and the scholars have caught the sickness too. A sick doctor rarely treats anyone." },
        { title: "Use the easy-or-hard test", body: "How do you find out which quality rules you? Look at which action is easier and more pleasant for you. If keeping and saving money is easier and more pleasant than giving it to someone who deserves it, stinginess rules you. So give more. But if giving to people who don't deserve it becomes more pleasant than holding on for good reasons, now wastefulness rules you. So go back to holding on." },
        { title: "Know when to stop", body: "Treatment has an end. Someone cured of stinginess can give so much that they become wasteful, which is a sickness too — like curing a chill with so much heat that you get a fever. Keep watching yourself this way until money means nothing special to you. Then it is like water: you hold on to it when someone needs it held, and you give it when someone needs it given. A heart like that is healthy, at least in this one area." },
        { title: "Walk the thin line", body: "The true middle is very hard to find. Ghazali says it is finer than a hair and sharper than a sword. That is why it is linked to the Bridge over Hell on the Day of Judgement: whoever stays on the straight path in this life will cross that straight path in the next. It is also why every Muslim asks God seventeen times a day, in the obligatory prayers, “Guide us to the straight path.”" },
      ],
      distinction: {
        title: "Feeling fine and being healthy aren't the same",
        firstLabel: "What you prefer right now",
        first: "A trained habit can make you like the very thing that keeps you sick, while the cure feels hard at first.",
        secondLabel: "Getting your function back",
        second: "Health shows in the heart doing its job — knowing and choosing well — with your wants slowly coming into line.",
      },
      misreading: "Finding something hard doesn't prove it is good, and finding something easy doesn't prove it is bad. Both have to be read against what the heart is for, the right amount, and the direction you are heading.",
      observation: "For one habit, ask three questions: What feels good about it now? What job does it do for me? What has it made easier through repetition?",
      sourceAnchor: "Book 22, section 6, signs of the heart's diseases and return to health.",
    },
  },
  {
    id: 7,
    shortTitle: "Four mirrors for hidden faults",
    formalTitle: "How a person gets to know their own faults",
    overview: "We are good at hiding our own faults from ourselves. So Ghazali gives four ways to see them: a wise guide, an honest friend, the words of people who dislike you, and noticing in yourself what you dislike in others.",
    reflection: "Treat criticism as evidence to check, not as a verdict to obey or a sting to brush off.",
    relatedNodes: ["diagnosis", "company", "character", "health"],
    deep: {
      thesis: "You need mirrors outside yourself, because the same faults that need fixing also stop you seeing them.",
      context: "The doctor model has a problem: the patient often can't see the illness. Ghazali says that when God wants good for someone, He shows them their own faults. Most people don't see theirs. As the saying goes, a person sees the speck in their brother's eye and not the log in their own. So he offers four routes around that blindness.",
      moves: [
        { title: "Mirror one: a wise guide", body: "The best route is to sit with a guide who can see the faults of the soul and knows its hidden dangers. You let them judge you and follow their advice, like a student with a teacher. They show you both the fault and the way to treat it. But Ghazali admits such people are rare in his time." },
        { title: "Mirror two: an honest friend", body: "The second route is to find a friend who is truthful, wise and religious, and ask them to watch you and tell you whatever they don't like in your behaviour or character. This is what the wisest leaders of the religion used to do. It is more than having honest friends. It is giving a friend a job." },
        { title: "See how Umar did it", body: "Umar used to say, “May God have mercy on someone who gives me my faults as a gift.” He kept asking Salman what faults he had heard about. Salman tried to avoid answering, but Umar insisted. Salman said, “I heard you have two kinds of food at one meal, and two sets of clothes, one for the day and one for the night.” Umar asked if there was anything else. Salman said no. Umar said, “Those two, I've dealt with.”" },
        { title: "Know why friends often fail", body: "Umar also asked Hudhayfa — who knew who the hypocrites were — whether he saw any sign of hypocrisy in him. Ghazali notes that the wiser and more important a person is, the less they admire themselves and the more they suspect themselves. But honest friends are rare too. Some are jealous and exaggerate. Some have their own agenda and see faults that aren't there. And some flatter you and hide your faults." },
        { title: "Mirror three: people who dislike you", body: "The third route is to learn your faults from your enemies. As an Arabic line of poetry says, the eye of dislike shows up the flaws. You may get more from an enemy who names your faults than from a flattering friend who hides them. Of course, we naturally assume an enemy is lying out of envy. But a wise person still checks, because real faults do tend to spread on enemies' tongues." },
        { title: "Mirror four: other people", body: "The fourth route is to mix with people, and whenever you see something bad in someone, ask whether it is in you too. The Prophet said a believer is a mirror to a believer. People's natures are similar in following their desires. So if one person has a fault, you probably have it too — or its root, or something worse. If everyone simply dropped what they dislike in others, Ghazali says, nobody would need a teacher." },
        { title: "Learn like Jesus", body: "Someone asked Jesus who had taught him good manners. He said, “No one taught me. I saw that the ignorance of the ignorant was ugly, and I stayed away from it.” That is the fourth mirror used perfectly: noticing a fault in someone else and turning the lesson on yourself, not on them." },
      ],
      distinction: {
        title: "Feedback is a mirror, not a judge",
        firstLabel: "Taking it as evidence",
        first: "A comment points you to a possible pattern, which you then check against how you actually behave in different situations.",
        secondLabel: "Handing over your judgement",
        second: "Treating every accusation as true, ignoring motive, exaggeration and context.",
      },
      misreading: "This isn't permission to keep a list of everyone else's faults. The fourth mirror only works when what you dislike in someone else sends you to look at yourself.",
      observation: "Remember a piece of criticism that made you defensive straight away. Before deciding if it was right, name one thing that has happened more than once that would count for it or against it.",
      sourceAnchor: "Book 22, section 7, four routes by which a person knows the faults of the self.",
    },
  },
  {
    id: 8,
    shortTitle: "Saying no to desire",
    formalTitle: "Evidence from the Quran and hadith that the cure is going against desire",
    overview: "Ghazali gathers verses, sayings and stories showing that the cure for the heart is going against desire. Read with the earlier sections, this doesn't mean destroying desire. It means refusing to let desire be in charge.",
    reflection: "When a desire speaks loudly, separate two things: the fact that you want it, and the claim that it should get to decide.",
    relatedNodes: ["appetite", "justice", "knowledge", "habit"],
    deep: {
      thesis: "The heart's sicknesses are fed by following desires, so the cure is going against them — and the secret of the training is not getting attached to anything you can't take into the grave.",
      context: "Ghazali says if you have followed his reasoning, you can see for yourself why going against desire heals the heart. But if you can't, you can still accept it on trust, from those who have walked the road. Faith comes first, and understanding grows after it. Both are good.",
      moves: [
        { title: "Hear the Quran and the Prophet", body: "The Quran promises Paradise to whoever “held the soul back from its desires.” The Prophet said the believer is between five hardships, and one of them is “a self that fights him.” When his Companions came back from battle, a saying reports him calling it the lesser struggle, and saying the greater struggle is struggling against yourself." },
        { title: "Hear the early Muslims", body: "Sufyan al-Thawri said, “Nothing I have dealt with was harder than my own self: sometimes it was on my side, sometimes against me.” Al-Hasan said a wild horse doesn't need a strong bridle more than your self does. Yahya ibn Mu'adh said a person has three enemies: the world, the devil and the self. Guard against the world by not wanting too much of it, against the devil by disobeying him, and against the self by giving up desires." },
        { title: "Train with four tools", body: "Yahya ibn Mu'adh named four ways to train yourself: eat only what you need, sleep only what you need, speak only when needed, and put up with harm from people. From less food, cravings die down. From less sleep, your intentions become clearer. From less talk, you stay safe from trouble. And from bearing harm, you reach your goals. Nothing is harder, he said, than staying calm when someone is rude to you." },
        { title: "Kings and slaves", body: "Ghazali passes on a story. Years after Yusuf became a powerful minister in Egypt, the wife of his old master waited by the road to see his procession. She said, “Glory be to God, who makes kings into slaves when they disobey Him, and slaves into kings when they obey Him.” Greed and desire had brought her low. Patience and fear of God had raised him." },
        { title: "Answer the obvious question", body: "Someone might say: “Enjoying lawful things is lawful. How can it keep me away from God?” Ghazali says that is a weak thought. Enjoying lawful things beyond what you need still ties your heart to this world. And the desire that wants the lawful thing is the very same desire that wants the forbidden thing. If you never train it to stop at enough, it will not stop at the line either." },
        { title: "Find the secret of the training", body: "The secret, Ghazali says, is this: don't let yourself enjoy anything that won't be with you in the grave, beyond what you actually need. Food, clothes, home, marriage — take what you need. If you get deeply attached to something, you will want to come back for it after you die. The one thing that does come with you into the grave is remembering God, so let your heart get attached to that." },
        { title: "See four kinds of people", body: "Ghazali describes four kinds of people. One whose heart is filled with remembering God, and who turns to the world only for what they need — reached only after long training. One whose heart is filled with the world, and who mentions God only with the tongue — lost. One busy with both, but religion wins in their heart. And one busy with both, but the world wins. Ghazali says those last two will pass through the Fire but come out of it — the third kind quickly, the fourth only after a long time." },
      ],
      distinction: {
        title: "Desire can be resisted without being called evil in itself",
        firstLabel: "Having a desire",
        first: "People want food, rest, closeness and belongings. That wanting is part of how God made us, as the book has already said.",
        secondLabel: "Desire being in charge",
        second: "The problem starts when desire decides what is good, and your judgement becomes its servant.",
      },
      misreading: "Don't cut this section off from Ghazali's teaching on balance. Going against desire targets desire taking over and going too far — not every need of the body, and not every lawful pleasure.",
      observation: "Catch one moment when a desire turns into an argument. Write down the reason it gives you. Then ask: is my judgement checking this desire, or just defending it?",
      sourceAnchor: "Book 22, section 8, religious witness for treating character by opposing desire.",
    },
  },
  {
    id: 9,
    shortTitle: "How good character is tested",
    formalTitle: "The signs of good character",
    overview: "Someone who has given up the obvious sins may think their character is now fine. Ghazali gives a checklist from the Quran and the Prophet's sayings — and says the real test is how you handle being hurt.",
    reflection: "Judge a quality across different situations. The telling moment is often not your good intention, but how you respond when someone gets in your way.",
    relatedNodes: ["character", "health", "anger", "justice"],
    deep: {
      thesis: "Good character is measured against the descriptions of believers in the Quran and the Prophet's sayings, not against your own impression — and its clearest test is patience when people hurt you.",
      context: "Every person is blind to their own faults, Ghazali says. After a little effort, someone may drop the worst sins and decide they are done. So he needs a measure that doesn't depend on how you feel about yourself. He says good character is faith, and bad character is hypocrisy — and God has described both.",
      moves: [
        { title: "Hold up the Quran's descriptions", body: "The Quran describes believers in several places. They are humble in their prayer and turn away from idle talk. They repent, worship and praise. Their hearts tremble when God is mentioned. And they are “the servants of the Most Merciful, who walk gently on the earth, and when the ignorant speak to them, they say, ‘Peace.’” Ghazali says anyone unsure about their state should compare themselves to these verses." },
        { title: "Read the result honestly", body: "Having all of these qualities is the sign of good character. Having none is the sign of bad character. Having some means you have some. So the instruction is: work on what is missing, and protect what is there. A mixed result is the normal case, not a failure." },
        { title: "Hear the Prophet's checklist", body: "The Prophet described the believer many ways. A believer wants for their brother what they want for themselves. Whoever believes in God and the Last Day should honour their guest, honour their neighbour, and say something good or stay silent. A believer is pleased by their good deeds and upset by their bad ones. And it isn't allowed to frighten a Muslim, or even give them a look that hurts." },
        { title: "See a longer list", body: "One early Muslim gathered the signs into a list: very modest, rarely hurtful, truthful, quiet, doing much and slipping little, kind to family, calm, patient, grateful, gentle, caring. Not someone who curses, insults, spreads gossip or backbites. Not hasty, not holding grudges, not stingy, not envious. Cheerful. Loving and disliking for God's sake." },
        { title: "Find the hardest test", body: "The best test of good character, Ghazali says, is patience when people hurt you and are rude to you. And whoever complains about other people's bad character is showing their own, because good character means bearing harm. Once a Bedouin grabbed the Prophet's cloak so hard that its rough edge left a mark on his neck, and demanded, “Give me some of God's wealth that you have!” The Prophet turned, laughed, and ordered that he be given something." },
        { title: "Meet Ibrahim ibn Adham", body: "A soldier in the countryside asked Ibrahim ibn Adham, “Are you a slave?” He said yes. The soldier asked, “Where is the town?” Ibrahim pointed to the graveyard. Angry, the soldier hit him on the head with a whip, drawing blood. When he found out who Ibrahim was, he begged forgiveness. Ibrahim explained: “I'm a slave of God. And when he hit me, I asked God to give him Paradise. I knew I'd be rewarded for what he did to me, and I didn't want my share from him to be good while his share from me was bad.”" },
        { title: "Meet Abu Uthman", body: "A man invited Abu Uthman al-Hiri to a meal to test him. When they reached the door, he said, “Sorry, I can't have you.” Abu Uthman left. The man called him back, then turned him away again — over and over. Abu Uthman never changed. Finally the man fell at his feet and said, “I was only testing you. What good character you have!” Abu Uthman said, “What you saw is a dog's character. A dog comes when called and goes when told.”" },
      ],
      distinction: {
        title: "A pleasant surface and a balanced heart can come apart",
        firstLabel: "Looking good",
        first: "Charm, a calm voice, or generosity that shows up when it costs little — and disappears when pride or wants are threatened.",
        secondLabel: "Tested character",
        second: "The powers stay in order under real pressure, and the good qualities support each other instead of appearing one at a time.",
      },
      misreading: "Testing character doesn't mean setting traps for people, or doubting every good deed. It means not making a final judgement from the easiest example.",
      observation: "Compare the same quality in two places: one where you feel respected, and one where you feel ignored. What changes in how fast you react, your tone, and the excuses you make?",
      sourceAnchor: "Book 22, section 9, the signs by which good character is recognized.",
    },
  },
  {
    id: 10,
    shortTitle: "Character starts early",
    formalTitle: "Raising children well from the start",
    overview: "Ghazali describes a child as a trust given to the parents, open to whatever is carved into them. Early habits, teachers, friends, praise and surroundings shape who they become.",
    reflection: "Whether you think about a child or about yourself, ask what your surroundings praise, practise and make easy every day.",
    relatedNodes: ["habit", "company", "character", "cultivation"],
    deep: {
      thesis: "A child's heart is like a clean, uncarved jewel: what is carved into it early — by habit, example and company — is what it grows up with.",
      context: "Ghazali applies the book's idea of habit to childhood. Everything he has said about forming character is most obviously true of children. So this section is the same argument, seen from the easier end.",
      moves: [
        { title: "A trust and a jewel", body: "A child, Ghazali says, is a trust in the care of the parents. The child's pure heart is a precious jewel, plain and uncarved, ready to take whatever is carved into it and to lean whichever way it is leaned. If it is taught good and used to it, the child grows up on it and is happy in both lives — and the parents and every teacher share the reward. If it is neglected like an animal, the harm is on whoever was responsible." },
        { title: "Protect from the greater fire", body: "The Quran says, “Believers, protect yourselves and your families from a Fire.” Ghazali reasons that parents already protect their child from fire in this world. Protecting them from the Fire of the next world matters even more. And that protection means teaching good character and keeping them away from bad company. The root of raising children well, he says, is guarding them from bad friends." },
        { title: "Notice the first sign of reason", body: "The first good sign in a child is shyness — a sense of shame. When a child starts to feel embarrassed and holds back from some things, it means the light of reason is dawning. They are starting to see that some things are ugly. Ghazali calls this a gift from God and good news about the child's future. A child with this sense of shame shouldn't be ignored. Use it to help them learn." },
        { title: "Watch what goes in from the start", body: "Ghazali says the watching starts at birth. Only a religious woman who eats lawful food should nurse the child. Milk that comes from unlawful earnings has no blessing in it, and the child's nature grows from it. The first strong pull in a child is greed for food. So teach them table manners. Take food with the right hand, say “Bismillah”, and eat what is in front of you. Don't grab before others, or stare at the food or at people eating. Don't rush, chew well, and keep your hands and clothes clean." },
        { title: "Plain food, plain clothes", body: "Let the child sometimes eat plain bread with nothing on it, so they don't think every meal needs extras. Make overeating look ugly to them: compare it to how animals eat, criticise greedy children in front of them, and praise children who have good manners and eat little. Teach them to love giving their food to others and not to fuss about what they eat. Get a boy to like plain white clothes rather than bright colours and silk. Tell him often that fine silks are for women, and that men look down on them. Keep him away from children who have been spoiled with luxury and fancy clothes." },
        { title: "What a neglected child becomes", body: "A child who is neglected when they are young, Ghazali says, usually grows up badly behaved — lying, envious, stealing, spreading gossip, pestering, talking nonsense, laughing at everything, scheming and shameless. The only protection is good upbringing." },
        { title: "Teach stories of good people", body: "At school, the child should learn the Quran, the Prophet's sayings, and stories of good people, so that love of the righteous is planted in them. Ghazali warns against poetry that glamorises romantic obsession, and against people who say that sort of thing is sophisticated. It plants seeds of trouble in young hearts." },
        { title: "Praise in public, correct in private", body: "When a child does something good, they should be honoured for it, rewarded with something that makes them happy, and praised in front of people. If they slip once, it is better to overlook it and not embarrass them, especially if they are trying to hide it. Exposing it may just make them bolder, until they stop caring who knows. If it happens again, have a word in private and make it serious: “Don't ever do this again, or people will find out and you'll be embarrassed.”" },
        { title: "Don't nag", body: "Don't scold a child all the time, Ghazali says. If you do, blame becomes easy to hear and bad behaviour becomes easy to do, and your words stop landing in their heart. A father should keep his words weighty and scold only now and then. The mother can warn the child with the father, to keep them from bad behaviour." },
        { title: "Toughen, don't pamper", body: "Don't let the child sleep in the day, because it makes them lazy, but don't stop them sleeping at night. Don't give them a soft bed, so their body grows firm and doesn't get used to comfort. Get them used to roughness in bedding, clothes and food. Stop them doing anything in secret, because they only hide what they already think is wrong. Make them walk, move about and exercise for part of the day, so laziness doesn't take over." },
        { title: "Giving is honour, taking is low", body: "Don't let a child boast to other children about what their parents own, or about their food, clothes, or school things. Teach them to be humble, kind and gentle in speech with everyone. If they come from a well-off family, teach them that honour is in giving, not taking. If they come from a poor family, teach them that wanting other people's things is humiliating — like a dog wagging its tail for a scrap. Above all, make them dislike gold, silver and wanting money, and warn them more than you would about snakes and scorpions. That love, Ghazali says, is worse than poison — for adults too." },
        { title: "How to sit and speak", body: "Teach the child not to spit or blow their nose in company, not to yawn in front of others or turn their back on people, and not to sit cross-legged or lean their head on their hand, which shows laziness. Don't let them talk too much; tell them it is a sign of rudeness. Don't let them swear oaths at all, true or false, so it doesn't become a habit. Teach them to speak mainly when spoken to, to listen well when someone older talks, to stand up for those above them and make room for them. Keep them away from bad language, cursing and insults, and from anyone who talks that way — because the root of raising children is guarding them from bad friends." },
        { title: "When the teacher punishes", body: "If the teacher hits the child, Ghazali says, the child shouldn't scream and make a fuss, or run to someone to plead for them. They should bear it patiently. Tell them this is what brave men do, and that screaming is what servants and women do." },
        { title: "Let them play", body: "After school, the child should be allowed to play in a good way, to rest from the effort of learning. Ghazali is firm here. Stopping a child from playing and pushing them to study all the time kills their heart and dulls their intelligence. It makes life so miserable that they look for any way to escape learning altogether. The play should be good play that rests them without wearing them out." },
        { title: "Respect, prayer and the reasons behind it", body: "Teach the child to obey their parents, their teacher and anyone older, to look at them with respect, and not to play in front of them. Once they are old enough to understand, don't let them skip purification and prayer. Have them fast some days of Ramadan. Keep them from wearing silk and gold, teach them the religious rules they need, and make them afraid of stealing, unlawful food, betrayal, lying and bad language. As they near adulthood, explain the reasons. Food is medicine, to give you strength to obey God. This world doesn't last, and death can come at any time. The wise person takes supplies from this world for the next." },
      ],
      distinction: {
        title: "Two ways a childhood can go",
        firstLabel: "Raised well",
        first: "Habits of good manners, plain living and respect are laid down early, so the reasons given near adulthood stick like carving in stone.",
        secondLabel: "Left to itself",
        second: "Play, bad language, greed for food and clothes and showing off become normal, so the truth bounces off like dry dust thrown at a wall.",
      },
      misreading: "Don't read the strictness as coldness. In the same breath Ghazali tells parents to reward and praise, to overlook a first slip, to correct in private, to scold rarely, and to let children play — because a child who is never allowed to play, he says, has their heart killed.",
      observation: "Look at one surrounding you spend a lot of time in, not one lesson. What does it reward? What does it make normal? What kind of response does it make easy?",
      sourceAnchor: "Book 22, section 10, early education and the formation of children's character.",
    },
  },
  {
    id: 11,
    shortTitle: "How the path begins",
    formalTitle: "The conditions for setting out, and the gradual path of training",
    overview: "The last section turns to someone who wants to set out on the path. Their drive has to rest on real conviction. Four barriers must be cleared, a guide must be found, and training moves forward in stages — with dangers along the way.",
    reflection: "A dramatic start can feel powerful but have no structure. Ask what will still guide your effort once the excitement fades.",
    relatedNodes: ["cultivation", "company", "habit", "knowledge"],
    deep: {
      thesis: "Real drive comes from seeing clearly what the next life is worth; then a beginner clears four barriers, holds on to a guide, protects the effort, and crosses the obstacles one at a time.",
      context: "Ghazali gathers everything in the book into a plan for a beginner. He isn't offering a burst of inspiration. He is setting out the conditions that let a good intention survive real habits and daily life — and warning about what can go wrong.",
      moves: [
        { title: "The bead and the jewel", body: "Someone who has seen the next life with real certainty will want it without being pushed. If you hold a glass bead and then see a precious jewel, you lose interest in the bead and want to trade it. But Ghazali says faith here doesn't mean just saying the words of faith. That is like someone who agrees the jewel is better than the bead, but only knows the word “jewel”. Used to the bead, they may well keep it." },
        { title: "Trace the chain back", body: "Why don't people reach the goal? Because they don't travel. They don't travel because they don't really want to. They don't want to because their faith is weak. And their faith is weak because there are too few guides reminding them of what matters. Worse, Ghazali says, when someone does wake up and asks the scholars for the way, they often find the scholars following their own desires." },
        { title: "Clear four barriers", body: "A beginner first has to clear four barriers between themselves and God: money, status, blind loyalty, and sin. Money: keep only what you need, because as long as one coin pulls at your heart, you are tied. Status: stay away from the spotlight, choose to be unknown, and even do things that make people lose interest in you. Blind loyalty: stop being a fan of your own group's views for their own sake, and seek understanding through effort rather than arguing." },
        { title: "Repent before you seek secrets", body: "The fourth barrier is sin, and only repentance clears it: regret, a firm decision not to return, and making things right with anyone you wronged. Someone who wants the deep secrets of religion without first fixing their obvious sins, Ghazali says, is like someone who wants the deep meanings of the Quran before learning Arabic. The basics come first, and they stay necessary to the end." },
        { title: "Find a guide", body: "Clearing the barriers is like doing wudu before prayer. Now you need someone to lead the prayer: a guide. The road of religion is hard to see, and the devil's roads are many and obvious. Someone who crosses a deadly desert without a protector risks their life. And a person who tries to grow on their own is like a tree that sprouts by itself: it soon dries up, or grows leaves but no fruit. So the student should hold on to the guide the way a blind man on a riverbank holds his leader's hand — handing the whole matter over and not going against him. Ghazali says the student gains more from the guide's mistake, if he makes one, than from being right on their own." },
        { title: "Build the fort", body: "The beginner then needs a fort to protect them: time alone, silence, hunger, and staying up at night. Ghazali pictures the heart as a pool that dirty streams keep flowing into from the senses. The training is emptying the pool so clean water can rise from its spring. But you can't empty a pool while the streams are still pouring in. So the senses have to be guarded, apart from what is needed." },
        { title: "Why each wall helps", body: "Hunger, Ghazali says, thins the blood of the heart and softens it, and a soft heart is the key to seeing; Jesus told his disciples, “Keep your stomachs hungry, and perhaps your hearts will see your Lord.” Staying up at night polishes the heart like a mirror, and too much sleep hardens it. Silence stops talk from filling the heart. And being alone shuts out distractions. If there is no dark room to sit in, he says, wrap yourself in a cloak — the Prophet was first called while wrapped in his cloak, “You, wrapped in your cloak.”" },
        { title: "Remember until only the meaning is left", body: "Then come the obstacles, which are the heart's attachments to the world — easiest first. Once they are cleared, the guide gives the student one phrase of remembering God, such as “Allah, Allah.” At first the tongue says it. Then it runs on the tongue without effort. Then only its form is left in the heart. Finally even the words fade, and only the meaning stays, filling the heart. Doubts and strange thoughts will come; they should be taken to the guide." },
      ],
      distinction: {
        title: "A burst of energy can start the effort, but structure carries it",
        firstLabel: "A sudden decision",
        first: "A strong moment shows you what matters and gets you moving, but it can fade before habits, duties and obstacles have changed.",
        secondLabel: "A drive with a plan",
        second: "A clear aim turned into duties, guidance, good company and gradual steps that keep going when feelings change.",
      },
      misreading: "Don't picture a beginner working this out alone. Every step Ghazali describes runs through a guide, who clears the barriers first, sets the pace, answers the doubts, and sends those who aren't suited back to ordinary good deeds.",
      observation: "Name the point where a good intention of yours usually loses steam: an unclear aim, a barrier you haven't cleared, no structure, the wrong pace, or no honest guidance.",
      sourceAnchor: "Book 22, section 11, the conditions of aspiration and gradual progress in discipline.",
    },
  },
];

export const book22ConceptNodes: ConceptNode[] = [
  {
    id: "character",
    label: "Character",
    kicker: "A settled shape inside",
    description:
      "A settled trait that actions come from easily. Deeper than a mood, a one-off act, or a label people give you.",
    position: "node-character",
  },
  {
    id: "knowledge",
    label: "Knowledge",
    kicker: "The power to tell",
    description:
      "The ability to see what the right action is and where things lead. When healthy it is wisdom, and it should guide desire, not make excuses for it.",
    position: "node-knowledge",
  },
  {
    id: "anger",
    label: "Anger",
    kicker: "The power to protect",
    description:
      "The power that pushes away harm. Trained well, it becomes courage. Too much or too little each cause trouble.",
    position: "node-anger",
  },
  {
    id: "appetite",
    label: "Appetite",
    kicker: "The power to want",
    description:
      "The power that seeks food and other good things. Trained well, it becomes self-control — not wiping it out.",
    position: "node-appetite",
  },
  {
    id: "justice",
    label: "Justice",
    kicker: "The right balance",
    description:
      "What keeps knowledge, anger and desire in the right relationship, without too much or too little.",
    position: "node-justice",
  },
  {
    id: "habit",
    label: "Habit",
    kicker: "Shaped by repeating",
    description:
      "Doing something again and again leaves a mark inside. Over time, what took effort can come easily.",
    position: "node-habit",
  },
  {
    id: "diagnosis",
    label: "Diagnosis",
    kicker: "Find the real fault",
    description:
      "Treatment starts by finding the main problem, which way it is off, and the person's situation — not by grabbing a one-size-fits-all cure.",
    position: "node-diagnosis",
  },
  {
    id: "health",
    label: "Health",
    kicker: "Working properly again",
    description:
      "You know a heart is healthy when it does its job and doing right gets easier — not just when it feels comfortable.",
    position: "node-health",
  },
  {
    id: "company",
    label: "Company",
    kicker: "Learning by living together",
    description:
      "Guides, friends and companions show you your faults and pass on habits through example, correction and simply being around.",
    position: "node-company",
  },
  {
    id: "cultivation",
    label: "Cultivation",
    kicker: "Growing in the right direction, step by step",
    description:
      "A clear aim, backed by surroundings, duties, guidance and practices that fit where the learner is now.",
    position: "node-cultivation",
  },
];

export const book22Journeys: Journey[] = [
  {
    id: "character",
    number: "01",
    question: "What is good character?",
    title: "See how character is built inside",
    description:
      "Go from why character matters to Ghazali's exact definition, then see how four powers become wisdom, courage, self-control and justice.",
    payoff: "You leave with a definition that tells a good deed apart from a settled good quality.",
    image: assetUrl("assets/system/book22-character-balance.jpg"),
    imageAlt: "A bright four-part brass medallion balancing a blue lens, coral flame, saffron bowl, and central regulating wheel.",
    minutes: 7,
    color: "#2c73a8",
    nodes: [
      {
        id: "why-it-matters",
        label: "See why it matters",
        micro: "Character isn't decoration",
        summary:
          "Ghazali starts by putting good character at the centre of practising religion, and treating bad character as an illness inside.",
        guardrail: "The praise is about who you are inside, not about charm or personality type.",
        chapterId: 1,
        glyph: "witness",
      },
      {
        id: "beneath-the-act",
        label: "Look under the action",
        micro: "Find where it comes from",
        summary:
          "Character is a settled trait that actions come from easily — not one performance or a passing feeling.",
        guardrail: "A hard good deed can be good practice without proving your character is settled yet.",
        chapterId: 2,
        glyph: "name",
      },
      {
        id: "four-capacities",
        label: "Find the four powers",
        micro: "Knowledge, anger, desire, justice",
        summary:
          "Your inner shape is judged by healthy knowledge, the protecting power of anger, the wanting power of desire, and the justice that keeps them in order.",
        guardrail: "Anger and desire are powers to train, not faults to erase.",
        chapterId: 2,
        glyph: "forces",
      },
      {
        id: "hold-the-mean",
        label: "Keep the right middle",
        micro: "Not too much, not too little",
        summary:
          "Goodness shows when each power acts in the right amount under healthy knowledge. Faults can lie on either side of that balance.",
        guardrail: "The middle means the right amount, not an average or always being mild.",
        chapterId: 2,
        glyph: "balance",
      },
      {
        id: "test-the-character",
        label: "Test the pattern",
        micro: "Pressure shows the truth",
        summary:
          "Good character shows as a pattern over time, especially when someone hurts you, disagrees with you, or you lose something.",
        guardrail: "One easy success can't prove your whole character.",
        chapterId: 9,
        glyph: "diagnose",
      },
    ],
  },
  {
    id: "formation",
    number: "02",
    question: "Can character really change?",
    title: "Follow practice into character",
    description:
      "Follow how repeating actions, having a purpose and choosing company turn what felt hard into a steady part of you.",
    payoff: "You see how change really works — neither “people never change” nor “you can change overnight”.",
    image: assetUrl("assets/system/book22-practice-disposition.jpg"),
    imageAlt: "Six ivory practice panels show a geometric rosette and flowering bud becoming progressively more fluent and complete.",
    minutes: 8,
    color: "#24877d",
    nodes: [
      {
        id: "change-is-possible",
        label: "Reject “you can't change”",
        micro: "A trait can be retrained",
        summary:
          "Ghazali argues that advice, teaching and training would all be pointless if character couldn't change.",
        guardrail: "Possible doesn't mean quick, easy, or the same for everyone.",
        chapterId: 3,
        glyph: "practice",
      },
      {
        id: "preserve-the-powers",
        label: "Keep the powers",
        micro: "Change who's in charge and how much",
        summary:
          "Training redirects anger and desire while keeping the jobs they are needed for: protecting you, feeding you and living your life.",
        guardrail: "Training doesn't mean destroying every urge.",
        chapterId: 3,
        glyph: "balance",
      },
      {
        id: "practice-the-act",
        label: "Do the action",
        micro: "Start before it feels natural",
        summary:
          "The learner keeps doing what the wanted quality would do, giving the inner self a new direction to practise.",
        guardrail: "Waiting until you feel ready can stop the practice that gets you ready.",
        chapterId: 4,
        glyph: "act",
      },
      {
        id: "travel-inward",
        label: "Let it sink in",
        micro: "Repeating becomes readiness",
        summary:
          "Like learning a craft, repeating the right action can turn clumsy effort into a real skill that comes more easily.",
        guardrail: "Repeating things mechanically still needs the right direction and purpose.",
        chapterId: 4,
        glyph: "practice",
      },
      {
        id: "choose-company",
        label: "Choose friends who shape you well",
        micro: "Habits pass between people who are close",
        summary:
          "Spending time with people of good character teaches you what to notice, admire and do — often before anyone states a rule.",
        guardrail: "Friends shape you, but you are still responsible.",
        chapterId: 4,
        glyph: "company",
      },
      {
        id: "look-for-ease",
        label: "Look for settled ease",
        micro: "The quality feels at home",
        summary:
          "The work pays off when the right action no longer feels like a weight from outside and your inner self starts to agree with it.",
        guardrail: "Ease only proves something when the action and its amount are right.",
        chapterId: 4,
        glyph: "steady",
      },
    ],
  },
  {
    id: "treatment",
    number: "03",
    question: "How is a fault treated?",
    title: "Think like a careful doctor",
    description:
      "Find what isn't working, see whether it's too much or too little, use the right opposite, and keep adjusting until balance returns.",
    payoff: "You get a way of treating faults that is personal, measured and can be checked.",
    image: assetUrl("assets/system/book22-diagnosis-treatment.jpg"),
    imageAlt: "A luminous brass balance compares a tangled coral knot with measured turquoise drops beside apothecary vessels and fruit.",
    minutes: 9,
    color: "#c46243",
    nodes: [
      {
        id: "name-failed-function",
        label: "Name what isn't working",
        micro: "Illness means something only compared with health",
        summary:
          "A condition is called sick because of the job it stops, so looking inside starts with asking what the heart can no longer do properly.",
        guardrail: "Feeling uncomfortable doesn't by itself tell you the illness.",
        chapterId: 6,
        glyph: "diagnose",
      },
      {
        id: "locate-direction",
        label: "Find which way it's off",
        micro: "Too much, too little, or the wrong one in charge",
        summary:
          "Treatment only gets precise once you know the main tendency and which way it has left the balance.",
        guardrail: "A general label like “anger” doesn't yet show the exact problem.",
        chapterId: 5,
        glyph: "mirror",
      },
      {
        id: "apply-contrary",
        label: "Use the opposite",
        micro: "Push against the stuck habit",
        summary:
          "A fault is treated by repeatedly doing the right opposite, which loosens the habit's hold.",
        guardrail: "The opposite practice is a correction, not a new extreme to live in forever.",
        chapterId: 5,
        glyph: "balance",
      },
      {
        id: "fit-the-dose",
        label: "Get the dose right",
        micro: "One routine can't fit everyone",
        summary:
          "The practice has to fit the person's condition, history, strength and main fault, just as medicine is chosen for a particular patient.",
        guardrail: "What helps one person can weigh down or bend another.",
        chapterId: 5,
        glyph: "diagnose",
      },
      {
        id: "advance-gradually",
        label: "Go step by step",
        micro: "Aim for the next step you can reach",
        summary:
          "When you can't manage the full opposite yet, moving gradually can use a nearer, less harmful step as a bridge toward balance.",
        guardrail: "A bridge is useful because it leads on, not because you stay on it.",
        chapterId: 5,
        glyph: "cultivate",
      },
      {
        id: "verify-health",
        label: "Check you've recovered",
        micro: "Working properly, right amount, getting easier",
        summary:
          "Recovery shows when the heart works again, the balance is right, and doing right gets easier — without creating the opposite fault.",
        guardrail: "Stop pushing the opposite way once the balance is back.",
        chapterId: 6,
        glyph: "health",
      },
    ],
  },
  {
    id: "self-knowledge",
    number: "04",
    question: "How do I see my hidden faults?",
    title: "Use four mirrors, then test",
    description:
      "Break through fooling yourself with a guide, an honest friend, hard criticism, and the faults you notice in others. Then watch what pressure shows.",
    payoff: "You turn other people's comments into evidence without handing over your own judgment.",
    image: assetUrl("assets/system/book22-four-mirrors.jpg"),
    imageAlt: "A central brass vessel is surrounded by four distinct mirrors and lenses that reveal it from different directions.",
    minutes: 8,
    color: "#7a5a9a",
    nodes: [
      {
        id: "seek-guidance",
        label: "Find a wise guide",
        micro: "Borrow trained eyes",
        summary:
          "A guide who knows the illnesses of character can spot patterns and direct treatment the learner can't yet see alone.",
        guardrail: "Following a guide takes good judgment, not giving in to anyone who sounds confident.",
        chapterId: 7,
        glyph: "learn",
      },
      {
        id: "commission-friendship",
        label: "Ask an honest friend",
        micro: "Ask for more than comfort",
        summary:
          "Invite a trustworthy friend who notices things to watch how you act and tell you your faults honestly.",
        guardrail: "A friend becomes a mirror when telling the truth is safer than flattering.",
        chapterId: 7,
        glyph: "company",
      },
      {
        id: "inspect-criticism",
        label: "Look into unkind criticism",
        micro: "Take the evidence, not the insult",
        summary:
          "An enemy may want to hurt you or exaggerate, yet their dislike can bring up things flattering friends never mention.",
        guardrail: "Look into criticism. Don't automatically believe it or brush it off.",
        chapterId: 7,
        glyph: "diagnose",
      },
      {
        id: "mirror-in-others",
        label: "Use others as a mirror",
        micro: "Turn dislike back on yourself",
        summary:
          "A fault you notice in someone else is an invitation to look for the same seed in yourself.",
        guardrail: "The method points the checking at you, not permission to blame others.",
        chapterId: 7,
        glyph: "mirror",
      },
      {
        id: "oppose-ruling-desire",
        label: "Resist desire when it takes charge",
        micro: "Being there isn't being in charge",
        summary:
          "The Quran and hadith Ghazali gathers back up resisting desire when it takes over, so knowledge and justice can steer what you do.",
        guardrail: "Resisting means stopping desire from ruling and going too far, not refusing every allowed need or wish.",
        chapterId: 8,
        glyph: "guard",
      },
      {
        id: "test-under-friction",
        label: "Test under pressure",
        micro: "Easy times can hide the truth",
        summary:
          "A pattern of patience, honesty, humility and self-control is tested when someone hurts you, disagrees with you, or you lose something.",
        guardrail: "Ghazali reads the signs in real life — when someone wrongs you — not in quiet, easy moments.",
        chapterId: 9,
        glyph: "steady",
      },
    ],
  },
  {
    id: "beginning",
    number: "05",
    question: "How does training begin?",
    title: "Grow the right conditions",
    description:
      "See how early surroundings, friends, a clear aim, duties and gradual training shape what a learner can one day carry steadily.",
    payoff: "You leave with a picture of how good beginnings are built: by surroundings, guidance and small steps.",
    image: assetUrl("assets/system/book22-formation-path.jpg"),
    imageAlt: "A pomegranate sapling grows through five cultivated terraces into a flourishing fruit tree beneath a white and gold canopy.",
    minutes: 7,
    color: "#ba7b24",
    nodes: [
      {
        id: "begin-before-hardening",
        label: "Start before it hardens",
        micro: "Early habits are still soft",
        summary:
          "Ghazali presents childhood as a time when habits and likes are especially easy to shape.",
        guardrail: "Habits laid down before a child can explain them are the ones that later explanations stick to.",
        chapterId: 10,
        glyph: "cultivate",
      },
      {
        id: "shape-environment",
        label: "Shape the surroundings",
        micro: "Daily life teaches before explanations do",
        summary:
          "Examples, routines, rewards, surroundings and repeated practice form character alongside what is taught out loud.",
        guardrail: "A lesson can't easily beat the surroundings that are there every day.",
        chapterId: 10,
        glyph: "practice",
      },
      {
        id: "choose-companions",
        label: "Choose friends",
        micro: "What's admired becomes normal",
        summary:
          "Friends quietly teach what to pay attention to, copy, laugh at, hold back from and respect.",
        guardrail: "Influence is real, but the learner is still responsible.",
        chapterId: 10,
        glyph: "company",
      },
      {
        id: "clarify-aim",
        label: "Get clear on the aim",
        micro: "Wanting it needs a strong reason",
        summary:
          "A lasting start needs an aim rooted deeply enough to steer attention, duties and action when feelings change.",
        guardrail: "A dramatic wish isn't yet a planned path.",
        chapterId: 11,
        glyph: "resolve",
      },
      {
        id: "build-structure",
        label: "Build a step-by-step plan",
        micro: "Duties, guidance, stages you can reach",
        summary:
          "Ghazali joins the decision to set out with required duties, a guide, good company, clearing away barriers, and practices that fit where you are now.",
        guardrail: "The guide sets the pace, moving the student on one stage at a time.",
        chapterId: 11,
        glyph: "cultivate",
      },
    ],
  },
];

export const book22Sources: SourceLink[] = [
  { label: "Primary Arabic text", note: "The complete public Arabic of Book 22 was read and used for the four powers and their balance, the argument that character can change through training, treatment by the right opposite and its dose, and the four ways to know your own faults.", url: "https://shamela.ws/book/9472/794" },
  { label: "What good and bad character really are", note: "The passage defining character as a settled trait, naming the four powers, and placing faults on both sides of each.", url: "https://shamela.ws/book/9472/798" },
  { label: "Signs of sickness and health", note: "The passage judging the heart by whether it does its proper job, warning that feeling fine now is no test, and saying treatment must stop once health returns.", url: "https://shamela.ws/book/9472/808" },
  { label: "That the cure is going against desire", note: "The passage gathering the evidence that the road runs through struggling against selfish desire, and placing the fault where desire takes charge, not in desire itself.", url: "https://shamela.ws/book/9472/811" },
  { label: "The signs of good character", note: "The passage listing the signs as a group and saying they must be read when you are provoked, not when life is easy.", url: "https://shamela.ws/book/9472/815" },
  { label: "Setting out, and the gradual path", note: "The passage on the conditions for setting out, the barriers that eat up the attention training needs, and moving forward in stages.", url: "https://shamela.ws/book/9472/820" },
  { label: "Published English edition", note: "T. J. Winter's translation of Books 22 and 23. Used to check titles and the edition; this app's English is its own.", url: "https://its.org.uk/catalogue/al-ghazali-on-disciplining-the-soul-and-on-breaking-the-two-desires-paperback/" },
  { label: "Forty-book structure", note: "Ghazali.org's listing confirms the book's title and its place among the forty.", url: "https://www.ghazali.org/listing-the-forty-books/" },
];

const chain = (title: string, caption: string, items: Array<[string, string, "support" | "balance" | "warning"]>): VisualModel => ({
  kind: "chain", title, caption, items: items.map(([label, body, role]) => ({ label, body, role })),
});
const pair = (title: string, caption: string, items: Array<[string, string, "support" | "balance" | "warning"]>): VisualModel => ({
  kind: "pair", title, caption, items: items.map(([label, body, role]) => ({ label, body, role })),
});
const spectrum = (title: string, caption: string, items: Array<[string, string, "support" | "balance" | "warning"]>): VisualModel => ({
  kind: "spectrum", title, caption, items: items.map(([label, body, role]) => ({ label, body, role })),
});

type Extra = { model: VisualModel; closer: Array<{ title: string; body: string }>; audit: string[] };

const book22Extras: Record<number, Extra> = {
  1: {
    model: pair("Two ways to read a good moment", "This section exists so you can ask the second question.", [["A settled trait", "The good behaviour comes easily and again and again, because it comes from who you have become.", "support"], ["A one-off good moment", "It happened once, when things were easy, and doesn't prove anything yet.", "warning"]]),
    closer: [
      { title: "The friend who kept his character", body: "Ibn al-Mubarak once travelled with a bad-tempered man. He put up with him the whole way and kept the peace. When they parted, Ibn al-Mubarak cried. Asked why, he said, “I felt sorry for him. I left him — but his character didn't leave him.” Bad character is the one companion you can't walk away from." },
      { title: "The map of the whole book", body: "Ghazali lays out his plan at the start: why character matters, what it is, whether it can change, how it is gained, how it is treated, the signs of sickness, how to find your faults, why the cure is resisting desire, the signs of good character, raising children, and how a beginner starts. The eleven reading sections follow that order." },
    ],
    audit: ["Which of my good qualities has only been tested when it was easy?", "What comes out of me when patience gets expensive?", "Whom do I find hard to forgive, give to, or stay in touch with?", "Would the people closest to me call me easy or hard to be around?"],
  },
  2: {
    model: chain("The four pillars", "A beautiful character needs all four, just as a beautiful face needs every feature.", [["Knowledge", "Telling true from false in belief, and right from wrong in action. When it is healthy, it is wisdom.", "support"], ["Anger", "Anger that holds back or pushes forward only as wisdom says. When healthy, it is courage.", "balance"], ["Appetite", "Desire trained to follow the mind and God's law. When healthy, it is self-control.", "balance"], ["Justice", "The power that keeps anger and desire following wisdom. Its opposite isn't too much or too little, but injustice.", "support"]]),
    closer: [
      { title: "The fool and the madman", body: "Ghazali makes a sharp distinction. A foolish person wants the right thing but picks the wrong way to get there. A mad person wants the wrong thing in the first place. Weak understanding shows up in both — but the first can be taught the road, while the second has the wrong destination." },
      { title: "Firm in one place, gentle in another", body: "The Quran describes the Companions as “firm against the disbelievers, merciful among themselves.” Ghazali reads this as a lesson in balance. Firmness has its place and mercy has its place. Being perfect doesn't mean always being tough, or always being soft. It means each at the right time." },
    ],
    audit: ["Which of the four powers is weakest in me?", "Am I judging myself by single acts, or by what produces them?", "Where do I go too far, and where do I fall short?", "Am I firm and gentle in the right places?"],
  },
  3: {
    model: chain("Four levels of difficulty", "Ghazali ranks them by how much has to be undone before anything can be built.", [["Ignorant", "Can't tell good from bad yet and isn't stuck in desires. Needs only a teacher and a reason to try.", "support"], ["Knows, but is stuck", "Knows the habit is ugly but is used to it. Has to pull up one habit and plant another.", "balance"], ["Thinks bad is good", "Believes the ugly traits are right and even required, and was raised on them.", "warning"], ["Proud of doing harm", "Thinks doing lots of harm is impressive and boasts about it. The hardest level of all.", "warning"]]),
    closer: [
      { title: "Why the teacher still says “no anger at all”", body: "Ghazali adds a careful point. A spiritual guide should tell a beginner that anger and holding on to money are bad, full stop, without allowing any. Why? If the guide allows even a little, the student will use that as an excuse to keep all their anger, telling themselves it is the allowed amount. Aiming hard at the root is what brings the student back to the middle." },
      { title: "Lukewarm water", body: "Ghazali explains why the middle is the goal. A heart at its best is not caught up in money at all — neither greedy to keep it nor eager to spend it. In this life that is hard, so we look for the next best thing: the middle. Lukewarm water is neither hot nor cold, so it is as if it is free of both. Generosity sits the same way between wasting and stinginess." },
    ],
    audit: ["Which of the four levels am I at for my worst habit?", "What do I call my nature that is really just my habit?", "Have I convinced myself a bad habit is actually good?", "Am I trying to remove a drive instead of training it?"],
  },
  4: {
    model: chain("How a trait is gained", "The path runs through effort and ends in ease — which is how you know it worked.", [["Choose the trait", "Name the quality you want, not just one good deed.", "support"], ["Push yourself to act", "Do what a generous person does, on purpose, even when part of you doesn't want to.", "balance"], ["Persist", "Keep going until the struggle is no longer the main thing you feel.", "balance"], ["It starts to feel good", "A generous person is someone who enjoys giving, not someone who gives while hating it.", "support"]]),
    closer: [
      { title: "Three ways, and what happens when they combine", body: "Good qualities come by nature, by habit, and by spending time with good people — because, Ghazali says, “one nature steals from another, the bad and the good alike.” Someone who has all three is at the top. Someone born with bad qualities, who falls in with bad friends and gets used to wrongdoing, is furthest from God. Most people sit somewhere in between." },
      { title: "A white dot and a black dot", body: "A saying Ghazali quotes: faith starts in the heart as a white dot. As faith grows, the whiteness spreads, until the whole heart is white. Hypocrisy starts as a black dot, and spreads the same way. Every small act adds a little. That is why no good deed is too small to bother with, and no sin too small to worry about." },
    ],
    audit: ["Which good act am I doing that hasn't become easy yet?", "Have I kept at it long enough to judge fairly?", "Do I enjoy this good thing, or only the credit for it?", "Who are the people whose nature is rubbing off on mine?"],
  },
  5: {
    model: pair("Two conditions, two jobs", "Ghazali takes the doctor's two jobs and applies them directly.", [["A healthy soul", "The job is to set up a routine that keeps it healthy and makes it even clearer.", "support"], ["A sick soul", "The job is to make it well: remove what has gone off course and put its opposite in its place.", "balance"]]),
    closer: [
      { title: "Stories of training", body: "Ghazali passes on reports of how people trained themselves. One man, to cure his quick temper, paid someone to insult him in public, and made himself stay calm, until his patience became famous. Another felt cowardly, so he sailed out in winter when the waves were wild. Someone greedy for food might fast, then cook delicious meals and serve them to others without eating. Ghazali's point is the principle behind them, not the stunts." },
      { title: "Keep your word to yourself", body: "The key to all this effort, Ghazali says, is keeping your resolutions. If you decide to give up a desire and then the chance to indulge it appears, that is a test from God — so hold firm. If you get used to breaking your own resolutions, your soul learns that, and it goes bad. The whole method fits into one verse: “As for whoever feared standing before their Lord and held the soul back from its desires, Paradise will be their home.”" },
    ],
    audit: ["Right now, am I protecting my health or trying to recover it?", "What is the exact opposite of my worst fault?", "Am I using a remedy meant for someone else's problem?", "Which of my own resolutions have I got used to breaking?"],
  },
  6: {
    model: chain("Judging by what it's for", "Ghazali works out what's wrong with the heart from what the heart was made to do.", [["Every body part has a job", "It was made for something.", "support"], ["Being ill means failing at that job", "A sick hand can't grip. A sick eye can't see.", "balance"], ["The heart's job", "Knowing, wisdom, loving God, and enjoying remembering Him more than any other pleasure.", "support"], ["So the heart is sick when", "Something else has become dearer to it, or it has lost its appetite for its real food.", "warning"]]),
    closer: [
      { title: "“Hud made me grey”", body: "The Prophet once said the chapter of Hud had turned his hair grey. Someone later saw him in a dream and asked why. He answered: because of the verse “Stay on the straight path, as you have been commanded.” Staying exactly on the middle is that hard. But Ghazali says if you can't reach it perfectly, you should still try to get as close to it as you can." },
      { title: "One by one", body: "Good deeds only come from good character. So Ghazali's practical advice is simple: look carefully at your qualities, make a list, and then work on them one at a time, in order." },
    ],
    audit: ["What is dearer to me, in practice, than what I say is dearest?", "Which is easier for me: keeping or giving?", "Have I overcorrected a fault into its opposite?", "Which quality on my list should I work on first?"],
  },
  7: {
    model: chain("Four routes to a hidden fault", "Ghazali lists them from most reliable to easiest to find.", [["A wise teacher", "Someone who sees the soul's faults and whom you let guide you. Rare in this age.", "support"], ["A truthful friend", "Someone you ask to watch you and tell you what they don't like.", "balance"], ["Your enemies", "An angry eye notices the ugly, so an enemy's tongue tells you what a friend's kindness hides.", "balance"], ["People in general", "Whatever you dislike in them, look for in yourself, because people are alike.", "support"]]),
    closer: [
      { title: "The scorpion under your shirt", body: "Ghazali says we have reached a point where the person we dislike most is the one who points out our faults. Imagine someone warned you a scorpion was under your shirt. You would thank them and rush to kill it. Yet a scorpion's sting lasts a day, while bad character stings the heart and may last forever. And still, when someone warns us, we answer, “Well, you do such-and-such too!” He says that shows weak faith." },
      { title: "Three routes for people without a guide", body: "Ghazali is clear that routes two to four are for when you can't find a real guide. He means someone wise, who sees the faults of the soul, cares about you, has already worked on themselves, and gives good advice. Whoever finds such a person has found the doctor, and should stay close to them." },
    ],
    audit: ["Which of the four mirrors can I actually use?", "When someone last named a fault of mine, did I answer with one of theirs?", "What have people who dislike me said that was true?", "What do I dislike in others that I also do?"],
  },
  8: {
    model: pair("What the evidence shows", "The reports are gathered to give a method, not just a mood.", [["Cure by going the opposite way", "You treat a fault by deliberately moving toward its opposite until you reach the balanced middle.", "support"], ["Cure by wishing", "Wanting to be better without actually practising anything against the fault.", "warning"]]),
    closer: [
      { title: "The pomegranate and the wasps", body: "Ibrahim al-Khawwas once picked a pomegranate on a mountain because he wanted it, found it sour, and left it. Further on he met a man lying on the ground, covered in wasps. Ibrahim said, “You seem close to God — why not ask Him to protect you from these wasps?” The man replied, “You seem close to God too — why not ask Him to protect you from wanting pomegranates? A pomegranate's sting is felt in the next life. A wasp's sting is only felt in this one.”" },
      { title: "Train it like a falcon", body: "Ghazali says a soul is trained the way a falcon is. At first it is kept away from what it is used to, so it forgets its wild habits. Then it is fed gently until it trusts its trainer and comes when called. A baby being weaned cries and refuses new food, but after a while it wouldn't go back to milk even if you offered it. Hard at the start, sweet at the end. And the training lasts a whole life — Ghazali says this struggle only ends at death." },
    ],
    audit: ["What do I enjoy that won't come with me into the grave?", "What lawful thing am I most attached to?", "Which of the four kinds of people am I closest to?", "When did I last keep a resolution against a desire?"],
  },
  9: {
    model: chain("How to read the signs", "Ghazali makes the test something outside you, so it can't be decided by how you feel.", [["Deciding too early", "Someone struggles a little, drops the big sins, and decides their character is fixed.", "warning"], ["What the hadith says", "Good character is faith, and bad character is hypocrisy.", "support"], ["The traits the Quran lists", "The Quran describes believers and hypocrites, and those descriptions are what each kind of character produces.", "balance"], ["Check yourself", "Find all of them, none, or some. Work on what's missing and keep what's there.", "support"]]),
    closer: [
      { title: "The tailor and the fake coins", body: "A tailor named Abu Abd Allah had a customer who paid him with fake coins for a whole year. He took them every time and said nothing. One day the tailor was out, and his apprentice spotted the fake coin and handed it back. When the tailor returned, he said, “That was wrong of you. I've put up with him for a year. I take his coins and throw them down a well, so he can't cheat any other Muslim with them.”" },
      { title: "Where good character ends up", body: "Ghazali says these are souls trained until their character became balanced and their hearts were cleaned of grudges and deceit. The fruit is being content with whatever God decides — the peak of good character. Someone who resents what God does has the worst character of all. If you don't find these signs in yourself, don't fool yourself. Keep working." },
    ],
    audit: ["Which of the Quran's descriptions do I actually match?", "Which did I just assume I match?", "Whose bad character do I complain about most?", "How did I respond the last time someone hurt me?"],
  },
  10: {
    model: chain("Why the early years matter so much", "Ghazali treats a child's heart as the most important thing anyone is trusted with.", [["A pure jewel", "A child's heart is a precious jewel with nothing carved on it yet, ready to take anything.", "support"], ["It leans the way it is bent", "Habits and friends decide which way becomes easy.", "balance"], ["The trust", "The child is a trust from God to those who raise them, and what is planted early is hardest to change later.", "warning"], ["Step by step", "Teaching, company and habits are built up gradually, not forced all at once.", "support"]]),
    closer: [
      { title: "Carving in stone, dust on a wall", body: "When a child nears adulthood, they can start to understand the reasons behind what they were taught: that food is for giving you strength to obey God, and that this world is a passing stop, not a home. If the upbringing was good, those words stick in the heart like carving in stone. If not, they bounce off like dry dust thrown at a wall." },
      { title: "Sahl at three years old", body: "Sahl al-Tustari said that at three he used to watch his uncle pray at night. His uncle taught him to say in his heart, without moving his tongue, “God is with me. God sees me. God is my witness” — three times a night, then seven, then eleven. Sahl felt its sweetness. Then his uncle said, “If God is with someone, sees them and witnesses them, would they disobey Him? Beware of sin.” After a year his uncle told him to keep saying it until he entered the grave, because it would help him in this life and the next. Sahl kept it up for years and felt its sweetness deep inside. He began spending time alone." },
      { title: "What grew from it", body: "When they sent Sahl to school, he worried it would scatter his focus, so he agreed with the teacher to go for an hour and come back. He learned the whole Quran by heart by the age of six or seven. He used to fast, and lived on barley bread. At thirteen a question troubled him that no scholar in Basra could answer, so he travelled on until he found a man in Abbadan who could, and stayed to learn from him. Later he ate only once every few nights, for twenty years, and a companion said he never saw him eat salt until he died." },
    ],
    audit: ["What might someone younger be learning from watching me?", "What was carved into me before I could think about it?", "Which of my ideas of good did I just inherit?", "Who are the friends shaping me most right now?"],
  },
  11: {
    model: chain("Why arrival fails", "Ghazali traces the failure back to its root.", [["No arrival", "The goal isn't reached.", "warning"], ["Because no travelling", "The road isn't actually being walked.", "warning"], ["Because no will", "Nothing inside is pulling toward it.", "warning"], ["Because no faith", "Not just saying the words, but seeing so clearly that the trade is obvious.", "warning"]]),
    closer: [
      { title: "Not everyone should take this road", body: "Ghazali warns that many students set out, got stuck on a wrong idea, and gave up religion altogether. So a guide must judge each student. If one isn't suited to this deep path, the guide sends them back to ordinary good deeds and regular worship — what a saying Ghazali quotes calls “the faith of the old women”: simple, sincere, and safe. Someone who can't fight can still carry water to the fighters and share their reward." },
      { title: "The last trap", body: "Even near the goal there are traps: pride, showing off, and getting excited about early spiritual experiences. The biggest, Ghazali says, is wanting to preach what you have found, because it gives a pleasure like no other. The devil tells you that you are reviving dead hearts. The test comes when someone else appears who speaks better and draws bigger crowds. If envy stings you then, you know what was really driving you." },
    ],
    audit: ["Do I want this, or just want to want it?", "Which of the four barriers is thickest for me?", "Which bead have I got used to?", "Would I be glad or jealous if someone did my good work better?"],
  },
};

export const book22Chapters: Chapter[] = book22Base.map((chapter) => {
  const extra = book22Extras[chapter.id];
  if (!extra) return chapter;
  return {
    ...chapter,
    visualModel: extra.model,
    deep: chapter.deep ? { ...chapter.deep, closeReading: extra.closer, selfAudit: extra.audit } : chapter.deep,
  };
});

export const book22FaultMirrors: FaultMirror[] = [
  {
    id: "teacher", label: "A wise teacher",
    route: "Sit with a teacher who sees the soul's faults and knows its hidden dangers, let them guide you, and follow their direction in your struggle.",
    requires: "Someone who can really see this kind of fault, and you truly handing over your judgment about yourself to them.",
    reveals: "Not just the fault but how to treat it — which is what makes this route different from the other three.",
    failure: "Ghazali says plainly that such a person has become rare in this age, so this route usually fails because there's no one to fill it.",
    question: "Is there someone whose view of your character you would trust over your own?",
    open: "This is the strongest of the four, because it gives you a treatment and not just a diagnosis. Use it before the others.",
    closed: "Then this route is closed, which Ghazali expects. Don't treat the other three as poor substitutes; they are what he offers next.",
    chapterId: 7,
  },
  {
    id: "friend", label: "A truthful friend",
    route: "Find an honest, wise, religious friend and ask them to keep an eye on how you are and what you do, and tell you whatever they dislike in your character, behaviour and hidden or visible faults.",
    requires: "A friend willing to risk your goodwill, and you willing to hear it without paying them back.",
    reveals: "What being close over time shows — mostly the ordinary and repeated, not the dramatic.",
    failure: "Friends are rarely useful here. Some are envious and exaggerate, some have their own reasons and call things faults that aren't, and some flatter and hide things. Ghazali says few will stop flattering.",
    question: "Has anyone told you an unwelcome truth about yourself in the last year — and did they suffer for it?",
    open: "Then protect it. Umar asked Salman straight out what he had heard about him, and pushed him when Salman tried to get out of answering.",
    closed: "Dawud al-Ta'i pulled away from people, asking what use they were if they hid his faults from him. If no one will tell you, that says something about your friends, or about how you react.",
    chapterId: 7,
  },
  {
    id: "enemies", label: "Your enemies",
    route: "Learn from what your enemies say, because an unfriendly eye spots the ugly. A person may gain more from an enemy who names their faults than from a flattering friend who hides them.",
    requires: "The self-control to separate what is being said from how it is said and why.",
    reveals: "Exactly what kindness keeps quiet, which is why Ghazali ranks it above a flattering friend.",
    failure: "The obvious one: dislike exaggerates, and it's tempting to throw out the whole thing because part of it is unfair or because of who said it.",
    question: "What have people who dislike you said about you that you have never seriously looked into?",
    open: "Then take the accusation apart. Ask only whether the thing itself is true, and leave their motives out of it.",
    closed: "If nobody ever opposes you, you might just not be noticeable enough to be corrected — which isn't the same as having no faults.",
    chapterId: 7,
  },
  {
    id: "people", label: "People in general",
    route: "Spend time with people, and whatever you dislike in them, look for in yourself and demand better of yourself — because believers are mirrors for each other, and people copy each other.",
    requires: "Nothing except company, which is why Ghazali puts it last, and why it's still open when the others are closed.",
    reveals: "Faults you easily spot in someone else but can't see in yourself — the exact problem this route solves.",
    failure: "It very easily turns into a list of other people's faults, and at that point it has stopped working completely.",
    question: "What did you dislike in someone this week?",
    open: "Then turn it round before you do anything else with it. The route only works in that direction.",
    closed: "If nothing about anyone bothered you, either you weren't paying attention or you had nothing to go on — and the first is more likely.",
    chapterId: 7,
  },
];

const book22ConceptLab: ConceptLab = {
  kind: "courtyard",
  title: "Character is how things are arranged inside",
  note: "Keep the four powers and the behaviour they produce in view. One good deed can happen under strain. Character is the settled order that a pattern starts to flow from easily.",
  prompt: "Change the balance, then watch what becomes easy",
  architecture: {
    form: "Four-iwan courtyard",
    reference: "Masjed-e Jāme’ of Isfahan",
    note: "The four-iwan plan holds four powers around one inner shape. This picture is our own, not a comparison Ghazali makes.",
    url: "https://whc.unesco.org/en/list/1397",
  },
  scenes: [
    {
      id: "balanced", label: "The powers in balance", chapterId: 2,
      setup: "Knowledge tells, anger defends, desire wants, and justice keeps each one in the right amount and place.",
      takeaway: "The middle isn't a dull average. It is the right amount, decided by sound knowledge in a real situation.",
      steps: [
        { id: "justice", label: "Justice", micro: "Keeps them in order", body: "Justice keeps anger and desire following sound judgment. It is the ordering of the powers, not a fourth desire competing with them.", role: "support", position: "center" },
        { id: "knowledge", label: "Knowledge", micro: "Sees what fits", body: "Healthy knowing tells true from false and right action from wrong. When it is healthy, it is wisdom.", role: "support", position: "north" },
        { id: "appetite", label: "Appetite", micro: "Wants the right amount", body: "Desire still seeks food and good things, but following the mind and God's law. When healthy, it is self-control.", role: "balance", position: "east" },
        { id: "anger", label: "Anger", micro: "Defends the right amount", body: "Anger can still hold back or push forward where wisdom needs it. When healthy it is courage — not having no force at all.", role: "balance", position: "west" },
        { id: "conduct", label: "Conduct", micro: "Starts to flow easily", body: "Doing right again and again comes more and more easily. This steady source inside — not one performance — is what the definition calls character.", role: "support", position: "south" },
      ],
    },
    {
      id: "anger-excess", label: "Anger goes too far", chapterId: 5,
      setup: "The power to defend isn't evil. Trouble starts when its force or timing stops following good judgment.",
      takeaway: "Treatment is by the right opposite, in the right dose. Just pushing harder can move a person further from the middle.",
      steps: [
        { id: "justice", label: "Justice", micro: "The balance is lost", body: "The powers are out of order. Fixing it means getting the right amount back, not flattening every strong reaction.", role: "warning", position: "center" },
        { id: "knowledge", label: "Knowledge", micro: "Has to diagnose first", body: "Judgment has to work out whether the fault is too much, too little, or the wrong power in charge, before the right opposite practice can be chosen.", role: "support", position: "north" },
        { id: "appetite", label: "Appetite", micro: "Can recruit the force", body: "Something you want can turn anger against whatever gets in the way. It may look like defending yourself while really serving desire.", role: "balance", position: "east" },
        { id: "anger", label: "Anger", micro: "Goes past good judgment", body: "The power grows beyond what wisdom needs. Ghazali puts faults on both sides, so the cure aims at courage, not at being helpless.", role: "warning", position: "west" },
        { id: "conduct", label: "Conduct", micro: "Practises the excess", body: "Every time you do it, it comes more readily next time. The loop can deepen the fault, but the same process is what makes change possible.", role: "warning", position: "south" },
      ],
    },
    {
      id: "training", label: "A quality being trained", chapterId: 4,
      setup: "A person does what a wanted quality would do before it feels natural, then repeats it until the source inside changes.",
      takeaway: "Early effort doesn't mean you're being fake. In Ghazali's comparison with learning a craft, clumsy repetition is how a steady ability is built.",
      steps: [
        { id: "justice", label: "The quality you want", micro: "The aim inside", body: "The goal is a settled trait, not credit for one performance. Naming the quality keeps practice tied to what you are trying to become.", role: "support", position: "center" },
        { id: "knowledge", label: "Discernment", micro: "Picks the right action", body: "Knowledge works out what the wanted quality needs right here, so practice doesn't turn into blind repetition.", role: "support", position: "north" },
        { id: "appetite", label: "Resistance", micro: "The old ease is still there", body: "The opposite pull may still feel natural. That resistance is just where you start; it doesn't mean practice can't sink in.", role: "balance", position: "east" },
        { id: "anger", label: "Deliberate effort", micro: "The act is carried out", body: "The body is made to do the right act despite resistance, the way a hand copies letters clumsily while learning to write.", role: "balance", position: "west" },
        { id: "conduct", label: "New readiness", micro: "Repeating becomes character", body: "As training continues, the right act gets easier and stops feeling like a weight from outside. That readiness shows the source has changed.", role: "support", position: "south" },
      ],
    },
  ],
};

export const book22Movements: TaxonomyGroup[] = [
  { id: "what", label: "What character is", description: "Why good character is so valuable and bad character is blamed, and the definition the rest of the book depends on.", color: "#b45f4c", chapterIds: [1, 2] },
  { id: "change", label: "That it can change", description: "The argument against “you're born that way”, the general way to gain good character, and the detailed path.", color: "#2c78b8", chapterIds: [3, 4, 5] },
  { id: "treat", label: "Diagnosis and treatment", description: "Signs of a sick heart, the four ways to know your own faults, the evidence for going against desire, and the signs of health.", color: "#3a9b88", chapterIds: [6, 7, 8, 9] },
  { id: "pace", label: "Early years and pace", description: "Character shaped in childhood, and the conditions that decide how fast training should go.", color: "#9a75aa", chapterIds: [10, 11] },
];

export const book22: SystemBook = {
  id: 22,
  title: "Disciplining the Soul and Refining Character",
  shortTitle: "Refining Character",
  defaultJourneyId: "character",
  chapters: book22Chapters,
  conceptNodes: book22ConceptNodes,
  journeys: book22Journeys,
  sources: book22Sources,
  taxonomy: {
    title: "Four parts",
    note: "Ghazali's own order, grouped by what each stretch of the book does: defining character, arguing it can change, diagnosing and treating it, and setting the pace.",
    groups: book22Movements,
  },
  conceptLab: book22ConceptLab,
  faultMirrors: {
    title: "The four mirrors",
    note: "Ghazali gives four ways a person comes to know their own faults, and says the first two have become rare. Work out which are really open to you. The routes show faults; they don't cure them — the cure is in the sections around this one.",
    items: book22FaultMirrors,
  },
  editorialNote: "The five journeys, eleven reading sections, diagrams and four mirrors are learning aids made for this edition. The eleven sections follow Ghazali's own parts, in his order. The English explains the ideas of the public Arabic text in plain words; it is not a translation. The Islamic Texts Society publishes a complete English translation of this book with Book 23. Reports and stories are given as Ghazali passed them on; this edition does not grade every one. Ghazali's claim that character can change is his answer to people who said temperament is fixed.",
};
