import { ArrowRight, CaretDown, Check } from '@phosphor-icons/react';
import { seeds } from './content';
import { SeedThumbnail } from './Artwork';
import { situationPaths } from './paths';
import { seedUrl } from './navigation';
import { readingMinutes } from './discovery';
import type { Garden } from './state';

export default function PathCollection({ garden, expanded = false }: { garden: Garden; expanded?: boolean }) {
  return <details className="situation-paths" id="situation-paths" open={expanded || undefined}>
    <summary><span><small>A few readings, connected</small>For a moment you’re going through</span><CaretDown size={19}/></summary>
    <div className="situation-path-grid">{situationPaths.map(path => {
      const next = path.route.find(id => !garden.read.includes(id)) ?? path.route[0];
      const count = path.route.filter(id => garden.read.includes(id)).length;
      return <details className={`situation-path tone-${path.theme}`} key={path.id}><summary><SeedThumbnail seedId={path.route[0]}/><span><strong>{path.title}</strong><small>{path.route.length} seeds · About {path.route.reduce((n, id) => n + readingMinutes(seeds[id - 1]), 0)} min</small></span><CaretDown size={18}/></summary><div className="situation-path-body"><p>{path.description}</p><ol>{path.route.map((id, i) => <li key={id}><a href={seedUrl(id, path.id)}><span>{garden.read.includes(id) ? <Check size={15}/> : i + 1}</span><span><strong>{seeds[id - 1].title}</strong><small>{path.steps[i]}</small></span></a></li>)}</ol><a className="seed-primary" href={seedUrl(next, path.id)}>{count > 0 && count < path.route.length ? 'Continue this path' : count === path.route.length ? 'Read this path again' : 'Begin this path'}<ArrowRight size={17}/></a></div></details>;
    })}</div>
  </details>;
}
