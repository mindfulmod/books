import { Fragment } from 'react';
import { ArrowUpRight, BookOpen, Plus } from '@phosphor-icons/react';
import { assetUrl } from '../assetUrl';
import { sourceNotes, type Seed, type SourceBlock, type SourceRun } from './content';

const pdf = assetUrl('assets/timeless-seeds/source.pdf');

export function scrollToReadingPart(id: string) {
  const target = document.getElementById(id);
  if (target instanceof HTMLDetailsElement) target.open = true;
  target?.scrollIntoView({ behavior: 'instant', block: 'start' });
  (target instanceof HTMLDetailsElement ? target.querySelector('summary') : target)?.focus({ preventScroll: true });
}

function SourceWords({ runs }: { runs: SourceRun[] }) {
  return <>{runs.map((run, i) => <Fragment key={i}>{typeof run === 'string' ? run : 'note' in run ? <sup className="book-note-marker"><a href={`#book-note-${run.note}`} aria-label={`Read the book’s note ${run.note}`} onClick={event => { event.preventDefault(); scrollToReadingPart(`book-note-${run.note}`); }}>{run.note}</a></sup> : 'image' in run ? <img className="book-honorific" src={assetUrl(`assets/timeless-seeds/${run.image}`)} alt={run.alt} style={{ width: `${run.width}em`, height: `${run.height}em` }}/>: <br/>}</Fragment>)}</>;
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

function SourceParagraphs({ blocks }: { blocks: SourceBlock[] }) {
  return <>{flowingBlocks(blocks).map((block, i) => <p key={i} className={block.kind === 'heading' ? 'book-original-number' : undefined}><SourceWords runs={block.runs}/></p>)}</>;
}

export default function BookPassage({ seed }: { seed: Seed }) {
  const notes = seed.source.notes.map(id => sourceNotes.find(note => note.id === id)!);
  return <section className="book-passage" id="seed-book" tabIndex={-1} aria-labelledby="book-passage-heading">
    <div className="book-passage-heading"><div><span className="reader-section-label"><BookOpen size={16}/> The book’s words</span><h2 id="book-passage-heading">The complete entry</h2></div><a className="book-pdf-link" href={`${pdf}#page=${seed.page}`} target="_blank" rel="noreferrer">PDF {seed.page === seed.lastPage ? `page ${seed.page}` : `pages ${seed.page}–${seed.lastPage}`} <ArrowUpRight size={15}/></a></div>
    <p className="book-passage-description">The original wording, including quotations and the book’s own commentary.</p>
    <div className="book-original" data-source-body><SourceParagraphs blocks={seed.source.blocks}/></div>
    {notes.length > 0 && <section className="book-endnotes" id="seed-source-notes" tabIndex={-1} aria-labelledby="book-endnotes-heading"><h3 id="book-endnotes-heading">The book’s source notes</h3><p className="book-notes-intro">Tap a note to read it. These are copied in full from the book.</p>{notes.map(note => <details key={note.id} id={`book-note-${note.id}`} className="book-endnote"><summary><span>Note {note.id}<small>From PDF page {note.page}</small></span><Plus size={19} aria-hidden="true"/></summary><div className="book-note-content"><div data-source-note={note.id}><SourceParagraphs blocks={note.blocks}/></div><a className="book-pdf-link" href={`${pdf}#page=${note.page}`} target="_blank" rel="noreferrer">Open note in the PDF<ArrowUpRight size={15}/></a></div></details>)}</section>}
  </section>;
}
