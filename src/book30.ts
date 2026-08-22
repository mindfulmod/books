import { assetUrl } from "./assetUrl";
import type { Chapter, ConceptNode, VisualModel } from "./data";
import type { Journey, SourceLink, SubstitutionItem, SystemBook, TaxonomyGroup } from "./systemTypes";

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
    sourceAnchor: `Book 30, ${seed.id <= 5 ? "the nature of delusion" : seed.id === 17 ? "closing" : "the four classes of the deluded"}, ${seed.formalTitle}.`,
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

export const book30Chapters: Chapter[] = [
  makeChapter({
    id: 1, shortTitle: "A definition with two halves", formalTitle: "The censure of delusion, its reality, and its definition",
    overview: "Ghazali opens the last book of the quarter by defining its subject with unusual precision. Delusion is a species of ignorance, but not every ignorance is delusion; it requires a particular thing one is deluded about and a particular thing that does the deluding, and it has two conditions that must both hold.",
    moves: [
      { title: "Locate it inside ignorance", body: "Ignorance is to hold a thing to be other than it is. Delusion is one kind of ignorance, so everything said in praise of knowledge and censure of ignorance bears on it." },
      { title: "Add the first condition", body: "The believed content must agree with desire. This is what separates delusion from an ordinary mistake, which the mind can drop as soon as it is corrected." },
      { title: "Add the second condition", body: "The cause must be a specious semblance taken for a proof. Something functions as evidence in the person's mind without being evidence." },
      { title: "State the definition", body: "Delusion is the soul's repose in what agrees with desire and toward which nature inclines, on the basis of a semblance and a deception. Whoever believes himself upon good, now or hereafter, on a corrupt pretext, is deluded." },
    ],
    closer: [
      { title: "The scope of the claim", body: "Ghazali draws the consequence himself and does not soften it: most people think well of themselves and are mistaken in it, so most people are deluded. The classes that follow are not a description of unusual failures." },
      { title: "Why the two conditions matter together", body: "A false belief that cuts against desire is corrected easily. A true belief supported by a bad argument can survive scrutiny. Delusion is the conjunction, which is why it is stable and why it feels like knowledge from the inside." },
    ],
    distinction: ["Two kinds of being wrong", "An error", "The mind holds something false and lets it go once shown, because nothing in it wanted the belief.", "A delusion", "The belief serves desire and rests on a semblance, so correction is resisted rather than received."],
    misreading: "Do not read the claim that most people are deluded as licence to diagnose other people. The definition is built so that it can be applied from the inside, where the desire and the pretext are visible.",
    reflection: "Take one belief you hold about your own standing and ask what would change for you if it were false. The size of that answer is the size of the desire attached to it.",
    audit: ["What do I believe about myself that I would hate to lose?", "What is the actual evidence for it?", "Would I have accepted that evidence for a claim I disliked?", "When was this belief last tested rather than repeated?"],
    nodes: ["ghurur", "two-conditions", "shubha"],
    model: chain("The two conditions of delusion", "Both must hold; either alone produces something less durable.", [["A belief about oneself", "Something is held to be true about one's condition or standing.", "warning"], ["It agrees with desire", "The belief is one the person wants, so resistance to correction is built in.", "warning"], ["A semblance serves as proof", "Something functions as evidence without being evidence.", "warning"], ["Repose", "The soul settles, and the state now feels indistinguishable from knowledge.", "warning"]]),
  }),
  makeChapter({
    id: 2, shortTitle: "The argument underneath", formalTitle: "The false syllogism, and how it is taken apart",
    overview: "Ghazali makes a structural claim that governs the treatment of every case in the book: every deluded person has a cause for his delusion, that cause operates as a proof, and every proof is a kind of syllogism occurring in the soul, even where its owner is unaware of it and could not state it in the terms of the learned.",
    moves: [
      { title: "Assert the hidden argument", body: "Delusion always rests on an argument the person has never articulated. The treatment is therefore to make it explicit and locate the false premise." },
      { title: "Take the first example apart", body: "Cash is better than credit; this world is cash and the next is credit; therefore prefer this world. The second premise is true and the first is the deception, because cash is better than credit only when the two are equal in amount and object. The merchant gives one dirham for ten." },
      { title: "Take the second apart", body: "Certainty is better than doubt; worldly pleasures are certain and the hereafter doubtful. This is worse, because both premises fail. The merchant's toil is certain and his profit doubtful; the student's effort certain, his attainment doubtful; the hunter's roaming certain, his catch doubtful. Prudence is agreed to be exactly this trade." },
      { title: "Name the general mechanism", body: "The delusion arises from accepting a familiar general saying that was uttered with a particular meaning intended. Whoever says cash is better than credit means better than a credit like it, though he does not say so, and the deluded is heedless of the qualification." },
    ],
    closer: [
      { title: "The wager", body: "Ali's answer to one who denied the hereafter is given as an argument fitted to the man's own reasoning: if what you said is true, you have escaped and so have we; if what we said is true, we have escaped and you have perished. The reasoning behind it is that the days of patience are few, and one who was in non-existence for an eternity without enjoying it loses only enjoyment if the reports are false." },
      { title: "Why this belongs at the front", body: "Every later class in the book is diagnosed the same way. Ghazali does not merely say that the scholar or the worshipper is deluded; he reconstructs the syllogism each one is running and shows which premise is doing the illegitimate work." },
    ],
    distinction: ["Two ways to answer a delusion", "By assent", "The person accepts the truthful report without demanding the demonstration, which is enough to leave the delusion.", "By demonstration", "The person locates the false premise in the argument he was actually running, which also protects him against its variants."],
    misreading: "Do not conclude that these arguments are only for unbelievers. Ghazali applies the identical method to jurists, ascetics, preachers, and the pious in the sections that follow.",
    reflection: "Write out, as a plain argument in two lines, the reason you believe your present condition is acceptable. Then look at each line separately.",
    audit: ["What is the unstated argument under my confidence?", "Which premise have I never examined?", "Am I applying a general saying that was meant with a qualification?", "Would I accept this reasoning from someone I disagreed with?"],
    nodes: ["syllogism", "premise", "qualification"],
    model: pair("Where the deception sits", "Ghazali locates the fault in a premise, not in the conclusion.", [["The true premise", "This world is present and the hereafter is deferred; this part is granted.", "balance"], ["The false premise", "The present is better than the deferred, which holds only when the two are equal.", "warning"]]),
  }),
  makeChapter({
    id: 3, shortTitle: "Reading ease as favour", formalTitle: "Being deluded about God, and the two slaves",
    overview: "The most consequential delusion takes God's own gifts as evidence of God's approval. Ghazali reconstructs the argument, shows that its key inference is invalid, and supplies an analogy that reverses the reading entirely.",
    moves: [
      { title: "Reconstruct the reasoning", body: "God has been good to me in this world; every benefactor is a lover; every lover continues to do good in the future. Therefore my future is secure. The past is being used to predict the future by way of an assumed favour." },
      { title: "Find the two faults", body: "The deception lies in supposing that every benefactor is a lover, and beneath that in supposing that worldly ease is a benefaction at all. To those with insight it may indicate the opposite." },
      { title: "Give the analogy", body: "A man has two young slaves, one he loves and one he dislikes. The one he loves he keeps from play, holds to school, forbids the harmful delicacies, and gives bitter medicine. The one he dislikes he neglects to live as he wishes. The neglected boy concludes that he is the favoured one, because nothing is withheld from him." },
      { title: "Name the exact failure", body: "The possibility that ease indicates abandonment is available to the mind, but it does not agree with desire. So Satan, by way of desire, inclines the heart to the reading that suits it. Ghazali says explicitly: and this is the definition of delusion." },
    ],
    closer: [
      { title: "The reverse reading", body: "Those with insight grieved when the world came to them and said it was a sin whose punishment had been hastened, and welcomed poverty as the mark of the righteous. The deluded reads honour into abundance and humiliation into constraint, and the Quran answers both readings with a single word of refusal." },
      { title: "Hasan's correction", body: "He is not honoured by wealth nor humiliated by poverty. The honoured is the one honoured through obedience, rich or poor; the humiliated is the one humiliated through disobedience, rich or poor." },
    ],
    distinction: ["Two readings of the same comfort", "Ease as gift", "A favour received, held with gratitude and with fear that it may be withdrawn.", "Ease as verdict", "A favour read as a judgment about one's standing, which is precisely the inference that fails."],
    misreading: "Do not invert the error and treat every hardship as a certificate of favour or every comfort as a sign of ruin. Ghazali's point is that outward condition does not carry the verdict in either direction.",
    reflection: "Name something that has gone well for you and state, without deciding, both readings of it. Notice which one you reached for first.",
    audit: ["What have I read as approval?", "Would I accept the opposite reading of the same fact?", "What has been withheld from me, and what did I conclude?", "Am I secure, and on what evidence?"],
    nodes: ["ease", "two-slaves", "istidraj"],
    model: pair("The neglected slave's inference", "The same treatment supports two opposite conclusions.", [["What he concludes", "Nothing is withheld from me, so I am the favoured one.", "warning"], ["What is the case", "Nothing is withheld because nothing is being formed in him.", "balance"]]),
  }),
  makeChapter({
    id: 4, shortTitle: "Another man's piety", formalTitle: "Delusion through inherited standing",
    overview: "A particular form of the same error rests a person's safety on someone else's righteousness. Ghazali treats it directly because it is durable, socially reinforced, and produces the precise inversion that the ancestors feared while the descendants feel safe.",
    moves: [
      { title: "State the syllogism", body: "Whoever loves a person loves his children; God loved your forefathers; therefore He loves you, and you have no need of obedience." },
      { title: "Show the inversion", body: "The forefathers, with the utmost scrupulousness, were afraid; the descendants, with the utmost laxity, feel safe. Ghazali calls this the furthest reach of being deluded about God." },
      { title: "Answer with the cases", body: "Noah wished to take his son aboard and was told he was not of his household; Abraham sought forgiveness for his father and it did not avail; the Prophet was permitted to visit his mother's grave and not permitted to seek forgiveness for her, and he sat and wept until those around him wept." },
      { title: "Give the general argument", body: "If love passed from father to child, hatred would pass as well. The truth is that no bearer of burdens bears another's, and God-consciousness is an individual obligation in which no parent avails a child, nor a child a parent." },
    ],
    closer: [
      { title: "The line that settles it", body: "Whoever supposes he is saved by his father's God-consciousness is like one who supposes he will be filled by his father's eating, quenched by his father's drinking, learned by his father's studying, and that he will reach the Kaaba and see it by his father's walking." },
      { title: "The place of intercession", body: "Ghazali does not deny intercession. He distinguishes sins for which it is permitted from those that incur wrath, and treats reliance on it while abandoning God-consciousness as a separate error, handled at length in the previous book." },
    ],
    distinction: ["Two things a lineage can be", "An inheritance of conduct", "The ancestors' fear, scrupulousness, and humility are taken up and practised.", "An inheritance of standing", "The ancestors' rank is treated as a possession that transfers without their conduct."],
    misreading: "Do not read this as contempt for lineage, teachers, or communities of good people. The argument is about what such a connection can and cannot do in place of a person's own action.",
    reflection: "Name the group, teacher, or family whose standing you quietly rely on, then name one practice of theirs you have not taken up.",
    audit: ["Whose righteousness am I resting on?", "Which of their practices have I actually adopted?", "Would I still feel safe without the association?", "What am I expecting to be excused, and on what basis?"],
    nodes: ["lineage", "individual-duty", "intercession"],
    model: chain("What does and does not transfer", "Ghazali separates the association from the obligation.", [["Association", "A real connection to people of standing exists.", "balance"], ["Conduct", "Their fear and scrupulousness are practised or are not.", "balance"], ["The obligation", "God-consciousness remains individual and is not discharged by another.", "support"]]),
  }),
  makeChapter({
    id: 5, shortTitle: "Hope or wishing", formalTitle: "The difference between hope and delusion",
    overview: "This is the practical centre of the book's first half. Sinners dress their expectation in the language of hope, and Ghazali argues that Satan changed only the name. He then supplies a criterion sharp enough to sort any particular case.",
    moves: [
      { title: "Name the substitution", body: "What is actually taking place is wishing upon God. Satan altered its name and called it hope, and by that the ignorant were deceived." },
      { title: "Read the Quran's own usage", body: "Those who believed and emigrated and strove are the ones described as hoping for God's mercy. Hope is attached to those in whom the ground of hope is present." },
      { title: "Give the hired man", body: "A man is hired to repair vessels for a generous employer who keeps his promises and gives more than he agreed. The hireling arrives, smashes every vessel, then sits waiting for his wage, saying the employer is generous. Rational people do not call that hoping." },
      { title: "State the criterion", body: "Every expectation that urges toward repentance or toward diligence in worship is hope; every expectation that produces slackness in worship and settles into idleness is delusion. Fear and hope are a driver and a leader, and what does not move a person to act is wishing." },
    ],
    closer: [
      { title: "The Friday-prayer case", body: "The hour is short and you are in the market. Satan says you will not reach the prayer, so stay where you are; you disbelieve him and go, hoping to reach it. That is hope. You continue trading and hope the imam will delay the prayer on your account, or for some cause you cannot name. That is delusion." },
      { title: "Where hope is genuinely required", body: "Two places. For the immersed sinner in whom repentance stirs and to whom Satan says his repentance will not be accepted, hope suppresses the despair that blocks return. And for the soul that has slackened to the bare obligations, hope rouses the energy for what lies beyond them. The first suppresses despair, the second suppresses lethargy." },
    ],
    distinction: ["Two expectations with the same words", "Hope", "It moves the person toward repentance or effort, and can be recognised by what it produces.", "Delusion", "It relaxes the person and settles him, and is recognised by the same test."],
    misreading: "Do not conclude that hope is suspect or that fear is safer. Ghazali gives hope two necessary offices and treats despair as the thing it exists to defeat.",
    reflection: "Take your own expectation of pardon and ask what it produced this week. If nothing moved, you have your answer.",
    audit: ["Did this expectation make me act or make me rest?", "Am I seeking what I say I hope for?", "What have I stopped doing because I felt secure?", "Would I call someone else's version of this hope?"],
    nodes: ["hope", "wishing", "criterion"],
    model: pair("One criterion, applied forward", "The test is what the expectation produces, not how it is described.", [["It moved me to act", "Repentance or effort followed, so the expectation was hope.", "support"], ["It settled me", "Slackness and idleness followed, so the expectation was delusion.", "warning"]]),
  }),
  makeChapter({
    id: 6, shortTitle: "Four classes, five mechanisms", formalTitle: "The classes of the deluded and the ways delusion works",
    overview: "Ghazali announces the survey that fills the rest of the book. The deluded are many, but four classes gather them, and before he begins he names the recurring mechanisms by which a person comes to hold a wrong thing to be right.",
    moves: [
      { title: "Name the four classes", body: "The scholars, the worshippers, the Sufis, and the possessors of wealth. He chooses these because each begins from something genuinely good, which is what makes the delusion available." },
      { title: "List the mechanisms", body: "Seeing the reprehensible as good; failing to distinguish what one does for oneself from what one does for God; leaving the more important for the less; leaving the obligatory for the supererogatory; and leaving the kernel for the husk." },
      { title: "Give the examples he attaches", body: "One who builds a mosque and gilds it from unlawful wealth; a preacher whose aim is acceptance and standing; and one whose concern in prayer is confined to correcting the articulation of letters." },
      { title: "State the method", body: "The instances exceed counting, so he offers examples that make an exhaustive account unnecessary, and asks the reader to learn the mechanism rather than memorise the list." },
    ],
    closer: [
      { title: "Why these four", body: "Delusion needs material. A person with nothing to point to has nothing to be deluded by, which is why the survey is a survey of the religiously accomplished rather than the openly negligent." },
      { title: "How to use the survey", body: "The five mechanisms are the transferable part. A reader in none of the four classes can still run them against whatever he does point to." },
    ],
    distinction: ["Two ways to read the survey", "As a mechanism", "The five modes are learned and applied to one's own case, whatever it happens to be.", "As a directory", "The classes are used to identify which sort of person is at fault, which is how the survey stops working."],
    misreading: "Do not treat the four classes as an attack on learning, worship, spiritual life, or wealth. Ghazali holds each to be a good, and the delusion in each case consists in what is substituted for it.",
    reflection: "Run the five mechanisms against the thing you would name if asked what you are doing well.",
    audit: ["Am I calling something good that is not?", "Which of my efforts is for me rather than for God?", "What more important thing am I postponing?", "Where am I attending to the husk?"],
    nodes: ["classes", "mechanisms", "material"],
    model: chain("Five ways a good thing goes wrong", "The mechanisms are transferable across all four classes.", [["The reprehensible seen as good", "The act itself is faulty and is read as meritorious.", "warning"], ["Self and God confused", "The purpose is personal while the description is religious.", "warning"], ["The important postponed", "Effort goes to what is lesser while the greater waits.", "warning"], ["The obligatory for the optional", "What is required is left for what is additional.", "warning"], ["The kernel for the husk", "The form is perfected and the point is lost.", "warning"]]),
  }),
  makeChapter({
    id: 7, shortTitle: "The remedy never taken", formalTitle: "The first class: learning that never became action",
    overview: "The first group among the scholars mastered the religious and rational sciences, went deep into them, and neglected to inspect the limbs. They supposed that their learning had placed them where God does not punish, and Ghazali answers with the analogy that governs the whole class.",
    moves: [
      { title: "Separate the two sciences", body: "There is the knowledge of practice, which is the lawful and unlawful and the treatment of the soul's traits, and the knowledge of unveiling. The first is wanted only for action, and any knowledge wanted for action has no value without it." },
      { title: "Give the prescription", body: "A man is ill with a condition only a compound remedy will cure. He leaves his homeland, finds a skilled physician, learns the ingredients, quantities, sources, and preparation, writes a fine copy, returns, repeats it and teaches it to the sick. A thousand copies and a thousand cured patients do not relieve his own illness." },
      { title: "Quote the criterion", body: "He has prospered who purifies it. It does not say: he has prospered who learned how to purify it, wrote the knowledge down, and taught it to people." },
      { title: "Answer Satan's objection", body: "Satan replies that knowledge itself draws reward, and recites the merits of learning. Ghazali's answer is that the one who reported the merit of knowledge also reported the state of the corrupt scholar, and that the same source cannot be trusted for one half and ignored for the other." },
    ],
    closer: [
      { title: "The claimants of gnosis", body: "Those who claim knowledge of God and His attributes while neglecting the command are worse, and the analogy is a man who would serve a king and learns his colour, shape, height, lineage, and habits, but not what pleases and angers him; or knows, and arrives covered in everything the king hates. Whoever knows a lion fears it; one who knows only its colour and its name has not known the lion." },
      { title: "Hasan's definition", body: "Asked about a ruling and told that the jurists say otherwise, he answered by asking whether the questioner had ever seen a jurist: the jurist stands the night, fasts the day, and is detached from the world." },
    ],
    distinction: ["Two things learning can be", "A means", "It is acquired for the sake of the action it makes possible, and is completed by that action.", "A destination", "It is acquired, refined, and transmitted as the achievement itself, which is where the delusion begins."],
    misreading: "Do not read this as an argument against study or teaching. Ghazali is a scholar addressing scholars, and his complaint is about what is omitted rather than what is done.",
    reflection: "Take one thing you know well about how a person should live and ask when you last did it.",
    audit: ["What do I know and not practise?", "Which knowledge have I treated as its own reward?", "Would I recognise my learning as a proof against me?", "Do I fear what I know, or feel secured by it?"],
    nodes: ["prescription", "means-end", "gnosis-claim"],
    model: chain("The prescription analogy", "Each step is genuine, and the sequence still fails.", [["Seek the physician", "Real effort is spent and real knowledge acquired.", "support"], ["Write the copy", "The remedy is recorded accurately and beautifully.", "balance"], ["Teach the sick", "Others are genuinely cured by it.", "balance"], ["Never take it", "The one who holds the remedy remains ill.", "warning"]]),
  }),
  makeChapter({
    id: 8, shortTitle: "Weeds cut at the top", formalTitle: "The second class: outward action without the heart",
    overview: "This group mastered knowledge and practice both, held to the outward acts of obedience, and abandoned the outward sins. What they did not do was inspect the heart, so the traits that plant the sins remained in place while the visible growth was repeatedly trimmed.",
    moves: [
      { title: "Name what was left", body: "Pride, envy, ostentation, the desire for leadership and elevation, wishing ill upon peers, and seeking fame among people. Some did not know these were blameworthy at all." },
      { title: "Give the governing image", body: "A man weeds a crop by cutting the tops and the ends of the weeds rather than pulling them from the root, so the roots strengthen and the growth returns, because the planting-beds of the sins are the blameworthy traits in the heart." },
      { title: "Add the surface images", body: "A cesspit plastered white; a grave adorned outside and carrion within; a dark house with a lamp set on its roof; a man expecting the king who whitewashes his door and leaves the dungheaps in the middle of the house." },
      { title: "Give the medical form", body: "A patient with scabies is given an ointment for the surface and a draught to cut the matter at its source. He is content with the ointment, abandons the draught, and continues taking what increases the matter, so he keeps painting the surface while the eruption continues from within." },
    ],
    closer: [
      { title: "The verse behind it", body: "God does not look at your forms or your wealth; He looks at your hearts and your deeds. They tended the deeds and did not tend the hearts, and the heart is the root, since none is saved but one who comes to God with a sound heart." },
      { title: "Why this class is hard to see", body: "Every visible measure returns a good result. The person is doing the acts, avoiding the sins, and the failure is located precisely where no observer, including himself, is currently looking." },
    ],
    distinction: ["Two ways of removing a fault", "At the root", "The trait that produces the acts is treated, after which the acts stop returning.", "At the surface", "The visible act is removed while the trait remains, so the removal has to be repeated indefinitely."],
    misreading: "Do not conclude that outward obedience is unimportant or that inward work replaces it. Ghazali's complaint is that one was done and the other omitted, not that the first was wrong.",
    reflection: "Take a fault you keep having to correct and ask what trait keeps planting it.",
    audit: ["Which failure do I keep trimming?", "What in me plants it?", "Have I ever treated that rather than its symptoms?", "Is my record good in every place I am able to look?"],
    nodes: ["root-trait", "surface", "heart"],
    model: pair("Two levels of the same work", "Ghazali treats the second as a delusion precisely because the first succeeded.", [["The visible crop", "Acts are performed, sins are avoided, and the record looks sound.", "balance"], ["The planting bed", "The traits that produce the acts remain untouched beneath the surface.", "warning"]]),
  }),
  makeChapter({
    id: 9, shortTitle: "Zeal for religion", formalTitle: "The third class: exempting oneself, and relabelling the fault",
    overview: "This group knew that the inward traits are blameworthy and supposed themselves free of them, holding that God tries the common people with such things and not those who have reached their rank in learning. Ghazali's treatment of them supplies the sharpest diagnostic instrument in the book.",
    moves: [
      { title: "Name the exemption", body: "They believed themselves too elevated to be tried by pride, envy, and display, so they stopped looking. The conceit that produced the exemption also concealed it." },
      { title: "Record the relabelling", body: "When the marks of pride appeared they said: this is not pride but seeking the honour of religion and manifesting the nobility of knowledge and defeating the innovators; if I wore poor clothing my enemies would gloat, and my humiliation would be a humiliation of Islam." },
      { title: "Answer it historically", body: "The deluded man forgets by what the Prophet aided the religion, and what is reported of the Companions in humility, plainness, and contentment with poverty, and Umar's reply when reproached for the plainness of his appearance on entering Syria: we are a people whom God honoured through Islam, and we seek honour in nothing else." },
      { title: "Supply the test", body: "Would you be equally angry if a different scholar were attacked or denied a position? If not, and you might even be pleased, then the anger was for yourself and the envy was your own. The question is whether the feeling survives when you are removed from the picture." },
    ],
    closer: [
      { title: "The same test applied to display", body: "He says his aim in showing his knowledge is that people be guided. Then he does not notice that he does not rejoice at their being guided by someone else as he rejoices at their being guided by him. A man with sick slaves does not care whether they are healed by his hand or another physician's. Told this, he answers that the reward is his; and God knows that if a prophet informed him his reward lay in obscurity, and he were imprisoned and chained, he would contrive to break the prison and the chains to return to where his leadership shows." },
      { title: "And to access", body: "He visits the ruler and flatters him, and calls it intercession for the Muslims. God knows that if a peer gained that favour and could repel harm from every Muslim, it would weigh on him, and that he would slander the man to the ruler if he could." },
    ],
    distinction: ["Two things anger at wrongdoing can be", "Anger for God", "It fires equally when someone other than oneself is wronged, because the self was never the subject.", "Anger for oneself", "It is present only where one's own standing is touched, and is described in religious terms afterwards."],
    misreading: "Do not conclude that public honour for the religion is never a real motive, or that a scholar may not dress or act in a way suited to his office. The test asks whether the stated reason survives when the person is swapped out.",
    reflection: "Recall the last time you were angry on principle. Put someone else in your position, keep everything else the same, and see whether the anger stays.",
    audit: ["Would I be as angry if this happened to someone else?", "Do I rejoice when another does the good I claim to want?", "Would I accept this outcome with my name removed?", "What am I calling religious that is actually mine?"],
    nodes: ["exemption", "relabelling", "substitution"],
    model: pair("The substitution test", "Remove yourself from the picture and see what survives.", [["The purpose survives", "The same good, achieved by another, produces the same satisfaction.", "support"], ["The purpose collapses", "What remains when the self is removed shows what was actually wanted.", "warning"]]),
  }),
  makeChapter({
    id: 10, shortTitle: "What stays under the soil", formalTitle: "The fourth class: the subtle residues",
    overview: "This group did the whole work. They mastered knowledge, purified the limbs, adorned them with obedience, avoided outward sins, inspected the heart for ostentation, envy, rancour, pride, and the desire for elevation, and struggled to be rid of them. Ghazali says they are deluded still, and the reason is exact.",
    moves: [
      { title: "Give the refined image", body: "A man weeding a crop searches out every weed he sees and pulls it, but does not search for what has not yet broken the surface. Fine shoots have spread beneath the soil, and while he supposes the work finished they gather strength and ruin the roots of the crop without his knowing." },
      { title: "Describe the hidden motive", body: "He spends day and night gathering sciences, ordering them, refining their expression, and compiling works, believing his motive is the manifestation of religion. The concealed motive may be renown, travellers arriving from every quarter, tongues loosed in praise, heads moving at his words." },
      { title: "Test it on authorship", body: "If someone claimed his book and erased his name from it, it would weigh on him, though he knows the reward for its benefit returns to the one who actually wrote it, and God knows who that is. The weight is the finding." },
      { title: "Follow it into detail", body: "Praising himself in the work, plainly or by attacking others so that the attack establishes his superiority; attributing the weak sayings to their authors and leaving the good ones unattributed so they are taken for his, like one who steals a shirt and makes it into a coat so it will not be recognised." },
    ],
    closer: [
      { title: "Among peers", body: "Gathered together, each supposes himself safe. Separate them, give each a following, and each measures his own against the others and is pleased if his is larger, though he knows another is worthier of it. When a student leaves him for another it sits heavily, and afterwards he no longer exerts himself for the man, even where the transfer was better for the student's religion." },
      { title: "What Ghazali asks of the reader", body: "He does not claim this level is attainable by most. The lowest degree, he says, is that a person know his own faults, be pained by them, and be eager to correct them; whoever is gladdened by his good deed and grieved by his bad one is in a hoped-for state, and his case is nearer than the deluded man who declares himself pure." },
    ],
    distinction: ["Two states of an unfinished work", "Knowing the residue", "The person is aware that subtler motives remain, is pained by them, and keeps looking.", "Declaring it finished", "The visible weeds are gone, the search stops, and what is under the soil is left to grow."],
    misreading: "Do not use this section to conclude that self-examination is futile or that every good work is secretly corrupt. Ghazali's stated aim is that the reader keep looking, not that he despair of the result.",
    reflection: "Take something good you made and imagine it circulating with someone else's name on it. Sit with what that costs.",
    audit: ["Would I do this work anonymously?", "Do I count my following?", "Does another's praise of a peer sit badly with me?", "Am I pained by my faults, or by their being seen?"],
    nodes: ["residue", "authorship", "peers"],
    model: chain("The finer weeding", "The failure is in stopping, not in the work already done.", [["Pull the visible", "Every weed above the surface is found and removed.", "support"], ["Declare it done", "The absence of visible growth is read as completion.", "warning"], ["Shoots below", "Finer roots spread unseen and strengthen.", "warning"], ["Keep searching", "The remedy is continued inspection, not a verdict of purity.", "support"]]),
  }),
  makeChapter({
    id: 11, shortTitle: "A part taken for the whole", formalTitle: "The fifth class: confining knowledge to one department",
    overview: "Some confined themselves to the science of legal rulings in disputes and transactions, gave that alone the name of jurisprudence, and neglected both the outward and the inward works. Ghazali holds them deluded from two directions at once, in their action and in their knowledge.",
    moves: [
      { title: "Diagnose the action", body: "They did not restrain the tongue from backbiting, the stomach from the unlawful, or the foot from walking to the rulers, and did not guard their hearts from pride, envy, and display, while supposing themselves occupied with the obligation of their religion." },
      { title: "Give the analogy", body: "A man has a mortal internal illness and needs to learn its remedy and use it, and instead spends night and day studying the rulings for a condition he cannot have, saying that a woman may one day ask him about it." },
      { title: "State the principle", body: "Occupying oneself with a communal obligation before completing an individual obligation is disobedience, and this holds even where the intention behind the study is sound." },
      { title: "Diagnose the knowledge", body: "He confined himself to rulings and supposed that this was the science of religion, leaving the Book, the practice of the Prophet, the refinement of character, and the understanding of God through His majesty, which is the knowledge that produces fear and carries a person to God-consciousness." },
    ],
    closer: [
      { title: "The word that misled him", body: "The cause of the delusion is what he heard in the Law magnifying jurisprudence. He did not consider that the jurisprudence intended there is understanding about God and knowledge of the attributes that produce fear and hope, as in the verse about a party going forth to gain understanding in religion and to warn their people." },
      { title: "How wide this runs", body: "Ghazali extends the analysis to those whose delusion is inside jurisprudence itself, who suppose that a servant's standing with God follows the ruling of the courtroom, and construct devices to repel rights. A judge cannot see into hearts and rules by the outward release; a release given only to escape harm is not given with a willing soul." },
    ],
    distinction: ["Two senses of one word", "Understanding about God", "Knowledge of what He loves and hates, producing fear, humility, and God-consciousness.", "Rulings between people", "A necessary discipline for the community's affairs, which does not by itself do the first thing."],
    misreading: "Do not read this as a dismissal of legal scholarship, which Ghazali treats as a communal obligation that someone must discharge. The complaint is about the order of priority and about mistaking a part for the whole.",
    reflection: "Ask which of your obligations is individual and which is communal, then look at where your hours actually went.",
    audit: ["What is required of me that no one else can do?", "Where am I doing the part I enjoy?", "Am I using a permitted ruling to avoid a duty?", "Would this stand if hearts could be seen?"],
    nodes: ["part-whole", "individual-duty", "legal-device"],
    model: pair("Two obligations, one order", "Ghazali makes the order itself the point.", [["The individual obligation", "What is required of this person and cannot be discharged by another.", "support"], ["The communal obligation", "What the community must supply, taken up before the first is complete.", "warning"]]),
  }),
  makeChapter({
    id: 12, shortTitle: "Even when right", formalTitle: "The sixth class: disputation, including the party in the right",
    overview: "Ghazali divides the disputants into a straying party and a party in the right, and then makes the striking move of the section: delusion, he says, comprehends them all, and he explains the delusion of the party that holds the correct position.",
    moves: [
      { title: "Diagnose the straying party", body: "Their fault is that they did not suspect their own view and did not first establish the conditions of proof and its method, so one of them saw a semblance as a proof and a proof as a semblance." },
      { title: "State the harder case", body: "The party in the right is deluded from another direction: it supposed that disputation is the most important of matters and the most excellent act of drawing near in God's religion." },
      { title: "Name the corollary they added", body: "They held that no one's religion is complete without investigation, and that whoever assents to God and His Messenger without examination and the framing of a proof is either not a believer or not complete in faith and not brought near." },
      { title: "Show what it cost", body: "For this corrupt supposition they spent their lives learning disputation and examining the doctrines and contradictions of the innovators, and neglected what the time was owed." },
    ],
    closer: [
      { title: "The counsel that follows", body: "For one who has not devoted his life to knowledge, Ghazali's advice is not to plunge into the schools or listen to them, but to hold that God is one, that nothing is like Him, that His Messenger is truthful in what he reported, to follow the way of the early community, to believe what came in the Book and the practice without probing for detail, and to occupy himself with God-consciousness, avoiding disobedience, discharging obedience, and compassion toward the Muslims." },
      { title: "Why being right is not protection", body: "This is the clearest demonstration of the book's definition. The content of the belief is correct; the delusion is in the estimate of its importance and in what that estimate displaced." },
    ],
    distinction: ["Two ways a correct position can fail", "Held in proportion", "The truth is held and given the weight it deserves against the rest of what is owed.", "Held as everything", "The truth is correct and is treated as the highest matter, so a life is spent defending it."],
    misreading: "Do not take this as a rejection of theology, argument, or careful thinking. Ghazali wrote extensively in these fields, and the section concerns proportion and displacement.",
    reflection: "Name the position you most enjoy defending, and ask what it has displaced in your week.",
    audit: ["What has defending this cost me?", "Do I suspect my own view?", "Would I know a semblance from a proof?", "Is this the most important thing I could be doing?"],
    nodes: ["disputation", "proportion", "shubha"],
    model: chain("How a right position becomes a delusion", "Correctness of content does not settle the question.", [["The position is true", "The belief itself withstands examination.", "support"], ["Its rank is overestimated", "It is taken to be the most important of matters.", "warning"], ["A life is spent", "Years go to defending it and examining its opponents.", "warning"], ["What was owed is left", "The individual obligations of heart and conduct wait.", "warning"]]),
  }),
  makeChapter({
    id: 13, shortTitle: "Speaking of the states", formalTitle: "The seventh class: preaching, transmission, and language",
    overview: "Ghazali gathers several groups whose common feature is that they handle religious material expertly and mistake the handling for the thing. He is hardest on the highest of them, and says so.",
    moves: [
      { title: "Begin with the highest", body: "Those who speak of the soul's traits, of fear, hope, patience, gratitude, trust, detachment, certainty, and sincerity. Their delusion is the severest, because they suppose that speaking of these qualities and calling people to them has made them so." },
      { title: "Show the inference they run", body: "He supposes that he could not have gone deep into the science of love unless he loved, nor grasped the fine points of sincerity unless he were sincere, nor found the hidden faults of the soul unless he were free of them, and that he could not know nearness and distance unless he were brought near." },
      { title: "Turn to those who abandoned the method", body: "The preachers who took up extravagance, ecstatic sayings, and phrases outside the measure of Law and reason, seeking novelty; and those enamoured of rhyming and flourishes, whose aim is that cries and raptures multiply in their gatherings. He calls them devils among humankind, who erred and led others astray." },
      { title: "Add the collectors", body: "Those content to memorise the sayings of the ascetics without grasping their meanings; those who spend their time on hearing narrations and seeking rare elevated chains so as to say they narrate from a particular teacher; and those who spend a life on grammar, lexicon, and rare words and suppose themselves the pillars of the community." },
    ],
    closer: [
      { title: "The measure for language", body: "One who spends his whole life learning penmanship and perfecting letters, saying the sciences cannot be preserved without writing, would be answered that it is enough to learn the script so that it can be read. Had the man of letters reason, he would know that the language of the Arabs is a language like any other." },
      { title: "Why the preacher's case is worst", body: "The others hold material that stands apart from them. The one who speaks about the states of the heart is describing an interior, and the fluency of the description is the very thing he takes as evidence that he possesses it." },
    ],
    distinction: ["Two relations to the same words", "Describing a state", "The vocabulary is accurate and the speaker's own condition remains a separate question.", "Being described by it", "Fluency about the state is treated as evidence of having it, which is the inference that fails."],
    misreading: "Do not conclude that no one should preach, transmit, or study language. Ghazali does all three in this very book; the fault is the substitution of the handling for the thing handled.",
    reflection: "Take a virtue you can explain well and ask what evidence you have of it beyond being able to explain it.",
    audit: ["What can I describe better than I can do?", "Does my speaking about this stand in for having it?", "Do I seek effect in the room or benefit for the hearer?", "What am I collecting that I never use?"],
    nodes: ["preaching", "fluency", "collecting"],
    model: pair("The inference that fails", "Ghazali isolates a single illegitimate step.", [["What is established", "The person can describe the state precisely and can teach it.", "balance"], ["What is inferred", "Therefore the person possesses the state, which does not follow.", "warning"]]),
  }),
  makeChapter({
    id: 14, shortTitle: "The message and the consonants", formalTitle: "The second class of the deluded: the worshippers",
    overview: "Among those devoted to worship and action, Ghazali finds delusion in prayer, in recitation, in fasting, in pilgrimage, and in the correcting of others. The pattern is consistent: care is spent lavishly on a part of the act while the point of the act is unattended.",
    moves: [
      { title: "Show misallocated scruple", body: "One overcome by anxiety in ablution treats remote possibilities of impurity in water as near, and when it comes to eating treats near possibilities of the unlawful as remote. Umar performed ablution from a Christian woman's jar despite the evident possibility, and abandoned whole areas of the lawful for fear of falling into the unlawful." },
      { title: "Follow it into prayer", body: "Anxiety about the intention until the congregation is missed and the time expires; anxiety about the pronouncing of the opening until its very form is altered; and then heedlessness for the whole of the prayer that follows, while the person supposes that the effort spent at the outset distinguishes him." },
      { title: "Give the messenger", body: "One who carries a message to a ruler's assembly and is ordered to deliver it as it is, and sets about delivering it while fussing over the articulation of each letter, repeating and restarting, heedless of the purpose of the message and of the dignity of the assembly." },
      { title: "Give the letter", body: "A master writes his slave a letter of commands. The slave does not turn his attention to understanding or acting on it, but confines himself to memorising it, and persists in the opposite of what he was ordered while repeating the letter aloud in a fine voice a hundred times a day." },
    ],
    closer: [
      { title: "The order of purposes", body: "Recitation is wanted so that memorising is not lost, memorising is wanted for the meaning, and the meaning is wanted for the acting upon it and the benefit of its senses. Each step exists for the next, and the delusion is to stop at one and treat it as the end." },
      { title: "The test of the fine voice", body: "A man with a good voice recites, delights in it, and supposes the delight to be the sweetness of intimate address and of hearing God's speech. Ghazali's test is a substitution: if he repeated the same melodies over poetry or other speech he would delight in them just as much. The pleasure was in the voice." },
    ],
    distinction: ["Two places care can go", "To the purpose", "Attention is proportioned to what the act is for, and the parts are given their due.", "To a fragment", "Attention concentrates on one element that can be perfected and measured, while the purpose goes unattended."],
    misreading: "Do not conclude that correctness in worship is unimportant or that scruple is always a fault. Ghazali's argument is about proportion and about which possibilities are being treated as live.",
    reflection: "In your next act of worship, notice what you are actually attending to, and ask whether it is the point of the act.",
    audit: ["Where is my care disproportionate?", "Which near possibility am I treating as remote?", "Am I attending to the form or the purpose?", "Would the pleasure survive if the content changed?"],
    nodes: ["scruple", "fragment", "voice-test"],
    model: chain("The chain of purposes", "The delusion is to stop at any link and call it the end.", [["Recitation", "The words are said so that what is memorised is not lost.", "support"], ["Memorising", "What is held is held for the sake of its meaning.", "balance"], ["Meaning", "The meaning is grasped for the sake of acting on it.", "balance"], ["Action", "The benefit of the senses is realised in conduct.", "support"]]),
  }),
  makeChapter({
    id: 15, shortTitle: "The armour and the review", formalTitle: "The third class of the deluded: the Sufis",
    overview: "Ghazali writes about this class as one who belongs to it, and remarks at the outset how prevalent delusion is among them. He moves from imitation of appearance, through imitation of vocabulary, to the abandonment of the Law itself.",
    moves: [
      { title: "Describe the imitation", body: "They matched the truthful among the Sufis in dress and bearing, in expressions, manners, observances, and terminology, in sitting on the mat with the head bowed into the collar like one absorbed in thought, in the drawn sigh and the lowered voice, and having taken on these things supposed themselves Sufis, never having wearied themselves with struggle, discipline, or the watching of the heart, which are the first stations of the path." },
      { title: "Give the review", body: "An old woman hears that the brave are entered in the register and granted a province. She puts on a coat of mail and a helmet, learns the warriors' verses and their melodies until they come easily, learns their swagger in the field and the motions of their hands, and presents herself at the camp to have her name entered. At the review she is ordered stripped of the helmet and mail and tested in single combat, and is found to be a weak old woman who cannot bear the weight of the armour." },
      { title: "Follow the dress inward", body: "Others found even plain dress too hard and sought costly patched robes, fine cloths, and dyed mats, wearing what is finer than silk while supposing the colour and the patching made them Sufis, forgetting that the colour was to spare frequent washing and the patches were because the garments had torn." },
      { title: "Reach the last group", body: "Those who fell into the abandonment of the Law, folding up its carpet and levelling the lawful and the unlawful, saying that God has no need of their action, or that hearts cannot be purified of appetite so the charge is impossible, or that deeds of the limbs carry no weight and their hearts are already in the presence while their bodies are in the world." },
    ],
    closer: [
      { title: "The answer to the impossibility claim", body: "The fool does not know that people were never charged with tearing out appetite and anger at the root, but with removing the material of both so that each submits to the judgment of reason and the Law." },
      { title: "The claimants of gnosis", body: "Those who claim witnessing and passing beyond the stations, knowing these things only as names, having picked up ecstatic words which they repeat as though speaking from revelation. A farmer leaves his farming and a weaver his weaving, keeps their company a few days, and takes up the vocabulary; then he says of the worshippers that they are toiling hirelings, and of the scholars that they are veiled by talking about God." },
    ],
    distinction: ["Two ways of resembling the sincere", "By the path", "The struggle, discipline, and inward watching are undertaken, and the outward marks follow or do not.", "By the marks", "The dress, vocabulary, and bearing are adopted and the path is never entered."],
    misreading: "Do not read this as a rejection of the Sufi path. Ghazali defends its truthful practitioners throughout and notes that the imitators harm them twice, by ruining those who follow them and by corrupting everyone else's opinion of the sincere.",
    reflection: "Ask what someone would find if the outward marks of your seriousness were removed and only the practice were examined.",
    audit: ["What have I adopted that costs nothing?", "Have I entered the first station or only its vocabulary?", "Do I look down on the ordinary observant?", "What would I be if stripped of the appearance?"],
    nodes: ["imitation", "review", "ibaha"],
    model: chain("What the review removes", "Ghazali's image is built so that each layer can be taken off.", [["Vocabulary", "The words and the manner are learned and repeated fluently.", "warning"], ["Dress and bearing", "The outward marks are adopted and read by others as the thing itself.", "warning"], ["The stripping", "Everything acquired without struggle is removed at the examination.", "balance"], ["What remains", "Only what was actually undertaken is left to be weighed.", "support"]]),
  }),
  makeChapter({
    id: 16, shortTitle: "Names in the brickwork", formalTitle: "The fourth class of the deluded: the possessors of wealth",
    overview: "The last class spends real money on real goods and is deluded in the spending. Ghazali examines the source of the wealth, the choice of object, and the conditions attached to the gift, and finds a test that settles most cases immediately.",
    moves: [
      { title: "Begin with the source", body: "Some build mosques, schools, hostels, and bridges from wealth gained by injustice, plunder, and bribes, and write their names on them in brick so that their memory endures. They exposed themselves to displeasure in the earning and again in the spending, when what was required was return to the owners, or to their heirs, or to the most important interests." },
      { title: "Give the decisive test", body: "If one of them were required to spend a single dinar without his name being written on the place, it would weigh on him and his soul would not consent, though God is aware of it whether the name is written or not. Were his aim God's face rather than the faces of people, he would not need the inscription." },
      { title: "Examine the object", body: "Others earned lawfully and spent on mosques, and are deluded in two ways: there may be poor in the same neighbourhood for whom the money is more important, and spending is light on them because a mosque is visible; and the money goes to gilding and ornament that occupies the hearts of those praying and takes their eyes." },
      { title: "Examine the conditions", body: "Others give charity but seek crowded assemblies and grateful recipients who will publicise it, dislike giving in secret, and count a poor man's concealing what he took as an offence against them; and repeat the pilgrimage while leaving their neighbours hungry." },
    ],
    closer: [
      { title: "The exchange with Bishr", body: "A man came to take leave, saying he had resolved on the pilgrimage and asking for counsel. How much have you set aside? Two thousand dirhams. What do you seek by it, detachment, longing for the House, or God's good pleasure? God's good pleasure. Then if you attained God's good pleasure while remaining in your house, and spent the two thousand, and were certain of His pleasure, would you do it? Yes. Then go and give it to ten: a debtor to discharge his debt, and a poor man to mend his condition." },
      { title: "The stone and the mosque", body: "Two men came to a mosque and one stopped at the door and said that one like him does not enter God's house, and the two angels recorded him with God as a man of truth. And when the disciples pointed to the beauty of the temple, the answer was that God does not regard the gold and silver and these stones that please you, and that the most beloved of things to Him are sound hearts." },
    ],
    distinction: ["Two ways of giving the same sum", "For the benefit", "The object is chosen by what is most needed, and the gift is indifferent to whether it is known.", "For the record", "The object is chosen by what will be seen, and the gift depends on the attribution surviving."],
    misreading: "Do not conclude that building, endowment, or public giving is blameworthy. Ghazali's tests concern where the money came from, whether the object was chosen by need, and whether the gift survives the removal of the name.",
    reflection: "Take something you have given or intend to give, and decide it again with your name removed and no one informed.",
    audit: ["Where did this money come from?", "Did I choose the object by need or by visibility?", "Would I give the same amount anonymously?", "Whose need is nearest to me right now?"],
    nodes: ["inscription", "object-choice", "secrecy"],
    model: pair("The dinar without a name", "One removal settles most of these cases.", [["The gift survives", "The same sum goes to the same need with the attribution gone.", "support"], ["The gift does not", "What made the spending light was the record, not the need.", "warning"]]),
  }),
  makeChapter({
    id: 17, shortTitle: "Not yet", formalTitle: "The last trap: being deluded by the escape",
    overview: "Ghazali ends the book, and the whole quarter, by turning the analysis on the reader who has understood it. Having named every snare, he describes the one that waits for the person who has evaded them, and then the one that waits after that.",
    moves: [
      { title: "Give Satan's last speech", body: "You have exhausted me and escaped by your intelligence and the completeness of your reason. I overcame many of the saints and the great and could not overcome you. How enduring you are, and how great your rank with God, that He strengthened you to defeat me and let you perceive every entrance of my deception." },
      { title: "Name what happens next", body: "He listens, believes it, and marvels at himself for his flight from delusion, so his self-admiration becomes the utmost delusion. Conceit is greater than any sin, which is why Satan said: when you supposed that by your knowledge you escaped me, by your ignorance you fell into my snares." },
      { title: "Take the escape from that too", body: "Suppose he does not marvel, knowing the escape is from God and not from himself, since one who knows his own weakness knows he could not have managed the least of it alone. Ghazali says something still threatens him: delusion by God's grace, trusting the generosity and feeling safe from the devising, supposing he will remain on this course and not fearing slackening or reversal." },
      { title: "State the required posture", body: "His way is to witness the whole of it as God's grace, and then to fear for himself that some trait may have closed over his heart while he was unaware, and to fear that his state may be taken from him in the blink of an eye, neither secure from the devising nor heedless of the peril of the end." },
    ],
    closer: [
      { title: "The saint at the last breath", body: "Satan appeared to one of the friends of God at the moment of departure, when a single breath remained, and said: you have escaped me. He answered: not yet." },
      { title: "The ladder, and the last rung", body: "All people are destroyed except the knowing; all the knowing are destroyed except those who act; all who act are destroyed except the sincere; and the sincere are in grave danger. So the deluded is destroyed, and the sincere man fleeing delusion is in danger, and this is why fear and caution never leave the hearts of God's friends." },
    ],
    distinction: ["Two ways of holding an escape", "Witnessed as grace", "The escape is attributed to God and is held together with fear that it may be withdrawn.", "Held as achievement", "The escape is attributed to one's own perception, which converts it immediately into the thing escaped."],
    misreading: "Do not read the ending as counsel to despair or as a claim that vigilance is pointless. Ghazali's own conclusion is that fear and caution remain, not that effort fails.",
    reflection: "Notice what happened in you while reading this book, particularly any moment of recognising someone else in it, and any satisfaction at having recognised the trap.",
    audit: ["What did I feel on finishing this book?", "Have I concluded anything about my own safety?", "Am I attributing this understanding to myself?", "Have I ever seriously pictured this being taken away?"],
    nodes: ["last-trap", "regress", "not-yet"],
    model: chain("The regress at the end", "Each escape opens onto the next danger.", [["Escape the snares", "The entrances of delusion are perceived and avoided.", "support"], ["Marvel at the escape", "The perception is credited to oneself, and conceit closes the circle.", "warning"], ["Attribute it to God", "The credit is returned, and the conceit is answered.", "support"], ["Feel secure in the grace", "Trust hardens into safety from the devising, which is the last delusion.", "warning"], ["Witness and fear together", "The grace is acknowledged and the outcome is left open.", "support"]]),
  }),
];

