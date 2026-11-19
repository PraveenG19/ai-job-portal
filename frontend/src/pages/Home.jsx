import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";

/* ── Animated counter hook ── */
function useCounter(target, duration = 2000) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let start = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [target, duration]);
  return count;
}

const FEATURES = [
  { icon: "🤖", title: "AI Resume Analysis", desc: "Let Gemini AI score your resume, spot skill gaps, and suggest improvements in seconds.", color: "#00f5ff", link: "/ai-resume-analyzer" },
  { icon: "⚡", title: "Smart Job Matching", desc: "Our AI engine matches your skills to the most relevant openings in real time.", color: "#bf00ff", link: "/jobs" },
  { icon: "🚀", title: "One-Click Apply", desc: "Apply to multiple jobs instantly and track every application from one dashboard.", color: "#ff006e", link: "/jobs" },
  { icon: "📊", title: "Career Analytics", desc: "Get data-driven insights on market demand, salary trends, and skill requirements.", color: "#00ff88", link: "/student-dashboard" },
  { icon: "🏢", title: "Top Companies", desc: "Explore profiles of hundreds of companies actively hiring right now.", color: "#ffd700", link: "/companies" },
  { icon: "🛡️", title: "Secure & Private", desc: "JWT-secured platform with encrypted data and role-based access control.", color: "#00f5ff", link: "/register" },
];

const STEPS = [
  { n: "01", title: "Create Profile", desc: "Register and build your professional profile in under 2 minutes." },
  { n: "02", title: "Upload Resume", desc: "Upload your resume and let AI extract and analyse your skills." },
  { n: "03", title: "Get Matched", desc: "Our AI matches you to the best-fit jobs from top companies." },
  { n: "04", title: "Apply & Track", desc: "Apply with one click and track your application status live." },
];

