import { useState } from 'react';
import { ArrowLeft, ArrowRight, CaretDown } from '@phosphor-icons/react';
import { useAppearance } from './Appearance';
import { IllustrationImage } from './Artwork';
import { seedIllustrations } from './illustrations';
import { visualStories } from './visualStories';

function Story({ seedId }: { seedId: number }) {
  const [step, setStep] = useState(0);
  const { pictures } = useAppearance();
  const moments = visualStories[seedId]!;
  const moment = moments[step];
  const frame = seedIllustrations[seedId]![moment.frame ?? 0];
  return <div className="visual-story-body">
    {pictures && <div className="visual-story-window"><div style={{ transformOrigin: moment.focus, transform: `scale(${moment.zoom})` }}><IllustrationImage frame={frame}/></div></div>}
    <div className="visual-story-copy" aria-live="polite" aria-atomic="true"><span className="seed-eyebrow">{step + 1} of {moments.length}</span><h3>{moment.title}</h3><p>{moment.text}</p></div>
    <div className="visual-story-controls"><button className="seed-icon-button" aria-label="Previous visual moment" disabled={step === 0} onClick={() => setStep(step - 1)}><ArrowLeft size={20}/></button><div role="group" aria-label="Visual moments">{moments.map((m, i) => <button key={m.title} aria-pressed={step === i} aria-label={`Moment ${i + 1}: ${m.title}`} onClick={() => setStep(i)}><span/></button>)}</div><button className="seed-text-link" onClick={() => setStep(step === moments.length - 1 ? 0 : step + 1)}>{step === moments.length - 1 ? 'Look again' : 'Next moment'}<ArrowRight size={18}/></button></div>
  </div>;
}
export default function VisualStory({ seedId }: { seedId: number }) {
  const [open, setOpen] = useState(false);
  if (!visualStories[seedId]) return null;
  return <details className="visual-story" id="seed-visual-story" onToggle={event => setOpen(event.currentTarget.open)}><summary><span>Look a little closer<small>A thought in three moments · Optional</small></span><CaretDown size={18}/></summary>{open && <Story seedId={seedId}/>}</details>;
}
