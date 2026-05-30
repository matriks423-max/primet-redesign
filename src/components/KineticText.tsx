"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import SplitType from "split-type";

interface KineticTextProps {
  text: string;
  tag?: "h1" | "h2" | "h3" | "p";
  style?: React.CSSProperties;
  delay?: number;
  /** "chars" | "words" — what to split and animate */
  splitBy?: "chars" | "words";
  className?: string;
}

/**
 * Kinetic text — splits into chars/words, animates in mechanically.
 * Each char flies in from below with staggered delay.
 * Overflow hidden on wrapper hides chars before reveal (clean).
 */
export default function KineticText({
  text,
  tag: Tag = "h1",
  style,
  delay = 0,
  splitBy = "chars",
  className,
}: KineticTextProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // SplitType splits text into span.char elements
    const split = new SplitType(el, { types: splitBy === "chars" ? "chars,words" : "words" });
    const targets = splitBy === "chars" ? split.chars : split.words;
    if (!targets || targets.length === 0) return;

    // Wrap each char's parent word in overflow:hidden so hidden chars don't show
    split.words?.forEach((word) => {
      (word as HTMLElement).style.overflow = "hidden";
      (word as HTMLElement).style.display = "inline-block";
      (word as HTMLElement).style.verticalAlign = "bottom";
    });

    gsap.set(targets, { yPercent: 110, opacity: 0 });

    gsap.to(targets, {
      yPercent: 0,
      opacity: 1,
      duration: 0.65,
      ease: "power4.out",
      stagger: {
        amount: splitBy === "chars" ? 0.55 : 0.3,
        from: "start",
      },
      delay,
    });

    return () => split.revert();
  }, [text, delay, splitBy]);

  return (
    <Tag
      ref={ref as React.RefObject<HTMLHeadingElement & HTMLParagraphElement>}
      style={style}
      className={className}
    >
      {text}
    </Tag>
  );
}
