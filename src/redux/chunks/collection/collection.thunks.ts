import { createAsyncThunk } from "@reduxjs/toolkit";
import collectionAdapter from "./collection.adapter";
import { Collection, IChef, IRestaurant, IDish } from "./collection.type";
import axios from "axios";

type CollectionDataType = IChef | IRestaurant | IDish;

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
