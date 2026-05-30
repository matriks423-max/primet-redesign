"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface HorizontalScrollProps {
  children: React.ReactNode;
  /** Scroll distance multiplier — larger = more scroll distance per card */
  speed?: number;
}

/**
 * Apple-product-page horizontal scroll.
 * CSS position:sticky handles the pin — no GSAP pin:true, no DOM side-effects.
 * GSAP ScrollTrigger only drives the track's x-translation.
 * Requires SmoothScroll to wire Lenis into GSAP ticker for correct sync.
 */
export default function HorizontalScroll({ children, speed = 1 }: HorizontalScrollProps) {
  const outerRef   = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef   = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const outer   = outerRef.current;
    const section = sectionRef.current;
    const track   = trackRef.current;
    if (!outer || !section || !track) return;

    // Compute outer div height: viewport height + horizontal scroll distance
    // so that the sticky section stays pinned for exactly the scroll distance
    const setOuterHeight = () => {
      const scrollAmount = Math.max(0, track.scrollWidth - window.innerWidth);
      outer.style.height = `${window.innerHeight + scrollAmount * speed}px`;
    };

    const ctx = gsap.context(() => {
      gsap.to(track, {
        x:    () => -Math.max(0, track.scrollWidth - window.innerWidth),
        ease: "none",
        scrollTrigger: {
          trigger:             outer,
          start:               "top top",
          end:                 "bottom bottom",
          scrub:               1.2,
          invalidateOnRefresh: true,
          onRefresh:           setOuterHeight,
          // NO pin:true — CSS sticky does the visual pin
        },
      });
    }, outer);

    // Set initial height and trigger a GSAP refresh after ctx is ready
    setOuterHeight();
    ScrollTrigger.refresh();

    window.addEventListener("resize", () => ScrollTrigger.refresh(), { passive: true });

    return () => {
      ctx.revert();
    };
  }, [speed]);

  return (
    // Outer div: scroll height so sticky "sticks" for the right duration
    <div ref={outerRef}>
      {/* CSS sticky section — replaces GSAP pin */}
      <section
        ref={sectionRef}
        style={{ position: "sticky", top: 0, height: "100vh", overflow: "hidden" }}
      >
        <div
          ref={trackRef}
          style={{
            display:    "flex",
            width:      "max-content",
            willChange: "transform",
          }}
        >
          {children}
        </div>
      </section>
    </div>
  );
}
