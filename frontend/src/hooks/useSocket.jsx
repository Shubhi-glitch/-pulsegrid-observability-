import { useEffect, useState, useRef } from "react";
import { io } from "socket.io-client";
import toast from "react-hot-toast";

const API_URL = "http://localhost:5000";

export function useSocket() {
  const [metrics, setMetrics] = useState({});
  const [incidents, setIncidents] = useState([]);
  const [connected, setConnected] = useState(false);
  const [error, setError] = useState(null);
  const [uptimeData, setUptimeData] = useState({});
  const socketRef = useRef(null);

  // Uptime tracking
  const uptimeRef = useRef({});

  function updateUptime(service, isHealthy) {
    const now = Date.now();
    if (!uptimeRef.current[service]) {
      uptimeRef.current[service] = {
        totalChecks: 0,
        healthyChecks: 0,
        startTime: now,
      };
    }
    uptimeRef.current[service].totalChecks++;
    if (isHealthy) uptimeRef.current[service].healthyChecks++;

    const { totalChecks, healthyChecks } = uptimeRef.current[service];
    const uptime = totalChecks > 0
      ? ((healthyChecks / totalChecks) * 100).toFixed(1)
      : "100.0";

    setUptimeData(prev => ({
      ...prev,
      [service]: uptime,
    }));
  }

  useEffect(() => {
    const token = localStorage.getItem("pg_token");
    if (!token) return;

    fetchInitialData(token);

    const socket = io(API_URL, {
      auth: { token },
      reconnectionAttempts: 5,
      reconnectionDelay: 2000,
    });

    socketRef.current = socket;

    socket.on("connect", () => {
      setConnected(true);
      setError(null);
      toast.success("Connected to PulseGrid server", {
        id: "connection",
        duration: 2000,
      });
    });

    socket.on("disconnect", (reason) => {
      setConnected(false);
      toast.error("Connection lost — reconnecting...", {
        id: "connection",
        duration: 3000,
      });
    });

    socket.on("connect_error", (err) => {
      setConnected(false);
      setError(err.message);
    });

    socket.on("metric-update", (data) => {
      setMetrics((prev) => ({
        ...prev,
        [data.service]: data,
      }));
      updateUptime(data.service, data.cpu <= 80);
    });

    socket.on("incident-alert", (incident) => {
      setIncidents((prev) => {
        const exists = prev.find(i => i._id === incident._id);
        if (exists) return prev;
        return [incident, ...prev];
      });

      // Toast notification for alert
      toast.custom((t) => (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            background: "rgba(5,3,15,0.97)",
            border: "1px solid rgba(239,68,68,0.3)",
            borderRadius: "16px",
            padding: "16px 20px",
            maxWidth: "380px",
            backdropFilter: "blur(20px)",
            boxShadow: "0 0 30px rgba(239,68,68,0.15)",
            opacity: t.visible ? 1 : 0,
            transition: "opacity 0.3s",
          }}
        >
          <div style={{ position: "relative", flexShrink: 0 }}>
            <div style={{ height: "10px", width: "10px", borderRadius: "50%", background: "#f87171" }}/>
            <div style={{ position: "absolute", inset: 0, height: "10px", width: "10px", borderRadius: "50%", background: "#f87171", animation: "ping 1s infinite", opacity: 0.5 }}/>
          </div>
          <div>
            <p style={{ color: "#fca5a5", fontWeight: 700, fontSize: "13px", fontFamily: "monospace", marginBottom: "2px" }}>
              ⚠ ALERT — {incident.service}
            </p>
            <p style={{ color: "#9ca3af", fontSize: "11px", fontFamily: "monospace" }}>
              CPU: {incident.cpuAtIncident}% — threshold exceeded
            </p>
          </div>
        </div>
      ), { duration: 5000 });
    });

    socket.on("incident-resolved", (incident) => {
      setIncidents((prev) =>
        prev.map((i) => (i._id === incident._id ? incident : i))
      );

      // Toast for resolution
      toast.custom((t) => (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            background: "rgba(5,3,15,0.97)",
            border: "1px solid rgba(34,197,94,0.25)",
            borderRadius: "16px",
            padding: "16px 20px",
            maxWidth: "380px",
            backdropFilter: "blur(20px)",
            boxShadow: "0 0 20px rgba(34,197,94,0.1)",
            opacity: t.visible ? 1 : 0,
            transition: "opacity 0.3s",
          }}
        >
          <div style={{ height: "10px", width: "10px", borderRadius: "50%", background: "#4ade80", flexShrink: 0 }}/>
          <div>
            <p style={{ color: "#86efac", fontWeight: 700, fontSize: "13px", fontFamily: "monospace", marginBottom: "2px" }}>
              ✓ RESOLVED — {incident.service}
            </p>
            <p style={{ color: "#9ca3af", fontSize: "11px", fontFamily: "monospace" }}>
              Service back to normal
            </p>
          </div>
        </div>
      ), { duration: 3000 });
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  async function fetchInitialData(token) {
    try {
      const [metricsRes, incidentsRes] = await Promise.all([
        fetch(`${API_URL}/api/metrics/latest`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
        fetch(`${API_URL}/api/metrics/incidents`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
      ]);

      if (metricsRes.ok) {
        const data = await metricsRes.json();
        setMetrics(data);
      }

      if (incidentsRes.ok) {
        const data = await incidentsRes.json();
        setIncidents(data);
      }
    } catch (err) {
      console.error("Initial data fetch error:", err);
    }
  }

  return { metrics, incidents, connected, error, uptimeData };
}