// Import necessary modules (if any)
import dotenv from 'dotenv';
dotenv.config();

// Check if GITHUB_TOKEN exists in environment variables
if (!process.env.GITHUB_TOKEN) {
    console.error("❌ GITHUB_TOKEN is missing! Please create a .env file with the following content:\n\nGITHUB_TOKEN=your_personal_access_token\n\n🔗 You can generate a token at: https://github.com/settings/tokens");
    process.exit(1);
}

// Define the main async function
async function main() {
    console.log("🚀 Starting the JavaScript LangChain AI Agent...");
    // Add your application logic here
}

// Call the main function and handle errors
main().catch(console.error);