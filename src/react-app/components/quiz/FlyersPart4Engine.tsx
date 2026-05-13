/**
 * FlyersPart4Engine.tsx — v2 (Refactored)
 * Cambridge Flyers Reading & Writing — Part 4
 *
 * Layout v2:
 *  Desktop ≥768px: 2 cột — LEFT(image sticky + vocab panel) | RIGHT(passage + inline dropdown)
 *  Mobile <768px: image → passage → vocab panel (stack)
 *
 * Interaction:
 *  - Click blank → inline popup (position:fixed) với 3 choices
 *  - VocabPanel: từ khó + 🔊 audio + [VN] translate
 *  - Translate: 3 lượt free/session → lượt 4+ tốn 1⭐
 *  - Auth check: chưa login → nudge popup
 */

import { useState, useCallback, useEffect, useRef } from "react";
import "./FlyersPart4Engine.css";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface VocabHighlightItem {
  word: string;
  vocabulary_bank_id: string | null;
  translation_vi: string;
  ipa: string;
  audio_url: string | null;
}

export interface FlyersPart4Option {
  q: number;
  choices: string[];
  answer: string;
}

export interface FlyersPart4Quiz {
  id: string;
  title: string;
  skill: string;
  level: string;
  part: number;
  type: "flyers-part4";
  is_free: boolean;
  pathway: string;
  group: string;
  difficulty?: string;
  topic?: string;
  image_url?: string | null;
  instructions_en: string;
  passage_title: string;
  example: { options: string[]; answer: string };
  options_table: FlyersPart4Option[];
  story_segments: string[];
  answers: string[];
  explanations_vi?: string[];
  vocab_highlight?: VocabHighlightItem[];
}

interface FlyersPart4Result {
  score: number;
  maxScore: number;
  percentage: number;
  starsEarned: number;
  answersForApi: Record<string, string>;
  startTime: number;
}

interface FlyersPart4EngineProps {
  quiz: FlyersPart4Quiz;
  onSubmitResult?: (result: FlyersPart4Result) => void;
  onFinish?: () => void;
  onBack?: () => void;
  /** Passed from QuizPage — null = not logged in */
  isLoggedIn?: boolean;
  studentId?: string | null;
}

// ─── InlineDropdown ──────────────────────────────────────────────────────────
// Popup position:fixed tại blank, 3 choices

interface DropdownProps {
  choices: string[];
  anchorRef: React.RefObject<HTMLButtonElement | null>;
  onSelect: (choice: string) => void;
  onClose: () => void;
}

