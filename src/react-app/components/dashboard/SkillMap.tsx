/**
 * SkillMap.tsx — Progress bars cho 3 kỹ năng (Reading, Listening, Math...)
 *
 * Level tính theo 0–5 (5 là master), hiển thị dạng:
 *   📖 Đọc   ████░  Level 4
 *   👂 Nghe  ███░░  Level 3
 *   🧮 Toán  ██░░░  Level 2  ← Cần luyện thêm
 *
 * Phase 07
 */

export interface SkillLevel {
  skill: "reading" | "listening" | "writing" | "math";
  level: number;   // 0–5
  quizzesDone: number;
}

interface SkillMapProps {
  skills: SkillLevel[];
}

// ============================================
// Config per skill
// ============================================
const SKILL_CONFIG: Record<string, { label: string; emoji: string; color: string }> = {
  reading:   { label: "Đọc hiểu",   emoji: "📖", color: "var(--color-primary)" },
  listening: { label: "Lắng nghe",  emoji: "👂", color: "#a855f7" },
  writing:   { label: "Viết",       emoji: "✍️",  color: "#f59e0b" },
  math:      { label: "Toán",       emoji: "🧮", color: "#10b981" },
};

const MAX_LEVEL = 5;

function LevelBar({ level, color }: { level: number; color: string }) {
  const pct = Math.min(100, (level / MAX_LEVEL) * 100);
  return (
    <div className="skill-bar__wrap" role="progressbar" aria-valuenow={level} aria-valuemin={0} aria-valuemax={MAX_LEVEL}>
      <div
        className="skill-bar__fill"
        style={{ width: `${pct}%`, background: color }}
      />
    </div>
  );
}

// ============================================
// SkillMap
// ============================================
export function SkillMap({ skills }: SkillMapProps) {
  if (skills.length === 0) {
    return (
      <div className="skill-map skill-map--empty">
        <p>Chưa có dữ liệu kỹ năng. Hãy làm một vài bài để bắt đầu!</p>
      </div>
    );
  }

  // Sắp xếp: skill thấp nhất lên đầu (cần luyện thêm)
  const sorted = [...skills].sort((a, b) => a.level - b.level);
  const weakest = sorted[0];

  return (
    <div className="skill-map">
      <div className="skill-map__header">
        <h2 className="skill-map__title">📊 Kỹ Năng Của Con</h2>
        {weakest && weakest.level < MAX_LEVEL && (
          <span className="skill-map__hint">
            💡 Cần luyện thêm: {SKILL_CONFIG[weakest.skill]?.label}
          </span>
        )}
      </div>

      <div className="skill-map__list">
        {sorted.map((s) => {
          const cfg = SKILL_CONFIG[s.skill] ?? { label: s.skill, emoji: "📘", color: "var(--color-primary)" };
          const isWeak = s === weakest && s.level < MAX_LEVEL;

          return (
            <div key={s.skill} className={`skill-row${isWeak ? " skill-row--weak" : ""}`}>
              <span className="skill-row__emoji" aria-hidden="true">{cfg.emoji}</span>
              <div className="skill-row__body">
                <div className="skill-row__top">
                  <span className="skill-row__label">{cfg.label}</span>
                  <span className="skill-row__level" style={{ color: cfg.color }}>
                    Level {s.level}/{MAX_LEVEL}
                  </span>
                </div>
                <LevelBar level={s.level} color={cfg.color} />
                <span className="skill-row__done">{s.quizzesDone} bài đã làm</span>
              </div>
              {isWeak && <span className="skill-row__weak-badge">Cần luyện</span>}
            </div>
          );
        })}
      </div>
    </div>
  );
}
