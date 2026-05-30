"use client";

import Link from "next/link";
import { Reveal, Stagger, StaggerItem, CountUp } from "@/components/motion";

const STATS = [
  { value: 20, suffix: "+", label: "Gadi nozarē" },
  { value: 200, suffix: "+", label: "Projekti pabeigti" },
  { value: 3, suffix: "", label: "Baltijas valstis" },
  { value: 48, suffix: "h", label: "Servisa SLA" },
];

const CAPABILITIES = [
  {
    code: "01",
    title: "Iekārtu piegāde",
    desc: "Sadarbība ar vadošajiem Eiropas ražotājiem — tieša piegāde uz ražošanas objektu ar muitas dokumentāciju.",
  },
  {
    code: "02",
    title: "Uzstādīšana un integrācija",
    desc: "Mehāniskā montāža, elektroinstalācija un integrācija esošajā ražošanas līnijā ar pilnu dokumentāciju.",
  },
  {
    code: "03",
    title: "PLC un automatizācija",
    desc: "Programmēšana, konfigurācija un SCADA vizualizācija pārtikas rūpniecības procesiem.",
  },
  {
    code: "04",
    title: "Serviss un apkope",
    desc: "Plānota preventīvā apkope un ātrreakcijas remontdarbi ar 48 stundu SLA visā Baltijā.",
  },
  {
    code: "05",
    title: "Rezerves daļas",
    desc: "Oriģinālās rezerves daļas un analogu detaļas ar garantētu piegādi 24–72 stundu laikā.",
  },
  {
    code: "06",
    title: "Konsultācijas un projekts",
    desc: "Ražošanas līniju projektēšana no tehniskā uzdevuma līdz nodošanai ekspluatācijā.",
  },
];

const VALUES = [
  { title: "Precizitāte", desc: "Katrs uzstādīšanas solis dokumentēts. Katrs remontdarbs apstiprināts ar klientu." },
  { title: "Ātrums", desc: "48h servisa SLA visu Baltijā — jo ražošanas apstāšanās maksā naudu." },
  { title: "Godīgums", desc: "Piedāvājam to, kas nepieciešams. Nevis to, kas ir dārgāk." },
  { title: "Vietējā zināšana", desc: "Vairāk nekā 20 gadu pieredze Latvijas pārtikas rūpniecībā." },
];

