/**
 * useDragDrop.ts — Quản lý state cho Drag & Drop quiz
 *
 * Hỗ trợ 2 chế độ:
 *  - drag-drop-fill: kéo từ vào chỗ trống trong câu
 *  - drag-drop-match: kéo nối 2 cột (item → zone)
 *
 * Phase 05
 */

import { useState, useCallback } from "react";

// ============================================
// Types
// ============================================

/**
 * State cho drag-drop-fill
 * slots: { [slotIndex]: wordId | null }  — vị trí trống nào đang chứa từ nào
 * bank: wordId[]                          — các từ còn trong word bank (chưa kéo)
 */
export interface FillState {
  slots: Record<number, string | null>;
  bank: string[];
}

/**
 * State cho drag-drop-match
 * matches: { [leftId]: rightId | null }  — item trái đang ghép với item phải nào
 */
export interface MatchState {
  matches: Record<string, string | null>;
}

// ============================================
// Hook: useDragDropFill
// ============================================
export function useDragDropFill(
  initialWordBank: string[],
  totalSlots: number
) {
  const [state, setState] = useState<FillState>({
    slots: Object.fromEntries(
      Array.from({ length: totalSlots }, (_, i) => [i, null])
    ),
    bank: initialWordBank,
  });

  /**
   * Kéo từ word bank vào slot
   * Nếu slot đã có từ → trả từ cũ về bank trước
   */
  const dropToSlot = useCallback((wordId: string, slotIndex: number) => {
    setState((prev) => {
      const newSlots = { ...prev.slots };
      const newBank = [...prev.bank];

      // Nếu slot đã có từ khác → trả về bank
      const existing = newSlots[slotIndex];
      if (existing && existing !== wordId) {
        newBank.push(existing);
      }

      // Xoá từ khỏi bank
      const bankIdx = newBank.indexOf(wordId);
      if (bankIdx !== -1) newBank.splice(bankIdx, 1);

      // Xoá từ khỏi slot cũ (nếu từ đang ở slot khác)
      for (const si in newSlots) {
        if (newSlots[si] === wordId && Number(si) !== slotIndex) {
          newSlots[si] = null;
        }
      }

      newSlots[slotIndex] = wordId;
      return { slots: newSlots, bank: newBank };
    });
  }, []);

  /**
   * Kéo từ từ slot ra (trả về bank)
   */
  const removeFromSlot = useCallback((slotIndex: number) => {
    setState((prev) => {
      const word = prev.slots[slotIndex];
      if (!word) return prev;
      return {
        slots: { ...prev.slots, [slotIndex]: null },
        bank: [...prev.bank, word],
      };
    });
  }, []);

  /**
   * Reset về trạng thái ban đầu
   */
  const reset = useCallback(() => {
    setState({
      slots: Object.fromEntries(
        Array.from({ length: totalSlots }, (_, i) => [i, null])
      ),
      bank: initialWordBank,
    });
  }, [initialWordBank, totalSlots]);

  /**
   * Lấy danh sách từ đã điền (theo thứ tự slot) — dùng để onAnswer
   */
  const getFilledWords = useCallback((): (string | null)[] => {
    return Array.from({ length: totalSlots }, (_, i) => state.slots[i] ?? null);
  }, [state.slots, totalSlots]);

  return { state, dropToSlot, removeFromSlot, reset, getFilledWords };
}

// ============================================
// Hook: useDragDropMatch
// ============================================
export function useDragDropMatch(leftIds: string[]) {
  const [matches, setMatches] = useState<Record<string, string | null>>(
    Object.fromEntries(leftIds.map((id) => [id, null]))
  );

  /**
   * Gán item trái với zone phải
   * Nếu zone phải đã có item khác → unlink item đó trước
   */
  const setMatch = useCallback((leftId: string, rightId: string) => {
    setMatches((prev) => {
      const next = { ...prev };
      // Tìm item trái nào đang match với rightId này → bỏ match
      for (const lid in next) {
        if (next[lid] === rightId) {
          next[lid] = null;
        }
      }
      next[leftId] = rightId;
      return next;
    });
  }, []);

  const clearMatch = useCallback((leftId: string) => {
    setMatches((prev) => ({ ...prev, [leftId]: null }));
  }, []);

  const reset = useCallback(() => {
    setMatches(Object.fromEntries(leftIds.map((id) => [id, null])));
  }, [leftIds]);

  const getMatchedPairs = useCallback((): [string, string][] => {
    return Object.entries(matches).filter(([, r]) => r !== null) as [string, string][];
  }, [matches]);

  return { matches, setMatch, clearMatch, reset, getMatchedPairs };
}
