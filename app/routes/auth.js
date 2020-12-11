const express = require("express");
const router = express.Router();
const { validateAuth } = require("../utils/validate");
const { findUserByEmail } = require("../db/user");
const { comparePassword } = require("../utils/salt");

router.post("/", postAuthentication);
module.exports = router;

async function postAuthentication(req, res) {
  try {
    const { error } = validateAuth(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const {
      email,
      password,
      _id: id,
      isAdmin,
      generateToken,
    } = await findUserByEmail(req.body.email);
    if (!email) return res.status(400).send("incorrect username or password");

    const isPasswordValid = await comparePassword(req.body.password, password);
    if (!isPasswordValid)
      return res.status(400).send("incorrect username or password");

    const token = await generateToken({ id, isAdmin });
    return res.json({ token });
  } catch (error) {
    console.log(error);
  }
}
