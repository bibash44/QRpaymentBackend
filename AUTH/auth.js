const jwt = require("jsonwebtoken");
const config = require("../config/config");
module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const verifyToken = jwt.verify(token, "&^&*&&*dsadsa52153sddsaBSdassh6565");
    req.userData = verifyToken;
    next();
  } catch (e) {
    return res.status(401).json({
      message: "Unauthorized",
    });
  }
};
