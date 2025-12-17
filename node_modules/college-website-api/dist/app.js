import compression from "compression";
import cors from "cors";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import router from "./routes/index.js";
export function createApp() {
    const app = express();
    app.use(helmet());
    app.use(cors({
        origin: (_origin, callback) => {
            // Allow any origin during scaffolding; tighten later when envs exist.
            callback(null, true);
        },
        credentials: true,
    }));
    app.use(express.json({ limit: "1mb" }));
    app.use(express.urlencoded({ extended: true }));
    app.use(compression());
    app.use(morgan("dev"));
    app.get("/", (_req, res) => {
        res.json({ message: "College Website API is running" });
    });
    app.use("/api", router);
    // Mount router at root fallback for serverless environments where /api prefix might be stripped
    app.use("/", router);
    app.use((_req, res) => {
        res.status(404).json({ message: "Route not found" });
    });
    return app;
}
//# sourceMappingURL=app.js.map