export const book30ConceptNodes: ConceptNode[] = [
  ["ghurur", "Delusion", "Repose on a semblance", "The soul settles into what agrees with desire on a pretext taken for proof."],
  ["two-conditions", "Two conditions", "Desire and a semblance", "A belief that serves desire and rests on false evidence resists correction."],
  ["shubha", "The semblance", "Evidence that is not", "Something functions as proof in the mind without being proof."],
  ["syllogism", "The hidden argument", "Never stated, always present", "Every delusion runs an argument its holder could not put into words."],
  ["premise", "The false premise", "Where the work is done", "Treatment means locating which line of the argument is illegitimate."],
  ["qualification", "The dropped qualification", "A general saying, a particular meaning", "Familiar maxims are applied past the condition that made them true."],
  ["ease", "Ease", "A fact, not a verdict", "Comfort and constraint do not carry a judgment about standing in either direction."],
  ["two-slaves", "The two slaves", "Neglect read as favour", "The unrestricted child concludes he is loved because nothing is withheld."],
  ["istidraj", "Being drawn on", "Gifts that are not approval", "Provision may accompany the withdrawal of attention rather than mark its presence."],
  ["lineage", "Inherited standing", "Another's righteousness", "A connection to people of standing does not discharge an individual obligation."],
  ["individual-duty", "Individual obligation", "What no one can do for you", "God-consciousness is required of each person and is not transferable."],
  ["intercession", "Intercession", "Real, and not a plan", "Its reality does not make reliance on it a substitute for care."],
  ["hope", "Hope", "It moves you", "An expectation that produces repentance or effort."],
  ["wishing", "Wishing", "It settles you", "An expectation that produces slackness, renamed to sound like hope."],
  ["criterion", "The criterion", "Read the effect", "Sort any expectation by what it actually produced this week."],
  ["classes", "Four classes", "Where delusion finds material", "Scholars, worshippers, Sufis, and the wealthy each begin from a real good."],
  ["mechanisms", "Five mechanisms", "The transferable part", "Wrong seen as right, self for God, lesser for greater, optional for obligatory, husk for kernel."],
  ["material", "Material", "Delusion needs something to point at", "The survey covers the accomplished rather than the openly negligent."],
  ["prescription", "The prescription", "Learned, copied, never taken", "Knowledge wanted for action has no value apart from the action."],
  ["means-end", "Means and end", "Where the sequence stops", "A step kept for its own sake becomes the place the delusion sits."],
  ["gnosis-claim", "Claimed knowing", "Names without meanings", "One who knows only a lion's colour and name has not known the lion."],
  ["root-trait", "The root trait", "What plants the act", "Faults that keep returning are being cut above the soil."],
  ["surface", "The surface", "Whitewash and lamplight", "Every visible measure can return a good result while the failure sits elsewhere."],
  ["heart", "The heart", "What is actually weighed", "Deeds were tended and hearts were not, and the heart is the root."],
  ["exemption", "The exemption", "Too advanced to be tried", "Supposing oneself beyond a fault is what stops the looking."],
  ["relabelling", "Relabelling", "The fault in religious words", "Pride becomes honour for the religion and envy becomes anger for the truth."],
  ["substitution", "The substitution", "Remove yourself and look", "A stated purpose that collapses when another person achieves it was not the purpose."],
  ["residue", "The residue", "What has not surfaced", "Finer roots spread beneath ground already declared clear."],
  ["authorship", "Authorship", "The name on the work", "If an erased name weighs, the weight is the finding."],
  ["peers", "Peers", "Counting the following", "Each supposes himself safe until the followings can be compared."],
  ["part-whole", "A part for the whole", "One department named the science", "A necessary discipline is mistaken for the whole of what is owed."],
  ["legal-device", "The device", "Permitted, and not settled", "A courtroom ruling does not decide what stands between a person and God."],
  ["disputation", "Disputation", "Right, and still deluded", "Correct content does not settle the question of proportion."],
  ["proportion", "Proportion", "What this displaced", "A true position held as the highest matter can consume what was owed elsewhere."],
  ["preaching", "Speaking of the states", "Fluency taken as evidence", "Describing an interior precisely is not possessing it."],
  ["fluency", "Fluency", "The handling for the thing", "Expertise with religious material can substitute for its object."],
  ["collecting", "Collecting", "Chains, words, and sayings", "Material is gathered and refined while the obligation waits."],
  ["scruple", "Misallocated scruple", "Remote near, near remote", "Care is lavished where it is measurable and withheld where it costs."],
  ["fragment", "The fragment", "Perfected, and beside the point", "Attention concentrates on the element that can be scored."],
  ["voice-test", "The voice test", "Change the words", "If the delight survives a change of content, the delight was in the sound."],
  ["imitation", "Imitation", "The marks without the path", "Dress, vocabulary, and bearing are acquired at no cost."],
  ["review", "The review", "Stripped and tested", "What was taken on without struggle comes off at the examination."],
  ["ibaha", "Abandoning the Law", "The claim of exemption", "Hearts said to be present while bodies are indulged, and the charge called impossible."],
  ["inscription", "The inscription", "A dinar with no name", "The requirement that the gift be recorded is the diagnostic."],
  ["object-choice", "Choice of object", "Need or visibility", "What is nearest and most needed is weighed against what will be seen."],
  ["secrecy", "Secrecy", "The gift that survives it", "Disliking a concealed benefit reveals what the giving was for."],
  ["last-trap", "The last trap", "Escaping, and marvelling", "Perceiving every snare becomes the achievement one is deluded by."],
  ["regress", "The regress", "Each escape opens another", "Conceit answered by attribution, attribution hardening into security."],
  ["not-yet", "Not yet", "The answer at the last breath", "Fear and caution do not leave, and the outcome stays open."],
].map(([id, label, kicker, description], index) => ({ id, label, kicker, description, position: ["left", "right", "top", "bottom"][index % 4] }));

