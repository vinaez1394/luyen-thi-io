/**
 * ReadingEngine.tsx — Engine chính cho dạng bài reading-passage
 *
 * Cấu trúc:
 *   ReadingEngine
 *   ├── ReadingSection × 2  (mỗi section có passage riêng + questions)
 *   │   ├── ReadingPassage (collapsible)
 *   │   └── ReadingQuestion × N
 *   └── StickyFooter (progress bar + Nộp bài)
 *
 * Phương án A: Mỗi section có passage panel riêng (2 panel thu gọn độc lập)
 *
 * Phase 04:
 *   - Guest → GameLoginCTA overlay sau khi nộp bài
 *   - Logged-in → POST /api/quiz/:id/submit để lưu điểm
 */

import { useState, useEffect, useCallback } from "react";
import type { ReadingQuiz, ReadingAnswers, ReadingResult } from "../../types/reading";
import type { WordTooltipProps } from "../vocabulary/WordTooltip";
import { ReadingSection } from "./ReadingSection";
import { GameLoginCTA } from "../vocabulary/GameLoginCTA";
import { useAuth } from "../../hooks/useAuth";
import "./ReadingEngine.css";

// ============================================
// Helper — tính điểm
// ============================================
function calculateResult(quiz: ReadingQuiz, answers: ReadingAnswers): ReadingResult {
  let correctCount = 0;
  const correctAnswers: Record<string, string> = {};

  for (const section of quiz.sections) {
    for (const q of section.questions) {
      correctAnswers[q.id] = q.correct;
      const userAns = (answers[q.id] ?? "").trim().toLowerCase();
      if (userAns === q.correct.trim().toLowerCase()) {
        correctCount++;
      }
    }
  }

  const totalQuestions = quiz.sections.reduce((sum, s) => sum + s.questions.length, 0);
  const percentage = Math.round((correctCount / totalQuestions) * 100);

  let starsEarned = 1;
  if (percentage >= 90) starsEarned = 5;
  else if (percentage >= 80) starsEarned = 3;
  else if (percentage >= 60) starsEarned = 2;

  return {
    quizId: quiz.id,
    totalQuestions,
    correctCount,
    percentage,
    starsEarned,
    saved: false,
    correctAnswers,
  };
}

// ============================================
// Props
// ============================================
interface ReadingEngineProps {
  quiz: ReadingQuiz;
  onComplete?: (result: ReadingResult) => void;
  vocabRemainingFree?: number;
  onVocabLookup?: WordTooltipProps["onLookup"];
  /** Callback để QuizPage biết số câu đã trả lời */
  onProgressChange?: (answered: number, total: number) => void;
  /** Tăng lên 1 mỗi khi QuizPage muốn trigger submit từ sub-header */
  submitTrigger?: number;
  /** URL để quay về trang môn học sau khi nộp bài */
  backUrl?: string;
  /** Callback khi user nhấn "Làm lại" — để QuizPage reset readingSubmitted */
  onRetry?: () => void;
}

