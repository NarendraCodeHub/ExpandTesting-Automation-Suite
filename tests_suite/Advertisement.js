
/**
 * Closes the advertisement if it is present on the page.
 *
 * @param {import('@playwright/test').Page} 
 */
export async function closeAdvertisement(page) {
    // Close advertisement if present
    const adFrame = await page.frame({ name: 'aswift_9' });
    if (adFrame) {
        const closeAdButton = adFrame.getByRole('button', { name: 'Close ad' });
        if (await closeAdButton.isVisible()) {
            await closeAdButton.click();
        }
    }
}
