import { OpenAIClient } from './openai-client';

describe('OpenAIClient', () => {
  it('should return a response for a given prompt', async () => {
    const client = new OpenAIClient();
    const prompt = 'Hello';
    const response = await client.getResponse(prompt);
    expect(response).toBe(`Response for: ${prompt}`);
  });
});
