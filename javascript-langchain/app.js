import { ChatOpenAI } from '@langchain/openai';
import dotenv from 'dotenv';

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
}

// Call the main function and handle errors
main().catch(console.error);