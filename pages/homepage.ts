import { Page, expect } from '@playwright/test';
import { HeaderTestIds, HeaderTestIdsType } from '../src/testIds/header';
import { FooterTestIds, FooterTestIdsType } from '../src/testIds/footer';
import { LoginTestIds, LoginTestIdsType } from '../src/testIds/login';
import { RegisterTestIds, RegisterTestIdsType } from '../src/testIds/register';
import { registerData } from '../src/testData/registerData';

const BASE_URL = 'https://nocnoc.com/';

export class HomePage {
    private readonly headerTestIds: HeaderTestIdsType;
    private readonly footerTestIds: FooterTestIdsType;
    private readonly loginTestIds: LoginTestIdsType;
    private readonly registerTestIds: RegisterTestIdsType;

    constructor(private page: Page) {
        this.headerTestIds = HeaderTestIds;
        this.footerTestIds = FooterTestIds;
        this.loginTestIds = LoginTestIds;
        this.registerTestIds = RegisterTestIds;
    }

    /**
     * Navigate to the homepage and handle initial setup
     */
    async navigate(): Promise<void> {
        try {
            await this.page.goto(BASE_URL);
            await this.closePopups();
            await this.page.waitForLoadState('networkidle');
        } catch (error) {
            console.error('Navigation failed:', error);
            throw error;
        }
    }

    /**
     * Close all popup windows except main page
     */
    private async closePopups(): Promise<void> {
        const popups = this.page.context().pages();
        for (const popup of popups) {
            if (popup !== this.page) {
                await popup.close();
            }
        }
    }

    /**
     * Get the page title
     */
    async getTitle(): Promise<string> {
        try {
            await this.page.waitForLoadState('domcontentloaded');
            const title = await this.page.title();
            if (!title) {
                throw new Error('Page title not found');
            }
            return title;
        } catch (error) {
            console.error('Failed to get title:', error);
            throw error;
        }
    }

    /**
     * Verify all header elements
     */
    async verifyAllHeaderElements(): Promise<void> {
        try {
            await this.verifyNavigationElements();
            await this.verifyUserActionButtons();
            await this.verifySearchBar();
            await this.verifyTopHeaderSection();
            await this.verifyFooterSection();
        } catch (error) {
            console.error('Header verification failed:', error);
            throw error;
        }
    }

    /**
     * Verify navigation elements in header
     */
    private async verifyNavigationElements(): Promise<void> {
        try {
            await expect(this.page.getByTestId(this.headerTestIds.logo)).toBeVisible();
            await expect(this.page.getByTestId(this.headerTestIds.searchButton)).toBeVisible();
        } catch (error) {
            console.error('Navigation elements verification failed:', error);
            throw error;
        }
    }

    /**
     * Verify user action buttons in header
     */
    private async verifyUserActionButtons(): Promise<void> {
        try {
            await expect(this.page.getByTestId(this.headerTestIds.cartButton)).toBeVisible();
            await expect(this.page.getByTestId(this.headerTestIds.loginButton)).toBeVisible();
            await expect(this.page.getByTestId(this.headerTestIds.languageSelector)).toBeVisible();
        } catch (error) {
            console.error('User action buttons verification failed:', error);
            throw error;
        }
    }

    /**
     * Verify search bar functionality
     */
    private async verifySearchBar(): Promise<void> {
        try {
            await expect(this.page.locator('#search-suggestion-input')).toBeVisible();
            await expect(this.page.getByTestId(this.headerTestIds.searchButton)).toBeVisible();
        } catch (error) {
            console.error('Search bar verification failed:', error);
            throw error;
        }
    }

    /**
     * Verify download section elements
     */
    private async verifyTopHeaderSection(): Promise<void> {
        try {
            await expect(this.page.getByTestId(this.headerTestIds.iosDownload)).toBeVisible();
            await expect(this.page.getByTestId(this.headerTestIds.androidDownload)).toBeVisible();
            await expect(this.page.getByTestId(this.headerTestIds.clubBenefits)).toBeVisible();
            await expect(this.page.getByTestId(this.headerTestIds.service)).toBeVisible();
            await expect(this.page.getByTestId(this.headerTestIds.seller)).toBeVisible();
            await expect(this.page.getByTestId(this.headerTestIds.business)).toBeVisible();
            await expect(this.page.getByTestId(this.headerTestIds.blog)).toBeVisible();
        } catch (error) {
            console.error('Top Header section verification failed:', error);
            throw error;
        }
    }

