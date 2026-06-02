import { useLocation } from "wouter";

export default function NotFound() {
  const [, setLocation] = useLocation();

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#111214",
        padding: "2rem",
      }}
    >
      <div style={{ textAlign: "center" }}>
        <p
          style={{
            fontFamily: "'Oswald', sans-serif",
            fontWeight: 700,
            fontSize: "8rem",
            color: "rgba(255,255,255,0.06)",
            lineHeight: 1,
            marginBottom: "0",
          }}
        >
          404
        </p>
        <p
          style={{
            fontFamily: "'Montserrat', sans-serif",
            fontWeight: 300,
            fontSize: "0.7rem",
            letterSpacing: "0.4em",
            textTransform: "uppercase",
            color: "#e8a020",
            marginBottom: "1rem",
            marginTop: "-1rem",
          }}
        >
          Page Not Found
        </p>
        <p
          style={{
            fontFamily: "'Montserrat', sans-serif",
            fontWeight: 300,
            fontSize: "0.85rem",
            color: "rgba(255,255,255,0.4)",
            marginBottom: "2.5rem",
          }}
        >
          This page doesn't exist. It may have been moved.
        </p>
        <button
          className="btn-amber"
          onClick={() => setLocation("/")}
        >
          Back to Home
        </button>
      </div>
    </div>
  );
}
