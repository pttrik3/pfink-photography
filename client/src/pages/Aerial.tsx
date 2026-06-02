import { useState, useCallback, useEffect, useRef } from "react";

const R2_BASE = "https://pub-f887d7fd2fe441ecb02bee0d82d10831.r2.dev/client/images";

export default function Aerial() {
  const [activeCategory, setActiveCategory] = useState<any>(null);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const revealRef = useRef<HTMLDivElement>(null);

  // Aerial photos from R2 bucket
  const categories = [
    {
      id: "aerial",
      title: "Aerial",
      cover: `${R2_BASE}/aerial-drone/1-aerial-drone.jpg`,
      photos: [
        `${R2_BASE}/aerial-drone/1-aerial-drone.jpg`,
        `${R2_BASE}/aerial-drone/2-aerial-drone.jpg`,
        `${R2_BASE}/aerial-drone/3-aerial-drone.jpg`,
        `${R2_BASE}/aerial-drone/4-aerial-drone.jpg`,
        `${R2_BASE}/aerial-drone/5-aerial-drone.jpg`,
      ],
    },
  ];

  const openCategory = (cat: any) => {
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

  useEffect(() => {
    document.body.style.overflow = activeCategory ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [activeCategory]);

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
      {/* Page Header */}
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
          Aerial
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
          Click to view the full gallery.
        </p>
      </div>

      {/* Gallery Grid */}
      <div
        className="container"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
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

      {/* Lightbox */}
      {activeCategory && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.95)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 9999,
            animation: "fadeIn 0.3s ease",
          }}
          onClick={closeLightbox}
        >
          <button
            onClick={closeLightbox}
            style={{
              position: "absolute",
              top: "2rem",
              right: "2rem",
              background: "none",
              border: "none",
              color: "#ffffff",
              fontSize: "2rem",
              cursor: "pointer",
              zIndex: 10000,
            }}
          >
            ✕
          </button>

          <img
            src={activeCategory.photos[lightboxIndex]}
            alt="Lightbox"
            style={{
              maxWidth: "90vw",
              maxHeight: "90vh",
              objectFit: "contain",
              animation: "fadeIn 0.3s ease",
            }}
            onClick={(e) => e.stopPropagation()}
          />

          <button
            onClick={(e) => { e.stopPropagation(); prevPhoto(); }}
            style={{
              position: "absolute",
              left: "2rem",
              background: "rgba(255,255,255,0.1)",
              border: "1px solid rgba(255,255,255,0.3)",
              color: "#ffffff",
              padding: "0.75rem 1rem",
              cursor: "pointer",
              fontSize: "1.2rem",
              zIndex: 10000,
            }}
          >
            ←
          </button>

          <button
            onClick={(e) => { e.stopPropagation(); nextPhoto(); }}
            style={{
              position: "absolute",
              right: "2rem",
              background: "rgba(255,255,255,0.1)",
              border: "1px solid rgba(255,255,255,0.3)",
              color: "#ffffff",
              padding: "0.75rem 1rem",
              cursor: "pointer",
              fontSize: "1.2rem",
              zIndex: 10000,
            }}
          >
            →
          </button>

          <div
            style={{
              position: "absolute",
              bottom: "2rem",
              left: "2rem",
              right: "2rem",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              zIndex: 10000,
            }}
          >
            <button
              onClick={(e) => {
                e.stopPropagation();
                window.open('https://www.instagram.com/pfink.photography', '_blank');
              }}
              style={{
                background: "rgba(255,255,255,0.1)",
                border: "1px solid rgba(255,255,255,0.3)",
                color: "#ffffff",
                padding: "0.5rem 1rem",
                borderRadius: "4px",
                cursor: "pointer",
                fontSize: "0.75rem",
                fontWeight: 500,
                letterSpacing: "0.1em",
                transition: "all 0.2s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(255,255,255,0.15)";
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.5)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "rgba(255,255,255,0.1)";
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.3)";
              }}
            >
              📸 SHARE @PFINK.PHOTOGRAPHY
            </button>
            <div style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.9rem" }}>
              {lightboxIndex + 1} / {activeCategory.photos.length}
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .gallery-item:hover .gallery-overlay {
          opacity: 1;
        }
        .gallery-item:hover .amber-bar {
          height: 100%;
        }
        .gallery-item:hover img {
          transform: scale(1.05);
        }
      `}</style>
    </div>
  );
}
