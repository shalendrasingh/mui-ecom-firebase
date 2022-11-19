import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchAllcategories = createAsyncThunk(
  "categories/fetchAll",
  async () => {
    const response = await fetch(
      "https://fakestoreapi.com/products/categories"
    );
    return await response.json();
  }
);

const categorySlice = createSlice({
  name: "categories",
  initialState: {
    value: [],
    loading: false,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAllcategories.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchAllcategories.fulfilled, (state, action) => {
      state.value = action.payload;
      state.loading = false;
    });
  },
});

export default categorySlice.reducer;
