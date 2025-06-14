const roleMiddleware = (roles) => {
  return (req, res, next) => {
    const userRole = req.user.role;
    if (roles.includes(userRole)) {
      next();
    } else {
      res.status(403).json({
        message: "Access denied",
        error: error.message,
        success: false,
      });
    }
  };
};

module.exports = roleMiddleware;
