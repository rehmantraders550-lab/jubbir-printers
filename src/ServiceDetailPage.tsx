import { ArrowRight, Check, FileCheck2, Layers3, Printer, Scissors } from 'lucide-react';
import { InteriorShell } from './InteriorShell';
import { artworkChecks } from './data';
import heroImage from './assets/images/jubbir-hero-v2.webp';
import brochureImage from './assets/images/jubbir-brochure-v2.webp';
import dtfImage from './assets/images/jubbir-dtf-transfer-v2.webp';
import labelsImage from './assets/images/jubbir-labels-v2.webp';
import cartonImage from './assets/images/jubbir-retail-carton-v2.webp';
import businessCardsImage from './assets/images/jubbir-business-cards-v1.webp';
import stationeryImage from './assets/images/jubbir-stationery-v1.webp';
import bulkImage from './assets/images/jubbir-bulk-printing-v1.webp';
import customImage from './assets/images/jubbir-custom-jobs-v1.webp';

export type ServicePageKey = 'commercial' | 'packaging' | 'dtf' | 'custom';

type ServicePageConfig = {
  number: string;
  label: string;
  kicker: string;
  title: string;
  description: string;
  process: string;
  applications: Array<{ title: string; copy: string }>;
  hero: string;
  heroAlt: string;
  gallery: Array<{ image: string; alt: string; label: string; meta: string }>;
  route: string[];
  considerations: Array<{ title: string; copy: string }>;
};

