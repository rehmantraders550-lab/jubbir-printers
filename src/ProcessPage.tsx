import { ArrowDown, ArrowRight } from 'lucide-react';
import { InteriorShell } from './InteriorShell';
import { processSteps } from './data';
import heroImage from './assets/images/jubbir-hero-v2.webp';

export default function ProcessPage() {
  return (
    <InteriorShell current="Process">
      <section className="process-hero">
        <div className="process-hero__media"><img src={heroImage} alt="Commercial print production in progress" fetchPriority="high" decoding="async" /><div aria-hidden="true" /></div>
        <div className="site-wrap process-hero__content">
          <p className="eyebrow">How a job moves through Jubbir / Wave 03</p>
          <h1>Clear stages. Fewer surprises.</h1>
          <a className="button button--outline" href="#full-process">Follow the route <ArrowDown aria-hidden="true" /></a>
        </div>
      </section>

      <section id="full-process" className="section full-process-section">
        <div className="site-wrap">
          <div className="full-process-stack">
            {processSteps.map(([number,title,copy],index)=>(
              <article key={number}>
                <div className="full-process-number">{number}</div>
                <div><p className="micro-label">Production stage</p><h2>{title}</h2></div>
                <p>{copy}</p>
                <span className="full-process-line" aria-hidden="true">{index < processSteps.length-1 ? <ArrowDown /> : null}</span>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section process-dependencies">
        <div className="site-wrap">
          <div className="section-head section-head--dark">
            <div><p className="eyebrow">What gets locked</p><h2>Production becomes clearer as decisions close.</h2></div>
            <p>Each stage reduces uncertainty before the job reaches production.</p>
          </div>
          <div className="process-lock-grid">
            {[
              ['Specification','Size / quantity / material / finish'],
              ['Artwork','File / dimensions / bleed / colour'],
              ['Quotation','Confirmed requirements'],
              ['Approval','Artwork + specification + quotation'],
            ].map(([title,copy],i)=><article key={title}><span>0{i+1}</span><h3>{title}</h3><p>{copy}</p></article>)}
          </div>
        </div>
      </section>

      <section className="section process-route-note">
        <div className="site-wrap process-route-note__grid">
          <div><p className="eyebrow">Production principle</p><h2>The route changes with the job. The desk stays simple.</h2></div>
          <div><p>Commercial print, packaging, DTF transfers and custom production each follow different technical paths, but the client-facing workflow remains organised around the same seven stages.</p><a className="text-link" href="./products.html">Explore production routes <ArrowRight aria-hidden="true" /></a></div>
        </div>
      </section>

      <section className="final-cta-section">
        <div className="site-wrap final-cta">
          <div><p className="eyebrow eyebrow--dark">Start a job</p><h2>Begin with the essentials.</h2><p>Prepare size, quantity, artwork and any material or finishing preference.</p></div>
          <a className="button button--ink" href="./start-a-job.html">Prepare your job <ArrowRight aria-hidden="true" /></a>
        </div>
      </section>
    </InteriorShell>
  );
}
