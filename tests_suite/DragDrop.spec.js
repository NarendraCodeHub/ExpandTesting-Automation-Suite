import { test } from '@playwright/test';
import { closeAdvertisement } from './Advertisement';

test('Test Drag and Drop', async ({ page, baseURL }) => {
    await page.goto(baseURL);
    // await page.getByRole('link', { name: 'Drag and Drop' }).click();

    await page.getByRole('link', { name: 'Drag and Drop', exact: true }).click();
    
    await closeAdvertisement(page);
    
    const source = page.locator('#column-a');
    const target = page.locator('#column-b');

    // Perform drag and drop 
    await source.dragTo(target);

});
