import { assetUrl } from "./assetUrl";
import type { Chapter, ConceptNode, VisualModel } from "./data";
import type { Journey, RepentanceSubject, SourceLink, SystemBook, TaxonomyGroup } from "./systemTypes";

type Seed = {
  id: number;
  shortTitle: string;
  formalTitle: string;
  overview: string;
  moves: Array<{ title: string; body: string }>;
  closer: Array<{ title: string; body: string }>;
  distinction: [string, string, string, string, string];
  misreading: string;
  reflection: string;
  audit: string[];
  nodes: string[];
  model: VisualModel;
};

const pillarOf = (id: number) =>
  id <= 6 ? "Pillar One, repentance itself"
    : id <= 10 ? "Pillar Two, what is repented from"
      : id <= 15 ? "Pillar Three, completeness and permanence"
        : "Pillar Four, the remedy";

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
    thesis: seed.moves[0].body,
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
    sourceAnchor: `Book 31, ${pillarOf(seed.id)}, ${seed.formalTitle}.`,
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

export const book31Chapters: Chapter[] = [
  makeChapter({
    id: 1, shortTitle: "Knowledge, regret, act", formalTitle: "The reality of repentance and its definition",
    overview: "Ghazali opens the Quarter of Deliverance by defining repentance as a compound rather than a feeling. It is three ordered things, and the order is causal: the first necessitates the second and the second the third.",
    moves: [
      { title: "Begin with knowledge", body: "Knowing how much damage sins do, and that they stand between you and everything you love. By knowing, Ghazali means belief plus certainty: believing that sins are poison, and being certain enough that the belief is firm, free of doubt, and running the show." },
      { title: "The state that follows", body: "When that knowledge is realised, a pain arises in the heart at the loss of what it loves. Where the loss came about by the person's own act, the pain attaches to the act, and pain at one's own act for having lost one's beloved is what the word regret means." },
      { title: "The act that follows the state", body: "When that pain dominates, a will arises toward action, and the action faces three ways at once: toward the present, by leaving the sin he is engaged in; toward the future, by resolving to leave it to the end of his life; and toward the past, by repairing what was lost, where it admits of repair." },
      { title: "Say why the order matters", body: "The three are ordered in their occurrence, and the name repentance is applied to the whole. Removing the first leaves a remorse without diagnosis; removing the third leaves a feeling that changed nothing." },
    ],
    closer: [
      { title: "Why regret alone is sometimes called repentance", body: "The report that regret is repentance names the middle term for the whole, because regret never lacks the knowledge that produced it nor the resolve that follows it. Ghazali's phrase is that regret is flanked by its two sides, its fruit and what fruited it." },
      { title: "The image he gives", body: "Picture somebody in the dark when sunlight suddenly breaks over him — a cloud parting, a curtain pulled back — and he sees the thing he loves about to be destroyed. Love flares up in him and gets him on his feet to save it. The light is the knowing; the flare is the regret." },
    ],
    distinction: ["Two things called repentance", "The compound", "Knowledge produces regret, regret produces an act facing present, future, and past.", "The feeling alone", "Regret is present and neither the diagnosis behind it nor the action after it has arrived."],
    misreading: "Do not conclude that a person must feel a particular intensity for repentance to count. What Ghazali specifies is a structure with three parts, not a measure of emotion.",
    reflection: "Take one thing you have repented of and check it against the three. Most failures are at the third part, and within the third, at the face that looks backward.",
    audit: ["Do I actually know why this is harmful, or only that it is?", "Is my regret about the act or about being found out?", "Have I stopped, in the present tense?", "What does the past-facing part require of me here?"],
    nodes: ["tawba", "knowledge", "regret"],
    model: chain("The three parts, in order", "Each is caused by the one before it, which is why the order cannot be rearranged.", [["Knowledge", "That sins are a veil between you and everything you love.", "support"], ["Regret", "Pain at the loss, attaching to your own act as its cause.", "balance"], ["The act", "A will arising from that pain, facing present, future, and past together.", "support"]]),
  }),
  makeChapter({
    id: 2, shortTitle: "Why it is required", formalTitle: "The obligation of repentance and its excellence",
    overview: "Having defined it, Ghazali establishes that repentance is obligatory and gathers what is said of its worth. The section is testimony rather than technique, and it sets the register for the whole quarter.",
    moves: [
      { title: "Establish the obligation", body: "Repentance is not presented as a devotional extra for those inclined to it, but as something owed, which is why the sections that follow can ask when it is owed and by whom." },
      { title: "Gather its worth", body: "The reports assembled place the returning servant in a position that the never-fallen would not obviously occupy, which is the note the quarter opens on." },
      { title: "Connect it to the quarter's structure", body: "The Quarter of Perils diagnosed the diseases. Repentance is placed first among the saving qualities because it is the movement by which anything diagnosed there can begin to be treated." },
      { title: "Keep the definition in view", body: "Everything praised here is the compound of the previous section. The excellence attaches to the three-part return, not to the feeling that sometimes stands in for it." },
    ],
    closer: [
      { title: "Where this book sits", body: "It is the first of the ten books of the Quarter of Deliverance, and Ghazali's own closing sentence in Book 21 names what fills a purified heart: thankfulness, patience, fear, hope, poverty, detachment, love, contentment, longing, trust, reflection, and self-accounting. Repentance is the door those enter by." },
      { title: "Testimony before method", body: "As with the opening of Book 22, the reports come first because the reader has to want the thing before the analysis of conditions, classes, and remedies will be read as anything but bookkeeping." },
    ],
    distinction: ["Two ways of hearing the excellence", "As a reason to begin", "The worth attaches to the return, which is available now and is what the reports are urging.", "As a reason to delay", "The generosity is read as making the return unnecessary, which Book 30 treats at length as delusion."],
    misreading: "Do not read the praise of the repentant as encouragement to fall in order to return. The next sections make the obligation immediate and universal, which forecloses that reading.",
    reflection: "Notice whether the excellence of repentance makes you more likely to repent this week or less. That reading is the whole subject of Book 30.",
    audit: ["What have I been meaning to return from?", "Does hearing this move me or settle me?", "What am I treating as optional that is owed?", "Which diagnosis from the last quarter have I never acted on?"],
    nodes: ["tawba", "obligation"],
    model: pair("Two ways the same reports land", "Book 30's criterion applies directly here.", [["It moves you to return", "The expectation urges toward repentance, which is hope.", "support"], ["It settles you where you are", "The expectation produces slackness, which is delusion.", "warning"]]),
  }),
  makeChapter({
    id: 3, shortTitle: "All three parts", formalTitle: "That repentance is obligatory in all three of its parts",
    overview: "Ghazali returns to the definition to make a point about obligation. It is not enough that repentance be owed as a whole; each of the three parts is separately required, and regret is inside the obligation rather than a spontaneous accompaniment to it.",
    moves: [
      { title: "State the claim", body: "Knowledge, regret, and abandonment are each obligatory, and the obligation is not discharged by supplying two of them." },
      { title: "Answer the obvious objection", body: "Regret looks like a feeling, and feelings are not commanded. Ghazali's answer runs through the causal order: regret is produced by knowledge, and knowledge is within reach, so what is required is the work that produces the state." },
      { title: "Locate what is actually in a person's hands", body: "This is why the first part carries so much weight. A person who cannot summon regret directly can attend to what sins are and what they cost, and the state follows the knowledge." },
      { title: "Keep the third part from shrinking", body: "Abandonment is not only stopping. It carries the future-facing resolve and the past-facing repair, and a repentance that omits either is incomplete in the part most easily declared complete." },
    ],
    closer: [
      { title: "Why the parts are separated at all", body: "Because they fail separately. A person may know and not grieve, grieve and not stop, stop and never repair, and each of those is a different problem with a different treatment." },
      { title: "The practical consequence", body: "It makes repentance checkable. The definition can be run over a particular sin and the missing limb named, which is what the instrument attached to this book does." },
    ],
    distinction: ["Two ways a feeling can be required", "Directly commanded", "The state is demanded as such, which would make it arbitrary to require.", "Required through its cause", "What is commanded is the knowledge that produces it, which is within reach and can be worked at."],
    misreading: "Do not conclude that someone who does not feel regret is beyond repentance. Ghazali's structure points him at the first part rather than telling him the door is shut.",
    reflection: "If regret will not come, work at the first part instead of waiting. On this account the state follows the seeing.",
    audit: ["Which of the three do I supply easily?", "Which do I habitually skip?", "Am I waiting for a feeling I could be causing?", "Have I called stopping the whole of the third part?"],
    nodes: ["tawba", "knowledge", "regret"],
    model: chain("Three parts, three separate failures", "Naming them apart is what makes the fault locatable.", [["Knowledge missing", "The sin is not seen as harmful, so nothing follows.", "warning"], ["Regret missing", "It is known and does not touch, which points back to the first part.", "warning"], ["Abandonment missing", "It is known and felt and continues.", "warning"], ["Repair missing", "It stopped and the past was left where it lay.", "warning"]]),
  }),
  makeChapter({
    id: 4, shortTitle: "Immediately", formalTitle: "That the obligation of repentance is immediate",
    overview: "Ghazali argues that repentance is owed at once rather than at some point, and the argument matters because deferral is the ordinary form of refusal. Almost nobody declines to repent; a great many intend to later.",
    moves: [
      { title: "State the claim", body: "The obligation falls due immediately, not at leisure, and delay is itself a further matter rather than a neutral interval." },
      { title: "Give the reason from the nature of sin", body: "If sins stand between you and everything you love, then every hour you put it off is an hour of that separation chosen deliberately — which is a different thing from the original slip." },
      { title: "Name the mechanism of delay", body: "Deferral works by keeping the intention alive while never letting it become the act. Ghazali returns to this at the end of the book as the knot that the whole fourth pillar exists to untie." },
      { title: "Close the exit", body: "The person who intends to repent later is not in a neutral state. He is persisting, with an intention attached, and the intention is what makes the persistence tolerable to him." },
    ],
    closer: [
      { title: "Why this comes before everything practical", body: "Every later section, on conditions, classes, and remedies, presupposes that the reader has begun. Placing immediacy this early removes the frame in which the rest could be read as information for later use." },
      { title: "The soul that defers has a name", body: "In the account of the four classes, the third is called the soul that makes things fair to itself, which regrets after the act, says it will repent, and puts it off day after day. The whole apparatus of delay is treated there as a class of person rather than an accident." },
    ],
    distinction: ["Two states that look alike", "Repenting", "The three parts are supplied now, whatever the person's confidence about the future.", "Intending to repent", "The parts are postponed and the intention is doing the work of making the delay bearable."],
    misreading: "Do not read immediacy as a demand for a complete and final transformation this hour. What is owed now is the return; permanence is the subject of the third pillar.",
    reflection: "Name what you have been intending to stop. The interval between the intention and now is the subject of this section.",
    audit: ["What am I planning to repent of later?", "How long has later been the answer?", "What would have to be true for now to be possible?", "Does the intention make the delay easier to bear?"],
    nodes: ["immediacy", "delay"],
    model: pair("Two positions on the same sin", "The difference is not sincerity but tense.", [["Returned", "The three parts are supplied in the present.", "support"], ["Deferred", "The parts are scheduled, and the schedule is what makes continuing tolerable.", "warning"]]),
  }),
  makeChapter({
    id: 5, shortTitle: "Everyone, always", formalTitle: "That the obligation is universal in persons and in states",
    overview: "The third claim of the first pillar closes the last exit: there is no person and no condition exempt from repentance, and Ghazali says plainly that nobody is ever free of it.",
    moves: [
      { title: "State the universality", body: "The obligation is general across persons and across states, so that no one is detached from it at all." },
      { title: "Remove the exemption by rank", body: "Advancement does not exempt. The higher a person's knowledge of God, the greater the smallest opposition appears to him, which is the argument the section on magnifying minor sins develops." },
      { title: "Remove the exemption by condition", body: "Nor does a good condition exempt. Repentance is owed continually, which is why the third pillar treats permanence rather than treating repentance as an event." },
      { title: "Draw the practical consequence", body: "If no one is exempt, then the question is never whether repentance applies but only what it applies to, which turns the reader's attention to the second pillar." },
    ],
    closer: [
      { title: "Why universality is argued and not assumed", body: "Because the natural reading of the first two sections is that repentance is for those with something obvious to repent of. Ghazali forecloses that by making it a standing condition of being a servant rather than a response to an incident." },
      { title: "How this connects to Book 29", body: "The argument is the same one that dissolves pride there: certainty about one's own standing is unavailable, so security is not a position anyone occupies. Here that unavailability produces a continual return rather than a continual fear." },
    ],
    distinction: ["Two readings of who repentance is for", "A standing condition", "It comes with being human, and it applies in every condition and at every level.", "An occasional response", "It belongs to incidents, and a person without a recent incident has nothing to do."],
    misreading: "Do not read universality as a claim that everyone is equally at fault. What is universal is the obligation, not the content, and the second pillar is entirely about how the content differs.",
    reflection: "Ask what you would repent of if you accepted that there is always something. The speed of the answer is informative either way.",
    audit: ["Do I think of repentance as an event or a condition?", "When did I last repent without an obvious occasion?", "What do I consider myself past?", "What does my present rank actually exempt me from?"],
    nodes: ["universality", "tawba"],
    model: chain("Closing the exits", "The first pillar works by removing each place a reader might stand.", [["It is owed", "Not optional, and not a devotional extra.", "support"], ["It is owed now", "Deferral is a further matter, not a neutral interval.", "balance"], ["It is owed by everyone", "No rank exempts, and greater knowledge magnifies rather than excuses.", "balance"], ["In every state", "It is a standing condition rather than a response to incidents.", "support"]]),
  }),
  makeChapter({
    id: 6, shortTitle: "Necessarily accepted", formalTitle: "That repentance meeting its conditions is necessarily accepted",
    overview: "The first pillar closes on the question every reader is holding. Ghazali's answer is unusually firm: repentance that gathers its conditions is accepted without exception, and he argues this before the reader learns what the conditions are.",
    moves: [
      { title: "State the claim without hedging", body: "Every sound repentance is accepted, necessarily. The uncertainty a person feels is about whether his repentance was sound, not about whether sound repentance is received." },
      { title: "Relocate the anxiety", body: "This is the section's real work. It moves the reader's question from the unanswerable one, about what will be done with him, to the answerable one, about whether the three parts are actually present." },
      { title: "Support the claim from the sources", body: "Ghazali says the matter is clear to those with insight and then reinforces it with verses and reports, which is his usual order when a conclusion is likely to be resisted." },
      { title: "Note what is not being promised", body: "Acceptance of the repentance is not the same as removal of every consequence. The third pillar deals at length with rights owed to people, which acceptance does not discharge." },
    ],
    closer: [
      { title: "Why this belongs at the end of the pillar", body: "Placed here, it makes the second pillar's long anatomy of sins bearable. A reader who has been told his return will be received can afford to look closely at what he is returning from." },
      { title: "The boundary against Book 30", body: "Firmness here is not licence. What is guaranteed is the acceptance of a repentance that met its conditions, and the whole of Book 30 is about expectations that skip the condition and keep the guarantee." },
    ],
    distinction: ["Two uncertainties, only one of them real", "Whether it was sound", "This is examinable, and the rest of the book is the examination.", "Whether sound repentance is received", "This is settled, and treating it as open is where the anxiety misplaces itself."],
    misreading: "Do not turn the guarantee into a reason for confidence about your own case. It attaches to a repentance that met its conditions, and whether yours did is exactly what remains to be checked.",
    reflection: "If you are anxious about a past repentance, ask which of the two uncertainties you are actually holding.",
    audit: ["Which question am I really asking?", "Have I checked the conditions, or only the feeling?", "What rights of others did my repentance leave untouched?", "Am I converting a guarantee into a licence?"],
    nodes: ["acceptance", "conditions"],
    model: pair("Where the doubt belongs", "Ghazali settles one side so the other can be worked at.", [["Settled", "Repentance meeting its conditions is received without exception.", "support"], ["Open", "Whether a particular repentance met them, which is examinable.", "balance"]]),
  }),
  makeChapter({
    id: 7, shortTitle: "Sorting the sins", formalTitle: "The divisions of sins in relation to the servant's attributes",
    overview: "The second pillar turns to what is repented from. Ghazali sorts sins by the human attribute they arise from, which produces a classification useful for treatment rather than merely for description.",
    moves: [
      { title: "Sort by source, not by severity", body: "He sorts them by which of a person's own traits the sins come out of, which wires this book straight into the anatomy of the heart's forces in Book 21." },
      { title: "Show why the sorting matters", body: "Sins arising from different attributes need different treatments, since each is cured by opposing its own cause. A classification by outward severity would not tell a person what to do." },
      { title: "Separate the two directions of a sin", body: "Ghazali distinguishes what pertains to the rights of God from what pertains to the rights of other people, a distinction the third pillar depends on entirely." },
      { title: "Keep the purpose in view", body: "The anatomy exists so that a person can locate his own case. The pillar closes by asking what makes a small sin great, which is a question about a particular person's particular act." },
    ],
    closer: [
      { title: "Why this is not a list of prohibitions", body: "Books of rulings enumerate what is forbidden. This section asks where a sin comes from in the person committing it, which is the question a book on repentance has to answer if repentance is to be more than an apology." },
      { title: "The link back to the Perils quarter", body: "The attributes named are the ones the previous ten books diagnosed. Read together, the Perils quarter supplies the anatomy and this section supplies the sorting that makes it actionable." },
    ],
    distinction: ["Two ways to classify a wrong", "By its source", "The attribute it arises from, which indicates the treatment.", "By its severity", "Its gravity, which matters for the ruling and does not tell the person what to do next."],
    misreading: "Do not treat the sorting as a ranking of people by type. It classifies acts by origin so that a person can find which of his own faculties produced a particular one.",
    reflection: "Take a recent failure and name the attribute it came from rather than the rule it broke.",
    audit: ["Which faculty produced this?", "Does it touch God's right, a person's right, or both?", "Have I been treating the act and not the source?", "Which of the Perils quarter's books covers this?"],
    nodes: ["sins", "sources"],
    model: pair("Two directions of a single wrong", "The third pillar depends on keeping these apart.", [["Toward God's right", "Discharged by the return itself, on the terms of the first pillar.", "balance"], ["Toward a person's right", "Not discharged by the return; restitution is owed and is treated at length later.", "warning"]]),
  }),
  makeChapter({
    id: 8, shortTitle: "Minor and major", formalTitle: "The ruling on minor and major sins",
    overview: "Ghazali takes up the distinction everyone assumes and asks what it actually rests on. His treatment is careful, and it prepares the section that follows by showing how unstable the categories are in practice.",
    moves: [
      { title: "Grant the distinction", body: "The division into minor and major is real and is recognised in the sources, so the section does not begin by dissolving it." },
      { title: "Show that it is not a fixed list", body: "What makes a sin major is examined rather than assumed, and the examination shows the categories to be sensitive to circumstance in ways a fixed list would obscure." },
      { title: "Report the strongest opposing view", body: "Ghazali records the position of those who deny the distinction altogether, holding that every opposition is major relative to the majesty of the one opposed, and does not dismiss it." },
      { title: "Prepare the next question", body: "Once the categories are seen to move, the useful question is no longer which list a sin belongs to but what makes a small sin grow, which is where the pillar ends." },
    ],
    closer: [
      { title: "Why the instability is the point", body: "A reader who holds a fixed list can settle his own case by consulting it. Showing that the categories move forces the examination back onto the particular act and the particular person." },
      { title: "The saying that frames the next section", body: "There is no minor sin with persistence and no major sin with seeking forgiveness. Both halves cut against reading the categories as fixed properties of acts." },
    ],
    distinction: ["Two ways of using the distinction", "As a spectrum", "It indicates gravity while remaining sensitive to persistence, knowledge, and circumstance.", "As a list", "It settles a case by consultation, which is what the following section is written against."],
    misreading: "Do not conclude that the distinction is unreal or that all sins are equal. Ghazali keeps it and shows what it is sensitive to.",
    reflection: "Notice whether you have been using the category minor to settle a question or to describe one.",
    audit: ["What have I filed as minor, and on what authority?", "Would it still be minor after a year of it?", "Am I consulting a list to avoid an examination?", "Does my knowledge change the weight of this?"],
    nodes: ["minor", "major"],
    model: spectrum("A scale, not two boxes", "Ghazali keeps the distinction and denies it fixed edges.", [["Slight", "Real, and capable of growing by the causes named next.", "balance"], ["Grave", "Recognised as such, and reducible by seeking forgiveness.", "balance"], ["Ruinous", "The category no reader should be settling his own case against.", "warning"]]),
  }),
  makeChapter({
    id: 9, shortTitle: "How the weighing works", formalTitle: "How ranks and depths are distributed over good and evil deeds",
    overview: "The longest section of the second pillar takes up the mechanics of the reckoning. Ghazali is careful about what can and cannot be known here, and marks the boundary of his own account explicitly.",
    moves: [
      { title: "Set out the question", body: "How the outcomes are distributed across what a person did, and by what causes the distribution is affected." },
      { title: "Work from what is disclosed", body: "Ghazali's method is to follow what the Quran details and to stop where it stops, saying there is no exposition after God's exposition." },
      { title: "Mark the limits of the account", body: "He is explicit that some of this is supposition rather than certainty, and that certain knowledge of it belongs to the world of prophecy. The section is unusual in the quarter for how often it says so." },
      { title: "Return to the usable part", body: "What the reader can act on is not the arithmetic but the direction: that good deeds bear on evil ones, and that the causes affecting the weight are the ones the next section enumerates." },
    ],
    closer: [
      { title: "Why the reticence matters", body: "A book on repentance is under constant pressure to produce a calculus, because a calculus would let a reader settle his own position. Ghazali's refusal to supply one past the disclosed limit keeps the reader in the position the book wants him in." },
      { title: "The apparently conflicting reports", body: "He notes places where the transmitted material appears to conflict and declines to force a resolution, which is consistent with his stated boundary rather than an evasion." },
    ],
    distinction: ["Two uses for an account of the reckoning", "Direction", "It tells a person which way to move, which is what the disclosed material supports.", "Calculation", "It tells a person where he stands, which is what the material does not support and Book 30 treats as delusion."],
    misreading: "Do not extract a scoring system from this section. Ghazali repeatedly marks what is supposition, and a reader building a balance sheet from it is doing the thing the section is guarded against.",
    reflection: "Notice whether you want this section to tell you where you stand. That wanting is the subject rather than the reader.",
    audit: ["Am I looking for direction or for a verdict?", "What have I concluded about my own balance?", "Where have I built certainty on something reported as supposition?", "Would knowing the arithmetic change what I should do today?"],
    nodes: ["reckoning", "limits"],
    model: pair("Where the account stops", "The boundary is stated by Ghazali rather than imposed on him.", [["Disclosed", "What the Quran details, followed and not exceeded.", "support"], ["Withheld", "What belongs to prophecy, marked as supposition and left there.", "balance"]]),
  }),
  makeChapter({
    id: 10, shortTitle: "What makes a small sin big", formalTitle: "The causes by which minor sins become great",
    overview: "The second pillar closes with its most practical section. A small sin does not stay small on its own terms, and Ghazali enumerates exactly what enlarges it.",
    moves: [
      { title: "Persistence", body: "There is no minor sin with persistence and no major sin with seeking forgiveness. The image is drops of water falling on a stone in succession, which wear it, where the same quantity poured at once leaves no mark. And a great sin is rarely committed suddenly: the adulterer rarely without preliminaries, the killer rarely without prior enmity, so every great sin is flanked by small ones before and after." },
      { title: "Deeming it small", body: "Every sin a servant magnifies becomes small with God, because magnifying it issues from the heart's aversion, and aversion limits its effect; deeming it small issues from familiarity, and familiarity deepens the mark. The believer sees his sin as a mountain above him that he fears will fall; the hypocrite sees it as a fly that passed his nose and he waved away." },
      { title: "Delight and boasting", body: "Taking pleasure in it, exulting, and counting the ability to do it as a favour. Ghazali's examples are exact: did you see how I tore his reputation, and the disputant's did you see how I disgraced him." },
      { title: "Open display, and being followed", body: "Committing it openly is a further magnification. And the sin of one whose example is taken is multiplied through those who take it: the slip of a scholar is like the breaking of a ship, which sinks and drowns those aboard." },
    ],
    closer: [
      { title: "The proportion to knowledge", body: "A sin gets heavier the more the person committing it knows. What is serious from a scholar is not serious from someone ignorant, and what gets overlooked in an ordinary person does not get overlooked in someone who knows better. The line quoted puts it: do not look at how small the offence was, look at who you did it in front of." },
      { title: "The Israelite scholar", body: "A man who had led people astray with some novelty repented and spent years putting things right. The answer came: if your sin were between Me and you, I would forgive it — but what about the people you misled? Ghazali gets two duties out of that for anybody with followers: stop, and stop being seen doing it." },
    ],
    distinction: ["Two things a small sin can be", "An incident", "It happened, was seen as harmful, was disliked, and did not recur.", "A condition", "It persists, is thought little of, is enjoyed, and its mark deepens with each repetition."],
    misreading: "Do not use the list to conclude that your own small sins are already great, or that another's are. It is an enumeration of what to remove, and each item removed is a real reduction.",
    reflection: "Take one small habit you have never seriously counted and run the five causes over it.",
    audit: ["How long has this been going on?", "Do I think of it as nothing?", "Do I enjoy it, and would I mention it?", "Does anyone take their cue from me?"],
    nodes: ["magnifiers", "persistence", "minor"],
    model: chain("Five ways a small sin grows", "Each is a separate cause and each can be removed separately.", [["Persistence", "Drops on a stone; the same quantity at once leaves no mark.", "warning"], ["Deeming it small", "Familiarity replaces aversion, and the mark deepens.", "warning"], ["Delight in it", "Pleasure and boasting, counting the capacity as a favour.", "warning"], ["Open display", "Committing it where it is seen rather than concealing it.", "warning"], ["Being followed", "The example is taken, and the slip becomes a ship breaking.", "warning"]]),
  }),
  makeChapter({
    id: 11, shortTitle: "The sign of real regret", formalTitle: "The conditions of repentance and its permanence to the end of life",
    overview: "The third pillar asks what makes a repentance complete and what keeps it standing. Ghazali begins with the condition that cannot be faked and gives its outward sign.",
    moves: [
      { title: "Name the central condition", body: "Regret is the condition that carries the others, and Ghazali gives its mark plainly: the sign of sound regret is tenderness of the heart and abundance of tears." },
      { title: "Answer the natural objection", body: "Sins are acts desired by nature, so how does a person find their bitterness? The answer runs through the account of a corrupted appetite, which recoils from what is wholesome and craves what harms it, and the objection is answered by the reader's own experience rather than by assertion." },
      { title: "Extend the obligation over time", body: "The pillar's subject is permanence to the end of life, which converts repentance from an event into a condition to be maintained, exactly as the first pillar's universality suggested." },
      { title: "Distinguish stopping from repenting", body: "Ghazali is explicit that leaving a sin does not by itself expiate it. Leaving theft does not expiate theft; the regret and what follows it are what the expiation attaches to." },
    ],
    closer: [
      { title: "Why a sign is given at all", body: "Because regret is the part a person is most likely to claim without having. Supplying an outward mark makes the claim checkable by the person making it, which is the same move the whole quarter keeps making." },
      { title: "The sign is not the state", body: "Tears are named as a sign of regret, not as its substitute. Book 30's warning applies here as much as anywhere: a visible accompaniment of an inward state is available to be produced without it." },
    ],
    distinction: ["Two things that look like repenting", "Regret with its fruit", "The act is grieved, stopped, resolved against, and repaired where repair is possible.", "Cessation", "The act stopped, for whatever reason, and nothing attached to the past or to the heart."],
    misreading: "Do not treat the absence of tears as proof that regret is absent. Ghazali gives a sign of the state, not a test that returns a verdict when it fails.",
    reflection: "Ask whether your leaving of something was a repentance or merely a stopping, and what would have to be added to make it the first.",
    audit: ["Did I grieve this, or just stop?", "What made me stop, honestly?", "Has anything about the past been addressed?", "Do I still find it sweet?"],
    nodes: ["conditions", "regret", "permanence"],
    model: chain("From condition to sign", "The sign exists so that the condition can be checked from inside.", [["Knowledge of the harm", "The first part of the definition, which produces the rest.", "support"], ["Regret", "The condition that carries the others.", "balance"], ["Its sign", "Tenderness of heart and abundance of tears.", "balance"], ["Its fruit", "Leaving, resolving, and repairing, without which the state is only claimed.", "support"]]),
  }),
  makeChapter({
    id: 12, shortTitle: "What is owed to people", formalTitle: "Expiation, and making up what was taken from others",
    overview: "The hardest part of this pillar. Repentance settles what is between you and God on the terms already set out. It does not settle what you owe other people, and Ghazali does not soften the difference.",
    moves: [
      { title: "State the asymmetry", body: "What pertains to God's right is discharged by the return. What pertains to a person's right is not, and remains owed after the repentance is otherwise complete." },
      { title: "Describe the work required", body: "The wrongs are to be taken one by one, and the person is to search out those wronged through the regions of the world, seek their release, or repay them." },
      { title: "Give the reason the work matters", body: "If his good deeds do not suffice for the wrongs standing against him, the deficit is met from the other side, and he is destroyed by other people's evils. Ghazali presents this as the plain arithmetic of the matter." },
      { title: "Keep it within reach", body: "The instruction is not despair but enumeration. Wrongs are countable, people are findable, and the alternative to doing it one by one is leaving the whole of it standing." },
    ],
    closer: [
      { title: "How expiation actually works", body: "Ghazali notes that effacement is attested in the Law, where a killing is expiated by freeing a slave, and reasons from the attested cases rather than generalising a mechanism." },
      { title: "Why this is placed inside permanence", body: "Because restitution takes time. Putting it in the pillar on permanence makes the work part of what a maintained repentance consists of, rather than a condition to be satisfied before repentance can begin." },
    ],
    distinction: ["Two debts, one repentance", "God's right", "Settled by the three-part return, on the terms of the first pillar.", "A person's right", "Not settled by it, and standing until released or repaid."],
    misreading: "Do not read this as a claim that repentance is void until every wrong is repaid. The return is owed now; the repayment is the work that a maintained return contains.",
    reflection: "Write the list. Ghazali's instruction is that the wrongs are taken one by one, and a list is what one by one requires.",
    audit: ["Whom have I wronged, by name?", "What is actually owed, in what amount?", "Whom could I find this month?", "What have I been calling settled that was never released?"],
    nodes: ["restitution", "rights", "expiation"],
    model: pair("What the return does and does not discharge", "Ghazali keeps the two lines apart throughout.", [["Discharged", "What stands between the servant and God, on the stated conditions.", "support"], ["Still standing", "What is owed to people, until released by them or repaid.", "warning"]]),
  }),
  makeChapter({
    id: 13, shortTitle: "Repenting from some things", formalTitle: "Repenting from some sins while persisting in others",
    overview: "Ghazali takes up a set of hard cases about partial repentance, and reports the disagreement among scholars rather than smoothing it. The section is unusually procedural for this book.",
    moves: [
      { title: "Pose the case", body: "Whether a person can repent of one great sin while persisting in another, or of small sins while persisting in a great one he knows to be great." },
      { title: "Report that it is possible", body: "Ghazali holds that such a repentance is conceivable, since the person may genuinely believe what he is repenting of to be wrong while remaining overcome elsewhere." },
      { title: "Give the harder variants", body: "He presses the question further, into cases where the capacity for the sin has been removed rather than the desire, and where two repenters differ only in whether the pull toward the sin has quieted." },
      { title: "Record the disagreement", body: "Where the scholars differ he says so and gives the positions, which leaves the reader with a live question rather than a settled formula." },
    ],
    closer: [
      { title: "Why the cases are worth the space", body: "They are the cases readers actually occupy. Almost nobody repents of everything at once, and a treatment that only addressed total repentance would leave the ordinary situation unaddressed." },
      { title: "The question about the impotent man", body: "He asks directly whether somebody who has lost the capacity can repent of what he did with it — which isolates the real question: is repentance a change in what you want, or just the act stopping?" },
    ],
    distinction: ["Two reasons a sin has stopped", "The will turned", "The person no longer wills it, and would not resume if he could.", "The capacity went", "The act ceased because it became impossible, and the will was never addressed."],
    misreading: "Do not conclude that partial repentance is worthless, or that it is sufficient. Ghazali's point is that it is real, and the pillar on permanence is what it has to grow into.",
    reflection: "Ask of something you have left whether you would resume it if the obstacle disappeared. The answer distinguishes the two cases above.",
    audit: ["Would I go back to this if I could?", "Did I leave it or lose it?", "What am I repenting of while holding on to something else?", "Do I know the thing I am holding is wrong?"],
    nodes: ["partial", "will", "capacity"],
    model: pair("Two repenters, identical from outside", "Ghazali's test is what would happen if the obstacle lifted.", [["The will changed", "The pull has quieted, and the return would hold under opportunity.", "support"], ["The occasion changed", "The act stopped and the pull is intact, waiting on circumstance.", "warning"]]),
  }),
  makeChapter({
    id: 14, shortTitle: "Four kinds of returning", formalTitle: "The classes of servants in the permanence of repentance",
    overview: "Ghazali sorts the repentant into four ranks, and names each with the Quranic name of the soul in that condition. This is the section that connects the book back to the anatomy of Book 21.",
    moves: [
      { title: "The first class", body: "Somebody who repents and stays straight for the rest of his life, makes up what he let slide, and never talks to himself about going back — apart from the slips nobody is free of. This is what gets called sincere repentance, and this is the settled soul that returns to its Lord content." },
      { title: "The second class", body: "One who travels the road of uprightness in the main obediences and leaves all the great enormities, but is not free of sins that befall him, not deliberately and without a formed prior resolve; and whenever he falls he blames himself, regrets, grieves, and renews his resolve. This is the reproachful soul." },
      { title: "The third class", body: "One who repents, holds for a time, then is overcome in one or two appetites deliberately, while still keeping to the obediences and leaving much that he could do; afterwards he regrets and says he will repent and struggle, and his soul makes it fair to him and he defers day after day. This is the soul that makes things fair to itself." },
      { title: "The fourth class", body: "One who returns and does not regret, and here the deferral has stopped even pretending. This is the soul commanding to evil, and Ghazali places it outside the classes of the repentant proper." },
    ],
    closer: [
      { title: "Why the ranks are graded by return rather than by record", body: "The classes are not distinguished by how much a person sins but by what happens after. The second class falls and blames itself; the third falls and schedules; the difference between them is the whole subject of the fourth pillar." },
      { title: "The counsel against testing yourself", body: "Reporting the view that a sin is only expiated by facing the same opportunity ten times with real appetite and refusing, Ghazali says the weak aspirant should not take that road: the way is to flee the occasions from the beginning and to work at breaking the appetite, not to arrange the temptation and hope to hold." },
    ],
    distinction: ["Two responses to falling again", "Blame and renewal", "The fall is met with self-reproach and a renewed resolve, which is the second class.", "Regret and deferral", "The fall is met with a promise to repent later, which is the third and is where the book's last pillar is aimed."],
    misreading: "Do not use the classes to assign yourself a rank and settle. Ghazali gives them as descriptions of what happens after a fall, and what happens after the next one is not yet decided.",
    reflection: "After your last lapse, did you reproach yourself or schedule something? That is the question the four classes turn on.",
    audit: ["Which class describes what I actually do afterwards?", "How many times have I deferred this particular thing?", "Do I renew the resolve or renew the promise?", "Am I arranging occasions and hoping to hold?"],
    nodes: ["classes", "permanence", "musawwila"],
    model: chain("Four classes, graded by the aftermath", "Ghazali names each with the Quranic name of the soul in that condition.", [["The tranquil soul", "Upright to the end, apart from the slips no one is free of.", "support"], ["The reproachful soul", "Falls without prior resolve, blames itself, and renews.", "balance"], ["The soul that makes things fair", "Falls deliberately, regrets, and defers day after day.", "warning"], ["The soul commanding evil", "Returns and does not regret at all.", "warning"]]),
  }),
  makeChapter({
    id: 15, shortTitle: "When it happens again", formalTitle: "What the repentant should hasten to when a sin recurs",
    overview: "Ghazali closes the third pillar with the practical case the previous section identified. A person has repented and has fallen again, and the question is what to do in the hour after.",
    moves: [
      { title: "Take the case as normal", body: "The section assumes recurrence rather than treating it as a failure of the whole enterprise, which is consistent with the second and third classes being ordinary conditions." },
      { title: "Give the first move", body: "The repentance is renewed rather than reconsidered. What is at issue is the next hour, not a verdict on the previous months." },
      { title: "Add the counterweight", body: "The second move is to drive off the evil deed with a good one so as to efface it, so that the person is among those who mixed a righteous work with another that was bad." },
      { title: "Refuse the two exits", body: "Neither despair, which would end the striving, nor the deferral of the third class, which keeps the intention alive precisely so that the act need not happen." },
    ],
    closer: [
      { title: "Why immediacy returns here", body: "The first pillar's argument for immediacy is doing its work again. The hour after a lapse is exactly where deferral is most available and most damaging, because the intention feels like a response." },
      { title: "What the section protects against", body: "The reading that a broken repentance was never real, which converts a single lapse into a reason to abandon the whole. Ghazali's classes already allow for falling, and this section supplies what to do with it." },
    ],
    distinction: ["Two things to do after a lapse", "Renew", "The repentance is remade now and a good deed is put against the bad one.", "Reassess", "The whole return is put in question, which is the more comfortable option and ends the striving."],
    misreading: "Do not read the permission to renew as licence to expect renewal. It is a treatment for a recurrence, not a plan for one.",
    reflection: "Decide now what your first move will be the next time, since the decision is much harder to make in the hour itself.",
    audit: ["What did I do in the hour after the last lapse?", "Did I renew or did I reassess?", "What good act could I have put against it?", "Am I planning for recurrence or treating it?"],
    nodes: ["renewal", "recurrence"],
    model: chain("The hour after", "Ghazali specifies the sequence because the hour itself is where it is hardest to think.", [["It happened", "Deliberately or by being overcome; the class matters less than the next step.", "warning"], ["Renew at once", "The repentance is remade rather than reconsidered.", "support"], ["Put a good deed against it", "Driving off the bad with the good, effacing what can be effaced.", "support"], ["Refuse both exits", "Neither despair nor the promise to repent later.", "balance"]]),
  }),
  makeChapter({
    id: 16, shortTitle: "Why the knot holds", formalTitle: "The remedy of repentance, and the causes of persistence",
    overview: "The fourth pillar treats the reader who has understood everything so far and has still not moved. Ghazali diagnoses persistence before treating it, and reduces its causes to two.",
    moves: [
      { title: "Divide the readers", body: "People are of two kinds: one raised on good with no lapse, whom Ghazali calls rare, and one not free of committing sins, who divides again into the persistent and the repentant. The pillar is written for the first of those two." },
      { title: "State the method", body: "There is no cure without a remedy, and no remedy for one who has not identified the disease, since a remedy is nothing but the contradiction of the causes of the disease. Whatever arises from a cause is cured by dissolving that cause, and nothing is annulled except by its opposite." },
      { title: "Name the two causes", body: "There is no cause for persistence except heedlessness and appetite. Nothing opposes heedlessness but knowledge, and nothing opposes appetite but patience in cutting off the causes that stir it." },
      { title: "Give the compound", body: "So the remedy is a preparation kneaded from the sweetness of knowledge and the bitterness of patience, as oxymel combines the sweetness of sugar with the sourness of vinegar, each aiming at a different end, and the two together subduing what stirs the bile." },
    ],
    closer: [
      { title: "Why the diagnosis has to come first", body: "The book has already supplied a great deal of knowledge, and the reader who has not moved is not short of information. Naming appetite as the second cause explains why more of the first alone has not worked." },
      { title: "The specificity of the knowledge required", body: "Ghazali asks whether any knowledge dissolves persistence and answers that the sciences as a whole are remedies for the heart's diseases, but each disease has a knowledge proper to it, as medicine in general treats illness while each ailment has its own." },
    ],
    distinction: ["Two causes, two different remedies", "Heedlessness", "Opposed only by knowledge, which is why the book spends four pillars supplying it.", "Appetite", "Opposed only by patience in cutting off what stirs it, which no amount of further reading supplies."],
    misreading: "Do not conclude that a person who knows enough will therefore act. The section exists because that inference fails, and its answer is that half the remedy is not knowledge at all.",
    reflection: "Ask which of the two is actually holding your knot. If you can state the harm precisely and still do not move, it is the second.",
    audit: ["Do I not see it, or do I not want to stop?", "What am I still reading about instead of leaving?", "Which occasions am I keeping within reach?", "What would cutting off the causes actually mean this week?"],
    nodes: ["persistence", "heedlessness", "appetite"],
    model: pair("The compound remedy", "Two causes require two ingredients, and neither alone is the cure.", [["Sweetness of knowledge", "Against heedlessness, which nothing else opposes.", "support"], ["Bitterness of patience", "Against appetite, by cutting off the causes that stir it.", "support"]]),
  }),
  makeChapter({
    id: 17, shortTitle: "Four things to accept", formalTitle: "The treatment, and the conditions of being treatable",
    overview: "The book closes on a medical parallel worked out in detail. Ghazali sets out four things a sick person must assent to before treatment can begin, and gives the religious counterpart of each.",
    moves: [
      { title: "The first assent", body: "That sickness and health have causes reachable by choice, in the order the Causer of causes arranged. This is faith in the principle of medicine, and one who does not hold it will not undertake treatment at all. Its counterpart is faith that felicity has a cause, which is obedience, and wretchedness a cause, which is disobedience." },
      { title: "The second assent", body: "That a particular physician knows his art, is skilled in it, and is truthful in what he says, neither concealing nor lying. Faith in medicine as such does not help without this. Its counterpart is knowledge of the Messenger's truthfulness and that what he says is true." },
      { title: "The third assent", body: "Listening to the physician about what he warns against in general, until fear dominates and drives the person to abstain. Its counterpart is attending to what urges God-consciousness and warns against sins, until fear arises that is strong enough to carry the patience which is the other half of the remedy." },
      { title: "The fourth assent", body: "Listening to the physician about his own illness specifically, and what he in particular must avoid. Not every patient must abstain from everything and not every remedy benefits him; each ailment has a knowledge and a treatment of its own." },
    ],
    closer: [
      { title: "Why the fourth is the one most often missed", body: "The first three can be held in general and leave a person unchanged. The fourth requires knowing which sin is his, which is why the second pillar spent so long on sorting sins by their source." },
      { title: "How the quarter opens from here", body: "The remedy's second half is patience, and patience is Book 32. Ghazali's structure hands the reader directly on: the book that follows this one is the one that supplies what this one has just named as missing." },
    ],
    distinction: ["Two ways of accepting a treatment", "In general", "The principle is believed, the physician trusted, the warnings heard, and nothing changes.", "In particular", "The person knows which illness is his and what he specifically must leave, which is where treatment starts."],
    misreading: "Do not read the medical parallel as making religion a technique. Ghazali uses it because the structure of assent is the same, not because the two are the same kind of thing.",
    reflection: "Work the four in order on yourself and find where the assent stops being real. It is usually the fourth, and occasionally the third.",
    audit: ["Do I believe acts have consequences, or merely say so?", "Whose account of this do I actually trust?", "Has any warning produced fear that changed a choice?", "Do I know which illness is mine, specifically?"],
    nodes: ["treatment", "assent", "patience"],
    model: chain("Four assents before treatment", "Each is required, and the last is the one that makes the others operative.", [["The principle", "That causes reach outcomes, and treatment is therefore worth undertaking.", "support"], ["The physician", "That this particular one is knowledgeable and truthful.", "balance"], ["The general warning", "Heard until fear arises strong enough to carry patience.", "balance"], ["Your own case", "Which illness is yours, and what you in particular must leave.", "support"]]),
  }),
];

