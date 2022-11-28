// module.exports = function (req, res, next) {
//   if (req.user.role === "admin") next();
//   else return res.status(401).json({ msg: "Not admin, Access forbidden" });
// };
const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = function (req, res, next) {
  const token = req.header("auth-token");

  if (!token) {
    return res.status(401).json({ msg: "No token, authorization denied" });
  }

  try {
    const decoded = jwt.verify(token, config.get("JWTSecret"));
    req.user = decoded.user;

    if (req.user.role === "admin") next();
    else return res.status(401).json({ msg: "Not admin, Access forbidden" });
  } catch (err) {
    res.status(401).json({ msg: "Token is not valid" });
  }
};
