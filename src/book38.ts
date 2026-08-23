import { assetUrl } from "./assetUrl";
import type { Chapter, ConceptNode, VisualModel } from "./data";
import type { Instrument, Journey, SourceLink, SystemBook, TaxonomyGroup } from "./systemTypes";

type Seed = { id: number; shortTitle: string; formalTitle: string; overview: string; thesis?: string; moves: Array<{ title: string; body: string }>; closer: Array<{ title: string; body: string }>; distinction: [string, string, string, string, string]; misreading: string; reflection: string; audit: string[]; nodes: string[]; model: VisualModel };
const station = (id: number) => (id <= 3 ? "the first station, stipulation" : id <= 8 ? "the second station, vigilance" : id <= 10 ? "the third station, reckoning" : id === 11 ? "the fourth station, punishment" : id <= 13 ? "the fifth station, striving" : "the sixth station, reproach");
const makeChapter = (seed: Seed): Chapter => ({
  id: seed.id, shortTitle: seed.shortTitle, formalTitle: seed.formalTitle, overview: seed.overview,
  points: seed.moves.slice(0, 3).map((m) => m.body), reflection: seed.reflection, relatedNodes: seed.nodes, visualModel: seed.model,
  deep: { thesis: seed.thesis ?? seed.moves[0].body, context: seed.overview, moves: seed.moves, closeReading: seed.closer,
    distinction: { title: seed.distinction[0], firstLabel: seed.distinction[1], first: seed.distinction[2], secondLabel: seed.distinction[3], second: seed.distinction[4] },
    misreading: seed.misreading, observation: seed.reflection, selfAudit: seed.audit,
    sourceAnchor: `Book 38, ${station(seed.id)}, ${seed.formalTitle}.` },
});
const chain = (title: string, caption: string, items: Array<[string, string, "support" | "balance" | "warning"]>): VisualModel => ({ kind: "chain", title, caption, items: items.map(([label, body, role]) => ({ label, body, role })) });
const pair = (title: string, caption: string, items: Array<[string, string, "support" | "balance" | "warning"]>): VisualModel => ({ kind: "pair", title, caption, items: items.map(([label, body, role]) => ({ label, body, role })) });
const spectrum = (title: string, caption: string, items: Array<[string, string, "support" | "balance" | "warning"]>): VisualModel => ({ kind: "spectrum", title, caption, items: items.map(([label, body, role]) => ({ label, body, role })) });

