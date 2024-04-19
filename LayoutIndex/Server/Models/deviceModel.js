const mongoose = require("mongoose");

const deviceSchema = new mongoose.Schema({
  serialNumber: {
    type: String,
    required: true,
    unique: true,
  },
  deviceType: {
    type: String,
    enum: ["pos", "kiosk", "signage"],
    required: true,
  },
  image: { type: String },
  status: { type: String, enum: ["active", "inactive"], default: "active" },
});

module.exports = mongoose.model("deviceModel", deviceSchema);
