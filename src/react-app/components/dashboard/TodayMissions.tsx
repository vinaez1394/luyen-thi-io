/**
 * TodayMissions.tsx — "Nhiệm vụ hôm nay" (Phase 04)
 *
 * Hiển thị tối đa 3 bài được cá nhân hóa theo:
 *   - selectedPathway: cambridge | lop6 | null (hiện tất cả)
 *   - currentGrade: chỉ lop6, filter theo grade_target
 *
 * Data source: SUBJECTS + HOME_LESSONS (frontend, không cần API mới)
 * Fallback: nếu không có pathway → hiện 3 bài free đầu tiên
 *
 * Phase 04 — Personalized Dashboard
 */

import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { SUBJECTS, findSubject } from "../../data/subjects";
import { getLessonUrl } from "../../utils/urlHelpers";
import "./TodayMissions.css";

// ── Types ──────────────────────────────────────────────────────────────────
interface Mission {
  id:         string;
  title:      string;
  emoji:      string;
  subjectId:  string;
  slug:       string;
  skill?:     string;
  pathway:    string;
  is_free:    boolean;
}

interface TodayMissionsProps {
  selectedPathway: string | null;
  currentGrade:    number | null;
  skills?:         { skill: string; level: number }[];
}

// ── Logic: build danh sách 3 nhiệm vụ ────────────────────────────────────
function buildMissions(
  selectedPathway: string | null,
  currentGrade:    number | null,
): Mission[] {
  // Lọc subjects theo pathway
  const subjects = selectedPathway
    ? SUBJECTS.filter((s) => s.pathway === selectedPathway && s.available)
    : SUBJECTS.filter((s) => s.available);

  const missions: Mission[] = [];

  for (const subject of subjects) {
    for (const lesson of subject.lessons) {
      if (missions.length >= 3) break;

      // Với lộ trình lớp 6 + có grade: ưu tiên bài đúng grade_target
      if (selectedPathway === "lop6" && currentGrade !== null && lesson.grade_target) {
        // grade_target format: "3-4", "4-5", "5-6" (or cast if schema changes)
        const gt = lesson.grade_target as string;
        const [min, max] = gt.split("-").map(Number);
        const inRange =
          gt === "all" ||
          (currentGrade >= min && currentGrade <= (max || min));
        if (!inRange) continue;
      }

      missions.push({
        id:        lesson.id,
        title:     lesson.title,
        emoji:     lesson.emoji ?? subject.emoji,
        subjectId: subject.id,
        slug:      lesson.slug,
        skill:     lesson.skill,
        pathway:   subject.pathway ?? "cambridge",
        is_free:   lesson.is_free,
      });
    }
    if (missions.length >= 3) break;
  }

  // Nếu chưa đủ 3 → bổ sung bài miễn phí bất kỳ
  if (missions.length < 3) {
    for (const subject of SUBJECTS.filter((s) => s.available)) {
      for (const lesson of subject.lessons) {
        if (missions.length >= 3) break;
        if (missions.some((m) => m.id === lesson.id)) continue;
        if (!lesson.is_free) continue;
        missions.push({
          id:        lesson.id,
          title:     lesson.title,
          emoji:     lesson.emoji ?? subject.emoji,
          subjectId: subject.id,
          slug:      lesson.slug,
          skill:     lesson.skill,
          pathway:   subject.pathway ?? "cambridge",
          is_free:   lesson.is_free,
        });
      }
      if (missions.length >= 3) break;
    }
  }

  return missions.slice(0, 3);
}

// ── Skill label ────────────────────────────────────────────────────────────
const SKILL_LABEL: Record<string, string> = {
  reading:   "Đọc",
  listening: "Nghe",
  writing:   "Viết",
  math:      "Toán",
  mixed:     "Tổng hợp",
  science:   "Khoa học",
};

const SKILL_COLOR: Record<string, string> = {
  reading:   "badge-primary",
  listening: "badge-accent",
  writing:   "badge-success",
  math:      "badge-warning",
  mixed:     "badge-primary",
  science:   "badge-success",
};

// ── Component ──────────────────────────────────────────────────────────────
export function TodayMissions({ selectedPathway, currentGrade }: TodayMissionsProps) {
  const navigate  = useNavigate();
  const missions  = useMemo(
    () => buildMissions(selectedPathway, currentGrade),
    [selectedPathway, currentGrade],
  );

  if (missions.length === 0) return null;

  const pathwayLabel = selectedPathway === "cambridge"
    ? "🇬🇧 Cambridge"
    : selectedPathway === "lop6"
      ? "🏫 Lớp 6"
      : "📚 Tất cả lộ trình";

  const gradeLabel = selectedPathway === "lop6" && currentGrade
    ? ` · Lớp ${currentGrade}`
    : "";

  return (
    <div className="today-missions">
      <div className="today-missions__header">
        <h2 className="today-missions__title">🎯 Nhiệm vụ hôm nay</h2>
        <p className="today-missions__subtitle">
          {pathwayLabel}{gradeLabel} — {missions.length} bài được chọn cho bé
        </p>
      </div>

      <div className="today-missions__list">
        {missions.map((mission, i) => {
          const subject = findSubject(mission.subjectId);
          return (
            <button
              key={mission.id}
              className={`mission-card ${i === 0 ? "mission-card--highlight" : ""}`}
              onClick={() => {
                if (subject) navigate(getLessonUrl(subject, mission.slug));
              }}
              id={`btn-mission-${mission.id}`}
              style={{ "--mission-delay": `${i * 80}ms` } as React.CSSProperties}
            >
              {/* Rank badge */}
              <span className="mission-card__rank">
                {i === 0 ? "⭐" : i === 1 ? "🥈" : "🥉"}
              </span>

              {/* Emoji */}
              <span className="mission-card__emoji">{mission.emoji}</span>

              {/* Content */}
              <div className="mission-card__content">
                <span className="mission-card__title">{mission.title}</span>
                {mission.skill && (
                  <span className={`badge ${SKILL_COLOR[mission.skill] ?? "badge-primary"} mission-card__badge`}>
                    {SKILL_LABEL[mission.skill] ?? mission.skill}
                  </span>
                )}
              </div>

              {/* Arrow */}
              <span className="mission-card__arrow">→</span>

              {/* Free badge */}
              {mission.is_free && (
                <span className="mission-card__free">Miễn phí</span>
              )}
            </button>
          );
        })}
      </div>

      {/* Quick link to full pathway */}
      <button
        className="today-missions__see-all"
        onClick={() => navigate(selectedPathway ? `/${selectedPathway}` : "/learn")}
        id="btn-missions-see-all"
      >
        Xem tất cả bài học →
      </button>
    </div>
  );
}
