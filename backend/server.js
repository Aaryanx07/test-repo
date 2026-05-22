const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());

app.use(express.json());

/* TEST ROUTE */

app.get("/", (req,res)=>{

    res.send("Backend Running");
});

/* PRODUCT ROUTES */

const productRoutes =
require("./routes/productRoutes");

app.use(
    "/api/products",
    productRoutes
);

/* ERROR HANDLER */

app.use((err,req,res,next)=>{

    console.log("SERVER ERROR:", err);

    res.status(500).json({

        success:false,

        message:"Internal Server Error"
    });
});

const PORT = 8000;

app.listen(PORT, ()=>{

    console.log(
        `Server Running On Port ${PORT}`
    );
});