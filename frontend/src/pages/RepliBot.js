import React from "react";

import Header from "../components/Header";
import ReplicabotReviewsList from "../components/ReplicabotReviews";
import Navbar from "../components/Navbar";
import "../style/style.css";
const RepliBot = () => {
  return (
    <>
      <div className="replibot-container">
        <ReplicabotReviewsList />
      </div>
    </>
  );
};

export default RepliBot;
