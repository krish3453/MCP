import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";

const client =new Client({
    name: "MCP Client",
    version: "1.0.0",
})

const transport = new StdioClientTransport({
    command: "node",
    args: ["dist/server.js"],
});

await client.connect(transport);

const tools = await client.listTools();

console.log(tools);


const result = await client.callTool({
    name: "add",
    arguments: {
        a: 10,
        b: 20,
    },
});

const res=await client.callTool({
    name:"greet",
    arguments:{
        name:"Krishna",
    }
})

console.log(result);
console.log(res);