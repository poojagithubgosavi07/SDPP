import { test, expect } from "@playwright/test";
import { LoginPage } from "../../pages/LoginPage";
import { MenuPage } from "../../pages/MenuPage";
import { ExcelReader } from "../../utils/ExcelReader";

interface LogoutData 
{ 
    TC_ID: string; 
    TestScenario: string; 
    Username?: string; 
    Password?: string; 
}

const logoutData: any[] = ExcelReader.getData("Logout");

test.describe("Logout Module - Data Driven Testing", () => 
{
    for (const data of logoutData)
    {
        test(`${data.TC_ID} - ${data.TestScenario}`, async ({ page }) => 
        {
            const login = new LoginPage(page);
            const menu = new MenuPage(page);

            await test.step("Login to application", async () => 
            {
                // Navigate to Login Page
                await login.navigate();
                // Login
                await login.login(data.Username ?? "", data.Password ?? "");
            });

            // Logout
            await test.step("Logout from application", async () => 
            {
                await menu.logoutApplication();
            });

            // Verify Login Page
            await test.step("Verify Login Page", async () => 
            {
                await expect(page).toHaveURL("/");
                await expect(login.username).toBeVisible();
                await expect(login.password).toBeVisible();
                await expect(login.loginButton).toBeVisible();
            });
        });
    }
});
    