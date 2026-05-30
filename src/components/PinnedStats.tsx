"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const FACTS = [
  {
    number: "20+",
    unit: "gadi",
    headline: "Divas desmitgades pārtikas rūpniecībā",
    sub: "Kopš 2004. gada — Latvijas ražotāju uzticams partneris iekārtu piegādē un servisā.",
    accent: "var(--color-signal)",
  },
  {
    number: "200+",
    unit: "projekti",
    headline: "Uzstādīti un nodoti ekspluatācijā",
    sub: "No vienas iekārtas līdz pilnām ražošanas līnijām gaļas, piena un konservu rūpniecībā.",
    accent: "oklch(62% 0.19 145)",
  },
  {
    number: "48h",
    unit: "SLA",
    headline: "Servisa reakcija visā Baltijā",
    sub: "Garantēts reakcijas laiks Latvijā. 72h Igaunijā un Lietuvā. Tālrunis darbojas 24/7.",
    accent: "oklch(68% 0.18 220)",
  },
  {
    number: "3",
    unit: "valstis",
    headline: "Baltijas servisa tīkls",
    sub: "Vienots servisa tīkls Latvijā, Igaunijā un Lietuvā — viens kontakts, pilns reģions.",
    accent: "var(--color-signal)",
  },
];

export default function PinnedStats() {
  /**
   * NO gsap pin:true here — that creates a DOM wrapper React can't reconcile.
   * Instead: CSS position:sticky on the inner section, outer div provides scroll space.
   * GSAP ScrollTrigger only drives opacity crossfades — zero DOM modification.
   */
  const outerRef  = useRef<HTMLDivElement>(null);
  const panelsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const outer  = outerRef.current;
    const panels = panelsRef.current;
    if (!outer || !panels) return;

    const items = panels.querySelectorAll<HTMLElement>(".stat-panel");

    const ctx = gsap.context(() => {
      // First panel visible, rest stacked absolutely at opacity 0
      items.forEach((panel, i) => {
        gsap.set(panel, {
          opacity:  i === 0 ? 1 : 0,
          position: i === 0 ? "relative" : "absolute",
          inset:    i === 0 ? "auto"      : 0,
          zIndex:   FACTS.length - i,
          display:  "flex",
        });
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger:  outer,
          start:    "top top",
          end:      () => `+=${window.innerHeight * (FACTS.length - 1)}`,
          scrub:    1,
          // NO pin:true — CSS sticky handles this
        },
      });

      // Hold each panel, then cross-fade to next
      items.forEach((panel, i) => {
        tl.to({}, { duration: 0.9 }); // hold
        if (i < items.length - 1) {
          tl.to(panel,        { opacity: 0, duration: 0.3, ease: "power2.inOut" })
            .to(items[i + 1], { opacity: 1, duration: 0.3, ease: "power2.inOut" }, "<");
        }
      });
    }, outer);

    return () => ctx.revert();
  }, []);

  return (
    // Outer div: provides scroll length so the sticky section "stays" while scrolling
    <div ref={outerRef} style={{ height: `${FACTS.length * 100}vh` }}>
      {/* Sticky section: CSS replaces GSAP pin — no DOM side-effects */}
      <section
        className="noise"
        style={{
          background: "var(--color-navy)",
          height:     "100vh",
          position:   "sticky",
          top:        0,
          display:    "flex",
          alignItems: "center",
          overflow:   "hidden",
        }}
      >
        {/* Industrial machine photo — subtle texture behind stats */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1800&q=60"
          alt=""
          aria-hidden="true"
          style={{
            position:      "absolute",
            inset:         0,
            width:         "100%",
            height:        "100%",
            objectFit:     "cover",
            objectPosition: "center",
            opacity:       0.08,
            pointerEvents: "none",
          }}
        />

        {/* Subtle grid */}
        <div
          aria-hidden="true"
          style={{
            position:        "absolute",
            inset:           0,
            backgroundImage: "linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)",
            backgroundSize:  "60px 60px",
            pointerEvents:   "none",
          }}
        />

        <div className="container" style={{ position: "relative", zIndex: 1, width: "100%" }}>
          <div ref={panelsRef} style={{ position: "relative", minHeight: "60vh" }}>
            {FACTS.map((f, i) => (
              <div
                key={f.unit}
                className="stat-panel"
                style={{
                  flexDirection: "column",
                  gap:           "2rem",
                  maxWidth:      "760px",
                  paddingTop:    "4rem",
                  paddingBottom: "4rem",
                }}
              >
                {/* Big number + unit */}
                <div style={{ display: "flex", alignItems: "baseline", gap: "0.75rem" }}>
                  <span
                    className="stat-num"
                    style={{
                      fontSize:           "clamp(5rem, 14vw, 10rem)",
                      fontWeight:         800,
                      letterSpacing:      "-0.04em",
                      lineHeight:         0.9,
                      color:              f.accent,
                      fontVariantNumeric: "tabular-nums",
                    }}
                  >
                    {f.number}
                  </span>
                  <span
                    style={{
                      fontSize:      "clamp(1rem, 3vw, 1.5rem)",
                      fontWeight:    600,
                      color:         "rgba(255,255,255,0.45)",
                      letterSpacing: "0.06em",
                      textTransform: "uppercase",
                    }}
                  >
                    {f.unit}
                  </span>
                </div>

                {/* Accent bar */}
                <div style={{ width: "80px", height: "2px", background: f.accent }} />

                {/* Headline */}
                <h3
                  style={{
                    fontSize:      "clamp(1.5rem, 4vw, 2.5rem)",
                    fontWeight:    700,
                    color:         "var(--color-white)",
                    letterSpacing: "-0.025em",
                    lineHeight:    1.15,
                    maxWidth:      "18ch",
                  }}
                >
                  {f.headline}
                </h3>

                <p
                  style={{
                    fontSize:   "1.0625rem",
                    color:      "rgba(255,255,255,0.65)",
                    lineHeight: 1.7,
                    maxWidth:   "44ch",
                  }}
                >
                  {f.sub}
                </p>

                {/* Step dots */}
                <div style={{ display: "flex", gap: "8px", marginTop: "1rem" }}>
                  {FACTS.map((_, j) => (
                    <div
                      key={j}
                      style={{
                        width:      j === i ? "28px" : "8px",
                        height:     "3px",
                        background: j === i ? f.accent : "rgba(255,255,255,0.2)",
                      }}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