export const book31ConceptNodes: ConceptNode[] = [
  ["tawba", "Repentance", "A compound, not a feeling", "Knowledge produces regret, and regret produces an act facing present, future, and past."],
  ["knowledge", "Knowledge", "Sins as a veil", "Faith that sins are destroying poisons, held with certainty that dominates the heart."],
  ["regret", "Regret", "Pain at your own act", "The heart's pain at losing what it loves, attaching to the act that caused the loss."],
  ["obligation", "Obligation", "Owed, not offered", "Repentance is required rather than recommended, which is what makes the later questions live."],
  ["immediacy", "Immediacy", "Now, not later", "Delay is a further matter rather than a neutral interval before the same act."],
  ["delay", "Deferral", "The intention that permits", "An intention to repent later is what makes continuing tolerable."],
  ["universality", "Universality", "No rank exempts", "The obligation holds across persons and states, so it is a condition and not an incident."],
  ["acceptance", "Acceptance", "Settled on one side", "Repentance meeting its conditions is received; whether yours did is the open question."],
  ["conditions", "Conditions", "What makes it sound", "Regret carries the others, and its sign is tenderness of heart and abundance of tears."],
  ["sins", "Sins", "Sorted by source", "Classified by the attribute they arise from, which is what indicates the treatment."],
  ["sources", "The source", "Which faculty produced it", "The anatomy of the Perils quarter supplies what this sorting refers to."],
  ["minor", "Minor sins", "Small, and not stable", "A slight sin does not stay slight on its own terms."],
  ["major", "Major sins", "Real, and not a fixed list", "The distinction holds while remaining sensitive to persistence, knowledge, and circumstance."],
  ["reckoning", "The reckoning", "Direction, not arithmetic", "The disclosed material tells a person which way to move, not where he stands."],
  ["limits", "Stated limits", "Where the account stops", "Ghazali marks what is supposition and declines to exceed it."],
  ["magnifiers", "Five magnifiers", "What enlarges a small sin", "Persistence, deeming it small, delight, open display, and being followed."],
  ["persistence", "Persistence", "Drops on a stone", "The same quantity poured at once leaves no mark; falling in succession wears it."],
  ["permanence", "Permanence", "To the end of life", "The third pillar's subject, which converts repentance from an event into a condition."],
  ["restitution", "Restitution", "One by one", "The wrongs are enumerated and those wronged are sought out, released, or repaid."],
  ["rights", "Two debts", "God's right and a person's", "The return discharges the first and leaves the second standing."],
  ["expiation", "Expiation", "Attested, not generalised", "Ghazali reasons from the cases the Law attests rather than deriving a mechanism."],
  ["partial", "Partial repentance", "Real, and not sufficient", "Repenting of one thing while holding another is possible and has to grow."],
  ["will", "The will", "What actually turned", "Whether the pull has quieted, or only the opportunity has gone."],
  ["capacity", "Capacity", "The obstacle that stopped it", "An act that ceased because it became impossible leaves the will unaddressed."],
  ["classes", "Four classes", "Graded by the aftermath", "What happens after a fall, not how much a person falls."],
  ["musawwila", "The soul that makes things fair", "Regret, then deferral", "The third class, which schedules repentance day after day."],
  ["renewal", "Renewal", "The hour after", "The repentance is remade rather than reconsidered, with a good deed put against the bad."],
  ["recurrence", "Recurrence", "Expected, not fatal", "A lapse is treated rather than taken as proof that the return was never real."],
  ["heedlessness", "Heedlessness", "Opposed only by knowledge", "The first of the two causes of persistence."],
  ["appetite", "Appetite", "Opposed only by patience", "The second cause, which no further reading addresses."],
  ["treatment", "The treatment", "Sweetness and bitterness", "Knowledge and patience kneaded together, as oxymel joins sugar and vinegar."],
  ["assent", "Four assents", "Before treatment can begin", "The principle, the physician, the general warning, and your own case."],
  ["patience", "Patience", "The half that is not knowledge", "Named here and supplied by Book 32, which follows immediately."],
].map(([id, label, kicker, description], index) => ({ id, label, kicker, description, position: ["left", "right", "top", "bottom"][index % 4] }));

