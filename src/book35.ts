import { assetUrl } from "./assetUrl";
import type { Chapter, ConceptNode, VisualModel } from "./data";
import type { ConceptLab, Instrument, Journey, SourceLink, SystemBook, TaxonomyGroup } from "./systemTypes";

type Seed = { id: number; shortTitle: string; formalTitle: string; overview: string; thesis?: string; moves: Array<{ title: string; body: string }>; closer: Array<{ title: string; body: string }>; distinction: [string, string, string, string, string]; misreading: string; reflection: string; audit: string[]; nodes: string[]; model: VisualModel };
const makeChapter = (seed: Seed): Chapter => ({
  id: seed.id, shortTitle: seed.shortTitle, formalTitle: seed.formalTitle, overview: seed.overview,
  reflection: seed.reflection, relatedNodes: seed.nodes, visualModel: seed.model,
  deep: { thesis: seed.thesis ?? seed.moves[0].body, context: seed.overview, moves: seed.moves, closeReading: seed.closer,
    distinction: { title: seed.distinction[0], firstLabel: seed.distinction[1], first: seed.distinction[2], secondLabel: seed.distinction[3], second: seed.distinction[4] },
    misreading: seed.misreading, observation: seed.reflection, selfAudit: seed.audit,
    sourceAnchor: `Book 35, ${seed.id <= 4 ? "Part One, on unity" : "Part Two, on trust"}, ${seed.formalTitle}.` },
});
const chain = (title: string, caption: string, items: Array<[string, string, "support" | "balance" | "warning"]>): VisualModel => ({ kind: "chain", title, caption, items: items.map(([label, body, role]) => ({ label, body, role })) });
const pair = (title: string, caption: string, items: Array<[string, string, "support" | "balance" | "warning"]>): VisualModel => ({ kind: "pair", title, caption, items: items.map(([label, body, role]) => ({ label, body, role })) });
const spectrum = (title: string, caption: string, items: Array<[string, string, "support" | "balance" | "warning"]>): VisualModel => ({ kind: "spectrum", title, caption, items: items.map(([label, body, role]) => ({ label, body, role })) });

