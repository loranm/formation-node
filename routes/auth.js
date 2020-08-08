const express = require("express");
const router = express.Router();
const { validateAuth } = require("../utils/validate");
const { findUserByEmail } = require("../db/user");
const { saltPassword, comparePassword } = require("../utils/salt");
const { sign } = require("../utils/token");

router.post("/", postAuthentication);

async function postAuthentication(req, res) {
  try {
    const { error } = validateAuth(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const { email, password, _id: id } = await findUserByEmail(req.body.email);
    if (!email) return res.status(400).send("incorrect username or password");

    const isPasswordValid = await comparePassword(req.body.password, password);
    if (!isPasswordValid)
      return res.status(400).send("incorrect username or password");

    const token = await sign({ id });
    return res.json({ token });
  } catch (error) {
    console.log(error);
  }
}

module.exports = router;
