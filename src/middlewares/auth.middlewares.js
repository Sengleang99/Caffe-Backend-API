const jwt = require("jsonwebtoken");

// Middleware to verify token
const auth = (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token) {
    return res
      .status(401)
      .json({ message: "No token provided. access denied" });
  }
  try {
    const decoded = jwt.verify(token, 'secret');
    req.user = decoded;
    next();
  } catch (error) {
    res.status(400).json({ message: "Token is not valid!" });
  }
};

module.exports = auth;
