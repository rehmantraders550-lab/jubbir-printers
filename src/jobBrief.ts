export const JOB_RECIPIENT = {
  name: 'Ali Hamza',
  displayPhone: '0308 899 9988',
  whatsappPhone: '923088999988',
} as const;

export type JobDraft = {
  name: string;
  business: string;
  phone: string;
  job: string;
  size: string;
  quantity: string;
  material: string;
  finishing: string;
  notes: string;
};

export type JobErrors = Partial<Record<keyof JobDraft, string>>;

export const EMPTY_JOB_DRAFT: JobDraft = {
  name: '', business: '', phone: '', job: '', size: '',
  quantity: '', material: '', finishing: '', notes: '',
};

export function validateJobDraft(draft: JobDraft): JobErrors {
  const errors: JobErrors = {};
  if (!draft.name.trim()) errors.name = 'Enter your name.';

  const phone = draft.phone.trim().replace(/[\s().-]/g, '');
  if (!/^\+?\d{7,15}$/.test(phone) || /^0+$/.test(phone.replace(/^\+/, ''))) {
    errors.phone = 'Enter a phone number, such as 0308 899 9988 or +92 308 899 9988.';
  }

  if (!draft.job.trim()) errors.job = 'Tell us what you are printing.';

  const quantity = draft.quantity.trim();
  if (!/^\d+$/.test(quantity) || !Number.isSafeInteger(Number(quantity)) || Number(quantity) < 1) {
    errors.quantity = 'Enter a whole-number quantity of at least 1.';
  }
  return errors;
}

export function formatJobBrief(draft: JobDraft, artworkName?: string): string {
  return [
    'JUBBIR PRINTERS — JOB BRIEF',
    '',
    `Name: ${draft.name.trim()}`,
    `Business: ${draft.business.trim() || 'Not provided'}`,
    `Phone / WhatsApp: ${draft.phone.trim()}`,
    `Job: ${draft.job.trim()}`,
    `Finished size: ${draft.size.trim() || 'To be confirmed'}`,
    `Quantity: ${draft.quantity.trim()}`,
    `Material preference: ${draft.material.trim() || 'Advice required'}`,
    `Finishing requirement: ${draft.finishing.trim() || 'Advice required'}`,
    `Artwork: ${artworkName ? `${artworkName} (attach separately in WhatsApp)` : 'Not selected'}`,
    `Notes: ${draft.notes.trim() || 'None'}`,
  ].join('\n');
}

export function getWhatsAppUrl(brief: string): string {
  return `https://wa.me/${JOB_RECIPIENT.whatsappPhone}?text=${encodeURIComponent(brief)}`;
}
