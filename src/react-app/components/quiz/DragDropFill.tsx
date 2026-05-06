/**
 * DragDropFill.tsx — Kéo từ vào chỗ trống trong câu
 *
 * JSON format (per question):
 * {
 *   "id": "q1",
 *   "template": "The {0} is very {1} today.",
 *   "word_bank": ["weather", "sunny", "cat", "blue"],
 *   "correct": ["weather", "sunny"],
 *   "explanation_vi": "..."
 * }
 *
 * Phase 05
 */

import { useEffect, useMemo } from "react";
import {
  DndContext,
  DragOverlay,
  useDroppable,
  useDraggable,
  type DragEndEvent,
  type Active,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { useState } from "react";
import type { QuizComponentProps } from "../../types/quiz";

// ============================================
// Extended Question interface for DragDropFill
// ============================================
interface DragDropFillQuestion {
  id: string;
  template: string;        // "The {0} is {1} today."
  word_bank: string[];
  correct: string[];
  explanation_vi: string;
  prompt?: never;
  options?: never;
}

// ============================================
// Draggable Word Chip (từ trong word bank / slot)
// ============================================
function WordChip({
  id,
  word,
  disabled,
}: {
  id: string;
  word: string;
  disabled?: boolean;
}) {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({ id, disabled });

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
        zIndex: 999,
      }
    : undefined;

  return (
    <span
      ref={setNodeRef}
      style={style}
      className={`dnd-chip${isDragging ? " dnd-chip--dragging" : ""}${disabled ? " dnd-chip--disabled" : ""}`}
      {...listeners}
      {...attributes}
      aria-label={`Drag word: ${word}`}
    >
      {word}
    </span>
  );
}

// ============================================
// Droppable Slot (chỗ trống trong câu)
// ============================================
function DropSlot({
  index,
  word,
  isCorrect,
  isWrong,
  isSubmitted,
  onRemove,
}: {
  index: number;
  word: string | null;
  isCorrect: boolean;
  isWrong: boolean;
  isSubmitted: boolean;
  onRemove: (idx: number) => void;
}) {
  const { isOver, setNodeRef } = useDroppable({ id: `slot-${index}` });

  let cls = "dnd-slot";
  if (isOver) cls += " dnd-slot--hover";
  if (word) cls += " dnd-slot--filled";
  if (isSubmitted && isCorrect) cls += " dnd-slot--correct";
  if (isSubmitted && isWrong) cls += " dnd-slot--wrong";

  return (
    <span
      ref={setNodeRef}
      className={cls}
      onClick={() => !isSubmitted && word && onRemove(index)}
      title={!isSubmitted && word ? "Click để trả từ về" : undefined}
      aria-label={word ? `Slot ${index + 1}: ${word}` : `Slot ${index + 1}: empty`}
    >
      {word ?? <span className="dnd-slot__placeholder">___</span>}
    </span>
  );
}

// ============================================
// Parse template "The {0} is {1}." → segments
// ============================================
function parseTemplate(template: string): Array<{ type: "text" | "slot"; value: string; index?: number }> {
  const parts: Array<{ type: "text" | "slot"; value: string; index?: number }> = [];
  const regex = /\{(\d+)\}/g;
  let last = 0;
  let match;
  while ((match = regex.exec(template)) !== null) {
    if (match.index > last) {
      parts.push({ type: "text", value: template.slice(last, match.index) });
    }
    parts.push({ type: "slot", value: match[0], index: Number(match[1]) });
    last = match.index + match[0].length;
  }
  if (last < template.length) {
    parts.push({ type: "text", value: template.slice(last) });
  }
  return parts;
}

