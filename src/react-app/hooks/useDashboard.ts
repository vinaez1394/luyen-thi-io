/**
 * useDashboard.ts — Lấy data cho Dashboard page
 *
 * Gọi GET /api/student/dashboard để lấy:
 *   - streak, totalStars
 *   - skillLevels
 *   - dreamGoal (nếu có)
 *   - selectedPathway, currentGrade (Phase 04 — personalization)
 *   - todayLessons: max 3 bài gợi ý cho hôm nay (Phase 04)
 *
 * Nếu API chưa có (trả lỗi) → dùng fallback data thông minh
 */

import { useState, useEffect } from "react";
import type { SkillLevel } from "../components/dashboard/SkillMap";

// ============================================
// Types
// ============================================

export interface TodayLesson {
  id:        string;
  title:     string;
  subject:   string;
  emoji:     string;
  pathway:   string;
  group:     string;
  is_free:   boolean;
  skill?:    string;
}

export interface DashboardData {
  streak:          number;
  totalStars:      number;
  skillLevels:     SkillLevel[];
  dreamGoal: {
    title:   string;
    emoji:   string;
    current: number;
    target:  number;
  } | null;
  // Phase 04
  selectedPathway: string | null;
  currentGrade:    number | null;
  todayLessons:    TodayLesson[];
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
  streak:          1,
  totalStars:      0,
  skillLevels: [
    { skill: "math",      level: 2, quizzesDone: 0 },
    { skill: "reading",   level: 1, quizzesDone: 0 },
    { skill: "listening", level: 0, quizzesDone: 0 },
  ],
  dreamGoal:       null,
  selectedPathway: null,
  currentGrade:    null,
  todayLessons:    [],
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
