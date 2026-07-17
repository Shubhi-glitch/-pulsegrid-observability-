const express = require("express");
const Metric = require("../models/Metric");
const Incident = require("../models/Incident");
const authMiddleware = require("../middleware/auth");

const router = express.Router();

// Sab routes protected hain
router.use(authMiddleware);

// Recent metrics (last 100 per service)
router.get("/recent", async (req, res) => {
  try {
    const services = ["Service A", "Service B", "Service C"];
    const result = {};
    
    for (const service of services) {
      const metrics = await Metric.find({ service })
        .sort({ timestamp: -1 })
        .limit(30);
      result[service] = metrics.reverse();
    }
    
    res.json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Latest metric per service
router.get("/latest", async (req, res) => {
  try {
    const services = ["Service A", "Service B", "Service C"];
    const result = {};
    
    for (const service of services) {
      const metric = await Metric.findOne({ service })
        .sort({ timestamp: -1 });
      if (metric) result[service] = metric;
    }
    
    res.json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// All incidents
router.get("/incidents", async (req, res) => {
  try {
    const { status, service } = req.query;
    const filter = {};
    if (status) filter.status = status;
    if (service) filter.service = service;
    
    const incidents = await Incident.find(filter)
      .sort({ createdAt: -1 })
      .limit(50);
    
    res.json(incidents);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Service stats
router.get("/stats/:service", async (req, res) => {
  try {
    const { service } = req.params;
    
    const [totalIncidents, openIncidents, recentMetrics] = await Promise.all([
      Incident.countDocuments({ service }),
      Incident.countDocuments({ service, status: "open" }),
      Metric.find({ service }).sort({ timestamp: -1 }).limit(30),
    ]);
    
    const avgCpu = recentMetrics.length > 0
      ? Math.round(recentMetrics.reduce((a, b) => a + b.cpu, 0) / recentMetrics.length)
      : 0;
    
    res.json({
      service,
      totalIncidents,
      openIncidents,
      avgCpu,
      recentMetrics: recentMetrics.reverse(),
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;