import React from "react";

const ShopifyLogin = () => {
  const handleLogin = () => {
    const shop = process.env.REACT_APP_SHOPIFY_SHOP_NAME; // Replace with your store URL
    const clientId = process.env.REACT_APP_SHOPIFY_API_KEY; // Store your API key in .env
    const scopes = "read_products,write_orders"; // Define the required permissions
    const redirectUri = process.env.REACT_APP_REDIRECT_URI; // Your redirect URL
    const state = "random_state_string"; // Optional, used for CSRF protection

    const oauthUrl = `https://${shop}/admin/oauth/authorize?client_id=${clientId}&scope=${scopes}&redirect_uri=${redirectUri}&state=${state}&grant_options[]=offline`;

    // Redirect to Shopify for authorization
    window.location.href = oauthUrl;
  };

  return <button onClick={handleLogin}>Install App</button>;
};

export default ShopifyLogin;
