"use client";

import Link from "next/link";
import Logo from "./Logo";

const LINKS = {
  "Uzņēmums": [
    { href: "/par-uznemumu", label: "Par mums" },
    { href: "/risinajumi",   label: "Risinājumi" },
    { href: "/serviss",      label: "Serviss" },
    { href: "/kontakti",     label: "Kontakti" },
  ],
  "Risinājumi": [
    { href: "/risinajumi", label: "Gaļas apstrāde" },
    { href: "/risinajumi", label: "Piena ražošana" },
    { href: "/risinajumi", label: "Konservēšana" },
    { href: "/risinajumi", label: "Iepakošana" },
  ],
};

export default function Footer() {
  return (
    <footer
      className="noise"
      style={{
        background: "var(--color-navy)",
        color: "var(--color-white)",
        paddingTop: "4rem",
        paddingBottom: "2.5rem",
        position: "relative",
      }}
    >
      {/* Signal accent top bar */}
      <div aria-hidden="true" style={{ position: "absolute", top: 0, left: 0, right: 0, height: "2px", background: "linear-gradient(90deg, var(--color-signal) 0%, transparent 60%)" }} />
      <div className="container">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
            gap: "3rem",
            paddingBottom: "3rem",
            borderBottom: "1px solid rgba(255,255,255,0.1)",
          }}
        >
          {/* Brand */}
          <div style={{ gridColumn: "span 1" }}>
            <Logo variant="light" className="mb-4" />
            <p
              style={{
                fontSize: "var(--fs-small)",
                color: "rgba(255,255,255,0.6)",
                lineHeight: 1.7,
                maxWidth: "220px",
                marginTop: "1rem",
              }}
            >
              Profesionāla pārtikas rūpniecības iekārtu piegāde, uzstādīšana un serviss Latvijā.
            </p>
            <p
              style={{
                fontSize: "var(--fs-label)",
                color: "rgba(255,255,255,0.6)",
                marginTop: "1.5rem",
                letterSpacing: "0.04em",
              }}
            >
              Reg. Nr. 40003XXXXXX
            </p>
          </div>

          {/* Nav columns */}
          {Object.entries(LINKS).map(([title, links]) => (
            <div key={title}>
              <p
                style={{
                  fontSize: "var(--fs-label)",
                  fontWeight: 700,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "rgba(255,255,255,0.6)",
                  marginBottom: "1.25rem",
                }}
              >
                {title}
              </p>
              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                {links.map(({ href, label }) => (
                  <li key={href}>
                    <Link
                      href={href}
                      style={{
                        fontSize: "var(--fs-small)",
                        color: "rgba(255,255,255,0.7)",
                        textDecoration: "none",
                        transition: "color 160ms",
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = "#fff")}
                      onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.7)")}
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact */}
          <div>
            <p
              style={{
                fontSize: "var(--fs-label)",
                fontWeight: 700,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.6)",
                marginBottom: "1.25rem",
              }}
            >
              Kontakti
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              {[
                { label: "Tālrunis", value: "+371 XX XXX XXX", href: "tel:+371XXXXXXXX" },
                { label: "E-pasts", value: "info@primet.lv", href: "mailto:info@primet.lv" },
              ].map(({ label, value, href }) => (
                <div key={label}>
                  <p style={{ fontSize: "var(--fs-label)", color: "rgba(255,255,255,0.6)", marginBottom: "2px" }}>
                    {label}
                  </p>
                  <a
                    href={href}
                    style={{
                      fontSize: "var(--fs-small)",
                      color: "rgba(255,255,255,0.85)",
                      textDecoration: "none",
                      transition: "color 160ms",
                    }}
                  >
                    {value}
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "1rem",
            justifyContent: "space-between",
            alignItems: "center",
            paddingTop: "1.5rem",
            fontSize: "var(--fs-label)",
            color: "rgba(255,255,255,0.55)",
          }}
        >
          <span>© 2026 SIA Primet. Visas tiesības aizsargātas.</span>
          <div style={{ display: "flex", gap: "1.5rem" }}>
            <Link href="/kontakti" style={{ color: "inherit", textDecoration: "none" }}>
              Privātuma politika
            </Link>
            <Link href="/risinajumi" style={{ color: "inherit", textDecoration: "none" }}>
              Sertifikāti
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
