"use client";

import { useState } from "react";
import { Reveal, Stagger, StaggerItem, motion } from "@/components/motion";

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
    icon: "📞",
  },
  {
    label: "WhatsApp",
    value: "+371 XX XXX XXX",
    href: "https://wa.me/37100000000",
    icon: "💬",
  },
  {
    label: "E-pasts",
    value: "info@primet.lv",
    href: "mailto:info@primet.lv",
    icon: "✉️",
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
              Runājiet ar mūsu komandu
            </h1>
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
                  <div
                    style={{
                      fontSize: "2rem",
                      marginBottom: "1rem",
                    }}
                  >
                    ✓
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
                        href="/privatuma-politika"
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
                        opacity: !agreed ? 0.5 : 1,
                        cursor: !agreed ? "not-allowed" : "pointer",
                        transition: "opacity 160ms",
                      }}
                      whileTap={agreed ? { scale: 0.97 } : {}}
                      transition={{ duration: 0.16 }}
                    >
                      {formState === "submitting" ? "Sūta…" : "Nosūtīt pieprasījumu"}
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
                    {CONTACT_INFO.map(({ label, value, href, icon }) => (
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
                          <span>{icon}</span>
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

// ── Field helper ──────────────────────────────────────────────────────────
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
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
      <label
        htmlFor={id}
        style={{
          fontSize: "0.75rem",
          fontWeight: 700,
          letterSpacing: "0.06em",
          textTransform: "uppercase",
          color: "var(--color-steel)",
        }}
      >
        {label}
        {required && (
          <span style={{ color: "var(--color-signal)", marginLeft: "3px" }}>*</span>
        )}
      </label>
      <input
        id={id}
        type={type}
        required={required}
        style={{
          padding: "0.75rem 1rem",
          background: "var(--color-white)",
          border: "1.5px solid var(--color-border)",
          borderRadius: "var(--radius)",
          fontSize: "0.9375rem",
          color: "var(--color-ink)",
          fontFamily: "var(--font-inter), system-ui, sans-serif",
          outline: "none",
          transition: "border-color 160ms",
        }}
        onFocus={(e) => (e.currentTarget.style.borderColor = "var(--color-signal)")}
        onBlur={(e) => (e.currentTarget.style.borderColor = "var(--color-border)")}
      />
    </div>
  );
}
