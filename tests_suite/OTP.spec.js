import { test, expect } from "@playwright/test";

test('Test OTP: One Time Password', async ({ page, baseURL }) => {

    // Block Advertisement popups and trackers
    await page.route('**/*google*', route => route.abort());

    // Navigation
    await page.goto(baseURL || '/');

    // Page Actions 
    await page.getByRole('link', { name: 'OTP: One Time Password', exact: true }).click();

    // Data Extraction
    const emailText = await page.locator('ul >> li:has-text("Email Address:") >> b').innerText();
    const otpText = await page.locator('ul >> li:has-text("OTP Code:") >> b').innerText();

    const credentials = {
        email: emailText.trim(),
        otp: otpText.trim()
    };

    console.log('Stored Credentials:', credentials);

    // Enter email and send OTP
    // Note: If the input has a container ID, we can target it directly
    await page.locator('input[name="email"]').fill(credentials.email);
    await page.locator('#btn-send-otp').click();

    // Validate the validation text message element directly using the locator
    const confirmationLocator = page.locator('#otp-message');
    await expect(confirmationLocator).toContainText(new RegExp(`We've sent an OTP code to your email:\\s*${credentials.email}`, 'i'));

    // Print text to console if still needed
    const OTP_Message = await confirmationLocator.textContent();
    console.log(`OTP Message : ${OTP_Message}`);

    // Enter OTP and verify
    await page.getByPlaceholder('Enter OTP code').fill(credentials.otp);
    await page.locator('#btn-send-verify').click(); 

    // Verify successful login dashboard state
    await expect(page.locator('#username')).toHaveText('Hi, Guest!');

    // Logout and verify redirect
    await page.getByRole('link', { name: 'Logout', exact: false }).click();

    // Verify header title on the main login landing page
    await expect(page.locator('h1')).toHaveText('Test Login page for Automation Testing Practice');
});
