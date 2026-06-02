/* ============================================================
   SHOP PAGE — Prints on Request
   Design: Cinematic Dark / LA Noir
   Layout: Centered inquiry form, no product grid
   ============================================================ */

import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

export default function Merchandise() {
  const revealRef = useRef<HTMLDivElement>(null);
  const [email, setEmail] = useState("");
  const [request, setRequest] = useState("");
  const [submitting, setSubmitting] = useState(false);

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !request.trim()) {
      toast.error("Please fill in both fields before submitting.");
      return;
    }
    setSubmitting(true);
    // Simulate submission — in production this would POST to an endpoint
    setTimeout(() => {
      setSubmitting(false);
      setEmail("");
      setRequest("");
      toast.success("Request received — Patrick will be in touch.", { duration: 5000 });
    }, 800);
  };

  return (
    <div ref={revealRef} style={{ paddingTop: "72px" }}>
      {/* Page Header */}
      <div
        style={{
          padding: "5rem 0 4rem",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        <div className="container">
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
              Shop
            </p>
            <h1
              style={{
                fontFamily: "'Oswald', sans-serif",
                fontWeight: 700,
                fontSize: "clamp(2.5rem, 6vw, 5rem)",
                textTransform: "uppercase",
                letterSpacing: "0.04em",
                color: "#ffffff",
                marginBottom: "1rem",
              }}
            >
              Prints
            </h1>
            <span className="amber-line" style={{ marginBottom: "1.5rem" }} />
            <p
              style={{
                fontFamily: "'Montserrat', sans-serif",
                fontWeight: 300,
                fontSize: "0.88rem",
                color: "rgba(255,255,255,0.55)",
                maxWidth: "540px",
                lineHeight: 2,
                marginTop: "1.25rem",
              }}
            >
              Prints are available upon request. Any image from the Fine Art or Street
              galleries can be produced as an archival print — including as a{" "}
              <span style={{ color: "#e8a020", fontWeight: 400 }}>
                black &amp; white print
              </span>{" "}
              for an additional fee. Describe what you're looking for below and Patrick
              will follow up with sizing, pricing, and availability.
            </p>
          </div>
        </div>
      </div>

      {/* Inquiry Form */}
      <div className="container" style={{ padding: "5rem 1.5rem 7rem" }}>
        <form
          onSubmit={handleSubmit}
          className="fade-up-on-scroll"
          style={{
            maxWidth: "600px",
            display: "flex",
            flexDirection: "column",
            gap: "1.75rem",
          }}
        >
          {/* Request textarea */}
          <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
            <label
              style={{
                fontFamily: "'Oswald', sans-serif",
                fontWeight: 400,
                fontSize: "0.72rem",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.5)",
              }}
            >
              Your Request
            </label>
            <textarea
              value={request}
              onChange={(e) => setRequest(e.target.value)}
              placeholder="Which image are you interested in? Preferred size, finish, or any other details…"
              rows={6}
              style={{
                fontFamily: "'Montserrat', sans-serif",
                fontWeight: 300,
                fontSize: "0.85rem",
                color: "#ffffff",
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.12)",
                borderRadius: "2px",
                padding: "1rem 1.1rem",
                lineHeight: 1.8,
                resize: "vertical",
                outline: "none",
                transition: "border-color 200ms ease",
              }}
              onFocus={(e) => (e.currentTarget.style.borderColor = "#e8a020")}
              onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)")}
            />
          </div>

          {/* Email input */}
          <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
            <label
              style={{
                fontFamily: "'Oswald', sans-serif",
                fontWeight: 400,
                fontSize: "0.72rem",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.5)",
              }}
            >
              Your Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              style={{
                fontFamily: "'Montserrat', sans-serif",
                fontWeight: 300,
                fontSize: "0.85rem",
                color: "#ffffff",
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.12)",
                borderRadius: "2px",
                padding: "0.85rem 1.1rem",
                outline: "none",
                transition: "border-color 200ms ease",
              }}
              onFocus={(e) => (e.currentTarget.style.borderColor = "#e8a020")}
              onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)")}
            />
          </div>

          {/* Submit */}
          <div>
            <button
              type="submit"
              disabled={submitting}
              className="btn-amber"
              style={{
                padding: "0.85rem 2.5rem",
                fontSize: "0.72rem",
                letterSpacing: "0.2em",
                opacity: submitting ? 0.6 : 1,
                cursor: submitting ? "not-allowed" : "pointer",
              }}
            >
              {submitting ? "Sending…" : "Send Request"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
