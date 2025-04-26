import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./features/products/productSlice";
import repliReducer from "./features/repli/repliSlice";

export const store = configureStore({
  reducer: {
    products: productReducer,
    repli: repliReducer,
  },
});
export default store;
