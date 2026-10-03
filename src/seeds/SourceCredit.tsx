import { ArrowDown, CaretDown } from '@phosphor-icons/react';
import type { SourceCredit as Credit } from './content';

export default function SourceCredit({ credit, jump }: { credit: Credit; jump: (id: string) => void }) {
  const names = credit.names.filter(name => name !== 'Qur’an' || credit.references.length === 0 || credit.references.length > 2);
  const links = <div className="reader-credit-links">{credit.references.map((reference, i) => <button key={i} onClick={() => jump(reference.target)}>{reference.label}<ArrowDown size={12} aria-hidden="true"/></button>)}</div>;
  return <div className="reader-credit" aria-label="Sources credited in this seed">
    <span className="source-credit-label">In the book</span>
    {names.length > 0 && <p>{names.join(' · ')}</p>}
    {credit.references.length > 2 ? <details className="reader-credit-more"><summary>{credit.references.length} passage references<CaretDown size={14}/></summary>{links}</details> : links}
  </div>;
}
