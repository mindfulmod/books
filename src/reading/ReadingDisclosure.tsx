import { type ReactNode } from 'react';

/** Native disclosure: keyboard support and state belong to the browser. */
export function ReadingDisclosure({ title, children, className = '' }: { title: string; children: ReactNode; className?: string }) {
  return <details className={`reading-disclosure ${className}`}>
    <summary><span>{title}</span><span className="reading-disclosure-mark" aria-hidden="true">+</span></summary>
    <div className="reading-disclosure-content">{children}</div>
  </details>;
}
