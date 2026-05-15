/**
 * useSubjects — Hook fetch quiz catalog từ API
 *
 * Thay thế việc đọc subjects.ts trực tiếp trong components.
 * Có fallback về subjects.ts nếu API fail (offline / dev).
 */

import { useState, useEffect } from "react";
import type { Lesson } from "../data/subjects";

interface UseSubjectsOptions {
  pathway: string;
  subject?: string;
}

export function useSubjects({ pathway, subject }: UseSubjectsOptions) {
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    const url = `/api/subjects?pathway=${pathway}${subject ? `&subject=${subject}` : ""}`;

    fetch(url)
      .then((r) => {
        if (!r.ok) throw new Error("API Subjects trả về lỗi");
        return r.json();
      })
      .then((data) => {
        if (!isMounted) return;
        setLessons(
          (data as any[]).map((row) => ({
            id: row.quiz_id,
            slug: row.slug,
            title: row.title,
            skill: row.skill,
            part: row.part,
            level: row.level,
            questions: row.questions,
            is_free: Boolean(row.is_free),
            emoji: row.emoji,
            showOnHome: Boolean(row.show_on_home),
            grade_target: row.grade_target,
            unlocks_game: row.unlocks_game,
            difficulty: row.difficulty,
            grade_min: row.grade_min,
            grade_max: row.grade_max,
            in_pool: Boolean(row.in_pool),
            recommended: Boolean(row.recommended),
            est_minutes: row.est_minutes,
            image_url: row.image_url ?? null,
          }))

        );
        setError(null);
      })
      .catch((err) => {
        console.warn("[useSubjects] API fail, sẽ dùng static fallback:", err);
        if (isMounted) {
          setError("API unavailable");
        }
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [pathway, subject]);

  return { lessons, loading, error };
}
