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

// ═══════════════════════════════════════════════════════════════════════════════
// DANH SÁCH MÔN HỌC — CHỈNH SỬA TẠI ĐÂY
// ═══════════════════════════════════════════════════════════════════════════════

export const SUBJECTS: Subject[] = [
  // ═══════════════════════════════════════════════════════════════════════════
  // LỘ TRÌNH 2: THI LỚP 6 (pathway: "lop6")
  // Nhóm Môn: Toán | Tiếng Việt | Tiếng Anh | Khoa học
  // ═══════════════════════════════════════════════════════════════════════════

  // ─── Lớp 6: Nhóm Toán Tư Duy & Logic ─────────────────────────────────────
  {
    id: "toan-tu-duy",
    label: "Toán Tư Duy",
    emoji: "🧮",
    desc: "Tư duy logic & toán học — Nhóm Toán Lớp 6",
    color: "#7c3aed",
    available: true,
    pathway: "lop6",
    group: "toan",
    lessons: [
      // 👇 THÊM BÀI TOÁN MỚI TẠI ĐÂY
      // grade_target: "3-4" = phù hợp bé đang học lớp 3–4, chuẩn bị thi lớp 6
      { id: "MATH-L1-P1",  slug: "math-l1-p1",  title: "Toán Tư Duy — Level 1 — Bài 1",  skill: "math", level: "Level 1", questions: 10, is_free: true,  emoji: "🧮", showOnHome: true,  grade_target: "3-4", est_minutes: 12, unlocks_game: "hangman" },
      { id: "MATH-L1-P2",  slug: "math-l1-p2",  title: "Toán Tư Duy — Level 1 — Bài 2",  skill: "math", level: "Level 1", questions: 10, is_free: true,  emoji: "🧮", showOnHome: true,  grade_target: "3-4", est_minutes: 12, unlocks_game: "hangman" },
      { id: "MATH-L1-P3",  slug: "math-l1-p3",  title: "Toán Tư Duy — Level 1 — Bài 3",  skill: "math", level: "Level 1", questions: 10, is_free: true,  emoji: "🧮", showOnHome: true,  grade_target: "3-4", est_minutes: 12, unlocks_game: "hangman" },
      { id: "MATH-L1-P4",  slug: "math-l1-p4",  title: "Toán Tư Duy — Level 1 — Bài 4",  skill: "math", level: "Level 1", questions: 10, is_free: true,  emoji: "🧮", showOnHome: false, grade_target: "3-4", est_minutes: 12, unlocks_game: "hangman" },
      { id: "MATH-L1-P5",  slug: "math-l1-p5",  title: "Toán Tư Duy — Level 1 — Bài 5",  skill: "math", level: "Level 1", questions: 10, is_free: true,  emoji: "🧮", showOnHome: false, grade_target: "3-4", est_minutes: 12, unlocks_game: "hangman" },
      { id: "MATH-L1-P6",  slug: "math-l1-p6",  title: "Toán Tư Duy — Level 1 — Bài 6",  skill: "math", level: "Level 1", questions: 10, is_free: false, emoji: "🧮", showOnHome: false, grade_target: "3-4", est_minutes: 12, unlocks_game: "hangman" },
      { id: "MATH-L1-P7",  slug: "math-l1-p7",  title: "Toán Tư Duy — Level 1 — Bài 7",  skill: "math", level: "Level 1", questions: 10, is_free: false, emoji: "🧮", showOnHome: false, grade_target: "3-4", est_minutes: 12, unlocks_game: "hangman" },
      { id: "MATH-L1-P8",  slug: "math-l1-p8",  title: "Toán Tư Duy — Level 1 — Bài 8",  skill: "math", level: "Level 1", questions: 10, is_free: false, emoji: "🧮", showOnHome: false, grade_target: "3-4", est_minutes: 12, unlocks_game: "hangman" },
      { id: "MATH-L1-P9",  slug: "math-l1-p9",  title: "Toán Tư Duy — Level 1 — Bài 9",  skill: "math", level: "Level 1", questions: 10, is_free: false, emoji: "🧮", showOnHome: false, grade_target: "5-6", est_minutes: 12, unlocks_game: "hangman" },
      { id: "MATH-L1-P10", slug: "math-l1-p10", title: "Toán Tư Duy — Level 1 — Bài 10", skill: "math", level: "Level 1", questions: 10, is_free: false, emoji: "🧮", showOnHome: false, grade_target: "5-6", est_minutes: 12, unlocks_game: "hangman" },
    ],
  },

  // ─── Lớp 6: Nhóm Tiếng Việt (sắp có) ──────────────────────────────────────
  {
    id: "tieng-viet-l6",
    label: "Tiếng Việt Lớp 6",
    emoji: "📖",
    desc: "Ngôn ngữ & Cảm thụ — Nhóm Tiếng Việt Lớp 6",
    color: "#dc2626",
    available: false,
    pathway: "lop6",
    group: "tieng-viet",
    lessons: [],
  },

  // ─── Lớp 6: Nhóm Tiếng Anh ─────────────────────────────────────────────
  {
    id: "tieng-anh-l6",
    label: "English — Luyện Thi Lớp 6",
    emoji: "🇬🇧",
    desc: "Reading Comprehension — Grade 6 Entrance Exam Practice",
    color: "#0891b2",
    available: true,
    pathway: "lop6",
    group: "tieng-anh",
    lessons: [
      // ──────────────── EASY ────────────────────────────────────────────────
      // Slug phẳng để tránh React Router wildcard issue với "/" trong URL
      {
        id:          "READING-EASY-GRADE3-P1",
        slug:        "reading-easy-grade3-p1",
        title:       "Reading Comprehension — Easy — Grade 3-4",
        skill:       "reading",
        questions:   8,
        is_free:     true,
        emoji:       "📖",
        showOnHome:  true,
        difficulty:  "easy",
        grade_min:   3,
        grade_max:   4,
        grade_target: "3-4",
        in_pool:     true,
        recommended: true,
        est_minutes: 10,
      },
      {
        id:          "READING-EASY-GRADE4-P1",
        slug:        "reading-easy-grade4-p1",
        title:       "Reading Comprehension — Easy — Grade 4-5",
        skill:       "reading",
        questions:   8,
        is_free:     true,
        emoji:       "📖",
        showOnHome:  false,
        difficulty:  "easy",
        grade_min:   4,
        grade_max:   5,
        grade_target: "4-5",
        in_pool:     true,
        recommended: true,
        est_minutes: 10,
      },
      {
        id:          "READING-EASY-GRADE5-P1",
        slug:        "reading-easy-grade5-p1",
        title:       "Reading Comprehension — Easy — Grade 5-6",
        skill:       "reading",
        questions:   8,
        is_free:     true,
        emoji:       "📖",
        showOnHome:  false,
        difficulty:  "easy",
        grade_min:   5,
        grade_max:   6,
        grade_target: "5-6",
        in_pool:     true,
        recommended: true,
        est_minutes: 10,
      },
      // ──────────────── MEDIUM ──────────────────────────────────────────────
      {
        id:         "READING-MED-GRADE3-P1",
        slug:       "reading-med-grade3-p1",
        title:      "Reading Comprehension — Medium — Grade 3-4",
        skill:      "reading",
        questions:  8,
        is_free:    true,
        emoji:      "📚",
        showOnHome: false,
        difficulty: "medium",
        grade_min:  3,
        grade_max:  4,
        grade_target: "3-4",
        est_minutes:  10,
        in_pool:    true,
      },
      {
        id:         "READING-MED-GRADE4-P1",
        slug:       "reading-med-grade4-p1",
        title:      "Reading Comprehension — Medium — Grade 4-5",
        skill:      "reading",
        questions:  8,
        is_free:    true,
        emoji:      "📚",
        showOnHome: false,
        difficulty: "medium",
        grade_min:  4,
        grade_max:  5,
        grade_target: "4-5",
        est_minutes:  10,
        in_pool:    true,
      },
      {
        id:         "READING-MED-GRADE5-P1",
        slug:       "reading-med-grade5-p1",
        title:      "Reading Comprehension — Medium — Grade 5-6",
        skill:      "reading",
        questions:  8,
        is_free:    true,
        emoji:      "📚",
        showOnHome: false,
        difficulty: "medium",
        grade_min:  5,
        grade_max:  6,
        grade_target: "5-6",
        est_minutes:  10,
        in_pool:    true,
      },
      // ──────────────── HARD ────────────────────────────────────────────────
      {
        id:         "READING-HARD-GRADE3-P1",
        slug:       "reading-hard-grade3-p1",
        title:      "Reading Comprehension — Hard — Grade 3-4",
        skill:      "reading",
        questions:  8,
        is_free:    true,
        emoji:      "🏆",
        showOnHome: false,
        difficulty: "hard",
        grade_min:  3,
        grade_max:  4,
        grade_target: "3-4",
        est_minutes:  10,
        in_pool:    true,
      },
      {
        id:         "READING-HARD-GRADE4-P1",
        slug:       "reading-hard-grade4-p1",
        title:      "Reading Comprehension — Hard — Grade 4-5",
        skill:      "reading",
        questions:  8,
        is_free:    true,
        emoji:      "🏆",
        showOnHome: false,
        difficulty: "hard",
        grade_min:  4,
        grade_max:  5,
        grade_target: "4-5",
        est_minutes:  10,
        in_pool:    true,
      },
      {
        id:         "READING-HARD-GRADE5-P1",
        slug:       "reading-hard-grade5-p1",
        title:      "Reading Comprehension — Hard — Grade 5-6",
        skill:      "reading",
        questions:  8,
        is_free:    true,
        emoji:      "🏆",
        showOnHome: false,
        difficulty: "hard",
        grade_min:  5,
        grade_max:  6,
        grade_target: "5-6",
        est_minutes:  10,
        in_pool:    true,
      },
      // ── P2 Series ────────────────────────────────────────────────────────────
      {
        id:         "READING-EASY-GRADE3-P2",
        slug:       "reading-easy-grade3-p2",
        title:      "Reading Comprehension — Easy — Grade 3-4 — Set 2",
        skill:      "reading",
        questions:  8,
        is_free:    true,
        emoji:      "📖",
        showOnHome: false,
        difficulty: "easy",
        grade_min:  3,
        grade_max:  4,
        grade_target: "3-4",
        est_minutes:  10,
        in_pool:    true,
      },
      {
        id:         "READING-EASY-GRADE4-P2",
        slug:       "reading-easy-grade4-p2",
        title:      "Reading Comprehension — Easy — Grade 4-5 — Set 2",
        skill:      "reading",
        questions:  8,
        is_free:    true,
        emoji:      "📖",
        showOnHome: false,
        difficulty: "easy",
        grade_min:  4,
        grade_max:  5,
        grade_target: "4-5",
        est_minutes:  10,
        in_pool:    true,
      },
      {
        id:         "READING-EASY-GRADE5-P2",
        slug:       "reading-easy-grade5-p2",
        title:      "Reading Comprehension — Easy — Grade 5-6 — Set 2",
        skill:      "reading",
        questions:  8,
        is_free:    true,
        emoji:      "📖",
        showOnHome: false,
        difficulty: "easy",
        grade_min:  5,
        grade_max:  6,
        grade_target: "5-6",
        est_minutes:  10,
        in_pool:    true,
      },
      {
        id:         "READING-MED-GRADE3-P2",
        slug:       "reading-med-grade3-p2",
        title:      "Reading Comprehension — Medium — Grade 3-4 — Set 2",
        skill:      "reading",
        questions:  8,
        is_free:    true,
        emoji:      "📗",
        showOnHome: false,
        difficulty: "medium",
        grade_min:  3,
        grade_max:  4,
        grade_target: "3-4",
        est_minutes:  10,
        in_pool:    true,
      },
      {
        id:         "READING-MED-GRADE4-P2",
        slug:       "reading-med-grade4-p2",
        title:      "Reading Comprehension — Medium — Grade 4-5 — Set 2",
        skill:      "reading",
        questions:  8,
        is_free:    true,
        emoji:      "📗",
        showOnHome: false,
        difficulty: "medium",
        grade_min:  4,
        grade_max:  5,
        grade_target: "4-5",
        est_minutes:  10,
        in_pool:    true,
      },
      {
        id:         "READING-MED-GRADE5-P2",
        slug:       "reading-med-grade5-p2",
        title:      "Reading Comprehension — Medium — Grade 5-6 — Set 2",
        skill:      "reading",
        questions:  8,
        is_free:    true,
        emoji:      "📗",
        showOnHome: false,
        difficulty: "medium",
        grade_min:  5,
        grade_max:  6,
        grade_target: "5-6",
        est_minutes:  10,
        in_pool:    true,
      },
      {
        id:         "READING-HARD-GRADE3-P2",
        slug:       "reading-hard-grade3-p2",
        title:      "Reading Comprehension — Hard — Grade 3-4 — Set 2",
        skill:      "reading",
        questions:  8,
        is_free:    true,
        emoji:      "🏆",
        showOnHome: false,
        difficulty: "hard",
        grade_min:  3,
        grade_max:  4,
        grade_target: "3-4",
        est_minutes:  10,
        in_pool:    true,
      },
      {
        id:         "READING-HARD-GRADE4-P2",
        slug:       "reading-hard-grade4-p2",
        title:      "Reading Comprehension — Hard — Grade 4-5 — Set 2",
        skill:      "reading",
        questions:  8,
        is_free:    true,
        emoji:      "🏆",
        showOnHome: false,
        difficulty: "hard",
        grade_min:  4,
        grade_max:  5,
        grade_target: "4-5",
        est_minutes:  10,
        in_pool:    true,
      },
      {
        id:         "READING-HARD-GRADE5-P2",
        slug:       "reading-hard-grade5-p2",
        title:      "Reading Comprehension — Hard — Grade 5-6 — Set 2",
        skill:      "reading",
        questions:  8,
        is_free:    true,
        emoji:      "🏆",
        showOnHome: false,
        difficulty: "hard",
        grade_min:  5,
        grade_max:  6,
        grade_target: "5-6",
        est_minutes:  10,
        in_pool:    true,
      },
    ],
  },


  // ─── Lớp 6: Nhóm Khoa học & Xã hội (sắp có) ───────────────────────────────
  {
    id: "khoa-hoc-l6",
    label: "Khoa học & Xã hội",
    emoji: "🔬",
    desc: "KHTN & KHXH — Nhóm Khoa học Lớp 6",
    color: "#16a34a",
    available: false,
    pathway: "lop6",
    group: "khoa-hoc",
    lessons: [],
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // LỘ TRÌNH 1: CAMBRIDGE (pathway: "cambridge")
  // Cấp độ: Starters → Movers → Flyers → KET → PET
  // ═══════════════════════════════════════════════════════════════════════════

  // ─── Cambridge Flyers ────────────────────────────────────────────────────
  {
    id: "flyers",
    label: "Cambridge Flyers",
    emoji: "🇬🇧",
    desc: "Trình độ A2 — 9 đến 12 tuổi",
    color: "#6366f1",
    available: true,
    pathway: "cambridge",
    group: "flyers",
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
        unlocks_game: "hangman",
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
        unlocks_game: "hangman",
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
        unlocks_game: "hangman",
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
    pathway: "cambridge",
    group: "movers",
    lessons: [],
  },

  // ─── Cambridge Starters ──────────────────────────────────────────────────
  {
    id: "starters",
    label: "Cambridge Starters",
    emoji: "⭐",
    desc: "Pre-A1 — 5 đến 7 tuổi",
    color: "#f97316",
    available: false,
    pathway: "cambridge",
    group: "starters",
    lessons: [],
  },

  // ─── Cambridge KET ───────────────────────────────────────────────────────
  {
    id: "ket",
    label: "Cambridge KET",
    emoji: "📘",
    desc: "Key English Test — A2",
    color: "#f59e0b",
    available: false,
    pathway: "cambridge",
    group: "ket",
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
    pathway: "cambridge",
    group: "pet",
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
    pathway: "cambridge",
    group: "ielts",
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

// ═══════════════════════════════════════════════════════════════════════════════
// [Phase IA] PATHWAY HELPERS — Dùng cho routing /cambridge và /lop6
// ═══════════════════════════════════════════════════════════════════════════════

/** Tất cả môn Cambridge (để render CambridgePage) */
export const getCambridgeSubjects = () =>
  SUBJECTS.filter((s) => s.pathway === "cambridge");

/** Tất cả môn Lớp 6 (để render Lop6Page) */
export const getLop6Subjects = () =>
  SUBJECTS.filter((s) => s.pathway === "lop6");

/** Tìm môn theo pathway + group (URL: /cambridge/flyers → findByPathwayGroup("cambridge","flyers")) */
export const findByPathwayGroup = (pathway: string, group: string) =>
  SUBJECTS.find((s) => s.pathway === pathway && s.group === group) ?? null;

/** Lấy tất cả môn theo pathway */
export const getSubjectsByPathway = (pathway: "cambridge" | "lop6") =>
  SUBJECTS.filter((s) => s.pathway === pathway);