export const book38Chapters: Chapter[] = [
  makeChapter({
    id: 1, shortTitle: "The partnership", formalTitle: "The frontier-watch and its six stations",
    overview: "The book opens on a single sustained analogy, and unlike most analogies in the Ihya this one is not an illustration but the actual architecture: the six stations are derived from it one by one.",
    moves: [
      { title: "Set the trade", body: "What business partners want when they settle up is that the profit is safe. The intellect is the merchant on the road to the next life, and what it is after — its whole profit — is getting the self clean, because that is where its success lies." },
      { title: "Name the partner", body: "The intellect takes the self on as a partner in this business, putting it to work at whatever cleans it up — the way a merchant takes on a partner or an employee to trade with his money." },
      { title: "Name the difficulty", body: "As a partner becomes an adversary and a disputant who pulls against him over the profit, so the intellect must stipulate with the soul first, watch it second, reckon with it third, and punish or reproach it fourth." },
      { title: "Give the six", body: "The stations of the watch are therefore six: stipulation, vigilance, reckoning, punishment, striving, and reproach. Ghazali says the account of them is necessary, and the rest of the book is that account in order." },
    ],
    closer: [
      { title: "Why the partner is an adversary", body: "The analogy would have been gentler with a servant alone. Ghazali chooses a partner who disputes over the profit, because the soul is not merely lazy but has interests of its own, and a model in which it merely needs instruction would not generate stations four, five, and six." },
      { title: "The neglect clause", body: "He should not be heedless of watching it for a moment, for if he neglected it he would see nothing from it but treachery and the squandering of the capital, like a treacherous servant when the coast is clear and he is alone with the money. The whole of station two is contained in that sentence." },
    ],
    distinction: ["Two ways to take the merchant", "As the architecture", "Each station is derived from something a merchant actually has to do, which is how the book is built.", "As an illustration", "A figure decorating a spiritual programme, which would leave the six stations unexplained."],
    misreading: "Do not read the trade language as making this a matter of calculation without warmth. The same analogy produces the reproach in station six, which is the least commercial thing in the book.",
    reflection: "Notice that the model puts you on the merchant's side and your soul on the partner's, and ask whether that is how you have been thinking of it.",
    audit: ["Who is the merchant here, and who the partner?", "Where has the capital gone unwatched?", "Which of the six do I skip?", "Do I treat the soul as lazy or as interested?"],
    nodes: ["murabata", "six-stations", "nafs"],
    model: chain("The six stations", "Each one answers something the analogy makes necessary.", [["Stipulate", "Assign the duties and impose the conditions before the day starts.", "support"], ["Watch", "Because a partner left alone with the capital is a partner unwatched.", "support"], ["Reckon", "Look at capital, profit, and loss when the trading is done.", "support"], ["Punish", "Because a loss that is not charged is a loss that repeats.", "warning"], ["Strive", "Make good what was missed rather than only stopping the leak.", "balance"], ["Reproach", "The station the commercial model does not by itself predict.", "support"]]),
  }),
  makeChapter({
    id: 2, shortTitle: "The morning charge", formalTitle: "The first station: stipulating with the soul",
    overview: "The practical opening of the day. Ghazali gives the terms a person sets with his own soul, and the tone of the passage is closer to an address than to a rule.",
    moves: [
      { title: "State what stipulation is", body: "The intellect assigns the soul its duties, imposes on it its conditions, guides it to the road of success, and binds it firmly to travelling those roads. All of it happens before anything has been done." },
      { title: "Give the address", body: "The charge is spoken to the soul directly: that it has died and been returned, and so beware, and beware again, of squandering this day, since every breath of the breaths is a jewel that has no price." },
      { title: "Set the unit", body: "Know, O soul, that the day and the night are twenty-four hours. The unit is deliberately small and countable, which is what makes the following image possible and what makes an evening reckoning feasible at all." },
      { title: "Say why it must be renewed", body: "If the soul obeys in some of it, the need remains to renew the stipulation for what is left, and no day is free of some new matter and some fresh occurrence. Stipulation is a daily act rather than a resolution taken once." },
    ],
    closer: [
      { title: "The relation to Book 37", body: "Book 37 established that an intention cannot be produced by declaring one, and that the only route is arranging its causes. This chapter is one of those arrangements: a stipulation is not an intention manufactured on the spot but a condition set on the day in advance, which is a cause and not a declaration." },
      { title: "Why an address rather than a plan", body: "The soul is a partner with interests of its own, so what is given is terms and not a schedule. Ghazali's language here is the language of one party binding another, and the reader is on both ends of it." },
    ],
    distinction: ["Two things done at the start of a day", "Stipulating", "Terms imposed on a party that will dispute them, renewed daily.", "Resolving", "A declaration made to oneself, which Book 37 said produces nothing by itself."],
    misreading: "Do not read the severity of the address as the point. What is load-bearing is the smallness of the unit and the daily renewal, not the intensity of the language.",
    reflection: "Try the unit rather than the tone. Twenty-four hours, named as twenty-four, is a different object from a day.",
    audit: ["What terms did I set this morning?", "Did I renew them, or set them once long ago?", "Is my unit the day or something vaguer?", "What new matter has arrived that the terms do not cover?"],
    nodes: ["musharata", "murabata", "nafs"],
    model: pair("What the station actually is", "The difference decides whether it can work.", [["Terms on a day", "Conditions set in advance on a party that will dispute them.", "support"], ["A resolution", "A declaration to oneself, which Book 37 already refused.", "warning"]]),
  }),
  makeChapter({
    id: 3, shortTitle: "The empty treasury", formalTitle: "The twenty-four treasuries",
    overview: "The image the stipulation is built on, and its third element is the one that does the work. Two of the three treasuries are the ones everyone expects.",
    moves: [
      { title: "The lit treasury", body: "For every day and night, twenty-four store-rooms are laid out in a row for you. One is opened and you find it full of light from the good you did in that hour — and the joy of seeing it, since it is what you have to show the King, would be enough, if shared among the people of the Fire, to distract them from the pain of it." },
      { title: "The dark treasury", body: "Another is opened, black and dark, its stench rising from it and its darkness covering him, and it is the hour in which he disobeyed. The dread that reaches him from it, if divided among the people of the Garden, would spoil their bliss for them." },
      { title: "The empty treasury", body: "Another is opened empty, holding nothing that gladdens him and nothing that grieves him, and it is the hour in which he slept, or was heedless, or busied himself with something permitted of this world." },
      { title: "Name what it costs", body: "He grieves at its emptiness, and the chagrin that reaches him is that of a man able to win great profit and a great kingdom who neglected it and was lax in it until it escaped him." },
    ],
    closer: [
      { title: "Why the third is the point", body: "The first two treasuries are credit and debit, and any account of a day contains them. The third is neither, and it is the one most hours actually go into. The image is constructed so that the ordinary hour has a cost, and the cost is named as chagrin rather than as guilt." },
      { title: "Where the permissible sits now", body: "Book 37 divided acts into disobedience, obedience, and the permissible, and said that the permissible is where most of a life sits and is open to the motive. This chapter is what that costs when the motive was never supplied: not a black treasury but an empty one." },
    ],
    distinction: ["Two ways an hour can fail", "Filled darkly", "The hour of disobedience, which is a debit and which everyone counts.", "Left empty", "The hour of sleep, heedlessness, or permitted business, which is not a debit and is still a loss."],
    misreading: "Do not read the empty treasury as condemning rest or the permitted. What is named is that the hour produced nothing, and the chapter's own word for the response is chagrin at a missed profit, not blame for a sin.",
    reflection: "Count yesterday in twenty-four and ask honestly how many of the treasuries would be empty.",
    audit: ["How many of my hours are empty ones?", "Do I count only the dark ones?", "What would fill one of them?", "Am I treating loss as though it were neutrality?"],
    nodes: ["treasuries", "musharata", "mubah"],
    model: spectrum("Three kinds of hour", "The middle one is the one the image was built for.", [["Lit", "Filled with light from what was done in it.", "support"], ["Empty", "Sleep, heedlessness, or permitted business; neither credit nor debit, and still a loss.", "balance"], ["Dark", "The hour of disobedience, whose dread would spoil the bliss of the Garden.", "warning"]]),
  }),
  makeChapter({
    id: 4, shortTitle: "Like the knowledge of death", formalTitle: "The second station: the reality of vigilance and its degrees",
    overview: "The definition, and it is unusually careful. Ghazali separates three things that are normally run together, and then explains why knowing something is not enough.",
    moves: [
      { title: "Give the ordinary sense", body: "The reality of vigilance is regarding the watcher and turning one's concern to him. Whoever guards against some matter on account of another is said to be watching him and observing his side." },
      { title: "Separate the three", body: "What is meant is a state of the heart, which a kind of knowledge fruits, and which itself fruits acts in the limbs and in the heart. So there is a knowledge, a state that follows from it, and acts that follow from the state." },
      { title: "Name the knowledge", body: "The knowledge is that God is aware of the innermost thoughts, knowing of the secrets, watchful over the acts of servants, standing over every soul with what it has earned; and that the heart's secret is disclosed to Him as the outer skin is disclosed to people, and more than that." },
      { title: "Give the condition", body: "This knowledge must become certainty, meaning free of doubt, and then must take possession of the heart and subdue it. For many a knowledge in which there is no doubt does not dominate the heart, like the knowledge of death." },
    ],
    closer: [
      { title: "The force of that last clause", body: "Everyone reading knows they will die, without a trace of doubt, and it governs almost nothing. Ghazali names that as the exact failure mode of the knowledge he has just described, which means the chapter cannot be satisfied by assenting to it. It is the same move as Book 37's sick man, who sees the food and knows it agrees with him and does not reach." },
      { title: "Why the state matters more than the acts", body: "Actions are the fruit two steps down. Work straight on the actions without the state and you get the surface compliance this book has no interest in — and the two levels in the chapters that follow are levels of the state, not of the performance." },
    ],
    distinction: ["Two things a person can have of this knowledge", "Assent without dominion", "Free of doubt and governing nothing, as with the knowledge of death.", "Certainty that has taken possession", "The same knowledge having subdued the heart, which is what produces the state."],
    misreading: "Do not treat agreement with the doctrine as having the station. The chapter's whole point is that undoubted knowledge routinely fails to govern, and it names the commonest example so the reader cannot claim otherwise.",
    reflection: "Take a thing you do not doubt at all and that changes nothing about your day. That gap is what this chapter is about.",
    audit: ["What do I know and not act on?", "Has this knowledge taken possession or only been agreed?", "Am I working on the acts or on the state?", "What would move it from assent to dominion?"],
    nodes: ["muraqaba", "knowledge", "certainty"],
    model: chain("Knowledge, state, acts", "Each stage produces the next, and the first stage commonly fails.", [["Knowledge", "That the inmost is disclosed, more than the skin is to others.", "support"], ["Possession", "The knowledge subduing the heart, which undoubted knowledge often fails to do.", "balance"], ["The state", "The heart's regard for the Watcher and its turning to Him.", "support"], ["The acts", "What follows in the limbs and in the heart, twice removed.", "support"]]),
  }),
  makeChapter({
    id: 5, shortTitle: "The shepherd", formalTitle: "The first degree: the vigilance of the near",
    overview: "The higher degree, and Ghazali treats it briefly and then spends most of the chapter proving that it is not exotic.",
    moves: [
      { title: "Name it", body: "The first degree is the vigilance of the near among the truthful, and it is the vigilance of magnification and reverence: the heart becomes absorbed in observing that Majesty and broken beneath the awe, so that no room remains in it for turning to anything else at all." },
      { title: "Say why its acts are not detailed", body: "Ghazali declines to lengthen the examination of its acts, because it is confined to the heart. The limbs are disabled from turning even to the permitted, let alone the forbidden, and when they move in obedience they move as if used by it, needing no management to keep them straight." },
      { title: "Give the image", body: "The flock is set right by the shepherd, and the heart is the shepherd. When it becomes absorbed in the One worshipped, the limbs run on rectitude without contrivance. This is the one whose concern has become a single concern, so that God has sufficed him the rest." },
      { title: "Describe what it looks like", body: "Somebody who gets this far can be so oblivious to the people around him that he does not see who is standing in front of him though his eyes are open, does not hear what is said to him though he is not deaf, and walks past his own son without a word. One of them, told off for it, said: give me a shake when you pass." },
    ],
    closer: [
      { title: "The argument that it is ordinary", body: "Do not think it far-fetched, he says: you find its like in hearts that magnify the kings of the earth, so that a king's servants may not feel what happens to them in the royal assembly from the intensity of their absorption. Indeed the heart may busy itself with some paltry worldly matter so that a man sinks into thought and walks past the place he intended and forgets the errand he set out for." },
      { title: "Why he argues for it that way", body: "The degree is rare and the anecdotes about it invite disbelief. Rather than defending the anecdotes, Ghazali points at an absorption every reader has experienced over something trivial, and lets the reader supply the proof that the mechanism exists." },
    ],
    distinction: ["Two ways the limbs are kept straight", "By management", "Each act watched, weighed, and steadied, which is the second degree.", "By a single concern", "The heart absorbed, so the limbs run straight without contrivance."],
    misreading: "Do not aim at this degree by imitating its symptoms. What is described is a consequence of absorption, and the descriptions of not seeing and not hearing are effects rather than practices.",
    reflection: "Recall walking past the place you were going to because you were thinking about something small. The mechanism is not in question.",
    audit: ["Has my concern ever been one concern?", "What absorbs me involuntarily?", "Am I managing the limbs or the heart?", "Would I recognise this if I saw it?"],
    nodes: ["muraqaba", "absorption", "qalb"],
    model: pair("Two routes to straight limbs", "The first degree does without the management entirely.", [["The shepherd absorbed", "A single concern, and the limbs run straight without contrivance.", "support"], ["Each act managed", "Weighed and steadied one by one, which is the second degree's work.", "balance"]]),
  }),
  makeChapter({
    id: 6, shortTitle: "Pause at the intent", formalTitle: "The second degree: the vigilance of the companions of the right hand",
    overview: "The degree almost every reader is in, and the one with an actual procedure. It is a rule about timing rather than about intensity.",
    moves: [
      { title: "Give al-Hasan's rule", body: "God have mercy on a servant who paused at his intent: if it was for God he went on, and if it was for other than God he held back. The whole degree is contained in the pause." },
      { title: "State it as an obligation", body: "God has decreed upon every servant that he watch his soul at his intent to act and at his moving of a limb, holding back from the intent and from the effort until it is disclosed to him by the light of knowledge that it is for God, so that he carries it out, or that it is for the soul's whim, so that he guards against it." },
      { title: "Say what to do with the thought", body: "He restrains the heart from thinking about it and from intending it, which is a different instruction from refusing the act. The object of the second degree is the thought and not the deed." },
      { title: "Note who can do it", body: "He adds that somebody who knows the faults of the self, the devil's tricks and where the traps are will watch out for them — while somebody who does not know them cannot possibly watch out for them. The pause only helps if you know what you are looking for." },
    ],
    closer: [
      { title: "Why the pause and not the resistance", body: "Resistance operates at the end of the sequence, where the act is already wanted and the cost of refusing is highest. The pause operates at the point where refusing costs almost nothing, which is why the next chapter sets out the sequence explicitly." },
      { title: "When it does not resolve", body: "When it stays murky and nothing comes clear, think it over in the light of what you know, and ask to be kept from the devil's trick coming dressed as your own preference. Ghazali does not pretend the pause always produces an answer." },
    ],
    distinction: ["Two places to intervene in an act", "At the intent", "Before desire has formed, where holding back costs least and the light of knowledge can still be brought.", "At the deed", "After the sequence has run, where the act is wanted and refusal is hardest."],
    misreading: "Do not read the pause as hesitation or scrupulosity. It has a termination condition: it ends when the light of knowledge discloses which of the two the intent is, and Ghazali says what to do when it does not.",
    reflection: "Try it once at the smallest scale, on something you are about to do for no particular reason.",
    audit: ["Where do I usually intervene?", "Do I know what I am looking for?", "What happens when the pause yields nothing?", "Which of my acts never get paused at all?"],
    nodes: ["muraqaba", "khatir", "knowledge"],
    model: chain("Where the pause sits", "It intervenes at the point where intervening is cheapest.", [["The intent", "Where the second degree acts, before desire has formed.", "support"], ["The effort", "The limb already moving, where holding back is harder.", "balance"], ["The deed", "Where resistance usually operates, and where it costs most.", "warning"]]),
  }),
  makeChapter({
    id: 7, shortTitle: "The first step", formalTitle: "The sequence from a passing thought",
    overview: "The reason the pause belongs where it does. Ghazali sets out a chain of five links and says the material of evil is to be cut at the first.",
    moves: [
      { title: "State the chain", body: "The first step into falsehood, if it is not repelled, bequeaths desire; and desire bequeaths intent; and intent bequeaths firm purpose; and purpose bequeaths the act; and the act bequeaths ruin and detestation." },
      { title: "Draw the instruction", body: "So the material of evil should be cut off at its first source, which is the passing thought, since everything after it follows it." },
      { title: "Explain the leverage", body: "Each link is easier to break than the one after it, because each one supplies the motive for the next. The chain is an argument about cost, not a claim that a thought is already a sin." },
      { title: "Connect it to the definition of intention", body: "Book 37 defined intention as the soul's being roused toward what it takes to hold its purpose, and said that an inclination cannot be summoned or dismissed by willing. This chain is where that becomes practical: the inclination cannot be cancelled once formed, but the passing thought that forms it can be declined." },
    ],
    closer: [
      { title: "Why a passing thought is not blamed", body: "Nothing in the sequence says that the first link is culpable. It says that the first link is where intervention is possible, which is a claim about leverage rather than about guilt, and reading it as guilt produces exactly the scrupulosity the previous chapter's termination condition rules out." },
      { title: "How this reframes failure", body: "A person who repeatedly loses at the fourth or fifth link concludes that his will is weak. The chain says instead that he is intervening late, and that the same will would succeed at the first link. That is a diagnosis with a remedy attached." },
    ],
    distinction: ["Two accounts of losing an argument with yourself", "Weak will", "The capacity to refuse is insufficient, which suggests only trying harder.", "Late intervention", "The capacity is being applied at the fifth link instead of the first, which suggests moving it."],
    misreading: "Do not turn the chain into a rule that thoughts must be policed. Its claim is that the first link is where the cost of declining is lowest, and it makes no claim that having the thought is a fault.",
    reflection: "Take something you lost this week and locate which link you were fighting at.",
    audit: ["Which link do I fight at?", "What would declining at the first have cost?", "Have I diagnosed leverage as weakness?", "Where is my first source?"],
    nodes: ["khatir", "muraqaba", "nafs"],
    model: chain("Five links", "Each supplies the motive for the next, and the first is the cheapest to break.", [["A passing thought", "Not blamed, and the only place intervention is cheap.", "balance"], ["Desire", "What the unrepelled thought bequeaths.", "warning"], ["Intent", "What desire bequeaths.", "warning"], ["Firm purpose", "What intent bequeaths.", "warning"], ["The act", "And what the act bequeaths after it.", "warning"]]),
  }),
  makeChapter({
    id: 8, shortTitle: "Three registers", formalTitle: "The three registers spread for every motion",
    overview: "The most exacting passage in the book, and the one this edition builds its diagnostic on. Three questions are put to a single act, and each is a gate to the next.",
    moves: [
      { title: "Give the frame", body: "For every motion of a servant's motions, however small, three registers are spread: the first is why, the second is how, and the third is for whom." },
      { title: "The first register", body: "Why did you do this? Was it incumbent on you to do it for your Master, or did you incline to it by your appetite and your whim? If he is safe from it, he is asked about the second." },
      { title: "The second register", body: "How did you do this? For God has in every act a condition and a ruling whose measure and time and quality are grasped only by knowledge. So: did you do it by verified knowledge, or by ignorance and conjecture? If he is safe from this, the third is spread." },
      { title: "The third register", body: "For whom did you act? Purely for the face of God, in fulfilment of your saying that there is no god but God, so that your wage is upon God? Or to be seen by a creature like you, so take your wage from him? Or to attain your immediate world, and we have paid you your share of it? Or in inadvertence and heedlessness, so that your wage has fallen." },
    ],
    closer: [
      { title: "Why the order is a sequence and not a list", body: "The second question is only reached by someone safe from the first, and the third only by someone safe from the second. A person who fails at why never arrives at for whom, which means the familiar anxiety about sincerity is often being felt at the wrong gate." },
      { title: "What the second register asks that the others do not", body: "It is the only one that is about competence rather than motive, and it is the one readers skip. Ghazali makes the standard explicit: the measure, the time, and the quality of an act are known only by knowledge, so an act done by habit and guess fails here even when the motive was sound." },
    ],
    distinction: ["Two failures that feel the same", "Failing at why", "The act was not owed and was reached for by appetite, whatever was intended by it.", "Failing at for whom", "The act was owed and correctly done, and was performed to be seen."],
    misreading: "Do not collapse the three into a general demand for sincerity. Two of the three are not about sincerity at all, and the sequence is what tells you which question your case actually stops at.",
    reflection: "Take one thing you did today and put the three questions to it in Ghazali's order rather than in the order you would have chosen.",
    audit: ["Which register does this act stop at?", "Was it owed, or reached for?", "Do I know how it is to be done, or do I guess?", "Am I anxious at the wrong gate?"],
    nodes: ["registers", "ikhlas", "knowledge"],
    model: chain("Three gates", "Each is reached only by passing the one before it.", [["Why", "Owed to your Master, or inclined to by appetite.", "support"], ["How", "By verified knowledge, or by ignorance and conjecture.", "support"], ["For whom", "For the face of God, to be seen, for an immediate return, or in heedlessness.", "support"]]),
  }),
  makeChapter({
    id: 9, shortTitle: "Before you are reckoned", formalTitle: "The third station: the excellence of reckoning with the soul",
    overview: "The station that gives the book half its title. Ghazali gathers the testimony and, in doing so, quietly connects reckoning to repentance.",
    moves: [
      { title: "Give the verse", body: "O you who believe, fear God, and let a soul look to what it has sent forward for tomorrow. Ghazali reads this as a pointer to reckoning over acts already past." },
      { title: "Give Umar's rule", body: "Reckon with yourselves before you are reckoned with, and weigh yourselves before you are weighed. The sentence is the station in miniature and supplies its whole rationale." },
      { title: "Give the forward version", body: "A man asked for advice and was asked back whether he was the sort who takes it. He said yes, and was told: when you mean to do something, look at how it ends — if it leads somewhere good, do it; if it leads somewhere wrong, stop. So the reckoning runs forward as a warning as well as backward as an audit." },
      { title: "Connect it to repentance", body: "God says to turn to Him all together, and repentance is a looking into the act after finishing it, with regret over it. So reckoning and repentance are the same operation described from two sides, which is why Book 31 stands behind this station." },
    ],
    closer: [
      { title: "The four hours", body: "Among the reports carried here is that the intelligent person should have four hours, one of them an hour in which he reckons with himself. The station is given a place in a day rather than being left as a disposition." },
      { title: "Why forward and backward both", body: "A purely retrospective audit can only produce regret. Ghazali's inclusion of the forward form, considering the outcome before acting, joins this station to the second: the pause at the intent is reckoning done in advance." },
    ],
    distinction: ["Two directions of the same operation", "Backward", "Looking into what has been sent forward, which produces regret and correction.", "Forward", "Considering the outcome before acting, which is the pause of the second station."],
    misreading: "Do not read this as a call to general self-scrutiny. What is specified is an hour, and the following chapter specifies what is done in it.",
    reflection: "Notice whether your self-examination has a time or is merely a mood that arrives.",
    audit: ["Does my reckoning have an hour?", "Do I only look backward?", "What did I send forward today?", "Would I accept this audit from someone else?"],
    nodes: ["muhasaba", "tawba", "musharata"],
    model: pair("Two directions", "Joining them is what connects this station to the second.", [["Backward", "An audit of what was sent forward, producing regret and correction.", "support"], ["Forward", "Considering the outcome before acting, which is the pause at the intent.", "support"]]),
  }),
  makeChapter({
    id: 10, shortTitle: "Capital, profit, loss", formalTitle: "The reality of reckoning after the act",
    overview: "The analogy returns with its full machinery, and Ghazali extracts an actual procedure from it rather than a sentiment.",
    moves: [
      { title: "Place the hour", body: "Just as you set terms with yourself at the start of the day, you should have an hour at the end of it where you call yourself to account for everything you did and everything you did not." },
      { title: "Give the commercial parallel", body: "As merchants do with their partners at the end of every year or month or day, out of eagerness for this world and fear of missing something of it which, had they missed it, the good would have been in the missing; and which even if they obtained it remains only a few days." },
      { title: "Draw the reproach", body: "So how should the intelligent man not reckon with himself in what carries the risk of wretchedness and happiness for all time? This laxity is only from heedlessness and abandonment." },
      { title: "State the procedure", body: "The meaning of reckoning with a partner is to look at the capital, and at the profit and the loss, so that the increase becomes clear from the decrease. If there is a surplus obtained he takes it in full and gives thanks; and if there is a loss he demands its guarantee and charges him with it." },
    ],
    closer: [
      { title: "What the capital is", body: "The analogy names three quantities, and only two of them are usually thought about. The capital is what was given before any trading began, which is why the reckoning ends in thanks where there is surplus rather than in satisfaction." },
      { title: "The force of the comparison", body: "The argument is not that merchants are worldly but that they are diligent, and that their diligence is spent on something that lasts a few days at best. Ghazali's reproach is about proportion between effort and stake, which is why it lands on the reader as a practical embarrassment rather than as a moral charge." },
    ],
    distinction: ["Two ways to close a day", "Reckoning", "Capital, profit, and loss looked at separately, with a demand made where there is loss.", "Reviewing", "A general impression of how the day went, which yields neither thanks nor a charge."],
    misreading: "Do not skip the third quantity. A reckoning that looks only at profit and loss omits the capital, and the capital is what makes thanks the response to a good day.",
    reflection: "Close one day this way, with the three quantities named separately, and notice which of them you have never counted.",
    audit: ["What was my capital here?", "Where was the surplus, and did I give thanks?", "Where was the loss, and did I charge it?", "Is my hour at the end of the day, or nowhere?"],
    nodes: ["muhasaba", "murabata", "capital"],
    model: chain("Three quantities", "Most reckonings count two of them.", [["Capital", "What was given before any trading began, and why the response to surplus is thanks.", "support"], ["Profit", "The surplus obtained, taken in full and acknowledged.", "support"], ["Loss", "The decrease, which is not merely noted but charged.", "warning"]]),
  }),
  makeChapter({
    id: 11, shortTitle: "Charging the loss", formalTitle: "The fourth station: punishing the soul for its shortfall",
    overview: "The station modern readers find hardest, and it is worth reading closely for what it actually specifies and what it merely reports.",
    moves: [
      { title: "State why the station exists", body: "Whenever he reckons with his soul and it has not come out clear of committing a wrong or falling short, he should not neglect it. For if he neglects it, committing wrongs becomes easy for him, and his soul grows familiar with them, and weaning it becomes hard, and in that is its ruin." },
      { title: "Give the principle", body: "The punishment is matched to the limb that took the profit. If he ate a doubtful morsel from his soul's appetite, he should punish the stomach with hunger; if he looked at what was not his to look at, he should punish the eye by withholding the look; and likewise each limb by preventing it from its appetites." },
      { title: "Note the logic", body: "It is the merchant's charge for a loss, applied to the party that caused it. The station is not an addition to the analogy but its fourth term, which is why it arrives here rather than being argued for separately." },
      { title: "Mark what follows", body: "He then reports how people who went down this road actually behaved, and what he passes on is severe: a man who held his hand in the fire after touching a woman, and another who left his foot out in the rain and snow after catching it moving toward something wrong." },
    ],
    closer: [
      { title: "What is specified and what is reported", body: "What Ghazali specifies is the withholding of an appetite from the limb that indulged it. What he reports afterward is what particular people did, introduced as the custom of those who travelled the road. The two are different in kind, and the chapter's own instruction is the first." },
      { title: "Why the station is not optional in his scheme", body: "His argument is about habituation rather than about desert: a loss that is never charged is a loss that repeats, because the soul grows familiar with it. Remove this station and the reckoning of the previous one produces information and no consequence." },
    ],
    distinction: ["Two responses to a loss found in the reckoning", "Charged to the limb", "The appetite withheld from what indulged it, which is what the chapter specifies.", "Noted and passed over", "Which Ghazali says makes the wrong easy and the weaning hard."],
    misreading: "Do not take the transmitted anecdotes as the instruction. They are reported as what particular people did; what the chapter prescribes is withholding an appetite from the limb that took it, and nothing in it authorises self-harm.",
    reflection: "Ask what happens in your own accounting when something comes out in the red. For most people the answer is that it is noted.",
    audit: ["What happens when I find a loss?", "Which limb took the profit?", "Is my response information or consequence?", "Am I confusing severity with seriousness?"],
    nodes: ["muaqaba", "muhasaba", "nafs"],
    model: pair("Two ways an audit can end", "Only one of them changes the next day.", [["A charge", "The appetite withheld from the limb that indulged it.", "support"], ["A note", "Recorded and passed over, which Ghazali says breeds familiarity.", "warning"]]),
  }),
  makeChapter({
    id: 12, shortTitle: "Making good", formalTitle: "The fifth station: striving",
    overview: "The station that distinguishes stopping a leak from repairing the damage, and it addresses a failure the previous stations do not reach.",
    moves: [
      { title: "Separate the two cases", body: "If he reckons and sees that his soul has committed a wrong, he punishes it with the punishments already given. If he sees it slackening through laziness in some virtue or some regular practice, that is a different failure and takes a different treatment." },
      { title: "Give the treatment", body: "He should discipline it by making the regular practices heavier upon it, and bind it to kinds of duties, as a mending of what was missed and a making good of what it neglected." },
      { title: "Give the examples", body: "Umar punished himself when he missed the afternoon prayer in congregation by giving away land worth two hundred thousand dirhams. Ibn Umar, when he missed a prayer in congregation, would spend that night in vigil, and once when he delayed the sunset prayer until two stars appeared he freed two slaves." },
      { title: "Name what it is", body: "All of that is a watch kept on the soul and a taking of it to task with what its deliverance lies in. The severity of the examples is proportioned to the means of the people in them, which is what makes them illustrations rather than a tariff." },
    ],
    closer: [
      { title: "Why laziness needs its own station", body: "Punishment answers an act that was done. Slackness is the absence of an act, and withholding an appetite does nothing about it. The fifth station exists because the fourth cannot reach a failure that consists in nothing having happened, which is exactly the empty treasury of Chapter 3." },
      { title: "The shape of the remedy", body: "The response to having done less is to be assigned more, which inverts the intuitive response of lowering the expectation until it is comfortably met. Ghazali's word for it is mending, and the debt language is deliberate." },
    ],
    distinction: ["Two failures found in a reckoning", "Something done", "A wrong committed, answered by withholding the appetite from the limb.", "Something not done", "Slackness in a practice, answered by making the practice heavier."],
    misreading: "Do not read the examples as setting an amount. Two hundred thousand dirhams is what a particular man could give; the principle stated is that the missed practice is made good with interest, not that a scale exists.",
    reflection: "Notice your instinct when you miss something repeatedly. It is usually to require less of yourself, and this station goes the other way.",
    audit: ["Which of the two failures is mine?", "Do I lower the bar when I miss it?", "What would making it good look like?", "Have I confused a tariff with a principle?"],
    nodes: ["mujahada", "muaqaba", "treasuries"],
    model: pair("Two failures, two remedies", "Applying the wrong one leaves the failure untouched.", [["A wrong done", "Answered by withholding the appetite from the limb that took it.", "warning"], ["A practice missed", "Answered by making the practice heavier, as a mending of what was neglected.", "balance"]]),
  }),
  makeChapter({
    id: 13, shortTitle: "When it will not comply", formalTitle: "The treatment when the soul does not obey",
    overview: "Ghazali raises the objection every reader has by this point in the book, and his answer is notably practical and notably modest.",
    moves: [
      { title: "Put the objection", body: "If you say that my soul does not comply with me in striving and in persevering in the regular practices, what is the way to treat it? The question is posed in the first person and taken at face value." },
      { title: "The first answer", body: "Your way in that is to make it hear what has come in the reports concerning the excellence of those who strive. The soul is treated by what it is exposed to rather than by being commanded again." },
      { title: "The second and stronger answer", body: "Among the most beneficial of the causes of treatment is to seek the companionship of a servant of God who strives in worship, so that you observe his words and take him as a model." },
      { title: "Note the form of the answer", body: "Neither answer is an instruction to try harder. Both of them are arrangements of circumstance: what you hear, and whom you are near. Ghazali calls them causes of treatment, which is the same vocabulary Book 37 used for the causes of an inclination." },
    ],
    closer: [
      { title: "Why companionship rather than resolve", body: "Book 37 argued that an inclination cannot be produced by willing and that the only route is acquiring its causes. A companion who actually strives is a cause: proximity does what exhortation cannot, and the chapter's word for the mechanism is observing and imitating rather than being persuaded." },
      { title: "What the answer concedes", body: "It concedes that the soul will not comply on demand, which is the honest premise of the whole book. The six stations are a way of dealing with a party that does not comply, and this chapter is where that is said plainly." },
    ],
    distinction: ["Two responses to a soul that will not comply", "Arrange the causes", "What you hear and whom you are near, which Ghazali calls the causes of treatment.", "Command it again", "A second and firmer resolution, which the objection has already shown does not work."],
    misreading: "Do not read the counsel of companionship as merely encouraging. It is offered as the most beneficial of the causes, above exhortation, and it is a change of circumstance rather than of attitude.",
    reflection: "Ask who you are actually near, and what that proximity has been doing to you without being asked.",
    audit: ["What am I exposed to?", "Whose practice do I actually observe?", "Have I answered non-compliance with more resolve?", "Which cause could I arrange this week?"],
    nodes: ["mujahada", "companionship", "nafs"],
    model: chain("Two causes of treatment", "Both are arrangements rather than acts of will.", [["What you hear", "The reports on those who strive, which the soul is exposed to.", "balance"], ["Whom you are near", "A companion who actually strives, named as the most beneficial.", "support"], ["What follows", "Observation and imitation, rather than persuasion.", "support"]]),
  }),
  makeChapter({
    id: 14, shortTitle: "Your worst enemy", formalTitle: "The sixth station: rebuking and reproaching the soul",
    overview: "The book closes on the station the commercial model does not predict, and it turns out to be the mechanism by which the soul changes what it is.",
    moves: [
      { title: "Name the adversary", body: "Your most hostile enemy is your soul, which is between your two sides. It was created commanding to evil, inclining to wickedness, fleeing from good, and you were commanded to purify it and straighten it and lead it with chains of compulsion to the worship of its Lord." },
      { title: "State the alternative", body: "If you neglect it, it bolts and runs off, and you will not get hold of it afterward. And if you keep at it with rebuke and reproach and censure and blame, your soul is the reproachful soul by which God swore." },
      { title: "Name the destination", body: "You may hope that it become the tranquil soul, called to enter among the servants of God, content and found pleasing. So the three souls are not three kinds of person but three states of one soul, and reproach is the passage between them." },
      { title: "Set the order", body: "Do not be heedless an hour of reminding it and reproaching it, and do not busy yourself with admonishing another so long as you have not first busied yourself with admonishing your own soul; as it was revealed to Jesus, admonish yourself, and if it takes the admonition then admonish people, and otherwise be ashamed before Me." },
    ],
    closer: [
      { title: "Why this station is not in the analogy", body: "A merchant sets terms, watches, settles up, and writes off a loss — and there the business model runs out. Telling yourself off is aimed at a partner you cannot walk away from and whose character can actually change. Ghazali needs that step because the aim of the whole book is getting the self clean, not merely keeping it in check." },
      { title: "The clause about admonishing others", body: "It is placed here rather than in a book on preaching, and its position is the argument: the impulse to correct someone else arrives most strongly in a person who has skipped this station. The instruction is not to be silent but to take the same treatment first." },
    ],
    distinction: ["Two ways to handle an adversary you cannot remove", "Reproach it", "Keep at it with censure and blame, which is what makes it the reproachful soul.", "Neglect it", "Which Ghazali says makes it bolt, after which you will not get hold of it."],
    misreading: "Do not read the reproach as self-contempt. Its stated destination is the tranquil soul, content and found pleasing, and a reproach that has no such destination is a different thing wearing the same name.",
    reflection: "Notice how quickly the urge to correct someone else arrives, and where the passage places it.",
    audit: ["Which of the three states is mine now?", "Do I reproach or do I neglect?", "Where is my reproach heading?", "Whom am I admonishing instead of myself?"],
    nodes: ["muataba", "three-souls", "nafs"],
    model: spectrum("Three states of one soul", "Reproach is the passage, not the destination.", [["Commanding", "Created inclining to wickedness and fleeing from good.", "warning"], ["Reproachful", "The soul kept at with censure and blame, and the one God swore by.", "balance"], ["Tranquil", "Called to enter among the servants, content and found pleasing.", "support"]]),
  }),
];

