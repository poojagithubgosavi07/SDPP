import { test } from "@playwright/test";
import { LoginPage } from "../../pages/LoginPage";
import { ProductPage } from "../../pages/ProductPage";
import { ExcelReader } from "../../utils/ExcelReader";

interface ProductData 
{ 
    TC_ID: string; 
    TestScenario: string; 
    Username?: string; 
    Password?: string; 
    ExpectedProduct?: string; 
    SortType?: string; 
    ExpectedPrice?: string; 
    ProductName?: string; 
    CartCount?: number; 
}

const productData: ProductData[] = ExcelReader.getData("Product");

test.describe("Product Module - Data Driven Testing", () => 
{
    for (const data of productData) 
    {
        test(`${data.TC_ID} - ${data.TestScenario}`, async ({ page }) => 
        {
            const login = new LoginPage(page);
            const product = new ProductPage(page);

            await test.step("Login to application", async () => 
            {
                await login.navigate();
                await login.login(data.Username ?? "",data.Password ?? "");
            });

            switch (data.TC_ID) 
            {
                case "TC006":
                    await test.step("Verify product inventory", async () => 
                    {
                        await product.verifyInventoryLoaded(6);
                        await product.verifyProductName(data.ExpectedProduct ?? "");
                    });
                    break;
                case "TC007":
                    await test.step("Sort products and verify price", async () => 
                    {
                        await product.sortProducts(data.SortType ?? "");
                        await product.verifyFirstProductPrice(data.ExpectedPrice ?? "");
                    });
                    break;
                case "TC008":
                    await test.step("Add product to cart", async () => 
                    {
                        await product.addProductToCart(data.ProductName ?? "");
                        await product.verifyCartCount(String(data.CartCount ?? ""));
                    });
                    break;
                case "TC009":
                    await test.step("Add and remove product", async () => 
                    {
                        await product.addProductToCart(data.ProductName ?? "");
                        await product.removeProduct(data.ProductName ?? "");
                    });
                    break;
                default:
                throw new Error( `Unsupported Product Test Case: ${data.TC_ID}` );
            }
        });
    }
});
