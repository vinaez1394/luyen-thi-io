/**
 * App.tsx — Root component
 * Phase 02: Demo ThemePicker để test design system
 * (Sẽ được thay thế bằng Router + Pages ở các phase sau)
 */

import { ThemeProvider, useTheme } from "./components/ui/ThemeProvider";
import { ThemePicker } from "./components/ui/ThemePicker";

function AppContent() {
  const { themeInfo } = useTheme();

  return (
    <main
      style={{
        minHeight: "100dvh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "var(--space-4)",
        padding: "var(--space-4)",
      }}
    >
      {/* Header */}
      <div style={{ textAlign: "center" }}>
        <div style={{ fontSize: "64px", marginBottom: "var(--space-1)" }}>
          {themeInfo.emoji}
        </div>
        <h1
          style={{
            fontSize: "var(--font-2xl)",
            fontWeight: "var(--font-black)",
            color: "var(--color-primary)",
            marginBottom: "8px",
          }}
        >
          luyen-thi.io
        </h1>
        <p style={{ color: "var(--color-text-muted)", fontSize: "var(--font-sm)" }}>
          Luyện thi Cambridge Flyers 🇬🇧
        </p>
      </div>

      {/* Theme Picker Card */}
      <div className="card" style={{ width: "100%", maxWidth: "320px" }}>
        <ThemePicker />
      </div>

      {/* Design System Preview */}
      <div className="card" style={{ width: "100%", maxWidth: "320px" }}>
        <p
          style={{
            fontSize: "var(--font-xs)",
            color: "var(--color-text-muted)",
            marginBottom: "var(--space-2)",
            fontWeight: "var(--font-bold)",
            textTransform: "uppercase",
            letterSpacing: "0.05em",
          }}
        >
          Design System Preview
        </p>

        {/* Buttons */}
        <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-1)" }}>
          <button className="btn btn-primary" id="btn-demo-primary">
            ⭐ Bắt đầu luyện thi
          </button>
          <button className="btn btn-outline" id="btn-demo-outline">
            📊 Xem tiến độ
          </button>
          <button className="btn btn-ghost btn-sm" id="btn-demo-ghost">
            Cài đặt
          </button>
        </div>

        <div className="divider" style={{ margin: "var(--space-2) 0" }} />

        {/* Badges */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
          <span className="badge badge-primary">Flyers</span>
          <span className="badge badge-success">✓ Đúng</span>
          <span className="badge badge-danger">✗ Sai</span>
          <span className="badge badge-accent">⭐ 5 sao</span>
        </div>

        <div className="divider" style={{ margin: "var(--space-2) 0" }} />

        {/* Stars */}
        <div className="stars">
          <span className="star filled">★</span>
          <span className="star filled">★</span>
          <span className="star filled">★</span>
          <span className="star">★</span>
          <span className="star">★</span>
        </div>

        <div className="divider" style={{ margin: "var(--space-2) 0" }} />

        {/* Progress */}
        <div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "6px",
              fontSize: "var(--font-xs)",
              color: "var(--color-text-muted)",
            }}
          >
            <span>Tiến độ</span>
            <span>60%</span>
          </div>
          <div className="progress">
            <div className="progress-fill" style={{ width: "60%" }} />
          </div>
        </div>
      </div>

      <p
        style={{
          fontSize: "var(--font-xs)",
          color: "var(--color-text-light)",
          textAlign: "center",
        }}
      >
        Phase 02 — Theme System ✅
      </p>
    </main>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}
