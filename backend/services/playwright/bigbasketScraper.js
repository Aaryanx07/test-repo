const { chromium } = require("playwright");

module.exports = async (productName) => {

    let browser;

    try {

        browser = await chromium.launch({
            headless: true
        });

        const page = await browser.newPage();

        await page.goto(
            `https://www.bigbasket.com/ps/?q=${encodeURIComponent(productName)}`,
            {
                waitUntil: "domcontentloaded",
                timeout: 60000
            }
        );

        await page.waitForTimeout(5000);

        const products = page.locator(
            'div.SKUDeck___StyledDiv-sc-1e5d9gk-0'
        );

        const count = await products.count();

        if (count === 0) {

            throw new Error(
                "No BigBasket products found"
            );
        }

        const firstProduct = products.first();

        let title = "";

        try {

            title = await firstProduct
                .locator("h3")
                .first()
                .textContent();

        }

        catch {

            title = productName;
        }

let price = "";

try {

    const allPrices = await firstProduct
        .locator("span")
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
                "https://www.bigbasket.com/media/uploads/banner_images/250125-1.jpg";
        }

        let href = "";

        try {

            href = await firstProduct
                .locator("a")
                .first()
                .getAttribute("href");

            if (!href) {

                href = await firstProduct
                    .locator("h3")
                    .first()
                    .locator("xpath=..")
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
                : `https://www.bigbasket.com${href}`;
        }

        else {

            productUrl =
                `https://www.bigbasket.com/ps/?q=${encodeURIComponent(productName)}`;
        }

        await browser.close();

        return {

            found: true,

            website: "Bigbasket",

            title: title || productName,

            price: price || "N/A",

            image,

            url: productUrl
        };
    }

    catch (error) {

        console.log(
            "BIGBASKET SCRAPER ERROR:",
            error.message
        );

        if (browser) {

            await browser.close();
        }

        return {

            found: false,

            website: "Bigbasket",

            title: productName,

            price: "N/A",

            image:
                "https://www.bigbasket.com/media/uploads/banner_images/250125-1.jpg",

            url:
                `https://www.bigbasket.com/ps/?q=${encodeURIComponent(productName)}`
        };
    }
};