import { assetUrl } from "./assetUrl";
import type { Chapter, ConceptNode, VisualModel } from "./data";
import type { ConceptLab, FaultMirror, Journey, SourceLink, SystemBook, TaxonomyGroup } from "./systemTypes";

const book22Base: Chapter[] = [
  {
    id: 1,
    shortTitle: "Why character matters",
    formalTitle: "The excellence of good character and the blame of bad character",
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
    formalTitle: "The true nature of good and bad character",
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
    formalTitle: "The receptivity of character to change through discipline",
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
    formalTitle: "The general means by which good character is acquired",
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
    formalTitle: "The detailed path to refining character",
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
    formalTitle: "The signs of diseases of the heart and its return to health",
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
    formalTitle: "The ways a person comes to know the faults of the self",
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
    formalTitle: "Religious testimony that treatment involves opposing desire",
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
    formalTitle: "Disciplining children in early growth and improving their character",
    overview: "Ghazali describes a child as a trust given to the parents, open to whatever is carved into them. Early habits, teachers, friends, praise and surroundings shape who they become. The section comes from a medieval setting and is read here for its argument, not as a modern parenting guide.",
    reflection: "Whether you think about a child or about yourself, ask what your surroundings praise, practise and make easy every day.",
    relatedNodes: ["habit", "company", "character", "cultivation"],
    deep: {
      thesis: "A child's heart is like a clean, uncarved jewel: what is carved into it early — by habit, example and company — is what it grows up with.",
      context: "Ghazali applies the book's idea of habit to childhood. Everything he has said about forming character is most obviously true of children. So this section is the same argument, seen from the easier end.",
      moves: [
        { title: "A trust and a jewel", body: "A child, Ghazali says, is a trust in the care of the parents. The child's pure heart is a precious jewel, plain and uncarved, ready to take whatever is carved into it and to lean whichever way it is leaned. If it is taught good and used to it, the child grows up on it and is happy in both lives — and the parents and every teacher share the reward. If it is neglected like an animal, the harm is on whoever was responsible." },
        { title: "Protect from the greater fire", body: "The Quran says, “Believers, protect yourselves and your families from a Fire.” Ghazali reasons that parents already protect their child from fire in this world. Protecting them from the Fire of the next world matters even more. And that protection means teaching good character and keeping them away from bad company. The root of raising children well, he says, is guarding them from bad friends." },
        { title: "Notice the first sign of reason", body: "The first good sign in a child is shyness — a sense of shame. When a child starts to feel embarrassed and holds back from some things, it means the light of reason is dawning. They are starting to see that some things are ugly. Ghazali calls this a gift from God and good news about the child's future. A child with this sense of shame shouldn't be ignored. Use it to help them learn." },
        { title: "Teach stories of good people", body: "At school, the child should learn the Quran, the Prophet's sayings, and stories of good people, so that love of the righteous is planted in them. Ghazali warns against poetry that glamorises romantic obsession, and against people who say that sort of thing is sophisticated. It plants seeds of trouble in young hearts." },
        { title: "Praise in public, correct in private", body: "When a child does something good, they should be honoured for it, rewarded with something that makes them happy, and praised in front of people. If they slip once, it is better to overlook it and not embarrass them, especially if they are trying to hide it. Exposing it may just make them bolder. If it happens again, have a word in private." },
        { title: "Don't nag", body: "Don't scold a child all the time, Ghazali says. If you do, blame becomes easy to hear and bad behaviour becomes easy to do, and your words stop landing in their heart. A parent should keep their words weighty by using them rarely." },
        { title: "Let them play", body: "After school, the child should be allowed to play in a good way, to rest from the effort of learning. Ghazali is firm here. Stopping a child from playing and pushing them to study all the time kills their heart and dulls their intelligence. It makes life so miserable that they look for any way to escape learning altogether." },
      ],
      distinction: {
        title: "A lasting idea inside a medieval way of raising children",
        firstLabel: "The lasting claim",
        first: "Early habits, examples, friends and surroundings shape a person strongly, long before they can explain how.",
        secondLabel: "Details from its time",
        second: "Ghazali's specific methods — including on discipline, food and hardship — belong to his medieval world and need careful judgement before anyone applies them today.",
      },
      misreading: "This describes how children were raised in Ghazali's time. Don't take it as parenting advice. Keep the argument about when character forms, and read the specific methods as belonging to their period.",
      observation: "Look at one surrounding you spend a lot of time in, not one lesson. What does it reward? What does it make normal? What kind of response does it make easy?",
      sourceAnchor: "Book 22, section 10, early education and the formation of children's character.",
    },
  },
  {
    id: 11,
    shortTitle: "How the path begins",
    formalTitle: "The conditions of aspiration and the gradual path of discipline",
    overview: "The last section turns to someone who wants to set out on the path. Their drive has to rest on real conviction. Four barriers must be cleared, a guide must be found, and training moves forward in stages — with dangers along the way.",
    reflection: "A dramatic start can feel powerful but have no structure. Ask what will still guide your effort once the excitement fades.",
    relatedNodes: ["cultivation", "company", "habit", "knowledge"],
    deep: {
      thesis: "Real drive comes from seeing clearly what the next life is worth; then a beginner clears four barriers, holds on to a guide, protects the effort, and crosses the obstacles one at a time.",
      context: "Ghazali gathers everything in the book into a plan for a beginner. He isn't offering a burst of inspiration. He is setting out the conditions that let a good intention survive real habits and daily life — and warning about what can go wrong.",
      moves: [
        { title: "The bead and the jewel", body: "Someone who has seen the next life with real certainty will want it without being pushed. If you hold a glass bead and then see a precious jewel, you lose interest in the bead and want to trade it. But Ghazali says faith here doesn't mean just saying the words of faith. That is like someone who agrees the jewel is better than the bead, but only knows the word “jewel”. Used to the bead, they may well keep it." },
        { title: "Trace the chain back", body: "Why don't people reach the goal? Because they don't travel. They don't travel because they don't really want to. They don't want to because their faith is weak. And their faith is weak because there are too few guides reminding them of what matters. Worse, Ghazali says, when someone does wake up and asks the scholars for the way, they often find the scholars following their own desires." },
        { title: "Clear four barriers", body: "A beginner first has to clear four barriers between themselves and God: money, status, blind loyalty, and sin. Money: keep only what you need, because as long as one coin pulls at your heart, you are tied. Status: stay away from the spotlight and choose to be unknown. Blind loyalty: stop being a fan of your own group's views for their own sake, and seek understanding through effort rather than arguing." },
        { title: "Repent before you seek secrets", body: "The fourth barrier is sin, and only repentance clears it: regret, a firm decision not to return, and making things right with anyone you wronged. Someone who wants the deep secrets of religion without first fixing their obvious sins, Ghazali says, is like someone who wants the deep meanings of the Quran before learning Arabic. The basics come first, and they stay necessary to the end." },
        { title: "Find a guide", body: "Clearing the barriers is like doing wudu before prayer. Now you need someone to lead the prayer: a guide. The road of religion is hard to see, and the devil's roads are many and obvious. Someone who crosses a deadly desert without a protector risks their life. And a person who tries to grow on their own is like a tree that sprouts by itself: it soon dries up, or grows leaves but no fruit." },
        { title: "Build the fort", body: "The beginner then needs a fort to protect them: time alone, silence, hunger, and staying up at night. Ghazali pictures the heart as a pool that dirty streams keep flowing into from the senses. The training is emptying the pool so clean water can rise from its spring. But you can't empty a pool while the streams are still pouring in. So the senses have to be guarded, apart from what is needed." },
        { title: "Remember until only the meaning is left", body: "Then come the obstacles, which are the heart's attachments to the world — easiest first. Once they are cleared, the guide gives the student one phrase of remembering God, such as “Allah, Allah.” At first the tongue says it. Then it runs on the tongue without effort. Then only its form is left in the heart. Finally even the words fade, and only the meaning stays, filling the heart. Doubts and strange thoughts will come; they should be taken to the guide." },
      ],
      distinction: {
        title: "A burst of energy can start the effort, but structure carries it",
        firstLabel: "A sudden decision",
        first: "A strong moment shows you what matters and gets you moving, but it can fade before habits, duties and obstacles have changed.",
        secondLabel: "A drive with a plan",
        second: "A clear aim turned into duties, guidance, good company and gradual steps that keep going when feelings change.",
      },
      misreading: "This section isn't permission to invent harsh exercises for yourself. Ghazali assumes a qualified guide, basic religious duties in place, and a pace fitted to the person — and he sends many people back to simple good deeds.",
      observation: "Name the point where a good intention of yours usually loses steam: an unclear aim, a barrier you haven't cleared, no structure, the wrong pace, or no honest guidance.",
      sourceAnchor: "Book 22, section 11, the conditions of aspiration and gradual progress in discipline.",
    },
  },
];

