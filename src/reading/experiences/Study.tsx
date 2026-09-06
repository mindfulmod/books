import { useState, type ReactNode } from 'react';
import { ReadingDisclosure } from '../ReadingDisclosure';
import './studies.css';

export function Study({title,eyebrow,intro,children,sources,note,question,answer}:{title:string;eyebrow:string;intro:string;children:ReactNode;sources:Array<[string,number]>;note:string;question:string;answer:string}) {
  return <section className="passage-study" aria-label={title}>
    <header className="study-intro"><span>{eyebrow}</span><h3>{title}</h3><p>{intro}</p></header>
    {children}
    <ReadingDisclosure title="Pause with a question" className="study-question"><p className="study-prompt">{question}</p><Reveal answer={answer}/></ReadingDisclosure>
    <ReadingDisclosure title="Passage behind this exploration" className="study-source"><p>{note}</p>{sources.map(([label,page])=><a key={page} href={`https://shamela.ws/book/9472/${page}`} target="_blank" rel="noreferrer">{label} <span aria-hidden="true">↗</span></a>)}<p className="study-caption">English explanations and visual arrangements are editorial. Continue below for the full reading.</p></ReadingDisclosure>
  </section>;
}
function Reveal({answer}:{answer:string}) {
 const [open,setOpen]=useState(false);
 return <><button className="study-reveal" aria-expanded={open} onClick={()=>setOpen(!open)}>{open?'Hide explanation':'Reveal explanation'} <span aria-hidden="true">{open?'−':'+'}</span></button>{open&&<p>{answer}</p>}</>;
}
export function Choices({label,items,value,onChange}:{label:string;items:string[];value:number;onChange:(value:number)=>void}) {
 return <div className="study-choices" role="group" aria-label={label}>{items.map((item,i)=><button key={item} aria-pressed={value===i} onClick={()=>onChange(i)}>{item}</button>)}</div>;
}
export function Reading({label,title,children}:{label:string;title:string;children:ReactNode}) {
 return <div className="study-reading" aria-live="polite" aria-atomic="true"><span>{label}</span><h4>{title}</h4>{children}</div>;
}