export const book38ConceptNodes: ConceptNode[] = [
  ["murabata", "The watch", "A trade with a partner", "The intellect is the merchant, the soul the partner, and the profit is the soul's purifying."],
  ["six-stations", "Six stations", "Derived, not listed", "Stipulate, watch, reckon, punish, strive, reproach."],
  ["nafs", "The soul", "A partner who disputes", "Not merely lazy but holding interests of its own, which is why six stations are needed."],
  ["musharata", "Stipulation", "Terms on a day", "Duties assigned and conditions imposed before anything is done, renewed daily."],
  ["treasuries", "Twenty-four treasuries", "Lit, dark, empty", "The third is the hour of sleep, heedlessness, or permitted business."],
  ["mubah", "The permitted", "Not neutral in effect", "An hour spent in it is an empty treasury, which is a loss and not a debit."],
  ["muraqaba", "Vigilance", "A state, not an act", "Fruited by a knowledge and fruiting acts, in that order."],
  ["knowledge", "Knowledge", "Which may not govern", "Undoubted knowledge often fails to dominate the heart, as with the knowledge of death."],
  ["certainty", "Possession", "Knowledge that subdues", "The condition that turns assent into a state."],
  ["absorption", "Absorption", "The first degree", "A single concern, so the limbs run straight without management."],
  ["qalb", "The heart", "The shepherd", "When it is absorbed in the One worshipped the flock keeps itself."],
  ["khatir", "The passing thought", "The first link", "Desire, intent, purpose, act; the material is cut at its first source."],
  ["registers", "Three registers", "Why, how, for whom", "Each is reached only by passing the one before it."],
  ["ikhlas", "Sincerity", "The third register", "Reached only by an act that was owed and correctly done."],
  ["muhasaba", "Reckoning", "An hour, not a mood", "Capital, profit, and loss, looked at separately at the end of the day."],
  ["capital", "The capital", "The quantity nobody counts", "What was given before trading began, and why surplus is met with thanks."],
  ["tawba", "Repentance", "The same operation", "A looking into the act after finishing it, with regret over it."],
  ["muaqaba", "Punishment", "Charging the loss", "The appetite withheld from the limb that indulged it."],
  ["mujahada", "Striving", "Making good", "The remedy for slackness is a heavier practice, not a lighter one."],
  ["companionship", "Companionship", "A cause, not a counsel", "Named as the most beneficial of the treatments when the soul will not comply."],
  ["muataba", "Reproach", "Outside the analogy", "The station a merchant has no use for, and the one that changes the partner."],
  ["three-souls", "Three souls", "One soul, three states", "Commanding, reproachful, tranquil, with reproach as the passage."],
].map(([id, label, kicker, description], index) => ({ id, label, kicker, description, position: ["left", "right", "top", "bottom"][index % 4] }));

