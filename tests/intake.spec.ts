import { expect, test, type Page } from '@playwright/test';

async function fillRequired(page: Page) {
  await page.getByRole('textbox', { name: 'Your name', exact: true }).fill('Test Customer');
  await page.getByRole('textbox', { name: 'Phone / WhatsApp', exact: true }).fill('+92 308 899 9988');
  await page.getByRole('textbox', { name: 'What are you printing?', exact: true }).fill('Test business cards');
  await page.getByRole('spinbutton', { name: 'Quantity', exact: true }).fill('100');
}

function contrast(foreground: string, background: string) {
  const luminance = (color: string) => {
    const channels = color.match(/[\d.]+/g)!.slice(0, 3).map(Number).map(value => {
      const channel = value / 255;
      return channel <= 0.04045 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4;
    });
    return channels[0] * 0.2126 + channels[1] * 0.7152 + channels[2] * 0.0722;
  };
  const values = [luminance(foreground), luminance(background)].sort((a, b) => b - a);
  return (values[0] + 0.05) / (values[1] + 0.05);
}

test('small controls and light-surface labels have readable contrast', async ({ page }) => {
  await page.goto('/');
  const colors = await page.evaluate(() => {
    const paper = getComputedStyle(document.body).backgroundColor;
    return ['.hero .eyebrow', '.service-tabs button:not(.is-active)', '.capability-number', '.artwork-register article > span', '.process-number'].map(selector => ({
      selector, foreground: getComputedStyle(document.querySelector(selector)!).color, background: paper,
    }));
  });
  for (const color of colors) expect(contrast(color.foreground, color.background), color.selector).toBeGreaterThanOrEqual(4.5);
  const cta = page.locator('.header-cta');
  for (const hover of [false, true]) {
    if (hover) await cta.hover();
    // Wait for the existing color transition to reach its final state.
    await expect.poll(() => cta.evaluate(element => getComputedStyle(element).backgroundColor))
      .toBe(hover ? 'rgb(202, 79, 23)' : 'rgb(243, 107, 43)');
    await expect.poll(async () => {
      const color = await cta.evaluate(element => {
        const style = getComputedStyle(element);
        return { foreground: style.color, background: style.backgroundColor };
      });
      return contrast(color.foreground, color.background);
    }).toBeGreaterThanOrEqual(4.5);
  }
  for (const route of ['products', 'commercial-print', 'packaging', 'dtf-transfers', 'custom-production', 'capabilities', 'work', 'artwork-guide', 'process', 'start-a-job']) {
    await page.goto(`/${route}.html`);
    const labels = await page.locator('.interior-hero .eyebrow, .interior-section .eyebrow, .product-item-grid small, .service-jobs-section .eyebrow, .service-job-register article > span, .service-considerations .eyebrow, .service-proof-section .eyebrow, .service-artwork-section .eyebrow, .service-artwork-register article > span, .service-route-links .eyebrow, .route-link-grid a:not([aria-current="page"]) > span, .preflight-section .eyebrow, .technical-register span, .preflight-list article > span, .archive-register .eyebrow, .archive-register__link > span, .artwork-guide-intro .eyebrow, .artwork-guide-register article > span, .trim-diagram-section .eyebrow, .trim-diagram__bleed > span, .artwork-file-note .eyebrow, .full-process-number, .process-route-note .eyebrow, .job-prep-section .eyebrow, .job-prep-grid small, .job-field-register-section .eyebrow, .job-field-register span, .local-brief .eyebrow--dark, .final-cta .eyebrow--dark').evaluateAll(elements => elements.map(element => {
      let surface: Element | null = element;
      while (surface && getComputedStyle(surface).backgroundColor === 'rgba(0, 0, 0, 0)') surface = surface.parentElement;
      return { text: element.textContent, foreground: getComputedStyle(element).color, background: getComputedStyle(surface || document.body).backgroundColor };
    }));
    expect(labels.length).toBeGreaterThan(0);
    for (const label of labels) expect(contrast(label.foreground, label.background), `${route}: ${label.text}`).toBeGreaterThanOrEqual(4.5);
    if (route === 'process') {
      const follow = page.getByRole('link', { name: 'Follow the route', exact: true });
      for (const hover of [false, true]) {
        if (hover) await follow.hover();
        await expect.poll(async () => {
          const colors = await follow.evaluate(element => {
            const style = getComputedStyle(element);
            return { foreground: style.color, background: style.backgroundColor };
          });
          return contrast(colors.foreground, colors.background);
        }).toBeGreaterThanOrEqual(4.5);
      }
    }
  }
});

