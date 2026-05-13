/**
 * FlyersPart3Engine.tsx — v2
 * Cambridge Flyers Reading & Writing — Part 3: "Read the Story, Choose a Word from the Box"
 *
 * Cơ chế:
 *  - LEFT panel: Word Bank + VocabPanel (các từ có thể chọn, mỗi từ chỉ dùng 1 lần) + example
 *  - RIGHT panel: Image (nếu có) → Story text với các blank (1)–(5) → Title MCQ
 *  - Câu (6): MCQ chọn tiêu đề hay nhất cho câu chuyện
 *  - Flow: click blank → highlight active, click word → điền vào blank
 *  - Click từ đã dùng trong blank → trả lại word bank
 *  - Sau Submit: hiện đúng/sai + đáp án + explanation_vi
 *
 * v2: + image_url support, + VocabPanel (no IPA), + Star mechanic, + Auth nudge, + DB tracking
 *
 * Layout:
 *  - Desktop (≥768px): 2 cột — Word Bank + VocabPanel (trái, sticky) | Image + Story + Title MCQ (phải)
 *  - Mobile (<768px): Word Bank sticky bottom, Story trên, VocabPanel dưới story
 */

import { useState, useCallback, useEffect } from "react";
import "./FlyersPart3Engine.css";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface VocabHighlightItem {
  word: string;
  vocabulary_bank_id: string | null;
  translation_vi: string;
  ipa: string;
  audio_url: string | null;
}

export interface FlyersPart3TitleOption {
  letter: string;  // "A" | "B" | "C"
  text: string;
}

export interface FlyersPart3TitleQuestion {
  prompt: string;
  options: FlyersPart3TitleOption[];
  answer: string;  // "A" | "B" | "C"
}

export interface FlyersPart3Quiz {
  id: string;
  title: string;
  skill: string;
  level: string;
  part: number;
  type: "flyers-part3";
  is_free: boolean;
  pathway: string;
  group: string;
  difficulty?: string;
  topic?: string;
  ui_language?: string;
  image_url?: string | null;
  instructions_en: string;
  /** Các từ trong word bank (không kể example) */
  word_bank: string[];
  /** Từ đã điền sẵn làm example */
  example: { word: string; blank_index: number };
  /**
   * story_segments: mảng các đoạn text, xen kẽ với blank.
   * Ví dụ: ["...put up our ", " near a river. We explored the ", " nearby..."]
   * → blank (0)=example, blank (1)=Q1, blank (2)=Q2, ...
   */
  story_segments: string[];
  /** Đáp án đúng theo thứ tự câu 1–5 (index 0–4) */
  answers: string[];
  title_question: FlyersPart3TitleQuestion;
  explanations_vi?: string[];  // index 0–4 = giải thích Q1–Q5, index 5 = giải thích Q6
  vocab_highlight?: VocabHighlightItem[];
}

interface FlyersPart3Result {
  score: number;
  maxScore: number;
  percentage: number;
  starsEarned: number;
  answersForApi: Record<string, string>;
  startTime: number;
}

interface FlyersPart3EngineProps {
  quiz: FlyersPart3Quiz;
  onSubmitResult?: (result: FlyersPart3Result) => void;
  onFinish?: () => void;
  onBack?: () => void;
  /** Passed from QuizPage — null = not logged in */
  isLoggedIn?: boolean;
}

