import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  createNewItem,
  getCollection,
  updateStatus,
} from "./collection.thunks";
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
              (item: { id: string }) => item.id === action.payload.id
            );
            if (index !== -1) {
              state.data[index] = action.payload;
              state.data = state.data.sort(
                (a: { status: string }, b: { status: string }) =>
                  a.status === "archive" ? 1 : b.status === "archive" ? -1 : 0
              );
            }
          }
        }
      )
      .addCase(
        createNewItem.fulfilled,
        (state, action: PayloadAction<CollectionType>) => {
          if (state.data) {
            state.data.push(action.payload);
          } else {
            state.data = [action.payload];
          }
        }
      )
      .addCase(createNewItem.rejected, (state, action) => {
        state.httpErr = action.payload as string;
      });
  },
});

export const { setCollectionData } = collectionSlice.actions;

export const collectionReducer = collectionSlice.reducer;
