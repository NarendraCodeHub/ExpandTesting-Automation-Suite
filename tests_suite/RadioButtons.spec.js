import { test, expect } from '@playwright/test';

test('Test Radio Buttons', async ({ page, baseURL }) => {
    await page.goto(baseURL);
    await page.getByRole('link', { name: 'Radio Buttons' }).click();

    // Close advertisement if present
    await closeAdvertisement(page);

    // Favorite Color Radio Buttons
    const blueRadio = page.locator('input#blue');
    const redRadio = page.locator('input#red');
    const yellowRadio = page.locator('input#yellow');
    const blackRadio = page.locator('input#black');
    const greenRadio = page.locator('input#green');

    // Verify default selection is Blue
    await expect(blueRadio).toBeChecked();

    await redRadio.check();
    await expect(redRadio).toBeChecked();

    await yellowRadio.check();
    await expect(yellowRadio).toBeChecked();

    await blackRadio.check();
    await expect(blackRadio).toBeChecked();

    // Verify that the Green option is disabled
    await expect(greenRadio).toBeDisabled();

    // Favorite Sport Radio Buttons
    const basketballRadio = page.locator('input#basketball');
    const footballRadio = page.locator('input#football');
    const tennisRadio = page.locator('input#tennis');

    // Verify default selection is Tennis
    await expect(tennisRadio).toBeChecked();

    await footballRadio.check();
    await expect(footballRadio).toBeChecked();

    await basketballRadio.check();
    await expect(basketballRadio).toBeChecked();
});
