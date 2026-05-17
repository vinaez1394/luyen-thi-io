import { Hono } from "hono";
import { cors } from "hono/cors";
import { healthRoute } from "./routes/health";
import { authRoute } from "./routes/auth";
import { emailAuthRoute } from "./routes/email-auth";
import { studentRoute } from "./routes/student";
import { quizRoute } from "./routes/quiz";
import { vocabularyRoute } from "./routes/vocabulary";
import { progressRoute } from "./routes/progress";
import { blogRoutes } from "./routes/blog";
import { subjectsRoute } from "./routes/subjects";

const app = new Hono<{ Bindings: Env }>();

// =============================================
// 🔒 Security Headers (global middleware)
// =============================================
app.use("*", async (c, next) => {
  await next();
  // Chỉ thêm headers cho API responses, không ghi đè nếu đã có
  c.res.headers.set("X-Content-Type-Options", "nosniff");
  c.res.headers.set("X-Frame-Options", "DENY");
  c.res.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  c.res.headers.set("Permissions-Policy", "camera=(), microphone=(), geolocation=()");
});

// =============================================
// 🌐 CORS — chỉ cho phép domain chính
// =============================================
app.use("/api/*", cors({
  origin: [
    "https://luyenthi.io.vn",
    "https://www.luyenthi.io.vn",
    "https://dev.luyenthi.io.vn",          // staging
    "https://luyen-thi-io.vinaez1394.workers.dev",
    "http://localhost:8788",               // wrangler dev
    "http://localhost:5175",               // vite dev (primary)
    "http://localhost:5173",               // vite dev (fallback)
    "http://localhost:5174",               // vite dev (fallback 2)
  ],
  allowMethods: ["GET", "POST", "OPTIONS"],
  allowHeaders: ["Content-Type", "Cookie"],
  credentials: true,
  maxAge: 86400, // 24h preflight cache
}));

// =============================================
// Routes
// =============================================

// Health check (Phase 01)
app.route("/api/health", healthRoute);

// Auth — Google OAuth (Phase 03)
app.route("/api/auth", authRoute);

// Auth — Email OTP
app.route("/api/auth/email", emailAuthRoute);

// Student profile (Phase 03 — Onboarding)
app.route("/api/student", studentRoute);

// Quiz Engine (Phase 04)
app.route("/api/quiz", quizRoute);

// Quiz Catalog (Phase 05)
app.route("/api/subjects", subjectsRoute);

// Vocabulary — Hangman word pool từ D1
app.route("/api/vocabulary", vocabularyRoute);

// Progress summary (Dashboard Phase 3)
app.route("/api/student", progressRoute);

// Blog "Kiến Thức" (Phase Blog-01)
app.route("/api/blog", blogRoutes);

// Default API route
app.get("/api/", (c) => c.json({ name: "luyen-thi-io API", version: "0.1.0" }));

export default app;
