/* ============================================================
   HOME PAGE
   Design: Cinematic Dark / LA Noir
   Hero: Full-viewport LA drone image, dark overlay, Oswald title
   Sections: Portfolio previews (Headshots, Fine Art, Street), About, CTA
   ============================================================ */

import { useEffect, useRef } from "react";
import { Link } from "wouter";

const LA_DRONE = "/manus-storage/121_IGPICPOSTJPG_cc453e65.webp";
const HEADSHOT_1 = "/manus-storage/B_2PMD08259_EH_PART2_CLRFX_5dafd72e.webp";
const FINEART_1 = "/manus-storage/99_IGPICPOSTJPG_5d89d422.webp";
const STREET_1 = "/manus-storage/110_IGPICPOSTJPG_ffa5cdd9.jpg";
const HEADSHOT_3 = "/manus-storage/PMD08322_EH_PART2_ccef7b17.webp";
const FINEART_2 = "/manus-storage/5_IGPICPOSTJPG_a9f8e92b.jpg";
const STREET_2 = "/manus-storage/30_IGPICPOSTJPEG_28f4f68e.webp";

const sections = [
  {
    href: "/headshots",
    label: "Headshots",
    description: "Corporate, editorial, and actor headshots. Studio or location.",
    image: HEADSHOT_1,
  },
  {
    href: "/fine-art",
    label: "Fine Art",
    description: "Limited edition prints. Available for purchase.",
    image: FINEART_2,
  },
  {
    href: "/street",
    label: "Street",
    description: "Los Angeles. Unposed. Unfiltered.",
    image: STREET_1,
  },
];

