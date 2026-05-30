"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

/**
 * Custom cursor — signal dot + lagging ring.
 * Dot: direct style.transform in mousemove (zero lag).
 * Ring: CSS transition handles the lag — runs on compositor thread, zero JS cost.
 *       No GSAP ticker needed → no main-thread animation loop.
 */
export default function CustomCursor() {
  const dotRef  = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const visible = useRef(false);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const dot  = dotRef.current!;
    const ring = ringRef.current!;

    // CSS transition on ring gives the lag effect off main thread
    ring.style.transitionProperty = "transform";
    ring.style.transitionDuration = "160ms";
    ring.style.transitionTimingFunction = "ease-out";

    const onMove = (e: MouseEvent) => {
      const { clientX: x, clientY: y } = e;

      // Dot: exact position, zero lag
      dot.style.transform  = `translate(${x}px, ${y}px)`;
      // Ring: same target, CSS transition creates the lag
      ring.style.transform = `translate(${x}px, ${y}px)`;

      if (!visible.current) {
        visible.current    = true;
        dot.style.opacity  = "1";
        ring.style.opacity = "1";
      }
    };

    const onLeave = () => {
      dot.style.opacity   = "0";
      ring.style.opacity  = "0";
      visible.current     = false;
    };

    // Hover: scale ring up on interactive elements
    const onEnter = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      if (t.closest("a, button, [data-cursor-hover]")) {
        // Temporarily disable transition for instant scale response
        ring.style.transitionProperty = "transform, scale, border-color";
        gsap.to(ring, { scale: 1.8, borderColor: "var(--color-signal)", duration: 0.25, ease: "power2.out" });
        gsap.to(dot,  { scale: 0,   duration: 0.2 });
      }
    };
    const onExit = (e: MouseEvent) => {
      const t = e.relatedTarget as HTMLElement | null;
      if (!t?.closest("a, button, [data-cursor-hover]")) {
        gsap.to(ring, { scale: 1, borderColor: "rgba(204,51,0,0.7)", duration: 0.3, ease: "power2.out" });
        gsap.to(dot,  { scale: 1, duration: 0.25 });
      }
    };

    document.addEventListener("mousemove",  onMove,  { passive: true });
    document.documentElement.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseover",  onEnter, { passive: true });
    document.addEventListener("mouseout",   onExit,  { passive: true });

    return () => {
      document.removeEventListener("mousemove",  onMove);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseover",  onEnter);
      document.removeEventListener("mouseout",   onExit);
    };
  }, []);

  return (
    <>
      {/* Dot — exact position, zero lag */}
      <div
        ref={dotRef}
        aria-hidden="true"
        style={{
          position:      "fixed",
          top:           "-3px",
          left:          "-3px",
          width:         "6px",
          height:        "6px",
          borderRadius:  "50%",
          background:    "var(--color-signal)",
          pointerEvents: "none",
          zIndex:        9999,
          opacity:       0,
          willChange:    "transform",
        }}
      />
      {/* Ring — CSS transition lag, compositor-thread smooth */}
      <div
        ref={ringRef}
        aria-hidden="true"
        style={{
          position:      "fixed",
          top:           "-16px",
          left:          "-16px",
          width:         "32px",
          height:        "32px",
          borderRadius:  "50%",
          border:        "1.5px solid rgba(204,51,0,0.7)",
          pointerEvents: "none",
          zIndex:        9998,
          opacity:       0,
          willChange:    "transform",
        }}
      />
    </>
  );
}
