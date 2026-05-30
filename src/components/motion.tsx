"use client";

/**
 * Motion primitives — Primet
 *
 * Emil Kowalski principles enforced here:
 * ✓ Only animate `transform` (full string) + `opacity` — GPU composited
 * ✓ FM shorthand `y`/`x`/`scale` avoided — they are NOT hardware-accelerated
 * ✓ Ease-out cubic-bezier(0.23, 1, 0.32, 1) — strong, punchy
 * ✓ Nothing from scale(0) — minimum scale(0.96) for entrances
 * ✓ Stagger 60–80ms — decorative, never blocks interaction
 * ✓ prefers-reduced-motion respected on every component
 * ✓ Hover states live in CSS, not Framer Motion (CSS is off main thread)
 * ✓ whileTap scale(0.97) applied directly to pressable elements only
 */

import { motion, AnimatePresence, useInView, useReducedMotion } from "framer-motion";
import { useRef, useEffect, useState, type ReactNode } from "react";

// ── Easing constants ──────────────────────────────────────────────────────
// Using arrays so TS is happy and FM accepts them
export const EASE_OUT = [0.23, 1, 0.32, 1] as const;
export const EASE_IO  = [0.77, 0, 0.175, 1] as const;

// ── Scroll reveal ─────────────────────────────────────────────────────────
// Uses full `transform` string — hardware-accelerated, never drops frames
interface RevealProps {
  children: ReactNode;
  delay?: number;
  className?: string;
  style?: React.CSSProperties;
  margin?: string;
  as?: keyof React.JSX.IntrinsicElements;
}

export function Reveal({
  children,
  delay = 0,
  className,
  style,
  margin = "-80px",
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin } as Parameters<typeof useInView>[1]);
  const reduced = useReducedMotion();

  return (
    <motion.div
      ref={ref}
      className={className}
      style={style}
      initial={reduced ? false : { opacity: 0, transform: "translateY(16px)" }}
      animate={inView ? { opacity: 1, transform: "translateY(0px)" } : {}}
      transition={{
        duration: 0.28,
        ease: EASE_OUT,
        delay: reduced ? 0 : delay,
      }}
    >
      {children}
    </motion.div>
  );
}

// ── Stagger container ─────────────────────────────────────────────────────
interface StaggerProps {
  children: ReactNode;
  stagger?: number;
  className?: string;
  style?: React.CSSProperties;
  margin?: string;
}

export function Stagger({
  children,
  stagger = 0.06,
  className,
  style,
  margin = "-80px",
}: StaggerProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin } as Parameters<typeof useInView>[1]);
  const reduced = useReducedMotion();

  return (
    <motion.div
      ref={ref}
      className={className}
      style={style}
      initial={reduced ? false : "hidden"}
      animate={inView ? "visible" : "hidden"}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: stagger } },
      }}
    >
      {children}
    </motion.div>
  );
}

// ── Stagger item ──────────────────────────────────────────────────────────
// Full transform string — hardware-accelerated
interface StaggerItemProps {
  children: ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export function StaggerItem({ children, className, style }: StaggerItemProps) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      className={className}
      style={style}
      variants={
        reduced
          ? {}
          : {
              hidden: { opacity: 0, transform: "translateY(16px)" },
              visible: {
                opacity: 1,
                transform: "translateY(0px)",
                transition: { duration: 0.28, ease: EASE_OUT },
              },
            }
      }
    >
      {children}
    </motion.div>
  );
}

// ── Stagger item with exit (for filtered lists) ───────────────────────────
// Used in catalog where items leave when filter changes
export function StaggerItemExit({ children, className, style }: StaggerItemProps) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      className={className}
      style={style}
      layout
      variants={
        reduced
          ? {}
          : {
              hidden: { opacity: 0, transform: "translateY(16px)" },
              visible: {
                opacity: 1,
                transform: "translateY(0px)",
                transition: { duration: 0.28, ease: EASE_OUT },
              },
            }
      }
      exit={
        reduced
          ? {}
          : { opacity: 0, transform: "translateY(-8px)", transition: { duration: 0.18, ease: EASE_IO } }
      }
    >
      {children}
    </motion.div>
  );
}