const node = (id: string, label: string, micro: string, summary: string, guardrail: string, chapterId: number, glyph: Journey["nodes"][number]["glyph"]): Journey["nodes"][number] => ({ id, label, micro, summary, guardrail, chapterId, glyph });

export const book31Journeys: Journey[] = [
  {
    id: "what-counts", number: "01", question: "What actually counts as repentance?", title: "Assemble the three parts in order",
    description: "Take repentance apart into knowledge, regret, and act, see why the order is causal, and find which of the three your own returns habitually omit.",
    payoff: "You can check a repentance instead of hoping it was one.",
    image: assetUrl("assets/system/book31-three-parts.jpg"), imageAlt: "A luminous white-and-gold chamber where a lamp, a still basin, and a threshold opening three ways stand in a single line.", minutes: 12, color: "#bf7a35",
    nodes: [
      node("define-tawba", "Define it exactly", "A compound, not a feeling", "Knowledge, a state, and an act, ordered so that each produces the next.", "No particular intensity of feeling is being required.", 1, "name"),
      node("start-with-knowledge", "Start with knowledge", "Sins as a veil", "Certainty that sins stand between you and everything you love is what kindles the rest.", "By knowledge he means faith and certainty, not information.", 1, "know"),
      node("locate-regret", "Locate the regret", "Pain at your own act", "The heart grieves the loss, and grief at your own act as its cause is what regret means.", "Regret about exposure is a different thing.", 1, "mirror"),
      node("face-three-ways", "Face three ways", "Present, future, past", "The act leaves the sin now, resolves against it for life, and repairs what can be repaired.", "The past-facing limb is the one most often dropped.", 1, "order"),
      node("check-each-part", "Check each part", "They fail separately", "Knowing without grieving, grieving without stopping, and stopping without repairing are three different faults.", "Naming the missing limb is what makes treatment possible.", 3, "diagnose"),
    ],
  },
  {
    id: "too-late-too-soon", number: "02", question: "Is it too late, or too soon?", title: "Close every exit from the obligation",
    description: "Follow the first pillar's argument as it removes each place a reader might stand: repentance is owed, owed now, owed by everyone in every state, and received when its conditions are met.",
    payoff: "You lose the two most comfortable reasons for not beginning today.",
    image: assetUrl("assets/system/book31-open-door.jpg"), imageAlt: "A bright marble arcade of four successive arches, each narrower than the last, opening onto a lit and unbarred doorway.", minutes: 13, color: "#278d91",
    nodes: [
      node("it-is-owed", "See that it is owed", "Not a devotional extra", "Repentance is required, which is what makes the questions of when and by whom live ones.", "The praise of the repentant is not an invitation to fall.", 2, "name"),
      node("owed-now", "Owed immediately", "Deferral is not neutral", "Every hour of delay is a chosen hour of the separation the sin caused.", "What is owed now is the return, not a finished transformation.", 4, "resolve"),
      node("owed-by-all", "Owed by everyone", "No rank exempts", "Greater knowledge magnifies the smallest opposition rather than excusing it.", "Universal obligation is not equal fault.", 5, "clear"),
      node("in-every-state", "In every state", "A condition, not an incident", "Repentance is continual, which is why permanence gets a pillar of its own.", "This does not make a good condition suspect.", 5, "steady"),
      node("acceptance-settled", "Settle the doubt", "One side is closed", "Repentance meeting its conditions is received; what remains open is whether yours did.", "A guarantee about sound repentance is not a guarantee about yours.", 6, "receive"),
    ],
  },
  {
    id: "how-bad-really", number: "03", question: "How bad is this, really?", title: "Weigh a sin without a scoring system",
    description: "Sort sins by the faculty that produced them, see why minor and major will not hold still, refuse the calculus the reckoning does not supply, and learn the five causes that enlarge a small sin.",
    payoff: "You gain a way to weigh your own case that does not let you settle it.",
    image: assetUrl("assets/system/book31-drops-on-stone.jpg"), imageAlt: "A sunlit stone basin where slow water drops have worn a channel in the rim beside a full vessel poured out and leaving no mark.", minutes: 16, color: "#c25f50",
    nodes: [
      node("sort-by-source", "Sort by source", "Which faculty produced it", "Classifying sins by their origin indicates the treatment; classifying by severity does not.", "This sorts acts, not people.", 7, "pattern"),
      node("separate-two-rights", "Separate the two rights", "God's and a person's", "A wrong may face both directions, and only one of them is discharged by the return.", "The second direction is treated at length in the third pillar.", 7, "balance"),
      node("unfix-the-categories", "Unfix the categories", "A scale, not two boxes", "Minor and major are real and move with persistence, knowledge, and circumstance.", "The distinction is kept, not dissolved.", 8, "know"),
      node("refuse-the-calculus", "Refuse the calculus", "Direction, not arithmetic", "Ghazali follows what is disclosed and marks the rest as supposition.", "Wanting a verdict is the thing to notice here.", 9, "guard"),
      node("run-five-magnifiers", "Run the five magnifiers", "What enlarges a small sin", "Persistence, deeming it small, delight, open display, and being followed.", "Each removed is a real reduction.", 10, "diagnose"),
    ],
  },
  {
    id: "make-it-stick", number: "04", question: "What does it take to make it stick?", title: "Carry a return through repair and recurrence",
    description: "Find the condition that carries the others and its outward sign, take up what is owed to people, work the cases of partial repentance, and learn what to do in the hour after a lapse.",
    payoff: "You leave with the work a maintained repentance actually consists of.",
    image: assetUrl("assets/system/book31-ledger-and-road.jpg"), imageAlt: "An ivory courtyard where an open ledger and a small sealed purse rest beside a turquoise channel continuing through an open gate.", minutes: 17, color: "#586fa8",
    nodes: [
      node("find-the-sign", "Find the sign", "Tenderness and tears", "Regret carries the other conditions, and Ghazali gives it a mark you can check from inside.", "The sign is not the state and can be produced without it.", 11, "witness"),
      node("separate-stopping", "Separate stopping from repenting", "Leaving does not expiate", "Leaving theft does not expiate theft; what the expiation attaches to is the regret and its fruit.", "Ceasing for other reasons is a different thing.", 11, "clear"),
      node("list-the-wrongs", "List the wrongs", "One by one", "Those wronged are sought out and released or repaid, since the return does not discharge their right.", "The instruction is enumeration, not despair.", 12, "act"),
      node("test-the-will", "Test the will", "Would you resume?", "Whether the pull quieted or only the opportunity went is what separates two identical-looking repenters.", "Partial repentance is real and has to grow.", 13, "mirror"),
      node("plan-the-hour-after", "Plan the hour after", "Renew, do not reassess", "A lapse is met by remaking the repentance and putting a good deed against the bad.", "Permission to renew is not a plan for recurrence.", 15, "practice"),
    ],
  },
  {
    id: "why-dont-i-start", number: "05", question: "Why don't I start?", title: "Untie the knot with knowledge and patience",
    description: "Diagnose persistence before treating it, reduce its causes to two, take the compound remedy Ghazali prescribes, and work the four assents that have to be real before any treatment begins.",
    payoff: "You find out whether your obstacle is seeing or wanting, and stop applying the wrong half of the cure.",
    image: assetUrl("assets/system/book31-two-ingredients.jpg"), imageAlt: "A bright apothecary niche where a honey vessel and a vinegar flask stand either side of one shallow mixing bowl on a marble sill.", minutes: 15, color: "#a97837",
    nodes: [
      node("name-two-causes", "Name the two causes", "Heedlessness and appetite", "Persistence has no cause but these, and nothing annuls a thing except its opposite.", "The diagnosis has to precede the remedy.", 16, "diagnose"),
      node("take-the-compound", "Take the compound", "Sweetness and bitterness", "Knowledge against heedlessness and patience against appetite, kneaded together like oxymel.", "Neither ingredient alone is the cure.", 16, "health"),
      node("see-why-reading-failed", "See why reading failed", "Half is not knowledge", "A reader who can state the harm precisely and still does not move is held by the second cause.", "This is not an argument against knowing.", 16, "know"),
      node("work-four-assents", "Work the four assents", "Principle, physician, warning, case", "Each must be real, and the last is the one that makes the others operative.", "The parallel is structural, not a claim that religion is technique.", 17, "order"),
      node("find-your-own-case", "Find your own case", "Which illness is yours", "Not every patient must avoid everything, and each ailment has its own knowledge and treatment.", "Patience itself is supplied by the book that follows.", 17, "prepare"),
    ],
  },
];

