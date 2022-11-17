module.exports = function (req, res, next) {
  if (req.user.role === "admin") next();
  else return res.status(401).json({ msg: "Not admin, Access forbidden" });
};
