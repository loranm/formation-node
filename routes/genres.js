const express = require("express");
const router = express.Router();
const {
  getGenres,
  addGenre,
  getGenre,
  updateGenre,
  deleteGenre,
} = require("../db/genres");
const { findUserById } = require("../db/user");
const { validateGenre } = require("../utils/validate");
const authorisation = require("../middlewares/authorisation");
const isAdmin = require("../middlewares/admin");

router.get("/", getAllGenres);
router.get("/:id", getGenreById);
router.post("/", [authorisation, isAdmin], createNewGenre);
router.put("/:id", modifyGenre);
router.delete("/:id", removeGenre);

module.exports = router;

async function getAllGenres(req, res) {
  res.json(await getGenres());
}

async function getGenreById(req, res) {
  const genre = await getGenre(req.params.id);
  res.json(genre);
}

async function createNewGenre(req, res) {
  const validUser = await findUserById(req.user.id);
  if (!validUser) return res.status(400).send("Id does not exist");

  const { error } = validateGenre(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  const genre = await addGenre(req.body);

  res.json(genre);
}

async function modifyGenre(req, res) {
  const { error } = validateGenre(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const updatedGenre = await updateGenre(req.params.id, req.body);

  if (!updatedGenre)
    res.status(404).send(`Id: _${req.params.id}_ does not exist`);

  res.send(updatedGenre);
}

async function removeGenre(req, res) {
  const deletedGenre = await deleteGenre(req.params.id);
  if (!deletedGenre) {
    res.status(404).send(`Id: _${req.params.id}_ does not exist`);
  }

  res.send(deletedGenre);
}
