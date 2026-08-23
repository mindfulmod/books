import { assetUrl } from "./assetUrl";
import type { Chapter, ConceptNode, VisualModel } from "./data";
import type { AudienceChamberItem, Journey, SourceLink, SystemBook, TaxonomyGroup } from "./systemTypes";

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
    sourceAnchor: `Book 28, ${seed.id <= 12 ? "Part One" : "Part Two"}, ${seed.formalTitle}.`,
  },
});

const chain = (title: string, caption: string, items: Array<[string, string, "support" | "balance" | "warning"]>): VisualModel => ({
  kind: "chain", title, caption, items: items.map(([label, body, role]) => ({ label, body, role })),
});

const pair = (title: string, caption: string, items: Array<[string, string, "support" | "balance" | "warning"]>): VisualModel => ({
  kind: "pair", title, caption, items: items.map(([label, body, role]) => ({ label, body, role })),
});

export const book28Chapters: Chapter[] = [
  makeChapter({
    id: 1, shortTitle: "When being known becomes a goal", formalTitle: "The censure of fame and spreading renown",
    overview: "Ghazali opens by warning against deliberately seeking a name that circulates among people. The danger is not that every beneficial person becomes unknown. It is that being known becomes a reward pursued for itself and begins governing religious work.",
    moves: [
      { title: "Name the object", body: "The censured appetite seeks the expansion of one's name and notice in human hearts, not merely the completion of a useful task." },
      { title: "Separate result from pursuit", body: "Getting known because you taught or served where it was needed, without going after it, is not the same thing as building a name on purpose." },
      { title: "Trace the burden", body: "A public name creates new dependence on opinion, protection of image, and fear of falling from the position already gained." },
      { title: "Return to function", body: "The work should remain intelligible through the good it serves even if recognition is reduced, delayed, or transferred to another person." },
    ],
    closer: [
      { title: "Unavoidable visibility", body: "He accepts that teaching, putting things right, and carrying public responsibility will make somebody known. The question to ask is which way round it runs: are you visible because you are useful, or are you busy because it keeps you visible?" },
      { title: "The hidden contract", body: "Fame becomes a fragile wage. The person must keep receiving attention for the act to continue feeling worthwhile." },
    ],
    distinction: ["Renown can arrive by two routes", "Unintended renown", "A needed work becomes known while recognition remains incidental.", "Sought fame", "The work is selected, shaped, or prolonged so that the name will spread."],
    misreading: "Do not conclude that beneficial public work must be abandoned or that every known teacher deliberately sought fame.",
    reflection: "Imagine the same work credited to someone else. Notice what becomes harder to continue.",
    audit: ["Would I begin if no one could connect the work to me?", "What useful result requires this degree of visibility?", "What part of the work is mainly maintaining my name?", "Can I celebrate another person receiving the credit?"],
    nodes: ["fame", "visibility"],
    model: pair("Two routes into public notice", "Visibility is tested by its cause and governing purpose.", [["Useful work becomes visible", "Recognition follows a real public function and remains subordinate to it.", "balance"], ["Visibility becomes the work", "Attention, circulation, and name preservation become the practical reward.", "warning"]]),
  }),
  makeChapter({
    id: 2, shortTitle: "The shelter of obscurity", formalTitle: "The virtue of obscurity and anonymity",
    overview: "Obscurity can protect the heart from comparison, performance, and the constant management of reputation. Ghazali praises it as a form of safety, not as contempt for society or refusal of every responsibility.",
    moves: [
      { title: "Reduce the audience", body: "Fewer people watching means fewer moments spent working out who will praise you, who will criticise, and what it all does for your standing." },
      { title: "Recover ordinary action", body: "A person can serve, worship, learn, and repent without turning each act into evidence for a public identity." },
      { title: "Accept hidden fruit", body: "The good of an act need not be completed by human recognition when its true object is already present." },
      { title: "Keep duty intact", body: "Obscurity is praiseworthy only while it does not become an excuse for abandoning obligations that genuinely require appearing." },
    ],
    closer: [
      { title: "Safety is not rank", body: "Choosing a safer condition is not a claim of inward superiority. A hidden person can still perform inwardly for an imagined audience." },
      { title: "Ordinariness as training", body: "Being treated without distinction can reveal how much energy had been borrowed from special treatment." },
    ],
    distinction: ["Hiddenness has two forms", "Protective obscurity", "Less visibility removes a temptation while duties remain fulfilled.", "Avoidant withdrawal", "The person uses hiddenness to escape service, accountability, or a necessary public role."],
    misreading: "Do not romanticize isolation or treat public usefulness as spiritual failure.",
    reflection: "Choose one good action that can be completed quietly this week and do not create a second audience for it afterward.",
    audit: ["Which act becomes easier when no one sees it?", "Which act becomes harder?", "Where is visibility genuinely required?", "Do I turn hiddenness itself into a superior identity?"],
    nodes: ["obscurity", "safety"],
    model: chain("What obscurity can remove", "The shelter is valuable because it reduces specific pressures.", [["Fewer witnesses", "Less immediate comparison and display.", "support"], ["Less image management", "Ordinary action no longer has to protect a public character.", "balance"], ["Clearer purpose", "The act can return to the good it was meant to serve.", "balance"]]),
  }),
  makeChapter({
    id: 3, shortTitle: "The appetite for standing", formalTitle: "The censure of status",
    overview: "Status places a person inside the attention and deference of others. Ghazali censures its love when human hearts become a territory to possess and their response becomes a source of control, pleasure, and imagined security.",
    moves: [
      { title: "Locate the possession", body: "Status is held not in a chest but in other people's beliefs, praise, assistance, preference, and willingness to defer." },
      { title: "See the instability", body: "Because the possession lives in changing hearts, it requires repeated performance and remains vulnerable to rumor, criticism, and replacement." },
      { title: "Notice the reach", body: "Standing can procure service, access, protection, and even wealth, making it a particularly attractive form of power." },
      { title: "Restore proportion", body: "Only the social standing actually needed for lawful life and service should be treated as a means rather than a final acquisition." },
    ],
    closer: [
      { title: "A distributed possession", body: "Status feels stable because many people carry it, yet that distribution also means its owner cannot fully control it." },
      { title: "The cost of preservation", body: "The more of you is built out of people deferring, the more it hurts when somebody criticises you — or simply treats you as an equal. Both start to feel like something being taken." },
    ],
    distinction: ["Standing can serve or rule", "Instrumental standing", "Enough trust and authority to fulfill a real responsibility.", "Possessed standing", "The response of people is desired as power, pleasure, and proof of personal worth."],
    misreading: "Do not treat leadership, expertise, or earned trust as automatically blameworthy. The analysis concerns the love and use of standing.",
    reflection: "List the forms of special treatment that would disappear if your title disappeared.",
    audit: ["What deference do I silently expect?", "Which criticism feels like loss of property?", "How much authority does the task actually require?", "Can the responsibility pass to someone more capable?"],
    nodes: ["status", "hearts"],
    model: chain("Status lives in borrowed hearts", "The farther standing spreads, the more maintenance it can demand.", [["Perceived excellence", "People form a belief about a quality or role.", "support"], ["Standing in hearts", "The belief produces esteem and expectation.", "balance"], ["Social effects", "Praise, service, access, preference, and obedience follow.", "warning"], ["Preservation pressure", "Image must be defended to keep the effects.", "warning"]]),
  }),
  makeChapter({
    id: 4, shortTitle: "What status actually is", formalTitle: "The reality of status",
    overview: "Ghazali defines status with precision: it is a position in people's hearts produced by their belief in a person's excellence. That inward belief then yields outward effects such as praise, service, support, preference, and respect.",
    moves: [
      { title: "Begin with belief", body: "Status begins when another person attributes excellence, usefulness, knowledge, power, lineage, or character to the subject." },
      { title: "Follow belief into conduct", body: "The attributed quality changes how the observer speaks, assists, obeys, gives access, or yields priority." },
      { title: "Recognize partial need", body: "Life with others requires some credibility and mutual trust, so the category cannot be rejected without qualification." },
      { title: "Test truthfulness", body: "The most corrupt route fabricates or performs a quality that is not possessed so that its social effects can still be collected." },
    ],
    closer: [
      { title: "Why definition matters", body: "Once status is seen as belief producing conduct, the reader can inspect which perceived excellence is being advertised and what return is expected." },
      { title: "Truthful disclosure", body: "Stating a real qualification may be permissible when a needed responsibility cannot otherwise be assigned, but the truth of the claim does not remove the need to inspect motive." },
    ],
    distinction: ["Credibility differs from manufactured prestige", "Credibility", "A real quality is known to the degree needed for trust and service.", "Manufactured prestige", "Signs of excellence are arranged to acquire effects that the underlying reality does not justify."],
    misreading: "Do not call every accurate statement of competence self-display. Context, necessity, truth, and purpose all matter.",
    reflection: "For one area of standing, write the attributed quality and the concrete social benefits it produces.",
    audit: ["What do people believe I possess?", "Which belief is accurate but exaggerated?", "What return follows from that belief?", "Could the task be assigned through evidence rather than image?"],
    nodes: ["definition", "credibility"],
    model: chain("From attributed quality to social return", "Status is a causal sequence, not an invisible substance.", [["Attributed quality", "An excellence is believed to be present.", "support"], ["Position in the heart", "Esteem and expectation stabilize.", "balance"], ["Outward return", "Praise, help, access, and deference follow.", "warning"]]),
  }),
  makeChapter({
    id: 5, shortTitle: "Why status can exceed wealth", formalTitle: "Why status is naturally loved more than wealth",
    overview: "Status can be loved more intensely than money because it can generate money, feels harder to steal, and reproduces through the speech of admirers. Yet this apparently durable asset is still lodged in changing human judgment.",
    moves: [
      { title: "Status procures means", body: "Influence can draw service, opportunity, gifts, protection, and wealth without each benefit being purchased directly." },
      { title: "It appears less vulnerable", body: "A store of money can be taken at once, while a reputation seems distributed across many minds and therefore safer." },
      { title: "It reproduces socially", body: "A convinced admirer can carry the person's standing into new circles, multiplying it through praise." },
      { title: "Its weakness is concealed", body: "The same word of mouth that built your standing can pull it down — through one criticism, something new coming out, somebody competing with you, or people simply forgetting." },
    ],
    closer: [
      { title: "Leverage explains intensity", body: "The love of status is not only love of compliments. It is love of the many powers that favorable belief can unlock." },
      { title: "Spread is not ownership", body: "A name circulating widely may feel possessed, but every carrier remains free to revise or withdraw the judgment." },
    ],
    distinction: ["Two forms of security", "Material reserve", "Stored means can be counted and lost directly.", "Reputational reserve", "Favorable belief seems to regenerate access but remains dependent on changing observers."],
    misreading: "Do not assume that less money means less worldly attachment. Reputation can become a more absorbing form of possession.",
    reflection: "Notice whether you would surrender money more easily than a respected image.",
    audit: ["What access does my standing procure?", "Who carries my reputation into other rooms?", "What loss of image do I treat as catastrophe?", "Which ordinary equality feels unexpectedly painful?"],
    nodes: ["leverage", "spread"],
    model: chain("Why status can feel richer than wealth", "One belief can unlock several worldly returns.", [["Favorable belief", "An attributed excellence is accepted.", "support"], ["Social multiplication", "Praise carries the belief outward.", "balance"], ["Material and relational access", "Service, opportunity, and preference follow.", "warning"], ["Hidden fragility", "The entire chain still depends on changeable hearts.", "warning"]]),
  }),
  makeChapter({
    id: 6, shortTitle: "Real and imagined perfection", formalTitle: "True perfection and imaginary perfection",
    overview: "The appetite for status borrows strength from the human love of perfection. Ghazali separates qualities that truly perfect the person from images of completeness created by possessions, followers, and control over what cannot remain.",
    moves: [
      { title: "Honor the original desire", body: "Wanting completion is not itself the error. The error begins when a temporary sign is mistaken for the reality it is meant to indicate." },
      { title: "Test dependence", body: "A perfection that disappears when observers, titles, wealth, or bodily power depart cannot be the stable completion the heart seeks." },
      { title: "Distinguish knowledge from control", body: "Knowledge and sound character form the person inwardly, while control over external things expands a domain that must still be lost." },
      { title: "Redirect aspiration", body: "The cure is not to desire nothing, but to desire qualities whose value is not borrowed from public assignment." },
    ],
    closer: [
      { title: "The counterfeit succeeds by resemblance", body: "Prestige feels like perfection because it gathers signs of reach, distinction, and completion around the self." },
      { title: "Mortality is a sorting test", body: "What death necessarily removes is exposed as an external attachment, however refined its appearance." },
    ],
    distinction: ["Two meanings of completion", "True formation", "Knowledge, character, and right relation become qualities of the person.", "Imagined completion", "Possessions and public position enlarge the self's image while remaining external and temporary."],
    misreading: "Do not turn this ordering into contempt for perfectly lawful outward things. The mistake is treating them as the finished article.",
    reflection: "Name one achievement whose value would survive if no title, audience, or visible symbol remained.",
    audit: ["What makes me feel complete only when witnessed?", "Which quality has actually changed my conduct?", "What will necessarily leave me?", "Which aspiration deserves more training than display?"],
    nodes: ["perfection", "image"],
    model: pair("The stable and the borrowed", "The test asks where the claimed perfection actually resides.", [["True formation", "Knowledge and character alter the knowing and acting person.", "balance"], ["Borrowed image", "Title, followers, and possessions surround the person but do not become the person.", "warning"]]),
  }),
  makeChapter({
    id: 7, shortTitle: "Useful standing and its excess", formalTitle: "What is praised and censured in love of status",
    overview: "Some measure of standing may be needed to live, teach, protect rights, or carry responsibility among people. Ghazali therefore distinguishes limited, truthful, instrumental status from limitless appetite and deception.",
    moves: [
      { title: "Name the needed function", body: "Trust and recognized competence may be required before a person can teach, adjudicate, organize, or protect a claim." },
      { title: "Limit the measure", body: "The standing should not exceed what the task actually needs or become a general demand for distinction." },
      { title: "Guard the route", body: "Deceiving people about a quality not possessed is condemned because the social effects are taken through false belief." },
      { title: "Permit truthful necessity", body: "Accurately naming a real qualification can be allowed where the responsibility would otherwise be lost or misassigned." },
    ],
    closer: [
      { title: "Instrumental does not mean harmless", body: "Being visible because you have to be still leaves the heart exposed. Permission covers what you may do; it says nothing about why you are doing it." },
      { title: "Concealment without false claim", body: "A person need not announce every fault, but concealing a fault differs from manufacturing signs of a virtue not possessed." },
    ],
    distinction: ["The boundary is purpose plus truth", "Needed recognition", "A real quality is disclosed in proportion to a defined responsibility.", "Expansive status", "Recognition is multiplied beyond need or acquired through a false image."],
    misreading: "Do not confuse humility with hiding evidence that others genuinely need to entrust a responsibility safely.",
    reflection: "For one public role, define the minimum recognition required for the work to function.",
    audit: ["What exact task needs recognition?", "What evidence is truthful and proportionate?", "Where does the appetite continue after the need is met?", "What fault am I merely concealing, and what virtue am I falsely implying?"],
    nodes: ["measure", "truth"],
    model: chain("A bounded route to useful standing", "Recognition remains a servant when every gate stays intact.", [["Real qualification", "The claimed capacity is actually present.", "support"], ["Needed responsibility", "A defined task requires trust.", "balance"], ["Proportionate disclosure", "Only enough standing is sought for the function.", "balance"], ["No independent appetite", "Recognition stops when the need stops.", "support"]]),
  }),
  makeChapter({
    id: 8, shortTitle: "Why praise tastes sweet", formalTitle: "Causes of loving praise and disliking blame",
    overview: "Ghazali gives four causes for pleasure in praise: it confirms a desired perfection, signals possession of the praiser's heart, may spread through an influential voice, and demonstrates standing over the speaker. Blame reverses these pleasures and threatens the constructed position.",
    moves: [
      { title: "Confirmation", body: "Praise can feel like evidence that a quality the self hopes to possess is real." },
      { title: "Possession of a heart", body: "The pleased person enjoys knowing that another person's inward judgment has become favorable." },
      { title: "Expected spread", body: "Praise from an influential person promises that the same image may travel into more hearts." },
      { title: "Displayed power", body: "The praise can feel like proof that the person saying it has registered your standing." },
    ],
    closer: [
      { title: "One sentence, four rewards", body: "One compliment can hand you all four at once — it settles your doubts, it feels like affection, it might travel, and it puts you above the person saying it. You get somewhere with this only once you name which of the four you were actually enjoying." },
      { title: "Why criticism feels larger than information", body: "Blame can threaten identity, relationship, future spread, and standing simultaneously, so the reaction may exceed the factual content." },
    ],
    distinction: ["Praise can inform or intoxicate", "Useful testimony", "A report supplies evidence that helps correct or continue an act.", "Reputational reward", "The report is consumed as proof, possession, spread, or superiority."],
    misreading: "Do not pretend all pleasure at appreciation is identical. Ghazali's four causes exist so the reader can diagnose the particular attachment.",
    reflection: "When praise next arrives, wait before answering and identify which of the four rewards feels strongest.",
    audit: ["Do I want confirmation, affection, spread, or rank?", "Would the same words help if said privately?", "Would I rejoice if another person received them?", "What factual information remains after the pleasure is removed?"],
    nodes: ["praise", "blame"],
    model: chain("Four rewards hidden inside praise", "Diagnosis begins by separating rewards that usually arrive together.", [["Confirmation", "I seem to possess the desired quality.", "support"], ["Possession", "This person's heart appears favorable to me.", "warning"], ["Spread", "The favorable image may travel farther.", "warning"], ["Standing", "The speech displays my influence over the praiser.", "warning"]]),
  }),
  makeChapter({
    id: 9, shortTitle: "Treating love of status", formalTitle: "The treatment of love of status",
    overview: "Treatment joins knowledge and action. Knowledge exposes the instability, anxiety, and mortality of standing. Action reduces covetous dependence on what people can grant and deliberately practices conditions in which the name is less protected.",
    moves: [
      { title: "See impermanence", body: "A position held in other hearts can change quickly and cannot accompany the person beyond death." },
      { title: "Count present anxiety", body: "Status is not only a future loss. Preserving it creates present fear, compromise, monitoring, and rivalry." },
      { title: "Cut material leverage", body: "Contentment with one's lawful share reduces the need to control the people who possess opportunities and resources." },
      { title: "Practice anonymity", body: "Measured acts that surrender special recognition teach the heart that useful action can survive ordinary treatment." },
    ],
    closer: [
      { title: "Knowledge needs exposure", body: "Understanding impermanence may remain abstract until the person actually experiences being overlooked, corrected, or treated as ordinary." },
      { title: "Odd behavior is not the cure", body: "Some inherited examples use deliberate lowering of public estimation. Their principle is training against image possession, not seeking blame through harmful or prohibited conduct." },
    ],
    distinction: ["Two kinds of lowering", "Corrective anonymity", "Recognition is reduced through lawful, harmless practice while responsibility remains.", "Manufactured disgrace", "A person pursues harmful conduct or abandons duty merely to destroy an image."],
    misreading: "Do not imitate startling historical training examples without considering law, harm, context, and qualified guidance.",
    reflection: "Choose one role in which you can let another capable person be centered without withdrawing your help.",
    audit: ["What maintenance does my standing demand?", "Which desire gives people leverage over me?", "What harmless ordinary treatment can I accept?", "What duty must remain visible despite the training?"],
    nodes: ["treatment", "anonymity"],
    model: chain("Knowledge and action meet", "The attachment weakens when its promise is exposed and its habits are contradicted.", [["See the end", "Standing changes and finally leaves.", "support"], ["Count the present cost", "Fear and image management already consume life.", "warning"], ["Reduce dependence", "Contentment narrows the rewards people can control.", "balance"], ["Practice ordinary service", "Action continues without special recognition.", "balance"]]),
  }),
  makeChapter({
    id: 10, shortTitle: "Treating love of praise", formalTitle: "The treatment of love of praise",
    overview: "Praise is treated by returning judgment to its proper source, testing whether the praised quality is real, and refusing to treat favorable speech as security. If the quality is absent, praise is dangerous misinformation. If present, it remains vulnerable to loss and mixed intention.",
    moves: [
      { title: "Ask whether it is true", body: "If the praised quality is not present, pleasure rests on error and should produce concern rather than confidence." },
      { title: "Ask whether it endures", body: "A real quality can weaken, become corrupted by self-admiration, or fail before completion, so present praise does not guarantee an ending." },
      { title: "Ask who truly knows", body: "People see fragments and appearances, while hidden motive and final outcome are not secured by their judgment." },
      { title: "Use the information", body: "Keep whatever evidence helps preserve a good act, and release the reputational intoxication attached to the report." },
    ],
    closer: [
      { title: "False praise is not a gift", body: "Enjoying praise for something you do not actually have pushes you further from the truth about yourself, because what people believe about you starts standing in for the work of becoming it." },
      { title: "True praise is still incomplete", body: "Somebody can be entirely right about a quality you visibly have and still know nothing about why you did it, whether it was accepted, whether you will keep it up, or how you will end." },
    ],
    distinction: ["A compliment contains two possible things", "Evidence", "Specific information can help preserve or improve a real good.", "Verdict", "Favorable speech is treated as proof of worth, sincerity, or secure outcome."],
    misreading: "Do not respond by performing self-contempt. The treatment is truthful proportion, not a new display of humility.",
    reflection: "Reduce a recent compliment to the smallest factual observation it may contain, then discard every larger verdict.",
    audit: ["Is the praised quality actually present?", "What hidden condition remains unknown?", "How could the quality be protected or improved?", "What part of the pleasure depends on being seen as exceptional?"],
    nodes: ["praise-treatment", "truth-test"],
    model: chain("Pass praise through three questions", "Useful evidence survives after false security is removed.", [["Is it true?", "Separate real quality from mistaken image.", "support"], ["Will it endure?", "Present possession does not guarantee completion.", "balance"], ["What remains unknown?", "Motive and final outcome exceed the observer's view.", "warning"], ["Use the evidence", "Translate the report into correction or continued service.", "balance"]]),
  }),
  makeChapter({
    id: 11, shortTitle: "Treating fear of criticism", formalTitle: "The treatment of dislike of blame",
    overview: "Ghazali distinguishes criticism that is true and well intended, true and hostile, or false. Each requires a different response. The first offers correction, the second still exposes a real fault, and the third becomes a test of patience rather than proof.",
    moves: [
      { title: "True and advising", body: "Take the correction as a favour: they are right, and they meant well by telling you." },
      { title: "True and hostile", body: "Reject the malice without rejecting the fact. An enemy may still reveal what a friend avoided saying." },
      { title: "False accusation", body: "Do not make another person's error into an inward verdict. Respond according to justice, harm, and patience rather than wounded status alone." },
      { title: "Thank the disclosure", body: "A fault seen before death can still be treated; the exposure of what is real may therefore carry a benefit despite pain." },
    ],
    closer: [
      { title: "Separate content from carrier", body: "Hostility can contaminate how criticism is delivered without making every factual claim false." },
      { title: "False blame can still reveal attachment", body: "Even when the accusation is wrong, the scale of distress may show how strongly a spotless public image is being possessed." },
    ],
    distinction: ["Criticism asks two questions", "Truth of content", "Is the stated fault actually present and specific enough to examine?", "Intent and method", "Is the speaker advising, attacking, distorting, or preventing harm?"],
    misreading: "Do not use spiritual patience to excuse abuse, silence necessary correction of false claims, or neglect protection from real harm.",
    reflection: "Take one criticism and write two separate lines: what may be true, and what may be wrong in its intent or delivery.",
    audit: ["Is the criticism factually specific?", "What can be corrected even if the speaker is hostile?", "What false claim requires a just response?", "Is my pain about harm or loss of image?"],
    nodes: ["criticism", "correction"],
    model: chain("Three chambers of criticism", "Content and intent must be separated before response.", [["True and advising", "Receive help and act on the fault.", "balance"], ["True and hostile", "Reject malice, keep the fact.", "warning"], ["False", "Protect justice without accepting the false verdict.", "support"]]),
  }),
  makeChapter({
    id: 12, shortTitle: "Four states before praise and blame", formalTitle: "Four states of people in relation to praise and blame",
    overview: "The first part closes with four states. A person may be governed outwardly and inwardly, restrained outwardly while still affected inside, equal toward praise and blame, or so reversed that praise is feared as trial and criticism welcomed as correction. Ghazali sets a realistic intermediate aim for ordinary readers.",
    moves: [
      { title: "Governed outside and inside", body: "Praise energizes and blame stops the person, while the heart openly wants the audience's favorable judgment." },
      { title: "Restrained outside, moved inside", body: "Conduct remains steadier, but pleasure and pain still reveal dependence in the heart." },
      { title: "Equal response", body: "Praise and blame no longer decide what you do, and no longer unsettle you much inside." },
      { title: "Reversed concern", body: "Praise is feared as a trial, while true criticism is valued for revealing what still needs repair." },
    ],
    closer: [
      { title: "A realistic horizon", body: "The text does not encourage easy claims to the highest state. It indicates that people like the author and reader may realistically work toward outward steadiness while continuing inward treatment." },
      { title: "Equality is not indifference to truth", body: "Freedom from praise and blame does not mean refusing evidence. It means social flavor no longer determines whether useful information is received." },
    ],
    distinction: ["Steadiness has two layers", "Outward steadiness", "The act does not start, stop, or distort under social response.", "Inward freedom", "Pleasure and pain no longer possess the heart even before conduct is considered."],
    misreading: "Do not claim the highest state because you remained outwardly calm once. The chapter distinguishes behavior from inward movement.",
    reflection: "Place yourself on the outward and the inward separately, rather than picking whichever single description flatters most.",
    audit: ["Does praise change my action?", "Does criticism change it?", "What happens inwardly while conduct stays stable?", "Can I receive truth without needing its social flavor?"],
    nodes: ["four-states", "steadiness"],
    model: chain("A four-stage horizon", "The sequence moves from social rule toward freedom and useful correction.", [["Governed", "Audience controls action and heart.", "warning"], ["Outwardly steady", "Action stabilizes while the heart still moves.", "support"], ["Equal", "Praise and blame lose governing force.", "balance"], ["Reversed concern", "Praise is feared as trial and true criticism used as medicine.", "balance"]]),
  }),
  makeChapter({
    id: 13, shortTitle: "What ostentation is", formalTitle: "The censure and reality of ostentation",
    overview: "Part Two defines ostentation as seeking status in people's hearts through acts of worship. The act may retain its religious appearance while its practical audience and expected reward shift toward human notice.",
    moves: [
      { title: "Keep the outward act fixed", body: "The diagnosis begins with a deed that appears devotional or morally serious." },
      { title: "Locate the human audience", body: "The person wants observers to form a favorable belief about devotion, restraint, knowledge, or character." },
      { title: "Name the sought return", body: "That belief is expected to yield esteem, access, trust, protection, service, or another social benefit." },
      { title: "Judge with precision", body: "Legal and moral detail varies by act, intention, and purpose, so the app maps the structure without pronouncing on a reader's sincerity." },
    ],
    closer: [
      { title: "Why worship matters", body: "Using an act that belongs to devotion as currency for human hearts joins sacred appearance to worldly acquisition." },
      { title: "Public is not identical to ostentatious", body: "An act being seen supplies a condition, not a complete diagnosis. Intention and purpose remain essential." },
    ],
    distinction: ["Visibility and ostentation are not synonyms", "Public act", "Other people can see the deed, perhaps for a sound reason.", "Ostentatious act", "Their favorable belief and its social return govern the deed."],
    misreading: "Do not use the definition to make confident judgments about another person's hidden motive.",
    reflection: "For one visible good act, name the human belief it could purchase and the reward that belief could return.",
    audit: ["What would observers conclude about me?", "What return could that conclusion produce?", "Would the act remain without that return?", "What sound reason, if any, requires visibility?"],
    nodes: ["ostentation", "human-audience"],
    model: chain("The transaction hidden inside display", "The outward act becomes a route to a position in human hearts.", [["Devotional appearance", "A good act is visible.", "support"], ["Favorable belief", "Observers attribute religious excellence.", "warning"], ["Status", "A position forms in their hearts.", "warning"], ["Social return", "Praise, access, trust, or service follows.", "warning"]]),
  }),
  makeChapter({
    id: 14, shortTitle: "Five forms of display", formalTitle: "The five outward forms through which display occurs",
    overview: "Ghazali groups the vehicles of display into five: body and appearance, attire and presentation, speech, action, and associates or visitors. The taxonomy widens diagnosis beyond obviously public ritual.",
    moves: [
      { title: "Body", body: "Physical appearance can be arranged to imply fasting, night worship, grief, austerity, or intense religious labor." },
      { title: "Attire and speech", body: "Clothing, vocabulary, tone, remembered reports, and public counsel can be shaped to signal a desired religious identity." },
      { title: "Action", body: "Praying, reciting, giving, helping, keeping your composure — any of them can be quietly adjusted when somebody is watching: done slower, done more completely, or done where it will be seen." },
      { title: "Associates", body: "Visitors, teachers, students, companions, and prestigious relationships can be displayed as borrowed evidence of rank." },
    ],
    closer: [
      { title: "A taxonomy of vehicles", body: "The five forms identify where display travels. They do not make every austere body, garment, eloquent statement, careful act, or respected relationship blameworthy." },
      { title: "Signals can outrun reality", body: "A visible sign is especially tempting because observers may infer an entire hidden life from a small outward cue." },
    ],
    distinction: ["A sign can inform or impersonate", "Truthful sign", "Appearance corresponds to a real state and is present for a fitting reason.", "Performed sign", "The cue is selected or intensified so observers infer a rank the reality does not support."],
    misreading: "Do not police ordinary clothing, bodies, vocabulary, or companionship by appearance alone. The five forms are diagnostic locations, not verdicts.",
    reflection: "Choose one of the five forms and notice which conclusion you most want observers to draw from it.",
    audit: ["Which bodily signal do I manage?", "What does my presentation imply?", "How does an audience change my speech or action?", "Whose presence do I use as borrowed credibility?"],
    nodes: ["five-forms", "signals"],
    model: chain("Five visible carriers", "Any one carrier can transmit a larger claimed identity.", [["Body", "Appearance implies an inward state.", "support"], ["Attire", "Presentation locates the person socially and spiritually.", "support"], ["Speech", "Language displays knowledge or concern.", "support"], ["Action", "Performance displays devotion or service.", "support"], ["Associates", "Company lends borrowed standing.", "support"]]),
  }),
  makeChapter({
    id: 15, shortTitle: "Degrees of mixed motive", formalTitle: "Degrees of ostentation by intention, act, and sought purpose",
    overview: "The text analyzes degree through three pillars: the intention, the act displayed, and the worldly purpose sought. Within intention it distinguishes audience as the sole initiator, a weak devotional motive, equal motives, and a sincere motive that is strengthened by being seen.",
    moves: [
      { title: "Inspect the initiator", body: "Ask whether the act would begin at all without observers, or whether a sincere purpose already had enough force to start it." },
      { title: "Inspect the displayed object", body: "Display may attach to the root act, to its qualities and completions, or to external additions that make it more visible." },
      { title: "Inspect the sought purpose", body: "The social return may enable wrongdoing, secure a permissible worldly benefit, or simply prevent being seen as ordinary or negligent." },
      { title: "Keep combinations visible", body: "The three pillars can combine in many ways, so one label should not erase the difference between initiation, enhancement, and later pleasure." },
    ],
    closer: [
      { title: "Four strengths of intention", body: "Audience may be everything, stronger than devotion, equal to it, or only an added strengthening of an already sufficient sincere motive." },
      { title: "Why the object matters", body: "A motive attached to beginning the root act is not identical to one attached to length, polish, public placement, or an optional completion." },
    ],
    distinction: ["Mixed motive is not one undivided state", "Initiating motive", "What is strong enough to bring the act into existence.", "Strengthening motive", "What increases, beautifies, extends, or publicizes an act that already had another cause."],
    misreading: "Do not turn this map into arithmetic certainty about reward or legal validity. It is a framework for careful reading and self-observation.",
    reflection: "Replay one act and separate what began it, what improved it, and what reward you imagined.",
    audit: ["Would the act start alone?", "What changes in quality when seen?", "What worldly result is expected?", "Which optional addition exists mainly for notice?"],
    nodes: ["degrees", "mixed-motive"],
    model: chain("Three pillars of degree", "A precise diagnosis keeps cause, object, and reward separate.", [["Intention", "What force initiates or strengthens the act?", "balance"], ["Displayed object", "Root act, quality, or external addition?", "support"], ["Sought purpose", "What human return is expected?", "warning"]]),
  }),
  makeChapter({
    id: 16, shortTitle: "The hidden traces", formalTitle: "Hidden ostentation and pleasure at disclosure",
    overview: "Ostentation can remain after obvious performance has been removed. An audience may make the act easier, disclosure may feel sweet afterward, or hidden work may create an expectation of special treatment even when no one knows its source.",
    moves: [
      { title: "Direct initiation", body: "The clearest trace is an act that would not occur without an observer." },
      { title: "Audience as energy", body: "A person may act alone yet become noticeably quicker, longer, or more careful when someone appears." },
      { title: "Pleasure at disclosure", body: "The act may remain unchanged while later discovery produces a pleasure that reveals appetite for favorable belief." },
      { title: "Expected treatment", body: "A hidden deed may still create an inward claim to respect, service, greeting, priority, or tolerance from people who do not even know it." },
    ],
    closer: [
      { title: "Four sound reasons for joy", body: "Ghazali also describes joy in God's concealment and disclosure, hope of similar mercy later, hope that others imitate good, and joy at righteous affection. The last is tested by equal happiness when another person receives the praise." },
      { title: "A deed can remain private while the claim becomes public", body: "No disclosure is required for the heart to feel entitled to a social return. Expectation itself can expose the hidden bargain." },
    ],
    distinction: ["Joy at disclosure needs a cause", "Hopeful joy", "The person sees concealment, mercy, or useful imitation without demanding to be centered.", "Reputational joy", "Disclosure tastes sweet because the person's standing rises or a social claim seems earned."],
    misreading: "Do not treat every uninvited pleasure or passing thought as an accepted intention. The text distinguishes occurrence from assent and resolve.",
    reflection: "After a hidden good, observe whether ordinary treatment begins to feel like underpayment.",
    audit: ["Does being seen supply energy?", "Do I imagine later disclosure?", "What special treatment do I expect?", "Would another person's praise make me equally glad?"],
    nodes: ["hidden-riya", "entitlement"],
    model: chain("How display retreats inward", "Removing the obvious audience does not end every social claim.", [["Act changes when seen", "Visibility supplies energy or polish.", "warning"], ["Disclosure tastes sweet", "Later knowledge becomes a reward.", "warning"], ["Special treatment is expected", "Hidden work creates an inward social debt.", "warning"], ["Motive is examined", "The exact cause of joy or expectation is named.", "balance"]]),
  }),
  makeChapter({
    id: 17, shortTitle: "What affects an act", formalTitle: "What nullifies an act and what does not",
    overview: "Ghazali examines when an audience motive is present, whether it changes or continues the act, and whether later pleasure was deliberately pursued. The analysis is detailed and belongs with the complete legal and theological discussion, not a simple app score.",
    moves: [
      { title: "Before the act", body: "A motive that determines whether the act begins must be distinguished from a thought that arrives without acceptance." },
      { title: "During the act", body: "If the audience changes continuation, quality, length, or effort, the new motive has entered the living structure of the deed." },
      { title: "After the act", body: "Simple pleasure at accidental disclosure does not automatically rewrite an originally sincere act, though it can expose a condition needing treatment." },
      { title: "Seek qualified detail", body: "Questions of invalidation, reward, and legal effect require the full source and qualified scholarship. The reader can still observe timing and influence responsibly." },
    ],
    closer: [
      { title: "Timing prevents collapse", body: "Initiation, continuation, and aftermath are morally connected but not identical. A later feeling should not be casually projected backward as the sole cause." },
      { title: "Influence matters", body: "The central practical question is whether the thought was welcomed, resolved upon, or allowed to alter the act." },
    ],
    distinction: ["An inward event can occur at two levels", "Unwanted occurrence", "A thought or pleasure appears without being chosen as the deed's purpose.", "Accepted influence", "The thought is welcomed, resolved upon, or allowed to determine the deed."],
    misreading: "Do not use this summary to issue rulings on validity, reward, or another person's act.",
    reflection: "For one act, draw a timeline and mark what was present before, what changed during, and what arose afterward.",
    audit: ["What initiated the act?", "What changed when an audience appeared?", "Was the thought accepted or resisted?", "What expert question remains beyond self-observation?"],
    nodes: ["act-effect", "timeline"],
    model: chain("A deed has a timeline", "Motive must be located before its influence can be understood.", [["Before", "What is sufficient to begin?", "support"], ["During", "What alters continuation or quality?", "warning"], ["After", "What pleasure or claim appears later?", "support"], ["Judgment", "Legal and theological detail requires qualified reading.", "balance"]]),
  }),
  makeChapter({
    id: 18, shortTitle: "Two stages of treatment", formalTitle: "The treatment of ostentation",
    overview: "Treatment has two stages. First, uproot the deeper love of praise, fear of criticism, and desire for what people possess. Second, repel the live sequence through which a passing awareness becomes pleasure, desire, and resolve.",
    moves: [
      { title: "Uproot the roots", body: "Knowledge exposes the cost of human judgment, while concealed practice weakens dependence on its reward." },
      { title: "Notice the sequence", body: "An audience is noticed, desire for its response appears, pleasure follows, and resolve may then redirect the act." },
      { title: "Interrupt before resolve", body: "The person answers the suggestion with dislike and refusal rather than treating its mere arrival as defeat." },
      { title: "Remain watchful", body: "Trusting God and staying wary of a temptation that keeps coming back are not in tension. Watching for it is one of the means of protection, not a failure to rely." },
    ],
    closer: [
      { title: "Roots and moments", body: "Long-term attachment makes the temptation attractive, while moment-to-moment vigilance determines whether the attraction governs a particular act." },
      { title: "Resistance is not hypocrisy", body: "The presence of a resisted thought can be evidence of struggle, not proof that the rejected motive already owns the deed." },
    ],
    distinction: ["Treatment works at two scales", "Root treatment", "Praise, blame, greed, and imagined dependence are retrained across life.", "Moment treatment", "A present suggestion is noticed and refused before it becomes governing resolve."],
    misreading: "Do not wait for every social feeling to disappear before acting. Treatment includes continuing good while resisting the intrusive motive.",
    reflection: "During the next visible act, name the first moment attention turns from the purpose toward the audience.",
    audit: ["Which root makes praise valuable?", "What is the first cue in the sequence?", "Where can I interrupt it?", "What concealed practice will weaken the root?"],
    nodes: ["cure", "vigilance"],
    model: chain("From suggestion to resolve", "Vigilance creates more than one place to intervene.", [["Awareness", "An audience or possible judgment is noticed.", "support"], ["Attraction", "Pleasure and desire begin to form.", "warning"], ["Resolve", "The deed is redirected toward the social reward.", "warning"], ["Refusal", "The suggestion is disliked and denied authority.", "balance"]]),
  }),
  makeChapter({
    id: 19, shortTitle: "When public good is permitted", formalTitle: "Permission to display good acts",
    overview: "A good act may be shown when there is a real likelihood that others will imitate it and the person can monitor the heart. Public disclosure after completion can be even more dangerous because speech is easy and exaggeration tempting.",
    moves: [
      { title: "Require a public benefit", body: "Visibility needs more than a vague hope. There should be a plausible educational or encouraging effect that cannot be reached as well another way." },
      { title: "Test personal capacity", body: "The person must be able to notice and resist the appetite for distinction rather than assuming a good outcome purifies every motive." },
      { title: "Prefer safer routes", body: "When imitation does not require identity, the example can often be shared without centering the actor." },
      { title: "Guard later narration", body: "Telling people about completed acts creates a fresh performance with its own temptations, even if the original deed was concealed." },
    ],
    closer: [
      { title: "Public benefit and private risk coexist", body: "The chapter does not demand a fantasy of zero exposure. It weighs likely benefit against a danger the person must continue monitoring." },
      { title: "Speech can reopen the act", body: "A concealed deed may later become material for self-display through selective detail, embellishment, or repeated retelling." },
    ],
    distinction: ["Two reasons to show", "Example for benefit", "Visibility is proportionate to a likely good for others and the actor remains watchful.", "Self as exhibit", "The audience's conclusion about the actor becomes the main product."],
    misreading: "Do not use possible inspiration as a universal excuse for publicizing every private act.",
    reflection: "Before sharing a good deed, write the specific benefit, the intended audience, and the reason your identity must be attached.",
    audit: ["Who is likely to imitate?", "Must they know it was me?", "What safer route exists?", "Am I narrating more than the benefit requires?"],
    nodes: ["public-good", "example"],
    model: chain("Four gates before disclosure", "A good public effect does not remove the need for inward caution.", [["Likely benefit", "A real audience can learn or imitate.", "support"], ["Identity needed", "The actor must be named for the benefit to work.", "support"], ["Heart monitored", "Praise and status are actively resisted.", "balance"], ["Speech limited", "No extra narration is added after the need ends.", "balance"]]),
  }),
  makeChapter({
    id: 20, shortTitle: "Concealing faults without performing virtue", formalTitle: "Permission to conceal sins and faults",
    overview: "Concealing a fault is not automatically ostentation. Valid motives include respecting God's concealment, avoiding the spread of wrongdoing, shame, and preventing a bad example. The boundary is crossed when concealment becomes active manufacture of a false pious identity.",
    moves: [
      { title: "Honor concealment", body: "A person need not make private sin into public identity, especially where disclosure would spread harm without repairing a right." },
      { title: "Protect others", body: "Keeping it quiet can stop the thing becoming ordinary, stop others copying it, stop a scandal, and spare people who had nothing to do with it." },
      { title: "Repair what requires repair", body: "Keeping a fault private does not cancel anything else you owe: you still repent, still pay back what you took, still answer for it, and still tell anyone whose rights or safety depend on knowing." },
      { title: "Do not fabricate virtue", body: "Remaining silent about a fault differs from arranging signs that positively persuade people of a piety one does not possess." },
    ],
    closer: [
      { title: "Privacy is not image fraud", body: "The chapter protects a field for repentance and restraint without converting every non-disclosure into a claim of perfection." },
      { title: "Rights set limits", body: "A secret cannot be protected by transferring harm to others or withholding information they genuinely need for justice and safety." },
    ],
    distinction: ["Silence differs from impersonation", "Concealment", "The fault is not broadcast while duties of repair remain active.", "False pious image", "Additional signals are produced so people infer a virtue contrary to reality."],
    misreading: "Do not use concealment to hide abuse, evade restitution, defeat safeguarding, or silence people whose rights were harmed.",
    reflection: "For one concealed fault, separate privacy, required repair, and any positive image you are tempted to manufacture.",
    audit: ["Whom could disclosure harm or help?", "What right requires repair?", "Am I merely silent or actively implying virtue?", "Who is qualified to advise on necessary disclosure?"],
    nodes: ["concealment", "false-image"],
    model: pair("Privacy and performance", "The line is drawn by rights, repair, and whether a false virtue is actively produced.", [["Conceal while repairing", "Do not spread the fault, but fulfill repentance, rights, and protection.", "balance"], ["Manufacture a pious image", "Use signs of virtue to collect trust that reality does not justify.", "warning"]]),
  }),
  makeChapter({
    id: 21, shortTitle: "Do not abandon good from fear", formalTitle: "Abandoning acts for fear of ostentation and zeal awakened by others",
    overview: "Stopping a good act merely because people might accuse one of display allows the audience to govern by criticism instead of praise. The text also distinguishes artificial performance from genuine zeal that awakens when seeing others engaged in good.",
    moves: [
      { title: "Keep the duty", body: "If an act is sound and required or beneficial, the possibility of social suspicion is not itself a reason to abandon it." },
      { title: "Treat the motive", body: "Continue the good while resisting the desire for praise rather than granting that desire power to cancel the act." },
      { title: "Examine awakened zeal", body: "Seeing others can remind, encourage, and activate a sincere capacity that was dormant rather than manufacture a false purpose." },
      { title: "Test what remains", body: "After the audience leaves, observe whether the awakened effort continues in some fitting form." },
    ],
    closer: [
      { title: "Audience rule has two faces", body: "Performing for praise and abandoning good from fear of accusation both let human judgment decide the act." },
      { title: "Company can be medicine", body: "Human beings gain energy from shared practice. The increase should be examined, not automatically condemned as hypocrisy." },
    ],
    distinction: ["An audience can cause two different increases", "Awakened zeal", "Seeing good reminds and strengthens a purpose the person accepts as true.", "Performed zeal", "Energy rises mainly because observers will attribute excellence to the person."],
    misreading: "Do not use this permission to stop examining motive. The instruction is to continue good and treat the heart together.",
    reflection: "When company strengthens an act, repeat a fitting part of it later in private and compare the quality.",
    audit: ["Am I stopping because the act is wrong or because I fear a label?", "What sincere purpose did company awaken?", "What remains later in private?", "How can I continue without centering myself?"],
    nodes: ["continue-good", "awakened-zeal"],
    model: chain("Do not hand the audience the decision", "Praise and accusation are both removed from the governing seat.", [["Good act", "A sound purpose and form are established.", "support"], ["Audience pressure", "Praise or suspicion enters awareness.", "warning"], ["Motive treated", "Display is resisted without abandoning the good.", "balance"], ["Private continuation", "The purpose survives beyond the social moment.", "balance"]]),
  }),
  makeChapter({
    id: 22, shortTitle: "Before, during, and after", formalTitle: "What the disciple keeps in heart before, during, and after action",
    overview: "The book closes by carrying vigilance across the whole life of an act. Before it begins, the person seeks contentment with God's knowledge. During it, especially when difficult, motive is watched. Afterward, disclosure is avoided and hidden claims to praise or special treatment are examined.",
    moves: [
      { title: "Before", body: "Establish why the act should exist and practice being content that God knows it even if no human witness does." },
      { title: "During", body: "Watch for the audience changing energy, pace, completion, beauty, or the imagined reward of the act." },
      { title: "After", body: "Do not reopen the deed through unnecessary disclosure, narrative embellishment, or expectation that people should somehow repay it." },
      { title: "Return", body: "If a hidden trace appears, treat it with renewed intention and humility rather than either self-certification or despair." },
    ],
    closer: [
      { title: "The act is longer than its performance", body: "Preparation and aftermath belong to moral vigilance because motive can enter before the first movement or after the outward deed has ended." },
      { title: "Contentment is the center", body: "The practical anchor is sufficiency in divine knowledge: the act already has its true witness and does not need a second completion through human notice." },
    ],
    distinction: ["Vigilance differs from self-absorption", "Attentive return", "Notice motive, renew purpose, and continue the fitting act.", "Paralyzing inspection", "Repeated inward checking becomes a reason to abandon good or claim certainty about sincerity."],
    misreading: "Do not turn vigilance into obsessive self-verdicts. The closing practice is repeated return, not absolute certainty about the hidden heart.",
    reflection: "Choose one recurring act and write one sentence for its purpose before, one cue to watch during, and one form of silence after.",
    audit: ["Why should this begin?", "What changes when seen?", "What do I want people to know afterward?", "What simple return restores the purpose?"],
    nodes: ["before-during-after", "return"],
    model: chain("One act through three times", "Vigilance surrounds the deed without replacing it.", [["Before", "Purpose is named and divine knowledge is enough.", "support"], ["During", "Audience effects are noticed and refused authority.", "balance"], ["After", "Disclosure and social claims are restrained.", "balance"], ["Return", "Hidden traces prompt renewal rather than despair.", "support"]]),
  }),
];

