# 💡 BRIEF: luyen-thi-io — Nền tảng Luyện Thi Tiếng Anh Cambridge

**Ngày tạo:** 2026-04-28  
**Dự án:** `luyen-thi-io` (Cloudflare Workers + Vite + React + Hono)  
**Tập trung MVP:** Cambridge A2 Flyers — 4 kỹ năng Nghe/Đọc/Viết/Nói  

---

## 1. VẤN ĐỀ CẦN GIẢI QUYẾT

Học sinh Việt Nam thi chứng chỉ Cambridge Flyers thiếu một nền tảng **thực hành trực tuyến** đúng format thi, có tính tương tác cao, và phù hợp với lứa tuổi. Các tài nguyên hiện có hoặc là bản PDF tĩnh, hoặc là website nước ngoài không phù hợp văn hóa/ngữ cảnh học sinh Việt Nam.

---

## 2. GIẢI PHÁP ĐỀ XUẤT

Xây dựng **"Template/Player" kiến trúc JSON-driven**: Thay vì code 100 bài riêng lẻ, tạo **1 engine thông minh** đọc file JSON và render đúng dạng bài (trắc nghiệm, kéo thả, điền từ...). Nội dung bài học chỉ là data, không phải code.

---

## 3. ĐỐI TƯỢNG SỬ DỤNG

| Nhóm | Mô tả |
|------|-------|
| **Primary** | Học sinh 9–12 tuổi chuẩn bị thi Flyers |
| **Secondary** | Phụ huynh theo dõi tiến độ, giáo viên giao bài |
| **Tertiary** | Học sinh Movers (dễ hơn) và KET/PET (khó hơn) — Phase 2+ |

---

## 4. NGHIÊN CỨU THỊ TRƯỜNG

### 4.1 Đối thủ & Phân tích

| Nền tảng | Điểm mạnh | Điểm yếu | Cơ hội cho mình |
|----------|-----------|----------|----------------|
| **Cambridge One** | Official, đúng format thi | Trả phí cao, UI không thân thiện trẻ VN | Giá rẻ hơn, UX đẹp hơn cho trẻ VN |
| **ieltsonlinetests.com** | Nhiều đề, free tier | Chỉ IELTS, không có Flyers | Tập trung Flyers/Movers — thị trường ngách |
| **Duolingo** | Gamification xuất sắc | Không có format thi Cambridge chuẩn | Gamify nhưng đúng format thi |
| **British Council LearnEnglish** | Uy tín, miễn phí | UX cũ, không cá nhân hóa | Dashboard phụ huynh + báo cáo thông minh |
| **PREP.vn / IELTS Fighter** | Nội dung Việt hóa | IELTS/TOEIC only, giá cao | Cambridge YLE — thị trường chưa ai khai thác tốt |
| **Monkey Junior / Topica Kids** | Thiếu nhi VN đúng thị trường | Học từ vựng chung, không luyện thi | **Luyện thi Cambridge có hệ thống** |

### 4.2 Điểm Khác Biệt (Unique Selling Points)

1. **Đúng format thi Cambridge Flyers 100%** — không phải luyện tiếng Anh chung chung
2. **JSON-driven = cập nhật đề nhanh** — thêm đề mới không cần code
3. **Báo cáo thông minh** — biết đúng "con yếu phần nào"
4. **Giá Việt Nam** — rẻ hơn Cambridge One 3–5 lần
5. **Hướng dẫn bằng tiếng Việt** — tất cả platform nước ngoài đều bằng tiếng Anh, học sinh lớp 4–5 không đọc được → **đây là lợi thế cạnh tranh thực sự**

---

## 5. CẤU TRÚC BÀI THI FLYERS (Engine phải hỗ trợ)

### Listening (5 Parts)

| Part | Dạng bài | UI cần làm |
|------|----------|------------|
| Part 1 | Nghe + match tên với người trong tranh | Kéo thả label lên hình |
| Part 2 | Nghe + điền form/notebook | Input text + audio |
| Part 3 | Nghe + match hình với chữ | Kéo thả / chọn |
| Part 4 | Nghe 5 đoạn + chọn hình đúng (3 lựa chọn) | Multiple choice với hình |
| Part 5 | Nghe + tô màu / vẽ / viết lên hình | **Phase 2** (phức tạp nhất) |

### Reading & Writing (7 Parts)

| Part | Dạng bài | UI cần làm |
|------|----------|------------|
| Part 1 | Match 10 từ với 15 định nghĩa | Kéo thả / chọn |
| Part 2 | Chọn câu điền vào hội thoại (A–H) | Kéo thả / dropdown |
| Part 3 | Chọn từ điền vào chỗ trống (word bank) | Kéo thả / dropdown |
| Part 4 | Multiple choice 3 lựa chọn | Multiple choice |
| Part 5 | Đọc truyện + hoàn thành câu (1–3 từ) | Input text |
| Part 6 | Điền 1 từ vào chỗ trống | Input text |
| Part 7 | Xem hình + viết câu | Text area |

### Speaking
> ⚠️ **Phase 3** — Cần AI speech recognition. Skip hoàn toàn trong MVP.

---

## 6. KIẾN TRÚC ĐỀ XUẤT — JSON-DRIVEN ENGINE

```
📁 content/ (lưu trên Cloudflare R2)
   └── flyers/
       ├── listening/
       │   ├── L001.json    ← Đề Listening bài 1
       │   └── L002.json
       └── reading/
           ├── RW001.json
           └── RW002.json

🌐 Template/Player (React + Hono)
   └── Đọc JSON → Render đúng loại bài
       ├── type: "multiple-choice"  → Component MultipleChoice
       ├── type: "drag-drop"       → Component DragDrop
       ├── type: "fill-blank"      → Component FillBlank
       └── type: "matching"        → Component Matching
```

### Cấu trúc JSON mẫu (Multiple Choice với hình)

```json
{
  "id": "flyers-listening-001",
  "title": "Listening Practice Test 1",
  "skill": "listening",
  "level": "flyers",
  "part": 4,
  "type": "multiple-choice-image",
  "audio_url": "/audio/flyers-L001-p4.mp3",
  "questions": [
    {
      "id": "q1",
      "prompt": "What did Tom have for breakfast?",
      "options": [
        { "id": "a", "image": "/img/bread.png" },
        { "id": "b", "image": "/img/cereal.png" },
        { "id": "c", "image": "/img/egg.png" }
      ],
      "correct": "b",
      "explanation": "Tom said he had cereal this morning."
    }
  ]
}
```

---

## 7. QUYẾT ĐỊNH DATABASE — ⭐ KHUYẾN NGHỊ: D1 + R2 (Không cần VPS)

> **Bài toán của anh là read-heavy** (học sinh đọc đề >> ghi điểm). D1 là lựa chọn tối ưu.

### So sánh

| Tiêu chí | Cloudflare D1 | PostgreSQL VPS |
|----------|--------------|----------------|
| **Chi phí** | Free tier rộng, pay-per-use | ~$5–20/tháng VPS |
| **Độ trễ** | Cực thấp (edge, toàn cầu) | Phụ thuộc vị trí VPS |
| **Giới hạn** | 10GB/database, SQLite | Không giới hạn |
| **Tích hợp CF** | Native, zero-config | Cần config thêm |
| **Backup** | Tự động CF | Tự quản lý |
| **Phù hợp** | Read-heavy, simple schema ✅ | Write-heavy, complex queries |

### Hybrid Architecture (Đề xuất)

```
📊 Cloudflare D1 (SQLite at Edge):
   ✅ users, subscriptions, quiz_results, progress
   → Đọc nhiều lần/ngày, ít ghi, cần tốc độ cao

📁 Cloudflare R2 (Object Storage):
   ✅ File JSON bài học, audio MP3, hình ảnh
   → Thay thế hoàn toàn cho việc lưu content

🔧 VPS PostgreSQL (nếu cần sau này):
   → Analytics phức tạp (sync từ D1 mỗi ngày)
   → Chỉ cần khi > 10,000 users thực sự
```

### Schema D1 gợi ý (MVP)

