import { expect, test } from '@playwright/test';

test('overview links open their existing detail pages', async ({ page }) => {
  const cases = [
    ['#capabilities .section-detail-link', 'capabilities.html', 'Production decisions made visible.'],
    ['#work .section-detail-link', 'work.html', 'Work, not decoration.'],
    ['.artwork-intro .section-detail-link', 'artwork-guide.html', 'Prepare the file before production.'],
    ['#process .section-detail-link', 'process.html', 'Clear stages. Fewer surprises.'],
  ];
  await page.setViewportSize({ width: 390, height: 900 });
  await page.emulateMedia({ reducedMotion: 'reduce' });
  for (const [selector, path, heading] of cases) {
    await page.goto('/');
    const link = page.locator(selector);
    expect((await link.boundingBox())!.height).toBeGreaterThanOrEqual(44);
    await link.focus();
    await link.press('Enter');
    await expect(page).toHaveURL(new RegExp(`/${path}$`));
    await expect(page.getByRole('heading', { level: 1, name: heading })).toBeVisible();
  }
});

test('proof cards open the corresponding production example on phones and desktop', async ({ page }) => {
  const examples = [
    ['Retail Carton', 'retail-carton'],
    ['DTF Transfer', 'dtf-transfer'],
    ['Commercial Brochure', 'commercial-brochure'],
    ['Product Labels', 'product-labels'],
  ];
  await page.emulateMedia({ reducedMotion: 'reduce' });
  for (const width of [390, 1440]) {
    await page.setViewportSize({ width, height: 1000 });
    for (const [title, id] of examples) {
      await page.goto('/');
      const link = page.getByRole('link', { name: `Explore ${title} production example`, exact: true });
      await link.focus();
      await link.press('Enter');
      await expect(page).toHaveURL(new RegExp(`/work.html#${id}$`));
      const example = page.locator(`#${id}`);
      await expect(example).toBeFocused();
      await expect(example.getByRole('heading', { name: title, exact: true })).toBeVisible();
      const headerHeight = (await page.locator('.site-header').boundingBox())!.height;
      await expect.poll(async () => Math.abs((await example.boundingBox())!.y - (headerHeight + 8))).toBeLessThanOrEqual(2);
      await expect(page.getByRole('heading', { name: 'Production examples at a glance.' })).toHaveCount(1);
    }
  }
});