function Home() {
  const [jobs, setJobs] = useState([]);
  const heroRef = useRef(null);
  const jobCount  = useCounter(2400);
  const compCount = useCounter(380);
  const userCount = useCounter(15000);
  const hireCount = useCounter(94);

  useEffect(() => {
    api.get("/jobs").then(r => setJobs(r.data.slice(0, 6))).catch(() => {});
  }, []);

  /* 3D tilt on hero card */
  const handleTilt = (e) => {
    if (!heroRef.current) return;
    const rect = heroRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width  - 0.5) * 10;
    const y = ((e.clientY - rect.top)  / rect.height - 0.5) * -10;
    heroRef.current.style.transform = `perspective(1000px) rotateY(${x}deg) rotateX(${y}deg)`;
  };
  const resetTilt = () => {
    if (heroRef.current) heroRef.current.style.transform = "perspective(1000px) rotateY(0deg) rotateX(0deg)";
  };

  return (
    <div style={{ paddingTop: "80px" }}>

      {/* ── HERO ── */}
      <section style={{
        minHeight: "100vh", display: "flex", alignItems: "center",
        justifyContent: "center", padding: "4rem 1.5rem",
        position: "relative", overflow: "hidden",
      }}>
        {/* Radial glow */}
        <div style={{ position: "absolute", top: "30%", left: "50%", transform: "translate(-50%,-50%)",
          width: "80vw", height: "80vw", maxWidth: 800,
          background: "radial-gradient(ellipse, rgba(0,245,255,0.06) 0%, rgba(191,0,255,0.04) 40%, transparent 70%)",
          borderRadius: "50%", pointerEvents: "none" }} />

        <div style={{ maxWidth: 1100, margin: "0 auto", textAlign: "center", position: "relative" }}>
          {/* Badge */}
          <div className="animate-fade-up" style={{ marginBottom: "1.5rem" }}>
            <span style={{ display: "inline-block", fontFamily: "'Orbitron',monospace", fontSize: "0.65rem",
              fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase",
              color: "#00f5ff", border: "1px solid rgba(0,245,255,0.3)",
              padding: "0.35rem 1rem", borderRadius: "100px",
              background: "rgba(0,245,255,0.05)", animation: "border-flow 4s linear infinite" }}>
              ⬡ Powered by Gemini AI
            </span>
          </div>

          {/* Headline */}
          <h1 className="animate-fade-up delay-1" style={{
            fontFamily: "'Orbitron',monospace", fontWeight: 900,
            fontSize: "clamp(2.2rem, 7vw, 5.5rem)", lineHeight: 1.1,
            letterSpacing: "1px", marginBottom: "1.5rem",
          }}>
            <span style={{ color: "#e8f4ff" }}>FIND YOUR</span>{" "}
            <span style={{
              background: "linear-gradient(135deg, #00f5ff 0%, #bf00ff 50%, #ff006e 100%)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
              animation: "glow-pulse 3s ease-in-out infinite",
            }}>FUTURE</span>
            <br />
            <span style={{ color: "#e8f4ff" }}>WITH AI</span>
          </h1>

          <p className="animate-fade-up delay-2" style={{
            color: "#7a9bb5", fontSize: "clamp(1rem, 2.5vw, 1.25rem)",
            maxWidth: 650, margin: "0 auto 2.5rem", lineHeight: 1.7,
          }}>
            The next-generation job portal that uses artificial intelligence to match you
            with opportunities, analyse your resume, and fast-track your career.
          </p>

          {/* CTA Buttons */}
          <div className="animate-fade-up delay-3" style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
            <Link to="/jobs" className="btn-neon-solid" style={{
              background: "linear-gradient(135deg, #00f5ff, #bf00ff)",
              color: "#000", fontFamily: "'Orbitron',monospace",
              fontWeight: 900, fontSize: "0.75rem", letterSpacing: "1.5px",
              textTransform: "uppercase", padding: "0.9rem 2.2rem",
              borderRadius: "10px", textDecoration: "none",
              boxShadow: "0 0 30px rgba(0,245,255,0.4), 0 0 60px rgba(191,0,255,0.2)",
              transition: "all 0.3s",
            }}>⚡ Explore Jobs</Link>
            <Link to="/ai-resume-analyzer" style={{
              color: "#00f5ff", fontFamily: "'Orbitron',monospace",
              fontWeight: 700, fontSize: "0.75rem", letterSpacing: "1.5px",
              textTransform: "uppercase", padding: "0.9rem 2.2rem",
              border: "2px solid rgba(0,245,255,0.4)", borderRadius: "10px",
              textDecoration: "none", transition: "all 0.3s",
              background: "rgba(0,245,255,0.04)",
            }}>🤖 Analyse Resume</Link>
          </div>

          {/* 3D Hero Card */}
          <div ref={heroRef} onMouseMove={handleTilt} onMouseLeave={resetTilt}
            className="animate-fade-up delay-4"
            style={{
              marginTop: "4rem",
              background: "rgba(10,20,40,0.8)",
              border: "1px solid rgba(0,245,255,0.2)",
              borderRadius: "20px", padding: "2rem",
              backdropFilter: "blur(20px)",
              boxShadow: "0 20px 60px rgba(0,0,0,0.5), 0 0 40px rgba(0,245,255,0.08)",
              transition: "transform 0.1s ease",
              maxWidth: 800, margin: "4rem auto 0",
            }}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "1rem" }}>
              {[
                { n: jobCount.toLocaleString() + "+", l: "Active Jobs" },
                { n: compCount + "+",   l: "Companies" },
                { n: userCount.toLocaleString() + "+", l: "Job Seekers" },
                { n: hireCount + "%",   l: "Hire Rate" },
              ].map(({ n, l }) => (
                <div key={l} style={{ textAlign: "center", padding: "1rem 0" }}>
                  <div style={{ fontFamily: "'Orbitron',monospace", fontWeight: 900,
                    fontSize: "clamp(1.3rem,3vw,2.2rem)",
                    background: "linear-gradient(135deg, #00f5ff, #bf00ff)",
                    WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                    textShadow: "none" }}>{n}</div>
                  <div style={{ color: "#6a8fa8", fontSize: "0.72rem", letterSpacing: "1px",
                    textTransform: "uppercase", fontWeight: 600, marginTop: "0.3rem" }}>{l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section style={{ padding: "5rem 1.5rem", position: "relative" }}>
        <div style={{ maxWidth: 1300, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
            <span style={{ fontFamily: "'Orbitron',monospace", fontSize: "0.65rem", fontWeight: 700,
              letterSpacing: "2px", color: "#bf00ff", textTransform: "uppercase" }}>Core Features</span>
            <h2 className="section-title" style={{ fontFamily: "'Orbitron',monospace", fontWeight: 900,
              fontSize: "clamp(1.6rem,4vw,2.5rem)", color: "#e8f4ff", marginTop: "0.5rem" }}>
              AI-POWERED <span style={{ color: "#00f5ff", textShadow: "0 0 20px #00f5ff" }}>TOOLS</span>
            </h2>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(290px, 1fr))", gap: "1.5rem" }}>
            {FEATURES.map((f, i) => (
              <Link key={f.title} to={f.link} style={{ textDecoration: "none" }}>
                <div className="glass-card card-3d" style={{
                  padding: "2rem", cursor: "pointer",
                  animationDelay: `${i * 0.1}s`,
                }}>
                  <div style={{ fontSize: "2.5rem", marginBottom: "1rem",
                    filter: `drop-shadow(0 0 10px ${f.color})` }}>{f.icon}</div>
                  <h3 style={{ fontFamily: "'Orbitron',monospace", fontSize: "0.9rem", fontWeight: 700,
                    color: f.color, letterSpacing: "1px", textTransform: "uppercase",
                    marginBottom: "0.75rem", textShadow: `0 0 10px ${f.color}` }}>{f.title}</h3>
                  <p style={{ color: "#7a9bb5", fontSize: "0.9rem", lineHeight: 1.65 }}>{f.desc}</p>
                  <div style={{ marginTop: "1.25rem", color: f.color, fontSize: "0.75rem",
                    fontFamily: "'Orbitron',monospace", fontWeight: 700, letterSpacing: "1px",
                    display: "flex", alignItems: "center", gap: "0.4rem" }}>
                    Explore <span style={{ fontSize: "1rem" }}>→</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section style={{ padding: "5rem 1.5rem", position: "relative" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
            <span style={{ fontFamily: "'Orbitron',monospace", fontSize: "0.65rem", fontWeight: 700,
              letterSpacing: "2px", color: "#00ff88", textTransform: "uppercase" }}>Process</span>
            <h2 style={{ fontFamily: "'Orbitron',monospace", fontWeight: 900,
              fontSize: "clamp(1.6rem,4vw,2.5rem)", color: "#e8f4ff", marginTop: "0.5rem" }}>
              HOW IT <span style={{ color: "#00ff88", textShadow: "0 0 20px #00ff88" }}>WORKS</span>
            </h2>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))", gap: "1.5rem" }}>
            {STEPS.map((s, i) => (
              <div key={s.n} className="glass-card" style={{ padding: "2rem", textAlign: "center", position: "relative" }}>
                <div style={{ fontFamily: "'Orbitron',monospace", fontSize: "3rem", fontWeight: 900,
                  color: "rgba(0,245,255,0.08)", position: "absolute", top: "1rem", right: "1.25rem",
                  lineHeight: 1 }}>{s.n}</div>
                <div style={{ width: 50, height: 50, borderRadius: "50%",
                  background: `conic-gradient(from ${i * 90}deg, #00f5ff, #bf00ff, #ff006e, #00f5ff)`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  margin: "0 auto 1.25rem",
                  boxShadow: "0 0 20px rgba(0,245,255,0.3)" }}>
                  <span style={{ fontFamily: "'Orbitron',monospace", fontWeight: 900, fontSize: "0.85rem", color: "#000" }}>{s.n}</span>
                </div>
                <h3 style={{ fontFamily: "'Orbitron',monospace", fontSize: "0.85rem", fontWeight: 700,
                  color: "#e8f4ff", letterSpacing: "1px", textTransform: "uppercase", marginBottom: "0.75rem" }}>{s.title}</h3>
                <p style={{ color: "#7a9bb5", fontSize: "0.88rem", lineHeight: 1.6 }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── LATEST JOBS ── */}
      {jobs.length > 0 && (
        <section style={{ padding: "5rem 1.5rem" }}>
          <div style={{ maxWidth: 1300, margin: "0 auto" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "2.5rem", flexWrap: "wrap", gap: "1rem" }}>
              <div>
                <span style={{ fontFamily: "'Orbitron',monospace", fontSize: "0.65rem", fontWeight: 700,
                  letterSpacing: "2px", color: "#ffd700", textTransform: "uppercase" }}>Opportunities</span>
                <h2 style={{ fontFamily: "'Orbitron',monospace", fontWeight: 900,
                  fontSize: "clamp(1.4rem,3vw,2rem)", color: "#e8f4ff", marginTop: "0.3rem" }}>
                  LATEST <span style={{ color: "#ffd700", textShadow: "0 0 20px #ffd700" }}>JOBS</span>
                </h2>
              </div>
              <Link to="/jobs" style={{ color: "#00f5ff", fontFamily: "'Orbitron',monospace",
                fontSize: "0.68rem", fontWeight: 700, letterSpacing: "1px", textTransform: "uppercase",
                textDecoration: "none", border: "1px solid rgba(0,245,255,0.3)", padding: "0.5rem 1.1rem",
                borderRadius: "8px" }}>View All →</Link>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "1.25rem" }}>
              {jobs.map((job) => (
                <div key={job.id} className="glass-card card-3d" style={{ padding: "1.5rem" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.75rem" }}>
                    <span style={{ color: "#00f5ff", fontFamily: "'Orbitron',monospace", fontSize: "0.6rem",
                      fontWeight: 700, letterSpacing: "1px", textTransform: "uppercase",
                      border: "1px solid rgba(0,245,255,0.3)", padding: "0.2rem 0.6rem",
                      borderRadius: "100px", background: "rgba(0,245,255,0.05)" }}>{job.jobType || "Full-time"}</span>
                    <span style={{ color: "#00ff88", fontSize: "0.8rem", fontWeight: 700 }}>₹{job.salary}</span>
                  </div>
                  <h3 style={{ color: "#e8f4ff", fontSize: "1rem", fontWeight: 600, marginBottom: "0.35rem" }}>{job.title}</h3>
                  <div style={{ color: "#7a9bb5", fontSize: "0.82rem", marginBottom: "0.3rem" }}>
                    🏢 {job.company?.companyName || "Company"}
                  </div>
                  <div style={{ color: "#7a9bb5", fontSize: "0.82rem", marginBottom: "1.25rem" }}>
                    📍 {job.location}
                  </div>
                  <Link to={`/jobs/${job.id}`} style={{ color: "#00f5ff", fontFamily: "'Orbitron',monospace",
                    fontSize: "0.65rem", fontWeight: 700, letterSpacing: "1px", textTransform: "uppercase",
                    textDecoration: "none", display: "flex", alignItems: "center", gap: "0.4rem" }}>
                    View Details →
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── CTA ── */}
      <section style={{ padding: "6rem 1.5rem" }}>
        <div style={{ maxWidth: 800, margin: "0 auto", textAlign: "center" }}>
          <div className="glass-card" style={{
            padding: "4rem 2.5rem", position: "relative", overflow: "hidden",
            background: "linear-gradient(135deg, rgba(0,245,255,0.05), rgba(191,0,255,0.05))",
          }}>
            {/* Corner decorations */}
            <div style={{ position:"absolute",top:0,left:0,width:60,height:60,
              borderTop:"2px solid #00f5ff",borderLeft:"2px solid #00f5ff",borderRadius:"16px 0 0 0" }}/>
            <div style={{ position:"absolute",bottom:0,right:0,width:60,height:60,
              borderBottom:"2px solid #bf00ff",borderRight:"2px solid #bf00ff",borderRadius:"0 0 16px 0" }}/>

            <h2 style={{ fontFamily: "'Orbitron',monospace", fontWeight: 900,
              fontSize: "clamp(1.4rem,4vw,2.2rem)", color: "#e8f4ff", marginBottom: "1rem" }}>
              READY TO LAUNCH YOUR <span style={{ color: "#00f5ff", textShadow: "0 0 20px #00f5ff" }}>CAREER</span>?
            </h2>
            <p style={{ color: "#7a9bb5", fontSize: "1rem", marginBottom: "2rem", lineHeight: 1.7 }}>
              Join thousands of professionals using AI to find better jobs faster.
            </p>
            <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
              <Link to="/register" style={{
                background: "linear-gradient(135deg, #00f5ff, #bf00ff)",
                color: "#000", fontFamily: "'Orbitron',monospace",
                fontWeight: 900, fontSize: "0.75rem", letterSpacing: "1.5px",
                textTransform: "uppercase", padding: "0.9rem 2.2rem",
                borderRadius: "10px", textDecoration: "none",
                boxShadow: "0 0 30px rgba(0,245,255,0.4)",
              }}>Get Started Free</Link>
              <Link to="/jobs" style={{
                color: "#a0bcd0", fontFamily: "'Orbitron',monospace",
                fontWeight: 700, fontSize: "0.75rem", letterSpacing: "1.5px",
                textTransform: "uppercase", padding: "0.9rem 2.2rem",
                border: "1px solid rgba(160,188,208,0.3)", borderRadius: "10px",
                textDecoration: "none",
              }}>Browse Jobs</Link>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        @keyframes glow-pulse {
          0%,100%{filter:brightness(1)}50%{filter:brightness(1.3)}
        }
        @keyframes border-flow {
          0%{border-color:rgba(0,245,255,0.4)}33%{border-color:rgba(191,0,255,0.4)}
          66%{border-color:rgba(255,0,110,0.4)}100%{border-color:rgba(0,245,255,0.4)}
        }
      `}</style>
    </div>
  );
}

export default Home;
