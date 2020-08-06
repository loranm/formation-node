const express = require("express");
const router = express.Router();
const {
  getMovies,
  addMovie,
  getMovieById,
  updateMovie,
  deleteMovie,
} = require("../db/movie");

router.get("/", getAllMovies);
router.get("/:id", getMovie);
router.post("/", createMovie);
router.put("/:id", changeMovie);
router.delete("/:id", removeMovie);

async function getAllMovies(req, res) {
  try {
    const movies = await getMovies();
    res.json(movies);
  } catch (error) {
    handleError;
  }
}

async function getMovie(req, res) {
  try {
    const movie = await getMovieById(req.params.id);
    res.json(movie);
  } catch (error) {
    console.log(error);
  }
}

async function createMovie(req, res) {
  try {
    const newMovie = await addMovie(req.body);
    res.json(newMovie);
  } catch (error) {
    console.error(error);
  }
}

async function changeMovie(req, res) {
  try {
    const updatedMovie = await updateMovie(req.params.id, req.body);
    res.send(updatedMovie);
  } catch (error) {
    console.log(error);
  }
}

async function removeMovie(req, res) {
  try {
    const deletedMovie = await deleteMovie(req.params.id);
    res.json(deletedMovie);
  } catch (error) {}
}

function handleError(error) {
  console.log(error);
}

module.exports = router;