const node = (id: string, label: string, micro: string, summary: string, guardrail: string, chapterId: number, glyph: Journey["nodes"][number]["glyph"]): Journey["nodes"][number] => ({ id, label, micro, summary, guardrail, chapterId, glyph });

export const book38Journeys: Journey[] = [
  {
    id: "who-am-i-dealing-with", number: "01", question: "Who am I actually dealing with?", title: "Meet the partner",
    description: "Take the analogy the whole book is built from, find why it needs six stations rather than one, and count a day in the unit Ghazali counts it in.",
    payoff: "You get an architecture instead of an exhortation, and one image that changes how an ordinary hour looks.",
    image: assetUrl("assets/system/book38-the-ledger.jpg"), imageAlt: "A merchant's counter at dawn where an open ledger, a set of scales and a sealed purse are laid out untouched.", minutes: 13, color: "#278d91",
    nodes: [
      node("the-trade", "Set the trade", "Profit is purifying", "The intellect is the merchant and the soul's purifying is the return.", "The analogy is the architecture, not an illustration.", 1, "know"),
      node("adversary", "Meet the adversary", "A partner, not a servant", "He disputes over the profit, which is what generates stations four to six.", "A soul that were merely lazy would need instruction only.", 1, "diagnose"),
      node("the-terms", "Set the terms", "Before anything is done", "Duties assigned and conditions imposed, and renewed each day.", "Book 37 already refused the resolution made on the spot.", 2, "order"),
      node("the-unit", "Take the unit", "Twenty-four", "Small and countable, which is what makes an evening audit possible.", "The unit is load-bearing; the severity of the address is not.", 2, "pattern"),
      node("the-empty-one", "Find the empty treasury", "Neither credit nor debit", "The hour of sleep, heedlessness, or permitted business.", "Named as chagrin at a missed profit, not as guilt.", 3, "witness"),
    ],
  },
  {
    id: "what-is-watching", number: "02", question: "What does watching actually mean?", title: "Separate knowing from being governed",
    description: "Get the definition in three parts, meet the clause that stops the chapter being satisfied by agreement, and see the two degrees the station divides into.",
    payoff: "You learn why undoubted knowledge governs nothing, and which of the two degrees you are working in.",
    image: assetUrl("assets/system/book38-the-shepherd.jpg"), imageAlt: "A hillside at midday where a flock grazes in a close group with no fence in sight and one figure seated above them.", minutes: 13, color: "#bf7a35",
    nodes: [
      node("three-parts", "Separate the three", "Knowledge, state, acts", "The state is fruited by a knowledge and itself fruits the acts.", "Working on the acts alone produces conformity and nothing else.", 4, "order"),
      node("death-clause", "Take the clause", "Like the knowledge of death", "Many an undoubted knowledge does not dominate the heart.", "This is what makes assent insufficient, and it names the commonest case.", 4, "diagnose"),
      node("first-degree", "See the first degree", "The shepherd absorbed", "A single concern, and the limbs run straight without management.", "The descriptions are effects, not practices to imitate.", 5, "witness"),
      node("ordinary-proof", "Take the ordinary proof", "Walking past your street", "Absorption in something trivial produces the same blindness.", "The mechanism is not in question, only its object.", 5, "pattern"),
      node("second-degree", "Enter the second", "Pause at the intent", "Hold back until the light of knowledge discloses which it is.", "It has a termination condition, so it is not scrupulosity.", 6, "steady"),
    ],
  },
  {
    id: "where-do-i-stop-it", number: "03", question: "Where do I stop it?", title: "Move the intervention to the first link",
    description: "Follow the chain from a passing thought to an act, find why fighting late feels like weakness, and put Ghazali's three questions to a single thing you did.",
    payoff: "You get a diagnosis with leverage in it, and three gates that tell you which question your case stops at.",
    image: assetUrl("assets/system/book38-first-link.jpg"), imageAlt: "A fine chain of five links laid out straight on pale stone, the first link open and the rest closed.", minutes: 14, color: "#c25f50",
    nodes: [
      node("the-chain", "Take the chain", "Five links", "Thought bequeaths desire, desire intent, intent purpose, purpose the act.", "Nothing here says the first link is a fault.", 7, "pattern"),
      node("cut-first", "Cut at the source", "Where it is cheapest", "Everything after the first link follows it.", "A claim about leverage, not about guilt.", 7, "clear"),
      node("not-weakness", "Rename the failure", "Late, not weak", "Losing at the fifth link is a placement problem, not a capacity problem.", "This is a diagnosis with a remedy attached.", 7, "diagnose"),
      node("register-why", "Open the first register", "Why", "Owed to your Master, or inclined to by appetite.", "Failing here means you never reach the other two.", 8, "know"),
      node("register-how", "Open the second", "How", "By verified knowledge, or by habit and guess.", "The only one about competence rather than motive, and the one readers skip.", 8, "order"),
      node("register-whom", "Open the third", "For whom", "For the face of God, to be seen, for a return, or in heedlessness.", "Reached only by an act that was owed and correctly done.", 8, "guard"),
    ],
  },
  {
    id: "audit-a-day", number: "04", question: "How do I actually audit a day?", title: "Count three quantities and charge the loss",
    description: "Place the hour, run the merchant's procedure with all three of its quantities, and follow what Ghazali says has to happen when something comes out in the red.",
    payoff: "You get a closing procedure that ends in something other than a feeling.",
    image: assetUrl("assets/system/book38-days-end.jpg"), imageAlt: "The same merchant's counter at dusk, the ledger now open at a written page, the scales holding two unequal weights.", minutes: 13, color: "#586fa8",
    nodes: [
      node("umars-rule", "Take Umar's rule", "Before you are reckoned", "Reckon with yourselves, and weigh yourselves, first.", "The station is given an hour rather than left as a disposition.", 9, "order"),
      node("both-directions", "Run it both ways", "Backward and forward", "Considering the outcome before acting is reckoning in advance.", "A purely retrospective audit can only produce regret.", 9, "balance"),
      node("three-quantities", "Count three", "Capital, profit, loss", "The capital is the one nobody counts, and it is why surplus is met with thanks.", "Two quantities give you a review, not a reckoning.", 10, "pattern"),
      node("the-proportion", "Feel the reproach", "Effort against stake", "Merchants are diligent about something that lasts a few days.", "The charge is about proportion, not about worldliness.", 10, "witness"),
      node("charge-it", "Charge the loss", "To the limb that took it", "The appetite withheld from what indulged it.", "The transmitted anecdotes are reports, not the instruction.", 11, "guard"),
    ],
  },
  {
    id: "will-not-comply", number: "05", question: "What if it simply will not comply?", title: "Arrange the causes, then reproach",
    description: "Separate the failure that consists in something done from the one that consists in nothing happening, take Ghazali's two practical treatments, and end on the station his own analogy does not predict.",
    payoff: "You leave with the remedy that inverts the obvious one, and with the three souls as a passage rather than a ranking.",
    image: assetUrl("assets/system/book38-three-souls.jpg"), imageAlt: "One lamp carried along a corridor, shown at three points on its path, the far end open and lit.", minutes: 14, color: "#a97837",
    nodes: [
      node("two-failures", "Separate the failures", "Done, or not done", "Punishment cannot reach a failure that consists in nothing happening.", "This is the empty treasury arriving as a practical problem.", 12, "diagnose"),
      node("heavier", "Take the inversion", "Make it heavier", "The remedy for slackness is more of the practice, not less.", "The examples show a principle, not a tariff.", 12, "clear"),
      node("the-objection", "Put the objection", "It does not comply", "Ghazali asks it in the first person and answers it directly.", "The whole book assumes a party that does not comply.", 13, "know"),
      node("companionship", "Take the strongest cause", "Whom you are near", "Named as the most beneficial of the treatments, above exhortation.", "A change of circumstance, not of attitude.", 13, "forces"),
      node("the-enemy", "Meet the enemy", "Between your two sides", "Neglected it bolts; reproached it becomes the reproachful soul.", "The destination is the tranquil soul, so this is not self-contempt.", 14, "witness"),
      node("three-souls", "Read the three", "One soul, three states", "Commanding, reproachful, tranquil, with reproach as the passage.", "Not three kinds of person.", 14, "steady"),
    ],
  },
];