const node = (id: string, label: string, micro: string, summary: string, guardrail: string, chapterId: number, glyph: Journey["nodes"][number]["glyph"]): Journey["nodes"][number] => ({ id, label, micro, summary, guardrail, chapterId, glyph });

export const book30Journeys: Journey[] = [
  {
    id: "how-false-feels-true", number: "01", question: "How does a false belief feel true?", title: "Take apart the argument you never stated",
    description: "Define delusion precisely, find the two conditions that make it durable, then learn the method Ghazali uses on every case in the book: reconstruct the hidden syllogism and locate the premise doing illegitimate work.",
    payoff: "You gain a method for examining a belief about yourself instead of a warning about believing things.",
    image: assetUrl("assets/system/book30-hidden-argument.jpg"), imageAlt: "A luminous white-and-gold hall where a brass balance weighs a present coin against a distant one, with a fine inlaid line running beneath both pans.", minutes: 13, color: "#bf7a35",
    nodes: [
      node("define-ghurur", "Define it exactly", "Not every error", "Delusion is ignorance that agrees with desire and rests on a semblance taken for proof.", "The definition is built to be applied from the inside.", 1, "name"),
      node("find-conditions", "Find both conditions", "Desire and pretext", "Either alone is corrigible; together they produce a belief that resists correction.", "A belief you dislike is not the one to look for here.", 1, "pattern"),
      node("reconstruct", "Reconstruct the argument", "Never stated, always running", "Every delusion rests on reasoning its holder has not articulated.", "The argument exists even where it cannot be put in words.", 2, "know"),
      node("find-premise", "Find the false premise", "Cash, credit, certainty, doubt", "Familiar maxims are applied past the qualification that made them true.", "The conclusion is not attacked; the premise is.", 2, "diagnose"),
      node("weigh-the-wager", "Weigh the stakes", "Few days against what follows", "The reasoning is offered to someone who does not yet grant the premises.", "An argument fitted to a hearer is not a proof of the matter.", 2, "balance"),
    ],
  },
  {
    id: "hope-or-wishing", number: "02", question: "Is this hope or am I wishing?", title: "Sort one expectation by what it produced",
    description: "Watch a reading of God's generosity become a reason to stop, learn why inherited standing cannot be relied on, then apply a criterion that settles any particular case in a sentence.",
    payoff: "You can tell your own hope from your own wishing without needing to judge either in general.",
    image: assetUrl("assets/system/book30-hope-and-wishing.jpg"), imageAlt: "A sunlit courtyard where one turquoise channel runs on toward an open gate and another spreads still and shallow before a closed arcade.", minutes: 14, color: "#278d91",
    nodes: [
      node("read-the-ease", "Read the ease twice", "Gift or verdict", "Comfort supports two opposite conclusions, and only one agrees with desire.", "Do not invert it and read hardship as approval.", 3, "mirror"),
      node("see-two-slaves", "See the two slaves", "Nothing withheld", "The unrestricted child concludes he is favoured because nothing is being formed in him.", "Outward condition carries no verdict either way.", 3, "witness"),
      node("drop-the-lineage", "Drop the inheritance", "Another's piety", "A connection to people of standing does not discharge what is owed by you.", "This is not contempt for lineage or for teachers.", 4, "clear"),
      node("meet-the-hireling", "Meet the hireling", "Smashed vessels, waiting for wages", "Expectation without the ground of expectation is not hope, whatever it is called.", "The employer's generosity is granted, not denied.", 5, "know"),
      node("apply-criterion", "Apply the criterion", "Did it move you?", "What urges toward repentance or effort is hope; what settles into idleness is delusion.", "Hope has two necessary offices and is not itself suspect.", 5, "resolve"),
    ],
  },
  {
    id: "knowing-that-ruins", number: "03", question: "Can knowing be the thing that ruins me?", title: "Follow learning from the remedy to the residue",
    description: "Work through the classes of deluded scholars: the remedy never taken, the heart left untended, the fault relabelled as zeal, the residue under the soil, and the part mistaken for the whole.",
    payoff: "You leave with the substitution test, which is the most portable instrument in the book.",
    image: assetUrl("assets/system/book30-remedy-and-residue.jpg"), imageAlt: "An ivory apothecary arcade where a written prescription lies sealed beside an untouched vessel, and a cultivated bed shows fine roots spreading beneath cleared soil.", minutes: 18, color: "#c25f50",
    nodes: [
      node("never-took-it", "See the remedy untaken", "A thousand copies", "Knowledge wanted for action holds no value apart from the action.", "This is not an argument against study or teaching.", 7, "learn"),
      node("weed-the-root", "Weed at the root", "Cut tops grow back", "Faults that keep returning are planted by traits that were never treated.", "Outward obedience is not thereby unimportant.", 8, "cultivate"),
      node("catch-relabelling", "Catch the relabelling", "Pride as honour for religion", "The fault survives by being described in the vocabulary of the thing it corrupts.", "Public honour can be a real motive; the test decides.", 9, "diagnose"),
      node("run-substitution", "Run the substitution", "Remove yourself", "A purpose that collapses when another achieves the same good was not the purpose.", "The test names a likely motive, not a verdict on a soul.", 9, "mirror"),
      node("keep-searching", "Keep searching", "What has not surfaced", "The lowest degree is to know your faults, be pained by them, and keep looking.", "The counsel is continued inspection, not despair.", 10, "attend"),
    ],
  },
  {
    id: "worship-gone-wrong", number: "04", question: "Can worship itself go wrong?", title: "Watch care collect in the wrong place",
    description: "Trace misallocated scruple through ablution, intention, and recitation, then follow imitation from dress and vocabulary to the abandonment of the Law, and see what a review removes.",
    payoff: "You can tell the difference between perfecting an act and performing it.",
    image: assetUrl("assets/system/book30-review-and-armour.jpg"), imageAlt: "A bright marble review court where a suit of armour and a patched robe hang empty on a stand beside a plain bench and an open ledger.", minutes: 16, color: "#586fa8",
    nodes: [
      node("misplace-scruple", "Find the misplaced care", "Remote near, near remote", "Anxiety concentrates where it is measurable and lifts where it would cost.", "Correctness in worship is not being dismissed.", 14, "diagnose"),
      node("carry-the-message", "Carry the message", "Consonants and the assembly", "The messenger perfects the articulation and forgets the purpose and the room.", "The parts still have their due.", 14, "attend"),
      node("test-the-voice", "Test the voice", "Change the words", "If the delight survives a change of content, the delight was in the sound.", "A good voice is not itself the fault.", 14, "witness"),
      node("strip-the-armour", "Strip the armour", "What was acquired free", "Dress, vocabulary, and bearing come off at the examination.", "The truthful practitioners are defended, not indicted.", 15, "clear"),
      node("answer-exemption", "Answer the exemption", "The charge is possible", "No one was charged with uprooting appetite, but with governing it.", "Bodies indulged while hearts are declared present is the claim being refused.", 15, "guard"),
    ],
  },
  {
    id: "escaping-the-escape", number: "05", question: "What happens once I escape?", title: "Meet the trap that waits for the reader",
    description: "Examine giving that depends on its record, then turn the whole analysis on yourself and find the snare set for the person who has understood the book.",
    payoff: "You finish the quarter holding a result you cannot convert into security.",
    image: assetUrl("assets/system/book30-not-yet.jpg"), imageAlt: "A quiet luminous arcade at dusk where a single lamp burns beside an unmarked foundation stone and an open doorway leads onward.", minutes: 15, color: "#a97837",
    nodes: [
      node("remove-the-name", "Remove the name", "One dinar, no inscription", "A gift that will not survive anonymity was attached to the record.", "Endowment and public giving are not blameworthy.", 16, "clear"),
      node("choose-by-need", "Choose by need", "Nearest, not most visible", "The object of the giving is weighed by what is needed rather than what is seen.", "Being seen is one condition among several, not the whole finding.", 16, "balance"),
      node("hear-the-flattery", "Hear the last speech", "You escaped me", "Perceiving every snare becomes the achievement one is then deluded by.", "Conceit here is greater than the faults escaped.", 17, "name"),
      node("return-the-credit", "Return the credit", "Not from yourself", "The escape is witnessed as grace rather than as one's own perception.", "Attribution alone does not close the matter.", 17, "receive"),
      node("say-not-yet", "Say not yet", "Grace and fear together", "The grace is acknowledged and the outcome is left open until the end.", "The counsel is vigilance, not despair.", 17, "steady"),
    ],
  },
];

