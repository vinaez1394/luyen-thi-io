/**
 * OnboardingPage.tsx — Tạo hồ sơ cho bé (lần đầu đăng nhập)
 * Bước: Nhập tên → Chọn avatar → Chọn theme → Bắt đầu!
 */

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ThemePicker } from "../components/ui/ThemePicker";
import { useTheme } from "../components/ui/ThemeProvider";
import "./OnboardingPage.css";

// 12 avatar presets
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

export function OnboardingPage() {
  const navigate = useNavigate();
  const { theme } = useTheme();

  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [displayName, setDisplayName] = useState("");
  const [avatarId, setAvatarId] = useState("cat");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const nameError =
    displayName.trim().length > 0 && displayName.trim().length < 2
      ? "Tên bé cần ít nhất 2 ký tự"
      : null;

  const handleSubmit = async () => {
    if (!displayName.trim() || displayName.trim().length < 2) return;

    setIsSubmitting(true);
    setError(null);

    try {
      const res = await fetch("/api/student/profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          displayName: displayName.trim(),
          avatarId,
          theme,
        }),
      });

      if (!res.ok) {
        const data = (await res.json()) as { error?: string };
        setError(data.error ?? "Có lỗi xảy ra, vui lòng thử lại");
        return;
      }

      navigate("/dashboard", { replace: true });
    } catch {
      setError("Không kết nối được server. Kiểm tra mạng và thử lại.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="onboarding-page">
      <div className="onboarding-card animate-fadeIn">
        {/* Progress */}
        <div className="onboarding-progress">
          {[1, 2, 3].map((s) => (
            <div
              key={s}
              className={`onboarding-progress__dot ${step >= s ? "onboarding-progress__dot--active" : ""}`}
            />
          ))}
        </div>

        {/* Step 1: Tên bé */}
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

        {/* Step 2: Chọn avatar */}
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

        {/* Step 3: Chọn theme */}
        {step === 3 && (
          <div className="onboarding-step animate-fadeIn" key="step3">
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
              <button className="btn btn-ghost" onClick={() => setStep(2)}>
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