test('current brief, copy, artwork and draft survive edits and closing', async ({ page, context }) => {
  await context.grantPermissions(['clipboard-read', 'clipboard-write']);
  await page.goto('/');
  const opener = page.locator('.header-cta');
  await opener.click();
  const close = page.getByRole('button', { name: 'Close job drawer' });
  await expect(close).toBeFocused();
  await close.press('Shift+Tab');
  await expect(page.getByRole('button', { name: 'Prepare job brief' })).toBeFocused();
  await page.keyboard.press('Tab');
  await expect(close).toBeFocused();
  await fillRequired(page);
  await page.getByRole('textbox', { name: 'Business name', exact: true }).fill('Test Company');
  await page.getByRole('textbox', { name: 'Finished size', exact: true }).fill('90 × 54 mm');
  await page.getByRole('textbox', { name: 'Material preference', exact: true }).fill('Coated card');
  await page.getByRole('textbox', { name: 'Finishing requirement', exact: true }).fill('Matte');
  await page.getByRole('textbox', { name: 'Additional notes', exact: true }).fill('اردو & + ? # /\nSecond line');
  await page.getByLabel('Artwork or reference file').setInputFiles({ name: 'test-artwork.pdf', mimeType: 'application/pdf', buffer: Buffer.from('%PDF-1.4 synthetic test') });
  await page.getByRole('button', { name: 'Prepare job brief' }).click();
  const preview = page.locator('.brief-result pre');
  await expect(preview).toContainText('Quantity: 100');
  await expect(preview).toContainText('test-artwork.pdf (attach separately in WhatsApp)');
  await page.getByRole('button', { name: 'Copy job brief' }).click();
  await expect(page.getByRole('button', { name: 'Brief copied' })).toBeVisible();
  expect(await page.evaluate(() => navigator.clipboard.readText())).toBe(await preview.textContent());
  await page.getByRole('spinbutton', { name: 'Quantity', exact: true }).fill('250');
  await expect(preview).toContainText('Quantity: 250');
  await expect(preview).not.toContainText('Quantity: 100');
  await expect(page.getByRole('button', { name: 'Copy job brief' })).toBeVisible();
  const handoff = page.getByRole('link', { name: 'Continue in WhatsApp' });
  const url = new URL((await handoff.getAttribute('href'))!);
  expect(url.origin + url.pathname).toBe('https://wa.me/923088999988');
  expect(url.searchParams.get('text')).toBe(await preview.textContent());
  expect(await handoff.getAttribute('target')).toBe('_blank');
  // Inspect the URL without opening WhatsApp or sending a real message.
  await page.getByRole('spinbutton', { name: 'Quantity', exact: true }).fill('0');
  await expect(handoff).toHaveCount(0);
  await expect(page.locator('.brief-result')).toHaveCount(0);
  await page.getByRole('spinbutton', { name: /Quantity/ }).fill('250');
  await expect(preview).toContainText('Quantity: 250');
  await page.keyboard.press('Escape');
  await expect(page.getByRole('dialog')).toHaveCount(0);
  await expect(opener).toBeFocused();
  expect(await page.evaluate(() => document.body.style.overflow)).not.toBe('hidden');
  await opener.click();
  await expect(page.getByRole('textbox', { name: 'Your name', exact: true })).toHaveValue('Test Customer');
  await expect(page.getByRole('textbox', { name: 'Business name', exact: true })).toHaveValue('Test Company');
  await expect(page.getByRole('spinbutton', { name: 'Quantity', exact: true })).toHaveValue('250');
  await expect(page.locator('.upload-slot strong')).toHaveText('test-artwork.pdf');
  await expect(preview).toContainText('Quantity: 250');
  await expect(page.getByRole('dialog')).toContainText('Ali Hamza at 0308 899 9988');
});

test('invalid fields and files give useful errors while preserving the draft', async ({ page }) => {
  await page.goto('/');
  await page.locator('.header-cta').click();
  await fillRequired(page);
  await page.getByRole('textbox', { name: 'Your name', exact: true }).fill('   ');
  await page.getByRole('textbox', { name: 'Phone / WhatsApp', exact: true }).fill('not-a-phone');
  await page.getByRole('textbox', { name: 'What are you printing?', exact: true }).fill('   ');
  await page.getByRole('spinbutton', { name: 'Quantity', exact: true }).fill('1.5');
  await page.getByRole('button', { name: 'Prepare job brief' }).click();
  await expect(page.locator('input[name="name"]')).toBeFocused();
  for (const field of ['name', 'phone', 'job', 'quantity']) {
    await expect(page.locator(`input[name="${field}"]`)).toHaveAttribute('aria-invalid', 'true');
    await expect(page.locator(`#job-error-${field}`)).toBeVisible();
  }
  await expect(page.getByRole('link', { name: 'Continue in WhatsApp' })).toHaveCount(0);
  await page.getByLabel('Artwork or reference file').setInputFiles({ name: 'wrong.txt', mimeType: 'text/plain', buffer: Buffer.from('synthetic') });
  await expect(page.getByRole('alert').filter({ hasText: 'Choose a PDF' })).toBeVisible();
  await page.getByLabel('Artwork or reference file').setInputFiles({ name: 'oversize.pdf', mimeType: 'application/pdf', buffer: Buffer.alloc(20 * 1024 * 1024 + 1) });
  await expect(page.getByRole('alert').filter({ hasText: 'larger than 20 MB' })).toBeVisible();
  await expect(page.locator('input[name="phone"]')).toHaveValue('not-a-phone');
});