// ─── VocabPanel (No IPA) ─────────────────────────────────────────────────────

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

    // DB tracking (fire-and-forget)
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
    <div className="fp3-vocab-panel">
      <div className="fp3-vocab-panel__header">
        <span className="fp3-vocab-panel__title">📚 Vocabulary</span>
        <span className={`fp3-vocab-panel__counter ${remaining === 0 ? "fp3-vocab-panel__counter--zero" : ""}`}>
          {remaining > 0 ? `${remaining} free look-ups` : "No free look-ups — 1⭐ each"}
        </span>
      </div>
      <p className="fp3-vocab-panel__rule">{LOOKUP_WARNING}</p>

      <ul className="fp3-vocab-list" role="list">
        {vocab.map((item) => {
          const isRevealed = revealed.has(item.word);
          return (
            <li key={item.word} className="fp3-vocab-item">
              <div className="fp3-vocab-item__row">
                <div className="fp3-vocab-item__word-group">
                  <span className="fp3-vocab-item__word">{item.word}</span>
                  {item.ipa && (
                    <span className="fp3-vocab-item__ipa">{item.ipa}</span>
                  )}
                </div>
                <div className="fp3-vocab-item__actions">
                  <button
                    className="fp3-vocab-btn fp3-vocab-btn--audio"
                    onClick={() => handleAudio(item)}
                    title="Listen to pronunciation"
                    aria-label={`Pronounce ${item.word}`}
                  >
                    🔊
                  </button>
                  <button
                    className={`fp3-vocab-btn fp3-vocab-btn--translate ${isRevealed ? "fp3-vocab-btn--revealed" : ""}`}
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
                <div className="fp3-vocab-item__translation" role="status" aria-live="polite">
                  🇻🇳 <strong>{item.translation_vi}</strong>
                </div>
              )}
            </li>
          );
        })}
      </ul>

      {/* Auth nudge popup */}
      {showAuthNudge && (
        <div className="fp3-nudge-overlay" role="dialog" aria-modal="true">
          <div className="fp3-nudge-popup">
            <p>🔐 <strong>Log in to look up words &amp; save your progress!</strong></p>
            <p className="fp3-nudge-popup__sub">Your vocabulary progress will be saved for review later.</p>
            <div className="fp3-nudge-popup__actions">
              <a href="/api/auth/google" className="btn btn-success">Sign in with Google</a>
              <button className="btn btn-outline" onClick={() => setShowAuthNudge(false)}>Maybe later</button>
            </div>
          </div>
        </div>
      )}

      {/* Star warning */}
      {showStarWarn && (
        <div className="fp3-star-toast" role="alert" aria-live="assertive">
          ⭐ You used 1 star to look up a word!
          <button className="fp3-star-toast__close" onClick={() => setShowStarWarn(false)} aria-label="Close">✕</button>
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
    <div className="fp3-lightbox" role="dialog" aria-modal="true" aria-label="Zoom image" onClick={onClose}>
      <button className="fp3-lightbox__close" onClick={onClose} aria-label="Close">✕</button>
      <img
        src={src}
        alt={alt}
        className="fp3-lightbox__img"
        onClick={e => e.stopPropagation()}
      />
      <p className="fp3-lightbox__hint">Click anywhere or press ESC to close</p>
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

// ─── Component ────────────────────────────────────────────────────────────────

export function FlyersPart3Engine({
  quiz,
  onSubmitResult,
  onFinish,
  onBack,
  isLoggedIn = false,
}: FlyersPart3EngineProps) {
  const totalFillQ  = quiz.answers.length;         // 5
  const totalQ      = totalFillQ + 1;              // +1 title question = 6

  const [placed,      setPlaced]      = useState<Record<number, string>>({});
  const [titleAns,    setTitleAns]    = useState<string | null>(null);
  const [activeBlank, setActiveBlank] = useState<number>(-1);
  const [submitted,   setSubmitted]   = useState(false);
  const [result,      setResult]      = useState<FlyersPart3Result | null>(null);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const startTime = useState(() => Date.now())[0];

  // Tập hợp các từ đã được đặt vào blank
  const usedWords = new Set(Object.values(placed));

  const allFillAnswered = Object.keys(placed).length === totalFillQ;
  const allAnswered     = allFillAnswered && titleAns !== null;

  // ── Handlers ──────────────────────────────────────────────────────────────

  const handleBlankClick = useCallback((blankIdx: number) => {
    if (submitted) return;
    setActiveBlank(prev => prev === blankIdx ? -1 : blankIdx);
  }, [submitted]);

  const handleWordClick = useCallback((word: string) => {
    if (submitted) return;
    if (usedWords.has(word)) {
      const entry = Object.entries(placed).find(([, w]) => w === word);
      if (entry) {
        const idx = Number(entry[0]);
        setPlaced(prev => { const n = { ...prev }; delete n[idx]; return n; });
      }
      return;
    }
    if (activeBlank === -1) return;
    setPlaced(prev => ({ ...prev, [activeBlank]: word }));
    const nextBlank = Array.from({ length: totalFillQ }, (_, i) => i)
      .find(i => i !== activeBlank && placed[i] === undefined && i !== activeBlank);
    setActiveBlank(nextBlank !== undefined ? nextBlank : -1);
  }, [submitted, usedWords, placed, activeBlank, totalFillQ]);

  const handleClearBlank = useCallback((blankIdx: number) => {
    if (submitted) return;
    setPlaced(prev => { const n = { ...prev }; delete n[blankIdx]; return n; });
    setActiveBlank(blankIdx);
  }, [submitted]);

  const handleSubmit = useCallback(() => {
    if (!allAnswered) return;

    let correct = 0;
    for (let i = 0; i < totalFillQ; i++) {
      if ((placed[i] ?? "").toLowerCase() === quiz.answers[i].toLowerCase()) correct++;
    }
    if (titleAns?.toUpperCase() === quiz.title_question.answer.toUpperCase()) correct++;

    const pct   = Math.round((correct / totalQ) * 100);
    const stars = calcStars(pct);

    const answersForApi: Record<string, string> = {};
    for (let i = 0; i < totalFillQ; i++) {
      answersForApi[`q${i + 1}`] = placed[i] ?? "";
    }
    answersForApi["q6"] = titleAns ?? "";

    const res: FlyersPart3Result = {
      score: correct,
      maxScore: totalQ,
      percentage: pct,
      starsEarned: stars,
      answersForApi,
      startTime,
    };

    setResult(res);
    setSubmitted(true);
    onSubmitResult?.(res);
  }, [allAnswered, placed, titleAns, quiz, totalFillQ, totalQ, startTime, onSubmitResult]);

  const handleReset = useCallback(() => {
    setPlaced({});
    setTitleAns(null);
    setActiveBlank(-1);
    setSubmitted(false);
    setResult(null);
  }, []);

  // ── Render story with blanks ───────────────────────────────────────────────

  const renderStory = () => {
    const nodes: React.ReactNode[] = [];

    quiz.story_segments.forEach((segment, segIdx) => {
      const paragraphs = segment.split("\n\n");
      paragraphs.forEach((para, pIdx) => {
        if (pIdx > 0) nodes.push(<br key={`br-${segIdx}-${pIdx}`} />);
        nodes.push(<span key={`seg-${segIdx}-${pIdx}`}>{para}</span>);
      });

      const blankPos = segIdx;
      if (blankPos > quiz.story_segments.length - 1) return;
      if (blankPos >= quiz.story_segments.length) return;

      if (blankPos === quiz.example.blank_index) {
        nodes.push(
          <span key={`blank-ex`} className="fp3-blank fp3-blank--example">
            {quiz.example.word}
          </span>
        );
        return;
      }

      const qIdx       = blankPos - 1;
      if (qIdx < 0 || qIdx >= totalFillQ) return;

      const qNum       = qIdx + 1;
      const filledWord = placed[qIdx] ?? null;
      const isActive   = activeBlank === qIdx && !submitted;
      const isCorrect  = submitted && filledWord?.toLowerCase() === quiz.answers[qIdx].toLowerCase();
      const isWrong    = submitted && !!filledWord && !isCorrect;
      const isMissed   = submitted && !filledWord;

      nodes.push(
        <span key={`blank-${qIdx}`} className="fp3-blank-wrap">
          <span className="fp3-blank-num">({qNum})</span>
          {filledWord ? (
            <button
              className={[
                "fp3-blank fp3-blank--filled",
                isActive   ? "fp3-blank--active"  : "",
                isCorrect  ? "fp3-blank--correct" : "",
                isWrong    ? "fp3-blank--wrong"   : "",
              ].filter(Boolean).join(" ")}
              onClick={() => handleClearBlank(qIdx)}
              disabled={submitted}
              aria-label={`Your answer: ${filledWord}. Click to remove.`}
            >
              {filledWord}
              {!submitted && <span className="fp3-blank__remove" aria-hidden>✕</span>}
            </button>
          ) : (
            <button
              className={[
                "fp3-blank fp3-blank--empty",
                isActive  ? "fp3-blank--active"  : "",
                isMissed  ? "fp3-blank--missed"  : "",
              ].filter(Boolean).join(" ")}
              onClick={() => handleBlankClick(qIdx)}
              disabled={submitted}
              aria-label={`Question ${qNum}: click to select`}
            >
              {isActive ? "▶ pick a word" : `_____`}
            </button>
          )}
          {(isWrong || isMissed) && (
            <span className="fp3-correct-hint">✓ {quiz.answers[qIdx]}</span>
          )}
        </span>
      );
    });

    return nodes;
  };

  // ── JSX ───────────────────────────────────────────────────────────────────
  const hasVocab = quiz.vocab_highlight && quiz.vocab_highlight.length > 0;

  return (
    <div className="fp3-engine">

      {/* ── Instruction Banner ── */}
      <div className="fp3-instruction" role="note">
        {quiz.instructions_en}
      </div>

      <div className="fp3-layout">

        {/* ── LEFT COLUMN: Sticky container (word bank + vocab panel) ── */}
        <aside className="fp3-left-col" aria-label="Word bank and vocabulary">
          {/* Word Bank */}
          <div className="fp3-wordbank-panel">
            <div className="fp3-wordbank">
              <div className="fp3-wordbank__example">
                <span className="fp3-wordbank__example-word">{quiz.example.word}</span>
                <span className="fp3-wordbank__example-label">(example)</span>
              </div>
              <div className="fp3-wordbank__words">
                {quiz.word_bank.map((word) => {
                  const isUsed      = usedWords.has(word);
                  const isClickable = !submitted && !isUsed && activeBlank !== -1;
                  return (
                    <button
                      key={word}
                      className={[
                        "fp3-word",
                        isUsed      ? "fp3-word--used"      : "",
                        isClickable ? "fp3-word--clickable" : "",
                        submitted   ? "fp3-word--disabled"  : "",
                      ].filter(Boolean).join(" ")}
                      onClick={() => handleWordClick(word)}
                      disabled={submitted}
                      aria-label={isUsed ? `${word} (used)` : word}
                    >
                      {word}
                      {isUsed && <span className="fp3-word__check" aria-hidden>✓</span>}
                    </button>
                  );
                })}
              </div>
              {!submitted && (
                <p className="fp3-wordbank__hint">
                  {activeBlank === -1
                    ? "👆 Click a blank in the story first"
                    : `✏️ Now pick a word for blank (${activeBlank + 1})`}
                </p>
              )}
            </div>
          </div>

          {/* VocabPanel: visible on desktop inside sticky left-col
               Hidden on mobile (shown separately after story via fp3-vocab-mobile) */}
          {hasVocab && (
            <div className="fp3-vocab-desktop">
              <VocabPanel
                vocab={quiz.vocab_highlight!}
                isLoggedIn={isLoggedIn}
                quizId={quiz.id}
              />
            </div>
          )}
        </aside>

        {/* ── Story Panel ── direct grid child (grid-area: story) */}
        <main className="fp3-story-panel" aria-label="Story">

          {/* Image (nếu có image_url) */}
          {quiz.image_url && (
            <div className="fp3-image-wrap">
              <img
                src={quiz.image_url}
                alt={quiz.title}
                className="fp3-image"
                loading="lazy"
                onClick={() => setLightboxOpen(true)}
                title="Click to zoom"
                role="button"
                tabIndex={0}
                onKeyDown={e => e.key === "Enter" && setLightboxOpen(true)}
                aria-label="Zoom image"
              />
              <span className="fp3-image__zoom-hint">🔍 Click to zoom</span>
            </div>
          )}

          {/* Story text */}
          <div className="fp3-story-text">
            {renderStory()}
          </div>

          {/* ── Q6: Title MCQ ── */}
          <div className={["fp3-title-question", submitted ? "fp3-title-question--submitted" : ""].filter(Boolean).join(" ")}>
            <p className="fp3-title-question__prompt">
              <strong>(6)</strong> {quiz.title_question.prompt}
            </p>
            <div className="fp3-title-options">
              {quiz.title_question.options.map((opt) => {
                const isChosen  = titleAns === opt.letter;
                const isCorrect = submitted && opt.letter === quiz.title_question.answer;
                const isWrong   = submitted && isChosen && !isCorrect;
                return (
                  <button
                    key={opt.letter}
                    className={[
                      "fp3-title-opt",
                      isChosen  ? "fp3-title-opt--chosen"  : "",
                      isCorrect ? "fp3-title-opt--correct" : "",
                      isWrong   ? "fp3-title-opt--wrong"   : "",
                    ].filter(Boolean).join(" ")}
                    onClick={() => !submitted && setTitleAns(opt.letter)}
                    disabled={submitted}
                    aria-pressed={isChosen}
                  >
                    <span className="fp3-title-opt__letter">{opt.letter}.</span>
                    <span className="fp3-title-opt__text">{opt.text}</span>
                    {isCorrect && <span className="fp3-title-opt__badge">✓</span>}
                    {isWrong   && <span className="fp3-title-opt__badge">✗</span>}
                  </button>
                );
              })}
            </div>

            {/* Q6 explanation */}
            {submitted && quiz.explanations_vi?.[5] && (
              <p className={`fp3-explanation ${titleAns === quiz.title_question.answer ? "fp3-explanation--correct" : "fp3-explanation--wrong"}`}>
                {titleAns === quiz.title_question.answer ? "🎉" : "💡"} {quiz.explanations_vi[5]}
              </p>
            )}
          </div>

          {/* ── Explanations for Q1–Q5 (after submit) ── */}
          {submitted && (
            <div className="fp3-explanations">
              <h3 className="fp3-explanations__title">📝 Giải thích đáp án</h3>
              {quiz.answers.map((ans, i) => {
                const userAns  = placed[i] ?? "(trống)";
                const isOk     = userAns.toLowerCase() === ans.toLowerCase();
                return (
                  <div key={i} className={`fp3-explain-row ${isOk ? "fp3-explain-row--ok" : "fp3-explain-row--wrong"}`}>
                    <span className="fp3-explain-row__num">({i + 1})</span>
                    <span className="fp3-explain-row__ans">
                      {isOk ? "✅" : "❌"} <strong>{ans}</strong>
                      {!isOk && <em> (bạn chọn: {userAns})</em>}
                    </span>
                    {quiz.explanations_vi?.[i] && (
                      <span className="fp3-explain-row__vi">{quiz.explanations_vi[i]}</span>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </main>

        {/* VocabPanel mobile-only: visible on mobile after story (after Q6)
             Hidden on desktop (desktop has it inside fp3-left-col above) */}
        {hasVocab && (
          <div className="fp3-vocab-mobile">
            <VocabPanel
              vocab={quiz.vocab_highlight!}
              isLoggedIn={isLoggedIn}
              quizId={quiz.id}
            />
          </div>
        )}
      </div>

      {/* ── Footer: Submit / Result ── */}
      {!submitted ? (
        <div className="fp3-footer">
          <span className="fp3-footer__count">
            {Object.keys(placed).length + (titleAns ? 1 : 0)} / {totalQ} answered
          </span>
          <button
            className="btn btn-success fp3-submit-btn"
            onClick={handleSubmit}
            disabled={!allAnswered}
            id="btn-fp3-submit"
            title={!allAnswered ? "Please fill all blanks and choose a title first" : "Submit your answers"}
          >
            Submit ✓
          </button>
        </div>
      ) : (
        <div className="fp3-result">
          <div className="fp3-result__score">
            <span className="fp3-result__stars">{"⭐".repeat(result?.starsEarned ?? 0)}</span>
            <span className="fp3-result__text">
              {result?.score} / {result?.maxScore} correct
              <em> ({result?.percentage}%)</em>
            </span>
          </div>
          <div className="fp3-result__actions">
            {onFinish && (
              <button className="btn btn-success" onClick={onFinish} id="btn-fp3-finish">
                ✅ Finish &amp; Save
              </button>
            )}
            {onBack && (
              <button className="btn btn-outline" onClick={onBack} id="btn-fp3-back">
                ← Về danh sách
              </button>
            )}
            {!onFinish && !onBack && (
              <button className="btn btn-outline" onClick={handleReset} id="btn-fp3-retry">
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
