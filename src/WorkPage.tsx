import { ArrowRight } from 'lucide-react';
import { useLayoutEffect } from 'react';
import { InteriorShell } from './InteriorShell';
import { productionJobs } from './data';

export default function WorkPage() {
  useLayoutEffect(() => {
    const id = window.location.hash.slice(1);
    if (!productionJobs.some(job => job.id === id)) return;
    // Incoming fragments need the client-rendered archive and measured masthead.
    const frame = window.requestAnimationFrame(() => {
      const example = document.getElementById(id);
      example?.scrollIntoView({ block: 'start', behavior: 'instant' });
      example?.focus({ preventScroll: true });
    });
    return () => window.cancelAnimationFrame(frame);
  }, []);

  return (
    <InteriorShell current="Work">
      {(openJobDrawer) => <>
      <section className="interior-hero">
        <div className="site-wrap interior-hero__grid">
          <div>
            <p className="eyebrow">Selected production</p>
            <h1>Work, not decoration.</h1>
          </div>
          <div className="interior-hero__aside">
            <p>Production examples show how print, substrates and finishing come together across different routes.</p>
            <a className="text-link" href="#production-archive">View production archive <ArrowRight aria-hidden="true" /></a>
          </div>
        </div>
      </section>

      <section id="production-archive" className="section wave3-work-section">
        <div className="site-wrap">
          <div className="wave3-work-grid">
            {productionJobs.map((job, index) => (
              <article id={job.id} tabIndex={-1} aria-labelledby={`production-example-${job.id}`} className={index === 0 ? 'wave3-work-card wave3-work-card--feature' : 'wave3-work-card'} key={job.title}>
                <img src={job.image} alt={job.alt} width={1536} height={1024} loading={index === 0 ? 'eager' : 'lazy'} decoding="async" />
                <div className="wave3-work-card__scrim" aria-hidden="true" />
                <div className="wave3-work-card__meta">
                  <span>0{index + 1} / {job.category}</span>
                  <h2 id={`production-example-${job.id}`}>{job.title}</h2>
                  <p>{job.meta}</p>
                </div>
              </article>
            ))}
          </div>
          <p className="production-example-note">Illustrative production examples. Final specifications are confirmed with the desk.</p>
        </div>
      </section>

      <section className="section production-reading">
        <div className="site-wrap">
          <div className="section-head section-head--dark">
            <div>
              <p className="eyebrow">Reading the work</p>
              <h2>Four details to read in each example.</h2>
            </div>
            <p>Read each example through its route, material, finishing and intended output.</p>
          </div>
          <div className="production-reading__grid">
            {[
              ['01', 'Route', 'The printing or transfer path used for the job.'],
              ['02', 'Material', 'The paper, board, adhesive stock or transfer medium involved.'],
              ['03', 'Finishing', 'The conversion or finishing step used where required.'],
              ['04', 'Output', 'The finished object or transfer prepared for its intended use.'],
            ].map(([n,title,copy]) => <article key={n}><span>{n}</span><h3>{title}</h3><p>{copy}</p></article>)}
          </div>
        </div>
      </section>

      <section className="section archive-register-section">
        <div className="site-wrap archive-register">
          <div>
            <p className="eyebrow">Current archive</p>
            <h2>Production examples at a glance.</h2>
          </div>
          <div>
            {productionJobs.map((job, index) => (
              <a className="archive-register__link" href={`#${job.id}`} aria-label={`View ${job.title} production example`} key={job.title}>
                <span>0{index + 1}</span>
                <strong>{job.title}</strong>
                <p>{job.meta}</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="final-cta-section">
        <div className="site-wrap final-cta">
          <div>
            <p className="eyebrow eyebrow--dark">Production Desk</p>
            <h2>Have a similar job in mind?</h2>
            <p>Prepare the specification first, then move into the production intake.</p>
          </div>
          <button type="button" className="button button--ink" onClick={openJobDrawer}>Start a Job <ArrowRight aria-hidden="true" /></button>
        </div>
      </section>
      </>}
    </InteriorShell>
  );
}
