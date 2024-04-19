const express = require("express");
const router = express.Router();
const deviceController = require("../Controllers/deviceController");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

router.post(
  "/device/addDeviceDetails",
  upload.single("image"),
  deviceController.addDeviceModel
);

router.get("/device/getAllDevices", deviceController.getAllDevices);

router.get("/device/getDeviceById/:id", deviceController.getDeiviceById);

router.delete("/device/:id", deviceController.deleteDeviceById);

module.exports = router;