```sql
CREATE TABLE users (
  id TEXT PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  name TEXT,
  google_id TEXT UNIQUE,
  subscription_tier TEXT DEFAULT 'free',
  created_at INTEGER DEFAULT (unixepoch())
);

CREATE TABLE quiz_attempts (
  id TEXT PRIMARY KEY,
  user_id TEXT REFERENCES users(id),
  quiz_id TEXT NOT NULL,
  score INTEGER,
  max_score INTEGER,
  answers_json TEXT,
  time_spent INTEGER,
  completed_at INTEGER DEFAULT (unixepoch())
);

CREATE TABLE subscriptions (
  id TEXT PRIMARY KEY,
  user_id TEXT REFERENCES users(id),
  plan TEXT,
  expires_at INTEGER,
  payment_ref TEXT
);
```

---

## 8. STACK CÔNG NGHỆ — PHÙ HỢP VỚI DỰ ÁN HIỆN TẠI

> Dự án đã có: **Vite + React + Hono + Cloudflare Workers** — KHÔNG cần đổi sang Next.js!

```
Frontend:   React 19 + Vite (đã có)
Backend:    Hono on Cloudflare Workers (đã có)
Database:   Cloudflare D1 (thêm vào wrangler.json)
Storage:    Cloudflare R2 (cho JSON, audio, images)
Auth:       Cloudflare Workers + Google OAuth (JWT/cookie)
Payment:    PayOS (VN) hoặc Stripe — Phase 2
Deploy:     Cloudflare Workers (đã config)
```

> ⚠️ **Tại sao KHÔNG cần đổi sang Next.js?**
> Hono + React đã là full-stack đủ mạnh. Next.js thêm complexity không cần thiết khi đang chạy trên Cloudflare Workers. Kiến trúc hiện tại là **optimal** cho Cloudflare.

---

## 9. TÍNH NĂNG — PHÂN LOẠI MVP / PHASE

### 🚀 MVP (Phase 1 — tập trung ngay)

- [ ] JSON-driven Quiz Engine
  - Multiple choice (text + hình ảnh)
  - Drag & Drop (matching, fill)
  - Fill-in-blank (text input)
- [ ] Google OAuth Login
- [ ] Lưu kết quả bài làm (D1)
- [ ] Trang xem kết quả (đúng/sai, điểm, giải thích)
- [ ] Free tier: 5 bài đầu miễn phí
- [ ] 5–10 bài JSON Flyers (Listening P4 + Reading P4 dễ nhất)
- [ ] Audio player tích hợp (Listening)

### 🎁 Phase 2

- [ ] Dashboard cá nhân — biểu đồ tiến độ
- [ ] Báo cáo: bài yếu/mạnh theo từng Part
- [ ] Thanh toán (PayOS/Stripe)
- [ ] Admin CMS — upload JSON không cần code
- [ ] Listening Part 5 (tô màu/vẽ)
- [ ] Bộ đề hoàn chỉnh 20+ bài/kỹ năng

### 💭 Phase 3

- [ ] Movers, KET, PET (cùng engine, thêm JSON)
- [ ] Toán, Văn (cùng engine, schema khác)
- [ ] AI Speaking Assessment
- [ ] Lớp học nhóm (giáo viên giao bài)
- [ ] Mobile App (PWA hoặc React Native)

---

## 10. PHÂN TÍCH & PHẢN BIỆN Ý TƯỞNG

### ✅ JSON-driven Engine — RẤT HỢP LÝ

**Đây là kiến trúc đúng đắn nhất cho solo developer:**
- Thêm 100 bài mới = tạo 100 file JSON (không cần code)
- Có thể dùng AI generate JSON nhanh
- Thuê người viết nội dung mà không cần biết code

### ⚠️ "Nhiều người vào cùng lúc" — Không phải vấn đề

Cloudflare Workers tự scale vô hạn. Nhưng cần lưu ý:
- Serve audio qua R2 + CDN, không qua Workers
- D1 có giới hạn 1000 write/giây (đủ cho MVP)

### ⚠️ Speaking — Đừng làm trong MVP

Cần microphone, speech recognition, AI grading → tốn 3–6 tháng. Skip.

### ⚠️ Thanh toán — Làm sau khi có user thật

Prove the concept trước. 100 user miễn phí → mới nghĩ monetization.

### 💡 Lợi thế cạnh tranh thực sự chưa ai làm

**Hướng dẫn tiếng Việt** cho bài thi Cambridge. Học sinh lớp 4–5 không đọc instruction tiếng Anh được → đây là điểm khác biệt lớn nhất.

---

## 11. ĐỘ PHỨC TẠP & THỜI GIAN ƯỚC TÍNH

| Tính năng | Độ khó | Ước tính |
|-----------|--------|----------|
| Quiz engine (MC + drag-drop + fill) | 🟡 Trung bình | 2–3 tuần |
| Google OAuth | 🟢 Dễ | 2–3 ngày |
| D1 + R2 setup | 🟢 Dễ | 1–2 ngày |
| Audio player + Listening | 🟡 Trung bình | 1 tuần |
| Báo cáo tiến độ | 🟡 Trung bình | 1–2 tuần |
| Thanh toán | 🔴 Khó | 2–4 tuần |
| AI Speaking | 🔴🔴 Rất khó | 2–3 tháng |

---

## 12. CHIẾN LƯỢC VIBE CODING VỚI ANTIGRAVITY

1. **Content is King first** — 1 engine tốt + 5 bài JSON tốt > 5 engine cẩu thả + 50 bài tệ
2. **Ship sớm** — Deploy MVP khi có 5 bài, lấy feedback thật
3. **Zero-config infra** — D1 + R2 + Workers = không quản lý server
4. **JSON là superpower** — Dùng AI generate JSON bài mới cực nhanh
5. **Tránh over-engineer** — Không build feature user chưa xin

---

## 13. BƯỚC TIẾP THEO

→ Gõ `/plan` để thiết kế chi tiết:
- Schema JSON chuẩn cho từng loại bài
- Component architecture Quiz Engine
- Database schema D1 đầy đủ
- API routes (Hono)
- Kế hoạch nội dung bài nào làm trước

---

*Brief được tạo bởi Antigravity trong phiên /brainstorm ngày 2026-04-28*

---

## 14. NGHIÊN CỨU UX/UI TỪ CÁC NỀN TẢNG LỚN

### 14.1 Học từ Duolingo — "Habit Loop" Engine

| Cơ chế | Cách Duolingo làm | Cách áp dụng cho Flyers |
|--------|------------------|--------------------------|
| **Streak / Loss Aversion** | Mỗi ngày học = +1 streak; bỏ 1 ngày = mất hết → người dùng SỢ mất streak | "Chuỗi học liên tục": học mỗi ngày → nhận huy hiệu, bỏ 1 ngày → mất |
| **Micro-learning** | Mỗi session 5–10 phút, bite-sized | Mỗi Part bài thi = 1 session ngắn, không phải cả đề |
| **Mascot** | Con cú Duo tạo kết nối cảm xúc | Nhân vật thú vị (con thú/robot) hướng dẫn bài |
| **Hearts (Life system)** | Free user bị giới hạn số lần sai → mua Sub để vô hạn | Free: 3 lần thử/ngày → Premium: vô hạn |
| **Variable Reward** | Treasure chest bất ngờ | Spinning wheel điểm thưởng sau mỗi bài |

### 14.2 Học từ Blooket/Gimkit — Gamification for Kids

| Cơ chế | Cách họ làm | Áp dụng |
|--------|-------------|----------|
| **Game modes** | Nhiều game mode: Tower Defense, Gold Quest... | Sau MVP: thêm "Flyers Battle Mode" - thi đấu realtime |
| **Cartoon aesthetic** | UI như video game, không như sách giáo khoa | Tránh UI kiểu trường học, dùng màu sắc tươi sáng, icon vui |
| **In-game economy** | Kiếm coins → mua items | Điểm → đổi avatar, badge, certificate |
| **Low-friction entry** | Chỉ cần PIN, không cần account | Guest mode: làm thử 3 bài không cần đăng ký |

### 14.3 Học từ Cambridge One — Exam Fidelity

| Cơ chế | Cambridge One làm | Mình cải thiện |
|--------|------------------|-----------------|
| **Đúng format thi** | Giao diện y chang thi thật | Đúng format + hướng dẫn tiếng Việt |
| **Detailed feedback** | Đúng/sai per question | Đúng/sai + giải thích VN + tip cải thiện |
| **Mock test** | Full test có tính giờ | Full test + "Practice mode" không tính giờ cho lần đầu |
| **Parent access** | Không có / rất hạn chế | **Dashboard phụ huynh đầy đủ** — đây là khoảng trống lớn |

