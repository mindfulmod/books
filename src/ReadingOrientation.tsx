import { useRef, useState } from 'react';
import type { Depth } from './systemTypes';

const steps = [
  { title: 'Forty books. One place to start.', text: 'The Ihya is a collection of forty books arranged in four quarters: Worship, Customs, Perils, and Deliverance. You can read in order or choose a question that matters to you. There is no need to take it all in at once.' },
  { title: 'Choose how much to explore.', text: 'Each Ihya passage offers three reading depths. These change the amount of explanation, not a difficulty score. Switch whenever you like using Depth on mobile or the reading tabs on a larger screen.' },
  { title: 'Start small. Come back easily.', text: 'Choose a book, open a section, and follow one idea. Your place is saved in this browser. Next time, Continue reading takes you back. The bookshelf also holds separate companions, each with its own reading controls.' },
];
const depths: { id: Depth; label: string; text: string }[] = [
  { id: 'glance', label: 'In brief', text: 'Start with the central idea and a short explanation.' },
  { id: 'deep', label: 'Go deep', text: 'Follow the reasoning, distinctions, and available interactive explorations.' },
  { id: 'sources', label: 'Grounding', text: 'Trace the reading to its sources and editorial notes.' },
];
export function ReadingOrientation({ onClose, onStart }: { onClose: () => void; onStart: (depth: Depth) => void }) {
  const [step, setStep] = useState(0);
  const [depth, setDepth] = useState<Depth>('glance');
  const title = useRef<HTMLHeadingElement>(null);
  const move = (next: number) => { setStep(next); requestAnimationFrame(() => title.current?.focus()); };
  return <section className="reading-orientation" aria-labelledby="orientation-title">
    <div className="orientation-top"><span>Getting started · {step + 1} of 3</span><button onClick={onClose}>Skip introduction</button></div>
    <h2 id="orientation-title" ref={title} tabIndex={-1}>{steps[step].title}</h2>
    <p>{steps[step].text}</p>
    {step === 0 && <div className="orientation-quarters" aria-label="Four quarters, ten books each">{['Worship', 'Customs', 'Perils', 'Deliverance'].map((name,i)=><span key={name}><small>0{i+1}</small>{name}<em>10 books</em></span>)}</div>}
    {step === 1 && <fieldset className="orientation-depths"><legend>Choose a starting depth</legend>{depths.map(item=><label key={item.id} className={depth===item.id?'selected':''}><input type="radio" name="starting-depth" value={item.id} checked={depth===item.id} onChange={()=>setDepth(item.id)}/><span><strong>{item.label}</strong><small>{item.text}</small></span></label>)}</fieldset>}
    {step === 2 && <p className="orientation-choice">Your starting depth: <strong>{depths.find(item=>item.id===depth)?.label}</strong>. You can change it while reading.</p>}
    <div className="orientation-actions">{step > 0 && <button onClick={()=>move(step-1)}>Back</button>}{step < 2 ? <button className="home-primary" onClick={()=>move(step+1)}>Next</button> : <><button onClick={onClose}>Browse the bookshelf</button><button className="home-primary" onClick={()=>onStart(depth)}>Begin with the Heart</button></>}</div>
  </section>;
}
