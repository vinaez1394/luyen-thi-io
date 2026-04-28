/**
 * scoring.ts — Logic tính điểm và sao
 */

export function calcPercentage(correct: number, total: number): number {
  if (total === 0) return 0;
  return Math.round((correct / total) * 100);
}

export function calcStars(percentage: number): number {
  if (percentage >= 90) return 5;
  if (percentage >= 80) return 3;
  if (percentage >= 60) return 2;
  return 1;
}

/**
 * So sánh đáp án user với đáp án đúng (case-insensitive, trim)
 */
export function isCorrect(
  userAnswer: string | string[] | undefined,
  correctAnswer: string | string[]
): boolean {
  if (userAnswer === undefined || userAnswer === null) return false;

  if (Array.isArray(correctAnswer)) {
    if (!Array.isArray(userAnswer)) return false;
    const sortedUser = [...userAnswer].map((a) => a.trim().toLowerCase()).sort();
    const sortedCorrect = [...correctAnswer].map((a) => a.trim().toLowerCase()).sort();
    return JSON.stringify(sortedUser) === JSON.stringify(sortedCorrect);
  }

  const ua = Array.isArray(userAnswer) ? userAnswer[0] : userAnswer;
  return ua?.trim().toLowerCase() === correctAnswer.trim().toLowerCase();
}

/**
 * Chấm toàn bộ bài — trả về số câu đúng và map đáp án đúng
 */
export function gradeQuiz(
  questions: Array<{ id: string; correct: string | string[] }>,
  answers: Record<string, string | string[]>
): { correctCount: number; correctAnswers: Record<string, string | string[]> } {
  let correctCount = 0;
  const correctAnswers: Record<string, string | string[]> = {};

  for (const q of questions) {
    correctAnswers[q.id] = q.correct;
    if (isCorrect(answers[q.id], q.correct)) {
      correctCount++;
    }
  }

  return { correctCount, correctAnswers };
}
