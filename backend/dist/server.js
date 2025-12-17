import { createServer } from "http";
import { createApp } from "./app.js";
import { env } from "./config/env.js";
import { connectMongo } from "./lib/mongo.js";
import { readDb } from "./lib/db.js";
async function bootstrap() {
    const app = createApp();
    const server = createServer(app);
    // Initialize DB (creates file if missing) - Keep for static content
    await readDb();
    console.log("[db] local json storage initialized");
    // Connect to Mongo
    await connectMongo();
    server.listen(env.port, () => {
        console.log(`[server] listening on http://localhost:${env.port}`);
    });
}
bootstrap().catch((error) => {
    console.error("[server] failed to start", error);
    process.exit(1);
});
//# sourceMappingURL=server.js.map