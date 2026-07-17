import { useState, useEffect } from "react";

const API_URL = "http://localhost:5000";

export function useServiceStats(serviceName) {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!serviceName) return;

    const token = localStorage.getItem("pg_token");
    if (!token) return;

    async function fetchStats() {
      try {
        const res = await fetch(
          `${API_URL}/api/metrics/stats/${encodeURIComponent(serviceName)}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        if (!res.ok) throw new Error("Failed to fetch stats");
        const data = await res.json();
        setStats(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchStats();
  }, [serviceName]);

  return { stats, loading, error };
}