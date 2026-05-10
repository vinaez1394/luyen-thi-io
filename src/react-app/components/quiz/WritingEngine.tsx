/**
 * WritingEngine.tsx — Engine chính cho dạng bài writing
 *
 * Cấu trúc:
 *   WritingEngine
 *   ├── WritingSection × 2
 *   │   ├── CollapsibleBlock (Hướng dẫn + Ví dụ — mặc định ĐÓNG)
 *   │   └── WritingQuestion × N
 *   │       ├── [sec-1: rearrange]         → DragDropFill (tái sử dụng)
 *   │       └── [sec-2: sentence-building] → SentenceInput (mới)
 *   └── StickyFooter (Submit — giống ReadingEngine)
 *
 * Chấm điểm:
 *   Section 1: Phải đúng TOÀN BỘ thứ tự mảng correct[]
 *   Section 2: accepted_answers.some(a => normalize(input) === normalize(a))
 */

import { useState, useEffect, useCallback } from "react";
import type { WritingQuiz, WritingAnswers, WritingResult, RearrangeQuestion, SentenceBuildingQuestion } from "../../types/writing";
import { normalizeAnswer } from "../../types/writing";
import type { WordTooltipProps } from "../vocabulary/WordTooltip";
import { CollapsibleBlock } from "./CollapsibleBlock";
import { DragDropFill } from "./DragDropFill";
import { SentenceInput } from "./SentenceInput";
import { GameLoginCTA } from "../vocabulary/GameLoginCTA";
import { useAuth } from "../../hooks/useAuth";
import "./Writing.css";

