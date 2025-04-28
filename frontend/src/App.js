import React from "react";
import { AppProvider, Frame } from "@shopify/polaris";
import { useAppBridge } from "@shopify/app-bridge-react";
import "@shopify/polaris/build/esm/styles.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import enTranslations from "@shopify/polaris/locales/en.json";
import RealReviewComponent from "./components/RealReviewComponent";
import GenerateReviewComponent from "./components/GenerateReviewComponent";
// import Dashboard from "./pages/Dashboard";
import RepliBot from "./pages/RepliBot";
import RealReview from "./pages/RealReview";
import ShopifyLogin from "./pages/ShopifyLogin";

function App() {
  const shop = process.env.REACT_APP_SHOPIFY_SHOP_NAME;
  const config = {
    apiKey: process.env.SHOPIFY_API_KEY,
    shopOrigin: `https://${shop}`, // e.g., "example.myshopify.com"
    forceRedirect: true, // If you want to automatically redirect users to Shopify
  };

  return (
    <AppProvider i18n={enTranslations}>
      <Router>
        <Frame>
          <Routes>
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="/login" element={<ShopifyLogin />} />
            <Route path="/republic" element={<RepliBot />} />
            <Route path="/realreview" element={<RealReview />}>
              <Route path=":id" element={<RealReviewComponent />} />
              <Route path=":id/:name" element={<GenerateReviewComponent />} />
            </Route>
          </Routes>
        </Frame>
      </Router>
    </AppProvider>
  );
}

export default App;
