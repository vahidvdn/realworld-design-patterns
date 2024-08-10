import axios from 'axios';

import { RequestBuilder } from "./builder.pattern";
import { ResponseData } from "./interface";
import { url } from './const';


export const sendRequest = async () => {
  const builder = new RequestBuilder();
  const request = builder
    .setParams({ name: 'John Doe' })
    .setHeaders({ 'Content-Type': 'application/json' })
    .setBasicHeaders()
    .setBody({ title: 'this is title', body: 'this is body' })
    .build();

  const response = await axios.post<ResponseData>(url, request.data, request);
  console.log(response.data)
  return response.data
}

sendRequest();
