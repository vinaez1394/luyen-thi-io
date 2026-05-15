/**
 * FlyersPart2Engine.tsx — v2.1
 * Cambridge Flyers Reading & Writing — Part 2: "Read the Conversation and Choose the Best Answer"
 *
 * v2.1 Layout fix:
 *  - Desktop (≥768px):
 *      LEFT (sticky): Options A–H | VocabPanel
 *      RIGHT (scroll): Image (16:9) → Conversation
 *  - Mobile (<768px) — no sticky, natural flow:
 *      Image → Conversation → Options A–H → VocabPanel
 */

import { useState, useCallback, useRef } from "react";
import type { VocabHighlightItem } from "./FlyersPart3Engine";
import { VocabPanel } from "./FlyersPart3Engine";
import "./FlyersPart2Engine.css";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface FlyersPart2Option {
  letter: string;
  text: string;
}

export interface FlyersPart2Turn {
  speaker: string;
  text?: string;
  questionIndex?: number;
  example?: boolean;
  answerKey?: string;
}

export interface FlyersPart2Quiz {
  id: string;
  title: string;
  skill: string;
  level: string;
  part: number;
  type: "flyers-part2";
  is_free: boolean;
  pathway: string;
  group: string;
  difficulty?: string;
  topic?: string;
  image_url?: string | null;
  conversation: FlyersPart2Turn[];
  options: FlyersPart2Option[];
  answers: string[];
  explanations_vi?: string[];
  vocab_highlight?: VocabHighlightItem[];
}

interface FlyersPart2Result {
  score: number;
  maxScore: number;
  percentage: number;
  starsEarned: number;
  answersForApi: Record<string, string>;
  startTime: number;
}

interface FlyersPart2EngineProps {
  quiz: FlyersPart2Quiz;
  onSubmitResult?: (result: FlyersPart2Result) => void;
  onFinish?: () => void;
  onBack?: () => void;
  isLoggedIn?: boolean;
}

// ─── Helper ───────────────────────────────────────────────────────────────────

function calcStars(pct: number): number {
  if (pct >= 90) return 5;
  if (pct >= 70) return 3;
  if (pct >= 50) return 2;
  return 1;
}

function countQuestions(conversation: FlyersPart2Turn[]): number {
  return conversation.filter(
    (t) => t.questionIndex !== undefined && !t.example
  ).length;
}

// ─── Main Component ───────────────────────────────────────────────────────────

