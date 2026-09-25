import { ArrowRight, Menu, X } from 'lucide-react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { useCallback, useState, type ReactNode } from 'react';
import { JobDrawer } from './JobDrawer';

const nav = [
  ['Home', './index.html'],
  ['Products', './products.html'],
  ['Capabilities', './capabilities.html'],
  ['Work', './index.html#work'],
  ['Process', './index.html#process'],
] as const;

type InteriorShellProps = {
  children: ReactNode;
  current: 'Products' | 'Capabilities';
};

export function InteriorShell({ children, current }: InteriorShellProps) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const reduceMotion = useReducedMotion();

  const openDrawer = useCallback(() => {
    setMenuOpen(false);
    setDrawerOpen(true);
  }, []);

  return (
    <div className="site-shell">
      <a className="skip-link" href="#main-content">Skip to content</a>
      <header className="site-header">
        <div className="site-wrap header-inner">
          <a className="brand" href="./index.html" aria-label="Jubbir Printers home">
            <span className="brand-mark" aria-hidden="true">JP</span>
            <span className="brand-copy">
              <strong>JUBBIR PRINTERS</strong>
              <small>Production Desk</small>
            </span>
          </a>
          <nav className="desktop-nav" aria-label="Primary navigation">
            {nav.map(([label, href]) => (
              <a key={label} href={href} aria-current={label === current ? 'page' : undefined}>{label}</a>
            ))}
          </nav>
          <div className="header-actions">
            <button
              type="button"
              className="menu-button"
              aria-expanded={menuOpen}
              aria-controls="mobile-navigation"
              aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              onClick={() => setMenuOpen((value) => !value)}
            >
              {menuOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
            </button>
            <button type="button" className="button button--accent header-cta" onClick={openDrawer}>
              Start a Job <ArrowRight aria-hidden="true" />
            </button>
          </div>
        </div>
        <AnimatePresence>
          {menuOpen && (
            <motion.nav
              id="mobile-navigation"
              className="mobile-nav"
              aria-label="Mobile navigation"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: reduceMotion ? 0 : 0.2 }}
            >
              <div className="site-wrap">
                {nav.map(([label, href], index) => (
                  <a key={label} href={href} aria-current={label === current ? 'page' : undefined}>
                    <span>0{index + 1}</span>{label}
                  </a>
                ))}
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </header>
      <main id="main-content">{children}</main>
      <footer className="site-footer">
        <div className="site-wrap footer-grid">
          <div>
            <a className="footer-brand" href="./index.html">JUBBIR PRINTERS</a>
            <p>Commercial Print / Packaging / DTF Transfers / Custom Production</p>
          </div>
          <nav aria-label="Footer navigation">
            <p className="micro-label">Production desk</p>
            {nav.slice(0, 3).map(([label, href]) => <a key={label} href={href}>{label}</a>)}
          </nav>
          <div>
            <p className="micro-label">Closing line</p>
            <h2>From supplied artwork to finished production.</h2>
          </div>
        </div>
        <div className="site-wrap footer-bottom">
          <span>JUBBIR / PRODUCTION DESK</span>
          <span>PRINT WITH PURPOSE.</span>
        </div>
      </footer>
      <JobDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </div>
  );
}
