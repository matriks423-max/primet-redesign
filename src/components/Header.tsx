"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "./Logo";

const INDUSTRIES = [
  { label: "Gaļas apstrāde",        href: "/risinajumi" },
  { label: "Piena ražošana",         href: "/risinajumi" },
  { label: "Konservēšana",           href: "/risinajumi" },
  { label: "Maizes & konditerija",   href: "/risinajumi" },
  { label: "Dzērienu ražošana",      href: "/risinajumi" },
  { label: "Iepakošana & marķēšana", href: "/risinajumi" },
];

const PROCESSES = [
  { label: "Konveijeri",             href: "/risinajumi" },
  { label: "Mazgāšana / žāvēšana",   href: "/risinajumi" },
  { label: "Tvaicēšana",             href: "/risinajumi" },
  { label: "Iepakošana",             href: "/risinajumi" },
  { label: "Loģistika",              href: "/risinajumi" },
];

const NAV = [
  { href: "/par-uznemumu", label: "Par uzņēmumu", hasMega: false },
  { href: "/risinajumi",   label: "Risinājumi",   hasMega: true  },
  { href: "/serviss",      label: "Serviss",      hasMega: false },
  { href: "/kontakti",     label: "Kontakti",     hasMega: false },
];

const LANGS = ["LV", "EN", "RU"];

