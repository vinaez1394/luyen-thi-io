/**
 * PassageUseSection.tsx — USE Hướng B (nâng cao)
 *
 * Đọc đoạn văn ngắn có blanks → chọn từ đúng bằng select dropdown
 * Load từ JSON: content/Cambridge/vocabulary/{topic}-p{N}.json
 * Random 1 passage từ nhiều passage có sẵn
 * Hiển thị explanation_vi sau khi nộp
 *
 * Passage JSON format:
 * {
 *   passage_id: "animals-p1",
 *   title: "At the Zoo",
 *   segments: [
 *     { type: "text", content: "I saw a " },
 *     { type: "blank", word_id: "fl-an-001", options: ["tiger","flower","happy"], answer: "tiger" },
 *     { type: "text", content: " at the zoo." }
 *   ],
 *   explanation_vi: "Đây là đoạn văn về sở thú..."
 * }
 */
import { useState, useEffect } from "react";
import type { WordResult } from "./ExampleFillSection";
import "./Games.css";

interface PassageSegment {
  type:    "text" | "blank";
  content?: string;
  word_id?: string;
  options?: string[];
  answer?:  string;
  explanation_vi?: string;
}

interface PassageData {
  passage_id:      string;
  title:           string;
  segments:        PassageSegment[];
  explanation_vi?: string;
}

interface PassageUseSectionProps {
  topic:      string;
  cert:       string;   // starters | movers | flyers — dùng để filter passage phù hợp
  onComplete: (score: number, results: WordResult[]) => void;
  onFallback: () => void;  // Gọi khi không load được passage → dùng Hướng A
}

type LoadState = "loading" | "ready" | "error";

export function PassageUseSection({ topic, cert, onComplete, onFallback }: PassageUseSectionProps) {
  const [passage,    setPassage]    = useState<PassageData | null>(null);
  const [loadState,  setLoadState]  = useState<LoadState>("loading");
  const [answers,    setAnswers]    = useState<Record<number, string>>({});
  const [submitted,  setSubmitted]  = useState(false);

  // Load passage: thử p1 → p2 → p3; nếu không có → fallback
  useEffect(() => {
    let cancelled = false;

    async function loadPassage() {
      // Thử lần lượt p1..p8 qua API, truyền cert để server lọc đúng cấp độ
      const candidates = [1, 2, 3, 4, 5, 6, 7, 8].map(n =>
        `/api/vocabulary/passage/${topic}/${n}?cert=${cert}`
      );

      // Shuffle để random passage
      const shuffled = candidates.sort(() => Math.random() - 0.5);

      for (const url of shuffled) {
        try {
          const res = await fetch(url);
          if (!res.ok) continue;
          const data = await res.json() as PassageData;
          if (!cancelled) {
            setPassage(data);
            setLoadState("ready");
          }
          return;
        } catch {
          // Không có file này, thử tiếp
        }
      }

      // Không tìm được passage nào → fallback Hướng A
      if (!cancelled) {
        onFallback();
      }
    }

    loadPassage();
    return () => { cancelled = true; };
  }, [topic, onFallback]);

  if (loadState === "loading") {
    return (
      <div className="game-loading">
        <div className="game-loading__spinner" />
        <p>Đang tải bài đọc...</p>
      </div>
    );
  }

  if (!passage) return null;

  // Lấy tất cả blanks với index
  const blanks = passage.segments
    .map((seg, i) => ({ seg, i }))
    .filter(({ seg }) => seg.type === "blank");

  const allAnswered = blanks.every(({ i }) => answers[i] !== undefined);

  const handleSelect = (segIdx: number, value: string) => {
    if (submitted) return;
    setAnswers(prev => ({ ...prev, [segIdx]: value }));
  };

  const handleSubmit = () => {
    if (!allAnswered || submitted) return;
    setSubmitted(true);

    const results: WordResult[] = blanks.map(({ seg, i }) => ({
      word: {
        id:             seg.word_id ?? String(i),
        word:           seg.answer ?? "",
        translation_vi: "",
        certificate:    "",
        cert_order:     0,
        ipa:            null,
        word_type:      "",
        example_en:     null,
        example_vi:     null,
        emoji:          "",
        image_url:      null,
        audio_url:      null,
        mastery_level:  0,
        next_review_at: null,
      },
      correct: answers[i]?.toLowerCase() === seg.answer?.toLowerCase(),
    }));

    const score = results.filter(r => r.correct).length;
    setTimeout(() => onComplete(score, results), 2500);
  };

  return (
    <div className="use-section">
      <div className="use-header">
        <h3 className="use-header__title">📖 {passage.title}</h3>
        <p className="use-header__sub">Đọc và chọn từ đúng điền vào chỗ trống</p>
      </div>

      {/* Passage với blanks */}
      <div className="pus">
        <div className="pus__passage">
          {passage.segments.map((seg, i) => {
            if (seg.type === "text") {
              return <span key={i}>{seg.content}</span>;
            }

            // Blank: render select
            const chosen    = answers[i];
            const isCorrect = submitted && chosen?.toLowerCase() === seg.answer?.toLowerCase();
            const isWrong   = submitted && !isCorrect;

            return (
              <select
                key={i}
                className={[
                  "pus__blank-select",
                  submitted && isCorrect ? "pus__blank-select--correct" : "",
                  submitted && isWrong   ? "pus__blank-select--wrong"   : "",
                ].join(" ")}
                value={chosen ?? ""}
                onChange={e => handleSelect(i, e.target.value)}
                disabled={submitted}
                aria-label={`Chọn từ cho chỗ trống ${i}`}
              >
                <option value="" disabled>___</option>
                {(seg.options ?? []).map(opt => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
            );
          })}
        </div>

        {/* Explanation sau khi submit */}
        {submitted && passage.explanation_vi && (
          <div className="efs__explanation" style={{ padding: "0.75rem 1rem", marginTop: 0 }}>
            💡 <span>{passage.explanation_vi}</span>
          </div>
        )}
      </div>

      {/* Submit */}
      {!submitted && (
        <button
          className="btn btn-primary"
          onClick={handleSubmit}
          disabled={!allAnswered}
          style={{ width: "100%" }}
        >
          {allAnswered ? "✅ Nộp bài" : `Còn ${blanks.filter(({ i }) => !answers[i]).length} chỗ trống`}
        </button>
      )}
    </div>
  );
}
