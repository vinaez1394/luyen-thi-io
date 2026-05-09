/**
 * vocabulary.ts — Types cho hệ thống Word Tooltip + Hangman
 *
 * Phase 4.5: Vocabulary System
 * - Word Tooltip: annotated segments trong JSON quiz
 * - Hangman: game ôn từ sau bài học
 */

// ─── Annotated Segment (mới trong quiz JSON) ──────────────────────────────────
export interface TextSegment {
  text: string;
  /** Tô vàng từ highlight (dùng trong Reading passage) */
  highlight?: boolean;
  /** Nếu có tooltip → đây là từ có thể tra */
  tooltip?: {
    vi: string;     // nghĩa tiếng Việt
    ipa?: string;   // phát âm IPA (optional)
    note?: string;  // ghi chú thêm (optional)
  };
}

/** prompt field trong Question — có thể là string (cũ) hoặc TextSegment[] (mới) */
export type AnnotatedPrompt = string | TextSegment[];

// ─── Vocabulary Word ──────────────────────────────────────────────────────────
export interface VocabWord {
  word: string;
  vi: string;
  ipa?: string;
  sourceQuizId: string;
  /** Số lần bé đã đoán đúng trong Hangman (qua các session khác nhau) */
  correctSessions: number;
  /** true khi correctSessions >= 2 (trong 2 session khác nhau) */
  isMastered: boolean;
  /** Timestamp session gần nhất làm đúng */
  lastCorrectAt?: number;
}

// ─── Lookup State (per-lesson) ────────────────────────────────────────────────
export interface LookupState {
  /** Số lượt đã tra trong bài này */
  count: number;
  /** Giới hạn miễn phí (mặc định 3) */
  freeLimit: number;
}

// ─── Hangman Round ────────────────────────────────────────────────────────────
export interface HangmanWord {
  word: string;
  vi: string;
  ipa?: string;
  guessed: boolean;
  /** Các chữ cái user đã đoán */
  letterHits: string[];
  letterMisses: string[];
  isRevealed: boolean;
}

export interface HangmanSession {
  words: HangmanWord[];
  currentIndex: number;
  starsEarned: number;
  isComplete: boolean;
}

// ─── Storage keys ─────────────────────────────────────────────────────────────
export const VOCAB_STORAGE_KEY = "luyen_thi_vocab_v1";
export const HANGMAN_SESSION_KEY = "luyen_thi_hangman_session_v1";

// ═════════════════════════════════════════════════════════════════════════════
// Vocabulary LESSON System (Phase 02+)
// Các types này dùng cho module học từ vựng theo topic (LEARN → PRACTICE → USE)
// ═════════════════════════════════════════════════════════════════════════════

// ─── Topic (từ /api/vocabulary/topics) ───────────────────────────────────────
export interface VocabTopicItem {
  key:               string;    // "animals", "family", ...
  label:             string;    // "Animals", "Family", ...
  emoji:             string;    // "🐾", "👨‍👩‍👧", ...
  total_words:       number;    // tổng từ trong topic (theo cert level)
  student_mastered:  number;    // từ đã thành thạo (mastery >= 2)
  student_seen:      number;    // từ đã từng học
  review_due:        number;    // từ đến hạn ôn (SRS)
}

export interface TopicsApiResponse {
  ok:         boolean;
  cert:       string;           // "flyers", "movers", ...
  cert_order: number;           // 1|2|3|4|5
  topics:     VocabTopicItem[];
  error?:     string;
}

// ─── Lesson Word (từ /api/vocabulary/lesson) ─────────────────────────────────
export interface LessonWord {
  id:             string;       // "st-an-001", "fl-an-020", ...
  word:           string;       // "cat"
  certificate:    string;       // "starters" | "movers" | "flyers"
  cert_order:     number;       // 1 | 2 | 3
  translation_vi: string;       // "con mèo"
  ipa:            string | null; // "/kæt/"
  word_type:      string;       // "noun" | "verb" | "adjective"
  example_en:     string | null; // "My cat sleeps on the sofa."
  example_vi:     string | null; // "Con mèo của tôi ngủ trên ghế sofa."
  emoji:          string;       // "🐱"
  image_url:      string | null; // null = dùng emoji
  audio_url:      string | null; // null = dùng Web Speech API
  mastery_level:  number;       // 0-4 (từ student_vocabulary)
  next_review_at: number | null; // Unix timestamp (SRS)
}

export interface LessonApiResponse {
  ok:             boolean;
  topic:          string;
  cert:           string;
  cert_order:     number;
  session_number: number;       // 1, 2, 3, ...
  total_sessions: number;       // ceil(total_words / 8)
  total_words:    number;
  words:          LessonWord[];
  error?:         string;
}

// ─── Progress Update (POST /api/vocabulary/progress) ─────────────────────────
export interface ProgressUpdatePayload {
  word_id: string;
  correct:  boolean;
  session?: "practice" | "use";   // context để analytics sau này
}

export interface ProgressApiResponse {
  ok:             boolean;
  word_id:        string;
  new_mastery:    number;
  interval_days:  number;
  next_review_at: number;
  error?:         string;
}

// ─── Lesson Session State (Frontend) ─────────────────────────────────────────
// State được quản lý bởi useVocabularyLesson hook

export type LessonPhase = "LEARN" | "PRACTICE" | "USE" | "COMPLETE";

export type PracticeGameType =
  | "picture_match"      // Game 1: chọn ảnh/emoji → đúng từ
  | "word_bank_fill";    // Game 2: kéo thả từ vào câu

export interface LessonSessionState {
  phase:          LessonPhase;
  currentWordIdx: number;       // index trong words[]
  words:          LessonWord[];
  practiceGame:   PracticeGameType;
  score:          number;        // 0–100
  correctCount:   number;
  totalAnswered:  number;
  isLoading:      boolean;
  error:          string | null;
}

// ─── Cert filter ──────────────────────────────────────────────────────────────
export type CertLevel = "starters" | "movers" | "flyers" | "ket" | "pet";

export const CERT_LABELS: Record<CertLevel, string> = {
  starters: "Pre-A1 Starters",
  movers:   "A1 Movers",
  flyers:   "A2 Flyers",
  ket:      "A2 KET",
  pet:      "B1 PET",
};

export const CERT_ORDER: Record<CertLevel, number> = {
  starters: 1,
  movers:   2,
  flyers:   3,
  ket:      4,
  pet:      5,
};

