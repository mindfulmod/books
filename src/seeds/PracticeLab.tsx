import { useState } from 'react';
import { ArrowRight, Check, Leaf, Sun, Drop, Heart, HandHeart } from '@phosphor-icons/react';
import type { ThemeId } from './content';
import { pathGuidance } from './pathGuidance';

const trustCards = [
  { text: 'Prepare carefully', own: true, why: 'You can choose to prepare. Give the work your time and attention.' },
  { text: 'Make everyone approve', own: false, why: 'You can be thoughtful, but you cannot make every person agree with you.' },
  { text: 'Ask for useful help', own: true, why: 'You can ask someone for useful help. This is one step you can take.' },
  { text: 'Guarantee the outcome', own: false, why: 'You can do your part, but you cannot decide everything that will happen.' },
];

export default function PracticeLab({ theme, seedId }: { theme: ThemeId; seedId: number }) {
  const [choice, setChoice] = useState(0);
  const [answer, setAnswer] = useState<boolean | null>(null);
  const [blessings, setBlessings] = useState(['', '', '']);
  const practice = pathGuidance[seedId]?.activity;
  if (practice) return <div className="seed-lab lab-guided"><h3>{practice.title}</h3><p>Take these steps in your mind. There is nothing you need to write.</p><div className="lab-statement-choices">{practice.steps.map((step, index) => <button key={step.label} aria-pressed={choice === index} onClick={() => setChoice(index)}><span>0{index + 1}</span>{step.label}<ArrowRight size={17}/></button>)}</div><div className="lab-response" aria-live="polite"><strong>{practice.steps[choice].label}</strong><p>{practice.steps[choice].text}</p></div></div>;
  if (seedId === 1) {
    const parts = [
      { label: 'The dog', heading: 'An attack that is hard to fight alone.', text: 'In the story, a dog threatens to attack a person. It is a picture of Satan trying to harm or mislead someone.' },
      { label: 'The shepherd’s help', heading: 'Ask the one who can hold it back.', text: 'The shepherd can restrain his dog. The comparison explains why the believer asks Allah to protect them from Satan, rather than relying only on their own strength.' },
      { label: 'Your response', heading: 'Seek refuge in Allah.', text: 'Seeking refuge means asking for protection. The passage encourages you to turn to Allah for that protection when Satan tries to lead you away from what is right.' },
    ];
    return <div className="seed-lab lab-refuge"><span className="seed-eyebrow">Understand the comparison · Entry 1</span><h3>Who can give protection?</h3><p>Select a part of the story to understand what it explains.</p><div className="lab-statement-choices">{parts.map((part, i) => <button key={part.label} aria-pressed={choice === i} onClick={() => setChoice(i)}><span>0{i + 1}</span>{part.label}<ArrowRight size={17}/></button>)}</div><div className="lab-response" aria-live="polite"><strong>{parts[choice].heading}</strong><p>{parts[choice].text}</p></div></div>;
  }
  if (seedId === 48) {
    return <div className="seed-lab lab-plant"><span className="seed-eyebrow">Explore the image · Entry 48</span><h3>Living things can bend.</h3><p>The hadith compares a believer facing troubles with a green plant in the wind. Watch how the plant moves.</p><div className="plant-scene"><svg viewBox="0 0 480 240" role="img" aria-label={choice === 0 ? 'An upright green plant in a quiet garden' : 'The same rooted green plant bending in a gust of wind'}><defs><linearGradient id="plant-sky" x2="0" y2="1"><stop stopColor="#e3f0f1"/><stop offset="1" stopColor="#f7f7e3"/></linearGradient></defs><rect width="480" height="240" rx="9" fill="url(#plant-sky)"/><circle cx="385" cy="49" r="24" fill="#f6df9c"/><path d="M0 219Q115 200 238 220T480 215V240H0" fill="#d5e1b9"/><g className={`plant-stem ${choice ? 'in-wind' : ''}`}><path d="M242 222Q231 163 248 71" fill="none" stroke="#688548" strokeWidth="4" strokeLinecap="round"/><path d="M244 114C208 111 194 81 199 61C232 59 251 85 244 114" fill="#88a864"/><path d="M241 152C265 120 299 121 307 109C301 150 271 169 241 152" fill="#759658"/><path d="M238 187C204 184 186 163 178 140C211 131 240 153 238 187" fill="#aac380"/><path d="M249 77C248 50 265 37 278 32C287 60 271 79 249 77" fill="#a6bf71"/></g>{choice > 0 && <g className="plant-wind" fill="none" stroke="#92b5b8" strokeWidth="2" strokeLinecap="round"><path d="M40 84H153Q178 84 173 66"/><path d="M18 105H133"/><path d="M61 126H159Q183 126 188 112"/></g>}<path d="M243 221L224 236M243 221L258 236" stroke="#7d9260" strokeWidth="2" fill="none"/></svg></div><div className="lab-choices"><button aria-pressed={choice === 0} onClick={() => setChoice(0)}>A quieter moment</button><button aria-pressed={choice === 1} onClick={() => setChoice(1)}>A gust of wind</button></div><div className="lab-response" aria-live="polite"><strong>{choice === 0 ? 'The plant stands straight.' : 'The plant bends in the wind.'}</strong><p>{choice === 0 ? 'When the wind is still, the green plant stands again. In the comparison, a believer returns to steadiness after being disturbed by a trial.' : 'The wind moves the plant’s leaves. In the comparison, trials disturb a believer. Being moved by a trial is part of the example itself.'}</p></div></div>;
  }
  if (seedId === 108) {
    const ways = [
      ['Read with reflection', 'Choose a Quranic passage and spend time understanding its meaning. Let one meaning stay with you after the reading.'],
      ['Protect the foundations', 'First care for the worship Allah requires. Then consider an extra act of worship you can keep doing.'],
      ['Remember throughout the day', 'The book names your time, heart, and deeds. Think of one moment during your day when you could remember Allah.'],
      ['Choose what Allah loves', 'Think of a time when what you want conflicts with what pleases Allah. What would help you obey Him?'],
      ['Reflect on the Names', 'Learn the meaning of one of Allah’s Names, then think about it when you make dua.'],
      ['Notice the gifts', 'Name a gift from Allah that you often overlook. How could you thank Him and use it well?'],
      ['Bring a humble heart', 'Remember your need for Allah as you worship Him. Ask Him to soften your heart.'],
      ['Make space for private worship', 'The book names the last third of the night for private worship, Quran reading, and dua. It says to end with repentance and asking forgiveness.'],
      ['Seek sincere company', 'Think of people whose words and actions help you remember Allah. What could you learn by spending time with them?'],
      ['Notice the barriers', 'Notice something that keeps pulling you away from Allah. What could you change to reduce its place in your life?'],
    ];
    return <div className="seed-lab lab-ten-ways"><span className="seed-eyebrow">Explore the whole list · Entry 108</span><h3>Ten ways to nurture closeness.</h3><p>Choose a way to look at more closely. Begin with one that fits your life.</p><div className="ten-ways-grid">{ways.map(([label], i) => <button key={label} aria-pressed={choice === i} onClick={() => setChoice(i)}><span>{String(i + 1).padStart(2, '0')}</span>{label}</button>)}</div><div className="lab-response" aria-live="polite"><strong>{ways[choice][0]}</strong><p>{ways[choice][1]}</p></div></div>;
  }
  if (theme === 'trust') {
    const item = trustCards[choice];
    return <div className="seed-lab lab-trust"><span className="seed-eyebrow">Try the distinction</span><h3>Effort in your hands.<br/>Trust Allah with the result.</h3><p>Where does this belong?</p><div className="lab-sort-card" key={choice}>{item.text}</div><div className="lab-choices"><button aria-pressed={answer === true} onClick={() => setAnswer(true)}>Mine to do</button><button aria-pressed={answer === false} onClick={() => setAnswer(false)}>Not mine to decide</button></div><div className="lab-response" aria-live="polite">{answer !== null ? <><strong>{answer === item.own ? 'That’s right.' : 'Look a little closer.'}</strong><p>{item.why}</p><button className="seed-text-button" onClick={() => { setChoice((choice + 1) % trustCards.length); setAnswer(null); }}>Try another <ArrowRight size={16}/></button></> : <p>Choose a side to explore the difference.</p>}</div></div>;
  }
  if (theme === 'hope') {
    const options = [
      { label: 'I feel sad.', heading: 'A feeling can be named.', text: 'Entry 103 describes prophets who felt deep sadness. You can tell Allah about your sadness and ask for help.' },
      { label: 'I must be failing.', heading: 'Sadness does not prove weak faith.', text: 'This thought adds a judgment about your faith. Entries 15 and 47 describe sadness in the lives of prophets and believers. Feeling sad does not by itself prove that you are failing.' },
      { label: 'I can ask for care.', heading: 'A next step is still available.', text: 'You could speak honestly to Allah in dua or talk to someone you trust. You can take a useful step while you still feel sad.' },
    ];
    return <div className="seed-lab lab-hope"><span className="seed-eyebrow">Make a little room</span><h3>A feeling.<br/>A story. A next step.</h3><p>Notice what changes between these three statements.</p><div className="lab-statement-choices">{options.map((o, i) => <button key={o.label} aria-pressed={choice === i} onClick={() => setChoice(i)}><span>0{i + 1}</span>{o.label}<ArrowRight size={17}/></button>)}</div><div className="lab-response" aria-live="polite"><strong>{options[choice].heading}</strong><p>{options[choice].text}</p></div></div>;
  }
  if (theme === 'gratitude') {
    return <div className="seed-lab lab-gratitude"><span className="seed-eyebrow">Look again</span><h3>Three ordinary gifts.</h3><p>Think of one for each prompt. Nothing needs to be impressive.</p><div className="gratitude-fields">{['Something that supported you', 'Someone whose care reached you', 'Something you can use for good'].map((text, i) => <label key={text}><span>0{i + 1} · {text}</span><input maxLength={180} value={blessings[i]} onChange={e => setBlessings(old => old.map((v, j) => j === i ? e.target.value : v))} placeholder="A small, specific thing…"/></label>)}</div><p className="lab-response">{blessings.filter(v => v.trim()).length === 3 ? 'Choose one gift and one way to care for it. You can keep it in your reflection.' : 'Notice what you have been given and think of a way to use it well.'}</p><small>This exercise isn’t saved. Write anything you want to keep in your reflection.</small></div>;
  }
  if (theme === 'return') {
    const steps = [
      { label: 'Notice', title: 'Be clear about what you did.', text: 'If you spoke harshly, name that action honestly. Knowing what you did wrong helps you decide what needs to change.' },
      { label: 'Turn', title: 'Choose a way to stop repeating it.', text: 'Ask Allah for forgiveness. Think about what leads you into the same mistake, and choose something you can change.' },
      { label: 'Repair', title: 'Care about the person affected.', text: 'If you harmed someone, think about how to put it right. You may need to return what you took, correct a false statement, or change how you treat them.' },
    ];
    return <div className="seed-lab lab-return"><span className="seed-eyebrow">Regret with a direction</span><h3>A beginning you can act on.</h3><div className="lab-steps">{steps.map((s, i) => <button aria-pressed={choice === i} onClick={() => setChoice(i)} key={s.label}><span>{i + 1}</span>{s.label}{i < 2 && <ArrowRight size={14}/>}</button>)}</div><div className="lab-response" aria-live="polite"><strong>{steps[choice].title}</strong><p>{steps[choice].text}</p></div><small>This helps you reflect on turning back after a mistake. It isn’t a complete guide to repentance.</small></div>;
  }
  if (theme === 'presence') {
    const ways = [
      { icon: <Sun/>, title: 'Before', heading: 'Make a little space.', text: 'Put aside one distraction. Arrive at the prayer or reading with a moment to remember what you are about to do.' },
      { icon: <Leaf/>, title: 'During', heading: 'Think about one meaning.', text: 'Think about the meaning of a word or verse in your prayer. If your mind wanders, bring your attention back to what you are saying.' },
      { icon: <Drop/>, title: 'After', heading: 'Carry one thing with you.', text: 'Think of one good action you could take after prayer. How could your worship change the way you treat someone?' },
    ];
    return <div className="seed-lab lab-presence"><span className="seed-eyebrow">A rhythm of attention</span><h3>Before, during, and after prayer.</h3><div className="presence-cycle">{ways.map((w, i) => <button aria-pressed={choice === i} onClick={() => setChoice(i)} key={w.title}>{w.icon}<span>{w.title}</span></button>)}</div><div className="lab-response" aria-live="polite"><strong>{ways[choice].heading}</strong><p>{ways[choice].text}</p></div></div>;
  }
  return <div className="seed-lab lab-kindness"><span className="seed-eyebrow">Look beneath the action</span><h3>The same kindness.<br/>A different audience.</h3><p>Imagine helping someone with a task. Change who knows.</p><div className="lab-choices"><button aria-pressed={choice === 0} onClick={() => setChoice(0)}><HandHeart size={19}/> Everyone sees</button><button aria-pressed={choice === 1} onClick={() => setChoice(1)}><Heart size={19}/> No public credit</button></div><div className="lab-response" aria-live="polite"><strong>{choice === 0 ? 'What are you hoping comes back?' : 'What still makes the action worth doing?'}</strong><p>{choice === 0 ? 'Being praised can feel good. But are you helping because the person needs you, or mainly because other people are watching?' : 'The person still receives help even when nobody praises you. Wanting to please Allah can guide your action when no one else knows about it.'}</p><p className="lab-gentle"><Check size={16}/> Be honest about your reasons, then work on them.</p></div></div>;
}