export const book31Movements: TaxonomyGroup[] = [
  ["reality", "1. Reality of repentance", "Knowledge, regret, and an act facing three ways.", [1]],
  ["obligation", "2. Its obligation and excellence", "Owed rather than offered, and what is said of its worth.", [2]],
  ["three-parts", "3. All three parts obligatory", "Each is required and each fails separately.", [3]],
  ["immediate", "4. Owed immediately", "Deferral as a further matter rather than an interval.", [4]],
  ["universal", "5. Owed by everyone", "General across persons and states, with no exemption by rank.", [5]],
  ["accepted", "6. Necessarily accepted", "Sound repentance is received; soundness is the open question.", [6]],
  ["divisions", "7. Divisions of sins", "Sorted by the attribute they arise from.", [7]],
  ["minor-major", "8. Minor and major", "A real distinction without fixed edges.", [8]],
  ["distribution", "9. Ranks and depths", "What is disclosed, and where the account stops.", [9]],
  ["magnifiers", "10. What magnifies a small sin", "Persistence, belittling, delight, display, and being followed.", [10]],
  ["conditions", "11. Conditions and permanence", "Regret, its sign, and the difference from stopping.", [11]],
  ["restitution", "12. Expiation and restitution", "What the return discharges and what it leaves standing.", [12]],
  ["partial", "13. Partial repentance", "Repenting of some things while holding others.", [13]],
  ["classes", "14. Four classes", "The repentant graded by what happens after a fall.", [14]],
  ["recurrence", "15. When it recurs", "Renewing rather than reassessing, in the hour after.", [15]],
  ["persistence", "16. Why the knot holds", "Heedlessness and appetite, and the compound remedy.", [16]],
  ["treatment", "17. The four assents", "The conditions of being treatable, and your own case.", [17]],
].map(([id, label, description, chapterIds], index) => ({ id, label, description, chapterIds, color: ["#bf7a35", "#278d91", "#c25f50", "#586fa8", "#a97837"][index % 5] })) as TaxonomyGroup[];