export const book28ConceptNodes: ConceptNode[] = [
  ["fame", "Fame", "A name becomes a reward", "Recognition begins governing which good acts feel worthwhile."],
  ["obscurity", "Obscurity", "Safety from the audience", "Reduced visibility can return action to its purpose without cancelling duty."],
  ["status", "Status", "A place in human hearts", "Belief in excellence produces praise, access, service, and deference."],
  ["hearts", "Borrowed hearts", "The unstable storehouse", "Standing is distributed across judgments the person cannot finally own."],
  ["perfection", "True perfection", "Formation rather than image", "Knowledge and character alter the person instead of surrounding the person with signs."],
  ["praise", "Praise", "Four rewards in one sentence", "Confirmation, possession, spread, and standing may arrive together."],
  ["criticism", "Criticism", "Information plus social pain", "Truth and intent must be separated before response."],
  ["steadiness", "Steadiness", "Action survives the audience", "Praise and blame lose the power to begin, stop, or distort the deed."],
  ["ostentation", "Ostentation", "Worship used for position", "A devotional appearance becomes a route to favorable human belief and its return."],
  ["five-forms", "Five forms", "Where display travels", "Body, attire, speech, action, and associates can all carry a performed identity."],
  ["degrees", "Degrees", "Cause, object, purpose", "Mixed motive is examined through what initiates, what is displayed, and what is sought."],
  ["hidden-riya", "Hidden traces", "The audience moves inward", "Energy, later pleasure, and expected treatment can remain after obvious performance disappears."],
  ["timeline", "The act's timeline", "Before, during, after", "Motive is located in time before its influence can be understood."],
  ["cure", "Two-stage cure", "Roots and live suggestions", "Long attachments are uprooted while present temptation is interrupted before resolve."],
  ["public-good", "Public example", "Visibility for real benefit", "A likely good for others can justify measured display under continuing vigilance."],
  ["concealment", "Concealment", "Privacy with repair", "A fault may remain unbroadcast while rights, repentance, and protection remain active."],
  ["continue-good", "Continue the good", "Do not obey suspicion", "Fear of being called ostentatious should not itself govern a sound act."],
  ["before-during-after", "Whole-act vigilance", "Purpose through aftermath", "Contentment, observation, silence, and return surround one deed."],
  ["visibility", "Visibility", "Not the fault itself", "Being known is not censured; being known becoming the reward pursued for itself is."],
  ["safety", "Safety", "What obscurity buys", "Freedom from comparison, performance, and the constant management of reputation."],
  ["definition", "The definition", "A position in hearts", "Status is belief in one's excellence held inside other people, which is where its instability comes from."],
  ["credibility", "Outward effects", "What the belief yields", "Praise, service, support, preference, and respect — the returns that make the inward belief worth holding."],
  ["leverage", "Leverage", "Why it beats wealth", "Status can generate money, feels harder to steal, and needs no guarding — an asset that appears more durable than it is."],
  ["spread", "Spread", "Reproduction through speech", "Standing multiplies through the speech of admirers, which is what makes it feel self-sustaining."],
  ["image", "Imagined perfection", "Completeness borrowed", "Possessions, followers, and control over what cannot remain, standing in for qualities that actually perfect a person."],
  ["measure", "Measure", "Limited and instrumental", "Some standing is needed to live, teach, protect rights, and carry responsibility; the fault is limitlessness, not the thing."],
  ["truth", "Truthfulness", "The other bound", "Permitted standing rests on real excellence; deception is what separates it from the censured appetite."],
  ["blame", "Blame", "The four pleasures reversed", "Criticism threatens each of the four rewards praise supplies, which is why it is felt out of proportion to its content."],
  ["treatment", "Knowledge and action", "The paired cure", "Knowledge exposes the instability of standing; action reduces dependence on what people can grant."],
  ["anonymity", "Practised exposure", "Deliberate conditions", "Choosing situations where the name is less protected, so the dependence is tested rather than merely understood."],
  ["praise-treatment", "Returning the judgement", "To its proper source", "Praise is treated by asking whether the quality is real, and refusing to treat favourable speech as security."],
  ["truth-test", "Is it true?", "The fork", "If the quality is absent, praise is dangerous misinformation; if present, it remains vulnerable to loss and mixed intention."],
  ["correction", "Three kinds of criticism", "Each answered differently", "True and well meant, true and hostile, or false — offering correction, exposure of a real fault, and a test of patience."],
  ["four-states", "Four states", "The realistic aim", "Governed outwardly and inwardly; restrained outwardly only; equal to both; or reversed — with an intermediate aim set for ordinary readers."],
  ["human-audience", "The shifted audience", "The act looks the same", "Worship keeps its religious form while its practical audience and expected reward move toward human notice."],
  ["signals", "The five vehicles", "Where display travels", "Body, attire, speech, action, and associates — a taxonomy that widens diagnosis past obviously public ritual."],
  ["mixed-motive", "Mixed motive", "Four gradations", "Audience as sole initiator, a weak devotional motive, equal motives, or a sincere motive strengthened by being seen."],
  ["entitlement", "Hidden claim", "After no one saw", "Concealed work producing an expectation of special treatment, even when nobody knows its source."],
  ["act-effect", "What nullifies", "A question for jurists", "Whether an audience motive changed or continued the act, and whether later pleasure was deliberately pursued."],
  ["vigilance", "Repelling the sequence", "The second stage", "Interrupting the live chain by which a passing awareness becomes pleasure, then desire, then resolve."],
  ["example", "Imitation", "The permitting condition", "A good act may be shown where others are genuinely likely to follow it — and disclosure after the fact is the more dangerous case."],
  ["false-image", "The crossed line", "Concealment into manufacture", "Hiding a fault is not display; actively building a pious identity that does not exist is."],
  ["awakened-zeal", "Awakened zeal", "Not performance", "Energy that rises genuinely at the sight of others doing good, distinguished from energy supplied by being watched."],
  ["return", "The return", "After it is done", "Avoiding disclosure and examining the hidden claim to praise or special treatment once the act is complete."],
].map(([id, label, kicker, description], index) => ({ id, label, kicker, description, position: ["left", "right", "top", "bottom"][index % 4] }));