export const book22ConceptNodes: ConceptNode[] = [
  {
    id: "character",
    label: "Character",
    kicker: "Stable inward form",
    description:
      "A settled disposition from which actions arise readily. It is deeper than a passing mood, an isolated act, or a social label.",
    position: "node-character",
  },
  {
    id: "knowledge",
    label: "Knowledge",
    kicker: "Discerning power",
    description:
      "The capacity that recognizes fitting action and consequence. Its sound condition is wisdom, and it should guide rather than rationalize appetite.",
    position: "node-knowledge",
  },
  {
    id: "anger",
    label: "Anger",
    kicker: "Protective power",
    description:
      "The power that repels harm. Its sound discipline supports courage; its excess and deficiency each produce disorder.",
    position: "node-anger",
  },
  {
    id: "appetite",
    label: "Appetite",
    kicker: "Seeking power",
    description:
      "The power that seeks nourishment and desired goods. Its sound discipline is temperance, not total elimination.",
    position: "node-appetite",
  },
  {
    id: "justice",
    label: "Justice",
    kicker: "Right proportion",
    description:
      "The regulating condition that keeps knowledge, anger, and appetite in their fitting relations, without excess or deficiency.",
    position: "node-justice",
  },
  {
    id: "habit",
    label: "Habit",
    kicker: "Repeated formation",
    description:
      "Repeated outward action impresses an inward direction. Over time, what was effortful can become a ready disposition.",
    position: "node-habit",
  },
  {
    id: "diagnosis",
    label: "Diagnosis",
    kicker: "Know the actual fault",
    description:
      "Treatment begins by finding the dominant disorder, its direction, and the condition of the person rather than choosing a generic remedy.",
    position: "node-diagnosis",
  },
  {
    id: "health",
    label: "Health",
    kicker: "Restored function",
    description:
      "The heart's sound condition is known through ordered function and the growing ease of fitting action, not comfort by itself.",
    position: "node-health",
  },
  {
    id: "company",
    label: "Company",
    kicker: "A living curriculum",
    description:
      "Guides, friends, and companions reveal faults and transmit patterns through example, correction, and ordinary proximity.",
    position: "node-company",
  },
  {
    id: "cultivation",
    label: "Cultivation",
    kicker: "Gradual directed growth",
    description:
      "A clear aim is supported by environment, duties, guidance, and practices that fit the learner's present capacity.",
    position: "node-cultivation",
  },
];

