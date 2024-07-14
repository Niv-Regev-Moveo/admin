import { combineReducers } from "@reduxjs/toolkit";
import { collectionReducer } from "../chunks/collection/collection.slice";

const rootReducer = combineReducers({
  collectionState: collectionReducer,
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
