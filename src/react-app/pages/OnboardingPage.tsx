/**
 * OnboardingPage.tsx — Tạo hồ sơ cho bé (lần đầu đăng nhập)
 *
 * Flow (5 bước):
 *   Step 1: Nhập tên bé
 *   Step 2: Chọn avatar
 *   Step 3: Bé đang học lớp mấy? (3/4/5) — A1
 *   Step 4: Bé muốn luyện gì? (Cambridge/Lớp 6) — A2
 *            ↳ Logic A3: nếu chọn Cambridge → skip bước lớp (không ảnh hưởng UX, vì step 3 hỏi trước)
 *   Step 5: Chọn theme → Submit
 *
 * Phase 04: Hybrid A+C — hỏi lớp trong onboarding + lưu vào profile
 */

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ThemePicker } from "../components/ui/ThemePicker";
import { useTheme } from "../components/ui/ThemeProvider";
import "./OnboardingPage.css";

// ── Avatar presets ──────────────────────────────────────────────────────────
const AVATARS = [
  { id: "cat",      emoji: "🐱" },
  { id: "dog",      emoji: "🐶" },
  { id: "rabbit",   emoji: "🐰" },
  { id: "bear",     emoji: "🐻" },
  { id: "fox",      emoji: "🦊" },
  { id: "penguin",  emoji: "🐧" },
  { id: "owl",      emoji: "🦉" },
  { id: "elephant", emoji: "🐘" },
  { id: "lion",     emoji: "🦁" },
  { id: "duck",     emoji: "🦆" },
  { id: "frog",     emoji: "🐸" },
  { id: "panda",    emoji: "🐼" },
];

// ── Grade options ───────────────────────────────────────────────────────────
const GRADES = [
  { value: 3, label: "Lớp 3", emoji: "🌱", desc: "Nền tảng" },
  { value: 4, label: "Lớp 4", emoji: "🌿", desc: "Đang phát triển" },
  { value: 5, label: "Lớp 5", emoji: "🌳", desc: "Sắp lên lớp 6" },
];

// ── Pathway options ─────────────────────────────────────────────────────────
const PATHWAYS = [
  {
    id:    "cambridge",
    label: "Chứng chỉ Cambridge",
    emoji: "🇬🇧",
    desc:  "Luyện tiếng Anh quốc tế từ Starters đến PET",
    color: "#6366f1",
  },
  {
    id:    "lop6",
    label: "Thi vào Lớp 6",
    emoji: "🏫",
    desc:  "Ôn Toán, Tiếng Việt, Tiếng Anh, Khoa học",
    color: "#7c3aed",
  },
];

type Step = 1 | 2 | 3 | 4 | 5;

