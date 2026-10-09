import {Page, Locator, expect} from "@playwright/test";
export class ProductPage
{
    //page: Page;
    private readonly inventoryItems: Locator;
    private readonly productNames: Locator;
    private readonly productPrices: Locator;
    private readonly sortDropdown: Locator;
    //addBackpack: Locator;
    //removeBackpack: Locator;
    private readonly cartBadge: Locator;
    private readonly cartIcon: Locator;

    constructor(page:Page)
    {
        //this.page = page;
        this.inventoryItems = page.locator(".inventory_item");
        this.productNames = page.locator(".inventory_item_name");
        this.productPrices = page.locator(".inventory_item_price");
        this.sortDropdown = page.locator(".product_sort_container");
        //this.addBackpack = page.locator("#add-to-cart-sauce-labs-backpack");
        //this.removeBackpack = page.locator("#remove-sauce-labs-backpack");
        this.cartBadge = page.locator(".shopping_cart_badge");
        this.cartIcon = page.locator(".shopping_cart_link");
    }

     //Get product container by product name
    private getProduct(productName: string): Locator 
    { 
        if(!productName?.trim()) 
        { 
            throw new Error("Product Name is missing."); 
        } 
        return this.inventoryItems.filter({ hasText: productName }); 
    } 

    // Verify number of products
    async verifyInventoryLoaded(expectedCount: number): Promise<void>
    {
        await expect(this.inventoryItems).toHaveCount(expectedCount);
    }

    // Verify first product name
    async verifyProductName(expectedProduct: string): Promise<void>
    {
        await expect(this.productNames.first()).toHaveText(expectedProduct);
    }

    // Verify first product price
    async verifyFirstProductPrice(expectedPrice: string): Promise<void>
    {
        await expect(this.productPrices.first()).toHaveText(expectedPrice);
    }

    // Sort Products
    async sortProducts(sortType: string): Promise<void>
    {
        await this.sortDropdown.selectOption(sortType);
    }

    // Add Product using Product Name
    async addProductToCart(productName: string): Promise<void>
    {
        //await this.page.locator(`//div[text()='${productName}']/ancestor::div[@class='inventory_item']//button`).click();     
        /*if (!productName)
        {
            throw new Error("Product Name is undefined.");
        }
        const button = this.page.locator(`//div[text()='${productName}']/ancestor::div[@class='inventory_item']//button`);
        await button.waitFor({ state: "visible" });
        await button.click();*/

        const product = this.getProduct(productName); 
        const addButton = product.getByRole("button", { name: /Add to cart/i }); 
        await expect(addButton).toBeVisible(); 
        await addButton.click(); 
    }

    // Remove Product using Product Name
    async removeProduct(productName: string): Promise<void>
    {
        //await this.page.locator(`//div[text()='${productName}']/ancestor::div[@class='inventory_item']//button`).click();
        const product = this.getProduct(productName); 
        const removeButton = product.getByRole("button", { name: /Remove/i }); 
        await expect(removeButton).toBeVisible(); 
        await removeButton.click(); 
    }

    // Verify Cart Count
    async verifyCartCount(expectedCount: string): Promise<void> 
    {
        await expect(this.cartBadge).toHaveText(expectedCount);
    }

    // Open shopping cart
    async openCart(): Promise<void>
    {
        await this.cartIcon.click();
    }
}