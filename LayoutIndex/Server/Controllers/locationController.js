const Location = require("../Models/locationModel");

const addLocation = async (req, res) => {
  try {
    const { locationName, locationAddress, phoneNumber, devices } = req.body;
    const newLocation = new Location({
      locationName,
      locationAddress,
      phoneNumber,
      devices,
    });
    await newLocation.save();
    res.status(201).json(newLocation);
  } catch (err) {
    res.status(400).json({ message: err.messege });
  }
};

const getAllLocations = async (req, res) => {
  try {
    const location = await Location.find();
    res.json(location);
  } catch (error) {
    res.status(500).json({ message: error.messege });
  }
};

const getLocationById = async (req, res) => {
  try {
    const location = await Location.findById(req.params.id);
    if (!location) {
      return res.status(404).json({ message: "Location not Found" });
    }
    return res.json(location);
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

const deleteLocationById = async (req, res) => {
  try {
    const location = await Location.findByIdAndDelete(req.params.id);

    if (!location) {
      return res.status(404).json({ message: "Location not Found" });
    }
    return res.send();
  } catch (err) {
    return res.status(500).json({ message: err });
  }
};

const updateLocation = async (req, res) => {
  try {
    // Assuming you have a Location model
    const location = await Location.findById(req.params.id);

    // Update the devices array with the new list of device IDs
    location.devices = req.body.devices;

    // Save the updated location
    await location.save();

    res.status(200).json({ message: "Location updated successfully" });
  } catch (err) {
    console.error("Error updating location:", err);
    res.status(500).json({ message: "Failed to update location" });
  }
};

module.exports = {
  addLocation,
  getAllLocations,
  getLocationById,
  deleteLocationById,
  updateLocation,
};
