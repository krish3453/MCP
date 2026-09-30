import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";

const server =new McpServer({
    name: "MCP Server",
    version: "1.0.0",
})


// server.tool(
//     "add",
//     "Add two numbers",{
//         a:{
//             type: "number",
//             description: "First number",
//             required: true,
//         },
//         b:{
//             type:"number",
//             description: "Second number",
//             required: true,
//         },
//     },
// async({a,b})=>{
//     return {
//         type:"text",
//         text: String(a+b),
//     }
// })


server.tool(
  "add",
  "Add two numbers",
  {
    a: z.number().describe("First number"),
    b: z.number().describe("Second number"),
  },
  async ({ a, b }) => {
    return {
      content: [
        {
          type: "text",
          text: String(a + b),
        },
      ],
    };
  }
);




server.tool(
  "greet",
  "Greet a person",
  {
    name: z.string().describe("The name of the person to greet"),
  },
  async ({ name }) => {
    return {
      content: [
        {
          type: "text",
          text: `Hello, ${name}!`,
        },
      ],
    };
  }
);

const transport = new StdioServerTransport();

await server.connect(transport);