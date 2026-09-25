import { ArrowRight, ClipboardList, FileUp, Ruler, Layers3 } from 'lucide-react';
import { InteriorShell } from './InteriorShell';

export default function StartJobPage() {
  return (
    <InteriorShell current="Start a Job">
      <section className="start-job-hero">
        <div className="site-wrap start-job-hero__grid">
          <div>
            <p className="eyebrow">Start a job / Wave 03</p>
            <h1>Bring the essentials. Build the brief.</h1>
          </div>
          <div>
            <p>This page helps prepare the information Jubbir needs before quotation. The actual intake remains the validated local Job Brief drawer.</p>
            <p className="submission-note">Online submission and artwork routing are not connected yet.</p>
          </div>
        </div>
      </section>

      <section className="section job-prep-section">
        <div className="site-wrap">
          <div className="section-head">
            <div><p className="eyebrow">Before opening the intake</p><h2>Have these details ready.</h2></div>
            <p>A stronger specification creates a cleaner review and quotation stage.</p>
          </div>
          <div className="job-prep-grid">
            {[
              [ClipboardList,'01','What are you printing?','Name the output or production job.'],
              [Ruler,'02','Finished size','Provide the intended finished dimensions where known.'],
              [Layers3,'03','Quantity + material','Share quantity and any material preference.'],
              [FileUp,'04','Artwork + finishing','Prepare artwork/reference files and finishing requirements.'],
            ].map(([Icon,n,title,copy])=>{
              const C=Icon as typeof ClipboardList;
              return <article key={String(n)}><span className="capability-icon" aria-hidden="true"><C /></span><small>{String(n)}</small><h3>{String(title)}</h3><p>{String(copy)}</p></article>
            })}
          </div>
        </div>
      </section>

      <section className="section job-field-register-section">
        <div className="site-wrap job-field-register-grid">
          <div><p className="eyebrow">Job brief structure</p><h2>The intake asks for nine essentials.</h2></div>
          <div className="job-field-register">
            {['Your name','Business name','Phone / WhatsApp','What are you printing?','Finished size','Quantity','Material preference','Finishing requirement','Additional notes + artwork reference'].map((field,index)=>(
              <div key={field}><span>{String(index+1).padStart(2,'0')}</span><strong>{field}</strong></div>
            ))}
          </div>
        </div>
      </section>

      <section className="section local-brief-section">
        <div className="site-wrap local-brief">
          <div>
            <p className="eyebrow eyebrow--dark">Validated intake behavior</p>
            <h2>The brief is prepared locally.</h2>
            <p>The artwork selector does not upload your file. The form prepares a structured brief on your device and lets you copy it for manual handoff.</p>
          </div>
          <div className="local-brief__steps">
            {['Enter the specification','Optionally select a local artwork/reference file','Prepare the structured brief','Copy the brief for manual handoff'].map((s,i)=><span key={s}><small>0{i+1}</small>{s}</span>)}
          </div>
        </div>
      </section>

      <section className="section start-job-action-section">
        <div className="site-wrap start-job-action">
          <div>
            <p className="eyebrow">Production Desk intake</p>
            <h2>Ready? Open the validated Job Brief.</h2>
            <p>The header button opens the same intake from anywhere on this page. No submission success is simulated.</p>
          </div>
          <a className="button button--accent" href="./index.html#top">Open from Production Desk <ArrowRight aria-hidden="true" /></a>
        </div>
      </section>
    </InteriorShell>
  );
}
