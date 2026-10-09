import type { SystemBook } from '../systemTypes';
import navigation from './book-navigation.json';

export type BookNavigation = Pick<SystemBook, 'id' | 'title' | 'defaultJourneyId'> & {
  chapters: Array<Pick<SystemBook['chapters'][number], 'id' | 'shortTitle' | 'formalTitle'>>;
  journeys: Array<{ id: string; nodes: Array<{ id: string; chapterId: number }> }>;
};
export const bookNavigation: BookNavigation[] = navigation;
