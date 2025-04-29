import React from "react";
import { Outlet } from "react-router-dom";
import "../style/style.css";
const RealReview = () => {
  return (
    <div className="replibot-container">
      <Outlet />
    </div>
  );
};

export default RealReview;
