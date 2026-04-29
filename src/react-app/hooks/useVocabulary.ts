/**
 * useVocabulary.ts — Hook quản lý Word Tooltip + Vocabulary list
 *
 * - Lưu vào localStorage (guest) hoặc D1 (Phase 07, khi login)
 * - Đếm số lượt tra / bài — 3 lượt miễn phí, sau đó trừ sao
 * - Guest: xem được nhưng không lưu
 */

import { useState, useCallback, useEffect, useRef } from "react";
import type { VocabWord, LookupState } from "../types/vocabulary";
import { VOCAB_STORAGE_KEY } from "../types/vocabulary";

// ─── Helpers ─────────────────────────────────────────────────────────────────
function loadVocabFromStorage(): VocabWord[] {
  try {
    const raw = localStorage.getItem(VOCAB_STORAGE_KEY);
    return raw ? (JSON.parse(raw) as VocabWord[]) : [];
  } catch {
    return [];
  }
}

function saveVocabToStorage(words: VocabWord[]) {
  try {
    localStorage.setItem(VOCAB_STORAGE_KEY, JSON.stringify(words));
  } catch {
    // localStorage không khả dụng (private mode, quota exceeded)
  }
}

// ─── Hook ─────────────────────────────────────────────────────────────────────
interface UseVocabularyOptions {
  quizId: string;
  isLoggedIn: boolean;
  /** Số lượt tra miễn phí / bài (default: 3) */
  freeLimit?: number;
  /** Callback trừ sao (phase 07 sẽ gọi API) */
  onDeductStar?: () => void;
}

export function useVocabulary({
  quizId,
  isLoggedIn,
  freeLimit = 3,
  onDeductStar,
}: UseVocabularyOptions) {
  const [vocab, setVocab] = useState<VocabWord[]>(() => loadVocabFromStorage());
  const [lookup, setLookup] = useState<LookupState>({ count: 0, freeLimit });
  // Tránh re-render không cần thiết
  const lookupRef = useRef(lookup);
  lookupRef.current = lookup;

  // Persist vocab (chỉ khi isLoggedIn; guest không lưu)
  useEffect(() => {
    if (isLoggedIn) saveVocabToStorage(vocab);
  }, [vocab, isLoggedIn]);

  /**
   * Tra một từ → trả về thông tin từ đó
   * Side-effect: đếm lượt tra, có thể trừ sao
   */
  const lookupWord = useCallback(
    (word: string, vi: string, ipa?: string): { allowed: boolean; willCostStar: boolean } => {
      const currentCount = lookupRef.current.count;
      const willCostStar = currentCount >= freeLimit;

      // Guest: luôn cho xem nhưng không lưu
      if (!isLoggedIn) {
        setLookup((l) => ({ ...l, count: l.count + 1 }));
        return { allowed: true, willCostStar: false };
      }

      // Logged in: nếu vượt limit → trừ sao
      if (willCostStar) {
        onDeductStar?.();
      }

      setLookup((l) => ({ ...l, count: l.count + 1 }));

      // Lưu từ vào vocab (nếu chưa có)
      setVocab((prev) => {
        const exists = prev.find((v) => v.word.toLowerCase() === word.toLowerCase());
        if (exists) return prev;
        const newWord: VocabWord = {
          word,
          vi,
          ipa,
          sourceQuizId: quizId,
          correctSessions: 0,
          isMastered: false,
        };
        return [...prev, newWord];
      });

      return { allowed: true, willCostStar };
    },
    [freeLimit, isLoggedIn, onDeductStar, quizId]
  );

  /** Đánh dấu từ đã làm đúng trong Hangman session */
  const markWordCorrect = useCallback((word: string) => {
    if (!isLoggedIn) return;
    setVocab((prev) => {
      const now = Date.now();
      return prev.map((v) => {
        if (v.word.toLowerCase() !== word.toLowerCase()) return v;
        // Chỉ tăng nếu session này khác session gần nhất (>= 1h)
        const differentSession =
          !v.lastCorrectAt || now - v.lastCorrectAt > 60 * 60 * 1000;
        const newCount = differentSession ? v.correctSessions + 1 : v.correctSessions;
        return {
          ...v,
          correctSessions: newCount,
          isMastered: newCount >= 2,
          lastCorrectAt: now,
        };
      });
    });
  }, [isLoggedIn]);

  /** Xóa từ khỏi danh sách cần ôn (sau khi mastered) */
  const removeWord = useCallback((word: string) => {
    setVocab((prev) => prev.filter((v) => v.word.toLowerCase() !== word.toLowerCase()));
    saveVocabToStorage(vocab.filter((v) => v.word.toLowerCase() !== word.toLowerCase()));
  }, [vocab]);

  /** Lấy các từ chưa mastered từ bài này (ưu tiên review list) */
  const getPendingWords = useCallback((): VocabWord[] => {
    return vocab.filter((v) => !v.isMastered);
  }, [vocab]);

  /** Lấy các từ từ bài cụ thể */
  const getWordsFromQuiz = useCallback(
    (qId: string): VocabWord[] => {
      return vocab.filter((v) => v.sourceQuizId === qId && !v.isMastered);
    },
    [vocab]
  );

  return {
    vocab,
    lookup,
    lookupWord,
    markWordCorrect,
    removeWord,
    getPendingWords,
    getWordsFromQuiz,
    remainingFree: Math.max(0, freeLimit - lookup.count),
    isOverLimit: lookup.count >= freeLimit,
  };
}
