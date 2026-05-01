/**
 * ReadingSection.tsx — 1 section của bài Reading
 *
 * Mỗi section = passage panel riêng (thu gọn độc lập) + danh sách câu hỏi
 * Phương án A: Passage 1 trên, Passage 2 xuất hiện đầu Section 2
 */

import { useState } from "react";
import type { ReadingSection as ReadingSectionType, ReadingAnswers } from "../../types/reading";
import { ReadingPassage } from "./ReadingPassage";
import { ReadingQuestion } from "./ReadingQuestion";

// ============================================
// Props
// ============================================
interface ReadingSectionProps {
  section:         ReadingSectionType;
  answers:         ReadingAnswers;
  isSubmitted:     boolean;
  correctAnswers?: Record<string, string>;
  onAnswer:        (questionId: string, answer: string) => void;
}

// ============================================
// ReadingSection
// ============================================
export function ReadingSection({
  section,
  answers,
  isSubmitted,
  correctAnswers,
  onAnswer,
}: ReadingSectionProps) {
  // Passage bắt đầu ở trạng thái MỞ
  const [passageOpen, setPassageOpen] = useState(true);

  return (
    <div className="re-section">
      {/* Section header */}
      <div className="re-section__header">
        <span>{section.title}</span>
        <span className="re-section__points">{section.points} điểm</span>
      </div>

      {/* Passage Panel */}
      <ReadingPassage
        passage={section.passage}
        isOpen={passageOpen}
        onToggle={() => setPassageOpen(v => !v)}
        sectionTitle={section.title}
      />

      {/* Questions */}
      <div className="re-questions">
        {section.questions.map((q, idx) => (
          <ReadingQuestion
            key={q.id}
            question={q}
            questionNumber={idx + 1}
            userAnswer={answers[q.id] ?? ""}
            isSubmitted={isSubmitted}
            correctAnswer={correctAnswers?.[q.id]}
            onAnswer={onAnswer}
          />
        ))}
      </div>
    </div>
  );
}
