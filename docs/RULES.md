# ⛔ RULES — luyen-thi-io
> AI PHẢI TUÂN THỦ các quy tắc này trong mọi task code

---

## 🔴 TUYỆT ĐỐI KHÔNG làm

### Stack
- ❌ KHÔNG dùng Next.js (đang dùng Vite + React)
- ❌ KHÔNG dùng TailwindCSS (dùng CSS Custom Properties)
- ❌ KHÔNG dùng HTML5 Drag and Drop API (dùng dnd-kit)
- ❌ KHÔNG dùng JSON_EXTRACT trong D1 cho WHERE clause → dùng cột riêng
- ❌ KHÔNG serve audio/image qua Cloudflare Workers → dùng R2 trực tiếp
- ❌ KHÔNG lưu file JSON bài học trong codebase → lưu trên R2

### Code Style
- ❌ KHÔNG hardcode màu sắc (dùng CSS variables: `var(--color-primary)`)
- ❌ KHÔNG để font-size < 14px trong bất kỳ element nào
- ❌ KHÔNG để button height < 48px
- ❌ KHÔNG dùng `any` trong TypeScript nếu có thể tránh
- ❌ KHÔNG viết inline style trực tiếp nếu có thể dùng CSS class

### Business Logic
- ✅ SAO chỉ bị trừ trong trường hợp DUY NHẤT: Word Tooltip sau khi hết lượt miễn phí (-1⭐/lần, cho đến 0 thì khóa)
- ❌ KHÔNG trừ sao trong bất kỳ trường hợp nào khác (sai đáp án, thoát bài, v.v.)
- ❌ KHÔNG hiện quảng cáo hoặc upsell TRONG lúc bé đang làm bài
- ❌ KHÔNG copy nội dung từ đề thi Cambridge thật (bản quyền)
- ❌ KHÔNG cho bé trực tiếp upload ảnh trong MVP (chỉ preset)

---

## 🟢 LUÔN LUÔN làm

### UX cho trẻ em
- ✅ Tất cả interactive elements: min touch target 48x48px
- ✅ Font chính: Nunito (Google Fonts)
- ✅ Tất cả cards: border-radius ≥ 20px
- ✅ Feedback âm thanh + animation ngay khi bé chọn đáp án
- ✅ Dùng ngôi sao (⭐) thay vì phần trăm (%) để hiển thị kết quả
- ✅ Hướng dẫn bài thi bằng tiếng Việt (`instructions_vi` trong JSON)

### Theme
- ✅ Mọi màu đều qua CSS variables (`var(--color-primary)`)
- ✅ Apply theme: `document.documentElement.setAttribute('data-theme', theme)`
- ✅ Lưu theme vào `student_profiles.theme` trong D1

### Database D1
- ✅ Dùng cột INTEGER riêng cho skill levels (lvl_listening_p1, v.v.)
- ✅ Composite PK cho `daily_activity` (student_id, date_key)
- ✅ Cột `approval_token` trong dream_goals phải UNIQUE
- ✅ Mọi ID dùng TEXT (UUID), không dùng INTEGER auto-increment

### API (Hono)
- ✅ Prefix tất cả routes: `/api/...`
- ✅ Return JSON với format: `{ data: ..., error: null }` hoặc `{ data: null, error: "..." }`
- ✅ Validate input trước khi write vào D1

### Quiz Engine
- ✅ Mọi loại bài đều có field `instructions_vi` trong JSON
- ✅ Màn hình kết quả phải hiện: sao nhận được + animation + "Còn X sao nữa là đến Dream Box"
- ✅ Mỗi câu sai phải có `explanation_vi` để giải thích sau khi nộp
- ✅ Bài tiếng Anh (`ui_language: "en"`) → toàn bộ UI quiz bằng tiếng Anh ("Next →", "← Previous", "Submit")
- ✅ Bài tiếng Việt / Toán (`ui_language: "vi"`) → UI bằng tiếng Việt ("← Câu trước", "Câu tiếp →", "Nộp bài")
- ✅ Field `prompt` trong JSON có thể là string (cũ) hoặc array segments (mới — hỗ trợ Word Tooltip)
- ✅ Từ có tooltip: `text-decoration: underline dotted var(--color-primary)`

---

## 🟡 QUY ƯỚC ĐẶT TÊN

### Files
- Components: `PascalCase.tsx` (VD: `QuizEngine.tsx`, `DragDrop.tsx`)
- Hooks: `use + PascalCase.ts` (VD: `useStudentStats.ts`)
- Routes Hono: `kebab-case.ts` (VD: `quiz-attempts.ts`)
- JSON content: `[SKILL][PART]-[NUMBER].json` (VD: `L4-001.json`, `RW3-001.json`)

### Database
- Tên bảng: `snake_case` (VD: `student_profiles`, `dream_goals`)
- Tên cột: `snake_case` (VD: `total_stars`, `created_at`)
- Timestamp: luôn dùng `INTEGER` với `unixepoch()` (không dùng TEXT ISO date)

### CSS Classes
- BEM notation: `block__element--modifier`
- VD: `quiz-card__option--selected`, `dream-box__progress--complete`

---

## 📋 CHECKLIST TRƯỚC KHI SUBMIT CODE

- [ ] Đã đọc CONTEXT.md?
- [ ] Code có dùng CSS variables cho màu sắc không?
- [ ] Touch targets có ≥ 48px không?
- [ ] Có hướng dẫn tiếng Việt chưa?
- [ ] Có animation/sound feedback không?
- [ ] TypeScript có type đầy đủ không?
- [ ] API có validate input không?

---

*Cập nhật: 2026-04-28 | Thay đổi: Cho phép trừ sao trong Word Tooltip, thêm rules ngôn ngữ UI, thêm annotated segments format*
