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

test('production routes have a compact runway and balanced responsive detail stage', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });

  for (const width of [390, 768, 1024, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto('/');
    await page.locator('#services').scrollIntoViewIfNeeded();

    const metrics = await page.evaluate(() => {
      const tab = document.querySelector('.service-tabs > button')!;
      const active = document.querySelector('.service-tabs > button.is-active')!;
      const intro = document.querySelector('.service-intro')!;
      const panel = document.querySelector('.service-panel')!;
      const visual = document.querySelector('.service-panel__visual')!;
      const content = document.querySelector('.service-panel__content')!;
      const tabBox = tab.getBoundingClientRect();
      const panelBox = panel.getBoundingClientRect();
      return {
        tabHeight: tabBox.height,
        introWidth: intro.getBoundingClientRect().width,
        panelWidth: panelBox.width,
        panelTop: panelBox.top,
        headerBottom: document.querySelector('.site-header')!.getBoundingClientRect().bottom,
        panelPosition: getComputedStyle(panel).position,
        selectedBackground: getComputedStyle(active).backgroundColor,
        visualTop: visual.getBoundingClientRect().top,
        contentTop: content.getBoundingClientRect().top,
        horizontalOverflow: panel.scrollWidth - panel.clientWidth,
      };
    });

    expect(metrics.selectedBackground).not.toBe('rgba(0, 0, 0, 0)');
    expect(metrics.horizontalOverflow).toBeLessThanOrEqual(1);

    if (width >= 821) {
      expect(metrics.tabHeight).toBeGreaterThan(300);
      expect(metrics.tabHeight).toBeLessThan(900 * 0.72);
      expect(metrics.panelWidth).toBeGreaterThan(metrics.introWidth);
      expect(metrics.panelPosition).toBe('sticky');
      expect(metrics.panelTop).toBeGreaterThanOrEqual(metrics.headerBottom + 8);
    } else {
      expect(metrics.tabHeight).toBeLessThanOrEqual(110);
      expect(metrics.panelPosition).toBe('relative');
      expect(metrics.visualTop).toBeLessThan(metrics.contentTop);
    }

    await page.getByRole('tab', { name: /DTF Transfers/ }).click();
    await expect(page.getByRole('tab', { name: /DTF Transfers/ })).toHaveAttribute('aria-selected', 'true');
    await expect(page.getByRole('heading', { name: 'Sharp, repeatable transfer production.' })).toBeVisible();
  }
});

test('production route details use warm paper with readable text on mobile and desktop', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });

  for (const width of [390, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto('/');
    await page.locator('#services').scrollIntoViewIfNeeded();

    for (const tab of await page.getByRole('tab').all()) {
      await tab.click();
      await expect(tab).toHaveAttribute('aria-selected', 'true');

      const panel = page.locator('#service-panel');
      await expect(panel).toHaveCSS('background-color', 'rgb(233, 227, 217)');
      await expect(panel).toHaveCSS('color', 'rgb(23, 23, 23)');
      await expect(panel.locator('h3')).toHaveCSS('color', 'rgb(23, 23, 23)');
      await expect(panel.locator('.service-description')).toHaveCSS('color', 'rgb(97, 92, 84)');
      await expect(panel.locator('.micro-label').first()).toHaveCSS('color', 'rgb(97, 92, 84)');
      await expect(panel.locator('.eyebrow')).toHaveCSS('color', 'rgb(163, 66, 19)');
      await expect(panel.locator('.service-details li').first()).toHaveCSS('color', 'rgb(23, 23, 23)');
    }
  }
});

test('sticky header stays solid while the production stage stays clear of it', async ({ page }) => {
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
      const topElement = document.elementFromPoint(headerBox.left + headerBox.width / 2, headerBox.top + 8);

      return {
        scrollY: window.scrollY,
        headerTop: headerBox.top,
        headerBottom: headerBox.bottom,
        panelTop: panelBox.top,
        headerPosition: headerStyle.position,
        headerBackground: headerStyle.backgroundColor,
        headerBackdrop: headerStyle.backdropFilter,
        headerIsolation: headerStyle.isolation,
        panelPosition: panelStyle.position,
        panelIsolation: panelStyle.isolation,
        headerAtTop: Boolean(topElement?.closest('.site-header')),
      };
    });

    expect(result.scrollY).toBeGreaterThan(0);
    expect(result.headerPosition).toBe('sticky');
    expect(Math.abs(result.headerTop)).toBeLessThanOrEqual(1);
    expect(result.headerBackground).toBe('rgb(243, 239, 231)');
    expect(result.headerBackdrop).toBe('none');
    expect(result.headerIsolation).toBe('isolate');
    expect(result.headerAtTop).toBe(true);
    expect(result.panelIsolation).toBe('isolate');

    if (width >= 821) {
      expect(result.panelPosition).toBe('sticky');
      expect(result.panelTop).toBeGreaterThanOrEqual(result.headerBottom + 8);
    } else {
      expect(result.panelPosition).toBe('relative');
    }
  }

  // The shared header must behave identically on interior pages.
  await page.goto('/work.html');
  await page.evaluate(() => window.scrollTo({ top: document.body.scrollHeight, behavior: 'instant' }));
  const interiorHeader = page.locator('.site-header');
  await expect.poll(() => interiorHeader.evaluate(element => element.getBoundingClientRect().top)).toBe(0);
  await expect(interiorHeader).toHaveCSS('background-color', 'rgb(243, 239, 231)');
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

  const headerBox = await page.locator('.site-header').boundingBox();
  const panelBox = await page.locator('#service-panel').boundingBox();
  expect(headerBox).not.toBeNull();
  expect(panelBox).not.toBeNull();
  const headerBottom = headerBox!.y + headerBox!.height;
  const panelTop = panelBox!.y;
  expect(panelTop).toBeGreaterThanOrEqual(headerBottom - 2);
});
