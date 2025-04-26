// backend/controllers/reviewController.js
const sentimentService = require("../services/sentimentService.js");
const shopifyService = require("../services/shopifyService.js");
const gptService = require("../services/gptService.js");
const fs = require("fs");
const path = require("path");

const HUGGINGFACE_API_KEY = process.env.HUGGINGFACE_API_KEY;
function getMockReviews() {
  const reviewsFilePath = path.join(__dirname, "../data/mockReviews.json");
  const rawData = fs.readFileSync(reviewsFilePath);
  return JSON.parse(rawData);
}

function flagReview(review) {
  const escalationKeywords = ["refund", "broken", "defective", "replacement"];
  return escalationKeywords.some((keyword) =>
    review.toLowerCase().includes(keyword)
  );
}

const getReviews = async (req, res) => {
  console.log("received data succefully----------------->");
  console.log(HUGGINGFACE_API_KEY);
  console.log("HUGGINGFACE_API_KEY", HUGGINGFACE_API_KEY);
  try {
    // const reviews = await shopifyService.fetchShopifyReviews();

    const reviews = getMockReviews();
    const reviewsWithSentiments = await Promise.all(
      reviews.map(async (review) => {
        const sentiment = await sentimentService.analyzeSentiment(review.text);
        const response = await gptService.generateResponse(sentiment);
        const refund = flagReview(review.text);
        return {
          id: review.id,
          text: review.text,
          sentiment,
          response,
          refund,
        };
      })
    );

    res.json(reviewsWithSentiments);
  } catch (error) {
    console.error("Error fetching reviews:", error);
    res.status(500).json({ message: "Error fetching reviews" });
  }
};

module.exports = { getReviews };