export default function ParUznemumuPage() {
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
              Par uzņēmumu
            </p>
            <h1
              style={{
                fontSize: "clamp(2.5rem, 5vw, 4rem)",
                fontWeight: 800,
                color: "var(--color-white)",
                letterSpacing: "-0.03em",
                lineHeight: 1.05,
                maxWidth: "18ch",
                marginBottom: "1.5rem",
              }}
            >
              Ražošanas partneri, nevis tikai piegādātāji
            </h1>
            <p
              style={{
                fontSize: "1.125rem",
                color: "oklch(70% 0.01 255)",
                maxWidth: "52ch",
                lineHeight: 1.65,
              }}
            >
              SIA Primet dibināts ar mērķi nodrošināt Latvijas pārtikas rūpniecību ar iekārtām un
              servisu, ko mūsu klienti var paļāvīgi izmantot gadiem. Ne tikai iegādāties.
            </p>
          </Reveal>

          {/* Stats */}
          <Stagger
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
              gap: "0",
              marginTop: "4rem",
              borderTop: "1px solid rgba(255,255,255,0.09)",
            }}
          >
            {STATS.map(({ value, suffix, label }) => (
              <StaggerItem key={label}>
                <div
                  style={{
                    padding: "2rem 1.5rem",
                    borderRight: "1px solid rgba(255,255,255,0.08)",
                  }}
                >
                  <div
                    style={{
                      fontSize: "clamp(2rem, 4vw, 3rem)",
                      fontWeight: 800,
                      color: "var(--color-white)",
                      letterSpacing: "-0.03em",
                      lineHeight: 1,
                    }}
                  >
                    <CountUp value={value} suffix={suffix} />
                  </div>
                  <div
                    style={{
                      fontSize: "0.75rem",
                      color: "oklch(44% 0.01 255)",
                      letterSpacing: "0.06em",
                      textTransform: "uppercase",
                      marginTop: "0.5rem",
                    }}
                  >
                    {label}
                  </div>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* ── STORY ─────────────────────────────────────────────────────── */}
      <section data-section="story" className="section-pad" style={{ background: "var(--color-stone)" }}>
        <div className="container">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: "clamp(2.5rem, 6vw, 5rem)",
              alignItems: "start",
            }}
          >
            <Reveal>
              <p className="label" style={{ marginBottom: "1rem" }}>
                Mūsu stāsts
              </p>
              <h2
                style={{
                  fontSize: "var(--fs-h2)",
                  fontWeight: 700,
                  letterSpacing: "-0.02em",
                  lineHeight: 1.15,
                  marginBottom: "1.5rem",
                }}
              >
                Dibināts Rīgā. Strādā Baltijā.
              </h2>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "1rem",
                  color: "var(--color-steel)",
                  fontSize: "1rem",
                  lineHeight: 1.7,
                }}
              >
                <p>
                  Primet sāka darbību kā neliels pārtikas iekārtu servisa uzņēmums Rīgā. Gadu
                  gaitā mēs paplašinājāmies — pievienojām piegādes pakalpojumus, uzbūvējām
                  tehnisko komandu un izveidojām servisa tīklu visā Latvijā un kaimiņvalstīs.
                </p>
                <p>
                  Šodien mēs apkalpojam ražotājus pārtikas, piena, gaļas un dzērienu nozarēs.
                  Mūsu filozofija vienmēr ir bijusi vienkārša: iekārtas jāstrādā, un ja tās
                  nestrādā, mums jābūt klāt ātrāk nekā jebkuram citam.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.15}>
              {/* Industrial schematic placeholder — on-brand, zero-emoji */}
              <div
                style={{
                  aspectRatio: "4/3",
                  background: "var(--color-navy)",
                  position: "relative",
                  overflow: "hidden",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {/* Grid bg */}
                <div
                  aria-hidden="true"
                  style={{
                    position: "absolute",
                    inset: 0,
                    backgroundImage: [
                      "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px)",
                      "linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
                    ].join(","),
                    backgroundSize: "32px 32px",
                  }}
                />
                {/* Signal accent left rail */}
                <div aria-hidden="true" style={{ position: "absolute", top: 0, left: 0, width: "3px", height: "100%", background: "var(--color-signal)" }} />
                {/* Schematic SVG */}
                <svg
                  aria-hidden="true"
                  width="220"
                  height="160"
                  viewBox="0 0 220 160"
                  fill="none"
                  style={{ position: "relative", zIndex: 1, opacity: 0.7 }}
                >
                  {/* Machine body */}
                  <rect x="20" y="40" width="70" height="80" stroke="rgba(255,255,255,0.2)" strokeWidth="1" fill="none" />
                  <rect x="28" y="52" width="54" height="16" fill="rgba(204,51,0,0.25)" stroke="rgba(204,51,0,0.5)" strokeWidth="1" />
                  <rect x="28" y="72" width="54" height="40" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
                  {/* Hopper */}
                  <path d="M35 40 L28 24 L62 24 L55 40" stroke="rgba(255,255,255,0.15)" strokeWidth="1" fill="rgba(255,255,255,0.03)" />
                  {/* Output pipe */}
                  <path d="M90 100 L130 100 L130 120 L150 120" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" fill="none" />
                  {/* Conveyor */}
                  <rect x="130" y="118" width="70" height="6" stroke="rgba(255,255,255,0.12)" strokeWidth="1" fill="rgba(255,255,255,0.04)" />
                  <line x1="140" y1="118" x2="140" y2="124" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
                  <line x1="155" y1="118" x2="155" y2="124" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
                  <line x1="170" y1="118" x2="170" y2="124" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
                  <line x1="185" y1="118" x2="185" y2="124" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
                  {/* Dimension lines */}
                  <line x1="20" y1="132" x2="90" y2="132" stroke="rgba(255,255,255,0.07)" strokeWidth="0.5" />
                  <line x1="20" y1="129" x2="20" y2="135" stroke="rgba(255,255,255,0.07)" strokeWidth="0.5" />
                  <line x1="90" y1="129" x2="90" y2="135" stroke="rgba(255,255,255,0.07)" strokeWidth="0.5" />
                  {/* Spec labels */}
                  <text x="55" y="148" textAnchor="middle" fontSize="7" fill="rgba(255,255,255,0.2)" fontFamily="monospace" letterSpacing="0.5">200 KG/H</text>
                  <text x="165" y="112" textAnchor="middle" fontSize="7" fill="rgba(255,255,255,0.2)" fontFamily="monospace" letterSpacing="0.5">WF-200</text>
                </svg>
                {/* Label */}
                <div style={{ position: "absolute", bottom: "1rem", right: "1rem", fontSize: "0.625rem", fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,255,255,0.2)" }}>
                  Uzņēmuma foto
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── FOUNDER QUOTE ────────────────────────────────────────────── */}
      <section
        data-section="quote"
        style={{ background: "var(--color-ink)", padding: "5rem 0" }}
      >
        <div className="container">
          <Reveal>
            <figure style={{ maxWidth: "64ch" }}>
              <div
                style={{
                  width: "40px",
                  height: "3px",
                  background: "var(--color-signal)",
                  marginBottom: "2rem",
                }}
              />
              <blockquote
                style={{
                  fontSize: "clamp(1.25rem, 2.5vw, 1.75rem)",
                  fontWeight: 600,
                  color: "var(--color-white)",
                  lineHeight: 1.45,
                  letterSpacing: "-0.015em",
                  marginBottom: "2rem",
                }}
              >
                &ldquo;Mūsu klienti neiegādājas iekārtas — viņi iegādājas darbspēju. Katrs mūsu
                servisa vizītes mērķis ir nodrošināt, ka ražošana turpinās bez pārtraukuma.&rdquo;
              </blockquote>
              <figcaption style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                <div
                  style={{
                    width: "40px",
                    height: "40px",
                    background: "var(--color-signal)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "1rem",
                    fontWeight: 700,
                    color: "var(--color-white)",
                    flexShrink: 0,
                  }}
                >
                  P
                </div>
                <div>
                  <div style={{ fontSize: "0.875rem", fontWeight: 600, color: "var(--color-white)" }}>
                    Primet dibinātājs
                  </div>
                  <div style={{ fontSize: "0.75rem", color: "oklch(40% 0.01 255)", marginTop: "2px" }}>
                    SIA Primet, Rīga
                  </div>
                </div>
              </figcaption>
            </figure>
          </Reveal>
        </div>
      </section>

      {/* ── CAPABILITIES ─────────────────────────────────────────────── */}
      <section
        data-section="capabilities"
        className="section-pad"
        style={{ background: "var(--color-stone)" }}
      >
        <div className="container">
          <Reveal style={{ marginBottom: "3rem" }}>
            <p className="label" style={{ marginBottom: "0.75rem" }}>
              Ko mēs darām
            </p>
            <h2
              style={{
                fontSize: "var(--fs-h2)",
                fontWeight: 700,
                letterSpacing: "-0.02em",
              }}
            >
              Pilns pakalpojumu loks
            </h2>
          </Reveal>

          <Stagger
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
              gap: "1px",
              background: "var(--color-border)",
            }}
          >
            {CAPABILITIES.map((c) => (
              <StaggerItem key={c.code}>
                <div
                  style={{
                    background: "var(--color-stone)",
                    padding: "2rem",
                    height: "100%",
                  }}
                >
                  <span
                    style={{
                      fontSize: "0.75rem",
                      fontWeight: 700,
                      letterSpacing: "0.1em",
                      color: "var(--color-signal)",
                      display: "block",
                      marginBottom: "0.75rem",
                    }}
                  >
                    {c.code}
                  </span>
                  <h3
                    style={{
                      fontSize: "var(--fs-h4)",
                      fontWeight: 700,
                      letterSpacing: "-0.01em",
                      marginBottom: "0.75rem",
                    }}
                  >
                    {c.title}
                  </h3>
                  <p
                    style={{
                      fontSize: "0.875rem",
                      color: "var(--color-steel)",
                      lineHeight: 1.65,
                    }}
                  >
                    {c.desc}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* ── VALUES ───────────────────────────────────────────────────── */}
      <section
        data-section="values"
        className="section-pad"
        style={{ background: "var(--color-ink)" }}
      >
        <div className="container">
          <Reveal style={{ marginBottom: "3rem" }}>
            <p
              className="label"
              style={{ marginBottom: "0.75rem", color: "oklch(50% 0.15 28)" }}
            >
              Vērtības
            </p>
            <h2
              style={{
                fontSize: "var(--fs-h2)",
                fontWeight: 700,
                letterSpacing: "-0.02em",
                color: "var(--color-white)",
              }}
            >
              Ar ko mēs atšķiramies
            </h2>
          </Reveal>

          <Stagger
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
              gap: "2px",
              background: "rgba(255,255,255,0.06)",
            }}
          >
            {VALUES.map(({ title, desc }) => (
              <StaggerItem key={title}>
                <div
                  style={{
                    background: "var(--color-ink)",
                    padding: "2.5rem 2rem",
                    borderTop: "3px solid var(--color-signal)",
                  }}
                >
                  <h3
                    style={{
                      fontSize: "var(--fs-h4)",
                      fontWeight: 700,
                      color: "var(--color-white)",
                      letterSpacing: "-0.01em",
                      marginBottom: "0.75rem",
                    }}
                  >
                    {title}
                  </h3>
                  <p
                    style={{
                      fontSize: "0.875rem",
                      color: "rgba(255,255,255,0.55)",
                      lineHeight: 1.65,
                    }}
                  >
                    {desc}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────────── */}
      <section
        data-section="cta"
        className="section-pad"
        style={{ background: "var(--color-warm)", borderTop: "1px solid var(--color-border)" }}
      >
        <div className="container">
          <Reveal
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "2rem",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div>
              <h2
                style={{
                  fontSize: "var(--fs-h2)",
                  fontWeight: 700,
                  letterSpacing: "-0.02em",
                  marginBottom: "0.75rem",
                }}
              >
                Runājiet ar mūsu komandu
              </h2>
              <p style={{ color: "var(--color-steel)", maxWidth: "44ch" }}>
                Mēs labprāt apspriežam jūsu ražošanas izaicinājumus un piedāvājam risinājumu.
              </p>
            </div>
            <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
              <Link href="/kontakti" className="btn btn-primary">
                Sazināties
              </Link>
              <Link href="/serviss" className="btn btn-outline-dark">
                Servisa info
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