export const book30Movements: TaxonomyGroup[] = [
  ["definition", "1. What delusion is", "Ignorance, desire, and a semblance taken for proof.", [1]],
  ["syllogism", "2. The false syllogism", "The hidden argument and its faulty premise.", [2]],
  ["about-god", "3. Deluded about God", "Ease read as favour, and the two slaves.", [3]],
  ["lineage", "4. Inherited standing", "Another's righteousness in place of one's own.", [4]],
  ["hope", "5. Hope and delusion", "The criterion, the hireling, and the two offices of hope.", [5]],
  ["classes", "6. The four classes", "The survey announced and its five mechanisms.", [6]],
  ["learning", "7. Learning without action", "The remedy learned, copied, and never taken.", [7]],
  ["heart", "8. Action without the heart", "Whitewash, lamplight, and weeds cut at the top.", [8]],
  ["exemption", "9. Exempting oneself", "The fault relabelled, and the substitution test.", [9]],
  ["residue", "10. The subtle residues", "Authorship, following, and what stays under the soil.", [10]],
  ["department", "11. A part for the whole", "Rulings named the science, and the order of obligations.", [11]],
  ["disputation", "12. Disputation", "The straying party and the party in the right.", [12]],
  ["speaking", "13. Speaking and collecting", "Preaching on the states, transmission, and language.", [13]],
  ["worship", "14. The worshippers", "Scruple, articulation, recitation, fasting, and pilgrimage.", [14]],
  ["sufis", "15. The Sufis", "Dress, vocabulary, claimed gnosis, and abandoning the Law.", [15]],
  ["wealth", "16. The possessors of wealth", "Source, object, inscription, and secrecy.", [16]],
  ["last-trap", "17. The last trap", "Escaping delusion and being deluded by the escape.", [17]],
].map(([id, label, description, chapterIds], index) => ({ id, label, description, chapterIds, color: ["#bf7a35", "#278d91", "#c25f50", "#586fa8", "#a97837"][index % 5] })) as TaxonomyGroup[];

