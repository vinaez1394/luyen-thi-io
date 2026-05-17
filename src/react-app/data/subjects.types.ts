/**
 * subjects.types.ts — Interfaces/Types cho quiz catalog
 *
 * Tách ra khỏi subjects.ts để các component chỉ cần types
 * có thể import file nhỏ này, không kéo theo 69KB data.
 *
 * subjects.ts re-export lại toàn bộ từ đây.
 */

export interface Lesson {
  /** ID file JSON trong R2 (VD: "MATH-L1-P1") */
  id: string;
  /** Slug URL — sẽ là phần sau /:subject/ (VD: "math-l1-p1") */
  slug: string;
  title: string;
  skill: "reading" | "listening" | "writing" | "math" | "mixed";
  part?: number;
  level?: string;
  questions: number;
  is_free: boolean;
  emoji: string;
  /** Hiện trong "Bài Luyện Tập" ở trang chủ? (default: true) */
  showOnHome?: boolean;
  /**
   * [Phase IA] Mức độ lớp — chỉ dùng cho lộ trình lop6
   * "3-4" = phù hợp bé lớp 3-4
   * "4-5" = phù hợp bé lớp 4-5
   * "5-6" = phù hợp bé lớp 5 chuẩn bị thi lớp 6
   */
  grade_target?: "3-4" | "4-5" | "5-6";
  /**
   * [Phase IA] Game củng cố mở ra sau khi hoàn thành bài này
   * null = không có game, bỏ qua
   */
  unlocks_game?: "hangman" | "crossword" | null;
  // ─── Reading Passage fields (dạng bài mới - Lớp 6 Tiếng Anh) ───────────
  /** Độ khó của bài — easy / medium / hard */
  difficulty?: "easy" | "medium" | "hard";
  /** Phù hợp từ lớp bao nhiêu */
  grade_min?: number;
  /** Phù hợp đến lớp bao nhiêu */
  grade_max?: number;
  /** Nằm trong pool rút đề thi thử tự động */
  in_pool?: boolean;
  /**
   * Bài được gợi ý — hiện badge "Recommended" trên card
   * Thường là bài Easy đầu tiên mỗi grade trong Reading
   */
  recommended?: boolean;
  /**
   * Thời gian ước tính hoàn thành (phút)
   * Math: ~12 phút / Reading: ~10 phút
   */
  est_minutes?: number;
  /**
   * Thumbnail image URL — hiển thị 16:9 full-image trên LessonCard
   * null / undefined = gradient fallback + emoji
   */
  image_url?: string | null;
}

export interface Subject {
  /** Slug dùng trong URL (VD: "toan-tu-duy" → /toan-tu-duy) */
  id: string;
  label: string;
  emoji: string;
  desc: string;
  /** Màu accent riêng của môn (CSS color hoặc CSS variable) */
  color: string;
  /** false = hiện badge "Sắp có", không click được */
  available: boolean;
  /**
   * [Phase IA] Lộ trình học tập
   * "cambridge" = Chứng chỉ Cambridge (Starters → Movers → Flyers → KET → PET)
   * "lop6"      = Thi tuyển sinh lớp 6 THCS (Toán / Tiếng Việt / Tiếng Anh / Khoa học)
   */
  pathway: "cambridge" | "lop6";
  /**
   * [Phase IA] Nhóm trong lộ trình
   * Cambridge: "starters" | "movers" | "flyers" | "ket" | "pet" | "ielts"
   * Lớp 6:     "toan" | "tieng-viet" | "tieng-anh" | "khoa-hoc"
   */
  group: string;
  lessons: Lesson[];
}
