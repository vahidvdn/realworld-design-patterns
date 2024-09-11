export interface IBaseHandler<T, K> {
  fetchData(data: K): Promise<T>;
  paginate(data: T): Promise<Paginated<T> | T>; // maybe has paginate, maybe not
  parseData(data: T): number[];
}

export interface Paginated<T> {
  page: number;
  offset: number;
  total: number;
  data: T[];
}

export interface ResponseData {
  title: string;
  body: string;
  id:  number;
}

export interface PostData {
  title: string;
  body: string;
}

export interface RequestPayload<T> {
  params: Record<string, string>;
  headers: Record<string, string>;
  data: T;
}


