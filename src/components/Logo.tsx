"use client";

interface LogoProps {
  variant?: "light" | "dark";
  className?: string;
}

/**
 * Geometric P mark + PRIMET wordmark.
 * Based on a 10×14 grid — P is built from two rectangles.
 * Signal red (#CC3300) bowl-bottom rail accent.
 */
export default function Logo({ variant = "dark", className = "" }: LogoProps) {
  const ink = variant === "light" ? "#FAFAF8" : "#111111";
  const signal = "#CC3300";

  return (
    <svg
      width="110"
      height="28"
      viewBox="0 0 110 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Primet"
      className={className}
    >
      {/* ── P mark (10×14 grid units = 18×28px) ── */}
      {/* Vertical stem */}
      <rect x="0" y="0" width="4" height="28" fill={ink} />
      {/* Top bar of P bowl */}
      <rect x="4" y="0" width="10" height="4" fill={ink} />
      {/* Right edge of P bowl */}
      <rect x="14" y="0" width="4" height="14" fill={ink} />
      {/* Bottom bar of P bowl */}
      <rect x="4" y="10" width="10" height="4" fill={ink} />
      {/* Signal rail — horizontal accent at bowl bottom */}
      <rect x="0" y="24" width="18" height="4" fill={signal} />

      {/* ── PRIMET wordmark ── */}
      <text
        x="26"
        y="21"
        fontFamily="var(--font-inter), system-ui, sans-serif"
        fontWeight="800"
        fontSize="18"
        letterSpacing="-0.04em"
        fill={ink}
      >
        PRIMET
      </text>
    </svg>
  );
}
