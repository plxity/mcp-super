# MCP Super Server

A clean, modular MCP (Model Context Protocol) server implementation with Composio integration for personal use. This server provides access to various toolkits through Composio's API with a well-structured, maintainable codebase.

## Features

- **Clean Architecture**: Well-organized code structure with separate modules
- **Composio Integration**: Full access to Composio's toolkit ecosystem
- **TypeScript**: Fully typed for better development experience
- **Configurable**: Easy to configure which tools and apps to include
- **Error Handling**: Comprehensive error handling and logging
- **Extensible**: Easy to add new tools and customize behavior

## Project Structure

```
src/
├── lib/
│   ├── env.ts              # Environment configuration with validation
│   ├── logger.ts           # Logging utilities
│   ├── types.ts            # TypeScript type definitions
│   ├── composio.ts         # Composio client and API interactions
│   ├── tool-registry.ts    # Tool registration and management
│   └── mcp-server.ts       # Core MCP server implementation
├── config/
│   └── server-config.ts    # Server configuration
├── examples/
│   └── custom-config.ts    # Example custom configuration
└── mcp-server.ts           # Main entry point
```

## Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Configure environment:**
   ```bash
   cp .env.example .env
   # Edit .env with your Composio API key
   ```

3. **Build the project:**
   ```bash
   npm run build
   ```

## Configuration

### Environment Variables

Create a `.env` file with the following variables:

```env
COMPOSIO_API_KEY=your_composio_api_key_here
COMPOSIO_BASE_URL=https://api.composio.dev
INCLUDE_SEARCH_EXECUTE_ACTIONS=true
NODE_ENV=development
LOG_LEVEL=info
```

### Server Configuration

The default configuration includes popular apps like GitHub, Gmail, Slack, Notion, and Calendar. You can customize this in `src/config/server-config.ts`:

```typescript
export const defaultServerConfig: ServerConfig = {
  name: 'mcp-super-server',
  version: '1.0.0',
  tools: [
    {
      appName: 'github',
      useHelperActions: true,
    },
    {
      appName: 'gmail',
      actions: ['GMAIL_SEND_EMAIL', 'GMAIL_GET_EMAILS'], // Specific actions
      useHelperActions: true,
    },
    // Add more apps as needed
  ],
};
```

## Usage

### Running the Server

**Development mode:**
```bash
npm run dev
```

**Production mode:**
```bash
npm run build
npm run mcp
```

### Using with Cursor IDE

To use this MCP server with Cursor IDE, you need to configure it in your Cursor settings:

#### Step 1: Configure MCP Settings in Cursor

1. **Open Cursor Settings**: 
   - Press `Cmd+,` (Mac) or `Ctrl+,` (Windows/Linux)
   - Or go to `Cursor > Preferences > Settings`

2. **Search for MCP**: 
   - Type "MCP" in the search bar
   - Look for "MCP: Servers" setting

3. **Edit Configuration**:
   - Click "Edit in settings.json" 
   - Add the MCP server configuration

#### Step 2: Add MCP Server Configuration

Add this configuration to your Cursor `settings.json`:

**Production Mode (Recommended):**
```json
{
  "mcp.servers": {
    "mcp-super": {
      "command": "node",
      "args": ["/Users/apoorvtaneja/Desktop/mcp-super/dist/mcp-server.js"],
      "env": {
        "COMPOSIO_API_KEY": "your_composio_api_key_here",
        "LOG_LEVEL": "info"
      }
    }
  }
}
```

**Development Mode:**
```json
{
  "mcp.servers": {
    "mcp-super": {
      "command": "npx",
      "args": ["ts-node", "--esm", "/Users/apoorvtaneja/Desktop/mcp-super/src/mcp-server.ts"],
      "env": {
        "COMPOSIO_API_KEY": "your_composio_api_key_here",
        "LOG_LEVEL": "debug"
      }
    }
  }
}
```

#### Step 3: Update File Paths

**Important**: Replace `/Users/apoorvtaneja/Desktop/mcp-super` with your actual project path.

To find your project path:
```bash
cd /path/to/your/mcp-super
pwd
```

