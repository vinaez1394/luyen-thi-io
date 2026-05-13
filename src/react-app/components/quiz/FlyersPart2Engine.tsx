/**
 * FlyersPart2Engine.tsx
 * Cambridge Flyers Reading & Writing — Part 2: "Read the Conversation and Choose the Best Answer"
 *
 * Cơ chế:
 *  - Danh sách đáp án A–H (tối đa 8) hiển thị bên trái
 *  - Hội thoại 2 nhân vật hiển thị bên phải — "George:" có ô blank
 *  - User click một ô blank → highlight active, sau đó click option A–H để chọn
 *  - Click option đã chọn ở blank → bỏ chọn (trả về pool)
 *  - Sau submit: hiện đúng/sai + đáp án đúng + explanation_vi
 *
 * Layout:
 *  - Desktop (≥768px): 2 cột — Options (trái) | Conversation (phải)
 *  - Mobile (<768px): Conversation trên, Options sticky bottom
 */

import { useState, useCallback, useRef } from "react";
import "./FlyersPart2Engine.css";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface FlyersPart2Option {
  letter: string;       // "A" | "B" | ... | "H"
  text: string;         // Nội dung đáp án
}

/** Một lượt thoại trong hội thoại */
export interface FlyersPart2Turn {
  speaker: string;      // "Sarah" | "George" | tên bất kỳ
  text?: string;        // Lời thoại của Sarah (hoặc George trong example)
  /** Nếu đây là lượt George cần điền: index trong mảng answers (0-based) */
  questionIndex?: number;
  /** Nếu đây là example: đánh dấu hiển thị khác */
  example?: boolean;
  /** Đáp án mẫu của example (e.g. "C") */
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
  image_url?: string;           // Ảnh minh hoạ (optional)
  conversation: FlyersPart2Turn[];
  options: FlyersPart2Option[];
  answers: string[];            // ["F", "A", "H", "D", "B"] — thứ tự khớp với questionIndex
  explanations_vi?: string[];   // giải thích tiếng Việt, khớp theo index câu hỏi
}

interface FlyersPart2Result {
  score: number;
  maxScore: number;
  percentage: number;
  starsEarned: number;
  answersForApi: Record<string, string>; // { "q1": "F", "q2": "A", ... } — gửi API
  startTime: number;                     // timestamp — để tính timeSpent
}

interface FlyersPart2EngineProps {
  quiz: FlyersPart2Quiz;
  onSubmitResult?: (result: FlyersPart2Result) => void;
  onFinish?: () => void;   // Click “Finish” → QuizResultScreen
  onBack?: () => void;     // Click “Back” → về danh sách bài
}

// ─── Helper ───────────────────────────────────────────────────────────────────

function calcStars(pct: number): number {
  if (pct >= 90) return 5;
  if (pct >= 70) return 3;
  if (pct >= 50) return 2;
  return 1;
}

/** Đếm số câu cần điền (questionIndex !== undefined, không phải example) */
function countQuestions(conversation: FlyersPart2Turn[]): number {
  return conversation.filter(
    (t) => t.questionIndex !== undefined && !t.example
  ).length;
}

// ─── Main Component ───────────────────────────────────────────────────────────

