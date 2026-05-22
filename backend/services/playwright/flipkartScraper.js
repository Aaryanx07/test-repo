const { chromium } = require("playwright");

module.exports = async (productName) => {

    let browser;

    try {

        browser = await chromium.launch({
            headless: false
        });

        const page = await browser.newPage();

        await page.goto(
            `https://www.flipkart.com/search?q=${encodeURIComponent(productName)}`,
            {
                waitUntil: "domcontentloaded",
                timeout: 60000
            }
        );

        await page.waitForTimeout(5000);

        const products = page.locator(
            'div[data-id]'
        );

        const count = await products.count();

        if (count === 0) {

            throw new Error(
                "No Flipkart products found"
            );
        }

        const firstProduct = products.first();

        let title = "";

        try {

            title = await firstProduct
                .locator("a[title]")
                .first()
                .getAttribute("title");

            if (!title) {

                title = await firstProduct
                    .locator("div.KzDlHZ")
                    .first()
                    .textContent();
            }

        }

        catch {

            title = productName;
        }

        let price = "";

        try {

            const allPrices = await firstProduct
                .locator("div, span")
                .allTextContents();

            let actualPrice = "";

            for (const text of allPrices) {

                if (
                    text.includes("₹") &&
                    !text.toLowerCase().includes("off")
                ) {

                    actualPrice = text;
                    break;
                }
            }

            if (!actualPrice) {

                throw new Error("Price not found");
            }

            const match = actualPrice.match(/₹\s?([\d,]+)/);

            if (!match) {

                throw new Error("Price not found");
            }

            price = `₹${match[1]}`;
        }

        catch {

            price = "Unavailable";
        }

        let image = "";

        try {

            image = await firstProduct
                .locator("img")
                .first()
                .getAttribute("src");

        }

        catch {

            image =
                "https://rukminim2.flixcart.com/image/832/832/xif0q/mobile/";
        }

        let href = "";

        try {

            href = await firstProduct
                .locator("a")
                .first()
                .getAttribute("href");

            if (!href) {

                href = await firstProduct
                    .locator("a.CGtC98")
                    .first()
                    .getAttribute("href");
            }

        }

        catch {

            href = "";
        }

        let productUrl = "";

        if (href) {

            productUrl = href.startsWith("http")
                ? href
                : `https://www.flipkart.com${href}`;
        }

        else {

            productUrl =
                `https://www.flipkart.com/search?q=${encodeURIComponent(productName)}`;
        }

        await browser.close();

        return {

            found: true,

            website: "Flipkart",

            title: title || productName,

            price: price || "N/A",

            image,

            url: productUrl
        };
    }

    catch (error) {

        console.log(
            "FLIPKART SCRAPER ERROR:",
            error.message
        );

        if (browser) {

            await browser.close();
        }

        return {

            found: false,

            website: "Flipkart",

            title: productName,

            price: "N/A",

            image:
                "https://rukminim2.flixcart.com/image/832/832/xif0q/mobile/",

            url:
                `https://www.flipkart.com/search?q=${encodeURIComponent(productName)}`
        };
    }
};