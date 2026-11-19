import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

function Navbar() {
  const [scrolled,  setScrolled]  = useState(false);
  const [menuOpen,  setMenuOpen]  = useState(false);
  const [userRole,  setUserRole]  = useState(null);
  const navigate   = useNavigate();
  const location   = useLocation();
  const isLoggedIn = !!localStorage.getItem("token");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const role = localStorage.getItem("role");
    setUserRole(role);
    setMenuOpen(false);
  }, [location]);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  };

  const getDashboardPath = () => {
    if (userRole === "HR")    return "/hr-dashboard";
    if (userRole === "ADMIN") return "/admin-dashboard";
    return "/student-dashboard";
  };

  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000,
      background: scrolled
        ? "rgba(2,4,8,0.95)"
        : "rgba(2,4,8,0.7)",
      backdropFilter: "blur(20px)",
      borderBottom: scrolled
        ? "1px solid rgba(0,245,255,0.3)"
        : "1px solid rgba(0,245,255,0.1)",
      transition: "all 0.3s ease",
      padding: "0.75rem 0",
    }}>
      <div style={{ maxWidth: 1300, margin: "0 auto", padding: "0 1.5rem",
                    display: "flex", alignItems: "center", justifyContent: "space-between" }}>

        {/* Logo */}
        <Link to="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: "0.6rem" }}>
          <div style={{
            width: 36, height: 36, borderRadius: "10px",
            background: "linear-gradient(135deg, #00f5ff, #bf00ff)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: "1.1rem", fontWeight: 900, color: "#000",
            boxShadow: "0 0 15px rgba(0,245,255,0.5)",
          }}>⬡</div>
          <span style={{
            fontFamily: "'Orbitron',monospace", fontWeight: 900, fontSize: "1.1rem",
            background: "linear-gradient(90deg, #00f5ff, #bf00ff)",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
            letterSpacing: "1px",
          }}>AI JOB PORTAL</span>
        </Link>

        {/* Desktop Nav */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.25rem" }}
             className="desktop-nav">
          {[
            { label: "Home",      path: "/" },
            { label: "Jobs",      path: "/jobs" },
            { label: "Companies", path: "/companies" },
          ].map(({ label, path }) => (
            <Link key={path} to={path} style={{
              color: location.pathname === path ? "#00f5ff" : "#a0bcd0",
              fontFamily: "'Orbitron',monospace", fontSize: "0.68rem",
              fontWeight: 700, letterSpacing: "1.2px", textTransform: "uppercase",
              padding: "0.5rem 0.9rem", borderRadius: "8px",
              textDecoration: "none", transition: "all 0.3s",
              background: location.pathname === path ? "rgba(0,245,255,0.08)" : "transparent",
              textShadow: location.pathname === path ? "0 0 10px #00f5ff" : "none",
            }}>{label}</Link>
          ))}

          {!isLoggedIn ? (
            <>
              <Link to="/login" style={{
                marginLeft: "0.5rem",
                color: "#00f5ff", fontFamily: "'Orbitron',monospace",
                fontSize: "0.68rem", fontWeight: 700, letterSpacing: "1.2px",
                textTransform: "uppercase", padding: "0.5rem 1.1rem",
                border: "1px solid rgba(0,245,255,0.4)", borderRadius: "8px",
                textDecoration: "none", transition: "all 0.3s",
              }}>Login</Link>
              <Link to="/register" style={{
                marginLeft: "0.5rem",
                background: "linear-gradient(135deg, #00f5ff, #bf00ff)",
                color: "#000", fontFamily: "'Orbitron',monospace",
                fontSize: "0.68rem", fontWeight: 900, letterSpacing: "1.2px",
                textTransform: "uppercase", padding: "0.55rem 1.2rem",
                borderRadius: "8px", textDecoration: "none",
                boxShadow: "0 0 15px rgba(0,245,255,0.3)", transition: "all 0.3s",
              }}>Register</Link>
            </>
          ) : (
            <>
              <Link to={getDashboardPath()} style={{
                marginLeft: "0.5rem",
                color: "#00f5ff", fontFamily: "'Orbitron',monospace",
                fontSize: "0.68rem", fontWeight: 700, letterSpacing: "1.2px",
                textTransform: "uppercase", padding: "0.5rem 1.1rem",
                border: "1px solid rgba(0,245,255,0.4)", borderRadius: "8px",
                textDecoration: "none",
              }}>Dashboard</Link>
              <Link to="/profile" style={{
                marginLeft: "0.5rem",
                color: "#a0bcd0", fontFamily: "'Orbitron',monospace",
                fontSize: "0.68rem", fontWeight: 700, letterSpacing: "1.2px",
                textTransform: "uppercase", padding: "0.5rem 1.1rem",
                borderRadius: "8px", textDecoration: "none",
              }}>Profile</Link>
              <button onClick={logout} style={{
                marginLeft: "0.5rem",
                background: "transparent",
                border: "1px solid rgba(255,0,110,0.4)", color: "#ff006e",
                fontFamily: "'Orbitron',monospace", fontSize: "0.68rem",
                fontWeight: 700, letterSpacing: "1.2px", textTransform: "uppercase",
                padding: "0.5rem 1.1rem", borderRadius: "8px", cursor: "pointer",
                transition: "all 0.3s",
              }}>Logout</button>
            </>
          )}
        </div>

        {/* Mobile hamburger */}
        <button onClick={() => setMenuOpen(!menuOpen)} style={{
          display: "none", background: "transparent", border: "none",
          color: "#00f5ff", fontSize: "1.5rem", cursor: "pointer",
        }} className="mobile-menu-btn">☰</button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div style={{
          background: "rgba(2,4,8,0.98)", borderTop: "1px solid rgba(0,245,255,0.15)",
          padding: "1rem 1.5rem", display: "flex", flexDirection: "column", gap: "0.75rem",
        }}>
          {["/", "/jobs", "/companies"].map((path) => (
            <Link key={path} to={path} style={{ color: "#a0bcd0", fontFamily: "'Orbitron',monospace",
              fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "1px", textDecoration: "none" }}>
              {path === "/" ? "Home" : path.slice(1).charAt(0).toUpperCase() + path.slice(2)}
            </Link>
          ))}
          {!isLoggedIn ? (
            <><Link to="/login" style={{ color: "#00f5ff", fontFamily: "'Orbitron',monospace", fontSize: "0.75rem", textDecoration: "none" }}>Login</Link>
            <Link to="/register" style={{ color: "#bf00ff", fontFamily: "'Orbitron',monospace", fontSize: "0.75rem", textDecoration: "none" }}>Register</Link></>
          ) : (
            <><Link to={getDashboardPath()} style={{ color: "#00f5ff", fontFamily: "'Orbitron',monospace", fontSize: "0.75rem", textDecoration: "none" }}>Dashboard</Link>
            <button onClick={logout} style={{ background: "none", border: "none", color: "#ff006e", fontFamily: "'Orbitron',monospace", fontSize: "0.75rem", textAlign: "left", cursor: "pointer", padding: 0 }}>Logout</button></>
          )}
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: block !important; }
        }
      `}</style>
    </nav>
  );
}

export default Navbar;
