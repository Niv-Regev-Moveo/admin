// collection.slice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getCollection, updateStatus } from "./collection.thunks";
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
          state.data = action.payload.sort((a, b) =>
            a.status === "archive" ? 1 : b.status === "archive" ? -1 : 0
          );
        }
      )
      .addCase(getCollection.rejected, (state, action) => {
        state.httpErr = action.payload as string;
      })
      .addCase(
        updateStatus.fulfilled,
        (state, action: PayloadAction<CollectionType>) => {
          if (state.data) {
            const index = state.data.findIndex(
              (item) => item.id === action.payload.id
            );
            if (index !== -1) {
              state.data[index] = action.payload;
              state.data = state.data.sort((a, b) =>
                a.status === "archive" ? 1 : b.status === "archive" ? -1 : 0
              );
            }
          }
        }
      );
  },
});

export const { setCollectionData } = collectionSlice.actions;

export const collectionReducer = collectionSlice.reducer;
