# 💡 BRIEF: Chuyên Mục "Kiến Thức" (Knowledge Blog)

**Ngày tạo:** 2026-05-06
**Dự án:** luyen-thi-io

---

## 1. MỤC TIÊU DỰ ÁN
Tích hợp một chuyên mục "Kiến thức" vào hệ thống `luyen-thi-io` nhằm cung cấp bài viết học thuật, mẹo thi cử, và hướng dẫn lộ trình. 
**Mục đích:** 
- Tăng độ tin cậy với phụ huynh.
- Cung cấp vòng lặp "Học lý thuyết -> Thực hành ngay" cho học sinh.
- Tối ưu SEO để thu hút traffic tự nhiên (Organic Traffic).

## 2. ĐỐI TƯỢNG SỬ DỤNG & CẤU TRÚC
Chuyên mục chia làm 2 Tab rõ rệt với văn phong và giao diện đặc thù:

### 👨‍👩‍👧 Tab 1: Dành cho Ba Mẹ
- **Nội dung:** Lộ trình thi Cambridge, phân tích cấu trúc đề, mẹo đồng hành cùng con.
- **Tính chất:** Chuyên nghiệp, chi tiết, phân tích sâu.

### 🦸‍♂️ Tab 2: Góc Học Tập cho Bé
- **Nội dung:** Mẹo giải toán (Gà & Thỏ, Trồng cây), Bí kíp Reading/Listening, Ngữ pháp.
- **Tính chất:** Trực quan, ngắn gọn. 
- **Đặc biệt:** Dưới mỗi bài viết bắt buộc có nút CTA **"🎮 Thử thách ngay"** dẫn trực tiếp vào bài Quiz liên quan.

## 3. TỔ CHỨC ĐIỀU HƯỚNG (NAVIGATION)
Áp dụng mô hình điều hướng kết hợp (giống Khan Academy):
- **Cây thư mục bên trái (Categories):** Lọc theo Môn học và Phân môn (VD: Toán -> Toán Logic).
- **Thẻ phân loại ở trên cùng (Tags):** Lọc nhanh theo chủ đề ngách (VD: `#MeoGiaiNhanh`, `#GaVaTho`).

## 4. YÊU CẦU KỸ THUẬT & SEO (GIAI ĐOẠN 1)

### Quản lý nội dung (CMS)
- **Phương pháp:** Viết bài bằng file **Markdown (`.md`)**.
- **Lưu trữ:** Lưu trong thư mục source code (VD: `content/blog/`) và đồng bộ lên Cloudflare R2 (giống hệ thống Quiz hiện tại). Không dùng Database hay Admin Panel trong Phase 1.
- **Dữ liệu bài viết (Frontmatter):** Mỗi file Markdown sẽ có phần khai báo meta ở đầu (Tiêu đề, Mô tả SEO, Tab, Category, Tags, URL bài Quiz liên kết...).

### Tối ưu SEO & Trải nghiệm Đọc (Readability)
Bài viết sẽ được tạo bằng skill `SEO Fundamentals`, do đó nền tảng cần hỗ trợ render các thành phần sau:
- **Thẻ Meta chuẩn SEO:** Dynamic `<title>`, `<meta description>`, Open Graph.
- **Mục lục tự động (Table of Contents - TOC):** Tự động bóc tách các Heading ra làm menu nhảy nhanh.
- **Typography rõ ràng:** Phân biệt cực kỳ rõ ràng giữa `Heading 2`, `Heading 3`, chữ bôi đậm, list, quote.
- **Điều hướng bài viết:** Có block `<- Bài trước | Bài tiếp ->` ở cuối trang để giữ chân người dùng.

## 5. CHIẾN LƯỢC HÌNH ẢNH & MINH HỌA

### 📦 Kho lưu trữ ảnh: Cloudflare R2 (ĐÃ CHỐT)
- Ảnh **KHÔNG lưu trong Github source code** để tránh bloat repo.
- Tất cả ảnh upload thẳng lên **Cloudflare R2** (thư mục `images-blog/`).
- Trong file `.md`, chèn link R2 trực tiếp: `![Mô tả](https://pub-xxx.r2.dev/images-blog/ten-anh.png)`.

### 🎨 3 Nhóm Chiến lược Minh hoạ (theo độ phức tạp)

| Nhóm | Loại hình | Phương pháp | Ví dụ |
|------|-----------|-------------|-------|
| ✅ Nhóm 1 | Hàng thẳng đơn giản | Emoji + ký tự ASCII | Bài trồng cây, que diêm, nút thắt |
| 🟡 Nhóm 2 | Có dấu ngoặc / đường cong / hình học phẳng | SVG nhúng trong Markdown | Dấu ngoặc khoảng cách, cộng bằng 10 |
| ❌ Nhóm 3 | Phức tạp (đồng hồ, khối 3D) | Ảnh lưu trên R2 | Đồng hồ có kim, hình khối 3D |

### 🛡️ Xử lý Khi Thiếu Ảnh (Fallback)
- **Ảnh bìa (Thumbnail):** Hệ thống tự động hiển thị ảnh bìa mặc định theo môn học (Toán / Tiếng Anh / Ba Mẹ). Không bao giờ có chỗ trống.
- **Ảnh trong bài viết:** Hiển thị khung **Placeholder** màu xám nhạt, bo góc đẹp, có chữ *"Đang cập nhật hình ảnh 🖼️"*. Giúp tác giả dễ nhận ra chỗ chưa chèn link.

### ⚠️ Ghi chú cho file Quiz JSON
- Hệ thống Quiz JSON hiện tại **chỉ render text và HTML đơn giản**, chưa hỗ trợ SVG/Mermaid.
- Nếu muốn có hình minh họa trong Quiz → Bắt buộc dùng ảnh (link R2).
- Trang Blog thì linh hoạt hơn, sẽ hỗ trợ SVG inline ở Phase 3.

## 6. ƯỚC TÍNH ĐỘ PHỨC TẠP
- **Mức độ:** Trung bình.
- **Thách thức:** Xây dựng trình parser Markdown (`react-markdown`) hỗ trợ tốt Frontmatter (YAML), sinh mục lục tự động (TOC), SVG inline, và quản lý state cho bộ lọc Tags + Menu mượt mà trên cả Mobile và Desktop.

## 7. BƯỚC TIẾP THEO
Phase 01: Khởi tạo cấu trúc thư mục `content/blog/`, định nghĩa Types, tạo script sinh index, cập nhật Worker Router.

*Cập nhật: 2026-05-06 — Bổ sung chiến lược hình ảnh & minh họa*
