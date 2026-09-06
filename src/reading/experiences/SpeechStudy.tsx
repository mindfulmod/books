import { useState } from 'react';
import { Choices, Reading, Study } from './Study';
const media=[['Said aloud','A remark at a gathering','A speaker describes an absent person’s disliked trait for the amusement of others.'],['Written','A message to a group','The same trait is circulated in writing; the audience still knows who is meant.'],['Imitated','A recognisable gesture','Someone imitates the person so the audience understands the same disliked trait.']];
export function SpeechStudy() {
 const [medium,setMedium]=useState(0);const [truth,setTruth]=useState(0);
 return <Study eyebrow="Tongue · meaning travels across media" title="Change the medium. What remains?" intro="Keep the same absent person and the same disclosure. Change how the audience receives it." sources={[["Definition of backbiting · III, 143",889],["Speech, writing, and gesture · III, 144",890],["The scope of permitted disclosure · III, 152",898]]} note="The text explicitly includes writing, signs, and imitation. The gathering and group-message examples are editorial applications. These examples assume no need such as seeking justice or protection; the book treats those purposes separately." question="Does removing the person's name necessarily remove identification?" answer="No. Ghazali includes indirect identification. The audience can understand who is meant through context or a recognisable sign.">
  <p className="study-caption">These examples concern disclosure for amusement, without a need for justice, counsel, or protection.</p>
  <Choices label="Choose how the disclosure travels" items={media.map(m=>m[0])} value={medium} onChange={setMedium}/>
  <div className={`speech-scene speech-medium-${medium}`}><span className="study-kicker">Illustrative example</span><h4>{media[medium][1]}</h4><p>{media[medium][2]}</p><div className="speech-route" aria-hidden="true"><span>{medium===0?'Voice':medium===1?'Writing':'Gesture'}</span><b>→</b><span>Audience</span></div></div>
  <Choices label="Compare truth and falsehood" items={['If the trait is true','If it is false']} value={truth} onChange={setTruth}/>
  <Reading label="Hold the definition steady" title={truth===0?'Accuracy does not settle the question':'Falsehood adds accusation'}><p>{truth===0?'Truthful disclosure can still be backbiting. Changing the medium does not by itself change what is communicated.':'An invented defect is slander. Falsehood does not provide a way out of the wrong.'}</p></Reading>
 </Study>;
}
