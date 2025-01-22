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
        test.beforeEach(async ({ homePage }, testInfo) => {
            testInfo.setTimeout(60000);
            await Promise.all([
                homePage.navigate(),
                homePage.page.waitForLoadState('networkidle'),
                homePage.page.waitForLoadState('domcontentloaded')
            ]);
        });

        test.afterEach(async ({ homePage }, testInfo) => {
            testInfo.setTimeout(60000);
            try {
                const profileButton = homePage.page.getByTestId('login-btn');
                await profileButton.waitFor({ state: 'visible', timeout: 10000 });
                
                const emailText = await profileButton
                    .locator('span.bu-max-w-15.bu-truncate')
                    .textContent();
                
                if (emailText && emailText.toLowerCase() !== 'เข้าสู่ระบบ') {
                    await homePage.logout();
                    await expect(profileButton.locator('span'))
                        .toHaveText('เข้าสู่ระบบ', { timeout: 10000 });
                }
            } catch (error) {
                console.log('No cleanup needed:', error.message);
            }
        });

        test('should successfully login with valid credentials', async ({ homePage }) => {
            await homePage.login(authData.valid.email, authData.valid.password);
            
            const profileButton = homePage.page.getByTestId('login-btn');
            const emailElement = profileButton.locator('span.bu-max-w-15.bu-truncate');
            
            // Case-insensitive comparison
            const actualEmail = await emailElement.textContent();
            expect(actualEmail.toLowerCase()).toBe(authData.valid.email.toLowerCase());
        });

        // test('should show error with invalid credentials', async ({ homePage }) => {
        //     // Attempt login with invalid credentials
        //     await homePage.login(authData.invalid.email, authData.invalid.password);
            
        //     // Verify error message
        //     await expect(homePage.page.locator('.invalid-feedback'))
        //         .toHaveText(authData.errorMessages.invalidCredentials);
        // });

        test('should redirect to register page for non-existing email', async ({ homePage }) => {
            await homePage.login(authData.nonExisting.email, '');
            await homePage.verifyRegisterPage(authData.nonExisting.email);
            
        });
    });
});


