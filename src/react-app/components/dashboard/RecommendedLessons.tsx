/**
 * RecommendedLessons.tsx — Grid 2-3 bài gợi ý hôm nay
 *
 * Logic recommendation (frontend, không cần API):
 *   1. Tìm skill thấp nhất từ skillLevels
 *   2. Lọc lessons của skill đó → recommend
 *   3. Nếu không có data → recommend bài dễ nhất (is_free=true) của từng môn
 *
 * Phase 07
 */

import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { HOME_LESSONS } from "../../data/subjects";
import { LessonCard } from "./LessonCard";
import type { SkillLevel } from "./SkillMap";

// ============================================
// Props
// ============================================
interface RecommendedLessonsProps {
  skills: SkillLevel[];
}

// ============================================
// Recommendation logic
// ============================================
type LessonWithSubject = (typeof HOME_LESSONS)[number];

function getRecommendations(skills: SkillLevel[]): LessonWithSubject[] {
  // Nếu không có skill data → return 3 bài đầu miễn phí
  if (skills.length === 0) {
    return HOME_LESSONS.filter((l) => l.is_free).slice(0, 3);
  }

  // Tìm skill thấp nhất
  const weakest = [...skills].sort((a, b) => a.level - b.level)[0];

  // Lấy bài của skill đó trước
  const byWeakSkill = HOME_LESSONS.filter(
    (l) => l.skill === weakest.skill && l.is_free
  );

  // Thêm bài từ skill khác để đủ 3
  const others = HOME_LESSONS.filter(
    (l) => l.skill !== weakest.skill && l.is_free
  );

  const combined = [...byWeakSkill, ...others];

  // Dedupe và slice top 3
  const seen = new Set<string>();
  const result: LessonWithSubject[] = [];
  for (const lesson of combined) {
    if (!seen.has(lesson.id) && result.length < 3) {
      seen.add(lesson.id);
      result.push(lesson);
    }
  }
  return result;
}

// ============================================
// RecommendedLessons
// ============================================
export function RecommendedLessons({ skills }: RecommendedLessonsProps) {
  const navigate = useNavigate();
  const recommendations = useMemo(() => getRecommendations(skills), [skills]);

  if (recommendations.length === 0) {
    return null;
  }

  return (
    <div className="rec-lessons">
      <div className="rec-lessons__header">
        <h2 className="rec-lessons__title">🎯 Gợi Ý Hôm Nay</h2>
        <p className="rec-lessons__subtitle">
          Được chọn dựa trên kỹ năng cần cải thiện của bé
        </p>
      </div>

      <div className="rec-lessons__grid">
        {recommendations.map((lesson, i) => (
          <LessonCard
            key={lesson.id}
            lesson={lesson}
            highlight={i === 0}
            onClick={() => navigate(`/${lesson.subjectId}/${lesson.slug}`)}
          />
        ))}
      </div>
    </div>
  );
}
