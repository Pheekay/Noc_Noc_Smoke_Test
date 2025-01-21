import { Page, expect } from '@playwright/test';
import { HeaderTestIds, HeaderTestIdsType } from '../src/testIds/header';

const BASE_URL = 'https://nocnoc.com/';

export class HomePage {
    private readonly testIds: HeaderTestIdsType;

    constructor(private page: Page) {
        this.testIds = HeaderTestIds;
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
            await expect(this.page.getByTestId(this.testIds.logo)).toBeVisible();
            await expect(this.page.getByTestId(this.testIds.searchButton)).toBeVisible();
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
            await expect(this.page.getByTestId(this.testIds.cartButton)).toBeVisible();
            await expect(this.page.getByTestId(this.testIds.loginButton)).toBeVisible();
            await expect(this.page.getByTestId(this.testIds.languageSelector)).toBeVisible();
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
            await expect(this.page.getByTestId(this.testIds.searchButton)).toBeVisible();
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
            await expect(this.page.getByTestId(this.testIds.iosDownload)).toBeVisible();
            await expect(this.page.getByTestId(this.testIds.androidDownload)).toBeVisible();
            await expect(this.page.getByTestId(this.testIds.clubBenefits)).toBeVisible();
            await expect(this.page.getByTestId(this.testIds.service)).toBeVisible();
            await expect(this.page.getByTestId(this.testIds.seller)).toBeVisible();
            await expect(this.page.getByTestId(this.testIds.business)).toBeVisible();
            await expect(this.page.getByTestId(this.testIds.blog)).toBeVisible();
        } catch (error) {
            console.error('Top Header section verification failed:', error);
            throw error;
        }
    }

   
}