const parts = (
  subject: string,
  knowledge: [string, string, string],
  regret: [string, string, string],
  present: [string, string, string],
  future: [string, string, string],
  past: [string, string, string],
): RepentanceSubject["parts"] => [
  { id: "knowledge", label: "Knowledge", limb: "First part", question: `Can you say precisely what the harm of ${subject} is, rather than only that it is wrong?`, present: knowledge[0], absent: knowledge[1], remedy: knowledge[2], chapterId: 1 },
  { id: "regret", label: "Regret", limb: "Second part", question: `Does ${subject} actually grieve you as your own act, rather than as something that might be discovered?`, present: regret[0], absent: regret[1], remedy: regret[2], chapterId: 11 },
  { id: "present", label: "Leaving it now", limb: "Third part, present", question: `Have you stopped, in the present tense, or is this a decision about the future?`, present: present[0], absent: present[1], remedy: present[2], chapterId: 4 },
  { id: "future", label: "Resolving for life", limb: "Third part, future", question: `Is the resolve for the rest of your life, or until circumstances change?`, present: future[0], absent: future[1], remedy: future[2], chapterId: 13 },
  { id: "past", label: "Repairing the past", limb: "Third part, past", question: `Has what this cost other people been repaired, released, or repaid?`, present: past[0], absent: past[1], remedy: past[2], chapterId: 12 },
];