// ── Hero text — line-by-line slide from below clip ────────────────────────
// overflow:hidden on the wrapper clips each line — NO opacity needed
// Full transform string for hardware acceleration
interface HeroTextProps {
  lines: string[];
  className?: string;
  style?: React.CSSProperties;
}

export function HeroText({ lines, className, style }: HeroTextProps) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      className={className}
      style={style}
      initial={reduced ? false : "hidden"}
      animate="visible"
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
      }}
    >
      {lines.map((line, i) => (
        <div key={i} style={{ overflow: "hidden" }}>
          <motion.span
            style={{ display: "block" }}
            variants={
              reduced
                ? {}
                : {
                    // No opacity — the parent overflow:hidden clips the line cleanly
                    hidden: { transform: "translateY(110%)" },
                    visible: {
                      transform: "translateY(0%)",
                      transition: { duration: 0.6, ease: EASE_OUT },
                    },
                  }
            }
          >
            {line}
          </motion.span>
        </div>
      ))}
    </motion.div>
  );
}

// ── Count-up (rAF based, ease-out cubic) ──────────────────────────────────
interface CountUpProps {
  value: number;
  suffix?: string;
  duration?: number;
  className?: string;
  style?: React.CSSProperties;
}

export function CountUp({
  value,
  suffix = "",
  duration = 1.2,
  className,
  style,
}: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" } as Parameters<typeof useInView>[1]);
  const reduced = useReducedMotion();
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (reduced) {
      setDisplay(value);
      return;
    }

    const start = performance.now();
    const durationMs = duration * 1000;

    function tick(now: number) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / durationMs, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      setDisplay(Math.round(eased * value));
      if (progress < 1) requestAnimationFrame(tick);
    }

    requestAnimationFrame(tick);
  }, [inView, value, duration, reduced]);

  return (
    <span ref={ref} className={className} style={style}>
      {display}{suffix}
    </span>
  );
}

// ── Marquee — CSS translateX, fully GPU composited ───────────────────────
// Duplicates items internally so the loop is seamless.
// Pause-on-hover handled by .marquee-inner:hover CSS rule.
interface MarqueeProps {
  items: React.ReactNode[];
  className?: string;
  style?: React.CSSProperties;
  itemStyle?: React.CSSProperties;
  gap?: string;
}

export function Marquee({
  items,
  className,
  style,
  itemStyle,
  gap = "3.5rem",
}: MarqueeProps) {
  // Double the array so translateX(-50%) = one full pass, seamless loop
  const doubled = [...items, ...items];
  return (
    <div className={`marquee-track ${className ?? ""}`} style={style}>
      <div className="marquee-inner">
        {doubled.map((item, i) => (
          <div
            key={i}
            style={{
              paddingLeft: gap,
              paddingRight: gap,
              display: "flex",
              alignItems: "center",
              flexShrink: 0,
              ...itemStyle,
            }}
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}

// ── AnimatedBar — scaleX reveal, hardware-accelerated ────────────────────
// Use inside a .spec-bar-track container for visual chrome
interface AnimatedBarProps {
  /** 0–1 fill fraction */
  value: number;
  delay?: number;
  color?: string;
  className?: string;
}

export function AnimatedBar({ value, delay = 0, color, className }: AnimatedBarProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" } as Parameters<typeof useInView>[1]);
  const reduced = useReducedMotion();

  return (
    <div
      ref={ref}
      className={className}
      style={{ height: "2px", background: "rgba(255,255,255,0.1)", overflow: "hidden" }}
    >
      <motion.div
        style={{
          height: "100%",
          background: color ?? "var(--color-signal)",
          transformOrigin: "left",
        }}
        initial={reduced ? false : { transform: "scaleX(0)" }}
        animate={inView ? { transform: `scaleX(${value})` } : {}}
        transition={{ duration: 1.0, ease: [0.23, 1, 0.32, 1], delay: reduced ? 0 : delay }}
      />
    </div>
  );
}

// ── Re-exports ────────────────────────────────────────────────────────────
export { motion, AnimatePresence, useInView, useReducedMotion };
