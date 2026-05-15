/**
 * FlyersPart6Engine.tsx — v1
 * Cambridge Flyers Reading & Writing — Part 6:
 * "Read the diary and write in the missing words. Write ONE word on each line."
 *
 * Cơ chế:
 *  - Layout: Ảnh (trái, optional) + Diary text với inline inputs (phải)
 *  - Inline blanks: <input> nhỏ nằm ngay trong dòng chữ
 *  - Sau Submit: tô màu xanh/đỏ inline + panel giải thích + Grammar Tips
 *  - Grading: normalize (lowercase + trim) + accepted_answers[]
 *  - Standard modules: VocabPanel (⭐ mechanic, Auth nudge, DB tracking)
 *  - Grammar Tips panel: hiện sau submit, giải thích cấu trúc ngữ pháp
 */

import { useState, useCallback, useRef } from "react";
import "./FlyersPart6Engine.css";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface VocabHighlightItem {
  word: string;
  vocabulary_bank_id: string | null;
  translation_vi: string;
  ipa: string;
  audio_url: string | null;
}

/** Segment text thuần — hiển thị nguyên */
export interface TextSegment {
  type: "text";
  content: string;
}

/** Segment blank — hiển thị inline input */
export interface BlankSegment {
  type: "blank";
  number: number;
  accepted_answers: string[];
  explanation_vi: string;
  grammar_tag?: string;
}

export type Segment = TextSegment | BlankSegment;

export interface GrammarTip {
  tag: string;
  title: string;
  tip_vi: string;
}

export interface FlyersPart6Quiz {
  id: string;
  title: string;
  skill: string;
  level: string;
  part: number;
  type: "flyers-part6";
  is_free: boolean;
  pathway: string;
  group: string;
  difficulty?: string;
  topic?: string;
  ui_language?: string;
  image_url?: string | null;
  instructions_en: string;
  diary_date: string;
  segments: Segment[];
  grammar_tips?: GrammarTip[];
  vocab_highlight?: VocabHighlightItem[];
}

interface FlyersPart6Result {
  score: number;
  maxScore: number;
  percentage: number;
  starsEarned: number;
  answersForApi: Record<string, string>;
  startTime: number;
}

