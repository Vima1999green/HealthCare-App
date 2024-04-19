const express = require("express");
const router = express.Router();

const locationController = require("../Controllers/locationController");

router.post("/location/addLocation", locationController.addLocation);

router.get("/location/getAllLocations", locationController.getAllLocations);

router.get("/location/:id", locationController.getLocationById);

router.delete("/location/:id", locationController.deleteLocationById);

module.exports = router;
