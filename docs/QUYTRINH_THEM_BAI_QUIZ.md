# 📚 QUY TRÌNH THÊM BÀI TẬP (VẬN HÀNH KIẾN TRÚC MỚI)

Bắt đầu từ 2026-05-10, kiến trúc Quiz Catalog đã chuyển sang **Dynamic Registry** (D1 + KV + R2). 
Việc thêm bài học mới **KHÔNG CẦN sửa code Frontend** và **KHÔNG CẦN deploy lại**.

---

## 🚀 QUY TRÌNH CHUẨN 3 BƯỚC

### BƯỚC 1: Upload File JSON lên R2 Bucket
Nội dung bài tập (file JSON) được lưu tại Cloudflare R2.
*Lưu ý: Tên file và thư mục trên R2 phải khớp với format quy định trong hàm `getR2Key` (file `quiz.ts`). Ví dụ bài Flyers Part 2 thì ID phải bắt đầu bằng `FW2-`.*

**Lệnh Wrangler:**
```bash
npx wrangler r2 object put luyen-thi-content/quizzes/<pathway>/<subject>/<part>/<TEN-BAI>.json --file=đường/dẫn/đến/file.json
```

*Ví dụ thêm bài Flyers Part 2 Hard:*
```bash
npx wrangler r2 object put luyen-thi-content/quizzes/cambridge/flyers/part2/FW2-HARD-001.json --file=content/Cambridge/flyers/part2/FW2-HARD-001.json
```

### BƯỚC 2: Thêm Metadata vào Database (D1 Catalog)
Khai báo thông tin bài tập vào D1 để API trả về cho Frontend (hiển thị giao diện thẻ bài học).

**Lệnh Wrangler:**
```bash
npx wrangler d1 execute luyen-thi-db --remote --command="INSERT INTO quiz_catalog (quiz_id, slug, pathway, subject_slug, title, skill, part, difficulty, questions, is_free, is_published) VALUES ('FW2-HARD-001', 'fw2-hard-001', 'cambridge', 'flyers', 'Tên Bài Học (Hard)', 'reading', 2, 'hard', 5, 0, 1);"
```
*Giải thích các cột quan trọng:*
- `is_free`: `1` (Miễn phí) hoặc `0` (Premium/Khóa).
- `is_published`: `1` (Hiện trên web) hoặc `0` (Ẩn).

### BƯỚC 3: Xóa KV Cache (Invalidate Cache) - QUAN TRỌNG
Hệ thống sử dụng Edge Caching (KV) để tăng tốc độ load và tiết kiệm chi phí D1. Cache mặc định tồn tại 30 phút. Bạn **BẮT BUỘC** phải gọi API này để bài học mới xuất hiện trên website ngay lập tức.

**Lệnh cURL:**
```bash
curl -X POST "https://luyenthi.io.vn/api/subjects/cache/invalidate" \
  -H "Content-Type: application/json" \
  -d '{"pathway":"cambridge","subject":"flyers"}'
```
*(Thay thế URL bằng tên miền thực tế. Bạn có thể truyền `{}` để xóa toàn bộ cache các môn).*

---

## 🔍 CÁCH KIỂM TRA ĐỘ ỔN ĐỊNH CỦA HỆ THỐNG

Để giám sát và chứng minh kiến trúc mới đang vận hành trơn tru (đặc biệt là cơ chế Cache KV và API), hãy thực hiện 3 phương pháp sau:

### Phương pháp 1: Kiểm tra trải nghiệm thực tế & Network Tab (Trình duyệt)
1. Mở website (trang chủ hoặc trang môn học như `/cambridge/flyers`).
2. Mở **Chrome DevTools** (F12) -> Tab **Network** -> Lọc (Filter) theo chữ `subjects`.
3. F5 tải lại trang. Bạn sẽ thấy trình duyệt gọi API `GET /api/subjects?pathway=...`
4. Click vào request đó, xem phần **Response Headers**:
   - Thấy dòng `X-Cache: HIT` 👉 Tuyệt vời! Hệ thống đang lấy data từ KV Edge ở gần người dùng nhất (tốc độ mili-giây, không tốn tiền query D1).
   - Thấy dòng `X-Cache: MISS` 👉 Hệ thống vừa truy vấn D1 lấy dữ liệu và đã tự động lưu lên KV cho lần gọi sau.

### Phương pháp 2: Giám sát trên Cloudflare Dashboard (Metrics)
Do 99% request của học sinh sẽ bị chặn lại và phục vụ bởi KV Cache, biểu đồ của D1 sẽ rất "phẳng lặng":
1. Đăng nhập Cloudflare Dashboard -> **Workers & Pages** -> Chọn DB `luyen-thi-db` -> Tab **Metrics**.
2. Kiểm tra biểu đồ **Row Reads** (Số dòng đọc). Nó sẽ cực kỳ thấp so với lượng truy cập website thực tế. Điều này chứng tỏ KV Cache đang che chắn xuất sắc cho Database.

### Phương pháp 3: Đo lường Frontend JS Bundle Size (Mục tiêu cốt lõi)
- Trước đây (Kiến trúc cũ Legacy), khi thêm bài mới, file `index.js` của trình duyệt sẽ tự phình to ra và chậm load dần.
- Từ bây giờ (Kiến trúc mới), bất kể bạn thêm 10 bài hay 500 bài vào D1, **kích thước file JS của Frontend vẫn sẽ đứng im ở mức ~176KB**. Hệ thống đã được "giải phóng" hoàn toàn khỏi gánh nặng tải metadata bài học!
