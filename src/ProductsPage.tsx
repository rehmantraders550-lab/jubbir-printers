import { ArrowRight, Box, FileText, PackageOpen, Shirt } from 'lucide-react';
import { InteriorShell } from './InteriorShell';
import brochureImage from './assets/images/jubbir-brochure-v2.webp';
import dtfImage from './assets/images/jubbir-dtf-transfer-v2.webp';
import labelsImage from './assets/images/jubbir-labels-v2.webp';
import cartonImage from './assets/images/jubbir-retail-carton-v2.webp';

const families = [
  {
    number: '01',
    title: 'Commercial Print',
    copy: 'Repeatable business print for everyday communication, presentation and sales materials.',
    items: ['Business cards', 'Flyers', 'Brochures', 'Catalogues', 'Menus', 'Presentation folders', 'Letterheads', 'Envelopes', 'Business stationery', 'Inserts', 'Promotional cards', 'Product tags'],
    image: brochureImage,
    alt: 'Finished commercial brochures beside print production equipment',
    icon: FileText,
    href: './commercial-print.html',
  },
  {
    number: '02',
    title: 'Packaging',
    copy: 'Printed packaging outputs developed around artwork, stock, finishing and conversion requirements.',
    items: ['Product cartons', 'Folding boxes', 'Retail boxes', 'Bakery boxes', 'Food packaging', 'Packaging sleeves', 'Printed inserts', 'Product labels', 'Packaging labels', 'Hang tags', 'Bottle labels', 'Retail packs'],
    image: cartonImage,
    alt: 'Printed retail cartons shown as finished and flat production pieces',
    icon: PackageOpen,
    href: './packaging.html',
  },
  {
    number: '03',
    title: 'DTF Transfers',
    copy: 'Full-colour transfer output for apparel, uniforms, merchandise and gang-sheet production.',
    items: ['Logo transfers', 'Chest prints', 'Back prints', 'Uniform graphics', 'Merchandise transfers', 'Gang sheets', 'Custom transfer artwork'],
    image: dtfImage,
    alt: 'Full-colour DTF gang sheet emerging from a roll printer',
    icon: Shirt,
    href: './dtf-transfers.html',
  },
  {
    number: '04',
    title: 'Custom Production',
    copy: 'Specification-led work for jobs that do not fit a preset production path.',
    items: ['Odd sizes', 'Prototype runs', 'Mixed materials', 'Special finishing', 'Bulk jobs', 'Custom formats', 'Custom-cut stickers', 'Brand stickers', 'QR / barcode labels', 'Promotional stickers', 'Counter cards', 'Product information cards'],
    image: labelsImage,
    alt: 'Custom printed labels being contour-cut on production equipment',
    icon: Box,
    href: './custom-production.html',
  },
] as const;

export default function ProductsPage() {
  return (
    <InteriorShell current="Products">
      <section className="interior-hero interior-hero--products">
        <div className="site-wrap interior-hero__grid">
          <div>
            <p className="eyebrow">Product register / Wave 01</p>
            <h1>Printed output, organised by production route.</h1>
          </div>
          <div className="interior-hero__aside">
            <p>
              Jubbir Printers works across commercial print, packaging, DTF transfers and custom production.
              This register helps identify the right route before quotation.
            </p>
            <a className="text-link" href="#product-families">Explore product families <ArrowRight aria-hidden="true" /></a>
          </div>
        </div>
      </section>

      <section id="product-families" className="section interior-section">
        <div className="site-wrap">
          <div className="section-head">
            <div>
              <p className="eyebrow">Production families</p>
              <h2>Start with what you need made.</h2>
            </div>
            <p>Each family groups common outputs without forcing a fixed price, material or production method before the specification is reviewed.</p>
          </div>

          <div className="product-family-stack">
            {families.map(({ number, title, copy, items, image, alt, icon: Icon, href }, index) => (
              <article className="product-family" key={title}>
                <div className="product-family__visual">
                  <img src={image} alt={alt} loading={index === 0 ? 'eager' : 'lazy'} decoding="async" />
                  <span className="product-family__number">{number}</span>
                </div>
                <div className="product-family__content">
                  <div className="product-family__titleline">
                    <span className="capability-icon" aria-hidden="true"><Icon /></span>
                    <div>
                      <p className="micro-label">Product family</p>
                      <h3>{title}</h3>
                    </div>
                  </div>
                  <p>{copy}</p>
                  <a className="text-link" href={href}>Explore production route <ArrowRight aria-hidden="true" /></a>
                  <div className="product-item-grid" aria-label={`${title} examples`}>
                    {items.map((item, itemIndex) => (
                      <span key={item}><small>{String(itemIndex + 1).padStart(2, '0')}</small>{item}</span>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section product-matrix-section">
        <div className="site-wrap">
          <div className="section-head section-head--dark">
            <div>
              <p className="eyebrow">How to choose</p>
              <h2>Product name first. Specification second.</h2>
            </div>
            <p>Final production choices depend on size, quantity, artwork, material preference, finishing requirements and intended use.</p>
          </div>
          <div className="decision-register">
            {[
              ['01', 'Output', 'What are you printing?'],
              ['02', 'Format', 'What is the finished size or shape?'],
              ['03', 'Quantity', 'How many units or sheets are required?'],
              ['04', 'Material', 'Do you have a stock or substrate preference?'],
              ['05', 'Finish', 'Does the job require lamination, foil, folding, binding, cutting or another finishing step?'],
              ['06', 'Artwork', 'Is the artwork prepared for final production?'],
            ].map(([n, title, copy]) => (
              <article key={n}>
                <span>{n}</span>
                <h3>{title}</h3>
                <p>{copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section visual-band">
        <div className="site-wrap visual-band__grid">
          <figure className="visual-band__large">
            <img src={cartonImage} alt="Retail carton production detail" loading="lazy" decoding="async" />
            <figcaption><span>Packaging</span><strong>Printed board / finish / convert</strong></figcaption>
          </figure>
          <figure>
            <img src={labelsImage} alt="Product label production detail" loading="lazy" decoding="async" />
            <figcaption><span>Labels</span><strong>Adhesive stock / full colour / custom cut</strong></figcaption>
          </figure>
          <figure>
            <img src={dtfImage} alt="DTF transfer production detail" loading="lazy" decoding="async" />
            <figcaption><span>DTF</span><strong>Full colour / gang sheet / apparel</strong></figcaption>
          </figure>
        </div>
      </section>

      <section className="final-cta-section">
        <div className="site-wrap final-cta">
          <div>
            <p className="eyebrow eyebrow--dark">Next step</p>
            <h2>Know the product? Define the job.</h2>
            <p>Use the Production Desk intake to prepare the specification before quotation.</p>
          </div>
          <a className="button button--ink" href="./index.html#top">Start from the Production Desk <ArrowRight aria-hidden="true" /></a>
        </div>
      </section>
    </InteriorShell>
  );
}
