import AsyncStorage from "@react-native-async-storage/async-storage";
import { configureStore } from "@reduxjs/toolkit";

import booksReducer from "./books/booksSlice";

export const store = configureStore({
  reducer: {
    books: booksReducer,
  },
});
