"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface HorizontalScrollProps {
  children: React.ReactNode;
  /** Extra pin height multiplier — larger = more scroll distance per card */
  speed?: number;
}

/**
 * Pins the section and scrolls children horizontally as user scrolls down.
 * Apple-product-page style. Uses GSAP ScrollTrigger scrub.
 */
export default function HorizontalScroll({ children, speed = 1 }: HorizontalScrollProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    // Amount to scroll = track width - viewport width
    const getScrollAmount = () => -(track.scrollWidth - window.innerWidth);

    const ctx = gsap.context(() => {
      gsap.to(track, {
        x: getScrollAmount,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${Math.abs(getScrollAmount()) * speed}`,
          pin: true,
          scrub: 1.2,
          invalidateOnRefresh: true,
          anticipatePin: 1,
        },
      });
    }, section);

    return () => ctx.revert();
  }, [speed]);

  return (
    <section
      ref={sectionRef}
      style={{ overflow: "hidden", position: "relative" }}
    >
      <div
        ref={trackRef}
        style={{
          display: "flex",
          width: "max-content",
          willChange: "transform",
        }}
      >
        {children}
      </div>
    </section>
  );
}
