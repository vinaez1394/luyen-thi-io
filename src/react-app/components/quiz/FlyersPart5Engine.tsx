/**
 * FlyersPart5Engine.tsx — v1
 * Cambridge Flyers Reading & Writing — Part 5:
 * "Look at the picture and read the story. Write some words to complete
 *  the sentences about the story. You can use 1, 2, or 3 words."
 *
 * Cơ chế:
 *  - LEFT panel: Passage dài (scrollable) + VocabPanel (sticky bottom, desktop)
 *  - RIGHT panel: Image (+ lightbox) → 2 Examples → 7 Questions với text input
 *  - Mobile: accordion "📖 Read the Story" + panel câu hỏi bên dưới
 *  - Chấm điểm: normalize (lowercase + trim + bỏ a/an/the) + multiple accepted_answers
 *  - Sau Submit: tô màu input + explanations_vi + highlight vàng đoạn passage tương ứng
 *  - Standard modules: VocabPanel, Star mechanic, Auth nudge, DB tracking
 */

import { useState, useCallback, useRef } from "react";
import "./FlyersPart5Engine.css";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface VocabHighlightItem {
  word: string;
  vocabulary_bank_id: string | null;
  translation_vi: string;
  ipa: string;
  audio_url: string | null;
}

export interface FlyersPart5Example {
  number: number;
  sentence: string;
  answer: string;
}

export interface FlyersPart5Question {
  number: number;
  /** Câu hoàn thành, dùng _____ làm placeholder cho blank */
  sentence: string;
  /** Danh sách đáp án được chấp nhận (case-insensitive, normalize) */
  accepted_answers: string[];
  /** Đoạn văn nguyên văn để highlight sau submit */
  passage_highlight: string;
  explanation_vi: string;
}

export interface FlyersPart5Quiz {
  id: string;
  title: string;
  skill: string;
  level: string;
  part: number;
  type: "flyers-part5";
  is_free: boolean;
  pathway: string;
  group: string;
  difficulty?: string;
  topic?: string;
  ui_language?: string;
  image_url?: string | null;
  instructions_en: string;
  /** Đoạn văn bài đọc nguyên vẹn */
  passage: string;
  /** 2 câu ví dụ (không chấm điểm) */
  examples: FlyersPart5Example[];
  /** 7 câu hỏi cần điền */
  questions: FlyersPart5Question[];
  vocab_highlight?: VocabHighlightItem[];
}

interface FlyersPart5Result {
  score: number;
  maxScore: number;
  percentage: number;
  starsEarned: number;
  answersForApi: Record<string, string>;
  startTime: number;
}

