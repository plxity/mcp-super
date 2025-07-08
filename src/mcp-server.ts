#!/usr/bin/env node
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { setupMcpServer } from "./lib/setupMCP";

async function main(): Promise<void> {
  try {
    const server = new McpServer({
      name: "mcp-super",
      version: "1.0.0",
    });

    await setupMcpServer(server);

    const transport = new StdioServerTransport();
    await server.connect(transport);
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
}

main().catch((error) => {
  process.exit(1);
});
