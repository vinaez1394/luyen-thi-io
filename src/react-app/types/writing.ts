/**
 * writing.ts — TypeScript interfaces cho WritingEngine
 *
 * Dạng bài: writing (Tiếng Anh Lớp 6 — Thi Lên Lớp 6)
 * Cấu trúc: 1 bài → 2 sections
 *   Section 1 (rearrange): Kéo cụm từ vào đúng vị trí → DragDropFill
 *   Section 2 (sentence-building): Gõ câu hoàn chỉnh → SentenceInput
 */

// ============================================
// Text Segment — cues với inline tooltip
// ============================================
export interface TextSegment {
  text: string;
  tooltip?: {
    vi: string;
    ipa: string;
  };
}

// ============================================
// Explanation — giải thích sau khi nộp bài
// ============================================
export interface WritingExplanation {
  /** Câu đúng chuẩn */
  correct_sentence: string;
  /** Sơ đồ cấu trúc câu bằng tiếng Việt */
  structure_vi: string;
  /** Danh sách ghi chú ngữ pháp */
  grammar_notes: string[];
  /** Ghi chú từ vựng quan trọng */
  vocab_notes: Array<{ word: string; vi: string; ipa: string }>;
  /** Lỗi thường gặp để học sinh đối chiếu */
  common_mistakes: string[];
}

// ============================================
// Section 1: Rearrange (DragDropFill)
// ============================================
export interface RearrangeQuestion {
  id: string;
  type: "drag-drop-fill";
  /** Chuỗi cues hiển thị theo format đề (có / và //) */
  display_cues: string;
  /** Segments có tooltip cho phần hiển thị cues */
  cues_segments?: TextSegment[];
  /** Template cho DragDropFill: "{0} {1} {2} {3} {4}." */
  template: string;
  /** Danh sách cụm từ trong Word Bank (thứ tự xáo trộn) */
  word_bank: string[];
  /** Thứ tự đúng của các cụm từ */
  correct: string[];
  explanation: WritingExplanation;
}

// ============================================
// Section 2: Sentence Building (SentenceInput)
// ============================================
export interface SentenceBuildingQuestion {
  id: string;
  type: "write-sentence";
  /** Chuỗi cues hiển thị theo format đề (có / và //) */
  display_cues: string;
  /** Segments có tooltip cho phần hiển thị cues */
  cues_segments?: TextSegment[];
  /** Mảng đáp án được chấp nhận (normalize trước khi so sánh) */
  accepted_answers: string[];
  explanation: WritingExplanation;
}

export type WritingQuestion = RearrangeQuestion | SentenceBuildingQuestion;

// ============================================
// Example — Ví dụ mẫu trong CollapsibleBlock
// ============================================
export interface WritingExample {
  display_cues: string;
  answer: string;
}

// ============================================
// Section — 1 trong 2 phần của bài Writing
// ============================================
export type WritingSectionType = "rearrange" | "sentence-building";

export interface WritingSection {
  id: string;
  type: WritingSectionType;
  title: string;
  points: number;
  points_per_question: number;
  /** Hướng dẫn làm bài — hiển thị trong CollapsibleBlock */
  instruction: string;
  /** Ví dụ mẫu — hiển thị trong CollapsibleBlock */
  example: WritingExample;
  questions: WritingQuestion[];
}

// ============================================
// WritingQuiz — top-level JSON schema
// ============================================
export interface WritingQuiz {
  id: string;
  title: string;
  type: "writing";
  skill: "writing";
  difficulty: "easy" | "medium" | "hard";
  grade_min: number;
  grade_max: number;
  grade_target: string;
  pathway: string;
  subject: string;
  ui_language: "vi" | "en";
  is_free: boolean;
  total_points: number;
  instructions_vi: string;
  sections: WritingSection[];
}

// ============================================
// State management
// ============================================

/** Map questionId → userAnswer (string cho SentenceInput, string[] cho DragDropFill) */
export type WritingAnswers = Record<string, string | string[]>;

export interface WritingResult {
  quizId: string;
  totalQuestions: number;
  correctCount: number;
  percentage: number;
  starsEarned: number;
  saved: boolean;
  /** correctAnswers[questionId] = đáp án chuẩn (string đầu tiên trong accepted_answers) */
  correctAnswers: Record<string, string | string[]>;
}

// ============================================
// Normalize helper — dùng trong calculateResult
// ============================================
export function normalizeAnswer(s: string): string {
  return s
    .trim()
    .toLowerCase()
    .replace(/[.!?]+$/, "")    // Bỏ dấu câu cuối
    .replace(/\s+/g, " ");     // Chuẩn hoá khoảng trắng
}
