const express = require("express");
const router = express.Router();
const {
  findUsers,
  saveUser,
  findUserByEmail,
  findUserById,
  removeUser,
  updateUser,
} = require("../db/user");
const { validateUser, validateId } = require("../utils/validate");
const { saltPassword } = require("../utils/salt");
const authorisation = require("../middlewares/authorisation");

router.get("/", getUsers);
router.get("/me", authorisation, getCurrentUser);
router.get("/:id", getUser);
router.post("/", postUser);
router.put("/:id", putUser);
router.delete("/:id", deleteUser);

module.exports = router;

async function getUsers(req, res) {
  try {
    return res.send(await findUsers());
  } catch (error) {
    console.log(error);
  }
}

async function getUser(req, res) {
  try {
    const { error } = validateId({ id: req.params.id });
    return error
      ? res.status(400).send(error.details[0].message)
      : res.json(await findUserById(req.params.id));
  } catch (error) {
    console.log(error);
  }
}

async function getCurrentUser(req, res) {
  const user = await findUserById(req.user.id).select("-password");
  return res.json(user);
}

async function postUser(req, res) {
  try {
    const user = await findUserByEmail(req.body.email);
    if (user) return res.status(400).send("User already registered");

    const { error } = validateUser(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const password = await saltPassword(req.body.password);

    const newUser = saveUser({ ...req.body, password });

    const token = newUser.generateToken({ id: newUser._id });

    return res.header("x-auth-token", token).json(newUser);
  } catch (error) {
    console.log(error);
  }
}

async function putUser(req, res) {
  try {
    const { error } = validateId({ id: req.params.id });
    return error
      ? res.status(400).send(errorId.details[0].message)
      : res.json(await updateUser(req.params.id, req.body));
  } catch (error) {
    console.log(error);
  }
}

async function deleteUser(req, res) {
  try {
    const { error } = validateId({ id: req.params.id });
    return error
      ? res.status(400).send(error)
      : res.json(await removeUser(req.params.id));
  } catch (error) {
    console.log(error);
  }
}
