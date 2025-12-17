import mongoose from "mongoose";
import { env } from "../config/env.js";

export const connectMongo = async (uri?: string) => {
    try {
        const mongoUri = uri || env.mongoUri;
        if (!mongoUri) {
            console.warn("MONGO_URI not found in env, skipping DB connection");
            return;
        }

        await mongoose.connect(mongoUri);
        console.log("Connected to MongoDB successfully");
    } catch (error) {
        console.error("MongoDB connection error:", error);
        console.warn("⚠️  Server will continue without MongoDB. Some features may not work.");
        // Don't exit - allow server to run with JSON fallback
    }
};

export const disconnectMongo = async () => {
    try {
        await mongoose.disconnect();
        console.log("Disconnected from MongoDB successfully");
    } catch (error) {
        console.error("MongoDB disconnection error:", error);
    }
};
