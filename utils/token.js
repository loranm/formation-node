const jwt = require("jsonwebtoken");
const config = require("config");

const privateKey = config.get("jwtPrivateKey");

function generateToken(payload) {
  return jwt.sign(payload, privateKey);
}

function verify(token) {
  try {
    return jwt.verify(token, privateKey);
  } catch (error) {
    console.log("invalid json web token", error);
  }
}

module.exports = { generateToken, verify };