Then update the configuration with your actual path:
```json
{
  "mcp.servers": {
    "mcp-super": {
      "command": "node",
      "args": ["/your/actual/path/to/mcp-super/dist/mcp-server.js"],
      "env": {
        "COMPOSIO_API_KEY": "your_composio_api_key_here"
      }
    }
  }
}
```

#### Step 4: Build and Test

1. **Build the project** (for production mode):
   ```bash
   npm run build
   ```

2. **Restart Cursor** to load the new MCP server

3. **Test the connection**:
   - Open a new chat in Cursor
   - Type: "@mcp-super" to see available tools
   - Try using a tool like: "List my GitHub repositories"

#### Step 5: Verify Tools are Available

Once configured, you should see tools like:

**App-specific tools:**
- `GITHUB_GET_REPO` - Get repository information
- `GITHUB_CREATE_ISSUE` - Create GitHub issues
- `GMAIL_SEND_EMAIL` - Send emails
- `SLACK_SEND_MESSAGE` - Send Slack messages
- `NOTION_CREATE_PAGE` - Create Notion pages
- `CALENDAR_CREATE_EVENT` - Create calendar events

**Connection management tools:**
- `GITHUB_INITIATE_CONNECTION` - Setup GitHub connection
- `GMAIL_CHECK_ACTIVE_CONNECTION` - Check Gmail connection status
- `SLACK_GET_REQUIRED_PARAMETERS` - Get Slack connection parameters

**Search & Execute tools** (when `INCLUDE_SEARCH_EXECUTE_ACTIONS=true`):
- `GITHUB_SEARCH_ACTIONS` - Discover available GitHub actions
- `GITHUB_EXECUTE_ACTION` - Execute discovered GitHub actions
- `GMAIL_SEARCH_ACTIONS` - Discover available Gmail actions
- `GMAIL_EXECUTE_ACTION` - Execute discovered Gmail actions
- And similar search/execute pairs for all configured apps

#### Troubleshooting

**If tools don't appear:**
1. Check Cursor's developer console for errors
2. Verify your Composio API key is correct
3. Ensure the file path is absolute and correct
4. Try development mode first to see detailed logs

**Check server logs:**
```bash
# Run in development mode to see logs
npm run mcp:dev
```

**Common issues:**
- **Path not found**: Double-check the absolute path to your project
- **Permission denied**: Ensure the script has execute permissions
- **API key invalid**: Verify your Composio API key is active
- **Tools not loading**: Check if you have connected accounts for the apps you want to use

#### Environment Variables

You can also use a `.env` file instead of putting the API key in Cursor settings:

1. Create `.env` file in your project root:
   ```env
   COMPOSIO_API_KEY=your_composio_api_key_here
   INCLUDE_SEARCH_EXECUTE_ACTIONS=true
   LOG_LEVEL=info
   ```

2. Update Cursor config (remove the env section):
   ```json
   {
     "mcp.servers": {
       "mcp-super": {
         "command": "node",
         "args": ["/your/path/to/mcp-super/dist/mcp-server.js"]
       }
     }
   }
   ```

### Custom Configuration

You can create custom configurations for different use cases:

```typescript
import { createServerConfig } from './config/server-config.js';
import { McpServer } from './lib/mcp-server.js';

const customConfig = createServerConfig({
  name: 'my-custom-server',
  tools: [
    {
      appName: 'github',
      actions: ['GITHUB_GET_REPO', 'GITHUB_CREATE_ISSUE'],
      entityId: 'your-entity-id',
      connectedAccountId: 'your-connected-account-id',
    },
  ],
});

const server = new McpServer(customConfig);
await server.start();
```

## Available Scripts

- `npm run build` - Build the TypeScript project
- `npm run dev` - Run in development mode with hot reload
- `npm run mcp` - Run the built server
- `npm run mcp:dev` - Run in development mode
- `npm run clean` - Clean the dist directory

## Tool Configuration Options

### ComposioToolConfig

```typescript
interface ComposioToolConfig {
  appName: string;                    // Required: Name of the Composio app
  actions?: string[];                 // Optional: Specific actions to include
  entityId?: string;                  // Optional: Entity ID for user-specific tools
  connectedAccountId?: string;        // Optional: Connected account for OAuth apps
  useHelperActions?: boolean;         // Optional: Include helper actions (connection management)
}
```

