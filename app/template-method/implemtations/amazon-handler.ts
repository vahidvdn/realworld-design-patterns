import { PostData, ResponseData } from "../interface";
import { BaseHandler } from "../template-abstract";

export class AmazonHandler extends BaseHandler<ResponseData, PostData> {
  parseData(data: ResponseData): number[] {
    console.log('parsing amazon data...');

    const id = data.id;
    return [id];
  }
}
