import type { ThemeId } from './content';

// App-written prompts and activities for the six introductory paths.
// The book passages and source credits are deliberately kept elsewhere.
type Step = { label: string; text: string };
type Guidance = { question: string; captions: string[]; onward?: string; activity?: { title: string; steps: Step[] } };
const activity = (title: string, ...steps: [string, string][]) => ({ title, steps: steps.map(([label, text]) => ({ label, text })) });
export const pathGuidance: Record<number, Guidance> = {
  15: {
    question: 'What sadness could you bring to Allah without blaming yourself for feeling it?',
    captions: ['The tissues beside the prayer mat leave room for tears as well as prayer.'],
    onward: 'If guilt is weighing on you too, make room for hope in forgiveness.',
    activity: activity('Make room for how you feel.', ['Name it', 'Quietly name what hurts. You do not have to make it sound smaller than it is.'], ['Drop the extra judgment', 'Notice whether you have added “I should not feel this if I have faith.” Sadness alone does not tell you the strength of your faith.'], ['Ask for help', 'Bring this sadness to Allah in your own words. You can also ask someone you trust for care.']),
  },
  50: {
    question: 'Is there a mistake you have felt too ashamed to ask Allah to forgive?',
    captions: ['The wide sky gives a sense of space when your mistakes feel overwhelming.'],
    onward: 'You can bring your pain to Allah as honestly as you bring your regret.',
    activity: activity('Turn shame into a beginning.', ['Notice the barrier', 'Think of a wrong you need to leave behind. Notice if shame is stopping you from asking for forgiveness.'], ['Ask sincerely', 'Ask Allah to forgive you. You do not need to wait until you feel beyond reproach to turn to Him.'], ['Choose a change', 'Choose one step that helps you stop the wrong. If someone was harmed, think about how to put that harm right.']),
  },
  103: {
    question: 'What could you bring honestly to Allah without hiding your sadness or giving up hope?',
    captions: ['The cloth and water on the bench suggest a pause for care along a difficult walk.'],
    onward: 'Let hope become a steady way of living, at a pace you can keep.',
    activity: activity('Speak honestly in dua.', ['Name the pain', 'Think of one thing that has been hard to carry. You can be honest about it when you ask Allah for help.'], ['Name your need', 'What are you asking for: help, forgiveness, patience, or something else? Put that need into your own words.'], ['Leave room for time', 'You may still feel sad after making dua. Keep asking for help without demanding that you must feel better immediately.']),
  },
  95: {
    question: 'What small act of worship could you keep returning to without overwhelming yourself?',
    captions: ['The path and resting place suggest a pace you can keep.', 'The same path in afternoon light is a reminder to return through the day.', 'The path remains under the stars: steadiness can include quiet moments at night.'],
    activity: activity('Choose a steady rhythm.', ['Start with your duties', 'Notice whether you are giving your required worship the care it needs before adding more.'], ['Keep it manageable', 'Choose one extra good action that fits your day. Make it something you can return to, rather than a plan that exhausts you.'], ['Give it a place', 'Connect that action to a familiar part of your day. If you miss it, begin again without piling on more.']),
  },
  46: {
    question: 'What useful step could you take while relying on Allah for the result?',
    captions: ['The birds leave their nest to look for food: trust includes making an effort.', 'The birds return after seeking food, completing the day shown in the hadith.'],
    onward: 'After choosing an effort, separate your responsibility from what you cannot control.',
    activity: activity('Give your worry a useful next step.', ['Name the worry', 'Choose one concern that is taking up your attention. Keep it specific.'], ['Find your effort', 'What can you actually do: prepare, ask for help, apply, or have a conversation? Choose one useful step.'], ['Trust with the result', 'Ask Allah for help as you take that step. Your effort matters even though you cannot guarantee its result.']),
  },
  33: {
    question: 'What is yours to do today, and what result are you trying to control?',
    captions: ['The flowing stream cannot be held still. It pictures the limits of trying to control everything.'],
    onward: 'The same distinction can help when you are worried about what already happened.',
    activity: activity('Separate effort from control.', ['Choose your responsibility', 'Name something that is yours to do, such as preparing honestly or making time for worship.'], ['Notice the limit', 'Name a result you cannot force, such as another person’s response. Notice the difference between influence and control.'], ['Return to your part', 'Give your attention to the responsibility you named. Ask Allah for help with what lies beyond it.']),
  },
  55: {
    question: 'What useful action is available now, even though you cannot change the past?',
    captions: ['The tools beside the new plants point toward work that can still be done.'],
    onward: 'Even with useful action, hardship can shake you. The next seed makes room for that.',
    activity: activity('Find the good you can still do.', ['Notice the replay', 'Bring to mind one “if only” thought that keeps returning. You can learn from a mistake without replaying it endlessly.'], ['Keep the lesson', 'What can you learn or repair? Name something useful that does not depend on changing the past.'], ['Act now', 'Choose one next action and ask Allah for help taking it. Give that action your attention.']),
  },
  48: {
    question: 'When a difficulty shakes you, what helps you regain steadiness without taking it out on others?',
    captions: ['The bee lands gently while the plant bends in the wind: gentleness and steadiness share one picture.'],
  },
  69: {
    question: 'What could help you remember Allah’s greatness at the start of your next prayer?',
    captions: ['The prayer space beside the open window invites a pause before beginning.'],
    onward: 'Carry that attention beyond prayer through remembrance during the day.',
    activity: activity('Arrive at your next prayer.', ['Make space', 'Put aside one distraction you can control, such as a nearby phone.'], ['Remember whom you face', 'Before you begin, remember that you are standing before Allah. Allahu akbar means Allah is greater.'], ['Return your attention', 'If your thoughts wander, bring your attention back to the words and their meaning.']),
  },
  24: {
    question: 'When could you pause today to remember Allah with attention?',
    captions: ['Water reaching dry soil pictures regular care for a heart that feels hard.'],
    onward: 'Give the same care to a passage of the Quran.',
    activity: activity('Give remembrance a moment.', ['Choose a moment', 'Find a familiar pause in your day when you could remember Allah.'], ['Give it attention', 'Use a remembrance you know and think about its meaning. Let this be more than rushing through words.'], ['Carry it into an action', 'Think of one good action that could follow, such as receiving advice more gently or helping someone.']),
  },
  19: {
    question: 'What could help you think about a Quran passage instead of rushing past it?',
    captions: ['The envelope beside the book recalls the care you would give a personal letter.'],
    onward: 'The final seed offers more ways to give closeness to Allah a place in daily life.',
    activity: activity('Stay with one meaning.', ['Read carefully', 'Choose a short Quran passage. Read it slowly, using a reliable explanation to help with meanings you do not understand.'], ['Pause', 'What does it teach, ask of you, or remind you of? Do not rush to the next passage.'], ['Respond', 'Choose one way that meaning could shape how you act today.']),
  },
  108: {
    question: 'Which practice needs more attention in your life, and what small step would help?',
    captions: ['The book and prayer mat make room for learning, worship, and remembrance in an ordinary day.'],
  },
  10: {
    question: 'What is one step you can take to turn back to Allah today?',
    captions: ['The footprints change direction toward the garden, picturing a return after a wrong turn.'],
    onward: 'Let regret help you make that return, instead of keeping you away.',
    activity: activity('Change direction today.', ['Name it honestly', 'Think of a wrong you need to stop. You can be honest with yourself without writing it down here.'], ['Turn back', 'Ask Allah for forgiveness and choose to leave that wrong behind.'], ['Change one thing', 'Notice what leads you toward repeating it. Choose a practical change that supports your return.']),
  },
  74: {
    question: 'What could turn your regret into a real step of repentance?',
    captions: ['The drop reaching a young shoot pictures the passage’s image of repentance as rain.'],
    onward: 'If you stumble again, keep returning rather than giving up.',
    activity: activity('Give regret a direction.', ['Notice the regret', 'Think about what you wish you had done differently. Let yourself take responsibility.'], ['Seek forgiveness', 'Ask Allah to forgive you. Shame does not have to keep you away from Him.'], ['Make a repair', 'If someone was harmed, identify a suitable way to put it right. Let regret lead to a change in how you act.']),
  },
  78: {
    question: 'What would a sincere return to Allah look like for you today?',
    captions: ['The open window and waiting prayer mat suggest an opportunity to return.'],
    onward: 'Make space for that return in an ordinary evening review of your day.',
    activity: activity('Begin again while you can.', ['Notice the delay', 'Is there something you keep putting off making right? Name it privately.'], ['Return now', 'Turn away from the wrong and ask Allah for forgiveness today. You do not need to wait for a special date.'], ['Support the change', 'Choose a boundary or a source of support that can help you avoid repeating it.']),
  },
  70: {
    question: 'What would you thank Allah for and ask Him to forgive when you review today?',
    captions: ['The journal beside the bed places a quiet review at the end of the day.'],
    activity: activity('Look back before sleep.', ['Notice the good', 'Recall one good thing you did or received today. Thank Allah for it.'], ['Take responsibility', 'Recall where you went wrong. Ask Allah for forgiveness and consider any harm that needs repair.'], ['Prepare for tomorrow', 'Choose one change you want to make tomorrow. Keep it specific enough to act on.']),
  },
  37: {
    question: 'What everyday gift have you been using without stopping to thank Allah for it?',
    captions: ['The cup, leaves and open view invite you to notice familiar things with fresh attention.'],
    onward: 'Look next at the everyday gifts that support your life.',
    activity: activity('Notice one familiar gift.', ['Pause', 'Choose something you often take for granted. It might be water, support from someone, or an ability you use.'], ['Notice its place', 'Think about one way this gift helps you through an ordinary day.'], ['Give thanks', 'Thank Allah for it. Choose a way to care for it or use it well.']),
  },
  38: {
    question: 'Which blessing is supporting you today, even if other things are difficult?',
    captions: ['The meal, shoes and secure doorway gather the reading’s everyday gifts into one room.'],
    onward: 'Contentment also grows from the faith and actions of the heart.',
    activity: activity('Recognize what supports you.', ['Look at today', 'Notice any food, safety, or health you have today. You do not have to pretend every need has been met.'], ['Name its value', 'Choose one of those gifts and think about what it makes possible in your day.'], ['Respond with care', 'Thank Allah for it, then consider one way to care for it or help someone who needs it.']),
  },
  30: {
    question: 'What good action could grow from your faith today?',
    captions: ['The visible roots and fruit connect firm faith with the good actions it supports.'],
    onward: 'Carry that inner richness with you as circumstances change.',
    activity: activity('Connect a root to a fruit.', ['Remember the root', 'Think about your belief in Allah and why it matters to how you live.'], ['Choose a fruit', 'Choose one good action that could grow from that belief today, such as keeping a promise or helping someone.'], ['Make it concrete', 'Decide when and how you will do it. Let faith shape a choice you can actually make.']),
  },
  76: {
    question: 'How could you practice thankfulness or patience in the circumstances you have today?',
    captions: ['Leaves at different stages picture changing circumstances; the crystal suggests something lasting.'],
    activity: activity('Meet the season you are in.', ['Name the circumstances', 'Notice something that has changed in your life. You can acknowledge both ease and difficulty.'], ['Find a response', 'What calls for thanks? What calls for patience and asking Allah for help? Both may belong in the same day.'], ['Choose one action', 'Choose a small act of thankfulness or a useful step through the difficulty you named.']),
  },
  12: {
    question: 'Who needs help with something you could do today?',
    captions: ['Food waiting at a doorway pictures kindness that meets a practical need.'],
    onward: 'Once you have chosen a helpful action, look at the intention behind it.',
    activity: activity('Make your help useful.', ['Notice a need', 'Think of someone who may need help with food, a task, or a worry.'], ['Check what helps', 'Ask what would be useful rather than assuming. Offer something you can realistically do.'], ['Follow through gently', 'Choose when to help. Give the person care and patience as well as the practical action.']),
  },
  58: {
    question: 'What would make a kind action worth doing even if nobody praised you for it?',
    captions: ['The parcels look alike from outside. The reasons for giving them may be different.'],
    onward: 'Let the same care guide how you speak to people.',
    activity: activity('Look beneath a good action.', ['Choose an action', 'Think of one helpful thing you plan to do.'], ['Notice your reason', 'What are you hoping for: Allah’s pleasure, someone’s praise, or both? Be honest about what is pulling you.'], ['Renew your intention', 'Turn your intention toward pleasing Allah and meeting the person’s need, even if no one applauds.']),
  },
  77: {
    question: 'What could you ask yourself before your next difficult reply?',
    captions: ['The face-down phone leaves a pause between receiving a message and replying.'],
    onward: 'Good company can help you keep practicing that care.',
    activity: activity('Give a reply a little space.', ['Pause', 'Think of a message or conversation that makes you want to answer quickly. Take a moment before replying.'], ['Consider', 'Is what you want to say true, useful, and appropriate to say now? Could silence or a calmer reply be better?'], ['Choose your words', 'Try a response that is honest without being needlessly hurtful. You can practice it in your mind.']),
  },
  87: {
    question: 'Who helps you remember Allah and make better choices, and how could you be that kind of friend too?',
    captions: ['The two chairs make room for company; the question is what that company encourages.'],
    activity: activity('Care for a good friendship.', ['Notice the influence', 'Think of someone whose company helps you remember Allah and act well. What do they encourage in you?'], ['Make room', 'Choose a small way to spend time with or learn from that person.'], ['Offer it back', 'Think of how you could be trustworthy, caring company for them too.']),
  },
};

export const pathClosings: Record<ThemeId, string> = {
  hope: 'Make room for sadness, keep hope in forgiveness, speak honestly to Allah, and return to steady worship. Choose one of these to carry into today.',
  trust: 'Make an effort, know its limits, act on what is still possible, and give yourself room to regain steadiness. Take one useful step with trust in Allah.',
  presence: 'Give prayer your attention, remember Allah during the day, read the Quran with care, and put love into practice. Begin with one familiar moment.',
  return: 'Turn back, let regret lead to repair, keep seeking forgiveness, and review your day honestly. You can begin that return today.',
  gratitude: 'Notice everyday gifts, value what supports you, let faith grow into good actions, and stay thankful as life changes. Choose one gift to care for today.',
  kindness: 'Meet a real need, check your intention, pause before speaking, and care for good company. Choose one useful act of kindness today.',
};
