"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Lenis smooth scroll — wired to GSAP's ticker so ScrollTrigger stays in sync.
 *
 * Correct Lenis + GSAP integration (from Lenis docs):
 *  1. Run lenis.raf() inside gsap.ticker, not a separate rAF loop
 *  2. lenis.on('scroll', ScrollTrigger.update) keeps ScrollTrigger frame-accurate
 *  3. gsap.ticker.lagSmoothing(0) prevents GSAP compensating for long frames
 *
 * Without this, ScrollTrigger reads stale window.scrollY and animations
 * appear to freeze or not respond to scroll.
 */
export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const lenis = new Lenis({
      duration:       1.1,
      easing:         (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      touchMultiplier: 2,
      infinite:       false,
    });

    // Feed Lenis scroll events into ScrollTrigger so it stays frame-accurate
    lenis.on("scroll", ScrollTrigger.update);

    // Run Lenis inside GSAP's ticker — single shared RAF loop, no drift
    const tickerFn = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tickerFn);

    // Prevent GSAP from compensating for long frames (Lenis does its own smoothing)
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tickerFn);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
