import { Reducer } from "@reduxjs/toolkit";
import { ICommonItem } from "../chunks/collection/collection.type";

export interface RootState {
  collectionState: Reducer<ICommonItem>;
}
