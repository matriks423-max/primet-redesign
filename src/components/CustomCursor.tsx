"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

/**
 * Custom cursor — signal dot + lagging ring.
 * Hidden on touch devices. Uses GSAP quickSetter for 60fps performance.
 * Scales on hover over interactive elements.
 */
export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const isVisible = useRef(false);

  useEffect(() => {
    // Touch device — don't render cursor
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const dot = dotRef.current!;
    const ring = ringRef.current!;

    // GSAP quickSetters — fastest way to set transform
    const setDotX = gsap.quickSetter(dot, "x", "px");
    const setDotY = gsap.quickSetter(dot, "y", "px");
    const setRingX = gsap.quickSetter(ring, "x", "px");
    const setRingY = gsap.quickSetter(ring, "y", "px");

    let mouseX = -200;
    let mouseY = -200;
    let ringX = -200;
    let ringY = -200;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      if (!isVisible.current) {
        isVisible.current = true;
        gsap.to([dot, ring], { opacity: 1, duration: 0.3 });
      }
    };

    const onMouseLeave = () => {
      gsap.to([dot, ring], { opacity: 0, duration: 0.3 });
      isVisible.current = false;
    };

    // Lerp ring position each frame
    const ticker = gsap.ticker.add(() => {
      ringX += (mouseX - ringX) * 0.1;
      ringY += (mouseY - ringY) * 0.1;

      setDotX(mouseX);
      setDotY(mouseY);
      setRingX(ringX);
      setRingY(ringY);
    });

    document.addEventListener("mousemove", onMouseMove);
    document.documentElement.addEventListener("mouseleave", onMouseLeave);

    // Hover states — scale ring on links/buttons
    const onEnter = () => {
      gsap.to(ring, { scale: 1.8, borderColor: "var(--color-signal)", duration: 0.25, ease: "power2.out" });
      gsap.to(dot, { scale: 0, duration: 0.2 });
    };
    const onLeave = () => {
      gsap.to(ring, { scale: 1, borderColor: "rgba(255,255,255,0.4)", duration: 0.3, ease: "power2.out" });
      gsap.to(dot, { scale: 1, duration: 0.25 });
    };

    const addListeners = () => {
      document.querySelectorAll("a, button, [data-cursor-hover]").forEach((el) => {
        el.addEventListener("mouseenter", onEnter);
        el.addEventListener("mouseleave", onLeave);
      });
    };

    addListeners();

    // Re-run on route changes (Next.js navigation)
    const observer = new MutationObserver(addListeners);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      gsap.ticker.remove(ticker);
      document.removeEventListener("mousemove", onMouseMove);
      document.documentElement.removeEventListener("mouseleave", onMouseLeave);
      observer.disconnect();
    };
  }, []);

  return (
    <>
      {/* Dot — exact cursor position */}
      <div
        ref={dotRef}
        aria-hidden="true"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "6px",
          height: "6px",
          borderRadius: "50%",
          background: "var(--color-signal)",
          pointerEvents: "none",
          zIndex: 9999,
          opacity: 0,
          transform: "translate(-200px, -200px)",
          marginLeft: "-3px",
          marginTop: "-3px",
          willChange: "transform",
        }}
      />
      {/* Ring — lagging, scales on hover */}
      <div
        ref={ringRef}
        aria-hidden="true"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "32px",
          height: "32px",
          borderRadius: "50%",
          border: "1.5px solid rgba(255,255,255,0.4)",
          pointerEvents: "none",
          zIndex: 9998,
          opacity: 0,
          transform: "translate(-200px, -200px)",
          marginLeft: "-16px",
          marginTop: "-16px",
          willChange: "transform",
          mixBlendMode: "difference",
        }}
      />
    </>
  );
}
