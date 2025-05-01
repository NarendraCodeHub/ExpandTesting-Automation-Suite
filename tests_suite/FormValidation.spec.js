import {test, expect} from '@playwright/test';
import { closeAdvertisement, tyies } from './Advertisement';


test('Validate Form Validation', async({page, baseURL}) => {

    await page.goto(baseURL);

    // Close Advertisement if avaliable
    //await closeAdvertisement(page);

    await page.getByRole('link', { name: 'Form Validation'}).click();

    // Close Advertisement if avaliable
    await page.waitForLoadState('load');
    //await closeAdvertisement(page);
    await tyies(page);

    const contactName = page.locator('input#validationCustom01');
    const contactNumber = page.locator('[id = "validationCustom05"][type = "tel"]');
    const pickUpDate = page.locator('[id ="validationCustom05"][type="date"]');
    const paymentMethod = page.locator('#validationCustom04');
    const register = page.getByRole('button', { name: 'Register' });

    // Validate Contact Name Field
    await register.click();
    await expect(page.locator('.valid-feedback')).toBeVisible();

    await contactName.clear();
    await register.click();
    await expect(page.locator('.valid-feedback')).toBeHidden();
    await expect(page.getByText('Please enter your Contact name.')).toBeVisible();
});