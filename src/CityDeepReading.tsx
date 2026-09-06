import { useId, useState } from "react";
import { ArrowRight, ArrowCounterClockwise, Brain, Heart, Flame, Shield, Hand, Compass } from "@phosphor-icons/react";
import type { SystemBook } from "./systemTypes";
import './city-deep.css';
import { ReadingDisclosure } from './reading/ReadingDisclosure';

type Lab = NonNullable<SystemBook['conceptLab']>;
const roles = [
  { id: 'intellect', name: 'Intellect', title: 'The adviser', icon: Brain, x: 160, y: 45 },
  { id: 'anger', name: 'Anger', title: 'The police chief', icon: Shield, x: 48, y: 151 },
  { id: 'heart', name: 'Heart', title: 'The ruler', icon: Heart, x: 160, y: 151 },
  { id: 'appetite', name: 'Appetite', title: 'The provisioner', icon: Flame, x: 272, y: 151 },
  { id: 'limbs', name: 'Limbs & senses', title: 'The workers', icon: Hand, x: 160, y: 257 },
];
const scenes = {
  ordered: { title: 'Counsel guides the ruler.', line: 'The ruler consults intellect; appetite and anger are governed in its service.', changed: 'Appetite fetches provision. Anger helps restrain it. Neither determines the purpose of the realm.', flow: 'Intellect → Heart → the serving forces', question: 'What makes the arrangement sound?', answer: 'The relation between the forces. Ghazali describes using intellect to govern appetite and anger, and using each against the excess of the other.' },
  appetite: { title: 'The provisioner sets the purpose.', line: 'Appetite recruits intellect to work out how to satisfy its wants.', changed: 'Intellect is still active. What changes is whose aim its reasoning serves.', flow: 'Appetite → Intellect → reasons for the want', question: 'Has intelligence disappeared?', answer: 'No. This is the inversion Ghazali names: intellect is employed in finding ways to satisfy appetite. Clever reasoning alone does not establish right direction.' },
  anger: { title: 'The guard takes command.', line: 'Read the warning about rebellious forces through the role of anger.', changed: 'The power assigned to police the realm becomes its director. This scenario is an editorial application of the passage.', flow: 'Anger → Heart → the response', question: 'Does restoring order mean removing anger?', answer: 'No. The first analogy gives anger work under counsel. Restoring that relation is different from abolishing the faculty.' },
};
type Scene = keyof typeof scenes;

