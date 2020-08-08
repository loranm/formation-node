const express = require("express");
const router = express.Router();
const { validateAuth } = require("../utils/validate");
const { findUserByEmail } = require("../db/user");
const { saltPassword, comparePassword } = require("../utils/salt");

router.post("/", postAuthentication);

async function postAuthentication(req, res) {
  try {
    const { error } = validateAuth(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const { email, password } = await findUserByEmail(req.body.email);
    if (!email) return res.status(400).send("incorrect username or password");

    const isPasswordValid = await comparePassword(req.body.password, password);

    return isPasswordValid
      ? res.send(isPasswordValid)
      : res.status(400).send("incorrect username or password");
  } catch (error) {
    console.log(error);
  }
}

module.exports = router;
