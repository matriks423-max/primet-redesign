"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { Reveal, Stagger, StaggerItem, motion } from "@/components/motion";
import { IconPhone, IconMail, IconMessageSquare } from "@/components/Icons";

const KineticText = dynamic(() => import("@/components/KineticText"), { ssr: false });

const SUBJECTS = [
  "Iekārtu piegāde",
  "Serviss un apkope",
  "Avārijas remontdarbi",
  "Modernizācija",
  "Konsultācija",
  "Cits",
];

const CONTACT_INFO = [
  {
    label: "Tālrunis",
    value: "+371 XX XXX XXX",
    href: "tel:+37100000000",
    Icon: IconPhone,
  },
  {
    label: "WhatsApp",
    value: "+371 XX XXX XXX",
    href: "https://wa.me/37100000000",
    Icon: IconMessageSquare,
  },
  {
    label: "E-pasts",
    value: "info@primet.lv",
    href: "mailto:info@primet.lv",
    Icon: IconMail,
  },
];

const HOURS = [
  { days: "Pirmdiena – piektdiena", time: "08:00 – 18:00" },
  { days: "Sestdiena", time: "09:00 – 14:00" },
  { days: "Svētdiena", time: "Slēgts" },
];

type FormState = "idle" | "submitting" | "success" | "error";

