const express = require("express");
const router = express.Router();
const Doctor = require("../models/doctorModels");
const authMiddleware = require("../middlewares/authMiddleware");

router.get("/:id", authMiddleware, async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id);
    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }
    res.status(200).json(doctor);
  } catch (error) {
    console.error("Error fetching doctor:", error);
    res.status(500).json({ message: "Failed to fetch doctor" });
  }
});

module.exports = router;
