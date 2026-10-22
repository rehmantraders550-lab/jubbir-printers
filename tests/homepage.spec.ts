import { expect, test } from '@playwright/test';

test('cinematic hero overlays readable text on the original machine poster at five widths', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });

  for (const width of [320, 390, 768, 1024, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto('/');

    const metrics = await page.evaluate(() => {
      const rect = (selector: string) => document.querySelector(selector)!.getBoundingClientRect().toJSON();
      const brand = rect('.site-header .brand');
      const cta = rect('.site-header .header-cta');
      const nav = document.querySelector('.site-header .desktop-nav')!;
      const hero = rect('.hero--cinematic .hero-grid');
      const copy = rect('.hero--cinematic .hero-copy');
      const visual = rect('.hero--cinematic .hero-visual');
      const heading = document.querySelector('.hero--cinematic h1')!;
      const spans = Array.from(heading.querySelectorAll('.hero-title-line')).map(el => el.getBoundingClientRect().toJSON());
      const poster = document.querySelector('.hero-media-poster') as HTMLImageElement;
      const video = document.querySelector('.hero-motion-video');
      return {
        screenWidth: document.documentElement.clientWidth,
        scrollWidth: document.documentElement.scrollWidth,
        header: rect('.site-header'),
        brand,
        cta,
        hero,
        copy,
        visual,
        spans,
        navDisplay: getComputedStyle(nav).display,
        navBox: nav.getBoundingClientRect().toJSON(),
        imageLoaded: poster.complete && poster.naturalWidth > 0,
        videoCount: document.querySelectorAll('.hero-motion-video').length,
        photoPosition: getComputedStyle(document.querySelector('.hero--cinematic .hero-visual')!).position,
        scrimBackground: getComputedStyle(document.querySelector('.hero--cinematic .hero-scrim')!).backgroundImage,
        heroFontSize: parseFloat(getComputedStyle(heading).fontSize),
        headlineColor: getComputedStyle(heading).color,
        deskCount: document.querySelectorAll('.hero-desk-strip .desk-register li').length,
        deskTop: rect('.hero-desk-strip').top,
        videoVisible: video ? getComputedStyle(video).display !== 'none' : false,
      };
    });

    expect(metrics.scrollWidth).toBeLessThanOrEqual(metrics.screenWidth);
    expect(metrics.cta.height).toBeGreaterThanOrEqual(44);
    expect(metrics.imageLoaded).toBe(true);
    expect(metrics.heroFontSize).toBeGreaterThanOrEqual(42);
    expect(metrics.headlineColor).toBe('rgb(255, 255, 255)');
    expect(metrics.photoPosition).toBe('absolute');
    expect(metrics.scrimBackground).toContain('gradient');
    expect(metrics.videoVisible).toBe(false);
    expect(metrics.deskCount).toBe(5);
    expect(Math.abs(metrics.hero.x)).toBeLessThanOrEqual(1);
    expect(Math.abs(metrics.visual.x)).toBeLessThanOrEqual(1);
    expect(Math.abs(metrics.visual.right - width)).toBeLessThanOrEqual(2);
    expect(Math.abs(metrics.visual.y - metrics.hero.y)).toBeLessThanOrEqual(2);
    expect(metrics.visual.bottom).toBeGreaterThanOrEqual(metrics.copy.bottom - 1);
    expect(metrics.copy.y).toBeGreaterThanOrEqual(metrics.hero.y - 1);
    expect(metrics.deskTop).toBeGreaterThanOrEqual(metrics.hero.bottom - 1);

    for (const span of metrics.spans) {
      expect(span.left).toBeGreaterThanOrEqual(-1);
      expect(span.right).toBeLessThanOrEqual(width + 1);
    }

    if (width <= 860) {
      expect(metrics.navDisplay).toBe('none');
      expect(metrics.brand.right).toBeLessThan(metrics.cta.left);
      if (width <= 440) {
        expect(Math.abs((metrics.brand.top + metrics.brand.bottom) / 2 - (metrics.cta.top + metrics.cta.bottom) / 2)).toBeLessThanOrEqual(7);
        expect(metrics.header.height).toBeLessThan(105);
      }
    } else {
      expect(metrics.navDisplay).not.toBe('none');
      expect(metrics.navBox.left).toBeGreaterThanOrEqual(metrics.brand.right - 1);
      expect(metrics.cta.left).toBeGreaterThanOrEqual(metrics.navBox.right - 1);
    }
  }
});

