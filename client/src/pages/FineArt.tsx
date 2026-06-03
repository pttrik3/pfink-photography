/* ============================================================
   FINE ART PAGE
   Design: Cinematic Dark / LA Noir
   Layout: Uniform gallery grid — 3-column desktop
   Lightbox: full-screen with prev/next navigation + keyboard support
   ============================================================ */

import { useEffect, useRef, useState, useCallback } from "react";

const R2_BASE = "https://pub-f887d7fd2fe441ecb02bee0d82d10831.r2.dev/client/images";

const photos = [
  { src: `${R2_BASE}/fine-art/bw/1-fineart.jpg`, title: "1",  caption: "" },
  { src: `${R2_BASE}/fine-art/bw/18-fineart.jpg`, title: "2",  caption: "" },
  { src: `${R2_BASE}/fine-art/bw/19-fineart.jpeg`, title: "3",  caption: "" },
  { src: `${R2_BASE}/fine-art/bw/21-fineart.jpg`, title: "4",  caption: "" },
  { src: `${R2_BASE}/fine-art/bw/32-fineart.jpg`, title: "5",  caption: "" },
  { src: `${R2_BASE}/fine-art/bw/33-fineart.jpg`, title: "6",  caption: "" },
  { src: `${R2_BASE}/fine-art/bw/34-fineart.jpg`, title: "7",  caption: "" },
  { src: `${R2_BASE}/fine-art/bw/41-fineart.jpg`, title: "8",  caption: "" },
  { src: `${R2_BASE}/fine-art/color/12-fineart.jpg`, title: "9",  caption: "" },
  { src: `${R2_BASE}/fine-art/color/13-fineart.jpg`, title: "10",  caption: "" },
  { src: `${R2_BASE}/fine-art/color/17-fineart.jpg`, title: "11",  caption: "" },
  { src: `${R2_BASE}/fine-art/color/22-fineart.jpg`, title: "12",  caption: "" },
  { src: `${R2_BASE}/fine-art/color/23-fineart.jpg`, title: "13",  caption: "" },
  { src: `${R2_BASE}/fine-art/color/28-fineart.jpg`, title: "14",  caption: "" },
  { src: `${R2_BASE}/fine-art/color/47-fineart.jpg`, title: "15",  caption: "" },
  

export default function FineArt() {
  const revealRef = useRef<HTMLDivElement>(null);
  const [modalIndex, setModalIndex] = useState<number | null>(null);

  const openModal = (i: number) => setModalIndex(i);
  const closeModal = () => setModalIndex(null);
  const prev = useCallback(() => setModalIndex((i) => (i !== null ? (i - 1 + photos.length) % photos.length : null)), []);
  const next = useCallback(() => setModalIndex((i) => (i !== null ? (i + 1) % photos.length : null)), []);

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
    document.body.style.overflow = modalIndex !== null ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [modalIndex]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (modalIndex === null) return;
      if (e.key === "Escape") closeModal();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [modalIndex, prev, next]);

  const modal = modalIndex !== null ? photos[modalIndex] : null;

  return (
    <div ref={revealRef} style={{ paddingTop: "72px" }}>
      {/* Page Header */}
      <div style={{ padding: "5rem 0 3rem", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="container">
          <div className="fade-up-on-scroll">
            <p style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 300, fontSize: "0.68rem", letterSpacing: "0.4em", textTransform: "uppercase", color: "#e8a020", marginBottom: "0.75rem" }}>
              Portfolio
            </p>
            <h1 style={{ fontFamily: "'Oswald', sans-serif", fontWeight: 700, fontSize: "clamp(2.5rem, 6vw, 5rem)", textTransform: "uppercase", letterSpacing: "0.04em", color: "#ffffff", marginBottom: "1rem" }}>
              Fine Art
            </h1>
            <span className="amber-line" style={{ marginBottom: "1.25rem" }} />
            <p style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 300, fontSize: "0.85rem", color: "rgba(255,255,255,0.5)", maxWidth: "520px", lineHeight: 1.9, marginTop: "1rem" }}>
              Landscapes, aerial work, and studies in light and form. Available as fine art prints.
            </p>
          </div>
        </div>
      </div>

      {/* Gallery Grid */}
      <div className="container" style={{ padding: "4rem 1.5rem" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(45vw, 280px), 1fr))", gap: "12px" }}>
          {photos.map((photo, i) => (
            <div
              key={i}
              className="gallery-item fade-up-on-scroll"
              style={{ aspectRatio: "3/2", transitionDelay: `${(i % 9) * 50}ms`, cursor: "pointer" }}
              onClick={() => openModal(i)}
            >
              <img src={photo.src} alt={photo.title} />
              <div className="overlay" />
              <div className="overlay-text">
                <p style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 300, fontSize: "0.62rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "#e8a020", marginBottom: "0.3rem" }}>
                  {photo.caption}
                </p>
                <p style={{ fontFamily: "'Oswald', sans-serif", fontWeight: 500, fontSize: "1.1rem", textTransform: "uppercase", letterSpacing: "0.08em", color: "#ffffff" }}>
                  {photo.title}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Print CTA */}
      <div style={{ padding: "5rem 0", borderTop: "1px solid rgba(255,255,255,0.06)", textAlign: "center" }}>
        <div className="container fade-up-on-scroll">
          <p style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 300, fontSize: "0.68rem", letterSpacing: "0.4em", textTransform: "uppercase", color: "#e8a020", marginBottom: "1rem" }}>
            Prints Available
          </p>
          <h2 style={{ fontFamily: "'Oswald', sans-serif", fontWeight: 600, fontSize: "clamp(1.5rem, 3vw, 2.5rem)", textTransform: "uppercase", letterSpacing: "0.06em", color: "#ffffff", marginBottom: "1rem" }}>
            Own the Work
          </h2>
          <p style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 300, fontSize: "0.85rem", color: "rgba(255,255,255,0.5)", maxWidth: "400px", margin: "0 auto 2rem", lineHeight: 1.8 }}>
            Select images are available as signed fine art prints. Inquire for sizing and pricing.
          </p>
          <a href="mailto:info@patrickfink.com" className="btn-amber">Inquire About Prints</a>
        </div>
      </div>

      {/* Lightbox */}
      {modal && (
        <div
          className="lightbox-backdrop"
          style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.97)", zIndex: 200, display: "flex", alignItems: "center", justifyContent: "center" }}
          onClick={closeModal}
        >
          {/* Prev */}
          <button
            onClick={(e) => { e.stopPropagation(); prev(); }}
            style={{ position: "absolute", left: "1.5rem", top: "50%", transform: "translateY(-50%)", background: "none", border: "1px solid rgba(255,255,255,0.15)", color: "rgba(255,255,255,0.7)", width: "2.75rem", height: "2.75rem", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", fontSize: "1.1rem", transition: "border-color 200ms, color 200ms", zIndex: 201 }}
            onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = "#e8a020"; (e.currentTarget as HTMLButtonElement).style.color = "#e8a020"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(255,255,255,0.15)"; (e.currentTarget as HTMLButtonElement).style.color = "rgba(255,255,255,0.7)"; }}
            aria-label="Previous photo"
          >
            ←
          </button>

          {/* Image */}
          <div
            style={{ position: "relative", maxWidth: "min(88vw, 1200px)", width: "100%", display: "flex", flexDirection: "column", padding: "0 4rem" }}
            onClick={(e) => e.stopPropagation()}
          >
            <img
              key={modalIndex}
              src={modal.src}
              alt={modal.title}
              className="lightbox-img"
              style={{ width: "100%", maxHeight: "80vh", objectFit: "contain", display: "block" }}
            />
            <div style={{ padding: "1rem 0 0", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <p style={{ fontFamily: "'Oswald', sans-serif", fontWeight: 500, fontSize: "1rem", textTransform: "uppercase", letterSpacing: "0.08em", color: "#ffffff" }}>
                  {modal.title}
                </p>
                {modal.caption && (
                  <p style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 300, fontSize: "0.7rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#e8a020" }}>
                    {modal.caption}
                  </p>
                )}
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "1.5rem" }}>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    window.open('https://www.instagram.com/pfink.photography', '_blank');
                  }}
                  style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 500, fontSize: "0.65rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "#ffffff", background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.15)", cursor: "pointer", padding: "0.4rem 0.8rem", borderRadius: "3px", transition: "all 150ms" }}
                  onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.15)"; (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(255,255,255,0.3)"; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.08)"; (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(255,255,255,0.15)"; }}
                >
                  📸 SHARE
                </button>
                <span style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 300, fontSize: "0.65rem", letterSpacing: "0.2em", color: "rgba(255,255,255,0.3)" }}>
                  {(modalIndex ?? 0) + 1} / {photos.length}
                </span>
                <button
                  onClick={closeModal}
                  style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 300, fontSize: "0.7rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(255,255,255,0.4)", background: "none", border: "none", cursor: "pointer", transition: "color 150ms" }}
                  onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.color = "#e8a020"; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.color = "rgba(255,255,255,0.4)"; }}
                >
                  Close ✕
                </button>
              </div>
            </div>
          </div>

          {/* Next */}
          <button
            onClick={(e) => { e.stopPropagation(); next(); }}
            style={{ position: "absolute", right: "1.5rem", top: "50%", transform: "translateY(-50%)", background: "none", border: "1px solid rgba(255,255,255,0.15)", color: "rgba(255,255,255,0.7)", width: "2.75rem", height: "2.75rem", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", fontSize: "1.1rem", transition: "border-color 200ms, color 200ms", zIndex: 201 }}
            onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = "#e8a020"; (e.currentTarget as HTMLButtonElement).style.color = "#e8a020"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(255,255,255,0.15)"; (e.currentTarget as HTMLButtonElement).style.color = "rgba(255,255,255,0.7)"; }}
            aria-label="Next photo"
          >
            →
          </button>

          {/* Close top-right */}
          <button
            onClick={closeModal}
            style={{ position: "absolute", top: "1.5rem", right: "1.5rem", background: "none", border: "none", color: "rgba(255,255,255,0.4)", fontSize: "1.4rem", cursor: "pointer", lineHeight: 1, transition: "color 150ms", zIndex: 201 }}
            onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.color = "#e8a020"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.color = "rgba(255,255,255,0.4)"; }}
            aria-label="Close lightbox"
          >
            ✕
          </button>
        </div>
      )}
    </div>
  );
}
