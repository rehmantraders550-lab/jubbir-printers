import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import CapabilitiesPage from './CapabilitiesPage';
import './index.css';
import './interior.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <CapabilitiesPage />
  </StrictMode>,
);