### 14.4 Bài học UX cụ thể cho target audience (trẻ 9–12 tuổi)

**PHẢI làm:**
- ✅ Touch targets tối thiểu 48x48px (ngón tay trẻ em to hơn)
- ✅ Font size tối thiểu 16px, không dùng chữ quá nhỏ
- ✅ Feedback âm thanh + animation ngay khi chọn đáp án
- ✅ Progress bar hiển thị rõ "Câu 3/5" không phải ẩn
- ✅ Nút "Nộp bài" to, màu khác biệt, không để trẻ bấm nhầm
- ✅ Session ngắn (10–15 phút) có timer visible
- ✅ Kết quả bài hiển thị visual (ngôi sao 3/5, không phải điểm 60%)

**TRÁNH làm:**
- ❌ Quá nhiều text trên 1 màn hình
- ❌ Navigation menu nhiều cấp
- ❌ Pop-up quảng cáo hoặc upsell trong lúc đang làm bài
- ❌ Màu sắc tối, font chữ nhỏ, spacing chật
- ❌ Hiệu ứng lag khi kéo thả (phải smooth)

---

## 15. RỦI RO & TRỞ NGẠI CHƯA NGHĨ ĐẾN

### 🔴 RỦI RO CAO — Cần xử lý ngay từ đầu

#### RỦI RO 1: Copyright / Bản quyền Cambridge
> ⚠️ **ĐÂY LÀ RỦI RO LỚN NHẤT, DỄ BỎ QUA NHẤT**

**Vấn đề:** Tất cả audio, câu hỏi, hình ảnh trong đề thi Cambridge Flyers **đều có bản quyền thuộc Cambridge University Press & Assessment**. Việc:
- Copy đề thi thật từ sách lên web
- Sử dụng audio file MP3 từ sách Cambridge
- Scan/chụp hình từ workbook Cambridge

→ Đều là **vi phạm bản quyền thương mại** và có thể bị kiện.

**Giải pháp:**
- ✅ **Tự soạn đề** theo format Cambridge (không copy nguyên văn)
- ✅ **Tự thu âm audio** bằng giọng đọc của người thật (thuê voice actor VN)
- ✅ **Tự vẽ/thiết kế hình ảnh** minh họa (hoặc dùng AI-generated)
- ✅ Tham khảo **"Cambridge-style"**, không phải **"Cambridge official"**
- ✅ Ghi rõ: "Bài luyện tập dạng Cambridge Flyers" không phải "Đề Cambridge chính thức"

#### RỦI RO 2: Đối thủ có tài nguyên lớn copy model
Nếu luyen-thi-io thành công, các trung tâm lớn (PREP.vn, IELTS Fighter, Topica) hoặc chính Cambridge sẽ ra tính năng tương tự. Solo developer rất khó cạnh tranh dài hạn về số lượng đề.

**Giải pháp:** Tập trung vào **community và relationship** — không phải chỉ content. Cộng đồng phụ huynh và thầy cô tin tưởng thương hiệu là moat dài hạn.

#### RỦI RO 3: Chất lượng audio Listening
Listening là kỹ năng **phụ thuộc hoàn toàn vào chất lượng audio**. Audio kém = bài học kém = user bỏ đi.
- Microphone rẻ tiền, phòng thu nghèo → tiếng vang, noise
- Giọng đọc không chuẩn accent → ảnh hưởng thi thật

**Giải pháp:** Thuê voice actor người Anh/Úc từ Fiverr (~$50–100 cho 30 phút audio). **Chi phí nhỏ, impact lớn.**

### 🟡 RỦI RO TRUNG BÌNH — Cần kế hoạch

#### RỦI RO 4: Drag & Drop trên mobile
Kéo thả là tính năng hay **bị lỗi nhất trên touchscreen** — đặc biệt iOS Safari. Trẻ em dùng tablet/điện thoại của bố mẹ là rất phổ biến ở VN.

**Giải pháp:** Dùng thư viện `dnd-kit` (hỗ trợ touch tốt nhất 2024) thay vì HTML5 DnD API native. Test trên thực tế trên iPad và Android từ sớm.

#### RỦI RO 5: Content tốt nhưng không ai biết đến
Solo dev thường giỏi làm sản phẩm nhưng yếu marketing. Không có traffic = không có user = không có doanh thu.

**Giải pháp:**
- Tham gia các group Facebook phụ huynh Cambridge/Flyers VN
- Partnership với 2–3 trung tâm tiếng Anh nhỏ (họ giao bài cho học sinh, mình chia revenue)
- SEO bài viết "luyện thi Flyers" — niche keyword, ít cạnh tranh

#### RỦI RO 6: Burn out — Solo developer
Làm một mình: code + content + marketing + support + design. Không có đồng đội → dễ bỏ cuộc sau 2–3 tháng.

**Giải pháp:** Định nghĩa rõ **"Done = ship được"** không phải "Done = hoàn hảo". Dùng AI (Antigravity) để tăng tốc. Set mục tiêu nhỏ: 1 bài/tuần thay vì 100 bài/tháng.

#### RỦI RO 7: Thanh toán bị từ chối / Fraud ở VN
Stripe có thể từ chối merchant VN. MoMo/ZaloPay phức tạp tích hợp. Phụ huynh VN vẫn ưa chuyển khoản thủ công.

**Giải pháp MVP:** Nhận thanh toán thủ công (chuyển khoản → admin kích hoạt tài khoản). Sau 100 subscriber mới tích hợp payment gateway. Đơn giản nhưng hoạt động.

### 🟢 RỦI RO THẤP — Biết để phòng

#### RỦI RO 8: Cloudflare D1 limit
D1 giới hạn 10GB. Với 10,000 học sinh x 100 bài x kết quả JSON ~1KB = ~1GB. Sẽ không chạm limit trong vài năm đầu.

#### RỦI RO 9: COPPA / GDPR cho trẻ em
VN chưa có luật COPPA nhưng nếu có user quốc tế cần lưu ý. Giải pháp: account đăng ký bằng email phụ huynh, không phải trẻ em.

---

## 16. 3 USP PHỤ HUYNH SẴN SÀNG TRẢ TIỀN

> Nghiên cứu cho thấy phụ huynh VN chi 20–24% thu nhập cho giáo dục con. Họ trả tiền khi **thấy kết quả** và **cảm thấy an tâm**. Đây là 3 USP được thiết kế để đánh đúng tâm lý đó.

---

### 🥇 USP #1: "BÁO CÁO TUẦN" — Phụ huynh thấy được tiến bộ của con

**Tên tính năng:** **Báo Cáo Tiến Bộ Hàng Tuần** (Weekly Smart Report)

**Vấn đề thực tế:**
> Phụ huynh bỏ tiền học thêm cho con nhưng không biết con đang học được gì, yếu phần nào, tiến bộ ra sao. Đây là nỗi lo số 1 của phụ huynh Việt Nam.

**Cách hoạt động:**
- Mỗi cuối tuần → Email/Zalo tự động gửi đến phụ huynh
- Nội dung: "Con đã làm 5 bài tuần này. Điểm trung bình: 7/10. Con làm tốt Reading Part 4, nhưng cần cải thiện Listening Part 2 (nghe và điền form)."
- Dashboard phụ huynh: xem lại từng bài con làm, câu nào sai, giải thích tại sao
- So sánh với tuần trước: "Tiến bộ +15% so với tuần trước 🎉"

**Tại sao phụ huynh trả tiền:**
- Cambridge One và các nền tảng nước ngoài **KHÔNG CÓ** tính năng này bằng tiếng Việt
- Phụ huynh VN rất bận, không có thời gian hỏi từng ngày → báo cáo tự động = tiết kiệm thời gian
- **Thấy tiến bộ = tiếp tục trả tiền**

**Thông điệp marketing:**
> *"Mỗi cuối tuần, bạn biết chính xác con đang giỏi gì và cần cải thiện gì — không cần phải đoán mò"*

**Độ khó làm:** 🟡 Trung bình (cần email service + query thống kê từ D1)

---

### 🥈 USP #2: "ĐÚNG FORMAT THI" — Không bất ngờ trong phòng thi

**Tên tính năng:** **Luyện Thi Đúng Chuẩn Cambridge** (Exam-Authentic Practice)

**Vấn đề thực tế:**
> Nhiều học sinh thi Flyers bị "sốc" vì chưa từng thực hành đúng format: chưa nghe audio 2 lần, chưa tô màu theo hướng dẫn, chưa kéo thả... Dẫn đến mất điểm dù biết bài.

