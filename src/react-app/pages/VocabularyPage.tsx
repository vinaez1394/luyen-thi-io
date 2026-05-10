/**
 * VocabularyPage.tsx — Dashboard chọn topic
 *
 * Layout:
 *  - Hero header (gradient)
 *  - CertFilter: 5 tabs (Starters / Movers / Flyers / KET / PET)
 *  - TopicGrid: 2-3 cột topic cards
 *
 * URL: /cambridge/vocabulary?cert=flyers
 */
import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useVocabularyTopics } from "../hooks/useVocabularyLesson";
import type { CertLevel, VocabTopicItem } from "../types/vocabulary";
import { CERT_LABELS } from "../types/vocabulary";
import "./VocabularyPage.css";

// ── Cert tabs ─────────────────────────────────────────────────────────────────
const CERT_TABS: { key: CertLevel; label: string; short: string; color: string }[] = [
  { key: "starters", label: "Starters", short: "ST", color: "#7C3AED" },
  { key: "movers", label: "Movers", short: "MV", color: "#059669" },
  { key: "flyers", label: "Flyers", short: "FL", color: "#2563EB" },
  { key: "ket", label: "KET", short: "KET", color: "#D97706" },
  { key: "pet", label: "PET", short: "PET", color: "#DC2626" },
];

const CERT_STORAGE_KEY = "vocab_cert";

// ── TopicCard ─────────────────────────────────────────────────────────────────
interface TopicCardProps {
  topic: VocabTopicItem;
  cert: CertLevel;
  onClick: () => void;
}

function TopicCard({ topic, onClick }: TopicCardProps) {
  const masteredPct = topic.total_words > 0
    ? Math.round((topic.student_mastered / topic.total_words) * 100)
    : 0;
  const seenPct = topic.total_words > 0
    ? Math.round((topic.student_seen / topic.total_words) * 100)
    : 0;
  const hasProgress = topic.student_seen > 0;
  const isComplete = masteredPct >= 100;
  const hasReviewDue = topic.review_due > 0;

  return (
    <button
      className={`topic-card${isComplete ? " topic-card--complete" : ""}${hasReviewDue ? " topic-card--review" : ""}`}
      onClick={onClick}
      aria-label={`Học ${topic.label} — ${topic.total_words} từ`}
    >
      {/* Status badge */}
      {isComplete && (
        <span className="topic-card__badge topic-card__badge--done" aria-label="Đã thành thạo">
          ✅
        </span>
      )}
      {hasReviewDue && !isComplete && (
        <span className="topic-card__badge topic-card__badge--review" aria-label="Cần ôn lại">
          🔔 {topic.review_due}
        </span>
      )}

      {/* Emoji */}
      <span className="topic-card__emoji" aria-hidden="true">{topic.emoji}</span>

      {/* Label + count */}
      <h3 className="topic-card__label">{topic.label}</h3>
      <p className="topic-card__count">{topic.total_words} từ</p>

      {/* Progress bar (chỉ khi đã có tiến độ) */}
      {hasProgress && (
        <div className="topic-card__progress" title={`${seenPct}% đã xem, ${masteredPct}% thành thạo`}>
          <div className="topic-card__progress-bar">
            <div
              className="topic-card__progress-fill topic-card__progress-fill--seen"
              style={{ width: `${seenPct}%` }}
            />
            <div
              className="topic-card__progress-fill topic-card__progress-fill--mastered"
              style={{ width: `${masteredPct}%` }}
            />
          </div>
          <span className="topic-card__progress-label">
            {topic.student_mastered}/{topic.total_words} thành thạo
          </span>
        </div>
      )}
    </button>
  );
}

// ── VocabularyPage ────────────────────────────────────────────────────────────
export function VocabularyPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  // Lấy cert từ URL params → localStorage → default "flyers"
  const certFromUrl = searchParams.get("cert") as CertLevel | null;
  const [activeCert, setActiveCert] = useState<CertLevel>(() => {
    if (certFromUrl && CERT_LABELS[certFromUrl as CertLevel]) {
      return certFromUrl as CertLevel;
    }
    const saved = localStorage.getItem(CERT_STORAGE_KEY) as CertLevel | null;
    return (saved && CERT_LABELS[saved]) ? saved : "flyers";
  });

  const { topics, isLoading, error, refetch } = useVocabularyTopics(activeCert);

  // Sync URL khi đổi cert
  useEffect(() => {
    setSearchParams({ cert: activeCert }, { replace: true });
    localStorage.setItem(CERT_STORAGE_KEY, activeCert);
  }, [activeCert, setSearchParams]);

  const handleCertChange = (cert: CertLevel) => {
    setActiveCert(cert);
  };

  const handleTopicClick = (topic: VocabTopicItem) => {
    navigate(`/cambridge/vocabulary/${topic.key}?cert=${activeCert}`);
  };

  // Cert tab hiện tại
  const certMeta = CERT_TABS.find(t => t.key === activeCert)!;

  return (
    <div className="vocab-page">
      {/* ── Hero ─────────────────────────────────────────── */}
      <header className="vocab-hero">
        <div className="vocab-hero__content">
          <h1 className="vocab-hero__title">📚 Vocabulary</h1>
          <p className="vocab-hero__subtitle">
            Học từ vựng theo chủ đề với hệ thống ôn luyện thông minh (SRS)
          </p>
        </div>
      </header>

      {/* ── Cert Filter ──────────────────────────────────── */}
      <nav
        className="cert-filter"
        role="tablist"
        aria-label="Chọn cấp độ Cambridge"
      >
        {CERT_TABS.map(tab => (
          <button
            key={tab.key}
            role="tab"
            id={`cert-tab-${tab.key}`}
            aria-selected={activeCert === tab.key}
            aria-controls="topic-grid"
            className={`cert-tab${activeCert === tab.key ? " cert-tab--active" : ""}`}
            style={{ "--cert-color": tab.color } as React.CSSProperties}
            onClick={() => handleCertChange(tab.key)}
          >
            <span className="cert-tab__short">{tab.short}</span>
            <span className="cert-tab__label">{tab.label}</span>
          </button>
        ))}
      </nav>

      {/* ── Cert description ─────────────────────────────── */}
      <div className="cert-info">
        <p className="cert-info__label">
          {CERT_LABELS[activeCert]}
          <span className="cert-info__note">
            {" "}— hiển thị từ cấp {certMeta.short} và các cấp dưới
          </span>
        </p>
      </div>

      {/* ── Topic Grid ───────────────────────────────────── */}
      <main
        id="topic-grid"
        role="tabpanel"
        aria-labelledby={`cert-tab-${activeCert}`}
        className="topic-grid-wrapper"
      >
        {isLoading && (
          <div className="topic-grid-loading">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="topic-card topic-card--skeleton" aria-hidden="true" />
            ))}
          </div>
        )}

        {error && (
          <div className="topic-grid-error">
            <p>😕 {error}</p>
            <button className="btn btn-ghost" onClick={refetch}>Thử lại</button>
          </div>
        )}

        {!isLoading && !error && topics.length === 0 && (
          <div className="topic-grid-empty">
            <p>📭 Chưa có topic nào cho cấp độ {CERT_LABELS[activeCert]}.</p>
          </div>
        )}

        {!isLoading && topics.length > 0 && (
          <div className="topic-grid">
            {topics.map(topic => (
              <TopicCard
                key={topic.key}
                topic={topic}
                cert={activeCert}
                onClick={() => handleTopicClick(topic)}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
