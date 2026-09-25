import { Check, FileCheck2, ScanLine } from 'lucide-react';
import { InteriorShell } from './InteriorShell';
import { artworkChecks } from './data';

export default function ArtworkGuidePage() {
  return (
    <InteriorShell current="Artwork">
      <section className="interior-hero">
        <div className="site-wrap interior-hero__grid">
          <div>
            <p className="eyebrow">Artwork guide / Wave 03</p>
            <h1>Prepare the file before production.</h1>
          </div>
          <div className="interior-hero__aside">
            <p>A few basic preflight checks can remove avoidable production delays before quotation, approval and print.</p>
          </div>
        </div>
      </section>

      <section className="section artwork-guide-section">
        <div className="site-wrap artwork-guide-grid">
          <div className="artwork-guide-intro">
            <span className="artwork-guide-icon" aria-hidden="true"><FileCheck2 /></span>
            <p className="eyebrow">Core preflight</p>
            <h2>Six checks before you send the file.</h2>
          </div>
          <div className="artwork-guide-register">
            {artworkChecks.map(([number, title, copy]) => (
              <article key={number}>
                <span>{number}</span>
                <div><h3>{title}</h3><p>{copy}</p></div>
                <Check aria-hidden="true" />
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section trim-diagram-section">
        <div className="site-wrap trim-diagram-grid">
          <div>
            <p className="eyebrow">Bleed / trim / safe area</p>
            <h2>Think beyond the final edge.</h2>
            <p>When artwork reaches the edge, the file should include bleed. Important content should remain comfortably inside the finished trim.</p>
          </div>
          <div className="trim-diagram" aria-label="Schematic artwork area showing bleed, trim and safe area">
            <div className="trim-diagram__bleed"><span>BLEED</span>
              <div className="trim-diagram__trim"><span>TRIM</span>
                <div className="trim-diagram__safe"><span>SAFE AREA</span></div>
              </div>
            </div>
            <small>Schematic / not to scale</small>
          </div>
        </div>
      </section>

      <section className="section artwork-flow-section">
        <div className="site-wrap">
          <div className="section-head section-head--dark">
            <div>
              <p className="eyebrow">Preflight route</p>
              <h2>From supplied file to production-ready artwork.</h2>
            </div>
            <p>The Production Desk reviews the file before the final production route is locked.</p>
          </div>
          <ol className="artwork-flow">
            {['Receive file','Check dimensions','Review bleed','Review colour','Review resolution + fonts','Approve for production'].map((item,index)=>(
              <li key={item}><span>{String(index+1).padStart(2,'0')}</span><ScanLine aria-hidden="true" /><strong>{item}</strong></li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section artwork-file-note">
        <div className="site-wrap artwork-file-note__grid">
          <div><p className="eyebrow">Preferred handoff</p><h2>PDF is preferred for most print-ready artwork.</h2></div>
          <div>
            <p>Where applicable, prepare artwork in CMYK, at final size, with suitable image resolution and embedded or outlined fonts.</p>
            <p>These are preparation guidelines, not a guarantee that every file is ready without review.</p>
          </div>
        </div>
      </section>

      <section className="final-cta-section">
        <div className="site-wrap final-cta">
          <div><p className="eyebrow eyebrow--dark">Next step</p><h2>File checked? Prepare the job.</h2><p>Bring the artwork together with size, quantity, material and finishing requirements.</p></div>
          <a className="button button--ink" href="./start-a-job.html">Start job preparation</a>
        </div>
      </section>
    </InteriorShell>
  );
}
