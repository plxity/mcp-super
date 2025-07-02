import { Composio } from "@composio/core";
import { LangchainProvider } from "@composio/langchain";

const composio = new Composio({
  apiKey: "nlqu5p3ru4a45ufyp3lgb2",
  provider: new LangchainProvider(),
});

export { composio };
