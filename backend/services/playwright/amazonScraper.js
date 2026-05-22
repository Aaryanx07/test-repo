const { chromium } = require("playwright");

module.exports = async (productName) => {

    let browser;

    try {

        browser = await chromium.launch({
            headless: false
        });

        const page = await browser.newPage();

        await page.goto(
            `https://www.amazon.in/s?k=${encodeURIComponent(productName)}`,
            {
                waitUntil: "domcontentloaded",
                timeout: 60000
            }
        );

        await page.waitForTimeout(5000);

        const products = page.locator(
            '[data-component-type="s-search-result"]'
        );

        const count = await products.count();

        if (count === 0) {

            throw new Error(
                "No Amazon products found"
            );
        }

        const firstProduct = products.first();

        let title = "";

        try {

            title = await firstProduct
                .locator("h2 span")
                .first()
                .textContent();

        }

        catch {

            title = productName;
        }

        let price = "";

        try {

            const whole = await firstProduct
                .locator(".a-price-whole")
                .first()
                .textContent();

            let cleanWhole = whole
                .replace(/[^\d]/g, "");

            cleanWhole = Number(cleanWhole)
                .toLocaleString("en-IN");

            price = `₹${cleanWhole}`;

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
                "https://m.media-amazon.com/images/I/71d7rfSl0wL._SX679_.jpg";
        }

        let href = "";

        try {

            href = await firstProduct
                .locator("a.a-link-normal.s-no-outline")
                .first()
                .getAttribute("href");

            if (!href) {

                href = await firstProduct
                    .locator("h2 a")
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
                : `https://www.amazon.in${href}`;
        }

        else {

            productUrl =
                `https://www.amazon.in/s?k=${encodeURIComponent(productName)}`;
        }

        await browser.close();

        return {

            found: true,

            website: "Amazon",

            title: title || productName,

            price: price || "N/A",

            image,

            url: productUrl
        };
    }

    catch (error) {

        console.log(
            "AMAZON SCRAPER ERROR:",
            error.message
        );

        if (browser) {

            await browser.close();
        }

        return {

            found: false,

            website: "Amazon",

            title: productName,

            price: "N/A",

            image:
                "https://m.media-amazon.com/images/I/71d7rfSl0wL._SX679_.jpg",

            url:
                `https://www.amazon.in/s?k=${encodeURIComponent(productName)}`
        };
    }
};