    private async verifyFooterSection(): Promise<void> {
        try {
            // Scroll to bottom of page
            await this.page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
            
            // // Wait for footer to be visible
            // await this.page.waitForSelector('[data-testid="footer-logo"]', { 
            //     state: 'visible',
            //     timeout: 10000 
            // });

            // Verify Logo and Social Media
            await expect(this.page.getByTestId(this.footerTestIds.footerLogo)).toBeVisible();
            await expect(this.page.getByTestId(this.footerTestIds.xLink)).toBeVisible();
            await expect(this.page.getByTestId(this.footerTestIds.youtubeLink)).toBeVisible();
            await expect(this.page.getByTestId(this.footerTestIds.faceLink)).toBeVisible();
            await expect(this.page.getByTestId(this.footerTestIds.lineLink)).toBeVisible();

            // Verify Help Section
            await expect(this.page.getByTestId(this.footerTestIds.helpTopic)).toBeVisible();
            await expect(this.page.getByTestId(this.footerTestIds.help)).toBeVisible();
            await expect(this.page.getByTestId(this.footerTestIds.howToShop)).toBeVisible();
            await expect(this.page.getByTestId(this.footerTestIds.trackOrder)).toBeVisible();
            await expect(this.page.getByTestId(this.footerTestIds.refund)).toBeVisible();
            await expect(this.page.getByTestId(this.footerTestIds.chat)).toBeVisible();

            // Verify Services and Features
            await expect(this.page.getByTestId(this.footerTestIds.serviceFeature)).toBeVisible();
            await expect(this.page.getByTestId(this.footerTestIds.hireInstaller)).toBeVisible();
            await expect(this.page.getByTestId(this.footerTestIds.nocNocClub)).toBeVisible();
            await expect(this.page.getByTestId(this.footerTestIds.affiliate)).toBeVisible();
            await expect(this.page.getByTestId(this.footerTestIds.blog)).toBeVisible();
            await expect(this.page.getByTestId(this.footerTestIds.nnBusiness)).toBeVisible();

            // Verify Contact Section
            await expect(this.page.getByTestId(this.footerTestIds.contact)).toBeVisible();
            await expect(this.page.getByTestId(this.footerTestIds.becomeInstaller)).toBeVisible();
            await expect(this.page.getByTestId(this.footerTestIds.becomeSeller)).toBeVisible();
            await expect(this.page.getByTestId(this.footerTestIds.careers)).toBeVisible();
            await expect(this.page.getByTestId(this.footerTestIds.aboutNn)).toBeVisible();

            // Verify Download App Section
            await expect(this.page.getByTestId(this.footerTestIds.iosApp)).toBeVisible();
            await expect(this.page.getByTestId(this.footerTestIds.androidApp)).toBeVisible();

            // Verify Regions
            await expect(this.page.getByTestId(this.footerTestIds.thailandWeb)).toBeVisible();
            await expect(this.page.getByTestId(this.footerTestIds.indonesiaWeb)).toBeVisible();

            // Verify Footer Info
            await expect(this.page.getByTestId(this.footerTestIds.copyright)).toBeVisible();
            await expect(this.page.getByTestId(this.footerTestIds.address)).toBeVisible();
            await expect(this.page.getByTestId(this.footerTestIds.policy)).toBeVisible();
            await expect(this.page.getByTestId(this.footerTestIds.cookie)).toBeVisible();
        } catch (error) {
            console.error('Footer section verification failed:', error);
            throw error;
        }
    }

    async verifyLoginSuccess(email: string): Promise<void> {
        try {
            // Wait for login button with email
            const loginButton = await this.page.getByTestId(this.loginTestIds.loginButton);
            await expect(loginButton).toBeVisible();

            // Verify email text
            const emailText = await loginButton.locator('span.bu-max-w-15.bu-truncate').innerText();
            expect(emailText.toLowerCase()).toBe(email.toLowerCase());
        } catch (error) {
            console.error('Login verification failed:', error);
            throw error;
        }
    }

