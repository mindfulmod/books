import { assetUrl } from "./assetUrl";
import type { Chapter, ConceptNode, VisualModel } from "./data";
import type { Journey, SolitudeTrialItem, SourceLink, SystemBook, TaxonomyGroup } from "./systemTypes";

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
    sourceAnchor: `Book 29, ${seed.id <= 11 ? "Part One, on pride" : "Part Two, on conceit"}, ${seed.formalTitle}.`,
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

export const book29Chapters: Chapter[] = [
  makeChapter({
    id: 1, shortTitle: "A contested garment", formalTitle: "The censure of pride",
    overview: "Ghazali opens the book by gathering the censure of pride from the Quran and the prophetic reports. The severity is stated in the sharpest terms the material allows, and the reason given is not that pride is unpleasant company but that it lays a claim on a description belonging to God alone.",
    moves: [
      { title: "Name the contested attribute", body: "The censure is framed by the divine saying that greatness is a cloak and majesty a waist-wrapper, and that whoever contests them is broken. Pride is condemned as a claim, not merely as a bad manner." },
      { title: "State the measure", body: "The reports set the disqualifying quantity at a mustard seed's weight in the heart, which places pride among the conditions that cannot be safely held in reserve." },
      { title: "Locate it inwardly", body: "The sayings describe a swelling within the heart rather than an office, a reputation, or a visible rank, so the diagnosis cannot be read off a person's social position." },
      { title: "Turn the censure inward", body: "The early figures Ghazali quotes apply the warning to themselves. Abu Bakr's counsel that no Muslim should be belittled, because the small among them is great with God, keeps the reader from using the chapter on someone else." },
    ],
    closer: [
      { title: "Why the measure is so small", body: "The mustard seed is not rhetorical excess. Ghazali will argue in a later section that pride functions by closing off every other virtue at once, which is why any surviving portion is treated as decisive." },
      { title: "Reports gathered, not graded", body: "This section is a collection of transmitted censure. The synthesis reports what Ghazali assembled and the qualifications he attached, without independently grading each narration." },
    ],
    distinction: ["The censure has a precise object", "A contested attribute", "Pride is censured as a claim on greatness that belongs only to God.", "A social position", "Holding rank, competence, or public responsibility is not what these reports condemn."],
    misreading: "Do not read the severity as a verdict that every capable or well-regarded person is among those censured. The sayings describe an inward state the person may not yet have located in himself.",
    reflection: "Read one of these censures as addressed to you rather than to someone you already have in mind. Notice how quickly the mind reaches for a different subject.",
    audit: ["Whom did I picture when I read the censure?", "What claim about my own worth would I defend hardest?", "Where do I treat a rank as evidence of value rather than a task?", "Which person have I quietly filed as beneath consideration?"],
    nodes: ["kibr", "cloak"],
    model: pair("Two readings of the same censure", "The chapter is useful only in the register in which it was written.", [["Read as diagnosis", "The censure is applied to one's own heart, where the state can still be treated.", "balance"], ["Read as accusation", "The censure becomes a description of other people and stops working entirely.", "warning"]]),
  }),
  makeChapter({
    id: 2, shortTitle: "The gait and the hem", formalTitle: "The censure of strutting and displaying the marks of pride in gait and dress",
    overview: "Having stated the general censure, Ghazali turns to its most visible expression: a bearing that advertises the inward state. The reports condemn the trailing hem and the swaggering walk, and the anecdotes that follow all work by returning the strutting person to a plain fact about his own body.",
    moves: [
      { title: "Identify the outward tell", body: "Gait, the deliberately trailing garment, and the tilted bearing are named because they broadcast a claim of superiority without a word being spoken." },
      { title: "Note the corrective method", body: "Hasan al-Basri, Tawus, and Mutarrif each interrupt a strutting man not with a rule but with a reminder of what a body contains, begins as, and becomes." },
      { title: "Keep the target on intention", body: "The reports condemn the hem dragged in vainglory rather than a length of cloth in itself, which is why Ghazali later separates fine dress from the pride that may or may not accompany it." },
      { title: "Accept the correction plainly", body: "Umar ibn Abd al-Aziz answers Tawus by admitting that the walk was learned limb by limb, and abandons it. The anecdotes reward a person who takes the observation rather than defending himself." },
    ],
    closer: [
      { title: "Why the body is the argument", body: "Every rebuke in this section is anatomical. Pride is met with the beginning and end of the physical self because that is the fact the swagger is designed to make everyone forget." },
      { title: "The correction is offered, not published", body: "Hasan tells the man not to apologise to him but to turn to his Lord. The point of the encounter is repair, not the humiliation of the person corrected." },
    ],
    distinction: ["Appearance and intention are two lines", "Vainglorious display", "Bearing and dress are arranged so that others register a claim of superiority.", "Ordinary appearance", "Clothing and movement carry no such claim, whatever their quality."],
    misreading: "Do not turn this into a rule about garment length or a licence to comment on how other people walk. Ghazali is describing a tell, not issuing a dress code.",
    reflection: "Watch one habit of bearing you maintain in public and ask what it is meant to communicate. Then repeat the day without it.",
    audit: ["What does my bearing say before I speak?", "Which part of how I appear is arranged for an audience?", "How do I respond when someone notices it?", "Would I keep the habit if no one could see it?"],
    nodes: ["display", "bearing"],
    model: chain("How the inward state reaches the street", "Ghazali traces a visible habit back to the belief that produced it.", [["Inward estimate", "A rank is assigned to oneself above another.", "warning"], ["Bearing and dress", "Gait, hem, and posture begin to carry the claim.", "warning"], ["Public reading", "Others receive the claim without it ever being stated.", "warning"], ["Plain correction", "A reminder of the body's beginning and end interrupts the whole sequence.", "support"]]),
  }),
  makeChapter({
    id: 3, shortTitle: "Lowered and raised", formalTitle: "The excellence of humility",
    overview: "Ghazali balances the censure with a long gathering on humility's worth. The governing report is that no one lowers himself for God without being raised, and the examples chosen show humility as an active practice of proximity rather than a mood of self-deprecation.",
    moves: [
      { title: "State the exchange", body: "The central saying is that God adds nothing to a servant through pardon except honour, and that no one humbles himself for God without being raised by God." },
      { title: "Qualify it immediately", body: "The report praises the one who is humble without wretchedness, which introduces the boundary Ghazali will develop fully in the section on the limit of training." },
      { title: "Show it as approach, not withdrawal", body: "The illustrations turn on drawing near what others avoid: seating the afflicted beside oneself, eating with the ill, taking a servant's hand and going where she wishes." },
      { title: "Anchor it in a choice", body: "Offered the rank of a prophet-king or that of a servant-messenger, the choice recorded is the latter, taken on Gabriel's counsel to be humble before one's Lord." },
    ],
    closer: [
      { title: "Humility as capacity", body: "The reports present humility less as an opinion about oneself than as the condition that makes several other goods possible: pardon, gentle counsel, and unembarrassed company." },
      { title: "The two angels", body: "The image of two attendants who pull a man down when he raises himself and ask that he be raised when he lowers himself makes the exchange automatic rather than negotiated." },
    ],
    distinction: ["Two things called lowering oneself", "Humility", "A person keeps his real worth in view and refuses the claim of superiority over others.", "Wretchedness", "A person performs or accepts degradation, which the same reports explicitly exclude from the praise."],
    misreading: "Do not conclude that self-contempt is the goal. The praised state is repeatedly described as humility without wretchedness, and the deficient extreme is treated later as its own fault.",
    reflection: "Choose one person whose company you avoid for reasons of standing rather than harm, and sit with them this week without arranging for it to be noticed.",
    audit: ["Whose company would cost me something socially?", "Where does my sense of rank make an ordinary kindness feel expensive?", "Which pardon am I withholding to protect a position?", "What would I do differently if lowering myself were the raising?"],
    nodes: ["humility", "raising"],
    model: pair("What the reports actually praise", "The praise is bounded on both sides from the outset.", [["Humility without wretchedness", "Real worth is kept in view while the claim of superiority is refused.", "balance"], ["Performed degradation", "Self-contempt is displayed and is explicitly outside the praise.", "warning"]]),
  }),
  makeChapter({
    id: 4, shortTitle: "Three beliefs and a swelling", formalTitle: "The reality of pride and its bane",
    overview: "This is the analytical centre of Part One. Ghazali separates pride as an inward disposition from the acts it produces, specifies the exact beliefs required to generate it, and then explains why a state so small can be treated as a barrier to every virtue at once.",
    moves: [
      { title: "Split the inward from the outward", body: "Pride proper is a disposition in the soul; the behaviours are its fruits. When it shows on the limbs it is called takabbur, and when it does not, the person is said to have pride within him." },
      { title: "Specify the three beliefs", body: "Pride requires that a person assign a rank to himself, assign a rank to another, and place his own above it. Merely thinking well of oneself, or merely despising another, is not sufficient." },
      { title: "Locate the state itself", body: "On those three beliefs follows an elation, a reliance, and a self-importance. That swelling, not the belief alone, is the disposition of pride." },
      { title: "Separate pride from conceit", body: "Pride needs someone to be proud toward; conceit does not. A solitary human being could be conceited, but could not be proud. This distinction organises the whole two-part book." },
    ],
    closer: [
      { title: "Why it closes every door", body: "Ghazali's argument for the severity is structural. A person holding self-importance cannot love for others what he loves for himself, cannot be humble, cannot drop rancour, cannot hold to truthfulness, cannot restrain anger, cannot drop envy, cannot give gentle counsel, and above all cannot accept it. Every blameworthy trait becomes necessary to protect his standing, and every praiseworthy one becomes unaffordable." },
      { title: "The worst variety", body: "The species Ghazali singles out is the pride that prevents a person from gaining knowledge and accepting truth. The prophetic definition he cites gives pride two banes exactly: rejecting the truth and disdaining people." },
    ],
    distinction: ["Pride and conceit differ structurally", "Pride", "Requires an other, and consists in placing one's own rank above his.", "Conceit", "Requires no other at all, and consists in magnifying a blessing while forgetting its Giver."],
    misreading: "Do not treat any high estimate of one's own competence as pride. Ghazali is explicit that a person may think much of himself and still see another as equal or greater, in which case the disposition has not formed.",
    reflection: "Recall the last time accepting a correction felt expensive. Ask which of the three beliefs was in place at that moment.",
    audit: ["Do I hold a rank for myself, a rank for him, and mine above it?", "Which virtue have I found unaffordable lately?", "When truth arrived from someone I rate below me, what happened?", "Whom have I disdained this week, and on what ground?"],
    nodes: ["kibr", "three-beliefs", "two-banes"],
    model: chain("The three beliefs that produce pride", "Remove any one of them and the disposition does not form.", [["A rank for myself", "The person assigns himself a standing.", "warning"], ["A rank for the other", "The person assigns the other a standing too.", "warning"], ["Mine above his", "The two are compared and one is placed higher.", "warning"], ["The swelling", "Elation and reliance follow, and this is pride itself.", "warning"]]),
  }),
  makeChapter({
    id: 5, shortTitle: "Three objects of pride", formalTitle: "The object of pride, its degrees, divisions, and fruits",
    overview: "Ghazali classifies pride by what it is directed at: God, the messengers, or other people. The third looks mildest and receives the longest treatment, because he argues that it is grave for two separate reasons and that it reliably grows into the first two.",
    moves: [
      { title: "Pride toward God", body: "The most extreme form has no source but sheer ignorance and tyranny, and appears in those who refused the very status of servant." },
      { title: "Pride toward the messengers", body: "Here the refusal is to submit to a human being like oneself. Ghazali distinguishes those whose pride blocked them from even recognising the truth from those who recognised it and could not bring themselves to acknowledge it." },
      { title: "Pride toward people, first gravity", body: "Greatness belongs to the Sovereign alone, so a servant who is proud contests a divine description. The image given is a boy putting the king's cap on his head and sitting on his throne; the difference from open defiance is the difference between contesting a king over some of his servants and contesting him over the kingship itself." },
      { title: "Pride toward people, second gravity", body: "It leads to disobeying the command, because a proud man refuses truth that arrives through a servant. Those who dispute in order to win rather than to gain the truth share the described trait, and Iblis is the paradigm: pride toward a creature, on a ground of origin, dragged him into refusing the command." },
    ],
    closer: [
      { title: "Why the mild case matters most", body: "Ghazali spends the section on the third class because it is the one his reader actually occupies, and because his argument is that it does not stay in its class." },
      { title: "The debating hall", body: "The example chosen for a religious setting is people who claim to be investigating the truths of religion and deny one another like proud men, each refusing what has become clear on the other's tongue." },
    ],
    distinction: ["Two ways of failing to accept the truth", "Blocked from seeing", "Pride prevents the reflection that would have disclosed the truth, and the person believes himself right.", "Refusing to acknowledge", "The truth is recognised and the acknowledgement is withheld because the self will not submit."],
    misreading: "Do not use the three classes as a ranking of other people. Ghazali's point is that the third class, which almost everyone occupies, opens onto the other two.",
    reflection: "Recall an argument you wanted to win. Ask whether you would have been glad to be shown wrong, and answer honestly.",
    audit: ["In my last disagreement, was I hunting truth or victory?", "What did I do the last time I was plainly outmatched?", "Which command becomes negotiable when it reaches me through someone I rate low?", "Where does refusing a person shade into refusing what he carries?"],
    nodes: ["objects", "iblis", "dispute"],
    model: chain("Three objects, one trajectory", "Ghazali argues the classes are connected rather than merely parallel.", [["Toward people", "The self is magnified and another is held beneath it.", "warning"], ["Toward the command", "Truth arriving through a person is refused because of the person.", "warning"], ["Toward the messengers", "Submission to a human bearer of the message becomes intolerable.", "warning"], ["Toward God", "The refusal reaches the status of servant itself.", "warning"]]),
  }),
  makeChapter({
    id: 6, shortTitle: "Seven grounds", formalTitle: "The things through which people become proud",
    overview: "No one is proud without magnifying himself, and no one magnifies himself without believing he holds some perfection. Ghazali reduces the whole field to seven grounds, two religious and five worldly, then shows in detail why the religious two are the most dangerous.",
    moves: [
      { title: "Name the seven", body: "The religious grounds are knowledge and works; the worldly are lineage, beauty, strength, wealth, and numerous supporters. Every case reduces to one of these." },
      { title: "Explain why knowledge is fastest", body: "Learning readily produces a man who expects to be greeted first, treats a courtesy as a debt owed to him, and looks at ordinary people as though at cattle, while in the matter of the hereafter he fears for them more than for himself and hopes for himself more than for them." },
      { title: "Give the two reasons knowledge inflates", body: "Either what is being pursued is not knowledge at all but a craft, since real knowledge is what makes a servant know his Lord, himself, and the peril of his final state; or the person entered study without first cleansing the soul. Wahb's image is rain, sweet and clear, which each tree converts to its own taste, so the bitter grows bitterer and the sweet sweeter." },
      { title: "Grade the three degrees", body: "In the learned and the devout, pride appears at three depths: rooted in the heart while the branches are cut and the person genuinely acts humbly; showing in conduct, precedence in gatherings and the averted cheek or the furrowed brow; and showing on the tongue as boasting, self-praise, and competitive display." },
    ],
    closer: [
      { title: "Where piety is not", body: "Ghazali's correction to the second degree is blunt: scrupulousness is not in the brow that it should be furrowed, nor the face that it should scowl, nor the neck that it should be bowed. Piety is here, and the gesture was toward the chest." },
      { title: "The cloud that moved", body: "The story of the reprobate and the worshipper of the Children of Israel carries the section's argument. The worshipper refused his neighbour's company, and the shade transferred to the reprobate's head. The ignorant sinner who humbles himself in awe has obeyed with his heart, and is more obedient than the proud scholar and the self-admiring worshipper." },
    ],
    distinction: ["Knowledge moves in both directions", "Knowledge that humbles", "Awareness of one's Lord, oneself, and the peril of the end increases fear, humility, and lowliness.", "Knowledge that inflates", "A craft mastered by an uncleansed soul supplies fresh material for a claim already being made."],
    misreading: "Do not read this as a case against learning or devotion. Ghazali holds that these are the two real perfections; that is precisely why pride in them is the hardest to treat.",
    reflection: "Take the ground you are most likely to be proud of and write out what it would look like if it increased your fear instead of your standing.",
    audit: ["Which of the seven is mine?", "Does what I know make me more afraid or more secure?", "Which degree am I at: rooted, visible in conduct, or audible on the tongue?", "Do I hope for myself more than I hope for others?"],
    nodes: ["seven-grounds", "knowledge", "degrees"],
    model: chain("Three degrees in the learned and the devout", "Ghazali grades the same disposition by how far it has travelled outward.", [["Rooted, branches cut", "The estimate remains inward while conduct is genuinely humble.", "warning"], ["Visible in conduct", "Precedence, the averted cheek, the scowl that is mistaken for scrupulousness.", "warning"], ["Audible on the tongue", "Boasting, self-praise, claimed states, and competition in devotion and learning.", "warning"]]),
  }),
  makeChapter({
    id: 7, shortTitle: "Four motives", formalTitle: "The motives that provoke pride and the causes that inflame it",
    overview: "Ghazali distinguishes the single inward cause of pride from the several causes of its outward expression, and in doing so produces the diagnostic that organises the rest of the book: a test that separates pride from ostentation by asking what survives solitude.",
    moves: [
      { title: "One cause within", body: "Inward pride has a single source, which is conceit. When a person is pleased with himself, with his knowledge, or with his works, he magnifies himself and becomes proud." },
      { title: "Three loci for the outward act", body: "Outward pride has causes located in the proud person, in the person he is proud toward, or in neither: giving conceit, rancour and envy, and ostentation, or four drivers in total." },
      { title: "Show rancour and envy at work", body: "A man may know another deserves deference and still be unable to defer, because anger has left a settled dislike. Envy does the same without any injury having occurred, and both push him to reject truth from that quarter and refuse counsel." },
      { title: "Give the discriminating test", body: "Ostentation alone produces a pride that disappears in private. Conceit, rancour, and envy produce a pride that persists when the person is alone with the one he looks down on. What is specific to the crowd is ostentation; what happens in solitude is pride." },
    ],
    closer: [
      { title: "Why the test works", body: "Each driver needs a different audience. Ostentation needs observers to complete the transaction, so its behaviour evaporates when they leave. The other three are transactions with oneself, and are unaffected." },
      { title: "The falsely claimed lineage", body: "Ghazali's clearest case is a man who claims a noble descent he knows to be false and then behaves proudly on the strength of it. Inwardly there is no pride, since he knows he is lying; ostentation alone is driving the conduct." },
    ],
    distinction: ["Two diseases that produce identical behaviour", "Pride", "The heaviness persists in solitude, because the transaction is with oneself.", "Ostentation", "The heaviness appears only before observers, because the transaction requires them."],
    misreading: "Do not treat the test as a verdict on a person's inner life. It sorts a behaviour into a likely cause so that the fitting treatment can begin, and Ghazali is explicit that both diseases may be present at once.",
    reflection: "Take one act that feels heavy and run it twice in your mind, once observed and once entirely alone. The difference between the two readings is the finding.",
    audit: ["Does this act stay heavy when no one can see?", "Am I refusing this person, or what he is carrying?", "Is there an old anger making deference impossible here?", "Would I accept the same correction from someone I liked?"],
    nodes: ["four-motives", "solitude", "ostentation"],
    model: pair("The two causes that behave alike", "One question separates them, and the treatments are different.", [["Heavy alone as well", "Conceit, rancour, or envy is driving the behaviour, and pride is the disease.", "warning"], ["Heavy only when watched", "Ostentation is driving the behaviour, and the cure is cutting expectation from people.", "warning"]]),
  }),
  makeChapter({
    id: 8, shortTitle: "Where it actually shows", formalTitle: "The character of the humble, and where humility and pride actually appear",
    overview: "Ghazali moves from analysis to inventory. Pride shows in bearing, glance, voice, gait, sitting, and every ordinary transaction, and he lists the specific places where the two dispositions become legible, ending with the hardest case, which is dress.",
    moves: [
      { title: "List the ordinary occasions", body: "Loving that people stand for you; not visiting others even when the visit would benefit them; refusing to let someone sit beside you rather than before you; not walking unless others walk behind; doing no work with your own hands at home; not carrying your own goods from the market; and how you bear being insulted." },
      { title: "Give the counter-examples concretely", body: "Sufyan al-Thawri comes when summoned so that his humility can be seen tested; Umar ibn Abd al-Aziz fills the lamp himself rather than wake a sleeping servant, and observes that he left as Umar and returned as Umar with nothing diminished." },
      { title: "State the dress problem", body: "Fine clothing is not necessarily pride, and coarse clothing is not necessarily humility. Hasan's remark that the wearer of wool can be prouder than the wearer of embroidered silk closes the obvious escape." },
      { title: "Resolve it with the solitude test", body: "The mark of the proud man is that he seeks to look well when people see him and does not care when he is alone. The mark of one who simply loves beauty is that he loves it in everything, even in solitude, even in his cat. That is not pride." },
    ],
    closer: [
      { title: "Two sayings held together", body: "One report calls fine clothes a vanity of the heart; another answers a man who loved beautiful things that this is not pride, but pride is rejecting truth and disdaining people. Ghazali reads the first as saying that fine dress may produce pride and the second as saying that pride does not necessitate it." },
      { title: "The measure recommended", body: "What he settles on is the middle of dress, which draws attention neither by its quality nor by its poverty, and the counsel to eat, drink, wear, and give without extravagance or vainglory." },
    ],
    distinction: ["Two people in identical clothes", "Loving beauty", "The same care appears in private, where no one could register it.", "Displaying status", "The care appears only when observed and lapses entirely in solitude."],
    misreading: "Do not convert the inventory into a code for judging other people's households, clothes, or gait. Every item on it is a question addressed to the person holding the list.",
    reflection: "Pick one item from the inventory that you have quietly arranged your life to avoid, and do it once this week on an empty street.",
    audit: ["Do I carry my own things home?", "Do I let someone sit level with me?", "Do I dress the same when no one will see?", "What do I do when I am insulted and it is not answered?"],
    nodes: ["inventory", "dress", "solitude"],
    model: pair("Reading the same appearance two ways", "Ghazali refuses to settle the question from the outside.", [["Consistent in private", "The taste is genuine and carries no claim against anyone.", "balance"], ["Maintained only in public", "The appearance is doing social work and needs the observer to complete it.", "warning"]]),
  }),
  makeChapter({
    id: 9, shortTitle: "Uprooting the root", formalTitle: "Treating pride, first station: uprooting the root by knowledge and practice",
    overview: "Ghazali announces two stations of treatment and takes the first here: pulling the tree out of its bed in the heart. The cure has a knowledge half and a practice half, and he states plainly that neither completes the healing without the other.",
    moves: [
      { title: "State the two halves", body: "The knowledge half is that a person come to know himself and know his Lord, which suffices to remove pride; the practice half is humility toward God in act and toward creation by persisting in the conduct of the humble." },
      { title: "Walk the three stages of the self", body: "The meditation follows a single Quranic passage through beginning, middle, and end: a person who was not a thing mentioned, then made from a despised drop, then made to die and be buried, then raised when God wills." },
      { title: "Dwell on the middle", body: "The middle is the hardest to evade. He hungers unwillingly, thirsts unwillingly, sickens and dies unwillingly; he wants to know a thing and is ignorant of it, wants to remember and forgets, wants to forget and cannot. He does not own his own heart, nor his soul his own soul." },
      { title: "Make the practice concrete", body: "The rule Ghazali gives is general and usable: look at everything pride demands of you and persist in its opposite until humility becomes a disposition. Prayer itself is offered as the drill, since standing, bowing, and prostration are the acts humility requires, prescribed to a people who would not bend to retrieve a dropped whip." },
    ],
    closer: [
      { title: "The prisoner's image", body: "A man who has injured a king, deserved a thousand lashes, sits in prison awaiting a public sentence and does not know whether he will be pardoned. Ghazali asks whether such a man would be proud toward his fellow prisoners, and applies the case to every servant with a sin outstanding." },
      { title: "Why knowledge alone fails", body: "The reason given for pairing knowledge with practice is the hidden connection between hearts and limbs. A heart does not take on a praiseworthy character by understanding alone, which is why the second station tests understanding against conduct." },
    ],
    distinction: ["The cure has two halves that do not substitute", "Knowledge", "Knowing what one is and Whose one is removes the ground on which the estimate stood.", "Practice", "Persisting in the opposite of what pride demands is what settles the change into a disposition."],
    misreading: "Do not read the meditation on lowliness as an invitation to self-hatred. Its stated purpose is to dissolve a comparison with other people, not to install a new and worse estimate of oneself.",
    reflection: "Name one act that pride currently forbids you. Do the opposite once, and notice how much of the resistance was argument rather than difficulty.",
    audit: ["What does pride currently forbid me?", "Which half am I skipping, the knowing or the doing?", "Where am I certain enough of my end to look down on someone else's?", "What did I not choose about the abilities I am proud of?"],
    nodes: ["treatment", "knowledge-cure", "practice-cure"],
    model: pair("Two halves of one cure", "Ghazali states that healing is not completed by either alone.", [["The knowledge half", "Knowing oneself and one's Lord removes the ground the estimate stood on.", "support"], ["The practice half", "Persisting in the opposite of what pride demands turns knowledge into disposition.", "support"]]),
  }),
  makeChapter({
    id: 10, shortTitle: "Five tests", formalTitle: "Treating pride, second station: the seven grounds and the five tests",
    overview: "The second station treats pride as it arises from each of the seven specific grounds, and closes with five practical trials. Ghazali notes that the soul may sincerely claim to be free of pride and be lying, and that only the trials will show it.",
    moves: [
      { title: "Treat the external grounds first", body: "Lineage, beauty, strength, wealth, and supporters are treated as pride in something outside oneself. A man proud of his wealth is proud of his horse and his house, and would be lowly again if the horse died; a man proud of a ruler's favour has built on a heart more agitated than a boiling pot." },
      { title: "Give the scholar two knowledges", body: "The proof against the learned is more binding, and what is borne from the ignorant is not borne from them; and greatness suits God alone, who has said that a servant has worth with Him so long as he sees no worth for himself." },
      { title: "Supply the comparison for every encounter", body: "Ghazali gives the scholar a reading for each person he meets: the ignorant disobeyed in ignorance and is more excusable; the learned knows what I do not; the older obeyed before me; the younger has not yet sinned as long as I have; the one in error may end in guidance while I end in his state." },
      { title: "Separate anger for God from pride", body: "The hardest case is hating an open sinner while remaining humble toward him. Three things must be present: your own past sins, so your worth shrinks in your own eyes; the recognition that your knowledge and right belief are God's gift, so the credit is not yours; and the uncertainty of your own end. The image is a king's servant charged with disciplining the king's son, who may be genuinely angry and still know the son's rank exceeds his own." },
    ],
    closer: [
      { title: "The five trials", body: "Debate a peer and see whether accepting truth from him is heavy. Sit level with your peers in a gathering and let them go first. Answer a poor person's invitation and run an errand for a companion. Carry your own goods home from the market. Wear plain clothes. In each case, heaviness before people is ostentation and heaviness in solitude is pride." },
      { title: "The trap inside the second trial", body: "Ghazali names a specific deception: sitting down in the shoe-row, or placing some lowly person between yourself and your peers, and taking this for humility. The proud find that easy, because it implies they deserved the higher place and graciously surrendered it. The instruction is to sit beside your peers, not beneath them." },
    ],
    distinction: ["Two things that look like humility in a gathering", "Sitting level", "The person takes his ordinary place among peers and the claim of precedence is genuinely dropped.", "Sitting conspicuously low", "The descent is itself a claim, since it advertises the height that was supposedly relinquished."],
    misreading: "Do not read the five trials as a scored examination. Ghazali offers them as ways of making a hidden state visible so that treatment can begin, and he expects most people to fail several.",
    reflection: "Run the first trial deliberately. Thank the person who corrected you, out loud, and watch what that costs.",
    audit: ["When a peer was right, could I say so and thank him?", "Do I sit beside my equals or arrange to be noticed below them?", "Whose invitation have I not answered, and why?", "Is my anger at wrongdoing carrying a claim about my own standing?"],
    nodes: ["seven-grounds", "five-tests", "comparison"],
    model: chain("The five trials, in order", "Each one is designed to make a hidden heaviness surface.", [["Accept truth from a peer", "Is acknowledging and thanking him heavy?", "balance"], ["Sit level in a gathering", "Can peers precede you without a descent that advertises itself?", "balance"], ["Answer the poor invitation", "Does an ordinary kindness feel beneath you?", "balance"], ["Carry your own goods", "Empty street or watched street, where does the heaviness sit?", "balance"], ["Wear plain clothes", "In company it is ostentation; in solitude it is pride.", "balance"]]),
  }),
  makeChapter({
    id: 11, shortTitle: "The mean", formalTitle: "The limit of training in the disposition of humility",
    overview: "Ghazali closes Part One by placing humility on the same scheme as every other trait: two extremes and a mean. The excess is pride; the deficiency is self-abasement and flattery; and the praiseworthy state is justice, which gives each his due.",
    moves: [
      { title: "Name all three positions", body: "The side inclining to excess is called pride, the side inclining to deficiency is called self-abasement and degradation, and the middle is humility." },
      { title: "Show that the deficiency is a real fault", body: "A scholar who gives up his seat to a cobbler, straightens the man's sandals, and runs behind him to the door has descended into abasement, and this is not praiseworthy either." },
      { title: "Give the measure for unequal ranks", body: "Toward peers, humility takes the form already described; toward a person of lower standing, it is rising for him, cheerfulness in speech, gentleness in asking, accepting his invitation, and working for his need, without seeing oneself as better than him." },
      { title: "Supply the test for a real disposition", body: "The act must come easily, without heaviness and without deliberation. If it is heavy while being performed, the person is forcing himself, not yet humble, and the training is not finished." },
    ],
    closer: [
      { title: "The two extremes are not equal", body: "Ghazali notes that deviation toward flattery is less severe than deviation toward pride, as prodigality is thought better of than miserliness. Both ends are blameworthy and one is uglier." },
      { title: "Why justice is the real name", body: "What is praiseworthy without qualification is putting things in their places as they should be, which is why humility cannot be defined as maximum self-lowering. The mean is the point of the training, and he calls it a subtle matter in this trait as in every other." },
    ],
    distinction: ["Two failures of measure", "Excess", "Pride advances the self beyond its due and takes precedence over equals.", "Deficiency", "Abasement and flattery put the self below its due, which the believer is not entitled to do."],
    misreading: "Do not treat maximum self-lowering as the goal of the training. Ghazali explicitly instructs a person who has slid into flattery to raise himself back to the middle.",
    reflection: "Ask whether your humility is currently easy or effortful. The answer tells you whether it is a disposition yet or still a performance.",
    audit: ["Is this act light or am I forcing it?", "Where have I gone past humility into flattery?", "What is actually due to this person, neither more nor less?", "Do I lower myself to be seen lowering myself?"],
    nodes: ["mean", "humility", "justice"],
    model: spectrum("Humility as a mean", "Both ends are blameworthy, and the middle is justice.", [["Self-abasement", "Flattery and degradation put the self below its due.", "warning"], ["Humility", "Each is given his due, and the act comes without heaviness.", "balance"], ["Pride", "The self is advanced beyond its due and above its equals.", "warning"]]),
  }),
  makeChapter({
    id: 12, shortTitle: "Two ways to stop trying", formalTitle: "The censure of conceit",
    overview: "Part Two opens on conceit. Ghazali gathers its censure and then reports the saying that pairs it with despair, and the reason given for the pairing turns out to be the whole argument of this half of the book.",
    moves: [
      { title: "Gather the censure", body: "The Quranic instances chosen are Hunayn, where numbers pleased the believers and availed nothing; those who supposed their fortresses would protect them; and those who reckon they are doing good work." },
      { title: "Note that error is no protection", body: "Ghazali observes at once that a person may be conceited about a deed in which he is mistaken exactly as about one in which he is right, which prepares the eighth kind treated at the end of the book." },
      { title: "Report the pairing with despair", body: "Ibn Masud named ruin in two things, despair and conceit, and Ghazali supplies the reason: felicity is attained only by striving and seeking, and the despairing man does not strive while the conceited man believes he has already succeeded." },
      { title: "Place it among the destroyers", body: "The report naming three destroyers ends with a man's being pleased with himself, which sets conceit beside obeyed avarice and followed desire rather than among lesser faults." },
    ],
    closer: [
      { title: "The shape of the argument", body: "Despair and conceit are opposite estimates that produce the same paralysis. Naming them together tells the reader that the danger in conceit is not its unpleasantness but its effect on effort." },
      { title: "Hunayn as the standing case", body: "The Hunayn verse recurs throughout Part Two because it shows conceit in people who were right about the facts. Their numbers were real; the error was in what the numbers were taken to guarantee." },
    ],
    distinction: ["Two estimates, one result", "Despair", "A person stops striving because he judges that nothing he does can arrive.", "Conceit", "A person stops striving because he judges that he has already arrived."],
    misreading: "Do not read the censure as forbidding any satisfaction in a good act. Ghazali will shortly specify a state of rejoicing in a blessing that is explicitly not conceit.",
    reflection: "Ask which of the two currently costs you more effort: believing that striving is pointless, or believing that it is finished.",
    audit: ["Where have I quietly concluded that I have arrived?", "Which good habit have I stopped inspecting?", "What was I right about that I then over-read?", "Does my confidence increase or decrease my effort?"],
    nodes: ["ujb", "despair", "hunayn"],
    model: pair("Why the two are named together", "Both remove the striving on which felicity depends.", [["Despair", "Nothing I do will arrive, so there is no reason to begin.", "warning"], ["Conceit", "I have already arrived, so there is no reason to continue.", "warning"]]),
  }),
  makeChapter({
    id: 13, shortTitle: "What conceit does next", formalTitle: "The bane of conceit",
    overview: "Ghazali enumerates the consequences. Conceit is not treated as a discrete fault but as a generator, and the list moves outward from its effect on pride, through its effect on the accounting of sins and works, to its effect on a person's capacity to learn anything at all.",
    moves: [
      { title: "It produces pride", body: "Conceit is one of the causes of pride, so from conceit is born pride and from pride the many banes already described." },
      { title: "It disables the accounting of sins", body: "Some sins he does not recall or inspect, supposing himself in no need of inspecting them; those he does recall he belittles rather than magnifies, and so makes no serious effort to repair them." },
      { title: "It blinds him to the defects of his works", body: "He magnifies his acts of worship, exults in them, and reminds God of them as a favour, forgetting the enabling. Once conceited about them, he cannot see their defects, and whoever does not inspect the defects of his works has most of his effort wasted." },
      { title: "It closes off learning", body: "Conceit in one's opinion, intellect, or work prevents benefiting from others, prevents consulting, and prevents asking. He becomes self-sufficient in his own view and disdains to question someone who knows more." },
    ],
    closer: [
      { title: "Rejoicing in a thought because it is yours", body: "Ghazali describes a specific mechanism: a person may be conceited about a mistaken thought precisely because it occurred to him, rejoicing in his own passing notions and not in another's. He persists in it, hears no counsel, and looks at others as fools. In a worldly matter he would still investigate; in a religious matter, particularly in the foundations of belief, this destroys him." },
      { title: "The greatest bane", body: "The one Ghazali names as gravest is that the person slackens in striving, supposing that he has won and become self-sufficient. He calls this outright ruin, about which there is no ambiguity." },
    ],
    distinction: ["Two responses to one's own good work", "Inspection", "The act is examined for defects, which only apprehension makes a person willing to do.", "Exultation", "The act is magnified and enjoyed, after which its defects become invisible."],
    misreading: "Do not read the warning about defects as a licence for scrupulous paralysis. The stated remedy is inspection followed by repair, not the abandonment of the act.",
    reflection: "Take one act of yours you feel good about and look specifically for its defects. Notice whether you want to.",
    audit: ["Which of my sins have I stopped counting?", "When did I last consult someone about something I was sure of?", "Do I prefer my own idea because it is right or because it is mine?", "Where has confidence reduced my effort?"],
    nodes: ["banes", "inspection", "opinion"],
    model: chain("What conceit disables, in order", "Ghazali lists the consequences as a sequence rather than a set.", [["Sins uncounted", "Some are not recalled, and those recalled are belittled.", "warning"], ["Works magnified", "The act becomes a favour done to God rather than a gift received.", "warning"], ["Defects invisible", "Inspection requires apprehension, which conceit has removed.", "warning"], ["Counsel refused", "Learning, consulting, and asking all become unnecessary.", "warning"], ["Striving slackens", "Supposing himself arrived, he stops, and this is the ruin.", "warning"]]),
  }),
  makeChapter({
    id: 14, shortTitle: "Three states and a claim", formalTitle: "The reality of conceit and presumption, and their definitions",
    overview: "This is the sharpest analysis in Part Two. Ghazali takes a real perfection a person actually possesses, distinguishes three possible states toward it, identifies exactly one of them as conceit, and then defines the further condition that goes beyond it.",
    moves: [
      { title: "Grant the perfection", body: "Conceit only ever concerns a quality that genuinely is a perfection. The analysis does not depend on the person being wrong about what he has." },
      { title: "Name the first two states", body: "He may fear its loss and be anxious that it be spoiled or stripped away, and this is not conceit. Or he may not fear its loss but rejoice in it as a blessing from God rather than as something attributed to himself, and this is not conceit either." },
      { title: "Isolate the third", body: "Conceit is the third state: not fearing, rejoicing, and resting secure, where the joy is in the thing as his perfection and ascribed to him, not as a gift from God. Whenever the heart is dominated by the awareness that it is a blessing God may strip whenever He wills, conceit departs." },
      { title: "Define presumption beyond it", body: "If a person further comes to hold that he has a claim on God and a standing with Him, expecting honour for his work and finding it unlikely that anything unpleasant should befall him, more unlikely than he finds it for the corrupt, this is presumption upon one's work." },
    ],
    closer: [
      { title: "The test for presumption", body: "Ghazali gives a precise diagnostic. A person does not marvel when a sinner's supplication is refused, but marvels when his own is. That asymmetry is presumption, since it reveals a supposed entitlement." },
      { title: "How the two are related", body: "Every presumptuous person is conceited, but not every conceited person is presumptuous. Conceit is magnifying and forgetting the Giver, without expecting a return; presumption is complete only with the expectation of a return. Ghazali notes that the same structure runs horizontally: magnifying a gift you gave someone is conceit, and making demands of them on its strength is presumption toward them." },
    ],
    distinction: ["The same blessing held two ways", "As a gift", "The joy is in the Giver's generosity, and the possibility of its being withdrawn stays present.", "As a possession", "The joy is in the quality as one's own, and the Giver has dropped out of view."],
    misreading: "Do not conclude that gladness at a good quality is itself the disease. Ghazali explicitly protects rejoicing in it as a blessing; what he isolates is the forgetting of whose it is.",
    reflection: "Take something you are genuinely good at and ask which of the three states you are in. The question is answerable.",
    audit: ["Do I fear losing this, or assume I will keep it?", "Is my gladness about the gift or the Giver?", "Do I find it strange when things go badly for me?", "Have I reminded anyone of what I did for them?"],
    nodes: ["ujb", "three-states", "idlal"],
    model: chain("Three states toward a real perfection", "Only the third is conceit, and the fourth is beyond it.", [["Fearing its loss", "Anxious that it be spoiled or taken; this is not conceit.", "support"], ["Rejoicing as a gift", "Secure but attributing it to the Giver; this is not conceit either.", "balance"], ["Rejoicing as one's own", "Secure and attributing it to oneself; this is conceit.", "warning"], ["Claiming a return", "A standing with God is assumed and honour expected; this is presumption.", "warning"]]),
  }),
  makeChapter({
    id: 15, shortTitle: "Who holds the keys", formalTitle: "The general treatment of conceit",
    overview: "Every illness is treated by its contrary, and the cause of conceit is pure ignorance, so its treatment is the knowledge that contradicts that ignorance. Ghazali runs the argument as a dilemma and closes every exit, then gives the parable that makes it usable.",
    moves: [
      { title: "Pose the dilemma", body: "Ask on what basis you are pleased with the act: as its locus, or as its producer. If as its locus, a receptacle is subject and passageway and contributes nothing to bringing a thing about, so there is nothing there to be pleased with." },
      { title: "Follow the second horn", body: "If as its producer, by your choice and your power, then examine where that power, will, limbs, and enabling conditions came from. If all of it is God's gift without prior claim, then the wonder belongs to His generosity, not to yourself." },
      { title: "Close the regress", body: "The objection that you were given the second gift because of a quality you already had is answered by pointing out that the quality was also given. He gave you the horse and then the servant; if you say the servant came because you owned a horse, He gave the horse too. And if you say you were granted worship because you loved Him, who created that love in your heart?" },
      { title: "Answer the reward objection two ways", body: "To the question of how reward is deserved if acts are God's creation, Ghazali gives the strict answer, that you and your power and movement are all His creation, deferring its full treatment to the Book of Thankfulness; and a concessive answer that does not require it." },
    ],
    closer: [
      { title: "The treasury and the keys", body: "Imagine the treasuries of the world gathered in a fortified citadel, the key in a treasurer's hand. Sit at its gate a thousand years and you will not see a single dinar. Hand you the key, and you take the wealth by stretching out your arm. Was your wonder at the handing of the key or at the movement of your hand? Acts of worship are treasuries by which felicity is reached; their keys are power, will, and knowledge, and those are in God's hand." },
      { title: "Why the human comparison fails", body: "Ghazali allows that with a human king a person might be given a robe on account of a quality that came from somewhere else. That escape is not available here, because the One in question originates both the described and the description." },
    ],
    distinction: ["Where the wonder is placed", "At the giving", "The enabling conditions are seen as the decisive event, and gratitude follows.", "At the doing", "The final movement of the hand is treated as the achievement, and conceit follows."],
    misreading: "Do not take this as a denial that acts matter or that effort is real. Ghazali is locating the credit, not cancelling the act, and refers the technical question of reward to a later book.",
    reflection: "Take your best recent action and list what had to be given to you before it was possible. Stop when the list stops being finite.",
    audit: ["What was given to me before this act was possible?", "Where did the desire to do it come from?", "Am I amazed at the key or at my own hand?", "Which quality do I treat as the reason I deserved the rest?"],
    nodes: ["keys", "treatment-ujb", "attribution"],
    model: pair("The dilemma Ghazali poses", "Both horns lead away from being pleased with oneself.", [["As the locus", "A receptacle contributes nothing to bringing the thing about.", "balance"], ["As the producer", "The power, will, and conditions were themselves given without prior claim.", "balance"]]),
  }),
  makeChapter({
    id: 16, shortTitle: "Counted as provision", formalTitle: "The chain of causes: that there is no agent but God",
    overview: "Ghazali extends the argument outward to the complaint that lies beneath much conceit: the sense that the distribution of gifts is unjust. He answers it with a test that the complainant can run on himself, then returns to conceit with the cases of David and Hunayn.",
    moves: [
      { title: "State the complaint", body: "An intelligent man in poverty looks at a heedless man in wealth and comes close to seeing injustice, asking why he was denied a day's food while the ignorant were given the comforts of the world." },
      { title: "Show the complaint is incoherent", body: "Had both been given to him, the poor and ignorant man would have the same complaint with better standing. Ali's answer is that a man's intellect is reckoned as part of his provision." },
      { title: "Give the exchange test", body: "Ask whether you would take the other person's ignorance and wealth in exchange for your intelligence and poverty. You would refuse, which shows you already judge your own portion greater. The beautiful woman envying the plain woman's jewels is the same case." },
      { title: "Expose the argument's shape", body: "The complaint amounts to a man given a horse who asks the king why he was not also given the servant, since after all he owns a horse. He has turned a blessing into a claim on the next blessing." },
    ],
    closer: [
      { title: "David and Hunayn", body: "David's saying that not a night passes without one of his household worshipping drew the response asking whence that came to them, and that without help there would have been no strength. Ibn Abbas read David's fall as beginning in conceit at his work when he ascribed it to his household. Asked to be tried, he presumed on patience before the trial arrived. At Hunayn, the believers relied on their strength and numbers." },
      { title: "Where the argument lands", body: "The one dominated by this knowledge is occupied by the fear of the blessing's removal rather than by delight in it. He looks at those stripped of faith and obedience without a prior offence and reasons that One who does not mind withholding without a crime does not mind reclaiming what He gave." },
    ],
    distinction: ["Two ways of reading one's portion", "As provision", "What has been given, including intellect and health, is counted, and the comparison dissolves.", "As entitlement", "What has been given becomes the argument for what has not, and the comparison never ends."],
    misreading: "Do not use the exchange test to dismiss real hardship or to tell anyone else that their difficulty is imaginary. It is offered as a private examination of a private complaint.",
    reflection: "Name the person whose portion you envy, and ask honestly whether you would take the whole exchange, including what they lack.",
    audit: ["Would I actually take the full trade?", "Which gift have I turned into a claim for the next?", "What have I ascribed to myself that arrived complete?", "Do I fear losing this more than I enjoy having it?"],
    nodes: ["provision", "attribution", "david"],
    model: chain("The exchange test", "A private examination that dissolves the comparison it began with.", [["Name the envy", "Identify whose portion looks better than your own.", "balance"], ["Offer the whole trade", "Include what they lack as well as what they hold.", "balance"], ["Watch the refusal", "The refusal is the finding: your own portion was already judged greater.", "support"], ["Return to the Giver", "What remains is a blessing counted, not a distribution disputed.", "support"]]),
  }),
  makeChapter({
    id: 17, shortTitle: "Eight kinds", formalTitle: "The kinds of conceit and the detail of their treatment",
    overview: "Ghazali closes the book by sorting conceit into eight kinds with a treatment for each. The list overlaps the seven grounds of pride but is not identical, because conceit can attach to things no one would boast of, and the last kind is the one he calls hardest of all.",
    moves: [
      { title: "Give the first four", body: "Conceit in the body, in strength, in intellect, and in noble lineage. Each treatment recalls how quickly the thing can be removed: a fever dissolves strength beyond recovery, a slight illness of the brain deranges the mind." },
      { title: "Give the treatment for intellect", body: "Its fruit is acting on one's own opinion alone, abandoning consultation, and deeming dissenters fools. The remedy is precise: measure your intellect from others rather than from yourself, and from your adversaries rather than your friends, since the flatterer praises and increases the conceit; and look at fools delighted by their own intellect while people laugh at them, and fear being one of them without knowing." },
      { title: "Give the remaining kinds", body: "Conceit in connection to unjust rulers rather than to religion and knowledge; conceit in numbers of children, servants, clan, and supporters, who will separate from you at the grave; and conceit in wealth." },
      { title: "Name the hardest", body: "The eighth is conceit in a mistaken opinion. Ghazali calls its treatment harder than all the rest, because the holder of a wrong view is ignorant of his error and would abandon it if he knew, and a disease that is not recognised cannot be treated. Ignorance is such a disease, so it is very hard to remedy." },
    ],
    closer: [
      { title: "Lineage and intercession", body: "The treatment of conceit in noble descent is careful. Nobility is by God-consciousness rather than descent; those addressed most closely were told to work for themselves. Ghazali affirms that intercession is real and that a relative may reasonably hope for it, then distinguishes sins for which it is permitted from those that incur wrath. Relying on it while abandoning God-consciousness, he says, resembles a sick man indulging his appetites because a skilled and loving physician happens to be his relative." },
      { title: "Why the eighth ends the book", body: "It is the only kind that defends itself. All the others can be shown to their owner; this one has already persuaded him. Ghazali's account of why sects persist is exactly this: each party rejoicing in what it has, holding fast because it is pleased with its own view." },
      { title: "The remedy he does give", body: "Because the sufferer will not hear a physician he suspects, the treatment has to be a standing habit rather than a correction. A person should hold his own opinion under permanent suspicion and never be taken in by it unless something decisive attests to it from the Book, the practice of the Prophet, or a sound rational proof meeting the conditions of proofs. Ghazali adds that recognising those conditions and the places where error hides in them requires a full aptitude, a penetrating mind, and long practice, and that even then error is not ruled out." },
      { title: "And the counsel for everyone else", body: "For a person who will not spend his life on knowledge, the advice is not to plunge into the schools, listen to them, or hear them out, but to hold that God is one with no partner and that nothing is like Him, that His Messenger is truthful in what he reported, to follow the way of the early community, to believe what came in the Book and the practice without probing for detail, and to occupy himself with God-consciousness, avoiding disobedience, discharging obedience, and compassion toward the Muslims." },
    ],
    distinction: ["Two ways a wrong opinion is held", "Held provisionally", "The person distrusts his own judgment, consults, and keeps asking, so error remains correctable.", "Held with conceit", "The view is loved because it is his, so counsel is not heard and the error is sealed in."],
    misreading: "Do not conclude that a person cannot know anything or should hold nothing firmly. The fault Ghazali identifies is delight in a view because it is one's own, not the holding of a considered position.",
    reflection: "Take a position you hold strongly and ask when you last sought out the strongest case against it. If the answer is never, that is the finding.",
    audit: ["Which view do I love because it is mine?", "Whom have I stopped asking?", "Do I measure my judgment from friends or from those who dispute it?", "What would change my mind, and have I ever looked for it?"],
    nodes: ["eight-kinds", "opinion", "lineage"],
    model: chain("Why the eighth kind is hardest", "It removes the condition that makes every other treatment possible.", [["A recognised fault", "The person sees the defect, so a remedy can be offered and taken.", "support"], ["An unrecognised fault", "The error is invisible to its holder, so nothing presents itself for treatment.", "warning"], ["A loved error", "The view is prized because it is his own, so counsel is heard as foolishness.", "warning"]]),
  }),
];

