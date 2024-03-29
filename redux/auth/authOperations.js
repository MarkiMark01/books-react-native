import { createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../../shared/authApi";

export const signup = createAsyncThunk(
  "auth/signup",
  async (data, { rejectWithValue }) => {
    try {
      const result = await api.signup(data);
      return result;
    } catch ({ responce }) {
      const { status, data } = responce;
      const error = {
        status,
        message: data.message,
      };
      return rejectWithValue(error);
    }
  }
);
export const login = createAsyncThunk(
  "auth/login",
  async (data, { rejectWithValue }) => {
    try {
      const result = await api.login(data);
      return result;
    } catch ({ responce }) {
      const { status, data } = responce;
      const error = {
        status,
        message: data.message,
      };
      return rejectWithValue(error);
    }
  }
);

export const logout = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      const result = await api.logout();
      const serializableData = {
        data: result.data,
        status: result.status,
        statusText: result.statusText,
      };
      return serializableData;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
