import { Check, PencilSimple } from '@phosphor-icons/react';
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
  const saved = savedGarden !== null && note === (savedGarden.notes[seed.id] || '') && intention === (savedGarden.intentions[seed.id] || '');
  const status = storageError ? 'Browser saving unavailable' : !saved ? 'Saving…' : note || intention ? 'Saved in this browser' : 'Saved as you write';

  return <section className="reader-reflection" id="seed-reflection" tabIndex={-1} aria-labelledby="journal-heading">
    <div className="reflection-heading"><div><span className="reader-section-label"><PencilSimple size={15}/> A little space for you</span><h2 id="journal-heading">Your journal</h2></div></div>
    <p className="journal-prompt">{seed.prompt}</p>
    <label htmlFor="seed-note">Your reflection</label>
    <textarea id="seed-note" rows={6} maxLength={20000} value={note} onChange={e => onNote(e.target.value)} placeholder="Write whatever comes to mind…"/>
    <label htmlFor="seed-intention">One small action</label>
    <input id="seed-intention" maxLength={1000} value={intention} onChange={e => onIntention(e.target.value)} placeholder="Today, I’ll…"/>
    <p className={`journal-status${storageError ? ' has-error' : ''}`} role="status">{saved && !storageError && <Check size={14} aria-hidden="true"/>}{status}</p>
    <p className="note-privacy">{storageError ? 'Your writing is kept for this session. Export it before leaving.' : 'Only in this browser. Keep a copy whenever you like.'} <a href="#garden">Export from My garden <span aria-hidden="true">↗</span></a></p>
  </section>;
}
