import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchRestaurants } from "./restaurants.thunks";
import { IRestaurant } from "../collection.type";

interface RestaurantsState {
  restaurants: { _id: string; name: string }[];
  loading: boolean;
  error: string | null;
}

const initialState: RestaurantsState = {
  restaurants: [],
  loading: false,
  error: null,
};

const restaurantsSlice = createSlice({
  name: "restaurants",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRestaurants.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        fetchRestaurants.fulfilled,
        (state, action: PayloadAction<IRestaurant[]>) => {
          state.loading = false;
          state.restaurants = action.payload
            .filter(({ name }) => name !== undefined)
            .map(({ _id, name }) => ({ _id, name: name || "Unknown" }));
        }
      )
      .addCase(fetchRestaurants.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Failed to fetch restaurants";
      });
  },
});

export const restaurantsReducer = restaurantsSlice.reducer;
