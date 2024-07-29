// src/redux/chunks/collection/auth/auth.thunk.ts
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { IUser } from "./auth.type";

interface LoginCredentials {
  mail: string;
  password: string;
}

interface LoginResponse {
  user: IUser;
}

export const loginUser = createAsyncThunk<
  LoginResponse,
  LoginCredentials,
  { rejectValue: string }
>("auth/login", async ({ mail, password }, { rejectWithValue }) => {
  try {
    const response = await axios.post<LoginResponse>(
      "http://localhost:3000/api/v1/users/login",
      { mail, password }
    );
    return response.data;
  } catch (error) {
    console.error("Error logging in:", error);
    if (axios.isAxiosError(error)) {
      return rejectWithValue(error.response?.data.message ?? error.message);
    } else {
      return rejectWithValue("An unexpected error occurred");
    }
  }
});
