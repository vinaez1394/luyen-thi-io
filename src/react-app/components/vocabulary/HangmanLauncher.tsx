/**
 * HangmanLauncher.tsx — Nút mở Hangman + màn hình kết quả
 *
 * Render: nút "Ôn từ vựng 🎯" trên QuizResultScreen
 * Chọn 5 từ: ưu tiên pending (chưa mastered) từ bài hiện tại,
 *             bổ sung từ pending bài khác, cuối cùng bổ sung Cambridge fallback
 */

import { useState, useMemo } from "react";
import type { VocabWord } from "../../types/vocabulary";
import { HangmanGame } from "./HangmanGame";
import type { HangmanResult } from "./HangmanGame";
import "./HangmanLauncher.css";

// Cambridge Flyers fallback word list (30 từ mẫu — sẽ mở rộng Phase tiếp)
const CAMBRIDGE_FALLBACK: VocabWord[] = [
  { word: "adventure", vi: "cuộc phiêu lưu", ipa: "ədˈventʃər", sourceQuizId: "cambridge", correctSessions: 0, isMastered: false },
  { word: "beautiful", vi: "đẹp, xinh đẹp", ipa: "ˈbjuːtɪfəl", sourceQuizId: "cambridge", correctSessions: 0, isMastered: false },
  { word: "careful",   vi: "cẩn thận",       ipa: "ˈkeəfəl",    sourceQuizId: "cambridge", correctSessions: 0, isMastered: false },
  { word: "dangerous", vi: "nguy hiểm",       ipa: "ˈdeɪndʒərəs", sourceQuizId: "cambridge", correctSessions: 0, isMastered: false },
  { word: "exciting",  vi: "thú vị, kích thích", ipa: "ɪkˈsaɪtɪŋ", sourceQuizId: "cambridge", correctSessions: 0, isMastered: false },
  { word: "favorite",  vi: "yêu thích",       ipa: "ˈfeɪvərɪt",  sourceQuizId: "cambridge", correctSessions: 0, isMastered: false },
  { word: "gentle",    vi: "nhẹ nhàng",       ipa: "ˈdʒentəl",   sourceQuizId: "cambridge", correctSessions: 0, isMastered: false },
  { word: "honest",    vi: "thành thật",      ipa: "ˈɒnɪst",     sourceQuizId: "cambridge", correctSessions: 0, isMastered: false },
  { word: "imagine",   vi: "tưởng tượng",     ipa: "ɪˈmædʒɪn",   sourceQuizId: "cambridge", correctSessions: 0, isMastered: false },
  { word: "journey",   vi: "hành trình",      ipa: "ˈdʒɜːni",    sourceQuizId: "cambridge", correctSessions: 0, isMastered: false },
  { word: "kitchen",   vi: "nhà bếp",         ipa: "ˈkɪtʃɪn",    sourceQuizId: "cambridge", correctSessions: 0, isMastered: false },
  { word: "library",   vi: "thư viện",        ipa: "ˈlaɪbrəri",  sourceQuizId: "cambridge", correctSessions: 0, isMastered: false },
  { word: "mountain",  vi: "núi",             ipa: "ˈmaʊntɪn",   sourceQuizId: "cambridge", correctSessions: 0, isMastered: false },
  { word: "nervous",   vi: "lo lắng, bồn chồn", ipa: "ˈnɜːvəs", sourceQuizId: "cambridge", correctSessions: 0, isMastered: false },
  { word: "ocean",     vi: "đại dương",       ipa: "ˈoʊʃən",     sourceQuizId: "cambridge", correctSessions: 0, isMastered: false },
  { word: "patient",   vi: "kiên nhẫn",       ipa: "ˈpeɪʃənt",   sourceQuizId: "cambridge", correctSessions: 0, isMastered: false },
  { word: "question",  vi: "câu hỏi",         ipa: "ˈkwestʃən",  sourceQuizId: "cambridge", correctSessions: 0, isMastered: false },
  { word: "rainbow",   vi: "cầu vồng",        ipa: "ˈreɪnboʊ",   sourceQuizId: "cambridge", correctSessions: 0, isMastered: false },
  { word: "scissors",  vi: "cái kéo",         ipa: "ˈsɪzərz",    sourceQuizId: "cambridge", correctSessions: 0, isMastered: false },
  { word: "together",  vi: "cùng nhau",       ipa: "təˈɡeðər",   sourceQuizId: "cambridge", correctSessions: 0, isMastered: false },
  { word: "umbrella",  vi: "cái ô, dù",       ipa: "ʌmˈbrelə",   sourceQuizId: "cambridge", correctSessions: 0, isMastered: false },
  { word: "village",   vi: "làng, thôn",      ipa: "ˈvɪlɪdʒ",    sourceQuizId: "cambridge", correctSessions: 0, isMastered: false },
  { word: "weather",   vi: "thời tiết",       ipa: "ˈweðər",     sourceQuizId: "cambridge", correctSessions: 0, isMastered: false },
  { word: "excited",   vi: "phấn khích",      ipa: "ɪkˈsaɪtɪd",  sourceQuizId: "cambridge", correctSessions: 0, isMastered: false },
  { word: "yellow",    vi: "màu vàng",        ipa: "ˈjeloʊ",     sourceQuizId: "cambridge", correctSessions: 0, isMastered: false },
];

