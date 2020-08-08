const jwt = require("jsonwebtoken");
const config = require("config");

const privateKey = config.get("jwtPrivateKey");

function sign(payload) {
  return jwt.sign(payload, privateKey);
}

module.exports = { sign };