const book35Base: Chapter[] = [
  makeChapter({
    id: 1, shortTitle: "Why trust is praised", formalTitle: "The excellence of trust",
    overview: "Ghazali opens by gathering the testimony for trust, and states at once that the book has two halves because trust rests on a knowledge that has to be set out first.",
    thesis: "The testimony for trust is gathered first, and it is strong enough that the rest of the book has to work against it.",
    moves: [
      { title: "Gather the testimony", body: "The verses and reports praising reliance on God are gathered first, and there are enough of them to establish how highly it is rated before anything gets defined." },
      { title: "Announce the structure", body: "Trust is composed of knowledge, a state, and an act, as every station is. The first part of the book treats the knowledge, which is unity, and the second treats the state and the acts." },
      { title: "Name what the knowledge is", body: "The knowledge underlying trust is the unity translated by the words that there is no god but God alone with no partner, together with belief in the power expressed by His is the dominion and in the generosity and wisdom expressed by His is the praise." },
      { title: "Say when the foundation is complete", body: "Whoever says that formula in such a way that its meaning becomes a settled attribute of his heart, dominating it, has the faith that is the root of trust." },
      { title: "Note what the knowledge is made of", body: "The knowledge underlying trust is not one belief but three, and each is doing separate work. Unity — that there is one, with no partner. Power — that the dominion is His, so nothing is outside what He can do. And generosity and wisdom — that the praise is His, so what is done is done well. A person can hold any two and find the state will not come, which is why the three get three sections." },
      { title: "Take the condition on the formula", body: "And the condition attached is exacting: saying the words in such a way that the meaning becomes a settled attribute of the heart, dominating it. Not assenting to them, not being able to defend them — dominating. Which sets a bar that the second section will then measure with four ranks, and it explains why so many people hold the doctrine correctly and have no trust at all." },
    ],
    closer: [
      { title: "Why unity comes first", body: "A state of reliance cannot be produced by being urged. It follows from what a person actually believes about the one relied upon, which is why the whole first half is given to that." },
      { title: "The limit Ghazali sets", body: "He notes that unity is a shoreless sea belonging to the science of unveiling, and that he will treat only the portion connected to practice. The reticence is stated rather than performed." },
    ],
    distinction: ["Two ways to approach trust", "Through its knowledge", "What a person believes about the one relied upon, which produces the state.", "Through exhortation", "Urging the state directly, which is what the book's structure declines to do."],
    misreading: "Do not read the praise of trust as a call to abandon means. The second half of the book is largely occupied with showing that it is not.",
    reflection: "Ask what you actually believe about the one you say you rely on, before asking why you do not rely more.",
    audit: ["What do I believe about Him, in practice?", "Is that belief a settled attribute or a phrase?", "Where does my anxiety contradict what I say?", "Have I tried to produce reliance by resolve?"],
    nodes: ["tawakkul", "tawhid"],
    model: chain("The book's structure", "The order is the argument.", [["Unity", "The knowledge that is the root, treated in Part One.", "support"], ["The state", "Reliance, which follows the knowledge rather than being summoned.", "balance"], ["The acts", "What those who trust actually do, which is most of Part Two.", "support"]]),
  }),
  makeChapter({
    id: 2, shortTitle: "Four degrees, one walnut", formalTitle: "The reality of the unity that is the root of trust",
    overview: "The most quoted passage in the book. Ghazali sorts unity into four degrees using a single image, and is unusually direct about where the theologians sit in it.",
    thesis: "Unity sorts into four degrees, and only the fourth is the one the Sufis mean by annihilation.",
    moves: [
      { title: "Give the image", body: "Unity has four ranks, divided into a kernel, the kernel of the kernel, a shell, and the shell of the shell. The comparison is a walnut, which has two shells, a kernel, and an oil within the kernel." },
      { title: "The first two degrees", body: "The first is to say the words with the tongue while the heart is heedless of them or denies them, which is the unity of the hypocrites. The second is that the heart assents to the meaning of the words, as the generality of Muslims do." },
      { title: "The third degree", body: "To see it directly, disclosed by God's own light — the station of those brought near, where he sees many things and sees them, in their multiplicity, as issuing from the One." },
      { title: "The fourth degree", body: "Seeing only one thing in existence at all. This is what the truthful arrive at, and what the Sufis call being annihilated in oneness — because somebody who sees only one does not see himself either." },
      { title: "Take the walnut image seriously", body: "The image is chosen because a walnut has exactly the parts the argument needs: two shells, a kernel, and an oil inside the kernel. Which means the four ranks are not four opinions to choose between but four depths of one thing, each enclosing the next. The outermost is not false — it is a shell, and shells belong to walnuts — but a person who has only that has not reached anything edible." },
      { title: "Note where the ordinary believer sits", body: "And it is worth registering where the second rank falls: the heart assenting to the meaning, which is where the generality of Muslims are. That is the outer shell, not the kernel. Ghazali is not calling ordinary belief hypocrisy — the first rank covers that — but he is saying plainly that correct assent is two removes from what the third and fourth ranks describe, and that trust rests on more of the walnut than most people have opened." },
    ],
    closer: [
      { title: "What each degree secures", body: "The first protects its owner in this world from the sword. The second protects from punishment in the hereafter if he dies upon it and sins have not weakened the knot. Ghazali is precise about how much each actually does." },
      { title: "Where theology sits", body: "The second degree is a knot on the heart with no expansion in it. Innovation is the set of devices that loosen the knot, and theology is the set that defends it; the theologian is called a unifier because he guards the knot on the hearts of the common people. Ghazali adds that the theologian does not differ from the common man in the belief itself, only in the craft of composing the speech that fends off the loosening." },
    ],
    distinction: ["Two things called unity", "A knot", "The heart assents to the meaning and holds it, which is real and is what most people have.", "An unveiling", "The many are seen as coming from One — which is a different level, not a stronger version of the previous one."],
    misreading: "Do not read the higher degrees as making the lower ones worthless. Ghazali states exactly what each secures, and the second is what he says protects a person in the hereafter.",
    reflection: "Locate yourself honestly on the four. Almost every reader is on the second, and Ghazali does not treat that as a failure.",
    audit: ["Which degree is actually mine?", "Is my belief a held knot or a heedless phrase?", "Have I mistaken defending the knot for having more than it?", "What would the third degree change in a difficult hour?"],
    nodes: ["tawhid", "four-degrees"],
    model: spectrum("The walnut", "Each layer is real, and each secures something different.", [["Outer shell", "The tongue alone; the unity of the hypocrites.", "warning"], ["Inner shell", "The heart's assent; a knot without expansion, and what most people have.", "balance"], ["The kernel", "Many things seen as issuing from One; the station of the near.", "support"], ["The oil", "Only one seen at all, so the seer is not seen either.", "support"]]),
  }),
  makeChapter({
    id: 3, shortTitle: "His is the dominion", formalTitle: "Belief in the power that trust rests on",
    overview: "The second component of the knowledge. Unity establishes that there is one; this establishes that the one is able, without which reliance would have no object.",
    thesis: "Believing God can is the second thing trust needs, and it is not the same as believing He exists.",
    moves: [
      { title: "State what is required", body: "Belief in the completeness of the power expressed by the words that His is the dominion, so that nothing relied upon is beyond what He can do." },
      { title: "Say why it is separate", body: "A person may hold that there is one and still act as though a particular matter lies outside what can be reached, which is a failure in this component rather than in unity." },
      { title: "Show where it bites", body: "The practical form is the belief that among what is possible there are hidden causes besides the apparent ones, which is what allows a person to act without having seen the route." },
      { title: "Connect it to the state", body: "Reliance is impossible where the one relied upon is thought unable, so this belief is a condition of the state rather than an addition to it." },
      { title: "Note why power needs its own section", body: "Unity settles that there is one; it does not settle that everything is within His reach. And a person can hold both propositions and still behave as though some particular matter lies outside what can be done about it — which is not a failure of unity but of this second component. Separating them is what lets a man diagnose why his trust fails on one subject and holds on others." },
      { title: "Take the practical form of the belief", body: "And the practical shape of it is exact: believing that among what is possible there are hidden causes besides the ones you can see. Which is what makes it possible to act without having worked out the route. A person who believes only in the causes he can identify is not relying on God at all — he is relying on a plan, and his confidence will track how good the plan looks." },
    ],
    closer: [
      { title: "Hamdun's version", body: "Asked about trust, Hamdun al-Qassar answered that if you had ten thousand dirhams and owed a fraction of a coin you would not be safe from dying with the debt on your neck, and if you owed ten thousand with nothing set aside for it you would not despair of God's settling it for you. Ghazali reads this as pointing precisely at the breadth of the power and the hidden causes." },
      { title: "Why this is not optimism", body: "The belief concerns what is possible for God rather than what is likely to happen, which is why it can be held together with the vigilance the rest of the book requires." },
    ],
    distinction: ["Two beliefs that sound alike", "That He is able", "Nothing relied upon exceeds what can be done, including by causes not in view.", "That it will go well", "A prediction about outcomes, which the book nowhere requires and which is not what reliance rests on."],
    misreading: "Do not convert this into an expectation that the thing you want will happen. What is asserted is the breadth of what is possible, not the direction of the outcome.",
    reflection: "Take a matter you are anxious about and ask whether your anxiety is really about whether it can be done at all.",
    audit: ["Do I act as if this were beyond reach?", "Am I only counting routes I can see?", "Have I confused reliance with prediction?", "Where do I say able and behave otherwise?"],
    nodes: ["tawakkul", "power", "causes"],
    model: pair("What the belief covers", "The distinction keeps reliance from becoming forecasting.", [["What is possible", "Including causes not in view, which is the belief required.", "support"], ["What is likely", "A prediction about outcomes, which is a different thing entirely.", "warning"]]),
  }),
  makeChapter({
    id: 4, shortTitle: "His is the praise", formalTitle: "Belief in the generosity and wisdom that trust rests on",
    overview: "The third component, and the hardest. Power alone would not produce reliance; what is also needed is belief that the power is exercised with wisdom and generosity.",
    thesis: "Power alone would not be enough to rest on, which is why generosity and wisdom are the third component and the hardest.",
    moves: [
      { title: "State the component", body: "Belief in the generosity and wisdom indicated by the words that His is the praise, so that what is done is done well and not arbitrarily." },
      { title: "Say why power alone is insufficient", body: "One may believe that an agent is able and still not rely on him, if he doubts that the ability will be exercised with care. This is the same gap the advocate analogy makes explicit in Part Two." },
      { title: "Acknowledge the difficulty", body: "This is where the hard questions about the decree arise, and Ghazali takes them up rather than avoiding them, while marking that the full account belongs to a science he is not opening here." },
      { title: "Mark the limit", body: "He says explicitly that the fineness of this touches the secret of the decree, whose disclosure was withheld, and stops there. The reticence is the same one Book 32 showed at the same point." },
      { title: "Follow why power alone is not enough", body: "The gap here is easy to miss and it is the one that stops most people. A person may be entirely convinced that an agent is able and still not rely on him — because ability says nothing about whether it will be exercised with care. Which is exactly what the advocate analogy will make explicit: competence and goodwill are separate beliefs, and reliance needs both." },
      { title: "Note where he stops", body: "And this is where the hard questions about the decree arrive, and Ghazali takes them up rather than stepping round them — then marks that the fineness of it touches the secret of the decree, whose disclosure was withheld, and stops. Which is the same reticence the book on gratitude showed at the same point, and it is worth noticing that the two books halt at exactly the same door." },
    ],
    closer: [
      { title: "Abu Yazid's answer", body: "Asked about trust, Abu Yazid went past the usual answers to say that if the people of the Garden were in it enjoying and the people of the Fire in it punished, and then a distinction arose in you between them, you would have left trust entirely. Ghazali reads this as the knowledge of wisdom, and says Abu Yazid rarely speaks except of the highest stations." },
      { title: "Why he includes something he cannot complete", body: "Because the component is genuinely required and a book that omitted it would leave reliance resting on power alone. Naming a limit is different from pretending there is none." },
    ],
    distinction: ["Two beliefs about the same power", "Exercised with wisdom", "What is done is done well, which is what makes reliance possible.", "Exercised arbitrarily", "Ability without care, which produces fear rather than reliance."],
    misreading: "Do not read this as a claim that every hardship is straightforwardly explicable. Ghazali marks the point at which his account stops and does not carry it further.",
    reflection: "Notice whether your difficulty with trust is about ability or about care. They are different problems and only one of them is common.",
    audit: ["Do I doubt the ability or the care?", "What in my history makes the second hard?", "Have I demanded an explanation as the price of trust?", "Where does my reliance actually break down?"],
    nodes: ["tawhid", "wisdom", "decree"],
    model: chain("Why three components", "Reliance fails if any one of them is missing.", [["One", "There is a single agent behind what occurs.", "support"], ["Able", "Nothing relied upon exceeds what can be done.", "support"], ["Wise and generous", "The ability is exercised with care, which is what makes reliance rather than fear.", "support"]]),
  }),
  makeChapter({
    id: 5, shortTitle: "The advocate", formalTitle: "The definition of trust",
    overview: "Part Two opens with the definition, and Ghazali gives it through an analogy that turns an inward state into four checkable beliefs.",
    thesis: "The word comes from appointing an agent, and the definition is built out of that comparison.",
    moves: [
      { title: "Derive the word", body: "The word comes from appointing an agent. To entrust something to somebody is to hand it over and depend on him for it. The person you hand it to is the agent, and you are the one relying — provided you are actually at ease about it and not suspecting him of letting you down." },
      { title: "Give the analogy", body: "Someone falsely accused by a deception appoints an advocate to expose it. He is not truly relying on him unless he believes four things about him." },
      { title: "Name the four", body: "The utmost guidance, so that he knows where the deceptions lie and nothing of their subtlety escapes him. The utmost power, so that he dares to state the truth plainly and is not stopped by flattery, fear, shame, or cowardice. The utmost eloquence, which is power in the tongue to express whatever the heart has grasped. And the deepest compassion, which moves him to spend everything he has on it." },
      { title: "Give the failure condition", body: "If the client doubts any of the four qualities, or thinks the opposing advocate has them more fully, he cannot rest with his own agent. The heart remains disturbed and absorbed in personal planning meant to compensate for what the agent is feared to lack." },
      { title: "Note how much the derivation settles", body: "Deriving the word from appointing an agent settles a great deal before any theology arrives. Entrusting something means handing it over and depending on somebody for it — with the condition that you are actually at ease and not suspecting him. Which makes trust a relation with a definite structure, and means the question of whether somebody has it is a question about his ease rather than about his opinions." },
      { title: "Take the four beliefs about the advocate", body: "And the four things the client must believe are precise and they are separable. That the advocate knows where every deception lies. That he has the nerve to state the truth plainly and will not be stopped by flattery, fear, shame or cowardice. That he can actually say what he has grasped. And that he cares enough to spend everything he has on it. Knowledge, courage, expression, compassion — and a doubt about any one of them is enough." },
      { title: "Follow the failure condition", body: "The failure is described in a way anyone in this position will recognize. Doubt one of the four qualities, or think the other side's advocate has them more fully, and the heart remains disturbed. The client starts making compensating plans for what he fears his representative lacks. That preoccupation is the visible symptom, and it is the opposite of the ease by which reliance was defined." },
    ],
    closer: [
      { title: "What the analogy accomplishes", body: "It converts an inward state that a person can only claim into four beliefs he can check. Where reliance is absent, the analogy says which of the four is the reason, which is exactly what an exhortation to trust more cannot do." },
      { title: "How the four transfer", body: "Applied to God, the third condition cannot fail, so the only thing left to doubt is whether the matter is known, whether it can be done, and whether it is cared about. Anxiety that survives assent to all three is not about the Trustee at all." },
    ],
    distinction: ["Two people with an advocate", "At rest", "All four qualities are trusted, so the client is not consumed by personal planning.", "Trying to compensate", "One quality is doubted, and that doubt appears as preoccupation rather than as a stated disbelief."],
    misreading: "Do not read the analogy as making reliance a legal transaction. It is offered to locate the specific belief that is missing, which is what the rest of Part Two builds on.",
    reflection: "Take the matter you are most anxious about and ask which of the three transferable conditions you actually doubt.",
    audit: ["Which of the four would I hesitate over?", "Is my anxiety about knowledge, power, or care?", "What personal plan is my heart using as its guarantee?", "If I doubt none of them, what is the anxiety about?"],
    nodes: ["tawakkul", "four-conditions"],
    model: chain("The advocate's four conditions", "Doubting any one keeps the heart busy trying to compensate.", [["Guidance", "He knows where the deception lies, and nothing subtle escapes him.", "support"], ["Power", "He dares state the truth without flattery, fear, shame, or cowardice.", "support"], ["Expression", "He can put into words whatever his heart has grasped.", "support"], ["Compassion", "He will actually spend everything he can on the matter.", "support"]]),
  }),
  makeChapter({
    id: 6, shortTitle: "Three stations", formalTitle: "The degrees of trust",
    overview: "Trust is not one condition, and Ghazali sorts it into three stations so that the reader can locate his own without either claiming or disowning the whole state.",
    thesis: "Trust is three stations, not one condition, and most disagreement about it is people describing different ones.",
    moves: [
      { title: "Give the first station", body: "The condition of a person whose heart is at rest with the agent as the client is with an advocate he fully credits, while he continues to act as a client acts." },
      { title: "Give the second", body: "A closer condition, in which the reliance is like a child's on its mother: the child knows nothing but her, flees to nothing but her, and does not deliberate about arrangements at all." },
      { title: "Give the third", body: "The furthest, in which a person is before God as a corpse in the hands of the washer, moved without any motion of his own, which is the station Ghazali attributes to the sayings that seem most extreme." },
      { title: "Say who is being described", body: "He notes that the highest station is rare and that the sayings of the masters usually report the station of the speaker, which is why they appear to conflict." },
      { title: "Note the three images and what they concede", body: "The three stations are given as three images and the first is the important one for most readers: a client at ease with his advocate, who goes on doing what a client does. So the first degree of trust involves acting, deliberating and arranging — and is genuinely trust. The second is a child with its mother, which has stopped deliberating; the third is a corpse in the washer's hands, which has stopped moving at all." },
      { title: "Take the point about the masters' sayings", body: "And the observation at the close explains a great deal of confusing material: the highest station is rare, and the masters' sayings usually report the station of whoever is speaking. Which is why the definitions appear to contradict each other. They are not competing accounts of trust; they are accurate reports from three different places, and the seventh section sorts them accordingly." },
    ],
    closer: [
      { title: "Why the stations resolve the disagreements", body: "Ghazali gathers the masters' definitions and shows that each reports a different station rather than contradicting the others. It is the same move he makes with the classes of suggestion in Book 21." },
      { title: "The child and the mother", body: "The middle station's image is chosen carefully. The child is not passive; it cries out and reaches for her. What it does not do is deliberate about whether she will come." },
    ],
    distinction: ["Two ways of reading conflicting definitions", "As stations", "Each master reports the degree he occupies, and the accounts are compatible.", "As contradictions", "One of them must be right, which forces the reader to choose and misreads all of them."],
    misreading: "Do not measure yourself against the third station. Ghazali says it is rare and that the sayings describing it come from people speaking of the furthest degrees.",
    reflection: "Locate your own station on the three, and note that the first is a real one and is where the book expects most readers.",
    audit: ["Which station describes me?", "Am I comparing myself to the third?", "Does my reliance still deliberate?", "What would the second look like in my case this week?"],
    nodes: ["tawakkul", "three-stations"],
    model: spectrum("Three stations of trust", "Each is real, and the highest is rare.", [["The client", "At rest with the agent while continuing to act as a client acts.", "support"], ["The child", "Knows nothing but her, and does not deliberate about arrangements.", "support"], ["The washed", "Moved without any motion of one's own, which Ghazali marks as rare.", "balance"]]),
  }),
  makeChapter({
    id: 7, shortTitle: "What the masters meant", formalTitle: "What the masters said about the states of trust",
    overview: "Ghazali collects the definitions given by earlier figures and shows that each reports a station rather than contradicting the others, which is his standard method with a disputed subject.",
    thesis: "The masters' definitions are collected and sorted by which station each is actually describing.",
    moves: [
      { title: "State the method", body: "The definitions differ because each speaker described his own station, which is the habit of the masters. Rather than choosing between them, Ghazali assigns each to the degree it reports." },
      { title: "Work an example", body: "Dhul-Nun described trust as removing rival masters and cutting attachment to causes. Ghazali reads the first phrase as pointing to knowledge of divine unity and the second to action. When pressed further, Dhul-Nun described placing the self in servanthood and removing it from claims of mastery. Ghazali takes this as giving up the claim to independent power and control." },
      { title: "Work a second", body: "Abu Abdullah al-Qurashi answered that it is attachment to God in every state, which covers all three stations, and then that it is leaving every cause that leads to a cause, which points at the third alone." },
      { title: "Give the illustration", body: "Abraham's answer to Gabriel, that he had no need of him, is read as leaving a cause that leads to a cause: asking would have been a cause producing the cause of Gabriel's protection, and it was left in the confidence that God, if He willed, would appoint Gabriel to it Himself." },
      { title: "Note the method being used on the sources", body: "Rather than adjudicating between the masters, Ghazali assigns each saying to the degree it reports — which is the same move he made with the four positions on suggestion in the book on the heart and with the intellect in the book on knowledge. A long-standing disagreement turns out to be several correct descriptions of different things, and the resolution is a sorting rather than a verdict." },
      { title: "Follow Abraham's answer", body: "And the illustration is the sharpest thing in the section. Abraham, offered help by Gabriel, says he has no need of him — and Ghazali reads it precisely: asking would have been a cause producing the cause of Gabriel's protection, and it was left in the confidence that God, if He willed, would appoint Gabriel Himself. Which is not the refusal of help. It is declining to operate one link further back in a chain that was going to run anyway." },
    ],
    closer: [
      { title: "Abu Yazid on the snakes", body: "Somebody suggested that trust means lions and vipers on either side of you would not disturb you inwardly. Abu Yazid said that was close, and then went further than it. Ghazali reads the first as describing the third station and the second as describing the deepest knowledge, and notes that Abu Yazid rarely talks about anything but the furthest levels." },
      { title: "The correction that follows", body: "Refusing to guard against snakes is not a requirement of the first station of trust. Abu Bakr blocked up the snake holes in the cave. Ghazali's reasoning: trust is lost when something shifts inside you, not when your hand moves — and somebody taking a precaution is not relying on his own cleverness but on the One who made cleverness." },
    ],
    distinction: ["Two readings of an extreme saying", "As a station", "It reports the speaker's own degree, and does not bind those at another.", "As the definition", "It states what trust is for everyone, which would make almost everyone faithless."],
    misreading: "Do not take the most extreme definition as the standard. Ghazali's whole treatment of these sayings is designed to prevent that reading.",
    reflection: "Find the definition of trust you have been holding, and ask which station it came from.",
    audit: ["Whose definition have I adopted?", "Which station was the speaker in?", "Have I been failing a test set for someone else?", "What does the first station actually require of me?"],
    nodes: ["tawakkul", "three-stations", "means"],
    model: pair("Why the definitions differ", "Each reports a station rather than contesting the others.", [["Compatible", "Assigned to degrees, the accounts fit together and none is discarded.", "support"], ["Contradictory", "Read as rival definitions, they force a choice that misreads all of them.", "warning"]]),
  }),
  makeChapter({
    id: 8, shortTitle: "Trust and earning", formalTitle: "The acts of those who trust",
    overview: "The question the whole second half exists to answer. If a person relies on God, does he work? Ghazali's answer is unambiguous and occupies the rest of the book.",
    thesis: "The question the second half exists for: whether trusting means doing nothing.",
    moves: [
      { title: "Reject the inference", body: "Trust does not mean giving up work. What breaks reliance is not your hand moving; it is something inside you shifting toward relying on something else." },
      { title: "Locate reliance correctly", body: "Somebody who takes a practical step is not relying on his own resourcefulness and strength, so long as his heart is resting on the One who made resourcefulness and strength. The step and the reliance sit on different levels." },
      { title: "Sort the means", body: "Ghazali distinguishes causes that are certain, those that are probable, and those that are speculative, and the treatment of each differs, which is what makes the subject a practical one." },
      { title: "Keep the state central", body: "The test is always where the heart is resting, because the same visible act fits both conditions and so cannot settle it on its own." },
      { title: "Take the refusal of the obvious inference", body: "The inference invited by the whole subject is refused directly: trust does not mean giving up work. What breaks reliance is not the hand moving, but the heart shifting toward a different support. The visible act therefore cannot settle the question in either direction. A person who stops working has not automatically gained trust." },
      { title: "Note the sorting of causes", body: "And the causes are sorted into the certain, the probable and the speculative, which is what makes this a practical subject rather than a devotional one. The three are treated differently — and it is that distinction, more than anything else, that the sections on medical treatment rest on. Refusing a remedy whose effect is established is a different act from declining one that might work." },
    ],
    closer: [
      { title: "Why this had to be argued", body: "The reports on trust are strong enough that a reader could reasonably conclude taking practical steps is a failing. Ghazali answers by moving where the state lives, so the visible act stops counting as evidence in either direction." },
      { title: "The cave", body: "Abu Bakr blocking the snake holes is the example that governs the whole discussion. The act was taken and the reliance was not disturbed, which is the possibility the section is establishing." },
    ],
    distinction: ["Two people taking the same means", "Relying on the Creator", "The hand moves, and the heart rests on the One who made both the hand and what it achieves.", "Relying on the means", "The heart rests on the arrangement itself, which is what removes trust."],
    misreading: "Do not conclude that any use of means is permitted regardless. The later sections apply the principle case by case and reach different answers in different cases.",
    reflection: "Take something you arranged this week and ask where your heart was resting while you arranged it.",
    audit: ["Where does my heart rest while I work?", "Which means do I treat as decisive?", "Would I be shaken if this arrangement failed?", "Have I called abandoning means trust?"],
    nodes: ["tawakkul", "means", "earning"],
    model: pair("The same act, two states", "The outward act settles nothing either way.", [["Trust intact", "The means is taken and the heart rests on the Creator of the means.", "support"], ["Trust displaced", "The heart rests on the arrangement, which is what removes the state.", "warning"]]),
  }),
  makeChapter({
    id: 9, shortTitle: "With dependents", formalTitle: "The trust of one who has others to provide for",
    overview: "Ghazali takes the case that most sharply tests any doctrine of reliance, since the risk of abandoning means falls on people who did not choose it.",
    thesis: "Somebody with dependants is the case that most tests the doctrine, and Ghazali takes it directly.",
    moves: [
      { title: "Separate the case", body: "Somebody with people depending on him is not in the position of somebody risking only himself, and the rules differ accordingly." },
      { title: "Give the reason", body: "What may be a permissible risk for a person alone becomes an imposition on others when others depend on him, and their claim is not dissolved by his station." },
      { title: "Draw the practical rule", body: "The one with dependents is held to means that the solitary might set aside, and Ghazali treats this as a requirement rather than a concession." },
      { title: "Keep the state available", body: "The requirement concerns the outward act, and the inward reliance remains fully available while it is met, which is the point the previous section established." },
      { title: "Note why dependents change the ruling", body: "The case is separated on a principle that has nothing to do with trust: a risk a man may take with himself becomes an imposition when other people depend on him, and their claim is not dissolved by his spiritual station. Which means the ruling here is about somebody else's rights, and it is stated as a requirement rather than as advice." },
      { title: "Take what remains available", body: "And the requirement concerns the outward act only. A man held to means that a solitary person might set aside can still rest his heart exactly where the first station rests it — which is the whole point the previous section established. He is not being denied trust; he is being denied one particular expression of it, on grounds that were never about trust at all." },
    ],
    closer: [
      { title: "Why this section matters beyond its topic", body: "It shows that the rules of trust are sensitive to whom the consequences fall on, which prevents the whole doctrine from being read as a purely private matter between a person and God." },
      { title: "The consistency with the quarter", body: "It is the same principle as Book 31's insistence that repentance does not discharge what is owed to people. A state between a servant and God does not cancel a claim that someone else holds." },
    ],
    distinction: ["Two people setting aside a means", "Alone", "The risk falls on the one who chose it, and the station may permit it.", "With dependents", "The risk falls on people who did not choose it, and their claim is not dissolved."],
    misreading: "Do not read this as saying that those with dependents cannot trust. What is restricted is the outward abandonment of means, not the state itself.",
    reflection: "Ask whose life your arrangements are holding up, and whether any risk you are considering is actually yours to take.",
    audit: ["Who depends on what I arrange?", "Whose risk am I actually taking?", "Have I called imposition on others a station?", "What means am I required to keep?"],
    nodes: ["tawakkul", "dependents", "means"],
    model: chain("Whose risk", "The question governs what may be set aside.", [["Identify the dependent", "Who is actually held up by this arrangement.", "support"], ["Locate the risk", "Whether abandoning the means transfers it to them.", "balance"], ["Keep the means", "Where it does, the means is required rather than optional.", "support"], ["Keep the state", "The inward reliance remains fully available throughout.", "support"]]),
  }),
  makeChapter({
    id: 10, shortTitle: "Holding causes", formalTitle: "The states of those who trust in their attachment to causes",
    overview: "Ghazali illustrates the three stations by how each relates to the chain of causes, using a worked example rather than a definition.",
    thesis: "The three stations are illustrated by how each relates to what a person is attached to.",
    moves: [
      { title: "Use an example", body: "The stations are shown by how a person at each relates to a cause and to the cause behind it, which makes the abstract degrees concrete." },
      { title: "Show the first station", body: "The one at the first station takes the cause and rests his heart elsewhere, which is the condition already established as fully compatible with work." },
      { title: "Show the further stations", body: "At the further degrees the attachment to intermediate causes loosens, which is what Abraham's answer to Gabriel illustrated: leaving a cause that would have produced a cause." },
      { title: "Keep the ranking honest", body: "Ghazali does not require the further stations of anyone, and the sections that follow apply the first station's rules to ordinary matters." },
      { title: "Note what the example makes visible", body: "Showing the stations through how a person relates to a cause, and to the cause behind it, is what turns three abstract degrees into something checkable. At the first, a man takes the cause and rests his heart elsewhere. At the further ones the attachment to intermediate causes loosens — which is exactly what Abraham's answer illustrated, and it gives the higher stations a concrete shape rather than leaving them as intensities of feeling." },
      { title: "Take the honesty about the ranking", body: "And Ghazali requires the further stations of nobody, which is worth registering in a book that has just described a corpse in a washer's hands as the highest degree. The sections that follow apply the first station's rules to ordinary matters — storing food, seeking treatment, reporting an illness. The high stations are described and the practical guidance is written for the low one." },
    ],
    closer: [
      { title: "Why an example rather than a rule", body: "Because the difference between the stations is not in what is done but in where the heart rests, and that difference is easier to show in a case than to state." },
      { title: "What the reader takes from it", body: "A way to locate himself without either claiming a station he is not in or concluding that the first station is not trust." },
    ],
    distinction: ["Two relations to a cause", "Held and released", "The cause is used and the heart does not rest on it, which is the first station.", "Not reached for", "The cause itself is left, which belongs to the further degrees and is required of no one."],
    misreading: "Do not imitate the further stations by dropping means you actually depend on. The book treats that as a claim rather than a state.",
    reflection: "Notice which causes you reach for first, and whether your composure would survive their failure.",
    audit: ["Which cause do I reach for first?", "Would its failure shake me?", "Am I imitating a station or occupying one?", "What am I resting on while I work?"],
    nodes: ["tawakkul", "means", "three-stations"],
    model: pair("Where the difference lies", "Not in the act but in the resting place.", [["The act", "Identical across stations, which is why it proves nothing.", "balance"], ["The resting place", "Where the heart actually sits, which is what the stations grade.", "support"]]),
  }),
  makeChapter({
    id: 11, shortTitle: "Storing", formalTitle: "That storing with a heart free of what is stored does not annul trust",
    overview: "A specific case treated at length, because setting something aside looks like the clearest possible contradiction of reliance, and Ghazali argues that it need not be.",
    thesis: "Storing something up is treated at length, because it is where trust looks most obviously contradicted.",
    moves: [
      { title: "State the position", body: "Storing something up, with a heart empty of what is stored, does not necessarily annul trust." },
      { title: "Give the reason", body: "Since the state is located in where the heart rests, and not in whether a cupboard is full, the same act is compatible with reliance and with its absence." },
      { title: "Add the qualification", body: "The freedom of the heart is a real condition and not a formula. Where what is stored occupies the person, the act and the state are no longer compatible." },
      { title: "Cite the precedent", body: "Ghazali brings evidence that the practice occurred among those whose trust is not in question, which is what makes the position more than an argument." },
      { title: "Follow the position and its condition", body: "The position is that storing something up, with a heart empty of what is stored, does not annul trust — and the condition carries all the weight. The state lives in where the heart rests, not in whether a cupboard is full, so the same act is compatible with reliance and with its absence. Which is the eighth section's principle applied to the case where it is most likely to be doubted." },
      { title: "Take the qualification seriously", body: "And the qualification is not a formality: where what is stored occupies the person, the act and the state stop being compatible. So the permission is real and it is conditional on something the man can check — whether the store is on his mind. And the precedent is cited rather than argued, because a position of this kind is more securely established by showing that people whose trust nobody questions did it." },
    ],
    closer: [
      { title: "Why this case is chosen", body: "Storing is the sharpest test because it is deliberate, visible, and about the future, which is exactly where reliance is supposed to operate." },
      { title: "The test that decides it", body: "Not the quantity stored but what its loss would do. A store whose disappearance would shake the person was doing something other than sitting in a cupboard." },
    ],
    distinction: ["Two stores", "Held loosely", "The heart is empty of it, and its loss would not displace the reliance.", "Held onto", "The store occupies the person, and reliance has moved into it."],
    misreading: "Do not read the permission as covering accumulation without limit. The condition on the heart is doing real work, and Book 34's measures apply to the quantity.",
    reflection: "Ask what the loss of your reserves would actually do to you. That answer is the section's test.",
    audit: ["What would losing this do to me?", "Does it occupy my thinking?", "Am I storing against a need or against fear?", "Would I describe my heart as empty of it?"],
    nodes: ["tawakkul", "storing", "means"],
    model: pair("The test for a store", "Quantity is not what decides it.", [["Empty of it", "The store exists and its loss would not displace the reliance.", "support"], ["Occupied by it", "The store has become where the heart rests, which is the failure.", "warning"]]),
  }),
  makeChapter({
    id: 12, shortTitle: "When it is taken", formalTitle: "The manners of those who trust when their goods are stolen",
    overview: "A short and revealing section. Having permitted storing, Ghazali treats what happens when the store is lost, since that is where the claim to a free heart is tested.",
    thesis: "Having permitted storing, Ghazali immediately says how somebody who stores should behave when it is lost.",
    moves: [
      { title: "Take the moment as the test", body: "The loss of what was stored is where the previous section's condition is either confirmed or exposed, since the person's response is not chosen in advance." },
      { title: "Give the manners", body: "The conduct prescribed concerns what the person does with the loss inwardly as much as what he does about recovering it." },
      { title: "Permit ordinary recovery", body: "Reasonable steps to recover what was taken are not excluded, on the same principle that permitted taking means in the first place." },
      { title: "Watch the disturbance", body: "What is examined is the stirring of the innermost self, which is the criterion the whole second half has been using." },
      { title: "Note why theft is the test", body: "Theft is the right test for the previous section because the response is not chosen in advance. A man can hold, sincerely, that his heart is empty of what he has stored — and the claim is unfalsifiable while the store is safe. The moment it is taken, the answer arrives before he can compose it, which is what makes this section the confirmation of the last one." },
      { title: "Take the permission to recover", body: "And reasonable steps to get the goods back are not excluded, on exactly the principle that permitted the storing. Which keeps the section from collapsing into a test of passivity: what is being examined is the stirring of the innermost self, not whether the man goes to the authorities. The two are independent, and only the first is being assessed." },
    ],
    closer: [
      { title: "Why the section is short", body: "The principle has been established and this is its application. Ghazali's treatments become brief where the argument is already made, which is a reliable signal of where the weight sits." },
      { title: "The consistency with Book 32", body: "A loss within one's power to repair is repaired; what is not is borne. The duty finder of that book applies here without modification." },
    ],
    distinction: ["Two responses to a theft", "Recovery without displacement", "Steps are taken and the heart is not moved off its resting place.", "Displacement", "The loss reveals that the reliance had moved into what was lost."],
    misreading: "Do not read this as requiring indifference to loss. Ghazali permits recovery and examines only where the heart was resting.",
    reflection: "Recall your last real loss and ask what it revealed about where your reliance had settled.",
    audit: ["What did my last loss reveal?", "Did I take reasonable steps, or was I consumed?", "How long did the disturbance last?", "Was I mourning a thing or a security?"],
    nodes: ["tawakkul", "storing"],
    model: chain("What a loss reveals", "The response is not chosen in advance, which is what makes it evidence.", [["The loss occurs", "What was stored is taken.", "balance"], ["Steps are taken", "Recovery is permitted on the same principle as taking means.", "support"], ["The inmost self", "Whether it stirred is the criterion, and it is not decided by the steps.", "balance"]]),
  }),
  makeChapter({
    id: 13, shortTitle: "Leaving treatment", formalTitle: "That leaving medical treatment is praised in some conditions",
    overview: "Ghazali grants a limited case for leaving treatment, and the care with which he bounds it is as important as the grant itself.",
    thesis: "Leaving off medical treatment is granted a limited case, carefully bounded.",
    moves: [
      { title: "State the grant", body: "In some conditions, leaving treatment is praiseworthy and indicates strength of trust." },
      { title: "Bound it by certainty", body: "The grant applies where the remedy is speculative rather than where its effect is established, which is the distinction between kinds of causes he drew earlier." },
      { title: "Bound it by the person", body: "It concerns particular conditions and particular people rather than a general rule, which is why the section is framed as some conditions rather than as a principle." },
      { title: "Refuse the generalisation", body: "The next section is given entirely to answering those who extend it into a general claim, which shows how narrow the grant is meant to be." },
      { title: "Note how narrowly the grant is drawn", body: "The grant is real and it is fenced twice. It applies where the remedy is speculative rather than where its effect is established — the distinction between kinds of causes drawn earlier. And it concerns particular conditions and particular people, which is why the section is titled for some conditions rather than stated as a principle. Both fences are load-bearing, and the next section exists because people removed them." },
      { title: "Take the pattern being followed", body: "And the shape is familiar from elsewhere in the quarter: a genuine concession is granted, its conditions are named, and then a full section is spent refusing the generalisation of it. Which is the standard treatment for any permission that a reader would prefer to hold as a rule." },
    ],
    closer: [
      { title: "Why the grant is made at all", body: "Because a doctrine that made every means obligatory would have no room for the further stations the book has described, and Ghazali does not eliminate them to make the rules simpler." },
      { title: "The kinds of causes again", body: "The whole grant rests on the earlier distinction between causes that are certain, probable, and speculative. Where a remedy's effect is established, it is not in the category this section addresses." },
    ],
    distinction: ["Two kinds of remedy", "Speculative", "The effect is not established, and leaving it can indicate trust rather than negligence.", "Established", "The effect is known, and this section does not cover it."],
    misreading: "Do not extend this to established treatment, and do not extend it to anyone other than yourself. The next section is written specifically against the first extension, and the section on dependents against the second.",
    reflection: "Ask which category any treatment you are considering falls into before applying anything in this section.",
    audit: ["Is this remedy's effect established or speculative?", "Whose body is at risk?", "Am I generalising a narrow permission?", "Would I counsel this to someone I love?"],
    nodes: ["tawakkul", "treatment", "causes"],
    model: pair("Where the grant applies", "The distinction does all the work.", [["Speculative remedies", "Leaving them can indicate strength of trust.", "balance"], ["Established remedies", "Outside the grant, and the following section refuses the extension.", "warning"]]),
  }),
  makeChapter({
    id: 14, shortTitle: "Against the general claim", formalTitle: "A refutation of those who say leaving treatment is better in every case",
    overview: "Ghazali gives a whole section to refusing the generalisation of what he has just permitted, which is one of the clearest examples in the work of a limit being defended.",
    thesis: "A whole section is spent refusing to generalise that case, which tells you how often it was generalised.",
    moves: [
      { title: "State the position refused", body: "That leaving treatment is better in every condition, which some had held on the strength of the reports about trust." },
      { title: "Give the argument against", body: "Since means are not what removes reliance, and since the effect of some remedies is established, refusing them is not a higher state but a misplacement of where trust operates." },
      { title: "Use the precedents", body: "The practice of those whose trust is beyond question includes the use of treatment, which the general claim cannot accommodate." },
      { title: "Restore the criterion", body: "The test returns to where the heart rests, which the general claim had replaced with an outward rule, and outward rules were exactly what the second half of the book was written to displace." },
      { title: "Follow the argument against the general claim", body: "The refutation is short and it uses the book's own machinery. Means do not remove reliance, and the effect of some remedies is established — so refusing them is not a higher station but a misplacement of where trust operates. The person has located his reliance in an outward act, which is precisely what the eighth section showed cannot carry it." },
      { title: "Note what the general claim replaced", body: "And the deeper objection is that the general rule replaced a criterion with a procedure. The test was always where the heart rests; the claim substitutes a rule about what to do with medicine. Which is easier to apply and settles nothing — and displacing exactly that kind of outward rule is what the whole second half of the book was written to do." },
    ],
    closer: [
      { title: "Why this is placed immediately after the grant", body: "The adjacency is deliberate. A permission and its limit in consecutive sections make it very hard to carry the permission away without the limit." },
      { title: "What it shows about the book", body: "The strongest material on trust is also the material most easily turned into a claim about outward conduct. Ghazali spends this section pulling it back to the state, which is where he located it from the start." },
    ],
    distinction: ["Two ways of holding the permission", "With its limit", "Speculative remedies may be left; established ones are not what the grant covers.", "Generalised", "All treatment is refused as a higher state, which this section is written to answer."],
    misreading: "Do not read the earlier grant without this section. Ghazali placed them together, and separating them produces exactly the position he refutes here.",
    reflection: "Notice how much more attractive the general claim is than the bounded one, and what that attraction is made of.",
    audit: ["Have I carried a permission past its limit?", "Do I prefer the simpler rule?", "Where am I using an outward act as evidence of a state?", "What would the criterion say instead?"],
    nodes: ["tawakkul", "treatment", "means"],
    model: chain("How a permission becomes an error", "The steps are easy to take and hard to notice.", [["A bounded grant", "Speculative remedies may be left in some conditions.", "balance"], ["The bound is dropped", "The condition is forgotten and the grant is remembered.", "warning"], ["An outward rule", "The state is replaced by a visible act as its evidence.", "warning"], ["The criterion restored", "Where the heart rests, which the act never settled.", "support"]]),
  }),
  makeChapter({
    id: 15, shortTitle: "Saying you are ill", formalTitle: "The states of those who trust in disclosing or concealing illness",
    overview: "The book closes on a small and precise question that gathers its whole method: whether to mention that you are unwell.",
    thesis: "The book ends on a small precise question that gathers the whole doctrine: what you say about your own state.",
    moves: [
      { title: "Pose the question", body: "Whether one who trusts should disclose an illness or conceal it, since disclosure can look like complaint and concealment can look like display." },
      { title: "Refuse a single answer", body: "The answer depends on the purpose and the effect rather than on the act, exactly as with every other case in the second half." },
      { title: "Permit disclosure", body: "Reporting an illness for a purpose, to someone who can act, is not complaint, which is the same distinction Book 24 drew about speaking of an absent person." },
      { title: "Locate the fault", body: "The fault, where there is one, is in what the disclosure is being made to do, which returns the criterion to the heart for the last time." },
      { title: "Note why neither answer works", body: "The question is genuinely two-sided, which is why no rule settles it: disclosing an illness can look like complaint, and concealing it can look like display. Both are faults the earlier books named, and a person choosing by appearance will be caught by one of them whichever way he goes. So the answer has to come from purpose and effect rather than from the act." },
      { title: "Take the permission and where it lands", body: "And reporting an illness to somebody who can act on it, for a purpose, is not complaint — which is the same distinction the book on the tongue drew about speaking of an absent person, where the exception was tied to a good that could not be reached without naming him. The fault, where there is one, lies in what the disclosure is being made to do. Which returns the criterion to the heart, in the last section of the book, exactly where it has been all along." },
    ],
    closer: [
      { title: "Why the book ends here", body: "Because the smallest possible case shows the method working. If the criterion holds for whether to mention a fever, it holds for the large cases that opened the book." },
      { title: "What the reader carries away", body: "Not a rule about means but a place to look. Every question in the second half was answered by asking where the heart was resting, and none by asking what the hand had done." },
    ],
    distinction: ["Two disclosures of the same illness", "Reporting", "Said for a purpose to someone who can act, which is not complaint.", "Complaining", "Said to be received in a particular way, which is what the fault consists of."],
    misreading: "Do not read the caution about complaint as requiring silence about genuine illness. Ghazali permits the purposeful disclosure explicitly.",
    reflection: "Before mentioning a difficulty, ask what you want the hearer to do with it. The answer usually settles the question.",
    audit: ["What do I want from telling this?", "Can the hearer act?", "Am I reporting or arranging a response?", "Would I say it to someone who could do nothing?"],
    nodes: ["tawakkul", "disclosure"],
    model: pair("The last application of one criterion", "The method that answered every case in Part Two.", [["A purpose", "Told to someone who can act, which makes it a report.", "support"], ["A response", "Told to be received in a particular way, which is where the fault is.", "warning"]]),
  }),
];