export const book29ConceptNodes: ConceptNode[] = [
  ["kibr", "Pride", "A rank claimed above another", "An inward swelling that requires someone to be ranked beneath oneself."],
  ["cloak", "The contested garment", "Greatness belongs to One", "Pride is censured as a claim on a description that suits God alone."],
  ["display", "Display", "The claim without words", "Bearing, gait, and dress can broadcast a superiority that is never spoken."],
  ["bearing", "Bearing", "Where the estimate surfaces", "Posture, glance, and voice carry the inward state into the street."],
  ["humility", "Humility", "Lowering that raises", "A refusal of the claim of superiority, praised only when free of wretchedness."],
  ["raising", "The exchange", "Lowered and then raised", "The reports treat the outcome of humility as automatic rather than negotiated."],
  ["three-beliefs", "Three beliefs", "The exact recipe", "A rank for oneself, a rank for the other, and one's own placed above it."],
  ["two-banes", "Two banes", "Truth and people", "Pride is defined by rejecting the truth and disdaining human beings."],
  ["objects", "Three objects", "God, messengers, people", "Pride is classified by whom it is directed at, and the classes are connected."],
  ["iblis", "The origin refusal", "Pride on a ground of origin", "A claim of better making produced a refusal of the command itself."],
  ["dispute", "Disputation", "Winning against gaining", "Debate for victory converts an inquiry into a defence of standing."],
  ["seven-grounds", "Seven grounds", "Two religious, five worldly", "Knowledge and works, then lineage, beauty, strength, wealth, and supporters."],
  ["knowledge", "Learning", "The fastest ground", "Knowledge inflates when it is really a craft, or when the soul was never cleansed."],
  ["degrees", "Three degrees", "Rooted, visible, audible", "The same disposition graded by how far it has travelled outward."],
  ["four-motives", "Four motives", "What drives the outward act", "Conceit, rancour, envy, and ostentation each produce proud behaviour."],
  ["solitude", "The solitude test", "What survives being alone", "Heaviness in company is ostentation; heaviness in solitude is pride."],
  ["ostentation", "Ostentation", "A transaction needing witnesses", "Behaviour that evaporates when the observers leave was never pride."],
  ["inventory", "The inventory", "Ordinary occasions", "Standing, visiting, seating, walking, carrying, and bearing insult."],
  ["dress", "Dress", "The hardest case", "Fine clothing is not necessarily pride, and coarse clothing is not necessarily humility."],
  ["treatment", "Two stations", "Root and occasion", "Uprooting the disposition, then meeting each specific ground on which it rises."],
  ["knowledge-cure", "Knowing", "Beginning, middle, end", "A meditation on what a person was, is, and becomes dissolves the comparison."],
  ["practice-cure", "Practising", "Persist in the opposite", "Do what pride forbids until humility becomes a disposition rather than an effort."],
  ["five-tests", "Five trials", "Making the hidden visible", "Correction, seating, invitation, carrying, and dress, each read twice."],
  ["comparison", "The comparison", "A reading for everyone met", "Ignorant, learned, older, younger, and erring each carry a ground above you."],
  ["mean", "The mean", "Justice, not maximum lowering", "Humility sits between pride and self-abasement, and both ends are faults."],
  ["justice", "Giving each his due", "The real name of the trait", "What is praiseworthy without qualification is putting things in their places."],
  ["ujb", "Conceit", "A blessing without its Giver", "Magnifying what one has and resting in it while forgetting whose it is."],
  ["despair", "Despair", "The opposite estimate", "Named beside conceit because both end the striving on which felicity depends."],
  ["hunayn", "Hunayn", "Right facts, wrong conclusion", "The numbers were real; the error lay in what they were taken to guarantee."],
  ["banes", "The banes", "What conceit disables", "Counting sins, inspecting works, hearing counsel, and continuing to strive."],
  ["inspection", "Inspection", "Only apprehension performs it", "Whoever does not examine his works for defects wastes most of his effort."],
  ["opinion", "One's own view", "Loved because it is yours", "A thought can be prized for its origin rather than its truth."],
  ["three-states", "Three states", "Fear, gratitude, possession", "Only the third state toward a real perfection is conceit."],
  ["idlal", "Presumption", "A claim on the Giver", "Conceit plus an expected return, revealed by marvelling that one's own request was refused."],
  ["keys", "The keys", "Given before the act", "Power, will, and knowledge are the keys to every treasury of good work."],
  ["treatment-ujb", "Contrary knowledge", "Ignorance treated by knowing", "The cause of conceit is ignorance, so the remedy is the knowledge that contradicts it."],
  ["attribution", "Attribution", "Where the credit sits", "The whole question of conceit reduces to where a gift is thought to come from."],
  ["provision", "Provision", "Intellect is counted too", "What has been given includes the faculties used to complain about what has not."],
  ["david", "Presuming early", "A claim before the trial", "Patience was claimed in advance, and the claim was tested."],
  ["eight-kinds", "Eight kinds", "The full sorting", "Body, strength, intellect, lineage, connection, numbers, wealth, and mistaken opinion."],
  ["lineage", "Descent", "Nobility by God-consciousness", "Intercession is real, and relying on it while abandoning care is a different matter."],
].map(([id, label, kicker, description], index) => ({ id, label, kicker, description, position: ["left", "right", "top", "bottom"][index % 4] }));

