import { assetUrl } from "./assetUrl";
import type { Chapter, ConceptNode } from "./data";
import type { Journey, SourceLink, SystemBook } from "./systemTypes";

export const book22Chapters: Chapter[] = [
  {
    id: 1,
    shortTitle: "Why character matters",
    formalTitle: "The excellence of good character and the blame of bad character",
    overview:
      "Ghazali begins by establishing the religious importance of character through Qur'anic passages, reports, and sayings. Character is not treated as decorative etiquette. It concerns the inward condition from which a person's conduct repeatedly emerges.",
    points: [
      "Good character is presented as a central part of faithful and excellent living.",
      "Bad character is treated as an illness of the inward life, not merely a social inconvenience.",
      "The opening testimony creates urgency before the book turns to definition, diagnosis, and treatment.",
    ],
    reflection:
      "A polished moment can be useful without yet proving a settled character. Notice what appears when patience, generosity, or restraint becomes costly.",
    relatedNodes: ["character", "health", "justice"],
    deep: {
      thesis:
        "Character matters because repeated conduct reveals an inward formation that can either assist or obstruct the person's religious journey.",
      context:
        "The book opens with testimony rather than technique. Ghazali first establishes why inward formation deserves sustained attention, then proceeds to explain what character is and how it may be changed.",
      moves: [
        {
          title: "Establish its rank",
          body:
            "The section gathers religious testimony praising good character. Its cumulative purpose is to place character near the center of lived religion, rather than at the edge as optional refinement.",
        },
        {
          title: "Connect the inward and outward",
          body:
            "Conduct is visible, but the book is interested in the settled source from which conduct becomes easy and recurrent. This prepares the definition developed in the next section.",
        },
        {
          title: "Name the danger",
          body:
            "Bad character is framed as a sickness of the heart. That medical language makes later questions of signs, causes, dosage, and treatment part of one continuous argument.",
        },
      ],
      distinction: {
        title: "The opening claim is larger than good manners",
        firstLabel: "A polished act",
        first:
          "One courteous or generous performance may be chosen with effort, for mixed motives, or only under favorable conditions.",
        secondLabel: "A formed character",
        second:
          "A stable inward quality makes a pattern of fitting actions arise with increasing ease across changing conditions.",
      },
      misreading:
        "Do not use the praise and blame in this section to rank other people's personalities. Ghazali is creating urgency for inward reform, and the diagnostic work begins with the self.",
      observation:
        "Choose one quality you value. Compare how easily it appears when you are comfortable with how easily it appears when it costs time, status, or appetite.",
      sourceAnchor: "Book 22, section 1, the excellence of good character and blame of bad character.",
    },
  },
  {
    id: 2,
    shortTitle: "What character is",
    formalTitle: "The true nature of good and bad character",
    overview:
      "Character is defined as a stable disposition of the soul from which actions proceed readily without needing fresh deliberation each time. Ghazali then relates sound character to the balanced operation of knowledge, anger, appetite, and justice.",
    points: [
      "A passing mood or one difficult performance is not yet a settled character.",
      "Wisdom, courage, temperance, and justice name the sound states of four inward capacities.",
      "Good character lies in fitting balance, while vice appears through excess, deficiency, or disordered rule.",
    ],
    reflection:
      "Ask not only what you did, but what kind of inward arrangement made that response feel natural, difficult, attractive, or repellent.",
    relatedNodes: ["character", "knowledge", "anger", "appetite", "justice"],
    deep: {
      thesis:
        "Character is a durable inward form: the organized condition that makes certain actions flow easily and repeatedly.",
      context:
        "Ghazali distinguishes an outward human form from an inward form. Just as the visible form has parts, the inward form has powers whose soundness depends on their quality and relation to one another.",
      moves: [
        {
          title: "Move beneath the isolated act",
          body:
            "An action performed once, especially under strain, does not by itself establish a character. The definition points to a settled disposition from which actions arise without renewed calculation at every occurrence.",
        },
        {
          title: "Identify four capacities",
          body:
            "The power of knowledge discerns; anger repels and defends; appetite seeks; justice regulates these powers so that each operates in its fitting measure and place.",
        },
        {
          title: "Read virtue as proportion",
          body:
            "Wisdom is the sound condition of knowing, courage the sound condition of anger, temperance the sound condition of appetite, and justice the ordering power that holds the whole together.",
        },
        {
          title: "Locate vice on both sides",
          body:
            "A power can miss the fitting mean through excess or deficiency. Moral repair therefore cannot be reduced to simply having more force or less desire.",
        },
      ],
      distinction: {
        title: "Ease is part of the definition, but not a shortcut",
        firstLabel: "Action under strain",
        first:
          "A person may force a generous or patient act while the contrary inclination remains dominant. The act can be valuable training without yet proving a stable disposition.",
        secondLabel: "Settled disposition",
        second:
          "Through formation, the fitting action becomes increasingly ready and coherent. Character names this inward readiness, not a label attached after one event.",
      },
      misreading:
        "The mean is not a bland average between every pair of impulses. It is the fitting measure determined by sound knowledge and right order in the concrete situation.",
      observation:
        "When the same choice returns, notice whether you must renegotiate it from the beginning or whether a trained readiness now helps carry it.",
      sourceAnchor: "Book 22, section 2, the true nature of character and its four foundations.",
    },
  },
  {
    id: 3,
    shortTitle: "Character can change",
    formalTitle: "The receptivity of character to change through discipline",
    overview:
      "Ghazali rejects the claim that character cannot change. Training does not erase the roots of anger and appetite; it brings them under sound measure. People differ in native disposition, accumulated habit, conviction, and therefore in how readily they change.",
    points: [
      "Advice, education, and discipline would be pointless if settled qualities could never change.",
      "The goal is to govern anger and appetite, not abolish capacities needed for human life.",
      "Change is possible without being equally quick or easy for every person.",
    ],
    reflection:
      "Replace the question ‘Is this simply who I am?’ with the more exact question ‘What has this power been trained to do?’",
    relatedNodes: ["character", "anger", "appetite", "habit", "justice"],
    deep: {
      thesis:
        "The powers of the self remain, but their direction, proportion, and habitual obedience can be changed through discipline.",
      context:
        "This section answers a fatalistic objection. Ghazali uses the evident effects of training and differences in human receptivity to argue for real moral formation without promising effortless transformation.",
      moves: [
        {
          title: "Reject immutability",
          body:
            "If character admitted no change, counsel, education, and self-discipline would lose their purpose. The practical traditions of training already assume that repeated direction can reshape conduct.",
        },
        {
          title: "Preserve the useful power",
          body:
            "Anger and appetite have necessary functions. Discipline aims to make them responsive to sound judgment, not to remove every capacity to defend, seek nourishment, or pursue a fitting good.",
        },
        {
          title: "Account for unequal difficulty",
          body:
            "People begin from different temperaments and histories. A tendency strengthened by repeated action and defended by belief is harder to redirect than one that has not yet become entrenched.",
        },
      ],
      distinction: {
        title: "Training changes rule, not human nature into stone",
        firstLabel: "Eradication",
        first:
          "Trying to destroy anger or appetite mistakes the presence of a power for its misuse and can create a different disorder.",
        secondLabel: "Discipline",
        second:
          "Training preserves the power while changing what it follows, when it acts, and how strongly it responds.",
      },
      misreading:
        "Possibility is not a promise of equal speed. Ghazali's argument leaves room for differences in temperament, habit, knowledge, and the depth of attachment to a vice.",
      observation:
        "Find one reaction that now comes more easily than it did a year ago. Identify the repeated conditions that trained it, whether for better or worse.",
      sourceAnchor: "Book 22, section 3, character's receptivity to change through discipline.",
    },
  },
  {
    id: 4,
    shortTitle: "How a quality is acquired",
    formalTitle: "The general means by which good character is acquired",
    overview:
      "Good character may be aided by natural disposition, but it is also acquired by repeatedly performing fitting actions and by keeping company with people of sound character. Outward action and inward disposition influence one another until effort can become stable ease.",
    points: [
      "Repeated action can impress its quality upon the inward disposition.",
      "The company a person keeps teaches patterns even without formal instruction.",
      "A virtue is not complete merely because its actions are performed occasionally or painfully.",
    ],
    reflection:
      "Look for the small act whose repetition would teach the inward quality you want, rather than waiting to feel fully formed before acting.",
    relatedNodes: ["character", "habit", "company", "justice"],
    deep: {
      thesis:
        "Act and disposition form a loop: repeated fitting action educates the inward state, and the formed inward state then makes fitting action easier.",
      context:
        "After defending the possibility of change, Ghazali explains the general mechanism. Some people begin with a favorable disposition, while others acquire the same quality through practice and formative company.",
      moves: [
        {
          title: "Begin where action is possible",
          body:
            "A learner performs the actions associated with a desired quality even before those actions feel spontaneous. Practice gives the inward self a repeated direction.",
        },
        {
          title: "Let repetition travel inward",
          body:
            "Ghazali compares formation to learning a craft such as writing. Repeated performance slowly turns an awkward act into an established capacity that can operate with ease.",
        },
        {
          title: "Use company as a teacher",
          body:
            "People acquire qualities by observing and accompanying others. Patterns of attention, response, and valuation can be learned through proximity before they are stated as rules.",
        },
        {
          title: "Look for stable pleasure",
          body:
            "Completion is not mere outward compliance. A quality has become settled when its fitting acts are performed readily and are no longer experienced only as an alien burden.",
        },
      ],
      distinction: {
        title: "Practice is formative, but performance can still be shallow",
        firstLabel: "Repetition alone",
        first:
          "Mechanical repetition can remain external if it is detached from sound purpose, attention, and the inward quality being cultivated.",
        secondLabel: "Formative repetition",
        second:
          "The act is repeated as training toward a known good, supported by reflection and company, until the inward disposition begins to correspond.",
      },
      misreading:
        "Do not wait for perfect sincerity or ease before beginning a fitting action. In this account, the rightly directed act is one of the means by which the inward quality is formed.",
      observation:
        "Pick one recurrent setting, such as disagreement or spending. Ask which response that setting is currently rehearsing in you each time it occurs.",
      sourceAnchor: "Book 22, section 4, the general means of acquiring good character.",
    },
  },
  {
    id: 5,
    shortTitle: "Treatment must fit the person",
    formalTitle: "The detailed path to refining character",
    overview:
      "Ghazali compares the guide of souls to a physician. The fault must be diagnosed, its direction understood, and a contrary practice prescribed in a measure the person can bear. One identical regimen for everyone may fail or even harm.",
    points: [
      "A vice is treated by practicing the fitting quality that opposes its direction.",
      "The treatment depends on the person's condition, history, strength, and dominant fault.",
      "When a direct correction is too difficult, gradual movement can lead the person toward balance.",
    ],
    reflection:
      "Before choosing a remedy, name whether the present fault is an excess, a deficiency, or the wrong power taking command.",
    relatedNodes: ["diagnosis", "health", "justice", "habit"],
    deep: {
      thesis:
        "Moral treatment is precise and proportionate: diagnose the ruling disorder, apply its fitting contrary, and adjust the dose until balance becomes possible.",
      context:
        "The physician analogy organizes this section. Bodies differ, illnesses differ, and medicines differ; the same is true of inward conditions. Treatment therefore requires knowledge of both the quality and the person.",
      moves: [
        {
          title: "Diagnose before prescribing",
          body:
            "The guide first studies the person's present character, circumstances, age, habits, and dominant tendencies. A generic exercise chosen without diagnosis can miss the actual disorder.",
        },
        {
          title: "Treat by the fitting contrary",
          body:
            "A tendency hardened in one direction is corrected by repeated action in the other direction. Miserliness, for example, is not cured by further withholding, but the correction still seeks a just measure rather than reckless excess.",
        },
        {
          title: "Match the dose",
          body:
            "The intensity and duration of an exercise must suit the condition. What is medicinal for one person may be needless, unbearable, or destabilizing for another.",
        },
        {
          title: "Move by stages",
          body:
            "When the full contrary cannot yet be sustained, Ghazali allows gradual transition. A nearer, less harmful state can become a bridge toward the final balanced condition.",
        },
      ],
      distinction: {
        title: "A contrary practice is medicine, not a new permanent extreme",
        firstLabel: "Corrective pressure",
        first:
          "A temporary exercise leans against an entrenched vice so that the person can move away from it.",
        secondLabel: "The intended health",
        second:
          "The destination is the fitting mean under wise judgment, not permanent occupation of the opposite excess.",
      },
      misreading:
        "The section includes demanding exercises from Ghazali's ascetic setting. They describe a historical program under guidance, not universal prescriptions to imitate without judgment, capacity, or context.",
      observation:
        "When a correction fails, ask whether the diagnosis was wrong, the dose was too large, or the exercise trained a new excess instead of restoring balance.",
      sourceAnchor: "Book 22, section 5, the detailed path for refining character.",
    },
  },
  {
    id: 6,
    shortTitle: "Signs of illness and health",
    formalTitle: "The signs of diseases of the heart and its return to health",
    overview:
      "An organ is sick when it cannot perform its proper function. Ghazali applies this pattern to the heart and asks what its love, knowledge, choices, and pleasures reveal. Recovery appears when fitting action becomes ordered and increasingly welcome.",
    points: [
      "Illness is recognized in relation to the proper function of the thing that is ill.",
      "Immediate pleasure is not always health, because a diseased appetite may enjoy what sustains its disease.",
      "Treatment must stop at balance rather than carrying correction into an opposite fault.",
    ],
    reflection:
      "Do not ask only whether an action feels easy now. Ask what that ease has been trained to love and what function it helps the heart fulfill.",
    relatedNodes: ["health", "diagnosis", "habit", "justice"],
    deep: {
      thesis:
        "Health is measured by restored function and ordered desire, not by comfort alone.",
      context:
        "Ghazali extends the medical model from treatment to verification. The reader needs signs that distinguish the pain of medicine, the pleasure of illness, and the more stable ease that comes with health.",
      moves: [
        {
          title: "Begin from proper function",
          body:
            "The sickness of an eye, hand, or stomach is known through disruption of what that organ is for. The heart is likewise assessed by whether it fulfills its proper work of knowing, loving, choosing, and worshipping well.",
        },
        {
          title: "Question immediate pleasure",
          body:
            "An unhealthy condition can make its own fuel attractive, while medicine can initially feel unpleasant. Present ease therefore cannot serve as the only test of moral health.",
        },
        {
          title: "Watch what becomes welcome",
          body:
            "As formation deepens, fitting actions become less foreign and burdensome. Their growing ease is evidence when it accompanies sound function and balance.",
        },
        {
          title: "Stop at restoration",
          body:
            "Corrective effort must be monitored. Once the balanced condition is reached, continuing the same pressure may drive the person into the opposite disorder.",
        },
      ],
      distinction: {
        title: "Feeling good and being well are not identical",
        firstLabel: "Immediate preference",
        first:
          "A trained appetite may prefer the very pattern that keeps it disordered, while a new discipline may initially feel difficult.",
        secondLabel: "Recovered function",
        second:
          "Health shows itself in the heart's ability to know and choose fittingly, with desire gradually coming into agreement.",
      },
      misreading:
        "Difficulty does not automatically prove virtue, and ease does not automatically prove vice. Both must be interpreted in relation to sound function, right measure, and the direction being formed.",
      observation:
        "For one habit, separate three questions: What feels pleasant now? What function does it serve? What has become easier through repeated practice?",
      sourceAnchor: "Book 22, section 6, signs of the heart's diseases and return to health.",
    },
  },
  {
    id: 7,
    shortTitle: "Four mirrors for hidden faults",
    formalTitle: "The ways a person comes to know the faults of the self",
    overview:
      "Because self-love can hide defects, Ghazali gives four routes to self-knowledge: a discerning guide, a truthful and perceptive friend, criticism from an enemy, and observing in oneself what one dislikes in other people.",
    points: [
      "A guide can diagnose patterns the learner cannot yet see.",
      "A trustworthy friend is asked for honest observation rather than reassurance.",
      "Even hostile criticism and disliked traits in others may disclose material for careful self-examination.",
    ],
    reflection:
      "Treat feedback as evidence to investigate, not as a verdict to obey or a discomfort to dismiss.",
    relatedNodes: ["diagnosis", "company", "character", "health"],
    deep: {
      thesis:
        "Self-knowledge needs external mirrors because the same inward bias that requires treatment can also conceal the need for treatment.",
      context:
        "The physician model creates a practical problem: the patient may not see the illness. Ghazali answers with four channels of disclosure, each of which interrupts the closed loop of self-assessment.",
      moves: [
        {
          title: "Seek discerning guidance",
          body:
            "The strongest route is a perceptive guide who understands diseases of character and can direct treatment. The learner's task is to receive diagnosis without evasion.",
        },
        {
          title: "Commission truthful friendship",
          body:
            "A trusted, intelligent, religious friend is asked to watch conduct and report faults. This turns friendship from mutual reassurance into a disciplined source of sight.",
        },
        {
          title: "Extract evidence from hostility",
          body:
            "An enemy may exaggerate or intend harm, yet resentment can expose what flattering companions omit. The useful response is examination, not automatic belief or automatic dismissal.",
        },
        {
          title: "Use other people as mirrors",
          body:
            "What appears ugly in another person can prompt a search for the same seed in oneself. The method redirects moral scrutiny inward instead of ending in blame.",
        },
      ],
      distinction: {
        title: "Feedback is a mirror, not a sovereign judge",
        firstLabel: "Receiving evidence",
        first:
          "A report points attention toward a possible pattern and invites comparison with repeated conduct across situations.",
        secondLabel: "Surrendering judgment",
        second:
          "Treating every accusation as fact ignores motive, exaggeration, context, and the need for sound discernment.",
      },
      misreading:
        "This is not permission to monitor everyone else's faults. The fourth route works only when the disliked quality becomes a prompt for self-examination.",
      observation:
        "Recall feedback that produced immediate defensiveness. Before accepting or rejecting it, name one repeated event that would count as evidence for or against it.",
      sourceAnchor: "Book 22, section 7, four routes by which a person knows the faults of the self.",
    },
  },
  {
    id: 8,
    shortTitle: "Opposing ruling desire",
    formalTitle: "Religious testimony that treatment involves opposing desire",
    overview:
      "Ghazali gathers Qur'anic passages, reports, and sayings to place resistance to ruling desire inside his religious account of discipline. Read beside the earlier sections, opposition means refusing desire's command so that it can return to fitting service.",
    points: [
      "The argument is presented through scriptural and religious testimony.",
      "Desire becomes a treatment target when it overrules knowledge and right measure.",
      "Opposition belongs to a wider program of discipline, not hatred of every human need or inclination.",
    ],
    reflection:
      "When desire speaks strongly, separate the existence of the desire from the claim that it deserves command.",
    relatedNodes: ["appetite", "justice", "knowledge", "habit"],
    deep: {
      thesis:
        "The decisive struggle is not against having desire, but against allowing desire to become the unquestioned ruler of judgment and action.",
      context:
        "This section supplies religious witness for the therapeutic method described earlier. Its meaning is controlled by the book's prior insistence that appetite and anger have functions and require balance rather than annihilation.",
      moves: [
        {
          title: "Place discipline in a religious frame",
          body:
            "Ghazali assembles scripture, reports, and sayings that commend striving against caprice. The section is theological and ascetic testimony within his own program, not a detached modern psychology chapter.",
        },
        {
          title: "Identify the issue of rule",
          body:
            "A desire can be present without being obeyed. Treatment becomes necessary when appetite recruits judgment, supplies excuses, and repeatedly determines the person's direction.",
        },
        {
          title: "Connect resistance to reordering",
          body:
            "Opposition creates room for knowledge and justice to resume their roles. The aim is an appetite that serves fitting ends in fitting measure.",
        },
      ],
      distinction: {
        title: "Desire may be resisted without being declared evil in itself",
        firstLabel: "Presence of desire",
        first:
          "Human appetite seeks food, rest, intimacy, possession, and other objects. Its existence is part of the created human constitution described in the book.",
        secondLabel: "Rule of desire",
        second:
          "Disorder occurs when appetite determines the good for itself and sound judgment becomes its servant.",
      },
      misreading:
        "Do not detach this section from Ghazali's doctrine of balance. The language of opposition targets domination and excess, not the destruction of every bodily need or lawful pleasure.",
      observation:
        "Notice one moment when a desire becomes an argument. Write the reason it offers, then ask whether judgment is examining the desire or merely defending it.",
      sourceAnchor: "Book 22, section 8, religious witness for treating character by opposing desire.",
    },
  },
  {
    id: 9,
    shortTitle: "How good character is tested",
    formalTitle: "The signs of good character",
    overview:
      "Good character is known through a constellation of qualities described in scripture and through conduct under pressure. A few easy improvements do not settle the matter; patience, truthfulness, humility, and restraint must be tested when the self is crossed.",
    points: [
      "No single pleasant trait stands in for the whole of good character.",
      "Scriptural descriptions supply a connected profile of the believer's qualities.",
      "Response to injury, disagreement, loss, and provocation reveals what comfort can conceal.",
    ],
    reflection:
      "Judge a quality across conditions. The revealing moment is often not the calm intention but the response when another person obstructs it.",
    relatedNodes: ["character", "health", "anger", "justice"],
    deep: {
      thesis:
        "Good character is recognized by a coherent pattern of qualities that remains visible when comfort, praise, and agreement disappear.",
      context:
        "After explaining diagnosis and treatment, Ghazali asks how health can be recognized in lived conduct. He draws signs from scriptural portraits and from the tests created by ordinary human friction.",
      moves: [
        {
          title: "Look for a constellation",
          body:
            "Good character is not reduced to cheerfulness, softness, or one admired habit. The section gathers humility, truthfulness, patience, restraint, generosity, and other mutually supporting qualities.",
        },
        {
          title: "Test beyond favorable conditions",
          body:
            "A person may appear patient when nothing opposes the will. Injury, provocation, disagreement, and loss reveal whether anger and appetite remain under sound rule.",
        },
        {
          title: "Avoid premature certification",
          body:
            "One or two changes can be real without completing the work. Character is a stable inward form, so its signs must be read across time and situations.",
        },
      ],
      distinction: {
        title: "A gentle presentation and a sound inward order can diverge",
        firstLabel: "Favorable presentation",
        first:
          "Charm, calm speech, or selective generosity may appear where there is little cost and disappear when status or desire is threatened.",
        secondLabel: "Tested character",
        second:
          "The powers remain ordered when circumstances create real pressure, and the connected virtues support one another rather than appearing in isolation.",
      },
      misreading:
        "Testing character does not mean engineering harm or becoming suspicious of every good act. It means refusing to make a final judgment from the easiest sample.",
      observation:
        "Compare the same quality in two settings: one where you feel respected and one where you feel overlooked. What changes in speed, tone, and justification?",
      sourceAnchor: "Book 22, section 9, the signs by which good character is recognized.",
    },
  },
  {
    id: 10,
    shortTitle: "Formation begins early",
    formalTitle: "Disciplining children in early growth and improving their character",
    overview:
      "Ghazali describes the child as an impressionable trust whose early habits, teachers, companions, rewards, and surroundings shape later character. The section belongs to a medieval pedagogical setting and should be read as a historical account, not copied as a universal modern parenting manual.",
    points: [
      "Early formation matters because repeated patterns have not yet become deeply fixed.",
      "Example, companionship, environment, and habituation educate alongside explicit instruction.",
      "The chapter's enduring formation model must be distinguished from every period-specific disciplinary detail.",
    ],
    reflection:
      "Whether considering a child or an adult learner, ask what the surrounding environment praises, rehearses, and makes easy each day.",
    relatedNodes: ["habit", "company", "character", "cultivation"],
    deep: {
      thesis:
        "Character begins forming before abstract explanation can carry the work, through repeated action, admired examples, companions, and the moral shape of the environment.",
      context:
        "Ghazali applies the book's theory of habituation to early education. The child is described as receptive to impressions, which gives parents and teachers responsibility for the patterns that become familiar and pleasurable.",
      moves: [
        {
          title: "Recognize early receptivity",
          body:
            "The child's inward life is presented as open to formation. Habits laid down early can become easier to sustain than habits addressed only after they harden.",
        },
        {
          title: "Teach through a whole environment",
          body:
            "Food, dress, praise, restraint, study, play, example, and daily rhythm all participate in formation. Education is therefore larger than verbal instruction.",
        },
        {
          title: "Choose company carefully",
          body:
            "Companions transmit what is admired and normal. This continues the earlier claim that character can pass through observation and association without a formal lesson.",
        },
        {
          title: "Guide habits toward inward love",
          body:
            "The goal is not permanent external control. Repeated fitting action should help the learner come to recognize and prefer what is good.",
        },
      ],
      distinction: {
        title: "An enduring formation principle sits inside a historical pedagogy",
        firstLabel: "Enduring claim",
        first:
          "Early habits, examples, companions, and environments exert strong formative power before a person can fully articulate their influence.",
        secondLabel: "Period-specific detail",
        second:
          "Particular corrective practices reflect Ghazali's medieval context and require ethical, legal, developmental, and scholarly judgment before any modern application.",
      },
      misreading:
        "Do not convert a descriptive presentation of medieval pedagogy into blanket parenting instructions. Preserve the chapter's argument about formation while reading its concrete methods in context.",
      observation:
        "Study one repeated environment rather than one isolated lesson. What does it reward, what does it normalize, and what kind of response does it make easy?",
      sourceAnchor: "Book 22, section 10, early education and the formation of children's character.",
    },
  },
  {
    id: 11,
    shortTitle: "How the path begins",
    formalTitle: "The conditions of aspiration and the gradual path of discipline",
    overview:
      "The closing section turns from general theory to the beginning of a seeker's path. Resolve must be grounded in certainty, obstacles must be addressed, duties and guidance must structure the effort, and training proceeds gradually rather than through unmeasured intensity.",
    points: [
      "A durable beginning requires a clear aim and conviction strong enough to organize action.",
      "Guidance, companionship, and established duties protect effort from self-invention and drift.",
      "The path is gradual because hidden faults and capacities become visible by stages.",
    ],
    reflection:
      "A dramatic beginning can feel powerful while remaining unstructured. Ask what will still guide the effort when intensity falls.",
    relatedNodes: ["cultivation", "company", "habit", "knowledge"],
    deep: {
      thesis:
        "A serious path begins when clear aspiration is given structure: obstacles are removed, obligations are secured, guidance is accepted, and effort advances by stages.",
      context:
        "The final section gathers the book's mechanisms into a beginning regimen for the seeker. Ghazali is not offering a burst of inspiration, but conditions under which intention can survive contact with habit and daily life.",
      moves: [
        {
          title: "Anchor the aim",
          body:
            "Aspiration grows from certainty about the worth of the destination. Without a governing aim, discipline is easily redirected by the next attractive object or uncomfortable demand.",
        },
        {
          title: "Address the barriers",
          body:
            "Attachments, unresolved obligations, and disordered routines can consume the attention needed for training. The path begins partly by identifying what repeatedly blocks it.",
        },
        {
          title: "Accept structure and guidance",
          body:
            "Established duties, sound companionship, and a discerning guide keep effort connected to knowledge. They also counter the learner's limited view of hidden faults.",
        },
        {
          title: "Advance by stages",
          body:
            "Training reveals the next obstacle as capacity grows. Gradual progression allows the remedy to fit the actual condition rather than an imagined version of the self.",
        },
      ],
      distinction: {
        title: "Intensity can begin an effort, but structure carries it",
        firstLabel: "Sudden resolve",
        first:
          "A strong moment can expose what matters and create movement, yet it may fade before habits, duties, and obstacles have been reorganized.",
        secondLabel: "Governed aspiration",
        second:
          "A clear aim is translated into obligations, guidance, companionship, and gradual practices that can continue when emotion changes.",
      },
      misreading:
        "The path is not a license to invent severe private exercises. The section assumes religious duties, knowledge, guidance, and a measured progression fitted to the person.",
      observation:
        "Name the point where a worthy intention most often loses force: unclear aim, an unaddressed barrier, lack of structure, unsuitable pace, or isolation from honest guidance.",
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
  {
    label: "Primary Arabic text",
    note: "Public text used to verify the eleven-section sequence, definitions, analogies, and conceptual claims.",
    url: "https://ar.wikisource.org/wiki/%D8%A5%D8%AD%D9%8A%D8%A7%D8%A1_%D8%B9%D9%84%D9%88%D9%85_%D8%A7%D9%84%D8%AF%D9%8A%D9%86/%D9%83%D8%AA%D8%A7%D8%A8_%D8%B1%D9%8A%D8%A7%D8%B6%D8%A9_%D8%A7%D9%84%D9%86%D9%81%D8%B3_%D9%88%D8%AA%D9%87%D8%B0%D9%8A%D8%A8_%D8%A7%D9%84%D8%A3%D8%AE%D9%84%D8%A7%D9%82_%D9%88%D9%85%D8%B9%D8%A7%D9%84%D8%AC%D8%A9_%D8%A3%D9%85%D8%B1%D8%A7%D8%B6_%D8%A7%D9%84%D9%82%D9%84%D8%A8",
  },
  {
    label: "Forty-book structure",
    note: "Cross-check for the book's place after The Wonders of the Heart in the Quarter of Perils.",
    url: "https://www.ghazali.org/site/ihya.htm",
  },
  {
    label: "Published English edition",
    note: "T. J. Winter's translation of Books 22 and 23. Used for edition and title cross-checking; this app uses original English synthesis.",
    url: "https://its.org.uk/catalogue/al-ghazali-on-disciplining-the-soul-and-on-breaking-the-two-desires-paperback/",
  },
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
};
