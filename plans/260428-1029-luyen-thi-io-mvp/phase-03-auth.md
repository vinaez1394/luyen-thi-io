# Phase 03: Auth — Google OAuth
> Trạng thái: ⬜ Chưa làm | Phụ thuộc: Phase 01 (D1 đã có bảng users)

---

## 🎯 Mục tiêu

Phụ huynh đăng nhập bằng Google → tạo/tìm user trong D1 → tạo session → ở trạng thái đăng nhập khi reload trang.

---

## ✅ Danh sách công việc

### Backend (Hono)
- [ ] Cài: `npm i hono google-auth-library`
- [ ] Tạo route: `GET /api/auth/google` → redirect đến Google OAuth consent
- [ ] Tạo route: `GET /api/auth/callback` → exchange code → lấy Google user info
- [ ] Logic: tìm user trong D1 theo google_id → nếu chưa có thì tạo mới
- [ ] Tạo session token (JWT hoặc random token lưu vào KV)
- [ ] Set cookie `session` httpOnly, SameSite=Lax
- [ ] Route `GET /api/auth/me` → đọc cookie → trả về user info
- [ ] Route `POST /api/auth/logout` → xóa cookie + KV session

### Frontend (React)
- [ ] `useAuth()` hook → gọi `/api/auth/me`, trả về `{ user, isLoading, logout }`
- [ ] `LoginPage` → nút "Đăng nhập bằng Google" lớn, đẹp
- [ ] Protected route wrapper → redirect về `/login` nếu chưa đăng nhập
- [ ] Sau login lần đầu → redirect đến trang "Tạo hồ sơ cho bé"

### Trang "Tạo hồ sơ cho bé" (Onboarding)
- [ ] Input: Tên bé (bắt buộc)
- [ ] Chọn avatar (grid 12 ảnh)
- [ ] Chọn theme (6 ô màu)
- [ ] Nhấn "Bắt đầu!" → tạo student_profile + student_stats trong D1
- [ ] Redirect về Dashboard

---

## 📄 Files cần tạo

| File | Mục đích |
|------|---------|
| `src/worker/routes/auth.ts` | OAuth routes |
| `src/worker/lib/session.ts` | Tạo/verify session token |
| `src/react-app/hooks/useAuth.ts` | Auth state hook |
| `src/react-app/pages/LoginPage.tsx` | Trang đăng nhập |
| `src/react-app/pages/OnboardingPage.tsx` | Setup hồ sơ bé lần đầu |
| `src/react-app/components/ui/ProtectedRoute.tsx` | Route guard |

---

## 🧪 Tiêu chí hoàn thành

- [ ] Click "Đăng nhập Google" → Google consent → callback → về app đã logged in
- [ ] Reload trang → vẫn còn đăng nhập (session persist)
- [ ] Lần đầu đăng nhập → vào Onboarding → chọn tên/avatar/theme
- [ ] Lần tiếp theo → thẳng vào Dashboard
- [ ] `/api/auth/me` trả về user đúng
- [ ] Logout xóa sạch session

---

## ⚙️ Env vars cần

```
GOOGLE_CLIENT_ID=...
GOOGLE_CLIENT_SECRET=...
GOOGLE_REDIRECT_URI=https://luyen-thi-io.workers.dev/api/auth/callback
SESSION_SECRET=random-32-char-string
```

---

*Sau khi xong → Cập nhật plan.md: Phase 03 = ✅*
*Tiếp theo: Phase 04 — Quiz Engine Core*
