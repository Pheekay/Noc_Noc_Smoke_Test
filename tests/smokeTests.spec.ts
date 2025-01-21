import { test as base, expect } from '@playwright/test';
import { HomePage } from '../pages/homepage';
import { HeaderTestIds } from '../src/testIds/header';
import { homepageData } from '../src/testData/homepageData';

// Extend test with HomePage fixture
const test = base.extend({
    homePage: async ({ page }, use) => {
        const homePage = new HomePage(page);
        await homePage.navigate();
        await use(homePage);
    }
});

test.describe('Smoke Test - Homepage', () => {
    test.beforeEach(async ({ homePage }) => {
        await homePage.navigate();
        await homePage.page.waitForLoadState('networkidle');
    });

    test.describe('Page Title', () => {
        test('should display correct title', async ({ homePage }) => {
            const title = await homePage.getTitle();
            expect(title).toBe(homepageData.homepageTitle);
        });
    });

    test.describe('Header Section', () => {
        test('should verify all header elements', async ({ homePage }) => {
            // Verify top header section
            await homePage.verifyTopHeaderSection();
            // Verify navigation elements
            await homePage.verifyNavigationElements();

            // Verify search functionality
            await homePage.verifySearchBar();
            
            // Verify user actions
            await homePage.verifyUserActionButtons();



        });
    });
});


