import React, { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ArrowRight,
  Check,
  ChevronRight,
  FileCheck2,
  Layers,
  MessageCircle,
  PackageOpen,
  Printer,
  Scissors,
  UploadCloud,
  X,
  Zap,
} from 'lucide-react';
import dtfImage from './assets/images/regenerated_image_1789311660499.jpg';

const COLORS = {
  bg: '#171717',
  surface: '#202020',
  surfaceSoft: '#262626',
  line: '#353535',
  accent: '#F36B2B',
  paper: '#F3EFE7',
  muted: '#AFAAA1',
  white: '#FFFFFF',
};

type ServiceKey = 'commercial' | 'packaging' | 'dtf' | 'custom';

const services: Record<ServiceKey, {
  label: string;
  kicker: string;
  title: string;
  description: string;
  applications: string[];
  process: string;
}> = {
  commercial: {
    label: 'Commercial Print',
    kicker: '01 / Everyday production',
    title: 'Commercial print that stays consistent.',
    description:
      'Business stationery, flyers, brochures, catalogues, menus, tags and repeat print runs managed with a production-first approach.',
    applications: ['Business cards', 'Flyers', 'Brochures', 'Menus', 'Tags', 'Stationery'],
    process: 'Offset / short-run production',
  },
  packaging: {
    label: 'Packaging',
    kicker: '02 / Product presentation',
    title: 'Packaging prepared for real products.',
    description:
      'Printed cartons, sleeves, labels and retail packaging developed around artwork, stock, finishing and the physical requirements of the job.',
    applications: ['Product cartons', 'Sleeves', 'Labels', 'Hang tags', 'Bakery packs', 'Retail packs'],
    process: 'Print / finish / convert',
  },
  dtf: {
    label: 'DTF Transfers',
    kicker: '03 / Transfer production',
    title: 'Sharp, repeatable transfer production.',
    description:
      'Full-colour DTF transfers for apparel, uniforms, merchandise and branded textile applications, including short runs and gang-sheet production.',
    applications: ['Logos', 'Chest prints', 'Back prints', 'Uniform graphics', 'Merchandise', 'Gang sheets'],
    process: 'DTF transfer production',
  },
  custom: {
    label: 'Custom Production',
    kicker: '04 / Non-standard jobs',
    title: 'For work that does not fit a preset.',
    description:
      'Unusual dimensions, mixed requirements, prototypes, custom finishing and production jobs that need a more direct conversation before quoting.',
    applications: ['Odd sizes', 'Prototype runs', 'Mixed materials', 'Special finishing', 'Bulk jobs', 'Custom formats'],
    process: 'Specification-led production',
  },
};

const capabilityRows = [
  {
    icon: Printer,
    title: 'Printing',
    copy: 'Offset, short-run commercial production and DTF transfer printing selected according to the job.',
    meta: 'PROCESS / OUTPUT',
  },
  {
    icon: Layers,
    title: 'Stocks & substrates',
    copy: 'Coated and uncoated papers, card stocks, packaging board, kraft, sticker materials and transfer films.',
    meta: 'MATERIAL / SURFACE',
  },
  {
    icon: Scissors,
    title: 'Finishing',
    copy: 'Lamination, foil, creasing, cutting, folding, binding and die-cutting where the production route requires it.',
    meta: 'FINISH / CONVERSION',
  },
  {
    icon: FileCheck2,
    title: 'Artwork',
    copy: 'Print-ready file review with attention to dimensions, bleed, colour mode, resolution and fonts.',
    meta: 'PREFLIGHT / CHECK',
  },
];

const jobs = [
  { title: 'Retail Carton', meta: 'Offset / Printed board / Matte lamination', img: 'banner.png' },
  { title: 'DTF Transfer', meta: 'Full colour / Gang sheet / Apparel', img: dtfImage },
  { title: 'Commercial Brochure', meta: 'Offset / Coated paper / Folded', img: 'hadi colors.png' },
  { title: 'Product Labels', meta: 'Adhesive stock / Full colour / Custom cut', img: 'banner.png' },
];

