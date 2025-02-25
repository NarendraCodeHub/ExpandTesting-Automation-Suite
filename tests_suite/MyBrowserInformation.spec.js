import {test, expect} from '@playwright/test';
import { closeAdvertisement } from './Advertisement';
import exp from 'constants';

test('Check My Browser Information', async({page, baseURL}) => {

    await page.goto(baseURL);
    const ShowBrowserInformationLink = await page.getByRole('link', { name: 'My Browser Information'});

    // Close the Advertisement if exist
    await page.waitForTimeout(1000);
    await closeAdvertisement(page);

    ShowBrowserInformationLink.click();

    // Close the Advertisement if exist
    await page.waitForTimeout(1000);
    await closeAdvertisement(page);

    const HideBrowserInformation = await page.getByRole('button', { name: 'Hide Browser Information' });
    const ShowBrowserInformation = await page.getByRole('button', { name: 'Show Browser Information' });

    await ShowBrowserInformation.click();
    
    const table = await page.locator('.table.table-bordered');
    await expect(table).toBeVisible();
    await expect(HideBrowserInformation).toBeVisible();

    await HideBrowserInformation.click();
    await expect(HideBrowserInformation).toBeHidden();

    await expect(ShowBrowserInformation).toBeVisible();
    await expect(table).toBeHidden();

    await ShowBrowserInformation.click();

    // Extract table data
    const tableData = await page.$$eval('.table.table-bordered tr', rows => {
        return rows.map(row => {
            const cells = Array.from(row.querySelectorAll('th, td'));
            return cells.map(cell => cell.innerText);
        });
    });

    // Print the table data
    console.table(tableData);



});