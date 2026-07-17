import { BrowserRouter, Routes, Route, Link, useLocation, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSocket } from "./hooks/useSocket";
import { motion, AnimatePresence } from "framer-motion";
import ParticleBackground from "./components/ParticleBackground";
import { useTheme } from "./context/ThemeContext";
import Dashboard from "./pages/Dashboard";
import Incidents from "./pages/Incidents";
import Settings from "./pages/Settings";
import ServiceDetail from "./pages/ServiceDetail";
import Login from "./pages/Login";
import Landing from "./pages/Landing";
import { verifyToken, clearToken } from "./utils/api";

function ProtectedRoute({ children }) {
  const [authState, setAuthState] = useState("checking");

  useEffect(() => {
    async function check() {
      const token = localStorage.getItem("pg_token");
      if (!token) { setAuthState("unauthenticated"); return; }
      const valid = await verifyToken(token);
      setAuthState(valid ? "authenticated" : "unauthenticated");
    }
    check();
  }, []);

  if (authState === "checking") {
    return (
      <div style={{ minHeight: "100vh", background: "var(--bg)", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ textAlign: "center" }}>
          <div style={{ display: "flex", gap: "8px", justifyContent: "center", marginBottom: "16px" }}>
            <div className="load-dot" style={{ height: "10px", width: "10px", borderRadius: "50%", background: "#8b5cf6", display: "inline-block" }}/>
            <div className="load-dot" style={{ height: "10px", width: "10px", borderRadius: "50%", background: "#06b6d4", display: "inline-block" }}/>
            <div className="load-dot" style={{ height: "10px", width: "10px", borderRadius: "50%", background: "#f59e0b", display: "inline-block" }}/>
          </div>
          <p style={{ fontSize: "11px", fontFamily: "monospace", color: "var(--text-muted)", letterSpacing: "0.2em" }}>VERIFYING SESSION...</p>
        </div>
      </div>
    );
  }

  return authState === "authenticated" ? children : <Navigate to="/login" replace />;
}

function ConnectionBanner({ connected, error }) {
  if (connected) return null;
  return (
    <motion.div
      initial={{ y: -40 }}
      animate={{ y: 0 }}
      style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 9999,
        background: error ? "rgba(239,68,68,0.95)" : "rgba(245,158,11,0.95)",
        backdropFilter: "blur(10px)",
        padding: "10px", textAlign: "center",
        fontSize: "12px", fontFamily: "monospace", color: "white", letterSpacing: "0.1em",
      }}
    >
      {error ? `⚠ Connection error — retrying...` : "⚠ Reconnecting to server..."}
    </motion.div>
  );
}

