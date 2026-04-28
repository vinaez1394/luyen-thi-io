/**
 * FillBlank.tsx
 * Câu văn có ___ → input box được highlight
 * Mobile: tự scroll câu hỏi vào view khi keyboard mở
 */

import { useRef } from "react";
import type { QuizComponentProps } from "../../types/quiz";
import "./Quiz.css";

export function FillBlank({
  question,
  userAnswer,
  onAnswer,
  isSubmitted,
  correctAnswer,
}: QuizComponentProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const value = Array.isArray(userAnswer) ? userAnswer[0] : (userAnswer ?? "");
  const correct = Array.isArray(correctAnswer) ? correctAnswer[0] : (correctAnswer ?? "");
  const isCorrect = value.trim().toLowerCase() === correct.trim().toLowerCase();

  // Chia prompt thành trước và sau ___
  const parts = question.prompt.split("___");
  const before = parts[0] ?? "";
  const after = parts[1] ?? "";

  const handleFocus = () => {
    // Scroll input vào view khi mobile keyboard mở
    setTimeout(() => {
      inputRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 300);
  };

  const stateClass = isSubmitted
    ? isCorrect ? "fill-blank__input--correct" : "fill-blank__input--wrong"
    : value ? "fill-blank__input--filled" : "";

  return (
    <div className="quiz-question">
      <div className="fill-blank-sentence">
        <span className="fill-blank-sentence__text">{before}</span>
        <input
          ref={inputRef}
          id={`fill-${question.id}`}
          type="text"
          className={`fill-blank__input ${stateClass}`}
          value={value}
          onChange={(e) => !isSubmitted && onAnswer(question.id, e.target.value)}
          onFocus={handleFocus}
          disabled={isSubmitted}
          placeholder="..."
          autoComplete="off"
          autoCapitalize="off"
          spellCheck={false}
        />
        {after && <span className="fill-blank-sentence__text">{after}</span>}
      </div>

      {/* Đáp án đúng sau khi nộp */}
      {isSubmitted && !isCorrect && (
        <div className="fill-blank__correct-answer">
          Đáp án đúng: <strong>{correct}</strong>
        </div>
      )}

      {/* Giải thích */}
      {isSubmitted && question.explanation_vi && (
        <div className={`quiz-explanation ${isCorrect ? "quiz-explanation--correct" : "quiz-explanation--wrong"}`}>
          <span className="quiz-explanation__icon">{isCorrect ? "🎉" : "💡"}</span>
          <p>{question.explanation_vi}</p>
        </div>
      )}
    </div>
  );
}
