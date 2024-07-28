import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchDishes } from "./dishes.thunks";
import { IDish } from "../collection.type";

interface DishesState {
  dishes: { _id: string; name: string }[];
  loading: boolean;
  error: string | null;
}

const initialState: DishesState = {
  dishes: [],
  loading: false,
  error: null,
};

const dishesSlice = createSlice({
  name: "dishes",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDishes.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        fetchDishes.fulfilled,
        (state, action: PayloadAction<IDish[]>) => {
          state.loading = false;
          state.dishes = action.payload
            .filter(({ name }) => name !== undefined)
            .map(({ _id, name }) => ({ _id, name: name || "Unknown" }));
        }
      )
      .addCase(fetchDishes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Failed to fetch dishes";
      });
  },
});

export const dishesReducer = dishesSlice.reducer;
