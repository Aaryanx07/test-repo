const express = require("express");

const {
  analyzeReviews
} = require("../controllers/reviewController");

const router = express.Router();

router.post("/analyze", analyzeReviews);

module.exports = router;