// ============================================
// ReadingEngine — component chính
// ============================================
export function ReadingEngine({ quiz, onComplete, vocabRemainingFree = 3, onVocabLookup, onProgressChange, submitTrigger, backUrl, onRetry }: ReadingEngineProps) {
  const { isLoggedIn, loginWithGoogle } = useAuth();

  const [answers, setAnswers] = useState<ReadingAnswers>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [result, setResult] = useState<ReadingResult | null>(null);
  const [showLoginCTA, setShowLoginCTA] = useState(false);

  // Tổng số câu hỏi
  const totalQuestions = quiz.sections.reduce((sum, s) => sum + s.questions.length, 0);
  const answeredCount  = Object.keys(answers).filter(k => answers[k] !== "").length;
  const allAnswered    = answeredCount >= totalQuestions;
  const progressPct    = Math.round((answeredCount / totalQuestions) * 100);

  // Scroll to top khi mount
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [quiz.id]);

  // Báo QuizPage biết progress
  useEffect(() => {
    onProgressChange?.(answeredCount, totalQuestions);
  }, [answeredCount, totalQuestions, onProgressChange]);

  // Submit trigger từ sub-header bên ngoài
  useEffect(() => {
    if (submitTrigger && submitTrigger > 0) {
      handleSubmit();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [submitTrigger]);

  // Handler khi user trả lời 1 câu
  const handleAnswer = useCallback((questionId: string, answer: string) => {
    if (isSubmitted) return;
    setAnswers(prev => ({ ...prev, [questionId]: answer }));
  }, [isSubmitted]);

  // Nộp bài
  const handleSubmit = useCallback(async () => {
    if (!allAnswered || isSubmitted) return;

    const r = calculateResult(quiz, answers);
    setResult(r);
    setIsSubmitted(true);
    onComplete?.(r);
    window.scrollTo({ top: 0, behavior: "smooth" });

    // Logged-in → POST submit để lưu điểm
    if (isLoggedIn) {
      try {
        await fetch(`/api/quiz/${quiz.id}/submit`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            answers,
            timeSpent: 0, // ReadingEngine không track thời gian per câu
          }),
        });
      } catch {
        // Silent fail — kết quả vẫn hiển thị đúng inline
      }
    } else {
      // Guest → show GameLoginCTA sau 600ms (đợi kết quả render xong)
      setTimeout(() => setShowLoginCTA(true), 600);
    }
  }, [quiz, answers, allAnswered, isSubmitted, isLoggedIn, onComplete]);

  // Chơi lại
  const handleRetry = useCallback(() => {
    setAnswers({});
    setResult(null);
    setIsSubmitted(false);
    setShowLoginCTA(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
    onRetry?.(); // Thông báo QuizPage reset header
  }, [onRetry]);

  // Stars display
  const starsLabel = result ? "⭐".repeat(result.starsEarned) : "";

  return (
    <div className="re-engine">
      <div className="re-engine__body">

        {/* Hướng dẫn */}
        <div className="re-instructions">
          📖 {quiz.instructions_vi}
        </div>

        {/* Kết quả — hiện ở trên cùng sau khi nộp */}
        {isSubmitted && result && (
          <div className="re-result">
            <span className="re-result__stars">{starsLabel}</span>
            <div className="re-result__score">
              {result.correctCount}/{result.totalQuestions} correct
            </div>
            <div className="re-result__label">
              {result.percentage}% — {
                result.percentage >= 80 ? "Excellent! 🎉" :
                result.percentage >= 60 ? "Good job! 👍" :
                "Keep practising! 💪"
              }
            </div>

            {/* Navigation buttons */}
            <div className="re-result__actions">
              <button className="re-result__retry-btn" onClick={handleRetry}>
                🔄 Try Again
              </button>
              {backUrl && (
                <a href={backUrl} className="re-result__back-btn">
                  ← Back to lessons
                </a>
              )}
            </div>
          </div>
        )}

        {/* 2 Sections */}
        {quiz.sections.map(section => (
          <ReadingSection
            key={section.id}
            section={section}
            answers={answers}
            isSubmitted={isSubmitted}
            correctAnswers={result?.correctAnswers}
            onAnswer={handleAnswer}
            vocabRemainingFree={vocabRemainingFree}
            onVocabLookup={onVocabLookup}
          />
        ))}
      </div>

      {/* Sticky Footer — ẨN khi có sub-header từ QuizPage (chỉ hiện nếu không có sub-header) */}
      {/* Footer chỉ dự phòng khi ReadingEngine render standalone (không qua QuizPage wrapper) */}
      {!isSubmitted && !onProgressChange && (
        <div className="re-footer">
          <div className="re-footer__progress-text">
            Answered {answeredCount}/{totalQuestions}
          </div>
          <div className="re-footer__progress-bar">
            <div
              className="re-footer__progress-fill"
              style={{ width: `${progressPct}%` }}
            />
          </div>
          <button
            className="re-footer__submit-btn"
            onClick={handleSubmit}
            disabled={!allAnswered}
            id="btn-reading-submit"
            title={!allAnswered ? "Please answer all questions first" : ""}
          >
            Submit ✓
          </button>
        </div>
      )}

      {/* Guest CTA Modal — hiện sau khi nộp bài */}
      {showLoginCTA && result && (
        <GameLoginCTA
          correctCount={result.correctCount}
          totalCount={result.totalQuestions}
          starsEarned={result.starsEarned}
          showStars={true}
          scoreLabel="correct"
          onLogin={loginWithGoogle}
          onPlayAgain={() => {
            setShowLoginCTA(false);
            handleRetry();
          }}
        />
      )}
    </div>
  );
}