test('homepage reflows and sticky anchors work at all six widths', async ({ page }, testInfo) => {
  const errors: string[] = [];
  page.on('pageerror', error => errors.push(error.message));
  page.on('console', message => { if (message.type() === 'error') errors.push(message.text()); });
  page.on('response', response => { if (response.status() >= 400) errors.push(`${response.status()} ${response.url()}`); });
  await page.emulateMedia({ reducedMotion: 'reduce' });
  for (const width of [320, 390, 620, 768, 1024, 1440]) {
    await test.step(`${width}px`, async () => {
      await page.setViewportSize({ width, height: 1000 });
      await page.goto('/');
      await expect(page.getByRole('heading', { name: 'Printing made straightforward.', level: 1 })).toBeVisible();
      const layout = await page.evaluate(() => {
        const box = (selector: string) => document.querySelector(selector)!.getBoundingClientRect().toJSON();
        return {
          scrollWidth: document.documentElement.scrollWidth, width: document.documentElement.clientWidth,
          copy: box('.hero-copy'), visual: box('.hero-visual'),
          lines: [...document.querySelectorAll('.hero-title-line')].flatMap(el => {
            const range = document.createRange();
            range.selectNodeContents(el);
            return [...range.getClientRects()].map(rect => rect.toJSON());
          }),
          offset: parseFloat(getComputedStyle(document.documentElement).scrollPaddingTop),
          header: box('.site-header'), cta: box('.header-cta'),
        };
      });
      expect(layout.scrollWidth).toBeLessThanOrEqual(layout.width);
      expect(layout.cta.height).toBeGreaterThanOrEqual(44);
      expect(layout.offset).toBeGreaterThanOrEqual(layout.header.height + 7);
      for (const line of layout.lines) {
        expect(line.x).toBeGreaterThanOrEqual(0);
        expect(line.right).toBeLessThanOrEqual(width + 1);
      }
      if (width <= 860) expect(layout.visual.y).toBeGreaterThanOrEqual(layout.copy.bottom - 1);
      else expect(layout.visual.y).toBe(layout.copy.y);
      await expect(page.locator('.desk-register li')).toHaveCount(5);
      const productImages = await page.locator('.home-product-card img').evaluateAll(images => images.map(image => (image as HTMLImageElement).src));
      expect(productImages).toHaveLength(8);
      expect(new Set(productImages).size).toBe(8);
      // Preload stable page images before taking a full-page screenshot.
      // The sticky stage crossfades between different <img> nodes as we scroll;
      // its dynamic image is verified separately by the production route tests.
      for (const img of await page.locator('img:not(#service-panel img)').all()) {
        await img.scrollIntoViewIfNeeded();
        await expect.poll(() => img.evaluate(element => (element as HTMLImageElement).complete && (element as HTMLImageElement).naturalWidth > 0)).toBe(true);
      }
      await page.locator('.brand').click();
      if (width === 1440) {
        const connector = await page.evaluate(() => {
          const register = document.querySelector('.process-register')!;
          const box = register.getBoundingClientRect();
          const style = getComputedStyle(register, '::before');
          const markers = [...register.querySelectorAll('.process-marker')].map(marker => {
            const rect = marker.getBoundingClientRect();
            return { x: rect.x + rect.width / 2, y: rect.y + rect.height / 2 };
          });
          return {
            start: box.x + parseFloat(style.left), end: box.right - parseFloat(style.right),
            y: box.y + parseFloat(style.top) + parseFloat(style.height) / 2, markers,
          };
        });
        expect(Math.abs(connector.start - connector.markers[0].x)).toBeLessThanOrEqual(1);
        expect(Math.abs(connector.end - connector.markers[6].x)).toBeLessThanOrEqual(1);
        for (const marker of connector.markers) expect(Math.abs(connector.y - marker.y)).toBeLessThanOrEqual(1);
      }
      await page.screenshot({ path: testInfo.outputPath(`home-${width}.png`), fullPage: true });
      if (width <= 860) {
        const menu = page.getByRole('button', { name: 'Open navigation menu' });
        expect((await menu.boundingBox())!.height).toBeGreaterThanOrEqual(44);
        await menu.click();
        await page.locator('.mobile-nav').getByRole('link', { name: 'Services' }).click();
        await expect(page.locator('.mobile-nav')).toHaveCount(0);
      } else {
        await page.locator('.desktop-nav').getByRole('link', { name: 'Services' }).click();
      }
      await expect.poll(async () => Math.abs((await page.locator('#services').boundingBox())!.y - (layout.header.height + 8))).toBeLessThanOrEqual(2);
      const commercial = page.getByRole('tab', { name: /Commercial Print/ });
      await commercial.focus();
      await commercial.press('ArrowDown');
      await expect(page.getByRole('tab', { name: /Packaging/ })).toHaveAttribute('aria-selected', 'true');
      await expect(page.getByRole('heading', { name: 'Packaging prepared for real products.' })).toBeVisible();
      await page.locator('.header-cta').click();
      await page.screenshot({ path: testInfo.outputPath(`drawer-${width}-top.png`) });
      await fillRequired(page);
      await page.getByRole('button', { name: 'Prepare job brief' }).click();
      await page.getByRole('link', { name: 'Continue in WhatsApp' }).scrollIntoViewIfNeeded();
      await expect(page.getByRole('link', { name: 'Continue in WhatsApp' })).toBeVisible();
      const drawerLayout = await page.evaluate(() => ({
        drawer: document.querySelector('.job-drawer')!.getBoundingClientRect().toJSON(),
        fieldSize: getComputedStyle(document.querySelector('.field input')!).fontSize,
        labelSize: getComputedStyle(document.querySelector('.field > span')!).fontSize,
        overflow: document.querySelector('.job-drawer')!.scrollWidth > document.querySelector('.job-drawer')!.clientWidth,
      }));
      expect(drawerLayout.drawer.width).toBeLessThanOrEqual(width);
      expect(drawerLayout.fieldSize).toBe('16px');
      expect(drawerLayout.labelSize).toBe('12px');
      expect(drawerLayout.overflow).toBe(false);
      await page.screenshot({ path: testInfo.outputPath(`drawer-${width}.png`) });
      await page.keyboard.press('Escape');
      await expect(page.getByRole('dialog')).toHaveCount(0);
    });
  }
  expect(errors).toEqual([]);
});

