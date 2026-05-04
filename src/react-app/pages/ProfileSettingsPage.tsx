/**
 * ProfileSettingsPage.tsx — Trang Cài đặt hồ sơ bé
 *
 * Cho phép cập nhật: tên, avatar, lớp học, lộ trình
 * Gọi PATCH /api/student/profile sau khi Save
 */

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import "./ProfileSettingsPage.css";

// ── Avatars & Grade & Pathway options (tái dùng từ Onboarding) ──────────────
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

const GRADES = [
  { value: 3, label: "Lớp 3", emoji: "🌱", desc: "Nền tảng" },
  { value: 4, label: "Lớp 4", emoji: "🌿", desc: "Đang phát triển" },
  { value: 5, label: "Lớp 5", emoji: "🌳", desc: "Sắp lên lớp 6" },
];

const PATHWAYS = [
  { id: "lop6",      label: "Luyện Thi Lớp 6",      emoji: "🏫", desc: "Ôn Toán, Tiếng Việt, Tiếng Anh, Khoa học" },
  { id: "cambridge", label: "Chứng chỉ Cambridge", emoji: "🇬🇧", desc: "Luyện tiếng Anh quốc tế" },
];

// ── Component ────────────────────────────────────────────────────────────────
export function ProfileSettingsPage() {
  const navigate = useNavigate();
  const { user, refetch } = useAuth();

  // ── Form state ──
  const [displayName,     setDisplayName]     = useState("");
  const [avatarId,        setAvatarId]        = useState("cat");
  const [currentGrade,    setCurrentGrade]    = useState<number | null>(null);
  const [selectedPathway, setSelectedPathway] = useState<string | null>(null);

  // ── UI state ──
  const [isSaving,   setIsSaving]   = useState(false);
  const [error,      setError]      = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  // Prefill từ user profile khi load
  useEffect(() => {
    if (user?.profile) {
      setDisplayName(user.profile.display_name ?? "");
      setAvatarId(user.profile.avatar_id ?? "cat");
    }
    // Đọc grade & pathway từ localStorage (set bởi useDashboard)
    const grade = parseInt(localStorage.getItem("student_grade") ?? "0", 10);
    if ([3, 4, 5].includes(grade)) setCurrentGrade(grade);
    const pathway = localStorage.getItem("student_pathway");
    if (pathway) setSelectedPathway(pathway);
  }, [user]);

  const handleSave = async () => {
    if (displayName.trim().length < 2) {
      setError("Tên bé cần ít nhất 2 ký tự");
      return;
    }
    setIsSaving(true);
    setError(null);
    setSuccessMsg(null);

    try {
      const res = await fetch("/api/student/profile", {
        method:  "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          displayName:     displayName.trim(),
          avatarId,
          currentGrade,
          selectedPathway,
        }),
      });

      if (!res.ok) {
        const data = (await res.json()) as { error?: string };
        setError(data.error ?? "Có lỗi xảy ra, vui lòng thử lại");
        return;
      }

      // Cập nhật localStorage ngay lập tức → dashboard badge hiển thị đúng
      if (currentGrade) localStorage.setItem("student_grade", String(currentGrade));
      if (selectedPathway) localStorage.setItem("student_pathway", selectedPathway);

      // Refetch auth để cập nhật displayName trong header
      await refetch();

      setSuccessMsg("✅ Đã lưu thay đổi thành công!");
      setTimeout(() => setSuccessMsg(null), 3000);
    } catch {
      setError("Không kết nối được server. Kiểm tra mạng và thử lại.");
    } finally {
      setIsSaving(false);
    }
  };

  const selectedAvatar = AVATARS.find((a) => a.id === avatarId);

  return (
    <div className="ps-page">
      <div className="ps-container">

        {/* ── Header ── */}
        <div className="ps-header">
          <button
            className="ps-back-btn"
            onClick={() => navigate("/dashboard")}
            aria-label="Quay lại"
          >
            ←
          </button>
          <div>
            <h1 className="ps-title">⚙️ Cài đặt hồ sơ</h1>
            <p className="ps-subtitle">Cập nhật thông tin của bé</p>
          </div>
        </div>

        {/* ── Avatar preview ── */}
        <div className="ps-avatar-preview">
          <div className="ps-avatar-preview__emoji">
            {selectedAvatar?.emoji ?? "🐱"}
          </div>
          <p className="ps-avatar-preview__name">{displayName || "Tên bé"}</p>
        </div>

        {/* ── Section: Tên ── */}
        <section className="ps-section">
          <h2 className="ps-section__title">👤 Tên hiển thị</h2>
          <input
            id="input-settings-name"
            className="ps-input"
            type="text"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            placeholder="VD: Minh Anh"
            maxLength={30}
          />
        </section>

        {/* ── Section: Avatar ── */}
        <section className="ps-section">
          <h2 className="ps-section__title">🐾 Chọn nhân vật</h2>
          <div className="ps-avatar-grid">
            {AVATARS.map((a) => (
              <button
                key={a.id}
                id={`btn-settings-avatar-${a.id}`}
                className={`ps-avatar-btn ${avatarId === a.id ? "ps-avatar-btn--active" : ""}`}
                onClick={() => setAvatarId(a.id)}
                aria-pressed={avatarId === a.id}
                title={a.id}
              >
                {a.emoji}
              </button>
            ))}
          </div>
        </section>

        {/* ── Section: Lớp học ── */}
        <section className="ps-section">
          <h2 className="ps-section__title">📚 Bé đang học lớp mấy?</h2>
          <div className="ps-grade-grid">
            {GRADES.map((g) => (
              <button
                key={g.value}
                id={`btn-settings-grade-${g.value}`}
                className={`ps-grade-btn ${currentGrade === g.value ? "ps-grade-btn--active" : ""}`}
                onClick={() => setCurrentGrade(g.value)}
                aria-pressed={currentGrade === g.value}
              >
                <span className="ps-grade-btn__emoji">{g.emoji}</span>
                <span className="ps-grade-btn__label">{g.label}</span>
                <span className="ps-grade-btn__desc">{g.desc}</span>
              </button>
            ))}
          </div>
        </section>

        {/* ── Section: Lộ trình ── */}
        <section className="ps-section">
          <h2 className="ps-section__title">🎯 Lộ trình học</h2>
          <div className="ps-pathway-grid">
            {PATHWAYS.map((pw) => (
              <button
                key={pw.id}
                id={`btn-settings-pathway-${pw.id}`}
                className={`ps-pathway-btn ${selectedPathway === pw.id ? "ps-pathway-btn--active" : ""}`}
                onClick={() => setSelectedPathway(pw.id)}
                aria-pressed={selectedPathway === pw.id}
              >
                <span className="ps-pathway-btn__emoji">{pw.emoji}</span>
                <div className="ps-pathway-btn__body">
                  <span className="ps-pathway-btn__label">{pw.label}</span>
                  <span className="ps-pathway-btn__desc">{pw.desc}</span>
                </div>
                {selectedPathway === pw.id && (
                  <span className="ps-pathway-btn__check">✓</span>
                )}
              </button>
            ))}
          </div>
        </section>

        {/* ── Error / Success ── */}
        {error && (
          <div className="ps-alert ps-alert--error" role="alert">
            ⚠️ {error}
          </div>
        )}
        {successMsg && (
          <div className="ps-alert ps-alert--success" role="status">
            {successMsg}
          </div>
        )}

        {/* ── Save button ── */}
        <div className="ps-actions">
          <button
            id="btn-settings-save"
            className="btn btn-primary ps-save-btn"
            onClick={handleSave}
            disabled={isSaving || displayName.trim().length < 2}
          >
            {isSaving ? "Đang lưu..." : "💾 Lưu thay đổi"}
          </button>
          <button
            className="btn btn-ghost"
            onClick={() => navigate("/dashboard")}
          >
            Hủy
          </button>
        </div>

      </div>
    </div>
  );
}
