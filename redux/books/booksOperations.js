import { createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../../shared/booksApi";

export const getBooks = createAsyncThunk("books/getBooks", async () => {
  try {
    const books = await api.getNewBooks();
    return books;
  } catch (error) {
    console.error("Error fetching books:", error.message);
    throw error;
  }
});
