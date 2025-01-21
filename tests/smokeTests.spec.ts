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
    test('verify homepage displays the correct title', async ({ homePage }) => {
        await homePage.navigate();
        await homePage.page.waitForLoadState('networkidle'); // Ensures all network requests are completed
        const title = await homePage.getTitle();
        expect(title).toBe(homepageData.homepageTitle);
    });

    test('verify header elements on the homepage', async ({ homePage }) => {
        await homePage.navigate();
        await homePage.page.waitForLoadState('networkidle'); // Ensures all network requests are completed
        await homePage.verifyHeaderElements();
    });

    // test('verify search bar on the homepage', async ({ homePage }) => {
    //     await homePage.navigate();
    //     await homePage.page.waitForLoadState('networkidle'); // Ensures all network requests are completed
    //     await homePage.verifySearchBar();
    // });



});

// test.describe('Smoke Test - Product Detail Page', () => {
//     test('verify product detail page displays the correct title', async ({ homePage }) => {
//         await homePage.navigate();
//         await homePage.page.waitForLoadState('networkidle'); // Ensures all network requests are completed
//         await homePage.navigateToProductDetailPage();
//         const title = await homePage.getTitle();
//         expect(title).toBe(homepageData.productDetailPageTitle);
//     });

//     test('verify product detail page displays the correct product title', async ({ homePage }) => {
//         await homePage.navigate();
//         await homePage.page.waitForLoadState('networkidle'); // Ensures all network requests are completed
//         await homePage.navigateToProductDetailPage();
//         const productTitle = await homePage.getProductTitle();
//         expect(productTitle).toBe(homepageData.productTitle);
//     });
// });