interface FlyersPart5EngineProps {
  quiz: FlyersPart5Quiz;
  onSubmitResult?: (result: FlyersPart5Result) => void;
  onFinish?: () => void;
  onBack?: () => void;
  isLoggedIn?: boolean;
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

/** Chuẩn hóa câu trả lời: lowercase, trim, bỏ mạo từ đứng đầu */
function normalizeAnswer(s: string): string {
  return s
    .toLowerCase()
    .trim()
    .replace(/^(a|an|the)\s+/i, "")
    .replace(/\s+/g, " ");
}

function isCorrect(userInput: string, accepted: string[]): boolean {
  if (!userInput.trim()) return false;
  const n = normalizeAnswer(userInput);
  return accepted.some(a => normalizeAnswer(a) === n);
}

function calcStars(pct: number): number {
  if (pct >= 90) return 5;
  if (pct >= 70) return 3;
  if (pct >= 50) return 2;
  return 1;
}

/**
 * Render passage với highlighted spans.
 * highlights: mảng { text, correct }
 * Tìm từng chuỗi trong passage, wrap bằng <mark>.
 */
function buildHighlightedPassage(
  passage: string,
  highlights: Array<{ text: string; correct: boolean }>
): React.ReactNode[] {
  // Build danh sách vị trí cần highlight (không overlap)
  interface HighlightRange {
    start: number;
    end: number;
    correct: boolean;
  }
  const ranges: HighlightRange[] = [];

  for (const { text, correct } of highlights) {
    if (!text) continue;
    const lower = passage.toLowerCase();
    const idx = lower.indexOf(text.toLowerCase());
    if (idx === -1) continue;
    // Kiểm tra không overlap với range đã có
    const overlaps = ranges.some(r => idx < r.end && idx + text.length > r.start);
    if (!overlaps) {
      ranges.push({ start: idx, end: idx + text.length, correct });
    }
  }
  ranges.sort((a, b) => a.start - b.start);

  // Chia passage thành các đoạn text + mark
  const nodes: React.ReactNode[] = [];
  let cursor = 0;
  for (const r of ranges) {
    if (cursor < r.start) {
      nodes.push(<span key={`t-${cursor}`}>{passage.slice(cursor, r.start)}</span>);
    }
    nodes.push(
      <mark
        key={`h-${r.start}`}
        className={`fp5-highlight ${r.correct ? "fp5-highlight--correct" : "fp5-highlight--wrong"}`}
      >
        {passage.slice(r.start, r.end)}
      </mark>
    );
    cursor = r.end;
  }
  if (cursor < passage.length) {
    nodes.push(<span key={`t-end`}>{passage.slice(cursor)}</span>);
  }
  return nodes;
}

// ─── VocabPanel ───────────────────────────────────────────────────────────────

const FREE_LOOKUPS = 3;

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
      new Audio(item.audio_url).play().catch(() => {
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
    if (!isLoggedIn) { setShowAuthNudge(true); return; }
    if (revealed.has(item.word)) return;

    const newCount = lookupCount + 1;
    if (newCount > FREE_LOOKUPS) {
      setShowStarWarn(true);
      fetch("/api/student/stars/deduct", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: 1, reason: "vocab_lookup", quiz_id: quizId }),
        credentials: "include",
      }).catch(() => {/* silent */});
    }
    setLookupCount(newCount);
    setRevealed(prev => new Set([...prev, item.word]));

    // DB tracking (fire-and-forget) — không cần studentId, backend lấy từ cookie
    if (item.vocabulary_bank_id) {
      fetch("/api/student/vocab/seen", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ word_id: item.vocabulary_bank_id, word: item.word }),
        credentials: "include",
      }).catch(() => {/* silent */});
    }
  }, [isLoggedIn, revealed, lookupCount, quizId]);

  const remaining = Math.max(0, FREE_LOOKUPS - lookupCount);

  return (
    <div className="fp5-vocab-panel">
      <div className="fp5-vocab-panel__header">
        <span className="fp5-vocab-panel__title">📚 Vocabulary</span>
        <span className={`fp5-vocab-panel__counter ${remaining === 0 ? "fp5-vocab-panel__counter--zero" : ""}`}>
          {remaining > 0 ? `${remaining} free look-ups` : "No free look-ups — 1⭐ each"}
        </span>
      </div>
      <ul className="fp5-vocab-list" role="list">
        {vocab.map(item => {
          const isRevealed = revealed.has(item.word);
          return (
            <li key={item.word} className="fp5-vocab-item">
              <div className="fp5-vocab-item__row">
                <div className="fp5-vocab-item__word-group">
                  <span className="fp5-vocab-item__word">{item.word}</span>
                  {item.ipa && <span className="fp5-vocab-item__ipa">{item.ipa}</span>}
                </div>
                <div className="fp5-vocab-item__actions">
                  <button
                    className="fp5-vocab-btn fp5-vocab-btn--audio"
                    onClick={() => handleAudio(item)}
                    title="Listen"
                    aria-label={`Pronounce ${item.word}`}
                  >🔊</button>
                  <button
                    className={`fp5-vocab-btn fp5-vocab-btn--translate ${isRevealed ? "fp5-vocab-btn--revealed" : ""}`}
                    onClick={() => handleTranslate(item)}
                    disabled={isRevealed}
                    aria-label={`Xem nghĩa của ${item.word}`}
                  >
                    {isRevealed ? "✓ VN" : "VN"}
                  </button>
                </div>
              </div>
              {isRevealed && (
                <div className="fp5-vocab-item__translation" role="status">
                  🇻🇳 <strong>{item.translation_vi}</strong>
                </div>
              )}
            </li>
          );
        })}
      </ul>

      {showAuthNudge && (
        <div className="fp5-nudge-overlay" role="dialog" aria-modal="true">
          <div className="fp5-nudge-popup">
            <p>🔐 <strong>Log in to look up words & save your progress!</strong></p>
            <p className="fp5-nudge-popup__sub">Your vocabulary progress will be saved for review later.</p>
            <div className="fp5-nudge-popup__actions">
              <a href="/api/auth/google" className="btn btn-success">Sign in with Google</a>
              <button className="btn btn-outline" onClick={() => setShowAuthNudge(false)}>Maybe later</button>
            </div>
          </div>
        </div>
      )}

      {showStarWarn && (
        <div className="fp5-star-toast" role="alert">
          ⭐ You used 1 star to look up a word!
          <button className="fp5-star-toast__close" onClick={() => setShowStarWarn(false)} aria-label="Close">✕</button>
        </div>
      )}
    </div>
  );
}