const book35Deepening: Partial<Record<number, { title: string; body: string }>> = {
  9: {
    title: "Responsibility changes what reliance requires",
    body: "A person may choose to bear uncertainty for himself, but dependents possess claims that his private spiritual exercise cannot cancel. Food, shelter, treatment, and protection must therefore be pursued through the available lawful means. This does not place those means outside reliance. It locates reliance in the heart while the hand fulfills responsibility. The stricter test is whether provision is sought without treating income, storage, or personal control as the independent source of safety.",
  },
  10: {
    title: "The same outward means can belong to different stations",
    body: "Two people may take the same precaution while relying differently. One rests on the cause as though it guarantees the result; another uses it while recognizing its limits and dependence; a third may be inwardly free enough to use or leave a less certain cause without disturbance. The example prevents station from being inferred from appearance. What matters is where confidence settles, how loss is received, and whether the means remains a servant rather than becoming the object trusted.",
  },
  11: {
    title: "Storage reveals what the future means to the heart",
    body: "Setting provision aside can serve a real future duty, especially where dependents, predictable need, or interruption of income are involved. The inward question is whether the store supports responsible action or becomes a private guarantee against dependence on God. Ghazali's test through possible loss makes that difference visible. Violent disturbance, despair, or collapse when the store disappears may reveal that the object was carrying a promise no created cause could actually make.",
  },
  12: {
    title: "Loss distinguishes use from reliance",
    body: "Before a store is lost, responsible planning and inward dependence can look identical to anxious hoarding. Loss separates them. The person may seek recovery, protect rights, and prevent further harm; ordinary action is not forbidden. The test is whether the heart treats the missing provision as though its true support has vanished with it. Recovery belongs to the use of causes, while inward collapse exposes the larger claim that had been placed upon the cause.",
  },
  13: {
    title: "Why a personal permission cannot become public advice",
    body: "Leaving a treatment can only be considered within the strength of the evidence for that treatment, the person's actual state, and the rights affected by the decision. A less certain remedy and an established effective treatment are not one category. Nor is a choice borne privately the same as exposing dependents or others to preventable harm. The limited permission preserves an exceptional station; its boundaries prevent that exception from being mistaken for the ordinary meaning of trust.",
  },
  14: {
    title: "The general claim confuses reliance with a visible posture",
    body: "If taking medicine were itself a failure of trust, the inward state could be diagnosed from one outward act. Ghazali has denied that method throughout the book. Prophetic precedent, differences among causes, and the duties of preservation all show why the criterion must remain inward while conduct remains governed by law and responsibility. Refusing a means can arise from trust, but it can also arise from ignorance, display, fear, or an unsupported claim to spiritual rank.",
  },
  15: {
    title: "Disclosure is judged by what the words are doing",
    body: "Saying that one is ill may seek treatment, explain an absence, protect another person, or ask for necessary help. The same words may also invite pity, display endurance, or turn complaint into a habit. A rule based only on speaking or remaining silent cannot separate those functions. The closing question therefore gathers the book's method in miniature: preserve truthful and useful means, then examine where the heart seeks relief, recognition, and support while using them.",
  },
};

