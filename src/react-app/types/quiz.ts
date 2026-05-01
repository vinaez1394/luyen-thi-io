/**
 * quiz.ts — TypeScript interfaces cho Quiz Engine
 * Thêm type mới vào QuizType → Engine tự động hỗ trợ
 *
 * Phase 4.5: Question.prompt có thể là AnnotatedPrompt (TextSegment[])
 */

import type { AnnotatedPrompt } from "./vocabulary";

// ============================================
// Tất cả dạng bài hiện có và tương lai
// ============================================
export type QuizType =
  | "multiple-choice"        // Reading P4 — chọn 1 trong 4 text
  | "multiple-choice-image"  // Reading P1 — chọn 1 trong 4 hình
  | "fill-blank"             // Reading P3 — gõ từ vào chỗ trống
  | "drag-drop-fill"         // Reading P5 — kéo từ vào chỗ trống (Phase 05)
  | "drag-drop-match"        // Reading P2 — kéo nối 2 cột (Phase 05)
  | "matching"               // Nối matching bằng click (Phase 05)
  | "audio-mc"               // Listening P1, P4 — nghe + chọn (Phase 06)
  | "audio-fill"             // Listening P2 — nghe + điền bảng (Phase 06)
  | "audio-matching"         // Listening P3 — nghe + nối (Phase 06)
  | "audio-true-false"       // Listening P5 — nghe + đúng/sai (Phase 06)
  | "reading-passage";       // Lớp 6 Tiếng Anh — passage + sections (ReadingEngine)

export type SkillType = "reading" | "listening" | "writing" | "math";
export type LevelType = "flyers" | "movers" | "ket" | "pet" | "level-1" | "level-2";

// ============================================
// Câu hỏi
// ============================================
export interface Question {
  id: string;
  /** Phase 4.5: có thể là string thuần (cũ) hoặc TextSegment[] (mới, có tooltip) */
  prompt: AnnotatedPrompt;
  image_url?: string;          // optional — dùng khi type = multiple-choice-image
  audio_url?: string;          // optional — dùng khi type = audio-*
  options: string[];           // Danh sách đáp án
  correct: string | string[];  // 1 đáp án hoặc nhiều (cho drag-drop)
  explanation_vi: string;      // Giải thích sau khi nộp bài
}

// ============================================
// Quiz (file JSON)
// ============================================
export interface Quiz {
  id: string;
  title: string;
  skill: SkillType;
  level: LevelType;
  part: number;
  type: QuizType;
  is_free: boolean;
  audio_url?: string;          // Audio cho cả bài (Listening)
  instructions_vi: string;     // Hướng dẫn tiếng Việt
  questions: Question[];
}

// ============================================
// Trả lời của user
// ============================================
export type UserAnswers = Record<string, string | string[]>;

// ============================================
// Kết quả sau khi nộp bài
// ============================================
export interface QuizResult {
  quizId: string;
  score: number;           // VD: 7 (số câu đúng)
  maxScore: number;        // VD: 10 (tổng số câu)
  percentage: number;      // VD: 70
  starsEarned: number;     // 1, 2, 3, hoặc 5
  saved: boolean;          // false nếu guest (không lưu DB)
  correctAnswers: Record<string, string | string[]>;
}

// ============================================
// Props chuẩn cho tất cả QuizComponent
// (MultipleChoice, FillBlank, DragDrop, ...)
// Mọi component trong QUIZ_REGISTRY phải implement interface này
// ============================================
export interface QuizComponentProps {
  question: Question;
  questionIndex: number;
  totalQuestions: number;
  userAnswer: string | string[] | undefined;
  onAnswer: (questionId: string, answer: string | string[]) => void;
  isSubmitted: boolean;    // true sau khi nộp bài → show đáp án
  correctAnswer?: string | string[];
  // Phase 4.5: Word Tooltip (optional — không phải bài nào cũng có)
  vocabRemainingFree?: number;
  onVocabLookup?: (word: string, vi: string, ipa?: string) => { allowed: boolean; willCostStar: boolean };
}