interface FlyersPart6EngineProps {
  quiz: FlyersPart6Quiz;
  onSubmitResult?: (result: FlyersPart6Result) => void;
  onFinish?: () => void;
  onBack?: () => void;
  isLoggedIn?: boolean;
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

function normalizeAnswer(s: string): string {
  return s.toLowerCase().trim().replace(/\s+/g, " ");
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

/** Lấy tất cả blank segments có thứ tự */
function getBlanks(segments: Segment[]): BlankSegment[] {
  return segments.filter((s): s is BlankSegment => s.type === "blank");
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
    <div className="fp6-vocab-panel">
      <div className="fp6-vocab-panel__header">
        <span className="fp6-vocab-panel__title">📚 Vocabulary</span>
        <span className={`fp6-vocab-panel__counter ${remaining === 0 ? "fp6-vocab-panel__counter--zero" : ""}`}>
          {remaining > 0 ? `${remaining} free look-ups` : "1⭐ each"}
        </span>
      </div>
      <ul className="fp6-vocab-list" role="list">
        {vocab.map(item => {
          const isRevealed = revealed.has(item.word);
          return (
            <li key={item.word} className="fp6-vocab-item">
              <div className="fp6-vocab-item__row">
                <div className="fp6-vocab-item__word-group">
                  <span className="fp6-vocab-item__word">{item.word}</span>
                  {item.ipa && <span className="fp6-vocab-item__ipa">{item.ipa}</span>}
                </div>
                <div className="fp6-vocab-item__actions">
                  <button
                    className="fp6-vocab-btn fp6-vocab-btn--audio"
                    onClick={() => handleAudio(item)}
                    title="Listen"
                    aria-label={`Pronounce ${item.word}`}
                  >🔊</button>
                  <button
                    className={`fp6-vocab-btn fp6-vocab-btn--translate ${isRevealed ? "fp6-vocab-btn--revealed" : ""}`}
                    onClick={() => handleTranslate(item)}
                    disabled={isRevealed}
                    aria-label={`Xem nghĩa của ${item.word}`}
                  >
                    {isRevealed ? "✓ VN" : "VN"}
                  </button>
                </div>
              </div>
              {isRevealed && (
                <div className="fp6-vocab-item__translation" role="status">
                  🇻🇳 <strong>{item.translation_vi}</strong>
                </div>
              )}
            </li>
          );
        })}
      </ul>

      {showAuthNudge && (
        <div className="fp6-nudge-overlay" role="dialog" aria-modal="true">
          <div className="fp6-nudge-popup">
            <p>🔐 <strong>Log in to look up words &amp; save your progress!</strong></p>
            <p className="fp6-nudge-popup__sub">Your vocabulary progress will be saved for review later.</p>
            <div className="fp6-nudge-popup__actions">
              <a href="/api/auth/google" className="btn btn-success">Sign in with Google</a>
              <button className="btn btn-outline" onClick={() => setShowAuthNudge(false)}>Maybe later</button>
            </div>
          </div>
        </div>
      )}
      {showStarWarn && (
        <div className="fp6-star-warn" role="alert">
          ⭐ 1 star used for this look-up
          <button className="fp6-star-warn__close" onClick={() => setShowStarWarn(false)}>✕</button>
        </div>
      )}
    </div>
  );
}

// ─── ImageLightbox ────────────────────────────────────────────────────────────

function ImageLightbox({ src, alt, onClose }: { src: string; alt: string; onClose: () => void }) {
  return (
    <div className="fp6-lightbox" onClick={onClose} role="dialog" aria-modal="true" aria-label="Image fullscreen">
      <button className="fp6-lightbox__close" onClick={onClose} aria-label="Close">✕</button>
      <img src={src} alt={alt} className="fp6-lightbox__img" onClick={e => e.stopPropagation()} />
    </div>
  );
}

// ─── GrammarTipsPanel ─────────────────────────────────────────────────────────

interface GrammarTipsPanelProps {
  tips: GrammarTip[];
  /** Chỉ hiện tip của các tag đã dùng trong bài */
  usedTags: string[];
}

function GrammarTipsPanel({ tips, usedTags }: GrammarTipsPanelProps) {
  const relevant = tips.filter(t => usedTags.includes(t.tag));
  if (relevant.length === 0) return null;
  return (
    <div className="fp6-grammar-tips">
      <h3 className="fp6-grammar-tips__title">📐 Grammar Tips</h3>
      <div className="fp6-grammar-tips__list">
        {relevant.map(tip => (
          <div key={tip.tag} className="fp6-grammar-tip">
            <div className="fp6-grammar-tip__title">{tip.title}</div>
            <div className="fp6-grammar-tip__body" style={{ whiteSpace: "pre-line" }}>{tip.tip_vi}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Main Engine ──────────────────────────────────────────────────────────────

export function FlyersPart6Engine({
  quiz,
  onSubmitResult,
  onFinish,
  onBack,
  isLoggedIn = false,
}: FlyersPart6EngineProps) {
  const startTimeRef = useRef<number>(Date.now());

  const blanks = getBlanks(quiz.segments);
  const totalQ = blanks.length;

  // answers: { [blank.number]: userInput }
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [result, setResult] = useState<FlyersPart6Result | null>(null);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const answeredCount = Object.values(answers).filter(v => v.trim() !== "").length;

  const handleChange = useCallback((num: number, val: string) => {
    if (submitted) return;
    setAnswers(prev => ({ ...prev, [num]: val }));
  }, [submitted]);

  // Auto-advance: Tab veya Enter ile sonraki input'a geç
  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement>, num: number) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const nextInput = document.getElementById(`fp6-blank-${num + 1}`);
      if (nextInput) (nextInput as HTMLInputElement).focus();
    }
  }, []);

  const handleSubmit = useCallback(() => {
    if (submitted) return;

    let score = 0;
    const answersForApi: Record<string, string> = {};

    for (const blank of blanks) {
      const userAns = answers[blank.number] ?? "";
      answersForApi[`q${blank.number}`] = userAns;
      if (isCorrect(userAns, blank.accepted_answers)) score++;
    }

    const percentage = Math.round((score / totalQ) * 100);
    const starsEarned = calcStars(percentage);

    const res: FlyersPart6Result = {
      score,
      maxScore: totalQ,
      percentage,
      starsEarned,
      answersForApi,
      startTime: startTimeRef.current,
    };

    setResult(res);
    setSubmitted(true);
    onSubmitResult?.(res);
  }, [submitted, answers, blanks, totalQ, onSubmitResult]);

  // Tags ngữ pháp cần hiện trong Grammar Tips
  const usedGrammarTags = submitted
    ? [...new Set(blanks.map(b => b.grammar_tag).filter(Boolean) as string[])]
    : [];

  // ─── Render diary text với inline inputs ──────────────────────────────────

  function renderSegments() {
    return quiz.segments.map((seg, idx) => {
      if (seg.type === "text") {
        return <span key={idx} className="fp6-text-segment">{seg.content}</span>;
      }

      // Blank segment
      const blank = seg as BlankSegment;
      const userAns = answers[blank.number] ?? "";
      const correct = submitted ? isCorrect(userAns, blank.accepted_answers) : null;
      const correctAnswer = blank.accepted_answers[0];

      return (
        <span key={idx} className="fp6-blank-wrapper">
          <span className="fp6-blank-num">({blank.number})</span>
          <span className={`fp6-input-wrap ${submitted ? (correct ? "fp6-input-wrap--correct" : "fp6-input-wrap--wrong") : ""}`}>
            <input
              id={`fp6-blank-${blank.number}`}
              type="text"
              className={`fp6-inline-input ${submitted ? (correct ? "fp6-inline-input--correct" : "fp6-inline-input--wrong") : ""}`}
              value={userAns}
              onChange={e => handleChange(blank.number, e.target.value)}
              onKeyDown={e => handleKeyDown(e, blank.number)}
              disabled={submitted}
              placeholder="___"
              aria-label={`Answer for blank ${blank.number}`}
              autoComplete="off"
              spellCheck={false}
            />
            {submitted && !correct && (
              <span className="fp6-correct-answer">→ {correctAnswer}</span>
            )}
          </span>
        </span>
      );
    });
  }

  // ─── Explanation Panel sau submit ─────────────────────────────────────────

  function renderExplanations() {
    if (!submitted) return null;
    return (
      <div className="fp6-explanations">
        <h3 className="fp6-explanations__title">📋 Answers &amp; Explanations</h3>
        {blanks.map(blank => {
          const userAns = answers[blank.number] ?? "";
          const correct = isCorrect(userAns, blank.accepted_answers);
          return (
            <div key={blank.number} className={`fp6-exp-item ${correct ? "fp6-exp-item--correct" : "fp6-exp-item--wrong"}`}>
              <div className="fp6-exp-item__header">
                <span className="fp6-exp-item__badge">{correct ? "✅" : "❌"}</span>
                <span className="fp6-exp-item__label">
                  ({blank.number}) Your answer: <strong>{userAns || "(empty)"}</strong>
                  {!correct && <> → Correct: <strong className="fp6-exp-item__answer">{blank.accepted_answers[0]}</strong></>}
                </span>
              </div>
              <p className="fp6-exp-item__vi">{blank.explanation_vi}</p>
            </div>
          );
        })}
      </div>
    );
  }

  // ─── Score Summary ─────────────────────────────────────────────────────────

  function renderScoreSummary() {
    if (!result) return null;
    return (
      <div className={`fp6-score-summary ${result.percentage >= 70 ? "fp6-score-summary--good" : "fp6-score-summary--low"}`}>
        <span className="fp6-score-summary__stars">{"⭐".repeat(result.starsEarned)}</span>
        <span className="fp6-score-summary__score">
          {result.score} / {result.maxScore} correct
        </span>
        <span className="fp6-score-summary__pct">
          {result.percentage}%
        </span>
      </div>
    );
  }

  const hasVocab = quiz.vocab_highlight && quiz.vocab_highlight.length > 0;
  const hasGrammarTips = quiz.grammar_tips && quiz.grammar_tips.length > 0;

  return (
    <div className="fp6-engine">
      {/* ── Instructions ── */}
      <div className="fp6-instructions">
        {quiz.instructions_en}
      </div>

      {/* ── Main layout: Left (image) | Right (diary) | Vocab wrapper (row 2 col 1) ── */}
      <div className={`fp6-layout ${quiz.image_url || hasVocab ? "fp6-layout--split" : "fp6-layout--single"}`}>

        {/* LEFT: Image only */}
        {(quiz.image_url || hasVocab) && (
          <aside className="fp6-left-col">
            {quiz.image_url ? (
              <div className="fp6-image-wrap" onClick={() => setLightboxOpen(true)} role="button" tabIndex={0}
                onKeyDown={e => e.key === "Enter" && setLightboxOpen(true)} aria-label="Zoom image" title="Click to zoom">
                <img src={quiz.image_url} alt={quiz.title} className="fp6-image" loading="lazy" />
                <span className="fp6-image__zoom-hint">🔍 Click to zoom</span>
              </div>
            ) : (
              <div className="fp6-image-placeholder">🖼️ Image not available</div>
            )}
          </aside>
        )}

        {/* RIGHT: Diary text + answers */}
        <main className="fp6-right-col">
          <div className="fp6-diary">
            <div className="fp6-diary__date">{quiz.diary_date}</div>
            <div className="fp6-diary__body">
              {renderSegments()}
            </div>
          </div>

          {/* Progress counter */}
          {!submitted && (
            <div className="fp6-progress-bar">
              <div className="fp6-progress-bar__fill" style={{ width: `${(answeredCount / totalQ) * 100}%` }} />
              <span className="fp6-progress-bar__label">{answeredCount} / {totalQ} filled</span>
            </div>
          )}

          {/* Submit button */}
          {!submitted && (
            <button
              className="fp6-submit-btn"
              onClick={handleSubmit}
              disabled={answeredCount === 0}
              id="btn-fp6-submit"
            >
              Check Answers ✓
            </button>
          )}

          {/* Score + explanations + grammar tips + result actions */}
          {submitted && (
            <>
              {renderScoreSummary()}

              {/* Finish & Save / Back buttons */}
              <div className="fp6-result-actions">
                {onFinish && (
                  <button
                    className="fp6-finish-btn"
                    onClick={onFinish}
                    id="btn-fp6-finish"
                  >
                    ✅ Finish &amp; Save
                  </button>
                )}
                {onBack && (
                  <button
                    className="fp6-back-btn"
                    onClick={onBack}
                    id="btn-fp6-back"
                  >
                    ← Về danh sách
                  </button>
                )}
              </div>

              {renderExplanations()}
              {hasGrammarTips && (
                <GrammarTipsPanel
                  tips={quiz.grammar_tips!}
                  usedTags={usedGrammarTags}
                />
              )}
            </>
          )}
        </main>

        {/* VOCAB WRAPPER — grid row 2 col 1 on desktop / order:3 on mobile */}
        {hasVocab && (
          <div className="fp6-vocab-wrapper">
            <VocabPanel
              vocab={quiz.vocab_highlight!}
              isLoggedIn={isLoggedIn}
              quizId={quiz.id}
            />
          </div>
        )}
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
