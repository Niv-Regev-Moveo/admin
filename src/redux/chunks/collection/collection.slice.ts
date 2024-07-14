// collection.slice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getCollection } from "./collection.thunks";
import { CollectionSlice } from "../../../data/types/collectionSlice.type";
import { CollectionType } from "./collection.type";

const initialState: CollectionSlice<CollectionType> = {
  data: null,
  httpErr: undefined,
};
export const collectionSlice = createSlice({
  name: "collection",
  initialState,
  reducers: {
    setCollectionData: (state, action: PayloadAction<CollectionType[]>) => {
      state.data = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(
        getCollection.fulfilled,
        (state, action: PayloadAction<CollectionType[]>) => {
          state.data = action.payload;
        }
      )
      .addCase(getCollection.rejected, (state, action) => {
        state.httpErr = action.payload as string;
      });
  },
});

export const { setCollectionData } = collectionSlice.actions;

export const collectionReducer = collectionSlice.reducer;
