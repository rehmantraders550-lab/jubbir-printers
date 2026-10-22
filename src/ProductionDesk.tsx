import { useCallback, useEffect, useMemo, useRef, useState, type KeyboardEvent } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { ArrowRight, ChevronRight, Menu, X } from 'lucide-react';
import { BrandLogo } from './BrandLogo';
import { JobDrawer } from './JobDrawer';
import { useHeaderOffset } from './useHeaderOffset';
import {
  artworkChecks,
  capabilities,
  deskStages,
  processSteps,
  productionJobs,
  serviceOrder,
  services,
  type ServiceKey,
} from './data';
import heroImage from './assets/images/jubbir-hero-v2.webp';
import brochureImage from './assets/images/jubbir-brochure-v2.webp';
import dtfImage from './assets/images/jubbir-dtf-transfer-v2.webp';
import labelsImage from './assets/images/jubbir-labels-v2.webp';
import cartonImage from './assets/images/jubbir-retail-carton-v2.webp';
import businessCardsImage from './assets/images/jubbir-business-cards-v1.webp';
import stationeryImage from './assets/images/jubbir-stationery-v1.webp';
import bulkPrintingImage from './assets/images/jubbir-bulk-printing-v1.webp';
import customJobsImage from './assets/images/jubbir-custom-jobs-v1.webp';

const homepageProducts = [
  { title: 'Business Cards', route: 'Commercial Print', image: businessCardsImage, href: './commercial-print.html' },
  { title: 'Packaging', route: 'Packaging', image: cartonImage, href: './packaging.html' },
  { title: 'Labels', route: 'Custom Production', image: labelsImage, href: './custom-production.html' },
  { title: 'Brochures', route: 'Commercial Print', image: brochureImage, href: './commercial-print.html' },
  { title: 'DTF Transfers', route: 'DTF Transfers', image: dtfImage, href: './dtf-transfers.html' },
  { title: 'Stationery', route: 'Commercial Print', image: stationeryImage, href: './commercial-print.html' },
  { title: 'Bulk Printing', route: 'Custom Production', image: bulkPrintingImage, href: './custom-production.html' },
  { title: 'Custom Jobs', route: 'Custom Production', image: customJobsImage, href: './custom-production.html' },
] as const;

const navigation = [
  ['Services', '#services'],
  ['Products', './products.html'],
  ['Capabilities', './capabilities.html'],
  ['Work', './work.html'],
  ['Artwork', './artwork-guide.html'],
  ['Process', './process.html'],
] as const;