export const book38Movements: TaxonomyGroup[] = [
  ["musharata", "1. Stipulation", "The partnership, the morning terms, and the twenty-four treasuries.", [1, 2, 3]],
  ["muraqaba", "2. Vigilance", "The definition, the two degrees, the chain from a thought, and the three registers.", [4, 5, 6, 7, 8]],
  ["muhasaba", "3. Reckoning", "The hour at day's end, and the merchant's three quantities.", [9, 10]],
  ["muaqaba", "4. Punishment", "The loss charged to the limb that took it.", [11]],
  ["mujahada", "5. Striving", "Making good what was missed, and what to do when the soul will not comply.", [12, 13]],
  ["muataba", "6. Reproach", "The station the analogy does not predict, and the three souls.", [14]],
].map(([id, label, description, chapterIds], index) => ({ id, label, description, chapterIds, color: ["#bf7a35", "#278d91", "#c25f50", "#586fa8", "#a97837"][index % 5] })) as TaxonomyGroup[];

export const book38Instrument: Instrument = {
  title: "The three registers",
  note: "Ghazali says that for every motion of a servant, however small, three registers are spread: why, how, and for whom. They are a sequence rather than a list — the second is reached only by one who is safe from the first, and the third only by one safe from the second. Take a single thing you actually did today, and answer in his order rather than the order you would have chosen.",
  items: [
    {
      id: "motion", label: "One thing you did today", lede: "Something ordinary and specific, not a category",
      note: "All three questions are Ghazali's own, in his words and his order. Most readers arrive at this book anxious about the third register; the sequence is designed to show which gate the case actually stops at, and it is very often not that one.",
      axes: [
        {
          id: "why", kicker: "The first register", question: "Why did you do it?",
          options: [
            { id: "owed", label: "It was owed — I had to do it", note: "Incumbent upon you for your Master, which is what passing this gate means." },
            { id: "appetite", label: "I inclined to it by appetite", note: "The alternative Ghazali names: you leaned toward it by your own want and whim." },
            { id: "both", label: "Both, and I cannot separate them", note: "The honest answer for most ordinary acts, and it does not clear the gate." },
          ],
        },
        {
          id: "how", kicker: "The second register", question: "How did you do it?",
          options: [
            { id: "knowledge", label: "By knowledge of how it is to be done", note: "God has in every act a condition and a ruling whose measure, time, and quality are known only by knowledge." },
            { id: "guess", label: "By habit and guess", note: "The alternative Ghazali names: ignorance and conjecture. This is a failure of competence, not of motive." },
            { id: "outline", label: "I knew the outline, not the conditions", note: "The commonest real answer, and the register exists to make it visible." },
          ],
        },
        {
          id: "whom", kicker: "The third register", question: "For whom did you do it?",
          options: [
            { id: "god", label: "For the face of God alone", note: "In fulfilment of the words of unity, so that the wage is upon God." },
            { id: "seen", label: "To be seen by someone", note: "Ghazali's answer to this is that you should take your wage from the one you did it for." },
            { id: "world", label: "For something immediate", note: "His answer is that you have already been paid your share of it." },
            { id: "heedless", label: "In heedlessness — I never asked", note: "His answer is that the wage has fallen; this is where the empty treasury of Chapter 3 comes from." },
          ],
        },
      ],
      verdicts: [
        { key: "appetite|*|*", name: "It stops at the first register", role: "warning", chapterId: 8, body: "Ghazali's first question is whether the act was incumbent on you for your Master or whether you inclined to it by appetite and whim. On your own answer this act was reached for, which means the second and third registers are never opened for it.", action: "This is useful rather than damning. If you came to this book worried about sincerity, the sequence has just told you that your case is not there — the work is at the first gate, and Chapter 6's pause at the intent is where it is done." },
        { key: "both|*|*", name: "The first register is not settled", role: "balance", chapterId: 6, body: "You cannot separate what was owed from what you leaned toward, which is the ordinary condition of most acts and is exactly why the second station exists. Ghazali does not treat this as failure; he treats it as the point at which the pause is needed.", action: "Al-Hasan's rule is the one to apply, and it works forward rather than backward: pause at the intent, and hold back until it is disclosed by the light of knowledge which of the two it is. Ghazali also says plainly what to do when nothing is disclosed." },
        { key: "owed|guess|*", name: "It stops at the second register", role: "warning", chapterId: 8, body: "The act was owed, so the first gate is passed, and it was done by habit and guess. Ghazali's second question is exactly this, and his standard is explicit: God has in every act a condition and a ruling whose measure and time and quality are grasped only by knowledge.", action: "This is the register readers skip, because it is about competence and not about motive, and a sound motive does not answer it. He adds that one who knows the blights of souls guards against them while the ignorant cannot, so the remedy here is learning the act rather than meaning it harder." },
        { key: "owed|outline|*", name: "The second register, partly", role: "balance", chapterId: 8, body: "The act was owed and you know its outline but not its conditions. Ghazali's second register asks for the measure, the time, and the quality, and it is precisely the conditions rather than the outline that he says are known only by knowledge.", action: "Name the one condition you are least sure of and settle it. This is the least dramatic work in the book and the most tractable, and unlike the other two registers it can be finished." },
        { key: "owed|knowledge|seen", name: "The third register: take your wage from him", role: "warning", chapterId: 8, body: "The act was owed and correctly done, and it was done to be seen. You have reached the third register, which most people assume is the only one, and Ghazali's answer to this option is given in his own voice: take your wage from the one you performed for.", action: "Read Book 37's chapter on the two grades of showing off next, and use its test rather than introspection: the question is not what you were thinking but whether the act improved when someone came into the room. Then Book 37's rule on a mixed act tells you what the proportion is actually worth." },
        { key: "owed|knowledge|world", name: "The third register: already paid", role: "balance", chapterId: 8, body: "The act was owed and correctly done, and it was done for something immediate. Ghazali's answer is that your share of the world has been paid to you, which is a statement about settlement rather than about wickedness.", action: "Nothing here says the immediate return was forbidden. What is said is that it was the wage, and the question worth putting is whether you would still have done the act had the return not been attached — which is Book 37's question about the strength of the motive." },
        { key: "owed|knowledge|heedless", name: "The third register: the empty treasury", role: "balance", chapterId: 3, body: "The act was owed and correctly done, and the question of for whom never arose. Ghazali's answer is that the wage has fallen, and this is the same result as the third of the twenty-four treasuries: an hour that is neither credit nor debit and is still a loss.", action: "The remedy is the first station rather than more scrutiny after the fact. Terms set on the day in advance are what put the question in front of an act before it is done, and Chapter 2 is explicit that they have to be renewed daily." },
        { key: "owed|knowledge|god", name: "All three registers pass", role: "support", chapterId: 8, body: "The act was owed, done by knowledge, and done for the face of God. That is what passing all three of Ghazali's gates means, and the book states the result plainly: your wage is upon God.", action: "Hold it lightly. Book 37 carries al-Susi's saying that whoever witnesses sincerity in his own sincerity has a sincerity that needs a sincerity, and Ghazali reads it as pointing at self-admiration in the act. The three registers are for finding where the work is, not for issuing yourself a receipt." },
        { key: "*|*|*", name: "Read the sequence", role: "balance", chapterId: 8, body: "Three answers, which Ghazali arranges as gates rather than as a checklist. The point of the order is that the question you are worried about is often not the question your case actually stops at.", action: "Find the first of the three you did not clear and start there. Everything after it is not yet the issue, and the chapter that treats that register is the one to read next." },
      ],
    },
  ],
};

