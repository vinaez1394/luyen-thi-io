/**
 * ReadingSection.tsx — 1 section của bài Reading
 */

import { useState } from "react";
import type { ReadingSection as ReadingSectionType, ReadingAnswers } from "../../types/reading";
import type { WordTooltipProps } from "../vocabulary/WordTooltip";
import { ReadingPassage } from "./ReadingPassage";
import { ReadingQuestion } from "./ReadingQuestion";

interface ReadingSectionProps {
  section:              ReadingSectionType;
  answers:              ReadingAnswers;
  isSubmitted:          boolean;
  correctAnswers?:      Record<string, string>;
  onAnswer:             (questionId: string, answer: string) => void;
  vocabRemainingFree?:  number;
  onVocabLookup?:       WordTooltipProps["onLookup"];
}

export function ReadingSection({
  section,
  answers,
  isSubmitted,
  correctAnswers,
  onAnswer,
  vocabRemainingFree = 3,
  onVocabLookup,
}: ReadingSectionProps) {
  const [passageOpen, setPassageOpen] = useState(true);

  return (
    <div className="re-section">
      <div className="re-section__header">
        <span>{section.title}</span>
        <span className="re-section__points">{section.points} điểm</span>
      </div>

      <ReadingPassage
        passage={section.passage}
        isOpen={passageOpen}
        onToggle={() => setPassageOpen(v => !v)}
        sectionTitle={section.title}
        vocabRemainingFree={vocabRemainingFree}
        onVocabLookup={onVocabLookup}
        isReview={isSubmitted}
      />

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
