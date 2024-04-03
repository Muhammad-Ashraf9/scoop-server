const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = (req, res, next) => {
  try {
    const authHeader = req.get("authorization");
    if (!authHeader) {
      throw new Error("Not authenticated");
    }
    const token = authHeader.split(" ")[1];

    const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
    console.log(decodedToken);
    req.user = decodedToken;
    next();
  } catch (err) {
    let error = new Error("Not authenticated");
    if (err.name === "TokenExpiredError") {
      error = new Error("Token expired");
    }
    error.statusCode = 403;
    next(error);
  }
};
