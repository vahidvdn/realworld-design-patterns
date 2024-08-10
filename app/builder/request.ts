import axios, { AxiosRequestConfig } from "axios";

import { PostData, QueryParam, ResponseData } from "./interface";
import { url } from "./const";

export async function makePostRequest(data: PostData) {
  const queryParams: QueryParam = {
    status: 'active',
    role: 'user',
  };

  const config: AxiosRequestConfig = {
    headers: {
      'Authorization': 'Bearer your-access-token',
      'Content-Type': 'application/json',
    },
    params: queryParams,
  };

  try {
    const response = await axios.post<ResponseData>(url, data, config);
    console.log('Response Data:', response.data);
    return response.data
  } catch (error) {
    console.error('Error:', error);
  }
}
