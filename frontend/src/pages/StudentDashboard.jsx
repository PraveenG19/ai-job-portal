import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";

const CARDS = [
  { icon: "💼", label: "Available Jobs",    color: "#00f5ff", link: "/jobs",         key: "jobs" },
  { icon: "📋", label: "My Applications",   color: "#bf00ff", link: "/application",  key: "apps" },
  { icon: "❤️", label: "Saved Jobs",        color: "#ff006e", link: "/saved-jobs",   key: "saved" },
  { icon: "🤖", label: "AI Resume Score",   color: "#00ff88", link: "/ai-resume-analyzer", key: "ai" },
];

const QUICK_LINKS = [
  { icon: "📄", label: "Upload Resume",    link: "/resume-upload",      color: "#00f5ff" },
  { icon: "🤖", label: "AI Analyser",      link: "/ai-resume-analyzer", color: "#bf00ff" },
  { icon: "👤", label: "My Profile",       link: "/profile",            color: "#ff006e" },
  { icon: "🔍", label: "Browse Jobs",      link: "/jobs",               color: "#00ff88" },
  { icon: "🏢", label: "Companies",        link: "/companies",          color: "#ffd700" },
];

function StudentDashboard() {
  const [stats, setStats]   = useState({ jobs: 0, apps: 0, saved: 0, ai: 85 });
  const [name,  setName]    = useState("Student");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;
    const headers = { Authorization: `Bearer ${token}` };
    api.get("/jobs").then(r => setStats(s => ({ ...s, jobs: r.data.length }))).catch(() => {});
    api.get("/applications", { headers }).then(r => setStats(s => ({ ...s, apps: r.data.length }))).catch(() => {});
    api.get("/saved-jobs",   { headers }).then(r => setStats(s => ({ ...s, saved: r.data.length }))).catch(() => {});
    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      setName(payload.sub || "Student");
    } catch {}
  }, []);

  return (
    <div style={{ paddingTop: "80px", minHeight: "100vh", padding: "100px 1.5rem 3rem" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>

        {/* Header */}
        <div style={{ marginBottom: "2.5rem" }}>
          <span style={{ fontFamily: "'Orbitron',monospace", fontSize: "0.65rem",
            color: "#00ff88", letterSpacing: "2px", textTransform: "uppercase" }}>Student Portal</span>
          <h1 style={{ fontFamily: "'Orbitron',monospace", fontWeight: 900,
            fontSize: "clamp(1.5rem,4vw,2.5rem)", color: "#e8f4ff", marginTop: "0.3rem" }}>
            WELCOME BACK,{" "}
            <span style={{ color: "#00f5ff", textShadow: "0 0 15px #00f5ff" }}>
              {name.split("@")[0].toUpperCase()}
            </span>
          </h1>
          <p style={{ color: "#6a8fa8", marginTop: "0.4rem" }}>Your AI-powered career hub</p>
        </div>

        {/* Stats cards */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1.25rem", marginBottom: "2.5rem" }}>
          {CARDS.map(({ icon, label, color, link, key }) => (
            <Link key={key} to={link} style={{ textDecoration: "none" }}>
              <div className="glass-card card-3d" style={{ padding: "1.75rem", textAlign: "center", cursor: "pointer" }}>
                <div style={{ fontSize: "2rem", marginBottom: "0.75rem",
                  filter: `drop-shadow(0 0 8px ${color})` }}>{icon}</div>
                <div style={{ fontFamily: "'Orbitron',monospace", fontWeight: 900,
                  fontSize: "2.2rem", color,
                  textShadow: `0 0 20px ${color}`, lineHeight: 1 }}>{stats[key]}</div>
                <div style={{ color: "#6a8fa8", fontSize: "0.72rem", letterSpacing: "1px",
                  textTransform: "uppercase", fontWeight: 600, marginTop: "0.4rem" }}>{label}</div>
              </div>
            </Link>
          ))}
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem" }}>

          {/* Quick links */}
          <div className="glass-card" style={{ padding: "2rem" }}>
            <h2 style={{ fontFamily: "'Orbitron',monospace", fontSize: "0.75rem", fontWeight: 700,
              color: "#00f5ff", letterSpacing: "1.5px", textTransform: "uppercase",
              marginBottom: "1.5rem", textShadow: "0 0 10px #00f5ff" }}>⚡ Quick Actions</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              {QUICK_LINKS.map(({ icon, label, link, color }) => (
                <Link key={label} to={link} style={{
                  display: "flex", alignItems: "center", gap: "0.85rem",
                  padding: "0.85rem 1rem", borderRadius: "10px", textDecoration: "none",
                  background: `rgba(${color === "#00f5ff" ? "0,245,255" : color === "#bf00ff" ? "191,0,255" : color === "#ff006e" ? "255,0,110" : color === "#00ff88" ? "0,255,136" : "255,215,0"},0.05)`,
                  border: `1px solid ${color}22`, transition: "all 0.3s",
                }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = color + "66"; e.currentTarget.style.transform = "translateX(4px)"; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = color + "22"; e.currentTarget.style.transform = "translateX(0)"; }}>
                  <span style={{ fontSize: "1.3rem" }}>{icon}</span>
                  <span style={{ color: "#a0bcd0", fontFamily: "'Orbitron',monospace",
                    fontSize: "0.7rem", fontWeight: 700, letterSpacing: "1px", textTransform: "uppercase" }}>
                    {label}
                  </span>
                  <span style={{ marginLeft: "auto", color, fontSize: "0.9rem" }}>→</span>
                </Link>
              ))}
            </div>
          </div>

          {/* AI insight */}
          <div className="glass-card" style={{ padding: "2rem" }}>
            <h2 style={{ fontFamily: "'Orbitron',monospace", fontSize: "0.75rem", fontWeight: 700,
              color: "#00ff88", letterSpacing: "1.5px", textTransform: "uppercase",
              marginBottom: "1.5rem", textShadow: "0 0 10px #00ff88" }}>🤖 AI Career Insights</h2>

            {/* Resume score ring */}
            <div style={{ textAlign: "center", marginBottom: "1.5rem" }}>
              <div style={{ position: "relative", display: "inline-block" }}>
                <svg width="120" height="120" viewBox="0 0 120 120">
                  <circle cx="60" cy="60" r="50" fill="none" stroke="rgba(0,245,255,0.1)" strokeWidth="8"/>
                  <circle cx="60" cy="60" r="50" fill="none" stroke="#00f5ff" strokeWidth="8"
                    strokeDasharray={`${2 * Math.PI * 50 * stats.ai / 100} ${2 * Math.PI * 50}`}
                    strokeLinecap="round" transform="rotate(-90 60 60)"
                    style={{ filter: "drop-shadow(0 0 6px #00f5ff)" }}/>
                </svg>
                <div style={{ position: "absolute", top: "50%", left: "50%",
                  transform: "translate(-50%,-50%)", textAlign: "center" }}>
                  <div style={{ fontFamily: "'Orbitron',monospace", fontWeight: 900,
                    fontSize: "1.6rem", color: "#00f5ff", textShadow: "0 0 10px #00f5ff" }}>{stats.ai}</div>
                  <div style={{ color: "#6a8fa8", fontSize: "0.6rem", letterSpacing: "1px" }}>SCORE</div>
                </div>
              </div>
            </div>

            {[
              { label: "Profile Strength", val: 72, color: "#bf00ff" },
              { label: "Skill Match",      val: 85, color: "#00f5ff" },
              { label: "Market Demand",    val: 68, color: "#00ff88" },
            ].map(({ label, val, color }) => (
              <div key={label} style={{ marginBottom: "1rem" }}>
                <div style={{ display: "flex", justifyContent: "space-between",
                  marginBottom: "0.35rem" }}>
                  <span style={{ color: "#7a9bb5", fontSize: "0.78rem" }}>{label}</span>
                  <span style={{ color, fontWeight: 700, fontSize: "0.78rem",
                    fontFamily: "'Orbitron',monospace" }}>{val}%</span>
                </div>
                <div style={{ background: "rgba(255,255,255,0.05)", borderRadius: "100px", height: 6, overflow: "hidden" }}>
                  <div style={{ width: `${val}%`, height: "100%", borderRadius: "100px",
                    background: `linear-gradient(90deg, ${color}, ${color}88)`,
                    boxShadow: `0 0 8px ${color}`, transition: "width 1s ease" }}/>
                </div>
              </div>
            ))}

            <Link to="/ai-resume-analyzer" style={{
              display: "block", textAlign: "center", marginTop: "1.25rem",
              color: "#00ff88", fontFamily: "'Orbitron',monospace",
              fontSize: "0.65rem", fontWeight: 700, letterSpacing: "1px",
              textTransform: "uppercase", textDecoration: "none",
              padding: "0.7rem", border: "1px solid rgba(0,255,136,0.3)",
              borderRadius: "8px", background: "rgba(0,255,136,0.04)",
            }}>Analyse My Resume →</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StudentDashboard;
