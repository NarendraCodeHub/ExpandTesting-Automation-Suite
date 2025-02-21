import {test, expect} from '@playwright/test';
import { closeAdvertisement } from './Advertisement';


test('Test Drag and Drop Circles', async({page, baseURL}) => {
    
    await page.goto(baseURL);
    await page.getByRole('link', {name: 'Drag and Drop Circles'}).click();

    // Close advertisement if present
    await closeAdvertisement(page);

    const sourceRed = page.locator('.red');
    const sourceGreen = page.locator('.green');
    const sourceBlue = page.locator('.blue');
    const target = page.locator('#target');

    // Ensure elements are visible
    await expect(sourceRed).toBeVisible();
    await expect(sourceBlue).toBeVisible();
    await expect(sourceGreen).toBeVisible();
    await expect(target).toBeVisible();

    // Perform Cricle to Target Box 
    await sourceRed.dragTo(target);
    await sourceBlue.dragTo(target);
    await sourceGreen.dragTo(target);
});