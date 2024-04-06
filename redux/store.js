import AsyncStorage from "@react-native-async-storage/async-storage";
import { configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import {
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist/es/constants";

import authReducer from "./auth/authSlice";
import booksReducer from "./books/booksSlice";

const authPersistConfig = {
  key: "auth",
  storage: AsyncStorage,
  whitelist: ["token"],
};

const booksPersistConfig = {
  key: "books",
  storage: AsyncStorage,
  whitelist: ["cart"],
};

const persistedAuthReducer = persistReducer(authPersistConfig, authReducer);
const persistedBooksReducer = persistReducer(booksPersistConfig, booksReducer);

export const store = configureStore({
  reducer: {
    auth: persistedAuthReducer,
    books: persistedBooksReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(process.env.NODE_ENV === "development" ? [] : []),
});
export const persistor = persistStore(store);
