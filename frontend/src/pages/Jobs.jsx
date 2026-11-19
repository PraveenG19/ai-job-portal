import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";

function Jobs() {
  const [jobs,   setJobs]   = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [loading,setLoading]= useState(true);

  useEffect(() => {
    api.get("/jobs")
      .then(r => setJobs(r.data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const types = ["All", ...new Set(jobs.map(j => j.jobType).filter(Boolean))];

  const filtered = jobs.filter(j => {
    const q = search.toLowerCase();
    const matchQ = !q || j.title?.toLowerCase().includes(q)
      || j.company?.companyName?.toLowerCase().includes(q)
      || j.location?.toLowerCase().includes(q);
    const matchT = filter === "All" || j.jobType === filter;
    return matchQ && matchT;
  });

  const saveJob = async (jobId) => {
    const token = localStorage.getItem("token");
    if (!token) { alert("Please login to save jobs"); return; }
    try {
      await api.post("/saved-jobs", { job: { id: jobId } },
        { headers: { Authorization: `Bearer ${token}` } });
      alert("Job saved! ❤️");
    } catch { alert("Could not save job"); }
  };

  return (
    <div style={{ paddingTop: "80px", minHeight: "100vh", padding: "100px 1.5rem 3rem" }}>
      <div style={{ maxWidth: 1300, margin: "0 auto" }}>

        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
          <span style={{ fontFamily: "'Orbitron',monospace", fontSize: "0.65rem", fontWeight: 700,
            letterSpacing: "2px", color: "#ffd700", textTransform: "uppercase" }}>Opportunities</span>
          <h1 style={{ fontFamily: "'Orbitron',monospace", fontWeight: 900,
            fontSize: "clamp(1.8rem,5vw,3rem)", color: "#e8f4ff", marginTop: "0.3rem" }}>
            AVAILABLE <span style={{ color: "#ffd700", textShadow: "0 0 20px #ffd700" }}>JOBS</span>
          </h1>
          <p style={{ color: "#6a8fa8", marginTop: "0.75rem" }}>{jobs.length} positions across top companies</p>
        </div>

        {/* Search & Filter */}
        <div style={{ display: "flex", gap: "1rem", marginBottom: "2.5rem", flexWrap: "wrap" }}>
          <input className="neon-input" style={{ flex: 1, minWidth: 220 }}
            placeholder="🔍  Search by title, company, or location..."
            value={search} onChange={e => setSearch(e.target.value)} />
          <select className="neon-select" style={{ width: "auto", minWidth: 160 }}
            value={filter} onChange={e => setFilter(e.target.value)}>
            {types.map(t => <option key={t}>{t}</option>)}
          </select>
        </div>

        {/* Jobs Grid */}
        {loading ? (
          <div className="neon-spinner" />
        ) : filtered.length === 0 ? (
          <div style={{ textAlign: "center", padding: "5rem 0" }}>
            <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>🔭</div>
            <p style={{ color: "#6a8fa8", fontFamily: "'Orbitron',monospace", fontSize: "0.85rem" }}>
              No jobs found. Adjust your search.
            </p>
          </div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(310px, 1fr))", gap: "1.25rem" }}>
            {filtered.map((job) => (
              <div key={job.id} className="glass-card card-3d" style={{ padding: "1.75rem", display: "flex", flexDirection: "column" }}>
                {/* Top row */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
                  <span style={{ color: "#00f5ff", fontFamily: "'Orbitron',monospace", fontSize: "0.6rem",
                    fontWeight: 700, letterSpacing: "1px", textTransform: "uppercase",
                    border: "1px solid rgba(0,245,255,0.3)", padding: "0.2rem 0.6rem",
                    borderRadius: "100px", background: "rgba(0,245,255,0.05)" }}>
                    {job.jobType || "Full-time"}
                  </span>
                  <span style={{ color: "#00ff88", fontWeight: 700, fontSize: "0.9rem",
                    textShadow: "0 0 10px rgba(0,255,136,0.4)" }}>₹{job.salary}</span>
                </div>

                <h3 style={{ color: "#e8f4ff", fontSize: "1.05rem", fontWeight: 600, marginBottom: "0.4rem" }}>{job.title}</h3>
                <div style={{ color: "#7a9bb5", fontSize: "0.83rem", marginBottom: "0.25rem" }}>
                  🏢 <span style={{ color: "#a0bcd0" }}>{job.company?.companyName || "Company"}</span>
                </div>
                <div style={{ color: "#7a9bb5", fontSize: "0.83rem", marginBottom: "0.25rem" }}>📍 {job.location}</div>
                <div style={{ color: "#7a9bb5", fontSize: "0.83rem", marginBottom: "1.25rem" }}>💼 {job.experience || "Open"}</div>

                <p style={{ color: "#5a7a90", fontSize: "0.83rem", lineHeight: 1.5, marginBottom: "1.25rem",
                  overflow: "hidden", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical" }}>
                  {job.description}
                </p>

                {/* Actions */}
                <div style={{ marginTop: "auto", display: "flex", gap: "0.6rem", flexWrap: "wrap" }}>
                  <Link to={`/jobs/${job.id}`} style={{
                    flex: 1, textAlign: "center",
                    background: "linear-gradient(135deg, #00f5ff, #bf00ff)",
                    color: "#000", fontFamily: "'Orbitron',monospace",
                    fontWeight: 900, fontSize: "0.63rem", letterSpacing: "1px",
                    textTransform: "uppercase", padding: "0.6rem 0.8rem",
                    borderRadius: "8px", textDecoration: "none",
                    boxShadow: "0 0 15px rgba(0,245,255,0.25)",
                  }}>Details</Link>
                  <Link to={`/apply-job/${job.id}`} style={{
                    flex: 1, textAlign: "center",
                    color: "#00ff88", fontFamily: "'Orbitron',monospace",
                    fontWeight: 700, fontSize: "0.63rem", letterSpacing: "1px",
                    textTransform: "uppercase", padding: "0.6rem 0.8rem",
                    border: "1px solid rgba(0,255,136,0.4)", borderRadius: "8px",
                    textDecoration: "none", background: "rgba(0,255,136,0.04)",
                  }}>Apply</Link>
                  <button onClick={() => saveJob(job.id)} style={{
                    background: "rgba(255,0,110,0.06)", border: "1px solid rgba(255,0,110,0.3)",
                    color: "#ff006e", borderRadius: "8px", padding: "0.6rem 0.8rem",
                    cursor: "pointer", fontSize: "0.85rem", transition: "all 0.3s",
                  }} title="Save Job">❤️</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Jobs;
