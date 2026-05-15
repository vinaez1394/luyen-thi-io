/**
 * useDashboard.ts — Lấy data cho Dashboard page
 *
 * Gọi song song 2 API:
 *   1. GET /api/student/dashboard   → streak, stars, skillLevels, dreamGoal
 *   2. GET /api/student/progress-summary → tiến độ theo môn (Phase Dashboard)
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

export interface SubjectProgress {
  doneFree:      number;
  totalFree:     number;
  lockedPremium: number;
  avgScore:      number | null;
  badge:         "gioi" | "kha" | "can_on" | "pending";
  lastActivity:  number | null;
  emoji:         string;
  label:         string;
}

export interface RecentAttempt {
  quizId:   string;
  title:    string;
  pathway:  string;
  subject:  string;
  bestPct:  number;
  doneAt:   number;
}

export interface ProgressSummaryData {
  lop6:           Record<string, SubjectProgress>;
  cambridge:      Record<string, SubjectProgress>;
  recentAttempts: RecentAttempt[];
  lowScoreAlert:  { quizId: string; pathway: string; subject: string; bestPct: number } | null;
  gradeMissing:   boolean;
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
  cambridgeLevel:  string | null;  // "flyers" | "movers" | "starters"
  currentGrade:    number | null;
  todayLessons:    TodayLesson[];
  // Phase Dashboard (progress-summary)
  progressSummary: ProgressSummaryData | null;
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
  cambridgeLevel:  "flyers",
  currentGrade:    null,
  todayLessons:    [],
  progressSummary: null,
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
        // Fetch song song cả 2 API để giảm thời gian chờ
        const [dashRes, progressRes] = await Promise.all([
          fetch("/api/student/dashboard", { credentials: "include" }),
          fetch("/api/student/progress-summary", { credentials: "include" }),
        ]);

        const dashData: Omit<DashboardData, "progressSummary"> = dashRes.ok
          ? (await dashRes.json() as Omit<DashboardData, "progressSummary">)
          : { ...FALLBACK_DATA };

        const progressSummary: ProgressSummaryData | null = progressRes.ok
          ? (await progressRes.json() as ProgressSummaryData)
          : null;

        if (!cancelled) {
          // Persist currentGrade, selectedPathway, cambridgeLevel → localStorage
          if (dashData.currentGrade) {
            localStorage.setItem("student_grade", String(dashData.currentGrade));
          }
          if (dashData.selectedPathway) {
            localStorage.setItem("student_pathway", dashData.selectedPathway);
          }
          if (dashData.cambridgeLevel) {
            localStorage.setItem("student_cambridge_level", dashData.cambridgeLevel);
          }
          setState({
            data: { ...dashData, progressSummary },
            isLoading: false,
            error: null,
          });
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

