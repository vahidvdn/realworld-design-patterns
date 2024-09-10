import { getProducts } from './utils'
import { PostData } from "./interface";
import axios from "axios";

describe('Template Method bad practice', () => {

  const data: PostData = {
    title: 'test title',
    body: 'title description',
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should fetch data', async () => {
    jest.spyOn(axios, 'post').mockReturnValueOnce(Promise.resolve({ data: { id: 5, ...data } }));
    jest.spyOn(axios, 'post').mockReturnValue(Promise.resolve({ data: { id: 6, ...data } }));

    const [parsedAmazon, parsedAlibaba] = await getProducts(data);
    expect(parsedAmazon).toEqual({ id: 5, ...data });
    expect(parsedAlibaba).toEqual({ id: 6, ...data, idWithTitle: '6 - test title' });
  })
})
