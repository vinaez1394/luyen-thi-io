/**
 * DragDropMatch.tsx — Kéo nối 2 cột (left items ↔ right zones)
 *
 * JSON format (per question):
 * {
 *   "id": "q1",
 *   "prompt": "Match the words with their meanings.",
 *   "pairs": [
 *     { "left": "cat",    "right": "con mèo" },
 *     { "left": "dog",    "right": "con chó" },
 *     { "left": "bird",   "right": "con chim" }
 *   ],
 *   "explanation_vi": "..."
 * }
 *
 * - Cột trái: draggable items
 * - Cột phải: droppable zones
 * - Kéo item trái thả vào zone phải để nối
 * - Mỗi zone chỉ chứa 1 item; khi swap → item cũ trả về trạng thái unmatched
 *
 * Phase 05
 */

import { useState, useEffect, useCallback } from "react";
import {
  DndContext,
  DragOverlay,
  useDroppable,
  useDraggable,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
  type Active,
} from "@dnd-kit/core";
import type { QuizComponentProps } from "../../types/quiz";

// ============================================
// Types
// ============================================
interface MatchPair {
  left: string;
  right: string;
}

interface DragDropMatchQuestion {
  id: string;
  prompt?: string;
  pairs: MatchPair[];
  explanation_vi: string;
  options?: never;
  correct?: never;
}

// ============================================
// Draggable Left Item
// ============================================
function LeftItem({
  leftId,
  label,
  isMatched,
  isSubmitted,
  isCorrect,
  isWrong,
}: {
  leftId: string;
  label: string;
  isMatched: boolean;
  isSubmitted: boolean;
  isCorrect: boolean;
  isWrong: boolean;
}) {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({ id: leftId, disabled: isSubmitted });

  const style = transform
    ? { transform: `translate3d(${transform.x}px,${transform.y}px,0)`, zIndex: 999 }
    : undefined;

  let cls = "dnd-match__left-item";
  if (isDragging) cls += " dnd-chip--dragging";
  if (isMatched && !isSubmitted) cls += " dnd-match__left-item--matched";
  if (isSubmitted && isCorrect) cls += " dnd-match__left-item--correct";
  if (isSubmitted && isWrong) cls += " dnd-match__left-item--wrong";

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cls}
      {...listeners}
      {...attributes}
      aria-label={`Drag: ${label}`}
    >
      <span className="dnd-match__grip">⠿</span>
      {label}
    </div>
  );
}

// ============================================
// Droppable Right Zone
// ============================================
function RightZone({
  zoneId,
  rightLabel,
  matchedLeftLabel,
  isSubmitted,
  isCorrect,
  isWrong,
}: {
  zoneId: string;
  rightLabel: string;
  matchedLeftLabel: string | null;
  isSubmitted: boolean;
  isCorrect: boolean;
  isWrong: boolean;
}) {
  const { isOver, setNodeRef } = useDroppable({ id: zoneId });

  let zoneCls = "dnd-match__zone";
  if (isOver && !isSubmitted) zoneCls += " dnd-match__zone--hover";
  if (matchedLeftLabel) zoneCls += " dnd-match__zone--filled";
  if (isSubmitted && isCorrect) zoneCls += " dnd-match__zone--correct";
  if (isSubmitted && isWrong) zoneCls += " dnd-match__zone--wrong";

  return (
    <div className="dnd-match__right-row">
      {/* Matched chip inside zone */}
      <div ref={setNodeRef} className={zoneCls} aria-label={`Zone: ${rightLabel}`}>
        {matchedLeftLabel ? (
          <span className="dnd-chip dnd-chip--in-zone">{matchedLeftLabel}</span>
        ) : (
          <span className="dnd-match__zone-placeholder">kéo vào đây</span>
        )}
      </div>
      {/* Right label */}
      <span className="dnd-match__right-label">= {rightLabel}</span>
      {isSubmitted && (
        <span className="dnd-match__feedback-icon">
          {isCorrect ? "✅" : "❌"}
        </span>
      )}
    </div>
  );
}