**Cách hoạt động:**
- Mỗi bài thi trên web = **y chang format thi thật**
  - Listening: nghe audio 2 lần như thi thật, có countdown
  - Reading: đúng số câu, đúng thứ tự Part 1→7
  - Timer hiển thị, có thể bật/tắt (Practice mode vs Exam mode)
- Hướng dẫn từng Part bằng tiếng Việt ("Trong phần này, con nghe và viết tên vào chỗ trống...")
- Sau khi nộp: giải thích từng câu sai bằng tiếng Việt đơn giản
- **"Thi thử"** full test với thời gian thật = cảm giác phòng thi

**Tại sao phụ huynh trả tiền:**
- Cambridge One: chỉ có tiếng Anh, trẻ không hiểu hướng dẫn
- Sách giấy: không có audio interactive, không check đáp án ngay
- **Kết quả đo được: học sinh quen format → tự tin → điểm cao hơn**
- Đây là lý do phụ huynh chi tiền học thêm: **"Để con biết cách làm bài"**

**Thông điệp marketing:**
> *"Con luyện tập đúng format thi từ lần đầu tiên. Vào phòng thi như đã từng làm rồi."*

**Độ khó làm:** 🟢 Dễ-Trung bình (core feature của MVP)

---

### 🥉 USP #3: "PHÂN TÍCH ĐIỂM YẾU" — Học đúng chỗ, không lãng phí thời gian

**Tên tính năng:** **Chẩn Đoán Học Lực** (Skill Gap Diagnosis)

**Vấn đề thực tế:**
> Phụ huynh thường cho con học đều tất cả, không biết con thực sự yếu phần nào. Kết quả: lãng phí thời gian ôn bài đã tốt, bỏ qua bài đang kém.

**Cách hoạt động:**
- Sau 3–5 bài làm đầu tiên, hệ thống tự phân tích:
  - "Con đang ở Level 3/5 về Listening. Điểm mạnh: Part 4 (Multiple choice). Cần cải thiện: Part 2 (Fill in form)."
- Dashboard hiển thị radar chart 8 kỹ năng (5 Listening + 3 Reading/Writing đại diện)
- Hệ thống **tự gợi ý bài tiếp theo**: "Hôm nay luyện Listening Part 2 nhé!"
- Mỗi tháng: báo cáo "Điểm Flyers ước tính" dựa trên kết quả thực hành

**Tại sao phụ huynh trả tiền:**
- Cảm giác **"được tư vấn cá nhân"** mà không tốn tiền gia sư
- Phụ huynh bận không có thời gian nghiên cứu con học gì → hệ thống làm thay
- **"Điểm Flyers ước tính"** = con số cụ thể = dễ justify việc trả tiền
- Tính năng này tạo **dependency**: bỏ subscription = mất đi "bản đồ học tập" của con

**Thông điệp marketing:**
> *"Không đoán mò. Hệ thống tự biết con đang yếu phần nào và gợi ý bài phù hợp nhất hôm nay."*

**Độ khó làm:** 🟡 Trung bình (cần thuật toán đơn giản + UI visualization)

---

## 17. BẢNG SO SÁNH USP VỚI ĐỐI THỦ

| Tính năng | luyen-thi-io | Cambridge One | Duolingo | Sách giấy | Trung tâm |
|-----------|:------------:|:-------------:|:--------:|:---------:|:---------:|
| Báo cáo tuần tiếng Việt | ✅ | ❌ | ⚠️ (EN) | ❌ | ⚠️ (thầy nói miệng) |
| Format thi đúng chuẩn | ✅ | ✅ | ❌ | ✅ | ⚠️ (phụ thuộc thầy) |
| Hướng dẫn tiếng Việt | ✅ | ❌ | ❌ | ⚠️ | ✅ |
| Phân tích điểm yếu tự động | ✅ | ❌ | ⚠️ | ❌ | ⚠️ |
| Giá | ~100–200k/tháng | ~500k+/tháng | ~150k (ko phù hợp Flyers) | 200k/quyển | 1–3tr/tháng |
| Làm mọi lúc mọi nơi | ✅ | ✅ | ✅ | ✅ | ❌ |

**Kết luận:** luyen-thi-io là platform duy nhất có đủ cả 3 USP phục vụ đúng nhu cầu phụ huynh VN.

---

## 18. GỢI Ý GIÁ & PACKAGING

| Gói | Giá | Nội dung |
|-----|-----|----------|
| **Free** | 0đ | 5 bài làm thử, không có báo cáo |
| **Basic** | 99k/tháng | Unlimited bài Flyers, báo cáo tuần cơ bản |
| **Premium** | 199k/tháng | Basic + Phân tích điểm yếu + Mock test đầy đủ |
| **Family** | 299k/tháng | 2 trẻ em + tất cả tính năng Premium |

> 💡 **So sánh tham chiếu:** 1 buổi học thêm ở trung tâm = 100–200k. Premium 199k/tháng = rẻ hơn 1 buổi học → dễ justify cho phụ huynh.

---

*Cập nhật thêm phân tích UX/USP/Risks ngày 2026-04-28*

---

## 19. PHÂN TÍCH: HỆ THỐNG MỤC TIÊU & PHẦN THƯỞNG ("DREAM REWARD")

### 19.1 Phân tích & Phản biện ý tưởng

#### ✅ ĐIỂM RẤT MẠNH — Đây là USP #4 thực sự

Ý tưởng **đặt mục tiêu + hình ảnh phần thưởng + lộ trình trực quan** có cơ sở tâm lý học vững chắc:

- **Vision Board Psychology**: Nghiên cứu cho thấy trẻ em nhìn thấy hình ảnh mục tiêu mỗi ngày → tăng persistence (bền bỉ) và commitment. Không phải "thủ thuật", là khoa học thật.
- **Ownership Effect**: Trẻ tự chọn phần thưởng = tự cam kết với mục tiêu. Hiệu quả gấp 3x so với người lớn áp đặt.
- **Tangible Progress**: Lộ trình bằng hình ảnh (tiến về phía đồ chơi/chuyến đi) biến thứ trừu tượng ("học tốt") thành cụ thể ("còn 20 sao nữa là được du lịch Đà Nẵng").
- **Parent-Child Bond**: Phụ huynh tham gia vào việc đặt mục tiêu = tạo cam kết chung. Đây là điều không nền tảng nào khác làm được.

#### ⚠️ PHẢN BIỆN — Cần cẩn thận

**Rủi ro 1: Extrinsic vs Intrinsic Motivation**
> Nếu bé học CHỈ vì phần thưởng → khi đạt phần thưởng → ngừng học. Sau đó phụ huynh phải liên tục "nâng giá" phần thưởng.

**Giải pháp:** Thiết kế để phần thưởng là **"lý do bắt đầu"** không phải **"lý do duy nhất"**. Sau khi đạt mục tiêu, hệ thống celebrate achievement (bé giỏi thật sự, không phải mua điểm) và set mục tiêu mới. Bé dần thấy bản thân giỏi lên = intrinsic motivation.

**Rủi ro 2: Phụ huynh không thực hiện lời hứa**
> Bé đạt 100 sao, mong du lịch Phú Quốc, nhưng ba mẹ bận/không có tiền → thất vọng → mất tin tưởng vào app.

**Giải pháp:** Khi phụ huynh setup mục tiêu, app gợi ý **realistic rewards** theo mức độ:
- 🌟 Nhỏ (dễ đạt): Phim, kem, sách mới
- 🌟🌟 Trung bình: Đồ chơi, quần áo
- 🌟🌟🌟 Lớn (dài hạn): Chuyến du lịch

**Rủi ro 3: Bé upload hình ảnh không phù hợp**
> Bé upload ảnh tự chụp, ảnh không liên quan, ảnh từ người lạ... → moderation headache cho solo developer.

**Giải pháp:** Giai đoạn 1, **chỉ dùng preset images** (thư viện 50–100 hình ảnh curated: đồ chơi, địa điểm du lịch VN, sách, game...). Upload tùy chỉnh là Phase 2.

---

### 19.2 Mở rộng & Nâng cấp ý tưởng

#### 💡 Gọi tên tính năng: "HỘP QUÀ ƯỚC MƠ" (Dream Box)

