import { useState } from "react";
import api from "../services/api";

function AIResumeAnalyzer() {
  const [resumeText, setResumeText] = useState("");
  const [result,     setResult]     = useState("");
  const [loading,    setLoading]    = useState(false);
  const [error,      setError]      = useState("");

  const analyze = async () => {
    if (!resumeText.trim()) { setError("Please paste your resume text first."); return; }
    setLoading(true); setError(""); setResult("");
    try {
      const res = await api.post("/gemini/analyze", resumeText, {
        headers: { "Content-Type": "text/plain" },
      });
      setResult(res.data);
    } catch (e) {
      setError("Analysis failed. Make sure you are logged in and try again.");
    } finally { setLoading(false); }
  };

  const score = result
    ? parseInt((result.match(/OVERALL SCORE:\s*(\d+)/) || [])[1] || 0)
    : 0;

  const scoreColor = score >= 80 ? "#00ff88" : score >= 60 ? "#ffd700" : "#ff006e";

  return (
    <div style={{ paddingTop: "80px", minHeight: "100vh", padding: "100px 1.5rem 3rem" }}>
      <div style={{ maxWidth: 1000, margin: "0 auto" }}>

        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
          <span style={{ fontFamily: "'Orbitron',monospace", fontSize: "0.65rem",
            fontWeight: 700, letterSpacing: "2px", color: "#00ff88", textTransform: "uppercase" }}>
            Powered by AI
          </span>
          <h1 style={{ fontFamily: "'Orbitron',monospace", fontWeight: 900,
            fontSize: "clamp(1.6rem,4vw,2.5rem)", color: "#e8f4ff", marginTop: "0.3rem" }}>
            🤖 RESUME <span style={{ color: "#00ff88", textShadow: "0 0 20px #00ff88" }}>ANALYSER</span>
          </h1>
          <p style={{ color: "#6a8fa8", marginTop: "0.5rem" }}>
            Paste your resume text and get instant AI-powered feedback, skill gaps and job matches.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: result ? "1fr 1fr" : "1fr", gap: "1.5rem" }}>

          {/* Input */}
          <div className="glass-card" style={{ padding: "2rem" }}>
            <label className="form-label-neon">Paste Resume Text</label>
            <textarea
              className="neon-textarea"
              rows={result ? 14 : 16}
              placeholder={`Paste your full resume here...\n\nExample:\nJohn Doe\njohn@email.com | GitHub: github.com/john\n\nSKILLS\nJava, Spring Boot, React, MySQL, Docker, AWS\n\nEXPERIENCE\nSoftware Engineer at TCS (2 years)\n- Built REST APIs using Spring Boot\n- Deployed apps on AWS EC2\n\nEDUCATION\nB.Tech Computer Science, 2022`}
              value={resumeText}
              onChange={e => setResumeText(e.target.value)}
            />

            {error && (
              <div className="neon-alert alert-error" style={{ marginTop: "1rem" }}>⚠ {error}</div>
            )}

            <button onClick={analyze} disabled={loading} style={{
              width: "100%", marginTop: "1.25rem", padding: "0.9rem",
              background: loading ? "rgba(0,255,136,0.1)" : "linear-gradient(135deg, #00ff88, #00f5ff)",
              border: loading ? "1px solid rgba(0,255,136,0.3)" : "none",
              color: "#000", fontFamily: "'Orbitron',monospace", fontWeight: 900,
              fontSize: "0.78rem", letterSpacing: "1.5px", textTransform: "uppercase",
              borderRadius: "10px", cursor: loading ? "not-allowed" : "pointer",
              boxShadow: loading ? "none" : "0 0 25px rgba(0,255,136,0.35)",
              transition: "all 0.3s",
            }}>
              {loading ? "⟳ Analysing Resume..." : "🤖 Analyse My Resume"}
            </button>
          </div>

          {/* Results */}
          {result && (
            <div className="glass-card" style={{ padding: "2rem" }}>
              {/* Score ring */}
              <div style={{ textAlign: "center", marginBottom: "1.5rem" }}>
                <div style={{ position: "relative", display: "inline-block" }}>
                  <svg width="110" height="110" viewBox="0 0 110 110">
                    <circle cx="55" cy="55" r="45" fill="none"
                      stroke="rgba(255,255,255,0.05)" strokeWidth="8"/>
                    <circle cx="55" cy="55" r="45" fill="none"
                      stroke={scoreColor} strokeWidth="8"
                      strokeDasharray={`${2 * Math.PI * 45 * score / 100} ${2 * Math.PI * 45}`}
                      strokeLinecap="round" transform="rotate(-90 55 55)"
                      style={{ filter: `drop-shadow(0 0 8px ${scoreColor})`, transition: "all 1s ease" }}/>
                  </svg>
                  <div style={{ position: "absolute", top: "50%", left: "50%",
                    transform: "translate(-50%,-50%)", textAlign: "center" }}>
                    <div style={{ fontFamily: "'Orbitron',monospace", fontWeight: 900,
                      fontSize: "1.5rem", color: scoreColor,
                      textShadow: `0 0 10px ${scoreColor}` }}>{score}</div>
                    <div style={{ color: "#6a8fa8", fontSize: "0.55rem", letterSpacing: "1px" }}>/ 100</div>
                  </div>
                </div>
                <div style={{ fontFamily: "'Orbitron',monospace", fontSize: "0.7rem",
                  color: scoreColor, marginTop: "0.4rem", fontWeight: 700,
                  textShadow: `0 0 10px ${scoreColor}` }}>
                  {score >= 80 ? "EXCELLENT" : score >= 60 ? "GOOD" : "NEEDS WORK"}
                </div>
              </div>

              {/* Full report */}
              <div style={{
                background: "rgba(0,10,20,0.6)", borderRadius: "10px",
                padding: "1.25rem", maxHeight: "380px", overflowY: "auto",
                border: "1px solid rgba(0,245,255,0.1)",
              }}>
                <pre style={{ color: "#a0d4b0", fontSize: "0.75rem", lineHeight: 1.7,
                  fontFamily: "monospace", whiteSpace: "pre-wrap", margin: 0 }}>
                  {result}
                </pre>
              </div>

              <button onClick={() => { setResult(""); setResumeText(""); }} style={{
                width: "100%", marginTop: "1rem", padding: "0.7rem",
                background: "transparent", border: "1px solid rgba(255,0,110,0.4)",
                color: "#ff006e", fontFamily: "'Orbitron',monospace",
                fontSize: "0.68rem", fontWeight: 700, letterSpacing: "1px",
                textTransform: "uppercase", borderRadius: "8px", cursor: "pointer",
              }}>✕ Clear &amp; Analyse Another</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AIResumeAnalyzer;
