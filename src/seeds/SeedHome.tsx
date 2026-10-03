import { useRef } from 'react';
import { ArrowRight, BookOpen, BookmarkSimple, CaretDown, CheckCircle, Flower, HandHeart, Leaf, Plant, Sun, Waves } from '@phosphor-icons/react';
import { seeds, themes } from './content';
import { SceneImage, SeedThumbnail } from './Artwork';
import { getPath, readingPaths, type PathId } from './paths';
import { seedUrl } from './navigation';
import { followUpFor, resumeFor, type Garden, type FollowUp } from './state';
import { readingMinutes } from './discovery';

const icons = { hope: Sun, trust: Waves, presence: Leaf, return: Plant, gratitude: Flower, kindness: HandHeart };
export default function SeedHome({ garden, today, answered, answer, onSave }: { garden: Garden; today: number; answered: { id: number; value: FollowUp } | null; answer: (id: number, value: FollowUp) => void; onSave: (id: number) => void }) {
  const resume = resumeFor(garden, readingPaths);
  const returning = Boolean(resume);
  const pending = followUpFor(garden);
  const feelings = useRef<HTMLDetailsElement>(null);
  const todaySeed = seeds[today - 1];
  const reflected = seeds.filter(s => garden.notes[s.id]?.trim() || garden.intentions[s.id]?.trim()).length;
  const resumePath = getPath(resume?.path);
  const choosePath = () => { if (feelings.current) feelings.current.open = true; requestAnimationFrame(() => { document.getElementById('feelings-title')?.focus({ preventScroll: true }); document.getElementById('feelings-title')?.scrollIntoView({ block: 'center', behavior: 'instant' }); }); };
  const feelingChoices = <div className="seed-feelings"><h2 id="feelings-title" tabIndex={-1}>What do you need today?</h2><ul aria-labelledby="feelings-title">{themes.map(theme => { const Icon = icons[theme.id]; return <li key={theme.id}><a className={`seed-feeling tone-${theme.id}`} href={seedUrl(theme.route.find(id => !garden.read.includes(id)) ?? theme.route[0], theme.id)}><Icon size={20} weight="light"/><span>{theme.invitation}</span></a></li>; })}</ul></div>;
  return <main id="seeds-main" className={`seed-home${returning ? ' returning-home' : ''}`}>
    <section className={`seed-hero${returning ? ' has-resume' : ''}`}><div className="seed-hero-copy">
      <h1 tabIndex={-1} data-route-heading>{returning ? <>A little room<br/><em>for today.</em></> : <>Small seeds.<br/><em>Lasting hope.</em></>}</h1>
      <p className="seed-hero-line">{returning ? 'Pick up your reading. Take it at your own pace.' : 'Islamic wisdom from the Quran, hadith, and Muslim writers. Read, reflect, and try one small action.'}</p>
      {resume && <a className="return-reading" data-resume={resume.kind === 'return' || undefined} href={resume.kind === 'path-complete' ? '#today' : seedUrl(resume.id, resume.path as PathId | undefined)} onClick={event => { if (resume.kind === 'path-complete') { event.preventDefault(); choosePath(); } }}>
        <SeedThumbnail seedId={resume.id} eager/>
        <span className="return-reading-copy"><small><BookOpen size={15}/>{resume.kind === 'path-complete' ? `You finished ${resumePath?.title}` : resumePath ? `${resumePath.title} · ${resume.step} of ${resume.total}` : `Seed ${resume.id} of 111`}</small><strong>{resume.kind === 'path-complete' ? 'What do you need next?' : seeds[resume.id - 1].title}</strong><span className="return-takeaway">{resume.kind === 'path-complete' ? resumePath?.closing : seeds[resume.id - 1].takeaway}</span><span className="return-cta">{resume.kind === 'return' ? 'Continue reading' : resume.kind === 'path-complete' ? 'Choose a new path' : resume.kind === 'done' ? 'Read again' : 'Read the next seed'}<ArrowRight size={18}/></span></span>
      </a>}
      {returning ? <details className="home-feelings-disclosure" ref={feelings}><summary>Or choose what you need today<CaretDown size={18}/></summary>{feelingChoices}<a className="seed-text-link" href="#explore?paths=1">Paths for a moment you’re going through<ArrowRight size={16}/></a></details> : <>{feelingChoices}<div className="hero-actions"><a className="seed-text-link" href={seedUrl(12, 'kindness')}>Not sure? Start with one reading <ArrowRight size={16}/></a></div></>}
    </div><figure className="seed-hero-art"><SceneImage scene="coastal-home" alt="A cozy sunlit veranda opens onto turquoise water and pink clouds. A linen curtain catches the breeze beside an empty reading chair." nightAlt="A warmly lit veranda opens onto a starry blue sky, pink clouds and the sea. A linen curtain catches the breeze beside an empty reading chair." sizes="(max-width: 760px) 100vw, 65vw" eager priority={!returning}/><figcaption><span className="art-caption-symbol"><Sun size={25} weight="light"/></span><span>There is room<br/><em>to begin again.</em></span></figcaption></figure></section>
    {answered ? <section className="seed-followup is-answered" aria-live="polite"><p>{answered.value === 'done' ? 'Well done. That’s a seed taking root.' : 'That’s okay. There’s still today.'}</p><a className="seed-text-link" href={seedUrl(answered.id, undefined, answered.value === 'done' ? 'journal' : undefined)}>{answered.value === 'done' ? 'Write how it went' : 'Revisit the seed'}<ArrowRight size={16}/></a></section>
      : pending && <details className="home-checkin"><summary>A small action you planned<CaretDown size={18}/></summary><section className="seed-followup"><span className="seed-eyebrow">{pending.daysAgo === 1 ? 'Yesterday' : `${pending.daysAgo} days ago`} you planned to</span><p className="followup-plan">“{garden.intentions[pending.id].trim()}”</p><span className="followup-seed">From <a href={seedUrl(pending.id)}>{seeds[pending.id - 1].title}</a></span><div className="followup-actions"><button className="seed-primary" onClick={() => answer(pending.id, 'done')}><CheckCircle size={18}/>Yes, I did it</button><button className="seed-secondary" onClick={() => answer(pending.id, 'later')}>Not yet</button></div></section></details>}
    {(garden.saved.length > 0 || reflected > 0) && <a className="garden-return" href="#garden"><BookmarkSimple size={22}/><span><strong>Your garden is here when you need it.</strong><small>{garden.saved.length} saved seeds · {reflected} reflections & actions</small></span><ArrowRight size={19}/></a>}
    {returning && <section className="home-daily" aria-labelledby="daily-title"><a href={seedUrl(today)}><SeedThumbnail seedId={today}/><span><small>A seed for today · {readingMinutes(todaySeed)} min</small><h2 id="daily-title">{todaySeed.title}</h2><p>{todaySeed.takeaway}</p></span><ArrowRight size={20}/></a><button className="seed-icon-button" onClick={() => onSave(today)} aria-label={garden.saved.includes(today) ? 'Unsave today’s seed' : 'Save today’s seed'} aria-pressed={garden.saved.includes(today)}><BookmarkSimple size={21} weight={garden.saved.includes(today) ? 'fill' : 'regular'}/></button></section>}
  </main>;
}
