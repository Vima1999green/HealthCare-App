//this file is used to validate the token
const jwt = require("jsonwebtoken");

module.exports = async (req, res, next) => {
  try {
    //this  is a way to extract the JWT token from the Authorization header in an HTTP request
    const token = req.headers["authorization"].split(" ")[1];
    jwt.verify(token, process.env.JWT_SECRETKEY, (err, decode) => {
      if (err) {
        return res.status(401).send({
          message: "Auth Failed",
          success: false,
        });
      } else {
        req.userId = decode.id;
        next(); //this method execute after execution of authMiddleware  in userRoute.js
      }
    });
  } catch (error) {
    return res.status(401).send({ message: "Auth Failed", success: false });
  }
};
