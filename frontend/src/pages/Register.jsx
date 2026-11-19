import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../services/api";

function Register() {
  const [form, setForm] = useState({ fullName: "", email: "", password: "", phone: "" });
  const [loading, setLoading] = useState(false);
  const [error,   setError]   = useState("");
  const navigate = useNavigate();

  const update = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const register = async (e) => {
    e.preventDefault();
    setLoading(true); setError("");
    try {
      await api.post("/auth/register", form);
      navigate("/login");
    } catch {
      setError("Registration failed. Email may already be in use.");
    } finally { setLoading(false); }
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center",
      justifyContent: "center", padding: "5rem 1.5rem 2rem" }}>
      <div style={{ width: "100%", maxWidth: 480 }}>
        <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
          <div style={{ width: 60, height: 60, borderRadius: "16px",
            background: "linear-gradient(135deg, #bf00ff, #ff006e)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: "1.6rem", margin: "0 auto 1.25rem",
            boxShadow: "0 0 30px rgba(191,0,255,0.4)" }}>🚀</div>
          <h1 style={{ fontFamily: "'Orbitron',monospace", fontWeight: 900,
            fontSize: "1.8rem", color: "#e8f4ff", letterSpacing: "1px" }}>
            JOIN THE <span style={{ color: "#bf00ff", textShadow: "0 0 15px #bf00ff" }}>FUTURE</span>
          </h1>
          <p style={{ color: "#6a8fa8", fontSize: "0.9rem", marginTop: "0.5rem" }}>
            Create your AI-powered career profile
          </p>
        </div>

        <div className="glass-card" style={{ padding: "2.5rem" }}>
          {error && <div className="neon-alert alert-error" style={{ marginBottom: "1.5rem" }}>⚠ {error}</div>}

          <form onSubmit={register}>
            {[
              { k: "fullName", label: "Full Name",    type: "text",     ph: "John Doe" },
              { k: "email",    label: "Email Address", type: "email",    ph: "you@example.com" },
              { k: "password", label: "Password",     type: "password", ph: "••••••••" },
              { k: "phone",    label: "Phone Number", type: "text",     ph: "+91 98765 43210" },
            ].map(({ k, label, type, ph }) => (
              <div key={k} style={{ marginBottom: "1.25rem" }}>
                <label className="form-label-neon">{label}</label>
                <input type={type} className="neon-input" placeholder={ph}
                  value={form[k]} onChange={update(k)} required />
              </div>
            ))}

            <button type="submit" disabled={loading} style={{
              width: "100%", padding: "0.9rem", marginTop: "0.5rem",
              background: loading ? "rgba(191,0,255,0.1)" : "linear-gradient(135deg, #bf00ff, #ff006e)",
              border: loading ? "1px solid rgba(191,0,255,0.3)" : "none",
              color: loading ? "#bf00ff" : "#fff",
              fontFamily: "'Orbitron',monospace", fontWeight: 900,
              fontSize: "0.78rem", letterSpacing: "1.5px", textTransform: "uppercase",
              borderRadius: "10px", cursor: loading ? "not-allowed" : "pointer",
              boxShadow: loading ? "none" : "0 0 25px rgba(191,0,255,0.35)",
              transition: "all 0.3s",
            }}>
              {loading ? "⟳ Creating Account..." : "🚀 Create Account"}
            </button>
          </form>

          <hr style={{ border: "none", borderTop: "1px solid rgba(0,245,255,0.1)", margin: "1.75rem 0" }}/>
          <p style={{ textAlign: "center", color: "#6a8fa8", fontSize: "0.88rem" }}>
            Already have an account?{" "}
            <Link to="/login" style={{ color: "#00f5ff", fontWeight: 600 }}>Sign in →</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;
