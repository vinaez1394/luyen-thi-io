/**
 * PracticeSection.tsx — PRACTICE phase wrapper
 *
 * Flow: PictureMatchGame → (pass ≥5/8) → WordBankFillGame → onComplete
 * Tracking: score tổng hợp = (pmg_score + wbf_score) / 2
 *
 * State machine:
 *   "picture_match" → (done) → "wbf_transition" → "word_bank" → (done) → onComplete
 */
import { useState } from "react";
import type { LessonWord } from "../../types/vocabulary";
import { PictureMatchGame } from "./PictureMatchGame";
import { WordBankFillGame } from "./WordBankFillGame";
import "./Games.css";

const PASS_THRESHOLD = 5; // ≥5/8 để unlock tiếp

interface PracticeSectionProps {
  words:      LessonWord[];
  onComplete: (totalScore: number) => void;
}

type PracticePhase = "picture_match" | "wbf_transition" | "word_bank" | "fail_gate";

interface PhaseScores {
  pmg: number;
  wbf: number;
}

export function PracticeSection({ words, onComplete }: PracticeSectionProps) {
  const [phase,  setPhase]  = useState<PracticePhase>("picture_match");
  const [scores, setScores] = useState<PhaseScores>({ pmg: 0, wbf: 0 });

  const handlePmgComplete = (score: number) => {
    setScores(prev => ({ ...prev, pmg: score }));

    if (score >= PASS_THRESHOLD) {
      setPhase("wbf_transition");
    } else {
      setPhase("fail_gate");
    }
  };

  const handleWbfComplete = (score: number) => {
    const finalScores = { ...scores, wbf: score };
    setScores(finalScores);
    const avg = Math.round((finalScores.pmg + score) / 2);
    onComplete(avg);
  };

  const handleRetry = () => {
    setPhase("picture_match");
    setScores({ pmg: 0, wbf: 0 });
  };

  return (
    <div className="practice-section">
      {/* Phase indicator */}
      <div className="game-phase-nav">
        <span className={[
            "game-phase-pill",
            phase === "picture_match" ? "game-phase-pill--active" :
            (phase === "wbf_transition" || phase === "word_bank") ? "game-phase-pill--done" : "",
          ].join(" ")}>
          🖼️ Identify
        </span>
        <span className={`game-phase-pill${phase === "word_bank" || phase === "wbf_transition" ? " game-phase-pill--active" : ""}`}>
          ✍️ Fill in
        </span>
      </div>

      {/* PictureMatchGame */}
      {phase === "picture_match" && (
        <>
          <div className="practice-header">
            <h3 className="practice-header__title">🖼️ Identify the picture</h3>
            <p className="practice-header__sub">Choose the picture that matches the word</p>
          </div>
          <PictureMatchGame words={words} onComplete={handlePmgComplete} />
        </>
      )}

      {/* Transition screen sau PMG pass */}
      {phase === "wbf_transition" && (
        <div className="game-transition">
          <span className="game-transition__icon">🎉</span>
          <h3 className="game-transition__title">
            Identify: {scores.pmg}/{words.length} ✅
          </h3>
          <p className="game-transition__sub">
            Great! Next — fill in the blanks
          </p>
          <button
            className="btn btn-primary"
            onClick={() => setPhase("word_bank")}
          >
            Next →
          </button>
        </div>
      )}

      {/* WordBankFillGame */}
      {phase === "word_bank" && (
        <>
          <div className="practice-header">
            <h3 className="practice-header__title">✍️ Fill in the blanks</h3>
            <p className="practice-header__sub">Choose the correct word to complete the sentence</p>
          </div>
          <WordBankFillGame words={words} onComplete={handleWbfComplete} />
        </>
      )}

      {/* Fail gate (score < 5/8) */}
      {phase === "fail_gate" && (
        <div className="game-transition">
          <span className="game-transition__icon">💪</span>
          <h3 className="game-transition__title">
            Identify: {scores.pmg}/{words.length}
          </h3>
          <p className="game-transition__sub">
            Let’s review! You need ≥ {PASS_THRESHOLD}/{words.length} to continue.
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem", width: "100%", maxWidth: 240 }}>
            <button className="btn btn-primary" onClick={handleRetry}>
              🔄 Try again
            </button>
            <button
              className="btn btn-ghost"
              onClick={() => onComplete(scores.pmg)}
            >
              Skip, continue learning
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
