// backend/server.js
const express = require("express");
const cors = require("cors");
const reviewController = require("./controllers/reviewController.js");
require("dotenv").config();

const { generateAuthUrl, verifyHmac } = require("./shopify.js");

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

// Step 1: Redirect to Shopify Authorization URL
app.get("/auth", (req, res) => {
  const { shop } = req.query;
  if (!shop) {
    return res.status(400).send("Missing shop parameter");
  }
  const redirectUrl = generateAuthUrl(shop);
  res.redirect(redirectUrl);
});

// Step 2 & 3: Shopify Redirects Back -> Validate -> Exchange Code
app.get("/auth/callback", async (req, res) => {
  const { shop, code, hmac, state } = req.query;

  if (!verifyHmac(req.query)) {
    return res.status(400).send("HMAC validation failed");
  }

  try {
    const accessTokenRequestUrl = `https://${shop}/admin/oauth/access_token`;
    const accessTokenPayload = {
      client_id: process.env.SHOPIFY_API_KEY,
      client_secret: process.env.SHOPIFY_API_SECRET,
      code,
    };

    const response = await axios.post(
      accessTokenRequestUrl,
      accessTokenPayload
    );
    const { access_token } = response.data;

    // ⚡ Here you would save access_token in DB (for now we just send it)
    res.json({ access_token });
  } catch (error) {
    console.error(error.response ? error.response.data : error.message);
    res.status(500).send("Error exchanging code for access token");
  }
});

app.listen(5000, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

app.use(express.static(path.join(__dirname, "../frontend/build")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/build/index.html"));
});
