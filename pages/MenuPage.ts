import { Page, Locator, expect} from "@playwright/test";
export class MenuPage 
{
    private readonly page: Page;
    private readonly menuButton: Locator;
    //allItems: Locator;
    //about: Locator;
    private readonly logout: Locator;
    //resetAppState: Locator;

    constructor(page: Page) 
    {
        this.page = page;
        this.menuButton = page.locator("#react-burger-menu-btn");
        //this.allItems = page.locator("#inventory_sidebar_link");
        //this.about = page.locator("#about_sidebar_link");
        this.logout = page.locator("#logout_sidebar_link");
        //this.resetAppState = page.locator("#reset_sidebar_link");
    }

    /*async clickMenu() 
    {
        //await this.menuButton.waitFor({ state: "visible" });
        await this.menuButton.click();
    }

    async clickLogout() 
    {
        //await this.logout.waitFor({ state: "visible" });
        await expect(this.logout).toBeVisible();
        await this.logout.click();
    }

    async logoutApplication() 
    {
        await this.clickMenu();
        await this.clickLogout();
    }*/

    async logoutApplication() 
    {
        await this.menuButton.click();
        await expect(this.logout).toBeVisible();
        await this.logout.click();
    }
}