export default function KontaktiPage() {
  const [formState, setFormState] = useState<FormState>("idle");
  const [agreed, setAgreed] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!agreed) return;
    setFormState("submitting");
    // Simulate submission
    setTimeout(() => setFormState("success"), 1500);
  }

  return (
    <>
      {/* ── HERO ─────────────────────────────────────────────────────── */}
      <section
        data-section="hero"
        className="noise"
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
              Kontakti
            </p>
            <KineticText
              text="Runājiet ar"
              tag="h1"
              delay={0.2}
              splitBy="chars"
              style={{
                fontSize: "clamp(2.5rem, 5vw, 4rem)",
                fontWeight: 800,
                color: "var(--color-white)",
                letterSpacing: "-0.03em",
                lineHeight: 1.0,
                display: "block",
                marginBottom: "0.05em",
              }}
            />
            <KineticText
              text="mūsu komandu"
              tag="h1"
              delay={0.32}
              splitBy="chars"
              style={{
                fontSize: "clamp(2.5rem, 5vw, 4rem)",
                fontWeight: 800,
                color: "var(--color-signal)",
                letterSpacing: "-0.03em",
                lineHeight: 1.05,
                display: "block",
                marginBottom: "1.5rem",
              }}
            />
            <p
              style={{
                fontSize: "1.125rem",
                color: "oklch(70% 0.01 255)",
                maxWidth: "48ch",
                lineHeight: 1.65,
              }}
            >
              Aprakstiet savu vajadzību un mēs atbildēsim darba dienas laikā ar konkrētu
              piedāvājumu vai tehniskās konsultācijas laiku.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── FORM + INFO ──────────────────────────────────────────────── */}
      <section
        data-section="contact-main"
        className="section-pad"
        style={{ background: "var(--color-stone)" }}
      >
        <div className="container">
          <div
            className="contact-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "2fr 1fr",
              gap: "clamp(2.5rem, 6vw, 5rem)",
              alignItems: "start",
            }}
          >
            {/* Form */}
            <Reveal>
              {formState === "success" ? (
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
                  style={{
                    background: "var(--color-navy)",
                    padding: "3rem",
                    borderTop: "3px solid var(--color-signal)",
                  }}
                >
                  <div style={{ marginBottom: "1.25rem" }}>
                    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" aria-hidden="true">
                      <rect width="40" height="40" fill="var(--color-signal)" opacity="0.12"/>
                      <polyline points="10,20 17,27 30,13" stroke="var(--color-signal)" strokeWidth="2" strokeLinecap="square" strokeLinejoin="miter"/>
                    </svg>
                  </div>
                  <h2
                    style={{
                      fontSize: "var(--fs-h3)",
                      fontWeight: 700,
                      color: "var(--color-white)",
                      marginBottom: "0.75rem",
                    }}
                  >
                    Pieprasījums nosūtīts
                  </h2>
                  <p style={{ color: "rgba(255,255,255,0.65)", lineHeight: 1.65 }}>
                    Mēs sazināsimies ar jums darba dienas laikā. Ja jautājums ir steidzams —
                    zvaniet{" "}
                    <a
                      href="tel:+37100000000"
                      style={{ color: "var(--color-signal)", textDecoration: "none" }}
                    >
                      +371 XX XXX XXX
                    </a>
                    .
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} noValidate>
                  <div
                    style={{
                      display: "grid",
                      gap: "1.5rem",
                    }}
                  >
                    {/* Row 1: name + company */}
                    <div
                      className="form-row"
                      style={{
                        display: "grid",
                        gridTemplateColumns: "1fr 1fr",
                        gap: "1rem",
                      }}
                    >
                      <Field label="Vārds, uzvārds" id="name" required />
                      <Field label="Uzņēmums" id="company" />
                    </div>

                    {/* Row 2: phone + email */}
                    <div
                      className="form-row"
                      style={{
                        display: "grid",
                        gridTemplateColumns: "1fr 1fr",
                        gap: "1rem",
                      }}
                    >
                      <Field label="Tālrunis" id="phone" type="tel" />
                      <Field label="E-pasts" id="email" type="email" required />
                    </div>

                    {/* Subject select */}
                    <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                      <label
                        htmlFor="subject"
                        style={{
                          fontSize: "0.75rem",
                          fontWeight: 700,
                          letterSpacing: "0.06em",
                          textTransform: "uppercase",
                          color: "var(--color-steel)",
                        }}
                      >
                        Tēma
                      </label>
                      <select
                        id="subject"
                        style={{
                          padding: "0.75rem 1rem",
                          background: "var(--color-white)",
                          border: "1.5px solid var(--color-border)",
                          borderRadius: "var(--radius)",
                          fontSize: "0.9375rem",
                          color: "var(--color-ink)",
                          fontFamily: "var(--font-inter), system-ui, sans-serif",
                          outline: "none",
                          width: "100%",
                          cursor: "pointer",
                        }}
                      >
                        <option value="">Izvēlieties tēmu…</option>
                        {SUBJECTS.map((s) => (
                          <option key={s} value={s}>
                            {s}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Message */}
                    <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                      <label
                        htmlFor="message"
                        style={{
                          fontSize: "0.75rem",
                          fontWeight: 700,
                          letterSpacing: "0.06em",
                          textTransform: "uppercase",
                          color: "var(--color-steel)",
                        }}
                      >
                        Ziņojums <span style={{ color: "var(--color-signal)" }}>*</span>
                      </label>
                      <textarea
                        id="message"
                        required
                        rows={5}
                        placeholder="Aprakstiet iekārtu, problēmu vai vajadzību…"
                        style={{
                          padding: "0.75rem 1rem",
                          background: "var(--color-white)",
                          border: "1.5px solid var(--color-border)",
                          borderRadius: "var(--radius)",
                          fontSize: "0.9375rem",
                          color: "var(--color-ink)",
                          fontFamily: "var(--font-inter), system-ui, sans-serif",
                          outline: "none",
                          resize: "vertical",
                          lineHeight: 1.6,
                        }}
                        onFocus={(e) =>
                          (e.currentTarget.style.borderColor = "var(--color-signal)")
                        }
                        onBlur={(e) =>
                          (e.currentTarget.style.borderColor = "var(--color-border)")
                        }
                      />
                    </div>

                    {/* GDPR */}
                    <label
                      style={{
                        display: "flex",
                        alignItems: "flex-start",
                        gap: "0.75rem",
                        cursor: "pointer",
                        fontSize: "0.8125rem",
                        color: "var(--color-steel)",
                        lineHeight: 1.55,
                      }}
                    >
                      <input
                        type="checkbox"
                        checked={agreed}
                        onChange={(e) => setAgreed(e.target.checked)}
                        style={{ marginTop: "2px", accentColor: "var(--color-signal)", flexShrink: 0 }}
                        required
                      />
                      Piekrītu personas datu apstrādei saskaņā ar{" "}
                      <a
                        href="#"
                        style={{ color: "var(--color-signal)", textDecoration: "none" }}
                      >
                        privātuma politiku
                      </a>{" "}
                      pieprasījuma izskatīšanai.
                    </label>

                    {/* Submit */}
                    <motion.button
                      type="submit"
                      disabled={!agreed || formState === "submitting"}
                      className="btn btn-primary"
                      style={{
                        justifyContent: "center",
                        opacity: !agreed ? 0.45 : 1,
                        cursor: !agreed ? "not-allowed" : "pointer",
                        transition: "opacity 200ms, box-shadow 200ms",
                        boxShadow: agreed && formState !== "submitting"
                          ? "0 0 0 0 rgba(204,51,0,0)"
                          : "none",
                        position: "relative",
                        overflow: "hidden",
                      }}
                      whileHover={agreed ? { boxShadow: "0 6px 28px rgba(204,51,0,0.35)" } : {}}
                      whileTap={agreed ? { scale: 0.97 } : {}}
                      transition={{ duration: 0.2 }}
                    >
                      {formState === "submitting" ? (
                        <span style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true" style={{ animation: "spin 1s linear infinite" }}>
                            <circle cx="8" cy="8" r="6" stroke="rgba(255,255,255,0.3)" strokeWidth="2"/>
                            <path d="M8 2a6 6 0 0 1 6 6" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                          </svg>
                          Sūta…
                        </span>
                      ) : "Nosūtīt pieprasījumu"}
                    </motion.button>
                  </div>
                </form>
              )}
            </Reveal>

            {/* Info panel */}
            <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
              <Reveal>
                <div
                  style={{
                    background: "var(--color-warm)",
                    padding: "2rem",
                    borderTop: "3px solid var(--color-signal)",
                  }}
                >
                  <p
                    style={{
                      fontSize: "0.75rem",
                      fontWeight: 700,
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      color: "var(--color-signal)",
                      marginBottom: "1.25rem",
                    }}
                  >
                    Sazināties
                  </p>
                  <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                    {CONTACT_INFO.map(({ label, value, href, Icon }) => (
                      <div key={label}>
                        <p
                          style={{
                            fontSize: "0.6875rem",
                            fontWeight: 600,
                            letterSpacing: "0.08em",
                            textTransform: "uppercase",
                            color: "var(--color-steel)",
                            marginBottom: "3px",
                          }}
                        >
                          {label}
                        </p>
                        <a
                          href={href}
                          style={{
                            fontSize: "0.9375rem",
                            fontWeight: 600,
                            color: "var(--color-ink)",
                            textDecoration: "none",
                            display: "flex",
                            alignItems: "center",
                            gap: "0.5rem",
                          }}
                        >
                          <Icon size={16} color="var(--color-steel)" />
                          {value}
                        </a>
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>

              <Reveal delay={0.1}>
                <div
                  style={{
                    background: "var(--color-warm)",
                    padding: "2rem",
                  }}
                >
                  <p
                    style={{
                      fontSize: "0.75rem",
                      fontWeight: 700,
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      color: "var(--color-steel)",
                      marginBottom: "1.25rem",
                    }}
                  >
                    Darba laiks
                  </p>
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                    {HOURS.map(({ days, time }) => (
                      <div
                        key={days}
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          gap: "1rem",
                          fontSize: "0.875rem",
                          borderBottom: "1px solid var(--color-border)",
                          paddingBottom: "0.75rem",
                        }}
                      >
                        <span style={{ color: "var(--color-steel)" }}>{days}</span>
                        <span style={{ fontWeight: 600, color: "var(--color-ink)", whiteSpace: "nowrap" }}>
                          {time}
                        </span>
                      </div>
                    ))}
                  </div>
                  <p
                    style={{
                      marginTop: "1rem",
                      fontSize: "0.8125rem",
                      color: "var(--color-signal)",
                      fontWeight: 600,
                    }}
                  >
                    Avārijām — 24/7 telefonkonsultācija
                  </p>
                </div>
              </Reveal>

              <Reveal delay={0.2}>
                <div
                  style={{
                    background: "var(--color-warm)",
                    padding: "2rem",
                  }}
                >
                  <p
                    style={{
                      fontSize: "0.75rem",
                      fontWeight: 700,
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      color: "var(--color-steel)",
                      marginBottom: "1rem",
                    }}
                  >
                    Adrese
                  </p>
                  {/* Map placeholder */}
                  <div
                    className="placeholder-block"
                    style={{ height: "140px", marginBottom: "0.75rem" }}
                  >
                    Karte
                  </div>
                  <p style={{ fontSize: "0.875rem", color: "var(--color-steel)", lineHeight: 1.6 }}>
                    Rīga, Latvija
                    <br />
                    <span style={{ color: "var(--color-steel)", fontSize: "0.8125rem" }}>
                      Precīza adrese — no klienta
                    </span>
                  </p>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

// ── Field helper — floating label ─────────────────────────────────────────
function Field({
  label,
  id,
  type = "text",
  required = false,
}: {
  label: string;
  id: string;
  type?: string;
  required?: boolean;
}) {
  const [focused, setFocused] = useState(false);
  const [hasValue, setHasValue] = useState(false);

  const lifted = focused || hasValue;

  return (
    <div style={{ position: "relative", paddingTop: "1.25rem" }}>
      <label
        htmlFor={id}
        style={{
          position: "absolute",
          left: "1rem",
          top: lifted ? "0" : "calc(1.25rem + 0.8rem)",
          fontSize: lifted ? "0.6875rem" : "0.9375rem",
          fontWeight: lifted ? 700 : 400,
          letterSpacing: lifted ? "0.06em" : "0",
          textTransform: lifted ? "uppercase" : "none",
          color: focused ? "var(--color-signal)" : "var(--color-steel)",
          transition: "all 180ms cubic-bezier(0.23, 1, 0.32, 1)",
          pointerEvents: "none",
          zIndex: 1,
        }}
      >
        {label}
        {required && <span style={{ color: "var(--color-signal)", marginLeft: "2px" }}>*</span>}
      </label>
      <input
        id={id}
        type={type}
        required={required}
        style={{
          width: "100%",
          padding: "0.75rem 1rem 0.75rem",
          background: "var(--color-white)",
          border: "none",
          borderBottom: `2px solid ${focused ? "var(--color-signal)" : "var(--color-border)"}`,
          fontSize: "0.9375rem",
          color: "var(--color-ink)",
          fontFamily: "var(--font-inter), system-ui, sans-serif",
          outline: "none",
          transition: "border-color 180ms",
          boxSizing: "border-box",
        }}
        onFocus={() => setFocused(true)}
        onBlur={(e) => {
          setFocused(false);
          setHasValue(e.currentTarget.value.length > 0);
        }}
        onChange={(e) => setHasValue(e.target.value.length > 0)}
      />
    </div>
  );
}
