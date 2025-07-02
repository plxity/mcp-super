import { ZodRawShape, ZodTypeAny, z } from "zod";
import { composio } from "./composio";

export const createToolExecutionHandler = (originalToolName: string) => {
  return async (toolArgs: any) => {
    try {

      console.log(toolArgs)
      const result = await composio.tools.execute(originalToolName, {
        userId: "default",
        arguments: toolArgs?.params as Record<string, unknown>,
      });

      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(result.data, null, 2),
          },
        ],
      };
    } catch (error) {
      return {
        content: [
          {
            type: "text",
            text: `Error executing tool ${originalToolName}: ${
              error instanceof Error ? error.message : String(error)
            }`,
          },
        ],
      };
    }
  };
};