const HANGMAN_WORDS_PER_SESSION = 5;

function shuffleArray<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function pickHangmanWords(
  pending: VocabWord[],
  count = HANGMAN_WORDS_PER_SESSION
): VocabWord[] {
  const shuffled = shuffleArray(pending);
  const chosen = shuffled.slice(0, count);

  if (chosen.length < count) {
    // Bổ sung từ fallback (random, không trùng)
    const usedWords = new Set(chosen.map((w) => w.word.toLowerCase()));
    const fallback  = shuffleArray(CAMBRIDGE_FALLBACK.filter((f) => !usedWords.has(f.word.toLowerCase())));
    const extra     = fallback.slice(0, count - chosen.length);
    chosen.push(...extra);
  }

  return chosen;
}

// ─── Props ────────────────────────────────────────────────────────────────────
interface HangmanLauncherProps {
  pendingWords: VocabWord[];   // Từ chưa mastered từ hook useVocabulary
  isLoggedIn: boolean;
  onMarkCorrect: (word: string) => void;
  onStarsEarned: (stars: number) => void;
}

// ─── Component ───────────────────────────────────────────────────────────────
export function HangmanLauncher({
  pendingWords,
  isLoggedIn,
  onMarkCorrect,
  onStarsEarned,
}: HangmanLauncherProps) {
  const [gameOpen, setGameOpen]     = useState(false);
  const [result, setResult]         = useState<HangmanResult | null>(null);

  // 5 từ đã chọn — chỉ tính 1 lần khi mở game
  const selectedWords = useMemo(() => pickHangmanWords(pendingWords), [pendingWords]);

  const handleComplete = (res: HangmanResult) => {
    setResult(res);
    setGameOpen(false);
    if (isLoggedIn && res.starsEarned > 0) {
      onStarsEarned(res.starsEarned);
    }
  };

  return (
    <>
      {/* Nút mở Hangman */}
      {!result && (
        <button
          className="hangman-launcher-btn"
          id="btn-open-hangman"
          onClick={() => setGameOpen(true)}
        >
          <span className="hangman-launcher-btn__icon">🎯</span>
          <div className="hangman-launcher-btn__text">
            <strong>Chơi Hangman — Ôn từ vựng</strong>
            <span>
              {pendingWords.length > 0
                ? `${pendingWords.length} từ cần ôn`
                : "Ôn từ Cambridge"}
            </span>
          </div>
          <span className="hangman-launcher-btn__stars">+1/+2 ⭐</span>
        </button>
      )}

      {/* Kết quả sau khi chơi */}
      {result && (
        <div className="hangman-result animate-fadeIn">
          <div className="hangman-result__score">
            {result.starsEarned === 2 && "🌟🌟"}
            {result.starsEarned === 1 && "⭐"}
            {result.starsEarned === 0 && "💪"}
          </div>
          <div className="hangman-result__label">
            {result.correctWords.length}/{HANGMAN_WORDS_PER_SESSION} từ đúng
            {result.starsEarned > 0 && ` — +${result.starsEarned} ⭐`}
          </div>
          {result.wrongWords.length > 0 && (
            <div className="hangman-result__wrong">
              Cần ôn thêm: {result.wrongWords.join(", ")}
            </div>
          )}
          {!isLoggedIn && (
            <div className="hangman-result__guest">
              Đăng nhập để lưu ⭐ và tiến độ!
            </div>
          )}
          <button
            className="btn btn-outline btn-sm"
            onClick={() => { setResult(null); setGameOpen(true); }}
          >
            Chơi lại
          </button>
        </div>
      )}

      {/* Game modal */}
      {gameOpen && (
        <HangmanGame
          words={selectedWords}
          isLoggedIn={isLoggedIn}
          onComplete={handleComplete}
          onClose={() => setGameOpen(false)}
          onMarkCorrect={onMarkCorrect}
        />
      )}
    </>
  );
}
