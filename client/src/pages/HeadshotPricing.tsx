// Design: Dark editorial photography portfolio — Noir/Industrial aesthetic
// Colors: #0a0a0a bg, #d4a843 amber accent, #ffffff primary text, #888 muted text
// Typography: Bebas Neue display, Inter body
// Layout: Full-width hero, asymmetric pricing cards, amber accent bars

import { useEffect, useRef } from "react";
import { Link } from "wouter";

const packages = [
  {
    name: "Mini Headshot Session",
    price: "$75",
    tagline: "One clean professional photo — fast and simple.",
    duration: "15–20 min",
    looks: "1 look / outfit",
    images: "1 fully edited final image",
    includes: [
      "15–20 minute session",
      "One look/outfit",
      "Simple background or natural light setting",
      "One fully edited final image",
      "Online proof gallery",
    ],
    addon: "Additional edited images: $30 each",
    highlight: false,
  },
  {
    name: "Simple Headshot Session",
    price: "$125",
    tagline: "LinkedIn, websites, staff bios, business profiles, recovery professionals, therapists, coaches.",
    duration: "30 min",
    looks: "1 look / outfit",
    images: "1 fully edited final image",
    includes: [
      "30-minute session",
      "One look/outfit",
      "One location or simple backdrop",
      "Online proof gallery",
      "One fully edited final image",
    ],
    addon: "Additional edited images: $30 each",
    highlight: false,
  },
  {
    name: "Standard Headshot Session",
    price: "$225",
    tagline: "Actors, business owners, counselors, coaches, creatives, and professionals who want options.",
    duration: "60 min",
    looks: "2 looks / outfits",
    images: "3 fully edited final images",
    includes: [
      "60-minute session",
      "Two looks/outfits",
      "Indoor or outdoor natural-light option",
      "Online proof gallery",
      "Three fully edited final images",
      "Light posing and direction throughout",
    ],
    addon: "Additional edited images: $25 each",
    highlight: true,
  },
  {
    name: "Actor / Branding Starter Session",
    price: "$325",
    tagline: "Actors, performers, entrepreneurs, therapists, speakers — casting, websites, social media, branding.",
    duration: "Up to 90 min",
    looks: "3 looks / outfits",
    images: "5 fully edited final images",
    includes: [
      "Up to 90-minute session",
      "Three looks/outfits",
      "Indoor and/or outdoor setup",
      "Online proof gallery",
      "Five fully edited final images",
      "Guidance with expression, posing, and overall look",
    ],
    addon: "Additional edited images: $25 each",
    highlight: false,
  },
];

const addons = [
  { label: "Rush delivery within 48 hours", price: "$50" },
  { label: "Additional edited images", price: "$25–$30 each" },
  { label: "Group / company headshots", price: "Starting at $75/person (4-person min)" },
  { label: "Basic blemish cleanup", price: "Included" },
  { label: "Heavy retouching", price: "Quoted separately" },
];