export function FlyersPart2Engine({ quiz, onSubmitResult, onFinish, onBack }: FlyersPart2EngineProps) {
  const totalQ = countQuestions(quiz.conversation);

  // placed[i] = letter đã chọn cho questionIndex i (0-based)
  const [placed, setPlaced]     = useState<Record<number, string>>({});
  // activeBlank: questionIndex đang được focus (-1 = không có)
  const [activeBlank, setActiveBlank] = useState<number>(-1);
  const [submitted, setSubmitted]     = useState(false);
  const [result, setResult]           = useState<FlyersPart2Result | null>(null);
  // Track start time để tính timeSpent
  const startTimeRef = useRef<number>(Date.now());

  // Tập hợp các letter đã được dùng
  const usedLetters = new Set(Object.values(placed));

  // ── Handlers ────────────────────────────────────────────────────────────────

  /** Click vào ô blank của George */
  const handleBlankClick = useCallback((qIdx: number) => {
    if (submitted) return;
    setActiveBlank((prev) => (prev === qIdx ? -1 : qIdx));
  }, [submitted]);

  /** Click vào option A–H */
  const handleOptionClick = useCallback((letter: string) => {
    if (submitted) return;

    // Nếu không có blank nào đang active → không làm gì
    if (activeBlank === -1) return;

    setPlaced((prev) => {
      const next = { ...prev };
      // Nếu letter này đang được dùng ở blank khác → xóa chỗ cũ
      for (const [idx, l] of Object.entries(next)) {
        if (l === letter) {
          delete next[Number(idx)];
          break;
        }
      }
      // Gán vào blank đang active
      next[activeBlank] = letter;
      return next;
    });

    setActiveBlank(-1); // bỏ focus sau khi chọn
  }, [submitted, activeBlank]);

  /** Click vào letter đang ở trong blank → xóa */
  const handleClearBlank = useCallback((qIdx: number) => {
    if (submitted) return;
    setPlaced((prev) => {
      const next = { ...prev };
      delete next[qIdx];
      return next;
    });
    setActiveBlank(qIdx); // focus lại blank đó
  }, [submitted]);

  /** Nộp bài */
  const handleSubmit = useCallback(() => {
    let score = 0;
    for (let i = 0; i < totalQ; i++) {
      if ((placed[i] ?? "").trim().toUpperCase() === quiz.answers[i].trim().toUpperCase()) {
        score++;
      }
    }
    const percentage   = Math.round((score / totalQ) * 100);
    const starsEarned  = calcStars(percentage);

    // Format answers cho API: { "q1": "F", "q2": "A", ... }
    const answersForApi: Record<string, string> = {};
    for (let i = 0; i < totalQ; i++) {
      answersForApi[`q${i + 1}`] = placed[i] ?? "";
    }

    const res: FlyersPart2Result = {
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
  }, [placed, totalQ, quiz.answers, onSubmitResult]);

  /** Làm lại */
  const handleReset = useCallback(() => {
    setPlaced({});
    setActiveBlank(-1);
    setSubmitted(false);
    setResult(null);
  }, []);

  const allAnswered = Object.keys(placed).length >= totalQ;

  // ── Render ──────────────────────────────────────────────────────────────────

  return (
    <div className="fp2-engine">

      {/* ── Instruction banner ── */}
      <div className="fp2-instruction">
        <strong>READ THE CONVERSATION AND CHOOSE THE BEST ANSWER.</strong>
        {" "}WRITE A LETTER (A–H) FOR EACH ANSWER. YOU DO NOT NEED TO USE ALL THE LETTERS.
        {" "}THERE IS ONE EXAMPLE.
      </div>

      {/* ── Main 2-column layout ── */}
      <div className="fp2-layout">

        {/* ── LEFT: Options A–H ── */}
        <div className="fp2-options-panel" aria-label="Answer options">
          {/* Image (optional) */}
          {quiz.image_url && (
            <div className="fp2-image-wrap">
              <img src={quiz.image_url} alt="Conversation illustration" className="fp2-image" />
            </div>
          )}

          <div className="fp2-options-list">
            {quiz.options.map((opt) => {
              const isUsed     = usedLetters.has(opt.letter);
              const isActive   = !submitted && activeBlank !== -1 && !isUsed;
              const isSelected = isUsed; // đang được dùng ở một blank nào đó

              return (
                <button
                  key={opt.letter}
                  className={[
                    "fp2-option",
                    isSelected  ? "fp2-option--selected"  : "",
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
            {quiz.conversation.filter((t) => t.example && t.speaker !== quiz.conversation[0]?.speaker).map((t, i) => (
              <span key={i} className="fp2-example-legend__value">
                {t.speaker}: <strong>{t.answerKey}</strong>
              </span>
            ))}
          </div>
        </div>

        {/* ── RIGHT: Conversation ── */}
        <div className="fp2-conversation-panel" aria-label="Conversation">
          {quiz.conversation.map((turn, idx) => {
            const isGeorgeBlank = turn.questionIndex !== undefined && !turn.example;
            const isExample     = turn.example === true;
            const qIdx          = turn.questionIndex ?? -1;

            // Trạng thái của blank
            const chosenLetter  = isGeorgeBlank ? (placed[qIdx] ?? null) : null;
            const isBlankActive = isGeorgeBlank && activeBlank === qIdx && !submitted;
            const isCorrect     = submitted && isGeorgeBlank &&
              chosenLetter?.toUpperCase() === quiz.answers[qIdx]?.toUpperCase();
            const isWrong       = submitted && isGeorgeBlank && chosenLetter && !isCorrect;
            const isMissed      = submitted && isGeorgeBlank && !chosenLetter;

            return (
              <div
                key={idx}
                className={[
                  "fp2-turn",
                  isExample ? "fp2-turn--example" : "",
                ].filter(Boolean).join(" ")}
              >
                {/* Speaker name */}
                <span className="fp2-turn__speaker">{turn.speaker}:</span>

                {/* Nội dung lượt thoại */}
                {turn.text ? (
                  <span className="fp2-turn__text">{turn.text}</span>
                ) : isExample && turn.answerKey ? (
                  /* Example George answer */
                  <span className="fp2-blank fp2-blank--example">
                    {turn.answerKey}
                  </span>
                ) : isGeorgeBlank ? (
                  /* Blank cần điền */
                  <span className="fp2-blank-wrap">
                    {chosenLetter ? (
                      <button
                        className={[
                          "fp2-blank fp2-blank--filled",
                          isBlankActive ? "fp2-blank--active" : "",
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

                    {/* Hiện đáp án đúng sau submit */}
                    {(isWrong || isMissed) && (
                      <span className="fp2-correct-hint">
                        ✓ {quiz.answers[qIdx]}
                      </span>
                    )}

                    {/* Explanation */}
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

      {/* ── Footer: Submit / Result ── */}
      {!submitted ? (
        <div className="fp2-footer">
          <span className="fp2-footer__count">
            {Object.keys(placed).length} / {totalQ} answered
          </span>
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
          {/* Score summary */}
          <div className="fp2-result__score">
            <span className="fp2-result__stars">
              {"⭐".repeat(result?.starsEarned ?? 0)}
            </span>
            <span className="fp2-result__text">
              {result?.score} / {result?.maxScore} correct
              <em> ({result?.percentage}%)</em>
            </span>
          </div>

          {/* Action buttons */}
          <div className="fp2-result__actions">
            {onFinish && (
              <button
                className="btn btn-success"
                onClick={onFinish}
                id="btn-fp2-finish"
              >
                ✅ Finish &amp; Save
              </button>
            )}
            {onBack && (
              <button
                className="btn btn-outline"
                onClick={onBack}
                id="btn-fp2-back"
              >
                ← Về danh sách
              </button>
            )}
            {/* Fallback nếu không có callback */}
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
