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
            // Increase timeout to 60s
            testInfo.setTimeout(60000);
            
            // Add explicit waits for page load
            await Promise.all([
                homePage.navigate(),
                homePage.page.waitForLoadState('networkidle'),
                homePage.page.waitForLoadState('domcontentloaded')
            ]);
        });

        test('should successfully login with valid credentials', async ({ homePage }) => {
            // Login with valid credentials
            await homePage.login(authData.valid.email, authData.valid.password);
            
            // Verify login success
            const profileButton = homePage.page.getByTestId('login-btn');
            await expect(profileButton.locator('span.bu-max-w-15.bu-truncate'))
                .toHaveText(authData.valid.email, { ignoreCase: true });
        });

        test('should show error with invalid credentials', async ({ homePage }) => {
            // Attempt login with invalid credentials
            await homePage.login(authData.valid.email, authData.invalid.password);
            
            // Verify error message appearance and content
            const errorMessage = homePage.page.locator('div.is-invalid.invalid-feedback');
            await expect(errorMessage).toBeVisible();
            await expect(errorMessage).toHaveText(authData.errorMessages.invalidCredentials);
        });

        test('should redirect to register page for non-existing email', async ({ homePage }) => {
            // Attempt login with non-existing email
            await homePage.login(authData.nonExisting.email, '');
            
            // Verify register page content
            await homePage.verifyRegisterPage(authData.nonExisting.email);
        });

        

        test.afterEach(async ({ homePage }, testInfo) => {
            // Increase timeout for cleanup
            testInfo.setTimeout(60000);
            
            try {
                const profileButton = homePage.page.getByTestId('login-btn');
                // Add explicit wait for profile button
                await profileButton.waitFor({ state: 'visible', timeout: 10000 });
                
                const emailText = await profileButton
                    .locator('span.bu-max-w-15.bu-truncate')
                    .textContent();
                
                if (emailText && emailText !== 'เข้าสู่ระบบ') {
                    await homePage.logout();
                    // Add explicit wait for logout completion
                    await expect(profileButton.locator('span'))
                        .toHaveText('เข้าสู่ระบบ', { timeout: 10000 });
                }
            } catch (error) {
                console.log('Cleanup error:', error.message);
            }
        });
    });

});