function Navbar() {
  const { incidents, connected, error } = useSocket();
  const { isDark } = useTheme();
  const activeAlerts = incidents.filter(i => i.status === "open").length;
  const location = useLocation();

  const links = [
    { to: "/dashboard", label: "Dashboard" },
    { to: "/incidents", label: "Incidents" },
    { to: "/settings", label: "Settings" },
  ];

  const handleLogout = () => {
    clearToken();
    window.location.href = "/";
  };

  return (
    <>
      <ConnectionBanner connected={connected} error={error} />
      <nav className="sticky top-0 z-50"
        style={{
          background: isDark ? "rgba(5,3,15,0.85)" : "rgba(248,247,255,0.92)",
          backdropFilter: "blur(40px)",
          borderBottom: `1px solid ${isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.08)"}`,
          transition: "background 0.3s, border-color 0.3s",
        }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 48px", height: "80px", display: "flex", alignItems: "center", justifyContent: "space-between", position: "relative" }}>

          {/* Logo */}
          <Link to="/" style={{ display: "flex", alignItems: "center", gap: "12px", flexShrink: 0, textDecoration: "none" }}>
            <motion.div
              animate={{ boxShadow: ["0 0 12px rgba(139,92,246,0.6)", "0 0 20px rgba(245,158,11,0.5)", "0 0 12px rgba(6,182,212,0.5)", "0 0 12px rgba(139,92,246,0.6)"] }}
              transition={{ duration: 4, repeat: Infinity }}
              style={{ height: "36px", width: "36px", borderRadius: "12px", background: "var(--glass-purple)", border: "1px solid rgba(139,92,246,0.2)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}
            >
              <div style={{ height: "14px", width: "14px", borderRadius: "50%", background: "linear-gradient(135deg, #a78bfa, #06b6d4)" }}/>
            </motion.div>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <span className="gradient-text" style={{ fontWeight: 900, fontSize: "20px", letterSpacing: "-0.02em" }}>PulseGrid</span>
              <span style={{ fontSize: "9px", fontFamily: "monospace", color: "var(--text-faint)", border: "1px solid var(--border)", padding: "2px 8px", borderRadius: "999px", letterSpacing: "0.1em" }}>v1.0</span>
            </div>
          </Link>

          {/* Nav pills */}
          <div style={{ position: "absolute", left: "50%", transform: "translateX(-50%)", display: "flex", alignItems: "center", gap: "4px", padding: "6px", borderRadius: "16px", background: "var(--surface2)", border: "1px solid var(--border)" }}>
            {links.map(link => {
              const isActive = location.pathname === link.to;
              return (
                <Link key={link.to} to={link.to}
                  style={{ position: "relative", padding: "10px 28px", fontSize: "14px", fontWeight: 500, borderRadius: "12px", textDecoration: "none", color: isActive ? (isDark ? "white" : "#0f0a1a") : "var(--text-muted)", letterSpacing: "0.05em", transition: "color 0.3s", whiteSpace: "nowrap" }}>
                  {isActive && (
                    <motion.div
                      layoutId="nav-active"
                      style={{ position: "absolute", inset: 0, borderRadius: "12px", background: isDark ? "linear-gradient(135deg, rgba(139,92,246,0.25), rgba(6,182,212,0.15))" : "linear-gradient(135deg, rgba(139,92,246,0.12), rgba(6,182,212,0.08))", border: "1px solid rgba(139,92,246,0.25)" }}
                      transition={{ type: "spring", bounce: 0.15, duration: 0.5 }}
                    />
                  )}
                  <span style={{ position: "relative", zIndex: 1 }}>{link.label}</span>
                </Link>
              );
            })}
          </div>

          {/* Right side */}
          <div style={{ display: "flex", alignItems: "center", gap: "12px", flexShrink: 0 }}>
            <AnimatePresence>
              {activeAlerts > 0 && (
                <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }}>
                  <Link to="/incidents" style={{ textDecoration: "none" }}>
                    <motion.div
                      animate={{ boxShadow: ["0 0 10px rgba(239,68,68,0.2)", "0 0 20px rgba(239,68,68,0.4)", "0 0 10px rgba(239,68,68,0.2)"] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                      style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "11px", fontFamily: "monospace", padding: "8px 16px", borderRadius: "999px", background: "var(--glass-red)", border: "1px solid rgba(239,68,68,0.25)", cursor: "pointer" }}
                    >
                      <motion.span animate={{ scale: [1, 1.4, 1] }} transition={{ duration: 1, repeat: Infinity }}
                        style={{ height: "6px", width: "6px", borderRadius: "50%", background: "#f87171", flexShrink: 0, display: "inline-block" }}/>
                      <span style={{ color: "#f87171" }}>{activeAlerts} alert{activeAlerts > 1 ? "s" : ""}</span>
                    </motion.div>
                  </Link>
                </motion.div>
              )}
            </AnimatePresence>

            {/* LIVE badge */}
            <div style={{ display: "flex", alignItems: "center", gap: "8px", padding: "6px 12px", borderRadius: "999px", background: connected ? "rgba(34,197,94,0.08)" : "rgba(239,68,68,0.08)", border: `1px solid ${connected ? "rgba(34,197,94,0.2)" : "rgba(239,68,68,0.2)"}` }}>
              <motion.div animate={{ scale: [1, 1.3, 1] }} transition={{ duration: 2, repeat: Infinity }}
                style={{ height: "6px", width: "6px", borderRadius: "50%", background: connected ? "#4ade80" : "#f87171" }}/>
              <span style={{ fontSize: "10px", fontFamily: "monospace", color: connected ? "#4ade80" : "#f87171", letterSpacing: "0.15em" }}>
                {connected ? "LIVE" : "OFFLINE"}
              </span>
            </div>

            <div style={{ width: "1px", height: "20px", background: "var(--border)" }}/>

            <button onClick={handleLogout}
              style={{ fontSize: "11px", fontFamily: "monospace", color: "var(--text-faint)", background: "none", border: "none", cursor: "pointer", padding: "8px 16px", borderRadius: "10px", letterSpacing: "0.05em", transition: "all 0.2s" }}
              onMouseEnter={e => { e.target.style.color = "var(--text-muted)"; e.target.style.background = "var(--surface2)"; }}
              onMouseLeave={e => { e.target.style.color = "var(--text-faint)"; e.target.style.background = "none"; }}>
              logout
            </button>
          </div>
        </div>
      </nav>
    </>
  );
}

function AppLayout() {
  const { isDark } = useTheme();
  const location = useLocation();

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg)", transition: "background 0.4s" }}
      className="grid-bg scanline relative">
      {isDark && <ParticleBackground />}
      {isDark && <div className="bg-aurora"/>}
      {isDark && <div className="bg-gold-orb"/>}
      <div className="relative z-10">
        <Navbar />
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -20, filter: "blur(4px)" }}
            transition={{ duration: 0.4, ease: [0.23,1,0.32,1] }}
          >
            <Routes location={location}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/incidents" element={<Incidents />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/service/:name" element={<ServiceDetail />} />
            </Routes>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/*" element={
          <ProtectedRoute>
            <AppLayout />
          </ProtectedRoute>
        }/>
      </Routes>
    </BrowserRouter>
  );
}