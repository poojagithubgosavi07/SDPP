import { test, expect } from "@playwright/test";
import { LoginPage } from "../../pages/LoginPage";
import { ExcelReader } from "../../utils/ExcelReader";

/**
 * Interface for Login Test Data
 */
interface LoginData 
{
    TC_ID: string;
    TestScenario: string;
    Username?: string;
    Password?: string;
    //ExpectedResult: string;
    ExpectedResult: "Pass" | "Fail";
    ErrorMessage?: string;
}

/**
 * Read Login Sheet from TestData.xlsx
 */
const loginData: LoginData[] = ExcelReader.getData("Login");

test.describe("Login Module - Data Driven Testing", () => 
{
    for (const data of loginData) 
    {
        test(`${data.TC_ID} - ${data.TestScenario}`, async ({ page }) => 
        {
            const login = new LoginPage(page);
            
            //Validate Excel test data
            if (!["Pass", "Fail"].includes(data.ExpectedResult)) 
            {
                throw new Error(`Invalid ExpectedResult '${data.ExpectedResult}' for Test Case ${data.TC_ID}`);
            }

            // Navigate to Login Page
            await test.step("Navigate to Login Page", async () => 
            {
                await login.navigate();
            });

            // Login with credentials
            await test.step("Login with credentials", async () => 
            {
                await login.login(data.Username ?? "",data.Password ?? "");
            });

            // Validation
            /*switch (data.ExpectedResult) 
            {
                case "Pass":
                    await expect(page).toHaveURL(/inventory.html/);
                    break;
                case "Fail":
                    await expect(login.errorMessage).toContainText(data.ErrorMessage);
                    break;
                default:
                    throw new Error(`Invalid ExpectedResult value in Excel : ${data.ExpectedResult}`);
            }*/

            //Validate login result
            await test.step("Validate login result", async () => 
            {
                if (data.ExpectedResult === "Pass") 
                {
                    await expect(page).toHaveURL(/inventory\.html/);
                    //return;
                }
                else
                {
                    if (!data.ErrorMessage?.trim()) { throw new Error( `ErrorMessage is missing in Excel for ${data.TC_ID}` );
                }

            await expect(login.errorMessage).toContainText(data.ErrorMessage ?? "");
            }
        });
     });
   }
});