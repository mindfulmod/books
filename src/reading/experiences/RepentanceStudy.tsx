import { useState } from 'react';
import { Choices, Reading, Study } from './Study';
const parts=[['Knowledge','Recognise the harm','Knowing how the act separates a person from what they love gives regret its object.'],['Regret','The loss is felt','Pain attaches to one’s own act as the cause of that loss.'],['Action','The return faces three ways','The will that follows regret concerns the present, future, and past together.']];
const times=[['Present','Leave the act','Stop the wrong in which one is engaged.'],['Future','Resolve to leave it','Form the intention to refrain going forward.'],['Past','Repair what admits of repair','Attend to what was lost and what can be restored.']];
export function RepentanceStudy() {
 const [part,setPart]=useState(0); const [time,setTime]=useState(0);
 return <Study eyebrow="Repentance · the three-part return" title="Follow the turn toward action." intro="Ghazali gives a causal order: knowledge produces regret, and regret produces the will to act. Explore the relation, then the three directions of action." sources={[["The definition of repentance · IV, 3",1162],["Why regret can name the whole · IV, 4",1163]]} note="The three parts and the present, future, and past directions follow the opening definition. This is a reading of its structure, without a score for a person's repentance." question="Why can regret sometimes stand for the whole of repentance?" answer="The text names the middle term with its two sides understood: the knowledge that produced it and the resolve that follows it.">
  <div className="return-chain" role="group" aria-label="Explore the three parts of repentance">{parts.map((p,i)=><button key={p[0]} aria-pressed={part===i} onClick={()=>setPart(i)}><span>0{i+1}</span><strong>{p[0]}</strong>{i<2&&<i aria-hidden="true">↓</i>}</button>)}</div>
  <Reading label={`Part ${part+1} of 3`} title={parts[part][1]}><p>{parts[part][2]}</p></Reading>
  {part===2&&<div className="return-directions"><span className="study-kicker">Three directions of the same return</span><Choices label="Explore action across time" items={times.map(t=>t[0])} value={time} onChange={setTime}/><Reading label={times[time][0]} title={times[time][1]}><p>{times[time][2]}</p></Reading></div>}
 </Study>;
}
