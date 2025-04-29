// backend/services/sentimentService.js
const { pipeline } = require("@xenova/transformers");

// Variable to hold the sentiment pipeline
let sentimentPipeline;
let isModelLoaded = false; // Flag to track model loading state

// Load the model asynchronously
async function loadModel() {
  try {
    sentimentPipeline = await pipeline("sentiment-analysis");
    isModelLoaded = true; // Set the flag to true once the model is loaded
    console.log("Sentiment model loaded successfully");
  } catch (error) {
    console.error("Error loading sentiment model:", error);
    throw new Error("Failed to load sentiment model");
  }
}

// Call this once in your app's initialization phase (make sure it's called before the server starts processing requests)
loadModel();

// The function to analyze sentiment
async function analyzeSentiment(reviewText) {
  try {
    // Ensure model is loaded before proceeding
    if (!isModelLoaded) {
      console.log("Model is not loaded yet. Please wait.");
      throw new Error("Sentiment model not loaded yet");
    }

    const output = await sentimentPipeline(reviewText);
    console.log("Sentiment output:", output);
    return output[0].label; // e.g., "POSITIVE", "NEGATIVE"
  } catch (error) {
    console.error("Error analyzing sentiment:", error);
    throw new Error("Sentiment analysis failed");
  }
}

module.exports = { analyzeSentiment };
