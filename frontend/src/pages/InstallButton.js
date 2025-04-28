// src/components/InstallButton.tsx
import React from "react";
import { useState } from "react";

const InstallButton = () => {
  const [shop, setShop] = useState("");

  const handleInstall = () => {
    window.location.href = `/auth?shop=${shop}`;
  };

  return (
    <div>
      <input
        type="text"
        placeholder="your-store.myshopify.com"
        value={shop}
        onChange={(e) => setShop(e.target.value)}
      />
      <button onClick={handleInstall}>Install Shopify App</button>
    </div>
  );
};

export default InstallButton;
