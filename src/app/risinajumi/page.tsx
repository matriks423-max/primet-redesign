"use client";

import Link from "next/link";
import { useState } from "react";
import { Reveal, Stagger, StaggerItemExit, AnimatePresence, motion } from "@/components/motion";

const CATEGORIES = [
  { id: "all", label: "Visi risinājumi" },
  { id: "meat", label: "Gaļa" },
  { id: "dairy", label: "Piens" },
  { id: "beverage", label: "Dzērieni" },
  { id: "baking", label: "Maize" },
  { id: "packaging", label: "Iepakošana" },
];

const EQUIPMENT = [
  {
    id: 1,
    code: "G-01",
    category: "meat",
    title: "Gaļas smalcinātājs",
    model: "WF-200 Pro",
    spec: "200 kg/h",
    desc: "Divstadiju smalcinātājs gaļas pārstrādes rūpniecībai ar nerūsējoša tērauda AISI 304 korpusu.",
    tags: ["200 kg/h", "AISI 304", "HACCP"],
  },
  {
    id: 2,
    code: "G-02",
    category: "meat",
    title: "Vakuuma maisītājs",
    model: "VM-300",
    spec: "300 L",
    desc: "Vakuuma maisītājs gaļas produktu ražošanai ar programmējamu vakuuma ciklu un marinēšanas funkciju.",
    tags: ["300 L", "IP67", "Vakuums"],
  },
  {
    id: 3,
    code: "P-01",
    category: "dairy",
    title: "Pasterizators",
    model: "PT-500 HTU",
    spec: "500 l/h",
    desc: "Plūsmas pasterizators ar HTV (augsttemperatūras īsslaicīgās apkures) tehnoloģiju piena pārstrādei.",
    tags: ["500 l/h", "75°C/15s", "CIP"],
  },
  {
    id: 4,
    code: "P-02",
    category: "dairy",
    title: "Separators",
    model: "SP-1000",
    spec: "1000 l/h",
    desc: "Centrifugālais separators piena un krējuma atdalīšanai ar automātisku biezumu regulēšanu.",
    tags: ["1000 l/h", "Automātiski", "AISI 316"],
  },
  {
    id: 5,
    code: "D-01",
    category: "beverage",
    title: "Pudelēs pildīšanas līnija",
    model: "FL-1200",
    spec: "1200 pud/h",
    desc: "Lineārā pildīšanas un aizbāžņošanas iekārta dzērienu ražošanai, piemērota 0.33–2 l pudelēm.",
    tags: ["1200/h", "0.33–2L", "ISO 14159"],
  },
  {
    id: 6,
    code: "D-02",
    category: "beverage",
    title: "Maisīšanas un CIP sistēma",
    spec: "2000 l",
    model: "MIX-2000",
    desc: "Tvertnēs maisīšanas un automātiskās CIP mazgāšanas sistēma dzērienu ražošanai.",
    tags: ["2000 L", "CIP", "PLC vadība"],
  },
  {
    id: 7,
    code: "M-01",
    category: "baking",
    title: "Mīklas maisītājs",
    model: "DM-80",
    spec: "80 kg/ciklā",
    desc: "Spirāles mīklas maisītājs maizes un konditorejas ražošanai ar divātrumu dzenuli un tilpnes svēršanu.",
    tags: ["80 kg", "2-ātrumu", "Tilpnes svēršana"],
  },
  {
    id: 8,
    code: "I-01",
    category: "packaging",
    title: "Vakuuma iepakotājs",
    model: "VP-400",
    spec: "400 cikl/h",
    desc: "Joslas vakuuma iepakotājs gaļas, sieru un sagatavoto produktu iepakošanai ar gāzes maisījumu iespēju.",
    tags: ["400/h", "MAP iespēja", "PLC"],
  },
  {
    id: 9,
    code: "I-02",
    category: "packaging",
    title: "Flow-pack iekārta",
    model: "FP-600",
    spec: "600 pak/h",
    desc: "Horizontālā flow-pack iekārta maizes, konditorejas un daļēji mitru produktu iepakošanai.",
    tags: ["600/h", "50–400 mm", "Datora vadība"],
  },
];

