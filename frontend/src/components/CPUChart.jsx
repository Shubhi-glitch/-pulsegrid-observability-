import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, ReferenceLine } from "recharts";
import { motion } from "framer-motion";

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div style={{
        background: "rgba(5,3,15,0.95)",
        border: "1px solid rgba(255,255,255,0.08)",
        borderRadius: "12px",
        padding: "12px 16px",
        fontFamily: "monospace",
      }}>
        <p style={{ color: "#6b7280", fontSize: "10px", marginBottom: "6px" }}>{label}</p>
        {payload.map((p, i) => (
          <p key={i} style={{ color: p.color, fontSize: "13px", fontWeight: 700 }}>
            {p.name}: {p.value}%
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export default function CPUChart({ metricsHistory }) {
  const services = Object.keys(metricsHistory);
  
  const colors = {
    "Service A": "#8b5cf6",
    "Service B": "#06b6d4",
    "Service C": "#f59e0b",
  };

  // Combine all data into chart format
  const maxLen = Math.max(...services.map(s => metricsHistory[s]?.length || 0));
  const chartData = Array.from({ length: maxLen }, (_, i) => {
    const point = { time: `${maxLen - i}s ago` };
    services.forEach(service => {
      const history = metricsHistory[service] || [];
      point[service] = history[i] ?? null;
    });
    return point;
  }).reverse();

  if (chartData.length === 0) {
    return (
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "200px", color: "#4b5563", fontFamily: "monospace", fontSize: "12px" }}>
        Collecting data...
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Legend */}
      <div style={{ display: "flex", gap: "24px", marginBottom: "20px", justifyContent: "flex-end" }}>
        {services.map(s => (
          <div key={s} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <div style={{ height: "2px", width: "20px", background: colors[s] || "#8b5cf6", borderRadius: "1px" }}/>
            <span style={{ fontSize: "11px", fontFamily: "monospace", color: "#6b7280" }}>{s}</span>
          </div>
        ))}
      </div>

      <ResponsiveContainer width="100%" height={220}>
        <LineChart data={chartData} margin={{ top: 5, right: 5, left: -20, bottom: 5 }}>
          <XAxis
            dataKey="time"
            tick={{ fill: "#374151", fontSize: 9, fontFamily: "monospace" }}
            tickLine={false}
            axisLine={{ stroke: "rgba(255,255,255,0.04)" }}
            interval={Math.floor(chartData.length / 5)}
          />
          <YAxis
            domain={[0, 100]}
            tick={{ fill: "#374151", fontSize: 9, fontFamily: "monospace" }}
            tickLine={false}
            axisLine={false}
          />
          <Tooltip content={<CustomTooltip />} />
          <ReferenceLine
            y={80}
            stroke="rgba(239,68,68,0.3)"
            strokeDasharray="4 4"
            label={{ value: "80% threshold", fill: "rgba(239,68,68,0.4)", fontSize: 9, fontFamily: "monospace" }}
          />
          {services.map(service => (
            <Line
              key={service}
              type="monotone"
              dataKey={service}
              stroke={colors[service] || "#8b5cf6"}
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 4, fill: colors[service] }}
              connectNulls
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </motion.div>
  );
}