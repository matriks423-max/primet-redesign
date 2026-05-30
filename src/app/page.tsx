"use client";

import Link from "next/link";
import { Reveal, Stagger, StaggerItem, CountUp, Marquee, AnimatedBar, motion } from "@/components/motion";
import { IconWrench, IconGear, IconDocument } from "@/components/Icons";
import dynamic from "next/dynamic";
import MagneticButton from "@/components/MagneticButton";

// Client-only — these use browser APIs not available during SSR
const ParticleField = dynamic(() => import("@/components/ParticleField"), { ssr: false });
const KineticText = dynamic(() => import("@/components/KineticText"), { ssr: false });
const HorizontalScroll = dynamic(() => import("@/components/HorizontalScroll"), { ssr: false });
const PinnedStats = dynamic(() => import("@/components/PinnedStats"), { ssr: false });
const SchematicDraw = dynamic(() => import("@/components/SchematicDraw"), { ssr: false });

const SPECS = ["CNC Ražošana", "MIG/MAG Metināšana", "PLC Automatizācija", "Rezerves daļas"];

const STATS = [
  { value: 20, suffix: "+", label: "Gadi nozarē" },
  { value: 200, suffix: "+", label: "Projekti pabeigti" },
  { value: 48, suffix: "h", label: "Servisa reakcija" },
  { value: 3, suffix: "", label: "Baltijas valstis" },
];

const SOLUTIONS = [
  { code: "01", title: "Gaļas apstrāde", desc: "Smalcināšanas, sajaukšanas un pildīšanas iekārtas ar precīzu svara kontroli.", tags: ["Smalcināšana", "Pildīšana", "Svara kontrole"] },
  { code: "02", title: "Piena ražošana", desc: "Pasterizācijas, separācijas un iepakošanas tehnoloģijas piena pārstrādes uzņēmumiem.", tags: ["Pasterizācija", "Separācija", "Iepakošana"] },
  { code: "03", title: "Konservēšana", desc: "Sterilizācijas un vakuuma iekārtas konservu un iepakojumu ražošanai.", tags: ["Sterilizācija", "Vakuums", "Hermētika"] },
  { code: "04", title: "Maizes & konditerija", desc: "Mīklas apstrādes, cepšanas un glazūras uzklāšanas automatizētas līnijas.", tags: ["Mīklas apstrāde", "Cepšana", "Automatizācija"] },
  { code: "05", title: "Dzērienu ražošana", desc: "Maisīšanas, filtrēšanas un pudelēs pildīšanas sistēmas no 500 l/h.", tags: ["Filtrēšana", "Pildīšana", "CIP mazgāšana"] },
  { code: "06", title: "Iepakošana & marķēšana", desc: "Vakuuma, flow-pack un termokrājas iekārtas ar viso formātu marķēšanu.", tags: ["Vakuuma pak.", "Flow-pack", "Marķēšana"] },
];

const PROOF = [
  { value: "ISO 9001", label: "Kvalitātes vadības sertifikāts" },
  { value: "CE", label: "Eiropas atbilstības marķējums" },
  { value: "HACCP", label: "Pārtikas drošuma analīze" },
  { value: "3×", label: "Baltijas servisa tīkls" },
];

const SERVICES = [
  { Icon: IconWrench, title: "Uzstādīšana", desc: "Iekārtu piegāde, montāža un nodošana ekspluatācijā ar pilnu dokumentāciju." },
  { Icon: IconGear, title: "Apkope un remontdarbi", desc: "Plānota apkope, avārijas remontdarbi un rezerves daļu piegāde 48 stundu laikā." },
  { Icon: IconDocument, title: "Konsultācijas", desc: "Ražošanas līniju projektēšana un modernizācija ar pilnu tehnisko atbalstu." },
];

