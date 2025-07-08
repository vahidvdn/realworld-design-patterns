import { OpenAIClient } from "./openai-client";
import { OpenAIClientProxy } from "./openai-client-proxy";

const client = new OpenAIClient();
const proxy = new OpenAIClientProxy(client);

const run = async () => {
  await proxy.getResponse('FAQ2');  // Calls OpenAI
  await proxy.getResponse('FAQ2');  // Returns cached
};

run();
