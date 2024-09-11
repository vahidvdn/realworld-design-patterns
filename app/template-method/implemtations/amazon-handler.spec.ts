import axios from "axios";

import { PostData, ResponseData } from "../interface";
import { AmazonHandler } from "./amazon-handler";

describe('AmazonHandler', () => {
  const postData: PostData = {
    title: 'test title',
    body: 'title description',
  };

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should handle amazon data one by one', async () => {
    jest.spyOn(axios, 'post').mockReturnValue(Promise.resolve({ data: { id: 6, ...postData } }));
    const amazonHandler = new AmazonHandler();
    const result = await amazonHandler.fetchData(postData);
    expect(result).toEqual({ id: 6, ...postData });

    const paginated = await amazonHandler.paginate(result);
    expect(paginated).toEqual(result);

    const parsed = amazonHandler.parseData(paginated as ResponseData);
    expect(parsed).toEqual([6]);
  })

  it('should handle amazon data all in handle function', async () => {
    const amazonHandler = new AmazonHandler();
    jest.spyOn(AmazonHandler.prototype, 'fetchData').mockResolvedValue({ id: 6, ...postData });
    jest.spyOn(AmazonHandler.prototype, 'paginate').mockResolvedValue({ id: 6, ...postData });
    jest.spyOn(AmazonHandler.prototype, 'parseData').mockReturnValue([7]);

    const result = await amazonHandler.handle(postData);
    expect(result).toEqual([7]);
    expect(AmazonHandler.prototype.fetchData).toHaveBeenCalledTimes(1);
    expect(AmazonHandler.prototype.paginate).toHaveBeenCalledTimes(1);
    expect(AmazonHandler.prototype.parseData).toHaveBeenCalledTimes(1);
  })
})
