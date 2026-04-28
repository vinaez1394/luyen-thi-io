/** UnknownTypeScreen.tsx — Fallback khi quiz type chưa được code */
import "./Quiz.css";

export function UnknownTypeScreen({ quizType }: { quizType: string }) {
  return (
    <div className="unknown-type">
      <div className="unknown-type__icon">🚧</div>
      <h3>Dạng bài đang được phát triển</h3>
      <p>Bài dạng <strong>{quizType}</strong> sẽ sớm xuất hiện!</p>
      <a href="/" className="btn btn-outline">← Về trang chủ</a>
    </div>
  );
}
