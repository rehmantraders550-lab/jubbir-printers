import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import ServiceDetailPage from './ServiceDetailPage';
import './index.css';
import './interior.css';
import './service-pages.css';

createRoot(document.getElementById('root')!).render(<StrictMode><ServiceDetailPage service="dtf" /></StrictMode>);
