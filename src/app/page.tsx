"use client";

import Link from "next/link";
import { HeroText, Reveal, Stagger, StaggerItem, CountUp, Marquee, AnimatedBar, motion } from "@/components/motion";

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
  { icon: "🔧", title: "Uzstādīšana", desc: "Iekārtu piegāde, montāža un nodošana ekspluatācijā ar pilnu dokumentāciju." },
  { icon: "⚙️", title: "Apkope un remontdarbi", desc: "Plānota apkope, avārijas remontdarbi un rezerves daļu piegāde 48 stundu laikā." },
  { icon: "📋", title: "Konsultācijas", desc: "Ražošanas līniju projektēšana un modernizācija ar pilnu tehnisko atbalstu." },
];

export default function HomePage() {
  return (
    <>
      {/* ── HERO ─────────────────────────────────────────────────────── */}
      <section
        data-section="hero"
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
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: [
              "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px)",
              "linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
            ].join(","),
            backgroundSize: "80px 80px",
            pointerEvents: "none",
          }}
        />

        {/* Signal accent line — scaleX is a transform, hardware-accelerated ✓ */}
        <motion.div
          aria-hidden="true"
          initial={{ transform: "scaleX(0)" }}
          animate={{ transform: "scaleX(1)" }}
          transition={{ duration: 1.2, ease: [0.23, 1, 0.32, 1], delay: 0.8 }}
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "3px",
            background: "var(--color-signal)",
            transformOrigin: "left",
          }}
        />

        <div className="container" style={{ position: "relative" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "clamp(300px, 55%, 640px) 1fr",
              gap: "clamp(2.5rem, 6vw, 5rem)",
              alignItems: "center",
            }}
          >
            {/* Left copy */}
            <div>
              {/* Overline — full transform string, hardware-accelerated ✓ */}
              <motion.div
                initial={{ opacity: 0, transform: "translateX(-12px)" }}
                animate={{ opacity: 1, transform: "translateX(0px)" }}
                transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1], delay: 0.1 }}
                style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "1.5rem" }}
              >
                <span style={{ display: "block", width: "24px", height: "2px", background: "var(--color-signal)" }} />
                <span style={{ fontSize: "0.6875rem", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--color-signal)" }}>
                  Pārtikas rūpniecības iekārtas
                </span>
              </motion.div>

              {/* Headline — HeroText uses transform string internally ✓ */}
              <HeroText
                lines={["Ražošanas iekārtas,", "kas darbojas."]}
                style={{
                  fontSize: "clamp(2.5rem, 5vw, 4rem)",
                  fontWeight: 800,
                  letterSpacing: "-0.03em",
                  lineHeight: 1.05,
                  color: "var(--color-white)",
                  marginBottom: "1.5rem",
                }}
              />

              {/* Sub — full transform ✓ */}
              <motion.p
                initial={{ opacity: 0, transform: "translateY(12px)" }}
                animate={{ opacity: 1, transform: "translateY(0px)" }}
                transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1], delay: 0.5 }}
                style={{ fontSize: "1.125rem", color: "oklch(72% 0.01 255)", lineHeight: 1.6, maxWidth: "44ch", marginBottom: "2rem" }}
              >
                SIA Primet — piegāde, uzstādīšana un serviss pārtikas pārstrādes uzņēmumiem Latvijā un visā Baltijā.
              </motion.p>

              {/* Spec pills — full transform ✓ */}
              <motion.div
                initial={{ opacity: 0, transform: "translateY(8px)" }}
                animate={{ opacity: 1, transform: "translateY(0px)" }}
                transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1], delay: 0.6 }}
                style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginBottom: "2rem" }}
              >
                {SPECS.map((s) => (
                  <span key={s} style={{ fontSize: "0.75rem", fontWeight: 500, color: "oklch(60% 0.01 255)", padding: "5px 12px", border: "1px solid rgba(255,255,255,0.11)", letterSpacing: "0.03em" }}>
                    {s}
                  </span>
                ))}
              </motion.div>

              {/* CTAs — full transform ✓ */}
              <motion.div
                initial={{ opacity: 0, transform: "translateY(8px)" }}
                animate={{ opacity: 1, transform: "translateY(0px)" }}
                transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1], delay: 0.7 }}
                style={{ display: "flex", alignItems: "center", gap: "1rem", flexWrap: "wrap", marginBottom: "2.5rem" }}
              >
                {/* whileTap on the <a> directly — not on a wrapper div ✓ */}
                <motion.a
                  href="/kontakti"
                  className="btn btn-primary"
                  whileTap={{ transform: "scale(0.97)" }}
                  transition={{ duration: 0.16, ease: [0.23, 1, 0.32, 1] }}
                >
                  Pieprasīt piedāvājumu
                </motion.a>
                <Link href="/risinajumi" style={{ fontSize: "0.875rem", fontWeight: 600, color: "var(--color-white)", textDecoration: "none", letterSpacing: "0.02em", borderBottom: "1px solid rgba(255,255,255,0.3)", paddingBottom: "2px" }}>
                  Skatīt risinājumus →
                </Link>
              </motion.div>

              {/* Trust strip */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.9 }}
                style={{ paddingTop: "2rem", borderTop: "1px solid rgba(255,255,255,0.09)", display: "flex", gap: "clamp(1.5rem, 5vw, 3.5rem)", flexWrap: "wrap" }}
              >
                {STATS.map(({ value, suffix, label }) => (
                  <div key={label} style={{ display: "flex", flexDirection: "column", gap: "3px" }}>
                    <span style={{ fontSize: "0.625rem", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "oklch(38% 0.02 255)" }}>{label}</span>
                    <span style={{ fontSize: "0.875rem", fontWeight: 500, color: "oklch(76% 0.01 255)" }}>
                      <CountUp value={value} suffix={suffix} />
                    </span>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Right panel — animated industrial spec display */}
            <motion.div
              initial={{ opacity: 0, transform: "translateY(20px)" }}
              animate={{ opacity: 1, transform: "translateY(0px)" }}
              transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1], delay: 0.35 }}
              style={{ display: "flex", flexDirection: "column", gap: "0" }}
              className="hidden md:flex"
            >
              {/* HMI header */}
              <div style={{ background: "oklch(17% 0.05 255)", border: "1px solid rgba(255,255,255,0.07)", borderBottom: "none", padding: "0.875rem 1.25rem", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <span className="live-dot" aria-hidden="true" />
                  <span style={{ fontSize: "0.6875rem", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "oklch(62% 0.19 145)" }}>Aktīvs</span>
                </div>
                <span style={{ fontSize: "0.625rem", fontWeight: 500, letterSpacing: "0.12em", textTransform: "uppercase", color: "oklch(38% 0.01 255)" }}>WF-200 Pro · Gaļas līnija</span>
              </div>

              {/* Spec bars */}
              <div style={{ background: "oklch(15% 0.04 255)", border: "1px solid rgba(255,255,255,0.07)", padding: "1.5rem 1.25rem", display: "flex", flexDirection: "column", gap: "1.125rem" }}>
                {[
                  { label: "Kapacitāte",   value: 0.84, display: "200 kg/h" },
                  { label: "Efektivitāte", value: 0.91, display: "91%"      },
                  { label: "Dīkstāves",    value: 0.06, display: "< 2%",   color: "oklch(62% 0.19 145)" },
                ].map(({ label, value, display, color }, i) => (
                  <div key={label} style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                      <span style={{ fontSize: "0.6875rem", fontWeight: 500, letterSpacing: "0.06em", textTransform: "uppercase", color: "oklch(46% 0.01 255)" }}>{label}</span>
                      <span style={{ fontSize: "0.8125rem", fontWeight: 700, fontVariantNumeric: "tabular-nums", color: "var(--color-white)", letterSpacing: "-0.01em" }}>{display}</span>
                    </div>
                    <AnimatedBar value={value} delay={0.5 + i * 0.12} color={color} />
                  </div>
                ))}
              </div>

              {/* Cert badge strip */}
              <div style={{ background: "oklch(13% 0.04 255)", border: "1px solid rgba(255,255,255,0.07)", borderTop: "none", padding: "0.875rem 1.25rem", display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "0.5rem" }}>
                {["ISO 9001", "CE", "HACCP", "IP66"].map((cert) => (
                  <div key={cert} style={{ textAlign: "center", padding: "0.5rem 0.25rem", border: "1px solid rgba(255,255,255,0.07)" }}>
                    <span style={{ fontSize: "0.625rem", fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", color: "oklch(55% 0.01 255)" }}>{cert}</span>
                  </div>
                ))}
              </div>

              {/* Grid of tech specs */}
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
      <section data-section="proof" style={{ background: "var(--color-ink)", padding: "3rem 0" }}>
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

      {/* ── SOLUTIONS ────────────────────────────────────────────────── */}
      <section data-section="solutions" className="section-pad" style={{ background: "var(--color-stone)" }}>
        <div className="container">
          <Reveal style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: "1.5rem", marginBottom: "3rem", paddingBottom: "1.5rem", borderBottom: "1px solid var(--color-border)" }}>
            <div>
              <p className="label" style={{ marginBottom: "0.75rem" }}>Risinājumi</p>
              <h2 style={{ fontSize: "var(--fs-h2)", fontWeight: 700, letterSpacing: "-0.02em", maxWidth: "22ch" }}>
                Pārtikas rūpniecības iekārtas katram procesam
              </h2>
            </div>
            <Link href="/risinajumi" style={{ fontSize: "0.8125rem", fontWeight: 600, color: "var(--color-signal)", textDecoration: "none", letterSpacing: "0.04em", whiteSpace: "nowrap" }}>
              Visas iekārtas →
            </Link>
          </Reveal>

          {/* CSS hover via card-hover class — not Framer Motion ✓ */}
          <Stagger style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "1px", background: "var(--color-border)" }}>
            {SOLUTIONS.map((s) => (
              <StaggerItem key={s.code}>
                <div
                  className="card-hover"
                  style={{ background: "var(--color-stone)", padding: "2rem", display: "flex", flexDirection: "column", gap: "1rem", height: "100%", border: "1px solid transparent", cursor: "pointer" }}
                >
                  <span style={{ fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.1em", color: "var(--color-signal)" }}>{s.code}</span>
                  <h3 style={{ fontSize: "var(--fs-h4)", fontWeight: 700, letterSpacing: "-0.01em" }}>{s.title}</h3>
                  <p style={{ fontSize: "var(--fs-small)", color: "var(--color-steel)", lineHeight: 1.6, flex: 1 }}>{s.desc}</p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                    {s.tags.map((t) => (
                      <span key={t} style={{ fontSize: "0.7rem", fontWeight: 500, padding: "3px 8px", background: "var(--color-warm)", color: "var(--color-steel)", letterSpacing: "0.03em" }}>{t}</span>
                    ))}
                  </div>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* ── ABOUT TEASER ─────────────────────────────────────────────── */}
      <section data-section="about" className="section-pad" style={{ background: "var(--color-warm)" }}>
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "clamp(2.5rem, 6vw, 5rem)", alignItems: "center" }}>
            <Reveal>
              <p className="label" style={{ marginBottom: "1rem" }}>Par mums</p>
              <h2 style={{ fontSize: "var(--fs-h2)", fontWeight: 700, letterSpacing: "-0.02em", lineHeight: 1.15, marginBottom: "1.5rem" }}>Vairāk nekā 20 gadu pieredze nozarē</h2>
              <p style={{ fontSize: "1rem", color: "var(--color-steel)", lineHeight: 1.7, maxWidth: "44ch", marginBottom: "2rem" }}>
                SIA Primet nodrošina Latvijas un Baltijas pārtikas rūpniecību ar uzticamām iekārtām un profesionālu servisu. Mēs strādājam ar vadošajiem Eiropas ražotājiem un nodrošinām pilnu piegādes ķēdi.
              </p>
              <motion.a
                href="/par-uznemumu"
                className="btn btn-outline-dark"
                whileTap={{ transform: "scale(0.97)" }}
                transition={{ duration: 0.16, ease: [0.23, 1, 0.32, 1] }}
              >
                Uzzināt vairāk
              </motion.a>
            </Reveal>

            <Reveal delay={0.15}>
              <figure style={{ background: "var(--color-navy)", padding: "2.5rem", position: "relative" }}>
                <div style={{ position: "absolute", top: 0, left: "2.5rem", right: "2.5rem", height: "3px", background: "var(--color-signal)" }} />
                <blockquote style={{ fontSize: "1.125rem", fontWeight: 500, color: "var(--color-white)", lineHeight: 1.6, letterSpacing: "-0.01em", marginBottom: "1.5rem" }}>
                  &ldquo;Mūsu klienti neiegādājas iekārtas — viņi iegādājas darbspēju. Katrs mūsu servisa vizītes mērķis ir nodrošināt, ka ražošana turpinās bez pārtraukuma.&rdquo;
                </blockquote>
                <figcaption style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                  <div style={{ width: "36px", height: "36px", background: "var(--color-signal)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.875rem", fontWeight: 700, color: "var(--color-white)", flexShrink: 0 }}>P</div>
                  <div>
                    <div style={{ fontSize: "0.8125rem", fontWeight: 600, color: "var(--color-white)", letterSpacing: "0.02em" }}>Primet dibinātājs</div>
                    <div style={{ fontSize: "0.6875rem", color: "rgba(255,255,255,0.4)", letterSpacing: "0.06em" }}>Rīga, Latvija</div>
                  </div>
                </figcaption>
              </figure>
            </Reveal>
          </div>
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
            {SERVICES.map(({ icon, title, desc }) => (
              <StaggerItem key={title}>
                <div className="service-card" style={{ background: "var(--color-stone)", padding: "2.5rem 2rem" }}>
                  <span style={{ fontSize: "1.75rem", marginBottom: "1.25rem", display: "block" }}>{icon}</span>
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
      <section data-section="cta" style={{ background: "var(--color-signal)", padding: "5rem 0" }}>
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
