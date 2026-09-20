import { useCallback, useMemo, useRef, useState, type KeyboardEvent } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { ArrowRight, Check, ChevronRight, Menu, X } from 'lucide-react';
import { JobDrawer } from './JobDrawer';
import {
  artworkChecks,
  capabilities,
  deskStages,
  jobTypes,
  processSteps,
  productionJobs,
  serviceOrder,
  services,
  type ServiceKey,
} from './data';
import heroImage from './assets/images/jubbir-hero-v2.webp';

const navigation = [
  ['Services', '#services'],
  ['Capabilities', '#capabilities'],
  ['Work', '#work'],
  ['Process', '#process'],
] as const;

export default function ProductionDesk() {
  const [activeService, setActiveService] = useState<ServiceKey>('commercial');
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const serviceTabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const reduceMotion = useReducedMotion();
  const active = useMemo(() => services[activeService], [activeService]);

  const openDrawer = useCallback(() => {
    setMenuOpen(false);
    setDrawerOpen(true);
  }, []);

  const closeDrawer = useCallback(() => setDrawerOpen(false), []);

  const handleServiceKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    let nextIndex = index;

    if (event.key === 'ArrowDown' || event.key === 'ArrowRight') nextIndex = (index + 1) % serviceOrder.length;
    else if (event.key === 'ArrowUp' || event.key === 'ArrowLeft') nextIndex = (index - 1 + serviceOrder.length) % serviceOrder.length;
    else if (event.key === 'Home') nextIndex = 0;
    else if (event.key === 'End') nextIndex = serviceOrder.length - 1;
    else return;

    event.preventDefault();
    const nextKey = serviceOrder[nextIndex];
    setActiveService(nextKey);
    serviceTabRefs.current[nextIndex]?.focus();
  };

  return (
    <div className="site-shell">
      <a className="skip-link" href="#main-content">Skip to content</a>

      <header className="site-header">
        <div className="site-wrap header-inner">
          <a className="brand" href="#top" aria-label="Jubbir Printers home">
            <span className="brand-mark" aria-hidden="true">JP</span>
            <span className="brand-copy">
              <strong>JUBBIR PRINTERS</strong>
              <small>Production Desk</small>
            </span>
          </a>

          <nav className="desktop-nav" aria-label="Primary navigation">
            {navigation.map(([label, href]) => <a key={href} href={href}>{label}</a>)}
          </nav>

          <div className="header-actions">
            <button
              type="button"
              className="menu-button"
              aria-expanded={menuOpen}
              aria-controls="mobile-navigation"
              aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              onClick={() => setMenuOpen((current) => !current)}
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
                {navigation.map(([label, href], index) => (
                  <a key={href} href={href} onClick={() => setMenuOpen(false)}>
                    <span>0{index + 1}</span>{label}
                  </a>
                ))}
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </header>

      <main id="main-content">
        <section id="top" className="hero">
          <div className="hero-grid">
            <motion.div
              className="hero-copy"
              initial={{ opacity: 0, y: reduceMotion ? 0 : 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: reduceMotion ? 0 : 0.55 }}
            >
              <p className="eyebrow">Commercial Print / Packaging / DTF / Custom Production</p>
              <h1>Printing made straightforward.</h1>
              <p className="hero-lead">
                Send your specification, quantity and artwork. We review the job, define the production route and move it forward from one desk.
              </p>
              <div className="hero-actions">
                <button type="button" className="button button--accent" onClick={openDrawer}>
                  Start a Job <ArrowRight aria-hidden="true" />
                </button>
                <a className="button button--outline" href="#process">
                  How it works <ChevronRight aria-hidden="true" />
                </a>
              </div>
            </motion.div>

            <div className="hero-visual">
              <img src={heroImage} alt="Commercial offset press producing full-colour printed sheets" />
              <div className="hero-scrim" aria-hidden="true" />
              <div className="desk-register" aria-label="Production desk stages">
                <div className="desk-register__head">
                  <span>Production Desk</span>
                  <span>JOB / 01</span>
                </div>
                <ol>
                  {deskStages.map((stage, index) => (
                    <li key={stage}>
                      <span>0{index + 1}</span>
                      <strong>{stage}</strong>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
        </section>

        <div className="job-strip" aria-label="Common production jobs">
          <div className="site-wrap">
            {jobTypes.map((job) => <span key={job}>{job}</span>)}
          </div>
        </div>

        <section id="services" className="section section--paper">
          <div className="site-wrap service-layout">
            <div className="section-intro service-intro">
              <p className="eyebrow">Choose your production route</p>
              <h2>One desk. Different production paths.</h2>
              <p>The route changes with the job. The interface stays simple.</p>
              <div className="service-tabs" role="tablist" aria-label="Production services" aria-orientation="vertical">
                {serviceOrder.map((key, index) => (
                  <button
                    key={key}
                    ref={(element) => { serviceTabRefs.current[index] = element; }}
                    id={`service-tab-${key}`}
                    type="button"
                    role="tab"
                    aria-selected={activeService === key}
                    aria-controls={`service-panel-${key}`}
                    tabIndex={activeService === key ? 0 : -1}
                    className={activeService === key ? 'is-active' : ''}
                    onClick={() => setActiveService(key)}
                    onKeyDown={(event) => handleServiceKeyDown(event, index)}
                  >
                    <span><small>0{index + 1}</small>{services[key].label}</span>
                    <span className="tab-indicator" aria-hidden="true" />
                  </button>
                ))}
              </div>
            </div>

            <AnimatePresence mode="wait">
              <motion.article
                key={activeService}
                id={`service-panel-${activeService}`}
                role="tabpanel"
                aria-labelledby={`service-tab-${activeService}`}
                className="service-panel"
                initial={{ opacity: 0, y: reduceMotion ? 0 : 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: reduceMotion ? 0 : -8 }}
                transition={{ duration: reduceMotion ? 0 : 0.2 }}
              >
                <p className="eyebrow">{active.kicker}</p>
                <h3>{active.title}</h3>
                <p className="service-description">{active.description}</p>
                <div className="service-details">
                  <div>
                    <p className="micro-label">Typical jobs</p>
                    <ul>
                      {active.applications.map((item) => (
                        <li key={item}><Check aria-hidden="true" />{item}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="production-focus">
                    <p className="micro-label">Production focus</p>
                    <strong>{active.process}</strong>
                  </div>
                </div>
              </motion.article>
            </AnimatePresence>
          </div>
        </section>

        <section id="capabilities" className="section capabilities">
          <div className="site-wrap">
            <div className="section-head section-head--dark">
              <div>
                <p className="eyebrow">Production capability register</p>
                <h2>What the desk can coordinate.</h2>
              </div>
              <p>Production decisions are made around the specification, artwork, material and intended result.</p>
            </div>
            <div className="capability-list">
              {capabilities.map(({ icon: Icon, title, copy, meta }, index) => (
                <article className="capability-row" key={title}>
                  <span className="capability-number">0{index + 1}</span>
                  <span className="capability-icon" aria-hidden="true"><Icon /></span>
                  <h3>{title}</h3>
                  <p>{copy}</p>
                  <small>{meta}</small>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="work" className="section work-section">
          <div className="site-wrap">
            <div className="section-head">
              <div>
                <p className="eyebrow">Selected production</p>
                <h2>Work, not decoration.</h2>
              </div>
              <p>Printed objects, real substrates and finished production—not generic studio imagery.</p>
            </div>
            <div className="proof-wall">
              {productionJobs.map((job, index) => (
                <article className={`proof-card ${job.className}`} key={job.title}>
                  <img src={job.image} alt={job.alt} loading={index === 0 ? 'eager' : 'lazy'} />
                  <div className="proof-card__scrim" aria-hidden="true" />
                  <div className="proof-card__meta">
                    <small>0{index + 1} / {job.category}</small>
                    <h3>{job.title}</h3>
                    <p>{job.meta}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section artwork-section">
          <div className="site-wrap artwork-layout">
            <div className="section-intro artwork-intro">
              <p className="eyebrow">Artwork check</p>
              <h2>Before you send the file.</h2>
              <p>A few simple checks can prevent delays before production.</p>
            </div>
            <div className="artwork-register">
              {artworkChecks.map(([number, title, copy]) => (
                <article key={number}>
                  <span>{number}</span>
                  <div>
                    <h3>{title}</h3>
                    <p>{copy}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="process" className="section process-section">
          <div className="site-wrap">
            <div className="section-head process-head">
              <div>
                <p className="eyebrow">How a job moves through Jubbir</p>
                <h2>Clear stages. Fewer surprises.</h2>
              </div>
              <p>Each stage locks the information needed for the next production decision.</p>
            </div>
            <ol className="process-register">
              {processSteps.map(([number, title, copy]) => (
                <li key={number}>
                  <span className="process-number">{number}</span>
                  <span className="process-marker" aria-hidden="true" />
                  <h3>{title}</h3>
                  <p>{copy}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="final-cta-section">
          <div className="site-wrap final-cta">
            <div>
              <p className="eyebrow eyebrow--dark">Start a job</p>
              <h2>Have something to print?</h2>
              <p>Give us the essentials. We will review the details before confirming production.</p>
            </div>
            <button type="button" className="button button--ink" onClick={openDrawer}>
              Start a Job <ArrowRight aria-hidden="true" />
            </button>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="site-wrap footer-grid">
          <div>
            <a className="footer-brand" href="#top">JUBBIR PRINTERS</a>
            <p>Commercial Print / Packaging / DTF Transfers / Custom Production</p>
          </div>
          <nav aria-label="Footer navigation">
            <p className="micro-label">Production desk</p>
            {navigation.map(([label, href]) => <a key={href} href={href}>{label === 'Work' ? 'Selected work' : label}</a>)}
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

      <JobDrawer open={drawerOpen} onClose={closeDrawer} />
    </div>
  );
}
