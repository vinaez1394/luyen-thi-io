/**
 * useVocabularyLesson.ts — Hook quản lý toàn bộ session học từ vựng
 *
 * Features:
 * - Fetch topics từ /api/vocabulary/topics
 * - Fetch lesson words từ /api/vocabulary/lesson (8 từ/session)
 * - Gửi progress lên /api/vocabulary/progress (POST)
 * - Quản lý state của LEARN → PRACTICE → USE flow
 * - Phát âm Web Speech API (fallback khi không có audio_url)
 */

import { useState, useCallback, useEffect } from "react";
import type {
  VocabTopicItem,
  TopicsApiResponse,
  LessonWord,
  LessonApiResponse,
  LessonSessionState,
  LessonPhase,
  PracticeGameType,
  ProgressUpdatePayload,
  CertLevel,
} from "../types/vocabulary";

// ─── useVocabularyTopics ──────────────────────────────────────────────────────
// Lấy danh sách topics + tiến độ học sinh

interface UseVocabularyTopicsResult {
  topics:    VocabTopicItem[];
  isLoading: boolean;
  error:     string | null;
  refetch:   () => void;
}

export function useVocabularyTopics(cert: CertLevel = "flyers"): UseVocabularyTopicsResult {
  const [topics,    setTopics]    = useState<VocabTopicItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error,     setError]     = useState<string | null>(null);

  const fetchTopics = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const res  = await fetch(`/api/vocabulary/topics?cert=${cert}`);
      const data = await res.json() as TopicsApiResponse;
      if (!data.ok) throw new Error(data.error ?? "Lỗi tải danh sách topics");
      setTopics(data.topics);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Lỗi kết nối");
    } finally {
      setIsLoading(false);
    }
  }, [cert]);

  // Fetch mỗi khi cert thay đổi (dùng useEffect thay vì gọi trong render body)
  useEffect(() => {
    fetchTopics();
  }, [fetchTopics]);

  return { topics, isLoading, error, refetch: fetchTopics };
}

// ─── useVocabularyLesson ──────────────────────────────────────────────────────
// Quản lý state cho 1 session học (LEARN → PRACTICE → USE)

export const WORDS_PER_SESSION = 8;

interface UseVocabularyLessonOptions {
  topic:   string;
  cert:    CertLevel;
  offset?: number;
}

interface UseVocabularyLessonResult {
  // State
  session:        LessonSessionState;
  sessionMeta: {
    session_number: number;
    total_sessions: number;
    total_words:    number;
  };

  // Actions
  startLearn:     () => void;
  nextLearnWord:  () => void;
  startPractice:  (game?: PracticeGameType) => void;
  submitAnswer:   (wordId: string, correct: boolean) => Promise<void>;
  completePhase:  (nextPhase: LessonPhase) => void;
  speakWord:      (word: string) => void;
  refetch:        () => void;
}

