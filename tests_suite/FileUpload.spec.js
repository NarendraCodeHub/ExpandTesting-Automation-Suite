import { test, expect } from '@playwright/test';
import { closeAdvertisement } from './Advertisement';
import path from 'path';


test('Test and Verify File Upload without selecting a file', async ({ page, baseURL }) => {

    await page.goto(baseURL);

    await page.getByRole('link', { name: 'File Upload' }).click();

    await page.waitForLoadState('domcontentloaded');

    await closeAdvertisement(page);

    await expect(
        page.getByRole('heading', { name: 'File Uploader page for Automation Testing Practice' })
    ).toBeVisible();

    const chooseFileInput = page.locator('#fileInput');
    const uploadButton = page.locator('#fileSubmit');

    await uploadButton.click();

    const validationMessage = await chooseFileInput.evaluate(input => input.validationMessage);

    expect(validationMessage).toContain('Please select a file');

});

test('Test and Verify Valid File Upload', async ({ page, baseURL }) => {

    await page.goto(baseURL);

    await page.getByRole('link', { name: 'File Upload' }).click();

    await page.waitForLoadState('domcontentloaded');

    await closeAdvertisement(page);

    await expect(
        page.getByRole('heading', { name: 'File Uploader page for Automation Testing Practice' })
    ).toBeVisible();

    const chooseFileInput = page.locator('#fileInput');
    const uploadButton = page.locator('#fileSubmit');

    const filePath = path.resolve(__dirname, '../testData/SampleJPGImage_50kbmb.jpg');
    await chooseFileInput.setInputFiles(filePath);

    await uploadButton.click();

    await expect(page.getByRole('heading', { name: 'File Uploaded!'})).toBeVisible();

});