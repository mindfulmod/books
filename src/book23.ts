import { assetUrl } from "./assetUrl";
import type { Chapter, ConceptNode } from "./data";
import type { Journey, SourceLink, SystemBook } from "./systemTypes";

export const book23Chapters: Chapter[] = [
  {
    id: 1,
    shortTitle: "Why hunger enters the argument",
    formalTitle: "The merit of hunger and the condemnation of satiety",
    overview:
      "Ghazali opens with a causal diagnosis. He treats appetite for food as an early root from which other desires can gain force, then gathers religious reports and sayings to create urgency around restraining satiety. This section states the problem and its religious register before the book explains method and measure.",
    points: [
      "The target is appetite taking command, not the existence of a bodily need.",
      "Ghazali links the stomach, sexual desire, wealth, status, rivalry, and display in a proposed sequence of reinforcement.",
      "The reports are part of his argument and must not be confused with independent modern authentication of every narration.",
    ],
    reflection:
      "When one desire is repeatedly indulged, notice whether it remains isolated or begins recruiting attention, spending, comparison, and the wish to be seen.",
    relatedNodes: ["appetite", "hunger", "satiety", "desire"],
    visualModel: {
      kind: "chain",
      title: "Ghazali's proposed root sequence",
      items: [
        {
          label: "Stomach appetite",
          body: "The prologue treats the appetite for food as an early root because repeated indulgence strengthens the self's demand to be satisfied.",
          role: "warning",
        },
        {
          label: "Sexual desire",
          body: "Ghazali places sexual desire next in the sequence and later gives it a separate treatment rather than reducing it to food alone.",
          role: "warning",
        },
        {
          label: "Wealth and status",
          body: "The search for resources and standing can then become a means of securing and extending desired pleasures.",
          role: "warning",
        },
        {
          label: "Rivalry and display",
          body: "Competition, envy, ostentation, and pride appear as later social forms of a self organized around acquisition and recognition.",
          role: "warning",
        },
      ],
      caption:
        "This is Ghazali's moral and causal diagnosis in the prologue, not a claim that modern psychology has established one fixed sequence for every person.",
    },
    deep: {
      thesis:
        "Ghazali begins with the stomach because he sees ungoverned satisfaction as a training ground from which other appetites learn to rule.",
      context:
        "The prologue names food and sexual desire as the book's two subjects. It presents the stomach as a fountain of other appetites, then traces a path toward wealth, status, rivalry, envy, ostentation, and pride. Section one supports that diagnosis by assembling religious testimony about hunger and satiety.",
      moves: [
        {
          title: "Choose a strategic root",
          body:
            "Rather than catalogue every vice separately, Ghazali begins with a desire that recurs daily and can train the self to expect immediate satisfaction. The stomach becomes strategic because its discipline may weaken several connected demands.",
        },
        {
          title: "Trace reinforcement outward",
          body:
            "His sequence moves from bodily appetite to the resources and recognition that can support it. Wealth and status are not condemned in isolation here; the concern is the way they can become servants of expanding desire.",
        },
        {
          title: "Gather religious witness",
          body:
            "Section one accumulates scriptural reports and sayings that praise hunger or criticize satiety. Their role is exhortative: they give the coming discipline a religious seriousness before its benefits and methods are analyzed.",
        },
        {
          title: "Keep need distinct from rule",
          body:
            "The later sections make clear that food remains necessary and that practice must differ by person and condition. The opening severity is aimed at appetite's domination, not at denying creaturely dependence on nourishment.",
        },
      ],
      distinction: {
        title: "Reporting Ghazali's witness is not authenticating every report",
        firstLabel: "What the section does",
        first:
          "It records the Qur'anic references, reports, and sayings through which Ghazali frames restraint as spiritually important.",
        secondLabel: "What this synthesis does not do",
        second:
          "It does not assign a modern hadith grade to each narration or present every transmitted wording as independently verified.",
      },
      misreading:
        "Do not turn the opening praise of hunger into the claim that bodily weakness is good in itself. Ghazali later identifies a balanced condition in which neither fullness nor hunger distracts from worship and thought.",
      observation:
        "Follow one ordinary appetite beyond the moment of consumption. What planning, comparison, spending, concealment, or self-presentation gathers around it?",
      sourceAnchor: "Book 23, prologue and section 1, the merit of hunger and condemnation of satiety.",
    },
  },
  {
    id: 2,
    shortTitle: "What hunger is meant to do",
    formalTitle: "The benefits of hunger and the evils of satiety",
    overview:
      "Ghazali lists ten benefits of hunger within his ascetic framework. He compares hunger to medicine: its value is not the unpleasant sensation itself, but the functions it may serve, including clearer attention, a softened heart, humility, compassion, reduced secondary impulses, less sleep, freer time, lighter material demands, and greater capacity to give.",
    points: [
      "Pain is not presented as the benefit; a claimed spiritual or practical effect is the point of the discipline.",
      "Several benefits form chains, such as lighter eating, reduced sleep, more time, and greater readiness for worship.",
      "Medical claims in this section belong to Ghazali's medieval physiological setting and are not modern health advice.",
    ],
    reflection:
      "Evaluate a discipline by the function it restores. Does it actually free attention, soften conduct, or release resources, or has discomfort itself become the measure of success?",
    relatedNodes: ["hunger", "attention", "compassion", "measure"],
    visualModel: {
      kind: "chain",
      title: "From restraint to redirected capacity",
      items: [
        {
          label: "Reduced satiety",
          body: "The starting intervention is less indulgent fullness, not the pursuit of pain as an independent good.",
          role: "support",
        },
        {
          label: "Lighter demands",
          body: "Ghazali connects restraint with less sleep, less time spent obtaining and preparing food, and weaker secondary impulses.",
          role: "support",
        },
        {
          label: "Freer attention",
          body: "The released capacity is meant to support remembrance, reflection, worship, humility, and awareness of people who lack food.",
          role: "balance",
        },
        {
          label: "Resources redirected",
          body: "Lower personal consumption can leave food or money available for poor people, orphans, and other forms of giving.",
          role: "support",
        },
      ],
      caption:
        "The sequence shows the function Ghazali wants restraint to serve. It does not guarantee that every form of hunger produces these outcomes.",
    },
    deep: {
      thesis:
        "Hunger is useful only insofar as it changes attention, humility, impulse, time, or generosity in a spiritually fruitful direction.",
      context:
        "Ghazali explicitly refuses to make bitterness the measure of medicine. He organizes this section as a list of ten benefits, but many of them work together: reduced satiety affects sleep and impulse, which affects time and attention, which can affect worship and giving.",
      moves: [
        {
          title: "Separate instrument from end",
          body:
            "The medicine analogy prevents a crude equation between suffering and virtue. Just as medicine is taken for an effect rather than for its taste, hunger is evaluated by what it helps the person recover or resist.",
        },
        {
          title: "Clear and soften attention",
          body:
            "Ghazali associates restraint with quickened understanding, receptivity to remembrance, humility, and the breaking of pride. These are inward effects in his spiritual account, not merely changes in diet.",
        },
        {
          title: "Interrupt connected appetites",
          body:
            "He argues that satiety can energize sexual desire, excessive speech, sleep, and other impulses. Hunger is therefore used as an intervention against a cluster of tendencies rather than one isolated behavior.",
        },
        {
          title: "Release time and material means",
          body:
            "Less concern with food can reduce the labor and expense surrounding it. Ghazali then gives that saving an ethical direction: surplus can be shared with people in need rather than becoming another private accumulation.",
        },
        {
          title: "Keep historical claims in context",
          body:
            "The section also makes claims about bodily health within medieval medicine. They help explain Ghazali's complete list, but they should not be converted into present-day clinical guidance.",
        },
      ],
      distinction: {
        title: "The bitter sensation is not the claimed benefit",
        firstLabel: "Deprivation as achievement",
        first:
          "Pain, weakness, or a severe regimen becomes a badge of success even when it produces no clearer attention, humility, worship, or generosity.",
        secondLabel: "Discipline as instrument",
        second:
          "A measured restraint is judged by the fitting function it serves and abandoned or adjusted when it defeats that function.",
      },
      misreading:
        "Do not treat a medieval list of bodily benefits as a personalized nutrition plan. The book itself later insists that people differ and that the useful measure is tied to actual condition.",
      observation:
        "When you reduce a comfort, name the capacity you expect to recover. Afterward, look for that capacity rather than counting discomfort as proof.",
      sourceAnchor: "Book 23, section 2, the ten benefits of hunger and evils of satiety.",
    },
  },
  {
    id: 3,
    shortTitle: "Four measures of food discipline",
    formalTitle: "The method by which discipline breaks the greed of the stomach",
    overview:
      "Ghazali organizes food discipline around four matters: lawful provision, quantity, timing, and type. He explicitly recommends gradual reduction for a person accustomed to eating much and describes a range of historical ascetic regimens. The governing concern is to retrain greed without confusing severity with the final aim.",
    points: [
      "Lawful provision comes before reducing quantity or delaying a meal.",
      "Quantity should be changed gradually when sudden reduction would overburden or weaken the person.",
      "Fixed amounts, intervals, and austere foods are examples from an ascetic setting, not universal schedules.",
    ],
    reflection:
      "Before intensifying a practice, ask which variable you are changing, why that variable matters, and what evidence would show that the dose is too large.",
    relatedNodes: ["lawful", "measure", "gradualism", "discipline"],
    visualModel: {
      kind: "chain",
      title: "Four questions before severity",
      items: [
        {
          label: "Source",
          body: "Is the provision lawful? Ghazali places this first, so less food cannot compensate for food obtained wrongly.",
          role: "balance",
        },
        {
          label: "Amount",
          body: "How much is taken? The text recommends gradual reduction when appetite has been trained by a larger habitual amount.",
          role: "support",
        },
        {
          label: "Timing",
          body: "How long is the interval? Ghazali records varied fasting practices, while later insisting that conditions and capacities differ.",
          role: "support",
        },
        {
          label: "Type",
          body: "How desired or refined is the food? Simplification is another lever, distinct from amount and timing.",
          role: "support",
        },
      ],
      caption:
        "The four-part method is descriptive of Ghazali's training system. It is not a self-directed severe fasting protocol.",
    },
    deep: {
      thesis:
        "Food discipline becomes intelligible when source, amount, timing, and type are treated as separate levers and adjusted with gradual judgment.",
      context:
        "This section moves from the benefits of restraint to technique. It contains demanding examples from medieval ascetic practice, but its organizing contribution is more precise: one can change what is eaten, how much, how often, and under what lawful conditions without collapsing all discipline into a single scale of harshness.",
      moves: [
        {
          title: "Begin with lawful provision",
          body:
            "Ghazali makes lawful acquisition the first duty. A reduced meal does not become spiritually sound if the means by which it was obtained are corrupt.",
        },
        {
          title: "Reduce quantity by stages",
          body:
            "For someone accustomed to eating much, he advises gradual reduction. Sudden change can produce weakness and make the discipline unsustainable, so the established habit is unwound step by step.",
        },
        {
          title: "Distinguish interval from amount",
          body:
            "Eating less at one sitting and lengthening the interval between meals are different interventions. Ghazali records varied practices rather than presenting one interval as the sole form of restraint.",
        },
        {
          title: "Simplify the desired type",
          body:
            "The attraction of refined or especially desired foods can be trained separately from raw quantity. This allows diagnosis to ask whether the ruling attachment is to fullness, frequency, or variety.",
        },
        {
          title: "Stop worshipping the regimen",
          body:
            "The examples are means toward governing appetite. The next section makes the limiting principle explicit: the intended state is balanced freedom for worship and thought, not maximal weakness.",
        },
      ],
      distinction: {
        title: "A training lever is not a universal command",
        firstLabel: "Historical regimen",
        first:
          "The text records severe quantities, intervals, and ascetic examples within a particular religious culture of discipline.",
        secondLabel: "Transferable structure",
        second:
          "The durable insight is to distinguish source, amount, timing, and type, then fit any correction to the person's real condition.",
      },
      misreading:
        "Do not reproduce the harshest historical examples as a personal challenge. This synthesis intentionally does not provide an actionable severe fasting schedule.",
      observation:
        "When desire feels vague, identify its exact object. Is it more, sooner, finer, or simply familiar? Precision changes what a proportionate correction would mean.",
      sourceAnchor: "Book 23, section 3, the four duties governing food discipline.",
    },
  },
  {
    id: 4,
    shortTitle: "The measure changes with the person",
    formalTitle: "The variance in the rule and merit of hunger according to circumstances",
    overview:
      "Ghazali states that the ultimate aim in character and action is the middle. The best condition for a balanced person is neither heaviness from fullness nor pain that makes hunger itself the center of attention. Corrective pressure may lean harder against an unruly appetite, but people and states differ, and the pressure is not the destination.",
    points: [
      "Praise of extreme hunger can serve as counter-pressure because ordinary appetite already pulls strongly toward satiety.",
      "The balanced state leaves the person free for worship and thought rather than preoccupied by either fullness or hunger.",
      "A stronger correction may be temporary when appetite is dominant, and it should ease when balance is restored.",
    ],
    reflection:
      "Ask whether the current correction still restores freedom or whether it has become a new source of fixation. The same practice can change meaning as the condition changes.",
    relatedNodes: ["moderation", "measure", "discipline", "attention"],
    visualModel: {
      kind: "spectrum",
      title: "The middle is freedom from both distractions",
      items: [
        {
          label: "Painful hunger",
          body: "If hunger itself overwhelms attention and weakens the person's fitting duties, the corrective pressure has passed the intended state.",
          role: "warning",
        },
        {
          label: "Governed middle",
          body: "Ghazali's balanced person is occupied by neither the heaviness of satiety nor the pain of hunger and can turn toward worship and thought.",
          role: "balance",
        },
        {
          label: "Heavy satiety",
          body: "Fullness can burden attention and strengthen connected appetites, so it is the ordinary extreme against which the text applies pressure.",
          role: "warning",
        },
      ],
      caption:
        "Corrective discipline may temporarily lean away from the dominant extreme, but Ghazali names the fitting middle as the intended health.",
    },
    deep: {
      thesis:
        "The right measure is the one that releases the person from domination by both satiety and hunger, and that measure changes with condition.",
      context:
        "This section qualifies the severe material that precedes it. Ghazali says that the ultimate aim in matters and character is the middle. He compares it to the center of a heated ring, the point farthest from the surrounding fire, while recognizing that a person pulled toward one side may need corrective pressure from the other.",
      moves: [
        {
          title: "Name the destination",
          body:
            "The destination is a balanced nature that is not made heavy by fullness and not distracted by painful hunger. Freedom for worship and thought, rather than intensity itself, identifies the desired condition.",
        },
        {
          title: "Explain severe counter-language",
          body:
            "Human appetite ordinarily inclines toward satiety. Ghazali therefore understands strong praise of hunger partly as a counterweight that pulls the learner away from an already dominant side.",
        },
        {
          title: "Use correction temporarily",
          body:
            "When appetite remains unruly, discipline can lean beyond the final mean to loosen the established pull. Once the power becomes governable, continuing the same pressure can create a different disorder.",
        },
        {
          title: "Let conditions differ",
          body:
            "People vary in body, habit, work, weakness, and strength of appetite. Ghazali therefore refuses to make a fixed quantity or interval the aim in itself.",
        },
      ],
      distinction: {
        title: "Corrective asymmetry serves a balanced end",
        firstLabel: "Temporary counter-pressure",
        first:
          "A person strongly pulled toward satiety may need a firmer reduction than a person whose appetite is already governable.",
        secondLabel: "Stable intended condition",
        second:
          "The final measure allows bodily need to be met without either fullness or hunger taking over attention and purpose.",
      },
      misreading:
        "Moderation does not mean choosing the same amount for everyone, and corrective severity does not mean that the farthest extreme is the holiest permanent state.",
      observation:
        "A practice that once restored freedom may later become an identity or fixation. Reassess the function, not only the history, of the practice.",
      sourceAnchor: "Book 23, section 4, variation by person and the fitting middle.",
    },
  },
  {
    id: 5,
    shortTitle: "When restraint feeds reputation",
    formalTitle: "Ostentation in renouncing desirable foods and eating frugally",
    overview:
      "Ghazali warns that restraint can be captured by the desire to appear restrained. One person hides continued indulgence while performing austerity in public. Another truly abstains but delights in being known for it, exchanging appetite for food for the more dangerous appetite for status.",
    points: [
      "Private indulgence paired with public austerity divides the actual state from the performed image.",
      "Real abstinence can still become corrupted when public recognition is the hidden reward.",
      "Truthfulness about one's actual condition is safer than performing a spiritual rank one has not attained.",
    ],
    reflection:
      "If no one could know about a restraint, would its meaning, intensity, or attractiveness change? The answer can reveal which appetite is being fed.",
    relatedNodes: ["intention", "reputation", "discipline", "truthfulness"],
    visualModel: {
      kind: "chain",
      title: "How appetite changes its object",
      items: [
        {
          label: "Food is desired",
          body: "The first appetite seeks a desirable food or the pleasure of fullness.",
          role: "support",
        },
        {
          label: "Restraint becomes visible",
          body: "The person discovers that eating little can itself become a public sign of discipline or spiritual rank.",
          role: "warning",
        },
        {
          label: "Recognition rewards",
          body: "Attention and admiration now provide a different pleasure, even if the original food is genuinely renounced.",
          role: "warning",
        },
        {
          label: "Status takes command",
          body: "The appetite has not disappeared. It has moved from the bowl to the audience and may now be harder to recognize.",
          role: "warning",
        },
      ],
      caption:
        "Ghazali's point is not that visible restraint is always false. It is that a real outward act can be governed by a hidden appetite for standing.",
    },
    deep: {
      thesis:
        "Restraint fails when it suppresses one appetite only to give a more hidden appetite for reputation the throne.",
      context:
        "Ghazali describes two failures. In the first, the person privately continues what is publicly renounced. In the second, the food is truly renounced but the reputation for renunciation becomes the new pleasure. His image is stark: escaping a scorpion only to land upon a snake.",
      moves: [
        {
          title: "Expose the divided performance",
          body:
            "A person may be unable to leave a desired food, conceal that desire, and cultivate an appearance of austerity before others. The fault is not merely eating; it is the split between the known state and the displayed rank.",
        },
        {
          title: "Find the subtler exchange",
          body:
            "A second person may honestly abstain from the food yet enjoy being recognized for abstinence. Outward discipline succeeds while the governing desire moves from consumption to esteem.",
        },
        {
          title: "Compare the two dangers",
          body:
            "Ghazali treats the appetite for status as more concealed and therefore more dangerous. The scorpion and snake analogy makes the exchange visible without suggesting that the original appetite was harmless.",
        },
        {
          title: "Return to truthfulness",
          body:
            "The safer movement is toward congruence: neither advertising an attainment nor constructing a false public austerity. The inward purpose of restraint must remain more important than the social meaning attached to it.",
        },
      ],
      distinction: {
        title: "The same restraint can serve two different rulers",
        firstLabel: "Appetite governed",
        first:
          "The person eats less to restore proportion, attention, gratitude, and freedom from domination, whether or not anyone notices.",
        secondLabel: "Image cultivated",
        second:
          "The person needs the restraint to be legible to an audience because recognition has become part of the reward.",
      },
      misreading:
        "Do not conclude that every practice known to others is ostentation. Ghazali's diagnosis concerns the governing intention and the pleasure taken in spiritual status, not visibility alone.",
      observation:
        "Notice what happens when a good practice receives no recognition, or when another person receives the recognition instead. The emotional change can reveal the hidden reward.",
      sourceAnchor: "Book 23, section 5, the two forms of ostentation surrounding frugal eating.",
    },
  },
  {
    id: 6,
    shortTitle: "How sexual desire is governed",
    formalTitle: "The discourse on sexual desire",
    overview:
      "Ghazali gives sexual desire a proper place and a limit. He identifies pleasure as an analogy for promised delight and desire as a means for continuation of progeny. The praised condition is neither excess nor absence, but a power moderated under reason and religious law. He emphasizes intervention at the early stages of gaze and thought before attachment becomes established.",
    points: [
      "The faculty is not treated as evil simply because it exists; Ghazali names functions it serves.",
      "Both excess and deficiency can miss the fitting condition, while moderation means obedient rather than ruling desire.",
      "Early attention matters because an established attachment is harder to reverse than an initial gaze or thought.",
    ],
    reflection:
      "Map the earliest point at which attention becomes voluntary reinforcement. Earlier recognition usually leaves more room for a calm and proportionate choice.",
    relatedNodes: ["desire", "moderation", "gaze", "attention"],
    visualModel: {
      kind: "spectrum",
      title: "A power with two ways to miss its measure",
      items: [
        {
          label: "Deficiency",
          body: "Ghazali does not praise the mere absence or failure of the faculty. A deficient condition can also fall short of its proper human function.",
          role: "warning",
        },
        {
          label: "Governed desire",
          body: "The praised state preserves the faculty while making it obedient to sound reason and religious law.",
          role: "balance",
        },
        {
          label: "Excess",
          body: "When desire overpowers judgment and directs attention and action, a useful power has taken command of the person it should serve.",
          role: "warning",
        },
      ],
      caption:
        "Moderation here means right rule and proportion, not emotional numbness and not an identical level of desire in every person.",
    },
    deep: {
      thesis:
        "Sexual desire is sound when its proper functions are preserved and its movement remains governed by reason and religious law.",
      context:
        "Ghazali first names two benefits: pleasure offers an analogical taste of promised delight, and desire supports continuation of progeny. He then turns to disorder, arguing that excess can overpower judgment while deficiency also misses the praised mean.",
      moves: [
        {
          title: "Acknowledge proper function",
          body:
            "The argument does not begin by treating desire as a foreign evil. Ghazali places it within created human life and gives reasons for its presence before describing how it can become disordered.",
        },
        {
          title: "Locate both departures",
          body:
            "Excess is not the only way to miss the fitting condition. The praised state lies in a faculty that is present and effective but does not overthrow the judgment meant to direct it.",
        },
        {
          title: "Intervene near the beginning",
          body:
            "Ghazali focuses on the gaze and the thought that follows it. His mount and gate image argues that direction is easier to change before attachment passes the threshold and gathers momentum.",
        },
        {
          title: "Match support to condition",
          body:
            "Within his account, fasting and marriage can each serve as supports in different conditions. Neither is treated as a magical technique detached from intention, capacity, and obligations.",
        },
      ],
      distinction: {
        title: "Presence of desire is not rule by desire",
        firstLabel: "A human faculty",
        first:
          "Desire has a place in human life and can move within lawful, responsible, and proportionate bounds.",
        secondLabel: "A ruling appetite",
        second:
          "Desire recruits attention and action against judgment until the person serves the impulse rather than directing it.",
      },
      misreading:
        "Do not convert Ghazali's historical discussion into contempt for the body or into gendered suspicion. The central analytic question is whether a human power serves or rules.",
      observation:
        "Without dramatizing a passing impression, notice the point where attention begins to feed it through a second look, repeated thought, or deliberate return.",
      sourceAnchor: "Book 23, section 6, the functions, dangers, and moderation of sexual desire.",
    },
  },
  {
    id: 7,
    shortTitle: "Marriage and the aspirant's condition",
    formalTitle: "What the aspirant must observe in renouncing or undertaking marriage",
    overview:
      "The final section addresses the murid, an aspirant within a classical ascetic path. Ghazali weighs whether marriage would distract a beginning aspirant or protect a person who cannot guard gaze and thought. The decision turns on actual condition, and marriage brings duties of intention, good conduct, and fulfillment of rights.",
    points: [
      "This is counsel for a particular ascetic audience, not a universal ruling that every reader should copy.",
      "Ghazali names hunger, lowering the gaze, and absorbing occupation as supports before considering marriage for an ungovernable desire.",
      "If marriage is undertaken, its ethical obligations and the rights of another person cannot be treated as a mere technique for self-management.",
    ],
    reflection:
      "A remedy that involves another person's life must be judged not only by what it solves for the self, but also by the rights and responsibilities it creates.",
    relatedNodes: ["aspirant", "gaze", "marriage", "rights"],
    visualModel: {
      kind: "chain",
      title: "A conditional path, not one rule for everyone",
      items: [
        {
          label: "Name the context",
          body: "The subject is a beginning aspirant trying to protect concentrated spiritual work within Ghazali's ascetic program.",
          role: "support",
        },
        {
          label: "Test self-command",
          body: "Can gaze and thought be guarded, or does desire repeatedly break the person's intended discipline?",
          role: "balance",
        },
        {
          label: "Use fitting supports",
          body: "Ghazali names hunger, lowering the gaze, and an absorbing occupation as initial supports in this specific context.",
          role: "support",
        },
        {
          label: "Consider marriage",
          body: "If those supports fail and desire remains ungovernable, marriage may be preferable to continued exposure to wrongdoing.",
          role: "support",
        },
        {
          label: "Fulfill rights",
          body: "Marriage must carry sound intention, good conduct, and the rights of the spouse. It cannot be reduced to a private remedy.",
          role: "balance",
        },
      ],
      caption:
        "This diagram describes Ghazali's counsel to the murid. It is not a fatwa, a medical algorithm, or a universal modern marriage decision tree.",
    },
    deep: {
      thesis:
        "For the aspirant Ghazali addresses, the marriage decision is conditional: choose the path closest to guarded conduct, then honor every right that path creates.",
      context:
        "The final section is easy to flatten into a slogan for or against marriage. Ghazali instead begins with an ascetic concern about distraction, recognizes that ungoverned desire can make celibacy the more dangerous condition, and then evaluates the aspirant's actual ability to guard attention and conduct.",
      moves: [
        {
          title: "Identify the intended reader",
          body:
            "The murid is a person entering a concentrated path of discipline, not a label for every Muslim in every circumstance. The counsel belongs to that stated problem and audience.",
        },
        {
          title: "Test the real condition",
          body:
            "If the aspirant can guard gaze and thought, remaining unmarried may protect focus in the beginning. If desire repeatedly defeats that guard, the same choice can become spiritually destabilizing.",
        },
        {
          title: "Try the named supports",
          body:
            "Ghazali lists hunger, lowering the gaze, and an occupation that absorbs attention. These belong to his ascetic framework and are described before marriage is considered as the stronger response.",
        },
        {
          title: "Let marriage answer the actual risk",
          body:
            "When the earlier supports do not contain the desire, marriage may be preferable. The judgment changes because the person's condition changes, not because marriage itself has changed value.",
        },
        {
          title: "Restore the other person's rights",
          body:
            "Marriage is not completed by solving the aspirant's difficulty. Good intention, conduct, maintenance of obligations, and the spouse's rights remain part of the moral evaluation.",
        },
      ],
      distinction: {
        title: "Ascetic counsel is not a universal marriage ruling",
        firstLabel: "The section's question",
        first:
          "Which condition best protects this aspirant's worship and conduct, given the person's actual ability to govern desire?",
        secondLabel: "A question it does not settle",
        second:
          "What every Muslim in every social, legal, emotional, and bodily circumstance must do about marriage.",
      },
      misreading:
        "This synthesis is not a fatwa and should not be used to override the rights, safety, consent, or well-being of another person. It explains the logic of Ghazali's historical ascetic counsel.",
      observation:
        "When a proposed remedy involves another person, list the new duties it creates. If the analysis contains only the self's relief, it is morally incomplete.",
      sourceAnchor: "Book 23, section 7, conditional counsel on renouncing or undertaking marriage.",
    },
  },
];

