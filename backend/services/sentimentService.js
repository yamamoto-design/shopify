// backend/services/sentimentService.js
const fetch = require("node-fetch");
require("dotenv").config();

const HUGGINGFACE_API_KEY = process.env.HUGGINGFACE_API_KEY;

const analyzeSentiment = async (reviewText) => {
  try {
    const response = await fetch(
      "https://api-inference.huggingface.co/models/distilbert-base-uncased-finetuned-sst-2-english",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${HUGGINGFACE_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ inputs: reviewText }),
      }
    );
    const data = await response.json();
    return data[0][0].label; // Assuming "label" is the sentiment (e.g., "POSITIVE", "NEGATIVE")
  } catch (error) {
    console.error("Error analyzing sentiment:", error);
    throw new Error("Sentiment analysis failed");
  }
};

module.exports = { analyzeSentiment };
