const generateRecommendation =
require("../services/aiRecommendation.js");

const parallelSearch =
require("../services/productSearch/parallelSearch");

exports.searchProduct =
async (req,res)=>{

    try{

        const { product } = req.body;

        const aiData =
        generateRecommendation(product);

        console.log(aiData);

        console.log(
            "Searching for:",
            product
        );

        if(!product){

            return res.status(400).json({

                success:false,

                message:"Product missing"
            });
        }

        const results =
        await parallelSearch(
            aiData.optimizedSearch
        );

        return res.json({

            success:true,

            productName:product,

            aiData,

            results
        });
    }

    catch(error){

        console.log(
            "CONTROLLER ERROR:",
            error
        );

        return res.status(500).json({

            success:false,

            message:"Backend Error"
        });
    }
};