// ─── ImageLightbox ────────────────────────────────────────────────────────────

function ImageLightbox({ src, alt, onClose }: { src: string; alt: string; onClose: () => void }) {
  return (
    <div className="fp5-lightbox" role="dialog" aria-modal="true" onClick={onClose}>
      <button className="fp5-lightbox__close" onClick={onClose} aria-label="Close">✕</button>
      <img src={src} alt={alt} className="fp5-lightbox__img" onClick={e => e.stopPropagation()} />
      <p className="fp5-lightbox__hint">Click anywhere or press ESC to close</p>
    </div>
  );
}

// ─── Sentence with blank ──────────────────────────────────────────────────────

interface SentenceWithInputProps {
  sentence: string;
  value: string;
  onChange: (v: string) => void;
  submitted: boolean;
  correct: boolean | null;  // null = not submitted yet
  correctAnswer: string;    // best answer to show after submit
  questionNum: number;
}

function SentenceWithInput({
  sentence, value, onChange, submitted, correct, correctAnswer, questionNum
}: SentenceWithInputProps) {
  const parts = sentence.split("_____");
  const inputClass = [
    "fp5-input",
    submitted && correct ? "fp5-input--correct" : "",
    submitted && correct === false ? "fp5-input--wrong" : "",
  ].filter(Boolean).join(" ");

  return (
    <span className="fp5-sentence">
      {parts[0]}
      <span className="fp5-input-wrap">
        <input
          type="text"
          className={inputClass}
          value={value}
          onChange={e => !submitted && onChange(e.target.value)}
          disabled={submitted}
          placeholder="..."
          aria-label={`Answer for question ${questionNum}`}
          id={`fp5-q${questionNum}`}
        />
        {submitted && correct === false && (
          <span className="fp5-correct-hint">✓ {correctAnswer}</span>
        )}
      </span>
      {parts[1] ?? ""}
    </span>
  );
}

// ─── Main Engine Component ────────────────────────────────────────────────────

