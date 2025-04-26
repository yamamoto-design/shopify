// backend/server.js
const express = require("express");
const cors = require("cors");
const reviewController = require("./controllers/reviewController.js");
require("dotenv").config();

const app = express();
const port = 5000;
const path = require("path");
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(process.cwd(), "frontend", "dist")));

// Review route that uses the reviewController
app.get("/api/reviews", reviewController.getReviews);

app.listen(process.env.PORT || port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

app.use(express.static(path.join(__dirname, "../frontend/build")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/build/index.html"));
});
