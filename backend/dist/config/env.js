import { config } from "dotenv";
config();
const commaSeparated = (value) => value
    ?.split(",")
    .map((item) => item.trim())
    .filter(Boolean) ?? [];
export const env = {
    nodeEnv: process.env.NODE_ENV ?? "development",
    port: Number(process.env.PORT ?? 5001),
    mongoUri: process.env.MONGO_URI ?? "",
    corsOrigins: commaSeparated(process.env.CORS_ORIGINS) ?? ["*"],
    smtp: {
        host: process.env.SMTP_HOST ?? "",
        port: Number(process.env.SMTP_PORT ?? 587),
        user: process.env.SMTP_USER ?? "",
        pass: process.env.SMTP_PASS ?? "",
        from: process.env.SMTP_FROM ?? "admissions@example.com",
    },
    // Direct access for convenience
    SMTP_HOST: process.env.SMTP_HOST ?? "",
    SMTP_PORT: Number(process.env.SMTP_PORT ?? 587),
    SMTP_USER: process.env.SMTP_USER ?? "",
    SMTP_PASS: process.env.SMTP_PASS ?? "",
};
export const isProd = env.nodeEnv === "production";
if (!env.mongoUri) {
    console.warn("[env] MONGO_URI is not set. API will start without DB.");
}
//# sourceMappingURL=env.js.map