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
//-------------------Cart-------------------------------

export const fetchCart = createAsyncThunk(
  "todos/fetchTodos",
  async function (_, { rejectWithValue }) {
    try {
      const response = await fetch(
        "https://66068cdbbe53febb857e25cd.mockapi.io/api/b/cart"
      );

      if (!response.ok) {
        throw new Error("Server Error!");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);