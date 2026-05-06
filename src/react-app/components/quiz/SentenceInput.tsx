/**
 * SentenceInput.tsx — Ô nhập câu hoàn chỉnh (Section 2 của WritingEngine)
 *
 * JSON format (per question):
 * {
 *   "id": "q5",
 *   "type": "write-sentence",
 *   "display_cues": "Nguyen Hue Flower Street / be / one of / ... /.//",
 *   "cues_segments": [...],
 *   "accepted_answers": ["Nguyen Hue....", ...],
 *   "explanation": { ... }
 * }
 */

import type { SentenceBuildingQuestion, WritingExplanation } from "../../types/writing";
import { normalizeAnswer } from "../../types/writing";

// ============================================
// ExplanationPanel — Hiển thị giải thích sau khi nộp bài
// ============================================
function ExplanationPanel({ explanation, isCorrect }: {
  explanation: WritingExplanation;
  isCorrect: boolean;
}) {
  return (
    <div className={`we-explanation ${isCorrect ? "we-explanation--correct" : "we-explanation--wrong"}`}>
      <div className="we-explanation__answer">
        <span className="we-explanation__icon">{isCorrect ? "✅" : "❌"}</span>
        <div>
          <div className="we-explanation__label">Đáp án chuẩn:</div>
          <div className="we-explanation__sentence">{explanation.correct_sentence}</div>
        </div>
      </div>

      <div className="we-explanation__structure">
        <span className="we-explanation__section-title">📐 Cấu trúc câu:</span>
        <code className="we-explanation__code">{explanation.structure_vi}</code>
      </div>

      {explanation.grammar_notes.length > 0 && (
        <div className="we-explanation__notes">
          <span className="we-explanation__section-title">📝 Ngữ pháp:</span>
          <ul className="we-explanation__list">
            {explanation.grammar_notes.map((note, i) => (
              <li key={i}>{note}</li>
            ))}
          </ul>
        </div>
      )}

      {explanation.vocab_notes.length > 0 && (
        <div className="we-explanation__vocab">
          <span className="we-explanation__section-title">📚 Từ vựng:</span>
          <div className="we-explanation__vocab-chips">
            {explanation.vocab_notes.map((v, i) => (
              <span key={i} className="we-explanation__vocab-chip">
                <strong>{v.word}</strong>
                {v.ipa && <em className="we-explanation__ipa"> /{v.ipa}/</em>}
                <span className="we-explanation__vocab-vi"> — {v.vi}</span>
              </span>
            ))}
          </div>
        </div>
      )}

      {explanation.common_mistakes.length > 0 && (
        <div className="we-explanation__mistakes">
          <span className="we-explanation__section-title">⚠️ Lỗi thường gặp:</span>
          <ul className="we-explanation__list we-explanation__list--mistakes">
            {explanation.common_mistakes.map((m, i) => (
              <li key={i}>{m}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

// ============================================
// SentenceInput — Component chính
// ============================================
interface SentenceInputProps {
  question: SentenceBuildingQuestion;
  userAnswer: string;
  onAnswer: (id: string, value: string) => void;
  isSubmitted: boolean;
  questionNumber: number;
}

export function SentenceInput({
  question,
  userAnswer,
  onAnswer,
  isSubmitted,
  questionNumber,
}: SentenceInputProps) {
  const isCorrect = isSubmitted && question.accepted_answers.some(
    a => normalizeAnswer(userAnswer) === normalizeAnswer(a)
  );

  return (
    <div className={`we-sentence-input ${isSubmitted ? (isCorrect ? "we-sentence-input--correct" : "we-sentence-input--wrong") : ""}`}>
      {/* Question number + cues */}
      <div className="we-sentence-input__header">
        <span className="we-sentence-input__number">Question {questionNumber}:</span>
        <span className="we-sentence-input__cues">{question.display_cues}</span>
      </div>

      {/* Arrow + Input row */}
      <div className="we-sentence-input__row">
        <span className="we-sentence-input__arrow" aria-hidden="true">→</span>
        <input
          type="text"
          className={`we-sentence-input__field ${
            isSubmitted
              ? isCorrect
                ? "we-sentence-input__field--correct"
                : "we-sentence-input__field--wrong"
              : ""
          }`}
          value={userAnswer}
          onChange={e => !isSubmitted && onAnswer(question.id, e.target.value)}
          disabled={isSubmitted}
          placeholder="Type your complete sentence here..."
          aria-label={`Answer for question ${questionNumber}`}
          id={`sentence-input-${question.id}`}
          autoComplete="off"
          spellCheck={false}
        />
      </div>

      {/* Explanation — hiện sau khi nộp bài */}
      {isSubmitted && question.explanation && (
        <ExplanationPanel
          explanation={question.explanation}
          isCorrect={isCorrect}
        />
      )}
    </div>
  );
}
