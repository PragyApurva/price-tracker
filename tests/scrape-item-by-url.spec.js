// const { test, expect } = require('@playwright/test');
import { test, expect } from '@playwright/test';

test('scrape item by URL', async ({ page }) => {
    await page.goto('https://example.com/');
    const itemTitle = await page.textContent('.item-title-selector');
    expect(itemTitle).toBe('Expected Item Title');
});