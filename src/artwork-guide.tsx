import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import ArtworkGuidePage from './ArtworkGuidePage';
import './index.css';
import './interior.css';
import './wave3.css';
createRoot(document.getElementById('root')!).render(<StrictMode><ArtworkGuidePage /></StrictMode>);
