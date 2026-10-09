import { useEffect, useState } from 'react';
import { Clock, MapTrifold } from '@phosphor-icons/react';
import type { Depth } from '../systemTypes';

export type ReadingLandmark = { id: string; label: string };
export function ReadingNavigator({ landmarks, minutes, readingKey, depth, onDepthChange }: { landmarks: ReadingLandmark[]; minutes: number; readingKey: string; depth?: Depth; onDepthChange?: (depth: Depth) => void }) {
  const [progress,setProgress]=useState(0);
  const [active,setActive]=useState(landmarks[0]?.id??'');
  const landmarkSignature=landmarks.map(item=>item.id).join('|');
  useEffect(()=>{
    let frame=0;
    const ids=landmarkSignature.split('|');
    const root=document.querySelector('.publication-reader');
    const update=()=>{
      frame=0;
      const article=root?.querySelector('.deep-reader-article')??root;
      if(!article)return;
      const box=article.getBoundingClientRect(),top=box.top+window.scrollY;
      const distance=Math.max(1,box.height-window.innerHeight+200);
      setProgress(Math.max(0,Math.min(100,Math.round((window.scrollY-top+160)/distance*100))));
      const passed=ids.filter(id=>{const element=document.getElementById(id);return element&&element.getBoundingClientRect().top<=210;});
      const atEnd = window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 8;
      setActive(atEnd ? ids.at(-1)! : passed.at(-1) ?? ids[0]);
    };
    const schedule=()=>{if(!frame)frame=requestAnimationFrame(update);};
    const observer=new ResizeObserver(schedule);
    if(root)observer.observe(root);
    window.addEventListener('scroll',schedule,{passive:true});window.addEventListener('resize',schedule);schedule();
    return()=>{window.removeEventListener('scroll',schedule);window.removeEventListener('resize',schedule);observer.disconnect();cancelAnimationFrame(frame);};
  },[readingKey,landmarkSignature]);
  const jump=(id:string)=>{
    const target=document.getElementById(id);
    if(target){target.setAttribute('tabindex','-1');target.focus({preventScroll:true});}
    target?.scrollIntoView({behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth',block:'start'});
    window.history.replaceState(null,'',`${window.location.pathname}${window.location.search}#${id}`);
    setActive(id);
  };
  return <nav className={`reading-navigator${onDepthChange ? ' has-depth-control' : ''}`} aria-label="In this reading">
    {onDepthChange && <label className="reading-depth-dock"><span>Reading depth</span><select aria-label="Reading depth in this section" value={depth} onChange={event=>onDepthChange(event.target.value as Depth)}><option value="glance">Brief</option><option value="deep">Deep</option><option value="sources">Sources</option></select></label>}
    <div className="reading-navigator-meta"><span><MapTrifold size={17}/> In this reading</span><span><Clock size={14}/> About {minutes} min <i/> {progress}% through</span></div>
    <div className="reading-navigator-track" role="progressbar" aria-label="Position in this section" aria-valuemin={0} aria-valuemax={100} aria-valuenow={progress}><span style={{width:`${progress}%`}}/></div>
    <div className="reading-landmarks">{landmarks.map(item=><a key={item.id} href={`#${item.id}`} aria-current={active===item.id?'location':undefined} onClick={event=>{event.preventDefault();jump(item.id);}}>{item.label}</a>)}</div>
    <label className="reading-landmark-select"><span>Jump to</span><select aria-label="Jump within this reading" value={active} onChange={event=>jump(event.target.value)}>{landmarks.map(item=><option key={item.id} value={item.id}>{item.label}</option>)}</select></label>
  </nav>;
}
