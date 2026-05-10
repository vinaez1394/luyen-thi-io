/**
 * VocabularyLesson.tsx — Wrapper cho toàn bộ lesson flow
 *
 * Flow: LEARN → PRACTICE → USE → COMPLETE
 * - Đọc topic + cert từ URL params
 * - Hiển thị StepNav (unlock lần lượt)
 * - Delegate render cho LearnSection / PracticeSection / UseSection
 *
 * URL: /cambridge/vocabulary/:topic?cert=flyers&offset=0
 */
import { useState } from "react";
import { useParams, useSearchParams, useNavigate } from "react-router-dom";
import { useVocabularyLesson } from "../../hooks/useVocabularyLesson";
import type { LessonPhase, CertLevel } from "../../types/vocabulary";
import { LearnSection } from "./LearnSection";
import { PracticeSection } from "./PracticeSection";
import { UseSection } from "./UseSection";
import { CertBadge } from "./CertBadge";
import "./VocabularyLesson.css";

// ── LessonHeader ────────────────────────────────────────────────────────────
interface LessonHeaderProps {
  topic:          string;
  cert:           CertLevel;
  sessionNumber:  number;
  totalSessions:  number;
  onBack:         () => void;
}

function LessonHeader({ topic, cert, sessionNumber, totalSessions, onBack }: LessonHeaderProps) {
  const label = topic.charAt(0).toUpperCase() + topic.slice(1);

  return (
    <header className="lesson-header">
      <button
        className="lesson-header__back"
        onClick={onBack}
        aria-label="Back to topic list"
      >
        ← Back
      </button>

      <div className="lesson-header__info">
        <h1 className="lesson-header__title">{label}</h1>
        <div className="lesson-header__meta">
          <CertBadge cert={cert} size="sm" />
          {totalSessions > 1 && (
            <span className="lesson-header__session">
              Set {sessionNumber}/{totalSessions}
            </span>
          )}
        </div>
      </div>
    </header>
  );
}

// ── StepNav ─────────────────────────────────────────────────────────────────
const STEPS: { key: LessonPhase; label: string; emoji: string }[] = [
  { key: "LEARN",    label: "Learn",    emoji: "📖" },
  { key: "PRACTICE", label: "Practice", emoji: "🎮" },
  { key: "USE",      label: "Use",      emoji: "✍️"  },
];

interface StepNavProps {
  currentPhase: LessonPhase;
}

function StepNav({ currentPhase }: StepNavProps) {
  const phaseOrder: LessonPhase[] = ["LEARN", "PRACTICE", "USE", "COMPLETE"];
  const currentIdx = phaseOrder.indexOf(currentPhase);

  return (
    <nav className="step-nav" aria-label="Lesson progress">
      {STEPS.map((step, i) => {
        const isDone    = currentIdx > i;
        const isActive  = currentPhase === step.key;
        const isLocked  = currentIdx < i;

        return (
          <div
            key={step.key}
            className={`step-nav__item${isActive ? " step-nav__item--active" : ""}${isDone ? " step-nav__item--done" : ""}${isLocked ? " step-nav__item--locked" : ""}`}
            aria-current={isActive ? "step" : undefined}
          >
            <span className="step-nav__icon">
              {isDone ? "✅" : isLocked ? "🔒" : step.emoji}
            </span>
            <span className="step-nav__label">{step.label}</span>
            {i < STEPS.length - 1 && (
              <span className="step-nav__connector" aria-hidden="true" />
            )}
          </div>
        );
      })}
    </nav>
  );
}

// CompletionScreen removed — UseSection.tsx handles ResultScreen with star scoring

// (placeholders removed in Phase 04 — replaced by PracticeSection + UseSection)


// ── VocabularyLesson (Main Component) ────────────────────────────────────────

export function VocabularyLesson() {
  const { topic }           = useParams<{ topic: string }>();
  const [searchParams]      = useSearchParams();
  const navigate            = useNavigate();

  const cert   = (searchParams.get("cert")   ?? "flyers") as CertLevel;
  const offset = Number(searchParams.get("offset") ?? "0");

  const {
    session:     s,
    sessionMeta: sm,
    completePhase: cp,
  } = useVocabularyLesson({ topic: topic ?? "", cert, offset });
  const [practiceScore, setPracticeScore] = useState(0);

  const handleBack = () => navigate(`/cambridge/vocabulary?cert=${cert}`);

  // ── Loading & Error states ────────────────────────────────────────────────

  if (s.isLoading) {
    return (
      <div className="lesson-loading">
        <div className="lesson-loading__spinner" aria-label="Loading..." />
        <p>Loading lesson...</p>
      </div>
    );
  }

  if (s.error || !s.words.length) {
    return (
      <div className="lesson-error">
        <p>😕 {s.error ?? "No vocabulary found."}</p>
        <button className="btn btn-ghost" onClick={handleBack}>← Back</button>
      </div>
    );
  }

  // ── Render ────────────────────────────────────────────────────────────────
  return (
    <div className="vocabulary-lesson">
      <LessonHeader
        topic={topic ?? ""}
        cert={cert}
        sessionNumber={sm.session_number}
        totalSessions={sm.total_sessions}
        onBack={handleBack}
      />

      <StepNav currentPhase={s.phase} />

      <main className="lesson-body">
        {s.phase === "LEARN" && (
          <LearnSection
            words={s.words}
            onComplete={() => cp("PRACTICE")}
          />
        )}

        {s.phase === "PRACTICE" && (
          <PracticeSection
            words={s.words}
            onComplete={(score) => {
              setPracticeScore(score);
              cp("USE");
            }}
          />
        )}

        {s.phase === "USE" && (
          <UseSection
            words={s.words}
            practiceScore={practiceScore}
            onComplete={() => cp("COMPLETE")}
          />
        )}

        {s.phase === "COMPLETE" && (
          <div className="lesson-complete">
            <div className="lesson-complete__stars">⭐⭐⭐</div>
            <h2 className="lesson-complete__title">Excellent!</h2>
            <p className="lesson-complete__msg">You have completed this set!</p>
            <div className="lesson-complete__actions">
              <button
                className="btn btn-primary"
                onClick={() => navigate(`/cambridge/vocabulary/${topic}?cert=${cert}&offset=${offset + 8}`)}
              >
                Next set →
              </button>
              <button className="btn btn-ghost" onClick={() => navigate(`/cambridge/vocabulary?cert=${cert}`)}>
                ← Back to list
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
