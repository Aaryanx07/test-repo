const express =
require("express");

const router =
express.Router();

const {

    checkReviews

} = require(

    "../controllers/reviewController"
);

router.post(

    "/check",

    checkReviews
);

module.exports =
router;