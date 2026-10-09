import type { DeepReading } from '../data';
import type { SystemBook } from '../systemTypes';
import { Eye, Shield } from '@phosphor-icons/react';
import { ReadingDisclosure } from './ReadingDisclosure';
import { Fragment, type ReactNode } from 'react';

/** The authored opening stays available even when a passage has a bespoke study. */
export function ReadingThesis({ reading }: { reading: DeepReading }) {
  return <header className="deep-thesis" data-reading-anchor="thesis">
    <span>The argument</span><h3>{reading.thesis}</h3><p>{reading.context}</p>
  </header>;
}

/** Shared by every Deep section. Content comes from the book's existing reading record. */
export function DeepReadingSections({ reading: deepReading, sources, exploration }: { reading: DeepReading; sources: SystemBook['sources']; exploration?: ReactNode }) {
  return <>
                <section className="reasoning-section" aria-labelledby="reasoning-heading">
                  <div className="deep-section-heading">
                    <span>Reasoning sequence</span>
                    <h4 id="reasoning-heading">The argument, step by step</h4>
                  </div>
                  <div className="reasoning-moves">
                    {deepReading.moves.map((move, index) => {
                      const passage = <div className="reasoning-move" id={move.id} data-reading-anchor={move.id ?? `reasoning-${index + 1}`} tabIndex={-1}>
                        <span>{String(index + 1).padStart(2, "0")}</span>
                        <div><strong>{move.title}</strong><p>{move.body}</p></div>
                      </div>;
                      if (deepReading.visualAlongside && move.id === deepReading.visualAlongside && exploration) return <div key={move.title} className="reasoning-spread">{exploration}{passage}</div>;
                      return <Fragment key={move.title}>{passage}
                      {!deepReading.visualAlongside && index === 1 && exploration && <div className="reasoning-visual-interlude">{exploration}{deepReading.moves.length > 2 && <p className="reasoning-continue-label">Continue the argument <span aria-hidden="true">↓</span></p>}</div>}
                    </Fragment>;
                    })}
                  </div>
                </section>

                {deepReading.moves.length < 2 && exploration}

                {deepReading.closeReading && deepReading.closeReading.length > 0 && (
                  <section className="close-reading-section" data-reading-anchor="close-reading" aria-labelledby="close-reading-heading">
                    <div className="deep-section-heading">
                      <span>Closer reading</span>
                      <h4 id="close-reading-heading">A closer reading</h4>
                    </div>
                    <div className="close-reading-grid">
                      {deepReading.closeReading.map((item, index) => (
                        <article key={item.title} data-reading-anchor={`close-reading-${index + 1}`}>
                          <span>{String(index + 1).padStart(2, "0")}</span>
                          <h5>{item.title}</h5>
                          <p>{item.body}</p>
                        </article>
                      ))}
                    </div>
                  </section>
                )}

                <section className="deep-distinction" data-reading-anchor="distinction" aria-labelledby="distinction-heading">
                  <div className="deep-section-heading">
                    <span>Key distinction</span>
                    <h4 id="distinction-heading">{deepReading.distinction.title}</h4>
                  </div>
                  <div className="reading-distinction-fork" aria-hidden="true"><svg viewBox="0 0 400 62"><path d="M200 0V20Q200 30 190 30H72Q62 30 62 40V55M200 20Q200 30 210 30H328Q338 30 338 40V55"/><circle cx="200" cy="6" r="5"/><circle cx="62" cy="55" r="5"/><circle cx="338" cy="55" r="5"/></svg></div>
                  <div className="reading-distinction-paths">
                    <div><i aria-hidden="true">A</i>
                      <strong>{deepReading.distinction.firstLabel}</strong>
                      <p>{deepReading.distinction.first}</p>
                    </div>
                    <div><i aria-hidden="true">B</i>
                      <strong>{deepReading.distinction.secondLabel}</strong>
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
                  <section className="self-audit" data-reading-anchor="self-audit" aria-labelledby="self-audit-heading">
                    <div className="deep-section-heading">
                      <span>Carry into observation</span>
                      <h4 id="self-audit-heading">Questions to carry with you</h4>
                    </div>
                    <ol>
                      {deepReading.selfAudit.map((question) => <li key={question}>{question}</li>)}
                    </ol>
                  </section>
                )}

    <section className="reading-section-source" data-reading-anchor="source-note" aria-labelledby="reading-source-heading">
      <h4 id="reading-source-heading">Source for this reading</h4>
      <p id="reading-source-anchor" className="reading-source-anchor">{deepReading.sourceAnchor}</p>
    </section>
    <ReadingDisclosure title="References and editorial note" className="reading-sources">
      <p>These are the book’s source references. The section anchor above identifies this reading; the links are not all specific to this passage.</p>
      {sources.map((source, index) => <a key={`${source.url}:${index}`} href={source.url} target="_blank" rel="noreferrer"><strong>{source.label}</strong><span>{source.note}</span></a>)}
      <p>This edition presents an original English synthesis. Diagrams and learning prompts are editorial aids.</p>
    </ReadingDisclosure>
  </>;
}
