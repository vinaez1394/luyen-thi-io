/**
 * ReadingQuestion.tsx — Render câu hỏi theo sub_type
 *
 * Sub-types được hỗ trợ:
 *   cloze-mc   → 3 pill buttons (Section 1)
 *   true-false → [True] [False] pills màu xanh/đỏ
 *   mc-3       → list 3 options (Section 2)
 *   write-word → text input
 *
 * Note: Section 1 (cloze) không có field sub_type trong JSON cũ
 * → fallback về "cloze-mc" nếu không có sub_type
 */

import type { ReadingQuestion as ReadingQuestionType } from "../../types/reading";

// ============================================
// Props
// ============================================
interface ReadingQuestionProps {
  question:       ReadingQuestionType;
  questionNumber: number;
  userAnswer:     string;
  isSubmitted:    boolean;
  correctAnswer?: string;
  onAnswer:       (questionId: string, answer: string) => void;
}

// ============================================
// Helper — class cho option button
// ============================================
function optionClass(
  base: string,
  value: string,
  userAnswer: string,
  isSubmitted: boolean,
  correctAnswer?: string
): string {
  let cls = base;
  if (!isSubmitted) {
    if (userAnswer === value) cls += " re-option--selected";
  } else {
    const isCorrect = value.toLowerCase() === correctAnswer?.toLowerCase();
    const isSelected = userAnswer.toLowerCase() === value.toLowerCase();
    if (isSelected && isCorrect) cls += " re-option--correct";
    else if (isSelected && !isCorrect) cls += " re-option--wrong";
    else if (isCorrect) cls += " re-option--correct";
  }
  return cls;
}

// ============================================
// Sub-component: CLOZE-MC — 3 pill buttons
// ============================================
function ClozeMCQuestion({
  question, userAnswer, isSubmitted, correctAnswer, onAnswer
}: ReadingQuestionProps) {
  return (
    <>
      {question.context && (
        <p className="re-question__context">
          💬 {question.context}
        </p>
      )}
      <div className="re-options">
        {(question.options ?? []).map(opt => (
          <button
            key={opt}
            className={optionClass("re-option", opt, userAnswer, isSubmitted, correctAnswer)}
            onClick={() => onAnswer(question.id, opt)}
            disabled={isSubmitted}
            type="button"
          >
            {opt}
          </button>
        ))}
      </div>
    </>
  );
}

// ============================================
// Sub-component: TRUE-FALSE
// ============================================
function TrueFalseQuestion({
  question, userAnswer, isSubmitted, correctAnswer, onAnswer
}: ReadingQuestionProps) {
  const tfClass = (val: "true" | "false") => {
    let cls = `re-tf-btn re-tf-btn--${val}`;
    if (!isSubmitted) {
      if (userAnswer === val) cls += " re-tf-btn--selected";
    } else {
      const isCorrect = val === correctAnswer;
      const isSelected = userAnswer === val;
      if (isSelected && isCorrect) cls += " re-option--correct";
      else if (isSelected && !isCorrect) cls += " re-option--wrong";
      else if (isCorrect) cls += " re-option--correct";
    }
    return cls;
  };

  return (
    <>
      {question.prompt && (
        <p className="re-question__prompt">{question.prompt}</p>
      )}
      <div className="re-tf-options">
        <button
          className={tfClass("true")}
          onClick={() => onAnswer(question.id, "true")}
          disabled={isSubmitted}
          type="button"
        >
          ✓ True
        </button>
        <button
          className={tfClass("false")}
          onClick={() => onAnswer(question.id, "false")}
          disabled={isSubmitted}
          type="button"
        >
          ✗ False
        </button>
      </div>
    </>
  );
}

// ============================================
// Sub-component: MC-3 — chọn 1 trong 3 (list)
// ============================================
function MC3Question({
  question, userAnswer, isSubmitted, correctAnswer, onAnswer
}: ReadingQuestionProps) {
  return (
    <>
      {question.prompt && (
        <p className="re-question__prompt">{question.prompt}</p>
      )}
      <div className="re-mc3-options">
        {(question.options ?? []).map(opt => (
          <button
            key={opt}
            className={optionClass("re-option", opt, userAnswer, isSubmitted, correctAnswer)}
            onClick={() => onAnswer(question.id, opt)}
            disabled={isSubmitted}
            type="button"
          >
            {opt}
          </button>
        ))}
      </div>
    </>
  );
}

// ============================================
// Sub-component: WRITE-WORD — text input
// ============================================
function WriteWordQuestion({
  question, userAnswer, isSubmitted, correctAnswer, onAnswer
}: ReadingQuestionProps) {
  const isCorrect = isSubmitted &&
    userAnswer.trim().toLowerCase() === correctAnswer?.trim().toLowerCase();
  const isWrong = isSubmitted && !isCorrect;

  return (
    <>
      {question.prompt && (
        <p className="re-question__prompt">{question.prompt}</p>
      )}
      <input
        type="text"
        className={[
          "re-write-input",
          isSubmitted && isCorrect ? "re-write-input--correct" : "",
          isSubmitted && isWrong  ? "re-write-input--wrong"   : "",
        ].join(" ")}
        value={userAnswer}
        onChange={e => onAnswer(question.id, e.target.value)}
        disabled={isSubmitted}
        placeholder="Gõ câu trả lời..."
        id={`write-${question.id}`}
        autoComplete="off"
        autoCapitalize="none"
        spellCheck={false}
      />
    </>
  );
}

// ============================================
// Feedback — hiện sau khi submit
// ============================================
function QuestionFeedback({
  userAnswer, isSubmitted, correctAnswer, explanationVi
}: {
  userAnswer: string;
  isSubmitted: boolean;
  correctAnswer?: string;
  explanationVi: string;
}) {
  if (!isSubmitted) return null;

  const isCorrect = userAnswer.trim().toLowerCase() === correctAnswer?.trim().toLowerCase();

  return (
    <div className={`re-feedback ${isCorrect ? "re-feedback--correct" : "re-feedback--wrong"}`}>
      <span className="re-feedback__icon">{isCorrect ? "✅" : "❌"}</span>
      <span className="re-feedback__text">
        {!isCorrect && (
          <span className="re-feedback__correct-answer">
            Đáp án đúng: <strong>{correctAnswer}</strong>
          </span>
        )}
        {explanationVi}
      </span>
    </div>
  );
}

// ============================================
// ReadingQuestion — dispatcher
// ============================================
export function ReadingQuestion({
  question,
  questionNumber,
  userAnswer,
  isSubmitted,
  correctAnswer,
  onAnswer,
}: ReadingQuestionProps) {
  // Xác định sub_type (fallback về cloze-mc nếu Section 1 không có sub_type)
  const subType = question.sub_type ?? "cloze-mc";

  const sharedProps = { question, questionNumber, userAnswer, isSubmitted, correctAnswer, onAnswer };

  return (
    <div className={`re-question re-question--${subType}`}>
      <div className="re-question__label">Câu {questionNumber}:</div>

      {subType === "cloze-mc"   && <ClozeMCQuestion   {...sharedProps} />}
      {subType === "true-false" && <TrueFalseQuestion {...sharedProps} />}
      {subType === "mc-3"       && <MC3Question       {...sharedProps} />}
      {subType === "write-word" && <WriteWordQuestion {...sharedProps} />}

      <QuestionFeedback
        userAnswer={userAnswer}
        isSubmitted={isSubmitted}
        correctAnswer={correctAnswer}
        explanationVi={question.explanation_vi}
      />
    </div>
  );
}
