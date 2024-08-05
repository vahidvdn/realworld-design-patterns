import axios, { AxiosRequestConfig } from 'axios';
import { PostData, ResponseData } from './interface';

async function makePostRequest() {
  const data: PostData = {
    title: 'test title',
    body: 'title description',
  };

  const queryParams = {
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
    const response = await axios.post<ResponseData>(
      'https://jsonplaceholder.typicode.com/posts', // Replace with your API endpoint
      data,
      config
    );
    console.log('Response Data:', response.data);
  } catch (error) {
    console.error('Error:', error);
  }
}

makePostRequest();
