import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer style={{
      background: "rgba(2,4,8,0.95)",
      borderTop: "1px solid rgba(0,245,255,0.15)",
      padding: "3rem 1.5rem 2rem",
      position: "relative", overflow: "hidden",
    }}>
      {/* Glow line */}
      <div style={{
        position: "absolute", top: 0, left: "10%", right: "10%", height: "1px",
        background: "linear-gradient(90deg, transparent, #00f5ff, #bf00ff, transparent)",
      }} />

      <div style={{ maxWidth: 1300, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "2rem", marginBottom: "2rem" }}>

          {/* Brand */}
          <div>
            <div style={{ fontFamily: "'Orbitron',monospace", fontWeight: 900, fontSize: "1.1rem",
              background: "linear-gradient(90deg, #00f5ff, #bf00ff)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
              marginBottom: "0.75rem" }}>AI JOB PORTAL</div>
            <p style={{ color: "#6a8fa8", fontSize: "0.85rem", lineHeight: 1.7 }}>
              Connecting talent with opportunity using the power of artificial intelligence.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <div style={{ fontFamily: "'Orbitron',monospace", fontSize: "0.65rem", fontWeight: 700,
              color: "#00f5ff", letterSpacing: "1.5px", textTransform: "uppercase", marginBottom: "1rem" }}>Navigation</div>
            {[{ l: "Home", p: "/" }, { l: "Jobs", p: "/jobs" }, { l: "Companies", p: "/companies" }].map(({ l, p }) => (
              <div key={p} style={{ marginBottom: "0.5rem" }}>
                <Link to={p} style={{ color: "#6a8fa8", fontSize: "0.85rem", textDecoration: "none",
                  transition: "color 0.3s" }}
                  onMouseEnter={e => e.target.style.color = "#00f5ff"}
                  onMouseLeave={e => e.target.style.color = "#6a8fa8"}>{l}</Link>
              </div>
            ))}
          </div>

          {/* Features */}
          <div>
            <div style={{ fontFamily: "'Orbitron',monospace", fontSize: "0.65rem", fontWeight: 700,
              color: "#bf00ff", letterSpacing: "1.5px", textTransform: "uppercase", marginBottom: "1rem" }}>AI Features</div>
            {["Resume Analysis", "Smart Matching", "Career Insights", "Job Recommendations"].map((f) => (
              <div key={f} style={{ color: "#6a8fa8", fontSize: "0.85rem", marginBottom: "0.5rem",
                display: "flex", alignItems: "center", gap: "0.4rem" }}>
                <span style={{ color: "#00ff88", fontSize: "0.6rem" }}>◆</span> {f}
              </div>
            ))}
          </div>

          {/* Tech Stack */}
          <div>
            <div style={{ fontFamily: "'Orbitron',monospace", fontSize: "0.65rem", fontWeight: 700,
              color: "#ff006e", letterSpacing: "1.5px", textTransform: "uppercase", marginBottom: "1rem" }}>Built With</div>
            {["React 19 + Vite", "Spring Boot 3.5", "Java 21", "JWT Security", "Gemini AI"].map((t) => (
              <div key={t} style={{ color: "#6a8fa8", fontSize: "0.85rem", marginBottom: "0.5rem",
                display: "flex", alignItems: "center", gap: "0.4rem" }}>
                <span style={{ color: "#ffd700", fontSize: "0.6rem" }}>◆</span> {t}
              </div>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{ borderTop: "1px solid rgba(0,245,255,0.1)", paddingTop: "1.5rem",
          display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}>
          <p style={{ color: "#3a5a72", fontSize: "0.8rem" }}>
            © 2026 AI Job Portal — Developed by{" "}
            <span style={{ color: "#00f5ff" }}>Abhishek Tarnalli</span>
          </p>
          <div style={{ display: "flex", gap: "1.5rem" }}>
            {["Privacy", "Terms", "Contact"].map((l) => (
              <span key={l} style={{ color: "#3a5a72", fontSize: "0.8rem", cursor: "pointer",
                transition: "color 0.3s" }}
                onMouseEnter={e => e.target.style.color = "#00f5ff"}
                onMouseLeave={e => e.target.style.color = "#3a5a72"}>{l}</span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
