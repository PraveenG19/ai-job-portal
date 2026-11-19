import { useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";

function ResumeUpload() {
  const [file,     setFile]     = useState(null);
  const [loading,  setLoading]  = useState(false);
  const [success,  setSuccess]  = useState("");
  const [error,    setError]    = useState("");
  const [drag,     setDrag]     = useState(false);

  const handleDrop = (e) => {
    e.preventDefault(); setDrag(false);
    const dropped = e.dataTransfer.files[0];
    if (dropped) setFile(dropped);
  };

  const upload = async (e) => {
    e.preventDefault();
    if (!file) { setError("Please select a file first."); return; }
    setLoading(true); setError(""); setSuccess("");

    const formData = new FormData();
    formData.append("file", file);

    try {
      await api.post("/resumes/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setSuccess("Resume uploaded successfully! ✅");
      setFile(null);
    } catch (err) {
      const msg = err.response?.data?.message || err.response?.status;
      setError(`Upload failed (${msg}). Make sure you are logged in.`);
    } finally { setLoading(false); }
  };

  return (
    <div style={{ paddingTop: "80px", minHeight: "100vh", padding: "100px 1.5rem 3rem" }}>
      <div style={{ maxWidth: 600, margin: "0 auto" }}>

        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
          <div style={{ width: 60, height: 60, borderRadius: "16px",
            background: "linear-gradient(135deg, #00f5ff, #bf00ff)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: "1.6rem", margin: "0 auto 1.25rem",
            boxShadow: "0 0 30px rgba(0,245,255,0.4)" }}>📄</div>
          <h1 style={{ fontFamily: "'Orbitron',monospace", fontWeight: 900,
            fontSize: "1.8rem", color: "#e8f4ff" }}>
            UPLOAD <span style={{ color: "#00f5ff", textShadow: "0 0 15px #00f5ff" }}>RESUME</span>
          </h1>
          <p style={{ color: "#6a8fa8", marginTop: "0.5rem" }}>
            PDF, DOC or DOCX — max 10 MB
          </p>
        </div>

        <div className="glass-card" style={{ padding: "2.5rem" }}>
          {success && <div className="neon-alert alert-success" style={{ marginBottom: "1.5rem" }}>{success}</div>}
          {error   && <div className="neon-alert alert-error"   style={{ marginBottom: "1.5rem" }}>⚠ {error}</div>}

          <form onSubmit={upload}>
            {/* Drop zone */}
            <div
              onDragOver={e => { e.preventDefault(); setDrag(true); }}
              onDragLeave={() => setDrag(false)}
              onDrop={handleDrop}
              onClick={() => document.getElementById("fileInput").click()}
              style={{
                border: `2px dashed ${drag ? "#00f5ff" : "rgba(0,245,255,0.25)"}`,
                borderRadius: "12px", padding: "2.5rem 1rem",
                textAlign: "center", cursor: "pointer",
                background: drag ? "rgba(0,245,255,0.05)" : "rgba(0,10,20,0.4)",
                transition: "all 0.3s", marginBottom: "1.5rem",
                boxShadow: drag ? "0 0 20px rgba(0,245,255,0.2)" : "none",
              }}>
              <div style={{ fontSize: "2.5rem", marginBottom: "0.75rem" }}>
                {file ? "📄" : "☁️"}
              </div>
              {file ? (
                <>
                  <div style={{ color: "#00f5ff", fontWeight: 600, marginBottom: "0.3rem" }}>{file.name}</div>
                  <div style={{ color: "#6a8fa8", fontSize: "0.82rem" }}>
                    {(file.size / 1024 / 1024).toFixed(2)} MB
                  </div>
                </>
              ) : (
                <>
                  <div style={{ color: "#a0bcd0", marginBottom: "0.3rem" }}>
                    Drag & drop your resume here
                  </div>
                  <div style={{ color: "#6a8fa8", fontSize: "0.82rem" }}>or click to browse files</div>
                </>
              )}
              <input id="fileInput" type="file"
                accept=".pdf,.doc,.docx"
                style={{ display: "none" }}
                onChange={e => { setFile(e.target.files[0]); setSuccess(""); }} />
            </div>

            <button type="submit" disabled={loading || !file} style={{
              width: "100%", padding: "0.9rem",
              background: (!file || loading)
                ? "rgba(0,245,255,0.08)"
                : "linear-gradient(135deg, #00f5ff, #bf00ff)",
              border: (!file || loading) ? "1px solid rgba(0,245,255,0.2)" : "none",
              color: (!file || loading) ? "#6a8fa8" : "#000",
              fontFamily: "'Orbitron',monospace", fontWeight: 900,
              fontSize: "0.78rem", letterSpacing: "1.5px", textTransform: "uppercase",
              borderRadius: "10px",
              cursor: (!file || loading) ? "not-allowed" : "pointer",
              boxShadow: (!file || loading) ? "none" : "0 0 25px rgba(0,245,255,0.35)",
              transition: "all 0.3s",
            }}>
              {loading ? "⟳ Uploading..." : "⬆ Upload Resume"}
            </button>
          </form>

          <hr style={{ border: "none", borderTop: "1px solid rgba(0,245,255,0.1)", margin: "1.75rem 0" }}/>
          <div style={{ textAlign: "center" }}>
            <Link to="/ai-resume-analyzer" style={{
              color: "#00ff88", fontFamily: "'Orbitron',monospace",
              fontSize: "0.7rem", fontWeight: 700, letterSpacing: "1px",
              textDecoration: "none",
            }}>🤖 Analyse Resume with AI →</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResumeUpload;
