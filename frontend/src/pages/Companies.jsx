import { useEffect, useState } from "react";
import api from "../services/api";

function Companies() {
  const [companies, setCompanies] = useState([]);
  const [loading,   setLoading]   = useState(true);
  const [search,    setSearch]    = useState("");

  useEffect(() => {
    api.get("/company")
      .then(r => setCompanies(r.data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const filtered = companies.filter(c =>
    !search ||
    c.companyName?.toLowerCase().includes(search.toLowerCase()) ||
    c.location?.toLowerCase().includes(search.toLowerCase())
  );

  const colors = ["#00f5ff","#bf00ff","#ff006e","#00ff88","#ffd700","#00f5ff"];

  return (
    <div style={{ paddingTop: "80px", minHeight: "100vh", padding: "100px 1.5rem 3rem" }}>
      <div style={{ maxWidth: 1300, margin: "0 auto" }}>

        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
          <span style={{ fontFamily: "'Orbitron',monospace", fontSize: "0.65rem",
            fontWeight: 700, letterSpacing: "2px", color: "#bf00ff", textTransform: "uppercase" }}>
            Hiring Now
          </span>
          <h1 style={{ fontFamily: "'Orbitron',monospace", fontWeight: 900,
            fontSize: "clamp(1.8rem,5vw,3rem)", color: "#e8f4ff", marginTop: "0.3rem" }}>
            TOP <span style={{ color: "#bf00ff", textShadow: "0 0 20px #bf00ff" }}>COMPANIES</span>
          </h1>
          <p style={{ color: "#6a8fa8", marginTop: "0.5rem" }}>
            {companies.length} companies actively hiring
          </p>
        </div>

        {/* Search */}
        <div style={{ maxWidth: 500, margin: "0 auto 2.5rem" }}>
          <input className="neon-input"
            placeholder="🔍  Search companies or locations..."
            value={search} onChange={e => setSearch(e.target.value)} />
        </div>

        {/* Grid */}
        {loading ? (
          <div className="neon-spinner" />
        ) : filtered.length === 0 ? (
          <div style={{ textAlign: "center", padding: "5rem 0" }}>
            <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>🏢</div>
            <p style={{ color: "#6a8fa8", fontFamily: "'Orbitron',monospace", fontSize: "0.85rem" }}>
              No companies found.
            </p>
          </div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "1.5rem" }}>
            {filtered.map((company, i) => {
              const color = colors[i % colors.length];
              return (
                <div key={company.id} className="glass-card card-3d" style={{ padding: "2rem" }}>

                  {/* Logo + Name */}
                  <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1.25rem" }}>
                    <div style={{
                      width: 56, height: 56, borderRadius: "12px",
                      background: `rgba(${color === "#00f5ff" ? "0,245,255" : color === "#bf00ff" ? "191,0,255" : color === "#ff006e" ? "255,0,110" : color === "#00ff88" ? "0,255,136" : "255,215,0"},0.1)`,
                      border: `1px solid ${color}44`,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      flexShrink: 0, overflow: "hidden",
                    }}>
                      {company.logo ? (
                        <img src={company.logo} alt={company.companyName}
                          style={{ width: "100%", height: "100%", objectFit: "contain", padding: "6px" }}
                          onError={e => { e.target.style.display = "none"; e.target.nextSibling.style.display = "flex"; }} />
                      ) : null}
                      <span style={{ fontSize: "1.4rem", display: company.logo ? "none" : "flex" }}>🏢</span>
                    </div>
                    <div>
                      <h3 style={{ color: "#e8f4ff", fontSize: "1rem", fontWeight: 700,
                        marginBottom: "0.2rem" }}>{company.companyName}</h3>
                      <div style={{ color: "#6a8fa8", fontSize: "0.8rem" }}>📍 {company.location}</div>
                    </div>
                  </div>

                  {/* Description */}
                  <p style={{ color: "#7a9bb5", fontSize: "0.85rem", lineHeight: 1.6,
                    marginBottom: "1.25rem", overflow: "hidden",
                    display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical" }}>
                    {company.description}
                  </p>

                  <hr style={{ border: "none", borderTop: "1px solid rgba(255,255,255,0.05)", margin: "0 0 1rem" }} />

                  {/* Details */}
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem", marginBottom: "1.25rem" }}>
                    {company.website && (
                      <a href={company.website} target="_blank" rel="noreferrer"
                        style={{ color, fontSize: "0.8rem", textDecoration: "none",
                          display: "flex", alignItems: "center", gap: "0.4rem" }}>
                        🌐 {company.website.replace("https://","").replace("http://","")}
                      </a>
                    )}
                    {company.email && (
                      <div style={{ color: "#6a8fa8", fontSize: "0.8rem" }}>
                        ✉️ {company.email}
                      </div>
                    )}
                    {company.phone && (
                      <div style={{ color: "#6a8fa8", fontSize: "0.8rem" }}>
                        📞 {company.phone}
                      </div>
                    )}
                  </div>

                  {/* Badge */}
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{
                      fontFamily: "'Orbitron',monospace", fontSize: "0.6rem", fontWeight: 700,
                      letterSpacing: "1px", textTransform: "uppercase",
                      color, border: `1px solid ${color}44`, padding: "0.25rem 0.65rem",
                      borderRadius: "100px", background: `${color}0d`,
                    }}>Hiring</span>
                    <a href={`/jobs`} style={{
                      color, fontFamily: "'Orbitron',monospace", fontSize: "0.65rem",
                      fontWeight: 700, letterSpacing: "1px", textDecoration: "none",
                    }}>View Jobs →</a>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default Companies;
