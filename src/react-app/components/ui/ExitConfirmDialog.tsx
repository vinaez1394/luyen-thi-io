/**
 * ExitConfirmDialog.tsx — Dialog xác nhận thoát bài
 * Hiện khi bé nhấn ✕ trong QuizSubHeader
 */

import "./ExitConfirmDialog.css";

interface ExitConfirmDialogProps {
  onConfirm: () => void;
  onCancel:  () => void;
}

export function ExitConfirmDialog({ onConfirm, onCancel }: ExitConfirmDialogProps) {
  return (
    <div
      className="exit-dialog-overlay"
      role="presentation"
      onClick={onCancel}
    >
      <div
        className="exit-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="exit-dialog-title"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="exit-dialog__icon">😬</div>
        <h3 className="exit-dialog__title" id="exit-dialog-title">
          Thoát bài?
        </h3>
        <p className="exit-dialog__desc">
          Tiến độ câu trả lời sẽ chưa được lưu.
          <br />
          Bé có chắc muốn thoát không?
        </p>
        <div className="exit-dialog__actions">
          <button
            className="btn btn-outline"
            id="btn-exit-dialog-cancel"
            onClick={onCancel}
            autoFocus
          >
            Tiếp tục làm bài
          </button>
          <button
            className="btn btn-danger"
            id="btn-exit-dialog-confirm"
            onClick={onConfirm}
          >
            Thoát
          </button>
        </div>
      </div>
    </div>
  );
}
