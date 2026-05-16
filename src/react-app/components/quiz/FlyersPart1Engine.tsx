/**
 * FlyersPart1Engine.tsx — v2 (Retrofitted)
 * Cambridge Flyers Reading & Writing — Part 1: "Look and Read"
 *
 * Cơ chế:
 *  - Word Bank: 15 chips có thể click, từ đã dùng sẽ mờ/ẩn
 *  - User click từ → điền vào câu đang active (highlight)
 *  - User click từ đang nằm trong câu → từ bay về Word Bank
 *  - Sau submit: hiển thị đúng/sai + explanation_vi
 *
 * Layout v2:
 *  - Desktop (≥768px): 2 cột — Word Bank + Example + VocabPanel (trái) | 🖼 Image + 10 câu (phải)
 *  - Mobile (<768px): Word Bank (fixed) → 🖼 Image → Example → 10 câu → VocabPanel
 *
 * Standard Modules (v2):
 *  - VocabPanel (từ vựng + IPA + tra nghĩa)
 *  - Star mechanic (3 lượt miễn phí → lượt 4+ tốn 1⭐)
 *  - Auth nudge (chưa login → popup nhắc đăng nhập)
 *  - DB tracking (ghi từ đã tra vào student_vocabulary)
 *  - Image display (image_url → hiển thị trên cột phải, click mở lightbox)
 */

import { useState, useCallback, useRef, useEffect } from "react";
import "./FlyersPart1Engine.css";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface VocabHighlightItem {
  word: string;
  vocabulary_bank_id: string | null;
  translation_vi: string;
  ipa: string;
  audio_url: string | null;
}

export interface FlyersPart1Question {
  id: string;
  number: number;
  prompt: string;
  correct: string;
  explanation_vi?: string;
}

export interface FlyersPart1Example {
  prompt: string;
  answer: string;
}

export interface FlyersPart1Quiz {
  id: string;
  title: string;
  skill: string;
  level: string;
  part: number;
  type: "flyers-part1";
  is_free: boolean;
  pathway: string;
  group: string;
  difficulty?: string;
  ui_language?: string;
  instructions_en?: string;
  image_url?: string | null;
  vocab_highlight?: VocabHighlightItem[];
  word_bank: string[];
  example: FlyersPart1Example;
  questions: FlyersPart1Question[];
}

export type FlyersPart1Answers = Record<string, string>; // { q1: "a dictionary", ... }

interface FlyersPart1Result {
  score: number;
  maxScore: number;
  percentage: number;
  starsEarned: number;
  saved: boolean;
  correctAnswers: Record<string, string>;
  answersForApi: Record<string, string>;
  startTime: number;
}

interface FlyersPart1EngineProps {
  quiz: FlyersPart1Quiz;
  onSubmitResult?: (result: FlyersPart1Result) => void;
  onFinish?: () => void;
  onBack?: () => void;
  isLoggedIn?: boolean;
  studentId?: string | null;
}

// ─── Helper ───────────────────────────────────────────────────────────────────

function calcStars(pct: number): number {
  if (pct >= 90) return 5;
  if (pct >= 70) return 3;
  if (pct >= 50) return 2;
  return 1;
}

// ─── VocabPanel ──────────────────────────────────────────────────────────────

const FREE_LOOKUPS = 3;
const LOOKUP_WARNING =
  `🎁 Bạn có ${FREE_LOOKUPS} lượt xem nghĩa của từ miễn phí trong bài này!\n` +
  `Lượt thứ 4 trở đi sẽ đổi 1 ⭐ mỗi lượt nhé 😊\n` +
  `(Ngôi sao không bao giờ mất — chỉ dùng để tra từ thôi!)`;

interface VocabPanelProps {
  vocab: VocabHighlightItem[];
  isLoggedIn: boolean;
  quizId: string;
}

