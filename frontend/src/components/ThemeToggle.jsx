import { motion } from "framer-motion";
import { useTheme } from "../context/ThemeContext";

export default function ThemeToggle() {
  const { isDark, toggle } = useTheme();

  return (
    <motion.button
      onClick={toggle}
      whileTap={{ scale: 0.92 }}
      title={isDark ? "Switch to Light mode" : "Switch to Dark mode"}
      style={{
        position: "relative",
        width: "56px",
        height: "30px",
        borderRadius: "999px",
        border: isDark
          ? "1px solid rgba(139,92,246,0.3)"
          : "1px solid rgba(245,158,11,0.4)",
        cursor: "pointer",
        background: isDark
          ? "rgba(139,92,246,0.15)"
          : "rgba(245,158,11,0.15)",
        padding: "4px",
        display: "flex",
        alignItems: "center",
        transition: "all 0.4s ease",
        flexShrink: 0,
      }}
    >
      <motion.div
        animate={{ x: isDark ? 0 : 26 }}
        transition={{ type: "spring", stiffness: 400, damping: 28 }}
        style={{
          width: "22px",
          height: "22px",
          borderRadius: "50%",
          background: isDark
            ? "linear-gradient(135deg, #a78bfa, #06b6d4)"
            : "linear-gradient(135deg, #f59e0b, #f97316)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "13px",
          boxShadow: isDark
            ? "0 0 10px rgba(139,92,246,0.5)"
            : "0 0 10px rgba(245,158,11,0.5)",
          flexShrink: 0,
        }}
      >
        {isDark ? "🌙" : "☀️"}
      </motion.div>
    </motion.button>
  );
}