const deviceModel = require("../Models/deviceModel");

const addDeviceModel = async (req, res) => {
  try {
    const { serialNumber, deviceType, status } = req.body;
    const image = req.file ? req.file.path : null;
    const newDeviceModel = await deviceModel({
      serialNumber,
      deviceType,
      image,
      status,
    });
    await newDeviceModel.save();
    res.status(201).json(newDeviceModel);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
const getAllDevices = async (req, res) => {
  try {
    const device = await deviceModel.find();
    res.json(device);
  } catch (error) {
    res.status(500).json({ message: message.err });
  }
};

const getDeiviceById = async (req, res) => {
  try {
    const device = await deviceModel.findById(req.params.id);
    if (!device) {
      return res.status(404).json({ message: "Device not Found" });
    }
    return res.status(200).json(device);
  } catch (err) {
    res.status(401).json({ message: err.message });
  }
};

const deleteDeviceById = async (req, res) => {
  try {
    const device = await deviceModel.findByIdAndDelete(req.params.id);
    if (!device) {
      return res.status(404).json({ message: "Device not Found" });
    }
    return res.status(200).json(device);
  } catch (err) {
    res.status(401).json({ message: message.err });
  }
};

module.exports = {
  addDeviceModel,
  getDeiviceById,
  deleteDeviceById,
  getAllDevices,
};
