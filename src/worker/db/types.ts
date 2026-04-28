/**
 * TypeScript types cho D1 database rows
 * luyen-thi-io — Cập nhật: 2026-04-28
 *
 * Dùng khi: query D1 và cần type-safe row objects
 * Ví dụ: const user = await db.prepare('SELECT * FROM users WHERE id = ?').bind(id).first<DbUser>()
 */

// =============================================
// USERS
// =============================================
export interface DbUser {
  id: string;
  email: string;
  name: string | null;
  google_id: string | null;
  subscription_tier: "free" | "basic" | "premium";
  notification_email: string | null;
  created_at: number; // unixepoch
}

// =============================================
// STUDENT PROFILES
// =============================================
export type AvatarId =
  | "cat"
  | "dog"
  | "rabbit"
  | "bear"
  | "fox"
  | "penguin"
  | "owl"
  | "elephant"
  | "lion"
  | "duck"
  | "frog"
  | "panda";

export type ThemeId =
  | "purple"
  | "ocean"
  | "sakura"
  | "forest"
  | "night"
  | "sunset";

export interface DbStudentProfile {
  id: string;
  user_id: string;
  display_name: string;
  avatar_id: AvatarId;
  theme: ThemeId;
  created_at: number;
}

// =============================================
// STUDENT STATS
// =============================================
export interface DbStudentStats {
  student_id: string;
  total_stars: number;
  current_streak: number;
  longest_streak: number;
  total_sessions: number;
  last_active: number | null;
  lvl_listening_p1: number;
  lvl_listening_p2: number;
  lvl_listening_p3: number;
  lvl_listening_p4: number;
  lvl_reading_p1: number;
  lvl_reading_p2: number;
  lvl_reading_p3: number;
  lvl_reading_p4: number;
  lvl_writing_p1: number;
  preferences_json: string; // JSON string
}

// Parsed preferences (dùng sau khi JSON.parse)
export interface StudentPreferences {
  sound_enabled?: boolean;
  notifications_enabled?: boolean;
}

// =============================================
// DREAM GOALS
// =============================================
export type DreamGoalStatus =
  | "pending"
  | "approved"
  | "rejected"
  | "achieved";

export type DreamGoalType = "stars" | "shields" | "complete";

export interface DbDreamGoal {
  id: string;
  student_id: string;
  exam_id: string;
  goal_type: DreamGoalType;
  goal_target: number;
  reward_label: string;
  reward_image_key: string | null;
  status: DreamGoalStatus;
  approval_token: string | null;
  token_expires: number | null;
  current_progress: number;
  approved_at: number | null;
  achieved_at: number | null;
  created_at: number;
}

// =============================================
// QUIZ ATTEMPTS
// =============================================
export type QuizSkill = "listening" | "reading" | "writing";

export interface DbQuizAttempt {
  id: string;
  student_id: string;
  quiz_id: string;
  skill: QuizSkill;
  part_number: number | null;
  score: number | null;
  max_score: number | null;
  stars_earned: number;
  answers_json: string | null; // JSON string: { [questionId: string]: string }
  time_spent: number | null; // giây
  is_challenge: 0 | 1;
  challenge_threshold: number | null;
  challenge_multiplier: number;
  stars_base: number;
  completed_at: number;
}

// =============================================
// DAILY ACTIVITY
// =============================================
export interface DbDailyActivity {
  student_id: string;
  date_key: string; // 'YYYY-MM-DD'
  sessions: number;
  stars: number;
}

// =============================================
// SUBSCRIPTIONS
// =============================================
export type SubscriptionPlan = "basic" | "premium" | "family";

export interface DbSubscription {
  id: string;
  user_id: string;
  plan: SubscriptionPlan;
  expires_at: number; // unixepoch
  payment_ref: string | null;
  created_at: number;
}

// =============================================
// HELPER: Stars calculation
// =============================================
export function calculateStars(score: number, maxScore: number): number {
  const pct = maxScore > 0 ? (score / maxScore) * 100 : 0;
  if (pct >= 90) return 5;
  if (pct >= 80) return 3;
  if (pct >= 60) return 2;
  return 1;
}

export function calculateStreakBonus(streak: number): number {
  if (streak >= 7) return 5;
  if (streak >= 3) return 2;
  return 0;
}
