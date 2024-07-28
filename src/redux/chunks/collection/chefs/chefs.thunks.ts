import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { IChef } from "../collection.type";
import { HttpClientService } from "../../../../services/HttpClientService";

export const fetchChefs = createAsyncThunk<
  IChef[],
  void,
  { rejectValue: string }
>("chefs/fetchChefs", async (_, { rejectWithValue }) => {
  try {
    const response = await HttpClientService.get<IChef[]>("/chefs");
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return rejectWithValue(error.response?.data ?? error.message);
    } else {
      return rejectWithValue("An unexpected error occurred");
    }
  }
});
