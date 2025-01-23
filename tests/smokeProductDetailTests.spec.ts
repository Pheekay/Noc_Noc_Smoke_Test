import { test as base, expect } from '@playwright/test';
import { HomePage } from '../pages/homepage';
import { productData } from '../src/testData/productSearchData';
import { ProductDetailPage } from '../pages/productPage'; // Correct import

const test = base.extend({
    homePage: async ({ page }, use) => {
        const homePage = new HomePage(page);
        await homePage.navigate();
        await use(homePage);
    }
});

test.describe('Product Search Functionality', () => {
    let productPage: ProductDetailPage;

    test.beforeEach(async ({ homePage }) => {
        await homePage.navigate();
        await homePage.page.waitForLoadState('networkidle');
        productPage = new ProductDetailPage(homePage.page);
    });

    test('should verify search results display', async ({ homePage }) => {
        // When: Search for product
        await productPage.searchProduct(productData.name);
        
        // Then: Verify search results layout
        await expect(homePage.page.getByText('ผลการค้นหา')).toBeVisible();
        
        // And: Verify product card information
        await productPage.verifySearchResults();
    });

    // test('should navigate to product detail page', async ({ homePage }) => {
    //     // When: Search and click product
    //     await productPage.searchProduct(productData.name);
    //     await productPage.clickProductInSearch();
        
    //     // Then: Verify product details page
    //     await productPage.verifyProductDetails({
    //         name: productData.name,
    //         sku: productData.sku,
    //         price: productData.price,
    //         specs: productData.specs
    //     });
    // });
});