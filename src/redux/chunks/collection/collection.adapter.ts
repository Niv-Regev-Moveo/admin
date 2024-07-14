import axios, { AxiosResponse } from "axios";
import { Collection } from "./collection.type";

const baseUrl = "http://localhost:3000/api/v1";
class CollectionAdapter {
  static readonly endpoint = `${baseUrl}`;

  async getCollection<T>(collection: Collection): Promise<AxiosResponse<T[]>> {
    const response = await axios.get<T[]>(
      `${CollectionAdapter.endpoint}/${collection}`
    );
    return response;
  }
}

const collectionAdapter = new CollectionAdapter();
export default collectionAdapter;
