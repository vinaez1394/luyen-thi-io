/**
 * HomeHangman.tsx — Widget Hangman độc lập cho trang chủ
 *
 * Phase 05: Ưu tiên từ vựng từ bài vừa làm (last_quiz_id từ localStorage).
 *           Fallback về Cambridge word list nếu không có.
 *
 * Khác với HangmanLauncher (trong quiz), đây là widget standalone:
 * - Tự dùng Cambridge word list (không cần quiz)
 * - Nhúng trực tiếp vào trang chủ, section "Chơi hết mình"
 * - Hiển thị dưới dạng preview card + mở modal khi click
 */

import { useState } from "react";
import type { VocabWord } from "../../types/vocabulary";
import { HangmanGame } from "./HangmanGame";
import type { HangmanResult } from "./HangmanGame";
import "./HomeHangman.css";

// ─── Cambridge word list (fallback) ───────────────────────────────────────────
const CAMBRIDGE_WORDS: VocabWord[] = [
  { word: "adventure",  vi: "cuộc phiêu lưu",    ipa: "ədˈventʃər",  sourceQuizId: "cambridge", correctSessions: 0, isMastered: false },
  { word: "beautiful",  vi: "đẹp, xinh đẹp",      ipa: "ˈbjuːtɪfəl",  sourceQuizId: "cambridge", correctSessions: 0, isMastered: false },
  { word: "careful",    vi: "cẩn thận",            ipa: "ˈkeəfəl",     sourceQuizId: "cambridge", correctSessions: 0, isMastered: false },
  { word: "dangerous",  vi: "nguy hiểm",           ipa: "ˈdeɪndʒərəs", sourceQuizId: "cambridge", correctSessions: 0, isMastered: false },
  { word: "exciting",   vi: "thú vị, kích thích",  ipa: "ɪkˈsaɪtɪŋ",  sourceQuizId: "cambridge", correctSessions: 0, isMastered: false },
  { word: "favorite",   vi: "yêu thích nhất",      ipa: "ˈfeɪvərɪt",   sourceQuizId: "cambridge", correctSessions: 0, isMastered: false },
  { word: "gentle",     vi: "nhẹ nhàng, hiền lành", ipa: "ˈdʒentəl",   sourceQuizId: "cambridge", correctSessions: 0, isMastered: false },
  { word: "honest",     vi: "thành thật",           ipa: "ˈɒnɪst",     sourceQuizId: "cambridge", correctSessions: 0, isMastered: false },
  { word: "imagine",    vi: "tưởng tượng",          ipa: "ɪˈmædʒɪn",   sourceQuizId: "cambridge", correctSessions: 0, isMastered: false },
  { word: "journey",    vi: "hành trình",           ipa: "ˈdʒɜːni",     sourceQuizId: "cambridge", correctSessions: 0, isMastered: false },
  { word: "kitchen",    vi: "nhà bếp",              ipa: "ˈkɪtʃɪn",    sourceQuizId: "cambridge", correctSessions: 0, isMastered: false },
  { word: "library",    vi: "thư viện",             ipa: "ˈlaɪbrəri",   sourceQuizId: "cambridge", correctSessions: 0, isMastered: false },
  { word: "mountain",   vi: "ngọn núi",             ipa: "ˈmaʊntɪn",   sourceQuizId: "cambridge", correctSessions: 0, isMastered: false },
  { word: "nervous",    vi: "lo lắng, bồn chồn",    ipa: "ˈnɜːvəs",    sourceQuizId: "cambridge", correctSessions: 0, isMastered: false },
  { word: "ocean",      vi: "đại dương",            ipa: "ˈoʊʃən",     sourceQuizId: "cambridge", correctSessions: 0, isMastered: false },
  { word: "patient",    vi: "kiên nhẫn",            ipa: "ˈpeɪʃənt",   sourceQuizId: "cambridge", correctSessions: 0, isMastered: false },
  { word: "rainbow",    vi: "cầu vồng",             ipa: "ˈreɪnboʊ",   sourceQuizId: "cambridge", correctSessions: 0, isMastered: false },
  { word: "scissors",   vi: "cái kéo",              ipa: "ˈsɪzərz",    sourceQuizId: "cambridge", correctSessions: 0, isMastered: false },
  { word: "together",   vi: "cùng nhau",            ipa: "ˈteɡeðər",   sourceQuizId: "cambridge", correctSessions: 0, isMastered: false },
  { word: "umbrella",   vi: "cái ô, cái dù",        ipa: "ʌmˈbrelə",   sourceQuizId: "cambridge", correctSessions: 0, isMastered: false },
  { word: "village",    vi: "làng quê, thôn",       ipa: "ˈvɪlɪdʒ",    sourceQuizId: "cambridge", correctSessions: 0, isMastered: false },
  { word: "weather",    vi: "thời tiết",            ipa: "ˈweðər",     sourceQuizId: "cambridge", correctSessions: 0, isMastered: false },
  { word: "excited",    vi: "phấn khích",           ipa: "ɪkˈsaɪtɪd",  sourceQuizId: "cambridge", correctSessions: 0, isMastered: false },
  { word: "pineapple",  vi: "quả dứa (thơm)",       ipa: "ˈpaɪnæpəl",  sourceQuizId: "cambridge", correctSessions: 0, isMastered: false },
  { word: "elephant",   vi: "con voi",              ipa: "ˈelɪfənt",   sourceQuizId: "cambridge", correctSessions: 0, isMastered: false },
  { word: "butterfly",  vi: "con bướm",             ipa: "ˈbʌtərflaɪ", sourceQuizId: "cambridge", correctSessions: 0, isMastered: false },
  { word: "afternoon",  vi: "buổi chiều",           ipa: "ˌæftərˈnuːn", sourceQuizId: "cambridge", correctSessions: 0, isMastered: false },
  { word: "breakfast",  vi: "bữa sáng",             ipa: "ˈbrekfəst",  sourceQuizId: "cambridge", correctSessions: 0, isMastered: false },
  { word: "swimming",   vi: "bơi lội",              ipa: "ˈswɪmɪŋ",    sourceQuizId: "cambridge", correctSessions: 0, isMastered: false },
  { word: "birthday",   vi: "sinh nhật",            ipa: "ˈbɜːrθdeɪ",  sourceQuizId: "cambridge", correctSessions: 0, isMastered: false },
];

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// ─── Load từ vựng từ quiz JSON (Phase 05) ─────────────────────────────────────
async function loadWordsFromQuiz(quizId: string): Promise<VocabWord[]> {
  try {
    const folder = quizId.startsWith("RW") || quizId.startsWith("RL")
      ? "flyers"
      : quizId.startsWith("MATH")
        ? "math"
        : "flyers";
    const res = await fetch(`/content/${folder}/${quizId}.json`);
    if (!res.ok) throw new Error("not found");
    const quiz = await res.json() as {
      questions?: { vocabulary?: { word: string; meaning: string; ipa?: string }[] }[];
    };
    const words: VocabWord[] = [];
    for (const q of quiz.questions ?? []) {
      for (const v of q.vocabulary ?? []) {
        if (v.word && words.length < 15) {
          words.push({
            word:            v.word,
            vi:              v.meaning ?? "",
            ipa:             v.ipa ?? "",
            sourceQuizId:    quizId,
            correctSessions: 0,
            isMastered:      false,
          });
        }
      }
    }
    return words.length >= 3 ? words : [];
  } catch {
    return [];
  }
}

