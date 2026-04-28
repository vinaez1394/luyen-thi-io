# Phase 02: Theme System + Design Tokens
> Trạng thái: ⬜ Chưa làm | Phụ thuộc: Không có (có thể làm song song Phase 01)

---

## 🎯 Mục tiêu

Xây dựng toàn bộ design system: 6 themes màu sắc, typography, spacing, component base styles. Mọi thứ sau này đều dùng lại từ đây. **Làm đúng lần đầu = tiết kiệm rất nhiều thời gian.**

---

## ✅ Danh sách công việc

### 1. Cài Google Font Nunito
- [ ] Thêm vào `index.html`: `<link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800&display=swap" rel="stylesheet">`

### 2. Tạo file themes.css với 6 themes
- [ ] Theme: `purple` (mặc định)
- [ ] Theme: `ocean`
- [ ] Theme: `sakura`
- [ ] Theme: `forest`
- [ ] Theme: `night` (dark mode)
- [ ] Theme: `sunset`

### 3. Tạo file tokens.css (spacing, radius, shadow, typography)
- [ ] `--radius-sm/md/lg/xl`
- [ ] `--spacing-*` (bội số 8px)
- [ ] `--font-size-*` (min 14px)
- [ ] `--shadow-*`
- [ ] `--transition-*`

### 4. Tạo ThemeProvider component
- [ ] React context lưu theme hiện tại
- [ ] Hàm `applyTheme(theme)` → set `data-theme` trên `<html>`
- [ ] Load theme từ localStorage (fallback: từ student_profiles.theme)

### 5. Tạo ThemePicker component
- [ ] Grid 6 ô tròn màu sắc
- [ ] Click = đổi theme ngay lập tức (instant, không reload)
- [ ] Hiện checkmark trên theme đang chọn

### 6. Verify trên mobile
- [ ] Test dark theme (Night Sky) readable không
- [ ] Test contrast ratio tất cả themes (accessibility)

---

## 📄 Files cần tạo

| File | Mục đích |
|------|---------|
| `src/react-app/styles/themes.css` | 6 theme definitions |
| `src/react-app/styles/tokens.css` | Design tokens (radius, spacing, typography) |
| `src/react-app/styles/base.css` | Reset + base styles |
| `src/react-app/styles/components.css` | Shared component styles (Button, Card, Badge) |
| `src/react-app/components/ui/ThemeProvider.tsx` | Context + apply logic |
| `src/react-app/components/ui/ThemePicker.tsx` | UI picker component |

---

## 🎨 CSS Đầy đủ cần implement

```css
/* themes.css */

[data-theme="purple"] {
  --color-primary:   #6366F1;
  --color-primary-light: #EEF2FF;
  --color-secondary: #F59E0B;
  --color-success:   #10B981;
  --color-danger:    #F87171;
  --color-accent:    #EC4899;
  --color-bg:        #F5F3FF;
  --color-card:      #FFFFFF;
  --color-text:      #1E1B4B;
  --color-text-muted: #6B7280;
  --color-border:    #E5E7EB;
}

[data-theme="ocean"] { /* ... */ }
[data-theme="sakura"] { /* ... */ }
[data-theme="forest"] { /* ... */ }
[data-theme="night"] { /* ... — dark background */ }
[data-theme="sunset"] { /* ... */ }

/* tokens.css */
:root {
  --radius-sm:  12px;
  --radius-md:  20px;
  --radius-lg:  28px;
  --radius-xl:  999px;

  --spacing-1: 8px;
  --spacing-2: 16px;
  --spacing-3: 24px;
  --spacing-4: 32px;
  --spacing-5: 40px;
  --spacing-6: 48px;

  --font-xs:   14px;   /* nhỏ nhất cho phép */
  --font-sm:   15px;
  --font-md:   17px;
  --font-lg:   20px;
  --font-xl:   24px;
  --font-2xl:  30px;
  --font-3xl:  36px;

  --font-family: 'Nunito', sans-serif;

  --shadow-sm: 0 1px 3px rgba(0,0,0,.08);
  --shadow-md: 0 4px 16px rgba(0,0,0,.10);
  --shadow-lg: 0 8px 32px rgba(0,0,0,.12);

  --transition-fast:   150ms ease-out;
  --transition-normal: 250ms ease-out;
  --transition-slow:   400ms ease-out;

  --btn-height: 52px;   /* min touch target */
}
```

---

## 🧪 Tiêu chí hoàn thành

- [ ] Đổi theme trong ThemePicker → toàn bộ app đổi màu ngay lập tức
- [ ] Không có màu hardcode (tất cả qua `var(--color-*)`)
- [ ] Font Nunito hiển thị đúng
- [ ] Night theme không bị chói mắt
- [ ] Tất cả themes readable trên cả mobile lẫn desktop

---

*Sau khi xong → Cập nhật plan.md: Phase 02 = ✅*
*Tiếp theo: Phase 03 — Google Auth*
