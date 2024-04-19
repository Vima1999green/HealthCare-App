const express = require("express");
const cors = require("cors");
const app = express();
require("dotenv").config();
const dbConfig = require("./config/dbConfig");

app.use(cors());

//destructure
app.use(express.json());

const userRoute = require("./routes/userRoute");
app.use("/api/user", userRoute);

const doctorRoute = require("./routes/doctorRoute");
app.use("/api/doctor", doctorRoute);

// Creating a port for the server
const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Listening on port ${port}`));
