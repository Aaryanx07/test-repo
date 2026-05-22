const express = require("express");

const router = express.Router();

const {
    searchProduct
} = require("../controllers/productController");

router.post(
    "/search",
    searchProduct
);

module.exports = router;