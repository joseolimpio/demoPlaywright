import { test, expect } from '@playwright/test';
import { frontPage } from './pages/frontPage.ts';
import { productListPage } from './pages/productListPage.ts';

test.describe('Navigate through the User flow on Amazon.com', () => {
  let amazonPage: frontPage;
  let productPage: productListPage;

  test.beforeEach(async ({ page }) => {
    amazonPage = new frontPage(page);
    productPage = new productListPage(page); // Inicializar productPage aqui
    await amazonPage.navigate();
  });    
  
  test('Access login area from the front page', async ({ page }) => {
    await amazonPage.navigateToLoginPage();
    expect(page.url()).toContain('signin');
  });
});