const configs: Record<ServicePageKey, ServicePageConfig> = {
  commercial: {
    number: '01',
    label: 'Commercial Print',
    kicker: 'Everyday production',
    title: 'Commercial print that stays consistent.',
    description: 'Business stationery, flyers, brochures, catalogues, menus, tags and repeat print runs managed with a production-first approach.',
    process: 'Offset / short-run production',
    applications: [
      { title: 'Business cards', copy: 'Share finished size, print sides, quantity and any stock or finishing preference.' },
      { title: 'Flyers', copy: 'Confirm finished size, one or two print sides, quantity and paper preference.' },
      { title: 'Brochures', copy: 'Include flat and folded sizes, panel layout, quantity and paper preference.' },
      { title: 'Menus', copy: 'Share format, page count, quantity and whether folding or binding is needed.' },
      { title: 'Tags', copy: 'Include finished shape, hole position if needed, quantity and card-stock preference.' },
      { title: 'Stationery', copy: 'List letterheads, envelopes or other items, with size, quantity and print sides for each.' },
    ],
    hero: brochureImage,
    heroAlt: 'Finished commercial brochures beside print production equipment',
    gallery: [
      { image: businessCardsImage, alt: 'Stacks and individual printed business cards on a finishing bench', label: 'Business cards', meta: 'Card stock / print sides / finishing' },
      { image: stationeryImage, alt: 'Printed letterhead and envelope stationery set', label: 'Stationery', meta: 'Letterheads / envelopes / coordinated print' },
      { image: brochureImage, alt: 'Finished commercial brochure production', label: 'Brochures', meta: 'Offset / coated paper / folded' },
    ],
    route: ['Specify', 'Artwork review', 'Stock selection', 'Print route', 'Finishing', 'Collect / Dispatch'],
    considerations: [
      { title: 'Artwork', copy: 'Dimensions, bleed, colour mode, resolution and fonts are reviewed before production.' },
      { title: 'Stocks', copy: 'Coated and uncoated papers or card stocks are selected around the job.' },
      { title: 'Quantity', copy: 'The production route is defined after the required quantity is confirmed.' },
      { title: 'Finishing', copy: 'Lamination, folding, binding and cutting can be coordinated where the job requires them.' },
    ],
  },
  packaging: {
    number: '02',
    label: 'Packaging',
    kicker: 'Product presentation',
    title: 'Packaging prepared for real products.',
    description: 'Printed cartons, sleeves, labels and retail packaging developed around artwork, stock, finishing and the physical requirements of the job.',
    process: 'Print / finish / convert',
    applications: [
      { title: 'Product cartons', copy: 'Share product and carton dimensions, quantity, board preference and any existing dieline.' },
      { title: 'Sleeves', copy: 'Include the size of the item to be wrapped, sleeve format, quantity and artwork or dieline.' },
      { title: 'Labels', copy: 'Confirm label dimensions, shape, application surface, quantity and cut requirements.' },
      { title: 'Hang tags', copy: 'Share size, shape, card-stock preference, hole position and quantity.' },
      { title: 'Bakery packs', copy: 'Describe the intended contents, pack dimensions, quantity and packaging format.' },
      { title: 'Retail packs', copy: 'Include product dimensions, pack format, quantity, artwork and finishing requirements.' },
    ],
    hero: cartonImage,
    heroAlt: 'Printed retail cartons shown as finished and flat production pieces',
    gallery: [
      { image: cartonImage, alt: 'Retail carton production detail', label: 'Cartons', meta: 'Printed board / matte lamination' },
      { image: labelsImage, alt: 'Product labels during custom cutting', label: 'Labels', meta: 'Adhesive stock / full colour / custom cut' },
      { image: heroImage, alt: 'Commercial press producing packaging print sheets', label: 'Printing', meta: 'Production route selected by job' },
    ],
    route: ['Specify', 'Artwork + size', 'Board / stock', 'Print', 'Finish + convert', 'Collect / Dispatch'],
    considerations: [
      { title: 'Structure', copy: 'Finished size and physical format are confirmed before the production route is locked.' },
      { title: 'Material', copy: 'Packaging board, card stocks, kraft and sticker materials are selected around the application.' },
      { title: 'Finishing', copy: 'Lamination, foil, creasing, cutting, folding and die-cutting are coordinated where required.' },
      { title: 'Artwork', copy: 'Artwork is reviewed for dimensions, bleed, colour mode, resolution and fonts before production.' },
    ],
  },
  dtf: {
    number: '03',
    label: 'DTF Transfers',
    kicker: 'Transfer production',
    title: 'Sharp, repeatable transfer production.',
    description: 'Full-colour DTF transfers for apparel, uniforms, merchandise and branded textile applications, including short runs and gang-sheet production.',
    process: 'DTF transfer production',
    applications: [
      { title: 'Logos', copy: 'Supply final transfer size, number of copies and the intended garment or application.' },
      { title: 'Chest prints', copy: 'Confirm graphic dimensions, placement, quantity and the supplied artwork.' },
      { title: 'Back prints', copy: 'Share finished graphic size, quantity and artwork at the intended size.' },
      { title: 'Uniform graphics', copy: 'List logo placements, transfer sizes and quantities for each design.' },
      { title: 'Merchandise', copy: 'Describe the apparel application, graphic size, design count and quantity.' },
      { title: 'Gang sheets', copy: 'Share artwork at final sizes and the copies needed for each design. The desk confirms the sheet layout before production.' },
    ],
    hero: dtfImage,
    heroAlt: 'Full-colour DTF gang sheet emerging from a roll printer',
    gallery: [
      { image: dtfImage, alt: 'Full-colour DTF gang-sheet production', label: 'Gang sheets', meta: 'Full colour / transfer production' },
    ],
    route: ['Specify', 'Artwork', 'Size + quantity', 'Gang-sheet planning', 'DTF production', 'Collect / Dispatch'],
    considerations: [
      { title: 'Artwork', copy: 'Final-size artwork and image resolution are checked before transfer production.' },
      { title: 'Format', copy: 'The intended transfer size and required quantity shape how the job is prepared.' },
      { title: 'Transfer film', copy: 'Transfer films form part of the DTF production route documented by the Production Desk.' },
      { title: 'Output', copy: 'Full-colour transfers can be prepared for logos, apparel graphics, merchandise and gang sheets.' },
    ],
  },
  custom: {
    number: '04',
    label: 'Custom Production',
    kicker: 'Non-standard jobs',
    title: 'For work that does not fit a preset.',
    description: 'Unusual dimensions, mixed requirements, prototypes, custom finishing and production jobs that need a more direct conversation before quoting.',
    process: 'Specification-led production',
    applications: [
      { title: 'Odd sizes', copy: 'Provide finished width, height and shape, quantity and intended use.' },
      { title: 'Prototype runs', copy: 'Describe the finished format, material preference, purpose of the prototype and any reference files.' },
      { title: 'Mixed materials', copy: 'List each material and printed part, with dimensions, quantities and the intended assembly.' },
      { title: 'Special finishing', copy: 'State the finish required and where it belongs, along with artwork, size and quantity.' },
      { title: 'Bulk jobs', copy: 'Confirm total quantity, number of designs, finished size, print sides and material preferences.' },
      { title: 'Custom formats', copy: 'Share a reference or drawing, finished dimensions, quantity and intended function.' },
    ],
    hero: customImage,
    heroAlt: 'Printed sleeve, die-cut tag and angular card samples on a finishing bench',
    gallery: [
      { image: customImage, alt: 'Printed sleeve and varied die-cut paper and card samples', label: 'Custom formats', meta: 'Printed output / varied shapes' },
      { image: bulkImage, alt: 'Organised stacks of repeated printed leaflets', label: 'Bulk jobs', meta: 'Repeat printing / size / quantity' },
      { image: labelsImage, alt: 'Custom-cut printed labels in production', label: 'Custom cutting', meta: 'Printed output / custom cut' },
    ],
    route: ['Specify', 'Reference files', 'Review', 'Production route', 'Quote + approve', 'Produce'],
    considerations: [
      { title: 'Dimensions', copy: 'Odd sizes and custom formats are reviewed from the actual finished requirement.' },
      { title: 'Materials', copy: 'Mixed material requirements are assessed before the production route is confirmed.' },
      { title: 'Finishing', copy: 'Special finishing is coordinated only after the job specification is understood.' },
      { title: 'Prototype / bulk', copy: 'Prototype runs and bulk jobs are handled as specification-led production rather than fixed presets.' },
    ],
  },
};

const routes = [
  ['Commercial Print', './commercial-print.html'],
  ['Packaging', './packaging.html'],
  ['DTF Transfers', './dtf-transfers.html'],
  ['Custom Production', './custom-production.html'],
] as const;