const node = (id: string, label: string, micro: string, summary: string, guardrail: string, chapterId: number, glyph: Journey["nodes"][number]["glyph"]): Journey["nodes"][number] => ({ id, label, micro, summary, guardrail, chapterId, glyph });

export const book29Journeys: Journey[] = [
  {
    id: "why-pride-blocks", number: "01", question: "Why does pride block everything?", title: "Trace the three beliefs and the closed door",
    description: "Separate the inward disposition from its visible acts, find the exact beliefs that produce it, and understand why a mustard seed's weight is treated as decisive.",
    payoff: "You can state what pride is with precision instead of treating it as a vague unpleasantness.",
    image: assetUrl("assets/system/book29-three-beliefs.jpg"), imageAlt: "A luminous white-and-gold courtyard where three measured plinths of unequal height stand before a closed colonnade of virtue gates.", minutes: 12, color: "#bf7a35",
    nodes: [
      node("name-the-claim", "Name the claim", "A contested garment", "Pride is censured as a claim on greatness that belongs to God alone.", "Holding rank or responsibility is not what the reports condemn.", 1, "name"),
      node("split-inward-outward", "Split inward from outward", "Disposition and its fruits", "Pride proper is a state of the soul; the behaviours are what it produces.", "An invisible state is not therefore an absent one.", 4, "know"),
      node("find-three-beliefs", "Find the three beliefs", "A rank, a rank, and above", "The disposition needs a rank for oneself, one for the other, and one placed higher.", "Thinking well of yourself alone does not build it.", 4, "pattern"),
      node("see-closed-doors", "See the closed doors", "Every virtue at once", "Self-importance makes each praiseworthy trait unaffordable and each blameworthy one necessary.", "The argument concerns a state, not a verdict on a person.", 4, "diagnose"),
      node("read-two-banes", "Read the two banes", "Truth and people", "Pride is defined as rejecting the truth and disdaining human beings.", "Debate for victory belongs on this list.", 5, "mirror"),
    ],
  },
  {
    id: "what-am-i-proud-of", number: "02", question: "What am I actually proud of?", title: "Walk the seven grounds and the three degrees",
    description: "Reduce every case of pride to one of seven grounds, learn why the two religious ones are the most dangerous, then grade how far the disposition has travelled outward.",
    payoff: "You can name your own ground and the depth at which it currently sits.",
    image: assetUrl("assets/system/book29-seven-grounds.jpg"), imageAlt: "Seven measured niches in a bright marble arcade, two set apart beneath a lamp and five ranged along a garden wall.", minutes: 14, color: "#278d91",
    nodes: [
      node("sort-seven", "Sort the seven", "Two religious, five worldly", "Knowledge and works, then lineage, beauty, strength, wealth, and supporters.", "The list describes grounds, not people.", 6, "order"),
      node("watch-knowledge", "Watch knowledge first", "The fastest ground", "Learning readily produces expectation of deference and contempt for ordinary people.", "This is not an argument against learning.", 6, "learn"),
      node("ask-which-rain", "Ask which rain", "Bitter bitterer, sweet sweeter", "Knowledge inflates when it is a craft, or when the soul was never cleansed first.", "Real knowledge is what increases fear and lowliness.", 6, "cultivate"),
      node("grade-degrees", "Grade the degrees", "Rooted, visible, audible", "The same disposition is read by how far it has reached conduct and speech.", "The rooted degree is not therefore harmless.", 6, "attend"),
      node("check-the-tell", "Check the bearing", "Gait, hem, and glance", "Outward marks broadcast the estimate without a word being spoken.", "This is a tell to notice in yourself, not a dress code for others.", 2, "witness"),
    ],
  },
  {
    id: "where-does-it-come-from", number: "03", question: "Where does pride actually come from?", title: "Separate four motives with one question",
    description: "Distinguish the single inward cause from the several drivers of proud behaviour, then apply the test that separates pride from ostentation and tells you which treatment you need.",
    payoff: "You leave with a usable diagnostic rather than a general suspicion of yourself.",
    image: assetUrl("assets/system/book29-four-motives.jpg"), imageAlt: "Four brass channels converging on a single gate, one continuing into an empty courtyard where the others fall away.", minutes: 13, color: "#c25f50",
    nodes: [
      node("one-cause-within", "Find the one cause", "Conceit beneath pride", "Inward pride has a single source, and it is being pleased with oneself.", "The outward act has more drivers than the inward state.", 7, "know"),
      node("map-four", "Map the four drivers", "Conceit, rancour, envy, display", "Proud behaviour arises from the self, from the other person, or from an audience.", "Two people may act identically for different reasons.", 7, "forces"),
      node("apply-solitude", "Apply the solitude test", "What survives being alone", "Heaviness before people is ostentation; heaviness in solitude is pride.", "Both diseases can be present, and curing one does not cure the other.", 7, "diagnose"),
      node("test-appearance", "Test appearance", "Even in his cat", "One who truly loves beauty keeps the same care in private; display lapses when unobserved.", "Neither fine nor coarse dress settles the question from outside.", 8, "mirror"),
      node("walk-inventory", "Walk the inventory", "Ordinary occasions", "Standing, visiting, seating, walking, and carrying are where the two dispositions become legible.", "Every item is a question addressed to the person holding the list.", 8, "attend"),
    ],
  },
  {
    id: "how-is-it-treated", number: "04", question: "How is pride actually treated?", title: "Uproot the root, then run the five trials",
    description: "Take the knowledge half and the practice half of the cure, meet each of the seven grounds on its own terms, then test the result against five ordinary trials and find the mean.",
    payoff: "You gain a treatment with a check, rather than a resolution you cannot verify.",
    image: assetUrl("assets/system/book29-two-stations.jpg"), imageAlt: "A bright cutaway garden court showing a root being lifted from the soil beside five graduated thresholds leading to a level bench.", minutes: 17, color: "#586fa8",
    nodes: [
      node("know-yourself", "Take the knowledge half", "Beginning, middle, end", "A meditation on what a person was, is, and becomes dissolves the comparison entirely.", "The aim is to dissolve a comparison, not install self-hatred.", 9, "remember"),
      node("practise-opposite", "Take the practice half", "Persist in the opposite", "Do what pride forbids until humility becomes a disposition rather than an effort.", "Knowledge alone does not settle a trait into the heart.", 9, "practice"),
      node("treat-the-grounds", "Treat each ground", "Outside and inside the self", "External grounds fall quickly; knowledge and works need their own two knowledges.", "The two real perfections are the hardest cases, not the exempt ones.", 10, "health"),
      node("run-five-trials", "Run the five trials", "Correction, seating, errand, load, dress", "Each trial is built to make a hidden heaviness surface where it can be treated.", "Sitting conspicuously low is itself a claim.", 10, "guard"),
      node("find-the-mean", "Find the mean", "Justice, not maximum lowering", "Humility sits between pride and self-abasement, and the act must come without heaviness.", "Flattery is a fault too, and calls for raising yourself back.", 11, "balance"),
    ],
  },
  {
    id: "whose-work-is-it", number: "05", question: "Why is my good work not mine?", title: "Follow the keys from the treasury to the eighth kind",
    description: "Distinguish three states toward a real perfection, define presumption beyond conceit, close the regress of attribution, and reach the one kind of conceit that defends itself.",
    payoff: "You can hold a genuine strength without either denying it or being held by it.",
    image: assetUrl("assets/system/book29-keys-treasury.jpg"), imageAlt: "A sunlit vaulted treasury whose brass keys rest in an open hand at the threshold while the chamber beyond stands full and quiet.", minutes: 16, color: "#a97837",
    nodes: [
      node("three-states", "Sort three states", "Fear, gratitude, possession", "Only rejoicing in a perfection as one's own, secure and unattributed, is conceit.", "Gladness at a blessing is explicitly protected.", 14, "pattern"),
      node("name-presumption", "Name presumption", "A claim on the Giver", "Expecting a return, and marvelling only when your own request is refused, goes beyond conceit.", "Every presumptuous person is conceited; the reverse does not hold.", 14, "name"),
      node("hold-the-keys", "Hold the keys", "Given before the act", "Power, will, and knowledge are the keys to every treasury, and they arrive from elsewhere.", "Locating the credit is not cancelling the act.", 15, "receive"),
      node("run-exchange-test", "Run the exchange test", "Would you take the trade?", "Refusing the full exchange shows you already judged your own portion greater.", "This is a private examination, not a reply to anyone's hardship.", 16, "clear"),
      node("meet-eighth-kind", "Meet the eighth kind", "The error that defends itself", "Conceit in a mistaken opinion is hardest because its holder cannot see the fault.", "Holding a considered position is not the fault described.", 17, "steady"),
    ],
  },
];

