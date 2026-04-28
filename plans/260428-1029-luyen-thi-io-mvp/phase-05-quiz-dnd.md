# Phase 05: Quiz Engine — Drag & Drop
> Trạng thái: ⬜ Chưa làm | Phụ thuộc: Phase 04

---

## 🎯 Mục tiêu

Thêm tính năng kéo thả vào Quiz Engine. Đây là dạng bài **khó nhất về mặt kỹ thuật** vì cần hoạt động mượt mà trên cả mobile (touch) lẫn desktop (mouse).

> ⚠️ **QUAN TRỌNG:** DÙNG `dnd-kit`, KHÔNG dùng HTML5 DnD API

---

## ✅ Danh sách công việc

### Cài đặt
- [ ] `npm install @dnd-kit/core @dnd-kit/sortable @dnd-kit/utilities`

### DragDrop component — 2 chế độ

#### Chế độ 1: `drag-drop-fill` (kéo từ vào chỗ trống trong câu)
```
Từ có sẵn: [sky] [blue] [cat]
Câu: "The ___ is ___"
     → Kéo từ vào chỗ trống
```
- [ ] Hiện "word bank" phía trên (các thẻ từ)
- [ ] Câu văn có các ô `droppable` thay cho `___`
- [ ] Kéo thẻ từ vào ô → ô hiển thị từ đó
- [ ] Kéo từ ô ra → từ trở về word bank
- [ ] Mobile: touch drag mượt (dnd-kit handle tự động)

#### Chế độ 2: `drag-drop-match` (nối 2 cột)
```
Cột trái:        Cột phải:
[Từ 1]      →   [Nghĩa A]
[Từ 2]      →   [Nghĩa B]
[Từ 3]      →   [Nghĩa C]
```
- [ ] Cột trái: draggable items
- [ ] Cột phải: droppable zones
- [ ] Visual feedback khi đang hover over drop zone

### Shared DnD behaviors
- [ ] Dragging item: scale up nhẹ + shadow + opacity 80%
- [ ] Drop zone khi hover: border pulse animation
- [ ] Drop thành công: animation "snap" vào vị trí
- [ ] Touch target của mỗi draggable item: min 52px height
- [ ] Không cho kéo vào ô đã có từ (hoặc phải swap)

---

## 📄 Files cần tạo/sửa

| File | Mục đích |
|------|---------|
| `src/react-app/components/quiz/DragDrop.tsx` | DnD component chính |
| `src/react-app/components/quiz/DragDropFill.tsx` | Chế độ điền câu |
| `src/react-app/components/quiz/DragDropMatch.tsx` | Chế độ nối cột |
| `src/react-app/hooks/useDragDrop.ts` | DnD state logic |
| `content/flyers/reading/RW3-001.json` | Test data DnD |

---

## 📦 JSON mẫu DragDrop

```json
{
  "id": "RW3-001",
  "type": "drag-drop-fill",
  "instructions_vi": "Kéo các từ vào đúng chỗ trống trong câu.",
  "questions": [
    {
      "id": "q1",
      "template": "The {0} is very {1} today.",
      "word_bank": ["weather", "sunny", "cat", "blue"],
      "correct": ["weather", "sunny"],
      "explanation_vi": "Câu đúng: The weather is very sunny today."
    }
  ]
}
```

---

## 🧪 Tiêu chí hoàn thành

- [ ] Kéo thả hoạt động trên Chrome desktop
- [ ] Kéo thả hoạt động trên Safari iOS (iPhone/iPad)
- [ ] Kéo thả hoạt động trên Chrome Android
- [ ] Animation mượt (không giật)
- [ ] Không bị "stuck" drag state khi thả sai vị trí
- [ ] Submit tính đúng điểm

---

*Sau khi xong → Cập nhật plan.md: Phase 05 = ✅*
*Tiếp theo: Phase 06 — Audio Player + Timer*