// ============================================
// DragDropFill Component
// ============================================
export function DragDropFill({
  question,
  userAnswer,
  onAnswer,
  isSubmitted,
  correctAnswer,
}: QuizComponentProps) {
  const q = question as unknown as DragDropFillQuestion;
  const totalSlots = q.correct.length;

  // slots: index → word | null
  const [slots, setSlots] = useState<(string | null)[]>(
    () => {
      if (Array.isArray(userAnswer) && userAnswer.length === totalSlots) {
        return userAnswer as string[];
      }
      return Array(totalSlots).fill(null);
    }
  );

  // bank: từ chưa dùng
  const [bank, setBank] = useState<string[]>(() => {
    let initialBank = [...q.word_bank];
    // Fisher-Yates shuffle để từ hiện ngẫu nhiên
    for (let i = initialBank.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [initialBank[i], initialBank[j]] = [initialBank[j], initialBank[i]];
    }

    if (Array.isArray(userAnswer) && userAnswer.length === totalSlots) {
      const used = new Set(userAnswer as string[]);
      return initialBank.filter((w) => !used.has(w));
    }
    return initialBank;
  });

  const [activeWord, setActiveWord] = useState<string | null>(null);

  // Mỗi khi slots/bank đổi → fire onAnswer
  useEffect(() => {
    const filled = slots.filter(Boolean) as string[];
    if (filled.length === totalSlots) {
      onAnswer(q.id, slots as string[]);
    }
  }, [slots, q.id, totalSlots, onAnswer]);

  // Sensors: pointer (desktop) + touch (mobile, delay 250ms để tránh scroll)
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(TouchSensor, { activationConstraint: { delay: 250, tolerance: 5 } })
  );

  const segments = useMemo(() => parseTemplate(q.template), [q.template]);

  function handleDragStart({ active }: { active: Active }) {
    setActiveWord(active.id as string);
  }

  function handleDragEnd({ active, over }: DragEndEvent) {
    setActiveWord(null);
    if (!over) return;

    const wordId = active.id as string;
    const overId = over.id as string;

    if (!overId.startsWith("slot-")) return;
    const slotIdx = Number(overId.replace("slot-", ""));

    setSlots((prev) => {
      const next = [...prev];
      const newBank = [...bank];

      // Trả từ cũ trong slot về bank (nếu có)
      const existing = next[slotIdx];
      if (existing && existing !== wordId) {
        newBank.push(existing);
      }

      // Xoá từ khỏi slot cũ nếu đang ở slot khác
      for (let i = 0; i < next.length; i++) {
        if (next[i] === wordId && i !== slotIdx) {
          next[i] = null;
        }
      }

      // Xoá khỏi bank
      const bidx = newBank.indexOf(wordId);
      if (bidx !== -1) newBank.splice(bidx, 1);

      next[slotIdx] = wordId;
      setBank(newBank);
      return next;
    });
  }

  function removeFromSlot(idx: number) {
    const word = slots[idx];
    if (!word) return;
    setSlots((prev) => {
      const next = [...prev];
      next[idx] = null;
      return next;
    });
    setBank((prev) => [...prev, word]);
  }

  const corrArr = Array.isArray(correctAnswer) ? correctAnswer : [];

  const isUserAnswer = (idx: number): boolean => {
    const w = slots[idx];
    return isSubmitted && corrArr[idx] !== undefined && w === corrArr[idx];
  };
  const isWrong = (idx: number) => {
    const w = slots[idx];
    return isSubmitted && w !== null && w !== corrArr[idx];
  };

  const isAnswered = slots.every((s) => s !== null);

  return (
    <DndContext
      sensors={sensors}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className="quiz-question dnd-fill">
        {/* Sentence with droppable slots */}
        <div className="dnd-fill__sentence">
          {segments.map((seg, i) => {
            if (seg.type === "text") {
              return <span key={i} className="dnd-fill__text">{seg.value}</span>;
            }
            const idx = seg.index!;
            return (
              <DropSlot
                key={i}
                index={idx}
                word={slots[idx]}
                isCorrect={isUserAnswer(idx)}
                isWrong={isWrong(idx)}
                isSubmitted={isSubmitted}
                onRemove={removeFromSlot}
              />
            );
          })}
        </div>

        {/* Show correct answer after submit */}
        {isSubmitted && corrArr.length > 0 && (
          <p className="dnd-fill__correct-hint">
            ✅ Đáp án: <strong>{corrArr.join(" / ")}</strong>
          </p>
        )}

        {/* Word Bank */}
        {!isSubmitted && (
          <div className="dnd-bank">
            <p className="dnd-bank__label">Từ có sẵn:</p>
            <div className="dnd-bank__chips">
              {bank.length === 0 && isAnswered && (
                <span className="dnd-bank__empty">Đã điền hết từ 🎉</span>
              )}
              {bank.map((word) => (
                <WordChip key={word} id={word} word={word} />
              ))}
            </div>
          </div>
        )}

        {/* Explanation */}
        {isSubmitted && q.explanation_vi && (
          <div className={`quiz-explanation quiz-explanation--${slots.every((s, i) => s === corrArr[i]) ? "correct" : "wrong"}`}>
            <span className="quiz-explanation__icon">
              {slots.every((s, i) => s === corrArr[i]) ? "✅" : "💡"}
            </span>
            <span>{q.explanation_vi}</span>
          </div>
        )}
      </div>

      {/* Drag overlay — ghost chip khi đang kéo */}
      <DragOverlay>
        {activeWord ? (
          <span className="dnd-chip dnd-chip--overlay">{activeWord}</span>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}
