/**
 * subjects.ts — NGUỒN SỰ THẬT DUY NHẤT cho tất cả môn học và bài học
 *
 * ╔══════════════════════════════════════════════════════════════════════╗
 * ║ ĐỂ THÊM BÀI HỌC MỚI: chỉ cần thêm vào mảng `lessons` của môn tương ứng ║
 * ║ Bài sẽ tự động xuất hiện ở:                                        ║
 * ║   - Section "Chinh Phục Môn Học" (HomePage)                        ║
 * ║   - Section "Bài Luyện Tập" (HomePage)                             ║
 * ║   - Trang môn học (SubjectPage)                                     ║
 * ║   - Dropdown menu "Môn học" (GlobalHeader)                         ║
 * ╚══════════════════════════════════════════════════════════════════════╝
 *
 * ĐỂ THÊM MÔN HỌC MỚI: thêm 1 object vào mảng SUBJECTS bên dưới
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
  lessons: Lesson[];
}

// ═══════════════════════════════════════════════════════════════════════════════
// DANH SÁCH MÔN HỌC — CHỈNH SỬA TẠI ĐÂY
// ═══════════════════════════════════════════════════════════════════════════════

export const SUBJECTS: Subject[] = [
  // ─── Toán Tư Duy ─────────────────────────────────────────────────────────
  {
    id: "toan-tu-duy",
    label: "Toán Tư Duy",
    emoji: "🧮",
    desc: "Tư duy logic & toán học",
    color: "#7c3aed",
    available: true,
    lessons: [
      // 👇 THÊM BÀI TOÁN MỚI TẠI ĐÂY
      {
        id: "MATH-L1-P1",
        slug: "math-l1-p1",
        title: "Toán Tư Duy — Level 1 — Bài 1",
        skill: "math",
        level: "Level 1",
        questions: 10,
        is_free: true,
        emoji: "🧮",
        showOnHome: true,
      },
      {
        id: "MATH-L1-P2",
        slug: "math-l1-p2",
        title: "Toán Tư Duy — Level 1 — Bài 2",
        skill: "math",
        level: "Level 1",
        questions: 10,
        is_free: true,
        emoji: "🧮",
        showOnHome: true,
      },
      {
        id: "MATH-L1-P3",
        slug: "math-l1-p3",
        title: "Toán Tư Duy — Level 1 — Bài 3",
        skill: "math",
        level: "Level 1",
        questions: 10,
        is_free: true,
        emoji: "🧮",
        showOnHome: true,
      },
      {
        id: "MATH-L1-P5",
        slug: "math-l1-p5",
        title: "Toán Tư Duy — Level 1 — Bài 5",
        skill: "math",
        level: "Level 1",
        questions: 10,
        is_free: true,
        emoji: "🧮",
        showOnHome: true,
      },
    ],
  },

  // ─── Cambridge Flyers ────────────────────────────────────────────────────
  {
    id: "flyers",
    label: "Cambridge Flyers",
    emoji: "🇬🇧",
    desc: "Trình độ A2 — 9 đến 12 tuổi",
    color: "#6366f1",
    available: true,
    lessons: [
      // 👇 THÊM BÀI FLYERS MỚI TẠI ĐÂY
      {
        id: "RW001",
        slug: "rw001",
        title: "Reading Part 4 — Matching",
        skill: "reading",
        part: 4,
        level: "Flyers",
        questions: 6,
        is_free: true,
        emoji: "📖",
        showOnHome: true,
      },
      {
        id: "L001",
        slug: "l001",
        title: "Listening Part 1 — Chọn đáp án",
        skill: "listening",
        part: 1,
        level: "Flyers",
        questions: 5,
        is_free: true,
        emoji: "🎧",
        showOnHome: true,
      },
      {
        id: "RW002",
        slug: "rw002",
        title: "Reading Part 3 — Điền từ",
        skill: "reading",
        part: 3,
        level: "Flyers",
        questions: 5,
        is_free: true,
        emoji: "✍️",
        showOnHome: true,
      },
      {
        id: "L002",
        slug: "l002",
        title: "Listening Part 4 — Nghe và nối",
        skill: "listening",
        part: 4,
        level: "Flyers",
        questions: 5,
        is_free: false,
        emoji: "🎵",
        showOnHome: false,
      },
      {
        id: "RW003",
        slug: "rw003",
        title: "Reading Part 1 — Câu hỏi tranh",
        skill: "reading",
        part: 1,
        level: "Flyers",
        questions: 5,
        is_free: false,
        emoji: "🖼️",
        showOnHome: false,
      },
      {
        id: "L003",
        slug: "l003",
        title: "Listening Part 2 — Điền thông tin",
        skill: "listening",
        part: 2,
        level: "Flyers",
        questions: 5,
        is_free: false,
        emoji: "📝",
        showOnHome: false,
      },
    ],
  },

  // ─── Cambridge Movers ────────────────────────────────────────────────────
  {
    id: "movers",
    label: "Cambridge Movers",
    emoji: "🐣",
    desc: "Trình độ A1 — 7 đến 9 tuổi",
    color: "#10b981",
    available: false,
    lessons: [
      // 👇 THÊM BÀI MOVERS MỚI TẠI ĐÂY
    ],
  },

  // ─── Cambridge KET ───────────────────────────────────────────────────────
  {
    id: "ket",
    label: "Cambridge KET",
    emoji: "📘",
    desc: "Key English Test — A2",
    color: "#f59e0b",
    available: false,
    lessons: [],
  },

  // ─── Cambridge PET ───────────────────────────────────────────────────────
  {
    id: "pet",
    label: "Cambridge PET",
    emoji: "📗",
    desc: "Preliminary English Test — B1",
    color: "#ef4444",
    available: false,
    lessons: [],
  },

  // ─── IELTS ───────────────────────────────────────────────────────────────
  {
    id: "ielts",
    label: "IELTS Cơ Bản",
    emoji: "🌍",
    desc: "Luyện nền tảng IELTS",
    color: "#8b5cf6",
    available: false,
    lessons: [],
  },
];

// ═══════════════════════════════════════════════════════════════════════════════
// HELPERS — Không cần chỉnh sửa
// ═══════════════════════════════════════════════════════════════════════════════

/** Tất cả bài học có showOnHome: true — dùng cho section "Bài Luyện Tập" */
export const HOME_LESSONS = SUBJECTS.flatMap((s) =>
  s.lessons
    .filter((l) => l.showOnHome !== false)
    .map((l) => ({ ...l, subjectId: s.id, subjectLabel: s.label }))
);

/** Tất cả bài học (bao gồm cả premium) */
export const ALL_LESSONS = SUBJECTS.flatMap((s) =>
  s.lessons.map((l) => ({ ...l, subjectId: s.id, subjectLabel: s.label }))
);

/** Tìm môn học theo slug */
export const findSubject = (id: string) =>
  SUBJECTS.find((s) => s.id === id) ?? null;
