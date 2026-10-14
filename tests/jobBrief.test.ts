import assert from 'node:assert/strict';
import { test } from 'node:test';
import { EMPTY_JOB_DRAFT, formatJobBrief, getWhatsAppUrl, validateJobDraft, type JobDraft } from '../src/jobBrief';

const draft: JobDraft = {
  ...EMPTY_JOB_DRAFT, name: 'Test Customer', phone: '0308 899 9988',
  job: 'Business cards', quantity: '100',
};

test('requires real text and a positive whole-number quantity', () => {
  assert.equal(validateJobDraft({ ...draft, name: ' \n ', job: '  ' }).name, 'Enter your name.');
  assert.ok(validateJobDraft({ ...draft, job: '  ' }).job);
  for (const quantity of ['', ' ', '0', '-1', '1.5', '1e3', 'Infinity', '9007199254740992']) {
    assert.ok(validateJobDraft({ ...draft, quantity }).quantity, quantity);
  }
  for (const quantity of ['1', '250', ' 250 ']) {
    assert.deepEqual(validateJobDraft({ ...draft, quantity }), {});
  }
});

test('accepts formatted local and international phone numbers; rejects malformed numbers', () => {
  for (const phone of ['0308 899 9988', '+92 (308) 899-9988', '0092 308 899 9988', '+1 202 555 0123']) {
    assert.deepEqual(validateJobDraft({ ...draft, phone }), {}, phone);
  }
  for (const phone of ['', 'not-a-phone', '123', '0308+8999988', '00000000000', '+000000000', '1234567890123456']) {
    assert.ok(validateJobDraft({ ...draft, phone }).phone, phone);
  }
});

test('keeps every field and marks artwork as a separate attachment', () => {
  const brief = formatJobBrief({
    ...draft, name: '  Test Customer  ', business: 'Test Print Co',
    size: '90 × 54 mm', material: 'Coated card', finishing: 'Matte lamination',
    notes: 'First line\nSecond line',
  }, 'reference.pdf');
  for (const line of ['Name: Test Customer', 'Business: Test Print Co', 'Phone / WhatsApp: 0308 899 9988',
    'Job: Business cards', 'Finished size: 90 × 54 mm', 'Quantity: 100',
    'Material preference: Coated card', 'Finishing requirement: Matte lamination',
    'Artwork: reference.pdf (attach separately in WhatsApp)', 'Notes: First line\nSecond line']) {
    assert.ok(brief.includes(line), line);
  }
  assert.ok(formatJobBrief(draft).includes('Artwork: Not selected'));
});

test('updated drafts and Unicode/special characters reach only the confirmed recipient', () => {
  const brief = formatJobBrief({ ...draft, quantity: '250', notes: 'اردو & + ? # /\nhttps://example.com/?a=1&b=2' });
  const url = new URL(getWhatsAppUrl(brief));
  assert.equal(url.origin, 'https://wa.me');
  assert.equal(url.pathname, '/923088999988');
  assert.equal(url.searchParams.get('text'), brief);
  assert.equal(url.searchParams.size, 1);
  assert.equal(url.hash, '');
  assert.ok(brief.includes('Quantity: 250'));
  assert.ok(!brief.includes('Quantity: 100'));
});
