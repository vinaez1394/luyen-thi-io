/**
 * WordBankFillGame.tsx — Game 2: Điền từ vào câu
 *
 * Layout: câu có _______ + 4 chip options
 * Dữ liệu: example_en từ DB, thay từ đích bằng _______
 * Feedback: xanh/đỏ ngay + auto-next sau 1s
 * Pass: ≥ 5/8 → unlock USE section
 */
import { useState, useCallback, useMemo } from "react";
import type { LessonWord } from "../../types/vocabulary";
import { speakWord } from "../../utils/speakWord";
import "./Games.css";

interface WordBankFillGameProps {
  words:      LessonWord[];
  onComplete: (score: number) => void;
}

interface FillRound {
  target:     LessonWord;
  sentence:   string;          // example_en với từ đích được ẩn
  sentenceVi: string | null;
  options:    string[];        // 4 words (đúng + 3 distractors), shuffled
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/** Thay từ đích trong câu bằng _______ (case-insensitive) */
function blankTarget(sentence: string, word: string): string {
  const regex = new RegExp(`\\b${word.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\w*\\b`, "gi");
  return sentence.replace(regex, "_______");
}

function buildRounds(words: LessonWord[]): FillRound[] {
  return words.map(target => {
    // Fallback nếu không có example: tạo câu đơn giản
    const exampleEn = target.example_en
      ? blankTarget(target.example_en, target.word)
      : `I see a _______ in the picture.`;

    const distractors = shuffle(
      words.filter(w => w.id !== target.id)
    ).slice(0, 3).map(w => w.word);

    const options = shuffle([target.word, ...distractors]);

    return {
      target,
      sentence:   exampleEn,
      sentenceVi: target.example_vi ?? null,
      options,
    };
  });
}

type ChipState = "idle" | "correct" | "wrong";

export function WordBankFillGame({ words, onComplete }: WordBankFillGameProps) {
  const rounds = useMemo(() => buildRounds(words), [words]);

  const [roundIdx,   setRoundIdx]   = useState(0);
  const [score,      setScore]      = useState(0);
  const [chipStates, setChipStates] = useState<Record<string, ChipState>>({});
  const [locked,     setLocked]     = useState(false);
  const [chosen,     setChosen]     = useState<string | null>(null);

  const current = rounds[roundIdx];
  const total   = rounds.length;

  const handleChip = useCallback((word: string) => {
    if (locked) return;
    setLocked(true);
    setChosen(word);

    const isCorrect = word.toLowerCase() === current.target.word.toLowerCase();

    setChipStates({ [word]: isCorrect ? "correct" : "wrong" });

    if (isCorrect) {
      setScore(s => s + 1);
      speakWord(current.target.word, false, current.target.audio_url ?? undefined);
    } else {
      // Sau 400ms cũng highlight đáp án đúng
      setTimeout(() => {
        setChipStates({
          [word]: "wrong",
          [current.target.word]: "correct",
        });
      }, 400);
    }

    setTimeout(() => {
      if (roundIdx + 1 >= total) {
        onComplete(isCorrect ? score + 1 : score);
      } else {
        setRoundIdx(i => i + 1);
        setChipStates({});
        setChosen(null);
        setLocked(false);
      }
    }, 1000);
  }, [locked, current, roundIdx, total, score, onComplete]);

  // Render sentence với _______ được style riêng
  const renderSentence = (sentence: string) => {
    const parts = sentence.split("_______");
    if (parts.length === 1) return <span>{sentence}</span>;

    return (
      <>
        {parts.map((part, i) => (
          <span key={i}>
            {part}
            {i < parts.length - 1 && (
              <span className="wbf__blank">
                {chosen ? current.target.word : "_______"}
              </span>
            )}
          </span>
        ))}
      </>
    );
  };

  return (
    <div className="wbf">
      {/* Score bar */}
      <div className="game-score-bar" aria-live="polite">
        <span>Question {roundIdx + 1}/{total}</span>
        <span className="game-score-bar__value">✅ {score}</span>
      </div>

      {/* Sentence */}
      <div
        className={[
          "wbf__sentence",
          !chosen         ? ""           :
          chipStates[current.target.word] === "correct" && chosen === current.target.word
            ? "wbf__sentence--correct" : "wbf__sentence--wrong",
        ].join(" ")}
      >
        <p className="wbf__sentence-text">
          {renderSentence(current.sentence)}
        </p>
        {current.sentenceVi && (
          <p className="wbf__sentence-vi">({current.sentenceVi})</p>
        )}
      </div>

      {/* Chip options */}
      <div className="wbf__options" role="group" aria-label="Choose the correct word">
        {current.options.map(word => {
          const state = chipStates[word] ?? "idle";
          return (
            <button
              key={word}
              className={[
                "wbf__chip",
                state === "correct" ? "wbf__chip--correct" : "",
                state === "wrong"   ? "wbf__chip--wrong"   : "",
              ].join(" ")}
              onClick={() => handleChip(word)}
              disabled={locked}
              aria-label={word}
            >
              {word}
            </button>
          );
        })}
      </div>
    </div>
  );
}
