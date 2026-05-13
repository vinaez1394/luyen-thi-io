/**
 * PictureMatchGame.tsx — Game 1: Nhìn từ → chọn ảnh/emoji đúng
 *
 * Layout: 2×2 grid emoji
 * Logic:  1 từ đúng + 3 distractors ngẫu nhiên cùng topic
 * Pass:   ≥ 5/8 → unlock WordBankFillGame
 * Audio:  phát âm từ khi user chọn đúng
 */
import { useState, useCallback, useMemo, useEffect, useRef } from "react";
import type { LessonWord } from "../../types/vocabulary";
import { speakWord } from "../../utils/speakWord";
import "./Games.css";

/** Hiển thị hình ảnh hoặc emoji tùy theo dữ liệu */
function WordMedia({ word }: { word: LessonWord }) {
  if (word.image_url) {
    return (
      <img
        src={word.image_url}
        alt={word.word}
        className="pmg__option-image"
        loading="lazy"
      />
    );
  }
  return <span className="pmg__option-emoji" aria-hidden="true">{word.emoji}</span>;
}

interface PictureMatchGameProps {
  words:      LessonWord[];     // 8 từ trong session
  onComplete: (score: number) => void;
}

interface Round {
  target:      LessonWord;
  options:     LessonWord[];   // 4 options (target + 3 distractors), shuffled
  correctIdx:  number;
}

/** Fisher-Yates shuffle */
function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/** Tạo rounds từ danh sách từ */
function buildRounds(words: LessonWord[]): Round[] {
  return words.map(target => {
    const distractors = shuffle(words.filter(w => w.id !== target.id)).slice(0, 3);
    const options     = shuffle([target, ...distractors]);
    return {
      target,
      options,
      correctIdx: options.findIndex(o => o.id === target.id),
    };
  });
}

type OptionState = "idle" | "correct" | "wrong" | "highlight";

export function PictureMatchGame({ words, onComplete }: PictureMatchGameProps) {
  const rounds = useMemo(() => buildRounds(words), [words]);

  const [roundIdx,      setRoundIdx]      = useState(0);
  const [score,         setScore]         = useState(0);
  const [optionStates,  setOptionStates]  = useState<OptionState[]>(["idle","idle","idle","idle"]);
  const [locked,        setLocked]        = useState(false);  // Prevent double-click

  const current = rounds[roundIdx];
  const total   = rounds.length;

  const handleSelect = useCallback((selectedIdx: number) => {
    if (locked) return;
    setLocked(true);

    const isCorrect = selectedIdx === current.correctIdx;

    if (isCorrect) {
      setOptionStates(prev => prev.map((_, i) => i === selectedIdx ? "correct" : "idle"));
      setScore(s => s + 1);
      speakWord(current.target.word, false, current.target.audio_url ?? undefined);

      setTimeout(() => {
        if (roundIdx + 1 >= total) {
          onComplete(score + 1);
        } else {
          setRoundIdx(i => i + 1);
          setOptionStates(["idle","idle","idle","idle"]);
          setLocked(false);
        }
      }, 800);
    } else {
      // Sai: highlight đỏ chỗ chọn + xanh chỗ đúng sau 400ms
      setOptionStates(prev => prev.map((_, i) => i === selectedIdx ? "wrong" : "idle"));

      setTimeout(() => {
        setOptionStates(prev =>
          prev.map((_, i) =>
            i === selectedIdx    ? "wrong"     :
            i === current.correctIdx ? "highlight" :
            "idle"
          )
        );
      }, 400);

      setTimeout(() => {
        if (roundIdx + 1 >= total) {
          onComplete(score);
        } else {
          setRoundIdx(i => i + 1);
          setOptionStates(["idle","idle","idle","idle"]);
          setLocked(false);
        }
      }, 1500);
    }
  }, [locked, current, roundIdx, total, score, onComplete]);

  // ── Auto-play âm thanh khi sang câu hỏi mới ──────────────────────────────────
  // Dùng ref để tham chiếu tới current mà không bỏ lỡ roundIdx trigger
  const currentRef = useRef(current);
  useEffect(() => { currentRef.current = current; });

  useEffect(() => {
    // Delay nhỏ để UI render xong trước khi phát
    const timer = setTimeout(() => {
      const c = currentRef.current;
      speakWord(c.target.word, false, c.target.audio_url ?? undefined);
    }, 300);
    return () => clearTimeout(timer);
  }, [roundIdx]); // chỉ chạy khi roundIdx thay đổi, dùng ref để tránh stale closure

  return (
    <div className="pmg">
      {/* Score bar */}
      <div className="game-score-bar" aria-live="polite">
        <span>Question {roundIdx + 1}/{total}</span>
        <span className="game-score-bar__value">✅ {score}</span>
      </div>

      {/* Question: hiển thị từ + nút phát âm */}
      <div className="pmg__question">
        <p className="pmg__question-label">Find the picture for:</p>
        <div className="pmg__word-row">
          <h2 className="pmg__word">{current.target.word}</h2>
          <button
            className="pmg__speak-btn"
            onClick={() => speakWord(current.target.word, false, current.target.audio_url ?? undefined)}
            aria-label={`Hear pronunciation of ${current.target.word}`}
            title="Play pronunciation"
          >
            🔊
          </button>
        </div>
        {current.target.ipa && (
          <p className="pmg__ipa">/{current.target.ipa}/</p>
        )}
      </div>

      {/* 2×2 emoji grid */}
      <div className="pmg__grid" role="group" aria-label="Choose the correct picture">
        {current.options.map((opt, i) => (
          <button
            key={opt.id}
            className={[
              "pmg__option",
              optionStates[i] === "correct"   ? "pmg__option--correct"   : "",
              optionStates[i] === "wrong"     ? "pmg__option--wrong"     : "",
              optionStates[i] === "highlight" ? "pmg__option--highlight" : "",
            ].join(" ")}
            onClick={() => handleSelect(i)}
            disabled={locked}
            aria-label={`Select: ${opt.word}`}
          >
            <WordMedia word={opt} />
            {optionStates[i] !== "idle" && (
              <span className="pmg__option-check">
                {optionStates[i] === "correct" || optionStates[i] === "highlight" ? "✅" : "❌"}
              </span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
