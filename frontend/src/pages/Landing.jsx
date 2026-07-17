import { motion, useScroll, useTransform } from "framer-motion";
import { Link } from "react-router-dom";
import { useRef } from "react";
import ParticleBackground from "../components/ParticleBackground";

const features = [
  {
    icon: "⚡",
    title: "Real-time Monitoring",
    desc: "Live CPU metrics streamed every 2 seconds via WebSocket — zero polling, zero delay.",
    color: "#8b5cf6",
  },
  {
    icon: "🧠",
    title: "Smart Alert Engine",
    desc: "Automatic incident creation and resolution with duplicate prevention — exactly like PagerDuty.",
    color: "#06b6d4",
  },
  {
    icon: "🌐",
    title: "3D Network Graph",
    desc: "Services visualized as interactive 3D nodes. Red means critical, green means healthy. Drag, rotate, zoom.",
    color: "#f59e0b",
  },
  {
    icon: "📊",
    title: "Historical Analytics",
    desc: "CPU history charts with threshold lines, uptime tracking per service, and session-based incident logs.",
    color: "#8b5cf6",
  },
  {
    icon: "🔐",
    title: "JWT Authentication",
    desc: "Secure login with bcrypt password hashing and JWT tokens. Protected routes throughout the app.",
    color: "#06b6d4",
  },
  {
    icon: "🗄️",
    title: "MongoDB Persistence",
    desc: "Every metric and incident saved to database. Data survives page refreshes — loaded on every session start.",
    color: "#f59e0b",
  },
];

const steps = [
  {
    num: "01",
    title: "Services emit metrics",
    desc: "Three simulated microservices continuously generate CPU usage data with realistic load patterns.",
    color: "#8b5cf6",
  },
  {
    num: "02",
    title: "Backend processes in real-time",
    desc: "Node.js + Socket.io server ingests metrics, runs alert rules, saves to MongoDB, and broadcasts to all clients.",
    color: "#06b6d4",
  },
  {
    num: "03",
    title: "Frontend visualizes live",
    desc: "React dashboard receives WebSocket events and updates 3D graph, charts, and cards instantly — no refresh needed.",
    color: "#f59e0b",
  },
  {
    num: "04",
    title: "Alerts fire automatically",
    desc: "When CPU exceeds 80%, an incident is created. When it recovers, it auto-resolves. Toast notifications appear in real-time.",
    color: "#8b5cf6",
  },
];

const stats = [
  { value: "2s", label: "Update interval", color: "gradient-text-cyan" },
  { value: "3", label: "Services monitored", color: "gradient-text" },
  { value: "80%", label: "Alert threshold", color: "gradient-text-gold" },
  { value: "99.9%", label: "Target uptime", color: "gradient-text-cyan" },
];

const techStack = [
  { name: "React 18", category: "Frontend" },
  { name: "Three.js", category: "3D Engine" },
  { name: "Socket.io", category: "Real-time" },
  { name: "Node.js", category: "Backend" },
  { name: "MongoDB", category: "Database" },
  { name: "JWT + bcrypt", category: "Security" },
  { name: "Framer Motion", category: "Animation" },
  { name: "Tailwind CSS", category: "Styling" },
];

