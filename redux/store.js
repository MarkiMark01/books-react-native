import AsyncStorage from "@react-native-async-storage/async-storage";
import { configureStore } from "@reduxjs/toolkit";
<<<<<<< HEAD

import booksReducer from "./books/booksSlice";

export const store = configureStore({
  reducer: {
    books: booksReducer,
  },
});
=======
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

const persistedAuthReducer = persistReducer(authPersistConfig, authReducer);

export const store = configureStore({
  reducer: {
    auth: persistedAuthReducer,
    books: booksReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(process.env.NODE_ENV === "development" ? [] : []),
});
export const persistor = persistStore(store);
>>>>>>> 52ab493bda8fd41e9eaf0887d9f841db4e188caa
