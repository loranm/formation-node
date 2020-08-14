const express = require("express");
const router = express.Router();
const {
  findUsers,
  findUserById,
  removeUser,
  updateUser,
} = require("../db/user");
const { validateId } = require("../utils/validate");
const authorisation = require("../middlewares/authorisation");

router.get("/", getUsers);
router.get("/me", authorisation, getCurrentUser);
router.get("/:id", getUser);
router.put("/:id", putUser);
router.delete("/:id", deleteUser);

module.exports = router;

async function getUsers(req, res) {
  return res.send(await findUsers());
}

async function getUser(req, res) {
  const { error } = validateId({ id: req.params.id });
  return error
    ? res.status(400).send(error.details[0].message)
    : res.json(await findUserById(req.params.id));
}

async function getCurrentUser(req, res) {
  const user = await findUserById(req.user.id).select("-password");
  return res.json(user);
}

async function putUser(req, res) {
  const { error } = validateId({ id: req.params.id });
  return error
    ? res.status(400).send(errorId.details[0].message)
    : res.json(await updateUser(req.params.id, req.body));
}

async function deleteUser(req, res) {
  const { error } = validateId({ id: req.params.id });
  return error
    ? res.status(400).send(error)
    : res.json(await removeUser(req.params.id));
}