// ── Component ───────────────────────────────────────────────────────────────
export function OnboardingPage() {
  const navigate = useNavigate();
  const { theme } = useTheme();

  const [step,            setStep]            = useState<Step>(1);
  const [displayName,     setDisplayName]     = useState("");
  const [avatarId,        setAvatarId]        = useState("cat");
  const [currentGrade,    setCurrentGrade]    = useState<number | null>(null);
  const [selectedPathway, setSelectedPathway] = useState<string | null>(null);
  const [isSubmitting,    setIsSubmitting]    = useState(false);
  const [error,           setError]           = useState<string | null>(null);

  const nameError =
    displayName.trim().length > 0 && displayName.trim().length < 2
      ? "Tên bé cần ít nhất 2 ký tự"
      : null;

  // Logic A3: nếu Cambridge → grade không bắt buộc, nhưng vẫn hỏi
  // Quyết định: hỏi cả 2 bước trong mọi trường hợp để đơn giản hóa UX
  // Nếu pathway = cambridge → grade không ảnh hưởng gợi ý bài học
  const canProceedStep3 = currentGrade !== null;
  const canProceedStep4 = selectedPathway !== null;

  const handleSubmit = async () => {
    if (!displayName.trim() || displayName.trim().length < 2) return;

    setIsSubmitting(true);
    setError(null);

    try {
      const res = await fetch("/api/student/profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          displayName:     displayName.trim(),
          avatarId,
          theme,
          currentGrade,
          selectedPathway,
        }),
      });

      if (!res.ok) {
        const data = (await res.json()) as { error?: string };
        setError(data.error ?? "Có lỗi xảy ra, vui lòng thử lại");
        return;
      }

      // Điều hướng đến lộ trình đã chọn
      const destination = selectedPathway === "cambridge"
        ? "/cambridge"
        : selectedPathway === "lop6"
          ? "/lop6"
          : "/learn";

      navigate(destination, { replace: true });
    } catch {
      setError("Không kết nối được server. Kiểm tra mạng và thử lại.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const TOTAL_STEPS = 5;

  return (
    <div className="onboarding-page">
      <div className="onboarding-card animate-fadeIn">

        {/* ── Progress ── */}
        <div className="onboarding-progress">
          {Array.from({ length: TOTAL_STEPS }, (_, i) => (
            <div
              key={i + 1}
              className={`onboarding-progress__dot ${step > i ? "onboarding-progress__dot--active" : ""}`}
            />
          ))}
        </div>
        <p className="onboarding-progress__label">Bước {step}/{TOTAL_STEPS}</p>

        {/* ── Step 1: Tên bé ── */}
        {step === 1 && (
          <div className="onboarding-step animate-fadeIn" key="step1">
            <div className="onboarding-step__icon">✏️</div>
            <h2 className="onboarding-step__title">Tên bé là gì?</h2>
            <p className="onboarding-step__desc">
              Tên này sẽ hiển thị trên màn hình chào của bé
            </p>
            <input
              id="input-display-name"
              className="input"
              type="text"
              placeholder="Ví dụ: Minh Anh"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              maxLength={30}
              onKeyDown={(e) => {
                if (e.key === "Enter" && displayName.trim().length >= 2) {
                  setStep(2);
                }
              }}
              autoFocus
            />
            {nameError && (
              <p className="onboarding-field-error">{nameError}</p>
            )}
            <button
              id="btn-onboarding-step1"
              className="btn btn-primary"
              onClick={() => setStep(2)}
              disabled={displayName.trim().length < 2}
            >
              Tiếp theo →
            </button>
          </div>
        )}

        {/* ── Step 2: Chọn avatar ── */}
        {step === 2 && (
          <div className="onboarding-step animate-fadeIn" key="step2">
            <div className="onboarding-step__icon">
              {AVATARS.find((a) => a.id === avatarId)?.emoji ?? "🐱"}
            </div>
            <h2 className="onboarding-step__title">
              Chọn nhân vật cho {displayName}
            </h2>
            <p className="onboarding-step__desc">Bé thích con vật nào?</p>
            <div className="avatar-grid">
              {AVATARS.map((avatar) => (
                <button
                  key={avatar.id}
                  id={`btn-avatar-${avatar.id}`}
                  className={`avatar-btn ${avatarId === avatar.id ? "avatar-btn--active" : ""}`}
                  onClick={() => setAvatarId(avatar.id)}
                  title={avatar.id}
                  aria-pressed={avatarId === avatar.id}
                >
                  {avatar.emoji}
                </button>
              ))}
            </div>
            <div className="onboarding-nav">
              <button className="btn btn-ghost" onClick={() => setStep(1)}>
                ← Quay lại
              </button>
              <button
                id="btn-onboarding-step2"
                className="btn btn-primary"
                onClick={() => setStep(3)}
              >
                Tiếp theo →
              </button>
            </div>
          </div>
        )}

        {/* ── Step 3: Bé đang học lớp mấy? ── */}
        {step === 3 && (
          <div className="onboarding-step animate-fadeIn" key="step3">
            <div className="onboarding-step__icon">📚</div>
            <h2 className="onboarding-step__title">{displayName} đang học lớp mấy?</h2>
            <p className="onboarding-step__desc">
              Để bé nhận bài luyện tập phù hợp với trình độ nhé!
            </p>
            <div className="grade-picker">
              {GRADES.map((g) => (
                <button
                  key={g.value}
                  id={`btn-grade-${g.value}`}
                  className={`grade-btn ${currentGrade === g.value ? "grade-btn--active" : ""}`}
                  onClick={() => setCurrentGrade(g.value)}
                  aria-pressed={currentGrade === g.value}
                >
                  <span className="grade-btn__emoji">{g.emoji}</span>
                  <span className="grade-btn__label">{g.label}</span>
                  <span className="grade-btn__desc">{g.desc}</span>
                </button>
              ))}
            </div>
            <div className="onboarding-nav">
              <button className="btn btn-ghost" onClick={() => setStep(2)}>
                ← Quay lại
              </button>
              <button
                id="btn-onboarding-step3"
                className="btn btn-primary"
                onClick={() => setStep(4)}
                disabled={!canProceedStep3}
              >
                Tiếp theo →
              </button>
            </div>
          </div>
        )}

        {/* ── Step 4: Bé muốn luyện gì? ── */}
        {step === 4 && (
          <div className="onboarding-step animate-fadeIn" key="step4">
            <div className="onboarding-step__icon">🎯</div>
            <h2 className="onboarding-step__title">{displayName} muốn luyện gì?</h2>
            <p className="onboarding-step__desc">
              Chọn lộ trình học phù hợp — bé có thể đổi sau bất cứ lúc nào
            </p>
            <div className="pathway-picker">
              {PATHWAYS.map((pw) => (
                <button
                  key={pw.id}
                  id={`btn-pathway-${pw.id}`}
                  className={`pathway-btn ${selectedPathway === pw.id ? "pathway-btn--active" : ""}`}
                  onClick={() => setSelectedPathway(pw.id)}
                  aria-pressed={selectedPathway === pw.id}
                  style={{ "--pathway-color": pw.color } as React.CSSProperties}
                >
                  <span className="pathway-btn__emoji">{pw.emoji}</span>
                  <div className="pathway-btn__body">
                    <span className="pathway-btn__label">{pw.label}</span>
                    <span className="pathway-btn__desc">{pw.desc}</span>
                  </div>
                  {selectedPathway === pw.id && (
                    <span className="pathway-btn__check">✓</span>
                  )}
                </button>
              ))}
            </div>
            <div className="onboarding-nav">
              <button className="btn btn-ghost" onClick={() => setStep(3)}>
                ← Quay lại
              </button>
              <button
                id="btn-onboarding-step4"
                className="btn btn-primary"
                onClick={() => setStep(5)}
                disabled={!canProceedStep4}
              >
                Tiếp theo →
              </button>
            </div>
          </div>
        )}

        {/* ── Step 5: Chọn theme ── */}
        {step === 5 && (
          <div className="onboarding-step animate-fadeIn" key="step5">
            <div className="onboarding-step__icon">🎨</div>
            <h2 className="onboarding-step__title">Màu sắc yêu thích?</h2>
            <p className="onboarding-step__desc">
              {displayName} thích giao diện màu gì?
            </p>
            <ThemePicker />
            {error && (
              <p className="onboarding-field-error" role="alert">
                ⚠️ {error}
              </p>
            )}
            <div className="onboarding-nav">
              <button className="btn btn-ghost" onClick={() => setStep(4)}>
                ← Quay lại
              </button>
              <button
                id="btn-onboarding-start"
                className="btn btn-primary"
                onClick={handleSubmit}
                disabled={isSubmitting}
              >
                {isSubmitting ? "Đang tạo..." : "🚀 Bắt đầu!"}
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