// ─── Preview: 3 từ mẫu hiện trên card ────────────────────────────────────────
const PREVIEW_WORDS = CAMBRIDGE_WORDS.slice(0, 3);

// ─── Component ────────────────────────────────────────────────────────────────
export function HomeHangman() {
  const [open,         setOpen]         = useState(false);
  const [result,       setResult]       = useState<HangmanResult | null>(null);
  const [sessionWords, setSessionWords] = useState<VocabWord[]>([]);

  // Phase 05: ưu tiên từ bài vừa làm → fallback Cambridge
  const handleOpen = async () => {
    setResult(null);

    const lastQuizId = localStorage.getItem("last_quiz_id") ?? "";
    let words: VocabWord[] = [];

    if (lastQuizId) {
      words = await loadWordsFromQuiz(lastQuizId);
    }

    if (words.length < 3) {
      words = CAMBRIDGE_WORDS;
    }

    setSessionWords(shuffle(words).slice(0, 5));
    setOpen(true);
  };

  const handleComplete = (res: HangmanResult) => {
    setResult(res);
    setOpen(false);
  };

  return (
    <div className="home-hangman">
      {/* Card preview */}
      <div className="home-hangman__card">
        {/* Left: info */}
        <div className="home-hangman__info">
          <div className="home-hangman__label">🎮 Cambridge Flyers</div>
          <h3 className="home-hangman__title">Hangman — Đoán từ</h3>
          <p className="home-hangman__desc">
            Đoán đúng từ → nhận sao ⭐. Ôn từ vựng mỗi ngày!
          </p>

          {/* Sample words preview */}
          <div className="home-hangman__preview">
            {PREVIEW_WORDS.map((w) => (
              <span key={w.word} className="home-hangman__preview-word">
                <span className="home-hangman__preview-en">{w.word}</span>
                <span className="home-hangman__preview-vi">{w.vi}</span>
              </span>
            ))}
            <span className="home-hangman__preview-more">+{CAMBRIDGE_WORDS.length - 3} từ...</span>
          </div>

          <button
            className="btn btn-primary"
            id="btn-home-hangman"
            onClick={handleOpen}
          >
            🎯 Chơi ngay
          </button>
        </div>

        {/* Right: ASCII hangman preview */}
        <div className="home-hangman__visual" aria-hidden="true">
          <svg viewBox="0 0 160 180" className="home-hangman__svg">
            {/* Giá treo */}
            <line x1="15" y1="165" x2="145" y2="165" strokeWidth="4" className="hh-line" />
            <line x1="50" y1="165" x2="50" y2="15"  strokeWidth="4" className="hh-line" />
            <line x1="50" y1="15"  x2="105" y2="15"  strokeWidth="4" className="hh-line" />
            <line x1="105" y1="15" x2="105" y2="38"  strokeWidth="4" className="hh-line" />
            {/* Hình người (đang đoán dở — 3/6) */}
            <circle cx="105" cy="50" r="12" strokeWidth="3" className="hh-body" />
            <line x1="105" y1="62" x2="105" y2="108" strokeWidth="3" className="hh-body" />
            <line x1="105" y1="75" x2="83"  y2="95"  strokeWidth="3" className="hh-body" />
          </svg>
          {/* Slots từ sample */}
          <div className="home-hangman__slots">
            {"MOUNTAIN".split("").map((c, i) => (
              <span key={i} className={`home-hangman__slot ${i < 3 ? "home-hangman__slot--shown" : ""}`}>
                {i < 3 ? c : ""}
              </span>
            ))}
          </div>
          <div className="home-hangman__hint-vi">núi</div>
        </div>
      </div>

      {/* Kết quả sau khi chơi */}
      {result && (
        <div className="home-hangman__result animate-fadeIn">
          <span className="home-hangman__result-score">
            {result.starsEarned === 2 ? "🌟🌟" : result.starsEarned === 1 ? "⭐" : "💪"}
          </span>
          <span>
            {result.correctWords.length}/5 đúng
            {result.starsEarned > 0 && ` — +${result.starsEarned} ⭐`}
          </span>
          <button className="btn btn-outline btn-sm" onClick={handleOpen}>
            Chơi lại
          </button>
        </div>
      )}

      {/* Game modal */}
      {open && sessionWords.length > 0 && (
        <HangmanGame
          words={sessionWords}
          isLoggedIn={false}   // trang chủ không check login cho game
          onComplete={handleComplete}
          onClose={() => setOpen(false)}
          onMarkCorrect={() => {}}  // trang chủ không lưu mastery
        />
      )}
    </div>
  );
}
