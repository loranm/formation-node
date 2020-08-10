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
  try {
    res.json(await getGenres());
  } catch (error) {
    handleError;
  }
}

async function getGenreById(req, res) {
  try {
    const genre = await getGenre(req.params.id);
    res.json(genre);
  } catch (error) {
    handleError;
  }
}

async function createNewGenre(req, res) {
  try {
    const validUser = await findUserById(req.user.id);

    const { error } = validateGenre(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    const genre = await addGenre(req.body);

    res.json(genre);
  } catch (error) {
    console.log(error);
    handleError;
  }
}

async function modifyGenre(req, res) {
  try {
    const { error } = validateGenre(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const updatedGenre = await updateGenre(req.params.id, req.body);

    if (!updatedGenre)
      res.status(404).send(`Id: _${req.params.id}_ does not exist`);

    res.send(updatedGenre);
  } catch (error) {
    handleError;
  }
}

async function removeGenre(req, res) {
  try {
    const deletedGenre = await removeGenre(req.params.id);
    if (!deletedGenre) {
      res.status(404).send(`Id: _${req.params.id}_ does not exist`);
    }

    res.send(deletedGenre);
  } catch (error) {
    handleError;
  }
}

function handleError(error) {
  console.error(error);
}