function InlineDropdown({ choices, anchorRef, onSelect, onClose }: DropdownProps) {
  const popupRef = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ top: 0, left: 0, openUp: false });

  useEffect(() => {
    if (!anchorRef.current) return;
    const rect = anchorRef.current.getBoundingClientRect();
    const popH = 140; // estimated popup height
    const spaceBelow = window.innerHeight - rect.bottom;
    const openUp = spaceBelow < popH + 8;
    setPos({
      top: openUp ? rect.top - popH - 4 : rect.bottom + 4,
      left: Math.min(rect.left, window.innerWidth - 180),
      openUp,
    });
  }, [anchorRef]);

  // Close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (popupRef.current && !popupRef.current.contains(e.target as Node) &&
        anchorRef.current && !anchorRef.current.contains(e.target as Node)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [onClose, anchorRef]);

  return (
    <div
      ref={popupRef}
      className={`fp4-inline-dropdown ${pos.openUp ? "fp4-inline-dropdown--up" : ""}`}
      style={{ top: pos.top, left: pos.left }}
      role="listbox"
      aria-label="Choose the correct word"
    >
      {choices.map((c) => (
        <button
          key={c}
          className="fp4-inline-dropdown__option"
          onClick={() => { onSelect(c); }}
          role="option"
        >
          {c}
        </button>
      ))}
    </div>
  );
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
  // studentId đã bỏ: backend tự lấy từ session cookie, client không cần truyền
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
        // fallback to Web Speech API
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
    // Auth check
    if (!isLoggedIn) {
      setShowAuthNudge(true);
      return;
    }

    // Already revealed → just toggle off nudge
    if (revealed.has(item.word)) return;

    const newCount = lookupCount + 1;

    // Star deduction after free lookups
    if (newCount > FREE_LOOKUPS) {
      setShowStarWarn(true);
      // Deduct 1 star via dedicated deduct endpoint (tách biệt với /stars cộng sao Hangman)
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

    // Track word in student_vocabulary (fire-and-forget)
    // ROOT CAUSE FIX: backend lấy student_id từ session cookie, không cần studentId ở client
    // Điều kiện chỉ cần vocabulary_bank_id tồn tại là đủ (một số từ trong JSON có giá trị null)
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
      {/* Header + rule */}
      <div className="fp4-vocab-panel__header">
        <span className="fp4-vocab-panel__title">📚 Vocabulary</span>
        <span className={`fp4-vocab-panel__counter ${remaining === 0 ? "fp4-vocab-panel__counter--zero" : ""}`}>
          {remaining > 0 ? `${remaining} free look-ups` : "No free look-ups — 1⭐ each"}
        </span>
      </div>
      <p className="fp4-vocab-panel__rule">{LOOKUP_WARNING}</p>

      {/* Word list */}
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
            <p>🔐 <strong>Log in to look up words & save your progress!</strong></p>
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

// ─── Helpers ─────────────────────────────────────────────────────────────────

function calcStars(pct: number): number {
  if (pct >= 90) return 5;
  if (pct >= 70) return 3;
  if (pct >= 50) return 2;
  return 1;
}

// ─── Main Engine ─────────────────────────────────────────────────────────────

export function FlyersPart4Engine({
  quiz,
  onSubmitResult,
  onFinish,
  onBack,
  isLoggedIn = false,
}: FlyersPart4EngineProps) {
  const totalQ = quiz.answers.length;

  const [placed, setPlaced] = useState<Record<number, string>>({});
  const [activeBlank, setActiveBlank] = useState<number>(-1);
  const [submitted, setSubmitted] = useState(false);
  const [result, setResult] = useState<FlyersPart4Result | null>(null);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const startTime = useState(() => Date.now())[0];

  // Map of blank index → ref for dropdown anchor
  const blankRefs = useRef<Map<number, React.RefObject<HTMLButtonElement | null>>>(new Map());
  function getBlankRef(idx: number) {
    if (!blankRefs.current.has(idx)) {
      blankRefs.current.set(idx, { current: null });
    }
    return blankRefs.current.get(idx)!;
  }

  const allAnswered = Object.keys(placed).length === totalQ;

  const handleChoiceSelect = useCallback((qIdx: number, choice: string) => {
    setPlaced(prev => ({ ...prev, [qIdx]: choice }));
    setActiveBlank(-1);
    // Auto-move to next unfilled
    setTimeout(() => {
      const next = Array.from({ length: totalQ }, (_, i) => i).find(i => i !== qIdx && !(placed[i] || i === qIdx ? placed[i] : false));
      setActiveBlank(next !== undefined ? next : -1);
    }, 80);
  }, [placed, totalQ]);

  const handleClearBlank = useCallback((qIdx: number) => {
    if (submitted) return;
    setPlaced(prev => { const n = { ...prev }; delete n[qIdx]; return n; });
    setActiveBlank(qIdx);
  }, [submitted]);

  const handleSubmit = useCallback(() => {
    if (!allAnswered) return;
    let correct = 0;
    for (let i = 0; i < totalQ; i++) {
      if ((placed[i] ?? "").toLowerCase() === quiz.answers[i].toLowerCase()) correct++;
    }
    const pct = Math.round((correct / totalQ) * 100);
    const stars = calcStars(pct);
    const answersForApi: Record<string, string> = {};
    for (let i = 0; i < totalQ; i++) answersForApi[`q${i + 1}`] = placed[i] ?? "";

    const res: FlyersPart4Result = { score: correct, maxScore: totalQ, percentage: pct, starsEarned: stars, answersForApi, startTime };
    setResult(res);
    setSubmitted(true);
    onSubmitResult?.(res);
  }, [allAnswered, placed, quiz.answers, totalQ, startTime, onSubmitResult]);

  const handleReset = useCallback(() => {
    setPlaced({});
    setActiveBlank(-1);
    setSubmitted(false);
    setResult(null);
  }, []);

  // ── Render passage ──────────────────────────────────────────────────────────
  const renderPassage = () => {
    const nodes: React.ReactNode[] = [];
    const segs = quiz.story_segments;

    segs.forEach((seg, segIdx) => {
      // Text segment — handle \n\n as line breaks
      const paras = seg.split("\n\n");
      paras.forEach((para, pIdx) => {
        if (pIdx > 0) nodes.push(<br key={`br-${segIdx}-${pIdx}`} />);
        if (para) nodes.push(<span key={`seg-${segIdx}-${pIdx}`}>{para}</span>);
      });

      if (segIdx >= segs.length - 1) return;

      // EXAMPLE blank
      if (segIdx === 0) {
        nodes.push(
          <span key="blank-ex" className="fp4-blank fp4-blank--example" aria-label="Example answer">
            {quiz.example.answer}
          </span>
        );
        return;
      }

      // Q blank (0-indexed)
      const qIdx = segIdx - 1;
      if (qIdx < 0 || qIdx >= totalQ) return;

      const qNum = qIdx + 1;
      const filled = placed[qIdx] ?? null;
      const isActive = activeBlank === qIdx && !submitted;
      const isCorrect = submitted && filled?.toLowerCase() === quiz.answers[qIdx].toLowerCase();
      const isWrong = submitted && filled !== null && !isCorrect;
      const isMissed = submitted && !filled;
      const blankRef = getBlankRef(qIdx);

      nodes.push(
        <span key={`blank-wrap-${qIdx}`} className="fp4-blank-wrap">
          <span className="fp4-blank-num">({qNum})</span>
          {filled ? (
            <button
              ref={blankRef}
              className={[
                "fp4-blank fp4-blank--filled",
                isCorrect ? "fp4-blank--correct" : "",
                isWrong ? "fp4-blank--wrong" : "",
                isActive ? "fp4-blank--active" : "",
              ].filter(Boolean).join(" ")}
              onClick={() => !submitted && handleClearBlank(qIdx)}
              disabled={submitted}
              aria-label={`Câu ${qNum}: ${filled}. Click để đổi.`}
            >
              {filled}
              {!submitted && <span className="fp4-blank__x" aria-hidden>✕</span>}
            </button>
          ) : (
            <button
              ref={blankRef}
              className={[
                "fp4-blank fp4-blank--empty",
                isActive ? "fp4-blank--active" : "",
                isMissed ? "fp4-blank--missed" : "",
              ].filter(Boolean).join(" ")}
              onClick={() => !submitted && setActiveBlank(prev => prev === qIdx ? -1 : qIdx)}
              disabled={submitted}
              aria-label={`Câu ${qNum}: chưa chọn`}
            >
              {isActive ? "▾ chọn" : "_____"}
            </button>
          )}
          {/* Inline dropdown */}
          {isActive && (
            <InlineDropdown
              choices={quiz.options_table[qIdx]?.choices ?? []}
              anchorRef={blankRef}
              onSelect={(c) => handleChoiceSelect(qIdx, c)}
              onClose={() => setActiveBlank(-1)}
            />
          )}
          {(isWrong || isMissed) && (
            <span className="fp4-correct-hint">✓ {quiz.answers[qIdx]}</span>
          )}
        </span>
      );
    });

    return nodes;
  };

  // ── JSX ────────────────────────────────────────────────────────────────────
  return (
    <div className="fp4-engine">

      {/* Instruction */}
      <div className="fp4-instruction" role="note">{quiz.instructions_en}</div>

      <div className="fp4-layout">

        {/* ── LEFT column: Image only ── */}
        <aside className="fp4-left-col" aria-label="Hình ảnh bài">

          {/* Image */}
          {quiz.image_url && (
            <div className="fp4-image-wrap">
              <img
                src={quiz.image_url}
                alt={quiz.passage_title}
                className="fp4-image"
                loading="lazy"
                onClick={() => setLightboxOpen(true)}
                title="Click để phóng to"
                role="button"
                tabIndex={0}
                onKeyDown={e => e.key === "Enter" && setLightboxOpen(true)}
                aria-label="Phóng to hình ảnh"
              />
              <span className="fp4-image__zoom-hint">🔍 Click để phóng to</span>
            </div>
          )}
        </aside>

        {/* ── RIGHT column: Passage ── */}
        <main className="fp4-passage-panel" aria-label="Bài đọc">
          <h2 className="fp4-passage-title">{quiz.passage_title}</h2>
          <div className="fp4-passage-text">
            {renderPassage()}
          </div>

          {/* Explanations */}
          {submitted && (
            <div className="fp4-explanations">
              <h3 className="fp4-explanations__title">📝 Giải thích đáp án</h3>
              {quiz.answers.map((ans, i) => {
                const userAns = placed[i] ?? "(bỏ trống)";
                const isOk = userAns.toLowerCase() === ans.toLowerCase();
                return (
                  <div key={i} className={`fp4-explain-row ${isOk ? "fp4-explain-row--ok" : "fp4-explain-row--wrong"}`}>
                    <span className="fp4-explain-row__num">({i + 1})</span>
                    <span className="fp4-explain-row__ans">
                      {isOk ? "✅" : "❌"} <strong>{ans}</strong>
                      {!isOk && <em> (bạn chọn: {userAns})</em>}
                    </span>
                    {quiz.explanations_vi?.[i] && (
                      <span className="fp4-explain-row__vi">{quiz.explanations_vi[i]}</span>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </main>

        {/* ── Vocab panel — separate grid item, desktop col 1 row 2, mobile last ── */}
        {quiz.vocab_highlight && quiz.vocab_highlight.length > 0 && (
          <div className="fp4-vocab-col">
            <VocabPanel
              vocab={quiz.vocab_highlight}
              isLoggedIn={isLoggedIn}
              quizId={quiz.id}
            />
          </div>
        )}
      </div>

      {/* Footer */}
      {!submitted ? (
        <div className="fp4-footer">
          <div className="fp4-footer__progress">
            <div
              className="fp4-footer__bar"
              style={{ width: `${(Object.keys(placed).length / totalQ) * 100}%` }}
              role="progressbar"
              aria-valuenow={Object.keys(placed).length}
              aria-valuemax={totalQ}
            />
          </div>
          <span className="fp4-footer__count">{Object.keys(placed).length}/{totalQ}</span>
          <button
            className="btn btn-success fp4-submit-btn"
            onClick={handleSubmit}
            disabled={!allAnswered}
            id="btn-fp4-submit"
            title={!allAnswered ? "Điền đủ tất cả ô trước nhé!" : "Nộp bài"}
          >
            Nộp bài ✓
          </button>
        </div>
      ) : (
        <div className="fp4-result">
          <div className="fp4-result__stars">{"⭐".repeat(result?.starsEarned ?? 0)}</div>
          <div className="fp4-result__text">
            {result?.score}/{result?.maxScore} câu đúng
            <em> ({result?.percentage}%)</em>
          </div>
          <div className="fp4-result__actions">
            {onFinish && (
              <button className="btn btn-success" onClick={onFinish} id="btn-fp4-finish">
                ✅ Lưu & Xem kết quả
              </button>
            )}
            {onBack && (
              <button className="btn btn-outline" onClick={onBack} id="btn-fp4-back">
                ← Về danh sách
              </button>
            )}
            {!onFinish && !onBack && (
              <button className="btn btn-outline" onClick={handleReset} id="btn-fp4-retry">
                🔄 Làm lại
              </button>
            )}
          </div>
        </div>
      )}

      {/* Lightbox */}
      {lightboxOpen && quiz.image_url && (
        <ImageLightbox
          src={quiz.image_url}
          alt={quiz.passage_title}
          onClose={() => setLightboxOpen(false)}
        />
      )}
    </div>
  );
}