const node = (id: string, label: string, micro: string, summary: string, guardrail: string, chapterId: number, glyph: Journey["nodes"][number]["glyph"]): Journey["nodes"][number] => ({ id, label, micro, summary, guardrail, chapterId, glyph });

export const book28Journeys: Journey[] = [
  {
    id: "known-and-hidden", number: "01", question: "What changes when I am known?", title: "Walk from the public court to the hidden room",
    description: "Separate useful visibility from fame sought as reward, then understand why obscurity can protect ordinary sincere action.", payoff: "You can identify when recognition serves the work and when the work serves recognition.",
    image: assetUrl("assets/system/book28-fame-obscurity.jpg"), imageAlt: "A luminous white-and-gold Hijazi courtyard of many ceremonial lanterns beside a quiet study cell with one lamp, a book stand, and water bowl.", minutes: 12, color: "#bf7a35",
    nodes: [
      node("name-fame", "Name the appetite", "When circulation becomes reward", "Fame is censured when the spread of the name begins governing the work.", "Unintended renown through useful work is not the same as seeking fame.", 1, "name"),
      node("test-visibility", "Test the visibility", "Function or self-display", "Ask what concrete public benefit requires this degree of recognition.", "Public work is not automatically ostentatious.", 1, "diagnose"),
      node("enter-obscurity", "Enter obscurity", "Ordinary action without a stage", "Reduced visibility can remove comparison and image management.", "Hiddenness must not abandon a necessary duty.", 2, "clear"),
      node("define-status", "Define status", "Belief becomes social return", "Status is a position in hearts that produces praise, access, and deference.", "Trust and credibility can be genuinely needed.", 4, "know"),
      node("limit-standing", "Limit the measure", "Enough authority for the task", "Truthful, proportionate recognition can remain a means rather than a possession.", "Necessity does not certify a pure motive.", 7, "balance"),
    ],
  },
  {
    id: "borrowed-standing", number: "02", question: "Why does status feel so powerful?", title: "Study the pavilion reflected in borrowed hearts",
    description: "Trace status from attributed excellence into social power, then distinguish stable formation from an image that depends on observers.", payoff: "You see why reputation can feel richer than wealth and why it is still fragile.",
    image: assetUrl("assets/system/book28-shifting-hearts.jpg"), imageAlt: "A radiant Safavid courtyard with a pavilion visible in the rippling turquoise reflection beside a solid stone platform.", minutes: 13, color: "#278d91",
    nodes: [
      node("hold-hearts", "Locate the possession", "Standing lives in observers", "Other people's beliefs become the storehouse of status.", "The storehouse remains outside your control.", 3, "mirror"),
      node("follow-effects", "Follow its effects", "Praise, service, access", "Favorable belief produces concrete social returns.", "Every effect is not corrupt if the underlying trust is real.", 4, "leverage"),
      node("see-leverage", "See why it exceeds wealth", "One belief unlocks many means", "Status can generate opportunity, money, and multiplying praise.", "Spread is not true ownership.", 5, "forces"),
      node("sort-perfection", "Sort the two perfections", "Formation or surrounding image", "Knowledge and character form the person; prestige surrounds the person.", "External means remain usable when kept subordinate.", 6, "order"),
      node("train-anonymity", "Practice ordinary service", "Let usefulness survive equality", "Lawful anonymity tests whether the task can continue without special treatment.", "Do not manufacture disgrace or abandon duty.", 9, "practice"),
    ],
  },
  {
    id: "praise-and-blame", number: "03", question: "What is praise actually giving me?", title: "Stand at the fountain between praise and criticism",
    description: "Separate four rewards hidden inside praise, learn three responses to criticism, and locate outward steadiness apart from inward freedom.", payoff: "You can convert social response into usable information without treating it as a verdict.",
    image: assetUrl("assets/system/book28-praise-criticism.jpg"), imageAlt: "A bright Mamluk fountain court whose water channels lead toward a polished ceremonial gallery and a quiet workshop of measuring and repair.", minutes: 14, color: "#c25f50",
    nodes: [
      node("four-rewards", "Separate four rewards", "Confirmation, possession, spread, standing", "One compliment may satisfy four different appetites at once.", "Diagnosis should be specific rather than theatrical.", 8, "diagnose"),
      node("treat-status", "Count status's cost", "Impermanence and present anxiety", "Knowledge exposes the final loss and current burden of reputation.", "Knowledge needs fitting corrective practice.", 9, "remember"),
      node("treat-praise", "Reduce praise to evidence", "True, durable, incomplete", "A compliment may contain useful information but cannot secure motive or outcome.", "Truthful proportion is not performed self-contempt.", 10, "clear"),
      node("sort-criticism", "Sort criticism", "True advice, hostile truth, falsehood", "Truth and intent must be examined on separate lines.", "Patience does not require tolerating abuse or injustice.", 11, "balance"),
      node("locate-state", "Locate both layers", "Outward action and inward movement", "A calm exterior may coexist with a heart still governed by praise and blame.", "Do not claim the highest state from one calm response.", 12, "mirror"),
    ],
  },
  {
    id: "anatomy-of-display", number: "04", question: "How can a good act become performance?", title: "Read the five-bay arcade of display",
    description: "Define ostentation, inspect its five outward vehicles, and preserve the differences among intention, displayed object, sought purpose, and timing.", payoff: "You gain a precise anatomy of display without turning every public act into a verdict.",
    image: assetUrl("assets/system/book28-five-forms.jpg"), imageAlt: "A luminous Nasrid five-bay arcade displaying restrained objects for body, attire, speech, action, and associates.", minutes: 16, color: "#586fa8",
    nodes: [
      node("define-riya", "Define the transaction", "Devotion for human position", "A religious appearance becomes a route to favorable belief and social return.", "Visibility is a condition, not a complete diagnosis.", 13, "name"),
      node("scan-forms", "Scan five forms", "Body, attire, speech, action, associates", "Display can travel through far more than public ritual.", "The vehicle does not prove the motive.", 14, "attend"),
      node("map-degrees", "Map three pillars", "Intention, object, purpose", "Mixed motive becomes clearer when its parts are kept separate.", "The map is not an arithmetic verdict on reward.", 15, "pattern"),
      node("find-hidden", "Find hidden traces", "Energy, disclosure, entitlement", "The social bargain can survive after obvious performance disappears.", "A passing unwanted feeling is not accepted resolve.", 16, "witness"),
      node("place-on-timeline", "Place it on a timeline", "Before, during, after", "Timing and actual influence matter to understanding the act.", "Detailed rulings require complete sources and qualified scholarship.", 17, "order"),
    ],
  },
  {
    id: "keeping-the-act", number: "05", question: "How do I keep acting without performing?", title: "Carry one lamp through four audience chambers",
    description: "Treat deep roots and live suggestions, then decide when to show, when to conceal, when to continue, and how to watch an act before, during, and after.", payoff: "You leave with a practical vigilance that protects good action from both display and paralysis.",
    image: assetUrl("assets/system/book28-audience-chamber.jpg"), imageAlt: "Four connected luminous Ottoman rooms showing the same brass lamp alone, witnessed, ceremonially praised, and still burning after the gathering.", minutes: 17, color: "#a97837",
    nodes: [
      node("treat-sequence", "Interrupt the sequence", "Awareness, attraction, resolve", "Long-term roots and live moments need different but connected treatment.", "Resisted thoughts are not the same as governing intention.", 18, "guard"),
      node("show-for-benefit", "Show for real benefit", "Example without self as exhibit", "A likely good for others may justify proportionate visibility under vigilance.", "Possible inspiration is not a blanket excuse for disclosure.", 19, "leverage"),
      node("conceal-and-repair", "Conceal without impersonating", "Privacy, rights, truthful image", "A fault may remain private while repentance and required repair stay active.", "Concealment cannot protect abuse or defeat another person's rights.", 20, "guard"),
      node("continue-the-good", "Continue the good", "Do not obey suspicion", "Fear of being called ostentatious should not cancel a sound act.", "Continue treatment and action together.", 21, "act"),
      node("guard-whole-act", "Guard the whole act", "Before, during, after", "Purpose, observation, silence, and return surround a deed without replacing it.", "Vigilance must not become obsessive paralysis.", 22, "steady"),
    ],
  },
];

