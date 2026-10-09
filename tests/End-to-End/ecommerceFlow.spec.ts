import { test, expect } from "@playwright/test";
import { LoginPage } from "../../pages/LoginPage";
import { ProductPage } from "../../pages/ProductPage";
import { CartPage } from "../../pages/CartPage";
import { CheckoutPage } from "../../pages/CheckoutPage";
import { MenuPage } from "../../pages/MenuPage";
import { ExcelReader } from "../../utils/ExcelReader";

// Read E2E sheet from Excel
const e2eData: any[] = ExcelReader.getData("E2E");

test.describe("SauceDemo End-to-End Data Driven Flow", () =>
{
    for (const data of e2eData)
    {
        test(`${data.TC_ID} - ${data.TestScenario}`, async ({ page }) =>
        {
            const login = new LoginPage(page);
            const product = new ProductPage(page);
            const cart = new CartPage(page);
            const checkout = new CheckoutPage(page);
            const menu = new MenuPage(page);
            
            // Login
            await login.navigate();
            console.log("Current URL:", await page.url());
            await page.screenshot({path: "screenshots/beforeLogin.png",fullPage: true});
            await login.login(data.Username,data.Password);
            await expect(page).toHaveURL(/inventory.html/);
            
            // Verify Inventory
            await product.verifyInventoryLoaded(Number(data.InventoryCount));
           
            // Verify Product Name
            await product.verifyProductName(data.ProductName);
            
            // Sort Products
            await product.sortProducts(data.SortType);
            
            // Add Product
            await product.addProductToCart(data.ProductName);
           
            // Verify Cart Count
            await product.verifyCartCount(String(data.CartCount));
            
            // Open Cart
            await product.openCart();
            
            // Verify Product in Cart
            await cart.verifyProduct(data.ProductName);
            
            // Verify Quantity
            await cart.verifyQuantity(String(data.Quantity));
            
            // Checkout
            await checkout.clickCheckout();
            await checkout.fillCheckoutInformation(data.FirstName,data.LastName,data.PostalCode);
            await checkout.clickContinue();

            // Finish Order
            if(data.ExpectedResult=="Pass")
            {
                await checkout.clickFinish();
                await checkout.verifyOrderConfirmation();
            }
            else
            {
                await checkout.verifyErrorMessage(data.ErrorMessage);
            }

            // Logout
            await menu.logoutApplication();

            // Verify Logout
            await expect(login.username).toBeVisible();
            await expect(login.password).toBeVisible();
            await expect(login.loginButton).toBeVisible();
        });
    }
});