"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { gsap } from "gsap";

/**
 * Full-viewport signal-red wipe that plays on every route change.
 * Panel sweeps left→right (cover), then right→left (reveal).
 * ~400ms total — fast enough to feel snappy, slow enough to feel premium.
 */
export default function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const panelRef = useRef<HTMLDivElement>(null);
  const isFirst = useRef(true);

  useEffect(() => {
    const panel = panelRef.current;
    if (!panel) return;

    // Skip wipe on very first load — panel starts at scaleX(0) via CSS, nothing to animate
    if (isFirst.current) {
      isFirst.current = false;
      return;
    }

    // Cover then reveal
    const tl = gsap.timeline();
    tl.set(panel, { scaleX: 0, transformOrigin: "left" })
      .to(panel, { scaleX: 1, duration: 0.35, ease: "power3.inOut" })
      .set(panel, { transformOrigin: "right" })
      .to(panel, { scaleX: 0, duration: 0.4, ease: "power3.inOut", delay: 0.05 });
  }, [pathname]);

  return (
    <>
      {/* Wipe panel — fixed, sits above everything */}
      <div
        ref={panelRef}
        aria-hidden="true"
        style={{
          position: "fixed",
          inset: 0,
          background: "var(--color-signal)",
          zIndex: 9990,
          transformOrigin: "left",
          transform: "scaleX(0)",
          pointerEvents: "none",
        }}
      />
      {children}
    </>
  );
}
