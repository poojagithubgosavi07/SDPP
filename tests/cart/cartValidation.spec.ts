import { test } from "@playwright/test";
import { LoginPage } from "../../pages/LoginPage";
import { ProductPage } from "../../pages/ProductPage";
import { CartPage } from "../../pages/CartPage";
import { ExcelReader } from "../../utils/ExcelReader";

interface CartData 
{ 
    TC_ID: string; 
    TestScenario: string; 
    Username?: string; 
    Password?: string; 
    ProductName: string; 
    ExpectedQuantity?: number; 
}

const cartData: any[] = ExcelReader.getData("Cart");

test.describe("Cart Module - Data Driven Testing", () => 
{
    for (const data of cartData)
    {
        test(`${data.TC_ID} - ${data.TestScenario}`, async ({ page }) => 
        {
            const login = new LoginPage(page);
            const product = new ProductPage(page);
            const cart = new CartPage(page);

            await test.step("Login to application", async () => {
            await login.navigate();
            //await login.login(data.Username,data.Password);
            await login.login( data.Username ?? "", data.Password ?? "" );
            });

            //console.log(data);

            await test.step("Add product to cart", async () => {
            await product.addProductToCart(data.ProductName);
            });

            await test.step("Open cart", async () => {
            await cart.openCart();
            });

            /*if (data.TC_ID === "TC010") 
            {
                await cart.verifyProduct(data.ProductName);
                await cart.verifyQuantity(data.ExpectedQuantity.toString());
            }

            if (data.TC_ID === "TC011") 
            {
                await cart.removeProduct();
                await cart.verifyCartEmpty();
            }*/

            switch (data.TC_ID) 
            { 
                case "TC010": 
                await test.step("Verify product and quantity", async () => { 
                    await cart.verifyProduct(data.ProductName); 
                    await cart.verifyQuantity( String(data.ExpectedQuantity ?? "") 
                ); 
            }); 
            break;
            
            case "TC011": 
            await test.step("Remove product and verify cart is empty", async () => { 
                await cart.removeProduct(); 
                await cart.verifyCartEmpty(); 
            }); 
            
            break; 
            
            default: throw new Error( `Unsupported Cart Test Case: ${data.TC_ID}` ); 
            }
        });
    }
});

//await product.openCart();
//await expect(page.locator(".inventory_item_name")).toContainText("Sauce Labs Backpack");