export const book38Sources: SourceLink[] = [
  { label: "Primary Arabic text", note: "The complete public Arabic of Book 38 was read and used to establish the merchant analogy, the six stations of the watch, the two degrees of vigilance, the three registers, and the reckoning procedure.", url: "https://shamela.ws/book/9472/1552" },
  { label: "The first station and the treasuries", note: "The passage deriving the six stations from the partnership, and the morning charge with the image of the twenty-four treasuries and the empty one.", url: "https://shamela.ws/book/9472/1553" },
  { label: "The reality of vigilance", note: "The passage separating the knowledge, the state, and the acts, and giving the clause that undoubted knowledge may fail to govern, as with the knowledge of death.", url: "https://shamela.ws/book/9472/1557" },
  { label: "The three registers", note: "The passage setting out the three registers spread for every motion — why, how, and for whom — which the diagnostic in this edition follows.", url: "https://shamela.ws/book/9472/1559" },
  { label: "The reality of reckoning", note: "The passage placing an hour at the end of the day and giving the merchant's procedure of capital, profit, and loss.", url: "https://shamela.ws/book/9472/1564" },
  { label: "The sixth station", note: "The passage on rebuking and reproaching the soul, and on the passage from the commanding soul through the reproachful to the tranquil.", url: "https://shamela.ws/book/9472/1575" },
  { label: "Forty-book structure", note: "Ghazali.org's listing places Book 38 as the eighth book of the Quarter of Deliverance and confirms its title.", url: "https://www.ghazali.org/listing-the-forty-books/" },
];

