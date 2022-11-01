const jwt = require("jsonwebtoken");
require('dotenv').config()
module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const verifyToken = jwt.verify(token, process.env.SECRET_KEY_FOR_TOKEN);
    req.userData = verifyToken;
    next();
  } catch (e) {
    return res.status(401).json({
      msg: "Unauthorized",
    });
  }
};
