import OpenAI from "openai";

let client: OpenAI | null = null;

export function getOpenAIClient(): OpenAI {
  const baseURL = process.env.AI_INTEGRATIONS_OPENAI_BASE_URL;
  const apiKey = process.env.AI_INTEGRATIONS_OPENAI_API_KEY;

  if (!baseURL) {
    throw new Error(
      "AI_INTEGRATIONS_OPENAI_BASE_URL must be set. Did you forget to provision the OpenAI AI integration?",
    );
  }

  if (!apiKey) {
    throw new Error(
      "AI_INTEGRATIONS_OPENAI_API_KEY must be set. Did you forget to provision the OpenAI AI integration?",
    );
  }

  client ??= new OpenAI({
    apiKey,
    baseURL,
  });

  return client;
}

export const openai = new Proxy({} as OpenAI, {
  get(_target, prop) {
    const value = getOpenAIClient()[prop as keyof OpenAI];
    return typeof value === "function" ? value.bind(getOpenAIClient()) : value;
  },
});
