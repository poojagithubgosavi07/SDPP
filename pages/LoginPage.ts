import {Page, Locator} from "@playwright/test";
export class LoginPage 
{
   readonly page: Page; 
   readonly username: Locator;
   readonly password: Locator;
   readonly loginButton: Locator;
    errorMessage: Locator;

    constructor(page:Page)
    {
        this.page = page;
        this.username=page.locator("#user-name");
        this.password=page.locator("#password");
        this.loginButton=page.locator("#login-button");
        this.errorMessage = page.locator("[data-test='error']");
    }

    async navigate(): Promise<void> {
        await this.page.goto("/");
    }

    async login(username:string,password:string): Promise<void> 
    {
        //await this.username.waitFor({ state: "visible" });
        //await this.password.waitFor({ state: "visible" });
        //await this.username.fill(String(username));
        await this.username.fill(username);
        //await this.password.fill(String(password));
        await this.password.fill(password);
        await this.loginButton.click();
    }

    async getErrorMessage(): Promise<string> {
        return (await this.errorMessage.textContent())?.trim() ?? "";
    }
}