/**
 * QuizResultScreen.tsx — Màn hình kết quả sau khi nộp bài
 * Phase 4.5: thêm HangmanLauncher để ôn từ vựng
 */

import { useEffect, useState } from "react";
import type { QuizResult } from "../../types/quiz";
import type { VocabWord } from "../../types/vocabulary";
import { HangmanLauncher } from "../vocabulary/HangmanLauncher";
import { FlashcardLauncher } from "../vocabulary/FlashcardLauncher";
import "./Quiz.css";

interface QuizResultScreenProps {
  result: QuizResult;
  onReview: () => void;
  onHome: () => void;
  isLoggedIn: boolean;
  onLogin: () => void;
  // Phase 4.5 — Hangman
  vocabPendingWords?: VocabWord[];
  onVocabMarkCorrect?: (word: string) => void;
  onHangmanStarsEarned?: (stars: number) => void;
  // Phase 05 — Flashcard
  onFlashcardStarsEarned?: (stars: number) => void;
  /** Pathway quiz đang luyện: dùng để chọn group từ vựng phù hợp */
  quizPathway?: "cambridge" | "lop6";
}

export function QuizResultScreen({
  result,
  onReview,
  onHome,
  isLoggedIn,
  onLogin,
  vocabPendingWords = [],
  onVocabMarkCorrect,
  onHangmanStarsEarned,
  onFlashcardStarsEarned,
  quizPathway,
}: QuizResultScreenProps) {
  const [visibleStars, setVisibleStars] = useState(0);

  // Animation sao xuất hiện từng cái, delay 300ms
  useEffect(() => {
    if (visibleStars < result.starsEarned) {
      const timer = setTimeout(() => setVisibleStars((s) => s + 1), 300);
      return () => clearTimeout(timer);
    }
  }, [visibleStars, result.starsEarned]);

  const getMessage = () => {
    if (result.percentage >= 90) return "Xuất sắc! 🎉";
    if (result.percentage >= 80) return "Giỏi lắm! 😊";
    if (result.percentage >= 60) return "Cố gắng tốt! 💪";
    return "Cần luyện thêm nhé! 📚";
  };

  return (
    <div className="quiz-result">
      {/* Kết quả tổng quan */}
      <div className="quiz-result__card card">
        <h2 className="quiz-result__message">{getMessage()}</h2>

        {/* Sao animation */}
        <div className="quiz-result__stars" aria-label={`${result.starsEarned} sao`}>
          {Array.from({ length: 5 }).map((_, i) => (
            <span
              key={i}
              className={`quiz-result__star ${i < visibleStars ? "quiz-result__star--visible" : ""}`}
              style={{ animationDelay: `${i * 300}ms` }}
            >
              ⭐
            </span>
          ))}
        </div>

        {/* Điểm số */}
        <div className="quiz-result__score">
          <span className="quiz-result__score-num">{result.score}</span>
          <span className="quiz-result__score-sep">/</span>
          <span className="quiz-result__score-total">{result.maxScore}</span>
          <span className="quiz-result__score-pct">({result.percentage}%)</span>
        </div>

        {/* Thông báo lưu điểm */}
        {result.saved ? (
          <p className="quiz-result__saved">✅ Đã lưu +{result.starsEarned} ⭐ vào hồ sơ bé!</p>
        ) : (
          <div className="quiz-result__unsaved">
            <p>⚠️ Điểm chưa được lưu</p>
          </div>
        )}
      </div>

      {/* ── Game ôn từ vựng ──────────────────────────── */}
      {(onVocabMarkCorrect || onFlashcardStarsEarned) && (
        <div className="quiz-result__games">
          <div className="quiz-result__games-label">
            <span>🎮</span> Ôn luyện từ vựng
          </div>

          {/* Hangman */}
          {onVocabMarkCorrect && onHangmanStarsEarned && (
            <HangmanLauncher
              pendingWords={vocabPendingWords}
              isLoggedIn={isLoggedIn}
              onMarkCorrect={onVocabMarkCorrect}
              onStarsEarned={onHangmanStarsEarned}
              group={quizPathway === "lop6" ? "flyers" : "flyers"}
            />
          )}

          {/* Flashcard */}
          {onFlashcardStarsEarned && (
            <FlashcardLauncher
              pendingWords={vocabPendingWords}
              isLoggedIn={isLoggedIn}
              onStarsEarned={onFlashcardStarsEarned}
              group="flyers"
            />
          )}
        </div>
      )}

      {/* Banner mời đăng nhập (guest) */}
      {!isLoggedIn && (
        <div className="quiz-result__login-banner">
          <div>
            <strong>Đăng nhập để lưu điểm và theo dõi tiến độ!</strong>
            <p>Điểm số lần này sẽ không được lưu vì bạn chưa đăng nhập.</p>
          </div>
          <button className="btn btn-primary" id="btn-result-login" onClick={onLogin}>
            Đăng nhập ngay
          </button>
        </div>
      )}

      {/* Actions */}
      <div className="quiz-result__actions">
        <button className="btn btn-outline" id="btn-result-review" onClick={onReview}>
          Làm lại
        </button>
        <button className="btn btn-primary" id="btn-result-home" onClick={onHome}>
          Làm bài khác
        </button>
      </div>
    </div>
  );
}
