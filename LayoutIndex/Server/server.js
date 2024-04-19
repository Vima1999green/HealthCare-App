const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

require("dotenv").config();

const app = express();

const MONGODB_URL = process.env.MONGODB_URL;

app.use(express.json());
app.use(cors());

mongoose
  .connect(MONGODB_URL)

  //then and catch are promises(here I use then as a method and it uses a function as an argument )
  .then(() => {
    console.log("mongoDB connection is successfull!");
  })

  .catch((err) => {
    console.error("Failed to connect to MongoDB", err);
    process.exit(1); //I add this as a good practice.it stops the process when somthing goes wrong
  });

const locationRoutes = require("./Routes/locationRoutes");
app.use("/api", locationRoutes);

const deviceRoutes = require("./Routes/deviceRoutes");
app.use("/api", deviceRoutes);

app.use(express.static("uploads"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is Running on port ${PORT}`);
});
