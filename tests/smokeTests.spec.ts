import { test as base, expect } from '@playwright/test';
import { HomePage } from '../pages/homepage';
import homepageData from '../data/homepageData.json';

const test = base.extend({
    homePage: async ({ page }, use) => {
        const homePage = new HomePage(page);
        await homePage.navigate();
        await use(homePage);
    }
});

test.describe('Smoke Test - Homepage', () => {

    test('verify homepage URL', async ({ homePage }) => {
        await homePage.navigate();
        const url = homePage.page.url();
        expect(url).toBe('https://nocnoc.com/');
    });
    test('verify homepage displays the correct title', async ({ homePage }) => {
        await homePage.navigate(); // Navigates to the homepage
        await homePage.page.waitForLoadState('networkidle'); // Wait for network requests to finish
        const title = await homePage.getTitle(); // Retrieves the page title
        console.log('Page Title:', title); // Logs the actual title for debugging
        expect(title).toBe(homepageData.homepageTitle); // Asserts the title matches the expected value
    });
    test('debug HTML content', async ({ homePage }) => {
        await homePage.navigate();
        console.log(await homePage.page.content()); // Logs the HTML content of the page
    });
    


});
