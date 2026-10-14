import { ArrowRight, ClipboardList, FileUp, Ruler, Layers3 } from 'lucide-react';
import { InteriorShell } from './InteriorShell';
import { JOB_RECIPIENT } from './jobBrief';

export default function StartJobPage() {
  return (
    <InteriorShell current="Start a Job">
      {(openJobDrawer) => <>
      <section className="start-job-hero">
        <div className="site-wrap start-job-hero__grid">
          <div>
            <p className="eyebrow">Start a job</p>
            <h1>Bring the essentials. Build the brief.</h1>
          </div>
          <div>
            <p>This page helps prepare the information Jubbir needs before quotation. Use the Start a Job drawer to review your brief and open it in WhatsApp for {JOB_RECIPIENT.name} at {JOB_RECIPIENT.displayPhone}.</p>
            <p className="submission-note">Attach artwork in WhatsApp and tap Send to deliver your request.</p>
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
            <p className="eyebrow eyebrow--dark">Review before sending</p>
            <h2>The brief is prepared locally.</h2>
            <p>The artwork selector keeps a reference on your device. Review the structured brief, continue in WhatsApp, attach your artwork separately and tap Send. You can also copy the brief.</p>
          </div>
          <div className="local-brief__steps">
            {['Enter the specification','Optionally select an artwork/reference file','Prepare and review the structured brief','Open WhatsApp, attach artwork and tap Send'].map((s,i)=><span key={s}><small>0{i+1}</small>{s}</span>)}
          </div>
        </div>
      </section>

      <section className="section start-job-action-section">
        <div className="site-wrap start-job-action">
          <div>
            <p className="eyebrow">Production Desk intake</p>
            <h2>Ready? Start a Job.</h2>
            <p>Open the intake, review your specification and continue in WhatsApp.</p>
          </div>
          <button type="button" className="button button--accent" onClick={openJobDrawer}>Start a Job <ArrowRight aria-hidden="true" /></button>
        </div>
      </section>
      </>}
    </InteriorShell>
  );
}