export const book28Discussions: TaxonomyGroup[] = [
  ["fame", "1. Censure of fame", "Deliberately seeking a name that spreads.", [1]],
  ["obscurity", "2. Virtue of obscurity", "The protection of reduced visibility.", [2]],
  ["status", "3. Censure of status", "Possessing a position in human hearts.", [3]],
  ["status-reality", "4. Reality of status", "Belief in excellence and its social effects.", [4]],
  ["status-love", "5. Why status is loved", "Leverage, apparent safety, and social spread.", [5]],
  ["perfection", "6. True perfection", "Stable formation and imagined completion.", [6]],
  ["status-boundary", "7. Praised and censured status", "Truth, need, proportion, and excess.", [7]],
  ["praise-causes", "8. Causes of praise and blame", "Four rewards carried by praise.", [8]],
  ["status-treatment", "9. Treatment of status", "Impermanence, contentment, and anonymity.", [9]],
  ["praise-treatment", "10. Treatment of praise", "Truth, endurance, and incomplete judgment.", [10]],
  ["blame-treatment", "11. Treatment of blame", "Advice, hostile truth, and false accusation.", [11]],
  ["four-states", "12. Four states", "Outward and inward freedom from response.", [12]],
  ["riya-reality", "13. Reality of ostentation", "Devotional appearance used for human position.", [13]],
  ["five-forms", "14. Five forms", "Body, attire, speech, action, and associates.", [14]],
  ["degrees", "15. Degrees", "Intention, displayed object, and sought purpose.", [15]],
  ["hidden", "16. Hidden traces", "Audience energy, disclosure, and entitlement.", [16]],
  ["act-effect", "17. Effect on an act", "Timing, influence, and limits of self-judgment.", [17]],
  ["cure", "18. Treatment", "Uprooting roots and repelling present suggestions.", [18]],
  ["public", "19. Displaying good", "Public example under continuing vigilance.", [19]],
  ["concealment", "20. Concealing faults", "Privacy, repair, and the boundary of false image.", [20]],
  ["continue", "21. Do not abandon good", "Suspicion, awakened zeal, and continuation.", [21]],
  ["whole-act", "22. Before, during, after", "Vigilance through the whole life of a deed.", [22]],
].map(([id, label, description, chapterIds], index) => ({ id, label, description, chapterIds, color: ["#bf7a35", "#278d91", "#c25f50", "#586fa8", "#a97837"][index % 5] })) as TaxonomyGroup[];

