/**
 * CertBadge.tsx — Badge nhỏ hiển thị cấp độ Cambridge
 *
 * ST  = Pre-A1 Starters  → tím nhạt
 * MV  = A1 Movers        → xanh lá
 * FL  = A2 Flyers        → xanh dương
 * KET = A2 KET           → vàng cam
 * PET = B1 PET           → đỏ cam
 */
import "./CertBadge.css";

export type CertKey = "starters" | "movers" | "flyers" | "ket" | "pet";

interface CertBadgeProps {
  cert:  CertKey | string;
  size?: "sm" | "md";
}

const CERT_META: Record<string, { short: string; label: string; mod: string }> = {
  starters: { short: "ST",  label: "Pre-A1 Starters", mod: "starters" },
  movers:   { short: "MV",  label: "A1 Movers",        mod: "movers"   },
  flyers:   { short: "FL",  label: "A2 Flyers",        mod: "flyers"   },
  ket:      { short: "KET", label: "A2 KET",           mod: "ket"      },
  pet:      { short: "PET", label: "B1 PET",           mod: "pet"      },
};

export function CertBadge({ cert, size = "sm" }: CertBadgeProps) {
  const key  = cert.toLowerCase();
  const meta = CERT_META[key] ?? { short: cert.toUpperCase(), label: cert, mod: "unknown" };

  return (
    <span
      className={`cert-badge cert-badge--${meta.mod} cert-badge--${size}`}
      title={meta.label}
      aria-label={meta.label}
    >
      {meta.short}
    </span>
  );
}