export function useVocabularyLesson({
  topic,
  cert,
  offset = 0,
}: UseVocabularyLessonOptions): UseVocabularyLessonResult {
  const [session, setSession] = useState<LessonSessionState>({
    phase:          "LEARN",
    currentWordIdx: 0,
    words:          [],
    practiceGame:   "picture_match",
    score:          0,
    correctCount:   0,
    totalAnswered:  0,
    isLoading:      true,
    error:          null,
  });

  const [sessionMeta, setSessionMeta] = useState({
    session_number: 1,
    total_sessions: 1,
    total_words:    0,
  });

  // ── Fetch lesson words từ API ───────────────────────────────────────────────
  const fetchLesson = useCallback(async () => {
    setSession(prev => ({ ...prev, isLoading: true, error: null }));
    try {
      const url = `/api/vocabulary/lesson?topic=${topic}&cert=${cert}&offset=${offset}`;
      const res  = await fetch(url);
      const data = await res.json() as LessonApiResponse;

      if (!data.ok) throw new Error(data.error ?? "Lỗi tải bài học");
      if (!data.words.length) throw new Error("Không tìm thấy từ nào trong topic này.");

      setSession(prev => ({
        ...prev,
        words:          data.words,
        currentWordIdx: 0,
        phase:          "LEARN",
        score:          0,
        correctCount:   0,
        totalAnswered:  0,
        isLoading:      false,
      }));

      setSessionMeta({
        session_number: data.session_number,
        total_sessions: data.total_sessions,
        total_words:    data.total_words,
      });
    } catch (err) {
      setSession(prev => ({
        ...prev,
        isLoading: false,
        error: err instanceof Error ? err.message : "Lỗi kết nối",
      }));
    }
  }, [topic, cert, offset]);

  // ── Auto-fetch khi topic/cert/offset thay đổi (useEffect đúng chuẩn) ────────
  useEffect(() => {
    fetchLesson();
  }, [fetchLesson]);

  // ── Web Speech API (phát âm) ───────────────────────────────────────────────
  const speakWord = useCallback((word: string) => {
    if (!("speechSynthesis" in window)) return;
    const utterance = new SpeechSynthesisUtterance(word);
    utterance.lang  = "en-US";
    utterance.rate  = 0.85;   // Hơi chậm để học sinh nghe rõ
    utterance.pitch = 1.0;
    window.speechSynthesis.cancel();  // Hủy lượt đọc trước
    window.speechSynthesis.speak(utterance);
  }, []);

  // ── LEARN actions ──────────────────────────────────────────────────────────
  const startLearn = useCallback(() => {
    setSession(prev => ({ ...prev, phase: "LEARN", currentWordIdx: 0 }));
  }, []);

  const nextLearnWord = useCallback(() => {
    setSession(prev => {
      const nextIdx = prev.currentWordIdx + 1;
      // Đã xem hết → chuyển sang PRACTICE
      if (nextIdx >= prev.words.length) {
        return { ...prev, phase: "PRACTICE", currentWordIdx: 0 };
      }
      return { ...prev, currentWordIdx: nextIdx };
    });
  }, []);

  // ── PRACTICE actions ───────────────────────────────────────────────────────
  const startPractice = useCallback((game: PracticeGameType = "picture_match") => {
    setSession(prev => ({
      ...prev,
      phase:          "PRACTICE",
      practiceGame:   game,
      currentWordIdx: 0,
      correctCount:   0,
      totalAnswered:  0,
    }));
  }, []);

  // ── Submit answer (PRACTICE hoặc USE) + cập nhật SRS ──────────────────────
  const submitAnswer = useCallback(async (wordId: string, correct: boolean) => {
    // Optimistic UI update
    setSession(prev => ({
      ...prev,
      correctCount:  prev.correctCount  + (correct ? 1 : 0),
      totalAnswered: prev.totalAnswered + 1,
    }));

    // Gửi lên API (fire and forget — không block UI)
    // 401 = guest chưa đăng nhập → silent fail, không log error
    try {
      const payload: ProgressUpdatePayload = {
        word_id: wordId,
        correct,
        session: session.phase === "PRACTICE" ? "practice" : "use",
      };
      const res = await fetch("/api/vocabulary/progress", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify(payload),
      });
      // 401 = chưa đăng nhập → bình thường, không cần warn
      if (!res.ok && res.status !== 401) {
        console.warn("[vocab] progress save failed:", res.status);
      }
    } catch {
      // Network error — silent fail, không block UX
    }
  }, [session.phase]);

  // ── Phase transition ───────────────────────────────────────────────────────
  const completePhase = useCallback((nextPhase: LessonPhase) => {
    setSession(prev => ({
      ...prev,
      phase:          nextPhase,
      currentWordIdx: 0,
    }));
  }, []);

  return {
    session,
    sessionMeta,
    startLearn,
    nextLearnWord,
    startPractice,
    submitAnswer,
    completePhase,
    speakWord,
    refetch: fetchLesson,
  };
}

// ─── Helper: getWordMedia ─────────────────────────────────────────────────────
// Quyết định dùng image_url hay emoji cho 1 từ

export function getWordMedia(word: LessonWord): {
  type:  "image" | "emoji";
  value: string;
} {
  if (word.image_url) return { type: "image", value: word.image_url };
  return { type: "emoji", value: word.emoji || "📖" };
}
