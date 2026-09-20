import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import ProductionDesk from './ProductionDesk.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ProductionDesk />
  </StrictMode>,
);
