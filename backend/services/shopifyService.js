const axios = require("axios");

async function getAllProductIds(shop, accessToken) {
  const response = await axios.get(
    `https://${shop}/admin/api/2024-01/products.json`,
    {
      headers: {
        "X-Shopify-Access-Token": accessToken,
      },
      params: {
        limit: 50, // Max per page
      },
    }
  );

  const products = response.data.products;
  const productIds = products.map((product) => ({
    id: product.id,
    title: product.title,
  }));

  return productIds;
}

async function createReviewMetafield(shop, accessToken, productId, review) {
  const metafield = {
    metafield: {
      namespace: "reviews",
      key: `review_${Date.now()}`,
      type: "json",
      value: JSON.stringify({
        author: review.author,
        content: review.content,
        rating: review.rating,
        createdAt: new Date().toISOString(),
      }),
    },
  };

  const res = await axios.post(
    `https://${shop}/admin/api/2024-01/products/${productId}/metafields.json`,
    metafield,
    {
      headers: {
        "X-Shopify-Access-Token": accessToken,
        "Content-Type": "application/json",
      },
    }
  );

  return res.data.metafield;
}

async function getProductReviewMetafields(shop, accessToken, productId) {
  const res = await axios.get(
    `https://${shop}/admin/api/2024-01/products/${productId}/metafields.json`,
    {
      headers: {
        "X-Shopify-Access-Token": accessToken,
      },
    }
  );

  return res.data.metafields
    .filter((mf) => mf.namespace === "reviews")
    .map((mf) => ({
      id: mf.id,
      value: JSON.parse(mf.value),
      createdAt: mf.created_at,
    }));
}

module.exports = {
  getAllProductIds,
  createReviewMetafield,
  getProductReviewMetafields,
};
