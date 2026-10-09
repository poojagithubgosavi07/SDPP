import { test } from "@playwright/test";
import { LoginPage } from "../../pages/LoginPage";
import { ProductPage } from "../../pages/ProductPage";
import { CheckoutPage } from "../../pages/CheckoutPage";
import { ExcelReader } from "../../utils/ExcelReader";

interface CheckoutData 
{ 
    TC_ID: string; 
    TestScenario: string; 
    Username?: string; 
    Password?: string; 
    ProductName: string; 
    FirstName?: string; 
    LastName?: string; 
    PostalCode?: string; 
    ErrorMessage?: string; 
}

const checkoutData: any[] = ExcelReader.getData("Checkout");

test.describe("Checkout Module - Data Driven Testing", () => 
{
    for (const data of checkoutData) 
    {
        test(`${data.TC_ID} - ${data.TestScenario}`, async ({ page }) => 
        {
            const login = new LoginPage(page);
            const product = new ProductPage(page);
            const checkout = new CheckoutPage(page);
            
            // Validate required test data 
            if (!data.ProductName?.trim()) 
            { 
                throw new Error( `ProductName missing in Excel for ${data.TC_ID}` ); 
            }
            
            // Login
            await test.step("Login to application", async () => 
            {
                await login.navigate();
                //await login.login(String(data.Username),String(data.Password));
                await login.login( data.Username ?? "", data.Password ?? "" );
            });

            console.log("Product =", data.ProductName);
            if (!data.ProductName) 
            {
                throw new Error(`ProductName missing in Excel for ${data.TC_ID}`);
            }
            
            // Add Product
            await test.step("Add product to cart", async () =>
            {
                await product.addProductToCart(data.ProductName);
            });

            // Open Cart
            await product.openCart();
            
            // Checkout
            await checkout.clickCheckout();
            await checkout.fillCheckoutInformation(String(data.FirstName ?? ""),String(data.LastName ?? ""),String(data.PostalCode ?? ""));
            await checkout.clickContinue();
            
            // Positive Scenario
            if (!data.ErrorMessage || data.ErrorMessage.trim() === "") 
            {
                await checkout.clickFinish();
                await checkout.verifyOrderConfirmation();
            }

            // Negative Scenario
            else 
            {
                await checkout.verifyErrorMessage(String(data.ErrorMessage));
            }
        });
    }
});