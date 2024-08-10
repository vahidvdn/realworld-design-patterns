import { RequestBuilder } from "./builder.pattern";
import { PostData } from "./interface";

describe('Builder pattern', () => {
  const builder = new RequestBuilder();
  const data: PostData = {
    title: 'mock title',
    body: 'mock description',
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should build a request to send with axios', async () => {
    const request = builder
      .setParams({ name: 'John Doe' })
      .setBasicHeaders()
      .setBody(data)
      .build();

    expect(request.data).toEqual(data)
    expect(request.headers).toEqual({
      Authorization: 'Basic dXNlcm5hbWU6cGFzc3dvcmQ='
    })
    expect(request.params).toEqual({ name: 'John Doe' })
  })

  it('should preserve other headers when basic header is set', async () => {
    const request = builder
      .setHeaders({ 'Content-Type': 'application/json' })
      .setBasicHeaders()
      .build();

      expect(request.headers).toEqual({
        Authorization: 'Basic dXNlcm5hbWU6cGFzc3dvcmQ=',
        'Content-Type': 'application/json',
      })
  })

  it('should preserve basic header when other headers is set', async () => {
    const request = builder
      .setBasicHeaders()
      .setHeaders({ 'Content-Type': 'application/json' })
      .build();

      expect(request.headers).toEqual({
        Authorization: 'Basic dXNlcm5hbWU6cGFzc3dvcmQ=',
        'Content-Type': 'application/json',
      })
  })
})
