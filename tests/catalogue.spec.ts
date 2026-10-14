import { expect, test } from '@playwright/test';

const servicePages = [
  ['commercial-print', 'Commercial print that stays consistent.'],
  ['packaging', 'Packaging prepared for real products.'],
  ['dtf-transfers', 'Sharp, repeatable transfer production.'],
  ['custom-production', 'For work that does not fit a preset.'],
] as const;

test('page intake buttons open the shared drawer without losing the current page or draft', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  for (const width of [390, 1440]) {
    await page.setViewportSize({ width, height: 1000 });
    for (const route of ['products', 'start-a-job', 'work', 'artwork-guide', 'process', ...servicePages.map(([path]) => path)]) {
      await page.goto(`/${route}.html`);
      const opener = page.locator('main').getByRole('button', { name: 'Start a Job', exact: true });
      await opener.scrollIntoViewIfNeeded();
      expect((await opener.boundingBox())!.height).toBeGreaterThanOrEqual(44);
      await opener.focus();
      await opener.press('Enter');
      await expect(page).toHaveURL(new RegExp(`/${route}.html$`));
      await expect(page.getByRole('dialog')).toHaveCount(1);
      await expect(page.getByRole('button', { name: 'Close job drawer' })).toBeFocused();
      await page.getByRole('textbox', { name: 'Your name', exact: true }).fill('Catalogue test');
      await page.getByRole('textbox', { name: 'Phone / WhatsApp', exact: true }).fill('+92 308 899 9988');
      await page.getByRole('textbox', { name: 'What are you printing?', exact: true }).fill('Synthetic route validation');
      await page.getByRole('spinbutton', { name: 'Quantity', exact: true }).fill('100');
      await page.getByRole('button', { name: 'Prepare job brief' }).click();
      await page.keyboard.press('Escape');
      await expect(page.getByRole('dialog')).toHaveCount(0);
      await expect(opener).toBeFocused();

      await page.locator('.header-cta').click();
      await expect(page.getByRole('textbox', { name: 'Your name', exact: true })).toHaveValue('Catalogue test');
      await page.getByRole('spinbutton', { name: 'Quantity', exact: true }).fill('250');
      const preview = page.locator('.brief-result pre');
      await expect(preview).toContainText('Quantity: 250');
      const handoff = new URL((await page.getByRole('link', { name: 'Continue in WhatsApp' }).getAttribute('href'))!);
      expect(handoff.origin + handoff.pathname).toBe('https://wa.me/923088999988');
      expect(handoff.searchParams.get('text')).toBe(await preview.textContent());
      // Check the handoff URL without opening WhatsApp or sending a request.
      await page.keyboard.press('Escape');
      await expect(page.locator('.header-cta')).toBeFocused();
    }
  }
});

test('catalogue families lead to the matching service and specification guidance', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 900 });
  for (const [index, [path, heading]] of servicePages.entries()) {
    await page.goto('/products.html');
    const family = page.locator('.product-family').nth(index);
    const link = family.getByRole('link', { name: 'Explore production route', exact: true });
    await link.focus();
    await link.press('Enter');
    await expect(page).toHaveURL(new RegExp(`/${path}.html$`));
    await expect(page.getByRole('heading', { level: 1, name: heading })).toBeVisible();
    await expect(page.locator('.service-job-register article')).toHaveCount(6);
    await expect(page.locator('.service-job-register')).toContainText(/size|dimensions|format/i);
    await expect(page.locator('.service-job-register')).toContainText(/quantity|copies/i);
    await expect(page.locator('.service-proof-section')).toContainText('Illustrative examples');
    if (path === 'dtf-transfers') {
      const images = await page.locator('main img').evaluateAll(elements => elements.map(element => (element as HTMLImageElement).src));
      expect(images.every(src => src.includes('jubbir-dtf-transfer-v2'))).toBe(true);
    }
  }
});

test('catalogue and service details reflow with loaded imagery at all six widths', async ({ page }, testInfo) => {
  test.setTimeout(120_000);
  const errors: string[] = [];
  page.on('pageerror', error => errors.push(error.message));
  page.on('response', response => { if (response.status() >= 400) errors.push(`${response.status()} ${response.url()}`); });
  await page.emulateMedia({ reducedMotion: 'reduce' });
  for (const width of [320, 390, 620, 768, 1024, 1440]) {
    await page.setViewportSize({ width, height: 1000 });
    for (const route of ['products', ...servicePages.map(([path]) => path)]) {
      await test.step(`${route} at ${width}px`, async () => {
        await page.goto(`/${route}.html`);
        await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
        const layout = await page.evaluate(() => ({
          width: document.documentElement.clientWidth,
          scrollWidth: document.documentElement.scrollWidth,
          headings: [...document.querySelectorAll('main h1, main h2, main h3')].flatMap(heading => {
            const range = document.createRange();
            range.selectNodeContents(heading);
            return [...range.getClientRects()].map(rect => ({ left: rect.left, right: rect.right, text: heading.textContent }));
          }),
        }));
        expect(layout.scrollWidth, `${route} overflow`).toBeLessThanOrEqual(layout.width);
        for (const heading of layout.headings) {
          expect(heading.left, heading.text || '').toBeGreaterThanOrEqual(-1);
          expect(heading.right, heading.text || '').toBeLessThanOrEqual(width + 1);
        }
        if (route === 'products') {
          await expect(page.locator('.product-family')).toHaveCount(4);
          await expect(page.locator('.product-family').last().locator('img')).toHaveAttribute('src', /jubbir-custom-jobs-v1/);
        } else {
          await expect(page.locator('.service-job-register article p')).toHaveCount(6);
          const register = page.locator('.service-job-register');
          expect(await register.evaluate(element => element.scrollWidth <= element.clientWidth)).toBe(true);
        }
        for (const image of await page.locator('main img').all()) {
          await image.scrollIntoViewIfNeeded();
          await expect.poll(() => image.evaluate(element => (element as HTMLImageElement).complete && (element as HTMLImageElement).naturalWidth > 0)).toBe(true);
        }
        await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
        await page.screenshot({ path: testInfo.outputPath(`${route}-${width}.png`), fullPage: true });
      });
    }
  }
  expect(errors).toEqual([]);
});
