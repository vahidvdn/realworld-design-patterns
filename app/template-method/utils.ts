import axios, { AxiosRequestConfig } from "axios";

import { PostData, ResponseData } from "./interface";

export const url = 'https://jsonplaceholder.typicode.com/posts';

export const getProducts = async (data) => {
  const amazonProducts = await makePostRequest(data);
  const paginatedAmazonProducts = await paginateAmazonData(amazonProducts);
  const parsedAmazon = await parseAmazonData(paginatedAmazonProducts);

  const alibabaProducts = await makePostRequest(data);
  const paginatedAlibabaProducts = await paginateAlibabaData(alibabaProducts);
  const parsedAlibaba = await parseAlibabaData(paginatedAlibabaProducts);

  console.log(parsedAmazon, parsedAlibaba);
  return [parsedAmazon, parsedAlibaba];
}

export async function makePostRequest(data: PostData) {
  const config: AxiosRequestConfig = {
    headers: {
      'Authorization': 'Bearer your-access-token',
      'Content-Type': 'application/json',
    },
  };

  try {
    const response = await axios.post<ResponseData>(url, data, config);
    return response.data
  } catch (error) {
    return error;
  }
}

export const paginateAmazonData = async (data) => {
  console.log('do pagination...');
  return data;
}

export const parseAmazonData = async (data) => {
  console.log('parse amazon data...');
  return data;
}

export const paginateAlibabaData = async (data) => {
  console.log('do pagination...');
  return data;
}

export const parseAlibabaData = async (data) => {
  console.log('parse amazon data...');
  return {...data, idWithTitle: `${data.id} - ${data.title}`};
}