export const book35Chapters: Chapter[] = book35Base.map((chapter) => {
  const extra = book35Deepening[chapter.id];
  if (!extra || !chapter.deep) return chapter;
  return { ...chapter, deep: { ...chapter.deep, closeReading: [...(chapter.deep.closeReading ?? []), extra] } };
});

export const book35ConceptNodes: ConceptNode[] = [
  ["tawakkul", "Trust", "Reliance on an agent", "The heart's rest upon the one entrusted, which follows from what is believed about him."],
  ["tawhid", "Unity", "The root of trust", "There is one, He is able, and the ability is exercised with wisdom and generosity."],
  ["four-degrees", "Four degrees", "The walnut", "Tongue, heart's assent, witnessing one agent, and seeing only one."],
  ["power", "Power", "His is the dominion", "Nothing relied upon exceeds what can be done, including by causes not in view."],
  ["wisdom", "Wisdom", "His is the praise", "Ability alone produces fear; ability exercised with care produces reliance."],
  ["decree", "The decree", "Where the account stops", "Ghazali marks the point at which disclosure was withheld and does not go past it."],
  ["four-conditions", "Four conditions", "The advocate", "Guidance, power, expression, and compassion; doubting one keeps the heart busy trying to compensate."],
  ["three-stations", "Three stations", "Client, child, washed", "Each is real, the first is where most readers are, and the third is rare."],
  ["means", "Means", "Not what removes trust", "The stirring of a hand is not the stirring of the inmost self."],
  ["causes", "Kinds of cause", "Certain, probable, speculative", "The treatment differs by kind, which is what makes the subject practical."],
  ["earning", "Working", "Compatible with reliance", "The same act is available to both states, so it settles nothing by itself."],
  ["dependents", "Dependents", "Whose risk it is", "A state between a servant and God does not cancel a claim someone else holds."],
  ["storing", "Storing", "Tested by loss", "Not the quantity but what its disappearance would do to the person."],
  ["treatment", "Treatment", "A bounded grant", "Speculative remedies may be left; established ones are outside the permission."],
  ["disclosure", "Disclosure", "Report or complaint", "Told for a purpose to someone who can act, or told to be received a certain way."],
].map(([id, label, kicker, description], index) => ({ id, label, kicker, description, position: ["left", "right", "top", "bottom"][index % 4] }));

