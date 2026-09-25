import { FileCheck2, Layers3, Printer, Scissors } from 'lucide-react';
import { InteriorShell } from './InteriorShell';
import heroImage from './assets/images/jubbir-hero-v2.webp';
import brochureImage from './assets/images/jubbir-brochure-v2.webp';
import labelsImage from './assets/images/jubbir-labels-v2.webp';
import cartonImage from './assets/images/jubbir-retail-carton-v2.webp';

const capabilitySections = [
  {
    number: '01',
    title: 'Printing',
    meta: 'PROCESS / OUTPUT',
    copy: 'Offset, short-run commercial production and DTF transfer printing selected according to the job.',
    details: ['Offset production', 'Short-run commercial print', 'DTF transfer production', 'Full-colour output'],
    image: heroImage,
    alt: 'Commercial printing press producing full-colour sheets',
    icon: Printer,
  },
  {
    number: '02',
    title: 'Stocks & substrates',
    meta: 'MATERIAL / SURFACE',
    copy: 'Coated and uncoated papers, card stocks, packaging board, kraft, sticker materials and transfer films.',
    details: ['Coated papers', 'Uncoated papers', 'Card stocks', 'Packaging board', 'Kraft', 'Sticker materials', 'Transfer films'],
    image: cartonImage,
    alt: 'Printed carton production showing packaging board',
    icon: Layers3,
  },
  {
    number: '03',
    title: 'Finishing',
    meta: 'FINISH / CONVERSION',
    copy: 'Lamination, foil, creasing, cutting, folding, binding and die-cutting where the production route requires it.',
    details: ['Lamination', 'Foil', 'Creasing', 'Cutting', 'Folding', 'Binding', 'Die-cutting'],
    image: labelsImage,
    alt: 'Printed material being contour-cut during finishing',
    icon: Scissors,
  },
  {
    number: '04',
    title: 'Artwork',
    meta: 'PREFLIGHT / CHECK',
    copy: 'Print-ready file review with attention to dimensions, bleed, colour mode, resolution and fonts.',
    details: ['Dimensions', 'Bleed', 'CMYK where applicable', 'Image resolution', 'Embedded or outlined fonts', 'Final-size artwork'],
    image: brochureImage,
    alt: 'Finished brochure production used as an artwork and print reference',
    icon: FileCheck2,
  },
] as const;

export default function CapabilitiesPage() {
  return (
    <InteriorShell current="Capabilities">
      <section className="interior-hero interior-hero--capabilities">
        <div className="site-wrap interior-hero__grid">
          <div>
            <p className="eyebrow">Capability register / Wave 01</p>
            <h1>Production decisions made visible.</h1>
          </div>
          <div className="interior-hero__aside">
            <p>
              Capability is not a list of machines. It is the relationship between process, material,
              finishing and artwork that allows a job to move into production.
            </p>
          </div>
        </div>
      </section>

      <section className="section capability-deep-section">
        <div className="site-wrap">
          <div className="capability-deep-stack">
            {capabilitySections.map(({ number, title, meta, copy, details, image, alt, icon: Icon }, index) => (
              <article className="capability-deep" key={title}>
                <div className="capability-deep__media">
                  <img src={image} alt={alt} loading={index === 0 ? 'eager' : 'lazy'} decoding="async" />
                </div>
                <div className="capability-deep__body">
                  <div className="capability-deep__head">
                    <span className="capability-number">{number}</span>
                    <span className="capability-icon" aria-hidden="true"><Icon /></span>
                    <div>
                      <p className="micro-label">{meta}</p>
                      <h2>{title}</h2>
                    </div>
                  </div>
                  <p className="capability-deep__copy">{copy}</p>
                  <div className="technical-register">
                    {details.map((detail, detailIndex) => (
                      <div key={detail}>
                        <span>{String(detailIndex + 1).padStart(2, '0')}</span>
                        <strong>{detail}</strong>
                      </div>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section dependency-section">
        <div className="site-wrap">
          <div className="section-head section-head--dark">
            <div>
              <p className="eyebrow">Production dependencies</p>
              <h2>No capability works alone.</h2>
            </div>
            <p>A reliable route comes from matching the job specification to the artwork, material, process and finishing sequence.</p>
          </div>
          <div className="dependency-flow" aria-label="Production dependency sequence">
            {['Specification', 'Artwork', 'Material', 'Print route', 'Finishing', 'Final output'].map((label, index) => (
              <div key={label}>
                <span>{String(index + 1).padStart(2, '0')}</span>
                <strong>{label}</strong>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section preflight-section">
        <div className="site-wrap preflight-grid">
          <div>
            <p className="eyebrow">Artwork preflight</p>
            <h2>Before production begins.</h2>
          </div>
          <div className="preflight-list">
            {[
              ['File format', 'PDF is preferred for most print-ready artwork.'],
              ['Colour', 'Prepare print artwork in CMYK where applicable.'],
              ['Bleed', 'Include bleed where artwork reaches the trimmed edge.'],
              ['Resolution', 'Images should be suitable for print at final size.'],
              ['Fonts', 'Embed fonts or convert important typography to outlines.'],
              ['Size', 'Artwork should match the intended finished dimensions.'],
            ].map(([title, copy], index) => (
              <article key={title}>
                <span>{String(index + 1).padStart(2, '0')}</span>
                <div><h3>{title}</h3><p>{copy}</p></div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="final-cta-section">
        <div className="site-wrap final-cta">
          <div>
            <p className="eyebrow eyebrow--dark">Production Desk</p>
            <h2>Bring the specification. We define the route.</h2>
            <p>The final production route is confirmed around the actual job rather than a generic preset.</p>
          </div>
          <a className="button button--ink" href="./products.html">Explore products</a>
        </div>
      </section>
    </InteriorShell>
  );
}
