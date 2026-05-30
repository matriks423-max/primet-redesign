"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";

gsap.registerPlugin(ScrollTrigger, DrawSVGPlugin);

/**
 * Engineering schematic that draws itself as you scroll.
 * Uses GSAP DrawSVGPlugin (free since April 2025).
 * Represents a stylized food processing line: hopper → grinder → conveyor → packer.
 */
export default function SchematicDraw() {
  const svgRef = useRef<SVGSVGElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const svg = svgRef.current;
    const wrap = wrapRef.current;
    if (!svg || !wrap) return;

    const paths = svg.querySelectorAll("[data-draw]");

    const ctx = gsap.context(() => {
      gsap.set(paths, { drawSVG: "0%" });

      gsap.to(paths, {
        drawSVG: "100%",
        duration: 2.5,
        stagger: 0.15,
        ease: "power2.inOut",
        scrollTrigger: {
          trigger: wrap,
          start: "top 70%",
          end: "bottom 30%",
          scrub: 1,
        },
      });

      // Labels fade in after lines appear
      const labels = svg.querySelectorAll("[data-label]");
      gsap.from(labels, {
        opacity: 0,
        y: 8,
        stagger: 0.2,
        duration: 0.5,
        scrollTrigger: {
          trigger: wrap,
          start: "top 55%",
        },
      });
    }, wrap);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={wrapRef} style={{ width: "100%", maxWidth: "720px" }}>
      <svg
        ref={svgRef}
        viewBox="0 0 720 320"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ width: "100%", height: "auto" }}
        aria-label="Pārtikas pārstrādes iekārtu shēma"
      >
        {/* ── Machine 1: Hopper / Grinder ── */}
        {/* Body */}
        <rect data-draw x="30" y="90" width="110" height="140" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" />
        {/* Hopper top */}
        <path data-draw d="M50 90 L40 55 L130 55 L120 90" stroke="rgba(255,255,255,0.25)" strokeWidth="1.5" />
        {/* Internal detail lines */}
        <line data-draw x1="30" y1="130" x2="140" y2="130" stroke="rgba(204,51,0,0.6)" strokeWidth="1.5" />
        <line data-draw x1="30" y1="160" x2="140" y2="160" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
        {/* Screws */}
        <circle data-draw cx="55" cy="145" r="10" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
        <circle data-draw cx="85" cy="145" r="10" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
        <circle data-draw cx="115" cy="145" r="10" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
        {/* Output nozzle */}
        <path data-draw d="M140 195 L165 200 L165 220 L140 215" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" />

        {/* ── Pipe run 1 → 2 ── */}
        <path data-draw d="M165 210 L220 210 L220 180" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" strokeDasharray="4 4" />

        {/* ── Machine 2: Mixer / Vacuum ── */}
        <rect data-draw x="220" y="100" width="100" height="120" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" />
        {/* Lid */}
        <path data-draw d="M220 100 Q270 75 320 100" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" />
        {/* Agitator */}
        <line data-draw x1="270" y1="100" x2="270" y2="165" stroke="rgba(204,51,0,0.5)" strokeWidth="2" />
        <line data-draw x1="245" y1="140" x2="295" y2="140" stroke="rgba(204,51,0,0.5)" strokeWidth="2" />
        <line data-draw x1="250" y1="155" x2="290" y2="155" stroke="rgba(204,51,0,0.35)" strokeWidth="1.5" />
        {/* Vacuum port */}
        <rect data-draw x="290" y="108" width="30" height="14" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
        <text data-label x="305" y="119" textAnchor="middle" fill="rgba(255,255,255,0.35)" fontSize="7" fontFamily="system-ui" letterSpacing="0.05em">VAC</text>

        {/* ── Pipe run 2 → 3 ── */}
        <path data-draw d="M320 170 L380 170 L380 155" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" strokeDasharray="4 4" />

        {/* ── Machine 3: Filler / Packer ── */}
        <rect data-draw x="380" y="90" width="100" height="145" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" />
        {/* Fill nozzles */}
        <line data-draw x1="405" y1="235" x2="405" y2="265" stroke="rgba(255,255,255,0.3)" strokeWidth="2" />
        <line data-draw x1="430" y1="235" x2="430" y2="265" stroke="rgba(255,255,255,0.3)" strokeWidth="2" />
        <line data-draw x1="455" y1="235" x2="455" y2="265" stroke="rgba(255,255,255,0.3)" strokeWidth="2" />
        {/* Control panel */}
        <rect data-draw x="388" y="98" width="42" height="26" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
        <rect data-draw x="392" y="102" width="8" height="6" fill="rgba(204,51,0,0.4)" stroke="rgba(204,51,0,0.6)" strokeWidth="0.5" />
        <rect data-draw x="404" y="102" width="8" height="6" fill="rgba(255,255,255,0.08)" stroke="rgba(255,255,255,0.2)" strokeWidth="0.5" />
        {/* Weight display */}
        <rect data-draw x="440" y="98" width="32" height="26" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
        <text data-label x="456" y="115" textAnchor="middle" fill="rgba(204,51,0,0.7)" fontSize="8" fontFamily="monospace">200g</text>

        {/* ── Conveyor ── */}
        <rect data-draw x="480" y="250" width="200" height="16" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" />
        <line data-draw x1="380" y1="265" x2="480" y2="265" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" />
        {/* Belt rollers */}
        {[495, 530, 565, 600, 635, 665].map((x) => (
          <line key={x} data-draw x1={x} y1="250" x2={x} y2="266" stroke="rgba(255,255,255,0.12)" strokeWidth="1" />
        ))}
        {/* Drive wheels */}
        <circle data-draw cx="485" cy="258" r="8" stroke="rgba(255,255,255,0.25)" strokeWidth="1.5" />
        <circle data-draw cx="672" cy="258" r="8" stroke="rgba(255,255,255,0.25)" strokeWidth="1.5" />

        {/* ── Dimension lines ── */}
        <line data-draw x1="30" y1="295" x2="480" y2="295" stroke="rgba(255,255,255,0.1)" strokeWidth="0.5" />
        <line data-draw x1="30" y1="290" x2="30" y2="300" stroke="rgba(255,255,255,0.1)" strokeWidth="0.5" />
        <line data-draw x1="480" y1="290" x2="480" y2="300" stroke="rgba(255,255,255,0.1)" strokeWidth="0.5" />

        {/* ── Labels ── */}
        <text data-label x="85" y="47" textAnchor="middle" fill="rgba(255,255,255,0.35)" fontSize="8" fontFamily="system-ui" letterSpacing="0.08em">SMALCINĀTĀJS</text>
        <text data-label x="270" y="85" textAnchor="middle" fill="rgba(255,255,255,0.35)" fontSize="8" fontFamily="system-ui" letterSpacing="0.08em">MAISĪTĀJS</text>
        <text data-label x="430" y="82" textAnchor="middle" fill="rgba(255,255,255,0.35)" fontSize="8" fontFamily="system-ui" letterSpacing="0.08em">PILDĪTĀJS</text>
        <text data-label x="580" y="282" textAnchor="middle" fill="rgba(255,255,255,0.25)" fontSize="7" fontFamily="system-ui" letterSpacing="0.06em">TRANSPORTIERIS</text>
        <text data-label x="255" y="305" textAnchor="middle" fill="rgba(255,255,255,0.2)" fontSize="7" fontFamily="system-ui" letterSpacing="0.04em">RAŽOŠANAS LĪNIJA — WF SĒRIJA</text>

        {/* Signal dot — live indicator */}
        <circle cx="698" cy="258" r="4" fill="oklch(62% 0.19 145)" opacity="0.8" />
        <text data-label x="698" y="244" textAnchor="middle" fill="oklch(62% 0.19 145)" fontSize="7" fontFamily="system-ui" letterSpacing="0.04em">AKTĪVS</text>
      </svg>
    </div>
  );
}
