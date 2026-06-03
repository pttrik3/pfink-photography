/* ============================================================
   HEADSHOTS PAGE
   Design: Cinematic Dark / LA Noir
   Layout: 4-category grid (2×2), click opens category lightbox
   Below gallery: Full pricing section
   ============================================================ */

import { useEffect, useRef, useState, useCallback } from "react";

// ── Photo assets ──────────────────────────────────────────────
const R2_BASE = "https://pub-f887d7fd2fe441ecb02bee0d82d10831.r2.dev/fink-photography/client/images";
const H1 = `${R2_BASE}/headshots/corporate/1-corp.jpg`;  // Blazer / striped shirt
const H1b = `${R2_BASE}/headshots/corporate/2-corp.jpg`;  // Second corporate
const H1c = `${R2_BASE}/headshots/corporate/3-corp.jpg`;  // Third corporate
const H2 = `${R2_BASE}/headshots/editorial/1-editorial.jpg`;   // Black tie-front top
const H3 = `${R2_BASE}/headshots/lifestyle/3-lifestyle.jpg`;   // Bookshelf / moody
const H3b = `${R2_BASE}/headshots/lifestyle/2-lifestyle.jpg`;   // Second lifestyle
const H4 = `${R2_BASE}/headshots/actor-branding/1-actor-branding.jpg`; // Tan top / natural smile
const HBW = `${R2_BASE}/headshots/lifestyle/3-lifestyle.jpg`;  // B&W man with glasses

// ── Categories ────────────────────────────────────────────────
interface Category {
  id: string;
  title: string;
  subtitle: string;
  cover: string;
  photos: string[];
}

const categories: Category[] = [
  {
    id: "executive",
    title: "Executive Portrait",
    subtitle: "Corporate · Professional · LinkedIn",
    cover: H1,
    photos: [H1, H1b, H1c],
  },
  {
    id: "actor",
    title: "Actor / Branding",
    subtitle: "Casting · Personal Brand · Performers",
    cover: H4,
    photos: [H4, H4],
  },
  {
    id: "lifestyle",
    title: "Lifestyle Portrait",
    subtitle: "Natural · Relaxed · Authentic",
    cover: H3,
    photos: [H3, H3b],
  },
  {
    id: "editorial",
    title: "Editorial",
    subtitle: "Fashion · Creative · Magazine",
    cover: H2,
    photos: [H2, H2],
  },
];

// ── Pricing data ──────────────────────────────────────────────
const packages = [
  {
    name: "Mini Session",
    price: "$75",
    duration: "15–20 min",
    looks: "1",
    finalImages: "1",
    description: "A quick, simple session for anyone who needs one clean professional photo.",
    includes: [
      "15–20 minute session",
      "One look / outfit",
      "Simple background or natural light",
      "One fully edited final image",
      "Online proof gallery",
    ],
    extra: "Additional edited images: $30 each",
    highlight: false,
  },
  {
    name: "Simple Session",
    price: "$125",
    duration: "30 min",
    looks: "1",
    finalImages: "1",
    description: "Best for LinkedIn, websites, staff bios, therapists, coaches, and recovery professionals.",
    includes: [
      "30-minute session",
      "One look / outfit",
      "One location or simple backdrop",
      "Online proof gallery",
      "One fully edited final image",
    ],
    extra: "Additional edited images: $30 each",
    highlight: false,
  },
  {
    name: "Standard Session",
    price: "$225",
    duration: "60 min",
    looks: "2",
    finalImages: "3",
    description: "Best for actors, business owners, counselors, coaches, and professionals who want options.",
    includes: [
      "60-minute session",
      "Two looks / outfits",
      "Indoor or outdoor natural-light option",
      "Online proof gallery",
      "Three fully edited final images",
      "Light posing and direction throughout",
    ],
    extra: "Additional edited images: $25 each",
    highlight: true,
  },
  {
    name: "Actor / Branding Starter",
    price: "$325",
    duration: "Up to 90 min",
    looks: "3",
    finalImages: "5",
    description: "Best for actors, performers, entrepreneurs, therapists, speakers, and anyone who needs variety.",
    includes: [
      "Up to 90-minute session",
      "Three looks / outfits",
      "Indoor and / or outdoor setup",
      "Online proof gallery",
      "Five fully edited final images",
      "Guidance with expression, posing, and overall look",
    ],
    extra: "Additional edited images: $25 each",
    highlight: false,
  },
];

