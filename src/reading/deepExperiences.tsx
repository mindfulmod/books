import type { ReactNode } from 'react';
import type { SystemBook } from '../systemTypes';
import { CityDeepReading } from '../CityDeepReading';
import { FourMeanings } from '../FourMeanings';
import { MirrorStudy, ThoughtStudy } from './experiences/HeartStudies';
import { RepentanceStudy } from './experiences/RepentanceStudy';
import { PrayerStudy } from './experiences/PrayerStudy';
import { CharacterStudy } from './experiences/CharacterStudy';
import { SpeechStudy } from './experiences/SpeechStudy';

import { SixMeaningsStudy, FeedbackStudy, TreatmentStudy, ReceiverStudy, DisclosurePurposes } from './experiences/SecondPassStudies';
import { PassageNotebook, notebooks } from './experiences/ConnectedStudies';
import { useState } from 'react';
import { Choices } from './experiences/Study';

function SpeechContextStudy() { const [mode,setMode]=useState(0); return <><Choices label="Explore motives or permitted purposes" items={['Motives','Permitted purposes']} value={mode} onChange={setMode}/>{mode===0?<PassageNotebook entry={notebooks['24:17']}/>:<DisclosurePurposes/>}</>; }

type DeepExperience = { content: ReactNode; replacesIntro?: boolean; replacesPractice?: boolean; className?: string };
type ExperienceFactory = (book: SystemBook) => DeepExperience | undefined;

// Register a reviewed section here; the shared reader never needs another book-id branch.
// New entries require a source record in review/ and retain the original reading below.
const experiences: Record<string, ExperienceFactory> = {
  ...Object.fromEntries(Object.entries(notebooks).map(([key,entry]) => [key, () => ({content:<PassageNotebook key={`study:${key}`} entry={entry}/>,replacesIntro:true,replacesPractice:true})])),
  '4:4': () => ({content:<SixMeaningsStudy/>,replacesIntro:true,replacesPractice:true}),
  '22:5': () => ({content:<TreatmentStudy/>,replacesIntro:true,replacesPractice:true}),
  '22:7': () => ({content:<FeedbackStudy/>,replacesIntro:true,replacesPractice:true}),
  '24:17': () => ({content:<SpeechContextStudy/>,replacesIntro:true,replacesPractice:true}),
  '24:18': () => ({content:<ReceiverStudy/>,replacesIntro:true,replacesPractice:true}),
  '21:6': () => ({ content: <MirrorStudy />, replacesIntro: true, replacesPractice: true }),
  '21:13': () => ({ content: <ThoughtStudy />, replacesIntro: true, replacesPractice: true }),
  '31:1': () => ({ content: <RepentanceStudy />, replacesIntro: true, replacesPractice: true }),
  '4:12': () => ({ content: <PrayerStudy />, replacesIntro: true, replacesPractice: true }),
  '22:4': () => ({ content: <CharacterStudy />, replacesIntro: true, replacesPractice: true }),
  '24:16': () => ({ content: <SpeechStudy />, replacesIntro: true, replacesPractice: true }),
  '21:1': () => ({ content: <FourMeanings /> }),
  '21:3': book => book.conceptLab ? ({ content: <CityDeepReading lab={book.conceptLab} />, replacesIntro: true, replacesPractice: true, className: 'city-deep-pilot' }) : undefined,
};
export const getDeepExperience = (book: SystemBook, sectionId: number) => experiences[`${book.id}:${sectionId}`]?.(book);

/** Discovery uses the registry's keys, so every registered section is reachable without a second list. */
export const getExplorationSections = (book: SystemBook) => book.chapters.filter(chapter => `${book.id}:${chapter.id}` in experiences);