const node = (id: string, label: string, micro: string, summary: string, guardrail: string, chapterId: number, glyph: Journey["nodes"][number]["glyph"]): Journey["nodes"][number] => ({ id, label, micro, summary, guardrail, chapterId, glyph });

export const book35Journeys: Journey[] = [
  {
    id: "what-do-i-believe", number: "01", question: "What do I actually believe?", title: "Open the walnut",
    description: "Find why trust rests on a knowledge, sort unity into four degrees with Ghazali's own image, and add the two beliefs without which reliance has no object.",
    payoff: "You locate your own degree honestly, including the one Ghazali says most people occupy.",
    image: assetUrl("assets/system/book35-the-walnut.jpg"), imageAlt: "A sunlit ivory sill holding one walnut opened in four stages, from whole husk to a single drop of oil.", minutes: 13, color: "#278d91",
    nodes: [
      node("why-knowledge", "See why knowledge first", "States are not summoned", "Reliance follows what a person believes about the one relied upon.", "The book's structure declines to exhort the state directly.", 1, "order"),
      node("four-degrees", "Open the four degrees", "Two shells, kernel, oil", "Tongue, heart's assent, witnessing one agent, and seeing only one.", "Each secures something different and Ghazali says what.", 2, "pattern"),
      node("place-theology", "Place the theologians", "Guarding a knot", "Theology defends the second degree rather than constituting a higher one.", "Ghazali says the theologian does not differ from the common man in the belief itself.", 2, "know"),
      node("add-power", "Add the power", "His is the dominion", "Nothing relied on exceeds what can be done, including by causes not in view.", "This is not a prediction that things will go well.", 3, "forces"),
      node("add-wisdom", "Add the wisdom", "His is the praise", "Ability alone produces fear; ability with care produces reliance.", "Ghazali marks where his account of the decree stops.", 4, "receive"),
    ],
  },
  {
    id: "why-am-i-anxious", number: "02", question: "Why am I still anxious?", title: "Check the advocate's four conditions",
    description: "Take the definition that converts an inward state into checkable beliefs, find which of the four you actually doubt, and see what it means if you doubt none.",
    payoff: "Anxiety stops being a failure of resolve and becomes a locatable belief.",
    image: assetUrl("assets/system/book35-the-advocate.jpg"), imageAlt: "A bright court chamber where a sealed brief lies on an empty advocate's bench, the client's seat drawn back and still.", minutes: 12, color: "#586fa8",
    nodes: [
      node("derive-word", "Derive the word", "From agency", "To entrust is to commit a matter and rest on the one entrusted with it.", "The state is rest, not resolve.", 5, "name"),
      node("four-conditions", "Take the four conditions", "Guidance, power, expression, care", "The client is not truly relying unless he believes all four of his advocate.", "Doubting one appears as compensating plans rather than stated disbelief.", 5, "pattern"),
      node("transfer-them", "Transfer them", "Three that remain", "Applied to the One relied on, expression is not a possible deficiency.", "What can be doubted is knowledge, power, or care.", 5, "clear"),
      node("find-the-doubt", "Find your doubt", "Which one is it", "Where reliance is absent, the analogy names the belief responsible.", "This is what an exhortation to trust more cannot do.", 5, "diagnose"),
      node("if-none", "Ask if none", "Then what is it about", "Anxiety surviving assent to all three is not about the Trustee.", "That result points at the means rather than at the belief.", 8, "mirror"),
    ],
  },
  {
    id: "which-station", number: "03", question: "Whose definition am I failing?", title: "Sort the masters into stations",
    description: "Learn the three stations of trust, watch Ghazali resolve the conflicting definitions by assigning each to a degree, and stop measuring yourself against the furthest one.",
    payoff: "You stop failing a test that was set for someone at another station.",
    image: assetUrl("assets/system/book35-three-stations.jpg"), imageAlt: "Three ivory alcoves in one wall: a writing desk with a brief, a low cradle, and an empty bier-cloth folded flat.", minutes: 13, color: "#bf7a35",
    nodes: [
      node("three-stations", "Learn the three", "Client, child, washed", "At rest while acting; not deliberating at all; moved without motion of one's own.", "Ghazali says the third is rare.", 6, "pattern"),
      node("child-and-mother", "Read the middle", "The child still cries", "The child is not passive; what it does not do is deliberate about whether she will come.", "The image is chosen carefully.", 6, "know"),
      node("resolve-sayings", "Resolve the sayings", "Each reports a station", "The masters described their own degree, which is why the accounts appear to conflict.", "Read as rival definitions they force a false choice.", 7, "clear"),
      node("abraham", "Read Abraham's answer", "A cause behind a cause", "Declining to ask was leaving a cause that would have produced a cause.", "This illustrates the third station, not a rule for all.", 7, "witness"),
      node("the-cave", "Take the cave", "Blocking the snake holes", "Guarding is not a condition of losing trust; the inmost self is what stirs or does not.", "Trust is lost by the heart moving, not the hand.", 7, "guard"),
    ],
  },
  {
    id: "so-do-i-work", number: "04", question: "So do I work, or not?", title: "Move the criterion off the hand",
    description: "Settle the question the whole second half exists for, sort the kinds of cause, and follow the rule through earning, dependents, and what is stored.",
    payoff: "You get a criterion that survives contact with an ordinary life.",
    image: assetUrl("assets/system/book35-hand-and-heart.jpg"), imageAlt: "A luminous workshop sill where a tool lies mid-use beside a small brass weight resting perfectly level.", minutes: 15, color: "#c25f50",
    nodes: [
      node("reject-inference", "Reject the inference", "Means are not the enemy", "The stirring of a hand is not what removes reliance.", "The reports are strong enough to invite the opposite reading.", 8, "clear"),
      node("sort-causes", "Sort the causes", "Certain, probable, speculative", "The treatment differs by kind, which is what makes this practical.", "The same distinction governs the sections on treatment.", 8, "pattern"),
      node("dependents", "Weigh the dependents", "Whose risk is it", "What may be a permissible risk alone becomes an imposition when others depend on you.", "A state with God does not cancel someone else's claim.", 9, "balance"),
      node("storing", "Test the store", "By its loss", "Not the quantity but what its disappearance would do to you.", "The condition on the heart is doing real work.", 11, "diagnose"),
      node("after-loss", "Watch after a loss", "What it reveals", "The response is not chosen in advance, which is what makes it evidence.", "Recovery is permitted on the same principle as means.", 12, "witness"),
    ],
  },
  {
    id: "how-far-does-it-go", number: "05", question: "How far does this go?", title: "Watch a permission and its limit",
    description: "Follow the hardest application: a bounded grant about leaving treatment, an entire section refusing its generalisation, and a closing question small enough to test the whole method.",
    payoff: "You learn how a true permission becomes a false rule, and where the criterion actually lives.",
    image: assetUrl("assets/system/book35-bounded-grant.jpg"), imageAlt: "An apothecary shelf where two sealed jars stand apart, one marked with a clear band and one with none, under even light.", minutes: 13, color: "#a97837",
    nodes: [
      node("the-grant", "Take the grant", "In some conditions", "Leaving a speculative remedy can indicate strength of trust.", "The framing is some conditions, not a principle.", 13, "receive"),
      node("the-bound", "Hold the bound", "Speculative, not established", "Where a remedy's effect is known, the grant does not reach.", "The distinction does all the work.", 13, "guard"),
      node("the-refusal", "Read the refusal", "A whole section against it", "Ghazali answers those who extend it into a general claim.", "The adjacency of grant and limit is deliberate.", 14, "clear"),
      node("outward-rules", "See the failure mode", "An act as evidence", "The general claim replaces the state with a visible act, which the book displaced from the start.", "Simpler rules are more attractive and are the error.", 14, "diagnose"),
      node("smallest-case", "End on the smallest case", "Whether to mention a fever", "Report to someone who can act, or arrange a response; the criterion is the same.", "If it holds here it holds for the large cases.", 15, "steady"),
    ],
  },
];

