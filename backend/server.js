const Metric = require("./models/Metric");
const Incident = require("./models/Incident");
const mongoose = require("mongoose");
const express = require("express");
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");
const jwt = require("jsonwebtoken");

const authRoutes = require("./routes/auth");
const metricsRoutes = require("./routes/metrics");

const JWT_SECRET = process.env.JWT_SECRET || "pulsegrid_secret_key_2024";

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.get("/", (req, res) => res.json({ status: "PulseGrid API running", version: "1.0.0" }));
app.use("/api/auth", authRoutes);
app.use("/api/metrics", metricsRoutes);

// 404 handler
app.use((req, res) => res.status(404).json({ message: "Route not found" }));

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Internal server error" });
});

const server = http.createServer(app);

// MongoDB connect
mongoose
  .connect("mongodb://localhost:27017/pulsegrid")
  .then(() => {
    console.log("MongoDB se connect ho gaya");
    seedAdmin(); // Admin user create karo agar nahi hai
  })
  .catch((err) => console.error("MongoDB connection mein error:", err));

// Admin seed function
async function seedAdmin() {
  try {
    const User = require("./models/User");
    const existing = await User.findOne({ email: "admin@pulsegrid.io" });
    if (!existing) {
      await User.create({ email: "admin@pulsegrid.io", password: "admin123" });
      console.log("Admin user create ho gaya: admin@pulsegrid.io / admin123");
    }
  } catch (err) {
    console.error("Seed error:", err.message);
  }
}

// Socket.io with JWT auth
const io = new Server(server, {
  cors: { origin: "*" },
});

// Socket auth middleware
io.use((socket, next) => {
  const token = socket.handshake.auth.token;
  if (!token) return next(new Error("Authentication required"));
  
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    socket.user = decoded;
    next();
  } catch (err) {
    next(new Error("Invalid token"));
  }
});

const CPU_THRESHOLD = 80;

const services = [
  { name: "Service A", baseLoad: 30 },
  { name: "Service B", baseLoad: 50 },
  { name: "Service C", baseLoad: 75 },
];

async function checkForAlert(socket, metric) {
  try {
    const existingIncident = await Incident.findOne({
      service: metric.service,
      status: "open",
    });

    if (metric.cpu > CPU_THRESHOLD) {
      if (!existingIncident) {
        const newIncident = await Incident.create({
          service: metric.service,
          message: `High CPU usage detected on ${metric.service}`,
          cpuAtIncident: metric.cpu,
        });
        console.log("NAYA INCIDENT:", newIncident.message);
        socket.emit("incident-alert", newIncident);
        // Baaki sab connected clients ko bhi batao
        socket.broadcast.emit("incident-alert", newIncident);
      }
    } else {
      if (existingIncident) {
        existingIncident.status = "resolved";
        existingIncident.resolvedAt = new Date();
        await existingIncident.save();
        console.log("INCIDENT RESOLVED:", existingIncident.message);
        socket.emit("incident-resolved", existingIncident);
        socket.broadcast.emit("incident-resolved", existingIncident);
      }
    }
  } catch (err) {
    console.error("Alert check error:", err.message);
  }
}

io.on("connection", (socket) => {
  console.log(`Client connected: ${socket.id} (${socket.user?.email})`);

  const interval = setInterval(() => {
    services.forEach((service) => {
      let cpu = service.baseLoad + Math.floor(Math.random() * 40) - 20;
      cpu = Math.max(0, Math.min(100, cpu));

      const fakeMetric = {
        service: service.name,
        cpu,
        timestamp: new Date().toISOString(),
      };

      socket.emit("metric-update", fakeMetric);

      Metric.create(fakeMetric).catch((err) =>
        console.error("Metric save error:", err.message)
      );

      checkForAlert(socket, fakeMetric);
    });
  }, 2000);

  socket.on("disconnect", () => {
    console.log(`Client disconnected: ${socket.id}`);
    clearInterval(interval);
  });

  socket.on("error", (err) => {
    console.error("Socket error:", err.message);
  });
});

const PORT = 5000;
server.listen(PORT, () => {
  console.log(`Server chal raha hai port ${PORT} pe`);
});