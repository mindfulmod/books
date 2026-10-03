import { themes, type ThemeId } from './content';
import { pathClosings, pathGuidance } from './pathGuidance';

export type PathId = ThemeId | 'after-argument' | 'waiting' | 'starting-again' | 'living-with-loss';
export type ReadingPath = { id: PathId; title: string; description: string; route: number[]; theme: ThemeId; closing: string; steps: string[]; situation?: boolean };
export const situationPaths: ReadingPath[] = [
  { id: 'after-argument', title: 'After an argument', theme: 'kindness', situation: true,
    description: 'Pause, make room for mercy, and decide what you can put right.', route: [77, 57, 74, 12],
    steps: ['Give yourself a pause before your next reply.', 'Let mercy shape how you meet another person’s faults.', 'Take responsibility for your part and turn back to Allah.', 'Choose one useful way to help or repair harm.'],
    closing: 'Pause before replying, treat the other person with mercy, and take responsibility for your part. Choose one honest, useful step toward putting things right.' },
  { id: 'waiting', title: 'While you’re waiting for news', theme: 'trust', situation: true,
    description: 'Make room for uncertainty without giving up the good you can do.', route: [33, 92, 55, 46],
    steps: ['Separate what you can do from what you cannot control.', 'Keep asking Allah while an answer takes time.', 'Give your attention to one useful action now.', 'Take that step with trust in Allah.'],
    closing: 'You do not have to solve every uncertainty today. Keep asking Allah, do what is useful, and give the outcome to Him.' },
  { id: 'starting-again', title: 'After making a mistake', theme: 'return', situation: true,
    description: 'Face what happened, keep hope, and begin a sincere return.', route: [50, 10, 74, 70],
    steps: ['Begin with hope in Allah’s forgiveness.', 'Turn back sincerely after a wrong choice.', 'Let regret lead to repentance and repair.', 'Make a little time to review your choices each day.'],
    closing: 'Keep hope in forgiveness, turn away from the wrong, and put right any harm you can. Return to that care when you review your day.' },
  { id: 'living-with-loss', title: 'When you’re living with loss', theme: 'hope', situation: true,
    description: 'Acknowledge sadness, bring it to Allah, and gently notice what remains.', route: [15, 103, 109, 110],
    steps: ['Sadness does not mean you lack faith.', 'Bring your sadness to Allah with hope.', 'Make room for one useful part of the day alongside your grief.', 'Notice what remains, and give yourself time to find some ease.'],
    closing: 'Sadness and faith can exist together. Bring your need to Allah, allow yourself time, and choose one small way to care for the life still around you.' },
];
export const readingPaths: ReadingPath[] = [
  ...themes.map(t => ({ id: t.id, title: t.title, description: t.description, route: t.route, theme: t.id, closing: pathClosings[t.id], steps: t.route.map(id => pathGuidance[id]?.question || '') })),
  ...situationPaths,
];
export const getPath = (id: string | null | undefined) => readingPaths.find(path => path.id === id);
export const isPathId = (id: string | null): id is PathId => Boolean(getPath(id));