// ============================================
// Helper — tính điểm
// ============================================
function calculateResult(quiz: WritingQuiz, answers: WritingAnswers): WritingResult {
  let correctCount = 0;
  const correctAnswers: Record<string, string | string[]> = {};

  for (const section of quiz.sections) {
    for (const q of section.questions) {
      if (q.type === "drag-drop-fill") {
        const rq = q as RearrangeQuestion;
        correctAnswers[q.id] = rq.correct;
        const userSlots = answers[q.id];
        // Phải đúng TOÀN BỘ thứ tự
        if (Array.isArray(userSlots) && userSlots.length === rq.correct.length) {
          const allCorrect = rq.correct.every((c, i) => userSlots[i] === c);
          if (allCorrect) correctCount++;
        }
      } else if (q.type === "write-sentence") {
        const sq = q as SentenceBuildingQuestion;
        correctAnswers[q.id] = sq.accepted_answers[0];
        const userInput = (answers[q.id] as string) ?? "";
        const isCorrect = sq.accepted_answers.some(
          a => normalizeAnswer(userInput) === normalizeAnswer(a)
        );
        if (isCorrect) correctCount++;
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
interface WritingEngineProps {
  quiz: WritingQuiz;
  onComplete?: (result: WritingResult) => void;
  vocabRemainingFree?: number;
  onVocabLookup?: WordTooltipProps["onLookup"];
  onProgressChange?: (answered: number, total: number) => void;
  submitTrigger?: number;
  backUrl?: string;
  onRetry?: () => void;
}

// ============================================
// WritingEngine — component chính
// ============================================
export function WritingEngine({
  quiz,
  onComplete,
  vocabRemainingFree = 3,
  onVocabLookup,
  onProgressChange,
  submitTrigger,
  backUrl,
  onRetry,
}: WritingEngineProps) {
  const { isLoggedIn, loginWithGoogle } = useAuth();

  const [answers, setAnswers] = useState<WritingAnswers>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [result, setResult] = useState<WritingResult | null>(null);
  const [showLoginCTA, setShowLoginCTA] = useState(false);

  // Đếm số câu đã trả lời
  const totalQuestions = quiz.sections.reduce((sum, s) => sum + s.questions.length, 0);

  const answeredCount = Object.keys(answers).filter(k => {
    const ans = answers[k];
    if (Array.isArray(ans)) return ans.every(a => a !== null && a !== "");
    return (ans as string)?.trim() !== "";
  }).length;

  const allAnswered = answeredCount >= totalQuestions;
  const progressPct = Math.round((answeredCount / totalQuestions) * 100);

  // Scroll to top khi mount
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [quiz.id]);

  // Báo QuizPage biết progress
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    onProgressChange?.(answeredCount, totalQuestions);
  }, [answeredCount, totalQuestions]); // onProgressChange intentionally excluded — new ref each render would cause infinite loop

  // Submit trigger từ sub-header
  useEffect(() => {
    if (submitTrigger && submitTrigger > 0) {
      handleSubmit();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [submitTrigger]);

  // Handler khi user trả lời 1 câu
  const handleAnswer = useCallback((questionId: string, answer: string | string[]) => {
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

    if (isLoggedIn) {
      try {
        await fetch(`/api/quiz/${quiz.id}/submit`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ answers, timeSpent: 0 }),
        });
      } catch {
        // Silent fail — kết quả vẫn hiển thị đúng
      }
    } else {
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
    onRetry?.();
  }, [onRetry]);

  const starsLabel = result ? "⭐".repeat(result.starsEarned) : "";

  return (
    <div className="we-engine">
      <div className="we-engine__body">

        {/* Kết quả — hiện ở trên sau khi nộp */}
        {isSubmitted && result && (
          <div className="we-result">
            <span className="we-result__stars">{starsLabel}</span>
            <div className="we-result__score">
              {result.correctCount}/{result.totalQuestions} correct
            </div>
            <div className="we-result__label">
              {result.percentage}% —{" "}
              {result.percentage >= 80
                ? "Excellent! 🎉"
                : result.percentage >= 60
                ? "Good job! 👍"
                : "Keep practising! 💪"}
            </div>
            <div className="we-result__actions">
              <button className="we-result__retry-btn" onClick={handleRetry}>
                🔄 Try Again
              </button>
              {backUrl && (
                <a href={backUrl} className="we-result__back-btn">
                  ← Back to lessons
                </a>
              )}
            </div>
          </div>
        )}

        {/* 2 Sections */}
        {quiz.sections.map((section, sIdx) => (
          <div key={section.id} className="we-section">
            {/* Tiêu đề section */}
            <h3 className="we-section__title">{section.title}</h3>

            {/* Collapsible: Hướng dẫn + Ví dụ */}
            <CollapsibleBlock title="📖 Hướng dẫn & Ví dụ" defaultOpen={false}>
              <p className="we-instruction">{section.instruction}</p>
              {section.example && (
                <div className="we-example">
                  <div className="we-example__label">Ví dụ:</div>
                  <div className="we-example__cues">{section.example.display_cues}</div>
                  <div className="we-example__arrow">→</div>
                  <div className="we-example__answer">
                    <em>{section.example.answer}</em>
                  </div>
                </div>
              )}
            </CollapsibleBlock>

            {/* Danh sách câu hỏi */}
            <div className="we-questions">
              {section.questions.map((q, qIdx) => {
                const qNum = sIdx === 0 ? qIdx + 1 : quiz.sections[0].questions.length + qIdx + 1;

                if (q.type === "drag-drop-fill") {
                  const rq = q as RearrangeQuestion;
                  // Tạo quiz-like object để DragDropFill nhận
                  const mockQuestion = {
                    id: rq.id,
                    template: rq.template,
                    word_bank: rq.word_bank,
                    correct: rq.correct,
                    explanation_vi: rq.explanation.correct_sentence,
                    type: "drag-drop-fill" as const,
                    prompt: rq.display_cues,
                  };

                  const isRearrangeCorrect = isSubmitted && (() => {
                    const userSlots = answers[rq.id];
                    if (!Array.isArray(userSlots)) return false;
                    return rq.correct.every((c, i) => userSlots[i] === c);
                  })();

                  return (
                    <div key={rq.id} className="we-rearrange-question">
                      {/* Display cues */}
                      <div className="we-rearrange-question__header">
                        <span className="we-rearrange-question__number">Question {qNum}:</span>
                        <span className="we-rearrange-question__cues">{rq.display_cues}</span>
                      </div>

                      {/* DragDropFill */}
                      <DragDropFill
                        question={mockQuestion as any}
                        questionIndex={qIdx}
                        totalQuestions={section.questions.length}
                        userAnswer={answers[rq.id]}
                        onAnswer={handleAnswer}
                        isSubmitted={isSubmitted}
                        correctAnswer={result?.correctAnswers[rq.id]}
                        vocabRemainingFree={vocabRemainingFree}
                        onVocabLookup={onVocabLookup}
                      />

                      {/* Explanation sau khi nộp */}
                      {isSubmitted && rq.explanation && (
                        <div className={`we-explanation ${isRearrangeCorrect ? "we-explanation--correct" : "we-explanation--wrong"}`}>
                          <div className="we-explanation__answer">
                            <span className="we-explanation__icon">{isRearrangeCorrect ? "✅" : "❌"}</span>
                            <div>
                              <div className="we-explanation__label">Đáp án chuẩn:</div>
                              <div className="we-explanation__sentence">{rq.explanation.correct_sentence}</div>
                            </div>
                          </div>

                          <div className="we-explanation__structure">
                            <span className="we-explanation__section-title">📐 Cấu trúc câu:</span>
                            <code className="we-explanation__code">{rq.explanation.structure_vi}</code>
                          </div>

                          {rq.explanation.grammar_notes.length > 0 && (
                            <div className="we-explanation__notes">
                              <span className="we-explanation__section-title">📝 Ngữ pháp:</span>
                              <ul className="we-explanation__list">
                                {rq.explanation.grammar_notes.map((note, i) => (
                                  <li key={i}>{note}</li>
                                ))}
                              </ul>
                            </div>
                          )}

                          {rq.explanation.vocab_notes.length > 0 && (
                            <div className="we-explanation__vocab">
                              <span className="we-explanation__section-title">📚 Từ vựng:</span>
                              <div className="we-explanation__vocab-chips">
                                {rq.explanation.vocab_notes.map((v, i) => (
                                  <span key={i} className="we-explanation__vocab-chip">
                                    <strong>{v.word}</strong>
                                    {v.ipa && <em className="we-explanation__ipa"> /{v.ipa}/</em>}
                                    <span className="we-explanation__vocab-vi"> — {v.vi}</span>
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}

                          {rq.explanation.common_mistakes.length > 0 && (
                            <div className="we-explanation__mistakes">
                              <span className="we-explanation__section-title">⚠️ Lỗi thường gặp:</span>
                              <ul className="we-explanation__list we-explanation__list--mistakes">
                                {rq.explanation.common_mistakes.map((m, i) => (
                                  <li key={i}>{m}</li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  );
                }

                if (q.type === "write-sentence") {
                  return (
                    <SentenceInput
                      key={q.id}
                      question={q as SentenceBuildingQuestion}
                      userAnswer={(answers[q.id] as string) ?? ""}
                      onAnswer={handleAnswer}
                      isSubmitted={isSubmitted}
                      questionNumber={qNum}
                    />
                  );
                }

                return null;
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Sticky Footer — Submit (chỉ hiện khi không có sub-header) */}
      {!isSubmitted && !onProgressChange && (
        <div className="we-footer">
          <div className="we-footer__progress-text">
            Answered {answeredCount}/{totalQuestions}
          </div>
          <div className="we-footer__progress-bar">
            <div
              className="we-footer__progress-fill"
              style={{ width: `${progressPct}%` }}
            />
          </div>
          <button
            className="we-footer__submit-btn"
            onClick={handleSubmit}
            disabled={!allAnswered}
            id="btn-writing-submit"
            title={!allAnswered ? "Please answer all questions first" : ""}
          >
            Submit ✓
          </button>
        </div>
      )}

      {/* Guest CTA Modal */}
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
