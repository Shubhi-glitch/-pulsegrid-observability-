import { useSocket } from "../hooks/useSocket";
import { motion } from "framer-motion";

export default function Incidents() {
  const { incidents } = useSocket();
  const open = incidents.filter(i => i.status === "open");
  const resolved = incidents.filter(i => i.status === "resolved");

  return (
    <main style={{ maxWidth: "1024px", margin: "0 auto", padding: "80px 48px" }}>
      <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ ease: [0.23,1,0.32,1] }}>

        {/* Header */}
        <div style={{ marginBottom: "64px" }}>
          <p style={{ fontSize: "10px", fontFamily: "monospace", color: "#4b5563", textTransform: "uppercase", letterSpacing: "0.35em", marginBottom: "20px" }}>
            Incident Management
          </p>
          <h1 className="gradient-text" style={{ fontSize: "72px", fontWeight: 900, letterSpacing: "-0.03em", lineHeight: 0.9, marginBottom: "16px" }}>
            Incidents
          </h1>
          <p style={{ color: "#6b7280", fontSize: "16px" }}>
            Full audit trail of all system alerts and resolutions
          </p>
        </div>

        {/* Summary cards */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "24px", marginBottom: "64px" }}>
          <div className="glass-red glow-red" style={{ borderRadius: "24px", padding: "40px" }}>
            <p style={{ fontSize: "10px", fontFamily: "monospace", color: "#6b7280", textTransform: "uppercase", letterSpacing: "0.25em", marginBottom: "16px" }}>
              Active Now
            </p>
            <p className="gradient-text-red" style={{ fontSize: "72px", fontWeight: 900, fontFamily: "monospace", lineHeight: 1, marginBottom: "8px" }}>
              {open.length}
            </p>
            <p style={{ fontSize: "12px", fontFamily: "monospace", color: "#6b7280" }}>
              {open.length === 0 ? "All systems clear" : `${open.length} service${open.length > 1 ? "s" : ""} in critical state`}
            </p>
          </div>

          <div className="glass-purple glow-purple" style={{ borderRadius: "24px", padding: "40px" }}>
            <p style={{ fontSize: "10px", fontFamily: "monospace", color: "#6b7280", textTransform: "uppercase", letterSpacing: "0.25em", marginBottom: "16px" }}>
              Resolved
            </p>
            <p className="gradient-text" style={{ fontSize: "72px", fontWeight: 900, fontFamily: "monospace", lineHeight: 1, marginBottom: "8px" }}>
              {resolved.length}
            </p>
            <p style={{ fontSize: "12px", fontFamily: "monospace", color: "#6b7280" }}>
              This session
            </p>
          </div>
        </div>

        {/* Active incidents */}
        {open.length > 0 && (
          <section style={{ marginBottom: "48px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "24px" }}>
              <motion.div
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
                style={{ height: "8px", width: "8px", borderRadius: "50%", background: "#f87171", flexShrink: 0 }}
              />
              <p style={{ fontSize: "10px", fontFamily: "monospace", color: "#f87171", textTransform: "uppercase", letterSpacing: "0.2em" }}>
                Active ({open.length})
              </p>
              <div style={{ flex: 1, height: "1px", background: "rgba(239,68,68,0.1)" }}/>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {open.map((inc, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06 }}
                  className="glass-red"
                  style={{ borderRadius: "16px", padding: "20px 24px", display: "flex", alignItems: "center", gap: "20px" }}
                >
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    style={{ height: "10px", width: "10px", borderRadius: "50%", background: "#f87171", flexShrink: 0 }}
                  />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ fontWeight: 700, color: "white", fontSize: "15px", marginBottom: "4px" }}>{inc.service}</p>
                    <p style={{ color: "#9ca3af", fontSize: "12px", fontFamily: "monospace" }}>{inc.message}</p>
                  </div>
                  <div style={{ textAlign: "right", flexShrink: 0 }}>
                    <p style={{ color: "#f87171", fontFamily: "monospace", fontWeight: 700, fontSize: "16px" }}>{inc.cpuAtIncident}%</p>
                    <p style={{ fontSize: "10px", color: "#6b7280", fontFamily: "monospace", marginTop: "4px" }}>CPU at trigger</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>
        )}

        {/* Resolved */}
        <section>
          <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "24px" }}>
            <div style={{ height: "8px", width: "8px", borderRadius: "50%", background: "#a78bfa" }}/>
            <p style={{ fontSize: "10px", fontFamily: "monospace", color: "#a78bfa", textTransform: "uppercase", letterSpacing: "0.2em" }}>
              Resolved ({resolved.length})
            </p>
            <div style={{ flex: 1, height: "1px", background: "rgba(139,92,246,0.1)" }}/>
          </div>

          {resolved.length === 0 ? (
            <div className="glass" style={{ borderRadius: "24px", padding: "64px", textAlign: "center" }}>
              <p style={{ fontSize: "48px", marginBottom: "16px" }}>✓</p>
              <p style={{ color: "#6b7280", fontFamily: "monospace", fontSize: "13px" }}>
                No resolved incidents yet this session
              </p>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {resolved.map((inc, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.04 }}
                  className="glass"
                  style={{
                    borderRadius: "16px",
                    padding: "20px 24px",
                    display: "flex",
                    alignItems: "center",
                    gap: "20px",
                    border: "1px solid rgba(255,255,255,0.04)",
                    transition: "border-color 0.3s",
                  }}
                >
                  <div style={{ height: "8px", width: "8px", borderRadius: "50%", background: "rgba(167,139,250,0.5)", flexShrink: 0 }}/>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ fontWeight: 600, color: "#d1d5db", fontSize: "15px", marginBottom: "4px" }}>{inc.service}</p>
                    <p style={{ color: "#6b7280", fontSize: "12px", fontFamily: "monospace" }}>{inc.message}</p>
                  </div>
                  <div style={{ textAlign: "right", flexShrink: 0 }}>
                    <p style={{ color: "#a78bfa", fontFamily: "monospace", fontSize: "14px" }}>{inc.cpuAtIncident}%</p>
                    <p style={{ fontSize: "10px", color: "#4b5563", fontFamily: "monospace", marginTop: "4px" }}>resolved</p>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </section>
      </motion.div>
    </main>
  );
}