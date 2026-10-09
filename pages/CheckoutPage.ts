import {Page, Locator, expect} from "@playwright/test";
export class CheckoutPage
{
    page: Page;
    checkoutButton: Locator;
    firstName: Locator;
    lastName: Locator;
    postalCode: Locator;
    continueButton: Locator;
    finishButton: Locator;
    cancelButton: Locator;
    errorMessage: Locator;
    orderConfirmation: Locator;

    constructor(page:Page)
    {
        this.page = page;
        this.checkoutButton=page.locator("#checkout");
        this.firstName=page.locator("#first-name");
        this.lastName=page.locator("#last-name");
        this.postalCode=page.locator("#postal-code");
        this.continueButton=page.locator("#continue");
        this.finishButton=page.locator("#finish");
        this.cancelButton = page.locator("#cancel");
        this.errorMessage = page.locator("[data-test='error']");
        this.orderConfirmation = page.locator(".complete-header");
    }

    /*async completeCheckout(data:any)
    {
        await this.checkoutButton.click();
        await this.firstName.fill(data.firstName);
        await this.lastName.fill(data.lastName);
        await this.postalCode.fill(data.zipCode);
        await this.continueButton.click();
        await this.finish.click();
    }*/

     async clickCheckout() 
    {
        await this.checkoutButton.click();
    }

    async enterFirstName(firstName: string) 
    {
        await this.firstName.fill(firstName);
    }

    async enterLastName(lastName: string) 
    {
        await this.lastName.fill(lastName);
    }

    async enterPostalCode(postalCode: string | number) 
    {
        await this.postalCode.fill(String(postalCode));
    }

    async clickContinue() 
    {
        await this.continueButton.click();
    }

    async clickFinish() 
    {
        await this.finishButton.click();
    }

    /*async fillCheckoutInformation(firstName: string,lastName: string,postalCode: string) 
    {
        await this.enterFirstName(firstName);
        await this.enterLastName(lastName);
        await this.enterPostalCode(postalCode);
    }*/

    async fillCheckoutInformation(firstName: string,lastName: string,postalCode: string | number)   
    {
        await this.firstName.fill(String(firstName));
        await this.lastName.fill(String(lastName));
        await this.postalCode.fill(String(postalCode));
    }

    async completeCheckout(data:any) 
    {
        await this.clickCheckout();
        await this.fillCheckoutInformation(data.FirstName, data.LastName, data.PostalCode);
        //await this.firstName.fill(data.FirstName);
        //await this.lastName.fill(data.LastName);
        //await this.postalCode.fill(data.PostalCode);
        await this.clickContinue();
        await this.clickFinish();
    }

    async verifyOrderConfirmation() 
    {
        await expect(this.orderConfirmation).toHaveText("Thank you for your order!");
    }

    async verifyErrorMessage(expectedMessage: string) 
    {
        await expect(this.errorMessage).toHaveText(expectedMessage);
    }
}