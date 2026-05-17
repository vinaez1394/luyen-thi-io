/**
 * FlyersListeningPart1Engine.tsx — v1.0
 * Cambridge Flyers Listening — Part 1: "Listen and Draw Lines"
 *
 * Cơ chế Click-to-Connect:
 *  - 7 tên hiển thị trên và dưới ảnh (giống đề thi thật)
 *  - Click tên → tên active, hotspot ● hiện trên ảnh
 *  - Click hotspot ● → vẽ SVG line nối tên ↔ nhân vật
 *  - Example (Robert) vẽ sẵn màu xám, không xóa được
 *  - Audio: phát 1 lần duy nhất, sau đó disable nút
 *  - Submit: chỉ active khi đủ 5/5 nối
 *
 * Standard Modules: VocabPanel, Star mechanic, Auth nudge, DB tracking
 */

import { useState, useCallback, useRef, useEffect, useLayoutEffect, useMemo } from "react";
import "./FlyersListeningPart1Engine.css";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface VocabHighlightItem {
  word: string;
  vocabulary_bank_id: string | null;
  translation_vi: string;
  ipa: string;
  audio_url: string | null;
}

export interface FL1Character {
  id: string;
  description: string;
  hotspot: { x: number; y: number }; // percentage 0-100
}

export interface FL1Question {
  id: string;
  name: string;
  correct_character_id: string;
}

export interface FL1Example {
  name: string;
  character_id: string;
}

export interface FlyersListeningP1Quiz {
  id: string;
  title: string;
  skill: string;
  level: string;
  part: number;
  type: "flyers-listening-p1";
  is_free: boolean;
  pathway: string;
  group: string;
  difficulty?: string;
  image_url: string;
  audio_url: string;
  names: string[];           // 7 tên (1 example + 5 câu + 1 mồi)
  characters: FL1Character[];
  example: FL1Example;
  questions: FL1Question[];
  vocab_highlight?: VocabHighlightItem[];
}

interface FL1Result {
  score: number;
  maxScore: number;
  percentage: number;
  starsEarned: number;
  answersForApi: Record<string, string>;
  startTime: number;
}

