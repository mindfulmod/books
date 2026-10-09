import { useCallback, useEffect, useRef, useState } from 'react';
import { bookNavigation } from './bookNavigation';
import { normalizeWorkspace, recordReadingVisit, toggleReadingComplete, sectionKey, workspaceKey, type ReadingNote, type ReadingPreferences } from './readingWorkspace';

export function useReadingWorkspace() {
  const [workspace, setWorkspace] = useState(() => {
    try { return normalizeWorkspace(JSON.parse(localStorage.getItem(workspaceKey) ?? 'null'), bookNavigation, localStorage.getItem('ihya-large-text') === 'true'); }
    catch { return normalizeWorkspace(null, bookNavigation); }
  });
  const [storageError, setStorageError] = useState(false);
  const storedValue = useRef<string | null>(null);
  useEffect(() => {
    const receive = (event: StorageEvent) => {
      if (event.key !== workspaceKey && event.key !== null) return;
      try {
        const next = normalizeWorkspace(JSON.parse(event.newValue ?? 'null'), bookNavigation);
        storedValue.current = JSON.stringify(next);
        setWorkspace(next);
        setStorageError(false);
      } catch { /* Ignore an incomplete or malformed update from another tab. */ }
    };
    window.addEventListener('storage', receive);
    return () => window.removeEventListener('storage', receive);
  }, []);
  useEffect(() => {
    const value = JSON.stringify(workspace);
    if (value === storedValue.current) return;
    try { localStorage.setItem(workspaceKey, value); storedValue.current = value; setStorageError(false); }
    catch { setStorageError(true); }
  }, [workspace]);
  const recordVisit = useCallback((bookId: number, chapterId: number) => {
    const key = sectionKey(bookId, chapterId);
    setWorkspace(current => recordReadingVisit(current, key));
  }, []);
  const toggleComplete = (key: string) => setWorkspace(current => toggleReadingComplete(current, key));
  const updateNote = (key: string, note: ReadingNote | null) => setWorkspace(current => {
    const notes = { ...current.notes };
    if (note?.body.trim()) notes[key] = note; else delete notes[key];
    return { ...current, notes };
  });
  const setPreferences = (preferences: ReadingPreferences) => setWorkspace(current => ({ ...current, preferences }));
  return { workspace, storageError, recordVisit, toggleComplete, updateNote, setPreferences };
}
