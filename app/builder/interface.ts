export interface ResponseData {
  title: string;
  body: string;
  id:  number;
}

export interface PostData {
  title: string;
  body: string;
}

export interface QueryParam {
  status: string;
  role: string;
}

export interface IRequestBuilder<T = any> {
  setParams(params: Record<string, string>): this;
  setBasicHeaders(): this;
  build(): RequestPayload<T>;
}

export interface RequestPayload<T> {
  params: Record<string, string>;
  headers: Record<string, string>;
  data: T;
}


