import { useState } from 'react';
import { CaretDown, Check, PencilSimple } from '@phosphor-icons/react';
import type { Seed } from './content';
import type { Garden } from './state';

type Props = {
  seed: Seed;
  garden: Garden;
  savedGarden: Garden | null;
  storageError: boolean;
  onNote: (value: string) => void;
  onIntention: (value: string) => void;
};

export default function Journal({ seed, garden, savedGarden, storageError, onNote, onIntention }: Props) {
  const note = garden.notes[seed.id] || '';
  const intention = garden.intentions[seed.id] || '';
  const [writingOpen, setWritingOpen] = useState(Boolean(note.trim() || intention.trim()));
  const saved = savedGarden !== null && note === (savedGarden.notes[seed.id] || '') && intention === (savedGarden.intentions[seed.id] || '');
  const status = storageError ? 'Browser saving unavailable' : !saved ? 'Saving…' : note || intention ? 'Saved in this browser' : 'Saved as you write';

  return <section className="reader-reflection" id="seed-reflection" tabIndex={-1} aria-labelledby="journal-heading">
    <span className="reader-section-label">A question to sit with</span>
    <h2 id="journal-heading">{seed.prompt}</h2>
    <p className="reflection-invitation">You can think about this without writing anything.</p>
    <details className="reader-disclosure" id="seed-writing" open={writingOpen} onToggle={event => setWritingOpen(event.currentTarget.open)}>
    <summary><PencilSimple size={18}/><span>Write a thought or a small action</span><CaretDown size={17}/></summary>
    <div className="journal-fields">
    <label htmlFor="seed-note">Your reflection</label>
    <textarea id="seed-note" rows={4} maxLength={20000} value={note} onChange={e => onNote(e.target.value)} placeholder="Write whatever comes to mind…"/>
    <label htmlFor="seed-intention">One small action</label>
    <input id="seed-intention" maxLength={1000} value={intention} onChange={e => onIntention(e.target.value)} placeholder="Today, I’ll…"/>
    <p className={`journal-status${storageError ? ' has-error' : ''}`} role="status">{saved && !storageError && <Check size={14} aria-hidden="true"/>}{status}</p>
    <p className="note-privacy">{storageError ? 'Your writing is kept for this session. Export it before leaving.' : 'Saved in this browser. Clearing browser data removes the local copy.'} <a href="#garden?tab=notes">View or export your reflections <span aria-hidden="true">↗</span></a></p>
    </div>
    </details>
  </section>;
}