```
📦 HỘP QUÀ ƯỚC MƠ của [Tên bé]

    🎯 Mục tiêu: [Hình ảnh phần thưởng bé chọn]
    ─────────────────────────────────────────
    [Hình ảnh đồ chơi/du lịch lớn, đẹp]
    "Chuyến đi Đà Nẵng cùng gia đình!"
    ─────────────────────────────────────────
    Tiến độ: ████████░░ 80/100 ⭐
    Còn lại: 20 sao nữa là được!
    ─────────────────────────────────────────
    Hôm nay làm bài → +5 ⭐ → còn 15 nữa!
```

#### 💡 Flow hoạt động chi tiết

```
Phụ huynh mua gói Flyers
        ↓
[Màn hình Setup "Hộp Quà Ước Mơ"]
"Ba/mẹ muốn đặt mục tiêu gì cho con?"
        ↓
Chọn loại mục tiêu:
  1. Hoàn thành khóa học Flyers
  2. Đạt 15 khiên (điểm thi giả lập)
  3. Tích lũy 100 sao
  4. Tự đặt (nhập số)
        ↓
"Nếu đạt được, con muốn được thưởng gì?"
→ Hiện grid ảnh đẹp (đồ chơi, địa điểm VN, sách...)
→ [Hoặc bé viết tên món quà vào ô text]
        ↓
[Hộp Quà Ước Mơ được tạo]
Hiển thị mỗi lần bé mở app
        ↓
Mỗi bài hoàn thành → Animation sao bay vào Hộp
        ↓
Đạt 100% → Email/thông báo cho PHỤ HUYNH:
"Con đã hoàn thành mục tiêu! Đây là thời điểm
ba/mẹ trao phần thưởng cho con nhé! 🎉"
```

#### 💡 Mở rộng thêm: "Lộ trình hành trình" (Journey Map)

Thay vì chỉ là progress bar, thiết kế **bản đồ hành trình**:

```
🏠 Start ──🌟──🌟──🌟──⛰️──🌟──🌟──🏆 Phú Quốc!
              Bé đang ở đây ↑
```

- Mỗi 10 sao = tiến 1 bước trên bản đồ
- Các checkpoint = milestone nhỏ có quà nhỏ (badge, avatar mới)
- Background bản đồ thay đổi theo tiến độ (rừng → biển → thành phố)

---

## 20. HỆ THỐNG CÁ NHÂN HÓA — DATABASE DESIGN

### 20.1 D1 có làm tốt không?

**Câu trả lời ngắn: CÓ — nhưng cần thiết kế đúng**

#### Nguyên tắc lưu trữ dữ liệu cá nhân hóa:

| Loại data | Lưu ở đâu | Lý do |
|-----------|-----------|-------|
| **Truy vấn thường xuyên** (điểm, tier, streak) | D1 — cột riêng | Indexed, query nhanh |
| **JSON tĩnh** (cấu hình giao diện, preference) | D1 — TEXT JSON | Flexible, ít thay đổi |
| **Data lớn** (lịch sử đầy đủ, analytics nâng cao) | D1 + KV cache | Split để tránh bloat |
| **Hình ảnh phần thưởng** (dream box) | R2 Object Storage | File, không thuộc DB |
| **Session cache** (trang hiện tại đang làm) | KV Workers | Tạm thời, cần cực nhanh |

#### Schema D1 cho Personalization (MVP-ready)

```sql
-- Hồ sơ học sinh (tách khỏi bảng users)
CREATE TABLE student_profiles (
  id          TEXT PRIMARY KEY,
  user_id     TEXT REFERENCES users(id),
  display_name TEXT NOT NULL,
  avatar_id   TEXT DEFAULT 'default_cat',  -- preset avatars
  theme       TEXT DEFAULT 'blue',          -- color theme
  created_at  INTEGER DEFAULT (unixepoch())
);

-- Thống kê tổng hợp (STORED columns = indexable)
CREATE TABLE student_stats (
  student_id   TEXT PRIMARY KEY REFERENCES student_profiles(id),
  total_stars  INTEGER DEFAULT 0,       -- tổng sao tích lũy
  current_streak INTEGER DEFAULT 0,    -- chuỗi ngày học
  longest_streak INTEGER DEFAULT 0,
  total_sessions INTEGER DEFAULT 0,
  last_active  INTEGER,
  -- Skill levels (0-5 mỗi kỹ năng)
  lvl_listening_p1 INTEGER DEFAULT 0,
  lvl_listening_p2 INTEGER DEFAULT 0,
  lvl_listening_p3 INTEGER DEFAULT 0,
  lvl_listening_p4 INTEGER DEFAULT 0,
  lvl_reading_p1  INTEGER DEFAULT 0,
  lvl_reading_p2  INTEGER DEFAULT 0,
  lvl_reading_p3  INTEGER DEFAULT 0,
  lvl_reading_p4  INTEGER DEFAULT 0,
  lvl_writing_p1  INTEGER DEFAULT 0,
  -- JSON cho các prefs ít query
  preferences_json TEXT DEFAULT '{}'
);

-- Hộp Quà Ước Mơ
CREATE TABLE dream_goals (
  id           TEXT PRIMARY KEY,
  student_id   TEXT REFERENCES student_profiles(id),
  exam_id      TEXT NOT NULL,            -- 'flyers', 'pet'...
  goal_type    TEXT NOT NULL,            -- 'stars', 'shields', 'complete'
  goal_target  INTEGER NOT NULL,         -- 100 (sao), 15 (khiên)...
  reward_label TEXT NOT NULL,            -- "Du lịch Đà Nẵng"
  reward_image_url TEXT,                 -- R2 URL hoặc preset key
  current_progress INTEGER DEFAULT 0,
  is_achieved  INTEGER DEFAULT 0,        -- 0/1 (SQLite boolean)
  achieved_at  INTEGER,
  created_at   INTEGER DEFAULT (unixepoch())
);

-- Kết quả từng bài (giữ nguyên từ BRIEF gốc, thêm skill tags)
CREATE TABLE quiz_attempts (
  id           TEXT PRIMARY KEY,
  student_id   TEXT REFERENCES student_profiles(id),
  quiz_id      TEXT NOT NULL,
  skill        TEXT NOT NULL,            -- 'listening', 'reading'
  part_number  INTEGER,                  -- 1, 2, 3...
  score        INTEGER,
  max_score    INTEGER,
  stars_earned INTEGER DEFAULT 0,        -- sao bé nhận từ bài này
  answers_json TEXT,
  time_spent   INTEGER,
  completed_at INTEGER DEFAULT (unixepoch())
);

-- Daily activity (cho streak tracking)
CREATE TABLE daily_activity (
  student_id TEXT,
  date_key   TEXT,                       -- '2026-04-28' format
  sessions   INTEGER DEFAULT 0,
  stars      INTEGER DEFAULT 0,
  PRIMARY KEY (student_id, date_key)
);
```

#### Tại sao thiết kế này tối ưu cho D1?

- ✅ **Skill levels** là cột riêng → có thể `WHERE lvl_listening_p2 < 3` để gợi ý bài
- ✅ **daily_activity** composite PK → query streak nhanh không cần JSON_EXTRACT
- ✅ **dream_goals** tách bảng riêng → một bé có thể có nhiều mục tiêu song song
- ✅ Không dùng JSON_EXTRACT cho các filter thường xuyên → tránh bottleneck
- ✅ `preferences_json` chỉ cho data ít query (theme, notification settings...)

---

### 20.2 Kiến trúc Dashboard Cá Nhân Hóa

#### "Trang Chủ của Bé" — Màn hình chính khi login

```
┌─────────────────────────────────────────┐
│  👋 Chào Minh! Hôm nay học tiếp nhé!   │
│  🔥 Chuỗi 7 ngày liên tiếp! Tuyệt vời! │
├─────────────────────────────────────────┤
│        📦 HỘP QUÀ ƯỚC MƠ              │
│  [Hình ảnh chuyến đi Đà Nẵng]          │
│  ████████░░  80/100 ⭐  Còn 20 sao!   │
├─────────────────────────────────────────┤
│  📊 BẢN ĐỒ KỸ NĂNG                    │
│  👂 Nghe    ████░ Level 4              │
│  📖 Đọc     ███░░ Level 3              │
│  ✍️  Viết    ██░░░ Level 2  ← Yếu nhất│
├─────────────────────────────────────────┤
│  🎯 GỢI Ý HÔM NAY                     │
│  [Luyện Viết Part 6 - Level của con]   │
│  [Button to có phản ứng]               │
└─────────────────────────────────────────┘
```

