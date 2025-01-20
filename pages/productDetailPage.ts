import { Page } from '@playwright/test';

export class ProductDetailPage {
  constructor(private page: Page) {}

  async navigate() {
    await this.page.goto('https://nocnoc.com/p/Televisions/SAMSUNG-UHD-TV-4K-SMART-TV-%E0%B8%82%E0%B8%99%E0%B8%B2/12392884?area=mainmenu-pl&clickType=left%20click%20-%20new%20tab&entryPoint=Cat%20PL&pos=2&sourceCarouselPlacement=Category%20PL');
  }

  async getProductTitle() {
    await this.page.waitForSelector('.product-title');
    return this.page.textContent('.product-title');
  }
}