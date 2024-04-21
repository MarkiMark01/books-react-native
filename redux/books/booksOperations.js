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

export const addNewCart = createAsyncThunk(
  "todos/addNewTodo",
  async function (book, { rejectWithValue, dispatch }) {
    // accept book as a parameter
    try {
      const response = await fetch(
        "https://66068cdbbe53febb857e25cd.mockapi.io/api/b/cart",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(book), // send book details in the request body
        }
      );
      if (!response.ok) {
        throw new Error("Can't add task. Server error.");
      }
      const data = await response.json();
      dispatch(addToCart(data));
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteCart = createAsyncThunk(
  "todos/deleteTodo",
  async function (id, { rejectWithValue, dispatch }) {
    try {
      const response = await fetch(
        `https://66068cdbbe53febb857e25cd.mockapi.io/api/b/cart/${id}`,

        {
          method: "DELETE",
        }
      );
      if (!response.ok) {
        throw new Error("Can't delete task. Server error.");
      }
      dispatch(removeFromCart({ id }));
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
export const clearAllCart = createAsyncThunk(
  "cart/clearCart",
  async (_, { rejectWithValue, dispatch }) => {
    try {
      const response = await fetch(
        "https://66068cdbbe53febb857e25cd.mockapi.io/api/b/cart"
      );
      if (!response.ok) {
        throw new Error("Server Error!");
      }
      const data = await response.json();

      await Promise.all(
        data.map(async (book) => {
          const deleteResponse = await fetch(
            `https://66068cdbbe53febb857e25cd.mockapi.io/api/b/cart/${book.id}`,
            {
              method: "DELETE",
            }
          );
          if (!deleteResponse.ok) {
            throw new Error("Can't delete book. Server error.");
          }
        })
      );
      dispatch(clearCart());
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