### Examples

**Basic app integration:**
```typescript
{
  appName: 'github',
  useHelperActions: true,
}
```

**Specific actions only:**
```typescript
{
  appName: 'gmail',
  actions: ['GMAIL_SEND_EMAIL', 'GMAIL_GET_EMAILS'],
}
```

**With entity and connected account:**
```typescript
{
  appName: 'slack',
  entityId: 'user-123',
  connectedAccountId: 'conn-456',
  useHelperActions: true,
}
```

## Architecture

### Core Components

1. **ComposioClient**: Handles all interactions with the Composio API
2. **ToolRegistry**: Manages tool registration and execution
3. **McpServer**: Core MCP server implementation
4. **Logger**: Centralized logging with configurable levels
5. **Environment**: Type-safe environment variable handling

### Key Features

- **Automatic Tool Registration**: Tools are automatically registered based on configuration
- **Schema Conversion**: Composio schemas are automatically converted to MCP format
- **Error Handling**: Comprehensive error handling with proper logging
- **Type Safety**: Full TypeScript support with proper type definitions
- **Graceful Shutdown**: Proper cleanup on server shutdown

## Advanced Features

### Search & Execute Actions

When `INCLUDE_SEARCH_EXECUTE_ACTIONS=true`, the server includes powerful discovery and execution tools:

#### How It Works

1. **Discovery Phase**: Use `{APP}_SEARCH_ACTIONS` to find relevant actions
   ```typescript
   // Example: Find Gmail actions for sending emails
   GMAIL_SEARCH_ACTIONS({
     apps: ["gmail"],
     use_case: "send email to someone"
   })
   
   // Returns: List of relevant actions with descriptions and schemas
   ```

2. **Execution Phase**: Use `{APP}_EXECUTE_ACTION` to run discovered actions
   ```typescript
   // Example: Execute the discovered action
   GMAIL_EXECUTE_ACTION({
     action_name: "GMAIL_SEND_EMAIL",
     request: {
       to: "user@example.com",
       subject: "Hello",
       body: "Hello World!"
     }
   })
   ```

#### Use Cases

- **Dynamic Action Discovery**: When you're unsure which exact action to use
- **Cross-App Workflows**: Find similar actions across different apps
- **Learning Tool Capabilities**: Explore what's possible with each integration
- **Flexible Automation**: Build workflows that adapt based on available actions

#### Example Workflow

```
User: "I want to send a message but I'm not sure if I should use email or Slack"

1. GMAIL_SEARCH_ACTIONS({ use_case: "send message" })
   → Returns: GMAIL_SEND_EMAIL, GMAIL_REPLY_TO_EMAIL, etc.

2. SLACK_SEARCH_ACTIONS({ use_case: "send message" })  
   → Returns: SLACK_SEND_MESSAGE, SLACK_SEND_DM, etc.

3. Choose appropriate action and execute:
   SLACK_EXECUTE_ACTION({
     action_name: "SLACK_SEND_MESSAGE",
     request: { channel: "#general", message: "Hello team!" }
   })
```

## Extending the Server

### Adding New Apps

1. Add the app to your configuration:
   ```typescript
   {
     appName: 'your-new-app',
     useHelperActions: true,
   }
   ```

2. The server will automatically fetch and register available actions

### Custom Tool Handlers

You can extend the tool registry to add custom tools:

```typescript
import { toolRegistry } from './lib/tool-registry.js';

// Add custom tool
toolRegistry.registerCustomTool({
  name: 'custom_tool',
  description: 'My custom tool',
  inputSchema: { /* your schema */ },
  handler: async (args) => {
    // Your custom logic
    return { content: [{ type: 'text', text: 'Result' }] };
  },
});
```

## Dependencies

- **@modelcontextprotocol/sdk**: MCP server implementation  
- **@composio/core**: Composio integration
- **@t3-oss/env-core**: Type-safe environment variables
- **zod**: Schema validation
- **typescript**: TypeScript compiler
- **ts-node**: TypeScript execution for development

## License

ISC

## Contributing

This is a personal project, but feel free to fork and customize for your own use.
