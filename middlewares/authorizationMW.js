exports.isAdmin = (req, res, next) => {
  if (req.user.role !== "admin") {
    const error = new Error("Not authorized");
    error.statusCode = 401;
    throw error;
  }
  next();
};

exports.authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      const error = new Error("Not authorized");
      error.statusCode = 401;
      throw error;
    }
    next();
  };
}