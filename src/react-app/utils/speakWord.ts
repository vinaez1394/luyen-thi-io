/**
 * speakWord.ts — Web Speech API utility
 *
 * - Prefer 'en-GB' voice → fallback 'en-US'
 * - Rate 0.85 (chậm hơn bình thường để học sinh nghe rõ)
 * - Cancel previous utterance trước khi speak mới
 * - Silent fail nếu browser không support
 */

let voicesLoaded = false;
let gbVoice: SpeechSynthesisVoice | null = null;
let usVoice: SpeechSynthesisVoice | null = null;

/** Preload voices — gọi 1 lần sau DOMContentLoaded */
function preloadVoices() {
  if (voicesLoaded) return;
  const voices = window.speechSynthesis.getVoices();
  if (voices.length === 0) {
    // Chrome loads voices async — lắng nghe event
    window.speechSynthesis.addEventListener("voiceschanged", () => {
      const v = window.speechSynthesis.getVoices();
      gbVoice = v.find(x => x.lang === "en-GB") ?? null;
      usVoice = v.find(x => x.lang === "en-US") ?? null;
      voicesLoaded = true;
    }, { once: true });
    return;
  }
  gbVoice = voices.find(x => x.lang === "en-GB") ?? null;
  usVoice = voices.find(x => x.lang === "en-US") ?? null;
  voicesLoaded = true;
}

// Tự động preload khi module được import
if (typeof window !== "undefined" && "speechSynthesis" in window) {
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", preloadVoices, { once: true });
  } else {
    preloadVoices();
  }
}

/**
 * Phát âm 1 từ tiếng Anh
 * @param word  Từ cần phát âm
 * @param slow  true = rate 0.7 (siêu chậm cho học sinh nhỏ), mặc định 0.85
 */
export function speakWord(word: string, slow = false): void {
  if (!("speechSynthesis" in window)) return;

  // Trigger preload nếu chưa có
  preloadVoices();

  const utterance       = new SpeechSynthesisUtterance(word);
  utterance.voice       = gbVoice ?? usVoice ?? null;
  utterance.lang        = gbVoice ? "en-GB" : "en-US";
  utterance.rate        = slow ? 0.7 : 0.85;
  utterance.pitch       = 1.0;
  utterance.volume      = 1.0;

  window.speechSynthesis.cancel();   // Hủy lượt đọc đang phát
  window.speechSynthesis.speak(utterance);
}

/** Dừng tất cả đọc đang phát */
export function stopSpeaking(): void {
  if ("speechSynthesis" in window) {
    window.speechSynthesis.cancel();
  }
}

/** Kiểm tra browser có hỗ trợ Speech API không */
export function isSpeechSupported(): boolean {
  return typeof window !== "undefined" && "speechSynthesis" in window;
}