export const book22Journeys: Journey[] = [
  {
    id: "character",
    number: "01",
    question: "What is good character?",
    title: "See the inward architecture",
    description:
      "Move from the value of character to Ghazali's precise definition, then see how four capacities become wisdom, courage, temperance, and justice.",
    payoff: "You leave with a definition that can distinguish a good act from a formed quality.",
    image: assetUrl("assets/system/book22-character-balance.jpg"),
    imageAlt: "A bright four-part brass medallion balancing a blue lens, coral flame, saffron bowl, and central regulating wheel.",
    minutes: 7,
    color: "#2c73a8",
    nodes: [
      {
        id: "why-it-matters",
        label: "Establish its worth",
        micro: "Character is not decoration",
        summary:
          "Ghazali first places good character at the center of lived religion and treats bad character as an illness of the inward life.",
        guardrail: "The opening praise concerns inward formation, not charm or personality type.",
        chapterId: 1,
        glyph: "witness",
      },
      {
        id: "beneath-the-act",
        label: "Look beneath the act",
        micro: "Find the settled source",
        summary:
          "Character is a stable disposition from which actions arise readily, not a single performance or passing emotional state.",
        guardrail: "A difficult good act may be valuable training without yet proving settled character.",
        chapterId: 2,
        glyph: "name",
      },
      {
        id: "four-capacities",
        label: "Find four capacities",
        micro: "Knowledge, anger, appetite, justice",
        summary:
          "The inward form is read through the soundness of knowledge, the protective power of anger, the seeking power of appetite, and the justice that orders them.",
        guardrail: "Anger and appetite are powers to discipline, not defects to erase.",
        chapterId: 2,
        glyph: "forces",
      },
      {
        id: "hold-the-mean",
        label: "Hold the fitting mean",
        micro: "Avoid excess and deficiency",
        summary:
          "Virtue appears when each power acts in a fitting measure under sound knowledge; vice can appear on either side of that balance.",
        guardrail: "The mean is a right proportion, not a numerical average or permanent mildness.",
        chapterId: 2,
        glyph: "balance",
      },
      {
        id: "test-the-character",
        label: "Test the pattern",
        micro: "Pressure reveals the order",
        summary:
          "Good character appears as a connected pattern across time, especially when injury, disagreement, loss, or provocation crosses the self.",
        guardrail: "One easy success cannot certify the whole inward form.",
        chapterId: 9,
        glyph: "diagnose",
      },
    ],
  },
  {
    id: "formation",
    number: "02",
    question: "Can character really change?",
    title: "Trace practice into disposition",
    description:
      "Follow the loop through which repeated action, purpose, and company reshape what first felt difficult into a more stable inward readiness.",
    payoff: "You see a mechanism for change that avoids both fatalism and instant transformation.",
    image: assetUrl("assets/system/book22-practice-disposition.jpg"),
    imageAlt: "Six ivory practice panels show a geometric rosette and flowering bud becoming progressively more fluent and complete.",
    minutes: 8,
    color: "#24877d",
    nodes: [
      {
        id: "change-is-possible",
        label: "Reject immutability",
        micro: "A disposition can be retrained",
        summary:
          "Ghazali argues that counsel, education, and discipline would be pointless if established qualities admitted no change.",
        guardrail: "Possible does not mean quick, easy, or equal for everyone.",
        chapterId: 3,
        glyph: "practice",
      },
      {
        id: "preserve-the-powers",
        label: "Preserve the powers",
        micro: "Change their rule and measure",
        summary:
          "Training redirects anger and appetite while retaining their necessary functions in protection, nourishment, and human life.",
        guardrail: "Discipline is not the annihilation of every impulse.",
        chapterId: 3,
        glyph: "balance",
      },
      {
        id: "practice-the-act",
        label: "Practice the action",
        micro: "Begin before it feels natural",
        summary:
          "The learner repeatedly performs actions associated with the desired quality, giving the inward self a new direction to rehearse.",
        guardrail: "Waiting to feel fully formed can prevent the practice that helps formation begin.",
        chapterId: 4,
        glyph: "act",
      },
      {
        id: "travel-inward",
        label: "Let it travel inward",
        micro: "Repetition becomes readiness",
        summary:
          "As with learning a craft, repeated fitting action can pass from awkward effort into an established capacity that operates with greater ease.",
        guardrail: "Mechanical repetition still needs sound direction and purpose.",
        chapterId: 4,
        glyph: "practice",
      },
      {
        id: "choose-company",
        label: "Choose formative company",
        micro: "Patterns pass through proximity",
        summary:
          "Keeping company with people of sound character teaches what to notice, admire, and do, often before a formal rule is stated.",
        guardrail: "Company influences formation without removing personal responsibility.",
        chapterId: 4,
        glyph: "company",
      },
      {
        id: "look-for-ease",
        label: "Look for settled ease",
        micro: "The quality becomes at home",
        summary:
          "The work matures when fitting action no longer remains only an external burden and the inward disposition begins to agree with it.",
        guardrail: "Ease is evidence only when the action and its measure are themselves sound.",
        chapterId: 4,
        glyph: "steady",
      },
    ],
  },
  {
    id: "treatment",
    number: "03",
    question: "How is a fault treated?",
    title: "Think like a careful physician",
    description:
      "Diagnose the failed function, locate excess or deficiency, apply a fitting contrary, and keep adjusting until the remedy restores balance.",
    payoff: "You gain a treatment model that is personal, measured, and testable.",
    image: assetUrl("assets/system/book22-diagnosis-treatment.jpg"),
    imageAlt: "A luminous brass balance compares a tangled coral knot with measured turquoise drops beside apothecary vessels and fruit.",
    minutes: 9,
    color: "#c46243",
    nodes: [
      {
        id: "name-failed-function",
        label: "Name the failed function",
        micro: "Health gives illness meaning",
        summary:
          "A condition is called sick in relation to the proper function it prevents, so inward diagnosis begins by asking what the heart can no longer do fittingly.",
        guardrail: "Discomfort alone does not identify the disease.",
        chapterId: 6,
        glyph: "diagnose",
      },
      {
        id: "locate-direction",
        label: "Locate the direction",
        micro: "Excess, deficiency, or wrong rule",
        summary:
          "Treatment becomes precise only after the dominant tendency and the direction in which it departs from balance are identified.",
        guardrail: "A broad label such as anger does not yet reveal the exact disorder.",
        chapterId: 5,
        glyph: "mirror",
      },
      {
        id: "apply-contrary",
        label: "Apply the contrary",
        micro: "Lean against the entrenched pull",
        summary:
          "A vice is treated through repeated actions that press in the fitting opposite direction and loosen its habitual rule.",
        guardrail: "The contrary practice is a corrective force, not the final permanent extreme.",
        chapterId: 5,
        glyph: "balance",
      },
      {
        id: "fit-the-dose",
        label: "Fit the dose",
        micro: "One regimen cannot fit everyone",
        summary:
          "The exercise must match the person's condition, history, strength, and dominant fault, just as medicine is chosen for a particular patient.",
        guardrail: "What helps one condition may burden or distort another.",
        chapterId: 5,
        glyph: "diagnose",
      },
      {
        id: "advance-gradually",
        label: "Advance gradually",
        micro: "Use a reachable next state",
        summary:
          "When the full contrary cannot yet be sustained, gradual movement can use a nearer and less harmful state as a bridge toward balance.",
        guardrail: "A bridge is useful because it leads onward, not because it becomes the destination.",
        chapterId: 5,
        glyph: "cultivate",
      },
      {
        id: "verify-health",
        label: "Verify the return",
        micro: "Function, measure, growing ease",
        summary:
          "Recovery appears through restored function, right proportion, and the growing readiness to perform fitting action without creating a new opposite fault.",
        guardrail: "Stop corrective pressure when it has restored the fitting mean.",
        chapterId: 6,
        glyph: "health",
      },
    ],
  },
  {
    id: "self-knowledge",
    number: "04",
    question: "How do I see hidden faults?",
    title: "Use four mirrors, then test",
    description:
      "Interrupt self-deception through guidance, truthful friendship, difficult criticism, and the traits you notice in others. Then watch what pressure reveals.",
    payoff: "You turn feedback into evidence without surrendering discernment.",
    image: assetUrl("assets/system/book22-four-mirrors.jpg"),
    imageAlt: "A central brass vessel is surrounded by four distinct mirrors and lenses that reveal it from different directions.",
    minutes: 8,
    color: "#7a5a9a",
    nodes: [
      {
        id: "seek-guidance",
        label: "Seek a discerning guide",
        micro: "Borrow trained sight",
        summary:
          "A guide familiar with the diseases of character can identify patterns and direct treatment that the learner cannot yet see alone.",
        guardrail: "Guidance requires discernment, not surrender to any confident voice.",
        chapterId: 7,
        glyph: "learn",
      },
      {
        id: "commission-friendship",
        label: "Commission a truthful friend",
        micro: "Ask for more than reassurance",
        summary:
          "A trustworthy and perceptive friend is invited to observe conduct and report faults honestly.",
        guardrail: "Friendship becomes a mirror when truth is safer than flattery.",
        chapterId: 7,
        glyph: "company",
      },
      {
        id: "inspect-criticism",
        label: "Inspect hostile criticism",
        micro: "Extract evidence without surrender",
        summary:
          "An enemy may intend harm or exaggerate, yet resentment can expose material that flattering companions leave untouched.",
        guardrail: "Investigate criticism; do not automatically believe or dismiss it.",
        chapterId: 7,
        glyph: "diagnose",
      },
      {
        id: "mirror-in-others",
        label: "Mirror through others",
        micro: "Turn dislike back toward the self",
        summary:
          "A fault noticed in another person becomes an invitation to search for the same seed in one's own conduct.",
        guardrail: "The method redirects scrutiny inward rather than licensing blame.",
        chapterId: 7,
        glyph: "mirror",
      },
      {
        id: "oppose-ruling-desire",
        label: "Oppose ruling desire",
        micro: "Presence is not command",
        summary:
          "Ghazali's religious testimony supports resisting desire when it seizes rule, creating room for knowledge and justice to direct action.",
        guardrail: "Opposition targets domination and excess, not every lawful need or inclination.",
        chapterId: 8,
        glyph: "guard",
      },
      {
        id: "test-under-friction",
        label: "Test under friction",
        micro: "Comfort can conceal the order",
        summary:
          "A connected pattern of patience, truthfulness, humility, and restraint is tested when injury, disagreement, or loss crosses the self.",
        guardrail: "Do not create harm to test yourself; read the pressures ordinary life already supplies.",
        chapterId: 9,
        glyph: "steady",
      },
    ],
  },
  {
    id: "beginning",
    number: "05",
    question: "How does formation begin?",
    title: "Cultivate the conditions",
    description:
      "See how early environment, companionship, a clear aim, duties, and gradual training shape what the learner can eventually carry with stability.",
    payoff: "You leave with a model of beginnings that is environmental, guided, and gradual.",
    image: assetUrl("assets/system/book22-formation-path.jpg"),
    imageAlt: "A pomegranate sapling grows through five cultivated terraces into a flourishing fruit tree beneath a white and gold canopy.",
    minutes: 7,
    color: "#ba7b24",
    nodes: [
      {
        id: "begin-before-hardening",
        label: "Begin before hardening",
        micro: "Early patterns remain receptive",
        summary:
          "Ghazali presents childhood as a period in which habits and preferences are especially open to formation.",
        guardrail: "The principle of early formation must be separated from period-specific methods.",
        chapterId: 10,
        glyph: "cultivate",
      },
      {
        id: "shape-environment",
        label: "Shape the environment",
        micro: "Daily life teaches before explanation",
        summary:
          "Examples, routines, rewards, surroundings, and repeated practices form character alongside explicit instruction.",
        guardrail: "A lesson cannot easily outteach the environment that surrounds it every day.",
        chapterId: 10,
        glyph: "practice",
      },
      {
        id: "choose-companions",
        label: "Choose companions",
        micro: "The admired becomes normal",
        summary:
          "Companions quietly teach what deserves attention, imitation, laughter, restraint, and honor.",
        guardrail: "Influence is real without making the learner passive or unaccountable.",
        chapterId: 10,
        glyph: "company",
      },
      {
        id: "clarify-aim",
        label: "Clarify the aim",
        micro: "Aspiration needs a governing why",
        summary:
          "A durable beginning requires an aim rooted deeply enough to organize attention, obligation, and action when emotion changes.",
        guardrail: "A dramatic wish is not yet a structured path.",
        chapterId: 11,
        glyph: "resolve",
      },
      {
        id: "build-structure",
        label: "Build a gradual structure",
        micro: "Duties, guidance, reachable stages",
        summary:
          "Ghazali joins resolve to established duties, guidance, companionship, removal of barriers, and gradual practices fitted to present capacity.",
        guardrail: "Measured progression is not permission for self-invented severity.",
        chapterId: 11,
        glyph: "cultivate",
      },
    ],
  },
];

