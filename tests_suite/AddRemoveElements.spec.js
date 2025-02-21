import { test, expect } from '@playwright/test';
import { closeAdvertisement } from './Advertisement';


test('Test and Validate Add & Remove Element', async({page, baseURL}) => {

    await page.goto(baseURL);
    await page.getByRole('link', { name: 'Add/Remove Elements'}).click();

    // Close the Advertisement if exist
    await closeAdvertisement(page);

    // Define locators
    const addElementButton = page.getByRole('button', { name: 'Add Element' });
    const deleteButton = page.getByRole('button', { name: 'Delete' });

    // Verify "Add Element" button is visible and click it
    await expect(addElementButton).toBeVisible();
    await addElementButton.click();

    // Wait for delete button to appear and verify it
    await expect(deleteButton).toBeVisible();

    // Click delete button and verify it's removed
    await deleteButton.click();
    await expect(page.locator('button', { hasText: 'Delete' })).toHaveCount(0);

});
