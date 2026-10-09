import { Page, Locator, expect } from "@playwright/test";
export class CartPage 
{
    page: Page;
    cartIcon: Locator;
    cartItems: Locator;
    productName: Locator;
    quantity: Locator;
    checkoutButton: Locator;
    continueShoppingButton: Locator;
    removeBackpack: Locator;

    constructor(page: Page)
    {
        this.page = page;
        this.cartIcon = page.locator(".shopping_cart_link");
        this.cartItems = page.locator(".cart_item");
        this.productName = page.locator(".inventory_item_name");
        this.quantity = page.locator(".cart_quantity");
        this.checkoutButton = page.locator("#checkout");
        this.continueShoppingButton = page.locator("#continue-shopping");
        this.removeBackpack = page.locator("#remove-sauce-labs-backpack");
    }

    async openCart() 
    {
        await this.cartIcon.click();
    }

    async verifyProduct(productName: string) 
    {
        await expect(this.productName).toHaveText(productName);
    }

    async verifyQuantity(expectedQty: string) 
    {
        await expect(this.quantity).toHaveText(expectedQty);
    }

    async clickCheckout() 
    {
        await this.checkoutButton.click();
    }

    async continueShopping() 
    {
        await this.continueShoppingButton.click();
    }

    async removeProduct() 
    {
        await this.removeBackpack.click();
    }

    async verifyCartEmpty() 
    {
        await expect(this.cartItems).toHaveCount(0);
    }
}