/**
 * PathwayProgress.tsx — Section 3 Dashboard: Tiến độ Lộ trình
 *
 * Cambridge: hiển thị progress theo kỳ thi đang ôn (skills: Vocabulary, Reading, Listening, Writing)
 * Lớp 6:     hiển thị progress theo 4 nhóm môn (Toán, Tiếng Việt, Tiếng Anh, Khoa học)
 *
 * Data: dựa trên skillLevels từ useDashboard() + selectedPathway + currentGrade
 * Phase sau: kết nối với quiz_attempts để tính % thực
 */

import type { SkillLevel } from "./SkillMap";
import "./PathwayProgress.css";

interface PathwayProgressProps {
  selectedPathway: string | null;
  currentGrade:    number | null;
  skillLevels:     SkillLevel[];
  /** Tên kỳ thi Cambridge đang ôn (VD: "Flyers") — lấy từ dream_goals hoặc profile */
  examName?: string | null;
}

// Cambridge skills → label và thứ tự hiển thị
const CAMBRIDGE_SKILLS = [
  { key: "reading",   label: "Reading",    emoji: "📖" },
  { key: "listening", label: "Listening",  emoji: "🎧" },
  { key: "writing",   label: "Writing",    emoji: "✍️" },
];

// Lớp 6 groups → label và emoji
const LOP6_GROUPS = [
  { key: "toan",       label: "Toán",         emoji: "🧮" },
  { key: "tieng-viet", label: "Tiếng Việt",    emoji: "📖" },
  { key: "tieng-anh",  label: "Tiếng Anh",     emoji: "🌐" },
  { key: "khoa-hoc",   label: "Khoa học",       emoji: "🔬" },
];

/** Tính % từ skill level (0–5 scale → %) */
function levelToPercent(level: number): number {
  return Math.min(100, Math.round((level / 5) * 100));
}

/** Tính tổng % trung bình từ danh sách skills */
function calcOverallPercent(skills: SkillLevel[], keys: string[]): number {
  const relevant = skills.filter((s) => keys.includes(s.skill));
  if (!relevant.length) return 0;
  const total = relevant.reduce((sum, s) => sum + levelToPercent(s.level), 0);
  return Math.round(total / relevant.length);
}

export function PathwayProgress({
  selectedPathway,
  currentGrade,
  skillLevels,
  examName,
}: PathwayProgressProps) {
  // Chưa có pathway → không render
  if (!selectedPathway) return null;

  if (selectedPathway === "cambridge") {
    const displayExam = examName ?? "Cambridge";

    return (
      <div className="pathway-progress">
        <div className="pathway-progress__header">
          <h2 className="pathway-progress__title">
            🇬🇧 Lộ trình Cambridge
          </h2>
          <span className="pathway-progress__badge pathway-progress__badge--cambridge">
            Luyện thi {displayExam}
          </span>
        </div>

        <div className="pathway-progress__skills">
          {CAMBRIDGE_SKILLS.map(({ key, label, emoji }) => {
            const skill = skillLevels.find((s) => s.skill === key);
            const percent = skill ? levelToPercent(skill.level) : 0;
            const isDone  = percent >= 100;

            return (
              <div key={key} className="pathway-skill">
                <div className="pathway-skill__label">
                  <span>{emoji} {label}</span>
                  {isDone
                    ? <span className="pathway-skill__done">✅</span>
                    : <span className="pathway-skill__pct">{percent}%</span>
                  }
                </div>
                <div className="pathway-skill__bar">
                  <div
                    className={`pathway-skill__fill ${isDone ? "pathway-skill__fill--done" : ""}`}
                    style={{ width: `${percent}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  if (selectedPathway === "lop6") {
    const gradeLabel = currentGrade ? `Lớp ${currentGrade}` : "Lớp 4–5";

    // Lop6: dùng math skill làm proxy cho Toán, các môn khác = 0 tạm thời (Phase sau: có API riêng)
    const lop6Percents: Record<string, number> = {
      toan:        calcOverallPercent(skillLevels, ["math"]),
      "tieng-anh": calcOverallPercent(skillLevels, ["reading", "listening", "writing"]),
      "tieng-viet": 0,
      "khoa-hoc":   0,
    };

    return (
      <div className="pathway-progress">
        <div className="pathway-progress__header">
          <h2 className="pathway-progress__title">
            🏫 Lộ trình Thi vào Lớp 6
          </h2>
          <span className="pathway-progress__badge pathway-progress__badge--lop6">
            Trình độ {gradeLabel}
          </span>
        </div>

        <div className="pathway-progress__groups">
          {LOP6_GROUPS.map(({ key, label, emoji }) => {
            const percent = lop6Percents[key] ?? 0;
            return (
              <div key={key} className="pathway-group">
                <div className="pathway-group__label">
                  {emoji} {label}
                </div>
                <div className="pathway-group__bar">
                  <div
                    className="pathway-group__fill"
                    style={{ width: `${percent}%` }}
                  />
                </div>
                <div className="pathway-group__pct">{percent}%</div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  return null;
}