#### API Query để render màn hình này (1 request duy nhất)

```typescript
// Hono API route
app.get('/api/student/:id/dashboard', async (c) => {
  const { id } = c.req.param();
  const db = c.env.DB;  // D1 binding

  // 1 query JOIN đủ dữ liệu cho trang chủ
  const data = await db.prepare(`
    SELECT
      sp.display_name, sp.avatar_id, sp.theme,
      ss.total_stars, ss.current_streak,
      ss.lvl_listening_p1, ss.lvl_listening_p2,
      ss.lvl_reading_p1, ss.lvl_reading_p2,
      ss.lvl_writing_p1,
      dg.reward_label, dg.reward_image_url,
      dg.goal_target, dg.current_progress
    FROM student_profiles sp
    JOIN student_stats ss ON ss.student_id = sp.id
    LEFT JOIN dream_goals dg ON dg.student_id = sp.id
      AND dg.is_achieved = 0
    WHERE sp.id = ?
    LIMIT 1
  `).bind(id).first();

  return c.json(data);
});
```

---

## 21. HỆ THỐNG SỐ HỌC VÀ ĐIỂM THƯỞNG

### 21.1 Cân bằng số học (Game Economy)

> Đây là phần dễ bỏ qua nhất nhưng quan trọng nhất. Nếu sao quá dễ kiếm → mất giá trị. Quá khó → bé nản.

| Hành động | Sao nhận | Ghi chú |
|-----------|----------|----------|
| Hoàn thành bài (< 60% đúng) | ⭐ 1 | Khuyến khích cố gắng |
| Hoàn thành bài (60–79% đúng) | ⭐⭐ 2 | Đạt cơ bản |
| Hoàn thành bài (80–89% đúng) | ⭐⭐⭐ 3 | Khá |
| Hoàn thành bài (90–100% đúng) | ⭐⭐⭐⭐⭐ 5 | Xuất sắc! |
| Học 3 ngày liên tiếp | Bonus ⭐⭐ | Streak bonus |
| Học 7 ngày liên tiếp | Bonus ⭐⭐⭐⭐⭐ | Weekly streak |
| Hoàn thành full test mock | ⭐⭐⭐⭐⭐⭐⭐ 7 | Milestone |

**Ước tính:** Mục tiêu 100 sao ≈ 20–25 bài học + streak bonus = ~3–4 tuần học đều đặn. Phù hợp một kỳ ôn thi.

### 21.2 Shields (Khiên) vs Stars (Sao)

> Anh đề cập cả "khiên" và "sao" — cần phân biệt rõ để không confuse bé.

| Biểu tượng | Ý nghĩa | Kiếm bằng cách nào |
|-----------|---------|--------------------|
| ⭐ **Sao** | Điểm tích lũy hàng ngày | Mỗi bài học |
| 🛡️ **Khiên** | Kết quả mock test (như Cambridge) | Chỉ từ full test, 1–5 khiên |
| 🏅 **Huy hiệu** | Achievement cột mốc | Milestone đặc biệt |

**Quy tắc:** Sao = tiền tệ hàng ngày. Khiên = đánh giá trình độ thực sự. Huy hiệu = kỷ niệm.

---

## 22. THIẾT KẾ GIAO DIỆN — DESIGN SYSTEM

### 22.1 Bảng màu đề xuất (dễ thương, tươi sáng)

```css
/* Palette cho trẻ 9-12 tuổi: vui tươi nhưng không lòe loẹt */
--primary:    #4F46E5;  /* Tím xanh - chủ đạo, tin cậy */
--secondary:  #F59E0B;  /* Vàng cam - sao, phần thưởng */
--success:    #10B981;  /* Xanh lá - đúng, tiến bộ */
--danger:     #F87171;  /* Đỏ hồng - sai (nhẹ, không harsh) */
--accent:     #EC4899;  /* Hồng - accent, streaks */
--bg-light:   #F0F9FF;  /* Xanh nhạt - background nhẹ */
--card-white: #FFFFFF;  /* Trắng - cards */

/* Bo góc - tất cả đều rounded */
--radius-sm:  12px;
--radius-md:  20px;
--radius-lg:  28px;
--radius-xl:  999px;   /* Pill buttons */
```

### 22.2 Typography

```css
/* Google Font: Nunito — tròn, dễ thương, dễ đọc cho trẻ em */
@import url('fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800&display=swap');

--font-heading: 'Nunito', sans-serif; /* Bold 800 */
--font-body:    'Nunito', sans-serif; /* Regular 400 */

/* Sizes */
--text-xl:   24px;  /* Tên bé, heading */
--text-lg:   20px;  /* Sub-heading */
--text-md:   17px;  /* Body text */   
--text-sm:   15px;  /* Labels, hints */
/* KHÔNG bao giờ dùng nhỏ hơn 14px */
```

### 22.3 Component Rules

```
✅ Tất cả buttons: min-height 52px (vượt 48px target)
✅ Tất cả cards: border-radius 20px trở lên
✅ Drag items: padding lớn, dễ grab
✅ Icons: minimum 40x40px, recommended 48x48px
✅ Spacing: dùng bội số 8px (8, 16, 24, 32, 40, 48)
✅ Answer choices: spacing giữa các lựa chọn min 12px
✅ Animations: duration 200-400ms, ease-out
✅ Sound: tất cả actions có sound nhẹ (không bắt buộc, on/off)
```

### 22.4 Màn hình nộp bài — Khoảnh khắc quan trọng nhất

```
[Sau khi nộp bài]
─────────────────────────────
🎉  Hoàn thành!              [Animation confetti]
─────────────────────────────
[Ngôi sao 1] [Ngôi sao 2] [Ngôi sao 3]  ← 3/5 sao
  ⭐              ⭐            ☆   ☆   ☆
─────────────────────────────
+3 ⭐ vào Hộp Quà Ước Mơ!  [Animation sao bay]
─────────────────────────────
Còn 17 sao nữa là được du lịch Đà Nẵng! 🏖️
─────────────────────────────
[Xem đáp án]    [Học bài tiếp]
```

---

## 23. QUYẾT ĐỊNH ĐÃ CHỐT — PHIÊN BRAINSTORM 2026-04-28

> Tất cả câu hỏi mở đã được quyết định. Dưới đây là phân tích & mở rộng từng quyết định.

---

## 24. HỆ THỐNG MULTI-THEME (Màu sắc tùy chỉnh)

### 24.1 Quyết định
> **"Dư địa để người dùng tùy chỉnh nhiều chủ đề màu khác nhau"**

### 24.2 Phân tích & Gợi ý mở rộng

**✅ Rất đúng hướng** — Cá nhân hóa theme màu sắc là tính năng mạnh với trẻ em:
- Trẻ 9–12 tuổi rất thích "của mình", theme riêng = cảm giác sở hữu
- Phụ huynh thích theme trang nhã hơn, trẻ thích theme vui tươi
- Phase sau: theme là reward (kiếm sao để unlock theme mới)

**⚠️ Lưu ý kỹ thuật:** Không implement theme bằng cách thay đổi class CSS — dùng **CSS Custom Properties** (variables), đổi theme = chỉ cần đổi 1 bộ biến, không cần reload.

### 24.3 Bộ 6 Theme Đề Xuất (MVP)