export const book23ConceptNodes: ConceptNode[] = [
  {
    id: "appetite",
    label: "Appetite",
    kicker: "A seeking power",
    description:
      "A power that seeks nourishment and pleasure. The book studies what happens when a useful capacity becomes a ruling demand.",
    position: "node-appetite",
  },
  {
    id: "hunger",
    label: "Hunger",
    kicker: "A disciplinary instrument",
    description:
      "A state Ghazali uses to weaken satiety and connected impulses. Its value lies in a fitting effect, not pain by itself.",
    position: "node-hunger",
  },
  {
    id: "satiety",
    label: "Satiety",
    kicker: "Fullness with moral effects",
    description:
      "More than having eaten enough in Ghazali's usage here: the concern is indulged fullness that burdens attention and strengthens appetite.",
    position: "node-satiety",
  },
  {
    id: "desire",
    label: "Desire",
    kicker: "A power that can serve or rule",
    description:
      "Desire is not condemned merely for existing. Disorder appears when it overpowers judgment, law, purpose, or the rights of others.",
    position: "node-desire",
  },
  {
    id: "attention",
    label: "Attention",
    kicker: "A contested resource",
    description:
      "Appetite can capture thought before action. The book repeatedly asks what frees attention for remembrance, worship, and sound judgment.",
    position: "node-attention",
  },
  {
    id: "compassion",
    label: "Compassion",
    kicker: "Remembering another's hunger",
    description:
      "Ghazali includes awareness of hungry people and the ability to redirect surplus toward them among the fruits of restraint.",
    position: "node-compassion",
  },
  {
    id: "measure",
    label: "Measure",
    kicker: "A dose fitted to condition",
    description:
      "Amount, timing, type, strength, habit, and purpose all affect what a proportionate discipline would mean for a person.",
    position: "node-measure",
  },
  {
    id: "lawful",
    label: "Lawful source",
    kicker: "The first condition",
    description:
      "Ghazali places lawful provision before quantity, timing, or type. Austerity cannot repair wrongful acquisition.",
    position: "node-lawful",
  },
  {
    id: "gradualism",
    label: "Gradualism",
    kicker: "Habit unwound by stages",
    description:
      "A person accustomed to much food should not be overburdened by an abrupt reduction. The entrenched pattern is changed progressively.",
    position: "node-gradualism",
  },
  {
    id: "discipline",
    label: "Discipline",
    kicker: "Correction toward freedom",
    description:
      "A deliberate practice that weakens an appetite's rule. It is judged by whether it restores proportion, not by severity alone.",
    position: "node-discipline",
  },
  {
    id: "moderation",
    label: "Moderation",
    kicker: "The fitting middle",
    description:
      "A condition in which neither fullness nor hunger dominates attention and desire remains under sound direction.",
    position: "node-moderation",
  },
  {
    id: "intention",
    label: "Intention",
    kicker: "The inward direction",
    description:
      "The purpose that gives restraint its moral direction. An outwardly sound act may still serve the appetite for recognition.",
    position: "node-intention",
  },
  {
    id: "reputation",
    label: "Reputation",
    kicker: "The hidden reward",
    description:
      "Being known for discipline can become a subtler pleasure, allowing appetite to survive under the appearance of restraint.",
    position: "node-reputation",
  },
  {
    id: "truthfulness",
    label: "Truthfulness",
    kicker: "Actual state and appearance aligned",
    description:
      "Refusing to perform a spiritual rank one does not possess, and refusing to make public recognition the reward for restraint.",
    position: "node-truthfulness",
  },
  {
    id: "gaze",
    label: "Gaze",
    kicker: "An early threshold",
    description:
      "Ghazali treats the gaze and the thought that follows as early points where attention can still be redirected before attachment grows.",
    position: "node-gaze",
  },
  {
    id: "aspirant",
    label: "Aspirant",
    kicker: "A specific ascetic audience",
    description:
      "The murid entering a concentrated path of discipline. Counsel addressed to this person should not automatically be universalized.",
    position: "node-aspirant",
  },
  {
    id: "marriage",
    label: "Marriage",
    kicker: "A covenant, not a technique",
    description:
      "Considered conditionally in the final section and inseparable from intention, conduct, obligations, and another person's rights.",
    position: "node-marriage",
  },
  {
    id: "rights",
    label: "Rights",
    kicker: "The other person remains central",
    description:
      "Duties created by marriage prevent it from being reduced to a private remedy for the aspirant's desire.",
    position: "node-rights",
  },
];