interface FlyersListeningPart1EngineProps {
  quiz: FlyersListeningP1Quiz;
  onSubmitResult?: (result: FL1Result) => void;
  onFinish?: () => void;
  onBack?: () => void;
  isLoggedIn?: boolean;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function calcStars(pct: number): number {
  if (pct >= 90) return 5;
  if (pct >= 70) return 3;
  if (pct >= 50) return 2;
  return 1;
}

function formatTime(seconds: number): string {
  if (!isFinite(seconds) || seconds < 0) return "0:00";
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

// ─── VocabPanel ──────────────────────────────────────────────────────────────

const FREE_LOOKUPS = 3;

interface VocabPanelProps {
  vocab: VocabHighlightItem[];
  isLoggedIn: boolean;
  quizId: string;
}

function VocabPanel({ vocab, isLoggedIn, quizId }: VocabPanelProps) {
  const [revealed, setRevealed] = useState<Set<string>>(new Set());
  const [lookupCount, setLookupCount] = useState(0);
  const [showAuthNudge, setShowAuthNudge] = useState(false);
  const [showStarWarn, setShowStarWarn] = useState(false);

  const handleAudio = useCallback((item: VocabHighlightItem) => {
    if (item.audio_url) {
      const audio = new Audio(item.audio_url);
      audio.play().catch(() => {
        const utt = new SpeechSynthesisUtterance(item.word);
        utt.lang = "en-US";
        speechSynthesis.speak(utt);
      });
    } else {
      const utt = new SpeechSynthesisUtterance(item.word);
      utt.lang = "en-US";
      speechSynthesis.speak(utt);
    }
  }, []);

  const handleTranslate = useCallback(async (item: VocabHighlightItem) => {
    if (!isLoggedIn) { setShowAuthNudge(true); return; }
    if (revealed.has(item.word)) return;
    const newCount = lookupCount + 1;
    if (newCount > FREE_LOOKUPS) {
      setShowStarWarn(true);
      try {
        await fetch("/api/student/stars/deduct", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ amount: 1, reason: "vocab_lookup", quiz_id: quizId }),
          credentials: "include",
        });
      } catch { /* silent */ }
    }
    setLookupCount(newCount);
    setRevealed(prev => new Set([...prev, item.word]));
    if (item.vocabulary_bank_id) {
      fetch("/api/student/vocab/seen", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ word_id: item.vocabulary_bank_id, word: item.word }),
        credentials: "include",
      }).catch(() => {/* silent */});
    }
  }, [isLoggedIn, revealed, lookupCount, quizId]);

  const remaining = Math.max(0, FREE_LOOKUPS - lookupCount);

  return (
    <div className="fl1-vocab-panel">
      <div className="fl1-vocab-panel__header">
        <span className="fl1-vocab-panel__title">📚 Vocabulary</span>
        <span className={`fl1-vocab-panel__counter ${remaining === 0 ? "fl1-vocab-panel__counter--zero" : ""}`}>
          {remaining > 0 ? `${remaining} free look-ups` : "1⭐ each"}
        </span>
      </div>
      <ul className="fl1-vocab-list" role="list">
        {vocab.map((item) => {
          const isRevealed = revealed.has(item.word);
          return (
            <li key={item.word} className="fl1-vocab-item">
              <div className="fl1-vocab-item__top">
                <span className="fl1-vocab-item__word">{item.word}</span>
                {item.ipa && <span className="fl1-vocab-item__ipa">{item.ipa}</span>}
                <div className="fl1-vocab-item__actions">
                  <button className="fl1-vocab-btn fl1-vocab-btn--audio" onClick={() => handleAudio(item)} title="Pronunciation" aria-label={`Pronounce ${item.word}`}>🔊</button>
                  <button
                    className={`fl1-vocab-btn fl1-vocab-btn--translate ${isRevealed ? "fl1-vocab-btn--revealed" : ""}`}
                    onClick={() => handleTranslate(item)}
                    disabled={isRevealed}
                    aria-label={`Xem nghĩa của ${item.word}`}
                  >
                    {isRevealed ? "✓ VN" : "VN"}
                  </button>
                </div>
              </div>
              {isRevealed && (
                <div className="fl1-vocab-item__translation" role="status" aria-live="polite">
                  🇻🇳 <strong>{item.translation_vi}</strong>
                </div>
              )}
            </li>
          );
        })}
      </ul>

      {showAuthNudge && (
        <div className="fl1-nudge-overlay" role="dialog" aria-modal="true">
          <div className="fl1-nudge-popup">
            <p>🔐 <strong>Log in to look up words & save progress!</strong></p>
            <p className="fl1-nudge-popup__sub">Your vocabulary progress will be saved for later review.</p>
            <div className="fl1-nudge-popup__actions">
              <a href="/api/auth/google" className="btn btn-success">Sign in with Google</a>
              <button className="btn btn-outline" onClick={() => setShowAuthNudge(false)}>Maybe later</button>
            </div>
          </div>
        </div>
      )}

      {showStarWarn && (
        <div className="fl1-star-toast" role="alert" aria-live="assertive">
          ⭐ You used 1 star to look up a word!
          <button className="fl1-star-toast__close" onClick={() => setShowStarWarn(false)} aria-label="Close">✕</button>
        </div>
      )}
    </div>
  );
}

// ─── SVG Line Overlay ─────────────────────────────────────────────────────────

interface LinePoint {
  x: number;
  y: number;
}

interface DrawnLine {
  name: string;
  charId: string;
  start: LinePoint;  // center of name chip (absolute px relative to wrapper)
  end: LinePoint;    // hotspot position (absolute px relative to wrapper)
  isExample?: boolean;
  isCorrect?: boolean;
  isWrong?: boolean;
}

// ─── Main Engine ──────────────────────────────────────────────────────────────

