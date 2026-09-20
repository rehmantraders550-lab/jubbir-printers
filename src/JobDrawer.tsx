import { useEffect, useRef, useState, type ChangeEvent, type FormEvent } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { ArrowRight, Check, Clipboard, FileUp, X } from 'lucide-react';

type JobDrawerProps = {
  open: boolean;
  onClose: () => void;
};

type CopyState = 'idle' | 'copied' | 'error';

const MAX_FILE_SIZE = 20 * 1024 * 1024;

const getValue = (data: FormData, key: string) => String(data.get(key) ?? '').trim();

export function JobDrawer({ open, onClose }: JobDrawerProps) {
  const drawerRef = useRef<HTMLElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState('');
  const [brief, setBrief] = useState('');
  const [copyState, setCopyState] = useState<CopyState>('idle');
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (!open) return;

    previousFocusRef.current = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.setTimeout(() => closeButtonRef.current?.focus(), 0);

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
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', handleKeyDown);
      previousFocusRef.current?.focus();
    };
  }, [onClose, open]);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] ?? null;
    setFileError('');
    setBrief('');
    setCopyState('idle');

    if (file && file.size > MAX_FILE_SIZE) {
      setSelectedFile(null);
      event.target.value = '';
      setFileError('The selected file is larger than 20 MB. Choose a smaller file.');
      return;
    }

    setSelectedFile(file);
  };

  const prepareBrief = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const lines = [
      'JUBBIR PRINTERS — JOB BRIEF',
      '',
      `Name: ${getValue(data, 'name')}`,
      `Business: ${getValue(data, 'business') || 'Not provided'}`,
      `Phone / WhatsApp: ${getValue(data, 'phone')}`,
      `Job: ${getValue(data, 'job')}`,
      `Finished size: ${getValue(data, 'size') || 'To be confirmed'}`,
      `Quantity: ${getValue(data, 'quantity')}`,
      `Material preference: ${getValue(data, 'material') || 'Advice required'}`,
      `Finishing requirement: ${getValue(data, 'finishing') || 'Advice required'}`,
      `Artwork: ${selectedFile?.name ?? 'Not selected'}`,
      `Notes: ${getValue(data, 'notes') || 'None'}`,
    ];

    setBrief(lines.join('\n'));
    setCopyState('idle');
  };

  const copyBrief = async () => {
    if (!brief) return;

    try {
      await navigator.clipboard.writeText(brief);
      setCopyState('copied');
    } catch {
      setCopyState('error');
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
              </div>
              <button ref={closeButtonRef} type="button" className="icon-button" onClick={onClose} aria-label="Close job drawer">
                <X aria-hidden="true" />
              </button>
            </div>

            <form className="job-form" onSubmit={prepareBrief}>
              <div className="field-grid">
                <label className="field">
                  <span>Your name</span>
                  <input name="name" type="text" autoComplete="name" required />
                </label>
                <label className="field">
                  <span>Business name</span>
                  <input name="business" type="text" autoComplete="organization" />
                </label>
              </div>

              <label className="field">
                <span>Phone / WhatsApp</span>
                <input name="phone" type="tel" inputMode="tel" autoComplete="tel" required />
              </label>

              <label className="field">
                <span>What are you printing?</span>
                <input name="job" type="text" required />
              </label>

              <div className="field-grid">
                <label className="field">
                  <span>Finished size</span>
                  <input name="size" type="text" placeholder="e.g. 90 × 54 mm" />
                </label>
                <label className="field">
                  <span>Quantity</span>
                  <input name="quantity" type="number" inputMode="numeric" min="1" required />
                </label>
              </div>

              <div className="field-grid">
                <label className="field">
                  <span>Material preference</span>
                  <input name="material" type="text" />
                </label>
                <label className="field">
                  <span>Finishing requirement</span>
                  <input name="finishing" type="text" />
                </label>
              </div>

              <label className="field">
                <span>Additional notes</span>
                <textarea name="notes" rows={4} />
              </label>

              <label className="upload-slot">
                <input
                  type="file"
                  accept=".pdf,.ai,.psd,.jpg,.jpeg,.png"
                  onChange={handleFileChange}
                />
                <FileUp aria-hidden="true" />
                <strong>{selectedFile ? selectedFile.name : 'Choose artwork or a reference file'}</strong>
                <span>
                  PDF, AI, PSD, JPG or PNG up to 20 MB. Selection stays on your device and is not uploaded.
                </span>
              </label>
              {fileError && <p className="form-message form-message--error" role="alert">{fileError}</p>}

              <button type="submit" className="button button--accent button--wide">
                Prepare job brief <ArrowRight aria-hidden="true" />
              </button>
              <p className="submission-note">
                This prepares a local brief only. Online submission and artwork routing are not connected yet.
              </p>

              {brief && (
                <section className="brief-result" aria-live="polite">
                  <div>
                    <p className="eyebrow">Prepared locally</p>
                    <h3>Your job brief is ready.</h3>
                  </div>
                  <pre>{brief}</pre>
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
