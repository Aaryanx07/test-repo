const { chromium } =
require("playwright");

module.exports =
async(productUrl)=>{

    let browser;

    try{

        browser =
        await chromium.launch({

            headless:true
        });

        const page =
        await browser.newPage();

        await page.goto(

            productUrl,

            {
                waitUntil:"domcontentloaded",
                timeout:60000
            }
        );

        await page.waitForTimeout(5000);

        let reviews = [];

        /* AMAZON */

        if(productUrl.includes("amazon")){

            reviews =
            await page.locator(

                '[data-hook="review-body"] span'

            ).allTextContents();
        }

        /* FLIPKART */

        else if(
            productUrl.includes("flipkart")
        ){

            reviews =
            await page.locator(

                "div.ZmyHeo"

            ).allTextContents();
        }

        await browser.close();

        return reviews
            .filter(r => r.trim() !== "")
            .slice(0,10);
    }

    catch(error){

        console.log(
            "REVIEW SCRAPER ERROR:",
            error.message
        );

        if(browser){

            await browser.close();
        }

        return [];
    }
};