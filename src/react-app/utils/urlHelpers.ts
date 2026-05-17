/**
 * urlHelpers.ts — URL Builder tập trung cho toàn bộ app
 *
 * Tất cả navigate() trong app phải dùng các hàm này.
 * KHÔNG hardcode URL dạng `/${subject.id}` ở bất kỳ đâu.
 *
 * Pattern:
 *   Cambridge: /cambridge/:group/:quizId
 *   Lớp 6:    /lop6/:group/:quizId
 */

import type { Subject } from "../data/subjects.types";



/** URL trang danh sách môn theo pathway: /cambridge hoặc /lop6 */
export function getPathwayUrl(pathway: "cambridge" | "lop6"): string {
  return `/${pathway}`;
}

/** URL trang môn học: /cambridge/flyers hoặc /lop6/toan */
export function getSubjectUrl(subject: Subject): string {
  return `/${subject.pathway}/${subject.group}`;
}

/** URL bài quiz cụ thể: /cambridge/flyers/rw001 hoặc /lop6/toan/math-l1-p1 */
export function getLessonUrl(subject: Subject, lessonSlug: string): string {
  return `/${subject.pathway}/${subject.group}/${lessonSlug}`;
}

/**
 * Đọc pathway từ URL path hiện tại
 * Dùng trong SubjectPage & QuizPage để biết đang ở lộ trình nào
 * VD: "/cambridge/flyers" → "cambridge"
 */
export function getPathwayFromPathname(pathname: string): "cambridge" | "lop6" | null {
  const segment = pathname.split("/")[1];
  if (segment === "cambridge" || segment === "lop6") return segment;
  return null;
}