const chamberStages = (labels: Array<[AudienceChamberItem["stages"][number]["id"], string, string, string, string, string, string, number]>): AudienceChamberItem["stages"] => labels.map(([id, label, question, steady, shifted, audienceLed, repair, chapterId]) => ({ id, label, question, steady, shifted, audienceLed, repair, chapterId }));

const sharedStages = (act: string, chapters: [number, number, number, number]): AudienceChamberItem["stages"] => chamberStages([
  ["alone", "Alone", `When ${act} is entirely unseen, what happens to the willingness and care you bring?`, "The act has enough purpose to begin and receive fitting care without a human witness.", "The act continues, but energy or completion drops enough to deserve attention.", "Without witnesses the act rarely begins or is stripped of the part that made it worthwhile.", "Name the private good the act should deliver, then complete one small instance without later disclosure.", chapters[0]],
  ["seen", "Seen", `When someone enters and can see ${act}, what changes in pace, polish, length, or visibility?`, "The act stays proportionate; the observer neither supplies its purpose nor distorts its form.", "A noticeable improvement appears, though the original purpose remains active.", "The audience becomes the main source of energy, completion, or display.", "Return the act to the measure the purpose required one minute before the observer arrived.", chapters[1]],
  ["praised", "Praised", `When ${act} is praised, what reward does the praise add and what do you want to happen next?`, "Useful information is kept while the need for confirmation, spread, or rank is released.", "Pleasure lingers and creates a mild wish for the favorable image to continue.", "Praise becomes a needed wage, and future choices are shaped to earn it again.", "Identify which of the four rewards is active, then translate the praise into one concrete correction or gratitude.", chapters[2]],
  ["overlooked", "Overlooked", `When another person receives credit for ${act}, or it passes without notice, what remains?`, "The benefit itself remains satisfying and another person's credit does not cancel participation.", "Disappointment appears but the act and relationship remain intact.", "The act stops, resentment grows, or the benefit feels stolen because the self was not centered.", "Repeat the service in a form where another capable person is visibly centered and you remain useful.", chapters[3]],
]);

