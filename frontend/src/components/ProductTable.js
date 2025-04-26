import React from "react";
import { DataTable, Badge, Pagination, Thumbnail } from "@shopify/polaris";

const products = [
  {
    image: "https://via.placeholder.com/50",
    name: "Hair Serum",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    status: "Sold Out",
    reviews: 5,
    newReviews: 2,
  },
  {
    image: "https://via.placeholder.com/50",
    name: "Nail Paints",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    status: "Available",
    reviews: 2,
    newReviews: 1,
  },
  // Add more products as needed
];

const getStatusBadge = (status) => {
  switch (status) {
    case "Sold Out":
      return <Badge status="critical">Sold Out</Badge>;
    case "Available":
      return <Badge status="success">Available</Badge>;
    case "Fast Filling":
      return <Badge status="warning">Fast Filling</Badge>;
    default:
      return <Badge>{status}</Badge>;
  }
};

const ProductTable = () => {
  const rows = products.map((product) => [
    <Thumbnail source={product.image} alt={product.name} />,
    product.name,
    product.description,
    getStatusBadge(product.status),
    `${product.reviews} reviews`,
    `${product.newReviews} review${product.newReviews === 1 ? "" : "s"}`,
  ]);

  return (
    <>
      <DataTable
        columnContentTypes={["text", "text", "text", "text", "text", "text"]}
        headings={[
          "Product Names",
          "",
          "Product Description",
          "Status",
          "Reviews",
          "New Reviews",
        ]}
        rows={rows}
        showTotalsInFooter={false}
      />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          paddingTop: 20,
        }}
      >
        <Pagination
          hasPrevious
          hasNext
          onPrevious={() => {}}
          onNext={() => {}}
        />
      </div>
    </>
  );
};

export default ProductTable;
