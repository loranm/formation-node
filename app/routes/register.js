const express = require("express");
const router = express.Router();

const { findUserByEmail, saveUser } = require("../db/user");
const { validateUser } = require("../utils/validate");
const { saltPassword } = require("../utils/salt");

router.post("/", register);

module.exports = router;

async function register(req, res) {
  const user = await findUserByEmail(req.body.email);
  if (user) return res.status(400).send("User already registered");

  const { error } = validateUser(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const password = await saltPassword(req.body.password);

  const newUser = saveUser({ ...req.body, password });

  const token = newUser.generateToken({ id: newUser._id });

  return res.header("x-auth-token", token).json(newUser);
}
