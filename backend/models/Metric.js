const mongoose = require("mongoose");

// Yeh blueprint hai — define kar rahe hain ki ek "metric" mein kya-kya hoga
const metricSchema = new mongoose.Schema({
  service: {
    type: String,
    required: true, // yeh field hona zaroori hai, bina iske save nahi hoga
  },
  cpu: {
    type: Number,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now, // agar timestamp na diya jaye, automatically current time use hoga
  },
});

// Iss schema se ek "Model" banaya — yahi cheez hum use karenge data save/fetch karne ke liye
const Metric = mongoose.model("Metric", metricSchema);

module.exports = Metric;