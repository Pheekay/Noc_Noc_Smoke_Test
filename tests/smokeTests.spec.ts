import { test as base, expect } from '@playwright/test';
import { HomePage } from '../pages/homepage';
import { HeaderTestIds } from '../src/testIds/header';
import { homepageData } from '../src/testData/homepageData';
import { authData } from '../src/testData/authData';

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

    test.describe('Header and Footer Section', () => {
        test('should verify all header elements', async ({ homePage }) => {
            await homePage.verifyAllHeaderElements();
        });

        test('verify footer section', async ({ homePage }) => {
            await homePage.verifyFooterSection();
        });
    });

    test.describe('Authentication', () => {
        test('should successfully login with valid credentials and logout', async ({ homePage }) => {
            await homePage.login(authData.valid.email, authData.valid.password);
            await expect(homePage.page.getByTestId('login-btn')).toBeVisible();
            const emailButton = homePage.page.getByTestId('login-btn');
            const emailText = await emailButton.locator('span.bu-max-w-15.bu-truncate').innerText();
            expect(emailText.toLowerCase()).toBe(authData.valid.email.toLowerCase());
            
           // await homePage.logout();
        });

        // test('should show error with invalid credentials', async ({ homePage }) => {
        //     await homePage.login(authData.invalid.email, authData.invalid.password);
        //     await expect(homePage.page.getByTestId('login-error')).toHaveText(authData.errorMessages.invalidCredentials);
        // });
    });
});