export const book28AudienceChamber: AudienceChamberItem[] = [
  { id: "charity", label: "Charity", scenario: "Giving money or material help", privatePurpose: "Relieve a real need, fulfill a right, or create benefit without making the receiver carry your image.", stages: sharedStages("the gift", [13, 16, 8, 22]) },
  { id: "teaching", label: "Teaching", scenario: "Explaining something beneficial", privatePurpose: "Make truth understandable and usable for the learner, whether or not the explanation becomes associated with your name.", stages: sharedStages("the teaching", [1, 14, 10, 19]) },
  { id: "worship", label: "Worship", scenario: "A voluntary devotional act", privatePurpose: "Direct the act to God with a fitting form and without turning devotional appearance into a claim on people.", stages: sharedStages("the act of worship", [13, 15, 17, 18]) },
  { id: "service", label: "Service", scenario: "Quiet work for a household or community", privatePurpose: "Complete a useful responsibility and preserve the dignity of those served, even when the work remains ordinary.", stages: sharedStages("the service", [2, 16, 11, 21]) },
  { id: "leadership", label: "Leadership", scenario: "Holding a visible responsibility", privatePurpose: "Use only the trust and standing required to fulfill the role truthfully, then let the responsibility pass when appropriate.", stages: sharedStages("the leadership task", [7, 4, 9, 12]) },
];