export function FlyersListeningPart1Engine({
  quiz,
  onSubmitResult,
  onFinish,
  onBack,
  isLoggedIn = false,
}: FlyersListeningPart1EngineProps) {
  // connections: { [charId]: nameStr } — hotspot là key, tên là value
  // Thiết kế mới: Submit active khi đủ 5 hotspot (không tính example) được điền
  const [connections, setConnections] = useState<Record<string, string>>({});
  const [activeName, setActiveName] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [result, setResult] = useState<FL1Result | null>(null);
  const [audioPlayed, setAudioPlayed] = useState(false);
  const [audioPlaying, setAudioPlaying] = useState(false);
  const [audioPaused, setAudioPaused] = useState(false);
  const [audioDuration, setAudioDuration] = useState(0);
  const [audioCurrentTime, setAudioCurrentTime] = useState(0);
  const [lines, setLines] = useState<DrawnLine[]>([]);

  const startTimeRef = useRef<number>(Date.now());
  const wrapperRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const nameRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Build character map for quick lookup
  const charMap = useMemo(
    () => Object.fromEntries(quiz.characters.map(c => [c.id, c])),
    [quiz.characters]
  );
  const questionMap = useMemo(
    () => Object.fromEntries(quiz.questions.map(q => [q.name, q])),
    [quiz.questions]
  );

  // Split names: top row / bottom row
  // 7 names → first 3 top, last 4 bottom (or adjust based on even/odd)
  const topNames = quiz.names.slice(0, 3);
  const bottomNames = quiz.names.slice(3);

  // ── Calculate line positions ───────────────────────────────────────────────

  const recalcLines = useCallback(() => {
    if (!wrapperRef.current || !imageRef.current) return;
    const wrapperRect = wrapperRef.current.getBoundingClientRect();
    const imgRect = imageRef.current.getBoundingClientRect();

    const newLines: DrawnLine[] = [];

    // Example line (always drawn)
    const exampleChar = charMap[quiz.example.character_id];
    const exampleNameEl = nameRefs.current[quiz.example.name];
    if (exampleChar && exampleNameEl) {
      const nameRect = exampleNameEl.getBoundingClientRect();
      newLines.push({
        name: quiz.example.name,
        charId: quiz.example.character_id,
        isExample: true,
        start: {
          x: nameRect.left + nameRect.width / 2 - wrapperRect.left,
          y: nameRect.top + nameRect.height / 2 - wrapperRect.top,
        },
        end: {
          x: imgRect.left + (exampleChar.hotspot.x / 100) * imgRect.width - wrapperRect.left,
          y: imgRect.top + (exampleChar.hotspot.y / 100) * imgRect.height - wrapperRect.top,
        },
      });
    }

    // User connections: iterate {charId → name}
    for (const [charId, name] of Object.entries(connections)) {
      const char = charMap[charId];
      const nameEl = nameRefs.current[name];
      if (!char || !nameEl) continue;
      const nameRect = nameEl.getBoundingClientRect();
      // Để đánh giá đúng/sai, tìm question có correct_character_id === charId
      const q = quiz.questions.find(qst => qst.correct_character_id === charId);
      const isCorrect = submitted && !!q && connections[charId] === q.name;
      const isWrong = submitted && !!q && connections[charId] !== q.name;
      newLines.push({
        name,
        charId,
        start: {
          x: nameRect.left + nameRect.width / 2 - wrapperRect.left,
          y: nameRect.top + nameRect.height / 2 - wrapperRect.top,
        },
        end: {
          x: imgRect.left + (char.hotspot.x / 100) * imgRect.width - wrapperRect.left,
          y: imgRect.top + (char.hotspot.y / 100) * imgRect.height - wrapperRect.top,
        },
        isCorrect,
        isWrong,
      });
    }

    setLines(newLines);
  }, [connections, submitted, quiz, charMap]);

  // Recalc lines on layout changes
  useLayoutEffect(() => {
    recalcLines();
  }, [recalcLines]);

  useEffect(() => {
    const ro = new ResizeObserver(recalcLines);
    if (wrapperRef.current) ro.observe(wrapperRef.current);
    window.addEventListener("resize", recalcLines);
    return () => { ro.disconnect(); window.removeEventListener("resize", recalcLines); };
  }, [recalcLines]);

  // Wait for image to load before first recalc
  useEffect(() => {
    const img = imageRef.current;
    if (!img) return;
    if (img.complete) { recalcLines(); return; }
    img.addEventListener("load", recalcLines);
    return () => img.removeEventListener("load", recalcLines);
  }, [recalcLines]);

  // ── Audio ──────────────────────────────────────────────────────────────────

  // Cleanup audio khi component unmount
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = "";
        audioRef.current = null;
      }
    };
  }, []);

  const handlePlay = useCallback(() => {
    // Nếu đang bị pause → resume
    if (audioPaused && audioRef.current) {
      audioRef.current.play().catch(() => {});
      setAudioPlaying(true);
      setAudioPaused(false);
      return;
    }
    // Đã phát xong → không cho phát lại
    if (audioPlayed) return;
    // Đang phát → không làm gì
    if (audioPlaying) return;

    const audio = new Audio(quiz.audio_url);
    audioRef.current = audio;
    setAudioPlaying(true);
    setAudioPaused(false);
    setAudioCurrentTime(0);

    audio.addEventListener("loadedmetadata", () => {
      setAudioDuration(audio.duration || 0);
    });
    audio.addEventListener("timeupdate", () => {
      setAudioCurrentTime(audio.currentTime);
    });
    audio.play().catch(err => {
      console.error("[FL1] Audio play error:", err);
      setAudioPlaying(false);
    });
    audio.addEventListener("ended", () => {
      setAudioPlaying(false);
      setAudioPaused(false);
      setAudioPlayed(true);
      setAudioCurrentTime(audio.duration || 0);
    });
  }, [audioPlayed, audioPlaying, audioPaused, quiz.audio_url]);

  const handlePause = useCallback(() => {
    if (!audioPlaying || !audioRef.current) return;
    audioRef.current.pause();
    setAudioPlaying(false);
    setAudioPaused(true);
  }, [audioPlaying]);

  const handleSeek = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (!audioRef.current) return;
    const t = Number(e.target.value);
    audioRef.current.currentTime = t;
    setAudioCurrentTime(t);
  }, []);

  // ── Click-to-Connect ───────────────────────────────────────────────────────

  const handleNameClick = useCallback((name: string) => {
    if (submitted) return;
    if (name === quiz.example.name) return; // Robert locked

    // Tìm xem tên này hiện đang nối vào charId nào
    const currentCharId = Object.entries(connections).find(([, n]) => n === name)?.[0];

    if (activeName === name) {
      setActiveName(null); // deselect
    } else if (currentCharId) {
      // Đã nối: gỡ ra và cho phép chọn lại
      setConnections(prev => { const n = { ...prev }; delete n[currentCharId]; return n; });
      setActiveName(name);
    } else {
      setActiveName(name);
    }
  }, [submitted, activeName, connections, quiz.example.name]);

  const handleHotspotClick = useCallback((charId: string) => {
    if (submitted || !activeName) return;
    // Hotspot của example bị khóa — xử lý ngay ở phần render, nhưng bảo vệ thêm ở đây
    if (charId === quiz.example.character_id) return;

    setConnections(prev => {
      const next = { ...prev };
      // Nếu hotspot này đang có tên khác → ghi đè (swap)
      // Nếu activeName đang nối chỗ khác → gỡ chỗ cũ trước
      const oldCharId = Object.entries(next).find(([, n]) => n === activeName)?.[0];
      if (oldCharId) delete next[oldCharId];
      next[charId] = activeName;
      return next;
    });
    setActiveName(null);
  }, [submitted, activeName, quiz.example.character_id]);

  // ── Submit ─────────────────────────────────────────────────────────────────

  const handleSubmit = useCallback(() => {
    let score = 0;
    for (const q of quiz.questions) {
      // connections[correct_character_id] === expected_name → đúng
      if (connections[q.correct_character_id] === q.name) score++;
    }
    const maxScore = quiz.questions.length;
    const percentage = Math.round((score / maxScore) * 100);
    const starsEarned = calcStars(percentage);

    // answersForApi: { [questionId]: name_user_put_in_correct_slot }
    const answersForApi: Record<string, string> = {};
    for (const q of quiz.questions) {
      answersForApi[q.id] = connections[q.correct_character_id] ?? "";
    }

    const res: FL1Result = {
      score, maxScore, percentage, starsEarned,
      answersForApi,
      startTime: startTimeRef.current,
    };

    setResult(res);
    setSubmitted(true);
    onSubmitResult?.(res);
  }, [quiz.questions, connections, onSubmitResult]);

  const handleReset = useCallback(() => {
    setConnections({});
    setActiveName(null);
    setSubmitted(false);
    setResult(null);
  }, []);

  // connections là { charId → name } — chỉ chứa non-example connections
  // Submit active khi user đã nối ĐỦ 5 hotspot bất kỳ (không tính example)
  const connectedCount = Object.keys(connections).length;
  const allConnected = connectedCount >= quiz.questions.length;
  const hasVocab = quiz.vocab_highlight && quiz.vocab_highlight.length > 0;

  // TakenCharIds: example + các charId được lưu trong connections
  const takenCharIds = new Set([
    quiz.example.character_id,
    ...Object.keys(connections),
  ]);

  // ── Render ─────────────────────────────────────────────────────────────────

  const renderNameChip = (name: string) => {
    const isExample = name === quiz.example.name;
    const isActive = activeName === name;
    // isConnected: kiểm tra tên này có trong Object.values(connections) không
    const isConnected = isExample || Object.values(connections).includes(name);
    // Để show đúng/sai sau submit: tìm charId mà user đặt tên này vào
    const myCharId = Object.entries(connections).find(([, n]) => n === name)?.[0];
    const q = questionMap[name]; // question yêu cầu tên này (nếu có)
    const isCorrect = submitted && !!q && myCharId === q.correct_character_id;
    const isWrong = submitted && !!q && !!myCharId && myCharId !== q.correct_character_id;
    const isMissed = submitted && !!q && !myCharId;

    return (
      <button
        key={name}
        ref={el => { nameRefs.current[name] = el; }}
        className={[
          "fl1-name-chip",
          isExample ? "fl1-name-chip--example" : "",
          isActive ? "fl1-name-chip--active" : "",
          isConnected && !isExample ? "fl1-name-chip--connected" : "",
          isCorrect ? "fl1-name-chip--correct" : "",
          isWrong ? "fl1-name-chip--wrong" : "",
          isMissed ? "fl1-name-chip--missed" : "",
        ].filter(Boolean).join(" ")}
        onClick={() => handleNameClick(name)}
        disabled={isExample || submitted}
        aria-label={`Name: ${name}${isExample ? " (example)" : ""}${isConnected ? " (connected)" : ""}`}
        title={isExample ? "Example — already connected" : name}
      >
        {name}
        {isExample && <span className="fl1-name-chip__tag">★</span>}
        {isCorrect && <span className="fl1-name-chip__tag fl1-name-chip__tag--ok">✓</span>}
        {isWrong && <span className="fl1-name-chip__tag fl1-name-chip__tag--err">✗</span>}
        {isMissed && <span className="fl1-name-chip__tag fl1-name-chip__tag--err">–</span>}
      </button>
    );
  };

  return (
    <div className="fl1-engine" ref={wrapperRef}>

      {/* ── SVG overlay — FULL ENGINE, outside image-container so lines cross freely ── */}
      <svg
        className="fl1-svg-overlay"
        width="100%"
        height="100%"
        aria-hidden="true"
      >
        <defs>
          <filter id="fl1-line-shadow">
            <feDropShadow dx="0" dy="1" stdDeviation="1" floodOpacity="0.25" />
          </filter>
        </defs>
        {lines.map(line => {
          let stroke = "#ffffff"; // default user line: white
          let strokeDash = "";
          if (line.isExample) { stroke = "#ffffff"; strokeDash = "6,4"; } // example: white dashed
          else if (line.isCorrect) stroke = "#22c55e";
          else if (line.isWrong) stroke = "#ef4444";
          return (
            <line
              key={line.name}
              x1={line.start.x}
              y1={line.start.y}
              x2={line.end.x}
              y2={line.end.y}
              stroke={stroke}
              strokeWidth={line.isExample ? 2.5 : 3}
              strokeDasharray={strokeDash}
              strokeLinecap="round"
              filter="url(#fl1-line-shadow)"
              opacity={line.isExample ? 0.7 : 1}
            />
          );
        })}
      </svg>

      {/* ── Instruction ── */}
      <div className="fl1-instruction">
        <strong>LISTEN AND LOOK.</strong> Draw lines from the names to the correct people in the picture. There is one example.
      </div>

      {/* ── Audio Player ── */}
      <div className="fl1-audio-bar">
        {/* Controls row */}
        <div className="fl1-audio-controls">
          {/* Play / Resume button */}
          <button
            className={[
              "fl1-audio-btn",
              audioPlaying ? "fl1-audio-btn--playing" : "",
              audioPlayed ? "fl1-audio-btn--done" : "",
              audioPaused ? "fl1-audio-btn--paused" : "",
            ].filter(Boolean).join(" ")}
            onClick={handlePlay}
            disabled={audioPlayed && !audioPaused}
            id="btn-fl1-play-audio"
            aria-label={audioPaused ? "Resume audio" : "Play audio"}
          >
            {audioPlaying ? (
              <><span className="fl1-audio-btn__icon">⏵</span> Playing</>
            ) : audioPaused ? (
              <><span className="fl1-audio-btn__icon">▶</span> Resume</>
            ) : audioPlayed ? (
              <><span className="fl1-audio-btn__icon">✓</span> Done</>
            ) : (
              <><span className="fl1-audio-btn__icon">▶</span> Play Audio</>
            )}
          </button>

          {/* Pause button — only visible while playing */}
          {audioPlaying && (
            <button
              className="fl1-audio-btn fl1-audio-btn--pause"
              onClick={handlePause}
              id="btn-fl1-pause-audio"
              aria-label="Pause audio"
            >
              <span className="fl1-audio-btn__icon">⏸</span> Pause
            </button>
          )}

          {/* Time display */}
          <span className="fl1-audio-time">
            {formatTime(audioCurrentTime)}
            {audioDuration > 0 && <> / {formatTime(audioDuration)}</>}
          </span>
        </div>

        {/* Progress / Seek bar */}
        <div className="fl1-audio-progress-wrap">
          <input
            type="range"
            className="fl1-audio-progress"
            min={0}
            max={audioDuration || 100}
            step={0.1}
            value={audioCurrentTime}
            onChange={handleSeek}
            disabled={!audioPlaying && !audioPaused}
            aria-label="Audio progress"
            id="fl1-audio-seek"
            style={{
              "--progress": audioDuration > 0
                ? `${(audioCurrentTime / audioDuration) * 100}%`
                : "0%",
            } as React.CSSProperties}
          />
        </div>

        <span className="fl1-audio-hint">
          {audioPlayed
            ? "✓ Audio played. You can now submit."
            : audioPaused
            ? "Audio paused — press Resume to continue."
            : audioPlaying
            ? "Listening... You can only play once."
            : "Press Play to listen. You can only play once."}
        </span>
      </div>

      {/* ── Top Names Row ── */}
      <div className="fl1-names-row fl1-names-row--top" role="group" aria-label="Names — top row">
        {topNames.map(renderNameChip)}
      </div>

      {/* ── Image Container ── */}
      <div className="fl1-image-container">
        <img
          ref={imageRef}
          src={quiz.image_url}
          alt="Scene with characters to identify"
          className="fl1-image"
          draggable={false}
        />

        {/* Hotspot dots — only visible when a name is active */}
        {!submitted && activeName && quiz.characters.map(char => {
          const isTaken = takenCharIds.has(char.id);
          return (
            <button
              key={char.id}
              className={[
                "fl1-hotspot",
                isTaken ? "fl1-hotspot--taken" : "fl1-hotspot--available",
              ].join(" ")}
              style={{ left: `${char.hotspot.x}%`, top: `${char.hotspot.y}%` }}
              onClick={() => handleHotspotClick(char.id)}
              aria-label={`Connect to: ${char.description}`}
              title={char.description}
            />
          );
        })}

        {/* After submit: show correct-answer dots for wrong answers */}
        {submitted && quiz.questions.map(q => {
          // connections giờ là { charId → name }, check bằng correct_character_id
          const isCorrect = connections[q.correct_character_id] === q.name;
          if (isCorrect) return null;
          const correctChar = charMap[q.correct_character_id];
          if (!correctChar) return null;
          return (
            <div
              key={q.id}
              className="fl1-hotspot fl1-hotspot--correct-hint"
              style={{ left: `${correctChar.hotspot.x}%`, top: `${correctChar.hotspot.y}%` }}
              title={`Correct answer for ${q.name}`}
              aria-label={`Correct position for ${q.name}`}
            />
          );
        })}
      </div>

      {/* ── Bottom Names Row ── */}
      <div className="fl1-names-row fl1-names-row--bottom" role="group" aria-label="Names — bottom row">
        {bottomNames.map(renderNameChip)}
      </div>

      {/* ── Footer: Submit / Result ── */}
      {!submitted ? (
        <div className="fl1-footer">
          <span className="fl1-footer__count">
            {connectedCount} / {quiz.questions.length} connected
          </span>
          <button
            className="btn btn-success fl1-submit-btn"
            onClick={handleSubmit}
            disabled={!allConnected}
            id="btn-fl1-submit"
            title={!allConnected ? "Connect all names first" : "Submit answers"}
          >
            Submit ✓
          </button>
        </div>
      ) : (
        <div className="fl1-result">
          <div className="fl1-result__score">
            <span className="fl1-result__stars">{"⭐".repeat(result?.starsEarned ?? 0)}</span>
            <span className="fl1-result__text">
              {result?.score} / {result?.maxScore} correct
              <em> ({result?.percentage}%)</em>
            </span>
          </div>

          {/* Per-question feedback */}
          <div className="fl1-result__feedback">
            {quiz.questions.map(q => {
              // connections = { charId → name } — đúng mapping mới
              const nameAtCorrectSpot = connections[q.correct_character_id];
              const isCorrect = nameAtCorrectSpot === q.name;
              // Tìm xem user đặt tên này (q.name) vào đâu (nếu có)
              const userCharId = Object.entries(connections).find(([, n]) => n === q.name)?.[0];
              const userChar = userCharId ? charMap[userCharId] : null;
              const correctChar = charMap[q.correct_character_id];
              return (
                <div key={q.id} className={`fl1-feedback-row ${isCorrect ? "fl1-feedback-row--correct" : "fl1-feedback-row--wrong"}`}>
                  <span className="fl1-feedback-row__icon">{isCorrect ? "✅" : "❌"}</span>
                  <span className="fl1-feedback-row__name">{q.name}</span>
                  <span className="fl1-feedback-row__arrow">→</span>
                  <span className="fl1-feedback-row__answer">
                    {isCorrect
                      ? correctChar?.description
                      : <>
                          <span className="fl1-feedback-row__wrong-ans">{userChar?.description ?? "not connected"}</span>
                          <span className="fl1-feedback-row__correct-hint"> ✓ {correctChar?.description}</span>
                        </>
                    }
                  </span>
                </div>
              );
            })}
          </div>

          <div className="fl1-result__actions">
            {onFinish && (
              <button className="btn btn-success" onClick={onFinish} id="btn-fl1-finish">
                ✅ Finish & Save
              </button>
            )}
            {onBack && (
              <button className="btn btn-outline" onClick={onBack} id="btn-fl1-back">
                ← Về danh sách
              </button>
            )}
            {!onFinish && !onBack && (
              <button className="btn btn-outline" onClick={handleReset} id="btn-fl1-retry">
                🔄 Try Again
              </button>
            )}
          </div>
        </div>
      )}

      {/* ── VocabPanel ── */}
      {hasVocab && (
        <div className="fl1-vocab-section">
          <VocabPanel
            vocab={quiz.vocab_highlight!}
            isLoggedIn={isLoggedIn}
            quizId={quiz.id}
          />
        </div>
      )}
    </div>
  );
}
