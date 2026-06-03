/* ============================================================
   LAYOUT — Navigation + Footer
   Design: Cinematic Dark / LA Noir
   Nav: Oswald 400, letter-spacing 0.12em, amber underline on hover
   Footer: Minimal, Montserrat 300
   ============================================================ */

import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";

const navLinks = [
  { href: "/headshots", label: "Headshots" },
  { href: "/headshot-pricing", label: "Pricing" },
  { href: "/fine-art", label: "Fine Art" },
  { href: "/street", label: "Street" },
  { href: "/aerial", label: "Aerial" },
  { href: "/merchandise", label: "Shop" },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  const isHome = location === "/";

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "#111214", color: "#f5f5f5" }}>
      {/* ── Navigation ── */}
      <header
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          background: scrolled || !isHome
            ? "rgba(17, 18, 20, 0.95)"
            : "transparent",
          backdropFilter: scrolled || !isHome ? "blur(8px)" : "none",
          borderBottom: scrolled || !isHome ? "1px solid rgba(255,255,255,0.06)" : "none",
        }}
      >
        <div className="container flex items-center justify-between" style={{ height: "72px" }}>
          {/* Logo */}
          <Link href="/">
            <span style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
              {/* Camera logo — white-tinted via CSS filter so it reads on dark nav */}
              <img
                src="https://pub-f887d7fd2fe441ecb02bee0d82d10831.r2.dev/fink-photography/client/images/pfp-logo/1-pfp-logo.png"
                alt="Patrick Fink Photography logo"
                style={{
                  height: "42px",
                  width: "auto",
                  
                  opacity: 0.92,
                }}
              />
              <span
                style={{
                  fontFamily: "'Oswald', sans-serif",
                  fontWeight: 700,
                  fontSize: "1.05rem",
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: "#ffffff",
                  lineHeight: 1,
                }}
              >
                Patrick Fink
                <span
                  style={{
                    display: "block",
                    fontFamily: "'Montserrat', sans-serif",
                    fontWeight: 300,
                    fontSize: "0.58rem",
                    letterSpacing: "0.35em",
                    color: "#e8a020",
                    marginTop: "3px",
                    textTransform: "uppercase",
                  }}
                >
                  Photography
                </span>
              </span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href}>
                <span className={`nav-link${location === link.href ? " active" : ""}`}>
                  {link.label}
                </span>
              </Link>
            ))}
            <Link href="/headshots">
              <span
                className="btn-amber"
                style={{ padding: "0.5rem 1.25rem", fontSize: "0.7rem" }}
              >
                Book a Session
              </span>
            </Link>
          </nav>

          {/* Mobile Hamburger */}
          <button
            className="md:hidden flex flex-col justify-center items-center gap-1.5 w-8 h-8"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <span
              className="block h-px w-6 bg-white transition-all duration-200"
              style={{
                transform: menuOpen ? "rotate(45deg) translate(3px, 3px)" : "none",
              }}
            />
            <span
              className="block h-px w-6 bg-white transition-all duration-200"
              style={{ opacity: menuOpen ? 0 : 1 }}
            />
            <span
              className="block h-px w-6 bg-white transition-all duration-200"
              style={{
                transform: menuOpen ? "rotate(-45deg) translate(3px, -3px)" : "none",
              }}
            />
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className="md:hidden overflow-hidden transition-all duration-300"
          style={{
            maxHeight: menuOpen ? "320px" : "0",
            background: "rgba(17, 18, 20, 0.98)",
            borderTop: menuOpen ? "1px solid rgba(255,255,255,0.06)" : "none",
          }}
        >
          <nav className="container flex flex-col py-6 gap-5">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href}>
                <span
                  className={`nav-link${location === link.href ? " active" : ""}`}
                  style={{ fontSize: "1rem" }}
                >
                  {link.label}
                </span>
              </Link>
            ))}
            <Link href="/headshots">
              <span className="btn-amber" style={{ display: "inline-block", marginTop: "0.5rem" }}>
                Book a Session
              </span>
            </Link>
          </nav>
        </div>
      </header>

      {/* ── Page Content ── */}
      <main className="flex-1">
        {children}
      </main>

      {/* ── Footer ── */}
      <footer
        style={{
          background: "#0c0d0f",
          borderTop: "1px solid rgba(255,255,255,0.06)",
          padding: "3rem 0 2rem",
        }}
      >
        <div className="container">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
            {/* Brand */}
            <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
              <img
                src="https://pub-f887d7fd2fe441ecb02bee0d82d10831.r2.dev/fink-photography/client/images/pfp-logo/1-pfp-logo.png"
                alt="Patrick Fink Photography"
                style={{
                  height: "56px",
                  width: "auto",
                  
                  opacity: 0.5,
                }}
              />
              <div>
                <p
                  style={{
                    fontFamily: "'Oswald', sans-serif",
                    fontWeight: 700,
                    fontSize: "1rem",
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                    color: "#ffffff",
                    marginBottom: "0.35rem",
                  }}
                >
                  Patrick Fink
                </p>
                <p
                  style={{
                    fontFamily: "'Montserrat', sans-serif",
                    fontWeight: 300,
                    fontSize: "0.7rem",
                    letterSpacing: "0.3em",
                    textTransform: "uppercase",
                    color: "#e8a020",
                  }}
                >
                  Photography — Los Angeles
                </p>
              </div>
            </div>

            {/* Nav */}
            <nav className="flex flex-wrap gap-6">
              {navLinks.map((link) => (
                <Link key={link.href} href={link.href}>
                  <span className="nav-link" style={{ fontSize: "0.72rem" }}>
                    {link.label}
                  </span>
                </Link>
              ))}
            </nav>

            {/* Contact */}
            <div
              style={{
                fontFamily: "'Montserrat', sans-serif",
                fontWeight: 300,
                fontSize: "0.75rem",
                color: "rgba(255,255,255,0.45)",
                lineHeight: 1.8,
              }}
            >
              <p>info@patrickfink.com</p>
              <p>Los Angeles, CA</p>
            </div>
          </div>

          <div
            style={{
              marginTop: "2.5rem",
              paddingTop: "1.5rem",
              borderTop: "1px solid rgba(255,255,255,0.05)",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: "0.5rem",
            }}
          >
            <p
              style={{
                fontFamily: "'Montserrat', sans-serif",
                fontWeight: 300,
                fontSize: "0.68rem",
                color: "rgba(255,255,255,0.3)",
                letterSpacing: "0.05em",
              }}
            >
              © {new Date().getFullYear()} Patrick Fink Photography. All rights reserved.
            </p>
            <p
              style={{
                fontFamily: "'Montserrat', sans-serif",
                fontWeight: 300,
                fontSize: "0.68rem",
                color: "rgba(255,255,255,0.2)",
                letterSpacing: "0.05em",
              }}
            >
              Los Angeles · New York · Worldwide
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
