const { chromium } = require("playwright");

module.exports = async (productName) => {

    let browser;

    try {

        browser = await chromium.launch({
            headless: false
        });

        const page = await browser.newPage();

        await page.goto(
            `https://www.bigbasket.com/ps/?q=${encodeURIComponent(productName)}`,
            {
                waitUntil: "networkidle",
                timeout: 60000
            }
        );

        await page.waitForTimeout(8000);

        /* =========================
           UPDATED PRODUCT LOCATOR
        ========================= */

        await page.waitForSelector(
            'a[href*="/pd/"]',
            {
                timeout: 15000
            }
        );

        const products = page.locator(
            'a[href*="/pd/"]'
        );

        const count = await products.count();

        if (count === 0) {

            throw new Error(
                "No BigBasket products found"
            );
        }

        const firstProduct =
        products.first();

        /* =========================
           TITLE
        ========================= */

        let title = "";

        try {

            title = await firstProduct
                .locator("h3")
                .first()
                .textContent();

            title = title.trim();

        }

        catch {

            title = productName;
        }

        /* =========================
           PRICE
        ========================= */

        let price = "";

        try {

            const productText =
            await firstProduct.textContent();

            const match =
            productText.match(
                /₹\s?([\d,]+)/
            );

            if (!match) {

                throw new Error(
                    "Price not found"
                );
            }

            price =
            `₹${match[1]}`;

        }

        catch {

            price = "Unavailable";
        }

        /* =========================
           IMAGE
        ========================= */

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

        /* =========================
           PRODUCT URL
        ========================= */

        let href = "";

        try {

            href =
            await firstProduct
                .getAttribute("href");

        }

        catch {

            href = "";
        }

        let productUrl = "";

        if (href) {

            productUrl =
            href.startsWith("http")

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