export default function Header() {
  const [menuOpen,  setMenuOpen]  = useState(false);
  const [megaOpen,  setMegaOpen]  = useState(false);
  const [activeLang, setActiveLang] = useState("LV");
  const [scrolled,  setScrolled]  = useState(false);
  const pathname   = usePathname();
  const isHero     = pathname === "/";
  const progressRef = useRef<HTMLDivElement>(null);
  const megaRef    = useRef<HTMLDivElement>(null);
  const megaTriggerRef = useRef<HTMLButtonElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => { setMenuOpen(false); setMegaOpen(false); }, [pathname]);

  useEffect(() => {
    const bar = progressRef.current;
    const onScroll = () => {
      setScrolled(window.scrollY > 8);
      if (bar) {
        const max = document.documentElement.scrollHeight - window.innerHeight;
        bar.style.transform = `scaleX(${max > 0 ? window.scrollY / max : 0})`;
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  // Close mega on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (
        megaRef.current && !megaRef.current.contains(e.target as Node) &&
        megaTriggerRef.current && !megaTriggerRef.current.contains(e.target as Node)
      ) setMegaOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const onMegaEnter = useCallback(() => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setMegaOpen(true);
  }, []);

  const onMegaLeave = useCallback(() => {
    closeTimer.current = setTimeout(() => setMegaOpen(false), 120);
  }, []);

  const onMegaFocus = useCallback(() => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
  }, []);

  const isLight = isHero && !scrolled;

  return (
    <>
      {/* ── STICKY WRAPPER (lang bar + header together) ─────── */}
      <div style={{ position: "sticky", top: 0, zIndex: 40 }}>
      {/* ── LANGUAGE BAR ────────────────────────────────────── */}
      <div
        style={{
          background: isLight ? "transparent" : "var(--color-warm)",
          borderBottom: `1px solid ${isLight ? "rgba(255,255,255,0.07)" : "var(--color-border)"}`,
          transition: "background 300ms, border-color 300ms",
          backdropFilter: isLight ? "none" : "none",
        }}
      >
        <div
          className="container"
          style={{ display: "flex", justifyContent: "flex-end", alignItems: "center", height: "32px", gap: "4px" }}
        >
          {LANGS.map((lang) => (
            <button
              key={lang}
              onClick={() => setActiveLang(lang)}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                fontSize: "0.6875rem",
                fontWeight: activeLang === lang ? 700 : 500,
                letterSpacing: "0.08em",
                color: activeLang === lang
                  ? "var(--color-signal)"
                  : isLight ? "rgba(255,255,255,0.5)" : "var(--color-steel)",
                padding: "4px 6px",
                transition: "color 160ms",
                borderBottom: activeLang === lang ? "1.5px solid var(--color-signal)" : "1.5px solid transparent",
              }}
            >
              {lang}
            </button>
          ))}
        </div>
      </div>

      {/* ── MAIN HEADER ─────────────────────────────────────── */}
      <header
        style={{
          background: isLight
            ? "rgba(10,22,40,0.45)"
            : isHero && scrolled
              ? "rgba(10,22,40,0.92)"
              : scrolled
                ? "rgba(250,250,248,0.92)"
                : "var(--color-stone)",
          borderBottom: isLight
            ? "1px solid rgba(255,255,255,0.06)"
            : "1px solid var(--color-border)",
          transition: "background 320ms var(--ease-out), border-color 320ms",
          backdropFilter: (isHero && scrolled) || (!isHero && scrolled) ? "blur(16px) saturate(1.4)" : "none",
          WebkitBackdropFilter: (isHero && scrolled) || (!isHero && scrolled) ? "blur(16px) saturate(1.4)" : "none",
        }}
      >
        {/* Scroll progress */}
        <div aria-hidden="true" style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "2px", overflow: "hidden" }}>
          <div ref={progressRef} style={{ height: "100%", background: "var(--color-signal)", transformOrigin: "left", transform: "scaleX(0)" }} />
        </div>

        <div className="container" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: "64px" }}>
          <Link href="/" aria-label="Primet sākumlapa" style={{ display: "flex", alignItems: "center" }}>
            <Logo variant={isLight ? "light" : "dark"} />
          </Link>

          {/* Desktop nav */}
          <nav aria-label="Galvenā navigācija" className="desktop-nav items-center gap-8" style={{ alignItems: "center", gap: "2rem" }}>
            {NAV.map(({ href, label, hasMega }) =>
              hasMega ? (
                <div
                  key={href}
                  style={{ position: "relative" }}
                  onMouseEnter={onMegaEnter}
                  onMouseLeave={onMegaLeave}
                >
                  <button
                    ref={megaTriggerRef}
                    aria-expanded={megaOpen}
                    aria-haspopup="true"
                    onClick={() => setMegaOpen((v) => !v)}
                    onFocus={onMegaFocus}
                    style={{
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      gap: "4px",
                      fontSize: "var(--fs-small)",
                      fontWeight: 500,
                      letterSpacing: "0.02em",
                      color: pathname.startsWith(href) ? "var(--color-signal)" : isLight ? "var(--color-white)" : "var(--color-ink)",
                      padding: "0",
                      paddingBottom: "2px",
                      borderBottom: pathname.startsWith(href) ? "2px solid var(--color-signal)" : "2px solid transparent",
                      transition: "color 160ms",
                    }}
                  >
                    {label}
                    <svg
                      width="10" height="6" viewBox="0 0 10 6" fill="none"
                      style={{
                        transform: megaOpen ? "rotate(180deg)" : "rotate(0deg)",
                        transition: "transform 200ms var(--ease-out)",
                        color: "currentColor",
                      }}
                    >
                      <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                </div>
              ) : (
                <Link
                  key={href}
                  href={href}
                  style={{
                    fontSize: "var(--fs-small)",
                    fontWeight: 500,
                    letterSpacing: "0.02em",
                    color: pathname === href ? "var(--color-signal)" : isLight ? "var(--color-white)" : "var(--color-ink)",
                    textDecoration: "none",
                    transition: "color 160ms",
                    paddingBottom: "2px",
                    borderBottom: pathname === href ? "2px solid var(--color-signal)" : "2px solid transparent",
                  }}
                >
                  {label}
                </Link>
              )
            )}
          </nav>

          <div className="desktop-cta items-center gap-4" style={{ alignItems: "center", gap: "1rem" }}>
            <Link href="/kontakti" className="btn btn-primary" style={{ fontSize: "var(--fs-label)", padding: "0.5rem 1.25rem" }}>
              Sazināties
            </Link>
          </div>

          {/* Hamburger */}
          <button
            aria-label={menuOpen ? "Aizvērt izvēlni" : "Atvērt izvēlni"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(!menuOpen)}
            className="mobile-burger"
            style={{ background: "none", border: "none", cursor: "pointer", padding: "8px", display: "flex", flexDirection: "column", gap: "5px" }}
          >
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                style={{
                  display: "block", width: "22px", height: "2px",
                  background: isLight ? "var(--color-white)" : "var(--color-ink)",
                  transition: "transform 240ms var(--ease-out), opacity 200ms",
                  transformOrigin: "center",
                  transform:
                    menuOpen && i === 0 ? "translateY(7px) rotate(45deg)" :
                    menuOpen && i === 2 ? "translateY(-7px) rotate(-45deg)" : "none",
                  opacity: menuOpen && i === 1 ? 0 : 1,
                }}
              />
            ))}
          </button>
        </div>
      </header>

      </div>{/* end sticky wrapper */}

      {/* ── MEGA MENU ───────────────────────────────────────── */}
      <div
        ref={megaRef}
        role="region"
        aria-label="Risinājumi"
        onMouseEnter={onMegaEnter}
        onMouseLeave={onMegaLeave}
        style={{
          position: "fixed",
          top: "97px", // lang bar (32px) + header (64px) + 1px border
          left: 0,
          right: 0,
          zIndex: 39,
          background: "var(--color-stone)",
          borderBottom: "1px solid var(--color-border)",
          boxShadow: "0 8px 32px rgba(0,0,0,0.08)",
          opacity: megaOpen ? 1 : 0,
          pointerEvents: megaOpen ? "all" : "none",
          transform: megaOpen ? "translateY(0)" : "translateY(-6px)",
          transition: "opacity 180ms var(--ease-out), transform 180ms var(--ease-out)",
        }}
      >
        <div className="container" style={{ padding: "2.5rem 1.5rem", display: "grid", gridTemplateColumns: "1fr 1fr 220px", gap: "3rem" }}>
          {/* Left — by industry */}
          <div>
            <p style={{ fontSize: "0.6875rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--color-signal)", marginBottom: "1.25rem" }}>
              Pēc industrijas
            </p>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "2px" }}>
              {INDUSTRIES.map(({ label, href }) => (
                <li key={href}>
                  <Link
                    href={href}
                    onClick={() => setMegaOpen(false)}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                      padding: "8px 0",
                      fontSize: "0.9375rem",
                      fontWeight: 500,
                      color: "var(--color-ink)",
                      textDecoration: "none",
                      borderBottom: "1px solid transparent",
                      transition: "color 140ms",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "var(--color-signal)")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "var(--color-ink)")}
                  >
                    <span style={{ display: "block", width: "3px", height: "3px", background: "var(--color-signal)", flexShrink: 0 }} />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Right — by process */}
          <div>
            <p style={{ fontSize: "0.6875rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--color-signal)", marginBottom: "1.25rem" }}>
              Pēc procesa
            </p>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "2px" }}>
              {PROCESSES.map(({ label, href }) => (
                <li key={href}>
                  <Link
                    href={href}
                    onClick={() => setMegaOpen(false)}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                      padding: "8px 0",
                      fontSize: "0.9375rem",
                      fontWeight: 500,
                      color: "var(--color-ink)",
                      textDecoration: "none",
                      transition: "color 140ms",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "var(--color-signal)")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "var(--color-ink)")}
                  >
                    <span style={{ display: "block", width: "3px", height: "3px", background: "var(--color-signal)", flexShrink: 0 }} />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* CTA panel */}
          <div style={{ background: "var(--color-navy)", padding: "1.75rem" }}>
            <div style={{ width: "32px", height: "2px", background: "var(--color-signal)", marginBottom: "1rem" }} />
            <p style={{ fontSize: "0.8125rem", fontWeight: 700, color: "var(--color-white)", letterSpacing: "-0.01em", marginBottom: "0.5rem" }}>
              Nav sava procesa sarakstā?
            </p>
            <p style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.5)", lineHeight: 1.6, marginBottom: "1.5rem" }}>
              Mēs projektējam pēc pasūtījuma. Aprakstiet vajadzību.
            </p>
            <Link
              href="/kontakti"
              onClick={() => setMegaOpen(false)}
              className="btn btn-primary"
              style={{ fontSize: "0.6875rem", padding: "0.5rem 1rem", display: "inline-flex" }}
            >
              Sazināties
            </Link>
          </div>
        </div>
      </div>

      {/* ── MOBILE OVERLAY ──────────────────────────────────── */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Mobilā navigācija"
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 50,
          background: "var(--color-navy)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "2rem",
          opacity: menuOpen ? 1 : 0,
          pointerEvents: menuOpen ? "all" : "none",
          transition: "opacity 280ms var(--ease-out)",
          overflowY: "auto",
          padding: "5rem 2rem 2rem",
        }}
      >
        {/* Language switcher in overlay */}
        <div style={{ display: "flex", gap: "1rem", marginBottom: "0.5rem" }}>
          {LANGS.map((lang) => (
            <button
              key={lang}
              onClick={() => setActiveLang(lang)}
              style={{
                background: "none", border: "none", cursor: "pointer",
                fontSize: "0.75rem", fontWeight: activeLang === lang ? 700 : 500,
                color: activeLang === lang ? "var(--color-signal)" : "rgba(255,255,255,0.45)",
                letterSpacing: "0.1em",
                borderBottom: activeLang === lang ? "1.5px solid var(--color-signal)" : "1.5px solid transparent",
                padding: "4px 2px",
              }}
            >
              {lang}
            </button>
          ))}
        </div>

        {NAV.map(({ href, label }, i) => (
          <Link
            key={href}
            href={href}
            onClick={() => setMenuOpen(false)}
            style={{
              color: "var(--color-white)",
              fontSize: "var(--fs-h3)",
              fontWeight: 700,
              textDecoration: "none",
              letterSpacing: "-0.01em",
              transform: menuOpen ? "translateY(0)" : "translateY(12px)",
              opacity: menuOpen ? 1 : 0,
              transition: `transform 320ms var(--ease-out) ${i * 60}ms, opacity 320ms var(--ease-out) ${i * 60}ms`,
            }}
          >
            {label}
          </Link>
        ))}

        <Link
          href="/kontakti"
          onClick={() => setMenuOpen(false)}
          className="btn btn-primary"
          style={{
            marginTop: "1rem",
            transform: menuOpen ? "translateY(0)" : "translateY(12px)",
            opacity: menuOpen ? 1 : 0,
            transition: `transform 320ms var(--ease-out) ${NAV.length * 60}ms, opacity 320ms var(--ease-out) ${NAV.length * 60}ms`,
          }}
        >
          Sazināties
        </Link>

        <button
          aria-label="Aizvērt izvēlni"
          onClick={() => setMenuOpen(false)}
          style={{ position: "absolute", top: "1.25rem", right: "1.5rem", background: "none", border: "none", color: "var(--color-white)", cursor: "pointer", padding: "8px", display: "flex", alignItems: "center", justifyContent: "center" }}
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
            <line x1="3" y1="3" x2="17" y2="17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square"/>
            <line x1="17" y1="3" x2="3" y2="17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square"/>
          </svg>
        </button>
      </div>
    </>
  );
}
