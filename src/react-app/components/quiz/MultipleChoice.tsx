/**
 * MultipleChoice.tsx
 * Dùng cho: "multiple-choice" và "multiple-choice-image"
 * Nhận prop imageUrl? — khi có ảnh render to hơn, khi không có chỉ text.
 */

import type { QuizComponentProps } from "../../types/quiz";
import { WordTooltip } from "../vocabulary/WordTooltip";
import "./Quiz.css";

export function MultipleChoice({
  question,
  userAnswer,
  onAnswer,
  isSubmitted,
  correctAnswer,
  vocabRemainingFree = 3,
  onVocabLookup,
}: QuizComponentProps) {
  const selected = Array.isArray(userAnswer) ? userAnswer[0] : userAnswer;
  const correct = Array.isArray(correctAnswer) ? correctAnswer[0] : correctAnswer;

  const getOptionState = (option: string) => {
    if (!isSubmitted) {
      return selected === option ? "selected" : "idle";
    }
    if (option === correct) return "correct";
    if (option === selected && option !== correct) return "wrong";
    return "idle";
  };

  const optionLabels = ["A", "B", "C", "D", "E", "F"];

  return (
    <div className="quiz-question">
      {/* Ảnh nếu có (multiple-choice-image) */}
      {question.image_url && (
        <div className="quiz-question__image-wrap">
          <img
            src={question.image_url}
            alt="Hình ảnh câu hỏi"
            className="quiz-question__image"
          />
        </div>
      )}

      {/* Câu hỏi — Phase 4.5: hỗ trợ annotated prompt */}
      <p className="quiz-question__prompt">
        <WordTooltip
          prompt={question.prompt}
          remainingFree={vocabRemainingFree}
          onLookup={onVocabLookup ?? (() => ({ allowed: false, willCostStar: false }))}
          isReview={isSubmitted}
        />
      </p>

      {/* Đáp án */}
      <div className={`mc-options ${question.image_url ? "mc-options--image" : ""}`}>
        {question.options.map((option, idx) => {
          const stateClass = `mc-option--${getOptionState(option)}`;
          return (
            <button
              key={option}
              id={`option-${question.id}-${idx}`}
              className={`mc-option ${stateClass}`}
              onClick={() => !isSubmitted && onAnswer(question.id, option)}
              disabled={isSubmitted}
              aria-pressed={selected === option}
            >
              <span className="mc-option__label">{optionLabels[idx]}</span>
              <span className="mc-option__text">{option}</span>
              {isSubmitted && option === correct && (
                <span className="mc-option__icon">✓</span>
              )}
              {isSubmitted && option === selected && option !== correct && (
                <span className="mc-option__icon">✗</span>
              )}
            </button>
          );
        })}
      </div>

      {/* Giải thích sau khi nộp */}
      {isSubmitted && question.explanation_vi && (
        <div className={`quiz-explanation ${selected === correct ? "quiz-explanation--correct" : "quiz-explanation--wrong"}`}>
          <span className="quiz-explanation__icon">
            {selected === correct ? "🎉" : "💡"}
          </span>
          <p>{question.explanation_vi}</p>
        </div>
      )}
    </div>
  );
}
