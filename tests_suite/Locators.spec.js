import { test, expect } from "@playwright/test";

test('Test Locators Page', async ({ page, baseURL }) => {
    //  Block Advertisement popups and trackers
    await page.route('**/*google*', route => route.abort());

    //  Navigation
    await page.goto(baseURL || '/');

    // Page Actions 
    await page.getByRole('link', { name: 'Locators Page', exact: true }).click();

    // Locators -- getByRole
    await expect(page.getByRole('button', { name: 'Add Item' })).toBeEnabled();
    await expect(page.getByRole('link', { name: 'Contact' })).toBeEnabled();

    // Locators -- getByText
    const alertText = await page.getByText('🔥 Hot Deal: Buy 1 Get 1 Free', { exact: true }).textContent();
    console.log(`Alert Text: ${alertText}`);

    // Locators -- getByLabel
    const dropdown = page.getByLabel('Choose a country');

    await dropdown.selectOption('France');
    await expect(dropdown).toHaveValue('France');

    await dropdown.selectOption('Japan');
    await expect(dropdown).toHaveValue('Japan');

    await dropdown.selectOption('Brazil');
    await expect(dropdown).toHaveValue('Brazil');

    // Locators -- getByLabel
    const emailInput = page.getByLabel('Email for newsletter');
    await emailInput.fill('abc@gmail.com');
    await expect(emailInput).toHaveValue('abc@gmail.com');

    // Locators -- getByPlaceholder
    const searchInput = page.getByPlaceholder('Search the site');
    await searchInput.fill('Playwright');
    await expect(searchInput).toHaveValue('Playwright');

    const filterInput = page.getByPlaceholder('Filter by tag');
    await filterInput.fill('Tag');
    await expect(filterInput).toHaveValue('Tag');

    // Locators --getByAltText
    await page.getByAltText('User avatar').click();

    // Locators -- getByTitle
    await page.getByTitle('Refresh content').click();
    await page.getByTitle('Settings panel').click();

    // Locators -- getByTestId
    const statusText = await page.getByTestId('status-message').getAttribute('class');
    console.log(`Status Message Class: ${statusText}`);

    const userNameText = await page.getByTestId('user-name').innerText();
    console.log(`User Name: ${userNameText}`);

    // Correct way: use page.locator() with a standard CSS class selector
    const legacyCSSText = await page.locator('span.legacy-css.text-primary').textContent();
    console.log(`Text Message: ${legacyCSSText}`);


    //  XPath Practice: List
    const list = page.locator('ul.legacy-list > li');

    const firstText = await list.first().textContent();
    const secondText = await list.nth(1).textContent(); 
    const lastText = await list.last().textContent();

    console.log(`Text Messages -> First: ${firstText}, Second: ${secondText}, Last: ${lastText}`);

    // 📊 XPath Practice: Table
    //  Locate all rows inside the tbody
    const rows = page.locator('table.legacy-table tbody tr');

    const tableData = await rows.evaluateAll(rowElements =>
        rowElements.map(row => {
            const cells = Array.from(row.querySelectorAll('td'));
            return cells.map(cell => cell.textContent?.trim() || '');
        })
    );

    expect(tableData).toEqual([
        ['Headphones', 'Available', '12'],
        ['Monitor', 'Out of stock', '0'],
        ['Keyboard', 'Available', '5']
    ]);


});
