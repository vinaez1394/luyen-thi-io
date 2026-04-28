/** QuizHeader.tsx */
import "./Quiz.css";

interface QuizHeaderProps {
  title: string;
  currentQuestion: number;
  totalQuestions: number;
  skill: string;
}

const SKILL_EMOJI: Record<string, string> = {
  reading: "📖", listening: "🎧", writing: "✍️", math: "🧮",
};

export function QuizHeader({ title, currentQuestion, totalQuestions, skill }: QuizHeaderProps) {
  const progress = ((currentQuestion + 1) / totalQuestions) * 100;
  return (
    <div className="quiz-header">
      <div className="quiz-header__top">
        <span className="quiz-header__skill">{SKILL_EMOJI[skill] ?? "📝"} {skill.toUpperCase()}</span>
        <span className="quiz-header__count">Câu {currentQuestion + 1}/{totalQuestions}</span>
      </div>
      <h2 className="quiz-header__title">{title}</h2>
      <div className="quiz-header__progress-bar">
        <div className="quiz-header__progress-fill" style={{ width: `${progress}%` }} />
      </div>
    </div>
  );
}