test('hero video fallback retains accessible headline and both calls to action', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');
  await expect(page.getByRole('heading', { level: 1, name: 'Printing made straightforward.' })).toBeVisible();
  await expect(page.locator('.hero-lead')).toContainText('Send your specification, quantity and artwork.');
  await expect(page.locator('.hero-motion-video')).toHaveCount(0);
  await expect(page.locator('.hero-media-poster')).toBeVisible();
  await page.locator('.hero-actions').getByRole('button', { name: /Start a Job/ }).click();
  await expect(page.getByRole('dialog')).toBeVisible();
});

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


test('service navigation swaps desktop photographs and keeps inline mobile images', async ({ page }) => {
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
    await expect(tabs).toHaveCount(4);

    const desktopImage = page.locator('#service-panel .service-panel__visual img');
    const inlineImages = page.locator('#services .service-route__mobile-media img');
    await expect(inlineImages).toHaveCount(4);

    if (width >= 861) {
      await expect(page.locator('#service-panel')).toBeVisible();
      await expect(desktopImage).toHaveAttribute('alt', expectedAlt[0]);
    } else {
      await expect(page.locator('#service-panel')).toBeHidden();
      await expect(inlineImages.first()).toBeVisible();
    }

    await tabs.first().focus();
    await tabs.first().press('ArrowRight');
    await expect(tabs.nth(1)).toHaveAttribute('aria-selected', 'true');

    for (const index of [1, 2, 3]) {
      await tabs.nth(index).click();
      await expect(tabs.nth(index)).toHaveAttribute('aria-selected', 'true');
      await expect(page.locator('#services .service-route').nth(index).locator('h3')).toBeVisible();

      if (width >= 861) {
        await expect(desktopImage).toHaveAttribute('alt', expectedAlt[index]);
        await expect.poll(() => desktopImage.evaluate((img: HTMLImageElement) => img.naturalWidth)).toBeGreaterThan(0);
      } else {
        await expect(inlineImages.nth(index)).toHaveAttribute('alt', expectedAlt[index]);
        await expect(inlineImages.nth(index)).toBeVisible();
        await expect.poll(() => inlineImages.nth(index).evaluate((img: HTMLImageElement) => img.naturalWidth)).toBeGreaterThan(0);
      }
    }
  }
});
test('route descriptions scroll naturally while desktop image alone stays sticky', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  for (const width of [390, 768, 1024, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto('/');
    await page.locator('#services').scrollIntoViewIfNeeded();

    const layout = await page.evaluate(() => {
      const section = document.querySelector('#services')!;
      const routes = Array.from(section.querySelectorAll('.service-route'));
      const detail = document.querySelector('.service-panel')!;
      const left = document.querySelector('.service-intro')!;
      return {
        count: routes.length,
        routeHeights: routes.map((el) => el.getBoundingClientRect().height),
        panelDisplay: getComputedStyle(detail).display,
        panelPosition: getComputedStyle(detail).position,
        panelTop: detail.getBoundingClientRect().top,
        headerBottom: document.querySelector('.site-header')!.getBoundingClientRect().bottom,
        panelWidth: detail.getBoundingClientRect().width,
        leftWidth: left.getBoundingClientRect().width,
        imageCount: section.querySelectorAll('.service-route__mobile-media img').length,
        horizontalOverflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
      };
    });

    expect(layout.count).toBe(4);
    expect(layout.imageCount).toBe(4);
    expect(layout.horizontalOverflow).toBeLessThanOrEqual(1);

    for (const route of await page.locator('#services .service-route').all()) {
      await expect(route.locator('h3')).toHaveCount(1);
      await expect(route.locator('.service-description')).toHaveCount(1);
      await expect(route.locator('.service-route__jobs li')).toHaveCount(6);
      await expect(route.locator('.service-route__focus strong')).toHaveCount(1);
      await expect(route.locator('.service-route__action')).toHaveCount(1);
    }

    if (width >= 861) {
      expect(layout.panelDisplay).not.toBe('none');
      expect(layout.panelPosition).toBe('sticky');
      expect(layout.panelWidth).toBeGreaterThan(layout.leftWidth);
      expect(layout.panelTop).toBeGreaterThanOrEqual(layout.headerBottom + 8);
      for (const height of layout.routeHeights) {
        expect(height).toBeGreaterThan(250);
        expect(height).toBeLessThan(680);
      }
    } else {
      expect(layout.panelDisplay).toBe('none');
      await expect(page.locator('.service-route__mobile-media').first()).toBeVisible();
    }
  }
});
test('route text has readable contrast on paper; production photograph is uninterrupted', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  for (const width of [390, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto('/');
    const routes = page.locator('#services .service-route');
    await expect(routes).toHaveCount(4);

    for (const route of await routes.all()) {
      await expect(route.locator('h3')).toHaveCSS('color', 'rgb(23, 23, 23)');
      await expect(route.locator('.service-description')).toHaveCSS('color', 'rgb(97, 92, 84)');
      await expect(route.locator('.service-route__content .eyebrow')).toHaveCSS('color', 'rgb(163, 66, 19)');
    }

    const stage = page.locator('#service-panel');
    await expect(stage).toHaveCSS('background-color', 'rgba(0, 0, 0, 0)');
    await expect(stage.locator('.service-panel__content')).toHaveCount(0);
    const scrim = await stage.locator('.service-panel__visual').evaluate(el => getComputedStyle(el, '::after').display);
    expect(scrim).toBe('none');
    if (width >= 861) await expect(stage).toBeVisible();
    else await expect(stage).toBeHidden();
  }
});
test('sticky header remains opaque above the desktop production photograph', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });

  for (const width of [390, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto('/');
    await page.locator('#services').scrollIntoViewIfNeeded();
    await page.evaluate(() => {
      const route = document.querySelector('#services .service-route')!;
      window.scrollTo({ top: window.scrollY + route.getBoundingClientRect().top + 160, behavior: 'instant' });
    });

    const result = await page.evaluate(() => {
      const header = document.querySelector('.site-header')!;
      const panel = document.querySelector('.service-panel')!;
      const headerBox = header.getBoundingClientRect();
      const panelBox = panel.getBoundingClientRect();
      const headerStyle = getComputedStyle(header);
      const topElement = document.elementFromPoint(headerBox.left + headerBox.width / 2, headerBox.top + 8);
      return {
        scrollY: window.scrollY,
        headerTop: headerBox.top,
        headerBottom: headerBox.bottom,
        panelTop: panelBox.top,
        panelPosition: getComputedStyle(panel).position,
        panelDisplay: getComputedStyle(panel).display,
        headerPosition: headerStyle.position,
        headerBackground: headerStyle.backgroundColor,
        headerIsolation: headerStyle.isolation,
        headerAtTop: Boolean(topElement?.closest('.site-header')),
      };
    });

    expect(result.scrollY).toBeGreaterThan(0);
    expect(result.headerPosition).toBe('sticky');
    expect(Math.abs(result.headerTop)).toBeLessThanOrEqual(1);
    expect(result.headerBackground).toBe('rgb(243, 239, 231)');
    expect(result.headerIsolation).toBe('isolate');
    expect(result.headerAtTop).toBe(true);

    if (width >= 861) {
      expect(result.panelDisplay).not.toBe('none');
      expect(result.panelPosition).toBe('sticky');
      expect(result.panelTop).toBeGreaterThanOrEqual(result.headerBottom + 8);
    } else {
      expect(result.panelDisplay).toBe('none');
    }
  }

  await page.goto('/work.html');
  await page.evaluate(() => window.scrollTo({ top: document.body.scrollHeight, behavior: 'instant' }));
  const interiorHeader = page.locator('.site-header');
  await expect.poll(() => interiorHeader.evaluate(element => element.getBoundingClientRect().top)).toBe(0);
  await expect(interiorHeader).toHaveCSS('background-color', 'rgb(243, 239, 231)');
});
test('scrolling between editorial routes updates the pinned image', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('/');
  await page.locator('#services').scrollIntoViewIfNeeded();

  const routes = page.locator('#services .service-route');
  const tabs = page.getByRole('tab');
  const image = page.locator('#service-panel .service-panel__visual img');
  for (const index of [1, 2, 3]) {
    await routes.nth(index).evaluate((element) => {
      const bounds = element.getBoundingClientRect();
      window.scrollTo({
        top: window.scrollY + bounds.top - window.innerHeight * 0.32,
        behavior: 'instant',
      });
    });
    await expect(tabs.nth(index)).toHaveAttribute('aria-selected', 'true');
    await expect(image).toHaveAttribute('alt', [
      'Illustrative commercial brochure and print production example',
      'Illustrative printed retail carton example',
      'Illustrative DTF transfer production example',
      'Illustrative custom production example',
    ][index]);
  }
  const headerBox = await page.locator('.site-header').boundingBox();
  const panelBox = await page.locator('#service-panel').boundingBox();
  expect(headerBox).not.toBeNull();
  expect(panelBox).not.toBeNull();
  expect(panelBox!.y).toBeGreaterThanOrEqual(headerBox!.y + headerBox!.height - 2);
});
