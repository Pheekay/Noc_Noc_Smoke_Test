import { Page, expect } from '@playwright/test';
import { HeaderTestIds, HeaderTestIdsType } from '../src/testIds/header';
import { FooterTestIds, FooterTestIdsType } from '../src/testIds/footer';
import { LoginTestIds, LoginTestIdsType } from '../src/testIds/login';

const BASE_URL = 'https://nocnoc.com/';

export class HomePage {
    private readonly headerTestIds: HeaderTestIdsType;
    private readonly footerTestIds: FooterTestIdsType;
    private readonly loginTestIds: LoginTestIdsType;

    constructor(private page: Page) {
        this.headerTestIds = HeaderTestIds;
        this.footerTestIds = FooterTestIds;
        this.loginTestIds = LoginTestIds;
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

    async login(email: string, password: string): Promise<void> {
        try {
            // Open login modal
            await this.page.getByTestId(this.loginTestIds.loginButton).click();
            
            // Wait for modal and fill email/phone
            await this.page.waitForSelector(`#${this.loginTestIds.emailPhoneInput}`);
            await this.page.locator(`#${this.loginTestIds.emailPhoneInput}`).fill(email);
            
            // Click next and wait for password screen
            await this.page.locator('button:has-text("ต่อไป")').click();
            
            // Wait for password input to be visible and fill it
            await this.page.waitForSelector('input[type="password"]', { state: 'visible' });
            await this.page.locator('input[type="password"]').fill(password);
            
            // Submit login
            await this.page.locator('button:has-text("เข้าใช้งาน")').click();
            
            // Wait for login completion
            await this.page.waitForLoadState('networkidle');
        } catch (error) {
            console.error('Login failed:', error);
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

    // async logout(): Promise<void> {
    //     try {
    //         await this.page.getByTestId(this.loginTestIds.userProfile).click();
    //         await this.page.getByTestId(this.loginTestIds.logoutButton).click();
    //     } catch (error) {
    //         console.error('Logout failed:', error);
    //         throw error;
    //     }
    // }
}
