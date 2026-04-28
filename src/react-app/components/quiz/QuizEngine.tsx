/**
 * QuizEngine.tsx — Controller chính
 * Đọc quiz.type → tra QUIZ_REGISTRY → render đúng component
 * Thêm dạng bài mới: chỉ cần thêm 1 dòng vào QUIZ_REGISTRY
 */

import type { FC } from "react";
import type { Quiz, QuizType, QuizComponentProps, UserAnswers, QuizResult } from "../../types/quiz";
import { MultipleChoice } from "./MultipleChoice";
import { FillBlank } from "./FillBlank";
import { UnknownTypeScreen } from "./UnknownTypeScreen";
import { QuizHeader } from "./QuizHeader";
import { InstructionBanner } from "./InstructionBanner";
import "./Quiz.css";

// ============================================
// QUIZ_REGISTRY — Plugin registry
// Thêm type mới vào đây, Engine tự động nhận ra
// ============================================
const QUIZ_REGISTRY: Partial<Record<QuizType, FC<QuizComponentProps>>> = {
  "multiple-choice": MultipleChoice,
  "multiple-choice-image": MultipleChoice, // same component, imageUrl trong question
  "fill-blank": FillBlank,
  // Phase 05:
  // "drag-drop-fill": DragDropFill,
  // "drag-drop-match": DragDropMatch,
  // "matching": Matching,
  // Phase 06:
  // "audio-mc": AudioMC,
  // "audio-fill": AudioFill,
};

// ============================================
// Props
// ============================================
interface QuizEngineProps {
  quiz: Quiz;
  answers: UserAnswers;
  result: QuizResult | null;
  isSubmitted: boolean;
  currentQuestion: number;
  onAnswer: (questionId: string, answer: string | string[]) => void;
  onNext: () => void;
  onPrev: () => void;
  onSubmit: () => void;
  allAnswered: boolean;
}

// ============================================
// QuizEngine
// ============================================
export function QuizEngine({
  quiz,
  answers,
  result,
  isSubmitted,
  currentQuestion,
  onAnswer,
  onNext,
  onPrev,
  onSubmit,
  allAnswered,
}: QuizEngineProps) {
  const question = quiz.questions[currentQuestion];
  const QuizComponent = QUIZ_REGISTRY[quiz.type] ?? null;

  return (
    <div className="quiz-engine">
      {/* Header */}
      <QuizHeader
        title={quiz.title}
        currentQuestion={currentQuestion}
        totalQuestions={quiz.questions.length}
        skill={quiz.skill}
      />

      {/* Hướng dẫn — chỉ hiện ở câu đầu tiên */}
      {currentQuestion === 0 && !isSubmitted && (
        <InstructionBanner text={quiz.instructions_vi} />
      )}

      {/* Nội dung câu hỏi */}
      <div className="quiz-engine__content">
        {QuizComponent ? (
          <QuizComponent
            question={question}
            questionIndex={currentQuestion}
            totalQuestions={quiz.questions.length}
            userAnswer={answers[question.id]}
            onAnswer={onAnswer}
            isSubmitted={isSubmitted}
            correctAnswer={result?.correctAnswers[question.id]}
          />
        ) : (
          <UnknownTypeScreen quizType={quiz.type} />
        )}
      </div>

      {/* Navigation + Submit */}
      {!isSubmitted && (
        <div className="quiz-engine__footer">
          <button
            className="btn btn-outline"
            id="btn-quiz-prev"
            onClick={onPrev}
            disabled={currentQuestion === 0}
          >
            ← Câu trước
          </button>

          <span className="quiz-engine__progress">
            {currentQuestion + 1} / {quiz.questions.length}
          </span>

          {currentQuestion < quiz.questions.length - 1 ? (
            <button
              className="btn btn-primary"
              id="btn-quiz-next"
              onClick={onNext}
            >
              Câu tiếp →
            </button>
          ) : (
            <button
              className="btn btn-success"
              id="btn-quiz-submit"
              onClick={onSubmit}
              disabled={!allAnswered}
              title={!allAnswered ? "Vui lòng trả lời tất cả các câu" : ""}
            >
              Nộp bài ✓
            </button>
          )}
        </div>
      )}

      {/* Review navigation (sau khi nộp) */}
      {isSubmitted && (
        <div className="quiz-engine__footer">
          <button
            className="btn btn-outline"
            id="btn-review-prev"
            onClick={onPrev}
            disabled={currentQuestion === 0}
          >
            ← Câu trước
          </button>
          <span className="quiz-engine__progress">
            Xem lại: {currentQuestion + 1} / {quiz.questions.length}
          </span>
          <button
            className="btn btn-outline"
            id="btn-review-next"
            onClick={onNext}
            disabled={currentQuestion === quiz.questions.length - 1}
          >
            Câu tiếp →
          </button>
        </div>
      )}
    </div>
  );
}
