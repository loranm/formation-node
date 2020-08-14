const { verify } = require("../utils/token");

module.exports = (req, res, next) => {
  const token = req.header("x-auth-token");
  if (!Boolean(token)) {
    return res.status(401).send("Acces denied. No token provided");
  }

  try {
    const decoded = verify(token);
    req.user = { ...decoded };
    return next();
  } catch (error) {
    console.log(error);
    return res.status(400).send("invalid token");
  }
};