export const book38: SystemBook = {
  id: 38,
  title: "Vigilance and Self-Examination",
  shortTitle: "Vigilance and Reckoning",
  defaultJourneyId: "who-am-i-dealing-with",
  chapters: book38Chapters,
  conceptNodes: book38ConceptNodes,
  journeys: book38Journeys,
  sources: book38Sources,
  taxonomy: {
    title: "The six stations of the watch",
    note: "Unlike the other books in this quarter, Book 38 has a single derived structure rather than a sequence of expositions. Ghazali builds a merchant's partnership and takes six stations out of it, and the fourteen reading sections here are grouped under the station each belongs to.",
    groups: book38Movements,
  },
  instrument: book38Instrument,
  editorialNote: "The five journeys, fourteen reading sections, visual models, and diagnostic are editorial learning aids. The sections follow Ghazali's own six stations in his order and are grouped under them in the movements list. The English is an original synthesis made from a reading of the public Arabic text, not a translation and not a substitute for one. Reports and inherited anecdotes are presented as material Ghazali transmitted; this prototype does not independently grade every narration. The fourth station requires particular care: what Ghazali prescribes is the withholding of an appetite from the limb that indulged it, and what he reports afterward are accounts of what particular individuals did, several of which involve self-inflicted harm. Those accounts are described here rather than reproduced as practice, and nothing in this book or this edition recommends them; the distinction between the prescription and the transmitted anecdote is stated in the section itself. The fifth station's examples of restitution are proportioned to the means of the people in them and are presented as illustrating a principle rather than setting an amount. The diagnostic puts Ghazali's own three questions to a single act in his own order and reports which register the case stops at; it cannot pronounce on anyone's state.",
};
