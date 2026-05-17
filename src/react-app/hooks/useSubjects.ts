/**
 * useSubjects — Hook lấy danh sách bài học
 *
 * Chiến lược 2 nguồn:
 * 1. subjects.ts (static) → base list, render ngay, không flash
 * 2. /api/subjects (D1) → bổ sung image_url + metadata động sau khi mount
 *
 * Kết quả: UI render nhanh, ảnh thumbnail luôn đúng theo D1/CDN
 * Fallback: Nếu API lỗi → vẫn dùng subjects.ts (có image_url từ sync script)
 */

import { useState, useEffect } from "react";
import type { Lesson } from "../data/subjects";
import { findByPathwayGroup } from "../data/subjects";

interface UseSubjectsOptions {
  pathway: string;
  subject?: string;
}

export function useSubjects({ pathway, subject }: UseSubjectsOptions) {
  const subjectMeta = subject ? findByPathwayGroup(pathway, subject) : null;
  const baseLessons: Lesson[] = subjectMeta?.lessons ?? [];

  const [lessons, setLessons] = useState<Lesson[]>(baseLessons);
  const [loading] = useState(false);
  const [error] = useState<string | null>(null);

  useEffect(() => {
    if (!pathway || !subject || baseLessons.length === 0) return;

    // Fetch image_url + metadata từ API (D1) — không block render
    const controller = new AbortController();
    fetch(`/api/subjects?pathway=${encodeURIComponent(pathway)}&subject=${encodeURIComponent(subject)}`, {
      signal: controller.signal,
    })
      .then((res) => (res.ok ? res.json() : null))
      .then((apiData: Record<string, unknown>[] | null) => {
        if (!apiData || !Array.isArray(apiData)) return;

        // Build lookup map: quiz_id → { image_url, ... }
        const apiMap = new Map<string, Record<string, unknown>>();
        for (const item of apiData) {
          if (item.quiz_id && typeof item.quiz_id === "string") {
            apiMap.set(item.quiz_id, item);
          }
        }

        // Merge: giữ tất cả lessons từ subjects.ts,
        // chỉ override image_url (và các trường có trong API mà subjects.ts thiếu)
        const merged = baseLessons.map((lesson) => {
          const api = apiMap.get(lesson.id);
          if (!api) return lesson;
          return {
            ...lesson,
            // Override image_url từ API nếu API có và subjects.ts không có (hoặc khác)
            image_url: (api.image_url as string | null) ?? lesson.image_url ?? null,
          };
        });

        setLessons(merged);
      })
      .catch(() => {
        // API lỗi → giữ nguyên subjects.ts data (đã có image_url từ sync script)
      });

    return () => controller.abort();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathway, subject]);

  return { lessons, loading, error };
}
