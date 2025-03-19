import { Page, Locator } from '@playwright/test';

export class frontPage {
  // Adicione esta propriedade para armazenar a referência à página
  readonly page: Page;
  readonly url = 'https://www.amazon.com/';
  
  // Locators
  searchField: Locator;
  searchButton: Locator;
  loginButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.loginButton = page.locator("//a[@id='nav-link-accountList']");
    this.searchField = page.locator('input[name="field-keywords"]');
    this.searchButton = page.locator("input[type='submit'][value='Go']");
  }
  
  async navigateTo(url: string) {
    await this.page.goto(url);
  }

  async navigate() {
    await this.navigateTo(this.url);
  }
  
  async navigateToLoginPage() {
    await this.loginButton.click();
  }

  async performSearch(query: string) {
    await this.searchField.fill(query);
    await this.searchButton.click();
  }
}