"use client";

import Link from "next/link";
import { Reveal, Stagger, StaggerItem, AnimatedBar, motion, useInView } from "@/components/motion";
import { useRef } from "react";

const SERVICES = [
  {
    code: "S1",
    title: "Preventīvā apkope",
    desc: "Plānveidīga iekārtu apskate, eļļošana, nolietoto daļu nomaiņa un kalibrācija pirms bojājums notiek.",
    features: [
      "Gada apkopes plāns",
      "Eļļošanas un filtrēšanas protokols",
      "Nolietojuma novērtēšana",
      "Detalizēts apkopes žurnāls",
    ],
    highlight: false,
  },
  {
    code: "S2",
    title: "Ātrreakcijas serviss",
    desc: "Avārijas remontdarbi ar garantētu 48 stundu reakcijas laiku visā Latvijā un pārējā Baltijā.",
    features: [
      "48h SLA visā Latvijā",
      "72h SLA Igaunijā un Lietuvā",
      "Telefonkonsultācija 24/7",
      "Oriģinālās rezerves daļas",
    ],
    highlight: true,
  },
  {
    code: "S3",
    title: "Modernizācija",
    desc: "Novecojušo iekārtu atjaunināšana — jaunas vadības sistēmas, servomotori un sensoru integrācija.",
    features: [
      "PLC un HMI jauninājumi",
      "Energoefektivitātes uzlabojumi",
      "Higiēnas standartu atjaunināšana",
      "Pilna dokumentācija",
    ],
    highlight: false,
  },
];

const PROCESS = [
  { step: "01", title: "Pieteikums", desc: "Zvaniet vai aizpildiet formu. Mēs sazināmies 2 stundu laikā darba dienās." },
  { step: "02", title: "Diagnostika", desc: "Tehniskā apskate uz vietas vai attālināta diagnostika ar jūsu komandas atbalstu." },
  { step: "03", title: "Piedāvājums", desc: "Detalizēts darbu un materiālu saraksts ar fiksētu cenu pirms darbu uzsākšanas." },
  { step: "04", title: "Izpilde", desc: "Sertificēti tehniķi veic darbus ar minimālu ietekmi uz ražošanas procesu." },
  { step: "05", title: "Pieņemšana", desc: "Darbu nodošana ar pilnu dokumentāciju, garantijas apliecinājumu un apkopes protokolu." },
];

const COVERAGE = [
  { region: "Rīga un Rīgas rajons", sla: "24h", phone: true },
  { region: "Vidzeme", sla: "36h", phone: true },
  { region: "Kurzeme", sla: "48h", phone: true },
  { region: "Zemgale", sla: "36h", phone: true },
  { region: "Latgale", sla: "48h", phone: true },
  { region: "Igaunija", sla: "72h", phone: false },
  { region: "Lietuva", sla: "72h", phone: false },
];

const PLANS = [
  {
    name: "Pamata",
    price: "Pēc pieprasījuma",
    desc: "Vienreizēji remontdarbi bez abonementlīguma.",
    features: ["Ātrreakcijas serviss 48h", "Oriģinālās rezerves daļas", "Darbu garantija 6 mēneši"],
    cta: "Pieteikties",
    featured: false,
  },
  {
    name: "Apkopes plāns",
    price: "No €X/mēnesī",
    desc: "Plānveidīga apkope + prioritāra reakcija avārijās.",
    features: [
      "Preventīvā apkope 2× gadā",
      "Prioritāra reakcija 24h",
      "10% atlaide rezerves daļām",
      "Darbu garantija 12 mēneši",
      "Apkopes žurnāls",
    ],
    cta: "Pieteikties",
    featured: true,
  },
  {
    name: "Pilnais atbalsts",
    price: "Individuāla cena",
    desc: "Neierobežots serviss ar fiksētu mēneša maksājumu.",
    features: [
      "Neierobežoti servisa apmeklējumi",
      "Reakcija 12h Rīgā",
      "Rezerves daļas iekļautas",
      "Modernizācijas konsultācijas",
      "Ikgadēja audita atskaite",
    ],
    cta: "Sazināties",
    featured: false,
  },
];

