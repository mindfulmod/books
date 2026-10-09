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

function SpeechContextStudy() { const [mode,setMode]=useState(0); return <><Choices label="Explore motives or permitted purposes" items={['Motives','Permitted purposes']} value={mode} onChange={setMode}/>{mode===0?<PassageNotebook entry={notebooks['24:28']}/>:<DisclosurePurposes/>}</>; }

type DeepExperience = { content: ReactNode; replacesIntro?: boolean; replacesPractice?: boolean; className?: string };
type ExperienceFactory = (book: SystemBook) => DeepExperience | undefined;

// Register a reviewed section here; the shared reader never needs another book-id branch.
// New entries require a source record in review/ and retain the original reading below.
const experiences: Record<string, ExperienceFactory> = {
  ...Object.fromEntries(Object.entries(notebooks).map(([key,entry]) => [key, () => ({content:<PassageNotebook key={`study:${key}`} entry={entry}/>,replacesIntro:true,replacesPractice:true})])),
  '4:7': () => ({content:<SixMeaningsStudy/>,replacesIntro:true,replacesPractice:true}),
  '22:13': () => ({content:<TreatmentStudy/>,replacesIntro:true,replacesPractice:true}),
  '22:16': () => ({content:<FeedbackStudy/>,replacesIntro:true,replacesPractice:true}),
  '24:31': () => ({content:<DisclosurePurposes/>,replacesIntro:true,replacesPractice:true}),
  '24:28': () => ({content:<SpeechContextStudy/>,replacesIntro:true,replacesPractice:true}),
  '24:34': () => ({content:<ReceiverStudy/>,replacesIntro:true,replacesPractice:true}),
  '21:6': () => ({ content: <MirrorStudy />, replacesIntro: true, replacesPractice: true }),
  '21:19': () => ({ content: <ThoughtStudy />, replacesIntro: true, replacesPractice: true }),
  '31:1': () => ({ content: <RepentanceStudy />, replacesIntro: true, replacesPractice: true }),
  '4:15': () => ({ content: <PrayerStudy />, replacesIntro: true, replacesPractice: true }),
  '22:10': () => ({ content: <CharacterStudy />, replacesIntro: true, replacesPractice: true }),
  '24:26': () => ({ content: <SpeechStudy />, replacesIntro: true, replacesPractice: true }),
  '21:1': () => ({ content: <FourMeanings /> }),
  '21:3': book => book.conceptLab ? ({ content: <CityDeepReading lab={book.conceptLab} />, replacesIntro: true, replacesPractice: true, className: 'city-deep-pilot' }) : undefined,
};
export const reviewedExplorations: Record<string, string> = {
  "4:7": "Six meanings",
  "4:15": "Element by element",
  "22:13": "The guide's prescriptions",
  "22:16": "Four ways to know your faults",
  "22:10": "Gift or effort",
  "24:26": "Even when it is true",
  "24:28": "Why people backbite",
  "24:31": "Six excuses for naming",
  "24:34": "When a tale is brought to you",
  "21:6": "The mirror and its five blocks",
  "21:19": "Which thoughts are forgiven",
  "31:1": "Knowing, regret, action",
  "21:1": "Four words, five meanings",
  "21:3": "King, frontier, rider",
  "21:10": "The pool and the two doors",
  "31:24": "Settling with every person",
  "31:29": "After a slip",
  "31:31": "The medicine for persisting"
};

export function getDeepExperience(book: SystemBook, sectionId: number) {
  const key = `${book.id}:${sectionId}`;
  const chapter = book.chapters.find(chapter => chapter.id === sectionId);
  return chapter?.shortTitle === reviewedExplorations[key] ? experiences[key]?.(book) : undefined;
}

/** Only surface studies that still match their reviewed passage. */
export const getExplorationSections = (book: SystemBook) => book.chapters.filter(chapter => Boolean(getDeepExperience(book, chapter.id)));
