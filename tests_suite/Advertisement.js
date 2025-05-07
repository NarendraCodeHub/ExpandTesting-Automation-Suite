
/**
 * Closes the advertisement if it is present on the page.
 *
 * @param {import('@playwright/test').Page} 
 */
export async function closeAdvertisement(page) {
    try {
        // Close advertisement if present
        const adFrame = await page.frame({ name: 'aswift_8' });
        
        const adFrames = await page.frameLocator('iframe[name="aswift_8"]').frameLocator('iframe[name="ad_iframe"]');

        if (adFrame) {  
            const closeAdButton = adFrame.getByRole('button', { name: 'Close ad' });
            if (await closeAdButton.isVisible()) {
                await closeAdButton.click();
            }
        } else if (adFrames) {
            const closeAdButton = adFrames.getByRole('button', { name: 'Close ad' });
            if (await closeAdButton.isVisible()) {
                await closeAdButton.click();
            }
        }
    } catch (error) {
        console.log('Advertisement not found or already closed:', error);
    }
}

export async function tyies(page) {
    try {
        await page.locator('iframe[name="aswift_8"]').contentFrame().getByRole('button', { name: 'Close ad' }).click();
        await page.locator('iframe[name="aswift_8"]').contentFrame().locator('iframe[name="ad_iframe"]').contentFrame().getByRole('button', { name: 'Close ad' }).click();
    } catch (error) {
        console.log('Advertisement not found or already closed:', error);
    }
}
