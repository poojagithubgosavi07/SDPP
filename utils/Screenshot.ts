import { Page } from "@playwright/test";
export async function captureScreenshot(page: Page, name: string) 
{
    await page.screenshot({path: `screenshots/${name}.png`,fullPage: true});
}