export const book23Journeys: Journey[] = [
  {
    id: "root",
    number: "01",
    question: "Why begin with appetite?",
    title: "Trace desire from its root",
    description:
      "Follow Ghazali's causal diagnosis, then separate the pain of hunger from the inward, practical, and social functions he wants restraint to serve.",
    payoff: "You leave with a map of why food discipline matters inside the wider moral system.",
    image: assetUrl("assets/system/book23-appetite-root.jpg"),
    imageAlt: "A bright garden fountain sends four colored channels toward vessels symbolizing appetite, attention, resources, and public display.",
    minutes: 8,
    color: "#b6682f",
    nodes: [
      {
        id: "find-the-root",
        label: "Find the proposed root",
        micro: "A daily appetite trains command",
        summary:
          "Ghazali begins with the stomach because habitual satisfaction can train the self to expect that desire should be obeyed.",
        guardrail: "This is Ghazali's causal diagnosis, not a universal law of modern psychology.",
        chapterId: 1,
        glyph: "diagnose",
      },
      {
        id: "follow-the-branches",
        label: "Follow the branches",
        micro: "Pleasure recruits means and status",
        summary:
          "The prologue traces appetite toward sexual desire, wealth, status, rivalry, envy, ostentation, and pride.",
        guardrail: "The concern is their service to expanding desire, not the mere existence of resources or standing.",
        chapterId: 1,
        glyph: "leverage",
      },
      {
        id: "read-the-witness",
        label: "Read the religious witness",
        micro: "Exhortation before technique",
        summary:
          "Ghazali gathers reports and sayings that praise hunger and condemn satiety to establish the spiritual urgency of restraint.",
        guardrail: "Reporting his evidence does not independently authenticate every narration.",
        chapterId: 1,
        glyph: "witness",
      },
      {
        id: "separate-pain-benefit",
        label: "Separate pain from benefit",
        micro: "Medicine is judged by function",
        summary:
          "Like unpleasant medicine, hunger is not valuable merely because it hurts; its claimed value lies in what it helps restore or weaken.",
        guardrail: "Discomfort is not proof of spiritual gain.",
        chapterId: 2,
        glyph: "know",
      },
      {
        id: "free-attention",
        label: "Free attention",
        micro: "Lighter demands, clearer purpose",
        summary:
          "Ghazali connects restraint with clearer thought, a softened heart, humility, reduced sleep, and weaker secondary impulses.",
        guardrail: "These are claims within his ascetic account, not guaranteed effects of every fast.",
        chapterId: 2,
        glyph: "attend",
      },
      {
        id: "redirect-resources",
        label: "Redirect resources",
        micro: "Less for the self can become more for others",
        summary:
          "Reduced material demand can leave time, food, and money available for worship and for people who are hungry or in need.",
        guardrail: "Restraint is incomplete if savings simply become another private accumulation.",
        chapterId: 2,
        glyph: "act",
      },
    ],
  },
  {
    id: "measure",
    number: "02",
    question: "How is eating disciplined?",
    title: "Calibrate four measures",
    description:
      "Separate lawful source, amount, timing, and type, then see why gradual change and the person's actual condition matter more than an impressive regimen.",
    payoff: "You gain a precise model for correction without mistaking severity for the goal.",
    image: assetUrl("assets/system/book23-four-measures.jpg"),
    imageAlt: "Four luminous brass instruments measure a lawful seal, a bowl, a clock-like dial, and a simple grain beneath a white and gold canopy.",
    minutes: 9,
    color: "#2c8580",
    nodes: [
      {
        id: "begin-lawful",
        label: "Begin with lawful provision",
        micro: "Source before quantity",
        summary:
          "Ghazali places lawful acquisition first, before every question about how little, how late, or how plain a meal should be.",
        guardrail: "Austerity cannot repair wrongful acquisition.",
        chapterId: 3,
        glyph: "guard",
      },
      {
        id: "reduce-gradually",
        label: "Change amount gradually",
        micro: "Unwind an established habit",
        summary:
          "A person accustomed to eating much is advised to reduce by stages so that the correction does not overwhelm the body or the practice.",
        guardrail: "Sudden severity is not presented as superior discipline.",
        chapterId: 3,
        glyph: "cultivate",
      },
      {
        id: "examine-timing",
        label: "Examine timing",
        micro: "Interval is a separate lever",
        summary:
          "Ghazali distinguishes the amount eaten from the time between meals and records different ascetic intervals.",
        guardrail: "The historical intervals are not a universal schedule to imitate.",
        chapterId: 3,
        glyph: "attend",
      },
      {
        id: "simplify-type",
        label: "Simplify the desired type",
        micro: "Variety has its own pull",
        summary:
          "The desire for refined or especially attractive food can be trained independently from the desire for sheer quantity.",
        guardrail: "Less variety is another lever, not proof of a higher rank.",
        chapterId: 3,
        glyph: "practice",
      },
      {
        id: "fit-the-person",
        label: "Fit the person's condition",
        micro: "Bodies, habits, and duties differ",
        summary:
          "The useful measure changes with strength, habit, appetite, work, and the effect the discipline has on attention and duty.",
        guardrail: "Fixed numbers are not the final aim.",
        chapterId: 4,
        glyph: "diagnose",
      },
      {
        id: "restore-middle",
        label: "Restore the middle",
        micro: "Neither fullness nor hunger rules",
        summary:
          "The intended state leaves the person unburdened by satiety and unpreoccupied by painful hunger, free for worship and thought.",
        guardrail: "Corrective pressure should not become a permanent opposite extreme.",
        chapterId: 4,
        glyph: "balance",
      },
    ],
  },
  {
    id: "hidden-desire",
    number: "03",
    question: "Can restraint feed the ego?",
    title: "Watch desire change its object",
    description:
      "See how a person can leave the food yet begin consuming reputation, and why truthfulness matters more than performing visible austerity.",
    payoff: "You learn to distinguish disciplined appetite from appetite disguised as spiritual rank.",
    image: assetUrl("assets/system/book23-hidden-desire.jpg"),
    imageAlt: "A simple ivory bowl stands between two ornate mirrors, while a gold ribbon of desire turns from the bowl toward an elevated empty pedestal.",
    minutes: 7,
    color: "#865b9d",
    nodes: [
      {
        id: "make-restraint-visible",
        label: "See restraint become visible",
        micro: "A practice acquires an audience",
        summary:
          "Eating little can become a social sign of discipline, creating a second reward beyond the practice's original purpose.",
        guardrail: "Visibility alone does not prove ostentation.",
        chapterId: 5,
        glyph: "attend",
      },
      {
        id: "find-private-divergence",
        label: "Find private divergence",
        micro: "Actual state and public image split",
        summary:
          "One failure conceals continued indulgence while displaying austerity before others.",
        guardrail: "The fault includes the false rank being performed, not food alone.",
        chapterId: 5,
        glyph: "mirror",
      },
      {
        id: "detect-new-reward",
        label: "Detect the new reward",
        micro: "Recognition can taste sweet",
        summary:
          "A person may genuinely abstain yet delight in being known for abstinence, making reputation the hidden pleasure.",
        guardrail: "A sound outward act can still serve a disordered inward aim.",
        chapterId: 5,
        glyph: "diagnose",
      },
      {
        id: "compare-the-danger",
        label: "Compare the danger",
        micro: "Scorpion exchanged for snake",
        summary:
          "Ghazali treats the move from food desire to status desire as an escape from one danger into a subtler one.",
        guardrail: "The analogy ranks hidden danger without making the first appetite harmless.",
        chapterId: 5,
        glyph: "know",
      },
      {
        id: "restore-truth",
        label: "Restore truthfulness",
        micro: "Let the practice survive without applause",
        summary:
          "The corrective is congruence between actual state, intention, and appearance rather than the performance of an unattained rank.",
        guardrail: "The aim is not to advertise private faults, but to stop feeding a false image.",
        chapterId: 5,
        glyph: "guard",
      },
    ],
  },
  {
    id: "governed-desire",
    number: "04",
    question: "How is sexual desire governed?",
    title: "Guide the power before the gate",
    description:
      "Preserve the faculty's proper place, locate excess and deficiency, intervene early in attention, and read Ghazali's marriage counsel in its specific ascetic context.",
    payoff: "You leave with a dignified model of governance, early attention, condition, and rights.",
    image: assetUrl("assets/system/book23-governed-desire.jpg"),
    imageAlt: "A flowering vine approaches a luminous garden gate, with a gentle brass guide turning one tendril early while a balanced lantern marks the center path.",
    minutes: 9,
    color: "#2f6f9e",
    nodes: [
      {
        id: "recognize-function",
        label: "Recognize proper function",
        micro: "A power is not evil by existence",
        summary:
          "Ghazali names pleasure as an analogy for promised delight and desire as a means for continuation of progeny.",
        guardrail: "Acknowledging function does not deny the possibility of disorder.",
        chapterId: 6,
        glyph: "know",
      },
      {
        id: "locate-extremes",
        label: "Locate both extremes",
        micro: "Deficiency and excess can miss",
        summary:
          "The praised condition is a present faculty in fitting proportion, not domination by desire and not deficiency of the power.",
        guardrail: "Moderation is right rule, not one identical intensity for everyone.",
        chapterId: 6,
        glyph: "balance",
      },
      {
        id: "intervene-early",
        label: "Intervene before the gate",
        micro: "Direction is easier near the beginning",
        summary:
          "Ghazali emphasizes gaze and thought because established attachment is harder to reverse than an initial movement of attention.",
        guardrail: "Early awareness need not turn a passing impression into panic or obsession.",
        chapterId: 6,
        glyph: "attend",
      },
      {
        id: "identify-aspirant",
        label: "Identify the aspirant",
        micro: "The counsel has a specific audience",
        summary:
          "The final section addresses a murid entering concentrated ascetic discipline, not every person facing a marriage decision.",
        guardrail: "Specific counsel should not be universalized into a general ruling.",
        chapterId: 7,
        glyph: "name",
      },
      {
        id: "test-condition",
        label: "Test actual condition",
        micro: "Can gaze and thought be guarded?",
        summary:
          "If restraint repeatedly fails, marriage may be preferable; if the aspirant can remain guarded, celibacy may protect early focus in Ghazali's program.",
        guardrail: "The recommendation changes with the person's condition.",
        chapterId: 7,
        glyph: "diagnose",
      },
      {
        id: "honor-rights",
        label: "Honor the rights created",
        micro: "Another person is not a remedy",
        summary:
          "Marriage carries intention, good conduct, obligations, and the spouse's rights, so it cannot be reduced to self-management.",
        guardrail: "This synthesis explains the argument; it is not a fatwa or personal marriage advice.",
        chapterId: 7,
        glyph: "guard",
      },
    ],
  },
];