// ── Animated process timeline ─────────────────────────────────────────────
// Connector line uses scaleX(0→1) — hardware-accelerated transform ✓
function ProcessSection() {
  const lineRef = useRef<HTMLDivElement>(null);
  const inView = useInView(lineRef, { once: true, margin: "-60px" } as Parameters<typeof useInView>[1]);

  return (
    <section
      data-section="process"
      className="section-pad"
      style={{ background: "var(--color-warm)", borderTop: "1px solid var(--color-border)" }}
    >
      <div className="container">
        <Reveal style={{ marginBottom: "3.5rem" }}>
          <p className="label" style={{ marginBottom: "0.75rem" }}>Kā mēs strādājam</p>
          <h2 style={{ fontSize: "var(--fs-h2)", fontWeight: 700, letterSpacing: "-0.02em" }}>
            No pieteikuma līdz nododušanai
          </h2>
        </Reveal>

        {/* Timeline track — connector line + step nodes */}
        <div style={{ position: "relative", marginBottom: "0" }}>
          {/* Horizontal connector — ref here for inView ✓ */}
          <div
            ref={lineRef}
            style={{
              position: "absolute",
              top: "20px",
              left: "calc(10% + 1rem)",
              right: "calc(10% + 1rem)",
              height: "1px",
              background: "var(--color-border)",
              overflow: "hidden",
            }}
            aria-hidden="true"
          >
            <motion.div
              style={{
                height: "100%",
                background: "var(--color-signal)",
                transformOrigin: "left",
              }}
              initial={{ transform: "scaleX(0)" }}
              animate={inView ? { transform: "scaleX(1)" } : {}}
              transition={{ duration: 1.4, ease: [0.23, 1, 0.32, 1], delay: 0.2 }}
            />
          </div>

          <Stagger style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: "0" }}>
            {PROCESS.map(({ step, title, desc }, i) => (
              <StaggerItem key={step}>
                <div style={{ padding: "0 1rem", display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
                  {/* Step bubble */}
                  <div
                    style={{
                      width: "40px",
                      height: "40px",
                      background: i === 0 ? "var(--color-signal)" : "var(--color-stone)",
                      border: `1px solid ${i === 0 ? "var(--color-signal)" : "var(--color-border)"}`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                      marginBottom: "1.25rem",
                      position: "relative",
                      zIndex: 1,
                    }}
                  >
                    <span style={{ fontSize: "0.6875rem", fontWeight: 700, color: i === 0 ? "var(--color-white)" : "var(--color-signal)", letterSpacing: "0.04em" }}>
                      {step}
                    </span>
                  </div>

                  <h3 style={{ fontSize: "0.8125rem", fontWeight: 700, letterSpacing: "0.04em", textTransform: "uppercase", marginBottom: "0.5rem" }}>
                    {title}
                  </h3>
                  <p style={{ fontSize: "0.8125rem", color: "var(--color-steel)", lineHeight: 1.6 }}>
                    {desc}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>

        {/* SLA bars */}
        <Reveal style={{ marginTop: "3rem", paddingTop: "2.5rem", borderTop: "1px solid var(--color-border)" }}>
          <p style={{ fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--color-steel)", marginBottom: "1.25rem" }}>
            Garantētais reakcijas laiks
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.875rem" }}>
            {[
              { label: "Rīga un Rīgas rajons", sla: "24h", value: 1 },
              { label: "Vidzeme / Zemgale",    sla: "36h", value: 0.67 },
              { label: "Kurzeme / Latgale",    sla: "48h", value: 0.5 },
              { label: "Igaunija / Lietuva",   sla: "72h", value: 0.33 },
            ].map(({ label, sla, value }, i) => (
              <div key={label} style={{ display: "grid", gridTemplateColumns: "14rem 1fr 3rem", gap: "1rem", alignItems: "center" }}>
                <span style={{ fontSize: "0.8125rem", color: "var(--color-ink)" }}>{label}</span>
                <AnimatedBar value={value} delay={0.1 * i} />
                <span style={{ fontSize: "0.8125rem", fontWeight: 700, color: "var(--color-signal)", textAlign: "right", fontVariantNumeric: "tabular-nums" }}>{sla}</span>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export default function ServisaPage() {
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
              Serviss
            </p>
            <h1
              style={{
                fontSize: "clamp(2.5rem, 5vw, 4rem)",
                fontWeight: 800,
                color: "var(--color-white)",
                letterSpacing: "-0.03em",
                lineHeight: 1.05,
                maxWidth: "20ch",
                marginBottom: "1.5rem",
              }}
            >
              Iekārtas strādā. Pat kad nav plānots.
            </h1>
            <p
              style={{
                fontSize: "1.125rem",
                color: "oklch(70% 0.01 255)",
                maxWidth: "52ch",
                lineHeight: 1.65,
                marginBottom: "2rem",
              }}
            >
              48 stundu reakcijas laiks avārijās. Preventīvā apkope, kas novērš problēmas pirms
              tās rodas. Servisa tīkls visā Latvijā un Baltijā.
            </p>
            <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
              <Link href="/kontakti" className="btn btn-primary">
                Pieteikt servisu
              </Link>
              <a
                href="tel:+37100000000"
                className="btn btn-outline"
              >
                +371 XX XXX XXX
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── SERVICE CARDS ────────────────────────────────────────────── */}
      <section
        data-section="service-types"
        className="section-pad"
        style={{ background: "var(--color-stone)" }}
      >
        <div className="container">
          <Reveal style={{ marginBottom: "3rem" }}>
            <p className="label" style={{ marginBottom: "0.75rem" }}>
              Pakalpojumi
            </p>
            <h2
              style={{
                fontSize: "var(--fs-h2)",
                fontWeight: 700,
                letterSpacing: "-0.02em",
              }}
            >
              Ko ietver mūsu serviss
            </h2>
          </Reveal>

          <Stagger
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "1px",
              background: "var(--color-border)",
            }}
          >
            {SERVICES.map((s) => (
              <StaggerItem key={s.code}>
                <div
                  style={{
                    background: s.highlight ? "var(--color-navy)" : "var(--color-stone)",
                    padding: "2.5rem 2rem",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    gap: "1.25rem",
                    borderTop: s.highlight ? "3px solid var(--color-signal)" : "3px solid transparent",
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
                    {s.code}
                  </span>
                  <h3
                    style={{
                      fontSize: "var(--fs-h4)",
                      fontWeight: 700,
                      letterSpacing: "-0.01em",
                      color: s.highlight ? "var(--color-white)" : "var(--color-ink)",
                    }}
                  >
                    {s.title}
                  </h3>
                  <p
                    style={{
                      fontSize: "0.875rem",
                      color: s.highlight ? "rgba(255,255,255,0.65)" : "var(--color-steel)",
                      lineHeight: 1.65,
                    }}
                  >
                    {s.desc}
                  </p>
                  <ul
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "0.5rem",
                      marginTop: "auto",
                    }}
                  >
                    {s.features.map((f) => (
                      <li
                        key={f}
                        style={{
                          display: "flex",
                          alignItems: "flex-start",
                          gap: "0.5rem",
                          fontSize: "0.8125rem",
                          color: s.highlight ? "rgba(255,255,255,0.8)" : "var(--color-ink)",
                        }}
                      >
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true" style={{ flexShrink: 0, marginTop: "2px" }}>
                          <polyline points="2,7 5.5,10.5 12,3.5" stroke="var(--color-signal)" strokeWidth="1.5" strokeLinecap="square" strokeLinejoin="miter"/>
                        </svg>
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* ── PROCESS ──────────────────────────────────────────────────── */}
      <ProcessSection />

      {/* ── COVERAGE ─────────────────────────────────────────────────── */}
      <section
        data-section="coverage"
        className="section-pad"
        style={{ background: "var(--color-stone)", borderTop: "1px solid var(--color-border)" }}
      >
        <div className="container">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "clamp(2.5rem, 6vw, 5rem)",
              alignItems: "start",
            }}
          >
            <Reveal>
              <p className="label" style={{ marginBottom: "0.75rem" }}>
                Pārklājums
              </p>
              <h2
                style={{
                  fontSize: "var(--fs-h2)",
                  fontWeight: 700,
                  letterSpacing: "-0.02em",
                  marginBottom: "1.5rem",
                }}
              >
                Serviss visā Latvijā un Baltijā
              </h2>
              <p style={{ fontSize: "0.9375rem", color: "var(--color-steel)", lineHeight: 1.7 }}>
                Mūsu tehniķu komanda ir izvietota stratēģiski, lai nodrošinātu ātru reakcijas
                laiku jebkurā Latvijas reģionā. Kaimiņvalstīs strādājam caur sertificētiem
                partneruzņēmumiem.
              </p>
            </Reveal>

            <Reveal delay={0.1}>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ borderBottom: "2px solid var(--color-border)" }}>
                    <th
                      style={{
                        fontSize: "0.75rem",
                        fontWeight: 700,
                        letterSpacing: "0.08em",
                        textTransform: "uppercase",
                        color: "var(--color-steel)",
                        textAlign: "left",
                        padding: "0.5rem 0 0.75rem",
                      }}
                    >
                      Reģions
                    </th>
                    <th
                      style={{
                        fontSize: "0.75rem",
                        fontWeight: 700,
                        letterSpacing: "0.08em",
                        textTransform: "uppercase",
                        color: "var(--color-steel)",
                        textAlign: "right",
                        padding: "0.5rem 0 0.75rem",
                      }}
                    >
                      SLA
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {COVERAGE.map(({ region, sla }) => (
                    <tr
                      key={region}
                      style={{ borderBottom: "1px solid var(--color-border)" }}
                    >
                      <td
                        style={{
                          fontSize: "0.875rem",
                          padding: "0.75rem 0",
                          color: "var(--color-ink)",
                        }}
                      >
                        {region}
                      </td>
                      <td
                        style={{
                          fontSize: "0.875rem",
                          fontWeight: 600,
                          padding: "0.75rem 0",
                          color: "var(--color-signal)",
                          textAlign: "right",
                        }}
                      >
                        {sla}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── PLANS ────────────────────────────────────────────────────── */}
      <section
        data-section="plans"
        className="section-pad"
        style={{ background: "var(--color-warm)", borderTop: "1px solid var(--color-border)" }}
      >
        <div className="container">
          <Reveal style={{ marginBottom: "3rem" }}>
            <p className="label" style={{ marginBottom: "0.75rem" }}>
              Plāni
            </p>
            <h2
              style={{
                fontSize: "var(--fs-h2)",
                fontWeight: 700,
                letterSpacing: "-0.02em",
              }}
            >
              Izvēlieties piemērotāko
            </h2>
          </Reveal>

          <Stagger
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
              gap: "1px",
              background: "var(--color-border)",
            }}
          >
            {PLANS.map((p) => (
              <StaggerItem key={p.name}>
                <div
                  style={{
                    background: p.featured ? "var(--color-navy)" : "var(--color-stone)",
                    padding: "2.5rem 2rem",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    gap: "1.25rem",
                    borderTop: p.featured ? "3px solid var(--color-signal)" : "3px solid transparent",
                  }}
                >
                  <div>
                    <h3
                      style={{
                        fontSize: "var(--fs-h4)",
                        fontWeight: 700,
                        color: p.featured ? "var(--color-white)" : "var(--color-ink)",
                        marginBottom: "0.25rem",
                      }}
                    >
                      {p.name}
                    </h3>
                    <div
                      style={{
                        fontSize: "1rem",
                        fontWeight: 700,
                        color: "var(--color-signal)",
                        marginBottom: "0.5rem",
                      }}
                    >
                      {p.price}
                    </div>
                    <p
                      style={{
                        fontSize: "0.8125rem",
                        color: p.featured ? "rgba(255,255,255,0.55)" : "var(--color-steel)",
                        lineHeight: 1.55,
                      }}
                    >
                      {p.desc}
                    </p>
                  </div>

                  <ul
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "0.5rem",
                      flex: 1,
                    }}
                  >
                    {p.features.map((f) => (
                      <li
                        key={f}
                        style={{
                          display: "flex",
                          alignItems: "flex-start",
                          gap: "0.5rem",
                          fontSize: "0.8125rem",
                          color: p.featured ? "rgba(255,255,255,0.8)" : "var(--color-ink)",
                        }}
                      >
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true" style={{ flexShrink: 0, marginTop: "2px" }}>
                          <polyline points="2,7 5.5,10.5 12,3.5" stroke="var(--color-signal)" strokeWidth="1.5" strokeLinecap="square" strokeLinejoin="miter"/>
                        </svg>
                        {f}
                      </li>
                    ))}
                  </ul>

                  <Link
                    href="/kontakti"
                    className={p.featured ? "btn btn-primary" : "btn btn-outline-dark"}
                    style={{
                      justifyContent: "center",
                      ...(p.featured
                        ? {}
                        : { color: "var(--color-ink)", borderColor: "var(--color-ink)" }),
                    }}
                  >
                    {p.cta}
                  </Link>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>
    </>
  );
}
