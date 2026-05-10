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
import { ReadingEngine } from "../components/quiz/ReadingEngine";
import { WritingEngine } from "../components/quiz/WritingEngine";
import { FlyersPart1Engine } from "../components/quiz/FlyersPart1Engine";
import { FlyersPart2Engine } from "../components/quiz/FlyersPart2Engine";
import { QuizResultScreen } from "../components/quiz/QuizResultScreen";
import { QuizLayout } from "../components/layout/QuizLayout";
import { getPathwayFromPathname, getPathwayUrl } from "../utils/urlHelpers";
import "../components/quiz/Quiz.css";
import "../components/layout/QuizLayout.css";
import type { ReadingQuiz } from "../types/reading";
import type { WritingQuiz } from "../types/writing";
import type { FlyersPart1Quiz } from "../components/quiz/FlyersPart1Engine";
import type { FlyersPart2Quiz } from "../components/quiz/FlyersPart2Engine";

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
  const quizId = rawSlug.toUpperCase().replace(/-/g, "-");

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
  const [reviewDismissed, setReviewDismissed] = useState(false);
  // Reading Engine: progress + submit trigger
  const [readingProgress, setReadingProgress] = useState({ answered: 0, total: 0 });
  const [readingSubmitTrigger, setReadingSubmitTrigger] = useState(0);
  const [readingSubmitted, setReadingSubmitted] = useState(false);
  // Writing Engine: progress + submit trigger (same pattern as Reading)
  const [writingProgress, setWritingProgress] = useState({ answered: 0, total: 0 });
  const [writingSubmitTrigger, setWritingSubmitTrigger] = useState(0);
  const [writingSubmitted, setWritingSubmitted] = useState(false);

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
        <p>Đăng ký tài khoản để mở khóa bài học này và lưu tiến độ của bé.</p>
        <button className="btn btn-primary" id="btn-paywall-login" onClick={() => navigate("/register")}>
          Đăng ký ngay
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

  // ===== Notification: "Ôn tập lại" — bé làm bài dưới grade của mình =====
  const studentGrade = parseInt(localStorage.getItem("student_grade") ?? "0", 10) || null;
  const quizGradeMax = (quiz as { grade_max?: number }).grade_max ?? null;
  const isReviewMode = !!(studentGrade && quizGradeMax && quizGradeMax < studentGrade);

  if (isReviewMode && !reviewDismissed) {
    return (
      <div className="qp-review-notice" role="dialog" aria-label="Thông báo ôn tập">
        <div className="qp-review-notice__icon">📚</div>
        <h2 className="qp-review-notice__title">Bé đang ôn tập lại!</h2>
        <p className="qp-review-notice__desc">
          Bài này dành cho <strong>Lớp {quizGradeMax}</strong>,
          nhưng bé đang học <strong>Lớp {studentGrade}</strong>.
          <br />
          Ôn lại kiến thức cũ rất tốt! 💪
        </p>
        <div className="qp-review-notice__actions">
          <button
            id="btn-review-start"
            className="btn btn-primary"
            onClick={() => setReviewDismissed(true)}
          >
            Bắt đầu ôn tập →
          </button>
          <button
            className="btn btn-ghost"
            onClick={() => navigate(backUrl)}
          >
            ← Chọn bài khác
          </button>
        </div>
      </div>
    );
  }

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
              credentials: "include",   // ← bắt buộc: gửi cookie session
              body: JSON.stringify({
                stars: earnedStars,
                source: "hangman",
                quiz_id: quizId,
              }),
            })
              .then((r) => { if (r.ok) window.dispatchEvent(new Event("stars:updated")); })
              .catch(() => { });
          }
        }}
        // Phase 05: Flashcard — cộng sao thật
        onFlashcardStarsEarned={(earnedStars) => {
          if (earnedStars > 0) {
            fetch("/api/student/stars", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              credentials: "include",   // ← bắt buộc: gửi cookie session
              body: JSON.stringify({
                stars: earnedStars,
                source: "flashcard",
                quiz_id: quizId,
              }),
            })
              .then((r) => { if (r.ok) window.dispatchEvent(new Event("stars:updated")); })
              .catch(() => { });
          }
        }}
      />
    );
  }

  // ===== Reading Passage — bọc trong sub-header riêng =====
  if ((quiz as unknown as ReadingQuiz).type === "reading-passage") {
    const rQuiz = quiz as unknown as ReadingQuiz;
    const allReadingAnswered = readingProgress.total > 0 &&
      readingProgress.answered >= readingProgress.total;

    return (
      <div className="quiz-layout">

        {/* ── Reading Sub-Header — ẩn sau khi nộp bài ── */}
        {!readingSubmitted && (
          <div className="quiz-sub-header" role="banner" aria-label="Thông tin bài đọc">
            <div className="quiz-sub-header__inner">

              {/* Left: Breadcrumb + Title */}
              <div className="quiz-sub-header__left">
                <div className="quiz-sub-header__breadcrumb">
                  <span
                    className="quiz-sub-header__breadcrumb-link"
                    onClick={() => navigate(backUrl)}
                    role="button" tabIndex={0}
                    onKeyDown={e => e.key === "Enter" && navigate(backUrl)}
                  >
                    🏠 Trang chủ
                  </span>
                  <span className="quiz-sub-header__breadcrumb-sep">›</span>
                  <span className="quiz-sub-header__breadcrumb-current">
                    📚 Reading
                  </span>
                </div>
                <h2 className="quiz-sub-header__title">{rQuiz.title}</h2>
              </div>

              {/* Center: Progress + Submit */}
              <div className="re-subheader-center">
                <span className="re-subheader-center__count">
                  {readingProgress.answered}/{readingProgress.total || rQuiz.sections.reduce((s, sec) => s + sec.questions.length, 0)}
                </span>
                <button
                  id="btn-reading-submit-header"
                  className="re-subheader-center__submit-btn"
                  onClick={() => setReadingSubmitTrigger(t => t + 1)}
                  disabled={!allReadingAnswered}
                  title={!allReadingAnswered ? "Hãy trả lời hết câu hỏi trước" : "Nộp bài"}
                >
                  Nộp bài ✓
                </button>
              </div>

              {/* Right: Exit */}
              <div className="quiz-sub-header__right">
                <button
                  className="quiz-sub-header__exit-btn"
                  onClick={() => navigate(backUrl)}
                  aria-label="Thoát bài"
                  title="Thoát bài"
                >
                  ✕
                </button>
              </div>

            </div>
          </div>
        )}

        {/* ── Reading Content ── */}
        <div className="quiz-layout__content">
          <ReadingEngine
            quiz={rQuiz}
            onComplete={() => {
              localStorage.setItem("last_quiz_id", quizId);
              setReadingSubmitted(true);
            }}
            onProgressChange={(answered, total) =>
              setReadingProgress({ answered, total })
            }
            submitTrigger={readingSubmitTrigger}
            backUrl={backUrl}
            onRetry={() => setReadingSubmitted(false)}
          />
        </div>
      </div>
    );
  }

  // ===== Writing — bọc trong sub-header giống Reading =====
  if ((quiz as unknown as WritingQuiz).type === "writing") {
    const wQuiz = quiz as unknown as WritingQuiz;
    const allWritingAnswered = writingProgress.total > 0 &&
      writingProgress.answered >= writingProgress.total;

    return (
      <div className="quiz-layout">

        {/* ── Writing Sub-Header — ẩn sau khi nộp bài ── */}
        {!writingSubmitted && (
          <div className="quiz-sub-header" role="banner" aria-label="Thông tin bài viết">
            <div className="quiz-sub-header__inner">

              {/* Left: Breadcrumb + Title */}
              <div className="quiz-sub-header__left">
                <div className="quiz-sub-header__breadcrumb">
                  <span
                    className="quiz-sub-header__breadcrumb-link"
                    onClick={() => navigate(backUrl)}
                    role="button" tabIndex={0}
                    onKeyDown={e => e.key === "Enter" && navigate(backUrl)}
                  >
                    🏠 Trang chủ
                  </span>
                  <span className="quiz-sub-header__breadcrumb-sep">›</span>
                  <span className="quiz-sub-header__breadcrumb-current">
                    ✏️ Writing
                  </span>
                </div>
                <h2 className="quiz-sub-header__title">{wQuiz.title}</h2>
              </div>

              {/* Center: Progress + Submit */}
              <div className="re-subheader-center">
                <span className="re-subheader-center__count">
                  {writingProgress.answered}/{writingProgress.total || wQuiz.sections.reduce((s, sec) => s + sec.questions.length, 0)}
                </span>
                <button
                  id="btn-writing-submit-header"
                  className="re-subheader-center__submit-btn"
                  onClick={() => setWritingSubmitTrigger(t => t + 1)}
                  disabled={!allWritingAnswered}
                  title={!allWritingAnswered ? "Hãy trả lời hết câu hỏi trước" : "Nộp bài"}
                >
                  Nộp bài ✓
                </button>
              </div>

              {/* Right: Exit */}
              <div className="quiz-sub-header__right">
                <button
                  className="quiz-sub-header__exit-btn"
                  onClick={() => navigate(backUrl)}
                  aria-label="Thoát bài"
                  title="Thoát bài"
                >
                  ✕
                </button>
              </div>

            </div>
          </div>
        )}

        {/* ── Writing Content ── */}
        <div className="quiz-layout__content">
          <WritingEngine
            quiz={wQuiz}
            onComplete={() => {
              localStorage.setItem("last_quiz_id", quizId);
              setWritingSubmitted(true);
            }}
            onProgressChange={(answered, total) =>
              setWritingProgress({ answered, total })
            }
            submitTrigger={writingSubmitTrigger}
            backUrl={backUrl}
            onRetry={() => setWritingSubmitted(false)}
            vocabRemainingFree={vocab.remainingFree}
            onVocabLookup={vocab.lookupWord}
          />
        </div>
      </div>
    );
  }

  // ===== Flyers Part 1 — Word Bank Click Engine =====
  if ((quiz as unknown as FlyersPart1Quiz).type === "flyers-part1") {
    const fp1Quiz = quiz as unknown as FlyersPart1Quiz;
    return (
      <div className="quiz-layout">
        {/* Sub-header */}
        <div className="quiz-sub-header" role="banner" aria-label="Flyers Part 1">
          <div className="quiz-sub-header__inner">
            <div className="quiz-sub-header__left">
              <div className="quiz-sub-header__breadcrumb">
                <span
                  className="quiz-sub-header__breadcrumb-link"
                  onClick={() => navigate(backUrl)}
                  role="button" tabIndex={0}
                  onKeyDown={e => e.key === "Enter" && navigate(backUrl)}
                >
                  🏠 Trang chủ
                </span>
                <span className="quiz-sub-header__breadcrumb-sep">›</span>
                <span className="quiz-sub-header__breadcrumb-current">
                  📖 Flyers Reading & Writing
                </span>
              </div>
              <h2 className="quiz-sub-header__title">{fp1Quiz.title}</h2>
            </div>
            <div className="quiz-sub-header__right">
              <button
                className="quiz-sub-header__exit-btn"
                onClick={() => navigate(backUrl)}
                aria-label="Thoát bài"
                title="Thoát bài"
              >
                ✕
              </button>
            </div>
          </div>
        </div>

        {/* Engine */}
        <div className="quiz-layout__content" style={{ paddingTop: "var(--space-4, 1rem)" }}>
          <FlyersPart1Engine
            quiz={fp1Quiz}
            onSubmitResult={(_res) => {
              localStorage.setItem("last_quiz_id", quizId);
            }}
          />
        </div>
      </div>
    );
  }

  // ===== Flyers Part 2 — Conversation Matching Engine =====
  if ((quiz as unknown as FlyersPart2Quiz).type === "flyers-part2") {
    const fp2Quiz = quiz as unknown as FlyersPart2Quiz;
    return (
      <div className="quiz-layout">
        {/* Sub-header */}
        <div className="quiz-sub-header" role="banner" aria-label="Flyers Part 2">
          <div className="quiz-sub-header__inner">
            <div className="quiz-sub-header__left">
              <div className="quiz-sub-header__breadcrumb">
                <span
                  className="quiz-sub-header__breadcrumb-link"
                  onClick={() => navigate(backUrl)}
                  role="button" tabIndex={0}
                  onKeyDown={e => e.key === "Enter" && navigate(backUrl)}
                >
                  🏠 Trang chủ
                </span>
                <span className="quiz-sub-header__breadcrumb-sep">›</span>
                <span className="quiz-sub-header__breadcrumb-current">
                  📖 Flyers Reading & Writing
                </span>
              </div>
              <h2 className="quiz-sub-header__title">{fp2Quiz.title}</h2>
            </div>
            <div className="quiz-sub-header__right">
              <button
                className="quiz-sub-header__exit-btn"
                onClick={() => navigate(backUrl)}
                aria-label="Thoát bài"
                title="Thoát bài"
              >
                ✕
              </button>
            </div>
          </div>
        </div>

        {/* Engine */}
        <div className="quiz-layout__content" style={{ paddingTop: "var(--space-4, 1rem)" }}>
          <FlyersPart2Engine
            quiz={fp2Quiz}
            onSubmitResult={(_res) => {
              localStorage.setItem("last_quiz_id", quizId);
            }}
          />
        </div>
      </div>
    );
  }

  // ===== Quiz thường (với QuizLayout) =====
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
        onJumpTo={(i) => setCurrentQuestion(i)}
        allAnswered={allAnswered}
        // Phase 4.5: vocab props
        vocabRemainingFree={vocab.remainingFree}
        onVocabLookup={vocab.lookupWord}
      />
    </QuizLayout>
  );
}
