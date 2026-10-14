import { expect, test } from '@playwright/test';

const remainingPages = ['capabilities', 'work', 'artwork-guide', 'process', 'start-a-job'];

test('work register links reach and focus their matching examples within the page', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  for (const width of [320, 390, 768, 1440]) {
    await page.setViewportSize({ width, height: 1000 });
    await page.goto('/work.html');
    for (const [title, id] of [
      ['Retail Carton', 'retail-carton'],
      ['DTF Transfer', 'dtf-transfer'],
      ['Commercial Brochure', 'commercial-brochure'],
      ['Product Labels', 'product-labels'],
    ]) {
      const link = page.getByRole('link', { name: `View ${title} production example`, exact: true });
      await link.scrollIntoViewIfNeeded();
      expect((await link.boundingBox())!.height).toBeGreaterThanOrEqual(44);
      await link.focus();
      await link.press('Enter');
      await expect(page).toHaveURL(new RegExp(`/work.html#${id}$`));
      const example = page.locator(`#${id}`);
      await expect(example).toBeFocused();
      await expect(example.getByRole('heading', { name: title, exact: true })).toBeVisible();
      const header = (await page.locator('.site-header').boundingBox())!.height;
      await expect.poll(async () => Math.abs((await example.boundingBox())!.y - (header + 8))).toBeLessThanOrEqual(2);
    }
  }
});

test('remaining interior pages reflow with clear guidance and loaded images at all six widths', async ({ page }, testInfo) => {
  test.setTimeout(120_000);
  const errors: string[] = [];
  page.on('pageerror', error => errors.push(error.message));
  page.on('response', response => { if (response.status() >= 400) errors.push(`${response.status()} ${response.url()}`); });
  await page.emulateMedia({ reducedMotion: 'reduce' });
  for (const width of [320, 390, 620, 768, 1024, 1440]) {
    await page.setViewportSize({ width, height: 1000 });
    for (const route of remainingPages) {
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
        if (route === 'capabilities') {
          await expect(page.locator('.capability-deep')).toHaveCount(4);
        } else if (route === 'work') {
          await expect(page.locator('.wave3-work-card')).toHaveCount(4);
          await expect(page.locator('.archive-register__link')).toHaveCount(4);
          await expect(page.locator('.production-example-note')).toContainText('Illustrative production examples');
        } else if (route === 'artwork-guide') {
          await expect(page.locator('.artwork-guide-register article')).toHaveCount(6);
          const areas = await page.locator('.trim-diagram').evaluate(element =>
            [element, ...element.querySelectorAll('.trim-diagram__bleed, .trim-diagram__trim, .trim-diagram__safe')].map(area => area.getBoundingClientRect().toJSON()));
          for (let index = 1; index < areas.length; index++) {
            expect(areas[index].left).toBeGreaterThanOrEqual(areas[index - 1].left);
            expect(areas[index].right).toBeLessThanOrEqual(areas[index - 1].right);
            expect(areas[index].top).toBeGreaterThanOrEqual(areas[index - 1].top);
            expect(areas[index].bottom).toBeLessThanOrEqual(areas[index - 1].bottom);
            expect(areas[index].width).toBeGreaterThan(80);
          }
          await expect(page.locator('.artwork-file-note')).toContainText('Attach the artwork in WhatsApp');
        } else if (route === 'process') {
          await expect(page.locator('.full-process-stack h2')).toHaveText(['Specify', 'Upload', 'Review', 'Quote', 'Approve', 'Produce', 'Collect / Dispatch']);
          await expect(page.locator('.full-process-stack article').nth(1)).toContainText('WhatsApp');
        } else if (route === 'start-a-job') {
          await expect(page.locator('.job-field-register > div')).toHaveCount(10);
          await expect(page.locator('.start-job-hero')).toContainText('Your name, phone number, job and quantity are required.');
          await expect(page.locator('.local-brief')).toContainText('attach your artwork separately');
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
