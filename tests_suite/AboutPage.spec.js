import {test, expect} from '@playwright/test';
import { closeAdvertisement } from './Advertisement';

test('Test About Page', async({page,baseURL}) => {

   await page.goto(baseURL);

   await page.getByRole('link', { name :'About Page'}).click();

   await closeAdvertisement(page);

   const expectedHeading = 'About This Website for Automation Testing Practice';

   await expect(page.getByRole('heading', { name: expectedHeading })).toBeVisible();

});