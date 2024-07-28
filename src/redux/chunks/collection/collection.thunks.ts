import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import { Collection, ICommonItem } from "./collection.type";
import { HttpClientService } from "../../../services/HttpClientService";

export const getCollection = createAsyncThunk<
  ICommonItem[],
  { collection: Collection },
  { rejectValue: string }
>("collection/getCollection", async ({ collection }, { rejectWithValue }) => {
  try {
    const response = await HttpClientService.get<ICommonItem[]>(
      `/${collection}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    if (axios.isAxiosError(error)) {
      return rejectWithValue(error.response?.data ?? error.message);
    } else {
      return rejectWithValue("An unexpected error occurred");
    }
  }
});

export const updateStatus = createAsyncThunk<
  ICommonItem,
  { collection: Collection; id: string; status: string },
  { rejectValue: string }
>(
  "collection/updateStatus",
  async ({ collection, id, status }, { rejectWithValue }) => {
    try {
      const response = await HttpClientService.put<ICommonItem>(
        `/${collection}/${id}`,
        {
          status,
        }
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data ?? error.message);
      } else {
        return rejectWithValue("An unexpected error occurred");
      }
    }
  }
);

export const updateItem = createAsyncThunk<
  ICommonItem,
  { collection: Collection; id: string; data: Partial<ICommonItem> },
  { rejectValue: string }
>(
  "collection/updateItem",
  async ({ collection, id, data }, { rejectWithValue }) => {
    try {
      const response = await HttpClientService.put<ICommonItem>(
        `/${collection}/${id}`,
        data
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data ?? error.message);
      } else {
        return rejectWithValue("An unexpected error occurred");
      }
    }
  }
);

export const createNewItem = createAsyncThunk<
  ICommonItem,
  { collection: Collection; data: Partial<ICommonItem> },
  { rejectValue: string }
>(
  "collection/createNewItem",
  async ({ collection, data }, { rejectWithValue }) => {
    try {
      const response = await HttpClientService.post<ICommonItem>(
        `/${collection}`,
        data
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data ?? error.message);
      } else {
        return rejectWithValue("An unexpected error occurred");
      }
    }
  }
);
