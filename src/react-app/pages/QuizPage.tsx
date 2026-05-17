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

import { useEffect, useState, Suspense, lazy } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useQuiz } from "../hooks/useQuiz";
import { useAuth } from "../hooks/useAuth";
import { useVocabulary } from "../hooks/useVocabulary";
import { QuizEngine } from "../components/quiz/QuizEngine";
import { ReadingEngine } from "../components/quiz/ReadingEngine";
import { WritingEngine } from "../components/quiz/WritingEngine";
// ── Lazy-loaded engines — mỗi engine là 1 JS chunk riêng (code splitting) ──
// User chỉ tải engine của bài đang làm, không phải tất cả 9 engine cùng lúc.
const FlyersPart1Engine = lazy(() =>
  import("../components/quiz/FlyersPart1Engine").then((m) => ({ default: m.FlyersPart1Engine }))
);
const FlyersPart2Engine = lazy(() =>
  import("../components/quiz/FlyersPart2Engine").then((m) => ({ default: m.FlyersPart2Engine }))
);
const FlyersPart3Engine = lazy(() =>
  import("../components/quiz/FlyersPart3Engine").then((m) => ({ default: m.FlyersPart3Engine }))
);
const FlyersPart4Engine = lazy(() =>
  import("../components/quiz/FlyersPart4Engine").then((m) => ({ default: m.FlyersPart4Engine }))
);
const FlyersPart5Engine = lazy(() =>
  import("../components/quiz/FlyersPart5Engine").then((m) => ({ default: m.FlyersPart5Engine }))
);
const FlyersPart6Engine = lazy(() =>
  import("../components/quiz/FlyersPart6Engine").then((m) => ({ default: m.FlyersPart6Engine }))
);
const FlyersPart7Engine = lazy(() =>
  import("../components/quiz/FlyersPart7Engine").then((m) => ({ default: m.FlyersPart7Engine }))
);
const FlyersListeningPart1Engine = lazy(() =>
  import("../components/quiz/FlyersListeningPart1Engine").then((m) => ({ default: m.FlyersListeningPart1Engine }))
);
import { QuizResultScreen } from "../components/quiz/QuizResultScreen";
import { QuizLayout } from "../components/layout/QuizLayout";
import { getPathwayFromPathname, getPathwayUrl } from "../utils/urlHelpers";
import "../components/quiz/Quiz.css";
import "../components/layout/QuizLayout.css";
import type { ReadingQuiz } from "../types/reading";
import type { WritingQuiz } from "../types/writing";
import type { FlyersPart1Quiz } from "../components/quiz/FlyersPart1Engine";
import type { FlyersPart2Quiz } from "../components/quiz/FlyersPart2Engine";
import type { FlyersPart3Quiz } from "../components/quiz/FlyersPart3Engine";
import type { FlyersPart4Quiz } from "../components/quiz/FlyersPart4Engine";
import type { FlyersPart5Quiz } from "../components/quiz/FlyersPart5Engine";
import type { FlyersPart6Quiz } from "../components/quiz/FlyersPart6Engine";
import type { FlyersPart7Quiz } from "../components/quiz/FlyersPart7Engine";
import type { FlyersListeningP1Quiz } from "../components/quiz/FlyersListeningPart1Engine";

