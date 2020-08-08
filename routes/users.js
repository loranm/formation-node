const express = require("express");
const {
  findUsers,
  saveUser,
  findUserByEmail,
  findUserById,
  removeUser,
  updateUser,
} = require("../db/user");
const { validateUser, validateId } = require("../utils/validate");
const { reset } = require("nodemon");
const saltPassword = require("../utils/salt");
const router = express.Router();

const getUsers = async (req, res) => {
  try {
    return res.send(await findUsers());
  } catch (error) {}
};

const getUser = async (req, res) => {
  try {
    const { error } = validateId({ id: req.params.id });
    return error
      ? res.status(400).send(error.details[0].message)
      : res.json(await findUserById(req.params.id));
  } catch (error) {
    console.log(error);
  }
};

const postUser = async (req, res) => {
  try {
    const user = await findUserByEmail(req.body.email);
    if (user) return res.status(400).send("User already registered");

    const { error } = validateUser(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const password = await saltPassword(req.body.password);

    return res.json(saveUser({ ...req.body, password }));
  } catch (error) {
    console.log(error);
  }
};

const putUser = async (req, res) => {
  try {
    const { error } = validateId({ id: req.params.id });
    return error
      ? res.status(400).send(errorId.details[0].message)
      : res.json(await updateUser(req.params.id, req.body));
  } catch (error) {
    console.log(error);
  }
};

const deleteUser = async (req, res) => {
  try {
    const { error } = validateId({ id: req.params.id });
    return error
      ? res.status(400).send(error)
      : res.json(await removeUser(req.params.id));
  } catch (error) {
    console.log(error);
  }
};

router.get("/", getUsers);
router.get("/:id", getUser);
router.post("/", postUser);
router.put("/:id", putUser);
router.delete("/:id", deleteUser);

module.exports = router;
