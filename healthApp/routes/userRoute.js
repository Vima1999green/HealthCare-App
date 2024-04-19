const express = require("express");
const router = express.Router();
const user = require("../models/userModels");
const Doctor = require("../models/doctorModels");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const authMiddleware = require("../middlewares/authMiddleware");

router.post("/register", async (req, res) => {
  try {
    //check if the user is already exist or not
    const userExist = await user.findOne({ email: req.body.email });
    if (userExist) {
      //if user already exist this return statement wiil run and rest of the part will not be executed.
      return res
        .status(200)
        .send({ message: "user already exists", success: false });
    }

    //hashing the passowrd in request body
    const password = req.body.password; // Corrected spelling of "password"
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    req.body.password = hashedPassword;

    //save new user who has name,email,passowrd
    const newuser = new user(req.body);
    await newuser.save();

    res
      .status(200)
      .send({ message: "user created successfully", success: true });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ message: "Error creating User", success: false, error });
  }
});

router.post("/login", async (req, res) => {
  try {
    //assign user as a email that is in inside of request body
    const founduser = await user.findOne({ email: req.body.email });

    //if email is not found send messege as user does not exists
    if (!founduser) {
      return res
        .status(200)
        .send({ message: "User does not exists", success: false });
    }

    //check the hashed passoword is matching with frontend passoword that user has enter to login
    // Check the hashed password is matching with the frontend password that the user has entered to login
    const isMatch = await bcrypt.compare(req.body.password, founduser.password);

    //if passowords are not match user will recieve a message Passowrd is incorrect
    if (!isMatch) {
      return res
        .status(200)
        .send({ message: "Passowrd is incorrect", success: false });
    } else {
      //{id: user._id}: This is the payload of the JWT token
      //process.env.JWT_SECRETKEY: This is the secret key used to sign the JWT token
      //jwt.sign(...): This function takes the payload and secret key as arguments and creates a new JWT token
      //{expiresIn:"1d"}:the token is expires in 1 day,after 1day user has to login again
      //const token = ...: This line assigns the newly created JWT token to the variable token, which can then be used to authenticate the user or authorize access to protected resources.
      const token = jwt.sign({ id: founduser._id }, process.env.JWT_SECRETKEY, {
        expiresIn: "1d",
      });

      res
        .status(200)
        .send({ message: "Login Successful", success: true, data: token });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Error Login in", success: false, error });
  }
});

//in here whenever this api end point is called authMiddleware is giong to execute,if authMiddleware is valid ,it will execute next method in this function.
router.post("/get-user-info-by-id", authMiddleware, async (req, res) => {
  try {
    const User = await user.findOne({ _id: req.userId });
    user.password = undefined;
    if (!User) {
      return res
        .status(200)
        .send({ message: "user does not exists", success: false });
    } else {
      res.status(200).send({
        message: "User Found",
        success: true,
        data: User,
      });
    }
  } catch (error) {
    res
      .status(500)
      .send({ message: "Error getting User info", success: false, error });
  }
});

//api for appling doctor account
router.post("/apply-doctor-account", authMiddleware, async (req, res) => {
  try {
    const newDoctor = new Doctor({ ...req.body, status: "pending" }); //create newDoctor instance by combining with status:"pending", to combine this we use ...(three dots)
    await newDoctor.save(); //save the doctor object in the database

    const adminUser = await user.findOne({ isAdmin: true }); //This line of code is using the findOne method of the User model to find a single user document in the database where the isAdmin property is true

    const unSeenNotification = adminUser.unSeenNotification; //This line retrieves the unseenNotification array from the adminUser object and stores it in a variable called unseenNotification
    unSeenNotification.push({
      //: This line adds a new object to the unseenNotification
      type: "new-doctor-request",
      message: `${newDoctor.firstName} ${newDoctor.lastName} has applied for Doctor Account! `,
      data: {
        doctorId: newDoctor._id,
        name: newDoctor.firstName + " " + newDoctor.lastName,
      },

      //The URL that the notification should link to when clicked, in this case, "/admin/doctors
    });
    await user.findByIdAndUpdate(adminUser._id, { unSeenNotification });
    res
      .status(200)
      .send({ success: true, message: "Doctor Account Applied Successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Error applying doctor account",
      success: false,
      error,
    });
  }
});

router.post(
  "/mark-all-notifications-as-seen",
  authMiddleware,
  async (req, res) => {
    try {
      const User = await user.findOne({ _id: req.body.userId });
      const unseenNotification = User.unSeenNotification;
      const SeenNotification = User.seenNotification;
      SeenNotification.push(...unseenNotification);
      User.unSeenNotification = [];
      User.seenNotification = SeenNotification;
      const updateUser = await User.save();
      updateUser.password = undefined;
      res.status(200).send({
        success: true,
        message: "All notifications marked as seen",
        data: updateUser,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        message: "Error Reading all the notification",
        success: false,
        error,
      });
    }
  }
);

router.post("/delete-all-notifications", authMiddleware, async (req, res) => {
  try {
    const User = await user.findOne({ _id: req.body.userId });
    User.unSeenNotification = [];
    User.seenNotification = [];
    const updateUser = await User.save();
    updateUser.password = undefined;
    res.status(200).send({
      success: true,
      message: "All notifications are deleted",
      data: updateUser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Error Deleting all notifications",
      success: false,
      error,
    });
  }
});

module.exports = router;