export const book22Sources: SourceLink[] = [
  { label: "Primary Arabic text", note: "The complete public Arabic of Book 22 was read and used to establish the four capacities and their mean, the argument that character is receptive to discipline, the treatment by the fitting contrary with its dose, and the four routes to knowing one's own faults.", url: "https://shamela.ws/book/9472/794" },
  { label: "The reality of good and bad character", note: "The passage defining character as a settled disposition, naming the four capacities, and placing vice on both sides of each.", url: "https://shamela.ws/book/9472/798" },
  { label: "Signs of disease and of health", note: "The passage assessing the heart by whether it performs its proper work, warning that present ease is no test, and requiring the treatment to stop at restoration.", url: "https://shamela.ws/book/9472/808" },
  { label: "That treatment means opposing desire", note: "The passage gathering the testimony that the road runs through striving against caprice, and locating the fault at the point of rule rather than in the desire itself.", url: "https://shamela.ws/book/9472/811" },
  { label: "The signs of good character", note: "The passage listing the signs as a constellation and requiring that they be read under provocation rather than in favourable conditions.", url: "https://shamela.ws/book/9472/815" },
  { label: "Aspiration and the gradual path", note: "The passage setting the conditions of aspiration, the barriers that consume the attention training needs, and the progression by stages.", url: "https://shamela.ws/book/9472/820" },
  { label: "Published English edition", note: "T. J. Winter's translation of Books 22 and 23. Used for edition and title cross-checking; this app uses original English synthesis.", url: "https://its.org.uk/catalogue/al-ghazali-on-disciplining-the-soul-and-on-breaking-the-two-desires-paperback/" },
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
    model: pair("Two ways to read a good moment", "The section's whole purpose is to make the second question askable.", [["A settled disposition", "The conduct issues easily and repeatedly, because it comes from a formed state.", "support"], ["A polished occasion", "The conduct appeared once, under favourable conditions, and proves nothing yet.", "warning"]]),
    closer: [
      { title: "The friend who kept his character", body: "Ibn al-Mubarak once travelled with a bad-tempered man. He put up with him the whole way and kept the peace. When they parted, Ibn al-Mubarak cried. Asked why, he said, “I felt sorry for him. I left him — but his character didn't leave him.” Bad character is the one companion you can't walk away from." },
      { title: "The map of the whole book", body: "Ghazali lays out his plan at the start: why character matters, what it is, whether it can change, how it is gained, how it is treated, the signs of sickness, how to find your faults, why the cure is resisting desire, the signs of good character, raising children, and how a beginner starts. The eleven reading sections follow that order." },
    ],
    audit: ["Which of my good qualities has only been tested when it was easy?", "What comes out of me when patience gets expensive?", "Whom do I find hard to forgive, give to, or stay in touch with?", "Would the people closest to me call me easy or hard to be around?"],
  },
  2: {
    model: chain("The four pillars", "Beauty of the inward form requires all four, as beauty of a face requires every feature.", [["Knowledge", "Discerning truth from falsehood in belief and right from wrong in action; its virtue is wisdom.", "support"], ["Anger", "Its contraction and expansion held to what wisdom requires; its virtue is courage.", "balance"], ["Appetite", "Disciplined under the direction of intellect and Law; its virtue is continence.", "balance"], ["Justice", "The power that holds the other two to wisdom's direction; its opposite is not excess but injustice.", "support"]]),
    closer: [
      { title: "The fool and the madman", body: "Ghazali makes a sharp distinction. A foolish person wants the right thing but picks the wrong way to get there. A mad person wants the wrong thing in the first place. Weak understanding shows up in both — but the first can be taught the road, while the second has the wrong destination." },
      { title: "Firm in one place, gentle in another", body: "The Quran describes the Companions as “firm against the disbelievers, merciful among themselves.” Ghazali reads this as a lesson in balance. Firmness has its place and mercy has its place. Being perfect doesn't mean always being tough, or always being soft. It means each at the right time." },
    ],
    audit: ["Which of the four powers is weakest in me?", "Am I judging myself by single acts, or by what produces them?", "Where do I go too far, and where do I fall short?", "Am I firm and gentle in the right places?"],
  },
  3: {
    model: chain("Four ranks of difficulty", "Ghazali grades them by how much has to be undone before anything can be built.", [["Ignorant", "Distinguishes nothing yet and has not settled into appetite; needs only a teacher and a motive.", "support"], ["Ignorant and astray", "Knows the ugliness and is habituated to it; must uproot one habit and plant another.", "balance"], ["And corrupt", "Believes the ugly traits are obligatory and beautiful, and was raised on them.", "warning"], ["And evil", "Sees excellence in doing much harm and boasts of it; the hardest rank of all.", "warning"]]),
    closer: [
      { title: "Why the teacher still says “no anger at all”", body: "Ghazali adds a careful point. A spiritual guide should tell a beginner that anger and holding on to money are bad, full stop, without allowing any. Why? If the guide allows even a little, the student will use that as an excuse to keep all their anger, telling themselves it is the allowed amount. Aiming hard at the root is what brings the student back to the middle." },
      { title: "Lukewarm water", body: "Ghazali explains why the middle is the goal. A heart at its best is not caught up in money at all — neither greedy to keep it nor eager to spend it. In this life that is hard, so we look for the next best thing: the middle. Lukewarm water is neither hot nor cold, so it is as if it is free of both. Generosity sits the same way between wasting and stinginess." },
    ],
    audit: ["Which of the four levels am I at for my worst habit?", "What do I call my nature that is really just my habit?", "Have I convinced myself a bad habit is actually good?", "Am I trying to remove a drive instead of training it?"],
  },
  4: {
    model: chain("How a trait is acquired", "The route runs through effort and ends in ease, which is the test that it worked.", [["Choose the trait", "Name the disposition wanted rather than the single act.", "support"], ["Force the act", "Do what the generous person does, deliberately and against resistance.", "balance"], ["Persist", "Continue long enough that the resistance stops being the main fact.", "balance"], ["It becomes pleasant", "The generous person is the one who takes pleasure in giving, not the one who gives with dislike.", "support"]]),
    closer: [
      { title: "Three ways, and what happens when they combine", body: "Good qualities come by nature, by habit, and by spending time with good people — because, Ghazali says, “one nature steals from another, the bad and the good alike.” Someone who has all three is at the top. Someone born with bad qualities, who falls in with bad friends and gets used to wrongdoing, is furthest from God. Most people sit somewhere in between." },
      { title: "A white dot and a black dot", body: "A saying Ghazali quotes: faith starts in the heart as a white dot. As faith grows, the whiteness spreads, until the whole heart is white. Hypocrisy starts as a black dot, and spreads the same way. Every small act adds a little. That is why no good deed is too small to bother with, and no sin too small to worry about." },
    ],
    audit: ["Which good act am I doing that hasn't become easy yet?", "Have I kept at it long enough to judge fairly?", "Do I enjoy this good thing, or only the credit for it?", "Who are the people whose nature is rubbing off on mine?"],
  },
  5: {
    model: pair("Two conditions, two tasks", "Ghazali takes the physician's division and applies it directly.", [["A sound soul", "The work is to lay down the regimen that preserves it and adds to its clarity.", "support"], ["A sick soul", "The work is to bring health to it, which means removing what is deviating and installing its opposite.", "balance"]]),
    closer: [
      { title: "Stories of training", body: "Ghazali passes on reports of how people trained themselves. One man, to cure his quick temper, paid someone to insult him in public, and made himself stay calm, until his patience became famous. Another felt cowardly, so he sailed out in winter when the waves were wild. Someone greedy for food might fast, then cook delicious meals and serve them to others without eating. Ghazali's point is the principle behind them, not the stunts." },
      { title: "Keep your word to yourself", body: "The key to all this effort, Ghazali says, is keeping your resolutions. If you decide to give up a desire and then the chance to indulge it appears, that is a test from God — so hold firm. If you get used to breaking your own resolutions, your soul learns that, and it goes bad. The whole method fits into one verse: “As for whoever feared standing before their Lord and held the soul back from its desires, Paradise will be their home.”" },
    ],
    audit: ["Right now, am I protecting my health or trying to recover it?", "What is the exact opposite of my worst fault?", "Am I using a remedy meant for someone else's problem?", "Which of my own resolutions have I got used to breaking?"],
  },
  6: {
    model: chain("Diagnosis by function", "Ghazali derives the heart's illness from what the heart was made to do.", [["Every organ has an act", "It was created for a specific function.", "support"], ["Illness is failure of that act", "The hand's illness is that it cannot grasp; the eye's, that it cannot see.", "balance"], ["The heart's act", "Knowledge, wisdom, love of God, and delight in remembrance preferred above every appetite.", "support"], ["So the heart's illness", "Something else has become dearer, or the appetite for its own food has fallen away.", "warning"]]),
    closer: [
      { title: "“Hud made me grey”", body: "The Prophet once said the chapter of Hud had turned his hair grey. Someone later saw him in a dream and asked why. He answered: because of the verse “Stay on the straight path, as you have been commanded.” Staying exactly on the middle is that hard. But Ghazali says if you can't reach it perfectly, you should still try to get as close to it as you can." },
      { title: "One by one", body: "Good deeds only come from good character. So Ghazali's practical advice is simple: look carefully at your qualities, make a list, and then work on them one at a time, in order." },
    ],
    audit: ["What is dearer to me, in practice, than what I say is dearest?", "Which is easier for me: keeping or giving?", "Have I overcorrected a fault into its opposite?", "Which quality on my list should I work on first?"],
  },
  7: {
    model: chain("Four routes to a hidden fault", "Ghazali lists them in descending order of reliability and ascending order of availability.", [["A discerning teacher", "One who sees the soul's faults and is given authority over you; rare in this age.", "support"], ["A truthful friend", "Set as a watcher over your states, who tells you what he dislikes.", "balance"], ["Your enemies", "An angry eye brings out the ugly, so the hostile tongue reports what affection conceals.", "balance"], ["People generally", "Attribute to yourself whatever you find blameworthy among them, since natures are alike.", "support"]]),
    closer: [
      { title: "The scorpion under your shirt", body: "Ghazali says we have reached a point where the person we dislike most is the one who points out our faults. Imagine someone warned you a scorpion was under your shirt. You would thank them and rush to kill it. Yet a scorpion's sting lasts a day, while bad character stings the heart and may last forever. And still, when someone warns us, we answer, “Well, you do such-and-such too!” He says that shows weak faith." },
      { title: "Three routes for people without a guide", body: "Ghazali is clear that routes two to four are for when you can't find a real guide. He means someone wise, who sees the faults of the soul, cares about you, has already worked on themselves, and gives good advice. Whoever finds such a person has found the doctor, and should stay close to them." },
    ],
    audit: ["Which of the four mirrors can I actually use?", "When someone last named a fault of mine, did I answer with one of theirs?", "What have people who dislike me said that was true?", "What do I dislike in others that I also do?"],
  },
  8: {
    model: pair("What the testimony establishes", "The point of the gathered reports is a method, not an atmosphere.", [["Treatment by opposition", "The remedy for a deviation is deliberate movement toward its contrary, carried until the mean is reached.", "support"], ["Treatment by resolve", "A wish to be better, held without any specific opposition being practised.", "warning"]]),
    closer: [
      { title: "The pomegranate and the wasps", body: "Ibrahim al-Khawwas once picked a pomegranate on a mountain because he wanted it, found it sour, and left it. Further on he met a man lying on the ground, covered in wasps. Ibrahim said, “You seem close to God — why not ask Him to protect you from these wasps?” The man replied, “You seem close to God too — why not ask Him to protect you from wanting pomegranates? A pomegranate's sting is felt in the next life. A wasp's sting is only felt in this one.”" },
      { title: "Train it like a falcon", body: "Ghazali says a soul is trained the way a falcon is. At first it is kept away from what it is used to, so it forgets its wild habits. Then it is fed gently until it trusts its trainer and comes when called. A baby being weaned cries and refuses new food, but after a while it wouldn't go back to milk even if you offered it. Hard at the start, sweet at the end. And the training lasts a whole life — Ghazali says this struggle only ends at death." },
    ],
    audit: ["What do I enjoy that won't come with me into the grave?", "What lawful thing am I most attached to?", "Which of the four kinds of people am I closest to?", "When did I last keep a resolution against a desire?"],
  },
  9: {
    model: chain("How the sign is read", "Ghazali makes the test external so that it cannot be settled by feeling.", [["The premature verdict", "A little struggle leaves gross sins, and the person concludes he is refined.", "warning"], ["The stated equivalence", "Good character is faith and bad character is hypocrisy.", "support"], ["The described traits", "The Book describes the believers and the hypocrites, and those descriptions are the fruits of each.", "balance"], ["Present yourself", "Find all of them, none, or some, and work at what is missing while keeping what is there.", "support"]]),
    closer: [
      { title: "The tailor and the fake coins", body: "A tailor named Abu Abd Allah had a customer who paid him with fake coins for a whole year. He took them every time and said nothing. One day the tailor was out, and his apprentice spotted the fake coin and handed it back. When the tailor returned, he said, “That was wrong of you. I've put up with him for a year. I take his coins and throw them down a well, so he can't cheat any other Muslim with them.”" },
      { title: "Where good character ends up", body: "Ghazali says these are souls trained until their character became balanced and their hearts were cleaned of grudges and deceit. The fruit is being content with whatever God decides — the peak of good character. Someone who resents what God does has the worst character of all. If you don't find these signs in yourself, don't fool yourself. Keep working." },
    ],
    audit: ["Which of the Quran's descriptions do I actually match?", "Which did I just assume I match?", "Whose bad character do I complain about most?", "How did I respond the last time someone hurt me?"],
  },
  10: {
    model: chain("Why the early years carry so much", "Ghazali treats the child's heart as the most consequential thing entrusted to anyone.", [["A pure substance", "The child's heart is a precious jewel, empty of engraving and receptive to everything.", "support"], ["It inclines where it is bent", "Habituation and company decide which of the two directions become easy.", "balance"], ["The trust", "The child is a trust with those who raise him, and what is planted early is the hardest to change later.", "warning"], ["Gradual formation", "Instruction, company, and habit are applied by degrees rather than imposed at once.", "support"]]),
    closer: [
      { title: "Carving in stone, dust on a wall", body: "When a child nears adulthood, they can start to understand the reasons behind what they were taught: that food is for giving you strength to obey God, and that this world is a passing stop, not a home. If the upbringing was good, those words stick in the heart like carving in stone. If not, they bounce off like dry dust thrown at a wall." },
      { title: "Sahl at three years old", body: "Sahl al-Tustari said that at three he used to watch his uncle pray at night. His uncle taught him to say in his heart, without moving his tongue, “God is with me. God sees me. God is my witness” — three times a night, then seven, then eleven. Sahl felt its sweetness. Then his uncle said, “If God is with someone, sees them and witnesses them, would they disobey Him?” The lesson took root because it grew one small step at a time." },
    ],
    audit: ["What might someone younger be learning from watching me?", "What was carved into me before I could think about it?", "Which of my ideas of good did I just inherit?", "Who are the friends shaping me most right now?"],
  },
  11: {
    model: chain("Why arrival fails", "Ghazali runs the failure backwards to its root.", [["No arrival", "The destination is not reached.", "warning"], ["Because no travelling", "The road is not actually being walked.", "warning"], ["Because no will", "Nothing in the person is pulling toward it.", "warning"], ["Because no faith", "Not the tongue's movement, but a seeing that makes the trade obvious.", "warning"]]),
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
    id: "teacher", label: "A discerning teacher",
    route: "Sit before a teacher who sees the faults of the soul and is aware of the hidden banes, give him authority over yourself, and follow his direction in your struggle.",
    requires: "Someone who can actually see this kind of fault, and a genuine surrender of judgment to him about yourself.",
    reveals: "Not only the fault but the route of its treatment, which is what distinguishes this route from the other three.",
    failure: "Ghazali says plainly that such a person has become rare in this age, so the route most often fails by having no one to occupy it.",
    question: "Is there a person whose reading of your character you would accept against your own?",
    open: "This is the strongest of the four, because it returns a treatment and not only a diagnosis. Use it before the others.",
    closed: "Then this route is shut, which Ghazali expects. Do not treat the other three as inferior substitutes; they are what he offers next.",
    chapterId: 7,
  },
  {
    id: "friend", label: "A truthful friend",
    route: "Seek a truthful, discerning, religious friend and set him as a watcher over your states and actions, to tell you whatever he dislikes in your character, conduct, and inward and outward faults.",
    requires: "A friend willing to lose your goodwill, and your own willingness to hear it without repayment.",
    reveals: "What sustained proximity shows, which is mostly the ordinary and repeated rather than the dramatic.",
    failure: "Friends are rarely usable: some envy and overstate, some have an interest and call a fault what is not, and some flatter and conceal. Ghazali says few will drop the flattery.",
    question: "Has anyone told you an unwelcome truth about yourself in the last year, and did they suffer for it?",
    open: "Then protect it. Umar asked Salman directly what he had heard, and pressed him when he tried to be excused.",
    closed: "Dawud al-Ta'i withdrew from people asking what he should do with those who hide his faults from him. If no one will tell you, that is a fact about your company or about how you receive it.",
    chapterId: 7,
  },
  {
    id: "enemies", label: "Your enemies",
    route: "Benefit from the tongues of your enemies, since the eye of displeasure brings out the ugly, and a person may gain more from a hostile enemy who names his faults than from a flattering friend who conceals them.",
    requires: "The discipline to separate the content of an accusation from the manner and motive of the one making it.",
    reveals: "Precisely what affection suppresses, which is why Ghazali ranks it above the friend who flatters.",
    failure: "The obvious one: hostility exaggerates, and the temptation is to dismiss the whole report because part of it is unfair or because of who made it.",
    question: "What have people who dislike you said about you that you have never seriously examined?",
    open: "Then take the accusation apart. Ask only whether the thing itself is true, and leave the motive entirely out of that question.",
    closed: "If no one opposes you at all, you may simply not be visible enough to be corrected, which is not the same as being without fault.",
    chapterId: 7,
  },
  {
    id: "people", label: "People generally",
    route: "Mix with people, and whatever you find blameworthy among them, attribute it to yourself and demand it of yourself, since believers are one another's mirrors and natures are alike in following one another.",
    requires: "Nothing but company, which is why Ghazali places it last and why it remains available when the others are shut.",
    reveals: "Faults you can recognise easily in another and cannot see directly in yourself, which is the specific problem this route solves.",
    failure: "It inverts with almost no resistance into a survey of other people's faults, at which point it has stopped working entirely.",
    question: "What did you find objectionable in someone this week?",
    open: "Then turn the finding around before you do anything else with it. The route only works in that direction.",
    closed: "If nothing in anyone struck you as objectionable, either you were not paying attention or you have no material, and the first is more likely.",
    chapterId: 7,
  },
];

