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