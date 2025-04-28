// backend/server.js
const express = require("express");
const cors = require("cors");
const reviewController = require("./controllers/reviewController.js");
require("dotenv").config();

const app = express();
const port = 5000;
const path = require("path");

app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:3000", // Allow requests from frontend
  })
);
app.use(express.json());
app.use(express.static(path.join(process.cwd(), "frontend", "dist")));

// Review route that uses the reviewController
app.get("/api/reviews", reviewController.getReviews);

app.post("/auth/callback", async (req, res) => {
  const { code, state } = req.body;

  const client_id = process.env.SHOPIFY_API_KEY;
  const client_secret = process.env.SHOPIFY_API_SECRET;
  const redirect_uri = process.env.SHOPIFY_APP_URL + "/auth/callback";

  try {
    const response = await axios.post(
      `https://sentimenthug.myshopify.com/admin/oauth/access_token`,
      {
        client_id,
        client_secret,
        code,
        redirect_uri,
      }
    );

    // Extract the access token from the response
    const accessToken = response.data.access_token;

    // Send the access token to the frontend
    res.json({ access_token: accessToken });
  } catch (error) {
    console.error("Error exchanging authorization code:", error);
    res.status(500).json({ error: "Failed to exchange code for access token" });
  }
});

app.listen(5000, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

app.use(express.static(path.join(__dirname, "../frontend/build")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/build/index.html"));
});
