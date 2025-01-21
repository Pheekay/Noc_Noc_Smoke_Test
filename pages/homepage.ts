import { Page, expect } from '@playwright/test';

export class HomePage {
    constructor(private page: Page) {}

    /**
     * Navigate to the homepage and close all popups.
     */
    async navigate(): Promise<void> {
        try {
            await this.page.goto('https://nocnoc.com/');

            // Close all popups that are not the main page
            const popups = this.page.context().pages();
            for (const popup of popups) {
                if (popup !== this.page) {
                    await popup.close();
                }
            }
        } catch (error) {
            console.error('Error during navigation:', error);
            throw error;
        }
    }

    /**
     * Get the title of the page.
     * @returns The title as a string.
     */
    async getTitle(): Promise<string> {
        try {
            // Wait for the page to be fully loaded
            await this.page.waitForLoadState('domcontentloaded');

            // Extract the title using page.content if page.title() fails
            const content = await this.page.content();
            const titleMatch = content.match(/<title>(.*?)<\/title>/);
            const title = titleMatch ? titleMatch[1] : '';

            if (!title) {
                throw new Error('Page title is empty or not found');
            }

            return title;
        } catch (error) {
            console.error('Failed to get page title:', error);
            throw error;
        }
    }

    /**
     * Verify the visibility of header elements on the homepage.
     */
    async verifyHeaderElements(): Promise<void> {
        try {
            // Verify that all expected header elements are visible
            await expect(this.page.getByTestId('nocnoc-logo')).toBeVisible();
            await expect(this.page.getByLabel('Search Button')).toBeVisible();
            await expect(this.page.getByTestId('cart-btn')).toBeVisible();
            await expect(this.page.getByTestId('login-btn')).toBeVisible();
            await expect(this.page.getByRole('img', { name: 'language' })).toBeVisible();
        } catch (error) {
            console.error('Header element verification failed:', error);
            throw error;
        }
    }
    async verifySearchBar(): Promise<void> {
        try {
            // Verify that all expected header elements are visible
            await expect(this.page.getByTestId('search-bar')).toBeVisible();
            await expect(this.page.getByTestId('search-btn')).toBeVisible();
        } catch (error) {
            console.error('Header element verification failed:', error);
            throw error;
        }
    }
}