export const book31RepentanceSubjects: RepentanceSubject[] = [
  {
    id: "taken", label: "Something taken", subject: "Money, time, work, or credit that was not yours",
    note: "This is the case where the fifth part bites hardest, since Ghazali holds that the return settles God's right and leaves a person's right exactly where it was.",
    parts: parts(
      "taking it",
      ["You can name the harm concretely, to a particular person, which is what makes the rest follow.", "You hold it as a rule rather than a harm, which is why nothing moves after you agree with the rule.", "Name who lost what, in what amount. The knowledge Ghazali means is the harm seen, not the prohibition known."],
      ["It grieves you as something you did, which is the pain Ghazali calls regret.", "What you feel is exposure or embarrassment, which attaches to being seen rather than to the act.", "Hold the person's loss in view rather than your position. Regret is produced by the first part, so work there."],
      ["It has stopped, now, and not from lack of opportunity.", "It is continuing while a decision about it is pending, which is the state the first pillar was written against.", "Stop today rather than deciding to. Ghazali's argument for immediacy is aimed exactly at this gap."],
      ["The resolve holds regardless of whether the opportunity returns.", "The resolve is contingent, and would not survive the return of the occasion.", "Cut off the occasions rather than testing yourself against them. Ghazali warns the weak aspirant against arranging the temptation."],
      ["It has been repaid, or released by the person, knowingly.", "This is the limb most repentances omit, and Ghazali says the wrongs are taken one by one and the wronged sought out.", "Write the list with names and amounts. Repay, or ask release from the person rather than assuming it."],
    ),
  },
  {
    id: "said", label: "Something said", subject: "Words that damaged someone's standing or trust",
    note: "Book 24 supplies the anatomy of the fault; this checks whether the return from it is complete. The past-facing limb is unusually hard here, since what was spread cannot simply be handed back.",
    parts: parts(
      "saying it",
      ["You can state what it cost the person rather than what rule it broke.", "You know it was backbiting and have never thought about the damage as damage.", "Follow the harm to the people who heard it. That is the knowledge this part requires."],
      ["The grief attaches to what you did to them.", "The discomfort is about your reputation for saying it, which is a different object.", "Take Book 24's test: would you say it to their face? The answer locates what your feeling is actually about."],
      ["You have stopped speaking of them this way.", "It continues in softer forms, or with different people.", "Stop the softer forms too. Ghazali's persistence magnifier applies to a habit that has merely changed register."],
      ["The resolve covers company where it would be easy and welcome.", "It holds where you would be judged and lapses where the room agrees with you.", "Decide in advance what you will do the next time a group is doing this, since the moment itself is too fast."],
      ["You have sought their release, or repaired the standing you damaged where it was heard.", "Nothing has been done about what is still circulating.", "Ghazali records the debate on whether to inform the person. Where telling would wound further, the repair is to correct the account with those who heard it and to seek their good."],
    ),
  },
  {
    id: "private", label: "A private habit", subject: "Something recurring that no one else knows about",
    note: "Here the fifth part is often genuinely empty, which is why this case tests the fourth so severely: nothing external will ever force the issue.",
    parts: parts(
      "the habit",
      ["You can say what it is doing to you, specifically, rather than that it is forbidden.", "You know the ruling and have never examined the harm, which is why agreeing with the ruling changes nothing.", "Ghazali's first part is the harm seen with certainty. Work out what this actually costs you before expecting anything to follow."],
      ["It grieves you as your own act even though no one is watching.", "The feeling arrives mainly when discovery seems possible.", "Since no audience is involved here, an absent regret points cleanly back to the first part rather than to shame."],
      ["It has stopped now rather than being scheduled to stop.", "You are between attempts, with an intention in place. Ghazali names this the soul that makes things fair to itself.", "The third class defers day after day. Break the pattern by making the next hour the subject rather than the next month."],
      ["The resolve is for life, and you have cut off what makes it easy.", "The resolve renews after each lapse and has never touched the occasions.", "Ghazali's remedy is patience in cutting off the causes that stir appetite. Remove an occasion this week rather than strengthening a resolve."],
      ["Nothing is owed to anyone here, so this limb is genuinely clear.", "Something is owed after all, to people affected in ways you have not counted.", "Where the limb is truly empty, say so and do not manufacture a debt. Where it is not, the second case applies."],
    ),
  },
];