export const book30Substitutions: SubstitutionItem[] = [
  {
    id: "guidance", label: "Guidance", claim: "I want people to be guided",
    setting: "You teach, explain, write, or correct, and you say the aim is that people come to the truth.",
    swaps: [
      { id: "another-guide", label: "Another guide", prompt: "The same people are guided just as well, by someone else, and your part is never mentioned.", intact: "The satisfaction is the same. A physician with sick slaves does not mind whose hand heals them.", partial: "You are glad, and something is missing. Ghazali expects the residue rather than its absence.", collapsed: "The good happening without you does not feel like the good you wanted.", chapterId: 9 },
      { id: "obscurity-reward", label: "Equal reward, hidden", prompt: "You are told with certainty that the identical reward attaches to doing this in obscurity, unnamed and unremembered.", intact: "You would take it, and the work would continue in that form.", partial: "You would take it, and would find the form harder to sustain.", collapsed: "Ghazali's own example: he would break the prison and the chains to return to where his leadership shows.", chapterId: 9 },
    ],
  },
  {
    id: "anger", label: "Anger at wrong", claim: "My anger here is for the truth",
    setting: "Someone is in the wrong, or has attacked what is right, and you find yourself genuinely angry about it.",
    swaps: [
      { id: "other-target", label: "A different target", prompt: "Everything is the same except that the person wronged, slandered, or passed over is not you but a peer.", intact: "The anger is the same size. The self was never the subject of it.", partial: "The anger is real and noticeably smaller, which locates part of it.", collapsed: "There is little anger, and perhaps some quiet satisfaction. That is the finding.", chapterId: 9 },
      { id: "rival-succeeds", label: "A rival does the good", prompt: "A peer gains the access or standing you sought and uses it to achieve exactly the outcome you said you wanted.", intact: "The outcome is what mattered, and you are glad it arrived.", partial: "You are glad and it sits heavily, which is worth naming rather than resolving.", collapsed: "It weighs on you, and Ghazali adds the harder question of whether you would undermine him if you could.", chapterId: 9 },
    ],
  },
  {
    id: "work", label: "Work made", claim: "I made this to be of use",
    setting: "A book, a lesson, a project, a body of work you built and believe you built for the good it does.",
    swaps: [
      { id: "erased-name", label: "Your name erased", prompt: "Another person is credited with it, your name is removed, and the work keeps benefiting everyone it was meant to benefit.", intact: "The benefit continues, so the purpose is met.", partial: "The benefit matters and the loss is felt, which is ordinary and worth watching.", collapsed: "Ghazali's exact case: it weighs, though you know the reward returns to whoever actually did it, and God knows who that is.", chapterId: 10 },
      { id: "counted-following", label: "The following compared", prompt: "You and your peers are separated, each given a group, and one of them draws a larger following than you.", intact: "You are pleased that the work is being done and by whom.", partial: "You notice yourself measuring, and you notice the measuring.", collapsed: "You are displeased, even knowing another may be worthier of it.", chapterId: 10 },
    ],
  },
  {
    id: "giving", label: "Giving", claim: "I gave this for God",
    setting: "Money or effort spent on a mosque, an endowment, a charity, a building, or a public good.",
    swaps: [
      { id: "no-inscription", label: "No name recorded", prompt: "The same sum goes to the same place, with no inscription, no announcement, and no one informed that it was you.", intact: "The spending is unchanged, which is what Ghazali says would be true if the aim were God's face.", partial: "You would still give and would want it known, which is the pressure to examine.", collapsed: "It weighs, and your soul does not consent, though God is aware of it either way.", chapterId: 16 },
      { id: "nearest-need", label: "The nearest need", prompt: "The money goes instead to poor people in your own neighbourhood, quietly, with nothing standing afterwards to mark it.", intact: "The object was chosen by need, so the redirection is welcome.", partial: "You accept it, and the invisible form is noticeably less appealing.", collapsed: "Ghazali's point exactly: spending is light where it will be seen.", chapterId: 16 },
    ],
  },
  {
    id: "worship", label: "An act of worship", claim: "This is for God alone",
    setting: "Recitation, prayer, fasting, pilgrimage, or any devotional act you perform with care and find meaningful.",
    swaps: [
      { id: "change-content", label: "The same sound, other words", prompt: "The pleasure you take in reciting is tested by putting the identical voice and melody to poetry or ordinary speech.", intact: "The delight drops away, so it was attached to the meaning and not the sound.", partial: "Some of it survives, which tells you what proportion was the voice.", collapsed: "The delight is the same, and Ghazali's conclusion is that the pleasure was in your own voice.", chapterId: 14 },
      { id: "no-record", label: "Nothing to show", prompt: "The act happens with no observers, no count kept, and nothing about it distinguishing you from anyone else.", intact: "The act keeps its shape and its care.", partial: "It continues with less energy, which is evidence rather than a verdict.", collapsed: "Much of what made it worth doing was the part that could be seen or counted.", chapterId: 14 },
    ],
  },
];

