import { useRef, type ReactNode } from 'react';
import { X } from '@phosphor-icons/react';
import { useModalFocus } from './useModalFocus';

export function ReaderDialog({ title, eyebrow, className = '', onClose, children }: { title: string; eyebrow: string; className?: string; onClose: () => void; children: ReactNode }) {
  const ref = useRef<HTMLElement>(null);
  useModalFocus(ref, onClose);
  return <div className="reader-dialog-backdrop" onClick={event => { if (event.target === event.currentTarget) onClose(); }}>
    <section className={`reader-dialog ${className}`} ref={ref} role="dialog" aria-modal="true" aria-label={title} tabIndex={-1}>
      <header className="reader-dialog-header"><div><span>{eyebrow}</span><h2>{title}</h2></div><button className="reader-icon-button" onClick={onClose} aria-label={`Close ${title.toLowerCase()}`}><X size={21}/></button></header>
      {children}
    </section>
  </div>;
}
