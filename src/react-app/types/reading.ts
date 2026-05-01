/**
 * reading.ts — TypeScript interfaces cho ReadingEngine
 *
 * Dạng bài: reading-passage (Thi Lớp 6 / Tiếng Anh)
 * Cấu trúc: 1 bài → 2 sections → mỗi section có passage riêng + questions
 */

// ============================================
// Text Segment — passage text + inline tooltip
// ============================================
export interface TextSegment {
  text: string;
  /** Tô vàng từ mẫu (0) đã điền sẵn */
  highlight?: boolean;
  /** Tooltip từ điển nhúng sẵn trong JSON */
  tooltip?: {
    vi: string;   // Nghĩa tiếng Việt
    ipa: string;  // Phát âm quốc tế
  };
}

export interface ReadingPassageData {
  /** Full text với blanks marked (1)_____, dùng cho SEO/accessibility */
  raw_text?: string;
  /** Segments có tooltip — dùng để render */
  text_segments: TextSegment[];
}

// ============================================
// Question Sub-types
// ============================================
export type ReadingSubType =
  | "cloze-mc"    // Điền từ vào chỗ trống, 3 lựa chọn (Section 1)
  | "true-false"  // Đúng / Sai (Section 2)
  | "mc-3"        // Chọn 1 trong 3 (Section 2)
  | "write-word"; // Gõ 1 từ vào ô trống (Section 2)

export interface ReadingQuestion {
  id: string;
  /** Chỉ có cho cloze-mc */
  sub_type?: ReadingSubType;
  blank_number?: number;
  /** Context câu chứa chỗ trống (cloze) */
  context?: string;
  /** Câu hỏi (comprehension) */
  prompt?: string;
  /** Lựa chọn — cloze-mc hoặc mc-3 */
  options?: string[];
  /** Đáp án đúng: string (từ được chọn / "true" / "false") */
  correct: string;
  /** Giải thích bằng tiếng Việt — hiện sau khi submit */
  explanation_vi: string;
}

// ============================================
// Section — 1 bài thi có 2 sections
// ============================================
export type ReadingSectionType = "cloze" | "comprehension";

export interface ReadingSection {
  id: string;
  type: ReadingSectionType;
  title: string;
  points: number;
  points_per_question: number;
  passage: ReadingPassageData;
  questions: ReadingQuestion[];
}

// ============================================
// ReadingQuiz — top-level JSON schema
// ============================================
export interface ReadingQuiz {
  id: string;
  title: string;
  type: "reading-passage";
  skill: "reading";
  difficulty: "easy" | "medium" | "hard";
  grade_min: number;
  grade_max: number;
  in_pool: boolean;
  pathway: string;
  subject: string;
  ui_language: "vi" | "en";
  instructions_vi: string;
  total_points: number;
  sections: ReadingSection[];
}

// ============================================
// State management
// ============================================

/** Map questionId → userAnswer */
export type ReadingAnswers = Record<string, string>;

export interface ReadingResult {
  quizId: string;
  totalQuestions: number;
  correctCount: number;
  percentage: number;
  starsEarned: number;
  saved: boolean;
  /** correctAnswers[questionId] = correct string */
  correctAnswers: Record<string, string>;
}
