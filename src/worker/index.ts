import { Hono } from "hono";
import { healthRoute } from "./routes/health";
import { authRoute } from "./routes/auth";
import { emailAuthRoute } from "./routes/email-auth";
import { studentRoute } from "./routes/student";
import { quizRoute } from "./routes/quiz";
import { vocabularyRoute } from "./routes/vocabulary";
import { progressRoute } from "./routes/progress";
import { blogRoutes } from "./routes/blog";

const app = new Hono<{ Bindings: Env }>();

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

// Vocabulary — Hangman word pool từ D1
app.route("/api/vocabulary", vocabularyRoute);

// Progress summary (Dashboard Phase 3)
app.route("/api/student", progressRoute);

// Blog "Kiến Thức" (Phase Blog-01)
app.route("/api/blog", blogRoutes);

// Default API route
app.get("/api/", (c) => c.json({ name: "luyen-thi-io API", version: "0.1.0" }));

export default app;
