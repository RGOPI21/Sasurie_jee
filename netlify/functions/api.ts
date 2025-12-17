import serverless from "serverless-http";
import { createApp } from "../../backend/src/app.js";
import { connectMongo } from "../../backend/src/lib/mongo.js";
import { readDb } from "../../backend/src/lib/db.js";

// Initialize database connections once
let isInitialized = false;

async function initialize() {
    if (!isInitialized) {
        try {
            // Initialize JSON DB
            await readDb();
            console.log("[netlify] JSON DB initialized");

            // Connect to MongoDB
            await connectMongo();
            console.log("[netlify] MongoDB connected");

            isInitialized = true;
        } catch (error) {
            console.error("[netlify] Initialization error:", error);
            // Continue anyway - some features may work without full DB
        }
    }
}

// Create the Express app
const app = createApp();

// Export the serverless handler
export const handler = async (event: any, context: any) => {
    // Initialize on first request
    await initialize();

    // Create serverless handler
    const serverlessHandler = serverless(app);

    // Handle the request
    return serverlessHandler(event, context);
};
