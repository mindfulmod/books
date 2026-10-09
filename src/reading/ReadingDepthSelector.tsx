import { useId } from 'react';
import { BookOpenText, ListBullets, Stack } from '@phosphor-icons/react';
import type { Depth } from '../systemTypes';

export const depthOptions: Array<{ id: Depth; label: string; short: string; caption: string; description: string }> = [
  { id: 'glance', label: 'Brief', short: 'Brief', caption: 'The central idea', description: 'A short introduction to the idea and the distinction to keep in mind.' },
  { id: 'deep', label: 'Deep', short: 'Deep', caption: 'Argument & visuals', description: 'The full argument, visual explanations, and a closer reading of the distinctions.' },
  { id: 'sources', label: 'Sources', short: 'Sources', caption: 'References & notes', description: 'Source references, reading notes, and editorial grounding for this section.' },
];

export function ReadingDepthSelector({ value, onChange }: { value: Depth; onChange: (depth: Depth) => void }) {
  const descriptionId = useId();
  const active = depthOptions.find(option => option.id === value)!;
  return <section className="reading-depth-selector" aria-label="Choose your reading depth">
    <div className="reading-depth-label"><strong>Choose your reading depth</strong><span>Three ways into the same section</span></div>
    <div className="reading-depth-choices" role="group" aria-label="Reading depth" aria-describedby={descriptionId}>
      {depthOptions.map(option => {
        const Icon = option.id === 'glance' ? ListBullets : option.id === 'deep' ? Stack : BookOpenText;
        return <button key={option.id} type="button" data-depth={option.id} aria-label={option.label} aria-pressed={value === option.id} onClick={() => onChange(option.id)}>
          <Icon size={23} weight="duotone" aria-hidden="true" />
          <strong>{option.label}</strong><small>{option.caption}</small>
        </button>;
      })}
    </div>
    <p id={descriptionId} className="reading-depth-description"><strong>{active.id === 'sources' ? 'Source notes.' : `${active.label} reading.`}</strong> {active.description}</p>
  </section>;
}
