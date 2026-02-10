import { ChatOpenAI } from '@langchain/openai';
import dotenv from 'dotenv';
import { initializeAgentExecutorWithOptions } from "langchain/tools";
import { Calculator } from "@langchain/community/tools/calculator";
import { DynamicTool } from "@langchain/core/tools";

dotenv.config({ path: './javascript-langchain/.env' });

// Define the main async function
async function main() {
    console.log("🚀 Starting the JavaScript LangChain AI Agent...");
    // Add your application logic here

    // Check if GITHUB_TOKEN exists in environment variables
    if (!process.env.GITHUB_TOKEN) {
        console.error("❌ GITHUB_TOKEN is missing! Please create a .env file with the following content:\n\nGITHUB_TOKEN=your_personal_access_token\n\n🔗 You can generate a token at: https://github.com/settings/tokens");
        process.exit(1);
    }

    // Create a ChatOpenAI instance
    const chat = new ChatOpenAI({
        model: 'openai/gpt-4o',
        temperature: 0,
        configuration: {
            baseURL: 'https://models.github.ai/inference',
            apiKey: process.env.GITHUB_TOKEN
        }
    });


    // Define tools for the agent
    const tools = [
    new Calculator(),
    new DynamicTool({
      name: "get_current_time",
      description: "Returns the current date and time. Use this when you need to know what time it is.",
      func: async () => {
        return new Date().toString();
      },
    }),
    new DynamicTool({
      name: "reverse_string",
      description: "Reverses a string. Input should be a single string.",
      func: async (input) => {
        return input.split("").reverse().join("");
      },
    }),
    ];


// Create the agent
  const executor = await initializeAgentExecutorWithOptions(tools, model, {
    agentType: "openai-functions",
    verbose: true,
    agentArgs: {
      prefix: "You are a professional and helpful AI assistant. Provide succinct, accurate responses.",
    },
  });


  // Example queries
  const queries = [
    "What time is it right now?",
    "What is 25 * 4 + 10?",
    "Reverse the string 'Hello World'",
  ];

  console.log("Running example queries:\n");

  for (const query of queries) {
    console.log(`\n📝 Query: ${query}`);
    console.log("─".repeat(50));
    
    try {
      const result = await executor.invoke({ input: query });
      console.log(`\n✅ Result: ${result.output}\n`);
    } catch (error) {
      console.error(`❌ Error: ${error.message}\n`);
    }
  }

  console.log("\n🎉 Agent demo complete!");
}

// Call the main function and handle errors
main().catch(console.error);