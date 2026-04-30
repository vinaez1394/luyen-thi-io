/**
 * QuizEngine.tsx — Controller chính
 * Đọc quiz.type → tra QUIZ_REGISTRY → render đúng component
 * Thêm dạng bài mới: chỉ cần thêm 1 dòng vào QUIZ_REGISTRY
 *
 * Note: QuizHeader đã được chuyển vào QuizLayout (QuizSubHeader)
 * QuizEngine chỉ render: InstructionBanner + QuizContent + BottomBar (Prev/Next)
 */

import type { FC } from "react";
import type { Quiz, QuizType, QuizComponentProps, UserAnswers, QuizResult } from "../../types/quiz";
import type { WordTooltipProps } from "../vocabulary/WordTooltip";
import { MultipleChoice } from "./MultipleChoice";
import { FillBlank } from "./FillBlank";
import { DragDropFill } from "./DragDropFill";
import { DragDropMatch } from "./DragDropMatch";
import { UnknownTypeScreen } from "./UnknownTypeScreen";
import { InstructionBanner } from "./InstructionBanner";
import "./Quiz.css";

// ============================================
// QUIZ_REGISTRY — Plugin registry
// ============================================
const QUIZ_REGISTRY: Partial<Record<QuizType, FC<QuizComponentProps>>> = {
  "multiple-choice":       MultipleChoice,
  "multiple-choice-image": MultipleChoice,
  "fill-blank":            FillBlank,
  // Phase 05 ✅
  "drag-drop-fill":        DragDropFill,
  "drag-drop-match":       DragDropMatch,
  // "matching":           Matching,  // TODO Phase 05 optional
  // Phase 06:
  // "audio-mc":   AudioMC,
  // "audio-fill": AudioFill,
};

// ============================================
// UI Labels — theo ui_language trong quiz
// ============================================
type UiLang = "en" | "vi";

const UI_LABELS: Record<UiLang, {
  prev: string;
  next: string;
  submit: string;
  review: string;
}> = {
  en: { prev: "← Previous", next: "Next →",      submit: "Submit ✓",   review: "Review" },
  vi: { prev: "← Câu trước", next: "Câu tiếp →", submit: "Nộp bài ✓", review: "Xem lại" },
};

// ============================================
// Props
// ============================================
interface QuizEngineProps {
  quiz:            Quiz;
  answers:         UserAnswers;
  result:          QuizResult | null;
  isSubmitted:     boolean;
  currentQuestion: number;
  onAnswer:        (questionId: string, answer: string | string[]) => void;
  onNext:          () => void;
  onPrev:          () => void;
  onSubmit:        () => void;
  allAnswered:     boolean;
  // Phase 4.5: Word Tooltip
  vocabRemainingFree?: number;
  onVocabLookup?:  WordTooltipProps["onLookup"];
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
  vocabRemainingFree = 3,
  onVocabLookup,
}: QuizEngineProps) {
  const question     = quiz.questions[currentQuestion];
  const QuizComponent = QUIZ_REGISTRY[quiz.type] ?? null;

  // Xác định ngôn ngữ UI từ quiz data (field ui_language, fallback theo skill)
  const uiLang: UiLang =
    (quiz as any).ui_language === "en" ||
    quiz.skill === "reading" ||
    quiz.skill === "listening" ||
    quiz.skill === "writing"
      ? "en"
      : "vi";

  const labels = UI_LABELS[uiLang];

  return (
    <div className="quiz-engine">
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
            vocabRemainingFree={vocabRemainingFree}
            onVocabLookup={onVocabLookup}
          />
        ) : (
          <UnknownTypeScreen quizType={quiz.type} />
        )}
      </div>

      {/* ── Navigation (đang làm bài) ── */}
      {!isSubmitted && (
        <div className="quiz-engine__footer">
          <button
            className="btn btn-outline"
            id="btn-quiz-prev"
            onClick={onPrev}
            disabled={currentQuestion === 0}
          >
            {labels.prev}
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
              {labels.next}
            </button>
          ) : (
            <button
              className="btn btn-success"
              id="btn-quiz-submit"
              onClick={onSubmit}
              disabled={!allAnswered}
              title={!allAnswered ? (uiLang === "en" ? "Please answer all questions" : "Vui lòng trả lời tất cả các câu") : ""}
            >
              {labels.submit}
            </button>
          )}
        </div>
      )}

      {/* ── Navigation (xem lại sau khi nộp) ── */}
      {isSubmitted && (
        <div className="quiz-engine__footer">
          <button
            className="btn btn-outline"
            id="btn-review-prev"
            onClick={onPrev}
            disabled={currentQuestion === 0}
          >
            {labels.prev}
          </button>
          <span className="quiz-engine__progress">
            {labels.review}: {currentQuestion + 1} / {quiz.questions.length}
          </span>
          <button
            className="btn btn-outline"
            id="btn-review-next"
            onClick={onNext}
            disabled={currentQuestion === quiz.questions.length - 1}
          >
            {labels.next}
          </button>
        </div>
      )}
    </div>
  );
}