export default function ServiceDetailPage({ service }: { service: ServicePageKey }) {
  const config = configs[service];

  return (
    <InteriorShell>
      {(openJobDrawer) => <>
      <section className="service-detail-hero">
        <div className="service-detail-hero__media">
          <img src={config.hero} alt={config.heroAlt} width={1200} height={800} fetchPriority="high" decoding="async" />
          <div className="service-detail-hero__scrim" aria-hidden="true" />
        </div>
        <div className="site-wrap service-detail-hero__content">
          <div>
            <p className="eyebrow">{config.number} / {config.kicker}</p>
            <h1>{config.title}</h1>
          </div>
          <div className="service-detail-hero__aside">
            <p>{config.description}</p>
            <div className="service-detail-hero__meta">
              <span>Production focus</span>
              <strong>{config.process}</strong>
            </div>
          </div>
        </div>
      </section>

      <section className="section service-jobs-section">
        <div className="site-wrap">
          <div className="section-head">
            <div>
              <p className="eyebrow">{config.label} / applications</p>
              <h2>Typical jobs on this route.</h2>
            </div>
            <p>These are common outputs, not fixed packages. Size, quantity, material, finishing and artwork still determine the final production route.</p>
          </div>
          <div className="service-job-register">
            {config.applications.map(({ title, copy }, index) => (
              <article key={title}>
                <span>{String(index + 1).padStart(2, '0')}</span>
                <h3>{title}</h3>
                <p>{copy}</p>
                <Check aria-hidden="true" />
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section service-route-section">
        <div className="site-wrap">
          <div className="section-head section-head--dark">
            <div>
              <p className="eyebrow">Production route</p>
              <h2>How the job gets defined.</h2>
            </div>
            <p>The route is confirmed from the actual specification rather than from a generic preset.</p>
          </div>
          <ol className="service-route">
            {config.route.map((step, index) => (
              <li key={step}>
                <span>{String(index + 1).padStart(2, '0')}</span>
                <strong>{step}</strong>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section service-considerations">
        <div className="site-wrap service-considerations__grid">
          <div className="service-considerations__intro">
            <p className="eyebrow">What shapes the route</p>
            <h2>Four decisions before production.</h2>
          </div>
          <div className="service-considerations__list">
            {config.considerations.map(({ title, copy }, index) => {
              const icons = [FileCheck2, Layers3, Printer, Scissors];
              const Icon = icons[index];
              return (
                <article key={title}>
                  <span className="capability-icon" aria-hidden="true"><Icon /></span>
                  <div>
                    <p className="micro-label">{String(index + 1).padStart(2, '0')}</p>
                    <h3>{title}</h3>
                    <p>{copy}</p>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section service-proof-section">
        <div className="site-wrap">
          <div className="section-head">
            <div>
              <p className="eyebrow">Production examples</p>
              <h2>Output, process and material.</h2>
            </div>
            <p>Illustrative examples of output on this route. Final specifications are confirmed with the desk.</p>
          </div>
          <div className={config.gallery.length === 1 ? 'service-proof-grid service-proof-grid--single' : 'service-proof-grid'}>
            {config.gallery.map(({ image, alt, label, meta }, index) => (
              <figure className={index === 0 && config.gallery.length > 1 ? 'service-proof-grid__feature' : ''} key={label}>
                <img src={image} alt={alt} width={1200} height={800} loading="lazy" decoding="async" />
                <figcaption><span>{label}</span><strong>{meta}</strong></figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section className="section service-artwork-section">
        <div className="site-wrap service-artwork-grid">
          <div>
            <p className="eyebrow">Artwork check</p>
            <h2>Prepare the file before production.</h2>
            <p className="service-artwork-grid__lead">The same core preflight checks apply before a job is quoted and approved for production.</p>
          </div>
          <div className="service-artwork-register">
            {artworkChecks.map(([number, title, copy]) => (
              <article key={number}>
                <span>{number}</span>
                <div><h3>{title}</h3><p>{copy}</p></div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section service-route-links">
        <div className="site-wrap">
          <div className="section-head">
            <div>
              <p className="eyebrow">Other production routes</p>
              <h2>One desk. Four paths.</h2>
            </div>
            <a className="text-link" href="./products.html">View product register <ArrowRight aria-hidden="true" /></a>
          </div>
          <div className="route-link-grid">
            {routes.map(([label, href], index) => (
              <a href={href} key={label} aria-current={label === config.label ? 'page' : undefined}>
                <span>{String(index + 1).padStart(2, '0')}</span>
                <strong>{label}</strong>
                <ArrowRight aria-hidden="true" />
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="final-cta-section">
        <div className="site-wrap final-cta">
          <div>
            <p className="eyebrow eyebrow--dark">Start a job</p>
            <h2>Ready to define the specification?</h2>
            <p>Use the Production Desk intake to prepare the essentials before quotation.</p>
          </div>
          <button type="button" className="button button--ink" onClick={openJobDrawer}>Start a Job <ArrowRight aria-hidden="true" /></button>
        </div>
      </section>
      </>}
    </InteriorShell>
  );
}
