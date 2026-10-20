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


test('service tabs update the illustrative visual stage with keyboard and touch layouts', async ({ page }) => {
  const expectedAlt = [
    'Illustrative commercial brochure and print production example',
    'Illustrative printed retail carton example',
    'Illustrative DTF transfer production example',
    'Illustrative custom production example',
  ];

  await page.emulateMedia({ reducedMotion: 'reduce' });

  for (const width of [390, 1440]) {
    await page.setViewportSize({ width, height: 1000 });
    await page.goto('/');

    const tabs = page.getByRole('tab');
    const image = page.locator('.service-panel__visual img');
    await expect(image).toHaveAttribute('alt', expectedAlt[0]);

    await tabs.nth(0).focus();
    await tabs.nth(0).press('ArrowRight');
    await expect(tabs.nth(1)).toHaveAttribute('aria-selected', 'true');
    await expect(image).toHaveAttribute('alt', expectedAlt[1]);

    for (const index of [2, 3]) {
      await tabs.nth(index).click();
      await expect(tabs.nth(index)).toHaveAttribute('aria-selected', 'true');
      await expect(image).toHaveAttribute('alt', expectedAlt[index]);
      await expect.poll(() => image.evaluate((node: HTMLImageElement) => node.naturalWidth)).toBeGreaterThan(0);
    }

    const panel = page.locator('#service-panel');
    const overflow = await panel.evaluate((node) => node.scrollWidth - node.clientWidth);
    expect(overflow).toBeLessThanOrEqual(1);
  }
});

test('sticky header remains opaque while the production route scrolls beneath it', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });

  for (const width of [390, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto('/');
    await page.locator('#services').scrollIntoViewIfNeeded();
    await page.evaluate(() => {
      const panel = document.querySelector('.service-panel')!;
      window.scrollTo({ top: window.scrollY + panel.getBoundingClientRect().top + 180, behavior: 'instant' });
    });

    const result = await page.evaluate(() => {
      const header = document.querySelector('.site-header')!;
      const panel = document.querySelector('.service-panel')!;
      const headerBox = header.getBoundingClientRect();
      const panelBox = panel.getBoundingClientRect();
      const headerStyle = getComputedStyle(header);
      const panelStyle = getComputedStyle(panel);
      return {
        headerBottom: headerBox.bottom,
        panelTop: panelBox.top,
        headerBackground: headerStyle.backgroundColor,
        panelIsolation: panelStyle.isolation,
      };
    });

    expect(result.headerBackground).toBe('rgb(243, 239, 231)');
    expect(result.panelIsolation).toBe('isolate');
    expect(result.headerBottom).toBeGreaterThan(result.panelTop);
  }
});


test('service route runway updates the pinned panel from scroll', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('/');
  await page.locator('#services').scrollIntoViewIfNeeded();

  const tabs = page.getByRole('tab');
  const secondTab = tabs.nth(1);
  await secondTab.scrollIntoViewIfNeeded();
  await expect(secondTab).toHaveAttribute('aria-selected', 'true');
  await expect(page.locator('#service-panel')).toBeVisible();

  const headerBottom = (await page.locator('.site-header').boundingBox())!.bottom;
  const panelTop = (await page.locator('#service-panel').boundingBox())!.top;
  expect(panelTop).toBeGreaterThanOrEqual(headerBottom - 2);
});
