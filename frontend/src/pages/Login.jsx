import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../services/api";

function Login() {
  const [email,    setEmail]    = useState("");
  const [password, setPassword] = useState("");
  const [loading,  setLoading]  = useState(false);
  const [error,    setError]    = useState("");
  const navigate = useNavigate();

  const login = async (e) => {
    e.preventDefault();
    setLoading(true); setError("");
    try {
      const res = await api.post("/auth/login", { email, password });
      localStorage.setItem("token", res.data.token);
      const role = res.data.role || "STUDENT";
      localStorage.setItem("role", role);

      if (role === "HR")         navigate("/hr-dashboard");
      else if (role === "ADMIN") navigate("/admin-dashboard");
      else                       navigate("/student-dashboard");
    } catch {
      setError("Invalid email or password. Please try again.");
    } finally { setLoading(false); }
  };

  return (
    <div style={{
      minHeight: "100vh", display: "flex", alignItems: "center",
      justifyContent: "center", padding: "5rem 1.5rem 2rem",
      position: "relative",
    }}>
      {/* Background glow */}
      <div style={{ position:"fixed", top:"40%", left:"50%", transform:"translate(-50%,-50%)",
        width:600, height:600, borderRadius:"50%",
        background:"radial-gradient(ellipse, rgba(0,245,255,0.05) 0%, transparent 70%)",
        pointerEvents:"none" }}/>

      <div style={{ width: "100%", maxWidth: 460 }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
          <div style={{ width: 60, height: 60, borderRadius: "16px",
            background: "linear-gradient(135deg, #00f5ff, #bf00ff)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: "1.6rem", margin: "0 auto 1.25rem",
            boxShadow: "0 0 30px rgba(0,245,255,0.4)" }}>🔐</div>
          <h1 style={{ fontFamily: "'Orbitron',monospace", fontWeight: 900,
            fontSize: "1.8rem", color: "#e8f4ff", letterSpacing: "1px" }}>
            SIGN <span style={{ color: "#00f5ff", textShadow: "0 0 15px #00f5ff" }}>IN</span>
          </h1>
          <p style={{ color: "#6a8fa8", fontSize: "0.9rem", marginTop: "0.5rem" }}>
            Access your AI-powered dashboard
          </p>
        </div>

        {/* Card */}
        <div className="glass-card" style={{ padding: "2.5rem" }}>
          {error && (
            <div className="neon-alert alert-error" style={{ marginBottom: "1.5rem" }}>
              ⚠ {error}
            </div>
          )}

          <form onSubmit={login}>
            <div style={{ marginBottom: "1.25rem" }}>
              <label className="form-label-neon">Email Address</label>
              <input type="email" className="neon-input" placeholder="you@example.com"
                value={email} onChange={e => setEmail(e.target.value)} required />
            </div>
            <div style={{ marginBottom: "1.75rem" }}>
              <label className="form-label-neon">Password</label>
              <input type="password" className="neon-input" placeholder="••••••••"
                value={password} onChange={e => setPassword(e.target.value)} required />
            </div>

            <button type="submit" disabled={loading} style={{
              width: "100%", padding: "0.9rem",
              background: loading ? "rgba(0,245,255,0.1)" : "linear-gradient(135deg, #00f5ff, #bf00ff)",
              border: loading ? "1px solid rgba(0,245,255,0.3)" : "none",
              color: loading ? "#00f5ff" : "#000",
              fontFamily: "'Orbitron',monospace", fontWeight: 900,
              fontSize: "0.78rem", letterSpacing: "1.5px", textTransform: "uppercase",
              borderRadius: "10px", cursor: loading ? "not-allowed" : "pointer",
              boxShadow: loading ? "none" : "0 0 25px rgba(0,245,255,0.35)",
              transition: "all 0.3s",
            }}>
              {loading ? "⟳ Authenticating..." : "⚡ Sign In"}
            </button>
          </form>

          <hr style={{ border: "none", borderTop: "1px solid rgba(0,245,255,0.1)", margin: "1.75rem 0" }}/>
          <p style={{ textAlign: "center", color: "#6a8fa8", fontSize: "0.88rem" }}>
            No account?{" "}
            <Link to="/register" style={{ color: "#00f5ff", fontWeight: 600 }}>Create one →</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