export const book35Movements: TaxonomyGroup[] = [
  ["fadl", "1. The excellence of trust", "The testimony, and the announcement of the structure.", [1]],
  ["four-degrees", "2. The four degrees of unity", "The walnut, and where theology sits.", [2]],
  ["power", "3. His is the dominion", "The breadth of power, and hidden causes.", [3]],
  ["wisdom", "4. His is the praise", "Wisdom and generosity, and the limit Ghazali marks.", [4]],
  ["definition", "5. The definition of trust", "The advocate and his four conditions.", [5]],
  ["stations", "6. Three stations", "Client, child, and the washed.", [6]],
  ["masters", "7. What the masters said", "Each definition assigned to the station it reports.", [7]],
  ["acts", "8. Trust and working", "Means are not what removes reliance.", [8]],
  ["dependents", "9. With dependents", "Whose risk is being taken.", [9]],
  ["causes", "10. Holding causes", "The stations shown by a worked example.", [10]],
  ["storing", "11. Storing", "A heart empty of what is stored.", [11]],
  ["theft", "12. When it is taken", "What a loss reveals about where reliance sat.", [12]],
  ["treatment", "13. Leaving treatment", "A grant bounded by the kind of remedy.", [13]],
  ["refutation", "14. Against the general claim", "A whole section defending the limit.", [14]],
  ["disclosure", "15. Saying you are ill", "The smallest case, and the same criterion.", [15]],
].map(([id, label, description, chapterIds], index) => ({ id, label, description, chapterIds, color: ["#bf7a35", "#278d91", "#c25f50", "#586fa8", "#a97837"][index % 5] })) as TaxonomyGroup[];

