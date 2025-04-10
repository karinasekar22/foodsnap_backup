module.exports = function checkRole(...roles) {
    return function (req, res, next) {
      const userRole = req.user?.role;
      if (!roles.includes(userRole)) {
        return res.status(403).json({ message: 'Akses ditolak' });
      }
      next();
    };
  };
  