/**
 * UseSection.tsx — USE phase wrapper (tự chọn Hướng A hoặc B)
 *
 * Logic detect:
 *   - Thử load passage JSON → nếu có → Hướng B (PassageUseSection)
 *   - Nếu không → Hướng A (ExampleFillSection)
 *
 * Kết thúc:
 *   - Gọi POST /api/vocabulary/progress cho từng từ
 *   - Hiển thị ResultScreen (⭐ stars + danh sách đúng/sai)
 */
import { useState, useCallback } from "react";
import { useParams, useSearchParams, useNavigate, Link } from "react-router-dom";
import type { LessonWord } from "../../types/vocabulary";
import type { WordResult } from "./ExampleFillSection";
import { ExampleFillSection } from "./ExampleFillSection";
import { PassageUseSection } from "./PassageUseSection";
import { useAuth } from "../../hooks/useAuth";
import "./Games.css";

interface UseSectionProps {
  words:         LessonWord[];
  practiceScore: number;         // Từ PracticeSection để tính sao
  onComplete:    () => void;     // Callback về màn Complete
}

// ── ResultScreen ─────────────────────────────────────────────────────────────
interface ResultScreenProps {
  words:         LessonWord[];
  results:       WordResult[];
  practiceScore: number;
  useScore:      number;
  isLoggedIn:    boolean;
  onNext:        () => void;
  onBack:        () => void;
}

function ResultScreen({ words, results, practiceScore, useScore, isLoggedIn, onNext, onBack }: ResultScreenProps) {
  const total    = words.length;
  const combined = Math.round((practiceScore + useScore) / 2);
  const pct      = Math.round((combined / total) * 100);
  const stars    = pct >= 90 ? 3 : pct >= 70 ? 2 : 1;

  const msg = pct >= 90 ? "🎉 Excellent! You are doing great!"
            : pct >= 70 ? "💪 Good job! Keep it up."
            : "📚 Review a little more, you can do it!";

  return (
    <div className="result-screen">
      <div className="result-screen__stars">
        {"⭐".repeat(stars)}{"☆".repeat(3 - stars)}
      </div>
      <h2 className="result-screen__title">Completed!</h2>
      <p className="result-screen__score">
        Practice: {practiceScore}/{total} &nbsp;|&nbsp; Use: {useScore}/{results.length}
      </p>
      <p style={{ color: "var(--color-text-muted)", margin: 0, fontSize: "0.9rem" }}>{msg}</p>

      {/* Guest CTA — hiển thị khi chưa đăng nhập */}
      {!isLoggedIn && (
        <div style={{
          background: "var(--gradient-primary)",
          borderRadius: 14,
          padding: "0.85rem 1.1rem",
          width: "100%",
          textAlign: "center",
        }}>
          <p style={{ color: "#fff", margin: "0 0 0.5rem", fontWeight: 700, fontSize: "0.9rem" }}>
            🔒 Sign up to save your progress and review with SRS!
          </p>
          <Link
            to="/register"
            style={{
              display: "inline-block",
              background: "#fff",
              color: "var(--color-primary-dark)",
              padding: "0.45rem 1.25rem",
              borderRadius: 99,
              fontWeight: 700,
              fontSize: "0.85rem",
              textDecoration: "none",
            }}
          >
            Sign up for free →
          </Link>
        </div>
      )}

      {/* Danh sách từ đúng/sai */}
      <div className="result-screen__word-list">
        {results.map((r, i) => (
          <div
            key={r.word.id ?? i}
            className={`result-word ${r.correct ? "result-word--correct" : "result-word--wrong"}`}
          >
            <span className="result-word__icon">{r.correct ? "✅" : "❌"}</span>
            <span className="result-word__text">{r.word.word}</span>
            <span className="result-word__vi">{r.word.translation_vi}</span>
          </div>
        ))}
      </div>


      <div className="result-screen__actions">
        <button className="btn btn-primary" onClick={onNext}>
          Continue learning →
        </button>
        <button className="btn btn-ghost" onClick={onBack}>
          ← Back to topic list
        </button>
      </div>
    </div>
  );
}

// ── UseSection (Main) ─────────────────────────────────────────────────────────
type UsePhase = "use_game" | "result";

export function UseSection({ words, practiceScore, onComplete }: UseSectionProps) {
  const { topic }      = useParams<{ topic: string }>();
  const [searchParams] = useSearchParams();
  const navigate       = useNavigate();
  const cert           = searchParams.get("cert") ?? "flyers";
  const { isLoggedIn } = useAuth();

  const [phase,       setPhase]       = useState<UsePhase>("use_game");
  const [useScore,    setUseScore]    = useState(0);
  const [results,     setResults]     = useState<WordResult[]>([]);
  const [useDirectionA, setUseDirectionA] = useState(false);  // fallback flag

  // POST progress cho từng từ
  const submitProgress = useCallback(async (wordResults: WordResult[]) => {
    await Promise.allSettled(
      wordResults.map(r =>
        fetch("/api/vocabulary/progress", {
          method:  "POST",
          headers: { "Content-Type": "application/json" },
          body:    JSON.stringify({
            word_id: r.word.id,
            correct: r.correct,
            session: "use",
          }),
        })
      )
    );
  }, []);

  const handleUseComplete = useCallback(async (score: number, wordResults: WordResult[]) => {
    setUseScore(score);
    setResults(wordResults);
    // Fire progress updates in background
    await submitProgress(wordResults);
    setPhase("result");
  }, [submitProgress]);

  // Hướng B fallback → Hướng A
  const handleFallbackToA = useCallback(() => {
    setUseDirectionA(true);
  }, []);

  if (phase === "result") {
    return (
      <ResultScreen
        words={words}
        results={results}
        practiceScore={practiceScore}
        useScore={useScore}
        isLoggedIn={isLoggedIn}
        onNext={onComplete}
        onBack={() => navigate(`/cambridge/vocabulary?cert=${cert}`)}
      />
    );
  }

  // USE game phase
  if (useDirectionA) {
    return (
      <ExampleFillSection
        words={words}
        onComplete={(score, wordResults) => handleUseComplete(score, wordResults)}
      />
    );
  }

  // Thử Hướng B trước; fallback Hướng A nếu không có passage phù hợp cert
  return (
    <PassageUseSection
      topic={topic ?? ""}
      cert={cert}
      onComplete={(score, wordResults) => handleUseComplete(score, wordResults)}
      onFallback={handleFallbackToA}
    />
  );
}