export default function Home() {
  const revealRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = revealRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.1 }
    );
    el.querySelectorAll(".fade-up-on-scroll").forEach((e) => observer.observe(e));
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={revealRef}>
      {/* ── Hero ── */}
      <section
        style={{
          position: "relative",
          height: "100vh",
          minHeight: "600px",
          overflow: "hidden",
        }}
      >
        {/* Background image */}
        <img
          src={LA_DRONE}
          alt="Los Angeles aerial"
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center 40%",
          }}
        />

        {/* Dark overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to bottom, rgba(17,18,20,0.45) 0%, rgba(17,18,20,0.2) 40%, rgba(17,18,20,0.75) 80%, rgba(17,18,20,1) 100%)",
          }}
        />

        {/* Hero content */}
        <div
          style={{
            position: "absolute",
            bottom: "12%",
            left: 0,
            right: 0,
            padding: "0 1.5rem",
          }}
          className="container"
        >
          <div className="fade-up" style={{ animationDelay: "100ms" }}>
            {/* Camera logo — white tint, subtle, above the title */}
            <img
              src="/manus-storage/PFP_LOGO1_white_0785839d.png"
              alt="Patrick Fink Photography"
              style={{
                height: "64px",
                width: "auto",
                
                opacity: 0.55,
                marginBottom: "1.25rem",
                display: "block",
              }}
            />
            <p
              style={{
                fontFamily: "'Montserrat', sans-serif",
                fontWeight: 300,
                fontSize: "0.7rem",
                letterSpacing: "0.4em",
                textTransform: "uppercase",
                color: "#e8a020",
                marginBottom: "1rem",
              }}
            >
              Los Angeles, California
            </p>
            <h1
              style={{
                fontFamily: "'Oswald', sans-serif",
                fontWeight: 700,
                fontSize: "clamp(3rem, 8vw, 7rem)",
                lineHeight: 0.95,
                textTransform: "uppercase",
                color: "#ffffff",
                letterSpacing: "0.02em",
                marginBottom: "1.5rem",
              }}
            >
              Patrick
              <br />
              Fink
            </h1>
            <span className="amber-line" style={{ marginBottom: "1.25rem" }} />
            <p
              style={{
                fontFamily: "'Montserrat', sans-serif",
                fontWeight: 300,
                fontSize: "0.85rem",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.7)",
                marginTop: "1rem",
                marginBottom: "2rem",
              }}
            >
              Photography
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/headshots">
                <span className="btn-amber">View Work</span>
              </Link>
              <Link href="/merchandise">
                <span
                  className="btn-amber"
                  style={{
                    borderColor: "rgba(255,255,255,0.3)",
                    color: "rgba(255,255,255,0.7)",
                  }}
                >
                  Shop Prints
                </span>
              </Link>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div
          style={{
            position: "absolute",
            bottom: "2rem",
            right: "2rem",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "0.5rem",
          }}
        >
          <div
            style={{
              width: "1px",
              height: "48px",
              background: "linear-gradient(to bottom, rgba(232,160,32,0.8), transparent)",
              animation: "pulse 2s ease-in-out infinite",
            }}
          />
          <p
            style={{
              fontFamily: "'Montserrat', sans-serif",
              fontWeight: 300,
              fontSize: "0.6rem",
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.4)",
              writingMode: "vertical-rl",
            }}
          >
            Scroll
          </p>
        </div>
      </section>

      {/* ── Portfolio Sections ── */}
      <section style={{ padding: "6rem 0" }}>
        <div className="container">
          <div className="fade-up-on-scroll" style={{ marginBottom: "4rem" }}>
            <p
              style={{
                fontFamily: "'Montserrat', sans-serif",
                fontWeight: 300,
                fontSize: "0.68rem",
                letterSpacing: "0.4em",
                textTransform: "uppercase",
                color: "#e8a020",
                marginBottom: "0.75rem",
              }}
            >
              Portfolio
            </p>
            <h2
              style={{
                fontFamily: "'Oswald', sans-serif",
                fontWeight: 600,
                fontSize: "clamp(1.8rem, 4vw, 3rem)",
                textTransform: "uppercase",
                letterSpacing: "0.06em",
                color: "#ffffff",
              }}
            >
              The Work
            </h2>
          </div>

          {/* Three portfolio categories */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "1.5px",
            }}
          >
            {sections.map((section, i) => (
              <Link key={section.href} href={section.href}>
                <div
                  className="gallery-item fade-up-on-scroll"
                  style={{
                    aspectRatio: "3/4",
                    transitionDelay: `${i * 80}ms`,
                  }}
                >
                  <img src={section.image} alt={section.label} />
                  <div className="overlay" />
                  <div className="overlay-text">
                    <p
                      style={{
                        fontFamily: "'Montserrat', sans-serif",
                        fontWeight: 300,
                        fontSize: "0.65rem",
                        letterSpacing: "0.35em",
                        textTransform: "uppercase",
                        color: "#e8a020",
                        marginBottom: "0.4rem",
                      }}
                    >
                      {section.description}
                    </p>
                    <p
                      style={{
                        fontFamily: "'Oswald', sans-serif",
                        fontWeight: 600,
                        fontSize: "1.6rem",
                        textTransform: "uppercase",
                        letterSpacing: "0.08em",
                        color: "#ffffff",
                      }}
                    >
                      {section.label}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>


      {/* ── About ── */}
      <section
        style={{
          padding: "6rem 0",
          borderTop: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        <div className="container">
          <div
          style={{
            maxWidth: "640px",
          }}
          >
            <div className="fade-up-on-scroll">
              <p
                style={{
                  fontFamily: "'Montserrat', sans-serif",
                  fontWeight: 300,
                  fontSize: "0.68rem",
                  letterSpacing: "0.4em",
                  textTransform: "uppercase",
                  color: "#e8a020",
                  marginBottom: "0.75rem",
                }}
              >
                About
              </p>
              <h2
                style={{
                  fontFamily: "'Oswald', sans-serif",
                  fontWeight: 600,
                  fontSize: "clamp(1.8rem, 3vw, 2.5rem)",
                  textTransform: "uppercase",
                  letterSpacing: "0.06em",
                  color: "#ffffff",
                  marginBottom: "1.5rem",
                }}
              >
                Based in Los Angeles
              </h2>
              <span className="amber-line" style={{ marginBottom: "1.5rem" }} />
              <p
                style={{
                  fontFamily: "'Montserrat', sans-serif",
                  fontWeight: 300,
                  fontSize: "0.9rem",
                  lineHeight: 1.9,
                  color: "rgba(255,255,255,0.6)",
                  marginBottom: "1.25rem",
                }}
              >
                Patrick Fink is a Los Angeles-based photographer working across headshots, fine art, and street photography. He shoots what he sees. Sometimes that's a face that tells a story. Sometimes it's a city that doesn't care if you're watching.
              </p>
              <p
                style={{
                  fontFamily: "'Montserrat', sans-serif",
                  fontWeight: 300,
                  fontSize: "0.9rem",
                  lineHeight: 1.9,
                  color: "rgba(255,255,255,0.6)",
                  marginBottom: "2rem",
                }}
              >
                Available for commercial and editorial work. Limited edition fine art prints available in the shop.
              </p>
              <Link href="/headshots">
                <span className="btn-amber">Book a Session</span>
              </Link>
            </div>

          </div>
        </div>
      </section>

      {/* ── Shop CTA ── */}
      <section
        style={{
          padding: "5rem 0",
          background: "rgba(232,160,32,0.04)",
          borderTop: "1px solid rgba(232,160,32,0.15)",
          borderBottom: "1px solid rgba(232,160,32,0.15)",
        }}
      >
        <div className="container fade-up-on-scroll" style={{ textAlign: "center" }}>
          <p
            style={{
              fontFamily: "'Montserrat', sans-serif",
              fontWeight: 300,
              fontSize: "0.68rem",
              letterSpacing: "0.4em",
              textTransform: "uppercase",
              color: "#e8a020",
              marginBottom: "1rem",
            }}
          >
            Limited Edition
          </p>
          <h2
            style={{
              fontFamily: "'Oswald', sans-serif",
              fontWeight: 600,
              fontSize: "clamp(1.8rem, 4vw, 3rem)",
              textTransform: "uppercase",
              letterSpacing: "0.06em",
              color: "#ffffff",
              marginBottom: "1rem",
            }}
          >
            Prints & Merchandise
          </h2>
          <p
            style={{
              fontFamily: "'Montserrat', sans-serif",
              fontWeight: 300,
              fontSize: "0.9rem",
              color: "rgba(255,255,255,0.5)",
              maxWidth: "480px",
              margin: "0 auto 2rem",
              lineHeight: 1.8,
            }}
          >
            Museum-quality archival prints. Apparel. Each piece is numbered and signed.
          </p>
          <Link href="/merchandise">
            <span className="btn-amber">Visit the Shop</span>
          </Link>
        </div>
      </section>
    </div>
  );
}
