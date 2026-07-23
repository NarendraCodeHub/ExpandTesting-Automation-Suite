import { test, expect } from "@playwright/test";

test('Test and Validate Notification Message page', async ({ page, baseURL }) => {

    await page.route('**/*google*', route => route.abort());

    await page.goto(baseURL);

    await page.getByRole('link', { name: 'Notification Message' }).click();

    await expect(page.locator('h1')).toHaveText('Notification Message page for Automation Testing Practice');

    const notificationMessage = page.locator('#flash');

    await page.getByRole('link', { name: 'Click here' }).click();

    const message = await notificationMessage.textContent();

    const cleanMessage = message ? message.trim() : '';

    if (cleanMessage.includes("Action successful")) {
        console.log("Success: Action was successful.");
    } else if (cleanMessage.includes("Action unsuccessful, please try again")) {
        console.log("Retrying click due to unsuccessful action...");
        await page.getByRole('link', { name: 'Click here' }).click();
    } else {
        console.log("Didn't get any matched message !!! Actual message: ", cleanMessage);
    }
});
