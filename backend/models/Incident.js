const mongoose = require("mongoose");

const incidentSchema = new mongoose.Schema({
  service: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  cpuAtIncident: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    default: "open", // "open" ya "resolved"
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  resolvedAt: {
    type: Date,
    default: null,
  },
});

const Incident = mongoose.model("Incident", incidentSchema);

module.exports = Incident;