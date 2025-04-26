import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
// import { thunkAPI } from "redux-thunk";

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    try {
      //   const nameArr = ["Jack", "Danilo", "Maria", "John", "Alice", "Bob"];
      const response = await axios.get("http://localhost:5000/api/reviews");
      return response.json();
    } catch (error) {
      console.error("Error fetching products:", error);
      //   return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const ProductSlice = createSlice({
  name: "products",
  initialState: {
    items: [],
    status: "idle",
    error: null,
  },
  reducers: {
    clearProducts: (state) => {
      state.items = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { clearProducts } = ProductSlice.actions;

export default ProductSlice.reducer;