const book22ConceptLab: ConceptLab = {
  kind: "courtyard",
  title: "Character is an inward arrangement",
  note: "Keep the four capacities and the conduct they produce in view. A single good act can occur under strain; character names the settled order from which a pattern begins to arise readily.",
  prompt: "Change the proportion, then watch what becomes easy",
  architecture: {
    form: "Four-iwan courtyard",
    reference: "Masjed-e Jāme’ of Isfahan",
    note: "The four-iwan plan holds four capacities around one inward form. This spatial arrangement is editorial and is not an analogy used in Ghazali's text.",
    url: "https://whc.unesco.org/en/list/1397",
  },
  scenes: [
    {
      id: "balanced", label: "The powers in balance", chapterId: 2,
      setup: "Knowledge discerns, anger defends, appetite seeks, and justice keeps each power within the fitting measure and place.",
      takeaway: "The mean is not a bland average. It is the fitting proportion determined by sound knowledge in a concrete situation.",
      steps: [
        { id: "justice", label: "Justice", micro: "Orders the relation", body: "Justice holds anger and appetite to the direction of sound discernment. It is the ordering of the powers, not merely a fourth appetite competing with them.", role: "support", position: "center" },
        { id: "knowledge", label: "Knowledge", micro: "Discerns what fits", body: "The sound condition of knowing distinguishes truth from falsehood and right action from wrong. Its virtue is wisdom.", role: "support", position: "north" },
        { id: "appetite", label: "Appetite", micro: "Seeks in measure", body: "Appetite continues to seek nourishment and fitting goods, but under the direction of intellect and the Law. Its sound condition is temperance.", role: "balance", position: "east" },
        { id: "anger", label: "Anger", micro: "Defends in measure", body: "Anger's contraction and expansion remain available where wisdom requires them. Its sound condition is courage, not the absence of force.", role: "balance", position: "west" },
        { id: "conduct", label: "Conduct", micro: "Begins to flow readily", body: "Repeated fitting acts emerge with increasing readiness. This stable inward source—not one isolated performance—is what the definition calls character.", role: "support", position: "south" },
      ],
    },
    {
      id: "anger-excess", label: "Anger exceeds its measure", chapterId: 5,
      setup: "The defensive power is not evil in itself. Disorder begins when its force or timing no longer follows sound judgment.",
      takeaway: "Treatment is by a fitting contrary and a measured dose. Simply applying more force can move a person farther from the mean.",
      steps: [
        { id: "justice", label: "Justice", micro: "The proportion is lost", body: "The relation among the powers is disordered. Repair means restoring a fitting measure, not flattening every strong response.", role: "warning", position: "center" },
        { id: "knowledge", label: "Knowledge", micro: "Must diagnose first", body: "Discernment has to identify whether the fault is excess, deficiency, or the wrong power taking command before a contrary practice can fit it.", role: "support", position: "north" },
        { id: "appetite", label: "Appetite", micro: "May recruit the force", body: "A wanted object can enlist anger against whatever blocks it. The resulting force may look defensive while actually serving appetite.", role: "balance", position: "east" },
        { id: "anger", label: "Anger", micro: "Acts beyond judgment", body: "The power expands beyond what wisdom requires. Ghazali places vice on both sides, so the remedy aims at courage rather than at helplessness.", role: "warning", position: "west" },
        { id: "conduct", label: "Conduct", micro: "Rehearses the excess", body: "Every repeated act makes the response more ready next time. The loop can deepen the fault, but the same formative mechanism is also what makes change possible.", role: "warning", position: "south" },
      ],
    },
    {
      id: "training", label: "A quality being trained", chapterId: 4,
      setup: "A person performs the act a desired quality would produce before that act feels natural, then repeats it until the inward source changes.",
      takeaway: "Early effort is not proof of insincerity. In Ghazali's craft analogy, awkward repetition is the route by which a stable capacity is formed.",
      steps: [
        { id: "justice", label: "Named quality", micro: "The inward aim", body: "The goal is a disposition, not credit for one performance. Naming the quality keeps repetition connected to the formation being sought.", role: "support", position: "center" },
        { id: "knowledge", label: "Discernment", micro: "Chooses the fitting act", body: "Knowledge identifies what the desired quality would require here, so practice does not become blind repetition.", role: "support", position: "north" },
        { id: "appetite", label: "Resistance", micro: "The old ease remains", body: "The contrary inclination may still feel natural. That resistance marks the starting condition; it does not show that practice cannot travel inward.", role: "balance", position: "east" },
        { id: "anger", label: "Deliberate effort", micro: "The act is carried", body: "The limbs are directed to perform the fitting act despite resistance, just as the hand copies letters awkwardly while learning to write.", role: "balance", position: "west" },
        { id: "conduct", label: "New readiness", micro: "Repetition becomes character", body: "With continued formation, the fitting act becomes easier and is no longer experienced only as an alien burden. That readiness is the evidence the source has changed.", role: "support", position: "south" },
      ],
    },
  ],
};

