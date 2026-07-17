import { motion } from "framer-motion";

export default function UptimeBar({ service, uptime }) {
  const uptimeNum = parseFloat(uptime || "100");
  const color = uptimeNum >= 99 ? "#4ade80" : uptimeNum >= 95 ? "#fbbf24" : "#f87171";
  const colorClass = uptimeNum >= 99 ? "gradient-text-cyan" : uptimeNum >= 95 ? "gradient-text-gold" : "gradient-text-red";

  return (
    <div style={{
      background: "rgba(255,255,255,0.02)",
      border: "1px solid rgba(255,255,255,0.05)",
      borderRadius: "16px",
      padding: "20px 24px",
    }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
        <p style={{ fontSize: "12px", fontFamily: "monospace", color: "#6b7280", letterSpacing: "0.1em" }}>
          {service}
        </p>
        <p className={colorClass} style={{ fontSize: "16px", fontWeight: 900, fontFamily: "monospace" }}>
          {uptime || "100.0"}%
        </p>
      </div>

      {/* Uptime blocks — last 30 checks */}
      <div style={{ display: "flex", gap: "3px" }}>
        {Array.from({ length: 30 }).map((_, i) => (
          <motion.div
            key={i}
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ delay: i * 0.02 }}
            style={{
              flex: 1,
              height: "20px",
              borderRadius: "3px",
              background: uptimeNum >= 99
                ? "rgba(34,197,94,0.6)"
                : uptimeNum >= 95
                  ? "rgba(245,158,11,0.6)"
                  : i > 25
                    ? "rgba(239,68,68,0.6)"
                    : "rgba(34,197,94,0.6)",
            }}
          />
        ))}
      </div>

      <div style={{ display: "flex", justifyContent: "space-between", marginTop: "6px" }}>
        <span style={{ fontSize: "9px", fontFamily: "monospace", color: "#374151" }}>30 checks ago</span>
        <span style={{ fontSize: "9px", fontFamily: "monospace", color: "#374151" }}>now</span>
      </div>
    </div>
  );
}