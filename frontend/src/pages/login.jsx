import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import ParticleBackground from "../components/ParticleBackground";
import { loginUser, setToken } from "../utils/api";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const data = await loginUser(email, password);
      setToken(data.token);
      localStorage.setItem("pg_auth", "true");
      navigate("/dashboard");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: "100vh", background: "#05030f", display: "flex", alignItems: "center", justifyContent: "center", padding: "24px", position: "relative", overflow: "hidden" }}
      className="grid-bg scanline">
      <ParticleBackground />
      <div className="bg-aurora"/>
      <div className="bg-gold-orb"/>

      <div style={{ position: "relative", zIndex: 10, width: "100%", maxWidth: "440px" }}>

        <motion.div
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.23,1,0.32,1] }}
          style={{ textAlign: "center", marginBottom: "48px" }}
        >
          <motion.div
            animate={{ boxShadow: ["0 0 30px rgba(139,92,246,0.5)", "0 0 60px rgba(245,158,11,0.4)", "0 0 30px rgba(6,182,212,0.5)", "0 0 30px rgba(139,92,246,0.5)"] }}
            transition={{ duration: 4, repeat: Infinity }}
            style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", height: "88px", width: "88px", borderRadius: "28px", background: "rgba(139,92,246,0.08)", border: "1px solid rgba(139,92,246,0.2)", marginBottom: "28px" }}
          >
            <motion.div
              animate={{ scale: [1, 1.15, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              style={{ height: "32px", width: "32px", borderRadius: "50%", background: "linear-gradient(135deg, #a78bfa, #06b6d4)" }}
            />
          </motion.div>

          <h1 className="gradient-text" style={{ fontSize: "52px", fontWeight: 900, letterSpacing: "-0.03em", lineHeight: 1, marginBottom: "12px" }}>
            PulseGrid
          </h1>
          <p style={{ fontSize: "11px", fontFamily: "monospace", color: "#374151", letterSpacing: "0.3em", textTransform: "uppercase", marginBottom: "16px" }}>
            Distributed System Monitor
          </p>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "rgba(34,197,94,0.06)", border: "1px solid rgba(34,197,94,0.15)", padding: "6px 14px", borderRadius: "999px" }}>
            <motion.div animate={{ scale: [1, 1.3, 1] }} transition={{ duration: 2, repeat: Infinity }} style={{ height: "6px", width: "6px", borderRadius: "50%", background: "#4ade80" }} />
            <span style={{ fontSize: "10px", fontFamily: "monospace", color: "#4ade80", letterSpacing: "0.2em" }}>ALL SYSTEMS OPERATIONAL</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.23,1,0.32,1] }}
          className="glass border-animated"
          style={{ borderRadius: "28px", padding: "44px" }}
        >
          <div style={{ marginBottom: "36px" }}>
            <h2 style={{ fontSize: "26px", fontWeight: 800, color: "white", marginBottom: "8px" }}>Welcome back</h2>
            <p style={{ color: "#6b7280", fontSize: "14px" }}>Sign in to your monitoring workspace</p>
          </div>

          <form onSubmit={handleLogin}>
            <div style={{ marginBottom: "20px" }}>
              <label style={{ display: "block", fontSize: "10px", fontFamily: "monospace", color: "#6b7280", textTransform: "uppercase", letterSpacing: "0.25em", marginBottom: "10px" }}>
                Email Address
              </label>
              <input
                type="email" value={email} onChange={e => setEmail(e.target.value)}
                placeholder="admin@pulsegrid.io" required
                style={{ width: "100%", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "14px", padding: "14px 18px", color: "white", fontSize: "14px", fontFamily: "monospace", outline: "none", boxSizing: "border-box", transition: "all 0.3s" }}
                onFocus={e => { e.target.style.borderColor = "rgba(139,92,246,0.4)"; e.target.style.background = "rgba(139,92,246,0.04)"; }}
                onBlur={e => { e.target.style.borderColor = "rgba(255,255,255,0.08)"; e.target.style.background = "rgba(255,255,255,0.03)"; }}
              />
            </div>

            <div style={{ marginBottom: "28px" }}>
              <label style={{ display: "block", fontSize: "10px", fontFamily: "monospace", color: "#6b7280", textTransform: "uppercase", letterSpacing: "0.25em", marginBottom: "10px" }}>
                Password
              </label>
              <input
                type="password" value={password} onChange={e => setPassword(e.target.value)}
                placeholder="••••••••" required
                style={{ width: "100%", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "14px", padding: "14px 18px", color: "white", fontSize: "14px", fontFamily: "monospace", outline: "none", boxSizing: "border-box", transition: "all 0.3s" }}
                onFocus={e => { e.target.style.borderColor = "rgba(139,92,246,0.4)"; e.target.style.background = "rgba(139,92,246,0.04)"; }}
                onBlur={e => { e.target.style.borderColor = "rgba(255,255,255,0.08)"; e.target.style.background = "rgba(255,255,255,0.03)"; }}
              />
            </div>

            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                  style={{ display: "flex", alignItems: "center", gap: "8px", background: "rgba(239,68,68,0.06)", border: "1px solid rgba(239,68,68,0.15)", borderRadius: "12px", padding: "12px 16px", marginBottom: "20px" }}
                >
                  <div style={{ height: "6px", width: "6px", borderRadius: "50%", background: "#f87171", flexShrink: 0 }}/>
                  <p style={{ color: "#f87171", fontSize: "12px", fontFamily: "monospace" }}>{error}</p>
                </motion.div>
              )}
            </AnimatePresence>

            <motion.button
              type="submit" disabled={loading}
              whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}
              style={{ width: "100%", padding: "16px", borderRadius: "14px", border: "none", fontWeight: 800, fontSize: "14px", cursor: loading ? "not-allowed" : "pointer", background: "linear-gradient(135deg, #7c3aed 0%, #0891b2 50%, #d97706 100%)", color: "white", letterSpacing: "0.05em", position: "relative", overflow: "hidden" }}
            >
              {loading ? (
                <span style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "6px" }}>
                  <span className="load-dot" style={{ height: "8px", width: "8px", borderRadius: "50%", background: "white", display: "inline-block" }}/>
                  <span className="load-dot" style={{ height: "8px", width: "8px", borderRadius: "50%", background: "white", display: "inline-block" }}/>
                  <span className="load-dot" style={{ height: "8px", width: "8px", borderRadius: "50%", background: "white", display: "inline-block" }}/>
                </span>
              ) : "Access Dashboard →"}
            </motion.button>
          </form>

          <div style={{ marginTop: "28px", paddingTop: "28px", borderTop: "1px solid rgba(255,255,255,0.05)", textAlign: "center" }}>
            <p style={{ fontSize: "11px", fontFamily: "monospace", color: "#374151" }}>
              Use: admin@pulsegrid.io / admin123
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
          style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "12px", marginTop: "16px" }}
        >
          {[
            { label: "Services", value: "3", colorClass: "gradient-text-cyan" },
            { label: "Uptime", value: "99.9%", colorClass: "gradient-text-gold" },
            { label: "Latency", value: "<2ms", colorClass: "gradient-text" },
          ].map((s, i) => (
            <motion.div key={s.label} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 + i * 0.08 }} className="glass" style={{ borderRadius: "16px", padding: "16px", textAlign: "center" }}>
              <p className={s.colorClass} style={{ fontSize: "22px", fontWeight: 900, fontFamily: "monospace" }}>{s.value}</p>
              <p style={{ fontSize: "9px", fontFamily: "monospace", color: "#4b5563", textTransform: "uppercase", letterSpacing: "0.2em", marginTop: "4px" }}>{s.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}