export const book35Instrument: Instrument = {
  title: "Where the reliance actually sits",
  note: "Ghazali turns an inward state into checkable beliefs. The advocate is not truly relied on unless four things are believed of him, and applied to the One relied upon, three of the four remain open to doubt. Take a matter you are anxious about and find which belief is missing, or discover that none is.",
  items: [
    {
      id: "matter", label: "A matter you are anxious about", lede: "Something specific, currently unresolved",
      note: "The four conditions are Ghazali's own, from the definition of trust. The second axis is the criterion he uses through the whole of Part Two: whether the hand moved, or the inmost self did.",
      axes: [
        {
          id: "doubt", kicker: "The advocate's conditions", question: "About this matter, which do you actually doubt?",
          options: [
            { id: "knows", label: "That my case is fully known", note: "The first condition. Nothing of the matter's subtlety escapes the one relied upon." },
            { id: "able", label: "That anything can be done", note: "The second. Nothing relied upon exceeds what can be done, including by causes not in view." },
            { id: "cares", label: "That it is cared about", note: "The fourth. Ability without care produces fear rather than reliance, which is why this component is separate." },
            { id: "none", label: "None of these, and I am still anxious", note: "The interesting result. Anxiety surviving assent to all three is not about the Trustee." },
          ],
        },
        {
          id: "means", kicker: "The criterion", question: "About the arrangements you have made, what is true?",
          options: [
            { id: "abandoned", label: "I have set aside means I could take", note: "Ghazali's book argues at length that this is not what trust consists of." },
            { id: "resting", label: "My composure depends on them holding", note: "The heart has moved into the arrangement, which is what removes the state." },
            { id: "working", label: "I act, and my composure does not depend on it", note: "The hand moves and the heart rests elsewhere, which is the first station." },
            { id: "none-taken", label: "There are no means available to me", note: "There is no practical means to take, so this is a case for patience rather than further planning." },
          ],
        },
      ],
      verdicts: [
        { key: "none|resting", name: "The reliance has moved", role: "warning", chapterId: 11, body: "You doubt none of the three and your composure still depends on the arrangement holding. On Ghazali's account that is where the reliance has actually settled, whatever is believed in the abstract.", action: "The test he gives for a store applies directly: not its size but what its loss would do to you. Work at the belief rather than at the arrangement, since the arrangement is not what is failing." },
        { key: "none|abandoned", name: "This is not what trust is", role: "warning", chapterId: 8, body: "You doubt none of the three and have set aside means available to you. Ghazali spends most of Part Two arguing that moving the hand does not remove reliance and that abandoning means is not the spiritual state.", action: "Take the means back. Abu Bakr blocked the snake holes in the cave, and Ghazali reasons that taking precautions is reliance on the Creator who made those precautions effective, not on one's planning alone." },
        { key: "none|working", name: "The first station", role: "support", chapterId: 6, body: "You doubt none of the three, you act, and your composure does not rest on the outcome of your acting. That is the first station of trust as Ghazali describes it, and it is a real station rather than a lesser substitute.", action: "Hold it without reaching for the further degrees. He says the third is rare and that the sayings describing it come from people speaking of the furthest stations, so measuring yourself against them is failing a test set for someone else." },
        { key: "none|none-taken", name: "Nothing left to arrange", role: "balance", chapterId: 6, body: "There are no means and no doubt about the Trustee, which is the condition in which reliance has nothing standing in front of it.", action: "This is where Book 32's rule applies: a harm you cannot remove is the case patience was defined for. Reliance and patience are doing the same work here, and neither asks you to arrange anything." },
        { key: "knows|*", name: "The first condition", role: "balance", chapterId: 5, body: "What you doubt is whether the matter is fully known, which is the first of the advocate's conditions. Ghazali's client is not at rest because he suspects that some subtlety has escaped his agent.", action: "This doubt usually rests on the matter feeling too small, too tangled, or too private to be in view. Take it to the first part of the book: unity is what settles whether anything at all falls outside." },
        { key: "able|*", name: "The second condition", role: "balance", chapterId: 3, body: "What you doubt is whether anything can be done, which Ghazali treats as a separate belief from unity itself. A person may hold that there is one and still act as though a particular matter lies outside reach.", action: "The belief required concerns what is possible rather than what is likely. Hamdun's answer is the one to sit with: that among what is possible there are hidden causes besides the apparent ones." },
        { key: "cares|*", name: "The fourth condition", role: "warning", chapterId: 4, body: "What you doubt is whether it is cared about, which is the hardest of the components and the one Ghazali treats under the wisdom and generosity that His is the praise. Ability without care produces fear rather than reliance.", action: "He does not resolve this by argument alone and marks where his account stops. Do not treat the doubt as a failure of resolve; it is the component the book itself calls the finest, and it is worked at rather than decided." },
        { key: "*|*", name: "Read both together", role: "balance", chapterId: 8, body: "A doubt about one condition alongside a particular relation to means. Ghazali's method throughout Part Two is to locate the belief first, since the outward act is compatible with both states and settles nothing by itself.", action: "Take the doubt as the primary reading and the arrangement as evidence about it. What the hand did is never the diagnosis in this book; where the heart rests always is." },
      ],
    },
  ],
};