export default function ProductionDesk() {
  const [activeService, setActiveService] = useState<ServiceKey>('commercial');
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const serviceTabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const serviceRouteRefs = useRef<Array<HTMLDivElement | null>>([]);
  const manualSelectionUntil = useRef(0);
  const reduceMotion = useReducedMotion();
  // Locally hosted, approved Google Flow output; no third-party video service or API required.
  const heroVideoUrl = '/media/jubbir-machine-hero.mp4';
  const saveData = typeof navigator !== 'undefined' &&
    Boolean((navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData);
  const [heroVideoPlaying, setHeroVideoPlaying] = useState(false);
  const headerBarRef = useHeaderOffset();
  const active = useMemo(() => services[activeService], [activeService]);

  useEffect(() => {
    // Each editorial route is a real reading block. The sticky image follows
    // whichever block is nearest the reading line; explicit selections win.
    const routes = serviceRouteRefs.current.filter((route): route is HTMLDivElement => Boolean(route));
    if (!routes.length || typeof IntersectionObserver === 'undefined') return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (Date.now() < manualSelectionUntil.current) return;
        if (!entries.some((entry) => entry.isIntersecting)) return;
        const readingLine = window.innerHeight * 0.45;
        const nearest = routes
          .map((route, index) => {
            const bounds = route.getBoundingClientRect();
            return {
              index,
              visible: bounds.bottom > 0 && bounds.top < window.innerHeight,
              distance: Math.abs((bounds.top + bounds.bottom) / 2 - readingLine),
            };
          })
          .filter((item) => item.visible)
          .sort((a, b) => a.distance - b.distance)[0];

        if (nearest) setActiveService(serviceOrder[nearest.index]);
      },
      { rootMargin: '-18% 0px -25% 0px', threshold: [0, 0.25, 0.6, 1] },
    );

    routes.forEach((route) => observer.observe(route));
    return () => observer.disconnect();
  }, []);

  const openDrawer = useCallback(() => {
    setMenuOpen(false);
    setDrawerOpen(true);
  }, []);

  const closeDrawer = useCallback(() => setDrawerOpen(false), []);

  const selectService = (key: ServiceKey) => {
    manualSelectionUntil.current = Date.now() + 1200;
    setActiveService(key);
  };

  const handleServiceKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    let nextIndex = index;

    if (event.key === 'ArrowDown' || event.key === 'ArrowRight') nextIndex = (index + 1) % serviceOrder.length;
    else if (event.key === 'ArrowUp' || event.key === 'ArrowLeft') nextIndex = (index - 1 + serviceOrder.length) % serviceOrder.length;
    else if (event.key === 'Home') nextIndex = 0;
    else if (event.key === 'End') nextIndex = serviceOrder.length - 1;
    else return;

    event.preventDefault();
    const nextKey = serviceOrder[nextIndex];
    selectService(nextKey);
    serviceTabRefs.current[nextIndex]?.focus();
  };

  return (
    <div
      className="site-shell production-desk-home"
      data-orvia-system="ORVIA"
      data-orvia-project="jubbir-printers"
      data-orvia-governed="true"
      data-orvia-release="1.5"
    >
      <a className="skip-link" href="#main-content">Skip to content</a>

      <header className="site-header">
        <div ref={headerBarRef} className="site-wrap header-inner">
          <a className="brand" href="#top" aria-label="Jubbir Printers home">
            <BrandLogo />
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
        <section id="top" className="hero hero--editorial hero--cinematic">
          <div className="hero-grid">
            <div className="hero-visual">
              <img
                className="hero-media-poster"
                src={heroImage}
                alt="Commercial offset press producing full-colour printed sheets"
                fetchPriority="high"
                decoding="async"
              />
              {heroVideoUrl && !reduceMotion && !saveData && (
                <video
                  className={heroVideoPlaying ? 'hero-motion-video is-playing' : 'hero-motion-video'}
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  poster={heroImage}
                  aria-hidden="true"
                  onPlaying={() => setHeroVideoPlaying(true)}
                  onPause={() => setHeroVideoPlaying(false)}
                  onError={() => setHeroVideoPlaying(false)}
                >
                  <source src={heroVideoUrl} type="video/mp4" />
                </video>
              )}
              <div className="hero-scrim" aria-hidden="true" />
              <div className="hero-image-caption" aria-hidden="true">
                <span>01 / MATERIAL INTO FORM</span>
                <span>PRINTING · FINISHING · PRODUCTION</span>
              </div>
            </div>

            <div className="hero-copy">
              <motion.p
                className="eyebrow"
                initial={{ opacity: reduceMotion ? 1 : 0, y: reduceMotion ? 0 : 9 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: reduceMotion ? 0 : 0.5, delay: reduceMotion ? 0 : 0.1 }}
              >
                Commercial Print / Packaging / DTF / Custom Production
              </motion.p>
              <h1 className="hero-title" aria-label="Printing made straightforward.">
                <motion.span
                  className="hero-title-line"
                  initial={{ opacity: reduceMotion ? 1 : 0, y: reduceMotion ? 0 : 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: reduceMotion ? 0 : 0.6, delay: reduceMotion ? 0 : 0.15 }}
                >Printing</motion.span>
                <motion.span
                  className="hero-title-line hero-title-line--accent"
                  initial={{ opacity: reduceMotion ? 1 : 0, y: reduceMotion ? 0 : 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: reduceMotion ? 0 : 0.6, delay: reduceMotion ? 0 : 0.36 }}
                >made</motion.span>
                <motion.span
                  className="hero-title-line hero-title-line--long"
                  initial={{ opacity: reduceMotion ? 1 : 0, y: reduceMotion ? 0 : 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: reduceMotion ? 0 : 0.6, delay: reduceMotion ? 0 : 0.57 }}
                >straightforward.</motion.span>
              </h1>
              <motion.p
                className="hero-lead"
                initial={{ opacity: reduceMotion ? 1 : 0, y: reduceMotion ? 0 : 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: reduceMotion ? 0 : 0.55, delay: reduceMotion ? 0 : 0.8 }}
              >
                Send your specification, quantity and artwork. We review the job, define the production route and move it forward from one desk.
              </motion.p>
              <motion.div
                className="hero-actions"
                initial={{ opacity: reduceMotion ? 1 : 0, y: reduceMotion ? 0 : 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: reduceMotion ? 0 : 0.5, delay: reduceMotion ? 0 : 1.05 }}
              >
                <button type="button" className="button button--accent" onClick={openDrawer}>
                  Start a Job <ArrowRight aria-hidden="true" />
                </button>
                <a className="button button--outline" href="#process">
                  How it works <ChevronRight aria-hidden="true" />
                </a>
              </motion.div>
            </div>
          </div>
        </section>
        <div className="hero-desk-strip">
          <div className="site-wrap">
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

        <section className="home-product-register" aria-label="Common production products">
          <div className="site-wrap home-product-register__grid">
            {homepageProducts.map((product, index) => (
              <a className="home-product-card" href={product.href} key={product.title}>
                <img src={product.image} alt="" width="1200" height="800" loading="lazy" decoding="async" />
                <span className="home-product-card__scrim" aria-hidden="true" />
                <span className="home-product-card__meta">
                  <small>{String(index + 1).padStart(2, '0')} / {product.route}</small>
                  <strong>{product.title}</strong>
                </span>
              </a>
            ))}
          </div>
          <p className="site-wrap home-product-register__note">Illustrative product examples. Specifications are confirmed with the desk.</p>
        </section>

        <section id="services" className="section section--paper">
          <div className="site-wrap service-layout">
            <div className="section-intro service-intro">
              <p className="eyebrow">Choose your production route</p>
              <h2>One desk. Different production paths.</h2>
              <p>The route changes with the job. The interface stays simple.</p>

              <div className="service-tabs" role="tablist" aria-label="Production services" aria-orientation="vertical">
                {serviceOrder.map((key, index) => {
                  const route = services[key];
                  return (
                    <div
                      key={key}
                      className={activeService === key ? 'service-route is-active' : 'service-route'}
                      ref={(element) => { serviceRouteRefs.current[index] = element; }}
                      role="presentation"
                    >
                      <button
                        ref={(element) => { serviceTabRefs.current[index] = element; }}
                        id={`service-tab-${key}`}
                        type="button"
                        role="tab"
                        aria-selected={activeService === key}
                        aria-controls="service-panel"
                        tabIndex={activeService === key ? 0 : -1}
                        className={activeService === key ? 'service-route__trigger is-active' : 'service-route__trigger'}
                        onClick={() => selectService(key)}
                        onKeyDown={(event) => handleServiceKeyDown(event, index)}
                      >
                        <span><small>0{index + 1}</small>{route.label}</span>
                      </button>

                      <div className="service-route__content">
                        <p className="eyebrow">{route.kicker}</p>
                        <h3>{route.title}</h3>
                        <p className="service-description">{route.description}</p>
                        <div className="service-route__metadata">
                          <div className="service-route__jobs">
                            <p className="micro-label">Typical jobs</p>
                            <ul>
                              {route.applications.map((item) => <li key={item}>{item}</li>)}
                            </ul>
                          </div>
                          <p className="service-route__focus">
                            <span className="micro-label">Production focus</span>
                            <strong>{route.process}</strong>
                          </p>
                        </div>
                        <a className="service-route__action" href={route.href}>
                          Explore {route.label} <ChevronRight aria-hidden="true" />
                        </a>
                      </div>

                      <figure className="service-route__mobile-media">
                        <img src={route.image} alt={route.imageAlt} loading="lazy" decoding="async" />
                        <figcaption>Illustrative production example</figcaption>
                      </figure>
                    </div>
                  );
                })}
              </div>
            </div>

            <article
              id="service-panel"
              role="tabpanel"
              aria-labelledby={`service-tab-${activeService}`}
              className="service-panel"
            >
              <AnimatePresence mode="wait">
                <motion.figure
                  key={activeService}
                  className="service-panel__visual"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: reduceMotion ? 0 : 0.32 }}
                >
                  <img src={active.image} alt={active.imageAlt} loading="eager" decoding="async" />
                  <figcaption>Illustrative production example</figcaption>
                </motion.figure>
              </AnimatePresence>
            </article>
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
            <a className="section-detail-link" href="./capabilities.html">Explore the capability register <ArrowRight aria-hidden="true" /></a>
          </div>
        </section>

        <section id="work" className="section work-section">
          <div className="site-wrap">
            <div className="section-head">
              <div>
                <p className="eyebrow">Selected production</p>
                <h2>Work, not decoration.</h2>
              </div>
              <p>Production examples organised by print route, material and finishing.</p>
            </div>
            <div className="proof-wall">
              {productionJobs.map((job, index) => (
                <a className={`proof-card ${job.className}`} href={`./work.html#${job.id}`} aria-label={`Explore ${job.title} production example`} key={job.title}>
                  <img src={job.image} alt={job.alt} loading="lazy" decoding="async" />
                  <div className="proof-card__scrim" aria-hidden="true" />
                  <div className="proof-card__meta">
                    <small>0{index + 1} / {job.category}</small>
                    <h3>{job.title}<ArrowRight aria-hidden="true" /></h3>
                    <p>{job.meta}</p>
                  </div>
                </a>
              ))}
            </div>
            <a className="section-detail-link" href="./work.html">View all production examples <ArrowRight aria-hidden="true" /></a>
          </div>
        </section>

        <section className="section artwork-section">
          <div className="site-wrap artwork-layout">
            <div className="section-intro artwork-intro">
              <p className="eyebrow">Artwork check</p>
              <h2>Before you send the file.</h2>
              <p>A few simple checks can prevent delays before production.</p>
              <a className="section-detail-link" href="./artwork-guide.html">Read the artwork guide <ArrowRight aria-hidden="true" /></a>
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
            <a className="section-detail-link" href="./process.html">Read the full process <ArrowRight aria-hidden="true" /></a>
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
            <a className="footer-brand" href="#top" aria-label="Jubbir Printers home">
              <BrandLogo onDark />
            </a>
            <p>Commercial Print / Packaging / DTF Transfers / Custom Production</p>
            <div className="footer-contact-list" role="group" aria-label="Production contacts">
              <p className="micro-label">Production contacts</p>
              <a className="footer-contact-link" href="tel:+923008886888" aria-label="Call Amjad Rubbani, owner, at 0300 888 6888">
                <span className="footer-contact-role">Owner</span>
                <strong>Amjad Rubbani</strong>
                <span className="footer-contact-number">0300 888 6888</span>
              </a>
              <a className="footer-contact-link" href="tel:+923088999988" aria-label="Call Ali Hamza, production head, at 0308 899 9988">
                <span className="footer-contact-role">Production Head</span>
                <strong>Ali Hamza</strong>
                <span className="footer-contact-number">0308 899 9988</span>
              </a>
            </div>
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
          <span className="footer-orvia">Powered by ORVIA</span>
          <span>PRINT WITH PURPOSE.</span>
        </div>
      </footer>

      <JobDrawer open={drawerOpen} onClose={closeDrawer} />
    </div>
  );
}
