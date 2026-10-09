import { ArrowLeft, ArrowRight, CheckCircle, PencilSimple } from '@phosphor-icons/react';
import { ReadingGarden } from '../ReadingGarden';
import type { ReadingTheme } from '../ReadingTheme';

export function ReadingFinish({ bookId, theme, question, completed, onComplete, onReflect, nextTitle, onNext, previousTitle, onPrevious }: {
  bookId:number; theme:ReadingTheme; question:string; completed:boolean; onComplete:()=>void; onReflect:()=>void; nextTitle:string; onNext:()=>void; previousTitle?:string; onPrevious:()=>void;
}) {
  return <section className="reading-finish" id="reading-finish" aria-labelledby="reading-finish-title">
    <div className="reading-finish-reflection"><ReadingGarden theme={theme} bookId={bookId} className="reading-finish-art" sidebar/><div><span>A moment to reflect</span><h2 id="reading-finish-title">What will you carry with you?</h2><p>{question}</p><button onClick={onReflect}><PencilSimple size={18}/> Write a reflection</button></div></div>
    <div className="reading-finish-completion"><button aria-pressed={completed} onClick={onComplete}><CheckCircle size={22} weight={completed?'fill':'regular'}/>{completed?'Section completed':'Mark section complete'}</button><p>{completed?'A reading to return to whenever you need it.':'Your progress follows the sections you choose to complete.'}</p></div>
    <nav className="reading-finish-next" aria-label="Continue your reading"><button disabled={!previousTitle} onClick={onPrevious} aria-label={previousTitle?`Previous section: ${previousTitle}`:'At the beginning'}><ArrowLeft size={18}/><span>Previous</span></button><button onClick={onNext}><span><small>Continue reading</small><strong>{nextTitle}</strong></span><ArrowRight size={23}/></button></nav>
  </section>;
}
