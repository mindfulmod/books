import {readings as completeOne} from './content-complete-01.js';
import {readings as completeTwo} from './content-complete-02.js';
import {readings as completeThree} from './content-complete-03.js';
import {readings as completeFour} from './content-complete-04.js';
import {editionOrder} from './edition-order.js';
import {fourthReadings} from './content-batch-04.js';
import {nextReadings} from './content-batch-03.js';
// Direct companion voice. Source excerpts and attribution remain in Reading notes.
export const sourceUrl = "https://ar.wikisource.org/wiki/المقصد_الأسنى";
export const publisherUrl = "https://its.org.uk/catalogue/al-ghazali-on-the-ninety-nine-beautiful-names-of-god-hardback-copy/";
export const themes = [
  {
    "id": "mercy",
    "label": "Mercy",
    "invitation": "Know the breadth of His mercy"
  },
  {
    "id": "gentleness",
    "label": "Gentleness",
    "invitation": "Recognise His gentle care"
  },
  {
    "id": "forgiveness",
    "label": "Forgiveness",
    "invitation": "Turn to the One who forgives"
  },
  {
    "id": "love",
    "label": "Love",
    "invitation": "Know His love and generosity"
  },
  {
    "id": "trust",
    "label": "Trust",
    "invitation": "Know the One you rely on"
  },
  {
    "id": "peace",
    "label": "Peace",
    "invitation": "Know the Source of Peace"
  },
  {
    "id": "reverence",
    "label": "Reverence",
    "invitation": "Contemplate His perfection"
  },
  {
    "id": "creation",
    "label": "Creation",
    "invitation": "Know the Creator through His works"
  },
  {
    "id": "knowledge",
    "label": "Knowledge",
    "invitation": "Contemplate His complete knowledge"
  },
  {
    "id": "justice",
    "label": "Justice",
    "invitation": "Know His justice and wisdom"
  },
  {
    "id": "gratitude",
    "label": "Gratitude",
    "invitation": "Recognise the Giver in His gifts"
  }
];
const earlierNames = [
  ...nextReadings,
  ...fourthReadings,
  {
    "id": "ar-rahman",
    "name": "Ar-Rahman",
    "arabic": "الرَّحْمَٰن",
    "meaning": "The All-Merciful",
    "theme": "mercy",
    "art": "garden",
    "invitation": "His mercy encompasses creation.",
    "takeaway": "His mercy encompasses creation.",
    "introduction": "Allah’s mercy precedes your asking. Ar-Rahman names the mercy through which He brings creatures into existence and opens the way to knowing Him.",
    "sections": [
      {
        "title": "Mercy complete and encompassing",
        "paragraphs": [
          "Allah wills good for His creatures and has the power to give it. His mercy reaches the deserving and the undeserving, meeting needs they could never meet independently. Existence itself, the means of living, and gifts beyond bare necessity all come within its breadth."
        ]
      },
      {
        "title": "A Name belonging to Allah alone",
        "paragraphs": [
          "Ar-Rahman belongs to Allah alone. Creating life, guiding toward faith, and granting happiness in the life to come are gifts no creature can give independently. His mercy does not arise from distress or a need to ease His own pain; its perfection is in the good He bestows."
        ]
      },
      {
        "title": "Receive mercy and respond",
        "paragraphs": [
          "Remember the mercy by which you already live, and turn to Allah with gratitude and hope. Let that remembrance soften your response to someone who has lost their way. Wish for their return to Him, and offer help without contempt."
        ]
      }
    ],
    "reflection": "What does the mercy I have already received teach me about Allah?",
    "practice": "Thank Allah for one mercy that came before you asked. Offer a patient response to someone who needs it.",
    "arabicExcerpt": "والرحمة العامة هي التي تتناول المستحق وغير المستحق",
    "sourceNote": "The joint discussion of Ar-Rahman and Ar-Rahim: complete and encompassing mercy, the Name Ar-Rahman’s particularity to Allah, and His gifts of existence, guidance, and the life to come.",
    "verse": "7:156",
    "related": [
      "ar-rahim",
      "al-wadud"
    ],
    "editorialStatus": "source-informed draft"
  },
  {
    "id": "ar-rahim",
    "name": "Ar-Rahim",
    "arabic": "الرَّحِيم",
    "meaning": "The Especially Merciful",
    "theme": "mercy",
    "art": "garden",
    "invitation": "His mercy brings good to those who need it.",
    "takeaway": "His mercy brings good to those who need it.",
    "introduction": "Allah’s mercy is more than a wish that suffering should end. Ar-Rahim is merciful with complete knowledge of need and complete power to give.",
    "sections": [
      {
        "title": "Mercy that reaches its recipient",
        "paragraphs": [
          "Mercy involves willing good for someone in need and bringing that good to them. Human compassion may remain an intention because ability fails. Allah’s mercy has no such weakness. He knows every need, including what its bearer cannot recognise, and the means of meeting it belong to Him."
        ]
      },
      {
        "title": "Perfect mercy, free from self-concern",
        "paragraphs": [
          "Human kindness can mingle with a wish to relieve our own distress. Allah needs no relief, repayment, or reassurance. His mercy is for the good of its recipient. A creature may also be called merciful, but its mercy remains limited and received; Allah’s mercy is perfect and independent."
        ]
      },
      {
        "title": "Ask, then give within your ability",
        "paragraphs": [
          "Bring your need to Allah without pretending to be self-sufficient. As someone receiving His mercy, attend to a need within your reach. Ask what would help, offer what you can sustain, and preserve the other person’s dignity."
        ]
      }
    ],
    "reflection": "How does knowing the perfection of Allah’s mercy change the way I turn to Him?",
    "practice": "Ask Allah for mercy in a specific need, then offer a practical kindness with Him in mind.",
    "arabicExcerpt": "كمال الرحمة أن يكون نظره إلى المرحوم لأجل المرحوم",
    "sourceNote": "The joint discussion of Ar-Rahman and Ar-Rahim: mercy as willing and conferring good, free from weakness and self-concern. The concise English labels do not exhaust the distinction between these closely related Names.",
    "verse": "1:3",
    "related": [
      "ar-rahman",
      "al-latif"
    ],
    "editorialStatus": "source-informed draft"
  },
  {
    "id": "al-malik",
    "name": "Al-Malik",
    "arabic": "الْمَلِك",
    "meaning": "The Sovereign",
    "theme": "trust",
    "art": "terrace",
    "aliases": [
      "the king",
      "sovereignty"
    ],
    "invitation": "His sovereignty depends on nothing; everything depends on Him.",
    "takeaway": "His sovereignty depends on nothing; everything depends on Him.",
    "introduction": "Allah is the Sovereign in the fullest sense. His being and authority need no support, while every creature belongs to Him and depends on Him.",
    "sections": [
      {
        "title": "Sovereignty without dependence",
        "paragraphs": [
          "An earthly ruler needs a realm, people, and means through which to act. Allah needs none of these to possess sovereignty. His existence and attributes are independent of creation. Nothing sustains His authority from outside, and nothing can remove it."
        ]
      },
      {
        "title": "Creation belongs to Him",
        "paragraphs": [
          "Everything besides Allah depends on Him for its existence, qualities, and continuance. Even the means by which creatures support one another are His creation. Ownership and authority among people are therefore limited and received; His dominion is complete and original."
        ]
      },
      {
        "title": "Serve within what is entrusted",
        "paragraphs": [
          "Remember Al-Malik when a responsibility begins to feel like absolute control. Give your words, decisions, and commitments sincere care. Ask Allah to guide their use, and entrust the outcome to the Sovereign who sustains you and everyone affected by your actions."
        ]
      }
    ],
    "reflection": "What changes in this responsibility when I remember that I belong to Allah?",
    "practice": "Name one responsibility entrusted to you. Ask Al-Malik for help carrying it faithfully.",
    "arabicExcerpt": "هو الذي يستغني في ذاته وصفاته عن كل موجود",
    "sourceNote": "Al-Malik: Allah’s independence in being and attributes, and creation’s dependence on Him for existence and continuance. The personal response develops the source’s counsel on governing one’s own conduct.",
    "verse": "59:23",
    "related": [
      "al-mumin",
      "al-muhaymin"
    ],
    "editorialStatus": "source-informed draft"
  },
  {
    "id": "al-quddus",
    "name": "Al-Quddus",
    "arabic": "الْقُدُّوس",
    "meaning": "The Most Holy",
    "theme": "reverence",
    "art": "spring",
    "aliases": [
      "holiness",
      "purity"
    ],
    "invitation": "His holiness exceeds every created measure of perfection.",
    "takeaway": "His holiness exceeds every created measure of perfection.",
    "introduction": "Allah is holy beyond every defect and every likeness you can imagine. Knowing His Names does not mean containing His reality in your mind.",
    "sections": [
      {
        "title": "Beyond the forms of imagination",
        "paragraphs": [
          "Your imagination works with things you have encountered: bodies, shapes, places, and their combinations. Allah is not one of those forms. Al-Quddus teaches His freedom from the limits of created things, including the pictures that appear when you try to imagine Him."
        ]
      },
      {
        "title": "Perfection without created limits",
        "paragraphs": [
          "Even the qualities you call excellent in yourself remain limited. You learn after ignorance and act with borrowed strength. Allah’s knowledge and power have no such dependence. His holiness calls for more than denying faults; it calls for reverence beyond your own standard of perfection."
        ]
      },
      {
        "title": "Worship with reverence",
        "paragraphs": [
          "Let this Name purify the direction of your attention. You do not need an image of Allah in order to worship Him. Learn what His Names mean, renew your intention toward Him, and allow what you cannot encompass to deepen your humility."
        ]
      }
    ],
    "reflection": "Where have I been measuring Allah’s perfection by the limits of my own experience?",
    "practice": "Pause over a familiar Name in prayer. Remember that Allah’s perfection exceeds your experience of its meaning.",
    "arabicExcerpt": "منزه عن أوصاف كمالهم كما أنه منزه عن أوصاف نقصهم",
    "sourceNote": "Al-Quddus: transcendence beyond sense, imagination, and the limits even of creaturely perfections. This is a selective account of the source’s wider philosophical discussion, with an original invitation to reverent worship.",
    "verse": "59:23",
    "related": [
      "as-salam",
      "al-malik"
    ],
    "editorialStatus": "source-informed draft"
  },
  {
    "id": "as-salam",
    "name": "As-Salam",
    "arabic": "السَّلَام",
    "meaning": "The Source of Peace",
    "theme": "peace",
    "art": "water",
    "aliases": [
      "al salam",
      "wholeness",
      "safety"
    ],
    "invitation": "He is free from every defect; all true soundness comes from Him.",
    "takeaway": "He is free from every defect; all true soundness comes from Him.",
    "introduction": "As-Salam names Allah’s perfect freedom from defect. Peace begins here with who He is, before it becomes something you seek or offer to others.",
    "sections": [
      {
        "title": "Perfection in being and attributes",
        "paragraphs": [
          "Allah’s being is free from defect and His attributes from deficiency. His knowledge is never mistaken, His power never exhausted, and His life never threatened by death. The peace in this Name is deeper than a passing feeling of calm: it concerns His unblemished perfection."
        ]
      },
      {
        "title": "The source of safety and soundness",
        "paragraphs": [
          "Every created form of safety and soundness depends on Allah. His acts are free from evil pursued for its own sake. This does not make suffering unreal or give you knowledge of its particular purpose. His perfection is not measured by how peaceful a moment feels."
        ]
      },
      {
        "title": "Seek a sound heart",
        "paragraphs": [
          "Ask As-Salam for peace and a heart free from the wish to harm. Let that prayer reach your conduct: keep a confidence, repair a careless remark, or speak firmly without cruelty. Receive practical care as one of the means He has made available."
        ]
      }
    ],
    "reflection": "How is Allah’s perfect soundness different from the temporary calm I usually call peace?",
    "practice": "Ask Allah for a sound heart before one difficult conversation, then speak with truth and care.",
    "arabicExcerpt": "هو الذي تسلم ذاته عن العيب وصفاته عن النقص",
    "sourceNote": "As-Salam: freedom from defect in being and attributes, and from evil intended solely for itself. The source’s extended treatment of providence is not reproduced in full. No particular purpose is assigned to an individual’s suffering.",
    "verse": "59:23",
    "related": [
      "al-mumin",
      "al-latif"
    ],
    "editorialStatus": "source-informed draft"
  },
  {
    "id": "al-mumin",
    "name": "Al-Mu’min",
    "arabic": "الْمُؤْمِن",
    "meaning": "The Giver of Security",
    "theme": "trust",
    "art": "passage",
    "aliases": [
      "al mumin",
      "al mu'min",
      "faithful",
      "security"
    ],
    "invitation": "Every true security has its source in Him.",
    "takeaway": "Every true security has its source in Him.",
    "introduction": "Allah grants security and creates the means through which it reaches His creatures. Al-Mu’min directs your attention beyond reassurance to the Giver of safety.",
    "sections": [
      {
        "title": "He creates the means of security",
        "paragraphs": [
          "Food answers hunger, shelter offers protection, and perception helps a creature recognise danger. These means do not sustain themselves. Allah creates them, gives them their capacity to help, and guides creatures in their use. Whatever security they provide ultimately depends on Him."
        ]
      },
      {
        "title": "Guidance toward lasting safety",
        "paragraphs": [
          "Allah’s care encompasses more than bodily protection. He guides toward faith and the way of salvation in the life to come. Al-Mu’min is therefore more than a promise of comfort here. Both the means of worldly safety and the guidance toward lasting safety are His gifts."
        ]
      },
      {
        "title": "Trust and become trustworthy",
        "paragraphs": [
          "Seek Allah’s protection and use the means of care available to you. In gratitude, let others find you dependable: keep a promise, protect a confidence, and offer help honestly. Your limited care can serve them while you both remain dependent on Him."
        ]
      }
    ],
    "reflection": "Which means of safety have I been receiving without remembering their Giver?",
    "practice": "Thank Al-Mu’min for one means of protection and use it responsibly today.",
    "arabicExcerpt": "فلا أمن في العالم إلا وهو مستفاد بأسباب هو متفرد بخلقها",
    "sourceNote": "Al-Mu’min: security, its created means, and guidance toward safety in the life to come. The reading does not promise immunity from worldly hardship; its prayer and practical response are original applications.",
    "verse": "59:23",
    "related": [
      "as-salam",
      "al-muhaymin"
    ],
    "editorialStatus": "source-informed draft"
  },
  {
    "id": "al-muhaymin",
    "name": "Al-Muhaymin",
    "arabic": "الْمُهَيْمِن",
    "meaning": "The Watchful Guardian",
    "theme": "trust",
    "art": "orchard",
    "aliases": [
      "guardian",
      "watchful",
      "preserver"
    ],
    "invitation": "His guardianship joins perfect knowledge, power, and preservation.",
    "takeaway": "His guardianship joins perfect knowledge, power, and preservation.",
    "introduction": "Allah watches over creation with complete knowledge and power. Al-Muhaymin is the Guardian of creatures, their actions, their provision, and their allotted lives.",
    "sections": [
      {
        "title": "Nothing escapes His knowledge",
        "paragraphs": [
          "Allah knows the reality of each creature and everything that concerns it. His guardianship does not depend on reports, appearances, or discovering what was previously hidden. The outward event and its inward reality are equally within His knowledge."
        ]
      },
      {
        "title": "Knowledge joined with power and care",
        "paragraphs": [
          "To know a need is not always to be able to meet it; to act once is not always to preserve what follows. In Allah, knowledge, complete power, and preservation belong together without limitation. This union gives Al-Muhaymin its particular meaning."
        ]
      },
      {
        "title": "Place your trust in His guardianship",
        "paragraphs": [
          "Bring an unspoken concern to the One who already knows it. Let His watchfulness also make you attentive to what He has entrusted to you. Tend your own intentions and responsibilities with care, without claiming knowledge of another person’s hidden heart."
        ]
      }
    ],
    "reflection": "What does it mean that Allah’s knowledge of me is joined with complete power and preservation?",
    "practice": "Entrust one concern to Al-Muhaymin, then attend carefully to one responsibility within your reach.",
    "arabicExcerpt": "أَنَّهُ الْقَائِم على خلقه بأعمالهم وأرزاقهم وآجالهم",
    "sourceNote": "Al-Muhaymin: guardianship through complete knowledge, power, and preservation. The source joins these three meanings before turning to care of the heart; the reflection and practical examples are original companion writing.",
    "verse": "59:23",
    "related": [
      "al-malik",
      "al-mumin"
    ],
    "editorialStatus": "source-informed draft"
  },
  {
    "id": "al-latif",
    "name": "Al-Latif",
    "arabic": "اللَّطِيف",
    "meaning": "The Subtly Kind",
    "theme": "gentleness",
    "art": "blossom",
    "invitation": "He knows the finest needs and meets them with subtle kindness.",
    "takeaway": "He knows the finest needs and meets them with subtle kindness.",
    "introduction": "Allah’s kindness reaches the hidden detail. Al-Latif joins knowledge of the most delicate needs with a gentle wisdom in bringing good to His creatures.",
    "sections": [
      {
        "title": "Nothing is too subtle to be known",
        "paragraphs": [
          "A need may be hidden within a need, or depend on details its bearer cannot recognise. Allah knows these fine realities completely. His knowledge extends beyond what appears urgent or obvious to the conditions through which a creature’s good becomes possible."
        ]
      },
      {
        "title": "Kindness in the way good arrives",
        "paragraphs": [
          "Al-Latif also concerns the manner in which good reaches its recipient. Provision can come through a long chain of quiet means, each fitting into a larger care. This Name joins subtle knowledge with gentleness in action; it means more than kindness of feeling alone."
        ]
      },
      {
        "title": "Notice and give thanks",
        "paragraphs": [
          "Trace an ordinary gift through some of the means that brought it to you, and thank Al-Latif. Let that remembrance make your own care more attentive to timing, tone, and privacy. Offer help gently, without claiming to know every hidden need."
        ]
      }
    ],
    "reflection": "What does the subtlety of Allah’s care teach me beyond the gift I first noticed?",
    "practice": "Follow one received kindness back through its quiet means, and thank Allah for what you can and cannot see.",
    "arabicExcerpt": "فإذا اجتمع الرفق في الفعل واللطف في الإدراك تم معنى اللطف",
    "sourceNote": "Al-Latif: knowledge of the finest needs joined with gentleness in bringing good to creatures. The source’s examples of nourishment and provision inform the reading; the observation and reflection prompts are original.",
    "verse": "42:19",
    "related": [
      "ar-rahim",
      "al-wadud"
    ],
    "editorialStatus": "source-informed draft"
  },
  {
    "id": "al-ghafur",
    "name": "Al-Ghafur",
    "arabic": "الْغَفُور",
    "meaning": "The All-Forgiving",
    "theme": "forgiveness",
    "art": "threshold",
    "invitation": "His forgiveness is complete and encompassing.",
    "takeaway": "His forgiveness is complete and encompassing.",
    "introduction": "Allah’s forgiveness is not a reluctant covering of a small part. Al-Ghafur names its fullness, alongside the repeated forgiveness named by Al-Ghaffar.",
    "sections": [
      {
        "title": "The fullness of forgiveness",
        "paragraphs": [
          "Allah knows the whole reality of a sin, including what other people cannot see. His forgiveness is therefore given with complete knowledge. Al-Ghafur draws attention to the thoroughness and breadth of that forgiveness, rather than treating pardon as an incomplete response to an only partly known fault."
        ]
      },
      {
        "title": "One forgiving Lord, several meanings",
        "paragraphs": [
          "Al-Ghaffar emphasises repeated forgiveness; Al-Ghafur its fullness. Al-‘Afuw, the Pardoner, brings attention to erasure. These related Names help you contemplate the generosity of the same Lord from different directions, without reducing His forgiveness to the limits of human patience."
        ]
      },
      {
        "title": "Return with hope and responsibility",
        "paragraphs": [
          "Bring a known wrong to Allah and ask for forgiveness. Stop what you can stop and repair what you owe. Hope in Al-Ghafur can make confession before Him more honest; it need not become either despair over yourself or indifference to another person’s rights."
        ]
      }
    ],
    "reflection": "Am I allowing the fullness of Allah’s forgiveness to give me courage for an honest return?",
    "practice": "Ask Al-Ghafur for complete forgiveness and begin one repair that is yours to make.",
    "arabicExcerpt": "فهو غفور بمعنى أنه تام المغفرة والغفران كاملها",
    "sourceNote": "Al-Ghafur: the fullness of forgiveness and its explicit distinction from the repetition expressed by Al-Ghaffar. Al-‘Afuw’s account of erasure supplies the related comparison. Repentance and restitution are contemporary applications, not translated instructions.",
    "verse": "39:53",
    "related": [
      "ar-rahman",
      "al-wadud"
    ],
    "editorialStatus": "source-informed draft"
  },
  {
    "id": "al-wadud",
    "name": "Al-Wadud",
    "arabic": "الْوَدُود",
    "meaning": "The Ever-Loving",
    "theme": "love",
    "art": "blossom",
    "invitation": "He wills good and bestows love’s gifts without need.",
    "takeaway": "He wills good and bestows love’s gifts without need.",
    "introduction": "Allah wills good for His servants and bestows honour and blessings. Al-Wadud names loving generosity free from the dependence and need of created love.",
    "sections": [
      {
        "title": "Love known through His giving",
        "paragraphs": [
          "Allah’s love is not a bodily inclination or an emotional need that creation must satisfy. Its meaning includes His willing good, honouring His servants, and bestowing blessings upon them. These gifts come from His perfection; they do not supply something absent from Him."
        ]
      },
      {
        "title": "Good beyond the relief of need",
        "paragraphs": [
          "Mercy draws attention to a recipient’s need and the good that meets it. Loving generosity can bestow good even without a prior distress to relieve. Read Al-Wadud beside Ar-Rahim to recognise both the care that answers need and the abundant goodness of the One who gives."
        ]
      },
      {
        "title": "Love Him and wish good for others",
        "paragraphs": [
          "Let a received blessing draw your attention toward Allah Himself. Thank Him, seek His nearness, and wish good for His creatures. Offer a sincere kindness without making the recipient responsible for your sense of worth or demanding affection in return."
        ]
      }
    ],
    "reflection": "What do Allah’s gifts teach me about loving generosity beyond the relief of need?",
    "practice": "Remember a blessing that went beyond bare necessity, and let gratitude become a moment of love for Allah.",
    "arabicExcerpt": "بل الإنعام على سبيل الابتداء من نتائج الود",
    "sourceNote": "Al-Wadud: willing good, honour, and blessings without bodily inclination or emotional dependence, and its distinction from mercy directed toward need. The personal response and suggested prayer are original companion writing.",
    "verse": "85:14",
    "related": [
      "ar-rahim",
      "al-latif"
    ],
    "editorialStatus": "source-informed draft"
  }
];

const byId = new Map([...earlierNames,...completeOne,...completeTwo,...completeThree,...completeFour].map(n=>[n.id,n]));
export const names = editionOrder.map((id,index)=>{
  const entry=byId.get(id);
  if(!entry)throw new Error(`Missing reading: ${id}`);
  return {...entry,number:index+1};
});
