import { Hono } from "hono";
import { healthRoute } from "./routes/health";

const app = new Hono<{ Bindings: Env }>();

// =============================================
// Routes
// =============================================

// Health check (Phase 01 — test D1 connection)
app.route("/api/health", healthRoute);

// Default API route (placeholder)
app.get("/api/", (c) => c.json({ name: "luyen-thi-io API", version: "0.1.0" }));

export default app;