test('mobile menu anchors settle below the header with normal motion', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 900 });
  await page.goto('/');
  const headerHeight = (await page.locator('.site-header').boundingBox())!.height;
  await page.getByRole('button', { name: 'Open navigation menu' }).click();
  await page.locator('.mobile-nav').getByRole('link', { name: 'Services' }).click();
  await expect(page.locator('.mobile-nav')).toHaveCount(0);
  await expect.poll(async () => Math.abs((await page.locator('#services').boundingBox())!.y - (headerHeight + 8))).toBeLessThanOrEqual(2);
  await page.setViewportSize({ width: 620, height: 360 });
  await page.locator('.brand').click();
  await page.getByRole('button', { name: 'Open navigation menu' }).click();
  const menu = page.locator('.mobile-nav');
  await expect.poll(() => menu.evaluate(element => element.clientHeight)).toBeGreaterThan(200);
  const lastLink = menu.getByRole('link', { name: /Process/ });
  await lastLink.scrollIntoViewIfNeeded();
  await expect(lastLink).toBeInViewport({ ratio: 1 });
});

test('shared drawer and page assets work on every interior route', async ({ page }) => {
  const errors: string[] = [];
  page.on('pageerror', error => errors.push(error.message));
  page.on('response', response => { if (response.status() >= 400) errors.push(`${response.status()} ${response.url()}`); });
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.setViewportSize({ width: 390, height: 900 });
  for (const route of ['products', 'capabilities', 'work', 'artwork-guide', 'process', 'start-a-job', 'commercial-print', 'packaging', 'dtf-transfers', 'custom-production']) {
    await page.goto(`/${route}.html`);
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
    const darkLabels = await page.locator('.section-head--dark .eyebrow, .start-job-hero .eyebrow').evaluateAll(elements =>
      elements.map(element => getComputedStyle(element).color));
    for (const color of darkLabels) expect(contrast(color, 'rgb(23, 23, 23)'), `${route} dark label`).toBeGreaterThanOrEqual(4.5);
    await page.locator('.header-cta').click();
    await fillRequired(page);
    await page.getByRole('button', { name: 'Prepare job brief' }).click();
    await expect(page.getByRole('link', { name: 'Continue in WhatsApp' })).toHaveAttribute('href', /^https:\/\/wa\.me\/923088999988\?text=/);
    await page.keyboard.press('Escape');
    await expect(page.getByRole('dialog')).toHaveCount(0);
    await expect(page.locator('.header-cta')).toBeFocused();
  }
  expect(errors).toEqual([]);
});
