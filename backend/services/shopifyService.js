// backend/services/shopifyService.js
const axios = require("axios");

require("dotenv").config();
const SHOPIFY_API_KEY = process.env.SHOPIFY_API_KEY;
const SHOPIFY_PASSWORD = process.env.SHOPIFY_PASSWORD;
const SHOPIFY_DOMAIN = process.env.SHOPIFY_DOMAIN;

const fetchShopifyReviews = async () => {
  try {
    const response = await axios.get(
      `https://${SHOPIFY_DOMAIN}/admin/api/2021-04/products.json`,
      {
        auth: {
          username: SHOPIFY_API_KEY,
          password: SHOPIFY_PASSWORD,
        },
      }
    );

    // Replace this with the actual Shopify reviews data.
    return response.data.products.map((product) => ({
      id: product.id,
      text: product.title, // Adjust as per your Shopify response structure
    }));
  } catch (error) {
    console.error("Error fetching reviews:", error);
    throw new Error("Failed to fetch Shopify reviews");
  }
};

module.exports = { fetchShopifyReviews };