export function FlyersPart2Engine({
  quiz,
  onSubmitResult,
  onFinish,
  onBack,
  isLoggedIn = false,
}: FlyersPart2EngineProps) {
  const totalQ = countQuestions(quiz.conversation);
  const hasVocab = quiz.vocab_highlight && quiz.vocab_highlight.length > 0;

  const [placed, setPlaced]           = useState<Record<number, string>>({});
  const [activeBlank, setActiveBlank] = useState<number>(-1);
  const [submitted, setSubmitted]     = useState(false);
  const [result, setResult]           = useState<FlyersPart2Result | null>(null);
  const startTimeRef                  = useRef<number>(Date.now());

  const usedLetters = new Set(Object.values(placed));

  // ── Handlers ────────────────────────────────────────────────────────────────

  const handleBlankClick = useCallback((qIdx: number) => {
    if (submitted) return;
    setActiveBlank((prev) => (prev === qIdx ? -1 : qIdx));
  }, [submitted]);

  const handleOptionClick = useCallback((letter: string) => {
    if (submitted || activeBlank === -1) return;
    setPlaced((prev) => {
      const next = { ...prev };
      for (const [idx, l] of Object.entries(next)) {
        if (l === letter) { delete next[Number(idx)]; break; }
      }
      next[activeBlank] = letter;
      return next;
    });
    setActiveBlank(-1);
  }, [submitted, activeBlank]);

  const handleClearBlank = useCallback((qIdx: number) => {
    if (submitted) return;
    setPlaced((prev) => { const next = { ...prev }; delete next[qIdx]; return next; });
    setActiveBlank(qIdx);
  }, [submitted]);

  const handleSubmit = useCallback(() => {
    let score = 0;
    for (let i = 0; i < totalQ; i++) {
      if ((placed[i] ?? "").trim().toUpperCase() === quiz.answers[i].trim().toUpperCase()) score++;
    }
    const percentage  = Math.round((score / totalQ) * 100);
    const starsEarned = calcStars(percentage);
    const answersForApi: Record<string, string> = {};
    for (let i = 0; i < totalQ; i++) answersForApi[`q${i + 1}`] = placed[i] ?? "";

    const res: FlyersPart2Result = {
      score, maxScore: totalQ, percentage, starsEarned,
      answersForApi, startTime: startTimeRef.current,
    };
    setResult(res);
    setSubmitted(true);
    onSubmitResult?.(res);
  }, [placed, totalQ, quiz.answers, onSubmitResult]);

  const handleReset = useCallback(() => {
    setPlaced({}); setActiveBlank(-1); setSubmitted(false); setResult(null);
  }, []);

  const allAnswered = Object.keys(placed).length >= totalQ;

  // ── Render ──────────────────────────────────────────────────────────────────

  return (
    <div className="fp2-engine">

      {/* ── Instruction ── */}
      <div className="fp2-instruction">
        <strong>READ THE CONVERSATION AND CHOOSE THE BEST ANSWER.</strong>
        {" "}WRITE A LETTER (A–H) FOR EACH ANSWER. YOU DO NOT NEED TO USE ALL THE LETTERS.
        {" "}THERE IS ONE EXAMPLE.
      </div>

      {/* ── Main grid ── */}
      <div className="fp2-layout">

        {/* ═══ LEFT COL (desktop sticky): Options A–H + VocabPanel ═══ */}
        <aside className="fp2-left-col">

          {/* Options A–H */}
          <div className="fp2-options-panel">
            <div className="fp2-options-list">
              {quiz.options.map((opt) => {
                const isUsed     = usedLetters.has(opt.letter);
                const isActive   = !submitted && activeBlank !== -1 && !isUsed;
                return (
                  <button
                    key={opt.letter}
                    className={[
                      "fp2-option",
                      isUsed      ? "fp2-option--selected"  : "",
                      isActive    ? "fp2-option--clickable" : "",
                      submitted   ? "fp2-option--disabled"  : "",
                    ].filter(Boolean).join(" ")}
                    onClick={() => handleOptionClick(opt.letter)}
                    disabled={submitted || (isUsed && activeBlank === -1)}
                    aria-label={`Option ${opt.letter}: ${opt.text}`}
                  >
                    <span className="fp2-option__letter">{opt.letter}.</span>
                    <span className="fp2-option__text">{opt.text}</span>
                  </button>
                );
              })}
            </div>

            {/* Example legend */}
            <div className="fp2-example-legend">
              <span className="fp2-example-legend__label">Example:</span>
              {quiz.conversation
                .filter((t) => t.example && t.speaker !== quiz.conversation[0]?.speaker)
                .map((t, i) => (
                  <span key={i} className="fp2-example-legend__value">
                    {t.speaker}: <strong>{t.answerKey}</strong>
                  </span>
                ))}
            </div>
          </div>

          {/* VocabPanel — desktop only */}
          {hasVocab && (
            <div className="fp2-vocab-desktop">
              <VocabPanel
                vocab={quiz.vocab_highlight!}
                isLoggedIn={isLoggedIn}
                quizId={quiz.id}
              />
            </div>
          )}
        </aside>

        {/* ═══ RIGHT COL: Image (if any) + Conversation ═══ */}
        <div className="fp2-right-col">

          {/* Image 16:9 — above conversation */}
          {quiz.image_url && (
            <div className="fp2-image-wrap">
              <img
                src={quiz.image_url}
                alt="Conversation illustration"
                className="fp2-image"
                loading="lazy"
              />
            </div>
          )}

          {/* Conversation */}
          <div className="fp2-conversation-panel" aria-label="Conversation">
            {quiz.conversation.map((turn, idx) => {
              const isGeorgeBlank = turn.questionIndex !== undefined && !turn.example;
              const isExample     = turn.example === true;
              const qIdx          = turn.questionIndex ?? -1;

              const chosenLetter  = isGeorgeBlank ? (placed[qIdx] ?? null) : null;
              const isBlankActive = isGeorgeBlank && activeBlank === qIdx && !submitted;
              const isCorrect     = submitted && isGeorgeBlank &&
                chosenLetter?.toUpperCase() === quiz.answers[qIdx]?.toUpperCase();
              const isWrong       = submitted && isGeorgeBlank && !!chosenLetter && !isCorrect;
              const isMissed      = submitted && isGeorgeBlank && !chosenLetter;

              return (
                <div
                  key={idx}
                  className={["fp2-turn", isExample ? "fp2-turn--example" : ""].filter(Boolean).join(" ")}
                >
                  <span className="fp2-turn__speaker">{turn.speaker}:</span>

                  {turn.text ? (
                    <span className="fp2-turn__text">{turn.text}</span>
                  ) : isExample && turn.answerKey ? (
                    <span className="fp2-blank fp2-blank--example">{turn.answerKey}</span>
                  ) : isGeorgeBlank ? (
                    <span className="fp2-blank-wrap">
                      {chosenLetter ? (
                        <button
                          className={[
                            "fp2-blank fp2-blank--filled",
                            isBlankActive ? "fp2-blank--active"  : "",
                            isCorrect     ? "fp2-blank--correct" : "",
                            isWrong       ? "fp2-blank--wrong"   : "",
                          ].filter(Boolean).join(" ")}
                          onClick={() => handleClearBlank(qIdx)}
                          disabled={submitted}
                          aria-label={`Your answer: ${chosenLetter}. Click to remove.`}
                        >
                          {chosenLetter}
                          {!submitted && <span className="fp2-blank__remove" aria-hidden>✕</span>}
                        </button>
                      ) : (
                        <button
                          className={[
                            "fp2-blank fp2-blank--empty",
                            isBlankActive ? "fp2-blank--active" : "",
                            isMissed      ? "fp2-blank--missed" : "",
                          ].filter(Boolean).join(" ")}
                          onClick={() => handleBlankClick(qIdx)}
                          disabled={submitted}
                          aria-label={`Question ${qIdx + 1}: select an answer`}
                        >
                          {isBlankActive ? "▶ pick A–H" : `Q${qIdx + 1}`}
                        </button>
                      )}

                      {(isWrong || isMissed) && (
                        <span className="fp2-correct-hint">✓ {quiz.answers[qIdx]}</span>
                      )}

                      {submitted && quiz.explanations_vi?.[qIdx] && (
                        <span className={`fp2-explanation ${isCorrect ? "fp2-explanation--correct" : "fp2-explanation--wrong"}`}>
                          {isCorrect ? "🎉" : "💡"} {quiz.explanations_vi[qIdx]}
                        </span>
                      )}
                    </span>
                  ) : null}
                </div>
              );
            })}
          </div>
        </div>

        {/* ═══ MOBILE ONLY: VocabPanel after conversation ═══ */}
        {hasVocab && (
          <div className="fp2-vocab-mobile">
            <VocabPanel
              vocab={quiz.vocab_highlight!}
              isLoggedIn={isLoggedIn}
              quizId={quiz.id}
            />
          </div>
        )}
      </div>

      {/* ── Footer ── */}
      {!submitted ? (
        <div className="fp2-footer">
          <span className="fp2-footer__count">{Object.keys(placed).length} / {totalQ} answered</span>
          <button
            className="btn btn-success fp2-submit-btn"
            onClick={handleSubmit}
            disabled={!allAnswered}
            id="btn-fp2-submit"
            title={!allAnswered ? "Please fill all blanks first" : "Submit your answers"}
          >
            Submit ✓
          </button>
        </div>
      ) : (
        <div className="fp2-result">
          <div className="fp2-result__score">
            <span className="fp2-result__stars">{"⭐".repeat(result?.starsEarned ?? 0)}</span>
            <span className="fp2-result__text">
              {result?.score} / {result?.maxScore} correct
              <em> ({result?.percentage}%)</em>
            </span>
          </div>
          <div className="fp2-result__actions">
            {onFinish && (
              <button className="btn btn-success" onClick={onFinish} id="btn-fp2-finish">
                ✅ Finish &amp; Save
              </button>
            )}
            {onBack && (
              <button className="btn btn-outline" onClick={onBack} id="btn-fp2-back">
                ← Về danh sách
              </button>
            )}
            {!onFinish && !onBack && (
              <button className="btn btn-outline" onClick={handleReset} id="btn-fp2-retry">
                🔄 Try Again
              </button>
            )}
          </div>
        </div>
      )}

    </div>
  );
}