    async login(email: string, password: string): Promise<void> {
        try {
            // Open login modal
            await this.page.getByTestId(this.loginTestIds.loginButton).click();
            
            // Wait for modal and fill email/phone
            await this.page.waitForSelector(`#${this.loginTestIds.emailPhoneInput}`);
            await this.page.locator(`#${this.loginTestIds.emailPhoneInput}`).fill(email);
            
            // Click next
            await this.page.locator('button:has-text("ต่อไป")').click();
            
            // Wait for either password input or register page
            const passwordInput = this.page.locator('input[type="password"]');
            const registerTitle = this.page.locator('h2:has-text("สร้างบัญชี NocNoc")');
            
            await Promise.race([
                passwordInput.waitFor({ state: 'visible', timeout: 6000 }),
                registerTitle.waitFor({ state: 'visible', timeout: 6000 })
            ]);
            
            // Check if redirected to register page
            if (await registerTitle.isVisible()) {
                return;
            }
            
            // Continue with password input if not empty
            if (password) {
                await passwordInput.fill(password);
                await this.page.locator('button:has-text("เข้าใช้งาน")').click();
                
                // Wait for either error message or successful login
                await this.page.waitForLoadState('networkidle');
                
                // Check for error message
                const errorMessage = this.page.locator('div.is-invalid.invalid-feedback');
                const isErrorVisible = await errorMessage.isVisible();
                
                // Only verify login success if no error message
                if (!isErrorVisible) {
                    await this.verifyLoginSuccess(email);
                }
            }
        } catch (error) {
            console.error('Login failed:', error);
            throw error;
        }
    }

    async verifyRegisterPage(email: string): Promise<void> {
        try {
            // Wait for register page container
            await this.page.waitForSelector(`.${this.registerTestIds.container}`);

            // Verify page header
            await expect(this.page.getByRole('heading', { name: registerData.title })).toBeVisible();
            await expect(this.page.getByRole('heading', { name: registerData.subtitle })).toBeVisible();

            // Verify email input
            const emailInput = this.page.locator(`#${this.registerTestIds.emailInput}`);
            await expect(emailInput).toBeDisabled();
            await expect(emailInput).toHaveValue(email);

            // Verify phone section
            await expect(this.page.locator(`.${this.registerTestIds.phoneField}`)).toBeVisible();

            // Verify password block
            const passwordBlock = this.page.locator(`.${this.registerTestIds.passwordBlock.container}`);
            await expect(passwordBlock.locator(`h3.${this.registerTestIds.passwordBlock.header}`))
                .toHaveText(registerData.passwordHeader);

            // Verify password validation
            const validatorPills = passwordBlock.locator(`.${this.registerTestIds.passwordBlock.validatorPills}`);
            await expect(validatorPills.locator('h5')).toHaveText('Conditions');
            await expect(validatorPills.locator(`.${this.registerTestIds.passwordBlock.rulesList} li`))
                .toHaveCount(3);

            // Verify password inputs and eye icons
            await expect(passwordBlock.locator(`input[name="${this.registerTestIds.passwordBlock.password1Input}"]`))
                .toBeVisible();
            await expect(passwordBlock.locator(`input[name="${this.registerTestIds.passwordBlock.password2Input}"]`))
                .toBeVisible();
            // await expect(passwordBlock.locator(`.${this.registerTestIds.passwordBlock.password1Eye}`)).toBeVisible();
            // await expect(passwordBlock.locator(`.${this.registerTestIds.passwordBlock.password2Eye}`)).toBeVisible();

            // Verify create account button
            await expect(this.page.getByRole('button', { name: registerData.createAccountButton }))
                .toBeVisible();
        } catch (error) {
            console.error('Register page verification failed:', error);
            throw error;
        }
    }

    // async loginWithFacebook(): Promise<void> {
    //     try {
    //         await this.page.getByRole('button', { name: 'facebook' }).click();
    //     } catch (error) {
    //         console.error('Facebook login failed:', error);
    //         throw error;
    //     }
    // }

    // async loginWithGoogle(): Promise<void> {
    //     try {
    //         await this.page.getByRole('button', { name: 'google' }).click();
    //     } catch (error) {
    //         console.error('Google login failed:', error);
    //         throw error;
    //     }
    // }

    async logout(): Promise<void> {
        try {
            // Verify and click profile button
            const profileButton = this.page.getByTestId(this.loginTestIds.userProfile);
            await expect(profileButton).toBeVisible();
            await profileButton.click();
            
            // Wait for profile menu and click logout
            await this.page.locator('span.bu-typography-caption-4').filter({ hasText: 'ออกจากระบบ' }).click();
            
            // Wait for redirect and verify
            await this.page.waitForURL(BASE_URL);
            await expect(this.page.getByTestId(this.loginTestIds.loginButton)).toBeVisible();
        } catch (error) {
            console.error('Logout failed:', error);
            throw error;
        }
    }

    async searchProduct(searchText: string): Promise<void> {
        try {
            const searchInput = this.page.getByPlaceholder('กำลังมองหาอะไรให้บ้าน? เสิร์ชเลย');
            await searchInput.click();
            await searchInput.fill(searchText);
            await this.page.getByLabel('Search Button').click();
            await this.page.waitForLoadState('networkidle');
        } catch (error) {
            console.error('Search failed:', error);
            throw error;
        }
    }
}
