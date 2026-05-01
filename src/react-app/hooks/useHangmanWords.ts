/**
 * useHangmanWords.ts — Hook lấy 5 từ cho Hangman
 *
 * Chiến lược:
 * 1. Dùng từ user đã tra (pendingWords từ useVocabulary)
 * 2. Nếu thiếu → fetch từ D1 vocabulary_bank qua API
 * 3. Nếu API lỗi → fallback về hardcode (offline support)
 */

import { useState, useEffect } from "react";
import type { VocabWord } from "../types/vocabulary";

const WORDS_PER_SESSION = 5;

function shuffleArray<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// Fallback tối thiểu — chỉ dùng khi API lỗi VÀ pendingWords trống
const EMERGENCY_FALLBACK: VocabWord[] = [
  { word: "adventure", vi: "cuộc phiêu lưu", ipa: "ədˈventʃər", sourceQuizId: "fallback", correctSessions: 0, isMastered: false },
  { word: "beautiful",  vi: "đẹp, xinh đẹp",  ipa: "ˈbjuːtɪfəl", sourceQuizId: "fallback", correctSessions: 0, isMastered: false },
  { word: "mountain",   vi: "núi",             ipa: "ˈmaʊntɪn",   sourceQuizId: "fallback", correctSessions: 0, isMastered: false },
  { word: "together",   vi: "cùng nhau",       ipa: "təˈɡeðər",   sourceQuizId: "fallback", correctSessions: 0, isMastered: false },
  { word: "library",    vi: "thư viện",        ipa: "ˈlaɪbrəri",  sourceQuizId: "fallback", correctSessions: 0, isMastered: false },
  { word: "umbrella",   vi: "cái ô, dù",       ipa: "ʌmˈbrelə",   sourceQuizId: "fallback", correctSessions: 0, isMastered: false },
  { word: "journey",    vi: "hành trình",      ipa: "ˈdʒɜːni",    sourceQuizId: "fallback", correctSessions: 0, isMastered: false },
];

interface UseHangmanWordsOptions {
  /** Từ user đã tra (từ useVocabulary) — ưu tiên trước */
  pendingWords: VocabWord[];
  /** Nhóm từ khi fetch từ DB (mặc định "flyers") */
  group?: string;
  /** Game filter: hangman | flashcard | choice (mặc định hangman) */
  game?: "hangman" | "flashcard" | "choice";
  /** Số lượng từ / session */
  count?: number;
}

interface UseHangmanWordsResult {
  words: VocabWord[];          // 5 từ đã chọn, sẵn sàng chơi
  isLoading: boolean;
  source: "pending" | "db" | "fallback";
  refresh: () => void;         // Gọi để chọn bộ từ mới
}

export function useHangmanWords({
  pendingWords,
  group = "flyers",
  game = "hangman",
  count = WORDS_PER_SESSION,
}: UseHangmanWordsOptions): UseHangmanWordsResult {
  const [words, setWords]     = useState<VocabWord[]>([]);
  const [isLoading, setLoading] = useState(true);
  const [source, setSource]   = useState<"pending" | "db" | "fallback">("db");
  const [seed, setSeed]       = useState(0); // increment để refresh

  useEffect(() => {
    let cancelled = false;

    async function buildWordList() {
      setLoading(true);

      // 1. Lấy từ pending (chưa mastered, ưu tiên tất cả)
      const pending = shuffleArray(pendingWords.filter((w) => !w.isMastered));
      const chosen: VocabWord[] = pending.slice(0, count);

      if (chosen.length >= count) {
        // Đủ từ pending → không cần fetch DB
        if (!cancelled) {
          setWords(chosen);
          setSource("pending");
          setLoading(false);
        }
        return;
      }

      // 2. Thiếu từ → fetch bổ sung từ D1
      const need    = count - chosen.length;
      const exclude = chosen.map((w) => w.word).join(",");

      try {
        const url = `/api/vocabulary/random?limit=${need}&group=${group}&game=${game}${exclude ? `&exclude=${encodeURIComponent(exclude)}` : ""}`;
        const res  = await fetch(url);

        if (res.ok) {
          const data = await res.json() as { ok: boolean; words: VocabWord[] };
          if (data.ok && data.words.length > 0) {
            const filled = [...chosen, ...data.words].slice(0, count);
            if (!cancelled) {
              setWords(shuffleArray(filled));
              setSource(chosen.length > 0 ? "pending" : "db");
              setLoading(false);
            }
            return;
          }
        }
      } catch (err) {
        console.warn("[useHangmanWords] API error, using fallback:", err);
      }

      // 3. API lỗi → dùng emergency fallback
      const usedWords  = new Set(chosen.map((w) => w.word.toLowerCase()));
      const fallback   = shuffleArray(EMERGENCY_FALLBACK.filter((f) => !usedWords.has(f.word.toLowerCase())));
      const emergency  = [...chosen, ...fallback].slice(0, count);

      if (!cancelled) {
        setWords(shuffleArray(emergency));
        setSource("fallback");
        setLoading(false);
      }
    }

    buildWordList();
    return () => { cancelled = true; };
  }, [pendingWords, group, game, count, seed]);

  const refresh = () => setSeed((s) => s + 1);

  return { words, isLoading, source, refresh };
}
