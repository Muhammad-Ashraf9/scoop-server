exports.isAdmin = (req, res, next) => {
  if (req.user.role !== "admin") {
    const error = new Error("Not authorized");
    error.statusCode = 401;
    throw error;
  }
  next();
};


