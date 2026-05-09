/**
 * ExampleFillSection.tsx — USE Hướng A
 *
 * Hiển thị 5-6 câu cùng lúc, mỗi câu có _______ + 3 options chip
 * User chọn hết rồi mới nộp → feedback tổng hợp + giải thích từng câu
 */
import { useState, useMemo } from "react";
import type { LessonWord } from "../../types/vocabulary";
import "./Games.css";

interface ExampleFillSectionProps {
  words:      LessonWord[];
  onComplete: (score: number, results: WordResult[]) => void;
}

export interface WordResult {
  word:    LessonWord;
  correct: boolean;
}

interface SentenceItem {
  word:    LessonWord;
  blank:   string;        // sentence với _______ thay cho từ đích
  vi:      string | null;
  options: string[];      // 3 options (đúng + 2 distractors)
}

function blankTarget(sentence: string, word: string): string {
  const regex = new RegExp(`\\b${word.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\w*\\b`, "gi");
  return sentence.replace(regex, "_______");
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function buildItems(words: LessonWord[]): SentenceItem[] {
  // Lấy tối đa 6 từ có example_en
  const usable = words.slice(0, 6);
  return usable.map(word => ({
    word,
    blank: word.example_en
      ? blankTarget(word.example_en, word.word)
      : `I can see a _______. (${word.translation_vi})`,
    vi: word.example_vi ?? null,
    options: shuffle([
      word.word,
      ...shuffle(words.filter(w => w.id !== word.id)).slice(0, 2).map(w => w.word),
    ]),
  }));
}

export function ExampleFillSection({ words, onComplete }: ExampleFillSectionProps) {
  const items   = useMemo(() => buildItems(words), [words]);

  // answers[i] = từ user đã chọn cho câu i (null = chưa chọn)
  const [answers,    setAnswers]    = useState<(string | null)[]>(() => Array(items.length).fill(null));
  const [submitted,  setSubmitted]  = useState(false);

  const allAnswered = answers.every(a => a !== null);

  const handleSelect = (itemIdx: number, word: string) => {
    if (submitted) return;
    setAnswers(prev => prev.map((a, i) => i === itemIdx ? word : a));
  };

  const handleSubmit = () => {
    if (!allAnswered || submitted) return;
    setSubmitted(true);

    const results: WordResult[] = items.map((item, i) => ({
      word:    item.word,
      correct: answers[i]?.toLowerCase() === item.word.word.toLowerCase(),
    }));

    const score = results.filter(r => r.correct).length;
    // Delay cho user nhìn feedback
    setTimeout(() => onComplete(score, results), 2500);
  };

  // Render câu với blank
  const renderBlank = (blank: string, chosen: string | null, correct: boolean | null) => {
    const parts = blank.split("_______");
    return (
      <>
        {parts.map((part, i) => (
          <span key={i}>
            {part}
            {i < parts.length - 1 && (
              <span
                className="wbf__blank"
                style={{
                  color: !submitted ? undefined :
                    correct ? "var(--color-success)" : "var(--color-danger)",
                  borderBottomColor: !submitted ? undefined :
                    correct ? "var(--color-success)" : "var(--color-danger)",
                }}
              >
                {chosen ?? "_______"}
              </span>
            )}
          </span>
        ))}
      </>
    );
  };

  return (
    <div className="use-section">
      <div className="use-header">
        <h3 className="use-header__title">✍️ Complete the sentence</h3>
        <p className="use-header__sub">Choose the correct word for each sentence, then submit</p>
      </div>

      <div className="efs__sentences">
        {items.map((item, i) => {
          const chosen   = answers[i];
          const isCorrect = submitted
            ? chosen?.toLowerCase() === item.word.word.toLowerCase()
            : null;

          return (
            <div
              key={item.word.id}
              className={[
                "efs__item",
                !submitted         ? "efs__item--pending" :
                isCorrect          ? "efs__item--correct"  : "efs__item--wrong",
              ].join(" ")}
            >
              <p className="efs__sentence">
                {renderBlank(item.blank, chosen, isCorrect)}
              </p>

              {/* Chips */}
              <div className="efs__options" role="group" aria-label={`Question ${i + 1}`}>
                {item.options.map(opt => {
                  const isChosen   = chosen === opt;
                  const isOptRight = submitted && opt.toLowerCase() === item.word.word.toLowerCase();
                  const isOptWrong = submitted && isChosen && !isOptRight;

                  return (
                    <button
                      key={opt}
                      className={[
                        "efs__chip",
                        isChosen && !submitted ? "efs__chip--selected" : "",
                        isOptRight && submitted ? "efs__chip--correct" : "",
                        isOptWrong              ? "efs__chip--wrong"   : "",
                      ].join(" ")}
                      onClick={() => handleSelect(i, opt)}
                      disabled={submitted}
                    >
                      {opt}
                    </button>
                  );
                })}
              </div>

              {/* Explanation sau khi submit */}
              {submitted && (
                <p className="efs__explanation">
                  {isCorrect ? "✅" : "❌"}
                  <span>
                    {isCorrect
                      ? `Correct! "${item.word.word}" = ${item.word.translation_vi}`
                      : `Correct answer: "${item.word.word}" = ${item.word.translation_vi}`
                    }
                  </span>
                </p>
              )}
            </div>
          );
        })}
      </div>

      {/* Submit button */}
      {!submitted && (
        <div className="efs__submit">
          <button
            className="btn btn-primary"
            onClick={handleSubmit}
            disabled={!allAnswered}
            style={{ width: "100%" }}
          >
            {allAnswered ? "✅ Submit" : `${answers.filter(a => !a).length} question(s) remaining`}
          </button>
        </div>
      )}
    </div>
  );
}