export const book29Movements: TaxonomyGroup[] = [
  ["censure", "1. Censure of pride", "Greatness as a contested divine attribute.", [1]],
  ["strutting", "2. Censure of strutting", "Gait, hem, and the marks of pride.", [2]],
  ["humility", "3. Excellence of humility", "Lowering oneself and being raised.", [3]],
  ["reality", "4. Reality of pride", "Three beliefs, the swelling, and the closed doors.", [4]],
  ["objects", "5. Whom pride targets", "God, the messengers, and other people.", [5]],
  ["grounds", "6. What people are proud of", "Seven grounds and three degrees.", [6]],
  ["motives", "7. Motives that provoke it", "Conceit, rancour, envy, and ostentation.", [7]],
  ["character", "8. Character of the humble", "Where humility and pride actually appear.", [8]],
  ["root", "9. Treatment, first station", "Uprooting the root by knowledge and practice.", [9]],
  ["occasions", "10. Treatment, second station", "The seven grounds and the five trials.", [10]],
  ["mean", "11. Limit of the training", "Humility as a mean, and justice as its name.", [11]],
  ["censure-ujb", "12. Censure of conceit", "Conceit paired with despair.", [12]],
  ["banes-ujb", "13. Bane of conceit", "Sins uncounted, works uninspected, striving slackened.", [13]],
  ["reality-ujb", "14. Reality of conceit", "Three states, and presumption beyond them.", [14]],
  ["treatment-ujb", "15. General treatment", "The dilemma, the regress, and the keys.", [15]],
  ["causes", "16. No agent but God", "Provision, the exchange test, and David.", [16]],
  ["kinds", "17. Kinds of conceit", "Eight kinds, ending with mistaken opinion.", [17]],
].map(([id, label, description, chapterIds], index) => ({ id, label, description, chapterIds, color: ["#bf7a35", "#278d91", "#c25f50", "#586fa8", "#a97837"][index % 5] })) as TaxonomyGroup[];