export const book30Sources: SourceLink[] = [
  { label: "Primary Arabic text", note: "The complete public Arabic of Book 30 was read in full and used to establish the definition, the false syllogism, the criterion for hope, the four classes, and the closing regress.", url: "https://shamela.ws/book/9472/1124" },
  { label: "The announced structure", note: "The page on which Ghazali names the four classes of the deluded and the five mechanisms of delusion, and states that he will begin after the exposition of its reality and definition.", url: "https://shamela.ws/book/9472/1125" },
  { label: "Hope and delusion", note: "The passage distinguishing hope from wishing, opening with the hired man who smashed the vessels and continuing on the following page into the Friday-prayer case, the criterion, and the two places in which hope is required.", url: "https://shamela.ws/book/9472/1131" },
  { label: "Forty-book structure", note: "Ghazali.org's listing places Book 30 as the tenth and final book of the Quarter of Perils and confirms its title.", url: "https://www.ghazali.org/listing-the-forty-books/" },
  { label: "Ihya bibliography", note: "Ghazali.org's book-by-book bibliography records the available translation status for Book 30.", url: "https://www.ghazali.org/site/ihya.htm" },
];

export const book30: SystemBook = {
  id: 30,
  title: "The Censure of Delusion",
  shortTitle: "Delusion",
  defaultJourneyId: "how-false-feels-true",
  chapters: book30Chapters,
  conceptNodes: book30ConceptNodes,
  journeys: book30Journeys,
  sources: book30Sources,
  taxonomy: {
    title: "Seventeen source movements",
    note: "The first five filters cover the definition, the false syllogism, and the difference between hope and delusion. The remaining twelve follow the four classes Ghazali announces, with the long survey of the scholars presented as seven consecutive readings and the book's closing regress kept as its own movement.",
    groups: book30Movements,
  },
  substitutionTest: {
    title: "The substitution test",
    note: "Ghazali's recurring instrument: state the purpose you claim, then remove yourself from the picture and see whether the purpose survives. Choose a claim and work its swaps. This sorts a motive toward a likely reading so that treatment can begin; it cannot pronounce on sincerity, reward, or your standing.",
    items: book30Substitutions,
  },
  editorialNote: "The five journeys, seventeen reading sections, visual models, and substitution test are editorial learning aids. The sequence preserves Ghazali's own order: the censure and definition, the difference between hope and delusion, then the four announced classes of the deluded. Because his survey of the scholars is far longer than the other three classes combined, it is presented as seven consecutive readings rather than one, and the book's closing passage is kept as its own section. The English is an original synthesis made from a complete reading of the public Arabic text, not a translation and not a substitute for one. Fons Vitae has not published a complete English Book 30, and this prototype does not claim access to one. Reports and inherited anecdotes are presented as material Ghazali transmitted; this prototype does not independently grade every narration. Several sections describe named groups of scholars, worshippers, Sufis, and wealthy patrons in Ghazali's own sharply critical terms; they are presented as his diagnosis of conditions a reader should examine in himself, not as a description of any living person or community. The substitution test cannot pronounce on sincerity or reward. Complex personal cases require the complete Arabic, a reliable full edition when available, and qualified scholarly guidance.",
};