export function FlyersPart5Engine({
  quiz,
  onSubmitResult,
  onFinish,
  onBack,
  isLoggedIn = false,
}: FlyersPart5EngineProps) {
  const totalQ = quiz.questions.length;
  const startTimeRef = useRef<number>(Date.now());

  // User answers: { q1: "...", q2: "...", ... }
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [result, setResult] = useState<FlyersPart5Result | null>(null);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [storyOpen, setStoryOpen] = useState(true); // mobile accordion — mở sẵn

  const answeredCount = Object.values(answers).filter(v => v.trim() !== "").length;
  const allAnswered = answeredCount === totalQ;

  const handleChange = useCallback((qNum: number, val: string) => {
    if (submitted) return;
    setAnswers(prev => ({ ...prev, [`q${qNum}`]: val }));
  }, [submitted]);

  const handleSubmit = useCallback(() => {
    if (!allAnswered) return;

    let correct = 0;
    for (const q of quiz.questions) {
      const userAns = answers[`q${q.number}`] ?? "";
      if (isCorrect(userAns, q.accepted_answers)) correct++;
    }

    const pct = Math.round((correct / totalQ) * 100);
    const stars = calcStars(pct);
    const answersForApi: Record<string, string> = {};
    for (const q of quiz.questions) {
      answersForApi[`q${q.number}`] = answers[`q${q.number}`] ?? "";
    }

    const res: FlyersPart5Result = {
      score: correct,
      maxScore: totalQ,
      percentage: pct,
      starsEarned: stars,
      answersForApi,
      startTime: startTimeRef.current,
    };
    setResult(res);
    setSubmitted(true);
    setStoryOpen(true); // auto-expand passage on mobile after submit
    onSubmitResult?.(res);
  }, [allAnswered, answers, quiz.questions, totalQ, onSubmitResult]);

  const handleReset = useCallback(() => {
    setAnswers({});
    setSubmitted(false);
    setResult(null);
    setStoryOpen(false);
    startTimeRef.current = Date.now();
  }, []);

  const hasVocab = (quiz.vocab_highlight?.length ?? 0) > 0;

  // Build highlight data for passage after submit
  const highlights = submitted
    ? quiz.questions.map(q => ({
        text: q.passage_highlight,
        correct: isCorrect(answers[`q${q.number}`] ?? "", q.accepted_answers),
      }))
    : [];

  // ── JSX ───────────────────────────────────────────────────────────────────

  return (
    <div className="fp5-engine">

      {/* ── Instruction Banner ── */}
      <div className="fp5-instruction" role="note">
        {quiz.instructions_en}
      </div>

      {/* ── Mobile: Story Accordion (hình + passage) ── */}
      <div className="fp5-mobile-only">
        <details className="fp5-accordion" open={storyOpen} onToggle={e => setStoryOpen((e.target as HTMLDetailsElement).open)}>
          <summary className="fp5-accordion__summary">
            📖 Read the Story {storyOpen ? "▲" : "▼"}
          </summary>
          <div className="fp5-accordion__body">
            {/* Hình nằm đầu accordion trên mobile */}
            {quiz.image_url ? (
              <div className="fp5-image-wrap" style={{ marginBottom: "0.75rem" }}>
                <img
                  src={quiz.image_url}
                  alt={quiz.title}
                  className="fp5-image"
                  loading="lazy"
                  onClick={() => setLightboxOpen(true)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={e => e.key === "Enter" && setLightboxOpen(true)}
                  aria-label="Zoom image"
                  title="Click to zoom"
                />
                <span className="fp5-image__zoom-hint">🔍 Click to zoom</span>
              </div>
            ) : (
              <div className="fp5-image-placeholder" style={{ marginBottom: "0.75rem" }}>
                🖼️ Image not available
              </div>
            )}
            {/* Passage */}
            <div className="fp5-passage-text">
              {submitted
                ? buildHighlightedPassage(quiz.passage, highlights)
                : quiz.passage
              }
            </div>
          </div>
        </details>
      </div>

      {/* ── Main Layout (split 2 cột on desktop) ── */}
      <div className="fp5-layout">

        {/* ── LEFT: Passage + VocabPanel (desktop only) ── */}
        <aside className="fp5-left-col fp5-desktop-only" aria-label="Reading passage and vocabulary">
          <div className="fp5-passage-panel">
            <div className="fp5-passage-text" lang="en">
              {submitted
                ? buildHighlightedPassage(quiz.passage, highlights)
                : quiz.passage
              }
            </div>
          </div>

          {hasVocab && (
            <div className="fp5-vocab-desktop">
              <VocabPanel
                vocab={quiz.vocab_highlight!}
                isLoggedIn={isLoggedIn}
                quizId={quiz.id}
              />
            </div>
          )}
        </aside>

        {/* ── RIGHT: Image + Examples + Questions ── */}
        <main className="fp5-right-col" aria-label="Questions">

          {/* Image — desktop only (mobile version lives inside accordion) */}
          {quiz.image_url ? (
            <div className="fp5-image-wrap fp5-desktop-only">
              <img
                src={quiz.image_url}
                alt={quiz.title}
                className="fp5-image"
                loading="lazy"
                onClick={() => setLightboxOpen(true)}
                role="button"
                tabIndex={0}
                onKeyDown={e => e.key === "Enter" && setLightboxOpen(true)}
                aria-label="Zoom image"
                title="Click to zoom"
              />
              <span className="fp5-image__zoom-hint">🔍 Click to zoom</span>
            </div>
          ) : (
            <div className="fp5-image-placeholder fp5-desktop-only" aria-label="Image not available">
              🖼️ Image not available
            </div>
          )}

          {/* Examples */}
          <div className="fp5-examples">
            <h3 className="fp5-examples__title">Examples:</h3>
            {quiz.examples.map(ex => {
              const parts = ex.sentence.split("_____");
              return (
                <div key={ex.number} className="fp5-example-row">
                  <span className="fp5-example-num">{ex.number}.</span>
                  <span className="fp5-example-sentence">
                    {parts[0]}
                    <span className="fp5-example-answer">{ex.answer}</span>
                    {parts[1] ?? ""}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Questions */}
          <div className="fp5-questions">
            <h3 className="fp5-questions__title">Questions:</h3>
            {quiz.questions.map(q => {
              const userAns = answers[`q${q.number}`] ?? "";
              const qCorrect = submitted ? isCorrect(userAns, q.accepted_answers) : null;
              const bestAnswer = q.accepted_answers[0] ?? "";

              return (
                <div key={q.number} className={`fp5-question-row ${submitted && qCorrect ? "fp5-question-row--correct" : ""} ${submitted && qCorrect === false ? "fp5-question-row--wrong" : ""}`}>
                  <div className="fp5-question-row__sentence">
                    <span className="fp5-question-num">{q.number}.</span>
                    <SentenceWithInput
                      sentence={q.sentence}
                      value={userAns}
                      onChange={v => handleChange(q.number, v)}
                      submitted={submitted}
                      correct={qCorrect}
                      correctAnswer={bestAnswer}
                      questionNum={q.number}
                    />
                  </div>

                  {/* Explanation after submit */}
                  {submitted && (
                    <div className={`fp5-explanation ${qCorrect ? "fp5-explanation--correct" : "fp5-explanation--wrong"}`}>
                      {qCorrect ? "🎉" : "💡"} {q.explanation_vi}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* VocabPanel mobile */}
          {hasVocab && (
            <div className="fp5-vocab-mobile fp5-mobile-only">
              <VocabPanel
                vocab={quiz.vocab_highlight!}
                isLoggedIn={isLoggedIn}
                quizId={quiz.id}
              />
            </div>
          )}
        </main>
      </div>

      {/* ── Footer: Submit / Result ── */}
      {!submitted ? (
        <div className="fp5-footer">
          <span className="fp5-footer__count">
            {answeredCount} / {totalQ} answered
          </span>
          <button
            className="btn btn-success fp5-submit-btn"
            onClick={handleSubmit}
            disabled={!allAnswered}
            id="btn-fp5-submit"
            title={!allAnswered ? "Please fill all blanks first" : "Submit your answers"}
          >
            Submit ✓
          </button>
        </div>
      ) : (
        <div className="fp5-result">
          <div className="fp5-result__score">
            <span className="fp5-result__stars">{"⭐".repeat(result?.starsEarned ?? 0)}</span>
            <span className="fp5-result__text">
              {result?.score} / {result?.maxScore} correct
              <em> ({result?.percentage}%)</em>
            </span>
          </div>
          <div className="fp5-result__actions">
            {onFinish && (
              <button className="btn btn-success" onClick={onFinish} id="btn-fp5-finish">
                ✅ Finish & Save
              </button>
            )}
            {onBack && (
              <button className="btn btn-outline" onClick={onBack} id="btn-fp5-back">
                ← Về danh sách
              </button>
            )}
            {!onFinish && !onBack && (
              <button className="btn btn-outline" onClick={handleReset} id="btn-fp5-retry">
                🔄 Try Again
              </button>
            )}
          </div>
        </div>
      )}

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
