import { composio } from "./composio";
import { composioTools } from "./tools";
import {
  McpServer,
  ToolCallback,
} from "@modelcontextprotocol/sdk/server/mcp.js";
import { ZodRawShape } from "zod";
import { createToolExecutionHandler } from "./executionHandler";

export async function setupMcpServer(server: McpServer) {
  const tools = await composio.tools.get("default", {
    tools: composioTools,
  });

  try {
    for (const tool of tools) {
      // @ts-ignore
      const toolSchema = { 
        params: tool.schema,
      }
      

      const descriptionTemplates: Record<string, string> = {
        ['COMPOSIO_INITIATE_CONNECTION']:
          `Initiate a connection to the Composio app. For example, Composio might require specific parameters like 'api_key' to create a connection, which we can get by calling COMPOSIO_GET_REQUIRED_PARAMETERS. To create a new connection to Composio, call this tool with the required parameters.`,
        [`COMPOSIO_CHECK_ACTIVE_CONNECTION`]:
          `Check if any active connections exist for the Composio app or verify the status of a connection with a specific ID. If an active connection exists, returns true, otherwise returns false. Active connections allow an agent to perform actions with the Composio app.`,
        [`COMPOSIO_GET_REQUIRED_PARAMETERS`]:
          `Retrieves the necessary parameters required to initiate a connection with any app that is managed by Composio. Different tools require different parameters based on their authentication scheme. For example, Composio might require an API key, a subdomain, or a webhook URL. Tools using OAuth2 typically don't require parameters as they redirect users to the tool's website for authorization.`,
        [`COMPOSIO_SEARCH_ACTIONS`]:
          `Search for actions in the Composio app. Input schema: {apps: string[], use_case: string } where apps is an array of app name in Composio and use_case is a search query (Eg "send email" or "create a new task"). Output: { data: Array<{ action: string, description: string, schema: Record<string, any> }> }, The app name shoould be in lower case`,
        [`COMPOSIO_EXECUTE_ACTION`]:
          `Execute an action in the Composio app. Input schema: { action_name: string, request: Record<string, any> } where action_name is the name of the action to execute and request is the input for the action. Output: { success: boolean, message: string, result?: Record<string, any> }`,
      }

      const description = descriptionTemplates[tool.name];

      server.tool(
        tool.name,
        description,
        // @ts-ignore
        toolSchema,
        { title: tool.name },
        createToolExecutionHandler(tool.name) as ToolCallback<ZodRawShape>
      );
    }
  } catch (error) {
    console.error("Error setting up MCP server tools:", error);
    throw error;
  }
}
