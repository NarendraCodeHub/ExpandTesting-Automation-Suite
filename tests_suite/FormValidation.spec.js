import {test, expect} from '@playwright/test';


test('Validate Form Validation', async({page, baseURL}) => {

    // BLOCK GOOGLE ADS
    await page.route('**/*google*', route => route.abort());

    await page.goto(baseURL || 'https://practice.expandtesting.com/');

    await page.getByRole('link', { name: 'Form Validation'}).click();
    await page.waitForLoadState('load');
    

    const contactName = page.locator('#validationCustom01');
    const contactNumber = page.locator('[id = "validationCustom05"][type = "tel"]');
    const pickUpDate = page.locator('[id ="validationCustom05"][type="date"]');
    const paymentMethod = page.locator('#validationCustom04');
    const register = page.getByRole('button', { name: 'Register' });

    // Validate Contact Name Field
    await register.dispatchEvent('click');
    await expect(page.locator('#validationCustom01 ~ .valid-feedback')).toBeVisible();


    await contactName.clear();
    await register.dispatchEvent('click');
    await expect(page.locator('.valid-feedback')).toBeHidden();
    await expect(page.getByText('Please enter your Contact name.')).toBeVisible();
});