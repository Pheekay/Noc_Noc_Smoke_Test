import { Page } from '@playwright/test';

export class HomePage {
    constructor(private page: Page) { }

    async navigate() {
        await this.page.goto('https://nocnoc.com/');
    }

    async getTitle() {
        return await this.page.title(); // Fetches the title from the <title> tag in the <head> section
    }

}