const parallelSearch =
require("../services/productSearch/parallelSearch");

exports.searchProduct =
async (req,res)=>{

    try{

        const { product } = req.body;

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
        await parallelSearch(product);

        return res.json({

            success:true,

            productName:product,

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