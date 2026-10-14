import { useEffect, useRef, useState, type ChangeEvent, type FormEvent } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { ArrowRight, Check, Clipboard, FileUp, X } from 'lucide-react';
import { EMPTY_JOB_DRAFT, JOB_RECIPIENT, formatJobBrief, getWhatsAppUrl, validateJobDraft, type JobDraft } from './jobBrief';

type JobDrawerProps = {
  open: boolean;
  onClose: () => void;
};

type CopyState = 'idle' | 'copied' | 'error';

const MAX_FILE_SIZE = 20 * 1024 * 1024;

export function JobDrawer({ open, onClose }: JobDrawerProps) {
  const drawerRef = useRef<HTMLElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState('');
  const [draft, setDraft] = useState<JobDraft>(EMPTY_JOB_DRAFT);
  const [prepared, setPrepared] = useState(false);
  const [attempted, setAttempted] = useState(false);
  const [copyState, setCopyState] = useState<CopyState>('idle');
  const copyRequestRef = useRef(0);
  const reduceMotion = useReducedMotion();
  const errors = validateJobDraft(draft);
  const valid = Object.keys(errors).length === 0;
  const brief = prepared && valid ? formatJobBrief(draft, selectedFile?.name) : '';

  const invalidateCopy = () => {
    copyRequestRef.current += 1;
    setCopyState('idle');
  };

  const fieldProps = (name: keyof JobDraft) => ({
    name,
    value: draft[name],
    onChange: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setDraft((current) => ({ ...current, [name]: event.target.value }));
      invalidateCopy();
    },
    'aria-invalid': attempted && !!errors[name] ? true : undefined,
    'aria-describedby': attempted && errors[name] ? `job-error-${name}` : undefined,
  });

  const fieldError = (name: keyof JobDraft) => attempted && errors[name] ? (
    <span className="field-error" id={`job-error-${name}`}>{errors[name]}</span>
  ) : null;

  useEffect(() => {
    if (!open) return;

    previousFocusRef.current = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const focusTimer = window.setTimeout(() => closeButtonRef.current?.focus(), 0);

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        onClose();
        return;
      }

      if (event.key !== 'Tab' || !drawerRef.current) return;
      const focusable: HTMLElement[] = Array.from(
        drawerRef.current.querySelectorAll<HTMLElement>(
          'button:not([disabled]), input:not([disabled]), textarea:not([disabled]), [href], [tabindex]:not([tabindex="-1"])',
        ),
      ) as HTMLElement[];

      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      window.clearTimeout(focusTimer);
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', handleKeyDown);
      previousFocusRef.current?.focus();
    };
  }, [onClose, open]);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] ?? null;
    setFileError('');
    invalidateCopy();

    // Cancelling the chooser must not discard a previously selected reference.
    if (!file) return;

    if (!/\.(pdf|ai|psd|jpe?g|png)$/i.test(file.name)) {
      event.target.value = '';
      setFileError('Choose a PDF, AI, PSD, JPG or PNG file.');
      return;
    }

    if (file && file.size > MAX_FILE_SIZE) {
      event.target.value = '';
      setFileError('The selected file is larger than 20 MB. Choose a smaller file.');
      return;
    }

    setSelectedFile(file);
  };

  const prepareBrief = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setAttempted(true);
    invalidateCopy();
    if (!valid) {
      const firstInvalid = Object.keys(errors)[0];
      const control = event.currentTarget.elements.namedItem(firstInvalid);
      if (control instanceof HTMLElement) control.focus();
      return;
    }
    setPrepared(true);
  };

  const copyBrief = async () => {
    if (!brief) return;
    const request = ++copyRequestRef.current;

    try {
      await navigator.clipboard.writeText(brief);
      if (copyRequestRef.current === request) setCopyState('copied');
    } catch {
      if (copyRequestRef.current === request) setCopyState('error');
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            aria-hidden="true"
            className="drawer-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.2 }}
            onClick={onClose}
          />

          <motion.aside
            ref={drawerRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="job-drawer-title"
            className="job-drawer"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={reduceMotion ? { duration: 0 } : { type: 'spring', damping: 32, stiffness: 300 }}
          >
            <div className="drawer-head">
              <div>
                <p className="eyebrow">Fast request</p>
                <h2 id="job-drawer-title">Start a Job</h2>
                <p>
                  Give us the essentials. The production team can review the job before quotation.
                </p>
                <p className="drawer-routing">Your brief opens in WhatsApp for {JOB_RECIPIENT.name} at {JOB_RECIPIENT.displayPhone}.</p>
              </div>
              <button ref={closeButtonRef} type="button" className="icon-button" onClick={onClose} aria-label="Close job drawer">
                <X aria-hidden="true" />
              </button>
            </div>

            <form className="job-form" onSubmit={prepareBrief} noValidate>
              <div className="field-grid">
                <label className="field">
                  <span>Your name</span>
                  <input {...fieldProps('name')} type="text" autoComplete="name" required />
                  {fieldError('name')}
                </label>
                <label className="field">
                  <span>Business name</span>
                  <input {...fieldProps('business')} type="text" autoComplete="organization" />
                </label>
              </div>

              <label className="field">
                <span>Phone / WhatsApp</span>
                <input {...fieldProps('phone')} type="tel" inputMode="tel" autoComplete="tel" required />
                {fieldError('phone')}
              </label>

              <label className="field">
                <span>What are you printing?</span>
                <input {...fieldProps('job')} type="text" required />
                {fieldError('job')}
              </label>

              <div className="field-grid">
                <label className="field">
                  <span>Finished size</span>
                  <input {...fieldProps('size')} type="text" placeholder="e.g. 90 × 54 mm" />
                </label>
                <label className="field">
                  <span>Quantity</span>
                  <input {...fieldProps('quantity')} type="number" inputMode="numeric" min="1" step="1" required />
                  {fieldError('quantity')}
                </label>
              </div>

              <div className="field-grid">
                <label className="field">
                  <span>Material preference</span>
                  <input {...fieldProps('material')} type="text" />
                </label>
                <label className="field">
                  <span>Finishing requirement</span>
                  <input {...fieldProps('finishing')} type="text" />
                </label>
              </div>

              <label className="field">
                <span>Additional notes</span>
                <textarea {...fieldProps('notes')} rows={4} />
              </label>

              <label className="upload-slot">
                <input
                  type="file"
                  aria-label="Artwork or reference file"
                  accept=".pdf,.ai,.psd,.jpg,.jpeg,.png"
                  onChange={handleFileChange}
                />
                <FileUp aria-hidden="true" />
                <strong>{selectedFile ? selectedFile.name : 'Choose artwork or a reference file'}</strong>
                <span>
                  PDF, AI, PSD, JPG or PNG up to 20 MB. Selection stays on your device. Attach the file separately in WhatsApp; it is not uploaded here.
                </span>
              </label>
              {fileError && <p className="form-message form-message--error" role="alert">{fileError}</p>}

              <button type="submit" className="button button--accent button--wide">
                Prepare job brief <ArrowRight aria-hidden="true" />
              </button>
              <p className="submission-note">
                Review your brief, continue in WhatsApp, attach any artwork and tap Send. Your draft stays available while this page remains open.
              </p>

              {attempted && !valid && (
                <p className="form-message form-message--error" role="alert">Check the highlighted fields before preparing your brief.</p>
              )}

              {brief && (
                <section className="brief-result" aria-live="polite">
                  <div>
                    <p className="eyebrow">Review before sending</p>
                    <h3>Your job brief is ready.</h3>
                  </div>
                  <pre>{brief}</pre>
                  <a className="button button--accent button--wide" href={getWhatsAppUrl(brief)} target="_blank" rel="noopener noreferrer">
                    Continue in WhatsApp <ArrowRight aria-hidden="true" />
                  </a>
                  <p className="submission-note">Opens WhatsApp in a new tab or app. Review the message and tap Send to deliver it to {JOB_RECIPIENT.name}.</p>
                  <button type="button" className="button button--ink button--wide" onClick={copyBrief}>
                    {copyState === 'copied' ? <Check aria-hidden="true" /> : <Clipboard aria-hidden="true" />}
                    {copyState === 'copied' ? 'Brief copied' : 'Copy job brief'}
                  </button>
                  {copyState === 'error' && (
                    <p className="form-message form-message--error" role="alert">
                      The brief could not be copied. Select the text above and copy it manually.
                    </p>
                  )}
                </section>
              )}
            </form>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
