import { assetUrl } from "./assetUrl";
import type { Chapter, ConceptNode, VisualModel } from "./data";
import type { ConceptLab, FaultMirror, Journey, SourceLink, SystemBook, TaxonomyGroup } from "./systemTypes";

const book22Base: Chapter[] = [
  {
    id: 1,
    shortTitle: "Why character matters",
    formalTitle: "The excellence of good character and the blame of bad character",
    overview:
      "Ghazali begins by establishing the religious importance of character through Qur'anic passages, reports, and sayings. Character is not treated as decorative etiquette. It concerns the inward condition from which a person's conduct repeatedly emerges.",
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
            "Bad character is presented as an illness of the heart. Once it is put that way, everything that follows — the symptoms, the causes, the dose, the treatment — belongs to one continuous argument.",
        },
      { title: "Set up what must follow", body: "Quoting sources can establish that character matters; it cannot tell you what character is. So he closes the case for its importance and turns straight to defining it, because everything that follows — whether it can change, how it is treated, how you read its signs — depends on knowing what is being changed." },
      { title: "Note where character is being placed", body: "The point of gathering all this testimony is positional rather than decorative. Character usually sits at the edge of religion — the polish on somebody who has the important things right, admirable but not load-bearing. The reports place it near the middle: a man is asked what religion is and told it is good character; the heaviest thing on the scales is named as good character. Which means a person cannot be doing well at religion and badly at this." },
      { title: "See what calling it an illness commits him to", body: "And the way bad character is described settles the shape of the next ten sections. It is called a disease of the heart, and once that word is used the rest follows without further argument: a disease has symptoms, so there will be signs to read; it has causes, so there will be a diagnosis; it has a remedy, so there will be a treatment, and the treatment will have a dose. Every section in the book is one of those, and the medical frame is what holds them together." },
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
        "Do not use the praise and blame here to grade other people's personalities. Ghazali is building urgency for working on yourself, and the diagnosis starts there.",
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
    reflection:
      "Ask not only what you did, but what kind of inward arrangement made that response feel natural, difficult, attractive, or repellent.",
    relatedNodes: ["character", "knowledge", "anger", "appetite", "justice"],
    deep: {
      thesis:
        "Character is a durable inward form: the organized condition that makes certain actions flow easily and repeatedly.",
      context:
        "He separates the shape a person has on the outside from the shape they have on the inside. The visible one has parts; the inner one has powers, and whether it is sound depends on what those powers are like and how they stand to each other.",
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
        {
          title: "Note why a single act proves nothing",
          body:
            "The definition starts by refusing to read character off an action, and the reason is practical rather than technical. A man can do a generous thing once, under pressure, having thought hard about it — and nothing follows about what he is. What the word names is the settled place an act comes from, so that it arrives without the calculation being run again. Which is why the whole book is about changing a source rather than about changing behaviour.",
        },
        {
          title: "Follow the four capacities",
          body:
            "Four powers, and the fourth is not like the other three. Knowledge discerns, anger repels, appetite seeks — three functions, each with a job. Justice does not have a job of its own; it is the ordering of the other three so that each works in the right measure and the right place. Which means it cannot be strengthened directly. It is a relation among the others, and it is what fails first when any of them grows out of proportion.",
        },
        {
          title: "See why vice runs in both directions",
          body:
            "And placing vice on both sides of each power is what stops the book from becoming a manual for suppression. A power misses the mark by too much or by too little — so cowardice and recklessness are both failures of anger, and gluttony and a dead appetite are both failures of desire. A person who reads his own problem as having too much of something, and applies more force, may be moving away from the mean rather than toward it.",
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
    reflection:
      "Replace the question ‘Is this simply who I am?’ with the more exact question ‘What has this power been trained to do?’",
    relatedNodes: ["character", "anger", "appetite", "habit", "justice"],
    deep: {
      thesis:
        "The drives stay where they are. What discipline changes is where they point, how strong they get, and whether they do as they are told.",
      context:
        "This section answers the objection that people simply are how they are. He points at what training visibly does, and at how differently people take to it, to argue that character really can be formed — without pretending it is easy.",
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
      { title: "Keep the claim modest", body: "The argument establishes that character is receptive to discipline, not that any disposition can be remade at will or at speed. Ghazali's own conclusion is bounded: the roots remain, the measure changes, and the rate differs by temperament, habit, and conviction." },
      { title: "Take the argument against fixity", body: "The argument that character can change is put practically rather than metaphysically. If it could not, then advice, teaching and self-discipline would all be pointless activities — and everybody, including the people who say character is fixed, behaves as though they were not. We train children, correct servants, and expect improvement. The practice is the evidence, and a theory that makes the practice absurd is the thing that has to give." },
      { title: "Note what is not being claimed", body: "And the claim is fenced carefully at both ends, which is what keeps it honest. The roots stay — anger and appetite are not removed and are not meant to be, because a person who could not defend himself or want anything would be worse off, not better. What changes is the measure. And the rate differs by temperament, by how long the habit has run, and by whether the person has a belief propping it up — which is why the same treatment works quickly on one man and slowly on another." },
      { title: "See why belief makes a habit harder", body: "The hardest case named is the tendency that has a conviction defending it, and that is worth pausing on. An appetite indulged out of weakness is only a habit. An appetite indulged by somebody who has worked out a reason why it is fine has recruited the discerning power to its own side — which is the satanic combination the book on the heart described, and it means the faculty that was supposed to do the correcting is now the thing arguing against it." },
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
        "That it is possible does not mean it happens at the same rate for everyone. His argument leaves room for differences in temperament, in habit, in what you know, and in how deep a fault has its hooks in.",
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
    reflection:
      "Look for the small act whose repetition would teach the inward quality you want, rather than waiting to feel fully formed before acting.",
    relatedNodes: ["character", "habit", "company", "justice"],
    deep: {
      thesis:
        "Behaviour and character run in a loop: doing the right thing repeatedly trains the inner state, and once that state has formed it makes the right thing easier to do.",
      context:
        "After defending the possibility of change, Ghazali explains the general mechanism. Some people begin with a favorable disposition, while others acquire the same quality through practice and formative company.",
      moves: [
        {
          title: "Begin where action is possible",
          body:
            "You do the things a quality would produce before they come naturally. Repetition points the inner self in one direction over and over.",
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
        {
          title: "Note the order the method reverses",
          body:
            "The method starts at the one end where a person actually has purchase, and it reverses the order everybody assumes. You do not wait until you are generous and then give; you give, repeatedly, before it comes naturally, and the giving is what turns the inside. Which sounds like play-acting until you notice that no other route is available — nobody can reach in and adjust a disposition directly, and the limbs are the only part of the system that takes instructions.",
        },
        {
          title: "Take the comparison with a craft",
          body:
            "And the comparison to learning to write is exact rather than encouraging. Nobody writes well by understanding how; a person copies letters badly, many times, and the awkwardness gradually stops being awkward until the hand does it without being told. Character is claimed to work the same way — which also means the early stage is meant to feel forced, and feeling forced is not evidence the thing is not taking.",
        },
        {
          title: "See what the test of completion is",
          body:
            "And completion is defined by something a person can actually notice in himself: the fitting act is done readily and has stopped feeling like something imposed from outside. That is a higher bar than doing the right thing reliably, and a lower one than never feeling the pull the other way. What has changed is not that the appetite is gone but that acting against it is no longer the hard part of the day.",
        },
      ],
      distinction: {
        title: "Practice is formative, but performance can still be shallow",
        firstLabel: "Repetition alone",
        first:
          "Going through the motions stays on the surface if it is cut off from a real purpose, from attention, and from the quality you are trying to build.",
        secondLabel: "Formative repetition",
        second:
          "The act is repeated as training toward something you have actually named, backed by thinking about it and by the people around you, until the character starts to match.",
      },
      misreading:
        "Do not wait until it feels sincere or easy before you start. On this account, doing the right thing is one of the ways the inner quality gets built in the first place.",
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
        {
          title: "Note that diagnosis comes first",
          body:
            "The chapter's whole method turns on one instruction: find out what is actually wrong before prescribing anything. The guide is told to look at this person's character, his circumstances, his age, his habits and what dominates him — and the reason is that a generic exercise chosen without that will treat a disorder the man does not have. Which makes most general spiritual advice useless in exactly the way a general prescription is useless.",
        },
        {
          title: "Follow the rule of the contrary, and its limit",
          body:
            "And the rule is to treat by the opposite: a tendency hardened one way is corrected by repeated action the other way. A miser is not cured by withholding more. But the limit is stated in the same breath — the correction is still aiming at a just measure, not at the far extreme. A miser driven into reckless spending has changed which side of the mean he is failing on, and the book's own definition of vice makes that a failure too.",
        },
        {
          title: "Take the two concessions seriously",
          body:
            "And the two adjustments are what make the treatment usable on real people. The dose has to fit the case: what is medicine for one man is unnecessary for another and destabilising for a third. And where the full opposite cannot be sustained yet, a nearer and less damaging state is allowed as a bridge. Neither concession lowers the target. Both concede that a remedy nobody can take is not a remedy.",
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
        "The section includes hard exercises from the ascetic world Ghazali was writing in. They describe a programme people followed under supervision — not instructions to copy regardless of your judgement, your capacity, or your circumstances.",
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
        {
          title: "Note how the heart is assessed",
          body:
            "The test is borrowed from the body and it is the same test throughout: an organ is judged sick when it stops doing what it is for. An eye that does not see, a stomach that does not digest. So the heart is assessed by whether it is doing its own work — knowing, loving, choosing and worshipping well — rather than by how it feels. Which is what allows a person to be diagnosed while feeling perfectly comfortable.",
        },
        {
          title: "Follow why pleasure is not the test",
          body:
            "And the warning about pleasure is the sharpest thing in the section, because it removes the instrument everybody actually uses. A sick condition makes the thing that feeds it attractive, and the medicine unpleasant — so ease is evidence of nothing on its own. A man who finds his habits congenial and finds correction burdensome has described a symptom, not a diagnosis, and he will read it the wrong way round every time unless he is told.",
        },
        {
          title: "Take the instruction to stop",
          body:
            "And the last instruction is the one that is almost always missed: once the balance is reached, the same pressure applied further pushes the person into the opposite disorder. Treatment has an endpoint. Which follows directly from vice being possible on both sides — a remedy is a corrective force, and a corrective force that keeps running after the correction is made becomes the cause of the next thing needing correcting.",
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
        {
          title: "Note the problem the four routes address",
          body:
            "All four routes exist because of one difficulty: the faculty a person would use to inspect himself is the faculty that has been compromised. He cannot see his own character straight, and the harder the fault the better it is hidden. So every method here works by getting the information from somewhere outside — a guide, a friend, an enemy, or other people generally — and none of them relies on introspection.",
        },
        {
          title: "Take the commissioned friend seriously",
          body:
            "And the second route is more demanding than it sounds. It is not having honest friends; it is asking a trusted, intelligent, religious friend to watch you and report what he finds. That is a request most friendships cannot survive, and it converts the relationship from mutual reassurance into something with a job. Which is why the qualifications are stated — the wrong person given that commission does damage rather than good.",
        },
        {
          title: "Follow the use made of an enemy",
          body:
            "And the third is the cleverest. An enemy exaggerates and means harm, so nothing he says can be taken at face value. But resentment says the things flattery leaves out, and the useful response is neither belief nor dismissal but examination — go and look, and see whether there is anything there. It is a way of extracting information from a source with every reason to distort it, and it costs nothing but the willingness to check.",
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
      { title: "Note what opposition is not", body: "Refusing desire's command is not the destruction of desire, which the third section already ruled out. The testimony is gathered to support a change of rule rather than a change of nature — the appetite that returns to fitting service is the same appetite." },
      { title: "Note where the real problem is located", body: "The section makes a distinction that changes what is being treated. A desire can be present and not obeyed — that is the ordinary condition and it is not a disease. The problem arises when appetite starts recruiting the judgement: supplying reasons, producing excuses, and settling which way the person goes while looking like his own considered view. What is wrong is not the strength of the wanting but who is in charge." },
      { title: "See why resistance is prescribed", body: "And that explains why opposing desire is the treatment rather than merely a discipline. Refusing a desire's command does not weaken the desire much and is not meant to. It makes room for knowledge and justice to resume their functions — it breaks the chain by which appetite reaches the limbs, so the other faculties get a turn. The aim is an appetite that serves fitting ends in fitting measure, which is what it was created for." },
      { title: "Note what the testimony is not saying", body: "And the testimony gathered here is easy to misread as calling for the destruction of desire, which the third section already ruled out. The appetite that comes back into fitting service is the same appetite that was giving the orders. Nothing has been removed. What has changed is the order of authority, and that is what the whole body of religious testimony on striving against caprice is being brought to support." },
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
            "Good character is not just being cheerful, or being soft, or having one habit people admire. The section gathers humility, truthfulness, patience, restraint and generosity together, because they hold each other up.",
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
      { title: "Say what the signs are for", body: "The signs are diagnostic rather than certifying. They tell a person where the work still is, which is why the section is placed among the treatments and not at the end of the book as a conclusion." },
      { title: "Note why the signs come as a set", body: "Good character is not one quality and the section refuses to let it be. Humility, truthfulness, patience, restraint, generosity — listed together because each of them props up the others and any one of them alone is unreliable. A man can be gentle and dishonest, or generous and vain. What is being described is a whole condition, and a single admirable trait is as likely to be a temperament as an achievement." },
      { title: "Take the test seriously", body: "And the test is what separates this from a description of a pleasant person. Anybody looks patient when nothing is crossing him; the reading has to be taken under injury, provocation, contradiction and loss, because those are the conditions under which anger and appetite make their bid. Which means the signs cannot be checked at will — a person has to wait for the occasions, and the occasions are unwelcome." },
      { title: "See why the signs are placed here", body: "And they are diagnostic rather than certifying, which is why the section sits among the treatments rather than at the end of the book. Their function is to tell a person where the work still is. A reader looking for confirmation that he has arrived is using them for the one purpose they were not built for, and the warning against premature certification is aimed exactly at him." },
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
        {
          title: "Note why the child gets a section",
          body:
            "Placing a section on children inside a book about treating one's own character is not a digression — it is the same argument from the easier end. Everything the book has claimed about formation is most obviously true of a child: habits laid down early become easy, and correcting them later is harder in proportion to how long they have run. The child's case is the proof of the adult's method, observed where nobody disputes it.",
        },
        {
          title: "See how wide the account of teaching is",
          body:
            "And the list of what forms a child is deliberately broad: food, clothing, praise, restraint, study, play, the example in front of him, the shape of his day. None of that is instruction, and all of it teaches. Which follows from the book's own claim that character is caught by proximity before it is stated as a rule — the same reason the choice of companions is treated as a matter of formation rather than of company.",
        },
        {
          title: "Take the aim seriously",
          body:
            "And the aim named at the end is what keeps this from being a programme of control. The point is not a child who behaves because he is being watched; it is one who comes to recognise and prefer what is good, so the external management can end. Which is exactly the completion the book described for adults — the fitting act performed readily and no longer felt as an imposition — arrived at from the other direction.",
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
        "This describes how children were taught in Ghazali's time; do not take it as parenting advice. Keep the argument about when character forms, and read the specific methods as belonging to their period.",
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
        {
          title: "Note what aspiration rests on",
          body:
            "Aspiration is treated as a consequence rather than a virtue, and the consequence of something specific: being certain the destination is worth it. Which explains a failure everybody has watched. A person with no settled aim does not lack willpower; he has nothing for the willpower to serve, so the next attractive thing or the next uncomfortable demand redirects him, and each redirection feels reasonable at the time.",
        },
        {
          title: "Follow why the barriers come first",
          body:
            "And the path is described as beginning with clearing rather than with effort — attachments, unfinished obligations, a disordered routine. These are not moral failings and they are what consumes the attention training requires. Which is the same principle as the reservoir in the book on the heart: the work is often not adding something but removing what is standing in the room.",
        },
        {
          title: "See why the stages cannot be planned in advance",
          body:
            "And the last point is the one that governs the whole quarter. Training reveals the next obstacle as capacity grows — you cannot see what is wrong at the fourth stage from where you stand at the first, because the fault at the fourth is currently hidden behind the fault at the first. Which is why the remedy has to be fitted to the actual condition rather than to a person's picture of himself, and why a guide is worth more than a plan.",
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
      { title: "Why testimony comes before technique", body: "Ghazali opens with reports rather than method because the reader has to be persuaded that inward formation is worth sustained attention before any of the diagnosis or treatment that follows will be taken seriously." },
      { title: "The register he chooses", body: "Bad character is presented as an illness rather than a social inconvenience, which sets up the medical frame he uses for the rest of the book: balance is health, deviation is sickness, and treatment is by opposites." },
    ],
    audit: ["Which of my good qualities has only ever been tested cheaply?", "What appears in me when patience becomes expensive?", "Do I treat character as decoration or as condition?", "Whose account of my character am I relying on?"],
  },
  2: {
    model: chain("The four pillars", "Beauty of the inward form requires all four, as beauty of a face requires every feature.", [["Knowledge", "Discerning truth from falsehood in belief and right from wrong in action; its virtue is wisdom.", "support"], ["Anger", "Its contraction and expansion held to what wisdom requires; its virtue is courage.", "balance"], ["Appetite", "Disciplined under the direction of intellect and Law; its virtue is continence.", "balance"], ["Justice", "The power that holds the other two to wisdom's direction; its opposite is not excess but injustice.", "support"]]),
    closer: [
      { title: "The four things character is not", body: "Ghazali separates the act, the power, the knowledge, and the state of the soul, and identifies character as only the fourth. A generous man may not give, for want of money; a miser may give, for a motive or for show. Power stands equally toward giving and withholding, and knowledge stands equally toward the beautiful and the ugly." },
      { title: "Why justice has only one opposite", body: "Every other virtue is a mean with a vice on each side: anger's excess is recklessness and its defect cowardice, appetite's excess is greed and its defect frigidity, wisdom's excess is cunning and its defect stupidity. Justice alone has no two extremes; when it is lost there is one thing opposite it, and that is injustice." },
    ],
    audit: ["Which of the four pillars is weakest in me?", "Am I judging my character by acts or by what produces them?", "Where do I lean to excess, and where to defect?", "What would it cost me to do this easily rather than with effort?"],
  },
  3: {
    model: chain("Four ranks of difficulty", "Ghazali grades them by how much has to be undone before anything can be built.", [["Ignorant", "Distinguishes nothing yet and has not settled into appetite; needs only a teacher and a motive.", "support"], ["Ignorant and astray", "Knows the ugliness and is habituated to it; must uproot one habit and plant another.", "balance"], ["And corrupt", "Believes the ugly traits are obligatory and beautiful, and was raised on them.", "warning"], ["And evil", "Sees excellence in doing much harm and boasts of it; the hardest rank of all.", "warning"]]),
    closer: [
      { title: "The date-stone", body: "His answer to the claim that people cannot change. A date stone is neither an apple nor a palm tree — but it was made so that it becomes a palm if you tend it, and it will never become an apple however hard you try. Anger and appetite cannot be pulled out. They can be made manageable." },
      { title: "Why appetite is the hardest", body: "Two things make dispositions differ: the strength of the innate drive together with how long it has existed, and reinforcement by repetition and by believing the trait good. Appetite is oldest, created in the child at the beginning; anger comes around seven; discernment later. The oldest is the most disobedient to change." },
    ],
    audit: ["Which rank am I actually in?", "What am I calling my nature that is really my habit?", "Have I mistaken governing a drive for uprooting it?", "How long has this been in me, and does that change the method?"],
  },
  4: {
    model: chain("How a trait is acquired", "The route runs through effort and ends in ease, which is the test that it worked.", [["Choose the trait", "Name the disposition wanted rather than the single act.", "support"], ["Force the act", "Do what the generous person does, deliberately and against resistance.", "balance"], ["Persist", "Continue long enough that the resistance stops being the main fact.", "balance"], ["It becomes pleasant", "The generous person is the one who takes pleasure in giving, not the one who gives with dislike.", "support"]]),
    closer: [
      { title: "The two routes in", body: "Some are given the balance at the outset by divine generosity and completeness of nature, so that they know without being taught and are disciplined without discipline. Everyone else acquires it by struggle, which means carrying the soul to the acts the wanted disposition requires." },
      { title: "Where the method ends", body: "The stated goal is that the act issuing from a person becomes pleasurable to him. This is the same test Ghazali applies at the end of Book 29: an act still heavy while being done shows a person forcing himself, not yet a person formed." },
    ],
    audit: ["Which act am I performing that has not yet become easy?", "Have I persisted long enough for the question to be fair?", "Do I take pleasure in this, or only credit for it?", "What am I waiting to be given that I could be acquiring?"],
  },
  5: {
    model: pair("Two conditions, two tasks", "Ghazali takes the physician's division and applies it directly.", [["A sound soul", "The work is to lay down the regimen that preserves it and adds to its clarity.", "support"], ["A sick soul", "The work is to bring health to it, which means removing what is deviating and installing its opposite.", "balance"]]),
    closer: [
      { title: "Born balanced", body: "As the stomach is sound by nature and takes harm from what befalls it, every child is born balanced and sound in disposition, and the vices are acquired by habituation and teaching. This is why the treatment is described as a return rather than a construction." },
      { title: "Deficient and capable", body: "The body is not created complete but is perfected by growth and nourishment; the soul is created deficient and capable of perfection, and is perfected by upbringing, refinement of character, and nourishment by knowledge. The parallel governs the whole treatment section." },
    ],
    audit: ["Am I preserving or repairing right now?", "What dose does this particular fault need?", "Which of my remedies is fitted to someone else's illness?", "Where have I applied a general rule to a specific case?"],
  },
  6: {
    model: chain("Diagnosis by function", "Ghazali derives the heart's illness from what the heart was made to do.", [["Every organ has an act", "It was created for a specific function.", "support"], ["Illness is failure of that act", "The hand's illness is that it cannot grasp; the eye's, that it cannot see.", "balance"], ["The heart's act", "Knowledge, wisdom, love of God, and delight in remembrance preferred above every appetite.", "support"], ["So the heart's illness", "Something else has become dearer, or the appetite for its own food has fallen away.", "warning"]]),
    closer: [
      { title: "The stomach that prefers clay", body: "The sign of knowing God is love, and the sign of love is that nothing is preferred to Him. Whoever has something dearer to him than God has a sick heart, as any stomach to which clay has become dearer than bread and water, or whose appetite for bread and water has fallen away, is sick." },
      { title: "Why the disease became chronic", body: "Ghazali gives a chain of failures. Most do not know the heart's illness; if they know it, the bitterness of the remedy is hard, since the remedy is opposing appetites; and if they can bear that, they find no skilled physician, because the physicians are the scholars and the illness has taken them too. A sick physician rarely attends to his own cure." },
    ],
    audit: ["What is currently dearer to me than what I say is dearest?", "Has my appetite for the heart's own food fallen away?", "Do I know this illness, or only know of it?", "Whom am I taking treatment from, and are they well?"],
  },
  7: {
    model: chain("Four routes to a hidden fault", "Ghazali lists them in descending order of reliability and ascending order of availability.", [["A discerning teacher", "One who sees the soul's faults and is given authority over you; rare in this age.", "support"], ["A truthful friend", "Set as a watcher over your states, who tells you what he dislikes.", "balance"], ["Your enemies", "An angry eye brings out the ugly, so the hostile tongue reports what affection conceals.", "balance"], ["People generally", "Attribute to yourself whatever you find blameworthy among them, since natures are alike.", "support"]]),
    closer: [
      { title: "How the second route actually looked", body: "Umar used to say: God have mercy on a man who brings me my faults as a gift. He pressed Salman until he answered that he had joined two dishes at one table and kept two garments, one for day and one for night; and he asked Hudhayfa, who knew the hypocrites, whether he saw any mark of hypocrisy on him. Ghazali's comment is that the more complete a person's intellect and the higher his station, the less he admired himself and the more he suspected himself." },
      { title: "Why the routes are hard to keep open", body: "Friends are rarely usable: some envy, some have an interest and see as a fault what is not, and some flatter and conceal. Dawud al-Ta'i withdrew from people, asking what he should do with those who hide his faults from him. Ghazali adds that matters have reached the point where the most hateful person to us is the one who counsels us and names our faults, and that this almost declares a weakness of faith." },
    ],
    audit: ["Which of the four is actually open to me?", "When someone last named a fault of mine, what did I feel?", "What have my enemies said that was true?", "What do I dislike in others that is mine?"],
  },
  8: {
    model: pair("What the testimony establishes", "The point of the gathered reports is a method, not an atmosphere.", [["Treatment by opposition", "The remedy for a deviation is deliberate movement toward its contrary, carried until the mean is reached.", "support"], ["Treatment by resolve", "A wish to be better, held without any specific opposition being practised.", "warning"]]),
    closer: [
      { title: "Why this section is testimony rather than argument", body: "The method of opposing appetite has already been argued. What this section adds is that those who took the route reported the same thing independently, which is offered as evidence of a road rather than as a further proof." },
      { title: "The bitterness is the point", body: "Ghazali has already said the remedy of the heart is opposing appetites, and that this is the reason most people who recognise the illness still go untreated. The testimony gathered here is meant to make that cost look survivable." },
    ],
    audit: ["Which appetite is currently ruling this trait?", "What is its exact contrary, in an act I could do this week?", "Am I opposing it, or resolving to?", "What have I stopped doing because it was bitter?"],
  },
  9: {
    model: chain("How the sign is read", "Ghazali makes the test external so that it cannot be settled by feeling.", [["The premature verdict", "A little struggle leaves gross sins, and the person concludes he is refined.", "warning"], ["The stated equivalence", "Good character is faith and bad character is hypocrisy.", "support"], ["The described traits", "The Book describes the believers and the hypocrites, and those descriptions are the fruits of each.", "balance"], ["Present yourself", "Find all of them, none, or some, and work at what is missing while keeping what is there.", "support"]]),
    closer: [
      { title: "Why the test had to be written down", body: "The section exists because a person who has left obvious sins will suppose he has finished. Ghazali answers by giving a list that is not his own and against which the reader can be measured without consulting his own impression." },
      { title: "Partial results are expected", body: "The presence of all the traits is the sign of good character and the absence of all is the sign of its opposite; the presence of some indicates some. The instruction is to acquire what is missing and preserve what is present, which assumes a mixed result as the normal case." },
    ],
    audit: ["Which of the described traits do I actually have?", "Which did I assume I had?", "What did I conclude after leaving my most obvious fault?", "Am I measuring myself against a description or a feeling?"],
  },
  10: {
    model: chain("Why the early years carry so much", "Ghazali treats the child's heart as the most consequential thing entrusted to anyone.", [["A pure substance", "The child's heart is a precious jewel, empty of engraving and receptive to everything.", "support"], ["It inclines where it is bent", "Habituation and company decide which of the two directions become easy.", "balance"], ["The trust", "The child is a trust with those who raise him, and what is planted early is the hardest to change later.", "warning"], ["Gradual formation", "Instruction, company, and habit are applied by degrees rather than imposed at once.", "support"]]),
    closer: [
      { title: "Where this section sits in the argument", body: "It follows directly from the account of why dispositions differ. If a trait is reinforced by repetition and by believing it good, then the period in which repetition begins and beliefs are formed is the period in which the most is decided." },
      { title: "Why it is placed so late", body: "Ghazali gives the definition, the possibility of change, the method, and the diagnosis first. Only after the reader knows what character is and how it moves does the account of upbringing become instructions rather than sentiment." },
    ],
    audit: ["What am I habituating in someone who is watching me?", "What was habituated in me before I could examine it?", "Which of my beliefs about what is good was inherited whole?", "What am I imposing at once that should be given by degrees?"],
  },
  11: {
    model: chain("Why arrival fails", "Ghazali runs the failure backwards to its root.", [["No arrival", "The destination is not reached.", "warning"], ["Because no travelling", "The road is not actually being walked.", "warning"], ["Because no will", "Nothing in the person is pulling toward it.", "warning"], ["Because no faith", "Not the tongue's movement, but a seeing that makes the trade obvious.", "warning"]]),
    closer: [
      { title: "The bead and the jewel", body: "Whoever has a glass bead and sees a precious jewel loses his desire for the bead, and his will to trade it strengthens. Ghazali's point is that will is not summoned but follows sight, which is why he treats weak will as a symptom rather than a fault to be scolded." },
      { title: "What he means by faith here", body: "Not the speech of the soul and the tongue's movement with the two testimonies without truthfulness. That resembles a man who affirms the jewel is better than the bead while knowing only the word for the jewel, and such a man, being used to the bead, may well not let it go." },
    ],
    audit: ["Do I want this, or want to want it?", "What have I affirmed without having seen?", "Which bead am I used to?", "Who was supposed to show me the road, and did they?"],
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
  editorialNote: "The five journeys, eleven reading sections, visual models, and four mirrors are editorial learning aids. The eleven sections preserve the expositions Ghazali gives in his own order. The English is an original synthesis made from a reading of the public Arabic text, not a translation and not a substitute for one; the Islamic Texts Society publishes a complete English translation of this book together with Book 23, and a reader wanting the text itself should go there. Reports and inherited anecdotes are presented as material Ghazali transmitted; this edition does not independently grade every narration. Two scope notes. The section on disciplining children reflects eleventh-century household practice, including counsel on correction and on the shaping of a child's appetites that would cause harm if taken as parenting advice today; it is presented for its argument about when character is most receptive to formation, and none of its specific counsel is reproduced. And the book's central claim — that character is receptive to change — is offered by Ghazali as a theological and ethical position against those who held temperament fixed, not as a clinical claim about any particular difficulty. The four mirrors report where a fault might be seen; they cannot pronounce on whether a fault is present, and they are not a substitute for treatment. Complex personal cases require the complete Arabic, a reliable full edition, and qualified scholarly guidance.",
};
