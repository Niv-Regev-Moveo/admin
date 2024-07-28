import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { IDish } from "../collection.type";
import { HttpClientService } from "../../../../services/HttpClientService";

export const fetchDishes = createAsyncThunk<
  IDish[],
  void,
  { rejectValue: string }
>("dishes/fetchDishes", async (_, { rejectWithValue }) => {
  try {
    const response = await HttpClientService.get<IDish[]>("/dishes");
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return rejectWithValue(error.response?.data ?? error.message);
    } else {
      return rejectWithValue("An unexpected error occurred");
    }
  }
});
