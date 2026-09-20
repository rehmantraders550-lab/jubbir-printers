import type { LucideIcon } from 'lucide-react';
import { FileCheck2, Layers3, Printer, Scissors } from 'lucide-react';
import brochureImage from './assets/images/jubbir-brochure-v2.webp';
import dtfImage from './assets/images/jubbir-dtf-transfer-v2.webp';
import labelsImage from './assets/images/jubbir-labels-v2.webp';
import retailCartonImage from './assets/images/jubbir-retail-carton-v2.webp';

export type ServiceKey = 'commercial' | 'packaging' | 'dtf' | 'custom';

export type Service = {
  label: string;
  kicker: string;
  title: string;
  description: string;
  applications: string[];
  process: string;
};

export const serviceOrder: ServiceKey[] = ['commercial', 'packaging', 'dtf', 'custom'];

export const services: Record<ServiceKey, Service> = {
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

export type Capability = {
  icon: LucideIcon;
  title: string;
  copy: string;
  meta: string;
};

export const capabilities: Capability[] = [
  {
    icon: Printer,
    title: 'Printing',
    copy: 'Offset, short-run commercial production and DTF transfer printing selected according to the job.',
    meta: 'PROCESS / OUTPUT',
  },
  {
    icon: Layers3,
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

export const productionJobs = [
  {
    title: 'Retail Carton',
    category: 'Packaging',
    meta: 'Offset / Printed board / Matte lamination',
    image: retailCartonImage,
    alt: 'Assembled and flat retail cartons on a commercial print finishing table',
    className: 'proof-card--primary',
  },
  {
    title: 'DTF Transfer',
    category: 'Transfer',
    meta: 'Full colour / Gang sheet / Apparel',
    image: dtfImage,
    alt: 'Full-colour DTF gang sheet emerging from a professional roll printer',
    className: 'proof-card--secondary',
  },
  {
    title: 'Commercial Brochure',
    category: 'Commercial',
    meta: 'Offset / Coated paper / Folded',
    image: brochureImage,
    alt: 'Stacks of finished commercial brochures beside print finishing equipment',
    className: 'proof-card--tertiary',
  },
  {
    title: 'Product Labels',
    category: 'Labels',
    meta: 'Adhesive stock / Full colour / Custom cut',
    image: labelsImage,
    alt: 'Custom product labels being contour-cut on a professional flatbed cutter',
    className: 'proof-card--quaternary',
  },
];

export const artworkChecks = [
  ['01', 'File format', 'PDF is preferred for most print-ready artwork.'],
  ['02', 'Colour', 'Prepare print artwork in CMYK where applicable.'],
  ['03', 'Bleed', 'Include bleed where artwork reaches the trimmed edge.'],
  ['04', 'Resolution', 'Images should be suitable for print at final size.'],
  ['05', 'Fonts', 'Embed fonts or convert important typography to outlines.'],
  ['06', 'Size', 'Artwork should match the intended finished dimensions.'],
] as const;

export const processSteps = [
  ['01', 'Specify', 'Share size, quantity, material and finishing requirements.'],
  ['02', 'Upload', 'Send artwork or reference files for review.'],
  ['03', 'Review', 'We inspect the job and flag production issues where needed.'],
  ['04', 'Quote', 'A quotation is prepared around the confirmed specification.'],
  ['05', 'Approve', 'Artwork, specification and quotation are locked before production.'],
  ['06', 'Produce', 'Printing, finishing and final preparation begin.'],
  ['07', 'Collect / Dispatch', 'Completed work is prepared for collection or arranged dispatch.'],
] as const;

export const jobTypes = [
  'Business Cards',
  'Packaging',
  'Labels',
  'Brochures',
  'DTF Transfers',
  'Stationery',
  'Bulk Printing',
  'Custom Jobs',
];

export const deskStages = ['Specification', 'Artwork', 'Production route', 'Quotation', 'Approval'];
