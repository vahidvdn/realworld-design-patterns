import axios from "axios";

import { Paginated, PostData, ResponseData } from "../interface";
import { AlibabaHandler } from "./alibaba.handler";

describe('AlibabaHandler', () => {
  const postData: PostData = {
    title: 'test title',
    body: 'title description',
  };

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should handle amazon data', async () => {
    jest.spyOn(axios, 'post').mockReturnValue(Promise.resolve({ data: { id: 6, ...postData } }));
    const alibabaHandler = new AlibabaHandler();
    const result = await alibabaHandler.fetchData(postData);
    expect(result).toEqual({ id: 6, ...postData });

    const paginated = await alibabaHandler.paginate(result);
    expect(paginated).toEqual({
      page: 1,
      offset: 10,
      total: 10,
      data: [result],
    });

    const parsed = alibabaHandler.parseData(paginated as Paginated<ResponseData>);
    expect(parsed).toEqual([6, 11]);
  })

  it('should handle amazon data all in handle function', async () => {
    const amazonHandler = new AlibabaHandler();
    jest.spyOn(AlibabaHandler.prototype, 'fetchData').mockResolvedValue({ id: 6, ...postData });
    jest.spyOn(AlibabaHandler.prototype, 'paginate').mockResolvedValue({ id: 6, ...postData });
    jest.spyOn(AlibabaHandler.prototype, 'parseData').mockReturnValue([7]);

    const result = await amazonHandler.handle(postData);
    expect(result).toEqual([7]);
    expect(AlibabaHandler.prototype.fetchData).toHaveBeenCalledTimes(1);
    expect(AlibabaHandler.prototype.paginate).toHaveBeenCalledTimes(1);
    expect(AlibabaHandler.prototype.parseData).toHaveBeenCalledTimes(1);
  })
})
