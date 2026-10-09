import { useId, useRef, useState, type CSSProperties, type KeyboardEvent } from 'react';
import { ArrowsSplit, BookOpenText, Compass, Scales, Sparkle } from '@phosphor-icons/react';
import type { VisualModel } from '../data';

function NodeMark({ model, index }: { model: VisualModel; index: number }) {
  const symbol = model.items[index].symbol;
  const Icon = symbol === 'compass' ? Compass : symbol === 'scales' ? Scales : symbol === 'book' ? BookOpenText : symbol === 'spark' ? Sparkle : null;
  if (Icon) return <Icon size={28} weight="duotone" aria-hidden="true" />;
  if (model.kind !== 'set') return <span>{model.kind === 'pair' ? String.fromCharCode(65 + index) : String(index + 1).padStart(2, '0')}</span>;
  return <svg viewBox="0 0 40 40" aria-hidden="true"><circle cx="20" cy="20" r="13" fill="none" stroke="currentColor" strokeWidth="1.3" />
    {Array.from({ length: model.items.length }, (_, i) => {
      const angle = i / model.items.length * Math.PI * 2 - Math.PI / 2;
      return <circle key={i} cx={20 + 13 * Math.cos(angle)} cy={20 + 13 * Math.sin(angle)} r={i === index ? 4.5 : 2.2} fill={i === index ? 'currentColor' : 'var(--publication-paper)'} stroke="currentColor" strokeWidth="1.3" />;
    })}<circle cx="20" cy="20" r="2.5" fill="currentColor" /></svg>;
}

/** Diagram structure follows the authored model: sequence, comparison, range, or set. */
export function VisualReading({ model, plate = false }: { model: VisualModel; plate?: boolean }) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const nodes = useRef<Array<HTMLButtonElement | null>>([]);
  const titleId = useId(), detailId = useId();
  if (!model.items.length) return null;
  const active = activeIndex == null ? null : model.items[activeIndex];
  const sequence = model.kind === 'chain';
  function navigate(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    if (event.key === 'Escape') { setActiveIndex(null); return; }
    const next = event.key === 'Home' ? 0 : event.key === 'End' ? model.items.length - 1
      : ['ArrowRight', 'ArrowDown'].includes(event.key) ? (index + 1) % model.items.length
      : ['ArrowLeft', 'ArrowUp'].includes(event.key) ? (index + model.items.length - 1) % model.items.length : null;
    if (next == null) return;
    event.preventDefault();
    nodes.current[next]?.focus({ preventScroll: true });
    setActiveIndex(next);
  }
  return <section id="visual-reading-map" data-reading-anchor="visual-reading-map" className={`visual-reading visual-reading-${model.kind}${plate ? ' visual-reading-plate' : ''}${active ? ' has-focus' : ''}${model.items.length > 4 ? ' visual-reading-many' : ''}`} aria-labelledby={titleId}>
    <header><span><ArrowsSplit size={17} aria-hidden="true" />Visual explanation <small>{model.items.length} {sequence ? 'steps' : model.kind === 'pair' ? 'perspectives' : 'ideas'}</small></span><h4 id={titleId}>{model.title}</h4><p>{sequence ? 'Follow the connections. Select a step to trace the sequence.' : 'Read the ideas together. Select one to bring it into focus.'}</p></header>
    <div className="visual-reading-canvas" style={{ '--visual-count': Math.min(model.items.length, 4) } as CSSProperties}>
      {model.prompt && <div className="visual-reading-origin"><span>{model.prompt}</span></div>}
      <div className="visual-reading-nodes" role="group" aria-label={model.title}>
        {model.items.map((item, index) => <button type="button" ref={node => { nodes.current[index] = node; }} key={`${index}:${item.label}`} className={`visual-reading-node${activeIndex === index ? ' is-active' : ''}`} aria-pressed={activeIndex === index} aria-controls={detailId} onKeyDown={event => navigate(event, index)} onClick={() => setActiveIndex(activeIndex === index ? null : index)}>
          <span className="visual-reading-mark"><NodeMark model={model} index={index} /></span>
          <strong>{item.label}</strong>
          <span className="visual-reading-node-copy">{item.body}</span>
          <span className="visual-reading-selected" aria-hidden="true">{activeIndex === index ? 'In focus' : '\u00a0'}</span>
        </button>)}
      </div>
      <div id={detailId} className="visual-reading-detail" aria-live="polite" aria-atomic="true">
        {plate ? active?.passageId ? <a href={`#${active.passageId}`} onClick={() => document.getElementById(active.passageId!)?.focus({preventScroll:true})}>Read the passage on {active.label.toLowerCase()} <span aria-hidden="true">↗</span></a> : <span>Select an answer to find its place in the argument.</span> : <span>{active ? `${sequence ? 'Step' : 'Idea'} ${activeIndex! + 1} of ${model.items.length}: ${active.label}. ${active.body}` : 'All ideas visible.'}</span>}
      </div>
      <div className="visual-reading-caption"><span className="visual-reading-caption-label">{sequence ? 'The connection' : 'Read together'}</span><p>{model.caption}</p></div>
    </div>
    <footer><span>{plate ? 'Editorial diagram · original English synthesis' : <>Select an idea to focus<span className="visual-reading-keyboard"> · ← → to move · Esc to reset</span></>}</span><button type="button" aria-pressed={activeIndex == null} onClick={() => setActiveIndex(null)}>{sequence ? 'See the whole sequence' : 'Compare all'}</button></footer>
  </section>;
}
