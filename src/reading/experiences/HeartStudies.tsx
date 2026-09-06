import { useState } from 'react';
import { Choices, Reading, Study } from './Study';
const obstructions = [
 ['Unformed','The surface is not ready','The iron has not yet been made into a mirror. Ghazali compares this with a capacity that has not yet developed.'],
 ['Clouded','The form is obscured','A finished mirror can lose its clarity. The text compares this with the clouding effect of sins and appetites.'],
 ['Turned away','Clear, but facing elsewhere','A sound mirror cannot show what it does not face. Attention can be occupied elsewhere even in an otherwise disciplined life.'],
 ['Veiled','Something stands between','The mirror and object remain in place, but a barrier prevents the likeness from appearing.'],
 ['Direction unknown','The bearer cannot find the angle','This differs from looking elsewhere: the bearer does not know where to direct the mirror.'],
];
export function MirrorStudy() {
 const [selected,setSelected]=useState(2); const [clear,setClear]=useState(false);
 const item=obstructions[selected];
 return <Study eyebrow="Heart · the image of knowing" title="What keeps the mirror from seeing?" intro="Keep the object in view. Change what happens at the mirror, and notice why polishing alone cannot address every obstruction." sources={[["The mirror and five obstructions · III, 13",759]]} note="The passage separates the heart, the reality known, and the likeness appearing in the heart. It then names five ways the mirror can fail. The shapes here illustrate that analogy." question="A mirror is perfectly polished but faces the wrong way. What is missing?" answer="Direction. Clarity and attention are distinct. The object and the mirror can both exist without the likeness appearing.">
  <div className="study-mirror-instrument">
   <div className={`study-mirror-scene study-mirror-case-${clear?'clear':selected}`} role="img" aria-label={clear?'Comparison: a prepared mirror receives the likeness of the object':`${item[0]} mirror: ${item[1]}`}>
    <div className="study-mirror-object"><span>◇</span><small>The object</small></div><div className="study-mirror-ray"/>
    <div className="study-mirror-glass"><span>◇</span></div><div className="study-mirror-veil"/><small className="study-mirror-label">The mirror</small>
   </div>
   <Choices label="Choose a mirror obstruction" items={obstructions.map(x=>x[0])} value={selected} onChange={i=>{setSelected(i);setClear(false);}}/>
   <button className="study-reveal" aria-pressed={clear} onClick={()=>setClear(!clear)}>{clear?'Return to the obstruction':'Compare with a receiving mirror'} <span aria-hidden="true">↔</span></button>
  </div>
  <Reading label={clear?'Comparison':`Obstruction ${selected+1} of 5`} title={clear?'The likeness appears':item[1]}><p>{clear?'The object itself does not enter the mirror. Its likeness appears there: this is the relation Ghazali uses to explain knowing.':item[2]}</p></Reading>
 </Study>;
}
const thoughts = [
 ['Prompting','Something occurs','An image or possibility arrives unbidden. Arrival alone is not a settled intention.','Outside choice'],
 ['Inclination','A pull follows','Desire stirs in response. An inclination can be present without a decision to act.','Outside choice'],
 ['Judgment','“This should be done”','Ghazali distinguishes voluntary judgment from what is involuntary. Responsibility depends on that distinction.','Choice must be distinguished'],
 ['Resolve','An intention settles','The person determines to act. The text then distinguishes abandoning it for God from being prevented by an obstacle.','A settled intention'],
];
export function ThoughtStudy() {
 const [stage,setStage]=useState(0); const item=thoughts[stage];
 return <Study eyebrow="Heart · before a limb moves" title="An arrival is not yet a decision." intro="Follow four states of the heart. Each step asks a different question about choice." sources={[["The sequence begins · III, 41",787],["Choice, resolve, and refraining · III, 42",788]]} note="The passage distinguishes four states, then considers accountability separately. These controls inspect the argument; they do not assess a reader's thoughts." question="If an act never happens, does that tell us which state was reached?" answer="No. A passing thought may end without resolve; a settled intention may also be prevented. Ghazali distinguishes the inward state and the reason the act was left.">
  <ol className="thought-path">{thoughts.map((t,i)=><li key={t[0]} className={i===stage?'is-current':''}><button aria-pressed={i===stage} onClick={()=>setStage(i)}><span>0{i+1}</span><strong>{t[0]}</strong><small>{t[3]}</small></button></li>)}</ol>
  <Reading label={`State ${stage+1} of 4`} title={item[1]}><p>{item[2]}</p></Reading>
 </Study>;
}
