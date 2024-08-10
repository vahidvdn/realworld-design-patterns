import axios from 'axios';
import { makePostRequest } from './request';
import { PostData } from './interface';

describe('Builder', () => {
  const data: PostData = {
    title: 'test title',
    body: 'test body',
  }

  it('should send request with axios', async () => {
    jest.spyOn(axios, 'post').mockReturnValueOnce(Promise.resolve({ data : { id: 4 } }));
    const result = await makePostRequest(data);
    expect(result).toEqual({ id: 4 });
  })

  it('should fail request', async () => {
    jest.spyOn(axios, 'post').mockReturnValueOnce(Promise.reject({ error: 'error' }));
    const result = await makePostRequest(data);
    expect(result).toEqual({ error: 'error' });
  })
})
