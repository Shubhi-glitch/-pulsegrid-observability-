import { useParams, Link } from "react-router-dom";
import { useSocket } from "../hooks/useSocket";
import { useServiceStats } from "../hooks/useServiceStats";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function ServiceDetail() {
  const { name } = useParams();
  const { metrics, incidents } = useSocket();
  const metric = metrics[name];
  const { stats, loading } = useServiceStats(name);
  const [liveHistory, setLiveHistory] = useState([]);

  useEffect(() => {
    // DB se history load karo
    if (stats?.recentMetrics) {
      setLiveHistory(stats.recentMetrics.map(m => m.cpu));
    }
  }, [stats]);

  useEffect(() => {
    // Live updates add karo
    if (metric) {
      setLiveHistory(prev => [...prev.slice(-29), metric.cpu]);
    }
  }, [metric?.cpu]);

  const serviceIncidents = incidents.filter(i => i.service === name);
  const isAlert = metric?.cpu > 80;

  if (!metric && loading) return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "60vh" }}>
      <div style={{ textAlign: "center" }}>
        <div style={{ display: "flex", gap: "8px", justifyContent: "center", marginBottom: "16px" }}>
          <div className="load-dot" style={{ height: "10px", width: "10px", borderRadius: "50%", background: "#8b5cf6", display: "inline-block" }}/>
          <div className="load-dot" style={{ height: "10px", width: "10px", borderRadius: "50%", background: "#06b6d4", display: "inline-block" }}/>
          <div className="load-dot" style={{ height: "10px", width: "10px", borderRadius: "50%", background: "#f59e0b", display: "inline-block" }}/>
        </div>
        <p style={{ fontSize: "11px", fontFamily: "monospace", color: "#4b5563" }}>Loading service data...</p>
      </div>
    </div>
  );

  if (!metric) return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "60vh" }}>
      <p style={{ color: "#6b7280", fontFamily: "monospace" }}>Service not found</p>
    </div>
  );

  return (
    <main style={{ maxWidth: "1024px", margin: "0 auto", padding: "80px 48px" }}>
      <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ ease: [0.23,1,0.32,1] }}>

        <Link to="/" style={{ display: "inline-flex", alignItems: "center", gap: "8px", fontSize: "12px", fontFamily: "monospace", color: "#6b7280", textDecoration: "none", marginBottom: "48px", transition: "color 0.3s" }}
          onMouseEnter={e => e.currentTarget.style.color = "#d1d5db"}
          onMouseLeave={e => e.currentTarget.style.color = "#6b7280"}>
          ← Back to Dashboard
        </Link>

        {/* Header */}
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "56px", marginTop: "24px" }}>
          <div>
            <p style={{ fontSize: "10px", fontFamily: "monospace", color: "#4b5563", textTransform: "uppercase", letterSpacing: "0.35em", marginBottom: "16px" }}>
              Service Inspector
            </p>
            <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
              <motion.div
                animate={isAlert ? { scale: [1, 1.2, 1] } : {}}
                transition={{ duration: 1, repeat: Infinity }}
                style={{ height: "16px", width: "16px", borderRadius: "50%", background: isAlert ? "#f87171" : "#a78bfa", flexShrink: 0 }}
              />
              <h1 className="gradient-text" style={{ fontSize: "64px", fontWeight: 900, letterSpacing: "-0.03em", lineHeight: 1 }}>
                {name}
              </h1>
            </div>
          </div>
          <div className={isAlert ? "glass-red" : "glass-purple"} style={{ borderRadius: "16px", padding: "12px 20px" }}>
            <p style={{ fontSize: "11px", fontFamily: "monospace", fontWeight: 700, color: isAlert ? "#f87171" : "#a78bfa" }}>
              {isAlert ? "⚠ CRITICAL" : "● HEALTHY"}
            </p>
          </div>
        </div>

        {/* Stats grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px", marginBottom: "40px" }}>
          {[
            { label: "Current CPU", value: `${metric.cpu}%`, colorClass: isAlert ? "gradient-text-red" : "gradient-text", glassClass: isAlert ? "glass-red glow-red" : "glass-purple glow-purple" },
            { label: "Total Incidents", value: stats?.totalIncidents ?? serviceIncidents.length, colorClass: "gradient-text-gold", glassClass: "glass-gold" },
            { label: "Avg CPU (30 readings)", value: stats ? `${stats.avgCpu}%` : "—", colorClass: "gradient-text-cyan", glassClass: "glass-cyan" },
          ].map(stat => (
            <div key={stat.label} className={stat.glassClass} style={{ borderRadius: "24px", padding: "32px" }}>
              <p style={{ fontSize: "10px", fontFamily: "monospace", color: "#4b5563", textTransform: "uppercase", letterSpacing: "0.2em", marginBottom: "12px" }}>{stat.label}</p>
              <p className={stat.colorClass} style={{ fontSize: "40px", fontWeight: 900, fontFamily: "monospace" }}>{stat.value}</p>
            </div>
          ))}
        </div>

        {/* CPU History */}
        <div className="glass" style={{ borderRadius: "24px", padding: "36px", marginBottom: "32px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "32px" }}>
            <p style={{ fontSize: "10px", fontFamily: "monospace", color: "#4b5563", textTransform: "uppercase", letterSpacing: "0.25em" }}>
              CPU History
            </p>
            <div style={{ flex: 1, height: "1px", background: "rgba(255,255,255,0.04)" }}/>
            <p style={{ fontSize: "10px", fontFamily: "monospace", color: "#374151" }}>{liveHistory.length} readings</p>
          </div>

          {liveHistory.length === 0 ? (
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "128px", color: "#4b5563", fontSize: "12px", fontFamily: "monospace" }}>
              Collecting data...
            </div>
          ) : (
            <div style={{ position: "relative" }}>
              <div style={{ display: "flex", alignItems: "flex-end", gap: "3px", height: "128px" }}>
                {liveHistory.map((val, i) => (
                  <motion.div
                    key={i}
                    initial={{ scaleY: 0 }}
                    animate={{ scaleY: 1 }}
                    style={{
                      flex: 1,
                      borderRadius: "3px",
                      transformOrigin: "bottom",
                      height: `${val}%`,
                      background: val > 80
                        ? "linear-gradient(to top, #ef4444, #f97316)"
                        : val > 60
                          ? "linear-gradient(to top, #f59e0b, #fbbf24)"
                          : "linear-gradient(to top, #8b5cf6, #06b6d4)",
                      opacity: 0.6 + (i / liveHistory.length) * 0.4,
                    }}
                  />
                ))}
              </div>
              {/* 80% threshold line */}
              <div style={{ position: "absolute", left: 0, right: 0, bottom: "80%", height: "1px", background: "rgba(239,68,68,0.2)", pointerEvents: "none" }}>
                <span style={{ position: "absolute", right: 0, top: "-14px", fontSize: "9px", fontFamily: "monospace", color: "rgba(239,68,68,0.4)" }}>80% threshold</span>
              </div>
            </div>
          )}

          <div style={{ display: "flex", justifyContent: "space-between", marginTop: "12px" }}>
            <span style={{ fontSize: "10px", fontFamily: "monospace", color: "#374151" }}>← oldest</span>
            <span style={{ fontSize: "10px", fontFamily: "monospace", color: "#374151" }}>latest →</span>
          </div>
        </div>

        {/* Incidents */}
        {serviceIncidents.length > 0 && (
          <div className="glass" style={{ borderRadius: "24px", padding: "36px" }}>
            <p style={{ fontSize: "10px", fontFamily: "monospace", color: "#4b5563", textTransform: "uppercase", letterSpacing: "0.25em", marginBottom: "24px" }}>
              Incidents This Session
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {serviceIncidents.map((inc, i) => (
                <div key={i}
                  className={inc.status === "open" ? "glass-red" : "glass"}
                  style={{ display: "flex", alignItems: "center", gap: "16px", borderRadius: "16px", padding: "16px 20px", border: inc.status !== "open" ? "1px solid rgba(255,255,255,0.04)" : undefined }}
                >
                  <div style={{ height: "8px", width: "8px", borderRadius: "50%", flexShrink: 0, background: inc.status === "open" ? "#f87171" : "rgba(167,139,250,0.5)" }}
                    className={inc.status === "open" ? "animate-pulse" : ""}
                  />
                  <p style={{ flex: 1, fontSize: "13px", color: "#d1d5db", fontFamily: "monospace" }}>{inc.message}</p>
                  <span style={{ fontSize: "11px", fontFamily: "monospace", padding: "4px 12px", borderRadius: "999px", background: inc.status === "open" ? "rgba(239,68,68,0.1)" : "rgba(139,92,246,0.1)", color: inc.status === "open" ? "#f87171" : "#a78bfa" }}>
                    {inc.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

      </motion.div>
    </main>
  );
}