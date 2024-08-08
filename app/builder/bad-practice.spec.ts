import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

import { PostData, QueryParam, ResponseData } from './interface';
import { makePostRequest } from './request';

describe('Builder bad practice', () => {
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

  it('should send request with axios', async () => {
    const data: PostData = {
      title: 'mock title',
      body: 'mock description',
    };

    const response: ResponseData = {
      ...data,
      id: 1
    }

    jest.spyOn(axios, 'post').mockReturnValue({ data: response } as unknown as Promise<AxiosResponse>)
    const result = await makePostRequest(data);
    expect(result).toEqual(response);
    expect(axios.post).toHaveBeenCalledTimes(1);
    expect(axios.post).toHaveBeenCalledWith('https://jsonplaceholder.typicode.com/posts', data, config);
  })
})