const timeline = [
  ['01', 'Specify', 'Share size, quantity, material and finishing requirements.'],
  ['02', 'Upload', 'Send artwork or reference files for review.'],
  ['03', 'Review', 'We inspect the job and flag production issues where needed.'],
  ['04', 'Quote', 'A quotation is prepared around the confirmed specification.'],
  ['05', 'Approve', 'Artwork, specification and quotation are locked before production.'],
  ['06', 'Produce', 'Printing, finishing and final preparation begin.'],
  ['07', 'Collect / Dispatch', 'Completed work is prepared for collection or arranged dispatch.'],
];

export default function App() {
  const [activeService, setActiveService] = useState<ServiceKey>('commercial');
  const [drawerOpen, setDrawerOpen] = useState(false);

  const active = useMemo(() => services[activeService], [activeService]);

  return (
    <div
      className="min-h-screen font-sans selection:bg-[#F36B2B]/30"
      style={{ backgroundColor: COLORS.bg, color: COLORS.white }}
    >
      <header className="sticky top-0 z-50 border-b border-white/10 bg-[#171717]/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-5 px-5 py-4 sm:px-8">
          <div className="flex items-center gap-3">
            <div className="grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-white/5">
              <Printer className="h-5 w-5" style={{ color: COLORS.accent }} />
            </div>
            <div>
              <p className="text-sm font-black tracking-[0.16em] text-white">JUBBIR PRINTERS</p>
              <p className="text-[10px] uppercase tracking-[0.24em]" style={{ color: COLORS.muted }}>
                Production Desk
              </p>
            </div>
          </div>

          <div className="hidden items-center gap-7 text-xs font-semibold uppercase tracking-[0.12em] text-white/70 md:flex">
            <a href="#services" className="transition hover:text-white">Services</a>
            <a href="#capabilities" className="transition hover:text-white">Capabilities</a>
            <a href="#work" className="transition hover:text-white">Work</a>
            <a href="#process" className="transition hover:text-white">Process</a>
          </div>

          <button
            onClick={() => setDrawerOpen(true)}
            className="flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-bold text-black transition hover:scale-[1.02]"
            style={{ backgroundColor: COLORS.paper }}
          >
            Start a Job <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </header>

      <main>
        <section className="relative overflow-hidden border-b border-white/10">
          <div className="absolute inset-0">
            <img src="banner.png" alt="Print production" className="h-full w-full object-cover opacity-35" />
            <div className="absolute inset-0 bg-[linear-gradient(90deg,#171717_0%,rgba(23,23,23,.94)_42%,rgba(23,23,23,.58)_100%)]" />
          </div>

          <div className="relative mx-auto grid min-h-[720px] max-w-7xl items-end gap-12 px-5 pb-16 pt-28 sm:px-8 lg:grid-cols-[1.2fr_.8fr] lg:pb-24">
            <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .6 }}>
              <p className="mb-5 text-xs font-bold uppercase tracking-[0.28em]" style={{ color: COLORS.accent }}>
                Commercial Print / Packaging / DTF / Custom Production
              </p>
              <h1 className="max-w-4xl text-5xl font-black leading-[.96] tracking-[-0.05em] text-white sm:text-7xl lg:text-[92px]">
                Printing made straightforward.
              </h1>
              <p className="mt-7 max-w-2xl text-lg leading-8" style={{ color: COLORS.muted }}>
                Send your specification, quantity and artwork. We review the job, define the production route and move it forward from one desk.
              </p>

              <div className="mt-9 flex flex-wrap gap-3">
                <button
                  onClick={() => setDrawerOpen(true)}
                  className="flex items-center gap-2 rounded-full px-6 py-3.5 text-sm font-extrabold text-white"
                  style={{ backgroundColor: COLORS.accent }}
                >
                  Start a Job <ArrowRight className="h-4 w-4" />
                </button>
                <a
                  href="#process"
                  className="flex items-center gap-2 rounded-full border border-white/15 px-6 py-3.5 text-sm font-bold text-white"
                >
                  How it works <ChevronRight className="h-4 w-4" />
                </a>
              </div>
            </motion.div>

            <div className="rounded-[28px] border border-white/10 bg-black/30 p-6 backdrop-blur-md">
              <div className="mb-7 flex items-center justify-between border-b border-white/10 pb-5">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.24em]" style={{ color: COLORS.muted }}>
                    Production Desk
                  </p>
                  <p className="mt-2 text-xl font-bold">Everything starts with the job.</p>
                </div>
                <Zap className="h-5 w-5" style={{ color: COLORS.accent }} />
              </div>
              <div className="space-y-4">
                {['Specification', 'Artwork', 'Production route', 'Quotation', 'Approval'].map((item, index) => (
                  <div key={item} className="flex items-center justify-between border-b border-white/10 pb-4 last:border-0 last:pb-0">
                    <span className="text-sm text-white/80">{item}</span>
                    <span className="text-[10px] font-bold tracking-[0.18em]" style={{ color: COLORS.muted }}>
                      0{index + 1}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="relative border-t border-white/10 bg-black/30">
            <div className="mx-auto flex max-w-7xl gap-8 overflow-hidden px-5 py-4 text-[11px] font-bold uppercase tracking-[0.22em] text-white/65 sm:px-8">
              <span>Business Cards</span><span>Packaging</span><span>Labels</span><span>Brochures</span>
              <span>DTF Transfers</span><span>Stationery</span><span>Bulk Printing</span><span>Custom Jobs</span>
            </div>
          </div>
        </section>

        <section id="services" className="mx-auto max-w-7xl px-5 py-24 sm:px-8 lg:py-32">
          <div className="mb-12 flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.25em]" style={{ color: COLORS.accent }}>Choose your production route</p>
              <h2 className="mt-4 max-w-3xl text-4xl font-black tracking-[-0.04em] sm:text-6xl">One desk. Different production paths.</h2>
            </div>
            <p className="max-w-md text-sm leading-7" style={{ color: COLORS.muted }}>
              The route changes with the job. The interface stays simple.
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-[.78fr_1.22fr]">
            <div className="space-y-2">
              {(Object.keys(services) as ServiceKey[]).map((key) => (
                <button
                  key={key}
                  onClick={() => setActiveService(key)}
                  className="flex w-full items-center justify-between border-b border-white/10 px-1 py-5 text-left"
                >
                  <span className={`text-lg font-bold transition ${activeService === key ? 'text-white' : 'text-white/45'}`}>
                    {services[key].label}
                  </span>
                  <span className="h-2.5 w-2.5 rounded-full border border-white/20" style={{ backgroundColor: activeService === key ? COLORS.accent : 'transparent' }} />
                </button>
              ))}
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeService}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="rounded-[30px] border border-white/10 p-7 sm:p-10"
                style={{ backgroundColor: COLORS.surface }}
              >
                <p className="text-[11px] font-bold uppercase tracking-[0.22em]" style={{ color: COLORS.accent }}>{active.kicker}</p>
                <h3 className="mt-5 max-w-2xl text-3xl font-black tracking-[-0.03em] sm:text-5xl">{active.title}</h3>
                <p className="mt-6 max-w-2xl text-base leading-8" style={{ color: COLORS.muted }}>{active.description}</p>

                <div className="mt-10 grid gap-8 md:grid-cols-2">
                  <div>
                    <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.2em]" style={{ color: COLORS.muted }}>Typical jobs</p>
                    <div className="grid grid-cols-2 gap-x-4 gap-y-3 text-sm">
                      {active.applications.map((item) => (
                        <div key={item} className="flex items-center gap-2">
                          <Check className="h-3.5 w-3.5" style={{ color: COLORS.accent }} />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-black/20 p-5">
                    <p className="text-[10px] font-bold uppercase tracking-[0.2em]" style={{ color: COLORS.muted }}>Production focus</p>
                    <p className="mt-3 text-lg font-bold">{active.process}</p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </section>

        <section id="capabilities" className="border-y border-white/10" style={{ backgroundColor: COLORS.paper, color: '#161616' }}>
          <div className="mx-auto max-w-7xl px-5 py-24 sm:px-8 lg:py-28">
            <div className="mb-12 flex items-end justify-between gap-6">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.24em]" style={{ color: '#7A6F63' }}>Production capability register</p>
                <h2 className="mt-4 text-4xl font-black tracking-[-0.04em] sm:text-6xl">What the desk can coordinate.</h2>
              </div>
            </div>

            <div className="border-t border-black/15">
              {capabilityRows.map(({ icon: Icon, title, copy, meta }) => (
                <div key={title} className="grid gap-5 border-b border-black/15 py-7 md:grid-cols-[48px_220px_1fr_180px] md:items-center">
                  <div className="grid h-10 w-10 place-items-center rounded-full border border-black/15"><Icon className="h-4 w-4" /></div>
                  <h3 className="text-xl font-black">{title}</h3>
                  <p className="max-w-2xl text-sm leading-7 text-black/65">{copy}</p>
                  <p className="text-[10px] font-bold tracking-[0.18em] text-black/45 md:text-right">{meta}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="work" className="mx-auto max-w-7xl px-5 py-24 sm:px-8 lg:py-32">
          <div className="mb-12">
            <p className="text-xs font-bold uppercase tracking-[0.24em]" style={{ color: COLORS.accent }}>Selected production</p>
            <h2 className="mt-4 text-4xl font-black tracking-[-0.04em] sm:text-6xl">Work, not decoration.</h2>
          </div>
          <div className="grid gap-5 md:grid-cols-2">
            {jobs.map((job, index) => (
              <article key={job.title} className="group overflow-hidden rounded-[26px] border border-white/10" style={{ backgroundColor: COLORS.surface }}>
                <div className="h-[300px] overflow-hidden sm:h-[380px]">
                  <img src={job.img} alt={job.title} className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.03]" />
                </div>
                <div className="flex items-end justify-between gap-5 p-6">
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.2em]" style={{ color: COLORS.muted }}>0{index + 1}</p>
                    <h3 className="mt-2 text-xl font-black">{job.title}</h3>
                    <p className="mt-2 text-sm" style={{ color: COLORS.muted }}>{job.meta}</p>
                  </div>
                  <PackageOpen className="h-5 w-5 shrink-0" style={{ color: COLORS.accent }} />
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="border-y border-white/10" style={{ backgroundColor: COLORS.surface }}>
          <div className="mx-auto grid max-w-7xl gap-10 px-5 py-24 sm:px-8 lg:grid-cols-[.8fr_1.2fr] lg:py-28">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.24em]" style={{ color: COLORS.accent }}>Artwork check</p>
              <h2 className="mt-4 text-4xl font-black tracking-[-0.04em] sm:text-5xl">Before you send the file.</h2>
              <p className="mt-5 max-w-md text-sm leading-7" style={{ color: COLORS.muted }}>
                A few simple checks can prevent delays before production.
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {[
                ['File format', 'PDF is preferred for most print-ready artwork.'],
                ['Colour', 'Prepare print artwork in CMYK where applicable.'],
                ['Bleed', 'Include bleed where artwork reaches the trimmed edge.'],
                ['Resolution', 'Images should be suitable for print at final size.'],
                ['Fonts', 'Embed fonts or convert important typography to outlines.'],
                ['Size', 'Artwork should match the intended finished dimensions.'],
              ].map(([title, copy]) => (
                <div key={title} className="rounded-2xl border border-white/10 bg-black/20 p-5">
                  <p className="font-bold">{title}</p>
                  <p className="mt-2 text-sm leading-6" style={{ color: COLORS.muted }}>{copy}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="process" className="mx-auto max-w-7xl px-5 py-24 sm:px-8 lg:py-32">
          <div className="mb-14 max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-[0.24em]" style={{ color: COLORS.accent }}>How a job moves through Jubbir</p>
            <h2 className="mt-4 text-4xl font-black tracking-[-0.04em] sm:text-6xl">Clear stages. Fewer surprises.</h2>
          </div>

          <div className="border-t border-white/10">
            {timeline.map(([number, title, copy]) => (
              <div key={number} className="grid gap-4 border-b border-white/10 py-6 md:grid-cols-[70px_220px_1fr] md:items-center">
                <span className="text-xs font-bold tracking-[0.18em]" style={{ color: COLORS.accent }}>{number}</span>
                <h3 className="text-xl font-black">{title}</h3>
                <p className="max-w-2xl text-sm leading-7" style={{ color: COLORS.muted }}>{copy}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="px-5 pb-24 sm:px-8 lg:pb-32">
          <div className="mx-auto max-w-7xl overflow-hidden rounded-[34px] border border-white/10 p-8 sm:p-12 lg:p-16" style={{ backgroundColor: COLORS.accent }}>
            <div className="grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.22em] text-black/55">Start a job</p>
                <h2 className="mt-4 max-w-3xl text-4xl font-black tracking-[-0.045em] text-black sm:text-6xl">
                  Have something to print?
                </h2>
                <p className="mt-5 max-w-2xl text-base leading-7 text-black/70">
                  Give us the essentials. We will review the details before confirming production.
                </p>
              </div>
              <button
                onClick={() => setDrawerOpen(true)}
                className="flex items-center justify-center gap-2 rounded-full bg-black px-7 py-4 text-sm font-black text-white"
              >
                Start a Job <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/10 bg-black/20">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 sm:px-8 md:grid-cols-3">
          <div>
            <p className="font-black tracking-[0.14em]">JUBBIR PRINTERS</p>
            <p className="mt-3 text-sm leading-6" style={{ color: COLORS.muted }}>
              Commercial Print / Packaging / DTF Transfers / Custom Production
            </p>
          </div>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.2em]" style={{ color: COLORS.muted }}>Production desk</p>
            <div className="mt-4 space-y-2 text-sm">
              <a href="#services" className="block">Services</a>
              <a href="#capabilities" className="block">Capabilities</a>
              <a href="#work" className="block">Selected work</a>
              <a href="#process" className="block">Process</a>
            </div>
          </div>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.2em]" style={{ color: COLORS.muted }}>Closing line</p>
            <p className="mt-4 text-xl font-black">From supplied artwork to finished production.</p>
          </div>
        </div>
      </footer>

      <AnimatePresence>
        {drawerOpen && (
          <>
            <motion.button
              aria-label="Close job drawer"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setDrawerOpen(false)}
              className="fixed inset-0 z-[70] bg-black/70 backdrop-blur-sm"
            />
            <motion.aside
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 260 }}
              className="fixed right-0 top-0 z-[80] h-full w-full max-w-xl overflow-y-auto border-l border-white/10 p-6 sm:p-8"
              style={{ backgroundColor: COLORS.bg }}
            >
              <div className="flex items-start justify-between gap-5">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.22em]" style={{ color: COLORS.accent }}>Fast request</p>
                  <h2 className="mt-3 text-3xl font-black tracking-[-0.03em]">Start a Job</h2>
                  <p className="mt-3 text-sm leading-6" style={{ color: COLORS.muted }}>
                    Give us the essentials. The production team can review the job before quotation.
                  </p>
                </div>
                <button onClick={() => setDrawerOpen(false)} className="rounded-full border border-white/10 p-2.5">
                  <X className="h-5 w-5" />
                </button>
              </div>

              <form className="mt-9 space-y-5" onSubmit={(e) => e.preventDefault()}>
                {[
                  ['Your name', 'text'],
                  ['Business name', 'text'],
                  ['Phone / WhatsApp', 'tel'],
                  ['What are you printing?', 'text'],
                  ['Finished size', 'text'],
                  ['Quantity', 'number'],
                  ['Material preference', 'text'],
                  ['Finishing requirement', 'text'],
                ].map(([label, type]) => (
                  <label key={label} className="block">
                    <span className="mb-2 block text-[10px] font-bold uppercase tracking-[0.18em]" style={{ color: COLORS.muted }}>{label}</span>
                    <input
                      type={type}
                      className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none transition focus:border-white/30"
                    />
                  </label>
                ))}

                <label className="block">
                  <span className="mb-2 block text-[10px] font-bold uppercase tracking-[0.18em]" style={{ color: COLORS.muted }}>Additional notes</span>
                  <textarea rows={4} className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none transition focus:border-white/30" />
                </label>

                <div className="rounded-xl border border-dashed border-white/15 bg-white/[0.03] p-5 text-center">
                  <UploadCloud className="mx-auto h-5 w-5" style={{ color: COLORS.accent }} />
                  <p className="mt-2 text-sm font-bold">Artwork upload slot</p>
                  <p className="mt-1 text-xs" style={{ color: COLORS.muted }}>Connect production upload handling before launch.</p>
                </div>

                <button
                  type="submit"
                  className="flex w-full items-center justify-center gap-2 rounded-xl py-4 text-sm font-black text-white"
                  style={{ backgroundColor: COLORS.accent }}
                >
                  Submit Job <ArrowRight className="h-4 w-4" />
                </button>

                <div className="flex items-center justify-center gap-2 text-xs" style={{ color: COLORS.muted }}>
                  <MessageCircle className="h-4 w-4" />
                  WhatsApp routing can be connected after the production number is confirmed.
                </div>
              </form>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
