import { ArrowRight } from 'lucide-react';
import { InteriorShell } from './InteriorShell';
import { productionJobs } from './data';

export default function WorkPage() {
  return (
    <InteriorShell current="Work">
      <section className="interior-hero">
        <div className="site-wrap interior-hero__grid">
          <div>
            <p className="eyebrow">Selected production / Wave 03</p>
            <h1>Work, not decoration.</h1>
          </div>
          <div className="interior-hero__aside">
            <p>Selected production is presented as evidence: printed objects, substrates, finishing and output—not generic lifestyle imagery.</p>
            <a className="text-link" href="#production-archive">View production archive <ArrowRight aria-hidden="true" /></a>
          </div>
        </div>
      </section>

      <section id="production-archive" className="section wave3-work-section">
        <div className="site-wrap">
          <div className="wave3-work-grid">
            {productionJobs.map((job, index) => (
              <article className={index === 0 ? 'wave3-work-card wave3-work-card--feature' : 'wave3-work-card'} key={job.title}>
                <img src={job.image} alt={job.alt} loading={index === 0 ? 'eager' : 'lazy'} decoding="async" />
                <div className="wave3-work-card__scrim" aria-hidden="true" />
                <div className="wave3-work-card__meta">
                  <span>0{index + 1} / {job.category}</span>
                  <h2>{job.title}</h2>
                  <p>{job.meta}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section production-reading">
        <div className="site-wrap">
          <div className="section-head section-head--dark">
            <div>
              <p className="eyebrow">Reading the work</p>
              <h2>Four things each job proves.</h2>
            </div>
            <p>Jubbir's production evidence is organised around route, material, finishing and intended output.</p>
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
            <h2>Verified production references.</h2>
          </div>
          <div>
            {productionJobs.map((job, index) => (
              <article key={job.title}>
                <span>0{index + 1}</span>
                <strong>{job.title}</strong>
                <p>{job.meta}</p>
              </article>
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
          <a className="button button--ink" href="./start-a-job.html">Prepare a job <ArrowRight aria-hidden="true" /></a>
        </div>
      </section>
    </InteriorShell>
  );
}
