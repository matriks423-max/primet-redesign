"use client";

interface LogoProps {
  variant?: "light" | "dark";
  className?: string;
}

export default function Logo({ variant = "dark", className = "" }: LogoProps) {
  const ink    = variant === "light" ? "#FAFAF8" : "#111111";
  const signal = "#CC3300";

  return (
    <span
      className={className}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "10px",
        userSelect: "none",
      }}
    >
      {/* Geometric P mark — 20×28 grid */}
      <svg
        width="20"
        height="28"
        viewBox="0 0 20 28"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        style={{ flexShrink: 0 }}
      >
        {/* Stem */}
        <rect x="0" y="0" width="4" height="28" fill={ink} />
        {/* Bowl top */}
        <rect x="4" y="0" width="12" height="3" fill={ink} />
        {/* Bowl right */}
        <rect x="16" y="0" width="4" height="13" fill={ink} />
        {/* Bowl mid-bar */}
        <rect x="4" y="10" width="12" height="3" fill={ink} />
        {/* Signal accent rail */}
        <rect x="0" y="26" width="20" height="2" fill={signal} />
      </svg>

      {/* Wordmark — uses loaded Inter variable font */}
      <span
        style={{
          fontFamily: "var(--font-inter), system-ui, sans-serif",
          fontWeight: 800,
          fontSize: "17px",
          letterSpacing: "-0.05em",
          color: ink,
          lineHeight: 1,
          paddingBottom: "1px",
        }}
      >
        PRIMET
      </span>
    </span>
  );
}
