import { useSocket } from "../hooks/useSocket";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import ServiceGraph3D from "../components/ServiceGraph3D";
import CPUChart from "../components/CPUChart";
import UptimeBar from "../components/UptimeBar";

function ServiceCard({ metric, index }) {
  const isAlert = metric.cpu > 80;
  const isWarn = metric.cpu > 60;
  const cpuColor = isAlert ? "#ef4444" : isWarn ? "#f59e0b" : "#8b5cf6";
  const cpuGradient = isAlert
    ? "linear-gradient(135deg, #ef4444, #f97316)"
    : isWarn
      ? "linear-gradient(135deg, #f59e0b, #fbbf24)"
      : "linear-gradient(135deg, #8b5cf6, #06b6d4)";

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.12, ease: [0.23,1,0.32,1] }}
    >
      <Link to={`/service/${metric.service}`} style={{ textDecoration: "none" }}>
        <div
          className={`card-hover ${isAlert ? "glass-red glow-red" : "glass glow-purple"}`}
          style={{ position: "relative", borderRadius: "24px", padding: "36px", overflow: "hidden" }}
        >
          <div style={{ position: "absolute", top: "-40px", right: "-40px", width: "160px", height: "160px", borderRadius: "50%", filter: "blur(48px)", opacity: 0.12, background: cpuColor, pointerEvents: "none" }}/>

          {isAlert && (
            <div style={{ position: "absolute", top: "24px", right: "24px" }}>
              <span style={{ position: "relative", display: "flex", height: "12px", width: "12px" }}>
                <span className="animate-ping" style={{ position: "absolute", display: "inline-flex", height: "100%", width: "100%", borderRadius: "50%", background: "#f87171", opacity: 0.75 }}/>
                <span style={{ position: "relative", display: "inline-flex", borderRadius: "50%", height: "12px", width: "12px", background: "#ef4444" }}/>
              </span>
            </div>
          )}

          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "32px" }}>
            <div>
              <p style={{ fontSize: "10px", fontFamily: "monospace", textTransform: "uppercase", letterSpacing: "0.25em", marginBottom: "8px", color: isAlert ? "#f87171" : isWarn ? "#fbbf24" : "#a78bfa" }}>
                {isAlert ? "⚠ Critical" : isWarn ? "◆ Warning" : "● Healthy"}
              </p>
              <h3 style={{ fontSize: "20px", fontWeight: 700, color: "white" }}>{metric.service}</h3>
            </div>
            <span style={{ fontSize: "10px", fontFamily: "monospace", padding: "6px 12px", borderRadius: "999px", background: isAlert ? "rgba(239,68,68,0.1)" : "rgba(139,92,246,0.1)", color: isAlert ? "#f87171" : "#a78bfa", border: `1px solid ${isAlert ? "rgba(239,68,68,0.2)" : "rgba(139,92,246,0.15)"}` }}>
              {isAlert ? "ALERT" : "OK"}
            </span>
          </div>

          <div style={{ marginBottom: "28px" }}>
            <span style={{ fontSize: "72px", fontWeight: 900, fontFamily: "monospace", lineHeight: 1, color: cpuColor }}>{metric.cpu}</span>
            <span style={{ fontSize: "28px", fontWeight: 700, color: "#4b5563", marginLeft: "4px" }}>%</span>
          </div>

          <div style={{ width: "100%", height: "3px", background: "rgba(255,255,255,0.05)", borderRadius: "999px", overflow: "hidden", marginBottom: "20px" }}>
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${metric.cpu}%` }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              style={{ height: "100%", borderRadius: "999px", background: cpuGradient }}
            />
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <p style={{ fontSize: "10px", fontFamily: "monospace", color: "#374151", textTransform: "uppercase", letterSpacing: "0.1em" }}>CPU Usage</p>
            <p style={{ fontSize: "10px", fontFamily: "monospace", color: "#374151" }}>
              {new Date(metric.timestamp).toLocaleTimeString()}
            </p>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export default function Dashboard() {
  const { metrics, incidents, uptimeData } = useSocket();
  const [metricsHistory, setMetricsHistory] = useState({});

  const activeAlerts = incidents.filter(i => i.status === "open").length;
  const metricValues = Object.values(metrics);
  const avgCpu = metricValues.length > 0
    ? Math.round(metricValues.reduce((a, b) => a + b.cpu, 0) / metricValues.length)
    : 0;

  // Track history for chart
  useEffect(() => {
    Object.values(metrics).forEach(metric => {
      setMetricsHistory(prev => ({
        ...prev,
        [metric.service]: [...(prev[metric.service] || []).slice(-30), metric.cpu],
      }));
    });
  }, [metrics]);

  return (
    <main style={{ maxWidth: "1280px", margin: "0 auto", padding: "80px 48px" }}>

      {/* Hero */}
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: [0.23,1,0.32,1] }} style={{ marginBottom: "64px" }}>
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "32px" }}>
          <div>
            <p style={{ fontSize: "10px", fontFamily: "monospace", color: "#4b5563", textTransform: "uppercase", letterSpacing: "0.35em", marginBottom: "20px" }}>Real-time Monitoring</p>
            <h1 className="gradient-text" style={{ fontSize: "80px", fontWeight: 900, letterSpacing: "-0.03em", lineHeight: 0.9, marginBottom: "20px" }}>
              Live<br/>Dashboard
            </h1>
            <p style={{ color: "#6b7280", fontSize: "16px" }}>Distributed system health — updated every 2s</p>
          </div>

          {activeAlerts > 0 && (
            <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} className="glass-red glow-red" style={{ flexShrink: 0, borderRadius: "24px", padding: "28px 32px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "8px" }}>
                <motion.div animate={{ scale: [1, 1.3, 1] }} transition={{ duration: 1, repeat: Infinity }} style={{ height: "12px", width: "12px", borderRadius: "50%", background: "#f87171" }}/>
                <p style={{ color: "#fca5a5", fontWeight: 700, fontSize: "15px" }}>{activeAlerts} Active Alert{activeAlerts > 1 ? "s" : ""}</p>
              </div>
              <Link to="/incidents" style={{ fontSize: "10px", fontFamily: "monospace", color: "#ef4444", textDecoration: "none" }}>View all incidents →</Link>
            </motion.div>
          )}
        </div>
      </motion.div>

      {/* Stats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "24px", marginBottom: "64px" }}>
        {[
          { label: "Services Online", value: Object.keys(metrics).length, suffix: "", colorClass: "gradient-text-cyan", glassClass: "glass-cyan glow-cyan" },
          { label: "Active Alerts", value: activeAlerts, suffix: "", colorClass: activeAlerts > 0 ? "gradient-text-red" : "gradient-text", glassClass: activeAlerts > 0 ? "glass-red glow-red" : "glass-purple glow-purple" },
          { label: "Average CPU", value: avgCpu, suffix: "%", colorClass: "gradient-text-gold", glassClass: "glass-gold glow-gold" },
        ].map((stat, i) => (
          <motion.div key={stat.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className={stat.glassClass} style={{ borderRadius: "24px", padding: "36px" }}>
            <p style={{ fontSize: "10px", fontFamily: "monospace", color: "#4b5563", textTransform: "uppercase", letterSpacing: "0.25em", marginBottom: "16px" }}>{stat.label}</p>
            <p className={stat.colorClass} style={{ fontSize: "64px", fontWeight: 900, fontFamily: "monospace", lineHeight: 1 }}>{stat.value}{stat.suffix}</p>
          </motion.div>
        ))}
      </div>

      {/* Historical CPU Chart */}
      {Object.keys(metricsHistory).length > 0 && (
        <motion.section initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} style={{ marginBottom: "64px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "24px" }}>
            <div style={{ height: "1px", width: "32px", background: "rgba(139,92,246,0.3)" }}/>
            <p style={{ fontSize: "10px", fontFamily: "monospace", color: "#4b5563", textTransform: "uppercase", letterSpacing: "0.35em" }}>CPU History — All Services</p>
            <div style={{ flex: 1, height: "1px", background: "rgba(255,255,255,0.04)" }}/>
          </div>
          <div className="glass" style={{ borderRadius: "24px", padding: "32px" }}>
            <CPUChart metricsHistory={metricsHistory} />
          </div>
        </motion.section>
      )}

      {/* 3D Graph */}
      {Object.keys(metrics).length > 0 && (
        <motion.section initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} style={{ marginBottom: "64px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "24px" }}>
            <div style={{ height: "1px", width: "32px", background: "rgba(139,92,246,0.3)" }}/>
            <p style={{ fontSize: "10px", fontFamily: "monospace", color: "#4b5563", textTransform: "uppercase", letterSpacing: "0.35em" }}>3D Network Graph</p>
            <div style={{ flex: 1, height: "1px", background: "rgba(255,255,255,0.04)" }}/>
            <p style={{ fontSize: "10px", fontFamily: "monospace", color: "#374151" }}>drag · rotate · zoom</p>
          </div>
          <div style={{ borderRadius: "24px", overflow: "hidden", background: "rgba(139,92,246,0.02)", border: "1px solid rgba(139,92,246,0.08)" }}>
            <ServiceGraph3D metrics={metrics} />
          </div>
        </motion.section>
      )}

      {/* Service Cards */}
      <section style={{ marginBottom: "64px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "32px" }}>
          <div style={{ height: "1px", width: "32px", background: "rgba(139,92,246,0.3)" }}/>
          <p style={{ fontSize: "10px", fontFamily: "monospace", color: "#4b5563", textTransform: "uppercase", letterSpacing: "0.35em" }}>Services</p>
          <div style={{ flex: 1, height: "1px", background: "rgba(255,255,255,0.04)" }}/>
          <p style={{ fontSize: "10px", fontFamily: "monospace", color: "#374151" }}>click any card to inspect →</p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "24px" }}>
          {Object.values(metrics).map((metric, i) => (
            <ServiceCard key={metric.service} metric={metric} index={i} />
          ))}
        </div>
      </section>

      {/* Uptime Section */}
      {Object.keys(uptimeData).length > 0 && (
        <motion.section initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
          <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "24px" }}>
            <div style={{ height: "1px", width: "32px", background: "rgba(139,92,246,0.3)" }}/>
            <p style={{ fontSize: "10px", fontFamily: "monospace", color: "#4b5563", textTransform: "uppercase", letterSpacing: "0.35em" }}>Service Uptime</p>
            <div style={{ flex: 1, height: "1px", background: "rgba(255,255,255,0.04)" }}/>
            <p style={{ fontSize: "10px", fontFamily: "monospace", color: "#374151" }}>last 30 checks</p>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {Object.entries(uptimeData).map(([service, uptime]) => (
              <UptimeBar key={service} service={service} uptime={uptime} />
            ))}
          </div>
        </motion.section>
      )}

    </main>
  );
}