export const book31Sources: SourceLink[] = [
  { label: "Primary Arabic text", note: "The complete public Arabic of Book 31 was read in full and used to establish the four pillars, the three-part definition, the causes that magnify a minor sin, the four classes of the repentant, and the closing medical parallel.", url: "https://shamela.ws/book/9472/1161" },
  { label: "The four pillars announced", note: "The page on which Ghazali sets out the book's own structure: the reality of repentance, what is repented from, the conditions and permanence, and the remedy for the knot of persistence. The definition follows immediately.", url: "https://shamela.ws/book/9472/1162" },
  { label: "What magnifies a minor sin", note: "The passage enumerating the causes by which a slight sin grows, including the image of drops falling on a stone in succession and the contrast between the believer's mountain and the hypocrite's fly.", url: "https://shamela.ws/book/9472/1191" },
  { label: "The four classes", note: "The passage sorting the repentant into four ranks and naming each with the Quranic name of the soul in that condition, including the soul that makes things fair to itself.", url: "https://shamela.ws/book/9472/1202" },
  { label: "The remedy", note: "The opening of the fourth pillar, reducing persistence to heedlessness and appetite and prescribing the compound of knowledge and patience.", url: "https://shamela.ws/book/9472/1208" },
  { label: "Forty-book structure", note: "Ghazali.org's listing places Book 31 as the first book of the Quarter of Deliverance and confirms its title.", url: "https://www.ghazali.org/listing-the-forty-books/" },
];


