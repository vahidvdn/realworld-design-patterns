import { IOpenAI } from "./interface";
import { OpenAIClient } from "./openai-client";

export class OpenAIClientProxy implements IOpenAI {
  private cache = new Map<string, string>();

  constructor(private realClient: OpenAIClient) {}

  async getResponse(prompt: string): Promise<string> {
    if (this.shouldCache(prompt)) {
      if (this.cache.has(prompt)) {
        console.log('Returning cached result...');
        return this.cache.get(prompt)!;
      }
    }

    const response = await this.realClient.getResponse(prompt);

    if (this.shouldCache(prompt)) {
      this.cache.set(prompt, response);
    }

    return response;
  }

  private shouldCache(prompt: string): boolean {
    // Simple keyword-based condition. Customize as needed.
    const keywordsToCache = ['FAQ1', 'FAQ2', 'FAQ3'];
    return keywordsToCache.some(keyword => prompt.includes(keyword));
  }
}
