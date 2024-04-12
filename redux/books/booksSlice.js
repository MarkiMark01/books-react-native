// booksSlice.js

import { createSlice } from "@reduxjs/toolkit";
import { getBooks, getUniqueBooks, fetchCart } from "./booksOperations";

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
  reducers: {
    setUniqueBook(state, action) {
      state.uniqueBook = action.payload;
    },
    addToCart(state, action) {
      state.cart.push(action.payload);
    },
    removeFromCart(state, action) {
      state.cart = state.cart.filter((item) => item.id !== action.payload.id);
    },
    clearCart(state) {
      state.cart = [];
    },
  },
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
      })
      .addCase(getUniqueBooks.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getUniqueBooks.fulfilled, (state, action) => {
        state.isLoading = false;
        state.uniqueBook = action.payload;
      })
      .addCase(getUniqueBooks.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.cart = action.payload;
      });
  },
});

export const { setUniqueBook, addToCart, removeFromCart, clearCart } =
  booksSlice.actions;
export default booksSlice.reducer;

