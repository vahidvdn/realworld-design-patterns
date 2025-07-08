import { IOpenAI } from "./interface";

export class OpenAIClient implements IOpenAI {
  async getResponse(prompt: string): Promise<string> {
    // Simulate OpenAI API call
    console.log('Calling OpenAI...');
    return `Response for: ${prompt}`;
  }
}
