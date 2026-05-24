const scrapeReviews =
require("../services/playwright/reviewScraper");

const analyzeReviews =
require("../services/reviewAnalyzer");

exports.checkReviews =
async(req,res)=>{

    try{

        const { productUrl } =
        req.body;

        if(!productUrl){

            return res.status(400).json({

                success:false,

                message:
                "Product URL required"
            });
        }

        const reviews =
        await scrapeReviews(productUrl);

        const analysis =
        await analyzeReviews(reviews);

        return res.json({

            success:true,

            analysis
        });
    }

    catch(error){

        console.log(error);

        return res.status(500).json({

            success:false,

            message:error.message
        });
    }
};