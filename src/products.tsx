import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import ProductsPage from './ProductsPage';
import './index.css';
import './interior.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ProductsPage />
  </StrictMode>,
);
