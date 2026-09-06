import { useState } from 'react';
import { Choices, Reading, Study } from './Study';
const moments=[
 ['The call','Hear the summons','Prepare to respond','Ghazali connects answering this call with remembering the summons of the Last Day.'],
 ['Purification','Clean the outer layers','Remember the heart','Place, clothes, and skin lead inward. The passage asks that the heart receive attention through repentance too.'],
 ['Covering','Cover the body','Acknowledge what cannot be hidden','Outward covering prompts awareness of inward faults and the need for forgiveness.'],
];
export function PrayerStudy() {
 const [moment,setMoment]=useState(0);const [inward,setInward]=useState(false); const item=moments[moment];
 return <Study eyebrow="Prayer · outward act, inward attention" title="Give attention something to hold." intro="Explore three preparations for prayer. Each outward act carries a particular reminder in Ghazali’s reading." sources={[["The call, purification, and covering · I, 165",165],["Covering and the next elements · I, 166",166]]} note="These are the first preparations discussed in this section, not a complete guide to performing prayer. The inward reminders accompany the outward requirements." question="Are the inward reminders a second script to recite?" answer="They give attention an object. The section asks what is present in the heart, rather than adding words to the prayer.">
  <Choices label="Choose a preparation for prayer" items={moments.map(m=>m[0])} value={moment} onChange={i=>{setMoment(i);setInward(false);}}/>
  <div className={`prayer-leaf ${inward?'is-inward':''}`}>
   <div className="prayer-arch" aria-hidden="true"><div><div/></div></div>
   <span className="study-kicker">{inward?'Inward reminder':'Outward act'} · {item[0]}</span>
   <h4>{inward?item[2]:item[1]}</h4>
   <button className="study-reveal" aria-pressed={inward} onClick={()=>setInward(!inward)}>{inward?'Return to the outward act':'Explore the inward reminder'} <span aria-hidden="true">↔</span></button>
  </div>
  <Reading label={inward?'The connection':'Notice the act'} title={item[0]}><p>{inward?item[3]:'Begin with what the act does, then open its inward reminder. The two belong together.'}</p></Reading>
 </Study>;
}
