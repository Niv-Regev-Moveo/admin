import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  createNewItem,
  getCollection,
  updateStatus,
  updateItem,
} from "./collection.thunks";
import { ICommonItem } from "./collection.type";

interface CollectionState {
  data: ICommonItem[] | null;
  httpErr: string | undefined;
}

const initialState: CollectionState = {
  data: null,
  httpErr: undefined,
};

export const collectionSlice = createSlice({
  name: "collection",
  initialState,
  reducers: {
    setCollectionData: (state, action: PayloadAction<ICommonItem[]>) => {
      state.data = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(
        getCollection.fulfilled,
        (state, action: PayloadAction<ICommonItem[]>) => {
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
        (state, action: PayloadAction<ICommonItem>) => {
          if (state.data) {
            const index = state.data.findIndex(
              (item) => item._id === action.payload._id
            );
            if (index !== -1) {
              state.data[index] = action.payload;
              state.data = state.data.sort((a, b) =>
                a.status === "archive" ? 1 : b.status === "archive" ? -1 : 0
              );
            }
          }
        }
      )
      .addCase(
        createNewItem.fulfilled,
        (state, action: PayloadAction<ICommonItem>) => {
          if (state.data) {
            state.data.push(action.payload);
          } else {
            state.data = [action.payload];
          }
        }
      )
      .addCase(createNewItem.rejected, (state, action) => {
        state.httpErr = action.payload as string;
      })
      .addCase(
        updateItem.fulfilled,
        (state, action: PayloadAction<ICommonItem>) => {
          if (state.data) {
            const index = state.data.findIndex(
              (item) => item._id === action.payload._id
            );
            if (index !== -1) {
              state.data[index] = action.payload;
              state.data = state.data.sort((a, b) =>
                a.status === "archive" ? 1 : b.status === "archive" ? -1 : 0
              );
            }
          }
        }
      )
      .addCase(updateItem.rejected, (state, action) => {
        state.httpErr = action.payload as string;
      });
  },
});

export const { setCollectionData } = collectionSlice.actions;

export const collectionReducer = collectionSlice.reducer;
