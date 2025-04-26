import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchRepliData = createAsyncThunk(
  "repli/fetchRepliData",
  async () => {
    try {
      const nameArr = ["Jack", "Danilo", "Maria", "John", "Alice", "Bob"];
      const res = await axios.get("http://localhost:5000/api/reviews");
      let response = res.data;
      console.log(response);
      let reviewArr = [];
      for (let index = 0; index < response.length; index++) {
        const element = response[index];
        reviewArr.push({
          id: element.id,
          rating:
            Math.floor(Math.random() * 6) == 0
              ? 1
              : Math.floor(Math.random() * 6),
          title: "",
          sentiment: element.sentiment,
          body: element.text,
          author: nameArr[Math.floor(Math.random() * nameArr.length)],
          date: new Date().toLocaleDateString(),
          flagged: element.refund ? ["refund"] : [],
          response: {
            friendly: element.response[0],
            empathetic: element.response[1],
            bold: element.response[2],
          },
        });
      }
      return reviewArr;
    } catch (error) {
      console.error("Error fetching repli data:", error);
    }
  }
);

const RepliSlice = createSlice({
  name: "repli",
  initialState: {
    items: [],
    status: "idle",
    error: null,
  },
  reducers: {
    clearRepliData: (state) => {
      state.items = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRepliData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchRepliData.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchRepliData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { clearRepliData } = RepliSlice.actions;

export default RepliSlice.reducer;
