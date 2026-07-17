import { useState } from "react";
import { motion } from "framer-motion";

const stack = [
  { key: "Frontend", value: "React 18 + Vite 8" },
  { key: "Styling", value: "Tailwind CSS v4" },
  { key: "3D Engine", value: "Three.js + React Three Fiber" },
  { key: "Real-time", value: "Socket.io (WebSocket)" },
  { key: "Animations", value: "Framer Motion" },
  { key: "Backend", value: "Node.js + Express" },
  { key: "Database", value: "MongoDB + Mongoose" },
];

export default function Settings() {
  const [threshold, setThreshold] = useState(80);
  const [pollInterval, setPollInterval] = useState(2);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <main style={{ maxWidth: "768px", margin: "0 auto", padding: "80px 48px" }}>
      <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ ease: [0.23,1,0.32,1] }}>

        {/* Header */}
        <div style={{ marginBottom: "64px" }}>
          <p style={{ fontSize: "10px", fontFamily: "monospace", color: "#4b5563", textTransform: "uppercase", letterSpacing: "0.35em", marginBottom: "20px" }}>
            Configuration
          </p>
          <h1 className="gradient-text" style={{ fontSize: "72px", fontWeight: 900, letterSpacing: "-0.03em", lineHeight: 0.9, marginBottom: "16px" }}>
            Settings
          </h1>
          <p style={{ color: "#6b7280", fontSize: "16px" }}>
            Monitoring rules and system configuration
          </p>
        </div>

        {/* Alert Rules Card */}
        <div className="glass-purple glow-purple" style={{ borderRadius: "28px", padding: "44px", marginBottom: "24px" }}>
          <p style={{ fontSize: "10px", fontFamily: "monospace", color: "#a78bfa", textTransform: "uppercase", letterSpacing: "0.25em", marginBottom: "40px" }}>
            Alert Rules
          </p>

          {/* CPU Threshold */}
          <div style={{ marginBottom: "44px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "20px" }}>
              <div>
                <p style={{ fontWeight: 600, color: "white", fontSize: "16px", marginBottom: "6px" }}>CPU Alert Threshold</p>
                <p style={{ color: "#6b7280", fontSize: "12px", fontFamily: "monospace" }}>
                  Trigger incident when CPU exceeds this value
                </p>
              </div>
              <p className="gradient-text-gold" style={{ fontSize: "40px", fontWeight: 900, fontFamily: "monospace", lineHeight: 1 }}>
                {threshold}%
              </p>
            </div>
            <div style={{ position: "relative" }}>
              <input
                type="range" min="50" max="95" step="5"
                value={threshold}
                onChange={e => setThreshold(Number(e.target.value))}
                style={{
                  width: "100%",
                  height: "3px",
                  borderRadius: "999px",
                  appearance: "none",
                  cursor: "pointer",
                  background: `linear-gradient(to right, #8b5cf6 0%, #06b6d4 ${((threshold - 50) / 45) * 100}%, rgba(255,255,255,0.06) ${((threshold - 50) / 45) * 100}%)`,
                  outline: "none",
                }}
              />
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: "10px" }}>
              {["50%", "65%", "80%", "95%"].map(v => (
                <span key={v} style={{ fontSize: "10px", fontFamily: "monospace", color: "#374151" }}>{v}</span>
              ))}
            </div>
          </div>

          {/* Poll Interval */}
          <div style={{ marginBottom: "44px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "20px" }}>
              <div>
                <p style={{ fontWeight: 600, color: "white", fontSize: "16px", marginBottom: "6px" }}>Poll Interval</p>
                <p style={{ color: "#6b7280", fontSize: "12px", fontFamily: "monospace" }}>
                  How often metrics are sampled
                </p>
              </div>
              <p className="gradient-text-cyan" style={{ fontSize: "40px", fontWeight: 900, fontFamily: "monospace", lineHeight: 1 }}>
                {pollInterval}s
              </p>
            </div>
            <input
              type="range" min="1" max="10" step="1"
              value={pollInterval}
              onChange={e => setPollInterval(Number(e.target.value))}
              style={{
                width: "100%",
                height: "3px",
                borderRadius: "999px",
                appearance: "none",
                cursor: "pointer",
                background: `linear-gradient(to right, #06b6d4 0%, #8b5cf6 ${((pollInterval - 1) / 9) * 100}%, rgba(255,255,255,0.06) ${((pollInterval - 1) / 9) * 100}%)`,
                outline: "none",
              }}
            />
          </div>

          {/* Save button */}
          <motion.button
            onClick={handleSave}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            style={{
              width: "100%",
              padding: "18px",
              borderRadius: "16px",
              border: saved ? "1px solid rgba(34,197,94,0.3)" : "none",
              fontWeight: 800,
              fontSize: "14px",
              cursor: "pointer",
              letterSpacing: "0.05em",
              transition: "all 0.5s",
              background: saved
                ? "rgba(34,197,94,0.08)"
                : "linear-gradient(135deg, #7c3aed, #0891b2)",
              color: saved ? "#4ade80" : "white",
            }}
          >
            {saved ? "✓ Configuration Saved" : "Save Configuration"}
          </motion.button>
        </div>

        {/* Tech Stack Card */}
        <div className="glass" style={{ borderRadius: "28px", padding: "44px" }}>
          <p style={{ fontSize: "10px", fontFamily: "monospace", color: "#4b5563", textTransform: "uppercase", letterSpacing: "0.25em", marginBottom: "32px" }}>
            Tech Stack
          </p>

          <div>
            {stack.map((item, i) => (
              <motion.div
                key={item.key}
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.06 }}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "18px 0",
                  borderBottom: i < stack.length - 1 ? "1px solid rgba(255,255,255,0.04)" : "none",
                }}
              >
                <span style={{ fontSize: "11px", fontFamily: "monospace", color: "#6b7280", textTransform: "uppercase", letterSpacing: "0.15em" }}>
                  {item.key}
                </span>
                <span className={i % 3 === 0 ? "gradient-text-cyan" : i % 3 === 1 ? "gradient-text" : "gradient-text-gold"}
                  style={{ fontSize: "12px", fontFamily: "monospace", fontWeight: 600 }}>
                  {item.value}
                </span>
              </motion.div>
            ))}
          </div>

          <div style={{ marginTop: "32px", paddingTop: "32px", borderTop: "1px solid rgba(255,255,255,0.04)", textAlign: "center" }}>
            <p style={{ fontSize: "11px", fontFamily: "monospace", color: "#374151" }}>
              PulseGrid v1.0.0 — Built for FAANG-level portfolio
            </p>
          </div>
        </div>

      </motion.div>
    </main>
  );
}