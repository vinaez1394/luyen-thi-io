/**
 * useQuiz.ts — State management cho Quiz Engine
 * Xử lý: load quiz, trả lời, nộp bài, nhận kết quả
 */

import { useState, useCallback } from "react";
import type { Quiz, UserAnswers, QuizResult } from "../types/quiz";

type QuizState = "loading" | "ready" | "submitted" | "error";

export function useQuiz(quizId: string) {
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [state, setState] = useState<QuizState>("loading");
  const [error, setError] = useState<string | null>(null);
  const [isPremium, setIsPremium] = useState(false);
  const [answers, setAnswers] = useState<UserAnswers>({});
  const [result, setResult] = useState<QuizResult | null>(null);
  const [timeSpent, setTimeSpent] = useState(0);
  const [startTime] = useState(Date.now());

  // Load quiz từ API
  const loadQuiz = useCallback(async () => {
    setState("loading");
    setError(null);
    try {
      const res = await fetch(`/api/quiz/${quizId}`);
      if (res.status === 403) {
        const data = (await res.json()) as { error: string };
        if (data.error === "premium") {
          setIsPremium(true);
          setState("error");
          return;
        }
      }
      if (!res.ok) throw new Error("Không tải được bài học");
      const data = (await res.json()) as Quiz;
      setQuiz(data);
      setState("ready");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Có lỗi xảy ra");
      setState("error");
    }
  }, [quizId]);

  // Ghi nhận đáp án user chọn
  const handleAnswer = useCallback(
    (questionId: string, answer: string | string[]) => {
      setAnswers((prev) => ({ ...prev, [questionId]: answer }));
    },
    []
  );

  // Nộp bài
  const submitQuiz = useCallback(async () => {
    if (!quiz) return;
    const spent = Math.round((Date.now() - startTime) / 1000);
    setTimeSpent(spent);

    try {
      const res = await fetch(`/api/quiz/${quizId}/submit`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ answers, timeSpent: spent }),
      });
      if (!res.ok) throw new Error("Nộp bài thất bại");
      const data = (await res.json()) as QuizResult;
      setResult(data);
      setState("submitted");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Có lỗi khi nộp bài");
    }
  }, [quiz, quizId, answers, startTime]);

  // Số câu đã trả lời
  const answeredCount = Object.keys(answers).length;
  const totalQuestions = quiz?.questions.length ?? 0;
  const allAnswered = answeredCount === totalQuestions && totalQuestions > 0;

  return {
    quiz,
    state,
    error,
    isPremium,
    answers,
    result,
    timeSpent,
    answeredCount,
    allAnswered,
    loadQuiz,
    handleAnswer,
    submitQuiz,
  };
}