const addOns = [
  { item: "Rush delivery (within 48 hours)", price: "$50" },
  { item: "Additional edited images", price: "$25–$30 each" },
  { item: "Group / company headshots", price: "From $75/person (4-person min)" },
  { item: "Basic blemish cleanup", price: "Included" },
  { item: "Heavy retouching", price: "Quoted separately" },
];

// ── Component ─────────────────────────────────────────────────
export default function Headshots() {
  const revealRef = useRef<HTMLDivElement>(null);

  // Category lightbox state
  const [activeCategory, setActiveCategory] = useState<Category | null>(null);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const openCategory = (cat: Category) => {
    setActiveCategory(cat);
    setLightboxIndex(0);
  };
  const closeLightbox = () => setActiveCategory(null);
  const prevPhoto = useCallback(() => {
    if (!activeCategory) return;
    setLightboxIndex((i) => (i - 1 + activeCategory.photos.length) % activeCategory.photos.length);
  }, [activeCategory]);
  const nextPhoto = useCallback(() => {
    if (!activeCategory) return;
    setLightboxIndex((i) => (i + 1) % activeCategory.photos.length);
  }, [activeCategory]);

  // Scroll reveal
  useEffect(() => {
    const el = revealRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("visible")),
      { threshold: 0.08 }
    );
    el.querySelectorAll(".fade-up-on-scroll").forEach((e) => observer.observe(e));
    return () => observer.disconnect();
  }, []);

  // Lock body scroll when lightbox open
  useEffect(() => {
    document.body.style.overflow = activeCategory ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [activeCategory]);

  // Keyboard nav
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!activeCategory) return;
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") prevPhoto();
      if (e.key === "ArrowRight") nextPhoto();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [activeCategory, prevPhoto, nextPhoto]);

  return (
    <div ref={revealRef} style={{ background: "#111214", minHeight: "100vh" }}>

      {/* ── Page Header ── */}
      <div style={{ paddingTop: "120px", paddingBottom: "48px" }} className="container">
        <p
          className="fade-up-on-scroll"
          style={{
            fontFamily: "'Montserrat', sans-serif",
            fontWeight: 300,
            fontSize: "0.7rem",
            letterSpacing: "0.35em",
            textTransform: "uppercase",
            color: "#e8a020",
            marginBottom: "1rem",
          }}
        >
          Portfolio
        </p>
        <h1
          className="fade-up-on-scroll"
          style={{
            fontFamily: "'Oswald', sans-serif",
            fontWeight: 700,
            fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
            letterSpacing: "0.04em",
            textTransform: "uppercase",
            color: "#ffffff",
            lineHeight: 1,
            marginBottom: "1.25rem",
          }}
        >
          Headshots
        </h1>
        <p
          className="fade-up-on-scroll"
          style={{
            fontFamily: "'Montserrat', sans-serif",
            fontWeight: 300,
            fontSize: "0.95rem",
            color: "rgba(255,255,255,0.5)",
            maxWidth: "520px",
            lineHeight: 1.7,
          }}
        >
          Click any category to view the full gallery.
        </p>
      </div>

      {/* ── 2×2 Category Grid ── */}
      <div
        className="container"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: "12px",
          paddingBottom: "80px",
        }}
      >
        {categories.map((cat, idx) => (
          <div
            key={cat.id}
            className="fade-up-on-scroll gallery-item"
            style={{
              animationDelay: `${idx * 80}ms`,
              cursor: "pointer",
              position: "relative",
              aspectRatio: "3/4",
              overflow: "hidden",
              background: "#1a1b1e",
            }}
            onClick={() => openCategory(cat)}
          >
            <img
              src={cat.cover}
              alt={cat.title}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                display: "block",
                transition: "transform 0.5s cubic-bezier(0.23, 1, 0.32, 1)",
              }}
            />
            {/* Overlay */}
            <div
              className="gallery-overlay"
              style={{
                position: "absolute",
                inset: 0,
                background: "linear-gradient(to top, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.18) 55%, transparent 100%)",
                opacity: 0,
                transition: "opacity 0.3s ease",
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-end",
                padding: "1.5rem",
              }}
            >
              {/* Amber left bar */}
              <div
                style={{
                  position: "absolute",
                  left: 0,
                  bottom: 0,
                  width: "3px",
                  background: "#e8a020",
                  height: "0%",
                  transition: "height 0.35s cubic-bezier(0.23, 1, 0.32, 1)",
                }}
                className="amber-bar"
              />
              <p
                style={{
                  fontFamily: "'Oswald', sans-serif",
                  fontWeight: 600,
                  fontSize: "clamp(1rem, 2.5vw, 1.4rem)",
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  color: "#ffffff",
                  transform: "translateY(8px)",
                  transition: "transform 0.3s ease",
                }}
                className="overlay-title"
              >
                {cat.title}
              </p>
            </div>


          </div>
        ))}
      </div>

      {/* ── Pricing Section ── */}
      <div
        style={{
          borderTop: "1px solid rgba(255,255,255,0.07)",
          paddingTop: "80px",
          paddingBottom: "80px",
          background: "#0e0f11",
        }}
      >
        <div className="container">
          {/* Section header */}
          <div className="fade-up-on-scroll" style={{ marginBottom: "56px" }}>
            <p
              style={{
                fontFamily: "'Montserrat', sans-serif",
                fontWeight: 300,
                fontSize: "0.7rem",
                letterSpacing: "0.35em",
                textTransform: "uppercase",
                color: "#e8a020",
                marginBottom: "0.75rem",
              }}
            >
              Sessions &amp; Rates
            </p>
            <h2
              style={{
                fontFamily: "'Oswald', sans-serif",
                fontWeight: 700,
                fontSize: "clamp(2rem, 5vw, 3.5rem)",
                letterSpacing: "0.04em",
                textTransform: "uppercase",
                color: "#ffffff",
                lineHeight: 1,
                marginBottom: "1.25rem",
              }}
            >
              Headshot Pricing
            </h2>
          </div>

          {/* Package cards */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
              gap: "20px",
              marginBottom: "56px",
            }}
          >
            {packages.map((pkg, idx) => (
              <div
                key={pkg.name}
                className="fade-up-on-scroll"
                style={{
                  animationDelay: `${idx * 80}ms`,
                  background: pkg.highlight ? "rgba(232,160,32,0.07)" : "rgba(255,255,255,0.03)",
                  border: pkg.highlight ? "1px solid rgba(232,160,32,0.35)" : "1px solid rgba(255,255,255,0.07)",
                  padding: "2rem",
                  position: "relative",
                }}
              >
                {pkg.highlight && (
                  <div
                    style={{
                      position: "absolute",
                      top: "-1px",
                      left: "2rem",
                      background: "#e8a020",
                      padding: "0.2rem 0.75rem",
                      fontFamily: "'Montserrat', sans-serif",
                      fontWeight: 600,
                      fontSize: "0.6rem",
                      letterSpacing: "0.2em",
                      textTransform: "uppercase",
                      color: "#111214",
                    }}
                  >
                    Most Popular
                  </div>
                )}

                {/* Price */}
                <div style={{ marginBottom: "1.25rem" }}>
                  <span
                    style={{
                      fontFamily: "'Oswald', sans-serif",
                      fontWeight: 700,
                      fontSize: "2.5rem",
                      color: "#e8a020",
                      lineHeight: 1,
                    }}
                  >
                    {pkg.price}
                  </span>
                </div>

                {/* Name */}
                <h3
                  style={{
                    fontFamily: "'Oswald', sans-serif",
                    fontWeight: 600,
                    fontSize: "1.1rem",
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    color: "#ffffff",
                    marginBottom: "0.5rem",
                  }}
                >
                  {pkg.name}
                </h3>

                {/* Quick stats */}
                <div
                  style={{
                    display: "flex",
                    gap: "1rem",
                    marginBottom: "1rem",
                    flexWrap: "wrap",
                  }}
                >
                  {[
                    { label: "Duration", value: pkg.duration },
                    { label: "Looks", value: pkg.looks },
                    { label: "Final images", value: pkg.finalImages },
                  ].map((stat) => (
                    <div key={stat.label}>
                      <p
                        style={{
                          fontFamily: "'Montserrat', sans-serif",
                          fontWeight: 600,
                          fontSize: "0.75rem",
                          color: "#ffffff",
                        }}
                      >
                        {stat.value}
                      </p>
                      <p
                        style={{
                          fontFamily: "'Montserrat', sans-serif",
                          fontWeight: 300,
                          fontSize: "0.6rem",
                          letterSpacing: "0.15em",
                          textTransform: "uppercase",
                          color: "rgba(255,255,255,0.35)",
                        }}
                      >
                        {stat.label}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Description */}
                <p
                  style={{
                    fontFamily: "'Montserrat', sans-serif",
                    fontWeight: 300,
                    fontSize: "0.8rem",
                    color: "rgba(255,255,255,0.5)",
                    lineHeight: 1.65,
                    marginBottom: "1.25rem",
                    borderTop: "1px solid rgba(255,255,255,0.07)",
                    paddingTop: "1rem",
                  }}
                >
                  {pkg.description}
                </p>

                {/* Includes list */}
                <ul style={{ listStyle: "none", padding: 0, margin: "0 0 1rem 0" }}>
                  {pkg.includes.map((item) => (
                    <li
                      key={item}
                      style={{
                        fontFamily: "'Montserrat', sans-serif",
                        fontWeight: 300,
                        fontSize: "0.78rem",
                        color: "rgba(255,255,255,0.65)",
                        lineHeight: 1.6,
                        paddingLeft: "1rem",
                        position: "relative",
                        marginBottom: "0.25rem",
                      }}
                    >
                      <span
                        style={{
                          position: "absolute",
                          left: 0,
                          color: "#e8a020",
                          fontWeight: 700,
                        }}
                      >
                        —
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>

                {/* Extra images note */}
                <p
                  style={{
                    fontFamily: "'Montserrat', sans-serif",
                    fontWeight: 300,
                    fontSize: "0.7rem",
                    color: "rgba(255,255,255,0.35)",
                    borderTop: "1px solid rgba(255,255,255,0.06)",
                    paddingTop: "0.75rem",
                    marginTop: "0.5rem",
                  }}
                >
                  {pkg.extra}
                </p>
              </div>
            ))}
          </div>

          {/* Add-ons */}
          <div
            className="fade-up-on-scroll"
            style={{
              background: "rgba(255,255,255,0.02)",
              border: "1px solid rgba(255,255,255,0.07)",
              padding: "2rem",
              marginBottom: "48px",
            }}
          >
            <h3
              style={{
                fontFamily: "'Oswald', sans-serif",
                fontWeight: 600,
                fontSize: "1rem",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "#ffffff",
                marginBottom: "1.25rem",
              }}
            >
              Add-Ons
            </h3>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
                gap: "0.75rem",
              }}
            >
              {addOns.map((ao) => (
                <div
                  key={ao.item}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "baseline",
                    gap: "1rem",
                    borderBottom: "1px solid rgba(255,255,255,0.05)",
                    paddingBottom: "0.6rem",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "'Montserrat', sans-serif",
                      fontWeight: 300,
                      fontSize: "0.8rem",
                      color: "rgba(255,255,255,0.6)",
                    }}
                  >
                    {ao.item}
                  </span>
                  <span
                    style={{
                      fontFamily: "'Montserrat', sans-serif",
                      fontWeight: 600,
                      fontSize: "0.8rem",
                      color: "#e8a020",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {ao.price}
                  </span>
                </div>
              ))}
            </div>
          </div>


        </div>
      </div>

      {/* ── Category Lightbox ── */}
      {activeCategory && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 1000,
            background: "rgba(0,0,0,0.95)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            animation: "fadeIn 0.25s ease",
          }}
          onClick={closeLightbox}
        >
          {/* Close */}
          <button
            onClick={closeLightbox}
            style={{
              position: "absolute",
              top: "1.5rem",
              right: "1.5rem",
              background: "none",
              border: "none",
              color: "rgba(255,255,255,0.7)",
              fontSize: "1.75rem",
              cursor: "pointer",
              zIndex: 10,
              lineHeight: 1,
              padding: "0.5rem",
              transition: "color 0.2s",
            }}
            aria-label="Close"
          >
            ✕
          </button>

          {/* Category label */}
          <div
            style={{
              position: "absolute",
              top: "1.5rem",
              left: "50%",
              transform: "translateX(-50%)",
              textAlign: "center",
              pointerEvents: "none",
            }}
          >
            <p
              style={{
                fontFamily: "'Oswald', sans-serif",
                fontWeight: 600,
                fontSize: "0.85rem",
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "#ffffff",
              }}
            >
              {activeCategory.title}
            </p>
          </div>

          {/* Image */}
          <div
            style={{ maxWidth: "90vw", maxHeight: "85vh", position: "relative" }}
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={activeCategory.photos[lightboxIndex]}
              alt={`${activeCategory.title} ${lightboxIndex + 1}`}
              style={{
                maxWidth: "90vw",
                maxHeight: "85vh",
                objectFit: "contain",
                display: "block",
                boxShadow: "0 32px 80px rgba(0,0,0,0.6)",
              }}
            />
          </div>

          {/* Prev / Next — only show if more than 1 photo */}
          {activeCategory.photos.length > 1 && (
            <>
              <button
                onClick={(e) => { e.stopPropagation(); prevPhoto(); }}
                style={{
                  position: "absolute",
                  left: "1.25rem",
                  top: "50%",
                  transform: "translateY(-50%)",
                  background: "rgba(255,255,255,0.08)",
                  border: "1px solid rgba(255,255,255,0.15)",
                  color: "#ffffff",
                  width: "48px",
                  height: "48px",
                  borderRadius: "50%",
                  cursor: "pointer",
                  fontSize: "1.1rem",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transition: "background 0.2s",
                }}
                aria-label="Previous"
              >
                ←
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); nextPhoto(); }}
                style={{
                  position: "absolute",
                  right: "1.25rem",
                  top: "50%",
                  transform: "translateY(-50%)",
                  background: "rgba(255,255,255,0.08)",
                  border: "1px solid rgba(255,255,255,0.15)",
                  color: "#ffffff",
                  width: "48px",
                  height: "48px",
                  borderRadius: "50%",
                  cursor: "pointer",
                  fontSize: "1.1rem",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transition: "background 0.2s",
                }}
                aria-label="Next"
              >
                →
              </button>
            </>
          )}

          {/* Share & Counter Row */}
          <div
            style={{
              position: "absolute",
              bottom: "1.5rem",
              left: "1.5rem",
              right: "1.5rem",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            {/* Instagram Share */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                const shareText = `Check out this photo from @pfink.photography`;
                const shareUrl = `https://instagram.com/pfink.photography`;
                window.open(`https://www.instagram.com/`, '_blank');
              }}
              style={{
                background: "rgba(255,255,255,0.08)",
                border: "1px solid rgba(255,255,255,0.15)",
                color: "#ffffff",
                padding: "0.5rem 1rem",
                borderRadius: "4px",
                cursor: "pointer",
                fontFamily: "'Montserrat', sans-serif",
                fontSize: "0.75rem",
                fontWeight: 500,
                letterSpacing: "0.1em",
                transition: "all 0.2s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(255,255,255,0.15)";
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.3)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "rgba(255,255,255,0.08)";
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)";
              }}
              aria-label="Share on Instagram"
            >
              📸 SHARE @PFINK.PHOTOGRAPHY
            </button>

            {/* Counter */}
            <div
              style={{
                fontFamily: "'Montserrat', sans-serif",
                fontWeight: 300,
                fontSize: "0.72rem",
                letterSpacing: "0.15em",
                color: "rgba(255,255,255,0.4)",
              }}
            >
              {lightboxIndex + 1} / {activeCategory.photos.length}
            </div>
          </div>
        </div>
      )}

      {/* Hover CSS */}
      <style>{`
        .gallery-item:hover img { transform: scale(1.04); }
        .gallery-item:hover .gallery-overlay { opacity: 1 !important; }
        .gallery-item:hover .amber-bar { height: 100% !important; }
        .gallery-item:hover .overlay-subtitle,
        .gallery-item:hover .overlay-title,
        .gallery-item:hover .overlay-count { transform: translateY(0) !important; }
        @keyframes fadeIn { from { opacity: 0 } to { opacity: 1 } }
      `}</style>
    </div>
  );
}