/** Fallback hiển thị khi lazy engine đang tải */
const ENGINE_FALLBACK = (
  <div className="quiz-page-loading">
    <div className="quiz-page-loading__spinner" />
    <p>Đang tải bài tập...</p>
  </div>
);

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
  // Flyers Engines: result state (sau khi submit + save lên API)
  const [flyersResult, setFlyersResult] = useState<import("../types/quiz").QuizResult | null>(null);
  const [flyersShowResult, setFlyersShowResult] = useState(false);
  // Pending result: lưu tạm sau khi engine submit (trước khi user bấm Finish)
  const [flyersPendingResult, setFlyersPendingResult] = useState<{
    answersForApi: Record<string, string>;
    startTime: number;
    score: number;
    maxScore: number;
    percentage: number;
    starsEarned: number;
  } | null>(null);

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

  /**
   * saveFlyersScore — gọi API /api/quiz/:id/submit với answers từ Flyers Engine,
   * lưu điểm, cộng sao/streak vào DB, rồi hiển QuizResultScreen.
   * @param placedAnswers  - answers từ engine (key = questionId, value = answer string)
   * @param startTime      - Date.now() lúc bắt đầu làm bài
   * @param localResult    - điểm tính cục bộ từ engine (fallback nếu API lỗi)
   */
  const saveFlyersScore = async (
    placedAnswers: Record<string, string>,
    startTime: number,
    localResult?: { score: number; maxScore: number; percentage: number; starsEarned: number }
  ) => {
    const timeSpent = Math.round((Date.now() - startTime) / 1000);
    try {
      const res = await fetch(`/api/quiz/${quizId}/submit`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ answers: placedAnswers, timeSpent }),
      });
      if (res.ok) {
        const data = await res.json() as import("../types/quiz").QuizResult;
        localStorage.setItem("last_quiz_id", quizId);
        setFlyersResult(data);
        setFlyersShowResult(true);
        window.dispatchEvent(new Event("stars:updated"));
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        const errText = await res.text().catch(() => "unknown");
        console.error(`[saveFlyersScore] API error ${res.status}:`, errText);
        // Fallback: dùng kết quả cục bộ từ engine
        if (localResult) {
          setFlyersResult({
            ok: true,
            saved: false,
            quizId,
            score: localResult.score,
            maxScore: localResult.maxScore,
            percentage: localResult.percentage,
            starsEarned: localResult.starsEarned,
            correctAnswers: {},
          } as import("../types/quiz").QuizResult);
          setFlyersShowResult(true);
          window.scrollTo({ top: 0, behavior: "smooth" });
        }
      }
    } catch (err) {
      console.error("[saveFlyersScore] Network error:", err);
      // Fallback: dùng kết quả cục bộ từ engine
      if (localResult) {
        setFlyersResult({
          ok: true,
          saved: false,
          quizId,
          score: localResult.score,
          maxScore: localResult.maxScore,
          percentage: localResult.percentage,
          starsEarned: localResult.starsEarned,
          correctAnswers: {},
        } as import("../types/quiz").QuizResult);
        setFlyersShowResult(true);
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    }
  };

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

  // ===== Flyers: Kết quả screen (dùng chung cho Part 1 và Part 2) =====
  if (flyersShowResult && flyersResult) {
    return (
      <QuizResultScreen
        result={flyersResult}
        isLoggedIn={isLoggedIn}
        onLogin={loginWithGoogle}
        onReview={() => setFlyersShowResult(false)}
        onHome={() => navigate(backUrl)}
        quizPathway={quizPathway}
        vocabPendingWords={vocab.getPendingWords()}
        onVocabMarkCorrect={vocab.markWordCorrect}
        onHangmanStarsEarned={(stars) => {
          if (stars > 0) fetch("/api/student/stars", { method: "POST", headers: { "Content-Type": "application/json" }, credentials: "include", body: JSON.stringify({ stars, source: "hangman", quiz_id: quizId }) }).then(r => { if (r.ok) window.dispatchEvent(new Event("stars:updated")); }).catch(() => {});
        }}
        onFlashcardStarsEarned={(stars) => {
          if (stars > 0) fetch("/api/student/stars", { method: "POST", headers: { "Content-Type": "application/json" }, credentials: "include", body: JSON.stringify({ stars, source: "flashcard", quiz_id: quizId }) }).then(r => { if (r.ok) window.dispatchEvent(new Event("stars:updated")); }).catch(() => {});
        }}
      />
    );
  }

  // ===== Flyers Listening Part 1 — Click-to-Connect Line Engine =====
  if ((quiz as unknown as FlyersListeningP1Quiz).type === "flyers-listening-p1") {
    const lp1Quiz = quiz as unknown as FlyersListeningP1Quiz;
    return (
      <div className="quiz-layout">
        {/* Sub-header */}
        <div className="quiz-sub-header" role="banner" aria-label="Flyers Listening Part 1">
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
                  🎧 Flyers Listening
                </span>
              </div>
              <h2 className="quiz-sub-header__title">{lp1Quiz.title}</h2>
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
          <Suspense fallback={ENGINE_FALLBACK}>
            <FlyersListeningPart1Engine
              quiz={lp1Quiz}
              isLoggedIn={isLoggedIn}
              onSubmitResult={(res) => {
                setFlyersPendingResult({
                  answersForApi: res.answersForApi,
                  startTime: res.startTime,
                  score: res.score,
                  maxScore: res.maxScore,
                  percentage: res.percentage,
                  starsEarned: res.starsEarned,
                });
              }}
              onFinish={() => {
                if (flyersPendingResult) {
                  saveFlyersScore(
                    flyersPendingResult.answersForApi,
                    flyersPendingResult.startTime,
                    flyersPendingResult
                  );
                }
              }}
              onBack={() => navigate(backUrl)}
            />
          </Suspense>
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
                  📖 Flyers Reading &amp; Writing
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
          <Suspense fallback={ENGINE_FALLBACK}>
            <FlyersPart1Engine
              quiz={fp1Quiz}
              isLoggedIn={isLoggedIn}
              onSubmitResult={(res) => {
                // Ghi nhớ kết quả, đợi user bấm "Finish"
                setFlyersPendingResult({
                  answersForApi: res.answersForApi,
                  startTime: res.startTime,
                  score: res.score,
                  maxScore: res.maxScore,
                  percentage: res.percentage,
                  starsEarned: res.starsEarned,
                });
              }}
              onFinish={() => {
                // User bấm Finish → save lên API → hiện QuizResultScreen
                if (flyersPendingResult) {
                  saveFlyersScore(
                    flyersPendingResult.answersForApi,
                    flyersPendingResult.startTime,
                    flyersPendingResult
                  );
                }
              }}
              onBack={() => navigate(backUrl)}
            />
          </Suspense>
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
                  📖 Flyers Reading &amp; Writing
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
            isLoggedIn={isLoggedIn}
            onSubmitResult={(res) => {
              // Ghi nhớ kết quả, đợi user bấm "Finish"
              setFlyersPendingResult({
                answersForApi: res.answersForApi,
                startTime: res.startTime,
                score: res.score,
                maxScore: res.maxScore,
                percentage: res.percentage,
                starsEarned: res.starsEarned,
              });
            }}
            onFinish={() => {
              // User bấm Finish → save lên API → hiện QuizResultScreen
              if (flyersPendingResult) {
                saveFlyersScore(
                  flyersPendingResult.answersForApi,
                  flyersPendingResult.startTime,
                  flyersPendingResult
                );
              }
            }}
            onBack={() => navigate(backUrl)}
          />
        </div>
      </div>
    );
  }

  // ===== Flyers Part 3 — Story Fill-in-Blank + Title MCQ =====
  if ((quiz as unknown as FlyersPart3Quiz).type === "flyers-part3") {
    const fp3Quiz = quiz as unknown as FlyersPart3Quiz;
    return (
      <div className="quiz-layout">
        {/* Sub-header */}
        <div className="quiz-sub-header" role="banner" aria-label="Flyers Part 3">
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
                  📖 Flyers Reading &amp; Writing
                </span>
              </div>
              <h2 className="quiz-sub-header__title">{fp3Quiz.title}</h2>
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
          <Suspense fallback={ENGINE_FALLBACK}>
            <FlyersPart3Engine
              quiz={fp3Quiz}
              isLoggedIn={isLoggedIn}
              onSubmitResult={(res) => {
                setFlyersPendingResult({
                  answersForApi: res.answersForApi,
                  startTime: res.startTime,
                  score: res.score,
                  maxScore: res.maxScore,
                  percentage: res.percentage,
                  starsEarned: res.starsEarned,
                });
              }}
              onFinish={() => {
                if (flyersPendingResult) {
                  saveFlyersScore(
                    flyersPendingResult.answersForApi,
                    flyersPendingResult.startTime,
                    flyersPendingResult
                  );
                }
              }}
              onBack={() => navigate(backUrl)}
            />
          </Suspense>
        </div>
      </div>
    );
  }

  // ===== Flyers Part 4 — Multiple-Choice Cloze (Grammar) =====
  if ((quiz as unknown as FlyersPart4Quiz).type === "flyers-part4") {
    const fp4Quiz = quiz as unknown as FlyersPart4Quiz;
    return (
      <div className="quiz-layout">
        <div className="quiz-sub-header" role="banner" aria-label="Flyers Part 4">
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
                  📖 Flyers Reading &amp; Writing
                </span>
              </div>
              <h2 className="quiz-sub-header__title">{fp4Quiz.title}</h2>
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
        <div className="quiz-layout__content" style={{ paddingTop: "var(--space-4, 1rem)" }}>
          <Suspense fallback={ENGINE_FALLBACK}>
            <FlyersPart4Engine
              quiz={fp4Quiz}
              isLoggedIn={isLoggedIn}
              onSubmitResult={(res) => {
                setFlyersPendingResult({
                  answersForApi: res.answersForApi,
                  startTime: res.startTime,
                  score: res.score,
                  maxScore: res.maxScore,
                  percentage: res.percentage,
                  starsEarned: res.starsEarned,
                });
              }}
              onFinish={() => {
                if (flyersPendingResult) {
                  saveFlyersScore(
                    flyersPendingResult.answersForApi,
                    flyersPendingResult.startTime,
                    flyersPendingResult
                  );
                }
              }}
              onBack={() => navigate(backUrl)}
            />
          </Suspense>
        </div>
      </div>
    );
  }

  // ===== Flyers Part 5 — Story Read + Free-Text Fill =====
  if ((quiz as unknown as FlyersPart5Quiz).type === "flyers-part5") {
    const fp5Quiz = quiz as unknown as FlyersPart5Quiz;
    return (
      <div className="quiz-layout">
        <div className="quiz-sub-header" role="banner" aria-label="Flyers Part 5">
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
                  📖 Flyers Reading &amp; Writing
                </span>
              </div>
              <h2 className="quiz-sub-header__title">{fp5Quiz.title}</h2>
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
        <div className="quiz-layout__content" style={{ paddingTop: "var(--space-4, 1rem)" }}>
          <Suspense fallback={ENGINE_FALLBACK}>
            <FlyersPart5Engine
              quiz={fp5Quiz}
              isLoggedIn={isLoggedIn}
              onSubmitResult={(res) => {
                setFlyersPendingResult({
                  answersForApi: res.answersForApi,
                  startTime: res.startTime,
                  score: res.score,
                  maxScore: res.maxScore,
                  percentage: res.percentage,
                  starsEarned: res.starsEarned,
                });
              }}
              onFinish={() => {
                if (flyersPendingResult) {
                  saveFlyersScore(
                    flyersPendingResult.answersForApi,
                    flyersPendingResult.startTime,
                    flyersPendingResult
                  );
                }
              }}
              onBack={() => navigate(backUrl)}
            />
          </Suspense>
        </div>
      </div>
    );
  }

  // ===== Flyers Part 7 — Write a Story (3 Pictures) =====
  if ((quiz as unknown as FlyersPart7Quiz).type === "flyers-part7") {
    const fp7Quiz = quiz as unknown as FlyersPart7Quiz;
    return (
      <div className="quiz-layout">
        <div className="quiz-sub-header" role="banner" aria-label="Flyers Part 7">
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
                  ✏️ Flyers Writing
                </span>
              </div>
              <h2 className="quiz-sub-header__title">{fp7Quiz.title}</h2>
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
        <div className="quiz-layout__content" style={{ paddingTop: "var(--space-4, 1rem)" }}>
          <Suspense fallback={ENGINE_FALLBACK}>
            <FlyersPart7Engine
              quiz={fp7Quiz}
              isLoggedIn={isLoggedIn}
              onFinish={() => navigate(backUrl)}
              onBack={() => navigate(backUrl)}
            />
          </Suspense>
        </div>
      </div>
    );
  }

  // ===== Flyers Part 6 — Diary Read + Inline ONE-Word Fill =====
  if ((quiz as unknown as FlyersPart6Quiz).type === "flyers-part6") {
    const fp6Quiz = quiz as unknown as FlyersPart6Quiz;
    return (
      <div className="quiz-layout">
        <div className="quiz-sub-header" role="banner" aria-label="Flyers Part 6">
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
                  📖 Flyers Reading &amp; Writing
                </span>
              </div>
              <h2 className="quiz-sub-header__title">{fp6Quiz.title}</h2>
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
        <div className="quiz-layout__content" style={{ paddingTop: "var(--space-4, 1rem)" }}>
          <Suspense fallback={ENGINE_FALLBACK}>
            <FlyersPart6Engine
              quiz={fp6Quiz}
              isLoggedIn={isLoggedIn}
              onSubmitResult={(res) => {
                setFlyersPendingResult({
                  answersForApi: res.answersForApi,
                  startTime: res.startTime,
                  score: res.score,
                  maxScore: res.maxScore,
                  percentage: res.percentage,
                  starsEarned: res.starsEarned,
                });
              }}
              onFinish={() => {
                if (flyersPendingResult) {
                  saveFlyersScore(
                    flyersPendingResult.answersForApi,
                    flyersPendingResult.startTime,
                    flyersPendingResult
                  );
                }
              }}
              onBack={() => navigate(backUrl)}
            />
          </Suspense>
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
