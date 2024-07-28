import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchChefs } from "./chefs.thunks";
import { IChef } from "../collection.type";

interface ChefsState {
  chefs: { _id: string; name: string }[];
  loading: boolean;
  error: string | null;
}

const initialState: ChefsState = {
  chefs: [],
  loading: false,
  error: null,
};

const chefsSlice = createSlice({
  name: "chefs",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchChefs.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        fetchChefs.fulfilled,
        (state, action: PayloadAction<IChef[]>) => {
          state.loading = false;
          state.chefs = action.payload
            .filter(({ name }) => name !== undefined)
            .map(({ _id, name }) => ({ _id, name: name || "Unknown" }));
        }
      )
      .addCase(fetchChefs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Failed to fetch chefs";
      });
  },
});

export const chefsReducer = chefsSlice.reducer;
