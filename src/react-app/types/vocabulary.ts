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