export const book28Sources: SourceLink[] = [
  { label: "Primary Arabic, Part One", note: "Public Arabic text used to verify the twelve announced discussions on fame, obscurity, status, perfection, praise, criticism, and treatment.", url: "https://ar.wikisource.org/wiki/%D8%A5%D8%AD%D9%8A%D8%A7%D8%A1_%D8%B9%D9%84%D9%88%D9%85_%D8%A7%D9%84%D8%AF%D9%8A%D9%86/%D9%83%D8%AA%D8%A7%D8%A8_%D8%B0%D9%85_%D8%A7%D9%84%D8%AC%D8%A7%D9%87_%D9%88%D8%A7%D9%84%D8%B1%D9%8A%D8%A7%D8%A1/%D8%A7%D9%84%D8%B4%D8%B7%D8%B1_%D8%A7%D9%84%D8%A3%D9%88%D9%84" },
  { label: "Primary Arabic, Part Two", note: "Public Arabic text used to verify the ten-part movement on ostentation, its forms and degrees, hidden traces, treatment, disclosure, concealment, continuation, and vigilance.", url: "https://ar.wikisource.org/wiki/%D8%A5%D8%AD%D9%8A%D8%A7%D8%A1_%D8%B9%D9%84%D9%88%D9%85_%D8%A7%D9%84%D8%AF%D9%8A%D9%86/%D9%83%D8%AA%D8%A7%D8%A8_%D8%B0%D9%85_%D8%A7%D9%84%D8%AC%D8%A7%D9%87_%D9%88%D8%A7%D9%84%D8%B1%D9%8A%D8%A7%D8%A1/%D8%A7%D9%84%D8%B4%D8%B7%D8%B1_%D8%A7%D9%84%D8%AB%D8%A7%D9%86%D9%8A" },
  { label: "Accessible English abridgment", note: "Shaykh Ahmad al-Shami's explicitly abridged English rendering was used as a cross-check for terminology and the main argumentative sequence.", url: "https://masud.co.uk/the-condemnation-of-status-and-fame/" },
  { label: "Fons Vitae edition record", note: "The publisher lists Book 28, Censure of Status and Ostentation, among forthcoming volumes. This app does not claim access to a published complete Fons Vitae English edition.", url: "https://fonsvitae.com/product/forthcoming-ghazali-series-books/" },
  { label: "Ihya bibliography", note: "Ghazali.org's book-by-book bibliography identifies Book 28 and available translation records.", url: "https://www.ghazali.org/site/ihya.htm" },
];

