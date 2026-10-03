export type VisualMoment = { title: string; text: string; focus: string; zoom: number; frame?: number };
// Ordinary objects help explain a thought; none depicts a person named in the source or the unseen.
export const visualStories: Partial<Record<number, VisualMoment[]>> = {
  4: [
    { title: 'A falling leaf', text: 'Look at the leaf above the soil. Allah knows even the small things you might walk past.', focus: '50% 35%', zoom: 1.5 },
    { title: 'A hidden grain', text: 'The grain lies beneath the surface. What is hidden from your eyes is still known to Allah.', focus: '50% 90%', zoom: 1.7 },
    { title: 'Every part of your life', text: 'Your private worries and quiet efforts are not outside His knowledge. Bring them to Him.', focus: '50% 50%', zoom: 1 },
  ],
  30: [
    { title: 'Begin at the roots', text: 'The roots hold and nourish the tree. Give care to the faith and sincerity in your heart.', focus: '50% 90%', zoom: 1.65 },
    { title: 'Look for the fruit', text: 'The fruit grows from what supports the tree. Let your faith shape a good action someone can benefit from.', focus: '50% 8%', zoom: 1.6 },
    { title: 'Care for both', text: 'Keep learning and caring for your heart. Put that care into your choices today.', focus: '50% 50%', zoom: 1 },
  ],
  46: [
    { title: 'Leave the nest', text: 'The birds set out in the morning. Trust does not mean giving up the effort you can make.', focus: '50% 50%', zoom: 1, frame: 0 },
    { title: 'Return after the effort', text: 'They come home in the evening. Make an effort and rely on Allah for provision.', focus: '50% 50%', zoom: 1, frame: 1 },
    { title: 'Your next step', text: 'What useful step is available to you today? Begin there and ask Allah for help.', focus: '50% 50%', zoom: 1, frame: 0 },
  ],
  48: [
    { title: 'Bend without losing your roots', text: 'The young plant bends in the breeze. A hard day can shake you without taking away your faith.', focus: '26% 50%', zoom: 1.5 },
    { title: 'Land gently', text: 'The bee rests on the flower without breaking it. Try to bring care into the places and lives you touch.', focus: '82% 65%', zoom: 1.6 },
    { title: 'Steady and gentle', text: 'Hold to your faith through difficulty, and treat others gently along the way.', focus: '50% 50%', zoom: 1 },
  ],
  55: [
    { title: 'What still needs care?', text: 'A young shoot is growing beside the empty pot. Something useful is still possible today.', focus: '67% 73%', zoom: 1.55 },
    { title: 'Take up a useful task', text: 'The gloves and watering can are ready. Turn toward an action you can take instead of replaying an imagined past.', focus: '15% 75%', zoom: 1.6 },
    { title: 'Begin with one step', text: 'Ask Allah for help. Choose one useful thing and give it your effort.', focus: '50% 50%', zoom: 1 },
  ],
  77: [
    { title: 'Put the reply on pause', text: 'The phone is face down. Give yourself a moment before words leave you.', focus: '58% 83%', zoom: 1.4 },
    { title: 'Make room to think', text: 'The open window offers a little breathing room. Consider whether your words should be said or whether silence would be better.', focus: '55% 22%', zoom: 1.4 },
    { title: 'Then choose your words', text: 'Let your judgment guide your tongue. You can be honest and careful at the same time.', focus: '50% 50%', zoom: 1 },
  ],
  109: [
    { title: 'Acknowledge the loss', text: 'One pot is broken. You do not have to pretend that losing something does not hurt.', focus: '17% 80%', zoom: 1.5 },
    { title: 'Notice what remains', text: 'Living plants still need care beside it. Look gently for a part of today that you can still tend.', focus: '67% 57%', zoom: 1.4 },
    { title: 'Give yourself time', text: 'Let grief have room, bring your need to Allah, and choose one useful activity when you can.', focus: '50% 50%', zoom: 1 },
  ],
};
