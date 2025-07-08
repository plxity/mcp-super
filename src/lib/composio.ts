import { Composio } from "@composio/core";
import { LangchainProvider } from "@composio/langchain";

const composio = new Composio({
  apiKey: "<YOUR_API_KEY>",
  provider: new LangchainProvider(),
});

export { composio };
