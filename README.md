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
mcp-super/
├── package.json            # Project dependencies and scripts
├── pnpm-lock.yaml         # Lock file for pnpm
├── tsconfig.json          # TypeScript configuration
├── README.md              # This file
├── patches/               # Package patches
│   └── @modelcontextprotocol__sdk@1.13.2.patch
└── src/
    ├── lib/
    │   ├── composio.ts         # Composio client and API interactions
    │   ├── executionHandler.ts # Tool execution handling
    │   ├── setupMCP.ts        # MCP server setup and configuration
    │   └── tools.ts           # Tool definitions and schemas
    └── mcp-server.ts          # Main entry point
```

## Setup

1. **Install dependencies:**
   ```bash
   pnpm install
   ```

2. **Get your Composio API key:**
   - Visit [app.composio.dev](https://app.composio.dev)
   - Sign up or log in to your account
   - Navigate to the API keys section
   - Generate a new API key

3. **Configure the API key:**
   - Open `src/lib/composio.ts`
   - Replace `<YOUR_API_KEY>` with your actual Composio API key:
   ```typescript
   const composio = new Composio({
     apiKey: "your-actual-api-key-here",
     provider: new LangchainProvider(),
   });
   ```

4. **Build the project:**
   ```bash
   pnpm run build
   ```

## Configuration

### Server Configuration

The default configuration includes popular apps like GitHub, Gmail, Slack, Notion, and Calendar. You can customize this in `src/config/server-config.ts`:

## Usage

### Running the Server

**Development mode:**
```bash
pnpm run dev
```

**Production mode:**
```bash
pnpm run build:mcp
pnpm run mcp
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
      "args": ["/your/actual/path/to/mcp-super/build/mcp-server.js"]
    }
  }
}
```

#### Step 4: Build and Test

1. **Build the project** (for production mode):
   ```bash
   pnpm run build:mcp
   ```

2. **Restart Cursor** to load the new MCP server

3. **Test the connection**:
   - Open a new chat in Cursor
   - Type: "@mcp-super" to see available tools
   - Try using a tool like: "List my GitHub repositories"
