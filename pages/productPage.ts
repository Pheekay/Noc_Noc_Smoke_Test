import { Page, expect } from '@playwright/test';
import { searchResultTestIds } from '../src/testIds/productSearch';

interface SearchVerificationData {
    basic: {
        name: string;
        seller: string;
        rating: number;
        soldCount: number;
    };
    price: {
        current: number;
        original: number;
        discount: number;
    };
    tags: string[];
    image: string;
}

export class ProductDetailPage {
    constructor(private page: Page) {}

    async searchProduct(productName: string) {
        await this.page.getByPlaceholder('กำลังมองหาอะไรให้บ้าน? เสิร์ชเลย').click();
        await this.page.getByPlaceholder('กำลังมองหาอะไรให้บ้าน? เสิร์ชเลย').fill(productName);
        await this.page.getByPlaceholder('กำลังมองหาอะไรให้บ้าน? เสิร์ชเลย').press('Enter');
        const productCard = this.page.getByRole('link', { name: 'tag image of /static/images/e' });
        await expect(productCard).toBeVisible();
        
    }

    async verifySearchResults() {
        try {
            // Get product card
            const productCard = this.page.getByRole('link', { name: 'tag image of /static/images/e' });
            await expect(productCard).toBeVisible();
        } catch (error) {
            console.error('Search result verification failed:', error);
            throw error;
        }
    }
    async addProductToCart() {
        await this.page.getByRole('button', { name: 'เพิ่มลงตะกร้า' }).click();
    }
}