export const book23Sources: SourceLink[] = [
  {
    label: "Primary Arabic text",
    note: "Public text used to verify the prologue, seven-section sequence, four duties, middle, ostentation analysis, and marriage counsel.",
    url: "https://ar.wikisource.org/wiki/%D8%A5%D8%AD%D9%8A%D8%A7%D8%A1_%D8%B9%D9%84%D9%88%D9%85_%D8%A7%D9%84%D8%AF%D9%8A%D9%86/%D9%83%D8%AA%D8%A7%D8%A8_%D9%83%D8%B3%D8%B1_%D8%A7%D9%84%D8%B4%D9%87%D9%88%D8%AA%D9%8A%D9%86",
  },
  {
    label: "Published English edition",
    note: "T. J. Winter's translation of Books 22 and 23. Used to cross-check the established English title and section sequence.",
    url: "https://its.org.uk/catalogue/al-ghazali-on-disciplining-the-soul-and-on-breaking-the-two-desires-paperback/",
  },
  {
    label: "Official edition sample",
    note: "Publisher sample containing the English contents and bibliographic context for the combined Books 22 and 23 volume.",
    url: "https://its.org.uk/wp-content/uploads/2012/09/Al-Ghazali-on-Disciplining-the-Soul-Breaking-the-Two-Desires.pdf",
  },
  {
    label: "Forty-book structure",
    note: "Cross-check for Book 23's place in the Quarter of Perils after Disciplining the Soul and Refining Character.",
    url: "https://www.ghazali.org/site/ihya.htm",
  },
];

export const book23: SystemBook = {
  id: 23,
  title: "Breaking the Two Desires",
  shortTitle: "Breaking the Two Desires",
  defaultJourneyId: "root",
  chapters: book23Chapters,
  conceptNodes: book23ConceptNodes,
  journeys: book23Journeys,
  sources: book23Sources,
  editorialNote:
    "This synthesis reports Ghazali's argument and historical ascetic practices. It does not authenticate every cited report or convert period-specific fasting, medical, or marriage material into general modern advice.",
};
