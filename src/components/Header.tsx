"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "./Logo";

const NAV = [
  { href: "/par-uznemumu", label: "Par uzņēmumu" },
  { href: "/risinajumi", label: "Risinājumi" },
  { href: "/serviss", label: "Serviss" },
  { href: "/kontakti", label: "Kontakti" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const isHero = pathname === "/";
  const progressRef = useRef<HTMLDivElement>(null);

  // Close menu on route change
  useEffect(() => { setMenuOpen(false); }, [pathname]);

  // Shadow on scroll + scroll progress bar
  // Direct DOM mutation — no React state, no re-renders, passive listener ✓
  useEffect(() => {
    const bar = progressRef.current;
    const onScroll = () => {
      setScrolled(window.scrollY > 8);
      if (bar) {
        const max = document.documentElement.scrollHeight - window.innerHeight;
        const progress = max > 0 ? window.scrollY / max : 0;
        bar.style.transform = `scaleX(${progress})`;
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Prevent body scroll when menu open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  return (
    <>
      <header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 40,
          background: isHero ? "transparent" : "var(--color-stone)",
          borderBottom: scrolled ? "1px solid var(--color-border)" : "1px solid transparent",
          transition: "border-color 200ms, background 200ms",
          backdropFilter: scrolled ? "blur(8px)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(8px)" : "none",
        }}
      >
        {/* Scroll progress — scaleX transform, hardware-accelerated ✓ */}
        <div
          aria-hidden="true"
          style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "2px", overflow: "hidden" }}
        >
          <div
            ref={progressRef}
            style={{
              height: "100%",
              background: "var(--color-signal)",
              transformOrigin: "left",
              transform: "scaleX(0)",
            }}
          />
        </div>

        <div
          className="container"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            height: "64px",
          }}
        >
          <Link href="/" aria-label="Primet sākumlapa" style={{ display: "flex", alignItems: "center" }}>
            <Logo variant={isHero && !scrolled ? "light" : "dark"} />
          </Link>

          {/* Desktop nav */}
          <nav aria-label="Galvenā navigācija" style={{ display: "none" }} className="md:!flex gap-8">
            {NAV.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                style={{
                  fontSize: "var(--fs-small)",
                  fontWeight: 500,
                  letterSpacing: "0.02em",
                  color: pathname === href ? "var(--color-signal)" : isHero && !scrolled ? "var(--color-white)" : "var(--color-ink)",
                  textDecoration: "none",
                  transition: "color 160ms",
                  paddingBottom: "2px",
                  borderBottom: pathname === href ? "2px solid var(--color-signal)" : "2px solid transparent",
                }}
              >
                {label}
              </Link>
            ))}
          </nav>

          {/* CTA — desktop */}
          <div style={{ display: "none" }} className="md:!flex items-center gap-4">
            <Link
              href="/kontakti"
              className="btn btn-primary"
              style={{ fontSize: "var(--fs-label)", padding: "0.5rem 1.25rem" }}
            >
              Sazināties
            </Link>
          </div>

          {/* Hamburger — mobile */}
          <button
            aria-label={menuOpen ? "Aizvērt izvēlni" : "Atvērt izvēlni"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden"
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: "8px",
              display: "flex",
              flexDirection: "column",
              gap: "5px",
            }}
          >
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                style={{
                  display: "block",
                  width: "22px",
                  height: "2px",
                  background: isHero && !scrolled ? "var(--color-white)" : "var(--color-ink)",
                  transition: "transform 240ms var(--ease-out), opacity 200ms",
                  transformOrigin: "center",
                  transform:
                    menuOpen && i === 0 ? "translateY(7px) rotate(45deg)" :
                    menuOpen && i === 1 ? "scaleX(0)" :
                    menuOpen && i === 2 ? "translateY(-7px) rotate(-45deg)" : "none",
                  opacity: menuOpen && i === 1 ? 0 : 1,
                }}
              />
            ))}
          </button>
        </div>
      </header>

      {/* Mobile overlay */}
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
          gap: "2.5rem",
          opacity: menuOpen ? 1 : 0,
          pointerEvents: menuOpen ? "all" : "none",
          transition: "opacity 280ms var(--ease-out)",
        }}
      >
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

        {/* Close button */}
        <button
          aria-label="Aizvērt izvēlni"
          onClick={() => setMenuOpen(false)}
          style={{
            position: "absolute",
            top: "1.25rem",
            right: "1.5rem",
            background: "none",
            border: "none",
            color: "var(--color-white)",
            cursor: "pointer",
            fontSize: "1.5rem",
            padding: "8px",
          }}
        >
          ✕
        </button>
      </div>
    </>
  );
}
