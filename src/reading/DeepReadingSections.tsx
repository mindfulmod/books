import type { DeepReading } from '../data';
import type { SystemBook } from '../systemTypes';
import { Eye, Shield } from '@phosphor-icons/react';
import { ReadingDisclosure } from './ReadingDisclosure';

/** Shared by every Deep section. Content comes from the book's existing reading record. */
export function DeepReadingSections({ reading: deepReading, sources }: { reading: DeepReading; sources: SystemBook['sources'] }) {
  return <>
                <section className="reasoning-section" aria-labelledby="reasoning-heading">
                  <div className="deep-section-heading">
                    <span>Reasoning sequence</span>
                    <h4 id="reasoning-heading">The argument, step by step</h4>
                  </div>
                  <div className="reasoning-moves">
                    {deepReading.moves.map((move, index) => (
                      <div className="reasoning-move" key={move.title}>
                        <span>{String(index + 1).padStart(2, "0")}</span>
                        <div><strong>{move.title}</strong><p>{move.body}</p></div>
                      </div>
                    ))}
                  </div>
                </section>

                {deepReading.closeReading && deepReading.closeReading.length > 0 && (
                  <section className="close-reading-section" aria-labelledby="close-reading-heading">
                    <div className="deep-section-heading">
                      <span>Closer reading</span>
                      <h4 id="close-reading-heading">A closer reading</h4>
                    </div>
                    <div className="close-reading-grid">
                      {deepReading.closeReading.map((item, index) => (
                        <article key={item.title}>
                          <span>{String(index + 1).padStart(2, "0")}</span>
                          <h5>{item.title}</h5>
                          <p>{item.body}</p>
                        </article>
                      ))}
                    </div>
                  </section>
                )}

                <section className="deep-distinction" aria-labelledby="distinction-heading">
                  <div className="deep-section-heading">
                    <span>Key distinction</span>
                    <h4 id="distinction-heading">{deepReading.distinction.title}</h4>
                  </div>
                  <div className="distinction-pair">
                    <div>
                      <span>{deepReading.distinction.firstLabel}</span>
                      <p>{deepReading.distinction.first}</p>
                    </div>
                    <div>
                      <span>{deepReading.distinction.secondLabel}</span>
                      <p>{deepReading.distinction.second}</p>
                    </div>
                  </div>
                </section>

                <div className="deep-practice-grid">
                  <section className="misreading-note">
                    <span><Shield size={16} weight="duotone" /> Common misreading</span>
                    <p>{deepReading.misreading}</p>
                  </section>
                  <section className="observation-note">
                    <span><Eye size={16} weight="duotone" /> Observe in life</span>
                    <p>{deepReading.observation}</p>
                  </section>
                </div>

                {deepReading.selfAudit && deepReading.selfAudit.length > 0 && (
                  <section className="self-audit" aria-labelledby="self-audit-heading">
                    <div className="deep-section-heading">
                      <span>Carry into observation</span>
                      <h4 id="self-audit-heading">Questions to carry with you</h4>
                    </div>
                    <ol>
                      {deepReading.selfAudit.map((question) => <li key={question}>{question}</li>)}
                    </ol>
                  </section>
                )}

    <ReadingDisclosure title="Sources and editorial note" className="reading-sources">
      <p className="reading-source-anchor">{deepReading.sourceAnchor}</p>
      <p>These are the book’s source references. The section anchor above identifies this reading; the links are not all specific to this passage.</p>
      {sources.map((source, index) => <a key={`${source.url}:${index}`} href={source.url} target="_blank" rel="noreferrer"><strong>{source.label}</strong><span>{source.note}</span></a>)}
      <p>This edition presents an original English synthesis. Diagrams and learning prompts are editorial aids.</p>
    </ReadingDisclosure>
  </>;
}
