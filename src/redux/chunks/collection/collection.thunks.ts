import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import collectionAdapter from "./collection.adapter";
import { Collection } from "./collection.type";
import { CollectionDataType } from "./collection.type";

export const getCollection = createAsyncThunk<
  CollectionDataType[],
  { collection: Collection },
  { rejectValue: string }
>("collection/getCollection", async ({ collection }, { rejectWithValue }) => {
  try {
    const response = await collectionAdapter.getCollection<CollectionDataType>(
      collection
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

export const updateStatus = createAsyncThunk(
  "collection/updateStatus",
  async (
    {
      collection,
      id,
      status,
    }: { collection: Collection; id: string; status: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await collectionAdapter.updateStatus<Collection>(
        collection,
        id,
        { status }
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
