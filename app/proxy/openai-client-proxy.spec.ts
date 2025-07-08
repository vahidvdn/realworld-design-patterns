import { OpenAIClient } from './openai-client';
import { OpenAIClientProxy } from './openai-client-proxy';

describe('OpenAIClientProxy', () => {
  let realClient: OpenAIClient;
  let proxy: OpenAIClientProxy;

  beforeEach(() => {
    realClient = new OpenAIClient();
    proxy = new OpenAIClientProxy(realClient);
  });

  it('should call real client if prompt is not cacheable', async () => {
    const spy = jest.spyOn(realClient, 'getResponse');
    const response = await proxy.getResponse('Tell me something');
    expect(response).toBe('Response for: Tell me something');
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('should cache response for cacheable prompts', async () => {
    const spy = jest.spyOn(realClient, 'getResponse');

    const prompt = 'FAQ1';
    const response1 = await proxy.getResponse(prompt); // first call
    const response2 = await proxy.getResponse(prompt); // second call should be cached

    expect(response1).toBe('Response for: FAQ1');
    expect(response2).toBe(response1);
    expect(spy).toHaveBeenCalledTimes(1); // should only call real client once
  });

  it('should not cache different prompts even if both are cacheable', async () => {
    const spy = jest.spyOn(realClient, 'getResponse');

    const response1 = await proxy.getResponse('FAQ2');
    const response2 = await proxy.getResponse('FAQ3');

    expect(spy).toHaveBeenCalledTimes(2);
    expect(response1).not.toBe(response2);
  });
});
