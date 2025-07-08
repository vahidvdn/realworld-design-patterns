export interface IOpenAI {
  getResponse(prompt: string): Promise<string>;
}