const book35ConceptLab: ConceptLab = {
  kind: "paired",
  title: "The hand can move while the heart rests",
  note: "Keep the outward arrangement and the inward resting place separate. The same visible act can belong to trust or to dependence on the means, while abandoning the act can still leave the heart anxious.",
  prompt: "Compare what the hand does with where composure actually rests",
  architecture: {
    form: "White-marble Saudi colonnade",
    reference: "The Grand Mosque in Mecca",
    note: "The white-and-gold arcade language comes from the mosque's Saudi colonnades. It gives two levels a shared structure; the comparison itself is editorial.",
    url: "https://saudipedia.com/en/grand-mosque",
  },
  scenes: [
    {
      id: "means-trust", label: "Means used, trust intact", chapterId: 8,
      setup: "A person plans, works, takes an established precaution, or uses a lawful means—and does not treat the arrangement as the source of security.",
      takeaway: "Ghazali moves the criterion away from the hand. Taking a means and relying on it are different acts occurring on different levels.",
      steps: [
        { id: "outward", label: "The hand", micro: "Takes the means", body: "The practical step is taken. Abu Bakr's blocking of the snake holes supplies Ghazali's governing example that precaution and trust can stand together.", role: "support" },
        { id: "inward", label: "The heart", micro: "Rests beyond it", body: "Composure does not depend on the arrangement being independently decisive. The heart rests on the One who made both the capacity to act and the result.", role: "support" },
        { id: "test", label: "The revealing test", micro: "If the plan fails", body: "Failure can disappoint and still reveal that the deepest support was not thought to have disappeared with the arrangement.", role: "balance" },
      ],
    },
    {
      id: "means-guarantee", label: "Means treated as guarantee", chapterId: 11,
      setup: "The outward act can look identical: a store is kept, a plan is made, and work continues. The difference appears in what the person requires from it inwardly.",
      takeaway: "Quantity is not the decisive test. What the loss of the arrangement does to composure reveals where reliance had settled.",
      steps: [
        { id: "outward", label: "The hand", micro: "Makes the same plan", body: "Nothing in the visible arrangement proves the state. The cupboard can be full in either condition, which is why the diagnosis cannot stop at the act.", role: "balance" },
        { id: "inward", label: "The heart", micro: "Requires the plan", body: "The arrangement becomes the resting place. Security is experienced as present when it holds and as gone when it does not.", role: "warning" },
        { id: "test", label: "The revealing test", micro: "Loss discloses it", body: "The store's disappearance exposes the inward attachment more reliably than a claim made while it remains safely in place.", role: "warning" },
      ],
    },
    {
      id: "means-abandoned", label: "Means abandoned, anxiety remains", chapterId: 8,
      setup: "A person stops taking a practical step and calls the stopping trust, while attention remains fixed on what might happen.",
      takeaway: "Abandoning means is not a shortcut to the inward state. The hand can become still while the heart remains more occupied by the cause than before.",
      steps: [
        { id: "outward", label: "The hand", micro: "Stops acting", body: "The visible act has been removed, but Ghazali does not treat this by itself as evidence of trust.", role: "warning" },
        { id: "inward", label: "The heart", micro: "Keeps arranging", body: "Worry, rehearsal, and inward compensation continue. Stillness of the limbs has not produced rest in the heart.", role: "warning" },
        { id: "test", label: "The revealing test", micro: "Occupation increases", body: "If leaving the means makes the cause dominate attention even more, the outward imitation has not established the claimed station.", role: "balance" },
      ],
    },
    {
      id: "dependents", label: "Others depend on it", chapterId: 9,
      setup: "A person has people whose food, safety, or ordinary rights depend on his arrangements. Their risk is not his private spiritual experiment.",
      takeaway: "A right held by another person changes what the hand is required to do without making inward trust unavailable.",
      steps: [
        { id: "outward", label: "The hand", micro: "Keeps required means", body: "The practical means must be kept where abandoning it transfers an unchosen risk to dependents.", role: "support" },
        { id: "inward", label: "The heart", micro: "Keeps the same reliance", body: "Meeting another person's claim does not displace reliance. The inward state remains fully available while the duty is carried out.", role: "support" },
        { id: "test", label: "The revealing test", micro: "Whose risk is this?", body: "Before setting aside a means, ask who bears the consequence. A station between a servant and God does not cancel someone else's right.", role: "warning" },
      ],
    },
  ],
};

export const book35Sources: SourceLink[] = [
  { label: "Primary Arabic text", note: "The complete public Arabic of Book 35 was read in full and used to establish the four degrees of unity, the advocate analogy, the three stations of trust, and the treatment of means, storing, and medicine.", url: "https://shamela.ws/book/9472/1402" },
  { label: "The four degrees of unity", note: "The passage sorting unity into four ranks by the image of the walnut, and stating what each degree secures and where theology sits among them.", url: "https://shamela.ws/book/9472/1404" },
  { label: "The definition of trust", note: "The passage deriving trust from agency and giving the advocate's four conditions, together with the account of what doubting any one of them produces.", url: "https://shamela.ws/book/9472/1418" },
  { label: "Forty-book structure", note: "Ghazali.org's listing places Book 35 as the fifth book of the Quarter of Deliverance and confirms its title.", url: "https://www.ghazali.org/listing-the-forty-books/" },
];

export const book35: SystemBook = {
  id: 35,
  title: "Unity and Trust",
  shortTitle: "Unity and Trust",
  defaultJourneyId: "what-do-i-believe",
  chapters: book35Chapters,
  conceptNodes: book35ConceptNodes,
  journeys: book35Journeys,
  sources: book35Sources,
  taxonomy: {
    title: "Fifteen source movements",
    note: "Four movements on unity, which Ghazali treats as the knowledge underlying trust, and eleven on trust itself. His long exposition of unity is presented as three consecutive readings following the three components he names in the opening.",
    groups: book35Movements,
  },
  conceptLab: book35ConceptLab,
  instrument: book35Instrument,
  editorialNote: "The five journeys, fifteen reading sections, visual models, and diagnostic are editorial learning aids. The sequence preserves Ghazali's two parts, unity first as the knowledge and then trust as the state and its acts. The English is an original synthesis made from a complete reading of the public Arabic text, not a translation and not a substitute for one. Reports and inherited anecdotes are presented as material Ghazali transmitted; this edition does not independently grade every narration. Ghazali marks the point at which the question of the decree touches what he declines to disclose, and where he stops this synthesis stops. His grant regarding the leaving of medical treatment is narrowly bounded to remedies whose effect is not established, and he devotes an entire following section to refuting those who generalise it; both are presented together here because separating them produces the position he refutes. Nothing in this book or this synthesis is medical advice, and the sections on dependents make explicit that a risk falling on others is not a person's to take. The diagnostic locates a belief so that work can begin and cannot pronounce on anyone's state.",
};
