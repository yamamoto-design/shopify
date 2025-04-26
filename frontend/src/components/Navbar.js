import React from "react";
import { Navigation } from "@shopify/polaris";
import {
  HomeIcon,
  OrderIcon,
  ProductIcon,
  ContractIcon,
  AppsIcon,
  MarketsIcon,
  DiscountIcon,
} from "@shopify/polaris-icons";
import "../style/style.css";

const Navbar = () => {
  return (
    <Navigation location="/">
      <Navigation.Section
        items={[
          {
            label: "Home",
            icon: HomeIcon,
            url: "#",
          },
          { label: "Orders", icon: OrderIcon, url: "#" },
          { label: "Products", icon: ProductIcon, url: "#" },
          { label: "Contracts", icon: ContractIcon, url: "#" },
          { label: "Marketing", icon: MarketsIcon, url: "#" },
          { label: "Discounts", icon: DiscountIcon, url: "#" },
          {
            label: "Apps",
            icon: AppsIcon,
            url: "#",
            subNavigationItems: [
              {
                label: "App Details",
                url: "#",
                selected: true,
              },
            ],
          },
        ]}
      />
    </Navigation>
  );
};

export default Navbar;
