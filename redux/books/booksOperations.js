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
export const getUniqueBooks = createAsyncThunk(
  "books/fetchNewUniqueBooks",
  async (id, { rejectWithValue }) => {
    try {
      const response = await getNewUniqueBooks(id);
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