function VocabPanel({ vocab, isLoggedIn, quizId }: VocabPanelProps) {
  const [revealed, setRevealed] = useState<Set<string>>(new Set());
  const [lookupCount, setLookupCount] = useState(0);
  const [showAuthNudge, setShowAuthNudge] = useState(false);
  const [showStarWarn, setShowStarWarn] = useState(false);

  const handleAudio = useCallback((item: VocabHighlightItem) => {
    if (item.audio_url) {
      const audio = new Audio(item.audio_url);
      audio.play().catch(() => {
        const utt = new SpeechSynthesisUtterance(item.word);
        utt.lang = "en-US";
        speechSynthesis.speak(utt);
      });
    } else {
      const utt = new SpeechSynthesisUtterance(item.word);
      utt.lang = "en-US";
      speechSynthesis.speak(utt);
    }
  }, []);

  const handleTranslate = useCallback(async (item: VocabHighlightItem) => {
    if (!isLoggedIn) {
      setShowAuthNudge(true);
      return;
    }
    if (revealed.has(item.word)) return;

    const newCount = lookupCount + 1;

    if (newCount > FREE_LOOKUPS) {
      setShowStarWarn(true);
      try {
        await fetch("/api/student/stars/deduct", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ amount: 1, reason: "vocab_lookup", quiz_id: quizId }),
          credentials: "include",
        });
      } catch { /* silent */ }
    }

    setLookupCount(newCount);
    setRevealed(prev => new Set([...prev, item.word]));

    // DB tracking — backend lấy student_id từ session cookie
    if (item.vocabulary_bank_id) {
      fetch("/api/student/vocab/seen", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ word_id: item.vocabulary_bank_id, word: item.word }),
        credentials: "include",
      }).catch(() => {/* silent */ });
    }
  }, [isLoggedIn, revealed, lookupCount, quizId]);

  const remaining = Math.max(0, FREE_LOOKUPS - lookupCount);

  return (
    <div className="fp4-vocab-panel">
      <div className="fp4-vocab-panel__header">
        <span className="fp4-vocab-panel__title">📚 Vocabulary</span>
        <span className={`fp4-vocab-panel__counter ${remaining === 0 ? "fp4-vocab-panel__counter--zero" : ""}`}>
          {remaining > 0 ? `${remaining} free look-ups` : "No free look-ups — 1⭐ each"}
        </span>
      </div>
      <p className="fp4-vocab-panel__rule">{LOOKUP_WARNING}</p>

      <ul className="fp4-vocab-list" role="list">
        {vocab.map((item) => {
          const isRevealed = revealed.has(item.word);
          return (
            <li key={item.word} className="fp4-vocab-item">
              <div className="fp4-vocab-item__top">
                <span className="fp4-vocab-item__word">{item.word}</span>
                {item.ipa && <span className="fp4-vocab-item__ipa">{item.ipa}</span>}
                <div className="fp4-vocab-item__actions">
                  <button
                    className="fp4-vocab-btn fp4-vocab-btn--audio"
                    onClick={() => handleAudio(item)}
                    title="Listen to pronunciation"
                    aria-label={`Pronounce ${item.word}`}
                  >
                    🔊
                  </button>
                  <button
                    className={`fp4-vocab-btn fp4-vocab-btn--translate ${isRevealed ? "fp4-vocab-btn--revealed" : ""}`}
                    onClick={() => handleTranslate(item)}
                    title={isRevealed ? item.translation_vi : "Xem nghĩa tiếng Việt"}
                    aria-label={`Xem nghĩa của ${item.word}`}
                    disabled={isRevealed}
                  >
                    {isRevealed ? "✓ VN" : "VN"}
                  </button>
                </div>
              </div>
              {isRevealed && (
                <div className="fp4-vocab-item__translation" role="status" aria-live="polite">
                  🇻🇳 <strong>{item.translation_vi}</strong>
                </div>
              )}
            </li>
          );
        })}
      </ul>

      {/* Auth nudge popup */}
      {showAuthNudge && (
        <div className="fp4-nudge-overlay" role="dialog" aria-modal="true">
          <div className="fp4-nudge-popup">
            <p>🔐 <strong>Log in to look up words &amp; save your progress!</strong></p>
            <p className="fp4-nudge-popup__sub">Your vocabulary progress will be saved for review later.</p>
            <div className="fp4-nudge-popup__actions">
              <a href="/api/auth/google" className="btn btn-success">Sign in with Google</a>
              <button className="btn btn-outline" onClick={() => setShowAuthNudge(false)}>Maybe later</button>
            </div>
          </div>
        </div>
      )}

      {/* Star warning */}
      {showStarWarn && (
        <div className="fp4-star-toast" role="alert" aria-live="assertive">
          ⭐ You used 1 star to look up a word!
          <button className="fp4-star-toast__close" onClick={() => setShowStarWarn(false)} aria-label="Close">✕</button>
        </div>
      )}
    </div>
  );
}