```css
/* === THEME ENGINE === */
/* Chỉ cần đổi data-theme attribute trên <html> tag */
/* VD: <html data-theme="ocean"> */

/* 🟣 THEME 1: Purple Dream (mặc định) */
[data-theme="purple"] {
  --color-primary:   #6366F1;  /* Tím indigo */
  --color-secondary: #F59E0B;  /* Vàng cam */
  --color-success:   #10B981;
  --color-danger:    #F87171;
  --color-bg:        #F5F3FF;  /* Tím rất nhạt */
  --color-card:      #FFFFFF;
  --color-text:      #1E1B4B;
}

/* 🔵 THEME 2: Ocean Blue */
[data-theme="ocean"] {
  --color-primary:   #0EA5E9;
  --color-secondary: #F59E0B;
  --color-success:   #10B981;
  --color-danger:    #FB7185;
  --color-bg:        #F0F9FF;
  --color-card:      #FFFFFF;
  --color-text:      #0C4A6E;
}

/* 🌸 THEME 3: Sakura Pink */
[data-theme="sakura"] {
  --color-primary:   #EC4899;
  --color-secondary: #F59E0B;
  --color-success:   #34D399;
  --color-danger:    #F87171;
  --color-bg:        #FDF2F8;
  --color-card:      #FFFFFF;
  --color-text:      #831843;
}

/* 🌿 THEME 4: Forest Green */
[data-theme="forest"] {
  --color-primary:   #059669;
  --color-secondary: #F59E0B;
  --color-success:   #10B981;
  --color-danger:    #F87171;
  --color-bg:        #F0FDF4;
  --color-card:      #FFFFFF;
  --color-text:      #064E3B;
}

/* 🌙 THEME 5: Night Sky (Dark mode) */
[data-theme="night"] {
  --color-primary:   #818CF8;
  --color-secondary: #FCD34D;
  --color-success:   #34D399;
  --color-danger:    #FCA5A5;
  --color-bg:        #0F172A;
  --color-card:      #1E293B;
  --color-text:      #E2E8F0;
}

/* 🧡 THEME 6: Sunset Orange */
[data-theme="sunset"] {
  --color-primary:   #F97316;
  --color-secondary: #FBBF24;
  --color-success:   #10B981;
  --color-danger:    #EF4444;
  --color-bg:        #FFF7ED;
  --color-card:      #FFFFFF;
  --color-text:      #7C2D12;
}
```

### 24.4 Lưu theme vào D1

```sql
-- Trong bảng student_profiles, thêm cột:
ALTER TABLE student_profiles ADD COLUMN theme TEXT DEFAULT 'purple';
-- Giá trị: 'purple' | 'ocean' | 'sakura' | 'forest' | 'night' | 'sunset'
```

```typescript
// Apply theme khi load app
const applyTheme = (theme: string) => {
  document.documentElement.setAttribute('data-theme', theme);
};
// → Đổi theme = 1 dòng code, instant, không reload
```

### 24.5 Roadmap Theme
| Phase | Theme | Cách unlock |
|-------|-------|-------------|
| MVP | 3 theme cơ bản (Purple, Ocean, Sakura) | Miễn phí tất cả |
| Phase 2 | +3 theme (Forest, Night, Sunset) | Free cho Premium |
| Phase 3 | Special themes (Galaxy, Rainbow...) | Đổi bằng sao / event |

---

## 25. DREAM BOX — FLOW PHỤ HUYNH DUYỆT QUA EMAIL

### 25.1 Quyết định
> **Bé chọn (preset/tự nhập/upload) → "Gửi cho ba/mẹ" → Email phụ huynh → Phụ huynh confirm bằng nút trong email**

### 25.2 Flow Chi Tiết

```
[BÉ] Chọn/nhập phần thưởng
    ├─ Chọn từ kho ảnh preset (50–100 ảnh curated)
    ├─ Tự nhập tên ("Con muốn: Lego City")
    └─ Upload ảnh riêng (Phase 2)
         ↓
[BÉ] Nhấn nút "💌 Gửi cho ba/mẹ"
         ↓
[HỆ THỐNG] Tạo dream_goals với status = 'pending'
         ↓
[HỆ THỐNG] Gửi email đến phụ huynh:
┌────────────────────────────────────────────┐
│  📧 "Con [Tên bé] muốn gửi điều ước!"      │
│                                            │
│  [Hình ảnh phần thưởng bé chọn]           │
│  Con nói: "Con muốn được [Tên phần thưởng]│
│  nếu con hoàn thành khóa Flyers!"         │
│                                            │
│  Mục tiêu: Tích lũy 100 ⭐ Sao             │
│  Dự kiến: ~3–4 tuần học đều đặn           │
│                                            │
│  [✅ ĐỒNG Ý — Ba/mẹ sẽ thưởng cho con]   │
│  [❌ Chọn lại — Phần thưởng khác hơn]     │
└────────────────────────────────────────────┘
         ↓
[PHỤ HUYNH] Nhấn "✅ ĐỒNG Ý" trong email
         ↓
[HỆ THỐNG] dream_goals.status = 'approved'
         ↓
[BÉ] Thấy thông báo: "Ba/mẹ đã đồng ý! 🎉
      Hộp Quà Ước Mơ đã được kích hoạt!"
         ↓
[DREAM BOX ACTIVE] Hiện mỗi lần mở app
```

### 25.3 ⚠️ Rủi ro Email Flow — Cần biết trước

**Rủi ro 1: Email vào Spam**
> Phụ huynh không thấy email → bé chờ mãi không được approve → thất vọng.

**Giải pháp:**
- Dùng email service uy tín: **Resend.com** (3,000 email/tháng free, deliverability tốt nhất 2025)
- Trong app, sau 24h chưa approve → hiện reminder cho bé: "Ba/mẹ chưa xem email, hãy nhắc ba/mẹ nhé!"
- **Thêm fallback:** Phụ huynh có thể approve từ **Parent Dashboard** trong app (không chỉ qua email)

**Rủi ro 2: Link trong email expired hoặc bị click nhầm**
> Phụ huynh click nhầm "Từ chối" hoặc link hết hạn.

**Giải pháp:**
- Token trong link có hạn 7 ngày
- Sau khi click "Từ chối", hiện trang web cho phụ huynh chọn lại, không phải chấm dứt
- Phụ huynh luôn có thể vào Parent Dashboard để approve/reject bất kỳ lúc nào

**Rủi ro 3: Phụ huynh không đăng ký email khi mua tài khoản**
> Email để thanh toán khác email muốn nhận báo cáo.

**Giải pháp:** Khi setup tài khoản, hỏi rõ: "Email nào ba/mẹ muốn nhận thông báo về con?"

### 25.4 Schema Cập Nhật Dream Goals

```sql
CREATE TABLE dream_goals (
  id              TEXT PRIMARY KEY,
  student_id      TEXT REFERENCES student_profiles(id),
  exam_id         TEXT NOT NULL,
  goal_type       TEXT NOT NULL,       -- 'stars' | 'shields' | 'complete'
  goal_target     INTEGER NOT NULL,
  reward_label    TEXT NOT NULL,
  reward_image_key TEXT,               -- preset key hoặc R2 path
  status          TEXT DEFAULT 'pending', -- 'pending'|'approved'|'rejected'|'achieved'
  approval_token  TEXT UNIQUE,         -- token trong email link (7 ngày)
  token_expires   INTEGER,             -- unixepoch
  current_progress INTEGER DEFAULT 0,
  approved_at     INTEGER,
  achieved_at     INTEGER,
  created_at      INTEGER DEFAULT (unixepoch())
);
-- Chỉ 1 dream goal active (status='approved') mỗi lúc
-- CHECK: trigger hoặc app logic enforce rule này
```

### 25.5 Phase Mở Rộng — 3 Giai Đoạn (Phase 2)

```
[Checkbox: Chia nhỏ thành 3 giai đoạn?]
✅ Đã check → Bé nhập 3 mốc:

Giai đoạn 1 (30 sao): "Một hộp kem to!"
Giai đoạn 2 (60 sao): "Một bộ Lego nhỏ"
Giai đoạn 3 (100 sao): "Du lịch Đà Nẵng!"

→ Mỗi giai đoạn hoàn thành → email phụ huynh riêng
→ Journey Map hiển thị 3 checkpoint khác nhau
→ Tâm lý: thấy phần thưởng gần hơn → không nản
```

---

## 26. HỆ THỐNG SAO — VĨNH VIỄN & TÍNH NĂNG CỢC

### 26.1 Quyết định
> **Sao không hết hạn. Phase sau: Đặt cược sao vào bài test.**

### 26.2 ✅ Phân tích: Sao Không Hết Hạn

**Tại sao đúng:**
- Trẻ em cần cảm giác **tích lũy an toàn** — bỏ công học được sao mà mất đi là demotivating
- Sao là "tiền tệ hướng đến phần thưởng", không phải "vé sử dụng dịch vụ"
- Khác với Duolingo (streak dễ mất) → luyen-thi-io chọn model ít stress hơn, phù hợp trẻ nhỏ

**Lưu ý:** Sao không hết hạn nhưng **không có giá trị tiền thật** — tránh hiểu nhầm.

### 26.3 💡 Tính Năng Cợc (Star Betting) — Phân Tích Sâu

> **"Đặt cược sao vào 1 bài test, vượt điểm mục tiêu → nhân đôi/ba"**

