import { configureStore } from "@reduxjs/toolkit";
import { collectionReducer } from "./../chunks/collection/collection.slice";
import { chefsReducer } from "./../chunks/collection/chefs/chefs.slice"; // Adjust the import path as necessary
import { restaurantsReducer } from "../chunks/collection/restaurants/restaurants.slice";
import { authReducer } from "../chunks/collection/auth/auth.slice";

export const store = configureStore({
  reducer: {
    collectionState: collectionReducer,
    chefsState: chefsReducer,
    restaurantsState: restaurantsReducer,
    authState: authReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
