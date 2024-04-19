const mongoose = require("mongoose");

const locationSchema = new mongoose.Schema({
  locationName: { type: String, required: true },
  locationAddress: { type: String },
  phoneNumber: { type: String },
  devices: [{ type: mongoose.Schema.Types.ObjectId, ref: "deviceModel" }],
});
module.exports = mongoose.model("locationModel", locationSchema);
