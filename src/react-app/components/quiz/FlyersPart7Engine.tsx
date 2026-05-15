/**
 * FlyersPart7Engine.tsx — v1.0
 * Cambridge Flyers Reading & Writing — Part 7:
 * "Look at the pictures. Write a story."
 *
 * Cơ chế:
 *  - Zone 0: 3 tranh (grid ngang, click để zoom)
 *  - Zone 1: Textarea + live word counter + submit button
 *  - Zone 2 (sau submit): Stars + Checklist tự đánh giá + Writing Tips
 *  - Zone 3 (sau submit): Smart Prompt (copy + mở Gemini/ChatGPT)
 *  - Grading: 100% client-side, KHÔNG gửi essay lên server
 *  - API submit: chỉ gửi { wordCount, starsEarned, timeSpent }
 */

import { useState, useRef, useCallback } from "react";
import "./FlyersPart7Engine.css";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface Picture {
  number: number;
  url: string;
  alt_en: string;
}

export interface ChecklistRule {
  id: string;
  label_vi: string;
  label_fail_vi: string;
  rule_type: "word_count" | "contains_any" | "keyword_count";
  threshold?: number;
  values?: string[];
}

export interface StarsThreshold {
  min_words: number;
  min_keywords: number;
}

export interface FlyersPart7Quiz {
  id: string;
  title: string;
  skill: string;
  level: string;
  part: number;
  type: "flyers-part7";
  is_free: boolean;
  pathway: string;
  group: string;
  difficulty?: string;
  topic?: string;
  characters: string[];
  min_words: number;
  pictures: Picture[];
  scoring_keywords: string[];
  stars_thresholds: {
    one_star: StarsThreshold;
    two_stars: StarsThreshold;
    three_stars: StarsThreshold;
  };
  checklist: ChecklistRule[];
  writing_tips_vi: string[];
  ai_prompt_template: string;
  zone2_instructions_vi: {
    title: string;
    intro: string;
    steps: string[];
    note: string;
  };
}

interface ChecklistResult {
  id: string;
  passed: boolean;
  label_vi: string;
}

interface Part7Result {
  wordCount: number;
  keywordsFound: string[];
  keywordCount: number;
  starsEarned: number;
  checklistResults: ChecklistResult[];
}

