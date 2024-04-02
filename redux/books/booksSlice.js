import { createSlice } from "@reduxjs/toolkit";
import { getBooks } from "./booksOperations";

const initialState = {
  books: [],
  isLoading: false,
  error: null,
  uniqueBook: null,
  cart: [],
};

const booksSlice = createSlice({
  name: "books",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getBooks.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getBooks.fulfilled, (state, action) => {
        state.isLoading = false;
        state.books = action.payload;
      })
      .addCase(getBooks.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export default booksSlice.reducer;
