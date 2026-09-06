import { useState, type CSSProperties } from "react";
import { Heart, Wind, Flame, Brain, Sparkle, ArrowDown } from "@phosphor-icons/react";

const terms = [
  { name: "Heart", transliteration: "Qalb", icon: Heart, color: "#a34f43", title: "The bodily heart", meaning: "The physical organ in the chest. This is the meaning used in medicine.", kind: "A bodily organ" },
  { name: "Spirit", transliteration: "Ruh", icon: Wind, color: "#317d79", title: "The bodily spirit", meaning: "In the physicians’ usage described by Ghazali, a subtle body spreading from the heart through the vessels.", kind: "A bodily spirit" },
  { name: "Soul", transliteration: "Nafs", icon: Flame, color: "#9a6b28", title: "Appetite and anger", meaning: "The powers of appetite and anger: the sense used when speaking of struggling against the soul.", kind: "Appetite and anger" },
  { name: "Intellect", transliteration: "Aql", icon: Brain, color: "#526e9b", title: "Knowledge of realities", meaning: "Knowledge of the realities of things. In this sense, intellect names an attribute residing in the heart.", kind: "Knowledge" },
];

export function FourMeanings() {
  const [selected, setSelected] = useState(0);
  const [showAll, setShowAll] = useState(false);
  const term = terms[selected];
  return (
    <section className="four-meanings" aria-label="Four words, five meanings" style={{ "--term-color": term.color } as CSSProperties}>
      <header className="meaning-heading">
        <span><Sparkle size={15} weight="duotone" /> A map of the meanings</span>
        <h4>Four words.<br /><em>One meeting point.</em></h4>
        <p>Each word has two senses. Touch a word to follow both.</p>
      </header>
      <div className="meaning-terms" role="group" aria-label="Choose a word">
        {terms.map((item, i) => <button key={item.name} aria-pressed={selected === i} onClick={() => setSelected(i)} style={{ "--word-color": item.color } as CSSProperties}>
          <span className="meaning-medallion"><item.icon size={25} weight="duotone" /></span>
          <strong>{item.name}</strong><small>{item.transliteration}</small>
        </button>)}
      </div>
      <div className="meaning-branch" aria-hidden="true"><span>Two senses of {term.name.toLowerCase()}</span><ArrowDown size={18} /></div>
      <div className="meaning-specific" aria-live="polite" aria-atomic="true">
        <span className="meaning-number">01</span>
        <div key={term.name} className="meaning-reveal"><small>The distinct meaning</small><h5>{term.title}</h5><p>{term.meaning}</p></div>
      </div>
      <div className="meaning-convergence" aria-hidden="true">
        <div>{terms.map((item, i) => <span key={item.name} className={selected === i ? "selected" : ""}>{item.name}</span>)}</div>
        <svg viewBox="0 0 320 62" preserveAspectRatio="none">
          {[40, 120, 200, 280].map((x, i) => <path key={x} className={selected === i ? "selected" : ""} d={`M ${x} 0 C ${x} 34,160 22,160 58`} />)}
          <circle cx="160" cy="58" r="3" />
        </svg>
      </div>
      <div className="meaning-shared">
        <span className="meaning-number">02</span>
        <div><small>The shared meaning · all four words</small><h5>The knowing self</h5><p>The subtle reality of the person that perceives, knows, and is morally responsible.</p></div>
        <span className="meaning-shared-seal" aria-hidden="true"><Sparkle size={24} weight="duotone" /></span>
      </div>
      <p className="meaning-takeaway"><strong>Four distinct meanings + one shared meaning = five.</strong> This is why the meaning of a word matters before the argument begins.</p>
      <button className="meaning-compare" aria-expanded={showAll} onClick={() => setShowAll(!showAll)}>{showAll ? "Close the comparison" : "See all four meanings together"}<span aria-hidden="true">{showAll ? "−" : "+"}</span></button>
      {showAll && <div className="meaning-comparison">{terms.map(item => <div key={item.name}><strong>{item.name}</strong><span>{item.kind}</span></div>)}<p>All four also name the knowing self. This map summarises the distinctions in section 1.</p></div>}
    </section>
  );
}
