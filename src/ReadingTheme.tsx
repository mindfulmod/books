import { useEffect, useState } from 'react';
import { Moon, Sun } from '@phosphor-icons/react';
export type ReadingTheme = 'light' | 'dark';
export function useReadingTheme() {
  const [theme, setTheme] = useState<ReadingTheme>(() => {
    try { const saved=localStorage.getItem('reading-theme'); if(saved==='light'||saved==='dark') return saved; } catch { /* Use the device preference. */ }
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });
  useEffect(()=>{
    document.documentElement.dataset.readingTheme=theme;
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content',theme==='dark'?'#0d1524':'#faf8f1');
  },[theme]);
  const toggle=()=>setTheme(current=>{const next=current==='dark'?'light':'dark';try{localStorage.setItem('reading-theme',next);}catch{/* Keep the choice for this session. */}return next;});
  return {theme,toggle};
}
export function ThemeButton({theme,onToggle}:{theme:ReadingTheme;onToggle:()=>void}) {
  return <button className="reading-theme-toggle" onClick={onToggle} aria-label="Dark mode" aria-pressed={theme==='dark'} title={theme==='dark'?'Switch to light mode':'Switch to dark mode'}>{theme==='dark'?<Sun size={18}/>:<Moon size={18}/>}<span>{theme==='dark'?'Light mode':'Dark mode'}</span></button>;
}
