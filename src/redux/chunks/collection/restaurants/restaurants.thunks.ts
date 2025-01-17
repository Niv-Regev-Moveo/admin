import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { IRestaurant } from "../collection.type";
import { HttpClientService } from "../../../../services/HttpClientService";

export const fetchRestaurants = createAsyncThunk<
  IRestaurant[],
  void,
  { rejectValue: string }
>("restaurants/fetchRestaurants", async (_, { rejectWithValue }) => {
  try {
    const response = await HttpClientService.get<IRestaurant[]>("/restaurants");
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return rejectWithValue(error.response?.data ?? error.message);
    } else {
      return rejectWithValue("An unexpected error occurred");
    }
  }
});
