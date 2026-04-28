/** InstructionBanner.tsx */
import { useState } from "react";
import "./Quiz.css";

export function InstructionBanner({ text }: { text: string }) {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <div className="instruction-banner">
      <button className="instruction-banner__toggle" onClick={() => setCollapsed((c) => !c)}>
        <span>💡 Hướng dẫn</span>
        <span>{collapsed ? "▼" : "▲"}</span>
      </button>
      {!collapsed && <p className="instruction-banner__text">{text}</p>}
    </div>
  );
}
