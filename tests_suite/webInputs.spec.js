import { test, expect } from '@playwright/test';

const num = '100';
const text = 'hello';
const pass = 'P@ssword';

// Format date as YYYY-MM-DD
const currentDate = new Date();
const formattedDate = currentDate.getFullYear() + '-' +
    String(currentDate.getMonth() + 1).padStart(2, '0') + '-' +
    String(currentDate.getDate()).padStart(2, '0');

test('Test Web Inputs', async ({ page, baseURL }) => {
    await page.goto(baseURL);
    await page.getByText('Web inputs').click();
    
    await closeAdvertisement(page);
    
    await page.locator('button#btn-clear-inputs').click();

    // Enter Values 
    await page.locator('input#input-number').fill(num);
    await page.locator('input#input-text').fill(text);
    await page.locator('input#input-password').fill(pass);
    await page.locator('#input-date').fill(formattedDate);
    await page.locator('button#btn-display-inputs').click();

    // Validate Entered Values 
    await expect(page.locator('#output-number')).toContainText(num);
    await expect(page.locator('#output-text')).toContainText(text);
    await expect(page.locator('#output-password')).toContainText(pass);
    await expect(page.locator('#output-date')).toContainText(formattedDate);
});