const verdicts = (light: string, company: string, solitude: string, both: string, chapters: [number, number, number, number]): SolitudeTrialItem["verdicts"] => [
  { id: "sound", label: "Light in both", name: "No finding here", body: light, repair: "Record the result as provisional and run a harder trial rather than concluding that the trait is settled.", chapterId: chapters[0] },
  { id: "ostentation", label: "Heavy only before people", name: "Ostentation", body: company, repair: "Treat the expectation rather than the act. Cut what you are hoping to receive from the observers, and complete the same act once where no one can connect it to you.", chapterId: chapters[1] },
  { id: "pride", label: "Heavy alone as well", name: "Pride", body: solitude, repair: "Treat the estimate rather than the audience. Recall what you were and what you become, then persist in the very act that feels heavy until it stops being heavy.", chapterId: chapters[2] },
  { id: "both", label: "Heavy in both", name: "Both diseases", body: both, repair: "Escaping one will not help while the other remains. Work the audience treatment and the estimate treatment together rather than choosing between them.", chapterId: chapters[3] },
];

export const book29SolitudeTrials: SolitudeTrialItem[] = [
  {
    id: "correction", label: "Correction", trial: "Debate a matter with an equal, and the truth appears on his tongue",
    purpose: "Wisdom is the believer's lost property, so the person who points it out is owed thanks rather than resistance.",
    companyQuestion: "In front of others, is it heavy to acknowledge that he is right, thank him, and admit you had missed it?",
    solitudeQuestion: "Alone with him, with no one else to hear, is it still heavy?",
    chapterId: 10,
    verdicts: verdicts(
      "Truth arriving through another person is not being weighed against your standing. Ghazali treats this as the trial most likely to expose buried pride, so a clean result here is worth something.",
      "The acknowledgement is available in private and expensive in public, which points at the audience rather than at your estimate of him. What is specific to the crowd is ostentation.",
      "The heaviness survives with no one watching, so it is not about how you appear. Something in you is ranking his position beneath your own, and that is pride itself.",
      "It is heavy whether or not anyone is present, and heavier still when they are. Both a claim about your standing and a concern for your image are active at once.",
      [10, 7, 4, 7],
    ),
  },
  {
    id: "seating", label: "Seating", trial: "Sit among your peers in a gathering and let them precede you",
    purpose: "The place a person takes among equals is where precedence is either genuinely dropped or quietly asserted.",
    companyQuestion: "With the room watching, is it heavy to take an ordinary place beside your peers rather than ahead of them?",
    solitudeQuestion: "When the arrangement will not be observed or remembered by anyone, is it still heavy?",
    chapterId: 10,
    verdicts: verdicts(
      "Precedence is not being tracked. Ghazali's warning here is that this trial is the easiest to fake, so check that you sat level rather than conspicuously low.",
      "The ordinary place is fine unobserved and costly when seen, which locates the trouble in the watchers. Note that descending to the shoe-row would satisfy them and prove nothing.",
      "The reluctance persists with no audience, so a rank is being held rather than displayed. Sit beside your peers, not beneath them, until the position stops registering.",
      "Both the estimate and the audience are in play. The conspicuous descent will be especially tempting here, and Ghazali identifies it as the very thing it appears to cure.",
      [10, 7, 4, 7],
    ),
  },
  {
    id: "invitation", label: "Invitation", trial: "Answer a poor person's invitation, and run an errand for a companion",
    purpose: "These are among the noble traits, so a soul that shrinks from them is reacting to something other than the act.",
    companyQuestion: "If people you know will see you doing it, is it heavy?",
    solitudeQuestion: "If no one you know will ever learn of it, is it still heavy?",
    chapterId: 10,
    verdicts: verdicts(
      "An ordinary kindness is not being priced against your position. Ghazali reasons that the reward here is substantial, so aversion would have to come from somewhere.",
      "The act is fine until it becomes visible, so what you are protecting is a picture of yourself held by others rather than a rank held by you.",
      "The shrinking happens where no one can see, which means the act itself is registering as beneath you. That is the finding, and it is treatable.",
      "The aversion is present in both conditions. Treat the sense that the act is beneath you and the concern about being seen at it as two separate problems.",
      [10, 7, 4, 7],
    ),
  },
  {
    id: "carrying", label: "Carrying", trial: "Carry your own goods home from the market",
    purpose: "Ghazali cites Ali's remark that carrying something to one's household takes nothing from a complete man, and Ibn Salam testing himself deliberately with a bundle of firewood.",
    companyQuestion: "On a busy street where you may be recognised, is it heavy to carry the load yourself?",
    solitudeQuestion: "On an empty road, with the same load, is it still heavy?",
    chapterId: 10,
    verdicts: verdicts(
      "The load is a load. Ghazali gives this trial precisely because the two conditions are so easy to arrange, which makes a clean result here reasonably informative.",
      "Ghazali names this case explicitly: if it is heavy only when people are watching, it is ostentation. The street, not the weight, is what changed.",
      "He is equally explicit in the other direction: if it is heavy on an empty road, it is pride. Nothing social is operating, so the aversion belongs to your estimate of yourself.",
      "The weight is heavier in company and still heavy alone. Ghazali notes that people have neglected the medicine of hearts while attending to the medicine of bodies; this is a case for both treatments.",
      [10, 7, 4, 7],
    ),
  },
  {
    id: "dress", label: "Dress", trial: "Wear plain clothes",
    purpose: "Neither fine nor coarse dress settles anything from the outside, since the wearer of wool can be prouder than the wearer of embroidered silk.",
    companyQuestion: "Where people whose opinion you value will see you, is plain dress heavy?",
    solitudeQuestion: "In a day no one will observe, is it still heavy?",
    chapterId: 8,
    verdicts: verdicts(
      "The clothing is not doing social work. Ghazali's mark of the person who simply loves beauty is that the same care appears in solitude, which is not the fault under discussion.",
      "The plainness is bearable in private and costly in public, which is his stated definition of ostentation in this case. The garment is being asked to carry a claim.",
      "It is heavy where no one could register it, so the objection is not to how you appear to others but to how the plainness sits with your own sense of rank.",
      "Both the appearance and the estimate are involved. Ghazali's recommended measure is the middle of dress, drawing attention neither by quality nor by poverty.",
      [8, 7, 4, 7],
    ),
  },
];

