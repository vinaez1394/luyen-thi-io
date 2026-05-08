/**
 * FlyersPart1Engine.tsx
 * Cambridge Flyers Reading & Writing — Part 1: "Look and Read"
 *
 * Cơ chế:
 *  - Word Bank: 15 chips có thể click, từ đã dùng sẽ mờ/ẩn
 *  - User click từ → điền vào câu đang active (highlight)
 *  - User click từ đang nằm trong câu → từ bay về Word Bank
 *  - Sau submit: hiển thị đúng/sai + explanation_vi
 *
 * Layout:
 *  - Desktop (≥768px): 2 cột — Word Bank + Example (trái) | 10 câu (phải)
 *  - Mobile (<768px): Word Bank sticky top, Example + 10 câu cuộn bên dưới
 */

import { useState, useCallback } from "react";
import "./FlyersPart1Engine.css";

// ─── Types ────────────────────────────────────────────────────────────────────

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
}

interface FlyersPart1EngineProps {
  quiz: FlyersPart1Quiz;
  onSubmitResult?: (result: FlyersPart1Result) => void;
}

// ─── Helper ───────────────────────────────────────────────────────────────────

function calcStars(pct: number): number {
  if (pct >= 90) return 5;
  if (pct >= 70) return 3;
  if (pct >= 50) return 2;
  return 1;
}

// ─── Main Component ───────────────────────────────────────────────────────────

export function FlyersPart1Engine({ quiz, onSubmitResult }: FlyersPart1EngineProps) {
  // Câu đang được focus (sẽ nhận từ khi click Word Bank)
  const [activeQ, setActiveQ] = useState<string | null>(null);
  // Từ đã điền: { q1: "a dictionary", q3: "a pilot", ... }
  const [placed, setPlaced] = useState<FlyersPart1Answers>({});
  // Đã nộp bài?
  const [submitted, setSubmitted] = useState(false);
  const [result, setResult] = useState<FlyersPart1Result | null>(null);

  // Set từ nào đang ở trong câu nào (để biết chip nào đã dùng)
  const usedWords = new Set(Object.values(placed));

  // ── Handlers ──────────────────────────────────────────────────────────────

  /** Click từ trong Word Bank */
  const handleWordBankClick = useCallback((word: string) => {
    if (submitted) return;

    // Nếu từ đã được dùng ở câu nào đó → không làm gì (phải click từ câu để xóa)
    if (usedWords.has(word)) return;

    // Nếu có câu đang active → điền từ vào
    if (activeQ) {
      setPlaced(prev => {
        const next = { ...prev };
        // Nếu câu đó đã có từ → trả từ cũ về Word Bank (chỉ xóa key là đủ)
        next[activeQ] = word;
        return next;
      });
      setActiveQ(null); // bỏ focus sau khi điền
    }
  }, [submitted, usedWords, activeQ]);

  /** Click từ đang nằm trong câu → trả về Word Bank */
  const handlePlacedWordClick = useCallback((questionId: string) => {
    if (submitted) return;
    setPlaced(prev => {
      const next = { ...prev };
      delete next[questionId];
      return next;
    });
    setActiveQ(questionId); // focus lại câu đó
  }, [submitted]);

  /** Click vào câu để chọn làm active */
  const handleQuestionClick = useCallback((questionId: string) => {
    if (submitted) return;
    setActiveQ(prev => prev === questionId ? null : questionId);
  }, [submitted]);

  /** Nộp bài */
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
    };

    setResult(res);
    setSubmitted(true);
    onSubmitResult?.(res);
  }, [quiz.questions, placed, onSubmitResult]);

  /** Làm lại */
  const handleReset = useCallback(() => {
    setPlaced({});
    setActiveQ(null);
    setSubmitted(false);
    setResult(null);
  }, []);

  const allAnswered = quiz.questions.every(q => placed[q.id]);

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <div className="fp1-engine">

      {/* ── Word Bank (sticky on mobile) ── */}
      <div className="fp1-word-bank" aria-label="Word Bank">
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

        {/* ── Left panel: Instruction + Example ── */}
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
        </div>

        {/* ── Right panel: Questions ── */}
        <div className="fp1-right">
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

                    {/* Blank / Placed word */}
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

                      {/* Correct answer hint after submit */}
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

                    {/* Explanation */}
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
              <button
                className="btn btn-outline"
                onClick={handleReset}
                id="btn-fp1-retry"
              >
                🔄 Try Again
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
