import { Page, Locator } from '@playwright/test';

export class productListPage {

  readonly page: Page; 
  // Locators
  firstAddToCart: Locator;
  CartNumber: Locator;
  CartLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.firstAddToCart = page.locator('button[name="submit.addToCart"]');
    this.CartNumber = page.locator('span[id="nav-cart-count"]');
    this.CartLink = page.locator("#nav-cart");
  }

  async addToCart() {
    await this.firstAddToCart.first().click();
  }

  async getCartItemNumber(): Promise<number> {
    const cartCountText = await this.CartNumber.textContent();
    return parseInt(cartCountText || '0', 10);
  }

  async navigateToCart() {
    await this.CartLink.click();
  }  
}