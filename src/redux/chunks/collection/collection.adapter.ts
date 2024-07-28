import { AxiosResponse } from "axios";
import { Collection } from "./collection.type";
import { HttpClientService } from "../../../services/HttpClientService";

class CollectionAdapter {
  static readonly endpoint = "http://localhost:3000/api/v1";

  async getCollection<T>(collection: Collection): Promise<AxiosResponse<T[]>> {
    const response = await HttpClientService.get<T[]>(
      `${CollectionAdapter.endpoint}/${collection}`
    );
    return response;
  }

  async getById<T>(
    collection: Collection,
    id: string
  ): Promise<AxiosResponse<T>> {
    const response = await HttpClientService.get<T>(
      `${CollectionAdapter.endpoint}/${collection}/${id}`
    );
    return response;
  }

  async create<T>(collection: Collection, data: T): Promise<AxiosResponse<T>> {
    const response = await HttpClientService.post<T>(
      `${CollectionAdapter.endpoint}/${collection}`,
      data
    );
    return response;
  }

  async update<T>(
    collection: Collection,
    id: string,
    data: Partial<T>
  ): Promise<AxiosResponse<T>> {
    const response = await HttpClientService.put<T>(
      `${CollectionAdapter.endpoint}/${collection}/${id}`,
      data
    );
    return response;
  }

  async updateStatus<T>(
    collection: Collection,
    id: string,
    status: { status: string }
  ): Promise<AxiosResponse<T>> {
    const response = await HttpClientService.put<T>(
      `${CollectionAdapter.endpoint}/${collection}/${id}`,
      status
    );

    return response;
  }

  async delete(
    collection: Collection,
    id: string
  ): Promise<AxiosResponse<void>> {
    const response = await HttpClientService.delete<void>(
      `${CollectionAdapter.endpoint}/${collection}/${id}`,
      null
    );
    return response;
  }
}

const collectionAdapter = new CollectionAdapter();
export default collectionAdapter;