export const book22Movements: TaxonomyGroup[] = [
  { id: "what", label: "What character is", description: "The excellence of good character and the blame of its opposite, and the definition the rest of the book depends on.", color: "#b45f4c", chapterIds: [1, 2] },
  { id: "change", label: "That it can change", description: "The argument against fixed temperament, the general means of acquiring good character, and the detailed path.", color: "#2c78b8", chapterIds: [3, 4, 5] },
  { id: "treat", label: "Diagnosis and treatment", description: "The signs of a diseased heart, the four routes to knowing one's own faults, the testimony for opposing desire, and the signs of health.", color: "#3a9b88", chapterIds: [6, 7, 8, 9] },
  { id: "pace", label: "Formation and pace", description: "Character formed early, and the conditions of aspiration that govern how fast discipline may proceed.", color: "#9a75aa", chapterIds: [10, 11] },
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
    title: "Four movements",
    note: "Ghazali's own order, grouped by what each stretch of the book is doing: defining character, arguing it can change, diagnosing and treating it, and setting the pace.",
    groups: book22Movements,
  },
  conceptLab: book22ConceptLab,
  faultMirrors: {
    title: "The four mirrors",
    note: "Ghazali gives four routes by which a person comes to know his own faults, and notes that the first two have become rare. Work out which are actually open to you. The routes report faults; they do not treat them, and the treatment is the subject of the sections around this one.",
    items: book22FaultMirrors,
  },
  editorialNote: "The five journeys, eleven reading sections, visual models, and four mirrors are editorial learning aids. The eleven sections preserve the expositions Ghazali gives in his own order. The English is an original synthesis made from a reading of the public Arabic text, not a translation and not a substitute for one; the Islamic Texts Society publishes a complete English translation of this book together with Book 23, and a reader wanting the text itself should go there. Reports and inherited anecdotes are presented as material Ghazali transmitted; this edition does not independently grade every narration. Two scope notes. The section on disciplining children reflects eleventh-century household practice, including counsel on correction and on the shaping of a child's appetites that would cause harm if taken as parenting advice today; it is presented for its argument about when character is most open to formation. A few of its general observations are summarised (praise in public, correct in private, do not nag, let children play), but its counsel on correction, diet and hardship is not reproduced. And the book's central claim — that character is receptive to change — is offered by Ghazali as a theological and ethical position against those who held temperament fixed, not as a clinical claim about any particular difficulty. The four mirrors report where a fault might be seen; they cannot pronounce on whether a fault is present, and they are not a substitute for treatment. Complex personal cases require the complete Arabic, a reliable full edition, and qualified scholarly guidance.",
};
