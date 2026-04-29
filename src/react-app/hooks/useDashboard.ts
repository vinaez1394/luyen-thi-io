/**
 * useDashboard.ts — Lấy data cho Dashboard page
 *
 * Gọi GET /api/student/dashboard để lấy:
 *   - streak, totalStars
 *   - skillLevels
 *   - dreamGoal (nếu có)
 *
 * Nếu API chưa có (trả lỗi) → dùng fallback data thông minh
 * Sau khi Phase 01 (D1) production → API sẽ trả data thực
 *
 * Phase 07
 */

import { useState, useEffect } from "react";
import type { SkillLevel } from "../components/dashboard/SkillMap";

// ============================================
// Types
// ============================================
export interface DashboardData {
  streak:      number;
  totalStars:  number;
  skillLevels: SkillLevel[];
  dreamGoal: {
    title:   string;
    emoji:   string;
    current: number;
    target:  number;
  } | null;
}

interface DashboardState {
  data:      DashboardData | null;
  isLoading: boolean;
  error:     string | null;
}

// ============================================
// Fallback data (khi API chưa sẵn sàng)
// ============================================
const FALLBACK_DATA: DashboardData = {
  streak:     1,
  totalStars: 0,
  skillLevels: [
    { skill: "math",      level: 2, quizzesDone: 0 },
    { skill: "reading",   level: 1, quizzesDone: 0 },
    { skill: "listening", level: 0, quizzesDone: 0 },
  ],
  dreamGoal: null,
};

// ============================================
// Hook
// ============================================
export function useDashboard() {
  const [state, setState] = useState<DashboardState>({
    data:      null,
    isLoading: true,
    error:     null,
  });

  useEffect(() => {
    let cancelled = false;

    async function fetchDashboard() {
      try {
        const res = await fetch("/api/student/dashboard");

        if (res.ok) {
          const json = (await res.json()) as DashboardData;
          if (!cancelled) {
            setState({ data: json, isLoading: false, error: null });
          }
        } else {
          // API chưa có hoặc lỗi → dùng fallback
          if (!cancelled) {
            setState({ data: FALLBACK_DATA, isLoading: false, error: null });
          }
        }
      } catch {
        // Network error → dùng fallback
        if (!cancelled) {
          setState({ data: FALLBACK_DATA, isLoading: false, error: null });
        }
      }
    }

    fetchDashboard();
    return () => { cancelled = true; };
  }, []);

  return state;
}
