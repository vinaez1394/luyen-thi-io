/**
 * useHangmanWords.ts — Hook lấy từ cho Hangman/Flashcard
 *
 * BUG FIX: pendingWords là array → mỗi render tạo reference mới
 * → useEffect re-run vô hạn → cancelled = true → setLoading(false) không chạy
 *
 * FIX: Dùng serialized string key thay vì array reference trong deps.
 */

import { useState, useEffect, useMemo } from "react";
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
  pendingWords: VocabWord[];
  group?: string;
  game?: "hangman" | "flashcard" | "choice";
  count?: number;
}

interface UseHangmanWordsResult {
  words: VocabWord[];
  isLoading: boolean;
  source: "pending" | "db" | "fallback";
  refresh: () => void;
}

export function useHangmanWords({
  pendingWords,
  group = "flyers",
  game = "hangman",
  count = WORDS_PER_SESSION,
}: UseHangmanWordsOptions): UseHangmanWordsResult {
  const [words, setWords]       = useState<VocabWord[]>([]);
  const [isLoading, setLoading] = useState(true);
  const [source, setSource]     = useState<"pending" | "db" | "fallback">("db");
  const [seed, setSeed]         = useState(0);

  // ★ KEY FIX: Serialize pendingWords thành string để làm dep ổn định.
  // Dùng array reference trực tiếp gây infinite loop:
  // [] mới mỗi render → effect re-run → cancelled = true → isLoading mãi true
  const pendingKey = useMemo(
    () => pendingWords.map((w) => `${w.word}:${w.isMastered ? 1 : 0}`).join("|"),
    [pendingWords]
  );

  useEffect(() => {
    let cancelled = false;

    async function buildWordList() {
      setLoading(true);

      // Parse pendingKey ngược lại để lấy pending words từ prop
      // (vẫn đọc từ closure — pendingKey chỉ để trigger effect đúng lúc)
      const pending = shuffleArray(pendingWords.filter((w) => !w.isMastered));
      const chosen: VocabWord[] = pending.slice(0, count);

      if (chosen.length >= count) {
        if (!cancelled) {
          setWords(chosen);
          setSource("pending");
          setLoading(false);
        }
        return;
      }

      // Fetch từ DB
      const need    = count - chosen.length;
      const exclude = chosen.map((w) => w.word).join(",");

      try {
        const url = `/api/vocabulary/random?limit=${need}&group=${group}&game=${game}${
          exclude ? `&exclude=${encodeURIComponent(exclude)}` : ""
        }`;
        const res = await fetch(url);

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

      // Emergency fallback — luôn chạy được dù API lỗi
      const usedWords = new Set(chosen.map((w) => w.word.toLowerCase()));
      const fallback  = shuffleArray(
        EMERGENCY_FALLBACK.filter((f) => !usedWords.has(f.word.toLowerCase()))
      );
      const emergency = [...chosen, ...fallback].slice(0, count);

      if (!cancelled) {
        setWords(shuffleArray(emergency));
        setSource("fallback");
        setLoading(false);
      }
    }

    buildWordList();
    return () => { cancelled = true; };

  // ★ pendingKey (string) thay vì pendingWords (array ref) — ổn định, không gây loop
  }, [pendingKey, group, game, count, seed]); // eslint-disable-line react-hooks/exhaustive-deps

  const refresh = () => setSeed((s) => s + 1);

  return { words, isLoading, source, refresh };
}