export const book28: SystemBook = {
  id: 28,
  title: "The Censure of Status and Ostentation",
  shortTitle: "Status and Ostentation",
  defaultJourneyId: "known-and-hidden",
  chapters: book28Chapters,
  conceptNodes: book28ConceptNodes,
  journeys: book28Journeys,
  sources: book28Sources,
  taxonomy: {
    title: "Twenty-two source movements",
    note: "The first twelve filters preserve Part One's announced discussions. The final ten preserve Part Two's stated structure, with abandoning good and zeal awakened by company read together as one movement.",
    groups: book28Discussions,
  },
  audienceChamber: {
    title: "The audience chamber",
    note: "Carry one act through four visibility conditions and record what you actually notice. This is a private comparison aid, not a score, a verdict on sincerity, or a ruling on the act.",
    items: book28AudienceChamber,
  },
  editorialNote: "The five journeys, twenty-two reading sections, visual models, and audience chamber are editorial learning aids. The twelve plus ten sequence preserves the two source parts announced by Ghazali. The English is an original synthesis checked against the complete public Arabic text and an accessible abridged English rendering; it is not a translation and not a substitute for one. Fons Vitae currently lists its Book 28 English edition as forthcoming. Reports and inherited anecdotes are presented as material transmitted by Ghazali; this prototype does not independently grade every narration. The audience chamber cannot pronounce on sincerity, reward, or legal validity. Complex personal cases require the complete Arabic, a reliable full edition when available, and qualified scholarly guidance.",
};
