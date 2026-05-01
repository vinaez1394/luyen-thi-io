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

import { useState, useCallback } from "react";
import type { ReadingQuiz, ReadingAnswers, ReadingResult } from "../../types/reading";
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
  /** Gọi khi user nộp bài xong */
  onComplete?: (result: ReadingResult) => void;
}

// ============================================
// ReadingEngine — component chính
// ============================================
export function ReadingEngine({ quiz, onComplete }: ReadingEngineProps) {
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
  }, []);

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
              {result.correctCount}/{result.totalQuestions} câu đúng
            </div>
            <div className="re-result__label">
              {result.percentage}% — {
                result.percentage >= 80 ? "Xuất sắc! 🎉" :
                result.percentage >= 60 ? "Khá tốt! 👍" :
                "Cố gắng hơn nhé! 💪"
              }
            </div>
            <button className="re-result__retry-btn" onClick={handleRetry}>
              🔄 Làm lại
            </button>
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
          />
        ))}
      </div>

      {/* Sticky Footer — Progress + Nộp bài */}
      {!isSubmitted && (
        <div className="re-footer">
          <div className="re-footer__progress-text">
            Đã trả lời {answeredCount}/{totalQuestions} câu
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
            title={!allAnswered ? "Vui lòng trả lời tất cả câu hỏi" : ""}
          >
            Nộp bài ✓
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
          scoreLabel="câu đúng"
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