**✅ Điểm mạnh — Rất sáng tạo:**
- Tạo **variable reward** mạnh nhất trong game economy
- Phù hợp lứa tuổi 9–12 (thích challenge, thích thắng)
- Khuyến khích bé **tự tin thử thách** thay vì chỉ làm bài an toàn
- Tạo **adrenaline** — cảm giác hồi hộp trước khi nộp bài

**⚠️ Phản biện — Cần thiết kế cẩn thận:**

| Rủi ro | Giải pháp |
|--------|----------|
| Bé bị stress nếu thua cược | Giới hạn cược tối đa 10% số sao hiện có |
| Bé cược liều, không học | Cooldown 24h sau mỗi lần cược |
| Phụ huynh lo ngại "cờ bạc" | Đặt tên khác: "Thử Thách Đặc Biệt" thay vì "cược" |
| Bé cố tình làm sai để cược lại | Giới hạn 1 lần cược/bài/ngày |

**💡 Design gợi ý:**

```
[Trước khi bắt đầu bài test]
────────────────────────────────
🎯 THỬ THÁCH ĐẶC BIỆT!

Bài này con có muốn thử thách không?

"Nếu con đạt ≥ 80%, con sẽ nhận
 GẤPF ĐÔI số sao thưởng! 🌟"

(Rủi ro: Nếu dưới 80%, con vẫn nhận sao bình thường)

[⚡ NHẬN THÁCH!]   [Làm bình thường]
────────────────────────────────
```

> **Lưu ý thiết kế quan trọng:** KHÔNG mất sao khi thua — chỉ nhận ít hơn. Tâm lý "không mất gì" an toàn hơn cho trẻ em.

**Schema bổ sung:**
```sql
-- Thêm vào quiz_attempts:
ALTER TABLE quiz_attempts ADD COLUMN is_challenge INTEGER DEFAULT 0;
ALTER TABLE quiz_attempts ADD COLUMN challenge_threshold INTEGER; -- 80 = 80%
ALTER TABLE quiz_attempts ADD COLUMN challenge_multiplier REAL DEFAULT 1.0; -- 2.0 = gấp đôi
ALTER TABLE quiz_attempts ADD COLUMN stars_base INTEGER DEFAULT 0;   -- sao nếu bình thường
ALTER TABLE quiz_attempts ADD COLUMN stars_earned INTEGER DEFAULT 0; -- sao thực nhận
```

---

## 27. KHO AVATAR — THIẾT KẾ

### 27.1 Quyết định
> **Kho avatar preset, miễn phí. Mua bán sao để sau.**

### 27.2 Gợi ý Kho Avatar MVP

```
📦 KHO AVATAR (Miễn phí toàn bộ trong MVP)

🐱 Mèo        🐶 Chó        🐰 Thỏ
🦊 Cáo        🐼 Gấu Panda  🦄 Kỳ Lân
🐸 Ếch        🦁 Sư Tử      🐧 Cánh Cụt
🦋 Bướm       🌟 Robot      🚀 Phi Hành Gia
```

**12–20 avatar** phong cách cartoon đơn giản, dễ thương.
Dùng SVG để scale mà không vỡ ảnh, load nhanh.

### 27.3 Roadmap Avatar

| Phase | Avatar | Cách unlock |
|-------|--------|-------------|
| MVP | 12 avatar mặc định | Tất cả miễn phí |
| Phase 2 | +12 avatar đặc biệt | Milestone (học 30 ngày, đạt 5 khiên...) |
| Phase 3 | Seasonal avatars | Sự kiện (Tết, Halloween...) |
| Tương lai | Premium avatars | Đổi bằng sao |

### 27.4 Avatar & Theme = Combo cá nhân hóa mạnh nhất

```
[Trang "Hồ Sơ Của Con"]
┌─────────────────────────────────┐
│  [Avatar: Kỳ Lân 🦄]            │
│  Tên: Minh                      │
│  ⭐ 247 sao  🔥 12 ngày streak  │
│  🛡️ 3 khiên Flyers              │
├─────────────────────────────────┤
│  🎨 Chủ đề: [Ocean Blue ✓]     │
│  ○ Purple  ● Ocean  ○ Sakura   │
│  ○ Forest  ○ Night  ○ Sunset   │
├─────────────────────────────────┤
│  🐾 Đổi avatar:                 │
│  [Grid 12 avatar để chọn]       │
└─────────────────────────────────┘
```

---

## 28. BẢNG TỔNG KẾT — TẤT CẢ QUYẾT ĐỊNH ĐÃ CHỐT

| # | Vấn đề | Quyết định | Phase |
|---|--------|-----------|-------|
| 1 | Màu sắc | Multi-theme, CSS variables, 6 theme MVP | MVP |
| 2 | Dream Box flow | Bé chọn → Gửi email PH → PH confirm | MVP |
| 3 | Số Dream Box | 1 active tại 1 thời điểm | MVP |
| 4 | Dream Box giai đoạn | 1 giai đoạn MVP → max 3 giai đoạn Phase 2 | Phase 2 |
| 5 | Sao hết hạn | KHÔNG hết hạn | MVP |
| 6 | Cợc sao | "Thử Thách Đặc Biệt", KHÔNG mất sao khi thua | Phase 2 |
| 7 | Avatar | Kho 12–20 preset, miễn phí toàn bộ | MVP |
| 8 | Mua avatar bằng sao | Phase 3 trở đi | Phase 3 |
| 9 | Upload ảnh Dream Box | Phase 2 (MVP chỉ preset + nhập text) | Phase 2 |
| 10 | Approve Dream Box | Cả email lẫn Parent Dashboard | MVP |

---

## 29. STACK KỸ THUẬT CẬP NHẬT ĐẦY ĐỦ

```
Frontend:   React 19 + Vite (đã có)
Backend:    Hono on Cloudflare Workers (đã có)
Database:   Cloudflare D1 (thêm vào wrangler.json)
Storage:    Cloudflare R2 (JSON bài học, audio, ảnh avatar, dream box images)
Cache:      Cloudflare KV (session, theme cache)
Email:      Resend.com (free 3,000/tháng — Dream Box approval + Weekly Report)
Auth:       Google OAuth via Hono
Payment:    Manual (chuyển khoản) → Phase 2: PayOS
Deploy:     Cloudflare Workers (đã config)
DnD lib:    dnd-kit (touch support tốt nhất)
Font:       Nunito (Google Fonts)
Theme:      CSS Custom Properties (data-theme attribute)
```

---

## 30. TÓM TẮT VISION — SẢN PHẨM HOÀN CHỈNH

```
luyen-thi-io = Nền tảng luyện thi Cambridge Flyers

🎯 Cho BÉ:
   • Làm bài thi đúng format, hiểu hướng dẫn bằng tiếng Việt
   • Nhìn thấy tiến bộ mỗi ngày qua "Hộp Quà Ước Mơ"
   • Giao diện như game, không như sách giáo khoa
   • Avatar & theme riêng → "của con"

📊 Cho PHỤ HUYNH:
   • Biết chính xác con yếu phần nào mỗi tuần
   • Confirm mục tiêu và phần thưởng cho con
   • Không cần ngồi cạnh con mỗi ngày vẫn theo dõi được

🏆 4 USP cạnh tranh:
   1. Báo cáo tuần tự động bằng tiếng Việt
   2. Đúng format thi + hướng dẫn tiếng Việt
   3. Chẩn đoán điểm yếu + gợi ý bài tự động
   4. Hộp Quà Ước Mơ — kết nối ba mẹ và con
```

---

## 31. BƯỚC TIẾP THEO — SẴN SÀNG CHO /plan

Brainstorm hoàn tất. BRIEF đã đủ để bắt đầu `/plan`.

**Thứ tự ưu tiên build:**
1. **Quiz Engine** (JSON → render đúng dạng bài) — core của tất cả
2. **Auth + D1 schema** — user, student_profiles, stats
3. **Trang Chủ Bé** — dashboard cá nhân hóa
4. **Dream Box** — setup + email approval flow
5. **Weekly Report** — email tự động cuối tuần
6. **Theme & Avatar** — cá nhân hóa giao diện
7. **Nội dung** — 5–10 bài JSON Flyers đầu tiên

→ Gõ `/plan` để bắt đầu thiết kế chi tiết kỹ thuật!

---

*Brainstorm hoàn tất ngày 2026-04-28. Tất cả quyết định đã được chốt.*
