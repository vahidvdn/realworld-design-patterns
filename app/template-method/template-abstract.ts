import { IBaseHandler, Paginated } from "./interface";
import axios, { AxiosRequestConfig } from "axios";

export abstract class BaseHandler<T, K> implements IBaseHandler<T, K> {
  protected baseUrl = 'https://jsonplaceholder.typicode.com';
  protected api = 'posts';

  abstract parseData(data: T | Paginated<T>): number[];

  async fetchData(data: K): Promise<T> {
    const url = `${this.baseUrl}/${this.api}`
    const config: AxiosRequestConfig = {
      headers: {
        'Authorization': 'Bearer your-access-token',
        'Content-Type': 'application/json',
      },
    };
    const response = await axios.post<T>(url, data, config);
    return response.data;
  }

  async paginate(data: T): Promise<T | Paginated<T>> {
    return data;
  }

  async handle(data: K) {
    const result = await this.fetchData(data);
    const paginated = await this.paginate(result);
    const parsed = this.parseData(paginated);
    return parsed;
  }

}