export default function HeadshotPricing() {
  const revealRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.08 }
    );
    const els = document.querySelectorAll(".fade-up-on-scroll");
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div style={{ background: "#0a0a0a", minHeight: "100vh", color: "#fff" }}>
      {/* Hero */}
      <div
        style={{
          borderBottom: "1px solid #1a1a1a",
          padding: "7rem 0 4rem",
          background: "linear-gradient(180deg, #111 0%, #0a0a0a 100%)",
        }}
      >
        <div className="container" style={{ maxWidth: "900px", margin: "0 auto", padding: "0 1.5rem" }}>
          <p
            style={{
              fontFamily: "'Bebas Neue', sans-serif",
              letterSpacing: "0.25em",
              fontSize: "0.75rem",
              color: "#d4a843",
              marginBottom: "1rem",
              textTransform: "uppercase",
            }}
          >
            Los Angeles, California
          </p>
          <h1
            style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: "clamp(3rem, 8vw, 6rem)",
              lineHeight: 0.95,
              letterSpacing: "0.02em",
              marginBottom: "1.5rem",
              color: "#fff",
            }}
          >
            Headshot
            <br />
            Sessions
          </h1>
          <div
            style={{
              width: "48px",
              height: "3px",
              background: "#d4a843",
              marginBottom: "2rem",
            }}
          />
          <p
            style={{
              fontSize: "1.1rem",
              lineHeight: 1.75,
              color: "#ccc",
              maxWidth: "640px",
            }}
          >
            Professional headshots should feel clean, confident, and real — not stiff, overdone, or like you were held
            hostage in front of a camera.
          </p>
          <p
            style={{
              fontSize: "1rem",
              lineHeight: 1.75,
              color: "#999",
              maxWidth: "640px",
              marginTop: "1rem",
            }}
          >
            I offer straightforward headshot sessions for actors, professionals, counselors, coaches, creatives, and
            anyone who needs a strong image that actually looks like them. My goal is to make the session comfortable,
            simple, and useful — especially for people who do not love being photographed.
          </p>
          <div style={{ marginTop: "2.5rem", display: "flex", gap: "1rem", flexWrap: "wrap" }}>
            <Link href="/headshots">
              <button
                style={{
                  fontFamily: "'Bebas Neue', sans-serif",
                  letterSpacing: "0.15em",
                  fontSize: "0.85rem",
                  padding: "0.75rem 2rem",
                  border: "1px solid #d4a843",
                  background: "transparent",
                  color: "#d4a843",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  (e.target as HTMLButtonElement).style.background = "#d4a843";
                  (e.target as HTMLButtonElement).style.color = "#0a0a0a";
                }}
                onMouseLeave={(e) => {
                  (e.target as HTMLButtonElement).style.background = "transparent";
                  (e.target as HTMLButtonElement).style.color = "#d4a843";
                }}
              >
                View Headshot Gallery
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* Pricing Cards */}
      <div className="container fade-up-on-scroll" style={{ maxWidth: "900px", margin: "0 auto", padding: "5rem 1.5rem" }}>
        <p
          style={{
            fontFamily: "'Bebas Neue', sans-serif",
            letterSpacing: "0.25em",
            fontSize: "0.75rem",
            color: "#d4a843",
            marginBottom: "3rem",
            textTransform: "uppercase",
          }}
        >
          Packages
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
          {packages.map((pkg, i) => (
            <div
              key={i}
              className="fade-up-on-scroll"
              style={{
                background: pkg.highlight ? "#111" : "#0d0d0d",
                border: pkg.highlight ? "1px solid #d4a843" : "1px solid #1a1a1a",
                padding: "2.5rem",
                position: "relative",
                transition: "border-color 0.2s ease",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLDivElement).style.borderColor = "#d4a843";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLDivElement).style.borderColor = pkg.highlight ? "#d4a843" : "#1a1a1a";
              }}
            >
              {pkg.highlight && (
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    height: "3px",
                    background: "#d4a843",
                  }}
                />
              )}
              {pkg.highlight && (
                <span
                  style={{
                    position: "absolute",
                    top: "1.5rem",
                    right: "1.5rem",
                    fontFamily: "'Bebas Neue', sans-serif",
                    letterSpacing: "0.15em",
                    fontSize: "0.7rem",
                    color: "#0a0a0a",
                    background: "#d4a843",
                    padding: "0.25rem 0.75rem",
                  }}
                >
                  Most Popular
                </span>
              )}

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  flexWrap: "wrap",
                  gap: "1rem",
                  marginBottom: "1.5rem",
                }}
              >
                <div>
                  <h2
                    style={{
                      fontFamily: "'Bebas Neue', sans-serif",
                      fontSize: "clamp(1.5rem, 3vw, 2rem)",
                      letterSpacing: "0.05em",
                      color: "#fff",
                      marginBottom: "0.5rem",
                    }}
                  >
                    {pkg.name}
                  </h2>
                  <p style={{ color: "#888", fontSize: "0.9rem", maxWidth: "480px", lineHeight: 1.6 }}>
                    {pkg.tagline}
                  </p>
                </div>
                <div style={{ textAlign: "right", flexShrink: 0 }}>
                  <span
                    style={{
                      fontFamily: "'Bebas Neue', sans-serif",
                      fontSize: "clamp(2rem, 4vw, 2.75rem)",
                      color: "#d4a843",
                      letterSpacing: "0.02em",
                    }}
                  >
                    {pkg.price}
                  </span>
                </div>
              </div>

              {/* Quick stats */}
              <div
                style={{
                  display: "flex",
                  gap: "2rem",
                  flexWrap: "wrap",
                  marginBottom: "1.5rem",
                  paddingBottom: "1.5rem",
                  borderBottom: "1px solid #1a1a1a",
                }}
              >
                {[
                  { label: "Duration", val: pkg.duration },
                  { label: "Looks", val: pkg.looks },
                  { label: "Final Images", val: pkg.images },
                ].map((stat) => (
                  <div key={stat.label}>
                    <p style={{ fontSize: "0.7rem", letterSpacing: "0.15em", color: "#555", textTransform: "uppercase", marginBottom: "0.25rem" }}>
                      {stat.label}
                    </p>
                    <p style={{ fontSize: "0.9rem", color: "#ccc" }}>{stat.val}</p>
                  </div>
                ))}
              </div>

              {/* Includes list */}
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                {pkg.includes.map((item, j) => (
                  <li key={j} style={{ display: "flex", alignItems: "flex-start", gap: "0.75rem", color: "#aaa", fontSize: "0.9rem" }}>
                    <span style={{ color: "#d4a843", marginTop: "2px", flexShrink: 0 }}>—</span>
                    {item}
                  </li>
                ))}
              </ul>

              <p style={{ marginTop: "1.25rem", fontSize: "0.8rem", color: "#555", fontStyle: "italic" }}>
                {pkg.addon}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Add-Ons */}
      <div
        className="fade-up-on-scroll"
        style={{
          borderTop: "1px solid #1a1a1a",
          background: "#0d0d0d",
        }}
      >
        <div className="container" style={{ maxWidth: "900px", margin: "0 auto", padding: "5rem 1.5rem" }}>
          <p
            style={{
              fontFamily: "'Bebas Neue', sans-serif",
              letterSpacing: "0.25em",
              fontSize: "0.75rem",
              color: "#d4a843",
              marginBottom: "2rem",
              textTransform: "uppercase",
            }}
          >
            Add-Ons
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
            {addons.map((item, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "1rem 0",
                  borderBottom: "1px solid #1a1a1a",
                  gap: "1rem",
                  flexWrap: "wrap",
                }}
              >
                <span style={{ color: "#ccc", fontSize: "0.95rem" }}>{item.label}</span>
                <span style={{ color: "#d4a843", fontFamily: "'Bebas Neue', sans-serif", letterSpacing: "0.05em", fontSize: "1rem", flexShrink: 0 }}>
                  {item.price}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Note About the Process */}
      <div
        className="fade-up-on-scroll"
        style={{
          borderTop: "1px solid #1a1a1a",
        }}
      >
        <div className="container" style={{ maxWidth: "900px", margin: "0 auto", padding: "5rem 1.5rem" }}>
          <p
            style={{
              fontFamily: "'Bebas Neue', sans-serif",
              letterSpacing: "0.25em",
              fontSize: "0.75rem",
              color: "#d4a843",
              marginBottom: "2rem",
              textTransform: "uppercase",
            }}
          >
            A Note About the Process
          </p>
          <p style={{ fontSize: "1.05rem", lineHeight: 1.8, color: "#ccc", maxWidth: "620px", marginBottom: "1.25rem" }}>
            You do not need to know how to pose. Most people don't. That is part of the job.
          </p>
          <p style={{ fontSize: "1rem", lineHeight: 1.8, color: "#999", maxWidth: "620px" }}>
            I will help guide you through the session so the final photos feel natural, professional, and usable. The
            goal is not to make you look like someone else. The goal is to get a clean, honest image that looks like you
            on a good day.
          </p>

          <div style={{ marginTop: "3rem" }}>
            <Link href="/headshots">
              <button
                style={{
                  fontFamily: "'Bebas Neue', sans-serif",
                  letterSpacing: "0.15em",
                  fontSize: "0.85rem",
                  padding: "0.9rem 2.5rem",
                  border: "none",
                  background: "#d4a843",
                  color: "#0a0a0a",
                  cursor: "pointer",
                  transition: "opacity 0.2s ease",
                }}
                onMouseEnter={(e) => { (e.target as HTMLButtonElement).style.opacity = "0.85"; }}
                onMouseLeave={(e) => { (e.target as HTMLButtonElement).style.opacity = "1"; }}
              >
                Book a Session
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
