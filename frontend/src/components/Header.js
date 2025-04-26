import React from "react";
import "../style/header.css";
const Header = ({ children }) => {
  return (
    <header className="header">
      <div className="header__logo">
        <img
          src="https://cdn.shopify.com/shopify-marketing_assets/static/shopify-favicon.png"
          alt="Shopify Logo"
        />
      </div>
      <div className="header__search">
        <input type="text" placeholder="Search" />
      </div>
      <div className="header__title">RepliBot</div>
      <div className="header__actions">
        <button className="header__action">Setup guide</button>
        <button className="header__action">
          <span className="header__icon">🔔</span>
        </button>
        <div className="header__profile">
          <span className="header__profile-initials">CE</span>
          <span className="header__profile-name">Charlotte Evans</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
