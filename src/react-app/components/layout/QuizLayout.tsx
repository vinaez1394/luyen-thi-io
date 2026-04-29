/**
 * QuizLayout.tsx — Quiz-specific layout shell
 *
 * Render bên TRONG QuizPage (không phải trong App.tsx)
 * Vì cần dữ liệu quiz: title, currentQuestion, answers, totalQuestions
 *
 * Bao gồm:
 *   - QuizSubHeader: breadcrumb, progress bubbles, exit button
 *   - {children}: QuizEngine content
 */

import { useState, type ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { ExitConfirmDialog } from "../ui/ExitConfirmDialog";
import type { Quiz, UserAnswers } from "../../types/quiz";
import "./QuizLayout.css";

// ─── Skill config ─────────────────────────────────────────────────────────────
const SKILL_EMOJI: Record<string, string> = {
  reading: "📖", listening: "🎧", writing: "✍️", math: "🧮",
};
const SKILL_LABEL: Record<string, string> = {
  reading: "Reading", listening: "Listening", writing: "Writing", math: "Toán",
};

// ─── Props ────────────────────────────────────────────────────────────────────
interface QuizLayoutProps {
  quiz:            Quiz;
  currentQuestion: number;
  answers:         UserAnswers;
  children:        ReactNode;
}

// ─── Component ────────────────────────────────────────────────────────────────
export function QuizLayout({ quiz, currentQuestion, answers, children }: QuizLayoutProps) {
  const navigate = useNavigate();
  const [showExitDialog, setShowExitDialog] = useState(false);

  const totalQuestions = quiz.questions.length;

  return (
    <div className="quiz-layout">
      {/* ── Sub-header (Tầng 2) ── */}
      <div className="quiz-sub-header" role="banner" aria-label="Thông tin bài học">
        <div className="quiz-sub-header__inner">

          {/* Left: Breadcrumb + Tên bài */}
          <div className="quiz-sub-header__left">
            <div className="quiz-sub-header__breadcrumb" aria-label="Vị trí">
              <span
                className="quiz-sub-header__breadcrumb-link"
                onClick={() => setShowExitDialog(true)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === "Enter" && setShowExitDialog(true)}
              >
                Trang chủ
              </span>
              <span className="quiz-sub-header__breadcrumb-sep">›</span>
              <span className="quiz-sub-header__breadcrumb-current">
                {SKILL_EMOJI[quiz.skill] ?? "📝"}{" "}
                {SKILL_LABEL[quiz.skill] ?? quiz.skill.toUpperCase()}
              </span>
            </div>
            <h2 className="quiz-sub-header__title">{quiz.title}</h2>
          </div>

          {/* Center: Progress bubbles */}
          <div className="quiz-sub-header__progress" aria-label={`Câu ${currentQuestion + 1} trên ${totalQuestions}`}>
            <div className="quiz-progress-bubbles" role="list">
              {Array.from({ length: totalQuestions }, (_, i) => {
                const questionId = quiz.questions[i]?.id;
                const isAnswered = questionId ? questionId in answers : false;
                const isActive   = i === currentQuestion;

                return (
                  <div
                    key={i}
                    role="listitem"
                    aria-label={`Câu ${i + 1}${isAnswered ? " - đã trả lời" : ""}${isActive ? " - đang làm" : ""}`}
                    className={[
                      "quiz-progress-bubble",
                      isActive   ? "quiz-progress-bubble--active"   : "",
                      isAnswered ? "quiz-progress-bubble--answered" : "",
                    ].join(" ")}
                  />
                );
              })}
            </div>
            <span className="quiz-sub-header__count">
              {currentQuestion + 1} / {totalQuestions}
            </span>
          </div>

          {/* Right: Exit button */}
          <div className="quiz-sub-header__right">
            <button
              className="quiz-sub-header__exit-btn"
              id="btn-quiz-exit"
              onClick={() => setShowExitDialog(true)}
              aria-label="Thoát bài"
              title="Thoát bài"
            >
              ✕
            </button>
          </div>

        </div>
      </div>

      {/* ── Quiz Content ── */}
      <div className="quiz-layout__content">
        {children}
      </div>

      {/* ── Exit Confirmation Dialog ── */}
      {showExitDialog && (
        <ExitConfirmDialog
          onConfirm={() => navigate("/")}
          onCancel={() => setShowExitDialog(false)}
        />
      )}
    </div>
  );
}
