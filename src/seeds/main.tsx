import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import SeedsApp from './SeedsApp';
import './seeds.css';
import './coastal.css';
import './reading-room.css';
import './starlight.css';
import './first-visit.css';
import './reading-refinements.css';
import { AppearanceProvider } from './Appearance';

createRoot(document.getElementById('root')!).render(<StrictMode><AppearanceProvider><SeedsApp /></AppearanceProvider></StrictMode>);
