import axios from "axios";
import { Paginated, PostData, ResponseData } from "../interface";
import { BaseHandler } from "../template-abstract";

export class AlibabaHandler extends BaseHandler<ResponseData, PostData> {
  protected api = 'posts';

  parseData(result: Paginated<ResponseData>): number[] {
    console.log('parsing alibaba data...');
    const id = result.data[0].id;
    return [id, id+5];
  }

  async paginate(data: ResponseData): Promise<ResponseData | Paginated<ResponseData>> {
    console.log('paginating alibaba data...');

    const url = `${this.baseUrl}/${this.api}`
    const response = await axios.post<ResponseData>(url, data);
    return {
      page: 1,
      offset: 10,
      total: 10,
      data: [response.data],
    };
  }
}