export default function Landing() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <div style={{ minHeight: "100vh", background: "#05030f", color: "white", overflowX: "hidden" }}
      className="grid-bg scanline">
      <ParticleBackground />
      <div className="bg-aurora" />
      <div className="bg-gold-orb" />

      {/* ===== NAVBAR ===== */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        background: "rgba(5,3,15,0.8)", backdropFilter: "blur(40px)",
        borderBottom: "1px solid rgba(255,255,255,0.05)",
      }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 48px", height: "72px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <motion.div
              animate={{ boxShadow: ["0 0 12px rgba(139,92,246,0.6)", "0 0 20px rgba(245,158,11,0.5)", "0 0 12px rgba(6,182,212,0.5)", "0 0 12px rgba(139,92,246,0.6)"] }}
              transition={{ duration: 4, repeat: Infinity }}
              style={{ height: "36px", width: "36px", borderRadius: "12px", background: "rgba(139,92,246,0.1)", border: "1px solid rgba(139,92,246,0.2)", display: "flex", alignItems: "center", justifyContent: "center" }}
            >
              <div style={{ height: "14px", width: "14px", borderRadius: "50%", background: "linear-gradient(135deg, #a78bfa, #06b6d4)" }} />
            </motion.div>
            <span className="gradient-text" style={{ fontWeight: 900, fontSize: "20px", letterSpacing: "-0.02em" }}>PulseGrid</span>
            <span style={{ fontSize: "9px", fontFamily: "monospace", color: "#374151", border: "1px solid rgba(255,255,255,0.05)", padding: "2px 8px", borderRadius: "999px" }}>v1.0</span>
          </div>

          <div style={{ display: "flex", gap: "8px" }}>
            {["Features", "How it Works", "Tech Stack"].map(item => (
              <a key={item} href={`#${item.toLowerCase().replace(/ /g, "-")}`}
                style={{ fontSize: "13px", color: "#6b7280", textDecoration: "none", padding: "8px 16px", borderRadius: "10px", transition: "all 0.2s" }}
                onMouseEnter={e => { e.target.style.color = "white"; e.target.style.background = "rgba(255,255,255,0.05)"; }}
                onMouseLeave={e => { e.target.style.color = "#6b7280"; e.target.style.background = "none"; }}>
                {item}
              </a>
            ))}
            <Link to="/login"
              style={{ fontSize: "13px", fontWeight: 600, color: "white", textDecoration: "none", padding: "8px 20px", borderRadius: "10px", background: "linear-gradient(135deg, rgba(139,92,246,0.3), rgba(6,182,212,0.2))", border: "1px solid rgba(139,92,246,0.3)" }}>
              Sign In →
            </Link>
          </div>
        </div>
      </nav>

      {/* ===== HERO ===== */}
      <section ref={heroRef} style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "120px 48px 80px", position: "relative", zIndex: 1 }}>
        <motion.div style={{ y: heroY, opacity: heroOpacity, textAlign: "center", maxWidth: "900px" }}>

          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "rgba(139,92,246,0.08)", border: "1px solid rgba(139,92,246,0.2)", padding: "8px 20px", borderRadius: "999px", marginBottom: "40px" }}
          >
            <motion.div animate={{ scale: [1, 1.3, 1] }} transition={{ duration: 2, repeat: Infinity }}
              style={{ height: "6px", width: "6px", borderRadius: "50%", background: "#4ade80" }} />
            <span style={{ fontSize: "12px", fontFamily: "monospace", color: "#a78bfa", letterSpacing: "0.15em" }}>
              REAL-TIME SYSTEM MONITORING PLATFORM
            </span>
          </motion.div>

          {/* Main heading */}
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            style={{ fontSize: "clamp(56px, 8vw, 100px)", fontWeight: 900, lineHeight: 0.9, letterSpacing: "-0.04em", marginBottom: "32px" }}
          >
            <span className="gradient-text">Monitor</span>
            <br />
            <span style={{ color: "rgba(255,255,255,0.9)" }}>everything.</span>
            <br />
            <span className="gradient-text-gold">In real-time.</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            style={{ fontSize: "18px", color: "#6b7280", maxWidth: "600px", margin: "0 auto 48px", lineHeight: 1.7 }}
          >
            A distributed system monitoring dashboard with live WebSocket metrics,
            automated incident management, and 3D network visualization —
            built like Datadog, from scratch.
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" }}
          >
            <Link to="/login">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                style={{ padding: "16px 36px", borderRadius: "14px", border: "none", fontWeight: 800, fontSize: "15px", cursor: "pointer", background: "linear-gradient(135deg, #7c3aed, #0891b2, #d97706)", color: "white", letterSpacing: "0.03em" }}
              >
                Launch Dashboard →
              </motion.button>
            </Link>
            <a href="#how-it-works">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                style={{ padding: "16px 36px", borderRadius: "14px", fontWeight: 600, fontSize: "15px", cursor: "pointer", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)", color: "#d1d5db" }}
              >
                See How it Works
              </motion.button>
            </a>
          </motion.div>

          {/* Scroll hint */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            style={{ marginTop: "80px" }}
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "8px" }}
            >
              <span style={{ fontSize: "10px", fontFamily: "monospace", color: "#374151", letterSpacing: "0.2em" }}>SCROLL TO EXPLORE</span>
              <div style={{ width: "1px", height: "40px", background: "linear-gradient(to bottom, rgba(139,92,246,0.5), transparent)" }} />
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      {/* ===== STATS ===== */}
      <section style={{ padding: "0 48px 120px", position: "relative", zIndex: 1 }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "20px" }}>
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "20px", padding: "32px", textAlign: "center" }}
              >
                <p className={stat.color} style={{ fontSize: "48px", fontWeight: 900, fontFamily: "monospace", lineHeight: 1, marginBottom: "8px" }}>
                  {stat.value}
                </p>
                <p style={{ fontSize: "11px", fontFamily: "monospace", color: "#6b7280", textTransform: "uppercase", letterSpacing: "0.15em" }}>
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FEATURES ===== */}
      <section id="features" style={{ padding: "120px 48px", position: "relative", zIndex: 1 }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{ textAlign: "center", marginBottom: "80px" }}
          >
            <p style={{ fontSize: "10px", fontFamily: "monospace", color: "#6b7280", textTransform: "uppercase", letterSpacing: "0.3em", marginBottom: "16px" }}>
              What it does
            </p>
            <h2 className="gradient-text" style={{ fontSize: "clamp(36px, 5vw, 60px)", fontWeight: 900, letterSpacing: "-0.03em", lineHeight: 0.95 }}>
              Everything a real<br />monitoring tool needs
            </h2>
          </motion.div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px" }}>
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                style={{
                  background: "rgba(255,255,255,0.02)",
                  border: "1px solid rgba(255,255,255,0.06)",
                  borderRadius: "24px",
                  padding: "36px",
                  cursor: "default",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                <div style={{ position: "absolute", top: "-20px", right: "-20px", width: "100px", height: "100px", borderRadius: "50%", background: f.color, opacity: 0.05, filter: "blur(30px)" }} />
                <div style={{ fontSize: "36px", marginBottom: "20px" }}>{f.icon}</div>
                <h3 style={{ fontSize: "18px", fontWeight: 700, color: "white", marginBottom: "12px" }}>{f.title}</h3>
                <p style={{ fontSize: "14px", color: "#6b7280", lineHeight: 1.7 }}>{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== HOW IT WORKS ===== */}
      <section id="how-it-works" style={{ padding: "120px 48px", position: "relative", zIndex: 1 }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{ textAlign: "center", marginBottom: "80px" }}
          >
            <p style={{ fontSize: "10px", fontFamily: "monospace", color: "#6b7280", textTransform: "uppercase", letterSpacing: "0.3em", marginBottom: "16px" }}>
              Under the hood
            </p>
            <h2 style={{ fontSize: "clamp(36px, 5vw, 60px)", fontWeight: 900, letterSpacing: "-0.03em", lineHeight: 0.95, color: "white" }}>
              How it <span className="gradient-text">works</span>
            </h2>
          </motion.div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "20px" }}>
            {steps.map((step, i) => (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                style={{
                  background: "rgba(255,255,255,0.02)",
                  border: "1px solid rgba(255,255,255,0.06)",
                  borderRadius: "24px",
                  padding: "40px",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                <div style={{ position: "absolute", top: "-30px", left: "-30px", width: "120px", height: "120px", borderRadius: "50%", background: step.color, opacity: 0.04, filter: "blur(40px)" }} />
                <p style={{ fontSize: "48px", fontWeight: 900, fontFamily: "monospace", color: step.color, opacity: 0.3, marginBottom: "16px", lineHeight: 1 }}>
                  {step.num}
                </p>
                <h3 style={{ fontSize: "20px", fontWeight: 700, color: "white", marginBottom: "12px" }}>{step.title}</h3>
                <p style={{ fontSize: "14px", color: "#6b7280", lineHeight: 1.7 }}>{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== TECH STACK ===== */}
      <section id="tech-stack" style={{ padding: "120px 48px", position: "relative", zIndex: 1 }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{ textAlign: "center", marginBottom: "64px" }}
          >
            <p style={{ fontSize: "10px", fontFamily: "monospace", color: "#6b7280", textTransform: "uppercase", letterSpacing: "0.3em", marginBottom: "16px" }}>
              Built with
            </p>
            <h2 style={{ fontSize: "clamp(36px, 5vw, 60px)", fontWeight: 900, letterSpacing: "-0.03em", color: "white" }}>
              Production-grade <span className="gradient-text-gold">tech stack</span>
            </h2>
          </motion.div>

          <div style={{ display: "flex", flexWrap: "wrap", gap: "12px", justifyContent: "center" }}>
            {techStack.map((tech, i) => (
              <motion.div
                key={tech.name}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                whileHover={{ scale: 1.05, y: -2 }}
                style={{
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: "14px",
                  padding: "16px 24px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "4px",
                  minWidth: "120px",
                  cursor: "default",
                }}
              >
                <p style={{ fontSize: "14px", fontWeight: 700, color: "white" }}>{tech.name}</p>
                <p style={{ fontSize: "10px", fontFamily: "monospace", color: "#4b5563", textTransform: "uppercase", letterSpacing: "0.1em" }}>{tech.category}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA SECTION ===== */}
      <section style={{ padding: "120px 48px", position: "relative", zIndex: 1 }}>
        <div style={{ maxWidth: "800px", margin: "0 auto", textAlign: "center" }}>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{
              background: "rgba(139,92,246,0.05)",
              border: "1px solid rgba(139,92,246,0.15)",
              borderRadius: "32px",
              padding: "80px 60px",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: "400px", height: "400px", borderRadius: "50%", background: "radial-gradient(circle, rgba(139,92,246,0.08), transparent)", pointerEvents: "none" }} />

            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              style={{ width: "64px", height: "64px", borderRadius: "20px", background: "linear-gradient(135deg, rgba(139,92,246,0.3), rgba(6,182,212,0.3))", border: "1px solid rgba(139,92,246,0.3)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 32px" }}
            >
              <div style={{ width: "24px", height: "24px", borderRadius: "50%", background: "linear-gradient(135deg, #a78bfa, #06b6d4)" }} />
            </motion.div>

            <h2 className="gradient-text" style={{ fontSize: "48px", fontWeight: 900, letterSpacing: "-0.03em", marginBottom: "20px", lineHeight: 0.95 }}>
              Ready to monitor?
            </h2>
            <p style={{ color: "#6b7280", fontSize: "16px", marginBottom: "40px", lineHeight: 1.7 }}>
              Sign in with demo credentials and explore the full dashboard —
              real-time alerts, 3D visualization, and incident management, all live.
            </p>

            <Link to="/login">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                style={{ padding: "18px 48px", borderRadius: "14px", border: "none", fontWeight: 800, fontSize: "16px", cursor: "pointer", background: "linear-gradient(135deg, #7c3aed, #0891b2, #d97706)", color: "white", letterSpacing: "0.03em" }}
              >
                Launch Dashboard →
              </motion.button>
            </Link>

            <p style={{ marginTop: "20px", fontSize: "12px", fontFamily: "monospace", color: "#374151" }}>
              admin@pulsegrid.io · admin123
            </p>
          </motion.div>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer style={{ borderTop: "1px solid rgba(255,255,255,0.04)", padding: "40px 48px", position: "relative", zIndex: 1 }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <div style={{ height: "28px", width: "28px", borderRadius: "8px", background: "rgba(139,92,246,0.1)", border: "1px solid rgba(139,92,246,0.2)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <div style={{ height: "10px", width: "10px", borderRadius: "50%", background: "linear-gradient(135deg, #a78bfa, #06b6d4)" }} />
            </div>
            <span className="gradient-text" style={{ fontWeight: 900, fontSize: "16px" }}>PulseGrid</span>
          </div>

          <p style={{ fontSize: "12px", fontFamily: "monospace", color: "#374151" }}>
            Built with React · Node.js · Socket.io · MongoDB · Three.js
          </p>

          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <motion.div animate={{ scale: [1, 1.3, 1] }} transition={{ duration: 2, repeat: Infinity }}
              style={{ height: "6px", width: "6px", borderRadius: "50%", background: "#4ade80" }} />
            <span style={{ fontSize: "11px", fontFamily: "monospace", color: "#4ade80" }}>ALL SYSTEMS OPERATIONAL</span>
          </div>
        </div>
      </footer>
    </div>
  );
}