import { createAsyncThunk } from "@reduxjs/toolkit";
import { LoginCredentials, LoginResponse } from "./auth.type";
import axios from "axios";
import { axiosInstance } from "../../../../utils/axiosInstance";

export const loginUser = createAsyncThunk<
  LoginResponse,
  LoginCredentials,
  { rejectValue: { message: string } }
>("auth/login", async ({ mail, password }, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.post<LoginResponse>("/users/login", {
      mail,
      password,
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return rejectWithValue({
        message: error.response.data.message || error.message,
      });
    } else {
      return rejectWithValue({ message: "An unexpected error occurred" });
    }
  }
});
