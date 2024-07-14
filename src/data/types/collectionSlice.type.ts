export interface CollectionSlice<T> {
  data: T[] | null;
  httpErr: string | undefined;
}