export default function HomePage() {
  return (
    <>
      {/* ── HERO ─────────────────────────────────────────────────────── */}
      <section
        data-section="hero"
        className="noise"
        style={{
          background: "var(--color-navy)",
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          paddingTop: "5rem",
          paddingBottom: "5rem",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Industrial machine photo — behind everything, adds depth */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1800&q=60"
          alt=""
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center",
            opacity: 0.15,
            pointerEvents: "none",
          }}
          loading="eager"
        />

        {/* Three.js particle field — absolute fill behind content */}
        <ParticleField />

        {/* Subtle grid — behind particles */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: [
              "linear-gradient(rgba(255,255,255,0.018) 1px, transparent 1px)",
              "linear-gradient(90deg, rgba(255,255,255,0.018) 1px, transparent 1px)",
            ].join(","),
            backgroundSize: "80px 80px",
            pointerEvents: "none",
            zIndex: 1,
          }}
        />

        {/* Bottom signal line */}
        <motion.div
          aria-hidden="true"
          initial={{ transform: "scaleX(0)" }}
          animate={{ transform: "scaleX(1)" }}
          transition={{ duration: 1.4, ease: [0.23, 1, 0.32, 1], delay: 1 }}
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "3px",
            background: "linear-gradient(90deg, var(--color-signal), oklch(46% 0.19 28) 60%, transparent)",
            transformOrigin: "left",
            zIndex: 2,
          }}
        />

        <div className="container" style={{ position: "relative", zIndex: 3 }}>
          <div
            className="hero-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "clamp(300px, 55%, 640px) 1fr",
              gap: "clamp(2.5rem, 6vw, 5rem)",
              alignItems: "center",
            }}
          >
            {/* Left copy */}
            <div>
              {/* Overline */}
              <motion.div
                initial={{ opacity: 0, transform: "translateX(-16px)" }}
                animate={{ opacity: 1, transform: "translateX(0px)" }}
                transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1], delay: 0.15 }}
                style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "1.75rem" }}
              >
                <span style={{ display: "block", width: "32px", height: "1.5px", background: "var(--color-signal)" }} />
                <span style={{ fontSize: "0.6875rem", fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--color-signal)" }}>
                  Pārtikas rūpniecības iekārtas
                </span>
              </motion.div>

              {/* Kinetic headline — char by char */}
              <KineticText
                text="Ražošanas iekārtas,"
                tag="h1"
                delay={0.3}
                splitBy="chars"
                style={{
                  fontSize: "clamp(2.75rem, 5.5vw, 4.5rem)",
                  fontWeight: 800,
                  letterSpacing: "-0.035em",
                  lineHeight: 1.0,
                  color: "var(--color-white)",
                  display: "block",
                  marginBottom: "0.1em",
                }}
              />
              <KineticText
                text="kas darbojas."
                tag="h1"
                delay={0.5}
                splitBy="chars"
                style={{
                  fontSize: "clamp(2.75rem, 5.5vw, 4.5rem)",
                  fontWeight: 800,
                  letterSpacing: "-0.035em",
                  lineHeight: 1.0,
                  color: "var(--color-signal)",
                  display: "block",
                  marginBottom: "1.75rem",
                }}
              />

              {/* Sub */}
              <motion.p
                initial={{ opacity: 0, transform: "translateY(16px)" }}
                animate={{ opacity: 1, transform: "translateY(0px)" }}
                transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1], delay: 0.85 }}
                style={{ fontSize: "1.125rem", color: "oklch(68% 0.01 255)", lineHeight: 1.65, maxWidth: "42ch", marginBottom: "2rem" }}
              >
                SIA Primet — piegāde, uzstādīšana un serviss pārtikas pārstrādes uzņēmumiem Latvijā un visā Baltijā.
              </motion.p>

              {/* Spec pills */}
              <motion.div
                initial={{ opacity: 0, transform: "translateY(10px)" }}
                animate={{ opacity: 1, transform: "translateY(0px)" }}
                transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1], delay: 1.0 }}
                style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginBottom: "2.25rem" }}
              >
                {SPECS.map((s) => (
                  <span key={s} style={{ fontSize: "0.7rem", fontWeight: 500, color: "oklch(55% 0.01 255)", padding: "5px 12px", border: "1px solid rgba(255,255,255,0.09)", letterSpacing: "0.04em" }}>
                    {s}
                  </span>
                ))}
              </motion.div>

              {/* Magnetic CTAs */}
              <motion.div
                initial={{ opacity: 0, transform: "translateY(10px)" }}
                animate={{ opacity: 1, transform: "translateY(0px)" }}
                transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1], delay: 1.1 }}
                style={{ display: "flex", alignItems: "center", gap: "1.25rem", flexWrap: "wrap", marginBottom: "2.75rem" }}
              >
                <MagneticButton href="/kontakti" className="btn btn-primary">
                  Pieprasīt piedāvājumu
                </MagneticButton>
                <Link href="/risinajumi" style={{ fontSize: "0.875rem", fontWeight: 600, color: "rgba(255,255,255,0.7)", textDecoration: "none", letterSpacing: "0.02em", borderBottom: "1px solid rgba(255,255,255,0.2)", paddingBottom: "2px", transition: "color 200ms, border-color 200ms" }}>
                  Skatīt risinājumus →
                </Link>
              </motion.div>

              {/* Stats strip */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 1.3 }}
                style={{ paddingTop: "2rem", borderTop: "1px solid rgba(255,255,255,0.07)", display: "flex", gap: "clamp(1.5rem, 5vw, 3.5rem)", flexWrap: "wrap" }}
              >
                {STATS.map(({ value, suffix, label }) => (
                  <div key={label} style={{ display: "flex", flexDirection: "column", gap: "3px" }}>
                    <span style={{ fontSize: "0.625rem", fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "oklch(35% 0.02 255)" }}>{label}</span>
                    <span style={{ fontSize: "1rem", fontWeight: 700, color: "var(--color-white)", fontVariantNumeric: "tabular-nums" }}>
                      <CountUp value={value} suffix={suffix} />
                    </span>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Right panel — HMI spec display */}
            <motion.div
              initial={{ opacity: 0, transform: "translateY(24px)" }}
              animate={{ opacity: 1, transform: "translateY(0px)" }}
              transition={{ duration: 0.9, ease: [0.23, 1, 0.32, 1], delay: 0.5 }}
              style={{ display: "flex", flexDirection: "column", gap: "0" }}
              className="desktop-spec"
            >
              <div style={{ background: "oklch(17% 0.05 255)", border: "1px solid rgba(255,255,255,0.07)", borderBottom: "none", padding: "0.875rem 1.25rem", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <span className="live-dot" aria-hidden="true" />
                  <span style={{ fontSize: "0.6875rem", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "oklch(62% 0.19 145)" }}>Aktīvs</span>
                </div>
                <span style={{ fontSize: "0.625rem", fontWeight: 500, letterSpacing: "0.12em", textTransform: "uppercase", color: "oklch(38% 0.01 255)" }}>WF-200 Pro · Gaļas līnija</span>
              </div>
              <div style={{ background: "oklch(15% 0.04 255)", border: "1px solid rgba(255,255,255,0.07)", padding: "1.5rem 1.25rem", display: "flex", flexDirection: "column", gap: "1.125rem" }}>
                {[
                  { label: "Kapacitāte",   value: 0.84, display: "200 kg/h", color: "oklch(62% 0.19 145)" },
                  { label: "Efektivitāte", value: 0.91, display: "91%",      color: "oklch(62% 0.19 145)" },
                  { label: "Dīkstāves",    value: 0.06, display: "< 2%",     color: "oklch(68% 0.18 60)"  },
                ].map(({ label, value, display, color }, i) => (
                  <div key={label} style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                      <span style={{ fontSize: "0.6875rem", fontWeight: 500, letterSpacing: "0.06em", textTransform: "uppercase", color: "oklch(46% 0.01 255)" }}>{label}</span>
                      <span style={{ fontSize: "0.8125rem", fontWeight: 700, fontVariantNumeric: "tabular-nums", color: "var(--color-white)" }}>{display}</span>
                    </div>
                    <AnimatedBar value={value} delay={0.6 + i * 0.12} color={color} />
                  </div>
                ))}
              </div>
              <div style={{ background: "oklch(13% 0.04 255)", border: "1px solid rgba(255,255,255,0.07)", borderTop: "none", padding: "0.875rem 1.25rem", display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "0.5rem" }}>
                {["ISO 9001", "CE", "HACCP", "IP66"].map((cert) => (
                  <div key={cert} style={{ textAlign: "center", padding: "0.5rem 0.25rem", border: "1px solid rgba(255,255,255,0.07)" }}>
                    <span style={{ fontSize: "0.625rem", fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", color: "oklch(55% 0.01 255)" }}>{cert}</span>
                  </div>
                ))}
              </div>
              <div style={{ marginTop: "1rem", background: "oklch(16% 0.04 255)", border: "1px solid rgba(255,255,255,0.06)", padding: "1.25rem", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                {[["500–5000 l/h", "Kapacitātes diapazons"], ["AISI 316L", "Tērauda klase"], ["IP67", "Aizsardzības pakāpe"], ["48h", "Servisa reakcija"]].map(([v, u]) => (
                  <div key={u} style={{ borderLeft: "2px solid rgba(255,255,255,0.06)", paddingLeft: "0.75rem" }}>
                    <div style={{ fontSize: "0.9375rem", fontWeight: 700, color: "var(--color-white)", letterSpacing: "-0.01em", fontVariantNumeric: "tabular-nums" }}>{v}</div>
                    <div style={{ fontSize: "0.625rem", color: "oklch(40% 0.01 255)", letterSpacing: "0.06em", textTransform: "uppercase", marginTop: "2px" }}>{u}</div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── PROOF STRIP ──────────────────────────────────────────────── */}
      <section data-section="proof" className="noise" style={{ background: "var(--color-ink)", padding: "3rem 0" }}>
        <div className="container">
          <Stagger style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))" }}>
            {PROOF.map(({ value, label }, i) => (
              <StaggerItem key={label}>
                <div style={{ padding: "1.5rem 2rem", borderRight: i < PROOF.length - 1 ? "1px solid rgba(255,255,255,0.08)" : "none", display: "flex", flexDirection: "column", gap: "4px" }}>
                  <span style={{ fontSize: "1.375rem", fontWeight: 800, letterSpacing: "-0.02em", color: "var(--color-white)" }}>{value}</span>
                  <span style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.45)", letterSpacing: "0.03em" }}>{label}</span>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* ── CERT MARQUEE ─────────────────────────────────────────────── */}
      <div
        style={{
          background: "var(--color-warm)",
          borderTop: "1px solid var(--color-border)",
          borderBottom: "1px solid var(--color-border)",
          padding: "1.25rem 0",
          overflow: "hidden",
        }}
        aria-hidden="true"
      >
        <Marquee
          gap="2.5rem"
          items={[
            "ISO 9001:2015",
            "CE Marķējums",
            "HACCP Atbilstība",
            "AISI 304 / 316L",
            "IP66 / IP67",
            "CIP Mazgāšana",
            "PLC Automatizācija",
            "FDA / EU 1935/2004",
            "Piegāde visā Baltijā",
            "48h Servisa garantija",
          ].map((item) => (
            <span
              key={item}
              style={{
                fontSize: "0.75rem",
                fontWeight: 600,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: "var(--color-steel)",
                whiteSpace: "nowrap",
                display: "flex",
                alignItems: "center",
                gap: "2.5rem",
              }}
            >
              {item}
              <span style={{ display: "inline-block", width: "3px", height: "3px", borderRadius: "50%", background: "var(--color-signal)", flexShrink: 0 }} />
            </span>
          ))}
        />
      </div>

      {/* ── PINNED STATS ─────────────────────────────────────────────── */}
      <PinnedStats />

      {/* ── SOLUTIONS — horizontal scroll ─────────────────────────────── */}
      <div data-section="solutions" style={{ background: "var(--color-stone)" }}>
        {/* Section header — not pinned */}
        <div className="container" style={{ paddingTop: "5rem" }}>
          <Reveal style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: "1.5rem", marginBottom: "3rem", paddingBottom: "1.5rem", borderBottom: "1px solid var(--color-border)" }}>
            <div>
              <p className="label" style={{ marginBottom: "0.75rem" }}>Risinājumi</p>
              <h2 style={{ fontSize: "var(--fs-h2)", fontWeight: 700, letterSpacing: "-0.02em", maxWidth: "22ch" }}>
                Pārtikas rūpniecības iekārtas katram procesam
              </h2>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
              <span style={{ fontSize: "0.75rem", color: "var(--color-steel)", letterSpacing: "0.04em" }}>Ritiniet horizontāli →</span>
              <Link href="/risinajumi" style={{ fontSize: "0.8125rem", fontWeight: 600, color: "var(--color-signal)", textDecoration: "none", letterSpacing: "0.04em", whiteSpace: "nowrap" }}>
                Visas iekārtas
              </Link>
            </div>
          </Reveal>
        </div>

        {/* Pinned horizontal scroll track */}
        <HorizontalScroll speed={1.1}>
          {/* Intro card */}
          <div style={{ width: "min(320px, 90vw)", flexShrink: 0, padding: "2.5rem 3rem 2.5rem 2rem", display: "flex", flexDirection: "column", justifyContent: "flex-end", minHeight: "60vh", background: "var(--color-navy)", position: "relative", overflow: "hidden" }}>
            <div aria-hidden="true" style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
            <div style={{ position: "absolute", top: 0, left: 0, width: "3px", height: "100%", background: "var(--color-signal)" }} />
            <p style={{ fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--color-signal)", marginBottom: "1rem", position: "relative" }}>06 risinājumi</p>
            <p style={{ fontSize: "1.125rem", fontWeight: 600, color: "rgba(255,255,255,0.7)", lineHeight: 1.5, position: "relative" }}>
              No gaļas apstrādes līdz dzērienu pildīšanai — iekārtas katram pārtikas ražošanas procesam.
            </p>
          </div>

          {/* Solution cards */}
          {SOLUTIONS.map((s, i) => (
            <div
              key={s.code}
              className="solution-card"
              style={{
                width: "min(380px, 88vw)",
                flexShrink: 0,
                background: i % 2 === 0 ? "var(--color-stone)" : "var(--color-warm)",
                padding: "3rem 2.5rem",
                display: "flex",
                flexDirection: "column",
                gap: "1.25rem",
                minHeight: "60vh",
                border: "1px solid transparent",
                cursor: "pointer",
                borderLeft: "1px solid var(--color-border)",
              }}
            >
              <span className="card-code" style={{ fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.1em", color: "var(--color-signal)" }}>{s.code}</span>
              <h3 style={{ fontSize: "var(--fs-h3)", fontWeight: 700, letterSpacing: "-0.02em", lineHeight: 1.15 }}>{s.title}</h3>
              <p style={{ fontSize: "var(--fs-small)", color: "var(--color-steel)", lineHeight: 1.7, flex: 1 }}>{s.desc}</p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                {s.tags.map((t) => (
                  <span key={t} style={{ fontSize: "0.7rem", fontWeight: 500, padding: "4px 10px", background: "rgba(0,0,0,0.05)", color: "var(--color-steel)", letterSpacing: "0.03em" }}>{t}</span>
                ))}
              </div>
              <span className="card-arrow" style={{ display: "inline-flex", alignItems: "center", gap: "6px", fontSize: "0.75rem", fontWeight: 600, color: "var(--color-signal)", letterSpacing: "0.04em" }}>
                Skatīt risinājumu
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2 6h8M6 2l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </span>
            </div>
          ))}

          {/* CTA end card */}
          <div style={{ width: "min(320px, 90vw)", flexShrink: 0, padding: "3rem 2.5rem", display: "flex", flexDirection: "column", justifyContent: "center", gap: "1.5rem", minHeight: "60vh", background: "var(--color-signal)", borderLeft: "1px solid rgba(255,255,255,0.15)" }}>
            <p style={{ fontSize: "1.25rem", fontWeight: 700, color: "var(--color-white)", lineHeight: 1.3, letterSpacing: "-0.01em" }}>Nav atrasts piemērots risinājums?</p>
            <p style={{ fontSize: "0.875rem", color: "rgba(255,255,255,0.75)", lineHeight: 1.6 }}>Mēs projektējam pielāgotas iekārtu līnijas pēc jūsu specifikācijām.</p>
            <MagneticButton href="/kontakti" style={{ display: "inline-flex", alignItems: "center", padding: "0.75rem 1.5rem", background: "var(--color-white)", color: "var(--color-signal)", fontSize: "0.8125rem", fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", textDecoration: "none", width: "fit-content" }}>
              Sazināties →
            </MagneticButton>
          </div>
        </HorizontalScroll>
      </div>

      {/* ── ABOUT TEASER ─────────────────────────────────────────────── */}
      <section data-section="about" className="noise section-pad" style={{ background: "var(--color-navy)" }}>
        <div className="container">
          {/* Top: copy + quote */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "clamp(2.5rem, 6vw, 5rem)", alignItems: "center", marginBottom: "5rem" }}>
            <Reveal>
              <p className="label" style={{ marginBottom: "1rem", color: "var(--color-signal)" }}>Par mums</p>
              <h2 style={{ fontSize: "var(--fs-h2)", fontWeight: 700, letterSpacing: "-0.02em", lineHeight: 1.15, marginBottom: "1.5rem", color: "var(--color-white)" }}>
                Vairāk nekā 20 gadu pieredze nozarē
              </h2>
              <p style={{ fontSize: "1rem", color: "rgba(255,255,255,0.55)", lineHeight: 1.75, maxWidth: "44ch", marginBottom: "2rem" }}>
                SIA Primet nodrošina Latvijas un Baltijas pārtikas rūpniecību ar uzticamām iekārtām un profesionālu servisu. Pilna piegādes ķēde — no ražotāja līdz nodošanai ekspluatācijā.
              </p>
              <MagneticButton href="/par-uznemumu" className="btn btn-outline">
                Uzzināt vairāk
              </MagneticButton>
            </Reveal>

            <Reveal delay={0.15}>
              <figure style={{ borderLeft: "3px solid var(--color-signal)", paddingLeft: "2rem", position: "relative" }}>
                <blockquote style={{ fontSize: "1.1875rem", fontWeight: 500, color: "rgba(255,255,255,0.85)", lineHeight: 1.65, letterSpacing: "-0.01em", marginBottom: "1.5rem", fontStyle: "italic" }}>
                  &ldquo;Mūsu klienti neiegādājas iekārtas — viņi iegādājas darbspēju. Katrs servisa vizītes mērķis ir nodrošināt, ka ražošana turpinās.&rdquo;
                </blockquote>
                <figcaption style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                  <div style={{ width: "32px", height: "32px", background: "var(--color-signal)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.8125rem", fontWeight: 700, color: "var(--color-white)", flexShrink: 0 }}>P</div>
                  <div>
                    <div style={{ fontSize: "0.8125rem", fontWeight: 600, color: "rgba(255,255,255,0.85)" }}>Primet dibinātājs</div>
                    <div style={{ fontSize: "0.6875rem", color: "rgba(255,255,255,0.35)", letterSpacing: "0.06em" }}>RĪGA, LATVIJA</div>
                  </div>
                </figcaption>
              </figure>
            </Reveal>
          </div>

          {/* Bottom: engineering schematic draws in on scroll */}
          <Reveal>
            <div style={{ borderTop: "1px solid rgba(255,255,255,0.07)", paddingTop: "3rem" }}>
              <p style={{ fontSize: "0.6875rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)", marginBottom: "2rem" }}>
                — Ražošanas līnijas shēma / WF sērija
              </p>
              <SchematicDraw />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── SERVICES ─────────────────────────────────────────────────── */}
      <section data-section="services" className="section-pad" style={{ background: "var(--color-stone)", borderTop: "1px solid var(--color-border)" }}>
        <div className="container">
          <Reveal style={{ marginBottom: "3rem" }}>
            <p className="label" style={{ marginBottom: "0.75rem" }}>Serviss</p>
            <h2 style={{ fontSize: "var(--fs-h2)", fontWeight: 700, letterSpacing: "-0.02em" }}>No piegādes līdz apkopei</h2>
          </Reveal>

          {/* CSS hover via service-card class — not JS event handlers ✓ */}
          <Stagger style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "1px", background: "var(--color-border)" }}>
            {SERVICES.map(({ Icon, title, desc }) => (
              <StaggerItem key={title}>
                <div className="service-card" style={{ background: "var(--color-stone)", padding: "2.5rem 2rem" }}>
                  <span style={{ marginBottom: "1.5rem", display: "block", color: "var(--color-signal)" }}>
                    <Icon size={28} />
                  </span>
                  <h3 style={{ fontSize: "var(--fs-h4)", fontWeight: 700, letterSpacing: "-0.01em", marginBottom: "0.75rem" }}>{title}</h3>
                  <p style={{ fontSize: "0.875rem", color: "var(--color-steel)", lineHeight: 1.65 }}>{desc}</p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>

          <Reveal style={{ marginTop: "2.5rem" }}>
            <motion.a href="/serviss" className="btn btn-outline-dark" whileTap={{ transform: "scale(0.97)" }} transition={{ duration: 0.16, ease: [0.23, 1, 0.32, 1] }}>
              Servisa detaļas
            </motion.a>
          </Reveal>
        </div>
      </section>

      {/* ── CTA BAND ─────────────────────────────────────────────────── */}
      <section data-section="cta" className="noise" style={{ background: "var(--color-signal)", padding: "5rem 0" }}>
        <div className="container">
          <Reveal style={{ display: "flex", flexWrap: "wrap", gap: "2rem", alignItems: "center", justifyContent: "space-between" }}>
            <div>
              <h2 style={{ fontSize: "var(--fs-h2)", fontWeight: 700, color: "var(--color-white)", letterSpacing: "-0.02em", marginBottom: "0.75rem" }}>Gatavi sākt sadarbību?</h2>
              <p style={{ fontSize: "1rem", color: "rgba(255,255,255,0.8)", maxWidth: "44ch" }}>Aprakstiet savu vajadzību un mēs sagatavosim individuālu piedāvājumu 24 stundu laikā.</p>
            </div>
            <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
              <motion.a href="/kontakti" whileTap={{ transform: "scale(0.97)" }} transition={{ duration: 0.16 }} style={{ display: "inline-flex", alignItems: "center", padding: "0.75rem 1.75rem", background: "var(--color-white)", color: "var(--color-signal)", fontSize: "0.8125rem", fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", textDecoration: "none" }}>
                Sūtīt pieprasījumu
              </motion.a>
              <a href="tel:+37100000000" style={{ display: "inline-flex", alignItems: "center", padding: "0.75rem 1.75rem", background: "transparent", color: "var(--color-white)", fontSize: "0.8125rem", fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", textDecoration: "none", border: "1.5px solid rgba(255,255,255,0.5)" }}>
                Zvanīt tagad
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
