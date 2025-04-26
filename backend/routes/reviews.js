// routes/reviews.js
const express = require("express");
const { getShopifyReviews } = require("../controllers/reviewController");
const router = express.Router();

// Route to get mock reviews (simulating Shopify reviews)
router.get("/shopify-reviews", getShopifyReviews);

module.exports = router;
