import { IRequestBuilder, RequestPayload } from './interface';

export class RequestBuilder<T = any> implements IRequestBuilder<T> {
  private requestPayload: RequestPayload<T>;

  constructor() {
    this.requestPayload = {} as unknown as any;
  }

  setParams<T extends Record<string, any>>(param: T): this {
    this.requestPayload.params = param;
    return this;
  }

  setBasicHeaders(): this {
    const token = `username:password`;
    const encodedToken = Buffer.from(token).toString('base64');
    this.requestPayload.headers = {
      ...this.requestPayload.headers,
      Authorization: `Basic ${encodedToken}`,
    };
    return this;
  }

  setHeaders(headers: Record<string, string>): this {
    this.requestPayload.headers = {
      ...this.requestPayload.headers,
      ...headers,
    };
    return this;
  }

  setBody(body: T): this {
    this.requestPayload.data = body;
    return this;
  }

  build(): RequestPayload<T> {
    return this.requestPayload;
  }
}