export const book31: SystemBook = {
  id: 31,
  title: "Repentance",
  shortTitle: "Repentance",
  defaultJourneyId: "what-counts",
  chapters: book31Chapters,
  conceptNodes: book31ConceptNodes,
  journeys: book31Journeys,
  sources: book31Sources,
  taxonomy: {
    title: "Seventeen source movements",
    note: "The filters follow Ghazali's own four pillars: six movements on repentance itself, four on what is repented from, five on completeness and permanence, and two on the remedy. The two long pillars are presented as several consecutive readings rather than one, at the joints his own text supplies.",
    groups: book31Movements,
  },
  repentanceCheck: {
    title: "The three-part check",
    note: "Ghazali defines repentance as knowledge, then regret, then an act facing present, future, and past at once. Take one thing you have repented of and check whether all five points are actually present. This locates a missing limb so the work can begin; it settles nothing about whether your repentance was accepted.",
    items: book31RepentanceSubjects,
  },
  editorialNote: "The five journeys, seventeen reading sections, visual models, and three-part check are editorial learning aids. The sequence preserves the four pillars Ghazali announces in his introduction. Because his first and third pillars are far longer than the others, each is presented as several consecutive readings at joints his own text supplies, rather than at an invented division. The English is an original synthesis made from a complete reading of the public Arabic text, not a translation and not a substitute for one. Reports and inherited anecdotes are presented as material Ghazali transmitted; this prototype does not independently grade every narration. Ghazali marks parts of his account of the reckoning as supposition rather than certainty and declines to exceed what is disclosed; where he stops, this synthesis stops, and no scoring of a person's standing is offered or implied. The three-part check cannot pronounce on acceptance, forgiveness, or what is owed in a particular case. Questions of restitution, rights between people, and legal obligation require the complete Arabic, a reliable full edition, and qualified scholarly guidance.",
};
