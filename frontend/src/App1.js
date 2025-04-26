import React from "react";
import {
  AppProvider,
  Page,
  Layout,
  Frame,
  Navigation,
  TextContainer,
  TopBar,
} from "@shopify/polaris";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // Updated import

import Reviews from "./components/Reviews";

import "@shopify/polaris/build/esm/styles.css"; // Correct import for Polaris styles

function App() {
  return (
    <AppProvider>
      <Router>
        <Frame
          topBar={
            <TopBar
              showNavigationToggle
              userMenu={null}
              onNavigationToggle={() => {}}
            />
          }
          navigation={
            <Navigation>
              <Navigation.Section
                items={[
                  {
                    label: "Reviews",
                    to: "/",
                    primary: true,
                  },
                ]}
              />
            </Navigation>
          }
        >
          <Page>
            <Layout>
              <Layout.Section>
                <TextContainer>
                  <h1>Shopify AI Review Management</h1>
                  <p>
                    View and manage Shopify reviews with AI-powered responses
                    and sentiment analysis.
                  </p>
                </TextContainer>
              </Layout.Section>

              <Layout.Section>
                <Routes>
                  <Route path="/" element={<Reviews />} />
                </Routes>
              </Layout.Section>
            </Layout>
          </Page>
        </Frame>
      </Router>
    </AppProvider>
  );
}

export default App;