export default function RisinajumiPage() {
  const [activeCategory, setActiveCategory] = useState("all");

  const filtered =
    activeCategory === "all"
      ? EQUIPMENT
      : EQUIPMENT.filter((e) => e.category === activeCategory);

  return (
    <>
      {/* ── HERO ─────────────────────────────────────────────────────── */}
      <section
        data-section="hero"
        style={{
          background: "var(--color-navy)",
          padding: "8rem 0 5rem",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: [
              "linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px)",
              "linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)",
            ].join(","),
            backgroundSize: "80px 80px",
          }}
        />
        <div className="container" style={{ position: "relative" }}>
          <Reveal>
            <p className="label" style={{ marginBottom: "1.5rem", color: "var(--color-signal)" }}>
              Iekārtu katalogs
            </p>
            <h1
              style={{
                fontSize: "clamp(2.5rem, 5vw, 4rem)",
                fontWeight: 800,
                color: "var(--color-white)",
                letterSpacing: "-0.03em",
                lineHeight: 1.05,
                maxWidth: "22ch",
                marginBottom: "1.5rem",
              }}
            >
              Pārtikas rūpniecības iekārtas Latvijā
            </h1>
            <p
              style={{
                fontSize: "1.125rem",
                color: "oklch(70% 0.01 255)",
                maxWidth: "52ch",
                lineHeight: 1.65,
              }}
            >
              Vairāk nekā 50 iekārtu modeļu gaļas, piena, dzērienu un iepakošanas rūpniecībai.
              Piegāde, uzstādīšana un serviss iekļauts.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── CATALOG ──────────────────────────────────────────────────── */}
      <section
        data-section="catalog"
        className="section-pad"
        style={{ background: "var(--color-stone)" }}
      >
        <div className="container">
          {/* Filter tabs */}
          <Reveal style={{ marginBottom: "2.5rem" }}>
            <div
              role="tablist"
              aria-label="Iekārtu kategorijas"
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "2px",
                background: "var(--color-border)",
                padding: "2px",
                width: "fit-content",
              }}
            >
              {CATEGORIES.map(({ id, label }) => (
                <button
                  key={id}
                  role="tab"
                  aria-selected={activeCategory === id}
                  onClick={() => setActiveCategory(id)}
                  style={{
                    padding: "0.5rem 1.25rem",
                    fontSize: "0.8125rem",
                    fontWeight: 600,
                    letterSpacing: "0.02em",
                    border: "none",
                    cursor: "pointer",
                    background: activeCategory === id ? "var(--color-signal)" : "var(--color-stone)",
                    color: activeCategory === id ? "var(--color-white)" : "var(--color-steel)",
                    transition: "background 160ms, color 160ms",
                    fontFamily: "var(--font-inter), system-ui, sans-serif",
                  }}
                >
                  {label}
                </button>
              ))}
            </div>
          </Reveal>

          {/* Grid — AnimatePresence handles exit animation when filter changes ✓ */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
              gap: "1px",
              background: "var(--color-border)",
            }}
          >
            <AnimatePresence mode="popLayout">
              {filtered.map((item) => (
              <StaggerItemExit key={item.id}>
                <div
                  className="card-hover-bg"
                  style={{
                    background: "var(--color-stone)",
                    padding: "2rem",
                    display: "flex",
                    flexDirection: "column",
                    gap: "1rem",
                    height: "100%",
                    cursor: "pointer",
                  }}
                >
                  {/* Top: code + spec */}
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <span
                      style={{
                        fontSize: "0.75rem",
                        fontWeight: 700,
                        letterSpacing: "0.1em",
                        color: "var(--color-signal)",
                      }}
                    >
                      {item.code}
                    </span>
                    <span
                      style={{
                        fontSize: "0.75rem",
                        fontWeight: 600,
                        color: "var(--color-steel)",
                        background: "var(--color-border)",
                        padding: "3px 8px",
                      }}
                    >
                      {item.spec}
                    </span>
                  </div>

                  {/* Model */}
                  <div>
                    <h3
                      style={{
                        fontSize: "var(--fs-h4)",
                        fontWeight: 700,
                        letterSpacing: "-0.01em",
                        marginBottom: "2px",
                      }}
                    >
                      {item.title}
                    </h3>
                    <span
                      style={{
                        fontSize: "0.75rem",
                        color: "var(--color-steel)",
                        letterSpacing: "0.04em",
                      }}
                    >
                      {item.model}
                    </span>
                  </div>

                  <p
                    style={{
                      fontSize: "0.875rem",
                      color: "var(--color-steel)",
                      lineHeight: 1.6,
                      flex: 1,
                    }}
                  >
                    {item.desc}
                  </p>

                  <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                    {item.tags.map((t) => (
                      <span
                        key={t}
                        style={{
                          fontSize: "0.7rem",
                          fontWeight: 500,
                          padding: "3px 8px",
                          background: "var(--color-warm)",
                          color: "var(--color-steel)",
                          letterSpacing: "0.03em",
                        }}
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  <Link
                    href="/kontakti"
                    style={{
                      fontSize: "0.8125rem",
                      fontWeight: 600,
                      color: "var(--color-signal)",
                      textDecoration: "none",
                      letterSpacing: "0.03em",
                      marginTop: "0.25rem",
                    }}
                  >
                    Pieprasīt cenu →
                  </Link>
                </div>
              </StaggerItemExit>
            ))}
            </AnimatePresence>
          </div>

          {/* Empty state */}
          {filtered.length === 0 && (
            <div
              style={{
                textAlign: "center",
                padding: "5rem 2rem",
                color: "var(--color-steel)",
              }}
            >
              <p style={{ fontSize: "1.125rem", fontWeight: 600, marginBottom: "0.5rem" }}>
                Šajā kategorijā nav iekārtu
              </p>
              <p style={{ fontSize: "0.875rem" }}>
                Sazinieties ar mums, lai uzzinātu par konkrētu iekārtu pieejamību.
              </p>
            </div>
          )}

          {/* CTA band */}
          <Reveal
            style={{
              marginTop: "4rem",
              padding: "3rem",
              background: "var(--color-warm)",
              borderTop: "3px solid var(--color-signal)",
              display: "flex",
              flexWrap: "wrap",
              gap: "1.5rem",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div>
              <h3
                style={{
                  fontSize: "var(--fs-h3)",
                  fontWeight: 700,
                  letterSpacing: "-0.015em",
                  marginBottom: "0.5rem",
                }}
              >
                Neatradāt meklēto?
              </h3>
              <p style={{ fontSize: "0.9375rem", color: "var(--color-steel)", maxWidth: "44ch" }}>
                Mūsu katalogs ir tikai daļa no pieejamajām iekārtām. Sazinieties — mēs
                palīdzēsim atrast piemērotāko risinājumu.
              </p>
            </div>
            <Link href="/kontakti" className="btn btn-primary">
              Konsultēties
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
