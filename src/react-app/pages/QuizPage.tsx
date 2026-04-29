/**
 * QuizPage.tsx — Page wrapper cho Quiz
 * Xử lý: load quiz, navigate câu hỏi, submit, kết quả
 * Hỗ trợ: guest (không login), freemium paywall
 *
 * Phase 4.5: useVocabulary được khởi tạo ở đây và truyền xuống
 *
 * Layout:
 *   AppLayout (global, từ App.tsx)
 *   └── QuizLayout (quiz-specific: sub-header, progress bubbles, exit)
 *       └── QuizEngine (nội dung câu hỏi + prev/next)
 */

import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuiz } from "../hooks/useQuiz";
import { useAuth } from "../hooks/useAuth";
import { useVocabulary } from "../hooks/useVocabulary";
import { QuizEngine } from "../components/quiz/QuizEngine";
import { QuizResultScreen } from "../components/quiz/QuizResultScreen";
import { QuizLayout } from "../components/layout/QuizLayout";
import "../components/quiz/Quiz.css";

export function QuizPage() {
  // Ho tro 2 kieu URL:
  //   /quiz/:id           <- URL cu (backward-compat)
  //   /:subject/:quizId   <- URL moi (VD: /toan-tu-duy/math-l1-p1)
  const { id, quizId: quizSlug } = useParams<{
    id?: string;
    subject?: string;
    quizId?: string;
  }>();

  // Chuyen slug thanh ID goc: math-l1-p1 -> MATH-L1-P1
  const quizId = (id ?? quizSlug ?? "").toUpperCase().replace(/-/g, "-");
  const navigate = useNavigate();
  const { isLoggedIn, loginWithGoogle } = useAuth();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const {
    quiz, state, error, isPremium,
    answers, result, allAnswered,
    loadQuiz, handleAnswer, submitQuiz,
  } = useQuiz(quizId);

  // Phase 4.5: Vocabulary system
  const vocab = useVocabulary({
    quizId,
    isLoggedIn,
  });

  useEffect(() => {
    loadQuiz();
  }, [loadQuiz]);

  const handleSubmit = async () => {
    await submitQuiz();
    setShowResult(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleNext = () => {
    if (quiz && currentQuestion < quiz.questions.length - 1) {
      setCurrentQuestion((q) => q + 1);
    }
  };

  const handlePrev = () => {
    if (currentQuestion > 0) setCurrentQuestion((q) => q - 1);
  };

  // ===== Loading =====
  if (state === "loading") {
    return (
      <div className="quiz-page-loading">
        <div className="quiz-page-loading__spinner" />
        <p>Đang tải bài học...</p>
      </div>
    );
  }

  // ===== Premium Paywall =====
  if (isPremium) {
    return (
      <div className="quiz-page-premium">
        <div style={{ fontSize: 64 }}>🔒</div>
        <h2>Bài học Premium</h2>
        <p>Đăng nhập để mở khóa bài học này và lưu tiến độ của bé.</p>
        <button className="btn btn-primary" id="btn-paywall-login" onClick={loginWithGoogle}>
          Đăng nhập bằng Google
        </button>
        <button className="btn btn-outline" onClick={() => navigate("/")}>
          ← Xem bài miễn phí
        </button>
      </div>
    );
  }

  // ===== Error =====
  if (state === "error" && !isPremium) {
    return (
      <div className="quiz-page-error">
        <div style={{ fontSize: 64 }}>😕</div>
        <h2>Không tải được bài học</h2>
        <p>{error ?? "Có lỗi xảy ra. Vui lòng thử lại."}</p>
        <button className="btn btn-primary" onClick={loadQuiz}>Thử lại</button>
        <button className="btn btn-outline" onClick={() => navigate("/")}>← Trang chủ</button>
      </div>
    );
  }

  if (!quiz) return null;

  // ===== Kết quả =====
  if (showResult && result) {
    return (
      <QuizResultScreen
        result={result}
        isLoggedIn={isLoggedIn}
        onLogin={loginWithGoogle}
        onReview={() => setShowResult(false)}
        onHome={() => navigate("/")}
        // Phase 4.5: truyền vocab xuống để hiện Hangman
        vocabPendingWords={vocab.getPendingWords()}
        onVocabMarkCorrect={vocab.markWordCorrect}
        onHangmanStarsEarned={(_stars) => {
          // Phase 07: sẽ gọi API cộng sao vào DB
          // Hiện tại chỉ log
          console.log(`[Phase 4.5] Hangman: +${_stars} ⭐`);
        }}
      />
    );
  }

  // ===== Quiz (với QuizLayout) =====
  return (
    <QuizLayout
      quiz={quiz}
      currentQuestion={currentQuestion}
      answers={answers}
    >
      <QuizEngine
        quiz={quiz}
        answers={answers}
        result={result}
        isSubmitted={state === "submitted" && !showResult}
        currentQuestion={currentQuestion}
        onAnswer={handleAnswer}
        onNext={handleNext}
        onPrev={handlePrev}
        onSubmit={handleSubmit}
        allAnswered={allAnswered}
        // Phase 4.5: vocab props
        vocabRemainingFree={vocab.remainingFree}
        onVocabLookup={vocab.lookupWord}
      />
    </QuizLayout>
  );
}