// ─── Image Lightbox ───────────────────────────────────────────────────────────

function ImageLightbox({ src, alt, onClose }: { src: string; alt: string; onClose: () => void }) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [onClose]);

  return (
    <div className="fp4-lightbox" role="dialog" aria-modal="true" aria-label="Phóng to hình ảnh" onClick={onClose}>
      <button className="fp4-lightbox__close" onClick={onClose} aria-label="Đóng">✕</button>
      <img
        src={src}
        alt={alt}
        className="fp4-lightbox__img"
        onClick={e => e.stopPropagation()}
      />
      <p className="fp4-lightbox__hint">Click bất kỳ đâu hoặc nhấn ESC để đóng</p>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export function FlyersPart1Engine({
  quiz,
  onSubmitResult,
  onFinish,
  onBack,
  isLoggedIn = false,
}: FlyersPart1EngineProps) {
  const [activeQ, setActiveQ] = useState<string | null>(null);
  const [placed, setPlaced] = useState<FlyersPart1Answers>({});
  const [submitted, setSubmitted] = useState(false);
  const [result, setResult] = useState<FlyersPart1Result | null>(null);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const startTimeRef = useRef<number>(Date.now());

  const usedWords = new Set(Object.values(placed));

  // ── Handlers ──────────────────────────────────────────────────────────────

  const handleWordBankClick = useCallback((word: string) => {
    if (submitted) return;
    if (usedWords.has(word)) return;
    if (activeQ) {
      setPlaced(prev => {
        const next = { ...prev };
        next[activeQ] = word;
        return next;
      });
      setActiveQ(null);
    }
  }, [submitted, usedWords, activeQ]);

  const handlePlacedWordClick = useCallback((questionId: string) => {
    if (submitted) return;
    setPlaced(prev => {
      const next = { ...prev };
      delete next[questionId];
      return next;
    });
    setActiveQ(questionId);
  }, [submitted]);

  const handleQuestionClick = useCallback((questionId: string) => {
    if (submitted) return;
    setActiveQ(prev => prev === questionId ? null : questionId);
  }, [submitted]);

  const handleSubmit = useCallback(() => {
    const correctAnswers: Record<string, string> = {};
    let score = 0;

    for (const q of quiz.questions) {
      correctAnswers[q.id] = q.correct;
      const userAns = placed[q.id] ?? "";
      if (userAns.trim().toLowerCase() === q.correct.trim().toLowerCase()) {
        score++;
      }
    }

    const maxScore = quiz.questions.length;
    const percentage = Math.round((score / maxScore) * 100);
    const starsEarned = calcStars(percentage);

    const res: FlyersPart1Result = {
      score,
      maxScore,
      percentage,
      starsEarned,
      saved: false,
      correctAnswers,
      answersForApi: { ...placed },
      startTime: startTimeRef.current,
    };

    setResult(res);
    setSubmitted(true);
    onSubmitResult?.(res);
  }, [quiz.questions, placed, onSubmitResult]);

  const handleReset = useCallback(() => {
    setPlaced({});
    setActiveQ(null);
    setSubmitted(false);
    setResult(null);
  }, []);

  const allAnswered = quiz.questions.every(q => placed[q.id]);

  // ── Mobile: đo chiều cao Word Bank (fixed) và set padding-top cho engine ──
  const wordBankRef = useRef<HTMLDivElement>(null);
  const engineRef   = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wb     = wordBankRef.current;
    const engine = engineRef.current;
    if (!wb || !engine) return;

    const applyPadding = () => {
      if (window.innerWidth >= 768) {
        engine.style.paddingTop = "";
        return;
      }
      const wbHeight = wb.getBoundingClientRect().height;
      engine.style.paddingTop = `${wbHeight + 44}px`;
    };

    const ro = new ResizeObserver(applyPadding);
    ro.observe(wb);
    applyPadding();

    window.addEventListener("resize", applyPadding);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", applyPadding);
    };
  }, []);

  const hasVocab = quiz.vocab_highlight && quiz.vocab_highlight.length > 0;
  const hasImage = !!quiz.image_url;

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <div className="fp1-engine" ref={engineRef}>

      {/* ── Word Bank (fixed on mobile, sticky on desktop) ── */}
      <div className="fp1-word-bank" ref={wordBankRef} aria-label="Word Bank">
        <div className="fp1-word-bank__header">
          <span className="fp1-word-bank__title">📚 Word Bank</span>
          <span className="fp1-word-bank__hint">
            {submitted ? "" : activeQ ? "Click a word to fill the blank ↓" : "Click a question first, then choose a word"}
          </span>
        </div>
        <div className="fp1-word-bank__chips">
          {quiz.word_bank.map(word => {
            const isUsed = usedWords.has(word);
            return (
              <button
                key={word}
                className={[
                  "fp1-chip",
                  isUsed ? "fp1-chip--used" : "",
                  !isUsed && activeQ && !submitted ? "fp1-chip--clickable" : "",
                ].filter(Boolean).join(" ")}
                onClick={() => handleWordBankClick(word)}
                disabled={submitted || isUsed}
                aria-label={`Word: ${word}${isUsed ? " (used)" : ""}`}
              >
                {word}
              </button>
            );
          })}
        </div>
      </div>

      {/* ── Main Layout ── */}
      <div className="fp1-layout">

        {/* ── Left panel: Instruction + Example + Image (desktop) + VocabPanel ── */}
        <div className="fp1-left">
          <div className="fp1-instruction">
            <strong>LOOK AND READ.</strong> CHOOSE THE CORRECT WORDS AND WRITE THEM ON THE LINES. THERE IS ONE EXAMPLE.
          </div>

          <div className="fp1-example">
            <p className="fp1-example__label">Example:</p>
            <p className="fp1-example__prompt">{quiz.example.prompt}</p>
            <p className="fp1-example__answer">
              <strong>{quiz.example.answer}</strong>
            </p>
          </div>

          {/* Image — Desktop only in left col (below example) */}
          {hasImage && (
            <div className="fp1-image-wrap fp1-image-desktop" onClick={() => setLightboxOpen(true)}>
              <img
                src={quiz.image_url!}
                alt={quiz.title}
                className="fp1-image"
              />
              <span className="fp1-image__zoom-hint">🔍 Click để phóng to</span>
            </div>
          )}

          {/* VocabPanel — Desktop only in left col */}
          {hasVocab && (
            <div className="fp1-vocab-desktop">
              <VocabPanel
                vocab={quiz.vocab_highlight!}
                isLoggedIn={isLoggedIn}
                quizId={quiz.id}
              />
            </div>
          )}
        </div>

        {/* ── Right panel: Questions only ── */}
        <div className="fp1-right">

          {/* Image — mobile only (top of right content on mobile) */}
          {hasImage && (
            <div className="fp1-image-wrap fp1-image-mobile" onClick={() => setLightboxOpen(true)}>
              <img
                src={quiz.image_url!}
                alt={quiz.title}
                className="fp1-image"
              />
              <span className="fp1-image__zoom-hint">🔍 Click để phóng to</span>
            </div>
          )}

          <ol className="fp1-questions">
            {quiz.questions.map(q => {
              const placedWord = placed[q.id];
              const isActive   = activeQ === q.id && !submitted;
              const isCorrect  = submitted &&
                placedWord?.trim().toLowerCase() === q.correct.trim().toLowerCase();
              const isWrong    = submitted && placedWord && !isCorrect;
              const isMissed   = submitted && !placedWord;

              return (
                <li
                  key={q.id}
                  className={[
                    "fp1-question",
                    isActive  ? "fp1-question--active"   : "",
                    isCorrect ? "fp1-question--correct"  : "",
                    isWrong   ? "fp1-question--wrong"    : "",
                    isMissed  ? "fp1-question--missed"   : "",
                  ].filter(Boolean).join(" ")}
                  onClick={() => handleQuestionClick(q.id)}
                  role="button"
                  tabIndex={submitted ? -1 : 0}
                  onKeyDown={e => { if (e.key === "Enter" || e.key === " ") handleQuestionClick(q.id); }}
                  aria-label={`Question ${q.number}: ${q.prompt}`}
                >
                  <span className="fp1-question__number">{q.number}.</span>
                  <div className="fp1-question__body">
                    <p className="fp1-question__prompt">{q.prompt}</p>

                    <div className="fp1-question__answer-row">
                      {placedWord ? (
                        <button
                          className={[
                            "fp1-placed-word",
                            isCorrect ? "fp1-placed-word--correct" : "",
                            isWrong   ? "fp1-placed-word--wrong"   : "",
                          ].filter(Boolean).join(" ")}
                          onClick={e => { e.stopPropagation(); handlePlacedWordClick(q.id); }}
                          disabled={submitted}
                          aria-label={`Your answer: ${placedWord}. Click to remove.`}
                        >
                          {placedWord}
                          {!submitted && <span className="fp1-placed-word__remove" aria-hidden>✕</span>}
                        </button>
                      ) : (
                        <span
                          className={["fp1-blank", isActive ? "fp1-blank--active" : ""].filter(Boolean).join(" ")}
                          aria-label="Empty blank"
                        >
                          {isActive ? "▶ click a word above" : "___________"}
                        </span>
                      )}

                      {isWrong && (
                        <span className="fp1-correct-hint">
                          ✓ {q.correct}
                        </span>
                      )}
                      {isMissed && (
                        <span className="fp1-correct-hint fp1-correct-hint--missed">
                          ✓ {q.correct}
                        </span>
                      )}
                    </div>

                    {submitted && q.explanation_vi && (
                      <p className={`fp1-explanation ${isCorrect ? "fp1-explanation--correct" : "fp1-explanation--wrong"}`}>
                        {isCorrect ? "🎉" : "💡"} {q.explanation_vi}
                      </p>
                    )}
                  </div>
                </li>
              );
            })}
          </ol>

          {/* ── Submit / Result Bar ── */}
          {!submitted ? (
            <div className="fp1-footer">
              <span className="fp1-footer__count">
                {Object.keys(placed).length} / {quiz.questions.length} answered
              </span>
              <button
                className="btn btn-success fp1-submit-btn"
                onClick={handleSubmit}
                disabled={!allAnswered}
                id="btn-fp1-submit"
                title={!allAnswered ? "Please fill all blanks first" : "Submit your answers"}
              >
                Submit ✓
              </button>
            </div>
          ) : (
            <div className="fp1-result">
              <div className="fp1-result__score">
                <span className="fp1-result__stars">
                  {"⭐".repeat(result?.starsEarned ?? 0)}
                </span>
                <span className="fp1-result__text">
                  {result?.score} / {result?.maxScore} correct
                  <em> ({result?.percentage}%)</em>
                </span>
              </div>

              <div className="fp1-result__actions">
                {onFinish && (
                  <button
                    className="btn btn-success"
                    onClick={onFinish}
                    id="btn-fp1-finish"
                  >
                    ✅ Finish &amp; Save
                  </button>
                )}
                {onBack && (
                  <button
                    className="btn btn-outline"
                    onClick={onBack}
                    id="btn-fp1-back"
                  >
                    ← Về danh sách
                  </button>
                )}
                {!onFinish && !onBack && (
                  <button className="btn btn-outline" onClick={handleReset} id="btn-fp1-retry">
                    🔄 Try Again
                  </button>
                )}
              </div>
            </div>
          )}

          {/* VocabPanel — Mobile only (below questions) */}
          {hasVocab && (
            <div className="fp1-vocab-mobile">
              <VocabPanel
                vocab={quiz.vocab_highlight!}
                isLoggedIn={isLoggedIn}
                quizId={quiz.id}
              />
            </div>
          )}
        </div>
      </div>

      {/* Lightbox */}
      {lightboxOpen && quiz.image_url && (
        <ImageLightbox
          src={quiz.image_url}
          alt={quiz.title}
          onClose={() => setLightboxOpen(false)}
        />
      )}
    </div>
  );
}
