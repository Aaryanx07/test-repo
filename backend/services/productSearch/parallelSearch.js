const amazonScraper =
require("../playwright/amazonScraper");

const flipkartScraper =
require("../playwright/flipkartScraper");

const blinkitScraper =
require("../playwright/blinkitScraper");

const nikeScraper =
require("../playwright/nikeScraper");

const adidasScraper =
require("../playwright/adidasScraper");

const bigbasketScraper =
require("../playwright/bigbasketScraper");

async function parallelSearch(product){

    const searches = [

        amazonScraper(product),

        flipkartScraper(product),

        blinkitScraper(product),

        nikeScraper(product),

        adidasScraper(product),

        bigbasketScraper(product)
    ];

    const results =
    await Promise.allSettled(searches);

    return results.map((result,index)=>{

        const websites = [

            "amazon",
            "flipkart",
            "blinkit",
            "nike",
            "adidas",
            "bigbasket"
        ];

        if(result.status === "fulfilled"){

            return result.value;
        }

        return {

            website:websites[index],

            success:false,

            found:false
        };
    });
}

module.exports =
parallelSearch;