export function CityDeepReading({ lab }: { lab: Lab }) {
  const [scene, setScene] = useState<Scene>('ordered');
  const [faculty, setFaculty] = useState('heart');
  const [reveal, setReveal] = useState(false);
  const marker = useId().replace(/:/g, '');
  const active = scenes[scene];
  const sourceScene = lab.scenes.find(s => s.id === (scene === 'appetite' ? 'appetite-rules' : scene === 'anger' ? 'anger-rules' : 'ordered')) ?? lab.scenes[0];
  const selectedRole = roles.find(r => r.id === faculty)!;
  const step = sourceScene.steps.find(s => s.id === faculty) ?? sourceScene.steps.find(s => s.position === 'south')!;
  const selectScene = (next: Scene) => { setScene(next); setReveal(false); setFaculty(next === 'ordered' ? 'heart' : next); };
  return <section className={`city-study city-${scene}`} aria-label="Explore the government of the inner city">
    <header className="city-intro">
      <span className="city-eyebrow"><Compass size={16} weight="duotone" /> The first analogy · government</span>
      <h3>Who is giving<br /><em>the orders?</em></h3>
      <p>The same faculties can serve the heart or come to rule it. Follow the direction of command to see the difference.</p>
    </header>
    <div className="city-instrument">
      <div className="city-instrument-head"><span>Explore the arrangement</span><span>Touch any faculty</span></div>
      <div className="city-scenes" role="group" aria-label="Change the government">
        {(['ordered','appetite','anger'] as const).map(id => <button key={id} aria-pressed={scene === id} onClick={() => selectScene(id)}>{id === 'ordered' ? 'Ordered' : id === 'appetite' ? 'Appetite rules' : 'Anger rules'}</button>)}
      </div>
      <div className="city-plan" role="group" aria-label="Faculties and direction of influence">
        <svg className="city-connections" viewBox="0 0 320 302" aria-hidden="true">
          <defs><marker id={marker} viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse"><path d="M 0 0 L 10 5 L 0 10 z" /></marker></defs>
          <rect x="9" y="6" width="302" height="290" rx="95" className="city-court-border" />
          <circle cx="160" cy="151" r="64" className="city-pool" />
          <path d="M160 87 L160 107 M115 151 L92 151 M205 151 L227 151 M160 196 L160 216" className="city-inactive-lines" />
          {scene === 'ordered' ? <g className="city-live-lines" markerEnd={`url(#${marker})`}><path d="M160 87 L160 105"/><path d="M114 151 L94 151"/><path d="M206 151 L226 151"/><path d="M160 196 L160 215"/></g> : scene === 'appetite' ? <path key={scene} className="city-live-lines" d="M272 105 C272 45 233 45 207 45" markerEnd={`url(#${marker})`}/> : <path key={scene} className="city-live-lines" d="M93 151 L114 151" markerEnd={`url(#${marker})`}/>}
        </svg>
        {roles.map(role => <button key={role.id} className={`city-faculty faculty-${role.id}${faculty === role.id ? ' is-selected' : ''}`} aria-pressed={faculty === role.id} onClick={() => setFaculty(role.id)}>
          <role.icon size={23} weight="duotone" /><strong>{role.name}</strong><small>{role.title}</small>
        </button>)}
      </div>
      <div className="city-flow" aria-live="polite"><span className="city-flow-dot"/><span>{active.flow}</span></div>
      <div className="city-faculty-reading" aria-live="polite" aria-atomic="true"><small>Inside the arrangement · {selectedRole.name}</small><h4>{step.micro}</h4><p>{step.body}</p></div>
      <p className="city-diagram-note">Arrows show selected relationships, not every influence. The courtyard is an editorial memory aid.</p>
    </div>
    <section className="city-explanation" aria-live="polite" aria-atomic="true">
      <span className="city-eyebrow">{scene === 'ordered' ? 'Read the order' : 'Notice what changed'}</span>
      <h4>{active.title}</h4><p>{active.line}</p><p>{active.changed}</p>
      {scene !== 'ordered' && <button className="city-reset" onClick={() => selectScene('ordered')}><ArrowCounterClockwise size={17}/> Restore the ordered arrangement</button>}
    </section>
    <ReadingDisclosure title="In Ghazali’s text" className="city-source">
      <div><p>The opening describes intellect becoming employed in finding ways to satisfy appetite. The first analogy then gives the ruler, adviser, provisioner, and police chief their roles.</p>
      <blockquote lang="ar" dir="rtl">فإن عقولهم صارت مسخرة لشهواتهم في استنباط الحيل لقضاء الشهوة</blockquote>
      <p className="city-source-caption">Arabic excerpt · Book 21, “Examples of the heart with its inward armies.” English explanations here are editorial synthesis.</p>
      <a href="https://shamela.ws/book/9472/752" target="_blank" rel="noreferrer">Read the inversion · volume 3, page 6 <ArrowRight size={14}/></a>
      <a href="https://shamela.ws/book/9472/753" target="_blank" rel="noreferrer">Read the three analogies · volume 3, page 7 <ArrowRight size={14}/></a>
      <p className="city-source-caption">The “Anger rules” arrangement applies the passage’s warning about rebellion; it is not a separately named model in the text. The four-iwan layout is an editorial reference to <a href={lab.architecture.url} target="_blank" rel="noreferrer">{lab.architecture.reference}</a>.</p></div>
    </ReadingDisclosure>
    <section className="city-pause"><span className="city-eyebrow">Pause with the distinction</span><h4>{active.question}</h4><button aria-expanded={reveal} onClick={() => setReveal(!reveal)}>{reveal ? 'Close explanation' : 'Think it through, then reveal'}<span>{reveal ? '−' : '+'}</span></button>{reveal && <p className="city-answer">{active.answer}</p>}</section>
    <div className="city-reading-bridge"><span>Three pictures, three questions</span><dl><div><dt>The realm</dt><dd>Who governs whom?</dd></div><div><dt>The frontier</dt><dd>What was entrusted to your care?</dd></div><div><dt>The hunt</dt><dd>Are the rider, horse, and hound trained?</dd></div></dl><p>Follow the full argument below. Each analogy adds something the others leave out.</p></div>
  </section>;
}
