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
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useQuiz } from "../hooks/useQuiz";
import { useAuth } from "../hooks/useAuth";
import { useVocabulary } from "../hooks/useVocabulary";
import { QuizEngine } from "../components/quiz/QuizEngine";
import { QuizResultScreen } from "../components/quiz/QuizResultScreen";
import { QuizLayout } from "../components/layout/QuizLayout";
import { getPathwayFromPathname, getPathwayUrl } from "../utils/urlHelpers";
import "../components/quiz/Quiz.css";

export function QuizPage() {
  const location = useLocation();

  // Hỗ trợ 2 kiểu URL:
  //   /quiz/:id                       ← URL cũ (internal tool)
  //   /:pathway/:subjectSlug/:quizId  ← URL mới (VD: /lop6/toan/math-l1-p1)
  const { id, subjectSlug, quizId: quizSlug } = useParams<{
    id?: string;
    subjectSlug?: string;
    quizId?: string;
  }>();

  // Slug → ID: math-l1-p1 → MATH-L1-P1
  const rawSlug = id ?? quizSlug ?? "";
  const quizId  = rawSlug.toUpperCase().replace(/-/g, "-");

  // Xác định pathway để navigate "về" đúng chỗ
  const pathway = getPathwayFromPathname(location.pathname);
  const backUrl = pathway && subjectSlug
    ? `${getPathwayUrl(pathway)}/${subjectSlug}`
    : "/";

  // Xác định quizPathway để truyền cho game từ vựng
  const quizPathway = (pathway === "lop6" ? "lop6" : "cambridge") as "cambridge" | "lop6";

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
    // Phase 05: lưu quiz_id để HomeHangman dùng từ vựng bài vừa làm
    localStorage.setItem("last_quiz_id", quizId);
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
        <button className="btn btn-outline" onClick={() => navigate(backUrl)}>
          ← Về danh sách bài
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
        <button className="btn btn-outline" onClick={() => navigate(backUrl)}>← Danh sách bài</button>
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
        onHome={() => navigate(backUrl)}
        quizPathway={quizPathway}
        // Phase 4.5: vocab props
        vocabPendingWords={vocab.getPendingWords()}
        onVocabMarkCorrect={vocab.markWordCorrect}
        // Phase 05: Hangman — cộng sao thật
        onHangmanStarsEarned={(earnedStars) => {
          if (earnedStars > 0) {
            fetch("/api/student/stars", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                stars:   earnedStars,
                source:  "hangman",
                quiz_id: quizId,
              }),
            }).catch(() => {});
          }
        }}
        // Phase 05: Flashcard — cộng sao thật
        onFlashcardStarsEarned={(earnedStars) => {
          if (earnedStars > 0) {
            fetch("/api/student/stars", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                stars:   earnedStars,
                source:  "flashcard",
                quiz_id: quizId,
              }),
            }).catch(() => {});
          }
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