export const book29Sources: SourceLink[] = [
  { label: "Primary Arabic, Part One", note: "The complete public Arabic of the first part, on pride, read in full. Ghazali's own opening list of its discussions is what fixes the order of the first eleven reading sections.", url: "https://shamela.ws/book/9472/1082" },
  { label: "Primary Arabic, Part Two", note: "The complete public Arabic of the second part, on conceit, read in full. Its opening list fixes the order of the final six reading sections.", url: "https://shamela.ws/book/9472/1115" },
  { label: "The two stations of treatment", note: "The page on which Ghazali names the two stations of treating pride, uprooting the root and meeting the seven grounds. That named boundary is where the long section is presented as two consecutive readings.", url: "https://shamela.ws/book/9472/1104" },
  { label: "Forty-book structure", note: "Ghazali.org's listing places Book 29 as the ninth book of the Quarter of Perils and confirms its title.", url: "https://www.ghazali.org/listing-the-forty-books/" },
  { label: "Ihya bibliography", note: "Ghazali.org's book-by-book bibliography records the available translation status for Book 29.", url: "https://www.ghazali.org/site/ihya.htm" },
];


export const book29: SystemBook = {
  id: 29,
  title: "The Censure of Pride and Conceit",
  shortTitle: "Pride and Conceit",
  defaultJourneyId: "why-pride-blocks",
  chapters: book29Chapters,
  conceptNodes: book29ConceptNodes,
  journeys: book29Journeys,
  sources: book29Sources,
  taxonomy: {
    title: "Seventeen source movements",
    note: "The first eleven filters preserve Part One's announced discussions on pride. The final six preserve Part Two's stated structure on conceit. The long treatment section is presented as two consecutive readings at the boundary Ghazali announces himself.",
    groups: book29Movements,
  },
  solitudeTest: {
    title: "The solitude test",
    note: "Ghazali gives this diagnostic three times and states it as a rule: what is specific to the crowd is ostentation, and what happens in solitude is pride. Answer both questions for one trial and read which disease the pattern indicates. This is a private aid for choosing a treatment, not a verdict on your heart.",
    items: book29SolitudeTrials,
  },
  editorialNote: "The five journeys, seventeen reading sections, visual models, and solitude test are editorial learning aids. The eleven plus six sequence preserves the two parts Ghazali announces in his introduction; the long section on treating pride is presented as two consecutive readings at the two stations he names himself, rather than at an invented division. The English is an original synthesis made from a complete reading of the public Arabic text, not a translation and not a substitute for one. Fons Vitae has not published a complete English Book 29, and this prototype does not claim access to one. Reports and inherited anecdotes are presented as material Ghazali transmitted; this prototype does not independently grade every narration. The solitude test sorts a behaviour toward a likely cause so that a fitting treatment can begin. It cannot pronounce on sincerity, reward, or a person's standing. Complex personal cases require the complete Arabic, a reliable full edition when available, and qualified scholarly guidance.",
};