interface FlyersPart7EngineProps {
  quiz: FlyersPart7Quiz;
  onFinish?: () => void;
  onBack?: () => void;
  isLoggedIn?: boolean;
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

function countWords(text: string): number {
  return text.trim().split(/\s+/).filter((w) => w.length > 0).length;
}

function gradeEssay(essay: string, quiz: FlyersPart7Quiz): Part7Result {
  const wordCount = countWords(essay);
  const essayLower = essay.toLowerCase();

  // Keyword matching (word boundary)
  const keywordsFound = quiz.scoring_keywords.filter((kw) => {
    try {
      return new RegExp(`\\b${kw.toLowerCase()}\\b`).test(essayLower);
    } catch {
      return essayLower.includes(kw.toLowerCase());
    }
  });
  const keywordCount = keywordsFound.length;

  // Stars logic
  let starsEarned = 0;
  if (wordCount >= quiz.stars_thresholds.one_star.min_words) {
    starsEarned = 1;
    if (keywordCount >= quiz.stars_thresholds.two_stars.min_keywords) starsEarned = 2;
    if (keywordCount >= quiz.stars_thresholds.three_stars.min_keywords) starsEarned = 3;
  }

  // Checklist
  const checklistResults: ChecklistResult[] = quiz.checklist.map((item) => {
    let passed = false;
    if (item.rule_type === "word_count" && item.threshold !== undefined) {
      passed = wordCount >= item.threshold;
    } else if (item.rule_type === "contains_any" && item.values) {
      passed = item.values.some((v) => essayLower.includes(v.toLowerCase()));
    } else if (item.rule_type === "keyword_count" && item.threshold !== undefined) {
      passed = keywordCount >= item.threshold;
    }
    return {
      id: item.id,
      passed,
      label_vi: passed ? item.label_vi : item.label_fail_vi,
    };
  });

  return { wordCount, keywordsFound, keywordCount, starsEarned, checklistResults };
}

function buildSmartPrompt(quiz: FlyersPart7Quiz, essay: string): string {
  return quiz.ai_prompt_template
    .replace("{pic1}", quiz.pictures[0]?.alt_en ?? "")
    .replace("{pic2}", quiz.pictures[1]?.alt_en ?? "")
    .replace("{pic3}", quiz.pictures[2]?.alt_en ?? "")
    .replace("{characters}", quiz.characters.join(", "))
    .replace("{essay}", essay);
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function StarDisplay({ count }: { count: number }) {
  return (
    <div className="fp7-stars" aria-label={`${count} sao`}>
      {[1, 2, 3].map((i) => (
        <span key={i} className={`fp7-star ${i <= count ? "fp7-star--filled" : "fp7-star--empty"}`}>
          {i <= count ? "⭐" : "☆"}
        </span>
      ))}
    </div>
  );
}

function WordCountBar({ wordCount, minWords }: { wordCount: number; minWords: number }) {
  const pct = Math.min(100, Math.round((wordCount / minWords) * 100));
  const reached = wordCount >= minWords;
  return (
    <div className="fp7-word-counter">
      <div className="fp7-word-counter__bar-wrap">
        <div
          className={`fp7-word-counter__bar ${reached ? "fp7-word-counter__bar--done" : ""}`}
          style={{ width: `${pct}%` }}
        />
      </div>
      <span className={`fp7-word-counter__label ${reached ? "fp7-word-counter__label--done" : ""}`}>
        {reached ? `✅ ${wordCount} từ` : `${wordCount} / ${minWords} từ tối thiểu`}
      </span>
    </div>
  );
}

// ─── Main Engine ─────────────────────────────────────────────────────────────

export function FlyersPart7Engine({ quiz, onFinish, onBack, isLoggedIn }: FlyersPart7EngineProps) {
  const [essay, setEssay] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [result, setResult] = useState<Part7Result | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [copyState, setCopyState] = useState<"idle" | "copied">("idle");
  const [zoomedPic, setZoomedPic] = useState<Picture | null>(null);
  const startTime = useRef(Date.now());
  const wordCount = countWords(essay);

  // ── Submit ──
  const handleSubmit = useCallback(async () => {
    if (wordCount === 0) return;
    const gradeResult = gradeEssay(essay, quiz);
    setResult(gradeResult);
    setSubmitted(true);

    // Scroll to result
    setTimeout(() => {
      document.getElementById("fp7-result-zone")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);

    // Save to API (no essay, only metadata)
    if (isLoggedIn) {
      setIsSaving(true);
      try {
        const body = {
          answers: {},
          wordCount: gradeResult.wordCount,
          starsEarned: gradeResult.starsEarned,
          timeSpent: Math.round((Date.now() - startTime.current) / 1000),
        };
        const res = await fetch(`/api/quiz/${quiz.id}/submit`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify(body),
        });
        if (res.ok) setSaved(true);
      } catch {
        // Silent — not critical
      } finally {
        setIsSaving(false);
      }
    }
  }, [essay, wordCount, quiz, isLoggedIn]);

  // ── Smart Prompt ──
  const handleCopyPrompt = useCallback(async () => {
    const prompt = buildSmartPrompt(quiz, essay);
    try {
      await navigator.clipboard.writeText(prompt);
      setCopyState("copied");
      setTimeout(() => setCopyState("idle"), 3000);
    } catch {
      // Fallback: select text
    }
  }, [quiz, essay]);

  const handleOpenGemini = useCallback(async () => {
    const prompt = buildSmartPrompt(quiz, essay);
    try { await navigator.clipboard.writeText(prompt); } catch { /* ok */ }
    window.open("https://gemini.google.com", "_blank");
    setCopyState("copied");
    setTimeout(() => setCopyState("idle"), 3000);
  }, [quiz, essay]);

  const handleOpenChatGPT = useCallback(async () => {
    const prompt = buildSmartPrompt(quiz, essay);
    try { await navigator.clipboard.writeText(prompt); } catch { /* ok */ }
    window.open("https://chatgpt.com", "_blank");
    setCopyState("copied");
    setTimeout(() => setCopyState("idle"), 3000);
  }, [quiz, essay]);

  // ── Lightbox ──
  const handleZoom = (pic: Picture) => setZoomedPic(pic);
  const handleCloseZoom = () => setZoomedPic(null);

  // ─── Render ────────────────────────────────────────────────────────────────
  return (
    <div className="fp7-engine">

      {/* ── ZONE 0: Đề bài ── */}
      <section className="fp7-task-header">
        <div className="fp7-instructions">
          <span className="fp7-instructions__badge">✏️ Part 7</span>
          <p className="fp7-instructions__text">
            Look at the pictures and write a story.
            <br />
            <span className="fp7-instructions__sub">
              Write <strong>20 words or more</strong>.
              Characters: <strong>{quiz.characters.join(", ")}</strong>
            </span>
          </p>
        </div>

        {/* 3 pictures */}
        <div className="fp7-pictures">
          {quiz.pictures.map((pic) => (
            <button
              key={pic.number}
              className="fp7-picture-card"
              onClick={() => handleZoom(pic)}
              aria-label={`Picture ${pic.number} — Click to zoom`}
              title="Click to zoom"
            >
              <div className="fp7-picture-card__num">Picture {pic.number}</div>
              <img
                src={pic.url}
                alt={pic.alt_en}
                className="fp7-picture-card__img"
                loading="lazy"
              />
              <div className="fp7-picture-card__zoom-hint">🔍 Zoom in</div>
            </button>
          ))}
        </div>
      </section>

      {/* ── ZONE 1: Writing area (ẩn sau khi submit) ── */}
      {!submitted && (
        <section className="fp7-writing-zone">
          <label className="fp7-writing-zone__label" htmlFor="fp7-essay">
            📝 Write your story here:
          </label>
          <textarea
            id="fp7-essay"
            className="fp7-textarea"
            value={essay}
            onChange={(e) => setEssay(e.target.value)}
            placeholder={`One day, ${quiz.characters[0]} was...`}
            rows={8}
            maxLength={600}
            spellCheck
            aria-describedby="fp7-word-count"
          />
          <div id="fp7-word-count" className="fp7-writing-zone__footer">
            <WordCountBar wordCount={wordCount} minWords={quiz.min_words} />
            <button
              className="fp7-submit-btn"
              onClick={handleSubmit}
              disabled={wordCount === 0}
              aria-label="Nộp bài viết"
            >
              {wordCount === 0 ? "Hãy viết câu chuyện →" : "📩 Nộp bài →"}
            </button>
          </div>
        </section>
      )}

      {/* ── ZONE 2: Kết quả + Checklist (sau submit) ── */}
      {submitted && result && (
        <section id="fp7-result-zone" className="fp7-result-zone">

          {/* Stars header */}
          <div className="fp7-result-header">
            <StarDisplay count={result.starsEarned} />
            <div className="fp7-result-header__text">
              {result.starsEarned === 3 && <p className="fp7-result-msg fp7-result-msg--great">🎉 Xuất sắc! Câu chuyện rất hay!</p>}
              {result.starsEarned === 2 && <p className="fp7-result-msg fp7-result-msg--good">👍 Tốt! Viết thêm chi tiết để được 3 sao!</p>}
              {result.starsEarned === 1 && <p className="fp7-result-msg fp7-result-msg--ok">💪 Đã viết đủ! Luyện thêm để cải thiện nhé!</p>}
              {result.starsEarned === 0 && <p className="fp7-result-msg fp7-result-msg--low">✍️ Viết thêm ít nhất 20 từ để nhận sao nhé!</p>}
              <span className="fp7-result-word-count">
                Bài viết của em: <strong>{result.wordCount} từ</strong>
                {isSaving && " · Đang lưu..."}
                {saved && " · ✅ Đã lưu"}
              </span>
            </div>
          </div>

          {/* Essay preview (read-only) */}
          <div className="fp7-essay-preview">
            <div className="fp7-essay-preview__label">📖 Bài viết của em:</div>
            <div className="fp7-essay-preview__text">{essay}</div>
          </div>

          {/* Checklist */}
          <div className="fp7-checklist">
            <h3 className="fp7-checklist__title">✅ Tự kiểm tra bài viết</h3>
            <ul className="fp7-checklist__list">
              {result.checklistResults.map((item) => (
                <li key={item.id} className={`fp7-checklist__item ${item.passed ? "fp7-checklist__item--pass" : "fp7-checklist__item--fail"}`}>
                  {item.label_vi}
                </li>
              ))}
            </ul>
          </div>

          {/* Writing tips */}
          <div className="fp7-tips">
            <h3 className="fp7-tips__title">💡 Tips để viết tốt hơn</h3>
            <ul className="fp7-tips__list">
              {quiz.writing_tips_vi.map((tip, i) => (
                <li key={i} className="fp7-tips__item">{tip}</li>
              ))}
            </ul>
          </div>

          {/* ── ZONE 3: Smart Prompt ── */}
          <div className="fp7-smart-prompt">
            <div className="fp7-smart-prompt__header">
              <h3 className="fp7-smart-prompt__title">{quiz.zone2_instructions_vi.title}</h3>
            </div>
            <p className="fp7-smart-prompt__intro">{quiz.zone2_instructions_vi.intro}</p>

            <ol className="fp7-smart-prompt__steps">
              {quiz.zone2_instructions_vi.steps.map((step, i) => (
                <li key={i} className="fp7-smart-prompt__step">{step}</li>
              ))}
            </ol>

            <div className="fp7-smart-prompt__buttons">
              {/* Copy prompt riêng (dùng AI khác: Claude, Grok...) */}
              <button
                className={`fp7-prompt-btn fp7-prompt-btn--copy ${copyState === "copied" ? "fp7-prompt-btn--copied" : ""}`}
                onClick={handleCopyPrompt}
                aria-label="Copy prompt để dùng với AI bất kỳ"
              >
                {copyState === "copied" ? "✅ Đã copy!" : "📋 Copy prompt"}
              </button>

              {/* Mở Gemini */}
              <button
                className="fp7-prompt-btn fp7-prompt-btn--gemini"
                onClick={handleOpenGemini}
                aria-label="Copy prompt và mở Gemini"
              >
                <img
                  src="https://www.gstatic.com/lamda/images/gemini_sparkle_v002_d4735304ff6292a690345.svg"
                  alt=""
                  className="fp7-prompt-btn__icon"
                  width={18} height={18}
                />
                Mở Gemini
              </button>

              {/* Mở ChatGPT */}
              <button
                className="fp7-prompt-btn fp7-prompt-btn--gpt"
                onClick={handleOpenChatGPT}
                aria-label="Copy prompt và mở ChatGPT"
              >
                <svg className="fp7-prompt-btn__icon" width={18} height={18} viewBox="0 0 24 24" fill="currentColor">
                  <path d="M22.282 9.821a5.985 5.985 0 0 0-.516-4.91 6.046 6.046 0 0 0-6.51-2.9A6.065 6.065 0 0 0 4.981 4.18a5.985 5.985 0 0 0-3.998 2.9 6.046 6.046 0 0 0 .743 7.097 5.98 5.98 0 0 0 .51 4.911 6.051 6.051 0 0 0 6.515 2.9A5.985 5.985 0 0 0 13.26 24a6.056 6.056 0 0 0 5.772-4.206 5.99 5.99 0 0 0 3.997-2.9 6.056 6.056 0 0 0-.747-7.073zM13.26 22.43a4.476 4.476 0 0 1-2.876-1.04l.141-.081 4.779-2.758a.795.795 0 0 0 .392-.681v-6.737l2.02 1.168a.071.071 0 0 1 .038.052v5.583a4.504 4.504 0 0 1-4.494 4.494zM3.6 18.304a4.47 4.47 0 0 1-.535-3.014l.142.085 4.783 2.759a.771.771 0 0 0 .78 0l5.843-3.369v2.332a.08.08 0 0 1-.033.062L9.74 19.95a4.5 4.5 0 0 1-6.14-1.646zM2.34 7.896a4.485 4.485 0 0 1 2.366-1.973V11.6a.766.766 0 0 0 .388.676l5.815 3.355-2.02 1.168a.076.076 0 0 1-.071 0l-4.83-2.786A4.504 4.504 0 0 1 2.34 7.896zm16.597 3.855l-5.843-3.372 2.02-1.168a.076.076 0 0 1 .071 0l4.83 2.78a4.5 4.5 0 0 1-.676 8.120v-5.678a.79.79 0 0 0-.402-.682zm2.01-3.023l-.141-.085-4.774-2.782a.776.776 0 0 0-.785 0L9.409 9.23V6.897a.066.066 0 0 1 .028-.061l4.83-2.787a4.5 4.5 0 0 1 6.68 4.66zm-12.64 4.135l-2.02-1.164a.08.08 0 0 1-.038-.057V6.075a4.5 4.5 0 0 1 7.375-3.453l-.142.08-4.778 2.758a.795.795 0 0 0-.393.681zm1.097-2.365l2.602-1.5 2.607 1.5v2.999l-2.597 1.5-2.607-1.5z" />
                </svg>
                Mở ChatGPT
              </button>
            </div>

            {copyState === "copied" && (
              <p className="fp7-smart-prompt__copied-note">
                ✅ Đã copy! Dán vào ô chat của AI và nhấn Gửi để nhận nhận xét.
              </p>
            )}
            <p className="fp7-smart-prompt__note">{quiz.zone2_instructions_vi.note}</p>

            {/* Phase B slot — hidden, reserved for AI Grader */}
            {/* AI_GRADER_PLACEHOLDER */}
          </div>

          {/* Footer actions */}
          <div className="fp7-footer-actions">
            <button className="fp7-footer-btn fp7-footer-btn--back" onClick={onBack}>
              ← Quay lại
            </button>
            <button
              className="fp7-footer-btn fp7-footer-btn--finish"
              onClick={onFinish}
            >
              🏠 Về trang chủ
            </button>
          </div>
        </section>
      )}

      {/* ── Lightbox ── */}
      {zoomedPic && (
        <div className="fp7-lightbox" onClick={handleCloseZoom} role="dialog" aria-modal="true" aria-label="Phóng to tranh">
          <div className="fp7-lightbox__inner" onClick={(e) => e.stopPropagation()}>
            <button className="fp7-lightbox__close" onClick={handleCloseZoom} aria-label="Đóng">✕</button>
            <img src={zoomedPic.url} alt={zoomedPic.alt_en} className="fp7-lightbox__img" />
            <p className="fp7-lightbox__caption">Picture {zoomedPic.number}</p>
          </div>
        </div>
      )}
    </div>
  );
}
