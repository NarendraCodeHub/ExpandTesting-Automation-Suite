import {test, expect} from '@playwright/test';

test('Test Radio Buttons', async({page, baseURL})=>{
    await page.goto(baseURL);
    await page.getByRole('link', { name: 'Radio Buttons' }).click();
    
    // Close advertisement if present
    const adFrame = await page.frame({ name: 'aswift_9' });
    if (adFrame) {
        const closeAdButton = adFrame.getByRole('button', { name: 'Close ad' });
        if (await closeAdButton.isVisible()) {
            await closeAdButton.click();
        }
    }

    // Select your favorite color:

    const Blue = 'input#blue';
    const Red = 'input#red';
    const Yellow = 'input#yellow';
    const Black = 'input#black';
    const Green = 'input#green';

    await expect(page.locator(Blue)).toBeChecked();

    await page.locator(Red).check();
    await expect(page.locator(Red)).toBeChecked();

    await page.locator(Yellow).check();
    await expect(page.locator(Yellow)).toBeChecked();

    await page.locator(Black).check();
    await expect(page.locator(Black)).toBeChecked();

    await expect(page.locator(Green)).toBeDisabled();

   // Select your favorite sport:

    const Basketball = 'input#basketball';
    const Football = 'input#football';
    const Tennis = 'input#tennis';

    await expect(page.locator(Tennis)).toBeChecked();

    await page.locator(Football).check();
    await expect(page.locator(Football)).toBeChecked();

    await page.locator(Basketball).check();
    await expect(page.locator(Basketball)).toBeChecked();

});