// ============================================
// DragDropMatch Component
// ============================================
export function DragDropMatch({
  question,
  userAnswer,
  onAnswer,
  isSubmitted,
}: QuizComponentProps) {
  const q = question as unknown as DragDropMatchQuestion;

  // matches: { leftId → rightId | null }
  const [matches, setMatches] = useState<Record<string, string | null>>(() => {
    const init: Record<string, string | null> = {};
    q.pairs.forEach((p) => { init[p.left] = null; });

    // Restore from userAnswer (format: ["left1:right1","left2:right2"])
    if (Array.isArray(userAnswer)) {
      (userAnswer as string[]).forEach((pair) => {
        const [l, r] = pair.split(":");
        if (l && r) init[l] = r;
      });
    }
    return init;
  });

  const [activeLeft, setActiveLeft] = useState<string | null>(null);

  // Notify parent when all matched
  useEffect(() => {
    const pairs = Object.entries(matches).filter(([, r]) => r !== null);
    if (pairs.length === q.pairs.length) {
      const answer = pairs.map(([l, r]) => `${l}:${r}`);
      onAnswer(q.id, answer);
    }
  }, [matches, q.id, q.pairs.length, onAnswer]);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(TouchSensor, { activationConstraint: { delay: 250, tolerance: 5 } })
  );

  function handleDragStart({ active }: { active: Active }) {
    setActiveLeft(active.id as string);
  }

  function handleDragEnd({ active, over }: DragEndEvent) {
    setActiveLeft(null);
    if (!over) return;

    const leftId = active.id as string;
    const rightId = over.id as string;

    if (!rightId.startsWith("zone-")) return;
    const rightVal = rightId.replace("zone-", "");

    setMatches((prev) => {
      const next = { ...prev };
      // Bỏ match cũ của leftId
      // Nếu zone phải đang có match khác → unlink
      for (const lid in next) {
        if (next[lid] === rightVal) next[lid] = null;
      }
      next[leftId] = rightVal;
      return next;
    });
  }

  // Build lookup: rightId → leftId (for zones to know what's placed)
  const rightToLeft = useCallback(() => {
    const map: Record<string, string | null> = {};
    q.pairs.forEach((p) => { map[p.right] = null; });
    for (const [l, r] of Object.entries(matches)) {
      if (r) map[r] = l;
    }
    return map;
  }, [matches, q.pairs])();

  // Correct answers map: leftId → rightId
  const correctMap: Record<string, string> = {};
  q.pairs.forEach((p) => { correctMap[p.left] = p.right; });

  const allMatched = q.pairs.every((p) => matches[p.left] !== null);

  return (
    <DndContext sensors={sensors} onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
      <div className="quiz-question dnd-match">
        {/* Prompt text */}
        {q.prompt && (
          <p className="quiz-question__prompt">{q.prompt}</p>
        )}

        <div className="dnd-match__layout">
          {/* Left column — draggable items */}
          <div className="dnd-match__left-col">
            <p className="dnd-match__col-label">Kéo từ đây:</p>
            {q.pairs.map((pair) => {
              const isMatched = matches[pair.left] !== null;
              const isCorrect = isSubmitted && matches[pair.left] === correctMap[pair.left];
              const isWrong   = isSubmitted && matches[pair.left] !== correctMap[pair.left];
              return (
                <LeftItem
                  key={pair.left}
                  leftId={pair.left}
                  label={pair.left}
                  isMatched={isMatched}
                  isSubmitted={isSubmitted}
                  isCorrect={isCorrect}
                  isWrong={isWrong}
                />
              );
            })}
          </div>

          {/* Right column — droppable zones */}
          <div className="dnd-match__right-col">
            <p className="dnd-match__col-label">Thả vào đây:</p>
            {q.pairs.map((pair) => {
              const matchedLeft = rightToLeft[pair.right];
              const isCorrect = isSubmitted && matchedLeft === pair.left;
              const isWrong   = isSubmitted && matchedLeft !== null && matchedLeft !== pair.left;
              return (
                <RightZone
                  key={pair.right}
                  zoneId={`zone-${pair.right}`}
                  rightLabel={pair.right}
                  matchedLeftLabel={matchedLeft}
                  isSubmitted={isSubmitted}
                  isCorrect={isCorrect}
                  isWrong={isWrong}
                />
              );
            })}
          </div>
        </div>

        {/* Status */}
        {!isSubmitted && (
          <p className="dnd-match__status">
            {allMatched ? "✅ Đã nối xong — nhấn Nộp bài" : `Còn ${q.pairs.filter((p) => matches[p.left] === null).length} cặp chưa nối`}
          </p>
        )}

        {/* Explanation */}
        {isSubmitted && q.explanation_vi && (
          <div className={`quiz-explanation quiz-explanation--${q.pairs.every((p) => matches[p.left] === correctMap[p.left]) ? "correct" : "wrong"}`}>
            <span className="quiz-explanation__icon">
              {q.pairs.every((p) => matches[p.left] === correctMap[p.left]) ? "✅" : "💡"}
            </span>
            <span>{q.explanation_vi}</span>
          </div>
        )}
      </div>

      {/* Ghost chip while dragging */}
      <DragOverlay>
        {activeLeft ? (
          <span className="dnd-chip dnd-chip--overlay">{activeLeft}</span>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}
