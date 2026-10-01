import { Fragment, useRef, useState, type ReactNode } from 'react';
import { ArrowUpRight, Plus, X } from '@phosphor-icons/react';
import { assetUrl } from '../assetUrl';
import { sourceNotes, type Seed, type SourceBlock, type SourceRun } from './content';
import { glossaryFor, glossaryPattern, honorificMeanings } from './glossary';

const pdf = assetUrl('assets/timeless-seeds/source.pdf');

export function scrollToReadingPart(id: string) {
  const target = document.getElementById(id);
  let ancestor = target?.parentElement;
  while (ancestor) {
    if (ancestor instanceof HTMLDetailsElement) ancestor.open = true;
    ancestor = ancestor.parentElement;
  }
  if (target instanceof HTMLDetailsElement) target.open = true;
  target?.scrollIntoView({ behavior: 'instant', block: 'start' });
  (target instanceof HTMLDetailsElement ? target.querySelector('summary') : target)?.focus({ preventScroll: true });
}

// Each glossary word is explained at its first appearance in a passage, so the
// text stays calm. The words themselves are rendered exactly as printed.
type Gloss = { seen: Set<string>; open: (term: string, meaning: string) => void };

function glossedText(text: string, gloss?: Gloss): ReactNode {
  if (!gloss) return text;
  const parts: ReactNode[] = [];
  let last = 0;
  for (const match of text.matchAll(glossaryPattern)) {
    const entry = glossaryFor(match[0]);
    if (!entry || gloss.seen.has(entry.id)) continue;
    gloss.seen.add(entry.id);
    parts.push(text.slice(last, match.index));
    parts.push(<button key={match.index} type="button" className="gloss-term" aria-haspopup="dialog" onClick={() => gloss.open(entry.term, entry.meaning)}>{match[0]}</button>);
    last = match.index! + match[0].length;
  }
  parts.push(text.slice(last));
  return parts;
}

// Plain functions, not components: they run inside BookPassage's own render, so the
// "first appearance" bookkeeping starts fresh on every render.
function sourceWords(runs: SourceRun[], gloss?: Gloss): ReactNode {
  return <>{runs.map((run, i) => {
    if (typeof run === 'string') return <Fragment key={i}>{glossedText(run, gloss)}</Fragment>;
    if ('note' in run) return <sup key={i} className="book-note-marker"><a href={`#book-note-${run.note}`} aria-label={`Read the book’s note ${run.note}`} onClick={event => { event.preventDefault(); scrollToReadingPart(`book-note-${run.note}`); }}>{run.note}</a></sup>;
    if ('image' in run) {
      const image = <img className="book-honorific" src={assetUrl(`assets/timeless-seeds/${run.image}`)} alt={run.alt} style={{ width: `${run.width}em`, height: `${run.height}em` }}/>;
      const meaning = honorificMeanings[run.image];
      if (!gloss || !meaning || gloss.seen.has(run.image)) return <Fragment key={i}>{image}</Fragment>;
      gloss.seen.add(run.image);
      return <button key={i} type="button" className="gloss-term gloss-honorific" aria-haspopup="dialog" aria-label={`${run.alt}: what this means`} onClick={() => gloss.open(meaning.term, meaning.meaning)}>{image}</button>;
    }
    return <br key={i}/>;
  })}</>;
}

// A page break may cut through one paragraph. Rejoin that paragraph for a
// flowing screen layout without changing any of its words or punctuation.
export function flowingBlocks(blocks: SourceBlock[]) {
  const result: SourceBlock[] = [];
  for (const block of blocks) {
    const last = result.at(-1);
    const lastText = last?.runs.filter(r => typeof r === 'string').join('').trimEnd() || '';
    const firstText = block.runs.filter(r => typeof r === 'string').join('').trimStart();
    if (last && last.page !== block.page && last.kind === 'paragraph' && block.kind === 'paragraph' && !/[.!?:”’]$/.test(lastText) && /^[a-zﷻ]/u.test(firstText)) {
      last.runs = [...last.runs, ...(lastText.endsWith('-') ? [] : [' ']), ...block.runs];
      last.page = block.page;
    } else result.push({ ...block, runs: [...block.runs] });
  }
  return result;
}

function sourceParagraphs(blocks: SourceBlock[], gloss?: Gloss): ReactNode {
  return flowingBlocks(blocks).map((block, i) => <p key={i} className={block.kind === 'heading' ? 'book-original-number' : undefined}>{sourceWords(block.runs, gloss)}</p>);
}

export default function BookPassage({ seed }: { seed: Seed }) {
  const notes = seed.source.notes.map(id => sourceNotes.find(note => note.id === id)!);
  const dialog = useRef<HTMLDialogElement>(null);
  const [explained, setExplained] = useState<{ term: string; meaning: string } | null>(null);
  const gloss: Gloss = { seen: new Set(), open: (term, meaning) => { setExplained({ term, meaning }); dialog.current?.showModal(); } };
  return <section className="book-passage" id="seed-book" tabIndex={-1} aria-labelledby="book-passage-heading">
    <div className="book-passage-heading"><h2 id="book-passage-heading">In the original words</h2><a className="book-pdf-link" href={`${pdf}#page=${seed.page}`} target="_blank" rel="noreferrer">PDF {seed.page === seed.lastPage ? `page ${seed.page}` : `pages ${seed.page}–${seed.lastPage}`} <ArrowUpRight size={15}/></a></div>
    <p className="book-passage-description">This is the passage the explanation above comes from, word for word. Tap an underlined word for its meaning.</p>
    <div className="book-original" data-source-body>{sourceParagraphs(seed.source.blocks, gloss)}</div>
    {notes.length > 0 && <section className="book-endnotes" id="seed-source-notes" tabIndex={-1} aria-labelledby="book-endnotes-heading"><h3 id="book-endnotes-heading">The book’s source notes</h3><p className="book-notes-intro">Tap a note to read it. These are copied in full from the book.</p>{notes.map(note => <details key={note.id} id={`book-note-${note.id}`} className="book-endnote"><summary><span>Note {note.id}<small>From PDF page {note.page}</small></span><Plus size={19} aria-hidden="true"/></summary><div className="book-note-content"><div data-source-note={note.id}>{sourceParagraphs(note.blocks)}</div><a className="book-pdf-link" href={`${pdf}#page=${note.page}`} target="_blank" rel="noreferrer">Open note in the PDF<ArrowUpRight size={15}/></a></div></details>)}</section>}
    <dialog ref={dialog} className="gloss-dialog" aria-labelledby="gloss-term" onClick={event => { if (event.target === dialog.current) dialog.current.close(); }}>
      {explained && <div><div className="gloss-dialog-heading"><span className="seed-eyebrow">What this means</span><button className="seed-icon-button" aria-label="Close" onClick={() => dialog.current?.close()}><X size={20}/></button></div><h3 id="gloss-term" dir="auto">{explained.term}</h3><p>{explained.meaning}</p></div>}
    </dialog>
  </section>;
}
