import { Hono } from "hono";

/**
 * Route: GET /api/health
 *
 * Kiểm tra kết nối D1 database và list các tables
 * Dùng để verify Phase 01 setup hoàn chỉnh
 */

type Env = {
  DB: D1Database;
};

export const healthRoute = new Hono<{ Bindings: Env }>();

healthRoute.get("/", async (c) => {
  try {
    // Query danh sách tables từ D1 (SQLite internal table)
    const result = await c.env.DB.prepare(
      "SELECT name FROM sqlite_master WHERE type='table' ORDER BY name"
    ).all<{ name: string }>();

    const tables = result.results.map((row) => row.name);

    // Kiểm tra đủ 7 bảng cần thiết
    const requiredTables = [
      "daily_activity",
      "dream_goals",
      "quiz_attempts",
      "student_profiles",
      "student_stats",
      "subscriptions",
      "users",
    ];

    const missingTables = requiredTables.filter(
      (t) => !tables.includes(t)
    );

    return c.json({
      ok: true,
      timestamp: new Date().toISOString(),
      database: {
        connected: true,
        tables,
        tableCount: tables.length,
        allTablesPresent: missingTables.length === 0,
        missingTables: missingTables.length > 0 ? missingTables : undefined,
      },
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unknown error";

    return c.json(
      {
        ok: false,
        timestamp: new Date().toISOString(),
        error: message,
        hint: "Kiểm tra D1 binding 'DB' trong wrangler.json",
      },
      500
    );
  }
});
