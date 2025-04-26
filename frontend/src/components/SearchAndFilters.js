import React from "react";
import { TextField, Filters } from "@shopify/polaris";

const SearchAndFilters = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 20,
      }}
    >
      <TextField
        labelHidden
        label="Search"
        placeholder="Search"
        onChange={() => {}}
        autoComplete="off"
      />
      <Filters
        queryValue=""
        filters={[]}
        onQueryChange={() => {}}
        onQueryClear={() => {}}
      />
    </div>
  );
};

export default SearchAndFilters;
