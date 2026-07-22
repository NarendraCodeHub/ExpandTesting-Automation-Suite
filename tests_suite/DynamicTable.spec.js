import { test, expect } from '@playwright/test';

test('Dynamic Table', async ({ page, baseURL }) => {

    await page.route('**/*google*', route => route.abort());

    await page.goto(baseURL);

    await page.getByRole('link', { name: 'Dynamic Table' }).click();

    await expect(page.locator('table')).toBeVisible();

    const headers = page.locator('table thead th');

    const headerTexts = await headers.allInnerTexts();

    console.log(headerTexts);

    const cpuColumnIndex = headerTexts.findIndex(h => h.trim() === 'CPU');

    expect(cpuColumnIndex).toBeGreaterThan(-1);

    const chromeRow = page.locator('tbody tr').filter({
        hasText: 'Chrome'
    });

    const cpuValue = (await chromeRow.locator('td').nth(cpuColumnIndex).textContent()).trim();

    const label = await page.locator('#chrome-cpu').textContent();

    expect(label).toContain(cpuValue);

    console.log(cpuValue);
});