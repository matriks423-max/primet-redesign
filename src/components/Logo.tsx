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
        display:    "inline-flex",
        alignItems: "center",
        gap:        "12px",
        userSelect: "none",
      }}
    >
      {/*
        Mark: precision L-bracket with signal accent dot.
        Evokes engineering corner gauge / alignment mark.
        24×24 viewBox.
      */}
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        style={{ flexShrink: 0 }}
      >
        {/* Vertical stem */}
        <rect x="0" y="0" width="3" height="24" fill={ink} />
        {/* Top horizontal arm */}
        <rect x="3" y="0" width="15" height="3" fill={ink} />
        {/* Mid crossbar — P bowl bottom */}
        <rect x="3" y="11" width="13" height="2.5" fill={ink} />
        {/* Bowl right wall */}
        <rect x="16" y="0" width="3" height="13.5" fill={ink} />
        {/* Signal dot — bottom-right corner */}
        <rect x="19" y="19" width="5" height="5" fill={signal} />
      </svg>

      {/* Wordmark */}
      <span
        style={{
          fontFamily:    "var(--font-inter), system-ui, sans-serif",
          fontWeight:    800,
          fontSize:      "16px",
          letterSpacing: "0.08em",
          color:         ink,
          lineHeight:    1,
          textTransform: "uppercase",
        }}
      >
        Primet
      </span>
    </span>
  );
}
