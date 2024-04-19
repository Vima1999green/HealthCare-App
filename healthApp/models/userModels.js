const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    isDoctor: {
      type: Boolean,
      default: false,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    seenNotification: {
      type: Array,
      default: [],
    },
    unSeenNotification: {
      type: Array,
      default: [],
    },
    verified: { type: Boolean, default: false },
  },
  {
    timestamps: true, //Mongoose will automatically add two fields to your documents: createdAt and updatedAt
  }
);
const userModel = mongoose.model("user", userSchema);
module.exports = userModel;
